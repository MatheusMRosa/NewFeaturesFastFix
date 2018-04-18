import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {newEmployee} from './actionsEmployee';
import {push} from "react-router-redux";
import {connect} from 'react-redux'

let registerSubmit = false;

class RegisterEmployee extends Component {
    componentDidUpdate() {
        if (registerSubmit) {
            this.props.redirect('/list')
        }
    }
    render() {
        const {handleSubmit, newEmployee} = this.props;
        const submit = (values)=>{
            newEmployee(values);
            registerSubmit = true
        };
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
                        <button onClick={handleSubmit(submit)}>Salvar</button>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}

const mapStateToProps = state=>({});

const mapDispathToProps=({
    newEmployee: newEmployee,
    redirect: push
});

export default reduxForm({form: 'employeeForm'})(connect(mapStateToProps, mapDispathToProps)(RegisterEmployee));