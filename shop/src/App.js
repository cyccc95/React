import './App.css';
import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Detail from './routes/detail.js';
import axios from 'axios';


function App() {

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  return (

    <div className="App">

      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            {/* <Link to="/" style={{color:"white", textDecoration:"none", padding:"5px"}}>홈</Link>
            <Link to="/detail" style={{color:"white", textDecoration:"none", padding:"5px"}}>상세페이지</Link> */}
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail')}}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <div>
            <div className='main-bg'></div>
              <div className='container'>
                <div className='row'>
                  {/* <Card shoes={shoes[0]} i={1}/>
                  <Card shoes={shoes[1]} i={2}/>
                  <Card shoes={shoes[2]} i={3}/> */}
                  {
                    shoes.map((a, i)=>{
                      return (
                        <Card shoes={shoes[i]} i={i} key={i}/>
                      )
                    })
                  }
                </div>
              </div>
              <button onClick={()=>{
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((결과)=>{
                  let copy = [...shoes, ...결과.data];
                  setShoes(copy);
                })
                .catch(()=>{
                  console.log('실패함')
                })
              }}>더보기</button>
            </div>} />

        <Route path="/detail/:id" element={<Detail shoes={shoes} />} />

        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>멤버임</div>}></Route>
          <Route path="location" element={<div>위치정보임</div>}></Route>
        </Route>

        <Route path="*" element={<div>없는페이지요</div>} />
      </Routes>

    </div>
  );
}

function About(){
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props){
  let navigate = useNavigate();

  return (
    <div className='col-md-4'>
      <Nav.Link onClick={()=>{navigate('/detail/'+ props.i)}}>
      <img src={'https://codingapple1.github.io/shop/shoes'+ (props.i+1) +'.jpg'} width="80%" alt='shoes'/>
      </Nav.Link>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  )
}

export default App;
