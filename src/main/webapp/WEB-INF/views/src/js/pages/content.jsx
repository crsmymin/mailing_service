import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import axios from "axios"
// import components
import Nav from '../layouts/nav.jsx'
import Create from  '../components/Create_content.jsx'
import List from  '../components/list_content.jsx'
import View from  '../components/view_content.jsx'

const url = window.location.pathname.split("_")[0]
const pathCreate = "/create";
const pathList = "/list";
const pathView = "/view";

function ContentCreate(props) {
  return (
    <div className="container">
      <Nav />
      <div className="content">
        <Create />
      </div>
    </div>
  )
}

function ContentList(props) {

  const [posts, setPosts] = useState([]);

  const _getTestApi = () => {
    axios({
      method: 'get',
      url: 'https://jsonplaceholder.typicode.com/users/1/todos',
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
        <List posts={posts} />
      </div>
    </div>
  )
}

function ContentView(props) {
  return (
    <div className="container">
      <Nav />
      <div className="content">
        <View />
      </div>
    </div>
  )
}
export default [ContentCreate,ContentList, ContentView];

if(url === pathCreate) {
  ReactDom.render(<ContentCreate />, document.getElementById("app"));
} else if (url === pathList) {
  ReactDom.render(<ContentList />, document.getElementById("app"));
} else if (url === pathView) {
  ReactDom.render(<ContentView />, document.getElementById("app"));
}