import React, {Component} from 'react';

const RegisterForm = (props) => {
    var {service, onChange} = props;
    console.log(service.descService);
    return (
        <tr>
            <td>Descrição do Serviço</td>
            <td><input value={service.descService} name="descService" onChange={(e) => {
                service.descService = e.target.value;
                onChange(service)

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

        this.props.services = [...this.props.services, {
            descService: "asdf",
            time: "",
            estimate: "",
            done: false
        }];
        // this.forceUpdate()
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
                    <RegisterForm key={index} service={service} onChange={(_new)=>{this.props.services[index] = _new}}/>
                ))}
                </tbody>
            </table>
        )
    }

}
