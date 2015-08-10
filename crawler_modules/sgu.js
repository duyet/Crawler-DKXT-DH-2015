var Crawler = require("crawler");
var url_module = require('url');
var Student = require('../model');

var counter = 0;

var c = new Crawler({
    maxConnections : 500,
    skipDuplicates: true,
    // This will be called for each crawled page
    callback : function (error, result, $) {
    	 var rootUrl = 'http://daotao.sgu.edu.vn/xettuyen/index.php';
    	//var rootUrl = result.request.href || '';

    	// Get data 
    	var table = $('table tr');
    	// console.log(table);
    	if (table.length) {
    		table.each(function(index, tr) {
	    		// console.log(tr);
	    		var td = $(tr).children('td');
	    		if (td.length) {
					var url_data = url_module.parse(result.request.href, true);
					
	    			var student = {};
	    			student.school_code = "SGD";
	    			
					student.faculty = url_data.query.Nganh;
					student.faculty_code = student.faculty;
					student.subject_group = getSubjectGroup($('#ToHop option').val());
					
					var id = parseInt($(td[0]).text());
					if (id && id > 0) {
						td.each(function(index, td) {
	    						if (index == 1) student.student_id = $(td).text();
								if (index == 2) student.student_name = $(td).text();
	    						if (index == 3) student.priority = parseInt($(td).text());
	    						if (index == 5) student.score_priority = parseFloat($(td).text());
								if (index == 4) student.score_sum = parseFloat($(td).text());
		    			});
		    			//console.log(student);
		    			var saver = new Student(student);
						saver.save(function (err, st) {
							console.log('Saved ['+ counter++ +'] ', st.student_id);
						});	
					}
	    		}
	    	});
    	}
    },

    onDrain: function() {
    	console.log(">> SGU Module finish.");
    }
});

var getSubjectGroup = function(id) {
	var subjectGroups = [
		{ "key": "A00", "subject": "Toán-Lý-Hoá" },
		{ "key": "A01", "subject": "Toán-Lý-Anh" },
		{ "key": "B00", "subject": "Toán-Hóa-Sinh" },
		{ "key": "D01", "subject": "Toán-Văn-Anh" },
		{ "key": "D02", "subject": "Văn-Toán-Nga" },
		{ "key": "D03", "subject": "Văn-Toán-Pháp" },
		{ "key": "D04", "subject": "Văn-Toán-Trung" },
		{ "key": "D06", "subject": "Văn-Toán-Nhật" },
		{ "key": "D07", "subject": "Toán-Hóa-Anh" },
		{ "key": "D08", "subject": "Toán-Sinh-Anh" },
		{ "key": "C00", "subject": "Văn-Sử-Địa" },
		{ "key": "C01", "subject": "Văn-Toán-Lý" },
		{ "key": "V01", "subject": "Toán-Văn-Vẽ" },
		{ "key": "N00", "subject": "Văn-NK-NK" },
		{ "key": "M00", "subject": "Văn-Toán-NK" },
	];
	
	for (var i in subjectGroups) {
		if (subjectGroups[i].key == id) return subjectGroups[i].subject;
	}
	
	return "";
};

var getScorePriority = function(religion) {
	var scores = [
		{ code: "KV1", score: 1.5}, 
		{ code: "KV2-NT", score: 1.0},
		{ code: "KV2", score: 0.5},
		{ code: "KV3", score: 0.0},
		
	];
	
	for (var i in scores) {
		if (religion == scores[i].code) return scores[i].score;
	}
	
	return 0.0;
}

c.queue([
	'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D510406A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D510406B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D510406C&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D510302A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D510302B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D510301A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D510301B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D480201A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D480201B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140205A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140205B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140204A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140204B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140201A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140201B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140201C&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140201A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140201B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140201C&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140202A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140202B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140202C&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140202A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140202B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140202C&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D340301A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D340301B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D440301A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D440301B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D440301C&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D320202A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D320202B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D320202C&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D520207A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D520207B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D520201A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D520201B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D380101A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D380101B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D220201A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D220201B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140114A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140114B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140114C&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D340101A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D340101B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D340406A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D340406B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D340406C&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D220212A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D220212B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140221A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140221B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140212&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140212&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140214A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140214B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140214C&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140214D&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140215A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140215B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140215C&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140215D&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140216A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140216B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140216C&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140216D&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140218A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140218B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140218A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140218B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140222A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140222B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140217A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140217B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140217A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140217B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140213&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140213&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140231A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140231B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140231A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140231B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140209A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140209B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140209A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140209B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140211&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140211&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140219A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140219B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=C140219C&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140219A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140219B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D140219C&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D340201A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D340201B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D310401A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D310401B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D460112A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D460112B&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D220113A&ToHop=A01&search=1',
    'http://daotao.sgu.edu.vn/xettuyen/index.php?Nganh=D220113B&ToHop=A01&search=1',
]);