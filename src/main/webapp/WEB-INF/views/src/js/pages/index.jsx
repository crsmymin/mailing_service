import React, {useState, useEffect} from "react";
import ReactDom from "react-dom";
import axios from "axios"

// import components
import Nav from '../layouts/nav.jsx'
import Receiver from '../components/list_receiver.jsx'

function App(props) {
  
  const [posts, setPosts] = useState([]);

  const _getTestApi = () => {
    axios({
      method: 'get',
      //url: 'https://jsonplaceholder.typicode.com/posts/1/comments'
      url: '/MemberSearch.do'
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

  useEffect(() => {
    _getTestApi();

  }, [])

  return (
    <div className="container">
      <Nav />
      <div className="content">
        <Receiver posts={posts} />
      </div>
    </div>
  )
}

export default App;

ReactDom.render(<App />, document.getElementById("app"));
