import React, { Fragment, useState, useEffect } from "react";

function Reciever(props) {
  return (
    <Fragment>    
      <h2 className="page-title">
        수신인 관리
      </h2>
      <div className="receiver-management">
        <div className="box group">
          <div className="top-line cf">
            <strong className="fl">그룹</strong>
            <div className="btn-wrap fr">
              <a href="/create_g_receiver.html" className="btn btn-add">추가</a>
              <button className="btn btn-del">삭제</button>
            </div>
            <input id="searchGroupInput" className="fr" type="text" placeholder="그룹 검색" />
          </div>
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" name="chkAllGroup" id="chkAllGroup"/></th>
                <th>그룹명</th>
                <th>멤버수</th>
              </tr>
            </thead>
            <tbody>
              {props.posts.map(
                (posts, index) =>
                <tr key={index}>
                  <td><input type="checkbox" name="chkGroup" id={"chkGroup" + (index + 1)} /></td>
                  <td><a href="">bitbucket</a></td>
                  <td>{posts.id}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="box member">
          <div className="top-line cf">
            <strong className="fl">멤버</strong>
            <div className="btn-wrap fr">
              <a href="/create_m_receiver.html" className="btn btn-add">추가</a>
              <button className="btn btn-del">삭제</button>
            </div>
            <input id="searchMemberInput" className="fr" type="text" placeholder="멤버 검색" />
          </div>
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" name="chkAllMember" id="chkAllMember" /></th>
                <th>이름</th>
                <th>메일주소</th>
                <th>그룹</th>
                <th>수신거부일</th>
              </tr>
            </thead>
            <tbody>
              {props.posts.map(
                (posts, index) =>
                <tr key={index}>
                  <td><input type="checkbox" name="chkMember" id={"chkMember" + (index + 1)} /></td>
                  <td>John Doe</td>
                  <td>{posts.email}</td>
                  <td>bitbucket</td>
                  <td>2020.06.23</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  )
}

export default Reciever;