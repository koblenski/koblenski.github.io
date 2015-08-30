function drawPositiveAxis(stage) {
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

  var style = { font: 'italic 14px Arial', fill: '#eeeeee' };
  var x_text = new PIXI.Text('t', style);
  x_text.x = 540;
  x_text.y = 272;
  stage.addChild(x_text);

  var y_text = new PIXI.Text('f(t)', style);
  y_text.x = 10;
  y_text.y = 2;
  stage.addChild(y_text);
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

function drawSine(sinewave, amplitude, offset, freq, phase) {
  var y = amplitude*Math.sin(phase/260.0*Math.PI) + offset;
  sinewave.moveTo(0, -y);
  for (var x = 0; x <= 520; x+=2) {
    y = amplitude*Math.sin((x*freq + phase)/260.0*Math.PI) + offset;
    sinewave.lineTo(x, -y);
    sinewave.moveTo(x, -y);
  }
}

