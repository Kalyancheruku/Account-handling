import React ,{useState}from 'react'
import { Button,Form, Input,DatePicker,Checkbox,Select,Card,Row, Col, message} from 'antd'
import moment from 'moment';
import './App1.css'
import ReactDOM from 'react-dom';
import axios from 'axios';
import Login from './Login';
export default function App1() {
    const StateDistricts = {
        AndhraPradesh: ["East godavari", "Krishna","West Godavari","vishakapatnam"],
        Telangana: ["Rangareddy", "Hyderabad","Warangal","Nizamabad"],
      };
      const onloginclick = () =>{
        ReactDOM.render(<Login />,document.getElementById('root'))
      }
    const [data,setData]= useState({
        firstname:"",
        lastname:"",
        email:"",
        Gender:"",
        dateofbirth:"",
        password:"",
        state:"",
        district:"",
    })
    const handleDateChange = (date, dateString) => {
      setData({ ...data, dateofbirth: dateString });
    };
    
    
    const handleGenderChange = (value) => {
      setData({
        ...data,
        Gender: value 
      });
    };
    const handleChange = (e) => {
      const { name, value } = e.target
        setData({ ...data, [name]: value });
    };
    const handleStateChange = (value) => {
      setData({ ...data, state: value, district: "" });
    };
  
    const handleDistrictChange = (value) => {
      setData({ ...data, district: value });
    };
    
      const handleSubmit = e=>{
        e.preventDefault();
        axios
      .post("http://localhost:3000/user", {firstname:data.firstname,lastname:data.lastname,email:data.email,Gender:data.Gender,dateofbirth:data.dateofbirth,password:data.password,state:data.state,district:data.district })
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  

      }
      
      const onFinish = () => {
      message.success("Account Created Sucessfully You can Login now!");
        ReactDOM.render(<Login />,document.getElementById('root'))
      };
    
      const getDistrictOptions=()=>{
        if(data.state in StateDistricts){
          const district = StateDistricts[data.state];
          return district.map((district)=> (
            <Select key={district} value={district}>
              {data.district}
            </Select>
          ));
        }
      };
    const config = {
        rules: [
          {
            type: 'object',
            required: true,
            message: 'Please select time!',
          },
        ],
      };
      const disabledDate = (current) => {
        return current && current >= moment().endOf('day');
      };
          
  return (
    <div className='Form'>
      <Card className='card'>
      <Form 
      layout='vertical'
      onSubmitCapture={handleSubmit}
      name="basic"
      initialValues={{ remember: true }}
      autoComplete="off"
      onFinish={onFinish}>
        <Row justify="space-around">
          <Col span={7}>
        <Form.Item
        
        value={data.firstname}
        htmltype="text"
        name="firstname"
        label="First Name"
        rules={[
            {
              required: true,
               pattern: /^[A-Za-z]+$/i,
               message: "Please enter a valid first name with no numbers",
            },
          ]}>
            <Input name="firstname" onChange={handleChange}/>
            </Form.Item>
            </Col>
            <Col span={7}>
        <Form.Item
        name="lastname"
        value={data.lastname}
        type="text"
        label="Last Name"
        rules={[
            {
              required: true,
              pattern: /^[A-Za-z]+$/i,
              message: "Please enter a valid last name with no numbers",
            },
          ]}>
            <Input onChange={handleChange} name='lastname'/>
            </Form.Item>
            </Col>
            <Col span={7}>
            <Form.Item
        name="email"
        label="E-mail"
        value={data.email}
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
        <Input onChange={handleChange} name='email'/>
      </Form.Item>
      </Col>
      </Row>


      <Row justify="space-around">
      <Col span={7}>
      <Form.Item  name="dateofbirth"label="DOB" {...config} value={data.dateofbirth}>
        <DatePicker  disabledDate={disabledDate} name="dateofbirth" onChange={handleDateChange} />
      </Form.Item>
      </Col>
      <Col span={7}>
      <Form.Item
  name="password"
  label="Password"
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
  hasFeedback
  value={data.password}
  onChange={handleChange}
>
  <Input.Password onChange={handleChange} name="password" />
</Form.Item>
</Col>
<Col span={7}>
      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      </Col>
      </Row>
      <Row justify="space-around">
      <Col span={7}>
      <Form.Item
        name="Gender"
        label="Gender"
        rules={[
          {
            required: true,
            message: "Please select your gender"
          }
        ]}
      >
        <Select value={data.Gender} onChange={handleGenderChange}>
          <Select.Option value="Male">Male</Select.Option>
          <Select.Option value="Female">Female</Select.Option>
        </Select>
      </Form.Item>
      </Col>
      <Col span={7}>
        <Form.Item label="Select State"
        rules={[
          {
            required: true,
            message: "Please select your State"
          }
        ]}
        name="state"> 
  <Select name="state" value={data.state} onChange={handleStateChange}>
    <Select.Option value="AndhraPradesh">Andhra Pradesh</Select.Option>
    <Select.Option value="Telangana">Telangana</Select.Option>
  </Select>
</Form.Item>
</Col>
<Col span={7}>
<Form.Item
        label="Select District" rules={[
          {
            required: true,
            message: "Please select your State"
          }
        ]}
        name="district">
            <Select value={data.district} onChange={handleDistrictChange} name="district">
                {getDistrictOptions()}
                </Select>
            </Form.Item>
            </Col>
            </Row>
      <Form.Item
            wrapperCol={{ span: 8, offset: 6 }}
            name="t&c"
            valuePropName="checked"
            rules={[
              { validator: (_, value) => value ? Promise.resolve() : Promise.reject('Please agree to the terms and conditions') },
            ]}
          >
            <Checkbox>I Agree to terms and Conditions</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 8 }}>
          <Button block type='primary' htmlType="submit">Create Account</Button>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 8 }}>
          <Button block type='primary' htmlType="submit" onClick={onloginclick}>Back to Login Page</Button>
          </Form.Item>
          
          
        </Form>
        </Card>
    </div>
  )
}
