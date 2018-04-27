import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {newEmployee} from './actionsEmployee';
import {push} from "react-router-redux";
import {connect} from 'react-redux'

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Campo Obrigatório, Por Favor insira um nome para o Funcionário';
    }
    return errors
};

const renderField = ({input, label, type, meta: {touched, error}}) => (
    <div>
        <input {...input} placeholder={label} type={type}/>
        {touched && (error && <div className="alert alert-danger" role="alert">{error}</div>)}
    </div>
);

class RegisterEmployee extends Component {
    componentDidUpdate() {
        if (!this.props.logged) {
            this.props.redirect('/')
        }
    }

    render() {
        const {handleSubmit, newEmployee, submitting} = this.props;
        const submit = (values) => {
            newEmployee(values);
            this.props.redirect('/list')
        };
        return (
            <div>
                <div>Funcionário</div>
                <div><Field component={renderField}
                            label="Nome do Funcionário"
                            type="text"
                            name="name"/>
                </div>
                <div>
                    <button disabled={submitting} onClick={handleSubmit(submit)}>Salvar</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    logged: state.user.logged,
    employeeSaved: state.employees.employeeSaved
});

const mapDispatchToProps = ({
    newEmployee: newEmployee,
    redirect: push
});

export default reduxForm({
    form: 'employeeForm',
    validate
})(connect(mapStateToProps, mapDispatchToProps)(RegisterEmployee));