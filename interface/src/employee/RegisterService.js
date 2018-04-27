import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {addServiceInEmployee} from './actionsEmployee';
import {connect} from "react-redux";
import {push} from "react-router-redux";

class RegisterService extends Component {

    componentDidUpdate() {
        if (this.props.serviceAdded){
            this.props.redirect('/list');
        }
    }

    componentDidMount () {
        if (!this.props.employeeSelected) {
            this.props.redirect('/')
        }
    }

    render() {

        const {handleSubmit, addServiceInEmployee} = this.props;
        const submit = (values) => {
            addServiceInEmployee(this.props.employeeSelected, values);
        };
        return (
            <div>
                <Field component="input"
                       placeholder="Descrição do Serviço"
                       type="text"
                       name="descService"/>
                <div>{new Date().toString()}</div>
                <Field component="input"
                       placeholder="Tempo estimado"
                       type="time"
                       name="estimate"/>
                <button onClick={handleSubmit(submit)}>Novo Serviço</button>
            </div>
        )
    }

}

const mapStateToProps = state => ({
    employeeSelected: state.employees.employeeSelected,
    serviceAdded: state.employees.serviceAdded
});

const mapDispatchToProps = ({
    addServiceInEmployee: addServiceInEmployee,
    redirect: push
});

export default reduxForm({form: 'serviceForm'})(connect(mapStateToProps, mapDispatchToProps)(RegisterService));