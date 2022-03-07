import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Logo from './Logo.png';
// import Input from '../components/Input/index';
import { setEmail as setEmailAction } from '../actions/index';
import './Login.css';

class Login extends React.Component {
  // Método que cria e inicia o objeto criado pela nossa classe Login
  constructor() {
    super();

    // estado inicial
    this.state = {
      email: '',
      password: '',
      validEmail: false,
      validPassword: false,
    };

    // As funções abaixo (this.) vinculam manualmente o this às nossas funções handle
    // Para as funções handle terem acesso ao (this.) e acessarem o estado/props/etc
    // O (this.) acessa nos componentes um objeto que guarda tudo o que importa àquele componente.
    this.handleCheckEmail = this.handleCheckEmail.bind(this);
    this.handleCheckPassword = this.handleCheckPassword.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // Função que recebe o evento como parâmetro, onde pegando o valor atual do input,
  // chamo a função setState do componente passando um novo estado para ele.
  handleCheckEmail({ target }) {
    // https://www.horadecodar.com.br/2020/09/07/expressao-regular-para-validar-e-mail-javascript-regex/
    const emailRegex = /\S+@\S+\.\S+/;
    const validEmail = emailRegex.test(target.value);

    // Função assíncrona para redefinir o estado inicial para o desejado
    this.setState({
      email: target.value,
      validEmail,
    });
  }

  handleCheckPassword({ target: { value } }) {
    const PASSWORD_MIN__LENGTH = 6;
    const validPassword = value.length >= PASSWORD_MIN__LENGTH;

    this.setState({
      password: value,
      validPassword,
    });
  }

  handleClick(event) {
    event.preventDefault();
    const { history, setEmail } = this.props; // acessa history e a action setEmail e suas props
    const { email } = this.state; // acessa o stado do 'email'

    setEmail(email);
    history.push('/carteira'); // redireciona para a router 'carteira'
  }

  render() {
    const { email, password, validEmail, validPassword } = this.state;

    return (
      <>
        <div>
          <img className="login-img" src={ Logo } alt="LogoComponente" />
        </div>
        <form className="form-login">
          <input
            className="login-name"
            data-testid="email-input"
            placeholder="email@exemplo.com"
            type="email"
            name="email"
            id="email"
            testId="email-input"
            value={ email }
            onChange={ this.handleCheckEmail }
          />

          <input
            className="login-password"
            placeholder="senha"
            data-testid="password-input"
            type="password"
            name="password"
            id="password"
            testId="password-input"
            value={ password }
            onChange={ this.handleCheckPassword }
          />

          <button
            className="submit-button"
            disabled={ !validEmail || !validPassword }
            type="submit"
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  setEmail: PropTypes.func.isRequired,
};

// Usado para Dipachar a Ação (setEmail)
const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(setEmailAction(email)),
});

export default connect(null, mapDispatchToProps)(Login);

// Conceitos de React e Redux extraidos do Course Bloco 11 e Bloco 15.
