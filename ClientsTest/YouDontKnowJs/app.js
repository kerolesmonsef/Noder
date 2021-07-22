// // const ajax = (url, callback, method = "GET") => {
// //     $.ajax({
// //         url: url,
// //         type: method,
// //         success: callback
// //     })
// // }

// function timeoutify(fn, delay) {
//     let interval = setTimeout(function () {
//         interval = null;
//         fn(new Error("Timeout!"));
//     }, delay);

//     return function () {
//         // timeout hasn't happened yet?
//         if (interval) {
//             clearTimeout(interval);
//             fn.call(this, ...[null, ...arguments])
//         }
//     };
// }

// // // using "error-first style" callback design
// // function foo(err, data) {
// //     if (err) {
// //         console.error(err);
// //     }
// //     else {
// //         console.log(data);
// //     }
// // }

// // ajax("http://localhost:3000/user", timeoutify(foo, 1000));


// /////////////////////// asyncify

// // const asyncify = (fn) => {
// //     setTimeout(fn, 0);
// // }

// // let a = 0;

// // ajax("http://localhost:3000/user", asyncify(() => {
// //     console.log(a);
// // }));
// // a++;


// // const prom = new Promise((resolve, reject) => {
// //     resolve(4)
// // });

// // prom
// //     .then(f => { console.log(f); return 5 })
// //     .then(f => { console.log(f); return 5 })

// // prom
// //     .then(f => { console.log(f); return 5 })
// //     .then(f => { console.log(f); return 5 })

// // Promise.resolve(55)
// //     .then((num) => {
// //         console.log(num);
// //         return new Promise((resolve, reject) => {
// //             resolve(num * 6);
// //         });
// //     })
// //     .then(num => {
// //         console.log(num);
// //         return gg();
// //     })
// //     .catch(err => {
// //         console.log(err, 'err');
// //     })

// const foo = () => new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         resolve("wow")
//     },1000)
// })


// const timeoutPromise = (time) => new Promise((resolve,reject)=>{
//     setTimeout(()=>{
//         reject("time out")
//     },time)
// })

// Promise.race([
//     foo(),
//     // attempt `foo()`
//     timeoutPromise(3000)
//     // give it 3 seconds
// ])
//     .then(
//         function (wow) {
//            console.log(wow);
//         },
//         function (err) {
//             // either `foo()` rejected, or it just
//             // didn't finish in time, so inspect
//             // `err` to know which
//             console.error(err);
//         }
//     ).finally(function () {
//         console.log("ssss");
//     });


// // "Traditional JS Class" `Vehicle`
// function Vehicle() {
//     this.engines = 1;
// }
// Vehicle.prototype.ignition = function() {
//     console.log("Turning on my engine.");
// };
// Vehicle.prototype.drive = function() {
//     this.ignition();
//     console.log("Steering and moving forward!");
// };
// // "Parasitic Class" `Car`
// function Car(t) {
//     this.t = t;
//     // first, `car` is a `Vehicle`
//     var car = new Vehicle();
//     // now, let's modify our `car` to specialize it
//     car.wheels = 4;
//     // save a privileged reference to `Vehicle::drive()`
//     var vehDrive = car.drive;
//     // override `Vehicle::drive()`
//     car.drive = function() {
//         vehDrive.call(this);
//         console.log(
//             "Rolling on all " + this.wheels + " wheels!"
//         );
//     }
//     return car;
// }
// var myCar = new Car("koko");



// function Foo() {

// }

// function Bar() {

// }

// Bar.prototype.getName = function() {
//     return "koko"
// }

// // console.log(Foo.prototype.constructor) // Foo
// // let foo = new Foo();
// // console.log(foo.constructor); // Foo
// // console.log(Object.getPrototypeOf(foo) === Foo.prototype); // true
// // console.log(foo.__proto__ === Foo.prototype); // true

// // Foo.prototype = new Bar;
// Foo.prototype = Object.create(Bar.prototype)
// const foo = new Foo();


// console.log(`foo1 constructor ${foo2.constructor === Foo}`);
// console.log(`foo1 prototype constructor ${Object.getPrototypeOf(foo2).constructor === Foo}`);



// function Foo(name) {
//     this.name = name;
// }

// let obj = Object.create(Object.create(Object.create(Object.create({ getName() { return this.name } }))));

// Foo.prototype = obj;

// Foo.prototype.myName = function() {
//     return this.name;
// };

// function Bar(name, label) {
//     Foo.call(this, name);
//     this.label = label;
// }


// Bar.prototype = new Foo();
// const bar = new Bar("keroles", 'label');

// function isRelated(o1, o2) {
//     function F() {}
//     F.prototype = o2;
//     return o1 instanceof F;
// }

// function Foo() {}

// let foo = new Foo();

// console.log(isRelated(foo, Foo));


// async function foo() {
//     return 5;
// }

// async function bar() {
//     x = Promise.reject(55)
//     console.log(x)
// }

// bar();

const create = (pro) => {
    function F() { }
    F.prototype = pro;
    return new F();
}

function Foo(name) {
    this.name = name;
}

function Bar(name) {
    Foo.call(this, name);
}

Foo.prototype.getName = function () { return this.name }

// Bar.prototype = Object.create(Foo.prototype)

function F() { }
F.prototype = Foo.prototype;
Bar.prototype = new F();

Bar.prototype.setName = function () { }

let bar = new Bar("keroles");

console.log(bar.getName());