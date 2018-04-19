import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux'
import {verifyLogin} from "./actionsLogin";
import {push} from "react-router-redux";
import '../config/CSS/login.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import '../../node_modules/bootstrap/dist/js/bootstrap';

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
            <div className="main" style={{padding:"2%",marginTop:"10%"}} align="center">
                <div className="col-lg-12">
                    <div className="container">
                        <div className="col-lg-4"/>
                        <div className="col-lg-4">
                            <div className="row grids text-center">
                                <div className="view view-tenth">
                                    <div className="inner_content clearfix">
                                        <div className="product_image">
                                            <img src="http://www.arrayform.com/wp-content/uploads/2017/02/user@2x.png"
                                                 className="img-responsive" alt="" style={{margin:"0% auto"}}/>
                                        </div>
                                        <div className="label-product">
                                            <span className="new">USER LOGIN</span>
                                        </div>
                                        <div className="mask" style={{width:"100% !important"}}>
                                            <h2>Welcome User</h2>
                                            <div className="main">
                                                <form>
                                                    <Field component="input"
                                                               placeholder="Digite seu usuário"
                                                               type="text"
                                                               name="user"
                                                               className="text"/>
                                                    <Field component="input"
                                                           placeholder="Digite sua Senha"
                                                           type="password"
                                                           name="pass"
                                                           className="form-control"/>
                                                            <div className="submit"><input type="submit"
                                                                                           onClick={handleSubmit(submit)}
                                                                                           value="Login"/></div>
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
const mapStateToProps = state=>({
    loged: state.user.loged
});

const mapDispathToProps=({
    verifyLogin: verifyLogin,
    redirect: push
});

export default reduxForm({form: 'loginForm'})(connect(mapStateToProps, mapDispathToProps)(LoginUser));