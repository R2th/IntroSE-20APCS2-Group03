import React, { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import '../modal.css';
import styles from './styles.module.scss';

function DropDownModal({
  children, isOpen, handleClose, className, closeBtn, contentClassName, position, size,
}) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === 'Escape' ? handleClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <CSSTransition
      in={isOpen}
      timeout={{ entry: 0, exit: 300 }}
      unmountOnExit
      classNames="modal"
      nodeRef={nodeRef}
    >
      <div
        ref={nodeRef}
        aria-hidden
        className={classNames(styles.modal, className)}
        onClick={handleClose}
      >
        {closeBtn && (
          <button onClick={handleClose} className={styles.closeBtn} type="button">
            Close
          </button>
        )}
        <div
          style={{ ...position, ...size }}
          aria-hidden
          className={classNames(styles.content, contentClassName)}
          onClick={(e) => e.stopPropagation()}
        >
          {children}

        </div>
      </div>
    </CSSTransition>
  );
}

export default DropDownModal;
