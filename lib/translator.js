var Steez = require("steez"),
    util = require("util");

var Yttej = require("Yttej");

var Translator = module.exports = function Translator(widget, position) {
  Steez.call(this);

  this.widget = widget;
  this.position = position;

  this.yttej = new Yttej();

  this.yttej.on("data", function(data) {
    this.emit("data", data);
  }.bind(this));

  this.yttej.on("sequence", function(sequence) {
    var char = sequence.char,
        data = sequence.data;

    if (sequence.char === "H") {
      data = data.toString().split(";").map(function(e) { return parseInt(e, 10); });
      data[1] = data[1] + this.position.x;
      data[0] = data[0] + this.position.y;
      data = data.join(";");
    }

    this.emit("data", new Buffer([0x1b, 0x5b]));
    this.emit("data", data);
    this.emit("data", char);
  }.bind(this));
};
util.inherits(Translator, Steez);

Translator.prototype.write = function write(data) {
  return this.yttej.write(data);
};
