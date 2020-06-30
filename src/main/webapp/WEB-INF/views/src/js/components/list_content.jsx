import React, { useState, useEffect, Fragment } from "react";

function List(props) {
  return (
    <Fragment>
      <h2 className="page-title">
        콘텐츠 관리
      </h2>
      <div className="list-mail-content">
        <div className="box">
          <div className="top-line cf">
            <div className="btn-wrap fr">
              <a href="/create_content.html" className="btn btn-add">추가</a>
              <button className="btn btn-del">삭제</button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th><input type="checkbox" name="chkAllContent" id="chkAllContent"/></th>
                <th>컨텐츠 명</th>
                <th>등록일</th>
                <th>메일 발송</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><input type="checkbox" name="chkContent" id="chkContent" /></td>
                <td><a href="/view_content.html">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ratione eveniet, consequatur eos iure officia</a></td>
                <td>2020.06.25</td>
                <td>
                  <a href="/create_mail.html" className="btn btn-send">발송</a>
                </td>
              </tr>  
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  )
}

export default List;
