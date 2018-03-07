import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Clappr from 'clappr';

class Player extends PureComponent {
  destroyPlayer() {
    if (this.player) {
      this.player.destroy();
    }
    this.player = null;
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.player.streamUrl != nextProps.player.streamUrl) {
      return true;
    }
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.player.streamUrl != nextProps.player.streamUrl) {
      this.update(nextProps.player.streamUrl);
    }
  }

  update(source) {
    if (this.player) {
      this.destroyPlayer();
    }
    this.player = new Clappr.Player({
      parent: this.refs.player,
      source: source,
      width: '0',
      height: '0',
      autoPlay: true,
      hlsjsConfig: {
        enableWorker: true,
      },
    });
  }

  render() {
    const { activeBook, activeVersion } = this.props.bible;
    return (
      <div className='player'>
        <div id='player' ref='player' />
      </div>
    );
  }
}

export default connect(
  state => ({
    bible: state.bible,
    player: state.player,
  }),
  dispatch => ({})
)(Player);
