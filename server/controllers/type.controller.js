const { Type } = require('../models/models');
const validator = require('express-validator');
const apiResponse = require("../helpers/apiResponse");

class TypeController{
    
    async getAll(req, res){
        try{
            const types = await Type.findAll();
            return apiResponse.successResponseWithData(res, 'Operation success', types);
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

            const type = await Type.findByPk(req.params.id);
            return apiResponse.successResponseWithData(res, 'Operation success', type);
        }catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }

    async add(req, res){
        try{

            await validator.body('title', 'Title should not be empty.').isLength({ min: 1 }).trim().custom(async value => {
                return Type.findOne({ where: { title: value } }).then(type => {
                    if(type){
                        return Promise.reject('Type with such title already exists.');
                    }
                })
            }).run(req);
            await validator.sanitizeBody('*').escape().run(req);

            const errors = validator.validationResult(req);
            if(!errors.isEmpty()){
                return apiResponse.validationErrorWithData(res, 'Validation error', errors.array());
            }

            const { title } = req.body;

            const type = await Type.create({ title });
            return apiResponse.successResponseWithData(res, 'Operation success', type);
        }catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }

    async update(req, res){
        try{

            await validator.param('id', 'Id should be numeric').isNumeric().trim().run(req);
            await validator.body('title', 'Title should not be empty.').isLength({ min: 1 }).trim().custom(async value => {
                return Type.findOne({ where: { title: value } }).then(type => {
                    if(type){
                        return Promise.reject('Type with such title already exists.');
                    }
                })
            }).run(req);
            await validator.sanitizeBody('*').escape().run(req);

            const errors = validator.validationResult(req);
            if(!errors.isEmpty()){
                return apiResponse.validationErrorWithData(res, 'Validation error', errors.array());
            }

            const checkIfExists = await Type.findByPk(req.params.id);
            if(!checkIfExists){
                return apiResponse.notFoundResponse(res, 'Type of bike with such id doesn`t exist.');
            }

            const { title } = req.body;

            const type = await Type.update({ title }, {
                where: {
                    id: req.params.id
                }
            });
            return apiResponse.successResponseWithData(res, 'Operation success', type[0]);
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

            const checkIfExsits = await Type.findByPk(req.params.id);
            if(!checkIfExsits){
                return apiResponse.notFoundResponse(res, "No such type with requested id found to delete.");
            }

            const type = await Type.destroy({ where: { id: req.params.id } });

            return apiResponse.successResponseWithData(res, 'Operation success', type);
        }catch(err){
            return apiResponse.ErrorResponse(res, err);
        }
    }
}

module.exports = new TypeController();