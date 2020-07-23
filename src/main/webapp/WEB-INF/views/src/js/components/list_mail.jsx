import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";


function List(props) {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [listsPerPage, setListsPerPage] = useState(10); 
  const [pageRange, setPageRange] = useState(5);
  const indexOfLastList = currentPage * listsPerPage;
  const indexOfFirstList = indexOfLastList - listsPerPage;
  const currentLists = props.mailList.slice(indexOfFirstList, indexOfLastList);
  const totalPosts = props.mailList.length;
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

  // const handlePageChange = pageNumber => {
  //   setActivePage(pageNumber)
  // }

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

  useEffect(() => {
    
  },[])

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
                <th>대기</th>
                <th>성공</th>
                <th>실패</th>
              </tr>
            </thead>
            <tbody>
              {currentLists
                .sort((a,b) => b.send_list_id - a.send_list_id)
                .map((currentLists, index) =>
                <tr key={index}>
                  <td> 
                    <input 
                    type="checkbox" 
                    name="chkSend" 
                    id={currentLists.send_list_id} />
                  </td>
                  <td><a href={"/view_mail?id="+currentLists.send_list_id}>{currentLists.send_subject}</a></td>
                  <td>{currentLists.send_status}</td>
                  <td>{currentLists.send_datetime.split(".")[0]}</td>
                  <td>{currentLists.send_cnt}</td>
                  <td>{currentLists.send_w_cnt}</td>
                  <td>{currentLists.send_succ_cnt}</td>
                  <td>{currentLists.send_fail_cnt}</td>
                </tr>
              )}
            </tbody>
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
              className={currentPage === 1 ? ("disabled"):("")}
              >
              이전
              </button>
            </li>
            {pageNumber.map((pageNum,index) => (
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
