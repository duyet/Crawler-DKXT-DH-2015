var XLSX = require('xlsx');
var file_path = "tmp/NV1_03082015.xls";

var workbook = XLSX.readFile(file_path);
// console.log(workbook);

var first_sheet_name = workbook.SheetNames[0];
var address_of_cell = 'A1';
var worksheet = workbook.Sheets[first_sheet_name];

// var alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var alphabet = "ABCDEFGHIJKLMNOPQRS";
for (var row = 6; row <= 50; row++) {
	for(var i=0; i < alphabet.length; i++) {
		var col = alphabet.charAt(i);
		var desired_cell = worksheet[col + row];
		if (desired_cell)
			console.log(col+row + "  =>  " + desired_cell.v);
	}
}

// var desired_cell = worksheet[address_of_cell];

// require('fs').writeFile("tmp/xls_content.txt", JSON.stringify(desired_cell, null, 4));