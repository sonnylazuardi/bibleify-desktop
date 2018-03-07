import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Content extends PureComponent {
  scrollToTop() {
    this._scroll.scrollTop = 0;
  }
  onPrevChapter() {
    this.props.prevChapter();
    this.scrollToTop();
  }
  onNextChapter() {
    this.props.nextChapter();
    this.scrollToTop();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.bible.activeVerse != nextProps.bible.activeVerse) {
      if (nextProps.bible.activeVerse == 0) {
        this.scrollToTop();
      } else if (this.refs[`verse${nextProps.bible.activeVerse}`]) {
        this._scroll.scrollTop = this.refs[`verse${nextProps.bible.activeVerse}`].offsetTop - 15;
      }
    }
  }
  render() {
    const { verses } = this.props.bible;
    return (
      <div className='verse-container'>
        <div className='verse-scroll' ref={scroll => (this._scroll = scroll)}>
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
                  <div key={i} ref={'verse' + verse.verse} className='verse'>
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

export default connect(
  state => ({
    bible: state.bible,
  }),
  dispatch => ({
    prevChapter: dispatch.bible.prevChapter,
    nextChapter: dispatch.bible.nextChapter,
  })
)(Content);
