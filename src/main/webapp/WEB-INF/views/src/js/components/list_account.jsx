import React, { Fragment, useState, useEffect, useReducer, useRef } from "react";
// import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import axios from "axios";

let group_id = "";

function AccountList(props) {

  // initial states
   const [accountRows, setAccountRows] = useState([]);
   const [groupRows, setGroupRows] = useState([]);
   const [updateGroupRowsLog, setUpdateGroupLog] = useState([]);
   const [updateID, setUpdateID] = useState([]);
   const [updatePW, setUpdatePW] = useState([]);
   const [account, setAccount] = useState([]);
   const [groups, setGroups] = useState([]);
   const [loadingGroup, setLoadingGroup] = useState(false);
   const [loadingAccount, setLoadingAccount] = useState(false);
   const [deforesaveAccount, setSaveAccount] = useState(false);
   const [rows, setRows] = useState([])
   const [cols, setCols] = useState([])

   const _getAccount = id => {
       setLoadingAccount(true);
     axios({
       method: 'get',
       url: '/AccountSearch.do',
       params: {
         groupID: id
       },
     })
     .then(res => {
       const data = res.data
       //console.log(data);
       setAccount(data);
       setLoadingAccount(false);
       setSaveAccount(false);
     })
     .catch(error => {
       console.log(error)
     })
   }

   const _getGroup = () => {
     // 그룹 초기리스트 호출 
     setLoadingGroup(true);
     axios({
       method: 'get',
       url: '/AccountGroupSearch.do'
     })
     .then(res => {
       const data = res.data;
       //console.log(data)
       setGroups(data);
       setLoadingGroup(false);
       setSaveAccount(false);
      
       let tableRowGroups = document.querySelectorAll(".tr-groups");
       for (let i = 0; i < tableRowGroups.length; i++) {
        tableRowGroups[i].addEventListener("click", function () {
           //console.log(this);
           for (let j = 0; j < tableRowGroups.length; j++) {
             tableRowGroups[j].classList.remove("selected");
           }
           this.classList.add("selected");
         })
       }
       $("[data-attr=tr-groups"+group_id+"]").addClass("selected");
     })
     .catch(error => {
       console.log(error)
     })
   }

   const accountSearch = id => e => {
    
     if(group_id===''|| id!=group_id){
       // 멤버 검색 (그룹 선택 | 멤버 검색어 엔터)
       if (e.target.id === '') {
         let result = true;
         if(deforesaveAccount){
           result=confirm("저장이 되지않은 수정이력이 있습니다. 저장하지않고 조회하시겠습니까?");
         }
         if(result) {

           if (e.target.id === '') {
             $("#chkAllAccount").prop("checked", false);
             group_id = id;
           }
          
           setLoadingAccount(true);
           axios({
             method: 'get',
             url: '/AccountSearch.do',
             params: {
               groupID: group_id
             },
             headers: { 'Content-Type': 'application/json; charset=utf-8' }
           })
           .then(res => {
             const data = res.data;
             //console.log(data.length)
             setAccountRows([]);
             setAccount([]);
             setAccount(data);
             setLoadingAccount(false);
             setSaveAccount(false);
           })
           .catch(error => {
             console.log(error)
           })
         }
       }
     }
   }

   const inputGroup = id => e => {
     // 그룹 추가 onChange
     const { target: {value}} = e;
     const tempRows = groupRows.map(row=> {
     if(row.id === id + 1) {
       row["group_name"] = value;
     }
     return row;
     })
     setGroupRows(tempRows);
   }

   const inputID = id => e => {
     const { target: { value }} = e;
     console.log(accountRows);
     const tempRows = accountRows.map(row => {
        
     if (row.account_id === id + 1) {
       row["id"] = value;
     } 
     return row;
     })
     setAccountRows(tempRows);
   }

   const inputPW = id => e => {
     const { target: { value } } = e;
     const tempRows = accountRows.map(row => {
       if (row.account_id === id + 1) {
         row["password"] = value;
       }
       return row;
     })
     setAccountRows(tempRows);
   }

   const changeAccount = id => e => {
     const { target: { value } } = e;
     if(e.target.name==="id"){
       const data = {
        account_id: id.account_id,
         id: value,
       }
     setUpdateID([...updateID, data]);
     }else {
       const data = {
        account_id: id.account_id,
         password: value,
       }
     setUpdatePW([...updatePW, data]);
     }
     setSaveAccount(true);
   } 

   const changeGroup = id => e => {
     const { target: {value}} = e;
     const data = {
       id: id,
       group_name: value,
     }
     setUpdateGroupLog([...updateGroupRowsLog, data]);
   }

   const addGroup = () => {
     const data = {
       id: groupRows.length + 1,
       group_name: ""
     }
     setGroupRows([...groupRows, data]); 
   }

   const addAccount = () => {
     if (group_id!=''){
     const data = {
       account_id: accountRows.length + 1,
       id: "",
       password: "",
       group: group_id,
     }
     setAccountRows([...accountRows, data]);
     setSaveAccount(true);
     } else {
       alert('업체를 선택하세요.');
     }
   }

   const saveGroup = () => {
     // 그룹 저장
     const updateGroupList = Array.from(updateGroupRowsLog.reduce((m, t) => m.set(t.id, t), new Map()).values());
     //console.log(updateGroupList.length > 0 || groupRows.length > 0)
     let checkbox = $("input[name=chkGroup]:checked");
     let delete_id="";
    
     for(let i=0;i<checkbox.length;i++){
       delete_id+=checkbox[i].id+',';
     }
    
     delete_id=delete_id.substring(0, delete_id.lastIndexOf(","));

     if (updateGroupList.length > 0 || groupRows.length > 0 || delete_id.length > 0) {
       // validate for will add groups
       for(let i=0; i<groupRows.length; i++) {
         if (groupRows[i].group_name === "" || groupRows[i].group_name === " ") {
           alert("추가할 업체명을 채워주세요.")
           return false;
         }
       }
       // validate for will update groups
       for (let i=0; i<updateGroupList.length; i++) {
         if (updateGroupList[i].group_name === "" || updateGroupList[i].group_name === " ") {
           alert("수정할 업체명을 채워주세요.")
           return false;
         }
       }
       axios({
         method: 'post',
         url: '/AccountGroupSave.do',
         data: {
           insert: groupRows,
           update: updateGroupList,
           delete: delete_id
         },
         headers: { 'Content-Type': 'application/json; charset=utf-8' }
       })
       .then(res => {
         const data = res.data;
         //console.log(data);
         alert("저장되었습니다.");
         setGroups([]);
         setGroupRows([]);
         _getGroup();
       })
       .catch(error => {
         console.log(error)
       })
     } else {
       alert("저장할 내역이 없습니다.");
     }
   }

   const saveAccount = () => {
     const updateIdList = Array.from(updateID.reduce((m, t) => m.set(t.account_id,t), new Map()).values());
     const updatePwList = Array.from(updatePW.reduce((m, t) => m.set(t.account_id,t), new Map()).values());
     const updateAccountList = updateIdList.concat(updatePwList);
     let checkbox = $("input[name=chkAccount]:checked");
     let delete_id="";
    
     for(let i=0;i<checkbox.length;i++){
       delete_id+=checkbox[i].id+',';
     }
    
     delete_id=delete_id.substring(0, delete_id.lastIndexOf(","));
     if (updateAccountList.length > 0 || accountRows.length > 0 || delete_id.length > 0) {
        // validate for will add members
       for(let i=0; i<accountRows.length; i++) {
         //console.log("add member name : " + memberRows[i].name + "add member email : " + memberRows[i].email);
         if (accountRows[i].id === "" || accountRows[i].id === " ") {
           alert("추가할 ID를 채워주세요.")
           return false;
         }
         if (accountRows[i].pw === "" || accountRows[i].pw === " ") {
           alert("추가할 Password를 채워주세요.")
           return false;
         } 
       }
       for (let i = 0; i < updateAccountList.length; i++) {
       
         if (updateAccountList[i].id === "" || updateAccountList[i].id === " ") {
           alert("수정할 ID를 채워주세요.")
           return false;
         }
         if (updateAccountList[i].password === "" || updateAccountList[i].password === " ") {
           alert("수정할 Password를 채워주세요.")
           return false;
         }
       }
       console.log(updateAccountList);
       
       axios({
         method: 'post',
         url: '/AccountSave.do',
         data: {
           insert: accountRows,
           update: updateAccountList,
           delete: delete_id
         },
         headers: {
           'Content-Type': 'application/json; charset=utf-8'
         }
       })
       .then(res => {
         const data = res.data;
         setSaveAccount(false);
         setAccount([]);
         setAccountRows([]);
         _getAccount(group_id);
         _getGroup();
         alert("저장되었습니다.");
       })
       .catch(error => {
         console.log(error)
       })
     } else {
       alert("저장할 멤버내역이 없습니다.");
     }
   }

   const chkAllAccount = e => {
     const { target: {value}} = e;
     if($("#chkAllAccount").prop("checked")) { 
       $("input[name=chkAccount]").prop("checked",true); 
     } else {
       $("input[name=chkAccount]").prop("checked",false); 
     }
     setSaveAccount(true);
   }
   const chkAccount = e => {
     setSaveAccount(true);
   }

  useEffect(() => {
     _getAccount('');
     _getGroup();
  }, [props])

  return (
  <Fragment>
    <h2 className="page-title">
      계정 관리
    </h2>
    <div className="receiver-management">
    {/* add group */}
    <div className="box group">
    <div className="top-line cf">
        <strong className="fl">업체</strong>
        <div className="btn-wrap fr">
        <button type="button" className="btn btn-add" onClick={addGroup}>추가</button>
        <button type="button" className="btn btn-save" onClick={saveGroup}>저장</button>
        </div>
    </div>
    <form>
    {loadingGroup === true ? 
          ( <div className="loading-indicator groups">
            <div className="loader"></div>
          </div> ):
          (
        <table className="account">
        <thead>
            <tr>
            <th>
                삭제
            </th>
            <th>업체명</th>
            <th>계정수</th>
            </tr>
        </thead>
        <tbody id="groupTbl">
            {groupRows.map((d, index) => (
              <tr className="tr-groups created" key={index}>
                <td></td>
                <td>
                  <input 
                  className="group-name" 
                  type="text" 
                  defaultValue={d.group_name} 
                  onChange={inputGroup(index)}
                  placeholder="업체명" 
                  required />
                </td>
                <td></td>
              </tr>
              ))}
              {groups
              .sort((a, b) => b.group_name - a.group_name)
              .map(
              (groups, index) =>
                <tr className="tr-groups" key={groups.group_id} onClick={accountSearch(groups.group_id)}  data-attr={"tr-groups"+groups.group_id} >
                  <td>
                    <input 
                    type="checkbox"
                    name="chkGroup"
                    id={groups.group_id}
                    data-attr={groups.group_id}
                    />
                  </td>
                  <td>
                    <input 
                    className="group-name"
                    type="text" 
                    defaultValue={groups.group_name} 
                    onChange={changeGroup(groups.group_id)} 
                    />
                    </td>
                  <td>{groups.account_cnt}</td>
                </tr>
              )}
        </tbody>
        </table>
         )}
    </form>
    </div>
    {/* end add group */}

    {/* add member */}
    <div className="box member">
    <div className="top-line cf">
        <strong className="fl">계정</strong>
        <div className="btn-wrap fr">
        <button type="button" className="btn btn-add" onClick={addAccount}>추가</button>
        <button type="button" className="btn btn-save" onClick={saveAccount}>저장</button>
        </div>
    </div>
    <form>
        {loadingAccount === true ? (
            <div className="loading-indicator members">
              <div className="loader"></div>
            </div>
          ):(
        <table>
        <thead>
            <tr>
            <th>
                삭제
                <input type="checkbox" name="chkAllAccount" id="chkAllAccount" onClick={chkAllAccount}/>
            </th>
            <th>ID</th>
            <th>PASSWORD</th>
            <th>업체명</th>
            <th>등록일</th>
            </tr>
        </thead>
        <tbody id="accountTbl">
            {accountRows.map((d, index) => (
                <tr className="tr-members created" key={index}>
                <td></td>
                <td>
                  <input 
                  className="member-name"
                  type="text" 
                  defaultValue={d.id} 
                  onChange={inputID(index)} 
                  placeholder="id"/>
                </td>
                <td>
                  <input 
                  className="member-mail"
                  type="password" 
                  defaultValue={d.password} 
                  onChange={inputPW(index)} 
                  placeholder="password"/>
                </td>
                <td></td>
                <td></td>
              </tr>
              ))}
              {account
              .sort((a, b) => b.id - a.id)
              .map((account, index) =>
              <tr className="tr-members" key={index}>
                <td>
                  <input type="checkbox" name="chkAccount" id={account.account_id} onClick={chkAccount}/>
                </td>
                <td>
                  <input 
                  className="member-name"
                  type="text" 
                  defaultValue={account.id} 
                  name="id" 
                  onChange={changeAccount(account)} />
                </td>
                <td>
                  <input 
                  className="member-mail"
                  type="password" 
                  defaultValue={account.password} 
                  name="password" 
                  onChange={changeAccount(account)} />
                </td>   
                <td>{account.group_name} 
                </td>   
                <td>{account.req_date.split(" ")[0]} 
                </td>   
              </tr>
              )}
        </tbody>
        </table>
        )}
    </form>
    </div>
    {/* end add member */}
    </div>
  </Fragment>
  )
}

export default AccountList;