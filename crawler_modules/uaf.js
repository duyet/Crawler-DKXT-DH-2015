var Crawler = require("crawler");
var url_module = require('url');
var Student = require('../model');

var counter = 0;

var c = new Crawler({
    maxConnections : 500,
    skipDuplicates: true,
    // This will be called for each crawled page
    callback : function (error, result, $) {
    	 var rootUrl = 'http://ts.udn.vn/TracuuView.aspx';
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
	    			student.school_code = "NLS";
	    			
					student.faculty = url_data.query.mn;
					student.faculty_code = url_data.query.mn;
					student.subject_group = getSubjectGroup(url_data.query.th);
					student.priority = parseInt(url_data.query.nv);
					
					var id = parseInt($(td[0]).text());
					if (id && id > 0) {
						td.each(function(index, td) {
	    						if (index == 2) student.student_id = $(td).text();
								if (index == 1) student.student_name = $(td).text();
	    						if (index == 5) student.score_priority = parseFloat($(td).text().trim());
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
    	console.log(">> UAF Module finish.");
    }
});

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
	{ "key": "M00", "subject": "Văn-Toán-NK" }
];

var getSubjectGroup = function(id) {
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

// =================================

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

console.log("Start UAF Module...");

for (var i in industry) {
	for (var subj in subjectGroups) {
		for (var nv in [1,2,3,4]) {
			var url = 'http://ts.hcmuaf.edu.vn/xemdsxt.php?mn='+ industry[i].id +'&th='+ subjectGroups[subj].key +'&nv=' + nv;
			c.queue(url);
		}
	}
}