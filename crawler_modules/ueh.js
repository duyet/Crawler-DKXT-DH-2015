var querystring = require('querystring');
var http = require('http');
var fs = require('fs');
var Student = require('../model');

function PostCode(industry_number, ma_khoi) {
	var post_data = '{"MaDotXet":"1","MaNganh":"'+ industry_number +'","MaKhoi":"'+ ma_khoi +'","MaUutien":"-1","ToDate":"8/3/2015"}';
	// An object of options to indicate where to post to
	var post_options = {
		host: 'tuyensinh.dev.ueh.edu.vn',
		port: '80',
		path: '/WebAPI/api/HosoThisinh/rptHosoThisinhWithDateFilterRows',
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Cache-Control': 'no-cache',
			//'Content-Length': post_data.length
		}
	};

	// Set up the request
	var post_req = http.request(post_options, function(res) {
		res.setEncoding('utf8');
		var temp_filepath = 'tmp/ueh_data_'+ Math.round(Math.random() * 10000000) +'.json';
		
		// Remove tmp file.
		fs.unlink(temp_filepath, function (err) {
			if (err) console.log('Remove tmp file: FAIL');
			else console.log('Remove tmp file: OK');
		});
		console.log("Fetching .");
		res.on('data', function (chunk) {
			// Convert json array of object to each line as object
			/*
				Ex: 

				{"MaHoso":0,"Sobaodanh":"TCT020326","Hovaten":"Võ Nguyễn Vũ Toàn","Ngaysinh":null,"Email":null,"CMND":null,"DiDong":null,"Tinh":null,"Nhanhoso":null,"NguoiNhan":null,"NgayNhan":null,"UT1":null,"UT2":null,"UT3":null,"UT4":null,"Doituong":null,"Khuvuc":null,"DoituongEdit":null,"KhuvucEdit":null,"DoUutien":1,"DiemThi":"27.25","DiemKV":"0.00","DiemDT":"0.00","TongDiem":"27.25","DiemUutien":"0.00","Gioitinh":null,"Dienthoai":null,"Diachi":null,"Truong":null,"NoHoSo":null,"DoiDTKV":false},
				{"MaHoso":0,"Sobaodanh":"TCT020326","Hovaten":"Võ Nguyễn Vũ Toàn","Ngaysinh":null,"Email":null,"CMND":null,"DiDong":null,"Tinh":null,"Nhanhoso":null,"NguoiNhan":null,"NgayNhan":null,"UT1":null,"UT2":null,"UT3":null,"UT4":null,"Doituong":null,"Khuvuc":null,"DoituongEdit":null,"KhuvucEdit":null,"DoUutien":1,"DiemThi":"27.25","DiemKV":"0.00","DiemDT":"0.00","TongDiem":"27.25","DiemUutien":"0.00","Gioitinh":null,"Dienthoai":null,"Diachi":null,"Truong":null,"NoHoSo":null,"DoiDTKV":false},
				
			*/
			var data = chunk.replace("[{", "{");
			data = data.replace(/\},/g, "}\n");
			data = data.replace(/,\{/g, "\n{");
			data = data.replace(/\},\{/g, "}\n{");
			// data = data.replace("},", "}\n");
			data = data.replace("]", "");

			// B/c data file is too large, i will stream it to tmp file.
			fs.appendFile(temp_filepath, data, function(err) {
			    if(err) {
			        return console.log(err);
			    }
			    // console.log(".");
			}); 
		});

		res.on('end', function() {
			var LineByLineReader = require('line-by-line');
			var lr = new LineByLineReader(temp_filepath);

			lr.on('error', function (err) {
				console.error("Streaming file error!");
			});

			lr.on('line', function (line) {
					line = line.replace("[", "").trim()
					if (line.length) {
						var line_data = JSON.parse(line) || false;
						if (line_data) {
							// console.log(line_data)
							var student = {
								student_name: line_data.Hovaten || '',
								student_id: line_data.Sobaodanh || '',
								school_code: "KSA", // Ma~ truo`ng
								faculty_code: industry_number_to_code(industry_number), // Nga`nh
								faculty: industry_number_to_code(industry_number), // Nga`nh 
								subject_group: tohopmon(ma_khoi),
								priority: line_data.DoUutien, // So thu tu nguyen vong uu tien
								//score_1 : { type: Number, default: 0 }, // Diem mon 1
								//score_2 : { type: Number, default: 0 }, // Diem mon 2
								//score_3 : { type: Number, default: 0 }, // Diem mon 3
								score_priority: line_data.DiemUutien, // Diem uu tien
								score_sum : line_data.DiemThi, // Tong so diem
							};
		
							var saver = new Student(student);
							saver.save(function (err, data) {
								if (err) console.log('Error ', err.message);
								else console.log('Saved ', data._id);
							});
						}
						
					}
					
				

			});

		});
	});

  // post the data
  post_req.write(post_data);
  post_req.end();

}

// Include static data 
var group_id = [1,2,3];
var industry = [
	{"id": 1, "Ma":"D310101","Ten":"Kinh tế"},
	{"id": 2, "Ma":"D340101","Ten":"Quản trị kinh doanh"},
	{"id": 3, "Ma":"D340103","Ten":"Quản trị dịch vụ du lịch và lữ hành"},
	{"id": 4, "Ma":"D340115","Ten":"Marketing"},
	{"id": 5, "Ma":"D340120","Ten":"Kinh doanh quốc tế"},
	{"id": 6, "Ma":"D340121","Ten":"Kinh doanh thương mại"},
	{"id": 7, "Ma":"D340201","Ten":"Tài chính - Ngân hàng"},
	{"id": 8, "Ma":"D340301","Ten":"Kế toán"},
	{"id": 9, "Ma":"D340405","Ten":"Hệ thống thông tin quản lý"},
	{"id": 10, "Ma":"D380101","Ten":"Luật kinh doanh"},
	//{"id": 11, "Ma":"DN","Ten":"Tieng Anh Thuong Mai"},
];

console.log(">> Load UEH Crawler module...");

// Helper functio ======================
var industry_number_to_code = function(id) {
	if (!industry) return '';
	for (var i in industry) {
		if (industry[i].id == id) return industry[i].Ma;
	}
	
	return '';
};

var tohopmon = function(id) {
	if (id == 1) return "Toán-Lý-Hóa";
	if (id == 2) return "Toán-Lý-Anh";
	if (id == 3) return "Toán-Văn-Anh";
	
	return "";
}

for (var i in industry) {
	for (var j in group_id) {
		PostCode(industry[i].id, j);
	}
}
