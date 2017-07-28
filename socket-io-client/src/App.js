import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

class App extends Component {
  constructor() {
    super();
    this.state = {
      response: false,
      endpoint: 'http://127.0.0.1:4000'
    };
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);
    socket.on('FromAPI', data => {
      console.log({ data });
      this.setState({ response: data });
    });
  }

  render() {
    const { response } = this.state;

    console.log(response);
    return (
      <div style={{ textAlign: 'center' }}>
        {response
          ? <p>
              The temperature in {response.name} is: {response.main.temp} °F
            </p>
          : <p>Loading...</p>}
      </div>
    );
  }
}

export default App;
