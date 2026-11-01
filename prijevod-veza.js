/* =====================================================================
   Veza mobitel -> TV za prijevod hutbe (TEST)
   Verbindung Handy -> Fernseher für die Predigt-Übersetzung (TEST)

   Ide preko dva besplatna javna MQTT servera istovremeno (ako jedan ne radi, radi drugi).
   Läuft gleichzeitig über zwei kostenlose öffentliche MQTT-Server (fällt einer aus, geht der andere).
   Teme / Themen:
     <kanal>/stanje  – da li je prijevod uključen (zadržana poruka) / ob die Übersetzung läuft (gespeichert)
     <kanal>/tekst   – rečenice (bosanski + njemački) / Sätze (Bosnisch + Deutsch)
   ===================================================================== */
var PrijevodVeza = (function () {
  var SERVERI = ["wss://broker.hivemq.com:8884/mqtt", "wss://broker.emqx.io:8084/mqtt"];
  var m = /[?&]broker=([^&]+)/.exec(location.search);
  if (m) SERVERI = decodeURIComponent(m[1]).split(",");

  function povezi(kanal, opcije) {
    opcije = opcije || {};
    var klijenti = [], vidjeno = {}, redVidjenih = [];
    var stanjeVeze = SERVERI.map(function () { return false; });

    function javiStanje() {
      if (opcije.naStanjeVeze) opcije.naStanjeVeze(stanjeVeze.filter(Boolean).length, SERVERI.length);
    }

    SERVERI.forEach(function (url, i) {
      var o = {
        keepalive: 10,
        reconnectPeriod: 3000,
        connectTimeout: 8000,
        clean: true,
        clientId: "elif-" + Math.random().toString(36).slice(2, 10)
      };
      if (opcije.volja) {
        o.will = { topic: kanal + "/stanje", payload: JSON.stringify(opcije.volja), qos: 1, retain: true };
      }
      var k;
      try { k = mqtt.connect(url, o); } catch (e) { return; }
      k.on("connect", function () {
        stanjeVeze[i] = true; javiStanje();
        if (opcije.naPoruku) k.subscribe([kanal + "/stanje", kanal + "/tekst"], { qos: 0 });
        if (opcije.naPovezivanje) opcije.naPovezivanje();
      });
      k.on("close", function () { stanjeVeze[i] = false; javiStanje(); });
      k.on("offline", function () { stanjeVeze[i] = false; javiStanje(); });
      k.on("error", function () { /* ponovo se povezuje samo / verbindet sich selbst neu */ });
      k.on("message", function (tema, sadrzaj) {
        if (!opcije.naPoruku) return;
        var tekst = String(sadrzaj), poruka;
        try { poruka = JSON.parse(tekst); } catch (e) { return; }
        // Ista poruka stiže preko oba servera – samo jednom obraditi
        // Dieselbe Nachricht kommt über beide Server – nur einmal verarbeiten
        var kljuc = tema + "|" + tekst;
        if (vidjeno[kljuc]) return;
        vidjeno[kljuc] = 1; redVidjenih.push(kljuc);
        if (redVidjenih.length > 300) delete vidjeno[redVidjenih.shift()];
        opcije.naPoruku(tema.slice(kanal.length + 1), poruka);
      });
      klijenti.push(k);
    });

    return {
      posalji: function (tema, poruka, zadrzi) {
        var tekst = JSON.stringify(poruka);
        klijenti.forEach(function (k) {
          if (k.connected) k.publish(kanal + "/" + tema, tekst, { qos: zadrzi ? 1 : 0, retain: !!zadrzi });
        });
      },
      povezano: function () { return stanjeVeze.some(Boolean); },
      zatvori: function () { klijenti.forEach(function (k) { try { k.end(true); } catch (e) {} }); }
    };
  }

  return { povezi: povezi, serveri: SERVERI };
})();
