/* eslint-disable react/jsx-key */
import  Post  from "./Post";
import { useState } from "react";


function App() {

  const [posts, setPosts] = useState([]);

  function addPost(){
    console.log("in fun")
    setPosts([...posts, {
      img: "https://media.licdn.com/dms/image/v2/D4D03AQFyMu9_B-Ts2A/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1715176146284?e=1737590400&v=beta&t=xhVIe0dNNR5k-n9DpggYTm-POTddv7huWt9TUe_ebLk",
      name: "Santosh Mutyala",
      bio: "Fullstack developer and CEO at Tech@Berlin",
      body: "The only constant in life is change. Whether it's learning a new skill, adapting to a new role, or navigating unexpected challenges, growth comes from stepping out of your comfort zone. What change have you embraced recently, and how has it transformed you? Let's inspire each other!",
      time: "40m",
      bodyImg: "https://media.licdn.com/dms/image/v2/D4E22AQHFtndZAkr-sg/feedshare-shrink_800/feedshare-shrink_800/0/1732044011952?e=1735171200&v=beta&t=opHBW5HJT5aMzwf3-oOgo18YC6Wv-xEGdvGskeTQc0A"
    }])
    console.log("after setposts")
  }


  return (
    <div style={{backgroundColor: "#F3F2EF", height: "100vh"}}>
      <button onClick={addPost}>Add post</button>
      {posts.map(post => {
       return(<Post name={post.name} bio={post.bio} body={post.body} time={post.time} bodyImg={post.bodyImg} img={post.img} />);
      })}
    </div>
  )
}



export default App
