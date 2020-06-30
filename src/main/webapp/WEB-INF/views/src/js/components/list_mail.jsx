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
            <button className="btn btn-del">삭제</button>
          </div>
        </div>
        <div className="box">
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" name="chkAllSend" id="chkAllSend" /></th>
                <th>메일제목</th>
                <th>상태</th>
                <th>발송일시</th>
                <th>발송수</th>
                <th>성공</th>
                <th>실패</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" name="chkSend" id="" /></td>
                <td><a href="/view_mail.html">AWS Unboxing 온라인 세미나에 초대합니다!</a></td>
                <td>발송 완료</td>
                <td>2020.06.25 04:30</td>
                <td>124</td>
                <td>122</td>
                <td>2</td>
              </tr>
              <tr>
                <td><input type="checkbox" name="chkSend" id="" /></td>
                <td><a href="/view_mail.html">AWS Unboxing 온라인 세미나에 초대합니다!</a></td>
                <td>발송 대기</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  )
}

export default List;
