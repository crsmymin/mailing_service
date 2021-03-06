import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Workbook from 'react-excel-workbook'

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
  const [auth, setAuth] = useState(window.sessionStorage.getItem('auth'));

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
        id : id
      }
    })
    .then(res => {
      const data = res.data
      console.log(data[0]);
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

  const sheet2 = [{
    mail_title : title,
    count : sendCnt,
    success : succCnt,
    fail : failCnt,
    memo : memo,
    check : mailCheck,
    reject : mailReject,
    send_date : sendDate,
  }]

  const _getMailListView = () => {
    setLoading(true);
    const id = location.search.split("=")[1];
    axios({
      method: 'get',
      url: '/SendResultSearch.do',
      params : {
        id : id,
        login_group : auth
      }
    })
    .then(res => {
      const data = res.data
      console.log(typeof(data));
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
        ?????? ??????
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
              <li className="title">????????????: <em>{title}</em></li>
              <li className="memo">Memo: <em>{memo}</em></li>
              <li className="date">????????????: <em>{sendDate.split(".")[0]}</em></li>
              <li className="result">
                <span>??????: <em>{sendCnt}</em></span>
                <span><em>/</em></span>
                <span>??????: <em>{waitCnt}</em></span>
                <span>??????: <em>{succCnt}</em></span>
                <span>??????: <em>{failCnt}</em></span>
                <span><em>/</em></span>
                <span>????????????: <em>{mailCheck}</em></span>
                <span>????????????: <em>{mailReject}</em></span>
                <a id="viewContent" href={"/view_content?id=" + content}>[ ????????? ???????????? ]</a>
                <span className="fr">
                  <Workbook filename={title + ".xlsx"} element={<button className="btn btn-download">Excel ????????????</button>}>
                    <Workbook.Sheet data={mailList} name="???????????????">
                      <Workbook.Column label="????????????" value="send_mail" />
                      <Workbook.Column label="??????" value="member_name" />
                      <Workbook.Column label="??????" value="send_result_yn" />
                      <Workbook.Column label="???????????????" value="send_mail_check_date" />
                      <Workbook.Column label="???????????????" value="reject_date" />
                    </Workbook.Sheet>
                    <Workbook.Sheet data={sheet2} name="????????????">
                      <Workbook.Column label="????????????" value="mail_title" />
                      <Workbook.Column label="??????" value="memo" />
                      <Workbook.Column label="??????" value="count" />
                      <Workbook.Column label="?????? ??????" value="success" />
                      <Workbook.Column label="?????? ??????" value="fail" />
                      <Workbook.Column label="?????? ??????" value="check" />
                      <Workbook.Column label="?????? ??????" value="reject" />
                      <Workbook.Column label="????????????" value="send_date" />
                    </Workbook.Sheet>
                  </Workbook>
                </span>
              </li>
            </ul>
          </div>
          <div className="box list-receiver">
            <table id="tblSendList">
              <thead>
                <tr>
                  <th>????????????</th>
                  <th>??????</th>
                  <th>??????</th>
                  <th>???????????????</th>
                  <th>???????????????</th>
                </tr>
              </thead>
              <tbody id="listReceiver">
                {currentLists.map((currentLists, index) =>
                  <tr key={currentLists.send_result_id}>
                    <td>{currentLists.send_mail}</td>
                    <td>{currentLists.member_name}</td>
                    {currentLists.send_result_yn =='y' && <td>??????</td>}
                    {currentLists.send_result_yn =='r' && <td className='result_fail'>??????</td>}
                    {currentLists.send_result_yn =='n' && <td className='result_fail'>??????</td>}
                    {currentLists.send_result_yn ==undefined && <td>??????</td>}
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
                ??????
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
                ??????
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
