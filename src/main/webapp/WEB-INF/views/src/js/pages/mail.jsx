import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";
import axios from "axios"
// import components
import Nav from '../layouts/nav.jsx'
import Create from '../components/create_mail.jsx'
import List from '../components/list_mail.jsx'
import View from '../components/view_mail.jsx'

const url = window.location.pathname.split("_")[0]
const pathCreate = "/create";
const pathList = "/list";
const pathView = "/view";

function MailCreate(props) {
  return (
    <div className="container">
      <Nav />
      <div className="content">
        <Create />
      </div>
    </div>
  )
}

function MailList(props) {
  return (
    <div className="container">
      <Nav />
      <div className="content">
        <List />
      </div>
    </div>
  )
}

function MailView(props) {
  return (
    <div className="container">
      <Nav />
      <div className="content">
        <View />
      </div>
    </div>
  )
}
export default [MailCreate,MailView,MailList];

if (url === pathCreate) {
  ReactDom.render(<MailCreate />, document.getElementById("app"));
} else if (url === pathList) {
  ReactDom.render(<MailList />, document.getElementById("app"));
} else if (url === pathView) {
  ReactDom.render(<MailView />, document.getElementById("app"));
}