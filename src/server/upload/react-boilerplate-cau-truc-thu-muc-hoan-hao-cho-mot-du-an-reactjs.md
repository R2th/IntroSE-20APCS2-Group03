## 1. Giới thiệu
Xin chào các bạn đến với bài chia sẻ ngày hôm nay mình muốn giới thiệu với các bạn một bộ khung định hình sẵn các cấu trúc thư mục của một dự án ReactJs hoàn hảo đó là React Boilerplate.

Mình chắc các bạn đã từng tìm hiểu, code dự án ReactJs thì lúc ban đầu chúng ta học kiến thức cơ bản trên trang tutorial Reactjs thì chưa biết các cấu trúc một dự án về ReactJs. 

![](https://images.viblo.asia/ee7e25d9-f9e6-4b18-ba6c-932be3cc3850.png)

Đây là một bộ source reactjs khi chúng ta khởi tạo đầu tiên. Đối với những bạn bắt đầu thì rất khó trong việc cấu trúc các forder trong project để thuận tiện cho việc code, chưa nói đến khi chúng ta áp dụng redux, redux-saga... . Để dễ dàng hiểu cấu trúc các thư mục như nào cho phù hợp thì sau đây mình sẽ giới thiệu về thằng React Boilerplate nhé.
## 2. Cấu trúc thư mục
### 2.1 Cài đặt
Trước khi chúng ta tải source React Boilerplate về thì máy các bạn phải có version Node.js v8.15.1 và npm v5 trở lên nhé.

Để tải source code về thì các bạn chạy lệnh bên dưới trong terminal với <YOUR_PROJECT_NAME> là tên project bạn muốn đặt.
```
  git clone --depth=1 https://github.com/react-boilerplate/react-boilerplate.git <YOUR_PROJECT_NAME>
```

Các bạn chạy lệnh để cài đặt và chạy nhé:
```
  npm run setup
  npm start
```

Đê tìm hiểu rõ hơn các bạn đọc từ từ đến cuối nhé!

### 2.2 Các gói package được sử dụng

Core
- React
- React Router
- Redux
- Redux Saga
- Reselect
- Immer
- Styled Components

Unit Testing
- Jest
- react-testing-library

Linting
 - ESLint
 - Prettier
 - stylelint

React Boilerplate đã cài đặt các package cần thiết để bạn có thể lập trình code  React luôn mà không cần phải cài package nữa. Nếu package nào không dùng bạn cũng có thể gỡ bỏ nó.
### 2.3 Cấu trúc thư mục trong project

Bây giờ mình sẽ đi tìm hiểu vào cấu trúc của dự án này xem chức năng của từng phần thế nào nhé:

Thư mục app/ Đây là thư mục mà các bạn thao tác nhiều nhất nhé, nó bao gồm các thư mục:
- components/ Thư mục chứa các component của bạn, các file trong đây chịu trách nhiệm liên quan đến mọi thứ được thể hiện thế nào(view), ít khi xử lý logic bên trong nó.
- containers/ Thư mục chứa các container của bạn, các file trong container chịu trách nhiệm cung cấp data cũng như hành vi cho các components con.
- images/ Thư mục chứa hình ảnh
- tests/ Thư mục chứa các code test
- translations/ Thư mục chứa các file dịch cửa bạn. Trang web của bạn có thể hiển thị nhiều ngôn ngữ, các bạn phải định nghĩa text hiển thị trong thư mục này

- untils/  Thư mục này các bạn chứa các api kết nối với backend

Thư mục docs/
- Thư mục này chứa các file có đuôi .md đây là file tài liệu hướng dẫn các bạn.

Thư mục internals/

 - Thư mục này bạn có thể coi như động cơ của ứng dụng của bạn, nó là công cụ đóng gói toàn bộ phần mã nguồn chương trình, hình ảnh, css, font thành 1 file(1 vài file) giúp cho trình duyệt web hiểu được cũng như giảm thời gian thực thi. 

Thư mục server/
- Thư mục này chứa cấu hình server ở mội trường development, producion.
### 2.4 Một số module chính
Để hiểu hơn về một số module cần dùng trong React Boilerplate thì tôi có làm một ví dụ đơn giản đăng ký người dùng. Dưới đây là 1 forder trong thư mục containers.

![](https://images.viblo.asia/be8ea517-31e2-41f7-85cc-04e6cd3ecbe3.png)

Mình sẽ giới thiệu từng phần cho các bạn:

`constants.js`   Đây là file các bạn định nghĩa các constant cho một hành động(action)
```
    export const LOAD_UPDATE_PROFILE = 'app/SignUp/LOAD_UPDATE_PROFILE';
    export const UPDATE_PROFILE_SUCCESS = 'app/SignUp/UPDATE_PROFILE_SUCCESS';
    export const UPDATE_PROFILE_ERROR = 'app/SignUp/UPDATE_PROFILE_ERROR';

```
`actions.js`   Đây là file các bạn tạo ra các hành động khi người dùng thao tác.
- loadRegistration: hành động khi người dùng nhập thông tin và nhấn đăng ký:
- registrationSuccess: hành động khi người dùng đăng ký thành công.
- registrationError: hành động khi người dùng đăng ký thất bại.
```
import {
  LOAD_REGISTRATION,
  REGISTRATION_SUCCESS,
  REGISTRATION_ERROR
} from './constants';

// sign up
export function loadRegistration(user) {
  return {
    type: LOAD_REGISTRATION,
    user
  };
}

export function registrationSuccess(user) {
  return {
    type: REGISTRATION_SUCCESS,
    user
  };
}

export function registrationError(error) {
  return {
    type: REGISTRATION_ERROR,
    error
  };
}
```
`selectors.js`   Ở đây chúng ta sử dụng reselect là một thư viện giúp cho việc lấy dữ liệu trở nên dễ dàng hơn. Ở đây mình tạo các const lấy ra user khi đăng ký thành công, errors khi đăng ký thất bại trả về lỗi...
```
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectSignUpDomain = state => state.signUp || initialState;

const makeSelectSignUp = () =>
  createSelector(
    selectSignUpDomain,
    substate => substate,
  );

const makeUserRegistration = () =>
  createSelector(
    selectSignUpDomain,
    substate => substate.user,
  );

const makeDataRegistration = () =>
  createSelector(
    selectSignUpDomain,
    substate => substate.data,
  );

const makeErrorRegistration = () =>
  createSelector(
    selectSignUpDomain,
    substate => substate.errors,
  );

export default makeSelectSignUp;

export {
  selectSignUpDomain,
  makeSelectSignUp,
  makeUserRegistration,
  makeDataRegistration,
  makeErrorRegistration
};

```
`saga.js`  Các bạn học redux thì các bạn thường hay thấy cụm từ Middleware vậy nó là gì?  Một ứng dụng thực tế thường đòi hỏi có những thao tác xử lý cần thời gian để phản hồi ( các thao tác bất đồng bộ lấy dữ liệu từ api, đọc ghi file hay đọc cookie từ trình duyệt …). 

Các thao tác như vậy trong lập trình hàm gọi là side effects. Để giải quyết vấn đề này chúng ta sử dung redux saga nó giúp quản lý tốt  side effect đó. Để tìm hiểu chi tiết thì các bạn lên trang chủ để hiểu rõ nhé.

```
import { call, put, takeLatest, select } from 'redux-saga/effects';
import { LOAD_REGISTRATION } from './constants';
import { registrationSuccess, registrationError } from './actions';
import { makeDataRegistration } from './selectors';
import apiCaller from 'api/apiCaller';

export function* getUserRegistration() {
  const user = yield select(makeDataRegistration());

  try {
    const response = yield call(apiCaller, 'POST', 'api/v1/users/sign_up', user);
    localStorage.setItem("auth_token", response.data.auth_token);
    yield put(registrationSuccess(response.data));
  } catch (err) {
    yield put(registrationError(err.response.data));
  }
}

export default function* signUpSaga() {
  yield takeLatest(LOAD_REGISTRATION, getUserRegistration);
}

```
`messages.js ` React sử dụng thư viện react-intl cho việc thay đổi ngôn ngữ của ứng dụng, boilerplate đã config sẵn, bạn chỉ cần việc sử dụng theo CLI và hướng dẫn đã có trên document.
```
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SignUp';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the SignUp container!',
  },
});

```

`index.js`  Đây cà contaner SignUp nó connect với redux, saga, dispatch hành động khi người dùng đăng ký. React Boilerplate sử dụng cấu trúc React Hooks ở phiên bản 16.8.0 với rất nhiều tiện ích.
```
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import history from 'utils/history';;
import reducer from './reducer';
import saga from './saga';
import Form from './Form';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeUserRegistration, makeDataRegistration, makeErrorRegistration} from './selectors';
import { makeUserProfile } from 'containers/App/selectors';
import { loadRegistration } from './actions';

export function SignUp({userProfile, errors, handleSubmitRegistration}) {

  useInjectReducer({ key: 'signUp', reducer });
  useInjectSaga({ key: 'signUp', saga });

  const handleSubmit = (data) => {
    handleSubmitRegistration(data);
  }

  return (
    <Form
      handleSubmit={handleSubmit}
      user={userProfile}
      errors={errors}
    />
  );
}

SignUp.propTypes = {
  loading: PropTypes.bool,
  errors: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  userProfile: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  handleSubmitRegistration: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeUserRegistration(),
  data: makeDataRegistration(),
  errors: makeErrorRegistration(),
  userProfile: makeUserProfile()
});

function mapDispatchToProps(dispatch) {
  return {
    handleSubmitRegistration: (data) => {
      dispatch(loadRegistration(data));
    }
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SignUp);

```
`apiCaller.js ` File định nghĩa api để chúng ta sử dụng chung cho nhiều method gọi đến như (POST, GET, PUT, PATCH)
```
import axios from 'axios';

const USER_TOKEN = localStorage.getItem('auth_token');

const apiCaller = (method, subUrl, params) => {
  let common = {
    method: method,
    url: process.env.DOMAIN_API_SERVER + subUrl,
    headers: {
      auth_token: USER_TOKEN
    }
  };

  common =
    method.toUpperCase() === 'GET'
      ? { ...common, params: params }
      : { ...common, data: params };

      return axios(common);
};

export default apiCaller;

```
## Kết luận
Ok. Rất dễ dàng phải không nào, mình khuyên các bạn nên sử dụng react boilerplate này. Khi các bạn đã hiểu được cấu trúc cơ bản của nó đối với việc tổ chức cấu trúc dự án reactjs đơn thuần rất dễ dàng. 

Đến đây bài chia sẻ của mình xin phép được kết thúc. Hẹn gặp lại các bạn vào bài chia sẻ tháng sau nhé !

Cám ơn các độc giả nhé!!! :stuck_out_tongue_closed_eyes:

Tài liệu tham khảo:
https://github.com/react-boilerplate/react-boilerplate