import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

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

    // const musics = response.filter((res) => res.wrapperType === 'track');
    // const album = response.find((res) => res.wrapperType === 'collection').collectionName;
    // const image = response.find((res) => res.wrapperType === 'collection').artworkUrl100;
    // const artist = response.find((res) => res.wrapperType === 'collection').artistName;

    this.setState({
      allMusics: response,
      // albumName: album,
      // albumImageUrl: image,
      // artistName: artist,
    });
  }

  render() {
    const { allMusics } = this.state;

    const musics = allMusics.filter((music) => music.trackId);

    return (
      <div data-testid="page-album">
        <Header />
        <img src={ allMusics[0] } alt="" />
        {allMusics.length
        && (
          <div>
            <p data-testid="artist-name">{ allMusics[0].artistName }</p>
            <h3 data-testid="album-name">{ allMusics[0].collectionName }</h3>
          </div>)}
        {musics.length
        && musics.map((music) => (
          <MusicCard
            key={ music.trackId }
            musicName={ music.trackName }
            audio={ music.previewUrl }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape().isRequired,
};

export default Album;
