var dsp_graph = (function() {
  const AXIS_COLOR = 0xdddddd;
  const TICK_SIZE = 5;
  const TICK_STEP = 26;
  const X_AXIS_START = 15;
  const X_AXIS_MID = 275;
  const X_AXIS_END = 535;
  const Y_AXIS_START = 20;
  const Y_AXIS_MID = 150;
  const Y_AXIS_END = 280;

  function drawXAxis(graphics, start, end, y) {
      graphics.moveTo(start, y);
      graphics.lineTo(end, y);

      for(var x = start+TICK_STEP; x <= end; x += TICK_STEP) {
        graphics.moveTo(x, y-TICK_SIZE);
        graphics.lineTo(x, y);
      }
      graphics.moveTo(X_AXIS_MID, y - 2*TICK_SIZE);
      graphics.lineTo(X_AXIS_MID, y);
  }

  function drawYAxis(graphics, start, end, x, offset) {
      graphics.moveTo(x, start);
      graphics.lineTo(x, end);

      for(var y = start+offset; y <= end; y += TICK_STEP) {
        graphics.moveTo(x, y);
        graphics.lineTo(x+TICK_SIZE, y);
      }
  }

  const LABEL_STYLE = { font: '10px Arial', fill: '#eeeeee' };
  const AXIS_TITLE_STYLE = { font: 'italic 14px Arial', fill: '#eeeeee' };
  const X_AXIS_TITLE_X = 540;
  const X_AXIS_TITLE_Y_LOW = 272;
  const X_AXIS_TITLE_Y_MID = 142;
  const X_AXIS_TITLE_Y_HIGH = 77;
  const X_AXIS_LABEL_X = 273;
  const X_AXIS_LABEL_Y_MID = 152;
  const X_AXIS_LABEL_Y_HIGH = 87;
  const Y_AXIS_TITLE_X = 10;
  const Y_AXIS_TITLE_Y = 2;

  function drawXTitle(stage, y) {
    var x_text = new PIXI.Text('t', AXIS_TITLE_STYLE);
    x_text.x = X_AXIS_TITLE_X;
    x_text.y = y;
    stage.addChild(x_text);
  }

  function drawXLabel(stage, y) {
    var xLabel = new PIXI.Text('1', { font: '14px Arial', fill: '#eeeeee' });
    xLabel.x = X_AXIS_LABEL_X;
    xLabel.y = y;
    stage.addChild(xLabel);
  }

  function drawXLabels(stage, labels) {
    const STEP = 2*TICK_STEP;
    var x = STEP + 3;
    labels.forEach(function(label) {
      var text = new PIXI.Text(label, LABEL_STYLE);
      text.x = x;
      text.y = Y_AXIS_END + 2;
      stage.addChild(text);
      x += STEP;
    });
  }

  function drawYTitle(stage) {
    var y_text = new PIXI.Text('f(t)', AXIS_TITLE_STYLE);
    y_text.x = Y_AXIS_TITLE_X;
    y_text.y = Y_AXIS_TITLE_Y;
    stage.addChild(y_text);
  }

  function drawYLabels(stage, labels) {
    const STEP = 2*TICK_STEP;
    var y = Y_AXIS_END - STEP - 5;
    labels.forEach(function(label) {
      var text = new PIXI.Text(label, LABEL_STYLE);
      text.x = 2;
      text.y = y;
      stage.addChild(text);
      y -= STEP;
    });
  }

  return {
    initCanvas: function(id, eventHandler) {
      var canvas = $(id);
      var renderer = PIXI.autoDetectRenderer(canvas.width(), canvas.height(), { antialias: true });
      canvas.append(renderer.view);
      canvas.on('click', eventHandler);
      canvas.on('touchend', eventHandler);
      $('canvas').css('border-radius', 5);

      return renderer;
    },

    drawPositiveAxis: function(stage, x_labels, y_labels) {
      var graphics = new PIXI.Graphics();
      graphics.lineStyle(1, AXIS_COLOR, 1);
      drawXAxis(graphics, X_AXIS_START, X_AXIS_END, Y_AXIS_END);
      drawYAxis(graphics, Y_AXIS_START, Y_AXIS_END, X_AXIS_START, 0);
      stage.addChild(graphics);

      if (typeof x_labels != 'undefined') {
        drawXLabels(stage, x_labels);
      } else {
        drawXTitle(stage, X_AXIS_TITLE_Y_LOW);
      }

      if (typeof y_labels != 'undefined') {
        drawYLabels(stage, y_labels);
      } else {
        drawYTitle(stage);
      }
    },

    drawZeroAxis: function(stage) {
      var graphics = new PIXI.Graphics();
      graphics.lineStyle(1, AXIS_COLOR, 1);
      drawXAxis(graphics, X_AXIS_START, X_AXIS_END, Y_AXIS_MID);
      drawYAxis(graphics, Y_AXIS_START, Y_AXIS_END, X_AXIS_START, 0);
      stage.addChild(graphics);

      drawXTitle(stage, X_AXIS_TITLE_Y_MID);
      drawYTitle(stage);
      drawXLabel(stage, X_AXIS_LABEL_Y_MID);
    },

    drawDualAxis: function(stage) {
      var graphics = new PIXI.Graphics();
      graphics.lineStyle(1, AXIS_COLOR, 1);
      drawXAxis(graphics, X_AXIS_START, X_AXIS_END, 85);
      drawYAxis(graphics, Y_AXIS_START, Y_AXIS_MID, X_AXIS_START, TICK_STEP/2);

      drawXAxis(graphics, X_AXIS_START, X_AXIS_END, 228);
      drawYAxis(graphics, 176, Y_AXIS_END, X_AXIS_START, 0);
      stage.addChild(graphics);

      drawXTitle(stage, X_AXIS_TITLE_Y_HIGH);
      drawYTitle(stage);
      drawXLabel(stage, X_AXIS_LABEL_Y_HIGH);
    },

    drawDualPositiveAxis: function(stage) {
      var graphics = new PIXI.Graphics();
      graphics.lineStyle(1, AXIS_COLOR, 1);
      drawXAxis(graphics, X_AXIS_START, X_AXIS_END, 85);
      drawYAxis(graphics, Y_AXIS_START, Y_AXIS_MID, X_AXIS_START, TICK_STEP/2);

      drawXAxis(graphics, X_AXIS_START, X_AXIS_END, Y_AXIS_END);
      drawYAxis(graphics, 176, Y_AXIS_END, X_AXIS_START, 0);
      stage.addChild(graphics);

      drawXTitle(stage, X_AXIS_TITLE_Y_HIGH);
      drawYTitle(stage);
      drawXLabel(stage, X_AXIS_LABEL_Y_HIGH);
    },

    drawSine: function(sinewave, amplitude, offset, freq, phase, start, end) {
      start = typeof start != 'undefined' ? start : 0
      end = typeof end != 'undefined' ? end : 520
      var step = freq > 0.1 ? 12/freq : (freq < -0.1 ? 12/-freq : 104);
      var y = amplitude*Math.sin((start*freq + phase)/260.0*Math.PI) + offset;
      sinewave.moveTo(start, -y);
      for (var x = start; x < end; x+=step) {
        y = amplitude*Math.sin((x*freq + phase)/260.0*Math.PI) + offset;
        sinewave.lineTo(x, -y);
        sinewave.moveTo(x, -y);
      }
      y = amplitude*Math.sin((end*freq + phase)/260.0*Math.PI) + offset;
      sinewave.lineTo(end, -y);
    }
  }
}());
