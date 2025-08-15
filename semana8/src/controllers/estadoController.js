import { Estado } from '../models/estado.js';

async function obtenerEstados(req, res) {
    try {
        const estados = await Estado.findAll({
            order: [['nombre', 'ASC']],
        });
        res.status(200).json(estados);
    } catch (error) {
        console.error('Error al obtener los estados:', error);
        res.status(500).json({ error: 'Error al obtener los estados' });
    }
}

async function obtenerEstado(req, res) {
    try {
        const estado = await Estado.findByPk(req.params.id);
        if (!estado) {
            return res.status(404).json({ error: 'Estado no encontrado' });
        }
        res.status(200).json(estado);
    } catch (error) {
        console.error('Error al obtener el estado:', error);
        res.status(500).json({ error: 'Error al obtener el estado' });
    }
}

async function crearEstado(req, res) {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ error: 'El nombre es requerido' });
        }
        const newState = await Estado.create({ nombre });
        res.status(201).json(newState);
    } catch (error) {
        console.error('Error al crear el estado:', error);
        res.status(500).json({ error: 'Error al crear el estado' });
    }
}

async function actualizarEstado(req, res) {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(400).json({ error: 'El nombre es requerido' });
        }
        const [updatedRowsCount] = await Estado.update(
            { nombre },
            { where: { id: req.params.id } }
        );
        if (updatedRowsCount === 0) {
            return res.status(404).json({ error: 'Estado no encontrado o no actualizado' });
        }
        const estadoActualizado = await Estado.findByPk(req.params.id);
        res.status(200).json(estadoActualizado);
    } catch (error) {
        console.error('Error al actualizar el estado:', error);
        res.status(500).json({ error: 'Error al actualizar el estado' });
    }
}

async function eliminarEstado(req, res) {
    try {
        const deletedRowsCount = await Estado.destroy({
            where: { id: req.params.id }
        });
        if (deletedRowsCount === 0) {
            return res.status(404).json({ error: 'Estado no encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        console.error('Error al eliminar el estado:', error);
        res.status(500).json({ error: 'Error al eliminar el estado' });
    }
}



export {
    obtenerEstados,
    obtenerEstado,
    crearEstado,
    actualizarEstado,
    eliminarEstado
};