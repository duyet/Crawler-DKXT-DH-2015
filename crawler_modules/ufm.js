var phantom = require('phantom');


phantom.create(function (ph) {
  ph.createPage(function (page) {
    page.open("http://uit.edu.vn", function (status) {
      page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
        page.evaluate(function() {
          $("button").click();
        });
        phantom.exit()
      });
    });
  });
});