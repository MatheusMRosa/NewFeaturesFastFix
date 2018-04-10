import React, {Component} from 'react';

import {RegisterList} from './RegisterService';

const Registered = ({name}) => <div align="left">{name}</div>;

class ListEmployee extends Component {
    render() {
        return (
            <div>{
                this.props.employees.map(
                    (employee) => {
                        if (!employee.services)
                            employee.services = [];
                        return (
                            <div key={employee._id}>
                                <Registered {...employee}/>
                                <RegisterList onAddNewService={() => {
                                    employee.services.push({})
                                }} onSavePressed={this.addEmployee} {...employee}/>
                            </div>
                        )
                    })
            }
            </div>
        )
    }

}

export default ListEmployee;