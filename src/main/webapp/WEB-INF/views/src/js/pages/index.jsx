import React, {useState, useEffect} from "react";
import ReactDom from "react-dom";
import axios from "axios"

// import components
import Nav from '../layouts/nav.jsx'
import Receiver from '../components/list_receiver.jsx'

var group_id="";
function App(props) {
  
  const [members, setMembers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectGroup, setSelectGroup] = useState();
  
  const _getMember = () => {
    axios({
      method: 'get',
      url: '/MemberSearch.do'
    })
    .then(res => {
      const data = res.data
      //console.log(data);
      setMembers(data);
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  const _memberSearch = id => e => {

    if (e.target.id === '') {
      document.getElementById("searchMemberInput").value = "";
      group_id = id;
      console.log("group_id");
    }
    console.log(group_id);
    if (e.target.id === '' || (e.target.id === 'searchMemberInput' && e.key === 'Enter')) {
      axios({
        method: 'get',
        url: '/MemberSearch.do',
        params: {
          searchValue: document.getElementById("searchMemberInput").value,
          groupID: group_id
        },
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      })
        .then(res => {
          const data = res.data;
          //console.log(data)
          setMembers([]);
          setMembers(data);
        })
        .catch(error => {
          console.log(error)
        })
    }
  }


  const _getGroup = () => {
    axios({
      method: 'get',
      url: '/GroupSearch.do'
    })
      .then(res => {
        const data = res.data;
        //console.log(data)
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
        <Receiver groups={groups} members={members} memberSearch={_memberSearch} />
      </div>
    </div>
  )
}

export default App;

ReactDom.render(<App />, document.getElementById("app"));
