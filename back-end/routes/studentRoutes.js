const express = require('express');
const router = express.Router();
const controller = require('../controllers/studentController');

// GET /api/students - list all
router.get('/', controller.listStudents);

// GET /api/students/:id - get one
router.get('/:id', controller.getStudent);

// POST /api/students - create
router.post('/', controller.createStudent);

// PUT /api/students/:id - update
router.put('/:id', controller.updateStudent);

// DELETE /api/students/:id - delete
router.delete('/:id', controller.removeStudent);

module.exports = router;
