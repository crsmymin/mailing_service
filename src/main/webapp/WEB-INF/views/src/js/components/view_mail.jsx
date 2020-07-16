import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

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
      setMailList(data);
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
            <li className="date">발송일시: <em>{sendDate.split(".")[0]}</em></li>
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
              {mailList.map((mailList, index) =>
                <tr key={mailList.send_result_id}>
                  <td>{mailList.send_mail}</td>
                  <td>{mailList.member_name}</td>
                  {mailList.send_result_yn =='y' && <td>완료</td>}
                  {mailList.send_result_yn =='r' && <td class='result_fail'>거부</td>}
                  {mailList.send_result_yn =='n' && <td class='result_fail'>실패</td>}
                  {mailList.send_mail_check_date === undefined ? (<td></td>) 
                  : 
                  (
                  <td>{mailList.send_mail_check_date.split(".")[0]}</td>
                  )}
                  {mailList.reject_date === undefined ? (<td></td>) 
                  : 
                  (
                  <td>{mailList.reject_date.split(".")[0]}</td>
                  )}
                </tr>
                )}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  )
}

export default View;
