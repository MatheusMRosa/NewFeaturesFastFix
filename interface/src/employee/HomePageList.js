import React, {Component} from 'react';
import Filter from './FilterEmployee';
import ListEmployee from './ListEmployee';
import {push} from "react-router-redux";
import {connect} from "react-redux";
import addEmployee from '../config/images/addEmployee.png';
import '../config/CSS/HomeAddService.css';

class HomePageList extends Component {
    render() {
        return (
            <div>
                <Filter/>
                <img src={addEmployee} alt="" className="imgADD" onClick={() => this.props.redirect('/register')}/>
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