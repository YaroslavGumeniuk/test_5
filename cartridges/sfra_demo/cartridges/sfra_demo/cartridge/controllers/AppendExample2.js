'use strict';

var server = require('server');
var appendExample = require('*/cartridge/controllers/AppendExample');

server.extend(appendExample);
server.append('Start', function (req, res, next) {
    // Get viewData since we need to access to param1 set on previous controller
    var viewdata = res.getViewData()
    res.setViewData({
        param1: viewdata.param1 + ' and now AppendExample2 extends the first one'
    });
    res.render('pdictexample');
    next();
});

module.exports = server.exports();
