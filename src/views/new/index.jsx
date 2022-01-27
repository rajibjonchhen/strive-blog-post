import React, { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { Container, Form, Button } from "react-bootstrap";
import "./styles.css";

const NewBlogPost = ({fetchPosts, posts}) => {
  const [selectedFile, setSelectedFile] = useState()
  const [post, setPost] = useState( {
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
    content: "html",
        } 
)
      
  useEffect(()=>{},[])

  const handleChange = (e) => {
    setSelectedFile (e.target.files[0])
  }
  
  const writePost = async() => {
    try {
      let response = await fetch("http://localhost:3001/blogs",{
        method:"POST",
        body: JSON.stringify(post),
      header:{
        "content-type":"application/JSON"
      }

      })
      if(response.ok){
        let data  = await response.json();
        fetchPosts()
      }else {
        console.log("error on new posts")
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  
  
    
    return (
      <Container className="new-blog-container">
        <Form className="mt-5">
          <div className="d-flex">
          <Form.Group controlId="blog-form" className="m-3">
            <Form.Label >Title</Form.Label>
            <Form.Control value={post.title} onChange={(e) => setPost({...post ,title:e.target.value})} size="lg" placeholder="Title" />
          </Form.Group>
          <Form.Group controlId="blog-category" className="m-3">
            <Form.Label>Category</Form.Label>
            <Form.Control size="lg" as="select" value={post.category} onChange={(e) => setPost({...post, category:e.target.value})}>
              <option>Horror</option>
              <option>Romantic</option>
              <option>History</option>
              <option>Scifi</option>
              <option>Category5</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="blog-author" className="m-3">
            <Form.Label >Author</Form.Label>
            <Form.Control value={post.author} onChange={(e) => setPost({...post ,author:{...post.author,name:e.target.value}})} size="lg" placeholder="Author" />
          </Form.Group>
          <Form.Group>
            <Form.File
              className="m-3 "
              required
              name="file"
              label="File"
              onChange={(e) => handleChange(e)}
              // isInvalid={!!errors.file}
              // feedback={errors.file}
              id="validationFormik107"
              feedbackTooltip
            />
          </Form.Group>
          </div>
          <Form.Group controlId="blog-content" className="m-3">
            <Form.Label>Blog Content</Form.Label>
            <ReactQuill value={post.content} onChange={(html) => setPost({content:html})} className="new-blog-content" placeholder="write the blog here"/>
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
export default NewBlogPost
