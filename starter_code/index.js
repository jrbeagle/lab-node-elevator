const Elevator = require('./elevator.js');
const Person = require('./person.js');

const elevator = new Elevator();
const mary = new Person('Mary', 2, 8);
const john = new Person('John', 1, 9);
const sarah = new Person('Sarah', 5, 2);
const thomas = new Person('Thomas', 4, 10);
const jamal = new Person('Jamal', 10, 1);

elevator.start(); //begin repeatedly calling update

elevator.call(mary);
elevator.call(john);
elevator.call(sarah);
elevator.call(thomas);
elevator.call(jamal);
