import React, {Component, Fragment} from 'react';
import ReactDOM from 'react-dom';
import Header from "./Header";
class App extends Component{
    render() {
        return (
            <Fragment>
                <Header />
                <h1>React Application</h1>
            </Fragment>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));