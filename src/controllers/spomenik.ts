import {Request, Response} from 'express'
import db from '../models'

export const getSpomeniks = async (req: Request, res: Response): Promise<Response> => {
	try {
    const spomeniks = await db.Spomenik.findAll({
			order: [
				['id', 'DESC']
			],
		});
		return res.status(200).json(spomeniks);
	} catch(error) {
		console.error(error);
		return res.status(500).json('Internal  error');
	}
}

export const createSpomenik = async (req: Request, res: Response): Promise<Response> => {
	try {
		const spomenik = await db.Spomenik.create(req.body);
		return res.status(201).send({
			message: `spomenik with id ${spomenik.id} was created successfully`,
			spomenik: spomenik.toJSON(),
		})
	} catch(error: any) {
		console.error(error);
		if(error?.errors?.lenght > 0 && error?.errors[0].type === 'notNull Violation') {
			return res.status(400).json({error: `'${error?.errors[0].path}' cannot be null`});
		}
		return res.status(500).json('Internal server error');
	}
}

export const updateSpomenik = async (req: Request, res: Response): Promise<Response> => {
	try {
		const id = parseInt(req.params.id);
		const spomenik = await db.Spomenik.findByPk(id);
		if(!spomenik) {
			return res.status(404).send({
				message: `There is no spomenik with id ${id}`,
			})	
		}
		spomenik.set(req.body)
		await spomenik.save();
		return res.status(201).send({
			message: `spomenik with id ${id} was updated successfully`,
			spomenik: spomenik.toJSON(),
		})
	} catch(error: any) {
		console.error(error);
		if(error?.errors?.lenght > 0 && error?.errors[0].type === 'notNull Violation') {
			return res.status(400).json({error: `'${error?.errors[0].path}' cannot be null`});
		}
		return res.status(500).json('Internal server error');
	}
}

export const getSpomenikById = async (req: Request, res: Response): Promise<Response> => {
	try {
		const id = parseInt(req.params.id);
		const spomenik = await db.Spomenik.findByPk(id);
		if(!spomenik) {
			return res.status(404).send({
				message: `There is no spomenik with id ${id}`,
			})	
		}
		return res.status(200).send({
			spomenik: spomenik.toJSON(),
		})
	} catch(error: any) {
		console.error(error);
		return res.status(500).json('Internal server error');
	}
}

export const deleteSpomenik = async (req: Request, res: Response): Promise<Response> => {
	try {
		const id = parseInt(req.params.id);
		const spomenik = await db.Spomenik.findByPk(id);
		if(!spomenik) {
			return res.status(404).send({
				message: `There is no spomenik with id ${id}`,
			})	
		}
		await spomenik.destroy();
		return res.status(200).send({
			message: `spomenik with id ${id} was deleted successfully`,
		})
	} catch(error: any) {
		console.error(error);
		return res.status(500).json('Internal server error');
	}
}
