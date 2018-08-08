import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { updateRooms, createRoom, joinRoom, error } from './socket';

class App extends Component {
  state = {
    rooms: [],
    roomName: ''
  }
  updateRooms = (rooms) => {
    this.setState({
      rooms
    })
  }
  createRoom = () => {
    createRoom(this.state.roomName)
    this.setState({
      roomName: ''
    })
  }
  setRoomName = (event) => {
    this.setState({
      roomName: event.target.value
    })
  }
  joinRoom = roomName => {
    joinRoom(roomName)
  }
  showErrorMessage = message => {
    console.log(message)
    alert(message)
  }
  componentDidMount = () => {
    updateRooms(this.updateRooms)
    error(this.showErrorMessage)
  }
  showButton = room => {
    if (room.users < 2){
      return <button onClick={() => this.joinRoom(room.name)}>Connect</button>
    }
    return null
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        { this.state.rooms.length }
        {
          this.state.rooms.map(
            room => 
              <div key={room.name}>{room.name} users: {room.users}/2 {this.showButton(room)}</div>
            )
        }
        <input value={this.state.roomName} onChange={this.setRoomName} />
        <button onClick={this.createRoom}>Create Room</button>
      </div>
    );
  }
}

export default App;
