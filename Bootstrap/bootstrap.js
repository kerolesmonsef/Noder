import Connection from "../Dev/Databases/Connections/Connection.js";
import Model from "../Dev/Databases/Eloquent/Model.js";
import O_extendMethod from "../Dev/Object/prototypeHelpers.js";




const AllowExtendsModules = [Model,Connection];

AllowExtendsModules.forEach((module)=>{
    Model.o_extends = O_extendMethod
});


