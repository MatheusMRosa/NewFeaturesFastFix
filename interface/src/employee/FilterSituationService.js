import React, {Component} from 'react';
import {connect} from "react-redux";
import {push} from "react-router-redux";
import {filterSituationService, saveEmployeeForAddService, graphicServices} from "./actionsEmployee";
import '../config/CSS/filters.css';
import '../config/CSS/serviceList.css';
import checkService from '../config/images/checkService.png';
import warningService from '../config/images/warningService.png';
import doneService from '../config/images/doneService.png';
import addNewService from '../config/images/add_new_service.jpg';
import statistic from '../config/images/statistic.png';

class Filter extends Component {
    render() {
        const {filter} = this.props;
        return (
            <div className="container row">
                <div className="col-sm">
                    <img src={statistic} className="imgG imgPointer" alt="" onClick={() => {
                        this.props.graphicServices(this.props.thisEmployee._id).then(() => this.props.redirect('/graphic'));
                    }}/>
                    <span className="span spanC">Estatísticas</span>
                </div>
                <div align="center" className="dropdown col-sm">
                    <button className="btn btn-light dropdown-toggle" type="button" id="dropdownMenuButton"
                            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Filtrar Por Situação do Serviço
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <button className="dropdown-item" onClick={() => filter("ServiceOk")}><img
                            src={checkService} alt="" className="imgC"/> Serviços em dia
                        </button>
                        <button className="dropdown-item" onClick={() => filter("opened")}><img
                            src={doneService} alt="" className="imgC"/> Serviços em aberto
                        </button>
                        <button className="dropdown-item" onClick={() => filter("delayed")}><img
                            src={warningService} alt="" className="imgC"/> Serviços com atraso
                        </button>
                        <div className="dropdown-divider"/>
                        <button className="dropdown-item" onClick={() => filter("clean")}>Limpar Filtros</button>
                    </div>
                </div>
                <div align="right" className="col-sm align-self-end">
                    <img src={addNewService} className="imgG imgPointer" alt=""
                         onClick={() => {
                             this.props.saveEmployeeForAddService(this.props.thisEmployee);
                             this.props.redirect('./registerservice')
                         }}/>
                    <span className="span spanB font-weight-bold">Adicionar um Novo Serviço</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    load: state.employees.load
});

const mapDispatchToProps = ({
    filter: filterSituationService,
    saveEmployeeForAddService: saveEmployeeForAddService,
    graphicServices: graphicServices,
    redirect: push
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);