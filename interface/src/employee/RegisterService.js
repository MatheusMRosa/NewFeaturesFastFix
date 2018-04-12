import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class RegisterService extends Component {
    render() {
        const {handleSubmit} = this.props;
        return (
            <table>
                <tbody>
                <tr>
                    <td><Field component="input"
                               placeholder="Nome do Funcionário"
                               type="text"
                               name="descService"/></td>
                    <td>
                        <button onClick={handleSubmit}>Novo Serviço</button>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }

}

export default reduxForm({form: 'serviceForm'})(RegisterService);