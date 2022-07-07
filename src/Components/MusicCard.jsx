import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import '../styles/music-card.css';

class MusicCard extends React.Component {
  state = {
    loading: false,
    inputCheck: false,
  }

  componentDidMount() {
    this.getListFavorites();
  }

  getAddSong = async () => {
    const { music, removeTrackFunc } = this.props;
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

      if (removeTrackFunc) removeTrackFunc();

      this.setState({ loading: false });
    }
  };

  getListFavorites = async () => {
    const { music } = this.props;

    const favorites = await getFavoriteSongs();

    favorites.forEach((favorite) => {
      if (favorite.trackId === music.trackId) this.setState({ inputCheck: true });
    });
  }

  render() {
    const { musicName, audio, musicId, imgMusic, albumName, albumId } = this.props;
    const { loading, inputCheck } = this.state;

    return (
      <div className="container-musics">
        {loading ? <Loading /> : (
          <div className="card-music">
            <img className="imgMusic" src={ imgMusic } alt="" />
            <div>
              <p className="music-name">{ musicName }</p>
              <Link className="link-to-album" to={ `/album/${albumId}` }>
                <p className="album-name">{ albumName }</p>
              </Link>
            </div>
            <audio data-testid="audio-component" src={ audio } controls>
              <track kind="captions" />
            </audio>
            <label htmlFor="inputFavorite">
              Favorita
              <input
                className="check"
                type="checkbox"
                id="inputFavorite"
                checked={ inputCheck }
                data-testid={ `checkbox-music-${musicId}` }
                onChange={ this.getAddSong }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  audio: PropTypes.string.isRequired,
  musicId: PropTypes.number.isRequired,
  music: PropTypes.shape().isRequired,
  imgMusic: PropTypes.string.isRequired,
  removeTrackFunc: PropTypes.func.isRequired,
  albumName: PropTypes.string.isRequired,
  albumId: PropTypes.number.isRequired,
};

export default MusicCard;
