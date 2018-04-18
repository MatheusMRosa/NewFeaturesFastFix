import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class RegisterService extends Component {
    render() {
        const {handleSubmit} = this.props;
        return (
            <div>
                <Field component="input"
                       placeholder="Nome do Funcionário"
                       type="text"
                       name="descService"/>
                <button onClick={handleSubmit}>Novo Serviço</button>
            </div>
        )
    }

}

export default reduxForm({form: 'serviceForm'})(RegisterService);