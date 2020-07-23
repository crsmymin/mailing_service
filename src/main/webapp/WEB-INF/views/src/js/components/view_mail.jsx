import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

function View(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [sendCnt, setSendCnt] = useState("");
  const [waitCnt, setWaitCnt] = useState("");
  const [succCnt, setSuccCnt] = useState("");
  const [failCnt, setFailCnt] = useState("");
  const [mailCheck, setMailCheck] = useState("");
  const [mailReject, setMailReject] = useState("");
  const [mailList, setMailList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listsPerPage, setListsPerPage] = useState(5);
  const [pageRange, setPageRange] = useState(5);
  const indexOfLastList = currentPage * listsPerPage;
  const indexOfFirstList = indexOfLastList - listsPerPage;
  const currentLists = mailList.slice(indexOfFirstList, indexOfLastList);
  const totalPosts = mailList.length;
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

  const _getMailView = () => {
    const id = location.search.split("=")[1];
    axios({
      method: 'get',
      url: '/SendMailSearch.do',
      params : {
        id : id,
      }
    })
    .then(res => {
      const data = res.data
      console.log(data)
      setTitle(data[0].send_subject);
      setContent(data[0].contents_id);
      setSendDate(data[0].send_datetime);
      setSendCnt(data[0].send_cnt);
      setWaitCnt(data[0].send_w_cnt);
      setSuccCnt(data[0].send_succ_cnt);
      setFailCnt(data[0].send_fail_cnt);
      setMailCheck(data[0].mail_check);
      setMailReject(data[0].mail_reject);
    })
    .catch(error => {
      console.log(error)
    })
  }
  const elements=[];
  const _getMailListView = () => {
    const id = location.search.split("=")[1];
    axios({
      method: 'get',
      url: '/SendResultSearch.do',
      params : {
        id : id,
      }
    })
    .then(res => {
      const data = res.data
      console.log(data)
      setMailList(data);
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    _getMailView();
    _getMailListView();

  }, [])

  return (
    <Fragment>
      <h2 className="page-title">
        메일 상세
      </h2>
      <div className="view-mail-send">
        <div className="box state-send">
          <ul>
            <li className="title">메일제목: <em>{title}</em></li>
            <li className="date">발송일시: <em>{sendDate.split(".")[0]}</em></li>
            <li className="result">
              <span>발송: <em>{sendCnt}</em></span>
              <span>대기: <em>{waitCnt}</em></span>
              <span>성공: <em>{succCnt}</em></span>
              <span>실패: <em>{failCnt}</em></span>
              <span>수신확인: <em>{mailCheck}</em></span>
              <span>수신거부: <em>{mailReject}</em></span>
              <span className="float_right"><a href={"/view_content?id=" + content}>[컨텐츠]</a></span>
            </li>
          </ul>
        </div>
        <div className="box list-receiver">
          <table>
            <thead>
              <tr>
                <th>메일주소</th>
                <th>이름</th>
                <th>상태</th>
                <th>수신확인일</th>
                <th>수신거부일</th>
              </tr>
            </thead>
            <tbody id="listReceiver">
              {currentLists.map((currentLists, index) =>
                <tr key={currentLists.send_result_id}>
                  <td>{currentLists.send_mail}</td>
                  <td>{currentLists.member_name}</td>
                  {currentLists.send_result_yn =='y' && <td>완료</td>}
                  {currentLists.send_result_yn =='r' && <td className='result_fail'>거부</td>}
                  {currentLists.send_result_yn =='n' && <td className='result_fail'>실패</td>}
                  {currentLists.send_result_yn ==undefined && <td>대기</td>}
                  {currentLists.send_mail_check_date === undefined ? (<td></td>) 
                  : 
                  (
                  <td>{currentLists.send_mail_check_date.split(".")[0]}</td>
                  )}
                  {currentLists.reject_date === undefined ? (<td></td>) 
                  : 
                  (
                  <td>{currentLists.reject_date.split(".")[0]}</td>
                  )}
                </tr>
                )}
            </tbody>
          </table>
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

export default View;
