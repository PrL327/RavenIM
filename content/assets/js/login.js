console.log('in');
$(function () {
    $("#join").click(function(){
        var userID = $("#name").val();
        if (userID != "") {
            console.log('in');
            ready = true;
            sessionStorage.setItem("user", userID);
        }
    });
    $("#name").keypress(function(e){
        if(e.which == 13) {
            var userID = $("#name").val();
            if (userID != "") {
                socket.emit("join", userID);
                ready = true;
                sessionStorage.setItem("user", userID);
            }
        }
    });
});