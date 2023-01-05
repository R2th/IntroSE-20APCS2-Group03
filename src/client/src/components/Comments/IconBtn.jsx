import React from 'react';
import './style.css';

function IconBtn({
  Icon, isActive, color, children, onClick, ariaLabel,
}) {
  return (
    <button
      type="button"
      className={`btn icon-btn ${isActive ? 'icon-btn-active' : ''} ${
        color || ''
      }`}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <span className={`${children != null ? 'mr-1' : ''}`}>
        <i className={`icon ${Icon}`} style={{ color }} />
      </span>
      {children}
    </button>
  );
}

export default IconBtn;
