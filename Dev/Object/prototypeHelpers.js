
const getRandomId  = () => Math.random().toString() + Math.random().toString();

const O_extendMethod = function () {
    const hasOwnProperty = Object.hasOwnProperty;
    const object = Object.create(this);
    const id = getRandomId();

    

    for (const extension of arguments) {
        for (const property in extension)
            object[property] = extension[property];
        if (this.hasOwnProperty) {
            
        }
    }

    return object;
};


export default O_extendMethod;

// Object.prototype.o_extends = extend;