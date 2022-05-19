import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    searchInput: '',
    searchSaved: '',
    buttonDisabled: true,
    loading: false,
    buttonActive: false,
    albums: [],
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      searchInput: value,
      searchSaved: value,
      buttonDisabled: value.length <= 1,
    });
  }

  searchArtist = async () => {
    const { searchInput } = this.state;

    this.setState({
      buttonActive: true,
    });

    this.setState({
      searchInput: '',
      searchSaved: searchInput,
      loading: true,
    });

    const response = await searchAlbumsAPIs(searchInput);

    this.setState({
      albums: response,
      loading: false,
    });
  }

  render() {
    const {
      buttonDisabled,
      searchInput,
      loading,
      searchSaved,
      buttonActive,
      albums } = this.state;

    if (!loading) {
      return (
        <div data-testid="page-search">
          <Header />
          <input
            type="text"
            data-testid="search-artist-input"
            value={ searchInput }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ buttonDisabled }
            onClick={ this.searchArtist }
          >
            Pesquisar
          </button>
          {buttonActive && (
            <h3>
              Resultado de álbuns de:
              { ` ${searchSaved}` }
            </h3>
          )}
          {!albums.length ? (
            <span>Nenhum álbum foi encontrado</span>
          ) : (
            <ul>
              {albums.map((album) => (
                <Link
                  key={ album.collectionId }
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  <li>
                    <p>{ album.collectionName }</p>
                    <img src={ album.artworkUrl100 } alt="" />
                  </li>
                </Link>
              ))}
            </ul>)}
        </div>
      );
    }

    return (
      <Loading />
    );
  }
}

export default Search;
