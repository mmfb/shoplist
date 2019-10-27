var shoplistId = sessionStorage.getItem("shoplistId");

window.onload = function() {
    var shoplistTitle = document.getElementById("title");
    var shoplistHeader = document.getElementById("header");
    var shoplistItems = document.getElementById("shoplistItems");
    loadShoplistInfo(shoplistTitle,shoplistHeader,shoplistItems);
    
    function loadShoplistInfo(titleElem,headerElem,itemsElem) {
        $.ajax({
            url:"/api/shoplists/"+shoplistId,
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
                titleElem.innerHTML = res.name;
                headerElem.innerHTML = res.name;
               /*
                var html = "";
                for(i in res)  {
                    html += "<li class='item' onclick='openShoplist("+res[i].id+")'>"
                    +res[i].name+"</li>"
                }
                elem.innerHTML = html;
                */
            },
            error: function(jqXHR, errStr, errThrown) {
                console.log(errStr);
            }
        })
    }
}