import React, {useState, useEffect} from "react";
import ReactDom from "react-dom";
import axios from "axios"

// import components
import Nav from '../layouts/nav.jsx'
import ReceiverList from '../components/list_receiver.jsx'
import AccountList from '../components/list_account.jsx'

const url = window.location.pathname.split("_")[0]
const pathAccount = "/account";
const pathReceiver = "/receiver";

function Receiver(props) {
  useEffect(() => {
    
  }, [])
  
  return (
    <div className="container">
      <Nav />
      <div className="content">
        <ReceiverList />
      </div>
    </div>
  )
}

function Account(props) {
  useEffect(() => {
    
  }, [])
  
  return (
    <div className="container">
      <Nav />
      <div className="content">
        <AccountList />
      </div>
    </div>
  )
}

export default [Receiver,Account];

if(url === pathReceiver) {
  ReactDom.render(<Receiver />, document.getElementById("app"));
} else if (url === pathAccount) {
  ReactDom.render(<Account />, document.getElementById("app"));
}