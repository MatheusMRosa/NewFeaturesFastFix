import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class LoginUser extends Component {
    render() {
        const {handleSubmit} = this.props;
        return (
            <table>
                <thead>
                <tr>
                    <td>Usuário: </td>
                    <td><Field component="input"
                               placeholder="Digite seu usuário"
                               type="text"
                               name="name"/></td>
                </tr>
                <tr>
                    <td>Senha: </td>
                    <td><Field component="input"
                               placeholder="Digite sua Senha"
                               type="text"
                               name="name"/></td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <button onClick={handleSubmit}>Login</button>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}

export default reduxForm({form: 'loginForm'})(LoginUser);