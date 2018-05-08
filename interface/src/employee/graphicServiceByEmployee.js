import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from "react-router-redux";
import c3 from "c3";


class GraphicService extends Component {
    componentWillMount() {
        if ((!this.props.logged) || (this.props.graphic === undefined)) {
            this.props.redirect('/')
        }
    }

    componentDidMount() {
        if (this.props.graphic !== undefined) {
            c3.generate({
                bindto: '#chart',
                data: {
                    columns: [
                        ['Em Aberto', this.props.graphic.opened],
                        ['Finalizado com Atraso', this.props.graphic.delayed],
                        ['Finalizado', this.props.graphic.ok]
                    ],
                    type: 'pie'
                }
            });
        }
    }

    render() {
        return (
            <div>
                <div id="chart"/>
                <button onClick={() => this.props.redirect('/')}>Voltar a tela Principal</button>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    logged: state.user.logged,
    graphic: state.employees.graphic
});

const mapDispatchToProps = ({
    redirect: push
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphicService);