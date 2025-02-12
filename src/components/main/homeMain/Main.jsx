import React from 'react';
import HeroSlider from '../../header/HeroSlider';
import Marquee from './marquee/Marquee';
import SuccessPost from './successPost/SuccessPost';
import SuccessStatistic from './stastic/SuccessStatistic';
import RecentPost from './recentPost/RecentPost';
import ReportCorruption from './reportCorruption/ReportCorruption';

const Main = () => {
    return (
        <>
            <HeroSlider/>
            <Marquee/>
            <SuccessPost/>
            <SuccessStatistic/>
            <RecentPost/>
            <ReportCorruption/>
        </>
    );
};

export default Main;