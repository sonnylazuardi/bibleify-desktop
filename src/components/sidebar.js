import React, { PureComponent, Fragment } from 'react';
import Books from '../constants/Books';
import { connect } from 'react-redux';

@connect(state => ({ bible: state.bible }), dispatch => ({ dispatch }))
export default class Sidebar extends PureComponent {
  onChangeActiveBook(book) {
    this.props.dispatch.bible.setActiveChapter(1);
    this.props.dispatch.bible.setActiveBook(book);
  }
  renderBook(book, i) {
    const { activeBook, activeVersion } = this.props.bible;
    return (
      <button
        onClick={() => this.onChangeActiveBook(book)}
        className={'btn btn-block btn-book ' + (book.value == activeBook.value ? 'btn-book-active' : '')}
        key={i}
      >
        {book.value == activeBook.value ? <div className='active-bar' /> : null}
        {activeVersion.lang == 'en' ? book.name : book.name_id}
      </button>
    );
  }
  onJump() {
    let jumpText = this.props.bible.jumpText;
    const { activeVersion } = this.props.bible;
    if (jumpText.indexOf(' ') != -1) {
      let currentVerse = 0;
      if (jumpText.indexOf(':') != -1) {
        const splitVerse = jumpText.split(':');
        currentVerse = parseInt(splitVerse[1]);
        jumpText = splitVerse[0];
      }
      const splitChapter = jumpText.replace('  ', ' ').split(' ');
      const activeBook = Books.filter(book => {
        if (activeVersion.lang == 'en') {
          return book.name.toLowerCase().indexOf(splitChapter[0].toLowerCase()) != -1;
        } else {
          return book.name_id.toLowerCase().indexOf(splitChapter[0].toLowerCase()) != -1;
        }
      })[0];
      const currentChapter = parseInt(splitChapter[1]);
      if (activeBook) {
        this.props.dispatch.bible.jumpToVerse({
          activeBook,
          activeChapter: currentChapter,
          activeVerse: currentVerse,
        });
      }
    }
  }
  filterBook(book, testament) {
    const { activeVersion, jumpText } = this.props.bible;
    const currentBookName = activeVersion.lang == 'en' ? book.name.toLowerCase() : book.name_id.toLowerCase();
    return book.type == testament && currentBookName.indexOf(jumpText.toLowerCase()) != -1;
  }
  renderBooks(testament) {
    return Books.filter(book => this.filterBook(book, testament)).map(this.renderBook.bind(this));
  }
  renderTestament(testament) {
    const { activeVersion } = this.props.bible;
    if (testament == 'old') {
      return activeVersion.lang == 'en' ? 'Old Testament' : 'Perjanjian Lama';
    } else {
      return activeVersion.lang == 'en' ? 'New Testament' : 'Perjanjian Baru';
    }
  }
  render() {
    const { jumpText } = this.props.bible;
    const oldBooks = this.renderBooks('old');
    const newBooks = this.renderBooks('new');
    return (
      <div
        className='sidebar'
        style={{ background: 'black', width: 165, paddingTop: 40, position: 'static', height: 'inherit' }}
      >
        <div className='scroll'>
          <div className='sidebar-jump'>
            <input
              type='text'
              className='form-control input-outline-secondary'
              placeholder='Jump'
              aria-describedby='basic-addon1'
              value={jumpText}
              onChange={e => this.props.dispatch.bible.setJumpText(e.target.value)}
              onKeyPress={target => target.charCode == 13 && this.onJump()}
            />
          </div>
          {oldBooks.length ? (
            <Fragment>
              <div className='testament'>{this.renderTestament('old')}</div>
              {oldBooks}
            </Fragment>
          ) : null}
          {newBooks.length ? (
            <Fragment>
              <div className='testament testament-center'>{this.renderTestament('new')}</div>
              {newBooks}
            </Fragment>
          ) : null}
        </div>
      </div>
    );
  }
}
