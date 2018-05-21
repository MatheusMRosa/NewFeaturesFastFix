import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import renderField from './RenderField';
import validate from './Validate';
import {connect} from 'react-redux';
import {push} from "react-router-redux";
import LoadingBar, {showLoading, hideLoading} from 'react-redux-loading-bar';
import {verifyLogin, verifySession} from "./actionsLogin";
import {backError} from '../user/actionsUser';
import '../config/CSS/login.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import '../../node_modules/bootstrap/dist/js/bootstrap';
import iconUser from '../config/images/iconUser.png';

class LoginUser extends Component {

    componentDidMount() {
        this.props.hideLoading('sectionBar');
        this.props.verifySession()
    }

    componentDidUpdate() {
        this.props.hideLoading('sectionBar');
        this.props.verifySession();
        if (this.props.logged) {
            this.props.redirect('/list');
        }
    }

    render() {
        const {handleSubmit, verifyLogin, submitting} = this.props;
        const submit = (values) => {
            this.props.showLoading('sectionBar');
            this.props.backError();
            verifyLogin(values);
        };
        const change = () => {
            this.props.backError()
        };
        return (
            <div className="container">
                <LoadingBar scope="sectionBar"/>
                <div className="main" style={{position: 'relative',top: 200}} align="center">
                    <div className="col-lg-12">
                        <div className="container">
                            <div className="col-lg-4"/>
                            <div className="col-lg-4">
                                <div className="row grids text-center">
                                    <div className="view view-tenth">
                                        <div className="inner_content clearfix">
                                            <div className="product_image">
                                                <img src={iconUser} className="img-responsive" alt=""
                                                     style={{marginLeft: "4%"}}/>
                                            </div>
                                            <div className="mask">
                                                <h2 style={{color: "black"}}>Bem-Vindo Usuário</h2>
                                                <div className="main">
                                                    <form>
                                                        <Field component={renderField}
                                                               label="Digite seu usuário"
                                                               type="text"
                                                               name="user"
                                                               className="text"
                                                               onChange={change}/>
                                                        <Field component={renderField}
                                                               label="Digite sua Senha"
                                                               type="password"
                                                               name="pass"
                                                               className="form-control"
                                                               onChange={change}/>
                                                        <div className="submit"><input type="submit"
                                                                                       disabled={submitting}
                                                                                       onClick={handleSubmit(submit)}
                                                                                       value="Login"/></div>
                                                        {this.props.forbidden === 403 ?
                                                            <div className="alert alert-danger" onAnimationStart={this.props.hideLoading('sectionBar')}>Usuário ou Senha
                                                                Incorretos</div>
                                                            : this.props.forbidden === 404 ?
                                                                this.props.redirect('/notFound')
                                                                :
                                                                null}
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
    showLoading: showLoading,
    hideLoading: hideLoading,
    backError: backError,
    redirect: push
});

export default reduxForm({form: 'loginForm', validate})(connect(mapStateToProps, mapDispatchToProps)(LoginUser));