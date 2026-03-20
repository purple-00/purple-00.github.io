!function() {
    function n(n, e, t) {
        return n.getAttribute(e) || t
    }
    function e(n) {
        return document.getElementsByTagName(n)
    }
    function t() {
        var t = e("script"), o = t.length, i = t[o - 1];
        return {
            l: o,
            z: n(i, "zIndex", -1),
            o: n(i, "opacity", .5),
            c: n(i, "color", "0,0,0"),
            n: n(i, "count", 99)
        }
    }
    function o() {
        a = m.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        s = m.height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    }
    function i() {
        r.clearRect(0, 0, a, s);
        var n, e, t, o, l, c;
        for (n = 0; u.length > n; n++)
            for (u[n].x += u[n].xa, u[n].y += u[n].ya, u[n].xa *= u[n].x > a || u[n].x < 0 ? -1 : 1, u[n].ya *= u[n].y > s || u[n].y < 0 ? -1 : 1, r.fillRect(u[n].x - .5, u[n].y - .5, 1, 1), e = n + 1; u.length > e; e++)
                (t = u[n].x - u[e].x) * t + (o = u[n].y - u[e].y) * o < u[e].max && (l = 1 - o / u[e].max, r.beginPath(), r.lineWidth = l, r.strokeStyle = "rgba(" + d.c + "," + l + ")", r.moveTo(u[n].x, u[n].y), r.lineTo(u[e].x, u[e].y), r.stroke())
    }
    var a, s, m = document.createElement("canvas"),
        d = t(),
        r = m.getContext("2d"),
        c = "rgba(" + d.c + "," + d.o + ")",
        u = [];
    m.id = "c_n",
    m.style.cssText = "position:fixed;top:0;left:0;z-index:" + d.z + ";",
    e("body")[0].appendChild(m),
    o(),
    window.onresize = o,
    r.fillStyle = c,
    r.strokeStyle = c,
    r.lineWidth = .1;
    for (var l = 0; d.n > l; l++) {
        var h = Math.random() * a,
            f = Math.random() * s,
            g = 2 * Math.random() - 1,
            v = 2 * Math.random() - 1;
        u.push({
            x: h,
            y: f,
            xa: g,
            ya: v,
            max: 6e3
        })
    }
    setInterval(i, 16)
}();