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
 	$(".save").click(function() {
 	    localStorage.setItem('curriculumData', table.innerHTML);
 	    showMessage("success");
	    window.location.reload();
 	});
    });
    
    $(".reset").click(function() {
	localStorage.removeItem('curriculumData');
   	showMessage("success");
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
 	    localStorage.setItem('curriculumData', table.innerHTML);
	    location.reload();
	});
    }
    
    
    $("#grid td").hover(function() {
	$(this).toggleClass("active");
    });
    $("#grid td").click(function() {
	$(this).toggleClass("done");
    });

    // Statistics
    var total = $("#grid td").length;
    var done  = $("#grid td.done").length;
    var percent_done = (done/total*100).toPrecision(3);
    var todo = (total - done);
    var percent_todo = (100-(done/total*100)).toPrecision(3);

    $("#sidebar").append("<p><strong>Total: "+total+" matérias</strong></p>");
    $("#sidebar").append("<p><strong>Concluído: "+done+" ["+percent_done+"%]</strong></p>");
    $("#sidebar").append("<p><strong>Restantes: "+todo+" ["+percent_todo+"%]</strong></p>");


    $("#sidebar").click(function(){
	var pos = $(this).attr("class");
	if (pos != "visible") {
	    $(this).toggleClass("visible");
	    $("#sidebar").animate({left: "20px"}, 400);
	}
	else {
	    $(this).removeClass("visible");
	    $("#sidebar").animate({left:"120px"}, 400);
	}
    });

});
