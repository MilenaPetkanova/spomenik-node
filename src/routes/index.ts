import {Router} from 'express'
import passport from 'passport';

import {validateUser} from '../middlewares/auth'
import {register, login, getUser} from '../controllers/auth'
import {getSpomeniks, getSpomenikById, createSpomenik, updateSpomenik, deleteSpomenik} from '../controllers/spomenik'
import {getLetters, getLetterById, createLetter, updateLetter, deleteLetter} from '../controllers/letters'
import {createImage, getImages, getImageById, updateImage, deleteImage} from '../controllers/images'

const router = Router()

router.post('/register', validateUser, register)
router.post('/login', passport.authenticate('local'), login);
router.get('/user', passport.authenticate('jwt'), getUser);

router.post('/spomeniks', passport.authenticate('jwt'), createSpomenik)
router.get('/spomeniks', passport.authenticate('jwt'), getSpomeniks)
router.get('/spomeniks/:id', passport.authenticate('jwt'), getSpomenikById)
router.put('/spomeniks/:id', passport.authenticate('jwt'), updateSpomenik)
router.delete('/spomeniks/:id', passport.authenticate('jwt'), deleteSpomenik)

router.post('/letters', passport.authenticate('jwt'), createLetter)
router.get('/letters', passport.authenticate('jwt'), getLetters)
router.get('/letters/:id', passport.authenticate('jwt'), getLetterById)
router.put('/letters/:id', passport.authenticate('jwt'), updateLetter)
router.delete('/letters/:id', passport.authenticate('jwt'), deleteLetter)

router.post('/images', passport.authenticate('jwt'), createImage)
router.get('/images', passport.authenticate('jwt'), getImages)
router.get('/images/:id', passport.authenticate('jwt'), getImageById)
router.put('/images/:id', passport.authenticate('jwt'), updateImage)
router.delete('/images/:id', passport.authenticate('jwt'), deleteImage)

export default router