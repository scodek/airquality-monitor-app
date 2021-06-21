import React, {FC} from 'react';
import {AirQualityReportComponent} from '../Components/AirQualityReportComponent';

const HomePage:FC = () => {
  
    console.log("home page loaded");
    return(
          <AirQualityReportComponent/>
    );
}

export default HomePage;