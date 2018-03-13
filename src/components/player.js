import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import Clappr from 'clappr';
import Slider from 'rc-slider';
import '../assets/styles/slider.scss';

@connect(state => ({ player: state.player, bible: state.bible }), dispatch => ({ dispatch }))
export default class Player extends PureComponent {
  componentDidMount() {
    this.player = new Clappr.Player({
      parent: this.playerRef,
      source: '',
      width: '0',
      height: '0',
      autoPlay: false,
      hlsjsConfig: {
        enableWorker: true,
      },
    });
    const Events = Clappr.Events;
    this.player.on(Events.PLAYER_TIMEUPDATE, progress => {
      this.props.dispatch.player.setTime({ currentTime: progress.current, totalTime: progress.total });
    });

    this.player.on(Events.PLAYER_ENDED, () => {
      const { repeat } = this.props.player;
      if (repeat) {
        this.onPlayNext();
      } else {
        this.props.dispatch.player.setPaused(true);
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.player.streamUrl != nextProps.player.streamUrl) {
      this.update(nextProps.player.streamUrl);
    }
    if (this.props.player.paused != nextProps.player.paused && nextProps.player.streamUrl) {
      if (nextProps.player.paused) {
        this.player.pause();
      } else {
        this.player.play();
      }
    }
  }

  onTogglePlay() {
    const { paused } = this.props.player;
    this.props.dispatch.player.setPaused(!paused);
  }

  playCurrentChapter() {
    this.props.dispatch.player.playCurrentChapter();
  }

  onPlayPrev() {
    this.props.dispatch.bible.prevChapter();
    setTimeout(this.playCurrentChapter.bind(this));
  }

  onPlayNext() {
    this.props.dispatch.bible.nextChapter();
    setTimeout(this.playCurrentChapter.bind(this));
  }

  update(source) {
    const { paused } = this.props.player;
    this.player.stop();
    if (source) {
      this.player.load(source);
      if (!paused) {
        this.player.play();
      }
    }
  }

  onChangeRepeat() {
    const { repeat } = this.props.player;
    this.props.dispatch.player.setRepeat(!repeat);
  }

  onSeek(value) {
    this.player.seek(value);
    this.props.dispatch.player.setCurrentTime(value);
  }

  onChangeVolume(value) {
    this.player.setVolume(value);
    this.props.dispatch.player.setVolume(value);
  }

  onClosePlayer() {
    this.props.dispatch.player.close();
  }

  render() {
    const { activeVersion } = this.props.bible;
    const { paused, totalTime, currentTime, repeat, book, chapter, volume } = this.props.player;

    return (
      <Fragment>
        <div id='player' ref={playerRef => (this.playerRef = playerRef)} />

        {book ? (
          <div style={{ height: 90 }} className='player'>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'row', height: '100%' }}>
              <div
                style={{
                  width: '180px',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  display: 'flex',
                }}
              >
                {book && chapter ? (
                  <div className='current-chapter'>
                    {activeVersion.lang == 'en' ? book.name : book.name_id} {chapter}
                  </div>
                ) : null}
              </div>

              <div style={{ flex: 1, justifyContent: 'center', flexDirection: 'column', display: 'flex' }}>
                <div style={{ flexDirection: 'row', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
                  <div className='btn-circle btn-darker' />
                  <button className='btn btn-circle btn-darker btn-outline-secondary' onClick={() => this.onPlayPrev()}>
                    <i className='ion ion-ios-skip-backward' />
                  </button>
                  <button className='btn btn-circle btn-play btn-outline-secondary' onClick={() => this.onTogglePlay()}>
                    {paused ? <i className='ion ion-ios-play' /> : <i className='ion ion-ios-pause' />}
                  </button>
                  <button className='btn btn-circle btn-darker btn-outline-secondary' onClick={() => this.onPlayNext()}>
                    <i className='ion ion-ios-skip-forward' />
                  </button>
                  <button
                    className='btn btn-circle btn-outline-secondary btn-dark'
                    onClick={() => this.onChangeRepeat()}
                  >
                    {repeat ? (
                      <i className='ion ion-ios-repeat ion-active' />
                    ) : (
                      <i className='ion ion-ios-repeat ion-inactive' />
                    )}
                  </button>
                </div>
                <div style={{ padding: 10 }}>
                  <Slider min={0} max={totalTime} value={currentTime} onChange={this.onSeek.bind(this)} />
                </div>
              </div>

              <div
                style={{
                  width: '180px',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  display: 'flex',
                  padding: 15,
                }}
              >
                <div
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    display: 'flex',
                  }}
                >
                  <button
                    className='btn btn-circle btn-outline-secondary btn-dark'
                    onClick={() => this.onClosePlayer()}
                  >
                    <i className='ion ion-ios-close' />
                  </button>
                </div>
                <div
                  style={{
                    padding: 10,
                    flexDirection: 'row',
                    display: 'flex',
                  }}
                >
                  <i className='ion ion-ios-volume-down ion-white' />
                  <Slider min={0} max={100} value={volume} onChange={this.onChangeVolume.bind(this)} />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </Fragment>
    );
  }
}
