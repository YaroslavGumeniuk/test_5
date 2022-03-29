'use strict';
const server = require('server');
server.get('Show', function (req, res, next) {
    var template = 'hello';
    res.render(template, {
        message: 'Hello controller'
    });
    next();
});
module.exports = server.exports();
