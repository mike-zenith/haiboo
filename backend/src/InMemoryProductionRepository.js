'use strict';


class InMemoryProductionRepository {
    // @todo either create and extract an adapter or make separate repository for dbm
    constructor() {
        this._data = new Map();
    }

    getAll() {
        return Promise.resolve(Array.from(this._data.values()));
    }

    getById(id) {
        return Promise.resolve(this._data.get(id));
    }

    add(production) {
        this._data.set(production.Id, production);
        return Promise.resolve(production);
    }

    deleteById(id) {
        this._data.delete(id);
        return Promise.resolve();
    }
}

module.exports = InMemoryProductionRepository;
