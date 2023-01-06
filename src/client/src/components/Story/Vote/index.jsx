import classNames from 'classnames';
import React, { useState, useEffect } from 'react';
import { abbreviateNumber } from 'utils/calculate';
import { fullPathAPI } from 'utils/helpers';

import styles from './styles.module.scss';

function Vote({ token, storyId }) {
  const [vote, setVote] = useState(0);

  const [typeVote, setTypeVoted] = useState(0);

  useEffect(() => {
    const getVoteData = async () => {
      const get = await fetch(fullPathAPI(`/story/${storyId}/vote`), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = await get.json();
      setVote(data.points);
      setTypeVoted(data.isVoted || -1);
    };
    getVoteData();
  }, []);

  const onClickUpVote = async () => {
    // const post = await fetch(fullPathAPI('/story/vote'), {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //     // body : JSON.stringify({
    //     //   userId:
    //     // })
    //   },
    // });

    setTypeVoted((prev) => (prev === 1 ? 0 : 1));
  };

  const onClickDownVote = async () => {
    setTypeVoted((prev) => (prev === -1 ? 0 : -1));
  };

  return (
    <>
      <button type="button" className={styles.voteButton} onClick={onClickUpVote}>
        <i
          className={classNames(typeVote === 1 && styles.marked, 'icon icon-upvote_fill')}
          style={
            typeVote === 1
              ? {
                color: '#3b82f6',
              }
              : {}
          }
        />
      </button>
      <div
        className={classNames(typeVote !== 0 && styles.marked, styles.voteCount)}
        style={
            typeVote !== 0
              ? {
                color: typeVote === 1 ? '#3b82f6' : '#d946ef',
              }
              : {}
          }
      >
        {abbreviateNumber(vote + typeVote)}
      </div>
      <button type="button" className={styles.voteButton} onClick={onClickDownVote}>
        <i
          className={classNames(typeVote === -1 && styles.marked, 'icon icon-downvote_fill')}
          style={
              typeVote === -1
                ? {
                  color: '#d946ef',
                }
                : {}
            }
        />
      </button>
    </>
  );
}

export default Vote;
