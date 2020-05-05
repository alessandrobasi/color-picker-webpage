const RGB_MAX = 255;
var globalColor = {};

function getRandomArbitrary(min, max) {
  let fix = (x) => {
    if (x.length < 2) {
      x = "0" + x;
    }
    return x;
  };

  var R = Math.floor(Math.random() * (max - min) + min);
  var G = Math.floor(Math.random() * (max - min) + min);
  var B = Math.floor(Math.random() * (max - min) + min);

  globalColor["rgb"] = [R, G, B];
  globalColor["rgbTag"] = `rgb(${R},${G},${B});`;

  var R_hex = fix(R.toString(16));
  var G_hex = fix(G.toString(16));
  var B_hex = fix(B.toString(16));

  globalColor["hex"] = `#${R_hex}${G_hex}${B_hex}`;
}

async function changeColor(time = 500) {
  // get random color
  getRandomArbitrary(1, RGB_MAX);

  // set color
  $("body").animate(
    {
      backgroundColor: globalColor.hex,
    },
    { queue: false },
    time
  );

  // change text color
  if (
    (globalColor.rgb[0] + globalColor.rgb[1] + globalColor.rgb[2]) / 3 <=
    127
  ) {
    $("body").animate(
      {
        color: "white",
      },
      time
    );
  } else {
    $("body").animate(
      {
        color: "black",
      },
      time
    );
  }

  // show hex color
  $("#colorCode").text(globalColor.hex);
  // set text to be copied
  $(".btnYes").attr("data-clipboard-text", globalColor.hex);
}

$(document).ready(() => {
  // set background
  changeColor(0);

  // change background on button click
  $(".btnNo").click(() => {
    $.confetti.stop();
    changeColor();
  });

  // keep loaded clipboard event
  var clipboard = new ClipboardJS(".btnYes");
});

$(".btnYes").click(() => {
  $.confetti.restart();
  setTimeout(function () {
    $.confetti.stop();
  }, 400);
});


