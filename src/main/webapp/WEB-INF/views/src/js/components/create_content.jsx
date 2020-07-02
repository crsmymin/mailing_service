import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

function Create(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  
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
      url :'/ContentsInsert.do',
      data: {
        contents_name : title,
        contens_html : content
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
                <input id="title" type="text" name="title" placeholder="콘테츠 타이틀" value={title} onChange={e => setTitle(e.target.value)}/>
              </label>
            </div>
            <div className="content-area">
              <textarea id="content" name="content" placeholder="내용입력" value={content} onChange={e => setContent(e.target.value)}></textarea>
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
