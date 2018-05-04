import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux'
import {verifyLogin, verifySession} from "./actionsLogin";
import {push} from "react-router-redux";
import '../config/CSS/login.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import '../../node_modules/bootstrap/dist/js/bootstrap';
import iconUser from '../config/images/iconUser.png'

const validate = values => {
    const errors = {};
    if (!values.user) {
        errors.user = 'Campo Obrigatório, Por Favor insira seu Usuário';
    } else if (!values.pass) {
        errors.pass = 'Campo Obrigatório, Por Favor insira sua Senha';
    }
    return errors
};

const renderField = ({input, label, type, meta: {touched, error}}) => (
    <div>
        <input {...input} placeholder={label} type={type}/>
        {touched && (error && <div className="alert alert-danger" role="alert">{error}</div>)}
    </div>
);

class LoginUser extends Component {

    componentDidMount() {
       this.props.verifySession()
    }

    componentDidUpdate() {
        if (this.props.logged) {
            this.props.redirect('/list')
        }
    }

    render() {
        const {handleSubmit, verifyLogin, submitting} = this.props;
        const submit = (values) => {
            verifyLogin(values);
        };
        return (
            <div className="main" style={{marginTop: "15%"}} align="center">
                <div className="col-lg-12">
                    <div className="container">
                        <div className="col-lg-4"/>
                        <div className="col-lg-4">
                            <div className="row grids text-center">
                                <div className="view view-tenth">
                                    <div className="inner_content clearfix">
                                        <div className="product_image">
                                            <img src={iconUser} className="img-responsive" alt="" style={{marginLeft: "4%"}}/>
                                        </div>
                                        <div className="mask">
                                            <h2 style={{color: "black"}}>Bem-Vindo Usuário</h2>
                                            <div className="main">
                                                <form>
                                                    <Field component={renderField}
                                                           label="Digite seu usuário"
                                                           type="text"
                                                           name="user"
                                                           className="text"/>
                                                    <Field component={renderField}
                                                           label="Digite sua Senha"
                                                           type="password"
                                                           name="pass"
                                                           className="form-control"/>
                                                    <div className="submit"><input type="submit"
                                                                                   disabled={submitting}
                                                                                   onClick={handleSubmit(submit)}
                                                                                   value="Login"/></div>
                                                    {this.props.forbidden? <div className="alert alert-danger">Error</div>: null}
                                                    <div className="clearfix"/>
                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4"/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    logged: state.user.logged,
    forbidden: state.user.error
});

const mapDispatchToProps = ({
    verifyLogin: verifyLogin,
    verifySession: verifySession,
    redirect: push
});

export default reduxForm({form: 'loginForm', validate})(connect(mapStateToProps, mapDispatchToProps)(LoginUser));