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

  const [contents, setContents] = useState([]);

  const _getContents = () => {
    axios({
      method: 'get',
      url: '/ContentsSearch.do'
    })
      .then(res => {
        const data = res.data
        console.log(data);
        setContents(data);
      })
      .catch(error => {
        console.log(error)
      })
  }

  useEffect(() => {
    _getContents();
  }, [])

  return (
    <div className="container">
      <Nav />
      <div className="content">
        <List contents={contents} />
      </div>
    </div>
  )
}

function ContentView(props) {

  const [contentsId, setContentsId] = useState()
  const [contentsName, setContentsName] = useState()
  const [contentsHtml, setContentsHtml] = useState()

  const _getContentsView = () => {
    const id = location.search.split("=")[1];
    console.log(id);
    axios({
      method: 'get',
      url: '/ContentsSearch.do',
      params : {
        id : id,
      }
    })
    .then(res => {
      const data = res.data
      console.log(data);
      setContentsId(data[0].contents_id);
      setContentsName(data[0].contents_name);
      setContentsHtml(data[0].contents_html);
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    _getContentsView();
  }, [])

  return (
    <div className="container">
      <Nav />
      <div className="content">
        <View 
        contentsId={contentsId}
        contentsName={contentsName}
        contentsHtml={contentsHtml}
        />
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