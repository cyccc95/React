import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Nav } from 'react-bootstrap';
import { addItem } from './../store.js';
import { useDispatch } from "react-redux";

let Btn = styled.button`
  background : ${props => props.bg};
  color : ${props => props.bg == 'blue' ? 'white' : 'black'};
  padding : 10px;
`;
let Box = styled.div`
  background : grey;
  padding : 20px
`;

function Detail(props){

  let {id} = useParams();
  let 찾은상품 = props.shoes.find((x) => x.id == id);
  let [test, setTest] = useState(true);
  let [num, setNum] = useState('');
  let [tab, setTab] = useState(0);
  let [fade2, setFade2] = useState('');
  let dispatch = useDispatch();

  useEffect(()=>{
    setFade2('end')
    return ()=>{
      setFade2('')
    }
  }, []);

  useEffect(()=>{
    setTimeout(()=>{setTest(false)}, 2000)
  }, []); //useEffect 실행조건 넣을 수 있는 곳, 비워놓으면 mount에만 실행함, 아에 안적으면 mount,update 둘다 실행

  useEffect(()=>{
    if(isNaN(num) == true){
      alert('그러지마세요')
    }
  }, [num]);

  return (
    <div className={`containe start ${fade2}`}>
      <Box>
        <Btn bg="blue">버튼</Btn>
        <Btn bg="yellow">버튼</Btn>
      </Box>
      {
        test == true
        ? <div className="alert alert-warning">
            2초이내 구매시 할인
          </div>
        : null
      }

      <input onChange={(e)=>{setNum(e.target.value)}} />

      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" alt='' />
        </div>
        <div className="col-md-6 mt-4">
          {/* <h4 className="pt-5">{props.shoes[id].title}</h4>
          <p>{props.shoes[id].content}</p>
          <p>{props.shoes[id].price}</p> */}
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <button className="btn btn-danger" onClick={()=>{
            dispatch(addItem({id : 1, name : 'Red knit', count : 1}))
          }}>주문하기</button>
        </div>
      </div>

      <Nav variant="tabs"  defaultActiveKey="link0"> {/* 기본으로 눌려있을 버튼 */}
        <Nav.Item>
          <Nav.Link eventKey="link0" onClick={()=>{ setTab(0) }}>버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link1" onClick={()=>{ setTab(1) }}>버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link2" onClick={()=>{ setTab(2) }}>버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} />
      

    </div>
  )
}

function TabContent({tab}){
  // if (tab == 0){
  //   return <div>내용0</div>
  // } 
  // if (tab == 1){
  //   return <div>내용1</div>
  // } 
  // if (tab == 2){
  //   return <div>내용2</div>
  // }

  let [fade, setFade] = useState('');  

  useEffect(()=>{
    setTimeout(()=>{setFade('end')}, 100)
    
    return ()=>{
      setFade('')
    }
  }, [tab]); //탭이라는 state가 변경될때마다 실행

  return (<div className={`start ${fade}`}>
      { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab] }
    </div>)
}


export default Detail;