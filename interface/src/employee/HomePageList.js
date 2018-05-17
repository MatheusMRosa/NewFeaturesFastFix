import React, {Component} from 'react';
import Filter from './FilterEmployee';
import ListEmployee from './ListEmployee';
import {connect} from "react-redux";
import {push} from "react-router-redux";

class HomePageList extends Component {
    componentWillUpdate() {
        if (!this.props.logged){
            this.props.redirect('/');
        }
    }
    componentDidUpdate() {
        if (!this.props.logged){
            this.props.redirect('/');
        }
    }
    componentDidMount() {
        if (!this.props.logged){
            this.props.redirect('/');
        }
    }
    render() {
        return (
            <div>
                <Filter/>
                <ListEmployee/>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    logged: state.user.logged,
});

const mapDispatchToProps = ({
    redirect: push
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePageList);