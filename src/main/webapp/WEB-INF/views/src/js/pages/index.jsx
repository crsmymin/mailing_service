import React, {useState, useEffect} from "react";
import ReactDom from "react-dom";
import axios from "axios"

// import components
import Nav from '../layouts/nav.jsx'
import Receiver from '../components/list_receiver.jsx'

function App(props) {
  
  useEffect(() => {
    
  }, [])
  
  return (
    <div className="container">
      <Nav />
      <div className="content">
        <Receiver />
      </div>
    </div>
  )
}

export default App;

ReactDom.render(<App />, document.getElementById("app"));
