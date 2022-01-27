import React, { useState, useEffect } from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./views/home";
import Blog from "./views/blog";
import NewBlogPost from "./views/new";
import { BrowserRouter, Route } from "react-router-dom";

function App() {

  const [posts, setPosts] = useState([])
  useEffect(()=>{
    fetchPosts()
    writePost()
  },[])

  const fetchPosts = async() => {
    try {
      let response = await fetch("http://localhost:3001/blogs",{
        method:'get',
      })
      if(response.ok){
        let data  = await response.json();
        // setPosts(data)
        console.log(data)
      }else {
        console.log("error on getting posts")
      }
    } catch (error) {
      console.log(error)
    }
  }

  const writePost = async() => {
    try {
      let response = await fetch("http://localhost:3001/blogs",{
        method:'post',
        body: JSON.stringify({
          "category": "Scifi",
          "title": " The white space has  not gone",
          "cover": "https://1.bp.blogspot.com/-CCiFxYsX8_8/YLmYYaTn4OI/AAAAAAABAxw/SNKOxdrwtr0Z4ESPR1NTw9IKSiJcpzk6QCLcBGAsYHQ/s1600/Ancient_Gods_by_fresh_style.jpg",
          "readTime": {
              "value": 2,
              "unit": "minute"
          },
          "author": {
              "name": "Space Master",
              "avatar": "AUTHOR AVATAR LINK"
          },
          "content": "HTML",
         
      }),
      header:{
        "content-type":"application/JSON"
      }

      })
      if(response.ok){
        let data  = await response.json();
        // setPosts(data)
        fetchPosts()
      }else {
        console.log("error on getting posts")
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <BrowserRouter>
      <NavBar />
       <Route path="/" exact component={Home}  fetchPosts={fetchPosts} posts={posts && posts}/>
      <Route path="/blog/:id" exact component={Blog} />
      <Route path="/new" exact component={NewBlogPost} fetchPosts={fetchPosts} posts={posts}/>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
