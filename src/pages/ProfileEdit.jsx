import React from 'react';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class ProfileEdit extends React.Component {
  state = {
    loading: false,
    infoUser: {},
    nome: '',
    email: '',
    descricao: '',
    urlImg: '',
    buttonDisabled: true,
  }

  componentDidMount() {
    this.callGetUser();
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    const maxLength = 1;

    this.setState({
      [name]: value,
    });

    const { nome, email, descricao, urlImg } = this.state;

    if (nome.length >= maxLength
      && email.length >= maxLength
      && descricao.length >= maxLength
      && urlImg.length >= maxLength) {
      this.setState({
        buttonDisabled: false,
      });
    } else {
      this.setState({
        buttonDisabled: true,
      });
    }
  }

  activeButton = () => {
    const { nome, email, descricao, urlImg } = this.state;
    const minLength = nome.length + email.length + descricao.length + urlImg.length;
    const min = 4;

    if (minLength > min) this.setState({ buttonDisabled: false });
  }

  callGetUser = async () => {
    this.setState({
      loading: true,
    });

    const info = await getUser();

    this.setState({
      loading: false,
      infoUser: info,
    });
  }

  render() {
    const {
      loading,
      infoUser,
      nome,
      email,
      descricao,
      urlImg,
      buttonDisabled } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header page="Profile Edit" />
        {loading ? <Loading /> : (
          <div>
            <form action="">
              <input
                name="nome"
                onChange={ this.handleChange }
                placeholder={ infoUser.name }
                value={ nome }
                data-testid="edit-input-name"
                type="text"
                required
              />
              <input
                name="email"
                onChange={ this.handleChange }
                placeholder={ infoUser.email }
                value={ email }
                data-testid="edit-input-email"
                type="email"
                required
              />
              <textarea
                name="descricao"
                onChange={ this.handleChange }
                value={ descricao }
                data-testid="edit-input-description"
                required
              />
              <input
                name="urlImg"
                onChange={ this.handleChange }
                value={ urlImg }
                data-testid="edit-input-image"
                type="url"
                required
              />
              <button
                data-testid="edit-button-save"
                type="button"
                disabled={ buttonDisabled }
              >
                Save
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default ProfileEdit;
