import './App.css';
import { useState } from 'react';

function App() {

  let post = 'ReactBlog';
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬독학']);
  let [따봉, 따봉변경] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');

  return (
    <div className="App">
      <div className="black-nav">
        <h4>{post}</h4>
      </div>

      <button onClick={()=>{
        let copy = [...글제목];
        copy.sort();
        글제목변경(copy);
      }}>가나다순정렬</button>

      <button onClick={()=>{
        let copy = [...글제목]; // ...으로 괄호를 벗기고 다시 씌워서 새로운 array 만듦
        copy[0] = '여자 코트 추천';
        글제목변경(copy);
      }}>글 수정</button>

      {/* <div className="list">
        <h4>{ 글제목[0] } <span onClick={()=>{ 따봉변경(따봉+1) }}>👍</span> {따봉} </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4 onClick={()=>{ setModal(!modal) }}>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div> */}

      {
        글제목.map(function(a, i){ // i : 반목문이 돌 때마다 0부터 1씩 증가하는 정수
          return (
            <div className="list" key={i}> {/* 반복문으로 html 생성하면 key={html마다 다른숫자} 추가해야함 */}
               <h4 onClick={()=>{ setModal(!modal); setTitle(i) }}>{ a }
               <span onClick={(e)=>{ 
                let copy = [...따봉];
                copy[i] = copy[i] + 1;
                따봉변경(copy);
                e.stopPropagation()
                }}>👍</span> {따봉[i]} 
               </h4> {/* { 글제목[i] } 도 가능 */}
              <p>2월 17일 발행</p>
              <button onClick={()=>{
                let copy = [...글제목];
                copy.splice(i, 1); // 내가 원하는 항목 (몇번쨰 항목, 갯수) 삭제
                글제목변경(copy);
              }}>삭제</button>
            </div>
          )
        })
      }

      <input onChange={(e)=>{입력값변경(e.target.value)}}/>
      <button onClick={()=>{
        let copy = [...글제목];
        copy.unshift(입력값); // array 맨왼쪽에 추가
        글제목변경(copy);
      }}>글발행</button>

      {
        modal === true 
        ? <Modal title={title} 글제목변경={글제목변경} color={'yellow'} 글제목={글제목}/> 
        : null
      }
      
      
    </div>
  );
}

function Modal(props){
  return(
    <div className='modal' style={{background : props.color}}>
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={()=>{ props.글제목변경(['여자 코트 추천', '강남 우동 맛집', '파이썬독학'])}}>글수정</button>
    </div>
  )
};


export default App;
