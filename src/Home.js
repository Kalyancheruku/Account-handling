import React from "react";
import { Table, Button } from "antd";
import axios from "axios";

class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3000/user")
      .then((response) => {
        this.setState({ data: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleDelete = (email) => {
    axios
      .delete(`http://localhost:3000/user/${email}`)
      .then((response) => {
        console.log("User deleted successfully");
        // Remove the deleted user from the state
        const updatedData = this.state.data.filter(
          (user) => user.email !== email
        );
        this.setState({ data: updatedData });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const columns = [
      {
        title: "First Name",
        dataIndex: "firstname",
      },
      {
        title: "Last Name",
        dataIndex: "lastname",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Gender",
        dataIndex: "Gender",
      },
      {
        title: "Date Of Birth",
        dataIndex: "dateofbirth",
      },
      {
        title: "State",
        dataIndex: "state",
      },
      {
        title: "District",
        dataIndex: "district",
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <Button onClick={() => this.handleDelete(record.email)}>Delete</Button>
        ),
      },
    ];

    return <Table dataSource={this.state.data} columns={columns} />;
  }
}

export default TableComponent;
