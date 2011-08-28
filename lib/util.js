// Utilities
Util = function() {
	
	var BLURB_SIZE = 8
  		,BLURB_CHARS = "abcdefghijklmnopqrstuvxywz"

	this.generateBlurb = function() {
		var blurb = '';
	  for (i=0;i<BLURB_SIZE;i++){
	    blurb += BLURB_CHARS[Math.floor(Math.random()*BLURB_CHARS.length)]
	  }
	  return blurb;
	}

 }



exports.Util = Util;