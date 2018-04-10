import React, {Component} from 'react';

const RegisterForm = (props) => {
    const {service} = props;
    return (
        <tr>
            <td>Descrição do Serviço</td>
            <td><input value={service.descService} name="descService" onChange={(e) => {
                service.descService = e.target.value
            }}/></td>
        </tr>
    )
};

export class RegisterList extends Component {
    constructor(props) {
        super(props);

        this.save = this.save.bind(this);
        this.onAddNewService = this.onAddNewService.bind(this);
    }


    onAddNewService() {

        this.props.services.push({
            descService: '',
            time: '',
            estimate: '',
            done: false
        });
        this.forceUpdate()
    }

    componentDidMount() {

    }

    save() {
        this.props.onSavePressed({...this.state.form});
    }

    render() {
        return (
            <table>
                <tbody>
                <tr>
                    <td>Serviço</td>
                    <td>
                        <button onClick={this.onAddNewService}>Novo Serviço</button>
                    </td>
                </tr>
                {this.props.services.map((service, index) => (
                    <RegisterForm key={index} service={service}/>
                ))}
                </tbody>
            </table>
        )
    }

}
