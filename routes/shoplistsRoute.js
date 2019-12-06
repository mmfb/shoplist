var express = require('express');
var shoplistDAO = require('../models/shoplistDAO');
var router = express.Router();

// TODO: Some repetition here on the error handling... 

router.get('/', function(req, res, next) {
    shoplistDAO.getShoplistNames(function(err,result){
        if (err) {
            // sending error because its for learning/debugging
            // real project would only send a general message
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        }
        res.status(result.code).send(result.data);
    },next)
});

router.get('/:id', function(req, res, next) {
    // req.params.id will be a string, but we don't need an Integer anyway
    shoplistDAO.getShoplist(req.params.id,function(err,result){
        if (err) {
            // sending error because its for learning/debugging
            // real project would only send a general message
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        }
        res.status(200).send(result.data);
    },next)
});

router.put('/:id', function(req, res, next) {
    // req.params.id will be a string, but we don't need an Integer anyway
    shoplistDAO.updateShoplistName(req.params.id,req.body.name,
        function(err,result){
        if (err) {
            // sending error because its for learning/debugging
            // real project would only send a general message
            res.statusMessage = result.status;
            res.status(result.code).json(err);
            return;
        }
        res.status(200).send(result.data);
    },next)
});

module.exports = router;
