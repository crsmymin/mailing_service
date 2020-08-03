import React, { useState, useEffect, Fragment, useRef } from "react";
import ReactDom from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../sass/modal.scss";
import axios from 'axios';

let group_id = "";

function Create(props) {
  
  const [initMember,setInitMember] = useState([]);
  const [initGroup, setInitGroup] = useState([]);
  const [visible, setVisible] = useState(false);
  const [startDate, setStartDate] = useState();
  const [sendOption, setSendOption] = useState("direct");
  const [mailTitle, setMailTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [contentsId, setContentsId] = useState();
  const [contentsName, setContentsName] = useState();
  const [contentsHtml, setContentsHtml] = useState();
  const [searchWord, setSearchWord] = useState("");
  const [sendList, setSendList] = useState("");

  const _getContentsView = () => {
    const loadDt = new Date();
    loadDt.setHours(loadDt.getHours()+1);
    loadDt.setMinutes(0);
    
    setStartDate(loadDt);
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
      //console.log(data)
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
      //console.log(data)
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
    let addList = $("#memberTbl input[name=chkMember]:checked");
    addList.each(function(i){
      let tr = addList.parent().parent().eq(i);
      let inner="";
      for(let j=0; j < tr.length; j++) {
        let didSelectList=document.getElementById("didMemberTbl").innerHTML;
        if(didSelectList.indexOf(tr[j].innerHTML)==-1){
          inner +="<tr className='tr-members created'>"+tr[j].innerHTML+"</tr>";
        }
      }
      //console.log(data_array)
      $("#didMemberTbl").append(inner);

      $("#didMemberTbl tr").off("click");
      $("#didMemberTbl tr").click(function(e){
        if(e.target.nodeName==='TD'){
          if($(e.target.parentElement.firstChild.firstChild).prop("checked")) { 
            $(e.target.parentElement.firstChild.firstChild).prop("checked",false); 
            $(e.target.parentElement).removeClass("checked");
          } else{
            $(e.target.parentElement.firstChild.firstChild).prop("checked",true); 
            $(e.target.parentElement).addClass("checked");
          }
        }else{
          if($(e.target).prop("checked")) { 
            $(e.target.parentElement.parentElement).addClass("checked");
          } else{
            $(e.target.parentElement.parentElement).removeClass("checked");
          }
        }
      });
    });
  }

  const removeReceiverList = () => {
    let removeList = $("#didMemberTbl input[name=chkMember]:checked");
    removeList.each(function(i){
      let tr = removeList.parent().parent();
      tr.remove();  
    });

    $("#didMemberTbl input[name=chkMember]").prop("checked",false); 
    $("#didMemberTbl tr").removeClass("checked");

    //alert("리스트에 목록이 제외되었습니다.");
  }

  const saveReceiverList = () => {
    let sendList = $("#didMemberTbl tr");
    let sendMailList="";
    let tr= $("#didMemberTbl tr");
    for(let i=0;i<sendList.length;i++){
      let text= tr[i].innerText;
      let array=text.split('	');
      sendMailList += "["+array[1]+"] "+array[2]+", ";
    }
    
    sendMailList=sendMailList.substr(0,sendMailList.length-2);
    setSendList(sendMailList);
    //alert("수신인 저장");
    setVisible(false);

  }

  const saveContents = () => {
    let send_date = "";
    var st = $("input:radio[name=sendOption]:checked").val();
    if (st==='booked')
      send_date = document.getElementById("bookedTime").value;
    
    console.log(mailTitle.length);
    if(mailTitle.length===0){
      alert("메일 제목을 입력하세요.");
    }else if(sendList.length===0){
      alert("수신인을 선택하세요.");
    }else{
      axios({
        method: 'post',
        url: '/SendMailInsert.do',
        data: {
          send_subject: mailTitle,      
          send_mail_list: sendList,
          contents_id: contentsId,
          send_datetime: send_date,
          send_memo: memo
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
        location.href="/list_mail"
      })
      .catch(error => {
        console.log(error)
      })
    }
    
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

  const chkAllMember = e => {
    // 멤버 삭제 전체선택
    const { target: {value}} = e;
    if($("#chkAllMember").prop("checked")) { 
      $("#memberTbl input[name=chkMember]").prop("checked",true); 
      $("#memberTbl tr").addClass("checked");
    } else {
      $("#memberTbl input[name=chkMember]").prop("checked",false); 
      $("#memberTbl tr").removeClass("checked");
    }
  }
  
  const chkDidMember = e => {
    // 멤버 삭제 전체선택
    const { target: {value}} = e;
    if($("#chkDidMember").prop("checked")) { 
      $("#didMemberTbl input[name=chkMember]").prop("checked",true); 
      $("#didMemberTbl tr").addClass("checked");
    } else {
      $("#didMemberTbl input[name=chkMember]").prop("checked",false); 
      $("#didMemberTbl tr").removeClass("checked");
    }
  }

  const memberClick = e => {
    // 멤버 삭제 전체선택
    const { target: {value}} = e;
    let tr = e.target.parentElement;
    if(e.target.nodeName==='TD'){
      if($(e.target.parentElement.firstChild.firstChild).prop("checked")) { 
        $(e.target.parentElement.firstChild.firstChild).prop("checked",false); 
        $(e.target.parentElement).removeClass("checked");
      } else{
        $(e.target.parentElement.firstChild.firstChild).prop("checked",true); 
        $(e.target.parentElement).addClass("checked");
      }
    }else{
      if($(e.target).prop("checked")) { 
        $(e.target.parentElement.parentElement).addClass("checked");
      } else{
        $(e.target.parentElement.parentElement).removeClass("checked");
      }
    }
  }
  
  useEffect(() => {
    _getContentsView();
    //alert("리스트에 목록이 추가되었습니다.");
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
            <div className="title-area">
              <label htmlFor="mailMemo">
                <input 
                id="memo" 
                type="text" 
                placeholder="Memo"
                value={memo}
                onChange={e => setMemo(e.target.value)}
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
            <div className="content-title-area">
              콘텐츠 <strong>{contentsName}</strong> 
            </div>
            <div className="content-area">
              <div id="loaded-content" dangerouslySetInnerHTML={{__html: contentsHtml}}></div>
            </div>
          </form>
        </div>
      </div>

      {/* modal add receiver list */}
      <div id="overLay" className={visible === true ? ("open") : ("")}>
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
            </div>                
            <div className="box will-add-list">
              <div className="title">
                <span><input type="checkbox" name="chkAllMember" id="chkAllMember" onClick={chkAllMember}/></span>
                <span>이름</span>
                <span>이메일</span>
              </div>
              <div className="list">
              <table>
                <tbody id="memberTbl">
                {initMember.map(
                      (initMember,index) =>
                <tr className="tr-members created" key={index} onClick={memberClick}>
                    <td><input type="checkbox" name="chkMember" id={initMember.member_id}/></td>
                    <td>{initMember.member_name}</td>
                    <td>{initMember.member_mail}</td>
                </tr>
                )}
                </tbody>
              </table>
              </div>
            </div>
            
            <div className="box indicator">
              <button id="btnAddList" className="btn-save" type="button" onClick={addReceiverList}>추가</button>
              <button id="btnRemoveList" className="btn-del" type="button" onClick={removeReceiverList}>제거</button>
            </div>        

            <div className="box did-add-list">
              <div className="title">
                <span><input type="checkbox" name="chkDidMember" id="chkDidMember" onClick={chkDidMember}/></span>
                <span>이름</span>
                <span>이메일</span>
              </div>
              <div className="list">
              <table>
                <tbody id="didMemberTbl">
                </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="btn-wrap">
            <button type="button" className="btn btn-add" onClick={saveReceiverList}>확인</button>
            <button type="button" className="btn btn-del" onClick={modalClose}>취소</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default Create;