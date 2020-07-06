import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';

function List(props) {
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  
  useEffect(() => {
    
  },[])

  const handleCheckedChange = e => {
    const { target: { checked } } = e;
    setIsChecked(true)
  }


  const onSave = () => {
    let result = confirm("항목들을 삭제 하시겠습니까?")
    if(result) {
      axios({
        method: 'get',
        url: '/ContentsDelete.do',
        params: {
          id : 9,
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
                      삭제 
                      <input 
                      type="checkbox" 
                      name="chkContent"
                      id={"chkContent" + contents.contents_id} 
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
        </div>
      </div>
    </Fragment>
  )
}

export default List;
