import React from 'react';
import {connect} from "react-redux";
import {filterEmployee} from "./actionsEmployee";
import '../config/CSS/filter.css'

const Filter = props => {
    const {filterValue, filter} = props;
    return (
        <div align="center" style={{marginTop: 100}}>
            <input value={filterValue} placeholder="Procurar..." type="text" name="name" onChange={filter} className="inputEmloyee form-control"/>
        </div>
    )
};

const mapStateToProps = state => ({
    filterValue: state.employees.filterValue
});

const mapDispatchToProps = ({
    filter: filterEmployee
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);