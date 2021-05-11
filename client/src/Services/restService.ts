import axios from 'axios';

const preifx = `${process.env.REACT_APP_DOMAIN}`;

export const getInitialData = () => {
    return axios.get(`http://localhost:8080/home`);
}

export const getPageSpecificData = (pageNumber :number) =>{
    return axios.get(`http://localhost:8080/home/${pageNumber}`);  
}

