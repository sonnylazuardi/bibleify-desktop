import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Books from '../constants/Books';

@connect(state => ({ bible: state.bible, search: state.search }), dispatch => ({ dispatch }))
export default class Search extends PureComponent {
  onCloseSearch() {
    this.props.dispatch.search.setShow(false);
  }
  onJumpToVerse(e, item) {
    e.preventDefault();
    const currentBook = Books.find(book => {
      return book.value == item.book;
    });
    this.props.dispatch.bible.jumpToVerse({
      activeBook: currentBook,
      activeChapter: item.chapter,
      activeVerse: item.verse,
    });
  }
  render() {
    const { activeVersion } = this.props.bible;
    const { results, show } = this.props.search;
    if (!show) {
      return null;
    }

    return (
      <div className='search'>
        <div className='search-header'>
          <div className='search-caption'>Search Results</div>
          <button className='btn btn-circle btn-outline-secondary' onClick={() => this.onCloseSearch()}>
            <i className='ion ion-ios-close' />
          </button>
        </div>
        <div className='search-scroll'>
          {results.map((item, i) => {
            const currentBook = Books.find(book => {
              return book.value == item.book;
            });
            return (
              <a href='#' key={i} onClick={e => this.onJumpToVerse(e, item)}>
                <div className='search-item'>
                  <div className='search-title'>
                    {activeVersion.lang == 'en' ? currentBook.name : currentBook.name_id} {item.chapter}:{item.verse}
                  </div>
                  <div className='search-content'>{item.content}</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    );
  }
}
