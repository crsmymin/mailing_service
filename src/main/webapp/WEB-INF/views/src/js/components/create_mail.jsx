import React, { useState, useEffect, Fragment, useRef } from "react";
import ReactDom from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

let group_id = "";

function Create(props) {
  
  const [initMember,setInitMember] = useState([]);
  const [initGroup, setInitGroup] = useState([]);
  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [sendOption, setSendOption] = useState("direct");
  const [mailTitle, setMailTitle] = useState("");
  const [contentsId, setContentsId] = useState();
  const [contentsName, setContentsName] = useState();
  const [contentsHtml, setContentsHtml] = useState();
  const [searchWord, setSearchWord] = useState("");
  const [sendList, setSendList] = useState("");

  const _getContentsView = () => {
    const id = location.search.split("=")[1];
    axios({
      method: 'get',
      url: '/ContentsSearch.do',
      params : {
        id : id,
      }
    })
    .then(res => {
      const data = res.data
      console.log(data)
      setContentsId(data[0].contents_id);
      setContentsName(data[0].contents_name);
      setContentsHtml(data[0].contents_html);
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  const settingGroup = () => {
    axios({
      method: 'get',
      url: '/GroupSearch.do'
    })
    .then(res => {
      const data = res.data;
      setInitGroup(data);
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  const changeSelect = e => {
    const { target: {value}} = e;
    group_id=value;
    settingMember();
  }

  const settingMember = () => {
    axios({
      method: 'get',
      url: '/MemberSearch.do',
      params: {
        searchValue : searchWord,
        groupID: group_id
      },
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })
    .then(res => {
      const data = res.data;
      console.log(data);
      setInitMember([]);
      setInitMember(data);
      })
    .catch(error => {
      console.log(error)
    })
  }
  
  const memberSearch = id => e => {
    if(e.key === 'Enter'){
      settingMember();
    }
  }

  const modalOpen = () => {
    setVisible(true);
    settingGroup();
    settingMember();
  }

  const modalClose = () => {
    setSearchWord("");
    setInitMember([]);
    setVisible(false);
  }

  const addReceiverList = () => {
    let addList = $("#willSelectList option:selected");
    for(let i=0; i < addList.length; i++) {
      let cln = addList[i].cloneNode(true);
      document.getElementById("didSelectList").appendChild(cln);
    }
    alert("리스트에 목록이 추가되었습니다.");
  }

  const removeReceiverList = () => {
    let removeList = $("#didSelectList option:selected");
    for (let i = 0; i < removeList.length; i++) {
      removeList[i].remove();
    }
    alert("리스트에 목록이 제외되었습니다.");
  }

  const saveReceiverList = () => {
    let sendList = $("#didSelectList option");
    if(sendList.length === 0) {
      alert("선택된 목록이 없습니다.");
    } else {
      let sendMailList = "";
      for (let i = 0; i < sendList.length; i++) {
        let cln = sendList[i].cloneNode(true);
        sendMailList += cln.innerText.split(" | ")[1]+","
        setSendList(sendMailList);
      }
      alert("수신인 저장");
      setVisible(false)
    }
  }

  const saveContents = () => {
    axios({
      method: 'post',
      url: '/SendMailInsert.do',
      data: {
        send_subject: mailTitle,      
        send_mail_list: sendList,
        contents_id: contentsId,
        send_date: startDate
      },
      headers: { 
        'Content-Type': 'application/json; charset=utf-8' 
      }
    })
    .then(res => {
      const data = res.data;
      alert("저장되었습니다.");
      if (st==='direct')
        sendMail(data);
    })
    .catch(error => {
      console.log(error)
    })
  }
  const sendMail = id => {
    axios({
      method: 'get',
      url: '/sendMail.do?id='+id,
      headers: { 
        'Content-Type': 'application/json; charset=utf-8' 
      }
    })
    .then(res => {
      const data = res.data;
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    _getContentsView();
  }, [])

  return (
    <Fragment>
      <h2 className="page-title">
        메일 발송 
      </h2>
      <div className="create-mail-send">
        <div className="box">
          <form>
            <div className="title-area">
              <label htmlFor="mailTitle">
                <input 
                id="mailTitle" 
                type="text" 
                placeholder="메일제목"
                value={mailTitle}
                onChange={e => setMailTitle(e.target.value)}
                />
              </label>
            </div>
            <div className="receiver-area">
              <label htmlFor="receivers">
                <div id="sendMailList">
                  {sendList}
                </div>
                <button id="btnAddReceivers" className="fl btn btn-add" type="button" onClick={modalOpen}>추가</button>
              </label> 
            </div>
            <div className="content-title-area">
              콘텐츠 <strong>[ {contentsName} ]</strong> 
            </div>
            <div className="content-area">
              <div id="loaded-content" dangerouslySetInnerHTML={{__html: contentsHtml}}></div>
            </div>
            <div className="option-area cf">
              <strong className="fl">
                발송일시 : 
              </strong>
              <label htmlFor="direct" className="fl">
                즉시발송
                <input 
                type="radio" 
                name="sendOption" 
                id="direct" 
                value="direct"
                checked={sendOption === "direct"}
                onChange={e => setSendOption(e.target.value)}
                />
              </label>
              <label htmlFor="booked" className="fl">
                예약발송
                <input 
                type="radio" 
                name="sendOption" 
                id="booked" 
                value="booked"
                checked={sendOption === "booked"}
                onChange={e => setSendOption(e.target.value)}
                />
              </label>
              {sendOption === "booked" ? (
              <div className="booked-box">
                <DatePicker 
                  id="bookedTime"
                  selected={startDate}
                  value={startDate}
                  onChange={date => setStartDate(date)}
                  showTimeSelect
                  timeFormat="HH:mm"
                  dateFormat="yyyy-MM-dd HH:mm"
                />
              </div>
              ):("")}
            </div>
            <div className="btn-wrap fr">
              <a className="btn btn-save" onClick={saveContents}>저장</a>
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
            <div className="top-area">
              <div className="will-add">
                <div id="selectGroup">
                  <select name="" id="" onChange={changeSelect}>
                      <option key={"member_all"} value="">전체
                      </option>
                     {initGroup.map(
                      (initGroup, index) =>
                        <option key={"member_"+initGroup.group_id} value={initGroup.group_id}>{initGroup.group_name}
                        </option>
                    )} 
                  </select>
                </div>
                <input
                  type="text"
                  id="searchWillAdd"
                  value={searchWord}
                  onChange={e => setSearchWord(e.target.value)}
                  placeholder="검색"
                  onKeyPress={memberSearch()}
                />
              </div>
              <div className="did-add">
                <input
                  type="text"
                  id="searchDidAdd"
                  placeholder="검색"
                />
              </div>
            </div>                
            <div className="box will-add-list">
              <div className="title">
                <span>이름</span>
                <span>이메일</span>
              </div>
              <div className="list">
                <select 
                multiple
                name="willSelectList" 
                id="willSelectList"
                >
                  {initMember.map(
                  (initMember) =>
                    <option key={"member_"+initMember.member_id} value={initMember.member_id}>
                      {initMember.member_name} | {initMember.member_mail}
                    </option>
                  )}
                </select>
              </div>
            </div>

            <div className="box indicator">
              <button id="btnAddList" className="btn-save" type="button" onClick={addReceiverList}>추가</button>
              <button id="btnRemoveList" className="btn-del" type="button" onClick={removeReceiverList}>제거</button>
            </div>        

            <div className="box did-add-list">
              <div className="title">
                <span>이름</span>
                <span>이메일</span>
              </div>
              <div className="list">
                <select 
                name="didSelectList" 
                id="didSelectList" 
                multiple
                >
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