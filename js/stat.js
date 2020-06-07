'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 50;
var CLOUD_GAP = 10;
var FONT_GAP = 21;
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 150;
var titleHeight = FONT_GAP * 4;
var FONT_STYLE = '16px PT Mono';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomSaturation = function () {
  return 10 + Math.floor((100 - 10) * Math.random());
};

var setColorForPlayerBar = function (player, ctx) {
  if (player === 'Вы') {
    ctx.fillStyle = 'rgb(255,0,0)';
  } else {
    var saturation = getRandomSaturation();
    ctx.fillStyle = 'hsl(220, ' + saturation + '%, 50%)';
  }
};

var setDefaultColor = function (ctx) {
  ctx.fillStyle = '#000';
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');
  setDefaultColor(ctx);
  var maxTime = getMaxElement(times);
  ctx.font = FONT_STYLE;
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP, CLOUD_Y + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP, CLOUD_Y + FONT_GAP * 2);

  for (var i = 0; i < players.length; i++) {
    var barHeight = (BAR_MAX_HEIGHT * times[i]) / maxTime;
    var x = CLOUD_X + GAP + (GAP + BAR_WIDTH) * i;
    ctx.fillText(Math.ceil(times[i]).toString(), x, CLOUD_Y + CLOUD_HEIGHT - barHeight - 2 * FONT_GAP);
    setColorForPlayerBar(players[i], ctx);
    ctx.fillRect(x, CLOUD_Y + BAR_MAX_HEIGHT + titleHeight, BAR_WIDTH, -barHeight);
    setDefaultColor(ctx);
    ctx.fillText(players[i], x, CLOUD_Y + BAR_MAX_HEIGHT + titleHeight + FONT_GAP);
  }
};
