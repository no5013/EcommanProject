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
	$( "#add-customer-form" ).submit(function( event ) {
	  event.preventDefault();

	  var name = $('#new-cus-name').val();
    var face = $('#new-cus-face').val();
    var shipName =  $('#new-ship-name').val();
    var email =  $('#new-cus-email').val();
    var addr =  $('#new-cus-addr').val();

	  // Post to Server
	  $.ajax({
	  	type: "POST",
	  	url: "http://localhost:4000/customers",

	  	data: JSON.stringify({ 
        	name: name,
          face: face,
          shipName: shipName,
          email: email,
          addr: addr
	  	}),
	  	contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
        	if(data.msg === 'done') {
        		alert(data.insertId);
        		window.location.reload();
        	}
        },
	    error: function(data) {
	    	console.log(data);
	    }
	  });
	});

  $("#search").keypress(function(event) {
    var searchWord = $("#search").val();
    if(event.which == 13) {
        //alert(searchWord);
        window.location.href = "/customers/search/" + searchWord;
    }
  });

});