import { Table } from 'antd';
import React, {FC,useState, useEffect} from 'react';
import {TableColumns,ResponseData} from '../dataModel/tableDataModel';
import {getInitialData,getPageSpecificData} from '../Services/restService';
import {loadingNotificationComponent} from '../Components/loadingNotificationComponent';
import { AlertEnums } from '../enums/AlertEnums';




export const AirQualityReportComponent:FC = () => {

  const [tableData,setTableData] = useState([] as TableColumns[]);
 
 useEffect(() => {
   console.log("inside effect");
    getInitialData()
      .then(response => {
        console.log("response =",response);
        if(response.statusText === 'OK'){
          console.log("response.data= ",response.data);
          processResponseData(response.data);
          //showNotification('success');
        }else{
          throw new Error("data cannot be fetched");
        }
      })
      .catch((err:any) => {
        console.log("Error: ",err.toString());
        showNotification('error',err);
      });

  },[]);

  const showNotification = (notifyType: string, err?:any) =>{
    console.log('this is called');
    if(notifyType === 'success'){
      loadingNotificationComponent(AlertEnums.SUCCESS, 'success', "Successfully loaded data");
    }else if(notifyType === 'error'){
      const statusEnum = AlertEnums.ERROR;
      const status= err?.response?.status ? err.response.status: 'Error';
      const statusText = err?.response?.msg ? err.response.msg : err.toString();
      loadingNotificationComponent(statusEnum, status, statusText);
    }
    
  }

  const processResponseData = (responseData : ResponseData[]) => {
    const tableColumnData:TableColumns[] = responseData.map((eachObj :ResponseData) => {
      return{
        key : eachObj._id,
        rank: eachObj.rank,
        quality: eachObj.aqi,
        capital: eachObj.capital,
        flag: eachObj.flag,
        countryName: eachObj.countryName,
        population: eachObj.population
      };
  });

  setTableData(tableColumnData);
  }

    const columns = [
        {
          title: 'Rank',
          dataIndex: 'rank',
          key: 'rank',
        },
        {
          title: 'Air Quality',
          dataIndex: 'quality',
          key: 'quality',
        },
        {
          title: 'Country Capital',
          dataIndex: 'capital',
          key: 'capital',
        },
        {
          title: 'Country Flag',
          dataIndex: 'flag',
          key: 'flag',
          render: (imageLink:string) => {
           return(<img src={imageLink} width="30" height="20" alt="image"/>)
          }
        },
        {
          title: 'Country Name',
          dataIndex: 'countryName',
          key: 'countryName',
        },
        {
        title: 'Population',
        dataIndex: 'population',
        key: 'population',
        },
      ];
      
      const callPageChange = (pageNumber:number) => {
        console.log("page number clicked is:",pageNumber);
        getPageSpecificData(pageNumber)
        .then(response => {
          if(response.statusText === "OK"){
            processResponseData(response.data);
            //showNotification('success');
          }else{
            throw new Error("data cannot be fetched");
          }
        })
        .catch((err:any) => {
          console.log(err.toString());
          showNotification('error',err);
      });
    }

      
    return(
        <div style={{height: '75vh'}}>
        
            <Table 
            dataSource={tableData} 
            columns={columns}
            bordered
            scroll={{ y: 'calc(75vh - 4em)' }}
            title={() => 'Countrywise Air-quality report'}
            pagination={{defaultCurrent:1, pageSize: 20,total:100,onChange:(pageNumber) => callPageChange(pageNumber) }}
            rowClassName={(record, index) => "table-row"}
            />
        </div>
    );
}