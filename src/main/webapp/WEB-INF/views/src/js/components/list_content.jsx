import React, { useState, useEffect, Fragment } from "react";
import axios from 'axios';

function List(props) {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [listsPerPage, setListsPerPage] = useState(10);
  const [pageRange, setPageRange] = useState(5);
  const indexOfLastList = currentPage * listsPerPage;
  const indexOfFirstList = indexOfLastList - listsPerPage;
  const currentLists = props.contents.slice(indexOfFirstList, indexOfLastList);
  const totalPosts = props.contents.length;
  const totalPages = totalPosts / listsPerPage;
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNumber.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const getNextPage = () => {
    console.log(currentPage);
    console.log(Math.ceil(totalPages));
    if (currentPage >= Math.ceil(totalPages)) {
      return false;
    } else {
      setCurrentPage(currentPage + 1);
    }
  }

  const getPrevPage = () => {
    console.log(currentPage);
    if (currentPage <= 1) {
      return false;
    } else {
      setCurrentPage(currentPage - 1);
    }
  }

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

  useEffect(() => {

  }, [])

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
              {currentLists
                .sort((a,b) => b.contents_id - a.contents_id)
                .map((currentLists,index) =>
                <tr key={index}>
                  <td>
                    <label htmlFor={"chkContent" + currentLists.contents_id}>
                      <input 
                      type="checkbox" 
                      name="chkContent"
                      id={currentLists.contents_id} 
                      refs={currentLists.contents_id}
                      />
                    </label>
                  </td>
                  <td><a href={"/view_content?id=" + currentLists.contents_id}>{currentLists.contents_name}</a></td>
                  <td>{currentLists.req_date.split(" ")[0]}</td>
                  <td>
                    <a href={"/create_mail?id=" + currentLists.contents_id} className="btn btn-send">발송</a>
                  </td>
                </tr>  
              )}
            </tbody>
            {/* end table body */}
          </table>
          )}
        </div>

        {/* pagination */}
        <div id="pagination">
          <ul className="flex-cont">
            <li className="btn-prev indicator">
              <button
                type="button"
                onClick={getPrevPage}
                className={currentPage === 1 ? ("disabled") : ("")}
              >
                이전
              </button>
            </li>
            {pageNumber.map((pageNum, index) => (
              <li key={pageNum} className={"item page" + pageNum} onClick={() => paginate(pageNum)}>
                <button type="button" className={pageNum === currentPage ? ("current") : ("")}>{pageNum}</button>
              </li>
            ))}
            <li className="btn-next indicator">
              <button
                type="button"
                onClick={getNextPage}
                className={currentPage === Math.ceil(totalPages) ? ("disabled") : ("")}
              >
                다음
              </button>
            </li>
          </ul>
        </div>
        {/* end pagination */}
      </div>
    </Fragment>
  )
}

export default List;
