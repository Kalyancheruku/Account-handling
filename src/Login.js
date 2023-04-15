import { Button, Card, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import './Login.css';
import App1 from './App1';
import ReactDOM from 'react-dom';
import Home1 from './Tabledisplay';

const Login = () => {
  const [users, setUsers] = useState([]);

  const loginCredentials = (data) => {
    const matchedUser =users.find(user => user.email === data.email && user.password === data.password);
    const unMatchedUser = users.find(user=>user.email===data.email&&user.password !== data.password);
    const unMatchedLogin = users.find(user=>user.email!==data.email)
    if (matchedUser) {
      ReactDOM.render(<Home1 />,document.getElementById('root'))
    } 
    else if (unMatchedUser){
      message.error("Password is wrong")
    }
    else if(unMatchedLogin){
      message.error("You Don't have any Account Please Create Account")
    }
  };

  const onFinish = (values) => {
    console.log('Success:', values);
    loginCredentials(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const labelStyle = {
    fontFamily: 'Times new Roman', 
  };

  const handleCreateAccountClick = () => {
    ReactDOM.render(<App1 />,document.getElementById('root'))
  };


  React.useEffect(() => {
    fetch('http://localhost:3000/user')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className='login'>
      <Card className='card'>
      <Form
        name="basic"
        labelCol={{
          span: 8,
          style:labelStyle,
        }}
        wrapperCol={{
          span: 8,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
             required: true,
              message: 'Please input your E-mail!',
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
            {
              min: 8,
              message: 'Password must be at least 8 characters long',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" onClick={handleCreateAccountClick}>
            Create Account
          </Button>
        </Form.Item>
      </Form>
      </Card>
    </div>
  );
};

export default Login;
