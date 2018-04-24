import React from 'react';
import Filter from './FilterEmployee';
import ListEmployee from './ListEmployee';

const HomePageList = () => {
    return (
        <div>
            <Filter/>
            <ListEmployee/>
        </div>
    )
};

export default HomePageList;