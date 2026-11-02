import math, sys
al = math.radians(float(sys.argv[1])); out = sys.argv[2]; sw = sys.argv[3] if len(sys.argv) > 3 else "1.6"
a = 20.0                      # Sechseck-Kantenlänge
W = math.sqrt(3) * a; H = 3 * a
def rot(d, t): return (d[0]*math.cos(t) - d[1]*math.sin(t), d[0]*math.sin(t) + d[1]*math.cos(t))
segs = []
def hankin(c, v):
    n = len(v)
    def mid(k):
        p, q = v[k % n], v[(k + 1) % n]; return ((p[0]+q[0])/2, (p[1]+q[1])/2)
    def ray(k, tgt):
        m = mid(k); L = math.hypot(c[0]-m[0], c[1]-m[1]); nn = ((c[0]-m[0])/L, (c[1]-m[1])/L)
        r1, r2 = rot(nn, al), rot(nn, -al); dv = (tgt[0]-m[0], tgt[1]-m[1])
        return m, (r1 if r1[0]*dv[0]+r1[1]*dv[1] > r2[0]*dv[0]+r2[1]*dv[1] else r2)
    for k in range(n):
        b = v[(k + 1) % n]
        p, d = ray(k, b); q, e = ray(k + 1, b)
        den = d[0]*e[1] - d[1]*e[0]
        if abs(den) < 1e-9: continue
        t = ((q[0]-p[0])*e[1] - (q[1]-p[1])*e[0]) / den
        x = (p[0]+t*d[0], p[1]+t*d[1]); segs.append((p, x)); segs.append((x, q))
centres = []
for i in range(-1, 3):
    for j in range(-1, 3):
        centres.append((i*W, j*H)); centres.append((i*W + W/2, j*H + H/2))
for cx, cy in centres:
    v = [(cx + a*math.cos(math.radians(90 + 60*k)), cy + a*math.sin(math.radians(90 + 60*k))) for k in range(6)]
    hankin((cx, cy), v)
d = "".join("M%.2f %.2fL%.2f %.2f" % (p[0], p[1], q[0], q[1]) for p, q in segs
            if not (max(p[0], q[0]) < -1 or min(p[0], q[0]) > W+1 or max(p[1], q[1]) < -1 or min(p[1], q[1]) > H+1))
open(out, "w").write('<svg xmlns="http://www.w3.org/2000/svg" width="%.3f" height="%.3f" viewBox="0 0 %.3f %.3f"><path d="%s" fill="none" stroke="#e3c27a" stroke-width="%s" stroke-linecap="round"/></svg>' % (W, H, W, H, d, sw))
