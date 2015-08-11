var Student = require("../../../../model");

module.exports = function(req, res) {
		var sheet_url = 'https://docs.google.com/spreadsheets/d/1al8YXe2ZrMylnlgA-luGboX2IVomYTSACbXFF2Xy0fM/edit#gid=1412294226';
		console.log("Update sheet data at ", sheet_url);
		
		if (!req.body.school_id) {
			return res.send("Error! Missing school data info.");	
		}
		
		var GoogleSpreadsheet = require("google-spreadsheet");
		 
		// spreadsheet key is the long id in the sheets URL 
		console.log("Reading spreadsheet id ", req.body.googlespreadsheet);
		var my_sheet = new GoogleSpreadsheet(req.body.googlespreadsheet);
		
		var count = 0;
		var creds = require('../../../../DuyetDev-a6965be6b9c8.json');
		
		my_sheet.useServiceAccountAuth(creds, function(err){
			my_sheet.getInfo( function( err, sheet_info ){
				if (err) console.log(err);
				
				else {
					var sheetId = [
						{id: 1, faculty: "", subject_group: "Toán-Lý-Hóa"},
						{id: 2, faculty: "", subject_group: "Toán-Lý-Anh"},
						{id: 3, faculty: "", subject_group: "Toán-Văn-Anh"},
						{id: 4, faculty: "", subject_group: "Toán-Văn-Nhật"},
						{id: 5, faculty: "", subject_group: "Toán-Lý-Hóa"},
						{id: 6, faculty: "", subject_group: "Toán-Lý-Anh"},
						{id: 7, faculty: "", subject_group: "Toán-Văn-Anh"},
						{id: 8, faculty: "", subject_group: "Toán-Lý-Hóa																										"},
						{id: 9, faculty: "", subject_group: "Toán-Lý-Anh"},
						{id: 10, faculty: "", subject_group: "Toán-Văn-Anh"},
					];
					var getFaculty = function(sheet_id) {
						for (var i in sheetId) {
							if (sheetId[i].id == sheet_id) return sheetId[i].faculty;
						}
						
						return "";
					}
					var getSubjectGroup = function(sheet_id) {
						for (var i in sheetId) {
							if (sheetId[i].id == sheet_id) return sheetId[i].subject_group;
						}
						
						return "";
					}
					
					for (var i in sheetId) {
						var sheet = sheet_info.worksheets[sheetId[i].id - 1];
						// console.log(sheet);
						if (sheet) {
							sheet.getRows( function( err, rows ){ 
					            if (rows) {
									rows.forEach(function(row) {
										var student = {
						                      student_name: row["họvà"] + " " + row["tên"],
						                      student_id: row["sốbáodanh"],
						                      school_code: "NTS", // Ma~ truo`ng
						                      faculty_code: sheet.title, // Nga`nh
											  faculty: sheet.title, // Nga`nh 
						                      subject_group: getSubjectGroup(sheetId[i].id),
						                      priority: parseInt(row["thứtựnguyệnvọngđăngký"].replace(",", ".")), // So thu tu nguyen vong uu tien
						                      score_1 : 0,
						                      score_2 : 0,
						                      score_3 : 0,
						                      score_priority: parseFloat(row["điểmưutiên"].replace(",", ".")),
						                      score_sum : parseFloat(row["kếtquảthi"].replace(",", "."))
						                  };
										  
										  if (student.score_sum > 0) {
											  var saver = new Student(student);
												saver.save(function (err, data) {
													if (err) console.log('Error ', err.message);
													else console.log('Saved ['+ count++ +'] ', data.student_id);
												});
										  }
									})
								}
					        });	
						}
				        
					}
					res.send("Import ...");
				}
				
			});
		});
		
		 
		// Without auth -- read only 
		// IMPORTANT: See note below on how to make a sheet public-readable! 
		// # is worksheet id - IDs start at 1 
		//my_sheet.getRows( 1, function(err, row_data){
		//    console.log( 'pulled in '+row_data.length + ' rows');
		//});
		 
		// With auth -- read + write 
		// see below for authentication instructions 
		//var creds = require('../DuyetDev-a6965be6b9c8.json');
		// OR, if you cannot save the file locally (like on heroku) 
		//var creds = {
		//  client_email: 'yourserviceaccountemailhere@google.com',
		//  private_key: 'your long private key stuff here'
		//}
		//var creds = {};
		 
		// my_sheet.useServiceAccountAuth(creds, function(err){
		//     // getInfo returns info about the sheet and an array or "worksheet" objects 
		//     my_sheet.getInfo( function( err, sheet_info ){
		//         console.log( sheet_info.title + ' is loaded' );
		//         // use worksheet object if you want to stop using the # in your calls 
		//  
		//         var sheet1 = sheet_info.worksheets[0];
		//         sheet1.getRows( function( err, rows ){
		//            	console.log(rows);
		//         });
		//     });
		// })
	}