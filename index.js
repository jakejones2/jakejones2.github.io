// mini-project scroll buttons

$("#next").click(() => {
  $("#portfolio").css("scroll-snap-type", "none");
  let scrollDistance = $("#portfolio").scrollLeft();
  if (scrollDistance >= $("#portfolio").width() * 4.5) {
    $("#portfolio").animate({ scrollLeft: 0 }, 500);
  } else {
    scrollDistance += $("#portfolio").width();
    $("#portfolio").animate({ scrollLeft: scrollDistance }, 500);
  }
  setTimeout(() => {
    $("#portfolio").css("scroll-snap-type", "x mandatory");
  }, 502);
});

$("#previous").click(() => {
  let scrollDistance = $("#portfolio").scrollLeft();
  $("#portfolio").css("scroll-snap-type", "none");
  if (scrollDistance < 10) {
    scrollDistance = $("#portfolio").width() * 4;
    $("#portfolio").animate({ scrollLeft: scrollDistance }, 500);
  } else {
    scrollDistance -= $("#portfolio").width();
    $("#portfolio").animate({ scrollLeft: scrollDistance }, 500);
  }
  setTimeout(() => {
    $("#portfolio").css("scroll-snap-type", "x mandatory");
  }, 502);
});

// auto scroll mini-projects

let autoScroll = setInterval(() => {
  $("#next").click();
}, 5000);

$("#portfolio, #previous, #next").mouseover(() => {
  clearInterval(autoScroll);
});

$("#portfolio, #previous, #next").mouseleave(() => {
  autoScroll = setInterval(() => {
    $("#next").click();
  }, 5000);
});

// animate stars

let level = 1;

function starMove(level) {
  $(".star").each((i, el) => {
    const x = Math.round(10 * level - Math.random() * 20 * level);
    const y = Math.round(10 * level - Math.random() * 20 * level);
    const vector = { top: `+=${y}px`, left: `+=${x}px` };
    setTimeout(() => {
      $(el).animate(vector, 1000 - (i * 10) / level);
    }, i * 100);
  });
}

starMove(level);
let meanderingStars = setInterval(() => {
  starMove(level);
}, 1000);

$(".star").each((i, el) => {
  $(el).hover(
    () => {
      $(el).hide();
      level += 2;
      $("#stars-caught").html((i, content) => {
        const caught = +content + 1;
        if (caught > 6 && $(window).width() > 500) {
          $("#game-hint").show();
        }
        if (caught === 10) {
          $("#winner").show();
          $("#game-hint").hide();
        }
        return caught;
      });
      clearInterval(meanderingStars);
      starMove(level);
      meanderingStars = setInterval(() => {
        starMove(level);
      }, 1000);
    },
    () => {}
  );
});

// deactivate stars

$("#stars-off").change(() => {
  if ($("#stars-off").is(":checked")) {
    clearInterval(meanderingStars);
    $("#game-text, .switch").fadeTo(2000, 0, () => {
      $(".switch").hide();
    });
    $(".star").fadeTo(1000, 0, (el) => {
      $(el).hide();
    });
  }
});
