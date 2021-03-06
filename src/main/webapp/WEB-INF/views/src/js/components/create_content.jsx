import React, { useState, useEffect, Fragment } from "react";
import $ from "jquery";
window.$ = $;
window.jQuery = $;
import axios from "axios";
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css'; 
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/js/dist/modal';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/tooltip';

function Create(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memo, setMemo] = useState("");
  const [auth, setAuth] = useState(window.sessionStorage.getItem('auth'));

  const onSubmit = e => {
    e.preventDefault();
    if (title === '' || title === ' ') {
      alert("콘텐츠 타이틀은 필수값입니다.");
      document.getElementById("title").focus();
      return false;
    }
  
    axios({
      method: 'post',
      url :'/ContentsInsert.do',
      data: {
        contents_name : title,
        contents_html : content,
        contents_memo : memo,
        login_group : auth
      }
    })
    .then(res => {
      const data = res.data;
      console.log(data);
      alert("저장되었습니다.");
      location.href="/list_content"
    })
    .catch(error => {
      console.log(error)
    })

    setTitle('');
    setContent('');
  }
  
  useEffect(() => {
    
  })

  return (
    <Fragment>
      <h2 className="page-title">
        콘텐츠 생성
      </h2>
      <div className="create-mail-content">
        <div className="box">
          <form id="frmMailContent" onSubmit={onSubmit}>
            <div className="title-area">
              <label>
              <input id="memo" type="text" name="memo" placeholder="구분" onChange={e => setMemo(e.target.value)}/>
                <input id="title" type="text" name="title" placeholder="타이틀" onChange={e => setTitle(e.target.value)}/>
              </label>
            </div>
            <div className="content-area">
              <ReactSummernote
                value="콘텐츠를 작성해주세요"
                options={{
                  lang: "ko-KR",
                  height: 450,
                  dialogsInBody: true,
                  toolbar: [
                    ['fontname', ['fontname']],
                    ['font', ['bold', 'underline', 'clear']],
                    ['color', ['color']],
                    ['para', ['paragraph']],
                    ['table', ['table']],
                    ['insert', ['link']],
                    ['view', ['codeview']]
                  ]
                }}
                onChange={content => setContent(content)}
              />
            </div>
            <div className="btn-wrap fr">
              <button type="submit" className="btn btn-save">저장</button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default Create;
