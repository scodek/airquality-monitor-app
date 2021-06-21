import React, {FC} from 'react';

const useNetworkToken = () => {

    const getUserToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = tokenString ? JSON.parse(tokenString) : undefined;
        return userToken?.token
    }

    const [tokenValue, setTokenValue] = React.useState(getUserToken());

    const saveUserToken = (userToken : any) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setTokenValue(userToken);
      };

      return{
          setUserToken: saveUserToken,
          userToken : tokenValue
      };
}




export default useNetworkToken;