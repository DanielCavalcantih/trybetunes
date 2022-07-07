import React from 'react';
import Header from '../Components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';
import '../styles/favorites.css';

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

    return (
      <div data-testid="page-favorites">
        <Header page="Favorites" />
        {loading ? <Loading /> : (
          <div className="favorite-musics">
            {favoriteMusics.map((music) => (
              <MusicCard
                albumId={ music.collectionId }
                imgMusic={ music.artworkUrl100 }
                albumName={ music.collectionName }
                removeTrackFunc={ this.getFavoriteMusics }
                music={ music }
                key={ music.trackId }
                musicId={ music.trackId }
                musicName={ music.trackName }
                audio={ music.previewUrl }
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
