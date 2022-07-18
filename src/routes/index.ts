import {Router} from 'express'
import {validateUser, authenticateJWT} from '../middlewares/auth'
import {register, login} from '../controllers/auth'
import {getLetters, getLetterById, createLetter, updateLetter, deleteLetter} from '../controllers/letters'
import {createImage, getImages, getImageById, updateImage, deleteImage} from '../controllers/images'

const router = Router()

router.post('/register', validateUser, register)
router.post('/login', login)

router.post('/letters', authenticateJWT, createLetter)
router.get('/letters', authenticateJWT, getLetters)
router.get('/letters/:id', authenticateJWT, getLetterById)
router.put('/letters/:id', authenticateJWT, updateLetter)
router.delete('/letters/:id', authenticateJWT, deleteLetter)

router.post('/images', authenticateJWT, createImage)
router.get('/images', authenticateJWT, getImages)
router.get('/images/:id', authenticateJWT, getImageById)
router.put('/images/:id', authenticateJWT, updateImage)
router.delete('/images/:id', authenticateJWT, deleteImage)

export default router