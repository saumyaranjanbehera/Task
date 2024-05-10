const express = require('express');
const router = express.Router();
const personController = require('./../controller/Personcontrol');

router.post('/', personController.createPerson);
router.get('/', personController.getAllPersons);
router.put('/:id', personController.updatePerson);
router.delete('/:id', personController.deletePerson);

module.exports = router;
