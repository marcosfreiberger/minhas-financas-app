/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';
import Home from '../views/Home';
import Login from '../views/Login';
import CadastroUsuario from '../views/CadastroUsuario';
import ConsultaLancamentos from '../views/lancamentos/ConsultaLancamentos';
import CadastroLancamentos from './../views/lancamentos/CadastroLancamentos';
import { AuthConsumer } from './ProvedorAutenticacao';

function RotaAutenticada({
  component: Component,
  isUsuarioAutenticado,
  ...props
}) {
  return (
    <Route
      {...props}
      render={(componentProps) => {
        if (isUsuarioAutenticado) {
          return <Component {...componentProps} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: componentProps.location },
              }}
            />
          );
        }
      }}
    />
  );
}

function Rotas(props) {
  return (
    <HashRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/cadastro-usuario' component={CadastroUsuario} />

        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path='/home'
          component={Home}
        />
        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path='/consulta-lancamentos'
          component={ConsultaLancamentos}
        />
        <RotaAutenticada
          isUsuarioAutenticado={props.isUsuarioAutenticado}
          path='/cadastro-lancamentos/:id?'
          component={CadastroLancamentos}
        />
      </Switch>
    </HashRouter>
  );
}

export default () => (
  <AuthConsumer>
    {(context) => <Rotas isUsuarioAutenticado={context.isAutenticado} />}
  </AuthConsumer>
);
