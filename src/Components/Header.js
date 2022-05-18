import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    ready: false,
    user: [],
  }

  async componentDidMount() {
    this.setState({
      user: await getUser(),
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
      </header>
    );
  }
}

export default Header;
