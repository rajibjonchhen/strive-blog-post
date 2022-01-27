import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
// import blogs from "../../../data/blogs.json";
export default class BlogList extends Component {
  
  state = {
    blogs:[]
  }

  componentDidMount = () =>{
    this.fetchblogs()
  }

  fetchblogs = async() => {
    try {
      let response = await fetch("http://localhost:3001/blogs",{
        method:'get',
      })
      if(response.ok){
        let data  = await response.json();
        this.setState({blogs:data})
       
      }else {
        console.log("error on getting blogs")
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
 
 return (
      <Row>
        {this.state.blogs && this.state.blogs.map((blog) => (
          <Col md={4} style={{ marginBottom: 50 }}>
           <BlogItem key={blog.blogId} {...blog} />
          </Col>
        ))}
      </Row>
    );
  }
}
