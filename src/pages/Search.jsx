import React from 'react';
import Header from '../Components/Header';

class Search extends React.Component {
  state = {
    searchInput: '',
    buttonDisabled: true,
  }

  handleChange = ({ target }) => {
    const { value } = target;
    this.setState({
      searchInput: value,
      buttonDisabled: value.length <= 1,
    });
  }

  render() {
    const { buttonDisabled, searchInput } = this.state;

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
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
