import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';

function Create(props) {

  const [visible, setVisible] = useState(false);

  const modalOpen = () => {
    setVisible(true)
  }

  const modalClose = () => {
    setVisible(false)
  }

  const saveReceiverList = () => {
    alert("수신인 저장");
    setVisible(false)
  }

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
                <button id="btnAddReceivers" className="fl btn btn-add" type="button" onClick={modalOpen}>추가</button>
              </label> 
            </div>
            <div className="content-title-area">
              콘텐츠 명 <strong>[ 웹진 6월호 ]</strong> 
            </div>
            <div className="content-area">
              <textarea name="" id="" readOnly></textarea>
            </div>
            <div className="option-area cf">
              <strong className="fl">
                발송일시 : 
              </strong>
              <label htmlFor="direct" className="fl">
                즉시발송
                <input type="radio" name="sendOption" id="direct" defaultChecked="checked"/>
              </label>
              <label htmlFor="booked" className="fl">
                예약발송
                <input type="radio" name="sendOption" id="booked" />
              </label>
              <select name="bookedTime" id="bookedTime" className="fl" disabled="disabled">
                <option value="">01:00</option>
              </select>
            </div>
            <div className="btn-wrap fr">
              <button className="btn btn-save">저장</button>
            </div>
          </form>
        </div>
      </div>

      {/* modal add receiver list */}
      {visible === true ? 
      (
      <div id="overLay">
        <div id="modalWrap">
          <div className="inner">
            <div className="box">
              <select name="" id="">
                <option value=""></option>
              </select>
              <input type="text" id="searchWillAdd" />
              <div className="list">
                <select name="" id="" multiple>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                  <option value="">4</option>
                  <option value="">5</option>
                  <option value="">6</option>
                </select>
              </div>
            </div>
            <div className="box">
              <input type="text" id="searchDidAdd" />
              <div className="list">
                <select name="" id="" multiple>
                  <option value="">1</option>
                  <option value="">2</option>
                  <option value="">3</option>
                  <option value="">4</option>
                  <option value="">5</option>
                  <option value="">6</option>
                </select>
              </div>
            </div>
          </div>
          <div className="btn-wrap">
            <button type="button" className="btn btn-add" onClick={saveReceiverList}>확인</button>
            <button type="button" className="btn btn-del" onClick={modalClose}>취소</button>
          </div>
        </div>
      </div>
      ) 
      : 
      ("")}
    </Fragment>
  )
}

export default Create;
