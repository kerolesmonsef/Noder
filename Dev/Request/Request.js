class Request {
    #req = null;

    constructor(req) {
        this.#req = req;
    }

    setRequest(req) {
        this.#req = req;
        return this;
    }

    only(keys = []) {
        let result = {};
        keys.forEach((key) => {
            result[key] = this.get(key, null);
        });
        return result;
    }

    input(key = null, def = null) {
        const requestedData = {...this.#req.query, ...this.#req.body}
        if (key) {
            return requestedData[key] || def;
        }
        return requestedData;
    }

    get(key, def = null) {
        if (key instanceof Array) {
            return this.only(key);
        }

        return this.input(key,def);
    }

    all(keys = null) {
        if (keys) {
            return this.only(Array.isArray(keys) ? keys : arguments)
        }
        return this.input();
    }

    validate(rules){

    }
}


const getUniqueRequestObject = (() => {
    let uniqueRequest = new Request(null);

    return (req) => {
        return uniqueRequest.setRequest(req);
    }
})();


const request = (req, key = null, def = null) => {
    const request = getUniqueRequestObject(req);
    if (!key) {
        return request;
    }

    return request.get(key, def);

};

module.exports = {
    Request,
    request
}