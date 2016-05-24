var unirest = require("unirest");
var fs = require('fs');

var count = 0;

var run = function (nha, phong) {
  var req = unirest("POST", "http://ktxdhqghcm.vnuhcm.edu.vn/dashboard/common/tracuutrungtuyen.aspx");
  var agent_number1 = Math.round(Math.random() * 1000);
  var agent_number2 = Math.round(Math.random() * 100);
  req.headers({
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "origin": "http://ktxdhqghcm.vnuhcm.edu.vn",
    "cookie": "ASP.NET_SessionId=5vym1vt03kmlqfsnx0evelsq",
    "content-type": "application/x-www-form-urlencoded",
    "X-MicrosoftAjax": "Delta=true",
    "Pragma": "no-cache",
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0."+ agent_number1 +"."+ agent_number2 +" Safari/537.36",
  });

  req.form({
    "ctl00$ctl00$ACTManager": 'ctl00$ctl00$SCCKTXCommon$mainContentPH$upDefault|ctl00$ctl00$SCCKTXCommon$mainContentPH$btGo1',
    "ctl00$ctl00$SCCKTXCommon$mainContentPH$hotenlot": '',
    "ctl00$ctl00$SCCKTXCommon$mainContentPH$truong": '',
    "ctl00$ctl00$SCCKTXCommon$mainContentPH$tinh": '',
    "ctl00$ctl00$SCCKTXCommon$mainContentPH$NhaDDL": nha,
    "ctl00$ctl00$SCCKTXCommon$mainContentPH$PhongDDL": phong,
    "ctl00$ctl00$SCCKTXCommon$mainContentPH$btGo1": 'Tìm theo nhà/phòng',
    "__ASYNCPOST": 'true',
    "btnTimKiem": "Tìm Kiếm",
    "__EVENTTARGET": "",
    "__EVENTARGUMENT": "",
    "__LASTFOCUS": "",
    "ACTManager_HiddenField": "",
    "__EVENTVALIDATION": "/wEdANQBtIL21mE2RjvAymtXA3iP0WxiZRxGF81sek/u1LkJnZ7nT8pxLGL58x1yjG4eo9qEEzdjEHz+NFCDSHMq0CDw48THDp/u6ni7welT9hw4T5E30Oc01Vc/1Wrc1JVd4pMyIxxNrPB5HSbEDOZgnDAicdaGiVEzCbx/RmSlix6hFO/FrN7+QNC5lbXrVa4KwV39uA8URyqyLT6EAjOT+I7QcUYaBn3xOY5nD8UZmskovivtiOn2tlOcCqSziVeq1aUeEIIZ8J+SojrJ3sGsbnyAHwcedHS5nalaw0gzfjuwkrRoSd2JwXcpy0ZiFExL6bcKrxCDePhmkgt8VTTyVFvoWhydQJlq67+/asGBXlAmb+pL/cgxL+GX72i1+eIJsMTwjDZ3OVZ6BH4T5teKkaJLKwziyhy276uzP7zE+JkR796Y0touViNGuHmvdUWUUYXU06W8iX3EX9QLNKYVfKl4aucM6J7245EAhYh7Pkr0Kb7qf/+x/VP45MVHALjQyBfeeZV0jgXx+e+NNBmNTTOZASagO940EJ32wZPLoCA+LOqQqDHv9aK8fK4GTSEzG0/f4AnhEzfyQIx9MeM0XblLVoTpW8YrRSlsAlDs3L/hVX2XVkO8RzoBOrU1lQNMczW1bfROkOCc7mwxaHM4VbHxzPesEyZcghEZmMoDdqrS7eG5jB7O2G90JPfUKSA/AmY+Y93DhOzIU14qhDg2A+LN561eWUMkvxUZ8pcTwdafGtOVwQYCT0cafJz1vH3X2itSwg4R5yoiFSC3USDK5DrfjT40KD3x5l5wec2B2ANJ4/pchc80ViXFROZJQyJBdIJM7GOBizQKJ8MtZHh5yo/4U6f6FUHEA3t4mI45VHSi9yQ4ta1/zCJGO/p8t6pYmMcP3HkY8YE0XJUFXc24vxtHU/KtMfnttiavWR7hITnl0gwLwk6YdMikgEo6bPxi8c1+BSnkuqy3O8Gku+L5QFPpiqvut8bKGrXHGhAGBwWlVem5VcDLST8iJQvYpTIjV/OwQwGpczyMONWj4+klizqg/The9ptG6jOtMrHLvFeDRMJfCQVoatEsEeEvKuydCDA8AH3XjEx2kxfrTxTawseDhl8QwFy/oYIWcivcVlYSPuC/lmtOWaX2q1U6aL18zN3ymyGKHSlYvx4rTZvgFJHuMIzXjbafzq2wWOPMLEmGNg4U8JBRJ1l4dSzPuqJx1JW+UzdoqO/PO0m6xyP3AMDWL6lf1KY52+BgJspvx3zSbK/xKxm7cV2MF1eDv2BE9oQZd9Oi+bPXcad5Qzw3vldOHOCbnGzSCUf6B1hEo/zE11PgQ1bZo3cMjhOb5tlLybPRUro/FXsPM//6b/RqBz/TaugINab2JXZOb8+REh9YrgiEwWW7PfO742tx17ERkyW9PeUhy2ua5Z7jFniKcVm7ac4rZCIbjuO0hdL3gWd37C87N+zDiCctC94fWhnxYuIsARaMagX+O1EnFWmkj84UqG0sV+KcptEmK32wacKtJ2c+bnfRGieYBrojT0PA9Mg4YnBmF6I9Itt0lbWY+mdyV4USe8KzK1J+dkHcewrFkvbEiTk41EYV7z8cvd6Z1Il1ErPqRnZP1BSDkKDGurloycLHXDKawWR/5uDdUlAWicLhUfKfkIfHJxVmHhxW06/xij2R5TU1BoBrTbx2iTR2QMMqEvT2DoWqisDB2HE3tSB2UF3FeUMOrJt7ibM8gs5/qSp353iGJoZeQza4fzeOeLOPqi74bhWVDtKrxYnAqw+gqyWv98JIF7Frcb4AJWfQ8SfWKrgssavN63QVXvRNKyRxEN7Z2CeMY1KTE9LAe1/yVUHC+FhQuxJGAixNKC49XkG6/etlvFa1b51uvLTtK72Ovf/ZDLabCryClZ8ebxQt1+LWqCPWB3kUx891v0O5YF+XJgxULjARDA3pFTYo0nDKJAMO0f4ysxkvpKRKo30l32xr4c1yRf49oGuzlEx6LueAYU9UhZAifGFUMqEZLpBdhplheEFBQNhkkdTeIYMUdFirtKHeZNns4rVlTEA6kw1MTJ0cKGeCPg+RRWMX/k/kLcyQkg2q7BnIJwnDq17ND3GrItSZmuHP0uvsAXXkmODk6FrKrN808sTfdaVyaH9uq/Ub62z4E3KfTkPrQ8yUfZC5tnFAjYfbeZdWvolJcSWU/Ls2VrzwbALD3lIR2EfxvHh4RVePfCNj9+TVBhJNCrYaonGhXgys58uTwbsZKRONzsJbV3EMaYHUt4eKth31V40uClDTUuCoRu64rifKXEuuDHissr51uIGaKnON0F94RGMlwjyFvvW0a+B8OnBYnUICmySBXnrUvISiL/JAA5y6vs22Zb4/rdrCaaEaROPUg15T/1qGoZDrZ6WZ5y4clphyxBhxZWNZfJMKYriZ2WbSG16IQSktG1pY+x9QYQsy4eDk0cJlSAQJy5xPL2ke/3r+tdRxNyCmyfqzP1T8j0DZJfelMIV1UGh/8e37eiG/AC4JkzpIYkoOev9VNoPx8SENKpVGEc0LrrhYtLOotOcBGswXTXDjkwY/zfBQWuc2Ex5rtXVX5pXMbSREuuJxBpqO9iCmRSMD/pnPHK8EGEz1YwO7TF7QCSvpcTNy/TDWTOscKAZ+WDONp4Wnwokkt9M0//uE+3dab53lf/iTVe9iYCC/VPQ0BH9SBNyWoYMt8L+M2NPTpJBjxYygutCO6CrgQav0dSy+X7KTEXEGprtpPaG3/mFJ/pL+CzLK3zQwxzQ2zmudT3KSOKInTsVyZTXPZZX7mTPxohA14CarBgPO6HVbkiXqqleFR8InMhcFdmMhXiKvip1zFUUj3udsL+Uw6Ev/eX+Pn99OVL1WpG6r7Lu6iWfq8SE2rQbaFo+9MBDzplNElo6VyWymhPKvD9bDeoF34N1Sy6cLC/qqAps3/TnEihq50b6RvoCQQwmOPV53MHrn2jLGf6sf5OsGLTAefD5/QpV7Ks5zS5VCo4g/1mfCtfRckutEiBkg3rfbYPWkwx+96u5JOTT2zoApk1vWL97x1xmFKewiwMaESV20zkUyVJMLEzU6FcTmZsdyI9X8OCfQU2GOkCmyRr/BOCDOZ0+kpYVbY7tv8m7db/rJTVUXDqOPrWdrRFleCfEnwKDsXp7W+KiHfkgpzasVn/n48LbGXHDQDyDywVQ2KT9xfYyqfOknIsvfCeD22sZFbYFXq+WyCzXikNgrKdjFTmzFeXY4+KO7xDVWXYQS2TCZ3GvCwYpUNk8z7vPeqT1xJX+LRqLl5xPeAjRdiht69h4SDRqAd391CZ7oJ9pA73u8ztWjZjKQTXwVwDNW6sabPrngA7/Iryquei4e2ro7gPT8ybiKMNg/Uu+BhyXiAZuiwfD+BUTTLMDe/dnSk8nd9eiuiMWVVrQgS0xG5GlgXn/L4MpwPkSB4WOMlboe8tyZb9eq2ifcpkxo/3LJRoezeyMX0qKZYpb5qyBM4OKvfHoJVqEX4dwtWYlTjouc8bNy3/KJttIv8PW8kAWUzgmjSoHhVWtRDpK0J1o6Ac3WfQiXQwQI8tCjdfb6bJPRXd69HwBBTJPtlpGvbOB1Bzy2h1t3+ZBzjh48R/fngHJxm0BuqqQc2/LjISgR0qe6s/oc2/Xijd0yS0KQ/ALEZuJGgJQlmExzvIHDaI57ehrEzgIrh/n3U4LKCcmfxsRk2/N7fgvaRhbuNjWAtrmZAfy7jjRyy6V9E8Yf8jWPh8cgIWknIvMt3IR/MEQuWTgEjA+mRh8iUyLP2M/9csHm9vluF3rLNtToUrbWIwBU4+sgVqihHfsQ03IMldgwLqy2+UokNazDMYVCcG6CxKXF0bE5V5dxBP2148/FzAhotGd6SktD3vFHj4/kwiktYEOEkv07KTkkOx7660hmROEEEFvti4Gn3ua2Isf4Ho0AbN/1/LX8JH+bdRpUlOu0l01r5G3c9doVyLE2bgZhZ3NzQVZlX6vaXfrxtkmbG61W88+EonDOPAsjTXJIqfVLbs7PisaFtS5w622r7xqJTVLC+bgkzpnLZh4BZFqOK73epEXQWt0RO3nSiq8pPIseJP2ak+arsTRSFaq/FwUnZYm0pxovJWhnUVLEy+vZcZ9ksaydhG4CDhk3pYHN2LCQDaEqLwNyC/Onv3fignGwV43CwPkGIuUZZgmZGvlWxQiHc9kwXuydDjKpCmXMygg6ebXFk7vEDJSjwoSTukcY58C1fJ7wQfHIwtIGECnamymDKkY3BfzSvGqIVZNzPrnrN0kKIzhW7M5O56FbXyGfn1FU+pZwkc3FIOAkXuPLoDqvp3a0s4VNOomw7TZP27Ne/o9XhSKCdxKrFfjhPbr6BgJvKa5p+Migkbg6JR/ycmpLoL7dbXfT5fStt9vUfIWI0S1fW4AGQUYcR0YtFBbpZs1yACFeXiBVRbUBt+a2yAGgCY/QiSttk57U6W5rM2IdL1pW1OkwvGelHsKB0s9XJ35Xn7MzUdADnG27IXhIDeYhxWOtmR/nrXx+Nj6IrDqol6oehbOJu0VcXgR1mDigfD631ZorisMOgitbUDlzNRf2Hw==",
    "__VIEWSTATE": "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MTYDMjE3AzMwMgMzMDMDMzA0AzMwNQMzMDYDMzA3AzMwOAMzMDkDMzEwAzMxMgMzMTMDMzE0AzMxNQMzMTYDMzE3AzQwMgM0MDMDNDA0AzQwNQM0MDYDNDA3AzQwOAM0MDkDNDEwAzQxMgM0MTMDNDE0AzQxNQM0MTYDNDE3FTwDMTAyAzEwMwMxMDQDMTA1AzEwNgMxMDcDMTA4AzEwOQMxMTADMTEyAzExMwMxMTQDMTE1AzExNgMxMTcDMjAyAzIwMwMyMDQDMjA1AzIwNgMyMDcDMjA4AzIwOQMyMTADMjEyAzIxMwMyMTQDMjE1AzIxNgMyMTcDMzAyAzMwMwMzMDQDMzA1AzMwNgMzMDcDMzA4AzMwOQMzMTADMzEyAzMxMwMzMTQDMzE1AzMxNgMzMTcDNDAyAzQwMwM0MDQDNDA1AzQwNgM0MDcDNDA4AzQwOQM0MTADNDEyAzQxMwM0MTQDNDE1AzQxNgM0MTcUKwM8Z2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZGQCFw8PZA8QFgFmFgEWAh4OUGFyYW1ldGVyVmFsdWUFATEWAWZkZAIdDzwrABEDAA8WBB8BZx4LXyFJdGVtQ291bnRmZAEQFgAWABYADBQrAABkAh8PD2QPEBYDZgIBAgIWAxYCHwJlFgIfAmUWAh8CZRYDZmZmZGQCIQ8PZA8QFgNmAgECAhYDFgIfAmQWAh8CZBYCHwJkFgNmZgIDZGQYAQUrY3RsMDAkY3RsMDAkU0NDS1RYQ29tbW9uJG1haW5Db250ZW50UEgkZ3ZEUw88KwAMAQhmZLoJJ4dPe7BtF4VqebBUkWSQKtYHxohy9sbzxgTiP10H",
    "__VIEWSTATEGENERATOR": "9B5D5E1D"
  });

  req.end(function (res) {
    if (res.error) {
      throw new Error(res.error);
    }
    
    var env = require('jsdom').env;
    var html = res.body;
    
    // first argument can be html string, filename, or url
    env(html, function (errors, window) {
        //console.log(errors);
        
        var $ = require('jquery')(window);
        var ufmTableData = $('table tr');
        //console.log("tr ==> ", ufmTableData.text())
        
        if (ufmTableData.length) {
            var trs = $(ufmTableData)//.children("tr");
           
            $.each(trs, function(n, tr) {
                  var tds = $(tr).children("td");
                  var student = {
                      hoten: '',
                      ngay_sinh: '',
                      nha: '',
                      phong: '',
                      truong: '',
                      tinh: ''
                  };
                  
                  $.each(tds, function(n, td) {
                    if (n == 0) student.hoten = $(td).text().trim();
                    if (n == 1) student.ngay_sinh = $(td).text().trim();
                    if (n == 2) student.nha = $(td).text().trim();
                    if (n == 3) student.phong = $(td).text().trim();
                    if (n == 4) student.truong = $(td).text().trim();
                    if (n == 5) student.tinh = $(td).text().trim();
                  });

                  if (student.nha && student.truong) {
                    console.log(count++, " ===> ", student);
                    fs.appendFile('./ktx2016.json', JSON.stringify(student) + ", \n");
                  }
            });
        }
    });
  });
}

var rooms = ["101", 
"102", 
"103", 
"104", 
"105", 
"106", 
"107", 
"201", 
"202", 
"203", 
"204", 
"205", 
"206", 
"207", 
"208", 
"209", 
"210", 
"211", 
"212", 
"213", 
"214", 
"215", 
"216", 
"217", 
"218", 
"219", 
"220", 
"221", 
"222", 
"223", 
"224", 
"301", 
"302", 
"303", 
"304", 
"305", 
"306", 
"307", 
"308", 
"309", 
"310", 
"311", 
"312", 
"313", 
"314", 
"315", 
"316", 
"317", 
"318", 
"319", 
"320", 
"321", 
"322", 
"323", 
"324", 
"401", 
"402", 
"403", 
"404", 
"405", 
"406", 
"407", 
"408", 
"409", 
"410", 
"411", 
"412", 
"413", 
"414", 
"415", 
"416", 
"417", 
"418", 
"419", 
"420", 
"421", 
"422", 
"423", 
"424", 
"501", 
"502", 
"503", 
"504", 
"505", 
"506", 
"507", 
"508", 
"509", 
"510", 
"511", 
"512", 
"513", 
"514", 
"515", 
"516", 
"517", 
"518", 
"519", 
"520", 
"521", 
"522", 
"523", 
"524", 
"601", 
"602", 
"603", 
"604", 
"605", 
"606", 
"607", 
"608", 
"609", 
"610", 
"611", 
"612", 
"613", 
"614", 
"615", 
"616", 
"617", 
"618", 
"619", 
"620", 
"621", 
"622", 
"623", 
"624", 
"701", 
"702", 
"703", 
"704", 
"705", 
"706", 
"707", 
"708", 
"709", 
"710", 
"711", 
"712", 
"713", 
"714", 
"715", 
"716", 
"717", 
"718", 
"719", 
"720", 
"721", 
"722", 
"723", 
"724", 
"801", 
"802", 
"803", 
"804", 
"805", 
"806", 
"807", 
"808", 
"809", 
"810", 
"811", 
"812", 
"813", 
"814", 
"815", 
"816", 
"817", 
"818", 
"819", 
"820", 
"821", 
"822", 
"823", 
"824", 
"901", 
"902", 
"903", 
"904", 
"905", 
"906", 
"907", 
"908", 
"909", 
"910", 
"911", 
"912", 
"913", 
"914", 
"915", 
"916", 
"917", 
"918", 
"919", 
"920", 
"921", 
"922", 
"923", 
"924", 
"1001", 
"1002", 
"1003", 
"1004", 
"1005", 
"1006", 
"1007", 
"1008", 
"1009", 
"1010", 
"1011", 
"1012", 
"1013", 
"1014", 
"1015", 
"1016", 
"1017", 
"1018", 
"1019", 
"1020", 
"1021", 
"1022", 
"1023", 
"1024", 
"1101", 
"1102", 
"1103", 
"1104", 
"1105", 
"1106", 
"1107", 
"1108", 
"1109", 
"1110", 
"1111", 
"1112", 
"1113", 
"1114", 
"1115", 
"1116", 
"1117", 
"1118", 
"1119", 
"1120", 
"1121", 
"1122", 
"1123", 
"1124"];

for (var i = 22; i <= 22; i++) {
    for (var j in rooms) {
      console.log("Process room %s/%s", i, rooms[j]);
      run(i, rooms[j]);
    }
}


