import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import keydown from 'react-keydown';

@keydown
@connect(state => ({ bible: state.bible }), dispatch => ({ dispatch }))
export default class Content extends PureComponent {
  constructor(props) {
    super(props);
    this.verseRefs = {};
  }
  scrollToTop() {
    this._scroll.scrollTop = 0;
  }
  onPrevChapter() {
    this.props.dispatch.bible.prevChapter();
    this.scrollToTop();
  }
  onNextChapter() {
    this.props.dispatch.bible.nextChapter();
    this.scrollToTop();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.bible.activeVerse != nextProps.bible.activeVerse) {
      if (nextProps.bible.activeVerse == 0) {
        this.scrollToTop();
      } else if (this.verseRefs[nextProps.bible.activeVerse]) {
        this._scroll.scrollTop = this.verseRefs[nextProps.bible.activeVerse].offsetTop - 15;
      }
    }
    if (nextProps.keydown.event) {
      if (nextProps.keydown.event.code == 'ArrowRight') {
        this.onNextChapter();
      }
      if (nextProps.keydown.event.code == 'ArrowLeft') {
        this.onPrevChapter();
      }
    }
  }
  render() {
    const { verses } = this.props.bible;
    return (
      <div className='verse-container' style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div
          className='verse-scroll'
          ref={scroll => (this._scroll = scroll)}
          style={{ flex: 1, display: 'flex', overflow: 'auto' }}
        >
          <div className='container'>
            {verses.map((verse, i) => {
              const isTitle = verse.type == 't';
              if (isTitle) {
                return (
                  <h1 key={i} className='title'>
                    {verse.content}{' '}
                  </h1>
                );
              } else {
                return (
                  <div key={i} ref={verseRef => (this.verseRefs[verse.verse] = verseRef)} className='verse'>
                    {verse.verse != 0 ? <span className='verse-number'>{verse.verse}</span> : null}
                    {verse.content}
                  </div>
                );
              }
            })}
          </div>
        </div>
        <button
          key='button-left'
          onClick={() => this.onPrevChapter()}
          className={'btn btn-outline-secondary btn-circle btn-nav btn-nav-left'}
        >
          <i className='ion ion-ios-arrow-back' />
        </button>
        <button
          key='button-right'
          onClick={() => this.onNextChapter()}
          className={'btn btn-outline-secondary btn-circle btn-nav btn-nav-right'}
        >
          <i className='ion ion-ios-arrow-forward' />
        </button>
      </div>
    );
  }
}
