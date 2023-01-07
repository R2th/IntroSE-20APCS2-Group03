import React, { useEffect, useRef, useState } from 'react';

import Modal from 'components/Modal';
import { fullPathAPI, fullPathImage, thumbnailUrl } from 'utils/helpers';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';

function Search() {
  const [search, setSearch] = useState('');
  const [contentSearch, setContentSearch] = useState([]);
  const [peopleSearch, setPeopleSearch] = useState([]);

  const ref = useRef(null);
  // eslint-disable-next-line
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const onClickUserDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (search === '') {
      return;
    }
    const fetchApi = async (path, set) => {
      try {
        const getResponse = await fetch(fullPathAPI(path));
        const getJson = await getResponse.json();
        set(getJson.data);
      } catch (err) {
        // eslint-disable-next-line
        console.error(err);
      }
    };
    fetchApi(`/search/story/${search}/10`, setContentSearch);
    fetchApi(`/search/user/${search}/10`, setPeopleSearch);
  }, [search]);

  return (
    <>
      <div className={styles.search} onClick={onClickUserDropdown} type="button" aria-hidden ref={ref}>
        <i className="icon icon-search" />
        <input value={search} onChange={onChangeSearch} placeholder="Search..." className={styles.inputField} />
      </div>
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        className={styles.dropDownUserMenu}
        contentClassName={styles.dropDownUserMenuContent}
        prefix={ref.current?.getBoundingClientRect().x}
        // eslint-disable-next-line
        width={ref.current?.getBoundingClientRect().right - ref.current?.getBoundingClientRect().left}
      >
        {search && (
        <div className={styles.search}>
          {contentSearch.length > 0 && (
          <div className={styles.searchContainer} key="stories">
            <p className={styles.header}>Stories</p>
            {contentSearch.map((content) => (
              <a
                className={styles.searchResult}
                onClick={() => {
                  handleClose();
                  // navigate();
                }}
                href={`/story/${content.id}`}
                aria-hidden
              >
                <img src={thumbnailUrl(content)} alt={content.id} />
                <div>
                  <div className={styles.title}>{content.title}</div>
                  <div className={styles.contentShort}>{content.contents_short}</div>
                </div>
              </a>
            ))}
          </div>
          )}
          {peopleSearch.length > 0 && (
          <div className={styles.searchContainer} key="people">
            <p className={styles.header}>People</p>
            {peopleSearch.map((user) => (
              <a
                className={styles.searchResult}
                onClick={() => {
                  handleClose();
                  // navigate();
                }}
                aria-hidden
                href={`/@${user.username}`}
              >
                <img src={fullPathImage({ data: user })} alt={user.username} />
                <div>
                  <div className={styles.title}>{user.username}</div>
                  <div className={styles.contentShort}>{user.bio}</div>
                </div>
              </a>
            ))}
          </div>
          )}
          <button type="submit" className={styles.searchSubmit}>
            <i className="icon icon-search" />
            <span>
              {`Search for "${search}"`}
            </span>
          </button>
        </div>
        )}
      </Modal>
    </>
  );
}

export default Search;
