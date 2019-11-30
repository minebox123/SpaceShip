!(function(e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var i = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(i.exports, i, i.exports, n), (i.l = !0), i.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var i in e)
          n.d(
            r,
            i,
            function(t) {
              return e[t];
            }.bind(null, i)
          );
      return r;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, "a", t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 0));
})([
  function(e, t, n) {
    "use strict";
    n.r(t);
    var r = document.querySelector(".canvas"),
      i = r.getContext("2d");
    function o(e, t) {
      for (var n = 0; n < t.length; n++) {
        var r = t[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r);
      }
    }
    (r.height = window.innerHeight), (r.width = window.innerWidth);
    var a = new ((function() {
      function e() {
        !(function(e, t) {
          if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        })(this, e),
          (this.x = r.width / 2),
          (this.y = r.height / 2),
          (this.img = "./src/images/ship.svg"),
          (this.height = 40),
          (this.width = 40),
          (this.vx = 1),
          (this.vy = 5);
      }
      var t, n, a;
      return (
        (t = e),
        (n = [
          {
            key: "draw",
            value: function() {
              i.fillRect(this.x, this.y, this.width, this.height);
            }
          },
          {
            key: "move",
            value: function() {
              this.draw(),
                document.addEventListener("keypress", function(e) {
                  "ArrowUp" === e.key && console.log("aaaa");
                });
            }
          }
        ]) && o(t.prototype, n),
        a && o(t, a),
        e
      );
    })())();
    !(function e() {
      requestAnimationFrame(e), i.clearRect(0, 0, r.width, r.height), a.move();
    })(),
      document.addEventListener("keypress", function(e) {
        37 === e.keyCode && (a.y -= a.vy);
      }),
      window.addEventListener("keypress", function(e) {
        37 === e.keyCode && console.log("aaaaaaa");
      });
  }
]);
