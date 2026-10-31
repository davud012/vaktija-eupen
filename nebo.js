/* =====================================================================
   NEBO – pravo nebo iznad Eupena / Der echte Himmel über Eupen
   Sunce, Mjesec (prava faza), planete, zvijezde, Mliječni put,
   zvijezde padalice i pomračenja – sve se računa uživo za Eupen.
   Sonne, Mond (echte Phase), Planeten, Sterne, Milchstraße,
   Sternschnuppen und Finsternisse – alles live für Eupen berechnet.
   ===================================================================== */
(function () {
  var LAT = 50.6285, LON = 6.0359;
  var RAD = Math.PI / 180, DEG = 180 / Math.PI;
  var W = 1920, H = 1080;
  var SVGNS = "http://www.w3.org/2000/svg";

  function norm(a) { a = a % 360; return a < 0 ? a + 360 : a; }
  function sin(x) { return Math.sin(x * RAD); }
  function cos(x) { return Math.cos(x * RAD); }
  function clamp(x, a, b) { return x < a ? a : (x > b ? b : x); }
  function julian(date) { return date.getTime() / 86400000 + 2440587.5; }

  // ---------- Sunce i Mjesec (P. Schlyter) / Sonne und Mond ----------
  function sunceEkl(d) {
    var w = 282.9404 + 4.70935e-5 * d, e = 0.016709 - 1.151e-9 * d, M = norm(356.0470 + 0.9856002585 * d);
    var E = M + DEG * e * sin(M) * (1 + e * cos(M));
    var xv = cos(E) - e, yv = Math.sqrt(1 - e * e) * sin(E);
    return { lon: norm(Math.atan2(yv, xv) * DEG + w), lat: 0, r: Math.sqrt(xv * xv + yv * yv), M: M, L: norm(M + w) };
  }

  function mjesecEkl(d, s) {
    var N = norm(125.1228 - 0.0529538083 * d), i = 5.1454, w = norm(318.0634 + 0.1643573223 * d);
    var a = 60.2666, e = 0.0549, M = norm(115.3654 + 13.0649929509 * d);
    var E = M + DEG * e * sin(M) * (1 + e * cos(M));
    for (var k = 0; k < 5; k++) E = E - (E - DEG * e * sin(E) - M) / (1 - e * cos(E));
    var xv = a * (cos(E) - e), yv = a * Math.sqrt(1 - e * e) * sin(E);
    var v = Math.atan2(yv, xv) * DEG, r = Math.sqrt(xv * xv + yv * yv);
    var xh = r * (cos(N) * cos(v + w) - sin(N) * sin(v + w) * cos(i));
    var yh = r * (sin(N) * cos(v + w) + cos(N) * sin(v + w) * cos(i));
    var zh = r * sin(v + w) * sin(i);
    var lon = Math.atan2(yh, xh) * DEG, lat = Math.atan2(zh, Math.sqrt(xh * xh + yh * yh)) * DEG;
    var Ms = s.M, Mm = M, Lm = norm(N + w + M), D = Lm - s.L, F = Lm - N;
    lon += -1.274 * sin(Mm - 2 * D) + 0.658 * sin(2 * D) - 0.186 * sin(Ms) - 0.059 * sin(2 * Mm - 2 * D)
      - 0.057 * sin(Mm - 2 * D + Ms) + 0.053 * sin(Mm + 2 * D) + 0.046 * sin(2 * D - Ms) + 0.041 * sin(Mm - Ms)
      - 0.035 * sin(D) - 0.031 * sin(Mm + Ms) - 0.015 * sin(2 * F - 2 * D) + 0.011 * sin(Mm - 4 * D);
    lat += -0.173 * sin(F - 2 * D) - 0.055 * sin(Mm - F - 2 * D) - 0.046 * sin(Mm + F - 2 * D)
      + 0.033 * sin(F + 2 * D) + 0.017 * sin(2 * Mm + F);
    r += -0.58 * cos(Mm - 2 * D) - 0.46 * cos(2 * D);
    return { lon: norm(lon), lat: lat, r: r };
  }

  function eklUEkv(lon, lat, obliq) {
    var x = cos(lon) * cos(lat), y = sin(lon) * cos(lat), z = sin(lat);
    var ye = y * cos(obliq) - z * sin(obliq), ze = y * sin(obliq) + z * cos(obliq);
    return { ra: norm(Math.atan2(ye, x) * DEG), dec: Math.atan2(ze, Math.sqrt(x * x + ye * ye)) * DEG };
  }

  // ---------- Planete (JPL, približni elementi) / Planeten (JPL-Näherung) ----------
  var ELEM = {
    zemlja:  [1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0, 0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0],
    venera:  [0.72333566, 0.00677672, 3.39467605, 181.97909950, 131.60246718, 76.67984255, 0.00000390, -0.00004107, -0.00078890, 58517.81538729, 0.00268329, -0.27769418],
    mars:    [1.52371034, 0.09339410, 1.84969142, -4.55343205, -23.94362959, 49.55953891, 0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343],
    jupiter: [5.20288700, 0.04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909, -0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668, 0.20469106],
    saturn:  [9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448, -0.00125060, -0.00050991, 0.00193609, 1222.49362201, -0.41897216, -0.28867794]
  };
  function helio(ime, T) {
    var p = ELEM[ime];
    var a = p[0] + p[6] * T, e = p[1] + p[7] * T, I = p[2] + p[8] * T, L = p[3] + p[9] * T, wb = p[4] + p[10] * T, Om = p[5] + p[11] * T;
    var M = norm(L - wb), w = wb - Om;
    var E = M + DEG * e * sin(M);
    for (var k = 0; k < 6; k++) E = E - (E - DEG * e * sin(E) - M) / (1 - e * cos(E));
    var xp = a * (cos(E) - e), yp = a * Math.sqrt(1 - e * e) * sin(E);
    return {
      x: (cos(w) * cos(Om) - sin(w) * sin(Om) * cos(I)) * xp + (-sin(w) * cos(Om) - cos(w) * sin(Om) * cos(I)) * yp,
      y: (cos(w) * sin(Om) + sin(w) * cos(Om) * cos(I)) * xp + (-sin(w) * sin(Om) + cos(w) * cos(Om) * cos(I)) * yp,
      z: sin(w) * sin(I) * xp + cos(w) * sin(I) * yp
    };
  }
  function planeta(ime, jd) {
    var T = (jd - 2451545) / 36525, p = helio(ime, T), z = helio("zemlja", T);
    var x = p.x - z.x, y = p.y - z.y, zz = p.z - z.z;
    var lon = Math.atan2(y, x) * DEG + 1.39697 * T, lat = Math.atan2(zz, Math.sqrt(x * x + y * y)) * DEG;  // + precesija / Präzession
    return eklUEkv(lon, lat, 23.43928);
  }

  // ---------- Koordinate / Koordinaten ----------
  function zvjezdanoVrijeme(jd) { return norm(280.46061837 + 360.98564736629 * (jd - 2451545) + LON); }
  function horizont(ra, dec, lst) {
    var Hh = lst - ra;
    var alt = Math.asin(sin(LAT) * sin(dec) + cos(LAT) * cos(dec) * cos(Hh)) * DEG;
    var az = norm(Math.atan2(-cos(dec) * sin(Hh), cos(LAT) * sin(dec) - sin(LAT) * cos(dec) * cos(Hh)) * DEG);
    return { alt: alt, az: az, H: Hh, dec: dec };
  }
  function refrakcija(alt) {
    if (alt < -1.5) return alt;
    return alt + 1.02 / Math.tan((alt + 10.3 / (alt + 5.11)) * RAD) / 60;
  }

  // ---------- Zvijezde (J2000: RA u satima, Dec, magnituda) / Sterne ----------
  var ZVIJEZDE = [
    ["Sirius", 6.752, -16.72, -1.46], ["Arcturus", 14.261, 19.18, -0.05], ["Vega", 18.616, 38.78, 0.03],
    ["Capella", 5.278, 46.00, 0.08], ["Rigel", 5.242, -8.20, 0.13], ["Procyon", 7.655, 5.22, 0.34],
    ["Betelgeuse", 5.919, 7.41, 0.5], ["Altair", 19.846, 8.87, 0.77], ["Aldebaran", 4.599, 16.51, 0.85],
    ["Spica", 13.420, -11.16, 0.97], ["Antares", 16.490, -26.43, 1.06], ["Pollux", 7.755, 28.03, 1.14],
    ["Fomalhaut", 22.961, -29.62, 1.16], ["Deneb", 20.690, 45.28, 1.25], ["Regulus", 10.140, 11.97, 1.35],
    ["Castor", 7.577, 31.89, 1.58], ["Bellatrix", 5.419, 6.35, 1.64], ["Alnilam", 5.604, -1.20, 1.69],
    ["Alnitak", 5.679, -1.94, 1.77], ["Mintaka", 5.533, -0.30, 2.23], ["Saiph", 5.796, -9.67, 2.06],
    ["Dubhe", 11.062, 61.75, 1.79], ["Merak", 11.031, 56.38, 2.37], ["Phecda", 11.897, 53.69, 2.44],
    ["Megrez", 12.257, 57.03, 3.31], ["Alioth", 12.900, 55.96, 1.77], ["Mizar", 13.399, 54.93, 2.23],
    ["Alkaid", 13.792, 49.31, 1.86], ["Polaris", 2.530, 89.26, 1.98], ["Schedar", 0.675, 56.54, 2.24],
    ["Caph", 0.153, 59.15, 2.28], ["GammaCas", 0.945, 60.72, 2.47], ["Ruchbah", 1.430, 60.24, 2.68],
    ["Segin", 1.906, 63.67, 3.37], ["Denebola", 11.818, 14.57, 2.13], ["Hamal", 2.120, 23.46, 2.0],
    ["Alpheratz", 0.140, 29.09, 2.06], ["Mirach", 1.162, 35.62, 2.05], ["Almach", 2.065, 42.33, 2.1],
    ["Markab", 23.079, 15.21, 2.49], ["Scheat", 23.063, 28.08, 2.42], ["Algenib", 0.221, 15.18, 2.83],
    ["Mirfak", 3.405, 49.86, 1.79], ["Algol", 3.136, 40.96, 2.1], ["Elnath", 5.438, 28.61, 1.65],
    ["Alhena", 6.629, 16.40, 1.93], ["Rasalhague", 17.582, 12.56, 2.08], ["Kochab", 14.845, 74.16, 2.08],
    ["Alphecca", 15.578, 26.71, 2.23], ["Sadr", 20.370, 40.26, 2.23], ["Albireo", 19.512, 27.96, 3.05],
    ["Alcyone", 3.791, 24.11, 2.87], ["Mirzam", 6.378, -17.96, 1.98], ["Adhara", 6.977, -28.97, 1.5],
    ["Wezen", 7.140, -26.39, 1.83], ["Zubenelgenubi", 14.848, -16.04, 2.75], ["Nunki", 18.921, -26.30, 2.05],
    ["Kaus", 18.403, -34.38, 1.85], ["Enif", 21.736, 9.88, 2.38], ["Diphda", 0.727, -17.99, 2.04]
  ];
  // Slabe zvijezde u pozadini: uvijek iste pozicije na nebu, okreću se s nebom
  // Schwache Hintergrundsterne: feste Himmelspositionen, drehen sich mit dem Himmel
  var SLABE = [];
  (function () {
    var seme = 7;
    function slucajno() { seme = (seme * 16807) % 2147483647; return seme / 2147483647; }
    for (var i = 0; i < 700; i++) SLABE.push([slucajno() * 24, Math.asin(2 * slucajno() - 1) * DEG, 3.6 + slucajno() * 1.8]);
  })();

  // Linije zviježđa / Sternbild-Linien
  var LINIJE = [
    ["Betelgeuse", "Bellatrix"], ["Bellatrix", "Mintaka"], ["Mintaka", "Alnilam"], ["Alnilam", "Alnitak"],
    ["Alnitak", "Saiph"], ["Saiph", "Rigel"], ["Rigel", "Mintaka"], ["Betelgeuse", "Alnitak"],
    ["Dubhe", "Merak"], ["Merak", "Phecda"], ["Phecda", "Megrez"], ["Megrez", "Dubhe"], ["Megrez", "Alioth"],
    ["Alioth", "Mizar"], ["Mizar", "Alkaid"],
    ["Caph", "Schedar"], ["Schedar", "GammaCas"], ["GammaCas", "Ruchbah"], ["Ruchbah", "Segin"],
    ["Markab", "Scheat"], ["Scheat", "Alpheratz"], ["Alpheratz", "Algenib"], ["Algenib", "Markab"],
    ["Vega", "Deneb"], ["Deneb", "Altair"], ["Altair", "Vega"],
    ["Castor", "Pollux"], ["Pollux", "Alhena"], ["Castor", "Elnath"]
  ];

  // Galaktički ekvator -> RA/Dec / Galaktischer Äquator
  function galakticka(l) {
    var aN = 192.85948, dN = 27.12825, lN = 122.93192;
    var dec = Math.asin(sin(dN) * 0 + cos(dN) * cos(lN - l)) * DEG;
    var ra = norm(aN + Math.atan2(sin(lN - l), -sin(dN) * cos(lN - l)) * DEG);
    return { ra: ra, dec: dec };
  }
  var MLIJECNI = [];
  for (var gl = 0; gl < 360; gl += 5) MLIJECNI.push({ l: gl, p: galakticka(gl) });

  // ---------- Boje neba prema visini Sunca / Himmelsfarben nach Sonnenhöhe ----------
  var BOJE = [
    [-18, "#02060f", "#060e20", "#0b1730"],
    [-12, "#040b1c", "#0d1c3a", "#1d2d50"],
    [-8,  "#0a1631", "#1d2f58", "#3e4a73"],
    [-4,  "#172a55", "#3d4d7e", "#a26f7c"],
    [-1,  "#22396c", "#69699a", "#e88a58"],
    [2,   "#2d5894", "#7c94c0", "#f3b076"],
    [6,   "#386cab", "#78a3d4", "#e9cfa6"],
    [15,  "#2e6aae", "#5d98d2", "#a8ceed"],
    [40,  "#2963a8", "#4e8dcc", "#9bc9e9"]
  ];
  function hex(c) { return [parseInt(c.substr(1, 2), 16), parseInt(c.substr(3, 2), 16), parseInt(c.substr(5, 2), 16)]; }
  function mijesaj(a, b, t) {
    var x = hex(a), y = hex(b), r = [];
    for (var i = 0; i < 3; i++) r.push(Math.round(x[i] + (y[i] - x[i]) * t));
    return "rgb(" + r.join(",") + ")";
  }
  function bojeNeba(h, svjetlo) {
    h = clamp(h, -18, 40);
    for (var i = 0; i < BOJE.length - 1; i++) {
      if (h <= BOJE[i + 1][0]) {
        var t = (h - BOJE[i][0]) / (BOJE[i + 1][0] - BOJE[i][0]);
        var c = [mijesaj(BOJE[i][1], BOJE[i + 1][1], t), mijesaj(BOJE[i][2], BOJE[i + 1][2], t), mijesaj(BOJE[i][3], BOJE[i + 1][3], t)];
        if (svjetlo < 1) for (var k = 0; k < 3; k++) c[k] = potamni(c[k], svjetlo);
        return c;
      }
    }
  }
  function potamni(rgb, f) {
    var p = rgb.match(/\d+/g);
    var n = "#06101f", d = hex(n), r = [];
    for (var i = 0; i < 3; i++) r.push(Math.round(d[i] + (+p[i] - d[i]) * f));
    return "rgb(" + r.join(",") + ")";
  }

  // ---------- Pomoćno: pokrivenost Sunca / Bedeckung der Sonne ----------
  function pokrivenost(sep, rs, rm) {
    if (sep >= rs + rm) return 0;
    if (sep <= Math.abs(rm - rs)) return Math.min(1, (rm / rs) * (rm / rs));
    var a = clamp((sep * sep + rs * rs - rm * rm) / (2 * sep * rs), -1, 1), b = clamp((sep * sep + rm * rm - rs * rs) / (2 * sep * rm), -1, 1);
    var A = rs * rs * Math.acos(a) + rm * rm * Math.acos(b) - 0.5 * Math.sqrt(Math.max(0, (-sep + rs + rm) * (sep + rs - rm) * (sep - rs + rm) * (sep + rs + rm)));
    return A / (Math.PI * rs * rs);
  }

  // =====================================================================
  var Nebo = {};
  var el = {}, opcije, zadnjeTesko = 0, zadnjeBoje = 0, zadnjiZastor = -1;
  var dogadjaji = [];
  var testMeteori = /[?&]test=meteori/.test(location.search);

  function svg(tag, atributi, roditelj) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in atributi) e.setAttribute(k, atributi[k]);
    if (roditelj) roditelj.appendChild(e);
    return e;
  }

  Nebo.init = function (kontejner, o) {
    opcije = o || {};
    opcije.horizont = opcije.horizont || 600;
    opcije.x0 = opcije.x0 === undefined ? 0 : opcije.x0;
    opcije.x1 = opcije.x1 || W;
    opcije.azOd = opcije.azOd || 45;
    opcije.azDo = opcije.azDo || 315;
    dogadjaji = (window.NEBO_DOGADJAJI || []).map(function (e) {
      var k = {}; for (var p in e) k[p] = e[p];
      ["od", "do", "max", "vidljivoOd", "vidljivoDo", "sjenaOd", "sjenaDo"].forEach(function (p) { if (k[p]) k[p + "T"] = Date.parse(k[p]); });
      if (!k.odT) k.odT = k.maxT - 12 * 3600000;
      if (!k.doT) k.doT = k.maxT + 12 * 3600000;
      return k;
    });

    var s = svg("svg", { viewBox: "0 0 " + W + " " + H, preserveAspectRatio: "xMidYMid slice", "class": "nebo-svg" });
    var defs = svg("defs", {}, s);
    var g = svg("linearGradient", { id: "nebo-grad", x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
    el.st0 = svg("stop", { offset: "0" }, g);
    el.st1 = svg("stop", { offset: "0.55" }, g);
    el.st2 = svg("stop", { offset: "1" }, g);
    var sj = svg("radialGradient", { id: "nebo-sjaj" }, defs);
    svg("stop", { offset: "0", "stop-color": "#ffb46b", "stop-opacity": "0.85" }, sj);
    svg("stop", { offset: "1", "stop-color": "#ffb46b", "stop-opacity": "0" }, sj);
    var sg = svg("radialGradient", { id: "nebo-sunce" }, defs);
    svg("stop", { offset: "0", "stop-color": "#fffdf2" }, sg);
    svg("stop", { offset: "0.35", "stop-color": "#fff0b8" }, sg);
    svg("stop", { offset: "0.55", "stop-color": "#ffd36e", "stop-opacity": "0.45" }, sg);
    svg("stop", { offset: "1", "stop-color": "#ffc35a", "stop-opacity": "0" }, sg);
    var mg = svg("radialGradient", { id: "nebo-mjesec-sjaj" }, defs);
    svg("stop", { offset: "0", "stop-color": "#f1eedf", "stop-opacity": "0.35" }, mg);
    svg("stop", { offset: "1", "stop-color": "#f1eedf", "stop-opacity": "0" }, mg);
    var f = svg("filter", { id: "nebo-blur", x: "-20%", y: "-20%", width: "140%", height: "140%" }, defs);
    svg("feGaussianBlur", { stdDeviation: "28" }, f);
    var f2 = svg("filter", { id: "nebo-blur-malo" }, defs);
    svg("feGaussianBlur", { stdDeviation: "2" }, f2);

    svg("rect", { x: 0, y: 0, width: W, height: H, fill: "url(#nebo-grad)" }, s);
    el.sjaj = svg("ellipse", { rx: 520, ry: 260, fill: "url(#nebo-sjaj)", opacity: 0 }, s);
    el.mlijecni = svg("g", { filter: "url(#nebo-blur)" }, s);
    el.linije = svg("g", { stroke: "#cfe0ff", "stroke-width": 1.2, opacity: 0 }, s);
    el.zvijezde = svg("g", {}, s);
    el.planete = svg("g", {}, s);
    el.mjesecG = svg("g", {}, s);
    el.mjesecSjaj = svg("circle", { r: 110, fill: "url(#nebo-mjesec-sjaj)" }, el.mjesecG);
    el.mjesecTamno = svg("circle", { r: 30, fill: "#1c2536" }, el.mjesecG);
    el.mjesecSvijetlo = svg("path", { fill: "#f4f0e2" }, el.mjesecG);
    el.sunceG = svg("g", {}, s);
    el.sunceSjaj = svg("circle", { r: 150, fill: "url(#nebo-sunce)" }, el.sunceG);
    el.sunceDisk = svg("circle", { r: 36, fill: "#fffbea" }, el.sunceG);
    el.pomracenje = svg("circle", { r: 0, fill: "#0b1426" }, el.sunceG);

    kontejner.appendChild(s);
    el.meteori = document.createElement("div");
    el.meteori.className = "nebo-meteori";
    kontejner.appendChild(el.meteori);
  };

  function projekcija(alt, az) {
    var x = opcije.x0 + (az - opcije.azOd) / (opcije.azDo - opcije.azOd) * (opcije.x1 - opcije.x0);
    var y = opcije.horizont - alt / 66 * (opcije.horizont - 60);
    return { x: x, y: y };
  }

  function aktivni(tip, t) {
    var r = [];
    for (var i = 0; i < dogadjaji.length; i++) {
      var e = dogadjaji[i];
      if (e.tip === tip && t >= e.odT && t <= e.doT) r.push(e);
    }
    return r;
  }

  // ---------- Glavno računanje / Hauptberechnung ----------
  function stanje(datum) {
    var jd = julian(datum), d = jd - 2451543.5, obliq = 23.4393 - 3.563e-7 * d, lst = zvjezdanoVrijeme(jd);
    var s = sunceEkl(d), sEq = eklUEkv(s.lon, 0, obliq), sH = horizont(sEq.ra, sEq.dec, lst);
    var m = mjesecEkl(d, s), mEq = eklUEkv(m.lon, m.lat, obliq), mH = horizont(mEq.ra, mEq.dec, lst);
    mH.alt -= Math.asin(1 / m.r) * DEG * cos(mH.alt);                  // paralaksa / Parallaxe
    var elong = Math.acos(cos(m.lat) * cos(m.lon - s.lon)) * DEG;
    var osvijetljeno = (1 - cos(elong)) / 2;
    var rastuci = norm(m.lon - s.lon) < 180;
    // položaj osvijetljenog ruba / Lage des beleuchteten Randes
    var chi = Math.atan2(cos(sEq.dec) * sin(sEq.ra - mEq.ra), sin(sEq.dec) * cos(mEq.dec) - cos(sEq.dec) * sin(mEq.dec) * cos(sEq.ra - mEq.ra)) * DEG;
    var q = Math.atan2(sin(mH.H), Math.tan(LAT * RAD) * cos(mEq.dec) - sin(mEq.dec) * cos(mH.H)) * DEG;
    return {
      jd: jd, lst: lst, sunce: { alt: refrakcija(sH.alt), az: sH.az },
      mjesec: { alt: refrakcija(mH.alt), az: mH.az, osv: osvijetljeno, rastuci: rastuci, ugao: chi - q, r: m.r }
    };
  }

  Nebo.stanje = stanje;
  Nebo.planeta = function (ime, datum) {
    var jd = julian(datum), p = planeta(ime, jd), h = horizont(p.ra, p.dec, zvjezdanoVrijeme(jd));
    return { ra: p.ra, dec: p.dec, alt: refrakcija(h.alt), az: h.az };
  };

  // Siva boja oblačnog neba / Grau des bewölkten Himmels
  function posivi(rgb, h, z) {
    if (z <= 0) return rgb;
    var p = rgb.match(/\d+/g), g = mijesaj("#0d1118", "#8d96a2", clamp((h + 6) / 14, 0, 1)).match(/\d+/g), r = [];
    for (var i = 0; i < 3; i++) r.push(Math.round(+p[i] + (+g[i] - p[i]) * z * 0.7));
    return "rgb(" + r.join(",") + ")";
  }

  Nebo.azuriraj = function (datum) {
    var t = datum.getTime();
    var st = stanje(datum), h = st.sunce.alt;
    Nebo.zadnje = st;
    var zastor = window.Prilike ? Prilike.zastor() : 0;
    if (Math.abs(zastor - zadnjiZastor) > 0.01) { zadnjiZastor = zastor; zadnjeBoje = 0; zadnjeTesko = 0; }

    // Pomračenje Sunca / Sonnenfinsternis
    var ps = aktivni("pomracenje-sunca", t)[0], svjetlo = 1, pomakX = 0, pomakY = 0, rM = 0;
    if (ps) {
      var min = (t - ps.odT) / 60000, tr = ps.trag, a = tr[0], b = tr[tr.length - 1];
      for (var i = 0; i < tr.length - 1; i++) if (min >= tr[i][0] && min <= tr[i + 1][0]) { a = tr[i]; b = tr[i + 1]; break; }
      var f = b[0] === a[0] ? 0 : (min - a[0]) / (b[0] - a[0]);
      pomakX = a[1] + (b[1] - a[1]) * f; pomakY = a[2] + (b[2] - a[2]) * f; rM = ps.omjer;
      var pk = pokrivenost(Math.sqrt(pomakX * pomakX + pomakY * pomakY), 1, rM);
      svjetlo = 1 - 0.75 * pk * pk;
    }

    // Boje neba (svakih 10 s) / Himmelsfarben
    if (t - zadnjeBoje > 10000 || ps) {
      zadnjeBoje = t;
      var c = bojeNeba(h, svjetlo).map(function (x) { return posivi(x, h, zastor); });
      el.st0.setAttribute("stop-color", c[0]); el.st1.setAttribute("stop-color", c[1]); el.st2.setAttribute("stop-color", c[2]);
      var sjajJacina = Math.exp(-Math.pow((h + 2) / 6, 2)) * svjetlo;
      var sp = projekcija(0, st.sunce.az);
      el.sjaj.setAttribute("cx", sp.x.toFixed(1)); el.sjaj.setAttribute("cy", opcije.horizont);
      el.sjaj.setAttribute("opacity", (sjajJacina * (1 - 0.7 * zastor)).toFixed(3));
    }

    // Sunce / Sonne
    var sp2 = projekcija(st.sunce.alt, st.sunce.az);
    el.sunceG.setAttribute("transform", "translate(" + sp2.x.toFixed(1) + " " + sp2.y.toFixed(1) + ")");
    el.sunceG.setAttribute("opacity", st.sunce.alt > -3 ? (1 - 0.85 * zastor).toFixed(2) : 0);
    el.sunceSjaj.setAttribute("opacity", (svjetlo * clamp((st.sunce.alt + 2) / 6, 0.35, 1)).toFixed(2));
    if (ps) {
      el.pomracenje.setAttribute("r", (36 * rM).toFixed(1));
      el.pomracenje.setAttribute("cx", (pomakX * 36).toFixed(1));
      el.pomracenje.setAttribute("cy", (-pomakY * 36).toFixed(1));
      el.pomracenje.setAttribute("fill", bojeNeba(h, svjetlo)[0]);
    } else el.pomracenje.setAttribute("r", 0);

    // Mjesec / Mond
    var mp = projekcija(st.mjesec.alt, st.mjesec.az), R = 30;
    el.mjesecG.setAttribute("transform", "translate(" + mp.x.toFixed(1) + " " + mp.y.toFixed(1) + ")");
    el.mjesecG.setAttribute("opacity", st.mjesec.alt > -2 ? (1 - 0.85 * zastor).toFixed(2) : 0);
    var k = st.mjesec.osv, rx = R * Math.abs(2 * k - 1);
    var dPut = k < 0.01 ? "" : "M0 " + (-R) + " A" + R + " " + R + " 0 0 1 0 " + R + " A" + rx.toFixed(2) + " " + R + " 0 0 " + (k > 0.5 ? 1 : 0) + " 0 " + (-R) + " Z";
    var ugao = st.mjesec.ugao, rot = Math.atan2(-cos(ugao), -sin(ugao)) * DEG;
    el.mjesecSvijetlo.setAttribute("d", dPut);
    el.mjesecSvijetlo.setAttribute("transform", "rotate(" + rot.toFixed(1) + ")");
    var dnevnoSvjetlo = clamp((h + 4) / 8, 0, 1);
    // tamna strana se vidi samo noću, slabo / dunkle Seite nur nachts, schwach
    el.mjesecTamno.setAttribute("fill", "#1c2536");
    el.mjesecTamno.setAttribute("opacity", (clamp((-h - 8) / 6, 0, 1) * 0.55).toFixed(2));
    el.mjesecSvijetlo.setAttribute("opacity", (1 - 0.45 * dnevnoSvjetlo).toFixed(2));
    el.mjesecSjaj.setAttribute("opacity", ((1 - dnevnoSvjetlo) * k).toFixed(2));
    // Pomračenje Mjeseca: crveni Mjesec / Mondfinsternis: roter Mond
    var pm = aktivni("pomracenje-mjeseca", t)[0], boja = "#f4f0e2";
    if (pm) {
      if (pm.sjenaOdT && t >= pm.sjenaOdT && t <= pm.sjenaDoT) {
        var u = 1 - Math.abs(t - pm.maxT) / Math.max(pm.maxT - pm.sjenaOdT, pm.sjenaDoT - pm.maxT);
        boja = mijesaj("#e9c9b8", "#a3402a", clamp(u * Math.min(1, pm.magnituda + 0.2), 0, 1));
      } else boja = "#cfc8b4";
    }
    el.mjesecSvijetlo.setAttribute("fill", boja);
    var mjesecina = k * clamp(st.mjesec.alt / 10, 0, 1);

    // Zvijezde, planete, Mliječni put (svakih 30 s) / Sterne, Planeten, Milchstraße
    if (t - zadnjeTesko > 30000) {
      zadnjeTesko = t;
      crtajZvijezde(st, h, mjesecina);
      crtajPlanete(datum, st, h);
      crtajMlijecni(st, h, mjesecina);
      el.zvijezde.setAttribute("opacity", (+el.zvijezde.getAttribute("opacity") * (1 - zastor)).toFixed(2));
      el.linije.setAttribute("opacity", (+el.linije.getAttribute("opacity") * (1 - zastor)).toFixed(3));
      el.planete.setAttribute("opacity", (1 - zastor).toFixed(2));
      el.mlijecni.setAttribute("opacity", (+el.mlijecni.getAttribute("opacity") * (1 - zastor)).toFixed(3));
    }

    // Zvijezde padalice / Sternschnuppen
    var mt = aktivni("meteori", t)[0];
    var p = h < -12 ? 1 / 300 : 0;
    if (mt && h < -10) p = mt.zhr / 3600 * 1.6 * (1 - 0.5 * mjesecina);
    p *= 1 - zastor;
    if (testMeteori && h < -6) p = 0.6;
    if (Math.random() < p) meteor(mt, st);
  };

  function crtajZvijezde(st, h, mjesecina) {
    var vid = clamp((-h - 4) / 10, 0, 1) * (1 - 0.35 * mjesecina);
    el.zvijezde.setAttribute("opacity", vid.toFixed(2));
    el.linije.setAttribute("opacity", (0.16 * vid).toFixed(3));
    if (vid <= 0) { el.zvijezde.innerHTML = ""; el.linije.innerHTML = ""; return; }
    var pos = {}, html = "";
    for (var n = 0; n < SLABE.length; n++) {
      var sl = SLABE[n], hs = horizont(sl[0] * 15, sl[1], st.lst);
      if (hs.alt < 3 || hs.az < opcije.azOd || hs.az > opcije.azDo) continue;
      var ps = projekcija(hs.alt, hs.az);
      if (ps.y < 0) continue;
      html += '<circle cx="' + ps.x.toFixed(0) + '" cy="' + ps.y.toFixed(0) + '" r="' + (5.6 - sl[2]).toFixed(2) + '" fill="#e8eeff" opacity="' + (0.95 - (sl[2] - 3.6) * 0.4).toFixed(2) + '"/>';
    }
    for (var i = 0; i < ZVIJEZDE.length; i++) {
      var z = ZVIJEZDE[i], hz = horizont(z[1] * 15, z[2], st.lst);
      if (hz.alt < 1 || hz.az < opcije.azOd || hz.az > opcije.azDo) continue;
      var p = projekcija(hz.alt, hz.az);
      if (p.y < 0) continue;
      pos[z[0]] = p;
      var r = Math.max(1.2, 3.6 - 0.75 * z[3]), op = clamp(1 - z[3] * 0.18, 0.35, 1);
      html += '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="' + r.toFixed(2) + '" fill="#fff" opacity="' + op.toFixed(2) + '"' +
        (z[3] < 1.5 ? ' class="nebo-trepti" style="animation-delay:-' + (i % 7) + 's"' : '') + '/>';
    }
    el.zvijezde.innerHTML = html;
    var lin = "";
    for (var j = 0; j < LINIJE.length; j++) {
      var a = pos[LINIJE[j][0]], b = pos[LINIJE[j][1]];
      if (a && b) lin += '<line x1="' + a.x.toFixed(1) + '" y1="' + a.y.toFixed(1) + '" x2="' + b.x.toFixed(1) + '" y2="' + b.y.toFixed(1) + '"/>';
    }
    el.linije.innerHTML = lin;
  }

  var PLANETE = [
    ["venera", "Venera", "Venus", "#fffbea", 6], ["jupiter", "Jupiter", "Jupiter", "#fff1d2", 5],
    ["saturn", "Saturn", "Saturn", "#f2dca8", 4], ["mars", "Mars", "Mars", "#ff9466", 4]
  ];
  function crtajPlanete(datum, st, h) {
    var html = "";
    for (var i = 0; i < PLANETE.length; i++) {
      var pl = PLANETE[i], ph = Nebo.planeta(pl[0], datum);
      var granica = pl[0] === "venera" ? -2 : -5;
      if (h > granica || ph.alt < 1 || ph.az < opcije.azOd || ph.az > opcije.azDo) continue;
      var p = projekcija(ph.alt, ph.az), op = clamp((granica - h) / 5, 0.3, 1);
      html += '<g opacity="' + op.toFixed(2) + '"><circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="' + (pl[4] * 2.6) + '" fill="' + pl[3] + '" opacity="0.18"/>' +
        '<circle cx="' + p.x.toFixed(1) + '" cy="' + p.y.toFixed(1) + '" r="' + pl[4] + '" fill="' + pl[3] + '"/></g>';
    }
    el.planete.innerHTML = html;
  }

  function crtajMlijecni(st, h, mjesecina) {
    var vid = clamp((-h - 14) / 4, 0, 1) * (1 - 0.85 * mjesecina);
    el.mlijecni.setAttribute("opacity", (0.55 * vid).toFixed(3));
    if (vid <= 0) { el.mlijecni.innerHTML = ""; return; }
    var dijelovi = [], tren = [];
    for (var i = 0; i <= MLIJECNI.length; i++) {
      var m = MLIJECNI[i % MLIJECNI.length], hz = horizont(m.p.ra, m.p.dec, st.lst);
      if (hz.alt > -8 && hz.az > opcije.azOd - 25 && hz.az < opcije.azDo + 25) {
        var p = projekcija(hz.alt, hz.az); p.l = m.l; tren.push(p);
      } else if (tren.length) { dijelovi.push(tren); tren = []; }
    }
    if (tren.length) dijelovi.push(tren);
    var html = "";
    for (var j = 0; j < dijelovi.length; j++) {
      if (dijelovi[j].length < 2) continue;
      var d = "M" + dijelovi[j].map(function (p) { return p.x.toFixed(0) + " " + p.y.toFixed(0); }).join(" L");
      html += '<path d="' + d + '" stroke="#9fb3e6" stroke-width="150" fill="none" opacity="0.35" stroke-linecap="round"/>';
      html += '<path d="' + d + '" stroke="#dfe6ff" stroke-width="55" fill="none" opacity="0.35" stroke-linecap="round"/>';
      // jače jezgro prema Strijelcu / helleres Zentrum Richtung Schütze
      dijelovi[j].forEach(function (p) {
        if (p.l < 30 || p.l > 330) html += '<circle cx="' + p.x.toFixed(0) + '" cy="' + p.y.toFixed(0) + '" r="70" fill="#f3e6cf" opacity="0.25"/>';
      });
    }
    el.mlijecni.innerHTML = html;
  }

  function meteor(roj, st) {
    var x, y, ugao;
    var rad = roj ? horizont(roj.radijant[0], roj.radijant[1], st.lst) : null;
    if (rad && rad.alt > 5 && rad.az > opcije.azOd && rad.az < opcije.azDo) {
      var rp = projekcija(rad.alt, rad.az);
      ugao = Math.random() * 360;
      var dist = 80 + Math.random() * 380;
      x = rp.x + Math.cos(ugao * RAD) * dist; y = rp.y + Math.sin(ugao * RAD) * dist;
    } else {
      x = opcije.x0 + Math.random() * (opcije.x1 - opcije.x0); y = 40 + Math.random() * (opcije.horizont * 0.55);
      ugao = Math.random() < 0.5 ? 150 + Math.random() * 20 : 10 + Math.random() * 20;
    }
    if (y > opcije.horizont - 40 || y < 0) return;
    var m = document.createElement("span");
    m.className = "nebo-meteor";
    m.style.left = (x / W * 100).toFixed(2) + "%";
    m.style.top = (y / H * 100).toFixed(2) + "%";
    m.style.transform = "rotate(" + ugao.toFixed(0) + "deg)";
    el.meteori.appendChild(m);
    setTimeout(function () { if (m.parentNode) m.parentNode.removeChild(m); }, 1600);
  }

  window.Nebo = Nebo;
})();
