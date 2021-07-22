class Response {
    #response = null;

    constructor(response) {
        this.#response = response;
    }

    isResponseSent() {
        return this.#response._headerSent;
    }

    send(data) {
        if (this.isResponseSent()) {
            return;
        }

        return this.#response.send(data);
    }


}

module.exports = Response;