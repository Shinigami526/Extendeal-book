import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import shelfs from './shelfs'
import * as BooksAPI from '../../data/BookApi'
import Book from './Book'
import PopMSG from './PopMSG'

class MainPage extends Component {
  state = {
    currently_reading: [],
    want_to_read: [],
    already_read: [],
    popmsg: '',
    popmsgdisplay: 'none',
    showLoading: 'none'
  }

  showPopMSG(text){
    this.setState({
      popmsg: text,
      popmsgdisplay: 'block'
    }, () => {
      setTimeout(() => {
        this.setState({
          popmsg: '',
          popmsgdisplay: 'none'
        });
      } , 2000);
    })
  }

  getAllBooks() {
    this.setState({showLoading: "block"});
    BooksAPI.getAll().then((books) => {
      console.log(books);

      const currently_reading = books.filter((book) => {return book.shelf === shelfs.currentlyReading});
      const want_to_read = books.filter((book) => {return book.shelf === shelfs.wantToRead});
      const already_read = books.filter((book) => {return book.shelf === shelfs.read});

      this.setState({
        currently_reading: currently_reading,
        want_to_read: want_to_read,
        already_read: already_read,
        showLoading: "none"
      });
    });
  }

  resetMain() {
    this.getAllBooks();
  }

  componentDidMount() {
    this.getAllBooks();
  }

  render() {
    return (
      <div className="list-books">
        <PopMSG display={this.state.popmsgdisplay} text={this.state.popmsg}/>
        <div className="list-books-title">
          <h1>Extendeal-Book</h1>
        </div>
        <img alt="loading gif" className="middlr bottom-side" style={{width: "175px", display: this.state.showLoading}} src="https://ryanwaite28.github.io/book-search/Loading_icon.gif"/>

        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{shelfs.currently_reading}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {this.state.currently_reading.length > 0 && this.state.currently_reading.map((book, index) => (
                  <Book showPopMSG={this.showPopMSG.bind(this)} book={book} key={book.id} id={book.id} imgurl={book.imageLinks.thumbnail} title={book.title} author={book.authors} resetMain={this.resetMain.bind(this)}/>
                ))}
                </ol>
              </div>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">{shelfs.want_to_read}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {this.state.want_to_read.length > 0 && this.state.want_to_read.map((book, index) => (
                  <Book showPopMSG={this.showPopMSG.bind(this)} book={book} key={book.id} id={book.id} imgurl={book.imageLinks.thumbnail} title={book.title} author={book.authors} resetMain={this.resetMain.bind(this)}/>
                ))}
                </ol>
              </div>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">{shelfs.already_read}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {this.state.already_read.length > 0 && this.state.already_read.map((book, index) => (
                  <Book showPopMSG={this.showPopMSG.bind(this)} book={book} shelf={book.shelf} key={book.id} id={book.id} imgurl={book.imageLinks.thumbnail} title={book.title} author={book.authors} resetMain={this.resetMain.bind(this)}/>
                ))}
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MainPage
