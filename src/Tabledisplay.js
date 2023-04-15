import React from 'react'
import TableComponent from './Home'
import { Button } from 'antd'
import Login from './Login'
import ReactDOM from 'react-dom';
import './Tabledisplay.css'
import App1 from './App1';

export default function Home1() {
  const handlelogout = () =>{
    ReactDOM.render(<Login />,document.getElementById('root'))
  };
  const adduser=()=>{
    ReactDOM.render(<App1/>,document.getElementById('root'))
  }
  return (
    <div>
      <Button  type="primary" onClick={adduser}>
            Add User
          </Button>

      <Button  type="primary" onClick={handlelogout}>
            Logout
          </Button>
      <h1>The Active users </h1>
      <TableComponent />
      
    </div>
  )
}
