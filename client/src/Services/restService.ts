import axios from 'axios';
import {Credential} from '../dataModel/userData';

const preifx = `${process.env.REACT_APP_DOMAIN}`;

export const getInitialData = () => {
    return axios.get(`http://localhost:8080/home`);
}

export const getPageSpecificData = (pageNumber :number) =>{
    return axios.get(`http://localhost:8080/home/${pageNumber}`);  
}

export const getLoginToken = (userCredential : Credential) => {
   
    return axios.post(`http://localhost:8080/login`, userCredential); 
}

