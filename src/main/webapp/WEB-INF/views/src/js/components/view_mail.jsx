import React, { useState, useEffect, Fragment } from "react";

function View(props) {
  return (
    <Fragment>
      <h2 className="page-title">
        메일 상세
      </h2>
      <div className="view-mail-send">
        <div className="box state-send">
          <ul>
            <li className="title">메일제목: <em>AWS Unboxing 온라인 세미나에 초대합니다!</em></li>
            <li className="date">발송일시: <em>2020.06.25</em></li>
            <li className="result">
              <span>발송: <em>300</em></span>
              <span>성공: <em>290</em></span>
              <span>실패: <em>10</em></span>
              <span>수신확인: <em>150</em></span>
              <span>수신거부: <em>0</em></span>
            </li>
          </ul>
        </div>
        <div className="box list-receiver">
          <table>
            <thead>
              <tr>
                <th>메일주소</th>
                <th>이름</th>
                <th>수신확인일</th>
                <th>수신거부일</th>
              </tr>
            </thead>
            <tbody>
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
