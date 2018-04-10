import React, {Component} from 'react';

import {RegisterList} from './RegisterService';

const Registered = ({name}) => <div>{name}</div>;

class ListEmployee extends Component {
    render() {
        return (
            <div>{
                this.props.employees.map(
                    (employee) => {

                        if(!employee.services)
                            employee.services = [];
                        return (
                        <div  key={employee._id}>
                        <Registered {...employee}/>
                            <RegisterList onAddNewService={()=>{console.log('aaaa');employee.services.push({})}} onSavePressed={this.addEmployee} {...employee}/>
                        </div>
                    )})

            }
            </div>
        )
    }

}

export default ListEmployee;