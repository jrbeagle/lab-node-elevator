const Person = require('./person.js');

class Elevator {
  constructor(){
    this.direction = 'Up';
    this.floor      = 0;
    this.MAXFLOOR   = 10;
    this.requests   = []; //array of elevator floors
    this.passengers = []; //array of people on the elevator
    this.waitingList = []; //array of people waiting to get picked up
    this.intervalId = null;
  }

  start() {
    let intervalId = setInterval(()=>{
      this.update();
    },1000);
    this.intervalId = intervalId;
  }

  stop() {
    clearInterval(this.intervalId);
  }

  update() {

    if (this.requests.length === 0) {
      this.stop();
    }
    else {

      if(this.floor < this.requests[0]) {
        this.direction = 'Up';
        this.floorUp();
      }
      else if (this.floor > this.requests[0]) {
        this.direction = 'Down';
        this.floorDown();
      }

      this.log();

      this.waitingList.forEach((person, i)=>{
        if(this.floor === person.originFloor) {
          this._passengersEnter(person, i);
        }
      });

      this.passengers.forEach((person, i)=>{
        if(this.floor === person.destinationFloor) {
          this._passengersLeave(person, i);
        }
      });
    }

  }

  _passengersEnter(person, i) {
    this.requests.splice(i, 1);
    this.requests.push(person.destinationFloor);
    this.waitingList.splice(i, 1);
    this.passengers.push(person);
    console.log(`${person.name} has entered the elevator`);
   }

  _passengersLeave(person, i) {
    this.requests.splice(i, 1);
    console.log(`${person.name} has left the elevator`);
    this.passengers.splice(i, 1);
   }

  floorUp() {
    this.direction = 'Up';
    if(this.floor < 10) {
      this.floor += 1;
    }
  }

  floorDown() {
    this.direction = 'Down';
    if(this.floor > 0) {
      this.floor -= 1;
    }
  }

  call(person) {
    this.requests.push(person.originFloor); //add the origin floor of the person to requests list
    this.waitingList.push(person);
  }

  log() {
    console.log(`Direction: ${this.direction} | ${this.floor}`);
  }
}

module.exports = Elevator;
