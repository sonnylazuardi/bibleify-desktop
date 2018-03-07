import React, { PureComponent } from 'react';
import Books from '../constants/Books';
import { connect } from 'react-redux';

class Sidebar extends PureComponent {
  onChangeActiveBook(book) {
    this.props.setActiveChapter(1);
    this.props.setActiveBook(book);
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
        this.props.jumpToVerse({
          activeBook,
          activeChapter: currentChapter,
          activeVerse: currentVerse,
        });
      }
    }
  }
  render() {
    const { activeVersion, jumpText } = this.props.bible;
    return (
      <div className='sidebar'>
        <div className='scroll'>
          <div className='sidebar-jump'>
            <input
              type='text'
              className='form-control input-outline-secondary'
              placeholder='Jump'
              aria-describedby='basic-addon1'
              value={jumpText}
              onChange={e => this.props.setJumpText(e.target.value)}
              onKeyPress={target => target.charCode == 13 && this.onJump()}
            />
          </div>
          <div className='testament'>{activeVersion.lang == 'en' ? 'Old Testament' : 'Perjanjian Lama'}</div>
          {Books.filter(book => book.type == 'old').map(this.renderBook.bind(this))}
          <div className='testament testament-center'>
            {activeVersion.lang == 'en' ? 'New Testament' : 'Perjanjian Baru'}
          </div>
          {Books.filter(book => book.type == 'new').map(this.renderBook.bind(this))}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    bible: state.bible,
  }),
  dispatch => ({
    setActiveChapter: dispatch.bible.setActiveChapter,
    setActiveBook: dispatch.bible.setActiveBook,
    setJumpText: dispatch.bible.setJumpText,
    jumpToVerse: dispatch.bible.jumpToVerse,
  })
)(Sidebar);
