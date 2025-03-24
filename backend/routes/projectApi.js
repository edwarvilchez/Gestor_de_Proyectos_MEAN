const express = require('express');
const {
    getProjects,
    createProject,
    getProject,
    updateProject,
    deleteProject
} = require('../controllers/projectController');

const router = express.Router();

// obtener todos los proyectos
router.get('/', getProjects);

// crear un nuevo proyecto
router.post('/', createProject);

// obtener un proyecto específico
router.get('/:id', getProject);

// actualizar un proyecto
router.patch('/:id', updateProject);

// eliminar un proyecto
router.delete('/:id', deleteProject);

module.exports = router;
