function drawPositiveAxis(stage, x_labels, y_labels) {
  var graphics = new PIXI.Graphics();
  graphics.lineStyle(1, 0xdddddd, 1);
  graphics.moveTo(15, 280);
  graphics.lineTo(535, 280);

  for(var x = 41; x <= 535; x += 26) {
    graphics.moveTo(x, 275);
    graphics.lineTo(x, 280);
  }

  graphics.moveTo(15, 20);
  graphics.lineTo(15, 280);
  for(var y = 20; y < 280; y += 26) {
    graphics.moveTo(15, y);
    graphics.lineTo(20, y);
  }

  stage.addChild(graphics);

  var label_style = { font: '10px Arial', fill: '#eeeeee' };
  var axis_style = { font: 'italic 14px Arial', fill: '#eeeeee' };
  if (typeof x_labels != 'undefined') {
    var x = 55;
    var step = 52;
    x_labels.forEach(function(label) {
      var text = new PIXI.Text(label, label_style)
      text.x = x
      text.y = 282
      stage.addChild(text)
      x += step
    })
  } else {
    var x_text = new PIXI.Text('t', axis_style);
    x_text.x = 540;
    x_text.y = 272;
    stage.addChild(x_text);
  }

  if (typeof y_labels != 'undefined') {
    var y = 223;
    var step = 52;
    y_labels.forEach(function(label) {
      var text = new PIXI.Text(label, label_style)
      text.x = 2
      text.y = y
      stage.addChild(text)
      y -= step
    })
  } else {
    var y_text = new PIXI.Text('f(t)', axis_style);
    y_text.x = 10;
    y_text.y = 2;
    stage.addChild(y_text);
  }
}

function drawZeroAxis(stage) {
  var graphics = new PIXI.Graphics();
  graphics.lineStyle(1, 0xdddddd, 1);
  graphics.moveTo(15, 150);
  graphics.lineTo(535, 150);

  for(var x = 41; x <= 535; x += 26) {
    graphics.moveTo(x, 145);
    graphics.lineTo(x, 150);
  }
  graphics.moveTo(275, 140);
  graphics.lineTo(275, 150);

  graphics.moveTo(15, 20);
  graphics.lineTo(15, 280);
  for(var y = 20; y <= 280; y += 26) {
    graphics.moveTo(15, y);
    graphics.lineTo(20, y);
  }

  stage.addChild(graphics);

  var style = { font: 'italic 14px Arial', fill: '#eeeeee' };
  var x_text = new PIXI.Text('t', style);
  x_text.x = 540;
  x_text.y = 142;
  stage.addChild(x_text);

  var y_text = new PIXI.Text('f(t)', style);
  y_text.x = 10;
  y_text.y = 2;
  stage.addChild(y_text);

  var xLabel = new PIXI.Text('1', { font: '14px Arial', fill: '#eeeeee' });
  xLabel.x = 273;
  xLabel.y = 152;
  stage.addChild(xLabel);
}

function drawDualAxis(stage) {
  var graphics = new PIXI.Graphics();
  graphics.lineStyle(1, 0xdddddd, 1);
  graphics.moveTo(15, 85);
  graphics.lineTo(535, 85);

  for(var x = 41; x <= 535; x += 26) {
    graphics.moveTo(x, 80);
    graphics.lineTo(x, 85);
  }
  graphics.moveTo(275, 75);
  graphics.lineTo(275, 85);

  graphics.moveTo(15, 20);
  graphics.lineTo(15, 150);
  for(var y = 33; y <= 150; y += 26) {
    graphics.moveTo(15, y);
    graphics.lineTo(20, y);
  }

  graphics.moveTo(15, 228);
  graphics.lineTo(535, 228);

  for(var x = 41; x <= 535; x += 26) {
    graphics.moveTo(x, 223);
    graphics.lineTo(x, 228);
  }
  graphics.moveTo(275, 218);
  graphics.lineTo(275, 228);

  graphics.moveTo(15, 176);
  graphics.lineTo(15, 280);
  for(var y = 176; y <= 280; y += 26) {
    graphics.moveTo(15, y);
    graphics.lineTo(20, y);
  }

  stage.addChild(graphics);

  var style = { font: 'italic 14px Arial', fill: '#eeeeee' };
  var x_text = new PIXI.Text('t', style);
  x_text.x = 540;
  x_text.y = 77;
  stage.addChild(x_text);

  var y_text = new PIXI.Text('f(t)', style);
  y_text.x = 10;
  y_text.y = 2;
  stage.addChild(y_text);

  var xLabel = new PIXI.Text('1', { font: '14px Arial', fill: '#eeeeee' });
  xLabel.x = 273;
  xLabel.y = 87;
  stage.addChild(xLabel);
}

function drawDualPositiveAxis(stage) {
  var graphics = new PIXI.Graphics();
  graphics.lineStyle(1, 0xdddddd, 1);
  graphics.moveTo(15, 85);
  graphics.lineTo(535, 85);

  for(var x = 41; x <= 535; x += 26) {
    graphics.moveTo(x, 80);
    graphics.lineTo(x, 85);
  }
  graphics.moveTo(275, 75);
  graphics.lineTo(275, 85);

  graphics.moveTo(15, 20);
  graphics.lineTo(15, 150);
  for(var y = 33; y <= 150; y += 26) {
    graphics.moveTo(15, y);
    graphics.lineTo(20, y);
  }

  graphics.moveTo(15, 280);
  graphics.lineTo(535, 280);

  for(var x = 41; x <= 535; x += 26) {
    graphics.moveTo(x, 275);
    graphics.lineTo(x, 280);
  }
  graphics.moveTo(275, 270);
  graphics.lineTo(275, 280);

  graphics.moveTo(15, 176);
  graphics.lineTo(15, 280);
  for(var y = 176; y <= 280; y += 26) {
    graphics.moveTo(15, y);
    graphics.lineTo(20, y);
  }

  stage.addChild(graphics);

  var style = { font: 'italic 14px Arial', fill: '#eeeeee' };
  var x_text = new PIXI.Text('t', style);
  x_text.x = 540;
  x_text.y = 77;
  stage.addChild(x_text);

  var y_text = new PIXI.Text('f(t)', style);
  y_text.x = 10;
  y_text.y = 2;
  stage.addChild(y_text);

  var xLabel = new PIXI.Text('1', { font: '14px Arial', fill: '#eeeeee' });
  xLabel.x = 273;
  xLabel.y = 87;
  stage.addChild(xLabel);
}

function drawSine(sinewave, amplitude, offset, freq, phase, start, end) {
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

