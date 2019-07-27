Contact = require('../modelos/newUser');

exports.index = function (req, res) {
    Contact.get(function (err, contacts) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            data: contacts
        });
    });
};

exports.new = function (req, res) {
    var contact = new Contact();
    contact.testerName = req.body.testerName ? req.body.testerName : "null";
    contact.userName = req.body.userName ? req.body.userName : "null";
    contact.userBirthDate = req.body.userBirthDate ? req.body.userBirthDate : "null";
    contact.userGender = req.body.userGender ? req.body.userGender : "null";
    contact.currentDate = req.body.currentDate ? req.body.currentDate : "null";
    contact.experimentDuration = req.body.experimentDuration ? req.body.experimentDuration : "null";
    contact.roomOfexperiment = req.body.roomOfexperiment ? req.body.roomOfexperiment : "null";
    contact.experiment = req.body.experiment ? req.body.experiment : "null";
    contact.lampLed = req.body.lampLed ? req.body.lampLed : "null";
    contact.lampInteraction = req.body.lampInteraction ? req.body.lampInteraction : "null";
    contact.tvLed = req.body.tvLed ? req.body.tvLed : "null";
    contact.tvInteraction = req.body.tvInteraction ? req.body.tvInteraction : "null";
    contact.courtinLed = req.body.courtinLed ? req.body.courtinLed : "null";
    contact.courtinInteraction = req.body.courtinInteraction ? req.body.courtinInteraction : "null";
    console.log(req.body);
    contact.save(function (err) {
        // if (err)
        //     res.json(err);
        res.json({
            message: 'New contact created!',
            data: contact
        });
    });
};

exports.view = function (req, res) {
    Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Contact details loading..',
            data: contact
        });
    });
};

exports.update = function (req, res) {
Contact.findById(req.params.contact_id, function (err, contact) {
        if (err)
            res.send(err);
        /*contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;*/

        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Contact Info updated',
                data: contact
            });
        });
    });
};

exports.delete = function (req, res) {
    Contact.remove({
        _id: req.params.contact_id
    }, function (err, contact) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'Contact deleted'
        });
    });
};