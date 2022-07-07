import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import '../styles/header.css';

class Header extends React.Component {
  state = {
    ready: false,
    user: [],
  }

  componentDidMount() {
    this.callGetUser();
  }

  callGetUser = async () => {
    const user = await getUser();

    this.setState({
      user,
    });
    this.setState({
      ready: true,
    });
  }

  render() {
    const { user, ready } = this.state;
    const { page } = this.props;

    if (!ready) {
      return <Loading />;
    }

    return (
      <header data-testid="header-component" className="header">
        <div className="title-header">
          <div className="h1Header">
            <h1>
              TrybeTunes
            </h1>
            <img className="imgHeader" src="https://cdn.shopify.com/s/files/1/0420/2505/files/9cpXLLzcE.gif?16178194085850646021" alt="" />
          </div>
          <div>
            <h2>{ page }</h2>
          </div>
          <Link className="linkProfile" to="/profile" data-testid="link-to-profile">
            <div className="user">
              <img className="userImg" src="https://www.citypng.com/public/uploads/small/11639594360nclmllzpmer2dvmrgsojcin90qmnuloytwrcohikyurvuyfzvhxeeaveigoiajks5w2nytyfpix678beyh4ykhgvmhkv3r3yj5hi.png" alt="" />
              <span data-testid="header-user-name">{ user.name }</span>
            </div>
          </Link>
        </div>
        <div className="nav">
          <Link className="link" to="/search" data-testid="link-to-search">
            Search
          </Link>
          <Link className="link" to="/favorites" data-testid="link-to-favorites">
            Favorites
          </Link>
          <Link className="link" to="/profile" data-testid="link-to-profile">
            Profile
          </Link>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Header;
