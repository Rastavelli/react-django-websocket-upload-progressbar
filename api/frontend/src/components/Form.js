import React, { Component } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import axios from "axios";
import Websocket from "react-websocket";

export class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selectedFile: null,
      uploadProgress: 0,
      loaded: false
    };
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  onChangeHandler = e => {
    this.setState({
      selectedFile: e.target.files[0],
      uploadProgress: 0,
      loaded: false
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { name } = this.state;
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    data.append("name", this.state.name);
    axios.post("http://localhost:8000/api/files/", data, {}).then(res => {
      this.props.updateFileList();
    });
  };

  renderProgress = data => {
    const progress = Math.floor(JSON.parse(data));
    if (data == "100") {
      const newState = {
        ...this.state,
        uploadProgress: progress,
        loaded: true
      };
      this.setState(newState);
    } else {
      const newState = { ...this.state, uploadProgress: progress };
      this.setState(newState);
    }
  };

  render() {
    const { name, uploadProgress } = this.state;
    return (
      <div className="card card-body mt-4 mb-4">
        <Websocket
          url="ws://localhost:8000/"
          onMessage={this.renderProgress.bind(this)}
        />
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              className="form-control"
              type="text"
              name="name"
              onChange={this.onChange}
              value={name}
            />
          </div>
          <div className="form-group">
            <input
              type="file"
              className="form-control-file"
              name="file"
              onChange={this.onChangeHandler}
            />
          </div>
          <div className="form-group">
            <button type="Upload" className="btn btn-primary">
              Upload
            </button>
          </div>
          <ProgressBar
            variant={this.state.loaded ? "success" : ""}
            now={uploadProgress}
            label={`${uploadProgress}%`}
          />
        </form>
      </div>
    );
  }
}

export default Form;
