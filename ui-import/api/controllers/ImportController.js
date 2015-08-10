var Student = require("../../../model");

module.exports = {
	main: function(req, res) {
		var data = req.body;
		res.send(data);
		
		this["import_" + data.school_id](req, res);
	},
	
	import_ftu: function() {
		
	}
};