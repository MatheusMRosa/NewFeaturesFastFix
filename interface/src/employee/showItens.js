import React, { Component } from 'react';
import { connect } from 'react-redux';
import { graphicServices } from './actionsEmployee';
import { Button } from 'bootstrap/dist/js/bootstrap';

class ShowItens extends Component {
    componentWillMount() {
        
    }
    render() {
        return (
            <div align="right">
                <button onClick={() => this.props.graphicServices(this.props.thisEmployee._id)} data-target={"#"+ this.props.thisEmployee._id}>Errou</button>
                {this.props.graphic ? <div id={this.props.thisEmployee._id}>
                    <div>Abertos: {this.props.graphic.opened}</div>
                    <div>Fechados com Atrado: {this.props.graphic.delayed}</div>
                    <div>Finalizados: {this.props.graphic.ok}</div>
                </div> : 
                <div/>}
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowItens);