const Project = require('../models/projectModel');
const mongoose = require('mongoose');

// obtener todos los proyectos
const getProjects = async(req, res) => {
    const projects = await Project.find({}).sort({ createdAt: -1 });
    res.json(projects);
}

// crear un nuevo proyecto
const createProject = async(req, res) =>{
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

// obtener un proyecto específico
const getProject = async(req, res) =>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'Proyecto con ID Válido' + id })
    }
    const project = await Project.findById(id);
    if(!project){
        return res.status(404).json({ error: 'Proyecto no encontrado' + id })
    }
    res.status(200).json(project);
}

// actualizar un proyecto
const updateProject = async(req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'Proyecto con ID Válido' + id })
    }
    const project = await Project.findOneAndUpdate({ _id: id }, req.body, { new: true });
    if(!project){
        return res.status(404).json({ error: 'Proyecto no encontrado' + id })
    }
    res.status(200).json({ message: 'Proyecto actualizado' + id });
}

// eliminar un proyecto
const deleteProject = async(req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'Proyecto con ID Válido' + id })
    }
    const project = await Project.findOneAndDelete({ _id: id }, req.body, { new: true });
    if(!project){
        return res.status(404).json({ error: 'Proyecto no encontrado' + id })
    }
    res.status(200).json({ message: 'Proyecto eliminado' + id });
}

module.exports = {
    getProjects,
    createProject,
    getProject,
    updateProject,
    deleteProject
}