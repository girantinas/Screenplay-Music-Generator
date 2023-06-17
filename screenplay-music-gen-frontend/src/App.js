import React from 'react';
import axios from 'axios';
  
class App extends React.Component {
  
    state = {
        text: [],
    }
  
    componentDidMount() {
  
        let data;
  
        axios.get('http://localhost:8000/wel/')
        .then(res => {
            data = res.data;
            this.setState({
                text: data    
            });
        })
        .catch(err => {})
    }
  
  render() {
    return(
      <div>
            {this.state.text.map((text, id) =>  (
            <div key={id}>
            <div >
                  <div >
                        <h1>{text.text} </h1>
                        <footer >--- by
                        <cite title="Source Title">
                        {text.text}</cite>
                        </footer>
                  </div>
            </div>
            </div>
            )
        )}
      </div>
      );
  }
}
  
export default App;