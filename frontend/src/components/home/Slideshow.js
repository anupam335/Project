import React from 'react';
import automative from './slide/automative.jpg';
import carpenter from './slide/carpenter.jpg';
import cleaner from './slide/cleaner.jpg';
import electrician from './slide/electrician.jpg';
import mechanics from './slide/mechanics.jpg';
import painter from './slide/painter.jfif';
import plumber from './slide/plumber.jpg';
import ready from './slide/ready.jpg';
import we from './slide/we.png';
import welder from './slide/welder.jpg';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const Slideshow = () => {
    return (
      <div className="slide-container">
        <Slide duration={3500}>
          <div className="each-slide">
            <div>
              <span><img src={ready} style={{height:'300px',width:'500px'}}/></span>
            </div>
          </div>
          <div className="each-slide">
            <div>
            <span><img src={carpenter} style={{height:'500px',width:'500px'}}/></span>
            </div>
          </div>
          <div className="each-slide">
            <div>
            <span><img src={electrician} style={{height:'500px',width:'500px'}}/></span>
            </div>
          </div>
          <div className="each-slide">
            <div>
              <span><img src={cleaner} style={{height:'500px',width:'500px'}}/></span>
            </div>
          </div>
          <div className="each-slide">
            <div>
              <span><img src={we} style={{height:'500px',width:'500px'}}/></span>
            </div>
          </div>
          <div className="each-slide">
            <div>
              <span><img src={welder} style={{height:'500px',width:'500px'}}/></span>
            </div>
          </div>
          <div className="each-slide">
            <div>
              <span><img src={mechanics} style={{height:'500px',width:'500px'}}/></span>
            </div>
          </div>
          <div className="each-slide">
            <div>
              <span><img src={painter} style={{height:'500px',width:'500px'}}/></span>
            </div>
          </div>
          <div className="each-slide">
            <div>
              <span><img src={plumber} style={{height:'500px',width:'500px'}}/></span>
            </div>
          </div>
          <div className="each-slide">
            <div>
              <span><img src={automative} style={{height:'500px',width:'500px'}}/></span>
            </div>
          </div>
        </Slide>
      </div>
    )
}

export default Slideshow;