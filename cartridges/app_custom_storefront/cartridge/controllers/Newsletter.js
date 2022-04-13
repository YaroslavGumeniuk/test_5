'use strict';

var server = require('server');
var URLUtils = require('dw/web/URLUtils');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

server.get(
    'Show',
    server.middleware.https,
    csrfProtection.generateToken,
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

server.get(
    'Success',
    server.middleware.https,
    function (req, res, next) {
        res.render('/newsletter/newslettersuccess', {
            continueUrl: URLUtils.url('Newsletter-Show'),
            newsletterForm: server.forms.getForm('newsletter')
        });
        next();
    }
);

server.post(
    'Handler',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var newsletterForm = server.forms.getForm('newsletter');
        var continueUrl = dw.web.URLUtils.url('Newsletter-Show');
        // Perform any server-side validation before this point, and invalidate form accordingly
        if (newsletterForm.valid) {
            var Transaction = require('dw/system/Transaction');
            try {
                Transaction.wrap(function () {
                    //Keep the same code you had inside the try block above
                    var CustomObjectMgr = require('dw/object/CustomObjectMgr');
                    var co = CustomObjectMgr.createCustomObject('NewsletterSubscription', newsletterForm.email.value);
                    // var co = CustomObjectMgr.createCustomObject('subscription', newsletterForm.email.value);
                    co.custom.firstName = newsletterForm.fname.value;
                    co.custom.lastName = newsletterForm.lname.value;

                    res.json({
                        success: true,
                        redirectUrl: URLUtils.url('Newsletter-Success').toString()
                    });
                });
            } catch (e) {
                var err = e;
                res.setStatusCode(500);
                res.json({
                    error: true,
                    redirectUrl: URLUtils.url('Error-Start').toString()
                });
            }
            ////////////////////////////////////////////////////////////////////////////////////////////////
            // Send back a success status, and a redirect to another route
            // res.render('/newsletter/newslettersuccess', {
            //     continueUrl: continueUrl,
            //     newsletterForm: newsletterForm
            // });
            ////////////////////////////////////////////////////////////////////////////////////////////////
            // Show the success page
            // res.json({
            //     success: true,
            //     redirectUrl: URLUtils.url('Newsletter-Success').toString()
            // });
        } else {
            // Handle server-side validation errors here: this is just an example
            // res.render('/newsletter/newslettererror', {
            //     errorMsg: dw.web.Resource.msg('error.crossfieldvalidation', 'newsletter', null),
            //     continueUrl: continueUrl
            // });

            // Handle server-side validation errors here: this is just an example
            res.setStatusCode(500);
            res.json({
                error: true,
                redirectUrl: URLUtils.url('Error-Start').toString()
            });
        }
        next();
    }
);

module.exports = server.exports();
