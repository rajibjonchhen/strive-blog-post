import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import BlogItem from "../blog-item";
import posts from "../../../data/posts.json";
export default class BlogList extends Component {
  
  state = {
    posts:[]
  }

  componentDidMount = () =>{
    this.fetchPosts()
  }

  fetchPosts = async() => {
    try {
      let response = await fetch("http://localhost:3001/blogs",{
        method:'get',
      })
      if(response.ok){
        let data  = await response.json();
        this.setState({posts:data})
        console.log(data)
      }else {
        console.log("error on getting posts")
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
 
 return (
      <Row>
        {this.state.posts && this.state.posts.map((post) => (
          <Col md={4} style={{ marginBottom: 50 }}>
           <BlogItem key={post._id} {...post} />
          </Col>
        ))}
      </Row>
    );
  }
}
