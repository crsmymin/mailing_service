import React, { useState, useEffect, Fragment } from "react";

function Create(props) {
  return (
    <Fragment>
      <h2 className="page-title">
        메일 발송 
      </h2>
      <div className="create-mail-send">
        <div className="box">
          <form id="frmMailSend" action="">
            <div className="title-area">
              <label htmlFor="mailTitle">
                <input id="mailTitle" type="text" placeholder="메일제목"/>
              </label>
            </div>
            <div className="receiver-area">
              <label htmlFor="receivers">
                <input id="receivers" className="fl" type="text" placeholder="수신자" readOnly/>
                <button id="addReceivers" className="fl btn btn-add" type="button">추가</button>
              </label> 
            </div>
            <div className="content-title-area">
              콘텐츠 명 <strong>[ 웹진 6월호 ]</strong> 
            </div>
            <div className="content-area">
              <textarea name="" id=""></textarea>
            </div>
            <div className="option-area cf">
              <strong className="fl">
                발송일시 : 
              </strong>
              <label htmlFor="direct" className="fl">
                즉시발송
                <input type="radio" name="sendOption" id="direct"/>
              </label>
              <label htmlFor="booked" className="fl">
                예약발송
                <input type="radio" name="sendOption" id="booked" />
              </label>
              <select name="bookedTime" id="bookedTime" className="fl" disabled>
                <option value="">00:00</option>
                <option value="">01:00</option>
                <option value="">02:00</option>
              </select>
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

export default Create;
