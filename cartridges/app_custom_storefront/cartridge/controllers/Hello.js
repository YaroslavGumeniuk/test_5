'use strict';

/**
 * @namespace Hello
 */

var server = require('server');
var cache = require('*/cartridge/scripts/middleware/cache');

server.get('Start', cache.applyDefaultCache, function (req, res, next) {
    var Site = require('dw/system/Site');
    // var PageMgr = require('dw/experience/PageMgr');
    // var pageMetaHelper = require('*/cartridge/scripts/helpers/pageMetaHelper');

    // pageMetaHelper.setPageMetaTags(req.pageMetaData, Site.current);

    // var page = PageMgr.getPage('homepage');

    // if (page && page.isVisible()) {
    //     res.page('homepage');
    // } else {
    //     res.render('home/homePage');
    // }
    next();
});

module.exports = server.exports();
