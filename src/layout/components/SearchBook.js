import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Book from './Book'
import * as BooksAPI from '../../data/BookApi'
import PopMSG from './PopMSG'

class SearchBooks extends Component {
  state = {
    query: '',
    results: [],
    error: false,
    popmsg: '',
    popmsgdisplay: 'none',
    showLoading: 'none',
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

  updateQuery = (query) => {
    this.setState({query: query}, this.submitSearch);
  }

  clearQuery = (query) => {
    this.setState({query: ''});
  }

  clearSearchResults = (query) => {
    this.setState({results: []});
  }

  submitSearch() {
    if(this.state.query === '' || this.state.query === undefined) {
      // Reset
      this.clearSearchResults();
      return;
    }
    this.setState({showLoading: "block"});
    BooksAPI.search(this.state.query.trim(), 6).then((books) => {
      if(books.error && books.error === "empty query") {
        // Bad query; No Results
        this.setState({showLoading: "none", error: true, results: []});
      }
      else {
        if(this.state.results !== books) {
          this.setState({results: books});
        }
        this.setState({showLoading: "none", error: false});
      }
    });
  }

  refreshResults(book, shelf){
    this.setState(() => {
      var index = this.state.results.indexOf(book);
      this.state.results[index].shelf = shelf;
    });
  }


  render() {
    return (
      <div className="search-books">
        <PopMSG display={this.state.popmsgdisplay} text={this.state.popmsg}/>
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
              <input type="text" placeholder="Search by title or author" value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}/>

          </div>
        </div>
        <div className="search-books-results">

          <img alt="loading gif" className="middlr" style={{width: "175px", display: this.state.showLoading}} src="https://ryanwaite28.github.io/book-search/Loading_icon.gif"/>
          <hr/>
          <ol className="books-grid">
            {this.state.results.length > 0 && this.state.results.map((book, index) => (
              <Book refreshResults={this.refreshResults.bind(this)} showPopMSG={this.showPopMSG.bind(this)} book={book} shelf={book.shelf} key={book.id} id={book.id} imgurl={book.imageLinks === undefined ? "" : book.imageLinks.thumbnail} title={book.title} author={book.authors} />
            ))}
          </ol>
          {this.state.error && <p>No Results...</p>}
        </div>
      </div>
    )
  }
}

export default SearchBooks
