import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/esm/Button";
import "./Admin.css";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: [],
    };
  }

  handleStatusChange(value, ticket) {
    if (ticket.status === value) {
      return;
    } else {
      fetch("http://localhost:8080/api/tickets", {
        method: "PUT",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: ticket.id,
          name: ticket.name,
          email: ticket.email,
          dsc: ticket.dsc,
          status: value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          alert("Ticket Status Updated Successfully");
          fetch("http://localhost:8080/api/tickets")
            .then((response) => response.json())
            .then((data) => {
              this.setState({ tickets: data });
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error in updating ticket status");
        });
    }
  }

  handleEmailSubmit(event) {
    event.preventDefault();
    console.log("Would normally send email here with body: " + event.target.response.value);
  }

  componentDidMount() {
    fetch("http://localhost:8080/api/tickets")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ tickets: data });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  render() {
    return (
      <div className="Admin">
        <h1>Admin</h1>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Description</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.name}</td>
                <td>{ticket.email}</td>
                <td>{ticket.dsc}</td>
                <td>{ticket.status}</td>
                <td
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    borderBottom: "0px !important",
                    borderLeft: "0px",
                    borderTop: "1px",
                  }}
                >
                  <DropdownButton id="dropdown-basic-button" title="Respond" style={{ marginRight: "15px" }}>
                    <form style={{ padding: "5px" }} onSubmit={this.handleEmailSubmit}>
                      <label>
                        <textarea name="response" placeholder="Email Body" rows={5}></textarea>
                      </label>
                      <Button id="dropdown-basic-button" type="submit" value="Submit">
                        Submit
                      </Button>
                    </form>
                  </DropdownButton>
                  <DropdownButton id="dropdown-basic-button" title="Update">
                    <Dropdown.Item onClick={() => this.handleStatusChange("new", ticket)}>new</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.handleStatusChange("in progress", ticket)}>in progress</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.handleStatusChange("resolved", ticket)}>resolved</Dropdown.Item>
                  </DropdownButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Admin;
