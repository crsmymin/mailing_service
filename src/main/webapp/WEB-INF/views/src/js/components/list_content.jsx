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
              <a href="/create_content" className="btn btn-add">추가</a>
              <button type="button" className="btn btn-save">저장</button>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                <th>삭제 <input type="checkbox" name="chkAllContent" id="chkAllContent"/></th>
                <th>컨텐츠 명</th>
                <th>등록일</th>
                <th>메일 발송</th>
              </tr>
            </thead>
            <tbody>
              {props.contents.map(
                (contents,index) =>
                <tr key={index}>
                  <td>삭제 <input type="checkbox" name="chkContent" id="chkContent"/></td>
                  <td><a href="/view_content.html">{contents.contents_name}</a></td>
                    <td>{contents.req_date}</td>
                  <td>
                    <a href="/create_mail.html" className="btn btn-send">발송</a>
                  </td>
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