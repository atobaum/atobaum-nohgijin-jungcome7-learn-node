var mul=require('./mulmodule')
let addModule = require('./addModule');
const powerModule = require('./powerModule');

console.log(mul.divModule(1,2))
console.log(mul.multiModule(1,2))
console.log("1 + 2 = ", addModule.add(1,2));
console.log("1 - 2 = ", addModule.sub(1, 2));
console.log("2 ** 2 = ", powerModule.power(2, 2));
console.log("5 % 2 = ", powerModule.mode(5, 2));