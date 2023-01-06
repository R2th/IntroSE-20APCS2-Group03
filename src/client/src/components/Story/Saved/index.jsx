import classNames from 'classnames';
import Modal from 'components/Modal';
import DropDownModal from 'components/Modal/DropdownModal';
import Spinner from 'components/Spinner';
import { AuthContext } from 'contexts/Auth/authContext';
import React, {
  useRef, useState, useEffect, useContext,
} from 'react';
import { useParams } from 'react-router-dom';
import { fullPathAPI } from 'utils/helpers';

import styles from './styles.module.scss';

function SavedList() {
  const [isOpen, setIsOpen] = useState(false);

  const { slug } = useParams();
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
  const { token } = useContext(AuthContext);

  const [position, setPosition] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = async () => {
    setIsLoading(true);
    const collectionId = saveList.filter((collection) => collection.isChecked === true)[0].id;

    const postRes = await fetch(fullPathAPI(`/collection/${collectionId}/${slug}/add`), {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { message } = await postRes.json();

    if (message === 'successful') {
      setIsOpen(false);
      setIsLoading(false);
    }

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

  const fetchSaveList = async () => {
    const getRes = await fetch(fullPathAPI('/collection'), {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { data } = await getRes.json();

    setSaveList(data.map((collection) => ({
      name: collection.name, isPrivate: true, isChecked: false, id: collection.id,
    })));
  };

  useEffect(() => {
    fetchSaveList();
  }, []);

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
          <NewCollection fetchSaveList={fetchSaveList} />
        </div>
      </DropDownModal>
    </>
  );
}

function NewCollection({ fetchSaveList }) {
  const [isDescription, setIsDescription] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { token } = useContext(AuthContext);

  const [name, setName] = useState('');

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleClose = async () => {
    setIsOpen(false);
  };

  const handleCreate = async () => {
    const postRes = await fetch(fullPathAPI('/collection'), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
      }),

    });

    const { message } = await postRes.json();

    if (message === 'successful') {
      fetchSaveList();
      setIsOpen(false);
    }
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
                            <input placeholder="Give me a name" type="text" onChange={handleChangeName} />
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
                  <button type="button" className={styles.cancelBtn} onClick={handleClose}>Cancel</button>
                  <button type="button" className={styles.submitBtn} onClick={handleCreate}>Create</button>
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
