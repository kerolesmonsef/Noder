const validate = ({ req, res }, rules, messages) => {
    for (const field in rules) {
        const rule_i = rules[field];

    }
}

class Validator {
    #request = null;
    #rules = [];

    constructor(request, rules) {
        this.#request = request;
        this.#rules = rules;
    }

    fail() {

    }

}