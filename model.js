'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/diemthi_dh');

var thisinhSchema = new mongoose.Schema({
	student_name: String, // Ho va ten
	student_id: { type: String }, // So bao danh
	school_id: String, // Ma~ truo`ng
	industry_code: String, // Nga`nh 
	subject_group: String,
	uu_tien_nguyen_vong: { type: Number, default: 0 }, // So thu tu nguyen vong uu tien
	score_1 : { type: Number, default: 0 }, // Diem mon 1
	score_2 : { type: Number, default: 0 }, // Diem mon 2
	score_3 : { type: Number, default: 0 }, // Diem mon 3
	diem_uu_tien: { type: Number, default: 0 }, // Diem uu tien
	score_sum : { type: Number, default: 0 }, // Tong so diem
});
thisinhSchema.index({student_id: 1, industry_code: 1}, {unique: true});

var thisinh = mongoose.model('thisinh', thisinhSchema);
module.exports = thisinh;