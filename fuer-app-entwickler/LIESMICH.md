# Gebetszeiten Džemat Eupen – Infos für die App

Die TV-Anzeige in der Moschee und die App sollen **auf die Minute dieselben Zeiten** zeigen.
Dafür braucht die App nichts mit dem Fernseher zu verbinden. Es reicht, wenn beide
**dieselben Daten** und **dieselben Regeln** benutzen und **die Uhr der Geräte stimmt**.

## 1. Woher kommen die Zeiten?

Aus dem **Takvim (Vaktija) der Islamska Zajednica** für Eupen: eine Jahrestabelle mit 6 Zeiten pro Tag.
Die Zeiten werden **nicht berechnet**, sondern 1:1 aus dieser Tabelle übernommen.

Datei: `vaktija.json`

```json
{
 "ort": "Eupen, Belgien",
 "zeitzone": "Europe/Brussels",
 "beispieldaten": true,
 "format": "zora izlazak podne ikindija aksam jacija (HH:MM Ortszeit)",
 "tage": {
  "2026-10-22": "06:21 08:10 13:22 15:59 18:32 20:13",
  ...
 }
}
```

- Alle Zeiten sind **Ortszeit Belgien** (Europe/Brussels), Sommer- und Winterzeit sind schon eingerechnet.
- Jedes Jahr gibt es eine neue Datei. Das Format bleibt gleich.
- Die Datei enthält nur die **echten Takvim-Zeiten** (aktuell November–Dezember 2026), nichts Berechnetes.
  Mit jedem neuen Takvim kommt eine neue Version.

## 2. Regeln der Moschee

| Was | Regel |
|---|---|
| Vakat (Beginn der Gebetszeit) | direkt aus der Tabelle |
| **Sabah-Ezan** | Sonnenaufgang (izlazak) **− 60 Minuten** |
| **Gebet (Ikamet)** | Ezan **+ 10 Minuten**, bei allen 5 Gebeten |
| Ezan Podne, Ikindija, Akšam, Jacija | = Vakat aus der Tabelle |
| **Džuma (Freitag): Hutba/Predigt** | **14:00 in der Sommerzeit**, **13:00 in der Winterzeit** |

Sommerzeit in Belgien: vom letzten Sonntag im März bis zum letzten Sonntag im Oktober.

Die Datei `gebetszeiten-regeln.js` enthält genau diese Regeln als fertigen Code
(Funktion `tagesplan(datum, zeile)`). Er ist identisch zu dem, was der Fernseher macht.
Bei einer App in einer anderen Sprache (Kotlin, Swift, Dart …) kann man ihn 1:1 übertragen.
Es sind nur ca. 30 Zeilen.

## 3. Damit es auf die Sekunde passt

1. **Jede Zeit gilt ab Sekunde 00.** „Gebet 18:42“ heißt 18:42:00. Countdowns rechnen bis genau dorthin.
2. **Gerätezeit nicht selbst stellen.** Fernseher und Handys holen sich die Uhrzeit automatisch aus dem
   Internet (NTP). Beim Fernseher-Gerät ist „Automatische Uhrzeit“ eingeschaltet. Dann liegen beide
   höchstens Bruchteile einer Sekunde auseinander.
3. **Zeitzone immer Europe/Brussels**, auch wenn das Handy des Nutzers z. B. im Urlaub in einer anderen Zeitzone ist.
   Die Moschee-Zeiten sind Eupen-Zeiten.
4. **Nichts runden oder verschieben.** Keine eigenen Berechnungsmethoden, keine „+1 Minute zur Sicherheit“.

## 4. Testfälle

Wenn die App für diese Tage genau diese Zeiten zeigt, stimmt alles überein.
Die Werte stammen aus dem **echten Takvim** (November/Dezember 2026).

| Datum | Zora | Sabah Ezan / Gebet | Izlazak | Podne / Gebet | Ikindija / Gebet | Akšam / Gebet | Jacija / Gebet | Džuma |
|---|---|---|---|---|---|---|---|---|
| 2026-11-02 (Mo) | 05:40 | 06:27 / 06:37 | 07:27 | 12:26 / 12:36 | 14:49 / 14:59 | 17:15 / 17:25 | 18:55 / 19:05 | – |
| 2026-11-06 (Fr) | 05:46 | 06:34 / 06:44 | 07:34 | 12:26 / 12:36 | 14:43 / 14:53 | 17:08 / 17:18 | 18:48 / 18:58 | **13:00** |
| 2026-11-13 (Fr) | 05:57 | 06:46 / 06:56 | 07:46 | 12:27 / 12:37 | 14:35 / 14:45 | 16:57 / 17:07 | 18:37 / 18:47 | **13:00** |
| 2026-12-10 (Do) | 06:29 | 07:26 / 07:36 | 08:26 | 12:35 / 12:45 | 14:19 / 14:29 | 16:35 / 16:45 | 18:15 / 18:25 | – |
| 2026-12-11 (Fr) | 06:30 | 07:27 / 07:37 | 08:27 | 12:36 / 12:46 | 14:19 / 14:29 | 16:35 / 16:45 | 18:15 / 18:25 | **13:00** |
| 2026-12-31 (Do) | 06:40 | 07:37 / 07:47 | 08:37 | 12:45 / 12:55 | 14:29 / 14:39 | 16:44 / 16:54 | 18:24 / 18:34 | – |

Sonderfall: Wenn Jacija sehr spät ist (z. B. 23:55), fällt das Gebet (+10 Min.) auf **nach Mitternacht**.
Die App sollte das als nächsten Kalendertag behandeln und nicht als 00:05 desselben Tages.

## 5. Optional: eine gemeinsame Datei

Die TV-Anzeige liegt als Webseite im Internet. Dort ist auch `vaktija.json` erreichbar.
Die App kann diese Datei z. B. einmal am Tag laden. Dann muss bei einem neuen Takvim nur **eine** Datei
geändert werden, und Fernseher und App sind automatisch gleich.
Das ist **keine** Verbindung zum Fernseher, nur dieselbe Datei als Quelle. Die Adresse gibt es,
sobald die Anzeige online ist.

## Dateien

- `vaktija.json` – Gebetszeiten (Jahrestabelle)
- `gebetszeiten-regeln.js` – Regeln als Referenz-Code (JavaScript)
- `LIESMICH.md` – diese Anleitung
