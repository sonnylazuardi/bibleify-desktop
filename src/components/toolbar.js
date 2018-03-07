import React, { PureComponent } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { connect } from 'react-redux';
import Versions from '../constants/Versions';

class Toolbar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isSearchFocused: false,
    };
  }
  onSelectChapter(chapter) {
    this.props.setActiveChapter(chapter);
  }
  onSelectVersion(version) {
    this.props.setActiveVersion(version);
  }
  onSearchFocus() {
    this.setState({
      isSearchFocused: true,
    });
  }
  onSearchBlur() {
    this.setState({
      isSearchFocused: false,
    });
  }
  onSearch() {
    this.props.fetchSearch();
  }
  render() {
    const { activeBook, activeChapter, activeVersion } = this.props.bible;
    const { text } = this.props.search;
    const { isSearchFocused } = this.state;
    let chapters = [];
    for (var i = 1; i <= activeBook.total; i++) {
      chapters.push(i);
    }
    return (
      <nav className='navbar navbar-expand-md navbar-inverse fixed-top bg-inverse'>
        <div className='version-box'>
          <UncontrolledDropdown>
            <DropdownToggle caret className='btn-outline-secondary btn-version'>
              <i className='ion ion-ios-book icon-margin' />
              {activeVersion.value.toUpperCase()}
            </DropdownToggle>
            <DropdownMenu>
              {Versions.map((version, i) => {
                return (
                  <DropdownItem
                    className={version.value == activeVersion.value ? 'active' : ''}
                    key={i}
                    onClick={() => this.onSelectVersion(version)}
                  >
                    {version.name}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
        <div className='title-box'>
          <div className='title'>{activeVersion.lang == 'en' ? activeBook.name : activeBook.name_id}</div>
          <UncontrolledDropdown>
            <DropdownToggle caret className='btn-outline-secondary btn-version'>
              {activeChapter}
            </DropdownToggle>
            <DropdownMenu>
              {chapters.map(chapter => {
                return (
                  <DropdownItem
                    key={chapter}
                    className={chapter == activeChapter ? 'active' : ''}
                    onClick={() => this.onSelectChapter(chapter)}
                  >
                    {chapter}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </UncontrolledDropdown>
          <button className='btn btn-secondary btn-headset'>
            <i className='ion ion-ios-headset' />
          </button>
        </div>
        <div className={`input-group mb-3 search-box ${isSearchFocused ? 'search-focused' : ''}`}>
          <input
            type='text'
            className='form-control input-outline-secondary'
            placeholder='Search'
            onFocus={() => this.onSearchFocus()}
            onBlur={() => this.onSearchBlur()}
            aria-label=''
            aria-describedby='basic-addon1'
            onChange={e => this.props.setText(e.target.value)}
            onKeyPress={target => target.charCode == 13 && this.onSearch()}
            value={text}
          />
          <div className='input-group-append'>
            <button className='btn btn-outline-secondary' type='button' onClick={() => this.onSearch()}>
              <i className='ion ion-ios-search' />
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default connect(
  state => ({
    bible: state.bible,
    search: state.search,
  }),
  dispatch => ({
    setActiveChapter: dispatch.bible.setActiveChapter,
    setActiveVersion: dispatch.bible.setActiveVersion,
    fetchSearch: dispatch.search.fetchSearch,
    setText: dispatch.search.setText,
  })
)(Toolbar);
