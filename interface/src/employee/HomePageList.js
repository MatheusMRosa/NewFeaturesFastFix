import React, {Component} from 'react';
import Filter from './FilterEmployee';
import ListEmployee from './ListEmployee';
import {push} from "react-router-redux";
import {connect} from "react-redux";
import c3 from 'c3';
import addEmployee from '../config/images/addEmployee.png';
import '../config/CSS/HomeAddService.css';

class HomePageList extends Component {
    componentDidMount(){
        var chart = c3.generate({
            bindto: this.chart,
            data: {
                columns: [
                    ['abertas', 4],
                    ['fechadas com atraso', 2],
                    ['fechadas', 6],
                ],
                type : 'pie'
            }
        });
    }
    render() {
        return (
            <div>
                <div style={{width: 500, height: 500}} ref={e => this.chart = e}/>
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