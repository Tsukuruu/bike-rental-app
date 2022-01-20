const express = require('express');
const BikeController = require('../controllers/bike.controller');
const router = express.Router();

router.get('/', BikeController.getAll);
router.get('/rented', BikeController.getRented);
router.get('/nonrented', BikeController.getNonRented);
router.get('/:id', BikeController.getById);
router.post('/', BikeController.add);
router.put('/:id', BikeController.update);
router.put('/rent/:id', BikeController.rent);
router.put('/rent/cancel/:id', BikeController.cancelRent);
router.delete('/:id', BikeController.delete);

module.exports = router;