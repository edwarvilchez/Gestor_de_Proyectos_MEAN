const Project = require('../models/projectModel');
const mongoose = require('mongoose');

// obtener todos los proyectos
const getProjects = async (req, res) => {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
}

// crear un nuevo proyecto
const createProejct = async (req, res) =>{
    const { name, description } = req.body;
    // agreagmos el nuevo proyecto a la BD
    try{
        const project = await Project.create({ name, description})
        res.status(200).json(project)
    }
    catch(error){
        res.status(400).json(error)
    }
}