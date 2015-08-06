/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /query              ->  index
 * POST    /query              ->  create
 * GET     /query/:id          ->  show
 * PUT     /query/:id          ->  update
 * DELETE  /query/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Content = require('./query.model');

exports.queryData = function(req, res) {
  var keyword = req.body.keyword || '';
  var page = req.body.page || 0;
  var perpage = req.body.perpage || 200;

  //keyword = '.*' + keyword + '.*';
  console.log('Searching "%s"...', keyword);

  if (keyword.length) var q = Content.find({ "student_name": { "$regex": keyword, "$options": "i" } }).skip(page).limit(perpage);
  else  var q = Content.find().skip(page).limit(perpage);
  q.exec(function(err,docs) { 
      if (err) console.log(err);

      res.json(docs);
  });
}

// Get list of things
exports.index = function(req, res) {
  Content.find(function (err, things) {
    if(err) { return handleError(res, err); }
    return res.json(200, things);
  });
};

exports.count = function(req, res) {
  Content.count(function (err, c) {
    if(err) { return handleError(res, err); }
    return res.json(200, {c: c});
  });
}

exports.export = function(req, res) {
  var keyword = req.param('keyword') || '';

  console.log('Getting with keyword %s', keyword);

  var q = Content.find({ "content": { "$regex": keyword, "$options": "i" } }).select('url_id');
  
  q.exec(function(err, idList) { 
      console.log(idList);

      var list = [];

      idList.forEach(function(i) {
        list.push(i.url_id);
      });

      console.log(list);

      Content.find().where('url_id').in(list).exec(function(err, data) {
          res.send(200, JSON.stringify(data, null, 4));
      });
  });

  /*Content.find({ "content": { $regex: keyword, "$options": "i" } }).exec(function(err, data) {
        if (err) console.log(err);
        res.json(200, data);
  });*/
}

function handleError(res, err) {
  return res.send(500, err);
}