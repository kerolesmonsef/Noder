const [_, __, command, ...restArguments] = process.argv


if (command === "make:controller") {
    const MakeControllerCommand = require('./Dev/Commands/makeController');
    const controllerFullName = `${restArguments[0]}.js`;
    const controllerNameArray = controllerFullName.split("\\");
    const controllerName = controllerNameArray[controllerNameArray.length - 1]
    MakeControllerCommand(`${__dirname}\\App\\Http\\Controllers\\${controllerFullName}`, controllerName);
}