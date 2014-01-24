function label_whisperer_init(){

        $("#upload-form").submit(function(){
	    label_whisperer_upload();
	});
}

function label_whisperer_upload(){

    var data = new FormData();

    try {
        var photos = $("#photo");
        var files = photos = photos[0].files;
        data.append('photo', files[0]);
    }

    catch(e){
	
        $("#upload-status").html("Hrm, there was a problem uploading your photo: " + e);
        return false;
    }

    var onsuccess = function(rsp){
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
        error: function(e){
            console.log(e);
        },
        success: onsuccess
    });
    
    return false;
}
