!(function (e) {
  "use strict";

  //enable tooltips
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
