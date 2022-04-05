'use strict';

var server = require('server');
server.extend(module.superModule);

server.append('Start', function (req, res, next) {
    // var viewData = res.getViewData();
    // viewData.demo1 = {
    //     testVar: 'Demo1 cartridge appending to error page'
    // };
    // res.setViewData(viewData);
    res.setViewData({
        demo1: {
            testVar: 'Demo1 cartridge appending to error page'
        }
    });

    next();
});

module.exports = server.exports();
