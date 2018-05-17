import React, {Component} from 'react';
import {connect} from 'react-redux'
import {push} from "react-router-redux";
import {backError} from '../user/actionsUser';
import '../config/CSS/pageNotFound.css'

class PageNotFound extends Component {
    render() {
        return (
            <div className="size">
                <p className="letterSize"> Ooops!</p>
                <p className="letterSize2">Servidor não foi encontrado</p>
                <p className="letterSize2">Verifique sua conexão com o servidor</p>
                <div className="sizeB">
                    <button className="btn btn-dark" onClick={() => {
                        this.props.backError();
                        this.props.redirect('/');
                    }}>
                        Clique para voltar a tela inicial
                    </button>
                </div>
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