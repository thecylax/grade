$(document).ready(function() {
    var storage = (function() {
	var uid = new Date,
	storage,
	result;
	try {
	    (storage = window.localStorage).setItem(uid, uid);
	    result = storage.getItem(uid) == uid;
	    storage.removeItem(uid);
	    return result && storage;
	} catch(e) {}
    }());
    
    var myMessages = ['info','warning','error','success'];
    function hideAllMessages() {
	var messagesHeights = new Array();
	
	for (i=0; i<myMessages.length; i++) {
	    messagesHeights[i] = $('.' + myMessages[i]).outerHeight(); // fill array
	    $('.' + myMessages[i]).css('top', -messagesHeights[i]); //move element outside viewport	  
	}
    }
    function showMessage(type) {
	//$('.'+ type).click(function(){
	hideAllMessages();				  
	$('.'+type).animate({top:"0"}, 500);
	//});
    }
    
    hideAllMessages();
    // Show message
    for(var i=0;i<myMessages.length;i++) {
	showMessage(myMessages[i]);
    }
    // When message is clicked, hide it.
    $('.message').click(function(){			  
	$(this).animate({top: -$(this).outerHeight()}, 500);
    });
    
    var table = document.getElementById('grid');
    $(table).blur(function() {
 	$("button").click(function() {
 	    localStorage.setItem('curriculumData', table.innerHTML);
 	    showMessage("success");
 	});
    });
    
    if(localStorage.getItem('curriculumData')){
	table.innerHTML = localStorage.getItem('curriculumData');
	$("#status").text("Loaded from localStorage.");
    }
    else {
	$.getJSON('grid.json', function(data) {
	    $.each(data, function(key, value) {
		$("#period").append('<th>'+key+'</th>');	
		for(var i=0; i<5; i++) {
		    $('.l'+i).append('<td style="cursor: pointer;"><p class="cod">'+ value[i].cod + '</p><p class="name">' + value[i].name + '</p><p class="pre">' + value[i].pre +'</p></td>');
		}
	    });
	    $("#status").text("Loaded from file.");
	});
    }
    
    
    $("#grid td").hover(function() {
	$(this).toggleClass("active");
    });
    $("#grid td").click(function() {
	$(this).toggleClass("done");
    });
});
