// Vaktija Eupen – učitavanje vremena namaza za Flutter
// Gebetszeiten Eupen – Laden der Gebetszeiten für Flutter
//
// pubspec.yaml:
//   dependencies:
//     http: ^1.2.0
//
// Primjer / Beispiel:
//   final vaktija = await VaktijaEupen.ucitaj();
//   final danas = vaktija.zaDan(DateTime.now());
//   print(danas?.podne);              // "12:26"
//   print(vaktija.sljedeci(DateTime.now()));  // Sljedeci(Akšam, 2026-11-02 17:15)

import 'dart:convert';
import 'package:http/http.dart' as http;

const String vaktijaUrl =
    'https://davud012.github.io/vaktija-eupen/fuer-app-entwickler/vaktija.json';

/// Vremena jednog dana iz takvima (lokalno vrijeme Belgije, "HH:MM").
class DanVaktije {
  final DateTime datum;
  final String zora, izlazak, podne, ikindija, aksam, jacija;

  DanVaktije(this.datum, List<String> t)
      : zora = t[0],
        izlazak = t[1],
        podne = t[2],
        ikindija = t[3],
        aksam = t[4],
        jacija = t[5];

  /// Svi vakti redom: (naziv, vrijeme "HH:MM")
  List<MapEntry<String, String>> get vakti => [
        MapEntry('Zora', zora),
        MapEntry('Izlazak sunca', izlazak),
        MapEntry('Podne', podne),
        MapEntry('Ikindija', ikindija),
        MapEntry('Akšam', aksam),
        MapEntry('Jacija', jacija),
      ];

  /// "HH:MM" -> DateTime tog dana (sekunda 00)
  DateTime uDatum(String hhmm) {
    final p = hhmm.split(':');
    return DateTime(datum.year, datum.month, datum.day, int.parse(p[0]), int.parse(p[1]));
  }
}

class Sljedeci {
  final String naziv;
  final DateTime vrijeme;
  Sljedeci(this.naziv, this.vrijeme);
  @override
  String toString() => 'Sljedeci($naziv, $vrijeme)';
}

class VaktijaEupen {
  final Map<String, List<String>> _tage;
  VaktijaEupen(this._tage);

  /// Učitava fajl sa interneta. Savjet: sačuvati odgovor lokalno (npr. shared_preferences)
  /// i koristiti ga kad nema interneta; ponovo učitati jednom dnevno.
  static Future<VaktijaEupen> ucitaj({String url = vaktijaUrl}) async {
    final res = await http.get(Uri.parse(url));
    if (res.statusCode != 200) throw Exception('Vaktija: HTTP ${res.statusCode}');
    return izJsona(utf8.decode(res.bodyBytes));
  }

  static VaktijaEupen izJsona(String tekst) {
    final j = jsonDecode(tekst) as Map<String, dynamic>;
    final tage = (j['tage'] as Map<String, dynamic>).map(
        (k, v) => MapEntry(k, (v as String).trim().split(RegExp(r'\s+'))));
    return VaktijaEupen(tage);
  }

  static String _kljuc(DateTime d) =>
      '${d.year.toString().padLeft(4, '0')}-${d.month.toString().padLeft(2, '0')}-${d.day.toString().padLeft(2, '0')}';

  /// Vremena za dan, ili null ako taj dan nije u fajlu.
  DanVaktije? zaDan(DateTime d) {
    final t = _tage[_kljuc(d)];
    if (t == null || t.length < 6) return null;
    return DanVaktije(DateTime(d.year, d.month, d.day), t);
  }

  /// Sljedeći vakat od trenutka [sada] (gleda i sutrašnju zoru poslije jacije).
  Sljedeci? sljedeci(DateTime sada) {
    for (var i = 0; i < 2; i++) {
      final dan = zaDan(DateTime(sada.year, sada.month, sada.day + i));
      if (dan == null) continue;
      for (final v in dan.vakti) {
        final t = dan.uDatum(v.value);
        if (t.isAfter(sada)) return Sljedeci(v.key, t);
      }
    }
    return null;
  }
}
