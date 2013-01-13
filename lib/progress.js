var util = require("util");

var Widget = require("./widget");

var Progress = module.exports = function Progress(config) {
  if (!config) { config = {}; }

  Widget.call(this, config);

  this.align = config.align || "left";
  this.total = config.total || 100;
  this.progress = config.progress || 0;
};
util.inherits(Progress, Widget);

Progress.prototype.reflow = function reflow() {
  var n1 = Math.round(this.width / this.total * this.progress),
      n2 = this.width - n1 + 1;

  var r = 5 - Math.round(this.progress / this.total * 5),
      g = Math.round(this.progress / this.total * 5);

  if (typeof this.rgb === "function") {
    this.rgb([r, g, 0]);
  }

  if (this.align === "left") {
    this.moveTo([0, 0])
    this.write((new Array(n1)).join("="));
    this.write((new Array(n2)).join(" "));
  } else if (this.align === "right") {
    this.moveTo([0, 0]);
    this.write((new Array(n2)).join(" "));
    this.write((new Array(n1)).join("="));
  }

  if (typeof this.reset === "function") {
    this.reset();
  }
};
