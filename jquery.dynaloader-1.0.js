(function( $ ){

  $.fn.dynaLoader = function( options ) {  
	  
	  function contentLoaded( obj,x )
	  {
		  $(obj).fadeIn();
	  }

	  var settings = {
    	      'loaderUrl' : 'dynaloader.html #page',
    	      'contentParam' : 'Page',
    	      'loaderImage' : 'images/loading.gif',
    	      'onContentLoaded' : contentLoaded,
    	      'targetSelector' : 'body' // only used if object is window
    	    };

    return this.each(function() {
    	var $this = $(this);
    	
        if ( options ) { 
            $.extend( settings, options );
         }

        var isWindow = false;
	  	var page = 1;
	  	var targetDiv = $this;

		if (!$this.context)
		{
			isWindow=true;
			targetDiv = $( settings['targetSelector'] );
		}

	  	$this.scrollTop(0);
		$this.scroll(function(){
	        if( (isWindow && 
	        		(($this.scrollTop()+1) >= ($(document).height() - $this.height())) ) ||
	        		($this.scrollTop()+1) >= ($this[0].scrollHeight-$this.height()) )
	        {
	        	var params = {};
	        	params[settings["contentParam"]] = page++; 
	            $('<div/>').load(settings['loaderUrl'],
	            	params,
	            	function(){
	            		$(this).html($(this).find('#page').html());
	            		$(this).hide();
	            		$(this).appendTo(targetDiv);
	            		if(typeof settings["onContentLoaded"] == 'function'){
	            			settings["onContentLoaded"].call($this,$(this) );
	            		}
				});
	        }
		});
    });
  };
})( jQuery );
