import React, {Component} from 'react';
import {push} from "react-router-redux";
import {connect} from "react-redux";
import '../../node_modules/glyphicons-only-bootstrap/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap';
import '../../node_modules/font-awesome/css/font-awesome.css';
import 'popper.js';
import './CSS/sideBar.css';


class SideMenuBar extends Component {
    render() {
        return (
            <div>
                <div className="area"/>
                <nav className="main-menu">
                    <ul>
                        <li>
                            <a onClick={() => this.props.redirect('/')}><i className="fa fa-home fa-2x"/><span className="nav-text">Página Principal</span></a>
                        </li>
                        <li className="has-subnav">
                            <a onClick={() => this.props.redirect('/register')}>
                                <i className="fa fa-address-card fa-2x"/><span className="nav-text">Novo Funcionário</span>
                            </a>

                        </li>
                    </ul>
                    <ul className="logout">
                        <li>
                            <a onClick={() => console.log("Todo implement the method logout")}>
                                <i className="fa fa-power-off fa-2x"/><span className="nav-text">Logout</span>
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
    redirect: push
});

export default connect(mapStateToProps, mapDispatchToProps)(SideMenuBar);