var url = require('url');
var http = require('http');
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var XLSX = require('xlsx');

var Student = require('../model');
var Crawler = require("crawler");

var downloadPath = "tmp/";

// Function to download file using wget
var downloadFileWget = function(file_url, callback) {

    // extract the file name
    var file_name = getFileName(file_url);
    // compose the wget command
    var wget = 'wget -P ' + downloadPath + ' "' + file_url + '"';
    // excute wget using child_process' exec function

    var child = exec(wget, function(err, stdout, stderr) {
        if (err) throw err;
        else { 
            console.log(file_name + ' downloaded to ' + downloadPath);
            if (callback) callback(downloadPath + '/' + file_name);
        }
    });
};

var getFileName = function(file_url) {
  return url.parse(file_url).pathname.split('/').pop();    
};

var getSubjectGroup = function(search) {
      var a = [
		  	{ "key": "A00", "subject": "Toán-Lý-Hoá" },
			{ "key": "A01", "subject": "Toán-Lý-Anh" },
			{ "key": "B00", "subject": "Toán-Hóa-Sinh" },
			{ "key": "D01", "subject": "Toán-Văn-Anh" }
      ];
      
      for (var id in a) if (a[id].key == search) return a[id].subject;
      return "";
};

var industry = [
	{"id" : "D140215", "Text": "Sư phạm kỹ thuật nông nghiệp"},
	{"id" : "D220201", "Text": "Ngôn ngữ Anh (*)"},
	{"id" : "D310101", "Text": "Kinh tế"},
	{"id" : "D310106Q", "Text": "Thương mại quốc tế (CT liên kết quốc tế)"},
	{"id" : "D310501", "Text": "Bản đồ học"},
	{"id" : "D340101", "Text": "Quản trị kinh Doanh"},
	{"id" : "D340101L", "Text": "Quản trị kinh Doanh (LT từ CĐ lên ĐH)"},
	{"id" : "D340101N", "Text": "Quản trị kinh Doanh (Phân hiệu Ninh Thuận)"},
	{"id" : "D340120Q", "Text": "Kinh Doanh quốc tế (CT liên kết quốc tế)"},
	{"id" : "D340301", "Text": "Kế toán"},
	{"id" : "D340301G", "Text": "Kế toán (Phân hiệu Gia Lai)"},
	{"id" : "D340301L", "Text": "Kế toán (LT từ CĐ lên ĐH)"},
	{"id" : "D420201", "Text": "Công nghệ sinh học"},
	{"id" : "D420201L", "Text": "Công nghệ sinh học (LT từ CĐ lên ĐH)"},
	{"id" : "D420201Q", "Text": "Công nghệ sinh học (CT liên kết quốc tế)"},
	{"id" : "D440301", "Text": "Khoa học môi trường"},
	{"id" : "D440301Q", "Text": "Khoa học và quản lý môi trường (CT liên kết quốc tế)"},
	{"id" : "D480201", "Text": "Công nghệ thông tin"},
	{"id" : "D480201L", "Text": "Công nghệ thông tin (LT từ CĐ lên ĐH)"},
	{"id" : "D480201Q", "Text": "Công nghệ thông tin (CT liên kết quốc tế)"},
	{"id" : "D510201", "Text": "Công nghệ kỹ thuật cơ khí"},
	{"id" : "D510201L", "Text": "Cơ khí công nghệ (LT từ CĐ lên ĐH)"},
	{"id" : "D510203", "Text": "Công nghệ kỹ thuật cơ điện tử"},
	{"id" : "D510205", "Text": "Công nghệ kỹ thuật ô tô"},
	{"id" : "D510206", "Text": "Công nghệ kỹ thuật nhiệt"},
	{"id" : "D510401", "Text": "Công nghệ kỹ thuật hóa học"},
	{"id" : "D520216", "Text": "Kỹ thuật điều khiển và tự động hóa"},
	{"id" : "D520320", "Text": "Kỹ thuật môi trường"},
	{"id" : "D520320L", "Text": "Kỹ thuật môi trường (LT từ CĐ lên ĐH)"},
	{"id" : "D540101", "Text": "Công nghệ thực phẩm"},
	{"id" : "D540101G", "Text": "Công nghệ thực phẩm (Phân hiệu Gia Lai)"},
	{"id" : "D540101L", "Text": "Công nghệ thực phẩm (LT từ CĐ lên ĐH)"},
	{"id" : "D540101N", "Text": "Công nghệ thực phẩm (Phân hiệu Ninh Thuận)"},
	{"id" : "D540101T", "Text": "Công nghệ thực phẩm (CT tiên tiến)"},
	{"id" : "D540105", "Text": "Công nghệ chế biến thủy sản"},
	{"id" : "D540301", "Text": "Công nghệ chế biến lâm sản"},
	{"id" : "D620105", "Text": "Chăn nuôi"},
	{"id" : "D620109", "Text": "Nông học"},
	{"id" : "D620109G", "Text": "Nông học (Phân hiệu Gia Lai)"},
	{"id" : "D620109L", "Text": "Nông học (LT từ CĐ lên ĐH)"},
	{"id" : "D620109N", "Text": "Nông học (Phân hiệu Ninh Thuận)"},
	{"id" : "D620112", "Text": "Bảo vệ thực vật"},
	{"id" : "D620113", "Text": "Công nghệ rau hoa quả và cảnh quan"},
	{"id" : "D620114", "Text": "Kinh Doanh nông nghiệp"},
	{"id" : "D620114Q", "Text": "Quản lý và kinh Doanh nông nghiệp quốc tế (CT liên kết quốc tế)"},
	{"id" : "D620116", "Text": "Phát triển nông thôn"},
	{"id" : "D620201", "Text": "Lâm nghiệp"},
	{"id" : "D620201G", "Text": "Lâm nghiệp (Phân hiệu Gia Lai)"},
	{"id" : "D620301", "Text": "Nuôi trồng thủy sản"},
	{"id" : "D620301L", "Text": "Nuôi trồng thủy sản (LT từ CĐ lên ĐH)"},
	{"id" : "D620301N", "Text": "Nuôi trồng thủy sản (Phân hiệu Ninh Thuận)"},
	{"id" : "D640101", "Text": "Thú y"},
	{"id" : "D640101G", "Text": "Thú y (Phân hiệu Gia Lai)"},
	{"id" : "D640101N", "Text": "Thú y (Phân hiệu Ninh Thuận)"},
	{"id" : "D640101T", "Text": "Thú y (CT tiên tiến)"},
	{"id" : "D850101", "Text": "Quản lý tài nguyên và môi trường"},
	{"id" : "D850101G", "Text": "Quản lý tài nguyên và môi trường (Phân hiệu Gia Lai)"},
	{"id" : "D850101N", "Text": "Quản lý tài nguyên và môi trường (Phân hiệu Ninh Thuận)"},
	{"id" : "D850103", "Text": "Quản lý đất đai"},
	{"id" : "D850103G", "Text": "Quản lý đất đai (Phân hiệu Gia Lai)"},
	{"id" : "D850103L", "Text": "Quản lý đất đai (LT từ CĐ lên ĐH)"},
	{"id" : "D850103N", "Text": "Quản lý đất đai (Phân hiệu Ninh Thuận)"}
];

console.log(">> Load UAF Crawler module...");

// Helper functio ======================
var industry_number_to_code = function(id) {
	if (!industry) return '';
	for (var i in industry) {
		if (industry[i].id == id) return industry[i].Text;
	}
	
	return '';
};

console.log(">> Load UAF Crawler module...");

downloadFileWget("http://ts.hcmuaf.edu.vn/data/file/Du%20lieu%20Tuyen%20sinh%202015/05082015(1).xls", function(file_path) {
        console.log("Start reading file " + file_path);
        var workbook = XLSX.readFile(file_path);
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        
        // var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var alphabet = "ABCDEFGHIJKLMNOPQRST";
        for (var row = 6; row <= 500000; row++) {
        	var student = {
                student_name: '',
                student_id: '',
                school_code: "NLS", // Ma~ truo`ng
                faculty_code: '', // Nga`nh 
                subject_group: '',
                priority: '', // So thu tu nguyen vong uu tien
                score_1 : 0,
                score_2 : 0,
                score_3 : 0,
                score_priority: 0,
                score_sum : 0
            };
            for (var i=0; i < alphabet.length; i++) {
        		var col = alphabet.charAt(i);
                var cell = col + row;
        		var currentCell = worksheet[cell];
        		if (currentCell) {
                    if (col == "B") student.faculty = student.faculty_code = currentCell.v; // Ma~ nga`nh 
                    if (col == "D") student.student_id = currentCell.v; // SBD 
                   // if (col == "E") student.priority = currentCell.v; // Do^ uu tie^n
                    if (col == "F") student.subject_group = getSubjectGroup(currentCell.v);
                    if (col == "I") student.score_1 = currentCell.v;
                    if (col == "L") student.score_2 = currentCell.v;
                    if (col == "O") student.score_3 = currentCell.v;
                    if (col == "Q") student.score_priority = parseFloat(currentCell.v);
                    if (col == "T") student.score_sum = parseFloat(currentCell.v) - student.score_priority;
                }
        	}
			if (student.student_id.length) {
				//console.log(student);
				var saver = new Student(student);
				saver.save(function (err, data) {
				  console.log('Saved ', data.student_id);
				});
			}
			
            //var saver = new Student(student);
			//saver.save(function (err, data) {
			//  console.log('Saved ', data.student_id);
			//});
        }
});
