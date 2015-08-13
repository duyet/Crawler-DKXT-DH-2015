/*
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.createConnection('mongodb://localhost/admissions');

var FacultySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Faculty name',
		trim: true
	},
	code: {
		type: String,
		default: '',
		required: 'Please fill Faculty code',
		trim: true,
		unique: true, 
		index: true
	},
	school_name: {
		type: String,
		default: '',
		required: 'Please fill Faculty name',
		trim: true
	},
	school_code: {
		type: String,
		default: '',
		required: 'Please fill Faculty code',
		trim: true,
		unique: true, 
		index: true
	},
	subject_group: [{
		type: String,
		default: '',
		required: 'Please fill Faculty group',
		trim: true
	}],
	quota: {
		type: Number,
		default: 0,
		required: 'Please fill Faculty quota',
		trim: true
	},
	current: {
		type: Number,
		default: 0,
		// required: 'Please fill Faculty quota',
		trim: true
	},
	benchmark: {
		type: Number,
		default: 0,
		// required: 'Please fill Faculty quota',
		trim: true
	},
	matriculate_list: [Schema.Types.Mixed],
	matriculate:{
		type: Number,
		default: 0,
		// required: 'Please fill Faculty quota',
		trim: true
	},
	candidate_apply: Schema.Types.Mixed,
	candidate:{
		type: Number,
		default: 0,
		// required: 'Please fill Faculty quota',
		trim: true
	},
	candidate_check: [Schema.Types.Mixed],

	created: {
		type: Date,
		default: Date.now
	},

});

FacultySchema.index({school_code: 1, code: 1}, {unique: true});

var FacultyModel = mongoose.model('Faculty', FacultySchema); */
var Student = require("../../../../model");

module.exports = function(req, res) {
		//var sheet_url = 'https://docs.google.com/spreadsheets/d/1yUEekt_r5Kh9tnhF56jJYcCN--o6mEXXyPt9CPNSuB4/edit#gid=680423005';
		//console.log("Update sheet data at ", sheet_url);
		
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
					var sheetId = [1,];
					var getFaculty = function(sheet_id) {
						for (var i in sheetId) {
							if (sheetId[i].id == sheet_id) return sheetId[i].faculty;
						}
						
						return "";
					}
					var getSubjectGroup = function(subject) {
						subject = subject.replace("Ngữ văn", "Văn");
						subject = subject.replace("Tiếng ", "");
						subject = subject.replace("Lịch sử", "Sử");
						subject = subject.replace("Địa lí", "Địa"); 
						subject = subject.replace("Vật lí", "Lý");
						subject = subject.replace("Hóa học", "Hóa"); 
						
						subject = subject.replace(/,/g, "-");
						subject = subject.replace(/\s/g, "");
						
						return subject;
					}
					var getFacultyCode = function(faculty) {
						var re = /([A-Z][0-9]{5,6})/i
						var f = faculty.match(re);
						return f[0] || "";
					}
					
					for (var i = 0; i < 2; i++) {
						if (i == 1) {
							// Update schools 
							//console.log("Sheet 1")
						} else {
							console.log("Sheet -> ", i)
							var sheet = sheet_info.worksheets[i];
							// console.log(sheet);
							if (sheet) {
								sheet.getRows( function( err, rows ){ 
									// console.log(rows);
						            if (rows) {
										rows.forEach(function(row) {
											// console.log(row);
											var student = {
							                      student_name: row["hoten"],
							                      student_id: row["sbd"],
							                      school_code: row["matruong"] || req.body.school_code ||  "", // Ma~ truo`ng
							                      faculty_code: getFacultyCode(row["manganh"]), // Nga`nh
												  faculty: row["manganh"], // Nga`nh 
							                      subject_group: getSubjectGroup(row["tohopmon"]),
							                      priority: parseInt(row["sttnguyenvong"]),
							                      score_1 : 0,
							                      score_2 : 0,
							                      score_3 : 0,
							                      score_priority: parseFloat((row["diemuutien"] || "").replace(",", ".")),
							                      score_sum : parseFloat(row["diemtong"].replace(",", "."))
							                  };
											  
											  if (student.score_sum > 0) {
												console.log(student);
											  	
												  var saver = new Student(student);
													saver.save(function (err, data) {
														if (err) console.log('Error ', err.message);
														else console.log('Saved ['+ count++ +'] ', data.student_id);
													});
											  } else {
												  console.log("Err ", student);
											  }
										})
									}
						        });	
							}	
						}
						
					}
					res.send("Import ...<br />Please do not close this tab.");
				}
				
			});
		});
	}