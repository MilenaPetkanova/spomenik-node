import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import config from '../config/config'
import db from '../models'

function generateJwtAccessToken(user: object) {
	const ONE_WEEK = 60 * 60 * 24 * 7
	return jwt.sign(user, config?.jwtAccessSecret, {
		expiresIn: ONE_WEEK
	})
} 	

function generateJwtRefreshToken(user: object) {
	const ONE_WEEK = 60 * 60 * 24 * 7
	return jwt.sign(user, config?.jwtRefreshSecret, {
		expiresIn: ONE_WEEK
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
		const {email, password} = req.body
		const user = await db.User.findOne({
			where: {
				email: email
			}
		})
		if(!user) {
			return res.status(403).send({
				error: 'The login information was incorrect'
			})
		}

		const isPasswordValid = await user.comparePassword(password)
		if(!isPasswordValid) {
			return res.status(403).send({
				error: 'The login information was incorrect'
			})
		}

		const userJson = user.toJSON();
		return res.send({
			user: userJson,
			tokens: {
				accessToken: generateJwtAccessToken(userJson),
				refreshToken: generateJwtRefreshToken(userJson)
			}
		})
	} catch(error) {
		return res.status(500).send({
			error: 'An error has occured while trying to log in'
		});
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
