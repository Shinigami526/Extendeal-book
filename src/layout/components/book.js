import React, { Component } from 'react';
import * as BooksAPI from '../../data/BookApi';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shelf: props.shelf
    };
  }

  addToShelf(book, shelf){
    BooksAPI.update(book, shelf).then((books) => {
      console.log(books);
      this.setState({shelf: shelf});
      this.props.showPopMSG(shelf);
      if(this.props.resetMain) {
        this.props.resetMain();
      }
      if(this.props.refreshResults) {
        this.props.refreshResults(book, shelf);
      }
    });
  }

  render() {
    return (
      <div id={this.props.id} key={this.props.id} className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.imgurl})` }}></div>
          <div className="book-shelf-changer">
            <select value={this.props.book.shelf} onChange={(event) => this.addToShelf(this.props.book, event.target.value)}>
              <option value="return" disabled>Move to...</option>
              <option value="none">None</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.author}</div>
      </div>
    )
  }
}

export default Book