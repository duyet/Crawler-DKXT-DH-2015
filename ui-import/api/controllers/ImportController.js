var Student = require("../../../model");

module.exports = {
	main: function(req, res) {
		var data = req.body;
		
		this["import_" + data.school_id](req, res);
	},
	
	import_ftu2: function(req, res) {
		if (!req.body.school_id) {
			return res.send("Error! Missing school data info.");	
		}
		
		var GoogleSpreadsheet = require("google-spreadsheet");
		 
		// spreadsheet key is the long id in the sheets URL 
		var my_sheet = new GoogleSpreadsheet(req.body.school_id);
		 
		var sheetId = [
			{id: 1, faculty: "", start_row: 6},
			{id: 2, faculty: "", start_row: 0},
			{id: 3, faculty: "", start_row: 0},
			{id: 4, faculty: "", start_row: 0},
			{id: 5, faculty: "", start_row: 0},
			{id: 6, faculty: "", start_row: 0},
			{id: 7, faculty: "", start_row: 0},
			{id: 8, faculty: "", start_row: 0},
			{id: 9, faculty: "", start_row: 0},
			{id: 10, faculty: "", start_row: 0},
		];
		var getFaculty = function(sheet_id) {
			for (var i in sheetId) {
				if (sheetId[i].id == sheet_id) return sheetId[i].faculty;
			}
			
			return "";
		}
		
		my_sheet.getRows( 1, function(err, row_data){
		    console.log(row_data)
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
};