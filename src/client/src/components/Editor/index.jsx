import React, { useContext, useState, useEffect } from 'react';

import MDEditor from '@uiw/react-md-editor';
import rehypeSanitize from 'rehype-sanitize';

import onImagePasted from 'utils/onImagePasted';

import debounce from 'utils/debounce';
import moment from 'moment';
import { fullPathAPI } from 'utils/helpers';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from 'contexts/Auth/authContext';
import Modal from 'components/Modal';
import { THUMBNAIL_DEFAULT } from 'utils/const';
import styles from './styles.module.scss';
import Thumbnail from './Thumbnail';

function Editor() {
  const { slug } = useParams();

  const [title, setTitle] = useState('');

  const [tags, setTags] = useState([]);
  const [curTag, setCurTag] = useState('');
  const [content, setContent] = useState('');

  const [caretPos, setCaretPos] = useState(0);
  const [saveTime, setSaveTime] = useState(null);

  const saveDraft = async () => {
    setSaveTime(new Date());

    const form = new FormData();
    const file = new File([content], `${slug}.md`, {
      type: 'text/markdown',
    });

    form.append('story', file);
    form.append('data', JSON.stringify({
      contentsShort: content.slice(0, 200),
      title,
      tag: tags,
      isPremium: true,
      id: slug,
    }));

    // const postRes = await fetch(fullPathAPI('/story/'), {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: form,
    // });

    // const status = await postRes.json();
  };

  const onChangeCaretPosition = (e) => {
    setCaretPos(e.target.selectionStart);
  };

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeTags = (e) => {
    if (e.keyCode === 13) {
      if (tags.includes(curTag)) {
        setCurTag('');
        return;
      }
      setTags((prev) => [...prev, curTag]);
      setCurTag('');
    }
  };

  const onDeleteTag = (tag) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const onChangeCurTag = (e) => {
    setCurTag(e.target.value);
  };

  const renderSaveStatus = () => {
    const value = (new Date() - saveTime) / 1000;
    if (value < 1) {
      return 'Last edit was seconds ago';
    }
    if (value < 60) {
      return `Last edit was ${Math.floor(value)} seconds ago`;
    }
    if (value < 60 * 60) {
      return `Last edit was ${Math.floor(value / 60)} minutes ago`;
    }
    if (value < 60 * 60 * 24) {
      return `Last edit was ${Math.floor(value / (60 * 60))} hours ago`;
    }
    return `Last edit was at ${moment(saveTime).format('MMMM Do YYYY, hh:mm')}`;
  };

  useEffect(() => {
    const html = document.querySelector('body');
    html.style.setProperty('background-color', '#fff');
  }, []);

  return (
    <div className={styles.container}>
      <div
        className={styles.editor}
      >
        <div className={styles.input}>
          <input value={title} onChange={onChangeTitle} placeholder="Fill your story title" />
        </div>
        <div className={styles.publishContainer}>
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                <span className={styles.tagName}>
                  {tag}
                </span>
                <i className="icon icon-close" onClick={() => onDeleteTag(tag)} aria-hidden />
              </span>
            ))}
            <input className={styles.inputTags} value={curTag} placeholder="..." onChange={onChangeCurTag} onKeyDown={onChangeTags} />
          </div>
          <PublishForm content={content} tags={tags} title={title} onChangeTitle={onChangeTitle} setSaveTime={setSaveTime} />
        </div>
        {saveTime && (
        <div className={styles.saveStatus}>
          <div>
            <span>
              {renderSaveStatus()}
            </span>
          </div>
        </div>
        )}
        <div className={styles.mdEditor} data-color-mode="light">
          <MDEditor
            value={content}
            onChange={setContent}
            onKeyUp={debounce(saveDraft, 3000)}
            onMouseUp={onChangeCaretPosition}
            height="100%"
            enableScroll
            previewOptions={{
              rehypePlugins: [[rehypeSanitize]],
            }}
            // extraCommands={[
            //   commands.group([], {
            //     name: 'update',
            //     groupName: 'update',
            //     icon: (
            //       <svg viewBox="0 0 1024 1024" width="12" height="12">
            //         <path fill="currentColor" d="M716.8 921.6a51.2 51.2 0 1 1 0 102.4H307.2a51.2 51.2 0 1 1 0-102.4h409.6zM475.8016 382.1568a51.2 51.2 0 0 1 72.3968 0l144.8448 144.8448a51.2 51.2 0 0 1-72.448 72.3968L563.2 541.952V768a51.2 51.2 0 0 1-45.2096 50.8416L512 819.2a51.2 51.2 0 0 1-51.2-51.2v-226.048l-57.3952 57.4464a51.2 51.2 0 0 1-67.584 4.2496l-4.864-4.2496a51.2 51.2 0 0 1 0-72.3968zM512 0c138.6496 0 253.4912 102.144 277.1456 236.288l10.752 0.3072C924.928 242.688 1024 348.0576 1024 476.5696 1024 608.9728 918.8352 716.8 788.48 716.8a51.2 51.2 0 1 1 0-102.4l8.3968-0.256C866.2016 609.6384 921.6 550.0416 921.6 476.5696c0-76.4416-59.904-137.8816-133.12-137.8816h-97.28v-51.2C691.2 184.9856 610.6624 102.4 512 102.4S332.8 184.9856 332.8 287.488v51.2H235.52c-73.216 0-133.12 61.44-133.12 137.8816C102.4 552.96 162.304 614.4 235.52 614.4l5.9904 0.3584A51.2 51.2 0 0 1 235.52 716.8C105.1648 716.8 0 608.9728 0 476.5696c0-132.1984 104.8064-239.872 234.8544-240.2816C258.5088 102.144 373.3504 0 512 0z" />
            //       </svg>
            //     ),
            //     children: (handle) => (
            //       <div style={{ width: 120, padding: 10 }}>
            //         <div>My Custom Toolbar</div>
            //         <button type="button" onClick={() => console.log('> execute: >>>>>', handle.getState())}>State</button>
            //         <button type="button" onClick={() => handle.close()}>Close</button>
            //         <button type="button" onClick={() => handle.execute()}>Execute</button>
            //       </div>
            //     ),
            //     execute: (state, api) => {
            //       console.log('> execute: >>>>>', state, api);
            //     },
            //     buttonProps: { 'aria-label': 'Insert title' },
            //   }),
            //   commands.divider,
            //   commands.codeEdit, commands.codeLive, commands.codePreview, commands.divider,
            //   commands.fullscreen,
            // ]}
            onPaste={async (event) => {
              await onImagePasted(event.clipboardData, setContent);
            }}
            onDrop={async (event) => {
              await onImagePasted(event.dataTransfer, setContent);
            }}
          />

          {/* <MDEditor.Markdown source={content} style={{ whiteSpace: 'pre-wrap' }} /> */}
        </div>
        <div className={styles.statusBar}>
          <span className={styles.uploading} />
          <span className={styles.autosave} />
          <span className={styles.lines}>{content.split('\n').length}</span>
          <span className={styles.words}>{content.split(/\s+/g).length}</span>
          <span className={styles.cursor}>
            {caretPos}
            :
            {content.substring(0, caretPos).split('\n').length}
          </span>
        </div>
      </div>
    </div>
  );
}

function PublishForm({
  content, setSaveTime, title, tags, onChangeTitle,
}) {
  const { slug } = useParams();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [openPublish, setOpenPublish] = useState(false);
  const [short, setShort] = useState(content.slice(0, 200));
  const [thumbnail, setThumb] = useState(THUMBNAIL_DEFAULT);

  const onChangeShortContent = (e) => {
    setShort(e.target.value);
  };

  const handleOnClose = () => {
    setOpenPublish(false);
  };

  const onPublish = async () => {
    if (!short && !title && !content) {
      alert('Please fill out the title');
    }

    setSaveTime(new Date());

    const form = new FormData();
    const file = new File([content], `${slug}.md`, {
      type: 'text/markdown',
    });

    form.append('story', file);
    form.append('data', JSON.stringify({
      contentsShort: short,
      title,
      tag: tags,
      isPremium: false,
      id: slug,
      thumbnail,
    }));

    const postRes = await fetch(fullPathAPI('/story/'), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    });

    const status = await postRes.json();

    if (status.message === 'successful') {
      handleOnClose();
      navigate(`/story/${status.data.id}`);
    }
  };

  const onClickOpenPublish = () => {
    setOpenPublish(true);
  };

  return (
    <>
      <button type="button" className={styles.publishBtn} onClick={onClickOpenPublish}>Publish</button>
      <Modal handleClose={handleOnClose} isOpen={openPublish} contentClassName={styles.form}>
        <div className={styles.newCollectionForm}>
          <div className={styles.body}>
            <div className={styles.dump}>
              <div className={styles.content}>
                <div style={{ width: '100%' }}>
                  <div className={styles.header}>
                    <h2>Publish information</h2>
                  </div>
                  <div className={styles.form}>
                    <div className={styles.title}>
                      <span style={{
                        color: 'rgba(41, 41, 41, 1)',
                        lineHeight: '20px',
                        fontSize: 14,
                      }}
                      >
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%',
                        }}
                        >
                          <div style={{ marginBottom: 10, color: 'rgba(117,117,117, 1)' }}>Title</div>
                          <div className={styles.input}>
                            <input placeholder="Give me a name" type="text" value={title} onChange={onChangeTitle} />
                          </div>
                        </div>
                      </span>
                    </div>
                    <div className={styles.title}>
                      <span style={{
                        color: 'rgba(41, 41, 41, 1)',
                        lineHeight: '20px',
                        fontSize: 14,
                      }}
                      >
                        <div style={{
                          display: 'flex',
                          flexDirection: 'column',
                          width: '100%',
                        }}
                        >
                          <div style={{ marginBottom: 10, color: 'rgba(117,117,117, 1)' }}>Content short</div>
                          <div className={styles.input}>
                            <textarea style={{ width: '100%' }} onChange={onChangeShortContent} value={short}>{short}</textarea>
                          </div>
                          <div className={styles.count}>
                            <p className={styles.validation}>Appears on your preview story, as your byline, and in your responses.</p>
                            <p className={styles.num}>
                              <span>0</span>
                              /200
                            </p>
                          </div>
                        </div>
                      </span>
                    </div>
                    <Thumbnail content={content} thumbnail={thumbnail} setThumb={setThumb} />
                  </div>
                </div>
                <div className={styles.action}>
                  <button type="button" className={styles.cancelBtn} onClick={handleOnClose}>Cancel</button>
                  <button type="button" className={styles.submitBtn} onClick={onPublish}>Publish</button>
                </div>
              </div>
            </div>
          </div>
          <i className="icon icon-close" style={{ cursor: 'pointer' }} onClick={handleOnClose} aria-hidden />

        </div>
      </Modal>
    </>
  );
}

// function Dump(handle) {
//   return (

//   );
// }

export default Editor;
