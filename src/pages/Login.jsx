import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class Login extends React.Component {
  state = {
    nome: '',
    loading: false,
    buttonDisabled: true,
    userCreated: false,
  }

  handleChange = ({ target }) => {
    const { value } = target;
    const maxLength = 3;

    this.setState({
      nome: value,
    });

    if (value.length >= maxLength) {
      this.setState({
        buttonDisabled: false,
      });
    }
  }

  getCreatUser = async () => {
    const { nome } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name: nome });
    this.setState({
      userCreated: true,
    });
  }

  render() {
    const { buttonDisabled, nome, loading, userCreated } = this.state;

    if (!loading) {
      return (
        <div data-testid="page-login">
          <h2>Login</h2>
          <form>
            <input
              type="text"
              data-testid="login-name-input"
              value={ nome }
              onChange={ this.handleChange }
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ buttonDisabled }
              onClick={ this.getCreatUser }
            >
              Entrar
            </button>
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
