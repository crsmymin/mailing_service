import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import $ from "jquery";
window.$ = $;
window.jQuery = $;
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';

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
    if (contentName === '' || contentName === ' ') {
      alert("콘텐츠 타이틀은 필수값입니다.");
      document.getElementById("title").focus();
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
                <input id="title" type="text" name="title" placeholder="타이틀" defaultValue={props.contentsName} onChange={e => setContentName(e.target.value)}/>
              </label>
            </div>
            <div className="content-area">
              <ReactSummernote
                value={props.contentsHtml}
                options={{
                  lang: "ko-KR",
                  height: 450,
                  dialogsInBody: true,
                  toolbar: [
                    ['fontname', ['fontname']],
                    ['font', ['bold', 'underline', 'clear']],
                    ['para', ['paragraph']],
                    ['table', ['table']],
                    ['insert', ['link']],
                    ['view', ['codeview']]
                  ]
                }}
                onChange={contentHtml => setContentHtml(contentHtml)}
              />
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
