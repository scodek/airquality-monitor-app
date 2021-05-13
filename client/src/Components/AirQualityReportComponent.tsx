import { Table } from 'antd';
import React, {FC,useState, useEffect} from 'react';
import {TableColumns,ResponseData} from '../dataModel/tableDataModel';
import {getInitialData,getPageSpecificData} from '../Services/restService';
import { AlertEnums } from '../enums/AlertEnums';
import {loadingNotification} from '../Utils/loadingNotification';
import { useTranslation } from 'react-i18next';



export const AirQualityReportComponent:FC = () => {

    const [tableData,setTableData] = useState([] as TableColumns[]);
    const { t } = useTranslation();
 
    useEffect(() => {
        console.log("inside effect");
            getInitialData()
                .then(response => {
                    console.log("response =",response);
                    if(response.statusText === 'OK'){
                        console.log("response.data= ",response.data);
                        processResponseData(response.data);
                        showNotification('success');
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
        loadingNotification(AlertEnums.SUCCESS, 'success', "Successfully loaded data");
      }else if(notifyType === 'error'){
        const statusEnum = AlertEnums.ERROR;
        const status= err?.response?.status ? err.response.status: 'Error';
        const statusText = err?.response?.msg ? err.response.msg : err.toString();
        loadingNotification(statusEnum, status, statusText);
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
  //console.log("tableColumnData: ",tableColumnData);

  setTableData(tableColumnData);
  }

    const columns = [
        {
          title: t('rank'),
          dataIndex: 'rank',
          key: 'rank',
        },
        {
          title: t('airQuality'),
          dataIndex: 'quality',
          key: 'quality',
        },
        {
          title: t('capital'),
          dataIndex: 'capital',
          key: 'capital',
        },
        {
          title: t('flag'),
          dataIndex: 'flag',
          key: 'flag',
          // eslint-disable-next-line react/display-name
          render:(imageLink:string) => {
           return(<img src={imageLink} width="30" height="20" alt="image"/>)
          }
        },
        {
          title: t('name'),
          dataIndex: 'countryName',
          key: 'countryName',
        },
        {
        title: t('population'),
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
                //console.log(response.data);
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
        <div style={{height: '73vh'}}>
            <Table
            dataSource={tableData} 
            columns={columns}
            bordered
            scroll={{ y: 'calc(73vh - 4em)' }}
            title={() => t('airQualityReport')}
            pagination={{defaultCurrent:1, pageSize: 20,total:100,onChange:(pageNumber) => callPageChange(pageNumber) }}
            rowClassName={(record, index) => "table-row"}
            />
        </div>
    );
}