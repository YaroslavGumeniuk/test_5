'use strict';

const server = require('server');
server.extend(module.superModule);

server.prepend('Show', function (req, res, next) {
    // const accountHelpers = require('*/cartridge/scripts/account/accountHelpers.js');
    // res.setViewData({
    //     randomString: accountHelpers.getRandomString('From controller ')
    // });
    res.render('homePage', {
        param1: 'Site.current.name'
    });
    next();
});

// const server = require('server');
// server.get('Show', function (req, res, next) {
//     res.render('homePage', {param1: 'Site.current.name'});
//     // res.render('helloWorld');
//     next();
// });

module.exports = server.exports();

