import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // 자주 바뀌는, 중요한 데이터는 state로
  // 그래야 새로고침 없이 재렌더링 가능
  let [편지제목, 편지제목변경] = useState(['안녕 잘 지내니?', '사랑하는 아들에게', 'ㅎㅇㅎㅇ']); 
  let [따봉, 따봉변경] = useState(0);
  let posts = '제목'

  function 제목바꾸기() {
    let 새제목 = [...편지제목]; // deep copy를 해야함. state는 immutable해야 하며, shallow copy해도 적용 잘 안 됨.
    새제목[0] = '안녕 잘 지내지 마';
    편지제목변경(새제목);
  }

  return (
    <div className="App">
      <div className='black-nav'>
        <div style={{fontSize: '30px'}}>인편을 쓰자!</div>
      </div>
      <button onClick={ 제목바꾸기 }>안녕?</button>
      <div className='list'>
        <h3> { 편지제목[0] } <span onClick={ ()=>{ 따봉변경(따봉+1) } }>👍</span> { 따봉 } </h3>
        <p>2월 17일 전송</p>
        <hr/>
      </div>
      <div className='list'>
        <h3> { 편지제목[1] } </h3>
        <p>2월 18일 전송</p>
        <hr/>
      </div>
      <div className='list'>
        <h3> { 편지제목[2] } </h3>
        <p>2월 29일 전송예약</p>
        <hr/>
      </div>
      <Modal />
    </div>
  );
}

function Modal(){
  return (
    <div className='modal'>
      <h3>제목</h3>
      <p>2월 17일 전송</p>
      <p>상세 내용</p>
    </div>
  )
}

export default App;
