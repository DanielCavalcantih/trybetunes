import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from '../Components/Loading';
import Header from '../Components/Header';
import '../styles/profile.css';

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
        <Header page="Profile" />
        {loading ? <Loading /> : (
          <div className="container-profile">
            <div className="profile">
              <div>
                {(image === '') ? (
                  <img className="imgDefault" data-testid="profile-image" src="https://api-private.atlassian.com/users/88ece68c279a6595ebfe97d374b17234/avatar" alt="" />
                ) : <img data-testid="profile-image" src={ image } alt="" />}
                <p className="input-info">{ `Name: ${name}` }</p>
                <p className="input-info">{ `Email: ${email}` }</p>
                <p className="input-info">{ `Description: ${description}` }</p>
              </div>
              <div>
                <Link className="link-edit" to="/profile/edit">Profile Edit</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
