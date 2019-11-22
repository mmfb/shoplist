var pool = require('./connection').pool;


// TODO: Some repetition here on the error handling... 

module.exports.getShoplistNames = function (callback, next) {
    pool.getConnection(function(err,conn){
        if (err) {
            callback(err,{code: 500, status: "Error in the connection to the database"})
            return;
        }
        conn.query("select name,id from shoplists", function(err, results) {
            // VERY IMPORTANT: Always release a connection after you don't need it
            // You can make more then one query but in the last one release it
            conn.release();
            if (err) {
                callback(err,{code: 500, status: "Error in a database query"})
                return;
            } 
            callback(false, {code: 200, status:"ok", data: results})
        })
    })
}


// TODO: Add all items and corresponding products to the shop list info
module.exports.getShoplist = function (id, callback, next) {
    pool.getConnection(function(err,conn){
        if (err) {
            callback(err,{code: 500, status: "Error in the connection to the database"})
            return;
        }

        // ? is the place where we will replace for the parameter
        // This is a prepared statement, so that we avoid SQL injection
        conn.query("select id,name from shoplists where id = ?", [id], function(err, shopList) {
            if (err) {
                callback(err,{code: 500, status: "Error in a database query"})
                return;
            } 
            conn.query("select product_id,name,quantity,price,country from items,products where shoplist_id = ? and items.product_id = products.id", [id], 
            function(err, items) {
                conn.release();
                if (err) {
                    callback(err,{code: 500, status: "Error in a database query"})
                    return;
                } 
                // choosing the 1st since there is only one
                var result = shopList[0];
                result.items = items;
                console.log(items);
                callback(false, {code: 200, status:"ok", data: result})
            })
        })
    })
}