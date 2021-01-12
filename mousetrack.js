!(function (e) {
    var t = {};
    function n(o) {
        if (t[o]) return t[o].exports;
        var i = (t[o] = { i: o, l: !1, exports: {} });
        return e[o].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
    }
    (n.m = e),
        (n.c = t),
        (n.d = function (e, t, o) {
            n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
        }),
        (n.r = function (e) {
            "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
        }),
        (n.t = function (e, t) {
            if ((1 & t && (e = n(e)), 8 & t)) return e;
            if (4 & t && "object" == typeof e && e && e.__esModule) return e;
            var o = Object.create(null);
            if ((n.r(o), Object.defineProperty(o, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
                for (var i in e)
                    n.d(
                        o,
                        i,
                        function (t) {
                            return e[t];
                        }.bind(null, i)
                    );
            return o;
        }),
        (n.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                          return e.default;
                      }
                    : function () {
                          return e;
                      };
            return n.d(t, "a", t), t;
        }),
        (n.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (n.p = ""),
        n((n.s = 0));
})([
    function (e, t, n) {
        "use strict";
        n.r(t), Parse.initialize("YOUR_APP_ID", "YOUR_MASTERKEY"), (Parse.serverURL = "YOUR_SERVER_SERVER");
        var o = {
            pool: [],
            poolsize: 199,
            static: {},
            init: function () {
                o.getBrowser(), o.getOS();
            },
            accumulation(e) {
                let t = o.defAttributes(e);
                for (let n in e) "object" != typeof e[n] && (t[n] = e[n]);
                o.pool.push(new Parse.Object("mousetrack", t)), o.pool.length >= o.poolsize && (o.submitData(), (o.pool = []));
            },
            submitData() {
                Parse.Object.saveAll(o.pool)
                    .then(function () {
                        console.log("Success");
                    })
                    .catch(function (e) {
                        alert("Error saving test object!" + e.message);
                    });
            },
            defAttributes(e) {
                let t = {};
                return (
                    (t.d_path = o.getElementPathByEvent(e)),
                    (t.d_userid = window.localStorage.test_id || "-1"),
                    (t.d_group = window.localStorage.test_group || "-1"),
                    (t.d_osVersion = o.static.OS),
                    (t.d_browser = o.static.Browser || "unknown"),
                    (t.d_timestamp = new Date().getTime()),
                    (t.d_url = window.location.href),
                    (t.d_clientWidth = e.srcElement.clientWidth),
                    (t.d_clientHeight = e.srcElement.clientHeight),
                    t
                );
            },
            getElementPathByEvent: function (e) {
                let t = e.target;
                if (!t || null == t.classList) return "";
                let n = "," + (t.tagName || "") + "#" + (t.id || "") + "." + t.classList.value.replace(/ /g, ".");
                for (; null != t.parentElement; ) n = "," + (t = t.parentElement).tagName + "#" + t.id + "." + t.classList.value.replace(/ /g, ".") + n;
                return n.slice(1);
            },
            getTouchable: function () {
                o.static.hasTouch = "ontouchstart" in window || (window.DocumentTouch && document instanceof window.DocumentTouch) || navigator.maxTouchPoints > 0 || window.navigator.msMaxTouchPoints > 0;
            },
            getOS: function () {
                o.static.OS = navigator.appVersion.match(/\(.+?\)/)[0].replace(/[\(\)]/g, "");
            },
            getBrowser: function () {
                var e,
                    t = navigator.userAgent,
                    n = t.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                return /trident/i.test(n[1])
                    ? "IE " + ((e = /\brv[ :]+(\d+)/g.exec(t) || [])[1] || "")
                    : "Chrome" === n[1] && null != (e = t.match(/\b(OPR|Edge)\/(\d+)/))
                    ? e.slice(1).join(" ").replace("OPR", "Opera")
                    : ((n = n[2] ? [n[1], n[2]] : [navigator.appName, navigator.appVersion, "-?"]), null != (e = t.match(/version\/(\d+)/i)) && n.splice(1, 1, e[1]), void (o.static.Browser = n.join(" ")));
            },
        };
        o.init(),
            n.d(t, "mousetrack", function () {
                return i;
            });
        var i = {
            config: {
                ele: null,
                mouseEvents: ["mousemove", "mousedown", "mouseleave", "mouseenter", "mouseup", "mouseover", "mouseout", "mousewheel", "select", "wheel", "contextmenu"],
                windowEvent: ["blur", "focus"],
                documentEvent: ["keypress", "paste", "copy", "cut"],
            },
            init() {
                (i.config.ele = document.getElementsByTagName("html")[0]), i.setWindowEvent(), i.setDocumentEvent(), i.setMouseEvent();
            },
            throttle(e, t) {
                var n = !1;
                return function () {
                    n ||
                        (e.call(),
                        (n = !0),
                        setTimeout(function () {
                            n = !1;
                        }, t));
                };
            },
            setWindowEvent() {
                i.config.windowEvent.forEach((e) => {
                    window.addEventListener(e, function (e) {
                        o.accumulation(e);
                    });
                }),
                    (window.onbeforeunload = function (e) {
                        o.accumulation(e), o.submitData();
                    });
            },
            setDocumentEvent() {
                i.config.documentEvent.forEach((e) => {
                    document.addEventListener(e, function (e) {
                        o.accumulation(e);
                    });
                });
            },
            setMouseEvent(e) {
                e || (e = window),
                    i.config.mouseEvents.forEach((t) => {
                        "string" == typeof t
                            ? e.addEventListener(t, function (e) {
                                  o.accumulation(e);
                              })
                            : e.addEventListener(
                                  t,
                                  i.throttle(function (e) {
                                      o.accumulation(e);
                                  }, t[1])
                              );
                    });
            },
        };
        i.init();
    },
]);
