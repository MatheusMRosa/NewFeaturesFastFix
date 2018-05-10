import React, {Component} from 'react';
import Filter from './FilterEmployee';
import ListEmployee from './ListEmployee';
import {connect} from "react-redux";

class HomePageList extends Component {
    render() {
        return (
            <div>
                <Filter/>
                <ListEmployee/>
            </div>
        )
    }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(HomePageList);