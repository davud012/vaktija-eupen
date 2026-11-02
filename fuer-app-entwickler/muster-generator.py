import math, sys
al = math.radians(float(sys.argv[1])); out = sys.argv[2]
P = 100.0; s = P / (1 + math.sqrt(2))

def poly(cx, cy, n, R, r0):
    return (cx, cy), [(cx + R * math.cos(r0 + 2 * math.pi * k / n), cy + R * math.sin(r0 + 2 * math.pi * k / n)) for k in range(n)]

def rot(d, a):
    return (d[0] * math.cos(a) - d[1] * math.sin(a), d[0] * math.sin(a) + d[1] * math.cos(a))

segs = []

def hankin(c, v):
    n = len(v)
    def mid(k):
        a, b = v[k % n], v[(k + 1) % n]
        return ((a[0] + b[0]) / 2, (a[1] + b[1]) / 2)
    def ray_toward(k, tgt):
        m = mid(k)
        L = math.hypot(c[0] - m[0], c[1] - m[1])
        nn = ((c[0] - m[0]) / L, (c[1] - m[1]) / L)
        r1, r2 = rot(nn, al), rot(nn, -al)
        dv = (tgt[0] - m[0], tgt[1] - m[1])
        return m, (r1 if r1[0] * dv[0] + r1[1] * dv[1] > r2[0] * dv[0] + r2[1] * dv[1] else r2)
    for k in range(n):
        b = v[(k + 1) % n]
        p, d = ray_toward(k, b)
        q, e = ray_toward(k + 1, b)
        den = d[0] * e[1] - d[1] * e[0]
        if abs(den) < 1e-9: continue
        t = ((q[0] - p[0]) * e[1] - (q[1] - p[1]) * e[0]) / den
        x = (p[0] + t * d[0], p[1] + t * d[1])
        segs.append((p, x)); segs.append((x, q))

Ro = s / 2 / math.sin(math.pi / 8)
for cx, cy in [(0, 0), (P, 0), (0, P), (P, P)]:
    hankin(*poly(cx, cy, 8, Ro, math.pi / 8))
hankin(*poly(P / 2, P / 2, 4, s / math.sqrt(2), 0))
d = "".join("M%.2f %.2fL%.2f %.2f" % (a[0], a[1], b[0], b[1]) for a, b in segs)
sw = sys.argv[3] if len(sys.argv) > 3 else "1.6"
open(out, "w").write('<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><path d="%s" fill="none" stroke="#e3c27a" stroke-width="%s" stroke-linecap="round" stroke-linejoin="round"/></svg>' % (d, sw))
