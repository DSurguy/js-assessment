exports = (typeof window === 'undefined') ? global : window;

exports.countAnswers =  {
  count : function (start, end) {
  	var num = start;
  	console.log(num);
  	var counterval = {
  		interval: setInterval(function (intervalParent, end){
  			if( num >= end ){
	  			clearInterval(intervalParent.interval);
	  			return false;
	  		}
	  		num += 1;
	  		console.log(num);
	  	}, 100, this, end),
		cancel: function (){
  			clearInterval(this.interval);
  		}
  	}
  	return counterval;
  }
};
