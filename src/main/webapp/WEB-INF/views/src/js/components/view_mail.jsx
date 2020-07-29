import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

function View(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [memo, setMemo] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [sendCnt, setSendCnt] = useState("");
  const [waitCnt, setWaitCnt] = useState("");
  const [succCnt, setSuccCnt] = useState("");
  const [failCnt, setFailCnt] = useState("");
  const [mailCheck, setMailCheck] = useState("");
  const [mailReject, setMailReject] = useState("");
  const [mailList, setMailList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [listsPerPage] = useState(10);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(5);
  const indexOfLastList = currentPage * listsPerPage;
  const indexOfFirstList = indexOfLastList - listsPerPage;
  const currentLists = mailList.slice(indexOfFirstList, indexOfLastList);
  const totalPosts = mailList.length;
  const totalPages = totalPosts / listsPerPage;
  const pageNumber = [];
  const [loading, setLoading] = useState(false);

  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNumber.push(i);
  }

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);    
  }

  const getNextPage = () => {
    console.log("start : " + (currentPage - 1));
    console.log("now : " + (currentPage + 1));
    console.log("end : " + (currentPage + 3));
    if (currentPage >= Math.ceil(totalPages)) {
      return false;
    } else {
      setCurrentPage(currentPage + 1);
      if (currentPage > 2 && (Math.ceil(totalPages) - currentPage) > 2) {
        setStartIndex(currentPage - 2);
        setEndIndex(currentPage + 3);
      }
    }
  }

  const getPrevPage = () => {
    console.log("start : " + (currentPage - 2));
    console.log("now : " + currentPage);
    console.log("end : " + (currentPage + 2));
    if (currentPage <= 1) {
      return false;
    } else {
      setCurrentPage(currentPage - 1);
      if (currentPage > 3 && (Math.ceil(totalPages) - currentPage) > 1) {
        setStartIndex(currentPage - 4);
        setEndIndex(currentPage + 1);
      }
    }
  }
  
  const _getMailView = () => {
    setLoading(true);
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
      setMemo(data[0].send_memo);
      setContent(data[0].contents_id);
      setSendDate(data[0].send_datetime);
      setSendCnt(data[0].send_cnt);
      setWaitCnt(data[0].send_w_cnt);
      setSuccCnt(data[0].send_succ_cnt);
      setFailCnt(data[0].send_fail_cnt);
      setMailCheck(data[0].mail_check);
      setMailReject(data[0].mail_reject);
      setLoading(false);
    })
    .catch(error => {
      console.log(error)
    })
  }
  const elements=[];
  const _getMailListView = () => {
    setLoading(true);
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
      setLoading(false);
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
        {loading === true ? (
          <div className="loading-indicator mail-view">
            <div className="loader"></div>
          </div>
        ):(
        <>
          <div className="box state-send">
            <ul>
              <li className="title">메일제목: <em>{title}</em></li>
              <li className="memo">Memo: <em>{memo}</em></li>
              <li className="date">발송일시: <em>{sendDate.split(".")[0]}</em></li>
              <li className="result">
                <span>발송: <em>{sendCnt}</em></span>
                <span>대기: <em>{waitCnt}</em></span>
                <span>성공: <em>{succCnt}</em></span>
                <span>실패: <em>{failCnt}</em></span>
                <span>수신확인: <em>{mailCheck}</em></span>
                <span>수신거부: <em>{mailReject}</em></span>
                <span className="fr">
                  <a id="viewContent" href={"/view_content?id=" + content}>[ 컨텐츠 내용보기 ]</a>
                </span>
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
        </>
        )}
        {/* pagination */}
        {loading === true ? (""):(
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
            {pageNumber.slice(startIndex,endIndex).map((pageNum, index) => (
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
        )}
        {/* end pagination */}
      </div>
    </Fragment>
  )
}

export default View;
