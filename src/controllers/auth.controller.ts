import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import db from '../models'
import { StatusCodes } from '../constants/status-codes.constants'
import { Logs } from '../constants/logs.constants'
import { Jwt } from '../constants/common.constants'

function generateJwtAccessToken(user: any) {
	return jwt.sign(user, config?.jwtAccessSecret, {
		expiresIn: Jwt.EXPIRATON_TME
	})
} 	

function generateJwtRefreshToken(user: any) {
	return jwt.sign(user, config?.jwtRefreshSecret, {
		expiresIn: Jwt.EXPIRATON_TME
	})
} 

export const register = async (req: Request, res: Response): Promise<Response> => {
	try {
		const user = await db.User.create(req.body)
		const userJson = user.toJSON();
		return res.send({
			user: userJson,
			tokens: {
				accessToken: generateJwtAccessToken(userJson),
				refreshToken: generateJwtRefreshToken(userJson)
			}
		})
	} catch(error: any) {
		console.error(error);
		if(error?.errors[0].type === 'unique violation') {
			return res.status(400).json({error: 'This email is already in use'});
		}
		if(error?.errors[0].type === 'notNull Violation') {
			return res.status(400).json({error: `'${error?.errors[0].path}' cannot be null`});
		}
		return res.status(500).json({error: 'Internal server error'});
	}
}

export const login = async (req: Request, res: Response,): Promise<Response> => {
	try {
		return res.send({
			user: req.user,
      token: generateJwtAccessToken(req.user),
      refreshToken: generateJwtRefreshToken(req.user),
		})
	} catch(error) {
    console.error('error :>> ', error);
		return res.status(500).send({
			error: 'An error has occured while trying to log in'
		});
	}
}

export const getUser = async (req: Request, res: Response,): Promise<Response> => {
	try {
    return res.status(StatusCodes.OK).send({
			data: req.user,
      token: generateJwtAccessToken(req.user),
      refreshToken: generateJwtRefreshToken(req.user),
		})
	} catch(error) {
    console.error('error :>> ', error);
		return res.status(StatusCodes.INTERNAl_SERVER).json(Logs.Errors.INTERNAL_SERVER);
	}
}

export const refresh = async (req: Request, res: Response): Promise<Response> => {
	try {
		const user = await db.User.create(req.body)
		const userJson = user.toJSON();
		return res.send({
			user: userJson,
			tokens: {
				accessToken: generateJwtAccessToken(userJson),
				refreshToken: generateJwtRefreshToken(userJson)
			}
		})
	} catch(error: any) {
		console.error(error);
		if(error?.errors[0].type === 'unique violation') {
			return res.status(400).json({error: 'This email is already in use'});
		}
		return res.status(500).json({error: 'Internal server error'});
	}
}
