# Introduction
Because the test process was quite heavy (as I had expected) so,

I am about to write an article on React Native's overall test.

Though I am talking about React Native, but it is just the same as React (except the View part).

We also need to have some knowledge [redux](https://redux.js.org/) and [redux - saga](https://github.com/redux-saga/redux-saga/blob/master/README.md) to do some extension of this test

Reference:

[Redux入門【ダイジェスト版】10分で理解するReduxの基礎](https://qiita.com/kiita312/items/49a1f03445b19cf407b7)

[redux-sagaで非同期処理と戦う](https://qiita.com/kuy/items/716affc808ebb3e1e8ac)

# Environment · Module used
I am using mac for development
- node: v10.5.0(via nodebrew)
- npm: v6.1.0
- watchman: 4.9.0

I made initial construction with [create-react-native-app](https://github.com/react-community/create-react-native-app).

The testing framework is [jest](https://jestjs.io/) because it is built in `create-react-native-app`.

We will try to use with as much detail as we know about it, but we also use a test utility that is [enzyme](https://github.com/airbnb/enzyme).

Also since I am using [firebase](https://console.firebase.google.com/u/0/?hl=en&pli=1), there is no backend configuration.

# How to execute the test
For the case of developing with the environment of `create-react-native-app`,

By default, the script under `package.json` surely looks like this::
```
  "scripts": {
    "test": "jest",
  },
```
If so, we can execute the test by following command:
```
npm test
```
Moreover, jest which is below the root and files under the `__tests__` directory are considered test files.

# Splitting Application and directory structure
Basically I think that it is better to follow some good practices of `react` and `redux`.

[A Better File Structure For React/Redux Applications](https://marmelab.com/blog/2015/12/17/react-directory-structure.html)

On the other hand, There seems to be some kind of criticism like that

"Does your app make it so huge that such a large composition is needed?"

Personally, I think that the things it pointed out was comparatively priceful.

[11 mistakes I’ve made during React Native / Redux app development](https://medium.com/dailyjs/11-mistakes-ive-made-during-react-native-redux-app-development-8544e2be9a9)

This time configuration:
```
├─App.js
├─package.json
├─enzymeSetup.js
├─.env
├─.babelrc
├─.watchmanconfig
├─.eslintrc
├─src
　├─actions
　│　├─hoge/index.js
　│　├─fuga/index.js
　│　└─\_\_tests\_\_
　│　　├─hoge.js
　│　　├─fuga.js
　├─components
　│　├─hoge/index.js
　│　├─fuga/index.js
　│　└─\_\_tests\_\_
　│　　├─eventhandler
　│　　　├─hoge.js
　│　　　├─fuga.js
　│　　└─snapshot
　│　　　├─hoge.js
　│　　　├─fuga.js
　│　　　└─\_\_snapshots\_\_
　│　　　　├─hoge.snap
　│　　　　├─fuga.snap
// Following is the configuration similar to that actions below
　├─containers
　├─daos
　├─reducers
　├─sagas
 ```
 
After this comes the bodyy that tests the part of the login form and authentication processing part

We will look at the role of the functions shown below, what we want to check (test viewpoint) and implementation method.

- components
- containers
- actions
- sagas
- daos
- reducers

## Components (View)

### Role:
- Drawing the view that is displayed to the user
- Receive an operation fired by user and generate an event

### What i want to check:
- Is there any unintended change in the design?
- Is there any event such as button click occurs as intended?

### How to execute:
Firstly is the file that we want to test:
- components/signIn/index.js
```
import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, Button } from 'react-native';

export default class SignInScreen extends React.Component {
  state = {
    email: '',
    password: '',
  };

  static propTypes = {
    signIn: PropTypes.func.isRequired,
  }

  render() {
    // Airbnb's ESLint suggests how to write about props and state but I'm not used to it yet
    const { signIn, moveSignUpPage } = this.props;
    const { email, password } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container}>
        /*
          TextInputなど
        */
        <Button
          id="signIn"
          title="Sign in"
          onPress={() => signIn({ email, password })}
        />
      </KeyboardAvoidingView>
    );
  }
}
```
### Snapshot testing:
[snapshot testing](https://jestjs.io/docs/en/snapshot-testing)
The details are as described above,

Save the snapshot with the component rendered, compare it with the previously saved snapshot, and make a test failure if there is a difference.

When the configuration of View is unintentionally changed, it can be detected quickly.

I use two modules, [react-test-renderer](https://www.npmjs.com/package/react-test-renderer) and [jest-mock](https://www.npmjs.com/package/jest-mock) for testing.

It may not work if you not yet set `transformIgnorePatterns` or `unmockedModulePathPatterns` of `package.json`.

- `components/__tests__/snapshot/signIn.js`
```
import React from 'react';
import renderer from 'react-test-renderer';
import jest from 'jest-mock';
import SignIn from '../../signIn';

const mockFn = jest.fn();

describe('signIn snapShot', () => {
  it('SignIn画面のスナップショットテスト', () => {
    const rendered = renderer.create(<SignIn signIn={mockFn} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
```

A folder named `__snapshot__` is dug in the same hierarchy of the file on which the test was executed and snapshots taken are stored there.

`components/__tests__/eventhandler/signIn.js`

### Event test:
I will use the [enzyme](https://github.com/airbnb/enzyme) developed by airbnb.

Test whether the mock function passed in the first time is called when button click (onPress) is called.

There seems to be a function called [ShallowWrapper.simulate](https://github.com/airbnb/enzyme/blob/master/docs/api/ShallowWrapper/simulate.md), and many React articles that recommend it

It did not seem to correspond to `onPress`. (It may be because the way was wrong)

I think it was a bit of a humming point.
```
import React from 'react';
import jest from 'jest-mock';
import { shallow } from 'enzyme';
import SignIn from '../../signIn';

const mockFn = jest.fn();
const wrapper = shallow(<SignIn signIn={mockFn} />);

describe('signIn eventhandler', () => {
  it('The event must be fired up when signIn button is onPress', () => {
    const signInButton = wrapper.find('#signIn');
    signInButton.props().onPress();
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledWith({
      email: '',
      password: '',
    });
  });
});
```
## Containers

### Role:
It connects the world of react (view) and the world of redux (logic)
### What i want to check:
Whether the passed state is passed correctly?

Whether the handler passed as `props` released the intended action?
### How to execute:
- containers/signIn/index.js
```
import { connect } from 'react-redux';
import { signIn } from '../../actions/authentication';
import SignIn from '../../components/signIn';

function mapStateToProps(state) {
  return {
    isLogin: state.signIn.isLogin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: authInfo => dispatch(signIn(authInfo)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignIn);
```
For the test side, as well as components, we are using shallow rendering of [enzyme](https://github.com/airbnb/enzyme)
Here I am using [redux-mock-store](https://www.npmjs.com/package/redux-mock-store).

- `container/__tests__/siginIn.js`
```
import React from 'react';
import { shallow } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import { SIGN_IN } from '../../actions/authentication';
import SignIn from '../signIn';

const mockStore = configureMockStore();
const state = {
  signIn: {
    isLogin: false,
  },
};
const emptyUserInfo = {
  email: '',
  password: '',
};

describe('SignIn Container', () => {
  const wrapper = shallow(<SignIn />, { context: { store: mockStore(state) } });

  it('isLogin must pass to Conponent', () => {
    expect(wrapper.props().isLogin).toEqual(state.signIn.isLogin);
  });

  it('Must perform SIGN_IN action after executing signIn()', () => {
    expect(wrapper.props().signIn(emptyUserInfo)).toEqual({
      type: SIGN_IN
      payload: emptyUserInfo 
    });
  });
});
```

## actions
### Role:
Fire Actions
### What i want to check:
If the action was issued as expected?
### How to execute:
- actions/authentication.js
```
import { createAction } from 'redux-actions';

export const SIGN_IN = 'AUTHENTICATION-SIGN_IN';
export const signIn = createAction(SIGN_IN);
```
- `actions/__tests__/authentication.js`
```
import { signIn } from '../authentication';

describe('authentication actions', () => {
  it('SIGN_IN action must be created', () => {
    const expectedAction = { type: 'AUTHENTICATION-SIGN_IN' };
    expect(signIn()).toEqual(expectedAction);
  });
});
```

## sagas (asynchronous processing)
### Role:
Receive Action and perform asynchronous processing such as server communication
### What i want to check:
Did it put properly the state received from the server (firebase)

### How to execute:
signInWithEmailAndPassword is a self-implemented function with reference to [redux-saga-firebase](https://github.com/n6g7/redux-saga-firebase).
- sagas/authentication.js
```
import { takeEvery, call, put } from 'redux-saga/effects';
import { SIGN_IN, setUserUid, setErrorInfo } from '../actions/authentication';
import { signInWithEmailAndPassword } from '../daos/authentication';

export function* signIn(action) {
  try {
    const authInfo = action.payload;
    const data = yield call(signInWithEmailAndPassword, authInfo);
    yield put(setUserUid(data.user.uid));
  } catch (e) {
    yield put(setErrorInfo({
      errorCode: e.code,
      errorMessage: e.message,
    }));
  }
}

export default function* authentication() {
  yield takeEvery(SIGN_IN, signIn);
}
```
Here I am using a module called [redux-saga-test-plan](https://github.com/jfairbank/redux-saga-test-plan).
I just can not deny the feeling that it just got dragged just testing here
`firebaseInit` is a function that tells the `firebase` implemented to load the setting.
- `sagas/__tests__/authentication.js`
```
import { expectSaga } from 'redux-saga-test-plan';
import { TEST_USER_EMAIL, TEST_USER_PASS, TEST_USER_TOKEN } from 'react-native-dotenv';
import { firebaseInit } from '../../daos/firebase';
import { signIn } from '../authentication';
import { SIGN_IN, SET_USER_UID, SET_ERROR_INFO } from '../../actions/authentication';

describe('authentication saga', () => {
  firebaseInit();

  const testUserInfo = { email: TEST_USER_EMAIL, password: TEST_USER_PASS };
  const wrongEmailUserInfo = { email: 'dummy@nobady.com', password: TEST_USER_PASS };

  it('The userToken update action must be fired after passing the SIGN_IN at signIn', () => expectSaga(signIn, {
    type: SIGN_IN,
    payload: testUserInfo,
  }).put({
    type: SET_USER_UID,
    payload: TEST_USER_TOKEN,
  }).run(false));

  it('If Signing In with an email that does not exist, an action to register the Firebase prescribed error message must be fired', () => expectSaga(signIn, {
    type: SIGN_IN,
    payload: wrongEmailUserInfo,
  }).put({
    type: SET_ERROR_INFO,
    payload: {
      errorCode: 'auth/user-not-found',
      errorMessage: 'There is no user record corresponding to this identifier. The user may have been deleted.',
    },
  }).run(false));
});
```

## daos (API call)
### Role:
Calls the API of firebase
### What i want to check:
If the API of firebase is called?
### How to execute:
As mentioned above, it is a function which we implemented on our own with reference to [reducex-saga-firebase](https://github.com/n6g7/redux-saga-firebase).

I wanted to manage the overall database access with this layer, so I want not to rely on modules as much as possible.

(For now it's completely being reinvented ...)
- daos/authentication.js
```
import { call } from 'redux-saga/effects';
import Firebase from './firebase';

export default function* signInWithEmailAndPassword(authInfo) {
  const auth = Firebase.auth();
  return yield call([auth, auth.signInWithEmailAndPassword], authInfo.email, authInfo.password);
}
```
- `daos/__tests__/authentication.js`
```import { call } from 'redux-saga/effects';
import { TEST_USER_EMAIL, TEST_USER_PASS } from 'react-native-dotenv';
import Firebase, { firebaseInit } from '../firebase';
import { signInWithEmailAndPassword } from '../authentication';

describe('authentication saga', () => {
  firebaseInit();
  const payload = {
    email: TEST_USER_EMAIL,
    password: TEST_USER_PASS,
  };

  it('signInWithEmailAndPassword must call the Firebase method', () => {
    const auth = Firebase.auth();
    const ganerator = signInWithEmailAndPassword(payload);
    expect(ganerator.next().value).toEqual(
      call([auth, auth.signInWithEmailAndPassword], payload.email, payload.password),
    );
  });
});
```
## reducers
### Role:
Receive the action and rewrite the value of the store according to the value of the contents

### What i want to check:
Store (state) has been rewritten as intended

### How to execute:
- reducers/authentication.js
```
import { handleActions } from 'redux-actions';
import { SET_USER_UID, SET_ERROR_INFO } from '../actions/authentication';

const defaultState = {
  userToken: '',
  errorCode: '',
  errorMessage: '',
};

export default handleActions({
  [SET_USER_UID]: (state, action) => ({
    ...state,
    userToken: action.payload,
  }),
  [SET_ERROR_INFO]: (state, action) => ({
    ...state,
    errorCode: action.payload.errorCode,
    errorMessage: action.payload.errorMessage,
  }),
}, defaultState);
```
- `reducers/__tests__/authentication.js`
```import authentication from '../authentication';
import { SET_USER_UID, SET_ERROR_INFO } from '../../actions/authentication';

const testUserToken = 'testToken';
const testErrorCode = 'testErrorCode';
const testErrorMessage = 'testErrorMessage';

describe('authentication reducer', () => {
  it('Must return the initialState if nothing is passed', () => {
    expect(authentication(undefined, {})).toEqual({
      userToken: '',
      errorCode: '',
      errorMessage: '',
    });
  });

  it('userToken must be replace after passing SET_USER_UID action', () => {
    expect(authentication(undefined, {
      type: SET_USER_UID,
      payload: testUserToken,
    })).toEqual({
      userToken: testUserToken,
      errorCode: '',
      errorMessage: '',
    });
  });

  it('errorCode and errorMessage must be replace after passing the SET_ERROR_INFO action', () => {
    expect(authentication(undefined, {
      type: SET_ERROR_INFO,
      payload: {
        errorCode: testErrorCode,
        errorMessage: testErrorMessage,
      },
    })).toEqual({
      userToken: '',
      errorCode: testErrorCode,
      errorMessage: testErrorMessage,
    });
  });
});
```
# See the Coverage
`jest` is excellent tool and it is easy to check the coverage.

You can see the coverage with the command. (Display on console & detailed output as HTML)

```
jest --coverage
```

The following is actually the coverage of the application I am making.
![](https://images.viblo.asia/f50f0cc4-b5b0-4dd8-9fbc-3b49a683a97b.png)
I have not considered the test case or something else properly yet since some coverage is at the stage where some sources are scheduled to be deleted

If you work carefully around that, you will think that this post will not lie anyway

For html users, it is possible to see detailed information of each file.

Processes not covered are displayed in red as follows.
![](https://images.viblo.asia/e40ee0e7-5eaa-4ca6-bcd8-9219faa05a0f.png)