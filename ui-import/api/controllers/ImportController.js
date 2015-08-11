var Student = require("../../../model");

module.exports = {
	main: function(req, res) {
		var data = req.body;
		
		require("./module/" + data.school_id)(req, res);
	}
};