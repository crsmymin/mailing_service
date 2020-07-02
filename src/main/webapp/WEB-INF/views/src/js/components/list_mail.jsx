import React, { useState, useEffect, Fragment } from "react";

function List(props) {
  return (
    <Fragment>
      <h2 className="page-title">
        메일 발송 리스트
      </h2>
      <div className="list-mail-send">
        <div className="top-line cf">
          <div className="btn-wrap fr">
            <button className="btn btn-save">저장</button>
          </div>
        </div>
        <div className="box">
          <table>
            <thead>
              <tr>
                <th>
                  삭제 
                  <input 
                  type="checkbox" 
                  name="chkAllSend" 
                  id="chkAllSend" 
                  /></th>
                <th>메일제목</th>
                <th>상태</th>
                <th>발송일시</th>
                <th>발송수</th>
                <th>성공</th>
                <th>실패</th>
              </tr>
            </thead>
            <tbody>
              {props.mailList.map(
                (mailList, index) =>
                <tr key={index}>
                  <td>
                    삭제 
                    <input 
                    type="checkbox" 
                    name="chkSend" 
                    id="" />
                  </td>
                  <td><a href="/view_mail.html">{mailList.send_subject}</a></td>
                  {(mailList.mail_check.toString() > 0 ?
                    (<td>발송완료</td>)
                      : (<td>발송대기</td>)
                  )}
                  <td>{mailList.send_datetime}</td>
                  <td>{mailList.send_cnt}</td>
                  <td>{mailList.send_succ_cnt}</td>
                  <td>{mailList.send_fail_cnt}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  )
}

export default List;
