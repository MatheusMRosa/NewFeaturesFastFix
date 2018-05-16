import React, { Component } from 'react';
import { connect } from 'react-redux'
import { push } from "react-router-redux";
import { backError } from '../user/actionsUser';
// import image404 from '../config/images/404.png';
import '../config/CSS/pageNotFound.css'

class PageNotFound extends Component {
    render() {
        return (
            <div className="imgBack">
                <p className="letterSize"> Ooops!</p>
                <p className="letterSize2">Servidor não foi encontrado</p>
                <p className="letterSize2">Verifique sua conexão com o servidor</p>
                <div>
                    <button className="btn btn-dark" onClick={() => {
                        this.props.redirect('/');
                        this.props.backError()
                    }}>
                        Clique para voltar a tela inicial
                        </button>
                </div>
                {/* <img src={image404} alt="" className="imgSize" /> */}
            </div>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = ({
    backError: backError,
    redirect: push
});

export default connect(mapStateToProps, mapDispatchToProps)(PageNotFound);