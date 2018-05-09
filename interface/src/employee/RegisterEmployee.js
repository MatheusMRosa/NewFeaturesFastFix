import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {newEmployee} from './actionsEmployee';
import {push} from "react-router-redux";
import {connect} from 'react-redux'
import newEmployeeIcon from '../config/images/newEmployee.png';

const validate = values => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Por Favor insira um nome para o Funcionário';
    }
    return errors
};

const renderField = ({input, label, type, meta: {touched, error}}) => (
    <div>
        <input {...input} placeholder={label} type={type} className="form-control"/>
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
            this.props.redirect('/')
            window.location.reload()
        };
        return (
            <div className="container card" style={{marginTop: 100, width: 500, height: 500}}>
                <h3 className="card-title">Novo Funcionário</h3>
                <img src={newEmployeeIcon} alt="New Employee"/>
                <div style={{marginTop: 20}}><Field component={renderField}
                            label="Nome do Funcionário"
                            type="text"
                            name="name"/>
                </div>
                <div align="center">
                    <button disabled={submitting} onClick={handleSubmit(submit)} style={{marginTop: 15}} className="btn btn-outline-success">Salvar</button>
                    <button disabled={submitting} onClick={() => this.props.redirect('/')} style={{marginTop: 15, marginLeft: 10}} className="btn btn-outline-danger">Cancelar</button>
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