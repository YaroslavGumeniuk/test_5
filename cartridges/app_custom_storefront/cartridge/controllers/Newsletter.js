'use strict';

var server = require('server');

server.get(
    'Show',
    server.middleware.https,
    function (req, res, next) {
        var actionUrl = dw.web.URLUtils.url('Newsletter-Handler');
        var newsletterForm = server.forms.getForm('newsletter');
        newsletterForm.clear();

        res.render('newsletter/newsletterSignup', {
            actionUrl: actionUrl,
            newsletterForm: newsletterForm
        });
        next();
    }
);

module.exports = server.exports();
