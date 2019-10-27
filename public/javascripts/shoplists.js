// ATENTION: its "innerHTML", if you use "innerHtml" it will not work
// javascript is case sensitive so they are 2 different properties 
// and only the firts means something in the DOM
 
window.onload = function() {
    var shoplistNames = document.getElementById("shoplistNames");
    loadShoplists(shoplistNames);

    function loadShoplists(elem) {
        $.ajax({
            url:"/api/shoplists",
            method:"get",
            // sending in json
            contentType:"application/json",
            // receiving in json
            dataType:"json",
            success: function(res,status,jqXHR) {
                console.log(status);
                if (res.err) {
                    console.log(JSON.stringify(res));
                    return;
                }
                var html = "";
                for(i in res)  {
                    html += "<li class='item' onclick='openShoplist("+res[i].id+")'>"
                    +res[i].name+"</li>"
                }
                elem.innerHTML = html;
            },
            error: function(jqXHR, errStr, errThrown) {
                console.log(errStr);
            }
        })
    }
}

function openShoplist(id) {
    sessionStorage.setItem("shoplistId",id);
    window.location.href = "shoplist.html";
}