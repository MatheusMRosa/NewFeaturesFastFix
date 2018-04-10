import React, {Component} from 'react';

const Registered = ({name}) => <div>{name}</div>;

class RegisterService extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                _id: this.props.employees._id,
                name: this.props.employees.name,
                services: [
                    {
                        descService: '',
                        time: '',
                        estimate: '',
                        done: false
                    }
                ]
            }
        };
        this.onChanged = this.onChanged.bind(this);
        this.save = this.save.bind(this);
    }

    onChanged(event) {
        let form = this.state.form.services;
        for (this.state.form._id in form) {
            form[event.target.getAttribute('name')] = event.target.value;
            console.log('FORM: ', form)
            this.setState({
                form: form
            });
        }
    }

    componentDidMount() {

    }

    save(){
        this.props.onSavePressed({...this.state.form});
    }

    render() {
        return (
            <table>
                <thead>
                <th>
                    <td>Funcionário: {this.props.employees.map((employee) => <Registered {...employee} key={employee._id}/>)}</td>
                </th>
                </thead>
                <tbody>
                <tr>
                    <td>Descrição do Serviço</td>
                    <td><input value={this.state.form.services} name="descService" onChange={this.onChanged}/></td>
                </tr>
                <tr>
                    <td>
                        <button onClick={this.save}>Salvar</button>
                    </td>
                </tr>
                </tbody>
            </table>
        )
    }

}

export default RegisterService;