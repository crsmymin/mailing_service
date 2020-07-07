import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

function Reciever(props) {
  const [members, setMembers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [memberRows, setMemberRows] = useState([]);
  const [groupRows, setGroupRows] = useState([]);
  const [updateGroupRowsLog, setUpdateGroupLog] = useState([]);
  const [updateMemberMail, setUpdateMemberMail] = useState([]);
  const [updateMemberName, setUpdateMemberName] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const [isAllCheck, setIsAllCheck] = useState(false);
  const [loading, setLoading] = useState(false);

  const _getMember = () => {
    setLoading(true);
    axios({
      method: 'get',
      url: '/MemberSearch.do'
     })
    .then(res => {
      const data = res.data
      console.log(data);
      setMembers(data);
      setLoading(false);
    })
    .catch(error => {
      console.log(error)
    })
  }

  const _memberSearch = e => {
  if (e.key === 'Enter') {
    setLoading(true);
    console.log(searchWord);
    axios({
      method: 'get',
      url: '/MemberSearch.do',
      params: {
      searchValue: searchWord,
      },
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
    .then(res => {
      const data = res.data;
      console.log(data)
      setMembers([])
      setMembers(data);
      setLoading(false);
    })
    .catch(error => {
      console.log(error)
    })
    }
  }

  const _getGroup = () => {
    setLoading(true);
    axios({
      method: 'get',
      url: '/GroupSearch.do'
    })
    .then(res => {
      const data = res.data;
      console.log(data)
      setGroups(data);
      setLoading(false);
    })
    .catch(error => {
      console.log(error)
    })
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
    console.log(updateGroupList.length > 0 || groupRows.length > 0)
    if (updateGroupList.length > 0 || groupRows.length > 0) {
      axios({
        method: 'post',
        url: '/GroupSave.do',
        data: {insert: groupRows,
               update: updateGroupList},
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      })
      .then(res => {
        const data = res.data;
        console.log(data)
        alert("저장되었습니다.")
        _getGroup([]);
        _getGroup();
      })
      .catch(error => {
        console.log(error)
      })
    } else {
      alert("추가나 수정된 항목이 없습니다.");
    }
  }

  const saveMember = () => {
    const updateMemberNameList = Array.from(updateMemberName.reduce((m, t) => m.set(t.id,t), new Map()).values());
    const updateMemberMailList = Array.from(updateMemberMail.reduce((m, t) => m.set(t.id,t), new Map()).values());
    
    const updateMemberList = updateMemberNameList.concat(updateMemberMailList);
    console.log(updateMemberList);

    axios({
      method: 'post',
      url: '/MemberSave.do',
      data: {insert: memberRows,
              update: updateMemberList},
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })
    .then(res => {
      const data = res.data;
      console.log(data)
      if(data>1){
        alert("ok");
      }
    })
    .catch(error => {
      console.log(error)
    })
  }

  useEffect(() => {
    console.log(isCheck);
    console.log(isAllCheck);
    _getGroup();
    _getMember();
  },[])

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
              <tr key={index}>
                <td colSpan="3">
                  <input 
                  className="group-name" 
                  type="text" 
                  defaultValue={d.group_name} 
                  onChange={inputGroup(index)}
                  placeholder="그룹명" 
                  required />
                </td>
              </tr>
              ))}
              {groups
              .sort((a, b) => b.group_id - a.group_id)
              .map((groups, index) =>
              <tr key={index}>
                <td>
                  <input type="checkbox" name="chkGroup" id={groups.group_id} />
                </td>
                <td>
                  <input 
                  className="group-name"
                  type="text" 
                  defaultValue={groups.group_name} 
                  onChange={changeGroup(groups.group_id)} 
                  required />
                </td>
                <td>{groups.member_cnt}</td>
              </tr>
              )}
            </tbody>
          </table>
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
            onKeyPress={_memberSearch}
          />
        </div>
        <form>
          <table>
            <thead>
              <tr>
                <th>
                  삭제
                  <input type="checkbox" name="chkAllMember" id="chkAllMember" />
                </th>
                <th>이름</th>
                <th>메일주소</th>
                <th>수신거부일</th>
              </tr>
            </thead>
            <tbody id="memberTbl">
              {memberRows.map((d, index) => (
              <tr key={index}>
                <td colSpan="2">
                  <input 
                  type="text" 
                  defaultValue={d.name} 
                  onChange={inputName(index)} 
                  placeholder="이름"/>
                </td>
                <td colSpan="2">
                  <input 
                  type="text" 
                  defaultValue={d.email} 
                  onChange={inputEmail(index)} 
                  placeholder="이메일"/>
                </td>
              </tr>
              ))}
              {members
              .sort((a, b) => b.member_id - a.member_id)
              .map((members, index) =>
              <tr key={index}>
                <td>
                  <input type="checkbox" name="chkMember" id={"chkMember" + members.member_id} />
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
                <td>{members.rejection_date}</td>
              </tr>
              )}
            </tbody>
          </table>
        </form>
      </div>
      {/* end add member */}
    </div>
  </Fragment>
  )
}

export default Reciever;