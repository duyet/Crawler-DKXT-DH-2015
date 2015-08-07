var Crawler = require("crawler");
var url_module = require('url');
var Student = require('../model');

var counter = 0;

var c = new Crawler({
    maxConnections : 500,
    skipDuplicates: true,
    // This will be called for each crawled page
    callback : function (error, result, $) {
    	 var rootUrl = 'http://kqxt.ctu.edu.vn/php';
    	//var rootUrl = result.request.href || '';

    	// Get data 
    	var table = $('#tbl_result tr');
    	// console.log(table);
    	if (table.length) {
    		table.each(function(index, tr) {
	    		// console.log(tr);
	    		var td = $(tr).children('td');
	    		if (td.length) {
					var url_data = url_module.parse(result.request.href, true);
					
	    			var student = {};
	    			student.school_code = "TCT";
	    			
					student.faculty = url_data.query.manganh + "-" + url_data.query.hoaan;
					student.faculty_code = getFacultyCode(student.faculty);
					student.subject_group = getSubjectGroup(student.faculty_code, parseInt(url_data.query.tohop));
					
	    			td.each(function(index, td) {
	    					if (index == 2) student.student_id = $(td).text();
							if (index == 3) student.student_name = $(td).text();
	    					if (index == 8) student.priority = parseInt($(td).text());
	    					if (index == 7) student.score_priority = parseFloat($(td).text());
							if (index == 6) student.score_sum = parseFloat($(td).text());
	    			});
	    			// console.log(student);
	    			var saver = new Student(student);
					saver.save(function (err, st) {
						console.log('Saved ['+ counter++ +'] ', st.student_id);
					});
	    		}
	    	});
    	}
		
		// Next page 
    	$('.pager-item a').each(function(index, a) {
    		var toQueueUrl = rootUrl + $(a).attr('href');
    		console.log("Add to queue: ", toQueueUrl);
    		c.queue(toQueueUrl);
    	});
    },

    onDrain: function() {
    	console.log(">> CTU Module finish.");
    }
});

console.log(">> Load CTU Crawler module...");

// Danh sach ma nganh 
var facultyList = [
	{faculty: "D620112-0", faculty_code: "D620112", name: "Bảo vệ thực vật"},
	{faculty: "D620302-0", faculty_code: "D620302", name: "Bệnh học thủy sản"},
	{faculty: "D620105-0", faculty_code: "D620105", name: "Chăn nuôi"},
	{faculty: "D310201-0", faculty_code: "D310201", name: "Chính trị học"},
	{faculty: "D540105-0", faculty_code: "D540105", name: "Công nghệ chế biến thủy sản"},
	{faculty: "D510401-0", faculty_code: "D510401", name: "Công nghệ kỹ thuật hóa học"},
	{faculty: "D620113-0", faculty_code: "D620113", name: "Công nghệ rau hoa quả và cảnh quan"},
	{faculty: "D540104-0", faculty_code: "D540104", name: "Công nghệ sau thu hoạch"},
	{faculty: "D420201-0", faculty_code: "D420201", name: "Công nghệ sinh học"},
	{faculty: "D480201-0", faculty_code: "D480201", name: "Công nghệ thông tin"},
	{faculty: "D480201-1", faculty_code: "D480201", name: "Công nghệ thông tin (Học tại Hòa An)"},
	{faculty: "D540101-0", faculty_code: "D540101", name: "Công nghệ thực phẩm"},
	{faculty: "D140204-0", faculty_code: "D140204", name: "Giáo dục công dân"},
	{faculty: "D140206-0", faculty_code: "D140206", name: "Giáo dục thể chất"},
	{faculty: "D140202-0", faculty_code: "D140202", name: "Giáo dục Tiểu học"},
	{faculty: "D480104-0", faculty_code: "D480104", name: "Hệ thống thông tin"},
	{faculty: "D440112-0", faculty_code: "D440112", name: "Hóa học"},
	{faculty: "D340301-0", faculty_code: "D340301", name: "Kế toán"},
	{faculty: "D620110-0", faculty_code: "D620110", name: "Khoa học cây trồng"},
	{faculty: "D480101-0", faculty_code: "D480101", name: "Khoa học máy tính"},
	{faculty: "D440301-0", faculty_code: "D440301", name: "Khoa học môi trường"},
	{faculty: "D440306-0", faculty_code: "D440306", name: "Khoa học đất"},
	{faculty: "D620102-1", faculty_code: "D620102", name: "Khuyến nông (Học tại Hòa An)"},
	{faculty: "D340302-0", faculty_code: "D340302", name: "Kiểm toán"},
	{faculty: "D620114-1", faculty_code: "D620114", name: "Kinh doanh nông nghiệp (Học tại Hòa An)"},
	{faculty: "D340120-0", faculty_code: "D340120", name: "Kinh doanh quốc tế"},
	{faculty: "D340121-0", faculty_code: "D340121", name: "Kinh doanh thương mại"},
	{faculty: "D310101-0", faculty_code: "D310101", name: "Kinh tế"},
	{faculty: "D620115-0", faculty_code: "D620115", name: "Kinh tế nông nghiệp"},
	{faculty: "D620115-1", faculty_code: "D620115", name: "Kinh tế nông nghiệp (Học tại Hòa An)"},
	{faculty: "D850102-0", faculty_code: "D850102", name: "Kinh tế tài nguyên thiên nhiên"},
	{faculty: "D520114-0", faculty_code: "D520114", name: "Kỹ thuật Cơ - điện tử"},
	{faculty: "D520103-0", faculty_code: "D520103", name: "Kỹ thuật cơ khí"},
	{faculty: "D580201-0", faculty_code: "D580201", name: "Kỹ thuật công trình xây dựng"},
	{faculty: "D580201-1", faculty_code: "D580201", name: "Kỹ thuật công trình xây dựng (Học tại Hòa An)"},
	{faculty: "D520214-0", faculty_code: "D520214", name: "Kỹ thuật máy tính"},
	{faculty: "D520320-0", faculty_code: "D520320", name: "Kỹ thuật môi trường"},
	{faculty: "D480103-0", faculty_code: "D480103", name: "Kỹ thuật phần mềm"},
	{faculty: "D580212-0", faculty_code: "D580212", name: "Kỹ thuật tài nguyên nước"},
	{faculty: "D520207-0", faculty_code: "D520207", name: "Kỹ thuật điện tử, truyền thông"},
	{faculty: "D520201-0", faculty_code: "D520201", name: "Kỹ thuật điện, điện tử"},
	{faculty: "D520216-0", faculty_code: "D520216", name: "Kỹ thuật điều khiển và tự động hóa"},
	{faculty: "D620205-0", faculty_code: "D620205", name: "Lâm sinh"},
	{faculty: "D380101-0", faculty_code: "D380101", name: "Luật"},
	{faculty: "D380101-1", faculty_code: "D380101", name: "Luật (Học tại Hòa An)"},
	{faculty: "D340115-0", faculty_code: "D340115", name: "Marketing"},
	{faculty: "D220201-0", faculty_code: "D220201", name: "Ngôn ngữ Anh"},
	{faculty: "D220201-1", faculty_code: "D220201", name: "Ngôn ngữ Anh (Học tại Hòa An)"},
	{faculty: "D220203-0", faculty_code: "D220203", name: "Ngôn ngữ Pháp"},
	{faculty: "D620109-0", faculty_code: "D620109", name: "Nông học"},
	{faculty: "D620109-1", faculty_code: "D620109", name: "Nông học (Học tại Hòa An)"},
	{faculty: "D620301-0", faculty_code: "D620301", name: "Nuôi trồng thủy sản"},
	{faculty: "D620301-1", faculty_code: "D620301", name: "Nuôi trồng thủy sản (Học tại Hòa An)"},
	{faculty: "D620116-0", faculty_code: "D620116", name: "Phát triển nông thôn"},
	{faculty: "D510601-0", faculty_code: "D510601", name: "Quản lý công nghiệp"},
	{faculty: "D620305-0", faculty_code: "D620305", name: "Quản lý nguồn lợi thủy sản"},
	{faculty: "D850101-0", faculty_code: "D850101", name: "Quản lý tài nguyên và môi trường"},
	{faculty: "D850103-0", faculty_code: "D850103", name: "Quản lý đất đai"},
	{faculty: "D340103-0", faculty_code: "D340103", name: "Quản trị dịch vụ du lịch và lữ hành"},
	{faculty: "D340101-0", faculty_code: "D340101", name: "Quản trị kinh doanh"},
	{faculty: "D340101-1", faculty_code: "D340101", name: "Quản trị kinh doanh (Học tại Hòa An)"},
	{faculty: "D420101-0", faculty_code: "D420101", name: "Sinh học"},
	{faculty: "D420203-0", faculty_code: "D420203", name: "Sinh học ứng dụng"},
	{faculty: "D140212-0", faculty_code: "D140212", name: "Sư phạm Hóa học"},
	{faculty: "D140218-0", faculty_code: "D140218", name: "Sư phạm Lịch sử"},
	{faculty: "D140217-0", faculty_code: "D140217", name: "Sư phạm Ngữ văn"},
	{faculty: "D140213-0", faculty_code: "D140213", name: "Sư phạm Sinh học"},
	{faculty: "D140231-0", faculty_code: "D140231", name: "Sư phạm Tiếng Anh"},
	{faculty: "D140233-0", faculty_code: "D140233", name: "Sư phạm Tiếng Pháp"},
	{faculty: "D140209-0", faculty_code: "D140209", name: "Sư phạm Toán học"},
	{faculty: "D140211-0", faculty_code: "D140211", name: "Sư phạm Vật lý"},
	{faculty: "D140219-0", faculty_code: "D140219", name: "Sư phạm Địa lý"},
	{faculty: "D340201-0", faculty_code: "D340201", name: "Tài chính - Ngân hàng"},
	{faculty: "D320201-0", faculty_code: "D320201", name: "Thông tin học"},
	{faculty: "D640101-0", faculty_code: "D640101", name: "Thú y"},
	{faculty: "D460112-0", faculty_code: "D460112", name: "Toán ứng dụng"},
	{faculty: "D220301-0", faculty_code: "D220301", name: "Triết học"},
	{faculty: "D480102-0", faculty_code: "D480102", name: "Truyền thông và mạng máy tính"},
	{faculty: "D220330-0", faculty_code: "D220330", name: "Văn học"},
	{faculty: "D520401-0", faculty_code: "D520401", name: "Vật lý kỹ thuật"},
	{faculty: "D220113-0", faculty_code: "D220113", name: "Việt Nam học"},
	{faculty: "D220113-1", faculty_code: "D220113", name: "Việt Nam học (Học tại Hòa An)"},
	{faculty: "D310301-0", faculty_code: "D310301", name: "Xã hội học"},	
];

var faculySubject = [
		{faculty_code: "D140202", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Văn-Pháp", quota: 60},
		{faculty_code: "D140204", subject_group: "Văn-Sử-Địa", subject_group_new: "Văn-Địa-Anh", quota: 60},
		{faculty_code: "D140206", subject_group: "Toán-Sinh-NK", subject_group_new: "Toán-Hóa-NK", quota: 60},
		{faculty_code: "D140209", subject_group: "Toán-Lí-Hóa", subject_group_new: "Toán-Sinh-Anh", quota: 100},
		{faculty_code: "D140211", subject_group: "Toán-Lí-Hóa", subject_group_new: "Toán-Lí-Pháp", quota: 100},
		{faculty_code: "D140212", subject_group: "Toán-Lí-Hóa", subject_group_new: "Toán-Hóa-Pháp", quota: 60},
		{faculty_code: "D140213", subject_group: "Toán-Hóa-Sinh", subject_group_new: "", quota: 80},
		{faculty_code: "D140217", subject_group: "Văn-Sử-Địa", subject_group_new: "Văn-Địa-Anh", quota: 60},
		{faculty_code: "D140218", subject_group: "Văn-Sử-Địa", subject_group_new: "Văn-Sử-Pháp", quota: 60},
		{faculty_code: "D140219", subject_group: "Văn-Sử-Địa", subject_group_new: "Văn-Địa-Pháp", quota: 40},
		{faculty_code: "D140231", subject_group: "Văn-Toán-Anh", subject_group_new: "Văn-Địa-Anh", quota: 80},
		{faculty_code: "D140233", subject_group: "Văn-Toán-Pháp", subject_group_new: "Văn-Toán-Anh", quota: 60},
		{faculty_code: "D220113", subject_group: "Văn-Sử-Địa", subject_group_new: "Văn-Địa-Anh", quota: 80},
		{faculty_code: "D220201", subject_group: "Văn-Toán-Anh", subject_group_new: "Văn-Địa-Anh", quota: 160},
		{faculty_code: "D220203", subject_group: "Văn-Toán-Pháp", subject_group_new: "Toán-Lí-Pháp", quota: 80},
		{faculty_code: "D220301", subject_group: "Văn-Sử-Địa", subject_group_new: "Văn-Địa-Anh", quota: 80},
		{faculty_code: "D220330", subject_group: "Văn-Sử-Địa", subject_group_new: "Văn-Địa-Anh", quota: 100},
		{faculty_code: "D310101", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Văn-Hóa", quota: 100},
		{faculty_code: "D310201", subject_group: "Văn-Sử-Địa", subject_group_new: "Văn-Địa-Anh", quota: 80},
		{faculty_code: "D320201", subject_group: "Toán-Lí-Anh", subject_group_new: "Văn-Toán-Pháp", quota: 80},
		{faculty_code: "D340101", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Văn-Hóa", quota: 140},
		{faculty_code: "D340103", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Văn-Hóa", quota: 120},
		{faculty_code: "D340115", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Văn-Hóa", quota: 100},
		{faculty_code: "D340120", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Văn-Hóa", quota: 120},
		{faculty_code: "D340121", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Văn-Hóa", quota: 80},
		{faculty_code: "D340201", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Văn-Hóa", quota: 160},
		{faculty_code: "D340301", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Văn-Hóa", quota: 120},
		{faculty_code: "D340302", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Văn-Hóa", quota: 80},
		{faculty_code: "D380101", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Văn-Pháp", quota: 300},
		{faculty_code: "D420101", subject_group: "Toán-Hóa-Sinh", subject_group_new: "", quota: 0},
		{faculty_code: "D420201", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Hóa-Sinh", quota: 160},
		{faculty_code: "D420203", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Hóa-Sinh", quota: 60},
		{faculty_code: "D440112", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Hóa-Sinh", quota: 120},
		{faculty_code: "D440301", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Hóa-Sinh", quota: 120},
		{faculty_code: "D440306", subject_group: "Toán-Hóa-Sinh", subject_group_new: "Toán-Sinh-Anh", quota: 80},
		{faculty_code: "D460112", subject_group: "Toán-Lí-Hóa", subject_group_new: "", quota: 60},
		{faculty_code: "D480101", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Anh", quota: 100},
		{faculty_code: "D480102", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Anh", quota: 100},
		{faculty_code: "D480103", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Anh", quota: 100},
		{faculty_code: "D480104", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Anh", quota: 100},
		{faculty_code: "D480201", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Anh", quota: 200},
		{faculty_code: "D510401", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Anh", quota: 120},
		{faculty_code: "D510601", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Anh", quota: 120},
		{faculty_code: "D520103", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Anh", quota: 240},
		{faculty_code: "D520114", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Anh", quota: 120},
		{faculty_code: "D520201", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Anh", quota: 120},
		{faculty_code: "D520207", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Anh", quota: 120},
		{faculty_code: "D520214", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Anh", quota: 120},
		{faculty_code: "D520216", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Anh", quota: 120},
		{faculty_code: "D520320", subject_group: "Toán-Lí-Hóa", subject_group_new: "Toán-Hóa-Anh", quota: 120},
		{faculty_code: "D520401", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Anh", quota: 60},
		{faculty_code: "D540101", subject_group: "Toán-Lí-Hóa", subject_group_new: "Toán-Hóa-Sinh", quota: 180},
		{faculty_code: "D540105", subject_group: "Toán-Lí-Hóa", subject_group_new: "Toán-Hóa-Sinh", quota: 120},
		{faculty_code: "D580201", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Anh", quota: 300},
		{faculty_code: "D580212", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Anh", quota: 80},
		{faculty_code: "D620105", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Sinh", quota: 120},
		{faculty_code: "D620109", subject_group: "Toán-Hóa-Sinh", subject_group_new: "", quota: 80},
		{faculty_code: "D620110", subject_group: "Toán-Hóa-Sinh", subject_group_new: "Toán-Sinh-Anh", quota: 180},
		{faculty_code: "D620112", subject_group: "Toán-Hóa-Sinh", subject_group_new: "", quota: 160},
		{faculty_code: "D620113", subject_group: "Toán-Hóa-Sinh", subject_group_new: "Toán-Hóa-Pháp", quota: 60},
		{faculty_code: "D620115", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Văn-Hoá", quota: 120},
		{faculty_code: "D620116", subject_group: "Toán-Lí-Hóa", subject_group_new: "Toán-Hóa-Anh", quota: 120},
		{faculty_code: "D620205", subject_group: "Toán-Lí-Hóa", subject_group_new: "Toán-Lí-Sinh", quota: 80},
		{faculty_code: "D620301", subject_group: "Toán-Hóa-Sinh", subject_group_new: "Toán-Lí-Sinh", quota: 160},
		{faculty_code: "D620302", subject_group: "Toán-Hóa-Sinh", subject_group_new: "Toán-Lí-Sinh", quota: 80},
		{faculty_code: "D620305", subject_group: "Toán-Lí-Hóa", subject_group_new: "Toán-Lí-Sinh", quota: 60},
		{faculty_code: "D640101", subject_group: "Toán-Hóa-Sinh", subject_group_new: "Toán-Lí-Sinh", quota: 160},
		{faculty_code: "D850101", subject_group: "Toán-Lí-Hóa", subject_group_new: "Toán-Hóa-Anh", quota: 80},
		{faculty_code: "D850102", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Văn-Hoá", quota: 80},
		{faculty_code: "D850103", subject_group: "Toán-Lí-Hóa", subject_group_new: "Toán-Lí-Sinh", quota: 120},
		{faculty_code: "D540104", subject_group: "Toán-Lí-Hóa", subject_group_new: "Toán-Hóa-Sinh", quota: 0},
		{faculty_code: "D310301", subject_group: "Toán-Lí-Anh", subject_group_new: "Toán-Văn-Anh", quota: 0},
		{faculty_code: "D220113", subject_group: "Văn-Sử-Địa", subject_group_new: "Văn-Địa-Anh", quota: 80},
		{faculty_code: "D220201", subject_group: "Văn-Toán-Anh", subject_group_new: "Văn-Địa-Anh", quota: 80},
		{faculty_code: "D340101", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Văn-Hoá", quota: 80},
		{faculty_code: "D380101", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Văn-Pháp", quota: 80},
		{faculty_code: "D480201", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Anh", quota: 160},
		{faculty_code: "D580201", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Lí-Anh", quota: 80},
		{faculty_code: "D620109", subject_group: "Toán-Hóa-Sinh", subject_group_new: "", quota: 80},
		{faculty_code: "D620115", subject_group: "Toán-Lí-Hoá", subject_group_new: "Toán-Văn-Hoá", quota: 80},
		{faculty_code: "D620102", subject_group: "Toán-Lí-Hóa", subject_group_new: "Toán-Hóa-Anh", quota: 80},
		{faculty_code: "D620301", subject_group: "Toán-Hóa-Sinh", subject_group_new: "Toán-Lí-Sinh", quota: 80},
		{faculty_code: "D620114", subject_group: "Toán-Lí-Hóa", subject_group_new: "Toán-Văn-Hóa", quota: 80},
];

var getFacultyCode = function(faculty) {
	for (var i in facultyList) {
		if (facultyList[i].faculty === faculty) return facultyList[i].faculty_code;
	}
	
	return "";
}

var getSubjectGroup = function(facultyCode, _type) {
	for (var i in faculySubject) {
		if (faculySubject[i].faculty_code == facultyCode) {
			if (_type && _type == 1) return faculySubject[i].subject_group ? faculySubject[i].subject_group : "";
			return faculySubject[i].subject_group_new ? faculySubject[i].subject_group_new : "";
		}
	}
	
	return "";
}

function range(start, count) {
	return Array.apply(0, Array(count))
	.map(function (element, index) { 
		return index + start;  
	});
}

// =======================================
for (var faculy_index in facultyList) {
	for (var _tohop in [0, 1]) {
		for (var page in range(1,50)) {
			var faculty = facultyList[faculy_index].faculty.split("-");
			var _manganh = faculty[0]; 
			var _hoaan = parseInt(faculty[1]) || 0;	
					
			var url = "http://kqxt.ctu.edu.vn/php/dsnganh.php?manganh="+ _manganh +"&hoaan="+ _hoaan +"&page="+ page +"&tohop=" + _tohop;
			console.log("Request to ", url);
			c.queue(url);
		}
	}		
}