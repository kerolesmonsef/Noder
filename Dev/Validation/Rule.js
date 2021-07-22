class IRule {
    request = null;
    constructor(request) {
        this.request = request;
    }
    passes(attribute, value) {
        throw new Error("this method must be implemented");
    }


    message() {
        throw new Error("this method must be implemented");
    }
}

module.exports  = IRule;