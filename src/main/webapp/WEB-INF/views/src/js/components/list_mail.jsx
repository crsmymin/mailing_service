import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

function List(props) {
  const chkAllSend = e => {
    const { target: {value}} = e;
    console.log(value)
    if($("#chkAllSend").prop("checked")) {
      $("input[name=chkSend]").prop("checked",true); 
    } else { 
      $("input[name=chkSend]").prop("checked",false); }
  }
  const onSave = () => {
    let result = confirm("항목들을 삭제 하시겠습니까?")
    if(result) {
    var checkbox = $("input[name=chkSend]:checked");
    var delete_id="";
    for(var i=0;i<checkbox.length;i++){
      delete_id+=checkbox[i].id+',';
    }
    delete_id=delete_id.substring(0, delete_id.lastIndexOf(","));
    axios({
        method: 'get',
        url: '/SendMailDelete.do',
        params: {
          id : delete_id
        }
      })
      .then(res => {
        const data = res.data;
        console.log(data);
        alert("저장되었습니다.")
        location.reload();
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      return false;
    }
  }
  return (
    <Fragment>
      <h2 className="page-title">
        메일 발송 리스트
      </h2>
      <div className="list-mail-send">
        <div className="top-line cf">
          <div className="btn-wrap fr">
            <button className="btn btn-save" onClick={onSave}>저장</button>
          </div>
        </div>
        <div className="box">
          {props.loading === true ? 
          (
            <div className="loading-indicator mail-list">
              <div className="loader"></div>
            </div>
          ):
          (
          <table>
            <thead>
              <tr>
                <th>
                  삭제 
                  <input 
                  type="checkbox" 
                  name="chkAllSend" 
                  id="chkAllSend" 
                  onClick={chkAllSend}
                  /></th>
                <th>메일제목</th>
                <th>상태</th>
                <th>발송일시</th>
                <th>발송수</th>
                <th>성공</th>
                <th>실패</th>
              </tr>
            </thead>
            <tbody>
              {props.mailList.map(
                (mailList, index) =>
                <tr key={index}>
                  <td> 
                    <input 
                    type="checkbox" 
                    name="chkSend" 
                    id={mailList.send_list_id} />
                  </td>
                  <td><a href={"/view_mail?id="+mailList.send_list_id}>{mailList.send_subject}</a></td>
                  <td>{mailList.send_status}</td>
                  <td>{mailList.send_datetime.split(" ")[0]}</td>
                  <td>{mailList.send_cnt}</td>
                  <td>{mailList.send_succ_cnt}</td>
                  <td>{mailList.send_fail_cnt}</td>
                </tr>
              )}
            </tbody>
          </table>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default List;
