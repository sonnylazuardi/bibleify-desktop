import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import Toolbar from './components/toolbar';
import Sidebar from './components/sidebar';
import Content from './components/content';
import Player from './components/player';
import Search from './components/search';

@connect(state => ({ bible: state.bible }), dispatch => ({ dispatch }))
export default class App extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch.bible.fetchVerses(this.props.bible);
  }

  componentWillReceiveProps(nextProps) {
    const { activeChapter, activeBook, activeVersion } = nextProps.bible;
    if (
      activeBook != this.props.bible.activeBook ||
      activeChapter != this.props.bible.activeChapter ||
      activeVersion != this.props.bible.activeVersion
    ) {
      this.props.dispatch.bible.fetchVerses(nextProps.bible);
    }
  }

  render() {
    const mergeStyle = Object.assign;
    return (
      <div style={mergeStyle({}, styles.flex, styles.column, styles.fullHeight)} className='root-wrapper'>
        <div style={mergeStyle({}, styles.flex, styles.row)}>
          <Sidebar />
          <div style={mergeStyle({}, styles.flex, styles.hidden)} className='content'>
            <Toolbar />
            <div style={mergeStyle({}, styles.flex)}>
              <Content />
              <Search />
            </div>
          </div>
        </div>
        <Player />
      </div>
    );
  }
}

const styles = {
  fullHeight: {
    height: '100vh',
  },
  overHidden: {
    overflow: 'hidden',
  },
  flex: {
    flex: 1,
    display: 'flex',
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
};
