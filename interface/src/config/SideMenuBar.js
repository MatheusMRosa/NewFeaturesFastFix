import React, {Component} from 'react';
import {push} from "react-router-redux";
import {connect} from "react-redux";
import {logout} from '../login/actionsLogin';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap';
import 'popper.js';
import './CSS/sideBar.css';
import off from './images/power-off.svg';
import card from './images/address-card.svg';
import home from './images/home.svg';


class SideMenuBar extends Component {
    render() {
        return (
            <div>
                <div className="area"/>
                <nav className="main-menu">
                    <ul>
                        <li>
                            <a onClick={() => this.props.redirect('/')}>
                                <img src={home} alt="" className="fa fa-2x"/>
                                <span className="nav-text">Página Principal</span></a>
                        </li>
                        <li className="has-subnav">
                            <a onClick={() => this.props.redirect('/register')}>
                                <img src={card} alt="" className="fa fa-2x"/>
                                <span className="nav-text">Novo Funcionário</span>
                            </a>
                        </li>
                    </ul>
                    <ul className="logout">
                        <li>
                            <a onClick={() => {
                                this.props.logout();
                            }}>
                                <img src={off} alt="" className="fa fa-2x"/>
                                <span className="nav-text">Logout</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = ({
    logout: logout,
    redirect: push
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuBar);