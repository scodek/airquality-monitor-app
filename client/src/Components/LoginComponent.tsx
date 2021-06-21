import React, {FC} from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {Credential} from '../dataModel/userData';
import { getLoginToken } from '../Services/restService';
import { AlertEnums } from '../enums/AlertEnums';
import {loadingNotification} from '../Utils/loadingNotification';
import { Typography} from 'antd';



interface propTypes{
  setUpUserToken(token : string): void;
}

const LoginComponent:FC<propTypes> = ({setUpUserToken}) => {

  const { Text} = Typography;

    const [loginErr, setLoginErr] = React.useState('');
    const [userCredential, setUserCredential] = React.useState<Credential>({
      username: '',
      password: ''
    });

    React.useEffect(() => {
      if(userCredential.password !== ''){
        getLoginToken(userCredential)
      .then((res:any) => {console.log('token =',res);setUpUserToken(res.data.token)})
      .catch(err => {
        setLoginErr('username or password invalid');
        const statusEnum = AlertEnums.ERROR;
        const status= err?.response?.status ? err.response.status: 'Error';
        const statusText = err?.response?.msg ? err.response.msg : err.toString();
        loadingNotification(statusEnum, status, statusText);
      });
      }
      
    },[userCredential]);

    const layout = {
        labelCol: {
          span: 10,
        },
        wrapperCol: {
          span: 6,
        },
      };
      const tailLayout = {
        wrapperCol: {
          offset: 10,
          span: 16,
        },
      };

      const onFinish = (userInput: any) => {
        setUserCredential(Object.assign({}, {username: userInput['username'],password: userInput['password']}));
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <>
            <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      <div style={{textAlign:'center'}}>
        <Text style={{color:'#991f00', fontWeight:'bold',fontSize:'20px'}}>{loginErr}</Text>
      </div>
     
    </Form>
        </>
    );

  }

  export default LoginComponent;