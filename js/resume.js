(function (e) {
  "use strict";

  // Enable tooltips
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  // Typed text animation
  var typed = new Typed("#typed-text", {
    strings: $("#typed-strings").text().split(", "),
    typeSpeed: 100,
    backSpeed: 20,
    smartBackspace: false,
    loop: true,
  });

  function resetSkills() {
    $("#skills .progress-bar").each(function () {
      $(this).css("width", "0%");
    });
  }

  // blossom animation adapted from confetti code
  (function (canvas) {
    var COLORS,
      Confetti,
      NUM_CONFETTI,
      PI_2,
      confetti,
      context,
      i,
      curosrX = 0.5;

    NUM_CONFETTI = 350;

    COLORS = [
      [255, 220, 220],
      [255, 167, 166],
      [242, 84, 119],
      [236, 39, 95],
      [236, 39, 95],
    ];

    PI_2 = 2 * Math.PI;
    context = canvas.getContext("2d");
    window.w = 0;
    window.h = 0;

    function resizeCanvas() {
      window.w = canvas.width = $(document).width();
      return (window.h = canvas.height = $(document).height());
    }
    $(window).on("load resize", resizeCanvas);

    function range(a, b) {
      return (b - a) * Math.random() + a;
    }

    function drawCircle(x, y, r, style) {
      context.beginPath();
      context.arc(x, y, r, 0, PI_2, false);
      context.fillStyle = style;
      return context.fill();
    }

    $(document).mousemove(function (e) {
      return (curosrX = e.pageX / w);
    });

    Confetti = (function () {
      function Confetti() {
        this.style = COLORS[~~range(0, 5)];
        this.rgb =
          "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
        this.r = ~~range(3, 7);//size of circles
        this.r2 = 2 * this.r;
        this.replace();
      }

      Confetti.prototype.replace = function () {
        this.opacity = 0;
        this.dop = 0.02 / range(1, 4);//blinking speed
        this.x = range(-this.r2, w - this.r2);//x spread
        this.y = range(-20, h - this.r2);//y spread
        this.xmax = w - this.r;
        this.ymax = h - this.r;
        this.vx = range(0, 2) + 8 * curosrX - 5;//x speed
        return (this.vy = 1.5 * this.r + range(-1, 3));//y speed
      };

      Confetti.prototype.draw = function () {
        var _ref;
        this.x += this.vx;
        this.y += this.vy;
        this.opacity += this.dop;
        if (this.opacity > 1) {
          this.opacity = 1;
          this.dop *= -1;
        }
        if (this.opacity < 0 || this.y > this.ymax) {
          this.replace();
        }
        if (!(0 < (_ref = this.x) && _ref < this.xmax)) {
          this.x = (this.x + this.xmax) % this.xmax;
        }
        return drawCircle(
          ~~this.x,
          ~~this.y,
          this.r,
          this.rgb + "," + this.opacity + ")"
        );
      };

      return Confetti;
    })();

    confetti = (function () {
      var _i, _results;
      _results = [];
      for (
        i = _i = 1;
        1 <= NUM_CONFETTI ? _i <= NUM_CONFETTI : _i >= NUM_CONFETTI;
        i = 1 <= NUM_CONFETTI ? ++_i : --_i
      ) {
        _results.push(new Confetti());
      }
      return _results;
    })();

    window.step = function () {
      setTimeout(step, 1000 / 60);//callback to self for endless animation
      var c, _i, _len, _results;
      context.clearRect(0, 0, w, h);
      _results = [];
      for (_i = 0, _len = confetti.length; _i < _len; _i++) {
        c = confetti[_i];
        _results.push(c.draw());
      }
      return _results;
    };
    step();//start the first step

  }.call(this, document.getElementById("blossom")));

  // Waypoint animations
  $(document).ready(function () {
    //for resetting values
    $("#about").waypoint(function () {}, { offset: "0%" });

    $("#experience").waypoint(function () {}, { offset: "0%" });

    $("#education").waypoint(
      function () {
        resetSkills();
      },
      { offset: "0%" }
    );

    $("#skills").waypoint(function () {}, { offset: "0%" });

    $("#interests").waypoint(function () {}, { offset: "0%" });

    // Skills progress bar
    $("#skills .progress-bar").each(function () {
      var bar = $(this);
      bar.waypoint(
        function () {
          //animation only triggers for value change, so reset is necessary when out of view-port
          bar.css("width", bar.attr("aria-valuenow") + "%");
        },
        { offset: "80%" }
      );
    });

    //text fade animation, not working properly yet
    $(document).scroll(function () {
      $(".fade-in").each(function () {
        var windowHeight = $(window).height();
        var scrollPercent;
        scrollPercent = window.scrollY / windowHeight;
        if (scrollPercent > 1 && scrollPercent < 2)
          scrollPercent = 1 - (scrollPercent % 1);
        if (scrollPercent < 0 || scrollPercent > 1) scrollPercent = 0;
        $(this).css("opacity", scrollPercent);
      });
    });
  }); //end of waypoint animations

  e('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var t = e(this.hash);
      if ((t = t.length ? t : e("[name=" + this.hash.slice(1) + "]")).length)
        return (
          e("html, body").animate(
            { scrollTop: t.offset().top },
            1e3,
            "easeInOutExpo"
          ),
          !1
        );
    }
  }),
    e(".js-scroll-trigger").click(function () {
      e(".navbar-collapse").collapse("hide");
    }),
    e("body").scrollspy({ target: "#sideNav" });
})(jQuery);
