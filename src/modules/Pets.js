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
    this.setState({lastUpdate: time});
  }

  savePet() {
    localStorage.setItem('pet', JSON.stringify(this.state));
  }

  birthPet() {
    this.setState({birthTime: 0,hunger: 0, lastUpdate: new Date().getTime()}, () => {
      this.savePet();
    });
  }

  feedPet() {
    this.setState({hunger: this.state.hunger+1}, () => {
      this.savePet();
    });
  }

  render() {
    return (
      <div>
        <p>hi {this.state.hunger}</p>
        <button onClick={this.feedPet}>feed</button>
      </div>
    )
  }

}

export default Pets;
