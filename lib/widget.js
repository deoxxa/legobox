var Jetty = require("jetty"),
    util = require("util");

var Widget = module.exports = function Widget(config) {
  Jetty.call(this);

  if (!config) { config = {}; }

  this.width = config.width;
  this.height = config.height;
};
util.inherits(Widget, Jetty);
