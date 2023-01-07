import classNames from 'classnames';
import { AuthContext } from 'contexts/Auth/authContext';
import React, {
  useState, useEffect, useRef, useContext,
} from 'react';
import { fullPathAPI } from 'utils/helpers';
import { parseJwt } from 'utils/token';
import { md5 } from 'utils/md5';

import styles from './styles.module.scss';

const exportMediaList = ({ content }) => {
  if (content === '' || !content) return [];

  // eslint-disable-next-line
  const regex = /\!\[[-a-zA-Z0-9(@:%_\+.~#?&\/\/=]*\]\(([-a-zA-Z0-9(@:%_\+.~#?&\/\/=]*)\)/gi;

  return Array.from(content.matchAll(regex), (x) => x[1]);
};

function Thumbnail({ content, thumbnail, setThumb }) {
  const [list, setList] = useState([]);
  const ref = useRef();

  const onChooseThumbnail = (image) => () => {
    setThumb(image);
  };

  const onClickUpload = () => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const { token } = useContext(AuthContext);
  const { username } = parseJwt(token);

  const onUploadThumb = async (e) => {
    const form = new FormData();
    const s = username + Date.now().toString();

    const file = e.target.files[0];

    if (!file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
      // eslint-disable-next-line
      alert('not an image');
    }

    const newRenamedFile = new File([file], `${file.name.split('.').at(-2)}-${md5(s)}.${file.name.split('.').at(-1)}`);
    form.append('image', newRenamedFile);

    const uploadRes = await fetch(fullPathAPI('upload-image'), {
      method: 'POST',
      body: form,
    });

    const status = await uploadRes.json();

    if (status.filename) {
      const url = fullPathAPI(`/image/${status.filename}`);
      setList((prev) => [url, ...prev]);
      setThumb(url);
    } else {
      console.error(status);
    }
  };

  useEffect(() => {
    const images = exportMediaList({ content });
    setList(images);

    if (images.length > 0) {
      setThumb(images[0]);
    } else {
      setList([thumbnail]);
    }
  }, [content]);

  return (
    <div className={styles.thumbnail}>
      <div className={styles.dropzone} onClick={onClickUpload} aria-hidden>
        <div style={{
          textAlign: 'center',
          margin: '2em 0',
        }}
        >
          <button type="button">
            <i className={classNames(styles.uploadBtn, 'icon icon-upload')} />
          </button>
        </div>
      </div>
      <input type="file" accept="image/gif, image/jpeg, image/png" style={{ display: 'none' }} onInput={onUploadThumb} ref={ref} />
      {list.length > 0 && list.map((image) => (
        <div
          className={classNames(thumbnail === image && styles.chosen, styles.image)}
          onClick={onChooseThumbnail(image)}
          aria-hidden
        >
          <img src={image} alt={image} />
        </div>
      ))}
    </div>
  );
}

export default Thumbnail;
