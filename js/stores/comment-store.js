var AppDispater = require("../dispatcher/app-dispatcher");

var EventEmitter = require("events").EventEmitter;
var assign = require("object-assign");

var comments = [],
    EVENT_NAME = "change";

var CommentStore = assign({}, EventEmitter.prototype, {
  emitChange: function(){
    this.emit(EVENT_NAME);
  },

  addChangeListener: function(callback){
    this.on(EVENT_NAME, callback)
  },

  removeChangeListener: function(callback){
    this.removeListener(EVENT_NAME, callback);
  },

  getAll: function(){
    return comments;
  }
});

AppDispater.register(function(action){
  switch (action.actionType) {
    case "CREATE_COMMENT":
      comments.push(action.comment);
      CommentStore.emitChange();
      break;
  }
});

module.exports = CommentStore;