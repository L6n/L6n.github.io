var CABLES;
! function (t, e) {
    if ("object" == typeof exports && "object" == typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var n = e();
        for (var a in n)("object" == typeof exports ? exports : t)[a] = n[a]
    }
}(this, function () {
    return function (t) {
        function e(a) {
            if (n[a]) return n[a].exports;
            var i = n[a] = {
                exports: {},
                id: a,
                loaded: !1
            };
            return t[a].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports
        }
        var n = {};
        return e.m = t, e.c = n, e.p = "", e(0)
    }([function (t, e, n) {
        e.glMatrix = n(1), e.mat2 = n(2), e.mat2d = n(3), e.mat3 = n(4), e.mat4 = n(5), e.quat = n(6), e.vec2 = n(9), e.vec3 = n(7), e.vec4 = n(8)
    }, function (t, e) {
        var n = {
            EPSILON: 1e-6
        };
        n.ARRAY_TYPE = "undefined" != typeof Float32Array ? Float32Array : Array, n.RANDOM = Math.random, n.ENABLE_SIMD = !1, n.SIMD_AVAILABLE = n.ARRAY_TYPE === this.Float32Array && "SIMD" in this, n.USE_SIMD = n.ENABLE_SIMD && n.SIMD_AVAILABLE, n.setMatrixArrayType = function (t) {
            n.ARRAY_TYPE = t
        };
        var a = Math.PI / 180;
        n.toRadian = function (t) {
            return t * a
        }, n.equals = function (t, e) {
            return Math.abs(t - e) <= n.EPSILON * Math.max(1, Math.abs(t), Math.abs(e))
        }, t.exports = n
    }, function (t, e, n) {
        var a = n(1),
            i = {
                create: function () {
                    var t = new a.ARRAY_TYPE(4);
                    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t
                },
                clone: function (t) {
                    var e = new a.ARRAY_TYPE(4);
                    return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e
                },
                copy: function (t, e) {
                    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
                },
                identity: function (t) {
                    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t
                },
                fromValues: function (t, e, n, i) {
                    var r = new a.ARRAY_TYPE(4);
                    return r[0] = t, r[1] = e, r[2] = n, r[3] = i, r
                },
                set: function (t, e, n, a, i) {
                    return t[0] = e, t[1] = n, t[2] = a, t[3] = i, t
                },
                transpose: function (t, e) {
                    if (t === e) {
                        var n = e[1];
                        t[1] = e[2], t[2] = n
                    } else t[0] = e[0], t[1] = e[2], t[2] = e[1], t[3] = e[3];
                    return t
                },
                invert: function (t, e) {
                    var n = e[0],
                        a = e[1],
                        i = e[2],
                        r = e[3],
                        s = n * r - i * a;
                    return s ? (s = 1 / s, t[0] = r * s, t[1] = -a * s, t[2] = -i * s, t[3] = n * s, t) : null
                },
                adjoint: function (t, e) {
                    var n = e[0];
                    return t[0] = e[3], t[1] = -e[1], t[2] = -e[2], t[3] = n, t
                },
                determinant: function (t) {
                    return t[0] * t[3] - t[2] * t[1]
                },
                multiply: function (t, e, n) {
                    var a = e[0],
                        i = e[1],
                        r = e[2],
                        s = e[3],
                        o = n[0],
                        l = n[1],
                        u = n[2],
                        h = n[3];
                    return t[0] = a * o + r * l, t[1] = i * o + s * l, t[2] = a * u + r * h, t[3] = i * u + s * h, t
                }
            };
        i.mul = i.multiply, i.rotate = function (t, e, n) {
            var a = e[0],
                i = e[1],
                r = e[2],
                s = e[3],
                o = Math.sin(n),
                l = Math.cos(n);
            return t[0] = a * l + r * o, t[1] = i * l + s * o, t[2] = a * -o + r * l, t[3] = i * -o + s * l, t
        }, i.scale = function (t, e, n) {
            var a = e[0],
                i = e[1],
                r = e[2],
                s = e[3],
                o = n[0],
                l = n[1];
            return t[0] = a * o, t[1] = i * o, t[2] = r * l, t[3] = s * l, t
        }, i.fromRotation = function (t, e) {
            var n = Math.sin(e),
                a = Math.cos(e);
            return t[0] = a, t[1] = n, t[2] = -n, t[3] = a, t
        }, i.fromScaling = function (t, e) {
            return t[0] = e[0], t[1] = 0, t[2] = 0, t[3] = e[1], t
        }, i.str = function (t) {
            return "mat2(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")"
        }, i.frob = function (t) {
            return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2))
        }, i.LDU = function (t, e, n, a) {
            return t[2] = a[2] / a[0], n[0] = a[0], n[1] = a[1], n[3] = a[3] - t[2] * n[1], [t, e, n]
        }, i.add = function (t, e, n) {
            return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t[2] = e[2] + n[2], t[3] = e[3] + n[3], t
        }, i.subtract = function (t, e, n) {
            return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t[2] = e[2] - n[2], t[3] = e[3] - n[3], t
        }, i.sub = i.subtract, i.exactEquals = function (t, e) {
            return t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3]
        }, i.equals = function (t, e) {
            var n = t[0],
                i = t[1],
                r = t[2],
                s = t[3],
                o = e[0],
                l = e[1],
                u = e[2],
                h = e[3];
            return Math.abs(n - o) <= a.EPSILON * Math.max(1, Math.abs(n), Math.abs(o)) && Math.abs(i - l) <= a.EPSILON * Math.max(1, Math.abs(i), Math.abs(l)) && Math.abs(r - u) <= a.EPSILON * Math.max(1, Math.abs(r), Math.abs(u)) && Math.abs(s - h) <= a.EPSILON * Math.max(1, Math.abs(s), Math.abs(h))
        }, i.multiplyScalar = function (t, e, n) {
            return t[0] = e[0] * n, t[1] = e[1] * n, t[2] = e[2] * n, t[3] = e[3] * n, t
        }, i.multiplyScalarAndAdd = function (t, e, n, a) {
            return t[0] = e[0] + n[0] * a, t[1] = e[1] + n[1] * a, t[2] = e[2] + n[2] * a, t[3] = e[3] + n[3] * a, t
        }, t.exports = i
    }, function (t, e, n) {
        var a = n(1),
            i = {
                create: function () {
                    var t = new a.ARRAY_TYPE(6);
                    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t
                },
                clone: function (t) {
                    var e = new a.ARRAY_TYPE(6);
                    return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e
                },
                copy: function (t, e) {
                    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t
                },
                identity: function (t) {
                    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = 0, t[5] = 0, t
                },
                fromValues: function (t, e, n, i, r, s) {
                    var o = new a.ARRAY_TYPE(6);
                    return o[0] = t, o[1] = e, o[2] = n, o[3] = i, o[4] = r, o[5] = s, o
                },
                set: function (t, e, n, a, i, r, s) {
                    return t[0] = e, t[1] = n, t[2] = a, t[3] = i, t[4] = r, t[5] = s, t
                },
                invert: function (t, e) {
                    var n = e[0],
                        a = e[1],
                        i = e[2],
                        r = e[3],
                        s = e[4],
                        o = e[5],
                        l = n * r - a * i;
                    return l ? (l = 1 / l, t[0] = r * l, t[1] = -a * l, t[2] = -i * l, t[3] = n * l, t[4] = (i * o - r * s) * l, t[5] = (a * s - n * o) * l, t) : null
                },
                determinant: function (t) {
                    return t[0] * t[3] - t[1] * t[2]
                },
                multiply: function (t, e, n) {
                    var a = e[0],
                        i = e[1],
                        r = e[2],
                        s = e[3],
                        o = e[4],
                        l = e[5],
                        u = n[0],
                        h = n[1],
                        c = n[2],
                        d = n[3],
                        f = n[4],
                        p = n[5];
                    return t[0] = a * u + r * h, t[1] = i * u + s * h, t[2] = a * c + r * d, t[3] = i * c + s * d, t[4] = a * f + r * p + o, t[5] = i * f + s * p + l, t
                }
            };
        i.mul = i.multiply, i.rotate = function (t, e, n) {
            var a = e[0],
                i = e[1],
                r = e[2],
                s = e[3],
                o = e[4],
                l = e[5],
                u = Math.sin(n),
                h = Math.cos(n);
            return t[0] = a * h + r * u, t[1] = i * h + s * u, t[2] = a * -u + r * h, t[3] = i * -u + s * h, t[4] = o, t[5] = l, t
        }, i.scale = function (t, e, n) {
            var a = e[0],
                i = e[1],
                r = e[2],
                s = e[3],
                o = e[4],
                l = e[5],
                u = n[0],
                h = n[1];
            return t[0] = a * u, t[1] = i * u, t[2] = r * h, t[3] = s * h, t[4] = o, t[5] = l, t
        }, i.translate = function (t, e, n) {
            var a = e[0],
                i = e[1],
                r = e[2],
                s = e[3],
                o = e[4],
                l = e[5],
                u = n[0],
                h = n[1];
            return t[0] = a, t[1] = i, t[2] = r, t[3] = s, t[4] = a * u + r * h + o, t[5] = i * u + s * h + l, t
        }, i.fromRotation = function (t, e) {
            var n = Math.sin(e),
                a = Math.cos(e);
            return t[0] = a, t[1] = n, t[2] = -n, t[3] = a, t[4] = 0, t[5] = 0, t
        }, i.fromScaling = function (t, e) {
            return t[0] = e[0], t[1] = 0, t[2] = 0, t[3] = e[1], t[4] = 0, t[5] = 0, t
        }, i.fromTranslation = function (t, e) {
            return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t[4] = e[0], t[5] = e[1], t
        }, i.str = function (t) {
            return "mat2d(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ")"
        }, i.frob = function (t) {
            return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + 1)
        }, i.add = function (t, e, n) {
            return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t[2] = e[2] + n[2], t[3] = e[3] + n[3], t[4] = e[4] + n[4], t[5] = e[5] + n[5], t
        }, i.subtract = function (t, e, n) {
            return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t[2] = e[2] - n[2], t[3] = e[3] - n[3], t[4] = e[4] - n[4], t[5] = e[5] - n[5], t
        }, i.sub = i.subtract, i.multiplyScalar = function (t, e, n) {
            return t[0] = e[0] * n, t[1] = e[1] * n, t[2] = e[2] * n, t[3] = e[3] * n, t[4] = e[4] * n, t[5] = e[5] * n, t
        }, i.multiplyScalarAndAdd = function (t, e, n, a) {
            return t[0] = e[0] + n[0] * a, t[1] = e[1] + n[1] * a, t[2] = e[2] + n[2] * a, t[3] = e[3] + n[3] * a, t[4] = e[4] + n[4] * a, t[5] = e[5] + n[5] * a, t
        }, i.exactEquals = function (t, e) {
            return t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3] && t[4] === e[4] && t[5] === e[5]
        }, i.equals = function (t, e) {
            var n = t[0],
                i = t[1],
                r = t[2],
                s = t[3],
                o = t[4],
                l = t[5],
                u = e[0],
                h = e[1],
                c = e[2],
                d = e[3],
                f = e[4],
                p = e[5];
            return Math.abs(n - u) <= a.EPSILON * Math.max(1, Math.abs(n), Math.abs(u)) && Math.abs(i - h) <= a.EPSILON * Math.max(1, Math.abs(i), Math.abs(h)) && Math.abs(r - c) <= a.EPSILON * Math.max(1, Math.abs(r), Math.abs(c)) && Math.abs(s - d) <= a.EPSILON * Math.max(1, Math.abs(s), Math.abs(d)) && Math.abs(o - f) <= a.EPSILON * Math.max(1, Math.abs(o), Math.abs(f)) && Math.abs(l - p) <= a.EPSILON * Math.max(1, Math.abs(l), Math.abs(p))
        }, t.exports = i
    }, function (t, e, n) {
        var a = n(1),
            i = {
                create: function () {
                    var t = new a.ARRAY_TYPE(9);
                    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t
                },
                fromMat4: function (t, e) {
                    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[4], t[4] = e[5], t[5] = e[6], t[6] = e[8], t[7] = e[9], t[8] = e[10], t
                },
                clone: function (t) {
                    var e = new a.ARRAY_TYPE(9);
                    return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e
                },
                copy: function (t, e) {
                    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t
                },
                fromValues: function (t, e, n, i, r, s, o, l, u) {
                    var h = new a.ARRAY_TYPE(9);
                    return h[0] = t, h[1] = e, h[2] = n, h[3] = i, h[4] = r, h[5] = s, h[6] = o, h[7] = l, h[8] = u, h
                },
                set: function (t, e, n, a, i, r, s, o, l, u) {
                    return t[0] = e, t[1] = n, t[2] = a, t[3] = i, t[4] = r, t[5] = s, t[6] = o, t[7] = l, t[8] = u, t
                },
                identity: function (t) {
                    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t
                },
                transpose: function (t, e) {
                    if (t === e) {
                        var n = e[1],
                            a = e[2],
                            i = e[5];
                        t[1] = e[3], t[2] = e[6], t[3] = n, t[5] = e[7], t[6] = a, t[7] = i
                    } else t[0] = e[0], t[1] = e[3], t[2] = e[6], t[3] = e[1], t[4] = e[4], t[5] = e[7], t[6] = e[2], t[7] = e[5], t[8] = e[8];
                    return t
                },
                invert: function (t, e) {
                    var n = e[0],
                        a = e[1],
                        i = e[2],
                        r = e[3],
                        s = e[4],
                        o = e[5],
                        l = e[6],
                        u = e[7],
                        h = e[8],
                        c = h * s - o * u,
                        d = -h * r + o * l,
                        f = u * r - s * l,
                        p = n * c + a * d + i * f;
                    return p ? (p = 1 / p, t[0] = c * p, t[1] = (-h * a + i * u) * p, t[2] = (o * a - i * s) * p, t[3] = d * p, t[4] = (h * n - i * l) * p, t[5] = (-o * n + i * r) * p, t[6] = f * p, t[7] = (-u * n + a * l) * p, t[8] = (s * n - a * r) * p, t) : null
                },
                adjoint: function (t, e) {
                    var n = e[0],
                        a = e[1],
                        i = e[2],
                        r = e[3],
                        s = e[4],
                        o = e[5],
                        l = e[6],
                        u = e[7],
                        h = e[8];
                    return t[0] = s * h - o * u, t[1] = i * u - a * h, t[2] = a * o - i * s, t[3] = o * l - r * h, t[4] = n * h - i * l, t[5] = i * r - n * o, t[6] = r * u - s * l, t[7] = a * l - n * u, t[8] = n * s - a * r, t
                },
                determinant: function (t) {
                    var e = t[0],
                        n = t[1],
                        a = t[2],
                        i = t[3],
                        r = t[4],
                        s = t[5],
                        o = t[6],
                        l = t[7],
                        u = t[8];
                    return e * (u * r - s * l) + n * (-u * i + s * o) + a * (l * i - r * o)
                },
                multiply: function (t, e, n) {
                    var a = e[0],
                        i = e[1],
                        r = e[2],
                        s = e[3],
                        o = e[4],
                        l = e[5],
                        u = e[6],
                        h = e[7],
                        c = e[8],
                        d = n[0],
                        f = n[1],
                        p = n[2],
                        g = n[3],
                        m = n[4],
                        b = n[5],
                        _ = n[6],
                        v = n[7],
                        O = n[8];
                    return t[0] = d * a + f * s + p * u, t[1] = d * i + f * o + p * h, t[2] = d * r + f * l + p * c, t[3] = g * a + m * s + b * u, t[4] = g * i + m * o + b * h, t[5] = g * r + m * l + b * c, t[6] = _ * a + v * s + O * u, t[7] = _ * i + v * o + O * h, t[8] = _ * r + v * l + O * c, t
                }
            };
        i.mul = i.multiply, i.translate = function (t, e, n) {
            var a = e[0],
                i = e[1],
                r = e[2],
                s = e[3],
                o = e[4],
                l = e[5],
                u = e[6],
                h = e[7],
                c = e[8],
                d = n[0],
                f = n[1];
            return t[0] = a, t[1] = i, t[2] = r, t[3] = s, t[4] = o, t[5] = l, t[6] = d * a + f * s + u, t[7] = d * i + f * o + h, t[8] = d * r + f * l + c, t
        }, i.rotate = function (t, e, n) {
            var a = e[0],
                i = e[1],
                r = e[2],
                s = e[3],
                o = e[4],
                l = e[5],
                u = e[6],
                h = e[7],
                c = e[8],
                d = Math.sin(n),
                f = Math.cos(n);
            return t[0] = f * a + d * s, t[1] = f * i + d * o, t[2] = f * r + d * l, t[3] = f * s - d * a, t[4] = f * o - d * i, t[5] = f * l - d * r, t[6] = u, t[7] = h, t[8] = c, t
        }, i.scale = function (t, e, n) {
            var a = n[0],
                i = n[1];
            return t[0] = a * e[0], t[1] = a * e[1], t[2] = a * e[2], t[3] = i * e[3], t[4] = i * e[4], t[5] = i * e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t
        }, i.fromTranslation = function (t, e) {
            return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 1, t[5] = 0, t[6] = e[0], t[7] = e[1], t[8] = 1, t
        }, i.fromRotation = function (t, e) {
            var n = Math.sin(e),
                a = Math.cos(e);
            return t[0] = a, t[1] = n, t[2] = 0, t[3] = -n, t[4] = a, t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t
        }, i.fromScaling = function (t, e) {
            return t[0] = e[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = e[1], t[5] = 0, t[6] = 0, t[7] = 0, t[8] = 1, t
        }, i.fromMat2d = function (t, e) {
            return t[0] = e[0], t[1] = e[1], t[2] = 0, t[3] = e[2], t[4] = e[3], t[5] = 0, t[6] = e[4], t[7] = e[5], t[8] = 1, t
        }, i.fromQuat = function (t, e) {
            var n = e[0],
                a = e[1],
                i = e[2],
                r = e[3],
                s = n + n,
                o = a + a,
                l = i + i,
                u = n * s,
                h = a * s,
                c = a * o,
                d = i * s,
                f = i * o,
                p = i * l,
                g = r * s,
                m = r * o,
                b = r * l;
            return t[0] = 1 - c - p, t[3] = h - b, t[6] = d + m, t[1] = h + b, t[4] = 1 - u - p, t[7] = f - g, t[2] = d - m, t[5] = f + g, t[8] = 1 - u - c, t
        }, i.normalFromMat4 = function (t, e) {
            var n = e[0],
                a = e[1],
                i = e[2],
                r = e[3],
                s = e[4],
                o = e[5],
                l = e[6],
                u = e[7],
                h = e[8],
                c = e[9],
                d = e[10],
                f = e[11],
                p = e[12],
                g = e[13],
                m = e[14],
                b = e[15],
                _ = n * o - a * s,
                v = n * l - i * s,
                O = n * u - r * s,
                I = a * l - i * o,
                A = a * u - r * o,
                E = i * u - r * l,
                M = h * g - c * p,
                y = h * m - d * p,
                x = h * b - f * p,
                S = c * m - d * g,
                T = c * b - f * g,
                P = d * b - f * m,
                R = _ * P - v * T + O * S + I * x - A * y + E * M;
            return R ? (R = 1 / R, t[0] = (o * P - l * T + u * S) * R, t[1] = (l * x - s * P - u * y) * R, t[2] = (s * T - o * x + u * M) * R, t[3] = (i * T - a * P - r * S) * R, t[4] = (n * P - i * x + r * y) * R, t[5] = (a * x - n * T - r * M) * R, t[6] = (g * E - m * A + b * I) * R, t[7] = (m * O - p * E - b * v) * R, t[8] = (p * A - g * O + b * _) * R, t) : null
        }, i.str = function (t) {
            return "mat3(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ")"
        }, i.frob = function (t) {
            return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + Math.pow(t[6], 2) + Math.pow(t[7], 2) + Math.pow(t[8], 2))
        }, i.add = function (t, e, n) {
            return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t[2] = e[2] + n[2], t[3] = e[3] + n[3], t[4] = e[4] + n[4], t[5] = e[5] + n[5], t[6] = e[6] + n[6], t[7] = e[7] + n[7], t[8] = e[8] + n[8], t
        }, i.subtract = function (t, e, n) {
            return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t[2] = e[2] - n[2], t[3] = e[3] - n[3], t[4] = e[4] - n[4], t[5] = e[5] - n[5], t[6] = e[6] - n[6], t[7] = e[7] - n[7], t[8] = e[8] - n[8], t
        }, i.sub = i.subtract, i.multiplyScalar = function (t, e, n) {
            return t[0] = e[0] * n, t[1] = e[1] * n, t[2] = e[2] * n, t[3] = e[3] * n, t[4] = e[4] * n, t[5] = e[5] * n, t[6] = e[6] * n, t[7] = e[7] * n, t[8] = e[8] * n, t
        }, i.multiplyScalarAndAdd = function (t, e, n, a) {
            return t[0] = e[0] + n[0] * a, t[1] = e[1] + n[1] * a, t[2] = e[2] + n[2] * a, t[3] = e[3] + n[3] * a, t[4] = e[4] + n[4] * a, t[5] = e[5] + n[5] * a, t[6] = e[6] + n[6] * a, t[7] = e[7] + n[7] * a, t[8] = e[8] + n[8] * a, t
        }, i.exactEquals = function (t, e) {
            return t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3] && t[4] === e[4] && t[5] === e[5] && t[6] === e[6] && t[7] === e[7] && t[8] === e[8]
        }, i.equals = function (t, e) {
            var n = t[0],
                i = t[1],
                r = t[2],
                s = t[3],
                o = t[4],
                l = t[5],
                u = t[6],
                h = t[7],
                c = t[8],
                d = e[0],
                f = e[1],
                p = e[2],
                g = e[3],
                m = e[4],
                b = e[5],
                _ = t[6],
                v = e[7],
                O = e[8];
            return Math.abs(n - d) <= a.EPSILON * Math.max(1, Math.abs(n), Math.abs(d)) && Math.abs(i - f) <= a.EPSILON * Math.max(1, Math.abs(i), Math.abs(f)) && Math.abs(r - p) <= a.EPSILON * Math.max(1, Math.abs(r), Math.abs(p)) && Math.abs(s - g) <= a.EPSILON * Math.max(1, Math.abs(s), Math.abs(g)) && Math.abs(o - m) <= a.EPSILON * Math.max(1, Math.abs(o), Math.abs(m)) && Math.abs(l - b) <= a.EPSILON * Math.max(1, Math.abs(l), Math.abs(b)) && Math.abs(u - _) <= a.EPSILON * Math.max(1, Math.abs(u), Math.abs(_)) && Math.abs(h - v) <= a.EPSILON * Math.max(1, Math.abs(h), Math.abs(v)) && Math.abs(c - O) <= a.EPSILON * Math.max(1, Math.abs(c), Math.abs(O))
        }, t.exports = i
    }, function (t, e, n) {
        var a = n(1),
            i = {
                scalar: {},
                SIMD: {},
                create: function () {
                    var t = new a.ARRAY_TYPE(16);
                    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
                },
                clone: function (t) {
                    var e = new a.ARRAY_TYPE(16);
                    return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e
                },
                copy: function (t, e) {
                    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
                },
                fromValues: function (t, e, n, i, r, s, o, l, u, h, c, d, f, p, g, m) {
                    var b = new a.ARRAY_TYPE(16);
                    return b[0] = t, b[1] = e, b[2] = n, b[3] = i, b[4] = r, b[5] = s, b[6] = o, b[7] = l, b[8] = u, b[9] = h, b[10] = c, b[11] = d, b[12] = f, b[13] = p, b[14] = g, b[15] = m, b
                },
                set: function (t, e, n, a, i, r, s, o, l, u, h, c, d, f, p, g, m) {
                    return t[0] = e, t[1] = n, t[2] = a, t[3] = i, t[4] = r, t[5] = s, t[6] = o, t[7] = l, t[8] = u, t[9] = h, t[10] = c, t[11] = d, t[12] = f, t[13] = p, t[14] = g, t[15] = m, t
                },
                identity: function (t) {
                    return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
                }
            };
        i.scalar.transpose = function (t, e) {
            if (t === e) {
                var n = e[1],
                    a = e[2],
                    i = e[3],
                    r = e[6],
                    s = e[7],
                    o = e[11];
                t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = n, t[6] = e[9], t[7] = e[13], t[8] = a, t[9] = r, t[11] = e[14], t[12] = i, t[13] = s, t[14] = o
            } else t[0] = e[0], t[1] = e[4], t[2] = e[8], t[3] = e[12], t[4] = e[1], t[5] = e[5], t[6] = e[9], t[7] = e[13], t[8] = e[2], t[9] = e[6], t[10] = e[10], t[11] = e[14], t[12] = e[3], t[13] = e[7], t[14] = e[11], t[15] = e[15];
            return t
        }, i.SIMD.transpose = function (t, e) {
            var n, a, i, r, s, o, l, u, h, c;
            return n = SIMD.Float32x4.load(e, 0), a = SIMD.Float32x4.load(e, 4), i = SIMD.Float32x4.load(e, 8), r = SIMD.Float32x4.load(e, 12), s = SIMD.Float32x4.shuffle(n, a, 0, 1, 4, 5), o = SIMD.Float32x4.shuffle(i, r, 0, 1, 4, 5), l = SIMD.Float32x4.shuffle(s, o, 0, 2, 4, 6), u = SIMD.Float32x4.shuffle(s, o, 1, 3, 5, 7), SIMD.Float32x4.store(t, 0, l), SIMD.Float32x4.store(t, 4, u), s = SIMD.Float32x4.shuffle(n, a, 2, 3, 6, 7), o = SIMD.Float32x4.shuffle(i, r, 2, 3, 6, 7), h = SIMD.Float32x4.shuffle(s, o, 0, 2, 4, 6), c = SIMD.Float32x4.shuffle(s, o, 1, 3, 5, 7), SIMD.Float32x4.store(t, 8, h), SIMD.Float32x4.store(t, 12, c), t
        }, i.transpose = a.USE_SIMD ? i.SIMD.transpose : i.scalar.transpose, i.scalar.invert = function (t, e) {
            var n = e[0],
                a = e[1],
                i = e[2],
                r = e[3],
                s = e[4],
                o = e[5],
                l = e[6],
                u = e[7],
                h = e[8],
                c = e[9],
                d = e[10],
                f = e[11],
                p = e[12],
                g = e[13],
                m = e[14],
                b = e[15],
                _ = n * o - a * s,
                v = n * l - i * s,
                O = n * u - r * s,
                I = a * l - i * o,
                A = a * u - r * o,
                E = i * u - r * l,
                M = h * g - c * p,
                y = h * m - d * p,
                x = h * b - f * p,
                S = c * m - d * g,
                T = c * b - f * g,
                P = d * b - f * m,
                R = _ * P - v * T + O * S + I * x - A * y + E * M;
            return R ? (R = 1 / R, t[0] = (o * P - l * T + u * S) * R, t[1] = (i * T - a * P - r * S) * R, t[2] = (g * E - m * A + b * I) * R, t[3] = (d * A - c * E - f * I) * R, t[4] = (l * x - s * P - u * y) * R, t[5] = (n * P - i * x + r * y) * R, t[6] = (m * O - p * E - b * v) * R, t[7] = (h * E - d * O + f * v) * R, t[8] = (s * T - o * x + u * M) * R, t[9] = (a * x - n * T - r * M) * R, t[10] = (p * A - g * O + b * _) * R, t[11] = (c * O - h * A - f * _) * R, t[12] = (o * y - s * S - l * M) * R, t[13] = (n * S - a * y + i * M) * R, t[14] = (g * v - p * I - m * _) * R, t[15] = (h * I - c * v + d * _) * R, t) : null
        }, i.SIMD.invert = function (t, e) {
            var n, a, i, r, s, o, l, u, h, c, d = SIMD.Float32x4.load(e, 0),
                f = SIMD.Float32x4.load(e, 4),
                p = SIMD.Float32x4.load(e, 8),
                g = SIMD.Float32x4.load(e, 12);
            return s = SIMD.Float32x4.shuffle(d, f, 0, 1, 4, 5), a = SIMD.Float32x4.shuffle(p, g, 0, 1, 4, 5), n = SIMD.Float32x4.shuffle(s, a, 0, 2, 4, 6), a = SIMD.Float32x4.shuffle(a, s, 1, 3, 5, 7), s = SIMD.Float32x4.shuffle(d, f, 2, 3, 6, 7), r = SIMD.Float32x4.shuffle(p, g, 2, 3, 6, 7), i = SIMD.Float32x4.shuffle(s, r, 0, 2, 4, 6), r = SIMD.Float32x4.shuffle(r, s, 1, 3, 5, 7), s = SIMD.Float32x4.mul(i, r), s = SIMD.Float32x4.swizzle(s, 1, 0, 3, 2), o = SIMD.Float32x4.mul(a, s), l = SIMD.Float32x4.mul(n, s), s = SIMD.Float32x4.swizzle(s, 2, 3, 0, 1), o = SIMD.Float32x4.sub(SIMD.Float32x4.mul(a, s), o), l = SIMD.Float32x4.sub(SIMD.Float32x4.mul(n, s), l), l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1), s = SIMD.Float32x4.mul(a, i), s = SIMD.Float32x4.swizzle(s, 1, 0, 3, 2), o = SIMD.Float32x4.add(SIMD.Float32x4.mul(r, s), o), h = SIMD.Float32x4.mul(n, s), s = SIMD.Float32x4.swizzle(s, 2, 3, 0, 1), o = SIMD.Float32x4.sub(o, SIMD.Float32x4.mul(r, s)), h = SIMD.Float32x4.sub(SIMD.Float32x4.mul(n, s), h), h = SIMD.Float32x4.swizzle(h, 2, 3, 0, 1), s = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(a, 2, 3, 0, 1), r), s = SIMD.Float32x4.swizzle(s, 1, 0, 3, 2), i = SIMD.Float32x4.swizzle(i, 2, 3, 0, 1), o = SIMD.Float32x4.add(SIMD.Float32x4.mul(i, s), o), u = SIMD.Float32x4.mul(n, s), s = SIMD.Float32x4.swizzle(s, 2, 3, 0, 1), o = SIMD.Float32x4.sub(o, SIMD.Float32x4.mul(i, s)), u = SIMD.Float32x4.sub(SIMD.Float32x4.mul(n, s), u), u = SIMD.Float32x4.swizzle(u, 2, 3, 0, 1), s = SIMD.Float32x4.mul(n, a), s = SIMD.Float32x4.swizzle(s, 1, 0, 3, 2), u = SIMD.Float32x4.add(SIMD.Float32x4.mul(r, s), u), h = SIMD.Float32x4.sub(SIMD.Float32x4.mul(i, s), h), s = SIMD.Float32x4.swizzle(s, 2, 3, 0, 1), u = SIMD.Float32x4.sub(SIMD.Float32x4.mul(r, s), u), h = SIMD.Float32x4.sub(h, SIMD.Float32x4.mul(i, s)), s = SIMD.Float32x4.mul(n, r), s = SIMD.Float32x4.swizzle(s, 1, 0, 3, 2), l = SIMD.Float32x4.sub(l, SIMD.Float32x4.mul(i, s)), u = SIMD.Float32x4.add(SIMD.Float32x4.mul(a, s), u), s = SIMD.Float32x4.swizzle(s, 2, 3, 0, 1), l = SIMD.Float32x4.add(SIMD.Float32x4.mul(i, s), l), u = SIMD.Float32x4.sub(u, SIMD.Float32x4.mul(a, s)), s = SIMD.Float32x4.mul(n, i), s = SIMD.Float32x4.swizzle(s, 1, 0, 3, 2), l = SIMD.Float32x4.add(SIMD.Float32x4.mul(r, s), l), h = SIMD.Float32x4.sub(h, SIMD.Float32x4.mul(a, s)), s = SIMD.Float32x4.swizzle(s, 2, 3, 0, 1), l = SIMD.Float32x4.sub(l, SIMD.Float32x4.mul(r, s)), h = SIMD.Float32x4.add(SIMD.Float32x4.mul(a, s), h), c = SIMD.Float32x4.mul(n, o), c = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(c, 2, 3, 0, 1), c), c = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(c, 1, 0, 3, 2), c), s = SIMD.Float32x4.reciprocalApproximation(c), c = SIMD.Float32x4.sub(SIMD.Float32x4.add(s, s), SIMD.Float32x4.mul(c, SIMD.Float32x4.mul(s, s))), (c = SIMD.Float32x4.swizzle(c, 0, 0, 0, 0)) ? (SIMD.Float32x4.store(t, 0, SIMD.Float32x4.mul(c, o)), SIMD.Float32x4.store(t, 4, SIMD.Float32x4.mul(c, l)), SIMD.Float32x4.store(t, 8, SIMD.Float32x4.mul(c, u)), SIMD.Float32x4.store(t, 12, SIMD.Float32x4.mul(c, h)), t) : null
        }, i.invert = a.USE_SIMD ? i.SIMD.invert : i.scalar.invert, i.scalar.adjoint = function (t, e) {
            var n = e[0],
                a = e[1],
                i = e[2],
                r = e[3],
                s = e[4],
                o = e[5],
                l = e[6],
                u = e[7],
                h = e[8],
                c = e[9],
                d = e[10],
                f = e[11],
                p = e[12],
                g = e[13],
                m = e[14],
                b = e[15];
            return t[0] = o * (d * b - f * m) - c * (l * b - u * m) + g * (l * f - u * d), t[1] = -(a * (d * b - f * m) - c * (i * b - r * m) + g * (i * f - r * d)), t[2] = a * (l * b - u * m) - o * (i * b - r * m) + g * (i * u - r * l), t[3] = -(a * (l * f - u * d) - o * (i * f - r * d) + c * (i * u - r * l)), t[4] = -(s * (d * b - f * m) - h * (l * b - u * m) + p * (l * f - u * d)), t[5] = n * (d * b - f * m) - h * (i * b - r * m) + p * (i * f - r * d), t[6] = -(n * (l * b - u * m) - s * (i * b - r * m) + p * (i * u - r * l)), t[7] = n * (l * f - u * d) - s * (i * f - r * d) + h * (i * u - r * l), t[8] = s * (c * b - f * g) - h * (o * b - u * g) + p * (o * f - u * c), t[9] = -(n * (c * b - f * g) - h * (a * b - r * g) + p * (a * f - r * c)), t[10] = n * (o * b - u * g) - s * (a * b - r * g) + p * (a * u - r * o), t[11] = -(n * (o * f - u * c) - s * (a * f - r * c) + h * (a * u - r * o)), t[12] = -(s * (c * m - d * g) - h * (o * m - l * g) + p * (o * d - l * c)), t[13] = n * (c * m - d * g) - h * (a * m - i * g) + p * (a * d - i * c), t[14] = -(n * (o * m - l * g) - s * (a * m - i * g) + p * (a * l - i * o)), t[15] = n * (o * d - l * c) - s * (a * d - i * c) + h * (a * l - i * o), t
        }, i.SIMD.adjoint = function (t, e) {
            var n, a, i, r, s, o, l, u, h, c, d, f, p;
            return n = SIMD.Float32x4.load(e, 0), a = SIMD.Float32x4.load(e, 4), i = SIMD.Float32x4.load(e, 8), r = SIMD.Float32x4.load(e, 12), h = SIMD.Float32x4.shuffle(n, a, 0, 1, 4, 5), o = SIMD.Float32x4.shuffle(i, r, 0, 1, 4, 5), s = SIMD.Float32x4.shuffle(h, o, 0, 2, 4, 6), o = SIMD.Float32x4.shuffle(o, h, 1, 3, 5, 7), h = SIMD.Float32x4.shuffle(n, a, 2, 3, 6, 7), u = SIMD.Float32x4.shuffle(i, r, 2, 3, 6, 7), l = SIMD.Float32x4.shuffle(h, u, 0, 2, 4, 6), u = SIMD.Float32x4.shuffle(u, h, 1, 3, 5, 7), h = SIMD.Float32x4.mul(l, u), h = SIMD.Float32x4.swizzle(h, 1, 0, 3, 2), c = SIMD.Float32x4.mul(o, h), d = SIMD.Float32x4.mul(s, h), h = SIMD.Float32x4.swizzle(h, 2, 3, 0, 1), c = SIMD.Float32x4.sub(SIMD.Float32x4.mul(o, h), c), d = SIMD.Float32x4.sub(SIMD.Float32x4.mul(s, h), d), d = SIMD.Float32x4.swizzle(d, 2, 3, 0, 1), h = SIMD.Float32x4.mul(o, l), h = SIMD.Float32x4.swizzle(h, 1, 0, 3, 2), c = SIMD.Float32x4.add(SIMD.Float32x4.mul(u, h), c), p = SIMD.Float32x4.mul(s, h), h = SIMD.Float32x4.swizzle(h, 2, 3, 0, 1), c = SIMD.Float32x4.sub(c, SIMD.Float32x4.mul(u, h)), p = SIMD.Float32x4.sub(SIMD.Float32x4.mul(s, h), p), p = SIMD.Float32x4.swizzle(p, 2, 3, 0, 1), h = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(o, 2, 3, 0, 1), u), h = SIMD.Float32x4.swizzle(h, 1, 0, 3, 2), l = SIMD.Float32x4.swizzle(l, 2, 3, 0, 1), c = SIMD.Float32x4.add(SIMD.Float32x4.mul(l, h), c), f = SIMD.Float32x4.mul(s, h), h = SIMD.Float32x4.swizzle(h, 2, 3, 0, 1), c = SIMD.Float32x4.sub(c, SIMD.Float32x4.mul(l, h)), f = SIMD.Float32x4.sub(SIMD.Float32x4.mul(s, h), f), f = SIMD.Float32x4.swizzle(f, 2, 3, 0, 1), h = SIMD.Float32x4.mul(s, o), h = SIMD.Float32x4.swizzle(h, 1, 0, 3, 2), f = SIMD.Float32x4.add(SIMD.Float32x4.mul(u, h), f), p = SIMD.Float32x4.sub(SIMD.Float32x4.mul(l, h), p), h = SIMD.Float32x4.swizzle(h, 2, 3, 0, 1), f = SIMD.Float32x4.sub(SIMD.Float32x4.mul(u, h), f), p = SIMD.Float32x4.sub(p, SIMD.Float32x4.mul(l, h)), h = SIMD.Float32x4.mul(s, u), h = SIMD.Float32x4.swizzle(h, 1, 0, 3, 2), d = SIMD.Float32x4.sub(d, SIMD.Float32x4.mul(l, h)), f = SIMD.Float32x4.add(SIMD.Float32x4.mul(o, h), f), h = SIMD.Float32x4.swizzle(h, 2, 3, 0, 1), d = SIMD.Float32x4.add(SIMD.Float32x4.mul(l, h), d), f = SIMD.Float32x4.sub(f, SIMD.Float32x4.mul(o, h)), h = SIMD.Float32x4.mul(s, l), h = SIMD.Float32x4.swizzle(h, 1, 0, 3, 2), d = SIMD.Float32x4.add(SIMD.Float32x4.mul(u, h), d), p = SIMD.Float32x4.sub(p, SIMD.Float32x4.mul(o, h)), h = SIMD.Float32x4.swizzle(h, 2, 3, 0, 1), d = SIMD.Float32x4.sub(d, SIMD.Float32x4.mul(u, h)), p = SIMD.Float32x4.add(SIMD.Float32x4.mul(o, h), p), SIMD.Float32x4.store(t, 0, c), SIMD.Float32x4.store(t, 4, d), SIMD.Float32x4.store(t, 8, f), SIMD.Float32x4.store(t, 12, p), t
        }, i.adjoint = a.USE_SIMD ? i.SIMD.adjoint : i.scalar.adjoint, i.determinant = function (t) {
            var e = t[0],
                n = t[1],
                a = t[2],
                i = t[3],
                r = t[4],
                s = t[5],
                o = t[6],
                l = t[7],
                u = t[8],
                h = t[9],
                c = t[10],
                d = t[11],
                f = t[12],
                p = t[13],
                g = t[14],
                m = t[15];
            return (e * s - n * r) * (c * m - d * g) - (e * o - a * r) * (h * m - d * p) + (e * l - i * r) * (h * g - c * p) + (n * o - a * s) * (u * m - d * f) - (n * l - i * s) * (u * g - c * f) + (a * l - i * o) * (u * p - h * f)
        }, i.SIMD.multiply = function (t, e, n) {
            var a = SIMD.Float32x4.load(e, 0),
                i = SIMD.Float32x4.load(e, 4),
                r = SIMD.Float32x4.load(e, 8),
                s = SIMD.Float32x4.load(e, 12),
                o = SIMD.Float32x4.load(n, 0),
                l = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(o, 0, 0, 0, 0), a), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(o, 1, 1, 1, 1), i), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(o, 2, 2, 2, 2), r), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(o, 3, 3, 3, 3), s))));
            SIMD.Float32x4.store(t, 0, l);
            var u = SIMD.Float32x4.load(n, 4),
                h = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(u, 0, 0, 0, 0), a), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(u, 1, 1, 1, 1), i), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(u, 2, 2, 2, 2), r), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(u, 3, 3, 3, 3), s))));
            SIMD.Float32x4.store(t, 4, h);
            var c = SIMD.Float32x4.load(n, 8),
                d = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c, 0, 0, 0, 0), a), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c, 1, 1, 1, 1), i), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c, 2, 2, 2, 2), r), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(c, 3, 3, 3, 3), s))));
            SIMD.Float32x4.store(t, 8, d);
            var f = SIMD.Float32x4.load(n, 12),
                p = SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(f, 0, 0, 0, 0), a), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(f, 1, 1, 1, 1), i), SIMD.Float32x4.add(SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(f, 2, 2, 2, 2), r), SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(f, 3, 3, 3, 3), s))));
            return SIMD.Float32x4.store(t, 12, p), t
        }, i.scalar.multiply = function (t, e, n) {
            var a = e[0],
                i = e[1],
                r = e[2],
                s = e[3],
                o = e[4],
                l = e[5],
                u = e[6],
                h = e[7],
                c = e[8],
                d = e[9],
                f = e[10],
                p = e[11],
                g = e[12],
                m = e[13],
                b = e[14],
                _ = e[15],
                v = n[0],
                O = n[1],
                I = n[2],
                A = n[3];
            return t[0] = v * a + O * o + I * c + A * g, t[1] = v * i + O * l + I * d + A * m, t[2] = v * r + O * u + I * f + A * b, t[3] = v * s + O * h + I * p + A * _, v = n[4], O = n[5], I = n[6], A = n[7], t[4] = v * a + O * o + I * c + A * g, t[5] = v * i + O * l + I * d + A * m, t[6] = v * r + O * u + I * f + A * b, t[7] = v * s + O * h + I * p + A * _, v = n[8], O = n[9], I = n[10], A = n[11], t[8] = v * a + O * o + I * c + A * g, t[9] = v * i + O * l + I * d + A * m, t[10] = v * r + O * u + I * f + A * b, t[11] = v * s + O * h + I * p + A * _, v = n[12], O = n[13], I = n[14], A = n[15], t[12] = v * a + O * o + I * c + A * g, t[13] = v * i + O * l + I * d + A * m, t[14] = v * r + O * u + I * f + A * b, t[15] = v * s + O * h + I * p + A * _, t
        }, i.multiply = a.USE_SIMD ? i.SIMD.multiply : i.scalar.multiply, i.mul = i.multiply, i.scalar.translate = function (t, e, n) {
            var a, i, r, s, o, l, u, h, c, d, f, p, g = n[0],
                m = n[1],
                b = n[2];
            return e === t ? (t[12] = e[0] * g + e[4] * m + e[8] * b + e[12], t[13] = e[1] * g + e[5] * m + e[9] * b + e[13], t[14] = e[2] * g + e[6] * m + e[10] * b + e[14], t[15] = e[3] * g + e[7] * m + e[11] * b + e[15]) : (a = e[0], i = e[1], r = e[2], s = e[3], o = e[4], l = e[5], u = e[6], h = e[7], c = e[8], d = e[9], f = e[10], p = e[11], t[0] = a, t[1] = i, t[2] = r, t[3] = s, t[4] = o, t[5] = l, t[6] = u, t[7] = h, t[8] = c, t[9] = d, t[10] = f, t[11] = p, t[12] = a * g + o * m + c * b + e[12], t[13] = i * g + l * m + d * b + e[13], t[14] = r * g + u * m + f * b + e[14], t[15] = s * g + h * m + p * b + e[15]), t
        }, i.SIMD.translate = function (t, e, n) {
            var a = SIMD.Float32x4.load(e, 0),
                i = SIMD.Float32x4.load(e, 4),
                r = SIMD.Float32x4.load(e, 8),
                s = SIMD.Float32x4.load(e, 12),
                o = SIMD.Float32x4(n[0], n[1], n[2], 0);
            e !== t && (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11]), a = SIMD.Float32x4.mul(a, SIMD.Float32x4.swizzle(o, 0, 0, 0, 0)), i = SIMD.Float32x4.mul(i, SIMD.Float32x4.swizzle(o, 1, 1, 1, 1)), r = SIMD.Float32x4.mul(r, SIMD.Float32x4.swizzle(o, 2, 2, 2, 2));
            var l = SIMD.Float32x4.add(a, SIMD.Float32x4.add(i, SIMD.Float32x4.add(r, s)));
            return SIMD.Float32x4.store(t, 12, l), t
        }, i.translate = a.USE_SIMD ? i.SIMD.translate : i.scalar.translate, i.scalar.scale = function (t, e, n) {
            var a = n[0],
                i = n[1],
                r = n[2];
            return t[0] = e[0] * a, t[1] = e[1] * a, t[2] = e[2] * a, t[3] = e[3] * a, t[4] = e[4] * i, t[5] = e[5] * i, t[6] = e[6] * i, t[7] = e[7] * i, t[8] = e[8] * r, t[9] = e[9] * r, t[10] = e[10] * r, t[11] = e[11] * r, t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
        }, i.SIMD.scale = function (t, e, n) {
            var a, i, r, s = SIMD.Float32x4(n[0], n[1], n[2], 0);
            return a = SIMD.Float32x4.load(e, 0), SIMD.Float32x4.store(t, 0, SIMD.Float32x4.mul(a, SIMD.Float32x4.swizzle(s, 0, 0, 0, 0))), i = SIMD.Float32x4.load(e, 4), SIMD.Float32x4.store(t, 4, SIMD.Float32x4.mul(i, SIMD.Float32x4.swizzle(s, 1, 1, 1, 1))), r = SIMD.Float32x4.load(e, 8), SIMD.Float32x4.store(t, 8, SIMD.Float32x4.mul(r, SIMD.Float32x4.swizzle(s, 2, 2, 2, 2))), t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t
        }, i.scale = a.USE_SIMD ? i.SIMD.scale : i.scalar.scale, i.rotate = function (t, e, n, i) {
            var r, s, o, l, u, h, c, d, f, p, g, m, b, _, v, O, I, A, E, M, y, x, S, T, P = i[0],
                R = i[1],
                F = i[2],
                C = Math.sqrt(P * P + R * R + F * F);
            return Math.abs(C) < a.EPSILON ? null : (P *= C = 1 / C, R *= C, F *= C, r = Math.sin(n), o = 1 - (s = Math.cos(n)), l = e[0], u = e[1], h = e[2], c = e[3], d = e[4], f = e[5], p = e[6], g = e[7], m = e[8], b = e[9], _ = e[10], v = e[11], O = P * P * o + s, I = R * P * o + F * r, A = F * P * o - R * r, E = P * R * o - F * r, M = R * R * o + s, y = F * R * o + P * r, x = P * F * o + R * r, S = R * F * o - P * r, T = F * F * o + s, t[0] = l * O + d * I + m * A, t[1] = u * O + f * I + b * A, t[2] = h * O + p * I + _ * A, t[3] = c * O + g * I + v * A, t[4] = l * E + d * M + m * y, t[5] = u * E + f * M + b * y, t[6] = h * E + p * M + _ * y, t[7] = c * E + g * M + v * y, t[8] = l * x + d * S + m * T, t[9] = u * x + f * S + b * T, t[10] = h * x + p * S + _ * T, t[11] = c * x + g * S + v * T, e !== t && (t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t)
        }, i.scalar.rotateX = function (t, e, n) {
            var a = Math.sin(n),
                i = Math.cos(n),
                r = e[4],
                s = e[5],
                o = e[6],
                l = e[7],
                u = e[8],
                h = e[9],
                c = e[10],
                d = e[11];
            return e !== t && (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[4] = r * i + u * a, t[5] = s * i + h * a, t[6] = o * i + c * a, t[7] = l * i + d * a, t[8] = u * i - r * a, t[9] = h * i - s * a, t[10] = c * i - o * a, t[11] = d * i - l * a, t
        }, i.SIMD.rotateX = function (t, e, n) {
            var a = SIMD.Float32x4.splat(Math.sin(n)),
                i = SIMD.Float32x4.splat(Math.cos(n));
            e !== t && (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]);
            var r = SIMD.Float32x4.load(e, 4),
                s = SIMD.Float32x4.load(e, 8);
            return SIMD.Float32x4.store(t, 4, SIMD.Float32x4.add(SIMD.Float32x4.mul(r, i), SIMD.Float32x4.mul(s, a))), SIMD.Float32x4.store(t, 8, SIMD.Float32x4.sub(SIMD.Float32x4.mul(s, i), SIMD.Float32x4.mul(r, a))), t
        }, i.rotateX = a.USE_SIMD ? i.SIMD.rotateX : i.scalar.rotateX, i.scalar.rotateY = function (t, e, n) {
            var a = Math.sin(n),
                i = Math.cos(n),
                r = e[0],
                s = e[1],
                o = e[2],
                l = e[3],
                u = e[8],
                h = e[9],
                c = e[10],
                d = e[11];
            return e !== t && (t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[0] = r * i - u * a, t[1] = s * i - h * a, t[2] = o * i - c * a, t[3] = l * i - d * a, t[8] = r * a + u * i, t[9] = s * a + h * i, t[10] = o * a + c * i, t[11] = l * a + d * i, t
        }, i.SIMD.rotateY = function (t, e, n) {
            var a = SIMD.Float32x4.splat(Math.sin(n)),
                i = SIMD.Float32x4.splat(Math.cos(n));
            e !== t && (t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]);
            var r = SIMD.Float32x4.load(e, 0),
                s = SIMD.Float32x4.load(e, 8);
            return SIMD.Float32x4.store(t, 0, SIMD.Float32x4.sub(SIMD.Float32x4.mul(r, i), SIMD.Float32x4.mul(s, a))), SIMD.Float32x4.store(t, 8, SIMD.Float32x4.add(SIMD.Float32x4.mul(r, a), SIMD.Float32x4.mul(s, i))), t
        }, i.rotateY = a.USE_SIMD ? i.SIMD.rotateY : i.scalar.rotateY, i.scalar.rotateZ = function (t, e, n) {
            var a = Math.sin(n),
                i = Math.cos(n),
                r = e[0],
                s = e[1],
                o = e[2],
                l = e[3],
                u = e[4],
                h = e[5],
                c = e[6],
                d = e[7];
            return e !== t && (t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]), t[0] = r * i + u * a, t[1] = s * i + h * a, t[2] = o * i + c * a, t[3] = l * i + d * a, t[4] = u * i - r * a, t[5] = h * i - s * a, t[6] = c * i - o * a, t[7] = d * i - l * a, t
        }, i.SIMD.rotateZ = function (t, e, n) {
            var a = SIMD.Float32x4.splat(Math.sin(n)),
                i = SIMD.Float32x4.splat(Math.cos(n));
            e !== t && (t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]);
            var r = SIMD.Float32x4.load(e, 0),
                s = SIMD.Float32x4.load(e, 4);
            return SIMD.Float32x4.store(t, 0, SIMD.Float32x4.add(SIMD.Float32x4.mul(r, i), SIMD.Float32x4.mul(s, a))), SIMD.Float32x4.store(t, 4, SIMD.Float32x4.sub(SIMD.Float32x4.mul(s, i), SIMD.Float32x4.mul(r, a))), t
        }, i.rotateZ = a.USE_SIMD ? i.SIMD.rotateZ : i.scalar.rotateZ, i.fromTranslation = function (t, e) {
            return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = e[0], t[13] = e[1], t[14] = e[2], t[15] = 1, t
        }, i.fromScaling = function (t, e) {
            return t[0] = e[0], t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = e[1], t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = e[2], t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
        }, i.fromRotation = function (t, e, n) {
            var i, r, s, o = n[0],
                l = n[1],
                u = n[2],
                h = Math.sqrt(o * o + l * l + u * u);
            return Math.abs(h) < a.EPSILON ? null : (o *= h = 1 / h, l *= h, u *= h, i = Math.sin(e), s = 1 - (r = Math.cos(e)), t[0] = o * o * s + r, t[1] = l * o * s + u * i, t[2] = u * o * s - l * i, t[3] = 0, t[4] = o * l * s - u * i, t[5] = l * l * s + r, t[6] = u * l * s + o * i, t[7] = 0, t[8] = o * u * s + l * i, t[9] = l * u * s - o * i, t[10] = u * u * s + r, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t)
        }, i.fromXRotation = function (t, e) {
            var n = Math.sin(e),
                a = Math.cos(e);
            return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = a, t[6] = n, t[7] = 0, t[8] = 0, t[9] = -n, t[10] = a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
        }, i.fromYRotation = function (t, e) {
            var n = Math.sin(e),
                a = Math.cos(e);
            return t[0] = a, t[1] = 0, t[2] = -n, t[3] = 0, t[4] = 0, t[5] = 1, t[6] = 0, t[7] = 0, t[8] = n, t[9] = 0, t[10] = a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
        }, i.fromZRotation = function (t, e) {
            var n = Math.sin(e),
                a = Math.cos(e);
            return t[0] = a, t[1] = n, t[2] = 0, t[3] = 0, t[4] = -n, t[5] = a, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 1, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
        }, i.fromRotationTranslation = function (t, e, n) {
            var a = e[0],
                i = e[1],
                r = e[2],
                s = e[3],
                o = a + a,
                l = i + i,
                u = r + r,
                h = a * o,
                c = a * l,
                d = a * u,
                f = i * l,
                p = i * u,
                g = r * u,
                m = s * o,
                b = s * l,
                _ = s * u;
            return t[0] = 1 - (f + g), t[1] = c + _, t[2] = d - b, t[3] = 0, t[4] = c - _, t[5] = 1 - (h + g), t[6] = p + m, t[7] = 0, t[8] = d + b, t[9] = p - m, t[10] = 1 - (h + f), t[11] = 0, t[12] = n[0], t[13] = n[1], t[14] = n[2], t[15] = 1, t
        }, i.getTranslation = function (t, e) {
            return t[0] = e[12], t[1] = e[13], t[2] = e[14], t
        }, i.getRotation = function (t, e) {
            var n = e[0] + e[5] + e[10],
                a = 0;
            return n > 0 ? (a = 2 * Math.sqrt(n + 1), t[3] = .25 * a, t[0] = (e[6] - e[9]) / a, t[1] = (e[8] - e[2]) / a, t[2] = (e[1] - e[4]) / a) : e[0] > e[5] & e[0] > e[10] ? (a = 2 * Math.sqrt(1 + e[0] - e[5] - e[10]), t[3] = (e[6] - e[9]) / a, t[0] = .25 * a, t[1] = (e[1] + e[4]) / a, t[2] = (e[8] + e[2]) / a) : e[5] > e[10] ? (a = 2 * Math.sqrt(1 + e[5] - e[0] - e[10]), t[3] = (e[8] - e[2]) / a, t[0] = (e[1] + e[4]) / a, t[1] = .25 * a, t[2] = (e[6] + e[9]) / a) : (a = 2 * Math.sqrt(1 + e[10] - e[0] - e[5]), t[3] = (e[1] - e[4]) / a, t[0] = (e[8] + e[2]) / a, t[1] = (e[6] + e[9]) / a, t[2] = .25 * a), t
        }, i.fromRotationTranslationScale = function (t, e, n, a) {
            var i = e[0],
                r = e[1],
                s = e[2],
                o = e[3],
                l = i + i,
                u = r + r,
                h = s + s,
                c = i * l,
                d = i * u,
                f = i * h,
                p = r * u,
                g = r * h,
                m = s * h,
                b = o * l,
                _ = o * u,
                v = o * h,
                O = a[0],
                I = a[1],
                A = a[2];
            return t[0] = (1 - (p + m)) * O, t[1] = (d + v) * O, t[2] = (f - _) * O, t[3] = 0, t[4] = (d - v) * I, t[5] = (1 - (c + m)) * I, t[6] = (g + b) * I, t[7] = 0, t[8] = (f + _) * A, t[9] = (g - b) * A, t[10] = (1 - (c + p)) * A, t[11] = 0, t[12] = n[0], t[13] = n[1], t[14] = n[2], t[15] = 1, t
        }, i.fromRotationTranslationScaleOrigin = function (t, e, n, a, i) {
            var r = e[0],
                s = e[1],
                o = e[2],
                l = e[3],
                u = r + r,
                h = s + s,
                c = o + o,
                d = r * u,
                f = r * h,
                p = r * c,
                g = s * h,
                m = s * c,
                b = o * c,
                _ = l * u,
                v = l * h,
                O = l * c,
                I = a[0],
                A = a[1],
                E = a[2],
                M = i[0],
                y = i[1],
                x = i[2];
            return t[0] = (1 - (g + b)) * I, t[1] = (f + O) * I, t[2] = (p - v) * I, t[3] = 0, t[4] = (f - O) * A, t[5] = (1 - (d + b)) * A, t[6] = (m + _) * A, t[7] = 0, t[8] = (p + v) * E, t[9] = (m - _) * E, t[10] = (1 - (d + g)) * E, t[11] = 0, t[12] = n[0] + M - (t[0] * M + t[4] * y + t[8] * x), t[13] = n[1] + y - (t[1] * M + t[5] * y + t[9] * x), t[14] = n[2] + x - (t[2] * M + t[6] * y + t[10] * x), t[15] = 1, t
        }, i.fromQuat = function (t, e) {
            var n = e[0],
                a = e[1],
                i = e[2],
                r = e[3],
                s = n + n,
                o = a + a,
                l = i + i,
                u = n * s,
                h = a * s,
                c = a * o,
                d = i * s,
                f = i * o,
                p = i * l,
                g = r * s,
                m = r * o,
                b = r * l;
            return t[0] = 1 - c - p, t[1] = h + b, t[2] = d - m, t[3] = 0, t[4] = h - b, t[5] = 1 - u - p, t[6] = f + g, t[7] = 0, t[8] = d + m, t[9] = f - g, t[10] = 1 - u - c, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, t
        }, i.frustum = function (t, e, n, a, i, r, s) {
            var o = 1 / (n - e),
                l = 1 / (i - a),
                u = 1 / (r - s);
            return t[0] = 2 * r * o, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = 2 * r * l, t[6] = 0, t[7] = 0, t[8] = (n + e) * o, t[9] = (i + a) * l, t[10] = (s + r) * u, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = s * r * 2 * u, t[15] = 0, t
        }, i.perspective = function (t, e, n, a, i) {
            var r = 1 / Math.tan(e / 2),
                s = 1 / (a - i);
            return t[0] = r / n, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = r, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = (i + a) * s, t[11] = -1, t[12] = 0, t[13] = 0, t[14] = 2 * i * a * s, t[15] = 0, t
        }, i.perspectiveFromFieldOfView = function (t, e, n, a) {
            var i = Math.tan(e.upDegrees * Math.PI / 180),
                r = Math.tan(e.downDegrees * Math.PI / 180),
                s = Math.tan(e.leftDegrees * Math.PI / 180),
                o = Math.tan(e.rightDegrees * Math.PI / 180),
                l = 2 / (s + o),
                u = 2 / (i + r);
            return t[0] = l, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = u, t[6] = 0, t[7] = 0, t[8] = -(s - o) * l * .5, t[9] = (i - r) * u * .5, t[10] = a / (n - a), t[11] = -1, t[12] = 0, t[13] = 0, t[14] = a * n / (n - a), t[15] = 0, t
        }, i.ortho = function (t, e, n, a, i, r, s) {
            var o = 1 / (e - n),
                l = 1 / (a - i),
                u = 1 / (r - s);
            return t[0] = -2 * o, t[1] = 0, t[2] = 0, t[3] = 0, t[4] = 0, t[5] = -2 * l, t[6] = 0, t[7] = 0, t[8] = 0, t[9] = 0, t[10] = 2 * u, t[11] = 0, t[12] = (e + n) * o, t[13] = (i + a) * l, t[14] = (s + r) * u, t[15] = 1, t
        }, i.lookAt = function (t, e, n, r) {
            var s, o, l, u, h, c, d, f, p, g, m = e[0],
                b = e[1],
                _ = e[2],
                v = r[0],
                O = r[1],
                I = r[2],
                A = n[0],
                E = n[1],
                M = n[2];
            return Math.abs(m - A) < a.EPSILON && Math.abs(b - E) < a.EPSILON && Math.abs(_ - M) < a.EPSILON ? i.identity(t) : (d = m - A, f = b - E, p = _ - M, s = O * (p *= g = 1 / Math.sqrt(d * d + f * f + p * p)) - I * (f *= g), o = I * (d *= g) - v * p, l = v * f - O * d, (g = Math.sqrt(s * s + o * o + l * l)) ? (s *= g = 1 / g, o *= g, l *= g) : (s = 0, o = 0, l = 0), u = f * l - p * o, h = p * s - d * l, c = d * o - f * s, (g = Math.sqrt(u * u + h * h + c * c)) ? (u *= g = 1 / g, h *= g, c *= g) : (u = 0, h = 0, c = 0), t[0] = s, t[1] = u, t[2] = d, t[3] = 0, t[4] = o, t[5] = h, t[6] = f, t[7] = 0, t[8] = l, t[9] = c, t[10] = p, t[11] = 0, t[12] = -(s * m + o * b + l * _), t[13] = -(u * m + h * b + c * _), t[14] = -(d * m + f * b + p * _), t[15] = 1, t)
        }, i.str = function (t) {
            return "mat4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ", " + t[6] + ", " + t[7] + ", " + t[8] + ", " + t[9] + ", " + t[10] + ", " + t[11] + ", " + t[12] + ", " + t[13] + ", " + t[14] + ", " + t[15] + ")"
        }, i.frob = function (t) {
            return Math.sqrt(Math.pow(t[0], 2) + Math.pow(t[1], 2) + Math.pow(t[2], 2) + Math.pow(t[3], 2) + Math.pow(t[4], 2) + Math.pow(t[5], 2) + Math.pow(t[6], 2) + Math.pow(t[7], 2) + Math.pow(t[8], 2) + Math.pow(t[9], 2) + Math.pow(t[10], 2) + Math.pow(t[11], 2) + Math.pow(t[12], 2) + Math.pow(t[13], 2) + Math.pow(t[14], 2) + Math.pow(t[15], 2))
        }, i.add = function (t, e, n) {
            return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t[2] = e[2] + n[2], t[3] = e[3] + n[3], t[4] = e[4] + n[4], t[5] = e[5] + n[5], t[6] = e[6] + n[6], t[7] = e[7] + n[7], t[8] = e[8] + n[8], t[9] = e[9] + n[9], t[10] = e[10] + n[10], t[11] = e[11] + n[11], t[12] = e[12] + n[12], t[13] = e[13] + n[13], t[14] = e[14] + n[14], t[15] = e[15] + n[15], t
        }, i.subtract = function (t, e, n) {
            return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t[2] = e[2] - n[2], t[3] = e[3] - n[3], t[4] = e[4] - n[4], t[5] = e[5] - n[5], t[6] = e[6] - n[6], t[7] = e[7] - n[7], t[8] = e[8] - n[8], t[9] = e[9] - n[9], t[10] = e[10] - n[10], t[11] = e[11] - n[11], t[12] = e[12] - n[12], t[13] = e[13] - n[13], t[14] = e[14] - n[14], t[15] = e[15] - n[15], t
        }, i.sub = i.subtract, i.multiplyScalar = function (t, e, n) {
            return t[0] = e[0] * n, t[1] = e[1] * n, t[2] = e[2] * n, t[3] = e[3] * n, t[4] = e[4] * n, t[5] = e[5] * n, t[6] = e[6] * n, t[7] = e[7] * n, t[8] = e[8] * n, t[9] = e[9] * n, t[10] = e[10] * n, t[11] = e[11] * n, t[12] = e[12] * n, t[13] = e[13] * n, t[14] = e[14] * n, t[15] = e[15] * n, t
        }, i.multiplyScalarAndAdd = function (t, e, n, a) {
            return t[0] = e[0] + n[0] * a, t[1] = e[1] + n[1] * a, t[2] = e[2] + n[2] * a, t[3] = e[3] + n[3] * a, t[4] = e[4] + n[4] * a, t[5] = e[5] + n[5] * a, t[6] = e[6] + n[6] * a, t[7] = e[7] + n[7] * a, t[8] = e[8] + n[8] * a, t[9] = e[9] + n[9] * a, t[10] = e[10] + n[10] * a, t[11] = e[11] + n[11] * a, t[12] = e[12] + n[12] * a, t[13] = e[13] + n[13] * a, t[14] = e[14] + n[14] * a, t[15] = e[15] + n[15] * a, t
        }, i.exactEquals = function (t, e) {
            return t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3] && t[4] === e[4] && t[5] === e[5] && t[6] === e[6] && t[7] === e[7] && t[8] === e[8] && t[9] === e[9] && t[10] === e[10] && t[11] === e[11] && t[12] === e[12] && t[13] === e[13] && t[14] === e[14] && t[15] === e[15]
        }, i.equals = function (t, e) {
            var n = t[0],
                i = t[1],
                r = t[2],
                s = t[3],
                o = t[4],
                l = t[5],
                u = t[6],
                h = t[7],
                c = t[8],
                d = t[9],
                f = t[10],
                p = t[11],
                g = t[12],
                m = t[13],
                b = t[14],
                _ = t[15],
                v = e[0],
                O = e[1],
                I = e[2],
                A = e[3],
                E = e[4],
                M = e[5],
                y = e[6],
                x = e[7],
                S = e[8],
                T = e[9],
                P = e[10],
                R = e[11],
                F = e[12],
                C = e[13],
                N = e[14],
                L = e[15];
            return Math.abs(n - v) <= a.EPSILON * Math.max(1, Math.abs(n), Math.abs(v)) && Math.abs(i - O) <= a.EPSILON * Math.max(1, Math.abs(i), Math.abs(O)) && Math.abs(r - I) <= a.EPSILON * Math.max(1, Math.abs(r), Math.abs(I)) && Math.abs(s - A) <= a.EPSILON * Math.max(1, Math.abs(s), Math.abs(A)) && Math.abs(o - E) <= a.EPSILON * Math.max(1, Math.abs(o), Math.abs(E)) && Math.abs(l - M) <= a.EPSILON * Math.max(1, Math.abs(l), Math.abs(M)) && Math.abs(u - y) <= a.EPSILON * Math.max(1, Math.abs(u), Math.abs(y)) && Math.abs(h - x) <= a.EPSILON * Math.max(1, Math.abs(h), Math.abs(x)) && Math.abs(c - S) <= a.EPSILON * Math.max(1, Math.abs(c), Math.abs(S)) && Math.abs(d - T) <= a.EPSILON * Math.max(1, Math.abs(d), Math.abs(T)) && Math.abs(f - P) <= a.EPSILON * Math.max(1, Math.abs(f), Math.abs(P)) && Math.abs(p - R) <= a.EPSILON * Math.max(1, Math.abs(p), Math.abs(R)) && Math.abs(g - F) <= a.EPSILON * Math.max(1, Math.abs(g), Math.abs(F)) && Math.abs(m - C) <= a.EPSILON * Math.max(1, Math.abs(m), Math.abs(C)) && Math.abs(b - N) <= a.EPSILON * Math.max(1, Math.abs(b), Math.abs(N)) && Math.abs(_ - L) <= a.EPSILON * Math.max(1, Math.abs(_), Math.abs(L))
        }, t.exports = i
    }, function (t, e, n) {
        var a = n(1),
            i = n(4),
            r = n(7),
            s = n(8),
            o = {
                create: function () {
                    var t = new a.ARRAY_TYPE(4);
                    return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t
                }
            };
        o.rotationTo = function () {
            var t = r.create(),
                e = r.fromValues(1, 0, 0),
                n = r.fromValues(0, 1, 0);
            return function (a, i, s) {
                var l = r.dot(i, s);
                return -.999999 > l ? (r.cross(t, e, i), r.length(t) < 1e-6 && r.cross(t, n, i), r.normalize(t, t), o.setAxisAngle(a, t, Math.PI), a) : l > .999999 ? (a[0] = 0, a[1] = 0, a[2] = 0, a[3] = 1, a) : (r.cross(t, i, s), a[0] = t[0], a[1] = t[1], a[2] = t[2], a[3] = 1 + l, o.normalize(a, a))
            }
        }(), o.setAxes = function () {
            var t = i.create();
            return function (e, n, a, i) {
                return t[0] = a[0], t[3] = a[1], t[6] = a[2], t[1] = i[0], t[4] = i[1], t[7] = i[2], t[2] = -n[0], t[5] = -n[1], t[8] = -n[2], o.normalize(e, o.fromMat3(e, t))
            }
        }(), o.clone = s.clone, o.fromValues = s.fromValues, o.copy = s.copy, o.set = s.set, o.identity = function (t) {
            return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 1, t
        }, o.setAxisAngle = function (t, e, n) {
            n *= .5;
            var a = Math.sin(n);
            return t[0] = a * e[0], t[1] = a * e[1], t[2] = a * e[2], t[3] = Math.cos(n), t
        }, o.getAxisAngle = function (t, e) {
            var n = 2 * Math.acos(e[3]),
                a = Math.sin(n / 2);
            return 0 != a ? (t[0] = e[0] / a, t[1] = e[1] / a, t[2] = e[2] / a) : (t[0] = 1, t[1] = 0, t[2] = 0), n
        }, o.add = s.add, o.multiply = function (t, e, n) {
            var a = e[0],
                i = e[1],
                r = e[2],
                s = e[3],
                o = n[0],
                l = n[1],
                u = n[2],
                h = n[3];
            return t[0] = a * h + s * o + i * u - r * l, t[1] = i * h + s * l + r * o - a * u, t[2] = r * h + s * u + a * l - i * o, t[3] = s * h - a * o - i * l - r * u, t
        }, o.mul = o.multiply, o.scale = s.scale, o.rotateX = function (t, e, n) {
            n *= .5;
            var a = e[0],
                i = e[1],
                r = e[2],
                s = e[3],
                o = Math.sin(n),
                l = Math.cos(n);
            return t[0] = a * l + s * o, t[1] = i * l + r * o, t[2] = r * l - i * o, t[3] = s * l - a * o, t
        }, o.rotateY = function (t, e, n) {
            n *= .5;
            var a = e[0],
                i = e[1],
                r = e[2],
                s = e[3],
                o = Math.sin(n),
                l = Math.cos(n);
            return t[0] = a * l - r * o, t[1] = i * l + s * o, t[2] = r * l + a * o, t[3] = s * l - i * o, t
        }, o.rotateZ = function (t, e, n) {
            n *= .5;
            var a = e[0],
                i = e[1],
                r = e[2],
                s = e[3],
                o = Math.sin(n),
                l = Math.cos(n);
            return t[0] = a * l + i * o, t[1] = i * l - a * o, t[2] = r * l + s * o, t[3] = s * l - r * o, t
        }, o.calculateW = function (t, e) {
            var n = e[0],
                a = e[1],
                i = e[2];
            return t[0] = n, t[1] = a, t[2] = i, t[3] = Math.sqrt(Math.abs(1 - n * n - a * a - i * i)), t
        }, o.dot = s.dot, o.lerp = s.lerp, o.slerp = function (t, e, n, a) {
            var i, r, s, o, l, u = e[0],
                h = e[1],
                c = e[2],
                d = e[3],
                f = n[0],
                p = n[1],
                g = n[2],
                m = n[3];
            return 0 > (r = u * f + h * p + c * g + d * m) && (r = -r, f = -f, p = -p, g = -g, m = -m), 1 - r > 1e-6 ? (i = Math.acos(r), s = Math.sin(i), o = Math.sin((1 - a) * i) / s, l = Math.sin(a * i) / s) : (o = 1 - a, l = a), t[0] = o * u + l * f, t[1] = o * h + l * p, t[2] = o * c + l * g, t[3] = o * d + l * m, t
        }, o.sqlerp = function () {
            var t = o.create(),
                e = o.create();
            return function (n, a, i, r, s, l) {
                return o.slerp(t, a, s, l), o.slerp(e, i, r, l), o.slerp(n, t, e, 2 * l * (1 - l)), n
            }
        }(), o.invert = function (t, e) {
            var n = e[0],
                a = e[1],
                i = e[2],
                r = e[3],
                s = n * n + a * a + i * i + r * r,
                o = s ? 1 / s : 0;
            return t[0] = -n * o, t[1] = -a * o, t[2] = -i * o, t[3] = r * o, t
        }, o.conjugate = function (t, e) {
            return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = e[3], t
        }, o.length = s.length, o.len = o.length, o.squaredLength = s.squaredLength, o.sqrLen = o.squaredLength, o.normalize = s.normalize, o.fromMat3 = function (t, e) {
            var n, a = e[0] + e[4] + e[8];
            if (a > 0) n = Math.sqrt(a + 1), t[3] = .5 * n, n = .5 / n, t[0] = (e[5] - e[7]) * n, t[1] = (e[6] - e[2]) * n, t[2] = (e[1] - e[3]) * n;
            else {
                var i = 0;
                e[4] > e[0] && (i = 1), e[8] > e[3 * i + i] && (i = 2);
                var r = (i + 1) % 3,
                    s = (i + 2) % 3;
                n = Math.sqrt(e[3 * i + i] - e[3 * r + r] - e[3 * s + s] + 1), t[i] = .5 * n, n = .5 / n, t[3] = (e[3 * r + s] - e[3 * s + r]) * n, t[r] = (e[3 * r + i] + e[3 * i + r]) * n, t[s] = (e[3 * s + i] + e[3 * i + s]) * n
            }
            return t
        }, o.str = function (t) {
            return "quat(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")"
        }, o.exactEquals = s.exactEquals, o.equals = s.equals, t.exports = o
    }, function (t, e, n) {
        var a = n(1),
            i = {
                create: function () {
                    var t = new a.ARRAY_TYPE(3);
                    return t[0] = 0, t[1] = 0, t[2] = 0, t
                },
                clone: function (t) {
                    var e = new a.ARRAY_TYPE(3);
                    return e[0] = t[0], e[1] = t[1], e[2] = t[2], e
                },
                fromValues: function (t, e, n) {
                    var i = new a.ARRAY_TYPE(3);
                    return i[0] = t, i[1] = e, i[2] = n, i
                },
                copy: function (t, e) {
                    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t
                },
                set: function (t, e, n, a) {
                    return t[0] = e, t[1] = n, t[2] = a, t
                },
                add: function (t, e, n) {
                    return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t[2] = e[2] + n[2], t
                },
                subtract: function (t, e, n) {
                    return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t[2] = e[2] - n[2], t
                }
            };
        i.sub = i.subtract, i.multiply = function (t, e, n) {
            return t[0] = e[0] * n[0], t[1] = e[1] * n[1], t[2] = e[2] * n[2], t
        }, i.mul = i.multiply, i.divide = function (t, e, n) {
            return t[0] = e[0] / n[0], t[1] = e[1] / n[1], t[2] = e[2] / n[2], t
        }, i.div = i.divide, i.ceil = function (t, e) {
            return t[0] = Math.ceil(e[0]), t[1] = Math.ceil(e[1]), t[2] = Math.ceil(e[2]), t
        }, i.floor = function (t, e) {
            return t[0] = Math.floor(e[0]), t[1] = Math.floor(e[1]), t[2] = Math.floor(e[2]), t
        }, i.min = function (t, e, n) {
            return t[0] = Math.min(e[0], n[0]), t[1] = Math.min(e[1], n[1]), t[2] = Math.min(e[2], n[2]), t
        }, i.max = function (t, e, n) {
            return t[0] = Math.max(e[0], n[0]), t[1] = Math.max(e[1], n[1]), t[2] = Math.max(e[2], n[2]), t
        }, i.round = function (t, e) {
            return t[0] = Math.round(e[0]), t[1] = Math.round(e[1]), t[2] = Math.round(e[2]), t
        }, i.scale = function (t, e, n) {
            return t[0] = e[0] * n, t[1] = e[1] * n, t[2] = e[2] * n, t
        }, i.scaleAndAdd = function (t, e, n, a) {
            return t[0] = e[0] + n[0] * a, t[1] = e[1] + n[1] * a, t[2] = e[2] + n[2] * a, t
        }, i.distance = function (t, e) {
            var n = e[0] - t[0],
                a = e[1] - t[1],
                i = e[2] - t[2];
            return Math.sqrt(n * n + a * a + i * i)
        }, i.dist = i.distance, i.squaredDistance = function (t, e) {
            var n = e[0] - t[0],
                a = e[1] - t[1],
                i = e[2] - t[2];
            return n * n + a * a + i * i
        }, i.sqrDist = i.squaredDistance, i.length = function (t) {
            var e = t[0],
                n = t[1],
                a = t[2];
            return Math.sqrt(e * e + n * n + a * a)
        }, i.len = i.length, i.squaredLength = function (t) {
            var e = t[0],
                n = t[1],
                a = t[2];
            return e * e + n * n + a * a
        }, i.sqrLen = i.squaredLength, i.negate = function (t, e) {
            return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t
        }, i.inverse = function (t, e) {
            return t[0] = 1 / e[0], t[1] = 1 / e[1], t[2] = 1 / e[2], t
        }, i.normalize = function (t, e) {
            var n = e[0],
                a = e[1],
                i = e[2],
                r = n * n + a * a + i * i;
            return r > 0 && (r = 1 / Math.sqrt(r), t[0] = e[0] * r, t[1] = e[1] * r, t[2] = e[2] * r), t
        }, i.dot = function (t, e) {
            return t[0] * e[0] + t[1] * e[1] + t[2] * e[2]
        }, i.cross = function (t, e, n) {
            var a = e[0],
                i = e[1],
                r = e[2],
                s = n[0],
                o = n[1],
                l = n[2];
            return t[0] = i * l - r * o, t[1] = r * s - a * l, t[2] = a * o - i * s, t
        }, i.lerp = function (t, e, n, a) {
            var i = e[0],
                r = e[1],
                s = e[2];
            return t[0] = i + a * (n[0] - i), t[1] = r + a * (n[1] - r), t[2] = s + a * (n[2] - s), t
        }, i.hermite = function (t, e, n, a, i, r) {
            var s = r * r,
                o = s * (2 * r - 3) + 1,
                l = s * (r - 2) + r,
                u = s * (r - 1),
                h = s * (3 - 2 * r);
            return t[0] = e[0] * o + n[0] * l + a[0] * u + i[0] * h, t[1] = e[1] * o + n[1] * l + a[1] * u + i[1] * h, t[2] = e[2] * o + n[2] * l + a[2] * u + i[2] * h, t
        }, i.bezier = function (t, e, n, a, i, r) {
            var s = 1 - r,
                o = s * s,
                l = r * r,
                u = o * s,
                h = 3 * r * o,
                c = 3 * l * s,
                d = l * r;
            return t[0] = e[0] * u + n[0] * h + a[0] * c + i[0] * d, t[1] = e[1] * u + n[1] * h + a[1] * c + i[1] * d, t[2] = e[2] * u + n[2] * h + a[2] * c + i[2] * d, t
        }, i.random = function (t, e) {
            e = e || 1;
            var n = 2 * a.RANDOM() * Math.PI,
                i = 2 * a.RANDOM() - 1,
                r = Math.sqrt(1 - i * i) * e;
            return t[0] = Math.cos(n) * r, t[1] = Math.sin(n) * r, t[2] = i * e, t
        }, i.transformMat4 = function (t, e, n) {
            var a = e[0],
                i = e[1],
                r = e[2],
                s = n[3] * a + n[7] * i + n[11] * r + n[15];
            return s = s || 1, t[0] = (n[0] * a + n[4] * i + n[8] * r + n[12]) / s, t[1] = (n[1] * a + n[5] * i + n[9] * r + n[13]) / s, t[2] = (n[2] * a + n[6] * i + n[10] * r + n[14]) / s, t
        }, i.transformMat3 = function (t, e, n) {
            var a = e[0],
                i = e[1],
                r = e[2];
            return t[0] = a * n[0] + i * n[3] + r * n[6], t[1] = a * n[1] + i * n[4] + r * n[7], t[2] = a * n[2] + i * n[5] + r * n[8], t
        }, i.transformQuat = function (t, e, n) {
            var a = e[0],
                i = e[1],
                r = e[2],
                s = n[0],
                o = n[1],
                l = n[2],
                u = n[3],
                h = u * a + o * r - l * i,
                c = u * i + l * a - s * r,
                d = u * r + s * i - o * a,
                f = -s * a - o * i - l * r;
            return t[0] = h * u + f * -s + c * -l - d * -o, t[1] = c * u + f * -o + d * -s - h * -l, t[2] = d * u + f * -l + h * -o - c * -s, t
        }, i.rotateX = function (t, e, n, a) {
            var i = [],
                r = [];
            return i[0] = e[0] - n[0], i[1] = e[1] - n[1], i[2] = e[2] - n[2], r[0] = i[0], r[1] = i[1] * Math.cos(a) - i[2] * Math.sin(a), r[2] = i[1] * Math.sin(a) + i[2] * Math.cos(a), t[0] = r[0] + n[0], t[1] = r[1] + n[1], t[2] = r[2] + n[2], t
        }, i.rotateY = function (t, e, n, a) {
            var i = [],
                r = [];
            return i[0] = e[0] - n[0], i[1] = e[1] - n[1], i[2] = e[2] - n[2], r[0] = i[2] * Math.sin(a) + i[0] * Math.cos(a), r[1] = i[1], r[2] = i[2] * Math.cos(a) - i[0] * Math.sin(a), t[0] = r[0] + n[0], t[1] = r[1] + n[1], t[2] = r[2] + n[2], t
        }, i.rotateZ = function (t, e, n, a) {
            var i = [],
                r = [];
            return i[0] = e[0] - n[0], i[1] = e[1] - n[1], i[2] = e[2] - n[2], r[0] = i[0] * Math.cos(a) - i[1] * Math.sin(a), r[1] = i[0] * Math.sin(a) + i[1] * Math.cos(a), r[2] = i[2], t[0] = r[0] + n[0], t[1] = r[1] + n[1], t[2] = r[2] + n[2], t
        }, i.forEach = function () {
            var t = i.create();
            return function (e, n, a, i, r, s) {
                var o, l;
                for (n || (n = 3), a || (a = 0), l = i ? Math.min(i * n + a, e.length) : e.length, o = a; l > o; o += n) t[0] = e[o], t[1] = e[o + 1], t[2] = e[o + 2], r(t, t, s), e[o] = t[0], e[o + 1] = t[1], e[o + 2] = t[2];
                return e
            }
        }(), i.angle = function (t, e) {
            var n = i.fromValues(t[0], t[1], t[2]),
                a = i.fromValues(e[0], e[1], e[2]);
            i.normalize(n, n), i.normalize(a, a);
            var r = i.dot(n, a);
            return r > 1 ? 0 : Math.acos(r)
        }, i.str = function (t) {
            return "vec3(" + t[0] + ", " + t[1] + ", " + t[2] + ")"
        }, i.exactEquals = function (t, e) {
            return t[0] === e[0] && t[1] === e[1] && t[2] === e[2]
        }, i.equals = function (t, e) {
            var n = t[0],
                i = t[1],
                r = t[2],
                s = e[0],
                o = e[1],
                l = e[2];
            return Math.abs(n - s) <= a.EPSILON * Math.max(1, Math.abs(n), Math.abs(s)) && Math.abs(i - o) <= a.EPSILON * Math.max(1, Math.abs(i), Math.abs(o)) && Math.abs(r - l) <= a.EPSILON * Math.max(1, Math.abs(r), Math.abs(l))
        }, t.exports = i
    }, function (t, e, n) {
        var a = n(1),
            i = {
                create: function () {
                    var t = new a.ARRAY_TYPE(4);
                    return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0, t
                },
                clone: function (t) {
                    var e = new a.ARRAY_TYPE(4);
                    return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e
                },
                fromValues: function (t, e, n, i) {
                    var r = new a.ARRAY_TYPE(4);
                    return r[0] = t, r[1] = e, r[2] = n, r[3] = i, r
                },
                copy: function (t, e) {
                    return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
                },
                set: function (t, e, n, a, i) {
                    return t[0] = e, t[1] = n, t[2] = a, t[3] = i, t
                },
                add: function (t, e, n) {
                    return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t[2] = e[2] + n[2], t[3] = e[3] + n[3], t
                },
                subtract: function (t, e, n) {
                    return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t[2] = e[2] - n[2], t[3] = e[3] - n[3], t
                }
            };
        i.sub = i.subtract, i.multiply = function (t, e, n) {
            return t[0] = e[0] * n[0], t[1] = e[1] * n[1], t[2] = e[2] * n[2], t[3] = e[3] * n[3], t
        }, i.mul = i.multiply, i.divide = function (t, e, n) {
            return t[0] = e[0] / n[0], t[1] = e[1] / n[1], t[2] = e[2] / n[2], t[3] = e[3] / n[3], t
        }, i.div = i.divide, i.ceil = function (t, e) {
            return t[0] = Math.ceil(e[0]), t[1] = Math.ceil(e[1]), t[2] = Math.ceil(e[2]), t[3] = Math.ceil(e[3]), t
        }, i.floor = function (t, e) {
            return t[0] = Math.floor(e[0]), t[1] = Math.floor(e[1]), t[2] = Math.floor(e[2]), t[3] = Math.floor(e[3]), t
        }, i.min = function (t, e, n) {
            return t[0] = Math.min(e[0], n[0]), t[1] = Math.min(e[1], n[1]), t[2] = Math.min(e[2], n[2]), t[3] = Math.min(e[3], n[3]), t
        }, i.max = function (t, e, n) {
            return t[0] = Math.max(e[0], n[0]), t[1] = Math.max(e[1], n[1]), t[2] = Math.max(e[2], n[2]), t[3] = Math.max(e[3], n[3]), t
        }, i.round = function (t, e) {
            return t[0] = Math.round(e[0]), t[1] = Math.round(e[1]), t[2] = Math.round(e[2]), t[3] = Math.round(e[3]), t
        }, i.scale = function (t, e, n) {
            return t[0] = e[0] * n, t[1] = e[1] * n, t[2] = e[2] * n, t[3] = e[3] * n, t
        }, i.scaleAndAdd = function (t, e, n, a) {
            return t[0] = e[0] + n[0] * a, t[1] = e[1] + n[1] * a, t[2] = e[2] + n[2] * a, t[3] = e[3] + n[3] * a, t
        }, i.distance = function (t, e) {
            var n = e[0] - t[0],
                a = e[1] - t[1],
                i = e[2] - t[2],
                r = e[3] - t[3];
            return Math.sqrt(n * n + a * a + i * i + r * r)
        }, i.dist = i.distance, i.squaredDistance = function (t, e) {
            var n = e[0] - t[0],
                a = e[1] - t[1],
                i = e[2] - t[2],
                r = e[3] - t[3];
            return n * n + a * a + i * i + r * r
        }, i.sqrDist = i.squaredDistance, i.length = function (t) {
            var e = t[0],
                n = t[1],
                a = t[2],
                i = t[3];
            return Math.sqrt(e * e + n * n + a * a + i * i)
        }, i.len = i.length, i.squaredLength = function (t) {
            var e = t[0],
                n = t[1],
                a = t[2],
                i = t[3];
            return e * e + n * n + a * a + i * i
        }, i.sqrLen = i.squaredLength, i.negate = function (t, e) {
            return t[0] = -e[0], t[1] = -e[1], t[2] = -e[2], t[3] = -e[3], t
        }, i.inverse = function (t, e) {
            return t[0] = 1 / e[0], t[1] = 1 / e[1], t[2] = 1 / e[2], t[3] = 1 / e[3], t
        }, i.normalize = function (t, e) {
            var n = e[0],
                a = e[1],
                i = e[2],
                r = e[3],
                s = n * n + a * a + i * i + r * r;
            return s > 0 && (s = 1 / Math.sqrt(s), t[0] = n * s, t[1] = a * s, t[2] = i * s, t[3] = r * s), t
        }, i.dot = function (t, e) {
            return t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3]
        }, i.lerp = function (t, e, n, a) {
            var i = e[0],
                r = e[1],
                s = e[2],
                o = e[3];
            return t[0] = i + a * (n[0] - i), t[1] = r + a * (n[1] - r), t[2] = s + a * (n[2] - s), t[3] = o + a * (n[3] - o), t
        }, i.random = function (t, e) {
            return e = e || 1, t[0] = a.RANDOM(), t[1] = a.RANDOM(), t[2] = a.RANDOM(), t[3] = a.RANDOM(), i.normalize(t, t), i.scale(t, t, e), t
        }, i.transformMat4 = function (t, e, n) {
            var a = e[0],
                i = e[1],
                r = e[2],
                s = e[3];
            return t[0] = n[0] * a + n[4] * i + n[8] * r + n[12] * s, t[1] = n[1] * a + n[5] * i + n[9] * r + n[13] * s, t[2] = n[2] * a + n[6] * i + n[10] * r + n[14] * s, t[3] = n[3] * a + n[7] * i + n[11] * r + n[15] * s, t
        }, i.transformQuat = function (t, e, n) {
            var a = e[0],
                i = e[1],
                r = e[2],
                s = n[0],
                o = n[1],
                l = n[2],
                u = n[3],
                h = u * a + o * r - l * i,
                c = u * i + l * a - s * r,
                d = u * r + s * i - o * a,
                f = -s * a - o * i - l * r;
            return t[0] = h * u + f * -s + c * -l - d * -o, t[1] = c * u + f * -o + d * -s - h * -l, t[2] = d * u + f * -l + h * -o - c * -s, t[3] = e[3], t
        }, i.forEach = function () {
            var t = i.create();
            return function (e, n, a, i, r, s) {
                var o, l;
                for (n || (n = 4), a || (a = 0), l = i ? Math.min(i * n + a, e.length) : e.length, o = a; l > o; o += n) t[0] = e[o], t[1] = e[o + 1], t[2] = e[o + 2], t[3] = e[o + 3], r(t, t, s), e[o] = t[0], e[o + 1] = t[1], e[o + 2] = t[2], e[o + 3] = t[3];
                return e
            }
        }(), i.str = function (t) {
            return "vec4(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ")"
        }, i.exactEquals = function (t, e) {
            return t[0] === e[0] && t[1] === e[1] && t[2] === e[2] && t[3] === e[3]
        }, i.equals = function (t, e) {
            var n = t[0],
                i = t[1],
                r = t[2],
                s = t[3],
                o = e[0],
                l = e[1],
                u = e[2],
                h = e[3];
            return Math.abs(n - o) <= a.EPSILON * Math.max(1, Math.abs(n), Math.abs(o)) && Math.abs(i - l) <= a.EPSILON * Math.max(1, Math.abs(i), Math.abs(l)) && Math.abs(r - u) <= a.EPSILON * Math.max(1, Math.abs(r), Math.abs(u)) && Math.abs(s - h) <= a.EPSILON * Math.max(1, Math.abs(s), Math.abs(h))
        }, t.exports = i
    }, function (t, e, n) {
        var a = n(1),
            i = {
                create: function () {
                    var t = new a.ARRAY_TYPE(2);
                    return t[0] = 0, t[1] = 0, t
                },
                clone: function (t) {
                    var e = new a.ARRAY_TYPE(2);
                    return e[0] = t[0], e[1] = t[1], e
                },
                fromValues: function (t, e) {
                    var n = new a.ARRAY_TYPE(2);
                    return n[0] = t, n[1] = e, n
                },
                copy: function (t, e) {
                    return t[0] = e[0], t[1] = e[1], t
                },
                set: function (t, e, n) {
                    return t[0] = e, t[1] = n, t
                },
                add: function (t, e, n) {
                    return t[0] = e[0] + n[0], t[1] = e[1] + n[1], t
                },
                subtract: function (t, e, n) {
                    return t[0] = e[0] - n[0], t[1] = e[1] - n[1], t
                }
            };
        i.sub = i.subtract, i.multiply = function (t, e, n) {
            return t[0] = e[0] * n[0], t[1] = e[1] * n[1], t
        }, i.mul = i.multiply, i.divide = function (t, e, n) {
            return t[0] = e[0] / n[0], t[1] = e[1] / n[1], t
        }, i.div = i.divide, i.ceil = function (t, e) {
            return t[0] = Math.ceil(e[0]), t[1] = Math.ceil(e[1]), t
        }, i.floor = function (t, e) {
            return t[0] = Math.floor(e[0]), t[1] = Math.floor(e[1]), t
        }, i.min = function (t, e, n) {
            return t[0] = Math.min(e[0], n[0]), t[1] = Math.min(e[1], n[1]), t
        }, i.max = function (t, e, n) {
            return t[0] = Math.max(e[0], n[0]), t[1] = Math.max(e[1], n[1]), t
        }, i.round = function (t, e) {
            return t[0] = Math.round(e[0]), t[1] = Math.round(e[1]), t
        }, i.scale = function (t, e, n) {
            return t[0] = e[0] * n, t[1] = e[1] * n, t
        }, i.scaleAndAdd = function (t, e, n, a) {
            return t[0] = e[0] + n[0] * a, t[1] = e[1] + n[1] * a, t
        }, i.distance = function (t, e) {
            var n = e[0] - t[0],
                a = e[1] - t[1];
            return Math.sqrt(n * n + a * a)
        }, i.dist = i.distance, i.squaredDistance = function (t, e) {
            var n = e[0] - t[0],
                a = e[1] - t[1];
            return n * n + a * a
        }, i.sqrDist = i.squaredDistance, i.length = function (t) {
            var e = t[0],
                n = t[1];
            return Math.sqrt(e * e + n * n)
        }, i.len = i.length, i.squaredLength = function (t) {
            var e = t[0],
                n = t[1];
            return e * e + n * n
        }, i.sqrLen = i.squaredLength, i.negate = function (t, e) {
            return t[0] = -e[0], t[1] = -e[1], t
        }, i.inverse = function (t, e) {
            return t[0] = 1 / e[0], t[1] = 1 / e[1], t
        }, i.normalize = function (t, e) {
            var n = e[0],
                a = e[1],
                i = n * n + a * a;
            return i > 0 && (i = 1 / Math.sqrt(i), t[0] = e[0] * i, t[1] = e[1] * i), t
        }, i.dot = function (t, e) {
            return t[0] * e[0] + t[1] * e[1]
        }, i.cross = function (t, e, n) {
            var a = e[0] * n[1] - e[1] * n[0];
            return t[0] = t[1] = 0, t[2] = a, t
        }, i.lerp = function (t, e, n, a) {
            var i = e[0],
                r = e[1];
            return t[0] = i + a * (n[0] - i), t[1] = r + a * (n[1] - r), t
        }, i.random = function (t, e) {
            e = e || 1;
            var n = 2 * a.RANDOM() * Math.PI;
            return t[0] = Math.cos(n) * e, t[1] = Math.sin(n) * e, t
        }, i.transformMat2 = function (t, e, n) {
            var a = e[0],
                i = e[1];
            return t[0] = n[0] * a + n[2] * i, t[1] = n[1] * a + n[3] * i, t
        }, i.transformMat2d = function (t, e, n) {
            var a = e[0],
                i = e[1];
            return t[0] = n[0] * a + n[2] * i + n[4], t[1] = n[1] * a + n[3] * i + n[5], t
        }, i.transformMat3 = function (t, e, n) {
            var a = e[0],
                i = e[1];
            return t[0] = n[0] * a + n[3] * i + n[6], t[1] = n[1] * a + n[4] * i + n[7], t
        }, i.transformMat4 = function (t, e, n) {
            var a = e[0],
                i = e[1];
            return t[0] = n[0] * a + n[4] * i + n[12], t[1] = n[1] * a + n[5] * i + n[13], t
        }, i.forEach = function () {
            var t = i.create();
            return function (e, n, a, i, r, s) {
                var o, l;
                for (n || (n = 2), a || (a = 0), l = i ? Math.min(i * n + a, e.length) : e.length, o = a; l > o; o += n) t[0] = e[o], t[1] = e[o + 1], r(t, t, s), e[o] = t[0], e[o + 1] = t[1];
                return e
            }
        }(), i.str = function (t) {
            return "vec2(" + t[0] + ", " + t[1] + ")"
        }, i.exactEquals = function (t, e) {
            return t[0] === e[0] && t[1] === e[1]
        }, i.equals = function (t, e) {
            var n = t[0],
                i = t[1],
                r = e[0],
                s = e[1];
            return Math.abs(n - r) <= a.EPSILON * Math.max(1, Math.abs(n), Math.abs(r)) && Math.abs(i - s) <= a.EPSILON * Math.max(1, Math.abs(i), Math.abs(s))
        }, t.exports = i
    }])
}), (CABLES = function (t) {
    var e = {};

    function n(a) {
        if (e[a]) return e[a].exports;
        var i = e[a] = {
            i: a,
            l: !1,
            exports: {}
        };
        return t[a].call(i.exports, i, i.exports, n), i.l = !0, i.exports
    }
    return n.m = t, n.c = e, n.d = function (t, e, a) {
        n.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: a
        })
    }, n.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, n.t = function (t, e) {
        if (1 & e && (t = n(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var a = Object.create(null);
        if (n.r(a), Object.defineProperty(a, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var i in t) n.d(a, i, function (e) {
                return t[e]
            }.bind(null, i));
        return a
    }, n.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return n.d(e, "a", e), e
    }, n.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, n.p = "", n(n.s = 0)
}([function (t, e, n) {
    t.exports = n(1)
}, function (t, e, n) {
    "use strict";
    n.r(e);
    var a = {};
    n.r(a), n.d(a, "base64Chars", function () {
        return l
    }), n.d(a, "base64lookup", function () {
        return c
    }), n.d(a, "b64encTypesArray", function () {
        return d
    }), n.d(a, "b64decTypedArray", function () {
        return f
    });
    var r = {};
    n.r(r), n.d(r, "shuffleArray", function () {
        return m
    }), n.d(r, "uuid", function () {
        return _
    }), n.d(r, "generateUUID", function () {
        return v
    }), n.d(r, "simpleId", function () {
        return I
    }), n.d(r, "smoothStep", function () {
        return A
    }), n.d(r, "smootherStep", function () {
        return E
    }), n.d(r, "map", function () {
        return M
    }), n.d(r, "cacheBust", function () {
        return y
    }), n.d(r, "jsonp", function () {
        return S
    }), n.d(r, "ajaxSync", function () {
        return T
    }), n.d(r, "ajax", function () {
        return P
    }), n.d(r, "request", function () {
        return R
    }), n.d(r, "UTILS", function () {
        return g
    });
    var s = {};
    n.r(s), n.d(s, "easeExpoIn", function () {
        return L
    }), n.d(s, "easeExpoOut", function () {
        return D
    }), n.d(s, "easeExpoInOut", function () {
        return k
    }), n.d(s, "easeCubicIn", function () {
        return B
    }), n.d(s, "easeCubicOut", function () {
        return w
    }), n.d(s, "easeCubicInOut", function () {
        return U
    }), n.d(s, "ANIM", function () {
        return N
    }), n.d(s, "Anim", function () {
        return j
    }), n.d(s, "TL", function () {
        return V
    });
    var o = {};
    n.r(o), n.d(o, "togglePacoRenderer", function () {
        return xt
    }), n.d(o, "showPacoRenderer", function () {
        return St
    }), n.d(o, "PatchConnectionReceiver", function () {
        return Tt
    }), n.d(o, "PatchConnectionSender", function () {
        return Pt
    }), n.d(o, "PatchConnectorBroadcastChannel", function () {
        return Rt
    });
    const l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        u = new Uint8Array(256);
    for (var h = 0; h < l.length; h++) u[l.charCodeAt(h)] = h;
    const c = u,
        d = function (t) {
            t.buffer && (t = t.buffer);
            var e, n = new Uint8Array(t),
                a = n.length,
                i = "";
            for (e = 0; e < a; e += 3) i += l[n[e] >> 2], i += l[(3 & n[e]) << 4 | n[e + 1] >> 4], i += l[(15 & n[e + 1]) << 2 | n[e + 2] >> 6], i += l[63 & n[e + 2]];
            return a % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : a % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="), i
        },
        f = function (t) {
            var e, n, a, i, r, s = .75 * t.length,
                o = t.length,
                l = 0;
            "=" === t[t.length - 1] && (s--, "=" === t[t.length - 2] && s--);
            var u = new ArrayBuffer(s),
                h = new Uint8Array(u);
            for (e = 0; e < o; e += 4) n = c[t.charCodeAt(e)], a = c[t.charCodeAt(e + 1)], i = c[t.charCodeAt(e + 2)], r = c[t.charCodeAt(e + 3)], h[l++] = n << 2 | a >> 4, h[l++] = (15 & a) << 4 | i >> 2, h[l++] = (3 & i) << 6 | 63 & r;
            return u
        },
        p = function () {
            this._eventCallbacks = {}, this.addEventListener = function (t, e) {
                this._eventCallbacks[t] ? this._eventCallbacks[t].push(e) : this._eventCallbacks[t] = [e]
            }, this.hasEventListener = function (t, e) {
                if (t && e) {
                    if (this._eventCallbacks[t]) return -1 != this._eventCallbacks[t].indexOf(e)
                } else console.log("hasListener: missing parameters")
            }, this.removeEventListener = function (t, e) {
                if (this._eventCallbacks[t]) {
                    var n = this._eventCallbacks[t].indexOf(e); - 1 == n ? console.log("eventlistener " + t + " not found...") : this._eventCallbacks[t].splice(n)
                }
            }, this.emitEvent = function (t, e, n, a, i, r, s) {
                if (this._eventCallbacks[t])
                    for (var o = 0; o < this._eventCallbacks[t].length; o++) this._eventCallbacks[t][o] && this._eventCallbacks[t][o](e, n, a, i, r, s)
            }
        },
        g = {
            float32Concat: function (t, e) {
                t instanceof Float32Array || (t = new Float32Array(t)), e instanceof Float32Array || (e = new Float32Array(e));
                var n = t.length,
                    a = new Float32Array(n + e.length);
                return a.set(t), a.set(e, n), a
            }
        },
        m = function (t) {
            for (var e = t.length - 1; e > 0; e--) {
                var n = Math.floor(Math.seededRandom() * (e + 1)),
                    a = t[e];
                t[e] = t[n], t[n] = a
            }
            return t
        },
        b = function () {
            var t = (new Date).getTime();
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, e => {
                var n = (t + 16 * Math.random()) % 16 | 0;
                return t = Math.floor(t / 16), ("x" == e ? n : 3 & n | 8).toString(16)
            })
        },
        _ = b,
        v = b;
    var O = 0;
    const I = function () {
            return ++O
        },
        A = function (t) {
            var e = Math.max(0, Math.min(1, (t - 0) / 1));
            return e * e * (3 - 2 * e)
        },
        E = function (t) {
            var e = Math.max(0, Math.min(1, (t - 0) / 1));
            return e * e * e * (e * (6 * e - 15) + 10)
        },
        M = function (t, e, n, a, i, r) {
            if (t >= n) return i;
            if (t <= e) return a;
            var s = !1,
                o = Math.min(e, n),
                l = Math.max(e, n);
            o != e && (s = !0);
            var u = !1,
                h = Math.min(a, i),
                c = Math.max(a, i);
            h != a && (u = !0);
            var d, f;
            return d = s ? (l - t) * (c - h) / (l - o) : (t - o) * (c - h) / (l - o), f = u ? c - d : d + h, r ? 1 == r ? a + (t = Math.max(0, Math.min(1, (f - a) / (i - a)))) * t * (3 - 2 * t) * (i - a) : 2 == r ? a + (t = Math.max(0, Math.min(1, (f - a) / (i - a)))) * t * t * (t * (6 * t - 15) + 10) * (i - a) : f : f
        };
    Math.randomSeed = 1, Math.seededRandom = function (t, e) {
        return 0 === Math.randomSeed && (Math.randomSeed = 999 * Math.random()), t = t || 1, e = e || 0, Math.randomSeed = (9301 * Math.randomSeed + 49297) % 233280, e + Math.randomSeed / 233280 * (t - e)
    }, g.arrayWriteToEnd = function (t, e) {
        for (var n = 1; n < t.length; n++) t[n - 1] = t[n];
        t[t.length - 1] = e
    }, g.isNumeric = function (t) {
        return !isNaN(parseFloat(t)) && isFinite(t)
    }, g.isArray = function (t) {
        return "[object Array]" === Object.prototype.toString.call(t)
    }, String.prototype.endl = function () {
        return this + "\n"
    }, String.prototype.startsWith = function (t) {
        return 0 === this.indexOf(t)
    }, String.prototype.endsWith = function (t) {
        return this.match(t + "$") == t
    };
    const y = function (t) {
        return t.indexOf("?") > -1 ? t += "&" : t += "?", t + "cb=" + CABLES.uuid()
    };
    var x = null;
    const S = function (t, e) {
            x = x || 0;
            var n = ++x;
            console.log("making jsonp request..."), CABLES["jsonpFunc" + n] = function (t) {
                console.log(t), e(!1, t)
            };
            var a = "?";
            t.indexOf(a) > -1 && (a = "&");
            var i = document.createElement("script");
            i.setAttribute("src", t + a + "callback=CABLES.jsonpFunc" + n), document.body.appendChild(i)
        },
        T = function (t, e, n, a, i) {
            R({
                url: t,
                cb: e,
                method: n,
                data: a,
                contenttype: i,
                sync: !0
            })
        },
        P = function (t, e, n, a, i, r) {
            R({
                url: t,
                cb: e,
                method: n,
                "data:": a,
                contenttype: i,
                sync: !1,
                jsonp: r
            })
        },
        R = function (t) {
            var e;
            t.hasOwnProperty("asynch") || (t.asynch = !0);
            try {
                e = new XMLHttpRequest
            } catch (t) {}
            e.onreadystatechange = function () {
                4 == e.readyState && t.cb && (200 == e.status || 0 == e.status ? t.cb(!1, e.responseText, e) : t.cb(!0, e.responseText, e))
            }, e.addEventListener("progress", t => {}), e.open(t.method ? t.method.toUpperCase() : "GET", t.url, !t.sync), t.post || t.data ? (e.setRequestHeader("Content-type", t.contenttype ? t.contenttype : "application/x-www-form-urlencoded"), e.send(t.data || t.post)) : e.send()
        };
    window.performance = window.performance || {
        offset: Date.now(),
        now: function () {
            return Date.now() - this.offset
        }
    };
    const F = {
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
        C = function (t, e, n, a) {
            p.apply(this), this.data = {}, this.direction = F.PORT.PORT_DIR_IN, this.id = v(), this.parent = t, this.links = [], this.value = 0, this.name = e, this.type = n || F.OP.OP_PORT_TYPE_VALUE, this.uiAttribs = a || {}, this.anim = null, this._oldAnimVal = -5711, this.defaultValue = null, this._uiActiveState = !0, this.ignoreValueSerialize = !1, this.onLinkChanged = null, this.crashed = !1, this._valueBeforeLink = null, this._lastAnimFrame = -1, this._animated = !1, this.onValueChanged = null, this.onTriggered = null, this.onUiActiveStateChange = null, this.changeAlways = !1, this._warnedDeprecated = !1, Object.defineProperty(this, "val", {
                get() {
                    return this._warnedDeprecated = !0, this.get()
                },
                set(t) {
                    this.setValue(t), this._warnedDeprecated = !0
                }
            })
        };
    C.prototype.onAnimToggle = function () {}, C.prototype._onAnimToggle = function () {
        this.onAnimToggle()
    }, C.prototype.hidePort = function () {
        this.setUiAttribs({
            hidePort: !0
        })
    }, C.prototype.remove = function () {
        this.removeLinks(), this.parent.removePort(this)
    }, C.prototype.setUiAttribs = function (t) {
        for (var e in this.uiAttribs || (this.uiAttribs = {}), t) this.uiAttribs[e] = t[e];
        this.emitEvent("onUiAttrChange", t)
    }, C.prototype.get = function () {
        return this._animated && this._lastAnimFrame != this.parent.patch.getFrameNum() && (this._lastAnimFrame = this.parent.patch.getFrameNum(), this.value = this.anim.getValue(this.parent.patch.timer.getTime()), this._oldAnimVal = this.value, this.forceChange()), this.value
    }, C.prototype.set = C.prototype.setValue = function (t) {
        if (void 0 !== t && this.parent.enabled && !this.crashed && (t !== this.value || this.changeAlways || this.type == F.OP.OP_PORT_TYPE_TEXTURE || this.type == F.OP.OP_PORT_TYPE_ARRAY)) {
            if (this._animated) this.anim.setValue(this.parent.patch.timer.getTime(), t);
            else {
                try {
                    this.value = t, this.forceChange()
                } catch (t) {
                    this.crashed = !0, this.setValue = function (t) {}, this.onTriggered = function () {}, console.log("exception!"), console.error("onvaluechanged exception cought", t), console.log(t.stack), console.log("exception in: " + this.parent.name), gui && gui.showOpCrash(this.parent), this.parent.patch.emitEvent("exception".ex, this.parent)
                }
                CABLES.UI && this.type == F.OP.OP_PORT_TYPE_TEXTURE && gui.texturePreview().updateTexturePort(this)
            }
            if (this.direction == F.PORT.PORT_DIR_OUT)
                for (var e = 0; e < this.links.length; ++e) this.links[e].setValue()
        }
    }, C.prototype.updateAnim = function () {
        this._animated && (this.value = this.get(), (this._oldAnimVal != this.value || this.changeAlways) && (this._oldAnimVal = this.value, this.forceChange()), this._oldAnimVal = this.value)
    }, C.args = function (t) {
        return (t + "").replace(/[\/][\/].*$/gm, "").replace(/\s+/g, "").replace(/[\/][*][^\/*]*[*][\/]/g, "").split("){", 1)[0].replace(/^[^(]*[(]/, "").replace(/=[^,]+/g, "").split(",").filter(Boolean)
    }, C.prototype.forceChange = function () {
        this.onValueChanged || this.onChange, this.onChange ? this.onChange(this, this.value) : this.onValueChanged && this.onValueChanged(this, this.value)
    }, C.prototype.getTypeString = function () {
        return this.type == F.OP.OP_PORT_TYPE_VALUE ? "Number" : this.type == F.OP.OP_PORT_TYPE_FUNCTION ? "Trigger" : this.type == F.OP.OP_PORT_TYPE_OBJECT ? "Object" : this.type == F.OP.OP_PORT_TYPE_DYNAMIC ? "Dynamic" : this.type == F.OP.OP_PORT_TYPE_ARRAY ? "Array" : this.type == F.OP.OP_PORT_TYPE_STRING ? "String" : "Unknown"
    }, C.prototype.getSerialized = function () {
        var t = {};
        if (t.name = this.getName(), this.ignoreValueSerialize || 0 !== this.links.length || this.type == F.OP.OP_PORT_TYPE_OBJECT && this.value && this.value.tex || (t.value = this.value), this._animated && (t.animated = !0), this.anim && (t.anim = this.anim.getSerialized()), "file" == this.uiAttribs.display && (t.display = this.uiAttribs.display), this.direction == F.PORT.PORT_DIR_IN && this.links.length > 0)
            for (var e in t.links = [], this.links) this.links[e].portIn && this.links[e].portOut && t.links.push(this.links[e].getSerialized());
        return t
    }, C.prototype.shouldLink = function () {
        return !0
    }, C.prototype.removeLinks = function () {
        for (var t = 0; this.links.length > 0;) {
            if (++t > 5e3) {
                console.warn("could not delete links... / infinite loop"), this.links.length = 0;
                break
            }
            this.links[0].remove()
        }
    }, C.prototype.removeLink = function (t) {
        for (var e in this.links) this.links[e] == t && this.links.splice(e, 1);
        this.direction == F.PORT.PORT_DIR_IN && (this.type == F.OP.OP_PORT_TYPE_VALUE ? this.setValue(this._valueBeforeLink || 0) : this.setValue(this._valueBeforeLink || null)), this.onLinkChanged && this.onLinkChanged(), this.emitEvent("onLinkChanged")
    }, C.prototype.getName = function () {
        return this.name
    }, C.prototype.addLink = function (t) {
        this._valueBeforeLink = this.value, this.links.push(t), this.onLinkChanged && this.onLinkChanged(), this.emitEvent("onLinkChanged")
    }, C.prototype.getLinkTo = function (t) {
        for (var e in this.links)
            if (this.links[e].portIn == t || this.links[e].portOut == t) return this.links[e]
    }, C.prototype.removeLinkTo = function (t) {
        for (var e in this.links)
            if (this.links[e].portIn == t || this.links[e].portOut == t) return this.links[e].remove(), this.onLinkChanged && this.onLinkChanged(), void this.emitEvent("onLinkChanged")
    }, C.prototype.isLinkedTo = function (t) {
        for (var e in this.links)
            if (this.links[e].portIn == t || this.links[e].portOut == t) return !0;
        return !1
    }, C.prototype.trigger = function () {
        if (0 !== this.links.length && this.parent.enabled) {
            var t = null;
            try {
                for (var e = 0; e < this.links.length; ++e) this.links[e].portIn && (t = this.links[e].portIn)._onTriggered(), this.links[e] && this.links[e].activity()
            } catch (e) {
                this.parent.enabled = !1, CABLES.UI && (this.parent.patch.emitEvent("exception".ex, t.parent), window.gui && gui.showOpCrash(t.parent)), console.log("exception!"), console.error("ontriggered exception cought", e), console.log(e.stack), console.log("exception in: " + t.parent.name)
            }
        }
    }, C.prototype.call = function () {
        console.log("call deprecated - use trigger() "), this.trigger()
    }, C.prototype.execute = function () {
        console.log("### execute port: " + this.getName(), this.goals.length)
    }, C.prototype.setAnimated = function (t) {
        this._animated != t && (this._animated = t, this._animated && !this.anim && (this.anim = new j), this._onAnimToggle())
    }, C.prototype.toggleAnim = function (t) {
        this._animated = !this._animated, this._animated && !this.anim && (this.anim = new j), this.setAnimated(this._animated), this._onAnimToggle()
    }, C.prototype.getType = function () {
        return this.type
    }, C.prototype.isLinked = function () {
        return this.links.length > 0
    }, C.prototype.isAnimated = function () {
        return this._animated
    }, C.prototype.isHidden = function () {
        return this.uiAttribs.hidePort
    }, C.prototype._onTriggered = function () {
        this.parent.updateAnims(), this.parent.enabled && this.onTriggered && this.onTriggered()
    }, C.prototype._onTriggeredProfiling = function () {
        this.parent.updateAnims(), this.parent.patch.profiler.add("port", this), this.parent.enabled && this.onTriggered && this.onTriggered(), this.parent.patch.profiler.add("port", null)
    }, C.prototype.onValueChange = function (t) {
        this.onChange = t
    }, C.prototype.getUiActiveState = function () {
        return this._uiActiveState
    }, C.prototype.setUiActiveState = function (t) {
        this._uiActiveState = t, this.onUiActiveStateChange && this.onUiActiveStateChange()
    }, C.portTypeNumberToString = function (t) {
        return t == F.OP.OP_PORT_TYPE_VALUE ? "value" : t == F.OP.OP_PORT_TYPE_FUNCTION ? "function" : t == F.OP.OP_PORT_TYPE_OBJECT ? "object" : t == F.OP.OP_PORT_TYPE_ARRAY ? "array" : t == F.OP.OP_PORT_TYPE_STRING ? "string" : t == F.OP.OP_PORT_TYPE_DYNAMIC ? "dynamic" : "unknown"
    };
    const N = {
        Key: function (t) {
            this.time = 0, this.value = 0, this.ui = {}, this.onChange = null, this._easing = 0, this.bezTime = .5, this.bezValue = 0, this.bezTimeIn = -.5, this.bezValueIn = 0, this.cb = null, this.cbTriggered = !1, this._updateBezier = !1, this.setEasing(F.ANIM.EASING_LINEAR), this.set(t)
        }
    };
    N.Key.linear = function (t, e, n) {
        return parseFloat(e.value) + parseFloat(n.value - e.value) * t
    }, N.Key.easeLinear = function (t, e) {
        return N.Key.linear(t, this, e)
    }, N.Key.easeAbsolute = function (t, e) {
        return this.value
    };
    const L = function (t) {
        return Math.pow(2, 10 * (t - 1))
    };
    N.Key.easeExpoIn = function (t, e) {
        return t = L(t), N.Key.linear(t, this, e)
    };
    const D = function (t) {
        return 1 - Math.pow(2, -10 * t)
    };
    N.Key.easeExpoOut = function (t, e) {
        return t = D(t), N.Key.linear(t, this, e)
    };
    const k = function (t) {
        return (t *= 2) < 1 ? t = .5 * Math.pow(2, 10 * (t - 1)) : (t--, t = .5 * (2 - Math.pow(2, -10 * t))), t
    };
    N.Key.easeExpoInOut = function (t, e) {
        return t = k(t), N.Key.linear(t, this, e)
    }, N.Key.easeSinIn = function (t, e) {
        return t = -1 * Math.cos(t * Math.PI / 2) + 1, N.Key.linear(t, this, e)
    }, N.Key.easeSinOut = function (t, e) {
        return t = Math.sin(t * Math.PI / 2), N.Key.linear(t, this, e)
    }, N.Key.easeSinInOut = function (t, e) {
        return t = -.5 * (Math.cos(Math.PI * t) - 1), N.Key.linear(t, this, e)
    };
    const B = function (t) {
        return t * (t * t)
    };
    N.Key.easeCubicIn = function (t, e) {
        return t = B(t), N.Key.linear(t, this, e)
    }, N.Key.easeInQuint = function (t, e) {
        return t *= t * t * t * t, N.Key.linear(t, this, e)
    }, N.Key.easeOutQuint = function (t, e) {
        return t = (t -= 1) * t * t * t * t + 1, N.Key.linear(t, this, e)
    }, N.Key.easeInOutQuint = function (t, e) {
        return (t /= .5) < 1 ? t *= .5 * t * t * t * t : t = .5 * ((t -= 2) * t * t * t * t + 2), N.Key.linear(t, this, e)
    }, N.Key.easeInQuart = function (t, e) {
        return t *= t * t * t, N.Key.linear(t, this, e)
    }, N.Key.easeOutQuart = function (t, e) {
        return t = -1 * ((t -= 1) * t * t * t - 1), N.Key.linear(t, this, e)
    }, N.Key.easeInOutQuart = function (t, e) {
        return (t /= .5) < 1 ? t *= .5 * t * t * t : t = -.5 * ((t -= 2) * t * t * t - 2), N.Key.linear(t, this, e)
    }, N.Key.bounce = function (t) {
        return (t /= 1) < 1 / 2.75 ? t *= 7.5625 * t : t = t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, t
    }, N.Key.easeInBounce = function (t, e) {
        return N.Key.linear(N.Key.bounce(t), this, e)
    }, N.Key.easeOutBounce = function (t, e) {
        return N.Key.linear(N.Key.bounce(t), this, e)
    }, N.Key.easeInElastic = function (t, e) {
        var n = 1.70158,
            a = 0,
            i = 1;
        return 0 === t ? t = 0 : 1 == (t /= 1) ? t = 1 : (a || (a = .3), i < Math.abs(1) ? (i = 1, n = a / 4) : n = a / (2 * Math.PI) * Math.asin(1 / i), t = -i * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - n) * (2 * Math.PI) / a) + 0), N.Key.linear(t, this, e)
    }, N.Key.easeOutElastic = function (t, e) {
        var n = 1.70158,
            a = 0,
            i = 1;
        return 0 === t ? t = 0 : 1 == (t /= 1) ? t = 1 : (a || (a = .3), i < Math.abs(1) ? (i = 1, n = a / 4) : n = a / (2 * Math.PI) * Math.asin(1 / i), t = i * Math.pow(2, -10 * t) * Math.sin((1 * t - n) * (2 * Math.PI) / a) + 1 + 0), N.Key.linear(t, this, e)
    }, N.Key.easeInBack = function (t, e) {
        var n = 1.70158;
        return t = t * t * ((n + 1) * t - n), N.Key.linear(t, this, e)
    }, N.Key.easeOutBack = function (t, e) {
        var n = 1.70158;
        return t = (t = t / 1 - 1) * t * ((n + 1) * t + n) + 1, N.Key.linear(t, this, e)
    }, N.Key.easeInOutBack = function (t, e) {
        var n = 1.70158;
        return t = (t /= .5) < 1 ? t * t * ((1 + (n *= 1.525)) * t - n) * .5 : .5 * ((t -= 2) * t * ((1 + (n *= 1.525)) * t + n) + 2), N.Key.linear(t, this, e)
    };
    const w = function (t) {
        return --t * t * t + 1
    };
    N.Key.easeCubicOut = function (t, e) {
        return t = w(t), N.Key.linear(t, this, e)
    };
    const U = function (t) {
        return (t *= 2) < 1 ? t *= .5 * t * t : t = .5 * ((t -= 2) * t * t + 2), t
    };
    N.Key.easeCubicInOut = function (t, e) {
        return t = U(t), N.Key.linear(t, this, e)
    }, N.Key.easeSmoothStep = function (t, e) {
        var n = Math.max(0, Math.min(1, t));
        return t = n * n * (3 - 2 * n), N.Key.linear(t, this, e)
    }, N.Key.easeSmootherStep = function (t, e) {
        var n = Math.max(0, Math.min(1, (t - 0) / 1));
        return t = n * n * n * (n * (6 * n - 15) + 10), N.Key.linear(t, this, e)
    }, N.Key.prototype.setEasing = function (t) {
        this._easing = t, this._easing == F.ANIM.EASING_ABSOLUTE ? this.ease = N.Key.easeAbsolute : this._easing == F.ANIM.EASING_SMOOTHSTEP ? this.ease = N.Key.easeSmoothStep : this._easing == F.ANIM.EASING_SMOOTHERSTEP ? this.ease = N.Key.easeSmootherStep : this._easing == F.ANIM.EASING_CUBIC_IN ? this.ease = N.Key.easeCubicIn : this._easing == F.ANIM.EASING_CUBIC_OUT ? this.ease = N.Key.easeCubicOut : this._easing == F.ANIM.EASING_CUBIC_INOUT ? this.ease = N.Key.easeCubicInOut : this._easing == F.ANIM.EASING_EXPO_IN ? this.ease = N.Key.easeExpoIn : this._easing == F.ANIM.EASING_EXPO_OUT ? this.ease = N.Key.easeExpoOut : this._easing == F.ANIM.EASING_EXPO_INOUT ? this.ease = N.Key.easeExpoInOut : this._easing == F.ANIM.EASING_SIN_IN ? this.ease = N.Key.easeSinIn : this._easing == F.ANIM.EASING_SIN_OUT ? this.ease = N.Key.easeSinOut : this._easing == F.ANIM.EASING_SIN_INOUT ? this.ease = N.Key.easeSinInOut : this._easing == F.ANIM.EASING_BACK_OUT ? this.ease = N.Key.easeOutBack : this._easing == F.ANIM.EASING_BACK_IN ? this.ease = N.Key.easeInBack : this._easing == F.ANIM.EASING_BACK_INOUT ? this.ease = N.Key.easeInOutBack : this._easing == F.ANIM.EASING_ELASTIC_IN ? this.ease = N.Key.easeInElastic : this._easing == F.ANIM.EASING_ELASTIC_OUT ? this.ease = N.Key.easeOutElastic : this._easing == F.ANIM.EASING_BOUNCE_IN ? this.ease = N.Key.easeInBounce : this._easing == F.ANIM.EASING_BOUNCE_OUT ? this.ease = N.Key.easeOutBounce : this._easing == F.ANIM.EASING_QUART_OUT ? this.ease = N.Key.easeOutQuart : this._easing == F.ANIM.EASING_QUART_IN ? this.ease = N.Key.easeInQuart : this._easing == F.ANIM.EASING_QUART_INOUT ? this.ease = N.Key.easeInOutQuart : this._easing == F.ANIM.EASING_QUINT_OUT ? this.ease = N.Key.easeOutQuint : this._easing == F.ANIM.EASING_QUINT_IN ? this.ease = N.Key.easeInQuint : this._easing == F.ANIM.EASING_QUINT_INOUT ? this.ease = N.Key.easeInOutQuint : this._easing == F.ANIM.EASING_BEZIER ? (this._updateBezier = !0, this.ease = N.Key.easeBezier) : (this._easing = F.ANIM.EASING_LINEAR, this.ease = N.Key.easeLinear)
    }, N.Key.prototype.trigger = function () {
        this.cb(), this.cbTriggered = !0
    }, N.Key.prototype.setValue = function (t) {
        this.value = t, this._updateBezier = !0, null !== this.onChange && this.onChange()
    }, N.Key.prototype.set = function (t) {
        t && (t.e && this.setEasing(t.e), t.cb && (this.cb = t.cb, this.cbTriggered = !1), t.b && (this.bezTime = t.b[0], this.bezValue = t.b[1], this.bezTimeIn = t.b[2], this.bezValueIn = t.b[3], this._updateBezier = !0), t.hasOwnProperty("t") && (this.time = t.t), t.hasOwnProperty("time") && (this.time = t.time), t.hasOwnProperty("v") ? this.value = t.v : t.hasOwnProperty("value") && (this.value = t.value)), null !== this.onChange && this.onChange()
    }, N.Key.prototype.getSerialized = function () {
        var t = {};
        return t.t = this.time, t.v = this.value, t.e = this._easing, this._easing == F.ANIM.EASING_BEZIER && (t.b = [this.bezTime, this.bezValue, this.bezTimeIn, this.bezValueIn]), t
    }, N.Key.prototype.getEasing = function () {
        return this._easing
    };
    const j = function (t) {
        this.keys = [], this.onChange = null, this.stayInTimeline = !1, this.loop = !1, this.defaultEasing = F.ANIM.EASING_LINEAR, this.onLooped = null, this._timesLooped = 0, this._needsSort = !1
    };
    j.prototype.forceChangeCallback = function () {
        null !== this.onChange && this.onChange()
    }, j.prototype.hasEnded = function (t) {
        return 0 === this.keys.length || this.keys[this.keys.length - 1].time <= t
    }, j.prototype.isRising = function (t) {
        if (this.hasEnded(t)) return !1;
        var e = this.getKeyIndex(t);
        return this.keys[e].value < this.keys[e + 1].value
    }, j.prototype.clear = function (t) {
        var e = 0;
        t && (e = this.getValue(t)), this.keys.length = 0, t && this.setValue(t, e), null !== this.onChange && this.onChange()
    }, j.prototype.sortKeys = function () {
        this.keys.sort((t, e) => parseFloat(t.time) - parseFloat(e.time)), this._needsSort = !1
    }, j.prototype.getLength = function () {
        return 0 === this.keys.length ? 0 : this.keys[this.keys.length - 1].time
    }, j.prototype.getKeyIndex = function (t) {
        for (var e = 0, n = 0; n < this.keys.length; n++)
            if (t >= this.keys[n].time && (e = n), this.keys[n].time > t) return e;
        return e
    }, j.prototype.setValue = function (t, e, n) {
        var a = !1;
        for (var i in this.keys)
            if (this.keys[i].time == t) {
                a = this.keys[i], this.keys[i].setValue(e), this.keys[i].cb = n;
                break
            } a || this.keys.push(new N.Key({
            time: t,
            value: e,
            e: this.defaultEasing,
            cb: n
        })), this.onChange && this.onChange(), this._needsSort = !0
    }, j.prototype.getSerialized = function () {
        var t = {
            keys: []
        };
        for (var e in t.loop = this.loop, this.keys) t.keys.push(this.keys[e].getSerialized());
        return t
    }, j.prototype.getKey = function (t) {
        var e = this.getKeyIndex(t);
        return this.keys[e]
    }, j.prototype.getNextKey = function (t) {
        var e = this.getKeyIndex(t) + 1;
        return e >= this.keys.length && (e = this.keys.length - 1), this.keys[e]
    }, j.prototype.isFinished = function (t) {
        return this.keys.length <= 0 || t > this.keys[this.keys.length - 1].time
    }, j.prototype.isStarted = function (t) {
        return !(this.keys.length <= 0) && t >= this.keys[0].time
    }, j.prototype.getValue = function (t) {
        if (0 === this.keys.length) return 0;
        if (this._needsSort && this.sortKeys(), t < this.keys[0].time) return this.keys[0].value;
        var e = this.keys.length - 1;
        this.loop && t > this.keys[e].time && (t / this.keys[e].time > this._timesLooped && (this._timesLooped++, this.onLooped && this.onLooped()), t = (t - this.keys[0].time) % (this.keys[e].time - this.keys[0].time), t += this.keys[0].time);
        var n = this.getKeyIndex(t);
        if (n >= e) return this.keys[e].cb && !this.keys[e].cbTriggered && this.keys[e].trigger(), this.keys[e].value;
        var a = parseInt(n, 10) + 1,
            i = this.keys[n],
            r = this.keys[a];
        if (i.cb && !i.cbTriggered && i.trigger(), !r) return -1;
        var s = (t - i.time) / (r.time - i.time);
        return i.ease(s, r)
    }, j.prototype.addKey = function (t) {
        void 0 === t.time ? console.log("key time undefined, ignoring!") : (this.keys.push(t), null !== this.onChange && this.onChange())
    }, j.prototype.easingFromString = function (t) {
        return "linear" == t ? F.ANIM.EASING_LINEAR : "absolute" == t ? F.ANIM.EASING_ABSOLUTE : "smoothstep" == t ? F.ANIM.EASING_SMOOTHSTEP : "smootherstep" == t ? F.ANIM.EASING_SMOOTHERSTEP : "Cubic In" == t ? F.ANIM.EASING_CUBIC_IN : "Cubic Out" == t ? F.ANIM.EASING_CUBIC_OUT : "Cubic In Out" == t ? F.ANIM.EASING_CUBIC_INOUT : "Expo In" == t ? F.ANIM.EASING_EXPO_IN : "Expo Out" == t ? F.ANIM.EASING_EXPO_OUT : "Expo In Out" == t ? F.ANIM.EASING_EXPO_INOUT : "Sin In" == t ? F.ANIM.EASING_SIN_IN : "Sin Out" == t ? F.ANIM.EASING_SIN_OUT : "Sin In Out" == t ? F.ANIM.EASING_SIN_INOUT : "Back In" == t ? F.ANIM.EASING_BACK_IN : "Back Out" == t ? F.ANIM.EASING_BACK_OUT : "Back In Out" == t ? F.ANIM.EASING_BACK_INOUT : "Elastic In" == t ? F.ANIM.EASING_ELASTIC_IN : "Elastic Out" == t ? F.ANIM.EASING_ELASTIC_OUT : "Bounce In" == t ? F.ANIM.EASING_BOUNCE_IN : "Bounce Out" == t ? F.ANIM.EASING_BOUNCE_OUT : "Quart Out" == t ? F.ANIM.EASING_QUART_OUT : "Quart In" == t ? F.ANIM.EASING_QUART_IN : "Quart In Out" == t ? F.ANIM.EASING_QUART_INOUT : "Quint Out" == t ? F.ANIM.EASING_QUINT_OUT : "Quint In" == t ? F.ANIM.EASING_QUINT_IN : "Quint In Out" == t ? F.ANIM.EASING_QUINT_INOUT : void 0
    }, j.prototype.createPort = function (t, e, n) {
        var a = t.addInPort(new C(t, e, F.OP.OP_PORT_TYPE_VALUE, {
            display: "dropdown",
            values: F.ANIM.EASINGS
        }));
        return a.set("linear"), a.defaultValue = "linear", a.onChange = function () {
            this.defaultEasing = this.easingFromString(a.get()), n && n()
        }.bind(this), a
    }, j.slerpQuaternion = function (t, e, n, a, i, r) {
        j.slerpQuaternion.q1 || (j.slerpQuaternion.q1 = quat.create(), j.slerpQuaternion.q2 = quat.create());
        var s = n.getKeyIndex(t),
            o = s + 1;
        if (o >= n.keys.length && (o = n.keys.length - 1), s == o) quat.set(e, n.keys[s].value, a.keys[s].value, i.keys[s].value, r.keys[s].value);
        else {
            var l = n.keys[s].time,
                u = (t - l) / (n.keys[o].time - l);
            quat.set(j.slerpQuaternion.q1, n.keys[s].value, a.keys[s].value, i.keys[s].value, r.keys[s].value), quat.set(j.slerpQuaternion.q2, n.keys[o].value, a.keys[o].value, i.keys[o].value, r.keys[o].value), quat.slerp(e, j.slerpQuaternion.q1, j.slerpQuaternion.q2, u)
        }
        return e
    };
    const V = N;
    V.Anim = j;
    const z = function (t) {
        this.portIn = null, this.portOut = null, this.scene = t, this.activityCounter = 0
    };
    z.prototype.setValue = function (t) {
        void 0 === t ? this._setValue() : this.portIn.set(t)
    }, z.prototype.activity = function () {
        this.activityCounter++
    }, z.prototype._setValue = function () {
        if (this.portOut) {
            var t = this.portOut.get();
            t == t && (this.portIn.type != F.OP.OP_PORT_TYPE_FUNCTION && this.activity(), this.portIn.get() !== t ? this.portIn.set(t) : this.portIn.changeAlways && this.portIn.set(t))
        } else this.remove()
    }, z.prototype.getOtherPort = function (t) {
        return t == this.portIn ? this.portOut : this.portIn
    }, z.prototype.remove = function () {
        this.portIn && this.portIn.removeLink(this), this.portOut && this.portOut.removeLink(this), this.scene && this.scene.emitEvent("onUnLink", this.portIn, this.portOut), this.portIn && this.portIn.type == F.OP.OP_PORT_TYPE_OBJECT && (this.portIn.set(null), this.portIn.links.length > 0 && this.portIn.set(this.portIn.links[0].getOtherPort(this.portIn).get())), this.portIn && this.portIn.parent._checkLinksNeededToWork(), this.portOut && this.portOut.parent._checkLinksNeededToWork(), this.portIn = null, this.portOut = null, this.scene = null
    }, z.prototype.link = function (t, e) {
        if (!z.canLink(t, e)) return console.log("cannot link ports!"), !1;
        t.direction == F.PORT.PORT_DIR_IN ? (this.portIn = t, this.portOut = e) : (this.portIn = e, this.portOut = t), t.addLink(this), e.addLink(this), this.setValue(), t.onLink && t.onLink(this), e.onLink && e.onLink(this), t.parent._checkLinksNeededToWork(), e.parent._checkLinksNeededToWork()
    }, z.prototype.getSerialized = function () {
        var t = {};
        return t.portIn = this.portIn.getName(), t.portOut = this.portOut.getName(), t.objIn = this.portIn.parent.id, t.objOut = this.portOut.parent.id, t
    }, z.canLinkText = function (t, e) {
        if (t.direction == e.direction) {
            var n = "(out)";
            return e.direction == F.PORT.PORT_DIR_IN && (n = "(in)"), "can not link: same direction " + n
        }
        return t.parent == e.parent ? "can not link: same op" : t.type != F.OP.OP_PORT_TYPE_DYNAMIC && e.type != F.OP.OP_PORT_TYPE_DYNAMIC && t.type != e.type ? "can not link: different type" : t ? e ? t.direction == F.PORT.PORT_DIR_IN && t.isAnimated() ? "can not link: is animated" : e.direction == F.PORT.PORT_DIR_IN && e.isAnimated() ? "can not link: is animated" : t.isLinkedTo(e) ? "ports already linked" : t.canLink && !t.canLink(e) || e.canLink && !e.canLink(t) ? "Incompatible" : "can link" : "can not link: port 2 invalid" : "can not link: port 1 invalid"
    }, z.canLink = function (t, e) {
        return !(!t || !e || t.direction == F.PORT.PORT_DIR_IN && t.isAnimated() || e.direction == F.PORT.PORT_DIR_IN && e.isAnimated() || t.isHidden() || e.isHidden() || t.isLinkedTo(e) || t.direction == e.direction || t.type != e.type && t.type != F.OP.OP_PORT_TYPE_DYNAMIC && e.type != F.OP.OP_PORT_TYPE_DYNAMIC || t.type != F.OP.OP_PORT_TYPE_DYNAMIC && e.type != F.OP.OP_PORT_TYPE_DYNAMIC && (t.parent == e.parent || t.canLink && !t.canLink(e) || e.canLink && !e.canLink(t)))
    };
    const G = function () {
        if (this.data = {}, this.objName = "", this.portsOut = [], this.portsIn = [], this.portsInData = [], this.opId = "", this.uiAttribs = {}, this.enabled = !0, this.patch = arguments[0], this.name = arguments[1], this.errors = {}, this._needsLinkedToWork = [], this._needsParentOp = null, this._shortOpName = "", arguments[1]) {
            if (this._shortOpName = arguments[1].split(".")[arguments[1].split(".").length - 1], this._shortOpName.indexOf(F.OP.OP_VERSION_PREFIX) > 0) {
                var t = this._shortOpName.split(F.OP.OP_VERSION_PREFIX)[1];
                this._shortOpName = this._shortOpName.substring(0, this._shortOpName.length - (F.OP.OP_VERSION_PREFIX + t).length)
            }
            this.uiAttribs.title = this._shortOpName
        }
        this.id = arguments[2] || _(), this.onAddPort = null, this.onCreate = null, this.onResize = null, this.onLoaded = null, this.onDelete = null, this.onUiAttrChange = null, this._eventCallbacks = {}, this._instances = null, this.preRender = null, this.init = null
    }; {
        G.prototype.clearUiAttrib = function (t) {
            this.uiAttrib({
                name: null
            })
        }, G.prototype.setTitle = function (t) {
            var e = this.name != t;
            this.name = t, this.uiAttr({
                title: t
            }), e && this.fireEvent("onTitleChange", t)
        };
        const t = function (t) {
            for (var e in this.uiAttribs || (this.uiAttribs = {}), t) this.uiAttribs[e] = t[e];
            this.fireEvent("onUiAttribsChange", t)
        };
        G.prototype.setUiAttrib = t, G.prototype.uiAttr = t, G.prototype.getName = function () {
            return this.uiAttribs.name ? this.uiAttribs.name : this.objName.split(".")
        }, G.prototype.addOutPort = function (t) {
            return t.direction = F.PORT.PORT_DIR_OUT, t.parent = this, this.portsOut.push(t), this.onAddPort && this.onAddPort(t), t
        }, G.prototype.hasPort = function (t) {
            for (var e = 0; e < this.portsIn.length; e++)
                if (this.portsIn[i].getName() == t) return !0;
            return !1
        }, G.prototype.hasDynamicPort = function () {
            var t = 0;
            for (t = 0; t < this.portsIn.length; t++) {
                if (this.portsIn[t].type == F.OP.OP_PORT_TYPE_DYNAMIC) return !0;
                if ("dyn" == this.portsIn[t].getName()) return !0
            }
            for (t = 0; t < this.portsOut.length; t++) {
                if (this.portsOut[t].type == F.OP.OP_PORT_TYPE_DYNAMIC) return !0;
                if ("dyn" == this.portsOut[t].getName()) return !0
            }
            return !1
        }, G.prototype.addInPort = function (t) {
            if (!(t instanceof C)) throw new Error("parameter is not a port!");
            return t.direction = F.PORT.PORT_DIR_IN, t.parent = this, this.portsIn.push(t), this.onAddPort && this.onAddPort(t), t
        }, G.prototype.inFunction = G.prototype.inTrigger = function (t, e) {
            var n = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_FUNCTION));
            return void 0 !== e && n.set(e), n
        }, G.prototype.inFunctionButton = G.prototype.inTriggerButton = function (t, e) {
            var n = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_FUNCTION, {
                display: "button"
            }));
            return void 0 !== e && n.set(e), n
        }, G.prototype.inValueFloat = G.prototype.inValue = G.prototype.inFloat = function (t, e) {
            var n = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_VALUE));
            return void 0 !== e && (n.set(e), n.defaultValue = e), n
        }, G.prototype.inValueBool = G.prototype.inBool = function (t, e) {
            var n = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_VALUE, {
                display: "bool"
            }));
            return void 0 !== e && (n.set(e), n.defaultValue = e), n
        }, G.prototype.inValueString = function (t, e) {
            var n = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_VALUE, {
                type: "string"
            }));
            return n.value = "", void 0 !== e && (n.set(e), n.defaultValue = e), n
        }, G.prototype.inString = function (t, e) {
            var n = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_STRING, {
                type: "string"
            }));
            return e = e || "", n.value = e, n.set(e), n.defaultValue = e, n
        }, G.prototype.inValueText = function (t, e) {
            var n = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_VALUE, {
                type: "string",
                display: "text"
            }));
            return n.value = "", void 0 !== e && (n.set(e), n.defaultValue = e), n
        }, G.prototype.inStringEditor = function (t, e, n) {
            var a = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_STRING, {
                type: "string",
                display: "editor",
                editorSyntax: n
            }));
            return a.value = "", void 0 !== e && (a.set(e), a.defaultValue = e), a
        }, G.prototype.inValueEditor = function (t, e, n) {
            var a = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_VALUE, {
                type: "string",
                display: "editor",
                editorSyntax: n
            }));
            return a.value = "", void 0 !== e && (a.set(e), a.defaultValue = e), a
        }, G.prototype.inValueSelect = G.prototype.inDropDown = function (t, e, n) {
            var a = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_VALUE, {
                display: "dropdown",
                hidePort: !0,
                values: e
            }));
            return void 0 !== n && (a.set(n), a.defaultValue = n), a
        }, G.prototype.inSwitch = function (t, e, n) {
            var a = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_STRING, {
                display: "switch",
                hidePort: !0,
                type: "string",
                values: e
            }));
            return void 0 !== n && (a.set(n), a.defaultValue = n), a
        }, G.prototype.inValueInt = G.prototype.inInt = function (t, e) {
            var n = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_VALUE, {
                increment: "integer"
            }));
            return void 0 !== e && (n.set(e), n.defaultValue = e), n
        }, G.prototype.inFile = function (t, e, n) {
            var a = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_VALUE, {
                display: "file",
                filter: e
            }));
            return void 0 !== n && (a.set(n), a.defaultValue = n), a
        }, G.prototype.inUrl = function (t, e, n) {
            var a = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_STRING, {
                display: "file",
                filter: e
            }));
            return void 0 !== n && (a.set(n), a.defaultValue = n), a
        }, G.prototype.inTexture = function (t, e) {
            var n = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_OBJECT, {
                display: "texture",
                preview: !0
            }));
            return void 0 !== e && n.set(e), n
        }, G.prototype.inObject = function (t, e, n) {
            var a = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_OBJECT, n));
            return void 0 !== e && a.set(e), a
        }, G.prototype.inGradient = function (t, e) {
            var n = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_VALUE, {
                display: "gradient",
                hidePort: !0
            }));
            return void 0 !== e && n.set(e), n
        }, G.prototype.inArray = function (t, e) {
            var n = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_ARRAY));
            return void 0 !== e && n.set(e), n
        }, G.prototype.inValueSlider = G.prototype.inFloatSlider = function (t, e) {
            var n = this.addInPort(new C(this, t, F.OP.OP_PORT_TYPE_VALUE, {
                display: "range"
            }));
            return void 0 !== e && (n.set(e), n.defaultValue = e), n
        }, G.prototype.outFunction = G.prototype.outTrigger = function (t, e) {
            var n = this.addOutPort(new C(this, t, F.OP.OP_PORT_TYPE_FUNCTION));
            return void 0 !== e && n.set(e), n
        }, G.prototype.outValue = G.prototype.outNumber = function (t, e) {
            var n = this.addOutPort(new C(this, t, F.OP.OP_PORT_TYPE_VALUE));
            return void 0 !== e && n.set(e), n
        }, G.prototype.outValueBool = G.prototype.outBool = function (t, e) {
            var n = this.addOutPort(new C(this, t, F.OP.OP_PORT_TYPE_VALUE, {
                display: "bool"
            }));
            return void 0 !== e ? n.set(e) : n.set(!1), n
        }, G.prototype.outValueString = function (t, e) {
            var n = this.addOutPort(new C(this, t, F.OP.OP_PORT_TYPE_VALUE, {
                type: "string"
            }));
            return void 0 !== e && n.set(e), n
        }, G.prototype.outString = function (t, e) {
            var n = this.addOutPort(new C(this, t, F.OP.OP_PORT_TYPE_STRING, {
                type: "string"
            }));
            return void 0 !== e ? n.set(e) : n.set(""), n
        }, G.prototype.outObject = function (t, e) {
            var n = this.addOutPort(new C(this, t, F.OP.OP_PORT_TYPE_OBJECT));
            return void 0 !== e && n.set(e), n.ignoreValueSerialize = !0, n
        }, G.prototype.outArray = function (t, e) {
            var n = this.addOutPort(new C(this, t, F.OP.OP_PORT_TYPE_ARRAY));
            return void 0 !== e && n.set(e), n.ignoreValueSerialize = !0, n
        }, G.prototype.outTexture = function (t, e) {
            var n = this.addOutPort(new C(this, t, F.OP.OP_PORT_TYPE_OBJECT, {
                preview: !0
            }));
            return void 0 !== e && n.set(e), n.ignoreValueSerialize = !0, n
        }, G.prototype.inDynamic = function (t, e, n, a) {
            var i = new C(this, t, F.OP.OP_PORT_TYPE_DYNAMIC, n);
            return i.shouldLink = function (t, n) {
                if (e && g.isArray(e)) {
                    for (var a = 0; a < e.length; a++) {
                        if (t == this && n.type === e[a]) return !0;
                        if (n == this && t.type === e[a]) return !0
                    }
                    return !1
                }
                return !0
            }, this.addInPort(i), void 0 !== a && (i.set(a), i.defaultValue = a), i
        }, G.prototype.printInfo = function () {
            for (var t = 0; t < this.portsIn.length; t++) console.log("in: " + this.portsIn[t].getName());
            for (var e in this.portsOut) console.log("out: " + this.portsOut[e].getName())
        }, G.prototype.getOutChilds = function () {
            var t = [];
            for (var e in this.portsOut)
                for (var n in this.portsOut[e].links) this.portsOut[e].type == F.OP.OP_PORT_TYPE_FUNCTION && t.push(this.portsOut[e].links[n].portIn.parent);
            return t
        }, G.prototype.markChilds = function () {
            for (var t in this.marked = !0, this.portsOut)
                for (var e in this.portsOut[t].links) this.portsOut[t].parent.marked = !0, this.portsOut[t].links[e].portIn.parent != this && this.portsOut[t].links[e].portIn.parent.markChilds()
        }, G.prototype.deleteChilds = function () {
            var t = [];
            for (var e in this.portsOut)
                for (var n in this.portsOut[e].links) this.portsOut[e].links[n].portIn.parent != this && (this.portsOut[e].parent != this && t.push(this.portsOut[e].parent), t.push(this.portsOut[e].links[n].portIn.parent), this.portsOut[e].links[n].portIn.parent.deleteChilds());
            for (var a in t) this.patch.deleteOp(t[a].id)
        }, G.prototype.removeLinks = function () {
            for (var t = 0; t < this.portsIn.length; t++) this.portsIn[t].removeLinks();
            for (var e = 0; e < this.portsOut.length; e++) this.portsOut[e].removeLinks()
        }, G.prototype.countFittingPorts = function (t) {
            var e = 0;
            for (var n in this.portsOut) z.canLink(t, this.portsOut[n]) && e++;
            for (var a in this.portsIn) z.canLink(t, this.portsIn[a]) && e++;
            return e
        }, G.prototype.findFittingPort = function (t) {
            for (var e in this.portsOut)
                if (z.canLink(t, this.portsOut[e])) return this.portsOut[e];
            for (var n in this.portsIn)
                if (z.canLink(t, this.portsIn[n])) return this.portsIn[n]
        }, G.prototype.getSerialized = function () {
            var t = {};
            this.opId && (t.opId = this.opId), t.objName = this.objName, t.id = this.id, t.uiAttribs = this.uiAttribs, this.uiAttribs.title == this._shortOpName && delete this.uiAttribs.title, this.uiAttribs.hasOwnProperty("working") && 1 == this.uiAttribs.working && delete this.uiAttribs.working, t.portsIn = [], t.portsOut = [];
            for (var e = 0; e < this.portsIn.length; e++) t.portsIn.push(this.portsIn[e].getSerialized());
            for (var n in this.portsOut) t.portsOut.push(this.portsOut[n].getSerialized());
            return t
        }, G.prototype.getFirstOutPortByType = function (t) {
            for (var e in this.portsOut)
                if (this.portsOut[e].type == t) return this.portsOut[e]
        }, G.prototype.getPort = G.prototype.getPortByName = function (t) {
            for (var e = 0; e < this.portsIn.length; e++)
                if (this.portsIn[e].getName() == t) return this.portsIn[e];
            for (var n = 0; n < this.portsOut.length; n++)
                if (this.portsOut[n].getName() == t) return this.portsOut[n]
        }, G.prototype.getPortById = function (t) {
            for (var e = 0; e < this.portsIn.length; e++)
                if (this.portsIn[e].id == t) return this.portsIn[e];
            for (var n = 0; n < this.portsOut.length; n++)
                if (this.portsOut[n].id == t) return this.portsOut[n]
        }, G.prototype.updateAnims = function () {
            for (var t = 0; t < this.portsIn.length; t++) this.portsIn[t].updateAnim()
        }, G.prototype.log = function () {
            this.patch.silent || Function.prototype.apply.apply(console.log, [console, arguments])
        }, G.prototype.error = function () {
            this.patch.silent || Function.prototype.apply.apply(console.error, [console, arguments])
        }, G.prototype.warn = function () {
            this.patch.silent || Function.prototype.apply.apply(console.warn, [console, arguments])
        }, G.prototype.undoUnLinkTemporary = function () {
            if (this.shakeLink && this.shakeLink.remove(), this.shakeLink = null, this.oldLinks) {
                for (var t = 0; t < this.oldLinks.length; t++) this.patch.link(this.oldLinks[t].in.parent, this.oldLinks[t].in.getName(), this.oldLinks[t].out.parent, this.oldLinks[t].out.getName());
                this.oldLinks.length = 0
            }
        }, G.prototype.unLink = function () {
            for (var t = 0; t < this.portsOut.length; t++) this.portsOut[t].removeLinks();
            for (var e = 0; e < this.portsIn.length; e++) this.portsIn[e].removeLinks()
        }, G.unLinkTempReLinkP1 = null, G.unLinkTempReLinkP2 = null, G.prototype.unLinkTemporary = function () {
            var t = 0;
            this.shakeLink = null, this.oldLinks = [], this.portsIn.length > 0 && this.portsIn[0].isLinked() && this.portsOut.length > 0 && this.portsOut[0].isLinked() && this.portsIn[0].getType() == this.portsOut[0].getType() && (G.unLinkTempReLinkP1 = this.portsIn[0].links[0].getOtherPort(this.portsIn[0]), G.unLinkTempReLinkP2 = this.portsOut[0].links[0].getOtherPort(this.portsOut[0]));
            for (var e = 0; e < this.portsIn.length; e++)
                for (t = 0; t < this.portsIn[e].links.length; t++) this.oldLinks.push({
                    in: this.portsIn[e].links[t].portIn,
                    out: this.portsIn[e].links[t].portOut
                });
            for (var n = 0; n < this.portsOut.length; n++)
                for (t = 0; t < this.portsOut[n].links.length; t++) this.oldLinks.push({
                    in: this.portsOut[n].links[t].portIn,
                    out: this.portsOut[n].links[t].portOut
                });
            this.unLink(), G.unLinkTempReLinkP1 && G.unLinkTempReLinkP2 && (this.shakeLink = this.patch.link(G.unLinkTempReLinkP1.parent, G.unLinkTempReLinkP1.getName(), G.unLinkTempReLinkP2.parent, G.unLinkTempReLinkP2.getName()))
        }, G.prototype.profile = function (t) {
            for (var e = 0; e < this.portsIn.length; e++) this.portsIn[e]._onTriggered = this.portsIn[e]._onTriggeredProfiling
        }, G.prototype.findParent = function (t) {
            for (var e = 0; e < this.portsIn.length; e++)
                if (this.portsIn[e].isLinked()) {
                    if (this.portsIn[e].links[0].portOut.parent.objName == t) return this.portsIn[e].links[0].portOut.parent;
                    var n;
                    if (n = this.portsIn[e].links[0].portOut.parent.findParent(t)) return n
                } return null
        }, G.prototype.cleanUp = function () {
            if (this._instances) {
                for (var t = 0; t < this._instances.length; t++) this._instances[t].onDelete && this._instances[t].onDelete();
                this._instances.length = 0
            }
        }, G.prototype.instanced = function (t) {
            if (0 === this.patch.instancing.numCycles()) return !1;
            var e = 0,
                n = 0;
            if (!this._instances || this._instances.length != this.patch.instancing.numCycles()) {
                for (this._instances || (this._instances = []), console.log("creating instances of ", this.objName, this.patch.instancing.numCycles(), this._instances.length), this._instances.length = this.patch.instancing.numCycles(), e = 0; e < this._instances.length; e++) {
                    this._instances[e] = this.patch.createOp(this.objName, !0), this._instances[e].instanced = function () {
                        return !1
                    }, this._instances[e].uiAttr(this.uiAttribs);
                    for (var a = 0; a < this.portsOut.length; a++) this.portsOut[a].type == F.OP.OP_PORT_TYPE_FUNCTION && (this._instances[e].getPortByName(this.portsOut[a].name).trigger = this.portsOut[a].trigger.bind(this.portsOut[a]))
                }
                for (n = 0; n < this.portsIn.length; n++) this.portsIn[n].onChange = null, this.portsIn[n].onValueChanged = null
            }
            for (n = 0; n < this.portsIn.length; n++) this.portsIn[n].type != F.OP.OP_PORT_TYPE_VALUE && this.portsIn[n].type != F.OP.OP_PORT_TYPE_ARRAY || this._instances[this.patch.instancing.index()].portsIn[n].set(this.portsIn[n].get()), this.portsIn[n].type, F.OP.OP_PORT_TYPE_FUNCTION;
            for (n = 0; n < this.portsOut.length; n++) this.portsOut[n].type == F.OP.OP_PORT_TYPE_VALUE && this.portsOut[n].set(this._instances[this.patch.instancing.index()].portsOut[n].get());
            return !0
        }, G.prototype.initInstancable = function () {}, G.prototype.setValues = function (t) {
            for (var e in t) {
                var n = this.getPortByName(e);
                n ? n.set(t[e]) : console.log("op.setValues: port not found:", e)
            }
        }, G.prototype.error = function (t, e) {
            this.errors[t] = e, null == e && delete this.errors[t];
            var n = "";
            for (var a in this.errors) n += "- " + this.errors[a] + "<br/>";
            this.uiAttr({
                error: n
            })
        }, G.prototype.addListener = G.prototype.addEventListener = function (t, e) {
            this._eventCallbacks[t] ? this._eventCallbacks[t].push(e) : this._eventCallbacks[t] = [e]
        }, G.prototype.hasEventListener = function (t, e) {
            if (t && e) {
                if (this._eventCallbacks[t]) return -1 != this._eventCallbacks[t].indexOf(e)
            } else console.log("hasListener: missing parameters")
        }, G.prototype.removeEventListener = function (t, e) {
            if (this._eventCallbacks[t]) {
                var n = this._eventCallbacks[t].indexOf(e); - 1 == n ? console.log("eventlistener " + t + " not found...") : this._eventCallbacks[t].slice(n)
            }
        }, G.prototype.fireEvent = function (t, e) {
            if (this._eventCallbacks[t])
                for (var n = 0; n < this._eventCallbacks[t].length; n++) this._eventCallbacks[t][n] && this._eventCallbacks[t][n](e);
            this.onUiAttrChange && "onUiAttribsChange" == t && this.onUiAttrChange(e)
        }, G.prototype.setEnabled = function (t) {
            this.enabled = t, this.fireEvent("onEnabledChange", t)
        }, G.prototype.setPortGroup = function (t, e) {
            for (var n = 0; n < e.length; n++) e[n] && e[n].setUiAttribs ? e[n].setUiAttribs({
                group: t
            }) : console.error("setPortGroup: invalid port!")
        }, G.prototype.setUiAxisPorts = function (t, e, n) {
            t && t.setUiAttribs({
                axis: "X"
            }), e && e.setUiAttribs({
                axis: "Y"
            }), n && n.setUiAttribs({
                axis: "Z"
            })
        }, G.prototype.removePort = function (t) {
            for (var e = 0; e < this.portsIn.length; e++)
                if (this.portsIn[e] == t) return this.portsIn.splice(e, 1), this.fireEvent("onUiAttribsChange", {}), void this.fireEvent("onPortRemoved", {})
        }, G.prototype.checkLinkTimeWarnings = function () {
            function t(e, n, a) {
                for (var i = 0; i < e.portsIn.length; i++)
                    if (e.portsIn[i].type == n && e.portsIn[i].isLinked())
                        for (var r = e.portsIn[i], s = 0; s < r.links.length; s++)
                            if (r.links[s]) {
                                if (r.links[s].portOut.parent.objName.indexOf(a) > -1) return !0;
                                if (t(r.links[s].portOut.parent, n, a)) return !0
                            } return !1
            }
            var e, n = null,
                a = !0;
            if (a && 0 == this.objName.indexOf("Ops.Gl.TextureEffects") && (e = this).portsIn.length > 0 && e.portsIn[0].type == F.OP.OP_PORT_TYPE_FUNCTION && -1 == this.objName.indexOf("TextureEffects.ImageCompose") && ((a = t(this, F.OP.OP_PORT_TYPE_FUNCTION, "TextureEffects.ImageCompose")) || (n = CABLES.UI.TEXTS.working_connected_to + "ImageCompose")), this._needsParentOp && a && ((a = t(this, F.OP.OP_PORT_TYPE_OBJECT, this._needsParentOp)) || (n = CABLES.UI.TEXTS.working_connected_to + this._needsParentOp)), this._needsLinkedToWork.length > 0)
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
        }, G.prototype._checkLinksNeededToWork = function () {}, G.prototype.toWorkNeedsParent = function (t) {
            this.patch.isEditorMode() && (this._needsParentOp = t)
        }, G.prototype.toWorkPortsNeedToBeLinked = function () {
            if (this.patch.isEditorMode())
                for (var t = 0; t < arguments.length; t++) - 1 == this._needsLinkedToWork.indexOf(arguments[t]) && this._needsLinkedToWork.push(arguments[t])
        }, G.prototype.toWorkPortsNeedToBeLinkedReset = function () {
            this.patch.isEditorMode() && (this._needsLinkedToWork.length = 0, this.checkLinkTimeWarnings())
        }, G.prototype.refreshParams = function () {
            CABLES.UI && gui && gui.patch().refreshOpParams(this)
        }
    }
    G.getNamespaceClassName = function (t) {
        return t ? t.startsWith("Ops.Gl") ? "gl" : t.startsWith("Ops.WebAudio") ? "audio" : t.startsWith("Ops.Devices") ? "devices" : t.startsWith("Ops.Html") ? "html" : t.startsWith("Ops.Sidebar") ? "html" : t.startsWith("Ops.Math") ? "math" : t.startsWith("Ops.User") ? "user" : "default" : "default"
    }, G.isSubpatchOp = function (t) {
        return "Ops.Ui.Patch" == t || "Ops.Ui.SubPatch" == t
    };
    const W = new function () {
        this.profileUniformCount = 0, this.profileShaderBinds = 0, this.profileUniformCount = 0, this.profileShaderCompiles = 0, this.profileVideosPlaying = 0, this.profileMVPMatrixCount = 0, this.profileEffectBuffercreate = 0
    };
    var H = null,
        Y = null,
        X = null,
        q = null;
    const K = function (t, e) {
        if (!t) throw "no cgl";
        this._cgl = t, this.tex = this._cgl.gl.createTexture(), this.id = _(), this.width = 0, this.height = 0, this.flip = !0, this.shadowMap = !1, this.filter = K.FILTER_NEAREST, this.wrap = K.WRAP_CLAMP_TO_EDGE, this.texTarget = this._cgl.gl.TEXTURE_2D, e && e.type && (this.texTarget = e.type), this.textureType = K.TYPE_DEFAULT, this.unpackAlpha = !0, this._fromData = !0, this.name = "unknown", e ? (this.name = e.name || this.name, e.isDepthTexture && (this.textureType = K.TYPE_DEPTH), e.isFloatingPointTexture && (this.textureType = K.TYPE_FLOAT), "textureType" in e && (this.textureType = e.textureType), "filter" in e && (this.filter = e.filter), "wrap" in e && (this.wrap = e.wrap), "unpackAlpha" in e && (this.unpackAlpha = e.unpackAlpha), "flip" in e && (this.flip = e.flip), "shadowMap" in e && (this.shadowMap = e.shadowMap)) : e = {
            width: 8,
            height: 8
        }, this.setSize(e.width, e.height)
    };
    K.prototype.compareSettings = function (t) {
        return !!t && t.width == this.width && t.height == this.height && t.filter == this.filter && t.wrap == this.wrap && t.textureType == this.textureType && t.unpackAlpha == this.unpackAlpha && t.flip == this.flip
    }, K.prototype.clone = function () {
        var t = new K(this._cgl, {
            name: this.name,
            filter: this.filter,
            wrap: this.wrap,
            textureType: this.textureType,
            unpackAlpha: this.unpackAlpha,
            flip: this.flip,
            width: this.width,
            height: this.height
        });
        return this.compareSettings(t) || (console.error("Cloned texture settings do not compare!"), console.log(this), console.log(t)), t
    }, K.prototype.setSize = function (t, e) {
        if ((t != t || t <= 0 || !t) && (t = 8), (e != e || e <= 0 || !e) && (e = 8), t = Math.floor(t), e = Math.floor(e), this.width != t || this.height != e) {
            if (this.width = t, this.height = e, this._cgl.gl.bindTexture(this.texTarget, this.tex), W.profileTextureResize++, this.textureType == K.TYPE_FLOAT && (this.filter = K.FILTER_NEAREST), this._setFilter(), this.textureType == K.TYPE_FLOAT)
                if (1 == this._cgl.glVersion)
                    if (this._cgl.glUseHalfFloatTex) {
                        var n = this._cgl.gl.getExtension("OES_texture_half_float");
                        if (1 == this._cgl.glVersion && !n) throw "no half float texture extension";
                        this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA, t, e, 0, this._cgl.gl.RGBA, n.HALF_FLOAT_OES, null)
                    } else n = this._cgl.gl.getExtension("OES_texture_float"), this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA, t, e, 0, this._cgl.gl.RGBA, this._cgl.gl.FLOAT, null);
            else this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA32F, t, e, 0, this._cgl.gl.RGBA, this._cgl.gl.FLOAT, null);
            else if (this.textureType == K.TYPE_DEPTH)
                if (1 == this._cgl.glVersion) {
                    var a = this._cgl.gl.DEPTH_COMPONENT;
                    this._cgl.gl.texImage2D(this.texTarget, 0, a, t, e, 0, this._cgl.gl.DEPTH_COMPONENT, this._cgl.gl.UNSIGNED_SHORT, null)
                } else a = this._cgl.gl.DEPTH_COMPONENT32F, this._cgl.gl.texImage2D(this.texTarget, 0, a, t, e, 0, this._cgl.gl.DEPTH_COMPONENT, this._cgl.gl.FLOAT, null);
            else this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA, t, e, 0, this._cgl.gl.RGBA, this._cgl.gl.UNSIGNED_BYTE, null);
            this.updateMipMap(), this._cgl.gl.bindTexture(this.texTarget, null)
        }
    }, K.prototype.initFromData = function (t, e, n, a, i) {
        this.filter = a, this.wrap = i, null == a && (this.filter = K.FILTER_LINEAR), null == i && (this.wrap = K.CLAMP_TO_EDGE), this.width = e, this.height = n, this._fromData = !0, this._cgl.gl.bindTexture(this.texTarget, this.tex), this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA, e, n, 0, this._cgl.gl.RGBA, this._cgl.gl.UNSIGNED_BYTE, t), this._setFilter(), this.updateMipMap(), this._cgl.gl.bindTexture(this.texTarget, null)
    }, K.prototype.updateMipMap = function () {
        2 != this._cgl.glVersion && !this.isPowerOfTwo() || this.filter != K.FILTER_MIPMAP || this._cgl.gl.generateMipmap(this.texTarget)
    }, K.prototype.initTexture = function (t, e) {
        this._fromData = !1, this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.unpackAlpha), t.width && (this.width = t.width), t.height && (this.height = t.height), e && (this.filter = e), this._cgl.gl.bindTexture(this.texTarget, this.tex), this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_FLIP_Y_WEBGL, !this.flip), this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA, this._cgl.gl.RGBA, this._cgl.gl.UNSIGNED_BYTE, t), this._setFilter(), this.updateMipMap(), this._cgl.gl.bindTexture(this.texTarget, null), this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1)
    }, K.prototype.delete = function () {
        W.profileTextureDelete++, this._cgl.gl.deleteTexture(this.tex)
    }, K.prototype.isPowerOfTwo = function () {
        return K.isPowerOfTwo(this.width) && K.isPowerOfTwo(this.height)
    }, K.prototype.printInfo = function () {
        console.log(this.getInfo())
    }, K.prototype.getInfoReadable = function () {
        var t = this.getInfo(),
            e = "";
        for (var n in t.name = t.name.substr(0, t.name.indexOf("?rnd=")), t) e += "* " + n + ":  **" + t[n] + "**\n";
        return e
    }, K.prototype.getInfo = function () {
        var t = {};
        t.name = this.name, t["power of two"] = this.isPowerOfTwo(), t.size = this.width + " x " + this.height;
        var e = this.texTarget;
        return this.texTarget == this._cgl.gl.TEXTURE_2D && (e = "TEXTURE_2D"), t.target = e, t.unpackAlpha = this.unpackAlpha, this.textureType == K.TYPE_FLOAT ? t.textureType = "TYPE_FLOAT" : this.textureType == K.TYPE_DEPTH ? t.textureType = "TYPE_DEPTH" : this.textureType == K.TYPE_DEFAULT ? t.textureType = "TYPE_DEFAULT" : t.textureType = "UNKNOWN", this.wrap == K.WRAP_CLAMP_TO_EDGE ? t.wrap = "CLAMP_TO_EDGE" : this.wrap == K.WRAP_REPEAT ? t.wrap = "WRAP_REPEAT" : this.wrap == K.WRAP_MIRRORED_REPEAT ? t.wrap = "WRAP_MIRRORED_REPEAT" : t.wrap = "UNKNOWN", this.filter == K.FILTER_NEAREST ? t.filter = "FILTER_NEAREST" : this.filter == K.FILTER_LINEAR ? t.filter = "FILTER_LINEAR" : this.filter == K.FILTER_MIPMAP ? t.filter = "FILTER_MIPMAP" : t.filter = "UNKNOWN", t
    }, K.prototype._setFilter = function () {
        if (this._fromData || this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.unpackAlpha), this.shadowMap && (console.log("shadowmap tex"), this._cgl.gl.texParameteri(this._cgl.gl.TEXTURE_2D, this._cgl.gl.TEXTURE_COMPARE_MODE, this._cgl.gl.COMPARE_REF_TO_TEXTURE), this._cgl.gl.texParameteri(this._cgl.gl.TEXTURE_2D, this._cgl.gl.TEXTURE_COMPARE_FUNC, this._cgl.gl.LEQUAL)), 1 != this._cgl.glVersion || this.isPowerOfTwo())
            if (this.wrap == K.WRAP_CLAMP_TO_EDGE ? (this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_S, this._cgl.gl.CLAMP_TO_EDGE), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_T, this._cgl.gl.CLAMP_TO_EDGE)) : this.wrap == K.WRAP_REPEAT ? (this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_S, this._cgl.gl.REPEAT), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_T, this._cgl.gl.REPEAT)) : this.wrap == K.WRAP_MIRRORED_REPEAT && (this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_S, this._cgl.gl.MIRRORED_REPEAT), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_T, this._cgl.gl.MIRRORED_REPEAT)), this.filter == K.FILTER_NEAREST) this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MAG_FILTER, this._cgl.gl.NEAREST), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MIN_FILTER, this._cgl.gl.NEAREST);
            else if (this.filter == K.FILTER_LINEAR) this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MIN_FILTER, this._cgl.gl.LINEAR), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MAG_FILTER, this._cgl.gl.LINEAR);
        else {
            if (this.filter != K.FILTER_MIPMAP) throw console.log("unknown texture filter!", this.filter), new Error("unknown texture filter!" + this.filter);
            this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MAG_FILTER, this._cgl.gl.LINEAR), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MIN_FILTER, this._cgl.gl.LINEAR_MIPMAP_LINEAR)
        } else this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MAG_FILTER, this._cgl.gl.NEAREST), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MIN_FILTER, this._cgl.gl.NEAREST), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_S, this._cgl.gl.CLAMP_TO_EDGE), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_T, this._cgl.gl.CLAMP_TO_EDGE), this.filter = K.FILTER_NEAREST, this.wrap = K.WRAP_CLAMP_TO_EDGE
    }, K.load = function (t, e, n, a) {
        var i = t.patch.loading.start("texture", e),
            r = new K(t);
        return r.name = e, CABLES.UI && gui.jobs().start({
            id: "loadtexture" + i,
            title: "loading texture (" + e + ")"
        }), r.image = new Image, r.image.crossOrigin = "", a && a.hasOwnProperty("filter") && (r.filter = a.filter), a && a.hasOwnProperty("flip") && (r.flip = a.flip), a && a.hasOwnProperty("wrap") && (r.wrap = a.wrap), a && a.hasOwnProperty("unpackAlpha") && (r.unpackAlpha = a.unpackAlpha), r.image.onabort = r.image.onerror = function (e) {
            console.warn("[cgl.texture.load] error loading texture", e), t.patch.loading.finished(i), n && n({
                error: !0
            }), CABLES.UI && gui.jobs().finish("loadtexture" + i)
        }, r.image.onload = function (e) {
            r.initTexture(r.image), t.patch.loading.finished(i), CABLES.UI && gui.jobs().finish("loadtexture" + i), n && n()
        }, r.image.src = e, r
    }, K.getTempTexture = function (t) {
        return H || (H = K.getTemporaryTexture(t, 256, K.FILTER_LINEAR, K.REPEAT)), H
    }, K.getEmptyTexture = function (t) {
        if (Y) return Y;
        Y = new K(t);
        var e = new Uint8Array(256);
        return Y.initFromData(e, 8, 8, K.FILTER_NEAREST, K.WRAP_REPEAT), Y
    }, K.getRandomTexture = function (t) {
        if (X) return X;
        const e = new Uint8Array(262144);
        for (var n = 0; n < 65536; n++) e[4 * n + 0] = 255 * Math.random(), e[4 * n + 1] = 255 * Math.random(), e[4 * n + 2] = 255 * Math.random(), e[4 * n + 3] = 255;
        return (X = new K(t)).initFromData(e, 256, 256, K.FILTER_NEAREST, K.WRAP_REPEAT), X
    }, K.getTempGradientTexture = function (t) {
        if (q) return q;
        for (var e = new K(t), n = new Uint8Array(262144), a = 0; a < 256; a++)
            for (var i = 0; i < 256; i++) n[4 * (i + 256 * a) + 0] = n[4 * (i + 256 * a) + 1] = n[4 * (i + 256 * a) + 2] = 255 - a, n[4 * (i + 256 * a) + 3] = 255;
        return e.initFromData(n, 256, 256, K.FILTER_NEAREST, K.WRAP_REPEAT), q = e, e
    }, K.getTemporaryTexture = function (t, e, n, a) {
        for (var i = new K(t), r = [], s = 0; s < e; s++)
            for (var o = 0; o < e; o++)(o + s) % 64 < 32 ? (r.push(200 + s / e * 25 + o / e * 25), r.push(200 + s / e * 25 + o / e * 25), r.push(200 + s / e * 25 + o / e * 25)) : (r.push(40 + s / e * 25 + o / e * 25), r.push(40 + s / e * 25 + o / e * 25), r.push(40 + s / e * 25 + o / e * 25)), r.push(255);
        var l = new Uint8Array(r);
        return i.initFromData(l, e, e, n, a), i
    }, K.createFromImage = function (t, e, n) {
        var a = new K(t, n);
        return a.flip = !1, a.image = e, a.width = e.width, a.height = e.height, a.initTexture(e, n.filter), a
    }, K.fromImage = function (t, e, n, a) {
        console.error("deprecated texture from image...");
        var i = new K(t);
        return i.flip = !1, n && (i.filter = n), a && (i.wrap = a), i.image = e, i.initTexture(e), i
    }, K.isPowerOfTwo = function (t) {
        return 1 == t || 2 == t || 4 == t || 8 == t || 16 == t || 32 == t || 64 == t || 128 == t || 256 == t || 512 == t || 1024 == t || 2048 == t || 4096 == t || 8192 == t || 16384 == t
    }, K.FILTER_NEAREST = 0, K.FILTER_LINEAR = 1, K.FILTER_MIPMAP = 2, K.WRAP_REPEAT = 0, K.WRAP_MIRRORED_REPEAT = 1, K.WRAP_CLAMP_TO_EDGE = 2, K.TYPE_DEFAULT = 0, K.TYPE_DEPTH = 1, K.TYPE_FLOAT = 2;
    const Q = function (t, e, n, a) {
        this.Framebuffer2DrawTargetsDefault = null, this.Framebuffer2BlittingFramebuffer = null, this.Framebuffer2FinalFramebuffer = null, this._cgl = t, this._width = 0, this._height = 0, this._depthRenderbuffer = null, this._frameBuffer = null, this._textureFrameBuffer = null, this._colorRenderbuffers = [], this._drawTargetArray = [], this.Framebuffer2BlittingFramebuffer || (this.Framebuffer2BlittingFramebuffer = t.gl.createFramebuffer()), this.Framebuffer2FinalFramebuffer || (this.Framebuffer2FinalFramebuffer = t.gl.createFramebuffer()), this.Framebuffer2DrawTargetsDefault || (this.Framebuffer2DrawTargetsDefault = [t.gl.COLOR_ATTACHMENT0]), this._options = a || {
            isFloatingPointTexture: !1
        }, this._options.hasOwnProperty("numRenderBuffers") || (this._options.numRenderBuffers = 1), this._options.hasOwnProperty("depth") || (this._options.depth = !0), this._options.hasOwnProperty("clear") || (this._options.clear = !0), this._options.hasOwnProperty("multisampling") || (this._options.multisampling = !1, this._options.multisamplingSamples = 0), this._options.multisamplingSamples && (this._cgl.gl.MAX_SAMPLES ? this._options.multisamplingSamples = Math.min(this._cgl.gl.getParameter(this._cgl.gl.MAX_SAMPLES), this._options.multisamplingSamples) : this._options.multisamplingSamples = 0), this._options.hasOwnProperty("filter") || (this._options.filter = K.FILTER_LINEAR), this._numRenderBuffers = this._options.numRenderBuffers, this._colorTextures = [];
        for (var i = 0; i < this._numRenderBuffers; i++) this._colorTextures[i] = new K(t, {
            name: "framebuffer2 texture " + i,
            isFloatingPointTexture: this._options.isFloatingPointTexture,
            filter: this._options.filter,
            wrap: this._options.wrap
        });
        var r = K.FILTER_NEAREST;
        this._options.shadowMap && (r = K.FILTER_LINEAR), this._textureDepth = new K(t, {
            name: "framebuffer2 depth texture",
            isDepthTexture: !0,
            filter: r,
            shadowMap: this._options.shadowMap || !1
        }), this.setSize(e || 512, n || 512)
    };
    Q.prototype.getWidth = function () {
        return this._width
    }, Q.prototype.getHeight = function () {
        return this._height
    }, Q.prototype.getGlFrameBuffer = function () {
        return this._frameBuffer
    }, Q.prototype.getDepthRenderBuffer = function () {
        return this._depthRenderbuffer
    }, Q.prototype.getTextureColor = function () {
        return this._colorTextures[0]
    }, Q.prototype.getTextureColorNum = function (t) {
        return this._colorTextures[t]
    }, Q.prototype.getTextureDepth = function () {
        return this._textureDepth
    }, Q.prototype.setFilter = function (t) {
        for (var e = 0; e < this._numRenderBuffers; e++) this._colorTextures[e].filter = t, this._colorTextures[e].setSize(this._width, this._height)
    }, Q.prototype.delete = Q.prototype.dispose = function () {
        for (var t = 0; t < this._numRenderBuffers; t++) this._colorTextures[t].delete();
        for (this._textureDepth.delete(), t = 0; t < this._numRenderBuffers; t++) this._cgl.gl.deleteRenderbuffer(this._colorRenderbuffers[t]);
        this._cgl.gl.deleteRenderbuffer(this._depthRenderbuffer), this._cgl.gl.deleteFramebuffer(this._frameBuffer), this._cgl.gl.deleteFramebuffer(this._textureFrameBuffer)
    }, Q.prototype.setSize = function (t, e) {
        if (this._width = Math.floor(t), this._height = Math.floor(e), W.profileFrameBuffercreate++, this._frameBuffer) {
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
                throw console.log("FRAMEBUFFER_INCOMPLETE_ATTACHMENT..."), new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
            case this._cgl.gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                throw console.log("FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT"), new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
            case this._cgl.gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                throw console.log("FRAMEBUFFER_INCOMPLETE_DIMENSIONS"), new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
            case this._cgl.gl.FRAMEBUFFER_UNSUPPORTED:
                throw console.log("FRAMEBUFFER_UNSUPPORTED"), new Error("Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED");
            default:
                throw console.log("incomplete framebuffer", r), new Error("Incomplete framebuffer: " + r)
        }
        this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, null)
    }, Q.prototype.renderStart = function () {
        this._cgl.pushModelMatrix(), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuffer), this._cgl.pushGlFrameBuffer(this._frameBuffer), this._cgl.pushFrameBuffer(this), this._cgl.pushPMatrix(), this._cgl.gl.viewport(0, 0, this._width, this._height), this._cgl.gl.drawBuffers(this._drawTargetArray), this._options.clear && (this._cgl.gl.clearColor(0, 0, 0, 0), this._cgl.gl.clear(this._cgl.gl.COLOR_BUFFER_BIT | this._cgl.gl.DEPTH_BUFFER_BIT))
    }, Q.prototype.renderEnd = function () {
        if (this._cgl.popPMatrix(), this._numRenderBuffers <= 1) this._cgl.gl.bindFramebuffer(this._cgl.gl.READ_FRAMEBUFFER, this._frameBuffer), this._cgl.gl.bindFramebuffer(this._cgl.gl.DRAW_FRAMEBUFFER, this._textureFrameBuffer), this._cgl.gl.clearBufferfv(this._cgl.gl.COLOR, 0, [0, 0, 0, 1]), this._cgl.gl.blitFramebuffer(0, 0, this._width, this._height, 0, 0, this._width, this._height, this._cgl.gl.COLOR_BUFFER_BIT | this._cgl.gl.DEPTH_BUFFER_BIT, this._cgl.gl.NEAREST);
        else {
            this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this.Framebuffer2BlittingFramebuffer), this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.RENDERBUFFER, this._depthRenderbuffer), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this.Framebuffer2FinalFramebuffer), this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.TEXTURE_2D, this._textureDepth.tex, 0);
            for (var t = 0; t < this._numRenderBuffers; t++) {
                this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this.Framebuffer2BlittingFramebuffer), this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.RENDERBUFFER, this._colorRenderbuffers[t]), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this.Framebuffer2FinalFramebuffer), this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.TEXTURE_2D, this._colorTextures[t].tex, 0), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null), this._cgl.gl.bindFramebuffer(this._cgl.gl.READ_FRAMEBUFFER, this.Framebuffer2BlittingFramebuffer), this._cgl.gl.bindFramebuffer(this._cgl.gl.DRAW_FRAMEBUFFER, this.Framebuffer2FinalFramebuffer), this._cgl.gl.clearBufferfv(this._cgl.gl.COLOR, 0, [0, 0, 0, 1]);
                var e = this._cgl.gl.COLOR_BUFFER_BIT;
                0 == t && (e |= this._cgl.gl.DEPTH_BUFFER_BIT), this._cgl.gl.blitFramebuffer(0, 0, this._width, this._height, 0, 0, this._width, this._height, e, this._cgl.gl.NEAREST)
            }
        }
        if (this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.popGlFrameBuffer()), this._cgl.popFrameBuffer(), this._cgl.popModelMatrix(), this._cgl.resetViewPort(), this._colorTextures[0].filter == K.FILTER_MIPMAP)
            for (t = 0; t < this._numRenderBuffers; t++) this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, this._colorTextures[t].tex), this._colorTextures[t].updateMipMap(), this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, null)
    };
    const Z = function (t) {
        this.name = t, this.faceVertCount = 3, this._vertices = [], this.verticesIndices = [], this.texCoords = new Float32Array, this.texCoordsIndices = [], this.vertexNormals = [], this.tangents = [], this.biTangents = [], this.barycentrics = [], this.morphTargets = [], this.vertexColors = [], this._attributes = {}, Object.defineProperty(this, "vertices", {
            get() {
                return this._vertices
            },
            set(t) {
                this.setVertices(t)
            }
        })
    };
    Z.prototype.clear = function () {
        this.vertices = new Float32Array([]), this.verticesIndices.length = 0, this.texCoords = new Float32Array([]), this.texCoordsIndices.length = 0, this.vertexNormals = new Float32Array([])
    }, Z.prototype.getAttributes = function () {
        return this._attributes
    }, Z.prototype.getAttribute = function (t) {
        for (var e in this._attributes)
            if (this._attributes[e].name == t) return this._attributes[e];
        return null
    }, Z.prototype.setAttribute = function (t, e, n) {
        var a = "";
        1 == n ? a = "float" : 2 == n ? a = "vec2" : 3 == n ? a = "vec3" : 4 == n && (a = "vec4");
        var i = {
            name: t,
            data: e,
            itemSize: n,
            type: a
        };
        this._attributes[t] = i
    }, Z.prototype.setVertices = function (t) {
        t instanceof Float32Array ? this._vertices = t : this._vertices = new Float32Array(t)
    }, Z.prototype.setTexCoords = function (t) {
        t instanceof Float32Array ? this.texCoords = t : this.texCoords = new Float32Array(t)
    }, Z.prototype.calcNormals = function (t) {
        t || this.unIndex(), this.calculateNormals({})
    }, Z.prototype.setPointVertices = function (t) {
        if (t.length % 3 == 0) {
            t instanceof Float32Array ? this.vertices = t : this.vertices = new Float32Array(t), this.texCoords instanceof Float32Array || (this.texCoords = new Float32Array(t.length / 3 * 2)), this.verticesIndices.length = t.length / 3;
            for (var e = 0; e < t.length / 3; e++) this.verticesIndices[e] = e, this.texCoords[2 * e] = 0, this.texCoords[2 * e + 1] = 0
        } else console.error("CGL MESH : SetPointVertices: Array must be multiple of three.")
    }, Z.prototype.merge = function (t) {
        if (t) {
            var e = this.verticesIndices.length,
                n = this.vertices.length / 3;
            this.verticesIndices.length = this.verticesIndices.length + t.verticesIndices.length;
            for (var a = 0; a < t.verticesIndices.length; a++) this.verticesIndices[e + a] = t.verticesIndices[a] + n;
            this.vertices = g.float32Concat(this.vertices, t.vertices), this.texCoords = g.float32Concat(this.texCoords, t.texCoords), this.vertexNormals = g.float32Concat(this.vertexNormals, t.vertexNormals), this.tangents = g.float32Concat(this.vertexNormals, t.tangents), this.bitangents = g.float32Concat(this.vertexNormals, t.bitangents)
        }
    }, Z.prototype.copy = function () {
        var t = 0,
            e = new Z;
        for (e.faceVertCount = this.faceVertCount, e.setVertices(this._vertices.slice(0)), e.verticesIndices.length = this.verticesIndices.length, t = 0; t < this.verticesIndices.length; t++) e.verticesIndices[t] = this.verticesIndices[t];
        for (e.texCoords = new Float32Array(this.texCoords.length), t = 0; t < this.texCoords.length; t++) e.texCoords[t] = this.texCoords[t];
        for (e.texCoordsIndices.length = this.texCoordsIndices.length, t = 0; t < this.texCoordsIndices.length; t++) e.texCoordsIndices[t] = this.texCoordsIndices[t];
        for (e.vertexNormals = new Float32Array(this.vertexNormals.length), t = 0; t < this.vertexNormals.length; t++) e.vertexNormals[t] = this.vertexNormals[t];
        if (this.tangents)
            for (e.tangents = [], e.tangents.length = this.tangents.length, t = 0; t < this.tangents.length; t++) e.tangents[t] = this.tangents[t];
        if (this.biTangents)
            for (e.biTangents = [], e.biTangents.length = this.biTangents.length, t = 0; t < this.biTangents.length; t++) e.biTangents[t] = this.biTangents[t];
        for (e.barycentrics.length = this.barycentrics.length, t = 0; t < this.barycentrics.length; t++) e.barycentrics[t] = this.barycentrics[t];
        for (e.morphTargets.length = this.morphTargets.length, t = 0; t < this.morphTargets.length; t++) e.morphTargets[t] = this.morphTargets[t];
        for (e.vertexColors.length = this.vertexColors.length, t = 0; t < this.vertexColors.length; t++) e.vertexColors[t] = this.vertexColors[t];
        return e
    }, Z.prototype.calculateNormals = function (t) {
        var e = vec3.create(),
            n = vec3.create(),
            a = vec3.create(),
            i = 0;

        function r(i) {
            return vec3.subtract(e, i[0], i[1]), vec3.subtract(n, i[0], i[2]), vec3.cross(a, e, n), vec3.normalize(a, a), t && t.forceZUp && a[2] < 0 && (a[0] *= -1, a[1] *= -1, a[2] *= -1), a
        }
        for (this.getVertexVec = function (t) {
                var e = [0, 0, 0];
                return e[0] = this.vertices[3 * t + 0], e[1] = this.vertices[3 * t + 1], e[2] = this.vertices[3 * t + 2], e
            }, this.vertexNormals instanceof Float32Array && this.vertexNormals.length == this.vertices.length || (this.vertexNormals = new Float32Array(this.vertices.length)), i = 0; i < this.vertices.length; i++) this.vertexNormals[i] = 0;
        if (this.isIndexed()) {
            var s = [];
            for (s.length = this.verticesIndices.length / 3, i = 0; i < this.verticesIndices.length; i += 3) h = [this.getVertexVec(this.verticesIndices[i + 0]), this.getVertexVec(this.verticesIndices[i + 1]), this.getVertexVec(this.verticesIndices[i + 2])], s[i / 3] = r(h), this.vertexNormals[3 * this.verticesIndices[i + 0] + 0] += s[i / 3][0], this.vertexNormals[3 * this.verticesIndices[i + 0] + 1] += s[i / 3][1], this.vertexNormals[3 * this.verticesIndices[i + 0] + 2] += s[i / 3][2], this.vertexNormals[3 * this.verticesIndices[i + 1] + 0] += s[i / 3][0], this.vertexNormals[3 * this.verticesIndices[i + 1] + 1] += s[i / 3][1], this.vertexNormals[3 * this.verticesIndices[i + 1] + 2] += s[i / 3][2], this.vertexNormals[3 * this.verticesIndices[i + 2] + 0] += s[i / 3][0], this.vertexNormals[3 * this.verticesIndices[i + 2] + 1] += s[i / 3][1], this.vertexNormals[3 * this.verticesIndices[i + 2] + 2] += s[i / 3][2];
            for (i = 0; i < this.verticesIndices.length; i += 3)
                for (var o = 0; o < 3; o++) {
                    var l = [this.vertexNormals[3 * this.verticesIndices[i + o] + 0], this.vertexNormals[3 * this.verticesIndices[i + o] + 1], this.vertexNormals[3 * this.verticesIndices[i + o] + 2]];
                    vec3.normalize(l, l), this.vertexNormals[3 * this.verticesIndices[i + o] + 0] = l[0], this.vertexNormals[3 * this.verticesIndices[i + o] + 1] = l[1], this.vertexNormals[3 * this.verticesIndices[i + o] + 2] = l[2]
                }
        } else {
            var u = [];
            for (i = 0; i < this.vertices.length; i += 9) {
                var h;
                a = r(h = [
                    [this.vertices[i + 0], this.vertices[i + 1], this.vertices[i + 2]],
                    [this.vertices[i + 3], this.vertices[i + 4], this.vertices[i + 5]],
                    [this.vertices[i + 6], this.vertices[i + 7], this.vertices[i + 8]]
                ]), u.push(a[0], a[1], a[2], a[0], a[1], a[2], a[0], a[1], a[2])
            }
            this.vertexNormals = u
        }
    }, Z.prototype.calcTangentsBitangents = function () {
        if (!this.vertices.length) throw new Error("Cannot calculate tangents/bitangents without vertices.");
        if (!this.vertexNormals.length) throw new Error("Cannot calculate tangents/bitangents without normals.");
        if (!this.texCoords.length) throw new Error("Cannot calculate tangents/bitangents without texture coordinates.");
        if (!this.verticesIndices.length) throw new Error("Cannot calculate tangents/bitangents without vertex indices.");
        if (this.verticesIndices.length % 3 != 0) throw new Error("Vertex indices mismatch!");
        const t = this.verticesIndices.length / 3,
            e = this.vertices.length / 3;
        this.tangents = new Float32Array(this.vertexNormals.length), this.biTangents = new Float32Array(this.vertexNormals.length);
        var n = [];
        n.length = 2 * e;
        const a = vec3.create(),
            i = vec3.create(),
            r = vec3.create(),
            s = vec2.create(),
            o = vec2.create(),
            l = vec2.create(),
            u = vec3.create(),
            h = vec3.create();
        for (var c = 0; c < t; c += 1) {
            const t = this.verticesIndices[3 * c],
                d = this.verticesIndices[3 * c + 1],
                f = this.verticesIndices[3 * c + 2];
            vec3.set(a, this.vertices[3 * t], this.vertices[3 * t + 1], this.vertices[3 * t + 2]), vec3.set(i, this.vertices[3 * d], this.vertices[3 * d + 1], this.vertices[3 * d + 2]), vec3.set(r, this.vertices[3 * f], this.vertices[3 * f + 1], this.vertices[3 * f + 2]), vec2.set(s, this.texCoords[2 * t], this.texCoords[2 * t + 1]), vec2.set(o, this.texCoords[2 * d], this.texCoords[2 * d + 1]), vec2.set(l, this.texCoords[2 * f], this.texCoords[2 * f + 1]);
            const p = i[0] - a[0],
                g = r[0] - a[0],
                m = i[1] - a[1],
                b = r[1] - a[1],
                _ = i[2] - a[2],
                v = r[2] - a[2],
                O = o[0] - s[0],
                I = l[0] - s[0],
                A = o[1] - s[1],
                E = l[1] - s[1],
                M = 1 / (O * E - I * A);
            vec3.set(u, (E * p - A * g) * M, (E * m - A * b) * M, (E * _ - A * v) * M), vec3.set(h, (O * g - I * p) * M, (O * b - I * m) * M, (O * v - I * _) * M), n[t] = u, n[d] = u, n[f] = u, n[t + e] = h, n[d + e] = h, n[f + e] = h
        }
        const d = vec3.create(),
            f = vec3.create(),
            p = vec3.create(),
            g = vec3.create(),
            m = vec3.create(),
            b = vec3.create(),
            _ = vec3.create(),
            v = vec3.create();
        for (var O = 0; O < e; O += 1) {
            vec3.set(d, this.vertexNormals[3 * O], this.vertexNormals[3 * O + 1], this.vertexNormals[3 * O + 2]), vec3.set(f, n[O][0], n[O][1], n[O][2]);
            const t = vec3.dot(d, f);
            vec3.scale(m, d, t), vec3.subtract(b, f, m), vec3.normalize(v, b), vec3.cross(_, d, f);
            const a = vec3.dot(_, n[O + e]) < 0 ? -1 : 1;
            vec3.scale(p, v, 1 / a), vec3.cross(g, d, p), this.tangents[3 * O + 0] = p[0], this.tangents[3 * O + 1] = p[1], this.tangents[3 * O + 2] = p[2], this.biTangents[3 * O + 0] = g[0], this.biTangents[3 * O + 1] = g[1], this.biTangents[3 * O + 2] = g[2]
        }
    }, Z.prototype.isIndexed = function () {
        return 0 != this.verticesIndices.length
    }, Z.prototype.unIndex = function (t) {
        var e = [],
            n = [],
            a = [],
            i = [],
            r = 0,
            s = 0;
        for (this.vertexNormals = [], s = 0; s < this.verticesIndices.length; s += 3) e.push(this.vertices[3 * this.verticesIndices[s + 0] + 0]), e.push(this.vertices[3 * this.verticesIndices[s + 0] + 1]), e.push(this.vertices[3 * this.verticesIndices[s + 0] + 2]), i.push(this.vertexNormals[3 * this.verticesIndices[s + 0] + 0]), i.push(this.vertexNormals[3 * this.verticesIndices[s + 0] + 1]), i.push(this.vertexNormals[3 * this.verticesIndices[s + 0] + 2]), this.texCoords ? (a.push(this.texCoords[2 * this.verticesIndices[s + 0] + 0]), a.push(this.texCoords[2 * this.verticesIndices[s + 0] + 1])) : (a.push(0), a.push(0)), n.push(r), r++, e.push(this.vertices[3 * this.verticesIndices[s + 1] + 0]), e.push(this.vertices[3 * this.verticesIndices[s + 1] + 1]), e.push(this.vertices[3 * this.verticesIndices[s + 1] + 2]), i.push(this.vertexNormals[3 * this.verticesIndices[s + 1] + 0]), i.push(this.vertexNormals[3 * this.verticesIndices[s + 1] + 1]), i.push(this.vertexNormals[3 * this.verticesIndices[s + 1] + 2]), this.texCoords ? (a.push(this.texCoords[2 * this.verticesIndices[s + 1] + 0]), a.push(this.texCoords[2 * this.verticesIndices[s + 1] + 1])) : (a.push(0), a.push(0)), n.push(r), r++, e.push(this.vertices[3 * this.verticesIndices[s + 2] + 0]), e.push(this.vertices[3 * this.verticesIndices[s + 2] + 1]), e.push(this.vertices[3 * this.verticesIndices[s + 2] + 2]), i.push(this.vertexNormals[3 * this.verticesIndices[s + 2] + 0]), i.push(this.vertexNormals[3 * this.verticesIndices[s + 2] + 1]), i.push(this.vertexNormals[3 * this.verticesIndices[s + 2] + 2]), this.texCoords ? (a.push(this.texCoords[2 * this.verticesIndices[s + 2] + 0]), a.push(this.texCoords[2 * this.verticesIndices[s + 2] + 1])) : (a.push(0), a.push(0)), n.push(r), r++;
        this.vertices = e, this.texCoords = a, this.vertexNormals = i, this.verticesIndices.length = 0, t && (this.verticesIndices = n), this.calculateNormals()
    }, Z.prototype.calcBarycentric = function () {
        this.barycentrics.length = this.vertices.length;
        var t = 0;
        for (t = 0; t < this.vertices.length; t++) this.barycentrics[t] = 0;
        var e = 0;
        for (t = 0; t < this.vertices.length; t += 3) this.barycentrics[t + e] = 1, 3 == ++e && (e = 0)
    }, Z.prototype.getBounds = function () {
        var t = 0,
            e = {
                maxX: -Number.MAX_VALUE,
                maxY: -Number.MAX_VALUE,
                maxZ: -Number.MAX_VALUE,
                minX: Number.MAX_VALUE,
                minY: Number.MAX_VALUE,
                minZ: Number.MAX_VALUE
            };
        for (t = 0; t < this.vertices.length; t += 3) this.vertices[t + 0] == this.vertices[t + 0] && (e.maxX = Math.max(e.maxX, this.vertices[t + 0]), e.maxY = Math.max(e.maxY, this.vertices[t + 1]), e.maxZ = Math.max(e.maxZ, this.vertices[t + 2]), e.minX = Math.min(e.minX, this.vertices[t + 0]), e.minY = Math.min(e.minY, this.vertices[t + 1]), e.minZ = Math.min(e.minZ, this.vertices[t + 2]));
        return e.x = Math.abs(e.maxX) + Math.abs(e.minX), e.y = Math.abs(e.maxY) + Math.abs(e.minY), e.z = Math.abs(e.maxZ) + Math.abs(e.minZ), e.maxAxis = Math.max(e.z, Math.max(e.x, e.y)), e
    }, Z.prototype.center = function (t, e, n) {
        void 0 === t && (t = !0, e = !0, n = !0);
        var a = 0;
        const i = this.getBounds(),
            r = [i.minX + (i.maxX - i.minX) / 2, i.minY + (i.maxY - i.minY) / 2, i.minZ + (i.maxZ - i.minZ) / 2];
        for (a = 0; a < this.vertices.length; a += 3) this.vertices[a + 0] == this.vertices[a + 0] && (t && (this.vertices[a + 0] -= r[0]), e && (this.vertices[a + 1] -= r[1]), n && (this.vertices[a + 2] -= r[2]));
        return r
    }, Z.prototype.mapTexCoords2d = function () {
        var t = this.getBounds(),
            e = this.vertices.length / 3;
        this.texCoords = new Float32Array(length = 2 * e);
        for (var n = 0; n < e; n++) {
            var a = this.vertices[3 * n + 0],
                i = this.vertices[3 * n + 1];
            this.texCoords[2 * n + 0] = a / (t.maxX - t.minX) + .5, this.texCoords[2 * n + 1] = 1 - i / (t.maxY - t.minY) + .5
        }
    }, Z.buildFromFaces = function (t) {
        for (var e = [], n = [], a = 0; a < t.length; a += 3) {
            for (var i = t[a + 0], r = t[a + 1], s = t[a + 2], o = [-1, -1, -1], l = 0; l < e; l += 3) e[l + 0] == i[0] && e[l + 1] == i[1] && e[l + 2] == i[2] && (o[0] = l / 3), e[l + 0] == r[0] && e[l + 1] == r[1] && e[l + 2] == r[2] && (o[1] = l / 3), e[l + 0] == s[0] && e[l + 1] == s[1] && e[l + 2] == s[2] && (o[2] = l / 3); - 1 == o[0] && (e.push(i[0], i[1], i[2]), o[0] = (e.length - 1) / 3), -1 == o[1] && (e.push(r[0], r[1], r[2]), o[1] = (e.length - 1) / 3), -1 == o[2] && (e.push(s[0], s[1], s[2]), o[2] = (e.length - 1) / 3), n.push(parseInt(o[0], 10)), n.push(parseInt(o[1], 10)), n.push(parseInt(o[2], 10))
        }
        var u = new Z;
        return u.vertices = e, u.verticesIndices = n, u
    }, Z.json2geom = function (t) {
        var e = new Z;
        if (e.verticesIndices = [], e.vertices = t.vertices || [], e.vertexNormals = t.normals || [], e.vertexColors = t.colors || [], e.tangents = t.tangents || [], e.biTangents = t.bitangents || [], t.texturecoords && e.setTexCoords(t.texturecoords[0]), t.vertices_b64 && (e.vertices = new Float32Array(f(t.vertices_b64))), t.normals_b64 && (e.vertexNormals = new Float32Array(f(t.normals_b64))), t.tangents_b64 && (e.tangents = new Float32Array(f(t.tangents_b64))), t.bitangents_b64 && (e.biTangents = new Float32Array(f(t.bitangents_b64))), t.texturecoords_b64 && e.setTexCoords(new Float32Array(f(t.texturecoords_b64[0]))), t.faces_b64) e.verticesIndices = new Uint32Array(f(t.faces_b64));
        else {
            e.verticesIndices.length = 3 * t.faces.length;
            for (var n = 0; n < t.faces.length; n++) e.verticesIndices[3 * n] = t.faces[n][0], e.verticesIndices[3 * n + 1] = t.faces[n][1], e.verticesIndices[3 * n + 2] = t.faces[n][2]
        }
        return e
    };
    const J = function (t, e, n, a) {
        if (this._loc = -1, this._type = e, this._name = n, this._shader = t, this._value = 1e-5, this._oldValue = null, this._port = null, this._shader.addUniform(this), this.needsUpdate = !0, "f" == e) this.set = this.setValue = this.setValueF.bind(this), this.updateValue = this.updateValueF.bind(this);
        else if ("f[]" == e) this.set = this.setValue = this.setValueArrayF.bind(this), this.updateValue = this.updateValueArrayF.bind(this);
        else if ("3f[]" == e) this.set = this.setValue = this.setValueArray3F.bind(this), this.updateValue = this.updateValueArray3F.bind(this);
        else if ("i" == e) this.set = this.setValue = this.setValueI.bind(this), this.updateValue = this.updateValueI.bind(this);
        else if ("b" == e) this.set = this.setValue = this.setValueBool.bind(this), this.updateValue = this.updateValueBool.bind(this);
        else if ("4f" == e) this.set = this.setValue = this.setValue4F.bind(this), this.updateValue = this.updateValue4F.bind(this);
        else if ("3f" == e) this.set = this.setValue = this.setValue3F.bind(this), this.updateValue = this.updateValue3F.bind(this);
        else if ("2f" == e) this.set = this.setValue = this.setValue2F.bind(this), this.updateValue = this.updateValue2F.bind(this);
        else if ("t" == e) this.set = this.setValue = this.setValueT.bind(this), this.updateValue = this.updateValueT.bind(this);
        else {
            if ("m4" != e) throw new Error("Unknown uniform type");
            this.set = this.setValue = this.setValueM4.bind(this), this.updateValue = this.updateValueM4.bind(this)
        }
        "object" == typeof a && a instanceof C ? (this._port = a, this._value = this._port.get(), this._port.onValueChanged = this.updateFromPort.bind(this)) : this._value = a, this.setValue(this._value), this.needsUpdate = !0
    };
    J.prototype.getType = function () {
        return this._type
    }, J.prototype.getName = function () {
        return this._name
    }, J.prototype.getValue = function () {
        return this._value
    }, J.prototype.resetLoc = function () {
        this._loc = -1, this.needsUpdate = !0
    }, J.prototype.bindTextures = function () {
        return this._value
    }, J.prototype.resetLoc = function () {
        this._loc = -1, this.needsUpdate = !0
    }, J.prototype.bindTextures = function () {}, J.prototype.getLoc = function () {
        return this._loc
    }, J.prototype.updateFromPort = function () {
        this.setValue(this._port.get())
    }, J.prototype.updateValueF = function () {
        -1 == this._loc ? this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name) : this.needsUpdate = !1, this._shader.getCgl().gl.uniform1f(this._loc, this._value), W.profileUniformCount++
    }, J.prototype.setValueF = function (t) {
        t != this._value && (this.needsUpdate = !0, this._value = t)
    }, J.prototype.updateValueI = function () {
        -1 == this._loc ? this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name) : this.needsUpdate = !1, this._shader.getCgl().gl.uniform1i(this._loc, this._value), W.UniformCount++
    }, J.prototype.setValueI = function (t) {
        t != this._value && (this.needsUpdate = !0, this._value = t)
    }, J.prototype.updateValueBool = function () {
        -1 == this._loc ? this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name) : this.needsUpdate = !1, this._shader.getCgl().gl.uniform1i(this._loc, this._value ? 1 : 0), W.UniformCount++
    }, J.prototype.setValueBool = function (t) {
        t != this._value && (this.needsUpdate = !0, this._value = t)
    }, J.prototype.setValueArray3F = function (t) {
        this.needsUpdate = !0, this._value = t
    }, J.prototype.updateValueArray3F = function () {
        -1 == this._loc ? this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name) : this.needsUpdate = !1, this._value && (this._shader.getCgl().gl.uniform3fv(this._loc, this._value), W.UniformCount++)
    }, J.prototype.setValueArrayF = function (t) {
        this.needsUpdate = !0, this._value = t
    }, J.prototype.updateValueArrayF = function () {
        -1 == this._loc ? this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name) : this.needsUpdate = !1, this._value && (this._shader.getCgl().gl.uniform1fv(this._loc, this._value), W.UniformCount++)
    }, J.prototype.updateValue3F = function () {
        this._value && (-1 == this._loc && (this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name), W.ShaderGetUniform++, W.ShaderGetUniformName = this._name), this._shader.getCgl().gl.uniform3f(this._loc, this._value[0], this._value[1], this._value[2]), this.needsUpdate = !1, W.UniformCount++)
    }, J.prototype.setValue3F = function (t) {
        t && (this._oldValue ? t[0] == this._oldValue[0] && t[1] == this._oldValue[1] && t[2] == this._oldValue[2] || (this._oldValue[0] = t[0], this._oldValue[1] = t[1], this._oldValue[2] = t[2], this.needsUpdate = !0) : (this._oldValue = [t[0] - 1, 1, 2], this.needsUpdate = !0), this._value = t)
    }, J.prototype.updateValue2F = function () {
        this._value && (-1 == this._loc && (this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name), W.ShaderGetUniform++, W.ShaderGetUniformName = this._name), this._shader.getCgl().gl.uniform2f(this._loc, this._value[0], this._value[1]), this.needsUpdate = !1, W.UniformCount++)
    }, J.prototype.setValue2F = function (t) {
        t && (this._oldValue ? t[0] == this._oldValue[0] && t[1] == this._oldValue[1] || (this._oldValue[0] = t[0], this._oldValue[1] = t[1], this.needsUpdate = !0) : (this._oldValue = [t[0] - 1, 1], this.needsUpdate = !0), this._value = t)
    }, J.prototype.updateValueT = function () {
        -1 == this._loc && (this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name), W.ShaderGetUniform++, W.ShaderGetUniformName = this._name, -1 == this._loc && console.log("texture this._loc unknown!!")), W.UniformCount++, this._shader.getCgl().gl.uniform1i(this._loc, this._value), this.needsUpdate = !1
    }, J.prototype.setValueT = function (t) {
        this.needsUpdate = !0, this._value = t
    }, J.prototype.updateValue4F = function () {
        -1 == this._loc && (this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name), W.ShaderGetUniform++, W.ShaderGetUniformName = this._name), this._shader.getCgl().gl.uniform4f(this._loc, this._value[0], this._value[1], this._value[2], this._value[3]), W.UniformCount++
    }, J.prototype.setValue4F = function (t) {
        this.needsUpdate = !0, this._value = t
    }, J.prototype.updateValueM4 = function () {
        -1 == this._loc && (this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name), W.ShaderGetUniform++, W.ShaderGetUniformName = this._name), this._shader.getCgl().gl.uniformMatrix4fv(this._loc, !1, this._value), W.UniformCount++
    }, J.prototype.setValueM4 = function (t) {
        this.needsUpdate = !0, this._value = t
    };
    const $ = {
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
        tt = {
            lastMesh: null
        },
        et = function (t, e, n) {
            this._cgl = t, this._bufVertexAttrib = null, this._bufVerticesIndizes = this._cgl.gl.createBuffer(), this._attributes = [], this._attribLocs = {}, this._geom = null, this._lastShader = null, this._numInstances = 0, this._glPrimitive = n, this._preWireframeGeom = null, this.addVertexNumbers = !1, this.feedBackAttributes = [], this.setGeom(e), this._feedBacks = [], this._feedBacksChanged = !1, this._transformFeedBackLoc = -1, this._lastAttrUpdate = 0, Object.defineProperty(this, "numInstances", {
                get() {
                    return this._numInstances
                },
                set(t) {
                    this.setNumInstances(t)
                }
            })
        };
    et.prototype.updateVertices = function (t) {
            this.setAttribute($.SHADER.SHADERVAR_VERTEX_POSITION, t.vertices, 3)
        }, et.prototype.setAttributePointer = function (t, e, n, a) {
            for (var i = 0; i < this._attributes.length; i++) this._attributes[i].name == t && (this._attributes[i].pointer || (this._attributes[i].pointer = []), this._attributes[i].pointer.push({
                loc: -1,
                name: e,
                stride: n,
                offset: a,
                instanced: t == $.SHADER.SHADERVAR_INSTANCE_MMATRIX
            }))
        }, et.prototype.getAttribute = function (t) {
            for (var e = 0; e < this._attributes.length; e++)
                if (this._attributes[e].name == t) return this._attributes[e]
        }, et.prototype.addAttribute = et.prototype.updateAttribute = et.prototype.setAttribute = function (t, e, n, a) {
            var i = null,
                r = null,
                s = !1,
                o = 0,
                l = e.length / n;
            for (0 === l && console.warn("CGL_MESH: num items in attribute " + t + " is ZERO"), "function" == typeof a && (r = a), "object" == typeof a && (a.cb && (r = a.cb), a.instanced && (s = a.instanced)), t == $.SHADER.SHADERVAR_INSTANCE_MMATRIX && (s = !0), e instanceof Float32Array ? i = e : (i = new Float32Array(e), W.profileNonTypedAttrib++, W.profileNonTypedAttribNames = this._geom.name + " " + t), o = 0; o < this._attributes.length; o++)
                if (this._attributes[o].name == t) return this._attributes[o].numItems = l, this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, this._attributes[o].buffer), this._cgl.gl.bufferData(this._cgl.gl.ARRAY_BUFFER, i, this._cgl.gl.DYNAMIC_DRAW), this._attributes[o];
            var u = this._cgl.gl.createBuffer();
            this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, u), this._cgl.gl.bufferData(this._cgl.gl.ARRAY_BUFFER, i, this._cgl.gl.DYNAMIC_DRAW);
            var h = this._cgl.gl.FLOAT;
            a && a.type && (h = a.type);
            var c = {
                buffer: u,
                name: t,
                cb: r,
                itemSize: n,
                numItems: l,
                startItem: 0,
                instanced: s,
                type: h
            };
            return t == $.SHADER.SHADERVAR_VERTEX_POSITION && (this._bufVertexAttrib = c), this._attributes.push(c), this._attribLocs = {}, c
        }, et.prototype.getAttributes = function () {
            return this._attributes
        }, et.prototype.updateTexCoords = function (t) {
            if (t.texCoords && t.texCoords.length > 0) this.setAttribute($.SHADER.SHADERVAR_VERTEX_TEXCOORD, t.texCoords, 2);
            else {
                var e = new Float32Array(Math.round(t.vertices.length / 3 * 2));
                this.setAttribute($.SHADER.SHADERVAR_VERTEX_TEXCOORD, e, 2)
            }
        }, et.prototype._setVertexNumbers = function () {
            var t = this._geom.vertices.length / 3;
            if (!this._verticesNumbers || this._verticesNumbers.length != t) {
                this._verticesNumbers = new Float32Array(t);
                for (var e = 0; e < t; e++) this._verticesNumbers[e] = e;
                this.setAttribute($.SHADER.SHADERVAR_VERTEX_NUMBER, this._verticesNumbers, 1, (e, n, a) => {
                    a.uniformNumVertices || (a.uniformNumVertices = new J(a, "f", "numVertices", t)), a.uniformNumVertices.setValue(t)
                })
            }
        }, et.prototype.setVertexIndices = function (t) {
            if (t.length > 0) {
                for (var e = 0; e < t.length; e++)
                    if (t[e] >= this._geom.vertices.length / 3) return void console.warn("invalid index in " + this._geom.name);
                this._cgl.gl.bindBuffer(this._cgl.gl.ELEMENT_ARRAY_BUFFER, this._bufVerticesIndizes), t instanceof Uint16Array ? this.vertIndicesTyped = t : this.vertIndicesTyped = new Uint16Array(t), this._cgl.gl.bufferData(this._cgl.gl.ELEMENT_ARRAY_BUFFER, this.vertIndicesTyped, this._cgl.gl.DYNAMIC_DRAW), this._bufVerticesIndizes.itemSize = 1, this._bufVerticesIndizes.numItems = t.length
            } else this._bufVerticesIndizes.numItems = 0
        }, et.prototype.setGeom = function (t) {
            this._geom = t, tt.lastMesh = null, W.profileMeshSetGeom++, this._disposeAttributes(), this.updateVertices(this._geom), this.setVertexIndices(this._geom.verticesIndices), this._geom.vertexNormals.length > 0 && this.setAttribute("attrVertNormal", this._geom.vertexNormals, 3), this.updateTexCoords(this._geom), this._geom.hasOwnProperty("tangents") && this._geom.tangents && this._geom.tangents.length > 0 && this.setAttribute("attrTangent", this._geom.tangents, 3), this._geom.hasOwnProperty("biTangents") && this._geom.biTangents && this._geom.biTangents.length > 0 && this.setAttribute("attrBiTangent", this._geom.biTangents, 3), this._geom.vertexColors.length > 0 && this.setAttribute("attrVertColor", this._geom.vertexColors, 4), this.addVertexNumbers && this._setVertexNumbers();
            var e = this._geom.getAttributes();
            for (var n in e) this.setAttribute(n, e[n].data, e[n].itemSize)
        }, et.prototype._preBind = function (t) {
            for (var e = 0; e < this._attributes.length; e++) this._attributes[e].cb && this._attributes[e].cb(this._attributes[e], this._geom, t)
        }, et.prototype._bind = function (t) {
            t != this._lastShader && this.unBind();
            var e = [];
            this._attribLocs[t.id] ? e = this._attribLocs[t.id] : this._attribLocs[t.id] = e, this._lastShader = t;
            var n = 0;
            if (t.lastCompile > this._lastAttrUpdate || e.length != this._attributes.length)
                for (this._lastAttrUpdate = t.lastCompile, n = 0; n < this._attributes.length; n++) e[n] = -1;
            for (n = 0; n < this._attributes.length; n++) {
                var a = this._attributes[n];
                if (-1 == e[n] && a._attrLocationLastShaderTime != t.lastCompile && (a._attrLocationLastShaderTime = t.lastCompile, e[n] = this._cgl.glGetAttribLocation(t.getProgram(), a.name), W.profileAttrLoc++), -1 != e[n])
                    if (this._cgl.gl.enableVertexAttribArray(e[n]), this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, a.buffer), a.instanced)
                        if (a.itemSize <= 4) a.itemSize && 0 != a.itemSize || console.log("instanced attrib itemsize error", this._geom.name, a), this._cgl.gl.vertexAttribPointer(e[n], a.itemSize, a.type, !1, 4 * a.itemSize, 0), this._cgl.gl.vertexAttribDivisor(e[n], 1);
                        else if (16 == a.itemSize) {
                    const t = 64;
                    this._cgl.gl.vertexAttribPointer(e[n], 4, a.type, !1, t, 0), this._cgl.gl.enableVertexAttribArray(e[n] + 1), this._cgl.gl.vertexAttribPointer(e[n] + 1, 4, a.type, !1, t, 16), this._cgl.gl.enableVertexAttribArray(e[n] + 2), this._cgl.gl.vertexAttribPointer(e[n] + 2, 4, a.type, !1, t, 32), this._cgl.gl.enableVertexAttribArray(e[n] + 3), this._cgl.gl.vertexAttribPointer(e[n] + 3, 4, a.type, !1, t, 48), this._cgl.gl.vertexAttribDivisor(e[n], 1), this._cgl.gl.vertexAttribDivisor(e[n] + 1, 1), this._cgl.gl.vertexAttribDivisor(e[n] + 2, 1), this._cgl.gl.vertexAttribDivisor(e[n] + 3, 1)
                } else console.log("unknown instance attrib size", a.name);
                else {
                    if (a.itemSize && 0 != a.itemSize || console.log("attrib itemsize error", this._geom.name, a), this._cgl.gl.vertexAttribPointer(e[n], a.itemSize, a.type, !1, 4 * a.itemSize, 0), a.pointer)
                        for (var i = 0; i < a.pointer.length; i++) {
                            var r = a.pointer[i]; - 1 == r.loc && (r.loc = this._cgl.glGetAttribLocation(t.getProgram(), r.name)), W.profileAttrLoc++, this._cgl.gl.enableVertexAttribArray(r.loc), this._cgl.gl.vertexAttribPointer(r.loc, a.itemSize, a.type, !1, r.stride, r.offset)
                        }
                    this.bindFeedback(a)
                }
            }
            0 !== this._bufVerticesIndizes.numItems && this._cgl.gl.bindBuffer(this._cgl.gl.ELEMENT_ARRAY_BUFFER, this._bufVerticesIndizes)
        }, et.prototype.unBind = function () {
            var t = this._lastShader;
            if (this._lastShader = null, t) {
                var e = [];
                this._attribLocs[t.id] ? e = this._attribLocs[t.id] : this._attribLocs[t.id] = e, tt.lastMesh = null;
                for (var n = 0; n < this._attributes.length; n++) this._attributes[n].instanced && (this._attributes[n].itemSize <= 4 ? (-1 != e[n] && this._cgl.gl.vertexAttribDivisor(e[n], 0), e[n] >= 0 && this._cgl.gl.disableVertexAttribArray(e[n])) : (this._cgl.gl.vertexAttribDivisor(e[n], 0), this._cgl.gl.vertexAttribDivisor(e[n] + 1, 0), this._cgl.gl.vertexAttribDivisor(e[n] + 2, 0), this._cgl.gl.vertexAttribDivisor(e[n] + 3, 0), this._cgl.gl.disableVertexAttribArray(e[n] + 1), this._cgl.gl.disableVertexAttribArray(e[n] + 2), this._cgl.gl.disableVertexAttribArray(e[n] + 3))), -1 != e[n] && this._cgl.gl.disableVertexAttribArray(e[n])
            }
        }, et.prototype.meshChanged = function () {
            return this._cgl.lastMesh && this._cgl.lastMesh != this
        }, et.prototype.printDebug = function (t) {
            for (console.log("--attributes"), i = 0; i < this._attributes.length; i++) console.log("attribute " + i + " " + this._attributes[i].name)
        }, et.prototype.setNumVertices = function (t) {
            this._bufVertexAttrib.numItems = t
        }, et.prototype.render = function (t) {
            if (t) {
                t.wireframe || this._geom.isIndexed() || !this._preWireframeGeom || this.setGeom(this._preWireframeGeom), t.wireframe && this._geom.isIndexed() && (this._preWireframeGeom = this._geom, this._geom = this._geom.copy(), this._geom.unIndex(), this._geom.calcBarycentric(), this.setGeom(this._geom), this.setAttribute("attrBarycentric", this._geom.barycentrics, 3));
                var e = !1;
                tt.lastMesh != this && (tt.lastMesh && tt.lastMesh.unBind(), e = !0), e && this._preBind(t), t.bind(), t.bindTextures && t.bindTextures(), this._bind(t), this.addVertexNumbers && this._setVertexNumbers(), tt.lastMesh = this;
                var n = this._cgl.gl.TRIANGLES;
                void 0 !== this._glPrimitive && (n = this._glPrimitive), null !== t.glPrimitive && (n = t.glPrimitive), this.hasFeedbacks() ? this.drawFeedbacks(t, n) : 0 === this._bufVerticesIndizes.numItems ? 0 === this._numInstances ? this._cgl.gl.drawArrays(n, this._bufVertexAttrib.startItem, this._bufVertexAttrib.numItems - this._bufVertexAttrib.startItem) : this._cgl.gl.drawArraysInstanced(n, this._bufVertexAttrib.startItem, this._bufVertexAttrib.numItems, this._numInstances) : 0 === this._numInstances ? this._cgl.gl.drawElements(n, this._bufVerticesIndizes.numItems, this._cgl.gl.UNSIGNED_SHORT, 0) : this._cgl.gl.drawElementsInstanced(n, this._bufVerticesIndizes.numItems, this._cgl.gl.UNSIGNED_SHORT, 0, this._numInstances)
            }
        }, et.prototype.setNumInstances = function (t) {
            if (this._numInstances = t, t > 0) {
                for (var e = new Float32Array(t), n = 0; n < t; n++) e[n] = n;
                this.setAttribute("instanceIndex", e, 1, {
                    instanced: !0
                })
            }
        }, et.prototype._disposeAttributes = function () {
            if (this._attributes) {
                for (var t = 0; t < this._attributes.length; t++) this._attributes[t].buffer && (this._cgl.gl.deleteBuffer(this._attributes[t].buffer), this._attributes[t].buffer = null);
                this._attributes.length = 0
            }
        }, et.prototype.dispose = function () {
            this._bufVertexAttrib && this._bufVertexAttrib.buffer && this._cgl.gl.deleteBuffer(this._bufVertexAttrib.buffer), this._bufVerticesIndizes && this._cgl.gl.deleteBuffer(this._bufVerticesIndizes), this._disposeAttributes()
        },
        function (t) {
            t.prototype.hasFeedbacks = function () {
                return this._feedBacks.length > 0
            }, t.prototype.removeFeedbacks = function (t) {
                this._feedbacks && (this._feedbacks.length = 0, this._feedBacksChanged = !0)
            }, t.prototype.setAttributeFeedback = function () {}, t.prototype.setFeedback = function (t, e, n) {
                var a = {
                        nameOut: e
                    },
                    i = !1;
                this.unBindFeedbacks();
                for (var r = 0; r < this._feedBacks.length; r++) this._feedBacks[r].nameOut == e && (a = this._feedBacks[r], i = !0);
                return i || (this._feedBacksChanged = !0), a.initialArr = n, a.attrib = t, a.outBuffer && this._cgl.gl.deleteBuffer(a.outBuffer), a.outBuffer = this._cgl.gl.createBuffer(), this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, a.outBuffer), this._cgl.gl.bufferData(this._cgl.gl.ARRAY_BUFFER, a.initialArr, this._cgl.gl.STATIC_DRAW), this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, a.attrib.buffer), this._cgl.gl.bufferData(this._cgl.gl.ARRAY_BUFFER, a.initialArr, this._cgl.gl.STATIC_DRAW), i || this._feedBacks.push(a), a
            }, t.prototype.bindFeedback = function (t) {
                if (this._feedBacks && 0 !== this._feedBacks.length) {
                    -1 == this._transformFeedBackLoc && (this._transformFeedBackLoc = this._cgl.gl.createTransformFeedback()), this._cgl.gl.bindTransformFeedback(this._cgl.gl.TRANSFORM_FEEDBACK, this._transformFeedBackLoc);
                    for (var e = 0; e < this._feedBacks.length; e++) {
                        var n = this._feedBacks[e];
                        n.attrib == t && this._cgl.gl.bindBufferBase(this._cgl.gl.TRANSFORM_FEEDBACK_BUFFER, e, n.outBuffer)
                    }
                }
            }, t.prototype.drawFeedbacks = function (t, e) {
                var n = 0;
                if (this._feedBacksChanged) {
                    var a = [];
                    for (this._cgl.gl.bindTransformFeedback(this._cgl.gl.TRANSFORM_FEEDBACK, this._transformFeedBackLoc), n = 0; n < this._feedBacks.length; n++) a.push(this._feedBacks[n].nameOut);
                    return t.setFeedbackNames(a), console.log("feedbacknames", a), t.compile(), this._feedBacksChanged = !1, this._cgl.gl.bindTransformFeedback(this._cgl.gl.TRANSFORM_FEEDBACK, null), void console.log("changed finished")
                }
                this._cgl.gl.beginTransformFeedback(this.glPrimitive), this._cgl.gl.drawArrays(e, 0, this._feedBacks[0].attrib.numItems), this._cgl.gl.endTransformFeedback(), this.unBindFeedbacks(), this.feedBacksSwapBuffers()
            }, t.prototype.unBindFeedbacks = function () {
                for (i = 0; i < this._feedBacks.length; i++) this._cgl.gl.bindBufferBase(this._cgl.gl.TRANSFORM_FEEDBACK_BUFFER, i, null);
                this._cgl.gl.bindTransformFeedback(this._cgl.gl.TRANSFORM_FEEDBACK, null)
            }, t.prototype.feedBacksSwapBuffers = function () {
                for (var t = 0; t < this._feedBacks.length; t++) {
                    var e = this._feedBacks[t].attrib.buffer;
                    this._feedBacks[t].attrib.buffer = this._feedBacks[t].outBuffer, this._feedBacks[t].outBuffer = e
                }
            }
        }(et);
    const nt = {
            getSimpleRect: function (t, e) {
                var n = new Z(e);
                return n.vertices = [1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0], n.texCoords = [1, 1, 0, 1, 1, 0, 0, 0], n.verticesIndices = [0, 1, 2, 2, 1, 3], new et(t, n)
            }
        },
        at = function (t, e) {
            this._cgl = t, t.TextureEffectMesh || this.createMesh(), this._textureSource = null, this._textureTarget = null, this._frameBuf = this._cgl.gl.createFramebuffer(), this._frameBuf2 = this._cgl.gl.createFramebuffer(), this._renderbuffer = this._cgl.gl.createRenderbuffer(), this._renderbuffer2 = this._cgl.gl.createRenderbuffer(), this.switched = !1, this.depth = !1
        };
    at.prototype.setSourceTexture = function (t) {
        t.textureType == K.TYPE_FLOAT && this._cgl.gl.getExtension("EXT_color_buffer_float"), null === t ? (this._textureSource = new K(this._cgl), this._textureSource.setSize(16, 16)) : this._textureSource = t, this._textureSource.compareSettings(this._textureTarget) || (this._textureTarget && this._textureTarget.delete(), this._textureTarget = this._textureSource.clone(), W.profileEffectBuffercreate++, this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuf), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, this._renderbuffer), this.depth && this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER, this._cgl.gl.DEPTH_COMPONENT16, this._textureSource.width, this._textureSource.height), this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.TEXTURE_2D, this._textureTarget.tex, 0), this.depth && this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.RENDERBUFFER, this._renderbuffer), this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, null), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, null), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuf2), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, this._renderbuffer2), this.depth && this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER, this._cgl.gl.DEPTH_COMPONENT16, this._textureSource.width, this._textureSource.height), this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.TEXTURE_2D, this._textureSource.tex, 0), this.depth && this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.RENDERBUFFER, this._renderbuffer2), this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, null), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, null), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null))
    }, at.prototype.startEffect = function () {
        this._textureTarget ? (this.switched = !1, this._cgl.pushDepthTest(!1), this._cgl.pushModelMatrix(), this._cgl.pushPMatrix(), this._cgl.gl.viewport(0, 0, this.getCurrentTargetTexture().width, this.getCurrentTargetTexture().height), mat4.perspective(this._cgl.pMatrix, 45, this.getCurrentTargetTexture().width / this.getCurrentTargetTexture().height, .1, 1100), this._cgl.pushPMatrix(), mat4.identity(this._cgl.pMatrix), this._cgl.pushViewMatrix(), mat4.identity(this._cgl.vMatrix), this._cgl.pushModelMatrix(), mat4.identity(this._cgl.mvMatrix)) : console.log("effect has no target")
    }, at.prototype.endEffect = function () {
        this._cgl.popDepthTest(!1), this._cgl.popModelMatrix(), this._cgl.popPMatrix(), this._cgl.popModelMatrix(), this._cgl.popViewMatrix(), this._cgl.popPMatrix(), this._cgl.resetViewPort()
    }, at.prototype.bind = function () {
        null !== this._textureSource ? this.switched ? (this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuf2), this._cgl.pushGlFrameBuffer(this._frameBuf2)) : (this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuf), this._cgl.pushGlFrameBuffer(this._frameBuf)) : console.log("no base texture set!")
    }, at.prototype.finish = function () {
        null !== this._textureSource ? (this._cgl.TextureEffectMesh.render(this._cgl.getShader()), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.popGlFrameBuffer()), this._textureTarget.filter == K.FILTER_MIPMAP && (this.switched ? (this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, this._textureSource.tex), this._textureSource.updateMipMap()) : (this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, this._textureTarget.tex), this._textureTarget.updateMipMap()), this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, null)), this.switched = !this.switched) : console.log("no base texture set!")
    }, at.prototype.getCurrentTargetTexture = function () {
        return this.switched ? this._textureSource : this._textureTarget
    }, at.prototype.getCurrentSourceTexture = function () {
        return this.switched ? this._textureTarget : this._textureSource
    }, at.prototype.delete = function () {
        this._textureTarget && this._textureTarget.delete(), this._textureSource && this._textureSource.delete(), this._cgl.gl.deleteRenderbuffer(this._renderbuffer), this._cgl.gl.deleteFramebuffer(this._frameBuf)
    }, at.prototype.createMesh = function () {
        this._cgl.TextureEffectMesh = nt.getSimpleRect(this._cgl, "textureEffect rect")
    }, at.checkOpNotInTextureEffect = function (t) {
        return t.uiAttribs.error && !t.patch.cgl.currentTextureEffect ? (t.uiAttr({
            error: null
        }), !0) : !t.patch.cgl.currentTextureEffect || (t.patch.cgl.currentTextureEffect && !t.uiAttribs.error ? (t.uiAttr({
            error: "This op can not be a child of a ImageCompose/texture effect! imagecompose should only have textureeffect childs."
        }), !1) : !t.patch.cgl.currentTextureEffect)
    }, at.checkOpInEffect = function (t) {
        return t.patch.cgl.currentTextureEffect && t.uiAttribs.error ? (t.uiAttr({
            error: null
        }), !0) : !!t.patch.cgl.currentTextureEffect || (t.patch.cgl.currentTextureEffect || t.uiAttribs.error ? !!t.patch.cgl.currentTextureEffect : (t.uiAttr({
            error: 'This op must be a child of a texture effect! More infos <a href="https://docs.cables.gl/image_composition/image_composition.html" target="_blank">here</a>.'
        }), !1))
    }, at.getBlendCode = function () {
        return "".endl() + "vec3 _blend(vec3 base,vec3 blend)".endl() + "{".endl() + "   vec3 colNew=blend;".endl() + "   #ifdef BM_MULTIPLY".endl() + "       colNew=base*blend;".endl() + "   #endif".endl() + "   #ifdef BM_MULTIPLY_INV".endl() + "       colNew=base* vec3(1.0)-blend;".endl() + "   #endif".endl() + "   #ifdef BM_AVERAGE".endl() + "       colNew=((base + blend) / 2.0);".endl() + "   #endif".endl() + "   #ifdef BM_ADD".endl() + "       colNew=min(base + blend, vec3(1.0));".endl() + "   #endif".endl() + "   #ifdef BM_SUBSTRACT".endl() + "       colNew=max(base + blend - vec3(1.0), vec3(0.0));".endl() + "   #endif".endl() + "   #ifdef BM_DIFFERENCE".endl() + "       colNew=abs(base - blend);".endl() + "   #endif".endl() + "   #ifdef BM_NEGATION".endl() + "       colNew=(vec3(1.0) - abs(vec3(1.0) - base - blend));".endl() + "   #endif".endl() + "   #ifdef BM_EXCLUSION".endl() + "       colNew=(base + blend - 2.0 * base * blend);".endl() + "   #endif".endl() + "   #ifdef BM_LIGHTEN".endl() + "       colNew=max(blend, base);".endl() + "   #endif".endl() + "   #ifdef BM_DARKEN".endl() + "       colNew=min(blend, base);".endl() + "   #endif".endl() + "   #ifdef BM_OVERLAY".endl() + "      #define BlendOverlayf(base, blend)  (base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend)))".endl() + "      colNew=vec3(BlendOverlayf(base.r, blend.r),BlendOverlayf(base.g, blend.g),BlendOverlayf(base.b, blend.b));".endl() + "   #endif".endl() + "   #ifdef BM_SCREEN".endl() + "      #define BlendScreenf(base, blend)       (1.0 - ((1.0 - base) * (1.0 - blend)))".endl() + "      colNew=vec3(BlendScreenf(base.r, blend.r),BlendScreenf(base.g, blend.g),BlendScreenf(base.b, blend.b));".endl() + "   #endif".endl() + "   #ifdef BM_SOFTLIGHT".endl() + "      #define BlendSoftLightf(base, blend)    ((blend < 0.5) ? (2.0 * base * blend + base * base * (1.0 - 2.0 * blend)) : (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend)))".endl() + "      colNew=vec3(BlendSoftLightf(base.r, blend.r),BlendSoftLightf(base.g, blend.g),BlendSoftLightf(base.b, blend.b));".endl() + "   #endif".endl() + "   #ifdef BM_HARDLIGHT".endl() + "      #define BlendOverlayf(base, blend)  (base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend)))".endl() + "      colNew=vec3(BlendOverlayf(base.r, blend.r),BlendOverlayf(base.g, blend.g),BlendOverlayf(base.b, blend.b));".endl() + "   #endif".endl() + "   #ifdef BM_COLORDODGE".endl() + "      #define BlendColorDodgef(base, blend)   ((blend == 1.0) ? blend : min(base / (1.0 - blend), 1.0))".endl() + "      colNew=vec3(BlendColorDodgef(base.r, blend.r),BlendColorDodgef(base.g, blend.g),BlendColorDodgef(base.b, blend.b));".endl() + "   #endif".endl() + "   #ifdef BM_COLORBURN".endl() + "      #define BlendColorBurnf(base, blend)    ((blend == 0.0) ? blend : max((1.0 - ((1.0 - base) / blend)), 0.0))".endl() + "      colNew=vec3(BlendColorBurnf(base.r, blend.r),BlendColorBurnf(base.g, blend.g),BlendColorBurnf(base.b, blend.b));".endl() + "   #endif".endl() + "   return colNew;".endl() + "}".endl() + "vec4 cgl_blend(vec4 oldColor,vec4 newColor,float amount)".endl() + "{".endl() + "   vec4 col=vec4( _blend(oldColor.rgb,newColor.rgb) ,1.0);".endl() + "   col=vec4( mix( col.rgb, oldColor.rgb ,1.0-oldColor.a*amount),1.0);".endl() + "   return col;".endl() + "}"
    }, at.onChangeBlendSelect = function (t, e) {
        "normal" == e ? t.define("BM_NORMAL") : t.removeDefine("BM_NORMAL"), "multiply" == e ? t.define("BM_MULTIPLY") : t.removeDefine("BM_MULTIPLY"), "multiply invert" == e ? t.define("BM_MULTIPLY_INV") : t.removeDefine("BM_MULTIPLY_INV"), "average" == e ? t.define("BM_AVERAGE") : t.removeDefine("BM_AVERAGE"), "add" == e ? t.define("BM_ADD") : t.removeDefine("BM_ADD"), "substract" == e ? t.define("BM_SUBSTRACT") : t.removeDefine("BM_SUBSTRACT"), "difference" == e ? t.define("BM_DIFFERENCE") : t.removeDefine("BM_DIFFERENCE"), "negation" == e ? t.define("BM_NEGATION") : t.removeDefine("BM_NEGATION"), "exclusion" == e ? t.define("BM_EXCLUSION") : t.removeDefine("BM_EXCLUSION"), "lighten" == e ? t.define("BM_LIGHTEN") : t.removeDefine("BM_LIGHTEN"), "darken" == e ? t.define("BM_DARKEN") : t.removeDefine("BM_DARKEN"), "overlay" == e ? t.define("BM_OVERLAY") : t.removeDefine("BM_OVERLAY"), "screen" == e ? t.define("BM_SCREEN") : t.removeDefine("BM_SCREEN"), "softlight" == e ? t.define("BM_SOFTLIGHT") : t.removeDefine("BM_SOFTLIGHT"), "hardlight" == e ? t.define("BM_HARDLIGHT") : t.removeDefine("BM_HARDLIGHT"), "color dodge" == e ? t.define("BM_COLORDODGE") : t.removeDefine("BM_COLORDODGE"), "color burn" == e ? t.define("BM_COLORBURN") : t.removeDefine("BM_COLORBURN")
    }, at.AddBlendSelect = function (t, e) {
        return t.inValueSelect(e, ["normal", "lighten", "darken", "multiply", "multiply invert", "average", "add", "substract", "difference", "negation", "exclusion", "overlay", "screen", "color dodge", "color burn", "softlight", "hardlight"], "normal")
    }, at.setupBlending = function (t, e, n, a) {
        t.setPortGroup("Blending", [n, a]), n.onChange = function () {
            at.onChangeBlendSelect(e, n.get());
            var a = n.get();
            "normal" == a ? a = null : "multiply" == a ? a = "mul" : "multiply invert" == a ? a = "mulinv" : "lighten" == a ? a = "light" : "darken" == a ? a = "darken" : "average" == a ? a = "avg" : "substract" == a ? a = "sub" : "difference" == a ? a = "diff" : "negation" == a ? a = "neg" : "negation" == a ? a = "neg" : "negation" == a ? a = "neg" : "exclusion" == a ? a = "exc" : "overlay" == a ? a = "ovl" : "color dodge" == a ? a = "dodge" : "color burn" == a ? a = "burn" : "softlight" == a ? a = "soft" : "hardlight" == a && (a = "hard"), t.setUiAttrib({
                extendTitle: a
            })
        }
    };
    const it = {
            "CGL.BLENDMODES": function () {
                this.name = "blendmodes", this.srcHeadFrag = at.getBlendCode()
            },
            "CGL.RANDOM_OLD": function () {
                this.name = "randomNumber", this.srcHeadFrag = "".endl() + "float cgl_random(vec2 co)".endl() + "{".endl() + "    return fract(sin(dot(co.xy ,vec2(12.9898,4.1414))) * 432758.5453);".endl() + "}".endl() + "vec3 cgl_random3(vec2 co)".endl() + "{".endl() + "    return vec3( cgl_random(co),cgl_random(co+0.5711),cgl_random(co+1.5711));".endl() + "}"
            },
            "CGL.RANDOM_LOW": function () {
                this.name = "randomNumber", this.srcHeadFrag = "".endl() + "float cgl_random(vec2 co)".endl() + "{".endl() + "    return fract(sin(dot(co.xy ,vec2(12.9898,4.1414))) * 358.5453);".endl() + "}".endl() + "vec3 cgl_random3(vec2 co)".endl() + "{".endl() + "    return vec3( cgl_random(co),cgl_random(co+0.5711),cgl_random(co+1.5711));".endl() + "}"
            },
            "CGL.RANDOM_TEX": function () {
                this.name = "randomNumbertex", this.srcHeadFrag = "".endl() + "UNI sampler2D CGLRNDTEX;".endl() + "float cgl_random(vec2 co)".endl() + "{".endl() + "    return texture(CGLRNDTEX,co*5711.0).r;".endl() + "}".endl() + "vec3 cgl_random3(vec2 co)".endl() + "{".endl() + "    return texture(CGLRNDTEX,co*5711.0).rgb;".endl() + "}", this.initUniforms = function (t) {
                    return [new J(t, "t", "CGLRNDTEX", 7)]
                }, this.onBind = function (t, e) {
                    K.getRandomTexture(t), t.setTexture(7, K.getRandomTexture(t).tex)
                }
            }
        },
        rt = function () {
            return window.performance.now()
        },
        st = function () {
            return rt()
        },
        ot = function () {
            this._timeStart = rt(), this._timeOffset = 0, this._currentTime = 0, this._lastTime = 0, this._paused = !0, this._delay = 0, this._eventsPaused = !1, this.overwriteTime = -1, this.cbPlayPause = [], this.cbTimeChange = []
        };
    ot.prototype._getTime = function () {
        return this._lastTime = (rt() - this._timeStart) / 1e3, this._lastTime + this._timeOffset
    }, ot.prototype._eventPlayPause = function () {
        if (!this._eventsPaused)
            for (var t in this.cbPlayPause) this.cbPlayPause[t]()
    }, ot.prototype._eventTimeChange = function () {
        if (!this._eventsPaused)
            for (var t in this.cbTimeChange) this.cbTimeChange[t]()
    }, ot.prototype.setDelay = function (t) {
        this._delay = t, this._eventTimeChange()
    }, ot.prototype.isPlaying = function () {
        return !this._paused
    }, ot.prototype.update = function () {
        if (!this._paused) return this._currentTime = this._getTime(), this._currentTime
    }, ot.prototype.getMillis = function () {
        return 1e3 * this.get()
    }, ot.prototype.get = ot.prototype.getTime = function () {
        return this.overwriteTime >= 0 ? this.overwriteTime - this._delay : this._currentTime - this._delay
    }, ot.prototype.togglePlay = function () {
        this._paused ? this.play() : this.pause()
    }, ot.prototype.setTime = function (t) {
        t < 0 && (t = 0), this._timeStart = rt(), this._timeOffset = t, this._currentTime = t, this._eventTimeChange()
    }, ot.prototype.setOffset = function (t) {
        this._currentTime + t < 0 ? (this._timeStart = rt(), this._timeOffset = 0, this._currentTime = 0) : (this._timeOffset += t, this._currentTime = this._lastTime + this._timeOffset), this._eventTimeChange()
    }, ot.prototype.play = function () {
        this._timeStart = rt(), this._paused = !1, this._eventPlayPause()
    }, ot.prototype.pause = function () {
        this._timeOffset = this._currentTime, this._paused = !0, this._eventPlayPause()
    }, ot.prototype.pauseEvents = function (t) {
        this._eventsPaused = t
    }, ot.prototype.onPlayPause = function (t) {
        t && "function" == typeof t && this.cbPlayPause.push(t)
    }, ot.prototype.onTimeChange = function (t) {
        t && "function" == typeof t && this.cbTimeChange.push(t)
    };
    const lt = function (t, e) {
        if (!t) throw "shader constructed without cgl";
        this._cgl = t, this._name = e || "unknown", this.glslVersion = 0, t.glVersion > 1 && (this.glslVersion = 300), this.id = I(), this._program = null, this._uniforms = [], this._drawBuffers = [!0], this._defines = [], this._needsRecompile = !0, this._projMatrixUniform = null, this._mvMatrixUniform = null, this._mMatrixUniform = null, this._vMatrixUniform = null, this._camPosUniform = null, this._normalMatrixUniform = null, this._inverseViewMatrixUniform = null, this._attrVertexPos = -1, this.precision = t.patch.config.glslPrecision || "highp", this._pMatrixState = -1, this._vMatrixState = -1, this._modGroupCount = 0, this._feedBackNames = [], this._attributes = [], this.glPrimitive = null, this.offScreenPass = !1, this._extensions = [], this.srcVert = this.getDefaultVertexShader(), this.srcFrag = this.getDefaultFragmentShader(), this.lastCompile = 0, this._moduleNames = [], this._modules = [], this._moduleNumId = 0, this._libs = [], this._tempNormalMatrix = mat4.create(), this._tempCamPosMatrix = mat4.create(), this._tempInverseViewMatrix = mat4.create(), this.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG"])
    };
    lt.prototype.getCgl = function () {
        return this._cgl
    }, lt.prototype.getName = function () {
        return this._name
    }, lt.prototype.enableExtension = function (t) {
        this.setWhyCompile("enable extension " + t), this._needsRecompile = !0, this._extensions.push(t)
    }, lt.prototype.getAttrVertexPos = function () {
        return this._attrVertexPos
    }, lt.prototype.hasTextureUniforms = function () {
        for (var t = 0; t < this._uniforms.length; t++)
            if ("t" == this._uniforms[t].getType()) return !0;
        return !1
    }, lt.prototype.setWhyCompile = function (t) {}, lt.prototype.setSource = function (t, e) {
        this.srcVert = t, this.srcFrag = e, this.setWhyCompile("Source changed"), this._needsRecompile = !0
    }, lt.prototype._addLibs = function (t) {
        for (var e in it)
            if (t.indexOf(e) > -1) {
                var n = new it[e];
                t = t.replace("{{" + e + "}}", n.srcHeadFrag), this._libs.push(n), n.initUniforms && n.initUniforms(this)
            } return t
    }, lt.prototype.compile = function () {
        W.profileShaderCompiles++, W.profileShaderCompileName = this._name;
        var t = "";
        if (this._extensions)
            for (n = 0; n < this._extensions.length; n++) t += "#extension " + this._extensions[n] + " : enable".endl();
        var e = "",
            n = 0;
        for (n = 0; n < this._defines.length; n++) e += "#define " + this._defines[n][0] + " " + this._defines[n][1] + "".endl();
        if (this._uniforms)
            for (n = 0; n < this._uniforms.length; n++) this._uniforms[n].resetLoc();
        this.hasTextureUniforms() && (e += "#define HAS_TEXTURES".endl());
        var a = "",
            i = "";
        if (300 == this.glslVersion) {
            var r = "",
                s = 0;
            if (this.srcFrag.indexOf("outColor0") > -1 && (this._drawBuffers[0] = !0), this.srcFrag.indexOf("outColor1") > -1 && (this._drawBuffers[1] = !0), this.srcFrag.indexOf("outColor2") > -1 && (this._drawBuffers[2] = !0), this.srcFrag.indexOf("outColor3") > -1 && (this._drawBuffers[3] = !0), 1 == this._drawBuffers.length) r = "out vec4 outColor;".endl(), r += "#define gl_FragColor outColor".endl();
            else
                for (s = 0, r += "vec4 outColor;".endl(), n = 0; n < this._drawBuffers.length; n++) 0 == s && (r += "#define gl_FragColor outColor" + n + "".endl()), r += "layout(location = " + n + ") out vec4 outColor" + n + ";".endl(), s++;
            a = "#version 300 es".endl() + "// ".endl() + "// vertex shader " + this._name.endl() + "// ".endl() + "precision " + this.precision + " float;".endl() + "".endl() + "#define WEBGL2".endl() + "#define texture2D texture".endl() + "#define UNI uniform".endl() + "#define IN in".endl() + "#define OUT out".endl(), i = "#version 300 es".endl() + "// ".endl() + "// fragment shader " + this._name.endl() + "// ".endl() + "precision " + this.precision + " float;".endl() + "".endl() + "#define WEBGL2".endl() + "#define texture2D texture".endl() + "#define IN in".endl() + "#define UNI uniform".endl() + r.endl()
        } else i = "".endl() + "// ".endl() + "// fragment shader " + this._name.endl() + "// ".endl() + "#define WEBGL1".endl() + "#define texture texture2D".endl() + "#define outColor gl_FragColor".endl() + "#define IN varying".endl() + "#define UNI uniform".endl(), a = "".endl() + "// ".endl() + "// vertex shader " + this._name.endl() + "// ".endl() + "#define WEBGL1".endl() + "#define texture texture2D".endl() + "#define OUT varying".endl() + "#define IN attribute".endl() + "#define UNI uniform".endl(); - 1 == i.indexOf("precision") && (i = "precision " + this.precision + " float;".endl() + i), -1 == a.indexOf("precision") && (a = "precision " + this.precision + " float;".endl() + a), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (i += "#define MOBILE".endl(), a += "#define MOBILE".endl()), a = t + a + e + this.srcVert, i = t + i + e + this.srcFrag;
        var o = "",
            l = "";
        this._modules.sort(function (t, e) {
            return t.group - e.group
        }), this._modules.sort(function (t, e) {
            return t.priority || 0 - e.priority || 0
        });
        var u = !1;
        for (n = 0; n < this._moduleNames.length; n++) {
            for (var h = "", c = "", d = 0; d < this._modules.length; d++)
                if (this._modules[d].name == this._moduleNames[n]) {
                    if (o += "\n//---- MOD: " + this._modules[d].group + ": " + d + " - " + this._modules[d].title + " ------\n", l += "\n//---- MOD: " + this._modules[d].group + ": " + d + " - " + this._modules[d].title + " ------\n", h += "\n\n//---- MOD: " + this._modules[d].title + " ------\n", c += "\n\n//---- MOD: " + this._modules[d].title + " ------\n", !u) {
                        u = !0;
                        for (var f = 0; f < this._attributes.length; f++) this._attributes[f].name && this._attributes[f].type && (o += "".endl() + "#ifndef ATTRIB_" + this._attributes[f].name.endl() + "  #define ATTRIB_" + this._attributes[f].name.endl() + "  IN " + this._attributes[f].type + " " + this._attributes[f].name + ";".endl() + "#endif", this._attributes[f].nameFrag && (o += "".endl() + "#ifndef ATTRIB_" + this._attributes[f].nameFrag.endl() + "  #define ATTRIB_" + this._attributes[f].nameFrag.endl() + "  OUT " + this._attributes[f].type + " " + this._attributes[f].nameFrag + ";".endl() + "#endif", h += "".endl() + this._attributes[f].nameFrag + "=" + this._attributes[f].name + ";"), l += "".endl() + "#ifndef ATTRIB_" + this._attributes[f].nameFrag.endl() + "  #define ATTRIB_" + this._attributes[f].nameFrag.endl() + "  IN " + this._attributes[f].type + " " + this._attributes[f].nameFrag + ";".endl() + "#endif")
                    }
                    o += this._modules[d].srcHeadVert || "", l += this._modules[d].srcHeadFrag || "", h += this._modules[d].srcBodyVert || "", c += this._modules[d].srcBodyFrag || "", o += "\n//---- end mod ------\n", l += "\n//---- end mod ------\n", c += "\n//---- end mod ------\n", h = (h += "\n//---- end mod ------\n").replace(/{{mod}}/g, this._modules[d].prefix), c = c.replace(/{{mod}}/g, this._modules[d].prefix), o = o.replace(/{{mod}}/g, this._modules[d].prefix), l = l.replace(/{{mod}}/g, this._modules[d].prefix), h = h.replace(/MOD_/g, this._modules[d].prefix), c = c.replace(/MOD_/g, this._modules[d].prefix), o = o.replace(/MOD_/g, this._modules[d].prefix), l = l.replace(/MOD_/g, this._modules[d].prefix)
                } a = a.replace("{{" + this._moduleNames[n] + "}}", h), i = i.replace("{{" + this._moduleNames[n] + "}}", c)
        }
        if (a = a.replace("{{MODULES_HEAD}}", o), i = i.replace("{{MODULES_HEAD}}", l), a = this._addLibs(a), i = this._addLibs(i), this._program)
            for (this._program = this._createProgram(a, i), this._projMatrixUniform = null, n = 0; n < this._uniforms.length; n++) this._uniforms[n].resetLoc();
        else this._program = this._createProgram(a, i);
        this.finalShaderFrag = i, this.finalShaderVert = a, tt.lastMesh = null, tt.lastShader = null, this._needsRecompile = !1, this.lastCompile = st()
    }, lt.prototype.bind = function () {
        var t = 0;
        if (tt.lastShader = this, this._program && !this._needsRecompile || this.compile(), !this._projMatrixUniform)
            for (this._attrVertexPos = this._cgl.glGetAttribLocation(this._program, $.SHADER.SHADERVAR_VERTEX_POSITION), this._projMatrixUniform = this._cgl.gl.getUniformLocation(this._program, $.SHADER.SHADERVAR_UNI_PROJMAT), this._mvMatrixUniform = this._cgl.gl.getUniformLocation(this._program, "mvMatrix"), this._vMatrixUniform = this._cgl.gl.getUniformLocation(this._program, $.SHADER.SHADERVAR_UNI_VIEWMAT), this._mMatrixUniform = this._cgl.gl.getUniformLocation(this._program, $.SHADER.SHADERVAR_UNI_MODELMAT), this._camPosUniform = this._cgl.gl.getUniformLocation(this._program, $.SHADER.SHADERVAR_UNI_VIEWPOS), this._normalMatrixUniform = this._cgl.gl.getUniformLocation(this._program, $.SHADER.SHADERVAR_UNI_NORMALMAT), this._inverseViewMatrixUniform = this._cgl.gl.getUniformLocation(this._program, $.SHADER.SHADERVAR_UNI_INVVIEWMAT), t = 0; t < this._uniforms.length; t++) this._uniforms[t].needsUpdate = !0;
        for (this._cgl.currentProgram != this._program && (W.profileShaderBinds++, this._cgl.gl.useProgram(this._program), this._cgl.currentProgram = this._program), t = 0; t < this._uniforms.length; t++) this._uniforms[t].needsUpdate && this._uniforms[t].updateValue();
        if (this._pMatrixState != this._cgl.getProjectionMatrixStateCount() && (this._pMatrixState = this._cgl.getProjectionMatrixStateCount(), this._cgl.gl.uniformMatrix4fv(this._projMatrixUniform, !1, this._cgl.pMatrix), W.profileMVPMatrixCount++), this._vMatrixUniform) this._vMatrixState != this._cgl.getViewMatrixStateCount() && (this._cgl.gl.uniformMatrix4fv(this._vMatrixUniform, !1, this._cgl.vMatrix), W.profileMVPMatrixCount++, this._vMatrixState = this._cgl.getViewMatrixStateCount(), this._inverseViewMatrixUniform && (mat4.invert(this._tempInverseViewMatrix, this._cgl.vMatrix), this._cgl.gl.uniformMatrix4fv(this._inverseViewMatrixUniform, !1, this._tempInverseViewMatrix), W.profileMVPMatrixCount++)), this._cgl.gl.uniformMatrix4fv(this._mMatrixUniform, !1, this._cgl.mMatrix), W.profileMVPMatrixCount++, this._camPosUniform && (mat4.invert(this._tempCamPosMatrix, this._cgl.vMatrix), this._cgl.gl.uniform3f(this._camPosUniform, this._tempCamPosMatrix[12], this._tempCamPosMatrix[13], this._tempCamPosMatrix[14]), W.profileMVPMatrixCount++);
        else {
            var e = mat4.create();
            mat4.mul(e, this._cgl.vMatrix, this._cgl.mMatrix), this._cgl.gl.uniformMatrix4fv(this._mvMatrixUniform, !1, e), W.profileMVPMatrixCount++
        }
        for (this._normalMatrixUniform && (mat4.mul(this._tempNormalMatrix, this._cgl.vMatrix, this._cgl.mMatrix), mat4.invert(this._tempNormalMatrix, this._tempNormalMatrix), mat4.transpose(this._tempNormalMatrix, this._tempNormalMatrix), this._cgl.gl.uniformMatrix4fv(this._normalMatrixUniform, !1, this._tempNormalMatrix), W.profileMVPMatrixCount++), t = 0; t < this._libs.length; t++) this._libs[t].onBind && this._libs[t].onBind.bind(this._libs[t])(this._cgl, this)
    }, lt.prototype.toggleDefine = function (t, e) {
        e ? this.define(t) : this.removeDefine(t)
    }, lt.prototype.define = function (t, e) {
        e || (e = "");
        for (var n = 0; n < this._defines.length; n++) {
            if (this._defines[n][0] == t && this._defines[n][1] == e) return;
            if (this._defines[n][0] == t) return this._defines[n][1] = e, void(this._needsRecompile = !0)
        }
        this._defines.push([t, e]), this._needsRecompile = !0, this.setWhyCompile("define " + t + " " + e)
    }, lt.prototype.getDefines = function () {
        return this._defines
    }, lt.prototype.getDefine = function (t) {
        for (var e = 0; e < this._defines.length; e++)
            if (this._defines[e][0] == t) return this._defines[e][1];
        return null
    }, lt.prototype.hasDefine = function (t) {
        for (var e = 0; e < this._defines.length; e++)
            if (this._defines[e][0] == t) return !0
    }, lt.prototype.removeDefine = function (t) {
        for (var e = 0; e < this._defines.length; e++)
            if (this._defines[e][0] == t) return this._defines.splice(e, 1), void(this._needsRecompile = !0)
    }, lt.prototype.removeModule = function (t) {
        for (var e = 0; e < this._modules.length; e++)
            if (t && t.id && (this._modules[e].id == t.id || !this._modules[e])) {
                for (var n = !0; n;) {
                    n = !1;
                    for (var a = 0; a < this._uniforms.length; a++) 0 != this._uniforms[a].getName().indexOf(t.prefix) || (this._uniforms.splice(a, 1), n = !0)
                }
                this._needsRecompile = !0, this.setWhyCompile("remove module " + t.title), this._modules.splice(e, 1);
                break
            }
    }, lt.prototype.getNumModules = function () {
        return this._modules.length
    }, lt.prototype.getCurrentModules = function () {
        return this._modules
    }, lt.prototype.addModule = function (t, e) {
        return t.id || (t.id = v()), t.numId || (t.numId = this._moduleNumId), t.num || (t.num = this._modules.length), t.group = e ? e.group : this._modGroupCount++, t.prefix = "mod" + t.group, this._modules.push(t), this._needsRecompile = !0, this.setWhyCompile("add module " + t.title), this._moduleNumId++, t
    }, lt.prototype.setModules = function (t) {
        this._moduleNames = t
    }, lt.prototype.dispose = function () {
        this._cgl.gl.deleteProgram(this._program)
    }, lt.prototype.setDrawBuffers = function (t) {
        this._drawBuffers = t, this._needsRecompile = !0
    }, lt.prototype.getUniforms = function () {
        return this._uniforms
    }, lt.prototype.getUniform = function (t) {
        for (var e = 0; e < this._uniforms.length; e++)
            if (this._uniforms[e].getName() == t) return this._uniforms[e];
        return null
    }, lt.prototype.removeUniform = function (t) {
        for (var e = 0; e < this._uniforms.length; e++) this._uniforms[e].getName() == t && this._uniforms.splice(e, 1);
        this._needsRecompile = !0, this.setWhyCompile("remove uniform " + t)
    }, lt.prototype.addUniform = function (t) {
        this._uniforms.push(t), this.setWhyCompile("add uniform " + name), this._needsRecompile = !0
    }, lt.prototype._createProgram = function (t, e) {
        var n = this._cgl.gl.createProgram();
        return this.vshader = lt.createShader(this._cgl, t, this._cgl.gl.VERTEX_SHADER, this), this.fshader = lt.createShader(this._cgl, e, this._cgl.gl.FRAGMENT_SHADER, this), this._cgl.gl.attachShader(n, this.vshader), this._cgl.gl.attachShader(n, this.fshader), this._linkProgram(n), n
    }, lt.prototype.hasErrors = function () {
        return this._hasErrors
    }, lt.prototype._linkProgram = function (t) {
        this._feedBackNames.length > 0 && this._cgl.gl.transformFeedbackVaryings(t, this._feedBackNames, this._cgl.gl.SEPARATE_ATTRIBS), this._cgl.gl.linkProgram(t), this._cgl.gl.validateProgram(t), this._cgl.gl.getProgramParameter(t, this._cgl.gl.LINK_STATUS) || (console.warn(this._cgl.gl.getShaderInfoLog(this.fshader)), console.warn(this._cgl.gl.getShaderInfoLog(this.vshader)), console.error(name + " shader linking fail..."), console.log("srcFrag", this.srcFrag), console.log("srcVert", this.srcVert), console.log(name + " programinfo: ", this._cgl.gl.getProgramInfoLog(t)), console.log("--------------------------------------"), console.log(this), console.log("--------------------------------------"), name = "errorshader", this.setSource(lt.getDefaultVertexShader(), lt.getErrorFragmentShader()))
    }, lt.prototype.getProgram = function () {
        return this._program
    }, lt.prototype.setFeedbackNames = function (t) {
        this._needsRecompile = !0, this._feedBackNames = t
    }, lt.prototype.getDefaultVertexShader = lt.getDefaultVertexShader = function () {
        return "".endl() + "{{MODULES_HEAD}}".endl() + "IN vec3 vPosition;".endl() + "IN vec2 attrTexCoord;".endl() + "IN vec3 attrVertNormal;".endl() + "IN float attrVertIndex;".endl() + "OUT vec2 texCoord;".endl() + "OUT vec3 norm;".endl() + "UNI mat4 projMatrix;".endl() + "UNI mat4 viewMatrix;".endl() + "UNI mat4 modelMatrix;".endl() + "void main()".endl() + "{".endl() + "   texCoord=attrTexCoord;".endl() + "   norm=attrVertNormal;".endl() + "   vec4 pos=vec4(vPosition,  1.0);".endl() + "   mat4 mMatrix=modelMatrix;".endl() + "   {{MODULE_VERTEX_POSITION}}".endl() + "   gl_Position = projMatrix * (viewMatrix*mMatrix) * pos;".endl() + "}"
    }, lt.prototype.getDefaultFragmentShader = lt.getDefaultFragmentShader = function (t, e, n) {
        return null == t && (t = .5, e = .5, n = .5), "".endl() + "IN vec2 texCoord;".endl() + "{{MODULES_HEAD}}".endl() + "void main()".endl() + "{".endl() + "    vec4 col=vec4(" + t + "," + e + "," + n + ",1.0);".endl() + "    {{MODULE_COLOR}}".endl() + "    outColor = col;".endl() + "}"
    }, lt.prototype.addAttribute = function (t) {
        for (var e = 0; e < this._attributes.length; e++)
            if (this._attributes[e].name == t.name && this._attributes[e].nameFrag == t.nameFrag) return;
        this._attributes.push(t), this._needsRecompile = !0
    }, lt.getErrorFragmentShader = function () {
        return "".endl() + "void main()".endl() + "{".endl() + "   float g=mod((gl_FragCoord.y+gl_FragCoord.x),50.0)/50.0;".endl() + "   g= step(0.1,g);".endl() + "   outColor = vec4( g+0.5, 0.0, 0.0, 1.0);".endl() + "}"
    }, lt.createShader = function (t, e, n, a) {
        var i = t.gl.createShader(n);
        if (t.gl.shaderSource(i, e), t.gl.compileShader(i), !t.gl.getShaderParameter(i, t.gl.COMPILE_STATUS)) {
            console.log("compile status: "), n == t.gl.VERTEX_SHADER && console.log("VERTEX_SHADER"), n == t.gl.FRAGMENT_SHADER && console.log("FRAGMENT_SHADER"), console.warn(t.gl.getShaderInfoLog(i));
            var r = t.gl.getShaderInfoLog(i),
                s = function (t) {
                    var e = [],
                        n = r.split("\n");
                    for (var a in n) {
                        var i = n[a].split(":");
                        parseInt(i[2], 10) && e.push(parseInt(i[2], 10))
                    }
                    return e
                }(),
                o = '<div class="shaderErrorCode">',
                l = e.match(/^.*((\r\n|\n|\r)|$)/gm);
            for (var u in l) {
                var h = parseInt(u, 10) + 1,
                    c = h + ": " + l[u];
                console.log(c);
                var d = !1;
                for (var f in s) s[f] == h && (d = !0);
                d && (o += '<span class="error">'), o += c, d && (o += "</span>")
            }
            console.warn(r), o = (r = r.replace(/\n/g, "<br/>")) + "<br/>" + o + "<br/><br/>", t.patch.emitEvent("criticalError", "Shader error " + name, o), t.patch.isEditorMode() && console.log("Shader error " + name, o), o += "</div>", name = "errorshader", a.setSource(lt.getDefaultVertexShader(), lt.getErrorFragmentShader())
        }
        return i
    };
    const ut = Math.PI / 180,
        ht = (Math.PI, -1 != window.navigator.userAgent.indexOf("Windows")),
        ct = function (t) {
            var e;
            if (t.wheelDelta) e = t.wheelDelta % 120 - 0 == -0 ? t.wheelDelta / 120 : t.wheelDelta / 30, e *= -1.5, ht && (e *= 2);
            else {
                var n = t.deltaY;
                t.shiftKey && (n = t.deltaX);
                var a = n || t.detail;
                e = -(a % 3 ? 10 * a : a / 3), e *= -3
            }
            return e > 20 && (e = 20), e < -20 && (e = -20), e
        },
        dt = ct,
        ft = ct,
        pt = function () {
            this._arr = [mat4.create()], this._index = 0, this.stateCounter = 0
        };
    pt.prototype.push = function (t) {
        if (this._index++, this.stateCounter++, this._index == this._arr.length) {
            var e = mat4.create();
            this._arr.push(e)
        }
        return mat4.copy(this._arr[this._index], t || this._arr[this._index - 1]), this._arr[this._index]
    }, pt.prototype.pop = function () {
        return this.stateCounter++, this._index--, this._index < 0 && (this._index = 0), this._arr[this._index]
    }, pt.prototype.length = function () {
        return this._index
    };
    const gt = function (t) {
        var e = this,
            n = [0, 0, 0, 0];
        this.glVersion = 0, this.glUseHalfFloatTex = !1, this.clearCanvasTransparent = !0, this.clearCanvasDepth = !0, this.patch = t, this.temporaryTexture = null, this.frameStore = {}, this.gl = null, this.pMatrix = mat4.create(), this.mMatrix = mat4.create(), this.vMatrix = mat4.create(), this._textureslots = [], this._pMatrixStack = new pt, this._mMatrixStack = new pt, this._vMatrixStack = new pt, this._glFrameBufferStack = [], this._frameBufferStack = [], this._shaderStack = [], Object.defineProperty(this, "mvMatrix", {
            get() {
                return this.mMatrix
            },
            set(t) {
                this.mMatrix = t
            }
        }), this.canvas = null, this.pixelDensity = 1, mat4.identity(this.mMatrix), mat4.identity(this.vMatrix);
        var a = new lt(this, "simpleshader");
        a.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG"]), a.setSource(lt.getDefaultVertexShader(), lt.getDefaultFragmentShader());
        var i = a,
            r = [];
        this.addEventListener = function (t, e) {
            "resize" == t && r.push(e)
        }, this.removeEventListener = function (t, e) {
            if ("resize" == t)
                for (var n in r)
                    if (r[n] == e) return void r.splice(n, 1)
        }, this.exitError = function (t, e) {
            this.patch.exitError(t, e), this.aborted = !0
        }, this.setCanvas = function (t) {
            if (this.canvas = "string" == typeof t ? document.getElementById(t) : t, this.patch.config.canvas || (this.patch.config.canvas = {}), this.patch.config.canvas.hasOwnProperty("preserveDrawingBuffer") || (this.patch.config.canvas.preserveDrawingBuffer = !1), this.patch.config.canvas.hasOwnProperty("premultipliedAlpha") || (this.patch.config.canvas.premultipliedAlpha = !1), this.patch.config.canvas.hasOwnProperty("alpha") || (this.patch.config.canvas.alpha = !1), this.patch.config.hasOwnProperty("clearCanvasColor") && (this.clearCanvasTransparent = this.patch.config.clearCanvasColor), this.patch.config.hasOwnProperty("clearCanvasDepth") && (this.clearCanvasDepth = this.patch.config.clearCanvasDepth), this.gl = this.canvas.getContext("webgl2", this.patch.config.canvas), this.gl ? this.glVersion = 2 : (this.gl = this.canvas.getContext("webgl", this.patch.config.canvas) || this.canvas.getContext("experimental-webgl", this.patch.config.canvas), this.glVersion = 1, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && (this.glUseHalfFloatTex = !0), /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && (this.patch.config.canvas.hasOwnProperty("powerPreference") || (this.patch.config.canvas.powerPreference = "high-performance"))), this.gl) {
                this.gl.getExtension("GL_OES_standard_derivatives");
                var n = this.gl.getExtension("ANGLE_instanced_arrays") || this.gl;
                n.vertexAttribDivisorANGLE && (this.gl.vertexAttribDivisor = n.vertexAttribDivisorANGLE.bind(n), this.gl.drawElementsInstanced = n.drawElementsInstancedANGLE.bind(n)), e.updateSize()
            } else this.exitError("NO_WEBGL", "sorry, could not initialize WebGL. Please check if your Browser supports WebGL.")
        }, this.updateSize = function () {
            this.canvas.width = this.canvasWidth = this.canvas.clientWidth * this.pixelDensity, this.canvas.height = this.canvasHeight = this.canvas.clientHeight * this.pixelDensity
        }, this.canvasWidth = -1, this.canvasHeight = -1, this.canvasScale = 1;
        var s = -1,
            o = -1;
        this.getViewPort = function () {
            return n
        }, this.resetViewPort = function () {
            this.gl.viewport(n[0], n[1], n[2], n[3])
        }, this.setViewPort = function (t, e, a, i) {
            n[0] = Math.round(t), n[1] = Math.round(e), n[2] = Math.round(a), n[3] = Math.round(i), this.gl.viewport(n[0], n[1], n[2], n[3])
        }, this.beginFrame = function () {
            CABLES.UI && (gui.metaTexturePreviewer.render(), CABLES.UI.patchPreviewer && CABLES.UI.patchPreviewer.render()), e.setShader(a)
        }, this.screenShot = function (t, e) {
            e && (this.gl.clearColor(1, 1, 1, 1), this.gl.colorMask(!1, !1, !1, !0), this.gl.clear(this.gl.COLOR_BUFFER_BIT), this.gl.colorMask(!0, !0, !0, !0)), this.canvas && this.canvas.toBlob && this.canvas.toBlob(e => {
                t ? t(e) : console.log("no screenshot callback...")
            })
        }, this.endFrame = function () {
            if (CABLES.UI && CABLES.GL_MARKER.drawMarkerLayer(this), e.setPreviousShader(), this._vMatrixStack.length() > 0 && console.warn("view matrix stack length !=0 at end of rendering..."), this._mMatrixStack.length() > 0 && console.warn("mvmatrix stack length !=0 at end of rendering..."), this._pMatrixStack.length() > 0 && console.warn("pmatrix stack length !=0 at end of rendering..."), this._glFrameBufferStack.length > 0 && console.warn("glFrameBuffer stack length !=0 at end of rendering..."), this._stackDepthTest.length > 0 && console.warn("depthtest stack length !=0 at end of rendering..."), this._stackDepthWrite.length > 0 && console.warn("depthwrite stack length !=0 at end of rendering..."), this._stackDepthFunc.length > 0 && console.warn("depthfunc stack length !=0 at end of rendering..."), this._stackBlend.length > 0 && console.warn("blend stack length !=0 at end of rendering..."), this._stackBlendMode.length > 0 && console.warn("blendMode stack length !=0 at end of rendering..."), this._shaderStack.length > 0 && console.warn("this._shaderStack length !=0 at end of rendering..."), s != e.canvasWidth || o != e.canvasHeight) {
                s = e.canvasWidth, o = e.canvasHeight, this.setSize(e.canvasWidth / this.pixelDensity, e.canvasHeight / this.pixelDensity), this.updateSize();
                for (var t = 0; t < r.length; t++) r[t]()
            }
        }, this.getShader = function () {
            if (i && (!this.frameStore || !0 === this.frameStore.renderOffscreen == i.offScreenPass == 1)) return i;
            for (var t = this._shaderStack.length - 1; t >= 0; t--)
                if (this._shaderStack[t] && this.frameStore.renderOffscreen == this._shaderStack[t].offScreenPass) return this._shaderStack[t]
        }, this.getDefaultShader = function () {
            return a
        }, this.setShader = function (t) {
            this._shaderStack.push(t), i = t
        }, this.setPreviousShader = function () {
            if (0 === this._shaderStack.length) throw "Invalid shader stack pop!";
            this._shaderStack.pop(), i = this._shaderStack[this._shaderStack.length - 1]
        }, this.pushGlFrameBuffer = function (t) {
            this._glFrameBufferStack.push(t)
        }, this.popGlFrameBuffer = function () {
            return 0 == this._glFrameBufferStack.length ? null : (this._glFrameBufferStack.pop(), this._glFrameBufferStack[this._glFrameBufferStack.length - 1])
        }, this.getCurrentGlFrameBuffer = function () {
            return 0 === this._glFrameBufferStack.length ? null : this._glFrameBufferStack[this._glFrameBufferStack.length - 1]
        }, this.pushFrameBuffer = function (t) {
            this._frameBufferStack.push(t)
        }, this.popFrameBuffer = function () {
            return 0 == this._frameBufferStack.length ? null : (this._frameBufferStack.pop(), this._frameBufferStack[this._frameBufferStack.length - 1])
        }, this.getCurrentFrameBuffer = function () {
            return 0 === this._frameBufferStack.length ? null : this._frameBufferStack[this._frameBufferStack.length - 1]
        };
        var l = vec3.create();
        vec3.set(l, 0, 0, 2);
        var u = vec3.create();
        vec3.set(u, 0, 0, 0), this.renderStart = function (t, e, n) {
            e || (e = u), n || (n = l), this.pushDepthTest(!0), this.pushDepthWrite(!0), this.pushDepthFunc(t.gl.LEQUAL), this.clearCanvasTransparent && (t.gl.clearColor(0, 0, 0, 0), t.gl.clear(t.gl.COLOR_BUFFER_BIT)), this.clearCanvasDepth && t.gl.clear(t.gl.DEPTH_BUFFER_BIT), t.setViewPort(0, 0, t.canvasWidth, t.canvasHeight), mat4.perspective(t.pMatrix, 45, t.canvasWidth / t.canvasHeight, .1, 1e3), mat4.identity(t.mMatrix), mat4.identity(t.vMatrix), mat4.translate(t.mMatrix, t.mMatrix, e), mat4.translate(t.vMatrix, t.vMatrix, n), t.pushPMatrix(), t.pushModelMatrix(), t.pushViewMatrix(), t.pushBlendMode($.BLEND_MODES.BLEND_NORMAL, !1);
            for (var a = 0; a < this._textureslots.length; a++) this._textureslots[a] = null;
            t.beginFrame()
        }, this.renderEnd = function (t, e) {
            t.popViewMatrix(), t.popModelMatrix(), t.popPMatrix(), this.popDepthTest(), this.popDepthWrite(), this.popDepthFunc(), this.popBlend(), this.popBlendMode(), t.endFrame()
        }, this.getTexture = function (t) {
            return this._textureslots[t]
        }, this.setTexture = function (t, e, n) {
            this._textureslots[t] != e && (this.gl.activeTexture(this.gl.TEXTURE0 + t), this.gl.bindTexture(n || this.gl.TEXTURE_2D, e), this._textureslots[t] = e)
        }, this.fullScreen = function () {
            this.canvas.requestFullscreen ? this.canvas.requestFullscreen() : this.canvas.mozRequestFullScreen ? this.canvas.mozRequestFullScreen() : this.canvas.webkitRequestFullscreen ? this.canvas.webkitRequestFullscreen() : this.canvas.msRequestFullscreen && this.canvas.msRequestFullscreen()
        }, this.setSize = function (t, e) {
            this.canvas.style.width = t + "px", this.canvas.style.height = e + "px", this.canvas.width = t * this.pixelDensity, this.canvas.height = e * this.pixelDensity, this.updateSize()
        }, this._resizeToWindowSize = function () {
            this.setSize(window.innerWidth, window.innerHeight), this.updateSize()
        }, this._resizeToParentSize = function () {
            console.log("_resizeToParentSize");
            var t = this.canvas.parentElement;
            t ? (this.setSize(t.clientWidth, t.clientHeight), console.log("_resizeToParentSize", t.clientWidth, t.clientHeight), this.updateSize()) : console.error("cables: can not resize to container element")
        }, this.setAutoResize = function (t) {
            window.removeEventListener("resize", this._resizeToWindowSize.bind(this)), window.removeEventListener("resize", this._resizeToParentSize.bind(this)), "window" == t && (window.addEventListener("resize", this._resizeToWindowSize.bind(this)), window.addEventListener("orientationchange", this._resizeToWindowSize.bind(this)), this._resizeToWindowSize()), "parent" == t && (window.addEventListener("resize", this._resizeToParentSize.bind(this)), this._resizeToParentSize())
        }, this.printError = function (t) {
            var e = this.gl.getError();
            if (e != this.gl.NO_ERROR) {
                var n = "";
                e == this.gl.OUT_OF_MEMORY && (n = "OUT_OF_MEMORY"), e == this.gl.INVALID_ENUM && (n = "INVALID_ENUM"), e == this.gl.INVALID_OPERATION && (n = "INVALID_OPERATION"), e == this.gl.INVALID_FRAMEBUFFER_OPERATION && (n = "INVALID_FRAMEBUFFER_OPERATION"), e == this.gl.INVALID_VALUE && (n = "INVALID_VALUE"), e == this.gl.CONTEXT_LOST_WEBGL && (n = "CONTEXT_LOST_WEBGL"), e == this.gl.NO_ERROR && (n = "NO_ERROR"), console.log("gl error: ", t, e, n)
            }
        }, this.saveScreenshot = function (t, e, n, a) {
            this.patch.renderOneFrame();
            var i = this.canvas.clientWidth,
                r = this.canvas.clientHeight;

            function s(t, e, n) {
                return Array(e - String(t).length + 1).join(n || "0") + t
            }
            n && (this.canvas.width = n, i = n), a && (this.canvas.height = a, r = a);
            var o = new Date,
                l = "".concat(String(o.getFullYear()) + String(o.getMonth() + 1) + String(o.getDate()), "_").concat(s(o.getHours(), 2)).concat(s(o.getMinutes(), 2)).concat(s(o.getSeconds(), 2));
            t ? t += ".png" : t = "cables_" + l + ".png", this.patch.cgl.screenShot(n => {
                if (this.canvas.width = i, this.canvas.height = r, n) {
                    var a = document.createElement("a");
                    a.download = t, a.href = URL.createObjectURL(n), document.body.appendChild(a), a.click(), e && e(n), a.remove()
                } else console.log("screenshot: no blob")
            }, !0)
        }
    };
    gt.prototype.pushViewMatrix = function () {
        this.vMatrix = this._vMatrixStack.push(this.vMatrix)
    }, gt.prototype.popViewMatrix = function () {
        this.vMatrix = this._vMatrixStack.pop()
    }, gt.prototype.getViewMatrixStateCount = function () {
        return this._vMatrixStack.stateCounter
    }, gt.prototype.pushPMatrix = function () {
        this.pMatrix = this._pMatrixStack.push(this.pMatrix)
    }, gt.prototype.popPMatrix = function () {
        return this.pMatrix = this._pMatrixStack.pop(), this.pMatrix
    }, gt.prototype.getProjectionMatrixStateCount = function () {
        return this._pMatrixStack.stateCounter
    }, gt.prototype.pushMvMatrix = gt.prototype.pushModelMatrix = function () {
        this.mMatrix = this._mMatrixStack.push(this.mMatrix)
    }, gt.prototype.popMvMatrix = gt.prototype.popmMatrix = gt.prototype.popModelMatrix = function () {
        return this.mMatrix = this._mMatrixStack.pop(), this.mMatrix
    }, gt.prototype.modelMatrix = function () {
        return this.mMatrix
    }, gt.prototype._stackDepthTest = [], gt.prototype.pushDepthTest = function (t) {
        this._stackDepthTest.push(t), t ? this.gl.enable(this.gl.DEPTH_TEST) : this.gl.disable(this.gl.DEPTH_TEST)
    }, gt.prototype.stateDepthTest = function () {
        return this._stackDepthTest[this._stackDepthTest.length - 1]
    }, gt.prototype.popDepthTest = function () {
        this._stackDepthTest.pop(), this._stackDepthTest[this._stackDepthTest.length - 1] ? this.gl.enable(this.gl.DEPTH_TEST) : this.gl.disable(this.gl.DEPTH_TEST)
    }, gt.prototype._stackDepthWrite = [], gt.prototype.pushDepthWrite = function (t) {
        this._stackDepthWrite.push(t), this.gl.depthMask(t)
    }, gt.prototype.stateDepthWrite = function () {
        return this._stackDepthWrite[this._stackDepthWrite.length - 1]
    }, gt.prototype.popDepthWrite = function () {
        this._stackDepthWrite.pop(), this.gl.depthMask(this._stackDepthWrite[this._stackDepthWrite.length - 1])
    }, gt.prototype._stackDepthFunc = [], gt.prototype.pushDepthFunc = function (t) {
        this._stackDepthFunc.push(t), this.gl.depthFunc(t)
    }, gt.prototype.stateDepthFunc = function () {
        return this._stackDepthFunc.length > 0 && this._stackDepthFunc[this._stackDepthFunc.length - 1]
    }, gt.prototype.popDepthFunc = function () {
        this._stackDepthFunc.pop(), this._stackDepthFunc.length > 0 && this.gl.depthFunc(this._stackDepthFunc[this._stackDepthFunc.length - 1])
    }, gt.prototype._stackBlend = [], gt.prototype.pushBlend = function (t) {
        this._stackBlend.push(t), t ? this.gl.enable(this.gl.BLEND) : this.gl.disable(this.gl.BLEND)
    }, gt.prototype.popBlend = function () {
        this._stackBlend.pop(), this._stackBlend[this._stackBlend.length - 1] ? this.gl.enable(this.gl.BLEND) : this.gl.disable(this.gl.BLEND)
    }, gt.prototype.stateBlend = function () {
        return this._stackBlend[this._stackBlend.length - 1]
    }, gt.prototype._stackBlendMode = [], gt.prototype._stackBlendModePremul = [], gt.prototype.pushBlendMode = function (t, e) {
        this._stackBlendMode.push(t), this._stackBlendModePremul.push(e);
        const n = this._stackBlendMode.length - 1;
        this.pushBlend(this._stackBlendMode[n] !== $.BLEND_MODES.BLEND_NONE), this._setBlendMode(this._stackBlendMode[n], this._stackBlendModePremul[n])
    }, gt.prototype.popBlendMode = function () {
        this._stackBlendMode.pop(), this._stackBlendModePremul.pop();
        const t = this._stackBlendMode.length - 1;
        this.popBlend(this._stackBlendMode[t] !== $.BLEND_MODES.BLEND_NONE), t > 0 && this._setBlendMode(this._stackBlendMode[t], this._stackBlendModePremul[t])
    }, gt.prototype.glGetAttribLocation = function (t, e) {
        return this.gl.getAttribLocation(t, e)
    }, gt.prototype._setBlendMode = function (t, e) {
        const n = this.gl;
        t == $.BLEND_MODES.BLEND_NONE || (t == $.BLEND_MODES.BLEND_ADD ? e ? (n.blendEquationSeparate(n.FUNC_ADD, n.FUNC_ADD), n.blendFuncSeparate(n.ONE, n.ONE, n.ONE, n.ONE)) : (n.blendEquation(n.FUNC_ADD), n.blendFunc(n.SRC_ALPHA, n.ONE)) : t == $.BLEND_MODES.BLEND_SUB ? e ? (n.blendEquationSeparate(n.FUNC_ADD, n.FUNC_ADD), n.blendFuncSeparate(n.ZERO, n.ZERO, n.ONE_MINUS_SRC_COLOR, n.ONE_MINUS_SRC_ALPHA)) : (n.blendEquation(n.FUNC_ADD), n.blendFunc(n.ZERO, n.ONE_MINUS_SRC_COLOR)) : t == $.BLEND_MODES.BLEND_MUL ? e ? (n.blendEquationSeparate(n.FUNC_ADD, n.FUNC_ADD), n.blendFuncSeparate(n.ZERO, n.SRC_COLOR, n.ZERO, n.SRC_ALPHA)) : (n.blendEquation(n.FUNC_ADD), n.blendFunc(n.ZERO, n.SRC_COLOR)) : t == $.BLEND_MODES.BLEND_NORMAL ? e ? (n.blendEquationSeparate(n.FUNC_ADD, n.FUNC_ADD), n.blendFuncSeparate(n.ONE, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA)) : (n.blendEquationSeparate(n.FUNC_ADD, n.FUNC_ADD), n.blendFuncSeparate(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA)) : console.log("setblendmode: unknown blendmode"))
    };
    const mt = Object.assign({
        Framebuffer: function (t, e, n, a) {
            var i = t,
                r = i.gl.getExtension("WEBGL_depth_texture") || i.gl.getExtension("WEBKIT_WEBGL_depth_texture") || i.gl.getExtension("MOZ_WEBGL_depth_texture") || i.gl.DEPTH_TEXTURE;
            if (r) {
                var s = e || 512,
                    o = n || 512;
                (a = a || {
                    isFloatingPointTexture: !1
                }).hasOwnProperty("filter") || (a.filter = K.FILTER_LINEAR);
                var l = new K(i, {
                        isFloatingPointTexture: a.isFloatingPointTexture,
                        filter: a.filter,
                        wrap: K.CLAMP_TO_EDGE
                    }),
                    u = null;
                r && (u = new K(i, {
                    isDepthTexture: !0
                }));
                var h = i.gl.createFramebuffer(),
                    c = i.gl.createRenderbuffer();
                this.getWidth = function () {
                    return s
                }, this.getHeight = function () {
                    return o
                }, this.getGlFrameBuffer = function () {
                    return h
                }, this.getDepthRenderBuffer = function () {
                    return c
                }, this.getTextureColor = function () {
                    return l
                }, this.getTextureDepth = function () {
                    return u
                }, this.setFilter = function (t) {
                    l.filter = t, l.setSize(s, o)
                }, this.setSize = function (t, e) {
                    if (t < 2 && (t = 2), e < 2 && (e = 2), s = Math.ceil(t), o = Math.ceil(e), W.profileFrameBuffercreate++, i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, h), i.gl.bindRenderbuffer(i.gl.RENDERBUFFER, c), l.setSize(s, o), u && u.setSize(s, o), r && i.gl.renderbufferStorage(i.gl.RENDERBUFFER, i.gl.DEPTH_COMPONENT16, s, o), i.gl.framebufferTexture2D(i.gl.FRAMEBUFFER, i.gl.COLOR_ATTACHMENT0, i.gl.TEXTURE_2D, l.tex, 0), r && (i.gl.framebufferRenderbuffer(i.gl.FRAMEBUFFER, i.gl.DEPTH_ATTACHMENT, i.gl.RENDERBUFFER, c), i.gl.framebufferTexture2D(i.gl.FRAMEBUFFER, i.gl.DEPTH_ATTACHMENT, i.gl.TEXTURE_2D, u.tex, 0)), !i.gl.isFramebuffer(h)) throw "Invalid framebuffer";
                    var n = i.gl.checkFramebufferStatus(i.gl.FRAMEBUFFER);
                    switch (n) {
                        case i.gl.FRAMEBUFFER_COMPLETE:
                            break;
                        case i.gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                            throw console.log("FRAMEBUFFER_INCOMPLETE_ATTACHMENT...", s, o, l.tex, c), new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
                        case i.gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                            throw console.log("FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT"), new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
                        case i.gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                            throw console.log("FRAMEBUFFER_INCOMPLETE_DIMENSIONS"), new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
                        case i.gl.FRAMEBUFFER_UNSUPPORTED:
                            throw console.log("FRAMEBUFFER_UNSUPPORTED"), new Error("Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED");
                        default:
                            throw console.log("incomplete framebuffer", n), new Error("Incomplete framebuffer: " + n)
                    }
                    i.gl.bindTexture(i.gl.TEXTURE_2D, null), i.gl.bindRenderbuffer(i.gl.RENDERBUFFER, null), i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, null)
                }, this.renderStart = function () {
                    i.pushModelMatrix(), i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, h), i.pushGlFrameBuffer(h), i.pushFrameBuffer(this), i.pushPMatrix(), i.gl.viewport(0, 0, s, o), i.gl.clearColor(0, 0, 0, 0), i.gl.clear(i.gl.COLOR_BUFFER_BIT | i.gl.DEPTH_BUFFER_BIT)
                }, this.renderEnd = function () {
                    i.popPMatrix(), i.gl.bindFramebuffer(i.gl.FRAMEBUFFER, i.popGlFrameBuffer()), i.popFrameBuffer(), i.popModelMatrix(), i.resetViewPort()
                }, this.delete = function () {
                    l.delete(), u && u.delete(), i.gl.deleteRenderbuffer(c), i.gl.deleteFramebuffer(h)
                }, this.setSize(s, o)
            } else i.exitError("NO_DEPTH_TEXTURE", "no depth texture support")
        },
        Framebuffer2: Q,
        Geometry: Z,
        Marker: function (t) {
            var e = new Z("marker");
            e.setPointVertices([1e-5, 0, 0, 1, 0, 0, 0, 1e-5, 0, 0, 1, 0, 0, 0, 1e-5, 0, 0, 1]);
            var n = new et(t, e, t.gl.LINES);
            n.setGeom(e);
            var a = new lt(t, "markermaterial"),
                i = "".endl() + "precision highp float;".endl() + "IN vec3 axisColor;".endl() + "void main()".endl() + "{".endl() + "    vec4 col=vec4(axisColor,1.0);".endl() + "    outColor = col;".endl() + "}",
                r = "".endl() + "IN vec3 vPosition;".endl() + "UNI mat4 projMatrix;".endl() + "UNI mat4 mvMatrix;".endl() + "OUT vec3 axisColor;".endl() + "void main()".endl() + "{".endl() + "   vec4 pos=vec4(vPosition, 1.0);".endl() + "   if(pos.x!=0.0)axisColor=vec3(1.0,0.3,0.0);".endl() + "   if(pos.y!=0.0)axisColor=vec3(0.0,1.0,0.2);".endl() + "   if(pos.z!=0.0)axisColor=vec3(0.0,0.5,1.0);".endl() + "   gl_Position = projMatrix * mvMatrix * pos;".endl() + "}";
            a.setSource(r, i), this._vScale = vec3.create(), this.draw = function (t) {
                t.pushModelMatrix(), t.setShader(a), vec3.set(this._vScale, 2, 2, 2), mat4.scale(t.mvMatrix, t.mvMatrix, this._vScale), t.pushDepthTest(!1), n.render(t.getShader()), t.popDepthTest(), t.setPreviousShader(), t.popModelMatrix()
            }
        },
        WirePoint: function (t, e) {
            var n = t.gl.createBuffer(),
                a = vec3.create();
            this.render = function (t, e) {
                    t.pushModelMatrix(), vec3.set(a, e, e, e), mat4.scale(t.mvMatrix, t.mvMatrix, a);
                    var i = t.getShader();
                    i.bind(), t.gl.bindBuffer(t.gl.ARRAY_BUFFER, n), t.gl.vertexAttribPointer(i.getAttrVertexPos(), n.itemSize, t.gl.FLOAT, !1, 0, 0), t.gl.enableVertexAttribArray(i.getAttrVertexPos()), t.gl.bindBuffer(t.gl.ARRAY_BUFFER, n), t.gl.drawArrays(t.gl.LINE_STRIP, 0, n.numItems), t.popModelMatrix()
                },
                function () {
                    var e = [],
                        a = 0,
                        i = 0;
                    for (a = 0; a <= Math.round(24); a++) i = 360 / Math.round(24) * a * ut, e.push(.5 * Math.cos(i)), e.push(0), e.push(.5 * Math.sin(i));
                    for (a = 0; a <= Math.round(24); a++) i = 360 / Math.round(24) * a * ut, e.push(.5 * Math.cos(i)), e.push(.5 * Math.sin(i)), e.push(0);
                    for (a = 0; a <= Math.round(24); a++) i = 360 / Math.round(24) * a * ut, e.push(0), e.push(.5 * Math.cos(i)), e.push(.5 * Math.sin(i));
                    t.gl.bindBuffer(t.gl.ARRAY_BUFFER, n), t.gl.bufferData(t.gl.ARRAY_BUFFER, new Float32Array(e), t.gl.STATIC_DRAW), n.itemSize = 3, n.numItems = e.length / n.itemSize
                }()
        },
        WireCube: function (t) {
            var e, n = t.gl.createBuffer(),
                a = vec3.create();
            this.render = function (t, e, i, r) {
                t.pushModelMatrix(), vec3.set(a, e || 1, i || 1, r || 1), mat4.scale(t.mvMatrix, t.mvMatrix, a);
                var s = t.getShader();
                s.bind(), t.gl.bindBuffer(t.gl.ARRAY_BUFFER, n), t.gl.vertexAttribPointer(s.getAttrVertexPos(), n.itemSize, t.gl.FLOAT, !1, 0, 0), t.gl.enableVertexAttribArray(s.getAttrVertexPos()), t.gl.bindBuffer(t.gl.ARRAY_BUFFER, n), t.gl.drawArrays(t.gl.LINE_STRIP, 0, n.numItems), t.popModelMatrix()
            }, (e = []).push(-1, -1, 1), e.push(1, -1, 1), e.push(1, 1, 1), e.push(-1, 1, 1), e.push(-1, -1, 1), e.push(-1, -1, -1), e.push(1, -1, -1), e.push(1, 1, -1), e.push(-1, 1, -1), e.push(-1, -1, -1), e.push(-1, -1, -1), e.push(-1, 1, -1), e.push(-1, 1, 1), e.push(-1, -1, 1), e.push(-1, -1, -1), e.push(1, -1, -1), e.push(1, 1, -1), e.push(1, 1, 1), e.push(1, -1, 1), e.push(1, -1, -1), t.gl.bindBuffer(t.gl.ARRAY_BUFFER, n), t.gl.bufferData(t.gl.ARRAY_BUFFER, new Float32Array(e), t.gl.STATIC_DRAW), n.itemSize = 3, n.numItems = e.length / n.itemSize
        },
        MatrixStack: pt,
        Mesh: et,
        MESH: tt,
        ShaderLibMods: it,
        Shader: lt,
        Uniform: J,
        MESHES: nt,
        Context: gt,
        Texture: K,
        TextureEffect: at,
        isWindows: ht,
        getWheelSpeed: dt,
        getWheelDelta: ft,
        onLoadingAssetsFinished: null,
        profileData: W
    }, $.BLEND_MODES, $.SHADER, $.MATH, $.BLEND_MODES);
    window.CGL = mt;
    const bt = function (t) {
        this._loadingAssets = {}, this._cbFinished = [], this._percent = 0, this._count = 0, this._countFinished = 0, this._order = 0, this._startTime = 0, this._patch = t
    };
    bt.prototype.setOnFinishedLoading = function (t) {
        this._cbFinished.push(t)
    }, bt.prototype.getNumAssets = function () {
        return this._countFinished
    }, bt.prototype.getProgress = function () {
        return this._percent
    }, bt.prototype.checkStatus = function () {
        for (var t in this._countFinished = 0, this._count = 0, this._loadingAssets) this._count++, this._loadingAssets[t].finished || this._countFinished++;
        if (this._percent = (this._count - this._countFinished) / this._count, 0 === this._countFinished) {
            for (var e = 0; e < this._cbFinished.length; e++) setTimeout(this._cbFinished[e], 200);
            this.print()
        }
    }, bt.prototype.print = function () {
        if (!this._patch.silent) {
            var t = [];
            for (var e in this._loadingAssets) t.push([this._loadingAssets[e].order, this._loadingAssets[e].type, this._loadingAssets[e].name, (this._loadingAssets[e].timeEnd - this._loadingAssets[e].timeStart) / 1e3 + "s"]);
            console.groupCollapsed("finished loading " + this._order + " assets in " + (Date.now() - this._startTime) / 1e3 + "s"), console.table(t), console.groupEnd()
        }
    }, bt.prototype.finished = function (t) {
        this._loadingAssets[t] && (this._loadingAssets[t].finished = !0, this._loadingAssets[t].timeEnd = Date.now()), this.checkStatus()
    }, bt.prototype.start = function (t, e) {
        0 == this._startTime && (this._startTime = Date.now());
        var n = v();
        return this._loadingAssets[n] = {
            id: n,
            type: t,
            name: e,
            finished: !1,
            timeStart: Date.now(),
            order: this._order
        }, this._order++, n
    };
    const _t = function () {
        this._loops = [], this._indizes = [], this._index = 0
    };
    _t.prototype.pushLoop = function (t) {
        this._loops.push(Math.abs(Math.floor(t))), this._indizes.push(this._index)
    }, _t.prototype.popLoop = function () {
        this._loops.pop(), this._index = this._indizes.pop(), 0 === this._loops.length && (this._index = 0)
    }, _t.prototype.numLoops = function () {
        return this._loops.length
    }, _t.prototype.numCycles = function () {
        if (0 === this._loops.length) return 0;
        for (var t = this._loops[0], e = 1; e < this._loops.length; e++) t *= this._loops[e];
        return t
    }, _t.prototype.inLoop = function () {
        return this._loops.length > 0
    }, _t.prototype.increment = function () {
        this._index++
    }, _t.prototype.index = function () {
        return this._index
    };
    const vt = function () {
            var t = {},
                e = null,
                n = 0;
            this.getItems = function () {
                return t
            }, this.clear = function () {
                t = {}
            }, this.add = function (a, i) {
                null !== e && (i && i.id == e || t[e] && (t[e].timeUsed += performance.now() - n, (!t[e].peakTime || st() - t[e].peakTime > 5e3) && (t[e].peak > 1 && i && console.log("PEAK ", i.parent.objName), t[e].peak = 0, t[e].peakTime = st()), t[e].peak = Math.max(t[e].peak, performance.now() - n))), null !== i ? (t[i.id] || (t[i.id] = {
                    numTriggers: 0,
                    timeUsed: 0
                }), t[i.id].numTriggers++, t[i.id].title = i.parent.name + i.name, e = i.id, n = performance.now()) : e = null
            }, this.print = function () {
                for (var e in console.log("--------"), t) console.log(t[e].title + ": " + t[e].numTriggers + " / " + t[e].timeUsed)
            }
        },
        Ot = function (t) {
            this._patch = t, this.result = []
        };
    Ot.MIDI = 0, Ot.POINTERLOCK = 1, Ot.WEBAUDIO = 2, Ot.WEBGL2 = 3, (Ot.infos = [])[Ot.POINTERLOCK] = {
        title: "pointerLock",
        caniuse: "https://caniuse.com/#search=pointerlock"
    }, Ot.infos[Ot.MIDI] = {
        title: "midi API",
        caniuse: "https://caniuse.com/#search=midi"
    }, Ot.infos[Ot.WEBAUDIO] = {
        title: "web audio",
        caniuse: "https://caniuse.com/#search=webaudio"
    }, Ot.infos[Ot.WEBGL2] = {
        title: "WebGL 2"
    }, Ot.prototype.checkRequirement = function (t, e) {
        switch (this.result = [], t) {
            case Ot.WEBGL2:
                return e.patch.cgl.glVersion >= 2;
            case Ot.POINTERLOCK:
                return "exitPointerLock" in document;
            case Ot.MIDI:
                return "MIDIAccess" in window;
            case Ot.WEBAUDIO:
                var n = !1;
                return window.audioContext && (n = !0), !n && ("webkitAudioContext" in window || "AudioContext" in window) && (n = !0), n
        }
    }, Ot.prototype.checkOp = function (t) {
        if (t && t.requirements)
            for (var e = 0; e < t.requirements.length; e++) {
                var n = t.requirements[e];
                if (!this.result[n]) {
                    var a = this.checkRequirement(n, t);
                    if (!a) throw t.patch.cgl && t.patch.cgl.canvas && t.patch.cgl.canvas.remove(), Ot.infos[n].title, Ot.infos[n].caniuse && (Ot.infos[n].caniuse, Ot.infos[n].title, t.objName), "this browser does not meet requirement: " + Ot.infos[n].title + " (" + t.objName + ")";
                    this.result[n] = {
                        success: a,
                        info: Ot.infos[n]
                    }
                }
            }
    };
    const It = function (t) {
        p.apply(this), this.ops = [], this.settings = {}, this.timer = new ot, this.freeTimer = new ot, this.animFrameOps = [], this.animFrameCallbacks = [], this.gui = !1, this.silent = !1, this.profiler = null, this.onLoadStart = null, this.onLoadEnd = null, this.aborted = !1, this.loading = new bt(this), this._crashedOps = [], this._perf = {
            fps: 0,
            ms: 0,
            _fpsFrameCount: 0,
            _fpsMsCount: 0,
            _fpsStart: 0
        }, this._volumeListeners = [], this._paused = !1, this._frameNum = 0, this.instancing = new _t, this.onOneFrameRendered = null, this.namedTriggers = {}, this._origData = null, this._frameNext = 0, this._frameInterval = 0, this._lastFrameTime = 0, this._frameWasdelayed = !0, this.config = t || {
            glCanvasResizeToWindow: !1,
            prefixAssetPath: "",
            silent: !1,
            onError: null,
            onFinishedLoading: null,
            onFirstFrameRendered: null,
            onPatchLoaded: null,
            fpsLimit: 0
        }, this.config.hasOwnProperty("doRequestAnimation") || (this.config.doRequestAnimation = !0), this.config.prefixAssetPath || (this.config.prefixAssetPath = ""), this.config.masterVolume || (this.config.masterVolume = 1), this._variables = {}, t && t.variables && (this._variables = t.variables || {}), this._variableListeners = [], this.vars = {}, t && t.vars && (this.vars = t.vars), this.cgl = new gt(this), this.cgl.setCanvas(this.config.glCanvasId || this.config.glCanvas || "glcanvas"), !0 === this.config.glCanvasResizeToWindow && this.cgl.setAutoResize("window"), !0 === this.config.glCanvasResizeToParent && this.cgl.setAutoResize("parent"), this.loading.setOnFinishedLoading(this.config.onFinishedLoading), this.cgl.aborted && (this.aborted = !0), this.cgl.silent && (this.silent = !0), this.freeTimer.play(), this.exec(), this.aborted || (this.config.patch ? (this.deSerialize(this.config.patch), this.timer.play()) : this.config.patchFile && (P(this.config.patchFile, (t, e) => {
            var n = JSON.parse(e);
            if (t) return console.error("err", t), console.error("data", n), void console.error("data", n.msg);
            this.deSerialize(n)
        }), this.timer.play())), console.log("Play around - it's pretty intuitive controls")
    };
    It.prototype.isPlaying = function () {
        return !this._paused
    }, It.prototype.renderOneFrame = function () {
        this._paused = !0, this._renderOneFrame = !0, this.exec(), this._renderOneFrame = !1
    }, It.prototype.getFPS = function () {
        return this._fps
    }, It.prototype.isEditorMode = function () {
        return !0 === this.config.editorMode
    }, It.prototype.pause = function () {
        this._paused = !0, this.freeTimer.pause()
    }, It.prototype.resume = function () {
        this._paused && (this._paused = !1, this.freeTimer.play(), this.exec())
    }, It.prototype.setVolume = function (t) {
        this.config.masterVolume = t;
        for (var e = 0; e < this._volumeListeners.length; e++) this._volumeListeners[e].onMasterVolumeChanged(t)
    }, It.prototype.getFilePath = function (t) {
        return t ? 0 === t.indexOf("https:") || 0 === t.indexOf("http:") ? t : (t = t.replace("//", "/"), this.config.prefixAssetPath + t + (this.config.suffixAssetPath || "")) : t
    }, It.prototype.clear = function () {
        for (this.cgl.TextureEffectMesh = null, this.animFrameOps.length = 0, this.timer = new ot; this.ops.length > 0;) this.deleteOp(this.ops[0].id)
    }, It.getOpClass = function (t) {
        var e = t.split("."),
            n = null;
        try {
            return 2 == e.length ? n = window[e[0]][e[1]] : 3 == e.length ? n = window[e[0]][e[1]][e[2]] : 4 == e.length ? n = window[e[0]][e[1]][e[2]][e[3]] : 5 == e.length ? n = window[e[0]][e[1]][e[2]][e[3]][e[4]] : 6 == e.length ? n = window[e[0]][e[1]][e[2]][e[3]][e[4]][e[5]] : 7 == e.length ? n = window[e[0]][e[1]][e[2]][e[3]][e[4]][e[5]][e[6]] : 8 == e.length ? n = window[e[0]][e[1]][e[2]][e[3]][e[4]][e[5]][e[6]][e[7]] : 9 == e.length ? n = window[e[0]][e[1]][e[2]][e[3]][e[4]][e[5]][e[6]][e[7]][e[8]] : 10 == e.length && (n = window[e[0]][e[1]][e[2]][e[3]][e[4]][e[5]][e[6]][e[7]][e[8]][e[9]]), n
        } catch (t) {
            return null
        }
    }, It.prototype.createOp = function (t, e) {
        var n = t.split("."),
            a = null,
            i = "";
        try {
            if (-1 == t.indexOf("Ops.")) {
                var r = t;
                if (!CABLES.OPS[r]) throw "could not find op by id: " + r;
                i = CABLES.OPS[r].objName, (a = new CABLES.OPS[r].f(this, i, e, r)).opId = r
            }
            if (!a) {
                if (!It.getOpClass(i = t)) throw this.emitEvent("criticalError", "unknown op", "unknown op: " + i), console.error("unknown op: " + i), new Error("unknown op: " + i);
                if (2 == n.length ? a = new window[n[0]][n[1]](this, i, e) : 3 == n.length ? a = new window[n[0]][n[1]][n[2]](this, i, e) : 4 == n.length ? a = new window[n[0]][n[1]][n[2]][n[3]](this, i, e) : 5 == n.length ? a = new window[n[0]][n[1]][n[2]][n[3]][n[4]](this, i, e) : 6 == n.length ? a = new window[n[0]][n[1]][n[2]][n[3]][n[4]][n[5]](this, i, e) : 7 == n.length ? a = new window[n[0]][n[1]][n[2]][n[3]][n[4]][n[5]][n[6]](this, i, e) : 8 == n.length ? a = new window[n[0]][n[1]][n[2]][n[3]][n[4]][n[5]][n[6]][n[7]](this, i, e) : 9 == n.length ? a = new window[n[0]][n[1]][n[2]][n[3]][n[4]][n[5]][n[6]][n[7]][n[8]](this, i, e) : 10 == n.length ? a = new window[n[0]][n[1]][n[2]][n[3]][n[4]][n[5]][n[6]][n[7]][n[8]][n[9]](this, i, e) : console.log("parts.length", n.length), a)
                    for (var s in a.opId = null, CABLES.OPS) CABLES.OPS[s].objName == i && (a.opId = s)
            }
        } catch (t) {
            if (this._crashedOps.push(i), this.emitEvent("exceptionOp", t, i), !this.isEditorMode) throw console.log(t), console.error("[instancing error] " + i, t), CABLES.api && CABLES.api.sendErrorReport(t), this.exitError("INSTANCE_ERR", "Instancing Error " + i), "instancing error " + i
        }
        return a && (a.objName = i, a.patch = this), a
    }, It.prototype.addOp = function (t, e, n) {
        var a = this.createOp(t, n);
        return a && (a.uiAttr(e), a.onCreate && a.onCreate(), a.hasOwnProperty("onAnimFrame") && this.animFrameOps.push(a), a.hasOwnProperty("onMasterVolumeChanged") && this._volumeListeners.push(a), this.ops.push(a), this.emitEvent("onOpAdd", a), a.init && a.init()), a
    }, It.prototype.addOnAnimFrame = function (t) {
        this.animFrameOps.push(t)
    }, It.prototype.removeOnAnimFrame = function (t) {
        for (var e = 0; e < this.animFrameOps.length; e++)
            if (this.animFrameOps[e] == t) return void this.animFrameOps.splice(e, 1)
    }, It.prototype.addOnAnimFrameCallback = function (t) {
        this.animFrameCallbacks.push(t)
    }, It.prototype.removeOnAnimCallback = function (t) {
        for (var e = 0; e < this.animFrameCallbacks.length; e++)
            if (this.animFrameCallbacks[e] == t) return void this.animFrameCallbacks.splice(e, 1)
    }, It.prototype.deleteOp = function (t, e) {
        for (var n in this.ops)
            if (this.ops[n].id == t) {
                var a = null,
                    i = null;
                if (this.ops[n]) {
                    e && this.ops[n].portsIn.length > 0 && this.ops[n].portsIn[0].isLinked() && this.ops[n].portsOut.length > 0 && this.ops[n].portsOut[0].isLinked() && this.ops[n].portsIn[0].getType() == this.ops[n].portsOut[0].getType() && (a = this.ops[n].portsIn[0].links[0].getOtherPort(this.ops[n].portsIn[0]), i = this.ops[n].portsOut[0].links[0].getOtherPort(this.ops[n].portsOut[0]));
                    var r = this.ops[n];
                    r.removeLinks(), this.onDelete && (console.log("deprecated this.onDelete", this.onDelete), this.onDelete(r)), this.emitEvent("onOpDelete", r), this.ops.splice(n, 1), r.onDelete && r.onDelete(), r.cleanUp(), null !== a && null !== i && this.link(a.parent, a.getName(), i.parent, i.getName())
                }
            }
    }, It.prototype.getFrameNum = function () {
        return this._frameNum
    }, It.prototype.renderFrame = function (t) {
        this.timer.update(), this.freeTimer.update();
        for (var e = this.timer.getTime(), n = 0; n < this.animFrameCallbacks.length; ++n) this.animFrameCallbacks[n] && this.animFrameCallbacks[n](e, this._frameNum);
        for (n = 0; n < this.animFrameOps.length; ++n) this.animFrameOps[n].onAnimFrame && this.animFrameOps[n].onAnimFrame(e);
        this._frameNum++, 1 == this._frameNum && this.config.onFirstFrameRendered && this.config.onFirstFrameRendered()
    }, It.prototype.exec = function (t) {
        if (this._renderOneFrame || !this._paused && !this.aborted) {
            this.config.fpsLimit = this.config.fpsLimit || 0, this.config.fpsLimit && (this._frameInterval = 1e3 / this.config.fpsLimit);
            var e = CABLES.now(),
                n = e - this._frameNext;
            if (this.isEditorMode() && !this._renderOneFrame && e - this._lastFrameTime >= 500 && 0 !== this._lastFrameTime && !this._frameWasdelayed) return this._lastFrameTime = 0, setTimeout(this.exec.bind(this), 500), this.emitEvent("renderDelayStart"), void(this._frameWasdelayed = !0);
            if (this._renderOneFrame || 0 === this.config.fpsLimit || n > this._frameInterval || this._frameWasdelayed) {
                var a = CABLES.now();
                this.renderFrame(), this._perf._fpsMsCount += CABLES.now() - a, this._frameInterval && (this._frameNext = e - n % this._frameInterval)
            }
            this._frameWasdelayed && (this.emitEvent("renderDelayEnd"), this._frameWasdelayed = !1), this._renderOneFrame && this.onOneFrameRendered && (this.onOneFrameRendered(), this._renderOneFrame = !1), CABLES.now() - this._perf._fpsStart >= 1e3 && this._perf.fps != this._perf._fpsFrameCount && (this._perf.fps = this._perf._fpsFrameCount, this._perf.ms = Math.round(this._perf._fpsMsCount / this._perf._fpsFrameCount), this.emitEvent("performance", this._perf), this._perf._fpsFrameCount = 0, this._perf._fpsMsCount = 0, this._perf._fpsStart = CABLES.now()), this._perf._lastFrameTime = CABLES.now(), this._perf._fpsFrameCount++, this.config.doRequestAnimation && requestAnimationFrame(this.exec.bind(this))
        }
    }, It.prototype.link = function (t, e, n, a) {
        if (t)
            if (n) {
                var i = t.getPort(e),
                    r = n.getPort(a);
                if (i)
                    if (r) {
                        if (!i.shouldLink(i, r) || !r.shouldLink(i, r)) return !1;
                        if (z.canLink(i, r)) {
                            var s = new z(this);
                            return s.link(i, r), this.emitEvent("onLink", i, r, s), s
                        }
                    } else console.warn("port not found! " + a + " of " + n.name + "(" + n.objName + ")");
                else console.warn("port not found! " + e + "(" + t.objName + ")")
            } else console.log("link: op2 is null");
        else console.log("link: op1 is null ")
    }, It.prototype.serialize = function (t) {
        var e = {
            ops: []
        };
        for (var n in e.settings = this.settings, this.ops) e.ops.push(this.ops[n].getSerialized());
        return t ? e : JSON.stringify(e)
    }, It.prototype.getOpById = function (t) {
        for (var e in this.ops)
            if (this.ops[e].id == t) return this.ops[e]
    }, It.prototype.getOpsByName = function (t) {
        var e = [];
        for (var n in this.ops) this.ops[n].name == t && e.push(this.ops[n]);
        return e
    }, It.prototype.getOpsByObjName = function (t) {
        var e = [];
        for (var n in this.ops) this.ops[n].objName == t && e.push(this.ops[n]);
        return e
    }, It.prototype.loadLib = function (t) {
        T("/ui/libs/" + t + ".js", (t, e) => {
            var n = document.createElement("script");
            n.type = "text/javascript", n.text = e, document.getElementsByTagName("head")[0].appendChild(n)
        }, "GET")
    }, It.prototype.reloadOp = function (t, e) {
        var n = 0,
            a = [],
            i = [];
        for (var r in this.ops) this.ops[r].objName == t && i.push(this.ops[r]);
        for (r = 0; r < i.length; r++) {
            n++;
            var s = i[r];
            s.deleted = !0;
            var o, l, u = this.addOp(t, s.uiAttribs);
            for (o in a.push(u), s.portsIn)
                if (0 === s.portsIn[o].links.length) {
                    var h = u.getPort(s.portsIn[o].name);
                    h ? h.set(s.portsIn[o].get()) : console.error("[reloadOp] could not set port " + s.portsIn[o].name + ", propably renamed port ?")
                } else
                    for (; s.portsIn[o].links.length;) {
                        var c = s.portsIn[o].links[0].portIn.name,
                            d = s.portsIn[o].links[0].portOut.name,
                            f = s.portsIn[o].links[0].portOut.parent;
                        s.portsIn[o].links[0].remove(), (l = this.link(u, c, f, d)) ? l.setValue() : console.log("[reloadOp] relink after op reload not successfull for port " + d)
                    }
            for (o in s.portsOut)
                for (; s.portsOut[o].links.length;) {
                    var p = s.portsOut[o].links[0].portOut.name,
                        g = s.portsOut[o].links[0].portIn.name,
                        m = s.portsOut[o].links[0].portIn.parent;
                    s.portsOut[o].links[0].remove(), (l = this.link(u, p, m, g)) ? l.setValue() : console.log("relink after op reload not successfull for port " + g)
                }
            this.deleteOp(s.id)
        }
        e(n, a)
    }, It.prototype.getSubPatchOps = function (t) {
        var e = [];
        for (var n in this.ops) this.ops[n].uiAttribs && this.ops[n].uiAttribs.subPatch == t && e.push(this.ops[n]);
        return e
    }, It.prototype.getSubPatchOp = function (t, e) {
        for (var n in this.ops)
            if (this.ops[n].uiAttribs && this.ops[n].uiAttribs.subPatch == t && this.ops[n].objName == e) return this.ops[n];
        return !1
    }, It.prototype.deSerialize = function (t, e) {
        if (!this.aborted) {
            var n = this.loading.start("core", "deserialize");
            this.onLoadStart && this.onLoadStart(), this.namespace = t.namespace || "", this.name = t.name || "", "string" == typeof t && (t = JSON.parse(t));
            var a = this;
            this.settings = t.settings;
            var i, r, s, o, l = new Ot(this);
            for (var u in t.ops) {
                var h = CABLES.now(),
                    c = t.ops[u],
                    d = null;
                try {
                    d = c.opId ? this.addOp(c.opId, c.uiAttribs, c.id) : this.addOp(c.objName, c.uiAttribs, c.id)
                } catch (t) {
                    throw console.warn("[instancing error] op data:", c), "instancing error: " + c.objName
                }
                if (l.checkOp(d), d) {
                    for (var f in e && (d.id = _()), d.portsInData = c.portsIn, d._origData = c, c.portsIn) {
                        var p = c.portsIn[f],
                            g = d.getPort(p.name);
                        if (!g || "bool" != g.uiAttribs.display && "bool" != g.uiAttribs.type || isNaN(p.value) || (p.value = !0 === p.value), g && void 0 !== p.value && g.type != F.OP.OP_PORT_TYPE_TEXTURE && g.set(p.value), g && p && p.animated && g.setAnimated(p.animated), g && p && p.anim)
                            for (var m in g.anim || (g.anim = new j), p.anim.loop && (g.anim.loop = p.anim.loop), p.anim.keys) g.anim.keys.push(new N.Key(p.anim.keys[m]))
                    }
                    for (var b in c.portsOut) {
                        var v = d.getPort(c.portsOut[b].name);
                        v && v.type != F.OP.OP_PORT_TYPE_TEXTURE && c.portsOut[b].hasOwnProperty("value") && v.set(t.ops[u].portsOut[b].value)
                    }
                }
                Math.round(100 * (CABLES.now() - h))
            }
            for (var O in this.ops) this.ops[O].onLoadedValueSet && (this.ops[O].onLoadedValueSet(this.ops[O]._origData), this.ops[O].onLoadedValueSet = null, this.ops[O]._origData = null);
            if (t.ops)
                for (u = 0; u < t.ops.length; u++)
                    if (t.ops[u].portsIn)
                        for (var I = 0; I < t.ops[u].portsIn.length; I++)
                            if (t.ops[u].portsIn[I].links)
                                for (var A = 0; A < t.ops[u].portsIn[I].links.length; A++) t.ops[u].portsIn[I].links[A] && (i = t.ops[u].portsIn[I].links[A].objIn, r = t.ops[u].portsIn[I].links[A].objOut, s = t.ops[u].portsIn[I].links[A].portIn, o = t.ops[u].portsIn[I].links[A].portOut, a.link(a.getOpById(i), s, a.getOpById(r), o));
            for (var O in this.ops) this.ops[O].onLoaded && (this.ops[O].onLoaded(), this.ops[O].onLoaded = null);
            for (var O in this.ops) this.ops[O].init && (this.ops[O].init(), this.ops[O].init = null);
            if (this.config.variables)
                for (var E in this.config.variables) this.setVarValue(E, this.config.variables[E]);
            setTimeout(() => {
                this.loading.finished(n)
            }, 100), this.config.onPatchLoaded && this.config.onPatchLoaded(), this.onLoadEnd && this.onLoadEnd()
        }
    }, It.prototype.profile = function (t) {
        for (var e in this.profiler = new vt, this.ops) this.ops[e].profile(t)
    }, (It.Variable = function (t, e) {
        this._name = t, this._changeListeners = [], this.setValue(e)
    }).prototype.getValue = function () {
        return this._v
    }, It.Variable.prototype.getName = function () {
        return this._name
    }, It.Variable.prototype.setValue = function (t) {
        this._v = t;
        for (var e = 0; e < this._changeListeners.length; e++) this._changeListeners[e](t)
    }, It.Variable.prototype.addListener = function (t) {
        this._changeListeners.push(t)
    }, It.Variable.prototype.removeListener = function (t) {
        var e = this._changeListeners.indexOf(t);
        this._changeListeners.splice(e, 1)
    }, It.prototype.setVariable = function (t, e) {
        this._variables.hasOwnProperty(t) ? this._variables[t].setValue(e) : console.warn("variable " + t + " not found!")
    }, It.prototype.setVarValue = function (t, e) {
        return this._variables.hasOwnProperty(t) ? this._variables[t].setValue(e) : (this._variables[t] = new It.Variable(t, e), this.emitEvent("variablesChanged")), this._variables[t]
    }, It.prototype.getVarValue = function (t, e) {
        if (this._variables.hasOwnProperty(t)) return this._variables[t].getValue()
    }, It.prototype.getVar = function (t) {
        if (this._variables.hasOwnProperty(t)) return this._variables[t]
    }, It.prototype.getVars = function () {
        return this._variables
    }, It.prototype.getVars = function () {
        return this._variables
    }, It.prototype.exitError = function (t, e) {
        this && this.config && this.config.onError && (this.config.onError(t, e), this.aborted = !0)
    }, It.prototype.preRenderOps = function () {
        console.log("prerendering...");
        var t = null;
        CABLES.StopWatch && (t = new CABLES.StopWatch("prerendering"));
        for (var e = 0; e < this.ops.length; e++) this.ops[e].preRender && (this.ops[e].preRender(), console.log("prerender " + this.ops[e].objName));
        t && t.stop("prerendering")
    }, It.prototype.dispose = function () {
        this.pause(), this.clear()
    };
    var At = It;
    const Et = {
            addPatch: function (t, e) {
                var n = t,
                    a = v();
                if ("string" != typeof t || (a = t, n = document.getElementById(a))) {
                    var i = document.createElement("canvas");
                    return i.id = "glcanvas_" + a, i.width = n.clientWidth, i.height = n.clientHeight, window.addEventListener("resize", function () {
                        this.setAttribute("width", n.clientWidth), this.height = n.clientHeight
                    }.bind(i)), n.appendChild(i), (e = e || {}).glCanvasId = i.id, e.onError || (e.onError = function (t) {
                        console.log(t)
                    }), CABLES.patch = new At(e), i
                }
                console.error(a + " Polyshape Container Element not found!")
            }
        },
        Mt = {
            LineDrawer: function (t, e) {
                this._num = 1e5, this._counter = 0, this._positions = new Float32Array(3 * this._num), this._colors = new Float32Array(4 * this._num)
            },
            RectInstancer: function (t, e) {
                this._counter = 0, this._num = 1e5, this._needsRebuild = !0, this._positions = new Float32Array(3 * this._num), this._colors = new Float32Array(4 * this._num), this._sizes = new Float32Array(2 * this._num), this._shader = new lt(t, "rectinstancer"), this._shader.setSource("".endl() + "IN vec3 vPosition;".endl() + "IN vec3 instPos;".endl() + "IN vec4 instCol;".endl() + "IN vec2 instSize;".endl() + "OUT vec4 col;".endl() + "UNI float zoom,resX,resY,scrollX,scrollY;".endl() + "void main()".endl() + "{".endl() + "    vec3 pos=vPosition;".endl() + "    pos.xy*=instSize;".endl() + "    pos.x+=scrollX;".endl() + "    pos.y+=scrollY;".endl() + "    pos.x+=instPos.x;".endl() + "    pos.y+=instPos.y;".endl() + "    pos.y=0.0-pos.y;".endl() + "    col=instCol;".endl() + "    gl_Position = vec4(pos*(1.0/zoom),1.0);".endl() + "}", "IN vec4 col;void main(){outColor=vec4(col.rgb,1.0);}"), this._uniZoom = new J(this._shader, "f", "zoom", 0), this._uniResX = new J(this._shader, "f", "resX", 500), this._uniResY = new J(this._shader, "f", "resY", 500), this._uniscrollX = new J(this._shader, "f", "scrollX", 0), this._uniscrollY = new J(this._shader, "f", "scrollY", 0), this._geom = new Z("rectinstancer"), this._geom.vertices = new Float32Array([1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0]), this._geom.verticesIndices = new Float32Array([2, 1, 0, 3, 1, 2]), this._mesh = new et(t, this._geom), this._mesh.numInstances = this._num;
                var n = 0;
                for (n = 0; n < 2 * this._num; n++) this._sizes[n] = 0;
                for (n = 0; n < 3 * this._num; n++) this._positions[n] = 0;
                for (n = 0; n < 4 * this._num; n++) this._colors[n] = 1
            }
        };
    Mt.RectInstancer.prototype.dispose = function () {}, Mt.RectInstancer.prototype.render = function (t, e, n, a, i) {
        this._uniResX.set(t), this._uniResY.set(e), this._uniscrollX.set(n), this._uniscrollY.set(a), this._uniZoom.set(i), this._needsRebuild && this.rebuild(), this._mesh.render(this._shader)
    }, Mt.RectInstancer.prototype.rebuild = function () {
        this._mesh.addAttribute("instPos", this._positions, 3, {
            instanced: !0
        }), this._mesh.addAttribute("instCol", this._colors, 4, {
            instanced: !0
        }), this._mesh.addAttribute("instSize", this._sizes, 2, {
            instanced: !0
        }), this._needsRebuild = !1
    }, Mt.RectInstancer.prototype.getIndex = function () {
        return this._counter++, this._counter
    }, Mt.RectInstancer.prototype.setPosition = function (t, e, n) {
        this._positions[3 * t + 0] = e, this._positions[3 * t + 1] = n, this._needsRebuild = !0
    }, Mt.RectInstancer.prototype.setSize = function (t, e, n) {
        this._sizes[2 * t + 0] = e, this._sizes[2 * t + 1] = n, this._needsRebuild = !0
    }, Mt.RectInstancer.prototype.setColor = function (t, e, n, a) {
        this._colors[4 * t + 0] = e, this._colors[4 * t + 1] = n, this._colors[4 * t + 2] = a, this._colors[4 * t + 3] = 1, this._needsRebuild = !0
    }, Mt.GlRect = function (t, e) {
        e = e || {}, this._rectInstancer = t, this._attrIndex = t.getIndex(), this._parent = e.parent || null, this.childs = []
    }, Mt.GlRect.prototype.addChild = function (t) {
        this.childs.push(t)
    }, Mt.GlRect.prototype.setSize = function (t, e) {
        this._rectInstancer.setSize(this._attrIndex, t, e)
    }, Mt.GlRect.prototype.setColor = function (t, e, n) {
        this._rectInstancer.setColor(this._attrIndex, t, e, n)
    }, Mt.GlRect.prototype.setPosition = function (t, e) {
        this.x = t, this.y = e;
        var n = this.x,
            a = this.y;
        this._parent && (n += this._parent.x, a += this._parent.y), this._rectInstancer.setPosition(this._attrIndex, n, a);
        for (var i = 0; i < this.childs.length; i++) this.childs[i].setPosition(this.childs[i].x, this.childs[i].y)
    }, Mt.OP_MIN_WIDTH = 100, Mt.GlOp = function (t, e) {
        this._op = e, this._instancer = t, this._glRectBg = new Mt.GlRect(t), this._glRectBg.setSize(100, 30), this._glRectBg.setColor(.1, .1, .1), this._portRects = [], this.updatePosition();
        for (var n = 0; n < this._op.portsIn.length; n++) this._setupPort(n, this._op.portsIn[n]);
        for (n = 0; n < this._op.portsOut.length; n++) this._setupPort(n, this._op.portsOut[n]);
        const a = 10 * Math.max(this._op.portsIn.length, this._op.portsOut.length);
        this._glRectBg.setSize(Math.max(Mt.OP_MIN_WIDTH, a), 30)
    }, Mt.GlOp.prototype.dispose = function () {
        this._glRectBg && (this._glRectBg.setSize(0, 0), this._glRectBg.setPosition(0, 0));
        for (var t = 0; t < this._portRects.length; t++) this._portRects[t].setSize(0, 0), this._portRects[t].setPosition(0, 0);
        this._op = null, this._portRects.length = 0, this._glRectBg = null, this._instancer = null
    }, Mt.GlOp.prototype._setupPort = function (t, e) {
        var n = new Mt.GlRect(this._instancer, {
            parent: this._glRectBg
        });
        n.setSize(7, 5), e.type == F.OP.OP_PORT_TYPE_VALUE ? n.setColor(0, 1, .7) : e.type == F.OP.OP_PORT_TYPE_FUNCTION ? n.setColor(1, 1, 0) : e.type == F.OP.OP_PORT_TYPE_OBJECT ? n.setColor(1, 0, 1) : e.type == F.OP.OP_PORT_TYPE_ARRAY ? n.setColor(0, .3, 1) : e.type == F.OP.OP_PORT_TYPE_STRING ? n.setColor(1, .3, 0) : e.type == F.OP.OP_PORT_TYPE_DYNAMIC && n.setColor(1, 1, 1);
        var a = 0;
        1 == e.direction && (a = 25), n.setPosition(10 * t, a), this._glRectBg.addChild(n), this._portRects.push(n)
    }, Mt.GlOp.prototype.updatePosition = function () {
        this._glRectBg ? this._glRectBg.setPosition(this._op.uiAttribs.translate.x, this._op.uiAttribs.translate.y) : console.log("no this._glRectBg")
    }, Mt.GlOp.prototype.getOp = function () {
        return this._op
    }, Mt.GlOp.prototype.update = function () {
        this.updatePosition()
    }, Mt.GlPatch = function (t) {
        this._patch = t, this._glOps = [], this._rectInstancer = new Mt.RectInstancer(this._patch.cgl), this._rectInstancer.rebuild(), t.addEventListener("onOpAdd", this.addOp.bind(this)), t.addEventListener("onOpDelete", this.deleteOp.bind(this))
    }, Mt.GlPatch.prototype.getOpAt = function (t, e) {}, Mt.GlPatch.prototype.deleteOp = function (t) {
        for (var e = 0; e < this._glOps.length; e++)
            if (this._glOps[e].getOp() == t) {
                var n = this._glOps[e];
                return this._glOps[e].getOp().removeEventListener("onUiAttribsChange", this._glOps[e].update), this._glOps.slice(e, 1), void n.dispose()
            }
    }, Mt.GlPatch.prototype.addOp = function (t) {
        console.log("OP ADDEDDDDDD");
        const e = new Mt.GlOp(this._rectInstancer, t);
        this._glOps.push(e), t.addEventListener("onUiAttribsChange", e.update.bind(e))
    }, Mt.GlPatch.prototype.render = function (t, e, n, a, i) {
        this._rectInstancer.render(t, e, n, a, i)
    }, Mt.GlPatch.prototype.dispose = function () {
        for (; this._glOps.length > 0;) this._glOps[0].dispose(), this._glOps.splice(0, 1);
        this._rectInstancer && this._rectInstancer.dispose()
    }, Mt.GlPatch.prototype.reset = function () {
        if (this._rectInstancer = new Mt.RectInstancer(this._patch.cgl), this._rectInstancer.rebuild(), this.dispose(), 0 == this._glOps.length)
            for (var t = 0; t < this._patch.ops.length; t++) this.addOp(this._patch.ops[t]);
        for (t = 0; t < this._glOps.length; t++) this._glOps[t].updatePosition();
        this._rectInstancer.rebuild()
    };
    const yt = {
            toneJsInitialized: !1,
            createAudioContext: function (t) {
                if (window.AudioContext = window.AudioContext || window.webkitAudioContext, window.AudioContext) return window.audioContext || (window.audioContext = new AudioContext), window.Tone && !yt.toneJsInitialized && (Tone.setContext(window.audioContext), yt.toneJsInitialized = !0), window.audioContext;
                t.patch.config.onError("NO_WEBAUDIO", "Web Audio is not supported in this browser.")
            },
            getAudioContext: function () {
                return window.audioContext
            },
            createAudioInPort: function (t, e, n, a) {
                if (!t || !e || !n) {
                    var i = "ERROR: createAudioInPort needs three parameters, op, portName and audioNode";
                    throw t.log(i), new Error(i)
                }
                a || (a = 0), t.webAudio = t.webAudio || {}, t.webAudio.audioInPorts = t.webAudio.audioInPorts || [];
                var r = t.inObject(e);
                return r.webAudio = {}, r.webAudio.previousAudioInNode = null, r.webAudio.audioNode = n, t.webAudio.audioInPorts[e] = r, r.onChange = function () {
                    var e = r.get();
                    if (e) try {
                        e.connect(r.webAudio.audioNode, 0, a)
                    } catch (n) {
                        throw t.log("Error: Failed to connect web audio node!", n), t.log("port.webAudio.audioNode", r.webAudio.audioNode), t.log("audioInNode: ", e), t.log("inputChannelIndex:", a), t.log("audioInNode.connect: ", e.connect), n
                    } else if (r.webAudio.previousAudioInNode) try {
                        r.webAudio.previousAudioInNode.disconnect(r.webAudio.audioNode, 0, a)
                    } catch (e) {
                        try {
                            r.webAudio.previousAudioInNode.disconnect(r.webAudio.audioNode)
                        } catch (e) {
                            throw t.log("Disconnecting audio node with in/out port index, as well as without in/out-port-index did not work ", e), e.printStackTrace && e.printStackTrace(), e
                        }
                    }
                    r.webAudio.previousAudioInNode = e
                }, r
            },
            replaceNodeInPort: function (t, e, n) {
                var a = t.webAudio.previousAudioInNode;
                if (a && a.disconnect) {
                    try {
                        a.disconnect(e)
                    } catch (t) {
                        throw t.printStackTrace && t.printStackTrace(), new Error("replaceNodeInPort: Could not disconnect old audio node. " + t.name + " " + t.message)
                    }
                    t.webAudio.audioNode = n;
                    try {
                        a.connect(n)
                    } catch (t) {
                        throw t.printStackTrace && t.printStackTrace(), new Error("replaceNodeInPort: Could not connect to new node. " + t.name + " " + t.message)
                    }
                }
            },
            createAudioOutPort: function (t, e, n) {
                if (!t || !e || !n) {
                    var a = "ERROR: createAudioOutPort needs three parameters, op, portName and audioNode";
                    throw t.log(a), new Error(a)
                }
                var i = t.outObject(e);
                return i.set(n), i
            },
            createAudioParamInPort: function (t, e, n, a, i) {
                if (!t || !e || !n) return t.log("ERROR: createAudioParamInPort needs three parameters, op, portName and audioNode"), t && t.name && t.log("opname: ", t.name), t.log("portName", e), void t.log("audioNode: ", n);
                t.webAudio = t.webAudio || {}, t.webAudio.audioInPorts = t.webAudio.audioInPorts || [];
                var r = t.inDynamic(e, [F.OP.OP_PORT_TYPE_VALUE, F.OP.OP_PORT_TYPE_OBJECT], a, i);
                return r.webAudio = {}, r.webAudio.previousAudioInNode = null, r.webAudio.audioNode = n, t.webAudio.audioInPorts[e] = r, r.onChange = function () {
                    var e = r.get(),
                        n = r.webAudio.audioNode,
                        a = yt.getAudioContext();
                    if (null != e)
                        if ("object" == typeof e && e.connect) {
                            try {
                                e.connect(n)
                            } catch (e) {
                                throw t.log("Could not connect audio node: ", e), e.printStackTrace && e.printStackTrace(), e
                            }
                            r.webAudio.previousAudioInNode = e
                        } else {
                            if (n._param && n._param.minValue && n._param.maxValue)
                                if (e >= n._param.minValue && e <= n._param.maxValue) try {
                                    n.setValueAtTime ? n.setValueAtTime(e, a.currentTime) : n.value = e
                                } catch (e) {
                                    throw t.log("Possible AudioParam problem with tone.js op: ", e), e.printStackTrace && e.printStackTrace(), e
                                } else t.log("Warning: The value for an audio parameter is out of range!");
                                else if (n.minValue && n.maxValue)
                                if (e >= n.minValue && e <= n.maxValue) try {
                                    n.setValueAtTime ? n.setValueAtTime(e, a.currentTime) : n.value = e
                                } catch (e) {
                                    throw t.log("AudioParam has minValue / maxValue defined, and value is in range, but setting the value failed! ", e), e.printStackTrace && e.printStackTrace(), e
                                } else t.log("Warning: The value for an audio parameter is out of range!");
                                else try {
                                    n.setValueAtTime ? n.setValueAtTime(e, a.currentTime) : n.value = e
                                } catch (e) {
                                    throw t.log("Possible AudioParam problem (without minValue / maxValue): ", e), e.printStackTrace && e.printStackTrace(), e
                                }
                            if (r.webAudio.previousAudioInNode && r.webAudio.previousAudioInNode.disconnect) {
                                try {
                                    r.webAudio.previousAudioInNode.disconnect(n)
                                } catch (e) {
                                    throw t.log("Could not disconnect previous audio node: ", e), e
                                }
                                r.webAudio.previousAudioInNode = void 0
                            }
                        }
                    else r.webAudio.previousAudioInNode
                }, r
            },
            loadAudioFile: function (t, e, n, a) {
                var i = yt.createAudioContext(),
                    r = t.loading.start("audio", e);
                CABLES.UI && gui.jobs().start({
                    id: "loadaudio" + r,
                    title: " loading audio (" + e + ")"
                });
                var s = new XMLHttpRequest;
                e && (s.open("GET", e, !0), s.responseType = "arraybuffer", s.onload = function () {
                    t.loading.finished(r), CABLES.UI && gui.jobs().finish("loadaudio" + r), i.decodeAudioData(s.response, n, a)
                }, s.send())
            },
            isValidToneTime: function (t) {
                try {
                    new Tone.Time(t)
                } catch (t) {
                    return !1
                }
                return !0
            },
            isValidToneNote: function (t) {
                try {
                    Tone.Frequency(t)
                } catch (t) {
                    return !1
                }
                return !0
            }
        },
        xt = function () {
            var t = CABLES.UI.userSettings.get("pacoRenderer") || !1;
            CABLES.UI.userSettings.set("pacoRenderer", !t), document.location.reload()
        },
        St = function () {},
        Tt = function (t, e, n) {
            this._patch = t, this.connector = n || new Rt, this.connector.receive(this)
        };
    Tt.prototype._receive = function (t) {
        var e;
        if ((e = t.event ? t : JSON.parse(t.data)).event == F.PACO.PACO_OP_CREATE) console.log("op create: data.vars.objName"), (s = this._patch.addOp(e.vars.objName)).id = e.vars.opId;
        else if (e.event == F.PACO.PACO_LOAD) console.log("load patch....."), this._patch.clear(), this._patch.deSerialize(e.vars.patch);
        else if (e.event == F.PACO.PACO_CLEAR) this._patch.clear(), console.log("clear");
        else if (e.event == F.PACO.PACO_OP_DELETE) console.log("op delete"), this._patch.deleteOp(e.vars.op, !0);
        else if (e.event == F.PACO.PACO_OP_ENABLE)(s = this._patch.getOpById(e.vars.op)) && (s.enabled = !0);
        else if (e.event == F.PACO.PACO_OP_DISABLE)(s = this._patch.getOpById(e.vars.op)) && (s.enabled = !1);
        else if (e.event == F.PACO.PACO_UNLINK) {
            var n = this._patch.getOpById(e.vars.op1),
                a = this._patch.getOpById(e.vars.op2),
                i = n.getPort(e.vars.port1),
                r = a.getPort(e.vars.port2);
            i.removeLinkTo(r)
        } else if (e.event == F.PACO.PACO_LINK) n = this._patch.getOpById(e.vars.op1), a = this._patch.getOpById(e.vars.op2), this._patch.link(n, e.vars.port1, a, e.vars.port2);
        else if (e.event == F.PACO.PACO_VALUECHANGE) {
            var s;
            (s = this._patch.getOpById(e.vars.op)).getPort(e.vars.port).set(e.vars.v)
        } else console.log("unknown patchConnectionEvent!", t)
    };
    const Pt = function (t, e) {
        this.connectors = [], this.connectors.push(new Rt)
    };
    Pt.prototype.send = function (t, e) {
        for (var n = 0; n < this.connectors.length; n++) this.connectors[n].send(t, e)
    };
    const Rt = function () {
        window.BroadcastChannel && (this.bc = new BroadcastChannel("test_channel"))
    };
    Rt.prototype.receive = function (t) {
        this.bc && (console.log("init"), this.bc.onmessage = t._receive.bind(t))
    }, Rt.prototype.send = function (t, e) {
        if (this.bc) {
            var n = {};
            n.event = t, n.vars = e, this.bc.postMessage(JSON.stringify(n))
        }
    };
    const Ft = Object.assign({
        EventTarget: p,
        EMBED: Et,
        Link: z,
        Port: C,
        Op: G,
        Profiler: vt,
        Requirements: Ot,
        Patch: At,
        GLGUI: Mt,
        Instancing: _t,
        Timer: ot,
        WEBAUDIO: yt,
        Variable: function () {
            var t = null,
                e = [];
            this.onChanged = function (t) {
                e.push(t)
            }, this.getValue = function () {
                return t
            }, this.setValue = function (e) {
                t = e, n()
            };
            var n = function () {
                for (var t = 0; t < e.length; t++) e[t]()
            }
        },
        LoadingStatus: bt,
        now: st,
        internalNow: rt
    }, a, r, s, o, F.PORT, F.PACO, F.ANIM, F.OP);
    e.default = Ft
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
                x: -180,
                y: 1980
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
                x: -36,
                y: 1820
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
                x: -108,
                y: 1060
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
                x: 0,
                y: 1060
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
                x: 96,
                y: 1060
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
                x: 192,
                y: 1060
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
            value: 32
        }, {
            name: "Dec factor",
            value: 16
        }],
        portsOut: [{
            name: "Next"
        }, {
            name: "Result",
            value: 0
        }]
    }, {
        opId: "5677b5b5-753a-4fbf-9e91-64c81ec68a2f",
        objName: "Ops.Anim.Smooth",
        id: "6db94589-af49-4a70-9c77-641dd4843924",
        uiAttribs: {
            translate: {
                x: 288,
                y: 1060
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
                x: 384,
                y: 1060
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
                x: 480,
                y: 1060
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
                x: 108,
                y: 1580
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
            value: 0
        }, {
            name: "Frequency",
            value: 100
        }, {
            name: "Amplitude",
            value: .5
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
                x: 276,
                y: 1580
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
                x: 276,
                y: 1640
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
                x: 384,
                y: 1640
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
                x: 384,
                y: 1700
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
                x: -180,
                y: 1900
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
            value: 1
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
                x: -24,
                y: 1420
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
                x: -24,
                y: 1500
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
                x: -24,
                y: 1660
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
                x: -24,
                y: 1740
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
                x: -96,
                y: 1580
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
                x: -96,
                y: 1660
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
            value: 100
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
                x: 108,
                y: 1420
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
                x: 108,
                y: 1500
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
            value: .01
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
                x: -24,
                y: 1580
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
                x: 108,
                y: 1660
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
                x: 576,
                y: 1060
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
            value: 32
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
                x: 672,
                y: 1060
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
            value: 32
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
                x: -84,
                y: 980
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
                x: 12,
                y: 980
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
            value: 1e-4
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
                x: 108,
                y: 980
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
                x: 204,
                y: 980
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
            value: .8
        }, {
            name: "new min",
            value: 0
        }, {
            name: "new max",
            value: 2
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
                x: 300,
                y: 980
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
            value: .8
        }, {
            name: "new min",
            value: .13333333333
        }, {
            name: "new max",
            value: 1.5
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
                x: 396,
                y: 980
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
            value: .8
        }, {
            name: "new min",
            value: .13333333333
        }, {
            name: "new max",
            value: 1.5
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
                x: 492,
                y: 980
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
            value: .8
        }, {
            name: "new min",
            value: .13333333333
        }, {
            name: "new max",
            value: 1.5
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
                x: -180,
                y: 1060
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
                x: -24,
                y: 1340
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
                x: 108,
                y: 1340
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
                x: 588,
                y: 980
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
            value: .1
        }, {
            name: "new max",
            value: .5
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
                x: 684,
                y: 980
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
            value: 0
        }, {
            name: "new max",
            value: 3
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
                x: -108,
                y: 900
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
                objOut: "f706e7e9-d0e1-44ff-938a-bf05203289fd"
            }, {
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e",
                objOut: "3e6d61c1-cd71-4621-b6bf-f28b32902c2b"
            }, {
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e",
                objOut: "6603e5c8-f3d7-4745-8394-12403c700a52"
            }, {
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "1e9daefe-5ea8-4e79-8ae0-f6a2d2178a5e",
                objOut: "f6832acc-9ccb-4ad2-b18b-7147084b76c3"
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
                x: -384,
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
                objOut: "3e6d61c1-cd71-4621-b6bf-f28b32902c2b"
            }, {
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "f2e01faf-3d26-42da-a2e5-889abbb4a5ca",
                objOut: "f706e7e9-d0e1-44ff-938a-bf05203289fd"
            }, {
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "f2e01faf-3d26-42da-a2e5-889abbb4a5ca",
                objOut: "f6832acc-9ccb-4ad2-b18b-7147084b76c3"
            }, {
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "f2e01faf-3d26-42da-a2e5-889abbb4a5ca",
                objOut: "6603e5c8-f3d7-4745-8394-12403c700a52"
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
                x: -180,
                y: 820
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
                x: -24,
                y: 1260
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
                x: -180,
                y: 740
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
            value: 1
        }, {
            name: "max distance",
            value: 10
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
            value: 10
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
            value: 1
        }, {
            name: "Smoothness",
            value: 1
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
            value: !0
        }, {
            name: "Allow Rotation",
            value: !0
        }, {
            name: "restricted",
            value: !0
        }, {
            name: "Pointerlock",
            value: !0
        }, {
            name: "Reset",
            value: 0
        }],
        portsOut: [{
            name: "trigger"
        }, {
            name: "radius",
            value: 10
        }, {
            name: "Rot X",
            value: 1391.0897276422218
        }, {
            name: "Rot Y",
            value: 113.75999999999993
        }]
    }, {
        opId: "ea508405-833d-411a-86b4-1a012c135c8a",
        objName: "Ops.Array.ArrayLength",
        id: "d8f6c2e5-1579-417b-abca-15960e616584",
        uiAttribs: {
            translate: {
                x: 108,
                y: 1260
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
                x: 288,
                y: 1200
            },
            subPatch: 0,
            notWorkingMsg: null,
            color: "#07F78C"
        },
        portsIn: [{
            name: "Play",
            value: !0
        }, {
            name: "Reset",
            value: null
        }, {
            name: "Speed",
            links: [{
                portIn: "Speed",
                portOut: "Result",
                objIn: "232311ca-91b5-4516-a784-bf7733287aa3",
                objOut: "a40b4bc6-0592-430d-b404-22517777e32b"
            }]
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
                x: 396,
                y: 1200
            },
            subPatch: 0,
            notWorkingMsg: null,
            color: "#07F78C"
        },
        portsIn: [{
            name: "Play",
            value: !0
        }, {
            name: "Reset",
            value: null
        }, {
            name: "Speed",
            links: [{
                portIn: "Speed",
                portOut: "result",
                objIn: "e76d5d63-69f1-448a-9690-415a55e2edef",
                objOut: "248b26e9-50dd-496a-8fe6-3f3168dd5746"
            }]
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
                x: -180,
                y: 580
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
            value: 640
        }, {
            name: "height",
            value: 360
        }]
    }, {
        opId: "19b441eb-9f63-4f35-ba08-b87841517c4d",
        objName: "Ops.Gl.ClearColor",
        id: "3edd51d2-7e91-446a-8b87-2e068d058c83",
        uiAttribs: {
            translate: {
                x: -180,
                y: 660
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
            value: .13333333333333333
        }, {
            name: "g",
            value: .13333333333333333
        }, {
            name: "b",
            value: .13333333333333333
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
                x: -12,
                y: 1200
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Play",
            value: !0
        }, {
            name: "Reset",
            value: null
        }, {
            name: "Speed",
            links: [{
                portIn: "Speed",
                portOut: "Result",
                objIn: "8721cbc5-b10d-4480-aa5a-62d2178a721d",
                objOut: "f784a56e-a3c8-48d2-a687-21d9742d9e44"
            }]
        }],
        portsOut: [{
            name: "Time"
        }]
    }, {
        opId: "05385277-92fc-4d49-b730-11f9ed5e5c0d",
        objName: "Ops.WebAudio.AudioBufferPlayer",
        id: "6603e5c8-f3d7-4745-8394-12403c700a52",
        uiAttribs: {
            translate: {
                x: -384,
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
                objIn: "6603e5c8-f3d7-4745-8394-12403c700a52",
                objOut: "24c07fbe-efb0-4a11-b3c2-36a38d54a6b7"
            }]
        }, {
            name: "Start / Stop",
            links: [{
                portIn: "Start / Stop",
                portOut: "result",
                objIn: "6603e5c8-f3d7-4745-8394-12403c700a52",
                objOut: "9a9efaad-88bb-4f42-aa91-74a464996e7b"
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
                objIn: "6603e5c8-f3d7-4745-8394-12403c700a52",
                objOut: "be67cef0-6be4-4f6c-801e-fc4055638b0a"
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
        opId: "3e28f86a-4f74-49a2-a1a6-f8943c00352d",
        objName: "Ops.WebAudio.BiquadFilter",
        id: "732bf3b3-29c5-4846-9a35-895edc9f0da5",
        uiAttribs: {
            translate: {
                x: -504,
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
                objIn: "732bf3b3-29c5-4846-9a35-895edc9f0da5",
                objOut: "6603e5c8-f3d7-4745-8394-12403c700a52"
            }, {
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "732bf3b3-29c5-4846-9a35-895edc9f0da5",
                objOut: "f6832acc-9ccb-4ad2-b18b-7147084b76c3"
            }, {
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "732bf3b3-29c5-4846-9a35-895edc9f0da5",
                objOut: "f706e7e9-d0e1-44ff-938a-bf05203289fd"
            }, {
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "732bf3b3-29c5-4846-9a35-895edc9f0da5",
                objOut: "3e6d61c1-cd71-4621-b6bf-f28b32902c2b"
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
                x: -516,
                y: 900
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
                x: -516,
                y: 1060
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
            value: 6
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
                x: -492,
                y: 980
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
            value: .005
        }, {
            name: "new max",
            value: .01
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
                x: -60,
                y: 580
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Play",
            value: !0
        }, {
            name: "Reset",
            value: 0
        }, {
            name: "Speed",
            links: [{
                portIn: "Speed",
                portOut: "Result",
                objIn: "86cbb8f3-71f7-4b06-b224-c749ce6a07f6",
                objOut: "4bc203d4-7e8a-47b1-9bac-5fb689f86d03"
            }]
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
                x: 588,
                y: 1120
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
        opId: "2cf4b0a1-b657-405b-8bf9-8555dbd5c231",
        objName: "Ops.WebAudio.AudioBuffer",
        id: "24c07fbe-efb0-4a11-b3c2-36a38d54a6b7",
        uiAttribs: {
            translate: {
                x: -384,
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
                objIn: "24c07fbe-efb0-4a11-b3c2-36a38d54a6b7",
                objOut: "5ebaba50-939a-49ee-9757-a27d195c397a"
            }]
        }],
        portsOut: [{
            name: "Audio Buffer"
        }, {
            name: "Finished Loading",
            value: !0
        }, {
            name: "Sample Rate",
            value: 44100
        }, {
            name: "Length",
            value: 8494566
        }, {
            name: "Duration"
        }, {
            name: "Number of Channels",
            value: 2
        }]
    }, {
        opId: "aac7f721-208f-411a-adb3-79adae2e471a",
        objName: "Ops.Anim.Timer_v2",
        id: "be67cef0-6be4-4f6c-801e-fc4055638b0a",
        uiAttribs: {
            translate: {
                x: -336,
                y: -160
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Play",
            links: [{
                portIn: "Play",
                portOut: "result",
                objIn: "be67cef0-6be4-4f6c-801e-fc4055638b0a",
                objOut: "9a9efaad-88bb-4f42-aa91-74a464996e7b"
            }]
        }, {
            name: "Reset",
            links: [{
                portIn: "Reset",
                portOut: "Output",
                objIn: "be67cef0-6be4-4f6c-801e-fc4055638b0a",
                objOut: "a2b0c4ba-550a-4a0d-affd-7e4eac76a811"
            }]
        }, {
            name: "Speed",
            value: 1
        }],
        portsOut: [{
            name: "Time"
        }]
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "9a9efaad-88bb-4f42-aa91-74a464996e7b",
        uiAttribs: {
            translate: {
                x: -372,
                y: -220
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Click",
                objIn: "9a9efaad-88bb-4f42-aa91-74a464996e7b",
                objOut: "d819fe66-bf71-4759-8df4-67d8bb4e45c1"
            }, {
                portIn: "trigger",
                portOut: "next",
                objIn: "9a9efaad-88bb-4f42-aa91-74a464996e7b",
                objOut: "b457fe45-c0d6-4e7d-aee1-1063b5c7a627"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Click",
                objIn: "9a9efaad-88bb-4f42-aa91-74a464996e7b",
                objOut: "67d83939-7ad2-4b5c-9949-025c94102d29"
            }, {
                portIn: "reset",
                portOut: "Click",
                objIn: "9a9efaad-88bb-4f42-aa91-74a464996e7b",
                objOut: "7ffd03dd-4f93-49f6-8cc3-909c431151db"
            }, {
                portIn: "reset",
                portOut: "Click",
                objIn: "9a9efaad-88bb-4f42-aa91-74a464996e7b",
                objOut: "8e20d05f-05f5-40fc-8686-11dfb6d657df"
            }, {
                portIn: "reset",
                portOut: "Output",
                objIn: "9a9efaad-88bb-4f42-aa91-74a464996e7b",
                objOut: "a2b0c4ba-550a-4a0d-affd-7e4eac76a811"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "0cf90109-cccd-4633-9c77-8aaf53eae15c",
        objName: "Ops.Html.FontFile",
        id: "b38a413b-e6a0-4b6c-9128-0cbeec9f194f",
        uiAttribs: {
            translate: {
                x: -408,
                y: -1080
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "file",
            value: 0,
            display: "file"
        }, {
            name: "family",
            value: ""
        }],
        portsOut: [{
            name: "Loaded",
            value: 0
        }, {
            name: "Loaded Trigger",
            value: 0
        }]
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "67d83939-7ad2-4b5c-9949-025c94102d29",
        uiAttribs: {
            translate: {
                x: -264,
                y: -460
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "67d83939-7ad2-4b5c-9949-025c94102d29",
                objOut: "0dfc01b9-eea8-4f78-ae7f-93194802464e"
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
            name: "Touch Start",
            value: 0
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
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "0dfc01b9-eea8-4f78-ae7f-93194802464e",
        uiAttribs: {
            title: "Song2",
            translate: {
                x: -264,
                y: -980
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "song2"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:9999;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            value: !0
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
        objName: "Ops.User.l6n.GetSoundcloud",
        id: "5ebaba50-939a-49ee-9757-a27d195c397a",
        uiAttribs: {
            translate: {
                x: -960,
                y: -100
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "SoundCloud URL",
            links: [{
                portIn: "SoundCloud URL",
                portOut: "String",
                objIn: "5ebaba50-939a-49ee-9757-a27d195c397a",
                objOut: "0e98bb6a-9576-402b-a97b-9b2b34557bef"
            }]
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
        opId: "d697ff82-74fd-4f31-8f54-295bc64e713d",
        objName: "Ops.String.String_v2",
        id: "0e98bb6a-9576-402b-a97b-9b2b34557bef",
        uiAttribs: {
            title: "Song1Input",
            translate: {
                x: -960,
                y: -160
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            value: "https://soundcloud.com/dennis_lloyd/l-e-f-t-o-v-e-r-s"
        }],
        portsOut: [{
            name: "String"
        }]
    }, {
        objName: "Ops.User.l6n.GetSoundcloud",
        id: "6cff7126-30e5-410e-a20e-e239a29bab2e",
        uiAttribs: {
            translate: {
                x: -828,
                y: -100
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "SoundCloud URL",
            links: [{
                portIn: "SoundCloud URL",
                portOut: "String",
                objIn: "6cff7126-30e5-410e-a20e-e239a29bab2e",
                objOut: "83f5659d-7639-47e2-b0dc-75daf4cbc9d5"
            }]
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
        opId: "d697ff82-74fd-4f31-8f54-295bc64e713d",
        objName: "Ops.String.String_v2",
        id: "83f5659d-7639-47e2-b0dc-75daf4cbc9d5",
        uiAttribs: {
            title: "Song2Input",
            translate: {
                x: -828,
                y: -160
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            value: "https://soundcloud.com/pointpoint/point-point-fplusl"
        }],
        portsOut: [{
            name: "String"
        }]
    }, {
        objName: "Ops.User.l6n.GetSoundcloud",
        id: "c9e982d7-8cb0-4867-88d8-e4bf2ac780c6",
        uiAttribs: {
            translate: {
                x: -540,
                y: -100
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "SoundCloud URL",
            links: [{
                portIn: "SoundCloud URL",
                portOut: "String",
                objIn: "c9e982d7-8cb0-4867-88d8-e4bf2ac780c6",
                objOut: "485e45b3-920f-4aca-a976-b48ee59051f4"
            }]
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
        objName: "Ops.User.l6n.GetSoundcloud",
        id: "287f9a3c-6b56-496d-9f35-df3e4a44ef5a",
        uiAttribs: {
            translate: {
                x: -684,
                y: -100
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "SoundCloud URL",
            links: [{
                portIn: "SoundCloud URL",
                portOut: "String",
                objIn: "287f9a3c-6b56-496d-9f35-df3e4a44ef5a",
                objOut: "ce83c937-6333-4497-b864-5801af2ff05e"
            }]
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
        opId: "d697ff82-74fd-4f31-8f54-295bc64e713d",
        objName: "Ops.String.String_v2",
        id: "ce83c937-6333-4497-b864-5801af2ff05e",
        uiAttribs: {
            title: "Song3Input",
            translate: {
                x: -684,
                y: -160
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            value: "https://soundcloud.com/hippiesabotage/om-1"
        }],
        portsOut: [{
            name: "String"
        }]
    }, {
        opId: "d697ff82-74fd-4f31-8f54-295bc64e713d",
        objName: "Ops.String.String_v2",
        id: "485e45b3-920f-4aca-a976-b48ee59051f4",
        uiAttribs: {
            title: "Song4Input",
            translate: {
                x: -540,
                y: -160
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            value: "https://soundcloud.com/yochoster/kanyeamericanboyremix"
        }],
        portsOut: [{
            name: "String"
        }]
    }, {
        opId: "a56d3edd-06ad-44ed-9810-dbf714600c67",
        objName: "Ops.Html.CSS_v2",
        id: "3674dbeb-714f-474c-a33f-630a1cf533e2",
        uiAttribs: {
            translate: {
                x: -408,
                y: -1040
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "css code",
            value: ".song1\n{\n    height: 125px;\n    width: 125px;\n    bottom: 145px;\n    right: 145px;\n    opacity: 0.5;\n}\n.song2\n{\n    height: 125px;\n    width: 125px;\n    bottom: 20px;\n    right: 20px;\n    opacity: 0.5;\n}\n.song3\n{\n    height: 125px;\n    width: 125px;\n    bottom: 145px;\n    right: 20px;\n    opacity: 0.5;\n}\n.song4\n{\n    height: 125px;\n    width: 125px;\n    bottom: 20px;\n    right: 145px;\n    opacity: 0.5;\n}\n.hover\n{\n    opacity: 1;\n}\n.clicked\n{\n    opacity: 0.75;\n}\n.kevin\n{\n    background-color: white;\n    top: 0px;\n    width: 100%;\n    font-size: 18px;\n    color: #222222;\n    text-align: center;\n    \n}"
        }],
        portsOut: []
    }, {
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "9013da5d-4e76-4ddc-a78e-cb3dd272d110",
        uiAttribs: {
            title: "Song1",
            translate: {
                x: -408,
                y: -980
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "song1"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:9999;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            value: !0
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
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "d819fe66-bf71-4759-8df4-67d8bb4e45c1",
        uiAttribs: {
            translate: {
                x: -408,
                y: -460
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "d819fe66-bf71-4759-8df4-67d8bb4e45c1",
                objOut: "9013da5d-4e76-4ddc-a78e-cb3dd272d110"
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
            name: "Touch Start",
            value: 0
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
        opId: "da3de45b-c252-4785-8558-7fadb199ea61",
        objName: "Ops.Html.BackgroundImage",
        id: "171ca44c-6692-45a2-90da-a2ebc69bab6a",
        uiAttribs: {
            translate: {
                x: -972,
                y: -40
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "171ca44c-6692-45a2-90da-a2ebc69bab6a",
                objOut: "9013da5d-4e76-4ddc-a78e-cb3dd272d110"
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
                objIn: "171ca44c-6692-45a2-90da-a2ebc69bab6a",
                objOut: "5ebaba50-939a-49ee-9757-a27d195c397a"
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
        id: "9e21a781-e642-4306-9a26-a8b4a16bb927",
        uiAttribs: {
            translate: {
                x: -828,
                y: -40
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "9e21a781-e642-4306-9a26-a8b4a16bb927",
                objOut: "0dfc01b9-eea8-4f78-ae7f-93194802464e"
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
                objIn: "9e21a781-e642-4306-9a26-a8b4a16bb927",
                objOut: "6cff7126-30e5-410e-a20e-e239a29bab2e"
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
        opId: "05385277-92fc-4d49-b730-11f9ed5e5c0d",
        objName: "Ops.WebAudio.AudioBufferPlayer",
        id: "f6832acc-9ccb-4ad2-b18b-7147084b76c3",
        uiAttribs: {
            translate: {
                x: -240,
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
                objIn: "f6832acc-9ccb-4ad2-b18b-7147084b76c3",
                objOut: "9353bccd-cbb6-49c9-89f6-11f85fbf0a34"
            }]
        }, {
            name: "Start / Stop",
            links: [{
                portIn: "Start / Stop",
                portOut: "result",
                objIn: "f6832acc-9ccb-4ad2-b18b-7147084b76c3",
                objOut: "2f161133-68b2-403c-9c54-38ae19f13205"
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
                objIn: "f6832acc-9ccb-4ad2-b18b-7147084b76c3",
                objOut: "ecbc0da9-245f-4d19-9731-0ab1cb2b25c0"
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
        id: "9353bccd-cbb6-49c9-89f6-11f85fbf0a34",
        uiAttribs: {
            translate: {
                x: -240,
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
                objIn: "9353bccd-cbb6-49c9-89f6-11f85fbf0a34",
                objOut: "6cff7126-30e5-410e-a20e-e239a29bab2e"
            }]
        }],
        portsOut: [{
            name: "Audio Buffer"
        }, {
            name: "Finished Loading",
            value: !0
        }, {
            name: "Sample Rate",
            value: 44100
        }, {
            name: "Length",
            value: 1323e4
        }, {
            name: "Duration"
        }, {
            name: "Number of Channels",
            value: 2
        }]
    }, {
        opId: "aac7f721-208f-411a-adb3-79adae2e471a",
        objName: "Ops.Anim.Timer_v2",
        id: "ecbc0da9-245f-4d19-9731-0ab1cb2b25c0",
        uiAttribs: {
            translate: {
                x: -192,
                y: -160
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Play",
            links: [{
                portIn: "Play",
                portOut: "result",
                objIn: "ecbc0da9-245f-4d19-9731-0ab1cb2b25c0",
                objOut: "2f161133-68b2-403c-9c54-38ae19f13205"
            }]
        }, {
            name: "Reset",
            links: [{
                portIn: "Reset",
                portOut: "Output",
                objIn: "ecbc0da9-245f-4d19-9731-0ab1cb2b25c0",
                objOut: "6614a5aa-39a1-4b08-ac94-2b5b23d8e08c"
            }]
        }, {
            name: "Speed",
            value: 1
        }],
        portsOut: [{
            name: "Time"
        }]
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "2f161133-68b2-403c-9c54-38ae19f13205",
        uiAttribs: {
            translate: {
                x: -228,
                y: -220
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Click",
                objIn: "2f161133-68b2-403c-9c54-38ae19f13205",
                objOut: "67d83939-7ad2-4b5c-9949-025c94102d29"
            }, {
                portIn: "trigger",
                portOut: "next",
                objIn: "2f161133-68b2-403c-9c54-38ae19f13205",
                objOut: "543e3980-ff06-4388-85ec-5a58620d7bcd"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Click",
                objIn: "2f161133-68b2-403c-9c54-38ae19f13205",
                objOut: "d819fe66-bf71-4759-8df4-67d8bb4e45c1"
            }, {
                portIn: "reset",
                portOut: "Click",
                objIn: "2f161133-68b2-403c-9c54-38ae19f13205",
                objOut: "7ffd03dd-4f93-49f6-8cc3-909c431151db"
            }, {
                portIn: "reset",
                portOut: "Click",
                objIn: "2f161133-68b2-403c-9c54-38ae19f13205",
                objOut: "8e20d05f-05f5-40fc-8686-11dfb6d657df"
            }, {
                portIn: "reset",
                portOut: "Output",
                objIn: "2f161133-68b2-403c-9c54-38ae19f13205",
                objOut: "6614a5aa-39a1-4b08-ac94-2b5b23d8e08c"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "da3de45b-c252-4785-8558-7fadb199ea61",
        objName: "Ops.Html.BackgroundImage",
        id: "1e6133c9-f5f6-4a2d-9cc5-7aab0366b169",
        uiAttribs: {
            translate: {
                x: -684,
                y: -40
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
                objOut: "dc952fb6-371d-4f5e-82ef-ee139b84af66"
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
        id: "9183b08d-40bf-4035-a484-c780cd71d3d8",
        uiAttribs: {
            translate: {
                x: -540,
                y: -40
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "9183b08d-40bf-4035-a484-c780cd71d3d8",
                objOut: "cabe0e63-fe97-47f3-9844-d196ca989b94"
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
                objIn: "9183b08d-40bf-4035-a484-c780cd71d3d8",
                objOut: "c9e982d7-8cb0-4867-88d8-e4bf2ac780c6"
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
        opId: "05385277-92fc-4d49-b730-11f9ed5e5c0d",
        objName: "Ops.WebAudio.AudioBufferPlayer",
        id: "f706e7e9-d0e1-44ff-938a-bf05203289fd",
        uiAttribs: {
            translate: {
                x: -96,
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
                objIn: "f706e7e9-d0e1-44ff-938a-bf05203289fd",
                objOut: "4722a21c-a926-4517-945a-e7d42f77dc85"
            }]
        }, {
            name: "Start / Stop",
            links: [{
                portIn: "Start / Stop",
                portOut: "result",
                objIn: "f706e7e9-d0e1-44ff-938a-bf05203289fd",
                objOut: "ea089f6a-3736-4f2c-b415-cc3aaa03efae"
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
                objIn: "f706e7e9-d0e1-44ff-938a-bf05203289fd",
                objOut: "496f120d-9e37-4e53-9dd5-209263a94d59"
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
        id: "4722a21c-a926-4517-945a-e7d42f77dc85",
        uiAttribs: {
            translate: {
                x: -96,
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
                objIn: "4722a21c-a926-4517-945a-e7d42f77dc85",
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
            value: 44100
        }, {
            name: "Length",
            value: 13927486
        }, {
            name: "Duration"
        }, {
            name: "Number of Channels",
            value: 2
        }]
    }, {
        opId: "aac7f721-208f-411a-adb3-79adae2e471a",
        objName: "Ops.Anim.Timer_v2",
        id: "496f120d-9e37-4e53-9dd5-209263a94d59",
        uiAttribs: {
            translate: {
                x: -48,
                y: -160
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Play",
            links: [{
                portIn: "Play",
                portOut: "result",
                objIn: "496f120d-9e37-4e53-9dd5-209263a94d59",
                objOut: "ea089f6a-3736-4f2c-b415-cc3aaa03efae"
            }]
        }, {
            name: "Reset",
            links: [{
                portIn: "Reset",
                portOut: "Output",
                objIn: "496f120d-9e37-4e53-9dd5-209263a94d59",
                objOut: "07f97caf-9f1b-43ea-9027-441243f5e4a1"
            }]
        }, {
            name: "Speed",
            value: 1
        }],
        portsOut: [{
            name: "Time"
        }]
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "ea089f6a-3736-4f2c-b415-cc3aaa03efae",
        uiAttribs: {
            translate: {
                x: -84,
                y: -220
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Click",
                objIn: "ea089f6a-3736-4f2c-b415-cc3aaa03efae",
                objOut: "7ffd03dd-4f93-49f6-8cc3-909c431151db"
            }, {
                portIn: "trigger",
                portOut: "next",
                objIn: "ea089f6a-3736-4f2c-b415-cc3aaa03efae",
                objOut: "aa0ed7a8-a729-41af-8c0f-f91facf6f3e1"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Click",
                objIn: "ea089f6a-3736-4f2c-b415-cc3aaa03efae",
                objOut: "d819fe66-bf71-4759-8df4-67d8bb4e45c1"
            }, {
                portIn: "reset",
                portOut: "Click",
                objIn: "ea089f6a-3736-4f2c-b415-cc3aaa03efae",
                objOut: "67d83939-7ad2-4b5c-9949-025c94102d29"
            }, {
                portIn: "reset",
                portOut: "Click",
                objIn: "ea089f6a-3736-4f2c-b415-cc3aaa03efae",
                objOut: "8e20d05f-05f5-40fc-8686-11dfb6d657df"
            }, {
                portIn: "reset",
                portOut: "Output",
                objIn: "ea089f6a-3736-4f2c-b415-cc3aaa03efae",
                objOut: "07f97caf-9f1b-43ea-9027-441243f5e4a1"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "7ffd03dd-4f93-49f6-8cc3-909c431151db",
        uiAttribs: {
            translate: {
                x: -120,
                y: -460
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "7ffd03dd-4f93-49f6-8cc3-909c431151db",
                objOut: "dc952fb6-371d-4f5e-82ef-ee139b84af66"
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
            name: "Touch Start",
            value: 0
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
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "dc952fb6-371d-4f5e-82ef-ee139b84af66",
        uiAttribs: {
            title: "Song3",
            translate: {
                x: -120,
                y: -980
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "song3"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:9999;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            value: !0
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
        opId: "05385277-92fc-4d49-b730-11f9ed5e5c0d",
        objName: "Ops.WebAudio.AudioBufferPlayer",
        id: "3e6d61c1-cd71-4621-b6bf-f28b32902c2b",
        uiAttribs: {
            translate: {
                x: 48,
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
                objIn: "3e6d61c1-cd71-4621-b6bf-f28b32902c2b",
                objOut: "f3072b1b-a160-47af-87bd-b9c1be62729c"
            }]
        }, {
            name: "Start / Stop",
            links: [{
                portIn: "Start / Stop",
                portOut: "result",
                objIn: "3e6d61c1-cd71-4621-b6bf-f28b32902c2b",
                objOut: "7b87798a-342c-4445-9920-c7291e2d1806"
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
                objIn: "3e6d61c1-cd71-4621-b6bf-f28b32902c2b",
                objOut: "5bacd5ae-64ae-4b49-ba01-7b4b48bbf46a"
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
        id: "f3072b1b-a160-47af-87bd-b9c1be62729c",
        uiAttribs: {
            translate: {
                x: 48,
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
                objIn: "f3072b1b-a160-47af-87bd-b9c1be62729c",
                objOut: "c9e982d7-8cb0-4867-88d8-e4bf2ac780c6"
            }]
        }],
        portsOut: [{
            name: "Audio Buffer"
        }, {
            name: "Finished Loading",
            value: !0
        }, {
            name: "Sample Rate",
            value: 44100
        }, {
            name: "Length",
            value: 13661949
        }, {
            name: "Duration"
        }, {
            name: "Number of Channels",
            value: 2
        }]
    }, {
        opId: "aac7f721-208f-411a-adb3-79adae2e471a",
        objName: "Ops.Anim.Timer_v2",
        id: "5bacd5ae-64ae-4b49-ba01-7b4b48bbf46a",
        uiAttribs: {
            translate: {
                x: 96,
                y: -160
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Play",
            links: [{
                portIn: "Play",
                portOut: "result",
                objIn: "5bacd5ae-64ae-4b49-ba01-7b4b48bbf46a",
                objOut: "7b87798a-342c-4445-9920-c7291e2d1806"
            }]
        }, {
            name: "Reset",
            links: [{
                portIn: "Reset",
                portOut: "Output",
                objIn: "5bacd5ae-64ae-4b49-ba01-7b4b48bbf46a",
                objOut: "df7c1f71-ab6b-4924-8cce-8b8f290e96c2"
            }]
        }, {
            name: "Speed",
            value: 1
        }],
        portsOut: [{
            name: "Time"
        }]
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "7b87798a-342c-4445-9920-c7291e2d1806",
        uiAttribs: {
            translate: {
                x: 60,
                y: -220
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Click",
                objIn: "7b87798a-342c-4445-9920-c7291e2d1806",
                objOut: "8e20d05f-05f5-40fc-8686-11dfb6d657df"
            }, {
                portIn: "trigger",
                portOut: "next",
                objIn: "7b87798a-342c-4445-9920-c7291e2d1806",
                objOut: "a79c181e-c10d-4d5b-a438-4d3d821b249d"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Click",
                objIn: "7b87798a-342c-4445-9920-c7291e2d1806",
                objOut: "7ffd03dd-4f93-49f6-8cc3-909c431151db"
            }, {
                portIn: "reset",
                portOut: "Click",
                objIn: "7b87798a-342c-4445-9920-c7291e2d1806",
                objOut: "67d83939-7ad2-4b5c-9949-025c94102d29"
            }, {
                portIn: "reset",
                portOut: "Click",
                objIn: "7b87798a-342c-4445-9920-c7291e2d1806",
                objOut: "d819fe66-bf71-4759-8df4-67d8bb4e45c1"
            }, {
                portIn: "reset",
                portOut: "Output",
                objIn: "7b87798a-342c-4445-9920-c7291e2d1806",
                objOut: "df7c1f71-ab6b-4924-8cce-8b8f290e96c2"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "73dc05e9-7b63-444b-980b-bd63f511b94a",
        objName: "Ops.Html.EventListener",
        id: "8e20d05f-05f5-40fc-8686-11dfb6d657df",
        uiAttribs: {
            translate: {
                x: 24,
                y: -460
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Dom Element",
            links: [{
                portIn: "Dom Element",
                portOut: "DOM Element",
                objIn: "8e20d05f-05f5-40fc-8686-11dfb6d657df",
                objOut: "cabe0e63-fe97-47f3-9844-d196ca989b94"
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
            name: "Touch Start",
            value: 0
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
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "cabe0e63-fe97-47f3-9844-d196ca989b94",
        uiAttribs: {
            title: "Song4",
            translate: {
                x: 24,
                y: -980
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "song4"
        }, {
            name: "Text",
            value: ""
        }, {
            name: "Style",
            value: "position:fixed;z-index:9999;"
        }, {
            name: "Interactive",
            value: !0
        }, {
            name: "Visible",
            value: !0
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
        opId: "ef0891db-6053-42ba-b7d5-29c7cf6d8208",
        objName: "Ops.Trigger.Threshold",
        id: "a2b0c4ba-550a-4a0d-affd-7e4eac76a811",
        uiAttribs: {
            translate: {
                x: -336,
                y: -100
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Input",
            links: [{
                portIn: "Input",
                portOut: "Time",
                objIn: "a2b0c4ba-550a-4a0d-affd-7e4eac76a811",
                objOut: "be67cef0-6be4-4f6c-801e-fc4055638b0a"
            }]
        }, {
            name: "Threshold",
            links: [{
                portIn: "Threshold",
                portOut: "Duration",
                objIn: "a2b0c4ba-550a-4a0d-affd-7e4eac76a811",
                objOut: "24c07fbe-efb0-4a11-b3c2-36a38d54a6b7"
            }]
        }],
        portsOut: [{
            name: "Output"
        }]
    }, {
        opId: "f4ff66b0-8500-46f7-9117-832aea0c2750",
        objName: "Ops.Time.DelayedTrigger",
        id: "b457fe45-c0d6-4e7d-aee1-1063b5c7a627",
        uiAttribs: {
            translate: {
                x: -336,
                y: -40
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "exe",
            links: [{
                portIn: "exe",
                portOut: "Output",
                objIn: "b457fe45-c0d6-4e7d-aee1-1063b5c7a627",
                objOut: "a2b0c4ba-550a-4a0d-affd-7e4eac76a811"
            }]
        }, {
            name: "delay",
            value: 1
        }],
        portsOut: [{
            name: "next"
        }]
    }, {
        opId: "ef0891db-6053-42ba-b7d5-29c7cf6d8208",
        objName: "Ops.Trigger.Threshold",
        id: "6614a5aa-39a1-4b08-ac94-2b5b23d8e08c",
        uiAttribs: {
            translate: {
                x: -192,
                y: -100
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Input",
            links: [{
                portIn: "Input",
                portOut: "Time",
                objIn: "6614a5aa-39a1-4b08-ac94-2b5b23d8e08c",
                objOut: "ecbc0da9-245f-4d19-9731-0ab1cb2b25c0"
            }]
        }, {
            name: "Threshold",
            links: [{
                portIn: "Threshold",
                portOut: "Duration",
                objIn: "6614a5aa-39a1-4b08-ac94-2b5b23d8e08c",
                objOut: "9353bccd-cbb6-49c9-89f6-11f85fbf0a34"
            }]
        }],
        portsOut: [{
            name: "Output"
        }]
    }, {
        opId: "f4ff66b0-8500-46f7-9117-832aea0c2750",
        objName: "Ops.Time.DelayedTrigger",
        id: "543e3980-ff06-4388-85ec-5a58620d7bcd",
        uiAttribs: {
            translate: {
                x: -192,
                y: -40
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "exe",
            links: [{
                portIn: "exe",
                portOut: "Output",
                objIn: "543e3980-ff06-4388-85ec-5a58620d7bcd",
                objOut: "6614a5aa-39a1-4b08-ac94-2b5b23d8e08c"
            }]
        }, {
            name: "delay",
            value: 1
        }],
        portsOut: [{
            name: "next"
        }]
    }, {
        opId: "f4ff66b0-8500-46f7-9117-832aea0c2750",
        objName: "Ops.Time.DelayedTrigger",
        id: "aa0ed7a8-a729-41af-8c0f-f91facf6f3e1",
        uiAttribs: {
            translate: {
                x: -48,
                y: -40
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "exe",
            links: [{
                portIn: "exe",
                portOut: "Output",
                objIn: "aa0ed7a8-a729-41af-8c0f-f91facf6f3e1",
                objOut: "07f97caf-9f1b-43ea-9027-441243f5e4a1"
            }]
        }, {
            name: "delay",
            value: 1
        }],
        portsOut: [{
            name: "next"
        }]
    }, {
        opId: "ef0891db-6053-42ba-b7d5-29c7cf6d8208",
        objName: "Ops.Trigger.Threshold",
        id: "07f97caf-9f1b-43ea-9027-441243f5e4a1",
        uiAttribs: {
            translate: {
                x: -48,
                y: -100
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Input",
            links: [{
                portIn: "Input",
                portOut: "Time",
                objIn: "07f97caf-9f1b-43ea-9027-441243f5e4a1",
                objOut: "496f120d-9e37-4e53-9dd5-209263a94d59"
            }]
        }, {
            name: "Threshold",
            links: [{
                portIn: "Threshold",
                portOut: "Duration",
                objIn: "07f97caf-9f1b-43ea-9027-441243f5e4a1",
                objOut: "4722a21c-a926-4517-945a-e7d42f77dc85"
            }]
        }],
        portsOut: [{
            name: "Output"
        }]
    }, {
        opId: "ef0891db-6053-42ba-b7d5-29c7cf6d8208",
        objName: "Ops.Trigger.Threshold",
        id: "df7c1f71-ab6b-4924-8cce-8b8f290e96c2",
        uiAttribs: {
            translate: {
                x: 96,
                y: -100
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Input",
            links: [{
                portIn: "Input",
                portOut: "Time",
                objIn: "df7c1f71-ab6b-4924-8cce-8b8f290e96c2",
                objOut: "5bacd5ae-64ae-4b49-ba01-7b4b48bbf46a"
            }]
        }, {
            name: "Threshold",
            links: [{
                portIn: "Threshold",
                portOut: "Duration",
                objIn: "df7c1f71-ab6b-4924-8cce-8b8f290e96c2",
                objOut: "f3072b1b-a160-47af-87bd-b9c1be62729c"
            }]
        }],
        portsOut: [{
            name: "Output"
        }]
    }, {
        opId: "f4ff66b0-8500-46f7-9117-832aea0c2750",
        objName: "Ops.Time.DelayedTrigger",
        id: "a79c181e-c10d-4d5b-a438-4d3d821b249d",
        uiAttribs: {
            translate: {
                x: 96,
                y: -40
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "exe",
            links: [{
                portIn: "exe",
                portOut: "Output",
                objIn: "a79c181e-c10d-4d5b-a438-4d3d821b249d",
                objOut: "df7c1f71-ab6b-4924-8cce-8b8f290e96c2"
            }]
        }, {
            name: "delay",
            value: 1
        }],
        portsOut: [{
            name: "next"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "8d4a7c53-eae9-425c-b171-6b9bac3f54d1",
        uiAttribs: {
            title: "HoverCSS",
            translate: {
                x: -408,
                y: -920
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "8d4a7c53-eae9-425c-b171-6b9bac3f54d1",
                objOut: "9013da5d-4e76-4ddc-a78e-cb3dd272d110"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "8d4a7c53-eae9-425c-b171-6b9bac3f54d1",
                objOut: "9013da5d-4e76-4ddc-a78e-cb3dd272d110"
            }]
        }],
        portsOut: []
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "dbd4c450-3a2a-4753-b80d-9e4a67e6d7de",
        uiAttribs: {
            title: "HoverCSS",
            translate: {
                x: -264,
                y: -920
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "dbd4c450-3a2a-4753-b80d-9e4a67e6d7de",
                objOut: "0dfc01b9-eea8-4f78-ae7f-93194802464e"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "dbd4c450-3a2a-4753-b80d-9e4a67e6d7de",
                objOut: "0dfc01b9-eea8-4f78-ae7f-93194802464e"
            }]
        }],
        portsOut: []
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "c627dbcb-64c9-43dd-bfa3-e3c60c8172e8",
        uiAttribs: {
            title: "HoverCSS",
            translate: {
                x: -120,
                y: -920
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "c627dbcb-64c9-43dd-bfa3-e3c60c8172e8",
                objOut: "dc952fb6-371d-4f5e-82ef-ee139b84af66"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "c627dbcb-64c9-43dd-bfa3-e3c60c8172e8",
                objOut: "dc952fb6-371d-4f5e-82ef-ee139b84af66"
            }]
        }],
        portsOut: []
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "3cd4413f-94f2-4a67-af0b-9a7575c0602c",
        uiAttribs: {
            title: "HoverCSS",
            translate: {
                x: 24,
                y: -920
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "3cd4413f-94f2-4a67-af0b-9a7575c0602c",
                objOut: "cabe0e63-fe97-47f3-9844-d196ca989b94"
            }]
        }, {
            name: "Classname",
            value: "hover"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "Hover",
                objIn: "3cd4413f-94f2-4a67-af0b-9a7575c0602c",
                objOut: "cabe0e63-fe97-47f3-9844-d196ca989b94"
            }]
        }],
        portsOut: []
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "a2f56e47-2689-4a69-a12e-afcf4984ac6e",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: -396,
                y: -880
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "a2f56e47-2689-4a69-a12e-afcf4984ac6e",
                objOut: "9013da5d-4e76-4ddc-a78e-cb3dd272d110"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "a2f56e47-2689-4a69-a12e-afcf4984ac6e",
                objOut: "5f730903-c432-4fb7-909d-750e6a7f0dfb"
            }]
        }],
        portsOut: []
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "5f730903-c432-4fb7-909d-750e6a7f0dfb",
        uiAttribs: {
            translate: {
                x: -396,
                y: -840
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "5f730903-c432-4fb7-909d-750e6a7f0dfb",
                objOut: "d819fe66-bf71-4759-8df4-67d8bb4e45c1"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "5f730903-c432-4fb7-909d-750e6a7f0dfb",
                objOut: "d819fe66-bf71-4759-8df4-67d8bb4e45c1"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "d0abd6ba-1b06-4e42-8668-85eead1d83d3",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: -252,
                y: -880
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "d0abd6ba-1b06-4e42-8668-85eead1d83d3",
                objOut: "0dfc01b9-eea8-4f78-ae7f-93194802464e"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "d0abd6ba-1b06-4e42-8668-85eead1d83d3",
                objOut: "60fefca3-75aa-4fbb-bda7-410295e2606d"
            }]
        }],
        portsOut: []
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "60fefca3-75aa-4fbb-bda7-410295e2606d",
        uiAttribs: {
            translate: {
                x: -252,
                y: -840
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "60fefca3-75aa-4fbb-bda7-410295e2606d",
                objOut: "67d83939-7ad2-4b5c-9949-025c94102d29"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "60fefca3-75aa-4fbb-bda7-410295e2606d",
                objOut: "67d83939-7ad2-4b5c-9949-025c94102d29"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "341eda44-419d-44a7-8f19-dfd4f1997567",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: -108,
                y: -880
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "341eda44-419d-44a7-8f19-dfd4f1997567",
                objOut: "dc952fb6-371d-4f5e-82ef-ee139b84af66"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "341eda44-419d-44a7-8f19-dfd4f1997567",
                objOut: "70b0277f-8c25-468e-abb2-57733fd32797"
            }]
        }],
        portsOut: []
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "70b0277f-8c25-468e-abb2-57733fd32797",
        uiAttribs: {
            translate: {
                x: -108,
                y: -840
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "70b0277f-8c25-468e-abb2-57733fd32797",
                objOut: "7ffd03dd-4f93-49f6-8cc3-909c431151db"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "70b0277f-8c25-468e-abb2-57733fd32797",
                objOut: "7ffd03dd-4f93-49f6-8cc3-909c431151db"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "6dd90fb9-7f28-427f-acd8-589f21a906bb",
        objName: "Ops.Html.ToggleClass",
        id: "5fad3b64-9402-4fcd-b32e-0d4b07379b65",
        uiAttribs: {
            title: "ClickedCSS",
            translate: {
                x: 36,
                y: -880
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "HTML Element",
            links: [{
                portIn: "HTML Element",
                portOut: "DOM Element",
                objIn: "5fad3b64-9402-4fcd-b32e-0d4b07379b65",
                objOut: "cabe0e63-fe97-47f3-9844-d196ca989b94"
            }]
        }, {
            name: "Classname",
            value: "clicked"
        }, {
            name: "Active",
            links: [{
                portIn: "Active",
                portOut: "result",
                objIn: "5fad3b64-9402-4fcd-b32e-0d4b07379b65",
                objOut: "0f07135e-35f0-42e3-8539-24737461da11"
            }]
        }],
        portsOut: []
    }, {
        opId: "712a25f4-3a93-4042-b8c5-2f56169186cc",
        objName: "Ops.Boolean.ToggleBool",
        id: "0f07135e-35f0-42e3-8539-24737461da11",
        uiAttribs: {
            translate: {
                x: 36,
                y: -840
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "trigger",
            links: [{
                portIn: "trigger",
                portOut: "Mouse Down",
                objIn: "0f07135e-35f0-42e3-8539-24737461da11",
                objOut: "8e20d05f-05f5-40fc-8686-11dfb6d657df"
            }]
        }, {
            name: "reset",
            links: [{
                portIn: "reset",
                portOut: "Mouse Up",
                objIn: "0f07135e-35f0-42e3-8539-24737461da11",
                objOut: "8e20d05f-05f5-40fc-8686-11dfb6d657df"
            }]
        }],
        portsOut: [{
            name: "result"
        }]
    }, {
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "72905cd6-9b5c-429c-a375-ec6765fd7cdd",
        uiAttribs: {
            translate: {
                x: -372,
                y: -760
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "72905cd6-9b5c-429c-a375-ec6765fd7cdd",
                objOut: "75bfea72-dd50-41bd-8641-a8fad13ad45c"
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
        id: "25cf9b02-43be-42a0-970c-8a5881d51eaf",
        uiAttribs: {
            translate: {
                x: -384,
                y: -800
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "25cf9b02-43be-42a0-970c-8a5881d51eaf",
                objOut: "9013da5d-4e76-4ddc-a78e-cb3dd272d110"
            }]
        }, {
            name: "method",
            value: "opacity"
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "25cf9b02-43be-42a0-970c-8a5881d51eaf",
                objOut: "72905cd6-9b5c-429c-a375-ec6765fd7cdd"
            }]
        }],
        portsOut: []
    }, {
        opId: "22523fae-a623-401d-b952-a57c26de4b4e",
        objName: "Ops.WebAudio.AudioAnalyzer",
        id: "75bfea72-dd50-41bd-8641-a8fad13ad45c",
        uiAttribs: {
            translate: {
                x: -396,
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
                objIn: "75bfea72-dd50-41bd-8641-a8fad13ad45c",
                objOut: "911dd833-0622-4d65-9ae0-9c75c0897631"
            }]
        }, {
            name: "Audio In",
            links: [{
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "75bfea72-dd50-41bd-8641-a8fad13ad45c",
                objOut: "6603e5c8-f3d7-4745-8394-12403c700a52"
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
        opId: "22523fae-a623-401d-b952-a57c26de4b4e",
        objName: "Ops.WebAudio.AudioAnalyzer",
        id: "f988aefa-2a64-4fb1-8027-daa9e9a21a85",
        uiAttribs: {
            translate: {
                x: -240,
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
                portOut: "Next",
                objIn: "f988aefa-2a64-4fb1-8027-daa9e9a21a85",
                objOut: "75bfea72-dd50-41bd-8641-a8fad13ad45c"
            }]
        }, {
            name: "Audio In",
            links: [{
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "f988aefa-2a64-4fb1-8027-daa9e9a21a85",
                objOut: "f6832acc-9ccb-4ad2-b18b-7147084b76c3"
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
        opId: "22523fae-a623-401d-b952-a57c26de4b4e",
        objName: "Ops.WebAudio.AudioAnalyzer",
        id: "adcc1b18-1ef6-4caf-8b6a-d5efa491f7d7",
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
                portOut: "Next",
                objIn: "adcc1b18-1ef6-4caf-8b6a-d5efa491f7d7",
                objOut: "f988aefa-2a64-4fb1-8027-daa9e9a21a85"
            }]
        }, {
            name: "Audio In",
            links: [{
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "adcc1b18-1ef6-4caf-8b6a-d5efa491f7d7",
                objOut: "f706e7e9-d0e1-44ff-938a-bf05203289fd"
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
        opId: "22523fae-a623-401d-b952-a57c26de4b4e",
        objName: "Ops.WebAudio.AudioAnalyzer",
        id: "bed4a75c-7a1f-4972-b1e5-e2ca55230ec7",
        uiAttribs: {
            translate: {
                x: 48,
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
                portOut: "Next",
                objIn: "bed4a75c-7a1f-4972-b1e5-e2ca55230ec7",
                objOut: "adcc1b18-1ef6-4caf-8b6a-d5efa491f7d7"
            }]
        }, {
            name: "Audio In",
            links: [{
                portIn: "Audio In",
                portOut: "Audio Out",
                objIn: "bed4a75c-7a1f-4972-b1e5-e2ca55230ec7",
                objOut: "3e6d61c1-cd71-4621-b6bf-f28b32902c2b"
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
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "da36c064-1fda-41e7-a847-b60579460821",
        uiAttribs: {
            translate: {
                x: -216,
                y: -760
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "da36c064-1fda-41e7-a847-b60579460821",
                objOut: "f988aefa-2a64-4fb1-8027-daa9e9a21a85"
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
        id: "79beaa25-83f8-4592-a95d-3e6a7fe77902",
        uiAttribs: {
            translate: {
                x: -228,
                y: -800
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "79beaa25-83f8-4592-a95d-3e6a7fe77902",
                objOut: "0dfc01b9-eea8-4f78-ae7f-93194802464e"
            }]
        }, {
            name: "method",
            value: "opacity"
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "79beaa25-83f8-4592-a95d-3e6a7fe77902",
                objOut: "da36c064-1fda-41e7-a847-b60579460821"
            }]
        }],
        portsOut: []
    }, {
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "c9f0519b-347e-4fd7-b212-b054588190c9",
        uiAttribs: {
            translate: {
                x: -72,
                y: -760
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "c9f0519b-347e-4fd7-b212-b054588190c9",
                objOut: "adcc1b18-1ef6-4caf-8b6a-d5efa491f7d7"
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
        id: "6982a44e-4ae8-4057-a953-621140c45b1e",
        uiAttribs: {
            translate: {
                x: -84,
                y: -800
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "6982a44e-4ae8-4057-a953-621140c45b1e",
                objOut: "dc952fb6-371d-4f5e-82ef-ee139b84af66"
            }]
        }, {
            name: "method",
            value: "opacity"
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "6982a44e-4ae8-4057-a953-621140c45b1e",
                objOut: "c9f0519b-347e-4fd7-b212-b054588190c9"
            }]
        }],
        portsOut: []
    }, {
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "15494c06-9c58-43a5-883c-e761393933f8",
        uiAttribs: {
            translate: {
                x: 72,
                y: -760
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "15494c06-9c58-43a5-883c-e761393933f8",
                objOut: "bed4a75c-7a1f-4972-b1e5-e2ca55230ec7"
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
        id: "cbbf58db-f65b-4536-a91a-aaaf28756bff",
        uiAttribs: {
            translate: {
                x: 60,
                y: -800
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "cbbf58db-f65b-4536-a91a-aaaf28756bff",
                objOut: "cabe0e63-fe97-47f3-9844-d196ca989b94"
            }]
        }, {
            name: "method",
            value: "opacity"
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "cbbf58db-f65b-4536-a91a-aaaf28756bff",
                objOut: "15494c06-9c58-43a5-883c-e761393933f8"
            }]
        }],
        portsOut: []
    }, {
        opId: "db36db6d-83e4-4d27-b84c-8a20067aaffc",
        objName: "Ops.Html.DivElement_v2",
        id: "344c222e-4a70-4a43-8e7d-5bb1b6790bb4",
        uiAttribs: {
            translate: {
                x: 192,
                y: -840
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Id",
            value: ""
        }, {
            name: "Class",
            value: "kevin"
        }, {
            name: "Text",
            value: "KaNYe luvs Kevy"
        }, {
            name: "Style",
            value: "position:fixed;z-index:9999;"
        }, {
            name: "Interactive",
            value: !1
        }, {
            name: "Visible",
            value: !0
        }, {
            name: "Convert Line Breaks",
            value: !1
        }],
        portsOut: [{
            name: "DOM Element"
        }, {
            name: "Hover",
            value: 0
        }, {
            name: "Clicked",
            value: 0
        }]
    }, {
        opId: "2617b407-60a0-4ff6-b4a7-18136cfa7817",
        objName: "Ops.Math.MapRange",
        id: "97b404f8-fbb8-42ca-b385-d2979e10f2ee",
        uiAttribs: {
            translate: {
                x: 204,
                y: -760
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "value",
            links: [{
                portIn: "value",
                portOut: "average volume",
                objIn: "97b404f8-fbb8-42ca-b385-d2979e10f2ee",
                objOut: "bed4a75c-7a1f-4972-b1e5-e2ca55230ec7"
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
        id: "84c9f67f-0de3-495e-805d-d36e44eabad8",
        uiAttribs: {
            translate: {
                x: 192,
                y: -800
            },
            subPatch: 0,
            notWorkingMsg: null
        },
        portsIn: [{
            name: "Element",
            links: [{
                portIn: "Element",
                portOut: "DOM Element",
                objIn: "84c9f67f-0de3-495e-805d-d36e44eabad8",
                objOut: "344c222e-4a70-4a43-8e7d-5bb1b6790bb4"
            }]
        }, {
            name: "method",
            value: "opacity"
        }, {
            name: "Value",
            links: [{
                portIn: "Value",
                portOut: "result",
                objIn: "84c9f67f-0de3-495e-805d-d36e44eabad8",
                objOut: "97b404f8-fbb8-42ca-b385-d2979e10f2ee"
            }]
        }],
        portsOut: []
    }],
    users: [],
    userOps: [],
    tags: [],
    _id: "5d950056da5ef11566a2b284",
    name: "bg",
    userId: "5d7fcdd100a8de4b710cd6b5",
    created: "2019-10-02T19:53:58.024Z",
    updated: "2019-10-03T16:40:01.928Z",
    __v: 9,
    shortId: "48l2eS",
    opsHash: "6d5a045d2c8fd61d19bf3270448bf7dc1d5736b8",
    ui: {
        viewBox: {
            x: -810.4276311692408,
            y: -1214.7144874498754,
            w: 1789.4174890499098,
            h: 1490.6248299641506
        },
        timeLineLength: 20,
        bookmarks: [],
        subPatchViewBoxes: [],
        renderer: {
            w: 640,
            h: 360,
            s: 1
        }
    },
    updatedByUser: "L6n",
    cachedUsername: "L6n",
    views: 2,
    cachedNumComments: 0,
    cachedNumFavs: 0,
    statsAdmin: {
        filenameScreenshots: ["_screenshots/screenshot.png", "_screenshots/screenshot_1570060408785.png", "_screenshots/screenshot_1570063083810.png", "_screenshots/screenshot_1570065111108.png", "_screenshots/screenshot_1570065304770.png", "_screenshots/screenshot_1570116972995.png", "_screenshots/screenshot_1570118645536.png", "_screenshots/screenshot_1570118871691.png", "_screenshots/screenshot_1570120802419.png"],
        filenameExports: ["_exports/cables_bg1.zip"],
        filenameAssets: ["Raleway-Medium.ttf"],
        hasOldScreenshots: !1,
        hasOldExports: !1,
        sizeScreenshots: 13.314453125,
        sizeExports: 136.17578125,
        sizeAssets: 169.94921875
    },
    exports: 2
}, (CABLES = CABLES || {}).OPS = CABLES.OPS || {};
var Ops = Ops || {};
Ops.Gl = Ops.Gl || {}, Ops.User = Ops.User || {}, Ops.Time = Ops.Time || {}, Ops.Math = Ops.Math || {}, Ops.Anim = Ops.Anim || {}, Ops.Html = Ops.Html || {}, Ops.Array = Ops.Array || {}, Ops.Value = Ops.Value || {}, Ops.String = Ops.String || {}, Ops.Trigger = Ops.Trigger || {}, Ops.Boolean = Ops.Boolean || {}, Ops.WebAudio = Ops.WebAudio || {}, Ops.User.l6n = Ops.User.l6n || {}, Ops.Gl.Meshes = Ops.Gl.Meshes || {}, Ops.Gl.Shader = Ops.Gl.Shader || {}, Ops.Gl.Matrix = Ops.Gl.Matrix || {}, Ops.Deprecated = Ops.Deprecated || {}, Ops.Deprecated.Array = Ops.Deprecated.Array || {}, Ops.Gl.Meshes.PointCloudFromArray = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = t.inTrigger("exe"),
        n = t.inArray("Array"),
        a = t.inValueInt("Num Points"),
        i = t.outTrigger("Trigger out"),
        r = t.outObject("Geometry"),
        s = t.inValueBool("Scramble Texcoords", !0),
        o = t.inValue("Seed"),
        l = t.inArray("Vertex Colors"),
        u = t.patch.cgl;
    s.onChange = function () {
        s.get() ? o.setUiAttribs({
            hidePort: !1,
            greyout: !1
        }) : o.setUiAttribs({
            hidePort: !0,
            greyout: !0
        });
        g = !0
    }, o.onChange = n.onChange = function () {
        g = !0
    }, a.onChange = m, t.toWorkPortsNeedToBeLinked(n, e);
    var h = !1,
        c = !1;
    e.onTriggered = function () {
        if (i.trigger(), CABLES.UI) {
            var e = u.getShader();
            if (e && e.glPrimitive != u.gl.POINTS) return void(h || (t.uiAttr({
                warning: "using a Material not made for point rendering. maybe use pointMaterial."
            }), h = !0));
            h && (t.uiAttr({
                warning: null
            }), h = !1)
        }!g && d || function () {
            var e = n.get();
            if (!e || 0 == e.length) return void(d = null);
            c && (c = !1, t.uiAttr({
                error: null
            }));
            if (e.length % 3 == 0 == !1) return void(c || (t.uiAttr({
                error: "Array length not divisible by 3!"
            }), c = !0));
            f.clear();
            var a = e.length / 3;
            a = Math.abs(Math.floor(a)), p && p.length == 2 * a || (p.length = 2 * a);
            var i = !1,
                h = s.get();
            Math.randomSeed = o.get();
            for (var b = 0; b < a; b++) f.vertices[3 * b] == e[3 * b] && f.vertices[3 * b + 1] == e[3 * b + 1] && f.vertices[3 * b + 2] == e[3 * b + 2] || (h ? (p[2 * b] = Math.seededRandom(), p[2 * b + 1] = Math.seededRandom()) : (p[2 * b] = b / a, p[2 * b + 1] = b / a), i = !0);
            if (l.get()) {
                if (!c && l.get().length != 4 * a) return t.uiAttr({
                    error: "Color array does not have the correct length! (should be " + 4 * a + ")"
                }), c = !0, void(d = null);
                f.vertexColors = l.get()
            } else f.vertexColors = [];
            i && (f.setPointVertices(e), f.setTexCoords(p), f.verticesIndices = [], d && d.dispose(), (d = new CGL.Mesh(u, f, u.gl.POINTS)).addVertexNumbers = !0, d.setGeom(f), r.set(f));
            m(), g = !1
        }();
        d && d.render(u.getShader())
    };
    var d = null;
    const f = new CGL.Geometry("pointcloudfromarray");
    var p = [],
        g = !0;

    function m() {
        d && (d.setNumVertices(Math.min(f.vertices.length / 3, a.get())), 0 == a.get() && d.setNumVertices(f.vertices.length / 3))
    }
}, Ops.Gl.Meshes.PointCloudFromArray.prototype = new CABLES.Op, CABLES.OPS["0a6d9c6f-6459-45ca-88ad-268a1f7304db"] = {
    f: Ops.Gl.Meshes.PointCloudFromArray,
    objName: "Ops.Gl.Meshes.PointCloudFromArray"
}, Ops.Array.ArrayPack3 = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = t.inTrigger("Trigger in"),
        n = t.inArray("Array 1"),
        a = t.inArray("Array 2"),
        i = t.inArray("Array 3"),
        r = t.outTrigger("Trigger out"),
        s = t.outArray("Array out"),
        o = t.outValue("Num Points"),
        l = t.outNumber("Array length");
    var u = !1,
        h = [],
        c = [];
    e.onTriggered = function () {
        var e = n.get(),
            d = a.get(),
            f = i.get();
        if (!e && !d && !f) return s.set(null), void o.set(0);
        var p = 0;
        if (!e || !d || !f) {
            if (e ? p = e.length : d ? p = d.length : f && (p = f.length), c.length != p)
                for (var g = 0; g < p; g++) c[g] = 0;
            e || (e = c), d || (d = c), f || (f = c)
        }
        if (e.length !== d.length || d.length !== f.length) return void(u || (t.uiAttr({
            error: "Arrays do not have the same length !"
        }), o.set(0), u = !0));
        u && (u = !1, t.uiAttr({
            error: null
        }));
        h.length = e.length;
        for (var g = 0; g < e.length; g++) h[3 * g + 0] = e[g], h[3 * g + 1] = d[g], h[3 * g + 2] = f[g];
        s.set(null), s.set(h), o.set(h.length / 3), l.set(h.length), r.trigger()
    }
}, Ops.Array.ArrayPack3.prototype = new CABLES.Op, CABLES.OPS["2bcf32fe-3cbd-48fd-825a-61255bebda9b"] = {
    f: Ops.Array.ArrayPack3,
    objName: "Ops.Array.ArrayPack3"
}, Ops.Anim.Smooth = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = t.inTrigger("Update"),
        n = t.inBool("Separate inc/dec", !1),
        a = t.inValue("Value"),
        i = t.outTrigger("Next"),
        r = t.inValue("Inc factor", 4),
        s = t.inValue("Dec factor", 4),
        o = t.outValue("Result", 0);
    var l, u, h = 0,
        c = 0,
        d = 0,
        f = 0;
    t.toWorkPortsNeedToBeLinked(e);
    var p = 4,
        g = 0;
    const m = 0,
        b = 1;

    function _() {
        var t = n.get();
        !1 === t ? g = m : !0 === t && (g = b), g == m ? (s.setUiAttribs({
            greyout: !0
        }), r.setUiAttribs({
            title: "Inc/Dec factor"
        })) : g == b && (s.setUiAttribs({
            greyout: !1
        }), r.setUiAttribs({
            title: "Inc factor"
        })), v(), O()
    }

    function v() {
        g == m ? (l = r.get(), u = r.get()) : g == b && (l = r.get(), u = s.get()), (l <= .2 || l != l) && (l = .2), (u <= .2 || u != u) && (u = .2)
    }

    function O() {
        var t = 1;
        CABLES.now() - f > 500 || 0 === f ? h = a.get() : t = (CABLES.now() - f) / 16, f = CABLES.now(), p <= 0 && (p = 1e-4);
        var e = c - h;
        (h += e >= 0 ? e / (u * t) : e / (l * t)) > 0 && h < 1e-9 && (h = 0), p != p && (h = 0), h == h && h != -1 / 0 && h != 1 / 0 || (h = a.get()), d != h && (o.set(h), d = h), i.trigger()
    }
    _(), v(), n.setUiAttribs({
        hidePort: !0
    }), r.onChange = s.onChange = v, n.onChange = _, O(), a.onChange = function () {
        c = a.get()
    }, r.onChange = function () {
        v()
    }, e.onTriggered = function () {
        O()
    }
}, Ops.Anim.Smooth.prototype = new CABLES.Op, CABLES.OPS["5677b5b5-753a-4fbf-9e91-64c81ec68a2f"] = {
    f: Ops.Anim.Smooth,
    objName: "Ops.Anim.Smooth"
}, Ops.Array.ArraySin = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = t.inArray("array in"),
        n = t.inValueSelect("Math function", ["Sin", "Cos"], "Sin"),
        a = t.outArray("Array result"),
        i = t.inValue("Phase", 0),
        r = t.inValue("Frequency", 1),
        s = t.inValue("Amplitude", 1);
    var o = [],
        l = 0;
    const u = 0,
        h = 1;

    function c() {
        var t = e.get();
        if (t) {
            o.length = t.length;
            var n = s.get(),
                c = r.get(),
                d = i.get(),
                f = 0;
            if (l === u)
                for (f = 0; f < t.length; f++) o[f] = n * Math.sin(t[f] * c + d);
            else if (l === h)
                for (f = 0; f < t.length; f++) o[f] = n * Math.cos(t[f] * c + d);
            a.set(null), a.set(o)
        } else o.length = 0
    }
    e.onChange = c, r.onChange = c, s.onChange = c, i.onChange = c, n.onChange = function () {
        var t = n.get();
        "Sin" === t ? l = u : "Cos" === t && (l = h);
        c()
    }
}, Ops.Array.ArraySin.prototype = new CABLES.Op, CABLES.OPS["ded44bae-a24e-48c5-9585-4cb31f331ab6"] = {
    f: Ops.Array.ArraySin,
    objName: "Ops.Array.ArraySin"
}, Ops.Array.ArrayMathArray = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = t.inArray("array 0"),
        n = t.inArray("array 1"),
        a = t.inSwitch("Math function", ["+", "-", "*", "/", "%", "min", "max"], "+"),
        i = t.outArray("Array result"),
        r = t.outNumber("Array length");
    var s = !1,
        o = [],
        l = 0;
    t.toWorkPortsNeedToBeLinked(n, e);
    const u = 0,
        h = 1,
        c = 2,
        d = 3,
        f = 4,
        p = 5,
        g = 6;

    function m() {
        var a = e.get(),
            m = n.get();
        if (o.length = 0, a && m)
            if (a.length === m.length) {
                s && (s = !1, t.uiAttr({
                    error: null
                })), o.length = a.length;
                var b = 0;
                if (l === u)
                    for (b = 0; b < a.length; b++) o[b] = a[b] + m[b];
                else if (l === h)
                    for (b = 0; b < a.length; b++) o[b] = a[b] - m[b];
                else if (l === c)
                    for (b = 0; b < a.length; b++) o[b] = a[b] * m[b];
                else if (l === d)
                    for (b = 0; b < a.length; b++) o[b] = a[b] / m[b];
                else if (l === f)
                    for (b = 0; b < a.length; b++) o[b] = a[b] % m[b];
                else if (l === p)
                    for (b = 0; b < a.length; b++) o[b] = Math.min(a[b], m[b]);
                else if (l === g)
                    for (b = 0; b < a.length; b++) o[b] = Math.max(a[b], m[b]);
                i.set(null), r.set(o.length), i.set(o)
            } else s || (t.uiAttr({
                error: "Arrays do not have the same length !"
            }), s = !0);
        else r.set(0)
    }
    a.onChange = function () {
        var e = a.get();
        "+" === e ? l = u : "-" === e ? l = h : "*" === e ? l = c : "/" === e ? l = d : "%" === e ? l = f : "min" === e ? l = p : "max" === e && (l = g);
        m(), t.setUiAttrib({
            extendTitle: e
        })
    }, e.onChange = m, n.onChange = m, m()
}, Ops.Array.ArrayMathArray.prototype = new CABLES.Op, CABLES.OPS["f31a1764-ce14-41de-9b3f-dc2fe249bb52"] = {
    f: Ops.Array.ArrayMathArray,
    objName: "Ops.Array.ArrayMathArray"
}, Ops.Gl.Shader.PointMaterial = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = "\n{{MODULES_HEAD}}\n\nIN vec2 texCoord;\n#ifdef HAS_TEXTURES\n\n   #ifdef HAS_TEXTURE_DIFFUSE\n       UNI sampler2D diffTex;\n   #endif\n   #ifdef HAS_TEXTURE_MASK\n       UNI sampler2D texMask;\n   #endif\n#endif\nUNI float r;\nUNI float g;\nUNI float b;\nUNI float a;\n\n#ifdef VERTEX_COLORS\n    IN vec3 vertexColor;\n#endif\n\nvoid main()\n{\n    {{MODULE_BEGIN_FRAG}}\n\n    vec4 col=vec4(r,g,b,a);\n\n    #ifdef HAS_TEXTURES\n\n        #ifdef HAS_TEXTURE_MASK\n            float mask=texture(texMask,vec2(gl_PointCoord.x,(1.0-gl_PointCoord.y))).r;\n        #endif\n\n        #ifdef HAS_TEXTURE_DIFFUSE\n\n            #ifdef LOOKUP_TEXTURE\n                col=texture(diffTex,texCoord);\n            #endif\n            #ifndef LOOKUP_TEXTURE\n                col=texture(diffTex,vec2(gl_PointCoord.x,(1.0-gl_PointCoord.y)));\n            #endif\n\n            #ifdef COLORIZE_TEXTURE\n              col.r*=r;\n              col.g*=g;\n              col.b*=b;\n            #endif\n        #endif\n        col.a*=a;\n    #endif\n\n    {{MODULE_COLOR}}\n\n    #ifdef MAKE_ROUND\n        if ((gl_PointCoord.x-0.5)*(gl_PointCoord.x-0.5) + (gl_PointCoord.y-0.5)*(gl_PointCoord.y-0.5) > 0.25) discard; //col.a=0.0;\n    #endif\n\n    #ifdef VERTEX_COLORS\n        col.rgb*=vertexColor;\n    #endif\n\n\n    #ifdef HAS_TEXTURE_MASK\n        col.a=mask;\n    #endif\n\n\n    // #ifdef RANDOMIZE_COLOR\n        // col.rgb*=fract(sin(dot(texCoord.xy ,vec2(12.9898,78.233))) * 43758.5453);\n    // #endif\n\n\n\n    outColor = col;\n}\n",
        n = "{{MODULES_HEAD}}\nIN vec3 vPosition;\nIN vec2 attrTexCoord;\nIN vec3 attrVertNormal;\n   IN vec3 attrTangent;\n   IN vec3 attrBiTangent;\n\n#ifdef VERTEX_COLORS\n    IN vec3 attrVertColor;\n    OUT vec3 vertexColor;\n#endif\n\nOUT vec3 norm;\n#ifdef HAS_TEXTURES\n    OUT vec2 texCoord;\n#endif\n\nUNI mat4 projMatrix;\nUNI mat4 modelMatrix;\nUNI mat4 viewMatrix;\n\nUNI float pointSize;\nUNI vec3 camPos;\n\nUNI float canvasWidth;\nUNI float canvasHeight;\nUNI float camDistMul;\n\nUNI float randomSize;\n\nIN float attrVertIndex;\n\n\nfloat rand(float n){return fract(sin(n) * 43758.5453123);}\n\n#define POINTMATERIAL\n\nvoid main()\n{\n    float psMul=sqrt(canvasWidth/canvasHeight)+0.00000000001;\n    float sizeMultiply=1.0;\n\n    vec3 tangent=attrTangent;\n    vec3 bitangent=attrBiTangent;\n\n\n    #ifdef VERTEX_COLORS\n        vertexColor=attrVertColor;\n    #endif\n\n    #ifdef HAS_TEXTURES\n        texCoord=attrTexCoord;\n    #endif\n\n    mat4 mMatrix=modelMatrix;\n\n    vec4 pos = vec4( vPosition, 1. );\n\n    {{MODULE_VERTEX_POSITION}}\n\n    vec4 model=mMatrix * pos;\n\n    psMul+=rand(attrVertIndex)*randomSize;\n\n    psMul*=sizeMultiply;\n\n    #ifndef SCALE_BY_DISTANCE\n        gl_PointSize = pointSize * psMul;\n    #endif\n    #ifdef SCALE_BY_DISTANCE\n        float cameraDist = distance(model.xyz, camPos);\n        gl_PointSize = (pointSize / cameraDist) * psMul;\n    #endif\n\n    gl_Position = projMatrix * viewMatrix * model;\n}\n",
        a = t.patch.cgl,
        i = t.inTrigger("render"),
        r = t.inValueFloat("PointSize", 3),
        s = t.inValue("Random Size", 3),
        o = t.inValueBool("Round", !0),
        l = t.inValueBool("Scale by Distance", !1),
        u = t.inValueSlider("r", Math.random()),
        h = t.inValueSlider("g", Math.random()),
        c = t.inValueSlider("b", Math.random()),
        d = t.inValueSlider("a", 1),
        f = t.inValueBool("preMultiplied alpha"),
        p = t.inBool("Vertex Colors", !1),
        g = t.inTexture("texture"),
        m = t.inTexture("Texture Mask"),
        b = t.inValueBool("colorizeTexture", !1),
        _ = t.inValueBool("texture Lookup", !1),
        v = t.outTrigger("trigger"),
        O = t.outObject("shader");
    t.setPortGroup("Texture", [_, m, g, b]), t.setPortGroup("Color", [u, h, c, d, f, p]), t.setPortGroup("Size", [r, s, o, l]), u.setUiAttribs({
        colorPick: !0
    });
    const I = new CGL.Shader(a, "PointMaterial");
    I.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG"]), I.define("MAKE_ROUND");
    new CGL.Uniform(I, "f", "pointSize", r), new CGL.Uniform(I, "f", "randomSize", s), new CGL.Uniform(I, "f", "r", u), new CGL.Uniform(I, "f", "g", h), new CGL.Uniform(I, "f", "b", c), new CGL.Uniform(I, "f", "a", d);
    const A = new CGL.Uniform(I, "f", "canvasWidth", a.canvasWidth),
        E = new CGL.Uniform(I, "f", "canvasHeight", a.canvasHeight);
    O.set(I), I.setSource(n, e), I.glPrimitive = a.gl.POINTS, I.bindTextures = x, O.ignoreValueSerialize = !0, i.onTriggered = S;
    var M = null,
        y = null;

    function x() {
        g.get() && a.setTexture(0, g.get().tex), m.get() && a.setTexture(1, m.get().tex)
    }

    function S() {
        A.setValue(a.canvasWidth), E.setValue(a.canvasHeight), a.setShader(I), x(), f.get() && a.gl.blendFunc(a.gl.ONE, a.gl.ONE_MINUS_SRC_ALPHA), v.trigger(), f.get() && a.gl.blendFunc(a.gl.SRC_ALPHA, a.gl.ONE_MINUS_SRC_ALPHA), a.setPreviousShader()
    }
    t.preRender = function () {
        I && I.bind(), S()
    }, l.onChange = function () {
        I.toggleDefine("SCALE_BY_DISTANCE", l.get())
    }, o.onChange = function () {
        I.toggleDefine("MAKE_ROUND", o.get())
    }, b.onChange = function () {
        I.toggleDefine("COLORIZE_TEXTURE", b.get())
    }, _.onChange = function () {
        I.toggleDefine("LOOKUP_TEXTURE", _.get())
    }, p.onChange = function () {
        I.toggleDefine("VERTEX_COLORS", p.get())
    }, g.onChange = function () {
        if (g.get()) {
            if (null !== M) return;
            I.removeUniform("diffTex"), I.define("HAS_TEXTURE_DIFFUSE"), M = new CGL.Uniform(I, "t", "diffTex", 0)
        } else I.removeUniform("diffTex"), I.removeDefine("HAS_TEXTURE_DIFFUSE"), M = null
    }, m.onChange = function () {
        if (m.get()) {
            if (null !== y) return;
            I.removeUniform("texMask"), I.define("HAS_TEXTURE_MASK"), y = new CGL.Uniform(I, "t", "texMask", 1)
        } else I.removeUniform("texMask"), I.removeDefine("HAS_TEXTURE_MASK"), y = null
    }
}, Ops.Gl.Shader.PointMaterial.prototype = new CABLES.Op, CABLES.OPS["f86a4a07-00ee-4f68-8839-e02d51d1cd2f"] = {
    f: Ops.Gl.Shader.PointMaterial,
    objName: "Ops.Gl.Shader.PointMaterial"
}, Ops.Array.ArrayMultiply = function () {
    CABLES.Op.apply(this, arguments);
    var t = this.inArray("In"),
        e = this.inValue("Value", 1),
        n = this.outArray("Result"),
        a = [];
    n.set(a), t.onChange = e.onChange = t.onChange = function () {
        var i = t.get();
        if (i) {
            var r = e.get();
            a.length != i.length && (a.length = i.length);
            for (var s = 0; s < i.length; s++) a[s] = i[s] * r;
            n.set(null), n.set(a)
        }
    }
}, Ops.Array.ArrayMultiply.prototype = new CABLES.Op, CABLES.OPS["a01c344b-4129-4b01-9c8f-36cefe86d7cc"] = {
    f: Ops.Array.ArrayMultiply,
    objName: "Ops.Array.ArrayMultiply"
}, Ops.Array.ArraySum = function () {
    CABLES.Op.apply(this, arguments);
    var t = this.inArray("In"),
        e = this.inValue("Value", 1),
        n = this.outArray("Result"),
        a = [];
    n.set(a), e.onChange = t.onChange = function () {
        var i = t.get();
        if (i) {
            var r = e.get();
            a.length != i.length && (a.length = i.length);
            for (var s = 0; s < i.length; s++) a[s] = i[s] + r;
            n.set(null), n.set(a)
        }
    }
}, Ops.Array.ArraySum.prototype = new CABLES.Op, CABLES.OPS["c6b5bf63-0be8-4eea-acc0-9d32973e665a"] = {
    f: Ops.Array.ArraySum,
    objName: "Ops.Array.ArraySum"
}, Ops.Array.ArrayModulo = function () {
    CABLES.Op.apply(this, arguments);
    var t = this.inArray("Array In"),
        e = this.inValue("Value", 1),
        n = this.outArray("Array Out"),
        a = [];
    n.set(a), t.onChange = e.onChange = t.onChange = function () {
        var i = t.get();
        if (i) {
            var r = e.get();
            a.length != i.length && (a.length = i.length);
            var s = 0;
            for (s = 0; s < i.length; s++) a[s] = i[s] % r;
            n.set(null), n.set(a)
        }
    }
}, Ops.Array.ArrayModulo.prototype = new CABLES.Op, CABLES.OPS["30a5568b-31da-4504-9525-578ee404993c"] = {
    f: Ops.Array.ArrayModulo,
    objName: "Ops.Array.ArrayModulo"
}, Ops.Array.ArraySubtract = function () {
    CABLES.Op.apply(this, arguments);
    var t = this.inArray("Array In"),
        e = this.inValue("Value", 1),
        n = this.outArray("Array Out"),
        a = [];
    n.set(a), t.onChange = e.onChange = t.onChange = function () {
        var i = t.get();
        if (i) {
            var r = e.get();
            a.length != i.length && (a.length = i.length);
            var s = 0;
            for (s = 0; s < i.length; s++) a[s] = i[s] - r;
            n.set(null), n.set(a)
        }
    }
}, Ops.Array.ArraySubtract.prototype = new CABLES.Op, CABLES.OPS["af78ab59-75d5-4ead-9a8d-27a63e1cbf3f"] = {
    f: Ops.Array.ArraySubtract,
    objName: "Ops.Array.ArraySubtract"
}, Ops.Value.Number = function () {
    CABLES.Op.apply(this, arguments);
    const t = this.inValueFloat("value"),
        e = this.outValue("result");
    t.onChange = function () {
        e.set(parseFloat(t.get()))
    }
}, Ops.Value.Number.prototype = new CABLES.Op, CABLES.OPS["8fb2bb5d-665a-4d0a-8079-12710ae453be"] = {
    f: Ops.Value.Number,
    objName: "Ops.Value.Number"
}, Ops.Math.Divide = function () {
    CABLES.Op.apply(this, arguments);
    const t = this.inValueFloat("number1", 1),
        e = this.inValueFloat("number2", 1),
        n = this.outValue("result");

    function a() {
        n.set(t.get() / e.get())
    }
    t.onChange = e.onChange = a, a()
}, Ops.Math.Divide.prototype = new CABLES.Op, CABLES.OPS["86fcfd8c-038d-4b91-9820-a08114f6b7eb"] = {
    f: Ops.Math.Divide,
    objName: "Ops.Math.Divide"
}, Ops.Deprecated.Array.ContinuousNumberArray = function () {
    CABLES.Op.apply(this, arguments);
    var t = this.inValueInt("numValues"),
        e = this.addOutPort(new CABLES.Port(this, "values", CABLES.OP_PORT_TYPE_ARRAY));
    e.ignoreValueSerialize = !0, t.set(100), t.onChange = a;
    var n = [];

    function a() {
        n.length = Math.abs(Math.floor(t.get())) || 100;
        for (var a = 0; a < n.length; a++) n[a] = a;
        e.set(null), e.set(n)
    }
    a()
}, Ops.Deprecated.Array.ContinuousNumberArray.prototype = new CABLES.Op, CABLES.OPS["8b9cdeea-f94c-41dc-b743-627115289226"] = {
    f: Ops.Deprecated.Array.ContinuousNumberArray,
    objName: "Ops.Deprecated.Array.ContinuousNumberArray"
}, Ops.Math.MapRange = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = t.outValue("result");
    var n = t.inValueFloat("value"),
        a = t.inValueFloat("old min"),
        i = t.inValueFloat("old max"),
        r = t.inValueFloat("new min"),
        s = t.inValueFloat("new max"),
        o = t.inValueSelect("Easing", ["Linear", "Smoothstep", "Smootherstep"], "Linear");
    t.setPortGroup("Input Range", [a, i]), t.setPortGroup("Output Range", [r, s]);
    var l = 0,
        u = 0;

    function h() {
        if (n.get() >= Math.max(i.get(), a.get())) e.set(s.get());
        else if (n.get() <= Math.min(i.get(), a.get())) e.set(r.get());
        else {
            var t = r.get(),
                o = s.get(),
                h = a.get(),
                c = i.get(),
                d = n.get(),
                f = !1,
                p = Math.min(h, c),
                g = Math.max(h, c);
            p != h && (f = !0);
            var m = !1,
                b = Math.min(t, o),
                _ = Math.max(t, o);
            b != t && (m = !0);
            var v = 0;
            v = f ? (g - d) * (_ - b) / (g - p) : (d - p) * (_ - b) / (g - p), u = m ? _ - v : v + b, 0 === l ? e.set(u) : 1 == l ? (d = Math.max(0, Math.min(1, (u - t) / (o - t))), e.set(t + d * d * (3 - 2 * d) * (o - t))) : 2 == l && (d = Math.max(0, Math.min(1, (u - t) / (o - t))), e.set(t + d * d * d * (d * (6 * d - 15) + 10) * (o - t)))
        }
    }
    o.onChange = function () {
        l = "Smoothstep" == o.get() ? 1 : "Smootherstep" == o.get() ? 2 : 0
    }, n.set(0), a.set(0), i.set(1), r.set(-1), s.set(1), n.onChange = h, a.onChange = h, i.onChange = h, r.onChange = h, s.onChange = h, e.set(0), h()
}, Ops.Math.MapRange.prototype = new CABLES.Op, CABLES.OPS["2617b407-60a0-4ff6-b4a7-18136cfa7817"] = {
    f: Ops.Math.MapRange,
    objName: "Ops.Math.MapRange"
}, Ops.Gl.Matrix.Scale = function () {
    CABLES.Op.apply(this, arguments);
    const t = this.inTrigger("render"),
        e = this.inValueFloat("scale", 1),
        n = this.outTrigger("trigger"),
        a = this.patch.cgl,
        i = vec3.create();

    function r() {
        var t = e.get();
        vec3.set(i, t, t, t)
    }
    e.onChange = r, r(), t.onTriggered = function () {
        a.pushModelMatrix(), mat4.scale(a.mMatrix, a.mMatrix, i), n.trigger(), a.popModelMatrix()
    }
}, Ops.Gl.Matrix.Scale.prototype = new CABLES.Op, CABLES.OPS["50e7f565-0cdb-47ca-912b-87c04e2f00e3"] = {
    f: Ops.Gl.Matrix.Scale,
    objName: "Ops.Gl.Matrix.Scale"
}, Ops.Array.ArrayUnpack3 = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = t.inArray("Array in xyz"),
        n = t.outArray("Array 1 out"),
        a = t.outArray("Array 2 out"),
        i = t.outArray("Array 3 out"),
        r = t.outNumber("Array lengths");
    var s = !1;
    const o = [],
        l = [],
        u = [];
    e.onChange = function () {
        var h = e.get();
        if (!h) return void n.set(null);
        if (h.length % 3 != 0) return void(s || (t.uiAttr({
            error: "Arrays length not divisible by 3 !"
        }), r.set(0), s = !0));
        s && (s = !1, t.uiAttr({
            error: null
        }));
        o.length = Math.floor(h.length / 3), l.length = Math.floor(h.length / 3), u.length = Math.floor(h.length / 3);
        for (var c = 0; c < h.length / 3; c++) o[c] = h[3 * c], l[c] = h[3 * c + 1], u[c] = h[3 * c + 2];
        n.set(null), a.set(null), i.set(null), n.set(o), a.set(l), i.set(u), r.set(o.length)
    }
}, Ops.Array.ArrayUnpack3.prototype = new CABLES.Op, CABLES.OPS["fa671f66-6957-41e6-ac35-d615b7c29285"] = {
    f: Ops.Array.ArrayUnpack3,
    objName: "Ops.Array.ArrayUnpack3"
}, Ops.WebAudio.AudioAnalyzer = function () {
    CABLES.Op.apply(this, arguments);
    const t = this;
    var e = CABLES.WEBAUDIO.createAudioContext(t);
    const n = t.inSwitch("FFT size", [64, 128, 256, 512, 1024], 256),
        a = e.createAnalyser();
    a.smoothingTimeConstant = .3, a.fftSize = 256;
    const i = t.addInPort(new CABLES.Port(t, "refresh", CABLES.OP_PORT_TYPE_FUNCTION)),
        r = (CABLES.WEBAUDIO.createAudioInPort(t, "Audio In", a), t.inValueSelect("Data", ["Frequency", "Time Domain"], "Frequency")),
        s = t.outTrigger("Next"),
        o = (CABLES.WEBAUDIO.createAudioOutPort(t, "Audio Out", a), t.addOutPort(new CABLES.Port(t, "average volume", CABLES.OP_PORT_TYPE_VALUE))),
        l = t.addOutPort(new CABLES.Port(t, "fft", CABLES.OP_PORT_TYPE_ARRAY));
    var u = a.frequencyBinCount,
        h = new Uint8Array(u),
        c = !0;
    n.onChange = function () {
        a.fftSize = n.get()
    }, r.onChange = function () {
        "Frequency" == r.get() && (c = !0), "Time Domain" == r.get() && (c = !1)
    }, i.onTriggered = function () {
        if (a.minDecibels = -90, a.maxDecibels = 0, u != a.frequencyBinCount && (console.log("change!"), u = a.frequencyBinCount, h = new Uint8Array(u)), h) {
            for (var e = 0, n = 0; n < h.length; n++) e += h[n];
            var i = e / h.length;
            o.set(i / 128);
            try {
                c ? a.getByteFrequencyData(h) : a.getByteTimeDomainData(h)
            } catch (e) {
                t.log(e)
            }
            l.set(null), l.set(h), s.trigger()
        }
    }
}, Ops.WebAudio.AudioAnalyzer.prototype = new CABLES.Op, CABLES.OPS["22523fae-a623-401d-b952-a57c26de4b4e"] = {
    f: Ops.WebAudio.AudioAnalyzer,
    objName: "Ops.WebAudio.AudioAnalyzer"
}, Ops.WebAudio.Output = function () {
    CABLES.Op.apply(this, arguments);
    const t = this;
    t.requirements = [CABLES.Requirements.WEBAUDIO];
    var e = CABLES.WEBAUDIO.createAudioContext(t),
        n = 1,
        a = 0,
        i = 1,
        r = e.createGain(),
        s = e.destination;
    r.connect(s);
    var o = 1,
        l = (CABLES.WEBAUDIO.createAudioInPort(t, "Audio In", r), t.inValueSlider("Volume", n)),
        u = t.inValueBool("Mute", !1);

    function h() {
        var t = l.get() * o;
        t >= a && t <= i ? r.gain.setValueAtTime(t, e.currentTime) : r.gain.setValueAtTime(n * o, e.currentTime)
    }
    u.onChange = function () {
        u.get() ? r.gain.setValueAtTime(0, e.currentTime) : h()
    }, l.onChange = function () {
        u.get() || h()
    }, t.onMasterVolumeChanged = function (t) {
        o = t, h()
    }
}, Ops.WebAudio.Output.prototype = new CABLES.Op, CABLES.OPS["53fdbf4a-bc8d-4c5d-a698-f34fdeb53827"] = {
    f: Ops.WebAudio.Output,
    objName: "Ops.WebAudio.Output"
}, Ops.Sequence = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = [],
        n = [];

    function a() {
        for (var t = 0; t < n.length; t++) n[t].trigger()
    }
    t.inTrigger("exe").onTriggered = a;
    for (var i = 0; i < 16; i++)
        if (n.push(t.outTrigger("trigger " + i)), i < 15) {
            var r = t.inTrigger("exe " + i);
            r.onTriggered = a, e.push(r)
        }
}, Ops.Sequence.prototype = new CABLES.Op, CABLES.OPS["a466bc1f-06e9-4595-8849-bffb9fe22f99"] = {
    f: Ops.Sequence,
    objName: "Ops.Sequence"
}, Ops.Array.RandomNumbersArray3 = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = t.inValueInt("numValues", 100),
        n = t.inValueFloat("Min", -1),
        a = t.inValueFloat("Max", 1),
        i = t.inValueFloat("random seed"),
        r = t.inValueBool("Last == First"),
        s = t.inValueBool("Integer", !1),
        o = t.outArray("values"),
        l = t.outNumber("Total points"),
        u = t.outNumber("Array length");
    t.setPortGroup("Value Range", [n, a]), t.setPortGroup("", [i, r]), o.ignoreValueSerialize = !0, r.onChange = a.onChange = n.onChange = e.onChange = i.onChange = o.onLinkChanged = s.onChange = c;
    var h = [];

    function c() {
        Math.randomSeed = i.get();
        for (var t = s.get(), c = h.length = Math.floor(Math.abs(3 * e.get())), d = 0; d < c; d += 3) t ? (h[d + 0] = Math.floor(Math.seededRandom() * (a.get() - n.get()) + n.get()), h[d + 1] = Math.floor(Math.seededRandom() * (a.get() - n.get()) + n.get()), h[d + 2] = Math.floor(Math.seededRandom() * (a.get() - n.get()) + n.get())) : (h[d + 0] = Math.seededRandom() * (a.get() - n.get()) + n.get(), h[d + 1] = Math.seededRandom() * (a.get() - n.get()) + n.get(), h[d + 2] = Math.seededRandom() * (a.get() - n.get()) + n.get());
        r.get() && c > 3 && (h[c - 3 + 0] = h[0], h[c - 3 + 1] = h[1], h[c - 3 + 2] = h[2]), o.set(null), o.set(h), l.set(c / 3), u.set(c)
    }
    c()
}, Ops.Array.RandomNumbersArray3.prototype = new CABLES.Op, CABLES.OPS["7f981578-542e-417b-b304-8fbe41258772"] = {
    f: Ops.Array.RandomNumbersArray3,
    objName: "Ops.Array.RandomNumbersArray3"
}, Ops.Gl.Matrix.OrbitControls = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = t.inTrigger("render"),
        n = t.inValueFloat("min distance"),
        a = t.inValueFloat("max distance"),
        i = t.inValue("min rot y", 0),
        r = t.inValue("max rot y", 0),
        s = t.inValue("initial radius", 0),
        o = t.inValueSlider("initial axis y"),
        l = t.inValueSlider("initial axis x"),
        u = t.inValueFloat("mul"),
        h = t.inValueSlider("Smoothness", 1),
        c = t.inValue("Speed X", 1),
        d = t.inValue("Speed Y", 1),
        f = t.inValueBool("Active", !0),
        p = t.inValueBool("Allow Panning", !0),
        g = t.inValueBool("Allow Zooming", !0),
        m = t.inValueBool("Allow Rotation", !0),
        b = t.inValueBool("restricted", !0),
        _ = t.inValueBool("Pointerlock", !1),
        v = t.outTrigger("trigger"),
        O = t.outValue("radius"),
        I = t.outValue("Rot X"),
        A = t.outValue("Rot Y"),
        E = t.inTriggerButton("Reset");
    t.setPortGroup("Initial Values", [o, l, s]), t.setPortGroup("Interaction", [u, h, c, d]), t.setPortGroup("Boundaries", [i, r, n, a]), u.set(1), n.set(.05), a.set(99999), E.onTriggered = H;
    const M = t.patch.cgl;
    var y = vec3.create(),
        x = vec3.create(),
        S = vec3.create(),
        T = mat4.create(),
        P = (mat4.create(), vec3.create());
    vec3.create();
    o.set(.5);
    var R = !1,
        F = 5;
    O.set(F);
    var C = 0,
        N = 0,
        L = 0,
        D = 0;
    vec3.set(S, 0, 0, 0), vec3.set(x, 0, 1, 0);
    var k = vec3.create(),
        B = vec3.create(),
        w = vec3.create(),
        U = vec3.create(),
        j = 0,
        V = 0,
        z = 1,
        G = null;
    Y(), t.onDelete = lt;
    var W = !1;

    function H() {
        j %= 2 * Math.PI, V %= 2 * Math.PI, vec3.set(P, 0, 0, 0), vec3.set(S, 0, 0, 0), vec3.set(x, 0, 1, 0), L = l.get() * Math.PI * 2, D = o.get() - .5, F = s.get(), y = Q(D)
    }

    function Y() {
        z = 10 * h.get() + 1
    }
    _.onChange = function () {
        W = _.get(), console.log("doLockPointer", W)
    }, h.onChange = Y;
    var X = !0;

    function q(t, e) {
        return X ? e : t + (e - t) / z
    }
    var K = 0;

    function Q(t) {
        const e = u.get();
        F < n.get() * e && (F = n.get() * e), F > a.get() * e && (F = a.get() * e), O.set(F * e);
        var i, r = vec3.create();
        return i = 360 * t / 2 * CGL.DEG2RAD, vec3.set(r, Math.cos(i) * F * e, Math.sin(i) * F * e, 0), r
    }

    function Z(t) {
        if (R) {
            var e = t.clientX,
                n = t.clientY,
                a = e - C,
                i = n - N;
            W && (a = t.movementX * u.get(), i = t.movementY * u.get()), a *= c.get(), i *= d.get(), 3 == t.which && p.get() ? (P[2] += .01 * a * u.get(), P[1] += .01 * i * u.get()) : 2 == t.which && g.get() ? (F += .05 * i, y = Q(D)) : m.get() && (L += .003 * a, D += .002 * i, b.get() && (D > .5 && (D = .5), D < -.5 && (D = -.5))), C = e, N = n
        }
    }

    function J(e) {
        if (C = e.clientX, N = e.clientY, R = !0, W) {
            var n = t.patch.cgl.canvas;
            n.requestPointerLock = n.requestPointerLock || n.mozRequestPointerLock || n.webkitRequestPointerLock, n.requestPointerLock ? n.requestPointerLock() : console.log("no t found"), document.addEventListener("pointerlockchange", tt, !1), document.addEventListener("mozpointerlockchange", tt, !1), document.addEventListener("webkitpointerlockchange", tt, !1)
        }
    }

    function $() {
        R = !1, W && (document.removeEventListener("pointerlockchange", tt, !1), document.removeEventListener("mozpointerlockchange", tt, !1), document.removeEventListener("webkitpointerlockchange", tt, !1), document.exitPointerLock && document.exitPointerLock(), document.removeEventListener("mousemove", _, !1))
    }

    function tt() {
        var e = t.patch.cgl.canvas;
        document.pointerLockElement !== e && document.mozPointerLockElement !== e && document.webkitPointerLockElement !== e || (document.addEventListener("mousemove", Z, !1), console.log("listening..."))
    }

    function et(t) {}
    e.onTriggered = function () {
        M.pushViewMatrix(), j = q(j, L);
        var t = 180 * ((V = q(V, D)) + .5);
        0 !== i.get() && t < i.get() ? (t = i.get(), V = K) : 0 !== r.get() && t > r.get() ? (t = r.get(), V = K) : K = V;
        var e = j * CGL.RAD2DEG;
        A.set(t), I.set(e),
            function (t, e) {
                const i = u.get();
                F < n.get() * i && (F = n.get() * i);
                F > a.get() * i && (F = a.get() * i);
                O.set(F * i);
                var r = 0;
                r = 360 * e / 2 * CGL.DEG2RAD, vec3.set(t, Math.cos(r) * F * i, Math.sin(r) * F * i, 0)
            }(y, V), vec3.add(k, y, P), vec3.add(w, S, P), B[0] = q(B[0], k[0]), B[1] = q(B[1], k[1]), B[2] = q(B[2], k[2]), U[0] = q(U[0], w[0]), U[1] = q(U[1], w[1]), U[2] = q(U[2], w[2]);
        vec3.create();
        mat4.lookAt(T, B, U, x), mat4.rotate(T, T, j, x), mat4.multiply(M.vMatrix, M.vMatrix, T), v.trigger(), M.popViewMatrix(), X = !1
    }, s.onChange = function () {
        F = s.get(), H()
    }, l.onChange = function () {
        j = L = l.get() * Math.PI * 2
    }, o.onChange = function () {
        V = D = o.get() - .5, y = Q(D)
    };
    var nt, at = function (t) {
            if (g.get()) {
                var e = .06 * CGL.getWheelSpeed(t);
                F += 1.2 * parseFloat(e), y = Q(D), t.preventDefault()
            }
        },
        it = function (t) {
            W = !1, t.touches && t.touches.length > 0 && J(t.touches[0])
        },
        rt = function (t) {
            W = !1, $()
        },
        st = function (t) {
            W = !1, t.touches && t.touches.length > 0 && Z(t.touches[0])
        };

    function ot() {
        G.addEventListener("mousemove", Z), G.addEventListener("mousedown", J), G.addEventListener("mouseup", $), G.addEventListener("mouseleave", $), G.addEventListener("mouseenter", et), G.addEventListener("contextmenu", function (t) {
            t.preventDefault()
        }), G.addEventListener("wheel", at), G.addEventListener("touchmove", st), G.addEventListener("touchstart", it), G.addEventListener("touchend", rt)
    }

    function lt() {
        G && (G.removeEventListener("mousemove", Z), G.removeEventListener("mousedown", J), G.removeEventListener("mouseup", $), G.removeEventListener("mouseleave", $), G.removeEventListener("mouseenter", $), G.removeEventListener("wheel", at), G.removeEventListener("touchmove", st), G.removeEventListener("touchstart", it), G.removeEventListener("touchend", rt))
    }
    f.onChange = function () {
        f.get() ? ot() : lt()
    }, y = Q(0), nt = M.canvas, lt(), G = nt, ot(), ot(), l.set(.25), s.set(.05)
}, Ops.Gl.Matrix.OrbitControls.prototype = new CABLES.Op, CABLES.OPS["eaf4f7ce-08a3-4d1b-b9f4-ebc0b7b1cde1"] = {
    f: Ops.Gl.Matrix.OrbitControls,
    objName: "Ops.Gl.Matrix.OrbitControls"
}, Ops.Array.ArrayLength = function () {
    CABLES.Op.apply(this, arguments);
    const t = this.inArray("array"),
        e = this.outValue("length");
    e.ignoreValueSerialize = !0, t.onChange = function () {
        var n = 0;
        n = t.get() ? t.get().length : -1, e.set(n)
    }
}, Ops.Array.ArrayLength.prototype = new CABLES.Op, CABLES.OPS["ea508405-833d-411a-86b4-1a012c135c8a"] = {
    f: Ops.Array.ArrayLength,
    objName: "Ops.Array.ArrayLength"
}, Ops.Anim.Timer_v2 = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = t.inValueBool("Play", !0),
        n = t.inTriggerButton("Reset"),
        a = t.outValue("Time"),
        i = t.inValue("Speed", 1);
    var r = new CABLES.Timer,
        s = 0,
        o = 0;

    function l() {
        e.get() ? (r.play(), t.patch.addOnAnimFrame(t)) : (r.pause(), t.patch.removeOnAnimFrame(t))
    }
    e.onChange = l, l(), n.onTriggered = function () {
        o = 0, s = 0, r.setTime(0), a.set(0)
    }, t.onAnimFrame = function () {
        if (r.isPlaying()) {
            if (r.update(), 0 === s) return void(s = r.get());
            const t = r.get() - s;
            s = r.get(), (o += t * i.get()) != o && (o = 0), a.set(o)
        }
    }
}, Ops.Anim.Timer_v2.prototype = new CABLES.Op, CABLES.OPS["aac7f721-208f-411a-adb3-79adae2e471a"] = {
    f: Ops.Anim.Timer_v2,
    objName: "Ops.Anim.Timer_v2"
}, Ops.Gl.MainLoop = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = t.inValue("FPS Limit", 0),
        n = t.outTrigger("trigger"),
        a = t.outValue("width"),
        i = t.outValue("height"),
        r = t.inValueBool("Reduce FPS loading"),
        s = t.inValueBool("Clear", !0),
        o = t.inValueBool("ClearAlpha", !0),
        l = t.inValueBool("Fullscreen Button", !1),
        u = t.inValueBool("Active", !0),
        h = t.inValueBool("Hires Displays", !1);
    t.onAnimFrame = _, h.onChange = function () {
        h.get() ? t.patch.cgl.pixelDensity = window.devicePixelRatio : t.patch.cgl.pixelDensity = 1, t.patch.cgl.updateSize(), CABLES.UI && gui.setLayout()
    }, u.onChange = function () {
        t.patch.removeOnAnimFrame(t), u.get() && (t.onAnimFrame = _, t.patch.addOnAnimFrame(t), console.log("adding again!"))
    };
    var c = t.patch.cgl,
        d = 0,
        f = 0;
    t.patch.cgl || t.uiAttr({
        error: "No webgl cgl context"
    });
    var p = vec3.create();
    vec3.set(p, 0, 0, 0);
    var g = vec3.create();
    vec3.set(g, 0, 0, -2), l.onChange = b, setTimeout(b, 100);
    var m = null;

    function b() {
        function e() {
            m && (m.style.display = "block")
        }
        if (t.patch.cgl.canvas.addEventListener("mouseleave", function () {
                m && (m.style.display = "none")
            }), t.patch.cgl.canvas.addEventListener("mouseenter", e), l.get()) {
            if (!m) {
                m = document.createElement("div");
                var n = t.patch.cgl.canvas.parentElement;
                n && n.appendChild(m), m.addEventListener("mouseenter", e), m.addEventListener("click", function (t) {
                    CABLES.UI && !t.shiftKey ? gui.cycleRendererSize() : c.fullScreen()
                })
            }
            m.style.padding = "10px", m.style.position = "absolute", m.style.right = "5px", m.style.top = "5px", m.style.width = "20px", m.style.height = "20px", m.style.cursor = "pointer", m.style["border-radius"] = "40px", m.style.background = "#444", m.style["z-index"] = "9999", m.style.display = "none", m.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 490 490" style="width:20px;height:20px;" xml:space="preserve" width="512px" height="512px"><g><path d="M173.792,301.792L21.333,454.251v-80.917c0-5.891-4.776-10.667-10.667-10.667C4.776,362.667,0,367.442,0,373.333V480     c0,5.891,4.776,10.667,10.667,10.667h106.667c5.891,0,10.667-4.776,10.667-10.667s-4.776-10.667-10.667-10.667H36.416     l152.459-152.459c4.093-4.237,3.975-10.99-0.262-15.083C184.479,297.799,177.926,297.799,173.792,301.792z" fill="#FFFFFF"/><path d="M480,0H373.333c-5.891,0-10.667,4.776-10.667,10.667c0,5.891,4.776,10.667,10.667,10.667h80.917L301.792,173.792     c-4.237,4.093-4.354,10.845-0.262,15.083c4.093,4.237,10.845,4.354,15.083,0.262c0.089-0.086,0.176-0.173,0.262-0.262     L469.333,36.416v80.917c0,5.891,4.776,10.667,10.667,10.667s10.667-4.776,10.667-10.667V10.667C490.667,4.776,485.891,0,480,0z" fill="#FFFFFF"/><path d="M36.416,21.333h80.917c5.891,0,10.667-4.776,10.667-10.667C128,4.776,123.224,0,117.333,0H10.667     C4.776,0,0,4.776,0,10.667v106.667C0,123.224,4.776,128,10.667,128c5.891,0,10.667-4.776,10.667-10.667V36.416l152.459,152.459     c4.237,4.093,10.99,3.975,15.083-0.262c3.992-4.134,3.992-10.687,0-14.82L36.416,21.333z" fill="#FFFFFF"/><path d="M480,362.667c-5.891,0-10.667,4.776-10.667,10.667v80.917L316.875,301.792c-4.237-4.093-10.99-3.976-15.083,0.261     c-3.993,4.134-3.993,10.688,0,14.821l152.459,152.459h-80.917c-5.891,0-10.667,4.776-10.667,10.667s4.776,10.667,10.667,10.667     H480c5.891,0,10.667-4.776,10.667-10.667V373.333C490.667,367.442,485.891,362.667,480,362.667z" fill="#FFFFFF"/></g></svg>'
        } else m && (m.style.display = "none", m.remove(), m = null)
    }

    function _(e) {
        u.get() && (c.aborted || 0 === c.canvas.clientWidth || 0 === c.canvas.clientHeight || (t.patch.loading.getProgress() < 1 && r.get() && (t.patch.config.fpsLimit = 5), -1 != c.canvasWidth ? (c.canvasWidth == a.get() && c.canvasHeight == i.get() || (a.set(c.canvasWidth), i.set(c.canvasHeight)), CABLES.now() - f > 1e3 && (CGL.fpsReport = CGL.fpsReport || [], t.patch.loading.getProgress() >= 1 && 0 !== f && CGL.fpsReport.push(d), d = 0, f = CABLES.now()), CGL.MESH.lastShader = null, CGL.MESH.lastMesh = null, c.renderStart(c, p, g), s.get() && (c.gl.clearColor(0, 0, 0, 1), c.gl.clear(c.gl.COLOR_BUFFER_BIT | c.gl.DEPTH_BUFFER_BIT)), n.trigger(), CGL.MESH.lastMesh && CGL.MESH.lastMesh.unBind(), CGL.Texture.previewTexture && (CGL.Texture.texturePreviewer || (CGL.Texture.texturePreviewer = new CGL.Texture.texturePreview(c)), CGL.Texture.texturePreviewer.render(CGL.Texture.previewTexture)), c.renderEnd(c), o.get() && (c.gl.clearColor(1, 1, 1, 1), c.gl.colorMask(!1, !1, !1, !0), c.gl.clear(c.gl.COLOR_BUFFER_BIT), c.gl.colorMask(!0, !0, !0, !0)), c.frameStore.phong || (c.frameStore.phong = {}), d++) : c.setCanvas(t.patch.config.glCanvasId)))
    }
    e.onChange = function () {
        t.patch.config.fpsLimit = e.get() || 0
    }, t.onDelete = function () {
        c.gl.clearColor(0, 0, 0, 0), c.gl.clear(c.gl.COLOR_BUFFER_BIT | c.gl.DEPTH_BUFFER_BIT)
    }, t.patch.loading.setOnFinishedLoading(function (n) {
        t.patch.config.fpsLimit = e.get()
    })
}, Ops.Gl.MainLoop.prototype = new CABLES.Op, CABLES.OPS["b0472a1d-db16-4ba6-8787-f300fbdc77bb"] = {
    f: Ops.Gl.MainLoop,
    objName: "Ops.Gl.MainLoop"
}, Ops.Gl.ClearColor = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = t.inTrigger("render"),
        n = t.outTrigger("trigger"),
        a = t.inFloatSlider("r", .1),
        i = t.inFloatSlider("g", .1),
        r = t.inFloatSlider("b", .1),
        s = t.inFloatSlider("a", 1);
    a.setUiAttribs({
        colorPick: !0
    });
    const o = t.patch.cgl;
    e.onTriggered = function () {
        o.gl.clearColor(a.get(), i.get(), r.get(), s.get()), o.gl.clear(o.gl.COLOR_BUFFER_BIT | o.gl.DEPTH_BUFFER_BIT), n.trigger()
    }
}, Ops.Gl.ClearColor.prototype = new CABLES.Op, CABLES.OPS["19b441eb-9f63-4f35-ba08-b87841517c4d"] = {
    f: Ops.Gl.ClearColor,
    objName: "Ops.Gl.ClearColor"
}, Ops.WebAudio.AudioBufferPlayer = function () {
    CABLES.Op.apply(this, arguments);
    const t = this;
    var e = CABLES.WEBAUDIO.createAudioContext(t),
        n = t.inObject("Audio Buffer"),
        a = t.inValueBool("Start / Stop", !1),
        i = t.inValue("Start Time", 0),
        r = t.inValue("Stop Time", 0),
        s = t.inValue("Offset", 0),
        o = t.inValueBool("Autoplay", !1),
        l = t.inValueBool("Loop", !1),
        u = t.inValue("Detune", 0),
        h = t.inValue("Playback Rate", 1),
        c = t.outObject("Audio Out"),
        d = null;

    function f() {
        if (d) {
            var t = u.get() || 0;
            d.detune && d.detune.setValueAtTime(t, e.currentTime)
        }
    }

    function p() {
        if (d) {
            var t = h.get() || 0;
            t >= d.playbackRate.minValue && t <= d.playbackRate.maxValue && d.playbackRate.setValueAtTime(t, e.currentTime)
        }
    }

    function g() {
        d && b(0), d = e.createBufferSource();
        var t = n.get();
        t && (d.buffer = t), d.onended = _, d.loop = l.get(), p(), f(), c.set(d)
    }

    function m(t) {
        try {
            d.start(t, s.get())
        } catch (t) {}
    }

    function b(t) {
        try {
            d.stop(t)
        } catch (t) {}
    }

    function _() {
        g()
    }
    n.onChange = function () {
        g(), (o.get() && n.get() || a.get() && n.get()) && m(i.get())
    }, a.onChange = function () {
        d && (a.get() ? m(i.get() || 0) : b(r.get() || 0))
    }, l.onChange = function () {
        d && (d.loop = !!l.get())
    }, u.onChange = f, h.onChange = p
}, Ops.WebAudio.AudioBufferPlayer.prototype = new CABLES.Op, CABLES.OPS["05385277-92fc-4d49-b730-11f9ed5e5c0d"] = {
    f: Ops.WebAudio.AudioBufferPlayer,
    objName: "Ops.WebAudio.AudioBufferPlayer"
}, Ops.WebAudio.BiquadFilter = function () {
    CABLES.Op.apply(this, arguments);
    this.name = "BiquadFilter";
    var t = CABLES.WEBAUDIO.createAudioContext(this),
        e = t.sampleRate / 2,
        n = t.createBiquadFilter(),
        a = (CABLES.WEBAUDIO.createAudioInPort(this, "Audio In", n), CABLES.WEBAUDIO.createAudioOutPort(this, "Audio Out", n), this.addInPort(new CABLES.Port(this, "type", CABLES.OP_PORT_TYPE_VALUE, {
            display: "dropdown",
            values: ["allpass", "lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch"]
        }))),
        i = this.addInPort(new CABLES.Port(this, "frequency", CABLES.OP_PORT_TYPE_VALUE, {
            display: "range",
            min: 10,
            max: e
        })),
        r = this.addInPort(new CABLES.Port(this, "detune", CABLES.OP_PORT_TYPE_VALUE, {
            display: "range",
            min: -3600,
            max: 3600
        })),
        s = this.addInPort(new CABLES.Port(this, "q", CABLES.OP_PORT_TYPE_VALUE, {
            display: "range",
            min: 1e-4,
            max: 1e3
        })),
        o = this.addInPort(new CABLES.Port(this, "gain", CABLES.OP_PORT_TYPE_VALUE, {
            display: "range",
            min: -40,
            max: 40
        }));
    a.onChange = function () {
        n.type = a.get()
    }, i.onChange = function () {
        var t = i.get();
        t && t >= 10 && t <= e && n.frequency.setValueAtTime(i.get(), window.audioContext.currentTime)
    }, r.onChange = function () {
        n.detune.setValueAtTime(r.get(), window.audioContext.currentTime)
    }, s.onChange = function () {
        n.Q.setValueAtTime(s.get(), window.audioContext.currentTime)
    }, o.onChange = function () {
        n.gain.setValueAtTime(o.get(), window.audioContext.currentTime)
    }, a.set("allpass"), i.set(350), r.set(0), s.set(1), o.set(0)
}, Ops.WebAudio.BiquadFilter.prototype = new CABLES.Op, CABLES.OPS["3e28f86a-4f74-49a2-a1a6-f8943c00352d"] = {
    f: Ops.WebAudio.BiquadFilter,
    objName: "Ops.WebAudio.BiquadFilter"
}, Ops.Math.Math = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = t.inFloat("number 0", 0),
        n = t.inFloat("number 1", 0),
        a = t.inSwitch("math mode", ["+", "-", "*", "/", "%", "min", "max"], "+"),
        i = t.outNumber("result");
    e.onChange = n.onChange = a.onChange = function () {
        var r = a.get(),
            s = e.get(),
            o = n.get();
        t.setUiAttrib({
            extendTitle: r
        }), "+" === r ? i.set(s + o) : "-" === r ? i.set(s - o) : "*" === r ? i.set(s * o) : "/" === r ? i.set(s / o) : "%" === r ? i.set(s % o) : "min" === r ? i.set(Math.min(s, o)) : "max" === r && i.set(Math.max(s, o))
    }
}, Ops.Math.Math.prototype = new CABLES.Op, CABLES.OPS["e9fdcaca-a007-4563-8a4d-e94e08506e0f"] = {
    f: Ops.Math.Math,
    objName: "Ops.Math.Math"
}, Ops.WebAudio.AudioBuffer = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = (CABLES.WEBAUDIO.createAudioContext(t), t.inFile("URL", "audio")),
        n = t.outObject("Audio Buffer"),
        a = t.outValue("Finished Loading", !1),
        i = t.outValue("Sample Rate", 0),
        r = t.outValue("Length", 0),
        s = t.outValue("Duration", 0),
        o = t.outValue("Number of Channels", 0);

    function l(e) {
        r.set(e.length), s.set(e.duration), o.set(e.numberOfChannels), i.set(e.sampleRate), n.set(e), a.set(!0), t.log("AudioBuffer loaded: ", e)
    }

    function u(t) {
        console.error("Error: Loading audio file failed: ", t), r.set(0), s.set(0), o.set(0), i.set(0), n.set(0), a.set(!1)
    }
    e.onChange = function () {
        var n = t.patch.getFilePath(e.get());
        "string" == typeof n && n.length > 1 && CABLES.WEBAUDIO.loadAudioFile(t.patch, n, l, u)
    }
}, Ops.WebAudio.AudioBuffer.prototype = new CABLES.Op, CABLES.OPS["2cf4b0a1-b657-405b-8bf9-8555dbd5c231"] = {
    f: Ops.WebAudio.AudioBuffer,
    objName: "Ops.WebAudio.AudioBuffer"
}, Ops.Boolean.ToggleBool = function () {
    CABLES.Op.apply(this, arguments);
    const t = this.inTriggerButton("trigger"),
        e = this.inTriggerButton("reset"),
        n = this.outValue("result");
    var a = !1;
    n.set(a), n.ignoreValueSerialize = !0, t.onTriggered = function () {
        a = !a, n.set(a)
    }, e.onTriggered = function () {
        a = !1, n.set(a)
    }
}, Ops.Boolean.ToggleBool.prototype = new CABLES.Op, CABLES.OPS["712a25f4-3a93-4042-b8c5-2f56169186cc"] = {
    f: Ops.Boolean.ToggleBool,
    objName: "Ops.Boolean.ToggleBool"
}, Ops.Html.FontFile = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = t.inFile("file"),
        n = t.inValueString("family"),
        a = t.outValue("Loaded"),
        i = t.outTrigger("Loaded Trigger");
    var r;

    function s() {
        if (e.get() && n.get())
            if (document.fonts) r = new FontFace(n.get(), "url(" + t.patch.getFilePath(String(e.get())) + ")"), document.fonts.add(r), r.load(), r.loaded.then(t => {
                a.set(!0), i.trigger()
            }, t => {
                console.error("Font loading error! Current status", r.status)
            });
            else {
                var s = t.patch.getFilePath(String(e.get())),
                    o = "".endl() + "@font-face".endl() + "{".endl() + '  font-family: "' + n.get() + '";'.endl() + '  src: url("' + s + '") format("truetype");'.endl() + "}",
                    l = document.createElement("style");
                l.type = "text/css", l.innerHTML = o, document.getElementsByTagName("head")[document.getElementsByTagName("head").length - 1].appendChild(l)
            }
    }
    e.onChange = function () {
        a.set(!1), s()
    }, n.onChange = s
}, Ops.Html.FontFile.prototype = new CABLES.Op, CABLES.OPS["0cf90109-cccd-4633-9c77-8aaf53eae15c"] = {
    f: Ops.Html.FontFile,
    objName: "Ops.Html.FontFile"
}, Ops.Html.EventListener = function () {
    CABLES.Op.apply(this, arguments);
    const t = this;
    var e = null,
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
    var i = t.inObject("Dom Element");
    i.onChange = function () {
        var t = i.get();
        e !== t && o(e);
        t && function (t) {
            if (!t) return;
            a.forEach(function (e) {
                u(t, e)
            })
        }(t);
        (function (t) {
            a.forEach(function (e) {
                e.togglePort.get() ? u(t, e) : l(t, e.name)
            })
        })(t), e = t
    };
    var r = t.outObject("Event Object");
    a.forEach(function (e) {
        e.port = t.outTrigger(e.displayName), e.handler = function (t) {
            return function (e) {
                r.set(e), s.set(e.type), e.preventDefault(), t.port.trigger()
            }
        }(e), e.togglePort = t.inValueBool(e.displayName + " Active", !0), e.togglePort.onChange = function (t) {
            return function (e, n) {
                n ? u(i.get(), t) : l(i.get(), t.name)
            }
        }(e)
    }), t.log(a);
    var s = t.outValue("Event Name");

    function o(t) {
        if (t)
            for (var e = n.length - 1; e >= 0; e--) l(t, n[e])
    }

    function l(t, e) {
        if (t && e && (r = e, (i = n) && i.indexOf(r) > -1)) {
            var i, r, s = n.indexOf(e);
            t.removeEventListener(e, function (t) {
                for (var e = 0; e < a.length; e++)
                    if (a[e].name == t) return a[e];
                return null
            }(e).handler), n.splice(s, 1)
        }
    }

    function u(t, e) {
        t && e && (n.indexOf(e.name) > -1 || e.togglePort.get() && (t.addEventListener(e.name, e.handler), n.push(e.name)))
    }
    t.onDelete = function () {
        o(e), o(i.get())
    }
}, Ops.Html.EventListener.prototype = new CABLES.Op, CABLES.OPS["73dc05e9-7b63-444b-980b-bd63f511b94a"] = {
    f: Ops.Html.EventListener,
    objName: "Ops.Html.EventListener"
}, Ops.Html.DivElement_v2 = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = t.inString("Id"),
        n = t.inString("Class"),
        a = t.inString("Text", "Hello Div"),
        i = t.inValueEditor("Style", "position:absolute;z-index:9999;", "css"),
        r = t.inValueBool("Interactive", !1),
        s = t.inValueBool("Visible", !0),
        o = t.inValueBool("Convert Line Breaks", !1),
        l = t.outObject("DOM Element"),
        u = t.outValue("Hover"),
        h = t.outTrigger("Clicked");
    var c = null,
        d = document.createElement("div");
    t.patch.cgl.canvas.parentElement.appendChild(d), l.set(d), n.onChange = function () {
        d.setAttribute("class", n.get())
    }, o.onChange = a.onChange = m, i.onChange = b, r.onChange = function () {
        I(), r.get() && function () {
            c && I();
            (c = d) && (c.addEventListener("click", O), c.addEventListener("mouseleave", v), c.addEventListener("mouseenter", _))
        }()
    }, s.onChange = g, m(), b(), t.onDelete = function () {
        d.parentNode.removeChild(d)
    };
    var f = "block";

    function p(t) {
        t ? (d.style.visibility = "visible", d.style.display = f) : (d.style.visibility = "hidden", f = d.style.display || "block", d.style.display = "none"), console.log("div.style.display", d.style.display)
    }

    function g() {
        p(s.get())
    }

    function m() {
        var t = a.get();
        o.get() && (t = t.replace(/(?:\r\n|\r|\n)/g, "<br>")), d.innerHTML = t, l.set(null), l.set(d)
    }

    function b() {
        d.setAttribute("style", i.get()), g(), l.set(null), l.set(d)
    }

    function _() {
        u.set(!0)
    }

    function v() {
        u.set(!1)
    }

    function O() {
        h.trigger()
    }

    function I() {
        c && (c.removeEventListener("click", O), c.removeEventListener("mouseleave", v), c.removeEventListener("mouseenter", _), c = null)
    }
    e.onChange = function () {
        d.id = e.get()
    }, t.addEventListener("onEnabledChange", function (t) {
        p("visible" != d.style.visibility)
    })
}, Ops.Html.DivElement_v2.prototype = new CABLES.Op, CABLES.OPS["db36db6d-83e4-4d27-b84c-8a20067aaffc"] = {
    f: Ops.Html.DivElement_v2,
    objName: "Ops.Html.DivElement_v2"
}, Ops.User.l6n.GetSoundcloud = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = "6f693b837b47b59a17403e79bcff3626",
        n = t.inString("SoundCloud URL"),
        a = t.outValue("Stream URL"),
        i = t.outValue("Artwork URL"),
        r = t.outValue("Title");
    t.outObject("Result");
    a.ignoreValueSerialize = !0, i.ignoreValueSerialize = !0, a.ignoreValueSerialize = !0, r.ignoreValueSerialize = !0, n.onChange = function () {
        n.get() && CABLES.ajax("https://api.soundcloud.com/resolve.json?url=" + n.get() + "&client_id=" + e, function (t, n, s) {
            var o = JSON.parse(n);
            a.set(o.stream_url + "?client_id=" + e), i.set(o.artwork_url), r.set(o.title), console.log("stream url:" + o.stream_url), console.log(o)
        })
    }
}, Ops.User.l6n.GetSoundcloud.prototype = new CABLES.Op, Ops.String.String_v2 = function () {
    CABLES.Op.apply(this, arguments);
    const t = this.inString("value", ""),
        e = this.outString("String");
    t.onChange = function () {
        e.set(t.get())
    }
}, Ops.String.String_v2.prototype = new CABLES.Op, CABLES.OPS["d697ff82-74fd-4f31-8f54-295bc64e713d"] = {
    f: Ops.String.String_v2,
    objName: "Ops.String.String_v2"
}, Ops.Html.CSS_v2 = function () {
    CABLES.Op.apply(this, arguments);
    var t = this.inStringEditor("css code");
    t.setUiAttribs({
        editorSyntax: "css"
    });
    var e = null,
        n = "css_" + CABLES.uuid();

    function a() {
        return t.get()
    }

    function i() {
        (e = document.getElementById(n)) ? e.textContent = a(): ((e = document.createElement("style")).type = "text/css", e.id = n, e.textContent = a(), document.getElementsByTagName("body")[0].appendChild(e))
    }
    t.onChange = i, i(), this.onDelete = function () {
        (e = document.getElementById(n)) && e.remove()
    }
}, Ops.Html.CSS_v2.prototype = new CABLES.Op, CABLES.OPS["a56d3edd-06ad-44ed-9810-dbf714600c67"] = {
    f: Ops.Html.CSS_v2,
    objName: "Ops.Html.CSS_v2"
}, Ops.Html.BackgroundImage = function () {
    CABLES.Op.apply(this, arguments);
    const t = this,
        e = t.inObject("Element"),
        n = t.inValueBool("active", !0),
        a = t.inFile("image file"),
        i = t.inValueSelect("Size", ["auto", "length", "cover", "contain", "initial", "inherit", "75%", "50%", "25%"], "auto"),
        r = t.inValueSelect("Repeat", ["no-repeat", "repeat", "repeat-x", "repeat-y"], "no-repeat"),
        s = t.inValueSelect("Position", ["left top", "left center", "left bottom", "right top", "right center", "right bottom", "center top", "center center", "center bottom"], "center center"),
        o = t.outObject("HTML Element");
    t.onLoadedValueSet = t.onLoaded = s.onChange = i.onChange = e.onChange = r.onChange = n.onChange = a.onChange = function t() {
        l = e.get();
        l && l.style && a.get() ? n.get() ? (l.style["background-image"] = "url(" + a.get() + ")", l.style["background-size"] = i.get(), l.style["background-position"] = s.get(), l.style["background-repeat"] = r.get()) : l.style["background-image"] = "none" : setTimeout(t, 100);
        o.set(e.get())
    };
    var l = null
}, Ops.Html.BackgroundImage.prototype = new CABLES.Op, CABLES.OPS["da3de45b-c252-4785-8558-7fadb199ea61"] = {
    f: Ops.Html.BackgroundImage,
    objName: "Ops.Html.BackgroundImage"
}, Ops.Trigger.Threshold = function () {
    CABLES.Op.apply(this, arguments);
    const t = this.inValue("Input"),
        e = this.inValue("Threshold"),
        n = this.outTrigger("Output");
    var a = !1;
    t.onChange = function () {
        !a && t.get() >= e.get() ? (a = !0, n.trigger()) : a && t.get() <= e.get() && (a = !1)
    }
}, Ops.Trigger.Threshold.prototype = new CABLES.Op, CABLES.OPS["ef0891db-6053-42ba-b7d5-29c7cf6d8208"] = {
    f: Ops.Trigger.Threshold,
    objName: "Ops.Trigger.Threshold"
}, Ops.Time.DelayedTrigger = function () {
    CABLES.Op.apply(this, arguments);
    const t = this.inTrigger("exe"),
        e = this.inValueFloat("delay", 1),
        n = this.outTrigger("next");
    var a = null;
    t.onTriggered = function () {
        a && clearTimeout(a), a = setTimeout(function () {
            a = null, n.trigger()
        }, 1e3 * e.get())
    }
}, Ops.Time.DelayedTrigger.prototype = new CABLES.Op, CABLES.OPS["f4ff66b0-8500-46f7-9117-832aea0c2750"] = {
    f: Ops.Time.DelayedTrigger,
    objName: "Ops.Time.DelayedTrigger"
}, Ops.Html.ToggleClass = function () {
    CABLES.Op.apply(this, arguments);
    const t = this.inObject("HTML Element"),
        e = this.inString("Classname"),
        n = this.inValueBool("Active", !0);
    n.onChange = e.onChange = t.onChange = function () {
        var i = t.get(),
            r = e.get();
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
    const t = this.inObject("Element"),
        e = this.inValueSelect("method", ["-", "blur", "brightness", "contrast", "grayscale", "hue-rotate", "invert", "opacity", "saturate", "sepia"]),
        n = this.inValue("Value");
    var a = "";
    n.onChange = s, t.onChange = s;
    var i = null;

    function r() {
        return e.get() + "(" + n.get() + a + ")"
    }

    function s() {
        const n = t.get();
        var a = "";
        if (n && n.style) {
            n != i && (i = n);
            var s = !1,
                o = n.style.filter;
            if (o && o.length > 0) {
                for (var l = o.split(" "), u = 0; u < l.length; u++) 0 == l[u].indexOf(e.get()) && (s = !0, l[u] = r());
                a = l.join(" ")
            }
            s || (a += " " + r()), n.style.filter = a
        }
    }
    t.onLinkChanged = function () {
        if (t.isLinked()) return;
        const n = i;
        if (n && n.style) {
            var a = n.style.filter,
                r = "";
            if (a && a.length > 0) {
                r = "";
                for (var s = a.split(" "), o = 0; o < s.length; o++) 0 == s[o].indexOf(e.get()) && (s[o] = "");
                r = s.join(" ")
            }
            n.style.filter = r
        }
    }, e.onChange = function () {
        var t = e.get();
        e.get() + ":", "blur" == t && (a = "px"), "brightness" == t && (a = ""), "contrast" == t && (a = "%"), "grayscale" == t && (a = "%"), "hue-rotate" == t && (a = "deg"), "invert" == t && (a = "%"), "opacity" == t && (a = "%"), "saturate" == t && (a = ""), "sepia" == t && (a = "%"), s()
    }
}, Ops.Html.CSSFilter.prototype = new CABLES.Op, CABLES.OPS["33befabf-7eef-45f6-869f-30e0e4f44739"] = {
    f: Ops.Html.CSSFilter,
    objName: "Ops.Html.CSSFilter"
};