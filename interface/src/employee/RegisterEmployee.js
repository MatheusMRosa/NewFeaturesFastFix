import React, {Component} from 'react';

class RegisterEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: '',
                endereco: ''
            }
        };
        this.onChanged = this.onChanged.bind(this);
        this.save = this.save.bind(this);
    }

    onChanged(event) {
        let form = this.state.form;
        form[event.target.getAttribute('name')]= event.target.value;
        this.setState({
            form: form
        });
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
                    <tr>
                        <td>Funcionário</td>
                        <td><input value={this.state.form.name} name="name" onChange={this.onChanged}/></td>
                        <td><input value={this.state.form.endereco} name="endereco" onChange={this.onChanged}/></td>
                    </tr>
                    </thead>
                    <tbody>
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

export default RegisterEmployee;