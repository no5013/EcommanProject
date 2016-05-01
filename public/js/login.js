$(function() {
	$( "#login-form" ).submit(function( event ) {
	  event.preventDefault();
	  var username = $('#username').val();
	  var password = $('#password').val();

	  // Post to Server
	  $.ajax({
	  	type: "POST",
	  	url: "http://localhost:4000/login",

	  	data: JSON.stringify({ 
	  		username: username,
	  		password: password 
	  	}),
	  	contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
        	if(data.msg === 'done') {
        		window.location.href = "/";
        	}

        	if(data.error) {
        		$('.error-message').text(data.error);
        	}
        },
	    error: function(data) {
	    	console.log(data);
	    }
	  });
	});

});