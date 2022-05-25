import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../Components/Loading';
import Header from '../Components/Header';

class Profile extends React.Component {
  state = {
    loading: false,
    description: '',
    email: '',
    image: '',
    name: '',
  }

  async componentDidMount() {
    this.setState({ loading: true });
    const userInfo = await getUser();
    this.setState({ ...userInfo, loading: false });
  }

  render() {
    const { loading, description, email, image, name } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />
        {loading ? <Loading /> : (
          <div>
            <div>
              {(image === '') ? (
                <img data-testid="profile-image" src="https://api-private.atlassian.com/users/88ece68c279a6595ebfe97d374b17234/avatar" alt="" />
              ) : <img data-testid="profile-image" src={ image } alt="" />}
              <p>{ name }</p>
              <p>{ email }</p>
              <p>{ description }</p>
              <Link to="/profile/edit">Editar perfil</Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
