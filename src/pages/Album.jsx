import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import '../styles/album.css';

class Album extends React.Component {
  state = {
    allMusics: [],
  }

  componentDidMount() {
    this.getMuisicsInAPI();
  }

  getMuisicsInAPI = async () => {
    const { match: { params: { id } } } = this.props;

    const response = await getMusics(id);

    this.setState({
      allMusics: response,
    });
  }

  render() {
    const { allMusics } = this.state;

    const musics = allMusics.filter((music) => music.trackId);

    return (
      <div data-testid="page-album">
        <Header page="Albums" />
        <div className="container-album">
          {allMusics.length
          && (
            <div className="title-album">
              <h2 data-testid="artist-name">{ allMusics[0].artistName }</h2>
              <h3 data-testid="album-name">{ allMusics[0].collectionName }</h3>
            </div>)}
          {musics.length
          && musics.map((music) => (
            <MusicCard
              albumId={ music.collectionId }
              imgMusic={ music.artworkUrl100 }
              music={ music }
              key={ music.trackId }
              musicId={ music.trackId }
              musicName={ music.trackName }
              audio={ music.previewUrl }
            />
          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default Album;
