function showError(errId, errMsg) {
    alert('An error occured: ' + errId + ', ' + errMsg);
}

function patchInitialized() {}

function patchFinishedLoading() {}

var CABLES;

document.addEventListener('DOMContentLoaded', function (event) {
    CABLES.patch = new CABLES.Patch({
        patch: CABLES.exportedPatch,
        prefixAssetPath: '',
        glCanvasId: 'glcanvas',
        glCanvasResizeToWindow: true,
        onError: showError,
        onPatchLoaded: patchInitialized,
        onFinishedLoading: patchFinishedLoading,
    });
});
! function (e, t) {
    "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).glMatrix = {})
}(this, function (e) {
    "use strict";
    var t = 1e-6,
        n = "undefined" != typeof Float32Array ? Float32Array : Array,
        a = Math.random,
        i = Math.PI / 180;
    Math.hypot || (Math.hypot = function () {
        for (var e = 0, t = arguments.length; t--;) e += arguments[t] * arguments[t];
        return Math.sqrt(e)
    });
    var r = Object.freeze({
        EPSILON: t,
        get ARRAY_TYPE() {
            return n
        },
        RANDOM: a,
        setMatrixArrayType: function (e) {
            n = e
        },
        toRadian: function (e) {
            return e * i
        },
        equals: function (e, n) {
            return Math.abs(e - n) <= t * Math.max(1, Math.abs(e), Math.abs(n))
        }
    });

    function o(e, t, n) {
        var a = t[0],
            i = t[1],
            r = t[2],
            o = t[3],
            s = n[0],
            l = n[1],
            u = n[2],
            c = n[3];
        return e[0] = a * s + r * l, e[1] = i * s + o * l, e[2] = a * u + r * c, e[3] = i * u + o * c, e
    }

    function s(e, t, n) {
        return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e[2] = t[2] - n[2], e[3] = t[3] - n[3], e
    }
    var l = o,
        u = s,
        c = Object.freeze({
            create: function () {
                var e = new n(4);
                return n != Float32Array && (e[1] = 0, e[2] = 0), e[0] = 1, e[3] = 1, e
            },
            clone: function (e) {
                var t = new n(4);
                return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
            },
            copy: function (e, t) {
                return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e
            },
            identity: function (e) {
                return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e
            },
            fromValues: function (e, t, a, i) {
                var r = new n(4);
                return r[0] = e, r[1] = t, r[2] = a, r[3] = i, r
            },
            set: function (e, t, n, a, i) {
                return e[0] = t, e[1] = n, e[2] = a, e[3] = i, e
            },
            transpose: function (e, t) {
                if (e === t) {
                    var n = t[1];
                    e[1] = t[2], e[2] = n
                } else e[0] = t[0], e[1] = t[2], e[2] = t[1], e[3] = t[3];
                return e
            },
            invert: function (e, t) {
                var n = t[0],
                    a = t[1],
                    i = t[2],
                    r = t[3],
                    o = n * r - i * a;
                return o ? (o = 1 / o, e[0] = r * o, e[1] = -a * o, e[2] = -i * o, e[3] = n * o, e) : null
            },
            adjoint: function (e, t) {
                var n = t[0];
                return e[0] = t[3], e[1] = -t[1], e[2] = -t[2], e[3] = n, e
            },
            determinant: function (e) {
                return e[0] * e[3] - e[2] * e[1]
            },
            multiply: o,
            rotate: function (e, t, n) {
                var a = t[0],
                    i = t[1],
                    r = t[2],
                    o = t[3],
                    s = Math.sin(n),
                    l = Math.cos(n);
                return e[0] = a * l + r * s, e[1] = i * l + o * s, e[2] = a * -s + r * l, e[3] = i * -s + o * l, e
            },
            scale: function (e, t, n) {
                var a = t[0],
                    i = t[1],
                    r = t[2],
                    o = t[3],
                    s = n[0],
                    l = n[1];
                return e[0] = a * s, e[1] = i * s, e[2] = r * l, e[3] = o * l, e
            },
            fromRotation: function (e, t) {
                var n = Math.sin(t),
                    a = Math.cos(t);
                return e[0] = a, e[1] = n, e[2] = -n, e[3] = a, e
            },
            fromScaling: function (e, t) {
                return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = t[1], e
            },
            str: function (e) {
                return "mat2(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")"
            },
            frob: function (e) {
                return Math.hypot(e[0], e[1], e[2], e[3])
            },
            LDU: function (e, t, n, a) {
                return e[2] = a[2] / a[0], n[0] = a[0], n[1] = a[1], n[3] = a[3] - e[2] * n[1], [e, t, n]
            },
            add: function (e, t, n) {
                return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e[2] = t[2] + n[2], e[3] = t[3] + n[3], e
            },
            subtract: s,
            exactEquals: function (e, t) {
                return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3]
            },
            equals: function (e, n) {
                var a = e[0],
                    i = e[1],
                    r = e[2],
                    o = e[3],
                    s = n[0],
                    l = n[1],
                    u = n[2],
                    c = n[3];
                return Math.abs(a - s) <= t * Math.max(1, Math.abs(a), Math.abs(s)) && Math.abs(i - l) <= t * Math.max(1, Math.abs(i), Math.abs(l)) && Math.abs(r - u) <= t * Math.max(1, Math.abs(r), Math.abs(u)) && Math.abs(o - c) <= t * Math.max(1, Math.abs(o), Math.abs(c))
            },
            multiplyScalar: function (e, t, n) {
                return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e[3] = t[3] * n, e
            },
            multiplyScalarAndAdd: function (e, t, n, a) {
                return e[0] = t[0] + n[0] * a, e[1] = t[1] + n[1] * a, e[2] = t[2] + n[2] * a, e[3] = t[3] + n[3] * a, e
            },
            mul: l,
            sub: u
        });

    function d(e, t, n) {
        var a = t[0],
            i = t[1],
            r = t[2],
            o = t[3],
            s = t[4],
            l = t[5],
            u = n[0],
            c = n[1],
            d = n[2],
            h = n[3],
            f = n[4],
            b = n[5];
        return e[0] = a * u + r * c, e[1] = i * u + o * c, e[2] = a * d + r * h, e[3] = i * d + o * h, e[4] = a * f + r * b + s, e[5] = i * f + o * b + l, e
    }

    function h(e, t, n) {
        return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e[2] = t[2] - n[2], e[3] = t[3] - n[3], e[4] = t[4] - n[4], e[5] = t[5] - n[5], e
    }
    var f = d,
        b = h,
        p = Object.freeze({
            create: function () {
                var e = new n(6);
                return n != Float32Array && (e[1] = 0, e[2] = 0, e[4] = 0, e[5] = 0), e[0] = 1, e[3] = 1, e
            },
            clone: function (e) {
                var t = new n(6);
                return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t
            },
            copy: function (e, t) {
                return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e
            },
            identity: function (e) {
                return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e
            },
            fromValues: function (e, t, a, i, r, o) {
                var s = new n(6);
                return s[0] = e, s[1] = t, s[2] = a, s[3] = i, s[4] = r, s[5] = o, s
            },
            set: function (e, t, n, a, i, r, o) {
                return e[0] = t, e[1] = n, e[2] = a, e[3] = i, e[4] = r, e[5] = o, e
            },
            invert: function (e, t) {
                var n = t[0],
                    a = t[1],
                    i = t[2],
                    r = t[3],
                    o = t[4],
                    s = t[5],
                    l = n * r - a * i;
                return l ? (l = 1 / l, e[0] = r * l, e[1] = -a * l, e[2] = -i * l, e[3] = n * l, e[4] = (i * s - r * o) * l, e[5] = (a * o - n * s) * l, e) : null
            },
            determinant: function (e) {
                return e[0] * e[3] - e[1] * e[2]
            },
            multiply: d,
            rotate: function (e, t, n) {
                var a = t[0],
                    i = t[1],
                    r = t[2],
                    o = t[3],
                    s = t[4],
                    l = t[5],
                    u = Math.sin(n),
                    c = Math.cos(n);
                return e[0] = a * c + r * u, e[1] = i * c + o * u, e[2] = a * -u + r * c, e[3] = i * -u + o * c, e[4] = s, e[5] = l, e
            },
            scale: function (e, t, n) {
                var a = t[0],
                    i = t[1],
                    r = t[2],
                    o = t[3],
                    s = t[4],
                    l = t[5],
                    u = n[0],
                    c = n[1];
                return e[0] = a * u, e[1] = i * u, e[2] = r * c, e[3] = o * c, e[4] = s, e[5] = l, e
            },
            translate: function (e, t, n) {
                var a = t[0],
                    i = t[1],
                    r = t[2],
                    o = t[3],
                    s = t[4],
                    l = t[5],
                    u = n[0],
                    c = n[1];
                return e[0] = a, e[1] = i, e[2] = r, e[3] = o, e[4] = a * u + r * c + s, e[5] = i * u + o * c + l, e
            },
            fromRotation: function (e, t) {
                var n = Math.sin(t),
                    a = Math.cos(t);
                return e[0] = a, e[1] = n, e[2] = -n, e[3] = a, e[4] = 0, e[5] = 0, e
            },
            fromScaling: function (e, t) {
                return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = t[1], e[4] = 0, e[5] = 0, e
            },
            fromTranslation: function (e, t) {
                return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = t[0], e[5] = t[1], e
            },
            str: function (e) {
                return "mat2d(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ")"
            },
            frob: function (e) {
                return Math.hypot(e[0], e[1], e[2], e[3], e[4], e[5], 1)
            },
            add: function (e, t, n) {
                return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e[2] = t[2] + n[2], e[3] = t[3] + n[3], e[4] = t[4] + n[4], e[5] = t[5] + n[5], e
            },
            subtract: h,
            multiplyScalar: function (e, t, n) {
                return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e[3] = t[3] * n, e[4] = t[4] * n, e[5] = t[5] * n, e
            },
            multiplyScalarAndAdd: function (e, t, n, a) {
                return e[0] = t[0] + n[0] * a, e[1] = t[1] + n[1] * a, e[2] = t[2] + n[2] * a, e[3] = t[3] + n[3] * a, e[4] = t[4] + n[4] * a, e[5] = t[5] + n[5] * a, e
            },
            exactEquals: function (e, t) {
                return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5]
            },
            equals: function (e, n) {
                var a = e[0],
                    i = e[1],
                    r = e[2],
                    o = e[3],
                    s = e[4],
                    l = e[5],
                    u = n[0],
                    c = n[1],
                    d = n[2],
                    h = n[3],
                    f = n[4],
                    b = n[5];
                return Math.abs(a - u) <= t * Math.max(1, Math.abs(a), Math.abs(u)) && Math.abs(i - c) <= t * Math.max(1, Math.abs(i), Math.abs(c)) && Math.abs(r - d) <= t * Math.max(1, Math.abs(r), Math.abs(d)) && Math.abs(o - h) <= t * Math.max(1, Math.abs(o), Math.abs(h)) && Math.abs(s - f) <= t * Math.max(1, Math.abs(s), Math.abs(f)) && Math.abs(l - b) <= t * Math.max(1, Math.abs(l), Math.abs(b))
            },
            mul: f,
            sub: b
        });

    function m() {
        var e = new n(9);
        return n != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[5] = 0, e[6] = 0, e[7] = 0), e[0] = 1, e[4] = 1, e[8] = 1, e
    }

    function g(e, t, n) {
        var a = t[0],
            i = t[1],
            r = t[2],
            o = t[3],
            s = t[4],
            l = t[5],
            u = t[6],
            c = t[7],
            d = t[8],
            h = n[0],
            f = n[1],
            b = n[2],
            p = n[3],
            m = n[4],
            g = n[5],
            v = n[6],
            _ = n[7],
            O = n[8];
        return e[0] = h * a + f * o + b * u, e[1] = h * i + f * s + b * c, e[2] = h * r + f * l + b * d, e[3] = p * a + m * o + g * u, e[4] = p * i + m * s + g * c, e[5] = p * r + m * l + g * d, e[6] = v * a + _ * o + O * u, e[7] = v * i + _ * s + O * c, e[8] = v * r + _ * l + O * d, e
    }

    function v(e, t, n) {
        return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e[2] = t[2] - n[2], e[3] = t[3] - n[3], e[4] = t[4] - n[4], e[5] = t[5] - n[5], e[6] = t[6] - n[6], e[7] = t[7] - n[7], e[8] = t[8] - n[8], e
    }
    var _ = g,
        O = v,
        I = Object.freeze({
            create: m,
            fromMat4: function (e, t) {
                return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[4], e[4] = t[5], e[5] = t[6], e[6] = t[8], e[7] = t[9], e[8] = t[10], e
            },
            clone: function (e) {
                var t = new n(9);
                return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t
            },
            copy: function (e, t) {
                return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e
            },
            fromValues: function (e, t, a, i, r, o, s, l, u) {
                var c = new n(9);
                return c[0] = e, c[1] = t, c[2] = a, c[3] = i, c[4] = r, c[5] = o, c[6] = s, c[7] = l, c[8] = u, c
            },
            set: function (e, t, n, a, i, r, o, s, l, u) {
                return e[0] = t, e[1] = n, e[2] = a, e[3] = i, e[4] = r, e[5] = o, e[6] = s, e[7] = l, e[8] = u, e
            },
            identity: function (e) {
                return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e
            },
            transpose: function (e, t) {
                if (e === t) {
                    var n = t[1],
                        a = t[2],
                        i = t[5];
                    e[1] = t[3], e[2] = t[6], e[3] = n, e[5] = t[7], e[6] = a, e[7] = i
                } else e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8];
                return e
            },
            invert: function (e, t) {
                var n = t[0],
                    a = t[1],
                    i = t[2],
                    r = t[3],
                    o = t[4],
                    s = t[5],
                    l = t[6],
                    u = t[7],
                    c = t[8],
                    d = c * o - s * u,
                    h = -c * r + s * l,
                    f = u * r - o * l,
                    b = n * d + a * h + i * f;
                return b ? (b = 1 / b, e[0] = d * b, e[1] = (-c * a + i * u) * b, e[2] = (s * a - i * o) * b, e[3] = h * b, e[4] = (c * n - i * l) * b, e[5] = (-s * n + i * r) * b, e[6] = f * b, e[7] = (-u * n + a * l) * b, e[8] = (o * n - a * r) * b, e) : null
            },
            adjoint: function (e, t) {
                var n = t[0],
                    a = t[1],
                    i = t[2],
                    r = t[3],
                    o = t[4],
                    s = t[5],
                    l = t[6],
                    u = t[7],
                    c = t[8];
                return e[0] = o * c - s * u, e[1] = i * u - a * c, e[2] = a * s - i * o, e[3] = s * l - r * c, e[4] = n * c - i * l, e[5] = i * r - n * s, e[6] = r * u - o * l, e[7] = a * l - n * u, e[8] = n * o - a * r, e
            },
            determinant: function (e) {
                var t = e[0],
                    n = e[1],
                    a = e[2],
                    i = e[3],
                    r = e[4],
                    o = e[5],
                    s = e[6],
                    l = e[7],
                    u = e[8];
                return t * (u * r - o * l) + n * (-u * i + o * s) + a * (l * i - r * s)
            },
            multiply: g,
            translate: function (e, t, n) {
                var a = t[0],
                    i = t[1],
                    r = t[2],
                    o = t[3],
                    s = t[4],
                    l = t[5],
                    u = t[6],
                    c = t[7],
                    d = t[8],
                    h = n[0],
                    f = n[1];
                return e[0] = a, e[1] = i, e[2] = r, e[3] = o, e[4] = s, e[5] = l, e[6] = h * a + f * o + u, e[7] = h * i + f * s + c, e[8] = h * r + f * l + d, e
            },
            rotate: function (e, t, n) {
                var a = t[0],
                    i = t[1],
                    r = t[2],
                    o = t[3],
                    s = t[4],
                    l = t[5],
                    u = t[6],
                    c = t[7],
                    d = t[8],
                    h = Math.sin(n),
                    f = Math.cos(n);
                return e[0] = f * a + h * o, e[1] = f * i + h * s, e[2] = f * r + h * l, e[3] = f * o - h * a, e[4] = f * s - h * i, e[5] = f * l - h * r, e[6] = u, e[7] = c, e[8] = d, e
            },
            scale: function (e, t, n) {
                var a = n[0],
                    i = n[1];
                return e[0] = a * t[0], e[1] = a * t[1], e[2] = a * t[2], e[3] = i * t[3], e[4] = i * t[4], e[5] = i * t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e
            },
            fromTranslation: function (e, t) {
                return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = t[0], e[7] = t[1], e[8] = 1, e
            },
            fromRotation: function (e, t) {
                var n = Math.sin(t),
                    a = Math.cos(t);
                return e[0] = a, e[1] = n, e[2] = 0, e[3] = -n, e[4] = a, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e
            },
            fromScaling: function (e, t) {
                return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = 0, e[4] = t[1], e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e
            },
            fromMat2d: function (e, t) {
                return e[0] = t[0], e[1] = t[1], e[2] = 0, e[3] = t[2], e[4] = t[3], e[5] = 0, e[6] = t[4], e[7] = t[5], e[8] = 1, e
            },
            fromQuat: function (e, t) {
                var n = t[0],
                    a = t[1],
                    i = t[2],
                    r = t[3],
                    o = n + n,
                    s = a + a,
                    l = i + i,
                    u = n * o,
                    c = a * o,
                    d = a * s,
                    h = i * o,
                    f = i * s,
                    b = i * l,
                    p = r * o,
                    m = r * s,
                    g = r * l;
                return e[0] = 1 - d - b, e[3] = c - g, e[6] = h + m, e[1] = c + g, e[4] = 1 - u - b, e[7] = f - p, e[2] = h - m, e[5] = f + p, e[8] = 1 - u - d, e
            },
            normalFromMat4: function (e, t) {
                var n = t[0],
                    a = t[1],
                    i = t[2],
                    r = t[3],
                    o = t[4],
                    s = t[5],
                    l = t[6],
                    u = t[7],
                    c = t[8],
                    d = t[9],
                    h = t[10],
                    f = t[11],
                    b = t[12],
                    p = t[13],
                    m = t[14],
                    g = t[15],
                    v = n * s - a * o,
                    _ = n * l - i * o,
                    O = n * u - r * o,
                    I = a * l - i * s,
                    A = a * u - r * s,
                    E = i * u - r * l,
                    M = c * p - d * b,
                    T = c * m - h * b,
                    y = c * g - f * b,
                    x = d * m - h * p,
                    C = d * g - f * p,
                    S = h * g - f * m,
                    P = v * S - _ * C + O * x + I * y - A * T + E * M;
                return P ? (P = 1 / P, e[0] = (s * S - l * C + u * x) * P, e[1] = (l * y - o * S - u * T) * P, e[2] = (o * C - s * y + u * M) * P, e[3] = (i * C - a * S - r * x) * P, e[4] = (n * S - i * y + r * T) * P, e[5] = (a * y - n * C - r * M) * P, e[6] = (p * E - m * A + g * I) * P, e[7] = (m * O - b * E - g * _) * P, e[8] = (b * A - p * O + g * v) * P, e) : null
            },
            projection: function (e, t, n) {
                return e[0] = 2 / t, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = -2 / n, e[5] = 0, e[6] = -1, e[7] = 1, e[8] = 1, e
            },
            str: function (e) {
                return "mat3(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ")"
            },
            frob: function (e) {
                return Math.hypot(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8])
            },
            add: function (e, t, n) {
                return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e[2] = t[2] + n[2], e[3] = t[3] + n[3], e[4] = t[4] + n[4], e[5] = t[5] + n[5], e[6] = t[6] + n[6], e[7] = t[7] + n[7], e[8] = t[8] + n[8], e
            },
            subtract: v,
            multiplyScalar: function (e, t, n) {
                return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e[3] = t[3] * n, e[4] = t[4] * n, e[5] = t[5] * n, e[6] = t[6] * n, e[7] = t[7] * n, e[8] = t[8] * n, e
            },
            multiplyScalarAndAdd: function (e, t, n, a) {
                return e[0] = t[0] + n[0] * a, e[1] = t[1] + n[1] * a, e[2] = t[2] + n[2] * a, e[3] = t[3] + n[3] * a, e[4] = t[4] + n[4] * a, e[5] = t[5] + n[5] * a, e[6] = t[6] + n[6] * a, e[7] = t[7] + n[7] * a, e[8] = t[8] + n[8] * a, e
            },
            exactEquals: function (e, t) {
                return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8]
            },
            equals: function (e, n) {
                var a = e[0],
                    i = e[1],
                    r = e[2],
                    o = e[3],
                    s = e[4],
                    l = e[5],
                    u = e[6],
                    c = e[7],
                    d = e[8],
                    h = n[0],
                    f = n[1],
                    b = n[2],
                    p = n[3],
                    m = n[4],
                    g = n[5],
                    v = n[6],
                    _ = n[7],
                    O = n[8];
                return Math.abs(a - h) <= t * Math.max(1, Math.abs(a), Math.abs(h)) && Math.abs(i - f) <= t * Math.max(1, Math.abs(i), Math.abs(f)) && Math.abs(r - b) <= t * Math.max(1, Math.abs(r), Math.abs(b)) && Math.abs(o - p) <= t * Math.max(1, Math.abs(o), Math.abs(p)) && Math.abs(s - m) <= t * Math.max(1, Math.abs(s), Math.abs(m)) && Math.abs(l - g) <= t * Math.max(1, Math.abs(l), Math.abs(g)) && Math.abs(u - v) <= t * Math.max(1, Math.abs(u), Math.abs(v)) && Math.abs(c - _) <= t * Math.max(1, Math.abs(c), Math.abs(_)) && Math.abs(d - O) <= t * Math.max(1, Math.abs(d), Math.abs(O))
            },
            mul: _,
            sub: O
        });

    function A(e) {
        return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
    }

    function E(e, t, n) {
        var a = t[0],
            i = t[1],
            r = t[2],
            o = t[3],
            s = t[4],
            l = t[5],
            u = t[6],
            c = t[7],
            d = t[8],
            h = t[9],
            f = t[10],
            b = t[11],
            p = t[12],
            m = t[13],
            g = t[14],
            v = t[15],
            _ = n[0],
            O = n[1],
            I = n[2],
            A = n[3];
        return e[0] = _ * a + O * s + I * d + A * p, e[1] = _ * i + O * l + I * h + A * m, e[2] = _ * r + O * u + I * f + A * g, e[3] = _ * o + O * c + I * b + A * v, _ = n[4], O = n[5], I = n[6], A = n[7], e[4] = _ * a + O * s + I * d + A * p, e[5] = _ * i + O * l + I * h + A * m, e[6] = _ * r + O * u + I * f + A * g, e[7] = _ * o + O * c + I * b + A * v, _ = n[8], O = n[9], I = n[10], A = n[11], e[8] = _ * a + O * s + I * d + A * p, e[9] = _ * i + O * l + I * h + A * m, e[10] = _ * r + O * u + I * f + A * g, e[11] = _ * o + O * c + I * b + A * v, _ = n[12], O = n[13], I = n[14], A = n[15], e[12] = _ * a + O * s + I * d + A * p, e[13] = _ * i + O * l + I * h + A * m, e[14] = _ * r + O * u + I * f + A * g, e[15] = _ * o + O * c + I * b + A * v, e
    }

    function M(e, t, n) {
        var a = t[0],
            i = t[1],
            r = t[2],
            o = t[3],
            s = a + a,
            l = i + i,
            u = r + r,
            c = a * s,
            d = a * l,
            h = a * u,
            f = i * l,
            b = i * u,
            p = r * u,
            m = o * s,
            g = o * l,
            v = o * u;
        return e[0] = 1 - (f + p), e[1] = d + v, e[2] = h - g, e[3] = 0, e[4] = d - v, e[5] = 1 - (c + p), e[6] = b + m, e[7] = 0, e[8] = h + g, e[9] = b - m, e[10] = 1 - (c + f), e[11] = 0, e[12] = n[0], e[13] = n[1], e[14] = n[2], e[15] = 1, e
    }

    function T(e, t) {
        return e[0] = t[12], e[1] = t[13], e[2] = t[14], e
    }

    function y(e, t) {
        var n = t[0],
            a = t[1],
            i = t[2],
            r = t[4],
            o = t[5],
            s = t[6],
            l = t[8],
            u = t[9],
            c = t[10];
        return e[0] = Math.hypot(n, a, i), e[1] = Math.hypot(r, o, s), e[2] = Math.hypot(l, u, c), e
    }

    function x(e, t) {
        var a = new n(3);
        y(a, t);
        var i = 1 / a[0],
            r = 1 / a[1],
            o = 1 / a[2],
            s = t[0] * i,
            l = t[1] * r,
            u = t[2] * o,
            c = t[4] * i,
            d = t[5] * r,
            h = t[6] * o,
            f = t[8] * i,
            b = t[9] * r,
            p = t[10] * o,
            m = s + d + p,
            g = 0;
        return m > 0 ? (g = 2 * Math.sqrt(m + 1), e[3] = .25 * g, e[0] = (h - b) / g, e[1] = (f - u) / g, e[2] = (l - c) / g) : s > d && s > p ? (g = 2 * Math.sqrt(1 + s - d - p), e[3] = (h - b) / g, e[0] = .25 * g, e[1] = (l + c) / g, e[2] = (f + u) / g) : d > p ? (g = 2 * Math.sqrt(1 + d - s - p), e[3] = (f - u) / g, e[0] = (l + c) / g, e[1] = .25 * g, e[2] = (h + b) / g) : (g = 2 * Math.sqrt(1 + p - s - d), e[3] = (l - c) / g, e[0] = (f + u) / g, e[1] = (h + b) / g, e[2] = .25 * g), e
    }

    function C(e, t, n) {
        return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e[2] = t[2] - n[2], e[3] = t[3] - n[3], e[4] = t[4] - n[4], e[5] = t[5] - n[5], e[6] = t[6] - n[6], e[7] = t[7] - n[7], e[8] = t[8] - n[8], e[9] = t[9] - n[9], e[10] = t[10] - n[10], e[11] = t[11] - n[11], e[12] = t[12] - n[12], e[13] = t[13] - n[13], e[14] = t[14] - n[14], e[15] = t[15] - n[15], e
    }
    var S = E,
        P = C,
        k = Object.freeze({
            create: function () {
                var e = new n(16);
                return n != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0), e[0] = 1, e[5] = 1, e[10] = 1, e[15] = 1, e
            },
            clone: function (e) {
                var t = new n(16);
                return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
            },
            copy: function (e, t) {
                return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
            },
            fromValues: function (e, t, a, i, r, o, s, l, u, c, d, h, f, b, p, m) {
                var g = new n(16);
                return g[0] = e, g[1] = t, g[2] = a, g[3] = i, g[4] = r, g[5] = o, g[6] = s, g[7] = l, g[8] = u, g[9] = c, g[10] = d, g[11] = h, g[12] = f, g[13] = b, g[14] = p, g[15] = m, g
            },
            set: function (e, t, n, a, i, r, o, s, l, u, c, d, h, f, b, p, m) {
                return e[0] = t, e[1] = n, e[2] = a, e[3] = i, e[4] = r, e[5] = o, e[6] = s, e[7] = l, e[8] = u, e[9] = c, e[10] = d, e[11] = h, e[12] = f, e[13] = b, e[14] = p, e[15] = m, e
            },
            identity: A,
            transpose: function (e, t) {
                if (e === t) {
                    var n = t[1],
                        a = t[2],
                        i = t[3],
                        r = t[6],
                        o = t[7],
                        s = t[11];
                    e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = n, e[6] = t[9], e[7] = t[13], e[8] = a, e[9] = r, e[11] = t[14], e[12] = i, e[13] = o, e[14] = s
                } else e[0] = t[0], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = t[1], e[5] = t[5], e[6] = t[9], e[7] = t[13], e[8] = t[2], e[9] = t[6], e[10] = t[10], e[11] = t[14], e[12] = t[3], e[13] = t[7], e[14] = t[11], e[15] = t[15];
                return e
            },
            invert: function (e, t) {
                var n = t[0],
                    a = t[1],
                    i = t[2],
                    r = t[3],
                    o = t[4],
                    s = t[5],
                    l = t[6],
                    u = t[7],
                    c = t[8],
                    d = t[9],
                    h = t[10],
                    f = t[11],
                    b = t[12],
                    p = t[13],
                    m = t[14],
                    g = t[15],
                    v = n * s - a * o,
                    _ = n * l - i * o,
                    O = n * u - r * o,
                    I = a * l - i * s,
                    A = a * u - r * s,
                    E = i * u - r * l,
                    M = c * p - d * b,
                    T = c * m - h * b,
                    y = c * g - f * b,
                    x = d * m - h * p,
                    C = d * g - f * p,
                    S = h * g - f * m,
                    P = v * S - _ * C + O * x + I * y - A * T + E * M;
                return P ? (P = 1 / P, e[0] = (s * S - l * C + u * x) * P, e[1] = (i * C - a * S - r * x) * P, e[2] = (p * E - m * A + g * I) * P, e[3] = (h * A - d * E - f * I) * P, e[4] = (l * y - o * S - u * T) * P, e[5] = (n * S - i * y + r * T) * P, e[6] = (m * O - b * E - g * _) * P, e[7] = (c * E - h * O + f * _) * P, e[8] = (o * C - s * y + u * M) * P, e[9] = (a * y - n * C - r * M) * P, e[10] = (b * A - p * O + g * v) * P, e[11] = (d * O - c * A - f * v) * P, e[12] = (s * T - o * x - l * M) * P, e[13] = (n * x - a * T + i * M) * P, e[14] = (p * _ - b * I - m * v) * P, e[15] = (c * I - d * _ + h * v) * P, e) : null
            },
            adjoint: function (e, t) {
                var n = t[0],
                    a = t[1],
                    i = t[2],
                    r = t[3],
                    o = t[4],
                    s = t[5],
                    l = t[6],
                    u = t[7],
                    c = t[8],
                    d = t[9],
                    h = t[10],
                    f = t[11],
                    b = t[12],
                    p = t[13],
                    m = t[14],
                    g = t[15];
                return e[0] = s * (h * g - f * m) - d * (l * g - u * m) + p * (l * f - u * h), e[1] = -(a * (h * g - f * m) - d * (i * g - r * m) + p * (i * f - r * h)), e[2] = a * (l * g - u * m) - s * (i * g - r * m) + p * (i * u - r * l), e[3] = -(a * (l * f - u * h) - s * (i * f - r * h) + d * (i * u - r * l)), e[4] = -(o * (h * g - f * m) - c * (l * g - u * m) + b * (l * f - u * h)), e[5] = n * (h * g - f * m) - c * (i * g - r * m) + b * (i * f - r * h), e[6] = -(n * (l * g - u * m) - o * (i * g - r * m) + b * (i * u - r * l)), e[7] = n * (l * f - u * h) - o * (i * f - r * h) + c * (i * u - r * l), e[8] = o * (d * g - f * p) - c * (s * g - u * p) + b * (s * f - u * d), e[9] = -(n * (d * g - f * p) - c * (a * g - r * p) + b * (a * f - r * d)), e[10] = n * (s * g - u * p) - o * (a * g - r * p) + b * (a * u - r * s), e[11] = -(n * (s * f - u * d) - o * (a * f - r * d) + c * (a * u - r * s)), e[12] = -(o * (d * m - h * p) - c * (s * m - l * p) + b * (s * h - l * d)), e[13] = n * (d * m - h * p) - c * (a * m - i * p) + b * (a * h - i * d), e[14] = -(n * (s * m - l * p) - o * (a * m - i * p) + b * (a * l - i * s)), e[15] = n * (s * h - l * d) - o * (a * h - i * d) + c * (a * l - i * s), e
            },
            determinant: function (e) {
                var t = e[0],
                    n = e[1],
                    a = e[2],
                    i = e[3],
                    r = e[4],
                    o = e[5],
                    s = e[6],
                    l = e[7],
                    u = e[8],
                    c = e[9],
                    d = e[10],
                    h = e[11],
                    f = e[12],
                    b = e[13],
                    p = e[14],
                    m = e[15];
                return (t * o - n * r) * (d * m - h * p) - (t * s - a * r) * (c * m - h * b) + (t * l - i * r) * (c * p - d * b) + (n * s - a * o) * (u * m - h * f) - (n * l - i * o) * (u * p - d * f) + (a * l - i * s) * (u * b - c * f)
            },
            multiply: E,
            translate: function (e, t, n) {
                var a, i, r, o, s, l, u, c, d, h, f, b, p = n[0],
                    m = n[1],
                    g = n[2];
                return t === e ? (e[12] = t[0] * p + t[4] * m + t[8] * g + t[12], e[13] = t[1] * p + t[5] * m + t[9] * g + t[13], e[14] = t[2] * p + t[6] * m + t[10] * g + t[14], e[15] = t[3] * p + t[7] * m + t[11] * g + t[15]) : (a = t[0], i = t[1], r = t[2], o = t[3], s = t[4], l = t[5], u = t[6], c = t[7], d = t[8], h = t[9], f = t[10], b = t[11], e[0] = a, e[1] = i, e[2] = r, e[3] = o, e[4] = s, e[5] = l, e[6] = u, e[7] = c, e[8] = d, e[9] = h, e[10] = f, e[11] = b, e[12] = a * p + s * m + d * g + t[12], e[13] = i * p + l * m + h * g + t[13], e[14] = r * p + u * m + f * g + t[14], e[15] = o * p + c * m + b * g + t[15]), e
            },
            scale: function (e, t, n) {
                var a = n[0],
                    i = n[1],
                    r = n[2];
                return e[0] = t[0] * a, e[1] = t[1] * a, e[2] = t[2] * a, e[3] = t[3] * a, e[4] = t[4] * i, e[5] = t[5] * i, e[6] = t[6] * i, e[7] = t[7] * i, e[8] = t[8] * r, e[9] = t[9] * r, e[10] = t[10] * r, e[11] = t[11] * r, e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
            },
            rotate: function (e, n, a, i) {
                var r, o, s, l, u, c, d, h, f, b, p, m, g, v, _, O, I, A, E, M, T, y, x, C, S = i[0],
                    P = i[1],
                    k = i[2],
                    R = Math.hypot(S, P, k);
                return R < t ? null : (S *= R = 1 / R, P *= R, k *= R, r = Math.sin(a), s = 1 - (o = Math.cos(a)), l = n[0], u = n[1], c = n[2], d = n[3], h = n[4], f = n[5], b = n[6], p = n[7], m = n[8], g = n[9], v = n[10], _ = n[11], O = S * S * s + o, I = P * S * s + k * r, A = k * S * s - P * r, E = S * P * s - k * r, M = P * P * s + o, T = k * P * s + S * r, y = S * k * s + P * r, x = P * k * s - S * r, C = k * k * s + o, e[0] = l * O + h * I + m * A, e[1] = u * O + f * I + g * A, e[2] = c * O + b * I + v * A, e[3] = d * O + p * I + _ * A, e[4] = l * E + h * M + m * T, e[5] = u * E + f * M + g * T, e[6] = c * E + b * M + v * T, e[7] = d * E + p * M + _ * T, e[8] = l * y + h * x + m * C, e[9] = u * y + f * x + g * C, e[10] = c * y + b * x + v * C, e[11] = d * y + p * x + _ * C, n !== e && (e[12] = n[12], e[13] = n[13], e[14] = n[14], e[15] = n[15]), e)
            },
            rotateX: function (e, t, n) {
                var a = Math.sin(n),
                    i = Math.cos(n),
                    r = t[4],
                    o = t[5],
                    s = t[6],
                    l = t[7],
                    u = t[8],
                    c = t[9],
                    d = t[10],
                    h = t[11];
                return t !== e && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[4] = r * i + u * a, e[5] = o * i + c * a, e[6] = s * i + d * a, e[7] = l * i + h * a, e[8] = u * i - r * a, e[9] = c * i - o * a, e[10] = d * i - s * a, e[11] = h * i - l * a, e
            },
            rotateY: function (e, t, n) {
                var a = Math.sin(n),
                    i = Math.cos(n),
                    r = t[0],
                    o = t[1],
                    s = t[2],
                    l = t[3],
                    u = t[8],
                    c = t[9],
                    d = t[10],
                    h = t[11];
                return t !== e && (e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = r * i - u * a, e[1] = o * i - c * a, e[2] = s * i - d * a, e[3] = l * i - h * a, e[8] = r * a + u * i, e[9] = o * a + c * i, e[10] = s * a + d * i, e[11] = l * a + h * i, e
            },
            rotateZ: function (e, t, n) {
                var a = Math.sin(n),
                    i = Math.cos(n),
                    r = t[0],
                    o = t[1],
                    s = t[2],
                    l = t[3],
                    u = t[4],
                    c = t[5],
                    d = t[6],
                    h = t[7];
                return t !== e && (e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = r * i + u * a, e[1] = o * i + c * a, e[2] = s * i + d * a, e[3] = l * i + h * a, e[4] = u * i - r * a, e[5] = c * i - o * a, e[6] = d * i - s * a, e[7] = h * i - l * a, e
            },
            fromTranslation: function (e, t) {
                return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = t[0], e[13] = t[1], e[14] = t[2], e[15] = 1, e
            },
            fromScaling: function (e, t) {
                return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = t[1], e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = t[2], e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
            },
            fromRotation: function (e, n, a) {
                var i, r, o, s = a[0],
                    l = a[1],
                    u = a[2],
                    c = Math.hypot(s, l, u);
                return c < t ? null : (s *= c = 1 / c, l *= c, u *= c, i = Math.sin(n), o = 1 - (r = Math.cos(n)), e[0] = s * s * o + r, e[1] = l * s * o + u * i, e[2] = u * s * o - l * i, e[3] = 0, e[4] = s * l * o - u * i, e[5] = l * l * o + r, e[6] = u * l * o + s * i, e[7] = 0, e[8] = s * u * o + l * i, e[9] = l * u * o - s * i, e[10] = u * u * o + r, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e)
            },
            fromXRotation: function (e, t) {
                var n = Math.sin(t),
                    a = Math.cos(t);
                return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = a, e[6] = n, e[7] = 0, e[8] = 0, e[9] = -n, e[10] = a, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
            },
            fromYRotation: function (e, t) {
                var n = Math.sin(t),
                    a = Math.cos(t);
                return e[0] = a, e[1] = 0, e[2] = -n, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = n, e[9] = 0, e[10] = a, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
            },
            fromZRotation: function (e, t) {
                var n = Math.sin(t),
                    a = Math.cos(t);
                return e[0] = a, e[1] = n, e[2] = 0, e[3] = 0, e[4] = -n, e[5] = a, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
            },
            fromRotationTranslation: M,
            fromQuat2: function (e, t) {
                var a = new n(3),
                    i = -t[0],
                    r = -t[1],
                    o = -t[2],
                    s = t[3],
                    l = t[4],
                    u = t[5],
                    c = t[6],
                    d = t[7],
                    h = i * i + r * r + o * o + s * s;
                return h > 0 ? (a[0] = 2 * (l * s + d * i + u * o - c * r) / h, a[1] = 2 * (u * s + d * r + c * i - l * o) / h, a[2] = 2 * (c * s + d * o + l * r - u * i) / h) : (a[0] = 2 * (l * s + d * i + u * o - c * r), a[1] = 2 * (u * s + d * r + c * i - l * o), a[2] = 2 * (c * s + d * o + l * r - u * i)), M(e, t, a), e
            },
            getTranslation: T,
            getScaling: y,
            getRotation: x,
            fromRotationTranslationScale: function (e, t, n, a) {
                var i = t[0],
                    r = t[1],
                    o = t[2],
                    s = t[3],
                    l = i + i,
                    u = r + r,
                    c = o + o,
                    d = i * l,
                    h = i * u,
                    f = i * c,
                    b = r * u,
                    p = r * c,
                    m = o * c,
                    g = s * l,
                    v = s * u,
                    _ = s * c,
                    O = a[0],
                    I = a[1],
                    A = a[2];
                return e[0] = (1 - (b + m)) * O, e[1] = (h + _) * O, e[2] = (f - v) * O, e[3] = 0, e[4] = (h - _) * I, e[5] = (1 - (d + m)) * I, e[6] = (p + g) * I, e[7] = 0, e[8] = (f + v) * A, e[9] = (p - g) * A, e[10] = (1 - (d + b)) * A, e[11] = 0, e[12] = n[0], e[13] = n[1], e[14] = n[2], e[15] = 1, e
            },
            fromRotationTranslationScaleOrigin: function (e, t, n, a, i) {
                var r = t[0],
                    o = t[1],
                    s = t[2],
                    l = t[3],
                    u = r + r,
                    c = o + o,
                    d = s + s,
                    h = r * u,
                    f = r * c,
                    b = r * d,
                    p = o * c,
                    m = o * d,
                    g = s * d,
                    v = l * u,
                    _ = l * c,
                    O = l * d,
                    I = a[0],
                    A = a[1],
                    E = a[2],
                    M = i[0],
                    T = i[1],
                    y = i[2],
                    x = (1 - (p + g)) * I,
                    C = (f + O) * I,
                    S = (b - _) * I,
                    P = (f - O) * A,
                    k = (1 - (h + g)) * A,
                    R = (m + v) * A,
                    N = (b + _) * E,
                    j = (m - v) * E,
                    L = (1 - (h + p)) * E;
                return e[0] = x, e[1] = C, e[2] = S, e[3] = 0, e[4] = P, e[5] = k, e[6] = R, e[7] = 0, e[8] = N, e[9] = j, e[10] = L, e[11] = 0, e[12] = n[0] + M - (x * M + P * T + N * y), e[13] = n[1] + T - (C * M + k * T + j * y), e[14] = n[2] + y - (S * M + R * T + L * y), e[15] = 1, e
            },
            fromQuat: function (e, t) {
                var n = t[0],
                    a = t[1],
                    i = t[2],
                    r = t[3],
                    o = n + n,
                    s = a + a,
                    l = i + i,
                    u = n * o,
                    c = a * o,
                    d = a * s,
                    h = i * o,
                    f = i * s,
                    b = i * l,
                    p = r * o,
                    m = r * s,
                    g = r * l;
                return e[0] = 1 - d - b, e[1] = c + g, e[2] = h - m, e[3] = 0, e[4] = c - g, e[5] = 1 - u - b, e[6] = f + p, e[7] = 0, e[8] = h + m, e[9] = f - p, e[10] = 1 - u - d, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e
            },
            frustum: function (e, t, n, a, i, r, o) {
                var s = 1 / (n - t),
                    l = 1 / (i - a),
                    u = 1 / (r - o);
                return e[0] = 2 * r * s, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 2 * r * l, e[6] = 0, e[7] = 0, e[8] = (n + t) * s, e[9] = (i + a) * l, e[10] = (o + r) * u, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = o * r * 2 * u, e[15] = 0, e
            },
            perspective: function (e, t, n, a, i) {
                var r, o = 1 / Math.tan(t / 2);
                return e[0] = o / n, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = o, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = -1, e[12] = 0, e[13] = 0, e[15] = 0, null != i && i !== 1 / 0 ? (r = 1 / (a - i), e[10] = (i + a) * r, e[14] = 2 * i * a * r) : (e[10] = -1, e[14] = -2 * a), e
            },
            perspectiveFromFieldOfView: function (e, t, n, a) {
                var i = Math.tan(t.upDegrees * Math.PI / 180),
                    r = Math.tan(t.downDegrees * Math.PI / 180),
                    o = Math.tan(t.leftDegrees * Math.PI / 180),
                    s = Math.tan(t.rightDegrees * Math.PI / 180),
                    l = 2 / (o + s),
                    u = 2 / (i + r);
                return e[0] = l, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = u, e[6] = 0, e[7] = 0, e[8] = -(o - s) * l * .5, e[9] = (i - r) * u * .5, e[10] = a / (n - a), e[11] = -1, e[12] = 0, e[13] = 0, e[14] = a * n / (n - a), e[15] = 0, e
            },
            ortho: function (e, t, n, a, i, r, o) {
                var s = 1 / (t - n),
                    l = 1 / (a - i),
                    u = 1 / (r - o);
                return e[0] = -2 * s, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = -2 * l, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 2 * u, e[11] = 0, e[12] = (t + n) * s, e[13] = (i + a) * l, e[14] = (o + r) * u, e[15] = 1, e
            },
            lookAt: function (e, n, a, i) {
                var r, o, s, l, u, c, d, h, f, b, p = n[0],
                    m = n[1],
                    g = n[2],
                    v = i[0],
                    _ = i[1],
                    O = i[2],
                    I = a[0],
                    E = a[1],
                    M = a[2];
                return Math.abs(p - I) < t && Math.abs(m - E) < t && Math.abs(g - M) < t ? A(e) : (d = p - I, h = m - E, f = g - M, r = _ * (f *= b = 1 / Math.hypot(d, h, f)) - O * (h *= b), o = O * (d *= b) - v * f, s = v * h - _ * d, (b = Math.hypot(r, o, s)) ? (r *= b = 1 / b, o *= b, s *= b) : (r = 0, o = 0, s = 0), l = h * s - f * o, u = f * r - d * s, c = d * o - h * r, (b = Math.hypot(l, u, c)) ? (l *= b = 1 / b, u *= b, c *= b) : (l = 0, u = 0, c = 0), e[0] = r, e[1] = l, e[2] = d, e[3] = 0, e[4] = o, e[5] = u, e[6] = h, e[7] = 0, e[8] = s, e[9] = c, e[10] = f, e[11] = 0, e[12] = -(r * p + o * m + s * g), e[13] = -(l * p + u * m + c * g), e[14] = -(d * p + h * m + f * g), e[15] = 1, e)
            },
            targetTo: function (e, t, n, a) {
                var i = t[0],
                    r = t[1],
                    o = t[2],
                    s = a[0],
                    l = a[1],
                    u = a[2],
                    c = i - n[0],
                    d = r - n[1],
                    h = o - n[2],
                    f = c * c + d * d + h * h;
                f > 0 && (c *= f = 1 / Math.sqrt(f), d *= f, h *= f);
                var b = l * h - u * d,
                    p = u * c - s * h,
                    m = s * d - l * c;
                return (f = b * b + p * p + m * m) > 0 && (b *= f = 1 / Math.sqrt(f), p *= f, m *= f), e[0] = b, e[1] = p, e[2] = m, e[3] = 0, e[4] = d * m - h * p, e[5] = h * b - c * m, e[6] = c * p - d * b, e[7] = 0, e[8] = c, e[9] = d, e[10] = h, e[11] = 0, e[12] = i, e[13] = r, e[14] = o, e[15] = 1, e
            },
            str: function (e) {
                return "mat4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ", " + e[9] + ", " + e[10] + ", " + e[11] + ", " + e[12] + ", " + e[13] + ", " + e[14] + ", " + e[15] + ")"
            },
            frob: function (e) {
                return Math.hypot(e[0], e[1], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15])
            },
            add: function (e, t, n) {
                return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e[2] = t[2] + n[2], e[3] = t[3] + n[3], e[4] = t[4] + n[4], e[5] = t[5] + n[5], e[6] = t[6] + n[6], e[7] = t[7] + n[7], e[8] = t[8] + n[8], e[9] = t[9] + n[9], e[10] = t[10] + n[10], e[11] = t[11] + n[11], e[12] = t[12] + n[12], e[13] = t[13] + n[13], e[14] = t[14] + n[14], e[15] = t[15] + n[15], e
            },
            subtract: C,
            multiplyScalar: function (e, t, n) {
                return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e[3] = t[3] * n, e[4] = t[4] * n, e[5] = t[5] * n, e[6] = t[6] * n, e[7] = t[7] * n, e[8] = t[8] * n, e[9] = t[9] * n, e[10] = t[10] * n, e[11] = t[11] * n, e[12] = t[12] * n, e[13] = t[13] * n, e[14] = t[14] * n, e[15] = t[15] * n, e
            },
            multiplyScalarAndAdd: function (e, t, n, a) {
                return e[0] = t[0] + n[0] * a, e[1] = t[1] + n[1] * a, e[2] = t[2] + n[2] * a, e[3] = t[3] + n[3] * a, e[4] = t[4] + n[4] * a, e[5] = t[5] + n[5] * a, e[6] = t[6] + n[6] * a, e[7] = t[7] + n[7] * a, e[8] = t[8] + n[8] * a, e[9] = t[9] + n[9] * a, e[10] = t[10] + n[10] * a, e[11] = t[11] + n[11] * a, e[12] = t[12] + n[12] * a, e[13] = t[13] + n[13] * a, e[14] = t[14] + n[14] * a, e[15] = t[15] + n[15] * a, e
            },
            exactEquals: function (e, t) {
                return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8] && e[9] === t[9] && e[10] === t[10] && e[11] === t[11] && e[12] === t[12] && e[13] === t[13] && e[14] === t[14] && e[15] === t[15]
            },
            equals: function (e, n) {
                var a = e[0],
                    i = e[1],
                    r = e[2],
                    o = e[3],
                    s = e[4],
                    l = e[5],
                    u = e[6],
                    c = e[7],
                    d = e[8],
                    h = e[9],
                    f = e[10],
                    b = e[11],
                    p = e[12],
                    m = e[13],
                    g = e[14],
                    v = e[15],
                    _ = n[0],
                    O = n[1],
                    I = n[2],
                    A = n[3],
                    E = n[4],
                    M = n[5],
                    T = n[6],
                    y = n[7],
                    x = n[8],
                    C = n[9],
                    S = n[10],
                    P = n[11],
                    k = n[12],
                    R = n[13],
                    N = n[14],
                    j = n[15];
                return Math.abs(a - _) <= t * Math.max(1, Math.abs(a), Math.abs(_)) && Math.abs(i - O) <= t * Math.max(1, Math.abs(i), Math.abs(O)) && Math.abs(r - I) <= t * Math.max(1, Math.abs(r), Math.abs(I)) && Math.abs(o - A) <= t * Math.max(1, Math.abs(o), Math.abs(A)) && Math.abs(s - E) <= t * Math.max(1, Math.abs(s), Math.abs(E)) && Math.abs(l - M) <= t * Math.max(1, Math.abs(l), Math.abs(M)) && Math.abs(u - T) <= t * Math.max(1, Math.abs(u), Math.abs(T)) && Math.abs(c - y) <= t * Math.max(1, Math.abs(c), Math.abs(y)) && Math.abs(d - x) <= t * Math.max(1, Math.abs(d), Math.abs(x)) && Math.abs(h - C) <= t * Math.max(1, Math.abs(h), Math.abs(C)) && Math.abs(f - S) <= t * Math.max(1, Math.abs(f), Math.abs(S)) && Math.abs(b - P) <= t * Math.max(1, Math.abs(b), Math.abs(P)) && Math.abs(p - k) <= t * Math.max(1, Math.abs(p), Math.abs(k)) && Math.abs(m - R) <= t * Math.max(1, Math.abs(m), Math.abs(R)) && Math.abs(g - N) <= t * Math.max(1, Math.abs(g), Math.abs(N)) && Math.abs(v - j) <= t * Math.max(1, Math.abs(v), Math.abs(j))
            },
            mul: S,
            sub: P
        });

    function R() {
        var e = new n(3);
        return n != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e
    }

    function N(e) {
        var t = e[0],
            n = e[1],
            a = e[2];
        return Math.hypot(t, n, a)
    }

    function j(e, t, a) {
        var i = new n(3);
        return i[0] = e, i[1] = t, i[2] = a, i
    }

    function L(e, t, n) {
        return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e[2] = t[2] - n[2], e
    }

    function B(e, t, n) {
        return e[0] = t[0] * n[0], e[1] = t[1] * n[1], e[2] = t[2] * n[2], e
    }

    function F(e, t, n) {
        return e[0] = t[0] / n[0], e[1] = t[1] / n[1], e[2] = t[2] / n[2], e
    }

    function w(e, t) {
        var n = t[0] - e[0],
            a = t[1] - e[1],
            i = t[2] - e[2];
        return Math.hypot(n, a, i)
    }

    function D(e, t) {
        var n = t[0] - e[0],
            a = t[1] - e[1],
            i = t[2] - e[2];
        return n * n + a * a + i * i
    }

    function U(e) {
        var t = e[0],
            n = e[1],
            a = e[2];
        return t * t + n * n + a * a
    }

    function V(e, t) {
        var n = t[0],
            a = t[1],
            i = t[2],
            r = n * n + a * a + i * i;
        return r > 0 && (r = 1 / Math.sqrt(r)), e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e
    }

    function H(e, t) {
        return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
    }

    function W(e, t, n) {
        var a = t[0],
            i = t[1],
            r = t[2],
            o = n[0],
            s = n[1],
            l = n[2];
        return e[0] = i * l - r * s, e[1] = r * o - a * l, e[2] = a * s - i * o, e
    }
    var G, z = L,
        Y = B,
        X = F,
        q = w,
        K = D,
        Q = N,
        Z = U,
        J = (G = R(), function (e, t, n, a, i, r) {
            var o, s;
            for (t || (t = 3), n || (n = 0), s = a ? Math.min(a * t + n, e.length) : e.length, o = n; o < s; o += t) G[0] = e[o], G[1] = e[o + 1], G[2] = e[o + 2], i(G, G, r), e[o] = G[0], e[o + 1] = G[1], e[o + 2] = G[2];
            return e
        }),
        $ = Object.freeze({
            create: R,
            clone: function (e) {
                var t = new n(3);
                return t[0] = e[0], t[1] = e[1], t[2] = e[2], t
            },
            length: N,
            fromValues: j,
            copy: function (e, t) {
                return e[0] = t[0], e[1] = t[1], e[2] = t[2], e
            },
            set: function (e, t, n, a) {
                return e[0] = t, e[1] = n, e[2] = a, e
            },
            add: function (e, t, n) {
                return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e[2] = t[2] + n[2], e
            },
            subtract: L,
            multiply: B,
            divide: F,
            ceil: function (e, t) {
                return e[0] = Math.ceil(t[0]), e[1] = Math.ceil(t[1]), e[2] = Math.ceil(t[2]), e
            },
            floor: function (e, t) {
                return e[0] = Math.floor(t[0]), e[1] = Math.floor(t[1]), e[2] = Math.floor(t[2]), e
            },
            min: function (e, t, n) {
                return e[0] = Math.min(t[0], n[0]), e[1] = Math.min(t[1], n[1]), e[2] = Math.min(t[2], n[2]), e
            },
            max: function (e, t, n) {
                return e[0] = Math.max(t[0], n[0]), e[1] = Math.max(t[1], n[1]), e[2] = Math.max(t[2], n[2]), e
            },
            round: function (e, t) {
                return e[0] = Math.round(t[0]), e[1] = Math.round(t[1]), e[2] = Math.round(t[2]), e
            },
            scale: function (e, t, n) {
                return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e
            },
            scaleAndAdd: function (e, t, n, a) {
                return e[0] = t[0] + n[0] * a, e[1] = t[1] + n[1] * a, e[2] = t[2] + n[2] * a, e
            },
            distance: w,
            squaredDistance: D,
            squaredLength: U,
            negate: function (e, t) {
                return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e
            },
            inverse: function (e, t) {
                return e[0] = 1 / t[0], e[1] = 1 / t[1], e[2] = 1 / t[2], e
            },
            normalize: V,
            dot: H,
            cross: W,
            lerp: function (e, t, n, a) {
                var i = t[0],
                    r = t[1],
                    o = t[2];
                return e[0] = i + a * (n[0] - i), e[1] = r + a * (n[1] - r), e[2] = o + a * (n[2] - o), e
            },
            hermite: function (e, t, n, a, i, r) {
                var o = r * r,
                    s = o * (2 * r - 3) + 1,
                    l = o * (r - 2) + r,
                    u = o * (r - 1),
                    c = o * (3 - 2 * r);
                return e[0] = t[0] * s + n[0] * l + a[0] * u + i[0] * c, e[1] = t[1] * s + n[1] * l + a[1] * u + i[1] * c, e[2] = t[2] * s + n[2] * l + a[2] * u + i[2] * c, e
            },
            bezier: function (e, t, n, a, i, r) {
                var o = 1 - r,
                    s = o * o,
                    l = r * r,
                    u = s * o,
                    c = 3 * r * s,
                    d = 3 * l * o,
                    h = l * r;
                return e[0] = t[0] * u + n[0] * c + a[0] * d + i[0] * h, e[1] = t[1] * u + n[1] * c + a[1] * d + i[1] * h, e[2] = t[2] * u + n[2] * c + a[2] * d + i[2] * h, e
            },
            random: function (e, t) {
                t = t || 1;
                var n = 2 * a() * Math.PI,
                    i = 2 * a() - 1,
                    r = Math.sqrt(1 - i * i) * t;
                return e[0] = Math.cos(n) * r, e[1] = Math.sin(n) * r, e[2] = i * t, e
            },
            transformMat4: function (e, t, n) {
                var a = t[0],
                    i = t[1],
                    r = t[2],
                    o = n[3] * a + n[7] * i + n[11] * r + n[15];
                return o = o || 1, e[0] = (n[0] * a + n[4] * i + n[8] * r + n[12]) / o, e[1] = (n[1] * a + n[5] * i + n[9] * r + n[13]) / o, e[2] = (n[2] * a + n[6] * i + n[10] * r + n[14]) / o, e
            },
            transformMat3: function (e, t, n) {
                var a = t[0],
                    i = t[1],
                    r = t[2];
                return e[0] = a * n[0] + i * n[3] + r * n[6], e[1] = a * n[1] + i * n[4] + r * n[7], e[2] = a * n[2] + i * n[5] + r * n[8], e
            },
            transformQuat: function (e, t, n) {
                var a = n[0],
                    i = n[1],
                    r = n[2],
                    o = n[3],
                    s = t[0],
                    l = t[1],
                    u = t[2],
                    c = i * u - r * l,
                    d = r * s - a * u,
                    h = a * l - i * s,
                    f = i * h - r * d,
                    b = r * c - a * h,
                    p = a * d - i * c,
                    m = 2 * o;
                return c *= m, d *= m, h *= m, f *= 2, b *= 2, p *= 2, e[0] = s + c + f, e[1] = l + d + b, e[2] = u + h + p, e
            },
            rotateX: function (e, t, n, a) {
                var i = [],
                    r = [];
                return i[0] = t[0] - n[0], i[1] = t[1] - n[1], i[2] = t[2] - n[2], r[0] = i[0], r[1] = i[1] * Math.cos(a) - i[2] * Math.sin(a), r[2] = i[1] * Math.sin(a) + i[2] * Math.cos(a), e[0] = r[0] + n[0], e[1] = r[1] + n[1], e[2] = r[2] + n[2], e
            },
            rotateY: function (e, t, n, a) {
                var i = [],
                    r = [];
                return i[0] = t[0] - n[0], i[1] = t[1] - n[1], i[2] = t[2] - n[2], r[0] = i[2] * Math.sin(a) + i[0] * Math.cos(a), r[1] = i[1], r[2] = i[2] * Math.cos(a) - i[0] * Math.sin(a), e[0] = r[0] + n[0], e[1] = r[1] + n[1], e[2] = r[2] + n[2], e
            },
            rotateZ: function (e, t, n, a) {
                var i = [],
                    r = [];
                return i[0] = t[0] - n[0], i[1] = t[1] - n[1], i[2] = t[2] - n[2], r[0] = i[0] * Math.cos(a) - i[1] * Math.sin(a), r[1] = i[0] * Math.sin(a) + i[1] * Math.cos(a), r[2] = i[2], e[0] = r[0] + n[0], e[1] = r[1] + n[1], e[2] = r[2] + n[2], e
            },
            angle: function (e, t) {
                var n = j(e[0], e[1], e[2]),
                    a = j(t[0], t[1], t[2]);
                V(n, n), V(a, a);
                var i = H(n, a);
                return i > 1 ? 0 : i < -1 ? Math.PI : Math.acos(i)
            },
            zero: function (e) {
                return e[0] = 0, e[1] = 0, e[2] = 0, e
            },
            str: function (e) {
                return "vec3(" + e[0] + ", " + e[1] + ", " + e[2] + ")"
            },
            exactEquals: function (e, t) {
                return e[0] === t[0] && e[1] === t[1] && e[2] === t[2]
            },
            equals: function (e, n) {
                var a = e[0],
                    i = e[1],
                    r = e[2],
                    o = n[0],
                    s = n[1],
                    l = n[2];
                return Math.abs(a - o) <= t * Math.max(1, Math.abs(a), Math.abs(o)) && Math.abs(i - s) <= t * Math.max(1, Math.abs(i), Math.abs(s)) && Math.abs(r - l) <= t * Math.max(1, Math.abs(r), Math.abs(l))
            },
            sub: z,
            mul: Y,
            div: X,
            dist: q,
            sqrDist: K,
            len: Q,
            sqrLen: Z,
            forEach: J
        });

    function ee() {
        var e = new n(4);
        return n != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0), e
    }

    function te(e) {
        var t = new n(4);
        return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
    }

    function ne(e, t, a, i) {
        var r = new n(4);
        return r[0] = e, r[1] = t, r[2] = a, r[3] = i, r
    }

    function ae(e, t) {
        return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e
    }

    function ie(e, t, n, a, i) {
        return e[0] = t, e[1] = n, e[2] = a, e[3] = i, e
    }

    function re(e, t, n) {
        return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e[2] = t[2] + n[2], e[3] = t[3] + n[3], e
    }

    function oe(e, t, n) {
        return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e[2] = t[2] - n[2], e[3] = t[3] - n[3], e
    }

    function se(e, t, n) {
        return e[0] = t[0] * n[0], e[1] = t[1] * n[1], e[2] = t[2] * n[2], e[3] = t[3] * n[3], e
    }

    function le(e, t, n) {
        return e[0] = t[0] / n[0], e[1] = t[1] / n[1], e[2] = t[2] / n[2], e[3] = t[3] / n[3], e
    }

    function ue(e, t, n) {
        return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e[3] = t[3] * n, e
    }

    function ce(e, t) {
        var n = t[0] - e[0],
            a = t[1] - e[1],
            i = t[2] - e[2],
            r = t[3] - e[3];
        return Math.hypot(n, a, i, r)
    }

    function de(e, t) {
        var n = t[0] - e[0],
            a = t[1] - e[1],
            i = t[2] - e[2],
            r = t[3] - e[3];
        return n * n + a * a + i * i + r * r
    }

    function he(e) {
        var t = e[0],
            n = e[1],
            a = e[2],
            i = e[3];
        return Math.hypot(t, n, a, i)
    }

    function fe(e) {
        var t = e[0],
            n = e[1],
            a = e[2],
            i = e[3];
        return t * t + n * n + a * a + i * i
    }

    function be(e, t) {
        var n = t[0],
            a = t[1],
            i = t[2],
            r = t[3],
            o = n * n + a * a + i * i + r * r;
        return o > 0 && (o = 1 / Math.sqrt(o)), e[0] = n * o, e[1] = a * o, e[2] = i * o, e[3] = r * o, e
    }

    function pe(e, t) {
        return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3]
    }

    function me(e, t, n, a) {
        var i = t[0],
            r = t[1],
            o = t[2],
            s = t[3];
        return e[0] = i + a * (n[0] - i), e[1] = r + a * (n[1] - r), e[2] = o + a * (n[2] - o), e[3] = s + a * (n[3] - s), e
    }

    function ge(e, t) {
        return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3]
    }

    function ve(e, n) {
        var a = e[0],
            i = e[1],
            r = e[2],
            o = e[3],
            s = n[0],
            l = n[1],
            u = n[2],
            c = n[3];
        return Math.abs(a - s) <= t * Math.max(1, Math.abs(a), Math.abs(s)) && Math.abs(i - l) <= t * Math.max(1, Math.abs(i), Math.abs(l)) && Math.abs(r - u) <= t * Math.max(1, Math.abs(r), Math.abs(u)) && Math.abs(o - c) <= t * Math.max(1, Math.abs(o), Math.abs(c))
    }
    var _e = oe,
        Oe = se,
        Ie = le,
        Ae = ce,
        Ee = de,
        Me = he,
        Te = fe,
        ye = function () {
            var e = ee();
            return function (t, n, a, i, r, o) {
                var s, l;
                for (n || (n = 4), a || (a = 0), l = i ? Math.min(i * n + a, t.length) : t.length, s = a; s < l; s += n) e[0] = t[s], e[1] = t[s + 1], e[2] = t[s + 2], e[3] = t[s + 3], r(e, e, o), t[s] = e[0], t[s + 1] = e[1], t[s + 2] = e[2], t[s + 3] = e[3];
                return t
            }
        }(),
        xe = Object.freeze({
            create: ee,
            clone: te,
            fromValues: ne,
            copy: ae,
            set: ie,
            add: re,
            subtract: oe,
            multiply: se,
            divide: le,
            ceil: function (e, t) {
                return e[0] = Math.ceil(t[0]), e[1] = Math.ceil(t[1]), e[2] = Math.ceil(t[2]), e[3] = Math.ceil(t[3]), e
            },
            floor: function (e, t) {
                return e[0] = Math.floor(t[0]), e[1] = Math.floor(t[1]), e[2] = Math.floor(t[2]), e[3] = Math.floor(t[3]), e
            },
            min: function (e, t, n) {
                return e[0] = Math.min(t[0], n[0]), e[1] = Math.min(t[1], n[1]), e[2] = Math.min(t[2], n[2]), e[3] = Math.min(t[3], n[3]), e
            },
            max: function (e, t, n) {
                return e[0] = Math.max(t[0], n[0]), e[1] = Math.max(t[1], n[1]), e[2] = Math.max(t[2], n[2]), e[3] = Math.max(t[3], n[3]), e
            },
            round: function (e, t) {
                return e[0] = Math.round(t[0]), e[1] = Math.round(t[1]), e[2] = Math.round(t[2]), e[3] = Math.round(t[3]), e
            },
            scale: ue,
            scaleAndAdd: function (e, t, n, a) {
                return e[0] = t[0] + n[0] * a, e[1] = t[1] + n[1] * a, e[2] = t[2] + n[2] * a, e[3] = t[3] + n[3] * a, e
            },
            distance: ce,
            squaredDistance: de,
            length: he,
            squaredLength: fe,
            negate: function (e, t) {
                return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = -t[3], e
            },
            inverse: function (e, t) {
                return e[0] = 1 / t[0], e[1] = 1 / t[1], e[2] = 1 / t[2], e[3] = 1 / t[3], e
            },
            normalize: be,
            dot: pe,
            cross: function (e, t, n, a) {
                var i = n[0] * a[1] - n[1] * a[0],
                    r = n[0] * a[2] - n[2] * a[0],
                    o = n[0] * a[3] - n[3] * a[0],
                    s = n[1] * a[2] - n[2] * a[1],
                    l = n[1] * a[3] - n[3] * a[1],
                    u = n[2] * a[3] - n[3] * a[2],
                    c = t[0],
                    d = t[1],
                    h = t[2],
                    f = t[3];
                return e[0] = d * u - h * l + f * s, e[1] = -c * u + h * o - f * r, e[2] = c * l - d * o + f * i, e[3] = -c * s + d * r - h * i, e
            },
            lerp: me,
            random: function (e, t) {
                var n, i, r, o, s, l;
                t = t || 1;
                do {
                    s = (n = 2 * a() - 1) * n + (i = 2 * a() - 1) * i
                } while (s >= 1);
                do {
                    l = (r = 2 * a() - 1) * r + (o = 2 * a() - 1) * o
                } while (l >= 1);
                var u = Math.sqrt((1 - s) / l);
                return e[0] = t * n, e[1] = t * i, e[2] = t * r * u, e[3] = t * o * u, e
            },
            transformMat4: function (e, t, n) {
                var a = t[0],
                    i = t[1],
                    r = t[2],
                    o = t[3];
                return e[0] = n[0] * a + n[4] * i + n[8] * r + n[12] * o, e[1] = n[1] * a + n[5] * i + n[9] * r + n[13] * o, e[2] = n[2] * a + n[6] * i + n[10] * r + n[14] * o, e[3] = n[3] * a + n[7] * i + n[11] * r + n[15] * o, e
            },
            transformQuat: function (e, t, n) {
                var a = t[0],
                    i = t[1],
                    r = t[2],
                    o = n[0],
                    s = n[1],
                    l = n[2],
                    u = n[3],
                    c = u * a + s * r - l * i,
                    d = u * i + l * a - o * r,
                    h = u * r + o * i - s * a,
                    f = -o * a - s * i - l * r;
                return e[0] = c * u + f * -o + d * -l - h * -s, e[1] = d * u + f * -s + h * -o - c * -l, e[2] = h * u + f * -l + c * -s - d * -o, e[3] = t[3], e
            },
            zero: function (e) {
                return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0, e
            },
            str: function (e) {
                return "vec4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")"
            },
            exactEquals: ge,
            equals: ve,
            sub: _e,
            mul: Oe,
            div: Ie,
            dist: Ae,
            sqrDist: Ee,
            len: Me,
            sqrLen: Te,
            forEach: ye
        });

    function Ce() {
        var e = new n(4);
        return n != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e[3] = 1, e
    }

    function Se(e, t, n) {
        n *= .5;
        var a = Math.sin(n);
        return e[0] = a * t[0], e[1] = a * t[1], e[2] = a * t[2], e[3] = Math.cos(n), e
    }

    function Pe(e, t, n) {
        var a = t[0],
            i = t[1],
            r = t[2],
            o = t[3],
            s = n[0],
            l = n[1],
            u = n[2],
            c = n[3];
        return e[0] = a * c + o * s + i * u - r * l, e[1] = i * c + o * l + r * s - a * u, e[2] = r * c + o * u + a * l - i * s, e[3] = o * c - a * s - i * l - r * u, e
    }

    function ke(e, t, n) {
        n *= .5;
        var a = t[0],
            i = t[1],
            r = t[2],
            o = t[3],
            s = Math.sin(n),
            l = Math.cos(n);
        return e[0] = a * l + o * s, e[1] = i * l + r * s, e[2] = r * l - i * s, e[3] = o * l - a * s, e
    }

    function Re(e, t, n) {
        n *= .5;
        var a = t[0],
            i = t[1],
            r = t[2],
            o = t[3],
            s = Math.sin(n),
            l = Math.cos(n);
        return e[0] = a * l - r * s, e[1] = i * l + o * s, e[2] = r * l + a * s, e[3] = o * l - i * s, e
    }

    function Ne(e, t, n) {
        n *= .5;
        var a = t[0],
            i = t[1],
            r = t[2],
            o = t[3],
            s = Math.sin(n),
            l = Math.cos(n);
        return e[0] = a * l + i * s, e[1] = i * l - a * s, e[2] = r * l + o * s, e[3] = o * l - r * s, e
    }

    function je(e, t) {
        var n = t[0],
            a = t[1],
            i = t[2],
            r = t[3],
            o = Math.sqrt(n * n + a * a + i * i),
            s = Math.exp(r),
            l = o > 0 ? s * Math.sin(o) / o : 0;
        return e[0] = n * l, e[1] = a * l, e[2] = i * l, e[3] = s * Math.cos(o), e
    }

    function Le(e, t) {
        var n = t[0],
            a = t[1],
            i = t[2],
            r = t[3],
            o = Math.sqrt(n * n + a * a + i * i),
            s = o > 0 ? Math.atan2(o, r) / o : 0;
        return e[0] = n * s, e[1] = a * s, e[2] = i * s, e[3] = .5 * Math.log(n * n + a * a + i * i + r * r), e
    }

    function Be(e, n, a, i) {
        var r, o, s, l, u, c = n[0],
            d = n[1],
            h = n[2],
            f = n[3],
            b = a[0],
            p = a[1],
            m = a[2],
            g = a[3];
        return (o = c * b + d * p + h * m + f * g) < 0 && (o = -o, b = -b, p = -p, m = -m, g = -g), 1 - o > t ? (r = Math.acos(o), s = Math.sin(r), l = Math.sin((1 - i) * r) / s, u = Math.sin(i * r) / s) : (l = 1 - i, u = i), e[0] = l * c + u * b, e[1] = l * d + u * p, e[2] = l * h + u * m, e[3] = l * f + u * g, e
    }

    function Fe(e, t) {
        var n, a = t[0] + t[4] + t[8];
        if (a > 0) n = Math.sqrt(a + 1), e[3] = .5 * n, n = .5 / n, e[0] = (t[5] - t[7]) * n, e[1] = (t[6] - t[2]) * n, e[2] = (t[1] - t[3]) * n;
        else {
            var i = 0;
            t[4] > t[0] && (i = 1), t[8] > t[3 * i + i] && (i = 2);
            var r = (i + 1) % 3,
                o = (i + 2) % 3;
            n = Math.sqrt(t[3 * i + i] - t[3 * r + r] - t[3 * o + o] + 1), e[i] = .5 * n, n = .5 / n, e[3] = (t[3 * r + o] - t[3 * o + r]) * n, e[r] = (t[3 * r + i] + t[3 * i + r]) * n, e[o] = (t[3 * o + i] + t[3 * i + o]) * n
        }
        return e
    }
    var we, De, Ue, Ve, He, We, Ge = te,
        ze = ne,
        Ye = ae,
        Xe = ie,
        qe = re,
        Ke = Pe,
        Qe = ue,
        Ze = pe,
        Je = me,
        $e = he,
        et = $e,
        tt = fe,
        nt = tt,
        at = be,
        it = ge,
        rt = ve,
        ot = (we = R(), De = j(1, 0, 0), Ue = j(0, 1, 0), function (e, t, n) {
            var a = H(t, n);
            return a < -.999999 ? (W(we, De, t), Q(we) < 1e-6 && W(we, Ue, t), V(we, we), Se(e, we, Math.PI), e) : a > .999999 ? (e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e) : (W(we, t, n), e[0] = we[0], e[1] = we[1], e[2] = we[2], e[3] = 1 + a, at(e, e))
        }),
        st = (Ve = Ce(), He = Ce(), function (e, t, n, a, i, r) {
            return Be(Ve, t, i, r), Be(He, n, a, r), Be(e, Ve, He, 2 * r * (1 - r)), e
        }),
        lt = (We = m(), function (e, t, n, a) {
            return We[0] = n[0], We[3] = n[1], We[6] = n[2], We[1] = a[0], We[4] = a[1], We[7] = a[2], We[2] = -t[0], We[5] = -t[1], We[8] = -t[2], at(e, Fe(e, We))
        }),
        ut = Object.freeze({
            create: Ce,
            identity: function (e) {
                return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e
            },
            setAxisAngle: Se,
            getAxisAngle: function (e, n) {
                var a = 2 * Math.acos(n[3]),
                    i = Math.sin(a / 2);
                return i > t ? (e[0] = n[0] / i, e[1] = n[1] / i, e[2] = n[2] / i) : (e[0] = 1, e[1] = 0, e[2] = 0), a
            },
            getAngle: function (e, t) {
                var n = Ze(e, t);
                return Math.acos(2 * n * n - 1)
            },
            multiply: Pe,
            rotateX: ke,
            rotateY: Re,
            rotateZ: Ne,
            calculateW: function (e, t) {
                var n = t[0],
                    a = t[1],
                    i = t[2];
                return e[0] = n, e[1] = a, e[2] = i, e[3] = Math.sqrt(Math.abs(1 - n * n - a * a - i * i)), e
            },
            exp: je,
            ln: Le,
            pow: function (e, t, n) {
                return Le(e, t), Qe(e, e, n), je(e, e), e
            },
            slerp: Be,
            random: function (e) {
                var t = a(),
                    n = a(),
                    i = a(),
                    r = Math.sqrt(1 - t),
                    o = Math.sqrt(t);
                return e[0] = r * Math.sin(2 * Math.PI * n), e[1] = r * Math.cos(2 * Math.PI * n), e[2] = o * Math.sin(2 * Math.PI * i), e[3] = o * Math.cos(2 * Math.PI * i), e
            },
            invert: function (e, t) {
                var n = t[0],
                    a = t[1],
                    i = t[2],
                    r = t[3],
                    o = n * n + a * a + i * i + r * r,
                    s = o ? 1 / o : 0;
                return e[0] = -n * s, e[1] = -a * s, e[2] = -i * s, e[3] = r * s, e
            },
            conjugate: function (e, t) {
                return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = t[3], e
            },
            fromMat3: Fe,
            fromEuler: function (e, t, n, a) {
                var i = .5 * Math.PI / 180;
                t *= i, n *= i, a *= i;
                var r = Math.sin(t),
                    o = Math.cos(t),
                    s = Math.sin(n),
                    l = Math.cos(n),
                    u = Math.sin(a),
                    c = Math.cos(a);
                return e[0] = r * l * c - o * s * u, e[1] = o * s * c + r * l * u, e[2] = o * l * u - r * s * c, e[3] = o * l * c + r * s * u, e
            },
            str: function (e) {
                return "quat(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")"
            },
            clone: Ge,
            fromValues: ze,
            copy: Ye,
            set: Xe,
            add: qe,
            mul: Ke,
            scale: Qe,
            dot: Ze,
            lerp: Je,
            length: $e,
            len: et,
            squaredLength: tt,
            sqrLen: nt,
            normalize: at,
            exactEquals: it,
            equals: rt,
            rotationTo: ot,
            sqlerp: st,
            setAxes: lt
        });

    function ct(e, t, n) {
        var a = .5 * n[0],
            i = .5 * n[1],
            r = .5 * n[2],
            o = t[0],
            s = t[1],
            l = t[2],
            u = t[3];
        return e[0] = o, e[1] = s, e[2] = l, e[3] = u, e[4] = a * u + i * l - r * s, e[5] = i * u + r * o - a * l, e[6] = r * u + a * s - i * o, e[7] = -a * o - i * s - r * l, e
    }

    function dt(e, t) {
        return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e
    }
    var ht = Ye,
        ft = Ye;

    function bt(e, t, n) {
        var a = t[0],
            i = t[1],
            r = t[2],
            o = t[3],
            s = n[4],
            l = n[5],
            u = n[6],
            c = n[7],
            d = t[4],
            h = t[5],
            f = t[6],
            b = t[7],
            p = n[0],
            m = n[1],
            g = n[2],
            v = n[3];
        return e[0] = a * v + o * p + i * g - r * m, e[1] = i * v + o * m + r * p - a * g, e[2] = r * v + o * g + a * m - i * p, e[3] = o * v - a * p - i * m - r * g, e[4] = a * c + o * s + i * u - r * l + d * v + b * p + h * g - f * m, e[5] = i * c + o * l + r * s - a * u + h * v + b * m + f * p - d * g, e[6] = r * c + o * u + a * l - i * s + f * v + b * g + d * m - h * p, e[7] = o * c - a * s - i * l - r * u + b * v - d * p - h * m - f * g, e
    }
    var pt = bt,
        mt = Ze,
        gt = $e,
        vt = gt,
        _t = tt,
        Ot = _t,
        It = Object.freeze({
            create: function () {
                var e = new n(8);
                return n != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0, e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0), e[3] = 1, e
            },
            clone: function (e) {
                var t = new n(8);
                return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t
            },
            fromValues: function (e, t, a, i, r, o, s, l) {
                var u = new n(8);
                return u[0] = e, u[1] = t, u[2] = a, u[3] = i, u[4] = r, u[5] = o, u[6] = s, u[7] = l, u
            },
            fromRotationTranslationValues: function (e, t, a, i, r, o, s) {
                var l = new n(8);
                l[0] = e, l[1] = t, l[2] = a, l[3] = i;
                var u = .5 * r,
                    c = .5 * o,
                    d = .5 * s;
                return l[4] = u * i + c * a - d * t, l[5] = c * i + d * e - u * a, l[6] = d * i + u * t - c * e, l[7] = -u * e - c * t - d * a, l
            },
            fromRotationTranslation: ct,
            fromTranslation: function (e, t) {
                return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = .5 * t[0], e[5] = .5 * t[1], e[6] = .5 * t[2], e[7] = 0, e
            },
            fromRotation: function (e, t) {
                return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0, e
            },
            fromMat4: function (e, t) {
                var a = Ce();
                x(a, t);
                var i = new n(3);
                return T(i, t), ct(e, a, i), e
            },
            copy: dt,
            identity: function (e) {
                return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0, e
            },
            set: function (e, t, n, a, i, r, o, s, l) {
                return e[0] = t, e[1] = n, e[2] = a, e[3] = i, e[4] = r, e[5] = o, e[6] = s, e[7] = l, e
            },
            getReal: ht,
            getDual: function (e, t) {
                return e[0] = t[4], e[1] = t[5], e[2] = t[6], e[3] = t[7], e
            },
            setReal: ft,
            setDual: function (e, t) {
                return e[4] = t[0], e[5] = t[1], e[6] = t[2], e[7] = t[3], e
            },
            getTranslation: function (e, t) {
                var n = t[4],
                    a = t[5],
                    i = t[6],
                    r = t[7],
                    o = -t[0],
                    s = -t[1],
                    l = -t[2],
                    u = t[3];
                return e[0] = 2 * (n * u + r * o + a * l - i * s), e[1] = 2 * (a * u + r * s + i * o - n * l), e[2] = 2 * (i * u + r * l + n * s - a * o), e
            },
            translate: function (e, t, n) {
                var a = t[0],
                    i = t[1],
                    r = t[2],
                    o = t[3],
                    s = .5 * n[0],
                    l = .5 * n[1],
                    u = .5 * n[2],
                    c = t[4],
                    d = t[5],
                    h = t[6],
                    f = t[7];
                return e[0] = a, e[1] = i, e[2] = r, e[3] = o, e[4] = o * s + i * u - r * l + c, e[5] = o * l + r * s - a * u + d, e[6] = o * u + a * l - i * s + h, e[7] = -a * s - i * l - r * u + f, e
            },
            rotateX: function (e, t, n) {
                var a = -t[0],
                    i = -t[1],
                    r = -t[2],
                    o = t[3],
                    s = t[4],
                    l = t[5],
                    u = t[6],
                    c = t[7],
                    d = s * o + c * a + l * r - u * i,
                    h = l * o + c * i + u * a - s * r,
                    f = u * o + c * r + s * i - l * a,
                    b = c * o - s * a - l * i - u * r;
                return ke(e, t, n), a = e[0], i = e[1], r = e[2], o = e[3], e[4] = d * o + b * a + h * r - f * i, e[5] = h * o + b * i + f * a - d * r, e[6] = f * o + b * r + d * i - h * a, e[7] = b * o - d * a - h * i - f * r, e
            },
            rotateY: function (e, t, n) {
                var a = -t[0],
                    i = -t[1],
                    r = -t[2],
                    o = t[3],
                    s = t[4],
                    l = t[5],
                    u = t[6],
                    c = t[7],
                    d = s * o + c * a + l * r - u * i,
                    h = l * o + c * i + u * a - s * r,
                    f = u * o + c * r + s * i - l * a,
                    b = c * o - s * a - l * i - u * r;
                return Re(e, t, n), a = e[0], i = e[1], r = e[2], o = e[3], e[4] = d * o + b * a + h * r - f * i, e[5] = h * o + b * i + f * a - d * r, e[6] = f * o + b * r + d * i - h * a, e[7] = b * o - d * a - h * i - f * r, e
            },
            rotateZ: function (e, t, n) {
                var a = -t[0],
                    i = -t[1],
                    r = -t[2],
                    o = t[3],
                    s = t[4],
                    l = t[5],
                    u = t[6],
                    c = t[7],
                    d = s * o + c * a + l * r - u * i,
                    h = l * o + c * i + u * a - s * r,
                    f = u * o + c * r + s * i - l * a,
                    b = c * o - s * a - l * i - u * r;
                return Ne(e, t, n), a = e[0], i = e[1], r = e[2], o = e[3], e[4] = d * o + b * a + h * r - f * i, e[5] = h * o + b * i + f * a - d * r, e[6] = f * o + b * r + d * i - h * a, e[7] = b * o - d * a - h * i - f * r, e
            },
            rotateByQuatAppend: function (e, t, n) {
                var a = n[0],
                    i = n[1],
                    r = n[2],
                    o = n[3],
                    s = t[0],
                    l = t[1],
                    u = t[2],
                    c = t[3];
                return e[0] = s * o + c * a + l * r - u * i, e[1] = l * o + c * i + u * a - s * r, e[2] = u * o + c * r + s * i - l * a, e[3] = c * o - s * a - l * i - u * r, s = t[4], l = t[5], u = t[6], c = t[7], e[4] = s * o + c * a + l * r - u * i, e[5] = l * o + c * i + u * a - s * r, e[6] = u * o + c * r + s * i - l * a, e[7] = c * o - s * a - l * i - u * r, e
            },
            rotateByQuatPrepend: function (e, t, n) {
                var a = t[0],
                    i = t[1],
                    r = t[2],
                    o = t[3],
                    s = n[0],
                    l = n[1],
                    u = n[2],
                    c = n[3];
                return e[0] = a * c + o * s + i * u - r * l, e[1] = i * c + o * l + r * s - a * u, e[2] = r * c + o * u + a * l - i * s, e[3] = o * c - a * s - i * l - r * u, s = n[4], l = n[5], u = n[6], c = n[7], e[4] = a * c + o * s + i * u - r * l, e[5] = i * c + o * l + r * s - a * u, e[6] = r * c + o * u + a * l - i * s, e[7] = o * c - a * s - i * l - r * u, e
            },
            rotateAroundAxis: function (e, n, a, i) {
                if (Math.abs(i) < t) return dt(e, n);
                var r = Math.hypot(a[0], a[1], a[2]);
                i *= .5;
                var o = Math.sin(i),
                    s = o * a[0] / r,
                    l = o * a[1] / r,
                    u = o * a[2] / r,
                    c = Math.cos(i),
                    d = n[0],
                    h = n[1],
                    f = n[2],
                    b = n[3];
                e[0] = d * c + b * s + h * u - f * l, e[1] = h * c + b * l + f * s - d * u, e[2] = f * c + b * u + d * l - h * s, e[3] = b * c - d * s - h * l - f * u;
                var p = n[4],
                    m = n[5],
                    g = n[6],
                    v = n[7];
                return e[4] = p * c + v * s + m * u - g * l, e[5] = m * c + v * l + g * s - p * u, e[6] = g * c + v * u + p * l - m * s, e[7] = v * c - p * s - m * l - g * u, e
            },
            add: function (e, t, n) {
                return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e[2] = t[2] + n[2], e[3] = t[3] + n[3], e[4] = t[4] + n[4], e[5] = t[5] + n[5], e[6] = t[6] + n[6], e[7] = t[7] + n[7], e
            },
            multiply: bt,
            mul: pt,
            scale: function (e, t, n) {
                return e[0] = t[0] * n, e[1] = t[1] * n, e[2] = t[2] * n, e[3] = t[3] * n, e[4] = t[4] * n, e[5] = t[5] * n, e[6] = t[6] * n, e[7] = t[7] * n, e
            },
            dot: mt,
            lerp: function (e, t, n, a) {
                var i = 1 - a;
                return mt(t, n) < 0 && (a = -a), e[0] = t[0] * i + n[0] * a, e[1] = t[1] * i + n[1] * a, e[2] = t[2] * i + n[2] * a, e[3] = t[3] * i + n[3] * a, e[4] = t[4] * i + n[4] * a, e[5] = t[5] * i + n[5] * a, e[6] = t[6] * i + n[6] * a, e[7] = t[7] * i + n[7] * a, e
            },
            invert: function (e, t) {
                var n = _t(t);
                return e[0] = -t[0] / n, e[1] = -t[1] / n, e[2] = -t[2] / n, e[3] = t[3] / n, e[4] = -t[4] / n, e[5] = -t[5] / n, e[6] = -t[6] / n, e[7] = t[7] / n, e
            },
            conjugate: function (e, t) {
                return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = t[3], e[4] = -t[4], e[5] = -t[5], e[6] = -t[6], e[7] = t[7], e
            },
            length: gt,
            len: vt,
            squaredLength: _t,
            sqrLen: Ot,
            normalize: function (e, t) {
                var n = _t(t);
                if (n > 0) {
                    n = Math.sqrt(n);
                    var a = t[0] / n,
                        i = t[1] / n,
                        r = t[2] / n,
                        o = t[3] / n,
                        s = t[4],
                        l = t[5],
                        u = t[6],
                        c = t[7],
                        d = a * s + i * l + r * u + o * c;
                    e[0] = a, e[1] = i, e[2] = r, e[3] = o, e[4] = (s - a * d) / n, e[5] = (l - i * d) / n, e[6] = (u - r * d) / n, e[7] = (c - o * d) / n
                }
                return e
            },
            str: function (e) {
                return "quat2(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ")"
            },
            exactEquals: function (e, t) {
                return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7]
            },
            equals: function (e, n) {
                var a = e[0],
                    i = e[1],
                    r = e[2],
                    o = e[3],
                    s = e[4],
                    l = e[5],
                    u = e[6],
                    c = e[7],
                    d = n[0],
                    h = n[1],
                    f = n[2],
                    b = n[3],
                    p = n[4],
                    m = n[5],
                    g = n[6],
                    v = n[7];
                return Math.abs(a - d) <= t * Math.max(1, Math.abs(a), Math.abs(d)) && Math.abs(i - h) <= t * Math.max(1, Math.abs(i), Math.abs(h)) && Math.abs(r - f) <= t * Math.max(1, Math.abs(r), Math.abs(f)) && Math.abs(o - b) <= t * Math.max(1, Math.abs(o), Math.abs(b)) && Math.abs(s - p) <= t * Math.max(1, Math.abs(s), Math.abs(p)) && Math.abs(l - m) <= t * Math.max(1, Math.abs(l), Math.abs(m)) && Math.abs(u - g) <= t * Math.max(1, Math.abs(u), Math.abs(g)) && Math.abs(c - v) <= t * Math.max(1, Math.abs(c), Math.abs(v))
            }
        });

    function At() {
        var e = new n(2);
        return n != Float32Array && (e[0] = 0, e[1] = 0), e
    }

    function Et(e, t, n) {
        return e[0] = t[0] - n[0], e[1] = t[1] - n[1], e
    }

    function Mt(e, t, n) {
        return e[0] = t[0] * n[0], e[1] = t[1] * n[1], e
    }

    function Tt(e, t, n) {
        return e[0] = t[0] / n[0], e[1] = t[1] / n[1], e
    }

    function yt(e, t) {
        var n = t[0] - e[0],
            a = t[1] - e[1];
        return Math.hypot(n, a)
    }

    function xt(e, t) {
        var n = t[0] - e[0],
            a = t[1] - e[1];
        return n * n + a * a
    }

    function Ct(e) {
        var t = e[0],
            n = e[1];
        return Math.hypot(t, n)
    }

    function St(e) {
        var t = e[0],
            n = e[1];
        return t * t + n * n
    }
    var Pt = Ct,
        kt = Et,
        Rt = Mt,
        Nt = Tt,
        jt = yt,
        Lt = xt,
        Bt = St,
        Ft = function () {
            var e = At();
            return function (t, n, a, i, r, o) {
                var s, l;
                for (n || (n = 2), a || (a = 0), l = i ? Math.min(i * n + a, t.length) : t.length, s = a; s < l; s += n) e[0] = t[s], e[1] = t[s + 1], r(e, e, o), t[s] = e[0], t[s + 1] = e[1];
                return t
            }
        }(),
        wt = Object.freeze({
            create: At,
            clone: function (e) {
                var t = new n(2);
                return t[0] = e[0], t[1] = e[1], t
            },
            fromValues: function (e, t) {
                var a = new n(2);
                return a[0] = e, a[1] = t, a
            },
            copy: function (e, t) {
                return e[0] = t[0], e[1] = t[1], e
            },
            set: function (e, t, n) {
                return e[0] = t, e[1] = n, e
            },
            add: function (e, t, n) {
                return e[0] = t[0] + n[0], e[1] = t[1] + n[1], e
            },
            subtract: Et,
            multiply: Mt,
            divide: Tt,
            ceil: function (e, t) {
                return e[0] = Math.ceil(t[0]), e[1] = Math.ceil(t[1]), e
            },
            floor: function (e, t) {
                return e[0] = Math.floor(t[0]), e[1] = Math.floor(t[1]), e
            },
            min: function (e, t, n) {
                return e[0] = Math.min(t[0], n[0]), e[1] = Math.min(t[1], n[1]), e
            },
            max: function (e, t, n) {
                return e[0] = Math.max(t[0], n[0]), e[1] = Math.max(t[1], n[1]), e
            },
            round: function (e, t) {
                return e[0] = Math.round(t[0]), e[1] = Math.round(t[1]), e
            },
            scale: function (e, t, n) {
                return e[0] = t[0] * n, e[1] = t[1] * n, e
            },
            scaleAndAdd: function (e, t, n, a) {
                return e[0] = t[0] + n[0] * a, e[1] = t[1] + n[1] * a, e
            },
            distance: yt,
            squaredDistance: xt,
            length: Ct,
            squaredLength: St,
            negate: function (e, t) {
                return e[0] = -t[0], e[1] = -t[1], e
            },
            inverse: function (e, t) {
                return e[0] = 1 / t[0], e[1] = 1 / t[1], e
            },
            normalize: function (e, t) {
                var n = t[0],
                    a = t[1],
                    i = n * n + a * a;
                return i > 0 && (i = 1 / Math.sqrt(i)), e[0] = t[0] * i, e[1] = t[1] * i, e
            },
            dot: function (e, t) {
                return e[0] * t[0] + e[1] * t[1]
            },
            cross: function (e, t, n) {
                var a = t[0] * n[1] - t[1] * n[0];
                return e[0] = e[1] = 0, e[2] = a, e
            },
            lerp: function (e, t, n, a) {
                var i = t[0],
                    r = t[1];
                return e[0] = i + a * (n[0] - i), e[1] = r + a * (n[1] - r), e
            },
            random: function (e, t) {
                t = t || 1;
                var n = 2 * a() * Math.PI;
                return e[0] = Math.cos(n) * t, e[1] = Math.sin(n) * t, e
            },
            transformMat2: function (e, t, n) {
                var a = t[0],
                    i = t[1];
                return e[0] = n[0] * a + n[2] * i, e[1] = n[1] * a + n[3] * i, e
            },
            transformMat2d: function (e, t, n) {
                var a = t[0],
                    i = t[1];
                return e[0] = n[0] * a + n[2] * i + n[4], e[1] = n[1] * a + n[3] * i + n[5], e
            },
            transformMat3: function (e, t, n) {
                var a = t[0],
                    i = t[1];
                return e[0] = n[0] * a + n[3] * i + n[6], e[1] = n[1] * a + n[4] * i + n[7], e
            },
            transformMat4: function (e, t, n) {
                var a = t[0],
                    i = t[1];
                return e[0] = n[0] * a + n[4] * i + n[12], e[1] = n[1] * a + n[5] * i + n[13], e
            },
            rotate: function (e, t, n, a) {
                var i = t[0] - n[0],
                    r = t[1] - n[1],
                    o = Math.sin(a),
                    s = Math.cos(a);
                return e[0] = i * s - r * o + n[0], e[1] = i * o + r * s + n[1], e
            },
            angle: function (e, t) {
                var n = e[0],
                    a = e[1],
                    i = t[0],
                    r = t[1],
                    o = n * n + a * a;
                o > 0 && (o = 1 / Math.sqrt(o));
                var s = i * i + r * r;
                s > 0 && (s = 1 / Math.sqrt(s));
                var l = (n * i + a * r) * o * s;
                return l > 1 ? 0 : l < -1 ? Math.PI : Math.acos(l)
            },
            zero: function (e) {
                return e[0] = 0, e[1] = 0, e
            },
            str: function (e) {
                return "vec2(" + e[0] + ", " + e[1] + ")"
            },
            exactEquals: function (e, t) {
                return e[0] === t[0] && e[1] === t[1]
            },
            equals: function (e, n) {
                var a = e[0],
                    i = e[1],
                    r = n[0],
                    o = n[1];
                return Math.abs(a - r) <= t * Math.max(1, Math.abs(a), Math.abs(r)) && Math.abs(i - o) <= t * Math.max(1, Math.abs(i), Math.abs(o))
            },
            len: Pt,
            sub: kt,
            mul: Rt,
            div: Nt,
            dist: jt,
            sqrDist: Lt,
            sqrLen: Bt,
            forEach: Ft
        });
    e.glMatrix = r, e.mat2 = c, e.mat2d = p, e.mat3 = I, e.mat4 = k, e.quat = ut, e.quat2 = It, e.vec2 = wt, e.vec3 = $, e.vec4 = xe, Object.defineProperty(e, "__esModule", {
        value: !0
    })
}), window.glMatrix = glMatrix, window.mat2 = glMatrix.mat2, window.mat2d = glMatrix.mat2d, window.mat3 = glMatrix.mat3, window.mat4 = glMatrix.mat4, window.quat = glMatrix.quat, window.quat2 = glMatrix.quat2, window.vec2 = glMatrix.vec2, window.vec3 = glMatrix.vec3, window.vec4 = glMatrix.vec4, (CABLES = function (e) {
    var t = {};

    function n(a) {
        if (t[a]) return t[a].exports;
        var i = t[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return e[a].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    return n.m = e, n.c = t, n.d = function (e, t, a) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: a
        })
    }, n.r = function (e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, n.t = function (e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var a = Object.create(null);
        if (n.r(a), Object.defineProperty(a, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var i in e) n.d(a, i, function (t) {
                return e[t]
            }.bind(null, i));
        return a
    }, n.n = function (e) {
        var t = e && e.__esModule ? function () {
            return e.default
        } : function () {
            return e
        };
        return n.d(t, "a", t), t
    }, n.o = function (e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }, n.p = "", n(n.s = 0)
}([function (e, t, n) {
    e.exports = n(1)
}, function (e, t, n) {
    "use strict";
    n.r(t);
    var a = {};
    n.r(a), n.d(a, "base64Chars", function () {
        return l
    }), n.d(a, "base64lookup", function () {
        return d
    }), n.d(a, "b64encTypesArray", function () {
        return h
    }), n.d(a, "b64decTypedArray", function () {
        return f
    });
    var r = {};
    n.r(r), n.d(r, "shuffleArray", function () {
        return I
    }), n.d(r, "shortId", function () {
        return M
    }), n.d(r, "uuid", function () {
        return y
    }), n.d(r, "generateUUID", function () {
        return x
    }), n.d(r, "simpleId", function () {
        return S
    }), n.d(r, "smoothStep", function () {
        return P
    }), n.d(r, "smootherStep", function () {
        return k
    }), n.d(r, "map", function () {
        return R
    }), n.d(r, "cacheBust", function () {
        return N
    }), n.d(r, "jsonp", function () {
        return L
    }), n.d(r, "ajaxSync", function () {
        return B
    }), n.d(r, "ajax", function () {
        return F
    }), n.d(r, "request", function () {
        return w
    }), n.d(r, "UTILS", function () {
        return O
    });
    var o = {};
    n.r(o), n.d(o, "easeExpoIn", function () {
        return H
    }), n.d(o, "easeExpoOut", function () {
        return W
    }), n.d(o, "easeExpoInOut", function () {
        return G
    }), n.d(o, "easeCubicIn", function () {
        return z
    }), n.d(o, "easeCubicOut", function () {
        return Y
    }), n.d(o, "easeCubicInOut", function () {
        return X
    }), n.d(o, "ANIM", function () {
        return V
    }), n.d(o, "Anim", function () {
        return q
    }), n.d(o, "TL", function () {
        return K
    });
    var s = {};
    n.r(s), n.d(s, "togglePacoRenderer", function () {
        return je
    }), n.d(s, "showPacoRenderer", function () {
        return Le
    }), n.d(s, "PatchConnectionReceiver", function () {
        return Be
    }), n.d(s, "PatchConnectionSender", function () {
        return Fe
    }), n.d(s, "PatchConnectorBroadcastChannel", function () {
        return we
    });
    const l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        u = new Uint8Array(256);
    for (var c = 0; c < l.length; c++) u[l.charCodeAt(c)] = c;
    const d = u,
        h = function (e) {
            e.buffer && (e = e.buffer);
            var t, n = new Uint8Array(e),
                a = n.length,
                i = "";
            for (t = 0; t < a; t += 3) i += l[n[t] >> 2], i += l[(3 & n[t]) << 4 | n[t + 1] >> 4], i += l[(15 & n[t + 1]) << 2 | n[t + 2] >> 6], i += l[63 & n[t + 2]];
            return a % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : a % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="), i
        },
        f = function (e) {
            var t, n, a, i, r, o = .75 * e.length,
                s = e.length,
                l = 0;
            "=" === e[e.length - 1] && (o--, "=" === e[e.length - 2] && o--);
            var u = new ArrayBuffer(o),
                c = new Uint8Array(u);
            for (t = 0; t < s; t += 4) n = d[e.charCodeAt(t)], a = d[e.charCodeAt(t + 1)], i = d[e.charCodeAt(t + 2)], r = d[e.charCodeAt(t + 3)], c[l++] = n << 2 | a >> 4, c[l++] = (15 & a) << 4 | i >> 2, c[l++] = (3 & i) << 6 | 63 & r;
            return u
        },
        b = function () {
            this._eventCallbacks = {}, this.addEventListener = this.on = function (e, t) {
                this._eventCallbacks[e] ? this._eventCallbacks[e].push(t) : this._eventCallbacks[e] = [t]
            }, this.hasEventListener = function (e, t) {
                if (e && t) {
                    if (this._eventCallbacks[e]) return -1 != this._eventCallbacks[e].indexOf(t)
                } else Log.warn("hasListener: missing parameters")
            }, this.removeEventListener = function (e, t) {
                if (this._eventCallbacks[e]) {
                    var n = this._eventCallbacks[e].indexOf(t); - 1 == n ? Log.warn("eventlistener " + e + " not found...") : this._eventCallbacks[e].splice(n)
                }
            }, this.emitEvent = function (e, t, n, a, i, r, o) {
                if (this._eventCallbacks[e])
                    for (var s = 0; s < this._eventCallbacks[e].length; s++) this._eventCallbacks[e][s] && this._eventCallbacks[e][s](t, n, a, i, r, o)
            }
        };
    var p = !1;
    const m = function () {
            if (p) return;
            const e = ["[core]"];
            e.push.apply(e, arguments), Function.prototype.apply.apply(console.log, [console, e])
        },
        g = function (e) {
            if (!p) {
                var t = ["[core]"];
                t.push.apply(t, arguments), Function.prototype.apply.apply(console.warn, [console, t])
            }
        },
        v = function (e) {
            var t = ["[core]"];
            t.push.apply(t, arguments), Function.prototype.apply.apply(console.error, [console, t])
        },
        _ = function (e) {
            p = e
        },
        O = {
            float32Concat: function (e, t) {
                e instanceof Float32Array || (e = new Float32Array(e)), t instanceof Float32Array || (t = new Float32Array(t));
                var n = e.length,
                    a = new Float32Array(n + t.length);
                return a.set(e), a.set(t, n), a
            }
        },
        I = function (e) {
            for (var t = e.length - 1; t > 0; t--) {
                var n = Math.floor(Math.seededRandom() * (t + 1)),
                    a = e[t];
                e[t] = e[n], e[n] = a
            }
            return e
        },
        A = {},
        E = function () {
            const e = Math.random().toString(36).substr(2, 9);
            return A.hasOwnProperty(e) && (e = E()), A[e] = !0, e
        },
        M = E,
        T = function () {
            var e = (new Date).getTime();
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, t => {
                var n = (e + 16 * Math.random()) % 16 | 0;
                return e = Math.floor(e / 16), ("x" == t ? n : 3 & n | 8).toString(16)
            })
        },
        y = T,
        x = T;
    var C = 0;
    const S = function () {
            return ++C
        },
        P = function (e) {
            var t = Math.max(0, Math.min(1, (e - 0) / 1));
            return t * t * (3 - 2 * t)
        },
        k = function (e) {
            var t = Math.max(0, Math.min(1, (e - 0) / 1));
            return t * t * t * (t * (6 * t - 15) + 10)
        },
        R = function (e, t, n, a, i, r) {
            if (e >= n) return i;
            if (e <= t) return a;
            var o = !1,
                s = Math.min(t, n),
                l = Math.max(t, n);
            s != t && (o = !0);
            var u = !1,
                c = Math.min(a, i),
                d = Math.max(a, i);
            c != a && (u = !0);
            var h, f;
            return h = o ? (l - e) * (d - c) / (l - s) : (e - s) * (d - c) / (l - s), f = u ? d - h : h + c, r ? 1 == r ? a + (e = Math.max(0, Math.min(1, (f - a) / (i - a)))) * e * (3 - 2 * e) * (i - a) : 2 == r ? a + (e = Math.max(0, Math.min(1, (f - a) / (i - a)))) * e * e * (e * (6 * e - 15) + 10) * (i - a) : f : f
        };
    Math.randomSeed = 1, Math.seededRandom = function (e, t) {
        return 0 === Math.randomSeed && (Math.randomSeed = 999 * Math.random()), e = e || 1, t = t || 0, Math.randomSeed = (9301 * Math.randomSeed + 49297) % 233280, t + Math.randomSeed / 233280 * (e - t)
    }, O.arrayWriteToEnd = function (e, t) {
        for (var n = 1; n < e.length; n++) e[n - 1] = e[n];
        e[e.length - 1] = t
    }, O.isNumeric = function (e) {
        return !isNaN(parseFloat(e)) && isFinite(e)
    }, O.isArray = function (e) {
        return "[object Array]" === Object.prototype.toString.call(e)
    }, String.prototype.endl = function () {
        return this + "\n"
    }, String.prototype.startsWith = function (e) {
        return 0 === this.indexOf(e)
    }, String.prototype.endsWith = function (e) {
        return this.match(e + "$") == e
    };
    const N = function (e) {
        return e.indexOf("?") > -1 ? e += "&" : e += "?", e + "cb=" + CABLES.uuid()
    };
    var j = null;
    const L = function (e, t) {
            j = j || 0;
            var n = ++j;
            CABLES["jsonpFunc" + n] = function (e) {
                t(!1, e)
            };
            var a = "?";
            e.indexOf(a) > -1 && (a = "&");
            var i = document.createElement("script");
            i.setAttribute("src", e + a + "callback=CABLES.jsonpFunc" + n), document.body.appendChild(i)
        },
        B = function (e, t, n, a, i) {
            w({
                url: e,
                cb: t,
                method: n,
                data: a,
                contenttype: i,
                sync: !0
            })
        },
        F = function (e, t, n, a, i, r) {
            w({
                url: e,
                cb: t,
                method: n,
                "data:": a,
                contenttype: i,
                sync: !1,
                jsonp: r
            })
        },
        w = function (e) {
            var t;
            e.hasOwnProperty("asynch") || (e.asynch = !0);
            try {
                t = new XMLHttpRequest
            } catch (e) {}
            t.onreadystatechange = function () {
                4 == t.readyState && e.cb && (200 == t.status || 0 == t.status ? e.cb(!1, t.responseText, t) : e.cb(!0, t.responseText, t))
            }, t.addEventListener("progress", e => {}), t.open(e.method ? e.method.toUpperCase() : "GET", e.url, !e.sync), e.post || e.data ? (t.setRequestHeader("Content-type", e.contenttype ? e.contenttype : "application/x-www-form-urlencoded"), t.send(e.data || e.post)) : t.send()
        };
    window.performance = window.performance || {
        offset: Date.now(),
        now: function () {
            return Date.now() - this.offset
        }
    };
    const D = {
            ANIM: {
                EASINGS: ["linear", "absolute", "smoothstep", "smootherstep", "Cubic In", "Cubic Out", "Cubic In Out", "Expo In", "Expo Out", "Expo In Out", "Sin In", "Sin Out", "Sin In Out", "Quart In", "Quart Out", "Quart In Out", "Quint In", "Quint Out", "Quint In Out", "Back In", "Back Out", "Back In Out", "Elastic In", "Elastic Out", "Elastic In Out", "Bounce In", "Bounce Out"],
                EASING_LINEAR: 0,
                EASING_ABSOLUTE: 1,
                EASING_SMOOTHSTEP: 2,
                EASING_SMOOTHERSTEP: 3,
                EASING_BEZIER: 4,
                EASING_CUBIC_IN: 5,
                EASING_CUBIC_OUT: 6,
                EASING_CUBIC_INOUT: 7,
                EASING_EXPO_IN: 8,
                EASING_EXPO_OUT: 9,
                EASING_EXPO_INOUT: 10,
                EASING_SIN_IN: 11,
                EASING_SIN_OUT: 12,
                EASING_SIN_INOUT: 13,
                EASING_BACK_IN: 14,
                EASING_BACK_OUT: 15,
                EASING_BACK_INOUT: 16,
                EASING_ELASTIC_IN: 17,
                EASING_ELASTIC_OUT: 18,
                EASING_BOUNCE_IN: 19,
                EASING_BOUNCE_OUT: 21,
                EASING_QUART_IN: 22,
                EASING_QUART_OUT: 23,
                EASING_QUART_INOUT: 24,
                EASING_QUINT_IN: 25,
                EASING_QUINT_OUT: 26,
                EASING_QUINT_INOUT: 27
            },
            OP: {
                OP_PORT_TYPE_VALUE: 0,
                OP_PORT_TYPE_FUNCTION: 1,
                OP_PORT_TYPE_OBJECT: 2,
                OP_PORT_TYPE_TEXTURE: 2,
                OP_PORT_TYPE_ARRAY: 3,
                OP_PORT_TYPE_DYNAMIC: 4,
                OP_PORT_TYPE_STRING: 5,
                OP_VERSION_PREFIX: "_v"
            },
            PORT: {
                PORT_DIR_IN: 0,
                PORT_DIR_OUT: 1
            },
            PACO: {
                PACO_CLEAR: 0,
                PACO_VALUECHANGE: 1,
                PACO_OP_DELETE: 2,
                PACO_UNLINK: 3,
                PACO_LINK: 4,
                PACO_LOAD: 5,
                PACO_OP_CREATE: 6,
                PACO_OP_ENABLE: 7,
                PACO_OP_DISABLE: 8
            }
        },
        U = function (e, t, n, a) {
            b.apply(this), this.data = {}, this.direction = D.PORT.PORT_DIR_IN, this.id = x(), this.parent = e, this.links = [], this.value = 0, this.name = t, this.type = n || D.OP.OP_PORT_TYPE_VALUE, this.uiAttribs = a || {}, this.anim = null, this._oldAnimVal = -5711, this.defaultValue = null, this._uiActiveState = !0, this.ignoreValueSerialize = !1, this.onLinkChanged = null, this.crashed = !1, this._valueBeforeLink = null, this._lastAnimFrame = -1, this._animated = !1, this.onValueChanged = null, this.onTriggered = null, this.onUiActiveStateChange = null, this.changeAlways = !1, this._warnedDeprecated = !1, Object.defineProperty(this, "val", {
                get() {
                    return this._warnedDeprecated = !0, this.get()
                },
                set(e) {
                    this.setValue(e), this._warnedDeprecated = !0
                }
            })
        };
    U.prototype.onAnimToggle = function () {}, U.prototype._onAnimToggle = function () {
        this.onAnimToggle()
    }, U.prototype.hidePort = function () {
        this.setUiAttribs({
            hidePort: !0
        })
    }, U.prototype.remove = function () {
        this.removeLinks(), this.parent.removePort(this)
    }, U.prototype.setUiAttribs = function (e) {
        for (var t in this.uiAttribs || (this.uiAttribs = {}), e) this.uiAttribs[t] = e[t];
        this.emitEvent("onUiAttrChange", e)
    }, U.prototype.get = function () {
        return this._animated && this._lastAnimFrame != this.parent.patch.getFrameNum() && (this._lastAnimFrame = this.parent.patch.getFrameNum(), this.value = this.anim.getValue(this.parent.patch.timer.getTime()), this._oldAnimVal = this.value, this.forceChange()), this.value
    }, U.prototype.set = U.prototype.setValue = function (e) {
        if (void 0 !== e && this.parent.enabled && !this.crashed && (e !== this.value || this.changeAlways || this.type == D.OP.OP_PORT_TYPE_TEXTURE || this.type == D.OP.OP_PORT_TYPE_ARRAY)) {
            if (this._animated) this.anim.setValue(this.parent.patch.timer.getTime(), e);
            else {
                try {
                    this.value = e, this.forceChange()
                } catch (e) {
                    this.crashed = !0, this.setValue = function (e) {}, this.onTriggered = function () {}, m("exception!"), console.error("onvaluechanged exception cought", e), m(e.stack), m("exception in: " + this.parent.name), gui && gui.showOpCrash(this.parent), this.parent.patch.emitEvent("exception".ex, this.parent)
                }
                CABLES.UI && this.type == D.OP.OP_PORT_TYPE_TEXTURE && gui.texturePreview().updateTexturePort(this)
            }
            if (this.direction == D.PORT.PORT_DIR_OUT)
                for (var t = 0; t < this.links.length; ++t) this.links[t].setValue()
        }
    }, U.prototype.updateAnim = function () {
        this._animated && (this.value = this.get(), (this._oldAnimVal != this.value || this.changeAlways) && (this._oldAnimVal = this.value, this.forceChange()), this._oldAnimVal = this.value)
    }, U.args = function (e) {
        return (e + "").replace(/[\/][\/].*$/gm, "").replace(/\s+/g, "").replace(/[\/][*][^\/*]*[*][\/]/g, "").split("){", 1)[0].replace(/^[^(]*[(]/, "").replace(/=[^,]+/g, "").split(",").filter(Boolean)
    }, U.prototype.forceChange = function () {
        this.onValueChanged || this.onChange, this.onChange ? this.onChange(this, this.value) : this.onValueChanged && this.onValueChanged(this, this.value)
    }, U.prototype.getTypeString = function () {
        return this.type == D.OP.OP_PORT_TYPE_VALUE ? "Number" : this.type == D.OP.OP_PORT_TYPE_FUNCTION ? "Trigger" : this.type == D.OP.OP_PORT_TYPE_OBJECT ? "Object" : this.type == D.OP.OP_PORT_TYPE_DYNAMIC ? "Dynamic" : this.type == D.OP.OP_PORT_TYPE_ARRAY ? "Array" : this.type == D.OP.OP_PORT_TYPE_STRING ? "String" : "Unknown"
    }, U.prototype.getSerialized = function () {
        var e = {};
        if (e.name = this.getName(), this.ignoreValueSerialize || 0 !== this.links.length || this.type == D.OP.OP_PORT_TYPE_OBJECT && this.value && this.value.tex || (e.value = this.value), this._animated && (e.animated = !0), this.anim && (e.anim = this.anim.getSerialized()), "file" == this.uiAttribs.display && (e.display = this.uiAttribs.display), this.direction == D.PORT.PORT_DIR_IN && this.links.length > 0)
            for (var t in e.links = [], this.links) this.links[t].portIn && this.links[t].portOut && e.links.push(this.links[t].getSerialized());
        return e
    }, U.prototype.shouldLink = function () {
        return !0
    }, U.prototype.removeLinks = function () {
        for (var e = 0; this.links.length > 0;) {
            if (++e > 5e3) {
                console.warn("could not delete links... / infinite loop"), this.links.length = 0;
                break
            }
            this.links[0].remove()
        }
    }, U.prototype.removeLink = function (e) {
        for (var t in this.links) this.links[t] == e && this.links.splice(t, 1);
        this.direction == D.PORT.PORT_DIR_IN && (this.type == D.OP.OP_PORT_TYPE_VALUE ? this.setValue(this._valueBeforeLink || 0) : this.setValue(this._valueBeforeLink || null)), this.onLinkChanged && this.onLinkChanged(), this.emitEvent("onLinkChanged")
    }, U.prototype.getName = function () {
        return this.name
    }, U.prototype.addLink = function (e) {
        this._valueBeforeLink = this.value, this.links.push(e), this.onLinkChanged && this.onLinkChanged(), this.emitEvent("onLinkChanged")
    }, U.prototype.getLinkTo = function (e) {
        for (var t in this.links)
            if (this.links[t].portIn == e || this.links[t].portOut == e) return this.links[t]
    }, U.prototype.removeLinkTo = function (e) {
        for (var t in this.links)
            if (this.links[t].portIn == e || this.links[t].portOut == e) return this.links[t].remove(), this.onLinkChanged && this.onLinkChanged(), void this.emitEvent("onLinkChanged")
    }, U.prototype.isLinkedTo = function (e) {
        for (var t in this.links)
            if (this.links[t].portIn == e || this.links[t].portOut == e) return !0;
        return !1
    }, U.prototype.trigger = function () {
        if (0 !== this.links.length && this.parent.enabled) {
            var e = null;
            try {
                for (var t = 0; t < this.links.length; ++t) this.links[t].portIn && (e = this.links[t].portIn)._onTriggered(), this.links[t] && this.links[t].activity()
            } catch (t) {
                this.parent.enabled = !1, CABLES.UI && (this.parent.patch.emitEvent("exception".ex, e.parent), window.gui && gui.showOpCrash(e.parent)), m("exception!"), console.error("ontriggered exception cought", t), m(t.stack), m("exception in: " + e.parent.name)
            }
        }
    }, U.prototype.call = function () {
        m("call deprecated - use trigger() "), this.trigger()
    }, U.prototype.execute = function () {
        m("### execute port: " + this.getName(), this.goals.length)
    }, U.prototype.setAnimated = function (e) {
        this._animated != e && (this._animated = e, this._animated && !this.anim && (this.anim = new q), this._onAnimToggle())
    }, U.prototype.toggleAnim = function (e) {
        this._animated = !this._animated, this._animated && !this.anim && (this.anim = new q), this.setAnimated(this._animated), this._onAnimToggle()
    }, U.prototype.getType = function () {
        return this.type
    }, U.prototype.isLinked = function () {
        return this.links.length > 0
    }, U.prototype.isAnimated = function () {
        return this._animated
    }, U.prototype.isHidden = function () {
        return this.uiAttribs.hidePort
    }, U.prototype._onTriggered = function () {
        this.parent.updateAnims(), this.parent.enabled && this.onTriggered && this.onTriggered()
    }, U.prototype._onTriggeredProfiling = function () {
        this.parent.updateAnims(), this.parent.patch.profiler.add("port", this), this.parent.enabled && this.onTriggered && this.onTriggered(), this.parent.patch.profiler.add("port", null)
    }, U.prototype.onValueChange = function (e) {
        this.onChange = e
    }, U.prototype.getUiActiveState = function () {
        return this._uiActiveState
    }, U.prototype.setUiActiveState = function (e) {
        this._uiActiveState = e, this.onUiActiveStateChange && this.onUiActiveStateChange()
    }, U.portTypeNumberToString = function (e) {
        return e == D.OP.OP_PORT_TYPE_VALUE ? "value" : e == D.OP.OP_PORT_TYPE_FUNCTION ? "function" : e == D.OP.OP_PORT_TYPE_OBJECT ? "object" : e == D.OP.OP_PORT_TYPE_ARRAY ? "array" : e == D.OP.OP_PORT_TYPE_STRING ? "string" : e == D.OP.OP_PORT_TYPE_DYNAMIC ? "dynamic" : "unknown"
    };
    const V = {
        Key: function (e) {
            this.time = 0, this.value = 0, this.ui = {}, this.onChange = null, this._easing = 0, this.bezTime = .5, this.bezValue = 0, this.bezTimeIn = -.5, this.bezValueIn = 0, this.cb = null, this.cbTriggered = !1, this._updateBezier = !1, this.setEasing(D.ANIM.EASING_LINEAR), this.set(e)
        }
    };
    V.Key.linear = function (e, t, n) {
        return parseFloat(t.value) + parseFloat(n.value - t.value) * e
    }, V.Key.easeLinear = function (e, t) {
        return V.Key.linear(e, this, t)
    }, V.Key.easeAbsolute = function (e, t) {
        return this.value
    };
    const H = function (e) {
        return Math.pow(2, 10 * (e - 1))
    };
    V.Key.easeExpoIn = function (e, t) {
        return e = H(e), V.Key.linear(e, this, t)
    };
    const W = function (e) {
        return 1 - Math.pow(2, -10 * e)
    };
    V.Key.easeExpoOut = function (e, t) {
        return e = W(e), V.Key.linear(e, this, t)
    };
    const G = function (e) {
        return (e *= 2) < 1 ? e = .5 * Math.pow(2, 10 * (e - 1)) : (e--, e = .5 * (2 - Math.pow(2, -10 * e))), e
    };
    V.Key.easeExpoInOut = function (e, t) {
        return e = G(e), V.Key.linear(e, this, t)
    }, V.Key.easeSinIn = function (e, t) {
        return e = -1 * Math.cos(e * Math.PI / 2) + 1, V.Key.linear(e, this, t)
    }, V.Key.easeSinOut = function (e, t) {
        return e = Math.sin(e * Math.PI / 2), V.Key.linear(e, this, t)
    }, V.Key.easeSinInOut = function (e, t) {
        return e = -.5 * (Math.cos(Math.PI * e) - 1), V.Key.linear(e, this, t)
    };
    const z = function (e) {
        return e * (e * e)
    };
    V.Key.easeCubicIn = function (e, t) {
        return e = z(e), V.Key.linear(e, this, t)
    }, V.Key.easeInQuint = function (e, t) {
        return e *= e * e * e * e, V.Key.linear(e, this, t)
    }, V.Key.easeOutQuint = function (e, t) {
        return e = (e -= 1) * e * e * e * e + 1, V.Key.linear(e, this, t)
    }, V.Key.easeInOutQuint = function (e, t) {
        return (e /= .5) < 1 ? e *= .5 * e * e * e * e : e = .5 * ((e -= 2) * e * e * e * e + 2), V.Key.linear(e, this, t)
    }, V.Key.easeInQuart = function (e, t) {
        return e *= e * e * e, V.Key.linear(e, this, t)
    }, V.Key.easeOutQuart = function (e, t) {
        return e = -1 * ((e -= 1) * e * e * e - 1), V.Key.linear(e, this, t)
    }, V.Key.easeInOutQuart = function (e, t) {
        return (e /= .5) < 1 ? e *= .5 * e * e * e : e = -.5 * ((e -= 2) * e * e * e - 2), V.Key.linear(e, this, t)
    }, V.Key.bounce = function (e) {
        return (e /= 1) < 1 / 2.75 ? e *= 7.5625 * e : e = e < 2 / 2.75 ? 7.5625 * (e -= 1.5 / 2.75) * e + .75 : e < 2.5 / 2.75 ? 7.5625 * (e -= 2.25 / 2.75) * e + .9375 : 7.5625 * (e -= 2.625 / 2.75) * e + .984375, e
    }, V.Key.easeInBounce = function (e, t) {
        return V.Key.linear(V.Key.bounce(e), this, t)
    }, V.Key.easeOutBounce = function (e, t) {
        return V.Key.linear(V.Key.bounce(e), this, t)
    }, V.Key.easeInElastic = function (e, t) {
        var n = 1.70158,
            a = 0,
            i = 1;
        return 0 === e ? e = 0 : 1 == (e /= 1) ? e = 1 : (a || (a = .3), i < Math.abs(1) ? (i = 1, n = a / 4) : n = a / (2 * Math.PI) * Math.asin(1 / i), e = -i * Math.pow(2, 10 * (e -= 1)) * Math.sin((1 * e - n) * (2 * Math.PI) / a) + 0), V.Key.linear(e, this, t)
    }, V.Key.easeOutElastic = function (e, t) {
        var n = 1.70158,
            a = 0,
            i = 1;
        return 0 === e ? e = 0 : 1 == (e /= 1) ? e = 1 : (a || (a = .3), i < Math.abs(1) ? (i = 1, n = a / 4) : n = a / (2 * Math.PI) * Math.asin(1 / i), e = i * Math.pow(2, -10 * e) * Math.sin((1 * e - n) * (2 * Math.PI) / a) + 1 + 0), V.Key.linear(e, this, t)
    }, V.Key.easeInBack = function (e, t) {
        var n = 1.70158;
        return e = e * e * ((n + 1) * e - n), V.Key.linear(e, this, t)
    }, V.Key.easeOutBack = function (e, t) {
        var n = 1.70158;
        return e = (e = e / 1 - 1) * e * ((n + 1) * e + n) + 1, V.Key.linear(e, this, t)
    }, V.Key.easeInOutBack = function (e, t) {
        var n = 1.70158;
        return e = (e /= .5) < 1 ? e * e * ((1 + (n *= 1.525)) * e - n) * .5 : .5 * ((e -= 2) * e * ((1 + (n *= 1.525)) * e + n) + 2), V.Key.linear(e, this, t)
    };
    const Y = function (e) {
        return --e * e * e + 1
    };
    V.Key.easeCubicOut = function (e, t) {
        return e = Y(e), V.Key.linear(e, this, t)
    };
    const X = function (e) {
        return (e *= 2) < 1 ? e *= .5 * e * e : e = .5 * ((e -= 2) * e * e + 2), e
    };
    V.Key.easeCubicInOut = function (e, t) {
        return e = X(e), V.Key.linear(e, this, t)
    }, V.Key.easeSmoothStep = function (e, t) {
        var n = Math.max(0, Math.min(1, e));
        return e = n * n * (3 - 2 * n), V.Key.linear(e, this, t)
    }, V.Key.easeSmootherStep = function (e, t) {
        var n = Math.max(0, Math.min(1, (e - 0) / 1));
        return e = n * n * n * (n * (6 * n - 15) + 10), V.Key.linear(e, this, t)
    }, V.Key.prototype.setEasing = function (e) {
        this._easing = e, this._easing == D.ANIM.EASING_ABSOLUTE ? this.ease = V.Key.easeAbsolute : this._easing == D.ANIM.EASING_SMOOTHSTEP ? this.ease = V.Key.easeSmoothStep : this._easing == D.ANIM.EASING_SMOOTHERSTEP ? this.ease = V.Key.easeSmootherStep : this._easing == D.ANIM.EASING_CUBIC_IN ? this.ease = V.Key.easeCubicIn : this._easing == D.ANIM.EASING_CUBIC_OUT ? this.ease = V.Key.easeCubicOut : this._easing == D.ANIM.EASING_CUBIC_INOUT ? this.ease = V.Key.easeCubicInOut : this._easing == D.ANIM.EASING_EXPO_IN ? this.ease = V.Key.easeExpoIn : this._easing == D.ANIM.EASING_EXPO_OUT ? this.ease = V.Key.easeExpoOut : this._easing == D.ANIM.EASING_EXPO_INOUT ? this.ease = V.Key.easeExpoInOut : this._easing == D.ANIM.EASING_SIN_IN ? this.ease = V.Key.easeSinIn : this._easing == D.ANIM.EASING_SIN_OUT ? this.ease = V.Key.easeSinOut : this._easing == D.ANIM.EASING_SIN_INOUT ? this.ease = V.Key.easeSinInOut : this._easing == D.ANIM.EASING_BACK_OUT ? this.ease = V.Key.easeOutBack : this._easing == D.ANIM.EASING_BACK_IN ? this.ease = V.Key.easeInBack : this._easing == D.ANIM.EASING_BACK_INOUT ? this.ease = V.Key.easeInOutBack : this._easing == D.ANIM.EASING_ELASTIC_IN ? this.ease = V.Key.easeInElastic : this._easing == D.ANIM.EASING_ELASTIC_OUT ? this.ease = V.Key.easeOutElastic : this._easing == D.ANIM.EASING_BOUNCE_IN ? this.ease = V.Key.easeInBounce : this._easing == D.ANIM.EASING_BOUNCE_OUT ? this.ease = V.Key.easeOutBounce : this._easing == D.ANIM.EASING_QUART_OUT ? this.ease = V.Key.easeOutQuart : this._easing == D.ANIM.EASING_QUART_IN ? this.ease = V.Key.easeInQuart : this._easing == D.ANIM.EASING_QUART_INOUT ? this.ease = V.Key.easeInOutQuart : this._easing == D.ANIM.EASING_QUINT_OUT ? this.ease = V.Key.easeOutQuint : this._easing == D.ANIM.EASING_QUINT_IN ? this.ease = V.Key.easeInQuint : this._easing == D.ANIM.EASING_QUINT_INOUT ? this.ease = V.Key.easeInOutQuint : this._easing == D.ANIM.EASING_BEZIER ? (this._updateBezier = !0, this.ease = V.Key.easeBezier) : (this._easing = D.ANIM.EASING_LINEAR, this.ease = V.Key.easeLinear)
    }, V.Key.prototype.trigger = function () {
        this.cb(), this.cbTriggered = !0
    }, V.Key.prototype.setValue = function (e) {
        this.value = e, this._updateBezier = !0, null !== this.onChange && this.onChange()
    }, V.Key.prototype.set = function (e) {
        e && (e.e && this.setEasing(e.e), e.cb && (this.cb = e.cb, this.cbTriggered = !1), e.b && (this.bezTime = e.b[0], this.bezValue = e.b[1], this.bezTimeIn = e.b[2], this.bezValueIn = e.b[3], this._updateBezier = !0), e.hasOwnProperty("t") && (this.time = e.t), e.hasOwnProperty("time") && (this.time = e.time), e.hasOwnProperty("v") ? this.value = e.v : e.hasOwnProperty("value") && (this.value = e.value)), null !== this.onChange && this.onChange()
    }, V.Key.prototype.getSerialized = function () {
        var e = {};
        return e.t = this.time, e.v = this.value, e.e = this._easing, this._easing == D.ANIM.EASING_BEZIER && (e.b = [this.bezTime, this.bezValue, this.bezTimeIn, this.bezValueIn]), e
    }, V.Key.prototype.getEasing = function () {
        return this._easing
    };
    const q = function (e) {
        this.keys = [], this.onChange = null, this.stayInTimeline = !1, this.loop = !1, this.defaultEasing = D.ANIM.EASING_LINEAR, this.onLooped = null, this._timesLooped = 0, this._needsSort = !1
    };
    q.prototype.forceChangeCallback = function () {
        null !== this.onChange && this.onChange()
    }, q.prototype.hasEnded = function (e) {
        return 0 === this.keys.length || this.keys[this.keys.length - 1].time <= e
    }, q.prototype.isRising = function (e) {
        if (this.hasEnded(e)) return !1;
        var t = this.getKeyIndex(e);
        return this.keys[t].value < this.keys[t + 1].value
    }, q.prototype.clear = function (e) {
        var t = 0;
        e && (t = this.getValue(e)), this.keys.length = 0, e && this.setValue(e, t), null !== this.onChange && this.onChange()
    }, q.prototype.sortKeys = function () {
        this.keys.sort((e, t) => parseFloat(e.time) - parseFloat(t.time)), this._needsSort = !1
    }, q.prototype.getLength = function () {
        return 0 === this.keys.length ? 0 : this.keys[this.keys.length - 1].time
    }, q.prototype.getKeyIndex = function (e) {
        for (var t = 0, n = 0; n < this.keys.length; n++)
            if (e >= this.keys[n].time && (t = n), this.keys[n].time > e) return t;
        return t
    }, q.prototype.setValue = function (e, t, n) {
        var a = !1;
        for (var i in this.keys)
            if (this.keys[i].time == e) {
                a = this.keys[i], this.keys[i].setValue(t), this.keys[i].cb = n;
                break
            } a || this.keys.push(new V.Key({
            time: e,
            value: t,
            e: this.defaultEasing,
            cb: n
        })), this.onChange && this.onChange(), this._needsSort = !0
    }, q.prototype.getSerialized = function () {
        var e = {
            keys: []
        };
        for (var t in e.loop = this.loop, this.keys) e.keys.push(this.keys[t].getSerialized());
        return e
    }, q.prototype.getKey = function (e) {
        var t = this.getKeyIndex(e);
        return this.keys[t]
    }, q.prototype.getNextKey = function (e) {
        var t = this.getKeyIndex(e) + 1;
        return t >= this.keys.length && (t = this.keys.length - 1), this.keys[t]
    }, q.prototype.isFinished = function (e) {
        return this.keys.length <= 0 || e > this.keys[this.keys.length - 1].time
    }, q.prototype.isStarted = function (e) {
        return !(this.keys.length <= 0) && e >= this.keys[0].time
    }, q.prototype.getValue = function (e) {
        if (0 === this.keys.length) return 0;
        if (this._needsSort && this.sortKeys(), e < this.keys[0].time) return this.keys[0].value;
        var t = this.keys.length - 1;
        this.loop && e > this.keys[t].time && (e / this.keys[t].time > this._timesLooped && (this._timesLooped++, this.onLooped && this.onLooped()), e = (e - this.keys[0].time) % (this.keys[t].time - this.keys[0].time), e += this.keys[0].time);
        var n = this.getKeyIndex(e);
        if (n >= t) return this.keys[t].cb && !this.keys[t].cbTriggered && this.keys[t].trigger(), this.keys[t].value;
        var a = parseInt(n, 10) + 1,
            i = this.keys[n],
            r = this.keys[a];
        if (i.cb && !i.cbTriggered && i.trigger(), !r) return -1;
        var o = (e - i.time) / (r.time - i.time);
        return i.ease(o, r)
    }, q.prototype.addKey = function (e) {
        void 0 === e.time ? m("key time undefined, ignoring!") : (this.keys.push(e), null !== this.onChange && this.onChange())
    }, q.prototype.easingFromString = function (e) {
        return "linear" == e ? D.ANIM.EASING_LINEAR : "absolute" == e ? D.ANIM.EASING_ABSOLUTE : "smoothstep" == e ? D.ANIM.EASING_SMOOTHSTEP : "smootherstep" == e ? D.ANIM.EASING_SMOOTHERSTEP : "Cubic In" == e ? D.ANIM.EASING_CUBIC_IN : "Cubic Out" == e ? D.ANIM.EASING_CUBIC_OUT : "Cubic In Out" == e ? D.ANIM.EASING_CUBIC_INOUT : "Expo In" == e ? D.ANIM.EASING_EXPO_IN : "Expo Out" == e ? D.ANIM.EASING_EXPO_OUT : "Expo In Out" == e ? D.ANIM.EASING_EXPO_INOUT : "Sin In" == e ? D.ANIM.EASING_SIN_IN : "Sin Out" == e ? D.ANIM.EASING_SIN_OUT : "Sin In Out" == e ? D.ANIM.EASING_SIN_INOUT : "Back In" == e ? D.ANIM.EASING_BACK_IN : "Back Out" == e ? D.ANIM.EASING_BACK_OUT : "Back In Out" == e ? D.ANIM.EASING_BACK_INOUT : "Elastic In" == e ? D.ANIM.EASING_ELASTIC_IN : "Elastic Out" == e ? D.ANIM.EASING_ELASTIC_OUT : "Bounce In" == e ? D.ANIM.EASING_BOUNCE_IN : "Bounce Out" == e ? D.ANIM.EASING_BOUNCE_OUT : "Quart Out" == e ? D.ANIM.EASING_QUART_OUT : "Quart In" == e ? D.ANIM.EASING_QUART_IN : "Quart In Out" == e ? D.ANIM.EASING_QUART_INOUT : "Quint Out" == e ? D.ANIM.EASING_QUINT_OUT : "Quint In" == e ? D.ANIM.EASING_QUINT_IN : "Quint In Out" == e ? D.ANIM.EASING_QUINT_INOUT : void 0
    }, q.prototype.createPort = function (e, t, n) {
        var a = e.addInPort(new U(e, t, D.OP.OP_PORT_TYPE_VALUE, {
            display: "dropdown",
            values: D.ANIM.EASINGS
        }));
        return a.set("linear"), a.defaultValue = "linear", a.onChange = function () {
            this.defaultEasing = this.easingFromString(a.get()), n && n()
        }.bind(this), a
    }, q.slerpQuaternion = function (e, t, n, a, i, r) {
        q.slerpQuaternion.q1 || (q.slerpQuaternion.q1 = quat.create(), q.slerpQuaternion.q2 = quat.create());
        var o = n.getKeyIndex(e),
            s = o + 1;
        if (s >= n.keys.length && (s = n.keys.length - 1), o == s) quat.set(t, n.keys[o].value, a.keys[o].value, i.keys[o].value, r.keys[o].value);
        else {
            var l = n.keys[o].time,
                u = (e - l) / (n.keys[s].time - l);
            quat.set(q.slerpQuaternion.q1, n.keys[o].value, a.keys[o].value, i.keys[o].value, r.keys[o].value), quat.set(q.slerpQuaternion.q2, n.keys[s].value, a.keys[s].value, i.keys[s].value, r.keys[s].value), quat.slerp(t, q.slerpQuaternion.q1, q.slerpQuaternion.q2, u)
        }
        return t
    };
    const K = V;
    K.Anim = q;
    const Q = function (e) {
        this.id = CABLES.uuid(), this.portIn = null, this.portOut = null, this.scene = e, this.activityCounter = 0
    };
    Q.prototype.setValue = function (e) {
        void 0 === e ? this._setValue() : this.portIn.set(e)
    }, Q.prototype.activity = function () {
        this.activityCounter++
    }, Q.prototype._setValue = function () {
        if (this.portOut) {
            var e = this.portOut.get();
            e == e && (this.portIn.type != D.OP.OP_PORT_TYPE_FUNCTION && this.activity(), this.portIn.get() !== e ? this.portIn.set(e) : this.portIn.changeAlways && this.portIn.set(e))
        } else this.remove()
    }, Q.prototype.getOtherPort = function (e) {
        return e == this.portIn ? this.portOut : this.portIn
    }, Q.prototype.remove = function () {
        this.portIn && this.portIn.removeLink(this), this.portOut && this.portOut.removeLink(this), this.scene && this.scene.emitEvent("onUnLink", this.portIn, this.portOut, this), this.portIn && this.portIn.type == D.OP.OP_PORT_TYPE_OBJECT && (this.portIn.set(null), this.portIn.links.length > 0 && this.portIn.set(this.portIn.links[0].getOtherPort(this.portIn).get())), this.portIn && this.portIn.parent._checkLinksNeededToWork(), this.portOut && this.portOut.parent._checkLinksNeededToWork(), this.portIn = null, this.portOut = null, this.scene = null
    }, Q.prototype.link = function (e, t) {
        if (!Q.canLink(e, t)) return m("cannot link ports!"), !1;
        e.direction == D.PORT.PORT_DIR_IN ? (this.portIn = e, this.portOut = t) : (this.portIn = t, this.portOut = e), e.addLink(this), t.addLink(this), this.setValue(), e.onLink && e.onLink(this), t.onLink && t.onLink(this), e.parent._checkLinksNeededToWork(), t.parent._checkLinksNeededToWork()
    }, Q.prototype.getSerialized = function () {
        var e = {};
        return e.portIn = this.portIn.getName(), e.portOut = this.portOut.getName(), e.objIn = this.portIn.parent.id, e.objOut = this.portOut.parent.id, e
    }, Q.canLinkText = function (e, t) {
        if (e.direction == t.direction) {
            var n = "(out)";
            return t.direction == D.PORT.PORT_DIR_IN && (n = "(in)"), "can not link: same direction " + n
        }
        return e.parent == t.parent ? "can not link: same op" : e.type != D.OP.OP_PORT_TYPE_DYNAMIC && t.type != D.OP.OP_PORT_TYPE_DYNAMIC && e.type != t.type ? "can not link: different type" : e ? t ? e.direction == D.PORT.PORT_DIR_IN && e.isAnimated() ? "can not link: is animated" : t.direction == D.PORT.PORT_DIR_IN && t.isAnimated() ? "can not link: is animated" : e.isLinkedTo(t) ? "ports already linked" : e.canLink && !e.canLink(t) || t.canLink && !t.canLink(e) ? "Incompatible" : "can link" : "can not link: port 2 invalid" : "can not link: port 1 invalid"
    }, Q.canLink = function (e, t) {
        return !(!e || !t || e.direction == D.PORT.PORT_DIR_IN && e.isAnimated() || t.direction == D.PORT.PORT_DIR_IN && t.isAnimated() || e.isHidden() || t.isHidden() || e.isLinkedTo(t) || e.direction == t.direction || e.type != t.type && e.type != D.OP.OP_PORT_TYPE_DYNAMIC && t.type != D.OP.OP_PORT_TYPE_DYNAMIC || e.type != D.OP.OP_PORT_TYPE_DYNAMIC && t.type != D.OP.OP_PORT_TYPE_DYNAMIC && (e.parent == t.parent || e.canLink && !e.canLink(t) || t.canLink && !t.canLink(e)))
    };
    const Z = function () {
        if (this.data = {}, this.objName = "", this.portsOut = [], this.portsIn = [], this.portsInData = [], this.opId = "", this.uiAttribs = {}, this.enabled = !0, this.patch = arguments[0], this.name = arguments[1], this.errors = {}, this._needsLinkedToWork = [], this._needsParentOp = null, this._shortOpName = "", arguments[1]) {
            if (this._shortOpName = arguments[1].split(".")[arguments[1].split(".").length - 1], this._shortOpName.indexOf(D.OP.OP_VERSION_PREFIX) > 0) {
                var e = this._shortOpName.split(D.OP.OP_VERSION_PREFIX)[1];
                this._shortOpName = this._shortOpName.substring(0, this._shortOpName.length - (D.OP.OP_VERSION_PREFIX + e).length)
            }
            this.uiAttribs.title = this._shortOpName
        }
        this.id = arguments[2] || y(), this.onAddPort = null, this.onCreate = null, this.onResize = null, this.onLoaded = null, this.onDelete = null, this.onUiAttrChange = null, this._eventCallbacks = {}, this._instances = null, this.preRender = null, this.init = null
    }; {
        Z.prototype.clearUiAttrib = function (e) {
            this.uiAttrib({
                name: null
            })
        }, Z.prototype.setTitle = function (e) {
            var t = this.name != e;
            this.name = e, this.uiAttr({
                title: e
            }), t && this.fireEvent("onTitleChange", e)
        };
        const e = function (e) {
            for (var t in this.uiAttribs || (this.uiAttribs = {}), e) this.uiAttribs[t] = e[t];
            this.fireEvent("onUiAttribsChange", e)
        };
        Z.prototype.setUiAttrib = e, Z.prototype.uiAttr = e, Z.prototype.getName = function () {
            return this.uiAttribs.name ? this.uiAttribs.name : this.objName.split(".")
        }, Z.prototype.addOutPort = function (e) {
            return e.direction = D.PORT.PORT_DIR_OUT, e.parent = this, this.portsOut.push(e), this.onAddPort && this.onAddPort(e), e
        }, Z.prototype.hasPort = function (e) {
            for (var t = 0; t < this.portsIn.length; t++)
                if (this.portsIn[i].getName() == e) return !0;
            return !1
        }, Z.prototype.hasDynamicPort = function () {
            var e = 0;
            for (e = 0; e < this.portsIn.length; e++) {
                if (this.portsIn[e].type == D.OP.OP_PORT_TYPE_DYNAMIC) return !0;
                if ("dyn" == this.portsIn[e].getName()) return !0
            }
            for (e = 0; e < this.portsOut.length; e++) {
                if (this.portsOut[e].type == D.OP.OP_PORT_TYPE_DYNAMIC) return !0;
                if ("dyn" == this.portsOut[e].getName()) return !0
            }
            return !1
        }, Z.prototype.addInPort = function (e) {
            if (!(e instanceof U)) throw new Error("parameter is not a port!");
            return e.direction = D.PORT.PORT_DIR_IN, e.parent = this, this.portsIn.push(e), this.onAddPort && this.onAddPort(e), e
        }, Z.prototype.inFunction = Z.prototype.inTrigger = function (e, t) {
            var n = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_FUNCTION));
            return void 0 !== t && n.set(t), n
        }, Z.prototype.inFunctionButton = Z.prototype.inTriggerButton = function (e, t) {
            var n = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_FUNCTION, {
                display: "button"
            }));
            return void 0 !== t && n.set(t), n
        }, Z.prototype.inValueFloat = Z.prototype.inValue = Z.prototype.inFloat = function (e, t) {
            var n = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_VALUE));
            return void 0 !== t && (n.set(t), n.defaultValue = t), n
        }, Z.prototype.inValueBool = Z.prototype.inBool = function (e, t) {
            var n = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_VALUE, {
                display: "bool"
            }));
            return void 0 !== t && (n.set(t), n.defaultValue = t), n
        }, Z.prototype.inValueString = function (e, t) {
            var n = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_VALUE, {
                type: "string"
            }));
            return n.value = "", void 0 !== t && (n.set(t), n.defaultValue = t), n
        }, Z.prototype.inString = function (e, t) {
            var n = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_STRING, {
                type: "string"
            }));
            return t = t || "", n.value = t, n.set(t), n.defaultValue = t, n
        }, Z.prototype.inValueText = function (e, t) {
            var n = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_VALUE, {
                type: "string",
                display: "text"
            }));
            return n.value = "", void 0 !== t && (n.set(t), n.defaultValue = t), n
        }, Z.prototype.inStringEditor = function (e, t, n) {
            var a = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_STRING, {
                type: "string",
                display: "editor",
                editorSyntax: n
            }));
            return a.value = "", void 0 !== t && (a.set(t), a.defaultValue = t), a
        }, Z.prototype.inValueEditor = function (e, t, n) {
            var a = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_VALUE, {
                type: "string",
                display: "editor",
                editorSyntax: n
            }));
            return a.value = "", void 0 !== t && (a.set(t), a.defaultValue = t), a
        }, Z.prototype.inValueSelect = Z.prototype.inDropDown = function (e, t, n) {
            var a = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_VALUE, {
                display: "dropdown",
                hidePort: !0,
                values: t
            }));
            return void 0 !== n && (a.set(n), a.defaultValue = n), a
        }, Z.prototype.inSwitch = function (e, t, n) {
            var a = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_STRING, {
                display: "switch",
                hidePort: !0,
                type: "string",
                values: t
            }));
            return void 0 !== n && (a.set(n), a.defaultValue = n), a
        }, Z.prototype.inValueInt = Z.prototype.inInt = function (e, t) {
            var n = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_VALUE, {
                increment: "integer"
            }));
            return void 0 !== t && (n.set(t), n.defaultValue = t), n
        }, Z.prototype.inFile = function (e, t, n) {
            var a = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_VALUE, {
                display: "file",
                filter: t
            }));
            return void 0 !== n && (a.set(n), a.defaultValue = n), a
        }, Z.prototype.inUrl = function (e, t, n) {
            var a = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_STRING, {
                display: "file",
                filter: t
            }));
            return void 0 !== n && (a.set(n), a.defaultValue = n), a
        }, Z.prototype.inTexture = function (e, t) {
            var n = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_OBJECT, {
                display: "texture",
                preview: !0
            }));
            return void 0 !== t && n.set(t), n
        }, Z.prototype.inObject = function (e, t, n) {
            var a = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_OBJECT, n));
            return void 0 !== t && a.set(t), a
        }, Z.prototype.inGradient = function (e, t) {
            var n = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_VALUE, {
                display: "gradient",
                hidePort: !0
            }));
            return void 0 !== t && n.set(t), n
        }, Z.prototype.inArray = function (e, t) {
            var n = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_ARRAY));
            return void 0 !== t && n.set(t), n
        }, Z.prototype.inValueSlider = Z.prototype.inFloatSlider = function (e, t) {
            var n = this.addInPort(new U(this, e, D.OP.OP_PORT_TYPE_VALUE, {
                display: "range"
            }));
            return void 0 !== t && (n.set(t), n.defaultValue = t), n
        }, Z.prototype.outFunction = Z.prototype.outTrigger = function (e, t) {
            var n = this.addOutPort(new U(this, e, D.OP.OP_PORT_TYPE_FUNCTION));
            return void 0 !== t && n.set(t), n
        }, Z.prototype.outValue = Z.prototype.outNumber = function (e, t) {
            var n = this.addOutPort(new U(this, e, D.OP.OP_PORT_TYPE_VALUE));
            return void 0 !== t && n.set(t), n
        }, Z.prototype.outValueBool = Z.prototype.outBool = function (e, t) {
            var n = this.addOutPort(new U(this, e, D.OP.OP_PORT_TYPE_VALUE, {
                display: "bool"
            }));
            return void 0 !== t ? n.set(t) : n.set(!1), n
        }, Z.prototype.outValueString = function (e, t) {
            var n = this.addOutPort(new U(this, e, D.OP.OP_PORT_TYPE_VALUE, {
                type: "string"
            }));
            return void 0 !== t && n.set(t), n
        }, Z.prototype.outString = function (e, t) {
            var n = this.addOutPort(new U(this, e, D.OP.OP_PORT_TYPE_STRING, {
                type: "string"
            }));
            return void 0 !== t ? n.set(t) : n.set(""), n
        }, Z.prototype.outObject = function (e, t) {
            var n = this.addOutPort(new U(this, e, D.OP.OP_PORT_TYPE_OBJECT));
            return void 0 !== t && n.set(t), n.ignoreValueSerialize = !0, n
        }, Z.prototype.outArray = function (e, t) {
            var n = this.addOutPort(new U(this, e, D.OP.OP_PORT_TYPE_ARRAY));
            return void 0 !== t && n.set(t), n.ignoreValueSerialize = !0, n
        }, Z.prototype.outTexture = function (e, t) {
            var n = this.addOutPort(new U(this, e, D.OP.OP_PORT_TYPE_OBJECT, {
                preview: !0
            }));
            return void 0 !== t && n.set(t), n.ignoreValueSerialize = !0, n
        }, Z.prototype.inDynamic = function (e, t, n, a) {
            var i = new U(this, e, D.OP.OP_PORT_TYPE_DYNAMIC, n);
            return i.shouldLink = function (e, n) {
                if (t && O.isArray(t)) {
                    for (var a = 0; a < t.length; a++) {
                        if (e == this && n.type === t[a]) return !0;
                        if (n == this && e.type === t[a]) return !0
                    }
                    return !1
                }
                return !0
            }, this.addInPort(i), void 0 !== a && (i.set(a), i.defaultValue = a), i
        }, Z.prototype.printInfo = function () {
            for (var e = 0; e < this.portsIn.length; e++) m("in: " + this.portsIn[e].getName());
            for (var t in this.portsOut) m("out: " + this.portsOut[t].getName())
        }, Z.prototype.getOutChilds = function () {
            var e = [];
            for (var t in this.portsOut)
                for (var n in this.portsOut[t].links) this.portsOut[t].type == D.OP.OP_PORT_TYPE_FUNCTION && e.push(this.portsOut[t].links[n].portIn.parent);
            return e
        }, Z.prototype.markChilds = function () {
            for (var e in this.marked = !0, this.portsOut)
                for (var t in this.portsOut[e].links) this.portsOut[e].parent.marked = !0, this.portsOut[e].links[t].portIn.parent != this && this.portsOut[e].links[t].portIn.parent.markChilds()
        }, Z.prototype.deleteChilds = function () {
            var e = [];
            for (var t in this.portsOut)
                for (var n in this.portsOut[t].links) this.portsOut[t].links[n].portIn.parent != this && (this.portsOut[t].parent != this && e.push(this.portsOut[t].parent), e.push(this.portsOut[t].links[n].portIn.parent), this.portsOut[t].links[n].portIn.parent.deleteChilds());
            for (var a in e) this.patch.deleteOp(e[a].id)
        }, Z.prototype.removeLinks = function () {
            for (var e = 0; e < this.portsIn.length; e++) this.portsIn[e].removeLinks();
            for (var t = 0; t < this.portsOut.length; t++) this.portsOut[t].removeLinks()
        }, Z.prototype.countFittingPorts = function (e) {
            var t = 0;
            for (var n in this.portsOut) Q.canLink(e, this.portsOut[n]) && t++;
            for (var a in this.portsIn) Q.canLink(e, this.portsIn[a]) && t++;
            return t
        }, Z.prototype.findFittingPort = function (e) {
            for (var t in this.portsOut)
                if (Q.canLink(e, this.portsOut[t])) return this.portsOut[t];
            for (var n in this.portsIn)
                if (Q.canLink(e, this.portsIn[n])) return this.portsIn[n]
        }, Z.prototype.getSerialized = function () {
            var e = {};
            this.opId && (e.opId = this.opId), e.objName = this.objName, e.id = this.id, e.uiAttribs = this.uiAttribs, this.uiAttribs.title == this._shortOpName && delete this.uiAttribs.title, this.uiAttribs.hasOwnProperty("working") && 1 == this.uiAttribs.working && delete this.uiAttribs.working, e.portsIn = [], e.portsOut = [];
            for (var t = 0; t < this.portsIn.length; t++) e.portsIn.push(this.portsIn[t].getSerialized());
            for (var n in this.portsOut) e.portsOut.push(this.portsOut[n].getSerialized());
            return e
        }, Z.prototype.getFirstOutPortByType = function (e) {
            for (var t in this.portsOut)
                if (this.portsOut[t].type == e) return this.portsOut[t]
        }, Z.prototype.getPort = Z.prototype.getPortByName = function (e) {
            for (var t = 0; t < this.portsIn.length; t++)
                if (this.portsIn[t].getName() == e) return this.portsIn[t];
            for (var n = 0; n < this.portsOut.length; n++)
                if (this.portsOut[n].getName() == e) return this.portsOut[n]
        }, Z.prototype.getPortById = function (e) {
            for (var t = 0; t < this.portsIn.length; t++)
                if (this.portsIn[t].id == e) return this.portsIn[t];
            for (var n = 0; n < this.portsOut.length; n++)
                if (this.portsOut[n].id == e) return this.portsOut[n]
        }, Z.prototype.updateAnims = function () {
            for (var e = 0; e < this.portsIn.length; e++) this.portsIn[e].updateAnim()
        }, Z.prototype.log = function () {
            if (!this.patch.silent) {
                var e = ["[op " + this._shortOpName + "]"];
                e.push.apply(e, arguments), Function.prototype.apply.apply(console.log, [console, e])
            }
        }, Z.prototype.error = function () {
            if (!this.patch.silent) {
                var e = ["[op " + this._shortOpName + "]"];
                e.push.apply(e, arguments), Function.prototype.apply.apply(console.error, [console, e])
            }
        }, Z.prototype.warn = function () {
            if (!this.patch.silent) {
                var e = ["[op " + this._shortOpName + "]"];
                e.push.apply(e, arguments), Function.prototype.apply.apply(console.warn, [console, e])
            }
        }, Z.prototype.undoUnLinkTemporary = function () {
            if (this.shakeLink && this.shakeLink.remove(), this.shakeLink = null, this.oldLinks) {
                for (var e = 0; e < this.oldLinks.length; e++) this.patch.link(this.oldLinks[e].in.parent, this.oldLinks[e].in.getName(), this.oldLinks[e].out.parent, this.oldLinks[e].out.getName());
                this.oldLinks.length = 0
            }
        }, Z.prototype.unLink = function () {
            for (var e = 0; e < this.portsOut.length; e++) this.portsOut[e].removeLinks();
            for (var t = 0; t < this.portsIn.length; t++) this.portsIn[t].removeLinks()
        }, Z.unLinkTempReLinkP1 = null, Z.unLinkTempReLinkP2 = null, Z.prototype.unLinkTemporary = function () {
            var e = 0;
            this.shakeLink = null, this.oldLinks = [], this.portsIn.length > 0 && this.portsIn[0].isLinked() && this.portsOut.length > 0 && this.portsOut[0].isLinked() && this.portsIn[0].getType() == this.portsOut[0].getType() && (Z.unLinkTempReLinkP1 = this.portsIn[0].links[0].getOtherPort(this.portsIn[0]), Z.unLinkTempReLinkP2 = this.portsOut[0].links[0].getOtherPort(this.portsOut[0]));
            for (var t = 0; t < this.portsIn.length; t++)
                for (e = 0; e < this.portsIn[t].links.length; e++) this.oldLinks.push({
                    in: this.portsIn[t].links[e].portIn,
                    out: this.portsIn[t].links[e].portOut
                });
            for (var n = 0; n < this.portsOut.length; n++)
                for (e = 0; e < this.portsOut[n].links.length; e++) this.oldLinks.push({
                    in: this.portsOut[n].links[e].portIn,
                    out: this.portsOut[n].links[e].portOut
                });
            this.unLink(), Z.unLinkTempReLinkP1 && Z.unLinkTempReLinkP2 && (this.shakeLink = this.patch.link(Z.unLinkTempReLinkP1.parent, Z.unLinkTempReLinkP1.getName(), Z.unLinkTempReLinkP2.parent, Z.unLinkTempReLinkP2.getName()))
        }, Z.prototype.profile = function (e) {
            for (var t = 0; t < this.portsIn.length; t++) this.portsIn[t]._onTriggered = this.portsIn[t]._onTriggeredProfiling
        }, Z.prototype.findParent = function (e) {
            for (var t = 0; t < this.portsIn.length; t++)
                if (this.portsIn[t].isLinked()) {
                    if (this.portsIn[t].links[0].portOut.parent.objName == e) return this.portsIn[t].links[0].portOut.parent;
                    var n;
                    if (n = this.portsIn[t].links[0].portOut.parent.findParent(e)) return n
                } return null
        }, Z.prototype.cleanUp = function () {
            if (this._instances) {
                for (var e = 0; e < this._instances.length; e++) this._instances[e].onDelete && this._instances[e].onDelete();
                this._instances.length = 0
            }
        }, Z.prototype.instanced = function (e) {
            if (0 === this.patch.instancing.numCycles()) return !1;
            var t = 0,
                n = 0;
            if (!this._instances || this._instances.length != this.patch.instancing.numCycles()) {
                for (this._instances || (this._instances = []), m("creating instances of ", this.objName, this.patch.instancing.numCycles(), this._instances.length), this._instances.length = this.patch.instancing.numCycles(), t = 0; t < this._instances.length; t++) {
                    this._instances[t] = this.patch.createOp(this.objName, !0), this._instances[t].instanced = function () {
                        return !1
                    }, this._instances[t].uiAttr(this.uiAttribs);
                    for (var a = 0; a < this.portsOut.length; a++) this.portsOut[a].type == D.OP.OP_PORT_TYPE_FUNCTION && (this._instances[t].getPortByName(this.portsOut[a].name).trigger = this.portsOut[a].trigger.bind(this.portsOut[a]))
                }
                for (n = 0; n < this.portsIn.length; n++) this.portsIn[n].onChange = null, this.portsIn[n].onValueChanged = null
            }
            for (n = 0; n < this.portsIn.length; n++) this.portsIn[n].type != D.OP.OP_PORT_TYPE_VALUE && this.portsIn[n].type != D.OP.OP_PORT_TYPE_ARRAY || this._instances[this.patch.instancing.index()].portsIn[n].set(this.portsIn[n].get()), this.portsIn[n].type, D.OP.OP_PORT_TYPE_FUNCTION;
            for (n = 0; n < this.portsOut.length; n++) this.portsOut[n].type == D.OP.OP_PORT_TYPE_VALUE && this.portsOut[n].set(this._instances[this.patch.instancing.index()].portsOut[n].get());
            return !0
        }, Z.prototype.initInstancable = function () {}, Z.prototype.setValues = function (e) {
            for (var t in e) {
                var n = this.getPortByName(t);
                n ? n.set(e[t]) : m("op.setValues: port not found:", t)
            }
        }, Z.prototype.error = function (e, t) {
            this.errors[e] = t, null == t && delete this.errors[e];
            var n = "";
            for (var a in this.errors) n += "- " + this.errors[a] + "<br/>";
            this.uiAttr({
                error: n
            })
        }, Z.prototype.addListener = Z.prototype.addEventListener = function (e, t) {
            this._eventCallbacks[e] ? this._eventCallbacks[e].push(t) : this._eventCallbacks[e] = [t]
        }, Z.prototype.hasEventListener = function (e, t) {
            if (e && t) {
                if (this._eventCallbacks[e]) return -1 != this._eventCallbacks[e].indexOf(t)
            } else m("hasListener: missing parameters")
        }, Z.prototype.removeEventListener = function (e, t) {
            if (this._eventCallbacks[e]) {
                var n = this._eventCallbacks[e].indexOf(t); - 1 == n ? m("eventlistener " + e + " not found...") : this._eventCallbacks[e].slice(n)
            }
        }, Z.prototype.fireEvent = function (e, t) {
            if (this._eventCallbacks[e])
                for (var n = 0; n < this._eventCallbacks[e].length; n++) this._eventCallbacks[e][n] && this._eventCallbacks[e][n](t);
            this.onUiAttrChange && "onUiAttribsChange" == e && this.onUiAttrChange(t)
        }, Z.prototype.setEnabled = function (e) {
            this.enabled = e, this.fireEvent("onEnabledChange", e)
        }, Z.prototype.setPortGroup = function (e, t) {
            for (var n = 0; n < t.length; n++) t[n] && t[n].setUiAttribs ? t[n].setUiAttribs({
                group: e
            }) : console.error("setPortGroup: invalid port!")
        }, Z.prototype.setUiAxisPorts = function (e, t, n) {
            e && e.setUiAttribs({
                axis: "X"
            }), t && t.setUiAttribs({
                axis: "Y"
            }), n && n.setUiAttribs({
                axis: "Z"
            })
        }, Z.prototype.removePort = function (e) {
            for (var t = 0; t < this.portsIn.length; t++)
                if (this.portsIn[t] == e) return this.portsIn.splice(t, 1), this.fireEvent("onUiAttribsChange", {}), void this.fireEvent("onPortRemoved", {})
        }, Z.prototype.checkLinkTimeWarnings = function () {
            function e(t, n, a) {
                for (var i = 0; i < t.portsIn.length; i++)
                    if (t.portsIn[i].type == n && t.portsIn[i].isLinked())
                        for (var r = t.portsIn[i], o = 0; o < r.links.length; o++)
                            if (r.links[o]) {
                                if (r.links[o].portOut.parent.objName.indexOf(a) > -1) return !0;
                                if (e(r.links[o].portOut.parent, n, a)) return !0
                            } return !1
            }
            var t, n = null,
                a = !0;
            if (a && 0 == this.objName.indexOf("Ops.Gl.TextureEffects") && (t = this).portsIn.length > 0 && t.portsIn[0].type == D.OP.OP_PORT_TYPE_FUNCTION && -1 == this.objName.indexOf("TextureEffects.ImageCompose") && ((a = e(this, D.OP.OP_PORT_TYPE_FUNCTION, "TextureEffects.ImageCompose")) || (n = CABLES.UI.TEXTS.working_connected_to + "ImageCompose")), this._needsParentOp && a && ((a = e(this, D.OP.OP_PORT_TYPE_OBJECT, this._needsParentOp)) || (n = CABLES.UI.TEXTS.working_connected_to + this._needsParentOp)), this._needsLinkedToWork.length > 0)
                for (var i = 0; i < this._needsLinkedToWork.length; i++) {
                    var r = this._needsLinkedToWork[i];
                    r ? r.isLinked() || (a = !1, n ? n += ", " : n = CABLES.UI.TEXTS.working_connected_needs_connections_to, n += r.name.toUpperCase()) : console.warn("[needsLinkedToWork] port not found")
                }
            a ? this.uiAttribs.working || this.setUiAttrib({
                working: !0,
                notWorkingMsg: null
            }) : this.setUiAttrib({
                working: a,
                notWorkingMsg: n
            })
        }, Z.prototype._checkLinksNeededToWork = function () {}, Z.prototype.toWorkNeedsParent = function (e) {
            this.patch.isEditorMode() && (this._needsParentOp = e)
        }, Z.prototype.toWorkPortsNeedToBeLinked = function () {
            if (this.patch.isEditorMode())
                for (var e = 0; e < arguments.length; e++) - 1 == this._needsLinkedToWork.indexOf(arguments[e]) && this._needsLinkedToWork.push(arguments[e])
        }, Z.prototype.toWorkPortsNeedToBeLinkedReset = function () {
            this.patch.isEditorMode() && (this._needsLinkedToWork.length = 0, this.checkLinkTimeWarnings())
        }, Z.prototype.refreshParams = function () {
            CABLES.UI && gui && gui.patch().refreshOpParams(this)
        }
    }
    Z.getNamespaceClassName = function (e) {
        return e ? e.startsWith("Ops.Gl") ? "gl" : e.startsWith("Ops.WebAudio") ? "audio" : e.startsWith("Ops.Devices") ? "devices" : e.startsWith("Ops.Html") ? "html" : e.startsWith("Ops.Sidebar") ? "html" : e.startsWith("Ops.Math") ? "math" : e.startsWith("Ops.User") ? "user" : "default" : "default"
    }, Z.isSubpatchOp = function (e) {
        return "Ops.Ui.Patch" == e || "Ops.Ui.SubPatch" == e
    };
    const J = new function () {
        this.profileUniformCount = 0, this.profileShaderBinds = 0, this.profileUniformCount = 0, this.profileShaderCompiles = 0, this.profileVideosPlaying = 0, this.profileMVPMatrixCount = 0, this.profileEffectBuffercreate = 0
    };
    var $ = null,
        ee = null,
        te = null,
        ne = null;
    const ae = function (e, t) {
        if (!e) throw "no cgl";
        this._cgl = e, this.tex = this._cgl.gl.createTexture(), this.id = y(), this.width = 0, this.height = 0, this.flip = !0, this.shadowMap = !1, this.filter = ae.FILTER_NEAREST, this.wrap = ae.WRAP_CLAMP_TO_EDGE, this.texTarget = this._cgl.gl.TEXTURE_2D, t && t.type && (this.texTarget = t.type), this.textureType = ae.TYPE_DEFAULT, this.unpackAlpha = !0, this._fromData = !0, this.name = "unknown", t ? (this.name = t.name || this.name, t.isDepthTexture && (this.textureType = ae.TYPE_DEPTH), t.isFloatingPointTexture && (this.textureType = ae.TYPE_FLOAT), "textureType" in t && (this.textureType = t.textureType), "filter" in t && (this.filter = t.filter), "wrap" in t && (this.wrap = t.wrap), "unpackAlpha" in t && (this.unpackAlpha = t.unpackAlpha), "flip" in t && (this.flip = t.flip), "shadowMap" in t && (this.shadowMap = t.shadowMap)) : t = {
            width: 8,
            height: 8
        }, this.setSize(t.width, t.height)
    };
    ae.prototype.compareSettings = function (e) {
        return !!e && e.width == this.width && e.height == this.height && e.filter == this.filter && e.wrap == this.wrap && e.textureType == this.textureType && e.unpackAlpha == this.unpackAlpha && e.flip == this.flip
    }, ae.prototype.clone = function () {
        var e = new ae(this._cgl, {
            name: this.name,
            filter: this.filter,
            wrap: this.wrap,
            textureType: this.textureType,
            unpackAlpha: this.unpackAlpha,
            flip: this.flip,
            width: this.width,
            height: this.height
        });
        return this.compareSettings(e) || (console.error("Cloned texture settings do not compare!"), m(this), m(e)), e
    }, ae.prototype.setSize = function (e, t) {
        if ((e != e || e <= 0 || !e) && (e = 8), (t != t || t <= 0 || !t) && (t = 8), e = Math.floor(e), t = Math.floor(t), this.width != e || this.height != t) {
            if (this.width = e, this.height = t, this._cgl.gl.bindTexture(this.texTarget, this.tex), J.profileTextureResize++, this.textureType == ae.TYPE_FLOAT && (this.filter = ae.FILTER_NEAREST), this._setFilter(), this.textureType == ae.TYPE_FLOAT)
                if (1 == this._cgl.glVersion)
                    if (this._cgl.glUseHalfFloatTex) {
                        var n = this._cgl.gl.getExtension("OES_texture_half_float");
                        if (1 == this._cgl.glVersion && !n) throw "no half float texture extension";
                        this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA, e, t, 0, this._cgl.gl.RGBA, n.HALF_FLOAT_OES, null)
                    } else n = this._cgl.gl.getExtension("OES_texture_float"), this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA, e, t, 0, this._cgl.gl.RGBA, this._cgl.gl.FLOAT, null);
            else this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA32F, e, t, 0, this._cgl.gl.RGBA, this._cgl.gl.FLOAT, null);
            else if (this.textureType == ae.TYPE_DEPTH)
                if (1 == this._cgl.glVersion) {
                    var a = this._cgl.gl.DEPTH_COMPONENT;
                    this._cgl.gl.texImage2D(this.texTarget, 0, a, e, t, 0, this._cgl.gl.DEPTH_COMPONENT, this._cgl.gl.UNSIGNED_SHORT, null)
                } else a = this._cgl.gl.DEPTH_COMPONENT32F, this._cgl.gl.texImage2D(this.texTarget, 0, a, e, t, 0, this._cgl.gl.DEPTH_COMPONENT, this._cgl.gl.FLOAT, null);
            else this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA, e, t, 0, this._cgl.gl.RGBA, this._cgl.gl.UNSIGNED_BYTE, null);
            this.updateMipMap(), this._cgl.gl.bindTexture(this.texTarget, null)
        }
    }, ae.prototype.initFromData = function (e, t, n, a, i) {
        this.filter = a, this.wrap = i, null == a && (this.filter = ae.FILTER_LINEAR), null == i && (this.wrap = ae.CLAMP_TO_EDGE), this.width = t, this.height = n, this._fromData = !0, this._cgl.gl.bindTexture(this.texTarget, this.tex), this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA, t, n, 0, this._cgl.gl.RGBA, this._cgl.gl.UNSIGNED_BYTE, e), this._setFilter(), this.updateMipMap(), this._cgl.gl.bindTexture(this.texTarget, null)
    }, ae.prototype.updateMipMap = function () {
        2 != this._cgl.glVersion && !this.isPowerOfTwo() || this.filter != ae.FILTER_MIPMAP || this._cgl.gl.generateMipmap(this.texTarget)
    }, ae.prototype.initTexture = function (e, t) {
        this._fromData = !1, this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.unpackAlpha), e.width && (this.width = e.width), e.height && (this.height = e.height), t && (this.filter = t), this._cgl.gl.bindTexture(this.texTarget, this.tex), this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_FLIP_Y_WEBGL, !this.flip), this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA, this._cgl.gl.RGBA, this._cgl.gl.UNSIGNED_BYTE, e), this._setFilter(), this.updateMipMap(), this._cgl.gl.bindTexture(this.texTarget, null), this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1)
    }, ae.prototype.delete = function () {
        J.profileTextureDelete++, this._cgl.gl.deleteTexture(this.tex)
    }, ae.prototype.isPowerOfTwo = function () {
        return ae.isPowerOfTwo(this.width) && ae.isPowerOfTwo(this.height)
    }, ae.prototype.printInfo = function () {
        m(this.getInfo())
    }, ae.prototype.getInfoReadable = function () {
        var e = this.getInfo(),
            t = "";
        for (var n in e.name = e.name.substr(0, e.name.indexOf("?rnd=")), e) t += "* " + n + ":  **" + e[n] + "**\n";
        return t
    }, ae.prototype.getInfo = function () {
        var e = {};
        e.name = this.name, e["power of two"] = this.isPowerOfTwo(), e.size = this.width + " x " + this.height;
        var t = this.texTarget;
        return this.texTarget == this._cgl.gl.TEXTURE_2D && (t = "TEXTURE_2D"), e.target = t, e.unpackAlpha = this.unpackAlpha, this.textureType == ae.TYPE_FLOAT ? e.textureType = "TYPE_FLOAT" : this.textureType == ae.TYPE_DEPTH ? e.textureType = "TYPE_DEPTH" : this.textureType == ae.TYPE_DEFAULT ? e.textureType = "TYPE_DEFAULT" : e.textureType = "UNKNOWN", this.wrap == ae.WRAP_CLAMP_TO_EDGE ? e.wrap = "CLAMP_TO_EDGE" : this.wrap == ae.WRAP_REPEAT ? e.wrap = "WRAP_REPEAT" : this.wrap == ae.WRAP_MIRRORED_REPEAT ? e.wrap = "WRAP_MIRRORED_REPEAT" : e.wrap = "UNKNOWN", this.filter == ae.FILTER_NEAREST ? e.filter = "FILTER_NEAREST" : this.filter == ae.FILTER_LINEAR ? e.filter = "FILTER_LINEAR" : this.filter == ae.FILTER_MIPMAP ? e.filter = "FILTER_MIPMAP" : e.filter = "UNKNOWN", e
    }, ae.prototype._setFilter = function () {
        if (this._fromData || this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.unpackAlpha), this.shadowMap && (m("shadowmap tex"), this._cgl.gl.texParameteri(this._cgl.gl.TEXTURE_2D, this._cgl.gl.TEXTURE_COMPARE_MODE, this._cgl.gl.COMPARE_REF_TO_TEXTURE), this._cgl.gl.texParameteri(this._cgl.gl.TEXTURE_2D, this._cgl.gl.TEXTURE_COMPARE_FUNC, this._cgl.gl.LEQUAL)), 1 != this._cgl.glVersion || this.isPowerOfTwo())
            if (this.wrap == ae.WRAP_CLAMP_TO_EDGE ? (this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_S, this._cgl.gl.CLAMP_TO_EDGE), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_T, this._cgl.gl.CLAMP_TO_EDGE)) : this.wrap == ae.WRAP_REPEAT ? (this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_S, this._cgl.gl.REPEAT), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_T, this._cgl.gl.REPEAT)) : this.wrap == ae.WRAP_MIRRORED_REPEAT && (this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_S, this._cgl.gl.MIRRORED_REPEAT), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_T, this._cgl.gl.MIRRORED_REPEAT)), this.filter == ae.FILTER_NEAREST) this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MAG_FILTER, this._cgl.gl.NEAREST), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MIN_FILTER, this._cgl.gl.NEAREST);
            else if (this.filter == ae.FILTER_LINEAR) this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MIN_FILTER, this._cgl.gl.LINEAR), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MAG_FILTER, this._cgl.gl.LINEAR);
        else {
            if (this.filter != ae.FILTER_MIPMAP) throw m("unknown texture filter!", this.filter), new Error("unknown texture filter!" + this.filter);
            this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MAG_FILTER, this._cgl.gl.LINEAR), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MIN_FILTER, this._cgl.gl.LINEAR_MIPMAP_LINEAR)
        } else this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MAG_FILTER, this._cgl.gl.NEAREST), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MIN_FILTER, this._cgl.gl.NEAREST), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_S, this._cgl.gl.CLAMP_TO_EDGE), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_T, this._cgl.gl.CLAMP_TO_EDGE), this.filter = ae.FILTER_NEAREST, this.wrap = ae.WRAP_CLAMP_TO_EDGE
    }, ae.load = function (e, t, n, a) {
        var i = e.patch.loading.start("texture", t),
            r = new ae(e);
        return r.name = t, CABLES.UI && gui.jobs().start({
            id: "loadtexture" + i,
            title: "loading texture (" + t + ")"
        }), r.image = new Image, r.image.crossOrigin = "", a && a.hasOwnProperty("filter") && (r.filter = a.filter), a && a.hasOwnProperty("flip") && (r.flip = a.flip), a && a.hasOwnProperty("wrap") && (r.wrap = a.wrap), a && a.hasOwnProperty("unpackAlpha") && (r.unpackAlpha = a.unpackAlpha), r.image.onabort = r.image.onerror = function (t) {
            g("[cgl.texture.load] error loading texture", t), e.patch.loading.finished(i), n && n({
                error: !0
            }), CABLES.UI && gui.jobs().finish("loadtexture" + i)
        }, r.image.onload = function (t) {
            r.initTexture(r.image), e.patch.loading.finished(i), CABLES.UI && gui.jobs().finish("loadtexture" + i), n && n()
        }, r.image.src = t, r
    }, ae.getTempTexture = function (e) {
        return $ || ($ = ae.getTemporaryTexture(e, 256, ae.FILTER_LINEAR, ae.REPEAT)), $
    }, ae.getEmptyTexture = function (e) {
        if (ee) return ee;
        ee = new ae(e);
        var t = new Uint8Array(256);
        return ee.initFromData(t, 8, 8, ae.FILTER_NEAREST, ae.WRAP_REPEAT), ee
    }, ae.getRandomTexture = function (e) {
        if (te) return te;
        const t = new Uint8Array(262144);
        for (var n = 0; n < 65536; n++) t[4 * n + 0] = 255 * Math.random(), t[4 * n + 1] = 255 * Math.random(), t[4 * n + 2] = 255 * Math.random(), t[4 * n + 3] = 255;
        return (te = new ae(e)).initFromData(t, 256, 256, ae.FILTER_NEAREST, ae.WRAP_REPEAT), te
    }, ae.getTempGradientTexture = function (e) {
        if (ne) return ne;
        for (var t = new ae(e), n = new Uint8Array(262144), a = 0; a < 256; a++)
            for (var i = 0; i < 256; i++) n[4 * (i + 256 * a) + 0] = n[4 * (i + 256 * a) + 1] = n[4 * (i + 256 * a) + 2] = 255 - a, n[4 * (i + 256 * a) + 3] = 255;
        return t.initFromData(n, 256, 256, ae.FILTER_NEAREST, ae.WRAP_REPEAT), ne = t, t
    }, ae.getTemporaryTexture = function (e, t, n, a) {
        for (var i = new ae(e), r = [], o = 0; o < t; o++)
            for (var s = 0; s < t; s++)(s + o) % 64 < 32 ? (r.push(200 + o / t * 25 + s / t * 25), r.push(200 + o / t * 25 + s / t * 25), r.push(200 + o / t * 25 + s / t * 25)) : (r.push(40 + o / t * 25 + s / t * 25), r.push(40 + o / t * 25 + s / t * 25), r.push(40 + o / t * 25 + s / t * 25)), r.push(255);
        var l = new Uint8Array(r);
        return i.initFromData(l, t, t, n, a), i
    }, ae.createFromImage = function (e, t, n) {
        var a = new ae(e, n = n || {});
        return a.flip = !1, a.image = t, a.width = t.width, a.height = t.height, a.initTexture(t, n.filter), a
    }, ae.fromImage = function (e, t, n, a) {
        v("deprecated texture from image...");
        var i = new ae(e);
        return i.flip = !1, n && (i.filter = n), a && (i.wrap = a), i.image = t, i.initTexture(t), i
    }, ae.isPowerOfTwo = function (e) {
        return 1 == e || 2 == e || 4 == e || 8 == e || 16 == e || 32 == e || 64 == e || 128 == e || 256 == e || 512 == e || 1024 == e || 2048 == e || 4096 == e || 8192 == e || 16384 == e
    }, ae.FILTER_NEAREST = 0, ae.FILTER_LINEAR = 1, ae.FILTER_MIPMAP = 2, ae.WRAP_REPEAT = 0, ae.WRAP_MIRRORED_REPEAT = 1, ae.WRAP_CLAMP_TO_EDGE = 2, ae.TYPE_DEFAULT = 0, ae.TYPE_DEPTH = 1, ae.TYPE_FLOAT = 2;
    const ie = function (e, t, n, a) {
        this.Framebuffer2DrawTargetsDefault = null, this.Framebuffer2BlittingFramebuffer = null, this.Framebuffer2FinalFramebuffer = null, this._cgl = e, this._width = 0, this._height = 0, this._depthRenderbuffer = null, this._frameBuffer = null, this._textureFrameBuffer = null, this._colorRenderbuffers = [], this._drawTargetArray = [], this.Framebuffer2BlittingFramebuffer || (this.Framebuffer2BlittingFramebuffer = e.gl.createFramebuffer()), this.Framebuffer2FinalFramebuffer || (this.Framebuffer2FinalFramebuffer = e.gl.createFramebuffer()), this.Framebuffer2DrawTargetsDefault || (this.Framebuffer2DrawTargetsDefault = [e.gl.COLOR_ATTACHMENT0]), this._options = a || {
            isFloatingPointTexture: !1
        }, this._options.hasOwnProperty("numRenderBuffers") || (this._options.numRenderBuffers = 1), this._options.hasOwnProperty("depth") || (this._options.depth = !0), this._options.hasOwnProperty("clear") || (this._options.clear = !0), this._options.hasOwnProperty("multisampling") || (this._options.multisampling = !1, this._options.multisamplingSamples = 0), this._options.multisamplingSamples && (this._cgl.gl.MAX_SAMPLES ? this._options.multisamplingSamples = Math.min(this._cgl.gl.getParameter(this._cgl.gl.MAX_SAMPLES), this._options.multisamplingSamples) : this._options.multisamplingSamples = 0), this._options.hasOwnProperty("filter") || (this._options.filter = ae.FILTER_LINEAR), this._numRenderBuffers = this._options.numRenderBuffers, this._colorTextures = [];
        for (var i = 0; i < this._numRenderBuffers; i++) this._colorTextures[i] = new ae(e, {
            name: "framebuffer2 texture " + i,
            isFloatingPointTexture: this._options.isFloatingPointTexture,
            filter: this._options.filter,
            wrap: this._options.wrap
        });
        var r = ae.FILTER_NEAREST;
        this._options.shadowMap && (r = ae.FILTER_LINEAR), this._textureDepth = new ae(e, {
            name: "framebuffer2 depth texture",
            isDepthTexture: !0,
            filter: r,
            shadowMap: this._options.shadowMap || !1
        }), this.setSize(t || 512, n || 512)
    };
    ie.prototype.getWidth = function () {
        return this._width
    }, ie.prototype.getHeight = function () {
        return this._height
    }, ie.prototype.getGlFrameBuffer = function () {
        return this._frameBuffer
    }, ie.prototype.getDepthRenderBuffer = function () {
        return this._depthRenderbuffer
    }, ie.prototype.getTextureColor = function () {
        return this._colorTextures[0]
    }, ie.prototype.getTextureColorNum = function (e) {
        return this._colorTextures[e]
    }, ie.prototype.getTextureDepth = function () {
        return this._textureDepth
    }, ie.prototype.setFilter = function (e) {
        for (var t = 0; t < this._numRenderBuffers; t++) this._colorTextures[t].filter = e, this._colorTextures[t].setSize(this._width, this._height)
    }, ie.prototype.delete = ie.prototype.dispose = function () {
        for (var e = 0; e < this._numRenderBuffers; e++) this._colorTextures[e].delete();
        for (this._textureDepth.delete(), e = 0; e < this._numRenderBuffers; e++) this._cgl.gl.deleteRenderbuffer(this._colorRenderbuffers[e]);
        this._cgl.gl.deleteRenderbuffer(this._depthRenderbuffer), this._cgl.gl.deleteFramebuffer(this._frameBuffer), this._cgl.gl.deleteFramebuffer(this._textureFrameBuffer)
    }, ie.prototype.setSize = function (e, t) {
        if (this._width = Math.floor(e), this._height = Math.floor(t), J.profileFrameBuffercreate++, this._frameBuffer) {
            for (var n = 0; n < this._numRenderBuffers; n++) this._cgl.gl.deleteRenderbuffer(this._colorRenderbuffers[n]);
            this._cgl.gl.deleteRenderbuffer(this._depthRenderbuffer), this._cgl.gl.deleteFramebuffer(this._frameBuffer), this._cgl.gl.deleteFramebuffer(this._textureFrameBuffer)
        }
        this._frameBuffer = this._cgl.gl.createFramebuffer(), this._textureFrameBuffer = this._cgl.gl.createFramebuffer();
        var a = this._options.depth;
        for (n = 0; n < this._numRenderBuffers; n++) this._colorTextures[n].setSize(this._width, this._height);
        for (n = 0; n < this._numRenderBuffers; n++) {
            var i = this._cgl.gl.createRenderbuffer();
            this._cgl.gl.getExtension("EXT_color_buffer_float"), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuffer), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, i), this._options.isFloatingPointTexture ? this._options.multisampling ? this._cgl.gl.renderbufferStorageMultisample(this._cgl.gl.RENDERBUFFER, this._options.multisamplingSamples, this._cgl.gl.RGBA32F, this._width, this._height) : this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER, this._cgl.gl.RGBA32F, this._width, this._height) : this._options.multisampling ? this._cgl.gl.renderbufferStorageMultisample(this._cgl.gl.RENDERBUFFER, this._options.multisamplingSamples, this._cgl.gl.RGBA8, this._width, this._height) : this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER, this._cgl.gl.RGBA8, this._width, this._height), this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0 + n, this._cgl.gl.RENDERBUFFER, i), this._colorRenderbuffers[n] = i
        }
        for (this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._textureFrameBuffer), n = 0; n < this._numRenderBuffers; n++) this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0 + n, this._cgl.gl.TEXTURE_2D, this._colorTextures[n].tex, 0);
        for (this._options.depth && this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.TEXTURE_2D, this._textureDepth.tex, 0), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuffer), a && (this._textureDepth.setSize(this._width, this._height), this._depthRenderbuffer = this._cgl.gl.createRenderbuffer(), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, this._depthRenderbuffer), this._options.isFloatingPointTexture, this._options.multisampling ? this._cgl.gl.renderbufferStorageMultisample(this._cgl.gl.RENDERBUFFER, this._options.multisamplingSamples, this._cgl.gl.DEPTH_COMPONENT32F, this._width, this._height) : this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER, this._cgl.gl.DEPTH_COMPONENT32F, this._width, this._height), this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.RENDERBUFFER, this._depthRenderbuffer)), this._drawTargetArray.length = 0, n = 0; n < this._numRenderBuffers; n++) this._drawTargetArray.push(this._cgl.gl.COLOR_ATTACHMENT0 + n);
        if (!this._cgl.gl.isFramebuffer(this._textureFrameBuffer)) throw "Invalid framebuffer";
        var r = this._cgl.gl.checkFramebufferStatus(this._cgl.gl.FRAMEBUFFER);
        switch (r) {
            case this._cgl.gl.FRAMEBUFFER_COMPLETE:
                break;
            case this._cgl.gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                throw m("FRAMEBUFFER_INCOMPLETE_ATTACHMENT..."), new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
            case this._cgl.gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                throw m("FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT"), new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
            case this._cgl.gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                throw m("FRAMEBUFFER_INCOMPLETE_DIMENSIONS"), new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
            case this._cgl.gl.FRAMEBUFFER_UNSUPPORTED:
                throw m("FRAMEBUFFER_UNSUPPORTED"), new Error("Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED");
            default:
                throw m("incomplete framebuffer", r), new Error("Incomplete framebuffer: " + r)
        }
        this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, null)
    }, ie.prototype.renderStart = function () {
        this._cgl.pushModelMatrix(), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuffer), this._cgl.pushGlFrameBuffer(this._frameBuffer), this._cgl.pushFrameBuffer(this), this._cgl.pushPMatrix(), this._cgl.gl.viewport(0, 0, this._width, this._height), this._cgl.gl.drawBuffers(this._drawTargetArray), this._options.clear && (this._cgl.gl.clearColor(0, 0, 0, 0), this._cgl.gl.clear(this._cgl.gl.COLOR_BUFFER_BIT | this._cgl.gl.DEPTH_BUFFER_BIT))
    }, ie.prototype.renderEnd = function () {
        if (this._cgl.popPMatrix(), this._numRenderBuffers <= 1) this._cgl.gl.bindFramebuffer(this._cgl.gl.READ_FRAMEBUFFER, this._frameBuffer), this._cgl.gl.bindFramebuffer(this._cgl.gl.DRAW_FRAMEBUFFER, this._textureFrameBuffer), this._cgl.gl.clearBufferfv(this._cgl.gl.COLOR, 0, [0, 0, 0, 1]), this._cgl.gl.blitFramebuffer(0, 0, this._width, this._height, 0, 0, this._width, this._height, this._cgl.gl.COLOR_BUFFER_BIT | this._cgl.gl.DEPTH_BUFFER_BIT, this._cgl.gl.NEAREST);
        else {
            this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this.Framebuffer2BlittingFramebuffer), this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.RENDERBUFFER, this._depthRenderbuffer), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this.Framebuffer2FinalFramebuffer), this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.TEXTURE_2D, this._textureDepth.tex, 0);
            for (var e = 0; e < this._numRenderBuffers; e++) {
                this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this.Framebuffer2BlittingFramebuffer), this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.RENDERBUFFER, this._colorRenderbuffers[e]), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this.Framebuffer2FinalFramebuffer), this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.TEXTURE_2D, this._colorTextures[e].tex, 0), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null), this._cgl.gl.bindFramebuffer(this._cgl.gl.READ_FRAMEBUFFER, this.Framebuffer2BlittingFramebuffer), this._cgl.gl.bindFramebuffer(this._cgl.gl.DRAW_FRAMEBUFFER, this.Framebuffer2FinalFramebuffer), this._cgl.gl.clearBufferfv(this._cgl.gl.COLOR, 0, [0, 0, 0, 1]);
                var t = this._cgl.gl.COLOR_BUFFER_BIT;
                0 == e && (t |= this._cgl.gl.DEPTH_BUFFER_BIT), this._cgl.gl.blitFramebuffer(0, 0, this._width, this._height, 0, 0, this._width, this._height, t, this._cgl.gl.NEAREST)
            }
        }
        if (this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.popGlFrameBuffer()), this._cgl.popFrameBuffer(), this._cgl.popModelMatrix(), this._cgl.resetViewPort(), this._colorTextures[0].filter == ae.FILTER_MIPMAP)
            for (e = 0; e < this._numRenderBuffers; e++) this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, this._colorTextures[e].tex), this._colorTextures[e].updateMipMap(), this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, null)
    };
    const re = function (e) {
        this.name = e, this.faceVertCount = 3, this._vertices = [], this.verticesIndices = [], this.texCoords = new Float32Array, this.texCoordsIndices = [], this.vertexNormals = [], this.tangents = [], this.biTangents = [], this.barycentrics = [], this.morphTargets = [], this.vertexColors = [], this._attributes = {}, Object.defineProperty(this, "vertices", {
            get() {
                return this._vertices
            },
            set(e) {
                this.setVertices(e)
            }
        })
    };
    re.prototype.clear = function () {
        this.vertices = new Float32Array([]), this.verticesIndices.length = 0, this.texCoords = new Float32Array([]), this.texCoordsIndices.length = 0, this.vertexNormals = new Float32Array([])
    }, re.prototype.getAttributes = function () {
        return this._attributes
    }, re.prototype.getAttribute = function (e) {
        for (var t in this._attributes)
            if (this._attributes[t].name == e) return this._attributes[t];
        return null
    }, re.prototype.setAttribute = function (e, t, n) {
        var a = "";
        1 == n ? a = "float" : 2 == n ? a = "vec2" : 3 == n ? a = "vec3" : 4 == n && (a = "vec4");
        var i = {
            name: e,
            data: t,
            itemSize: n,
            type: a
        };
        this._attributes[e] = i
    }, re.prototype.setVertices = function (e) {
        e instanceof Float32Array ? this._vertices = e : this._vertices = new Float32Array(e)
    }, re.prototype.setTexCoords = function (e) {
        e instanceof Float32Array ? this.texCoords = e : this.texCoords = new Float32Array(e)
    }, re.prototype.calcNormals = function (e) {
        e || this.unIndex(), this.calculateNormals({})
    }, re.prototype.setPointVertices = function (e) {
        if (e.length % 3 == 0) {
            e instanceof Float32Array ? this.vertices = e : this.vertices = new Float32Array(e), this.texCoords instanceof Float32Array || (this.texCoords = new Float32Array(e.length / 3 * 2)), this.verticesIndices.length = e.length / 3;
            for (var t = 0; t < e.length / 3; t++) this.verticesIndices[t] = t, this.texCoords[2 * t] = 0, this.texCoords[2 * t + 1] = 0
        } else console.error("CGL MESH : SetPointVertices: Array must be multiple of three.")
    }, re.prototype.merge = function (e) {
        if (e) {
            var t = this.verticesIndices.length,
                n = this.vertices.length / 3;
            this.verticesIndices.length = this.verticesIndices.length + e.verticesIndices.length;
            for (var a = 0; a < e.verticesIndices.length; a++) this.verticesIndices[t + a] = e.verticesIndices[a] + n;
            this.vertices = O.float32Concat(this.vertices, e.vertices), this.texCoords = O.float32Concat(this.texCoords, e.texCoords), this.vertexNormals = O.float32Concat(this.vertexNormals, e.vertexNormals), this.tangents = O.float32Concat(this.vertexNormals, e.tangents), this.bitangents = O.float32Concat(this.vertexNormals, e.bitangents)
        }
    }, re.prototype.copy = function () {
        var e = 0,
            t = new re;
        for (t.faceVertCount = this.faceVertCount, t.setVertices(this._vertices.slice(0)), t.verticesIndices.length = this.verticesIndices.length, e = 0; e < this.verticesIndices.length; e++) t.verticesIndices[e] = this.verticesIndices[e];
        for (t.texCoords = new Float32Array(this.texCoords.length), e = 0; e < this.texCoords.length; e++) t.texCoords[e] = this.texCoords[e];
        for (t.texCoordsIndices.length = this.texCoordsIndices.length, e = 0; e < this.texCoordsIndices.length; e++) t.texCoordsIndices[e] = this.texCoordsIndices[e];
        for (t.vertexNormals = new Float32Array(this.vertexNormals.length), e = 0; e < this.vertexNormals.length; e++) t.vertexNormals[e] = this.vertexNormals[e];
        if (this.tangents)
            for (t.tangents = [], t.tangents.length = this.tangents.length, e = 0; e < this.tangents.length; e++) t.tangents[e] = this.tangents[e];
        if (this.biTangents)
            for (t.biTangents = [], t.biTangents.length = this.biTangents.length, e = 0; e < this.biTangents.length; e++) t.biTangents[e] = this.biTangents[e];
        for (t.barycentrics.length = this.barycentrics.length, e = 0; e < this.barycentrics.length; e++) t.barycentrics[e] = this.barycentrics[e];
        for (t.morphTargets.length = this.morphTargets.length, e = 0; e < this.morphTargets.length; e++) t.morphTargets[e] = this.morphTargets[e];
        for (t.vertexColors.length = this.vertexColors.length, e = 0; e < this.vertexColors.length; e++) t.vertexColors[e] = this.vertexColors[e];
        return t
    }, re.prototype.calculateNormals = function (e) {
        var t = vec3.create(),
            n = vec3.create(),
            a = vec3.create(),
            i = 0;

        function r(i) {
            return vec3.subtract(t, i[0], i[1]), vec3.subtract(n, i[0], i[2]), vec3.cross(a, t, n), vec3.normalize(a, a), e && e.forceZUp && a[2] < 0 && (a[0] *= -1, a[1] *= -1, a[2] *= -1), a
        }
        for (this.getVertexVec = function (e) {
                var t = [0, 0, 0];
                return t[0] = this.vertices[3 * e + 0], t[1] = this.vertices[3 * e + 1], t[2] = this.vertices[3 * e + 2], t
            }, this.vertexNormals instanceof Float32Array && this.vertexNormals.length == this.vertices.length || (this.vertexNormals = new Float32Array(this.vertices.length)), i = 0; i < this.vertices.length; i++) this.vertexNormals[i] = 0;
        if (this.isIndexed()) {
            var o = [];
            for (o.length = this.verticesIndices.length / 3, i = 0; i < this.verticesIndices.length; i += 3) c = [this.getVertexVec(this.verticesIndices[i + 0]), this.getVertexVec(this.verticesIndices[i + 1]), this.getVertexVec(this.verticesIndices[i + 2])], o[i / 3] = r(c), this.vertexNormals[3 * this.verticesIndices[i + 0] + 0] += o[i / 3][0], this.vertexNormals[3 * this.verticesIndices[i + 0] + 1] += o[i / 3][1], this.vertexNormals[3 * this.verticesIndices[i + 0] + 2] += o[i / 3][2], this.vertexNormals[3 * this.verticesIndices[i + 1] + 0] += o[i / 3][0], this.vertexNormals[3 * this.verticesIndices[i + 1] + 1] += o[i / 3][1], this.vertexNormals[3 * this.verticesIndices[i + 1] + 2] += o[i / 3][2], this.vertexNormals[3 * this.verticesIndices[i + 2] + 0] += o[i / 3][0], this.vertexNormals[3 * this.verticesIndices[i + 2] + 1] += o[i / 3][1], this.vertexNormals[3 * this.verticesIndices[i + 2] + 2] += o[i / 3][2];
            for (i = 0; i < this.verticesIndices.length; i += 3)
                for (var s = 0; s < 3; s++) {
                    var l = [this.vertexNormals[3 * this.verticesIndices[i + s] + 0], this.vertexNormals[3 * this.verticesIndices[i + s] + 1], this.vertexNormals[3 * this.verticesIndices[i + s] + 2]];
                    vec3.normalize(l, l), this.vertexNormals[3 * this.verticesIndices[i + s] + 0] = l[0], this.vertexNormals[3 * this.verticesIndices[i + s] + 1] = l[1], this.vertexNormals[3 * this.verticesIndices[i + s] + 2] = l[2]
                }
        } else {
            var u = [];
            for (i = 0; i < this.vertices.length; i += 9) {
                var c;
                a = r(c = [
                    [this.vertices[i + 0], this.vertices[i + 1], this.vertices[i + 2]],
                    [this.vertices[i + 3], this.vertices[i + 4], this.vertices[i + 5]],
                    [this.vertices[i + 6], this.vertices[i + 7], this.vertices[i + 8]]
                ]), u.push(a[0], a[1], a[2], a[0], a[1], a[2], a[0], a[1], a[2])
            }
            this.vertexNormals = u
        }
    }, re.prototype.calcTangentsBitangents = function () {
        if (!this.vertices.length) throw new Error("Cannot calculate tangents/bitangents without vertices.");
        if (!this.vertexNormals.length) throw new Error("Cannot calculate tangents/bitangents without normals.");
        if (!this.texCoords.length) throw new Error("Cannot calculate tangents/bitangents without texture coordinates.");
        if (!this.verticesIndices.length) throw new Error("Cannot calculate tangents/bitangents without vertex indices.");
        if (this.verticesIndices.length % 3 != 0) throw new Error("Vertex indices mismatch!");
        const e = this.verticesIndices.length / 3,
            t = this.vertices.length / 3;
        this.tangents = new Float32Array(this.vertexNormals.length), this.biTangents = new Float32Array(this.vertexNormals.length);
        var n = [];
        n.length = 2 * t;
        const a = vec3.create(),
            i = vec3.create(),
            r = vec3.create(),
            o = vec2.create(),
            s = vec2.create(),
            l = vec2.create(),
            u = vec3.create(),
            c = vec3.create();
        for (var d = 0; d < e; d += 1) {
            const e = this.verticesIndices[3 * d],
                h = this.verticesIndices[3 * d + 1],
                f = this.verticesIndices[3 * d + 2];
            vec3.set(a, this.vertices[3 * e], this.vertices[3 * e + 1], this.vertices[3 * e + 2]), vec3.set(i, this.vertices[3 * h], this.vertices[3 * h + 1], this.vertices[3 * h + 2]), vec3.set(r, this.vertices[3 * f], this.vertices[3 * f + 1], this.vertices[3 * f + 2]), vec2.set(o, this.texCoords[2 * e], this.texCoords[2 * e + 1]), vec2.set(s, this.texCoords[2 * h], this.texCoords[2 * h + 1]), vec2.set(l, this.texCoords[2 * f], this.texCoords[2 * f + 1]);
            const b = i[0] - a[0],
                p = r[0] - a[0],
                m = i[1] - a[1],
                g = r[1] - a[1],
                v = i[2] - a[2],
                _ = r[2] - a[2],
                O = s[0] - o[0],
                I = l[0] - o[0],
                A = s[1] - o[1],
                E = l[1] - o[1],
                M = 1 / (O * E - I * A);
            vec3.set(u, (E * b - A * p) * M, (E * m - A * g) * M, (E * v - A * _) * M), vec3.set(c, (O * p - I * b) * M, (O * g - I * m) * M, (O * _ - I * v) * M), n[e] = u, n[h] = u, n[f] = u, n[e + t] = c, n[h + t] = c, n[f + t] = c
        }
        const h = vec3.create(),
            f = vec3.create(),
            b = vec3.create(),
            p = vec3.create(),
            m = vec3.create(),
            g = vec3.create(),
            v = vec3.create(),
            _ = vec3.create();
        for (var O = 0; O < t; O += 1) {
            vec3.set(h, this.vertexNormals[3 * O], this.vertexNormals[3 * O + 1], this.vertexNormals[3 * O + 2]), vec3.set(f, n[O][0], n[O][1], n[O][2]);
            const e = vec3.dot(h, f);
            vec3.scale(m, h, e), vec3.subtract(g, f, m), vec3.normalize(_, g), vec3.cross(v, h, f);
            const a = vec3.dot(v, n[O + t]) < 0 ? -1 : 1;
            vec3.scale(b, _, 1 / a), vec3.cross(p, h, b), this.tangents[3 * O + 0] = b[0], this.tangents[3 * O + 1] = b[1], this.tangents[3 * O + 2] = b[2], this.biTangents[3 * O + 0] = p[0], this.biTangents[3 * O + 1] = p[1], this.biTangents[3 * O + 2] = p[2]
        }
    }, re.prototype.isIndexed = function () {
        return 0 != this.verticesIndices.length
    }, re.prototype.unIndex = function (e) {
        var t = [],
            n = [],
            a = [],
            i = [],
            r = 0,
            o = 0;
        for (this.vertexNormals = [], o = 0; o < this.verticesIndices.length; o += 3) t.push(this.vertices[3 * this.verticesIndices[o + 0] + 0]), t.push(this.vertices[3 * this.verticesIndices[o + 0] + 1]), t.push(this.vertices[3 * this.verticesIndices[o + 0] + 2]), i.push(this.vertexNormals[3 * this.verticesIndices[o + 0] + 0]), i.push(this.vertexNormals[3 * this.verticesIndices[o + 0] + 1]), i.push(this.vertexNormals[3 * this.verticesIndices[o + 0] + 2]), this.texCoords ? (a.push(this.texCoords[2 * this.verticesIndices[o + 0] + 0]), a.push(this.texCoords[2 * this.verticesIndices[o + 0] + 1])) : (a.push(0), a.push(0)), n.push(r), r++, t.push(this.vertices[3 * this.verticesIndices[o + 1] + 0]), t.push(this.vertices[3 * this.verticesIndices[o + 1] + 1]), t.push(this.vertices[3 * this.verticesIndices[o + 1] + 2]), i.push(this.vertexNormals[3 * this.verticesIndices[o + 1] + 0]), i.push(this.vertexNormals[3 * this.verticesIndices[o + 1] + 1]), i.push(this.vertexNormals[3 * this.verticesIndices[o + 1] + 2]), this.texCoords ? (a.push(this.texCoords[2 * this.verticesIndices[o + 1] + 0]), a.push(this.texCoords[2 * this.verticesIndices[o + 1] + 1])) : (a.push(0), a.push(0)), n.push(r), r++, t.push(this.vertices[3 * this.verticesIndices[o + 2] + 0]), t.push(this.vertices[3 * this.verticesIndices[o + 2] + 1]), t.push(this.vertices[3 * this.verticesIndices[o + 2] + 2]), i.push(this.vertexNormals[3 * this.verticesIndices[o + 2] + 0]), i.push(this.vertexNormals[3 * this.verticesIndices[o + 2] + 1]), i.push(this.vertexNormals[3 * this.verticesIndices[o + 2] + 2]), this.texCoords ? (a.push(this.texCoords[2 * this.verticesIndices[o + 2] + 0]), a.push(this.texCoords[2 * this.verticesIndices[o + 2] + 1])) : (a.push(0), a.push(0)), n.push(r), r++;
        this.vertices = t, this.texCoords = a, this.vertexNormals = i, this.verticesIndices.length = 0, e && (this.verticesIndices = n), this.calculateNormals()
    }, re.prototype.calcBarycentric = function () {
        this.barycentrics.length = this.vertices.length;
        var e = 0;
        for (e = 0; e < this.vertices.length; e++) this.barycentrics[e] = 0;
        var t = 0;
        for (e = 0; e < this.vertices.length; e += 3) this.barycentrics[e + t] = 1, 3 == ++t && (t = 0)
    }, re.prototype.getBounds = function () {
        var e = 0,
            t = {
                maxX: -Number.MAX_VALUE,
                maxY: -Number.MAX_VALUE,
                maxZ: -Number.MAX_VALUE,
                minX: Number.MAX_VALUE,
                minY: Number.MAX_VALUE,
                minZ: Number.MAX_VALUE
            };
        for (e = 0; e < this.vertices.length; e += 3) this.vertices[e + 0] == this.vertices[e + 0] && (t.maxX = Math.max(t.maxX, this.vertices[e + 0]), t.maxY = Math.max(t.maxY, this.vertices[e + 1]), t.maxZ = Math.max(t.maxZ, this.vertices[e + 2]), t.minX = Math.min(t.minX, this.vertices[e + 0]), t.minY = Math.min(t.minY, this.vertices[e + 1]), t.minZ = Math.min(t.minZ, this.vertices[e + 2]));
        return t.x = Math.abs(t.maxX) + Math.abs(t.minX), t.y = Math.abs(t.maxY) + Math.abs(t.minY), t.z = Math.abs(t.maxZ) + Math.abs(t.minZ), t.maxAxis = Math.max(t.z, Math.max(t.x, t.y)), t
    }, re.prototype.center = function (e, t, n) {
        void 0 === e && (e = !0, t = !0, n = !0);
        var a = 0;
        const i = this.getBounds(),
            r = [i.minX + (i.maxX - i.minX) / 2, i.minY + (i.maxY - i.minY) / 2, i.minZ + (i.maxZ - i.minZ) / 2];
        for (a = 0; a < this.vertices.length; a += 3) this.vertices[a + 0] == this.vertices[a + 0] && (e && (this.vertices[a + 0] -= r[0]), t && (this.vertices[a + 1] -= r[1]), n && (this.vertices[a + 2] -= r[2]));
        return r
    }, re.prototype.mapTexCoords2d = function () {
        var e = this.getBounds(),
            t = this.vertices.length / 3;
        this.texCoords = new Float32Array(length = 2 * t);
        for (var n = 0; n < t; n++) {
            var a = this.vertices[3 * n + 0],
                i = this.vertices[3 * n + 1];
            this.texCoords[2 * n + 0] = a / (e.maxX - e.minX) + .5, this.texCoords[2 * n + 1] = 1 - i / (e.maxY - e.minY) + .5
        }
    }, re.buildFromFaces = function (e) {
        for (var t = [], n = [], a = 0; a < e.length; a += 3) {
            for (var i = e[a + 0], r = e[a + 1], o = e[a + 2], s = [-1, -1, -1], l = 0; l < t; l += 3) t[l + 0] == i[0] && t[l + 1] == i[1] && t[l + 2] == i[2] && (s[0] = l / 3), t[l + 0] == r[0] && t[l + 1] == r[1] && t[l + 2] == r[2] && (s[1] = l / 3), t[l + 0] == o[0] && t[l + 1] == o[1] && t[l + 2] == o[2] && (s[2] = l / 3); - 1 == s[0] && (t.push(i[0], i[1], i[2]), s[0] = (t.length - 1) / 3), -1 == s[1] && (t.push(r[0], r[1], r[2]), s[1] = (t.length - 1) / 3), -1 == s[2] && (t.push(o[0], o[1], o[2]), s[2] = (t.length - 1) / 3), n.push(parseInt(s[0], 10)), n.push(parseInt(s[1], 10)), n.push(parseInt(s[2], 10))
        }
        var u = new re;
        return u.vertices = t, u.verticesIndices = n, u
    }, re.json2geom = function (e) {
        var t = new re;
        if (t.verticesIndices = [], t.vertices = e.vertices || [], t.vertexNormals = e.normals || [], t.vertexColors = e.colors || [], t.tangents = e.tangents || [], t.biTangents = e.bitangents || [], e.texturecoords && t.setTexCoords(e.texturecoords[0]), e.vertices_b64 && (t.vertices = new Float32Array(f(e.vertices_b64))), e.normals_b64 && (t.vertexNormals = new Float32Array(f(e.normals_b64))), e.tangents_b64 && (t.tangents = new Float32Array(f(e.tangents_b64))), e.bitangents_b64 && (t.biTangents = new Float32Array(f(e.bitangents_b64))), e.texturecoords_b64 && t.setTexCoords(new Float32Array(f(e.texturecoords_b64[0]))), e.faces_b64) t.verticesIndices = new Uint32Array(f(e.faces_b64));
        else {
            t.verticesIndices.length = 3 * e.faces.length;
            for (var n = 0; n < e.faces.length; n++) t.verticesIndices[3 * n] = e.faces[n][0], t.verticesIndices[3 * n + 1] = e.faces[n][1], t.verticesIndices[3 * n + 2] = e.faces[n][2]
        }
        return t
    };
    const oe = function (e, t, n, a) {
        if (this._loc = -1, this._type = t, this._name = n, this._shader = e, this._value = 1e-5, this._oldValue = null, this._port = null, this._shader.addUniform(this), this.needsUpdate = !0, "f" == t) this.set = this.setValue = this.setValueF.bind(this), this.updateValue = this.updateValueF.bind(this);
        else if ("f[]" == t) this.set = this.setValue = this.setValueArrayF.bind(this), this.updateValue = this.updateValueArrayF.bind(this);
        else if ("3f[]" == t) this.set = this.setValue = this.setValueArray3F.bind(this), this.updateValue = this.updateValueArray3F.bind(this);
        else if ("i" == t) this.set = this.setValue = this.setValueI.bind(this), this.updateValue = this.updateValueI.bind(this);
        else if ("b" == t) this.set = this.setValue = this.setValueBool.bind(this), this.updateValue = this.updateValueBool.bind(this);
        else if ("4f" == t) this.set = this.setValue = this.setValue4F.bind(this), this.updateValue = this.updateValue4F.bind(this);
        else if ("3f" == t) this.set = this.setValue = this.setValue3F.bind(this), this.updateValue = this.updateValue3F.bind(this);
        else if ("2f" == t) this.set = this.setValue = this.setValue2F.bind(this), this.updateValue = this.updateValue2F.bind(this);
        else if ("t" == t) this.set = this.setValue = this.setValueT.bind(this), this.updateValue = this.updateValueT.bind(this);
        else {
            if ("m4" != t) throw new Error("Unknown uniform type");
            this.set = this.setValue = this.setValueM4.bind(this), this.updateValue = this.updateValueM4.bind(this)
        }
        "object" == typeof a && a instanceof U ? (this._port = a, this._value = this._port.get(), this._port.onValueChanged = this.updateFromPort.bind(this)) : this._value = a, this.setValue(this._value), this.needsUpdate = !0
    };
    oe.prototype.getType = function () {
        return this._type
    }, oe.prototype.getName = function () {
        return this._name
    }, oe.prototype.getValue = function () {
        return this._value
    }, oe.prototype.resetLoc = function () {
        this._loc = -1, this.needsUpdate = !0
    }, oe.prototype.bindTextures = function () {
        return this._value
    }, oe.prototype.resetLoc = function () {
        this._loc = -1, this.needsUpdate = !0
    }, oe.prototype.bindTextures = function () {}, oe.prototype.getLoc = function () {
        return this._loc
    }, oe.prototype.updateFromPort = function () {
        this.setValue(this._port.get())
    }, oe.prototype.updateValueF = function () {
        -1 == this._loc ? this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name) : this.needsUpdate = !1, this._shader.getCgl().gl.uniform1f(this._loc, this._value), J.profileUniformCount++
    }, oe.prototype.setValueF = function (e) {
        e != this._value && (this.needsUpdate = !0, this._value = e)
    }, oe.prototype.updateValueI = function () {
        -1 == this._loc ? this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name) : this.needsUpdate = !1, this._shader.getCgl().gl.uniform1i(this._loc, this._value), J.UniformCount++
    }, oe.prototype.setValueI = function (e) {
        e != this._value && (this.needsUpdate = !0, this._value = e)
    }, oe.prototype.updateValueBool = function () {
        -1 == this._loc ? this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name) : this.needsUpdate = !1, this._shader.getCgl().gl.uniform1i(this._loc, this._value ? 1 : 0), J.UniformCount++
    }, oe.prototype.setValueBool = function (e) {
        e != this._value && (this.needsUpdate = !0, this._value = e)
    }, oe.prototype.setValueArray3F = function (e) {
        this.needsUpdate = !0, this._value = e
    }, oe.prototype.updateValueArray3F = function () {
        -1 == this._loc ? this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name) : this.needsUpdate = !1, this._value && (this._shader.getCgl().gl.uniform3fv(this._loc, this._value), J.UniformCount++)
    }, oe.prototype.setValueArrayF = function (e) {
        this.needsUpdate = !0, this._value = e
    }, oe.prototype.updateValueArrayF = function () {
        -1 == this._loc ? this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name) : this.needsUpdate = !1, this._value && (this._shader.getCgl().gl.uniform1fv(this._loc, this._value), J.UniformCount++)
    }, oe.prototype.updateValue3F = function () {
        this._value && (-1 == this._loc && (this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name), J.ShaderGetUniform++, J.ShaderGetUniformName = this._name), this._shader.getCgl().gl.uniform3f(this._loc, this._value[0], this._value[1], this._value[2]), this.needsUpdate = !1, J.UniformCount++)
    }, oe.prototype.setValue3F = function (e) {
        e && (this._oldValue ? e[0] == this._oldValue[0] && e[1] == this._oldValue[1] && e[2] == this._oldValue[2] || (this._oldValue[0] = e[0], this._oldValue[1] = e[1], this._oldValue[2] = e[2], this.needsUpdate = !0) : (this._oldValue = [e[0] - 1, 1, 2], this.needsUpdate = !0), this._value = e)
    }, oe.prototype.updateValue2F = function () {
        this._value && (-1 == this._loc && (this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name), J.ShaderGetUniform++, J.ShaderGetUniformName = this._name), this._shader.getCgl().gl.uniform2f(this._loc, this._value[0], this._value[1]), this.needsUpdate = !1, J.UniformCount++)
    }, oe.prototype.setValue2F = function (e) {
        e && (this._oldValue ? e[0] == this._oldValue[0] && e[1] == this._oldValue[1] || (this._oldValue[0] = e[0], this._oldValue[1] = e[1], this.needsUpdate = !0) : (this._oldValue = [e[0] - 1, 1], this.needsUpdate = !0), this._value = e)
    }, oe.prototype.updateValueT = function () {
        -1 == this._loc && (this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name), J.ShaderGetUniform++, J.ShaderGetUniformName = this._name, -1 == this._loc && m("texture this._loc unknown!!")), J.UniformCount++, this._shader.getCgl().gl.uniform1i(this._loc, this._value), this.needsUpdate = !1
    }, oe.prototype.setValueT = function (e) {
        this.needsUpdate = !0, this._value = e
    }, oe.prototype.updateValue4F = function () {
        -1 == this._loc && (this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name), J.ShaderGetUniform++, J.ShaderGetUniformName = this._name), this._shader.getCgl().gl.uniform4f(this._loc, this._value[0], this._value[1], this._value[2], this._value[3]), J.UniformCount++
    }, oe.prototype.setValue4F = function (e) {
        this.needsUpdate = !0, this._value = e
    }, oe.prototype.updateValueM4 = function () {
        -1 == this._loc && (this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name), J.ShaderGetUniform++, J.ShaderGetUniformName = this._name), this._shader.getCgl().gl.uniformMatrix4fv(this._loc, !1, this._value), J.UniformCount++
    }, oe.prototype.setValueM4 = function (e) {
        this.needsUpdate = !0, this._value = e
    };
    const se = {
            MATH: {
                DEG2RAD: Math.PI / 180,
                RAD2DEG: 180 / Math.PI
            },
            SHADER: {
                SHADERVAR_VERTEX_POSITION: "vPosition",
                SHADERVAR_VERTEX_NUMBER: "attrVertIndex",
                SHADERVAR_VERTEX_TEXCOORD: "attrTexCoord",
                SHADERVAR_INSTANCE_MMATRIX: "instMat",
                SHADERVAR_UNI_PROJMAT: "projMatrix",
                SHADERVAR_UNI_VIEWMAT: "viewMatrix",
                SHADERVAR_UNI_MODELMAT: "modelMatrix",
                SHADERVAR_UNI_NORMALMAT: "normalMatrix",
                SHADERVAR_UNI_INVVIEWMAT: "inverseViewMatrix",
                SHADERVAR_UNI_VIEWPOS: "camPos"
            },
            BLEND_MODES: {
                BLEND_NONE: 0,
                BLEND_NORMAL: 1,
                BLEND_ADD: 2,
                BLEND_SUB: 3,
                BLEND_MUL: 4
            }
        },
        le = {
            lastMesh: null
        },
        ue = function (e, t, n) {
            this._cgl = e, this._bufVertexAttrib = null, this._bufVerticesIndizes = this._cgl.gl.createBuffer(), this._attributes = [], this._attribLocs = {}, this._geom = null, this._lastShader = null, this._numInstances = 0, this._glPrimitive = n, this._preWireframeGeom = null, this.addVertexNumbers = !1, this.feedBackAttributes = [], this.setGeom(t), this._feedBacks = [], this._feedBacksChanged = !1, this._transformFeedBackLoc = -1, this._lastAttrUpdate = 0, Object.defineProperty(this, "numInstances", {
                get() {
                    return this._numInstances
                },
                set(e) {
                    this.setNumInstances(e)
                }
            })
        };
    var ce;
    ue.prototype.updateVertices = function (e) {
        this.setAttribute(se.SHADER.SHADERVAR_VERTEX_POSITION, e.vertices, 3)
    }, ue.prototype.setAttributePointer = function (e, t, n, a) {
        for (var i = 0; i < this._attributes.length; i++) this._attributes[i].name == e && (this._attributes[i].pointer || (this._attributes[i].pointer = []), this._attributes[i].pointer.push({
            loc: -1,
            name: t,
            stride: n,
            offset: a,
            instanced: e == se.SHADER.SHADERVAR_INSTANCE_MMATRIX
        }))
    }, ue.prototype.getAttribute = function (e) {
        for (var t = 0; t < this._attributes.length; t++)
            if (this._attributes[t].name == e) return this._attributes[t]
    }, ue.prototype.addAttribute = ue.prototype.updateAttribute = ue.prototype.setAttribute = function (e, t, n, a) {
        var i = null,
            r = null,
            o = !1,
            s = 0,
            l = t.length / n;
        for (0 === l && console.warn("CGL_MESH: num items in attribute " + e + " is ZERO"), "function" == typeof a && (r = a), "object" == typeof a && (a.cb && (r = a.cb), a.instanced && (o = a.instanced)), e == se.SHADER.SHADERVAR_INSTANCE_MMATRIX && (o = !0), t instanceof Float32Array ? i = t : (i = new Float32Array(t), J.profileNonTypedAttrib++, J.profileNonTypedAttribNames = this._geom.name + " " + e), s = 0; s < this._attributes.length; s++)
            if (this._attributes[s].name == e) return this._attributes[s].numItems = l, this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, this._attributes[s].buffer), this._cgl.gl.bufferData(this._cgl.gl.ARRAY_BUFFER, i, this._cgl.gl.DYNAMIC_DRAW), this._attributes[s];
        var u = this._cgl.gl.createBuffer();
        this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, u), this._cgl.gl.bufferData(this._cgl.gl.ARRAY_BUFFER, i, this._cgl.gl.DYNAMIC_DRAW);
        var c = this._cgl.gl.FLOAT;
        a && a.type && (c = a.type);
        var d = {
            buffer: u,
            name: e,
            cb: r,
            itemSize: n,
            numItems: l,
            startItem: 0,
            instanced: o,
            type: c
        };
        return e == se.SHADER.SHADERVAR_VERTEX_POSITION && (this._bufVertexAttrib = d), this._attributes.push(d), this._attribLocs = {}, d
    }, ue.prototype.getAttributes = function () {
        return this._attributes
    }, ue.prototype.updateTexCoords = function (e) {
        if (e.texCoords && e.texCoords.length > 0) this.setAttribute(se.SHADER.SHADERVAR_VERTEX_TEXCOORD, e.texCoords, 2);
        else {
            var t = new Float32Array(Math.round(e.vertices.length / 3 * 2));
            this.setAttribute(se.SHADER.SHADERVAR_VERTEX_TEXCOORD, t, 2)
        }
    }, ue.prototype._setVertexNumbers = function () {
        var e = this._geom.vertices.length / 3;
        if (!this._verticesNumbers || this._verticesNumbers.length != e) {
            this._verticesNumbers = new Float32Array(e);
            for (var t = 0; t < e; t++) this._verticesNumbers[t] = t;
            this.setAttribute(se.SHADER.SHADERVAR_VERTEX_NUMBER, this._verticesNumbers, 1, (t, n, a) => {
                a.uniformNumVertices || (a.uniformNumVertices = new oe(a, "f", "numVertices", e)), a.uniformNumVertices.setValue(e)
            })
        }
    }, ue.prototype.setVertexIndices = function (e) {
        if (e.length > 0) {
            for (var t = 0; t < e.length; t++)
                if (e[t] >= this._geom.vertices.length / 3) return void console.warn("invalid index in " + this._geom.name);
            this._cgl.gl.bindBuffer(this._cgl.gl.ELEMENT_ARRAY_BUFFER, this._bufVerticesIndizes), e instanceof Uint16Array ? this.vertIndicesTyped = e : this.vertIndicesTyped = new Uint16Array(e), this._cgl.gl.bufferData(this._cgl.gl.ELEMENT_ARRAY_BUFFER, this.vertIndicesTyped, this._cgl.gl.DYNAMIC_DRAW), this._bufVerticesIndizes.itemSize = 1, this._bufVerticesIndizes.numItems = e.length
        } else this._bufVerticesIndizes.numItems = 0
    }, ue.prototype.setGeom = function (e) {
        this._geom = e, le.lastMesh = null, J.profileMeshSetGeom++, this._disposeAttributes(), this.updateVertices(this._geom), this.setVertexIndices(this._geom.verticesIndices), this.updateTexCoords(this._geom), this._geom.vertexNormals.length > 0 && this.setAttribute("attrVertNormal", this._geom.vertexNormals, 3), this._geom.hasOwnProperty("tangents") && this._geom.tangents && this._geom.tangents.length > 0 && this.setAttribute("attrTangent", this._geom.tangents, 3), this._geom.hasOwnProperty("biTangents") && this._geom.biTangents && this._geom.biTangents.length > 0 && this.setAttribute("attrBiTangent", this._geom.biTangents, 3), this._geom.vertexColors.length > 0 && this.setAttribute("attrVertColor", this._geom.vertexColors, 4), this.addVertexNumbers && this._setVertexNumbers();
        var t = this._geom.getAttributes();
        for (var n in t) this.setAttribute(n, t[n].data, t[n].itemSize)
    }, ue.prototype._preBind = function (e) {
        for (var t = 0; t < this._attributes.length; t++) this._attributes[t].cb && this._attributes[t].cb(this._attributes[t], this._geom, e)
    }, ue.prototype._bind = function (e) {
        e != this._lastShader && this.unBind();
        var t = [];
        this._attribLocs[e.id] ? t = this._attribLocs[e.id] : this._attribLocs[e.id] = t, this._lastShader = e;
        var n = 0;
        if (e.lastCompile > this._lastAttrUpdate || t.length != this._attributes.length)
            for (this._lastAttrUpdate = e.lastCompile, n = 0; n < this._attributes.length; n++) t[n] = -1;
        for (n = 0; n < this._attributes.length; n++) {
            var a = this._attributes[n];
            if (-1 == t[n] && a._attrLocationLastShaderTime != e.lastCompile && (a._attrLocationLastShaderTime = e.lastCompile, t[n] = this._cgl.glGetAttribLocation(e.getProgram(), a.name), J.profileAttrLoc++), -1 != t[n])
                if (this._cgl.gl.enableVertexAttribArray(t[n]), this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, a.buffer), a.instanced)
                    if (a.itemSize <= 4) a.itemSize && 0 != a.itemSize || m("instanced attrib itemsize error", this._geom.name, a), this._cgl.gl.vertexAttribPointer(t[n], a.itemSize, a.type, !1, 4 * a.itemSize, 0), this._cgl.gl.vertexAttribDivisor(t[n], 1);
                    else if (16 == a.itemSize) {
                const e = 64;
                this._cgl.gl.vertexAttribPointer(t[n], 4, a.type, !1, e, 0), this._cgl.gl.enableVertexAttribArray(t[n] + 1), this._cgl.gl.vertexAttribPointer(t[n] + 1, 4, a.type, !1, e, 16), this._cgl.gl.enableVertexAttribArray(t[n] + 2), this._cgl.gl.vertexAttribPointer(t[n] + 2, 4, a.type, !1, e, 32), this._cgl.gl.enableVertexAttribArray(t[n] + 3), this._cgl.gl.vertexAttribPointer(t[n] + 3, 4, a.type, !1, e, 48), this._cgl.gl.vertexAttribDivisor(t[n], 1), this._cgl.gl.vertexAttribDivisor(t[n] + 1, 1), this._cgl.gl.vertexAttribDivisor(t[n] + 2, 1), this._cgl.gl.vertexAttribDivisor(t[n] + 3, 1)
            } else m("unknown instance attrib size", a.name);
            else {
                if (a.itemSize && 0 != a.itemSize || m("attrib itemsize error", this._geom.name, a), this._cgl.gl.vertexAttribPointer(t[n], a.itemSize, a.type, !1, 4 * a.itemSize, 0), a.pointer)
                    for (var i = 0; i < a.pointer.length; i++) {
                        var r = a.pointer[i]; - 1 == r.loc && (r.loc = this._cgl.glGetAttribLocation(e.getProgram(), r.name)), J.profileAttrLoc++, this._cgl.gl.enableVertexAttribArray(r.loc), this._cgl.gl.vertexAttribPointer(r.loc, a.itemSize, a.type, !1, r.stride, r.offset)
                    }
                this.bindFeedback(a)
            }
        }
        0 !== this._bufVerticesIndizes.numItems && this._cgl.gl.bindBuffer(this._cgl.gl.ELEMENT_ARRAY_BUFFER, this._bufVerticesIndizes)
    }, ue.prototype.unBind = function () {
        var e = this._lastShader;
        if (this._lastShader = null, e) {
            var t = [];
            this._attribLocs[e.id] ? t = this._attribLocs[e.id] : this._attribLocs[e.id] = t, le.lastMesh = null;
            for (var n = 0; n < this._attributes.length; n++) this._attributes[n].instanced && (this._attributes[n].itemSize <= 4 ? (-1 != t[n] && this._cgl.gl.vertexAttribDivisor(t[n], 0), t[n] >= 0 && this._cgl.gl.disableVertexAttribArray(t[n])) : (this._cgl.gl.vertexAttribDivisor(t[n], 0), this._cgl.gl.vertexAttribDivisor(t[n] + 1, 0), this._cgl.gl.vertexAttribDivisor(t[n] + 2, 0), this._cgl.gl.vertexAttribDivisor(t[n] + 3, 0), this._cgl.gl.disableVertexAttribArray(t[n] + 1), this._cgl.gl.disableVertexAttribArray(t[n] + 2), this._cgl.gl.disableVertexAttribArray(t[n] + 3))), -1 != t[n] && this._cgl.gl.disableVertexAttribArray(t[n])
        }
    }, ue.prototype.meshChanged = function () {
        return this._cgl.lastMesh && this._cgl.lastMesh != this
    }, ue.prototype.printDebug = function (e) {
        for (m("--attributes"), i = 0; i < this._attributes.length; i++) m("attribute " + i + " " + this._attributes[i].name)
    }, ue.prototype.setNumVertices = function (e) {
        this._bufVertexAttrib.numItems = e
    }, ue.prototype.render = function (e) {
        if (e) {
            e.wireframe || this._geom.isIndexed() || !this._preWireframeGeom || this.setGeom(this._preWireframeGeom), e.wireframe && this._geom.isIndexed() && (this._preWireframeGeom = this._geom, this._geom = this._geom.copy(), this._geom.unIndex(), this._geom.calcBarycentric(), this.setGeom(this._geom), this.setAttribute("attrBarycentric", this._geom.barycentrics, 3));
            var t = !1;
            le.lastMesh != this && (le.lastMesh && le.lastMesh.unBind(), t = !0), t && this._preBind(e), e.bind(), e.bindTextures && e.bindTextures(), this._bind(e), this.addVertexNumbers && this._setVertexNumbers(), le.lastMesh = this;
            var n = this._cgl.gl.TRIANGLES;
            void 0 !== this._glPrimitive && (n = this._glPrimitive), null !== e.glPrimitive && (n = e.glPrimitive), this.hasFeedbacks() ? this.drawFeedbacks(e, n) : 0 === this._bufVerticesIndizes.numItems ? 0 === this._numInstances ? this._cgl.gl.drawArrays(n, this._bufVertexAttrib.startItem, this._bufVertexAttrib.numItems - this._bufVertexAttrib.startItem) : this._cgl.gl.drawArraysInstanced(n, this._bufVertexAttrib.startItem, this._bufVertexAttrib.numItems, this._numInstances) : 0 === this._numInstances ? this._cgl.gl.drawElements(n, this._bufVerticesIndizes.numItems, this._cgl.gl.UNSIGNED_SHORT, 0) : this._cgl.gl.drawElementsInstanced(n, this._bufVerticesIndizes.numItems, this._cgl.gl.UNSIGNED_SHORT, 0, this._numInstances)
        }
    }, ue.prototype.setNumInstances = function (e) {
        if (this._numInstances = e, e > 0) {
            for (var t = new Float32Array(e), n = 0; n < e; n++) t[n] = n;
            this.setAttribute("instanceIndex", t, 1, {
                instanced: !0
            })
        }
    }, ue.prototype._disposeAttributes = function () {
        if (this._attributes) {
            for (var e = 0; e < this._attributes.length; e++) this._attributes[e].buffer && (this._cgl.gl.deleteBuffer(this._attributes[e].buffer), this._attributes[e].buffer = null);
            this._attributes.length = 0
        }
    }, ue.prototype.dispose = function () {
        this._bufVertexAttrib && this._bufVertexAttrib.buffer && this._cgl.gl.deleteBuffer(this._bufVertexAttrib.buffer), this._bufVerticesIndizes && this._cgl.gl.deleteBuffer(this._bufVerticesIndizes), this._disposeAttributes()
    }, (ce = ue).prototype.hasFeedbacks = function () {
        return this._feedBacks.length > 0
    }, ce.prototype.removeFeedbacks = function (e) {
        this._feedbacks && (this._feedbacks.length = 0, this._feedBacksChanged = !0)
    }, ce.prototype.setAttributeFeedback = function () {}, ce.prototype.setFeedback = function (e, t, n) {
        var a = {
                nameOut: t
            },
            i = !1;
        this.unBindFeedbacks();
        for (var r = 0; r < this._feedBacks.length; r++) this._feedBacks[r].nameOut == t && (a = this._feedBacks[r], i = !0);
        return i || (this._feedBacksChanged = !0), a.initialArr = n, a.attrib = e, a.outBuffer && this._cgl.gl.deleteBuffer(a.outBuffer), a.outBuffer = this._cgl.gl.createBuffer(), this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, a.outBuffer), this._cgl.gl.bufferData(this._cgl.gl.ARRAY_BUFFER, a.initialArr, this._cgl.gl.STATIC_DRAW), this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, a.attrib.buffer), this._cgl.gl.bufferData(this._cgl.gl.ARRAY_BUFFER, a.initialArr, this._cgl.gl.STATIC_DRAW), i || this._feedBacks.push(a), a
    }, ce.prototype.bindFeedback = function (e) {
        if (this._feedBacks && 0 !== this._feedBacks.length) {
            -1 == this._transformFeedBackLoc && (this._transformFeedBackLoc = this._cgl.gl.createTransformFeedback()), this._cgl.gl.bindTransformFeedback(this._cgl.gl.TRANSFORM_FEEDBACK, this._transformFeedBackLoc);
            for (var t = 0; t < this._feedBacks.length; t++) {
                var n = this._feedBacks[t];
                n.attrib == e && this._cgl.gl.bindBufferBase(this._cgl.gl.TRANSFORM_FEEDBACK_BUFFER, t, n.outBuffer)
            }
        }
    }, ce.prototype.drawFeedbacks = function (e, t) {
        var n = 0;
        if (this._feedBacksChanged) {
            var a = [];
            for (this._cgl.gl.bindTransformFeedback(this._cgl.gl.TRANSFORM_FEEDBACK, this._transformFeedBackLoc), n = 0; n < this._feedBacks.length; n++) a.push(this._feedBacks[n].nameOut);
            return e.setFeedbackNames(a), m("feedbacknames", a), e.compile(), this._feedBacksChanged = !1, this._cgl.gl.bindTransformFeedback(this._cgl.gl.TRANSFORM_FEEDBACK, null), void m("changed finished")
        }
        this._cgl.gl.beginTransformFeedback(this.glPrimitive), this._cgl.gl.drawArrays(t, 0, this._feedBacks[0].attrib.numItems), this._cgl.gl.endTransformFeedback(), this.unBindFeedbacks(), this.feedBacksSwapBuffers()
    }, ce.prototype.unBindFeedbacks = function () {
        for (i = 0; i < this._feedBacks.length; i++) this._cgl.gl.bindBufferBase(this._cgl.gl.TRANSFORM_FEEDBACK_BUFFER, i, null);
        this._cgl.gl.bindTransformFeedback(this._cgl.gl.TRANSFORM_FEEDBACK, null)
    }, ce.prototype.feedBacksSwapBuffers = function () {
        for (var e = 0; e < this._feedBacks.length; e++) {
            var t = this._feedBacks[e].attrib.buffer;
            this._feedBacks[e].attrib.buffer = this._feedBacks[e].outBuffer, this._feedBacks[e].outBuffer = t
        }
    };
    const de = {
            getSimpleRect: function (e, t) {
                var n = new re(t);
                return n.vertices = [1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0], n.texCoords = [1, 1, 0, 1, 1, 0, 0, 0], n.verticesIndices = [0, 1, 2, 2, 1, 3], n.vertexNormals = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], new ue(e, n)
            }
        },
        he = function (e, t) {
            this._cgl = e, e.TextureEffectMesh || this.createMesh(), this._textureSource = null, this._textureTarget = null, this._frameBuf = this._cgl.gl.createFramebuffer(), this._frameBuf2 = this._cgl.gl.createFramebuffer(), this._renderbuffer = this._cgl.gl.createRenderbuffer(), this._renderbuffer2 = this._cgl.gl.createRenderbuffer(), this.switched = !1, this.depth = !1
        };
    he.prototype.setSourceTexture = function (e) {
        e.textureType == ae.TYPE_FLOAT && this._cgl.gl.getExtension("EXT_color_buffer_float"), null === e ? (this._textureSource = new ae(this._cgl), this._textureSource.setSize(16, 16)) : this._textureSource = e, this._textureSource.compareSettings(this._textureTarget) || (this._textureTarget && this._textureTarget.delete(), this._textureTarget = this._textureSource.clone(), J.profileEffectBuffercreate++, this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuf), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, this._renderbuffer), this.depth && this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER, this._cgl.gl.DEPTH_COMPONENT16, this._textureSource.width, this._textureSource.height), this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.TEXTURE_2D, this._textureTarget.tex, 0), this.depth && this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.RENDERBUFFER, this._renderbuffer), this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, null), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, null), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuf2), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, this._renderbuffer2), this.depth && this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER, this._cgl.gl.DEPTH_COMPONENT16, this._textureSource.width, this._textureSource.height), this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.TEXTURE_2D, this._textureSource.tex, 0), this.depth && this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.RENDERBUFFER, this._renderbuffer2), this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, null), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, null), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null))
    }, he.prototype.startEffect = function () {
        this._textureTarget ? (this.switched = !1, this._cgl.pushDepthTest(!1), this._cgl.pushModelMatrix(), this._cgl.pushPMatrix(), this._cgl.gl.viewport(0, 0, this.getCurrentTargetTexture().width, this.getCurrentTargetTexture().height), mat4.perspective(this._cgl.pMatrix, 45, this.getCurrentTargetTexture().width / this.getCurrentTargetTexture().height, .1, 1100), this._cgl.pushPMatrix(), mat4.identity(this._cgl.pMatrix), this._cgl.pushViewMatrix(), mat4.identity(this._cgl.vMatrix), this._cgl.pushModelMatrix(), mat4.identity(this._cgl.mvMatrix)) : m("effect has no target")
    }, he.prototype.endEffect = function () {
        this._cgl.popDepthTest(!1), this._cgl.popModelMatrix(), this._cgl.popPMatrix(), this._cgl.popModelMatrix(), this._cgl.popViewMatrix(), this._cgl.popPMatrix(), this._cgl.resetViewPort()
    }, he.prototype.bind = function () {
        null !== this._textureSource ? this.switched ? (this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuf2), this._cgl.pushGlFrameBuffer(this._frameBuf2)) : (this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuf), this._cgl.pushGlFrameBuffer(this._frameBuf)) : m("no base texture set!")
    }, he.prototype.finish = function () {
        null !== this._textureSource ? (this._cgl.TextureEffectMesh.render(this._cgl.getShader()), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.popGlFrameBuffer()), this._textureTarget.filter == ae.FILTER_MIPMAP && (this.switched ? (this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, this._textureSource.tex), this._textureSource.updateMipMap()) : (this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, this._textureTarget.tex), this._textureTarget.updateMipMap()), this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, null)), this.switched = !this.switched) : m("no base texture set!")
    }, he.prototype.getCurrentTargetTexture = function () {
        return this.switched ? this._textureSource : this._textureTarget
    }, he.prototype.getCurrentSourceTexture = function () {
        return this.switched ? this._textureTarget : this._textureSource
    }, he.prototype.delete = function () {
        this._textureTarget && this._textureTarget.delete(), this._textureSource && this._textureSource.delete(), this._cgl.gl.deleteRenderbuffer(this._renderbuffer), this._cgl.gl.deleteFramebuffer(this._frameBuf)
    }, he.prototype.createMesh = function () {
        this._cgl.TextureEffectMesh = de.getSimpleRect(this._cgl, "textureEffect rect")
    }, he.checkOpNotInTextureEffect = function (e) {
        return e.uiAttribs.error && !e.patch.cgl.currentTextureEffect ? (e.uiAttr({
            error: null
        }), !0) : !e.patch.cgl.currentTextureEffect || (e.patch.cgl.currentTextureEffect && !e.uiAttribs.error ? (e.uiAttr({
            error: "This op can not be a child of a ImageCompose/texture effect! imagecompose should only have textureeffect childs."
        }), !1) : !e.patch.cgl.currentTextureEffect)
    }, he.checkOpInEffect = function (e) {
        return e.patch.cgl.currentTextureEffect && e.uiAttribs.error ? (e.uiAttr({
            error: null
        }), !0) : !!e.patch.cgl.currentTextureEffect || (e.patch.cgl.currentTextureEffect || e.uiAttribs.error ? !!e.patch.cgl.currentTextureEffect : (e.uiAttr({
            error: 'This op must be a child of a texture effect! More infos <a href="https://docs.cables.gl/image_composition/image_composition.html" target="_blank">here</a>.'
        }), !1))
    }, he.getBlendCode = function () {
        return "".endl() + "vec3 _blend(vec3 base,vec3 blend)".endl() + "{".endl() + "   vec3 colNew=blend;".endl() + "   #ifdef BM_MULTIPLY".endl() + "       colNew=base*blend;".endl() + "   #endif".endl() + "   #ifdef BM_MULTIPLY_INV".endl() + "       colNew=base* vec3(1.0)-blend;".endl() + "   #endif".endl() + "   #ifdef BM_AVERAGE".endl() + "       colNew=((base + blend) / 2.0);".endl() + "   #endif".endl() + "   #ifdef BM_ADD".endl() + "       colNew=min(base + blend, vec3(1.0));".endl() + "   #endif".endl() + "   #ifdef BM_SUBSTRACT".endl() + "       colNew=max(base + blend - vec3(1.0), vec3(0.0));".endl() + "   #endif".endl() + "   #ifdef BM_DIFFERENCE".endl() + "       colNew=abs(base - blend);".endl() + "   #endif".endl() + "   #ifdef BM_NEGATION".endl() + "       colNew=(vec3(1.0) - abs(vec3(1.0) - base - blend));".endl() + "   #endif".endl() + "   #ifdef BM_EXCLUSION".endl() + "       colNew=(base + blend - 2.0 * base * blend);".endl() + "   #endif".endl() + "   #ifdef BM_LIGHTEN".endl() + "       colNew=max(blend, base);".endl() + "   #endif".endl() + "   #ifdef BM_DARKEN".endl() + "       colNew=min(blend, base);".endl() + "   #endif".endl() + "   #ifdef BM_OVERLAY".endl() + "      #define BlendOverlayf(base, blend)  (base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend)))".endl() + "      colNew=vec3(BlendOverlayf(base.r, blend.r),BlendOverlayf(base.g, blend.g),BlendOverlayf(base.b, blend.b));".endl() + "   #endif".endl() + "   #ifdef BM_SCREEN".endl() + "      #define BlendScreenf(base, blend)       (1.0 - ((1.0 - base) * (1.0 - blend)))".endl() + "      colNew=vec3(BlendScreenf(base.r, blend.r),BlendScreenf(base.g, blend.g),BlendScreenf(base.b, blend.b));".endl() + "   #endif".endl() + "   #ifdef BM_SOFTLIGHT".endl() + "      #define BlendSoftLightf(base, blend)    ((blend < 0.5) ? (2.0 * base * blend + base * base * (1.0 - 2.0 * blend)) : (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend)))".endl() + "      colNew=vec3(BlendSoftLightf(base.r, blend.r),BlendSoftLightf(base.g, blend.g),BlendSoftLightf(base.b, blend.b));".endl() + "   #endif".endl() + "   #ifdef BM_HARDLIGHT".endl() + "      #define BlendOverlayf(base, blend)  (base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend)))".endl() + "      colNew=vec3(BlendOverlayf(base.r, blend.r),BlendOverlayf(base.g, blend.g),BlendOverlayf(base.b, blend.b));".endl() + "   #endif".endl() + "   #ifdef BM_COLORDODGE".endl() + "      #define BlendColorDodgef(base, blend)   ((blend == 1.0) ? blend : min(base / (1.0 - blend), 1.0))".endl() + "      colNew=vec3(BlendColorDodgef(base.r, blend.r),BlendColorDodgef(base.g, blend.g),BlendColorDodgef(base.b, blend.b));".endl() + "   #endif".endl() + "   #ifdef BM_COLORBURN".endl() + "      #define BlendColorBurnf(base, blend)    ((blend == 0.0) ? blend : max((1.0 - ((1.0 - base) / blend)), 0.0))".endl() + "      colNew=vec3(BlendColorBurnf(base.r, blend.r),BlendColorBurnf(base.g, blend.g),BlendColorBurnf(base.b, blend.b));".endl() + "   #endif".endl() + "   return colNew;".endl() + "}".endl() + "vec4 cgl_blend(vec4 oldColor,vec4 newColor,float amount)".endl() + "{".endl() + "   vec4 col=vec4( _blend(oldColor.rgb,newColor.rgb) ,1.0);".endl() + "   col=vec4( mix( col.rgb, oldColor.rgb ,1.0-oldColor.a*amount),1.0);".endl() + "   return col;".endl() + "}"
    }, he.onChangeBlendSelect = function (e, t) {
        "normal" == t ? e.define("BM_NORMAL") : e.removeDefine("BM_NORMAL"), "multiply" == t ? e.define("BM_MULTIPLY") : e.removeDefine("BM_MULTIPLY"), "multiply invert" == t ? e.define("BM_MULTIPLY_INV") : e.removeDefine("BM_MULTIPLY_INV"), "average" == t ? e.define("BM_AVERAGE") : e.removeDefine("BM_AVERAGE"), "add" == t ? e.define("BM_ADD") : e.removeDefine("BM_ADD"), "substract" == t ? e.define("BM_SUBSTRACT") : e.removeDefine("BM_SUBSTRACT"), "difference" == t ? e.define("BM_DIFFERENCE") : e.removeDefine("BM_DIFFERENCE"), "negation" == t ? e.define("BM_NEGATION") : e.removeDefine("BM_NEGATION"), "exclusion" == t ? e.define("BM_EXCLUSION") : e.removeDefine("BM_EXCLUSION"), "lighten" == t ? e.define("BM_LIGHTEN") : e.removeDefine("BM_LIGHTEN"), "darken" == t ? e.define("BM_DARKEN") : e.removeDefine("BM_DARKEN"), "overlay" == t ? e.define("BM_OVERLAY") : e.removeDefine("BM_OVERLAY"), "screen" == t ? e.define("BM_SCREEN") : e.removeDefine("BM_SCREEN"), "softlight" == t ? e.define("BM_SOFTLIGHT") : e.removeDefine("BM_SOFTLIGHT"), "hardlight" == t ? e.define("BM_HARDLIGHT") : e.removeDefine("BM_HARDLIGHT"), "color dodge" == t ? e.define("BM_COLORDODGE") : e.removeDefine("BM_COLORDODGE"), "color burn" == t ? e.define("BM_COLORBURN") : e.removeDefine("BM_COLORBURN")
    }, he.AddBlendSelect = function (e, t) {
        return e.inValueSelect(t, ["normal", "lighten", "darken", "multiply", "multiply invert", "average", "add", "substract", "difference", "negation", "exclusion", "overlay", "screen", "color dodge", "color burn", "softlight", "hardlight"], "normal")
    }, he.setupBlending = function (e, t, n, a) {
        e.setPortGroup("Blending", [n, a]), n.onChange = function () {
            he.onChangeBlendSelect(t, n.get());
            var a = n.get();
            "normal" == a ? a = null : "multiply" == a ? a = "mul" : "multiply invert" == a ? a = "mulinv" : "lighten" == a ? a = "light" : "darken" == a ? a = "darken" : "average" == a ? a = "avg" : "substract" == a ? a = "sub" : "difference" == a ? a = "diff" : "negation" == a ? a = "neg" : "negation" == a ? a = "neg" : "negation" == a ? a = "neg" : "exclusion" == a ? a = "exc" : "overlay" == a ? a = "ovl" : "color dodge" == a ? a = "dodge" : "color burn" == a ? a = "burn" : "softlight" == a ? a = "soft" : "hardlight" == a && (a = "hard"), e.setUiAttrib({
                extendTitle: a
            })
        }
    };
    const fe = {
            "CGL.BLENDMODES": function () {
                this.name = "blendmodes", this.srcHeadFrag = he.getBlendCode()
            },
            "CGL.RANDOM_OLD": function () {
                this.name = "randomNumber", this.srcHeadFrag = "".endl() + "float cgl_random(vec2 co)".endl() + "{".endl() + "    return fract(sin(dot(co.xy ,vec2(12.9898,4.1414))) * 432758.5453);".endl() + "}".endl() + "vec3 cgl_random3(vec2 co)".endl() + "{".endl() + "    return vec3( cgl_random(co),cgl_random(co+0.5711),cgl_random(co+1.5711));".endl() + "}"
            },
            "CGL.RANDOM_LOW": function () {
                this.name = "randomNumber", this.srcHeadFrag = "".endl() + "float cgl_random(vec2 co)".endl() + "{".endl() + "    return fract(sin(dot(co.xy ,vec2(12.9898,4.1414))) * 358.5453);".endl() + "}".endl() + "vec3 cgl_random3(vec2 co)".endl() + "{".endl() + "    return vec3( cgl_random(co),cgl_random(co+0.5711),cgl_random(co+1.5711));".endl() + "}"
            },
            "CGL.RANDOM_TEX": function () {
                this.name = "randomNumbertex", this.srcHeadFrag = "".endl() + "UNI sampler2D CGLRNDTEX;".endl() + "float cgl_random(vec2 co)".endl() + "{".endl() + "    return texture(CGLRNDTEX,co*5711.0).r;".endl() + "}".endl() + "vec3 cgl_random3(vec2 co)".endl() + "{".endl() + "    return texture(CGLRNDTEX,co*5711.0).rgb;".endl() + "}", this.initUniforms = function (e) {
                    return [new oe(e, "t", "CGLRNDTEX", 7)]
                }, this.onBind = function (e, t) {
                    ae.getRandomTexture(e), e.setTexture(7, ae.getRandomTexture(e).tex)
                }
            }
        },
        be = function () {
            return window.performance.now()
        },
        pe = function () {
            return be()
        },
        me = function () {
            this._timeStart = be(), this._timeOffset = 0, this._currentTime = 0, this._lastTime = 0, this._paused = !0, this._delay = 0, this._eventsPaused = !1, this.overwriteTime = -1, this.cbPlayPause = [], this.cbTimeChange = []
        };
    me.prototype._getTime = function () {
        return this._lastTime = (be() - this._timeStart) / 1e3, this._lastTime + this._timeOffset
    }, me.prototype._eventPlayPause = function () {
        if (!this._eventsPaused)
            for (var e in this.cbPlayPause) this.cbPlayPause[e]()
    }, me.prototype._eventTimeChange = function () {
        if (!this._eventsPaused)
            for (var e in this.cbTimeChange) this.cbTimeChange[e]()
    }, me.prototype.setDelay = function (e) {
        this._delay = e, this._eventTimeChange()
    }, me.prototype.isPlaying = function () {
        return !this._paused
    }, me.prototype.update = function () {
        if (!this._paused) return this._currentTime = this._getTime(), this._currentTime
    }, me.prototype.getMillis = function () {
        return 1e3 * this.get()
    }, me.prototype.get = me.prototype.getTime = function () {
        return this.overwriteTime >= 0 ? this.overwriteTime - this._delay : this._currentTime - this._delay
    }, me.prototype.togglePlay = function () {
        this._paused ? this.play() : this.pause()
    }, me.prototype.setTime = function (e) {
        e < 0 && (e = 0), this._timeStart = be(), this._timeOffset = e, this._currentTime = e, this._eventTimeChange()
    }, me.prototype.setOffset = function (e) {
        this._currentTime + e < 0 ? (this._timeStart = be(), this._timeOffset = 0, this._currentTime = 0) : (this._timeOffset += e, this._currentTime = this._lastTime + this._timeOffset), this._eventTimeChange()
    }, me.prototype.play = function () {
        this._timeStart = be(), this._paused = !1, this._eventPlayPause()
    }, me.prototype.pause = function () {
        this._timeOffset = this._currentTime, this._paused = !0, this._eventPlayPause()
    }, me.prototype.pauseEvents = function (e) {
        this._eventsPaused = e
    }, me.prototype.onPlayPause = function (e) {
        e && "function" == typeof e && this.cbPlayPause.push(e)
    }, me.prototype.onTimeChange = function (e) {
        e && "function" == typeof e && this.cbTimeChange.push(e)
    };
    const ge = function (e, t) {
        if (!e) throw new Error("shader constructed without cgl " + t);
        this._cgl = e, this._name = t || "unknown", this.glslVersion = 0, e.glVersion > 1 && (this.glslVersion = 300), this.id = S(), this._program = null, this._uniforms = [], this._drawBuffers = [!0], this._defines = [], this._needsRecompile = !0, this._projMatrixUniform = null, this._mvMatrixUniform = null, this._mMatrixUniform = null, this._vMatrixUniform = null, this._camPosUniform = null, this._normalMatrixUniform = null, this._inverseViewMatrixUniform = null, this._attrVertexPos = -1, this.precision = e.patch.config.glslPrecision || "highp", this._pMatrixState = -1, this._vMatrixState = -1, this._modGroupCount = 0, this._feedBackNames = [], this._attributes = [], this.glPrimitive = null, this.offScreenPass = !1, this._extensions = [], this.srcVert = this.getDefaultVertexShader(), this.srcFrag = this.getDefaultFragmentShader(), this.lastCompile = 0, this._moduleNames = [], this._modules = [], this._moduleNumId = 0, this._libs = [], this._tempNormalMatrix = mat4.create(), this._tempCamPosMatrix = mat4.create(), this._tempInverseViewMatrix = mat4.create(), this.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG"])
    };
    ge.prototype.getCgl = function () {
        return this._cgl
    }, ge.prototype.getName = function () {
        return this._name
    }, ge.prototype.enableExtension = function (e) {
        this.setWhyCompile("enable extension " + e), this._needsRecompile = !0, this._extensions.push(e)
    }, ge.prototype.getAttrVertexPos = function () {
        return this._attrVertexPos
    }, ge.prototype.hasTextureUniforms = function () {
        for (var e = 0; e < this._uniforms.length; e++)
            if ("t" == this._uniforms[e].getType()) return !0;
        return !1
    }, ge.prototype.setWhyCompile = function (e) {}, ge.prototype.setSource = function (e, t) {
        this.srcVert = e, this.srcFrag = t, this.setWhyCompile("Source changed"), this._needsRecompile = !0
    }, ge.prototype._addLibs = function (e) {
        for (var t in fe)
            if (e.indexOf(t) > -1) {
                var n = new fe[t];
                e = e.replace("{{" + t + "}}", n.srcHeadFrag), this._libs.push(n), n.initUniforms && n.initUniforms(this)
            } return e
    }, ge.prototype.compile = function () {
        J.profileShaderCompiles++, J.profileShaderCompileName = this._name;
        var e = "";
        if (this._extensions)
            for (n = 0; n < this._extensions.length; n++) e += "#extension " + this._extensions[n] + " : enable".endl();
        var t = "",
            n = 0;
        for (n = 0; n < this._defines.length; n++) t += "#define " + this._defines[n][0] + " " + this._defines[n][1] + "".endl();
        if (this._uniforms)
            for (n = 0; n < this._uniforms.length; n++) this._uniforms[n].resetLoc();
        this.hasTextureUniforms() && (t += "#define HAS_TEXTURES".endl());
        var a = "",
            i = "";
        if (300 == this.glslVersion) {
            var r = "",
                o = 0;
            if (this.srcFrag.indexOf("outColor0") > -1 && (this._drawBuffers[0] = !0), this.srcFrag.indexOf("outColor1") > -1 && (this._drawBuffers[1] = !0), this.srcFrag.indexOf("outColor2") > -1 && (this._drawBuffers[2] = !0), this.srcFrag.indexOf("outColor3") > -1 && (this._drawBuffers[3] = !0), 1 == this._drawBuffers.length) r = "out vec4 outColor;".endl(), r += "#define gl_FragColor outColor".endl();
            else
                for (o = 0, r += "vec4 outColor;".endl(), n = 0; n < this._drawBuffers.length; n++) 0 == o && (r += "#define gl_FragColor outColor" + n + "".endl()), r += "layout(location = " + n + ") out vec4 outColor" + n + ";".endl(), o++;
            a = "#version 300 es".endl() + "// ".endl() + "// vertex shader " + this._name.endl() + "// ".endl() + "precision " + this.precision + " float;".endl() + "".endl() + "#define WEBGL2".endl() + "#define texture2D texture".endl() + "#define UNI uniform".endl() + "#define IN in".endl() + "#define OUT out".endl(), i = "#version 300 es".endl() + "// ".endl() + "// fragment shader " + this._name.endl() + "// ".endl() + "precision " + this.precision + " float;".endl() + "".endl() + "#define WEBGL2".endl() + "#define texture2D texture".endl() + "#define IN in".endl() + "#define UNI uniform".endl() + r.endl()
        } else i = "".endl() + "// ".endl() + "// fragment shader " + this._name.endl() + "// ".endl() + "#define WEBGL1".endl() + "#define texture texture2D".endl() + "#define outColor gl_FragColor".endl() + "#define IN varying".endl() + "#define UNI uniform".endl(), a = "".endl() + "// ".endl() + "// vertex shader " + this._name.endl() + "// ".endl() + "#define WEBGL1".endl() + "#define texture texture2D".endl() + "#define OUT varying".endl() + "#define IN attribute".endl() + "#define UNI uniform".endl(); - 1 == i.indexOf("precision") && (i = "precision " + this.precision + " float;".endl() + i), -1 == a.indexOf("precision") && (a = "precision " + this.precision + " float;".endl() + a), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (i += "#define MOBILE".endl(), a += "#define MOBILE".endl()), a = e + a + t + this.srcVert, i = e + i + t + this.srcFrag;
        var s = "",
            l = "";
        this._modules.sort(function (e, t) {
            return e.group - t.group
        }), this._modules.sort(function (e, t) {
            return e.priority || 0 - t.priority || 0
        });
        var u = !1;
        for (n = 0; n < this._moduleNames.length; n++) {
            for (var c = "", d = "", h = 0; h < this._modules.length; h++)
                if (this._modules[h].name == this._moduleNames[n]) {
                    if (s += "\n//---- MOD: " + this._modules[h].group + ": " + h + " - " + this._modules[h].title + " ------\n", l += "\n//---- MOD: " + this._modules[h].group + ": " + h + " - " + this._modules[h].title + " ------\n", c += "\n\n//---- MOD: " + this._modules[h].title + " ------\n", d += "\n\n//---- MOD: " + this._modules[h].title + " ------\n", !u) {
                        u = !0;
                        for (var f = 0; f < this._attributes.length; f++) this._attributes[f].name && this._attributes[f].type && (s += "".endl() + "#ifndef ATTRIB_" + this._attributes[f].name.endl() + "  #define ATTRIB_" + this._attributes[f].name.endl() + "  IN " + this._attributes[f].type + " " + this._attributes[f].name + ";".endl() + "#endif", this._attributes[f].nameFrag && (s += "".endl() + "#ifndef ATTRIB_" + this._attributes[f].nameFrag.endl() + "  #define ATTRIB_" + this._attributes[f].nameFrag.endl() + "  OUT " + this._attributes[f].type + " " + this._attributes[f].nameFrag + ";".endl() + "#endif", c += "".endl() + this._attributes[f].nameFrag + "=" + this._attributes[f].name + ";"), l += "".endl() + "#ifndef ATTRIB_" + this._attributes[f].nameFrag.endl() + "  #define ATTRIB_" + this._attributes[f].nameFrag.endl() + "  IN " + this._attributes[f].type + " " + this._attributes[f].nameFrag + ";".endl() + "#endif")
                    }
                    s += this._modules[h].srcHeadVert || "", l += this._modules[h].srcHeadFrag || "", c += this._modules[h].srcBodyVert || "", d += this._modules[h].srcBodyFrag || "", s += "\n//---- end mod ------\n", l += "\n//---- end mod ------\n", d += "\n//---- end mod ------\n", c = (c += "\n//---- end mod ------\n").replace(/{{mod}}/g, this._modules[h].prefix), d = d.replace(/{{mod}}/g, this._modules[h].prefix), s = s.replace(/{{mod}}/g, this._modules[h].prefix), l = l.replace(/{{mod}}/g, this._modules[h].prefix), c = c.replace(/MOD_/g, this._modules[h].prefix), d = d.replace(/MOD_/g, this._modules[h].prefix), s = s.replace(/MOD_/g, this._modules[h].prefix), l = l.replace(/MOD_/g, this._modules[h].prefix)
                } a = a.replace("{{" + this._moduleNames[n] + "}}", c), i = i.replace("{{" + this._moduleNames[n] + "}}", d)
        }
        if (a = a.replace("{{MODULES_HEAD}}", s), i = i.replace("{{MODULES_HEAD}}", l), a = this._addLibs(a), i = this._addLibs(i), this._program)
            for (this._program = this._createProgram(a, i), this._projMatrixUniform = null, n = 0; n < this._uniforms.length; n++) this._uniforms[n].resetLoc();
        else this._program = this._createProgram(a, i);
        this.finalShaderFrag = i, this.finalShaderVert = a, le.lastMesh = null, le.lastShader = null, this._needsRecompile = !1, this.lastCompile = pe()
    }, ge.prototype.bind = function () {
        var e = 0;
        if (le.lastShader = this, this._program && !this._needsRecompile || this.compile(), !this._projMatrixUniform)
            for (this._attrVertexPos = this._cgl.glGetAttribLocation(this._program, se.SHADER.SHADERVAR_VERTEX_POSITION), this._projMatrixUniform = this._cgl.gl.getUniformLocation(this._program, se.SHADER.SHADERVAR_UNI_PROJMAT), this._mvMatrixUniform = this._cgl.gl.getUniformLocation(this._program, "mvMatrix"), this._vMatrixUniform = this._cgl.gl.getUniformLocation(this._program, se.SHADER.SHADERVAR_UNI_VIEWMAT), this._mMatrixUniform = this._cgl.gl.getUniformLocation(this._program, se.SHADER.SHADERVAR_UNI_MODELMAT), this._camPosUniform = this._cgl.gl.getUniformLocation(this._program, se.SHADER.SHADERVAR_UNI_VIEWPOS), this._normalMatrixUniform = this._cgl.gl.getUniformLocation(this._program, se.SHADER.SHADERVAR_UNI_NORMALMAT), this._inverseViewMatrixUniform = this._cgl.gl.getUniformLocation(this._program, se.SHADER.SHADERVAR_UNI_INVVIEWMAT), e = 0; e < this._uniforms.length; e++) this._uniforms[e].needsUpdate = !0;
        for (this._cgl.currentProgram != this._program && (J.profileShaderBinds++, this._cgl.gl.useProgram(this._program), this._cgl.currentProgram = this._program), e = 0; e < this._uniforms.length; e++) this._uniforms[e].needsUpdate && this._uniforms[e].updateValue();
        if (this._pMatrixState != this._cgl.getProjectionMatrixStateCount() && (this._pMatrixState = this._cgl.getProjectionMatrixStateCount(), this._cgl.gl.uniformMatrix4fv(this._projMatrixUniform, !1, this._cgl.pMatrix), J.profileMVPMatrixCount++), this._vMatrixUniform) this._vMatrixState != this._cgl.getViewMatrixStateCount() && (this._cgl.gl.uniformMatrix4fv(this._vMatrixUniform, !1, this._cgl.vMatrix), J.profileMVPMatrixCount++, this._vMatrixState = this._cgl.getViewMatrixStateCount(), this._inverseViewMatrixUniform && (mat4.invert(this._tempInverseViewMatrix, this._cgl.vMatrix), this._cgl.gl.uniformMatrix4fv(this._inverseViewMatrixUniform, !1, this._tempInverseViewMatrix), J.profileMVPMatrixCount++)), this._cgl.gl.uniformMatrix4fv(this._mMatrixUniform, !1, this._cgl.mMatrix), J.profileMVPMatrixCount++, this._camPosUniform && (mat4.invert(this._tempCamPosMatrix, this._cgl.vMatrix), this._cgl.gl.uniform3f(this._camPosUniform, this._tempCamPosMatrix[12], this._tempCamPosMatrix[13], this._tempCamPosMatrix[14]), J.profileMVPMatrixCount++);
        else {
            var t = mat4.create();
            mat4.mul(t, this._cgl.vMatrix, this._cgl.mMatrix), this._cgl.gl.uniformMatrix4fv(this._mvMatrixUniform, !1, t), J.profileMVPMatrixCount++
        }
        for (this._normalMatrixUniform && (mat4.invert(this._tempNormalMatrix, this._cgl.mMatrix), mat4.transpose(this._tempNormalMatrix, this._tempNormalMatrix), this._cgl.gl.uniformMatrix4fv(this._normalMatrixUniform, !1, this._tempNormalMatrix), J.profileMVPMatrixCount++), e = 0; e < this._libs.length; e++) this._libs[e].onBind && this._libs[e].onBind.bind(this._libs[e])(this._cgl, this)
    }, ge.prototype.toggleDefine = function (e, t) {
        t ? this.define(e) : this.removeDefine(e)
    }, ge.prototype.define = function (e, t) {
        t || (t = "");
        for (var n = 0; n < this._defines.length; n++) {
            if (this._defines[n][0] == e && this._defines[n][1] == t) return;
            if (this._defines[n][0] == e) return this._defines[n][1] = t, void(this._needsRecompile = !0)
        }
        this._defines.push([e, t]), this._needsRecompile = !0, this.setWhyCompile("define " + e + " " + t)
    }, ge.prototype.getDefines = function () {
        return this._defines
    }, ge.prototype.getDefine = function (e) {
        for (var t = 0; t < this._defines.length; t++)
            if (this._defines[t][0] == e) return this._defines[t][1];
        return null
    }, ge.prototype.hasDefine = function (e) {
        for (var t = 0; t < this._defines.length; t++)
            if (this._defines[t][0] == e) return !0
    }, ge.prototype.removeDefine = function (e) {
        for (var t = 0; t < this._defines.length; t++)
            if (this._defines[t][0] == e) return this._defines.splice(t, 1), void(this._needsRecompile = !0)
    }, ge.prototype.removeModule = function (e) {
        for (var t = 0; t < this._modules.length; t++)
            if (e && e.id && (this._modules[t].id == e.id || !this._modules[t])) {
                for (var n = !0; n;) {
                    n = !1;
                    for (var a = 0; a < this._uniforms.length; a++) 0 != this._uniforms[a].getName().indexOf(e.prefix) || (this._uniforms.splice(a, 1), n = !0)
                }
                this._needsRecompile = !0, this.setWhyCompile("remove module " + e.title), this._modules.splice(t, 1);
                break
            }
    }, ge.prototype.getNumModules = function () {
        return this._modules.length
    }, ge.prototype.getCurrentModules = function () {
        return this._modules
    }, ge.prototype.addModule = function (e, t) {
        return e.id || (e.id = x()), e.numId || (e.numId = this._moduleNumId), e.num || (e.num = this._modules.length), e.group = t ? t.group : this._modGroupCount++, e.prefix = "mod" + e.group, this._modules.push(e), this._needsRecompile = !0, this.setWhyCompile("add module " + e.title), this._moduleNumId++, e
    }, ge.prototype.setModules = function (e) {
        this._moduleNames = e
    }, ge.prototype.dispose = function () {
        this._cgl.gl.deleteProgram(this._program)
    }, ge.prototype.setDrawBuffers = function (e) {
        this._drawBuffers = e, this._needsRecompile = !0
    }, ge.prototype.getUniforms = function () {
        return this._uniforms
    }, ge.prototype.getUniform = function (e) {
        for (var t = 0; t < this._uniforms.length; t++)
            if (this._uniforms[t].getName() == e) return this._uniforms[t];
        return null
    }, ge.prototype.removeUniform = function (e) {
        for (var t = 0; t < this._uniforms.length; t++) this._uniforms[t].getName() == e && this._uniforms.splice(t, 1);
        this._needsRecompile = !0, this.setWhyCompile("remove uniform " + e)
    }, ge.prototype.addUniform = function (e) {
        this._uniforms.push(e), this.setWhyCompile("add uniform " + name), this._needsRecompile = !0
    }, ge.prototype._createProgram = function (e, t) {
        var n = this._cgl.gl.createProgram();
        return this.vshader = ge.createShader(this._cgl, e, this._cgl.gl.VERTEX_SHADER, this), this.fshader = ge.createShader(this._cgl, t, this._cgl.gl.FRAGMENT_SHADER, this), this._cgl.gl.attachShader(n, this.vshader), this._cgl.gl.attachShader(n, this.fshader), this._linkProgram(n), n
    }, ge.prototype.hasErrors = function () {
        return this._hasErrors
    }, ge.prototype._linkProgram = function (e) {
        this._feedBackNames.length > 0 && this._cgl.gl.transformFeedbackVaryings(e, this._feedBackNames, this._cgl.gl.SEPARATE_ATTRIBS), this._cgl.gl.linkProgram(e), !1 !== this._cgl.patch.config.glValidateShader && (this._cgl.gl.validateProgram(e), this._cgl.gl.getProgramParameter(e, this._cgl.gl.LINK_STATUS) || (console.warn(this._cgl.gl.getShaderInfoLog(this.fshader)), console.warn(this._cgl.gl.getShaderInfoLog(this.vshader)), console.error(name + " shader linking fail..."), m("srcFrag", this.srcFrag), m("srcVert", this.srcVert), m(name + " programinfo: ", this._cgl.gl.getProgramInfoLog(e)), m("--------------------------------------"), m(this), m("--------------------------------------"), name = "errorshader", this.setSource(ge.getDefaultVertexShader(), ge.getErrorFragmentShader())))
    }, ge.prototype.getProgram = function () {
        return this._program
    }, ge.prototype.setFeedbackNames = function (e) {
        this._needsRecompile = !0, this._feedBackNames = e
    }, ge.prototype.getDefaultVertexShader = ge.getDefaultVertexShader = function () {
        return "".endl() + "{{MODULES_HEAD}}".endl() + "IN vec3 vPosition;".endl() + "IN vec2 attrTexCoord;".endl() + "IN vec3 attrVertNormal;".endl() + "IN float attrVertIndex;".endl() + "OUT vec2 texCoord;".endl() + "OUT vec3 norm;".endl() + "UNI mat4 projMatrix;".endl() + "UNI mat4 viewMatrix;".endl() + "UNI mat4 modelMatrix;".endl() + "void main()".endl() + "{".endl() + "   texCoord=attrTexCoord;".endl() + "   norm=attrVertNormal;".endl() + "   vec4 pos=vec4(vPosition,  1.0);".endl() + "   mat4 mMatrix=modelMatrix;".endl() + "   {{MODULE_VERTEX_POSITION}}".endl() + "   gl_Position = projMatrix * (viewMatrix*mMatrix) * pos;".endl() + "}"
    }, ge.prototype.getDefaultFragmentShader = ge.getDefaultFragmentShader = function (e, t, n) {
        return null == e && (e = .5, t = .5, n = .5), "".endl() + "IN vec2 texCoord;".endl() + "{{MODULES_HEAD}}".endl() + "void main()".endl() + "{".endl() + "    vec4 col=vec4(" + e + "," + t + "," + n + ",1.0);".endl() + "    {{MODULE_COLOR}}".endl() + "    outColor = col;".endl() + "}"
    }, ge.prototype.addAttribute = function (e) {
        for (var t = 0; t < this._attributes.length; t++)
            if (this._attributes[t].name == e.name && this._attributes[t].nameFrag == e.nameFrag) return;
        this._attributes.push(e), this._needsRecompile = !0
    }, ge.getErrorFragmentShader = function () {
        return "".endl() + "void main()".endl() + "{".endl() + "   float g=mod((gl_FragCoord.y+gl_FragCoord.x),50.0)/50.0;".endl() + "   g= step(0.1,g);".endl() + "   outColor = vec4( g+0.5, 0.0, 0.0, 1.0);".endl() + "}"
    }, ge.createShader = function (e, t, n, a) {
        var i = e.gl.createShader(n);
        if (e.gl.shaderSource(i, t), e.gl.compileShader(i), !e.gl.getShaderParameter(i, e.gl.COMPILE_STATUS)) {
            m("compile status: "), n == e.gl.VERTEX_SHADER && m("VERTEX_SHADER"), n == e.gl.FRAGMENT_SHADER && m("FRAGMENT_SHADER"), console.warn(e.gl.getShaderInfoLog(i));
            var r = e.gl.getShaderInfoLog(i),
                o = function (e) {
                    var t = [],
                        n = r.split("\n");
                    for (var a in n) {
                        var i = n[a].split(":");
                        parseInt(i[2], 10) && t.push(parseInt(i[2], 10))
                    }
                    return t
                }(),
                s = '<div class="shaderErrorCode">',
                l = t.match(/^.*((\r\n|\n|\r)|$)/gm);
            for (var u in l) {
                var c = parseInt(u, 10) + 1,
                    d = c + ": " + l[u];
                m(d);
                var h = !1;
                for (var f in o) o[f] == c && (h = !0);
                h && (s += '<span class="error">'), s += d, h && (s += "</span>")
            }
            console.warn(r), s = (r = r.replace(/\n/g, "<br/>")) + "<br/>" + s + "<br/><br/>", e.patch.emitEvent("criticalError", "Shader error " + name, s), e.patch.isEditorMode() && m("Shader error " + name, s), s += "</div>", name = "errorshader", a.setSource(ge.getDefaultVertexShader(), ge.getErrorFragmentShader())
        }
        return i
    };
    const ve = Math.PI / 180,
        _e = (Math.PI, -1 != window.navigator.userAgent.indexOf("Windows")),
        Oe = function (e) {
            var t;
            if (e.wheelDelta) t = e.wheelDelta % 120 - 0 == -0 ? e.wheelDelta / 120 : e.wheelDelta / 30, t *= -1.5, _e && (t *= 2);
            else {
                var n = e.deltaY;
                e.shiftKey && (n = e.deltaX);
                var a = n || e.detail;
                t = -(a % 3 ? 10 * a : a / 3), t *= -3
            }
            return t > 20 && (t = 20), t < -20 && (t = -20), t
        },
        Ie = Oe,
        Ae = Oe,
        Ee = function () {
            this._arr = [mat4.create()], this._index = 0, this.stateCounter = 0
        };
    Ee.prototype.push = function (e) {
        if (this._index++, this.stateCounter++, this._index == this._arr.length) {
            var t = mat4.create();
            this._arr.push(t)
        }
        return mat4.copy(this._arr[this._index], e || this._arr[this._index - 1]), this._arr[this._index]
    }, Ee.prototype.pop = function () {
        return this.stateCounter++, this._index--, this._index < 0 && (this._index = 0), this._arr[this._index]
    }, Ee.prototype.length = function () {
        return this._index
    };
    const Me = function (e) {
        var t = this,
            n = [0, 0, 0, 0];
        this.glVersion = 0, this.glUseHalfFloatTex = !1, this.clearCanvasTransparent = !0, this.clearCanvasDepth = !0, this.patch = e, this.temporaryTexture = null, this.frameStore = {}, this.gl = null, this.pMatrix = mat4.create(), this.mMatrix = mat4.create(), this.vMatrix = mat4.create(), this._textureslots = [], this._pMatrixStack = new Ee, this._mMatrixStack = new Ee, this._vMatrixStack = new Ee, this._glFrameBufferStack = [], this._frameBufferStack = [], this._shaderStack = [], Object.defineProperty(this, "mvMatrix", {
            get() {
                return this.mMatrix
            },
            set(e) {
                this.mMatrix = e
            }
        }), this.canvas = null, this.pixelDensity = 1, mat4.identity(this.mMatrix), mat4.identity(this.vMatrix);
        var a = new ge(this, "simpleshader");
        a.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG"]), a.setSource(ge.getDefaultVertexShader(), ge.getDefaultFragmentShader());
        var i = a,
            r = [];
        this.addEventListener = function (e, t) {
            "resize" == e && r.push(t)
        }, this.removeEventListener = function (e, t) {
            if ("resize" == e)
                for (var n in r)
                    if (r[n] == t) return void r.splice(n, 1)
        }, this.exitError = function (e, t) {
            this.patch.exitError(e, t), this.aborted = !0
        }, this.setCanvas = function (e) {
            if (this.canvas = "string" == typeof e ? document.getElementById(e) : e, this.patch.config.canvas || (this.patch.config.canvas = {}), this.patch.config.canvas.hasOwnProperty("preserveDrawingBuffer") || (this.patch.config.canvas.preserveDrawingBuffer = !1), this.patch.config.canvas.hasOwnProperty("premultipliedAlpha") || (this.patch.config.canvas.premultipliedAlpha = !1), this.patch.config.canvas.hasOwnProperty("alpha") || (this.patch.config.canvas.alpha = !1), this.patch.config.hasOwnProperty("clearCanvasColor") && (this.clearCanvasTransparent = this.patch.config.clearCanvasColor), this.patch.config.hasOwnProperty("clearCanvasDepth") && (this.clearCanvasDepth = this.patch.config.clearCanvasDepth), this.patch.config.canvas.forceWebGl1 || (this.gl = this.canvas.getContext("webgl2", this.patch.config.canvas)), this.gl ? this.glVersion = 2 : (this.gl = this.canvas.getContext("webgl", this.patch.config.canvas) || this.canvas.getContext("experimental-webgl", this.patch.config.canvas), this.glVersion = 1, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && (this.glUseHalfFloatTex = !0), /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && (this.patch.config.canvas.hasOwnProperty("powerPreference") || (this.patch.config.canvas.powerPreference = "high-performance"))), this.gl) {
                this.gl.getExtension("GL_OES_standard_derivatives");
                var n = this.gl.getExtension("ANGLE_instanced_arrays") || this.gl;
                n.vertexAttribDivisorANGLE && (this.gl.vertexAttribDivisor = n.vertexAttribDivisorANGLE.bind(n), this.gl.drawElementsInstanced = n.drawElementsInstancedANGLE.bind(n)), t.updateSize()
            } else this.exitError("NO_WEBGL", "sorry, could not initialize WebGL. Please check if your Browser supports WebGL.")
        }, this.updateSize = function () {
            this.canvas.width = this.canvasWidth = this.canvas.clientWidth * this.pixelDensity, this.canvas.height = this.canvasHeight = this.canvas.clientHeight * this.pixelDensity
        }, this.canvasWidth = -1, this.canvasHeight = -1, this.canvasScale = 1;
        var o = -1,
            s = -1;
        this.getViewPort = function () {
            return n
        }, this.resetViewPort = function () {
            this.gl.viewport(n[0], n[1], n[2], n[3])
        }, this.setViewPort = function (e, t, a, i) {
            n[0] = Math.round(e), n[1] = Math.round(t), n[2] = Math.round(a), n[3] = Math.round(i), this.gl.viewport(n[0], n[1], n[2], n[3])
        }, this.beginFrame = function () {
            CABLES.UI && (gui.metaTexturePreviewer.render(), CABLES.UI.patchPreviewer && CABLES.UI.patchPreviewer.render()), t.setShader(a)
        }, this.screenShot = function (e, t) {
            t && (this.gl.clearColor(1, 1, 1, 1), this.gl.colorMask(!1, !1, !1, !0), this.gl.clear(this.gl.COLOR_BUFFER_BIT), this.gl.colorMask(!0, !0, !0, !0)), this.canvas && this.canvas.toBlob && this.canvas.toBlob(t => {
                e ? e(t) : m("no screenshot callback...")
            })
        }, this.endFrame = function () {
            if (CABLES.UI && CABLES.GL_MARKER.drawMarkerLayer(this), t.setPreviousShader(), this._vMatrixStack.length() > 0 && g("view matrix stack length !=0 at end of rendering..."), this._mMatrixStack.length() > 0 && g("mvmatrix stack length !=0 at end of rendering..."), this._pMatrixStack.length() > 0 && g("pmatrix stack length !=0 at end of rendering..."), this._glFrameBufferStack.length > 0 && g("glFrameBuffer stack length !=0 at end of rendering..."), this._stackDepthTest.length > 0 && g("depthtest stack length !=0 at end of rendering..."), this._stackDepthWrite.length > 0 && g("depthwrite stack length !=0 at end of rendering..."), this._stackDepthFunc.length > 0 && g("depthfunc stack length !=0 at end of rendering..."), this._stackBlend.length > 0 && g("blend stack length !=0 at end of rendering..."), this._stackBlendMode.length > 0 && g("blendMode stack length !=0 at end of rendering..."), this._shaderStack.length > 0 && g("this._shaderStack length !=0 at end of rendering..."), o != t.canvasWidth || s != t.canvasHeight) {
                o = t.canvasWidth, s = t.canvasHeight, this.setSize(t.canvasWidth / this.pixelDensity, t.canvasHeight / this.pixelDensity), this.updateSize();
                for (var e = 0; e < r.length; e++) r[e]()
            }
        }, this.getShader = function () {
            if (i && (!this.frameStore || !0 === this.frameStore.renderOffscreen == i.offScreenPass == 1)) return i;
            for (var e = this._shaderStack.length - 1; e >= 0; e--)
                if (this._shaderStack[e] && this.frameStore.renderOffscreen == this._shaderStack[e].offScreenPass) return this._shaderStack[e]
        }, this.getDefaultShader = function () {
            return a
        }, this.setShader = function (e) {
            this._shaderStack.push(e), i = e
        }, this.setPreviousShader = function () {
            if (0 === this._shaderStack.length) throw "Invalid shader stack pop!";
            this._shaderStack.pop(), i = this._shaderStack[this._shaderStack.length - 1]
        }, this.pushGlFrameBuffer = function (e) {
            this._glFrameBufferStack.push(e)
        }, this.popGlFrameBuffer = function () {
            return 0 == this._glFrameBufferStack.length ? null : (this._glFrameBufferStack.pop(), this._glFrameBufferStack[this._glFrameBufferStack.length - 1])
        }, this.getCurrentGlFrameBuffer = function () {
            return 0 === this._glFrameBufferStack.length ? null : this._glFrameBufferStack[this._glFrameBufferStack.length - 1]
        }, this.pushFrameBuffer = function (e) {
            this._frameBufferStack.push(e)
        }, this.popFrameBuffer = function () {
            return 0 == this._frameBufferStack.length ? null : (this._frameBufferStack.pop(), this._frameBufferStack[this._frameBufferStack.length - 1])
        }, this.getCurrentFrameBuffer = function () {
            return 0 === this._frameBufferStack.length ? null : this._frameBufferStack[this._frameBufferStack.length - 1]
        };
        var l = vec3.create();
        vec3.set(l, 0, 0, 2);
        var u = vec3.create();
        vec3.set(u, 0, 0, 0), this.renderStart = function (e, t, n) {
            t || (t = u), n || (n = l), this.pushDepthTest(!0), this.pushDepthWrite(!0), this.pushDepthFunc(e.gl.LEQUAL), this.clearCanvasTransparent && (e.gl.clearColor(0, 0, 0, 0), e.gl.clear(e.gl.COLOR_BUFFER_BIT)), this.clearCanvasDepth && e.gl.clear(e.gl.DEPTH_BUFFER_BIT), e.setViewPort(0, 0, e.canvasWidth, e.canvasHeight), mat4.perspective(e.pMatrix, 45, e.canvasWidth / e.canvasHeight, .1, 1e3), mat4.identity(e.mMatrix), mat4.identity(e.vMatrix), mat4.translate(e.mMatrix, e.mMatrix, t), mat4.translate(e.vMatrix, e.vMatrix, n), e.pushPMatrix(), e.pushModelMatrix(), e.pushViewMatrix(), e.pushBlendMode(se.BLEND_MODES.BLEND_NORMAL, !1);
            for (var a = 0; a < this._textureslots.length; a++) this._textureslots[a] = null;
            e.beginFrame()
        }, this.renderEnd = function (e, t) {
            e.popViewMatrix(), e.popModelMatrix(), e.popPMatrix(), this.popDepthTest(), this.popDepthWrite(), this.popDepthFunc(), this.popBlend(), this.popBlendMode(), e.endFrame()
        }, this.getTexture = function (e) {
            return this._textureslots[e]
        }, this.setTexture = function (e, t, n) {
            this._textureslots[e] != t && (this.gl.activeTexture(this.gl.TEXTURE0 + e), this.gl.bindTexture(n || this.gl.TEXTURE_2D, t), this._textureslots[e] = t)
        }, this.fullScreen = function () {
            this.canvas.requestFullscreen ? this.canvas.requestFullscreen() : this.canvas.mozRequestFullScreen ? this.canvas.mozRequestFullScreen() : this.canvas.webkitRequestFullscreen ? this.canvas.webkitRequestFullscreen() : this.canvas.msRequestFullscreen && this.canvas.msRequestFullscreen()
        }, this.setSize = function (e, t) {
            this.canvas.style.width = e + "px", this.canvas.style.height = t + "px", this.canvas.width = e * this.pixelDensity, this.canvas.height = t * this.pixelDensity, this.updateSize()
        }, this._resizeToWindowSize = function () {
            this.setSize(window.innerWidth, window.innerHeight), this.updateSize()
        }, this._resizeToParentSize = function () {
            var e = this.canvas.parentElement;
            e ? (this.setSize(e.clientWidth, e.clientHeight), this.updateSize()) : console.error("cables: can not resize to container element")
        }, this.setAutoResize = function (e) {
            window.removeEventListener("resize", this._resizeToWindowSize.bind(this)), window.removeEventListener("resize", this._resizeToParentSize.bind(this)), "window" == e && (window.addEventListener("resize", this._resizeToWindowSize.bind(this)), window.addEventListener("orientationchange", this._resizeToWindowSize.bind(this)), this._resizeToWindowSize()), "parent" == e && (window.addEventListener("resize", this._resizeToParentSize.bind(this)), this._resizeToParentSize())
        }, this.printError = function (e) {
            var t = this.gl.getError();
            if (t != this.gl.NO_ERROR) {
                var n = "";
                t == this.gl.OUT_OF_MEMORY && (n = "OUT_OF_MEMORY"), t == this.gl.INVALID_ENUM && (n = "INVALID_ENUM"), t == this.gl.INVALID_OPERATION && (n = "INVALID_OPERATION"), t == this.gl.INVALID_FRAMEBUFFER_OPERATION && (n = "INVALID_FRAMEBUFFER_OPERATION"), t == this.gl.INVALID_VALUE && (n = "INVALID_VALUE"), t == this.gl.CONTEXT_LOST_WEBGL && (n = "CONTEXT_LOST_WEBGL"), t == this.gl.NO_ERROR && (n = "NO_ERROR"), m("gl error: ", e, t, n)
            }
        }, this.saveScreenshot = function (e, t, n, a) {
            this.patch.renderOneFrame();
            var i = this.canvas.clientWidth,
                r = this.canvas.clientHeight;

            function o(e, t, n) {
                return Array(t - String(e).length + 1).join(n || "0") + e
            }
            n && (this.canvas.width = n, i = n), a && (this.canvas.height = a, r = a);
            var s = new Date,
                l = "".concat(String(s.getFullYear()) + String(s.getMonth() + 1) + String(s.getDate()), "_").concat(o(s.getHours(), 2)).concat(o(s.getMinutes(), 2)).concat(o(s.getSeconds(), 2));
            e ? e += ".png" : e = "cables_" + l + ".png", this.patch.cgl.screenShot(function (n) {
                if (this.canvas.width = i, this.canvas.height = r, n) {
                    var a = document.createElement("a");
                    a.download = e, a.href = URL.createObjectURL(n), setTimeout(function () {
                        a.click(), t && t(n)
                    }, 100)
                } else m("screenshot: no blob")
            }.bind(this), !0)
        }
    };
    Me.prototype.pushViewMatrix = function () {
        this.vMatrix = this._vMatrixStack.push(this.vMatrix)
    }, Me.prototype.popViewMatrix = function () {
        this.vMatrix = this._vMatrixStack.pop()
    }, Me.prototype.getViewMatrixStateCount = function () {
        return this._vMatrixStack.stateCounter
    }, Me.prototype.pushPMatrix = function () {
        this.pMatrix = this._pMatrixStack.push(this.pMatrix)
    }, Me.prototype.popPMatrix = function () {
        return this.pMatrix = this._pMatrixStack.pop(), this.pMatrix
    }, Me.prototype.getProjectionMatrixStateCount = function () {
        return this._pMatrixStack.stateCounter
    }, Me.prototype.pushMvMatrix = Me.prototype.pushModelMatrix = function () {
        this.mMatrix = this._mMatrixStack.push(this.mMatrix)
    }, Me.prototype.popMvMatrix = Me.prototype.popmMatrix = Me.prototype.popModelMatrix = function () {
        return this.mMatrix = this._mMatrixStack.pop(), this.mMatrix
    }, Me.prototype.modelMatrix = function () {
        return this.mMatrix
    }, Me.prototype._stackDepthTest = [], Me.prototype.pushDepthTest = function (e) {
        this._stackDepthTest.push(e), e ? this.gl.enable(this.gl.DEPTH_TEST) : this.gl.disable(this.gl.DEPTH_TEST)
    }, Me.prototype.stateDepthTest = function () {
        return this._stackDepthTest[this._stackDepthTest.length - 1]
    }, Me.prototype.popDepthTest = function () {
        this._stackDepthTest.pop(), this._stackDepthTest[this._stackDepthTest.length - 1] ? this.gl.enable(this.gl.DEPTH_TEST) : this.gl.disable(this.gl.DEPTH_TEST)
    }, Me.prototype._stackDepthWrite = [], Me.prototype.pushDepthWrite = function (e) {
        this._stackDepthWrite.push(e), this.gl.depthMask(e)
    }, Me.prototype.stateDepthWrite = function () {
        return this._stackDepthWrite[this._stackDepthWrite.length - 1]
    }, Me.prototype.popDepthWrite = function () {
        this._stackDepthWrite.pop(), this.gl.depthMask(this._stackDepthWrite[this._stackDepthWrite.length - 1])
    }, Me.prototype._stackDepthFunc = [], Me.prototype.pushDepthFunc = function (e) {
        this._stackDepthFunc.push(e), this.gl.depthFunc(e)
    }, Me.prototype.stateDepthFunc = function () {
        return this._stackDepthFunc.length > 0 && this._stackDepthFunc[this._stackDepthFunc.length - 1]
    }, Me.prototype.popDepthFunc = function () {
        this._stackDepthFunc.pop(), this._stackDepthFunc.length > 0 && this.gl.depthFunc(this._stackDepthFunc[this._stackDepthFunc.length - 1])
    }, Me.prototype._stackBlend = [], Me.prototype.pushBlend = function (e) {
        this._stackBlend.push(e), e ? this.gl.enable(this.gl.BLEND) : this.gl.disable(this.gl.BLEND)
    }, Me.prototype.popBlend = function () {
        this._stackBlend.pop(), this._stackBlend[this._stackBlend.length - 1] ? this.gl.enable(this.gl.BLEND) : this.gl.disable(this.gl.BLEND)
    }, Me.prototype.stateBlend = function () {
        return this._stackBlend[this._stackBlend.length - 1]
    }, Me.prototype._stackBlendMode = [], Me.prototype._stackBlendModePremul = [], Me.prototype.pushBlendMode = function (e, t) {
        this._stackBlendMode.push(e), this._stackBlendModePremul.push(t);
        const n = this._stackBlendMode.length - 1;
        this.pushBlend(this._stackBlendMode[n] !== se.BLEND_MODES.BLEND_NONE), this._setBlendMode(this._stackBlendMode[n], this._stackBlendModePremul[n])
    }, Me.prototype.popBlendMode = function () {
        this._stackBlendMode.pop(), this._stackBlendModePremul.pop();
        const e = this._stackBlendMode.length - 1;
        this.popBlend(this._stackBlendMode[e] !== se.BLEND_MODES.BLEND_NONE), e > 0 && this._setBlendMode(this._stackBlendMode[e], this._stackBlendModePremul[e])
    }, Me.prototype.glGetAttribLocation = function (e, t) {
        return this.gl.getAttribLocation(e, t)
    }, Me.prototype._setBlendMode = function (e, t) {
        const n = this.gl;
        e == se.BLEND_MODES.BLEND_NONE || (e == se.BLEND_MODES.BLEND_ADD ? t ? (n.blendEquationSeparate(n.FUNC_ADD, n.FUNC_ADD), n.blendFuncSeparate(n.ONE, n.ONE, n.ONE, n.ONE)) : (n.blendEquation(n.FUNC_ADD), n.blendFunc(n.SRC_ALPHA, n.ONE)) : e == se.BLEND_MODES.BLEND_SUB ? t ? (n.blendEquationSeparate(n.FUNC_ADD, n.FUNC_ADD), n.blendFuncSeparate(n.ZERO, n.ZERO, n.ONE_MINUS_SRC_COLOR, n.ONE_MINUS_SRC_ALPHA)) : (n.blendEquation(n.FUNC_ADD), n.blendFunc(n.ZERO, n.ONE_MINUS_SRC_COLOR)) : e == se.BLEND_MODES.BLEND_MUL ? t ? (n.blendEquationSeparate(n.FUNC_ADD, n.FUNC_ADD), n.blendFuncSeparate(n.ZERO, n.SRC_COLOR, n.ZERO, n.SRC_ALPHA)) : (n.blendEquation(n.FUNC_ADD), n.blendFunc(n.ZERO, n.SRC_COLOR)) : e == se.BLEND_MODES.BLEND_NORMAL ? t ? (n.blendEquationSeparate(n.FUNC_ADD, n.FUNC_ADD), n.blendFuncSeparate(n.ONE, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA)) : (n.blendEquationSeparate(n.FUNC_ADD, n.FUNC_ADD), n.blendFuncSeparate(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA)) : m("setblendmode: unknown blendmode"))
    };
    const Te = Object.assign({
        Framebuffer: function (e, t, n, a) {
            var i = e,
                r = i.gl.getExtension("WEBGL_depth_texture") || i.gl.getExtension("WEBKIT_WEBGL_depth_texture") || i.gl.getExtension("MOZ_WEBGL_depth_texture") || i.gl.DEPTH_TEXTURE;
            r || i.exitError("NO_DEPTH_TEXTURE", "no depth texture support");
            var o = t || 512,
                s = n || 512;
            (a = a || {
                isFloatingPointTexture: !1
            }).hasOwnProperty("filter") || (a.filter = ae.FILTER_LINEAR);
            var l = new ae(i, {
                    isFloatingPointTexture: a.isFloatingPointTexture,
                    filter: a.filter,
                    wrap: ae.CLAMP_TO_EDGE
                }),
                u = null;
            r && (u = new ae(i, {
                isDepthTexture: !0
            }));
            var c = i.gl.createFramebuffer(),
                d = i.gl.createRenderbuffer();
            this.getWidth = function () {
                return o
            }, this.getHeight = function () {
                return s
            }, this.getGlFrameBuffer = function () {
                return c
            }, this.getDepthRenderBuffer = function () {
                return d
            }, this.getTextureColor = function () {
                return l
            }, this.getTextureDepth = function () {
                return u
            }, this.setFilter = function (e) {
                l.filter = e, l.setSize(o, s)
            }, this.setSize = function (e, t) {
                if (e < 2 && (e = 2), t < 2 && (t = 2), o = Math.ceil(e), s = Math.ceil(t), J.profileFrameBuffercreate++, i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, c), i.gl.bindRenderbuffer(i.gl.RENDERBUFFER, d), l.setSize(o, s), u && u.setSize(o, s), r && i.gl.renderbufferStorage(i.gl.RENDERBUFFER, i.gl.DEPTH_COMPONENT16, o, s), i.gl.framebufferTexture2D(i.gl.FRAMEBUFFER, i.gl.COLOR_ATTACHMENT0, i.gl.TEXTURE_2D, l.tex, 0), r && (i.gl.framebufferRenderbuffer(i.gl.FRAMEBUFFER, i.gl.DEPTH_ATTACHMENT, i.gl.RENDERBUFFER, d), i.gl.framebufferTexture2D(i.gl.FRAMEBUFFER, i.gl.DEPTH_ATTACHMENT, i.gl.TEXTURE_2D, u.tex, 0)), !i.gl.isFramebuffer(c)) throw "Invalid framebuffer";
                var n = i.gl.checkFramebufferStatus(i.gl.FRAMEBUFFER);
                switch (n) {
                    case i.gl.FRAMEBUFFER_COMPLETE:
                        break;
                    case i.gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                        throw m("FRAMEBUFFER_INCOMPLETE_ATTACHMENT...", o, s, l.tex, d), new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
                    case i.gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                        throw m("FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT"), new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
                    case i.gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                        throw m("FRAMEBUFFER_INCOMPLETE_DIMENSIONS"), new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
                    case i.gl.FRAMEBUFFER_UNSUPPORTED:
                        throw m("FRAMEBUFFER_UNSUPPORTED"), new Error("Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED");
                    default:
                        throw m("incomplete framebuffer", n), new Error("Incomplete framebuffer: " + n)
                }
                i.gl.bindTexture(i.gl.TEXTURE_2D, null), i.gl.bindRenderbuffer(i.gl.RENDERBUFFER, null), i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, null)
            }, this.renderStart = function () {
                i.pushModelMatrix(), i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, c), i.pushGlFrameBuffer(c), i.pushFrameBuffer(this), i.pushPMatrix(), i.gl.viewport(0, 0, o, s), i.gl.clearColor(0, 0, 0, 0), i.gl.clear(i.gl.COLOR_BUFFER_BIT | i.gl.DEPTH_BUFFER_BIT)
            }, this.renderEnd = function () {
                i.popPMatrix(), i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, i.popGlFrameBuffer()), i.popFrameBuffer(), i.popModelMatrix(), i.resetViewPort()
            }, this.delete = function () {
                l.delete(), u && u.delete(), i.gl.deleteRenderbuffer(d), i.gl.deleteFramebuffer(c)
            }, this.setSize(o, s)
        },
        Framebuffer2: ie,
        Geometry: re,
        Marker: function (e) {
            var t = new re("marker");
            t.setPointVertices([1e-5, 0, 0, 1, 0, 0, 0, 1e-5, 0, 0, 1, 0, 0, 0, 1e-5, 0, 0, 1]);
            var n = new ue(e, t, e.gl.LINES);
            n.setGeom(t);
            var a = new ge(e, "markermaterial"),
                i = "".endl() + "precision highp float;".endl() + "IN vec3 axisColor;".endl() + "void main()".endl() + "{".endl() + "    vec4 col=vec4(axisColor,1.0);".endl() + "    outColor = col;".endl() + "}",
                r = "".endl() + "IN vec3 vPosition;".endl() + "UNI mat4 projMatrix;".endl() + "UNI mat4 mvMatrix;".endl() + "OUT vec3 axisColor;".endl() + "void main()".endl() + "{".endl() + "   vec4 pos=vec4(vPosition, 1.0);".endl() + "   if(pos.x!=0.0)axisColor=vec3(1.0,0.3,0.0);".endl() + "   if(pos.y!=0.0)axisColor=vec3(0.0,1.0,0.2);".endl() + "   if(pos.z!=0.0)axisColor=vec3(0.0,0.5,1.0);".endl() + "   gl_Position = projMatrix * mvMatrix * pos;".endl() + "}";
            a.setSource(r, i), this._vScale = vec3.create(), this.draw = function (e) {
                e.pushModelMatrix(), e.setShader(a), vec3.set(this._vScale, 2, 2, 2), mat4.scale(e.mvMatrix, e.mvMatrix, this._vScale), e.pushDepthTest(!1), n.render(e.getShader()), e.popDepthTest(), e.setPreviousShader(), e.popModelMatrix()
            }
        },
        WirePoint: function (e, t) {
            var n = e.gl.createBuffer(),
                a = vec3.create();
            this.render = function (e, t) {
                    e.pushModelMatrix(), vec3.set(a, t, t, t), mat4.scale(e.mvMatrix, e.mvMatrix, a);
                    var i = e.getShader();
                    i.bind(), e.gl.bindBuffer(e.gl.ARRAY_BUFFER, n), e.gl.vertexAttribPointer(i.getAttrVertexPos(), n.itemSize, e.gl.FLOAT, !1, 0, 0), e.gl.enableVertexAttribArray(i.getAttrVertexPos()), e.gl.bindBuffer(e.gl.ARRAY_BUFFER, n), e.gl.drawArrays(e.gl.LINE_STRIP, 0, n.numItems), e.popModelMatrix()
                },
                function () {
                    var t = [],
                        a = 0,
                        i = 0;
                    for (a = 0; a <= Math.round(24); a++) i = 360 / Math.round(24) * a * ve, t.push(.5 * Math.cos(i)), t.push(0), t.push(.5 * Math.sin(i));
                    for (a = 0; a <= Math.round(24); a++) i = 360 / Math.round(24) * a * ve, t.push(.5 * Math.cos(i)), t.push(.5 * Math.sin(i)), t.push(0);
                    for (a = 0; a <= Math.round(24); a++) i = 360 / Math.round(24) * a * ve, t.push(0), t.push(.5 * Math.cos(i)), t.push(.5 * Math.sin(i));
                    e.gl.bindBuffer(e.gl.ARRAY_BUFFER, n), e.gl.bufferData(e.gl.ARRAY_BUFFER, new Float32Array(t), e.gl.STATIC_DRAW), n.itemSize = 3, n.numItems = t.length / n.itemSize
                }()
        },
        WireCube: function (e) {
            var t, n = e.gl.createBuffer(),
                a = vec3.create();
            this.render = function (e, t, i, r) {
                e.pushModelMatrix(), vec3.set(a, t || 1, i || 1, r || 1), mat4.scale(e.mvMatrix, e.mvMatrix, a);
                var o = e.getShader();
                o.bind(), e.gl.bindBuffer(e.gl.ARRAY_BUFFER, n), e.gl.vertexAttribPointer(o.getAttrVertexPos(), n.itemSize, e.gl.FLOAT, !1, 0, 0), e.gl.enableVertexAttribArray(o.getAttrVertexPos()), e.gl.bindBuffer(e.gl.ARRAY_BUFFER, n), e.gl.drawArrays(e.gl.LINE_STRIP, 0, n.numItems), e.popModelMatrix()
            }, (t = []).push(-1, -1, 1), t.push(1, -1, 1), t.push(1, 1, 1), t.push(-1, 1, 1), t.push(-1, -1, 1), t.push(-1, -1, -1), t.push(1, -1, -1), t.push(1, 1, -1), t.push(-1, 1, -1), t.push(-1, -1, -1), t.push(-1, -1, -1), t.push(-1, 1, -1), t.push(-1, 1, 1), t.push(-1, -1, 1), t.push(-1, -1, -1), t.push(1, -1, -1), t.push(1, 1, -1), t.push(1, 1, 1), t.push(1, -1, 1), t.push(1, -1, -1), e.gl.bindBuffer(e.gl.ARRAY_BUFFER, n), e.gl.bufferData(e.gl.ARRAY_BUFFER, new Float32Array(t), e.gl.STATIC_DRAW), n.itemSize = 3, n.numItems = t.length / n.itemSize
        },
        MatrixStack: Ee,
        Mesh: ue,
        MESH: le,
        ShaderLibMods: fe,
        Shader: ge,
        Uniform: oe,
        MESHES: de,
        Context: Me,
        Texture: ae,
        TextureEffect: he,
        isWindows: _e,
        getWheelSpeed: Ie,
        getWheelDelta: Ae,
        onLoadingAssetsFinished: null,
        profileData: J
    }, se.BLEND_MODES, se.SHADER, se.MATH, se.BLEND_MODES);
    window.CGL = Te;
    const ye = function (e) {
        this._loadingAssets = {}, this._cbFinished = [], this._percent = 0, this._count = 0, this._countFinished = 0, this._order = 0, this._startTime = 0, this._patch = e
    };
    ye.prototype.setOnFinishedLoading = function (e) {
        this._cbFinished.push(e)
    }, ye.prototype.getNumAssets = function () {
        return this._countFinished
    }, ye.prototype.getProgress = function () {
        return this._percent
    }, ye.prototype.checkStatus = function () {
        for (var e in this._countFinished = 0, this._count = 0, this._loadingAssets) this._count++, this._loadingAssets[e].finished || this._countFinished++;
        if (this._percent = (this._count - this._countFinished) / this._count, 0 === this._countFinished) {
            for (var t = 0; t < this._cbFinished.length; t++) setTimeout(this._cbFinished[t], 200);
            this.print()
        }
    }, ye.prototype.print = function () {
        if (!this._patch.config.silent) {
            var e = [];
            for (var t in this._loadingAssets) e.push([this._loadingAssets[t].order, this._loadingAssets[t].type, this._loadingAssets[t].name, (this._loadingAssets[t].timeEnd - this._loadingAssets[t].timeStart) / 1e3 + "s"]);
            console.groupCollapsed("finished loading " + this._order + " assets in " + (Date.now() - this._startTime) / 1e3 + "s"), console.table(e), console.groupEnd()
        }
    }, ye.prototype.finished = function (e) {
        this._loadingAssets[e] && (this._loadingAssets[e].finished = !0, this._loadingAssets[e].timeEnd = Date.now()), this.checkStatus()
    }, ye.prototype.start = function (e, t) {
        0 == this._startTime && (this._startTime = Date.now());
        var n = x();
        return this._loadingAssets[n] = {
            id: n,
            type: e,
            name: t,
            finished: !1,
            timeStart: Date.now(),
            order: this._order
        }, this._order++, n
    };
    const xe = function () {
        this._loops = [], this._indizes = [], this._index = 0
    };
    xe.prototype.pushLoop = function (e) {
        this._loops.push(Math.abs(Math.floor(e))), this._indizes.push(this._index)
    }, xe.prototype.popLoop = function () {
        this._loops.pop(), this._index = this._indizes.pop(), 0 === this._loops.length && (this._index = 0)
    }, xe.prototype.numLoops = function () {
        return this._loops.length
    }, xe.prototype.numCycles = function () {
        if (0 === this._loops.length) return 0;
        for (var e = this._loops[0], t = 1; t < this._loops.length; t++) e *= this._loops[t];
        return e
    }, xe.prototype.inLoop = function () {
        return this._loops.length > 0
    }, xe.prototype.increment = function () {
        this._index++
    }, xe.prototype.index = function () {
        return this._index
    };
    const Ce = function () {
            var e = {},
                t = null,
                n = 0;
            this.getItems = function () {
                return e
            }, this.clear = function () {
                e = {}
            }, this.add = function (a, i) {
                null !== t && (i && i.id == t || e[t] && (e[t].timeUsed += performance.now() - n, (!e[t].peakTime || pe() - e[t].peakTime > 5e3) && (e[t].peak > 1 && i && m("PEAK ", i.parent.objName), e[t].peak = 0, e[t].peakTime = pe()), e[t].peak = Math.max(e[t].peak, performance.now() - n))), null !== i ? (e[i.id] || (e[i.id] = {
                    numTriggers: 0,
                    timeUsed: 0
                }), e[i.id].numTriggers++, e[i.id].title = i.parent.name + "." + i.name, t = i.id, n = performance.now()) : t = null
            }, this.print = function () {
                for (var t in m("--------"), e) m(e[t].title + ": " + e[t].numTriggers + " / " + e[t].timeUsed)
            }
        },
        Se = function (e) {
            this._patch = e, this.result = []
        };
    Se.MIDI = 0, Se.POINTERLOCK = 1, Se.WEBAUDIO = 2, Se.WEBGL2 = 3, (Se.infos = [])[Se.POINTERLOCK] = {
        title: "pointerLock",
        caniuse: "https://caniuse.com/#search=pointerlock"
    }, Se.infos[Se.MIDI] = {
        title: "midi API",
        caniuse: "https://caniuse.com/#search=midi"
    }, Se.infos[Se.WEBAUDIO] = {
        title: "web audio",
        caniuse: "https://caniuse.com/#search=webaudio"
    }, Se.infos[Se.WEBGL2] = {
        title: "WebGL 2"
    }, Se.prototype.checkRequirement = function (e, t) {
        switch (this.result = [], e) {
            case Se.WEBGL2:
                return t.patch.cgl.glVersion >= 2;
            case Se.POINTERLOCK:
                return "exitPointerLock" in document;
            case Se.MIDI:
                return "MIDIAccess" in window;
            case Se.WEBAUDIO:
                var n = !1;
                return window.audioContext && (n = !0), !n && ("webkitAudioContext" in window || "AudioContext" in window) && (n = !0), n
        }
    }, Se.prototype.checkOp = function (e) {
        if (e && e.requirements)
            for (var t = 0; t < e.requirements.length; t++) {
                var n = e.requirements[t];
                if (!this.result[n]) {
                    var a = this.checkRequirement(n, e);
                    if (!a) throw e.patch.cgl && e.patch.cgl.canvas && e.patch.cgl.canvas.remove(), Se.infos[n].title, Se.infos[n].caniuse && (Se.infos[n].caniuse, Se.infos[n].title, e.objName), "this browser does not meet requirement: " + Se.infos[n].title + " (" + e.objName + ")";
                    this.result[n] = {
                        success: a,
                        info: Se.infos[n]
                    }
                }
            }
    };
    const Pe = function (e) {
        b.apply(this), this.ops = [], this.settings = {}, this.timer = new me, this.freeTimer = new me, this.animFrameOps = [], this.animFrameCallbacks = [], this.gui = !1, this.silent = !1, this.profiler = null, this.onLoadStart = null, this.onLoadEnd = null, this.aborted = !1, this.loading = new ye(this), this._crashedOps = [], this._perf = {
            fps: 0,
            ms: 0,
            _fpsFrameCount: 0,
            _fpsMsCount: 0,
            _fpsStart: 0
        }, this._volumeListeners = [], this._paused = !1, this._frameNum = 0, this.instancing = new xe, this.onOneFrameRendered = null, this.namedTriggers = {}, this._origData = null, this._frameNext = 0, this._frameInterval = 0, this._lastFrameTime = 0, this._frameWasdelayed = !0, this.config = e || {
            glCanvasResizeToWindow: !1,
            prefixAssetPath: "",
            silent: !1,
            onError: null,
            onFinishedLoading: null,
            onFirstFrameRendered: null,
            onPatchLoaded: null,
            fpsLimit: 0
        }, _(this.config.silent), this.config.hasOwnProperty("doRequestAnimation") || (this.config.doRequestAnimation = !0), this.config.prefixAssetPath || (this.config.prefixAssetPath = ""), this.config.masterVolume || (this.config.masterVolume = 1), this._variables = {}, e && e.variables && (this._variables = e.variables || {}), this._variableListeners = [], this.vars = {}, e && e.vars && (this.vars = e.vars), this.cgl = new Me(this), this.cgl.setCanvas(this.config.glCanvasId || this.config.glCanvas || "glcanvas"), !0 === this.config.glCanvasResizeToWindow && this.cgl.setAutoResize("window"), !0 === this.config.glCanvasResizeToParent && this.cgl.setAutoResize("parent"), this.loading.setOnFinishedLoading(this.config.onFinishedLoading), this.cgl.aborted && (this.aborted = !0), this.cgl.silent && (this.silent = !0), this.freeTimer.play(), this.exec(), this.aborted || (this.config.patch ? (this.deSerialize(this.config.patch), this.timer.play()) : this.config.patchFile && (F(this.config.patchFile, (e, t) => {
            var n = JSON.parse(t);
            if (e) return v("err", e), v("data", n), void v("data", n.msg);
            this.deSerialize(n)
        }), this.timer.play())), console.log(" ")
    };
    Pe.prototype.isPlaying = function () {
        return !this._paused
    }, Pe.prototype.renderOneFrame = function () {
        this._paused = !0, this._renderOneFrame = !0, this.exec(), this._renderOneFrame = !1
    }, Pe.prototype.getFPS = function () {
        return this._fps
    }, Pe.prototype.isEditorMode = function () {
        return !0 === this.config.editorMode
    }, Pe.prototype.pause = function () {
        this._paused = !0, this.freeTimer.pause()
    }, Pe.prototype.resume = function () {
        this._paused && (this._paused = !1, this.freeTimer.play(), this.exec())
    }, Pe.prototype.setVolume = function (e) {
        this.config.masterVolume = e;
        for (var t = 0; t < this._volumeListeners.length; t++) this._volumeListeners[t].onMasterVolumeChanged(e)
    }, Pe.prototype.getFilePath = function (e) {
        return e ? 0 === e.indexOf("https:") || 0 === e.indexOf("http:") ? e : (e = e.replace("//", "/"), this.config.prefixAssetPath + e + (this.config.suffixAssetPath || "")) : e
    }, Pe.prototype.clear = function () {
        for (this.cgl.TextureEffectMesh = null, this.animFrameOps.length = 0, this.timer = new me; this.ops.length > 0;) this.deleteOp(this.ops[0].id)
    }, Pe.getOpClass = function (e) {
        var t = e.split("."),
            n = null;
        try {
            return 2 == t.length ? n = window[t[0]][t[1]] : 3 == t.length ? n = window[t[0]][t[1]][t[2]] : 4 == t.length ? n = window[t[0]][t[1]][t[2]][t[3]] : 5 == t.length ? n = window[t[0]][t[1]][t[2]][t[3]][t[4]] : 6 == t.length ? n = window[t[0]][t[1]][t[2]][t[3]][t[4]][t[5]] : 7 == t.length ? n = window[t[0]][t[1]][t[2]][t[3]][t[4]][t[5]][t[6]] : 8 == t.length ? n = window[t[0]][t[1]][t[2]][t[3]][t[4]][t[5]][t[6]][t[7]] : 9 == t.length ? n = window[t[0]][t[1]][t[2]][t[3]][t[4]][t[5]][t[6]][t[7]][t[8]] : 10 == t.length && (n = window[t[0]][t[1]][t[2]][t[3]][t[4]][t[5]][t[6]][t[7]][t[8]][t[9]]), n
        } catch (e) {
            return null
        }
    }, Pe.prototype.createOp = function (e, t) {
        var n = e.split("."),
            a = null,
            i = "";
        try {
            if (-1 == e.indexOf("Ops.")) {
                var r = e;
                if (!CABLES.OPS[r]) throw new Error("could not find op by id: " + r);
                i = CABLES.OPS[r].objName, (a = new CABLES.OPS[r].f(this, i, t, r)).opId = r
            }
            if (!a) {
                if (!Pe.getOpClass(i = e)) throw this.emitEvent("criticalError", "unknown op", "unknown op: " + i), v("unknown op: " + i), new Error("unknown op: " + i);
                if (2 == n.length ? a = new window[n[0]][n[1]](this, i, t) : 3 == n.length ? a = new window[n[0]][n[1]][n[2]](this, i, t) : 4 == n.length ? a = new window[n[0]][n[1]][n[2]][n[3]](this, i, t) : 5 == n.length ? a = new window[n[0]][n[1]][n[2]][n[3]][n[4]](this, i, t) : 6 == n.length ? a = new window[n[0]][n[1]][n[2]][n[3]][n[4]][n[5]](this, i, t) : 7 == n.length ? a = new window[n[0]][n[1]][n[2]][n[3]][n[4]][n[5]][n[6]](this, i, t) : 8 == n.length ? a = new window[n[0]][n[1]][n[2]][n[3]][n[4]][n[5]][n[6]][n[7]](this, i, t) : 9 == n.length ? a = new window[n[0]][n[1]][n[2]][n[3]][n[4]][n[5]][n[6]][n[7]][n[8]](this, i, t) : 10 == n.length ? a = new window[n[0]][n[1]][n[2]][n[3]][n[4]][n[5]][n[6]][n[7]][n[8]][n[9]](this, i, t) : m("parts.length", n.length), a)
                    for (var o in a.opId = null, CABLES.OPS) CABLES.OPS[o].objName == i && (a.opId = o)
            }
        } catch (e) {
            if (this._crashedOps.push(i), this.emitEvent("exceptionOp", e, i), !this.isEditorMode) throw m(e), v("[instancing error] " + i, e), CABLES.api && CABLES.api.sendErrorReport(e), this.exitError("INSTANCE_ERR", "Instancing Error " + i), "instancing error " + i
        }
        return a && (a.objName = i, a.patch = this), a
    }, Pe.prototype.addOp = function (e, t, n) {
        var a = this.createOp(e, n);
        return a && (a.uiAttr(t), a.onCreate && a.onCreate(), a.hasOwnProperty("onAnimFrame") && this.animFrameOps.push(a), a.hasOwnProperty("onMasterVolumeChanged") && this._volumeListeners.push(a), this.ops.push(a), this.emitEvent("onOpAdd", a), a.init && a.init()), a
    }, Pe.prototype.addOnAnimFrame = function (e) {
        this.animFrameOps.push(e)
    }, Pe.prototype.removeOnAnimFrame = function (e) {
        for (var t = 0; t < this.animFrameOps.length; t++)
            if (this.animFrameOps[t] == e) return void this.animFrameOps.splice(t, 1)
    }, Pe.prototype.addOnAnimFrameCallback = function (e) {
        this.animFrameCallbacks.push(e)
    }, Pe.prototype.removeOnAnimCallback = function (e) {
        for (var t = 0; t < this.animFrameCallbacks.length; t++)
            if (this.animFrameCallbacks[t] == e) return void this.animFrameCallbacks.splice(t, 1)
    }, Pe.prototype.deleteOp = function (e, t) {
        for (var n in this.ops)
            if (this.ops[n].id == e) {
                var a = null,
                    i = null;
                if (this.ops[n]) {
                    t && this.ops[n].portsIn.length > 0 && this.ops[n].portsIn[0].isLinked() && this.ops[n].portsOut.length > 0 && this.ops[n].portsOut[0].isLinked() && this.ops[n].portsIn[0].getType() == this.ops[n].portsOut[0].getType() && (a = this.ops[n].portsIn[0].links[0].getOtherPort(this.ops[n].portsIn[0]), i = this.ops[n].portsOut[0].links[0].getOtherPort(this.ops[n].portsOut[0]));
                    var r = this.ops[n];
                    r.removeLinks(), this.onDelete && (m("deprecated this.onDelete", this.onDelete), this.onDelete(r)), this.emitEvent("onOpDelete", r), this.ops.splice(n, 1), r.onDelete && r.onDelete(), r.cleanUp(), null !== a && null !== i && this.link(a.parent, a.getName(), i.parent, i.getName())
                }
            }
    }, Pe.prototype.getFrameNum = function () {
        return this._frameNum
    }, Pe.prototype.renderFrame = function (e) {
        this.timer.update(), this.freeTimer.update();
        for (var t = this.timer.getTime(), n = 0; n < this.animFrameCallbacks.length; ++n) this.animFrameCallbacks[n] && this.animFrameCallbacks[n](t, this._frameNum);
        for (n = 0; n < this.animFrameOps.length; ++n) this.animFrameOps[n].onAnimFrame && this.animFrameOps[n].onAnimFrame(t);
        this._frameNum++, 1 == this._frameNum && this.config.onFirstFrameRendered && this.config.onFirstFrameRendered()
    }, Pe.prototype.exec = function (e) {
        if (this._renderOneFrame || !this._paused && !this.aborted) {
            this.config.fpsLimit = this.config.fpsLimit || 0, this.config.fpsLimit && (this._frameInterval = 1e3 / this.config.fpsLimit);
            var t = CABLES.now(),
                n = t - this._frameNext;
            if (this.isEditorMode() && !this._renderOneFrame && t - this._lastFrameTime >= 500 && 0 !== this._lastFrameTime && !this._frameWasdelayed) return this._lastFrameTime = 0, setTimeout(this.exec.bind(this), 500), this.emitEvent("renderDelayStart"), void(this._frameWasdelayed = !0);
            if (this._renderOneFrame || 0 === this.config.fpsLimit || n > this._frameInterval || this._frameWasdelayed) {
                var a = CABLES.now();
                this.renderFrame(), this._perf._fpsMsCount += CABLES.now() - a, this._frameInterval && (this._frameNext = t - n % this._frameInterval)
            }
            this._frameWasdelayed && (this.emitEvent("renderDelayEnd"), this._frameWasdelayed = !1), this._renderOneFrame && this.onOneFrameRendered && (this.onOneFrameRendered(), this._renderOneFrame = !1), CABLES.now() - this._perf._fpsStart >= 1e3 && this._perf.fps != this._perf._fpsFrameCount && (this._perf.fps = this._perf._fpsFrameCount, this._perf.ms = Math.round(this._perf._fpsMsCount / this._perf._fpsFrameCount), this.emitEvent("performance", this._perf), this._perf._fpsFrameCount = 0, this._perf._fpsMsCount = 0, this._perf._fpsStart = CABLES.now()), this._perf._lastFrameTime = CABLES.now(), this._perf._fpsFrameCount++, this.config.doRequestAnimation && requestAnimationFrame(this.exec.bind(this))
        }
    }, Pe.prototype.link = function (e, t, n, a) {
        if (e)
            if (n) {
                var i = e.getPort(t),
                    r = n.getPort(a);
                if (i)
                    if (r) {
                        if (!i.shouldLink(i, r) || !r.shouldLink(i, r)) return !1;
                        if (Q.canLink(i, r)) {
                            var o = new Q(this);
                            return o.link(i, r), this.emitEvent("onLink", i, r, o), o
                        }
                    } else console.warn("port not found! " + a + " of " + n.name + "(" + n.objName + ")");
                else console.warn("port not found! " + t + "(" + e.objName + ")")
            } else m("link: op2 is null");
        else m("link: op1 is null ")
    }, Pe.prototype.serialize = function (e) {
        var t = {
            ops: []
        };
        for (var n in t.settings = this.settings, this.ops) t.ops.push(this.ops[n].getSerialized());
        return e ? t : JSON.stringify(t)
    }, Pe.prototype.getOpById = function (e) {
        for (var t in this.ops)
            if (this.ops[t].id == e) return this.ops[t]
    }, Pe.prototype.getOpsByName = function (e) {
        var t = [];
        for (var n in this.ops) this.ops[n].name == e && t.push(this.ops[n]);
        return t
    }, Pe.prototype.getOpsByObjName = function (e) {
        var t = [];
        for (var n in this.ops) this.ops[n].objName == e && t.push(this.ops[n]);
        return t
    }, Pe.prototype.loadLib = function (e) {
        B("/ui/libs/" + e + ".js", (e, t) => {
            var n = document.createElement("script");
            n.type = "text/javascript", n.text = t, document.getElementsByTagName("head")[0].appendChild(n)
        }, "GET")
    }, Pe.prototype.reloadOp = function (e, t) {
        var n = 0,
            a = [],
            i = [];
        for (var r in this.ops) this.ops[r].objName == e && i.push(this.ops[r]);
        for (r = 0; r < i.length; r++) {
            n++;
            var o = i[r];
            o.deleted = !0;
            var s, l, u = this.addOp(e, o.uiAttribs);
            for (s in a.push(u), o.portsIn)
                if (0 === o.portsIn[s].links.length) {
                    var c = u.getPort(o.portsIn[s].name);
                    c ? c.set(o.portsIn[s].get()) : v("[reloadOp] could not set port " + o.portsIn[s].name + ", propably renamed port ?")
                } else
                    for (; o.portsIn[s].links.length;) {
                        var d = o.portsIn[s].links[0].portIn.name,
                            h = o.portsIn[s].links[0].portOut.name,
                            f = o.portsIn[s].links[0].portOut.parent;
                        o.portsIn[s].links[0].remove(), (l = this.link(u, d, f, h)) ? l.setValue() : m("[reloadOp] relink after op reload not successfull for port " + h)
                    }
            for (s in o.portsOut)
                for (; o.portsOut[s].links.length;) {
                    var b = o.portsOut[s].links[0].portOut.name,
                        p = o.portsOut[s].links[0].portIn.name,
                        g = o.portsOut[s].links[0].portIn.parent;
                    o.portsOut[s].links[0].remove(), (l = this.link(u, b, g, p)) ? l.setValue() : m("relink after op reload not successfull for port " + p)
                }
            this.deleteOp(o.id)
        }
        t(n, a)
    }, Pe.prototype.getSubPatchOps = function (e) {
        var t = [];
        for (var n in this.ops) this.ops[n].uiAttribs && this.ops[n].uiAttribs.subPatch == e && t.push(this.ops[n]);
        return t
    }, Pe.prototype.getSubPatchOp = function (e, t) {
        for (var n in this.ops)
            if (this.ops[n].uiAttribs && this.ops[n].uiAttribs.subPatch == e && this.ops[n].objName == t) return this.ops[n];
        return !1
    }, Pe.prototype.deSerialize = function (e, t) {
        if (!this.aborted) {
            var n = this.loading.start("core", "deserialize");
            this.onLoadStart && this.onLoadStart(), this.namespace = e.namespace || "", this.name = e.name || "", "string" == typeof e && (e = JSON.parse(e));
            var a = this;
            this.settings = e.settings;
            var i, r, o, s, l = new Se(this);
            for (var u in e.ops) {
                var c = CABLES.now(),
                    d = e.ops[u],
                    h = null;
                try {
                    h = d.opId ? this.addOp(d.opId, d.uiAttribs, d.id) : this.addOp(d.objName, d.uiAttribs, d.id)
                } catch (e) {
                    throw console.warn("[instancing error] op data:", d, e), "instancing error: " + d.objName
                }
                if (l.checkOp(h), h) {
                    for (var f in t && (h.id = y()), h.portsInData = d.portsIn, h._origData = d, d.portsIn) {
                        var b = d.portsIn[f],
                            p = h.getPort(b.name);
                        if (!p || "bool" != p.uiAttribs.display && "bool" != p.uiAttribs.type || isNaN(b.value) || (b.value = !0 === b.value), p && void 0 !== b.value && p.type != D.OP.OP_PORT_TYPE_TEXTURE && p.set(b.value), p && b && b.animated && p.setAnimated(b.animated), p && b && b.anim)
                            for (var m in p.anim || (p.anim = new q), b.anim.loop && (p.anim.loop = b.anim.loop), b.anim.keys) p.anim.keys.push(new V.Key(b.anim.keys[m]))
                    }
                    for (var g in d.portsOut) {
                        var v = h.getPort(d.portsOut[g].name);
                        v && v.type != D.OP.OP_PORT_TYPE_TEXTURE && d.portsOut[g].hasOwnProperty("value") && v.set(e.ops[u].portsOut[g].value)
                    }
                }
                Math.round(100 * (CABLES.now() - c))
            }
            for (var _ in this.ops) this.ops[_].onLoadedValueSet && (this.ops[_].onLoadedValueSet(this.ops[_]._origData), this.ops[_].onLoadedValueSet = null, this.ops[_]._origData = null);
            if (e.ops)
                for (u = 0; u < e.ops.length; u++)
                    if (e.ops[u].portsIn)
                        for (var O = 0; O < e.ops[u].portsIn.length; O++)
                            if (e.ops[u].portsIn[O].links)
                                for (var I = 0; I < e.ops[u].portsIn[O].links.length; I++) e.ops[u].portsIn[O].links[I] && (i = e.ops[u].portsIn[O].links[I].objIn, r = e.ops[u].portsIn[O].links[I].objOut, o = e.ops[u].portsIn[O].links[I].portIn, s = e.ops[u].portsIn[O].links[I].portOut, a.link(a.getOpById(i), o, a.getOpById(r), s));
            for (var _ in this.ops) this.ops[_].onLoaded && (this.ops[_].onLoaded(), this.ops[_].onLoaded = null);
            for (var _ in this.ops) this.ops[_].init && (this.ops[_].init(), this.ops[_].init = null);
            if (this.config.variables)
                for (var A in this.config.variables) this.setVarValue(A, this.config.variables[A]);
            setTimeout(() => {
                this.loading.finished(n)
            }, 100), this.config.onPatchLoaded && this.config.onPatchLoaded(), this.onLoadEnd && this.onLoadEnd()
        }
    }, Pe.prototype.profile = function (e) {
        for (var t in this.profiler = new Ce, this.ops) this.ops[t].profile(e)
    }, (Pe.Variable = function (e, t) {
        this._name = e, this._changeListeners = [], this.setValue(t)
    }).prototype.getValue = function () {
        return this._v
    }, Pe.Variable.prototype.getName = function () {
        return this._name
    }, Pe.Variable.prototype.setValue = function (e) {
        this._v = e;
        for (var t = 0; t < this._changeListeners.length; t++) this._changeListeners[t](e)
    }, Pe.Variable.prototype.addListener = function (e) {
        this._changeListeners.push(e)
    }, Pe.Variable.prototype.removeListener = function (e) {
        var t = this._changeListeners.indexOf(e);
        this._changeListeners.splice(t, 1)
    }, Pe.prototype.setVariable = function (e, t) {
        this._variables.hasOwnProperty(e) ? this._variables[e].setValue(t) : console.warn("variable " + e + " not found!")
    }, Pe.prototype.setVarValue = function (e, t) {
        return this._variables.hasOwnProperty(e) ? this._variables[e].setValue(t) : (this._variables[e] = new Pe.Variable(e, t), this.emitEvent("variablesChanged")), this._variables[e]
    }, Pe.prototype.getVarValue = function (e, t) {
        if (this._variables.hasOwnProperty(e)) return this._variables[e].getValue()
    }, Pe.prototype.getVar = function (e) {
        if (this._variables.hasOwnProperty(e)) return this._variables[e]
    }, Pe.prototype.getVars = function () {
        return this._variables
    }, Pe.prototype.getVars = function () {
        return this._variables
    }, Pe.prototype.exitError = function (e, t) {
        this && this.config && this.config.onError && (this.config.onError(e, t), this.aborted = !0)
    }, Pe.prototype.preRenderOps = function () {
        m("prerendering...");
        var e = null;
        CABLES.StopWatch && (e = new CABLES.StopWatch("prerendering"));
        for (var t = 0; t < this.ops.length; t++) this.ops[t].preRender && (this.ops[t].preRender(), m("prerender " + this.ops[t].objName));
        e && e.stop("prerendering")
    }, Pe.prototype.dispose = function () {
        this.pause(), this.clear()
    };
    var ke = Pe;
    const Re = {
            addPatch: function (e, t) {
                var n = e,
                    a = x();
                if ("string" != typeof e || (a = e, n = document.getElementById(a))) {
                    var i = document.createElement("canvas");
                    return i.id = "glcanvas_" + a, i.width = n.clientWidth, i.height = n.clientHeight, window.addEventListener("resize", function () {
                        this.setAttribute("width", n.clientWidth), this.height = n.clientHeight
                    }.bind(i)), n.appendChild(i), (t = t || {}).glCanvasId = i.id, t.onError || (t.onError = function (e) {
                        m(e)
                    }), CABLES.patch = new ke(t), i
                }
                console.error(a + " Polyshape Container Element not found!")
            }
        },
        Ne = {
            toneJsInitialized: !1,
            createAudioContext: function (e) {
                if (window.AudioContext = window.AudioContext || window.webkitAudioContext, window.AudioContext) return window.audioContext || (window.audioContext = new AudioContext), window.Tone && !Ne.toneJsInitialized && (Tone.setContext(window.audioContext), Ne.toneJsInitialized = !0), window.audioContext;
                e.patch.config.onError("NO_WEBAUDIO", "Web Audio is not supported in this browser.")
            },
            getAudioContext: function () {
                return window.audioContext
            },
            createAudioInPort: function (e, t, n, a) {
                if (!e || !t || !n) {
                    var i = "ERROR: createAudioInPort needs three parameters, op, portName and audioNode";
                    throw e.log(i), new Error(i)
                }
                a || (a = 0), e.webAudio = e.webAudio || {}, e.webAudio.audioInPorts = e.webAudio.audioInPorts || [];
                var r = e.inObject(t);
                return r.webAudio = {}, r.webAudio.previousAudioInNode = null, r.webAudio.audioNode = n, e.webAudio.audioInPorts[t] = r, r.onChange = function () {
                    var t = r.get();
                    if (t) try {
                        t.connect(r.webAudio.audioNode, 0, a)
                    } catch (n) {
                        throw e.log("Error: Failed to connect web audio node!", n), e.log("port.webAudio.audioNode", r.webAudio.audioNode), e.log("audioInNode: ", t), e.log("inputChannelIndex:", a), e.log("audioInNode.connect: ", t.connect), n
                    } else if (r.webAudio.previousAudioInNode) try {
                        r.webAudio.previousAudioInNode.disconnect(r.webAudio.audioNode, 0, a)
                    } catch (t) {
                        try {
                            r.webAudio.previousAudioInNode.disconnect(r.webAudio.audioNode)
                        } catch (t) {
                            throw e.log("Disconnecting audio node with in/out port index, as well as without in/out-port-index did not work ", t), t.printStackTrace && t.printStackTrace(), t
                        }
                    }
                    r.webAudio.previousAudioInNode = t
                }, r
            },
            replaceNodeInPort: function (e, t, n) {
                var a = e.webAudio.previousAudioInNode;
                if (a && a.disconnect) {
                    try {
                        a.disconnect(t)
                    } catch (e) {
                        throw e.printStackTrace && e.printStackTrace(), new Error("replaceNodeInPort: Could not disconnect old audio node. " + e.name + " " + e.message)
                    }
                    e.webAudio.audioNode = n;
                    try {
                        a.connect(n)
                    } catch (e) {
                        throw e.printStackTrace && e.printStackTrace(), new Error("replaceNodeInPort: Could not connect to new node. " + e.name + " " + e.message)
                    }
                }
            },
            createAudioOutPort: function (e, t, n) {
                if (!e || !t || !n) {
                    var a = "ERROR: createAudioOutPort needs three parameters, op, portName and audioNode";
                    throw e.log(a), new Error(a)
                }
                var i = e.outObject(t);
                return i.set(n), i
            },
            createAudioParamInPort: function (e, t, n, a, i) {
                if (!e || !t || !n) return e.log("ERROR: createAudioParamInPort needs three parameters, op, portName and audioNode"), e && e.name && e.log("opname: ", e.name), e.log("portName", t), void e.log("audioNode: ", n);
                e.webAudio = e.webAudio || {}, e.webAudio.audioInPorts = e.webAudio.audioInPorts || [];
                var r = e.inDynamic(t, [D.OP.OP_PORT_TYPE_VALUE, D.OP.OP_PORT_TYPE_OBJECT], a, i);
                return r.webAudio = {}, r.webAudio.previousAudioInNode = null, r.webAudio.audioNode = n, e.webAudio.audioInPorts[t] = r, r.onChange = function () {
                    var t = r.get(),
                        n = r.webAudio.audioNode,
                        a = Ne.getAudioContext();
                    if (null != t)
                        if ("object" == typeof t && t.connect) {
                            try {
                                t.connect(n)
                            } catch (t) {
                                throw e.log("Could not connect audio node: ", t), t.printStackTrace && t.printStackTrace(), t
                            }
                            r.webAudio.previousAudioInNode = t
                        } else {
                            if (n._param && n._param.minValue && n._param.maxValue)
                                if (t >= n._param.minValue && t <= n._param.maxValue) try {
                                    n.setValueAtTime ? n.setValueAtTime(t, a.currentTime) : n.value = t
                                } catch (t) {
                                    throw e.log("Possible AudioParam problem with tone.js op: ", t), t.printStackTrace && t.printStackTrace(), t
                                } else e.log("Warning: The value for an audio parameter is out of range!");
                                else if (n.minValue && n.maxValue)
                                if (t >= n.minValue && t <= n.maxValue) try {
                                    n.setValueAtTime ? n.setValueAtTime(t, a.currentTime) : n.value = t
                                } catch (t) {
                                    throw e.log("AudioParam has minValue / maxValue defined, and value is in range, but setting the value failed! ", t), t.printStackTrace && t.printStackTrace(), t
                                } else e.log("Warning: The value for an audio parameter is out of range!");
                                else try {
                                    n.setValueAtTime ? n.setValueAtTime(t, a.currentTime) : n.value = t
                                } catch (t) {
                                    throw e.log("Possible AudioParam problem (without minValue / maxValue): ", t), t.printStackTrace && t.printStackTrace(), t
                                }
                            if (r.webAudio.previousAudioInNode && r.webAudio.previousAudioInNode.disconnect) {
                                try {
                                    r.webAudio.previousAudioInNode.disconnect(n)
                                } catch (t) {
                                    throw e.log("Could not disconnect previous audio node: ", t), t
                                }
                                r.webAudio.previousAudioInNode = void 0
                            }
                        }
                    else r.webAudio.previousAudioInNode
                }, r
            },
            loadAudioFile: function (e, t, n, a) {
                var i = Ne.createAudioContext(),
                    r = e.loading.start("audio", t);
                CABLES.UI && gui.jobs().start({
                    id: "loadaudio" + r,
                    title: " loading audio (" + t + ")"
                });
                var o = new XMLHttpRequest;
                t && (o.open("GET", t, !0), o.responseType = "arraybuffer", o.onload = function () {
                    e.loading.finished(r), CABLES.UI && gui.jobs().finish("loadaudio" + r), i.decodeAudioData(o.response, n, a)
                }, o.send())
            },
            isValidToneTime: function (e) {
                try {
                    new Tone.Time(e)
                } catch (e) {
                    return !1
                }
                return !0
            },
            isValidToneNote: function (e) {
                try {
                    Tone.Frequency(e)
                } catch (e) {
                    return !1
                }
                return !0
            }
        },
        je = function () {
            var e = CABLES.UI.userSettings.get("pacoRenderer") || !1;
            CABLES.UI.userSettings.set("pacoRenderer", !e), document.location.reload()
        },
        Le = function () {},
        Be = function (e, t, n) {
            this._patch = e, this.connector = n || new we, this.connector.receive(this)
        };
    Be.prototype._receive = function (e) {
        var t;
        if ((t = e.event ? e : JSON.parse(e.data)).event == D.PACO.PACO_OP_CREATE) m("op create: data.vars.objName"), (o = this._patch.addOp(t.vars.objName)).id = t.vars.opId;
        else if (t.event == D.PACO.PACO_LOAD) m("load patch....."), this._patch.clear(), this._patch.deSerialize(t.vars.patch);
        else if (t.event == D.PACO.PACO_CLEAR) this._patch.clear(), m("clear");
        else if (t.event == D.PACO.PACO_OP_DELETE) m("op delete"), this._patch.deleteOp(t.vars.op, !0);
        else if (t.event == D.PACO.PACO_OP_ENABLE)(o = this._patch.getOpById(t.vars.op)) && (o.enabled = !0);
        else if (t.event == D.PACO.PACO_OP_DISABLE)(o = this._patch.getOpById(t.vars.op)) && (o.enabled = !1);
        else if (t.event == D.PACO.PACO_UNLINK) {
            var n = this._patch.getOpById(t.vars.op1),
                a = this._patch.getOpById(t.vars.op2),
                i = n.getPort(t.vars.port1),
                r = a.getPort(t.vars.port2);
            i.removeLinkTo(r)
        } else if (t.event == D.PACO.PACO_LINK) n = this._patch.getOpById(t.vars.op1), a = this._patch.getOpById(t.vars.op2), this._patch.link(n, t.vars.port1, a, t.vars.port2);
        else if (t.event == D.PACO.PACO_VALUECHANGE) {
            var o;
            (o = this._patch.getOpById(t.vars.op)).getPort(t.vars.port).set(t.vars.v)
        } else m("unknown patchConnectionEvent!", e)
    };
    const Fe = function (e, t) {
        this.connectors = [], this.connectors.push(new we)
    };
    Fe.prototype.send = function (e, t) {
        for (var n = 0; n < this.connectors.length; n++) this.connectors[n].send(e, t)
    };
    const we = function () {
        window.BroadcastChannel && (this.bc = new BroadcastChannel("test_channel"))
    };
    we.prototype.receive = function (e) {
        this.bc && (m("init"), this.bc.onmessage = e._receive.bind(e))
    }, we.prototype.send = function (e, t) {
        if (this.bc) {
            var n = {};
            n.event = e, n.vars = t, this.bc.postMessage(JSON.stringify(n))
        }
    };
    const De = Object.assign({
        EventTarget: b,
        EMBED: Re,
        Link: Q,
        Port: U,
        Op: Z,
        Profiler: Ce,
        Requirements: Se,
        Patch: ke,
        Instancing: xe,
        Timer: me,
        WEBAUDIO: Ne,
        Variable: function () {
            var e = null,
                t = [];
            this.onChanged = function (e) {
                t.push(e)
            }, this.getValue = function () {
                return e
            }, this.setValue = function (t) {
                e = t, n()
            };
            var n = function () {
                for (var e = 0; e < t.length; e++) t[e]()
            }
        },
        LoadingStatus: ye,
        now: pe,
        internalNow: be
    }, a, r, o, D.ANIM, s, D.PORT, D.PACO, D.ANIM, D.OP);
    t.default = De
}]).default).exportedPatch = {
    settings: {
        opExample: [],
        licence: "none",
        isPublic: !1
    },
    ops: [{
        opId: "0a6d9c6f-6459-45ca-88ad-268a1f7304db",
        objName: "Ops.Gl.Meshes.PointCloudFromArray",
        id: "58e978b8-4a45-4445-b1e3-3de3f927688a",
        uiAttribs: {
            translate: {
                x: -96,
                y: 2580
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "exe",
            links: [{
                portIn: "exe",
                portOut: "trigger",
                objIn: "58e978b8-4a45-4445-b1e3-3de3f927688a",
                objOut: "275680a6-6e70-4d81-869f-b1b59dc568ac"
            }]
        }, {
            name: "Array",
            links: [{
                portIn: "Array",
                portOut: "Array out",
                objIn: "58e978b8-4a45-4445-b1e3-3de3f927688a",
                objOut: "760f0563-b411-4223-955b-f8b5cf216424"
            }]
        }, {
            name: "Num Points",
            value: 1e3
        }, {
            name: "Scramble Texcoords",
            value: !0
        }, {
            name: "Seed",
            value: 0
        }, {
            name: "Coordinates",
            value: 0
        }, {
            name: "Vertex Colors",
            value: 0
        }],
        portsOut: [{
            name: "Trigger out",
            value: 0
        }, {
            name: "Geometry"
        }]
    }, {
        opId: "2bcf32fe-3cbd-48fd-825a-61255bebda9b",
        objName: "Ops.Array.ArrayPack3",
        id: "760f0563-b411-4223-955b-f8b5cf216424",
        uiAttribs: {
            translate: {
                x: 48,
                y: 2420
            },
            subPatch: 0,
            notWorkingMsg: null,
            error: null
        },
        portsIn: [{
            name: "Trigger in",
            links: [{
                portIn: "Trigger in",
                portOut: "trigger",
                objIn: "760f0563-b411-4223-955b-f8b5cf216424",
                objOut: "9e297a08-ff26-4e9e-bd5b-6ada7259f902"
            }]
        }, {
            name: "Array 1",
            links: [{
                portIn: "Array 1",
                portOut: "Array Out",
                objIn: "760f0563-b411-4223-955b-f8b5cf216424",
                objOut: "325796f7-61cd-4999-8e5f-2a1347e7ebc7"
            }]
        }, {
            name: "Array 2",
            links: [{
                portIn: "Array 2",
                portOut: "Array 2 out",
                objIn: "760f0563-b411-4223-955b-f8b5cf216424",
                objOut: "cd501bf8-d92b-4a30-8d83-b3dd396c1f25"
            }, {
                portIn: "Array 2",
                portOut: "Array result",
                objIn: "760f0563-b411-4223-955b-f8b5cf216424",
                objOut: "225d10ae-e36f-4b93-90b7-5f233ab9fdd5"
            }]
        }, {
            name: "Array 3",
            links: [{
                portIn: "Array 3",
                portOut: "Array 3 out",
                objIn: "760f0563-b411-4223-955b-f8b5cf216424",
                objOut: "cd501bf8-d92b-4a30-8d83-b3dd396c1f25"
            }, {
                portIn: "Array 3",
                portOut: "Array result",
                objIn: "760f0563-b411-4223-955b-f8b5cf216424",
                objOut: "7f870baa-e1c8-43cf-9baf-3964a283983d"
            }]
        }],
        portsOut: [{
            name: "Trigger out",
            value: 0
        }, {
            name: "Array out"
        }, {
            name: "Num Points",
            value: 1e3
        }, {
            name: "Array length",
            value: 3e3
        }]
    }, {
        opId: "5677b5b5-753a-4fbf-9e91-64c81ec68a2f",
        objName: "Ops.Anim.Smooth",
        id: "ed24087a-6b0d-4f79-b48d-b60026a7dd6c",
        uiAttribs: {
            translate: {
                x: -24,
                y: 1660
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Update",
            links: [{
                portIn: "Update",
                portOut: "Next",
                objIn: "ed24087a-6b0d-4f79-b48d-b60026a7dd6c",
                objOut: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e"
            }]
        }, {
            name: "Separate inc/dec",
            value: !0
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "ed24087a-6b0d-4f79-b48d-b60026a7dd6c",
                objOut: "f2dd418b-df54-4469-9d0d-465db1647d3e"
            }]
        }, {
            name: "Inc factor",
            value: 12
        }, {
            name: "Dec factor",
            value: 24
        }],
        portsOut: [{
            name: "Next"
        }, {
            name: "Result",
            value: .1
        }]
    }, {
        opId: "5677b5b5-753a-4fbf-9e91-64c81ec68a2f",
        objName: "Ops.Anim.Smooth",
        id: "f784a56e-a3c8-48d2-a687-21d9742d9e44",
        uiAttribs: {
            translate: {
                x: 84,
                y: 1660
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Update",
            links: [{
                portIn: "Update",
                portOut: "Next",
                objIn: "f784a56e-a3c8-48d2-a687-21d9742d9e44",
                objOut: "ed24087a-6b0d-4f79-b48d-b60026a7dd6c"
            }]
        }, {
            name: "Separate inc/dec",
            value: !0
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "f784a56e-a3c8-48d2-a687-21d9742d9e44",
                objOut: "d0fea2ea-7937-4481-a9bc-e743ab980642"
            }]
        }, {
            name: "Inc factor",
            value: 64
        }, {
            name: "Dec factor",
            value: 1
        }],
        portsOut: [{
            name: "Next"
        }, {
            name: "Result"
        }]
    }, {
        opId: "5677b5b5-753a-4fbf-9e91-64c81ec68a2f",
        objName: "Ops.Anim.Smooth",
        id: "03e99102-6963-43c4-8ee4-84bef65ffa0b",
        uiAttribs: {
            translate: {
                x: 180,
                y: 1660
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Update",
            links: [{
                portIn: "Update",
                portOut: "Next",
                objIn: "03e99102-6963-43c4-8ee4-84bef65ffa0b",
                objOut: "f784a56e-a3c8-48d2-a687-21d9742d9e44"
            }]
        }, {
            name: "Separate inc/dec",
            value: !0
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "03e99102-6963-43c4-8ee4-84bef65ffa0b",
                objOut: "733bfa32-997c-46b6-ba07-6c2a5bf80207"
            }]
        }, {
            name: "Inc factor",
            value: 32
        }, {
            name: "Dec factor",
            value: 16
        }],
        portsOut: [{
            name: "Next"
        }, {
            name: "Result"
        }]
    }, {
        opId: "5677b5b5-753a-4fbf-9e91-64c81ec68a2f",
        objName: "Ops.Anim.Smooth",
        id: "e6d2c91a-9f1a-45f4-ab07-97ccb8be7cb3",
        uiAttribs: {
            translate: {
                x: 276,
                y: 1660
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Update",
            links: [{
                portIn: "Update",
                portOut: "Next",
                objIn: "e6d2c91a-9f1a-45f4-ab07-97ccb8be7cb3",
                objOut: "03e99102-6963-43c4-8ee4-84bef65ffa0b"
            }]
        }, {
            name: "Separate inc/dec",
            value: !0
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "e6d2c91a-9f1a-45f4-ab07-97ccb8be7cb3",
                objOut: "91843a73-4f90-4777-9c8c-2f6bd7bc97c0"
            }]
        }, {
            name: "Inc factor",
            value: 8
        }, {
            name: "Dec factor",
            value: 2
        }],
        portsOut: [{
            name: "Next"
        }, {
            name: "Result"
        }]
    }, {
        opId: "5677b5b5-753a-4fbf-9e91-64c81ec68a2f",
        objName: "Ops.Anim.Smooth",
        id: "6db94589-af49-4a70-9c77-641dd4843924",
        uiAttribs: {
            translate: {
                x: 372,
                y: 1660
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Update",
            links: [{
                portIn: "Update",
                portOut: "Next",
                objIn: "6db94589-af49-4a70-9c77-641dd4843924",
                objOut: "e6d2c91a-9f1a-45f4-ab07-97ccb8be7cb3"
            }]
        }, {
            name: "Separate inc/dec",
            value: !0
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "6db94589-af49-4a70-9c77-641dd4843924",
                objOut: "f3fb2d5b-ddcb-4d5e-852d-a7df2ffe2f5c"
            }]
        }, {
            name: "Inc factor",
            value: 32
        }, {
            name: "Dec factor",
            value: 16
        }],
        portsOut: [{
            name: "Next"
        }, {
            name: "Result"
        }]
    }, {
        opId: "5677b5b5-753a-4fbf-9e91-64c81ec68a2f",
        objName: "Ops.Anim.Smooth",
        id: "361bb682-201b-4072-abd4-7e631414c942",
        uiAttribs: {
            translate: {
                x: 468,
                y: 1660
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Update",
            links: [{
                portIn: "Update",
                portOut: "Next",
                objIn: "361bb682-201b-4072-abd4-7e631414c942",
                objOut: "6db94589-af49-4a70-9c77-641dd4843924"
            }]
        }, {
            name: "Separate inc/dec",
            value: !0
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "361bb682-201b-4072-abd4-7e631414c942",
                objOut: "33508cd9-e1e5-4528-871e-a572f4537923"
            }]
        }, {
            name: "Inc factor",
            value: 32
        }, {
            name: "Dec factor",
            value: 16
        }],
        portsOut: [{
            name: "Next"
        }, {
            name: "Result"
        }]
    }, {
        opId: "5677b5b5-753a-4fbf-9e91-64c81ec68a2f",
        objName: "Ops.Anim.Smooth",
        id: "04401fe4-5a3e-44fe-b1ef-a74aacd3be24",
        uiAttribs: {
            translate: {
                x: 564,
                y: 1660
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Update",
            links: [{
                portIn: "Update",
                portOut: "Next",
                objIn: "04401fe4-5a3e-44fe-b1ef-a74aacd3be24",
                objOut: "361bb682-201b-4072-abd4-7e631414c942"
            }]
        }, {
            name: "Separate inc/dec",
            value: !0
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "04401fe4-5a3e-44fe-b1ef-a74aacd3be24",
                objOut: "6d3a7c27-cc72-4005-8c67-e736a9ec1c07"
            }]
        }, {
            name: "Inc factor",
            value: 32
        }, {
            name: "Dec factor",
            value: 16
        }],
        portsOut: [{
            name: "Next"
        }, {
            name: "Result"
        }]
    }, {
        opId: "ded44bae-a24e-48c5-9585-4cb31f331ab6",
        objName: "Ops.Array.ArraySin",
        id: "bb24ac61-d417-4566-b91b-eabf0d9257a7",
        uiAttribs: {
            translate: {
                x: 192,
                y: 2180
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "array in",
            links: [{
                portIn: "array in",
                portOut: "Result",
                objIn: "bb24ac61-d417-4566-b91b-eabf0d9257a7",
                objOut: "c6b04760-8d9d-4f7c-9906-914b640608ef"
            }]
        }, {
            name: "Math function",
            value: "Sin"
        }, {
            name: "Phase",
            value: 1
        }, {
            name: "Frequency",
            value: 1
        }, {
            name: "Amplitude",
            value: 0
        }],
        portsOut: [{
            name: "Array result"
        }]
    }, {
        opId: "ded44bae-a24e-48c5-9585-4cb31f331ab6",
        objName: "Ops.Array.ArraySin",
        id: "39d0ca8a-814b-46e7-b04b-03cb899e3f64",
        uiAttribs: {
            translate: {
                x: 360,
                y: 2180
            },
            subPatch: 0,
            notWorkingMsg: null,
            color: "#07F78C"
        },
        portsIn: [{
            name: "array in",
            links: [{
                portIn: "array in",
                portOut: "Result",
                objIn: "39d0ca8a-814b-46e7-b04b-03cb899e3f64",
                objOut: "c6b04760-8d9d-4f7c-9906-914b640608ef"
            }]
        }, {
            name: "Math function",
            value: "Sin"
        }, {
            name: "Phase",
            links: [{
                portIn: "Phase",
                portOut: "Time",
                objIn: "39d0ca8a-814b-46e7-b04b-03cb899e3f64",
                objOut: "232311ca-91b5-4516-a784-bf7733287aa3"
            }]
        }, {
            name: "Frequency",
            value: 1
        }, {
            name: "Amplitude",
            value: .5
        }],
        portsOut: [{
            name: "Array result"
        }]
    }, {
        opId: "f31a1764-ce14-41de-9b3f-dc2fe249bb52",
        objName: "Ops.Array.ArrayMathArray",
        id: "225d10ae-e36f-4b93-90b7-5f233ab9fdd5",
        uiAttribs: {
            title: "ArrayMath",
            translate: {
                x: 360,
                y: 2240
            },
            subPatch: 0,
            notWorkingMsg: null,
            color: "#07F78C",
            extendTitle: "*",
            error: null
        },
        portsIn: [{
            name: "array 0",
            links: [{
                portIn: "array 0",
                portOut: "Array result",
                objIn: "225d10ae-e36f-4b93-90b7-5f233ab9fdd5",
                objOut: "39d0ca8a-814b-46e7-b04b-03cb899e3f64"
            }]
        }, {
            name: "array 1",
            links: [{
                portIn: "array 1",
                portOut: "Array 2 out",
                objIn: "225d10ae-e36f-4b93-90b7-5f233ab9fdd5",
                objOut: "cd501bf8-d92b-4a30-8d83-b3dd396c1f25"
            }]
        }, {
            name: "Math function",
            value: "*"
        }],
        portsOut: [{
            name: "Array result"
        }, {
            name: "Array length",
            value: 1e3
        }]
    }, {
        opId: "ded44bae-a24e-48c5-9585-4cb31f331ab6",
        objName: "Ops.Array.ArraySin",
        id: "d40227df-1a75-4001-9c8e-3274dda6ef2c",
        uiAttribs: {
            translate: {
                x: 468,
                y: 2240
            },
            subPatch: 0,
            notWorkingMsg: null,
            color: "#07F78C"
        },
        portsIn: [{
            name: "array in",
            links: [{
                portIn: "array in",
                portOut: "Result",
                objIn: "d40227df-1a75-4001-9c8e-3274dda6ef2c",
                objOut: "c6b04760-8d9d-4f7c-9906-914b640608ef"
            }]
        }, {
            name: "Math function",
            value: "Sin"
        }, {
            name: "Phase",
            links: [{
                portIn: "Phase",
                portOut: "Time",
                objIn: "d40227df-1a75-4001-9c8e-3274dda6ef2c",
                objOut: "e76d5d63-69f1-448a-9690-415a55e2edef"
            }]
        }, {
            name: "Frequency",
            value: 1
        }, {
            name: "Amplitude",
            value: .5
        }],
        portsOut: [{
            name: "Array result"
        }]
    }, {
        opId: "f31a1764-ce14-41de-9b3f-dc2fe249bb52",
        objName: "Ops.Array.ArrayMathArray",
        id: "7f870baa-e1c8-43cf-9baf-3964a283983d",
        uiAttribs: {
            title: "ArrayMath",
            translate: {
                x: 468,
                y: 2300
            },
            subPatch: 0,
            notWorkingMsg: null,
            color: "#07F78C",
            extendTitle: "*",
            error: null
        },
        portsIn: [{
            name: "array 0",
            links: [{
                portIn: "array 0",
                portOut: "Array result",
                objIn: "7f870baa-e1c8-43cf-9baf-3964a283983d",
                objOut: "d40227df-1a75-4001-9c8e-3274dda6ef2c"
            }]
        }, {
            name: "array 1",
            links: [{
                portIn: "array 1",
                portOut: "Array 3 out",
                objIn: "7f870baa-e1c8-43cf-9baf-3964a283983d",
                objOut: "cd501bf8-d92b-4a30-8d83-b3dd396c1f25"
            }]
        }, {
            name: "Math function",
            value: "*"
        }],
        portsOut: [{
            name: "Array result"
        }, {
            name: "Array length",
            value: 1e3
        }]
    }, {
        opId: "f86a4a07-00ee-4f68-8839-e02d51d1cd2f",
        objName: "Ops.Gl.Shader.PointMaterial",
        id: "275680a6-6e70-4d81-869f-b1b59dc568ac",
        uiAttribs: {
            translate: {
                x: -96,
                y: 2500
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "render",
            links: [{
                portIn: "render",
                portOut: "trigger",
                objIn: "275680a6-6e70-4d81-869f-b1b59dc568ac",
                objOut: "9e297a08-ff26-4e9e-bd5b-6ada7259f902"
            }]
        }, {
            name: "PointSize",
            links: [{
                portIn: "PointSize",
                portOut: "Result",
                objIn: "275680a6-6e70-4d81-869f-b1b59dc568ac",
                objOut: "03e99102-6963-43c4-8ee4-84bef65ffa0b"
            }]
        }, {
            name: "Random Size",
            links: [{
                portIn: "Random Size",
                portOut: "Result",
                objIn: "275680a6-6e70-4d81-869f-b1b59dc568ac",
                objOut: "13b99023-ee11-498f-81b6-30c7d4085f27"
            }]
        }, {
            name: "Round",
            value: !0
        }, {
            name: "Scale by Distance",
            value: !0
        }, {
            name: "r",
            links: [{
                portIn: "r",
                portOut: "Result",
                objIn: "275680a6-6e70-4d81-869f-b1b59dc568ac",
                objOut: "6db94589-af49-4a70-9c77-641dd4843924"
            }]
        }, {
            name: "g",
            links: [{
                portIn: "g",
                portOut: "Result",
                objIn: "275680a6-6e70-4d81-869f-b1b59dc568ac",
                objOut: "361bb682-201b-4072-abd4-7e631414c942"
            }]
        }, {
            name: "b",
            links: [{
                portIn: "b",
                portOut: "Result",
                objIn: "275680a6-6e70-4d81-869f-b1b59dc568ac",
                objOut: "04401fe4-5a3e-44fe-b1ef-a74aacd3be24"
            }]
        }, {
            name: "a",
            links: [{
                portIn: "a",
                portOut: "Result",
                objIn: "275680a6-6e70-4d81-869f-b1b59dc568ac",
                objOut: "e6d2c91a-9f1a-45f4-ab07-97ccb8be7cb3"
            }]
        }, {
            name: "preMultiplied alpha",
            value: !1
        }, {
            name: "Vertex Colors",
            value: !1
        }, {
            name: "texture",
            value: 0
        }, {
            name: "Texture Mask",
            value: 0
        }, {
            name: "colorizeTexture",
            value: !1
        }, {
            name: "texture Lookup",
            value: !1
        }],
        portsOut: [{
            name: "trigger"
        }, {
            name: "shader"
        }]
    }, {
        opId: "a01c344b-4129-4b01-9c8f-36cefe86d7cc",
        objName: "Ops.Array.ArrayMultiply",
        id: "a3688297-6d74-4824-8e8c-f37b473d3bef",
        uiAttribs: {
            translate: {
                x: 60,
                y: 2020
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "In",
            links: [{
                portIn: "In",
                portOut: "Array 1 out",
                objIn: "a3688297-6d74-4824-8e8c-f37b473d3bef",
                objOut: "cd501bf8-d92b-4a30-8d83-b3dd396c1f25"
            }]
        }, {
            name: "Value",
            value: 10
        }],
        portsOut: [{
            name: "Result"
        }]
    }, {
        opId: "c6b5bf63-0be8-4eea-acc0-9d32973e665a",
        objName: "Ops.Array.ArraySum",
        id: "af6f9487-a34d-4f25-a4aa-cd09e8c110df",
        uiAttribs: {
            translate: {
                x: 60,
                y: 2100
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "In",
            links: [{
                portIn: "In",
                portOut: "Result",
                objIn: "af6f9487-a34d-4f25-a4aa-cd09e8c110df",
                objOut: "a3688297-6d74-4824-8e8c-f37b473d3bef"
            }]
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "Time",
                objIn: "af6f9487-a34d-4f25-a4aa-cd09e8c110df",
                objOut: "8721cbc5-b10d-4480-aa5a-62d2178a721d"
            }]
        }],
        portsOut: [{
            name: "Result"
        }]
    }, {
        opId: "30a5568b-31da-4504-9525-578ee404993c",
        objName: "Ops.Array.ArrayModulo",
        id: "1b6b7c7a-ff4b-46b6-8ef8-43d6c4e4143b",
        uiAttribs: {
            translate: {
                x: 60,
                y: 2260
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Array In",
            links: [{
                portIn: "Array In",
                portOut: "Array result",
                objIn: "1b6b7c7a-ff4b-46b6-8ef8-43d6c4e4143b",
                objOut: "36f274fe-71e5-4659-8daf-808193104051"
            }]
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "1b6b7c7a-ff4b-46b6-8ef8-43d6c4e4143b",
                objOut: "2a8d85d2-32e2-40b3-a8d4-13cfd280166c"
            }]
        }],
        portsOut: [{
            name: "Array Out"
        }]
    }, {
        opId: "af78ab59-75d5-4ead-9a8d-27a63e1cbf3f",
        objName: "Ops.Array.ArraySubtract",
        id: "325796f7-61cd-4999-8e5f-2a1347e7ebc7",
        uiAttribs: {
            translate: {
                x: 60,
                y: 2340
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Array In",
            links: [{
                portIn: "Array In",
                portOut: "Array Out",
                objIn: "325796f7-61cd-4999-8e5f-2a1347e7ebc7",
                objOut: "1b6b7c7a-ff4b-46b6-8ef8-43d6c4e4143b"
            }]
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "325796f7-61cd-4999-8e5f-2a1347e7ebc7",
                objOut: "b8c0184a-4845-4497-9c97-f9e4589b6407"
            }]
        }],
        portsOut: [{
            name: "Array Out"
        }]
    }, {
        opId: "8fb2bb5d-665a-4d0a-8079-12710ae453be",
        objName: "Ops.Value.Number",
        id: "2a8d85d2-32e2-40b3-a8d4-13cfd280166c",
        uiAttribs: {
            title: "Value",
            translate: {
                x: -12,
                y: 2180
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            value: .5
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "86fcfd8c-038d-4b91-9820-a08114f6b7eb",
        objName: "Ops.Math.Divide",
        id: "b8c0184a-4845-4497-9c97-f9e4589b6407",
        uiAttribs: {
            translate: {
                x: -12,
                y: 2260
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "number1",
            links: [{
                portIn: "number1",
                portOut: "result",
                objIn: "b8c0184a-4845-4497-9c97-f9e4589b6407",
                objOut: "2a8d85d2-32e2-40b3-a8d4-13cfd280166c"
            }]
        }, {
            name: "number2",
            value: 1e6
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "8b9cdeea-f94c-41dc-b743-627115289226",
        objName: "Ops.Deprecated.Array.ContinuousNumberArray",
        id: "9ce27653-4d64-4560-bd50-ca64945bfa5d",
        uiAttribs: {
            translate: {
                x: 192,
                y: 2020
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "numValues",
            links: [{
                portIn: "numValues",
                portOut: "result",
                objIn: "9ce27653-4d64-4560-bd50-ca64945bfa5d",
                objOut: "cad886e8-240e-4d71-826e-d585fa0c0513"
            }]
        }],
        portsOut: [{
            name: "values"
        }]
    }, {
        opId: "a01c344b-4129-4b01-9c8f-36cefe86d7cc",
        objName: "Ops.Array.ArrayMultiply",
        id: "c6b04760-8d9d-4f7c-9906-914b640608ef",
        uiAttribs: {
            translate: {
                x: 192,
                y: 2100
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "In",
            links: [{
                portIn: "In",
                portOut: "values",
                objIn: "c6b04760-8d9d-4f7c-9906-914b640608ef",
                objOut: "9ce27653-4d64-4560-bd50-ca64945bfa5d"
            }]
        }, {
            name: "Value",
            value: .1
        }],
        portsOut: [{
            name: "Result"
        }]
    }, {
        opId: "f31a1764-ce14-41de-9b3f-dc2fe249bb52",
        objName: "Ops.Array.ArrayMathArray",
        id: "36f274fe-71e5-4659-8daf-808193104051",
        uiAttribs: {
            title: "ArrayMath",
            translate: {
                x: 60,
                y: 2180
            },
            subPatch: 0,
            notWorkingMsg: null,
            error: null,
            extendTitle: "*"
        },
        portsIn: [{
            name: "array 0",
            links: [{
                portIn: "array 0",
                portOut: "Result",
                objIn: "36f274fe-71e5-4659-8daf-808193104051",
                objOut: "af6f9487-a34d-4f25-a4aa-cd09e8c110df"
            }]
        }, {
            name: "array 1",
            links: [{
                portIn: "array 1",
                portOut: "Result",
                objIn: "36f274fe-71e5-4659-8daf-808193104051",
                objOut: "63ccb748-bee2-4789-9024-b631f63e786f"
            }]
        }, {
            name: "Math function",
            value: "*"
        }],
        portsOut: [{
            name: "Array result"
        }, {
            name: "Array length",
            value: 1e3
        }]
    }, {
        opId: "c6b5bf63-0be8-4eea-acc0-9d32973e665a",
        objName: "Ops.Array.ArraySum",
        id: "63ccb748-bee2-4789-9024-b631f63e786f",
        uiAttribs: {
            translate: {
                x: 192,
                y: 2260
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "In",
            links: [{
                portIn: "In",
                portOut: "Array result",
                objIn: "63ccb748-bee2-4789-9024-b631f63e786f",
                objOut: "bb24ac61-d417-4566-b91b-eabf0d9257a7"
            }]
        }, {
            name: "Value",
            value: 1
        }],
        portsOut: [{
            name: "Result"
        }]
    }, {
        opId: "5677b5b5-753a-4fbf-9e91-64c81ec68a2f",
        objName: "Ops.Anim.Smooth",
        id: "a40b4bc6-0592-430d-b404-22517777e32b",
        uiAttribs: {
            translate: {
                x: 660,
                y: 1660
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Update",
            links: [{
                portIn: "Update",
                portOut: "Next",
                objIn: "a40b4bc6-0592-430d-b404-22517777e32b",
                objOut: "04401fe4-5a3e-44fe-b1ef-a74aacd3be24"
            }]
        }, {
            name: "Separate inc/dec",
            value: !0
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "a40b4bc6-0592-430d-b404-22517777e32b",
                objOut: "3d2cef7d-2725-4447-aab2-4e61d4f685d3"
            }]
        }, {
            name: "Inc factor",
            value: 16
        }, {
            name: "Dec factor",
            value: 1
        }],
        portsOut: [{
            name: "Next"
        }, {
            name: "Result"
        }]
    }, {
        opId: "5677b5b5-753a-4fbf-9e91-64c81ec68a2f",
        objName: "Ops.Anim.Smooth",
        id: "13b99023-ee11-498f-81b6-30c7d4085f27",
        uiAttribs: {
            translate: {
                x: 756,
                y: 1660
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Update",
            links: [{
                portIn: "Update",
                portOut: "Next",
                objIn: "13b99023-ee11-498f-81b6-30c7d4085f27",
                objOut: "a40b4bc6-0592-430d-b404-22517777e32b"
            }]
        }, {
            name: "Separate inc/dec",
            value: !0
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "13b99023-ee11-498f-81b6-30c7d4085f27",
                objOut: "c9199168-b6a9-463b-96d7-621af0ae020e"
            }]
        }, {
            name: "Inc factor",
            value: 4
        }, {
            name: "Dec factor",
            value: 1
        }],
        portsOut: [{
            name: "Next",
            value: 0
        }, {
            name: "Result"
        }]
    }, {
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "f2dd418b-df54-4469-9d0d-465db1647d3e",
        uiAttribs: {
            translate: {
                x: 0,
                y: 1580
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "f2dd418b-df54-4469-9d0d-465db1647d3e",
                objOut: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e"
            }]
        }, {
            name: "old min",
            value: 0
        }, {
            name: "old max",
            value: .8
        }, {
            name: "new min",
            value: .1
        }, {
            name: "new max",
            value: -.4
        }, {
            name: "Easing",
            value: "Linear"
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "d0fea2ea-7937-4481-a9bc-e743ab980642",
        uiAttribs: {
            translate: {
                x: 96,
                y: 1580
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "d0fea2ea-7937-4481-a9bc-e743ab980642",
                objOut: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e"
            }]
        }, {
            name: "old min",
            value: 0
        }, {
            name: "old max",
            value: .8
        }, {
            name: "new min",
            value: 0
        }, {
            name: "new max",
            value: 1e-6
        }, {
            name: "Easing",
            value: "Linear"
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "733bfa32-997c-46b6-ba07-6c2a5bf80207",
        uiAttribs: {
            translate: {
                x: 192,
                y: 1580
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "733bfa32-997c-46b6-ba07-6c2a5bf80207",
                objOut: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e"
            }]
        }, {
            name: "old min",
            value: 0
        }, {
            name: "old max",
            value: .8
        }, {
            name: "new min",
            value: 3
        }, {
            name: "new max",
            value: 5
        }, {
            name: "Easing",
            value: "Linear"
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "91843a73-4f90-4777-9c8c-2f6bd7bc97c0",
        uiAttribs: {
            translate: {
                x: 288,
                y: 1580
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "91843a73-4f90-4777-9c8c-2f6bd7bc97c0",
                objOut: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e"
            }]
        }, {
            name: "old min",
            value: 0
        }, {
            name: "old max",
            value: .7
        }, {
            name: "new min",
            value: .75
        }, {
            name: "new max",
            value: 1
        }, {
            name: "Easing",
            value: "Linear"
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "f3fb2d5b-ddcb-4d5e-852d-a7df2ffe2f5c",
        uiAttribs: {
            translate: {
                x: 384,
                y: 1580
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "f3fb2d5b-ddcb-4d5e-852d-a7df2ffe2f5c",
                objOut: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e"
            }]
        }, {
            name: "old min",
            value: 0
        }, {
            name: "old max",
            value: .7
        }, {
            name: "new min",
            value: .145
        }, {
            name: "new max",
            value: .996
        }, {
            name: "Easing",
            value: "Linear"
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "33508cd9-e1e5-4528-871e-a572f4537923",
        uiAttribs: {
            translate: {
                x: 480,
                y: 1580
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "33508cd9-e1e5-4528-871e-a572f4537923",
                objOut: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e"
            }]
        }, {
            name: "old min",
            value: 0
        }, {
            name: "old max",
            value: .7
        }, {
            name: "new min",
            value: .157
        }, {
            name: "new max",
            value: 1
        }, {
            name: "Easing",
            value: "Linear"
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "6d3a7c27-cc72-4005-8c67-e736a9ec1c07",
        uiAttribs: {
            translate: {
                x: 576,
                y: 1580
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "6d3a7c27-cc72-4005-8c67-e736a9ec1c07",
                objOut: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e"
            }]
        }, {
            name: "old min",
            value: 0
        }, {
            name: "old max",
            value: .7
        }, {
            name: "new min",
            value: .176
        }, {
            name: "new max",
            value: .98
        }, {
            name: "Easing",
            value: "Linear"
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "50e7f565-0cdb-47ca-912b-87c04e2f00e3",
        objName: "Ops.Gl.Matrix.Scale",
        id: "9e297a08-ff26-4e9e-bd5b-6ada7259f902",
        uiAttribs: {
            translate: {
                x: -96,
                y: 1660
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "render",
            links: [{
                portIn: "render",
                portOut: "trigger 0",
                objIn: "9e297a08-ff26-4e9e-bd5b-6ada7259f902",
                objOut: "d2d4681f-661a-4671-bfd0-514600f04dae"
            }]
        }, {
            name: "scale",
            value: 6
        }],
        portsOut: [{
            name: "trigger"
        }]
    }, {
        opId: "fa671f66-6957-41e6-ac35-d615b7c29285",
        objName: "Ops.Array.ArrayUnpack3",
        id: "cd501bf8-d92b-4a30-8d83-b3dd396c1f25",
        uiAttribs: {
            translate: {
                x: 60,
                y: 1940
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Array in xyz",
            links: [{
                portIn: "Array in xyz",
                portOut: "values",
                objIn: "cd501bf8-d92b-4a30-8d83-b3dd396c1f25",
                objOut: "8b948e1b-aef6-4d60-9dcf-ae1a8d688a6c"
            }]
        }],
        portsOut: [{
            name: "Array 1 out"
        }, {
            name: "Array 2 out"
        }, {
            name: "Array 3 out"
        }, {
            name: "Array lengths",
            value: 1e3
        }]
    }, {
        opId: "86fcfd8c-038d-4b91-9820-a08114f6b7eb",
        objName: "Ops.Math.Divide",
        id: "cad886e8-240e-4d71-826e-d585fa0c0513",
        uiAttribs: {
            translate: {
                x: 192,
                y: 1940
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "number1",
            links: [{
                portIn: "number1",
                portOut: "length",
                objIn: "cad886e8-240e-4d71-826e-d585fa0c0513",
                objOut: "d8f6c2e5-1579-417b-abca-15960e616584"
            }]
        }, {
            name: "number2",
            value: 3
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "3d2cef7d-2725-4447-aab2-4e61d4f685d3",
        uiAttribs: {
            translate: {
                x: 672,
                y: 1580
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "3d2cef7d-2725-4447-aab2-4e61d4f685d3",
                objOut: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e"
            }]
        }, {
            name: "old min",
            value: 0
        }, {
            name: "old max",
            value: .8
        }, {
            name: "new min",
            value: .02
        }, {
            name: "new max",
            value: .15
        }, {
            name: "Easing",
            value: "Linear"
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "c9199168-b6a9-463b-96d7-621af0ae020e",
        uiAttribs: {
            translate: {
                x: 768,
                y: 1580
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "c9199168-b6a9-463b-96d7-621af0ae020e",
                objOut: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e"
            }]
        }, {
            name: "old min",
            value: 0
        }, {
            name: "old max",
            value: .8
        }, {
            name: "new min",
            value: .25
        }, {
            name: "new max",
            value: 1
        }, {
            name: "Easing",
            value: "Linear"
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "22523fae-a623-401d-b952-a57c26de4b4e",
        objName: "Ops.WebAudio.AudioAnalyzer",
        id: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e",
        uiAttribs: {
            translate: {
                x: -24,
                y: 1500
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "FFT size",
            value: 256
        }, {
            name: "refresh",
            links: [{
                portIn: "refresh",
                portOut: "trigger 1",
                objIn: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e",
                objOut: "d2d4681f-661a-4671-bfd0-514600f04dae"
            }]
        }, {
            name: "Audio In",
            links: [{
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e",
                objOut: "5a8df807-9944-45fb-9929-c6ffa942d5ec"
            }, {
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e",
                objOut: "39878968-75bd-4d48-9dc6-5d1cee8b6ee5"
            }, {
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e",
                objOut: "f21ee2af-db47-4360-9029-0af24091d769"
            }, {
                portIn: "Audio In",
                portOut: "Result",
                objIn: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e",
                objOut: "56bad45e-2433-4807-8b01-11035db982db"
            }, {
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e",
                objOut: "f267b8a5-0199-495f-817f-4dc7eec76558"
            }]
        }, {
            name: "Data",
            value: "Frequency"
        }],
        portsOut: [{
            name: "Next"
        }, {
            name: "Audio Out"
        }, {
            name: "average volume"
        }, {
            name: "fft",
            value: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: 0,
                11: 0,
                12: 0,
                13: 0,
                14: 0,
                15: 0,
                16: 0,
                17: 0,
                18: 0,
                19: 0,
                20: 0,
                21: 0,
                22: 0,
                23: 0,
                24: 0,
                25: 0,
                26: 0,
                27: 0,
                28: 0,
                29: 0,
                30: 0,
                31: 0,
                32: 0,
                33: 0,
                34: 0,
                35: 0,
                36: 0,
                37: 0,
                38: 0,
                39: 0,
                40: 0,
                41: 0,
                42: 0,
                43: 0,
                44: 0,
                45: 0,
                46: 0,
                47: 0,
                48: 0,
                49: 0,
                50: 0,
                51: 0,
                52: 0,
                53: 0,
                54: 0,
                55: 0,
                56: 0,
                57: 0,
                58: 0,
                59: 0,
                60: 0,
                61: 0,
                62: 0,
                63: 0,
                64: 0,
                65: 0,
                66: 0,
                67: 0,
                68: 0,
                69: 0,
                70: 0,
                71: 0,
                72: 0,
                73: 0,
                74: 0,
                75: 0,
                76: 0,
                77: 0,
                78: 0,
                79: 0,
                80: 0,
                81: 0,
                82: 0,
                83: 0,
                84: 0,
                85: 0,
                86: 0,
                87: 0,
                88: 0,
                89: 0,
                90: 0,
                91: 0,
                92: 0,
                93: 0,
                94: 0,
                95: 0,
                96: 0,
                97: 0,
                98: 0,
                99: 0,
                100: 0,
                101: 0,
                102: 0,
                103: 0,
                104: 0,
                105: 0,
                106: 0,
                107: 0,
                108: 0,
                109: 0,
                110: 0,
                111: 0,
                112: 0,
                113: 0,
                114: 0,
                115: 0,
                116: 0,
                117: 0,
                118: 0,
                119: 0,
                120: 0,
                121: 0,
                122: 0,
                123: 0,
                124: 0,
                125: 0,
                126: 0,
                127: 0
            }
        }]
    }, {
        opId: "53fdbf4a-bc8d-4c5d-a698-f34fdeb53827",
        objName: "Ops.WebAudio.Output",
        id: "f2e01faf-3d26-42da-a2e5-889abbb4a5ca",
        uiAttribs: {
            translate: {
                x: -228,
                y: 360
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Audio In",
            links: [{
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "f2e01faf-3d26-42da-a2e5-889abbb4a5ca",
                objOut: "5a8df807-9944-45fb-9929-c6ffa942d5ec"
            }, {
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "f2e01faf-3d26-42da-a2e5-889abbb4a5ca",
                objOut: "39878968-75bd-4d48-9dc6-5d1cee8b6ee5"
            }, {
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "f2e01faf-3d26-42da-a2e5-889abbb4a5ca",
                objOut: "f21ee2af-db47-4360-9029-0af24091d769"
            }, {
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "f2e01faf-3d26-42da-a2e5-889abbb4a5ca",
                objOut: "f267b8a5-0199-495f-817f-4dc7eec76558"
            }]
        }, {
            name: "Volume",
            value: 1
        }, {
            name: "Mute",
            value: !1
        }],
        portsOut: []
    }, {
        opId: "a466bc1f-06e9-4595-8849-bffb9fe22f99",
        objName: "Ops.Sequence",
        id: "d2d4681f-661a-4671-bfd0-514600f04dae",
        uiAttribs: {
            translate: {
                x: -96,
                y: 1420
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "exe",
            links: [{
                portIn: "exe",
                portOut: "trigger",
                objIn: "d2d4681f-661a-4671-bfd0-514600f04dae",
                objOut: "be88a35f-abf0-41ea-a21e-604d5ef31c57"
            }]
        }, {
            name: "exe 0",
            value: 0
        }, {
            name: "exe 1",
            value: 0
        }, {
            name: "exe 2",
            value: 0
        }, {
            name: "exe 3",
            value: 0
        }, {
            name: "exe 4",
            value: 0
        }, {
            name: "exe 5",
            value: 0
        }, {
            name: "exe 6",
            value: 0
        }, {
            name: "exe 7",
            value: 0
        }, {
            name: "exe 8",
            value: 0
        }, {
            name: "exe 9",
            value: 0
        }, {
            name: "exe 10",
            value: 0
        }, {
            name: "exe 11",
            value: 0
        }, {
            name: "exe 12",
            value: 0
        }, {
            name: "exe 13",
            value: 0
        }, {
            name: "exe 14",
            value: 0
        }],
        portsOut: [{
            name: "trigger 0"
        }, {
            name: "trigger 1"
        }, {
            name: "trigger 2"
        }, {
            name: "trigger 3",
            value: 0
        }, {
            name: "trigger 4",
            value: 0
        }, {
            name: "trigger 5",
            value: 0
        }, {
            name: "trigger 6",
            value: 0
        }, {
            name: "trigger 7",
            value: 0
        }, {
            name: "trigger 8",
            value: 0
        }, {
            name: "trigger 9",
            value: 0
        }, {
            name: "trigger 10",
            value: 0
        }, {
            name: "trigger 11",
            value: 0
        }, {
            name: "trigger 12",
            value: 0
        }, {
            name: "trigger 13",
            value: 0
        }, {
            name: "trigger 14",
            value: 0
        }, {
            name: "trigger 15",
            value: 0
        }]
    }, {
        opId: "7f981578-542e-417b-b304-8fbe41258772",
        objName: "Ops.Array.RandomNumbersArray3",
        id: "8b948e1b-aef6-4d60-9dcf-ae1a8d688a6c",
        uiAttribs: {
            title: "RandomArray3x",
            translate: {
                x: 60,
                y: 1860
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "numValues",
            value: 1e3
        }, {
            name: "Min",
            value: -1
        }, {
            name: "Max",
            value: 1
        }, {
            name: "random seed",
            value: 0
        }, {
            name: "Last == First",
            value: !1
        }, {
            name: "Integer",
            value: !1
        }],
        portsOut: [{
            name: "values"
        }, {
            name: "Total points",
            value: 1e3
        }, {
            name: "Array length",
            value: 3e3
        }]
    }, {
        opId: "eaf4f7ce-08a3-4d1b-b9f4-ebc0b7b1cde1",
        objName: "Ops.Gl.Matrix.OrbitControls",
        id: "be88a35f-abf0-41ea-a21e-604d5ef31c57",
        uiAttribs: {
            translate: {
                x: -96,
                y: 1340
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "render",
            links: [{
                portIn: "render",
                portOut: "trigger",
                objIn: "be88a35f-abf0-41ea-a21e-604d5ef31c57",
                objOut: "3edd51d2-7e91-446a-8b87-2e068d058c83"
            }]
        }, {
            name: "min distance",
            value: .75
        }, {
            name: "max distance",
            value: .75
        }, {
            name: "min rot y",
            value: 0
        }, {
            name: "max rot y",
            value: 0,
            anim: {
                keys: [{
                    t: 0,
                    v: 360,
                    e: 0
                }],
                loop: !1
            }
        }, {
            name: "initial radius",
            value: .75
        }, {
            name: "initial axis y",
            value: 0
        }, {
            name: "initial axis x",
            links: [{
                portIn: "initial axis x",
                portOut: "Time",
                objIn: "be88a35f-abf0-41ea-a21e-604d5ef31c57",
                objOut: "86cbb8f3-71f7-4b06-b224-c749ce6a07f6"
            }]
        }, {
            name: "mul",
            value: 1,
            anim: {
                keys: [{
                    t: 0,
                    v: 1,
                    e: 0
                }],
                loop: !1
            }
        }, {
            name: "Smoothness",
            value: 2
        }, {
            name: "Speed X",
            value: 1
        }, {
            name: "Speed Y",
            value: 1
        }, {
            name: "Active",
            value: !0
        }, {
            name: "Allow Panning",
            value: !1
        }, {
            name: "Allow Zooming",
            value: !1
        }, {
            name: "Allow Rotation",
            value: !1
        }, {
            name: "restricted",
            value: !0
        }, {
            name: "Pointerlock",
            value: !1
        }, {
            name: "Reset",
            value: 0
        }],
        portsOut: [{
            name: "trigger"
        }, {
            name: "radius",
            value: .75
        }, {
            name: "Rot X",
            value: 456.00039134638587
        }, {
            name: "Rot Y",
            value: 0
        }]
    }, {
        opId: "ea508405-833d-411a-86b4-1a012c135c8a",
        objName: "Ops.Array.ArrayLength",
        id: "d8f6c2e5-1579-417b-abca-15960e616584",
        uiAttribs: {
            translate: {
                x: 192,
                y: 1860
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "array",
            links: [{
                portIn: "array",
                portOut: "values",
                objIn: "d8f6c2e5-1579-417b-abca-15960e616584",
                objOut: "8b948e1b-aef6-4d60-9dcf-ae1a8d688a6c"
            }]
        }],
        portsOut: [{
            name: "length"
        }]
    }, {
        opId: "aac7f721-208f-411a-adb3-79adae2e471a",
        objName: "Ops.Anim.Timer_v2",
        id: "232311ca-91b5-4516-a784-bf7733287aa3",
        uiAttribs: {
            title: "Timer2",
            translate: {
                x: 372,
                y: 1800
            },
            subPatch: 0,
            notWorkingMsg: null,
            color: "#07F78C"
        },
        portsIn: [{
            name: "Speed",
            links: [{
                portIn: "Speed",
                portOut: "Result",
                objIn: "232311ca-91b5-4516-a784-bf7733287aa3",
                objOut: "a40b4bc6-0592-430d-b404-22517777e32b"
            }]
        }, {
            name: "Play",
            value: !0
        }, {
            name: "Reset",
            value: null
        }, {
            name: "Sync to timeline",
            value: !1
        }],
        portsOut: [{
            name: "Time"
        }]
    }, {
        opId: "aac7f721-208f-411a-adb3-79adae2e471a",
        objName: "Ops.Anim.Timer_v2",
        id: "e76d5d63-69f1-448a-9690-415a55e2edef",
        uiAttribs: {
            title: "Timer2",
            translate: {
                x: 480,
                y: 1800
            },
            subPatch: 0,
            notWorkingMsg: null,
            color: "#07F78C"
        },
        portsIn: [{
            name: "Speed",
            links: [{
                portIn: "Speed",
                portOut: "result",
                objIn: "e76d5d63-69f1-448a-9690-415a55e2edef",
                objOut: "248b26e9-50dd-496a-8fe6-3f3168dd5746"
            }]
        }, {
            name: "Play",
            value: !0
        }, {
            name: "Reset",
            value: null
        }, {
            name: "Sync to timeline",
            value: !1
        }],
        portsOut: [{
            name: "Time"
        }]
    }, {
        opId: "b0472a1d-db16-4ba6-8787-f300fbdc77bb",
        objName: "Ops.Gl.MainLoop",
        id: "911dd833-0622-4d65-9ae0-9c75c0897631",
        uiAttribs: {
            translate: {
                x: -96,
                y: 1180
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "FPS Limit",
            value: 0
        }, {
            name: "Reduce FPS loading",
            value: !1
        }, {
            name: "Clear",
            value: !0
        }, {
            name: "ClearAlpha",
            value: !0
        }, {
            name: "Fullscreen Button",
            value: !1
        }, {
            name: "Active",
            value: !0
        }, {
            name: "Hires Displays",
            value: !1
        }],
        portsOut: [{
            name: "trigger"
        }, {
            name: "width",
            value: 771
        }, {
            name: "height",
            value: 371
        }]
    }, {
        opId: "19b441eb-9f63-4f35-ba08-b87841517c4d",
        objName: "Ops.Gl.ClearColor",
        id: "3edd51d2-7e91-446a-8b87-2e068d058c83",
        uiAttribs: {
            translate: {
                x: -96,
                y: 1260
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "render",
            links: [{
                portIn: "render",
                portOut: "trigger",
                objIn: "3edd51d2-7e91-446a-8b87-2e068d058c83",
                objOut: "911dd833-0622-4d65-9ae0-9c75c0897631"
            }]
        }, {
            name: "r",
            value: .145
        }, {
            name: "g",
            value: .157
        }, {
            name: "b",
            value: .176
        }, {
            name: "a",
            value: 1
        }],
        portsOut: [{
            name: "trigger"
        }]
    }, {
        opId: "aac7f721-208f-411a-adb3-79adae2e471a",
        objName: "Ops.Anim.Timer_v2",
        id: "8721cbc5-b10d-4480-aa5a-62d2178a721d",
        uiAttribs: {
            title: "Timer2",
            translate: {
                x: 72,
                y: 1800
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Speed",
            links: [{
                portIn: "Speed",
                portOut: "Result",
                objIn: "8721cbc5-b10d-4480-aa5a-62d2178a721d",
                objOut: "f784a56e-a3c8-48d2-a687-21d9742d9e44"
            }]
        }, {
            name: "Play",
            value: !0
        }, {
            name: "Reset",
            value: null
        }, {
            name: "Sync to timeline",
            value: !1
        }],
        portsOut: [{
            name: "Time"
        }]
    }, {
        opId: "3e28f86a-4f74-49a2-a1a6-f8943c00352d",
        objName: "Ops.WebAudio.BiquadFilter",
        id: "732bf3b3-29c5-4846-9a35-895edc9f0da5",
        uiAttribs: {
            translate: {
                x: -216,
                y: 1120
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Audio In",
            links: [{
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "732bf3b3-29c5-4846-9a35-895edc9f0da5",
                objOut: "5a8df807-9944-45fb-9929-c6ffa942d5ec"
            }, {
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "732bf3b3-29c5-4846-9a35-895edc9f0da5",
                objOut: "39878968-75bd-4d48-9dc6-5d1cee8b6ee5"
            }, {
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "732bf3b3-29c5-4846-9a35-895edc9f0da5",
                objOut: "f21ee2af-db47-4360-9029-0af24091d769"
            }, {
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "732bf3b3-29c5-4846-9a35-895edc9f0da5",
                objOut: "f267b8a5-0199-495f-817f-4dc7eec76558"
            }]
        }, {
            name: "type",
            value: "lowpass"
        }, {
            name: "frequency",
            value: 500
        }, {
            name: "detune",
            value: 0
        }, {
            name: "q",
            value: 1
        }, {
            name: "gain",
            value: 0
        }],
        portsOut: [{
            name: "Audio Out"
        }]
    }, {
        opId: "22523fae-a623-401d-b952-a57c26de4b4e",
        objName: "Ops.WebAudio.AudioAnalyzer",
        id: "666a187c-92fe-4e07-a780-42c201ca4137",
        uiAttribs: {
            translate: {
                x: -228,
                y: 1500
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "FFT size",
            value: 256
        }, {
            name: "refresh",
            links: [{
                portIn: "refresh",
                portOut: "trigger 2",
                objIn: "666a187c-92fe-4e07-a780-42c201ca4137",
                objOut: "d2d4681f-661a-4671-bfd0-514600f04dae"
            }]
        }, {
            name: "Audio In",
            links: [{
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "666a187c-92fe-4e07-a780-42c201ca4137",
                objOut: "732bf3b3-29c5-4846-9a35-895edc9f0da5"
            }]
        }, {
            name: "Data",
            value: "Frequency"
        }],
        portsOut: [{
            name: "Next"
        }, {
            name: "Audio Out"
        }, {
            name: "average volume"
        }, {
            name: "fft",
            value: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: 0,
                11: 0,
                12: 0,
                13: 0,
                14: 0,
                15: 0,
                16: 0,
                17: 0,
                18: 0,
                19: 0,
                20: 0,
                21: 0,
                22: 0,
                23: 0,
                24: 0,
                25: 0,
                26: 0,
                27: 0,
                28: 0,
                29: 0,
                30: 0,
                31: 0,
                32: 0,
                33: 0,
                34: 0,
                35: 0,
                36: 0,
                37: 0,
                38: 0,
                39: 0,
                40: 0,
                41: 0,
                42: 0,
                43: 0,
                44: 0,
                45: 0,
                46: 0,
                47: 0,
                48: 0,
                49: 0,
                50: 0,
                51: 0,
                52: 0,
                53: 0,
                54: 0,
                55: 0,
                56: 0,
                57: 0,
                58: 0,
                59: 0,
                60: 0,
                61: 0,
                62: 0,
                63: 0,
                64: 0,
                65: 0,
                66: 0,
                67: 0,
                68: 0,
                69: 0,
                70: 0,
                71: 0,
                72: 0,
                73: 0,
                74: 0,
                75: 0,
                76: 0,
                77: 0,
                78: 0,
                79: 0,
                80: 0,
                81: 0,
                82: 0,
                83: 0,
                84: 0,
                85: 0,
                86: 0,
                87: 0,
                88: 0,
                89: 0,
                90: 0,
                91: 0,
                92: 0,
                93: 0,
                94: 0,
                95: 0,
                96: 0,
                97: 0,
                98: 0,
                99: 0,
                100: 0,
                101: 0,
                102: 0,
                103: 0,
                104: 0,
                105: 0,
                106: 0,
                107: 0,
                108: 0,
                109: 0,
                110: 0,
                111: 0,
                112: 0,
                113: 0,
                114: 0,
                115: 0,
                116: 0,
                117: 0,
                118: 0,
                119: 0,
                120: 0,
                121: 0,
                122: 0,
                123: 0,
                124: 0,
                125: 0,
                126: 0,
                127: 0
            }
        }]
    }, {
        opId: "5677b5b5-753a-4fbf-9e91-64c81ec68a2f",
        objName: "Ops.Anim.Smooth",
        id: "4bc203d4-7e8a-47b1-9bac-5fb689f86d03",
        uiAttribs: {
            translate: {
                x: -228,
                y: 1660
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Update",
            links: [{
                portIn: "Update",
                portOut: "Next",
                objIn: "4bc203d4-7e8a-47b1-9bac-5fb689f86d03",
                objOut: "666a187c-92fe-4e07-a780-42c201ca4137"
            }]
        }, {
            name: "Separate inc/dec",
            value: !0
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "4bc203d4-7e8a-47b1-9bac-5fb689f86d03",
                objOut: "986166ed-f686-403d-8f3e-3c35f548faed"
            }]
        }, {
            name: "Inc factor",
            value: 4
        }, {
            name: "Dec factor",
            value: 1
        }],
        portsOut: [{
            name: "Next",
            value: 0
        }, {
            name: "Result"
        }]
    }, {
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "986166ed-f686-403d-8f3e-3c35f548faed",
        uiAttribs: {
            translate: {
                x: -204,
                y: 1580
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "986166ed-f686-403d-8f3e-3c35f548faed",
                objOut: "666a187c-92fe-4e07-a780-42c201ca4137"
            }]
        }, {
            name: "old min",
            value: 0
        }, {
            name: "old max",
            value: .15
        }, {
            name: "new min",
            value: .001
        }, {
            name: "new max",
            value: .005
        }, {
            name: "Easing",
            value: "Linear"
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "aac7f721-208f-411a-adb3-79adae2e471a",
        objName: "Ops.Anim.Timer_v2",
        id: "86cbb8f3-71f7-4b06-b224-c749ce6a07f6",
        uiAttribs: {
            translate: {
                x: 24,
                y: 1180
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Speed",
            links: [{
                portIn: "Speed",
                portOut: "Result",
                objIn: "86cbb8f3-71f7-4b06-b224-c749ce6a07f6",
                objOut: "4bc203d4-7e8a-47b1-9bac-5fb689f86d03"
            }]
        }, {
            name: "Play",
            value: !0
        }, {
            name: "Reset",
            value: 0
        }, {
            name: "Sync to timeline",
            value: !1
        }],
        portsOut: [{
            name: "Time"
        }]
    }, {
        opId: "e9fdcaca-a007-4563-8a4d-e94e08506e0f",
        objName: "Ops.Math.Math",
        id: "248b26e9-50dd-496a-8fe6-3f3168dd5746",
        uiAttribs: {
            translate: {
                x: 672,
                y: 1720
            },
            subPatch: 0,
            notWorkingMsg: null,
            extendTitle: "/"
        },
        portsIn: [{
            name: "number 0",
            links: [{
                portIn: "number 0",
                portOut: "Result",
                objIn: "248b26e9-50dd-496a-8fe6-3f3168dd5746",
                objOut: "a40b4bc6-0592-430d-b404-22517777e32b"
            }]
        }, {
            name: "number 1",
            value: 4
        }, {
            name: "math mode",
            value: "/"
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        objName: "Ops.User.l6n.GetSoundcloud",
        id: "287f9a3c-6b56-496d-9f35-df3e4a44ef5a",
        uiAttribs: {
            translate: {
                x: -204,
                y: -1680
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "SoundCloud URL",
            value: "https://soundcloud.com/pierrevieira/petit-biscuit-jungle"
        }],
        portsOut: [{
            name: "Stream URL"
        }, {
            name: "Artwork URL"
        }, {
            name: "Title"
        }, {
            name: "Result"
        }]
    }, {
        opId: "a56d3edd-06ad-44ed-9810-dbf714600c67",
        objName: "Ops.Html.CSS_v2",
        id: "3674dbeb-714f-474c-a33f-630a1cf533e2",
        uiAttribs: {
            translate: {
                x: -204,
                y: -1720
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "css code",
            value: ".songCard\n{\n    height: 100px;\n    width: 100px;\n    bottom: 35px;\n    right: 35px;\n    opacity: 0.75;\n    border-radius: 10px;\n    transition: opacity 0.4s ease-in-out;\n}\n.back3\n{\n    width:  20px;\n    height: 20px;\n    right: 110px;\n    bottom: 40px;\n    opacity: 0.75;\n    transition: opacity 0.4s ease-in-out;\n}\n.reset3\n{\n    width:  20px;\n    height: 20px;\n    right: 75px;\n    bottom: 40px;\n    opacity: 0.75;\n    transition: opacity 0.4s ease-in-out;\n}\n.next3\n{\n    width:  20px;\n    height: 20px;\n    right: 40px;\n    bottom: 40px;\n    opacity: 0.75;\n    transition: opacity 0.4s ease-in-out;\n}\n.hover\n{\n    opacity: 1.0;\n}\n.clicked\n{\n    opacity: 0.75;\n}"
        }],
        portsOut: []
    }, {
        opId: "da3de45b-c252-4785-8558-7fadb199ea61",
        objName: "Ops.Html.BackgroundImage",
        id: "1e6133c9-f5f6-4a2d-9cc5-7aab0366b169",
        uiAttribs: {
            translate: {
                x: -228,
                y: 140
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "1e6133c9-f5f6-4a2d-9cc5-7aab0366b169",
                objOut: "02653ce3-5e15-4f29-b361-b5b69937dea8"
            }]
        }, {
            name: "active",
            value: !0
        }, {
            name: "image file",
            display: "file",
            links: [{
                portIn: "image file",
                portOut: "Artwork URL",
                objIn: "1e6133c9-f5f6-4a2d-9cc5-7aab0366b169",
                objOut: "287f9a3c-6b56-496d-9f35-df3e4a44ef5a"
            }]
        }, {
            name: "Size",
            value: "contain"
        }, {
            name: "Repeat",
            value: "no-repeat"
        }, {
            name: "Position",
            value: "center center"
        }],
        portsOut: [{
            name: "HTML Element"
        }]
    }, {
        opId: "da3de45b-c252-4785-8558-7fadb199ea61",
        objName: "Ops.Html.BackgroundImage",
        id: "484ccb27-dc10-4739-a125-44263dcb0d12",
        uiAttribs: {
            title: "Reset Image",
            translate: {
                x: -300,
                y: -1e3
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "484ccb27-dc10-4739-a125-44263dcb0d12",
                objOut: "f15b4bbd-75b5-4aef-9d94-c207ad67261c"
            }, {
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "484ccb27-dc10-4739-a125-44263dcb0d12",
                objOut: "87391e06-6d1a-4f3b-8f79-f402b4b2ca08"
            }, {
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "484ccb27-dc10-4739-a125-44263dcb0d12",
                objOut: "287b96d2-165b-4191-8396-33559b8c79f2"
            }, {
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "484ccb27-dc10-4739-a125-44263dcb0d12",
                objOut: "543b0d9e-59e7-4a45-8f31-15be660e79c9"
            }]
        }, {
            name: "active",
            value: !0
        }, {
            name: "image file",
            value: "assets/5d97c684a9243b2aa4175fdc_resetSong.png",
            display: "file"
        }, {
            name: "Size",
            value: "contain"
        }, {
            name: "Repeat",
            value: "no-repeat"
        }, {
            name: "Position",
            value: "center center"
        }],
        portsOut: [{
            name: "HTML Element"
        }]
    }, {
        opId: "da3de45b-c252-4785-8558-7fadb199ea61",
        objName: "Ops.Html.BackgroundImage",
        id: "53b110e2-5c47-4abc-bbc9-2b48cddf3874",
        uiAttribs: {
            title: "Next Image",
            translate: {
                x: -300,
                y: -740
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "53b110e2-5c47-4abc-bbc9-2b48cddf3874",
                objOut: "0f8a3e7d-b903-483e-8a95-eba338700d6e"
            }, {
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "53b110e2-5c47-4abc-bbc9-2b48cddf3874",
                objOut: "fa6635f2-56df-4077-8a61-47984602de96"
            }, {
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "53b110e2-5c47-4abc-bbc9-2b48cddf3874",
                objOut: "7f2b99cc-2254-4ad6-a83c-d17c0c55052a"
            }, {
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "53b110e2-5c47-4abc-bbc9-2b48cddf3874",
                objOut: "0bc9d883-5860-4931-8df4-6662e23ffdb4"
            }]
        }, {
            name: "active",
            value: !0
        }, {
            name: "image file",
            value: "assets/5d97c684a9243b2aa4175fdc_nextSong.png",
            display: "file"
        }, {
            name: "Size",
            value: "contain"
        }, {
            name: "Repeat",
            value: "no-repeat"
        }, {
            name: "Position",
            value: "center center"
        }],
        portsOut: [{
            name: "HTML Element"
        }]
    }, {
        opId: "da3de45b-c252-4785-8558-7fadb199ea61",
        objName: "Ops.Html.BackgroundImage",
        id: "beb2f4d8-d242-4c64-aa5d-30622abf07e5",
        uiAttribs: {
            title: "Back Image",
            translate: {
                x: -300,
                y: -1240
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "beb2f4d8-d242-4c64-aa5d-30622abf07e5",
                objOut: "f2df0fea-5173-4532-a2ba-29b1ca8f67bd"
            }, {
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "beb2f4d8-d242-4c64-aa5d-30622abf07e5",
                objOut: "746afa35-f920-412a-b398-752328fb3dee"
            }, {
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "beb2f4d8-d242-4c64-aa5d-30622abf07e5",
                objOut: "00983655-da34-4569-a02f-35d309187161"
            }, {
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "beb2f4d8-d242-4c64-aa5d-30622abf07e5",
                objOut: "f1a7a293-7a4f-4900-ac3c-cf36ad01d79c"
            }]
        }, {
            name: "active",
            value: !0
        }, {
            name: "image file",
            value: "assets/5d97c684a9243b2aa4175fdc_prevSong.png",
            display: "file"
        }, {
            name: "Size",
            value: "contain"
        }, {
            name: "Repeat",
            value: "no-repeat"
        }, {
            name: "Position",
            value: "center center"
        }],
        portsOut: [{
            name: "HTML Element"
        }]
    }, {
        opId: "f4ff66b0-8500-46f7-9117-832aea0c2750",
        objName: "Ops.Time.DelayedTrigger",
        id: "a3e81afb-d298-4c35-af1f-8e231ad33c7e",
        uiAttribs: {
            translate: {
                x: -36,
                y: 0
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "exe",
            links: [{
                portIn: "exe",
                portOut: "Output",
                objIn: "a3e81afb-d298-4c35-af1f-8e231ad33c7e",
                objOut: "e43e9bf2-41ca-4d17-8543-ce5af0fb22e0"
            }, {
                portIn: "exe",
                portOut: "Clicked",
                objIn: "a3e81afb-d298-4c35-af1f-8e231ad33c7e",
                objOut: "f15b4bbd-75b5-4aef-9d94-c207ad67261c"
            }, {
                portIn: "exe",
                portOut: "Touch End",
                objIn: "a3e81afb-d298-4c35-af1f-8e231ad33c7e",
                objOut: "16c83397-e5f3-4b69-8ec0-5863d97eb673"
            }]
        }, {
            name: "delay",
            value: .1
        }],
        portsOut: [{
            name: "next"
        }]
    }, {
        opId: "05385277-92fc-4d49-b730-11f9ed5e5c0d",
        objName: "Ops.WebAudio.AudioBufferPlayer",
        id: "5a8df807-9944-45fb-9929-c6ffa942d5ec",
        uiAttribs: {
            translate: {
                x: -84,
                y: 140
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Audio Buffer",
            links: [{
                portIn: "Audio Buffer",
                portOut: "Audio Buffer",
                objIn: "5a8df807-9944-45fb-9929-c6ffa942d5ec",
                objOut: "6c2cbf8c-4343-4b77-a2b8-239ee1b8ae68"
            }]
        }, {
            name: "Start / Stop",
            links: [{
                portIn: "Start / Stop",
                portOut: "result",
                objIn: "5a8df807-9944-45fb-9929-c6ffa942d5ec",
                objOut: "3d7db6f3-760c-46b8-8316-354f428ccc1b"
            }]
        }, {
            name: "Start Time",
            value: 0,
            anim: {
                keys: [{
                    t: 0,
                    v: 0,
                    e: 0
                }],
                loop: !1
            }
        }, {
            name: "Stop Time",
            value: 0
        }, {
            name: "Offset",
            links: [{
                portIn: "Offset",
                portOut: "Time",
                objIn: "5a8df807-9944-45fb-9929-c6ffa942d5ec",
                objOut: "6d0987d9-8ba2-421c-8c26-8a4c1361e22c"
            }]
        }, {
            name: "Autoplay",
            value: !1
        }, {
            name: "Loop",
            value: !1
        }, {
            name: "Detune",
            value: 0
        }, {
            name: "Playback Rate",
            value: 1
        }],
        portsOut: [{
            name: "Audio Out"
        }]
    }, {
        opId: "2cf4b0a1-b657-405b-8bf9-8555dbd5c231",
        objName: "Ops.WebAudio.AudioBuffer",
        id: "6c2cbf8c-4343-4b77-a2b8-239ee1b8ae68",
        uiAttribs: {
            translate: {
                x: -84,
                y: 80
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "URL",
            display: "file",
            links: [{
                portIn: "URL",
                portOut: "Stream URL",
                objIn: "6c2cbf8c-4343-4b77-a2b8-239ee1b8ae68",
                objOut: "287f9a3c-6b56-496d-9f35-df3e4a44ef5a"
            }]
        }],
        portsOut: [{
            name: "Audio Buffer"
        }, {
            name: "Finished Loading",
            value: !0
        }, {
            name: "Sample Rate",
            value: 48e3
        }, {
            name: "Length",
            value: 13149465
        }, {
            name: "Duration"
        }, {
            name: "Number of Channels",
            value: 2
        }]
    }, {
        opId: "aac7f721-208f-411a-adb3-79adae2e471a",
        objName: "Ops.Anim.Timer_v2",
        id: "6d0987d9-8ba2-421c-8c26-8a4c1361e22c",
        uiAttribs: {
            translate: {
                x: -36,
                y: -120
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Speed",
            value: 1
        }, {
            name: "Play",
            links: [{
                portIn: "Play",
                portOut: "result",
                objIn: "6d0987d9-8ba2-421c-8c26-8a4c1361e22c",
                objOut: "3d7db6f3-760c-46b8-8316-354f428ccc1b"
            }]
        }, {
            name: "Reset",
            links: [{
                portIn: "Reset",
                portOut: "Output",
                objIn: "6d0987d9-8ba2-421c-8c26-8a4c1361e22c",
                objOut: "e43e9bf2-41ca-4d17-8543-ce5af0fb22e0"
            }, {
                portIn: "Reset",
                portOut: "Clicked",
                objIn: "6d0987d9-8ba2-421c-8c26-8a4c1361e22c",
                objOut: "f15b4bbd-75b5-4aef-9d94-c207ad67261c"
            }, {
                portIn: "Reset",
                portOut: "Touch End",
                objIn: "6d0987d9-8ba2-421c-8c26-8a4c1361e22c",
                objOut: "16c83397-e5f3-4b69-8ec0-5863d97eb673"
            }]
        }, {
            name: "Sync to timeline",
            value: !1
        }],
        portsOut: [{
            name: "Time"
        }]
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "3d7db6f3-760c-46b8-8316-354f428ccc1b",
        uiAttribs: {
            translate: {
                x: -72,
                y: -180
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Click",
                objIn: "3d7db6f3-760c-46b8-8316-354f428ccc1b",
                objOut: "ab756b61-0932-43b1-9ffe-1335b6801181"
            }, {
                portIn: "trigger",
                portOut: "Touch Start",
                objIn: "3d7db6f3-760c-46b8-8316-354f428ccc1b",
                objOut: "ab756b61-0932-43b1-9ffe-1335b6801181"
            }, {
                portIn: "trigger",
                portOut: "Clicked",
                objIn: "3d7db6f3-760c-46b8-8316-354f428ccc1b",
                objOut: "746afa35-f920-412a-b398-752328fb3dee"
            }, {
                portIn: "trigger",
                portOut: "Clicked",
                objIn: "3d7db6f3-760c-46b8-8316-354f428ccc1b",
                objOut: "0bc9d883-5860-4931-8df4-6662e23ffdb4"
            }, {
                portIn: "trigger",
                portOut: "next",
                objIn: "3d7db6f3-760c-46b8-8316-354f428ccc1b",
                objOut: "a3e81afb-d298-4c35-af1f-8e231ad33c7e"
            }, {
                portIn: "trigger",
                portOut: "Touch End",
                objIn: "3d7db6f3-760c-46b8-8316-354f428ccc1b",
                objOut: "e402b9ea-cf3e-4940-aeae-d132d88fbd35"
            }, {
                portIn: "trigger",
                portOut: "Touch End",
                objIn: "3d7db6f3-760c-46b8-8316-354f428ccc1b",
                objOut: "9f87c5b7-0773-4070-8f7a-2bf2786b419a"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Output",
                objIn: "3d7db6f3-760c-46b8-8316-354f428ccc1b",
                objOut: "e43e9bf2-41ca-4d17-8543-ce5af0fb22e0"
            }, {
                portIn: "reset",
                portOut: "Clicked",
                objIn: "3d7db6f3-760c-46b8-8316-354f428ccc1b",
                objOut: "f15b4bbd-75b5-4aef-9d94-c207ad67261c"
            }, {
                portIn: "reset",
                portOut: "Clicked",
                objIn: "3d7db6f3-760c-46b8-8316-354f428ccc1b",
                objOut: "f2df0fea-5173-4532-a2ba-29b1ca8f67bd"
            }, {
                portIn: "reset",
                portOut: "Clicked",
                objIn: "3d7db6f3-760c-46b8-8316-354f428ccc1b",
                objOut: "0f8a3e7d-b903-483e-8a95-eba338700d6e"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "3d7db6f3-760c-46b8-8316-354f428ccc1b",
                objOut: "c8968c97-9f6e-4a11-801b-e438904d296d"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "3d7db6f3-760c-46b8-8316-354f428ccc1b",
                objOut: "6b7ab553-e53b-428c-bfc7-087d9ebfda65"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "ab756b61-0932-43b1-9ffe-1335b6801181",
        uiAttribs: {
            translate: {
                x: -108,
                y: -260
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "ab756b61-0932-43b1-9ffe-1335b6801181",
                objOut: "02653ce3-5e15-4f29-b361-b5b69937dea8"
            }]
        }, {
            name: "Mouse Down Active",
            value: !0
        }, {
            name: "Mouse Up Active",
            value: !0
        }, {
            name: "Click Active",
            value: !0
        }, {
            name: "Mouse Move Active",
            value: !0
        }, {
            name: "Touch Start Active",
            value: !0
        }, {
            name: "Touch Move Active",
            value: !0
        }, {
            name: "Touch End Active",
            value: !0
        }, {
            name: "Touch Cancel Active",
            value: !0
        }],
        portsOut: [{
            name: "Event Object"
        }, {
            name: "Mouse Down"
        }, {
            name: "Mouse Up"
        }, {
            name: "Click"
        }, {
            name: "Mouse Move",
            value: 0
        }, {
            name: "Touch Start"
        }, {
            name: "Touch Move",
            value: 0
        }, {
            name: "Touch End",
            value: 0
        }, {
            name: "Touch Cancel",
            value: 0
        }, {
            name: "Event Name",
            value: "mousemove"
        }]
    }, {
        opId: "ef0891db-6053-42ba-b7d5-29c7cf6d8208",
        objName: "Ops.Trigger.Threshold",
        id: "e43e9bf2-41ca-4d17-8543-ce5af0fb22e0",
        uiAttribs: {
            translate: {
                x: -24,
                y: -60
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Input",
            links: [{
                portIn: "Input",
                portOut: "Time",
                objIn: "e43e9bf2-41ca-4d17-8543-ce5af0fb22e0",
                objOut: "6d0987d9-8ba2-421c-8c26-8a4c1361e22c"
            }]
        }, {
            name: "Threshold",
            links: [{
                portIn: "Threshold",
                portOut: "Duration",
                objIn: "e43e9bf2-41ca-4d17-8543-ce5af0fb22e0",
                objOut: "6c2cbf8c-4343-4b77-a2b8-239ee1b8ae68"
            }]
        }],
        portsOut: [{
            name: "Output"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "12ebcd69-9319-412d-afd7-e0f6bf2eb38b",
        uiAttribs: {
            title: "HoverCSS",
            translate: {
                x: -108,
                y: -480
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "12ebcd69-9319-412d-afd7-e0f6bf2eb38b",
                objOut: "02653ce3-5e15-4f29-b361-b5b69937dea8"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "12ebcd69-9319-412d-afd7-e0f6bf2eb38b",
                objOut: "02653ce3-5e15-4f29-b361-b5b69937dea8"
            }]
        }],
        portsOut: []
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "fdb21b27-8e51-4eae-8a82-adbd2a1b5622",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: -96,
                y: -440
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "fdb21b27-8e51-4eae-8a82-adbd2a1b5622",
                objOut: "02653ce3-5e15-4f29-b361-b5b69937dea8"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "fdb21b27-8e51-4eae-8a82-adbd2a1b5622",
                objOut: "e8150989-c0a6-4712-81d6-5e86e9f01523"
            }]
        }],
        portsOut: []
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "e8150989-c0a6-4712-81d6-5e86e9f01523",
        uiAttribs: {
            translate: {
                x: -96,
                y: -400
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "e8150989-c0a6-4712-81d6-5e86e9f01523",
                objOut: "ab756b61-0932-43b1-9ffe-1335b6801181"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "e8150989-c0a6-4712-81d6-5e86e9f01523",
                objOut: "ab756b61-0932-43b1-9ffe-1335b6801181"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "173ff2f3-cca6-4c3e-b8f2-5d4be657a706",
        uiAttribs: {
            translate: {
                x: -72,
                y: -320
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "173ff2f3-cca6-4c3e-b8f2-5d4be657a706",
                objOut: "1ae31103-ee7f-4ded-8e22-4cd4eebb5d38"
            }]
        }, {
            name: "old min",
            value: 0
        }, {
            name: "old max",
            value: .8
        }, {
            name: "new min",
            value: 50
        }, {
            name: "new max",
            value: 100
        }, {
            name: "Easing",
            value: "Linear"
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "33befabf-7eef-45f6-869f-30e0e4f44739",
        objName: "Ops.Html.CSSFilter",
        id: "6ad2f290-1306-46dd-a794-9a6d62c17418",
        uiAttribs: {
            translate: {
                x: -84,
                y: -360
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "6ad2f290-1306-46dd-a794-9a6d62c17418",
                objOut: "02653ce3-5e15-4f29-b361-b5b69937dea8"
            }]
        }, {
            name: "method",
            value: "opacity"
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "6ad2f290-1306-46dd-a794-9a6d62c17418",
                objOut: "173ff2f3-cca6-4c3e-b8f2-5d4be657a706"
            }]
        }],
        portsOut: []
    }, {
        opId: "22523fae-a623-401d-b952-a57c26de4b4e",
        objName: "Ops.WebAudio.AudioAnalyzer",
        id: "1ae31103-ee7f-4ded-8e22-4cd4eebb5d38",
        uiAttribs: {
            translate: {
                x: -96,
                y: 200
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "FFT size",
            value: 256
        }, {
            name: "refresh",
            links: [{
                portIn: "refresh",
                portOut: "trigger",
                objIn: "1ae31103-ee7f-4ded-8e22-4cd4eebb5d38",
                objOut: "911dd833-0622-4d65-9ae0-9c75c0897631"
            }]
        }, {
            name: "Audio In",
            links: [{
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "1ae31103-ee7f-4ded-8e22-4cd4eebb5d38",
                objOut: "5a8df807-9944-45fb-9929-c6ffa942d5ec"
            }]
        }, {
            name: "Data",
            value: "Frequency"
        }],
        portsOut: [{
            name: "Next",
            value: 0
        }, {
            name: "Audio Out"
        }, {
            name: "average volume"
        }, {
            name: "fft",
            value: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: 0,
                11: 0,
                12: 0,
                13: 0,
                14: 0,
                15: 0,
                16: 0,
                17: 0,
                18: 0,
                19: 0,
                20: 0,
                21: 0,
                22: 0,
                23: 0,
                24: 0,
                25: 0,
                26: 0,
                27: 0,
                28: 0,
                29: 0,
                30: 0,
                31: 0,
                32: 0,
                33: 0,
                34: 0,
                35: 0,
                36: 0,
                37: 0,
                38: 0,
                39: 0,
                40: 0,
                41: 0,
                42: 0,
                43: 0,
                44: 0,
                45: 0,
                46: 0,
                47: 0,
                48: 0,
                49: 0,
                50: 0,
                51: 0,
                52: 0,
                53: 0,
                54: 0,
                55: 0,
                56: 0,
                57: 0,
                58: 0,
                59: 0,
                60: 0,
                61: 0,
                62: 0,
                63: 0,
                64: 0,
                65: 0,
                66: 0,
                67: 0,
                68: 0,
                69: 0,
                70: 0,
                71: 0,
                72: 0,
                73: 0,
                74: 0,
                75: 0,
                76: 0,
                77: 0,
                78: 0,
                79: 0,
                80: 0,
                81: 0,
                82: 0,
                83: 0,
                84: 0,
                85: 0,
                86: 0,
                87: 0,
                88: 0,
                89: 0,
                90: 0,
                91: 0,
                92: 0,
                93: 0,
                94: 0,
                95: 0,
                96: 0,
                97: 0,
                98: 0,
                99: 0,
                100: 0,
                101: 0,
                102: 0,
                103: 0,
                104: 0,
                105: 0,
                106: 0,
                107: 0,
                108: 0,
                109: 0,
                110: 0,
                111: 0,
                112: 0,
                113: 0,
                114: 0,
                115: 0,
                116: 0,
                117: 0,
                118: 0,
                119: 0,
                120: 0,
                121: 0,
                122: 0,
                123: 0,
                124: 0,
                125: 0,
                126: 0,
                127: 0
            }
        }]
    }, {
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "f15b4bbd-75b5-4aef-9d94-c207ad67261c",
        uiAttribs: {
            title: "Reset3",
            translate: {
                x: 36,
                y: -1e3
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "reset3"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:101;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            links: [{
                portIn: "Visible",
                portOut: "Result",
                objIn: "f15b4bbd-75b5-4aef-9d94-c207ad67261c",
                objOut: "5ad49603-0e80-4c11-a0e0-86b97553f16b"
            }]
        }, {
            name: "Convert Line Breaks",
            value: !1
        }],
        portsOut: [{
            name: "DOM Element"
        }, {
            name: "Hover"
        }, {
            name: "Clicked"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "138bd23b-3a5b-404c-bb85-f984ba649fb7",
        uiAttribs: {
            title: "ResetHoverCSS",
            translate: {
                x: -96,
                y: -940
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "138bd23b-3a5b-404c-bb85-f984ba649fb7",
                objOut: "f15b4bbd-75b5-4aef-9d94-c207ad67261c"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "138bd23b-3a5b-404c-bb85-f984ba649fb7",
                objOut: "f15b4bbd-75b5-4aef-9d94-c207ad67261c"
            }]
        }],
        portsOut: []
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "c5e91b2e-0f03-466d-b506-c10a41a7e2db",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: -96,
                y: -900
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "c5e91b2e-0f03-466d-b506-c10a41a7e2db",
                objOut: "f15b4bbd-75b5-4aef-9d94-c207ad67261c"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "c5e91b2e-0f03-466d-b506-c10a41a7e2db",
                objOut: "df9c7e75-9c0d-42be-85ed-9849a878dafd"
            }]
        }],
        portsOut: []
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "df9c7e75-9c0d-42be-85ed-9849a878dafd",
        uiAttribs: {
            translate: {
                x: -96,
                y: -800
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "df9c7e75-9c0d-42be-85ed-9849a878dafd",
                objOut: "16c83397-e5f3-4b69-8ec0-5863d97eb673"
            }, {
                portIn: "trigger",
                portOut: "Touch Start",
                objIn: "df9c7e75-9c0d-42be-85ed-9849a878dafd",
                objOut: "16c83397-e5f3-4b69-8ec0-5863d97eb673"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "df9c7e75-9c0d-42be-85ed-9849a878dafd",
                objOut: "16c83397-e5f3-4b69-8ec0-5863d97eb673"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "df9c7e75-9c0d-42be-85ed-9849a878dafd",
                objOut: "16c83397-e5f3-4b69-8ec0-5863d97eb673"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "16c83397-e5f3-4b69-8ec0-5863d97eb673",
        uiAttribs: {
            translate: {
                x: -96,
                y: -860
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "16c83397-e5f3-4b69-8ec0-5863d97eb673",
                objOut: "f15b4bbd-75b5-4aef-9d94-c207ad67261c"
            }]
        }, {
            name: "Mouse Down Active",
            value: !0
        }, {
            name: "Mouse Up Active",
            value: !0
        }, {
            name: "Click Active",
            value: !0
        }, {
            name: "Mouse Move Active",
            value: !0
        }, {
            name: "Touch Start Active",
            value: !0
        }, {
            name: "Touch Move Active",
            value: !0
        }, {
            name: "Touch End Active",
            value: !0
        }, {
            name: "Touch Cancel Active",
            value: !0
        }],
        portsOut: [{
            name: "Event Object"
        }, {
            name: "Mouse Down"
        }, {
            name: "Mouse Up"
        }, {
            name: "Click",
            value: 0
        }, {
            name: "Mouse Move",
            value: 0
        }, {
            name: "Touch Start"
        }, {
            name: "Touch Move",
            value: 0
        }, {
            name: "Touch End"
        }, {
            name: "Touch Cancel",
            value: 0
        }, {
            name: "Event Name",
            value: "mousemove"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "b9eea825-557d-4d59-a364-a8c309aa0afb",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: -96,
                y: -1140
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "b9eea825-557d-4d59-a364-a8c309aa0afb",
                objOut: "f2df0fea-5173-4532-a2ba-29b1ca8f67bd"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "b9eea825-557d-4d59-a364-a8c309aa0afb",
                objOut: "c45345d6-35f6-4037-a768-b010ec3f180d"
            }]
        }],
        portsOut: []
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "c8968c97-9f6e-4a11-801b-e438904d296d",
        uiAttribs: {
            translate: {
                x: -96,
                y: -1100
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "c8968c97-9f6e-4a11-801b-e438904d296d",
                objOut: "f2df0fea-5173-4532-a2ba-29b1ca8f67bd"
            }]
        }, {
            name: "Mouse Down Active",
            value: !0
        }, {
            name: "Mouse Up Active",
            value: !0
        }, {
            name: "Click Active",
            value: !0
        }, {
            name: "Mouse Move Active",
            value: !0
        }, {
            name: "Touch Start Active",
            value: !0
        }, {
            name: "Touch Move Active",
            value: !0
        }, {
            name: "Touch End Active",
            value: !0
        }, {
            name: "Touch Cancel Active",
            value: !0
        }],
        portsOut: [{
            name: "Event Object"
        }, {
            name: "Mouse Down"
        }, {
            name: "Mouse Up"
        }, {
            name: "Click",
            value: 0
        }, {
            name: "Mouse Move",
            value: 0
        }, {
            name: "Touch Start"
        }, {
            name: "Touch Move",
            value: 0
        }, {
            name: "Touch End"
        }, {
            name: "Touch Cancel",
            value: 0
        }, {
            name: "Event Name",
            value: "mousemove"
        }]
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "c45345d6-35f6-4037-a768-b010ec3f180d",
        uiAttribs: {
            translate: {
                x: -96,
                y: -1040
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "c45345d6-35f6-4037-a768-b010ec3f180d",
                objOut: "c8968c97-9f6e-4a11-801b-e438904d296d"
            }, {
                portIn: "trigger",
                portOut: "Touch Start",
                objIn: "c45345d6-35f6-4037-a768-b010ec3f180d",
                objOut: "c8968c97-9f6e-4a11-801b-e438904d296d"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "c45345d6-35f6-4037-a768-b010ec3f180d",
                objOut: "c8968c97-9f6e-4a11-801b-e438904d296d"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "c45345d6-35f6-4037-a768-b010ec3f180d",
                objOut: "c8968c97-9f6e-4a11-801b-e438904d296d"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "a7eac0dc-ea32-48de-8c0f-ead0b1dbbb4b",
        uiAttribs: {
            title: "ResetHoverCSS",
            translate: {
                x: -96,
                y: -1180
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "a7eac0dc-ea32-48de-8c0f-ead0b1dbbb4b",
                objOut: "f2df0fea-5173-4532-a2ba-29b1ca8f67bd"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "a7eac0dc-ea32-48de-8c0f-ead0b1dbbb4b",
                objOut: "f2df0fea-5173-4532-a2ba-29b1ca8f67bd"
            }]
        }],
        portsOut: []
    }, {
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "f2df0fea-5173-4532-a2ba-29b1ca8f67bd",
        uiAttribs: {
            title: "Back3",
            translate: {
                x: 36,
                y: -1240
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "back3"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:101;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            links: [{
                portIn: "Visible",
                portOut: "Result",
                objIn: "f2df0fea-5173-4532-a2ba-29b1ca8f67bd",
                objOut: "5ad49603-0e80-4c11-a0e0-86b97553f16b"
            }]
        }, {
            name: "Convert Line Breaks",
            value: !1
        }],
        portsOut: [{
            name: "DOM Element"
        }, {
            name: "Hover"
        }, {
            name: "Clicked"
        }]
    }, {
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "02653ce3-5e15-4f29-b361-b5b69937dea8",
        uiAttribs: {
            title: "Song",
            translate: {
                x: -96,
                y: -1300
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "songCard"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:100;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            links: [{
                portIn: "Visible",
                portOut: "Result",
                objIn: "02653ce3-5e15-4f29-b361-b5b69937dea8",
                objOut: "5ad49603-0e80-4c11-a0e0-86b97553f16b"
            }]
        }, {
            name: "Convert Line Breaks",
            value: !1
        }],
        portsOut: [{
            name: "DOM Element"
        }, {
            name: "Hover"
        }, {
            name: "Clicked",
            value: 0
        }]
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "0a38a70b-c80a-4001-9af0-8b368a985b5c",
        uiAttribs: {
            translate: {
                x: -96,
                y: -540
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "0a38a70b-c80a-4001-9af0-8b368a985b5c",
                objOut: "6b7ab553-e53b-428c-bfc7-087d9ebfda65"
            }, {
                portIn: "trigger",
                portOut: "Touch Start",
                objIn: "0a38a70b-c80a-4001-9af0-8b368a985b5c",
                objOut: "6b7ab553-e53b-428c-bfc7-087d9ebfda65"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "0a38a70b-c80a-4001-9af0-8b368a985b5c",
                objOut: "6b7ab553-e53b-428c-bfc7-087d9ebfda65"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "0a38a70b-c80a-4001-9af0-8b368a985b5c",
                objOut: "6b7ab553-e53b-428c-bfc7-087d9ebfda65"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "6b7ab553-e53b-428c-bfc7-087d9ebfda65",
        uiAttribs: {
            translate: {
                x: -108,
                y: -600
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "6b7ab553-e53b-428c-bfc7-087d9ebfda65",
                objOut: "0f8a3e7d-b903-483e-8a95-eba338700d6e"
            }]
        }, {
            name: "Mouse Down Active",
            value: !0
        }, {
            name: "Mouse Up Active",
            value: !0
        }, {
            name: "Click Active",
            value: !0
        }, {
            name: "Mouse Move Active",
            value: !0
        }, {
            name: "Touch Start Active",
            value: !0
        }, {
            name: "Touch Move Active",
            value: !0
        }, {
            name: "Touch End Active",
            value: !0
        }, {
            name: "Touch Cancel Active",
            value: !0
        }],
        portsOut: [{
            name: "Event Object"
        }, {
            name: "Mouse Down"
        }, {
            name: "Mouse Up"
        }, {
            name: "Click",
            value: 0
        }, {
            name: "Mouse Move",
            value: 0
        }, {
            name: "Touch Start"
        }, {
            name: "Touch Move",
            value: 0
        }, {
            name: "Touch End"
        }, {
            name: "Touch Cancel",
            value: 0
        }, {
            name: "Event Name",
            value: "mousemove"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "ffb5e824-3912-47e6-ba81-11bbfee8046b",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: -108,
                y: -640
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "ffb5e824-3912-47e6-ba81-11bbfee8046b",
                objOut: "0f8a3e7d-b903-483e-8a95-eba338700d6e"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "ffb5e824-3912-47e6-ba81-11bbfee8046b",
                objOut: "0a38a70b-c80a-4001-9af0-8b368a985b5c"
            }]
        }],
        portsOut: []
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "350f751d-af00-4753-8bc6-5aa23bbf1cbe",
        uiAttribs: {
            title: "ResetHoverCSS",
            translate: {
                x: -108,
                y: -680
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "350f751d-af00-4753-8bc6-5aa23bbf1cbe",
                objOut: "0f8a3e7d-b903-483e-8a95-eba338700d6e"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "350f751d-af00-4753-8bc6-5aa23bbf1cbe",
                objOut: "0f8a3e7d-b903-483e-8a95-eba338700d6e"
            }]
        }],
        portsOut: []
    }, {
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "0f8a3e7d-b903-483e-8a95-eba338700d6e",
        uiAttribs: {
            title: "Next3",
            translate: {
                x: 48,
                y: -740
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "next3"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:101;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            links: [{
                portIn: "Visible",
                portOut: "Result",
                objIn: "0f8a3e7d-b903-483e-8a95-eba338700d6e",
                objOut: "5ad49603-0e80-4c11-a0e0-86b97553f16b"
            }]
        }, {
            name: "Convert Line Breaks",
            value: !1
        }],
        portsOut: [{
            name: "DOM Element"
        }, {
            name: "Hover"
        }, {
            name: "Clicked"
        }]
    }, {
        opId: "f4ff66b0-8500-46f7-9117-832aea0c2750",
        objName: "Ops.Time.DelayedTrigger",
        id: "bbfa526e-18a6-453b-a65f-d3d7681c45e8",
        uiAttribs: {
            translate: {
                x: 312,
                y: 0
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "exe",
            links: [{
                portIn: "exe",
                portOut: "Output",
                objIn: "bbfa526e-18a6-453b-a65f-d3d7681c45e8",
                objOut: "1ea8aee0-a119-463c-92ea-0da776ea18bb"
            }, {
                portIn: "exe",
                portOut: "Clicked",
                objIn: "bbfa526e-18a6-453b-a65f-d3d7681c45e8",
                objOut: "87391e06-6d1a-4f3b-8f79-f402b4b2ca08"
            }, {
                portIn: "exe",
                portOut: "Touch End",
                objIn: "bbfa526e-18a6-453b-a65f-d3d7681c45e8",
                objOut: "e32110e9-d156-4b4e-b5fe-fcd908122855"
            }]
        }, {
            name: "delay",
            value: .5
        }],
        portsOut: [{
            name: "next"
        }]
    }, {
        opId: "ef0891db-6053-42ba-b7d5-29c7cf6d8208",
        objName: "Ops.Trigger.Threshold",
        id: "1ea8aee0-a119-463c-92ea-0da776ea18bb",
        uiAttribs: {
            translate: {
                x: 324,
                y: -60
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Input",
            links: [{
                portIn: "Input",
                portOut: "Time",
                objIn: "1ea8aee0-a119-463c-92ea-0da776ea18bb",
                objOut: "1d905d11-20eb-489a-b3dd-ab852a9667f4"
            }]
        }, {
            name: "Threshold",
            links: [{
                portIn: "Threshold",
                portOut: "Duration",
                objIn: "1ea8aee0-a119-463c-92ea-0da776ea18bb",
                objOut: "b74c39f0-0d9f-45b0-bfc2-967104d7fa56"
            }]
        }],
        portsOut: [{
            name: "Output"
        }]
    }, {
        opId: "05385277-92fc-4d49-b730-11f9ed5e5c0d",
        objName: "Ops.WebAudio.AudioBufferPlayer",
        id: "39878968-75bd-4d48-9dc6-5d1cee8b6ee5",
        uiAttribs: {
            translate: {
                x: 264,
                y: 140
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Audio Buffer",
            links: [{
                portIn: "Audio Buffer",
                portOut: "Audio Buffer",
                objIn: "39878968-75bd-4d48-9dc6-5d1cee8b6ee5",
                objOut: "b74c39f0-0d9f-45b0-bfc2-967104d7fa56"
            }]
        }, {
            name: "Start / Stop",
            links: [{
                portIn: "Start / Stop",
                portOut: "result",
                objIn: "39878968-75bd-4d48-9dc6-5d1cee8b6ee5",
                objOut: "0e51f9f8-ff36-4c95-9da3-3d7b1983d9d0"
            }]
        }, {
            name: "Start Time",
            value: 0,
            anim: {
                keys: [{
                    t: 0,
                    v: 0,
                    e: 0
                }],
                loop: !1
            }
        }, {
            name: "Stop Time",
            value: 0
        }, {
            name: "Offset",
            links: [{
                portIn: "Offset",
                portOut: "Time",
                objIn: "39878968-75bd-4d48-9dc6-5d1cee8b6ee5",
                objOut: "1d905d11-20eb-489a-b3dd-ab852a9667f4"
            }]
        }, {
            name: "Autoplay",
            value: !1
        }, {
            name: "Loop",
            value: !1
        }, {
            name: "Detune",
            value: 0
        }, {
            name: "Playback Rate",
            value: 1
        }],
        portsOut: [{
            name: "Audio Out"
        }]
    }, {
        opId: "aac7f721-208f-411a-adb3-79adae2e471a",
        objName: "Ops.Anim.Timer_v2",
        id: "1d905d11-20eb-489a-b3dd-ab852a9667f4",
        uiAttribs: {
            translate: {
                x: 312,
                y: -120
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Speed",
            value: 1
        }, {
            name: "Play",
            links: [{
                portIn: "Play",
                portOut: "result",
                objIn: "1d905d11-20eb-489a-b3dd-ab852a9667f4",
                objOut: "0e51f9f8-ff36-4c95-9da3-3d7b1983d9d0"
            }]
        }, {
            name: "Reset",
            links: [{
                portIn: "Reset",
                portOut: "Output",
                objIn: "1d905d11-20eb-489a-b3dd-ab852a9667f4",
                objOut: "1ea8aee0-a119-463c-92ea-0da776ea18bb"
            }, {
                portIn: "Reset",
                portOut: "Clicked",
                objIn: "1d905d11-20eb-489a-b3dd-ab852a9667f4",
                objOut: "87391e06-6d1a-4f3b-8f79-f402b4b2ca08"
            }, {
                portIn: "Reset",
                portOut: "Touch End",
                objIn: "1d905d11-20eb-489a-b3dd-ab852a9667f4",
                objOut: "e32110e9-d156-4b4e-b5fe-fcd908122855"
            }]
        }, {
            name: "Sync to timeline",
            value: !1
        }],
        portsOut: [{
            name: "Time"
        }]
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "0e51f9f8-ff36-4c95-9da3-3d7b1983d9d0",
        uiAttribs: {
            translate: {
                x: 276,
                y: -180
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Click",
                objIn: "0e51f9f8-ff36-4c95-9da3-3d7b1983d9d0",
                objOut: "9ec8cbe0-8c40-4511-af32-9ce60f9ffed1"
            }, {
                portIn: "trigger",
                portOut: "Touch Start",
                objIn: "0e51f9f8-ff36-4c95-9da3-3d7b1983d9d0",
                objOut: "9ec8cbe0-8c40-4511-af32-9ce60f9ffed1"
            }, {
                portIn: "trigger",
                portOut: "Clicked",
                objIn: "0e51f9f8-ff36-4c95-9da3-3d7b1983d9d0",
                objOut: "0f8a3e7d-b903-483e-8a95-eba338700d6e"
            }, {
                portIn: "trigger",
                portOut: "Clicked",
                objIn: "0e51f9f8-ff36-4c95-9da3-3d7b1983d9d0",
                objOut: "00983655-da34-4569-a02f-35d309187161"
            }, {
                portIn: "trigger",
                portOut: "next",
                objIn: "0e51f9f8-ff36-4c95-9da3-3d7b1983d9d0",
                objOut: "bbfa526e-18a6-453b-a65f-d3d7681c45e8"
            }, {
                portIn: "trigger",
                portOut: "Touch End",
                objIn: "0e51f9f8-ff36-4c95-9da3-3d7b1983d9d0",
                objOut: "f75bd15b-0ceb-4627-8cd8-3cf67faf0590"
            }, {
                portIn: "trigger",
                portOut: "Touch End",
                objIn: "0e51f9f8-ff36-4c95-9da3-3d7b1983d9d0",
                objOut: "6b7ab553-e53b-428c-bfc7-087d9ebfda65"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Output",
                objIn: "0e51f9f8-ff36-4c95-9da3-3d7b1983d9d0",
                objOut: "1ea8aee0-a119-463c-92ea-0da776ea18bb"
            }, {
                portIn: "reset",
                portOut: "Clicked",
                objIn: "0e51f9f8-ff36-4c95-9da3-3d7b1983d9d0",
                objOut: "87391e06-6d1a-4f3b-8f79-f402b4b2ca08"
            }, {
                portIn: "reset",
                portOut: "Clicked",
                objIn: "0e51f9f8-ff36-4c95-9da3-3d7b1983d9d0",
                objOut: "746afa35-f920-412a-b398-752328fb3dee"
            }, {
                portIn: "reset",
                portOut: "Clicked",
                objIn: "0e51f9f8-ff36-4c95-9da3-3d7b1983d9d0",
                objOut: "fa6635f2-56df-4077-8a61-47984602de96"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "0e51f9f8-ff36-4c95-9da3-3d7b1983d9d0",
                objOut: "e402b9ea-cf3e-4940-aeae-d132d88fbd35"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "0e51f9f8-ff36-4c95-9da3-3d7b1983d9d0",
                objOut: "a19aa590-409a-48ec-a2d6-488daf175ca8"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "9ec8cbe0-8c40-4511-af32-9ce60f9ffed1",
        uiAttribs: {
            translate: {
                x: 252,
                y: -260
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "9ec8cbe0-8c40-4511-af32-9ce60f9ffed1",
                objOut: "66cfaea0-dcab-4574-9fe8-70629348fce8"
            }]
        }, {
            name: "Mouse Down Active",
            value: !0
        }, {
            name: "Mouse Up Active",
            value: !0
        }, {
            name: "Click Active",
            value: !0
        }, {
            name: "Mouse Move Active",
            value: !0
        }, {
            name: "Touch Start Active",
            value: !0
        }, {
            name: "Touch Move Active",
            value: !0
        }, {
            name: "Touch End Active",
            value: !0
        }, {
            name: "Touch Cancel Active",
            value: !0
        }],
        portsOut: [{
            name: "Event Object"
        }, {
            name: "Mouse Down"
        }, {
            name: "Mouse Up"
        }, {
            name: "Click"
        }, {
            name: "Mouse Move",
            value: 0
        }, {
            name: "Touch Start"
        }, {
            name: "Touch Move",
            value: 0
        }, {
            name: "Touch End",
            value: 0
        }, {
            name: "Touch Cancel",
            value: 0
        }, {
            name: "Event Name",
            value: "mousemove"
        }]
    }, {
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "ade9c958-2924-465b-853f-33b9ece2398a",
        uiAttribs: {
            translate: {
                x: 276,
                y: -300
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "ade9c958-2924-465b-853f-33b9ece2398a",
                objOut: "642e5bb0-923a-4662-b41f-6441290ffd5a"
            }]
        }, {
            name: "old min",
            value: 0
        }, {
            name: "old max",
            value: .8
        }, {
            name: "new min",
            value: 50
        }, {
            name: "new max",
            value: 100
        }, {
            name: "Easing",
            value: "Linear"
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "22523fae-a623-401d-b952-a57c26de4b4e",
        objName: "Ops.WebAudio.AudioAnalyzer",
        id: "642e5bb0-923a-4662-b41f-6441290ffd5a",
        uiAttribs: {
            translate: {
                x: 252,
                y: 200
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "FFT size",
            value: 256
        }, {
            name: "refresh",
            links: [{
                portIn: "refresh",
                portOut: "trigger",
                objIn: "642e5bb0-923a-4662-b41f-6441290ffd5a",
                objOut: "911dd833-0622-4d65-9ae0-9c75c0897631"
            }]
        }, {
            name: "Audio In",
            links: [{
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "642e5bb0-923a-4662-b41f-6441290ffd5a",
                objOut: "39878968-75bd-4d48-9dc6-5d1cee8b6ee5"
            }]
        }, {
            name: "Data",
            value: "Frequency"
        }],
        portsOut: [{
            name: "Next",
            value: 0
        }, {
            name: "Audio Out"
        }, {
            name: "average volume"
        }, {
            name: "fft",
            value: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: 0,
                11: 0,
                12: 0,
                13: 0,
                14: 0,
                15: 0,
                16: 0,
                17: 0,
                18: 0,
                19: 0,
                20: 0,
                21: 0,
                22: 0,
                23: 0,
                24: 0,
                25: 0,
                26: 0,
                27: 0,
                28: 0,
                29: 0,
                30: 0,
                31: 0,
                32: 0,
                33: 0,
                34: 0,
                35: 0,
                36: 0,
                37: 0,
                38: 0,
                39: 0,
                40: 0,
                41: 0,
                42: 0,
                43: 0,
                44: 0,
                45: 0,
                46: 0,
                47: 0,
                48: 0,
                49: 0,
                50: 0,
                51: 0,
                52: 0,
                53: 0,
                54: 0,
                55: 0,
                56: 0,
                57: 0,
                58: 0,
                59: 0,
                60: 0,
                61: 0,
                62: 0,
                63: 0,
                64: 0,
                65: 0,
                66: 0,
                67: 0,
                68: 0,
                69: 0,
                70: 0,
                71: 0,
                72: 0,
                73: 0,
                74: 0,
                75: 0,
                76: 0,
                77: 0,
                78: 0,
                79: 0,
                80: 0,
                81: 0,
                82: 0,
                83: 0,
                84: 0,
                85: 0,
                86: 0,
                87: 0,
                88: 0,
                89: 0,
                90: 0,
                91: 0,
                92: 0,
                93: 0,
                94: 0,
                95: 0,
                96: 0,
                97: 0,
                98: 0,
                99: 0,
                100: 0,
                101: 0,
                102: 0,
                103: 0,
                104: 0,
                105: 0,
                106: 0,
                107: 0,
                108: 0,
                109: 0,
                110: 0,
                111: 0,
                112: 0,
                113: 0,
                114: 0,
                115: 0,
                116: 0,
                117: 0,
                118: 0,
                119: 0,
                120: 0,
                121: 0,
                122: 0,
                123: 0,
                124: 0,
                125: 0,
                126: 0,
                127: 0
            }
        }]
    }, {
        opId: "2cf4b0a1-b657-405b-8bf9-8555dbd5c231",
        objName: "Ops.WebAudio.AudioBuffer",
        id: "b74c39f0-0d9f-45b0-bfc2-967104d7fa56",
        uiAttribs: {
            translate: {
                x: 264,
                y: 80
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "URL",
            display: "file",
            links: [{
                portIn: "URL",
                portOut: "Stream URL",
                objIn: "b74c39f0-0d9f-45b0-bfc2-967104d7fa56",
                objOut: "34e0e488-5193-44ad-91bd-5e66a524fb03"
            }]
        }],
        portsOut: [{
            name: "Audio Buffer"
        }, {
            name: "Finished Loading",
            value: !0
        }, {
            name: "Sample Rate",
            value: 48e3
        }, {
            name: "Length",
            value: 12148363
        }, {
            name: "Duration"
        }, {
            name: "Number of Channels",
            value: 2
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "b9964811-5c7e-423c-bd3b-8d6f03124866",
        uiAttribs: {
            title: "HoverCSS",
            translate: {
                x: 252,
                y: -460
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "b9964811-5c7e-423c-bd3b-8d6f03124866",
                objOut: "66cfaea0-dcab-4574-9fe8-70629348fce8"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "b9964811-5c7e-423c-bd3b-8d6f03124866",
                objOut: "66cfaea0-dcab-4574-9fe8-70629348fce8"
            }]
        }],
        portsOut: []
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "0b6f30bb-f8cd-446a-a2da-a0aab98b422a",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: 264,
                y: -420
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "0b6f30bb-f8cd-446a-a2da-a0aab98b422a",
                objOut: "66cfaea0-dcab-4574-9fe8-70629348fce8"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "0b6f30bb-f8cd-446a-a2da-a0aab98b422a",
                objOut: "b42830e5-4e93-4f02-93a9-28cd4a252ed5"
            }]
        }],
        portsOut: []
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "b42830e5-4e93-4f02-93a9-28cd4a252ed5",
        uiAttribs: {
            translate: {
                x: 252,
                y: -380
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "b42830e5-4e93-4f02-93a9-28cd4a252ed5",
                objOut: "9ec8cbe0-8c40-4511-af32-9ce60f9ffed1"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "b42830e5-4e93-4f02-93a9-28cd4a252ed5",
                objOut: "9ec8cbe0-8c40-4511-af32-9ce60f9ffed1"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "33befabf-7eef-45f6-869f-30e0e4f44739",
        objName: "Ops.Html.CSSFilter",
        id: "fe982b24-ee05-44e6-8efc-ffbbe3c226c1",
        uiAttribs: {
            translate: {
                x: 264,
                y: -340
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "fe982b24-ee05-44e6-8efc-ffbbe3c226c1",
                objOut: "66cfaea0-dcab-4574-9fe8-70629348fce8"
            }]
        }, {
            name: "method",
            value: "opacity"
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "fe982b24-ee05-44e6-8efc-ffbbe3c226c1",
                objOut: "ade9c958-2924-465b-853f-33b9ece2398a"
            }]
        }],
        portsOut: []
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "ce3f7682-754a-41f1-ba2c-d2bd07efa6a7",
        uiAttribs: {
            translate: {
                x: 264,
                y: -520
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "ce3f7682-754a-41f1-ba2c-d2bd07efa6a7",
                objOut: "a19aa590-409a-48ec-a2d6-488daf175ca8"
            }, {
                portIn: "trigger",
                portOut: "Touch Start",
                objIn: "ce3f7682-754a-41f1-ba2c-d2bd07efa6a7",
                objOut: "a19aa590-409a-48ec-a2d6-488daf175ca8"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "ce3f7682-754a-41f1-ba2c-d2bd07efa6a7",
                objOut: "a19aa590-409a-48ec-a2d6-488daf175ca8"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "ce3f7682-754a-41f1-ba2c-d2bd07efa6a7",
                objOut: "a19aa590-409a-48ec-a2d6-488daf175ca8"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "a19aa590-409a-48ec-a2d6-488daf175ca8",
        uiAttribs: {
            translate: {
                x: 252,
                y: -580
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "a19aa590-409a-48ec-a2d6-488daf175ca8",
                objOut: "fa6635f2-56df-4077-8a61-47984602de96"
            }]
        }, {
            name: "Mouse Down Active",
            value: !0
        }, {
            name: "Mouse Up Active",
            value: !0
        }, {
            name: "Click Active",
            value: !0
        }, {
            name: "Mouse Move Active",
            value: !0
        }, {
            name: "Touch Start Active",
            value: !0
        }, {
            name: "Touch Move Active",
            value: !0
        }, {
            name: "Touch End Active",
            value: !0
        }, {
            name: "Touch Cancel Active",
            value: !0
        }],
        portsOut: [{
            name: "Event Object"
        }, {
            name: "Mouse Down"
        }, {
            name: "Mouse Up"
        }, {
            name: "Click",
            value: 0
        }, {
            name: "Mouse Move",
            value: 0
        }, {
            name: "Touch Start"
        }, {
            name: "Touch Move",
            value: 0
        }, {
            name: "Touch End"
        }, {
            name: "Touch Cancel",
            value: 0
        }, {
            name: "Event Name",
            value: "mousemove"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "40a3f8b2-150e-4914-8d86-3ad00ab6e796",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: 252,
                y: -620
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "40a3f8b2-150e-4914-8d86-3ad00ab6e796",
                objOut: "fa6635f2-56df-4077-8a61-47984602de96"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "40a3f8b2-150e-4914-8d86-3ad00ab6e796",
                objOut: "ce3f7682-754a-41f1-ba2c-d2bd07efa6a7"
            }]
        }],
        portsOut: []
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "42b07f2c-8df2-4ee0-835c-de6a0d1fb593",
        uiAttribs: {
            title: "ResetHoverCSS",
            translate: {
                x: 252,
                y: -660
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "42b07f2c-8df2-4ee0-835c-de6a0d1fb593",
                objOut: "fa6635f2-56df-4077-8a61-47984602de96"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "42b07f2c-8df2-4ee0-835c-de6a0d1fb593",
                objOut: "fa6635f2-56df-4077-8a61-47984602de96"
            }]
        }],
        portsOut: []
    }, {
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "fa6635f2-56df-4077-8a61-47984602de96",
        uiAttribs: {
            title: "Next3",
            translate: {
                x: 396,
                y: -740
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "next3"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:101;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            links: [{
                portIn: "Visible",
                portOut: "Result",
                objIn: "fa6635f2-56df-4077-8a61-47984602de96",
                objOut: "56ec4b9d-7754-42d7-a5fc-301a83c3cb26"
            }]
        }, {
            name: "Convert Line Breaks",
            value: !1
        }],
        portsOut: [{
            name: "DOM Element"
        }, {
            name: "Hover"
        }, {
            name: "Clicked"
        }]
    }, {
        objName: "Ops.User.l6n.GetSoundcloud",
        id: "34e0e488-5193-44ad-91bd-5e66a524fb03",
        uiAttribs: {
            translate: {
                x: 120,
                y: -1680
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "SoundCloud URL",
            value: "https://soundcloud.com/dariusofficial/hot-hands"
        }],
        portsOut: [{
            name: "Stream URL"
        }, {
            name: "Artwork URL"
        }, {
            name: "Title"
        }, {
            name: "Result"
        }]
    }, {
        opId: "da3de45b-c252-4785-8558-7fadb199ea61",
        objName: "Ops.Html.BackgroundImage",
        id: "88ce5dc8-a6b7-4b8e-90e1-791c8634fecc",
        uiAttribs: {
            translate: {
                x: 120,
                y: 140
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "88ce5dc8-a6b7-4b8e-90e1-791c8634fecc",
                objOut: "66cfaea0-dcab-4574-9fe8-70629348fce8"
            }]
        }, {
            name: "active",
            value: !0
        }, {
            name: "image file",
            display: "file",
            links: [{
                portIn: "image file",
                portOut: "Artwork URL",
                objIn: "88ce5dc8-a6b7-4b8e-90e1-791c8634fecc",
                objOut: "34e0e488-5193-44ad-91bd-5e66a524fb03"
            }]
        }, {
            name: "Size",
            value: "contain"
        }, {
            name: "Repeat",
            value: "no-repeat"
        }, {
            name: "Position",
            value: "center center"
        }],
        portsOut: [{
            name: "HTML Element"
        }]
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "94d16a18-18da-4989-af21-f72a52900d46",
        uiAttribs: {
            translate: {
                x: 264,
                y: -800
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "94d16a18-18da-4989-af21-f72a52900d46",
                objOut: "e32110e9-d156-4b4e-b5fe-fcd908122855"
            }, {
                portIn: "trigger",
                portOut: "Touch Start",
                objIn: "94d16a18-18da-4989-af21-f72a52900d46",
                objOut: "e32110e9-d156-4b4e-b5fe-fcd908122855"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "94d16a18-18da-4989-af21-f72a52900d46",
                objOut: "e32110e9-d156-4b4e-b5fe-fcd908122855"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "94d16a18-18da-4989-af21-f72a52900d46",
                objOut: "e32110e9-d156-4b4e-b5fe-fcd908122855"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "e32110e9-d156-4b4e-b5fe-fcd908122855",
        uiAttribs: {
            translate: {
                x: 252,
                y: -860
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "e32110e9-d156-4b4e-b5fe-fcd908122855",
                objOut: "87391e06-6d1a-4f3b-8f79-f402b4b2ca08"
            }]
        }, {
            name: "Mouse Down Active",
            value: !0
        }, {
            name: "Mouse Up Active",
            value: !0
        }, {
            name: "Click Active",
            value: !0
        }, {
            name: "Mouse Move Active",
            value: !0
        }, {
            name: "Touch Start Active",
            value: !0
        }, {
            name: "Touch Move Active",
            value: !0
        }, {
            name: "Touch End Active",
            value: !0
        }, {
            name: "Touch Cancel Active",
            value: !0
        }],
        portsOut: [{
            name: "Event Object"
        }, {
            name: "Mouse Down"
        }, {
            name: "Mouse Up"
        }, {
            name: "Click",
            value: 0
        }, {
            name: "Mouse Move",
            value: 0
        }, {
            name: "Touch Start"
        }, {
            name: "Touch Move",
            value: 0
        }, {
            name: "Touch End"
        }, {
            name: "Touch Cancel",
            value: 0
        }, {
            name: "Event Name",
            value: "mousemove"
        }]
    }, {
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "87391e06-6d1a-4f3b-8f79-f402b4b2ca08",
        uiAttribs: {
            title: "Reset3",
            translate: {
                x: 408,
                y: -1e3
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "reset3"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:101;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            links: [{
                portIn: "Visible",
                portOut: "Result",
                objIn: "87391e06-6d1a-4f3b-8f79-f402b4b2ca08",
                objOut: "56ec4b9d-7754-42d7-a5fc-301a83c3cb26"
            }]
        }, {
            name: "Convert Line Breaks",
            value: !1
        }],
        portsOut: [{
            name: "DOM Element"
        }, {
            name: "Hover"
        }, {
            name: "Clicked"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "17327270-fb9f-4eeb-a59d-1528114aba82",
        uiAttribs: {
            title: "ResetHoverCSS",
            translate: {
                x: 252,
                y: -940
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "17327270-fb9f-4eeb-a59d-1528114aba82",
                objOut: "87391e06-6d1a-4f3b-8f79-f402b4b2ca08"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "17327270-fb9f-4eeb-a59d-1528114aba82",
                objOut: "87391e06-6d1a-4f3b-8f79-f402b4b2ca08"
            }]
        }],
        portsOut: []
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "ab4f4d57-7d38-4c5b-8f89-929db86ca8aa",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: 252,
                y: -900
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "ab4f4d57-7d38-4c5b-8f89-929db86ca8aa",
                objOut: "87391e06-6d1a-4f3b-8f79-f402b4b2ca08"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "ab4f4d57-7d38-4c5b-8f89-929db86ca8aa",
                objOut: "94d16a18-18da-4989-af21-f72a52900d46"
            }]
        }],
        portsOut: []
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "216c606d-9867-4eab-bc50-cef3cc7f1a97",
        uiAttribs: {
            translate: {
                x: 252,
                y: -1040
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "216c606d-9867-4eab-bc50-cef3cc7f1a97",
                objOut: "e402b9ea-cf3e-4940-aeae-d132d88fbd35"
            }, {
                portIn: "trigger",
                portOut: "Touch Start",
                objIn: "216c606d-9867-4eab-bc50-cef3cc7f1a97",
                objOut: "e402b9ea-cf3e-4940-aeae-d132d88fbd35"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "216c606d-9867-4eab-bc50-cef3cc7f1a97",
                objOut: "e402b9ea-cf3e-4940-aeae-d132d88fbd35"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "216c606d-9867-4eab-bc50-cef3cc7f1a97",
                objOut: "e402b9ea-cf3e-4940-aeae-d132d88fbd35"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "83c9761a-0c4c-4516-9113-b9230fdf640e",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: 252,
                y: -1140
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "83c9761a-0c4c-4516-9113-b9230fdf640e",
                objOut: "746afa35-f920-412a-b398-752328fb3dee"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "83c9761a-0c4c-4516-9113-b9230fdf640e",
                objOut: "216c606d-9867-4eab-bc50-cef3cc7f1a97"
            }]
        }],
        portsOut: []
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "e402b9ea-cf3e-4940-aeae-d132d88fbd35",
        uiAttribs: {
            translate: {
                x: 252,
                y: -1100
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "e402b9ea-cf3e-4940-aeae-d132d88fbd35",
                objOut: "746afa35-f920-412a-b398-752328fb3dee"
            }]
        }, {
            name: "Mouse Down Active",
            value: !0
        }, {
            name: "Mouse Up Active",
            value: !0
        }, {
            name: "Click Active",
            value: !0
        }, {
            name: "Mouse Move Active",
            value: !0
        }, {
            name: "Touch Start Active",
            value: !0
        }, {
            name: "Touch Move Active",
            value: !0
        }, {
            name: "Touch End Active",
            value: !0
        }, {
            name: "Touch Cancel Active",
            value: !0
        }],
        portsOut: [{
            name: "Event Object"
        }, {
            name: "Mouse Down"
        }, {
            name: "Mouse Up"
        }, {
            name: "Click",
            value: 0
        }, {
            name: "Mouse Move",
            value: 0
        }, {
            name: "Touch Start"
        }, {
            name: "Touch Move",
            value: 0
        }, {
            name: "Touch End"
        }, {
            name: "Touch Cancel",
            value: 0
        }, {
            name: "Event Name",
            value: "mousemove"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "55f24a8f-81e1-4784-9a53-0973315a7019",
        uiAttribs: {
            title: "ResetHoverCSS",
            translate: {
                x: 252,
                y: -1180
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "55f24a8f-81e1-4784-9a53-0973315a7019",
                objOut: "746afa35-f920-412a-b398-752328fb3dee"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "55f24a8f-81e1-4784-9a53-0973315a7019",
                objOut: "746afa35-f920-412a-b398-752328fb3dee"
            }]
        }],
        portsOut: []
    }, {
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "746afa35-f920-412a-b398-752328fb3dee",
        uiAttribs: {
            title: "Back3",
            translate: {
                x: 408,
                y: -1240
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "back3"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:101;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            links: [{
                portIn: "Visible",
                portOut: "Result",
                objIn: "746afa35-f920-412a-b398-752328fb3dee",
                objOut: "56ec4b9d-7754-42d7-a5fc-301a83c3cb26"
            }]
        }, {
            name: "Convert Line Breaks",
            value: !1
        }],
        portsOut: [{
            name: "DOM Element"
        }, {
            name: "Hover"
        }, {
            name: "Clicked"
        }]
    }, {
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "66cfaea0-dcab-4574-9fe8-70629348fce8",
        uiAttribs: {
            title: "Song",
            translate: {
                x: 252,
                y: -1300
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "songCard"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:100;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            links: [{
                portIn: "Visible",
                portOut: "Result",
                objIn: "66cfaea0-dcab-4574-9fe8-70629348fce8",
                objOut: "56ec4b9d-7754-42d7-a5fc-301a83c3cb26"
            }]
        }, {
            name: "Convert Line Breaks",
            value: !1
        }],
        portsOut: [{
            name: "DOM Element"
        }, {
            name: "Hover"
        }, {
            name: "Clicked",
            value: 0
        }]
    }, {
        objName: "Ops.User.l6n.TrueIf0",
        id: "5ad49603-0e80-4c11-a0e0-86b97553f16b",
        uiAttribs: {
            translate: {
                x: -96,
                y: -1360
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "Value",
                objIn: "5ad49603-0e80-4c11-a0e0-86b97553f16b",
                objOut: "485031f9-2163-46cc-8cb9-9dcb4c69767c"
            }]
        }],
        portsOut: [{
            name: "Result"
        }]
    }, {
        opId: "45cc0011-ada8-4423-8f5b-39a3810b8389",
        objName: "Ops.Math.Incrementor",
        id: "485031f9-2163-46cc-8cb9-9dcb4c69767c",
        uiAttribs: {
            translate: {
                x: -96,
                y: -1520
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Increment",
            links: [{
                portIn: "Increment",
                portOut: "Clicked",
                objIn: "485031f9-2163-46cc-8cb9-9dcb4c69767c",
                objOut: "fa6635f2-56df-4077-8a61-47984602de96"
            }, {
                portIn: "Increment",
                portOut: "Clicked",
                objIn: "485031f9-2163-46cc-8cb9-9dcb4c69767c",
                objOut: "0f8a3e7d-b903-483e-8a95-eba338700d6e"
            }, {
                portIn: "Increment",
                portOut: "Clicked",
                objIn: "485031f9-2163-46cc-8cb9-9dcb4c69767c",
                objOut: "0bc9d883-5860-4931-8df4-6662e23ffdb4"
            }, {
                portIn: "Increment",
                portOut: "Clicked",
                objIn: "485031f9-2163-46cc-8cb9-9dcb4c69767c",
                objOut: "7f2b99cc-2254-4ad6-a83c-d17c0c55052a"
            }, {
                portIn: "Increment",
                portOut: "Next",
                objIn: "485031f9-2163-46cc-8cb9-9dcb4c69767c",
                objOut: "a95ef587-1e72-46bf-9707-6ba25ace8f53"
            }, {
                portIn: "Increment",
                portOut: "Touch End",
                objIn: "485031f9-2163-46cc-8cb9-9dcb4c69767c",
                objOut: "9f87c5b7-0773-4070-8f7a-2bf2786b419a"
            }, {
                portIn: "Increment",
                portOut: "Touch End",
                objIn: "485031f9-2163-46cc-8cb9-9dcb4c69767c",
                objOut: "6a5c908d-42de-41cf-96e2-7928f7211602"
            }, {
                portIn: "Increment",
                portOut: "Touch End",
                objIn: "485031f9-2163-46cc-8cb9-9dcb4c69767c",
                objOut: "a19aa590-409a-48ec-a2d6-488daf175ca8"
            }, {
                portIn: "Increment",
                portOut: "Touch End",
                objIn: "485031f9-2163-46cc-8cb9-9dcb4c69767c",
                objOut: "6b7ab553-e53b-428c-bfc7-087d9ebfda65"
            }]
        }, {
            name: "Decrement",
            links: [{
                portIn: "Decrement",
                portOut: "Clicked",
                objIn: "485031f9-2163-46cc-8cb9-9dcb4c69767c",
                objOut: "746afa35-f920-412a-b398-752328fb3dee"
            }, {
                portIn: "Decrement",
                portOut: "Clicked",
                objIn: "485031f9-2163-46cc-8cb9-9dcb4c69767c",
                objOut: "f2df0fea-5173-4532-a2ba-29b1ca8f67bd"
            }, {
                portIn: "Decrement",
                portOut: "Clicked",
                objIn: "485031f9-2163-46cc-8cb9-9dcb4c69767c",
                objOut: "00983655-da34-4569-a02f-35d309187161"
            }, {
                portIn: "Decrement",
                portOut: "Clicked",
                objIn: "485031f9-2163-46cc-8cb9-9dcb4c69767c",
                objOut: "f1a7a293-7a4f-4900-ac3c-cf36ad01d79c"
            }, {
                portIn: "Decrement",
                portOut: "Touch End",
                objIn: "485031f9-2163-46cc-8cb9-9dcb4c69767c",
                objOut: "c8968c97-9f6e-4a11-801b-e438904d296d"
            }, {
                portIn: "Decrement",
                portOut: "Touch End",
                objIn: "485031f9-2163-46cc-8cb9-9dcb4c69767c",
                objOut: "e402b9ea-cf3e-4940-aeae-d132d88fbd35"
            }, {
                portIn: "Decrement",
                portOut: "Touch End",
                objIn: "485031f9-2163-46cc-8cb9-9dcb4c69767c",
                objOut: "f75bd15b-0ceb-4627-8cd8-3cf67faf0590"
            }, {
                portIn: "Decrement",
                portOut: "Touch End",
                objIn: "485031f9-2163-46cc-8cb9-9dcb4c69767c",
                objOut: "e1a0e11a-e409-48ef-a27e-3fff18bc0172"
            }]
        }, {
            name: "Length",
            value: 4
        }, {
            name: "Reset",
            value: 0
        }, {
            name: "Mode",
            value: 0
        }],
        portsOut: [{
            name: "Value"
        }, {
            name: "Restarted",
            value: 0
        }]
    }, {
        objName: "Ops.User.l6n.TrueIf1",
        id: "56ec4b9d-7754-42d7-a5fc-301a83c3cb26",
        uiAttribs: {
            translate: {
                x: 252,
                y: -1360
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "Value",
                objIn: "56ec4b9d-7754-42d7-a5fc-301a83c3cb26",
                objOut: "485031f9-2163-46cc-8cb9-9dcb4c69767c"
            }]
        }],
        portsOut: [{
            name: "Result"
        }]
    }, {
        opId: "f4ff66b0-8500-46f7-9117-832aea0c2750",
        objName: "Ops.Time.DelayedTrigger",
        id: "1f034e68-3eb3-41ef-aff6-b26ed82a4280",
        uiAttribs: {
            translate: {
                x: 1008,
                y: 0
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "exe",
            links: [{
                portIn: "exe",
                portOut: "Output",
                objIn: "1f034e68-3eb3-41ef-aff6-b26ed82a4280",
                objOut: "d3b76520-57f4-4557-b0eb-108c360053a0"
            }, {
                portIn: "exe",
                portOut: "Clicked",
                objIn: "1f034e68-3eb3-41ef-aff6-b26ed82a4280",
                objOut: "543b0d9e-59e7-4a45-8f31-15be660e79c9"
            }, {
                portIn: "exe",
                portOut: "Touch End",
                objIn: "1f034e68-3eb3-41ef-aff6-b26ed82a4280",
                objOut: "c389050b-e080-4478-8424-f59d0e33930f"
            }]
        }, {
            name: "delay",
            value: .5
        }],
        portsOut: [{
            name: "next"
        }]
    }, {
        opId: "05385277-92fc-4d49-b730-11f9ed5e5c0d",
        objName: "Ops.WebAudio.AudioBufferPlayer",
        id: "f267b8a5-0199-495f-817f-4dc7eec76558",
        uiAttribs: {
            translate: {
                x: 960,
                y: 140
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Audio Buffer",
            links: [{
                portIn: "Audio Buffer",
                portOut: "Audio Buffer",
                objIn: "f267b8a5-0199-495f-817f-4dc7eec76558",
                objOut: "01b99f73-6ca1-495a-9e3f-410e091851a4"
            }]
        }, {
            name: "Start / Stop",
            links: [{
                portIn: "Start / Stop",
                portOut: "result",
                objIn: "f267b8a5-0199-495f-817f-4dc7eec76558",
                objOut: "ebab4e49-ba9e-431b-bd46-95435514997b"
            }]
        }, {
            name: "Start Time",
            value: 0,
            anim: {
                keys: [{
                    t: 0,
                    v: 0,
                    e: 0
                }],
                loop: !1
            }
        }, {
            name: "Stop Time",
            value: 0
        }, {
            name: "Offset",
            links: [{
                portIn: "Offset",
                portOut: "Time",
                objIn: "f267b8a5-0199-495f-817f-4dc7eec76558",
                objOut: "3b36b12f-72a7-407b-8c19-c87058312092"
            }]
        }, {
            name: "Autoplay",
            value: !1
        }, {
            name: "Loop",
            value: !1
        }, {
            name: "Detune",
            value: 0
        }, {
            name: "Playback Rate",
            value: 1
        }],
        portsOut: [{
            name: "Audio Out"
        }]
    }, {
        opId: "ef0891db-6053-42ba-b7d5-29c7cf6d8208",
        objName: "Ops.Trigger.Threshold",
        id: "d3b76520-57f4-4557-b0eb-108c360053a0",
        uiAttribs: {
            translate: {
                x: 1020,
                y: -60
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Input",
            links: [{
                portIn: "Input",
                portOut: "Time",
                objIn: "d3b76520-57f4-4557-b0eb-108c360053a0",
                objOut: "3b36b12f-72a7-407b-8c19-c87058312092"
            }]
        }, {
            name: "Threshold",
            links: [{
                portIn: "Threshold",
                portOut: "Duration",
                objIn: "d3b76520-57f4-4557-b0eb-108c360053a0",
                objOut: "01b99f73-6ca1-495a-9e3f-410e091851a4"
            }]
        }],
        portsOut: [{
            name: "Output"
        }]
    }, {
        opId: "aac7f721-208f-411a-adb3-79adae2e471a",
        objName: "Ops.Anim.Timer_v2",
        id: "3b36b12f-72a7-407b-8c19-c87058312092",
        uiAttribs: {
            translate: {
                x: 1008,
                y: -120
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Speed",
            value: 1
        }, {
            name: "Play",
            links: [{
                portIn: "Play",
                portOut: "result",
                objIn: "3b36b12f-72a7-407b-8c19-c87058312092",
                objOut: "ebab4e49-ba9e-431b-bd46-95435514997b"
            }]
        }, {
            name: "Reset",
            links: [{
                portIn: "Reset",
                portOut: "Output",
                objIn: "3b36b12f-72a7-407b-8c19-c87058312092",
                objOut: "d3b76520-57f4-4557-b0eb-108c360053a0"
            }, {
                portIn: "Reset",
                portOut: "Clicked",
                objIn: "3b36b12f-72a7-407b-8c19-c87058312092",
                objOut: "543b0d9e-59e7-4a45-8f31-15be660e79c9"
            }, {
                portIn: "Reset",
                portOut: "Touch End",
                objIn: "3b36b12f-72a7-407b-8c19-c87058312092",
                objOut: "c389050b-e080-4478-8424-f59d0e33930f"
            }]
        }, {
            name: "Sync to timeline",
            value: !1
        }],
        portsOut: [{
            name: "Time"
        }]
    }, {
        opId: "22523fae-a623-401d-b952-a57c26de4b4e",
        objName: "Ops.WebAudio.AudioAnalyzer",
        id: "81d353f3-4fab-43ef-9372-3d2526ec0e6e",
        uiAttribs: {
            translate: {
                x: 948,
                y: 200
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "FFT size",
            value: 256
        }, {
            name: "refresh",
            links: [{
                portIn: "refresh",
                portOut: "trigger",
                objIn: "81d353f3-4fab-43ef-9372-3d2526ec0e6e",
                objOut: "911dd833-0622-4d65-9ae0-9c75c0897631"
            }]
        }, {
            name: "Audio In",
            links: [{
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "81d353f3-4fab-43ef-9372-3d2526ec0e6e",
                objOut: "f267b8a5-0199-495f-817f-4dc7eec76558"
            }]
        }, {
            name: "Data",
            value: "Frequency"
        }],
        portsOut: [{
            name: "Next",
            value: 0
        }, {
            name: "Audio Out"
        }, {
            name: "average volume"
        }, {
            name: "fft",
            value: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: 0,
                11: 0,
                12: 0,
                13: 0,
                14: 0,
                15: 0,
                16: 0,
                17: 0,
                18: 0,
                19: 0,
                20: 0,
                21: 0,
                22: 0,
                23: 0,
                24: 0,
                25: 0,
                26: 0,
                27: 0,
                28: 0,
                29: 0,
                30: 0,
                31: 0,
                32: 0,
                33: 0,
                34: 0,
                35: 0,
                36: 0,
                37: 0,
                38: 0,
                39: 0,
                40: 0,
                41: 0,
                42: 0,
                43: 0,
                44: 0,
                45: 0,
                46: 0,
                47: 0,
                48: 0,
                49: 0,
                50: 0,
                51: 0,
                52: 0,
                53: 0,
                54: 0,
                55: 0,
                56: 0,
                57: 0,
                58: 0,
                59: 0,
                60: 0,
                61: 0,
                62: 0,
                63: 0,
                64: 0,
                65: 0,
                66: 0,
                67: 0,
                68: 0,
                69: 0,
                70: 0,
                71: 0,
                72: 0,
                73: 0,
                74: 0,
                75: 0,
                76: 0,
                77: 0,
                78: 0,
                79: 0,
                80: 0,
                81: 0,
                82: 0,
                83: 0,
                84: 0,
                85: 0,
                86: 0,
                87: 0,
                88: 0,
                89: 0,
                90: 0,
                91: 0,
                92: 0,
                93: 0,
                94: 0,
                95: 0,
                96: 0,
                97: 0,
                98: 0,
                99: 0,
                100: 0,
                101: 0,
                102: 0,
                103: 0,
                104: 0,
                105: 0,
                106: 0,
                107: 0,
                108: 0,
                109: 0,
                110: 0,
                111: 0,
                112: 0,
                113: 0,
                114: 0,
                115: 0,
                116: 0,
                117: 0,
                118: 0,
                119: 0,
                120: 0,
                121: 0,
                122: 0,
                123: 0,
                124: 0,
                125: 0,
                126: 0,
                127: 0
            }
        }]
    }, {
        opId: "2cf4b0a1-b657-405b-8bf9-8555dbd5c231",
        objName: "Ops.WebAudio.AudioBuffer",
        id: "01b99f73-6ca1-495a-9e3f-410e091851a4",
        uiAttribs: {
            translate: {
                x: 960,
                y: 80
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "URL",
            display: "file",
            links: [{
                portIn: "URL",
                portOut: "Stream URL",
                objIn: "01b99f73-6ca1-495a-9e3f-410e091851a4",
                objOut: "56bad45e-2433-4807-8b01-11035db982db"
            }]
        }],
        portsOut: [{
            name: "Audio Buffer"
        }, {
            name: "Finished Loading",
            value: !0
        }, {
            name: "Sample Rate",
            value: 48e3
        }, {
            name: "Length",
            value: 10563918
        }, {
            name: "Duration"
        }, {
            name: "Number of Channels",
            value: 2
        }]
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "ebab4e49-ba9e-431b-bd46-95435514997b",
        uiAttribs: {
            translate: {
                x: 972,
                y: -180
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Click",
                objIn: "ebab4e49-ba9e-431b-bd46-95435514997b",
                objOut: "440cedaa-7ba1-4621-9cdc-5b247b394485"
            }, {
                portIn: "trigger",
                portOut: "Touch Start",
                objIn: "ebab4e49-ba9e-431b-bd46-95435514997b",
                objOut: "440cedaa-7ba1-4621-9cdc-5b247b394485"
            }, {
                portIn: "trigger",
                portOut: "Clicked",
                objIn: "ebab4e49-ba9e-431b-bd46-95435514997b",
                objOut: "7f2b99cc-2254-4ad6-a83c-d17c0c55052a"
            }, {
                portIn: "trigger",
                portOut: "Clicked",
                objIn: "ebab4e49-ba9e-431b-bd46-95435514997b",
                objOut: "f2df0fea-5173-4532-a2ba-29b1ca8f67bd"
            }, {
                portIn: "trigger",
                portOut: "next",
                objIn: "ebab4e49-ba9e-431b-bd46-95435514997b",
                objOut: "1f034e68-3eb3-41ef-aff6-b26ed82a4280"
            }, {
                portIn: "trigger",
                portOut: "Touch End",
                objIn: "ebab4e49-ba9e-431b-bd46-95435514997b",
                objOut: "c8968c97-9f6e-4a11-801b-e438904d296d"
            }, {
                portIn: "trigger",
                portOut: "Touch End",
                objIn: "ebab4e49-ba9e-431b-bd46-95435514997b",
                objOut: "6a5c908d-42de-41cf-96e2-7928f7211602"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Output",
                objIn: "ebab4e49-ba9e-431b-bd46-95435514997b",
                objOut: "d3b76520-57f4-4557-b0eb-108c360053a0"
            }, {
                portIn: "reset",
                portOut: "Clicked",
                objIn: "ebab4e49-ba9e-431b-bd46-95435514997b",
                objOut: "543b0d9e-59e7-4a45-8f31-15be660e79c9"
            }, {
                portIn: "reset",
                portOut: "Clicked",
                objIn: "ebab4e49-ba9e-431b-bd46-95435514997b",
                objOut: "f1a7a293-7a4f-4900-ac3c-cf36ad01d79c"
            }, {
                portIn: "reset",
                portOut: "Clicked",
                objIn: "ebab4e49-ba9e-431b-bd46-95435514997b",
                objOut: "0bc9d883-5860-4931-8df4-6662e23ffdb4"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "ebab4e49-ba9e-431b-bd46-95435514997b",
                objOut: "e1a0e11a-e409-48ef-a27e-3fff18bc0172"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "ebab4e49-ba9e-431b-bd46-95435514997b",
                objOut: "9f87c5b7-0773-4070-8f7a-2bf2786b419a"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        objName: "Ops.User.l6n.GetSoundcloud",
        id: "56bad45e-2433-4807-8b01-11035db982db",
        uiAttribs: {
            translate: {
                x: 840,
                y: -1680
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "SoundCloud URL",
            value: "https://soundcloud.com/crosseworks/venice-louis-the-child-remix"
        }],
        portsOut: [{
            name: "Stream URL"
        }, {
            name: "Artwork URL"
        }, {
            name: "Title"
        }, {
            name: "Result"
        }]
    }, {
        opId: "da3de45b-c252-4785-8558-7fadb199ea61",
        objName: "Ops.Html.BackgroundImage",
        id: "62cec76b-8a00-4b77-9238-d422892b71e7",
        uiAttribs: {
            translate: {
                x: 816,
                y: 140
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "62cec76b-8a00-4b77-9238-d422892b71e7",
                objOut: "b6cf471b-0520-4ae5-a0c0-fc3483c2fa19"
            }]
        }, {
            name: "active",
            value: !0
        }, {
            name: "image file",
            display: "file",
            links: [{
                portIn: "image file",
                portOut: "Artwork URL",
                objIn: "62cec76b-8a00-4b77-9238-d422892b71e7",
                objOut: "56bad45e-2433-4807-8b01-11035db982db"
            }]
        }, {
            name: "Size",
            value: "contain"
        }, {
            name: "Repeat",
            value: "no-repeat"
        }, {
            name: "Position",
            value: "center center"
        }],
        portsOut: [{
            name: "HTML Element"
        }]
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "440cedaa-7ba1-4621-9cdc-5b247b394485",
        uiAttribs: {
            translate: {
                x: 948,
                y: -260
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "440cedaa-7ba1-4621-9cdc-5b247b394485",
                objOut: "b6cf471b-0520-4ae5-a0c0-fc3483c2fa19"
            }]
        }, {
            name: "Mouse Down Active",
            value: !0
        }, {
            name: "Mouse Up Active",
            value: !0
        }, {
            name: "Click Active",
            value: !0
        }, {
            name: "Mouse Move Active",
            value: !0
        }, {
            name: "Touch Start Active",
            value: !0
        }, {
            name: "Touch Move Active",
            value: !0
        }, {
            name: "Touch End Active",
            value: !0
        }, {
            name: "Touch Cancel Active",
            value: !0
        }],
        portsOut: [{
            name: "Event Object"
        }, {
            name: "Mouse Down"
        }, {
            name: "Mouse Up"
        }, {
            name: "Click"
        }, {
            name: "Mouse Move",
            value: 0
        }, {
            name: "Touch Start"
        }, {
            name: "Touch Move",
            value: 0
        }, {
            name: "Touch End",
            value: 0
        }, {
            name: "Touch Cancel",
            value: 0
        }, {
            name: "Event Name",
            value: "mousemove"
        }]
    }, {
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "875789c9-6544-475a-bf31-e4863233c2fc",
        uiAttribs: {
            translate: {
                x: 972,
                y: -300
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "875789c9-6544-475a-bf31-e4863233c2fc",
                objOut: "81d353f3-4fab-43ef-9372-3d2526ec0e6e"
            }]
        }, {
            name: "old min",
            value: 0
        }, {
            name: "old max",
            value: .8
        }, {
            name: "new min",
            value: 50
        }, {
            name: "new max",
            value: 100
        }, {
            name: "Easing",
            value: "Linear"
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "33befabf-7eef-45f6-869f-30e0e4f44739",
        objName: "Ops.Html.CSSFilter",
        id: "2ef867d3-fddb-4fa3-ba75-80cfea8e6fdb",
        uiAttribs: {
            translate: {
                x: 960,
                y: -340
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "2ef867d3-fddb-4fa3-ba75-80cfea8e6fdb",
                objOut: "b6cf471b-0520-4ae5-a0c0-fc3483c2fa19"
            }]
        }, {
            name: "method",
            value: "opacity"
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "2ef867d3-fddb-4fa3-ba75-80cfea8e6fdb",
                objOut: "875789c9-6544-475a-bf31-e4863233c2fc"
            }]
        }],
        portsOut: []
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "b549b195-8582-4d2a-91e7-6074a214cfa7",
        uiAttribs: {
            translate: {
                x: 948,
                y: -380
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "b549b195-8582-4d2a-91e7-6074a214cfa7",
                objOut: "440cedaa-7ba1-4621-9cdc-5b247b394485"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "b549b195-8582-4d2a-91e7-6074a214cfa7",
                objOut: "440cedaa-7ba1-4621-9cdc-5b247b394485"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "f4ff66b0-8500-46f7-9117-832aea0c2750",
        objName: "Ops.Time.DelayedTrigger",
        id: "28402c6a-890e-458a-8e14-ba784019df93",
        uiAttribs: {
            translate: {
                x: 660,
                y: 0
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "exe",
            links: [{
                portIn: "exe",
                portOut: "Output",
                objIn: "28402c6a-890e-458a-8e14-ba784019df93",
                objOut: "797f89ac-f463-423d-9c2a-af51634da302"
            }, {
                portIn: "exe",
                portOut: "Clicked",
                objIn: "28402c6a-890e-458a-8e14-ba784019df93",
                objOut: "287b96d2-165b-4191-8396-33559b8c79f2"
            }, {
                portIn: "exe",
                portOut: "Touch End",
                objIn: "28402c6a-890e-458a-8e14-ba784019df93",
                objOut: "4d409f48-c985-4d33-8161-04cff0fd3a6e"
            }]
        }, {
            name: "delay",
            value: .1
        }],
        portsOut: [{
            name: "next"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "a61642b2-2ee2-469a-bcaa-6f174e953a2d",
        uiAttribs: {
            title: "HoverCSS",
            translate: {
                x: 948,
                y: -460
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "a61642b2-2ee2-469a-bcaa-6f174e953a2d",
                objOut: "b6cf471b-0520-4ae5-a0c0-fc3483c2fa19"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "a61642b2-2ee2-469a-bcaa-6f174e953a2d",
                objOut: "b6cf471b-0520-4ae5-a0c0-fc3483c2fa19"
            }]
        }],
        portsOut: []
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "db8c49fb-552b-4cc8-84dd-24a47b38ed08",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: 960,
                y: -420
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "db8c49fb-552b-4cc8-84dd-24a47b38ed08",
                objOut: "b6cf471b-0520-4ae5-a0c0-fc3483c2fa19"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "db8c49fb-552b-4cc8-84dd-24a47b38ed08",
                objOut: "b549b195-8582-4d2a-91e7-6074a214cfa7"
            }]
        }],
        portsOut: []
    }, {
        opId: "05385277-92fc-4d49-b730-11f9ed5e5c0d",
        objName: "Ops.WebAudio.AudioBufferPlayer",
        id: "f21ee2af-db47-4360-9029-0af24091d769",
        uiAttribs: {
            translate: {
                x: 612,
                y: 140
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Audio Buffer",
            links: [{
                portIn: "Audio Buffer",
                portOut: "Audio Buffer",
                objIn: "f21ee2af-db47-4360-9029-0af24091d769",
                objOut: "b6f5ec4d-bda5-41c5-9aa0-f6e8274b9802"
            }]
        }, {
            name: "Start / Stop",
            links: [{
                portIn: "Start / Stop",
                portOut: "result",
                objIn: "f21ee2af-db47-4360-9029-0af24091d769",
                objOut: "637c47fd-7276-47b3-93aa-2e587db0b5db"
            }]
        }, {
            name: "Start Time",
            value: 0,
            anim: {
                keys: [{
                    t: 0,
                    v: 0,
                    e: 0
                }],
                loop: !1
            }
        }, {
            name: "Stop Time",
            value: 0
        }, {
            name: "Offset",
            links: [{
                portIn: "Offset",
                portOut: "Time",
                objIn: "f21ee2af-db47-4360-9029-0af24091d769",
                objOut: "fbb7d6b2-7667-44b6-86dc-7900932fbd9d"
            }]
        }, {
            name: "Autoplay",
            value: !1
        }, {
            name: "Loop",
            value: !1
        }, {
            name: "Detune",
            value: 0
        }, {
            name: "Playback Rate",
            value: 1
        }],
        portsOut: [{
            name: "Audio Out"
        }]
    }, {
        opId: "ef0891db-6053-42ba-b7d5-29c7cf6d8208",
        objName: "Ops.Trigger.Threshold",
        id: "797f89ac-f463-423d-9c2a-af51634da302",
        uiAttribs: {
            translate: {
                x: 672,
                y: -60
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Input",
            links: [{
                portIn: "Input",
                portOut: "Time",
                objIn: "797f89ac-f463-423d-9c2a-af51634da302",
                objOut: "fbb7d6b2-7667-44b6-86dc-7900932fbd9d"
            }]
        }, {
            name: "Threshold",
            links: [{
                portIn: "Threshold",
                portOut: "Duration",
                objIn: "797f89ac-f463-423d-9c2a-af51634da302",
                objOut: "b6f5ec4d-bda5-41c5-9aa0-f6e8274b9802"
            }]
        }],
        portsOut: [{
            name: "Output"
        }]
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "9289ec51-d396-4b62-8697-7ce0917ec6cd",
        uiAttribs: {
            translate: {
                x: 960,
                y: -520
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "9289ec51-d396-4b62-8697-7ce0917ec6cd",
                objOut: "9f87c5b7-0773-4070-8f7a-2bf2786b419a"
            }, {
                portIn: "trigger",
                portOut: "Touch Start",
                objIn: "9289ec51-d396-4b62-8697-7ce0917ec6cd",
                objOut: "9f87c5b7-0773-4070-8f7a-2bf2786b419a"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "9289ec51-d396-4b62-8697-7ce0917ec6cd",
                objOut: "9f87c5b7-0773-4070-8f7a-2bf2786b419a"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "9289ec51-d396-4b62-8697-7ce0917ec6cd",
                objOut: "9f87c5b7-0773-4070-8f7a-2bf2786b419a"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "aac7f721-208f-411a-adb3-79adae2e471a",
        objName: "Ops.Anim.Timer_v2",
        id: "fbb7d6b2-7667-44b6-86dc-7900932fbd9d",
        uiAttribs: {
            translate: {
                x: 660,
                y: -120
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Speed",
            value: 1
        }, {
            name: "Play",
            links: [{
                portIn: "Play",
                portOut: "result",
                objIn: "fbb7d6b2-7667-44b6-86dc-7900932fbd9d",
                objOut: "637c47fd-7276-47b3-93aa-2e587db0b5db"
            }]
        }, {
            name: "Reset",
            links: [{
                portIn: "Reset",
                portOut: "Output",
                objIn: "fbb7d6b2-7667-44b6-86dc-7900932fbd9d",
                objOut: "797f89ac-f463-423d-9c2a-af51634da302"
            }, {
                portIn: "Reset",
                portOut: "Clicked",
                objIn: "fbb7d6b2-7667-44b6-86dc-7900932fbd9d",
                objOut: "287b96d2-165b-4191-8396-33559b8c79f2"
            }, {
                portIn: "Reset",
                portOut: "Touch End",
                objIn: "fbb7d6b2-7667-44b6-86dc-7900932fbd9d",
                objOut: "4d409f48-c985-4d33-8161-04cff0fd3a6e"
            }]
        }, {
            name: "Sync to timeline",
            value: !1
        }],
        portsOut: [{
            name: "Time"
        }]
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "637c47fd-7276-47b3-93aa-2e587db0b5db",
        uiAttribs: {
            translate: {
                x: 624,
                y: -180
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Click",
                objIn: "637c47fd-7276-47b3-93aa-2e587db0b5db",
                objOut: "879e6a2d-9f49-4ff0-a00d-fef7c4b644a9"
            }, {
                portIn: "trigger",
                portOut: "Touch Start",
                objIn: "637c47fd-7276-47b3-93aa-2e587db0b5db",
                objOut: "879e6a2d-9f49-4ff0-a00d-fef7c4b644a9"
            }, {
                portIn: "trigger",
                portOut: "Clicked",
                objIn: "637c47fd-7276-47b3-93aa-2e587db0b5db",
                objOut: "f1a7a293-7a4f-4900-ac3c-cf36ad01d79c"
            }, {
                portIn: "trigger",
                portOut: "Clicked",
                objIn: "637c47fd-7276-47b3-93aa-2e587db0b5db",
                objOut: "fa6635f2-56df-4077-8a61-47984602de96"
            }, {
                portIn: "trigger",
                portOut: "next",
                objIn: "637c47fd-7276-47b3-93aa-2e587db0b5db",
                objOut: "28402c6a-890e-458a-8e14-ba784019df93"
            }, {
                portIn: "trigger",
                portOut: "Touch End",
                objIn: "637c47fd-7276-47b3-93aa-2e587db0b5db",
                objOut: "e1a0e11a-e409-48ef-a27e-3fff18bc0172"
            }, {
                portIn: "trigger",
                portOut: "Touch End",
                objIn: "637c47fd-7276-47b3-93aa-2e587db0b5db",
                objOut: "a19aa590-409a-48ec-a2d6-488daf175ca8"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Output",
                objIn: "637c47fd-7276-47b3-93aa-2e587db0b5db",
                objOut: "797f89ac-f463-423d-9c2a-af51634da302"
            }, {
                portIn: "reset",
                portOut: "Clicked",
                objIn: "637c47fd-7276-47b3-93aa-2e587db0b5db",
                objOut: "287b96d2-165b-4191-8396-33559b8c79f2"
            }, {
                portIn: "reset",
                portOut: "Clicked",
                objIn: "637c47fd-7276-47b3-93aa-2e587db0b5db",
                objOut: "00983655-da34-4569-a02f-35d309187161"
            }, {
                portIn: "reset",
                portOut: "Clicked",
                objIn: "637c47fd-7276-47b3-93aa-2e587db0b5db",
                objOut: "7f2b99cc-2254-4ad6-a83c-d17c0c55052a"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "637c47fd-7276-47b3-93aa-2e587db0b5db",
                objOut: "f75bd15b-0ceb-4627-8cd8-3cf67faf0590"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "637c47fd-7276-47b3-93aa-2e587db0b5db",
                objOut: "6a5c908d-42de-41cf-96e2-7928f7211602"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "22523fae-a623-401d-b952-a57c26de4b4e",
        objName: "Ops.WebAudio.AudioAnalyzer",
        id: "032931e5-05ee-4b2f-9e4d-7b1f3250b47e",
        uiAttribs: {
            translate: {
                x: 600,
                y: 200
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "FFT size",
            value: 256
        }, {
            name: "refresh",
            links: [{
                portIn: "refresh",
                portOut: "trigger",
                objIn: "032931e5-05ee-4b2f-9e4d-7b1f3250b47e",
                objOut: "911dd833-0622-4d65-9ae0-9c75c0897631"
            }]
        }, {
            name: "Audio In",
            links: [{
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "032931e5-05ee-4b2f-9e4d-7b1f3250b47e",
                objOut: "f21ee2af-db47-4360-9029-0af24091d769"
            }]
        }, {
            name: "Data",
            value: "Frequency"
        }],
        portsOut: [{
            name: "Next",
            value: 0
        }, {
            name: "Audio Out"
        }, {
            name: "average volume"
        }, {
            name: "fft",
            value: {
                0: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
                7: 0,
                8: 0,
                9: 0,
                10: 0,
                11: 0,
                12: 0,
                13: 0,
                14: 0,
                15: 0,
                16: 0,
                17: 0,
                18: 0,
                19: 0,
                20: 0,
                21: 0,
                22: 0,
                23: 0,
                24: 0,
                25: 0,
                26: 0,
                27: 0,
                28: 0,
                29: 0,
                30: 0,
                31: 0,
                32: 0,
                33: 0,
                34: 0,
                35: 0,
                36: 0,
                37: 0,
                38: 0,
                39: 0,
                40: 0,
                41: 0,
                42: 0,
                43: 0,
                44: 0,
                45: 0,
                46: 0,
                47: 0,
                48: 0,
                49: 0,
                50: 0,
                51: 0,
                52: 0,
                53: 0,
                54: 0,
                55: 0,
                56: 0,
                57: 0,
                58: 0,
                59: 0,
                60: 0,
                61: 0,
                62: 0,
                63: 0,
                64: 0,
                65: 0,
                66: 0,
                67: 0,
                68: 0,
                69: 0,
                70: 0,
                71: 0,
                72: 0,
                73: 0,
                74: 0,
                75: 0,
                76: 0,
                77: 0,
                78: 0,
                79: 0,
                80: 0,
                81: 0,
                82: 0,
                83: 0,
                84: 0,
                85: 0,
                86: 0,
                87: 0,
                88: 0,
                89: 0,
                90: 0,
                91: 0,
                92: 0,
                93: 0,
                94: 0,
                95: 0,
                96: 0,
                97: 0,
                98: 0,
                99: 0,
                100: 0,
                101: 0,
                102: 0,
                103: 0,
                104: 0,
                105: 0,
                106: 0,
                107: 0,
                108: 0,
                109: 0,
                110: 0,
                111: 0,
                112: 0,
                113: 0,
                114: 0,
                115: 0,
                116: 0,
                117: 0,
                118: 0,
                119: 0,
                120: 0,
                121: 0,
                122: 0,
                123: 0,
                124: 0,
                125: 0,
                126: 0,
                127: 0
            }
        }]
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "9f87c5b7-0773-4070-8f7a-2bf2786b419a",
        uiAttribs: {
            translate: {
                x: 948,
                y: -580
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "9f87c5b7-0773-4070-8f7a-2bf2786b419a",
                objOut: "0bc9d883-5860-4931-8df4-6662e23ffdb4"
            }]
        }, {
            name: "Mouse Down Active",
            value: !0
        }, {
            name: "Mouse Up Active",
            value: !0
        }, {
            name: "Click Active",
            value: !0
        }, {
            name: "Mouse Move Active",
            value: !0
        }, {
            name: "Touch Start Active",
            value: !0
        }, {
            name: "Touch Move Active",
            value: !0
        }, {
            name: "Touch End Active",
            value: !0
        }, {
            name: "Touch Cancel Active",
            value: !0
        }],
        portsOut: [{
            name: "Event Object"
        }, {
            name: "Mouse Down"
        }, {
            name: "Mouse Up"
        }, {
            name: "Click",
            value: 0
        }, {
            name: "Mouse Move",
            value: 0
        }, {
            name: "Touch Start"
        }, {
            name: "Touch Move",
            value: 0
        }, {
            name: "Touch End"
        }, {
            name: "Touch Cancel",
            value: 0
        }, {
            name: "Event Name",
            value: "click"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "7dc18c79-3249-4ae0-81c3-f4fef2e3418c",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: 948,
                y: -620
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "7dc18c79-3249-4ae0-81c3-f4fef2e3418c",
                objOut: "0bc9d883-5860-4931-8df4-6662e23ffdb4"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "7dc18c79-3249-4ae0-81c3-f4fef2e3418c",
                objOut: "9289ec51-d396-4b62-8697-7ce0917ec6cd"
            }]
        }],
        portsOut: []
    }, {
        opId: "2cf4b0a1-b657-405b-8bf9-8555dbd5c231",
        objName: "Ops.WebAudio.AudioBuffer",
        id: "b6f5ec4d-bda5-41c5-9aa0-f6e8274b9802",
        uiAttribs: {
            translate: {
                x: 612,
                y: 80
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "URL",
            display: "file",
            links: [{
                portIn: "URL",
                portOut: "Stream URL",
                objIn: "b6f5ec4d-bda5-41c5-9aa0-f6e8274b9802",
                objOut: "055bac79-5cd8-4bb1-b96c-51cafc8f05c4"
            }]
        }],
        portsOut: [{
            name: "Audio Buffer"
        }, {
            name: "Finished Loading",
            value: !0
        }, {
            name: "Sample Rate",
            value: 48e3
        }, {
            name: "Length",
            value: 144e5
        }, {
            name: "Duration"
        }, {
            name: "Number of Channels",
            value: 2
        }]
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "879e6a2d-9f49-4ff0-a00d-fef7c4b644a9",
        uiAttribs: {
            translate: {
                x: 588,
                y: -260
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "879e6a2d-9f49-4ff0-a00d-fef7c4b644a9",
                objOut: "4d344a26-153a-44a0-a606-01df24c1473e"
            }]
        }, {
            name: "Mouse Down Active",
            value: !0
        }, {
            name: "Mouse Up Active",
            value: !0
        }, {
            name: "Click Active",
            value: !0
        }, {
            name: "Mouse Move Active",
            value: !0
        }, {
            name: "Touch Start Active",
            value: !0
        }, {
            name: "Touch Move Active",
            value: !0
        }, {
            name: "Touch End Active",
            value: !0
        }, {
            name: "Touch Cancel Active",
            value: !0
        }],
        portsOut: [{
            name: "Event Object"
        }, {
            name: "Mouse Down"
        }, {
            name: "Mouse Up"
        }, {
            name: "Click"
        }, {
            name: "Mouse Move",
            value: 0
        }, {
            name: "Touch Start"
        }, {
            name: "Touch Move",
            value: 0
        }, {
            name: "Touch End",
            value: 0
        }, {
            name: "Touch Cancel",
            value: 0
        }, {
            name: "Event Name",
            value: "mousemove"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "535e604a-6266-4984-9330-d6be318277a9",
        uiAttribs: {
            title: "HoverCSS",
            translate: {
                x: 588,
                y: -480
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "535e604a-6266-4984-9330-d6be318277a9",
                objOut: "4d344a26-153a-44a0-a606-01df24c1473e"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "535e604a-6266-4984-9330-d6be318277a9",
                objOut: "4d344a26-153a-44a0-a606-01df24c1473e"
            }]
        }],
        portsOut: []
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "8d13c7bb-3721-4f4e-9839-532b6d9f5122",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: 600,
                y: -440
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "8d13c7bb-3721-4f4e-9839-532b6d9f5122",
                objOut: "4d344a26-153a-44a0-a606-01df24c1473e"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "8d13c7bb-3721-4f4e-9839-532b6d9f5122",
                objOut: "b5ae1fa2-95a5-4541-82d9-5ac6e6464faf"
            }]
        }],
        portsOut: []
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "b5ae1fa2-95a5-4541-82d9-5ac6e6464faf",
        uiAttribs: {
            translate: {
                x: 600,
                y: -400
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "b5ae1fa2-95a5-4541-82d9-5ac6e6464faf",
                objOut: "879e6a2d-9f49-4ff0-a00d-fef7c4b644a9"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "b5ae1fa2-95a5-4541-82d9-5ac6e6464faf",
                objOut: "879e6a2d-9f49-4ff0-a00d-fef7c4b644a9"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "673f3eca-243d-42c6-8708-eede745f73a9",
        uiAttribs: {
            translate: {
                x: 624,
                y: -320
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "673f3eca-243d-42c6-8708-eede745f73a9",
                objOut: "032931e5-05ee-4b2f-9e4d-7b1f3250b47e"
            }]
        }, {
            name: "old min",
            value: 0
        }, {
            name: "old max",
            value: .8
        }, {
            name: "new min",
            value: 25
        }, {
            name: "new max",
            value: 100
        }, {
            name: "Easing",
            value: "Linear"
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "33befabf-7eef-45f6-869f-30e0e4f44739",
        objName: "Ops.Html.CSSFilter",
        id: "f2597b7b-ec68-4851-b7dc-4c5d14f504b3",
        uiAttribs: {
            translate: {
                x: 612,
                y: -360
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "f2597b7b-ec68-4851-b7dc-4c5d14f504b3",
                objOut: "4d344a26-153a-44a0-a606-01df24c1473e"
            }]
        }, {
            name: "method",
            value: "opacity"
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "f2597b7b-ec68-4851-b7dc-4c5d14f504b3",
                objOut: "673f3eca-243d-42c6-8708-eede745f73a9"
            }]
        }],
        portsOut: []
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "9ff1ce3e-09c1-4e65-ac95-4e2f72229b17",
        uiAttribs: {
            translate: {
                x: 600,
                y: -540
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "9ff1ce3e-09c1-4e65-ac95-4e2f72229b17",
                objOut: "6a5c908d-42de-41cf-96e2-7928f7211602"
            }, {
                portIn: "trigger",
                portOut: "Touch Start",
                objIn: "9ff1ce3e-09c1-4e65-ac95-4e2f72229b17",
                objOut: "6a5c908d-42de-41cf-96e2-7928f7211602"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "9ff1ce3e-09c1-4e65-ac95-4e2f72229b17",
                objOut: "6a5c908d-42de-41cf-96e2-7928f7211602"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "9ff1ce3e-09c1-4e65-ac95-4e2f72229b17",
                objOut: "6a5c908d-42de-41cf-96e2-7928f7211602"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "6a5c908d-42de-41cf-96e2-7928f7211602",
        uiAttribs: {
            translate: {
                x: 588,
                y: -600
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "6a5c908d-42de-41cf-96e2-7928f7211602",
                objOut: "7f2b99cc-2254-4ad6-a83c-d17c0c55052a"
            }]
        }, {
            name: "Mouse Down Active",
            value: !0
        }, {
            name: "Mouse Up Active",
            value: !0
        }, {
            name: "Click Active",
            value: !0
        }, {
            name: "Mouse Move Active",
            value: !0
        }, {
            name: "Touch Start Active",
            value: !0
        }, {
            name: "Touch Move Active",
            value: !0
        }, {
            name: "Touch End Active",
            value: !0
        }, {
            name: "Touch Cancel Active",
            value: !0
        }],
        portsOut: [{
            name: "Event Object"
        }, {
            name: "Mouse Down"
        }, {
            name: "Mouse Up"
        }, {
            name: "Click",
            value: 0
        }, {
            name: "Mouse Move",
            value: 0
        }, {
            name: "Touch Start"
        }, {
            name: "Touch Move",
            value: 0
        }, {
            name: "Touch End"
        }, {
            name: "Touch Cancel",
            value: 0
        }, {
            name: "Event Name",
            value: "click"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "80fbf8d1-350a-4a48-a012-12522b895127",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: 588,
                y: -640
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "80fbf8d1-350a-4a48-a012-12522b895127",
                objOut: "7f2b99cc-2254-4ad6-a83c-d17c0c55052a"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "80fbf8d1-350a-4a48-a012-12522b895127",
                objOut: "9ff1ce3e-09c1-4e65-ac95-4e2f72229b17"
            }]
        }],
        portsOut: []
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "25396a23-23c5-40c0-a9ec-9fcf6aaa5a1e",
        uiAttribs: {
            title: "ResetHoverCSS",
            translate: {
                x: 588,
                y: -680
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "25396a23-23c5-40c0-a9ec-9fcf6aaa5a1e",
                objOut: "7f2b99cc-2254-4ad6-a83c-d17c0c55052a"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "25396a23-23c5-40c0-a9ec-9fcf6aaa5a1e",
                objOut: "7f2b99cc-2254-4ad6-a83c-d17c0c55052a"
            }]
        }],
        portsOut: []
    }, {
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "7f2b99cc-2254-4ad6-a83c-d17c0c55052a",
        uiAttribs: {
            title: "Next3",
            translate: {
                x: 744,
                y: -740
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "next3"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:101;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            links: [{
                portIn: "Visible",
                portOut: "Result",
                objIn: "7f2b99cc-2254-4ad6-a83c-d17c0c55052a",
                objOut: "20f42a7b-de0f-432c-a6fc-50131eaa85dc"
            }]
        }, {
            name: "Convert Line Breaks",
            value: !1
        }],
        portsOut: [{
            name: "DOM Element"
        }, {
            name: "Hover"
        }, {
            name: "Clicked"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "f0b834a7-4ab6-4827-aadf-624a4933ce70",
        uiAttribs: {
            title: "ResetHoverCSS",
            translate: {
                x: 948,
                y: -660
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "f0b834a7-4ab6-4827-aadf-624a4933ce70",
                objOut: "0bc9d883-5860-4931-8df4-6662e23ffdb4"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "f0b834a7-4ab6-4827-aadf-624a4933ce70",
                objOut: "0bc9d883-5860-4931-8df4-6662e23ffdb4"
            }]
        }],
        portsOut: []
    }, {
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "0bc9d883-5860-4931-8df4-6662e23ffdb4",
        uiAttribs: {
            title: "Next3",
            translate: {
                x: 1092,
                y: -740
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "next3"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:101;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            links: [{
                portIn: "Visible",
                portOut: "Result",
                objIn: "0bc9d883-5860-4931-8df4-6662e23ffdb4",
                objOut: "6e37ea4b-7717-48b3-a065-86a8901d63b7"
            }]
        }, {
            name: "Convert Line Breaks",
            value: !1
        }],
        portsOut: [{
            name: "DOM Element"
        }, {
            name: "Hover"
        }, {
            name: "Clicked"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "0ab3d6b0-06f2-4170-9fb9-629517787fc5",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: 600,
                y: -900
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "0ab3d6b0-06f2-4170-9fb9-629517787fc5",
                objOut: "287b96d2-165b-4191-8396-33559b8c79f2"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "0ab3d6b0-06f2-4170-9fb9-629517787fc5",
                objOut: "db574491-5d46-46ce-bc56-a8dbe51203cc"
            }]
        }],
        portsOut: []
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "db574491-5d46-46ce-bc56-a8dbe51203cc",
        uiAttribs: {
            translate: {
                x: 600,
                y: -800
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "db574491-5d46-46ce-bc56-a8dbe51203cc",
                objOut: "4d409f48-c985-4d33-8161-04cff0fd3a6e"
            }, {
                portIn: "trigger",
                portOut: "Touch Start",
                objIn: "db574491-5d46-46ce-bc56-a8dbe51203cc",
                objOut: "4d409f48-c985-4d33-8161-04cff0fd3a6e"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "db574491-5d46-46ce-bc56-a8dbe51203cc",
                objOut: "4d409f48-c985-4d33-8161-04cff0fd3a6e"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "db574491-5d46-46ce-bc56-a8dbe51203cc",
                objOut: "4d409f48-c985-4d33-8161-04cff0fd3a6e"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "4d409f48-c985-4d33-8161-04cff0fd3a6e",
        uiAttribs: {
            translate: {
                x: 600,
                y: -860
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "4d409f48-c985-4d33-8161-04cff0fd3a6e",
                objOut: "287b96d2-165b-4191-8396-33559b8c79f2"
            }]
        }, {
            name: "Mouse Down Active",
            value: !0
        }, {
            name: "Mouse Up Active",
            value: !0
        }, {
            name: "Click Active",
            value: !0
        }, {
            name: "Mouse Move Active",
            value: !0
        }, {
            name: "Touch Start Active",
            value: !0
        }, {
            name: "Touch Move Active",
            value: !0
        }, {
            name: "Touch End Active",
            value: !0
        }, {
            name: "Touch Cancel Active",
            value: !0
        }],
        portsOut: [{
            name: "Event Object"
        }, {
            name: "Mouse Down"
        }, {
            name: "Mouse Up"
        }, {
            name: "Click",
            value: 0
        }, {
            name: "Mouse Move",
            value: 0
        }, {
            name: "Touch Start"
        }, {
            name: "Touch Move",
            value: 0
        }, {
            name: "Touch End"
        }, {
            name: "Touch Cancel",
            value: 0
        }, {
            name: "Event Name",
            value: "mousemove"
        }]
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "f4c4ccac-9a03-4b1a-9471-23e5d22e9ab3",
        uiAttribs: {
            translate: {
                x: 960,
                y: -800
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "f4c4ccac-9a03-4b1a-9471-23e5d22e9ab3",
                objOut: "c389050b-e080-4478-8424-f59d0e33930f"
            }, {
                portIn: "trigger",
                portOut: "Touch Start",
                objIn: "f4c4ccac-9a03-4b1a-9471-23e5d22e9ab3",
                objOut: "c389050b-e080-4478-8424-f59d0e33930f"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "f4c4ccac-9a03-4b1a-9471-23e5d22e9ab3",
                objOut: "c389050b-e080-4478-8424-f59d0e33930f"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "f4c4ccac-9a03-4b1a-9471-23e5d22e9ab3",
                objOut: "c389050b-e080-4478-8424-f59d0e33930f"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "c389050b-e080-4478-8424-f59d0e33930f",
        uiAttribs: {
            translate: {
                x: 948,
                y: -860
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "c389050b-e080-4478-8424-f59d0e33930f",
                objOut: "543b0d9e-59e7-4a45-8f31-15be660e79c9"
            }]
        }, {
            name: "Mouse Down Active",
            value: !0
        }, {
            name: "Mouse Up Active",
            value: !0
        }, {
            name: "Click Active",
            value: !0
        }, {
            name: "Mouse Move Active",
            value: !0
        }, {
            name: "Touch Start Active",
            value: !0
        }, {
            name: "Touch Move Active",
            value: !0
        }, {
            name: "Touch End Active",
            value: !0
        }, {
            name: "Touch Cancel Active",
            value: !0
        }],
        portsOut: [{
            name: "Event Object"
        }, {
            name: "Mouse Down"
        }, {
            name: "Mouse Up"
        }, {
            name: "Click",
            value: 0
        }, {
            name: "Mouse Move",
            value: 0
        }, {
            name: "Touch Start"
        }, {
            name: "Touch Move",
            value: 0
        }, {
            name: "Touch End"
        }, {
            name: "Touch Cancel",
            value: 0
        }, {
            name: "Event Name",
            value: "mousemove"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "39e76a56-c1d5-49cb-a470-5e5a4258e0e4",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: 948,
                y: -900
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "39e76a56-c1d5-49cb-a470-5e5a4258e0e4",
                objOut: "543b0d9e-59e7-4a45-8f31-15be660e79c9"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "39e76a56-c1d5-49cb-a470-5e5a4258e0e4",
                objOut: "f4c4ccac-9a03-4b1a-9471-23e5d22e9ab3"
            }]
        }],
        portsOut: []
    }, {
        objName: "Ops.User.l6n.GetSoundcloud",
        id: "055bac79-5cd8-4bb1-b96c-51cafc8f05c4",
        uiAttribs: {
            translate: {
                x: 492,
                y: -1680
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "SoundCloud URL",
            value: "https://soundcloud.com/pointpoint/point-point-fplusl"
        }],
        portsOut: [{
            name: "Stream URL"
        }, {
            name: "Artwork URL"
        }, {
            name: "Title"
        }, {
            name: "Result"
        }]
    }, {
        opId: "da3de45b-c252-4785-8558-7fadb199ea61",
        objName: "Ops.Html.BackgroundImage",
        id: "8e07438b-3b5b-45ba-b261-267e7700e28a",
        uiAttribs: {
            translate: {
                x: 468,
                y: 140
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "8e07438b-3b5b-45ba-b261-267e7700e28a",
                objOut: "4d344a26-153a-44a0-a606-01df24c1473e"
            }]
        }, {
            name: "active",
            value: !0
        }, {
            name: "image file",
            display: "file",
            links: [{
                portIn: "image file",
                portOut: "Artwork URL",
                objIn: "8e07438b-3b5b-45ba-b261-267e7700e28a",
                objOut: "055bac79-5cd8-4bb1-b96c-51cafc8f05c4"
            }]
        }, {
            name: "Size",
            value: "contain"
        }, {
            name: "Repeat",
            value: "no-repeat"
        }, {
            name: "Position",
            value: "center center"
        }],
        portsOut: [{
            name: "HTML Element"
        }]
    }, {
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "287b96d2-165b-4191-8396-33559b8c79f2",
        uiAttribs: {
            title: "Reset3",
            translate: {
                x: 732,
                y: -1e3
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "reset3"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:101;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            links: [{
                portIn: "Visible",
                portOut: "Result",
                objIn: "287b96d2-165b-4191-8396-33559b8c79f2",
                objOut: "20f42a7b-de0f-432c-a6fc-50131eaa85dc"
            }]
        }, {
            name: "Convert Line Breaks",
            value: !1
        }],
        portsOut: [{
            name: "DOM Element"
        }, {
            name: "Hover"
        }, {
            name: "Clicked"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "63732050-9d22-437e-a412-17f6895040a3",
        uiAttribs: {
            title: "ResetHoverCSS",
            translate: {
                x: 600,
                y: -940
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "63732050-9d22-437e-a412-17f6895040a3",
                objOut: "287b96d2-165b-4191-8396-33559b8c79f2"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "63732050-9d22-437e-a412-17f6895040a3",
                objOut: "287b96d2-165b-4191-8396-33559b8c79f2"
            }]
        }],
        portsOut: []
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "b095d377-45a5-4072-90a9-ee067799c182",
        uiAttribs: {
            translate: {
                x: 600,
                y: -1040
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "b095d377-45a5-4072-90a9-ee067799c182",
                objOut: "f75bd15b-0ceb-4627-8cd8-3cf67faf0590"
            }, {
                portIn: "trigger",
                portOut: "Touch Start",
                objIn: "b095d377-45a5-4072-90a9-ee067799c182",
                objOut: "f75bd15b-0ceb-4627-8cd8-3cf67faf0590"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "b095d377-45a5-4072-90a9-ee067799c182",
                objOut: "f75bd15b-0ceb-4627-8cd8-3cf67faf0590"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "b095d377-45a5-4072-90a9-ee067799c182",
                objOut: "f75bd15b-0ceb-4627-8cd8-3cf67faf0590"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "543b0d9e-59e7-4a45-8f31-15be660e79c9",
        uiAttribs: {
            title: "Reset3",
            translate: {
                x: 1104,
                y: -1e3
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "reset3"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:101;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            links: [{
                portIn: "Visible",
                portOut: "Result",
                objIn: "543b0d9e-59e7-4a45-8f31-15be660e79c9",
                objOut: "6e37ea4b-7717-48b3-a065-86a8901d63b7"
            }]
        }, {
            name: "Convert Line Breaks",
            value: !1
        }],
        portsOut: [{
            name: "DOM Element"
        }, {
            name: "Hover"
        }, {
            name: "Clicked"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "1938b621-43b8-4bc0-8672-4c4c98905c18",
        uiAttribs: {
            title: "ResetHoverCSS",
            translate: {
                x: 948,
                y: -940
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "1938b621-43b8-4bc0-8672-4c4c98905c18",
                objOut: "543b0d9e-59e7-4a45-8f31-15be660e79c9"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "1938b621-43b8-4bc0-8672-4c4c98905c18",
                objOut: "543b0d9e-59e7-4a45-8f31-15be660e79c9"
            }]
        }],
        portsOut: []
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "a46c9eee-99da-42a1-9193-7e8b11fc30ac",
        uiAttribs: {
            translate: {
                x: 948,
                y: -1040
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "a46c9eee-99da-42a1-9193-7e8b11fc30ac",
                objOut: "e1a0e11a-e409-48ef-a27e-3fff18bc0172"
            }, {
                portIn: "trigger",
                portOut: "Touch Start",
                objIn: "a46c9eee-99da-42a1-9193-7e8b11fc30ac",
                objOut: "e1a0e11a-e409-48ef-a27e-3fff18bc0172"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "a46c9eee-99da-42a1-9193-7e8b11fc30ac",
                objOut: "e1a0e11a-e409-48ef-a27e-3fff18bc0172"
            }, {
                portIn: "reset",
                portOut: "Touch End",
                objIn: "a46c9eee-99da-42a1-9193-7e8b11fc30ac",
                objOut: "e1a0e11a-e409-48ef-a27e-3fff18bc0172"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "6175b5f0-3fa2-489b-b76e-96e6070584e0",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: 600,
                y: -1140
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "6175b5f0-3fa2-489b-b76e-96e6070584e0",
                objOut: "00983655-da34-4569-a02f-35d309187161"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "6175b5f0-3fa2-489b-b76e-96e6070584e0",
                objOut: "b095d377-45a5-4072-90a9-ee067799c182"
            }]
        }],
        portsOut: []
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "f75bd15b-0ceb-4627-8cd8-3cf67faf0590",
        uiAttribs: {
            translate: {
                x: 600,
                y: -1100
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "f75bd15b-0ceb-4627-8cd8-3cf67faf0590",
                objOut: "00983655-da34-4569-a02f-35d309187161"
            }]
        }, {
            name: "Mouse Down Active",
            value: !0
        }, {
            name: "Mouse Up Active",
            value: !0
        }, {
            name: "Click Active",
            value: !0
        }, {
            name: "Mouse Move Active",
            value: !0
        }, {
            name: "Touch Start Active",
            value: !0
        }, {
            name: "Touch Move Active",
            value: !0
        }, {
            name: "Touch End Active",
            value: !0
        }, {
            name: "Touch Cancel Active",
            value: !0
        }],
        portsOut: [{
            name: "Event Object"
        }, {
            name: "Mouse Down"
        }, {
            name: "Mouse Up"
        }, {
            name: "Click",
            value: 0
        }, {
            name: "Mouse Move",
            value: 0
        }, {
            name: "Touch Start"
        }, {
            name: "Touch Move",
            value: 0
        }, {
            name: "Touch End"
        }, {
            name: "Touch Cancel",
            value: 0
        }, {
            name: "Event Name",
            value: "mousemove"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "b60ca76b-06d8-4cb2-876c-d64f8277d594",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: 948,
                y: -1140
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "b60ca76b-06d8-4cb2-876c-d64f8277d594",
                objOut: "f1a7a293-7a4f-4900-ac3c-cf36ad01d79c"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "b60ca76b-06d8-4cb2-876c-d64f8277d594",
                objOut: "a46c9eee-99da-42a1-9193-7e8b11fc30ac"
            }]
        }],
        portsOut: []
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "e1a0e11a-e409-48ef-a27e-3fff18bc0172",
        uiAttribs: {
            translate: {
                x: 948,
                y: -1100
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "e1a0e11a-e409-48ef-a27e-3fff18bc0172",
                objOut: "f1a7a293-7a4f-4900-ac3c-cf36ad01d79c"
            }]
        }, {
            name: "Mouse Down Active",
            value: !0
        }, {
            name: "Mouse Up Active",
            value: !0
        }, {
            name: "Click Active",
            value: !0
        }, {
            name: "Mouse Move Active",
            value: !0
        }, {
            name: "Touch Start Active",
            value: !0
        }, {
            name: "Touch Move Active",
            value: !0
        }, {
            name: "Touch End Active",
            value: !0
        }, {
            name: "Touch Cancel Active",
            value: !0
        }],
        portsOut: [{
            name: "Event Object"
        }, {
            name: "Mouse Down"
        }, {
            name: "Mouse Up"
        }, {
            name: "Click",
            value: 0
        }, {
            name: "Mouse Move",
            value: 0
        }, {
            name: "Touch Start"
        }, {
            name: "Touch Move",
            value: 0
        }, {
            name: "Touch End"
        }, {
            name: "Touch Cancel",
            value: 0
        }, {
            name: "Event Name",
            value: "mousemove"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "59490067-4cf1-4d18-96ae-b5c719bc3d82",
        uiAttribs: {
            title: "ResetHoverCSS",
            translate: {
                x: 600,
                y: -1180
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "59490067-4cf1-4d18-96ae-b5c719bc3d82",
                objOut: "00983655-da34-4569-a02f-35d309187161"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "59490067-4cf1-4d18-96ae-b5c719bc3d82",
                objOut: "00983655-da34-4569-a02f-35d309187161"
            }]
        }],
        portsOut: []
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "f8bfbc69-c47a-4ed2-8db5-fc4b5d7e5712",
        uiAttribs: {
            title: "ResetHoverCSS",
            translate: {
                x: 948,
                y: -1180
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "f8bfbc69-c47a-4ed2-8db5-fc4b5d7e5712",
                objOut: "f1a7a293-7a4f-4900-ac3c-cf36ad01d79c"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "f8bfbc69-c47a-4ed2-8db5-fc4b5d7e5712",
                objOut: "f1a7a293-7a4f-4900-ac3c-cf36ad01d79c"
            }]
        }],
        portsOut: []
    }, {
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "00983655-da34-4569-a02f-35d309187161",
        uiAttribs: {
            title: "Back3",
            translate: {
                x: 732,
                y: -1240
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "back3"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:101;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            links: [{
                portIn: "Visible",
                portOut: "Result",
                objIn: "00983655-da34-4569-a02f-35d309187161",
                objOut: "20f42a7b-de0f-432c-a6fc-50131eaa85dc"
            }]
        }, {
            name: "Convert Line Breaks",
            value: !1
        }],
        portsOut: [{
            name: "DOM Element"
        }, {
            name: "Hover"
        }, {
            name: "Clicked"
        }]
    }, {
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "f1a7a293-7a4f-4900-ac3c-cf36ad01d79c",
        uiAttribs: {
            title: "Back3",
            translate: {
                x: 1104,
                y: -1240
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "back3"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:101;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            links: [{
                portIn: "Visible",
                portOut: "Result",
                objIn: "f1a7a293-7a4f-4900-ac3c-cf36ad01d79c",
                objOut: "6e37ea4b-7717-48b3-a065-86a8901d63b7"
            }]
        }, {
            name: "Convert Line Breaks",
            value: !1
        }],
        portsOut: [{
            name: "DOM Element"
        }, {
            name: "Hover"
        }, {
            name: "Clicked"
        }]
    }, {
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "4d344a26-153a-44a0-a606-01df24c1473e",
        uiAttribs: {
            title: "Song",
            translate: {
                x: 600,
                y: -1300
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "songCard"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:100;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            links: [{
                portIn: "Visible",
                portOut: "Result",
                objIn: "4d344a26-153a-44a0-a606-01df24c1473e",
                objOut: "20f42a7b-de0f-432c-a6fc-50131eaa85dc"
            }]
        }, {
            name: "Convert Line Breaks",
            value: !1
        }],
        portsOut: [{
            name: "DOM Element"
        }, {
            name: "Hover"
        }, {
            name: "Clicked",
            value: 0
        }]
    }, {
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "b6cf471b-0520-4ae5-a0c0-fc3483c2fa19",
        uiAttribs: {
            title: "Song3",
            translate: {
                x: 948,
                y: -1300
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "songCard"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:100;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            links: [{
                portIn: "Visible",
                portOut: "Result",
                objIn: "b6cf471b-0520-4ae5-a0c0-fc3483c2fa19",
                objOut: "6e37ea4b-7717-48b3-a065-86a8901d63b7"
            }]
        }, {
            name: "Convert Line Breaks",
            value: !1
        }],
        portsOut: [{
            name: "DOM Element"
        }, {
            name: "Hover"
        }, {
            name: "Clicked",
            value: 0
        }]
    }, {
        objName: "Ops.User.l6n.TrueIf2",
        id: "20f42a7b-de0f-432c-a6fc-50131eaa85dc",
        uiAttribs: {
            translate: {
                x: 600,
                y: -1360
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "Value",
                objIn: "20f42a7b-de0f-432c-a6fc-50131eaa85dc",
                objOut: "485031f9-2163-46cc-8cb9-9dcb4c69767c"
            }]
        }],
        portsOut: [{
            name: "Result"
        }]
    }, {
        objName: "Ops.User.l6n.TrueIf3",
        id: "6e37ea4b-7717-48b3-a065-86a8901d63b7",
        uiAttribs: {
            translate: {
                x: 948,
                y: -1360
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "Value",
                objIn: "6e37ea4b-7717-48b3-a065-86a8901d63b7",
                objOut: "485031f9-2163-46cc-8cb9-9dcb4c69767c"
            }]
        }],
        portsOut: [{
            name: "Result"
        }]
    }, {
        opId: "cf3544e4-e392-432b-89fd-fcfb5c974388",
        objName: "Ops.Trigger.TriggerOnce",
        id: "a95ef587-1e72-46bf-9707-6ba25ace8f53",
        uiAttribs: {
            translate: {
                x: -624,
                y: -260
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Exec",
            links: [{
                portIn: "Exec",
                portOut: "trigger",
                objIn: "a95ef587-1e72-46bf-9707-6ba25ace8f53",
                objOut: "911dd833-0622-4d65-9ae0-9c75c0897631"
            }]
        }, {
            name: "Reset",
            value: 0
        }],
        portsOut: [{
            name: "Next"
        }, {
            name: "Was Triggered",
            value: !0
        }]
    }, {
        opId: "33befabf-7eef-45f6-869f-30e0e4f44739",
        objName: "Ops.Html.CSSFilter",
        id: "1f79d54b-b85f-481f-b5b2-7ad288df7093",
        uiAttribs: {
            translate: {
                x: 1056,
                y: -1300
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "1f79d54b-b85f-481f-b5b2-7ad288df7093",
                objOut: "b6cf471b-0520-4ae5-a0c0-fc3483c2fa19"
            }]
        }, {
            name: "method",
            value: "invert"
        }, {
            name: "Value",
            value: 0
        }],
        portsOut: []
    }, {
        opId: "33befabf-7eef-45f6-869f-30e0e4f44739",
        objName: "Ops.Html.CSSFilter",
        id: "c30e7b6f-0147-48fd-b0cc-47ba1772aed4",
        uiAttribs: {
            translate: {
                x: 708,
                y: -1300
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "c30e7b6f-0147-48fd-b0cc-47ba1772aed4",
                objOut: "4d344a26-153a-44a0-a606-01df24c1473e"
            }]
        }, {
            name: "method",
            value: "invert"
        }, {
            name: "Value",
            value: 0
        }],
        portsOut: []
    }, {
        opId: "33befabf-7eef-45f6-869f-30e0e4f44739",
        objName: "Ops.Html.CSSFilter",
        id: "d68c1064-cf8a-46e1-9838-15001554b335",
        uiAttribs: {
            translate: {
                x: 360,
                y: -1300
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "d68c1064-cf8a-46e1-9838-15001554b335",
                objOut: "66cfaea0-dcab-4574-9fe8-70629348fce8"
            }]
        }, {
            name: "method",
            value: "invert"
        }, {
            name: "Value",
            value: 0
        }],
        portsOut: []
    }, {
        opId: "33befabf-7eef-45f6-869f-30e0e4f44739",
        objName: "Ops.Html.CSSFilter",
        id: "9978ae05-0472-4e93-8279-70108c2254b5",
        uiAttribs: {
            translate: {
                x: 12,
                y: -1300
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "9978ae05-0472-4e93-8279-70108c2254b5",
                objOut: "02653ce3-5e15-4f29-b361-b5b69937dea8"
            }]
        }, {
            name: "method",
            value: "invert"
        }, {
            name: "Value",
            value: 0
        }],
        portsOut: []
    }],
    users: [],
    userOps: [],
    tags: [],
    _id: "5d9cb45908777235ed778b8b",
    name: "bgHome",
    userId: "5d7fcdd100a8de4b710cd6b5",
    created: "2019-10-08T16:07:53.670Z",
    updated: "2019-10-18T19:32:36.296Z",
    __v: 21,
    shortId: "zS78IS",
    opsHash: "10edff94816370d3386f762ae7c4d8af4d47da67",
    ui: {
        viewBox: {
            x: -650.1848676838674,
            y: -1926.0094044414159,
            w: 2288.4422308016756,
            h: 1948.9362472649013
        },
        timeLineLength: 20,
        bookmarks: [],
        subPatchViewBoxes: [],
        renderer: {
            w: 771,
            h: 371,
            s: 1
        }
    },
    updatedByUser: "L6n",
    cachedUsername: "L6n",
    views: 2,
    cachedNumComments: 0,
    cachedNumFavs: 0,
    statsAdmin: {
        filenameScreenshots: ["_screenshots/screenshot.png", "_screenshots/screenshot_1570554714194.png", "_screenshots/screenshot_1570555131064.png", "_screenshots/screenshot_1570555302983.png", "_screenshots/screenshot_1570555645170.png", "_screenshots/screenshot_1570556044324.png", "_screenshots/screenshot_1570556928038.png", "_screenshots/screenshot_1570561230919.png", "_screenshots/screenshot_1570561299576.png", "_screenshots/screenshot_1570573254391.png", "_screenshots/screenshot_1570593801253.png", "_screenshots/screenshot_1570595179170.png", "_screenshots/screenshot_1570595913031.png", "_screenshots/screenshot_1570596190816.png", "_screenshots/screenshot_1570649003581.png", "_screenshots/screenshot_1570654018369.png", "_screenshots/screenshot_1570752852384.png", "_screenshots/screenshot_1571376028916.png", "_screenshots/screenshot_1571426764134.png", "_screenshots/screenshot_1571427156935.png"],
        filenameExports: ["_exports/cables_bgHome1.zip", "_exports/cables_bgHome2.zip", "_exports/cables_bgHome3.zip", "_exports/cables_bgHome4.zip", "_exports/cables_bgHome5.zip", "_exports/cables_bgHome6.zip"],
        filenameAssets: [],
        hasOldScreenshots: !1,
        hasOldExports: !1,
        sizeScreenshots: 24.001953125,
        sizeExports: 1157.826171875,
        sizeAssets: 0
    },
    exports: 7
}, (CABLES = CABLES || {}).OPS = CABLES.OPS || {};
var Ops = Ops || {};
Ops.Gl = Ops.Gl || {}, Ops.User = Ops.User || {}, Ops.Time = Ops.Time || {}, Ops.Math = Ops.Math || {}, Ops.Anim = Ops.Anim || {}, Ops.Html = Ops.Html || {}, Ops.Value = Ops.Value || {}, Ops.Array = Ops.Array || {}, Ops.Trigger = Ops.Trigger || {}, Ops.Boolean = Ops.Boolean || {}, Ops.User.l6n = Ops.User.l6n || {}, Ops.WebAudio = Ops.WebAudio || {}, Ops.Gl.Shader = Ops.Gl.Shader || {}, Ops.Gl.Matrix = Ops.Gl.Matrix || {}, Ops.Gl.Meshes = Ops.Gl.Meshes || {}, Ops.Deprecated = Ops.Deprecated || {}, Ops.Deprecated.Array = Ops.Deprecated.Array || {}, Ops.Gl.Meshes.PointCloudFromArray = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = e.inTrigger("exe"),
        n = e.inArray("Array"),
        a = e.inValueInt("Num Points"),
        i = e.outTrigger("Trigger out"),
        r = e.outObject("Geometry"),
        o = e.inValueBool("Scramble Texcoords", !0),
        s = e.inValue("Seed"),
        l = e.inArray("Coordinates"),
        u = e.inArray("Vertex Colors"),
        c = e.patch.cgl;
    l.onChange = g, o.onChange = g, s.onChange = n.onChange = function () {
        m = !0
    }, a.onChange = v, e.toWorkPortsNeedToBeLinked(n, t), e.setPortGroup("Texture Coordinates", [o, s, l]);
    var d = !1,
        h = !1;
    t.onTriggered = function () {
        if (i.trigger(), CABLES.UI) {
            var t = c.getShader();
            if (t && t.glPrimitive != c.gl.POINTS) return void(d || (e.uiAttr({
                warning: "using a Material not made for point rendering. maybe use pointMaterial."
            }), d = !0));
            d && (e.uiAttr({
                warning: null
            }), d = !1)
        }!m && f || function () {
            var t = n.get();
            if (!t || 0 == t.length) return void(f = null);
            h && (h = !1, e.uiAttr({
                error: null
            }));
            if (t.length % 3 == 0 == !1) return void(h || (e.uiAttr({
                error: "Array length not divisible by 3!"
            }), h = !0));
            b.clear();
            var a = t.length / 3;
            if (0 == (a = Math.abs(Math.floor(a)))) return;
            p && p.length == 2 * a || (p = new Float32Array(2 * a));
            var i = !1,
                d = o.get();
            Math.randomSeed = s.get();
            var g = !l.isLinked();
            i = !l.isLinked();
            for (var _ = 0; _ < a; _++) b.vertices[3 * _] == t[3 * _] && b.vertices[3 * _ + 1] == t[3 * _ + 1] && b.vertices[3 * _ + 2] == t[3 * _ + 2] || (g && (d ? (p[2 * _] = Math.seededRandom(), p[2 * _ + 1] = Math.seededRandom()) : (p[2 * _] = _ / a, p[2 * _ + 1] = _ / a)), i = !0);
            if (u.get()) {
                if (!h && u.get().length != 4 * a) return e.uiAttr({
                    error: "Color array does not have the correct length! (should be " + 4 * a + ")"
                }), h = !0, void(f = null);
                b.vertexColors = u.get()
            } else b.vertexColors = [];
            i && (g || (p = l.get()), b.setPointVertices(t), b.setTexCoords(p), b.verticesIndices = [], f && f.dispose(), (f = new CGL.Mesh(c, b, c.gl.POINTS)).addVertexNumbers = !0, f.setGeom(b), r.set(b));
            v(), m = !1
        }();
        f && f.render(c.getShader())
    };
    var f = null;
    const b = new CGL.Geometry("pointcloudfromarray");
    var p = [],
        m = !0;

    function g() {
        l.isLinked() ? (s.setUiAttribs({
            greyout: !0
        }), o.setUiAttribs({
            greyout: !0
        })) : (o.setUiAttribs({
            greyout: !1
        }), o.get() ? s.setUiAttribs({
            greyout: !1
        }) : s.setUiAttribs({
            greyout: !0
        })), m = !0
    }

    function v() {
        f && (f.setNumVertices(Math.min(b.vertices.length / 3, a.get())), 0 == a.get() && f.setNumVertices(b.vertices.length / 3))
    }
}, Ops.Gl.Meshes.PointCloudFromArray.prototype = new CABLES.Op, CABLES.OPS["0a6d9c6f-6459-45ca-88ad-268a1f7304db"] = {
    f: Ops.Gl.Meshes.PointCloudFromArray,
    objName: "Ops.Gl.Meshes.PointCloudFromArray"
}, Ops.Array.ArrayPack3 = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = e.inTrigger("Trigger in"),
        n = e.inArray("Array 1"),
        a = e.inArray("Array 2"),
        i = e.inArray("Array 3"),
        r = e.outTrigger("Trigger out"),
        o = e.outArray("Array out"),
        s = e.outValue("Num Points"),
        l = e.outNumber("Array length");
    var u = !1,
        c = [],
        d = [],
        h = !0;
    t.onTriggered = function () {
        var t = n.get(),
            f = a.get(),
            b = i.get();
        if (!t && !f && !b) return o.set(null), void s.set(0);
        if (h) {
            var p = 0;
            if (!t || !f || !b) {
                if (t ? p = t.length : f ? p = f.length : b && (p = b.length), d.length != p)
                    for (var m = 0; m < p; m++) d[m] = 0;
                t || (t = d), f || (f = d), b || (b = d)
            }
            if (t.length !== f.length || f.length !== b.length) return void(u || (e.uiAttr({
                error: "Arrays do not have the same length !"
            }), s.set(0), u = !0));
            u && (u = !1, e.uiAttr({
                error: null
            })), c.length = t.length;
            for (var m = 0; m < t.length; m++) c[3 * m + 0] = t[m], c[3 * m + 1] = f[m], c[3 * m + 2] = b[m];
            h = !1, o.set(null), o.set(c), s.set(c.length / 3), l.set(c.length)
        }
        r.trigger()
    }, n.onChange = a.onChange = i.onChange = function () {
        h = !0
    }
}, Ops.Array.ArrayPack3.prototype = new CABLES.Op, CABLES.OPS["2bcf32fe-3cbd-48fd-825a-61255bebda9b"] = {
    f: Ops.Array.ArrayPack3,
    objName: "Ops.Array.ArrayPack3"
}, Ops.Anim.Smooth = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = e.inTrigger("Update"),
        n = e.inBool("Separate inc/dec", !1),
        a = e.inValue("Value"),
        i = e.outTrigger("Next"),
        r = e.inValue("Inc factor", 4),
        o = e.inValue("Dec factor", 4),
        s = e.outValue("Result", 0);
    var l, u, c = 0,
        d = 0,
        h = 0,
        f = 0;
    e.toWorkPortsNeedToBeLinked(t);
    var b = 4,
        p = 0;
    const m = 0,
        g = 1;

    function v() {
        var e = n.get();
        !1 === e ? p = m : !0 === e && (p = g), p == m ? (o.setUiAttribs({
            greyout: !0
        }), r.setUiAttribs({
            title: "Inc/Dec factor"
        })) : p == g && (o.setUiAttribs({
            greyout: !1
        }), r.setUiAttribs({
            title: "Inc factor"
        })), _(), O()
    }

    function _() {
        p == m ? (l = r.get(), u = r.get()) : p == g && (l = r.get(), u = o.get()), (l <= .2 || l != l) && (l = .2), (u <= .2 || u != u) && (u = .2)
    }

    function O() {
        var e = 1;
        CABLES.now() - f > 500 || 0 === f ? c = a.get() : e = (CABLES.now() - f) / 16, f = CABLES.now(), b <= 0 && (b = 1e-4);
        var t = d - c;
        (c += t >= 0 ? t / (u * e) : t / (l * e)) > 0 && c < 1e-9 && (c = 0), b != b && (c = 0), c == c && c != -1 / 0 && c != 1 / 0 || (c = a.get()), h != c && (s.set(c), h = c), i.trigger()
    }
    v(), _(), n.setUiAttribs({
        hidePort: !0
    }), r.onChange = o.onChange = _, n.onChange = v, O(), a.onChange = function () {
        d = a.get()
    }, r.onChange = function () {
        _()
    }, t.onTriggered = function () {
        O()
    }
}, Ops.Anim.Smooth.prototype = new CABLES.Op, CABLES.OPS["5677b5b5-753a-4fbf-9e91-64c81ec68a2f"] = {
    f: Ops.Anim.Smooth,
    objName: "Ops.Anim.Smooth"
}, Ops.Array.ArraySin = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = e.inArray("array in"),
        n = e.inValueSelect("Math function", ["Sin", "Cos"], "Sin"),
        a = e.outArray("Array result"),
        i = e.inValue("Phase", 0),
        r = e.inValue("Frequency", 1),
        o = e.inValue("Amplitude", 1);
    var s = [],
        l = 0;
    const u = 0,
        c = 1;

    function d() {
        var e = t.get();
        if (e) {
            s.length = e.length;
            var n = o.get(),
                d = r.get(),
                h = i.get(),
                f = 0;
            if (l === u)
                for (f = 0; f < e.length; f++) s[f] = n * Math.sin(e[f] * d + h);
            else if (l === c)
                for (f = 0; f < e.length; f++) s[f] = n * Math.cos(e[f] * d + h);
            a.set(null), a.set(s)
        } else s.length = 0
    }
    t.onChange = d, r.onChange = d, o.onChange = d, i.onChange = d, n.onChange = function () {
        var e = n.get();
        "Sin" === e ? l = u : "Cos" === e && (l = c);
        d()
    }
}, Ops.Array.ArraySin.prototype = new CABLES.Op, CABLES.OPS["ded44bae-a24e-48c5-9585-4cb31f331ab6"] = {
    f: Ops.Array.ArraySin,
    objName: "Ops.Array.ArraySin"
}, Ops.Array.ArrayMathArray = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = e.inArray("array 0"),
        n = e.inArray("array 1"),
        a = e.inSwitch("Math function", ["+", "-", "*", "/", "%", "min", "max"], "+"),
        i = e.outArray("Array result"),
        r = e.outNumber("Array length");
    var o = !1,
        s = [],
        l = 0;
    e.toWorkPortsNeedToBeLinked(n, t);
    const u = 0,
        c = 1,
        d = 2,
        h = 3,
        f = 4,
        b = 5,
        p = 6;

    function m() {
        var a = t.get(),
            m = n.get();
        if (s.length = 0, a && m)
            if (a.length === m.length) {
                o && (o = !1, e.uiAttr({
                    error: null
                })), s.length = a.length;
                var g = 0;
                if (l === u)
                    for (g = 0; g < a.length; g++) s[g] = a[g] + m[g];
                else if (l === c)
                    for (g = 0; g < a.length; g++) s[g] = a[g] - m[g];
                else if (l === d)
                    for (g = 0; g < a.length; g++) s[g] = a[g] * m[g];
                else if (l === h)
                    for (g = 0; g < a.length; g++) s[g] = a[g] / m[g];
                else if (l === f)
                    for (g = 0; g < a.length; g++) s[g] = a[g] % m[g];
                else if (l === b)
                    for (g = 0; g < a.length; g++) s[g] = Math.min(a[g], m[g]);
                else if (l === p)
                    for (g = 0; g < a.length; g++) s[g] = Math.max(a[g], m[g]);
                i.set(null), r.set(s.length), i.set(s)
            } else o || (e.uiAttr({
                error: "Arrays do not have the same length !"
            }), o = !0);
        else r.set(0)
    }
    a.onChange = function () {
        var t = a.get();
        "+" === t ? l = u : "-" === t ? l = c : "*" === t ? l = d : "/" === t ? l = h : "%" === t ? l = f : "min" === t ? l = b : "max" === t && (l = p);
        m(), e.setUiAttrib({
            extendTitle: t
        })
    }, t.onChange = m, n.onChange = m, m()
}, Ops.Array.ArrayMathArray.prototype = new CABLES.Op, CABLES.OPS["f31a1764-ce14-41de-9b3f-dc2fe249bb52"] = {
    f: Ops.Array.ArrayMathArray,
    objName: "Ops.Array.ArrayMathArray"
}, Ops.Gl.Shader.PointMaterial = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = "\n{{MODULES_HEAD}}\n\nIN vec2 texCoord;\n#ifdef HAS_TEXTURES\n\n   #ifdef HAS_TEXTURE_DIFFUSE\n       UNI sampler2D diffTex;\n   #endif\n   #ifdef HAS_TEXTURE_MASK\n       UNI sampler2D texMask;\n   #endif\n#endif\nUNI float r;\nUNI float g;\nUNI float b;\nUNI float a;\n\n#ifdef VERTEX_COLORS\n    IN vec3 vertexColor;\n#endif\n\nvoid main()\n{\n    {{MODULE_BEGIN_FRAG}}\n\n    vec4 col=vec4(r,g,b,a);\n\n    #ifdef HAS_TEXTURES\n\n        #ifdef HAS_TEXTURE_MASK\n            float mask;\n            #ifdef LOOKUP_TEXTURE\n                mask=texture(texMask,texCoord).r;\n            #endif\n            #ifndef LOOKUP_TEXTURE\n                mask=texture(texMask,vec2(gl_PointCoord.x,(1.0-gl_PointCoord.y))).r;\n            #endif\n\n        #endif\n\n        #ifdef HAS_TEXTURE_DIFFUSE\n\n            #ifdef LOOKUP_TEXTURE\n                col=texture(diffTex,texCoord);\n            #endif\n            #ifndef LOOKUP_TEXTURE\n                col=texture(diffTex,vec2(gl_PointCoord.x,(1.0-gl_PointCoord.y)));\n            #endif\n\n            #ifdef COLORIZE_TEXTURE\n              col.r*=r;\n              col.g*=g;\n              col.b*=b;\n            #endif\n        #endif\n        col.a*=a;\n    #endif\n\n    {{MODULE_COLOR}}\n\n    #ifdef MAKE_ROUND\n        if ((gl_PointCoord.x-0.5)*(gl_PointCoord.x-0.5) + (gl_PointCoord.y-0.5)*(gl_PointCoord.y-0.5) > 0.25) discard; //col.a=0.0;\n    #endif\n\n    #ifdef VERTEX_COLORS\n        col.rgb*=vertexColor;\n    #endif\n\n\n    #ifdef HAS_TEXTURE_MASK\n        col.a=mask;\n    #endif\n\n\n    // #ifdef RANDOMIZE_COLOR\n        // col.rgb*=fract(sin(dot(texCoord.xy ,vec2(12.9898,78.233))) * 43758.5453);\n    // #endif\n\n\n\n    outColor = col;\n}\n",
        n = "{{MODULES_HEAD}}\nIN vec3 vPosition;\nIN vec2 attrTexCoord;\nIN vec3 attrVertNormal;\n   IN vec3 attrTangent;\n   IN vec3 attrBiTangent;\n\n#ifdef VERTEX_COLORS\n    IN vec3 attrVertColor;\n    OUT vec3 vertexColor;\n#endif\n\nOUT vec3 norm;\n#ifdef HAS_TEXTURES\n    OUT vec2 texCoord;\n#endif\n\nUNI mat4 projMatrix;\nUNI mat4 modelMatrix;\nUNI mat4 viewMatrix;\n\nUNI float pointSize;\nUNI vec3 camPos;\n\nUNI float canvasWidth;\nUNI float canvasHeight;\nUNI float camDistMul;\n\nUNI float randomSize;\n\nIN float attrVertIndex;\n\n\nfloat rand(float n){return fract(sin(n) * 43758.5453123);}\n\n#define POINTMATERIAL\n\nvoid main()\n{\n    float psMul=sqrt(canvasWidth/canvasHeight)+0.00000000001;\n    float sizeMultiply=1.0;\n\n    vec3 tangent=attrTangent;\n    vec3 bitangent=attrBiTangent;\n\n\n    #ifdef VERTEX_COLORS\n        vertexColor=attrVertColor;\n    #endif\n\n    #ifdef HAS_TEXTURES\n        texCoord=attrTexCoord;\n    #endif\n\n    mat4 mMatrix=modelMatrix;\n\n    vec4 pos = vec4( vPosition, 1. );\n\n    {{MODULE_VERTEX_POSITION}}\n\n    vec4 model=mMatrix * pos;\n\n    psMul+=rand(attrVertIndex)*randomSize;\n\n    psMul*=sizeMultiply;\n\n    #ifndef SCALE_BY_DISTANCE\n        gl_PointSize = pointSize * psMul;\n    #endif\n    #ifdef SCALE_BY_DISTANCE\n        float cameraDist = distance(model.xyz, camPos);\n        gl_PointSize = (pointSize / cameraDist) * psMul;\n    #endif\n\n    gl_Position = projMatrix * viewMatrix * model;\n}\n",
        a = e.patch.cgl,
        i = e.inTrigger("render"),
        r = e.inValueFloat("PointSize", 3),
        o = e.inValue("Random Size", 3),
        s = e.inValueBool("Round", !0),
        l = e.inValueBool("Scale by Distance", !1),
        u = e.inValueSlider("r", Math.random()),
        c = e.inValueSlider("g", Math.random()),
        d = e.inValueSlider("b", Math.random()),
        h = e.inValueSlider("a", 1),
        f = e.inValueBool("preMultiplied alpha"),
        b = e.inBool("Vertex Colors", !1),
        p = e.inTexture("texture"),
        m = e.inTexture("Texture Mask"),
        g = e.inValueBool("colorizeTexture", !1),
        v = e.inValueBool("texture Lookup", !1),
        _ = e.outTrigger("trigger"),
        O = e.outObject("shader");
    e.setPortGroup("Texture", [v, m, p, g]), e.setPortGroup("Color", [u, c, d, h, f, b]), e.setPortGroup("Size", [r, o, s, l]), u.setUiAttribs({
        colorPick: !0
    });
    const I = new CGL.Shader(a, "PointMaterial");
    I.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG"]), I.define("MAKE_ROUND");
    new CGL.Uniform(I, "f", "pointSize", r), new CGL.Uniform(I, "f", "randomSize", o), new CGL.Uniform(I, "f", "r", u), new CGL.Uniform(I, "f", "g", c), new CGL.Uniform(I, "f", "b", d), new CGL.Uniform(I, "f", "a", h);
    const A = new CGL.Uniform(I, "f", "canvasWidth", a.canvasWidth),
        E = new CGL.Uniform(I, "f", "canvasHeight", a.canvasHeight);
    O.set(I), I.setSource(n, t), I.glPrimitive = a.gl.POINTS, I.bindTextures = y, O.ignoreValueSerialize = !0, i.onTriggered = x;
    var M = null,
        T = null;

    function y() {
        p.get() && a.setTexture(0, p.get().tex), m.get() && a.setTexture(1, m.get().tex)
    }

    function x() {
        A.setValue(a.canvasWidth), E.setValue(a.canvasHeight), a.setShader(I), y(), f.get() && a.gl.blendFunc(a.gl.ONE, a.gl.ONE_MINUS_SRC_ALPHA), _.trigger(), f.get() && a.gl.blendFunc(a.gl.SRC_ALPHA, a.gl.ONE_MINUS_SRC_ALPHA), a.setPreviousShader()
    }
    e.preRender = function () {
        I && I.bind(), x()
    }, l.onChange = function () {
        I.toggleDefine("SCALE_BY_DISTANCE", l.get())
    }, s.onChange = function () {
        I.toggleDefine("MAKE_ROUND", s.get())
    }, g.onChange = function () {
        I.toggleDefine("COLORIZE_TEXTURE", g.get())
    }, v.onChange = function () {
        I.toggleDefine("LOOKUP_TEXTURE", v.get())
    }, b.onChange = function () {
        I.toggleDefine("VERTEX_COLORS", b.get())
    }, p.onChange = function () {
        if (p.get()) {
            if (null !== M) return;
            I.removeUniform("diffTex"), I.define("HAS_TEXTURE_DIFFUSE"), M = new CGL.Uniform(I, "t", "diffTex", 0)
        } else I.removeUniform("diffTex"), I.removeDefine("HAS_TEXTURE_DIFFUSE"), M = null
    }, m.onChange = function () {
        if (m.get()) {
            if (null !== T) return;
            I.removeUniform("texMask"), I.define("HAS_TEXTURE_MASK"), T = new CGL.Uniform(I, "t", "texMask", 1)
        } else I.removeUniform("texMask"), I.removeDefine("HAS_TEXTURE_MASK"), T = null
    }
}, Ops.Gl.Shader.PointMaterial.prototype = new CABLES.Op, CABLES.OPS["f86a4a07-00ee-4f68-8839-e02d51d1cd2f"] = {
    f: Ops.Gl.Shader.PointMaterial,
    objName: "Ops.Gl.Shader.PointMaterial"
}, Ops.Array.ArrayMultiply = function () {
    CABLES.Op.apply(this, arguments);
    var e = this.inArray("In"),
        t = this.inValue("Value", 1),
        n = this.outArray("Result"),
        a = [];
    n.set(a), e.onChange = t.onChange = e.onChange = function () {
        var i = e.get();
        if (i) {
            var r = t.get();
            a.length != i.length && (a.length = i.length);
            for (var o = 0; o < i.length; o++) a[o] = i[o] * r;
            n.set(null), n.set(a)
        }
    }
}, Ops.Array.ArrayMultiply.prototype = new CABLES.Op, CABLES.OPS["a01c344b-4129-4b01-9c8f-36cefe86d7cc"] = {
    f: Ops.Array.ArrayMultiply,
    objName: "Ops.Array.ArrayMultiply"
}, Ops.Array.ArraySum = function () {
    CABLES.Op.apply(this, arguments);
    var e = this.inArray("In"),
        t = this.inValue("Value", 1),
        n = this.outArray("Result"),
        a = [];
    n.set(a), t.onChange = e.onChange = function () {
        var i = e.get();
        if (i) {
            var r = t.get();
            a.length != i.length && (a.length = i.length);
            for (var o = 0; o < i.length; o++) a[o] = i[o] + r;
            n.set(null), n.set(a)
        }
    }
}, Ops.Array.ArraySum.prototype = new CABLES.Op, CABLES.OPS["c6b5bf63-0be8-4eea-acc0-9d32973e665a"] = {
    f: Ops.Array.ArraySum,
    objName: "Ops.Array.ArraySum"
}, Ops.Array.ArrayModulo = function () {
    CABLES.Op.apply(this, arguments);
    var e = this.inArray("Array In"),
        t = this.inValue("Value", 1),
        n = this.outArray("Array Out"),
        a = [];
    n.set(a), e.onChange = t.onChange = e.onChange = function () {
        var i = e.get();
        if (i) {
            var r = t.get();
            a.length != i.length && (a.length = i.length);
            var o = 0;
            for (o = 0; o < i.length; o++) a[o] = i[o] % r;
            n.set(null), n.set(a)
        }
    }
}, Ops.Array.ArrayModulo.prototype = new CABLES.Op, CABLES.OPS["30a5568b-31da-4504-9525-578ee404993c"] = {
    f: Ops.Array.ArrayModulo,
    objName: "Ops.Array.ArrayModulo"
}, Ops.Array.ArraySubtract = function () {
    CABLES.Op.apply(this, arguments);
    var e = this.inArray("Array In"),
        t = this.inValue("Value", 1),
        n = this.outArray("Array Out"),
        a = [];
    n.set(a), e.onChange = t.onChange = e.onChange = function () {
        var i = e.get();
        if (i) {
            var r = t.get();
            a.length != i.length && (a.length = i.length);
            var o = 0;
            for (o = 0; o < i.length; o++) a[o] = i[o] - r;
            n.set(null), n.set(a)
        }
    }
}, Ops.Array.ArraySubtract.prototype = new CABLES.Op, CABLES.OPS["af78ab59-75d5-4ead-9a8d-27a63e1cbf3f"] = {
    f: Ops.Array.ArraySubtract,
    objName: "Ops.Array.ArraySubtract"
}, Ops.Value.Number = function () {
    CABLES.Op.apply(this, arguments);
    const e = this.inValueFloat("value"),
        t = this.outValue("result");
    e.onChange = function () {
        t.set(parseFloat(e.get()))
    }
}, Ops.Value.Number.prototype = new CABLES.Op, CABLES.OPS["8fb2bb5d-665a-4d0a-8079-12710ae453be"] = {
    f: Ops.Value.Number,
    objName: "Ops.Value.Number"
}, Ops.Math.Divide = function () {
    CABLES.Op.apply(this, arguments);
    const e = this.inValueFloat("number1", 1),
        t = this.inValueFloat("number2", 1),
        n = this.outValue("result");

    function a() {
        n.set(e.get() / t.get())
    }
    e.onChange = t.onChange = a, a()
}, Ops.Math.Divide.prototype = new CABLES.Op, CABLES.OPS["86fcfd8c-038d-4b91-9820-a08114f6b7eb"] = {
    f: Ops.Math.Divide,
    objName: "Ops.Math.Divide"
}, Ops.Deprecated.Array.ContinuousNumberArray = function () {
    CABLES.Op.apply(this, arguments);
    var e = this.inValueInt("numValues"),
        t = this.addOutPort(new CABLES.Port(this, "values", CABLES.OP_PORT_TYPE_ARRAY));
    t.ignoreValueSerialize = !0, e.set(100), e.onChange = a;
    var n = [];

    function a() {
        n.length = Math.abs(Math.floor(e.get())) || 100;
        for (var a = 0; a < n.length; a++) n[a] = a;
        t.set(null), t.set(n)
    }
    a()
}, Ops.Deprecated.Array.ContinuousNumberArray.prototype = new CABLES.Op, CABLES.OPS["8b9cdeea-f94c-41dc-b743-627115289226"] = {
    f: Ops.Deprecated.Array.ContinuousNumberArray,
    objName: "Ops.Deprecated.Array.ContinuousNumberArray"
}, Ops.Math.MapRange = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = e.outValue("result");
    var n = e.inValueFloat("value"),
        a = e.inValueFloat("old min"),
        i = e.inValueFloat("old max"),
        r = e.inValueFloat("new min"),
        o = e.inValueFloat("new max"),
        s = e.inValueSelect("Easing", ["Linear", "Smoothstep", "Smootherstep"], "Linear");
    e.setPortGroup("Input Range", [a, i]), e.setPortGroup("Output Range", [r, o]);
    var l = 0,
        u = 0;

    function c() {
        if (n.get() >= Math.max(i.get(), a.get())) t.set(o.get());
        else if (n.get() <= Math.min(i.get(), a.get())) t.set(r.get());
        else {
            var e = r.get(),
                s = o.get(),
                c = a.get(),
                d = i.get(),
                h = n.get(),
                f = !1,
                b = Math.min(c, d),
                p = Math.max(c, d);
            b != c && (f = !0);
            var m = !1,
                g = Math.min(e, s),
                v = Math.max(e, s);
            g != e && (m = !0);
            var _ = 0;
            _ = f ? (p - h) * (v - g) / (p - b) : (h - b) * (v - g) / (p - b), u = m ? v - _ : _ + g, 0 === l ? t.set(u) : 1 == l ? (h = Math.max(0, Math.min(1, (u - e) / (s - e))), t.set(e + h * h * (3 - 2 * h) * (s - e))) : 2 == l && (h = Math.max(0, Math.min(1, (u - e) / (s - e))), t.set(e + h * h * h * (h * (6 * h - 15) + 10) * (s - e)))
        }
    }
    s.onChange = function () {
        l = "Smoothstep" == s.get() ? 1 : "Smootherstep" == s.get() ? 2 : 0
    }, n.set(0), a.set(0), i.set(1), r.set(-1), o.set(1), n.onChange = c, a.onChange = c, i.onChange = c, r.onChange = c, o.onChange = c, t.set(0), c()
}, Ops.Math.MapRange.prototype = new CABLES.Op, CABLES.OPS["2617b407-60a0-4ff6-b4a7-18136cfa7817"] = {
    f: Ops.Math.MapRange,
    objName: "Ops.Math.MapRange"
}, Ops.Gl.Matrix.Scale = function () {
    CABLES.Op.apply(this, arguments);
    const e = this.inTrigger("render"),
        t = this.inValueFloat("scale", 1),
        n = this.outTrigger("trigger"),
        a = this.patch.cgl,
        i = vec3.create();

    function r() {
        var e = t.get();
        vec3.set(i, e, e, e)
    }
    t.onChange = r, r(), e.onTriggered = function () {
        a.pushModelMatrix(), mat4.scale(a.mMatrix, a.mMatrix, i), n.trigger(), a.popModelMatrix()
    }
}, Ops.Gl.Matrix.Scale.prototype = new CABLES.Op, CABLES.OPS["50e7f565-0cdb-47ca-912b-87c04e2f00e3"] = {
    f: Ops.Gl.Matrix.Scale,
    objName: "Ops.Gl.Matrix.Scale"
}, Ops.Array.ArrayUnpack3 = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = e.inArray("Array in xyz"),
        n = e.outArray("Array 1 out"),
        a = e.outArray("Array 2 out"),
        i = e.outArray("Array 3 out"),
        r = e.outNumber("Array lengths");
    var o = !1;
    const s = [],
        l = [],
        u = [];
    t.onChange = function () {
        var c = t.get();
        if (!c) return void n.set(null);
        if (c.length % 3 != 0) return void(o || (e.uiAttr({
            error: "Arrays length not divisible by 3 !"
        }), r.set(0), o = !0));
        o && (o = !1, e.uiAttr({
            error: null
        }));
        s.length = Math.floor(c.length / 3), l.length = Math.floor(c.length / 3), u.length = Math.floor(c.length / 3);
        for (var d = 0; d < c.length / 3; d++) s[d] = c[3 * d], l[d] = c[3 * d + 1], u[d] = c[3 * d + 2];
        n.set(null), a.set(null), i.set(null), n.set(s), a.set(l), i.set(u), r.set(s.length)
    }
}, Ops.Array.ArrayUnpack3.prototype = new CABLES.Op, CABLES.OPS["fa671f66-6957-41e6-ac35-d615b7c29285"] = {
    f: Ops.Array.ArrayUnpack3,
    objName: "Ops.Array.ArrayUnpack3"
}, Ops.WebAudio.AudioAnalyzer = function () {
    CABLES.Op.apply(this, arguments);
    const e = this;
    var t = CABLES.WEBAUDIO.createAudioContext(e);
    const n = e.inSwitch("FFT size", [64, 128, 256, 512, 1024], 256),
        a = t.createAnalyser();
    a.smoothingTimeConstant = .3, a.fftSize = 256;
    const i = e.addInPort(new CABLES.Port(e, "refresh", CABLES.OP_PORT_TYPE_FUNCTION)),
        r = (CABLES.WEBAUDIO.createAudioInPort(e, "Audio In", a), e.inValueSelect("Data", ["Frequency", "Time Domain"], "Frequency")),
        o = e.outTrigger("Next"),
        s = (CABLES.WEBAUDIO.createAudioOutPort(e, "Audio Out", a), e.addOutPort(new CABLES.Port(e, "average volume", CABLES.OP_PORT_TYPE_VALUE))),
        l = e.addOutPort(new CABLES.Port(e, "fft", CABLES.OP_PORT_TYPE_ARRAY));
    var u = a.frequencyBinCount,
        c = new Uint8Array(u),
        d = !0;
    n.onChange = function () {
        a.fftSize = n.get()
    }, r.onChange = function () {
        "Frequency" == r.get() && (d = !0), "Time Domain" == r.get() && (d = !1)
    }, i.onTriggered = function () {
        if (a.minDecibels = -90, a.maxDecibels = 0, u != a.frequencyBinCount && (console.log("change!"), u = a.frequencyBinCount, c = new Uint8Array(u)), c) {
            for (var t = 0, n = 0; n < c.length; n++) t += c[n];
            var i = t / c.length;
            s.set(i / 128);
            try {
                d ? a.getByteFrequencyData(c) : a.getByteTimeDomainData(c)
            } catch (t) {
                e.log(t)
            }
            l.set(null), l.set(c), o.trigger()
        }
    }
}, Ops.WebAudio.AudioAnalyzer.prototype = new CABLES.Op, CABLES.OPS["22523fae-a623-401d-b952-a57c26de4b4e"] = {
    f: Ops.WebAudio.AudioAnalyzer,
    objName: "Ops.WebAudio.AudioAnalyzer"
}, Ops.WebAudio.Output = function () {
    CABLES.Op.apply(this, arguments);
    const e = this;
    e.requirements = [CABLES.Requirements.WEBAUDIO];
    var t = CABLES.WEBAUDIO.createAudioContext(e),
        n = 1,
        a = 0,
        i = 1,
        r = t.createGain(),
        o = t.destination;
    r.connect(o);
    var s = 1,
        l = (CABLES.WEBAUDIO.createAudioInPort(e, "Audio In", r), e.inValueSlider("Volume", n)),
        u = e.inValueBool("Mute", !1);

    function c() {
        var e = l.get() * s;
        e >= a && e <= i ? r.gain.setValueAtTime(e, t.currentTime) : r.gain.setValueAtTime(n * s, t.currentTime)
    }
    u.onChange = function () {
        u.get() ? r.gain.setValueAtTime(0, t.currentTime) : c()
    }, l.onChange = function () {
        u.get() || c()
    }, e.onMasterVolumeChanged = function (e) {
        s = e, c()
    }
}, Ops.WebAudio.Output.prototype = new CABLES.Op, CABLES.OPS["53fdbf4a-bc8d-4c5d-a698-f34fdeb53827"] = {
    f: Ops.WebAudio.Output,
    objName: "Ops.WebAudio.Output"
}, Ops.Sequence = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = [],
        n = [];

    function a() {
        for (var e = 0; e < n.length; e++) n[e].trigger()
    }
    e.inTrigger("exe").onTriggered = a;
    for (var i = 0; i < 16; i++)
        if (n.push(e.outTrigger("trigger " + i)), i < 15) {
            var r = e.inTrigger("exe " + i);
            r.onTriggered = a, t.push(r)
        }
}, Ops.Sequence.prototype = new CABLES.Op, CABLES.OPS["a466bc1f-06e9-4595-8849-bffb9fe22f99"] = {
    f: Ops.Sequence,
    objName: "Ops.Sequence"
}, Ops.Array.RandomNumbersArray3 = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = e.inValueInt("numValues", 100),
        n = e.inValueFloat("Min", -1),
        a = e.inValueFloat("Max", 1),
        i = e.inValueFloat("random seed"),
        r = e.inValueBool("Last == First"),
        o = e.inValueBool("Integer", !1),
        s = e.outArray("values"),
        l = e.outNumber("Total points"),
        u = e.outNumber("Array length");
    e.setPortGroup("Value Range", [n, a]), e.setPortGroup("", [i, r]), s.ignoreValueSerialize = !0, r.onChange = a.onChange = n.onChange = t.onChange = i.onChange = s.onLinkChanged = o.onChange = d;
    var c = [];

    function d() {
        Math.randomSeed = i.get();
        for (var e = o.get(), d = c.length = Math.floor(Math.abs(3 * t.get())), h = 0; h < d; h += 3) e ? (c[h + 0] = Math.floor(Math.seededRandom() * (a.get() - n.get()) + n.get()), c[h + 1] = Math.floor(Math.seededRandom() * (a.get() - n.get()) + n.get()), c[h + 2] = Math.floor(Math.seededRandom() * (a.get() - n.get()) + n.get())) : (c[h + 0] = Math.seededRandom() * (a.get() - n.get()) + n.get(), c[h + 1] = Math.seededRandom() * (a.get() - n.get()) + n.get(), c[h + 2] = Math.seededRandom() * (a.get() - n.get()) + n.get());
        r.get() && d > 3 && (c[d - 3 + 0] = c[0], c[d - 3 + 1] = c[1], c[d - 3 + 2] = c[2]), s.set(null), s.set(c), l.set(d / 3), u.set(d)
    }
    d()
}, Ops.Array.RandomNumbersArray3.prototype = new CABLES.Op, CABLES.OPS["7f981578-542e-417b-b304-8fbe41258772"] = {
    f: Ops.Array.RandomNumbersArray3,
    objName: "Ops.Array.RandomNumbersArray3"
}, Ops.Gl.Matrix.OrbitControls = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = e.inTrigger("render"),
        n = e.inValueFloat("min distance"),
        a = e.inValueFloat("max distance"),
        i = e.inValue("min rot y", 0),
        r = e.inValue("max rot y", 0),
        o = e.inValue("initial radius", 0),
        s = e.inValueSlider("initial axis y"),
        l = e.inValueSlider("initial axis x"),
        u = e.inValueFloat("mul"),
        c = e.inValueSlider("Smoothness", 1),
        d = e.inValue("Speed X", 1),
        h = e.inValue("Speed Y", 1),
        f = e.inValueBool("Active", !0),
        b = e.inValueBool("Allow Panning", !0),
        p = e.inValueBool("Allow Zooming", !0),
        m = e.inValueBool("Allow Rotation", !0),
        g = e.inValueBool("restricted", !0),
        v = e.inValueBool("Pointerlock", !1),
        _ = e.outTrigger("trigger"),
        O = e.outValue("radius"),
        I = e.outValue("Rot X"),
        A = e.outValue("Rot Y"),
        E = e.inTriggerButton("Reset");
    e.setPortGroup("Initial Values", [s, l, o]), e.setPortGroup("Interaction", [u, c, d, h]), e.setPortGroup("Boundaries", [i, r, n, a]), u.set(1), n.set(.05), a.set(99999), E.onTriggered = z;
    const M = e.patch.cgl;
    var T = vec3.create(),
        y = vec3.create(),
        x = vec3.create(),
        C = mat4.create(),
        S = (mat4.create(), vec3.create());
    vec3.create();
    s.set(.5);
    var P = !1,
        k = 5;
    O.set(k);
    var R = 0,
        N = 0,
        j = 0,
        L = 0;
    vec3.set(x, 0, 0, 0), vec3.set(y, 0, 1, 0);
    var B = vec3.create(),
        F = vec3.create(),
        w = vec3.create(),
        D = vec3.create(),
        U = 0,
        V = 0,
        H = 1,
        W = null;
    Y(), e.onDelete = le;
    var G = !1;

    function z() {
        U %= 2 * Math.PI, V %= 2 * Math.PI, vec3.set(S, 0, 0, 0), vec3.set(x, 0, 0, 0), vec3.set(y, 0, 1, 0), j = l.get() * Math.PI * 2, L = s.get() - .5, k = o.get(), T = Q(L)
    }

    function Y() {
        H = 10 * c.get() + 1
    }
    v.onChange = function () {
        G = v.get(), console.log("doLockPointer", G)
    }, c.onChange = Y;
    var X = !0;

    function q(e, t) {
        return X ? t : e + (t - e) / H
    }
    var K = 0;

    function Q(e) {
        const t = u.get();
        k < n.get() * t && (k = n.get() * t), k > a.get() * t && (k = a.get() * t), O.set(k * t);
        var i, r = vec3.create();
        return i = 360 * e / 2 * CGL.DEG2RAD, vec3.set(r, Math.cos(i) * k * t, Math.sin(i) * k * t, 0), r
    }

    function Z(e) {
        if (P) {
            var t = e.clientX,
                n = e.clientY,
                a = t - R,
                i = n - N;
            G && (a = e.movementX * u.get(), i = e.movementY * u.get()), a *= d.get(), i *= h.get(), 3 == e.which && b.get() ? (S[2] += .01 * a * u.get(), S[1] += .01 * i * u.get()) : 2 == e.which && p.get() ? (k += .05 * i, T = Q(L)) : m.get() && (j += .003 * a, L += .002 * i, g.get() && (L > .5 && (L = .5), L < -.5 && (L = -.5))), R = t, N = n
        }
    }

    function J(t) {
        if (R = t.clientX, N = t.clientY, P = !0, G) {
            var n = e.patch.cgl.canvas;
            n.requestPointerLock = n.requestPointerLock || n.mozRequestPointerLock || n.webkitRequestPointerLock, n.requestPointerLock ? n.requestPointerLock() : console.log("no t found"), document.addEventListener("pointerlockchange", ee, !1), document.addEventListener("mozpointerlockchange", ee, !1), document.addEventListener("webkitpointerlockchange", ee, !1)
        }
    }

    function $() {
        P = !1, G && (document.removeEventListener("pointerlockchange", ee, !1), document.removeEventListener("mozpointerlockchange", ee, !1), document.removeEventListener("webkitpointerlockchange", ee, !1), document.exitPointerLock && document.exitPointerLock(), document.removeEventListener("mousemove", v, !1))
    }

    function ee() {
        var t = e.patch.cgl.canvas;
        document.pointerLockElement !== t && document.mozPointerLockElement !== t && document.webkitPointerLockElement !== t || (document.addEventListener("mousemove", Z, !1), console.log("listening..."))
    }

    function te(e) {}
    t.onTriggered = function () {
        M.pushViewMatrix(), U = q(U, j);
        var e = 180 * ((V = q(V, L)) + .5);
        0 !== i.get() && e < i.get() ? (e = i.get(), V = K) : 0 !== r.get() && e > r.get() ? (e = r.get(), V = K) : K = V;
        var t = U * CGL.RAD2DEG;
        A.set(e), I.set(t),
            function (e, t) {
                const i = u.get();
                k < n.get() * i && (k = n.get() * i);
                k > a.get() * i && (k = a.get() * i);
                O.set(k * i);
                var r = 0;
                r = 360 * t / 2 * CGL.DEG2RAD, vec3.set(e, Math.cos(r) * k * i, Math.sin(r) * k * i, 0)
            }(T, V), vec3.add(B, T, S), vec3.add(w, x, S), F[0] = q(F[0], B[0]), F[1] = q(F[1], B[1]), F[2] = q(F[2], B[2]), D[0] = q(D[0], w[0]), D[1] = q(D[1], w[1]), D[2] = q(D[2], w[2]);
        vec3.create();
        mat4.lookAt(C, F, D, y), mat4.rotate(C, C, U, y), mat4.multiply(M.vMatrix, M.vMatrix, C), _.trigger(), M.popViewMatrix(), X = !1
    }, o.onChange = function () {
        k = o.get(), z()
    }, l.onChange = function () {
        U = j = l.get() * Math.PI * 2
    }, s.onChange = function () {
        V = L = s.get() - .5, T = Q(L)
    };
    var ne, ae = function (e) {
            if (p.get()) {
                var t = .06 * CGL.getWheelSpeed(e);
                k += 1.2 * parseFloat(t), T = Q(L), e.preventDefault()
            }
        },
        ie = function (e) {
            G = !1, e.touches && e.touches.length > 0 && J(e.touches[0])
        },
        re = function (e) {
            G = !1, $()
        },
        oe = function (e) {
            G = !1, e.touches && e.touches.length > 0 && Z(e.touches[0])
        };

    function se() {
        W.addEventListener("mousemove", Z), W.addEventListener("mousedown", J), W.addEventListener("mouseup", $), W.addEventListener("mouseleave", $), W.addEventListener("mouseenter", te), W.addEventListener("contextmenu", function (e) {
            e.preventDefault()
        }), W.addEventListener("wheel", ae), W.addEventListener("touchmove", oe), W.addEventListener("touchstart", ie), W.addEventListener("touchend", re)
    }

    function le() {
        W && (W.removeEventListener("mousemove", Z), W.removeEventListener("mousedown", J), W.removeEventListener("mouseup", $), W.removeEventListener("mouseleave", $), W.removeEventListener("mouseenter", $), W.removeEventListener("wheel", ae), W.removeEventListener("touchmove", oe), W.removeEventListener("touchstart", ie), W.removeEventListener("touchend", re))
    }
    f.onChange = function () {
        f.get() ? se() : le()
    }, T = Q(0), ne = M.canvas, le(), W = ne, se(), se(), l.set(.25), o.set(.05)
}, Ops.Gl.Matrix.OrbitControls.prototype = new CABLES.Op, CABLES.OPS["eaf4f7ce-08a3-4d1b-b9f4-ebc0b7b1cde1"] = {
    f: Ops.Gl.Matrix.OrbitControls,
    objName: "Ops.Gl.Matrix.OrbitControls"
}, Ops.Array.ArrayLength = function () {
    CABLES.Op.apply(this, arguments);
    const e = this.inArray("array"),
        t = this.outValue("length");
    t.ignoreValueSerialize = !0, e.onChange = function () {
        var n = 0;
        n = e.get() ? e.get().length : -1, t.set(n)
    }
}, Ops.Array.ArrayLength.prototype = new CABLES.Op, CABLES.OPS["ea508405-833d-411a-86b4-1a012c135c8a"] = {
    f: Ops.Array.ArrayLength,
    objName: "Ops.Array.ArrayLength"
}, Ops.Anim.Timer_v2 = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = e.inValue("Speed", 1),
        n = e.inValueBool("Play", !0),
        a = e.inTriggerButton("Reset"),
        i = e.inValueBool("Sync to timeline", !1),
        r = e.outValue("Time");
    e.setPortGroup("Controls", [n, a, t]);
    const o = new CABLES.Timer;
    var s = 0,
        l = 0,
        u = !1;

    function c() {
        n.get() ? (o.play(), e.patch.addOnAnimFrame(e)) : (o.pause(), e.patch.removeOnAnimFrame(e))
    }
    n.onChange = c, c(), a.onTriggered = function () {
        l = 0, s = 0, o.setTime(0), r.set(0)
    }, i.onChange = function () {
        u = i.get(), n.setUiAttribs({
            greyout: u
        }), a.setUiAttribs({
            greyout: u
        })
    }, e.onAnimFrame = function (e) {
        if (o.isPlaying())
            if (u) r.set(e * t.get());
            else {
                o.update();
                var n = o.get();
                if (0 === s) return void(s = n);
                const e = n - s;
                s = n, (l += e * t.get()) != l && (l = 0), r.set(l)
            }
    }
}, Ops.Anim.Timer_v2.prototype = new CABLES.Op, CABLES.OPS["aac7f721-208f-411a-adb3-79adae2e471a"] = {
    f: Ops.Anim.Timer_v2,
    objName: "Ops.Anim.Timer_v2"
}, Ops.Gl.MainLoop = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = e.inValue("FPS Limit", 0),
        n = e.outTrigger("trigger"),
        a = e.outValue("width"),
        i = e.outValue("height"),
        r = e.inValueBool("Reduce FPS loading"),
        o = e.inValueBool("Clear", !0),
        s = e.inValueBool("ClearAlpha", !0),
        l = e.inValueBool("Fullscreen Button", !1),
        u = e.inValueBool("Active", !0),
        c = e.inValueBool("Hires Displays", !1);
    e.onAnimFrame = v, c.onChange = function () {
        c.get() ? e.patch.cgl.pixelDensity = window.devicePixelRatio : e.patch.cgl.pixelDensity = 1, e.patch.cgl.updateSize(), CABLES.UI && gui.setLayout()
    }, u.onChange = function () {
        e.patch.removeOnAnimFrame(e), u.get() ? (e.setUiAttrib({
            extendTitle: ""
        }), e.onAnimFrame = v, e.patch.addOnAnimFrame(e), e.log("adding again!")) : e.setUiAttrib({
            extendTitle: "Inactive"
        })
    };
    var d = e.patch.cgl,
        h = 0,
        f = 0;
    e.patch.cgl || e.uiAttr({
        error: "No webgl cgl context"
    });
    var b = vec3.create();
    vec3.set(b, 0, 0, 0);
    var p = vec3.create();
    vec3.set(p, 0, 0, -2), l.onChange = g, setTimeout(g, 100);
    var m = null;

    function g() {
        function t() {
            m && (m.style.display = "block")
        }
        if (e.patch.cgl.canvas.addEventListener("mouseleave", function () {
                m && (m.style.display = "none")
            }), e.patch.cgl.canvas.addEventListener("mouseenter", t), l.get()) {
            if (!m) {
                m = document.createElement("div");
                var n = e.patch.cgl.canvas.parentElement;
                n && n.appendChild(m), m.addEventListener("mouseenter", t), m.addEventListener("click", function (e) {
                    CABLES.UI && !e.shiftKey ? gui.cycleRendererSize() : d.fullScreen()
                })
            }
            m.style.padding = "10px", m.style.position = "absolute", m.style.right = "5px", m.style.top = "5px", m.style.width = "20px", m.style.height = "20px", m.style.cursor = "pointer", m.style["border-radius"] = "40px", m.style.background = "#444", m.style["z-index"] = "9999", m.style.display = "none", m.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 490 490" style="width:20px;height:20px;" xml:space="preserve" width="512px" height="512px"><g><path d="M173.792,301.792L21.333,454.251v-80.917c0-5.891-4.776-10.667-10.667-10.667C4.776,362.667,0,367.442,0,373.333V480     c0,5.891,4.776,10.667,10.667,10.667h106.667c5.891,0,10.667-4.776,10.667-10.667s-4.776-10.667-10.667-10.667H36.416     l152.459-152.459c4.093-4.237,3.975-10.99-0.262-15.083C184.479,297.799,177.926,297.799,173.792,301.792z" fill="#FFFFFF"/><path d="M480,0H373.333c-5.891,0-10.667,4.776-10.667,10.667c0,5.891,4.776,10.667,10.667,10.667h80.917L301.792,173.792     c-4.237,4.093-4.354,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262c0.089-0.086,0.176-0.173,0.262-0.262     L469.333,36.416v80.917c0,5.891,4.776,10.667,10.667,10.667s10.667-4.776,10.667-10.667V10.667C490.667,4.776,485.891,0,480,0z" fill="#FFFFFF"/><path d="M36.416,21.333h80.917c5.891,0,10.667-4.776,10.667-10.667C128,4.776,123.224,0,117.333,0H10.667     C4.776,0,0,4.776,0,10.667v106.667C0,123.224,4.776,128,10.667,128c5.891,0,10.667-4.776,10.667-10.667V36.416l152.459,152.459     c4.237,4.093,10.99,3.975,15.083-0.262c3.992-4.134,3.992-10.687,0-14.82L36.416,21.333z" fill="#FFFFFF"/><path d="M480,362.667c-5.891,0-10.667,4.776-10.667,10.667v80.917L316.875,301.792c-4.237-4.093-10.99-3.976-15.083,0.261     c-3.993,4.134-3.993,10.688,0,14.821l152.459,152.459h-80.917c-5.891,0-10.667,4.776-10.667,10.667s4.776,10.667,10.667,10.667     H480c5.891,0,10.667-4.776,10.667-10.667V373.333C490.667,367.442,485.891,362.667,480,362.667z" fill="#FFFFFF"/></g></svg>'
        } else m && (m.style.display = "none", m.remove(), m = null)
    }

    function v(t) {
        u.get() && (d.aborted || 0 === d.canvas.clientWidth || 0 === d.canvas.clientHeight || (e.patch.loading.getProgress() < 1 && r.get() && (e.patch.config.fpsLimit = 5), -1 != d.canvasWidth ? (d.canvasWidth == a.get() && d.canvasHeight == i.get() || (a.set(d.canvasWidth), i.set(d.canvasHeight)), CABLES.now() - f > 1e3 && (CGL.fpsReport = CGL.fpsReport || [], e.patch.loading.getProgress() >= 1 && 0 !== f && CGL.fpsReport.push(h), h = 0, f = CABLES.now()), CGL.MESH.lastShader = null, CGL.MESH.lastMesh = null, d.renderStart(d, b, p), o.get() && (d.gl.clearColor(0, 0, 0, 1), d.gl.clear(d.gl.COLOR_BUFFER_BIT | d.gl.DEPTH_BUFFER_BIT)), n.trigger(), CGL.MESH.lastMesh && CGL.MESH.lastMesh.unBind(), CGL.Texture.previewTexture && (CGL.Texture.texturePreviewer || (CGL.Texture.texturePreviewer = new CGL.Texture.texturePreview(d)), CGL.Texture.texturePreviewer.render(CGL.Texture.previewTexture)), d.renderEnd(d), s.get() && (d.gl.clearColor(1, 1, 1, 1), d.gl.colorMask(!1, !1, !1, !0), d.gl.clear(d.gl.COLOR_BUFFER_BIT), d.gl.colorMask(!0, !0, !0, !0)), d.frameStore.phong || (d.frameStore.phong = {}), h++) : d.setCanvas(e.patch.config.glCanvasId)))
    }
    t.onChange = function () {
        e.patch.config.fpsLimit = t.get() || 0
    }, e.onDelete = function () {
        d.gl.clearColor(0, 0, 0, 0), d.gl.clear(d.gl.COLOR_BUFFER_BIT | d.gl.DEPTH_BUFFER_BIT)
    }, e.patch.loading.setOnFinishedLoading(function (n) {
        e.patch.config.fpsLimit = t.get()
    })
}, Ops.Gl.MainLoop.prototype = new CABLES.Op, CABLES.OPS["b0472a1d-db16-4ba6-8787-f300fbdc77bb"] = {
    f: Ops.Gl.MainLoop,
    objName: "Ops.Gl.MainLoop"
}, Ops.Gl.ClearColor = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = e.inTrigger("render"),
        n = e.outTrigger("trigger"),
        a = e.inFloatSlider("r", .1),
        i = e.inFloatSlider("g", .1),
        r = e.inFloatSlider("b", .1),
        o = e.inFloatSlider("a", 1);
    a.setUiAttribs({
        colorPick: !0
    });
    const s = e.patch.cgl;
    t.onTriggered = function () {
        s.gl.clearColor(a.get(), i.get(), r.get(), o.get()), s.gl.clear(s.gl.COLOR_BUFFER_BIT | s.gl.DEPTH_BUFFER_BIT), n.trigger()
    }
}, Ops.Gl.ClearColor.prototype = new CABLES.Op, CABLES.OPS["19b441eb-9f63-4f35-ba08-b87841517c4d"] = {
    f: Ops.Gl.ClearColor,
    objName: "Ops.Gl.ClearColor"
}, Ops.WebAudio.BiquadFilter = function () {
    CABLES.Op.apply(this, arguments);
    const e = this;
    this.name = "BiquadFilter";
    var t = CABLES.WEBAUDIO.createAudioContext(e),
        n = t.sampleRate / 2,
        a = t.createBiquadFilter(),
        i = (CABLES.WEBAUDIO.createAudioInPort(e, "Audio In", a), CABLES.WEBAUDIO.createAudioOutPort(e, "Audio Out", a), e.inValueSelect("type", ["allpass", "lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch"], "allpass")),
        r = e.inFloat("frequency", 1e3),
        o = e.inFloatSlider("detune", 0),
        s = e.inFloatSlider("q", 0),
        l = e.inFloatSlider("gain", .5),
        u = function () {
            a.type = i.get()
        };
    i.onChange = u, r.onChange = function () {
        var e = r.get();
        e && e >= 10 && e <= n && a.frequency.setValueAtTime(r.get(), window.audioContext.currentTime)
    }, o.onChange = function () {
        a.detune.setValueAtTime(o.get(), window.audioContext.currentTime)
    }, s.onChange = function () {
        a.Q.setValueAtTime(s.get(), window.audioContext.currentTime)
    }, l.onChange = function () {
        a.gain.setValueAtTime(l.get(), window.audioContext.currentTime)
    }, u()
}, Ops.WebAudio.BiquadFilter.prototype = new CABLES.Op, CABLES.OPS["3e28f86a-4f74-49a2-a1a6-f8943c00352d"] = {
    f: Ops.WebAudio.BiquadFilter,
    objName: "Ops.WebAudio.BiquadFilter"
}, Ops.Math.Math = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = e.inFloat("number 0", 0),
        n = e.inFloat("number 1", 0),
        a = e.inSwitch("math mode", ["+", "-", "*", "/", "%", "min", "max"], "+"),
        i = e.outNumber("result");
    t.onChange = n.onChange = a.onChange = function () {
        var r = a.get(),
            o = t.get(),
            s = n.get();
        e.setUiAttrib({
            extendTitle: r
        }), "+" === r ? i.set(o + s) : "-" === r ? i.set(o - s) : "*" === r ? i.set(o * s) : "/" === r ? i.set(o / s) : "%" === r ? i.set(o % s) : "min" === r ? i.set(Math.min(o, s)) : "max" === r && i.set(Math.max(o, s))
    }
}, Ops.Math.Math.prototype = new CABLES.Op, CABLES.OPS["e9fdcaca-a007-4563-8a4d-e94e08506e0f"] = {
    f: Ops.Math.Math,
    objName: "Ops.Math.Math"
}, Ops.User.l6n.GetSoundcloud = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = "6f693b837b47b59a17403e79bcff3626",
        n = e.inString("SoundCloud URL"),
        a = e.outValue("Stream URL"),
        i = e.outValue("Artwork URL"),
        r = e.outValue("Title");
    e.outObject("Result");
    a.ignoreValueSerialize = !0, i.ignoreValueSerialize = !0, a.ignoreValueSerialize = !0, r.ignoreValueSerialize = !0, n.onChange = function () {
        n.get() && CABLES.ajax("https://api.soundcloud.com/resolve.json?url=" + n.get() + "&client_id=" + t, function (e, n, o) {
            var s = JSON.parse(n);
            a.set(s.stream_url + "?client_id=" + t), i.set(s.artwork_url), r.set(s.title), console.log("stream url:" + s.stream_url), console.log(s)
        })
    }
}, Ops.User.l6n.GetSoundcloud.prototype = new CABLES.Op, Ops.Html.CSS_v2 = function () {
    CABLES.Op.apply(this, arguments);
    var e = this.inStringEditor("css code");
    e.setUiAttribs({
        editorSyntax: "css"
    });
    var t = null,
        n = "css_" + CABLES.uuid();

    function a() {
        return e.get()
    }

    function i() {
        (t = document.getElementById(n)) ? t.textContent = a(): ((t = document.createElement("style")).type = "text/css", t.id = n, t.textContent = a(), document.getElementsByTagName("body")[0].appendChild(t))
    }
    e.onChange = i, i(), this.onDelete = function () {
        (t = document.getElementById(n)) && t.remove()
    }
}, Ops.Html.CSS_v2.prototype = new CABLES.Op, CABLES.OPS["a56d3edd-06ad-44ed-9810-dbf714600c67"] = {
    f: Ops.Html.CSS_v2,
    objName: "Ops.Html.CSS_v2"
}, Ops.Html.BackgroundImage = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = e.inObject("Element"),
        n = e.inValueBool("active", !0),
        a = e.inFile("image file"),
        i = e.inValueSelect("Size", ["auto", "length", "cover", "contain", "initial", "inherit", "75%", "50%", "25%"], "auto"),
        r = e.inValueSelect("Repeat", ["no-repeat", "repeat", "repeat-x", "repeat-y"], "no-repeat"),
        o = e.inValueSelect("Position", ["left top", "left center", "left bottom", "right top", "right center", "right bottom", "center top", "center center", "center bottom"], "center center"),
        s = e.outObject("HTML Element");
    e.onLoadedValueSet = e.onLoaded = o.onChange = i.onChange = t.onChange = r.onChange = n.onChange = a.onChange = function e() {
        l = t.get();
        l && l.style && a.get() ? n.get() ? (l.style["background-image"] = "url(" + a.get() + ")", l.style["background-size"] = i.get(), l.style["background-position"] = o.get(), l.style["background-repeat"] = r.get()) : l.style["background-image"] = "none" : setTimeout(e, 100);
        s.set(t.get())
    };
    var l = null
}, Ops.Html.BackgroundImage.prototype = new CABLES.Op, CABLES.OPS["da3de45b-c252-4785-8558-7fadb199ea61"] = {
    f: Ops.Html.BackgroundImage,
    objName: "Ops.Html.BackgroundImage"
}, Ops.Time.DelayedTrigger = function () {
    CABLES.Op.apply(this, arguments);
    const e = this.inTrigger("exe"),
        t = this.inValueFloat("delay", 1),
        n = this.outTrigger("next");
    var a = null;
    e.onTriggered = function () {
        a && clearTimeout(a), a = setTimeout(function () {
            a = null, n.trigger()
        }, 1e3 * t.get())
    }
}, Ops.Time.DelayedTrigger.prototype = new CABLES.Op, CABLES.OPS["f4ff66b0-8500-46f7-9117-832aea0c2750"] = {
    f: Ops.Time.DelayedTrigger,
    objName: "Ops.Time.DelayedTrigger"
}, Ops.WebAudio.AudioBufferPlayer = function () {
    CABLES.Op.apply(this, arguments);
    const e = this;
    var t = CABLES.WEBAUDIO.createAudioContext(e),
        n = e.inObject("Audio Buffer"),
        a = e.inValueBool("Start / Stop", !1),
        i = e.inValue("Start Time", 0),
        r = e.inValue("Stop Time", 0),
        o = e.inValue("Offset", 0),
        s = e.inValueBool("Autoplay", !1),
        l = e.inValueBool("Loop", !1),
        u = e.inValue("Detune", 0),
        c = e.inValue("Playback Rate", 1),
        d = e.outObject("Audio Out"),
        h = null;

    function f() {
        if (h) {
            var e = u.get() || 0;
            h.detune && h.detune.setValueAtTime(e, t.currentTime)
        }
    }

    function b() {
        if (h) {
            var e = c.get() || 0;
            e >= h.playbackRate.minValue && e <= h.playbackRate.maxValue && h.playbackRate.setValueAtTime(e, t.currentTime)
        }
    }

    function p() {
        h && g(0), h = t.createBufferSource();
        var e = n.get();
        e && (h.buffer = e), h.onended = v, h.loop = l.get(), b(), f(), d.set(h)
    }

    function m(e) {
        try {
            h.start(e, o.get())
        } catch (e) {}
    }

    function g(e) {
        try {
            h.stop(e)
        } catch (e) {}
    }

    function v() {
        p()
    }
    n.onChange = function () {
        p(), (s.get() && n.get() || a.get() && n.get()) && m(i.get())
    }, a.onChange = function () {
        h && (a.get() ? m(i.get() || 0) : g(r.get() || 0))
    }, l.onChange = function () {
        h && (h.loop = !!l.get())
    }, u.onChange = f, c.onChange = b
}, Ops.WebAudio.AudioBufferPlayer.prototype = new CABLES.Op, CABLES.OPS["05385277-92fc-4d49-b730-11f9ed5e5c0d"] = {
    f: Ops.WebAudio.AudioBufferPlayer,
    objName: "Ops.WebAudio.AudioBufferPlayer"
}, Ops.WebAudio.AudioBuffer = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = (CABLES.WEBAUDIO.createAudioContext(e), e.inFile("URL", "audio")),
        n = e.outObject("Audio Buffer"),
        a = e.outValue("Finished Loading", !1),
        i = e.outValue("Sample Rate", 0),
        r = e.outValue("Length", 0),
        o = e.outValue("Duration", 0),
        s = e.outValue("Number of Channels", 0);

    function l(t) {
        r.set(t.length), o.set(t.duration), s.set(t.numberOfChannels), i.set(t.sampleRate), n.set(t), a.set(!0), e.log("AudioBuffer loaded: ", t)
    }

    function u(e) {
        console.error("Error: Loading audio file failed: ", e), r.set(0), o.set(0), s.set(0), i.set(0), n.set(0), a.set(!1)
    }
    t.onChange = function () {
        var n = e.patch.getFilePath(t.get());
        "string" == typeof n && n.length > 1 && CABLES.WEBAUDIO.loadAudioFile(e.patch, n, l, u)
    }
}, Ops.WebAudio.AudioBuffer.prototype = new CABLES.Op, CABLES.OPS["2cf4b0a1-b657-405b-8bf9-8555dbd5c231"] = {
    f: Ops.WebAudio.AudioBuffer,
    objName: "Ops.WebAudio.AudioBuffer"
}, Ops.Boolean.ToggleBool = function () {
    CABLES.Op.apply(this, arguments);
    const e = this.inTriggerButton("trigger"),
        t = this.inTriggerButton("reset"),
        n = this.outValue("result");
    var a = !1;
    n.set(a), n.ignoreValueSerialize = !0, e.onTriggered = function () {
        a = !a, n.set(a)
    }, t.onTriggered = function () {
        a = !1, n.set(a)
    }
}, Ops.Boolean.ToggleBool.prototype = new CABLES.Op, CABLES.OPS["712a25f4-3a93-4042-b8c5-2f56169186cc"] = {
    f: Ops.Boolean.ToggleBool,
    objName: "Ops.Boolean.ToggleBool"
}, Ops.Html.EventListener = function () {
    CABLES.Op.apply(this, arguments);
    const e = this;
    var t = null,
        n = [],
        a = [{
            name: "mousedown",
            displayName: "Mouse Down"
        }, {
            name: "mouseup",
            displayName: "Mouse Up"
        }, {
            name: "click",
            displayName: "Click"
        }, {
            name: "mousemove",
            displayName: "Mouse Move"
        }, {
            name: "touchstart",
            displayName: "Touch Start"
        }, {
            name: "touchmove",
            displayName: "Touch Move"
        }, {
            name: "touchend",
            displayName: "Touch End"
        }, {
            name: "touchcancel",
            displayName: "Touch Cancel"
        }];
    var i = e.inObject("Dom Element");
    i.onChange = function () {
        var e = i.get();
        t !== e && s(t);
        e && function (e) {
            if (!e) return;
            a.forEach(function (t) {
                u(e, t)
            })
        }(e);
        (function (e) {
            a.forEach(function (t) {
                t.togglePort.get() ? u(e, t) : l(e, t.name)
            })
        })(e), t = e
    };
    var r = e.outObject("Event Object");
    a.forEach(function (t) {
        t.port = e.outTrigger(t.displayName), t.handler = function (e) {
            return function (t) {
                r.set(t), o.set(t.type), t.preventDefault(), e.port.trigger()
            }
        }(t), t.togglePort = e.inValueBool(t.displayName + " Active", !0), t.togglePort.onChange = function (e) {
            return function (t, n) {
                n ? u(i.get(), e) : l(i.get(), e.name)
            }
        }(t)
    }), e.log(a);
    var o = e.outValue("Event Name");

    function s(e) {
        if (e)
            for (var t = n.length - 1; t >= 0; t--) l(e, n[t])
    }

    function l(e, t) {
        if (e && t && (r = t, (i = n) && i.indexOf(r) > -1)) {
            var i, r, o = n.indexOf(t);
            e.removeEventListener(t, function (e) {
                for (var t = 0; t < a.length; t++)
                    if (a[t].name == e) return a[t];
                return null
            }(t).handler), n.splice(o, 1)
        }
    }

    function u(e, t) {
        e && t && (n.indexOf(t.name) > -1 || t.togglePort.get() && (e.addEventListener(t.name, t.handler), n.push(t.name)))
    }
    e.onDelete = function () {
        s(t), s(i.get())
    }
}, Ops.Html.EventListener.prototype = new CABLES.Op, CABLES.OPS["73dc05e9-7b63-444b-980b-bd63f511b94a"] = {
    f: Ops.Html.EventListener,
    objName: "Ops.Html.EventListener"
}, Ops.Trigger.Threshold = function () {
    CABLES.Op.apply(this, arguments);
    const e = this.inValue("Input"),
        t = this.inValue("Threshold"),
        n = this.outTrigger("Output");
    var a = !1;
    e.onChange = function () {
        !a && e.get() >= t.get() ? (a = !0, n.trigger()) : a && e.get() <= t.get() && (a = !1)
    }
}, Ops.Trigger.Threshold.prototype = new CABLES.Op, CABLES.OPS["ef0891db-6053-42ba-b7d5-29c7cf6d8208"] = {
    f: Ops.Trigger.Threshold,
    objName: "Ops.Trigger.Threshold"
}, Ops.Html.ToggleClass = function () {
    CABLES.Op.apply(this, arguments);
    const e = this.inObject("HTML Element"),
        t = this.inString("Classname"),
        n = this.inValueBool("Active", !0);
    n.onChange = t.onChange = e.onChange = function () {
        var i = e.get(),
            r = t.get();
        if (!r || !i || !i.classList) return;
        a && i != a && a.classList.remove(r);
        n.get() ? i.classList.add(r) : i.classList.remove(r);
        a = i
    };
    var a = null
}, Ops.Html.ToggleClass.prototype = new CABLES.Op, CABLES.OPS["6dd90fb9-7f28-427f-acd8-589f21a906bb"] = {
    f: Ops.Html.ToggleClass,
    objName: "Ops.Html.ToggleClass"
}, Ops.Html.CSSFilter = function () {
    CABLES.Op.apply(this, arguments);
    const e = this.inObject("Element"),
        t = this.inValueSelect("method", ["-", "blur", "brightness", "contrast", "grayscale", "hue-rotate", "invert", "opacity", "saturate", "sepia"]),
        n = this.inValue("Value");
    var a = "";
    n.onChange = o, e.onChange = o;
    var i = null;

    function r() {
        return t.get() + "(" + n.get() + a + ")"
    }

    function o() {
        const n = e.get();
        var a = "";
        if (n && n.style) {
            n != i && (i = n);
            var o = !1,
                s = n.style.filter;
            if (s && s.length > 0) {
                for (var l = s.split(" "), u = 0; u < l.length; u++) 0 == l[u].indexOf(t.get()) && (o = !0, l[u] = r());
                a = l.join(" ")
            }
            o || (a += " " + r()), n.style.filter = a
        }
    }
    e.onLinkChanged = function () {
        if (e.isLinked()) return;
        const n = i;
        if (n && n.style) {
            var a = n.style.filter,
                r = "";
            if (a && a.length > 0) {
                r = "";
                for (var o = a.split(" "), s = 0; s < o.length; s++) 0 == o[s].indexOf(t.get()) && (o[s] = "");
                r = o.join(" ")
            }
            n.style.filter = r
        }
    }, t.onChange = function () {
        var e = t.get();
        t.get() + ":", "blur" == e && (a = "px"), "brightness" == e && (a = ""), "contrast" == e && (a = "%"), "grayscale" == e && (a = "%"), "hue-rotate" == e && (a = "deg"), "invert" == e && (a = "%"), "opacity" == e && (a = "%"), "saturate" == e && (a = ""), "sepia" == e && (a = "%"), o()
    }
}, Ops.Html.CSSFilter.prototype = new CABLES.Op, CABLES.OPS["33befabf-7eef-45f6-869f-30e0e4f44739"] = {
    f: Ops.Html.CSSFilter,
    objName: "Ops.Html.CSSFilter"
}, Ops.Html.DivElement_v2 = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = e.inString("Id"),
        n = e.inString("Class"),
        a = e.inString("Text", "Hello Div"),
        i = e.inValueEditor("Style", "position:absolute;z-index:9999;", "css"),
        r = e.inValueBool("Interactive", !1),
        o = e.inValueBool("Visible", !0),
        s = e.inValueBool("Convert Line Breaks", !1),
        l = e.outObject("DOM Element"),
        u = e.outValue("Hover"),
        c = e.outTrigger("Clicked");
    var d = null,
        h = document.createElement("div");
    e.patch.cgl.canvas.parentElement.appendChild(h), l.set(h), n.onChange = function () {
        h.setAttribute("class", n.get())
    }, s.onChange = a.onChange = m, i.onChange = g, r.onChange = function () {
        I(), r.get() && function () {
            d && I();
            (d = h) && (d.addEventListener("click", O), d.addEventListener("mouseleave", _), d.addEventListener("mouseenter", v))
        }()
    }, o.onChange = p, m(), g(), e.onDelete = function () {
        h.parentNode.removeChild(h)
    };
    var f = "block";

    function b(e) {
        e ? (h.style.visibility = "visible", h.style.display = f) : (h.style.visibility = "hidden", f = h.style.display || "block", h.style.display = "none"), console.log("div.style.display", h.style.display)
    }

    function p() {
        b(o.get())
    }

    function m() {
        var e = a.get();
        s.get() && (e = e.replace(/(?:\r\n|\r|\n)/g, "<br>")), h.innerHTML = e, l.set(null), l.set(h)
    }

    function g() {
        h.setAttribute("style", i.get()), p(), l.set(null), l.set(h)
    }

    function v() {
        u.set(!0)
    }

    function _() {
        u.set(!1)
    }

    function O() {
        c.trigger()
    }

    function I() {
        d && (d.removeEventListener("click", O), d.removeEventListener("mouseleave", _), d.removeEventListener("mouseenter", v), d = null)
    }
    t.onChange = function () {
        h.id = t.get()
    }, e.addEventListener("onEnabledChange", function (e) {
        b("visible" != h.style.visibility)
    })
}, Ops.Html.DivElement_v2.prototype = new CABLES.Op, CABLES.OPS["db36db6d-83e4-4d27-b84c-8a20067aaffc"] = {
    f: Ops.Html.DivElement_v2,
    objName: "Ops.Html.DivElement_v2"
}, Ops.User.l6n.TrueIf0 = function () {
    CABLES.Op.apply(this, arguments);
    const e = this.inValue("Value"),
        t = this.outValue("Result", !0);
    e.onChange = function () {
        t.set(0 == e.get())
    }
}, Ops.User.l6n.TrueIf0.prototype = new CABLES.Op, Ops.Math.Incrementor = function () {
    CABLES.Op.apply(this, arguments);
    const e = this;
    var t = e.inTriggerButton("Increment"),
        n = e.inTriggerButton("Decrement"),
        a = e.inValueInt("Length"),
        i = e.inTriggerButton("Reset"),
        r = e.inValueSelect("Mode", ["Rewind", "Stop at Max"]),
        o = e.outValue("Value"),
        s = e.outTrigger("Restarted");
    o.ignoreValueSerialize = !0, a.set(10);
    var l = 0;
    o.set(0), a.onTriggered = i, i.onTriggered = function () {
        o.set(null), l = 0, o.set(l), s.trigger()
    };
    var u = 0;
    r.onChange = function () {
        "Rewind" == r.get() && (u = 0), "Stop at Max" == r.get() && (u = 1)
    }, n.onTriggered = function () {
        l--, 0 == u && l < 0 && (l = a.get() - 1), 1 == u && l < 0 && (l = 0), o.set(l)
    }, t.onTriggered = function () {
        l++, 0 == u && l >= a.get() && (l = 0, s.trigger()), 1 == u && l >= a.get() && (l = a.get() - 1), o.set(l)
    }
}, Ops.Math.Incrementor.prototype = new CABLES.Op, CABLES.OPS["45cc0011-ada8-4423-8f5b-39a3810b8389"] = {
    f: Ops.Math.Incrementor,
    objName: "Ops.Math.Incrementor"
}, Ops.User.l6n.TrueIf1 = function () {
    CABLES.Op.apply(this, arguments);
    const e = this.inValue("Value"),
        t = this.outValue("Result", !0);
    e.onChange = function () {
        t.set(1 == e.get())
    }
}, Ops.User.l6n.TrueIf1.prototype = new CABLES.Op, Ops.User.l6n.TrueIf2 = function () {
    CABLES.Op.apply(this, arguments);
    const e = this.inValue("Value"),
        t = this.outValue("Result", !0);
    e.onChange = function () {
        t.set(2 == e.get())
    }
}, Ops.User.l6n.TrueIf2.prototype = new CABLES.Op, Ops.User.l6n.TrueIf3 = function () {
    CABLES.Op.apply(this, arguments);
    const e = this.inValue("Value"),
        t = this.outValue("Result", !0);
    e.onChange = function () {
        t.set(3 == e.get())
    }
}, Ops.User.l6n.TrueIf3.prototype = new CABLES.Op, Ops.Trigger.TriggerOnce = function () {
    CABLES.Op.apply(this, arguments);
    const e = this,
        t = e.inTriggerButton("Exec"),
        n = e.inTriggerButton("Reset"),
        a = e.outTrigger("Next");
    var i = e.outValue("Was Triggered"),
        r = !1;
    e.toWorkPortsNeedToBeLinked(t, a), n.onTriggered = function () {
        r = !1, i.set(r)
    }, t.onTriggered = function () {
        r || (r = !0, a.trigger(), i.set(r))
    }
}, Ops.Trigger.TriggerOnce.prototype = new CABLES.Op, CABLES.OPS["cf3544e4-e392-432b-89fd-fcfb5c974388"] = {
    f: Ops.Trigger.TriggerOnce,
    objName: "Ops.Trigger.TriggerOnce"
};