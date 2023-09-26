'use strict';

const client = require('../services/pgClient');
const APIError = require('../services/APIError');
const debug = require('debug')('datamapper');

const dataMapper = {
    /**
     * Récupération d'un utilisateur via son email
     * @param {object} loginInformations
     * @returns
     */
    async getUserByEmail(loginInformations) {
        const sqlQuery = `
        select * from get_user_by_email($1)
        ;`;

        const values = [loginInformations];
        let user;
        let error;

        debug(sqlQuery, values);

        try {
            const response = await client.query(sqlQuery, values);

            user = response.rows[0].get_user_by_email;

            debug(user);
            if (!user) {
                error = new APIError('Informations erronnées', 403);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return {error, user};
    },
    /**
     * Ajout d'un utilisateur à la base de données
     * @param {object} user
     * @returns
     */
    async signUp (signInformations) {
        const sqlQuery = `
        select * from insert_user($1)
        ;`;
        const values = [signInformations];
        let user;
        let error;

        debug(values);
        try {
            const response = await client.query(sqlQuery, values);

            debug(response);
            user = response.rows[0].insert_user;

            debug(user);
            if (!user) {
                error = new APIError('Informations erronnées', 403);
            }
        }
        catch (err) {
            error = new APIError(err.message, 500, err);
        }

        return {error, user};
    },
};

module.exports = dataMapper;
