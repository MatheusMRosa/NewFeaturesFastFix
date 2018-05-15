import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from "react-router-redux";
import c3 from "c3";
import '../config/CSS/graphics.css';


class GraphicService extends Component {
    componentWillMount() {
        if ((!this.props.logged) || (this.props.graphic === undefined)) {
            this.props.redirect('/')
        }
    }

    componentDidMount() {
        if (this.props.graphic !== undefined) {
            let chart = c3.generate({
                bindto: '#chart',
                data: {
                    columns: [
                        ['Em Aberto', this.props.graphic.opened],
                        ['Finalizado com Atraso', this.props.graphic.delayed],
                        ['Finalizado', this.props.graphic.ok]
                    ],
                    type: 'donut'
                },
                donut: {
                    title: 'Funcionário: ' + this.props.graphic.name
                }
            });
            chart.resize({height:500, width:500})
        }
    }

    render() {
        return (
            <div className="container card cardMargin cardSize" align="center">
                <div id="chart" className="card-body"/>
                <button onClick={() => this.props.redirect('/')} className="btn btn-outline-dark card-deck alignSELF buttonType">Voltar a tela Principal</button>
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