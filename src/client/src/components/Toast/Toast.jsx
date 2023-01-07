import React, { useState, useEffect } from 'react';

import './Toast.css';

function Toast(props) {
  const {
    toastList, position, autoDelete, autoDeleteTime,
  } = props;
  const [list, setList] = useState(toastList);

  const deleteToast = (id) => {
    const listItemIndex = list.findIndex((e) => e.id === id);
    const toastListItem = toastList.findIndex((e) => e.id === id);
    list.splice(listItemIndex, 1);
    toastList.splice(toastListItem, 1);
    setList([...list]);
  };

  useEffect(() => {
    setList([...toastList]);
  }, [toastList]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoDelete && toastList.length && list.length) {
        deleteToast(toastList[0].id);
      }
    }, autoDeleteTime);

    return () => {
      clearInterval(interval);
    };

    // eslint-disable-next-line
    }, [toastList, autoDelete, autoDeleteTime, list]);

  return (
    <div className={`notification-container ${position}`}>
      {
                    list.map((toast) => (
                      <div
                        key={Math.floor(Math.random() * (999999999 - 100000 + 1)) + 100000}
                        className={`notification toast ${position}`}
                        style={{ backgroundColor: toast.backgroundColor }}
                      >
                        <button type="button" onClick={() => deleteToast(toast.id)}>
                          X
                        </button>
                        <div className="notification-image">
                          <img src={toast.icon} alt="" />
                        </div>
                        <div>
                          <p className="notification-title">{toast.title}</p>
                          <p className="notification-message">
                            {toast.description}
                          </p>
                        </div>
                      </div>
                    ))
                }
    </div>
  );
}

export default Toast;
