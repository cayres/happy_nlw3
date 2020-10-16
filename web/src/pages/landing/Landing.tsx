import React from 'react';
import { Link } from 'react-router-dom';

import { FiArrowRight } from 'react-icons/fi';
import Logo from '../../images/logo.svg';

import './style.css';

export function Landing() {
  return (
    <div className="page-landing">
      <div className="content-wrapper">
        <img src={Logo} alt="happy" />
        <main>
          <h1>Leve felicidade para o mundo.</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>
        <div className="location">
          <strong>Salvador</strong>
          <span>Bahia</span>
        </div>
        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
}
