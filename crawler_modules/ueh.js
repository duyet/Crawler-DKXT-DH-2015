var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

function PostCode(post_data) {
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
				{"MaHoso":0,"Sobaodanh":"TCT020326","Hovaten":"Võ Nguyễn Vũ Toàn","Ngaysinh":null,"Email":null,"CMND":null,"DiDong":null,"Tinh":null,"Nhanhoso":null,"NguoiNhan":null,"NgayNhan":null,"UT1":null,"UT2":null,"UT3":null,"UT4":null,"Doituong":null,"Khuvuc":null,"DoituongEdit":null,"KhuvucEdit":null,"DoUutien":2,"DiemThi":"27.25","DiemKV":"0.00","DiemDT":"0.00","TongDiem":"27.25","DiemUutien":"0.00","Gioitinh":null,"Dienthoai":null,"Diachi":null,"Truong":null,"NoHoSo":null,"DoiDTKV":false},{"MaHoso":0,"Sobaodanh":"TCT020326","Hovaten":"Võ Nguyễn Vũ Toàn","Ngaysinh":null,"Email":null,"CMND":null,"DiDong":null,"Tinh":null,"Nhanhoso":null,"NguoiNhan":null,"NgayNhan":null,"UT1":null,"UT2":null,"UT3":null,"UT4":null,"Doituong":null,"Khuvuc":null,"DoituongEdit":null,"KhuvucEdit":null,"DoUutien":3,"DiemThi":"27.25","DiemKV":"0.00","DiemDT":"0.00","TongDiem":"27.25","DiemUutien":"0.00","Gioitinh":null,"Dienthoai":null,"Diachi":null,"Truong":null,"NoHoSo":null,"DoiDTKV":false},{"MaHoso":0,"Sobaodanh":"TCT020326","Hovaten":"Võ Nguyễn Vũ Toàn","Ngaysinh":null,"Email":null,"CMND":null,"DiDong":null,"Tinh":null,"Nhanhoso":null,"NguoiNhan":null,"NgayNhan":null,"UT1":null,"UT2":null,"UT3":null,"UT4":null,"Doituong":null,"Khuvuc":null,"DoituongEdit":null,"KhuvucEdit":null,"DoUutien":4,"DiemThi":"27.25","DiemKV":"0.00","DiemDT":"0.00","TongDiem":"27.25","DiemUutien":"0.00","Gioitinh":null,"Dienthoai":null,"Diachi":null,"Truong":null,"NoHoSo":null,"DoiDTKV":false},{"MaHoso":0,"Sobaodanh":"SPK002615","Hovaten":"Vòng Chủ Đạt ","Ngaysinh":null,"Email":null,"CMND":null,"DiDong":null,"Tinh":null,"Nhanhoso":null,"NguoiNhan":null,"NgayNhan":null,"UT1":null,"UT2":null,"UT3":null,"UT4":null,"Doituong":null,"Khuvuc":null,"DoituongEdit":null,"KhuvucEdit":null,"DoUutien":1,"DiemThi":"23.25","DiemKV":"1.50","DiemDT":"2.00","TongDiem":"26.75","DiemUutien":"3.50","Gioitinh":null,"Dienthoai":null,"Diachi":null,"Truong":null,"NoHoSo":null,"DoiDTKV":false},{"MaHoso":0,"Sobaodanh":"YDS013218","Hovaten":"Lê Thị Thu Thảo ","Ngaysinh":null,"Email":null,"CMND":null,"DiDong":null,"Tinh":null,"Nhanhoso":null,"NguoiNhan":null,"NgayNhan":null,"UT1":null,"UT2":null,"UT3":null,"UT4":null,"Doituong":null,"Khuvuc":null,"DoituongEdit":null,"KhuvucEdit":null,"DoUutien":1,"DiemThi":"25.25","DiemKV":"1.50","DiemDT":"0.00","TongDiem":"26.75","DiemUutien":"1.50","Gioitinh":null,"Dienthoai":null,"Diachi":null,"Truong":null,"NoHoSo":null,"DoiDTKV":false},
				
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
			    console.log(".");
			}); 
		});

		res.on('end', function() {
			var LineByLineReader = require('line-by-line');
			lr = new LineByLineReader(temp_filepath);

			lr.on('error', function (err) {
				console.error("Streaming file error!");
			});

			lr.on('line', function (line) {
				try {
					var line_data = JSON.parse(line);
					var student = {
						ho_ten: line_data.Hovaten || '',
						so_bao_danh: line_data.Sobaodanh || '',
						ma_truong: "UEH", // Ma~ truo`ng
						ma_nganh: , // Nga`nh 
						uu_tien_nguyen_vong: { type: Number, default: 0 }, // So thu tu nguyen vong uu tien
						diem_1 : { type: Number, default: 0 }, // Diem mon 1
						diem_2 : { type: Number, default: 0 }, // Diem mon 2
						diem_3 : { type: Number, default: 0 }, // Diem mon 3
						diem_uu_tien: { type: Number, default: 0 }, // Diem uu tien
						tong_diem : { type: Number, default: 0 }, // Tong so diem
					};

					var saver = new model(student);
					saver.save(function (err, data) {
					  console.log('Saved ', data._id);
					});
				} catch (e) {
					console.log("Parse data error, line: ", line);
				}

			});

		});
	});

  // post the data
  post_req.write(post_data);
  post_req.end();

}

// Include static data 
var ma_khoi = [1,2,3];
var ma_nganh = [
	{"Ma":"D310101","Ten":"Kinh tế"},
	{"Ma":"D340101","Ten":"Quản trị kinh doanh"},
	{"Ma":"D340103","Ten":"Quản trị dịch vụ du lịch và lữ hành"},
	{"Ma":"D340115","Ten":"Marketing"},
	{"Ma":"D340120","Ten":"Kinh doanh quốc tế"},
	{"Ma":"D340121","Ten":"Kinh doanh thương mại"},
	{"Ma":"D340201","Ten":"Tài chính - Ngân hàng"},
	{"Ma":"D340301","Ten":"Kế toán"},
	{"Ma":"D340405","Ten":"Hệ thống thông tin quản lý"},
	{"Ma":"D380101","Ten":"Luật kinh doanh"}
];

console.log(">> Load UEH Crawler module...");
PostCode('{"MaDotXet":"1","MaNganh":"13","MaKhoi":"1","MaUutien":"-1","ToDate":"8/3/2015"}');