'use strict';
const server = require('server');
var BasketMgr = require('dw/order/BasketMgr');
// var CartModel = require('*/cartridge/models/cart');
var currentBasket = BasketMgr.getCurrentBasket();
// var basketModel = new CartModel(BasketMgr.currentBasket);
server.get('Show', function (req, res, next) {
    var template = 'basket';
    res.render(template, {
        // basket: basketModel
        basket: currentBasket
    });
    next();
});
module.exports = server.exports();
