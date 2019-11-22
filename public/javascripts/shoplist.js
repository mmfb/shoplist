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
         
                var html = "";
                var total = 0;
                for(i in res.items)  {
                    var item = res.items[i];
                    html += "<li class='item'>"
                    +item.name+(item.country?" ("+item.country+")":"")+
                    " : "+item.quantity+" X "+item.price+"€ = "+
                    (item.price*item.quantity).toFixed(2)+" €"
                    +"</li>"
                    total += (item.price*item.quantity);
                }
                html +="<li class='item'> Total = "+total.toFixed(2)+"€ </li>"
                shoplistItems.innerHTML = html;
               
            },
            error: function(jqXHR, errStr, errThrown) {
                console.log(errStr);
            }
        })
    }
}