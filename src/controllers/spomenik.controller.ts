import { Request, Response } from 'express'
import { ValidationError } from 'sequelize'
import * as spomenikData from '../data/spomenik.data'
import * as userSpomenikData from '../data/user-spomenik.data'
import { getReqUserId } from '../utils/getReqUser'
import { StatusCodes } from '../constants/status-codes.constants'
import { Logs } from '../constants/logs.constants'

const controllerName = 'Spomenik'

export const getAll = async (req: Request, res: Response): Promise<Response> => {
	try {
    const enteties = await spomenikData.getAll()
		return res.status(StatusCodes.OK).json(enteties);
	} catch(error) {
		console.error(error);
		return res.status(StatusCodes.INTERNAl_SERVER).json(Logs.Errors.INTERNAL_SERVER);
	}
}

export const create = async (req: Request, res: Response): Promise<Response> => {
	try {
		const entity = await spomenikData.create({
      name: req.body.name,
    });
    const realtionEntity = await userSpomenikData.create({
      spomenikId: entity.dataValues.id,
      userId: getReqUserId(req.user),
    });
    console.log('realtionEntity :>> ', realtionEntity);
		return res.status(StatusCodes.CREATED).send({
			message: `${Logs.Success.CREATED} ${controllerName} with id ${entity.id} and user relation id ${realtionEntity.id}`,
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
		const entity = await spomenikData.getById(id)
		if(!entity) {
			return res.status(StatusCodes.NOT_FOUND).send({
				message: `${Logs.Errors.NOT_FOUND_ERROR} ${controllerName} with id ${id}`,
			})	
		}
    await spomenikData.update(entity, {
      name: req.body.name,
    });
    const updatedEntity = await spomenikData.getById(id)
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
		const entity = await spomenikData.getById(id)
		if(!entity) {
			return res.status(StatusCodes.NOT_FOUND).send({
				message: `${Logs.Errors.NOT_FOUND_ERROR} ${controllerName} with id ${id}`,
			})	
		}
		await spomenikData.destroy(entity);
		return res.status(StatusCodes.OK).send({
			message: `${Logs.Success.DELETED} ${controllerName} with id ${entity.id}`,
		})
	} catch(error: any) {
		console.error(error);
		return res.status(StatusCodes.INTERNAl_SERVER).json(Logs.Errors.INTERNAL_SERVER);
	}
}
