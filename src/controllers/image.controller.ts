import { Request, Response } from 'express'
import { ValidationError } from 'sequelize'
import * as imageData from '../data/image.data'
import { getReqUserId } from '../utils/getReqUser'
import { StatusCodes } from '../constants/status-codes.constants'
import { Logs } from '../constants/logs.constants'

const controllerName = 'Image'

export const getAll = async (req: Request, res: Response): Promise<Response> => {
	try {
    const enteties = await imageData.getAll(getReqUserId(req.user), parseInt(req.params.spomenikId))
		return res.status(StatusCodes.OK).json(enteties);
	} catch(error) {
		console.error(error);
		return res.status(StatusCodes.INTERNAl_SERVER).json(Logs.Errors.INTERNAL_SERVER);
	}
}

export const create = async (req: Request, res: Response): Promise<Response> => {
	try {
		const entity = await imageData.create({
      src: req.body.src,
      caption: req.body.caption,
      year: req.body.year,
      location: req.body.location,
      userId: getReqUserId(req.user),
      spomenikId: parseInt(req.params.spomenikId),
    });
		return res.status(StatusCodes.CREATED).send({
			message: `${Logs.Success.CREATED} ${controllerName} with id ${entity.id}`,
			data: entity.toJSON(),
		})
	} catch(error: any) {
		console.error(error);
		if(error instanceof ValidationError) {
			return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error.errors[0]?.message);
		}
		return res.status(StatusCodes.INTERNAl_SERVER).json(Logs.Errors.INTERNAL_SERVER);
	}
}

export const update = async (req: Request, res: Response): Promise<Response> => {
	try {
		const id = parseInt(req.params.id);
		const entity = await imageData.getById(id)
		if(!entity) {
			return res.status(StatusCodes.NOT_FOUND).send({
				message: `${Logs.Errors.NOT_FOUND_ERROR} ${controllerName} with id ${id}`,
			})	
		}
    await imageData.update(entity, {
      src: req.body.src,
      caption: req.body.caption,
      year: req.body.year,
      location: req.body.location,
    });
    const updatedEntity = await imageData.getById(id)
		return res.status(StatusCodes.OK).send({
			message: `${Logs.Success.UPDATED} ${controllerName} with id ${updatedEntity.id}`,
			data: updatedEntity.toJSON(),
		})
	} catch(error: any) {
		console.error(error);
		if(error instanceof ValidationError) {
			return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(error.errors[0]?.message);
		}
		return res.status(StatusCodes.INTERNAl_SERVER).json(Logs.Errors.INTERNAL_SERVER);
	}
}

export const destroy = async (req: Request, res: Response): Promise<Response> => {
	try {
		const id = parseInt(req.params.id);
		const entity = await imageData.getById(id)
		if(!entity) {
			return res.status(StatusCodes.NOT_FOUND).send({
				message: `${Logs.Errors.NOT_FOUND_ERROR} ${controllerName} with id ${id}`,
			})	
		}
		await imageData.destroy(entity);
		return res.status(StatusCodes.OK).send({
			message: `${Logs.Success.DELETED} ${controllerName} with id ${entity.id}`,
		})
	} catch(error: any) {
		console.error(error);
		return res.status(StatusCodes.INTERNAl_SERVER).json(Logs.Errors.INTERNAL_SERVER);
	}
}
