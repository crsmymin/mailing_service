import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';

function List(props) {
    
  useEffect(() => {
    
  },[])

  const onSave = () => {
    let checkbox = $("input[name=chkContent]:checked");
    if(checkbox.length === 0) {
      alert("선택 항목이 없습니다.")
      return false;
    } else {
      let result = confirm("항목들을 삭제 하시겠습니까?")
      if (result) {
        let delete_id = "";
        for (let i = 0; i < checkbox.length; i++) {
          delete_id += checkbox[i].id + ',';
        }
        delete_id = delete_id.substring(0, delete_id.lastIndexOf(","));
        axios({
          method: 'get',
          url: '/ContentsDelete.do',
          params: {
            id: delete_id
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
  }

  const chkAllContent = e => {
    const { target: {value}} = e;
    console.log(value)
    if($("#chkAllContent").prop("checked")) {
      $("input[name=chkContent]").prop("checked",true); 
    } else { 
      $("input[name=chkContent]").prop("checked",false); }
  }
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
              <button type="button" className="btn btn-save" onClick={onSave}>저장</button>
            </div>
          </div>
          {props.loading === true ? 
          (
            <div className="loading-indicator content-list">
              <div className="loader"></div>
            </div>
          ) : 
          (
          <table>
            {/* table head */}
            <thead>
              <tr>
                <th>
                  <label htmlFor="chkAllContent">
                    삭제 
                    <input 
                    type="checkbox" 
                    name="chkAllContent" 
                    id="chkAllContent" 
                    onClick={chkAllContent}
                    />
                  </label>
                </th>
                <th>컨텐츠 명</th>
                <th>등록일</th>
                <th>메일 발송</th>
              </tr>
            </thead>
            {/* end table head */}

            {/* table body */}
            <tbody>
              {props.contents
                .sort((a,b) => b.contents_id - a.contents_id)
                .map((contents,index) =>
                <tr key={index}>
                  <td>
                    <label htmlFor={"chkContent" +contents.contents_id}>
                       
                      <input 
                      type="checkbox" 
                      name="chkContent"
                      id={contents.contents_id} 
                      refs={contents.contents_id}
                      />
                    </label>
                    </td>
                  <td><a href={"/view_content?id=" + contents.contents_id}>{contents.contents_name}</a></td>
                  <td>{contents.req_date.split(" ")[0]}</td>
                  <td>
                    <a href={"/create_mail?id=" + contents.contents_id} className="btn btn-send">발송</a>
                  </td>
                </tr>  
              )}
            </tbody>
            {/* end table body */}
          </table>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default List;
