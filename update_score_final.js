var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/admissions-dev-test-score-final');

var CandidateSchema = new mongoose.Schema({
	student_name: String, // Ho va ten
	student_id: { type: String }, // So bao danh
	school_code: String, // Ma~ truo`ng
	faculty_code: String, // Nga`nh 
	faculty: String, // Nga`nh 
	subject_group: String,
	priority: { type: Number, default: 0 }, // So thu tu nguyen vong uu tien
	score_1 : { type: Number, default: 0 }, // Diem mon 1
	score_2 : { type: Number, default: 0 }, // Diem mon 2
	score_3 : { type: Number, default: 0 }, // Diem mon 3
	score_priority: { type: Number, default: 0 }, // Diem uu tien
	score_sum : { type: Number, default: 0 }, // Tong so diem
	score_final : { type: Number, default: 0 }, // Tong so diem
	// user: {
	// 	type: Schema.ObjectId,
	// 	ref: 'User'
	// }
});
CandidateSchema.index({student_id: 1, faculty_code: 1}, {unique: true});

var model = mongoose.model('Candidate', CandidateSchema);

model.find().exec(function(err, data) {
	data.forEach(function(row) {
		row.score_final = row.score_sum + row.score_priority;
		row.save(function() {
			console.log("Saved ", row._id);
		});
	})
});