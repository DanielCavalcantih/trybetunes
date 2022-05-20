import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { musicName, audio } = this.props;

    return (
      <>
        <p>{ musicName }</p>
        <audio data-testid="audio-component" src={ audio } controls>
          <track kind="captions" />
        </audio>
      </>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  audio: PropTypes.string.isRequired,
};

export default MusicCard;
