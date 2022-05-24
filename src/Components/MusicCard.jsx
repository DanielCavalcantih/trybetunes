import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    inputCheck: false,
  }

  componentDidMount() {
    this.getListFavorites();
  }

  getAddSong = async () => {
    const { music } = this.props;
    const { inputCheck } = this.state;

    if (!inputCheck) {
      this.setState({
        loading: true,
        inputCheck: true,
      });

      await addSong(music);

      this.setState({
        loading: false,
      });
    } else {
      this.setState({
        inputCheck: false,
        loading: true,
      });

      await removeSong(music);

      this.setState({ loading: false });
    }
  };

  getListFavorites = async () => {
    const { music } = this.props;

    const favorites = await getFavoriteSongs();
    console.log(favorites);

    favorites.forEach((favorite) => {
      if (favorite.trackId === music.trackId) this.setState({ inputCheck: true });
    });
  }

  render() {
    const { musicName, audio, musicId } = this.props;
    const { loading, inputCheck } = this.state;

    if (loading) {
      return <Loading />;
    }

    return (
      <>
        <p>{ musicName }</p>
        <audio data-testid="audio-component" src={ audio } controls>
          <track kind="captions" />
        </audio>
        <label htmlFor="inputFavorite">
          Favorita
          <input
            type="checkbox"
            id="inputFavorite"
            checked={ inputCheck }
            data-testid={ `checkbox-music-${musicId}` }
            onChange={ this.getAddSong }
          />
        </label>
      </>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  audio: PropTypes.string.isRequired,
  musicId: PropTypes.number.isRequired,
  music: PropTypes.shape().isRequired,
};

export default MusicCard;
