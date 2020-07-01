import React, {useState, useEffect} from "react";
import ReactDom from "react-dom";
import axios from "axios"

// import components
import Nav from '../layouts/nav.jsx'
import Receiver from '../components/list_receiver.jsx'

function App(props) {
  
  const [members, setMembers] = useState([]);
  const [groups, setGroups] = useState([]);
  
  const _getMember = () => {
    axios({
      method: 'get',
      url: '/MemberSearch.do'
    })
    .then(res => {
      const data = res.data
      console.log(data);
      setMembers(data);
    })
    .catch(error => {
      console.log(error)
    })
  }

  const _getGroup = () => {
    axios({
      method: 'get',
      url: '/GroupSearch.do'
    })
      .then(res => {
        const data = res.data;
        console.log(data)
        setGroups(data);
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    _getMember();
    _getGroup();
  }, [])

  return (
    <div className="container">
      <Nav />
      <div className="content">
        <Receiver groups={groups} members={members}/>
      </div>
    </div>
  )
}

export default App;

ReactDom.render(<App />, document.getElementById("app"));
