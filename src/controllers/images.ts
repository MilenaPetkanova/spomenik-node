import {Request, Response} from 'express'
import db from '../models'

export const getImages = async (req: Request, res: Response): Promise<Response> => {
	try {
        const images = await db.Image.findAll({
			order: [
				['id', 'DESC']
			],
		});
		return res.status(200).json(images);
	} catch(error) {
		console.error(error);
		return res.status(500).json('Internal  error');
	}
}

export const createImage = async (req: Request, res: Response): Promise<Response> => {
	try {
		const image = await db.Image.create(req.body);
		return res.status(201).send({
			message: `Image with id ${image.id} was created successfully`,
			image: image.toJSON(),
		})
	} catch(error: any) {
		console.error(error);
		if(error?.errors?.lenght > 0 && error?.errors[0].type === 'notNull Violation') {
			return res.status(400).json({error: `'${error?.errors[0].path}' cannot be null`});
		}
		return res.status(500).json('Internal server error');
	}
}

export const updateImage = async (req: Request, res: Response): Promise<Response> => {
	try {
		const id = parseInt(req.params.id);
		const image = await db.Image.findByPk(id);
		if(!image) {
			return res.status(404).send({
				message: `There is no image with id ${id}`,
			})	
		}
		image.set(req.body)
		await image.save();
		return res.status(201).send({
			message: `Image with id ${id} was updated successfully`,
			image: image.toJSON(),
		})
	} catch(error: any) {
		console.error(error);
		if(error?.errors?.lenght > 0 && error?.errors[0].type === 'notNull Violation') {
			return res.status(400).json({error: `'${error?.errors[0].path}' cannot be null`});
		}
		return res.status(500).json('Internal server error');
	}
}

export const getImageById = async (req: Request, res: Response): Promise<Response> => {
	try {
		const id = parseInt(req.params.id);
		const image = await db.Image.findByPk(id);
		if(!image) {
			return res.status(404).send({
				message: `There is no image with id ${id}`,
			})	
		}
		return res.status(200).send({
			image: image.toJSON(),
		})
	} catch(error: any) {
		console.error(error);
		return res.status(500).json('Internal server error');
	}
}

export const deleteImage = async (req: Request, res: Response): Promise<Response> => {
	try {
		const id = parseInt(req.params.id);
		const image = await db.Image.findByPk(id);
		if(!image) {
			return res.status(404).send({
				message: `There is no image with id ${id}`,
			})	
		}
		await image.destroy();
		return res.status(200).send({
			message: `Image with id ${id} was deleted successfully`,
		})
	} catch(error: any) {
		console.error(error);
		return res.status(500).json('Internal server error');
	}
}
