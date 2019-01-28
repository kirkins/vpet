import React, { Component } from 'react';

class Pets extends Component {

  state = {
    name: "",
    lastUpdate: 0,
    birthTime: 0,
    hunger: 0,
  }

  constructor(props) {
    super(props);
    this.updatePet = this.updatePet.bind(this);
    this.birthPet = this.birthPet.bind(this);
    this.savePet = this.savePet.bind(this);
    this.feedPet = this.feedPet.bind(this);
  }

  componentWillMount() {
    if(localStorage.getItem("pet")) {
      this.setState(JSON.parse(localStorage.getItem("pet")));
      console.log(localStorage.getItem("pet"));
    } else {
      this.birthPet();
    }
  }

  updatePet() {
    let time = new Date().getTime();
    let timeDiff = time - this.state.lastUpdate;
    console.log(timeDiff);
    let minutesPast = Math.floor(timeDiff / 60000);
    console.log(minutesPast);
    if(minutesPast > 4) {
      let hungerPoints = Math.floor(minutesPast / 5);
      let hunger = this.state.hunger - hungerPoints;
      if(hunger < 0) hunger = 0;
      this.setState({hunger: hunger, lastUpdate: time});
    }
  }

  savePet() {
    localStorage.setItem('pet', JSON.stringify(this.state));
  }

  birthPet() {
    let time = new Date().getTime();
    this.setState({birthTime: time,hunger: 0, lastUpdate: time}, () => {
      this.savePet();
    });
  }

  feedPet() {
    let hunger = this.state.hunger+1;
    if(hunger > 100) hunger = 100;
    this.setState({hunger: hunger}, () => {
      this.savePet();
    });
    this.updatePet();
  }

  render() {
    return (
      <div>
        <p>hunger: {this.state.hunger}</p>
        <button onClick={this.feedPet}>feed</button>
      </div>
    )
  }

}

export default Pets;
