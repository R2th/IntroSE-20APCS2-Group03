import * as React from 'react';
import styles from './styles.module.scss';

function Payment() {
  let payOption = 0;
  const onClickOption = (value) => () => {
    payOption = value;
    if (payOption === '5') {
      alert(payOption);
    } else if (payOption === '20') {
      alert(payOption);
    } else if (payOption === '130') {
      alert(payOption);
    } else alert('??');
    // console.log('Pay ' + payOption);
  };

  return (
    <div className={styles.container}>
      <div className={styles.selectPay}>
        <div className={styles.option}>
          <div className={styles.text}>1 Week</div>
          <hr />
          <div>
            <ul>
              <div>
                <i className="fa fa-check" aria-hidden="true" />
                <span>View all premium labeled stories.</span>
              </div>
            </ul>
          </div>
          <button type="button" onClick={onClickOption('5')}>
            $5
          </button>
        </div>
        <div className={styles.option}>
          <div className={styles.text}>1 Month</div>
          <hr />
          <div>
            <ul>
              <div>
                <i className="fa fa-check" aria-hidden="true" />
                <span>View all premium labeled stories.</span>
              </div>
              <div>
                <i className="fa fa-check" aria-hidden="true" />
                <span>Stories only for premium members.</span>
              </div>
              <div>
                <i className="fa fa-check" aria-hidden="true" />
                <span>Uploading limited premium stories: 10</span>
              </div>
              <div>
                <i className="fa fa-check" aria-hidden="true" />
                <span>Tax: 5%.</span>
              </div>
            </ul>
          </div>
          <button type="button" onClick={onClickOption('20')}>
            $20
          </button>
        </div>
        <div className={styles.option}>
          <div className={styles.text}>1 Year</div>
          <hr />
          <div>
            <ul>
              <div>
                <i className="fa fa-check" aria-hidden="true" />
                <span>View all premium labeled stories.</span>
              </div>
              <div>
                <i className="fa fa-check" aria-hidden="true" />
                <span>Stories only for premium members.</span>
              </div>
              <div>
                <i className="fa fa-check" aria-hidden="true" />
                <span>Unlimited uploading premium stories.</span>
              </div>
              <div>
                <i className="fa fa-check" aria-hidden="true" />
                <span>Tax: 0%</span>
              </div>
            </ul>
          </div>
          <button type="button" onClick={onClickOption('130')}>
            $130
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
