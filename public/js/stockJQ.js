// addItems = function(){
// 	$.getJSON('http://localhost:4000/stocks/1', function(result) {
// 	each val in result
// 		$(document).write(p = val);
// 	}
// }
//  $(document).ready(addItems()); 

//  $(function() {
// 	$("#save-button").click(function( event ) {
// 	  event.preventDefault();

// 	  var name = $('#item-name').val();
//       var desc = $('#item-desc').val();
//       var price =  $('#item-price').val();
//       var weight =  $('#item-weight').val();
//       var img =  $('#item-img').val();
//       var code = $('#item-code').val();

// 	  // Post to Server


// 		// $.getJSON('http://localhost:4000/stocks/1', function(result) {
// 		// 	alert(result[0].item_name);
// 		// });
	
// 	//
// 	});

// });

 $(function() {
	$( "#add-order-form" ).submit(function( event ) {
	  event.preventDefault();

	  var name = $('#new-item-name').val();
      var desc = $('#new-item-desc').val();
      var price =  $('#new-item-price').val();
      var weight =  $('#new-item-weight').val();
      var img =  $('#new-item-img').val();
      var code = $('#new-item-code').val();

	  // Post to Server
	  $.ajax({
	  	type: "POST",
	  	url: "http://localhost:4000/stocks",

	  	data: JSON.stringify({ 
        	name: name,
        	desc: desc,
        	price: price,
        	weight: weight,
        	img: img,
        	code: code
	  	}),
	  	contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
        	if(data.msg === 'done') {
        		alert(data.msg);
        		window.location.reload();
        	}
        },
	    error: function(data) {
	    	console.log(data);
	    }
	  });
	});

});