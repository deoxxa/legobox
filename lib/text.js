var util = require("util");

var Widget = require("./widget");

var Text = module.exports = function Text(config) {
  if (!config) { config = {}; }

  Widget.call(this, config);

  this.align = config.align || "left";
  this.content = config.content || "";
};
util.inherits(Text, Widget);

Text.prototype.reflow = function reflow() {
  for (var i=0;i<this.height;++i) {
    this.moveTo([i, 0]);
    this.write((new Array(this.width)).join(" "));
  }

  if (this.align === "left") {
    this.moveTo([0, 0]);
  } else if (this.align === "right") {
    this.moveTo([0, this.width - this.content.length]);
  } else if (this.align === "center") {
    this.moveTo([0, this.width / 2 - this.content.length / 2]);
  }

  this.write(this.content);
};
