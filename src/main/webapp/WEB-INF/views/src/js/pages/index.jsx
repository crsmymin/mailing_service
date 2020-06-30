import React, {useState, useEffect} from "react";
import ReactDom from "react-dom";
import axios from "axios"

// import components
import Nav from '../layouts/nav.jsx'
import Receiver from '../components/list_receiver.jsx'
import CreateG from '../components/create_group.jsx'
import CreateM from '../components/create_member.jsx'

const url = window.location.pathname.split("_")[1]
const pathMember = "m";
const pathGroup = "g";

function App(props) {
  
  const [posts, setPosts] = useState([]);

  const _getTestApi = () => {
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/posts/1/comments'
    })
      .then(res => {
        const data = res.data;
        console.log(data)
        setPosts(data);
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    _getTestApi();

  }, [])

  return (
    <div className="container">
      <Nav />
      <div className="content">
        <Receiver posts={posts} />
      </div>
    </div>
  )
}

function CreateMember(props) {
  return (
    <div className="container">
      <Nav />
      <div className="content">
        <CreateM />
      </div>
    </div>
  )
}

function CreateGroup(props) {
  return (
    <div className="container">
      <Nav />
      <div className="content">
        <CreateG />
      </div>
    </div>
  )
}

export default [App, CreateMember, CreateGroup];


if (url === pathMember) {
  ReactDom.render(<CreateMember />, document.getElementById("app"));
} else if (url === pathGroup) {
  ReactDom.render(<CreateGroup />, document.getElementById("app"));
} else {
  ReactDom.render(<App />, document.getElementById("app"));
}