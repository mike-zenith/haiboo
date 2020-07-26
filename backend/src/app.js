'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const oapiValidator = require('openapi-validator-middleware');

oapiValidator.init(__dirname + '/../../api/openapi3.yaml', { beautifyErrors: false, firstError: true });

const InMemoryProductionRepository = require('./InMemoryProductionRepository');

// note this factory enables parallel test execution as long as we are dealing with in memory database
module.exports = function appFactory() {
    const productions = new InMemoryProductionRepository();


    const app = express();

    app.use(bodyParser.json());

    // @todo extract: this layer is so thin atm its not worth extracting actions
    // @todo models: oapi validator makes sure that we are dealing with valid models, these are just POJOs atm

    app.get('/productions', oapiValidator.validate, async function (req, res) {
        const items = await productions.getAll();
        res.json({ 'Items': items });
    });

    app.get('/productions/:id', oapiValidator.validate, async function (req, res) {
        const item = await productions.getById(req.params.id);
        if (!item) {
            return res.status(404).send();
        }
        res.json(item);
    });

    app.delete('/productions/:id', oapiValidator.validate, async function (req, res) {
        const item = await productions.getById(req.params.id);
        if (!item) {
            return res.status(404).send();
        }
        // @todo no wait needed, delete can be processed in the background
        productions.deleteById(req.params.id);
        res.status(200).json({});
    });

    app.put('/productions/:id', oapiValidator.validate, function (req, res) {
        // @todo no wait needed, the client can refer to this entity without it
        productions.add(req.body);
        res.status(201).json(req.body);
    });

    app.patch('/productions/:id', oapiValidator.validate, async function (req, res) {
        const foundProduction = await productions.getById(req.params.id);
        if (!foundProduction) {
            return res.status(404).send();
        }
        const resultProduction = { ... foundProduction, ... req.body };
        await productions.add(resultProduction);
        res.status(200).json(resultProduction);
    });


    // make sure this is the last middleware
    app.use((err, req, res, next) => {
        if (err instanceof oapiValidator.InputValidationError) {
            return res.status(400).json({ errors: err.errors });
        }
    });

    return app;
};
