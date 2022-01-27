import React, { Component } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";
export default class NewBlogPost extends Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.handleChange = this.handleChange.bind(this);
    this.state = {post:{
          category: "",
          title: "",
          cover: "",
          readTime: {
              value: null,
              unit: ""
          },
          author: {
              name: "",
              avatar: ""
          },
          content: "Text",
              }}   
  }
  
  componentDidUpdate = (prevProps, prevState) => {
    if(prevState !== this.state.post){

      console.log(this.state.post)
    }
  }
  writePost = async() => {
    try {
      let response = await fetch("http://localhost:3001/blogs",{
        method:"POST",
        body: JSON.stringify(this.state.post),
      header:{
        "content-type":"application/JSON"
      }

      })
      if(response.ok){
        let data  = await response.json();
        this.props.fetchPosts()
      }else {
        console.log("error on new posts")
      }
    } catch (error) {
      console.log(error)
    }
  }
  handleChange(value) {
    this.setState({ text: value });
  }
  
  render() {
    const {fetchPosts, posts} =  this.props
    return (
      <Container className="new-blog-container">
        <Form className="mt-5">
          <Form.Group controlId="blog-form" className="mt-3">
            <Form.Label >Title</Form.Label>
            <Form.Control value={this.state.post.title} onChange={(e) => this.setState({post:{...this.state.post ,title:e.target.value}})} size="lg" placeholder="Title" />
          </Form.Group>
          <Form.Group controlId="blog-category" className="mt-3">
            <Form.Label>Category</Form.Label>
            <Form.Control size="lg" as="select" value={this.state.post.category} onChange={(e) => this.setState({post:{...this.state.post, category:e.target.value}})}>
              <option>Horror</option>
              <option>Romantic</option>
              <option>History</option>
              <option>Scifi</option>
              <option>Category5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="blog-content" className="mt-3">
            <Form.Label>Blog Content</Form.Label>
            {/* <ReactQuill
              value={this.state.text}
              onChange={this.handleChange}
              className="new-blog-content"
            /> */}
          </Form.Group>
          <Form.Group className="d-flex mt-3 justify-content-end">
            <Button type="reset" size="lg" variant="outline-dark">
              Reset
            </Button>
            <Button
              type="submit"
              size="lg"
              variant="dark"
              style={{ marginLeft: "1em" }}
            >
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Container>
    );
  }
}
