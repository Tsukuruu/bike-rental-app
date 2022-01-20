const express = require('express');
const TypeController = require('../controllers/type.controller');
const router = express.Router();

router.get('/', TypeController.getAll);
router.get('/:id', TypeController.getById);
router.post('/', TypeController.add);
router.put('/:id', TypeController.update);
router.delete('/:id', TypeController.delete);

module.exports = router;