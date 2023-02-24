import {Router} from 'express'
import passport from 'passport';

import {validateUser} from '../middlewares/auth'
import {Routes} from '../constants/routes.constants'
import * as authController from '../controllers/auth.controller'
import * as spomenikController from '../controllers/spomenik.controller'
import * as lettersController from '../controllers/letter.controller'
import * as imageController from '../controllers/image.controller'

const router = Router()

router.post(Routes.REGISTER, validateUser, authController.register)
router.post(Routes.LOGIN, passport.authenticate('local'), authController.login);
router.get(Routes.USER, passport.authenticate('jwt'), authController.getUser);

router.get(Routes.SPOMENIKS, passport.authenticate('jwt'), spomenikController.getAll)
router.post(Routes.SPOMENIKS, passport.authenticate('jwt'), spomenikController.create)
router.put(`${Routes.SPOMENIKS}/:id`, passport.authenticate('jwt'), spomenikController.update)
router.delete(`${Routes.SPOMENIKS}/:id`, passport.authenticate('jwt'), spomenikController.destroy)

router.get(Routes.LETTERS, passport.authenticate('jwt'), lettersController.getAll)
router.post(Routes.LETTERS, passport.authenticate('jwt'), lettersController.create)
router.put(`${Routes.LETTERS}/:id`, passport.authenticate('jwt'), lettersController.update)
router.delete(`${Routes.LETTERS}/:id`, passport.authenticate('jwt'), lettersController.destroy)

router.get(Routes.IMAGES, passport.authenticate('jwt'), imageController.getAll)
router.post(Routes.IMAGES, passport.authenticate('jwt'), imageController.create)
router.put(`${Routes.IMAGES}/:id`, passport.authenticate('jwt'), imageController.update)
router.delete(`${Routes.IMAGES}/:id`, passport.authenticate('jwt'), imageController.destroy)

export default router