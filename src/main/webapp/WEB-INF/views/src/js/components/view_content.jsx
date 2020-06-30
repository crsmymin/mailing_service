import React, { useState, useEffect, Fragment } from "react";

function View(props) {
  return (
    <Fragment>
      <h2 className="page-title">
        메일 콘텐츠 상세
      </h2>
      <div className="create-mail-content">
        <div className="box">
          <form id="frmMailContent" action="">
            <div className="title-area">
              <label htmlFor=""><input type="text" name="title" placeholder="콘테츠 타이틀"/></label>
            </div>
            <div className="content-area">
              <textarea name="content" id="" placeholder="내용입력"></textarea>
            </div>
            <div className="btn-wrap fr">
              <button className="btn btn-save">저장</button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default View;
