/*
 * Referenz-Implementierung: Gebetszeiten Džemat Eupen
 * Genau dieselben Regeln wie die TV-Anzeige (vaktija-tv/index.html).
 *
 * Eingabe:  ein Tag aus vaktija.json  ->  "zora izlazak podne ikindija aksam jacija" (HH:MM, Ortszeit Europe/Brussels)
 * Ausgabe:  alle Zeiten des Tages inkl. Ezan, Gebetsbeginn (Ikamet) und Džuma
 *
 * Alle Zeiten gelten auf die Minute genau, Sekunde 00 (z. B. 18:42 = 18:42:00).
 */

var PRAVILA = {
  sabahPrijeIzlaska: 60,   // Sabah-Ezan = Sonnenaufgang - 60 Min.
  ikametNakon: 10,         // Gebet = Ezan + 10 Min. (alle Gebete)
  hutbaLjeti: "14:00",     // Freitagspredigt in der Sommerzeit (MESZ)
  hutbaZimi: "13:00"       // Freitagspredigt in der Winterzeit (MEZ)
};

function uMinute(hhmm) { var p = hhmm.split(":"); return +p[0] * 60 + +p[1]; }
function uVrijeme(min) { min = ((min % 1440) + 1440) % 1440; return ("0" + Math.floor(min / 60)).slice(-2) + ":" + ("0" + min % 60).slice(-2); }

// Sommerzeit in Belgien: letzter Sonntag im März 02:00 bis letzter Sonntag im Oktober 03:00.
// Wichtig: nach dem DATUM in Belgien entscheiden, nicht nach der Zeitzone des Geräts.
function letzterSonntag(jahr, monat) {           // monat: 0 = Januar
  var d = new Date(Date.UTC(jahr, monat + 1, 0));
  return d.getUTCDate() - d.getUTCDay();
}
function istSommerzeit(jahr, monat, tag) {       // monat: 1–12
  var beginn = letzterSonntag(jahr, 2), ende = letzterSonntag(jahr, 9);
  if (monat > 3 && monat < 10) return true;
  if (monat === 3) return tag >= beginn;
  if (monat === 10) return tag < ende;
  return false;
}

/**
 * @param {string} datum  "YYYY-MM-DD"
 * @param {string} zeile  Eintrag aus vaktija.json, z. B. "06:21 08:10 13:22 15:59 18:32 20:13"
 */
function tagesplan(datum, zeile) {
  var t = zeile.split(/\s+/);
  var j = +datum.slice(0, 4), m = +datum.slice(5, 7), d = +datum.slice(8, 10);
  var freitag = new Date(Date.UTC(j, m - 1, d)).getUTCDay() === 5;
  var izlazak = uMinute(t[1]);
  var sabahEzan = izlazak - PRAVILA.sabahPrijeIzlaska;

  var plan = {
    datum: datum,
    zora:     { vakat: t[0], ezan: uVrijeme(sabahEzan),   namaz: uVrijeme(sabahEzan + PRAVILA.ikametNakon) },
    izlazak:  { vakat: t[1] },
    podne:    { vakat: t[2], ezan: t[2], namaz: uVrijeme(uMinute(t[2]) + PRAVILA.ikametNakon) },
    ikindija: { vakat: t[3], ezan: t[3], namaz: uVrijeme(uMinute(t[3]) + PRAVILA.ikametNakon) },
    aksam:    { vakat: t[4], ezan: t[4], namaz: uVrijeme(uMinute(t[4]) + PRAVILA.ikametNakon) },
    jacija:   { vakat: t[5], ezan: t[5], namaz: uVrijeme(uMinute(t[5]) + PRAVILA.ikametNakon) },
    dzuma: null
  };
  if (freitag) plan.dzuma = { hutba: istSommerzeit(j, m, d) ? PRAVILA.hutbaLjeti : PRAVILA.hutbaZimi };
  return plan;
}

if (typeof module !== "undefined") module.exports = { PRAVILA: PRAVILA, tagesplan: tagesplan, istSommerzeit: istSommerzeit };
