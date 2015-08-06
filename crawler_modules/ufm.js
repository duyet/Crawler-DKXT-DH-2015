var unirest = require("unirest");
var Student = require('../model');

var Run = function(_faculty, _subjectGroup) {
  var req = unirest("POST", "http://xettuyen.ufm.edu.vn/");
  
  req.headers({
    "content-type": "application/x-www-form-urlencoded",
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/43.0.2357.130 Chrome/43.0.2357.130 Safari/537.36",
    "Cookie": "ASP.NET_SessionId=vfe2wma0gt0dftkzeymsoedc",
    "Connection": "keep-alive",
  });
  
  req.form({
    "ctl00$head$CmbNganh": _faculty,
    "ctl00$head$CmbTohop": _subjectGroup,
    "ctl00$head$BtnLoc": "Lọc",
    "__VIEWSTATE": "/wEPDwULLTE1MjIwNjY5OTUPZBYCZg9kFgICAw9kFgICAQ9kFgQCAQ8PFgIeBFRleHQFCjA1LzA4LzIwMTVkZAILDzwrAAsAZGRyj0auJBDs11r3j08PW+LGSDMVfSC9Ylps0FIADeWbPg==",
    "__EVENTVALIDATION": "/wEdABPrEMIOg3TvGZ4OgJaEnVtX9KTswEwckM4eZynZmsmbXx4Qxd37m4oMxKovJNZZE7kQ2Mc8CRG7tr+jE7MR25SYvBEJy+6sm1edMcM4ShqwpzbbvxsI4ZUOzHXB26onNU9ZlSueidLQz3jD8mD6oZkgddl8AEIDuwKRzOD/kCGorrKCkpm8M7EJDCLV02rwV0P27Dxkt1FP09p7/6LQA5C043yIQGyVwqC7E4vOSvrzJw+XS8tj28Vb4EAA2bJy4kpa4HDNhkWz4L2SPADe97nMGVgQX43QdqOw/IrvwDRtu8HTqimAdoTgD7TDtWh7tMsDiigLDg/vgX60Ff7ltEfsLMf80KdnVg/kEmRRDti4xjvCO/vpZvIEuaQngD22RXJymJ/foV4q1fxZ5KwTqMBA5RhZkbeN7CXYCmyKvQWl6fe2X6E6N/9EX+jy8DCjnVk="
  });
  
  req.end(function (res) {
    if (res.error) throw new Error(res.error);
    
    var env = require('jsdom').env;
    var html = res.body;
  
    // first argument can be html string, filename, or url
    env(html, function (errors, window) {
        console.log(errors);
        
        var $ = require('jquery')(window);
        var ufmTableData = $('#ctl00_head_datatable tr');
        // console.log(ufmTableData.text())
        
        if (ufmTableData.length) {
            var trs = $(ufmTableData)//.children("tr");
            $.each(trs, function(n, tr) {
                  var tds = $(tr).children("td");
                  var student = {
                      student_name: '',
                      student_id: '',
                      school_code: "DMS", // Ma~ truo`ng
                      faculty_code: _faculty, // Nga`nh 
                      subject_group: getSubjectGroup(_subjectGroup),
                      priority: 0, // So thu tu nguyen vong uu tien
                      score_1 : 0,
                      score_2 : 0,
                      score_3 : 0,
                      score_priority: 0,
                      score_sum : 0
                  };
                  
                  $.each(tds, function(n, td) {
                      if (n == 1) student.student_id = $(td).text().trim();
                      if (n == 2) student.student_name = $(td).text().trim();
                      if (n == 3) student.priority = parseInt($(td).text().trim());
                      if (n == 4) student.score_sum = parseFloat($(td).text().trim());
                      if (n == 5) student.score_priority = parseFloat($(td).text().trim());
                  });
                  
                  console.log(student);
                  var saver = new Student(student);
        					saver.save(function (err, data) {
        					  console.log('Saved ', data._id);
        					});
            });
        }
    });
  });
};

var subjectGroup = [
  {id: "A00", value: "Toán-Lý-Hóa"},
  {id: "A01", value: "Toán-Lý-Anh"},
  {id: "C01", value: "Toán-Văn-Lý"},
  {id: "D01", value: "Toán-Văn-Anh"},
];

var Faculty = [
   {id: "D220201", text: "Ngôn ngữ Anh"},
   {id: "D340101", text: "Quản trị kinh doanh"},
   {id: "D340103", text: "Quản trị dịch vụ du lịch và lữ hành"},
   {id: "D340107", text: "Quản trị khách sạn"},
   {id: "D340109", text: "Quản trị Nhà hàng và dịch vụ ăn uống"},
   {id: "D340115", text: "Marketing"},
   {id: "D340116", text: "Bất động sản"},
   {id: "D340120", text: "Kinh doanh quốc tế"},
   {id: "D340201", text: "Tài chính - Ngân hàng"},
   {id: "D340301", text: "Kế toán"},
   {id: "D340405", text: "Hệ thống thông tin quản lý"},
];

var getSubjectGroup = function(subjectGroupCode) {
    for (var i in subjectGroup) {
        if (subjectGroupCode == subjectGroup[i].id) return subjectGroup[i].value;
    }
    
    return "";
};

for (var i in Faculty) {
    for (var j in subjectGroup) {
        Run(Faculty[i].id, subjectGroup[j].id);
    }
}