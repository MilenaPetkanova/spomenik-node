import {Request, Response} from 'express'
import db from '../models'

export const getLetters = async (req: Request, res: Response): Promise<Response> => {
	try {
        const letters = await db.Letter.findAll({
			order: [
				['id', 'DESC']
			],
		});
		return res.status(200).json(letters);
	} catch(error) {
		console.error(error);
		return res.status(500).json('Internal  error');
	}
}

export const createLetter = async (req: Request, res: Response): Promise<Response> => {
	try {
		const letter = await db.Letter.create(req.body);
		return res.status(201).send({
			message: `Letter with id ${letter.id} was created successfully`,
			letter: letter.toJSON(),
		})
	} catch(error: any) {
		console.error(error);
		if(error?.errors?.lenght > 0 && error?.errors[0].type === 'notNull Violation') {
			return res.status(400).json({error: `'${error?.errors[0].path}' cannot be null`});
		}
		return res.status(500).json('Internal server error');
	}
}

export const updateLetter = async (req: Request, res: Response): Promise<Response> => {
	try {
		const id = parseInt(req.params.id);
		const letter = await db.Letter.findByPk(id);
		if(!letter) {
			return res.status(404).send({
				message: `There is no letter with id ${id}`,
			})	
		}
		letter.set(req.body)
		await letter.save();
		return res.status(201).send({
			message: `Letter with id ${id} was updated successfully`,
			letter: letter.toJSON(),
		})
	} catch(error: any) {
		console.error(error);
		if(error?.errors?.lenght > 0 && error?.errors[0].type === 'notNull Violation') {
			return res.status(400).json({error: `'${error?.errors[0].path}' cannot be null`});
		}
		return res.status(500).json('Internal server error');
	}
}

export const getLetterById = async (req: Request, res: Response): Promise<Response> => {
	try {
		const id = parseInt(req.params.id);
		const letter = await db.Letter.findByPk(id);
		if(!letter) {
			return res.status(404).send({
				message: `There is no letter with id ${id}`,
			})	
		}
		return res.status(200).send({
			letter: letter.toJSON(),
		})
	} catch(error: any) {
		console.error(error);
		return res.status(500).json('Internal server error');
	}
}

export const deleteLetter = async (req: Request, res: Response): Promise<Response> => {
	try {
		const id = parseInt(req.params.id);
		const letter = await db.Letter.findByPk(id);
		if(!letter) {
			return res.status(404).send({
				message: `There is no letter with id ${id}`,
			})	
		}
		await letter.destroy();
		return res.status(200).send({
			message: `Letter with id ${id} was deleted successfully`,
		})
	} catch(error: any) {
		console.error(error);
		return res.status(500).json('Internal server error');
	}
}
