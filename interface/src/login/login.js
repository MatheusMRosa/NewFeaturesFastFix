import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux'
import {verifyLogin} from "./actionsLogin";
import {push} from "react-router-redux";

class LoginUser extends Component {
    componentDidUpdate(){
        if(this.props.loged){
            this.props.redirect('/list')
        }
    }
    render() {
        const {handleSubmit, verifyLogin} = this.props;
        const submit = (values)=>{
            verifyLogin(values);
        };
        return (
            <table>
                <thead>
                <tr>
                    <td className="input-group-text" id="basic-addon1">Usuário: </td>
                    <td><Field component="input"
                               placeholder="Digite seu usuário"
                               type="text"
                               name="user"
                               className="form-control"/></td>
                </tr>
                <tr>
                    <td className="input-group-text" id="basic-addon1">Senha: </td>
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
                        <button onClick={handleSubmit(submit)} className="btn btn-outline-success">Login</button>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }
}
const mapStateToProps = state=>({
    loged: state.user.loged
});

const mapDispathToProps=({
    verifyLogin: verifyLogin,
    redirect: push
});

export default reduxForm({form: 'loginForm'})(connect(mapStateToProps, mapDispathToProps)(LoginUser));