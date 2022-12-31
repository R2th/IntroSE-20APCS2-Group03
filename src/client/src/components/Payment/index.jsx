import React from 'react';
import styles from './styles.module.scss';
const Payment = () => {
  return (
    <div className={styles.container}>
      <div className={styles.background}></div>
      <span className={styles.selectPay}>
        <p className={styles.choose}>
          1 Week
          <div>Recommend for Beginner</div>
          <div>You can see all stories with premium label</div>
          <button>$5</button>
        </p>
        <p className={styles.choose}>
          1 Month
          <div>
            You can see all stories with premium label. You can update your stories only for premium member and earn
            money. Tax for each story you earn is 5%.
          </div>
          <button>$20</button>
        </p>
        <p className={styles.choose}>
          1 Year
          <div>
            {' '}
            Are you passionate and long-term commitment to BytesGo? This is the package suitable for your necessary. You
            can see all stories with premium label. You can update your stories only for premium member and earn money
            without tax.
          </div>
          <button>$130</button>
        </p>
      </span>
    </div>
  );
};

export default Payment;
