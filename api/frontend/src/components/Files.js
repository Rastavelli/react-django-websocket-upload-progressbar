import React, { Component, Fragment } from "react";
import axios from "axios";

export class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false
    };
  }

  render() {
    const files = this.props.files;
    return (
      <Fragment>
        <h2>Files</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Created</th>
              <th>Link</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {files.reverse().map(file => (
              <tr key={file.id}>
                <td>{file.id}</td>
                <td>{file.name}</td>
                <td>{new Date(file.created).toLocaleString([])}</td>
                <td>
                  <a href={file.file}>Download</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Fragment>
    );
  }
}

export default Files;
