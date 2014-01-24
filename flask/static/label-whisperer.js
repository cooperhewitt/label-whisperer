function label_whisperer_init(){

        $("#upload-form").submit(function(){
	    label_whisperer_upload();
	    return false;
	});
}

function label_whisperer_upload(){

    var data = new FormData();

    try {
        var photos = $("#photo");
        var files = photos = photos[0].files;
        data.append('file', files[0]);
    }

    catch(e){
	console.log(e);
	return false;
    }

    var onsuccess = function(rsp){
	label_whisperer_status_msg("Your upload was successful. This is what we understood about it:");
	label_whisperer_draw_results(rsp);
        console.log(rsp);
    };

    var onerror = function(rsp){
	label_whisperer_status_msg("There was a problem uploading your photo. The robots report: " + rsp['statusText']);
	console.log(rsp);
    };

    var dt = new Date();
    var ts = dt.getTime();
                
    $.ajax({
        url: "/?cb=" + ts,
        type: "POST",
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        error: onerror,
        success: onsuccess
    });
    
    return false;
}

function label_whisperer_status_msg(msg){
    msg = htmlspecialchars(msg);
    var status = $("#status");
    status.html(msg);
}

function label_whisperer_draw_results(rsp){

    var raw = $("#raw");
    raw.html("<pre>" + htmlspecialchars(rsp['raw']) + "</pre>");
    
    if (rsp['possible'].length == 0){
	var possible = $("#possible");
	possible.html("We weren't able to find any accession numbers, though.");
	return false;
    }

    var list = '<p>These are the things we think are an accession number:</p>';
    list += '<ul>';

    for (var i in rsp['possible']){

	var acc_number = htmlspecialchars(rsp['possible'][i]);
	var link = "http://collection.cooperhewitt.org/objects/by-accession?accession_number=" + acc_number;
	
	list += '<li>';
	list += '<a href="' + link + '" target="_ch" id="a-' + acc_number + '">';
	list += acc_number;
	list += '</a><small class="title" id="t-' + acc_number + '"></small>';
	list += '</li>';

	setTimeout(function(){
	    label_whisperer_fetch_title(acc_number);
	}, 1000);
    }

    list += '</ul>';
    
    var possible = $("#possible");
    possible.html(list);
}

function label_whisperer_fetch_title(acc_number){

    var t = $("#t-" + acc_number);
    t.html(" &#8212; fetching title");

    var object_page = "http://collection.cooperhewitt.org/objects/by-accession?accession_number=" + acc_number;
    var oembed_page = "http://collection.cooperhewitt.org/oembed/photo/?url=" + encodeURI(object_page);

    var onsuccess = function(rsp){
	var title = htmlspecialchars(rsp['title']);
	t.html(" &#8212; " + title);
    };
    
    var onerror = function(rsp){
	t.html(" &#8212; unable to retrieve object title");
    };
    
    $.ajax({
        url: oembed_page,
        type: "GET",
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        error: onerror,
        success: onsuccess
    });

}
