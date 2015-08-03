'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/diemthi_dh');

var thisinh = mongoose.model('thisinh', {
	name: String, // Ho va ten
	uid: { type: String, unique: true, index: true }, // So bao danh
	branch_id: String, // Nganh 
	nguyenvong_index: { type: Number, default: 0 }, // So thu tu nguyen vong uu tien
	score_1 : { type: Number, default: 0 }, // Diem mon 1
	score_2 : { type: Number, default: 0 }, // Diem mon 2
	score_3 : { type: Number, default: 0 }, // Diem mon 3
	score_sum : { type: Number, default: 0 }, // Tong so diem
	score_addon: { type: Number, default: 0 }, // Diem uu tien
});

module.exports = thisinh;