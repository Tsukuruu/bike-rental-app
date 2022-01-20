const { Bike } = require('../models/models');
const validator = require('express-validator');
const apiResponse = require("../helpers/apiResponse");
const { sequelize } = require('../config/db.config');

class BikeController{
    
    async getAll(req, res){
        try{
            const bikes = await Bike.findAll({ include: 'type' });
            return apiResponse.successResponseWithData(res, 'Operation success', bikes);
        }catch(err){
            console.log(err);
            return apiResponse.ErrorResponse(res, err);
        }
    }

    async getRented(req, res){
        try{
            const bikes = await Bike.findAll({ include: 'type', where: { isRented: true } });
            const totalPrice = await Bike.sum('rentalPrice', {
                where: {
                    isRented: true
                }
            });
            return apiResponse.successResponseWithData(res, 'Operation success', {
                totalPrice,
                rows: bikes
            });
        }catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }

    async getNonRented(req, res){
        try{
            const bikes = await Bike.findAll({ include: 'type', where: { isRented: false } });
            return apiResponse.successResponseWithData(res, 'Operation success', bikes);
        }catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }

    async getById(req, res){
        try{

            await validator.param('id', 'Id should be numeric').isNumeric().trim().run(req);
            const errors = validator.validationResult(req);
            if(!errors.isEmpty()){
                return apiResponse.validationErrorWithData(res, 'Validation error', errors.array());
            }

            const bike = await Bike.findByPk(req.params.id, { include: 'type' });
            return apiResponse.successResponseWithData(res, 'Operation success', bike);
        }catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }

    async add(req, res){
        try{

            await validator.body('name', 'Name should not be empty.').isLength({ min: 1 }).trim().custom(async value => {
                return Bike.findOne({ where: { name: value } }).then(bike => {
                    if(bike){
                        return Promise.reject('Bike with such name already exists.');
                    }
                })
            }).run(req);
            await validator.body('typeId', 'Type id should be numeric.').isNumeric().run(req);
            await validator.body('rentalPrice', 'Rental price should be numeric.').isNumeric().run(req);
            await validator.sanitizeBody('*').escape().run(req);

            const errors = validator.validationResult(req);
            if(!errors.isEmpty()){
                return apiResponse.validationErrorWithData(res, 'Validation error', errors.array());
            }

            const { name, typeId, rentalPrice } = req.body;

            const created = await Bike.create({ name, typeId, rentalPrice }, { include: 'type' });
            const bike = await Bike.findByPk(created.id, { include: 'type' });
            return apiResponse.successResponseWithData(res, 'Operation success', bike);
        }catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }

    async delete(req, res){
        try{

            await validator.param('id', 'Id should be numeric').isNumeric().trim().run(req);
            await validator.sanitizeBody('*').escape().run(req);
            
            const errors = validator.validationResult(req);
            if(!errors.isEmpty()){
                return apiResponse.validationErrorWithData(res, 'Validation error', errors.array());
            }

            const checkIfExsits = await Bike.findByPk(req.params.id);
            if(!checkIfExsits){
                return apiResponse.notFoundResponse(res, "No such bike with requested id found to delete.");
            }

            const bike = await Bike.destroy({ where: { id: req.params.id } });

            return apiResponse.successResponseWithData(res, 'Operation success', bike);
        }catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }

    async update(req, res){
        try{

            await validator.param('id', 'Id should be numeric').isNumeric().trim().run(req);
            await validator.body('name', 'Name should not be empty.').isLength({ min: 1 }).trim().custom(async value => {
                return Bike.findOne({ where: { name: value } }).then(bike => {
                    if(bike){
                        return Promise.reject('Bike with such name already exists.');
                    }
                })
            }).run(req);
            await validator.body('typeId', 'Type id should be numeric.').isNumeric().run(req);
            await validator.body('rentalPrice', 'Rental price should be numeric.').isNumeric().run(req);
            await validator.sanitizeBody('*').escape().run(req);
            
            const errors = validator.validationResult(req);
            if(!errors.isEmpty()){
                return apiResponse.validationErrorWithData(res, 'Validation error', errors.array());
            }

            const toUpdate = await Bike.findByPk(req.params.id);
            if(!toUpdate){
                return apiResponse.notFoundResponse(res, "No such bike with requested id found to update.");
            }

            const { name, typeId, rentalPrice } = req.body;

            const bike = await Bike.update({
                name,
                typeId,
                rentalPrice
            }, { where: { id: req.params.id } });

            return apiResponse.successResponseWithData(res, 'Operation success', bike[0]);
        }catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }
    
    async rent(req, res){
        try{

            await validator.param('id', 'Id should be numeric').isNumeric().trim().run(req);
            await validator.sanitizeBody('*').escape().run(req);
            
            const errors = validator.validationResult(req);
            if(!errors.isEmpty()){
                return apiResponse.validationErrorWithData(res, 'Validation error', errors.array());
            }

            const toUpdate = await Bike.findByPk(req.params.id);
            if(!toUpdate){
                return apiResponse.notFoundResponse(res, "No such bike with requested id.");
            }
            if(toUpdate.isRented){
                //UPDATE in sequilze returns an array which first element contains number of affected rows
                return apiResponse.successResponseWithData(res, 'The bike with requested id has already been rented.', 0);
            }

            const bike = await Bike.update(
                {
                 rentalTimestamp: sequelize.literal('CURRENT_TIMESTAMP'), 
                 isRented: true 
                }, 
                { 
                    where: { id: req.params.id } 
                }
            );

            return apiResponse.successResponseWithData(res, 'Operation success', bike[0]);
        }catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }

    async cancelRent(req, res){
        try{

            await validator.param('id', 'Id should be numeric').isNumeric().trim().run(req);
            await validator.sanitizeBody('*').escape().run(req);
            
            const errors = validator.validationResult(req);
            if(!errors.isEmpty()){
                return apiResponse.validationErrorWithData(res, 'Validation error', errors.array());
            }

            const toUpdate = await Bike.findByPk(req.params.id);
            if(!toUpdate){
                return apiResponse.notFoundResponse(res, "No such bike with requested id.");
            }
            if(!toUpdate.isRented){
                //UPDATE in sequilze returns an array which first element contains number of affected rows
                return apiResponse.successResponseWithData(res, 'The bike with requested id hasn`t been rented.', 0);
            }

            const bike = await Bike.update(
                {
                 rentalTimestamp: null, 
                 isRented: false 
                }, 
                { 
                    where: { id: req.params.id } 
                }
            );

            return apiResponse.successResponseWithData(res, 'Operation success', bike[0]);
        }catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }
}

module.exports = new BikeController();