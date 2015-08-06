/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var query = require('./query.model');

exports.register = function(socket) {
  query.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  query.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('query:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('query:remove', doc);
}