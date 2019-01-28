import React, { Component } from 'react';

class Pets extends Component {

  state = {
    name: "",
    birthTime: 0,
    lastUpdate: 0,
    hunger: 0,
    amusement: 0,
    cleanliness: 0,
  }

  constructor(props) {
    super(props);
    this.updatePet = this.updatePet.bind(this);
    this.birthPet = this.birthPet.bind(this);
    this.savePet = this.savePet.bind(this);
    this.feedPet = this.feedPet.bind(this);
    this.playPet = this.playPet.bind(this);
    this.bathPet = this.bathPet.bind(this);
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
      // Check hunger
      let hungerPoints = Math.floor(minutesPast / 5);
      let hunger = this.state.hunger - hungerPoints;
      if(hunger < 0) hunger = 0;
      // Check fun
      let amusementPoints = Math.floor(minutesPast / 3);
      let amusement = this.state.amusement - amusementPoints;
      if(amusement < 0) amusement = 0;
      // Check clean
      let cleanlinessPoints = Math.floor(minutesPast / 10);
      let cleanliness = this.state.cleanliness - cleanlinessPoints;
      if(cleanliness < 0) cleanliness = 0;
      this.setState({hunger: hunger, amusement: amusement, cleanliness: cleanliness, lastUpdate: time});
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
    let hunger = this.state.hunger+5;
    if(hunger > 100) hunger = 100;
    this.setState({hunger: hunger}, () => {
      this.savePet();
    });
    this.updatePet();
  }

  playPet() {
    let amusement = this.state.amusement+1;
    if(amusement > 100) amusement = 100;
    this.setState({amusement: amusement}, () => {
      this.savePet();
    });
    this.updatePet();
  }

  bathPet() {
    let cleanliness = this.state.cleanliness+25;
    if(cleanliness > 100) cleanliness = 100;
    this.setState({cleanliness: cleanliness}, () => {
      this.savePet();
    });
    this.updatePet();
  }

  render() {
    return (
      <div>
        <p>hunger: {this.state.hunger}</p>
        <p>amusement: {this.state.amusement}</p>
        <p>cleanliness: {this.state.cleanliness}</p>
        <button onClick={this.feedPet}>feed</button>
        <button onClick={this.playPet}>play</button>
        <button onClick={this.bathPet}>bath</button>
      </div>
    )
  }

}

export default Pets;
