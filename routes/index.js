const router = require('express').Router()

const usersRoutes = require('./userRouter');
const productRoutes = require('./productRouter');

router.use('/users', usersRoutes);
router.use('/product',productRoutes);


module.exports = router