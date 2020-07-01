import React, { Fragment } from 'react'

function Nav(props) {
  return (
    <Fragment>
    <h1 id="heading">mailing service</h1>
    <nav>
      <ul>
        <li className="nav-list receiver"><a href="/index.html">수신인 관리</a></li>
        <li className="nav-list contents"><a href="/list_content.html">메일 컨텐츠 관리</a></li>
        <li className="nav-list mail"><a href="/list_mail.html">메일 발송 관리</a></li>
      </ul>
    </nav>
    </Fragment>
  )
}

export default Nav;

