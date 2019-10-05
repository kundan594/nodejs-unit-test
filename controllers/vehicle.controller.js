'use strict';

const Vehicle = require('../models/vehicle.model');
const Controller = {};

Controller.create = function (req, res) {
    return Vehicle.create(req.body, function (err, vehicle) {
        if (err) {
            return res.status(500).end();
        }
        else {
            return res.json(vehicle);
        }
    })
};

Controller.index = function (req, res) {
    return Vehicle.find({}, function (err, vehicles) {
        if (err) {
            return res.status(500).end();
        }
        else {
            return res.json(vehicles);
        }
    })
};

Controller.get = function (req, res, next) {
    return Vehicle.findById(req.params.id, function (err, vehicle) {
        if (err) {
            return res.status(500).end();
        }
        else if (!vehicle) {
            return res.status(404).end();
        }
        else {
            return res.json(vehicle);
        }
    })
};

Controller.destroy = function (req, res) {
    return Vehicle.findByIdAndRemove(req.params.id, function (err, vehicle) {
        if (err) {
            return res.status(500).end();
        }
        else if (!vehicle) {
            return res.status(404).end();
        }
        else {
            return res.json({ "message": "Vehicle deleted successfully!" });
        }
    })
};

Controller.update = function (req, res) {
    return Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, vehicle) {
        if (err) {
            return res.status(500).end();
        }
        else if (!vehicle) {
            return res.status(404).end();
        }
        else {
            return res.json(vehicle);
        }
    })
};

module.exports = Controller;