import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class RegisterEmployee extends Component {
    render() {
        const {handleSubmit} = this.props;
        return (
            <table>
                <thead>
                <tr>
                    <td>Funcionário</td>
                    <td><Field component="input"
                               placeholder="Nome do Funcionário"
                               type="text"
                               name="name"/></td>
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

export default reduxForm({form: 'employeeForm'})(RegisterEmployee);