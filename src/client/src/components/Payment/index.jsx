import * as React from 'react';
import CoWork from 'assets/svg/cowork.svg';
import {
  PAYMENT_PLANS,
} from 'utils/const';
import FandQ from './FandQ.json';
import styles from './styles.module.scss';

function Payment() {
  const [payOption, setPayOption] = React.useState(0);

  const onClickOption = (value) => () => {
    setPayOption(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.premiumHeader}>
        <h2 className={styles.welcomeHeadline}>
          Join the millions of LinkedIn members using Premium to get ahead.
        </h2>
        <div className={styles.proofContainer}>
          <div className={styles.centerContainer}>
            <div className={styles.imgModel}>
              <ul className={styles.imgViewModel}>
                {['1', '2', '3'].map((value) => (
                  <li className={styles.imgListItem} key={value}>
                    <div className={styles.imgWrapper}>
                      <img
                        src="https://viblo.asia/images/mm.png"
                        alt="Premium Member"
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <span className={styles.visuallyHidden}>Premium Member</span>
            </div>
            <p className="social-proof__text t-black t-16">
              Thang and millions of other members use Premium
            </p>
          </div>
        </div>
        <span className={styles.welcomeNotice}>
          Start your free 1-month trial today. Cancel anytime. We
          {'\''}
          ll send you a reminder 7 days before your trial ends.
        </span>
      </div>
      <div className={styles.selectPay}>
        <div className={styles.selectLayout}>
          <div className={styles.content}>
            <main id="main" className={styles.layoutMain}>
              <div className={styles.premiumChooser}>
                <div className={styles.atlas}>
                  <Section
                    onClickOption={onClickOption}
                    color="var(--premium-color-plan-3)"
                    value={1}
                    chooser={payOption}
                    header="Standard"
                    description="Recommend for beginners"
                    body={['Reading premium stories.', 'Following other premium users.']}
                    price="100.000đ"
                  />
                  <Section
                    onClickOption={onClickOption}
                    color="var(--premium-color-plan-4)"
                    value={2}
                    chooser={payOption}
                    upgradedFrom="All Standard features, plus:"
                    header="Premium"
                    description="Grow up yourself everyday"
                    body={['Reducing ads.', 'Write premium stories.']}
                    price="250.000đ"
                  />
                  <Section
                    onClickOption={onClickOption}
                    color="var(--premium-color-plan-5)"
                    value={3}
                    chooser={payOption}
                    upgradedFrom="All Premium features, plus:"
                    header="Business"
                    description="New big ideas effecting culture"
                    body={['No ads.', 'Earning more money from your stories.', 'Save 5%.']}
                    price="400.000đ"
                  />
                  <Section
                    onClickOption={onClickOption}
                    color="var(--premium-color-plan-6)"
                    value={4}
                    chooser={payOption}
                    upgradedFrom="All Premium features, plus:"
                    header="Senior"
                    description="Grow and nurture your network"
                    body={['No ads.', 'Earning more money from your stories.', 'Reach top trending, recommendation.', 'Save 10%.']}
                    price="650.000đ"
                  />
                </div>
                {payOption !== 0 && (
                <div className={styles.premiumChooserRedeemAtlas}>
                  <div className={styles.container}>
                    <div className={styles.left}>
                      <div>
                        <h2 className={styles.featureName}>
                          Feature Details
                        </h2>
                        <span className={styles.description}>
                          Premium Business members get an average of 6X more profile views
                        </span>
                      </div>
                      <div className={styles.imgViewModel}>
                        <div style={{ display: 'flex' }}>
                          <img src={CoWork} alt="co-work" />
                        </div>
                      </div>
                      <div style={{ marginTop: 48, marginBottom: 16 }}>
                        <div id="premium-atlas-purchase-feature-cta" style={{ marginLeft: 8 }}>
                          <button type="button" className={styles.artdecoBtn}>
                            <span className="artdeco-button__text">
                              Start my free month
                            </span>
                          </button>
                          <p style={{ fontWeight: 600 }}>
                            After your free month, pay as little as ₫1,125,000.00* / month when billed annually
                          </p>
                          <p style={{ color: 'rgba(0,0,0,0.6)' }}>
                            Cancel anytime. We
                            {'\''}
                            ll remind you 7 days before your trial ends.
                          </p>
                          <span
                            tabIndex="-1"
                            id="ember36"
                            style={{
                              display: 'inline-flex',
                            }}
                          >
                            <button type="button" className={styles.secureBtn}>
                              <li-icon aria-hidden="true" type="locked" class="artdeco-button__icon" size="small">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" className="mercado-match" width="16" height="16" focusable="false">
                                  <path d="M12 6V5a4 4 0 00-8 0v1a2 2 0 00-2 2v5a2 2 0 002 2h8a2 2 0 002-2V8a2 2 0 00-2-2zm-3 6H7V9h2zM6 6V5a2 2 0 014 0v1z" />
                                </svg>
                              </li-icon>
                              <span className="artdeco-button__text">
                                Secure checkout
                              </span>
                            </button>
                            <div id="artdeco-gen-42" className="ember-view"><div id="ember39" className="ember-view" /></div>
                          </span>

                        </div>
                      </div>

                    </div>
                    <ul className={styles.features}>
                      <FeatureGroup
                        value={payOption}
                      />
                    </ul>
                  </div>
                  <ul>
                    <hr />
                    <FaQ />
                  </ul>
                </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureGroup({
  value,
}) {
  const renderList = () => (
    <li>
      <div
        className={styles.card}
        aria-disabled="false"
      >
        <ul>
          {PAYMENT_PLANS[`PAYMENT_PLANS_${value}`].map((content) => (
            <div style={{
              marginRight: 10,
              top: 2,
              position: 'relative',
              padding: 7,
            }}
            >
              <li-icon aria-hidden="true" type="check" size="small">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-supported-dps="16x16" fill="currentColor" className="mercado-match" width="16" height="16" focusable="false">
                  <path d="M12.57 2H15L6 15l-5-5 1.41-1.41 3.31 3.3z" />
                </svg>
              </li-icon>
              {' '}
              <span>
                {content}
              </span>
            </div>
          ))}
        </ul>
      </div>
    </li>
  );

  return (
    <li className={styles.featureGroup}>
      <div>
        <div style={{ fontWeight: 600 }}>Find and contact anyone</div>
        <p style={{ color: 'rgba(0,0,0,0.6)', margin: 0 }}>
          Find and contact the right people to grow your network and see who
          {'\''}
          s viewed your profile
        </p>
        <ul>
          {renderList()}
        </ul>
      </div>
    </li>
  );
}

function Section({
  onClickOption, color, chooser, header,
  description, body,
  upgradedFrom,
  value,
  price,
}) {
  return (
    <section
      className={styles.premiumPlanCard}
      style={chooser !== value && chooser !== 0 ? {
        filter: 'grayscale(100%)',
        opacity: 0.5,
      } : {}}
      onClick={onClickOption(value)}
      aria-hidden
    >
      <div
        className={styles.accentBar}
        style={{
          background: `linear-gradient(to bottom, ${color} 8px, hsla(0, 0%, 100%, 0) 8px)`,
        }}
      />
      <div className={styles.planCardContainer}>
        <div className={styles.top}>
          <div
            className={styles.header}
            style={{
              color,
            }}
          >
            {header}
          </div>
          <h3>
            {description}
          </h3>
        </div>
        <hr className={styles.divider} />
        <div className={styles.cardBody}>
          <p style={{ marginBottom: 16, fontWeight: 600 }}>{upgradedFrom}</p>
          <ul>
            {body.map((content) => (
              <div key={content}>
                <i className="fa fa-check" aria-hidden="true" />
                <span>{content}</span>
              </div>
            ))}
          </ul>
        </div>
        <button className={styles.emberView} type="button" onClick={onClickOption(value)}>
          {price}
        </button>
      </div>
    </section>
  );
}

function FaQ() {
  return (
    <section className={styles.frame_FAQ}>
      <h2>Frequently asked questions</h2>
      <div className={styles.FQ}>
        {FandQ.map((question) => <h3 className={styles.question}>{question.question_1}</h3>)}
        {FandQ.map((question) => <span className={styles.question}>{question.answer_1}</span>)}
        {FandQ.map((question) => <h3 className={styles.question}>{question.question_2}</h3>)}
        {FandQ.map((question) => <span className={styles.question}>{question.answer_2}</span>)}
        {FandQ.map((question) => <h3 className={styles.question}>{question.question_3}</h3>)}
        {FandQ.map((question) => <span className={styles.question}>{question.answer_3}</span>)}
        {FandQ.map((question) => <h3 className={styles.question}>{question.question_4}</h3>)}
        {FandQ.map((question) => <span className={styles.question}>{question.answer_4}</span>)}
      </div>
      <div className={styles.FQ}>
        {FandQ.map((question) => <h3 className={styles.question}>{question.question_5}</h3>)}
        {FandQ.map((question) => <span className={styles.question}>{question.answer_5}</span>)}
        {FandQ.map((question) => <h3 className={styles.question}>{question.question_6}</h3>)}
        {FandQ.map((question) => <span className={styles.question}>{question.answer_6}</span>)}
        {FandQ.map((question) => <h3 className={styles.question}>{question.question_7}</h3>)}
        {FandQ.map((question) => <span className={styles.question}>{question.answer_7}</span>)}
      </div>
    </section>
  );
}

export default Payment;
