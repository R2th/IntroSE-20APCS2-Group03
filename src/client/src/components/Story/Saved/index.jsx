import classNames from 'classnames';
import Modal from 'components/Modal';
import DropDownModal from 'components/Modal/DropdownModal';
import Spinner from 'components/Spinner';
import React, { useRef, useState, useEffect } from 'react';

import styles from './styles.module.scss';

function SavedList() {
  const [isOpen, setIsOpen] = useState(false);
  const [saveList, setSaveList] = useState([
    {
      name: 'test 1',
      isPrivate: true,
      isChecked: true,
    },
    {
      name: 'test 2',
      isPrivate: false,
    },
    {
      name: 'test 3',
      isPrivate: true,
    },
  ]);
  const ref = useRef(null);

  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = async () => {
    setIsOpen(false);
    setIsLoading(true);

    setIsLoading(false);

    // alert(saveList.filter((item) => item.isChecked === true)[0].name);
  };

  useEffect(() => {
    if (ref.current) {
      const { right, left } = ref.current.getBoundingClientRect();
      setPosition({
        left: (right + left) / 2,
        top: ref.current.getBoundingClientRect().bottom,
      });
    }
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className={classNames(styles.bookmarkButton, isOpen && styles.open)}
        onClick={() => setIsOpen(true)}
      >
        <i
          ref={ref}
          className="icon icon-save_fill"
          style={
            isOpen
              ? {
                color: 'white',
              }
              : {}
          }
        />
      </button>
      <Modal isOpen={isLoading}>
        <Spinner />
      </Modal>
      <DropDownModal
        isOpen={isOpen}
        handleClose={handleClose}
        position={{
          ...position,
          transform: 'translate(-50%, 0)',
        }}
        size={{
          width: 250,
        }}
        contentClassName={styles.container}
      >
        <div className={styles.collections}>
          {saveList.map((collection) => (
            <Item collection={collection} setSaveList={setSaveList} />
          ))}
          <NewCollection />
        </div>
      </DropDownModal>
    </>
  );
}

function NewCollection() {
  const [isDescription, setIsDescription] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <div
        className={styles.newCollection}
        aria-hidden
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Create new collection
      </div>
      <Modal isOpen={isOpen} handleClose={handleClose} contentClassName={styles.form}>
        <div className={styles.newCollectionForm}>
          <div className={styles.body}>
            <div className={styles.dump}>
              <div className={styles.content}>
                <div style={{ height: 400 }}>
                  <div className={styles.header}>
                    <h2>Create New List</h2>
                  </div>
                  <div className={styles.form}>
                    <div className={styles.title}>
                      <span style={{
                        color: 'rgba(41, 41, 41, 1)',
                        lineHeight: 20,
                        fontSize: 14,
                      }}
                      >
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%',
                        }}
                        >
                          <div className={styles.input}>
                            <input placeholder="Give me a name" type="text" />
                          </div>
                          <div className={styles.count}>
                            <p className={styles.validation} />
                            <p className={styles.num}>
                              <span>0</span>
                              /60
                            </p>
                          </div>
                        </div>
                      </span>
                    </div>
                    {isDescription
                      ? (
                        <span style={{
                          color: 'rgba(41, 41, 41, 1)',
                          lineHeight: 20,
                          fontSize: 14,
                        }}
                        >
                          <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                          }}
                          >
                            <div className={styles.input}>
                              <input placeholder="Description" type="text" />
                            </div>
                            <div className={styles.count}>
                              <p className={styles.validation} />
                              <p className={styles.num}>
                                <span>0</span>
                                /280
                              </p>
                            </div>
                          </div>
                        </span>
                      )
                      : (
                        <div className={styles.description}>
                          <button type="button" onClick={() => { setIsDescription(true); }}>
                            <p>Add a description</p>
                          </button>
                        </div>
                      )}
                    <div className={styles.private}>
                      <input type="checkbox" />
                      <p>Make it private</p>
                    </div>
                  </div>
                </div>
                <div className={styles.action}>
                  <button type="button" className={styles.cancelBtn}>Cancel</button>
                  <button type="button" className={styles.submitBtn}>Create</button>
                </div>
              </div>
            </div>
          </div>
          <i className="icon icon-close" style={{ cursor: 'pointer' }} onClick={handleClose} aria-hidden />
        </div>
      </Modal>
    </>
  );
}

function Item({ collection, setSaveList }) {
  const handleChooseSaveList = () => {
    if (collection.isChecked) return;

    setSaveList((prev) => prev.map((item) => {
      if (item.name === collection.name && item.isPrivate === collection.isPrivate) {
        return { ...item, isChecked: true };
      }
      return { ...item, isChecked: false };
    }));
  };

  return (
    <div aria-hidden className={styles.item} onClick={handleChooseSaveList}>
      <input type="checkbox" checked={collection.isChecked} />
      <div className={styles.name}>{collection.name}</div>
      <i className="icon icon-lock" />
    </div>
  );
}

export default SavedList;
