import React, {Component} from 'react';
import Filter from './FilterEmployee';
import ListEmployee from './ListEmployee';
import {push} from "react-router-redux";
import {connect} from "react-redux";

class HomePageList extends Component {
    render() {
        return (
            <div>
                <Filter/>
                <button onClick={() => this.props.redirect('/register')}>Adicionar um Novo Funcionário</button>
                <ListEmployee/>
            </div>
        )
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = ({
    redirect: push
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePageList);