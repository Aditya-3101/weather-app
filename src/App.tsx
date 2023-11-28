import React from 'react';
import { useEffect } from 'react';
import './App.css';
import Home from './components/Home';

const App =() => {

  useEffect(()=>{
    document.title = 'Weather.io'
  },[])

return <section className='div-body'>
  <section className='div-parent'>
  <h2 className='div-head'>weather<span className="div-small-head">.io</span></h2>
  <h4 className='div-slogan'>A minimalistic, RealTime Weather Forecast Webapplication.</h4>
  <Home/>
  </section>
  </section>
}

export default App;
