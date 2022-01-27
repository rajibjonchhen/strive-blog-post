import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Image } from "react-bootstrap";
import { withRouter } from "react-router";
import BlogAuthor from "../../components/blog/blog-author";
import BlogLike from "../../components/likes/BlogLike";
// import posts from "../../data/posts.json";
import "./styles.css";

const Blog =() =>{
  const [blog ,setBlog] = useState()
  const [loading,setLoading] = useState(true)
  const [blogId,setBlogId] = useState(null)
  const params = useParams()

  useEffect(() => {
    let id = params.blogId
    setBlogId(id);
    console.log(id);
    // const blog = this.props.posts.find((post) => post._id.toString() === id);
    // if (blog) {
    //   this.setState({ blog, loading: false });
    // } else {
    //   this.props.history.push("/404");
    // }
  fetchBlogDetail()
  },[])

  const fetchBlogDetail = async() => {
   try {
    let response = await fetch("http://localhost:3001/blogs/"  +blogId, {
      method:'GET'
    })
    if(response.ok){
      let data = await response.json()
      setBlog(data) 
      console.log(data)
      setLoading(false)
    } else {
      setLoading(false)
      console.log('error: cannot fetch the details')
    }
   } catch (error) {
    setLoading(false)
     console.log(error)
   }
  }



  
    
    if (loading) {
      return <div>loading</div>;
    } else {
      return (
        <div className="blog-details-root">
          <Container>
            <Image className="blog-details-cover" src={blog.cover} fluid />
            <h1 className="blog-details-title">{blog.title}</h1>
            <div className="blog-details-container">
              <div className="blog-details-author">
                <BlogAuthor {...blog.author} />
              </div>
              <div className="blog-details-info">
                <div>{blog.createdAt}</div>
                <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
                <div style={{marginTop:20}}>
                  <BlogLike defaultLikes={["123"]} onChange={console.log}/>
                </div>
              </div>
            </div>

            <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
          </Container>
        </div>
      );
    }
  
}

export default withRouter(Blog);
