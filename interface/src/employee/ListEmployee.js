import React, {Component} from 'react';

const Registered = ({name}) => <div>{name}</div>;

class ListEmployee extends Component {
    render() {
        return (
            <div>{
                this.props.employees.map(
                    (employee) => <Registered {...employee} key={employee._id}/>)
            }
            </div>
        )
    }

}

export default ListEmployee;