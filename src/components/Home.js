import React from "react";
import "./Home.css";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      dsc: "",
      ticketId: "",
      status: "new",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name === "" || this.state.email === "" || this.state.dsc === "") {
      alert("Please fill all the fields");
      return;
    } else {
      fetch("http://localhost:8080/api/tickets", {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.state.ticketId,
          name: this.state.name,
          email: this.state.email,
          dsc: this.state.dsc,
          status: this.state.status,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          alert("Ticket Submitted Successfully");
          this.setState({
            name: "",
            email: "",
            dsc: "",
          });
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Error in submitting ticket");
        });
    }
    console.log(this.state);
  }

  render() {
    return (
      <div className="Home">
        <h1>Help Desk</h1>
        <form className="ticketForm" onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
            <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
          </label>
          <label>
            <textarea name="dsc" placeholder="Description" value={this.state.dsc} onChange={this.handleChange}></textarea>
          </label>
          <button type="submit" value="Submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Home;
