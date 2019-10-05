const sinon = require('sinon');
const Controller = require('../controllers/vehicle.controller')
const Vehicle = require('../models/vehicle.model')

describe('Vehicle Controller', function () {
    // req contains unchanged body and id parameters
    // required for all tests
    let req = {
        body: { // for testing create vehicle
            manufacturer: "Toyota",
            name: "Camry",
            model: "2018",
        },
        params: {
            id: "5aa06bb80738152cfd536fdc" // for testing get, delete and update vehicle
        }
    },
        // server error
        error = new Error({ error: "blah blah" }),
        res = {},
        expectedResult;

    describe('create', function () {
        beforeEach(function () {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() }) // to spy res.status(500).end()
            };
        });
        it('should return created vehicle obj', function () {
            expectedResult = req.body
            let vehicle = sinon.stub(Vehicle, 'create').yields(null, expectedResult);
            Controller.create(req, res);
            sinon.assert.calledWith(Vehicle.create, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ model: req.body.model }));
            sinon.assert.calledWith(res.json, sinon.match({ manufacturer: req.body.manufacturer }));
            vehicle.restore();
        });
        it('should return status 500 on server error', function () {
            let vehicle = sinon.stub(Vehicle, 'create').yields(error);
            Controller.create(req, res);
            sinon.assert.calledWith(Vehicle.create, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
            vehicle.restore();
        });
    });

    describe('index (get all)', function () {
        beforeEach(function () {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
            expectedResult = [{}, {}, {}]
        });
        it('should return array of vehicles or empty array', function () {
            let vehicle = sinon.stub(Vehicle, 'find').yields(null, expectedResult);
            Controller.index(req, res);
            sinon.assert.calledWith(Vehicle.find, {});
            sinon.assert.calledWith(res.json, sinon.match.array);
            vehicle.restore();
        });
        it('should return status 500 on server error', function () {
            let vehicle = sinon.stub(Vehicle, 'find').yields(error);
            Controller.index(req, res);
            sinon.assert.calledWith(Vehicle.find, {});
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
            vehicle.restore();
        });
    });

    describe('get', function () {
        beforeEach(function () {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
            expectedResult = req.body
        });
        it('should return vehicle obj', function () {
            let vehicle = sinon.stub(Vehicle, 'findById').yields(null, expectedResult);
            Controller.get(req, res);
            sinon.assert.calledWith(Vehicle.findById, req.params.id);
            sinon.assert.calledWith(res.json, sinon.match({ model: req.body.model }));
            sinon.assert.calledWith(res.json, sinon.match({ manufacturer: req.body.manufacturer }));
            vehicle.restore();
        });
        it('should return 404 for non-existing vehicle id', function () {
            let vehicle = sinon.stub(Vehicle, 'findById').yields(null, null);
            Controller.get(req, res);
            sinon.assert.calledWith(Vehicle.findById, req.params.id);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledOnce(res.status(404).end);
            vehicle.restore();
        });
        it('should return status 500 on server error', function () {
            let vehicle = sinon.stub(Vehicle, 'findById').yields(error);
            Controller.get(req, res);
            sinon.assert.calledWith(Vehicle.findById, req.params.id);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
            vehicle.restore();
        });
    });

    describe('destroy', function () {
        beforeEach(function () {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });
        it('should return successful deletion message', function () {
            let vehicle = sinon.stub(Vehicle, 'findByIdAndRemove').yields(null, {});
            Controller.destroy(req, res);
            sinon.assert.calledWith(Vehicle.findByIdAndRemove, req.params.id);
            sinon.assert.calledWith(res.json, sinon.match({ "message": "Vehicle deleted successfully!" }));
            vehicle.restore();
        });
        it('should return 404 for non-existing vehicle id', function () {
            let vehicle = sinon.stub(Vehicle, 'findByIdAndRemove').yields(null, null);
            Controller.destroy(req, res);
            sinon.assert.calledWith(Vehicle.findByIdAndRemove, req.params.id);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledOnce(res.status(404).end);
            vehicle.restore();
        });
        it('should return status 500 on server error', function () {
            let vehicle = sinon.stub(Vehicle, 'findByIdAndRemove').yields(error);
            Controller.destroy(req, res);
            sinon.assert.calledWith(Vehicle.findByIdAndRemove, req.params.id);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
            vehicle.restore();
        });
    });
    
    describe('update', function () {
        beforeEach(function () {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
            expectedResult = req.body
        });
        it('should return updated vehicle obj', function () {
            let vehicle = sinon.stub(Vehicle, 'findByIdAndUpdate').yields(null, expectedResult);
            Controller.update(req, res);
            sinon.assert.calledWith(Vehicle.findByIdAndUpdate, req.params.id, req.body, { new: true });
            sinon.assert.calledWith(res.json, sinon.match({ model: req.body.model }));
            sinon.assert.calledWith(res.json, sinon.match({ manufacturer: req.body.manufacturer }));
            vehicle.restore();
        });
        it('should return 404 for non-existing vehicle id', function () {
            let vehicle = sinon.stub(Vehicle, 'findByIdAndUpdate').yields(null, null);
            Controller.update(req, res);
            sinon.assert.calledWith(Vehicle.findByIdAndUpdate, req.params.id, req.body, { new: true });
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledOnce(res.status(404).end);
            vehicle.restore();
        });
        it('should return status 500 on server error', function () {
            let vehicle = sinon.stub(Vehicle, 'findByIdAndUpdate').yields(error);
            Controller.update(req, res);
            sinon.assert.calledWith(Vehicle.findByIdAndUpdate, req.params.id, req.body, { new: true });
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
            vehicle.restore();
        });
    });
});