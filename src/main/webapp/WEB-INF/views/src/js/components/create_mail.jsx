import React, { useState, useEffect, Fragment } from "react";
import ReactDom from "react-dom";
import axios from 'axios';

let group_id = "";

function Create(props) {
  useEffect(() => {
    _getContentsView();
     
  }, [])
  const [visible, setVisible] = useState(false);
  const [contentsId, setContentsId] = useState()
  const [contentsName, setContentsName] = useState()
  const [contentsHtml, setContentsHtml] = useState()
  const [searchWord, setSearchWord] =useState("");
  
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
  const elements=[];
  const modalOpen = () => {
   
    settingGroup();
    settingMember();  
    setVisible(true)
  }

  const settingGroup = () => {
    axios({
      method: 'get',
      url: '/GroupSearch.do'
    })
      .then(res => {
        const data = res.data;
        //console.log(data)
        elements.push(<option key='' value=''>전체</option>);
        
        for(let i=0;i<data.length;i++){
        elements.push(<option key={'group'+data[i].group_id} value={data[i].group_id}>{data[i].group_name}</option>);
        };
        ReactDom.render(<select>{elements}</select>, document.getElementById("selectGroup"));
      })
      .catch(error => {
        console.log(error)
      })
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
      console.log(data.length)
      for(let i=0;i<data.length;i++){
      elements.push(<option key={'member'+data[i].member_id} value={data[i].member_id}>{data[i].member_name}</option>);
      };
      ReactDom.render(<select multiple>{elements}</select>, document.getElementById("selectMember"));
    })
    .catch(error => {
      console.log(error)
    })
  }
  const modalClose = () => {
    setVisible(false)
  }

  const saveReceiverList = () => {
    alert("수신인 저장");
    setVisible(false)
  }

  const saveContents = () => {
    
    let title_val = document.getElementById("mailTitle").value;
    let receivers_val = document.getElementById("receivers").value;
    let contents_id = contentsId;
    axios({
      method: 'post',
      url: '/SendMailInsert.do',
      data: {
        send_subject: title_val,      
        send_mail_list: receivers_val,
        contents_id:contents_id
      },
      headers: { 
        'Content-Type': 'application/json; charset=utf-8' 
      }
    })
    .then(res => {
      const data = res.data;
      //console.log(data)
      alert("저장되었습니다.");
    })
    .catch(error => {
      console.log(error)
    })
  }

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
                <input id="mailTitle" type="text" placeholder="메일제목"/>
              </label>
            </div>
            <div className="receiver-area">
              <label htmlFor="receivers">
                <input id="receivers" className="fl" type="text" placeholder="수신자" />
                <button id="btnAddReceivers" className="fl btn btn-add" type="button" onClick={modalOpen}>추가</button>
              </label> 
            </div>
            <div className="content-title-area">
              콘텐츠 <strong>[{contentsName}]</strong> 
            </div>
            <div className="content-area">
              <textarea name="content" id="content">{contentsHtml}</textarea>
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
              <button className="btn btn-save" onClick={saveContents}>저장</button>
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
              <div name="" id="selectGroup"></div>
              <input 
                type="text" 
                id="searchWillAdd" 
                value={searchWord} 
                onChange={e => setSearchWord(e.target.value)}
                onKeyPress={settingMember()}
              />
              <div className="list">
              <div name="" id="selectMember"></div>
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