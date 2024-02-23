/* eslint-disable */
import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  // 자주 바뀌는, 중요한 데이터는 state로
  // 그래야 새로고침 없이 재렌더링 가능
  let [편지제목, 편지제목변경] = useState(['안녕 잘 지내니?', '사랑하는 아들에게', 'ㅎㅇㅎㅇ']); 
  let posts = '제목'

  return (
    <div className="App">
      <div className='black-nav'>
        <div style={{fontSize: '30px'}}>인편을 쓰자!</div>
      </div>
      <div className='list'>
        <h3> { 편지제목[0] } </h3>
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
    </div>
  );
}

export default App;
