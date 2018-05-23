import React, {Component} from 'react';
import {connect} from 'react-redux';
import {graphicServices} from './actionsEmployee';
import '../config/CSS/sideBar.css';
import info from '../config/images/info-circle.svg';

class ShowItems extends Component {
    render() {
        return (
            <div align="right" className="dropdown col-sm container">
                <img src={info} alt="" className="fa fa-2x faa-parent animated-hover faa-pulse imgPointer"
                     onClick={() => this.props.graphicServices(this.props.thisEmployee._id)}
                     id={"#" + this.props.thisEmployee._id}
                     data-toggle="dropdown" aria-haspopup="true"/>
                {this.props.graphic ?
                    <div className="dropdown-menu" aria-labelledby={this.props.thisEmployee._id}>
                        <div className="dropdown-item">Informações dos Serviços</div>
                        <div className="dropdown-divider"/>
                        <div className="dropdown-item">Abertos: {this.props.graphic.opened}</div>
                        <div className="dropdown-item">Fechados com Atraso: {this.props.graphic.delayed}</div>
                        <div className="dropdown-item">Finalizados: {this.props.graphic.ok}</div>
                    </div> :
                    <div className="dropdown-menu" aria-labelledby={this.props.thisEmployee._id}>
                        <div className="dropdown-item">Informações dos Serviços</div>
                        <div className="dropdown-divider"/>
                        <div className="dropdown-item">Abertos: 0</div>
                        <div className="dropdown-item">Fechados com Atraso: 0</div>
                        <div className="dropdown-item">Finalizados: 0</div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    graphic: state.employees.graphic
});

const mapDispatchToProps = {
    graphicServices: graphicServices
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowItems);
