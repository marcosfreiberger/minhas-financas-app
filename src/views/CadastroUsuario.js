import React from 'react';
import Card from '../components/Card';
import FormGroup from '../components/FormGroup';
import { withRouter } from 'react-router-dom';
import UsuarioService from './../app/service/usuarioService';
import { mensagemSucesso, mensagemErro } from './../components/toastr';
import LocalStorageService from './../app/service/localstorageService';

class CadastroUsuario extends React.Component {
  state = {
    nome: '',
    email: '',
    senha: '',
    senhaRepeticao: '',
  };

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  cadastrar = () => {
    const { nome, email, senha, senhaRepeticao } = this.state;

    const usuario = { nome, email, senha, senhaRepeticao };

    try {
      this.service.validar(usuario);
    } catch (error) {
      const mensagens = error.mensagens;
      mensagens.forEach((msg) => mensagemErro(msg));
      return false;
    }

    this.service
      .salvar(usuario)
      .then((response) => {
        mensagemSucesso(
          'Usuário cadastrado com sucesso! Faça o login para acessar o sistema.',
        );
        this.props.history.push('/login');
      })
      .catch((error) => {
        mensagemErro(error.response.data);
      });
  };

  cancelar = () => {
    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

    if (usuarioLogado) {
      this.props.history.push('/home');
    } else {
      this.props.history.push('/login');
    }
  };

  render() {
    return (
      <Card title='Cadastro de Usuário'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Nome: *' htmlFor='inputNome'>
                <input
                  type='text'
                  id='inputNome'
                  className='form-control'
                  name='nome'
                  onChange={(e) => this.setState({ nome: e.target.value })}
                />
              </FormGroup>
              <FormGroup label='Email: *' htmlFor='inputEmail'>
                <input
                  type='email'
                  id='inputEmail'
                  className='form-control'
                  name='email'
                  onChange={(e) => this.setState({ email: e.target.value })}
                />
              </FormGroup>
              <FormGroup label='Senha: *' htmlFor='inputSenha'>
                <input
                  type='password'
                  id='inputSenha'
                  className='form-control'
                  name='senha'
                  onChange={(e) => this.setState({ senha: e.target.value })}
                />
              </FormGroup>
              <FormGroup label='Repita a Senha: *' htmlFor='inputRepitaSenha'>
                <input
                  type='password'
                  id='inputRepitaSenha'
                  className='form-control'
                  name='senhaRepeticao'
                  onChange={(e) =>
                    this.setState({ senhaRepeticao: e.target.value })
                  }
                />
              </FormGroup>
              <button onClick={this.cadastrar} className='btn btn-success'>
                <i className='pi pi-save mr-2'></i> Salvar
              </button>
              <button onClick={this.cancelar} className='btn btn-danger'>
                <i className='pi pi-times mr-2'></i> Cancelar
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

export default withRouter(CadastroUsuario);
