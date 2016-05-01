$(function() {
	$( "#add-order-form" ).submit(function( event ) {
	  event.preventDefault();

	  var cusName = $('#cusname').val();
    var shipCost = $('#shipping-cost').val();
    var discount = $('#discount').val();
    var itemcode1 = $('#itemcode1').val();
    var amount1 = $('#amount1').val();

	  $.ajax({
	  	type: "POST",
	  	url: "http://localhost:4000/orders",

	  	data: JSON.stringify({ 
        	cusName: cusName,
        	shipCost: shipCost,
        	discount: discount,
        	itemcode1: itemcode1,
          amount1: amount1
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