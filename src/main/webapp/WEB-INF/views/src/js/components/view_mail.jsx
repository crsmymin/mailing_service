import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import ReactDom from "react-dom";

function View(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [sendCnt, setSendCnt] = useState("");
  const [waitCnt, setWaitCnt] = useState("");
  const [succCnt, setSuccCnt] = useState("");
  const [failCnt, setFailCnt] = useState("");
  const [mailCheck, setMailCheck] = useState("");
  const [mailReject, setMailReject] = useState("");
  const [mailList, setMailList] = useState([]);

  useEffect(() => {
    _getMailView();
    _getMailListView();
     
  }, [])
  const _getMailView = () => {
    const id = location.search.split("=")[1];
    axios({
      method: 'get',
      url: '/SendMailSearch.do',
      params : {
        id : id,
      }
    })
    .then(res => {
      const data = res.data
      console.log(data)
      setTitle(data[0].send_subject);
      setContent(data[0].send_subject);
      setSendDate(data[0].send_datetime);
      setSendCnt(data[0].send_cnt);
      setWaitCnt(data[0].send_w_cnt);
      setSuccCnt(data[0].send_succ_cnt);
      setFailCnt(data[0].send_fail_cnt);
      setMailCheck(data[0].mail_check);
      setMailReject(data[0].mail_reject);
    })
    .catch(error => {
      console.log(error)
    })
  }
  const elements=[];
  const _getMailListView = () => {
    const id = location.search.split("=")[1];
    axios({
      method: 'get',
      url: '/SendResultSearch.do',
      params : {
        id : id,
      }
    })
    .then(res => {
      const data = res.data
      console.log(data)
      for(let i=0;i<data.length;i++){
        elements.push(
          <tr key={i}>
          <td>{data[i].send_mail}</td>
          <td>{data[i].member_name}</td>
          <td>{data[i].send_result_yn}</td>
          <td>{data[i].send_mail_check_date}</td>
          <td>{data[i].reject_date}</td>
          </tr>);
      };
      ReactDom.render(elements, document.getElementById("listReceiver"));

    })
    .catch(error => {
      console.log(error)
    })
  }
  return (
    <Fragment>
      <h2 className="page-title">
        메일 상세
      </h2>
      <div className="view-mail-send">
        <div className="box state-send">
          <ul>
            <li className="title">메일제목: <em>{title}</em></li>
            <li className="date">발송일시: <em>{sendDate}</em></li>
            <li className="result">
              <span>발송: <em>{sendCnt}</em></span>
              <span>대기: <em>{waitCnt}</em></span>
              <span>성공: <em>{succCnt}</em></span>
              <span>실패: <em>{failCnt}</em></span>
              <span>수신확인: <em>{mailCheck}</em></span>
              <span>수신거부: <em>{mailReject}</em></span>
            </li>
          </ul>
        </div>
        <div className="box list-receiver">
          <table>
            <thead>
              <tr>
                <th>메일주소</th>
                <th>이름</th>
                <th>상태</th>
                <th>수신확인일</th>
                <th>수신거부일</th>
              </tr>
            </thead>
            <tbody id="listReceiver">
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  )
}

export default View;
