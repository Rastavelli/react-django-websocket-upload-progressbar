import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Header from "./Header";
import Files from "./Files";
import Container from "react-bootstrap/Container";
import Form from "./Form";
import axios from "axios";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: []
    };
    this.getFiles = this.getFiles.bind(this);
  }

  componentDidMount() {
    this.getFiles();
  }

  getFiles = () => {
    axios.get("http://localhost:8000/api/files").then(res => {
      this.setState({
        files: res.data
      });
    });
  };

  render() {
    return (
      <Fragment>
        <Container>
          <Header />
          <Form updateFileList={this.getFiles} />
          <Files files={this.state.files} />
        </Container>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
