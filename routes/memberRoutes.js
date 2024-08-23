const express = require('express');
const router = express.Router();
const memberController = require('../controllers/memberController');

// Define routes and map them to controller functions
router.get('/', memberController.getMembers);
router.post('/', memberController.createMember);
router.put('/:id', memberController.updateMember);
router.delete('/:id', memberController.deleteMember);
router.get('/:id', memberController.getMemberById);
module.exports = router;
