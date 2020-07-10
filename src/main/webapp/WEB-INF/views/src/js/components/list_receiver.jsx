import React, { Fragment, useState, useEffect, useReducer, useRef } from "react";
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
    })
    .catch(error => {
      console.log(error)
    })
  }

  const memberSearch = id => e => {
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
    setMemberRows([...memberRows, data]);
    setSaveMember(true);
    }else{
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
        //console.log("add group : " + groupRows[i].group_name);
        if (groupRows[i].group_name === "" || groupRows[i].group_name === " ") {
          alert("추가할 그룹명을 채워주세요.")
          return false;
        }
      }
      // validate for will update groups
      for (let i=0; updateGroupList.length; i++) {
        //console.log("update group : " + updateGroupList[i].group_name);
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
        setGroups([]);
        setGroupRows([]);
        alert("저장되었습니다.");
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

    if (updateMemberList.length > 0 || memberRows.length > 0) {
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
        console.log(updateMemberList);
        console.log(`update member name : ${updateMemberList[i].member_name} update member email : ${updateMemberList[i].member_mail}`);
        if (updateMemberList[i].member_name === "" || updateMemberList[i].member_name === " ") {
          alert("수정할 멤버명을 채워주세요.")
          return false;
        }
        if (updateMemberList[i].member_mail === "" || updateMemberList[i].member_mail === " ") {
          alert("수정할 멤버의 메일주소를 채워주세요.")
          return false;
        }
        if (!emailCompare.test(updateMemberList[i].member_mail)) {
          console.log(updateMemberList[i].member_mail);
          alert("수정할 멤버 메일주소가 유효하지 않습니다.")
          return false;
        }
      }
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
                <tr className="tr-groups" key={groups.group_id} onClick={memberSearch(groups.group_id)} >
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
  </Fragment>
  )
}

export default Reciever;