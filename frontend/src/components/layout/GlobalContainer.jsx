import React from 'react';

const GlobalContainer = ({ children }) => (
  <div style={{
    minHeight: '100vh',
    background: '#050505',
    color: '#AAAAAA',
    fontFamily: 'DM Sans, sans-serif'
  }}>
    {children}
  </div>
)

export default GlobalContainer;
