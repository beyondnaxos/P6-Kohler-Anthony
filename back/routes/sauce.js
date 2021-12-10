const express = require('express') 
const router = express.Router() 
const sauceCtrl = require('../controllers/sauce') 
const auth = require('../middleware/auth') 
const multer = require('../middleware/multer-config') 
const validForm = require('../middleware/validForm')

router.post('/', auth, multer, validForm, sauceCtrl.createSauce) 
router.post("/:id/like", auth, sauceCtrl.likeAndDislike)
router.put('/:id', auth, multer, sauceCtrl.modifySauce)
router.delete('/:id', auth, sauceCtrl.deleteSauce) 
router.get('/:id', auth, sauceCtrl.getOneSauce) 
router.get('/', auth, sauceCtrl.getAllSauces) 

module.exports = router 
