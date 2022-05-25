import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

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

    if (!ready) {
      return <Loading />;
    }

    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">{ user.name }</h1>
        <nav>
          <Link to="/search" data-testid="link-to-search">Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </nav>
      </header>
    );
  }
}

export default Header;
