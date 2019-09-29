const express =require('express');
const router = express.Router();


// @route  GET api/transaction
// @desc   Test route
// @access public
router.get('/', (req,res) => res.send('Transaction router'));

module.exports = router;