import React, { Fragment,useState } from 'react'

function Nav(props) {
  const [auth, setAuth] = useState(window.sessionStorage.getItem('auth'));

  return (
    <Fragment>
    <nav>
      <h1>
        Cview-M
      </h1>
      <ul>
        <li className="nav-list receiver"><a href="/receiver">수신인 관리</a></li>
        <li className="nav-list contents"><a href="/list_content">메일 콘텐츠 관리</a></li>
        <li className="nav-list mail"><a href="/list_mail">메일 발송 관리</a></li>
        {auth === '1' ? 
        (<li className="nav-list account"><a href="/account">계정 관리</a></li>):
        (<li></li>)}
      </ul>
    </nav>
    </Fragment>
  )
}

export default Nav;

