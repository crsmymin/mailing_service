import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';

function View(props) {
  const [contentName, setContentName] = useState("");
  const [contentHtml, setContentHtml] = useState("");
  
  useEffect(
    () => {
      setContentName(props.contentsName);
      setContentHtml(props.contentsHtml);
    }, 
    [props]
  );

  const onSubmit = e => {
    e.preventDefault();

    let title_val = document.getElementById("title").value;
    let content_val = document.getElementById("content").value;

    if (title_val === '' || title_val === ' ') {
      alert("콘텐츠 타이틀은 필수값입니다.");
      document.getElementById("title").focus();
      return false;
    }
    if (content_val === '' || content_val === ' ') {
      document.getElementById("content").focus();
      alert("콘텐츠 내용은 필수값입니다.");
      return false;
    }
    
    axios({
      method: 'post',
      url: '/ContentsUpdate.do',
      data: {
        contents_id: props.contentsId,
        contents_name : contentName,
        contents_html: contentHtml
      }
    })
    .then(res => {
      const data = res.data;
      console.log(data);
      alert("저장되었습니다.");
      location.href = "/list_content"
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <Fragment>
      <h2 className="page-title">
        메일 콘텐츠 상세
      </h2>
      <div className="create-mail-content">
        <div className="box">
          <form id="frmMailContent" onSubmit={onSubmit}>
            <div className="title-area">
              <label>
                <input id="title" type="text" name="title" placeholder="콘테츠 타이틀" defaultValue={props.contentsName} onChange={e => setContentName(e.target.value)}/>
              </label>
            </div>
            <div className="content-area">
              <textarea name="content" id="content" placeholder="내용입력" defaultValue={props.contentsHtml} onChange={e => setContentHtml(e.target.value)}></textarea>
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
