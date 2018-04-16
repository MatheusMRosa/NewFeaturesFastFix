import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class LoginUser extends Component {
    render() {
        const {handleSubmit} = this.props;
        return (
            <table>
                <thead>
                <tr>
                    <td className="input-group-text" id="basic-addon1">Usuário:</td>
                    <td><Field component="input"
                               placeholder="Digite seu usuário"
                               type="text"
                               name="user"
                               className="form-control"/></td>
                </tr>
                <tr>
                    <td className="input-group-text" id="basic-addon1">Senha:</td>
                    <td><Field component="input"
                               placeholder="Digite sua Senha"
                               type="password"
                               name="pass"
                               className="form-control"/></td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <button onClick={handleSubmit} className="btn btn-outline-success">Login</button>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}

export default reduxForm({form: 'loginForm'})(LoginUser);