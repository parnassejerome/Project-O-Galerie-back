'use strict';

const Joi = require('joi');
const APIError = require('./APIError');
const debug = require('debug')('service:validation');

// Schéma des données attendues au formulaire d'inscription
const schemaUserInput = Joi.object({
    email:Joi.string().email().required(),
    nickname:Joi.string().pattern(/^[\d\p{L}\p{M}_-]{3,24}$/um).required(),
    password:Joi.string().pattern(/^[ -~]{8,32}$/).required(),    // tous les caractères imprimables
    situation:Joi.string().pattern(/^(?:user|creator|admin)?$/).required(),
    birthday:Joi.string().pattern(/^\d{4}(?:-\d{2}){2}$/).required(),
    firstname:Joi.string().pattern(/^[\d\p{L}\p{M} -]{3,32}$/um),
    lastname:Joi.string().pattern(/^[\d\p{L}\p{M} -]{3,32}$/um),
    town:Joi.string().pattern(/[a-zA-Z-]{2,24}$/),
    country:Joi.string().pattern(/[a-zA-Z-]{2,32}$/),
    avatar:Joi.string(),
    biography:Joi.string().pattern(/^.{0,140}$/),
}).required();

// Schéma des données attendues à la modification d'un profil
const schemaUserPatch = Joi.object({
    firstname:Joi.string().pattern(/^[\d\p{L}\p{M} -]{3,32}$/um),
    lastname:Joi.string().pattern(/^[\d\p{L}\p{M} -]{3,32}$/um),
    nickname:Joi.string().pattern(/^[\d\p{L}\p{M}_-]{3,24}$/um),
    birthday:Joi.string().pattern(/^\d{4}(?:-\d{2}){2}$/),
    town:Joi.string().pattern(/[a-zA-Z-]{2,24}$/),
    country:Joi.string().pattern(/[a-zA-Z-]{2,32}$/),
    avatar:Joi.string(),
    biography:Joi.string().pattern(/^.{0,140}$/),
    situation:Joi.string().pattern(/^(?:user|creator|admin)?$/),
}).required();

// Schéma des données attendues au formulaire de connexion
const schemaUserLogin = Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().pattern(/^[ -~]{8,32}$/).required(),    // tous les caractères imprimables
}).required();


/**
 * Validation des informations envoyées dans le cadre de l'inscription
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function checkSignUpData (req, res, next) {
    const { error } = schemaUserInput.validate(req.body);

    if(!error){
        next();
    }
    else{
        const err = new APIError('La syntaxe de la requête est erronée.', 400, error);

        next(err);
    }
}

/**
 * Validation des informations envoyées dans le cadre de la connexion
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function checkLoginData (req, res, next) {
    const { error } = schemaUserLogin.validate(req.body);

    if(!error){
        next();
    }
    else{
        const err = new APIError('La syntaxe de la requête est erronée.', 400, error);

        next(err);
    }
}

function checkUpdateData (req, res, next) {
    const { error } = schemaUserPatch.validate(req.body);

    if(!error){
        next();
    }
    else{
        const err = new APIError('La syntaxe de la requête est erronée.', 400, error);

        next(err);
    }
}

module.exports = { checkSignUpData, checkLoginData, checkUpdateData };
