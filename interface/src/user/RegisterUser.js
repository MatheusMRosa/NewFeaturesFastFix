import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class RegisterUser extends Component {
    render() {
        const {handleSubmit} = this.props;
        return (
            <table>
                <thead>
                <tr>
                    <td>Usuário: </td>
                    <td><Field component="input"
                               placeholder="Nome de Usuário"
                               type="text"
                               name="user"/></td>
                </tr>
                <tr>
                    <td>Senha: </td>
                    <td><Field component="input"
                               placeholder="Digite uma Senha"
                               type="password"
                               name="pass"/></td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <button onClick={handleSubmit}>Salvar</button>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}

export default reduxForm({form: 'userForm'})(RegisterUser);