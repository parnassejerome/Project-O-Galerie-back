'use strict';

// URL préfixée par /users

const router = require('express').Router();
const { usersController } = require('../controllers');
const validationService = require('../services/validation');
const securityService = require('../services/security.js');

/**
 * POST /v1/users
 * @summary Respond with a newly registered user
 * @route PUT /signUp
 * @returns {User} 200 - A newly registered user
 */
router.post('/',
    validationService.checkSignUpData,
    usersController.signUp);

/**
 * GET /v1/users
 * @summary Respond with list of registered creators
 */
router.get('/', usersController.creators);

/**
 * GET /v1/users/:id
 * @summary Respond with an user
 */
router.get('/:id(\\d+)',
    securityService.isConnected,
    usersController.getUserById);

/**
 * PATCH /v1/users/:id
 * @summary Modify an user profil
 */
router.patch('/:id(\\d+)',
    securityService.isConnected,
    validationService.checkUpdateData,
    usersController.update);

module.exports = router;
