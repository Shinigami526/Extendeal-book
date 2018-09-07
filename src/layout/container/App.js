import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom'
import MainPage from '../components/MaiPage'
import SearchBooks from '../components/SearchBook'
import HandleError from '../../error/container/handle-error';

class App extends Component {

  render() {
    return (
      <HandleError>
      <div className="app">
        <Route exact path="/" render={({ history }) => (
          <MainPage showPopMSG={this.showPopMSG}/>
        )}/>

        <Route exact path="/search" render={({ history }) => (
          <SearchBooks showPopMSG={this.showPopMSG}/>
        )}/>
      </div>
      </HandleError>
    )
  }
}

export default App;
