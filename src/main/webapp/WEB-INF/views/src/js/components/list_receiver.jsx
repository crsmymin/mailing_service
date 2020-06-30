import React, { Fragment, useState, useEffect } from "react";

function Reciever(props) {
  
  const [memberRows, setMemberRows] = useState([]);
  const [groupRows, setGroupRows] = useState([]);
  
  const changeTextG = id => e => {
    const {
      target: {value}
    } = e;
    const tempRows = groupRows.map(row=> {
      if(row.id === id + 1) {
        row["group"] = value;
      }
      return row;
    })
    setGroupRows(tempRows);
    console.log(tempRows);
  }  

  const changeTextM = id => e => {
    const {
      target: { value }
    } = e;
    const tempRows = memberRows.map(row => {
      if (row.id === id + 1) {
        row["member"] = value;
      }
      return row;
    })
    setMemberRows(tempRows);
  }  

  const addGroup = () => {
    console.log("add group row")
    let data = {
      id: groupRows.length + 1,
      name: ""
    }
    setGroupRows([...groupRows, data]);
  }

  const addMember = () => {
    console.log("add member row")
    let data = {
      id: memberRows.length + 1,
      name: "",
      email: "",
      group: "",
    }
    setMemberRows([...memberRows, data]);
  }

  const saveGroup = () => {
    // let tbl = document.getElementById("groupTbl");
    // let rows = document.getElementById("groupTbl").getElementsByTagName("tr");
    // for(let i=0; i < rows; i++) {
    //   if (tbl.rows[i].cells[1].children[0].value == " ") {
    //     alert("그룹명은 필수입니다.");
    //     return false;
    //   }
    // }
  }

  const saveMember = () => {
    let rows = document.getElementById("groupTbl").getElementsByTagName("tr");
  }
  
  useEffect(() => {
    
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
            <input id="searchGroupInput" className="fr" type="text" placeholder="그룹 검색" />
          </div>
          <form>
            <table>
              <thead>
                <tr>
                  <th>삭제 <input type="checkbox" name="chkAllGroup" id="chkAllGroup" /></th>
                  <th>그룹명</th>
                  <th>멤버수</th>
                </tr>
              </thead>
              <tbody id="groupTbl">
                {groupRows.map((d, index) => (
                  <tr key={index}>
                    <td></td>
                    <td><input type="text" defaultValue={d.name} onChange={changeTextG(index)} /></td>
                    <td></td>
                  </tr>
                ))}
                {props.posts.map(
                  (posts, index) =>
                    <tr key={index}>
                      <td>삭제 <input type="checkbox" name="chkGroup" id={"chkGroup" + (index + 1)} /></td>
                      <td><input type="text" defaultValue="bitbucket" /></td>
                      <td>1</td>
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
            <input id="searchMemberInput" className="fr" type="text" placeholder="멤버 검색" />
          </div>
          <form>
            <table>
              <thead>
                <tr>
                  <th>삭제 <input type="checkbox" name="chkAllMember" id="chkAllMember" /></th>
                  <th>이름</th>
                  <th>메일주소</th>
                  <th>그룹</th>
                  <th>수신거부일</th>
                </tr>
              </thead>
              <tbody id="memberTbl">
                {memberRows.map((d, index) => (
                  <tr key={index}>
                    <td></td>
                    <td><input type="text" defaultValue={d.name} onChange={changeTextM(index)} /></td>
                    <td><input type="text" defaultValue={d.email} onChange={changeTextM(index)} /></td>
                    <td>
                      <select name="" id="">
                        <option>bitbucket</option>
                      </select>
                    </td>
                    <td></td>
                  </tr>
                ))}
                {props.posts.map(
                  (posts, index) =>
                    <tr key={index}>
                      <td>삭제 <input type="checkbox" name="chkMember" id={"chkMember" + (index + 1)} /></td>
                      <td><input type="text" defaultValue="John Doe" /></td>
                      <td><input type="text" defaultValue={posts.email} /></td>
                      <td>
                        <select name="">
                          <option>bitbucket</option>
                        </select>
                      </td>
                      <td>2020.06.23</td>
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