! function t(e, i, n) {
    function r(a, s) {
        if (!i[a]) {
            if (!e[a]) {
                var u = "function" == typeof require && require;
                if (!s && u) return u(a, !0);
                if (o) return o(a, !0);
                var h = new Error("Cannot find module '" + a + "'");
                throw h.code = "MODULE_NOT_FOUND", h
            }
            var l = i[a] = {
                exports: {}
            };
            e[a][0].call(l.exports, function(t) {
                var i = e[a][1][t];
                return r(i || t)
            }, l, l.exports, t, e, i, n)
        }
        return i[a].exports
    }
    for (var o = "function" == typeof require && require, a = 0; a < n.length; a++) r(n[a]);
    return r
}({
    1: [function(t, e, i) {
        "use strict";

        function n(t, e) {
            if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
        }
        var r = function() {
            function t(t, e) {
                for (var i = 0; i < e.length; i++) {
                    var n = e[i];
                    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n)
                }
            }
            return function(e, i, n) {
                return i && t(e.prototype, i), n && t(e, n), e
            }
        }();
        ! function(t) {
            var e = {
                    min: 0,
                    max: 1 / 0,
                    step: 1,
                    emptyOnMin: !1,
                    renderPrev: function(e) {
                        return t(document.createElement("span")).addClass("inputarrow-prev").html("<").insertBefore(e)
                    },
                    renderNext: function(e) {
                        return t(document.createElement("span")).addClass("inputarrow-next").html(">").insertAfter(e)
                    },
                    encodeValue: null,
                    decodeValue: null,
                    onChange: null,
                    onIterate: null,
                    disabledClassName: "inputarrow-disabled",
                    comma: !1,
                    gradientFactor: 1.1,
                    gradientDefault: 1,
                    gradientMax: 20,
                    delay: 300,
                    interval: 120
                },
                i = void 0 !== window.Symbol ? window.Symbol("inputarrow") : "__inputarrow",
                o = function() {
                    function i(r, o) {
                        var a = this;
                        n(this, i), this.input = r, this.opt = t.extend({}, e, o), this.$input = t(this.input), this.$prev = this.opt.renderPrev.call(this, this.input), this.$next = this.opt.renderNext.call(this, this.input), this.$prev.on("mousedown touchstart", function() {
                            a.startCounting(-1)
                        }).on("mouseup mouseout touchend", function() {
                            a.__isStarted && (a.__isCounting ? a.stopCounting() : (a.__clearCounting(), a.count(-1)))
                        }), this.$next.on("mousedown touchstart", function() {
                            a.startCounting(1)
                        }).on("mouseup mouseout touchend", function() {
                            a.__isStarted && (a.__isCounting ? a.stopCounting() : (a.__clearCounting(), a.count(1)))
                        }), this.__checkChange = function() {
                            a.check()
                        }, this.$input.on("change", this.__checkChange), this.__currentGrad = this.opt.gradientDefault, this.fit(), this.check()
                    }
                    return r(i, [{
                        key: "count",
                        value: function(t) {
                            var e = this.getValue(),
                                i = this.__round(e + t * this.opt.step);
                            i < this.opt.min ? i = this.opt.min : i > this.opt.max && (i = this.opt.max), i !== e && (this.setValue(i), this.$input.trigger("change"), this.opt.onChange && this.opt.onChange.call(this, i, e))
                        }
                    }, {
                        key: "startCounting",
                        value: function(t) {
                            var e = this;
                            this.__isStarted = !0, this.__delayTimer = setTimeout(function() {
                                e.__isCounting = !0, e.__oldValue = e.__currentValue = e.getValue(), e.__currentGrad = e.opt.gradientDefault, e.__incTimer = setInterval(function() {
                                    e.__iterateCounting(t)
                                }, e.opt.interval)
                            }, this.opt.delay)
                        }
                    }, {
                        key: "stopCounting",
                        value: function() {
                            if (this.__clearCounting(), this.__isCounting) {
                                this.__isCounting = !1, clearInterval(this.__incTimer);
                                var t = this.getValue();
                                t !== this.__oldValue && (this.$input.trigger("change"), this.opt.onChange && this.opt.onChange.call(this, t, this.__oldValue))
                            }
                        }
                    }, {
                        key: "__iterateCounting",
                        value: function(t) {
                            this.__currentValue += t * this.opt.step * this.__currentGrad;
                            var e = this.__round(this.__currentValue),
                                i = !1;
                            e < this.opt.min ? (e = this.opt.min, i = !0) : e > this.opt.max && (e = this.opt.max, i = !0);
                            var n = this.getValue();
                            e !== n && (this.setValue(e), this.check(), this.opt.onIterate && this.opt.onIterate.call(this, e, n)), i ? this.stopCounting() : this.__incGrad()
                        }
                    }, {
                        key: "__clearCounting",
                        value: function() {
                            this.__isStarted && (this.__isStarted = !1, clearTimeout(this.__delayTimer))
                        }
                    }, {
                        key: "__incGrad",
                        value: function() {
                            this.__currentGrad < this.opt.gradientMax && (this.__currentGrad *= this.opt.gradientFactor), this.__currentGrad > this.opt.gradientMax && (this.__currentGrad = this.opt.gradientMax)
                        }
                    }, {
                        key: "getValue",
                        value: function() {
                            var t = this.input.value;
                            if (this.opt.encodeValue && (t = this.opt.encodeValue.call(this, t)), "" === t) {
                                if (!this.opt.emptyOnMin) throw new TypeError("Can't convert empty string to value");
                                return this.opt.min
                            }
                            return parseFloat(this.opt.comma ? t.toString().replace(/,/, ".") : t)
                        }
                    }, {
                        key: "setValue",
                        value: function(t) {
                            this.opt.decodeValue && (t = this.opt.decodeValue.call(this, t)), t === this.opt.min && this.opt.emptyOnMin ? this.input.value = "" : this.input.value = this.opt.comma ? t.toString().replace(/\./, ",") : t
                        }
                    }, {
                        key: "fit",
                        value: function() {
                            var t = this.getValue();
                            t < this.opt.min && (t = this.opt.min), t > this.opt.max && (t = this.opt.max), this.setValue(t)
                        }
                    }, {
                        key: "check",
                        value: function() {
                            var t = this.getValue();
                            t <= this.opt.min ? this.$prev.addClass(this.opt.disabledClassName) : this.$prev.removeClass(this.opt.disabledClassName), t >= this.opt.max ? this.$next.addClass(this.opt.disabledClassName) : this.$next.removeClass(this.opt.disabledClassName)
                        }
                    }, {
                        key: "__round",
                        value: function(t) {
                            return Math.round(t / this.opt.step) * this.opt.step
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            this.$input.off("change", this.__checkChange), this.$prev.remove(), this.$next.remove()
                        }
                    }]), i
                }();
            t.fn.extend({
                inputarrow: function(e) {
                    if ("string" == typeof e) {
                        for (var n = [], r = arguments.length, a = Array(r > 1 ? r - 1 : 0), s = 1; s < r; s++) a[s - 1] = arguments[s];
                        for (var u = 0; u < this.length; u++) {
                            var h = this.get(u)[i];
                            if (!h) throw new Error("Can't call " + e + ": InputArrow is not initialized");
                            if (void 0 === h[e]) throw new Error("Can't call " + e + ": no such method or property");
                            if (/^_/.test(e)) throw new Error("Can't call " + e + ": it isn't public");
                            if ("function" == typeof h[e]) {
                                var l = h[e].apply(h, a);
                                n.push(l), "destroy" === e && delete this.get(u)[i]
                            } else {
                                var c = h[e];
                                n.push(c)
                            }
                        }
                        return 1 === n.length ? n[0] : n
                    }
                    for (var p = 0; p < this.length; p++) {
                        var d = {},
                            _ = this.eq(p).attr("min"),
                            f = this.eq(p).attr("max"),
                            g = this.eq(p).attr("step");
                        if (void 0 !== _ && "" !== _ && (d.min = parseFloat(_)), void 0 !== f && "" !== f && (d.max = parseFloat(f)), void 0 !== g && "" !== g && "any" !== g && (d.step = parseFloat(g)), this.get(p)[i]) throw new Error("InputArrow is already initialized");
                        this.get(p)[i] = new o(this.get(p), t.extend({}, d, e))
                    }
                    return this
                }
            })
        }(jQuery)
    }, {}]
}, {}, [1]);