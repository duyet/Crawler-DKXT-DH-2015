var phantom = require('phantom');


phantom.create(function (ph) {
  ph.createPage(function (page) {
    page.open("http://xettuyen.ufm.edu.vn", function (status) {
      page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function() {
        page.evaluate(function() {
            setTimeout(function() {
                console.log("");
                console.log("### STEP 1: Load '" + step1url + "'");
                
            }, 0);
        });
        phantom.exit()
      });
      
      console.log("opened google? ", status);
        page.evaluate(function () { return document.title; }, function (result) {
        console.log('Page title is ' + result);
        ph.exit();
      });
    });
  });
});