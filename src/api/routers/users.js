// vim: foldmethod=syntax:foldlevel=1:foldnestmax=2
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
 * @summary Respond with list of registered users
 */
router.get('/:role((?:creator|admin)?)', usersController.users);

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

/**
 * DELETE /v1/users/:id
 * @summary Delete an user profil
 * @return string 200 - confirmation
 */
router.delete('/:id(\\d+)',
    securityService.isConnected,
    usersController.delete);

/**
 * GET /v1/users/:id/collections
 * @summary Respond with a list completed of a user's collections
 * @return [Collections] 200 - 
 */
router.get('/:id(\\d+)/collections', usersController.getCollections);

/**
 * GET /v1/users/:id/artworks
 * @summary Respond with a list completed of a user's collections
 * @return [Artworks] 200 - 
 */
router.get('/:id(\\d+)/artworks', usersController.getArtworks);

module.exports = router;
