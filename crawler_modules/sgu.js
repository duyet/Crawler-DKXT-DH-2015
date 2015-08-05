'use strict';

var url = require('url');
var http = require('http');
var path = require('path');
var fs = require('fs');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;
var XLSX = require('xlsx');

var Student = require('../model');
var Crawler = require("crawler");

var c = new Crawler({
    maxConnections : 10,
    skipDuplicates: true,
    // This will be called for each crawled page
    callback : function (error, result, $) {
    	// Get data 
    	var a = $('a');
    	// console.log(table);
    	if (a.length) {
    		a.each(function(index, _a) {
	    		// console.log(tr);
	    		var xls_file = $(_a).attr("href");
                console.log(xls_file);
                if (path.extname(xls_file) == ".xls") {
                    console.log(xls_file);
                    downloadFileWget(xls_file, function(file_path) {
                            var workbook = XLSX.readFile(file_path);
                            var first_sheet_name = workbook.SheetNames[0];
                            var worksheet = workbook.Sheets[first_sheet_name];
                            
                            // var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                            var alphabet = "ABCDEFGHIJKLMNOPQRS";
                            for (var row = 6; row <= 500000; row++) {
                            	var student = {
                                    student_name: '',
                                    student_id: '',
                                    school_id: "SGD", // Ma~ truo`ng
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
                                        if (col == "B") student.faculty_code = currentCell.v; // Ma~ nga`nh 
                                        if (col == "D") student.student_id = currentCell.v; // SBD 
                                        if (col == "E") student.priority = currentCell.v; // Do^ uu tie^n
                                        if (col == "F") student.subject_group = getSubjectGroup(currentCell.v);
                                        if (col == "I") student.score_1 = currentCell.v;
                                        if (col == "L") student.score_2 = currentCell.v;
                                        if (col == "O") student.score_3 = currentCell.v;
                                        if (col == "Q") student.score_priority = parseFloat(currentCell.v);
                                        if (col == "S") student.score_sum = parseFloat(currentCell.v) - student.score_priority;
                                    }
                            	}
                                var saver = new Student(student);
            					saver.save(function (err, data) {
            					  console.log('Saved ', data.student_id);
            					});
                            }
                    });
                }
	    	});
    	}
    },

    onDrain: function() {
    	console.log(">> SGU Module finish.");
    }
});

var downloadPath = "tmp/";

// Function to download file using wget
var downloadFileWget = function(file_url, callback) {

    // extract the file name
    var file_name = getFileName(file_url);
    // compose the wget command
    var wget = 'wget -P ' + downloadPath + ' ' + file_url;
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
           { key: "A00", subject: "Toán-Lý-Hóa" },
           { key: "A01", subject: "Toán-Lý-Anh" },
           { key: "B00", subject: "Toán-Hóa-Sinh" },
           { key: "B03", subject: "" },
           { key: "C00", subject: "Văn-Sử-Địa" },
           { key: "C01", subject: "" },
           { key: "C02", subject: "" },
           { key: "C03", subject: "" },
           { key: "C04", subject: "" },
           { key: "D01", subject: "" },
           { key: "D07", subject: "" },
           { key: "D10", subject: "" },
           { key: "D14", subject: "" },
           { key: "H00", subject: "Văn-Họa" },
           { key: "M01", subject: "Văn-Toán-NK" },
           { key: "N00", subject: "Văn-NK-NK" },
      ];
      
      for (var id in a) if (a[id].key == search) return a[id].subject;
      return "";
};

console.log(">> Load SGU Crawler module...");
c.queue([
	'http://www.sgu.edu.vn/index.php?option=com_content&view=article&id=4411%3Adanh-sach-thi-sinh-ng-ki-xet-tuyn-nguyn-vng-i-n-ht-ngay-03082015&catid=475%3Atuyn-sinh-2015&Itemid=609',
]);