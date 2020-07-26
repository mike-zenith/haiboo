const { setWorldConstructor } = require("cucumber");
const request = require('supertest');
const appFactory = require('../../src/app.js')

// @todo extract
function transformTable(data) {
    // @todo extract
    const transformerCallbacks = {"Number": Number};

    const transformers = data[':transform'].split(";");
    const { [":transform"]: omit, ... result } = data;
    for(const transformer of transformers) {
        const [key, transformerName] = transformer.split(":");
        result[key] = transformerCallbacks[transformerName](result[key]);
    }
    return result;
}

class ProductionWorld {

    constructor() {
        this._memorized = new Map();

        this._url = '/productions';
    }

    get app() {
        if (!this._app) {
            this._app = appFactory();
        }
        return this._app;
    }

    getTransformedTable(hash) {
        if (":transform" in hash) {
            return transformTable(hash);
        }
        return hash;
    }

    memorize(key, data) {
        this._memorized.set(key, data);
    }

    retrieve(key) {
        return this._memorized.get(key);
    }

    requestCreate(data) {
        return this.res = request(this.app)
            .put(this._url + '/' + data.Id)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(data))
    }

    requestPartialUpdate(id, data) {
        return this.res = request(this.app)
            .patch(this._url + '/' + id)
            .set('Accept', 'application/json')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(data))
    }

    requestGetAll() {
        return this.res = request(this.app).get(this._url);
    }

    requestOneById(id) {
        return this.res = request(this.app).get(this._url + '/' + id);
    }

    requestDeleteById(id) {
        return this.res = request(this.app).delete(this._url + '/' + id);
    }


}

setWorldConstructor(ProductionWorld);
