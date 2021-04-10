import React from 'react';
import automotive from './utils/automotive.jpg';
import carpenter from './utils/carpenter.png';
import cleaner from './utils/cleaner.jpg';
import electrician from './utils/electrician.jpg';
import mechanic from './utils/mechanic.jpg';
import painter from './utils/painter.png';
import plumber from './utils/plumber.jpg';
import welder from './utils/welder.jpg';
import signup from './utils/signup.jpg';
import electronic from './utils/electronic.jpg';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const SlideCustServ = () => {
    return (
      <div className="slide-container">
        <Slide duration={3500}>
          <div className="each-slide">
            <div>
            <span><img src={carpenter} style={{height:'300px',width:'300px'}}/></span>
            </div>
          </div>
          <div className="each-slide">
            <div>
            <span><img src={electronic} style={{height:'300px',width:'300px'}}/></span>
            </div>
          </div>
          <div className="each-slide">
            <div>
            <span><img src={electrician} style={{height:'300px',width:'300px'}}/></span>
            </div>
          </div>
          <div className="each-slide">
            <div>
              <span><img src={cleaner} style={{height:'300px',width:'300px'}}/></span>
            </div>
          </div>
          <div className="each-slide">
            <div>
              <span><img src={welder} style={{height:'300px',width:'300px'}}/></span>
            </div>
          </div>
          <div className="each-slide">
            <div>
              <span><img src={mechanic} style={{height:'300px',width:'300px'}}/></span>
            </div>
          </div>
          <div className="each-slide">
            <div>
              <span><img src={painter} style={{height:'300px',width:'300px'}}/></span>
            </div>
          </div>
          <div className="each-slide">
            <div>
              <span><img src={plumber} style={{height:'300px',width:'300px'}}/></span>
            </div>
          </div>
          <div className="each-slide">
            <div>
              <span><img src={automotive} style={{height:'300px',width:'300px'}}/></span>
            </div>
          </div>
          <div className="each-slide">
            <div>
              <span><img src={signup} style={{height:'300px',width:'300px'}}/></span>
            </div>
          </div>
        </Slide>
      </div>
    )
}

export default SlideCustServ;