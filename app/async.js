exports = (typeof window === 'undefined') ? global : window;

exports.asyncAnswers = {
  async : function(value) {
  	var defer = $.Deferred();

  	defer.resolve(value);

  	return defer.promise();
  },

  manipulateRemoteData : function(url) {
  	var defer = $.Deferred();

  	jQuery.getJSON( url, function (data){
  		var people = [];

  		defer.resolve(data.people.map(function (person){
  			return person.name;
  		}).sort());
  	});

  	return defer.promise();
  }
};
