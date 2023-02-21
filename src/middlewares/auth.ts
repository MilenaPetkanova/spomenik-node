import {Request, Response, NextFunction} from 'express'
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {ExtractJwt} from 'passport-jwt';
import {Strategy as JWTstrategy} from 'passport-jwt';
import config from '../config/config'
import db from '../models'

const localStrategyOpts = {
  usernameField: 'email',
  passwordField: 'password',
};

const jwtStrategyOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtAccessSecret
};

passport.use(new LocalStrategy(localStrategyOpts, async (email, password, done) => {
  try {
    const user = await db.User.findOne({ where: { email: email } });
    if(!user) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid) {
      return done(null, false, { message: 'Incorrect email or password.' });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.use(new JWTstrategy(jwtStrategyOpts, async (jwt_payload, done) => {
  try {
    const user = await db.User.findOne({ where: { email: jwt_payload.email } });
    if(!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user: any, done) {
  done(null, user);
});

export const validateUser = async (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string().regex(
      new RegExp('^[a-zA-Z0-9]{8,32}$')
    )
  })

  try {
    await schema.validateAsync(req.body);
    next()
  }
  catch (error: any) {
    switch (error?.details[0].context?.key) {
      case 'email':
        res.status(400).json({
          error: 'You must provide a valid email address'
        })
        break
        case 'password':
          res.status(400).json({
            error: `The password provided failed to match the following rules:
            <br>
            1. It must contain ONLY the following characters: lower case, upper case, numerics.
            <br>
            2. It must be at least 8 characters in length and not greater than 32 characters in length.
            `
        })
        break
      default:
        res.status(400).json({
          error: 'Invalid registration information'
        })    
    }
  }
}
