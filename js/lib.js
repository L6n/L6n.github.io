var CABLES = function (t) {
    var e = {};

    function i(s) {
        if (e[s]) return e[s].exports;
        var r = e[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        return t[s].call(r.exports, r, r.exports, i), r.l = !0, r.exports
    }
    return i.m = t, i.c = e, i.d = function (t, e, s) {
        i.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: s
        })
    }, i.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, i.t = function (t, e) {
        if (1 & e && (t = i(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var s = Object.create(null);
        if (i.r(s), Object.defineProperty(s, "default", {
                enumerable: !0,
                value: t
            }), 2 & e && "string" != typeof t)
            for (var r in t) i.d(s, r, function (e) {
                return t[e]
            }.bind(null, r));
        return s
    }, i.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return i.d(e, "a", e), e
    }, i.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, i.p = "", i(i.s = 0)
}([function (t, e, i) {
    t.exports = i(1)
}, function (t, e, s) {
    "use strict";
    s.r(e);
    var r = {};
    s.r(r), s.d(r, "base64Chars", function () {
        return h
    }), s.d(r, "base64lookup", function () {
        return c
    }), s.d(r, "b64encTypesArray", function () {
        return p
    }), s.d(r, "b64decTypedArray", function () {
        return d
    });
    var n = {};
    s.r(n), s.d(n, "shuffleArray", function () {
        return f
    }), s.d(n, "uuid", function () {
        return E
    }), s.d(n, "generateUUID", function () {
        return v
    }), s.d(n, "simpleId", function () {
        return A
    }), s.d(n, "smoothStep", function () {
        return b
    }), s.d(n, "smootherStep", function () {
        return O
    }), s.d(n, "map", function () {
        return I
    }), s.d(n, "cacheBust", function () {
        return y
    }), s.d(n, "jsonp", function () {
        return P
    }), s.d(n, "ajaxSync", function () {
        return x
    }), s.d(n, "ajax", function () {
        return N
    }), s.d(n, "request", function () {
        return F
    }), s.d(n, "UTILS", function () {
        return g
    });
    var o = {};
    s.r(o), s.d(o, "easeExpoIn", function () {
        return B
    }), s.d(o, "easeExpoOut", function () {
        return w
    }), s.d(o, "easeExpoInOut", function () {
        return L
    }), s.d(o, "easeCubicIn", function () {
        return k
    }), s.d(o, "easeCubicOut", function () {
        return U
    }), s.d(o, "easeCubicInOut", function () {
        return D
    }), s.d(o, "ANIM", function () {
        return C
    }), s.d(o, "Anim", function () {
        return V
    }), s.d(o, "TL", function () {
        return G
    });
    var a = {};
    s.r(a), s.d(a, "togglePacoRenderer", function () {
        return Rt
    }), s.d(a, "showPacoRenderer", function () {
        return Pt
    }), s.d(a, "PatchConnectionReceiver", function () {
        return xt
    }), s.d(a, "PatchConnectionSender", function () {
        return Nt
    }), s.d(a, "PatchConnectorBroadcastChannel", function () {
        return Ft
    });
    const h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        l = new Uint8Array(256);
    for (var u = 0; u < h.length; u++) l[h.charCodeAt(u)] = u;
    const c = l,
        p = function (t) {
            t.buffer && (t = t.buffer);
            var e, i = new Uint8Array(t),
                s = i.length,
                r = "";
            for (e = 0; e < s; e += 3) r += h[i[e] >> 2], r += h[(3 & i[e]) << 4 | i[e + 1] >> 4], r += h[(15 & i[e + 1]) << 2 | i[e + 2] >> 6], r += h[63 & i[e + 2]];
            return s % 3 == 2 ? r = r.substring(0, r.length - 1) + "=" : s % 3 == 1 && (r = r.substring(0, r.length - 2) + "=="), r
        },
        d = function (t) {
            var e, i, s, r, n, o = .75 * t.length,
                a = t.length,
                h = 0;
            "=" === t[t.length - 1] && (o--, "=" === t[t.length - 2] && o--);
            var l = new ArrayBuffer(o),
                u = new Uint8Array(l);
            for (e = 0; e < a; e += 4) i = c[t.charCodeAt(e)], s = c[t.charCodeAt(e + 1)], r = c[t.charCodeAt(e + 2)], n = c[t.charCodeAt(e + 3)], u[h++] = i << 2 | s >> 4, u[h++] = (15 & s) << 4 | r >> 2, u[h++] = (3 & r) << 6 | 63 & n;
            return l
        },
        _ = function () {
            this._eventCallbacks = {}, this.addEventListener = function (t, e) {
                this._eventCallbacks[t] ? this._eventCallbacks[t].push(e) : this._eventCallbacks[t] = [e]
            }, this.hasEventListener = function (t, e) {
                if (t && e) {
                    if (this._eventCallbacks[t]) return -1 != this._eventCallbacks[t].indexOf(e)
                } else console.log("hasListener: missing parameters")
            }, this.removeEventListener = function (t, e) {
                if (this._eventCallbacks[t]) {
                    var i = this._eventCallbacks[t].indexOf(e); - 1 == i ? console.log("eventlistener " + t + " not found...") : this._eventCallbacks[t].splice(i)
                }
            }, this.emitEvent = function (t, e, i, s, r, n, o) {
                if (this._eventCallbacks[t])
                    for (var a = 0; a < this._eventCallbacks[t].length; a++) this._eventCallbacks[t][a] && this._eventCallbacks[t][a](e, i, s, r, n, o)
            }
        },
        g = {
            float32Concat: function (t, e) {
                t instanceof Float32Array || (t = new Float32Array(t)), e instanceof Float32Array || (e = new Float32Array(e));
                var i = t.length,
                    s = new Float32Array(i + e.length);
                return s.set(t), s.set(e, i), s
            }
        },
        f = function (t) {
            for (var e = t.length - 1; e > 0; e--) {
                var i = Math.floor(Math.seededRandom() * (e + 1)),
                    s = t[e];
                t[e] = t[i], t[i] = s
            }
            return t
        },
        m = function () {
            var t = (new Date).getTime();
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, e => {
                var i = (t + 16 * Math.random()) % 16 | 0;
                return t = Math.floor(t / 16), ("x" == e ? i : 3 & i | 8).toString(16)
            })
        },
        E = m,
        v = m;
    var T = 0;
    const A = function () {
            return ++T
        },
        b = function (t) {
            var e = Math.max(0, Math.min(1, (t - 0) / 1));
            return t = e * e * (3 - 2 * e)
        },
        O = function (t) {
            var e = Math.max(0, Math.min(1, (t - 0) / 1));
            return t = e * e * e * (e * (6 * e - 15) + 10)
        },
        I = function (t, e, i, s, r, n) {
            if (t >= i) return r;
            if (t <= e) return s;
            var o = !1,
                a = Math.min(e, i),
                h = Math.max(e, i);
            a != e && (o = !0);
            var l = !1,
                u = Math.min(s, r),
                c = Math.max(s, r);
            u != s && (l = !0);
            var p = 0,
                d = 0;
            return p = o ? (h - t) * (c - u) / (h - a) : (t - a) * (c - u) / (h - a), d = l ? c - p : p + u, n ? 1 == n ? s + (t = Math.max(0, Math.min(1, (d - s) / (r - s)))) * t * (3 - 2 * t) * (r - s) : 2 == n ? s + (t = Math.max(0, Math.min(1, (d - s) / (r - s)))) * t * t * (t * (6 * t - 15) + 10) * (r - s) : d : d
        };
    Math.randomSeed = 1, Math.seededRandom = function (t, e) {
        return 0 === Math.randomSeed && (Math.randomSeed = 999 * Math.random()), t = t || 1, e = e || 0, Math.randomSeed = (9301 * Math.randomSeed + 49297) % 233280, e + Math.randomSeed / 233280 * (t - e)
    }, g.arrayWriteToEnd = function (t, e) {
        for (var i = 1; i < t.length; i++) t[i - 1] = t[i];
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
    var R = null;
    const P = function (t, e) {
            R = R || 0;
            var i = ++R;
            console.log("making jsonp request..."), CABLES["jsonpFunc" + i] = function (t) {
                console.log(t), e(!1, t)
            };
            var s = "?";
            t.indexOf(s) > -1 && (s = "&");
            var r = document.createElement("script");
            r.setAttribute("src", t + s + "callback=CABLES.jsonpFunc" + i), document.body.appendChild(r)
        },
        x = function (t, e, i, s, r) {
            F({
                url: t,
                cb: e,
                method: i,
                data: s,
                contenttype: r,
                sync: !0
            })
        },
        N = function (t, e, i, s, r, n) {
            F({
                url: t,
                cb: e,
                method: i,
                "data:": s,
                contenttype: r,
                sync: !1,
                jsonp: n
            })
        },
        F = function (t) {
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
    const M = {
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
        S = function (t, e, i, s) {
            _.apply(this), this.data = {}, this.direction = M.PORT.PORT_DIR_IN, this.id = v(), this.parent = t, this.links = [], this.value = 0, this.name = e, this.type = i || M.OP.OP_PORT_TYPE_VALUE, this.uiAttribs = s || {}, this.anim = null, this._oldAnimVal = -5711, this.defaultValue = null, this._uiActiveState = !0, this.ignoreValueSerialize = !1, this.onLinkChanged = null, this.crashed = !1, this._valueBeforeLink = null, this._lastAnimFrame = -1, this._animated = !1, this.onValueChanged = null, this.onTriggered = null, this.onUiActiveStateChange = null, this.changeAlways = !1, this._warnedDeprecated = !1, Object.defineProperty(this, "val", {
                get() {
                    return this._warnedDeprecated = !0, this.get()
                },
                set(t) {
                    this.setValue(t), this._warnedDeprecated = !0
                }
            })
        };
    S.prototype.onAnimToggle = function () {}, S.prototype._onAnimToggle = function () {
        this.onAnimToggle()
    }, S.prototype.hidePort = function () {
        this.setUiAttribs({
            hidePort: !0
        })
    }, S.prototype.remove = function () {
        this.removeLinks(), this.parent.removePort(this)
    }, S.prototype.setUiAttribs = function (t) {
        for (var e in this.uiAttribs || (this.uiAttribs = {}), t) this.uiAttribs[e] = t[e];
        this.emitEvent("onUiAttrChange", t)
    }, S.prototype.get = function () {
        return this._animated && this._lastAnimFrame != this.parent.patch.getFrameNum() && (this._lastAnimFrame = this.parent.patch.getFrameNum(), this.value = this.anim.getValue(this.parent.patch.timer.getTime()), this._oldAnimVal = this.value, this.forceChange()), this.value
    }, S.prototype.set = S.prototype.setValue = function (t) {
        if (void 0 !== t && this.parent.enabled && !this.crashed && (t !== this.value || this.changeAlways || this.type == M.OP.OP_PORT_TYPE_TEXTURE || this.type == M.OP.OP_PORT_TYPE_ARRAY)) {
            if (this._animated) this.anim.setValue(this.parent.patch.timer.getTime(), t);
            else {
                try {
                    this.value = t, this.forceChange()
                } catch (t) {
                    this.crashed = !0, this.setValue = function (t) {}, this.onTriggered = function () {}, console.log("exception!"), console.error("onvaluechanged exception cought", t), console.log(t.stack), console.log("exception in: " + this.parent.name), gui && gui.showOpCrash(this.parent), this.parent.patch.emitEvent("exception".ex, this.parent)
                }
                CABLES.UI && this.type == M.OP.OP_PORT_TYPE_TEXTURE && gui.texturePreview().updateTexturePort(this)
            }
            if (this.direction == M.PORT.PORT_DIR_OUT)
                for (var e = 0; e < this.links.length; ++e) this.links[e].setValue()
        }
    }, S.prototype.updateAnim = function () {
        this._animated && (this.value = this.get(), (this._oldAnimVal != this.value || this.changeAlways) && (this._oldAnimVal = this.value, this.forceChange()), this._oldAnimVal = this.value)
    }, S.args = function (t) {
        return (t + "").replace(/[\/][\/].*$/gm, "").replace(/\s+/g, "").replace(/[\/][*][^\/*]*[*][\/]/g, "").split("){", 1)[0].replace(/^[^(]*[(]/, "").replace(/=[^,]+/g, "").split(",").filter(Boolean)
    }, S.prototype.forceChange = function () {
        this.onValueChanged || this.onChange, this.onChange ? this.onChange(this, this.value) : this.onValueChanged && this.onValueChanged(this, this.value)
    }, S.prototype.getTypeString = function () {
        return this.type == M.OP.OP_PORT_TYPE_VALUE ? "Number" : this.type == M.OP.OP_PORT_TYPE_FUNCTION ? "Trigger" : this.type == M.OP.OP_PORT_TYPE_OBJECT ? "Object" : this.type == M.OP.OP_PORT_TYPE_DYNAMIC ? "Dynamic" : this.type == M.OP.OP_PORT_TYPE_ARRAY ? "Array" : this.type == M.OP.OP_PORT_TYPE_STRING ? "String" : "Unknown"
    }, S.prototype.getSerialized = function () {
        var t = {};
        if (t.name = this.getName(), this.ignoreValueSerialize || 0 !== this.links.length || this.type == M.OP.OP_PORT_TYPE_OBJECT && this.value && this.value.tex || (t.value = this.value), this._animated && (t.animated = !0), this.anim && (t.anim = this.anim.getSerialized()), "file" == this.uiAttribs.display && (t.display = this.uiAttribs.display), this.direction == M.PORT.PORT_DIR_IN && this.links.length > 0)
            for (var e in t.links = [], this.links) this.links[e].portIn && this.links[e].portOut && t.links.push(this.links[e].getSerialized());
        return t
    }, S.prototype.shouldLink = function () {
        return !0
    }, S.prototype.removeLinks = function () {
        for (var t = 0; this.links.length > 0;) {
            if (++t > 5e3) {
                console.warn("could not delete links... / infinite loop"), this.links.length = 0;
                break
            }
            this.links[0].remove()
        }
    }, S.prototype.removeLink = function (t) {
        for (var e in this.links) this.links[e] == t && this.links.splice(e, 1);
        this.direction == M.PORT.PORT_DIR_IN && (this.type == M.OP.OP_PORT_TYPE_VALUE ? this.setValue(this._valueBeforeLink || 0) : this.setValue(this._valueBeforeLink || null)), this.onLinkChanged && this.onLinkChanged(), this.emitEvent("onLinkChanged")
    }, S.prototype.getName = function () {
        return this.name
    }, S.prototype.addLink = function (t) {
        this._valueBeforeLink = this.value, this.links.push(t), this.onLinkChanged && this.onLinkChanged(), this.emitEvent("onLinkChanged")
    }, S.prototype.getLinkTo = function (t) {
        for (var e in this.links)
            if (this.links[e].portIn == t || this.links[e].portOut == t) return this.links[e]
    }, S.prototype.removeLinkTo = function (t) {
        for (var e in this.links)
            if (this.links[e].portIn == t || this.links[e].portOut == t) return this.links[e].remove(), this.onLinkChanged && this.onLinkChanged(), void this.emitEvent("onLinkChanged")
    }, S.prototype.isLinkedTo = function (t) {
        for (var e in this.links)
            if (this.links[e].portIn == t || this.links[e].portOut == t) return !0;
        return !1
    }, S.prototype.trigger = function () {
        if (0 !== this.links.length && this.parent.enabled) {
            var t = null;
            try {
                for (var e = 0; e < this.links.length; ++e) this.links[e].portIn && (t = this.links[e].portIn)._onTriggered(), this.links[e] && this.links[e].activity()
            } catch (e) {
                this.parent.enabled = !1, CABLES.UI && (this.parent.patch.emitEvent("exception".ex, t.parent), window.gui && gui.showOpCrash(t.parent)), console.log("exception!"), console.error("ontriggered exception cought", e), console.log(e.stack), console.log("exception in: " + t.parent.name)
            }
        }
    }, S.prototype.call = function () {
        console.log("call deprecated - use trigger() "), this.trigger()
    }, S.prototype.execute = function () {
        console.log("### execute port: " + this.getName(), this.goals.length)
    }, S.prototype.setAnimated = function (t) {
        this._animated != t && (this._animated = t, this._animated && !this.anim && (this.anim = new V), this._onAnimToggle())
    }, S.prototype.toggleAnim = function (t) {
        this._animated = !this._animated, this._animated && !this.anim && (this.anim = new V), this.setAnimated(this._animated), this._onAnimToggle()
    }, S.prototype.getType = function () {
        return this.type
    }, S.prototype.isLinked = function () {
        return this.links.length > 0
    }, S.prototype.isAnimated = function () {
        return this._animated
    }, S.prototype.isHidden = function () {
        return this.uiAttribs.hidePort
    }, S.prototype._onTriggered = function () {
        this.parent.updateAnims(), this.parent.enabled && this.onTriggered && this.onTriggered()
    }, S.prototype._onTriggeredProfiling = function () {
        this.parent.updateAnims(), this.parent.patch.profiler.add("port", this), this.parent.enabled && this.onTriggered && this.onTriggered(), this.parent.patch.profiler.add("port", null)
    }, S.prototype.onValueChange = function (t) {
        this.onChange = t
    }, S.prototype.getUiActiveState = function () {
        return this._uiActiveState
    }, S.prototype.setUiActiveState = function (t) {
        this._uiActiveState = t, this.onUiActiveStateChange && this.onUiActiveStateChange()
    }, S.portTypeNumberToString = function (t) {
        return t == M.OP.OP_PORT_TYPE_VALUE ? "value" : t == M.OP.OP_PORT_TYPE_FUNCTION ? "function" : t == M.OP.OP_PORT_TYPE_OBJECT ? "object" : t == M.OP.OP_PORT_TYPE_ARRAY ? "array" : t == M.OP.OP_PORT_TYPE_STRING ? "string" : t == M.OP.OP_PORT_TYPE_DYNAMIC ? "dynamic" : "unknown"
    };
    const C = {
        Key: function (t) {
            this.time = 0, this.value = 0, this.ui = {}, this.onChange = null, this._easing = 0, this.bezTime = .5, this.bezValue = 0, this.bezTimeIn = -.5, this.bezValueIn = 0, this.cb = null, this.cbTriggered = !1;
            this._updateBezier = !1, this.setEasing(M.ANIM.EASING_LINEAR), this.set(t)
        }
    };
    C.Key.linear = function (t, e, i) {
        return parseFloat(e.value) + parseFloat(i.value - e.value) * t
    }, C.Key.easeLinear = function (t, e) {
        return C.Key.linear(t, this, e)
    }, C.Key.easeAbsolute = function (t, e) {
        return this.value
    };
    const B = function (t) {
        return Math.pow(2, 10 * (t - 1))
    };
    C.Key.easeExpoIn = function (t, e) {
        return t = B(t), C.Key.linear(t, this, e)
    };
    const w = function (t) {
        return t = 1 - Math.pow(2, -10 * t)
    };
    C.Key.easeExpoOut = function (t, e) {
        return t = w(t), C.Key.linear(t, this, e)
    };
    const L = function (t) {
        return (t *= 2) < 1 ? t = .5 * Math.pow(2, 10 * (t - 1)) : (t--, t = .5 * (2 - Math.pow(2, -10 * t))), t
    };
    C.Key.easeExpoInOut = function (t, e) {
        return t = L(t), C.Key.linear(t, this, e)
    }, C.Key.easeSinIn = function (t, e) {
        return t = -1 * Math.cos(t * Math.PI / 2) + 1, C.Key.linear(t, this, e)
    }, C.Key.easeSinOut = function (t, e) {
        return t = Math.sin(t * Math.PI / 2), C.Key.linear(t, this, e)
    }, C.Key.easeSinInOut = function (t, e) {
        return t = -.5 * (Math.cos(Math.PI * t) - 1), C.Key.linear(t, this, e)
    };
    const k = function (t) {
        return t *= t * t
    };
    C.Key.easeCubicIn = function (t, e) {
        return t = k(t), C.Key.linear(t, this, e)
    }, C.Key.easeInQuint = function (t, e) {
        return t *= t * t * t * t, C.Key.linear(t, this, e)
    }, C.Key.easeOutQuint = function (t, e) {
        return t = (t -= 1) * t * t * t * t + 1, C.Key.linear(t, this, e)
    }, C.Key.easeInOutQuint = function (t, e) {
        return (t /= .5) < 1 ? t *= .5 * t * t * t * t : t = .5 * ((t -= 2) * t * t * t * t + 2), C.Key.linear(t, this, e)
    }, C.Key.easeInQuart = function (t, e) {
        return t *= t * t * t, C.Key.linear(t, this, e)
    }, C.Key.easeOutQuart = function (t, e) {
        return t = -1 * ((t -= 1) * t * t * t - 1), C.Key.linear(t, this, e)
    }, C.Key.easeInOutQuart = function (t, e) {
        return (t /= .5) < 1 ? t *= .5 * t * t * t : t = -.5 * ((t -= 2) * t * t * t - 2), C.Key.linear(t, this, e)
    }, C.Key.bounce = function (t) {
        return (t /= 1) < 1 / 2.75 ? t *= 7.5625 * t : t = t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, t
    }, C.Key.easeInBounce = function (t, e) {
        return C.Key.linear(C.Key.bounce(t), this, e)
    }, C.Key.easeOutBounce = function (t, e) {
        return C.Key.linear(C.Key.bounce(t), this, e)
    }, C.Key.easeInElastic = function (t, e) {
        var i = 1.70158,
            s = 0,
            r = 1;
        return 0 === t ? t = 0 : 1 == (t /= 1) ? t = 1 : (s || (s = .3), r < Math.abs(1) ? (r = 1, i = s / 4) : i = s / (2 * Math.PI) * Math.asin(1 / r), t = -r * Math.pow(2, 10 * (t -= 1)) * Math.sin((1 * t - i) * (2 * Math.PI) / s) + 0), C.Key.linear(t, this, e)
    }, C.Key.easeOutElastic = function (t, e) {
        var i = 1.70158,
            s = 0,
            r = 1;
        return 0 === t ? t = 0 : 1 == (t /= 1) ? t = 1 : (s || (s = .3), r < Math.abs(1) ? (r = 1, i = s / 4) : i = s / (2 * Math.PI) * Math.asin(1 / r), t = r * Math.pow(2, -10 * t) * Math.sin((1 * t - i) * (2 * Math.PI) / s) + 1 + 0), C.Key.linear(t, this, e)
    }, C.Key.easeInBack = function (t, e) {
        var i = 1.70158;
        return t = t * t * ((i + 1) * t - i), C.Key.linear(t, this, e)
    }, C.Key.easeOutBack = function (t, e) {
        var i = 1.70158;
        return t = (t = t / 1 - 1) * t * ((i + 1) * t + i) + 1, C.Key.linear(t, this, e)
    }, C.Key.easeInOutBack = function (t, e) {
        var i = 1.70158;
        return t = (t /= .5) < 1 ? t * t * ((1 + (i *= 1.525)) * t - i) * .5 : .5 * ((t -= 2) * t * ((1 + (i *= 1.525)) * t + i) + 2), C.Key.linear(t, this, e)
    };
    const U = function (t) {
        return t = --t * t * t + 1
    };
    C.Key.easeCubicOut = function (t, e) {
        return t = U(t), C.Key.linear(t, this, e)
    };
    const D = function (t) {
        return (t *= 2) < 1 ? t *= .5 * t * t : t = .5 * ((t -= 2) * t * t + 2), t
    };
    C.Key.easeCubicInOut = function (t, e) {
        return t = D(t), C.Key.linear(t, this, e)
    }, C.Key.easeSmoothStep = function (t, e) {
        var i = Math.max(0, Math.min(1, t));
        return t = i * i * (3 - 2 * i), C.Key.linear(t, this, e)
    }, C.Key.easeSmootherStep = function (t, e) {
        var i = Math.max(0, Math.min(1, (t - 0) / 1));
        return t = i * i * i * (i * (6 * i - 15) + 10), C.Key.linear(t, this, e)
    }, C.Key.prototype.setEasing = function (t) {
        this._easing = t, this._easing == M.ANIM.EASING_ABSOLUTE ? this.ease = C.Key.easeAbsolute : this._easing == M.ANIM.EASING_SMOOTHSTEP ? this.ease = C.Key.easeSmoothStep : this._easing == M.ANIM.EASING_SMOOTHERSTEP ? this.ease = C.Key.easeSmootherStep : this._easing == M.ANIM.EASING_CUBIC_IN ? this.ease = C.Key.easeCubicIn : this._easing == M.ANIM.EASING_CUBIC_OUT ? this.ease = C.Key.easeCubicOut : this._easing == M.ANIM.EASING_CUBIC_INOUT ? this.ease = C.Key.easeCubicInOut : this._easing == M.ANIM.EASING_EXPO_IN ? this.ease = C.Key.easeExpoIn : this._easing == M.ANIM.EASING_EXPO_OUT ? this.ease = C.Key.easeExpoOut : this._easing == M.ANIM.EASING_EXPO_INOUT ? this.ease = C.Key.easeExpoInOut : this._easing == M.ANIM.EASING_SIN_IN ? this.ease = C.Key.easeSinIn : this._easing == M.ANIM.EASING_SIN_OUT ? this.ease = C.Key.easeSinOut : this._easing == M.ANIM.EASING_SIN_INOUT ? this.ease = C.Key.easeSinInOut : this._easing == M.ANIM.EASING_BACK_OUT ? this.ease = C.Key.easeOutBack : this._easing == M.ANIM.EASING_BACK_IN ? this.ease = C.Key.easeInBack : this._easing == M.ANIM.EASING_BACK_INOUT ? this.ease = C.Key.easeInOutBack : this._easing == M.ANIM.EASING_ELASTIC_IN ? this.ease = C.Key.easeInElastic : this._easing == M.ANIM.EASING_ELASTIC_OUT ? this.ease = C.Key.easeOutElastic : this._easing == M.ANIM.EASING_BOUNCE_IN ? this.ease = C.Key.easeInBounce : this._easing == M.ANIM.EASING_BOUNCE_OUT ? this.ease = C.Key.easeOutBounce : this._easing == M.ANIM.EASING_QUART_OUT ? this.ease = C.Key.easeOutQuart : this._easing == M.ANIM.EASING_QUART_IN ? this.ease = C.Key.easeInQuart : this._easing == M.ANIM.EASING_QUART_INOUT ? this.ease = C.Key.easeInOutQuart : this._easing == M.ANIM.EASING_QUINT_OUT ? this.ease = C.Key.easeOutQuint : this._easing == M.ANIM.EASING_QUINT_IN ? this.ease = C.Key.easeInQuint : this._easing == M.ANIM.EASING_QUINT_INOUT ? this.ease = C.Key.easeInOutQuint : this._easing == M.ANIM.EASING_BEZIER ? (this._updateBezier = !0, this.ease = C.Key.easeBezier) : (this._easing = M.ANIM.EASING_LINEAR, this.ease = C.Key.easeLinear)
    }, C.Key.prototype.trigger = function () {
        this.cb(), this.cbTriggered = !0
    }, C.Key.prototype.setValue = function (t) {
        this.value = t, this._updateBezier = !0, null !== this.onChange && this.onChange()
    }, C.Key.prototype.set = function (t) {
        t && (t.e && this.setEasing(t.e), t.cb && (this.cb = t.cb, this.cbTriggered = !1), t.b && (this.bezTime = t.b[0], this.bezValue = t.b[1], this.bezTimeIn = t.b[2], this.bezValueIn = t.b[3], this._updateBezier = !0), t.hasOwnProperty("t") && (this.time = t.t), t.hasOwnProperty("time") && (this.time = t.time), t.hasOwnProperty("v") ? this.value = t.v : t.hasOwnProperty("value") && (this.value = t.value)), null !== this.onChange && this.onChange()
    }, C.Key.prototype.getSerialized = function () {
        var t = {};
        return t.t = this.time, t.v = this.value, t.e = this._easing, this._easing == M.ANIM.EASING_BEZIER && (t.b = [this.bezTime, this.bezValue, this.bezTimeIn, this.bezValueIn]), t
    }, C.Key.prototype.getEasing = function () {
        return this._easing
    };
    const V = function (t) {
        this.keys = [], this.onChange = null, this.stayInTimeline = !1, this.loop = !1, this.defaultEasing = M.ANIM.EASING_LINEAR, this.onLooped = null, this._timesLooped = 0, this._needsSort = !1
    };
    V.prototype.forceChangeCallback = function () {
        null !== this.onChange && this.onChange()
    }, V.prototype.hasEnded = function (t) {
        return 0 === this.keys.length || this.keys[this.keys.length - 1].time <= t
    }, V.prototype.isRising = function (t) {
        if (this.hasEnded(t)) return !1;
        var e = this.getKeyIndex(t);
        return this.keys[e].value < this.keys[e + 1].value
    }, V.prototype.clear = function (t) {
        var e = 0;
        t && (e = this.getValue(t)), this.keys.length = 0, t && this.setValue(t, e), null !== this.onChange && this.onChange()
    }, V.prototype.sortKeys = function () {
        this.keys.sort((t, e) => parseFloat(t.time) - parseFloat(e.time)), this._needsSort = !1
    }, V.prototype.getLength = function () {
        return 0 === this.keys.length ? 0 : this.keys[this.keys.length - 1].time
    }, V.prototype.getKeyIndex = function (t) {
        for (var e = 0, i = 0; i < this.keys.length; i++)
            if (t >= this.keys[i].time && (e = i), this.keys[i].time > t) return e;
        return e
    }, V.prototype.setValue = function (t, e, i) {
        var s = !1;
        for (var r in this.keys)
            if (this.keys[r].time == t) {
                s = this.keys[r], this.keys[r].setValue(e), this.keys[r].cb = i;
                break
            } s || this.keys.push(new C.Key({
            time: t,
            value: e,
            e: this.defaultEasing,
            cb: i
        })), this.onChange && this.onChange(), this._needsSort = !0
    }, V.prototype.getSerialized = function () {
        var t = {
            keys: []
        };
        for (var e in t.loop = this.loop, this.keys) t.keys.push(this.keys[e].getSerialized());
        return t
    }, V.prototype.getKey = function (t) {
        var e = this.getKeyIndex(t);
        return this.keys[e]
    }, V.prototype.getNextKey = function (t) {
        var e = this.getKeyIndex(t) + 1;
        return e >= this.keys.length && (e = this.keys.length - 1), this.keys[e]
    }, V.prototype.isFinished = function (t) {
        return this.keys.length <= 0 || t > this.keys[this.keys.length - 1].time
    }, V.prototype.isStarted = function (t) {
        return !(this.keys.length <= 0) && t >= this.keys[0].time
    }, V.prototype.getValue = function (t) {
        if (0 === this.keys.length) return 0;
        if (this._needsSort && this.sortKeys(), t < this.keys[0].time) return this.keys[0].value;
        var e = this.keys.length - 1;
        this.loop && t > this.keys[e].time && (t / this.keys[e].time > this._timesLooped && (this._timesLooped++, this.onLooped && this.onLooped()), t = (t - this.keys[0].time) % (this.keys[e].time - this.keys[0].time), t += this.keys[0].time);
        var i = this.getKeyIndex(t);
        if (i >= e) return this.keys[e].cb && !this.keys[e].cbTriggered && this.keys[e].trigger(), this.keys[e].value;
        var s = parseInt(i, 10) + 1,
            r = this.keys[i],
            n = this.keys[s];
        if (r.cb && !r.cbTriggered && r.trigger(), !n) return -1;
        var o = (t - r.time) / (n.time - r.time);
        return r.ease(o, n)
    }, V.prototype.addKey = function (t) {
        void 0 === t.time ? console.log("key time undefined, ignoring!") : (this.keys.push(t), null !== this.onChange && this.onChange())
    }, V.prototype.easingFromString = function (t) {
        return "linear" == t ? M.ANIM.EASING_LINEAR : "absolute" == t ? M.ANIM.EASING_ABSOLUTE : "smoothstep" == t ? M.ANIM.EASING_SMOOTHSTEP : "smootherstep" == t ? M.ANIM.EASING_SMOOTHERSTEP : "Cubic In" == t ? M.ANIM.EASING_CUBIC_IN : "Cubic Out" == t ? M.ANIM.EASING_CUBIC_OUT : "Cubic In Out" == t ? M.ANIM.EASING_CUBIC_INOUT : "Expo In" == t ? M.ANIM.EASING_EXPO_IN : "Expo Out" == t ? M.ANIM.EASING_EXPO_OUT : "Expo In Out" == t ? M.ANIM.EASING_EXPO_INOUT : "Sin In" == t ? M.ANIM.EASING_SIN_IN : "Sin Out" == t ? M.ANIM.EASING_SIN_OUT : "Sin In Out" == t ? M.ANIM.EASING_SIN_INOUT : "Back In" == t ? M.ANIM.EASING_BACK_IN : "Back Out" == t ? M.ANIM.EASING_BACK_OUT : "Back In Out" == t ? M.ANIM.EASING_BACK_INOUT : "Elastic In" == t ? M.ANIM.EASING_ELASTIC_IN : "Elastic Out" == t ? M.ANIM.EASING_ELASTIC_OUT : "Bounce In" == t ? M.ANIM.EASING_BOUNCE_IN : "Bounce Out" == t ? M.ANIM.EASING_BOUNCE_OUT : "Quart Out" == t ? M.ANIM.EASING_QUART_OUT : "Quart In" == t ? M.ANIM.EASING_QUART_IN : "Quart In Out" == t ? M.ANIM.EASING_QUART_INOUT : "Quint Out" == t ? M.ANIM.EASING_QUINT_OUT : "Quint In" == t ? M.ANIM.EASING_QUINT_IN : "Quint In Out" == t ? M.ANIM.EASING_QUINT_INOUT : void 0
    }, V.prototype.createPort = function (t, e, i) {
        var s = t.addInPort(new S(t, e, M.OP.OP_PORT_TYPE_VALUE, {
            display: "dropdown",
            values: M.ANIM.EASINGS
        }));
        return s.set("linear"), s.defaultValue = "linear", s.onChange = function () {
            this.defaultEasing = this.easingFromString(s.get()), i && i()
        }.bind(this), s
    }, V.slerpQuaternion = function (t, e, i, s, r, n) {
        V.slerpQuaternion.q1 || (V.slerpQuaternion.q1 = quat.create(), V.slerpQuaternion.q2 = quat.create());
        var o = i.getKeyIndex(t),
            a = o + 1;
        if (a >= i.keys.length && (a = i.keys.length - 1), o == a) quat.set(e, i.keys[o].value, s.keys[o].value, r.keys[o].value, n.keys[o].value);
        else {
            var h = i.keys[o].time,
                l = (t - h) / (i.keys[a].time - h);
            quat.set(V.slerpQuaternion.q1, i.keys[o].value, s.keys[o].value, r.keys[o].value, n.keys[o].value), quat.set(V.slerpQuaternion.q2, i.keys[a].value, s.keys[a].value, r.keys[a].value, n.keys[a].value), quat.slerp(e, V.slerpQuaternion.q1, V.slerpQuaternion.q2, l)
        }
        return e
    };
    const G = C;
    G.Anim = V;
    const H = function (t) {
        this.portIn = null, this.portOut = null, this.scene = t, this.activityCounter = 0
    };
    H.prototype.setValue = function (t) {
        void 0 === t ? this._setValue() : this.portIn.set(t)
    }, H.prototype.activity = function () {
        this.activityCounter++
    }, H.prototype._setValue = function () {
        if (this.portOut) {
            var t = this.portOut.get();
            t == t && (this.portIn.type != M.OP.OP_PORT_TYPE_FUNCTION && this.activity(), this.portIn.get() !== t ? this.portIn.set(t) : this.portIn.changeAlways && this.portIn.set(t))
        } else this.remove()
    }, H.prototype.getOtherPort = function (t) {
        return t == this.portIn ? this.portOut : this.portIn
    }, H.prototype.remove = function () {
        this.portIn && this.portIn.removeLink(this), this.portOut && this.portOut.removeLink(this), this.scene && this.scene.emitEvent("onUnLink", this.portIn, this.portOut), this.portIn && this.portIn.type == M.OP.OP_PORT_TYPE_OBJECT && (this.portIn.set(null), this.portIn.links.length > 0 && this.portIn.set(this.portIn.links[0].getOtherPort(this.portIn).get())), this.portIn && this.portIn.parent._checkLinksNeededToWork(), this.portOut && this.portOut.parent._checkLinksNeededToWork(), this.portIn = null, this.portOut = null, this.scene = null
    }, H.prototype.link = function (t, e) {
        if (!H.canLink(t, e)) return console.log("cannot link ports!"), !1;
        t.direction == M.PORT.PORT_DIR_IN ? (this.portIn = t, this.portOut = e) : (this.portIn = e, this.portOut = t), t.addLink(this), e.addLink(this), this.setValue(), t.onLink && t.onLink(this), e.onLink && e.onLink(this), t.parent._checkLinksNeededToWork(), e.parent._checkLinksNeededToWork()
    }, H.prototype.getSerialized = function () {
        var t = {};
        return t.portIn = this.portIn.getName(), t.portOut = this.portOut.getName(), t.objIn = this.portIn.parent.id, t.objOut = this.portOut.parent.id, t
    }, H.canLinkText = function (t, e) {
        if (t.direction == e.direction) {
            var i = "(out)";
            return e.direction == M.PORT.PORT_DIR_IN && (i = "(in)"), "can not link: same direction " + i
        }
        return t.parent == e.parent ? "can not link: same op" : t.type != M.OP.OP_PORT_TYPE_DYNAMIC && e.type != M.OP.OP_PORT_TYPE_DYNAMIC && t.type != e.type ? "can not link: different type" : t ? e ? t.direction == M.PORT.PORT_DIR_IN && t.isAnimated() ? "can not link: is animated" : e.direction == M.PORT.PORT_DIR_IN && e.isAnimated() ? "can not link: is animated" : t.isLinkedTo(e) ? "ports already linked" : t.canLink && !t.canLink(e) || e.canLink && !e.canLink(t) ? "Incompatible" : "can link" : "can not link: port 2 invalid" : "can not link: port 1 invalid"
    }, H.canLink = function (t, e) {
        return !!t && (!!e && ((t.direction != M.PORT.PORT_DIR_IN || !t.isAnimated()) && ((e.direction != M.PORT.PORT_DIR_IN || !e.isAnimated()) && (!t.isHidden() && !e.isHidden() && (!t.isLinkedTo(e) && (t.direction != e.direction && ((t.type == e.type || t.type == M.OP.OP_PORT_TYPE_DYNAMIC || e.type == M.OP.OP_PORT_TYPE_DYNAMIC) && (t.type == M.OP.OP_PORT_TYPE_DYNAMIC || e.type == M.OP.OP_PORT_TYPE_DYNAMIC || t.parent != e.parent && (!(t.canLink && !t.canLink(e)) && !(e.canLink && !e.canLink(t)))))))))))
    };
    const Y = function () {
        if (this.data = {}, this.objName = "", this.portsOut = [], this.portsIn = [], this.portsInData = [], this.opId = "", this.uiAttribs = {}, this.enabled = !0, this.patch = arguments[0], this.name = arguments[1], this.errors = {}, this._needsLinkedToWork = [], this._needsParentOp = null, this._shortOpName = "", arguments[1]) {
            if (this._shortOpName = arguments[1].split(".")[arguments[1].split(".").length - 1], this._shortOpName.indexOf(M.OP.OP_VERSION_PREFIX) > 0) {
                var t = this._shortOpName.split(M.OP.OP_VERSION_PREFIX)[1];
                this._shortOpName = this._shortOpName.substring(0, this._shortOpName.length - (M.OP.OP_VERSION_PREFIX + t).length)
            }
            this.uiAttribs.title = this._shortOpName
        }
        this.id = arguments[2] || E(), this.onAddPort = null, this.onCreate = null, this.onResize = null, this.onLoaded = null, this.onDelete = null, this.onUiAttrChange = null, this._eventCallbacks = {}, this._instances = null, this.preRender = null, this.init = null
    }; {
        Y.prototype.clearUiAttrib = function (t) {
            var e = {
                name: null
            };
            this.uiAttrib(e)
        }, Y.prototype.setTitle = function (t) {
            var e = this.name != t;
            this.name = t, this.uiAttr({
                title: t
            }), e && this.fireEvent("onTitleChange", t)
        };
        const t = function (t) {
            for (var e in this.uiAttribs || (this.uiAttribs = {}), t) this.uiAttribs[e] = t[e];
            this.fireEvent("onUiAttribsChange", t)
        };
        Y.prototype.setUiAttrib = t, Y.prototype.uiAttr = t, Y.prototype.getName = function () {
            return this.uiAttribs.name ? this.uiAttribs.name : this.objName.split(".")
        }, Y.prototype.addOutPort = function (t) {
            return t.direction = M.PORT.PORT_DIR_OUT, t.parent = this, this.portsOut.push(t), this.onAddPort && this.onAddPort(t), t
        }, Y.prototype.hasPort = function (t) {
            for (var e = 0; e < this.portsIn.length; e++)
                if (this.portsIn[i].getName() == t) return !0;
            return !1
        }, Y.prototype.hasDynamicPort = function () {
            var t = 0;
            for (t = 0; t < this.portsIn.length; t++) {
                if (this.portsIn[t].type == M.OP.OP_PORT_TYPE_DYNAMIC) return !0;
                if ("dyn" == this.portsIn[t].getName()) return !0
            }
            for (t = 0; t < this.portsOut.length; t++) {
                if (this.portsOut[t].type == M.OP.OP_PORT_TYPE_DYNAMIC) return !0;
                if ("dyn" == this.portsOut[t].getName()) return !0
            }
            return !1
        }, Y.prototype.addInPort = function (t) {
            if (!(t instanceof S)) throw new Error("parameter is not a port!");
            return t.direction = M.PORT.PORT_DIR_IN, t.parent = this, this.portsIn.push(t), this.onAddPort && this.onAddPort(t), t
        }, Y.prototype.inFunction = Y.prototype.inTrigger = function (t, e) {
            var i = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_FUNCTION));
            return void 0 !== e && i.set(e), i
        }, Y.prototype.inFunctionButton = Y.prototype.inTriggerButton = function (t, e) {
            var i = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_FUNCTION, {
                display: "button"
            }));
            return void 0 !== e && i.set(e), i
        }, Y.prototype.inValueFloat = Y.prototype.inValue = Y.prototype.inFloat = function (t, e) {
            var i = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_VALUE));
            return void 0 !== e && (i.set(e), i.defaultValue = e), i
        }, Y.prototype.inValueBool = Y.prototype.inBool = function (t, e) {
            var i = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_VALUE, {
                display: "bool"
            }));
            return void 0 !== e && (i.set(e), i.defaultValue = e), i
        }, Y.prototype.inValueString = function (t, e) {
            var i = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_VALUE, {
                type: "string"
            }));
            return i.value = "", void 0 !== e && (i.set(e), i.defaultValue = e), i
        }, Y.prototype.inString = function (t, e) {
            var i = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_STRING, {
                type: "string"
            }));
            return e = e || "", i.value = e, i.set(e), i.defaultValue = e, i
        }, Y.prototype.inValueText = function (t, e) {
            var i = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_VALUE, {
                type: "string",
                display: "text"
            }));
            return i.value = "", void 0 !== e && (i.set(e), i.defaultValue = e), i
        }, Y.prototype.inStringEditor = function (t, e, i) {
            var s = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_STRING, {
                type: "string",
                display: "editor",
                editorSyntax: i
            }));
            return s.value = "", void 0 !== e && (s.set(e), s.defaultValue = e), s
        }, Y.prototype.inValueEditor = function (t, e, i) {
            var s = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_VALUE, {
                type: "string",
                display: "editor",
                editorSyntax: i
            }));
            return s.value = "", void 0 !== e && (s.set(e), s.defaultValue = e), s
        }, Y.prototype.inValueSelect = Y.prototype.inDropDown = function (t, e, i) {
            var s = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_VALUE, {
                display: "dropdown",
                hidePort: !0,
                values: e
            }));
            return void 0 !== i && (s.set(i), s.defaultValue = i), s
        }, Y.prototype.inSwitch = function (t, e, i) {
            var s = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_STRING, {
                display: "switch",
                hidePort: !0,
                type: "string",
                values: e
            }));
            return void 0 !== i && (s.set(i), s.defaultValue = i), s
        }, Y.prototype.inValueInt = Y.prototype.inInt = function (t, e) {
            var i = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_VALUE, {
                increment: "integer"
            }));
            return void 0 !== e && (i.set(e), i.defaultValue = e), i
        }, Y.prototype.inFile = function (t, e, i) {
            var s = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_VALUE, {
                display: "file",
                filter: e
            }));
            return void 0 !== i && (s.set(i), s.defaultValue = i), s
        }, Y.prototype.inUrl = function (t, e, i) {
            var s = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_STRING, {
                display: "file",
                filter: e
            }));
            return void 0 !== i && (s.set(i), s.defaultValue = i), s
        }, Y.prototype.inTexture = function (t, e) {
            var i = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_OBJECT, {
                display: "texture",
                preview: !0
            }));
            return void 0 !== e && i.set(e), i
        }, Y.prototype.inObject = function (t, e, i) {
            var s = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_OBJECT, i));
            return void 0 !== e && s.set(e), s
        }, Y.prototype.inGradient = function (t, e) {
            var i = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_VALUE, {
                display: "gradient",
                hidePort: !0
            }));
            return void 0 !== e && i.set(e), i
        }, Y.prototype.inArray = function (t, e) {
            var i = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_ARRAY));
            return void 0 !== e && i.set(e), i
        }, Y.prototype.inValueSlider = Y.prototype.inFloatSlider = function (t, e) {
            var i = this.addInPort(new S(this, t, M.OP.OP_PORT_TYPE_VALUE, {
                display: "range"
            }));
            return void 0 !== e && (i.set(e), i.defaultValue = e), i
        }, Y.prototype.outFunction = Y.prototype.outTrigger = function (t, e) {
            var i = this.addOutPort(new S(this, t, M.OP.OP_PORT_TYPE_FUNCTION));
            return void 0 !== e && i.set(e), i
        }, Y.prototype.outValue = Y.prototype.outNumber = function (t, e) {
            var i = this.addOutPort(new S(this, t, M.OP.OP_PORT_TYPE_VALUE));
            return void 0 !== e && i.set(e), i
        }, Y.prototype.outValueBool = Y.prototype.outBool = function (t, e) {
            var i = this.addOutPort(new S(this, t, M.OP.OP_PORT_TYPE_VALUE, {
                display: "bool"
            }));
            return void 0 !== e ? i.set(e) : i.set(!1), i
        }, Y.prototype.outValueString = function (t, e) {
            var i = this.addOutPort(new S(this, t, M.OP.OP_PORT_TYPE_VALUE, {
                type: "string"
            }));
            return void 0 !== e && i.set(e), i
        }, Y.prototype.outString = function (t, e) {
            var i = this.addOutPort(new S(this, t, M.OP.OP_PORT_TYPE_STRING, {
                type: "string"
            }));
            return void 0 !== e ? i.set(e) : i.set(""), i
        }, Y.prototype.outObject = function (t, e) {
            var i = this.addOutPort(new S(this, t, M.OP.OP_PORT_TYPE_OBJECT));
            return void 0 !== e && i.set(e), i.ignoreValueSerialize = !0, i
        }, Y.prototype.outArray = function (t, e) {
            var i = this.addOutPort(new S(this, t, M.OP.OP_PORT_TYPE_ARRAY));
            return void 0 !== e && i.set(e), i.ignoreValueSerialize = !0, i
        }, Y.prototype.outTexture = function (t, e) {
            var i = this.addOutPort(new S(this, t, M.OP.OP_PORT_TYPE_OBJECT, {
                preview: !0
            }));
            return void 0 !== e && i.set(e), i.ignoreValueSerialize = !0, i
        }, Y.prototype.inDynamic = function (t, e, i, s) {
            var r = new S(this, t, M.OP.OP_PORT_TYPE_DYNAMIC, i);
            return r.shouldLink = function (t, i) {
                if (e && g.isArray(e)) {
                    for (var s = 0; s < e.length; s++) {
                        if (t == this && i.type === e[s]) return !0;
                        if (i == this && t.type === e[s]) return !0
                    }
                    return !1
                }
                return !0
            }, this.addInPort(r), void 0 !== s && (r.set(s), r.defaultValue = s), r
        }, Y.prototype.printInfo = function () {
            for (var t = 0; t < this.portsIn.length; t++) console.log("in: " + this.portsIn[t].getName());
            for (var e in this.portsOut) console.log("out: " + this.portsOut[e].getName())
        }, Y.prototype.getOutChilds = function () {
            var t = [];
            for (var e in this.portsOut)
                for (var i in this.portsOut[e].links) this.portsOut[e].type == M.OP.OP_PORT_TYPE_FUNCTION && t.push(this.portsOut[e].links[i].portIn.parent);
            return t
        }, Y.prototype.markChilds = function () {
            for (var t in this.marked = !0, this.portsOut)
                for (var e in this.portsOut[t].links) this.portsOut[t].parent.marked = !0, this.portsOut[t].links[e].portIn.parent != this && this.portsOut[t].links[e].portIn.parent.markChilds()
        }, Y.prototype.deleteChilds = function () {
            var t = [];
            for (var e in this.portsOut)
                for (var i in this.portsOut[e].links) this.portsOut[e].links[i].portIn.parent != this && (this.portsOut[e].parent != this && t.push(this.portsOut[e].parent), t.push(this.portsOut[e].links[i].portIn.parent), this.portsOut[e].links[i].portIn.parent.deleteChilds());
            for (var s in t) this.patch.deleteOp(t[s].id)
        }, Y.prototype.removeLinks = function () {
            for (var t = 0; t < this.portsIn.length; t++) this.portsIn[t].removeLinks();
            for (var e = 0; e < this.portsOut.length; e++) this.portsOut[e].removeLinks()
        }, Y.prototype.countFittingPorts = function (t) {
            var e = 0;
            for (var i in this.portsOut) H.canLink(t, this.portsOut[i]) && e++;
            for (var s in this.portsIn) H.canLink(t, this.portsIn[s]) && e++;
            return e
        }, Y.prototype.findFittingPort = function (t) {
            for (var e in this.portsOut)
                if (H.canLink(t, this.portsOut[e])) return this.portsOut[e];
            for (var i in this.portsIn)
                if (H.canLink(t, this.portsIn[i])) return this.portsIn[i]
        }, Y.prototype.getSerialized = function () {
            var t = {};
            this.opId && (t.opId = this.opId), t.objName = this.objName, t.id = this.id, t.uiAttribs = this.uiAttribs, this.uiAttribs.title == this._shortOpName && delete this.uiAttribs.title, this.uiAttribs.hasOwnProperty("working") && 1 == this.uiAttribs.working && delete this.uiAttribs.working, t.portsIn = [], t.portsOut = [];
            for (var e = 0; e < this.portsIn.length; e++) t.portsIn.push(this.portsIn[e].getSerialized());
            for (var i in this.portsOut) t.portsOut.push(this.portsOut[i].getSerialized());
            return t
        }, Y.prototype.getFirstOutPortByType = function (t) {
            for (var e in this.portsOut)
                if (this.portsOut[e].type == t) return this.portsOut[e]
        }, Y.prototype.getPort = Y.prototype.getPortByName = function (t) {
            for (var e = 0; e < this.portsIn.length; e++)
                if (this.portsIn[e].getName() == t) return this.portsIn[e];
            for (var i = 0; i < this.portsOut.length; i++)
                if (this.portsOut[i].getName() == t) return this.portsOut[i]
        }, Y.prototype.getPortById = function (t) {
            for (var e = 0; e < this.portsIn.length; e++)
                if (this.portsIn[e].id == t) return this.portsIn[e];
            for (var i = 0; i < this.portsOut.length; i++)
                if (this.portsOut[i].id == t) return this.portsOut[i]
        }, Y.prototype.updateAnims = function () {
            for (var t = 0; t < this.portsIn.length; t++) this.portsIn[t].updateAnim()
        }, Y.prototype.log = function () {
            this.patch.silent || Function.prototype.apply.apply(console.log, [console, arguments])
        }, Y.prototype.error = function () {
            this.patch.silent || Function.prototype.apply.apply(console.error, [console, arguments])
        }, Y.prototype.warn = function () {
            this.patch.silent || Function.prototype.apply.apply(console.warn, [console, arguments])
        }, Y.prototype.undoUnLinkTemporary = function () {
            if (this.shakeLink && this.shakeLink.remove(), this.shakeLink = null, this.oldLinks) {
                for (var t = 0; t < this.oldLinks.length; t++) this.patch.link(this.oldLinks[t].in.parent, this.oldLinks[t].in.getName(), this.oldLinks[t].out.parent, this.oldLinks[t].out.getName());
                this.oldLinks.length = 0
            }
        }, Y.prototype.unLink = function () {
            for (var t = 0; t < this.portsOut.length; t++) this.portsOut[t].removeLinks();
            for (var e = 0; e < this.portsIn.length; e++) this.portsIn[e].removeLinks()
        }, Y.unLinkTempReLinkP1 = null, Y.unLinkTempReLinkP2 = null, Y.prototype.unLinkTemporary = function () {
            var t = 0;
            this.shakeLink = null, this.oldLinks = [], this.portsIn.length > 0 && this.portsIn[0].isLinked() && this.portsOut.length > 0 && this.portsOut[0].isLinked() && this.portsIn[0].getType() == this.portsOut[0].getType() && (Y.unLinkTempReLinkP1 = this.portsIn[0].links[0].getOtherPort(this.portsIn[0]), Y.unLinkTempReLinkP2 = this.portsOut[0].links[0].getOtherPort(this.portsOut[0]));
            for (var e = 0; e < this.portsIn.length; e++)
                for (t = 0; t < this.portsIn[e].links.length; t++) this.oldLinks.push({
                    in: this.portsIn[e].links[t].portIn,
                    out: this.portsIn[e].links[t].portOut
                });
            for (var i = 0; i < this.portsOut.length; i++)
                for (t = 0; t < this.portsOut[i].links.length; t++) this.oldLinks.push({
                    in: this.portsOut[i].links[t].portIn,
                    out: this.portsOut[i].links[t].portOut
                });
            this.unLink(), Y.unLinkTempReLinkP1 && Y.unLinkTempReLinkP2 && (this.shakeLink = this.patch.link(Y.unLinkTempReLinkP1.parent, Y.unLinkTempReLinkP1.getName(), Y.unLinkTempReLinkP2.parent, Y.unLinkTempReLinkP2.getName()))
        }, Y.prototype.profile = function (t) {
            for (var e = 0; e < this.portsIn.length; e++) this.portsIn[e]._onTriggered = this.portsIn[e]._onTriggeredProfiling
        }, Y.prototype.findParent = function (t) {
            for (var e = 0; e < this.portsIn.length; e++)
                if (this.portsIn[e].isLinked()) {
                    if (this.portsIn[e].links[0].portOut.parent.objName == t) return this.portsIn[e].links[0].portOut.parent;
                    var i;
                    if (i = this.portsIn[e].links[0].portOut.parent.findParent(t)) return i
                } return null
        }, Y.prototype.cleanUp = function () {
            if (this._instances) {
                for (var t = 0; t < this._instances.length; t++) this._instances[t].onDelete && this._instances[t].onDelete();
                this._instances.length = 0
            }
        }, Y.prototype.instanced = function (t) {
            if (0 === this.patch.instancing.numCycles()) return !1;
            var e = 0,
                i = 0;
            if (!this._instances || this._instances.length != this.patch.instancing.numCycles()) {
                for (this._instances || (this._instances = []), console.log("creating instances of ", this.objName, this.patch.instancing.numCycles(), this._instances.length), this._instances.length = this.patch.instancing.numCycles(), e = 0; e < this._instances.length; e++) {
                    this._instances[e] = this.patch.createOp(this.objName, !0), this._instances[e].instanced = function () {
                        return !1
                    }, this._instances[e].uiAttr(this.uiAttribs);
                    for (var s = 0; s < this.portsOut.length; s++) this.portsOut[s].type == M.OP.OP_PORT_TYPE_FUNCTION && (this._instances[e].getPortByName(this.portsOut[s].name).trigger = this.portsOut[s].trigger.bind(this.portsOut[s]))
                }
                for (i = 0; i < this.portsIn.length; i++) this.portsIn[i].onChange = null, this.portsIn[i].onValueChanged = null
            }
            for (i = 0; i < this.portsIn.length; i++) this.portsIn[i].type != M.OP.OP_PORT_TYPE_VALUE && this.portsIn[i].type != M.OP.OP_PORT_TYPE_ARRAY || this._instances[this.patch.instancing.index()].portsIn[i].set(this.portsIn[i].get()), this.portsIn[i].type, M.OP.OP_PORT_TYPE_FUNCTION;
            for (i = 0; i < this.portsOut.length; i++) this.portsOut[i].type == M.OP.OP_PORT_TYPE_VALUE && this.portsOut[i].set(this._instances[this.patch.instancing.index()].portsOut[i].get());
            return !0
        }, Y.prototype.initInstancable = function () {}, Y.prototype.setValues = function (t) {
            for (var e in t) {
                var i = this.getPortByName(e);
                i ? i.set(t[e]) : console.log("op.setValues: port not found:", e)
            }
        }, Y.prototype.error = function (t, e) {
            this.errors[t] = e, null == e && delete this.errors[t];
            var i = "";
            for (var s in this.errors) i += "- " + this.errors[s] + "<br/>";
            this.uiAttr({
                error: i
            })
        }, Y.prototype.addListener = Y.prototype.addEventListener = function (t, e) {
            this._eventCallbacks[t] ? this._eventCallbacks[t].push(e) : this._eventCallbacks[t] = [e]
        }, Y.prototype.hasEventListener = function (t, e) {
            if (t && e) {
                if (this._eventCallbacks[t]) return -1 != this._eventCallbacks[t].indexOf(e)
            } else console.log("hasListener: missing parameters")
        }, Y.prototype.removeEventListener = function (t, e) {
            if (this._eventCallbacks[t]) {
                var i = this._eventCallbacks[t].indexOf(e); - 1 == i ? console.log("eventlistener " + t + " not found...") : this._eventCallbacks[t].slice(i)
            }
        }, Y.prototype.fireEvent = function (t, e) {
            if (this._eventCallbacks[t])
                for (var i = 0; i < this._eventCallbacks[t].length; i++) this._eventCallbacks[t][i] && this._eventCallbacks[t][i](e);
            this.onUiAttrChange && "onUiAttribsChange" == t && this.onUiAttrChange(e)
        }, Y.prototype.setEnabled = function (t) {
            this.enabled = t, this.fireEvent("onEnabledChange", t)
        }, Y.prototype.setPortGroup = function (t, e) {
            for (var i = 0; i < e.length; i++) e[i] && e[i].setUiAttribs ? e[i].setUiAttribs({
                group: t
            }) : console.error("setPortGroup: invalid port!")
        }, Y.prototype.setUiAxisPorts = function (t, e, i) {
            t && t.setUiAttribs({
                axis: "X"
            }), e && e.setUiAttribs({
                axis: "Y"
            }), i && i.setUiAttribs({
                axis: "Z"
            })
        }, Y.prototype.removePort = function (t) {
            for (var e = 0; e < this.portsIn.length; e++)
                if (this.portsIn[e] == t) return this.portsIn.splice(e, 1), this.fireEvent("onUiAttribsChange", {}), void this.fireEvent("onPortRemoved", {})
        }, Y.prototype.checkLinkTimeWarnings = function () {
            function t(e, i, s) {
                for (var r = 0; r < e.portsIn.length; r++)
                    if (e.portsIn[r].type == i && e.portsIn[r].isLinked())
                        for (var n = e.portsIn[r], o = 0; o < n.links.length; o++)
                            if (n.links[o]) {
                                if (n.links[o].portOut.parent.objName.indexOf(s) > -1) return !0;
                                if (t(n.links[o].portOut.parent, i, s)) return !0
                            } return !1
            }
            var e, i = null,
                s = !0;
            if (s && 0 == this.objName.indexOf("Ops.Gl.TextureEffects") && ((e = this).portsIn.length > 0 && e.portsIn[0].type == M.OP.OP_PORT_TYPE_FUNCTION) && -1 == this.objName.indexOf("TextureEffects.ImageCompose") && ((s = t(this, M.OP.OP_PORT_TYPE_FUNCTION, "TextureEffects.ImageCompose")) || (i = CABLES.UI.TEXTS.working_connected_to + "ImageCompose")), this._needsParentOp && s && ((s = t(this, M.OP.OP_PORT_TYPE_OBJECT, this._needsParentOp)) || (i = CABLES.UI.TEXTS.working_connected_to + this._needsParentOp)), this._needsLinkedToWork.length > 0)
                for (var r = 0; r < this._needsLinkedToWork.length; r++) {
                    var n = this._needsLinkedToWork[r];
                    n ? n.isLinked() || (s = !1, i ? i += ", " : i = CABLES.UI.TEXTS.working_connected_needs_connections_to, i += n.name.toUpperCase()) : console.warn("[needsLinkedToWork] port not found")
                }
            s ? this.uiAttribs.working || this.setUiAttrib({
                working: !0,
                notWorkingMsg: null
            }) : this.setUiAttrib({
                working: s,
                notWorkingMsg: i
            })
        }, Y.prototype._checkLinksNeededToWork = function () {}, Y.prototype.toWorkNeedsParent = function (t) {
            this.patch.isEditorMode() && (this._needsParentOp = t)
        }, Y.prototype.toWorkPortsNeedToBeLinked = function () {
            if (this.patch.isEditorMode())
                for (var t = 0; t < arguments.length; t++) - 1 == this._needsLinkedToWork.indexOf(arguments[t]) && this._needsLinkedToWork.push(arguments[t])
        }, Y.prototype.toWorkPortsNeedToBeLinkedReset = function () {
            this.patch.isEditorMode() && (this._needsLinkedToWork.length = 0, this.checkLinkTimeWarnings())
        }, Y.prototype.refreshParams = function () {
            CABLES.UI && gui && gui.patch().refreshOpParams(this)
        }
    }
    Y.getNamespaceClassName = function (t) {
        return t ? t.startsWith("Ops.Gl") ? "gl" : t.startsWith("Ops.WebAudio") ? "audio" : t.startsWith("Ops.Devices") ? "devices" : t.startsWith("Ops.Html") ? "html" : t.startsWith("Ops.Sidebar") ? "html" : t.startsWith("Ops.Math") ? "math" : t.startsWith("Ops.User") ? "user" : "default" : "default"
    }, Y.isSubpatchOp = function (t) {
        return "Ops.Ui.Patch" == t || "Ops.Ui.SubPatch" == t
    };
    const z = new function () {
        this.profileUniformCount = 0, this.profileShaderBinds = 0, this.profileUniformCount = 0, this.profileShaderCompiles = 0, this.profileVideosPlaying = 0, this.profileMVPMatrixCount = 0, this.profileEffectBuffercreate = 0
    };
    var W = null,
        K = null,
        X = null,
        j = null;
    const Q = function (t, e) {
        if (!t) throw "no cgl";
        this._cgl = t, this.tex = this._cgl.gl.createTexture(), this.id = E(), this.width = 0, this.height = 0, this.flip = !0, this.shadowMap = !1, this.filter = Q.FILTER_NEAREST, this.wrap = Q.WRAP_CLAMP_TO_EDGE, this.texTarget = this._cgl.gl.TEXTURE_2D, e && e.type && (this.texTarget = e.type), this.textureType = Q.TYPE_DEFAULT, this.unpackAlpha = !0, this._fromData = !0, this.name = "unknown", e ? (this.name = e.name || this.name, e.isDepthTexture && (this.textureType = Q.TYPE_DEPTH), e.isFloatingPointTexture && (this.textureType = Q.TYPE_FLOAT), "textureType" in e && (this.textureType = e.textureType), "filter" in e && (this.filter = e.filter), "wrap" in e && (this.wrap = e.wrap), "unpackAlpha" in e && (this.unpackAlpha = e.unpackAlpha), "flip" in e && (this.flip = e.flip), "shadowMap" in e && (this.shadowMap = e.shadowMap)) : e = {
            width: 8,
            height: 8
        }, this.setSize(e.width, e.height)
    };
    Q.prototype.compareSettings = function (t) {
        return !!t && (t.width == this.width && t.height == this.height && t.filter == this.filter && t.wrap == this.wrap && t.textureType == this.textureType && t.unpackAlpha == this.unpackAlpha && t.flip == this.flip)
    }, Q.prototype.clone = function () {
        var t = new Q(this._cgl, {
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
    }, Q.prototype.setSize = function (t, e) {
        if ((t != t || t <= 0 || !t) && (t = 8), (e != e || e <= 0 || !e) && (e = 8), t = Math.floor(t), e = Math.floor(e), this.width != t || this.height != e) {
            this.width = t, this.height = e, this._cgl.gl.bindTexture(this.texTarget, this.tex), z.profileTextureResize++;
            if (this.textureType == Q.TYPE_FLOAT && (this.filter = Q.FILTER_NEAREST), this._setFilter(), this.textureType == Q.TYPE_FLOAT)
                if (1 == this._cgl.glVersion)
                    if (this._cgl.glUseHalfFloatTex) {
                        var i = this._cgl.gl.getExtension("OES_texture_half_float");
                        if (1 == this._cgl.glVersion && !i) throw "no half float texture extension";
                        this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA, t, e, 0, this._cgl.gl.RGBA, i.HALF_FLOAT_OES, null)
                    } else {
                        i = this._cgl.gl.getExtension("OES_texture_float");
                        this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA, t, e, 0, this._cgl.gl.RGBA, this._cgl.gl.FLOAT, null)
                    }
            else this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA32F, t, e, 0, this._cgl.gl.RGBA, this._cgl.gl.FLOAT, null);
            else if (this.textureType == Q.TYPE_DEPTH)
                if (1 == this._cgl.glVersion) {
                    var s = this._cgl.gl.DEPTH_COMPONENT;
                    this._cgl.gl.texImage2D(this.texTarget, 0, s, t, e, 0, this._cgl.gl.DEPTH_COMPONENT, this._cgl.gl.UNSIGNED_SHORT, null)
                } else {
                    s = this._cgl.gl.DEPTH_COMPONENT32F;
                    this._cgl.gl.texImage2D(this.texTarget, 0, s, t, e, 0, this._cgl.gl.DEPTH_COMPONENT, this._cgl.gl.FLOAT, null)
                }
            else this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA, t, e, 0, this._cgl.gl.RGBA, this._cgl.gl.UNSIGNED_BYTE, null);
            this.updateMipMap(), this._cgl.gl.bindTexture(this.texTarget, null)
        }
    }, Q.prototype.initFromData = function (t, e, i, s, r) {
        this.filter = s, this.wrap = r, null == s && (this.filter = Q.FILTER_LINEAR), null == r && (this.wrap = Q.CLAMP_TO_EDGE), this.width = e, this.height = i, this._fromData = !0, this._cgl.gl.bindTexture(this.texTarget, this.tex), this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA, e, i, 0, this._cgl.gl.RGBA, this._cgl.gl.UNSIGNED_BYTE, t), this._setFilter(), this.updateMipMap(), this._cgl.gl.bindTexture(this.texTarget, null)
    }, Q.prototype.updateMipMap = function () {
        2 != this._cgl.glVersion && !this.isPowerOfTwo() || this.filter != Q.FILTER_MIPMAP || this._cgl.gl.generateMipmap(this.texTarget)
    }, Q.prototype.initTexture = function (t, e) {
        this._fromData = !1, this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.unpackAlpha), t.width && (this.width = t.width), t.height && (this.height = t.height), e && (this.filter = e), this._cgl.gl.bindTexture(this.texTarget, this.tex), this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_FLIP_Y_WEBGL, !this.flip), this._cgl.gl.texImage2D(this.texTarget, 0, this._cgl.gl.RGBA, this._cgl.gl.RGBA, this._cgl.gl.UNSIGNED_BYTE, t), this._setFilter(), this.updateMipMap(), this._cgl.gl.bindTexture(this.texTarget, null), this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1)
    }, Q.prototype.delete = function () {
        z.profileTextureDelete++, this._cgl.gl.deleteTexture(this.tex)
    }, Q.prototype.isPowerOfTwo = function () {
        return Q.isPowerOfTwo(this.width) && Q.isPowerOfTwo(this.height)
    }, Q.prototype.printInfo = function () {
        console.log(this.getInfo())
    }, Q.prototype.getInfoReadable = function () {
        var t = this.getInfo(),
            e = "";
        for (var i in t.name = t.name.substr(0, t.name.indexOf("?rnd=")), t) e += "* " + i + ":  **" + t[i] + "**\n";
        return e
    }, Q.prototype.getInfo = function () {
        var t = {};
        t.name = this.name, t["power of two"] = this.isPowerOfTwo(), t.size = this.width + " x " + this.height;
        var e = this.texTarget;
        return this.texTarget == this._cgl.gl.TEXTURE_2D && (e = "TEXTURE_2D"), t.target = e, t.unpackAlpha = this.unpackAlpha, this.textureType == Q.TYPE_FLOAT ? t.textureType = "TYPE_FLOAT" : this.textureType == Q.TYPE_DEPTH ? t.textureType = "TYPE_DEPTH" : this.textureType == Q.TYPE_DEFAULT ? t.textureType = "TYPE_DEFAULT" : t.textureType = "UNKNOWN", this.wrap == Q.WRAP_CLAMP_TO_EDGE ? t.wrap = "CLAMP_TO_EDGE" : this.wrap == Q.WRAP_REPEAT ? t.wrap = "WRAP_REPEAT" : this.wrap == Q.WRAP_MIRRORED_REPEAT ? t.wrap = "WRAP_MIRRORED_REPEAT" : t.wrap = "UNKNOWN", this.filter == Q.FILTER_NEAREST ? t.filter = "FILTER_NEAREST" : this.filter == Q.FILTER_LINEAR ? t.filter = "FILTER_LINEAR" : this.filter == Q.FILTER_MIPMAP ? t.filter = "FILTER_MIPMAP" : t.filter = "UNKNOWN", t
    }, Q.prototype._setFilter = function () {
        if (this._fromData || this._cgl.gl.pixelStorei(this._cgl.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.unpackAlpha), this.shadowMap && (console.log("shadowmap tex"), this._cgl.gl.texParameteri(this._cgl.gl.TEXTURE_2D, this._cgl.gl.TEXTURE_COMPARE_MODE, this._cgl.gl.COMPARE_REF_TO_TEXTURE), this._cgl.gl.texParameteri(this._cgl.gl.TEXTURE_2D, this._cgl.gl.TEXTURE_COMPARE_FUNC, this._cgl.gl.LEQUAL)), 1 != this._cgl.glVersion || this.isPowerOfTwo())
            if (this.wrap == Q.WRAP_CLAMP_TO_EDGE ? (this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_S, this._cgl.gl.CLAMP_TO_EDGE), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_T, this._cgl.gl.CLAMP_TO_EDGE)) : this.wrap == Q.WRAP_REPEAT ? (this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_S, this._cgl.gl.REPEAT), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_T, this._cgl.gl.REPEAT)) : this.wrap == Q.WRAP_MIRRORED_REPEAT && (this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_S, this._cgl.gl.MIRRORED_REPEAT), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_T, this._cgl.gl.MIRRORED_REPEAT)), this.filter == Q.FILTER_NEAREST) this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MAG_FILTER, this._cgl.gl.NEAREST), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MIN_FILTER, this._cgl.gl.NEAREST);
            else if (this.filter == Q.FILTER_LINEAR) this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MIN_FILTER, this._cgl.gl.LINEAR), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MAG_FILTER, this._cgl.gl.LINEAR);
        else {
            if (this.filter != Q.FILTER_MIPMAP) throw console.log("unknown texture filter!", this.filter), new Error("unknown texture filter!" + this.filter);
            this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MAG_FILTER, this._cgl.gl.LINEAR), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MIN_FILTER, this._cgl.gl.LINEAR_MIPMAP_LINEAR)
        } else this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MAG_FILTER, this._cgl.gl.NEAREST), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_MIN_FILTER, this._cgl.gl.NEAREST), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_S, this._cgl.gl.CLAMP_TO_EDGE), this._cgl.gl.texParameteri(this.texTarget, this._cgl.gl.TEXTURE_WRAP_T, this._cgl.gl.CLAMP_TO_EDGE), this.filter = Q.FILTER_NEAREST, this.wrap = Q.WRAP_CLAMP_TO_EDGE
    }, Q.load = function (t, e, i, s) {
        var r = t.patch.loading.start("texture", e),
            n = new Q(t);
        return n.name = e, CABLES.UI && gui.jobs().start({
            id: "loadtexture" + r,
            title: "loading texture (" + e + ")"
        }), n.image = new Image, n.image.crossOrigin = "", s && s.hasOwnProperty("filter") && (n.filter = s.filter), s && s.hasOwnProperty("flip") && (n.flip = s.flip), s && s.hasOwnProperty("wrap") && (n.wrap = s.wrap), s && s.hasOwnProperty("unpackAlpha") && (n.unpackAlpha = s.unpackAlpha), n.image.onabort = n.image.onerror = function (e) {
            console.warn("[cgl.texture.load] error loading texture", e), t.patch.loading.finished(r);
            i && i({
                error: !0
            }), CABLES.UI && gui.jobs().finish("loadtexture" + r)
        }, n.image.onload = function (e) {
            n.initTexture(n.image), t.patch.loading.finished(r), CABLES.UI && gui.jobs().finish("loadtexture" + r), i && i()
        }, n.image.src = e, n
    }, Q.getTempTexture = function (t) {
        return W || (W = Q.getTemporaryTexture(t, 256, Q.FILTER_LINEAR, Q.REPEAT)), W
    }, Q.getEmptyTexture = function (t) {
        if (K) return K;
        K = new Q(t);
        var e = new Uint8Array(256);
        return K.initFromData(e, 8, 8, Q.FILTER_NEAREST, Q.WRAP_REPEAT), K
    }, Q.getRandomTexture = function (t) {
        if (X) return X;
        const e = new Uint8Array(262144);
        for (var i = 0; i < 65536; i++) e[4 * i + 0] = 255 * Math.random(), e[4 * i + 1] = 255 * Math.random(), e[4 * i + 2] = 255 * Math.random(), e[4 * i + 3] = 255;
        return (X = new Q(t)).initFromData(e, 256, 256, Q.FILTER_NEAREST, Q.WRAP_REPEAT), X
    }, Q.getTempGradientTexture = function (t) {
        if (j) return j;
        var e = new Q(t);
        for (var i = new Uint8Array(262144), s = 0; s < 256; s++)
            for (var r = 0; r < 256; r++) i[4 * (r + 256 * s) + 0] = i[4 * (r + 256 * s) + 1] = i[4 * (r + 256 * s) + 2] = 255 - s, i[4 * (r + 256 * s) + 3] = 255;
        return e.initFromData(i, 256, 256, Q.FILTER_NEAREST, Q.WRAP_REPEAT), j = e, e
    }, Q.getTemporaryTexture = function (t, e, i, s) {
        for (var r = new Q(t), n = [], o = 0; o < e; o++)
            for (var a = 0; a < e; a++)(a + o) % 64 < 32 ? (n.push(200 + o / e * 25 + a / e * 25), n.push(200 + o / e * 25 + a / e * 25), n.push(200 + o / e * 25 + a / e * 25)) : (n.push(40 + o / e * 25 + a / e * 25), n.push(40 + o / e * 25 + a / e * 25), n.push(40 + o / e * 25 + a / e * 25)), n.push(255);
        var h = new Uint8Array(n);
        return r.initFromData(h, e, e, i, s), r
    }, Q.createFromImage = function (t, e, i) {
        var s = new Q(t, i);
        return s.flip = !1, s.image = e, s.width = e.width, s.height = e.height, s.initTexture(e, i.filter), s
    }, Q.fromImage = function (t, e, i, s) {
        console.error("deprecated texture from image...");
        var r = new Q(t);
        return r.flip = !1, i && (r.filter = i), s && (r.wrap = s), r.image = e, r.initTexture(e), r
    }, Q.isPowerOfTwo = function (t) {
        return 1 == t || 2 == t || 4 == t || 8 == t || 16 == t || 32 == t || 64 == t || 128 == t || 256 == t || 512 == t || 1024 == t || 2048 == t || 4096 == t || 8192 == t || 16384 == t
    }, Q.FILTER_NEAREST = 0, Q.FILTER_LINEAR = 1, Q.FILTER_MIPMAP = 2, Q.WRAP_REPEAT = 0, Q.WRAP_MIRRORED_REPEAT = 1, Q.WRAP_CLAMP_TO_EDGE = 2, Q.TYPE_DEFAULT = 0, Q.TYPE_DEPTH = 1, Q.TYPE_FLOAT = 2;
    const q = function (t, e, i, s) {
        this.Framebuffer2DrawTargetsDefault = null, this.Framebuffer2BlittingFramebuffer = null, this.Framebuffer2FinalFramebuffer = null, this._cgl = t, this._width = 0, this._height = 0, this._depthRenderbuffer = null, this._frameBuffer = null, this._textureFrameBuffer = null, this._colorRenderbuffers = [], this._drawTargetArray = [], this.Framebuffer2BlittingFramebuffer || (this.Framebuffer2BlittingFramebuffer = t.gl.createFramebuffer()), this.Framebuffer2FinalFramebuffer || (this.Framebuffer2FinalFramebuffer = t.gl.createFramebuffer()), this.Framebuffer2DrawTargetsDefault || (this.Framebuffer2DrawTargetsDefault = [t.gl.COLOR_ATTACHMENT0]), this._options = s || {
            isFloatingPointTexture: !1
        }, this._options.hasOwnProperty("numRenderBuffers") || (this._options.numRenderBuffers = 1), this._options.hasOwnProperty("depth") || (this._options.depth = !0), this._options.hasOwnProperty("clear") || (this._options.clear = !0), this._options.hasOwnProperty("multisampling") || (this._options.multisampling = !1, this._options.multisamplingSamples = 0), this._options.multisamplingSamples && (this._cgl.gl.MAX_SAMPLES ? this._options.multisamplingSamples = Math.min(this._cgl.gl.getParameter(this._cgl.gl.MAX_SAMPLES), this._options.multisamplingSamples) : this._options.multisamplingSamples = 0), this._options.hasOwnProperty("filter") || (this._options.filter = Q.FILTER_LINEAR), this._numRenderBuffers = this._options.numRenderBuffers, this._colorTextures = [];
        for (var r = 0; r < this._numRenderBuffers; r++) this._colorTextures[r] = new Q(t, {
            name: "framebuffer2 texture " + r,
            isFloatingPointTexture: this._options.isFloatingPointTexture,
            filter: this._options.filter,
            wrap: this._options.wrap
        });
        var n = Q.FILTER_NEAREST;
        this._options.shadowMap && (n = Q.FILTER_LINEAR), this._textureDepth = new Q(t, {
            name: "framebuffer2 depth texture",
            isDepthTexture: !0,
            filter: n,
            shadowMap: this._options.shadowMap || !1
        }), this.setSize(e || 512, i || 512)
    };
    q.prototype.getWidth = function () {
        return this._width
    }, q.prototype.getHeight = function () {
        return this._height
    }, q.prototype.getGlFrameBuffer = function () {
        return this._frameBuffer
    }, q.prototype.getDepthRenderBuffer = function () {
        return this._depthRenderbuffer
    }, q.prototype.getTextureColor = function () {
        return this._colorTextures[0]
    }, q.prototype.getTextureColorNum = function (t) {
        return this._colorTextures[t]
    }, q.prototype.getTextureDepth = function () {
        return this._textureDepth
    }, q.prototype.setFilter = function (t) {
        for (var e = 0; e < this._numRenderBuffers; e++) this._colorTextures[e].filter = t, this._colorTextures[e].setSize(this._width, this._height)
    }, q.prototype.delete = q.prototype.dispose = function () {
        for (var t = 0; t < this._numRenderBuffers; t++) this._colorTextures[t].delete();
        this._textureDepth.delete();
        for (t = 0; t < this._numRenderBuffers; t++) this._cgl.gl.deleteRenderbuffer(this._colorRenderbuffers[t]);
        this._cgl.gl.deleteRenderbuffer(this._depthRenderbuffer), this._cgl.gl.deleteFramebuffer(this._frameBuffer), this._cgl.gl.deleteFramebuffer(this._textureFrameBuffer)
    }, q.prototype.setSize = function (t, e) {
        if (this._width = Math.floor(t), this._height = Math.floor(e), z.profileFrameBuffercreate++, this._frameBuffer) {
            for (var i = 0; i < this._numRenderBuffers; i++) this._cgl.gl.deleteRenderbuffer(this._colorRenderbuffers[i]);
            this._cgl.gl.deleteRenderbuffer(this._depthRenderbuffer), this._cgl.gl.deleteFramebuffer(this._frameBuffer), this._cgl.gl.deleteFramebuffer(this._textureFrameBuffer)
        }
        this._frameBuffer = this._cgl.gl.createFramebuffer(), this._textureFrameBuffer = this._cgl.gl.createFramebuffer();
        var s = this._options.depth;
        for (i = 0; i < this._numRenderBuffers; i++) this._colorTextures[i].setSize(this._width, this._height);
        for (i = 0; i < this._numRenderBuffers; i++) {
            var r = this._cgl.gl.createRenderbuffer();
            this._cgl.gl.getExtension("EXT_color_buffer_float");
            this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuffer), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, r), this._options.isFloatingPointTexture ? this._options.multisampling ? this._cgl.gl.renderbufferStorageMultisample(this._cgl.gl.RENDERBUFFER, this._options.multisamplingSamples, this._cgl.gl.RGBA32F, this._width, this._height) : this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER, this._cgl.gl.RGBA32F, this._width, this._height) : this._options.multisampling ? this._cgl.gl.renderbufferStorageMultisample(this._cgl.gl.RENDERBUFFER, this._options.multisamplingSamples, this._cgl.gl.RGBA8, this._width, this._height) : this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER, this._cgl.gl.RGBA8, this._width, this._height), this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0 + i, this._cgl.gl.RENDERBUFFER, r), this._colorRenderbuffers[i] = r
        }
        this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._textureFrameBuffer);
        for (i = 0; i < this._numRenderBuffers; i++) this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0 + i, this._cgl.gl.TEXTURE_2D, this._colorTextures[i].tex, 0);
        this._options.depth && this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.TEXTURE_2D, this._textureDepth.tex, 0), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuffer), s && (this._textureDepth.setSize(this._width, this._height), this._depthRenderbuffer = this._cgl.gl.createRenderbuffer(), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, this._depthRenderbuffer), this._options.isFloatingPointTexture, this._options.multisampling ? this._cgl.gl.renderbufferStorageMultisample(this._cgl.gl.RENDERBUFFER, this._options.multisamplingSamples, this._cgl.gl.DEPTH_COMPONENT32F, this._width, this._height) : this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER, this._cgl.gl.DEPTH_COMPONENT32F, this._width, this._height), this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.RENDERBUFFER, this._depthRenderbuffer)), this._drawTargetArray.length = 0;
        for (i = 0; i < this._numRenderBuffers; i++) this._drawTargetArray.push(this._cgl.gl.COLOR_ATTACHMENT0 + i);
        if (!this._cgl.gl.isFramebuffer(this._textureFrameBuffer)) throw "Invalid framebuffer";
        var n = this._cgl.gl.checkFramebufferStatus(this._cgl.gl.FRAMEBUFFER);
        switch (n) {
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
                throw console.log("incomplete framebuffer", n), new Error("Incomplete framebuffer: " + n)
        }
        this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, null)
    }, q.prototype.renderStart = function () {
        this._cgl.pushModelMatrix(), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuffer), this._cgl.pushGlFrameBuffer(this._frameBuffer), this._cgl.pushFrameBuffer(this), this._cgl.pushPMatrix(), this._cgl.gl.viewport(0, 0, this._width, this._height), this._cgl.gl.drawBuffers(this._drawTargetArray), this._options.clear && (this._cgl.gl.clearColor(0, 0, 0, 0), this._cgl.gl.clear(this._cgl.gl.COLOR_BUFFER_BIT | this._cgl.gl.DEPTH_BUFFER_BIT))
    }, q.prototype.renderEnd = function () {
        if (this._cgl.popPMatrix(), this._numRenderBuffers <= 1) this._cgl.gl.bindFramebuffer(this._cgl.gl.READ_FRAMEBUFFER, this._frameBuffer), this._cgl.gl.bindFramebuffer(this._cgl.gl.DRAW_FRAMEBUFFER, this._textureFrameBuffer), this._cgl.gl.clearBufferfv(this._cgl.gl.COLOR, 0, [0, 0, 0, 1]), this._cgl.gl.blitFramebuffer(0, 0, this._width, this._height, 0, 0, this._width, this._height, this._cgl.gl.COLOR_BUFFER_BIT | this._cgl.gl.DEPTH_BUFFER_BIT, this._cgl.gl.NEAREST);
        else {
            this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this.Framebuffer2BlittingFramebuffer), this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.RENDERBUFFER, this._depthRenderbuffer), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this.Framebuffer2FinalFramebuffer), this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.TEXTURE_2D, this._textureDepth.tex, 0);
            for (var t = 0; t < this._numRenderBuffers; t++) {
                this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this.Framebuffer2BlittingFramebuffer), this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.RENDERBUFFER, this._colorRenderbuffers[t]), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this.Framebuffer2FinalFramebuffer), this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.TEXTURE_2D, this._colorTextures[t].tex, 0), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null), this._cgl.gl.bindFramebuffer(this._cgl.gl.READ_FRAMEBUFFER, this.Framebuffer2BlittingFramebuffer), this._cgl.gl.bindFramebuffer(this._cgl.gl.DRAW_FRAMEBUFFER, this.Framebuffer2FinalFramebuffer), this._cgl.gl.clearBufferfv(this._cgl.gl.COLOR, 0, [0, 0, 0, 1]);
                var e = this._cgl.gl.COLOR_BUFFER_BIT;
                0 == t && (e |= this._cgl.gl.DEPTH_BUFFER_BIT), this._cgl.gl.blitFramebuffer(0, 0, this._width, this._height, 0, 0, this._width, this._height, e, this._cgl.gl.NEAREST)
            }
        }
        if (this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.popGlFrameBuffer()), this._cgl.popFrameBuffer(), this._cgl.popModelMatrix(), this._cgl.resetViewPort(), this._colorTextures[0].filter == Q.FILTER_MIPMAP)
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
    }, Z.prototype.setAttribute = function (t, e, i) {
        var s = "";
        1 == i ? s = "float" : 2 == i ? s = "vec2" : 3 == i ? s = "vec3" : 4 == i && (s = "vec4");
        var r = {
            name: t,
            data: e,
            itemSize: i,
            type: s
        };
        this._attributes[t] = r
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
                i = this.vertices.length / 3;
            this.verticesIndices.length = this.verticesIndices.length + t.verticesIndices.length;
            for (var s = 0; s < t.verticesIndices.length; s++) this.verticesIndices[e + s] = t.verticesIndices[s] + i;
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
            i = vec3.create(),
            s = vec3.create(),
            r = 0;

        function n(r) {
            return vec3.subtract(e, r[0], r[1]), vec3.subtract(i, r[0], r[2]), vec3.cross(s, e, i), vec3.normalize(s, s), t && t.forceZUp && s[2] < 0 && (s[0] *= -1, s[1] *= -1, s[2] *= -1), s
        }
        for (this.getVertexVec = function (t) {
                var e = [0, 0, 0];
                return e[0] = this.vertices[3 * t + 0], e[1] = this.vertices[3 * t + 1], e[2] = this.vertices[3 * t + 2], e
            }, this.vertexNormals instanceof Float32Array && this.vertexNormals.length == this.vertices.length || (this.vertexNormals = new Float32Array(this.vertices.length)), r = 0; r < this.vertices.length; r++) this.vertexNormals[r] = 0;
        if (this.isIndexed()) {
            var o = [];
            for (o.length = this.verticesIndices.length / 3, r = 0; r < this.verticesIndices.length; r += 3) {
                u = [this.getVertexVec(this.verticesIndices[r + 0]), this.getVertexVec(this.verticesIndices[r + 1]), this.getVertexVec(this.verticesIndices[r + 2])];
                o[r / 3] = n(u), this.vertexNormals[3 * this.verticesIndices[r + 0] + 0] += o[r / 3][0], this.vertexNormals[3 * this.verticesIndices[r + 0] + 1] += o[r / 3][1], this.vertexNormals[3 * this.verticesIndices[r + 0] + 2] += o[r / 3][2], this.vertexNormals[3 * this.verticesIndices[r + 1] + 0] += o[r / 3][0], this.vertexNormals[3 * this.verticesIndices[r + 1] + 1] += o[r / 3][1], this.vertexNormals[3 * this.verticesIndices[r + 1] + 2] += o[r / 3][2], this.vertexNormals[3 * this.verticesIndices[r + 2] + 0] += o[r / 3][0], this.vertexNormals[3 * this.verticesIndices[r + 2] + 1] += o[r / 3][1], this.vertexNormals[3 * this.verticesIndices[r + 2] + 2] += o[r / 3][2]
            }
            for (r = 0; r < this.verticesIndices.length; r += 3)
                for (var a = 0; a < 3; a++) {
                    var h = [this.vertexNormals[3 * this.verticesIndices[r + a] + 0], this.vertexNormals[3 * this.verticesIndices[r + a] + 1], this.vertexNormals[3 * this.verticesIndices[r + a] + 2]];
                    vec3.normalize(h, h), this.vertexNormals[3 * this.verticesIndices[r + a] + 0] = h[0], this.vertexNormals[3 * this.verticesIndices[r + a] + 1] = h[1], this.vertexNormals[3 * this.verticesIndices[r + a] + 2] = h[2]
                }
        } else {
            var l = [];
            for (r = 0; r < this.vertices.length; r += 9) {
                var u;
                s = n(u = [
                    [this.vertices[r + 0], this.vertices[r + 1], this.vertices[r + 2]],
                    [this.vertices[r + 3], this.vertices[r + 4], this.vertices[r + 5]],
                    [this.vertices[r + 6], this.vertices[r + 7], this.vertices[r + 8]]
                ]);
                l.push(s[0], s[1], s[2], s[0], s[1], s[2], s[0], s[1], s[2])
            }
            this.vertexNormals = l
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
        var i = [];
        i.length = 2 * e;
        const s = vec3.create(),
            r = vec3.create(),
            n = vec3.create(),
            o = vec2.create(),
            a = vec2.create(),
            h = vec2.create(),
            l = vec3.create(),
            u = vec3.create();
        for (var c = 0; c < t; c += 1) {
            const t = this.verticesIndices[3 * c],
                p = this.verticesIndices[3 * c + 1],
                d = this.verticesIndices[3 * c + 2];
            vec3.set(s, this.vertices[3 * t], this.vertices[3 * t + 1], this.vertices[3 * t + 2]), vec3.set(r, this.vertices[3 * p], this.vertices[3 * p + 1], this.vertices[3 * p + 2]), vec3.set(n, this.vertices[3 * d], this.vertices[3 * d + 1], this.vertices[3 * d + 2]), vec2.set(o, this.texCoords[2 * t], this.texCoords[2 * t + 1]), vec2.set(a, this.texCoords[2 * p], this.texCoords[2 * p + 1]), vec2.set(h, this.texCoords[2 * d], this.texCoords[2 * d + 1]);
            const _ = r[0] - s[0],
                g = n[0] - s[0],
                f = r[1] - s[1],
                m = n[1] - s[1],
                E = r[2] - s[2],
                v = n[2] - s[2],
                T = a[0] - o[0],
                A = h[0] - o[0],
                b = a[1] - o[1],
                O = h[1] - o[1],
                I = 1 / (T * O - A * b);
            vec3.set(l, (O * _ - b * g) * I, (O * f - b * m) * I, (O * E - b * v) * I), vec3.set(u, (T * g - A * _) * I, (T * m - A * f) * I, (T * v - A * E) * I), i[t] = l, i[p] = l, i[d] = l, i[t + e] = u, i[p + e] = u, i[d + e] = u
        }
        const p = vec3.create(),
            d = vec3.create(),
            _ = vec3.create(),
            g = vec3.create(),
            f = vec3.create(),
            m = vec3.create(),
            E = vec3.create(),
            v = vec3.create();
        for (var T = 0; T < e; T += 1) {
            vec3.set(p, this.vertexNormals[3 * T], this.vertexNormals[3 * T + 1], this.vertexNormals[3 * T + 2]), vec3.set(d, i[T][0], i[T][1], i[T][2]);
            const t = vec3.dot(p, d);
            vec3.scale(f, p, t), vec3.subtract(m, d, f), vec3.normalize(v, m), vec3.cross(E, p, d);
            const s = vec3.dot(E, i[T + e]) < 0 ? -1 : 1;
            vec3.scale(_, v, 1 / s), vec3.cross(g, p, _), this.tangents[3 * T + 0] = _[0], this.tangents[3 * T + 1] = _[1], this.tangents[3 * T + 2] = _[2], this.biTangents[3 * T + 0] = g[0], this.biTangents[3 * T + 1] = g[1], this.biTangents[3 * T + 2] = g[2]
        }
    }, Z.prototype.isIndexed = function () {
        return 0 != this.verticesIndices.length
    }, Z.prototype.unIndex = function (t) {
        var e = [],
            i = [],
            s = [],
            r = [],
            n = 0,
            o = 0;
        for (this.vertexNormals = [], o = 0; o < this.verticesIndices.length; o += 3) e.push(this.vertices[3 * this.verticesIndices[o + 0] + 0]), e.push(this.vertices[3 * this.verticesIndices[o + 0] + 1]), e.push(this.vertices[3 * this.verticesIndices[o + 0] + 2]), r.push(this.vertexNormals[3 * this.verticesIndices[o + 0] + 0]), r.push(this.vertexNormals[3 * this.verticesIndices[o + 0] + 1]), r.push(this.vertexNormals[3 * this.verticesIndices[o + 0] + 2]), this.texCoords ? (s.push(this.texCoords[2 * this.verticesIndices[o + 0] + 0]), s.push(this.texCoords[2 * this.verticesIndices[o + 0] + 1])) : (s.push(0), s.push(0)), i.push(n), n++, e.push(this.vertices[3 * this.verticesIndices[o + 1] + 0]), e.push(this.vertices[3 * this.verticesIndices[o + 1] + 1]), e.push(this.vertices[3 * this.verticesIndices[o + 1] + 2]), r.push(this.vertexNormals[3 * this.verticesIndices[o + 1] + 0]), r.push(this.vertexNormals[3 * this.verticesIndices[o + 1] + 1]), r.push(this.vertexNormals[3 * this.verticesIndices[o + 1] + 2]), this.texCoords ? (s.push(this.texCoords[2 * this.verticesIndices[o + 1] + 0]), s.push(this.texCoords[2 * this.verticesIndices[o + 1] + 1])) : (s.push(0), s.push(0)), i.push(n), n++, e.push(this.vertices[3 * this.verticesIndices[o + 2] + 0]), e.push(this.vertices[3 * this.verticesIndices[o + 2] + 1]), e.push(this.vertices[3 * this.verticesIndices[o + 2] + 2]), r.push(this.vertexNormals[3 * this.verticesIndices[o + 2] + 0]), r.push(this.vertexNormals[3 * this.verticesIndices[o + 2] + 1]), r.push(this.vertexNormals[3 * this.verticesIndices[o + 2] + 2]), this.texCoords ? (s.push(this.texCoords[2 * this.verticesIndices[o + 2] + 0]), s.push(this.texCoords[2 * this.verticesIndices[o + 2] + 1])) : (s.push(0), s.push(0)), i.push(n), n++;
        this.vertices = e, this.texCoords = s, this.vertexNormals = r, this.verticesIndices.length = 0, t && (this.verticesIndices = i), this.calculateNormals()
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
    }, Z.prototype.center = function (t, e, i) {
        void 0 === t && (t = !0, e = !0, i = !0);
        var s = 0;
        const r = this.getBounds(),
            n = [r.minX + (r.maxX - r.minX) / 2, r.minY + (r.maxY - r.minY) / 2, r.minZ + (r.maxZ - r.minZ) / 2];
        for (s = 0; s < this.vertices.length; s += 3) this.vertices[s + 0] == this.vertices[s + 0] && (t && (this.vertices[s + 0] -= n[0]), e && (this.vertices[s + 1] -= n[1]), i && (this.vertices[s + 2] -= n[2]));
        return n
    }, Z.prototype.mapTexCoords2d = function () {
        var t = this.getBounds(),
            e = this.vertices.length / 3;
        this.texCoords = new Float32Array(length = 2 * e);
        for (var i = 0; i < e; i++) {
            var s = this.vertices[3 * i + 0],
                r = this.vertices[3 * i + 1];
            this.texCoords[2 * i + 0] = s / (t.maxX - t.minX) + .5, this.texCoords[2 * i + 1] = 1 - r / (t.maxY - t.minY) + .5
        }
    }, Z.buildFromFaces = function (t) {
        for (var e = [], i = [], s = 0; s < t.length; s += 3) {
            for (var r = t[s + 0], n = t[s + 1], o = t[s + 2], a = [-1, -1, -1], h = 0; h < e; h += 3) e[h + 0] == r[0] && e[h + 1] == r[1] && e[h + 2] == r[2] && (a[0] = h / 3), e[h + 0] == n[0] && e[h + 1] == n[1] && e[h + 2] == n[2] && (a[1] = h / 3), e[h + 0] == o[0] && e[h + 1] == o[1] && e[h + 2] == o[2] && (a[2] = h / 3); - 1 == a[0] && (e.push(r[0], r[1], r[2]), a[0] = (e.length - 1) / 3), -1 == a[1] && (e.push(n[0], n[1], n[2]), a[1] = (e.length - 1) / 3), -1 == a[2] && (e.push(o[0], o[1], o[2]), a[2] = (e.length - 1) / 3), i.push(parseInt(a[0], 10)), i.push(parseInt(a[1], 10)), i.push(parseInt(a[2], 10))
        }
        var l = new Z;
        return l.vertices = e, l.verticesIndices = i, l
    }, Z.json2geom = function (t) {
        var e = new Z;
        if (e.verticesIndices = [], e.vertices = t.vertices || [], e.vertexNormals = t.normals || [], e.vertexColors = t.colors || [], e.tangents = t.tangents || [], e.biTangents = t.bitangents || [], t.texturecoords && e.setTexCoords(t.texturecoords[0]), t.vertices_b64 && (e.vertices = new Float32Array(d(t.vertices_b64))), t.normals_b64 && (e.vertexNormals = new Float32Array(d(t.normals_b64))), t.tangents_b64 && (e.tangents = new Float32Array(d(t.tangents_b64))), t.bitangents_b64 && (e.biTangents = new Float32Array(d(t.bitangents_b64))), t.texturecoords_b64 && e.setTexCoords(new Float32Array(d(t.texturecoords_b64[0]))), t.faces_b64) e.verticesIndices = new Uint32Array(d(t.faces_b64));
        else {
            e.verticesIndices.length = 3 * t.faces.length;
            for (var i = 0; i < t.faces.length; i++) e.verticesIndices[3 * i] = t.faces[i][0], e.verticesIndices[3 * i + 1] = t.faces[i][1], e.verticesIndices[3 * i + 2] = t.faces[i][2]
        }
        return e
    };
    const J = function (t, e, i, s) {
        if (this._loc = -1, this._type = e, this._name = i, this._shader = t, this._value = 1e-5, this._oldValue = null, this._port = null, this._shader.addUniform(this), this.needsUpdate = !0, "f" == e) this.set = this.setValue = this.setValueF.bind(this), this.updateValue = this.updateValueF.bind(this);
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
        "object" == typeof s && s instanceof S ? (this._port = s, this._value = this._port.get(), this._port.onValueChanged = this.updateFromPort.bind(this)) : this._value = s, this.setValue(this._value), this.needsUpdate = !0
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
        -1 == this._loc ? this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name) : this.needsUpdate = !1, this._shader.getCgl().gl.uniform1f(this._loc, this._value), z.profileUniformCount++
    }, J.prototype.setValueF = function (t) {
        t != this._value && (this.needsUpdate = !0, this._value = t)
    }, J.prototype.updateValueI = function () {
        -1 == this._loc ? this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name) : this.needsUpdate = !1, this._shader.getCgl().gl.uniform1i(this._loc, this._value), z.UniformCount++
    }, J.prototype.setValueI = function (t) {
        t != this._value && (this.needsUpdate = !0, this._value = t)
    }, J.prototype.updateValueBool = function () {
        -1 == this._loc ? this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name) : this.needsUpdate = !1, this._shader.getCgl().gl.uniform1i(this._loc, this._value ? 1 : 0), z.UniformCount++
    }, J.prototype.setValueBool = function (t) {
        t != this._value && (this.needsUpdate = !0, this._value = t)
    }, J.prototype.setValueArray3F = function (t) {
        this.needsUpdate = !0, this._value = t
    }, J.prototype.updateValueArray3F = function () {
        -1 == this._loc ? this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name) : this.needsUpdate = !1, this._value && (this._shader.getCgl().gl.uniform3fv(this._loc, this._value), z.UniformCount++)
    }, J.prototype.setValueArrayF = function (t) {
        this.needsUpdate = !0, this._value = t
    }, J.prototype.updateValueArrayF = function () {
        -1 == this._loc ? this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name) : this.needsUpdate = !1, this._value && (this._shader.getCgl().gl.uniform1fv(this._loc, this._value), z.UniformCount++)
    }, J.prototype.updateValue3F = function () {
        this._value && (-1 == this._loc && (this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name), z.ShaderGetUniform++, z.ShaderGetUniformName = this._name), this._shader.getCgl().gl.uniform3f(this._loc, this._value[0], this._value[1], this._value[2]), this.needsUpdate = !1, z.UniformCount++)
    }, J.prototype.setValue3F = function (t) {
        t && (this._oldValue ? t[0] == this._oldValue[0] && t[1] == this._oldValue[1] && t[2] == this._oldValue[2] || (this._oldValue[0] = t[0], this._oldValue[1] = t[1], this._oldValue[2] = t[2], this.needsUpdate = !0) : (this._oldValue = [t[0] - 1, 1, 2], this.needsUpdate = !0), this._value = t)
    }, J.prototype.updateValue2F = function () {
        this._value && (-1 == this._loc && (this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name), z.ShaderGetUniform++, z.ShaderGetUniformName = this._name), this._shader.getCgl().gl.uniform2f(this._loc, this._value[0], this._value[1]), this.needsUpdate = !1, z.UniformCount++)
    }, J.prototype.setValue2F = function (t) {
        t && (this._oldValue ? t[0] == this._oldValue[0] && t[1] == this._oldValue[1] || (this._oldValue[0] = t[0], this._oldValue[1] = t[1], this.needsUpdate = !0) : (this._oldValue = [t[0] - 1, 1], this.needsUpdate = !0), this._value = t)
    }, J.prototype.updateValueT = function () {
        -1 == this._loc && (this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name), z.ShaderGetUniform++, z.ShaderGetUniformName = this._name, -1 == this._loc && console.log("texture this._loc unknown!!")), z.UniformCount++, this._shader.getCgl().gl.uniform1i(this._loc, this._value), this.needsUpdate = !1
    }, J.prototype.setValueT = function (t) {
        this.needsUpdate = !0, this._value = t
    }, J.prototype.updateValue4F = function () {
        -1 == this._loc && (this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name), z.ShaderGetUniform++, z.ShaderGetUniformName = this._name), this._shader.getCgl().gl.uniform4f(this._loc, this._value[0], this._value[1], this._value[2], this._value[3]), z.UniformCount++
    }, J.prototype.setValue4F = function (t) {
        this.needsUpdate = !0, this._value = t
    }, J.prototype.updateValueM4 = function () {
        -1 == this._loc && (this._loc = this._shader.getCgl().gl.getUniformLocation(this._shader.getProgram(), this._name), z.ShaderGetUniform++, z.ShaderGetUniformName = this._name), this._shader.getCgl().gl.uniformMatrix4fv(this._loc, !1, this._value), z.UniformCount++
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
    };
    const tt = {
            lastMesh: null
        },
        et = function (t, e, i) {
            this._cgl = t, this._bufVertexAttrib = null, this._bufVerticesIndizes = this._cgl.gl.createBuffer(), this._attributes = [], this._attribLocs = {}, this._geom = null, this._lastShader = null, this._numInstances = 0, this._glPrimitive = i, this._preWireframeGeom = null, this.addVertexNumbers = !1, this.feedBackAttributes = [], this.setGeom(e), this._feedBacks = [], this._feedBacksChanged = !1, this._transformFeedBackLoc = -1, this._lastAttrUpdate = 0, Object.defineProperty(this, "numInstances", {
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
        }, et.prototype.setAttributePointer = function (t, e, i, s) {
            for (var r = 0; r < this._attributes.length; r++) this._attributes[r].name == t && (this._attributes[r].pointer || (this._attributes[r].pointer = []), this._attributes[r].pointer.push({
                loc: -1,
                name: e,
                stride: i,
                offset: s,
                instanced: t == $.SHADER.SHADERVAR_INSTANCE_MMATRIX
            }))
        }, et.prototype.getAttribute = function (t) {
            for (var e = 0; e < this._attributes.length; e++)
                if (this._attributes[e].name == t) return this._attributes[e]
        }, et.prototype.addAttribute = et.prototype.updateAttribute = et.prototype.setAttribute = function (t, e, i, s) {
            var r = null,
                n = null,
                o = !1,
                a = 0,
                h = e.length / i;
            for (0 === h && console.warn("CGL_MESH: num items in attribute " + t + " is ZERO"), "function" == typeof s && (n = s), "object" == typeof s && (s.cb && (n = s.cb), s.instanced && (o = s.instanced)), t == $.SHADER.SHADERVAR_INSTANCE_MMATRIX && (o = !0), e instanceof Float32Array ? r = e : (r = new Float32Array(e), z.profileNonTypedAttrib++, z.profileNonTypedAttribNames = this._geom.name + " " + t), a = 0; a < this._attributes.length; a++)
                if (this._attributes[a].name == t) return this._attributes[a].numItems = h, this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, this._attributes[a].buffer), this._cgl.gl.bufferData(this._cgl.gl.ARRAY_BUFFER, r, this._cgl.gl.DYNAMIC_DRAW), this._attributes[a];
            var l = this._cgl.gl.createBuffer();
            this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, l), this._cgl.gl.bufferData(this._cgl.gl.ARRAY_BUFFER, r, this._cgl.gl.DYNAMIC_DRAW);
            var u = this._cgl.gl.FLOAT;
            s && s.type && (u = s.type);
            var c = {
                buffer: l,
                name: t,
                cb: n,
                itemSize: i,
                numItems: h,
                startItem: 0,
                instanced: o,
                type: u
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
                this.setAttribute($.SHADER.SHADERVAR_VERTEX_NUMBER, this._verticesNumbers, 1, (e, i, s) => {
                    s.uniformNumVertices || (s.uniformNumVertices = new J(s, "f", "numVertices", t)), s.uniformNumVertices.setValue(t)
                })
            }
        }, et.prototype.setVertexIndices = function (t) {
            if (t.length > 0) {
                for (var e = 0; e < t.length; e++)
                    if (t[e] >= this._geom.vertices.length / 3) return void console.warn("invalid index in " + this._geom.name);
                this._cgl.gl.bindBuffer(this._cgl.gl.ELEMENT_ARRAY_BUFFER, this._bufVerticesIndizes), t instanceof Uint16Array ? this.vertIndicesTyped = t : this.vertIndicesTyped = new Uint16Array(t), this._cgl.gl.bufferData(this._cgl.gl.ELEMENT_ARRAY_BUFFER, this.vertIndicesTyped, this._cgl.gl.DYNAMIC_DRAW), this._bufVerticesIndizes.itemSize = 1, this._bufVerticesIndizes.numItems = t.length
            } else this._bufVerticesIndizes.numItems = 0
        }, et.prototype.setGeom = function (t) {
            this._geom = t, tt.lastMesh = null, z.profileMeshSetGeom++, this._disposeAttributes(), this.updateVertices(this._geom), this.setVertexIndices(this._geom.verticesIndices), this._geom.vertexNormals.length > 0 && this.setAttribute("attrVertNormal", this._geom.vertexNormals, 3), this.updateTexCoords(this._geom), this._geom.hasOwnProperty("tangents") && this._geom.tangents && this._geom.tangents.length > 0 && this.setAttribute("attrTangent", this._geom.tangents, 3), this._geom.hasOwnProperty("biTangents") && this._geom.biTangents && this._geom.biTangents.length > 0 && this.setAttribute("attrBiTangent", this._geom.biTangents, 3), this._geom.vertexColors.length > 0 && this.setAttribute("attrVertColor", this._geom.vertexColors, 4), this.addVertexNumbers && this._setVertexNumbers();
            var e = this._geom.getAttributes();
            for (var i in e) this.setAttribute(i, e[i].data, e[i].itemSize)
        }, et.prototype._preBind = function (t) {
            for (var e = 0; e < this._attributes.length; e++) this._attributes[e].cb && this._attributes[e].cb(this._attributes[e], this._geom, t)
        }, et.prototype._bind = function (t) {
            t != this._lastShader && this.unBind();
            var e = [];
            this._attribLocs[t.id] ? e = this._attribLocs[t.id] : this._attribLocs[t.id] = e, this._lastShader = t;
            var i = 0;
            if (t.lastCompile > this._lastAttrUpdate || e.length != this._attributes.length)
                for (this._lastAttrUpdate = t.lastCompile, i = 0; i < this._attributes.length; i++) e[i] = -1;
            for (i = 0; i < this._attributes.length; i++) {
                var s = this._attributes[i];
                if (-1 == e[i] && s._attrLocationLastShaderTime != t.lastCompile && (s._attrLocationLastShaderTime = t.lastCompile, e[i] = this._cgl.glGetAttribLocation(t.getProgram(), s.name), z.profileAttrLoc++), -1 != e[i])
                    if (this._cgl.gl.enableVertexAttribArray(e[i]), this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, s.buffer), s.instanced)
                        if (s.itemSize <= 4) s.itemSize && 0 != s.itemSize || console.log("instanced attrib itemsize error", this._geom.name, s), this._cgl.gl.vertexAttribPointer(e[i], s.itemSize, s.type, !1, 4 * s.itemSize, 0), this._cgl.gl.vertexAttribDivisor(e[i], 1);
                        else if (16 == s.itemSize) {
                    const t = 64;
                    this._cgl.gl.vertexAttribPointer(e[i], 4, s.type, !1, t, 0), this._cgl.gl.enableVertexAttribArray(e[i] + 1), this._cgl.gl.vertexAttribPointer(e[i] + 1, 4, s.type, !1, t, 16), this._cgl.gl.enableVertexAttribArray(e[i] + 2), this._cgl.gl.vertexAttribPointer(e[i] + 2, 4, s.type, !1, t, 32), this._cgl.gl.enableVertexAttribArray(e[i] + 3), this._cgl.gl.vertexAttribPointer(e[i] + 3, 4, s.type, !1, t, 48), this._cgl.gl.vertexAttribDivisor(e[i], 1), this._cgl.gl.vertexAttribDivisor(e[i] + 1, 1), this._cgl.gl.vertexAttribDivisor(e[i] + 2, 1), this._cgl.gl.vertexAttribDivisor(e[i] + 3, 1)
                } else console.log("unknown instance attrib size", s.name);
                else {
                    if (s.itemSize && 0 != s.itemSize || console.log("attrib itemsize error", this._geom.name, s), this._cgl.gl.vertexAttribPointer(e[i], s.itemSize, s.type, !1, 4 * s.itemSize, 0), s.pointer)
                        for (var r = 0; r < s.pointer.length; r++) {
                            var n = s.pointer[r]; - 1 == n.loc && (n.loc = this._cgl.glGetAttribLocation(t.getProgram(), n.name)), z.profileAttrLoc++, this._cgl.gl.enableVertexAttribArray(n.loc), this._cgl.gl.vertexAttribPointer(n.loc, s.itemSize, s.type, !1, n.stride, n.offset)
                        }
                    this.bindFeedback(s)
                }
            }
            0 !== this._bufVerticesIndizes.numItems && this._cgl.gl.bindBuffer(this._cgl.gl.ELEMENT_ARRAY_BUFFER, this._bufVerticesIndizes)
        }, et.prototype.unBind = function () {
            var t = this._lastShader;
            if (this._lastShader = null, t) {
                var e = [];
                this._attribLocs[t.id] ? e = this._attribLocs[t.id] : this._attribLocs[t.id] = e, tt.lastMesh = null;
                for (var i = 0; i < this._attributes.length; i++) this._attributes[i].instanced && (this._attributes[i].itemSize <= 4 ? (-1 != e[i] && this._cgl.gl.vertexAttribDivisor(e[i], 0), e[i] >= 0 && this._cgl.gl.disableVertexAttribArray(e[i])) : (this._cgl.gl.vertexAttribDivisor(e[i], 0), this._cgl.gl.vertexAttribDivisor(e[i] + 1, 0), this._cgl.gl.vertexAttribDivisor(e[i] + 2, 0), this._cgl.gl.vertexAttribDivisor(e[i] + 3, 0), this._cgl.gl.disableVertexAttribArray(e[i] + 1), this._cgl.gl.disableVertexAttribArray(e[i] + 2), this._cgl.gl.disableVertexAttribArray(e[i] + 3))), -1 != e[i] && this._cgl.gl.disableVertexAttribArray(e[i])
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
                var i = this._cgl.gl.TRIANGLES;
                void 0 !== this._glPrimitive && (i = this._glPrimitive), null !== t.glPrimitive && (i = t.glPrimitive), this.hasFeedbacks() ? this.drawFeedbacks(t, i) : 0 === this._bufVerticesIndizes.numItems ? 0 === this._numInstances ? this._cgl.gl.drawArrays(i, this._bufVertexAttrib.startItem, this._bufVertexAttrib.numItems - this._bufVertexAttrib.startItem) : this._cgl.gl.drawArraysInstanced(i, this._bufVertexAttrib.startItem, this._bufVertexAttrib.numItems, this._numInstances) : 0 === this._numInstances ? this._cgl.gl.drawElements(i, this._bufVerticesIndizes.numItems, this._cgl.gl.UNSIGNED_SHORT, 0) : this._cgl.gl.drawElementsInstanced(i, this._bufVerticesIndizes.numItems, this._cgl.gl.UNSIGNED_SHORT, 0, this._numInstances)
            }
        }, et.prototype.setNumInstances = function (t) {
            if (this._numInstances = t, t > 0) {
                for (var e = new Float32Array(t), i = 0; i < t; i++) e[i] = i;
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
            }, t.prototype.setAttributeFeedback = function () {}, t.prototype.setFeedback = function (t, e, i) {
                var s = {
                        nameOut: e
                    },
                    r = !1;
                this.unBindFeedbacks();
                for (var n = 0; n < this._feedBacks.length; n++) this._feedBacks[n].nameOut == e && (s = this._feedBacks[n], r = !0);
                return r || (this._feedBacksChanged = !0), s.initialArr = i, s.attrib = t, s.outBuffer && this._cgl.gl.deleteBuffer(s.outBuffer), s.outBuffer = this._cgl.gl.createBuffer(), this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, s.outBuffer), this._cgl.gl.bufferData(this._cgl.gl.ARRAY_BUFFER, s.initialArr, this._cgl.gl.STATIC_DRAW), this._cgl.gl.bindBuffer(this._cgl.gl.ARRAY_BUFFER, s.attrib.buffer), this._cgl.gl.bufferData(this._cgl.gl.ARRAY_BUFFER, s.initialArr, this._cgl.gl.STATIC_DRAW), r || this._feedBacks.push(s), s
            }, t.prototype.bindFeedback = function (t) {
                if (this._feedBacks && 0 !== this._feedBacks.length) {
                    -1 == this._transformFeedBackLoc && (this._transformFeedBackLoc = this._cgl.gl.createTransformFeedback()), this._cgl.gl.bindTransformFeedback(this._cgl.gl.TRANSFORM_FEEDBACK, this._transformFeedBackLoc);
                    for (var e = 0; e < this._feedBacks.length; e++) {
                        var i = this._feedBacks[e];
                        i.attrib == t && (!0, this._cgl.gl.bindBufferBase(this._cgl.gl.TRANSFORM_FEEDBACK_BUFFER, e, i.outBuffer))
                    }
                }
            }, t.prototype.drawFeedbacks = function (t, e) {
                var i = 0;
                if (this._feedBacksChanged) {
                    var s = [];
                    for (this._cgl.gl.bindTransformFeedback(this._cgl.gl.TRANSFORM_FEEDBACK, this._transformFeedBackLoc), i = 0; i < this._feedBacks.length; i++) s.push(this._feedBacks[i].nameOut);
                    return t.setFeedbackNames(s), console.log("feedbacknames", s), t.compile(), this._feedBacksChanged = !1, this._cgl.gl.bindTransformFeedback(this._cgl.gl.TRANSFORM_FEEDBACK, null), void console.log("changed finished")
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
    const it = {
            getSimpleRect: function (t, e) {
                var i = new Z(e);
                return i.vertices = [1, 1, 0, -1, 1, 0, 1, -1, 0, -1, -1, 0], i.texCoords = [1, 1, 0, 1, 1, 0, 0, 0], i.verticesIndices = [0, 1, 2, 2, 1, 3], new et(t, i)
            }
        },
        st = function (t, e) {
            this._cgl = t, t.TextureEffectMesh || this.createMesh(), this._textureSource = null, this._textureTarget = null, this._frameBuf = this._cgl.gl.createFramebuffer(), this._frameBuf2 = this._cgl.gl.createFramebuffer(), this._renderbuffer = this._cgl.gl.createRenderbuffer(), this._renderbuffer2 = this._cgl.gl.createRenderbuffer(), this.switched = !1, this.depth = !1
        };
    st.prototype.setSourceTexture = function (t) {
        t.textureType == Q.TYPE_FLOAT && this._cgl.gl.getExtension("EXT_color_buffer_float"), null === t ? (this._textureSource = new Q(this._cgl), this._textureSource.setSize(16, 16)) : this._textureSource = t, this._textureSource.compareSettings(this._textureTarget) || (this._textureTarget && this._textureTarget.delete(), this._textureTarget = this._textureSource.clone(), z.profileEffectBuffercreate++, this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuf), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, this._renderbuffer), this.depth && this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER, this._cgl.gl.DEPTH_COMPONENT16, this._textureSource.width, this._textureSource.height), this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.TEXTURE_2D, this._textureTarget.tex, 0), this.depth && this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.RENDERBUFFER, this._renderbuffer), this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, null), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, null), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuf2), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, this._renderbuffer2), this.depth && this._cgl.gl.renderbufferStorage(this._cgl.gl.RENDERBUFFER, this._cgl.gl.DEPTH_COMPONENT16, this._textureSource.width, this._textureSource.height), this._cgl.gl.framebufferTexture2D(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.COLOR_ATTACHMENT0, this._cgl.gl.TEXTURE_2D, this._textureSource.tex, 0), this.depth && this._cgl.gl.framebufferRenderbuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.gl.DEPTH_ATTACHMENT, this._cgl.gl.RENDERBUFFER, this._renderbuffer2), this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, null), this._cgl.gl.bindRenderbuffer(this._cgl.gl.RENDERBUFFER, null), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, null))
    }, st.prototype.startEffect = function () {
        this._textureTarget ? (this.switched = !1, this._cgl.pushDepthTest(!1), this._cgl.pushModelMatrix(), this._cgl.pushPMatrix(), this._cgl.gl.viewport(0, 0, this.getCurrentTargetTexture().width, this.getCurrentTargetTexture().height), mat4.perspective(this._cgl.pMatrix, 45, this.getCurrentTargetTexture().width / this.getCurrentTargetTexture().height, .1, 1100), this._cgl.pushPMatrix(), mat4.identity(this._cgl.pMatrix), this._cgl.pushViewMatrix(), mat4.identity(this._cgl.vMatrix), this._cgl.pushModelMatrix(), mat4.identity(this._cgl.mvMatrix)) : console.log("effect has no target")
    }, st.prototype.endEffect = function () {
        this._cgl.popDepthTest(!1), this._cgl.popModelMatrix(), this._cgl.popPMatrix(), this._cgl.popModelMatrix(), this._cgl.popViewMatrix(), this._cgl.popPMatrix(), this._cgl.resetViewPort()
    }, st.prototype.bind = function () {
        null !== this._textureSource ? this.switched ? (this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuf2), this._cgl.pushGlFrameBuffer(this._frameBuf2)) : (this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._frameBuf), this._cgl.pushGlFrameBuffer(this._frameBuf)) : console.log("no base texture set!")
    }, st.prototype.finish = function () {
        null !== this._textureSource ? (this._cgl.TextureEffectMesh.render(this._cgl.getShader()), this._cgl.gl.bindFramebuffer(this._cgl.gl.FRAMEBUFFER, this._cgl.popGlFrameBuffer()), this._textureTarget.filter == Q.FILTER_MIPMAP && (this.switched ? (this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, this._textureSource.tex), this._textureSource.updateMipMap()) : (this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, this._textureTarget.tex), this._textureTarget.updateMipMap()), this._cgl.gl.bindTexture(this._cgl.gl.TEXTURE_2D, null)), this.switched = !this.switched) : console.log("no base texture set!")
    }, st.prototype.getCurrentTargetTexture = function () {
        return this.switched ? this._textureSource : this._textureTarget
    }, st.prototype.getCurrentSourceTexture = function () {
        return this.switched ? this._textureTarget : this._textureSource
    }, st.prototype.delete = function () {
        this._textureTarget && this._textureTarget.delete(), this._textureSource && this._textureSource.delete(), this._cgl.gl.deleteRenderbuffer(this._renderbuffer), this._cgl.gl.deleteFramebuffer(this._frameBuf)
    }, st.prototype.createMesh = function () {
        this._cgl.TextureEffectMesh = it.getSimpleRect(this._cgl, "textureEffect rect")
    }, st.checkOpNotInTextureEffect = function (t) {
        return t.uiAttribs.error && !t.patch.cgl.currentTextureEffect ? (t.uiAttr({
            error: null
        }), !0) : !t.patch.cgl.currentTextureEffect || (t.patch.cgl.currentTextureEffect && !t.uiAttribs.error ? (t.uiAttr({
            error: "This op can not be a child of a ImageCompose/texture effect! imagecompose should only have textureeffect childs."
        }), !1) : !t.patch.cgl.currentTextureEffect)
    }, st.checkOpInEffect = function (t) {
        return t.patch.cgl.currentTextureEffect && t.uiAttribs.error ? (t.uiAttr({
            error: null
        }), !0) : !!t.patch.cgl.currentTextureEffect || (t.patch.cgl.currentTextureEffect || t.uiAttribs.error ? !!t.patch.cgl.currentTextureEffect : (t.uiAttr({
            error: 'This op must be a child of a texture effect! More infos <a href="https://docs.cables.gl/image_composition/image_composition.html" target="_blank">here</a>.'
        }), !1))
    }, st.getBlendCode = function () {
        return "".endl() + "vec3 _blend(vec3 base,vec3 blend)".endl() + "{".endl() + "   vec3 colNew=blend;".endl() + "   #ifdef BM_MULTIPLY".endl() + "       colNew=base*blend;".endl() + "   #endif".endl() + "   #ifdef BM_MULTIPLY_INV".endl() + "       colNew=base* vec3(1.0)-blend;".endl() + "   #endif".endl() + "   #ifdef BM_AVERAGE".endl() + "       colNew=((base + blend) / 2.0);".endl() + "   #endif".endl() + "   #ifdef BM_ADD".endl() + "       colNew=min(base + blend, vec3(1.0));".endl() + "   #endif".endl() + "   #ifdef BM_SUBSTRACT".endl() + "       colNew=max(base + blend - vec3(1.0), vec3(0.0));".endl() + "   #endif".endl() + "   #ifdef BM_DIFFERENCE".endl() + "       colNew=abs(base - blend);".endl() + "   #endif".endl() + "   #ifdef BM_NEGATION".endl() + "       colNew=(vec3(1.0) - abs(vec3(1.0) - base - blend));".endl() + "   #endif".endl() + "   #ifdef BM_EXCLUSION".endl() + "       colNew=(base + blend - 2.0 * base * blend);".endl() + "   #endif".endl() + "   #ifdef BM_LIGHTEN".endl() + "       colNew=max(blend, base);".endl() + "   #endif".endl() + "   #ifdef BM_DARKEN".endl() + "       colNew=min(blend, base);".endl() + "   #endif".endl() + "   #ifdef BM_OVERLAY".endl() + "      #define BlendOverlayf(base, blend)  (base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend)))".endl() + "      colNew=vec3(BlendOverlayf(base.r, blend.r),BlendOverlayf(base.g, blend.g),BlendOverlayf(base.b, blend.b));".endl() + "   #endif".endl() + "   #ifdef BM_SCREEN".endl() + "      #define BlendScreenf(base, blend)       (1.0 - ((1.0 - base) * (1.0 - blend)))".endl() + "      colNew=vec3(BlendScreenf(base.r, blend.r),BlendScreenf(base.g, blend.g),BlendScreenf(base.b, blend.b));".endl() + "   #endif".endl() + "   #ifdef BM_SOFTLIGHT".endl() + "      #define BlendSoftLightf(base, blend)    ((blend < 0.5) ? (2.0 * base * blend + base * base * (1.0 - 2.0 * blend)) : (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend)))".endl() + "      colNew=vec3(BlendSoftLightf(base.r, blend.r),BlendSoftLightf(base.g, blend.g),BlendSoftLightf(base.b, blend.b));".endl() + "   #endif".endl() + "   #ifdef BM_HARDLIGHT".endl() + "      #define BlendOverlayf(base, blend)  (base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend)))".endl() + "      colNew=vec3(BlendOverlayf(base.r, blend.r),BlendOverlayf(base.g, blend.g),BlendOverlayf(base.b, blend.b));".endl() + "   #endif".endl() + "   #ifdef BM_COLORDODGE".endl() + "      #define BlendColorDodgef(base, blend)   ((blend == 1.0) ? blend : min(base / (1.0 - blend), 1.0))".endl() + "      colNew=vec3(BlendColorDodgef(base.r, blend.r),BlendColorDodgef(base.g, blend.g),BlendColorDodgef(base.b, blend.b));".endl() + "   #endif".endl() + "   #ifdef BM_COLORBURN".endl() + "      #define BlendColorBurnf(base, blend)    ((blend == 0.0) ? blend : max((1.0 - ((1.0 - base) / blend)), 0.0))".endl() + "      colNew=vec3(BlendColorBurnf(base.r, blend.r),BlendColorBurnf(base.g, blend.g),BlendColorBurnf(base.b, blend.b));".endl() + "   #endif".endl() + "   return colNew;".endl() + "}".endl() + "vec4 cgl_blend(vec4 oldColor,vec4 newColor,float amount)".endl() + "{".endl() + "   vec4 col=vec4( _blend(oldColor.rgb,newColor.rgb) ,1.0);".endl() + "   col=vec4( mix( col.rgb, oldColor.rgb ,1.0-oldColor.a*amount),1.0);".endl() + "   return col;".endl() + "}"
    }, st.onChangeBlendSelect = function (t, e) {
        "normal" == e ? t.define("BM_NORMAL") : t.removeDefine("BM_NORMAL"), "multiply" == e ? t.define("BM_MULTIPLY") : t.removeDefine("BM_MULTIPLY"), "multiply invert" == e ? t.define("BM_MULTIPLY_INV") : t.removeDefine("BM_MULTIPLY_INV"), "average" == e ? t.define("BM_AVERAGE") : t.removeDefine("BM_AVERAGE"), "add" == e ? t.define("BM_ADD") : t.removeDefine("BM_ADD"), "substract" == e ? t.define("BM_SUBSTRACT") : t.removeDefine("BM_SUBSTRACT"), "difference" == e ? t.define("BM_DIFFERENCE") : t.removeDefine("BM_DIFFERENCE"), "negation" == e ? t.define("BM_NEGATION") : t.removeDefine("BM_NEGATION"), "exclusion" == e ? t.define("BM_EXCLUSION") : t.removeDefine("BM_EXCLUSION"), "lighten" == e ? t.define("BM_LIGHTEN") : t.removeDefine("BM_LIGHTEN"), "darken" == e ? t.define("BM_DARKEN") : t.removeDefine("BM_DARKEN"), "overlay" == e ? t.define("BM_OVERLAY") : t.removeDefine("BM_OVERLAY"), "screen" == e ? t.define("BM_SCREEN") : t.removeDefine("BM_SCREEN"), "softlight" == e ? t.define("BM_SOFTLIGHT") : t.removeDefine("BM_SOFTLIGHT"), "hardlight" == e ? t.define("BM_HARDLIGHT") : t.removeDefine("BM_HARDLIGHT"), "color dodge" == e ? t.define("BM_COLORDODGE") : t.removeDefine("BM_COLORDODGE"), "color burn" == e ? t.define("BM_COLORBURN") : t.removeDefine("BM_COLORBURN")
    }, st.AddBlendSelect = function (t, e) {
        return t.inValueSelect(e, ["normal", "lighten", "darken", "multiply", "multiply invert", "average", "add", "substract", "difference", "negation", "exclusion", "overlay", "screen", "color dodge", "color burn", "softlight", "hardlight"], "normal")
    }, st.setupBlending = function (t, e, i, s) {
        t.setPortGroup("Blending", [i, s]), i.onChange = function () {
            st.onChangeBlendSelect(e, i.get());
            var s = i.get();
            "normal" == s ? s = null : "multiply" == s ? s = "mul" : "multiply invert" == s ? s = "mulinv" : "lighten" == s ? s = "light" : "darken" == s ? s = "darken" : "average" == s ? s = "avg" : "substract" == s ? s = "sub" : "difference" == s ? s = "diff" : "negation" == s ? s = "neg" : "negation" == s ? s = "neg" : "negation" == s ? s = "neg" : "exclusion" == s ? s = "exc" : "overlay" == s ? s = "ovl" : "color dodge" == s ? s = "dodge" : "color burn" == s ? s = "burn" : "softlight" == s ? s = "soft" : "hardlight" == s && (s = "hard"), t.setUiAttrib({
                extendTitle: s
            })
        }
    };
    const rt = {
            "CGL.BLENDMODES": function () {
                this.name = "blendmodes", this.srcHeadFrag = st.getBlendCode()
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
                    Q.getRandomTexture(t), t.setTexture(7, Q.getRandomTexture(t).tex)
                }
            }
        },
        nt = function () {
            return window.performance.now()
        },
        ot = function () {
            return nt()
        },
        at = function () {
            this._timeStart = nt(), this._timeOffset = 0, this._currentTime = 0, this._lastTime = 0, this._paused = !0, this._delay = 0, this._eventsPaused = !1, this.overwriteTime = -1, this.cbPlayPause = [], this.cbTimeChange = []
        };
    at.prototype._getTime = function () {
        return this._lastTime = (nt() - this._timeStart) / 1e3, this._lastTime + this._timeOffset
    }, at.prototype._eventPlayPause = function () {
        if (!this._eventsPaused)
            for (var t in this.cbPlayPause) this.cbPlayPause[t]()
    }, at.prototype._eventTimeChange = function () {
        if (!this._eventsPaused)
            for (var t in this.cbTimeChange) this.cbTimeChange[t]()
    }, at.prototype.setDelay = function (t) {
        this._delay = t, this._eventTimeChange()
    }, at.prototype.isPlaying = function () {
        return !this._paused
    }, at.prototype.update = function () {
        if (!this._paused) return this._currentTime = this._getTime(), this._currentTime
    }, at.prototype.getMillis = function () {
        return 1e3 * this.get()
    }, at.prototype.get = at.prototype.getTime = function () {
        return this.overwriteTime >= 0 ? this.overwriteTime - this._delay : this._currentTime - this._delay
    }, at.prototype.togglePlay = function () {
        this._paused ? this.play() : this.pause()
    }, at.prototype.setTime = function (t) {
        t < 0 && (t = 0), this._timeStart = nt(), this._timeOffset = t, this._currentTime = t, this._eventTimeChange()
    }, at.prototype.setOffset = function (t) {
        this._currentTime + t < 0 ? (this._timeStart = nt(), this._timeOffset = 0, this._currentTime = 0) : (this._timeOffset += t, this._currentTime = this._lastTime + this._timeOffset), this._eventTimeChange()
    }, at.prototype.play = function () {
        this._timeStart = nt(), this._paused = !1, this._eventPlayPause()
    }, at.prototype.pause = function () {
        this._timeOffset = this._currentTime, this._paused = !0, this._eventPlayPause()
    }, at.prototype.pauseEvents = function (t) {
        this._eventsPaused = t
    }, at.prototype.onPlayPause = function (t) {
        t && "function" == typeof t && this.cbPlayPause.push(t)
    }, at.prototype.onTimeChange = function (t) {
        t && "function" == typeof t && this.cbTimeChange.push(t)
    };
    const ht = function (t, e) {
        if (!t) throw "shader constructed without cgl";
        this._cgl = t, this._name = e || "unknown", this.glslVersion = 0, t.glVersion > 1 && (this.glslVersion = 300), this.id = A(), this._program = null, this._uniforms = [], this._drawBuffers = [!0], this._defines = [], this._needsRecompile = !0, this._projMatrixUniform = null, this._mvMatrixUniform = null, this._mMatrixUniform = null, this._vMatrixUniform = null, this._camPosUniform = null, this._normalMatrixUniform = null, this._inverseViewMatrixUniform = null, this._attrVertexPos = -1, this.precision = t.patch.config.glslPrecision || "highp", this._pMatrixState = -1, this._vMatrixState = -1, this._modGroupCount = 0, this._feedBackNames = [], this._attributes = [], this.glPrimitive = null, this.offScreenPass = !1, this._extensions = [], this.srcVert = this.getDefaultVertexShader(), this.srcFrag = this.getDefaultFragmentShader(), this.lastCompile = 0, this._moduleNames = [], this._modules = [], this._moduleNumId = 0, this._libs = [], this._tempNormalMatrix = mat4.create(), this._tempCamPosMatrix = mat4.create(), this._tempInverseViewMatrix = mat4.create(), this.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG"])
    };
    ht.prototype.getCgl = function () {
        return this._cgl
    }, ht.prototype.getName = function () {
        return this._name
    }, ht.prototype.enableExtension = function (t) {
        this.setWhyCompile("enable extension " + t), this._needsRecompile = !0, this._extensions.push(t)
    }, ht.prototype.getAttrVertexPos = function () {
        return this._attrVertexPos
    }, ht.prototype.hasTextureUniforms = function () {
        for (var t = 0; t < this._uniforms.length; t++)
            if ("t" == this._uniforms[t].getType()) return !0;
        return !1
    }, ht.prototype.setWhyCompile = function (t) {}, ht.prototype.setSource = function (t, e) {
        this.srcVert = t, this.srcFrag = e, this.setWhyCompile("Source changed"), this._needsRecompile = !0
    }, ht.prototype._addLibs = function (t) {
        for (var e in rt)
            if (t.indexOf(e) > -1) {
                var i = new rt[e];
                t = t.replace("{{" + e + "}}", i.srcHeadFrag), this._libs.push(i), i.initUniforms && i.initUniforms(this)
            } return t
    }, ht.prototype.compile = function () {
        z.profileShaderCompiles++, z.profileShaderCompileName = this._name;
        var t = "";
        if (this._extensions)
            for (i = 0; i < this._extensions.length; i++) t += "#extension " + this._extensions[i] + " : enable".endl();
        var e = "",
            i = 0;
        for (i = 0; i < this._defines.length; i++) e += "#define " + this._defines[i][0] + " " + this._defines[i][1] + "".endl();
        if (this._uniforms)
            for (i = 0; i < this._uniforms.length; i++) this._uniforms[i].resetLoc();
        this.hasTextureUniforms() && (e += "#define HAS_TEXTURES".endl());
        var s = "",
            r = "";
        if (300 == this.glslVersion) {
            var n = "",
                o = 0;
            if (this.srcFrag.indexOf("outColor0") > -1 && (this._drawBuffers[0] = !0), this.srcFrag.indexOf("outColor1") > -1 && (this._drawBuffers[1] = !0), this.srcFrag.indexOf("outColor2") > -1 && (this._drawBuffers[2] = !0), this.srcFrag.indexOf("outColor3") > -1 && (this._drawBuffers[3] = !0), 1 == this._drawBuffers.length) n = "out vec4 outColor;".endl(), n += "#define gl_FragColor outColor".endl();
            else {
                o = 0;
                n += "vec4 outColor;".endl();
                for (i = 0; i < this._drawBuffers.length; i++) 0 == o && (n += "#define gl_FragColor outColor" + i + "".endl()), n += "layout(location = " + i + ") out vec4 outColor" + i + ";".endl(), o++
            }
            s = "#version 300 es".endl() + "// ".endl() + "// vertex shader " + this._name.endl() + "// ".endl() + "precision " + this.precision + " float;".endl() + "".endl() + "#define WEBGL2".endl() + "#define texture2D texture".endl() + "#define UNI uniform".endl() + "#define IN in".endl() + "#define OUT out".endl(), r = "#version 300 es".endl() + "// ".endl() + "// fragment shader " + this._name.endl() + "// ".endl() + "precision " + this.precision + " float;".endl() + "".endl() + "#define WEBGL2".endl() + "#define texture2D texture".endl() + "#define IN in".endl() + "#define UNI uniform".endl() + n.endl()
        } else r = "".endl() + "// ".endl() + "// fragment shader " + this._name.endl() + "// ".endl() + "#define WEBGL1".endl() + "#define texture texture2D".endl() + "#define outColor gl_FragColor".endl() + "#define IN varying".endl() + "#define UNI uniform".endl(), s = "".endl() + "// ".endl() + "// vertex shader " + this._name.endl() + "// ".endl() + "#define WEBGL1".endl() + "#define texture texture2D".endl() + "#define OUT varying".endl() + "#define IN attribute".endl() + "#define UNI uniform".endl(); - 1 == r.indexOf("precision") && (r = "precision " + this.precision + " float;".endl() + r), -1 == s.indexOf("precision") && (s = "precision " + this.precision + " float;".endl() + s), /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (r += "#define MOBILE".endl(), s += "#define MOBILE".endl()), s = t + s + e + this.srcVert, r = t + r + e + this.srcFrag;
        var a = "",
            h = "";
        this._modules.sort(function (t, e) {
            return t.group - e.group
        }), this._modules.sort(function (t, e) {
            return t.priority || 0 - e.priority || 0
        });
        var l = !1;
        for (i = 0; i < this._moduleNames.length; i++) {
            for (var u = "", c = "", p = 0; p < this._modules.length; p++)
                if (this._modules[p].name == this._moduleNames[i]) {
                    if (a += "\n//---- MOD: " + this._modules[p].group + ": " + p + " - " + this._modules[p].title + " ------\n", h += "\n//---- MOD: " + this._modules[p].group + ": " + p + " - " + this._modules[p].title + " ------\n", u += "\n\n//---- MOD: " + this._modules[p].title + " ------\n", c += "\n\n//---- MOD: " + this._modules[p].title + " ------\n", !l) {
                        l = !0;
                        for (var d = 0; d < this._attributes.length; d++) this._attributes[d].name && this._attributes[d].type && (a += "".endl() + "#ifndef ATTRIB_" + this._attributes[d].name.endl() + "  #define ATTRIB_" + this._attributes[d].name.endl() + "  IN " + this._attributes[d].type + " " + this._attributes[d].name + ";".endl() + "#endif", this._attributes[d].nameFrag && (a += "".endl() + "#ifndef ATTRIB_" + this._attributes[d].nameFrag.endl() + "  #define ATTRIB_" + this._attributes[d].nameFrag.endl() + "  OUT " + this._attributes[d].type + " " + this._attributes[d].nameFrag + ";".endl() + "#endif", u += "".endl() + this._attributes[d].nameFrag + "=" + this._attributes[d].name + ";"), h += "".endl() + "#ifndef ATTRIB_" + this._attributes[d].nameFrag.endl() + "  #define ATTRIB_" + this._attributes[d].nameFrag.endl() + "  IN " + this._attributes[d].type + " " + this._attributes[d].nameFrag + ";".endl() + "#endif")
                    }
                    a += this._modules[p].srcHeadVert || "", h += this._modules[p].srcHeadFrag || "", u += this._modules[p].srcBodyVert || "", c += this._modules[p].srcBodyFrag || "", a += "\n//---- end mod ------\n", h += "\n//---- end mod ------\n", c += "\n//---- end mod ------\n", u = (u += "\n//---- end mod ------\n").replace(/{{mod}}/g, this._modules[p].prefix), c = c.replace(/{{mod}}/g, this._modules[p].prefix), a = a.replace(/{{mod}}/g, this._modules[p].prefix), h = h.replace(/{{mod}}/g, this._modules[p].prefix), u = u.replace(/MOD_/g, this._modules[p].prefix), c = c.replace(/MOD_/g, this._modules[p].prefix), a = a.replace(/MOD_/g, this._modules[p].prefix), h = h.replace(/MOD_/g, this._modules[p].prefix)
                } s = s.replace("{{" + this._moduleNames[i] + "}}", u), r = r.replace("{{" + this._moduleNames[i] + "}}", c)
        }
        if (s = s.replace("{{MODULES_HEAD}}", a), r = r.replace("{{MODULES_HEAD}}", h), s = this._addLibs(s), r = this._addLibs(r), this._program)
            for (this._program = this._createProgram(s, r), this._projMatrixUniform = null, i = 0; i < this._uniforms.length; i++) this._uniforms[i].resetLoc();
        else this._program = this._createProgram(s, r);
        this.finalShaderFrag = r, this.finalShaderVert = s, tt.lastMesh = null, tt.lastShader = null, this._needsRecompile = !1, this.lastCompile = ot()
    }, ht.prototype.bind = function () {
        var t = 0;
        if (tt.lastShader = this, this._program && !this._needsRecompile || this.compile(), !this._projMatrixUniform)
            for (this._attrVertexPos = this._cgl.glGetAttribLocation(this._program, $.SHADER.SHADERVAR_VERTEX_POSITION), this._projMatrixUniform = this._cgl.gl.getUniformLocation(this._program, $.SHADER.SHADERVAR_UNI_PROJMAT), this._mvMatrixUniform = this._cgl.gl.getUniformLocation(this._program, "mvMatrix"), this._vMatrixUniform = this._cgl.gl.getUniformLocation(this._program, $.SHADER.SHADERVAR_UNI_VIEWMAT), this._mMatrixUniform = this._cgl.gl.getUniformLocation(this._program, $.SHADER.SHADERVAR_UNI_MODELMAT), this._camPosUniform = this._cgl.gl.getUniformLocation(this._program, $.SHADER.SHADERVAR_UNI_VIEWPOS), this._normalMatrixUniform = this._cgl.gl.getUniformLocation(this._program, $.SHADER.SHADERVAR_UNI_NORMALMAT), this._inverseViewMatrixUniform = this._cgl.gl.getUniformLocation(this._program, $.SHADER.SHADERVAR_UNI_INVVIEWMAT), t = 0; t < this._uniforms.length; t++) this._uniforms[t].needsUpdate = !0;
        for (this._cgl.currentProgram != this._program && (z.profileShaderBinds++, this._cgl.gl.useProgram(this._program), this._cgl.currentProgram = this._program), t = 0; t < this._uniforms.length; t++) this._uniforms[t].needsUpdate && this._uniforms[t].updateValue();
        if (this._pMatrixState != this._cgl.getProjectionMatrixStateCount() && (this._pMatrixState = this._cgl.getProjectionMatrixStateCount(), this._cgl.gl.uniformMatrix4fv(this._projMatrixUniform, !1, this._cgl.pMatrix), z.profileMVPMatrixCount++), this._vMatrixUniform) this._vMatrixState != this._cgl.getViewMatrixStateCount() && (this._cgl.gl.uniformMatrix4fv(this._vMatrixUniform, !1, this._cgl.vMatrix), z.profileMVPMatrixCount++, this._vMatrixState = this._cgl.getViewMatrixStateCount(), this._inverseViewMatrixUniform && (mat4.invert(this._tempInverseViewMatrix, this._cgl.vMatrix), this._cgl.gl.uniformMatrix4fv(this._inverseViewMatrixUniform, !1, this._tempInverseViewMatrix), z.profileMVPMatrixCount++)), this._cgl.gl.uniformMatrix4fv(this._mMatrixUniform, !1, this._cgl.mMatrix), z.profileMVPMatrixCount++, this._camPosUniform && (mat4.invert(this._tempCamPosMatrix, this._cgl.vMatrix), this._cgl.gl.uniform3f(this._camPosUniform, this._tempCamPosMatrix[12], this._tempCamPosMatrix[13], this._tempCamPosMatrix[14]), z.profileMVPMatrixCount++);
        else {
            var e = mat4.create();
            mat4.mul(e, this._cgl.vMatrix, this._cgl.mMatrix), this._cgl.gl.uniformMatrix4fv(this._mvMatrixUniform, !1, e), z.profileMVPMatrixCount++
        }
        this._normalMatrixUniform && (mat4.mul(this._tempNormalMatrix, this._cgl.vMatrix, this._cgl.mMatrix), mat4.invert(this._tempNormalMatrix, this._tempNormalMatrix), mat4.transpose(this._tempNormalMatrix, this._tempNormalMatrix), this._cgl.gl.uniformMatrix4fv(this._normalMatrixUniform, !1, this._tempNormalMatrix), z.profileMVPMatrixCount++);
        for (t = 0; t < this._libs.length; t++) this._libs[t].onBind && this._libs[t].onBind.bind(this._libs[t])(this._cgl, this)
    }, ht.prototype.toggleDefine = function (t, e) {
        e ? this.define(t) : this.removeDefine(t)
    }, ht.prototype.define = function (t, e) {
        e || (e = "");
        for (var i = 0; i < this._defines.length; i++) {
            if (this._defines[i][0] == t && this._defines[i][1] == e) return;
            if (this._defines[i][0] == t) return this._defines[i][1] = e, void(this._needsRecompile = !0)
        }
        this._defines.push([t, e]), this._needsRecompile = !0, this.setWhyCompile("define " + t + " " + e)
    }, ht.prototype.getDefines = function () {
        return this._defines
    }, ht.prototype.getDefine = function (t) {
        for (var e = 0; e < this._defines.length; e++)
            if (this._defines[e][0] == t) return this._defines[e][1];
        return null
    }, ht.prototype.hasDefine = function (t) {
        for (var e = 0; e < this._defines.length; e++)
            if (this._defines[e][0] == t) return !0
    }, ht.prototype.removeDefine = function (t) {
        for (var e = 0; e < this._defines.length; e++)
            if (this._defines[e][0] == t) return this._defines.splice(e, 1), void(this._needsRecompile = !0)
    }, ht.prototype.removeModule = function (t) {
        for (var e = 0; e < this._modules.length; e++)
            if (t && t.id && (this._modules[e].id == t.id || !this._modules[e])) {
                for (var i = !0; i;) {
                    i = !1;
                    for (var s = 0; s < this._uniforms.length; s++) 0 != this._uniforms[s].getName().indexOf(t.prefix) || (this._uniforms.splice(s, 1), i = !0)
                }
                this._needsRecompile = !0, this.setWhyCompile("remove module " + t.title), this._modules.splice(e, 1);
                break
            }
    }, ht.prototype.getNumModules = function () {
        return this._modules.length
    }, ht.prototype.getCurrentModules = function () {
        return this._modules
    }, ht.prototype.addModule = function (t, e) {
        return t.id || (t.id = v()), t.numId || (t.numId = this._moduleNumId), t.num || (t.num = this._modules.length), t.group = e ? e.group : this._modGroupCount++, t.prefix = "mod" + t.group, this._modules.push(t), this._needsRecompile = !0, this.setWhyCompile("add module " + t.title), this._moduleNumId++, t
    }, ht.prototype.setModules = function (t) {
        this._moduleNames = t
    }, ht.prototype.dispose = function () {
        this._cgl.gl.deleteProgram(this._program)
    }, ht.prototype.setDrawBuffers = function (t) {
        this._drawBuffers = t, this._needsRecompile = !0
    }, ht.prototype.getUniforms = function () {
        return this._uniforms
    }, ht.prototype.getUniform = function (t) {
        for (var e = 0; e < this._uniforms.length; e++)
            if (this._uniforms[e].getName() == t) return this._uniforms[e];
        return null
    }, ht.prototype.removeUniform = function (t) {
        for (var e = 0; e < this._uniforms.length; e++) this._uniforms[e].getName() == t && this._uniforms.splice(e, 1);
        this._needsRecompile = !0, this.setWhyCompile("remove uniform " + t)
    }, ht.prototype.addUniform = function (t) {
        this._uniforms.push(t), this.setWhyCompile("add uniform " + name), this._needsRecompile = !0
    }, ht.prototype._createProgram = function (t, e) {
        var i = this._cgl.gl.createProgram();
        return this.vshader = ht.createShader(this._cgl, t, this._cgl.gl.VERTEX_SHADER, this), this.fshader = ht.createShader(this._cgl, e, this._cgl.gl.FRAGMENT_SHADER, this), this._cgl.gl.attachShader(i, this.vshader), this._cgl.gl.attachShader(i, this.fshader), this._linkProgram(i), i
    }, ht.prototype.hasErrors = function () {
        return this._hasErrors
    }, ht.prototype._linkProgram = function (t) {
        this._feedBackNames.length > 0 && this._cgl.gl.transformFeedbackVaryings(t, this._feedBackNames, this._cgl.gl.SEPARATE_ATTRIBS), this._cgl.gl.linkProgram(t), this._cgl.gl.validateProgram(t), this._cgl.gl.getProgramParameter(t, this._cgl.gl.LINK_STATUS) || (console.warn(this._cgl.gl.getShaderInfoLog(this.fshader)), console.warn(this._cgl.gl.getShaderInfoLog(this.vshader)), console.error(name + " shader linking fail..."), console.log("srcFrag", this.srcFrag), console.log("srcVert", this.srcVert), console.log(name + " programinfo: ", this._cgl.gl.getProgramInfoLog(t)), console.log("--------------------------------------"), console.log(this), console.log("--------------------------------------"), name = "errorshader", this.setSource(ht.getDefaultVertexShader(), ht.getErrorFragmentShader()))
    }, ht.prototype.getProgram = function () {
        return this._program
    }, ht.prototype.setFeedbackNames = function (t) {
        this._needsRecompile = !0, this._feedBackNames = t
    }, ht.prototype.getDefaultVertexShader = ht.getDefaultVertexShader = function () {
        return "".endl() + "{{MODULES_HEAD}}".endl() + "IN vec3 vPosition;".endl() + "IN vec2 attrTexCoord;".endl() + "IN vec3 attrVertNormal;".endl() + "IN float attrVertIndex;".endl() + "OUT vec2 texCoord;".endl() + "OUT vec3 norm;".endl() + "UNI mat4 projMatrix;".endl() + "UNI mat4 viewMatrix;".endl() + "UNI mat4 modelMatrix;".endl() + "void main()".endl() + "{".endl() + "   texCoord=attrTexCoord;".endl() + "   norm=attrVertNormal;".endl() + "   vec4 pos=vec4(vPosition,  1.0);".endl() + "   mat4 mMatrix=modelMatrix;".endl() + "   {{MODULE_VERTEX_POSITION}}".endl() + "   gl_Position = projMatrix * (viewMatrix*mMatrix) * pos;".endl() + "}"
    }, ht.prototype.getDefaultFragmentShader = ht.getDefaultFragmentShader = function (t, e, i) {
        return null == t && (t = .5, e = .5, i = .5), "".endl() + "IN vec2 texCoord;".endl() + "{{MODULES_HEAD}}".endl() + "void main()".endl() + "{".endl() + "    vec4 col=vec4(" + t + "," + e + "," + i + ",1.0);".endl() + "    {{MODULE_COLOR}}".endl() + "    outColor = col;".endl() + "}"
    }, ht.prototype.addAttribute = function (t) {
        for (var e = 0; e < this._attributes.length; e++)
            if (this._attributes[e].name == t.name && this._attributes[e].nameFrag == t.nameFrag) return;
        this._attributes.push(t), this._needsRecompile = !0
    }, ht.getErrorFragmentShader = function () {
        return "".endl() + "void main()".endl() + "{".endl() + "   float g=mod((gl_FragCoord.y+gl_FragCoord.x),50.0)/50.0;".endl() + "   g= step(0.1,g);".endl() + "   outColor = vec4( g+0.5, 0.0, 0.0, 1.0);".endl() + "}"
    }, ht.createShader = function (t, e, i, s) {
        var r = t.gl.createShader(i);
        if (t.gl.shaderSource(r, e), t.gl.compileShader(r), !t.gl.getShaderParameter(r, t.gl.COMPILE_STATUS)) {
            console.log("compile status: "), i == t.gl.VERTEX_SHADER && console.log("VERTEX_SHADER"), i == t.gl.FRAGMENT_SHADER && console.log("FRAGMENT_SHADER"), console.warn(t.gl.getShaderInfoLog(r));
            var n = t.gl.getShaderInfoLog(r),
                o = function (t) {
                    var e = [],
                        i = t.split("\n");
                    for (var s in i) {
                        var r = i[s].split(":");
                        parseInt(r[2], 10) && e.push(parseInt(r[2], 10))
                    }
                    return e
                }(n),
                a = '<div class="shaderErrorCode">',
                h = e.match(/^.*((\r\n|\n|\r)|$)/gm);
            for (var l in h) {
                var u = parseInt(l, 10) + 1,
                    c = u + ": " + h[l];
                console.log(c);
                var p = !1;
                for (var d in o) o[d] == u && (p = !0);
                p && (a += '<span class="error">'), a += c, p && (a += "</span>")
            }
            console.warn(n), a = (n = n.replace(/\n/g, "<br/>")) + "<br/>" + a + "<br/><br/>", t.patch.emitEvent("criticalError", "Shader error " + name, a), t.patch.isEditorMode() && console.log("Shader error " + name, a), a += "</div>", name = "errorshader", s.setSource(ht.getDefaultVertexShader(), ht.getErrorFragmentShader())
        }
        return r
    };
    const lt = Math.PI / 180,
        ut = (Math.PI, -1 != window.navigator.userAgent.indexOf("Windows")),
        ct = function (t) {
            var e;
            if (t.wheelDelta) e = t.wheelDelta % 120 - 0 == -0 ? t.wheelDelta / 120 : t.wheelDelta / 30, e *= -1.5, ut && (e *= 2);
            else {
                var i = t.deltaY;
                t.shiftKey && (i = t.deltaX);
                var s = i || t.detail;
                e = -(s % 3 ? 10 * s : s / 3), e *= -3
            }
            return e > 20 && (e = 20), e < -20 && (e = -20), e
        },
        pt = ct,
        dt = ct,
        _t = function () {
            this._arr = [mat4.create()], this._index = 0, this.stateCounter = 0
        };
    _t.prototype.push = function (t) {
        if (this._index++, this.stateCounter++, this._index == this._arr.length) {
            var e = mat4.create();
            this._arr.push(e)
        }
        return mat4.copy(this._arr[this._index], t || this._arr[this._index - 1]), this._arr[this._index]
    }, _t.prototype.pop = function () {
        return this.stateCounter++, this._index--, this._index < 0 && (this._index = 0), this._arr[this._index]
    }, _t.prototype.length = function () {
        return this._index
    };
    const gt = function (t) {
        var e = this,
            i = [0, 0, 0, 0];
        this.glVersion = 0, this.glUseHalfFloatTex = !1, this.clearCanvasTransparent = !0, this.clearCanvasDepth = !0, this.patch = t, this.temporaryTexture = null, this.frameStore = {}, this.gl = null, this.pMatrix = mat4.create(), this.mMatrix = mat4.create(), this.vMatrix = mat4.create(), this._textureslots = [], this._pMatrixStack = new _t, this._mMatrixStack = new _t, this._vMatrixStack = new _t, this._glFrameBufferStack = [], this._frameBufferStack = [], this._shaderStack = [], Object.defineProperty(this, "mvMatrix", {
            get() {
                return this.mMatrix
            },
            set(t) {
                this.mMatrix = t
            }
        }), this.canvas = null, this.pixelDensity = 1, mat4.identity(this.mMatrix), mat4.identity(this.vMatrix);
        var s = new ht(this, "simpleshader");
        s.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG"]), s.setSource(ht.getDefaultVertexShader(), ht.getDefaultFragmentShader());
        var r = s,
            n = [];
        this.addEventListener = function (t, e) {
            "resize" == t && n.push(e)
        }, this.removeEventListener = function (t, e) {
            if ("resize" == t)
                for (var i in n)
                    if (n[i] == e) return void n.splice(i, 1)
        }, this.exitError = function (t, e) {
            this.patch.exitError(t, e), this.aborted = !0
        }, this.setCanvas = function (t) {
            if (this.canvas = "string" == typeof t ? document.getElementById(t) : t, this.patch.config.canvas || (this.patch.config.canvas = {}), this.patch.config.canvas.hasOwnProperty("preserveDrawingBuffer") || (this.patch.config.canvas.preserveDrawingBuffer = !1), this.patch.config.canvas.hasOwnProperty("premultipliedAlpha") || (this.patch.config.canvas.premultipliedAlpha = !1), this.patch.config.canvas.hasOwnProperty("alpha") || (this.patch.config.canvas.alpha = !1), this.patch.config.hasOwnProperty("clearCanvasColor") && (this.clearCanvasTransparent = this.patch.config.clearCanvasColor), this.patch.config.hasOwnProperty("clearCanvasDepth") && (this.clearCanvasDepth = this.patch.config.clearCanvasDepth), this.gl = this.canvas.getContext("webgl2", this.patch.config.canvas), this.gl ? this.glVersion = 2 : (this.gl = this.canvas.getContext("webgl", this.patch.config.canvas) || this.canvas.getContext("experimental-webgl", this.patch.config.canvas), this.glVersion = 1, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && (this.glUseHalfFloatTex = !0), /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream && (this.patch.config.canvas.hasOwnProperty("powerPreference") || (this.patch.config.canvas.powerPreference = "high-performance"))), this.gl) {
                this.gl.getExtension("GL_OES_standard_derivatives");
                var i = this.gl.getExtension("ANGLE_instanced_arrays") || this.gl;
                i.vertexAttribDivisorANGLE && (this.gl.vertexAttribDivisor = i.vertexAttribDivisorANGLE.bind(i), this.gl.drawElementsInstanced = i.drawElementsInstancedANGLE.bind(i)), e.updateSize()
            } else this.exitError("NO_WEBGL", "sorry, could not initialize WebGL. Please check if your Browser supports WebGL.")
        }, this.updateSize = function () {
            this.canvas.width = this.canvasWidth = this.canvas.clientWidth * this.pixelDensity, this.canvas.height = this.canvasHeight = this.canvas.clientHeight * this.pixelDensity
        }, this.canvasWidth = -1, this.canvasHeight = -1, this.canvasScale = 1;
        var o = -1,
            a = -1;
        this.getViewPort = function () {
            return i
        }, this.resetViewPort = function () {
            this.gl.viewport(i[0], i[1], i[2], i[3])
        }, this.setViewPort = function (t, e, s, r) {
            i[0] = Math.round(t), i[1] = Math.round(e), i[2] = Math.round(s), i[3] = Math.round(r), this.gl.viewport(i[0], i[1], i[2], i[3])
        }, this.beginFrame = function () {
            CABLES.UI && (gui.metaTexturePreviewer.render(), CABLES.UI.patchPreviewer && CABLES.UI.patchPreviewer.render()), e.setShader(s)
        }, this.screenShot = function (t, e) {
            e && (this.gl.clearColor(1, 1, 1, 1), this.gl.colorMask(!1, !1, !1, !0), this.gl.clear(this.gl.COLOR_BUFFER_BIT), this.gl.colorMask(!0, !0, !0, !0)), this.canvas && this.canvas.toBlob && this.canvas.toBlob(e => {
                t ? t(e) : console.log("no screenshot callback...")
            })
        }, this.endFrame = function () {
            if (CABLES.UI && CABLES.GL_MARKER.drawMarkerLayer(this), e.setPreviousShader(), this._vMatrixStack.length() > 0 && console.warn("view matrix stack length !=0 at end of rendering..."), this._mMatrixStack.length() > 0 && console.warn("mvmatrix stack length !=0 at end of rendering..."), this._pMatrixStack.length() > 0 && console.warn("pmatrix stack length !=0 at end of rendering..."), this._glFrameBufferStack.length > 0 && console.warn("glFrameBuffer stack length !=0 at end of rendering..."), this._stackDepthTest.length > 0 && console.warn("depthtest stack length !=0 at end of rendering..."), this._stackDepthWrite.length > 0 && console.warn("depthwrite stack length !=0 at end of rendering..."), this._stackDepthFunc.length > 0 && console.warn("depthfunc stack length !=0 at end of rendering..."), this._stackBlend.length > 0 && console.warn("blend stack length !=0 at end of rendering..."), this._stackBlendMode.length > 0 && console.warn("blendMode stack length !=0 at end of rendering..."), this._shaderStack.length > 0 && console.warn("this._shaderStack length !=0 at end of rendering..."), o != e.canvasWidth || a != e.canvasHeight) {
                o = e.canvasWidth, a = e.canvasHeight, this.setSize(e.canvasWidth / this.pixelDensity, e.canvasHeight / this.pixelDensity), this.updateSize();
                for (var t = 0; t < n.length; t++) n[t]()
            }
        }, this.getShader = function () {
            if (r && (!this.frameStore || !0 === this.frameStore.renderOffscreen == r.offScreenPass == !0)) return r;
            for (var t = this._shaderStack.length - 1; t >= 0; t--)
                if (this._shaderStack[t] && this.frameStore.renderOffscreen == this._shaderStack[t].offScreenPass) return this._shaderStack[t]
        }, this.getDefaultShader = function () {
            return s
        }, this.setShader = function (t) {
            this._shaderStack.push(t), r = t
        }, this.setPreviousShader = function () {
            if (0 === this._shaderStack.length) throw "Invalid shader stack pop!";
            this._shaderStack.pop(), r = this._shaderStack[this._shaderStack.length - 1]
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
        var h = vec3.create();
        vec3.set(h, 0, 0, 2);
        var l = vec3.create();
        vec3.set(l, 0, 0, 0), this.renderStart = function (t, e, i) {
            e || (e = l), i || (i = h), this.pushDepthTest(!0), this.pushDepthWrite(!0), this.pushDepthFunc(t.gl.LEQUAL), this.clearCanvasTransparent && (t.gl.clearColor(0, 0, 0, 0), t.gl.clear(t.gl.COLOR_BUFFER_BIT)), this.clearCanvasDepth && t.gl.clear(t.gl.DEPTH_BUFFER_BIT), t.setViewPort(0, 0, t.canvasWidth, t.canvasHeight), mat4.perspective(t.pMatrix, 45, t.canvasWidth / t.canvasHeight, .1, 1e3), mat4.identity(t.mMatrix), mat4.identity(t.vMatrix), mat4.translate(t.mMatrix, t.mMatrix, e), mat4.translate(t.vMatrix, t.vMatrix, i), t.pushPMatrix(), t.pushModelMatrix(), t.pushViewMatrix(), t.pushBlendMode($.BLEND_MODES.BLEND_NORMAL, !1);
            for (var s = 0; s < this._textureslots.length; s++) this._textureslots[s] = null;
            t.beginFrame()
        }, this.renderEnd = function (t, e) {
            t.popViewMatrix(), t.popModelMatrix(), t.popPMatrix(), this.popDepthTest(), this.popDepthWrite(), this.popDepthFunc(), this.popBlend(), this.popBlendMode(), t.endFrame()
        }, this.getTexture = function (t) {
            return this._textureslots[t]
        }, this.setTexture = function (t, e, i) {
            this._textureslots[t] != e && (this.gl.activeTexture(this.gl.TEXTURE0 + t), this.gl.bindTexture(i || this.gl.TEXTURE_2D, e), this._textureslots[t] = e)
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
                var i = "";
                e == this.gl.OUT_OF_MEMORY && (i = "OUT_OF_MEMORY"), e == this.gl.INVALID_ENUM && (i = "INVALID_ENUM"), e == this.gl.INVALID_OPERATION && (i = "INVALID_OPERATION"), e == this.gl.INVALID_FRAMEBUFFER_OPERATION && (i = "INVALID_FRAMEBUFFER_OPERATION"), e == this.gl.INVALID_VALUE && (i = "INVALID_VALUE"), e == this.gl.CONTEXT_LOST_WEBGL && (i = "CONTEXT_LOST_WEBGL"), e == this.gl.NO_ERROR && (i = "NO_ERROR"), console.log("gl error: ", t, e, i)
            }
        }, this.saveScreenshot = function (t, e, i, s) {
            this.patch.renderOneFrame();
            var r = this.canvas.clientWidth,
                n = this.canvas.clientHeight;

            function o(t, e, i) {
                return Array(e - String(t).length + 1).join(i || "0") + t
            }
            i && (this.canvas.width = i, r = i), s && (this.canvas.height = s, n = s);
            var a = new Date,
                h = "".concat(String(a.getFullYear()) + String(a.getMonth() + 1) + String(a.getDate()), "_").concat(o(a.getHours(), 2)).concat(o(a.getMinutes(), 2)).concat(o(a.getSeconds(), 2));
            t ? t += ".png" : t = "cables_" + h + ".png", this.patch.cgl.screenShot(i => {
                if (this.canvas.width = r, this.canvas.height = n, i) {
                    var s = document.createElement("a");
                    s.download = t, s.href = URL.createObjectURL(i), document.body.appendChild(s), s.click(), e && e(i), s.remove()
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
    };
    gt.prototype._stackBlendMode = [], gt.prototype._stackBlendModePremul = [], gt.prototype.pushBlendMode = function (t, e) {
        this._stackBlendMode.push(t), this._stackBlendModePremul.push(e);
        const i = this._stackBlendMode.length - 1;
        this.pushBlend(this._stackBlendMode[i] !== $.BLEND_MODES.BLEND_NONE), this._setBlendMode(this._stackBlendMode[i], this._stackBlendModePremul[i])
    }, gt.prototype.popBlendMode = function () {
        this._stackBlendMode.pop(), this._stackBlendModePremul.pop();
        const t = this._stackBlendMode.length - 1;
        this.popBlend(this._stackBlendMode[t] !== $.BLEND_MODES.BLEND_NONE), t > 0 && this._setBlendMode(this._stackBlendMode[t], this._stackBlendModePremul[t])
    }, gt.prototype.glGetAttribLocation = function (t, e) {
        const i = this.gl.getAttribLocation(t, e);
        return i
    }, gt.prototype._setBlendMode = function (t, e) {
        const i = this.gl;
        t == $.BLEND_MODES.BLEND_NONE || (t == $.BLEND_MODES.BLEND_ADD ? e ? (i.blendEquationSeparate(i.FUNC_ADD, i.FUNC_ADD), i.blendFuncSeparate(i.ONE, i.ONE, i.ONE, i.ONE)) : (i.blendEquation(i.FUNC_ADD), i.blendFunc(i.SRC_ALPHA, i.ONE)) : t == $.BLEND_MODES.BLEND_SUB ? e ? (i.blendEquationSeparate(i.FUNC_ADD, i.FUNC_ADD), i.blendFuncSeparate(i.ZERO, i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ONE_MINUS_SRC_ALPHA)) : (i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ZERO, i.ONE_MINUS_SRC_COLOR)) : t == $.BLEND_MODES.BLEND_MUL ? e ? (i.blendEquationSeparate(i.FUNC_ADD, i.FUNC_ADD), i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA)) : (i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ZERO, i.SRC_COLOR)) : t == $.BLEND_MODES.BLEND_NORMAL ? e ? (i.blendEquationSeparate(i.FUNC_ADD, i.FUNC_ADD), i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA)) : (i.blendEquationSeparate(i.FUNC_ADD, i.FUNC_ADD), i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA)) : console.log("setblendmode: unknown blendmode"))
    };
    const ft = Object.assign({
        Framebuffer: function (t, e, i, s) {
            var r = t,
                n = r.gl.getExtension("WEBGL_depth_texture") || r.gl.getExtension("WEBKIT_WEBGL_depth_texture") || r.gl.getExtension("MOZ_WEBGL_depth_texture") || r.gl.DEPTH_TEXTURE;
            if (n) {
                var o = e || 512,
                    a = i || 512;
                (s = s || {
                    isFloatingPointTexture: !1
                }).hasOwnProperty("filter") || (s.filter = Q.FILTER_LINEAR);
                var h = new Q(r, {
                        isFloatingPointTexture: s.isFloatingPointTexture,
                        filter: s.filter,
                        wrap: Q.CLAMP_TO_EDGE
                    }),
                    l = null;
                n && (l = new Q(r, {
                    isDepthTexture: !0
                }));
                var u = r.gl.createFramebuffer(),
                    c = r.gl.createRenderbuffer();
                this.getWidth = function () {
                    return o
                }, this.getHeight = function () {
                    return a
                }, this.getGlFrameBuffer = function () {
                    return u
                }, this.getDepthRenderBuffer = function () {
                    return c
                }, this.getTextureColor = function () {
                    return h
                }, this.getTextureDepth = function () {
                    return l
                }, this.setFilter = function (t) {
                    h.filter = t, h.setSize(o, a)
                }, this.setSize = function (t, e) {
                    if (t < 2 && (t = 2), e < 2 && (e = 2), o = Math.ceil(t), a = Math.ceil(e), z.profileFrameBuffercreate++, r.gl.bindFramebuffer(r.gl.FRAMEBUFFER, u), r.gl.bindRenderbuffer(r.gl.RENDERBUFFER, c), h.setSize(o, a), l && l.setSize(o, a), n && r.gl.renderbufferStorage(r.gl.RENDERBUFFER, r.gl.DEPTH_COMPONENT16, o, a), r.gl.framebufferTexture2D(r.gl.FRAMEBUFFER, r.gl.COLOR_ATTACHMENT0, r.gl.TEXTURE_2D, h.tex, 0), n && (r.gl.framebufferRenderbuffer(r.gl.FRAMEBUFFER, r.gl.DEPTH_ATTACHMENT, r.gl.RENDERBUFFER, c), r.gl.framebufferTexture2D(r.gl.FRAMEBUFFER, r.gl.DEPTH_ATTACHMENT, r.gl.TEXTURE_2D, l.tex, 0)), !r.gl.isFramebuffer(u)) throw "Invalid framebuffer";
                    var i = r.gl.checkFramebufferStatus(r.gl.FRAMEBUFFER);
                    switch (i) {
                        case r.gl.FRAMEBUFFER_COMPLETE:
                            break;
                        case r.gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:
                            throw console.log("FRAMEBUFFER_INCOMPLETE_ATTACHMENT...", o, a, h.tex, c), new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT");
                        case r.gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:
                            throw console.log("FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT"), new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT");
                        case r.gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:
                            throw console.log("FRAMEBUFFER_INCOMPLETE_DIMENSIONS"), new Error("Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS");
                        case r.gl.FRAMEBUFFER_UNSUPPORTED:
                            throw console.log("FRAMEBUFFER_UNSUPPORTED"), new Error("Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED");
                        default:
                            throw console.log("incomplete framebuffer", i), new Error("Incomplete framebuffer: " + i)
                    }
                    r.gl.bindTexture(r.gl.TEXTURE_2D, null), r.gl.bindRenderbuffer(r.gl.RENDERBUFFER, null), r.gl.bindFramebuffer(r.gl.FRAMEBUFFER, null)
                }, this.renderStart = function () {
                    r.pushModelMatrix(), r.gl.bindFramebuffer(r.gl.FRAMEBUFFER, u), r.pushGlFrameBuffer(u), r.pushFrameBuffer(this), r.pushPMatrix(), r.gl.viewport(0, 0, o, a), r.gl.clearColor(0, 0, 0, 0), r.gl.clear(r.gl.COLOR_BUFFER_BIT | r.gl.DEPTH_BUFFER_BIT)
                }, this.renderEnd = function () {
                    r.popPMatrix(), r.gl.bindFramebuffer(r.gl.FRAMEBUFFER, r.popGlFrameBuffer()), r.popFrameBuffer(), r.popModelMatrix(), r.resetViewPort()
                }, this.delete = function () {
                    h.delete(), l && l.delete(), r.gl.deleteRenderbuffer(c), r.gl.deleteFramebuffer(u)
                }, this.setSize(o, a)
            } else r.exitError("NO_DEPTH_TEXTURE", "no depth texture support")
        },
        Framebuffer2: q,
        Geometry: Z,
        Marker: function (t) {
            var e = new Z("marker");
            e.setPointVertices([1e-5, 0, 0, 1, 0, 0, 0, 1e-5, 0, 0, 1, 0, 0, 0, 1e-5, 0, 0, 1]);
            var i = new et(t, e, t.gl.LINES);
            i.setGeom(e);
            var s = new ht(t, "markermaterial"),
                r = "".endl() + "precision highp float;".endl() + "IN vec3 axisColor;".endl() + "void main()".endl() + "{".endl() + "    vec4 col=vec4(axisColor,1.0);".endl() + "    outColor = col;".endl() + "}",
                n = "".endl() + "IN vec3 vPosition;".endl() + "UNI mat4 projMatrix;".endl() + "UNI mat4 mvMatrix;".endl() + "OUT vec3 axisColor;".endl() + "void main()".endl() + "{".endl() + "   vec4 pos=vec4(vPosition, 1.0);".endl() + "   if(pos.x!=0.0)axisColor=vec3(1.0,0.3,0.0);".endl() + "   if(pos.y!=0.0)axisColor=vec3(0.0,1.0,0.2);".endl() + "   if(pos.z!=0.0)axisColor=vec3(0.0,0.5,1.0);".endl() + "   gl_Position = projMatrix * mvMatrix * pos;".endl() + "}";
            s.setSource(n, r), this._vScale = vec3.create(), this.draw = function (t) {
                t.pushModelMatrix(), t.setShader(s), vec3.set(this._vScale, 2, 2, 2), mat4.scale(t.mvMatrix, t.mvMatrix, this._vScale), t.pushDepthTest(!1), i.render(t.getShader()), t.popDepthTest(), t.setPreviousShader(), t.popModelMatrix()
            }
        },
        WirePoint: function (t, e) {
            var i = t.gl.createBuffer(),
                s = vec3.create();
            this.render = function (t, e) {
                    t.pushModelMatrix(), vec3.set(s, e, e, e), mat4.scale(t.mvMatrix, t.mvMatrix, s);
                    var r = t.getShader();
                    r.bind(), t.gl.bindBuffer(t.gl.ARRAY_BUFFER, i), t.gl.vertexAttribPointer(r.getAttrVertexPos(), i.itemSize, t.gl.FLOAT, !1, 0, 0), t.gl.enableVertexAttribArray(r.getAttrVertexPos()), t.gl.bindBuffer(t.gl.ARRAY_BUFFER, i), t.gl.drawArrays(t.gl.LINE_STRIP, 0, i.numItems), t.popModelMatrix()
                },
                function () {
                    var e = [],
                        s = 0,
                        r = 0;
                    for (s = 0; s <= Math.round(24); s++) r = 360 / Math.round(24) * s * lt, e.push(.5 * Math.cos(r)), e.push(0), e.push(.5 * Math.sin(r));
                    for (s = 0; s <= Math.round(24); s++) r = 360 / Math.round(24) * s * lt, e.push(.5 * Math.cos(r)), e.push(.5 * Math.sin(r)), e.push(0);
                    for (s = 0; s <= Math.round(24); s++) r = 360 / Math.round(24) * s * lt, e.push(0), e.push(.5 * Math.cos(r)), e.push(.5 * Math.sin(r));
                    t.gl.bindBuffer(t.gl.ARRAY_BUFFER, i), t.gl.bufferData(t.gl.ARRAY_BUFFER, new Float32Array(e), t.gl.STATIC_DRAW), i.itemSize = 3, i.numItems = e.length / i.itemSize
                }()
        },
        WireCube: function (t) {
            var e, i = t.gl.createBuffer(),
                s = vec3.create();
            this.render = function (t, e, r, n) {
                t.pushModelMatrix(), vec3.set(s, e || 1, r || 1, n || 1), mat4.scale(t.mvMatrix, t.mvMatrix, s);
                var o = t.getShader();
                o.bind(), t.gl.bindBuffer(t.gl.ARRAY_BUFFER, i), t.gl.vertexAttribPointer(o.getAttrVertexPos(), i.itemSize, t.gl.FLOAT, !1, 0, 0), t.gl.enableVertexAttribArray(o.getAttrVertexPos()), t.gl.bindBuffer(t.gl.ARRAY_BUFFER, i), t.gl.drawArrays(t.gl.LINE_STRIP, 0, i.numItems), t.popModelMatrix()
            }, (e = []).push(-1, -1, 1), e.push(1, -1, 1), e.push(1, 1, 1), e.push(-1, 1, 1), e.push(-1, -1, 1), e.push(-1, -1, -1), e.push(1, -1, -1), e.push(1, 1, -1), e.push(-1, 1, -1), e.push(-1, -1, -1), e.push(-1, -1, -1), e.push(-1, 1, -1), e.push(-1, 1, 1), e.push(-1, -1, 1), e.push(-1, -1, -1), e.push(1, -1, -1), e.push(1, 1, -1), e.push(1, 1, 1), e.push(1, -1, 1), e.push(1, -1, -1), t.gl.bindBuffer(t.gl.ARRAY_BUFFER, i), t.gl.bufferData(t.gl.ARRAY_BUFFER, new Float32Array(e), t.gl.STATIC_DRAW), i.itemSize = 3, i.numItems = e.length / i.itemSize
        },
        MatrixStack: _t,
        Mesh: et,
        MESH: tt,
        ShaderLibMods: rt,
        Shader: ht,
        Uniform: J,
        MESHES: it,
        Context: gt,
        Texture: Q,
        TextureEffect: st,
        isWindows: ut,
        getWheelSpeed: pt,
        getWheelDelta: dt,
        onLoadingAssetsFinished: null,
        profileData: z
    }, $.BLEND_MODES, $.SHADER, $.MATH, $.BLEND_MODES);
    window.CGL = ft;
    const mt = function (t) {
        this._loadingAssets = {}, this._cbFinished = [], this._percent = 0, this._count = 0, this._countFinished = 0, this._order = 0, this._startTime = 0, this._patch = t
    };
    mt.prototype.setOnFinishedLoading = function (t) {
        this._cbFinished.push(t)
    }, mt.prototype.getNumAssets = function () {
        return this._countFinished
    }, mt.prototype.getProgress = function () {
        return this._percent
    }, mt.prototype.checkStatus = function () {
        for (var t in this._countFinished = 0, this._count = 0, this._loadingAssets) this._count++, this._loadingAssets[t].finished || this._countFinished++;
        if (this._percent = (this._count - this._countFinished) / this._count, 0 === this._countFinished) {
            for (var e = 0; e < this._cbFinished.length; e++) setTimeout(this._cbFinished[e], 200);
            this.print()
        }
    }, mt.prototype.print = function () {
        if (!this._patch.silent) {
            var t = [];
            for (var e in this._loadingAssets) t.push([this._loadingAssets[e].order, this._loadingAssets[e].type, this._loadingAssets[e].name, (this._loadingAssets[e].timeEnd - this._loadingAssets[e].timeStart) / 1e3 + "s"]);
            console.groupCollapsed("finished loading " + this._order + " assets in " + (Date.now() - this._startTime) / 1e3 + "s"), console.table(t), console.groupEnd()
        }
    }, mt.prototype.finished = function (t) {
        this._loadingAssets[t] && (this._loadingAssets[t].finished = !0, this._loadingAssets[t].timeEnd = Date.now()), this.checkStatus()
    }, mt.prototype.start = function (t, e) {
        0 == this._startTime && (this._startTime = Date.now());
        var i = v();
        return this._loadingAssets[i] = {
            id: i,
            type: t,
            name: e,
            finished: !1,
            timeStart: Date.now(),
            order: this._order
        }, this._order++, i
    };
    const Et = function () {
        this._loops = [], this._indizes = [], this._index = 0
    };
    Et.prototype.pushLoop = function (t) {
        this._loops.push(Math.abs(Math.floor(t))), this._indizes.push(this._index)
    }, Et.prototype.popLoop = function () {
        this._loops.pop(), this._index = this._indizes.pop(), 0 === this._loops.length && (this._index = 0)
    }, Et.prototype.numLoops = function () {
        return this._loops.length
    }, Et.prototype.numCycles = function () {
        if (0 === this._loops.length) return 0;
        for (var t = this._loops[0], e = 1; e < this._loops.length; e++) t *= this._loops[e];
        return t
    }, Et.prototype.inLoop = function () {
        return this._loops.length > 0
    }, Et.prototype.increment = function () {
        this._index++
    }, Et.prototype.index = function () {
        return this._index
    };
    const vt = function () {
            var t = {},
                e = null,
                i = 0;
            this.getItems = function () {
                return t
            }, this.clear = function () {
                t = {}
            }, this.add = function (s, r) {
                null !== e && (r && r.id == e || t[e] && (t[e].timeUsed += performance.now() - i, (!t[e].peakTime || ot() - t[e].peakTime > 5e3) && (t[e].peak > 1 && r && console.log("PEAK ", r.parent.objName), t[e].peak = 0, t[e].peakTime = ot()), t[e].peak = Math.max(t[e].peak, performance.now() - i))), null !== r ? (t[r.id] || (t[r.id] = {
                    numTriggers: 0,
                    timeUsed: 0
                }), t[r.id].numTriggers++, t[r.id].title = r.parent.name + r.name, e = r.id, i = performance.now()) : e = null
            }, this.print = function () {
                for (var e in console.log("--------"), t) console.log(t[e].title + ": " + t[e].numTriggers + " / " + t[e].timeUsed)
            }
        },
        Tt = function (t) {
            this._patch = t, this.result = []
        };
    Tt.MIDI = 0, Tt.POINTERLOCK = 1, Tt.WEBAUDIO = 2, Tt.WEBGL2 = 3, (Tt.infos = [])[Tt.POINTERLOCK] = {
        title: "pointerLock",
        caniuse: "https://caniuse.com/#search=pointerlock"
    }, Tt.infos[Tt.MIDI] = {
        title: "midi API",
        caniuse: "https://caniuse.com/#search=midi"
    }, Tt.infos[Tt.WEBAUDIO] = {
        title: "web audio",
        caniuse: "https://caniuse.com/#search=webaudio"
    }, Tt.infos[Tt.WEBGL2] = {
        title: "WebGL 2"
    }, Tt.prototype.checkRequirement = function (t, e) {
        switch (this.result = [], t) {
            case Tt.WEBGL2:
                return e.patch.cgl.glVersion >= 2;
            case Tt.POINTERLOCK:
                return "exitPointerLock" in document;
            case Tt.MIDI:
                return "MIDIAccess" in window;
            case Tt.WEBAUDIO:
                var i = !1;
                return window.audioContext && (i = !0), !i && ("webkitAudioContext" in window || "AudioContext" in window) && (i = !0), i
        }
    }, Tt.prototype.checkOp = function (t) {
        if (t && t.requirements)
            for (var e = 0; e < t.requirements.length; e++) {
                var i = t.requirements[e];
                if (!this.result[i]) {
                    var s = this.checkRequirement(i, t);
                    if (!s) {
                        t.patch.cgl && t.patch.cgl.canvas && t.patch.cgl.canvas.remove();
                        Tt.infos[i].title;
                        throw Tt.infos[i].caniuse && '<a href="' + Tt.infos[i].caniuse + '" target="_blank">' + Tt.infos[i].title + " (" + t.objName + ")</a>", "this browser does not meet requirement: " + Tt.infos[i].title + " (" + t.objName + ")"
                    }
                    this.result[i] = {
                        success: s,
                        info: Tt.infos[i]
                    }
                }
            }
    };
    const At = function (t) {
        _.apply(this), this.ops = [], this.settings = {}, this.timer = new at, this.freeTimer = new at, this.animFrameOps = [], this.animFrameCallbacks = [], this.gui = !1, this.silent = !1, this.profiler = null, this.onLoadStart = null, this.onLoadEnd = null, this.aborted = !1, this.loading = new mt(this), this._crashedOps = [], this._perf = {
            fps: 0,
            ms: 0,
            _fpsFrameCount: 0,
            _fpsMsCount: 0,
            _fpsStart: 0
        }, this._volumeListeners = [], this._paused = !1, this._frameNum = 0, this.instancing = new Et, this.onOneFrameRendered = null, this.namedTriggers = {}, this._origData = null, this._frameNext = 0, this._frameInterval = 0, this._lastFrameTime = 0, this._frameWasdelayed = !0, this.config = t || {
            glCanvasResizeToWindow: !1,
            prefixAssetPath: "",
            silent: !1,
            onError: null,
            onFinishedLoading: null,
            onFirstFrameRendered: null,
            onPatchLoaded: null,
            fpsLimit: 0
        }, this.config.hasOwnProperty("doRequestAnimation") || (this.config.doRequestAnimation = !0), this.config.prefixAssetPath || (this.config.prefixAssetPath = ""), this.config.masterVolume || (this.config.masterVolume = 1), this._variables = {}, t && t.variables && (this._variables = t.variables || {}), this._variableListeners = [], this.vars = {}, t && t.vars && (this.vars = t.vars), this.cgl = new gt(this), this.cgl.setCanvas(this.config.glCanvasId || this.config.glCanvas || "glcanvas"), !0 === this.config.glCanvasResizeToWindow && this.cgl.setAutoResize("window"), !0 === this.config.glCanvasResizeToParent && this.cgl.setAutoResize("parent"), this.loading.setOnFinishedLoading(this.config.onFinishedLoading), this.cgl.aborted && (this.aborted = !0), this.cgl.silent && (this.silent = !0), this.freeTimer.play(), this.exec(), this.aborted || (this.config.patch ? (this.deSerialize(this.config.patch), this.timer.play()) : this.config.patchFile && (N(this.config.patchFile, (t, e) => {
            var i = JSON.parse(e);
            if (t) {
                return console.error("err", t), console.error("data", i), void console.error("data", i.msg)
            }
            this.deSerialize(i)
        }), this.timer.play())), console.log("made with https://cables.gl")
    };
    At.prototype.isPlaying = function () {
        return !this._paused
    }, At.prototype.renderOneFrame = function () {
        this._paused = !0, this._renderOneFrame = !0, this.exec(), this._renderOneFrame = !1
    }, At.prototype.getFPS = function () {
        return this._fps
    }, At.prototype.isEditorMode = function () {
        return !0 === this.config.editorMode
    }, At.prototype.pause = function () {
        this._paused = !0, this.freeTimer.pause()
    }, At.prototype.resume = function () {
        this._paused && (this._paused = !1, this.freeTimer.play(), this.exec())
    }, At.prototype.setVolume = function (t) {
        this.config.masterVolume = t;
        for (var e = 0; e < this._volumeListeners.length; e++) this._volumeListeners[e].onMasterVolumeChanged(t)
    }, At.prototype.getFilePath = function (t) {
        return t ? 0 === t.indexOf("https:") || 0 === t.indexOf("http:") ? t : (t = t.replace("//", "/"), this.config.prefixAssetPath + t + (this.config.suffixAssetPath || "")) : t
    }, At.prototype.clear = function () {
        for (this.cgl.TextureEffectMesh = null, this.animFrameOps.length = 0, this.timer = new at; this.ops.length > 0;) this.deleteOp(this.ops[0].id)
    }, At.getOpClass = function (t) {
        var e = t.split("."),
            i = null;
        try {
            return 2 == e.length ? i = window[e[0]][e[1]] : 3 == e.length ? i = window[e[0]][e[1]][e[2]] : 4 == e.length ? i = window[e[0]][e[1]][e[2]][e[3]] : 5 == e.length ? i = window[e[0]][e[1]][e[2]][e[3]][e[4]] : 6 == e.length ? i = window[e[0]][e[1]][e[2]][e[3]][e[4]][e[5]] : 7 == e.length ? i = window[e[0]][e[1]][e[2]][e[3]][e[4]][e[5]][e[6]] : 8 == e.length ? i = window[e[0]][e[1]][e[2]][e[3]][e[4]][e[5]][e[6]][e[7]] : 9 == e.length ? i = window[e[0]][e[1]][e[2]][e[3]][e[4]][e[5]][e[6]][e[7]][e[8]] : 10 == e.length && (i = window[e[0]][e[1]][e[2]][e[3]][e[4]][e[5]][e[6]][e[7]][e[8]][e[9]]), i
        } catch (t) {
            return null
        }
    }, At.prototype.createOp = function (t, e) {
        var i = t.split("."),
            s = null,
            r = "";
        try {
            if (-1 == t.indexOf("Ops.")) {
                var n = t;
                if (!CABLES.OPS[n]) throw "could not find op by id: " + n;
                r = CABLES.OPS[n].objName, (s = new CABLES.OPS[n].f(this, r, e, n)).opId = n
            }
            if (!s) {
                if (!At.getOpClass(r = t)) throw this.emitEvent("criticalError", "unknown op", "unknown op: " + r), console.error("unknown op: " + r), new Error("unknown op: " + r);
                if (2 == i.length ? s = new window[i[0]][i[1]](this, r, e) : 3 == i.length ? s = new window[i[0]][i[1]][i[2]](this, r, e) : 4 == i.length ? s = new window[i[0]][i[1]][i[2]][i[3]](this, r, e) : 5 == i.length ? s = new window[i[0]][i[1]][i[2]][i[3]][i[4]](this, r, e) : 6 == i.length ? s = new window[i[0]][i[1]][i[2]][i[3]][i[4]][i[5]](this, r, e) : 7 == i.length ? s = new window[i[0]][i[1]][i[2]][i[3]][i[4]][i[5]][i[6]](this, r, e) : 8 == i.length ? s = new window[i[0]][i[1]][i[2]][i[3]][i[4]][i[5]][i[6]][i[7]](this, r, e) : 9 == i.length ? s = new window[i[0]][i[1]][i[2]][i[3]][i[4]][i[5]][i[6]][i[7]][i[8]](this, r, e) : 10 == i.length ? s = new window[i[0]][i[1]][i[2]][i[3]][i[4]][i[5]][i[6]][i[7]][i[8]][i[9]](this, r, e) : console.log("parts.length", i.length), s)
                    for (var o in s.opId = null, CABLES.OPS) CABLES.OPS[o].objName == r && (s.opId = o)
            }
        } catch (t) {
            if (this._crashedOps.push(r), this.emitEvent("exceptionOp", t, r), !this.isEditorMode) throw console.log(t), console.error("[instancing error] " + r, t), CABLES.api && CABLES.api.sendErrorReport(t), this.exitError("INSTANCE_ERR", "Instancing Error " + r), "instancing error " + r
        }
        return s && (s.objName = r, s.patch = this), s
    }, At.prototype.addOp = function (t, e, i) {
        var s = this.createOp(t, i);
        return s && (s.uiAttr(e), s.onCreate && s.onCreate(), s.hasOwnProperty("onAnimFrame") && this.animFrameOps.push(s), s.hasOwnProperty("onMasterVolumeChanged") && this._volumeListeners.push(s), this.ops.push(s), this.emitEvent("onOpAdd", s), s.init && s.init()), s
    }, At.prototype.addOnAnimFrame = function (t) {
        this.animFrameOps.push(t)
    }, At.prototype.removeOnAnimFrame = function (t) {
        for (var e = 0; e < this.animFrameOps.length; e++)
            if (this.animFrameOps[e] == t) return void this.animFrameOps.splice(e, 1)
    }, At.prototype.addOnAnimFrameCallback = function (t) {
        this.animFrameCallbacks.push(t)
    }, At.prototype.removeOnAnimCallback = function (t) {
        for (var e = 0; e < this.animFrameCallbacks.length; e++)
            if (this.animFrameCallbacks[e] == t) return void this.animFrameCallbacks.splice(e, 1)
    }, At.prototype.deleteOp = function (t, e) {
        for (var i in this.ops)
            if (this.ops[i].id == t) {
                var s = null,
                    r = null;
                if (this.ops[i]) {
                    e && this.ops[i].portsIn.length > 0 && this.ops[i].portsIn[0].isLinked() && this.ops[i].portsOut.length > 0 && this.ops[i].portsOut[0].isLinked() && this.ops[i].portsIn[0].getType() == this.ops[i].portsOut[0].getType() && (s = this.ops[i].portsIn[0].links[0].getOtherPort(this.ops[i].portsIn[0]), r = this.ops[i].portsOut[0].links[0].getOtherPort(this.ops[i].portsOut[0]));
                    var n = this.ops[i];
                    n.removeLinks(), this.onDelete && (console.log("deprecated this.onDelete", this.onDelete), this.onDelete(n)), this.emitEvent("onOpDelete", n), this.ops.splice(i, 1), n.onDelete && n.onDelete(), n.cleanUp(), null !== s && null !== r && this.link(s.parent, s.getName(), r.parent, r.getName())
                }
            }
    }, At.prototype.getFrameNum = function () {
        return this._frameNum
    }, At.prototype.renderFrame = function (t) {
        this.timer.update(), this.freeTimer.update();
        for (var e = this.timer.getTime(), i = 0; i < this.animFrameCallbacks.length; ++i) this.animFrameCallbacks[i] && this.animFrameCallbacks[i](e, this._frameNum);
        for (i = 0; i < this.animFrameOps.length; ++i) this.animFrameOps[i].onAnimFrame && this.animFrameOps[i].onAnimFrame(e);
        this._frameNum++, 1 == this._frameNum && this.config.onFirstFrameRendered && this.config.onFirstFrameRendered()
    }, At.prototype.exec = function (t) {
        if (this._renderOneFrame || !this._paused && !this.aborted) {
            this.config.fpsLimit = this.config.fpsLimit || 0, this.config.fpsLimit && (this._frameInterval = 1e3 / this.config.fpsLimit);
            var e = CABLES.now(),
                i = e - this._frameNext;
            if (this.isEditorMode() && !this._renderOneFrame && e - this._lastFrameTime >= 500 && 0 !== this._lastFrameTime && !this._frameWasdelayed) return this._lastFrameTime = 0, setTimeout(this.exec.bind(this), 500), this.emitEvent("renderDelayStart"), void(this._frameWasdelayed = !0);
            if (this._renderOneFrame || 0 === this.config.fpsLimit || i > this._frameInterval || this._frameWasdelayed) {
                var s = CABLES.now();
                this.renderFrame(), this._perf._fpsMsCount += CABLES.now() - s, this._frameInterval && (this._frameNext = e - i % this._frameInterval)
            }
            this._frameWasdelayed && (this.emitEvent("renderDelayEnd"), this._frameWasdelayed = !1), this._renderOneFrame && this.onOneFrameRendered && (this.onOneFrameRendered(), this._renderOneFrame = !1), CABLES.now() - this._perf._fpsStart >= 1e3 && this._perf.fps != this._perf._fpsFrameCount && (this._perf.fps = this._perf._fpsFrameCount, this._perf.ms = Math.round(this._perf._fpsMsCount / this._perf._fpsFrameCount), this.emitEvent("performance", this._perf), this._perf._fpsFrameCount = 0, this._perf._fpsMsCount = 0, this._perf._fpsStart = CABLES.now()), this._perf._lastFrameTime = CABLES.now(), this._perf._fpsFrameCount++, this.config.doRequestAnimation && requestAnimationFrame(this.exec.bind(this))
        }
    }, At.prototype.link = function (t, e, i, s) {
        if (t)
            if (i) {
                var r = t.getPort(e),
                    n = i.getPort(s);
                if (r)
                    if (n) {
                        if (!r.shouldLink(r, n) || !n.shouldLink(r, n)) return !1;
                        if (H.canLink(r, n)) {
                            var o = new H(this);
                            return o.link(r, n), this.emitEvent("onLink", r, n, o), o
                        }
                    } else console.warn("port not found! " + s + " of " + i.name + "(" + i.objName + ")");
                else console.warn("port not found! " + e + "(" + t.objName + ")")
            } else console.log("link: op2 is null");
        else console.log("link: op1 is null ")
    }, At.prototype.serialize = function (t) {
        var e = {
            ops: []
        };
        for (var i in e.settings = this.settings, this.ops) e.ops.push(this.ops[i].getSerialized());
        return t ? e : JSON.stringify(e)
    }, At.prototype.getOpById = function (t) {
        for (var e in this.ops)
            if (this.ops[e].id == t) return this.ops[e]
    }, At.prototype.getOpsByName = function (t) {
        var e = [];
        for (var i in this.ops) this.ops[i].name == t && e.push(this.ops[i]);
        return e
    }, At.prototype.getOpsByObjName = function (t) {
        var e = [];
        for (var i in this.ops) this.ops[i].objName == t && e.push(this.ops[i]);
        return e
    }, At.prototype.loadLib = function (t) {
        x("/ui/libs/" + t + ".js", (t, e) => {
            var i = document.createElement("script");
            i.type = "text/javascript", i.text = e, document.getElementsByTagName("head")[0].appendChild(i)
        }, "GET")
    }, At.prototype.reloadOp = function (t, e) {
        var i = 0,
            s = [],
            r = [];
        for (var n in this.ops) this.ops[n].objName == t && r.push(this.ops[n]);
        for (n = 0; n < r.length; n++) {
            i++;
            var o = r[n];
            o.deleted = !0;
            var a, h, l = this.addOp(t, o.uiAttribs);
            for (a in s.push(l), o.portsIn)
                if (0 === o.portsIn[a].links.length) {
                    var u = l.getPort(o.portsIn[a].name);
                    u ? u.set(o.portsIn[a].get()) : console.error("[reloadOp] could not set port " + o.portsIn[a].name + ", propably renamed port ?")
                } else
                    for (; o.portsIn[a].links.length;) {
                        var c = o.portsIn[a].links[0].portIn.name,
                            p = o.portsIn[a].links[0].portOut.name,
                            d = o.portsIn[a].links[0].portOut.parent;
                        o.portsIn[a].links[0].remove(), (h = this.link(l, c, d, p)) ? h.setValue() : console.log("[reloadOp] relink after op reload not successfull for port " + p)
                    }
            for (a in o.portsOut)
                for (; o.portsOut[a].links.length;) {
                    var _ = o.portsOut[a].links[0].portOut.name,
                        g = o.portsOut[a].links[0].portIn.name,
                        f = o.portsOut[a].links[0].portIn.parent;
                    o.portsOut[a].links[0].remove(), (h = this.link(l, _, f, g)) ? h.setValue() : console.log("relink after op reload not successfull for port " + g)
                }
            this.deleteOp(o.id)
        }
        e(i, s)
    }, At.prototype.getSubPatchOps = function (t) {
        var e = [];
        for (var i in this.ops) this.ops[i].uiAttribs && this.ops[i].uiAttribs.subPatch == t && e.push(this.ops[i]);
        return e
    }, At.prototype.getSubPatchOp = function (t, e) {
        for (var i in this.ops)
            if (this.ops[i].uiAttribs && this.ops[i].uiAttribs.subPatch == t && this.ops[i].objName == e) return this.ops[i];
        return !1
    }, At.prototype.deSerialize = function (t, e) {
        if (!this.aborted) {
            var i = this.loading.start("core", "deserialize");
            this.onLoadStart && this.onLoadStart(), this.namespace = t.namespace || "", this.name = t.name || "", "string" == typeof t && (t = JSON.parse(t));
            var s = this;
            this.settings = t.settings;
            var r, n, o, a, h = new Tt(this);
            for (var l in t.ops) {
                var u = CABLES.now(),
                    c = t.ops[l],
                    p = null;
                try {
                    p = c.opId ? this.addOp(c.opId, c.uiAttribs, c.id) : this.addOp(c.objName, c.uiAttribs, c.id)
                } catch (t) {
                    throw console.warn("[instancing error] op data:", c), "instancing error: " + c.objName
                }
                if (h.checkOp(p), p) {
                    for (var d in e && (p.id = E()), p.portsInData = c.portsIn, p._origData = c, c.portsIn) {
                        var _ = c.portsIn[d],
                            g = p.getPort(_.name);
                        if (!g || "bool" != g.uiAttribs.display && "bool" != g.uiAttribs.type || isNaN(_.value) || (_.value = !0 === _.value), g && void 0 !== _.value && g.type != M.OP.OP_PORT_TYPE_TEXTURE && g.set(_.value), g && _ && _.animated && g.setAnimated(_.animated), g && _ && _.anim)
                            for (var f in g.anim || (g.anim = new V), _.anim.loop && (g.anim.loop = _.anim.loop), _.anim.keys) g.anim.keys.push(new C.Key(_.anim.keys[f]))
                    }
                    for (var m in c.portsOut) {
                        var v = p.getPort(c.portsOut[m].name);
                        v && v.type != M.OP.OP_PORT_TYPE_TEXTURE && c.portsOut[m].hasOwnProperty("value") && v.set(t.ops[l].portsOut[m].value)
                    }
                }
                Math.round(100 * (CABLES.now() - u))
            }
            for (var T in this.ops) this.ops[T].onLoadedValueSet && (this.ops[T].onLoadedValueSet(this.ops[T]._origData), this.ops[T].onLoadedValueSet = null, this.ops[T]._origData = null);
            if (t.ops)
                for (l = 0; l < t.ops.length; l++)
                    if (t.ops[l].portsIn)
                        for (var A = 0; A < t.ops[l].portsIn.length; A++)
                            if (t.ops[l].portsIn[A].links)
                                for (var b = 0; b < t.ops[l].portsIn[A].links.length; b++) t.ops[l].portsIn[A].links[b] && (r = t.ops[l].portsIn[A].links[b].objIn, n = t.ops[l].portsIn[A].links[b].objOut, o = t.ops[l].portsIn[A].links[b].portIn, a = t.ops[l].portsIn[A].links[b].portOut, s.link(s.getOpById(r), o, s.getOpById(n), a));
            for (var T in this.ops) this.ops[T].onLoaded && (this.ops[T].onLoaded(), this.ops[T].onLoaded = null);
            for (var T in this.ops) this.ops[T].init && (this.ops[T].init(), this.ops[T].init = null);
            if (this.config.variables)
                for (var O in this.config.variables) this.setVarValue(O, this.config.variables[O]);
            setTimeout(() => {
                this.loading.finished(i)
            }, 100), this.config.onPatchLoaded && this.config.onPatchLoaded(), this.onLoadEnd && this.onLoadEnd()
        }
    }, At.prototype.profile = function (t) {
        for (var e in this.profiler = new vt, this.ops) this.ops[e].profile(t)
    }, (At.Variable = function (t, e) {
        this._name = t, this._changeListeners = [], this.setValue(e)
    }).prototype.getValue = function () {
        return this._v
    }, At.Variable.prototype.getName = function () {
        return this._name
    }, At.Variable.prototype.setValue = function (t) {
        this._v = t;
        for (var e = 0; e < this._changeListeners.length; e++) this._changeListeners[e](t)
    }, At.Variable.prototype.addListener = function (t) {
        this._changeListeners.push(t)
    }, At.Variable.prototype.removeListener = function (t) {
        var e = this._changeListeners.indexOf(t);
        this._changeListeners.splice(e, 1)
    }, At.prototype.setVariable = function (t, e) {
        this._variables.hasOwnProperty(t) ? this._variables[t].setValue(e) : console.warn("variable " + t + " not found!")
    }, At.prototype.setVarValue = function (t, e) {
        return this._variables.hasOwnProperty(t) ? this._variables[t].setValue(e) : (this._variables[t] = new At.Variable(t, e), this.emitEvent("variablesChanged")), this._variables[t]
    }, At.prototype.getVarValue = function (t, e) {
        if (this._variables.hasOwnProperty(t)) return this._variables[t].getValue()
    }, At.prototype.getVar = function (t) {
        if (this._variables.hasOwnProperty(t)) return this._variables[t]
    }, At.prototype.getVars = function () {
        return this._variables
    }, At.prototype.getVars = function () {
        return this._variables
    }, At.prototype.exitError = function (t, e) {
        this && this.config && this.config.onError && (this.config.onError(t, e), this.aborted = !0)
    }, At.prototype.preRenderOps = function () {
        console.log("prerendering...");
        var t = null;
        CABLES.StopWatch && (t = new CABLES.StopWatch("prerendering"));
        for (var e = 0; e < this.ops.length; e++) this.ops[e].preRender && (this.ops[e].preRender(), console.log("prerender " + this.ops[e].objName));
        t && t.stop("prerendering")
    }, At.prototype.dispose = function () {
        this.pause(), this.clear()
    };
    var bt = At;
    const Ot = {
            addPatch: function (t, e) {
                var i = t,
                    s = v();
                if ("string" != typeof t || (s = t, i = document.getElementById(s))) {
                    var r = document.createElement("canvas");
                    return r.id = "glcanvas_" + s, r.width = i.clientWidth, r.height = i.clientHeight, window.addEventListener("resize", function () {
                        this.setAttribute("width", i.clientWidth), this.height = i.clientHeight
                    }.bind(r)), i.appendChild(r), (e = e || {}).glCanvasId = r.id, e.onError || (e.onError = function (t) {
                        console.log(t)
                    }), CABLES.patch = new bt(e), r
                }
                console.error(s + " Polyshape Container Element not found!")
            }
        },
        It = {
            LineDrawer: function (t, e) {
                this._num = 1e5, this._counter = 0, this._positions = new Float32Array(3 * this._num), this._colors = new Float32Array(4 * this._num)
            },
            RectInstancer: function (t, e) {
                this._counter = 0, this._num = 1e5, this._needsRebuild = !0, this._positions = new Float32Array(3 * this._num), this._colors = new Float32Array(4 * this._num), this._sizes = new Float32Array(2 * this._num), this._shader = new ht(t, "rectinstancer"), this._shader.setSource("".endl() + "IN vec3 vPosition;".endl() + "IN vec3 instPos;".endl() + "IN vec4 instCol;".endl() + "IN vec2 instSize;".endl() + "OUT vec4 col;".endl() + "UNI float zoom,resX,resY,scrollX,scrollY;".endl() + "void main()".endl() + "{".endl() + "    vec3 pos=vPosition;".endl() + "    pos.xy*=instSize;".endl() + "    pos.x+=scrollX;".endl() + "    pos.y+=scrollY;".endl() + "    pos.x+=instPos.x;".endl() + "    pos.y+=instPos.y;".endl() + "    pos.y=0.0-pos.y;".endl() + "    col=instCol;".endl() + "    gl_Position = vec4(pos*(1.0/zoom),1.0);".endl() + "}", "IN vec4 col;void main(){outColor=vec4(col.rgb,1.0);}"), this._uniZoom = new J(this._shader, "f", "zoom", 0), this._uniResX = new J(this._shader, "f", "resX", 500), this._uniResY = new J(this._shader, "f", "resY", 500), this._uniscrollX = new J(this._shader, "f", "scrollX", 0), this._uniscrollY = new J(this._shader, "f", "scrollY", 0), this._geom = new Z("rectinstancer"), this._geom.vertices = new Float32Array([1, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0]), this._geom.verticesIndices = new Float32Array([2, 1, 0, 3, 1, 2]), this._mesh = new et(t, this._geom), this._mesh.numInstances = this._num;
                var i = 0;
                for (i = 0; i < 2 * this._num; i++) this._sizes[i] = 0;
                for (i = 0; i < 3 * this._num; i++) this._positions[i] = 0;
                for (i = 0; i < 4 * this._num; i++) this._colors[i] = 1
            }
        };
    It.RectInstancer.prototype.dispose = function () {}, It.RectInstancer.prototype.render = function (t, e, i, s, r) {
        this._uniResX.set(t), this._uniResY.set(e), this._uniscrollX.set(i), this._uniscrollY.set(s), this._uniZoom.set(r), this._needsRebuild && this.rebuild(), this._mesh.render(this._shader)
    }, It.RectInstancer.prototype.rebuild = function () {
        this._mesh.addAttribute("instPos", this._positions, 3, {
            instanced: !0
        }), this._mesh.addAttribute("instCol", this._colors, 4, {
            instanced: !0
        }), this._mesh.addAttribute("instSize", this._sizes, 2, {
            instanced: !0
        }), this._needsRebuild = !1
    }, It.RectInstancer.prototype.getIndex = function () {
        return this._counter++, this._counter
    }, It.RectInstancer.prototype.setPosition = function (t, e, i) {
        this._positions[3 * t + 0] = e, this._positions[3 * t + 1] = i, this._needsRebuild = !0
    }, It.RectInstancer.prototype.setSize = function (t, e, i) {
        this._sizes[2 * t + 0] = e, this._sizes[2 * t + 1] = i, this._needsRebuild = !0
    }, It.RectInstancer.prototype.setColor = function (t, e, i, s) {
        this._colors[4 * t + 0] = e, this._colors[4 * t + 1] = i, this._colors[4 * t + 2] = s, this._colors[4 * t + 3] = 1, this._needsRebuild = !0
    }, It.GlRect = function (t, e) {
        e = e || {}, this._rectInstancer = t, this._attrIndex = t.getIndex(), this._parent = e.parent || null, this.childs = []
    }, It.GlRect.prototype.addChild = function (t) {
        this.childs.push(t)
    }, It.GlRect.prototype.setSize = function (t, e) {
        this._rectInstancer.setSize(this._attrIndex, t, e)
    }, It.GlRect.prototype.setColor = function (t, e, i) {
        this._rectInstancer.setColor(this._attrIndex, t, e, i)
    }, It.GlRect.prototype.setPosition = function (t, e) {
        this.x = t, this.y = e;
        var i = this.x,
            s = this.y;
        this._parent && (i += this._parent.x, s += this._parent.y), this._rectInstancer.setPosition(this._attrIndex, i, s);
        for (var r = 0; r < this.childs.length; r++) this.childs[r].setPosition(this.childs[r].x, this.childs[r].y)
    }, It.OP_MIN_WIDTH = 100, It.GlOp = function (t, e) {
        this._op = e, this._instancer = t, this._glRectBg = new It.GlRect(t), this._glRectBg.setSize(100, 30), this._glRectBg.setColor(.1, .1, .1), this._portRects = [], this.updatePosition();
        for (var i = 0; i < this._op.portsIn.length; i++) this._setupPort(i, this._op.portsIn[i]);
        for (i = 0; i < this._op.portsOut.length; i++) this._setupPort(i, this._op.portsOut[i]);
        const s = 10 * Math.max(this._op.portsIn.length, this._op.portsOut.length);
        this._glRectBg.setSize(Math.max(It.OP_MIN_WIDTH, s), 30)
    }, It.GlOp.prototype.dispose = function () {
        this._glRectBg && (this._glRectBg.setSize(0, 0), this._glRectBg.setPosition(0, 0));
        for (var t = 0; t < this._portRects.length; t++) this._portRects[t].setSize(0, 0), this._portRects[t].setPosition(0, 0);
        this._op = null, this._portRects.length = 0, this._glRectBg = null, this._instancer = null
    }, It.GlOp.prototype._setupPort = function (t, e) {
        var i = new It.GlRect(this._instancer, {
            parent: this._glRectBg
        });
        i.setSize(7, 5), e.type == M.OP.OP_PORT_TYPE_VALUE ? i.setColor(0, 1, .7) : e.type == M.OP.OP_PORT_TYPE_FUNCTION ? i.setColor(1, 1, 0) : e.type == M.OP.OP_PORT_TYPE_OBJECT ? i.setColor(1, 0, 1) : e.type == M.OP.OP_PORT_TYPE_ARRAY ? i.setColor(0, .3, 1) : e.type == M.OP.OP_PORT_TYPE_STRING ? i.setColor(1, .3, 0) : e.type == M.OP.OP_PORT_TYPE_DYNAMIC && i.setColor(1, 1, 1);
        var s = 0;
        1 == e.direction && (s = 25), i.setPosition(10 * t, s), this._glRectBg.addChild(i), this._portRects.push(i)
    }, It.GlOp.prototype.updatePosition = function () {
        this._glRectBg ? this._glRectBg.setPosition(this._op.uiAttribs.translate.x, this._op.uiAttribs.translate.y) : console.log("no this._glRectBg")
    }, It.GlOp.prototype.getOp = function () {
        return this._op
    }, It.GlOp.prototype.update = function () {
        this.updatePosition()
    }, It.GlPatch = function (t) {
        this._patch = t, this._glOps = [], this._rectInstancer = new It.RectInstancer(this._patch.cgl), this._rectInstancer.rebuild(), t.addEventListener("onOpAdd", this.addOp.bind(this)), t.addEventListener("onOpDelete", this.deleteOp.bind(this))
    }, It.GlPatch.prototype.getOpAt = function (t, e) {}, It.GlPatch.prototype.deleteOp = function (t) {
        for (var e = 0; e < this._glOps.length; e++)
            if (this._glOps[e].getOp() == t) {
                var i = this._glOps[e];
                return this._glOps[e].getOp().removeEventListener("onUiAttribsChange", this._glOps[e].update), this._glOps.slice(e, 1), void i.dispose()
            }
    }, It.GlPatch.prototype.addOp = function (t) {
        console.log("OP ADDEDDDDDD");
        const e = new It.GlOp(this._rectInstancer, t);
        this._glOps.push(e), t.addEventListener("onUiAttribsChange", e.update.bind(e))
    }, It.GlPatch.prototype.render = function (t, e, i, s, r) {
        this._rectInstancer.render(t, e, i, s, r)
    }, It.GlPatch.prototype.dispose = function () {
        for (; this._glOps.length > 0;) this._glOps[0].dispose(), this._glOps.splice(0, 1);
        this._rectInstancer && this._rectInstancer.dispose()
    }, It.GlPatch.prototype.reset = function () {
        if (this._rectInstancer = new It.RectInstancer(this._patch.cgl), this._rectInstancer.rebuild(), this.dispose(), 0 == this._glOps.length)
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
            createAudioInPort: function (t, e, i, s) {
                if (!t || !e || !i) {
                    var r = "ERROR: createAudioInPort needs three parameters, op, portName and audioNode";
                    throw t.log(r), new Error(r)
                }
                s || (s = 0), t.webAudio = t.webAudio || {}, t.webAudio.audioInPorts = t.webAudio.audioInPorts || [];
                var n = t.inObject(e);
                return n.webAudio = {}, n.webAudio.previousAudioInNode = null, n.webAudio.audioNode = i, t.webAudio.audioInPorts[e] = n, n.onChange = function () {
                    var e = n.get();
                    if (e) try {
                        e.connect(n.webAudio.audioNode, 0, s)
                    } catch (i) {
                        throw t.log("Error: Failed to connect web audio node!", i), t.log("port.webAudio.audioNode", n.webAudio.audioNode), t.log("audioInNode: ", e), t.log("inputChannelIndex:", s), t.log("audioInNode.connect: ", e.connect), i
                    } else if (n.webAudio.previousAudioInNode) try {
                        n.webAudio.previousAudioInNode.disconnect(n.webAudio.audioNode, 0, s)
                    } catch (e) {
                        try {
                            n.webAudio.previousAudioInNode.disconnect(n.webAudio.audioNode)
                        } catch (e) {
                            throw t.log("Disconnecting audio node with in/out port index, as well as without in/out-port-index did not work ", e), e.printStackTrace && e.printStackTrace(), e
                        }
                    }
                    n.webAudio.previousAudioInNode = e
                }, n
            },
            replaceNodeInPort: function (t, e, i) {
                var s = t.webAudio.previousAudioInNode;
                if (s && s.disconnect) {
                    try {
                        s.disconnect(e)
                    } catch (t) {
                        throw t.printStackTrace && t.printStackTrace(), new Error("replaceNodeInPort: Could not disconnect old audio node. " + t.name + " " + t.message)
                    }
                    t.webAudio.audioNode = i;
                    try {
                        s.connect(i)
                    } catch (t) {
                        throw t.printStackTrace && t.printStackTrace(), new Error("replaceNodeInPort: Could not connect to new node. " + t.name + " " + t.message)
                    }
                }
            },
            createAudioOutPort: function (t, e, i) {
                if (!t || !e || !i) {
                    var s = "ERROR: createAudioOutPort needs three parameters, op, portName and audioNode";
                    throw t.log(s), new Error(s)
                }
                var r = t.outObject(e);
                return r.set(i), r
            },
            createAudioParamInPort: function (t, e, i, s, r) {
                if (!t || !e || !i) return t.log("ERROR: createAudioParamInPort needs three parameters, op, portName and audioNode"), t && t.name && t.log("opname: ", t.name), t.log("portName", e), void t.log("audioNode: ", i);
                t.webAudio = t.webAudio || {}, t.webAudio.audioInPorts = t.webAudio.audioInPorts || [];
                var n = t.inDynamic(e, [M.OP.OP_PORT_TYPE_VALUE, M.OP.OP_PORT_TYPE_OBJECT], s, r);
                return n.webAudio = {}, n.webAudio.previousAudioInNode = null, n.webAudio.audioNode = i, t.webAudio.audioInPorts[e] = n, n.onChange = function () {
                    var e = n.get(),
                        i = n.webAudio.audioNode,
                        s = yt.getAudioContext();
                    if (null != e)
                        if ("object" == typeof e && e.connect) {
                            try {
                                e.connect(i)
                            } catch (e) {
                                throw t.log("Could not connect audio node: ", e), e.printStackTrace && e.printStackTrace(), e
                            }
                            n.webAudio.previousAudioInNode = e
                        } else {
                            if (i._param && i._param.minValue && i._param.maxValue)
                                if (e >= i._param.minValue && e <= i._param.maxValue) try {
                                    i.setValueAtTime ? i.setValueAtTime(e, s.currentTime) : i.value = e
                                } catch (e) {
                                    throw t.log("Possible AudioParam problem with tone.js op: ", e), e.printStackTrace && e.printStackTrace(), e
                                } else t.log("Warning: The value for an audio parameter is out of range!");
                                else if (i.minValue && i.maxValue)
                                if (e >= i.minValue && e <= i.maxValue) try {
                                    i.setValueAtTime ? i.setValueAtTime(e, s.currentTime) : i.value = e
                                } catch (e) {
                                    throw t.log("AudioParam has minValue / maxValue defined, and value is in range, but setting the value failed! ", e), e.printStackTrace && e.printStackTrace(), e
                                } else t.log("Warning: The value for an audio parameter is out of range!");
                                else try {
                                    i.setValueAtTime ? i.setValueAtTime(e, s.currentTime) : i.value = e
                                } catch (e) {
                                    throw t.log("Possible AudioParam problem (without minValue / maxValue): ", e), e.printStackTrace && e.printStackTrace(), e
                                }
                            if (n.webAudio.previousAudioInNode && n.webAudio.previousAudioInNode.disconnect) {
                                try {
                                    n.webAudio.previousAudioInNode.disconnect(i)
                                } catch (e) {
                                    throw t.log("Could not disconnect previous audio node: ", e), e
                                }
                                n.webAudio.previousAudioInNode = void 0
                            }
                        }
                    else n.webAudio.previousAudioInNode
                }, n
            },
            loadAudioFile: function (t, e, i, s) {
                var r = yt.createAudioContext(),
                    n = t.loading.start("audio", e);
                CABLES.UI && gui.jobs().start({
                    id: "loadaudio" + n,
                    title: " loading audio (" + e + ")"
                });
                var o = new XMLHttpRequest;
                e && (o.open("GET", e, !0), o.responseType = "arraybuffer", o.onload = function () {
                    t.loading.finished(n), CABLES.UI && gui.jobs().finish("loadaudio" + n), r.decodeAudioData(o.response, i, s)
                }, o.send())
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
        Rt = function () {
            var t = CABLES.UI.userSettings.get("pacoRenderer") || !1;
            CABLES.UI.userSettings.set("pacoRenderer", !t), document.location.reload()
        },
        Pt = function () {},
        xt = function (t, e, i) {
            this._patch = t, this.connector = i || new Ft, this.connector.receive(this)
        };
    xt.prototype._receive = function (t) {
        var e = {};
        if ((e = t.event ? t : JSON.parse(t.data)).event == M.PACO.PACO_OP_CREATE) console.log("op create: data.vars.objName"), (o = this._patch.addOp(e.vars.objName)).id = e.vars.opId;
        else if (e.event == M.PACO.PACO_LOAD) console.log("load patch....."), this._patch.clear(), this._patch.deSerialize(e.vars.patch);
        else if (e.event == M.PACO.PACO_CLEAR) this._patch.clear(), console.log("clear");
        else if (e.event == M.PACO.PACO_OP_DELETE) console.log("op delete"), this._patch.deleteOp(e.vars.op, !0);
        else if (e.event == M.PACO.PACO_OP_ENABLE) {
            (o = this._patch.getOpById(e.vars.op)) && (o.enabled = !0)
        } else if (e.event == M.PACO.PACO_OP_DISABLE) {
            (o = this._patch.getOpById(e.vars.op)) && (o.enabled = !1)
        } else if (e.event == M.PACO.PACO_UNLINK) {
            var i = this._patch.getOpById(e.vars.op1),
                s = this._patch.getOpById(e.vars.op2),
                r = i.getPort(e.vars.port1),
                n = s.getPort(e.vars.port2);
            r.removeLinkTo(n)
        } else if (e.event == M.PACO.PACO_LINK) {
            i = this._patch.getOpById(e.vars.op1), s = this._patch.getOpById(e.vars.op2);
            this._patch.link(i, e.vars.port1, s, e.vars.port2)
        } else if (e.event == M.PACO.PACO_VALUECHANGE) {
            var o;
            (o = this._patch.getOpById(e.vars.op)).getPort(e.vars.port).set(e.vars.v)
        } else console.log("unknown patchConnectionEvent!", t)
    };
    const Nt = function (t, e) {
        this.connectors = [], this.connectors.push(new Ft)
    };
    Nt.prototype.send = function (t, e) {
        for (var i = 0; i < this.connectors.length; i++) this.connectors[i].send(t, e)
    };
    const Ft = function () {
        window.BroadcastChannel && (this.bc = new BroadcastChannel("test_channel"))
    };
    Ft.prototype.receive = function (t) {
        this.bc && (console.log("init"), this.bc.onmessage = t._receive.bind(t))
    }, Ft.prototype.send = function (t, e) {
        if (this.bc) {
            var i = {};
            i.event = t, i.vars = e, this.bc.postMessage(JSON.stringify(i))
        }
    };
    const Mt = Object.assign({
        EventTarget: _,
        EMBED: Ot,
        Link: H,
        Port: S,
        Op: Y,
        Profiler: vt,
        Requirements: Tt,
        Patch: bt,
        GLGUI: It,
        Instancing: Et,
        Timer: at,
        WEBAUDIO: yt,
        Variable: function () {
            var t = null,
                e = [];
            this.onChanged = function (t) {
                e.push(t)
            }, this.getValue = function () {
                return t
            }, this.setValue = function (e) {
                t = e, i()
            };
            var i = function () {
                for (var t = 0; t < e.length; t++) e[t]()
            }
        },
        LoadingStatus: mt,
        now: ot,
        internalNow: nt
    }, r, n, o, a, M.PORT, M.PACO, M.ANIM, M.OP);
    e.default = Mt
}]).default;