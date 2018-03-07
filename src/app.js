import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Toolbar from './components/toolbar';
import Sidebar from './components/sidebar';
import Content from './components/content';
import Player from './components/player';
import Search from './components/search';

class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchVerses(this.props.bible);
  }

  componentWillReceiveProps(nextProps) {
    const { activeChapter, activeBook, activeVersion } = nextProps.bible;
    if (
      activeBook != this.props.bible.activeBook ||
      activeChapter != this.props.bible.activeChapter ||
      activeVersion != this.props.bible.activeVersion
    ) {
      this.props.fetchVerses(nextProps.bible);
    }
  }

  render() {
    return (
      <div className='root-wrapper'>
        <Sidebar />
        <div className='content'>
          <Toolbar />
          <div style={{ flex: 1, display: 'flex' }}>
            <Content />
            <Search />
          </div>
        </div>
        <Player />
      </div>
    );
  }
}

export default connect(
  state => ({
    bible: state.bible,
  }),
  dispatch => ({
    fetchVerses: dispatch.bible.fetchVerses,
  })
)(App);
