import React, { Fragment, useState, useEffect, useReducer, useRef } from "react";
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import axios from "axios";

let group_id = "";

function Reciever(props) {

  // initial states
  const [memberRows, setMemberRows] = useState([]);
  const [groupRows, setGroupRows] = useState([]);
  const [updateGroupRowsLog, setUpdateGroupLog] = useState([]);
  const [updateMemberMail, setUpdateMemberMail] = useState([]);
  const [updateMemberName, setUpdateMemberName] = useState([]);
  const [members, setMembers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [searchWord, setSearchWord] =useState("");
  const [loadingGroup, setLoadingGroup] = useState(false);
  const [loadingMember, setLoadingMember] = useState(false);
  const [deforesaveMember, setSaveMember] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [uploadFile, setUploadFile] = useState("");
  const [rows, setRows] = useState([])
  const [cols, setCols] = useState([])
  const [importData, setImportData] = useState([])

  // functions
  const _getMember = id => {
    // 멤버 초기리스트 호출 
    setLoadingMember(true);
    axios({
      method: 'get',
      url: '/MemberSearch.do',
      params: {
        groupID: id
      },
    })
    .then(res => {
      const data = res.data
      //console.log(data);
      setMembers(data);
      setLoadingMember(false);
      setSaveMember(false);
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
      url: '/GroupSearch.do'
    })
    .then(res => {
      const data = res.data;
      //console.log(data)
      setGroups(data);
      setLoadingGroup(false);
      setSaveMember(false);
      
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

  const memberSearch = id => e => {
    
    if(group_id===''|| id!=group_id){
      console.log(id+" , "+group_id);
      // 멤버 검색 (그룹 선택 | 멤버 검색어 엔터)
      if (e.target.id === '' || (e.target.id === 'searchMemberInput' && e.key === 'Enter')) {
        let result = true;
        if(deforesaveMember){
          result=confirm("저장이 되지않은 수정이력이 있습니다. 저장하지않고 조회하시겠습니까?");
        }
        if(result) {

          if (e.target.id === '') {
            document.getElementById("searchMemberInput").value = "";
            $("#chkAllMember").prop("checked", false);
            group_id = id;
          }
          
          setLoadingMember(true);
          axios({
            method: 'get',
            url: '/MemberSearch.do',
            params: {
              searchValue : searchWord,
              groupID: group_id
            },
            headers: { 'Content-Type': 'application/json; charset=utf-8' }
          })
          .then(res => {
            const data = res.data;
            //console.log(data.length)
            setMemberRows([]);
            setMembers([]);
            setMembers(data);
            setLoadingMember(false);
            setSaveMember(false);
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

  const inputName = id => e => {
    // 멤버 추가 Name onChange
    const { target: { value }} = e;
    const tempRows = memberRows.map(row => {
    if (row.id === id + 1) {
      row["name"] = value;
    } 
    return row;
    })
    setMemberRows(tempRows);
  }

  const inputEmail = id => e => {
    // 멤버 추가 Email onChange
    const { target: { value } } = e;
    const tempRows = memberRows.map(row => {
      if (row.id === id + 1) {
        row["email"] = value;
      }
      return row;
    })
    setMemberRows(tempRows);
  }

  const changeMember = id => e => {
    // 멤버 수정 onChange
    const { target: { value } } = e;
    if(e.target.name==="name"){
      const data = {
        id: id.member_id,
        member_name: value,
      }
    setUpdateMemberName([...updateMemberName, data]);
    }else {
      const data = {
        id: id.member_id,
        member_mail: value,
      }
    setUpdateMemberMail([...updateMemberMail, data]);
    }
    setSaveMember(true);
  } 

  const changeGroup = id => e => {
    // 그룹 수정 onChange
    const { target: {value}} = e;
    const data = {
      id: id,
      group_name: value,
    }
    setUpdateGroupLog([...updateGroupRowsLog, data]);
  }

  const addGroup = () => {
    // 그룹 추가
    const data = {
      id: groupRows.length + 1,
      group_name: ""
    }
    setGroupRows([...groupRows, data]); 
  }

  const addMember = () => {
    // 멤버 추가
    if (group_id!=''){
    const data = {
      id: memberRows.length + 1,
      name: "",
      email: "",
      group: group_id,
    }
    console.log(memberRows);
    setMemberRows([...memberRows, data]);
    setSaveMember(true);
    } else {
      alert('그룹을 선택하세요.');
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
        console.log("add group : " + groupRows[i].group_name);
        if (groupRows[i].group_name === "" || groupRows[i].group_name === " ") {
          alert("추가할 그룹명을 채워주세요.")
          return false;
        }
      }
      // validate for will update groups
      for (let i=0; i<updateGroupList.length; i++) {
        console.log("update group : " +updateGroupList.length+ ", "+updateGroupList[i].group_name);
        if (updateGroupList[i].group_name === "" || updateGroupList[i].group_name === " ") {
          alert("수정할 그룹명을 채워주세요.")
          return false;
        }
      }
      axios({
        method: 'post',
        url: '/GroupSave.do',
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
      alert("저장할 그룹내역이 없습니다.");
    }
  }

  const saveMember = () => {
    //멤버 저장
    const updateMemberNameList = Array.from(updateMemberName.reduce((m, t) => m.set(t.id,t), new Map()).values());
    const updateMemberMailList = Array.from(updateMemberMail.reduce((m, t) => m.set(t.id,t), new Map()).values());
    const updateMemberList = updateMemberNameList.concat(updateMemberMailList);
    let checkbox = $("input[name=chkMember]:checked");
    let delete_id="";
    
    for(let i=0;i<checkbox.length;i++){
      delete_id+=checkbox[i].id+',';
    }
    
    delete_id=delete_id.substring(0, delete_id.lastIndexOf(","));

    console.log($("#chkAllMember").prop("checked"));
    if (updateMemberList.length > 0 || memberRows.length > 0 || delete_id.length > 0) {
      let emailCompare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/;
      //console.log(memberRows)
      // validate for will add members
      for(let i=0; i<memberRows.length; i++) {
        //console.log("add member name : " + memberRows[i].name + "add member email : " + memberRows[i].email);
        if (memberRows[i].name === "" || memberRows[i].name === " ") {
          alert("추가할 멤버명을 채워주세요.")
          return false;
        }
        if (memberRows[i].email === "" || memberRows[i].email === " ") {
          alert("추가할 멤버의 메일주소를 채워주세요.")
          return false;
        } 
        if (!emailCompare.test(memberRows[i].email)) {
          alert("추가할 멤버 메일주소가 유효하지 않습니다.")
          return false;
        }
      }
      // validate for will update members
      
      for (let i = 0; i < updateMemberList.length; i++) {
        //console.log(updateMemberList);
        //console.log(`update member name : ${updateMemberList[i].member_name} update member email : ${updateMemberList[i].member_mail}`);
        if (updateMemberList[i].member_name === "" || updateMemberList[i].member_name === " ") {
          alert("수정할 멤버명을 채워주세요.")
          return false;
        }
        if (updateMemberList[i].member_mail === "" || updateMemberList[i].member_mail === " ") {
          alert("수정할 멤버의 메일주소를 채워주세요.")
          return false;
        }
        if (updateMemberList[i].member_name === undefined &&!emailCompare.test(updateMemberList[i].member_mail)) {
          //console.log(updateMemberList[i].member_mail);
          alert("수정할 멤버 메일주소가 유효하지 않습니다.")
          return false;
        }
      }
      axios({
        method: 'post',
        url: '/MemberSave.do',
        data: {
          insert: memberRows,
          update: updateMemberList,
          delete: delete_id
        },
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .then(res => {
        const data = res.data;
        setSaveMember(false);
        setMembers([]);
        setMemberRows([]);
        _getMember(group_id);
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

  const chkAllMember = e => {
    // 멤버 삭제 전체선택
    const { target: {value}} = e;
    if($("#chkAllMember").prop("checked")) { 
      $("input[name=chkMember]").prop("checked",true); 
    } else {
      $("input[name=chkMember]").prop("checked",false); 
    }
    setSaveMember(true);
  }
  const chkMember = e => {
    setSaveMember(true);
  }

  // data upload by sheet
  const _fileHandler = (event) => {
    if (group_id != '') {
      var extension = /(.*?)\.(xlsx)$/;
      let fileObj = event.target.files[0];
      let upFile = document.getElementById("upFile").value;
      let fileName = upFile.split("\\")[2].toLocaleLowerCase();

      if (!fileName.match(extension)) {
        alert("업로드할수 있는 파일형식은 ( .xlsx ) 확장만 가능합니다");
        return false;
      } else {
        setUploadFile(fileName);
        ExcelRenderer(fileObj, (err, resp) => {
          if (err) {
            console.log(err);
          } else {
            const { cols, rows } = resp;
            setDataLoaded(true);
            setRows(rows);
            setCols(cols);
  
            const dataArr = [];
            
            for(let i = 1; i < rows.length; i++) {
              const data = {
                id: i,
                name: rows[i][0],
                email: rows[i][1],
                group: group_id,
              }   
              dataArr.push(data);
            }
            setImportData(dataArr);
          }
        });
      }
    } else {
      event.preventDefault();
      alert('그룹을 선택하세요.');
      document.getElementById("upFile").value = "";
    }
  }

  const _saveImportedData = () => {
    let result = confirm("해당 데이터를 저장하시겠습니까?");
    let emailCompare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/;
    if(result) {
      for (let i = 0; i < importData.length; i++) {
        if (importData[i].name === undefined || importData[i].email === undefined) {
          alert("셀내 비어있는 값이 있습니다.");
          return false;
        } else if (!emailCompare.test(importData[i].email)) {
          alert("형식에 맞지 않는 이메일 내역이 있습니다.");
          return false;
        }
      }
      axios({
        method: 'post',
        url: '/MemberSave.do',
        data: {
          insert: importData,
        },
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      })
      .then(res => {
        const data = res.data;
        console.log(importData);
        setSaveMember(false);
        setMembers([]);
        setMemberRows([]);
        _getMember(group_id);
        _getGroup();
        alert("저장되었습니다.");
        setDataLoaded(false);
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      return false;  
    }
  }

  const _cancelImportFile = () => {
    setDataLoaded(false);
    setRows([]);
    setCols([]);
    setImportData([]);
    document.getElementById("upFile").value = "";
  }

  useEffect(() => {
    _getMember('');
    _getGroup();
  }, [props])

  return (
  <Fragment>
    <h2 className="page-title">
      수신인 관리
    </h2>

    <div className="receiver-management">

      {/* add group */}
      <div className="box group">
        <div className="top-line cf">
          <strong className="fl">그룹</strong>
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
          <table>
            <thead>
              <tr>
                <th>
                  삭제
                </th>
                <th>그룹명</th>
                <th>멤버수</th>
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
                  placeholder="그룹명" 
                  required />
                </td>
                <td></td>
              </tr>
              ))}
              {groups
              .sort((a, b) => b.group_name - a.group_name)
              .map(
              (groups, index) =>
                <tr className="tr-groups" key={groups.group_id} onClick={memberSearch(groups.group_id)}  data-attr={"tr-groups"+groups.group_id} >
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
                  <td>{groups.member_cnt}</td>
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
          <strong className="fl">멤버</strong>
          <div className="btn-wrap fr">
            <button type="button" className="btn btn-add" onClick={addMember}>추가</button>
            <button type="button" className="btn btn-save" onClick={saveMember}>저장</button>
          </div>
          <input
            id="searchMemberInput"
            className="fr"
            type="text"
            placeholder="검색"
            value={searchWord}
            onChange={e => setSearchWord(e.target.value)}
            onKeyPress={memberSearch()}
          />
        </div>
        <div id="uploadSheet">
            <label htmlFor="upFile" className="btn">
            Excel 업로드
            <input 
            type="file" 
            name="upFile" 
            id="upFile" 
            onChange={_fileHandler.bind(this)}
            />
          </label>
        </div>
        <form>
          {loadingMember === true ? (
            <div className="loading-indicator members">
              <div className="loader"></div>
            </div>
          ):(
          <table>
            <thead>
              <tr>
                <th>
                  삭제
                  <input type="checkbox" name="chkAllMember" id="chkAllMember" onClick={chkAllMember}/>
                </th>
                <th>이름</th>
                <th>메일주소</th>
                <th>그룹</th>
                <th>수신거부일</th>
              </tr>
            </thead>
            <tbody id="memberTbl">
              {memberRows.map((d, index) => (
                <tr className="tr-members created" key={index}>
                <td></td>
                <td>
                  <input 
                  className="member-name"
                  type="text" 
                  defaultValue={d.name} 
                  onChange={inputName(index)} 
                  placeholder="이름"/>
                </td>
                <td>
                  <input 
                  className="member-mail"
                  type="text" 
                  defaultValue={d.email} 
                  onChange={inputEmail(index)} 
                  placeholder="이메일"/>
                </td>
                <td></td>
                <td></td>
              </tr>
              ))}
              {members
              .sort((a, b) => b.member_name - a.member_name)
              .map((members, index) =>
              <tr className="tr-members" key={index}>
                <td>
                  <input type="checkbox" name="chkMember" id={members.member_id} onClick={chkMember}/>
                </td>
                <td>
                  <input 
                  className="member-name"
                  type="text" 
                  defaultValue={members.member_name} 
                  name="name" 
                  onChange={changeMember(members)} />
                </td>
                <td>
                  <input 
                  className="member-mail"
                  type="text" 
                  defaultValue={members.member_mail} 
                  name="mail" 
                  onChange={changeMember(members)} />
                </td>   
                <td>{members.group_name}</td>             
                {members.rejection_date === undefined ? (<td></td>) 
                : 
                (
                <td>{members.rejection_date.split(" ")[0]}</td>
                )}
              </tr>
              )}
            </tbody>
          </table>
          )}
        </form>
      </div>
      {/* end add member */}
    </div>
    {dataLoaded === false ? (""):(
    <div id="overLay">
      <div id="modalWrap">
        <h3>
          *<strong>( 주의 )</strong> 업로드 시트파일은 <em>첫번째 열</em>에 저장할 데이터 <em>컬럼명을</em> 필요로합니다,<br/>
          그렇지 않을경우 정상적으로 업로드되지 않을수있습니다.<br />
          <a href="http://52.79.249.132/sample.xlsx" download>샘플시트 다운로드</a>
        </h3>
        <h4>파일명 : {uploadFile}</h4>
        <OutTable
        data={rows} 
        columns={cols} 
        tableClassName="imported-sheet" 
        tableHeaderRowClass="heading" 
        />
        <div className="btn-wrap">
          <button onClick={_saveImportedData} className="btn btn-save" type="button">바로저장</button>
          <button onClick={_cancelImportFile} className="btn btn-del" type="button">취소</button>
        </div>
      </div>
    </div>
    )}
  </Fragment>
  )
}

export default Reciever;