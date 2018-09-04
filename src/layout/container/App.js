import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom'
import MainPage from '../components/MaiPage'
import SearchBooks from '../components/SearchBook'


class App extends Component {
  state = {
    
  }

  //

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={({ history }) => (
          <MainPage showPopMSG={this.showPopMSG}/>
        )}/>

        <Route exact path="/search" render={({ history }) => (
          <SearchBooks showPopMSG={this.showPopMSG}/>
        )}/>
      </div>
    )
  }
}

export default App;
