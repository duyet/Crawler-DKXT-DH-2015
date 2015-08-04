var Crawler = require("crawler");
var url = require('url');
var model = require('../model');

var c = new Crawler({
    maxConnections : 10,
    skipDuplicates: true,
    // This will be called for each crawled page
    callback : function (error, result, $) {
    	 var rootUrl = 'https://tuyensinh.uit.edu.vn';
    	//var rootUrl = result.request.href || '';

    	// Get data 
    	var table = $('table tr');
    	// console.log(table);
    	if (table.length) {
    		table.each(function(index, tr) {
	    		// console.log(tr);
	    		var td = $(tr).children('td');
	    		if (td.length) {
	    			var student = {};
	    			var page_url = result.request.href.split('?');
	    			page_url = page_url[0].split('/').pop();
	    			//page_url = page_url.substr(page_url.lastIndexOf('/') + 1);
	    			// console.log(page_url);
	    			student.ma_truong = "UIT";
	    			student.ma_nganh = page_url;   // "txt"
	    			td.each(function(index, td) {
	    				if (index == 2) student.ho_ten = $(td).text();
	    				if (index == 3) student.so_bao_danh = $(td).text();
	    				if (index == 4) student.uu_tien_nguyen_vong = $(td).text();
	    				if (index == 6) student.tong_diem = $(td).text();
	    			});
	    			console.log(student);
	    			var kitty = new model(student);
					kitty.save(function (err) {
					  console.log('meow');
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
    	console.log(">> UIT Module finish.");
    }
});

console.log(">> Load UIT Crawler module...");
c.queue([
	'https://tuyensinh.uit.edu.vn/tuyensinh/dkxt/D480101',
	'https://tuyensinh.uit.edu.vn/tuyensinh/dkxt/D480102',
	'https://tuyensinh.uit.edu.vn/tuyensinh/dkxt/D480103',
	'https://tuyensinh.uit.edu.vn/tuyensinh/dkxt/D480103_CLC',
	'https://tuyensinh.uit.edu.vn/tuyensinh/dkxt/D480104',
	'https://tuyensinh.uit.edu.vn/tuyensinh/dkxt/D480104_TMDT',
	'https://tuyensinh.uit.edu.vn/tuyensinh/dkxt/D480104_CTTT',
	'https://tuyensinh.uit.edu.vn/tuyensinh/dkxt/D480104_CLC',
	'https://tuyensinh.uit.edu.vn/tuyensinh/dkxt/D480201',
	'https://tuyensinh.uit.edu.vn/tuyensinh/dkxt/D480299',
	'https://tuyensinh.uit.edu.vn/tuyensinh/dkxt/D520214',
	'https://tuyensinh.uit.edu.vn/tuyensinh/dkxt/D520214_CLC'
]);