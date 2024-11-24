const router = require('express').Router()
const fillQuotation= require('../controllers/people/fillQuotation')

router.route('/people/fill-quotation').post(fillQuotation)

module.exports = router