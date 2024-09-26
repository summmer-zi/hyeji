// script.js
u = {
  el: document,
  elMobile: document,
  name: "scroll",
  offset: 0,
  repeat: !1,
  smooth: !0, // 모바일에서도 부드러운 스크롤 활성화
  smoothMobile: !0, // 모바일에서도 부드러운 스크롤 활성화
  direction: "vertical",
  inertia: 1,
  class: "is-inview",
  scrollbarClass: "c-scrollbar",
  scrollingClass: "has-scroll-scrolling",
  draggingClass: "has-scroll-dragging",
  smoothClass: "has-scroll-smooth",
  initClass: "has-scroll-init",
  getSpeed: !1,
  getDirection: !1,
  firefoxMultiplier: 50,
  touchMultiplier: 2
};

!(function() {
  "use strict";
  function s(t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  }
  function n(t, e) {
    for (var i = 0; i < e.length; i++) {
      var s = e[i];
      (s.enumerable = s.enumerable || !1),
        (s.configurable = !0),
        "value" in s && (s.writable = !0),
        Object.defineProperty(t, s.key, s);
    }
  }
  function l(t, e, i) {
    return e && n(t.prototype, e), i && n(t, i), t;
  }
  function i(e, t) {
    var i = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(e);
      t &&
        (s = s.filter(function(t) {
          return Object.getOwnPropertyDescriptor(e, t).enumerable;
        })),
        i.push.apply(i, s);
    }
    return i;
  }
  function e(t, e) {
    if ("function" != typeof e && null !== e)
      throw new TypeError("Super expression must either be null or a function");
    (t.prototype = Object.create(e && e.prototype, {
      constructor: { value: t, writable: !0, configurable: !0 }
    })),
      e && a(t, e);
  }
  function o(t) {
    return (o = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function(t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        })(t);
  }
  function a(t, e) {
    return (a =
      Object.setPrototypeOf ||
      function(t, e) {
        return (t.__proto__ = e), t;
      })(t, e);
  }
  function r(t) {
    if (void 0 === t)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      );
    return t;
  }
  function c(t, e) {
    return !e || ("object" != typeof e && "function" != typeof e) ? r(t) : e;
  }
  function h(t, e, i) {
    return (h =
      "undefined" != typeof Reflect && Reflect.get
        ? Reflect.get
        : function(t, e, i) {
            var s = (function(t, e) {
              for (
                ;
                !Object.prototype.hasOwnProperty.call(t, e) &&
                null !== (t = o(t));

              );
              return t;
            })(t, e);
            if (s) {
              var n = Object.getOwnPropertyDescriptor(s, e);
              return n.get ? n.get.call(i) : n.value;
            }
          })(t, e, i || t);
  }
  var u = {
      el: document,
      elMobile: document,
      name: "scroll",
      offset: 0,
      repeat: !1,
      smooth: !1,
      smoothMobile: !1,
      direction: "vertical",
      inertia: 1,
      class: "is-inview",
      scrollbarClass: "c-scrollbar",
      scrollingClass: "has-scroll-scrolling",
      draggingClass: "has-scroll-dragging",
      smoothClass: "has-scroll-smooth",
      initClass: "has-scroll-init",
      getSpeed: !1,
      getDirection: !1,
      firefoxMultiplier: 50,
      touchMultiplier: 2
    },
    d = (function() {
      function e() {
        var t =
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        s(this, e),
          window.scrollTo(0, 0),
          Object.assign(this, u, t),
          (this.namespace = "locomotive"),
          (this.html = document.documentElement),
          (this.windowHeight = window.innerHeight),
          (this.windowMiddle = this.windowHeight / 2),
          (this.els = []),
          (this.listeners = {}),
          (this.hasScrollTicking = !1),
          (this.hasCallEventSet = !1),
          (this.checkScroll = this.checkScroll.bind(this)),
          (this.checkResize = this.checkResize.bind(this)),
          (this.checkEvent = this.checkEvent.bind(this)),
          (this.instance = {
            scroll: { x: 0, y: 0 },
            limit: this.html.offsetHeight
          }),
          this.getDirection && (this.instance.direction = null),
          this.getDirection && (this.instance.speed = 0),
          this.html.classList.add(this.initClass),
          window.addEventListener("resize", this.checkResize, !1);
      }
      return (
        l(e, [
          {
            key: "init",
            value: function() {
              this.initEvents();
            }
          },
          {
            key: "checkScroll",
            value: function() {
              this.dispatchScroll();
            }
          },
          { key: "checkResize", value: function() {} },
          {
            key: "initEvents",
            value: function() {
              var e = this;
              (this.scrollToEls = this.el.querySelectorAll(
                "[data-".concat(this.name, "-to]")
              )),
                (this.setScrollTo = this.setScrollTo.bind(this)),
                this.scrollToEls.forEach(function(t) {
                  t.addEventListener("click", e.setScrollTo, !1);
                });
            }
          },
          {
            key: "setScrollTo",
            value: function(t) {
              t.preventDefault(),
                this.scrollTo(
                  t.currentTarget.getAttribute(
                    "data-".concat(this.name, "-href")
                  ) || t.currentTarget.getAttribute("href"),
                  t.currentTarget.getAttribute(
                    "data-".concat(this.name, "-offset")
                  )
                );
            }
          },
          { key: "addElements", value: function() {} },
          {
            key: "detectElements",
            value: function(i) {
              var s = this,
                n = this.instance.scroll.y,
                l = n + this.windowHeight;
              this.els.forEach(function(t, e) {
                !t ||
                  (t.inView && !i) ||
                  (l >= t.top && n < t.bottom && s.setInView(t, e)),
                  t &&
                    t.inView &&
                    (l < t.top || n > t.bottom) &&
                    s.setOutOfView(t, e);
              }),
                (this.els = this.els.filter(function(t, e) {
                  return null !== t;
                })),
                (this.hasScrollTicking = !1);
            }
          },
          {
            key: "setInView",
            value: function(t, e) {
              (this.els[e].inView = !0),
                t.el.classList.add(t.class),
                t.call &&
                  this.hasCallEventSet &&
                  (this.dispatchCall(t, "enter"),
                  t.repeat || (this.els[e].call = !1)),
                t.repeat ||
                  t.speed ||
                  t.sticky ||
                  ((!t.call || (t.call && this.hasCallEventSet)) &&
                    (this.els[e] = null));
            }
          },
          {
            key: "setOutOfView",
            value: function(t, e) {
              (t.repeat || void 0 !== t.speed) && (this.els[e].inView = !1),
                t.call && this.hasCallEventSet && this.dispatchCall(t, "exit"),
                t.repeat && t.el.classList.remove(t.class);
            }
          },
          {
            key: "dispatchCall",
            value: function(t, e) {
              (this.callWay = e),
                (this.callValue = t.call.split(",").map(function(t) {
                  return t.trim();
                })),
                (this.callObj = t),
                1 == this.callValue.length &&
                  (this.callValue = this.callValue[0]);
              var i = new Event(this.namespace + "call");
              this.el.dispatchEvent(i);
            }
          },
          {
            key: "dispatchScroll",
            value: function() {
              var t = new Event(this.namespace + "scroll");
              this.el.dispatchEvent(t);
            }
          },
          {
            key: "setEvents",
            value: function(t, e) {
              this.listeners[t] || (this.listeners[t] = []);
              var i = this.listeners[t];
              i.push(e),
                1 === i.length &&
                  this.el.addEventListener(
                    this.namespace + t,
                    this.checkEvent,
                    !1
                  ),
                "call" === t &&
                  ((this.hasCallEventSet = !0), this.detectElements(!0));
            }
          },
          {
            key: "unsetEvents",
            value: function(t, e) {
              if (this.listeners[t]) {
                var i = this.listeners[t],
                  s = i.indexOf(e);
                s < 0 ||
                  (i.splice(s, 1),
                  0 === i.index &&
                    this.el.removeEventListener(
                      this.namespace + t,
                      this.checkEvent,
                      !1
                    ));
              }
            }
          },
          {
            key: "checkEvent",
            value: function(t) {
              var e = this,
                i = t.type.replace(this.namespace, ""),
                s = this.listeners[i];
              s &&
                0 !== s.length &&
                s.forEach(function(t) {
                  switch (i) {
                    case "scroll":
                      return t(e.instance);
                    case "call":
                      return t(e.callValue, e.callWay, e.callObj);
                    default:
                      return t();
                  }
                });
            }
          },
          { key: "startScroll", value: function() {} },
          { key: "stopScroll", value: function() {} },
          {
            key: "setScroll",
            value: function(t, e) {
              this.instance.scroll = { x: 0, y: 0 };
            }
          },
          {
            key: "destroy",
            value: function() {
              var e = this;
              window.removeEventListener("resize", this.checkResize, !1),
                Object.keys(this.listeners).forEach(function(t) {
                  e.el.removeEventListener(e.namespace + t, e.checkEvent, !1);
                }),
                (this.listeners = {}),
                this.scrollToEls.forEach(function(t) {
                  t.removeEventListener("click", e.setScrollTo, !1);
                });
            }
          }
        ]),
        e
      );
    })(),
    t = (function(t) {
      function i() {
        var t,
          e =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        return (
          s(this, i),
          (t = c(this, o(i).call(this, e))),
          window.addEventListener("scroll", t.checkScroll, !1),
          t
        );
      }
      return (
        e(i, d),
        l(i, [
          {
            key: "init",
            value: function() {
              (this.instance.scroll.y = window.pageYOffset),
                this.addElements(),
                this.detectElements(),
                h(o(i.prototype), "init", this).call(this);
            }
          },
          {
            key: "checkScroll",
            value: function() {
              var t = this;
              h(o(i.prototype), "checkScroll", this).call(this),
                (this.instance.scroll.y = window.pageYOffset),
                this.els.length &&
                  (this.hasScrollTicking ||
                    (requestAnimationFrame(function() {
                      t.detectElements();
                    }),
                    (this.hasScrollTicking = !0)));
            }
          },
          {
            key: "checkResize",
            value: function() {
              var t = this;
              this.els.length &&
                ((this.windowHeight = window.innerHeight),
                this.hasScrollTicking ||
                  (requestAnimationFrame(function() {
                    t.updateElements();
                  }),
                  (this.hasScrollTicking = !0)));
            }
          },
          {
            key: "addElements",
            value: function() {
              var c = this;
              (this.els = []),
                this.el
                  .querySelectorAll("[data-" + this.name + "]")
                  .forEach(function(t, e) {
                    var i = t.dataset[c.name + "Class"] || c.class,
                      s = t.getBoundingClientRect().top + c.instance.scroll.y,
                      n = s + t.offsetHeight,
                      l =
                        parseInt(t.dataset[c.name + "Offset"]) ||
                        parseInt(c.offset),
                      o = t.dataset[c.name + "Repeat"],
                      a = t.dataset[c.name + "Call"],
                      r = {
                        el: t,
                        id: e,
                        class: i,
                        top: s + l,
                        bottom: n,
                        offset: l,
                        repeat: (o = "false" != o && (null != o || c.repeat)),
                        inView: !1,
                        call: a
                      };
                    c.els.push(r);
                  });
            }
          },
          {
            key: "updateElements",
            value: function() {
              var n = this;
              this.els.forEach(function(t, e) {
                var i = t.el.getBoundingClientRect().top + n.instance.scroll.y,
                  s = i + t.el.offsetHeight;
                (n.els[e].top = i + t.offset), (n.els[e].bottom = s);
              }),
                (this.hasScrollTicking = !1);
            }
          },
          {
            key: "scrollTo",
            value: function(t, e) {
              var i,
                s = e ? parseInt(e) : 0;
              "string" == typeof t
                ? "top" === t
                  ? (i = this.html)
                  : "bottom" === t
                  ? (s = this.html.offsetHeight - window.innerHeight)
                  : (i = document.querySelectorAll(t)[0])
                : t.target || (i = t),
                i && (s = i.getBoundingClientRect().top + s),
                (s += this.instance.scroll.y),
                window.scrollTo({ top: s, behavior: "smooth" });
            }
          },
          {
            key: "update",
            value: function() {
              this.addElements(), this.detectElements();
            }
          },
          {
            key: "destroy",
            value: function() {
              h(o(i.prototype), "destroy", this).call(this),
                window.removeEventListener("scroll", this.checkScroll, !1);
            }
          }
        ]),
        i
      );
    })(),
    f = Object.getOwnPropertySymbols,
    p = Object.prototype.hasOwnProperty,
    y = Object.prototype.propertyIsEnumerable;
  var m = (function() {
    try {
      if (!Object.assign) return !1;
      var t = new String("abc");
      if (((t[5] = "de"), "5" === Object.getOwnPropertyNames(t)[0])) return !1;
      for (var e = {}, i = 0; i < 10; i++) e["_" + String.fromCharCode(i)] = i;
      if (
        "0123456789" !==
        Object.getOwnPropertyNames(e)
          .map(function(t) {
            return e[t];
          })
          .join("")
      )
        return !1;
      var s = {};
      return (
        "abcdefghijklmnopqrst".split("").forEach(function(t) {
          s[t] = t;
        }),
        "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, s)).join("")
      );
    } catch (t) {
      return !1;
    }
  })()
    ? Object.assign
    : function(t, e) {
        for (
          var i,
            s,
            n = (function(t) {
              if (null == t)
                throw new TypeError(
                  "Object.assign cannot be called with null or undefined"
                );
              return Object(t);
            })(t),
            l = 1;
          l < arguments.length;
          l++
        ) {
          for (var o in (i = Object(arguments[l])))
            p.call(i, o) && (n[o] = i[o]);
          if (f) {
            s = f(i);
            for (var a = 0; a < s.length; a++)
              y.call(i, s[a]) && (n[s[a]] = i[s[a]]);
          }
        }
        return n;
      };
  function v() {}
  v.prototype = {
    on: function(t, e, i) {
      var s = this.e || (this.e = {});
      return (s[t] || (s[t] = [])).push({ fn: e, ctx: i }), this;
    },
    once: function(t, e, i) {
      var s = this;
      function n() {
        s.off(t, n), e.apply(i, arguments);
      }
      return (n._ = e), this.on(t, n, i);
    },
    emit: function(t) {
      for (
        var e = [].slice.call(arguments, 1),
          i = ((this.e || (this.e = {}))[t] || []).slice(),
          s = 0,
          n = i.length;
        s < n;
        s++
      )
        i[s].fn.apply(i[s].ctx, e);
      return this;
    },
    off: function(t, e) {
      var i = this.e || (this.e = {}),
        s = i[t],
        n = [];
      if (s && e)
        for (var l = 0, o = s.length; l < o; l++)
          s[l].fn !== e && s[l].fn._ !== e && n.push(s[l]);
      return n.length ? (i[t] = n) : delete i[t], this;
    }
  };
  var g = v,
    w =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : {};
  var b,
    k =
      ((function(t, e) {
        (function() {
          (null !== e ? e : this).Lethargy = (function() {
            function t(t, e, i, s) {
              (this.stability = null != t ? Math.abs(t) : 8),
                (this.sensitivity = null != e ? 1 + Math.abs(e) : 100),
                (this.tolerance = null != i ? 1 + Math.abs(i) : 1.1),
                (this.delay = null != s ? s : 150),
                (this.lastUpDeltas = function() {
                  var t, e, i;
                  for (
                    i = [], t = 1, e = 2 * this.stability;
                    1 <= e ? t <= e : e <= t;
                    1 <= e ? t++ : t--
                  )
                    i.push(null);
                  return i;
                }.call(this)),
                (this.lastDownDeltas = function() {
                  var t, e, i;
                  for (
                    i = [], t = 1, e = 2 * this.stability;
                    1 <= e ? t <= e : e <= t;
                    1 <= e ? t++ : t--
                  )
                    i.push(null);
                  return i;
                }.call(this)),
                (this.deltasTimestamp = function() {
                  var t, e, i;
                  for (
                    i = [], t = 1, e = 2 * this.stability;
                    1 <= e ? t <= e : e <= t;
                    1 <= e ? t++ : t--
                  )
                    i.push(null);
                  return i;
                }.call(this));
            }
            return (
              (t.prototype.check = function(t) {
                var e;
                return (
                  null != (t = t.originalEvent || t).wheelDelta
                    ? (e = t.wheelDelta)
                    : null != t.deltaY
                    ? (e = -40 * t.deltaY)
                    : (null == t.detail && 0 !== t.detail) ||
                      (e = -40 * t.detail),
                  this.deltasTimestamp.push(Date.now()),
                  this.deltasTimestamp.shift(),
                  0 < e
                    ? (this.lastUpDeltas.push(e),
                      this.lastUpDeltas.shift(),
                      this.isInertia(1))
                    : (this.lastDownDeltas.push(e),
                      this.lastDownDeltas.shift(),
                      this.isInertia(-1))
                );
              }),
              (t.prototype.isInertia = function(t) {
                var e, i, s, n, l, o, a;
                return null ===
                  (e = -1 === t ? this.lastDownDeltas : this.lastUpDeltas)[0]
                  ? t
                  : !(
                      this.deltasTimestamp[2 * this.stability - 2] +
                        this.delay >
                        Date.now() && e[0] === e[2 * this.stability - 1]
                    ) &&
                      ((s = e.slice(0, this.stability)),
                      (i = e.slice(this.stability, 2 * this.stability)),
                      (a = s.reduce(function(t, e) {
                        return t + e;
                      })),
                      (l = i.reduce(function(t, e) {
                        return t + e;
                      })),
                      (o = a / s.length),
                      (n = l / i.length),
                      Math.abs(o) < Math.abs(n * this.tolerance) &&
                        this.sensitivity < Math.abs(n) &&
                        t);
              }),
              (t.prototype.showLastUpDeltas = function() {
                return this.lastUpDeltas;
              }),
              (t.prototype.showLastDownDeltas = function() {
                return this.lastDownDeltas;
              }),
              t
            );
          })();
        }.call(w));
      })((b = { exports: {} }), b.exports),
      b.exports),
    S = {
      hasWheelEvent: "onwheel" in document,
      hasMouseWheelEvent: "onmousewheel" in document,
      hasTouch: "ontouchstart" in document,
      hasTouchWin: navigator.msMaxTouchPoints && 1 < navigator.msMaxTouchPoints,
      hasPointer: !!window.navigator.msPointerEnabled,
      hasKeyDown: "onkeydown" in document,
      isFirefox: -1 < navigator.userAgent.indexOf("Firefox")
    },
    E = Object.prototype.toString,
    T = Object.prototype.hasOwnProperty;
  function O(t, e) {
    return function() {
      return t.apply(e, arguments);
    };
  }
  var D = k.Lethargy,
    _ = "virtualscroll",
    L = B,
    M = 37,
    C = 38,
    H = 39,
    x = 40,
    j = 32;
  function B(t) {
    !(function(t) {
      if (!t) return console.warn("bindAll requires at least one argument.");
      var e = Array.prototype.slice.call(arguments, 1);
      if (0 === e.length)
        for (var i in t)
          T.call(t, i) &&
            "function" == typeof t[i] &&
            "[object Function]" == E.call(t[i]) &&
            e.push(i);
      for (var s = 0; s < e.length; s++) {
        var n = e[s];
        t[n] = O(t[n], t);
      }
    })(
      this,
      "_onWheel",
      "_onMouseWheel",
      "_onTouchStart",
      "_onTouchMove",
      "_onKeyDown"
    ),
      (this.el = window),
      t && t.el && ((this.el = t.el), delete t.el),
      (this.options = m(
        {
          mouseMultiplier: 1,
          touchMultiplier: 2,
          firefoxMultiplier: 15,
          keyStep: 120,
          preventTouch: !1,
          unpreventTouchClass: "vs-touchmove-allowed",
          limitInertia: !1,
          useKeyboard: !0,
          useTouch: !0
        },
        t
      )),
      this.options.limitInertia && (this._lethargy = new D()),
      (this._emitter = new g()),
      (this._event = { y: 0, x: 0, deltaX: 0, deltaY: 0 }),
      (this.touchStartX = null),
      (this.touchStartY = null),
      (this.bodyTouchAction = null),
      void 0 !== this.options.passive &&
        (this.listenerOptions = { passive: this.options.passive });
  }
  function P(t, e, i) {
    return (1 - i) * t + i * e;
  }
  function Y(t) {
    var e = {};
    if (window.getComputedStyle) {
      var i = getComputedStyle(t),
        s = i.transform || i.webkitTransform || i.mozTransform,
        n = s.match(/^matrix3d\((.+)\)$/);
      return n
        ? parseFloat(n[1].split(", ")[13])
        : ((n = s.match(/^matrix\((.+)\)$/)),
          (e.x = n ? parseFloat(n[1].split(", ")[4]) : 0),
          (e.y = n ? parseFloat(n[1].split(", ")[5]) : 0),
          e);
    }
  }
  (B.prototype._notify = function(t) {
    var e = this._event;
    (e.x += e.deltaX),
      (e.y += e.deltaY),
      this._emitter.emit(_, {
        x: e.x,
        y: e.y,
        deltaX: e.deltaX,
        deltaY: e.deltaY,
        originalEvent: t
      });
  }),
    (B.prototype._onWheel = function(t) {
      var e = this.options;
      if (!this._lethargy || !1 !== this._lethargy.check(t)) {
        var i = this._event;
        (i.deltaX = t.wheelDeltaX || -1 * t.deltaX),
          (i.deltaY = t.wheelDeltaY || -1 * t.deltaY),
          S.isFirefox &&
            1 == t.deltaMode &&
            ((i.deltaX *= e.firefoxMultiplier),
            (i.deltaY *= e.firefoxMultiplier)),
          (i.deltaX *= e.mouseMultiplier),
          (i.deltaY *= e.mouseMultiplier),
          this._notify(t);
      }
    }),
    (B.prototype._onMouseWheel = function(t) {
      if (!this.options.limitInertia || !1 !== this._lethargy.check(t)) {
        var e = this._event;
        (e.deltaX = t.wheelDeltaX ? t.wheelDeltaX : 0),
          (e.deltaY = t.wheelDeltaY ? t.wheelDeltaY : t.wheelDelta),
          this._notify(t);
      }
    }),
    (B.prototype._onTouchStart = function(t) {
      var e = t.targetTouches ? t.targetTouches[0] : t;
      (this.touchStartX = e.pageX), (this.touchStartY = e.pageY);
    }),
    (B.prototype._onTouchMove = function(t) {
      var e = this.options;
      e.preventTouch &&
        !t.target.classList.contains(e.unpreventTouchClass) &&
        t.preventDefault();
      var i = this._event,
        s = t.targetTouches ? t.targetTouches[0] : t;
      (i.deltaX = (s.pageX - this.touchStartX) * e.touchMultiplier),
        (i.deltaY = (s.pageY - this.touchStartY) * e.touchMultiplier),
        (this.touchStartX = s.pageX),
        (this.touchStartY = s.pageY),
        this._notify(t);
    }),
    (B.prototype._onKeyDown = function(t) {
      var e = this._event;
      e.deltaX = e.deltaY = 0;
      var i = window.innerHeight - 40;
      switch (t.keyCode) {
        case M:
        case C:
          e.deltaY = this.options.keyStep;
          break;
        case H:
        case x:
          e.deltaY = -this.options.keyStep;
          break;
        case t.shiftKey:
          e.deltaY = i;
          break;
        case j:
          e.deltaY = -i;
          break;
        default:
          return;
      }
      this._notify(t);
    }),
    (B.prototype._bind = function() {
      S.hasWheelEvent &&
        this.el.addEventListener("wheel", this._onWheel, this.listenerOptions),
        S.hasMouseWheelEvent &&
          this.el.addEventListener(
            "mousewheel",
            this._onMouseWheel,
            this.listenerOptions
          ),
        S.hasTouch &&
          this.options.useTouch &&
          (this.el.addEventListener(
            "touchstart",
            this._onTouchStart,
            this.listenerOptions
          ),
          this.el.addEventListener(
            "touchmove",
            this._onTouchMove,
            this.listenerOptions
          )),
        S.hasPointer &&
          S.hasTouchWin &&
          ((this.bodyTouchAction = document.body.style.msTouchAction),
          (document.body.style.msTouchAction = "none"),
          this.el.addEventListener("MSPointerDown", this._onTouchStart, !0),
          this.el.addEventListener("MSPointerMove", this._onTouchMove, !0)),
        S.hasKeyDown &&
          this.options.useKeyboard &&
          document.addEventListener("keydown", this._onKeyDown);
    }),
    (B.prototype._unbind = function() {
      S.hasWheelEvent && this.el.removeEventListener("wheel", this._onWheel),
        S.hasMouseWheelEvent &&
          this.el.removeEventListener("mousewheel", this._onMouseWheel),
        S.hasTouch &&
          (this.el.removeEventListener("touchstart", this._onTouchStart),
          this.el.removeEventListener("touchmove", this._onTouchMove)),
        S.hasPointer &&
          S.hasTouchWin &&
          ((document.body.style.msTouchAction = this.bodyTouchAction),
          this.el.removeEventListener("MSPointerDown", this._onTouchStart, !0),
          this.el.removeEventListener("MSPointerMove", this._onTouchMove, !0)),
        S.hasKeyDown &&
          this.options.useKeyboard &&
          document.removeEventListener("keydown", this._onKeyDown);
    }),
    (B.prototype.on = function(t, e) {
      this._emitter.on(_, t, e);
      var i = this._emitter.e;
      i && i[_] && 1 === i[_].length && this._bind();
    }),
    (B.prototype.off = function(t, e) {
      this._emitter.off(_, t, e);
      var i = this._emitter.e;
      (!i[_] || i[_].length <= 0) && this._unbind();
    }),
    (B.prototype.reset = function() {
      var t = this._event;
      (t.x = 0), (t.y = 0);
    }),
    (B.prototype.destroy = function() {
      this._emitter.off(), this._unbind();
    });
  var R = 38,
    A = 40,
    V = 32,
    X = 9,
    W = 33,
    K = 34,
    I = 36,
    q = 35,
    F = (function(t) {
      function n() {
        var t,
          e =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        return (
          s(this, n),
          ((t = c(this, o(n).call(this, e))).inertia = 0.1 * t.inertia),
          (t.isScrolling = !1),
          (t.isDraggingScrollbar = !1),
          (t.isTicking = !1),
          (t.hasScrollTicking = !1),
          (t.parallaxElements = []),
          (t.inertiaRatio = 1),
          (t.stop = !1),
          (t.checkKey = t.checkKey.bind(r(t))),
          window.addEventListener("keydown", t.checkKey, !1),
          t
        );
      }
      return (
        e(n, d),
        l(n, [
          {
            key: "init",
            value: function() {
              var e = this;
              this.html.classList.add(this.smoothClass),
                (this.instance = (function(n) {
                  for (var t = 1; t < arguments.length; t++) {
                    var l = null != arguments[t] ? arguments[t] : {};
                    t % 2
                      ? i(l, !0).forEach(function(t) {
                          var e, i, s;
                          (e = n),
                            (s = l[(i = t)]),
                            i in e
                              ? Object.defineProperty(e, i, {
                                  value: s,
                                  enumerable: !0,
                                  configurable: !0,
                                  writable: !0
                                })
                              : (e[i] = s);
                        })
                      : Object.getOwnPropertyDescriptors
                      ? Object.defineProperties(
                          n,
                          Object.getOwnPropertyDescriptors(l)
                        )
                      : i(l).forEach(function(t) {
                          Object.defineProperty(
                            n,
                            t,
                            Object.getOwnPropertyDescriptor(l, t)
                          );
                        });
                  }
                  return n;
                })({ delta: { x: 0, y: 0 } }, this.instance)),
                (this.vs = new L({
                  el: this.el,
                  mouseMultiplier:
                    -1 < navigator.platform.indexOf("Win") ? 1 : 0.4,
                  firefoxMultiplier: this.firefoxMultiplier,
                  touchMultiplier: this.touchMultiplier,
                  useKeyboard: !1,
                  passive: !0
                })),
                this.vs.on(function(t) {
                  e.stop ||
                    (e.isTicking ||
                      e.isDraggingScrollbar ||
                      (requestAnimationFrame(function() {
                        e.isScrolling || e.startScrolling(), e.updateDelta(t);
                      }),
                      (e.isTicking = !0)),
                    (e.isTicking = !1));
                }),
                this.setScrollLimit(),
                this.initScrollBar(),
                this.addSections(),
                this.addElements(),
                this.detectElements(),
                this.transformElements(!0),
                h(o(n.prototype), "init", this).call(this);
            }
          },
          {
            key: "setScrollLimit",
            value: function() {
              this.instance.limit = this.el.offsetHeight - this.windowHeight;
            }
          },
          {
            key: "startScrolling",
            value: function() {
              (this.isScrolling = !0),
                this.checkScroll(),
                this.html.classList.add(this.scrollingClass);
            }
          },
          {
            key: "stopScrolling",
            value: function() {
              (this.isScrolling = !1),
                (this.inertiaRatio = 1),
                (this.instance.scroll.y = Math.round(this.instance.scroll.y)),
                this.html.classList.remove(this.scrollingClass);
            }
          },
          {
            key: "checkKey",
            value: function(t) {
              var e = this;
              switch (t.keyCode) {
                case X:
                  setTimeout(function() {
                    (document.documentElement.scrollTop = 0),
                      (document.body.scrollTop = 0),
                      document.activeElement instanceof HTMLBodyElement ||
                        e.scrollTo(
                          document.activeElement,
                          -window.innerHeight / 2
                        );
                  }, 0);
                  break;
                case R:
                  this.instance.delta.y -= 240;
                  break;
                case A:
                  this.instance.delta.y += 240;
                  break;
                case W:
                  this.instance.delta.y -= window.innerHeight;
                  break;
                case K:
                  this.instance.delta.y += window.innerHeight;
                  break;
                case I:
                  this.instance.delta.y -= this.instance.limit;
                  break;
                case q:
                  this.instance.delta.y += this.instance.limit;
                  break;
                case V:
                  document.activeElement instanceof HTMLInputElement ||
                    document.activeElement instanceof HTMLTextAreaElement ||
                    (t.shiftKey
                      ? (this.instance.delta.y -= window.innerHeight)
                      : (this.instance.delta.y += window.innerHeight));
                  break;
                default:
                  return;
              }
              this.instance.delta.y < 0 && (this.instance.delta.y = 0),
                this.instance.delta.y > this.instance.limit &&
                  (this.instance.delta.y = this.instance.limit),
                (this.isScrolling = !0),
                this.checkScroll(),
                this.html.classList.add(this.scrollingClass);
            }
          },
          {
            key: "checkScroll",
            value: function() {
              var t = this;
              if (this.isScrolling || this.isDraggingScrollbar) {
                this.hasScrollTicking ||
                  (requestAnimationFrame(function() {
                    return t.checkScroll();
                  }),
                  (this.hasScrollTicking = !0));
                var e = Math.abs(
                  this.instance.delta.y - this.instance.scroll.y
                );
                ((e < 0.5 && 0 != this.instance.delta.y) ||
                  (e < 0.5 && 0 == this.instance.delta.y)) &&
                  this.stopScrolling(),
                  this.updateScroll();
                for (var i = this.sections.length - 1; 0 <= i; i--)
                  this.sections[i].persistent ||
                  (this.instance.scroll.y > this.sections[i].offset &&
                    this.instance.scroll.y < this.sections[i].limit)
                    ? (this.transform(
                        this.sections[i].el,
                        0,
                        -this.instance.scroll.y
                      ),
                      (this.sections[i].el.style.visibility = "visible"),
                      (this.sections[i].inView = !0))
                    : ((this.sections[i].el.style.visibility = "hidden"),
                      (this.sections[i].inView = !1),
                      this.transform(this.sections[i].el, 0, 0));
                this.getDirection && this.addDirection(),
                  this.getSpeed &&
                    (this.addSpeed(), (this.timestamp = Date.now())),
                  this.detectElements(),
                  this.transformElements();
                var s =
                  (this.instance.scroll.y / this.instance.limit) *
                  this.scrollBarLimit;
                this.transform(this.scrollbarThumb, 0, s),
                  h(o(n.prototype), "checkScroll", this).call(this),
                  (this.hasScrollTicking = !1);
              }
            }
          },
          {
            key: "checkResize",
            value: function() {
              (this.windowHeight = window.innerHeight),
                (this.windowMiddle = this.windowHeight / 2),
                this.update();
            }
          },
          {
            key: "updateDelta",
            value: function(t) {
              (this.instance.delta.y -= t.deltaY),
                this.instance.delta.y < 0 && (this.instance.delta.y = 0),
                this.instance.delta.y > this.instance.limit &&
                  (this.instance.delta.y = this.instance.limit);
            }
          },
          {
            key: "updateScroll",
            value: function(t) {
              this.isScrolling || this.isDraggingScrollbar
                ? (this.instance.scroll.y = P(
                    this.instance.scroll.y,
                    this.instance.delta.y,
                    this.inertia * this.inertiaRatio
                  ))
                : (this.instance.scroll.y = this.instance.delta.y);
            }
          },
          {
            key: "addDirection",
            value: function() {
              this.instance.delta.y > this.instance.scroll.y
                ? "down" !== this.instance.direction &&
                  (this.instance.direction = "down")
                : this.instance.delta.y < this.instance.scroll.y &&
                  "up" !== this.instance.direction &&
                  (this.instance.direction = "up");
            }
          },
          {
            key: "addSpeed",
            value: function() {
              this.instance.delta.y != this.instance.scroll.y
                ? (this.instance.speed =
                    (this.instance.delta.y - this.instance.scroll.y) /
                    (Date.now() - this.timestamp))
                : (this.instance.speed = 0);
            }
          },
          {
            key: "initScrollBar",
            value: function() {
              (this.scrollbar = document.createElement("span")),
                (this.scrollbarThumb = document.createElement("span")),
                this.scrollbar.classList.add("".concat(this.scrollbarClass)),
                this.scrollbarThumb.classList.add(
                  "".concat(this.scrollbarClass, "_thumb")
                ),
                this.scrollbar.append(this.scrollbarThumb),
                document.body.append(this.scrollbar),
                (this.scrollbarHeight = this.scrollbar.getBoundingClientRect().height),
                (this.scrollbarThumb.style.height = "".concat(
                  (this.scrollbarHeight * this.scrollbarHeight) /
                    (this.instance.limit + this.scrollbarHeight),
                  "px"
                )),
                (this.scrollBarLimit =
                  this.scrollbarHeight -
                  this.scrollbarThumb.getBoundingClientRect().height),
                (this.getScrollBar = this.getScrollBar.bind(this)),
                (this.releaseScrollBar = this.releaseScrollBar.bind(this)),
                (this.moveScrollBar = this.moveScrollBar.bind(this)),
                this.scrollbarThumb.addEventListener(
                  "mousedown",
                  this.getScrollBar
                ),
                window.addEventListener("mouseup", this.releaseScrollBar),
                window.addEventListener("mousemove", this.moveScrollBar);
            }
          },
          {
            key: "reinitScrollBar",
            value: function() {
              (this.scrollbarHeight = this.scrollbar.getBoundingClientRect().height),
                (this.scrollbarThumb.style.height = "".concat(
                  (this.scrollbarHeight * this.scrollbarHeight) /
                    this.instance.limit,
                  "px"
                )),
                (this.scrollBarLimit =
                  this.scrollbarHeight -
                  this.scrollbarThumb.getBoundingClientRect().height);
            }
          },
          {
            key: "destroyScrollBar",
            value: function() {
              this.scrollbarThumb.removeEventListener(
                "mousedown",
                this.getScrollBar
              ),
                window.removeEventListener("mouseup", this.releaseScrollBar),
                window.removeEventListener("mousemove", this.moveScrollBar),
                this.scrollbar.remove();
            }
          },
          {
            key: "getScrollBar",
            value: function(t) {
              (this.isDraggingScrollbar = !0),
                this.checkScroll(),
                this.html.classList.remove(this.scrollingClass),
                this.html.classList.add(this.draggingClass);
            }
          },
          {
            key: "releaseScrollBar",
            value: function(t) {
              (this.isDraggingScrollbar = !1),
                this.html.classList.add(this.scrollingClass),
                this.html.classList.remove(this.draggingClass);
            }
          },
          {
            key: "moveScrollBar",
            value: function(e) {
              var i = this;
              !this.isTicking &&
                this.isDraggingScrollbar &&
                (requestAnimationFrame(function() {
                  var t =
                    (((100 * e.clientY) / i.scrollbarHeight) *
                      i.instance.limit) /
                    100;
                  0 < t && t < i.instance.limit && (i.instance.delta.y = t);
                }),
                (this.isTicking = !0)),
                (this.isTicking = !1);
            }
          },
          {
            key: "addElements",
            value: function() {
              var b = this;
              (this.els = []),
                (this.parallaxElements = []),
                this.sections.forEach(function(t, w) {
                  b.sections[w].el
                    .querySelectorAll("[data-".concat(b.name, "]"))
                    .forEach(function(t, e) {
                      var i,
                        s,
                        n = t.dataset[b.name + "Class"] || b.class,
                        l = t.dataset[b.name + "Repeat"],
                        o = t.dataset[b.name + "Call"],
                        a = t.dataset[b.name + "Position"],
                        r = t.dataset[b.name + "Delay"],
                        c = t.dataset[b.name + "Direction"],
                        h = "string" == typeof t.dataset[b.name + "Sticky"],
                        u =
                          !!t.dataset[b.name + "Speed"] &&
                          parseFloat(t.dataset[b.name + "Speed"]) / 10,
                        d =
                          "string" == typeof t.dataset[b.name + "Offset"] &&
                          t.dataset[b.name + "Offset"].split(","),
                        f = t.dataset[b.name + "Target"];
                      s =
                        void 0 !== f ? document.querySelector("".concat(f)) : t;
                      var p =
                          (i = b.sections[w].inView
                            ? s.getBoundingClientRect().top +
                              b.instance.scroll.y -
                              Y(s).y
                            : s.getBoundingClientRect().top -
                              Y(b.sections[w].el).y -
                              Y(s).y) + s.offsetHeight,
                        y = (p - i) / 2 + i;
                      if (h) {
                        var m = t.getBoundingClientRect().top - i;
                        y =
                          ((p =
                            (i += window.innerHeight) +
                            s.offsetHeight -
                            window.innerHeight -
                            t.offsetHeight -
                            m) -
                            i) /
                            2 +
                          i;
                      }
                      l = "false" != l && (null != l || b.repeat);
                      var v = [0, 0];
                      if (d)
                        for (e = 0; e < d.length; e++)
                          d[e].includes("%")
                            ? (v[e] = parseInt(
                                (d[e].replace("%", "") * b.windowHeight) / 100
                              ))
                            : (v[e] = parseInt(d[e]));
                      var g = {
                        el: t,
                        id: e,
                        class: n,
                        top: i + v[0],
                        middle: y,
                        bottom: p - v[1],
                        offset: d,
                        repeat: l,
                        inView: !1,
                        call: o,
                        speed: u,
                        delay: r,
                        position: a,
                        target: s,
                        direction: c,
                        sticky: h
                      };
                      b.els.push(g),
                        (!1 !== u || h) && b.parallaxElements.push(g);
                    });
                });
            }
          },
          {
            key: "addSections",
            value: function() {
              var a = this;
              this.sections = [];
              var t = this.el.querySelectorAll(
                "[data-".concat(this.name, "-section]")
              );
              0 === t.length && (t = [this.el]),
                t.forEach(function(t, e) {
                  var i =
                      t.getBoundingClientRect().top -
                      1.5 * window.innerHeight -
                      Y(t).y,
                    s =
                      i +
                      t.getBoundingClientRect().height +
                      2 * window.innerHeight,
                    n = "string" == typeof t.dataset[a.name + "Persistent"],
                    l = !1;
                  a.instance.scroll.y >= i &&
                    a.instance.scroll.y <= s &&
                    (l = !0);
                  var o = {
                    el: t,
                    offset: i,
                    limit: s,
                    inView: l,
                    persistent: n
                  };
                  a.sections[e] = o;
                });
            }
          },
          {
            key: "transform",
            value: function(t, e, i, s) {
              var n;
              if (s) {
                var l = Y(t),
                  o = P(l.x, e, s),
                  a = P(l.y, i, s);
                n = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,"
                  .concat(o, ",")
                  .concat(a, ",0,1)");
              } else
                n = "matrix3d(1,0,0.00,0,0.00,1,0.00,0,0,0,1,0,"
                  .concat(e, ",")
                  .concat(i, ",0,1)");
              (t.style.webkitTransform = n),
                (t.style.msTransform = n),
                (t.style.transform = n);
            }
          },
          {
            key: "transformElements",
            value: function(s) {
              var n = this,
                l = this.instance.scroll.y + this.windowHeight,
                o = this.instance.scroll.y + this.windowMiddle;
              this.parallaxElements.forEach(function(t, e) {
                var i = !1;
                if ((s && (i = 0), t.inView))
                  switch (t.position) {
                    case "top":
                      i = n.instance.scroll.y * -t.speed;
                      break;
                    case "elementTop":
                      i = (l - t.top) * -t.speed;
                      break;
                    case "bottom":
                      i = (n.instance.limit - l + n.windowHeight) * t.speed;
                      break;
                    default:
                      i = (o - t.middle) * -t.speed;
                  }
                t.sticky &&
                  (i = t.inView
                    ? n.instance.scroll.y - t.top + window.innerHeight
                    : n.instance.scroll.y < t.top - window.innerHeight &&
                      n.instance.scroll.y < t.top - window.innerHeight / 2
                    ? 0
                    : n.instance.scroll.y > t.bottom &&
                      n.instance.scroll.y > t.bottom + 100 &&
                      t.bottom - t.top + window.innerHeight),
                  !1 !== i &&
                    ("horizontal" === t.direction
                      ? n.transform(t.el, i, 0, !s && t.delay)
                      : n.transform(t.el, 0, i, !s && t.delay));
              });
            }
          },
          {
            key: "scrollTo",
            value: function(t, e) {
              var i,
                s = this,
                n = e ? parseInt(e) : 0;
              if (
                ("string" == typeof t
                  ? "top" === t
                    ? (n = 0)
                    : "bottom" === t
                    ? (n = this.instance.limit)
                    : (i = document.querySelectorAll(t)[0])
                  : t.target || (i = t),
                i)
              ) {
                var l = i.getBoundingClientRect().top + this.instance.scroll.y,
                  o = (function(t) {
                    for (var e = []; t && t !== document; t = t.parentNode)
                      e.push(t);
                    return e;
                  })(i).find(function(e) {
                    return s.sections.find(function(t) {
                      return t.el == e;
                    });
                  }),
                  a = 0;
                o && (a = Y(o).y), (n = l + n - a);
              }
              (n -= this.instance.scroll.y),
                (this.instance.delta.y = Math.min(n, this.instance.limit)),
                (this.inertiaRatio = Math.min(
                  4e3 /
                    Math.abs(this.instance.delta.y - this.instance.scroll.y),
                  0.8
                )),
                (this.isScrolling = !0),
                this.checkScroll(),
                this.html.classList.add(this.scrollingClass);
            }
          },
          {
            key: "update",
            value: function() {
              this.setScrollLimit(),
                this.addSections(),
                this.addElements(),
                this.detectElements(),
                this.updateScroll(),
                this.transformElements(!0),
                this.reinitScrollBar();
            }
          },
          {
            key: "startScroll",
            value: function() {
              this.stop = !1;
            }
          },
          {
            key: "stopScroll",
            value: function() {
              this.stop = !0;
            }
          },
          {
            key: "setScroll",
            value: function(t, e) {
              this.instance = { scroll: { x: t, y: e }, delta: { x: t, y: e } };
            }
          },
          {
            key: "destroy",
            value: function() {
              h(o(n.prototype), "destroy", this).call(this),
                this.stopScrolling(),
                this.html.classList.remove(this.smoothClass),
                this.vs.destroy(),
                this.destroyScrollBar(),
                window.removeEventListener("keydown", this.checkKey, !1);
            }
          }
        ]),
        n
      );
    })(),
    z = (function() {
      function e() {
        var t =
          0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {};
        s(this, e), (this.options = t), Object.assign(this, u, t), this.init();
      }
      return (
        l(e, [
          {
            key: "init",
            value: function() {
              this.smoothMobile ||
                (this.isMobile =
                  /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                  ) ||
                  ("MacIntel" === navigator.platform &&
                    1 < navigator.maxTouchPoints)),
                !0 !== this.smooth || this.isMobile
                  ? (this.scroll = new t(this.options))
                  : (this.scroll = new F(this.options)),
                this.scroll.init(),
                window.location.hash &&
                  this.scroll.scrollTo(window.location.hash);
            }
          },
          {
            key: "update",
            value: function() {
              this.scroll.update();
            }
          },
          {
            key: "start",
            value: function() {
              this.scroll.startScroll();
            }
          },
          {
            key: "stop",
            value: function() {
              this.scroll.stopScroll();
            }
          },
          {
            key: "scrollTo",
            value: function(t, e) {
              this.scroll.scrollTo(t, e);
            }
          },
          {
            key: "setScroll",
            value: function(t, e) {
              this.scroll.setScroll(t, e);
            }
          },
          {
            key: "on",
            value: function(t, e) {
              this.scroll.setEvents(t, e);
            }
          },
          {
            key: "off",
            value: function(t, e) {
              this.scroll.unsetEvents(t, e);
            }
          },
          {
            key: "destroy",
            value: function() {
              this.scroll.destroy();
            }
          }
        ]),
        e
      );
    })();
  document.documentElement.classList.add("is-loaded"),
    document.documentElement.classList.remove("is-loading"),
    setTimeout(function() {
      document.documentElement.classList.add("is-ready");
    }, 300),
    setTimeout(function() {
      var i = new z({
          el: document.querySelector("#js-scroll"),
          smooth: !0,
          getSpeed: !0,
          getDirection: !0,
          useKeyboard: !0
        }),
        n = [],
        l = [];
      i.on("scroll", function(t) {
        var e = (360 * t.scroll.y) / t.limit;
        (i.el.style.backgroundColor = "hsl(".concat(e, ", 11%, 81%)")),
          n.forEach(function(t) {
            t.el.style.backgroundColor = "hsl(".concat(e, ", 11%, 81%)");
          }),
          l.forEach(function(t) {
            t.el.style.color = "hsl(".concat(e, ", 11%, 81%)");
          }),
          document.documentElement.setAttribute("data-direction", t.direction);
      }),
        i.on("call", function(t, e, i) {
          if ("dynamicBackground" === t)
            if ("enter" === e) n.push({ id: i.id, el: i.el });
            else
              for (var s = 0; s < n.length; s++)
                i.id === n[s].id && n.splice(s, 1);
          else if ("dynamicColor" === t)
            if ("enter" === e) l.push({ id: i.id, el: i.el });
            else
              for (s = 0; s < l.length; s++) i.id === l[s].id && l.splice(s, 1);
        });
    }, 1e3);
})();


    const letters = document.querySelectorAll('.c-project-block_title.project-title span[data-scroll]');


    letters.forEach((letter, index) => {
        letter.addEventListener('click', () => {
      
            window.location.href = 'https://summmer-zi.github.io/summer/scroll/index.html'; 
        });
    });

