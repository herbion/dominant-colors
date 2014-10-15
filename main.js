var stubImage = 'http://cs623623.vk.me/v623623213/20d8/UvsBvGjv0To.jpg';
var quality = 16;
var colorCount = 27;

document.addEventListener('DOMContentLoaded', function () {
  var $ = document.querySelector.bind(document),
    c = new ColorThief(),
    container = document.querySelector('#colors'),
    image = document.images[0];

  var load = function (src, callback) {
    var img = new Image(),
      canvas = document.createElement("canvas"),
      ctx = canvas.getContext("2d");

    img.crossOrigin = "Anonymous";
    image.classList.add('loading');

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      document.images[0].src = canvas.toDataURL("image/png");
      image.classList.remove('loading');
      callback();
    };
    img.src = src;
  };

  var palette = function () {
    colorCount = document.body.clientWidth / 37;
    $('#colors').classList.remove('show');
    var colors = c.getPalette(image, colorCount, quality);
    container.innerHTML = '';
    var makeBlock = function (color, value) {
      var el = document.createElement('div');
      el.classList.add('box');
      el.style.background = 'rgb(' + color.join(',') + ')';
      el.innerHTML = '<span>' + pusher.color('rgb', color).hex3() + '</span>';
      return el;
    };

    var scalar = function (array) {
      return pusher.color('rgb', array).value();
    };

    colors
      .sort(function (a, b) {
        return scalar(b) - scalar(a);
      })
      .forEach(function (c) {
        var block = makeBlock(c, scalar(c));
        container.appendChild(block);
      });
    //    setTimeout(function() {
    //      $('#colors').classList.add('show');
    //    }, 1);
    $('input').style.width = image.width - 50 + 'px';
  };
  $('#controls button').addEventListener('click', function () {
    load($('#controls input').value, palette);
  });
  $('#controls input').addEventListener('keypress', function (e) {
    e.keyCode === 13 && load($('#controls input').value, palette);
  });

  window.onresize = palette;
  load(stubImage, palette);
});