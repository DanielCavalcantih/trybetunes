import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class Login extends React.Component {
  state = {
    nome: '',
    userEmail: '',
    loading: false,
    buttonDisabled: true,
    userCreated: false,
  }

  handleChange = ({ target }) => {
    const { value, id } = target;
    const maxLength = 3;

    this.setState({
      [id]: value,
    });

    if (value.length >= maxLength) {
      this.setState({
        buttonDisabled: false,
      });
    }
  }

  getCreatUser = async () => {
    const { nome, userEmail } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({
      name: nome, email: userEmail });
    this.setState({
      userCreated: true,
    });
  }

  render() {
    const {
      buttonDisabled,
      nome, userEmail, loading, userCreated } = this.state;

    if (!loading) {
      return (
        <div data-testid="page-login" className="container">
          <h2 className="title">TrybeTunes</h2>
          <form className="form">
            <div className="div-form">
              <label htmlFor="user">
                User :
                <input
                  id="nome"
                  type="text"
                  data-testid="login-name-input"
                  value={ nome }
                  onChange={ this.handleChange }
                  placeholder="User"
                />
              </label>
              <label htmlFor="userEmail">
                Email :
                <input
                  id="userEmail"
                  type="email"
                  value={ userEmail }
                  onChange={ this.handleChange }
                  placeholder="Email"
                />
              </label>
              <button
                className="button-login"
                type="button"
                data-testid="login-submit-button"
                disabled={ buttonDisabled }
                onClick={ this.getCreatUser }
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      );
    }

    if (loading && !userCreated) {
      return <Loading />;
    }

    return <Redirect to="/search" />;
  }
}

export default Login;
