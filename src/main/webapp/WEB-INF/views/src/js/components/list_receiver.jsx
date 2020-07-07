import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";


function Reciever(props) {
  
  const [memberRows, setMemberRows] = useState([]);
  const [groupRows, setGroupRows] = useState([]);
  const [isCheck, setIsCheck] = useState(false);
  const [isAllCheck, setIsAllCheck] = useState(false);
  const [updateGroupRowsLog, setUpdateGroupLog] = useState([]);
  const [updateMemberMail, setUpdateMemberMail] = useState([]);
  const [updateMemberName, setUpdateMemberName] = useState([]);


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

  const changeMember= id => e => {
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
  const selectGroup = id => e => {
    const { target: { value } } = e;
    const tempRows = memberRows.map(row => {
      if (row.id === id + 1) {
        row["group_name"] = value;
      }
      return row;
    })
    setMemberRows(tempRows);
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
      if(data>1){
        alert("ok");
      }
    })
    .catch(error => {
      console.log(error)
    })
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
                    <td></td>
                    <td><input type="text" defaultValue={d.group_name} onChange={inputGroup(index)} /></td>
                    <td></td>
                  </tr>
                ))}
                {props.groups.map(
                  (groups, index) =>
                    <tr key={index}>
                      <td>
                        <input type="checkbox" 
                        name="chkGroup" 
                        id={groups.group_id}
                        />
                      </td>
                      <td><input type="text" defaultValue={groups.group_name} onChange={changeGroup(groups.group_id)}/></td>
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
            onKeyPress={props.memberSearch} 
            />
          </div>
          <form>
            <table>
              <thead>
                <tr>
                  <th>
                    삭제 
                    <input 
                    type="checkbox" 
                    name="chkAllMember" 
                    id="chkAllMember" />
                  </th>
                  <th>이름</th>
                  <th>메일주소</th>
                  <th>수신거부일</th>
                </tr>
              </thead>
              <tbody id="memberTbl">
                {memberRows.map((d, index) => (
                  <tr key={index}>
                    <td></td>
                    <td><input type="text" defaultValue={d.name} onChange={inputName(index)} /></td>
                    <td><input type="text" defaultValue={d.email} onChange={inputEmail(index)} /></td>
                    <td></td>
                  </tr>
                ))}
                {props.members.map((members, index) => 
                  props.members.length === 0 ?
                  (<tr><td colSpan="4">일치하는 결과가 없습니다.</td></tr>)
                  :
                  (<tr key={members.member_id}>
                    <td>
                      <input
                        type="checkbox"
                        name="chkMember"
                        id={members.member_id}/>
                    </td>
                    <td><input type="text" defaultValue={members.member_name} name="name" onChange={changeMember(members)}/></td>
                    <td><input type="text" defaultValue={members.member_mail} name="mail" onChange={changeMember(members)}/></td>
                    <td>{members.rejection_date}</td>
                  </tr>)  
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