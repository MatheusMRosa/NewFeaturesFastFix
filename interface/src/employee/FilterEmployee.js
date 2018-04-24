import React, {Component} from 'react';
import {connect} from "react-redux";
import {filterEmployee} from "./actionsEmployee";

const Filter = props => {
    const {filterValue, filter} = props;
    return (
        <div>
            <input value={filterValue} placeholder="Procurar..." type="text" name="name" onChange={filter}/>
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