'use client'
import Image from 'next/image'
import styles from './page.module.css'
import { useState, useEffect, FormEvent } from 'react'

import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const [res, setRes] = useState('');

  useEffect(() => {
    setIsClient(true)
  }, [])


  async function submitForm(e){
    e.preventDefault();
    // const formData = new FormData(e.currentTarget)

    const data = {
      title: e.target.post_title.value,
      content: e.target.post_content.value
    }

    try {
        // const api_endpoint = "http://wp-nextjs-crud.test/wp-json/noman/v1/create-post";
      const res = await fetch("https://app.wprealizer.com/wp-json/noman/v1/create-post", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(data)
        })

        if (!res.ok) {
          throw new Error('Something wrong');
        }

        // retrive api data
        const resData = await res.json();
        console.log(resData);
    }
    catch (error) {
      console.error(error)
    }
    
    
  }
  return (
    <>

      <Container>
        <Row className='justify-content-center'>
          <Col lg={8}>
            <h1 className='my-5'>NextJS WP CRUD</h1>
            <form onSubmit={submitForm}>
                <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="text" name='post_title' className="form-control" id="exampleFormControlInput1" placeholder="Post Title"/>
              </div>
              <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">Post Content</label>
                <textarea className="form-control" name='post_content' id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
              <input type='submit' value="Submit" className='btn btn-primary'/>
            </form>
          </Col>
        </Row>
      </Container>

    </>
  )
}
