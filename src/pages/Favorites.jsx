import React from 'react';
import Header from '../Components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';

class Favorites extends React.Component {
  state = {
    favoriteMusics: [],
    loading: false,
  }

  componentDidMount() {
    this.getFavoriteMusics();
  }

  getFavoriteMusics = async () => {
    this.setState({
      loading: true,
    });

    const favorites = await getFavoriteSongs();

    this.setState({
      favoriteMusics: favorites,
      loading: false,
    });
  }

  render() {
    const { favoriteMusics, loading } = this.state;

    if (loading) return <Loading />;

    return (
      <div data-testid="page-favorites">
        <Header />
        {favoriteMusics.map((music) => (
          <MusicCard
            removeTrackFunc={ this.getFavoriteMusics }
            music={ music }
            key={ music.trackId }
            musicId={ music.trackId }
            musicName={ music.trackName }
            audio={ music.previewUrl }
          />
        ))}
      </div>
    );
  }
}

export default Favorites;
