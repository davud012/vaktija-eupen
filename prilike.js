/* =====================================================================
   PRILIKE – pravo vrijeme u Eupenu / Das echte Wetter in Eupen
   Oblaci, kiša s kapima na ekranu, snijeg, grmljavina i magla –
   prema trenutnom vremenu (Open-Meteo, besplatno, bez prijave).
   Wolken, Regen mit Tropfen auf dem Bildschirm, Schnee, Gewitter und
   Nebel – nach dem aktuellen Wetter (Open-Meteo, kostenlos, ohne Konto).

   Za probu / Zum Testen: index.html?prilike=kisa
   (vedro, djelimicno, oblacno, magla, rosulja, kisa, jaka-kisa, snijeg, oluja)
   ===================================================================== */
(function () {
  var API = "https://api.open-meteo.com/v1/forecast?latitude=50.6285&longitude=6.0359" +
    "&current=weather_code,cloud_cover,precipitation,snowfall,wind_speed_10m&timezone=Europe%2FBrussels";
  var OSVJEZI_MIN = 10;

  // Za probu: izmišljeno vrijeme / Zum Testen: ausgedachtes Wetter
  var TEST = {
    vedro: { kod: 0, oblaci: 0 }, djelimicno: { kod: 2, oblaci: 45 }, oblacno: { kod: 3, oblaci: 96 },
    magla: { kod: 45, oblaci: 100 }, rosulja: { kod: 53, oblaci: 100, padavine: 0.3 },
    kisa: { kod: 63, oblaci: 100, padavine: 2.5, vjetar: 12 }, "jaka-kisa": { kod: 65, oblaci: 100, padavine: 7, vjetar: 30 },
    snijeg: { kod: 73, oblaci: 100, snijeg: 1.2, vjetar: 8 }, oluja: { kod: 95, oblaci: 100, padavine: 6, vjetar: 35 }
  };

  var Prilike = {}, el = {}, s = { kod: 0, oblaci: 0, padavine: 0, snijeg: 0, vjetar: 5 };
  var lagano = false, okvir = 0;
  var vrsta = "vedro", jacina = 0, cestice = [], kapi = [], radi = false, zadnjaBoja = "", sljedecaMunja = 0;

  function clamp(x, a, b) { return x < a ? a : (x > b ? b : x); }

  // WMO kod -> vrsta i jačina / WMO-Code -> Art und Stärke
  function protumaci() {
    var k = s.kod;
    if (k >= 95) { vrsta = "oluja"; jacina = Math.max(s.padavine, 5); }
    else if ((k >= 71 && k <= 77) || k === 85 || k === 86) {
      vrsta = "snijeg"; jacina = Math.max(s.snijeg, { 71: 0.3, 73: 1, 75: 2.5, 77: 0.3, 85: 1, 86: 2.5 }[k] || 1);
    }
    else if ((k >= 51 && k <= 67) || (k >= 80 && k <= 82)) {
      vrsta = k <= 57 ? "rosulja" : "kisa";
      jacina = Math.max(s.padavine, { 51: 0.2, 53: 0.3, 55: 0.5, 56: 0.3, 57: 0.5, 61: 1, 63: 2.5, 65: 6, 66: 1, 67: 4, 80: 1.5, 81: 3, 82: 7 }[k] || 1);
    }
    else if (k === 45 || k === 48) { vrsta = "magla"; jacina = 1; }
    else { vrsta = "vedro"; jacina = 0; }
  }

  // Koliko neba je skriveno (0–1), za Sunce, zvijezde i Mjesec
  // Wie viel Himmel verdeckt ist (0–1), für Sonne, Sterne und Mond
  Prilike.zastor = function () {
    var z = s.oblaci < 15 ? 0 : (s.oblaci - 15) / 85;
    if (vrsta === "magla") z = Math.max(z, 0.85);
    if (vrsta !== "vedro" && vrsta !== "magla") z = Math.max(z, 0.9);
    return clamp(z, 0, 1);
  };

  Prilike.init = function (kontejner, o) {
    lagano = !!(o && o.lagano);
    el.oblaci = document.createElement("div"); el.oblaci.className = "prilike-oblaci";
    el.veo = document.createElement("div"); el.veo.className = "prilike-veo";
    el.magla = document.createElement("div"); el.magla.className = "prilike-magla";
    el.padavine = document.createElement("canvas"); el.padavine.className = "prilike-padavine";
    el.staklo = document.createElement("canvas"); el.staklo.className = "prilike-staklo";
    el.bljesak = document.createElement("div"); el.bljesak.className = "prilike-bljesak";
    el.munja = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    el.munja.setAttribute("class", "prilike-munja"); el.munja.setAttribute("viewBox", "0 0 1920 1080");
    el.munja.setAttribute("preserveAspectRatio", "none");
    var nebo = kontejner.querySelector(".nebo");
    [el.veo, el.oblaci, el.magla, el.munja, el.padavine].forEach(function (e) { nebo.appendChild(e); });
    kontejner.appendChild(el.bljesak);
    kontejner.appendChild(el.staklo);
    velicina();
    window.addEventListener("resize", velicina);

    var t = /[?&]prilike=([a-z-]+)/.exec(location.search);
    if (t && TEST[t[1]]) postavi(TEST[t[1]]);
    else { ucitaj(); setInterval(ucitaj, OSVJEZI_MIN * 60000); }
  };

  function velicina() {
    var f = lagano ? 0.5 : 0.75;
    el.padavine.width = Math.round(window.innerWidth * f); el.padavine.height = Math.round(window.innerHeight * f);
    el.staklo.width = Math.round(window.innerWidth * f); el.staklo.height = Math.round(window.innerHeight * f);
  }

  function ucitaj() {
    try {
      var x = new XMLHttpRequest();
      x.open("GET", API);
      x.onload = function () {
        if (x.status !== 200) return;
        var c = JSON.parse(x.responseText).current;
        postavi({ kod: c.weather_code, oblaci: c.cloud_cover, padavine: c.precipitation, snijeg: c.snowfall, vjetar: c.wind_speed_10m });
      };
      x.send();
    } catch (e) { /* bez interneta: ostaje zadnje vrijeme / ohne Internet: letztes Wetter bleibt */ }
  }

  function postavi(n) {
    s = { kod: n.kod || 0, oblaci: n.oblaci || 0, padavine: n.padavine || 0, snijeg: n.snijeg || 0, vjetar: n.vjetar || 5 };
    protumaci();
    zadnjaBoja = "";
    napraviOblake();
    el.magla.style.opacity = vrsta === "magla" ? 1 : 0;
    cestice = [];
    var broj = vrsta === "snijeg" ? clamp(90 + jacina * 140, 90, 500)
      : (vrsta === "kisa" || vrsta === "oluja" || vrsta === "rosulja") ? clamp(50 + jacina * 60, 50, 480) : 0;
    if (lagano) broj = Math.round(broj * 0.4);
    for (var i = 0; i < broj; i++) cestice.push(novaCestica(true));
    if (!(vrsta === "kisa" || vrsta === "oluja" || vrsta === "rosulja")) kapi = [];
    sljedecaMunja = Date.now() + 3000;
    if (!radi && (broj || vrsta === "oluja")) { radi = true; requestAnimationFrame(petlja); }
  }

  // ---------- Oblaci / Wolken ----------
  function napraviOblake() {
    var broj = s.oblaci < 10 ? 0 : Math.round(2 + s.oblaci / 100 * 10), html = "";
    if (lagano) broj = Math.min(broj, 4);
    for (var i = 0; i < broj; i++) {
      var sir = 26 + Math.random() * 22, vis = sir * (0.28 + Math.random() * 0.12);
      var traj = 160 + Math.random() * 220, kasni = -Math.random() * traj;
      var top = -4 + Math.random() * 46;
      html += '<div class="oblak" style="top:' + top.toFixed(1) + 'vh;width:' + sir.toFixed(1) + 'vw;height:' + vis.toFixed(1) + 'vw;' +
        'animation-duration:' + traj.toFixed(0) + 's;animation-delay:' + kasni.toFixed(0) + 's;opacity:' + (0.55 + Math.random() * 0.45).toFixed(2) + '">';
      for (var j = 0; j < 7; j++) {
        var w = 30 + Math.random() * 40, x = Math.random() * (100 - w), y = 10 + Math.random() * 40;
        html += '<i style="left:' + x.toFixed(0) + '%;top:' + y.toFixed(0) + '%;width:' + w.toFixed(0) + '%;height:' + (w * 1.6).toFixed(0) + '%"></i>';
      }
      html += '</div>';
    }
    el.oblaci.innerHTML = html;
    el.veo.style.opacity = clamp((s.oblaci - 60) / 40, 0, 1).toFixed(2);
  }

  // Boja oblaka prema Suncu / Wolkenfarbe nach der Sonne
  Prilike.azuriraj = function (visinaSunca) {
    var h = visinaSunca, boja, veo;
    var tamno = vrsta === "oluja" ? 0.45 : (vrsta === "kisa" || vrsta === "snijeg" ? 0.7 : (vrsta === "rosulja" ? 0.82 : 1));
    if (h > 8 && tamno < 1) {
      // kišni i olujni oblaci su tamni / Regen- und Gewitterwolken sind dunkel
      var c = Math.round(232 * tamno), v1 = Math.round(150 * tamno), v2 = Math.round(185 * tamno);
      boja = "rgba(" + c + "," + (c + 4) + "," + (c + 12) + ",0.92)";
      veo = "linear-gradient(180deg, rgba(" + v1 + "," + (v1 + 6) + "," + (v1 + 16) + ",0.94), rgba(" + v2 + "," + (v2 + 6) + "," + (v2 + 16) + ",0.75))";
    }
    else if (h > 8) { boja = "rgba(246,248,252,0.9)"; veo = "linear-gradient(180deg, rgba(150,160,175,0.85), rgba(185,192,204,0.6))"; }
    else if (h > -4) { boja = "rgba(255,206,178,0.85)"; veo = "linear-gradient(180deg, rgba(110,100,120,0.85), rgba(190,140,120,0.55))"; }
    else if (h > -10) { boja = "rgba(120,122,150,0.8)"; veo = "linear-gradient(180deg, rgba(45,50,70,0.9), rgba(70,72,95,0.6))"; }
    else { boja = "rgba(58,64,82,0.85)"; veo = "linear-gradient(180deg, rgba(18,22,32,0.92), rgba(30,34,46,0.7))"; }
    if (boja !== zadnjaBoja) {
      zadnjaBoja = boja;
      el.oblaci.style.setProperty("--oblak", boja);
      el.veo.style.background = veo;
      el.magla.style.setProperty("--magla", h > -4 ? "rgba(214,218,226,0.75)" : "rgba(70,76,92,0.75)");
    }
  };

  // ---------- Kiša, snijeg, kapi na staklu, munje ----------
  function novaCestica(bilogdje) {
    var W = el.padavine.width, H = el.padavine.height;
    if (vrsta === "snijeg") return { x: Math.random() * W, y: bilogdje ? Math.random() * H : -10, r: 1 + Math.random() * 2.6, v: 0.5 + Math.random() * 1.1, f: Math.random() * 6.28 };
    return { x: Math.random() * W * 1.2 - W * 0.1, y: bilogdje ? Math.random() * H : -30, l: 12 + Math.random() * 18, v: 11 + Math.random() * 8 };
  }

  function petlja() {
    // leichte Version: nur jedes zweite Bild zeichnen / lagana verzija: svaka druga slika
    if (lagano && (okvir++ % 2)) { requestAnimationFrame(petlja); return; }
    var c = el.padavine.getContext("2d"), W = el.padavine.width, H = el.padavine.height;
    c.clearRect(0, 0, W, H);
    var nagib = clamp(s.vjetar / 60, 0, 0.6);
    if (vrsta === "snijeg") {
      c.fillStyle = "rgba(255,255,255,0.88)";
      for (var i = 0; i < cestice.length; i++) {
        var p = cestice[i];
        p.f += 0.02; p.y += p.v; p.x += Math.sin(p.f) * 0.6 + nagib * 1.5;
        if (p.y > H + 5 || p.x > W + 10) cestice[i] = novaCestica(false);
        c.beginPath(); c.arc(p.x, p.y, p.r, 0, 6.283); c.fill();
      }
    } else if (cestice.length) {
      c.strokeStyle = vrsta === "rosulja" ? "rgba(205,218,236,0.28)" : "rgba(205,218,236,0.38)";
      c.lineWidth = 1.1; c.beginPath();
      for (var j = 0; j < cestice.length; j++) {
        var q = cestice[j];
        q.y += q.v; q.x += q.v * nagib;
        if (q.y > H) cestice[j] = novaCestica(false);
        c.moveTo(q.x, q.y); c.lineTo(q.x - q.l * nagib, q.y - q.l);
      }
      c.stroke();
    }
    if (!lagano) staklo();
    if (vrsta === "oluja" && Date.now() > sljedecaMunja) { munja(); sljedecaMunja = Date.now() + 6000 + Math.random() * 16000; }
    if (cestice.length || kapi.length || vrsta === "oluja") requestAnimationFrame(petlja);
    else { radi = false; c.clearRect(0, 0, W, H); el.staklo.getContext("2d").clearRect(0, 0, W, H); }
  }

  // Kapi na staklu kao na mokrom prozoru / Tropfen wie auf einer nassen Scheibe
  function staklo() {
    var c = el.staklo.getContext("2d"), W = el.staklo.width, H = el.staklo.height;
    c.clearRect(0, 0, W, H);
    var kisa = vrsta === "kisa" || vrsta === "oluja" || vrsta === "rosulja";
    var max = kisa ? clamp(40 + jacina * 25, 40, 220) : 0;
    if (kisa && kapi.length < max && Math.random() < 0.25 + jacina * 0.05) {
      kapi.push({ x: Math.random() * W, y: Math.random() * H, r: 1.5 + Math.random() * (vrsta === "rosulja" ? 2.5 : 5.5), v: 0, rast: Math.random() * 0.02 });
    }
    for (var i = kapi.length - 1; i >= 0; i--) {
      var k = kapi[i];
      if (kisa) k.r = Math.min(k.r + k.rast, 9);
      if (k.r > 6 && (k.v > 0 || Math.random() < 0.004)) {
        // Kap klizi niz staklo i ostavlja tragove / Tropfen läuft herunter und hinterlässt Spuren
        k.v = Math.min(k.v + 0.08, 4.5); k.y += k.v; k.x += (Math.random() - 0.5) * 0.6; k.r -= 0.004;
        if (Math.random() < 0.08) kapi.push({ x: k.x + (Math.random() - 0.5) * 2, y: k.y - k.r * 1.5, r: 1 + Math.random() * 1.5, v: 0, rast: 0 });
      }
      if (!kisa) k.r -= 0.02;           // nakon kiše kapi se suše / nach dem Regen trocknen die Tropfen
      if (k.y - k.r > H || k.r <= 0.6) { kapi.splice(i, 1); continue; }
      var g = c.createRadialGradient(k.x - k.r * 0.3, k.y - k.r * 0.35, k.r * 0.1, k.x, k.y, k.r);
      g.addColorStop(0, "rgba(255,255,255,0.55)");
      g.addColorStop(0.35, "rgba(255,255,255,0.10)");
      g.addColorStop(0.85, "rgba(220,230,245,0.22)");
      g.addColorStop(1, "rgba(20,30,45,0.35)");
      c.fillStyle = g;
      c.beginPath(); c.ellipse(k.x, k.y, k.r * 0.88, k.r, 0, 0, 6.283); c.fill();
    }
  }

  function munja() {
    el.bljesak.className = "prilike-bljesak"; void el.bljesak.offsetWidth; el.bljesak.className = "prilike-bljesak bljesni";
    var x = 200 + Math.random() * 1520, y = -10, d = "M" + x + " " + y;
    while (y < 520 + Math.random() * 200) { y += 30 + Math.random() * 50; x += (Math.random() - 0.5) * 110; d += " L" + x.toFixed(0) + " " + y.toFixed(0); }
    el.munja.innerHTML = '<path d="' + d + '" fill="none" stroke="#f4f7ff" stroke-width="4" stroke-linejoin="round"/>' +
      '<path d="' + d + '" fill="none" stroke="#bcd0ff" stroke-width="14" stroke-opacity="0.35" stroke-linejoin="round"/>';
    el.munja.setAttribute("class", "prilike-munja"); void el.munja.getBoundingClientRect();
    el.munja.setAttribute("class", "prilike-munja vidljiva");
  }

  Prilike.stanje = function () { return { vrsta: vrsta, jacina: jacina, oblaci: s.oblaci, kod: s.kod }; };
  window.Prilike = Prilike;
})();
