(function (e) {
  ("use strict");

  // Global vars
  var blossomState = true;

  // Enable tooltips
  $(function () {
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
  });

  // Typed text animation
  var typed = new Typed("#typed-text", {
    strings: $("#typed-strings").text().split(", "),
    typeSpeed: 100,
    backSpeed: 20,
    smartBackspace: false,
    loop: true,
  });

  // Function to reset the progress bars since animation only happen on value change
  function resetSkills() {
    $("#skills .progress-bar").each(function () {
      $(this).css("width", "0%");
    });
  }

  function toggleBlossom() {
    blossomState = !blossomState;
    $("#blossom-toggle").toggleClass("toggle-on toggle-off");
  }
  $("#blossom-toggle").on("click", toggleBlossom);

  // Blossom animation adapted from confetti code
  // adapted and rewritten from https://codepen.io/linrock/pen/nMadjQ
  (function (canvas) {
    var COLORS = [
        [255, 220, 220],
        [255, 167, 166],
        [242, 84, 119],
        [236, 39, 95],
        [236, 39, 95],
      ],
      NUM_PETAL = 300,
      PI_2 = 2 * Math.PI,
      context = canvas.getContext("2d"),
      curosrX = 0.75,
      aboutHeight = 1000,
      mobile = false,
      petalMobileSize = [1, 4],
      petalWebSize = [4, 8],
      numOfPetals,
      Petal,
      petal;

    window.w = 0;
    window.h = 0;

    $(window).on("load resize", function () {
      canvas.width = canvas.height = 0; //reset to 0 first since it can be resized to smaller dimension
      aboutHeight = $("#about").height(); //local var to track the height of #about section, calling $(...) every update is too slow
      window.w = canvas.width = $(document).width();
      mobile = window.w < 992;
      return (window.h = canvas.height = $(document).height());
    });

    function range(a, b) {
      return (b - a) * Math.random() + a;
    }

    function drawCircle(x, y, r, style) {
      context.beginPath();
      context.arc(x, y, r, 0, PI_2, false);
      context.fillStyle = style;
      return context.fill();
    }

    $(document).on("mousemove", function (e) {
      return (curosrX = e.pageX / w);
    });

    function updatePetalSize(param) {
      //size of circles depends on mobile state
      param.mobile = mobile;
      if (mobile) param.r = ~~range(petalMobileSize[0], petalMobileSize[1]);
      else param.r = ~~range(petalWebSize[0], petalWebSize[1]);
    }

    Petal = (function () {
      function Confetti() {
        this.style = COLORS[~~range(0, 5)];
        this.rgb =
          "rgba(" + this.style[0] + "," + this.style[1] + "," + this.style[2];
        updatePetalSize(this);
        this.r2 = 2 * this.r;
        this.replace();
      }

      Confetti.prototype.replace = function () {
        if (this.mobile != mobile) updatePetalSize(this);
        this.opacity = 0;
        this.dop = 0.02 / range(2, 5); //opacity rate
        this.x = range(-this.r2, w - this.r2); //x spread
        this.y = range(-20, h - this.r2); //y spread
        this.xmax = w - this.r;
        this.ymax = h - this.r;
        this.vx = (range(0, 2) - 6 + 4 * curosrX) / 2; //x speed
        return (this.vy = this.r / 5 + range(0, 1)); //y speed
      };

      Confetti.prototype.draw = function () {
        var _ref;
        this.x += this.vx;
        this.y += this.vy;
        this.opacity += this.dop;

        var maxOpacity = Math.max(
          0.2,
          Math.min(1, aboutHeight / (this.y * 3 + 1))
        ); //scales max opacity with y position
        if (this.opacity > maxOpacity) {
          this.opacity = maxOpacity;
          this.dop *= -1;
        }
        if ((this.opacity < 0 || this.y > this.ymax) && blossomState) {
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

    petal = (function () {
      var _i, _results;
      _results = [];
      for (
        numOfPetals = _i = 1;
        1 <= NUM_PETAL ? _i <= NUM_PETAL : _i >= NUM_PETAL;
        numOfPetals = 1 <= NUM_PETAL ? ++_i : --_i
      ) {
        _results.push(new Petal());
      }
      return _results;
    })();

    window.step = function () {
      setTimeout(step, 1000 / 60); //callback to self for endless animation, 1000/60 is 60fps
      var c, _i, _len, _results;
      context.clearRect(0, 0, w, h);
      _results = [];
      for (_i = 0, _len = petal.length; _i < _len; _i++) {
        c = petal[_i];
        _results.push(c.draw());
      }
      return _results;
    };
    step(); //start the first step
  }.call(this, document.getElementById("blossom")));

  // Waypoint animations
  $(window).on("load", function () {
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
