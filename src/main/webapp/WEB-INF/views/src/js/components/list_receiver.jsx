import React, { Fragment, useState, useEffect } from "react";
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
  const [searchCnt, setSearchCnt] =useState("");
  const [loadingGroup, setLoadingGroup] = useState(false);
  const [loadingMember, setLoadingMember] = useState(false);
  const [selectGroup, setSelectGroup] = useState();

  // functions
  const _getMember = () => {
    setLoadingMember(true);
    axios({
      method: 'get',
      url: '/MemberSearch.do'
    })
    .then(res => {
      const data = res.data
      console.log(data);
      setMembers(data);
      setLoadingMember(false);
    })
    .catch(error => {
      console.log(error)
    })
  }

  const _getGroup = () => {
    setLoadingGroup(true);
    axios({
      method: 'get',
      url: '/GroupSearch.do'
    })
    .then(res => {
      const data = res.data;
      console.log(data)
      setGroups(data);
      setLoadingGroup(false);
    })
    .catch(error => {
      console.log(error)
    })
  }

  const memberSearch = id => e => {
    if (e.target.id === '') {
      document.getElementById("searchMemberInput").value = "";
      $("#chkAllMember").prop("checked", false);
      group_id = id;
      console.log("group_id");
    }
    console.log("group_id: " + group_id);
    if (e.target.id === '' || (e.target.id === 'searchMemberInput' && e.key === 'Enter')) {
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
        console.log(data.length)
        setMembers([]);
        setSearchCnt(data.length);
        setMembers(data);
        setLoadingMember(false);
      })
      .catch(error => {
        console.log(error)
      })
    }
  }

  const inputGroup = id => e => {
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
    const { target: { value } } = e;
    var member_name=id.member_name;
    var member_mail=id.member_mail;

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

  const addMember = () => {
  const data = {
    id: memberRows.length + 1,
    name: "",
    email: "",
    group: "1",
  }
    setMemberRows([...memberRows, data]);
  }

  const saveGroup = () => {
    const updateGroupList = Array.from(updateGroupRowsLog.reduce((m, t) => m.set(t.id, t), new Map()).values());
    //console.log(updateGroupList.length > 0 || groupRows.length > 0)
    var checkbox = $("input[name=chkGroup]:checked");
    var delete_id="";
    for(var i=0;i<checkbox.length;i++){
      delete_id+=checkbox[i].id+',';
    }
    delete_id=delete_id.substring(0, delete_id.lastIndexOf(","));
      
    if (updateGroupList.length > 0 || groupRows.length > 0  ||delete_id.length > 0) {
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
        console.log(data)
        alert("저장되었습니다.")
        window.location.reload();
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      alert("추가나 수정된 '그룹'항목이 없습니다.");
    }
  }

  const saveMember = () => {
    const updateMemberNameList = Array.from(updateMemberName.reduce((m, t) => m.set(t.id,t), new Map()).values());
    const updateMemberMailList = Array.from(updateMemberMail.reduce((m, t) => m.set(t.id,t), new Map()).values());
    
    const updateMemberList = updateMemberNameList.concat(updateMemberMailList);
    console.log(updateMemberList);
    console.log(memberRows);
    if (updateMemberList.length > 0 || memberRows.length > 0) {
      axios({
        method: 'post',
        url: '/MemberSave.do',
        data: {
          insert: memberRows,      
          update: updateMemberList
        },
        headers: { 
          'Content-Type': 'application/json; charset=utf-8' 
        }
      })
      .then(res => {
        const data = res.data;
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      alert("추가되거나 수정된 '멤버'항목이 없습니다.")
    }
  }

  const chkAllMember = e => {
    const { target: {value}} = e;
    console.log(value)
    if($("#chkAllMember").prop("checked")) { //해당화면에 전체 checkbox들을 체크해준다 
      
      $("input[name=chkMember]").prop("checked",true); // 전체선택 체크박스가 해제된 경우 
    } else { //해당화면에 모든 checkbox들의 체크를해제시킨다. 
      $("input[name=chkMember]").prop("checked",false); }
  }

  useEffect(() => {
    _getMember();
    _getGroup();

    let tableRowGroups = document.querySelectorAll(".tr-groups");
    for(let i=0; i<tableRowGroups.length; i++) {
      tableRowGroups[i].addEventListener("click", function(){
        for(let j=0; j<tableRowGroups.length; j++) {
          tableRowGroups[j].classList.remove("selected");
        }
        this.classList.add("selected");
      })
    }
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
              <tr className="tr-groups" key={index}>
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
                <tr className="tr-groups" key={groups.group_id} onClick={memberSearch(groups.group_id)} >
                  <td>
                    <input type="checkbox"
                      name="chkGroup"
                      id={groups.group_id}
                    />
                  </td>
                  <td><input type="text" defaultValue={groups.group_name} onChange={changeGroup(groups.group_id)} /></td>
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
                <th>수신거부일</th>
              </tr>
            </thead>
            <tbody id="memberTbl">
              {memberRows.map((d, index) => (
              <tr className="tr-members" key={index}>
                <td></td>
                <td>
                  <input 
                  type="text" 
                  defaultValue={d.name} 
                  onChange={inputName(index)} 
                  placeholder="이름"/>
                </td>
                <td>
                  <input 
                  type="text" 
                  defaultValue={d.email} 
                  onChange={inputEmail(index)} 
                  placeholder="이메일"/>
                </td>
                <td></td>
              </tr>
              ))}
              {members
              .sort((a, b) => b.member_name - a.member_name)
              .map((members, index) =>
              <tr className="tr-members" key={index}>
                <td>
                  <input type="checkbox" name="chkMember" id={members.member_id} />
                </td>
                <td>
                  <input type="text" 
                  defaultValue={members.member_name} 
                  name="name" 
                  onChange={changeMember(members)} />
                </td>
                <td>
                  <input type="text" 
                  defaultValue={members.member_mail} 
                  name="mail" 
                  onChange={changeMember(members)} />
                </td>                
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
  </Fragment>
  )
}

export default Reciever;