var dsp_graph = (function() {
  const AXIS_COLOR = 0xdddddd;
  const TICK_SIZE = 5;
  const TICK_STEP = 26;
  const UNIT_FREQ = 10;
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

      stage.origin = {x: X_AXIS_START, y: Y_AXIS_END};
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

      stage.origin = {x: X_AXIS_START, y: Y_AXIS_MID};
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

    createCurve: function(stage) {
      var curve = new PIXI.Graphics();
      stage.addChild(curve);
      curve.setTransform(stage.origin.x, stage.origin.y, TICK_STEP, -TICK_STEP);
      return curve;
    },

    drawCurve: function(curve, color, points) {
      curve.lineStyle(2.0/TICK_STEP, color, 1);
      curve.moveTo(points.x[0], points.y[0]);
      for (var i = 1; i < points.x.length; i++) {
        curve.lineTo(points.x[i], points.y[i]);
      }
    },

    drawYPoints: function(curve, color, points) {
      curve.lineStyle(2.0/TICK_STEP, color, 1);
      var x = 0;
      var step = 20.0 / points.length;
      curve.moveTo(x, points[0]*2);
      points.forEach(function(y) {
        curve.lineTo(x, y*2);
        curve.moveTo(x, y*2);
        x += step;
      })
    },

    generateSine: function(amplitude, offset, freq, phase, start, end) {
      var step = Math.abs(freq) > 0.1 ? 0.5/Math.abs(freq) : 5;
      var points = {x:[],y:[]};
      for (var x = start; x <= end; x+=step) {
        points.x.push(x);
        points.y.push(amplitude*Math.sin((x*freq + phase)/UNIT_FREQ*Math.PI) + offset);
      }
      return points;
    },

    drawSine: function(sinewave, color, amplitude, offset, freq, phase, start, end) {
      start = typeof start != 'undefined' ? start : 0
      end = typeof end != 'undefined' ? end : 20
      var points = this.generateSine(amplitude, offset, freq, phase, start, end);
      this.drawCurve(sinewave, color, points);
    },

    annotate: function(stage, text, color, origin) {
      var annotation = new PIXI.Text(text, { font: 'italic 14px Arial', fill: color });
      annotation.x = origin.x;
      annotation.y = origin.y;
      stage.addChild(annotation);
      return annotation;
    },

    drawSamples: function(sinewave, amplitude, freq, phase, start, end, step) {
      var samples = [];
      for (var x = start; x <= end; x+=step) {
        var y = amplitude*Math.sin((x*freq + phase)/UNIT_FREQ*Math.PI);
        sinewave.drawCircle(x, y, 3/TICK_STEP);
        samples.push(y);
      }
      return samples;
    },

    drawSampleBlip: function(sinewave, amplitude, freq, phase, sample_offset, x) {
      var y = amplitude*Math.sin((x*freq + phase)/UNIT_FREQ*Math.PI);
      sinewave.drawCircle(x,y,2/TICK_STEP);
      if (sample_offset <= 0.3) {
        y = amplitude*Math.sin((x*freq + phase - sample_offset)/UNIT_FREQ*Math.PI);
        sinewave.drawCircle(x - sample_offset, y, sample_offset);
      }
    },

    mean: function(ary) {
      return ary.reduce(function(a, b) { return a + b; }) / ary.length;
    },

    filter: function(ary, taps) {
      if (ary.length < taps.length) {
        var gain = taps.slice(0, ary.length).reduce(function(a, b) { return a + b; })
        taps = taps.map(function(a) { return a / gain })
      }
      return ary.reduce(function(a, b, i) { return a + b*taps[i] }, 0)
    },

    genFilter: function(n) {
      var taps = []
      for (var i = 0.5-n/2.0; i < n/2.0; i+=1.0) {
        taps.push(Math.sin(Math.PI*i/26.0) / (Math.PI*i/26.0))
      }
      var gain = taps.reduce(function(a, b) { return a + b; })
      taps = taps.map(function(a) { return a / gain })
      return taps
    },
  }
}());
