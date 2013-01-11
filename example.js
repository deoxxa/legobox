#!/usr/bin/env node

//
// Legobox example
//

var Legobox = require("./index");

// main container
var container = new Legobox.Container({
  width: process.stdout.columns,
  height: process.stdout.rows,
  split: Legobox.Container.SPLIT.vertical,
});

// connect the container to stdout
container.pipe(process.stdout);

// tell us when there's a reflow
container.on("reflow", function() {
//  console.log(JSON.stringify(container, null, 2));
});

container.on("data", function(data) {
//  console.log(JSON.stringify(data.toString()));
});

container.clear().hide();

// horizontal split thing
var horizontal = new Legobox.Container({split: Legobox.Container.SPLIT.horizontal}, {height: 1});
container.addWidget(horizontal);
horizontal.addWidget(new Legobox.Text({content: "Legobox Example 1", align: "center"}), {height: 1});
horizontal.addWidget(new Legobox.Text({content: "Legobox Example 2", align: "center"}), {height: 1});
horizontal.addWidget(new Legobox.Text({content: "Legobox Example 3", align: "center"}), {height: 1});

for (var i=0;i<20;++i) {
  (function() {
    var progress_container = new Legobox.Container({split: Legobox.Container.SPLIT.horizontal}, {height: 1});

    var progress_label = new Legobox.Text({content: "", align: "right"}),
        progress_bar = new Legobox.Progress({total: 100, align: "left"});

    progress_container.addWidget(progress_bar).addWidget(progress_label, {width: 3});
    container.addWidget(progress_container);

    var divisor = Math.round(Math.random() * 1000);

    setInterval(function() {
      var n = Math.round((Date.now() / divisor) % 100);

      progress_label.content = n.toString();
      progress_bar.progress = n;

      progress_label.reflow();
      progress_bar.reflow();
    }, 50);
  }());
}

// force initial (re)flow
container.reflow();
container.reflow();

// make sure we reflow when we need to
process.stdout.on("resize", function() {
  container.width = process.stdout.columns;
  container.height = process.stdout.rows;
  container.clear().reflow();
});

// this just stops the app from closing right away
process.stdin.resume();
