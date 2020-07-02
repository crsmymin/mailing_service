import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";


function Reciever(props) {
  
  const [memberRows, setMemberRows] = useState([]);
  const [groupRows, setGroupRows] = useState([]);
  const [isCheck, setIsCheck] =useState(false);
  const [isAllCheck, setIsAllCheck] =useState(false);
  const [name, setName] = useState();

  const inputGroup = id => e => {
    const { target: {value}} = e;
    const tempRows = groupRows.map(row=> {
      if(row.id === id + 1) { 
        row["group"] = value; 
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

  const selectGroup = id => e => {
    const { target: { value } } = e;
    const tempRows = memberRows.map(row => {
      if (row.id === id + 1) {
        row["group"] = value;
      }
      return row;
    })
    setMemberRows(tempRows);
  }

  const addGroup = () => {
    const data = {
      id: groupRows.length + 1,
      group: ""
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
    
  }

  const saveMember = () => {
    
  }
  
  const membrtSearch = (e) =>{
    if(e.key === "Enter"){
      axios({
      method: 'get',
      url: '/MemberSearch.do',
      params: { searchValue:  document.getElementById("searchMemberInput").value},
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    })
      .then(res => {
        const data = res.data;
        console.log(data)
        setPosts(data);
      })
      .catch(error => {
        console.log(error)
      })
    }
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
                    <td><input type="text" defaultValue={d.name} onChange={inputGroup(index)} /></td>
                    <td></td>
                  </tr>
                ))}
                {props.groups.map(
                  (groups, index) =>
                    <tr key={index}>
                      <td>
                        <input type="checkbox" 
                        name="chkGroup" 
                        id={"chkGroup" + (index + 1)} 
                        />
                      </td>
                      <td><input type="text" defaultValue={groups.group_name} /></td>
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
            <input id="searchMemberInput" className="fr" type="text" placeholder="검색" onKeyPress={membrtSearch}/>
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
                {props.members.map(
                  (members, index) =>
                    <tr key={index}>
                      <td>
                        <input 
                        type="checkbox" 
                        name="chkMember" 
                        id={"chkMember" + (index + 1)} />
                      </td>
                      <td><input type="text" defaultValue={members.member_name} /></td>
                      <td><input type="text" defaultValue={members.member_mail} /></td>
                      
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