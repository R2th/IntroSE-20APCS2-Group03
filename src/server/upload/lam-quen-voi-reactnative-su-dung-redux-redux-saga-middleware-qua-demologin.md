# Giới thiệu.
Chắc hẳn các bạn cũng đã quá quen thuộc với các khái niệm về `React native` như là:
- React native là gì?
- React native do "Trùm tai to mặt bự" nào phát triển?
- React native có nên học hay không? 
- Hay React native hoạt động ra sao hay có nhưng ưu nhược điểm gì?

Tất cả những câu hỏi trên đã có rất nhiều câu trả lời rồi nên mình sẽ không giới thiệu ở bài viết này! Vậy bài viết này nói cái gì????

> Mình sẽ đi qua ví dụ nhỏ là `Flow Login` mà gần như các app native đều có 
 
> Demo sẽ sử dụng `redux` và `redux-saga middleware` cũng như `axios` để có thể request API như một ứng dụng thực tế.

> Nào chúng ta thử bắt đầu `Step by step` coi sao :v: 

# Cài đặt và khởi chạy project react-native.
Để có thể code react-native thì đầu tiên chúng ta phải cài đặt môi trường và có thể tạo project cũng như có thể sử dụng máy ảo hay device thật để có thể code.

`Facebook`- cha đẻ của react-native đã có [Tutorial](https://facebook.github.io/react-native/docs/getting-started) hướng dẫn rất rõ ràng để bạn có thể khởi tạo và chạy ứng dụng. 
> Chú ý: Chúng ta thực hiện tạo project theo tab React Native CLI Quickstart trong Tutorial. Chúng ta sẽ không sử dụng Expo CLI Quickstart.


Tóm tắt một số câu lệnh khởi tạo project nếu như bạn đã cài đặt và thử chạy project react native rồi.

## Cài React-native-cli
```
npm install -g react-native-cli
```
## Sử dụng react-native-cli để khởi tạo project
```
react-native init LearningReactNative
```
## Vào thư mục project sau khi init xong.
```
cd LearningReactNative
```

## Chạy project trên máy ảo.
### Run trên ios
```
react-native run-ios
```

### Run trên android
```
react-native run-android
```
### Run trên device thật 
```
adb reverse tcp:8081 tcp:8081
```
## Xử lý clear cache hay chạy lại js
Đôi khi chúng ta: 

- Thêm thư viện js mới vào project
- Gặp những lỗi không để xử lý, không biết tại sao :v 

> Biện pháp cuối cùng là reset js và run lại project :v 

### Clear cache
```
watchman watch-del-all && \
rm -rf node_modules && \
rm -rf /tmp/metro-bundler-cache-* && \
rm -rf /tmp/haste-map-react-native-packager-* && \
yarn 
```

Xong chúng ta run lại yarn

```
yarn start -- --reset-cache
```

> Chú ý: Đối với các project chúng ta đã run `react-native run-ios/android` 1 lần rồi thì lần sau chúng ta không cần chạy lại câu lệnh này nữa mà chỉ cần 

```
yarn start
```

Là chúng ta đã có thể code tiếp được rồi.

# IDE.
Rồi chúng ta cũng chuẩn bị kha khá và cài cắm môi trường rồi. Vậy chúng ta code trên IDE nào.

Hiên tại mình sử dụng Visual studio code để code. VSCode chúng ta có thể cài cắm thêm một số plugin như: 

> vsmobile.vscode-react-native

> dbaeumer.vscode-eslint

> flowtype.flow-for-vscode

> esbenp.prettier-vscode 

Để thuận tiện hơn cho việc code.

# Bắt tay vào ví dụ.

> Chúng ta sẽ đi từng Step step nhé

## Step 1: Add Redux và redux-saga vào project.
> Chúng ta sẽ add 3 thư viện là redux và redux-saga sử dụng `yarn`

```
yarn add redux
yarn add redux-saga
yarn add react-redux
yarn start
```

> Cấu trúc thư mục.

Chúng ta sẽ sử dụng thư mục `app/*` là thư mục root chính.

Cơ bản chúng ta sẽ có những thư mục chủ yếu là `sagas, action, reducer, screen, assets, redux` là cần chú ý quan tâm.

```
- android  (Android source)
- ios (iOS source)
- node_modules 
- app
    - assets
        - fonts
        - images
    - components (global components)
    - configs
    - actions
        - ui
        - user
        - setting
        - ....
    - reducers
        - ui
        - user
        - setting
        - ....
    - sagas
    - screens
    - utils (utils components)
- ...
- ...
```

### Config redux.
Trong `app/config/redux.js`
```
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default {
  store,
};
```

> Chúng ta để ý trên phần `import` chúng ta thấy có `rootReducer` và `rootSaga`. Vậy chúng ta sẽ cùng lần lượt tạo 2 cái đó nhé!

### Config rootReducer.
Trong `app/reducers/rootReducer.js`
```
import { combineReducers } from 'redux';
import todoReducer from './todoReducer';

const rootReducer = combineReducers({ todo: todoReducer });

export default rootReducer;
```

Ở đây chúng ta có 1 cái là `todoReducer` là cái mà mình test để chạy đc reducer hay không thôi. Cơ bản nó như này.
Trong `app/reducers/todoReducer.js`

```
const initData = {
  name: 'Ha van duc',
  age: 24,
};

const todoReducer = (state = initData, { type, payload }) => {
  switch (type) {
    case 'TEST':
      return state;
    default:
      return state;
  }
};
export default todoReducer;
```

### Config rootSaga
Trong `app/sagas/rootSaga.js`

```
import { fork, all } from 'redux-saga/effects';
const sagas = function*() {
  yield all([]);
};
export default sagas;
```

### Tạo file App/index mới. Xoá bỏ App.js mặc định của React-native
> Chúng ta sẽ xoá file `App.js` mặc định của React-native đi vào tạo 1 file mới như sau:

Trong `app/index.js`

```
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import redux from './config/redux';
import { View, Text } from 'react-native';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={redux.store}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>This is Home page</Text>
        </View>
      </Provider>
    );
  }
}
```

**Chú ý: Trong file index.js (file mặc định của react-native nằm ngoài thư mục app/) chúng ta sửa lại 1 chút.**
```
import { AppRegistry } from 'react-native';
import App from './app/index';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```
 
> Đến đây bạn gần như có thể chạy để hiển thị cơ bản như 1 app `Hello world` rồi đó =)). Nếu run thành công chúng ta sẽ đến `Step 2` nào.

> Nếu có lỗi gì thì các bạn có thể tự kiểm tra và fix. Nếu có vấn đề bạn có thể comment bên dưới bài viết mình sẽ giải đáp.

> Bạn hay cố gắng chạy được từng `Step` một để có thể control được vấn đề lỗi xảy ra.

## Step 2: Add Native base và Login screen.

> Ở step 2 chúng ta sẽ cố gắng thực hiện các bước cơ bản như 

- Send 1 action
- Thực hiện xử lý reducer 
- Call API trong `Saga`. 
- Ở `Step 3` chúng ta sẽ hoàn thiện các action và luồng xử lý này.

### Add native base, apisauce.
```
yarn add apisauce
yarn add native-base
yarn add --dev plugin-proposal-decorators
react-native link
react-native run-ios/android
yarn start
```

- `Native base` là thư viện nó gần giống như bootstrap của web vậy. Nó cung cấp sẵn các component để chúng ta sử dụng.
- Bạn có thể tham khảo thêm ở [Native base](https://docs.nativebase.io/docs/GetStarted.html) nếu có lỗi cài đặt xảy ra.
- `apisauce` là một thư viện viết lại trên `axios` giúp chúng ta xử lý request dễ dàng hơn.

### Login

>  Login sẽ xử lý 1 action là bấm và nút `Login` sẽ thực hiện gọi `API login` sau đó chờ request trả về là `Success` hoặc `Failure`

### Tạo loginAction
Trong `app/actions/loginAction.js`
```
export const actionLogin = payload => ({
  type: 'HANDLE_LOGIN',
  payload,
});

export const loginSuccess = payload => ({
  type: 'LOGIN_SUCCESS',
  payload,
});

export const loginFailure = payload => ({
  type: 'LOGIN_FAILURE',
  payload,
});

export default {
  actionLogin,
  loginSuccess,
  loginFailure,
};
```

> Nếu bạn còn băn khoăn cú pháp và từ khoá của redux thì bạn có thể đọc thêm các bài viết về redux. 

> Search trên viblo cũng rất nhiều bài viết về redux khá chi tiết. Và mình không đi sâu và vấn đề này.

### Reducer
Trong `app/reducers/loginReducer.js`
```
const initData = {
  refreshToken: '',
  accessToken: '',
  isLoading: false,
  error: '',
};

const loginReducer = (state = initData, { type, payload }) => {
  console.log(`loginReducer type: ${type} with payload: ${payload}`);
  switch (type) {
    case 'HANDLE_LOGIN':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        refreshToken: payload.access_token,
        accessToken: payload.refresh_token,
        isLoading: false,
        error: '',
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isLoading: false,
        error: 'Login fail',
      };
    default:
      return state;
  }
};
export default loginReducer;
```
    
> Ở đây thực tế 2 attribute là access_token và refresh_token sẽ không được viết như vậy.

> Chúng sẽ được lưu và `Store của react-native`. Mình chỉ viết để kiểm tra code của mình có chạy đúng hay không!

> Trong `Rootreducer` chúng ta sửa:

```
# app/reducers/rootReducer.js
import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
const rootReducer = combineReducers({
  loginReducer: loginReducer,
});
export default rootReducer;
```

### Request API.
Trong `app/requests/index.js`

Chúng ta sẽ thực hiện viết API ở đây.

```
import { create } from 'apisauce';
	
const request = create({
  baseURL: 'http://5c2eb79a2fffe80014bd696b.mockapi.io/api/v1',
});

function login(username, password) {
  console.log(`Request: ${username} ${password}`);
  return request
    .post('/sign_in')
    .then(response => {
      console.log('Request response', response);
      return {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
      };
    })
    .catch(err => {
      console.log(err);
    });
}

export default {
  login,
};
```

> Chúng ta sẽ sử dụng [mockapi](https://www.mockapi.io) để tạo các request giả để bạn có thể trả về data tuỳ ý test.

### LoginSaga - Cốt lõi vấn đề. 

> Mình sẽ giải thích ở trong code nhé! Hãy đọc ở sau comment `#`

> Tất cả logic và vấn đề chúng ta để xử lý tại đây.

```
import { call, put, select } from 'redux-saga/effects';
import { actionLogin } from '../actions/loginAction';
import request from '../requests/index';
import { AsyncStorage } from 'react-native';

function* saveTokenToStore(data) {
  yield AsyncStorage.multiSet(
    [['AccessToken', data.access_token], ['RefreshToken', data.refresh_token]],
    err => {
      console.log('ERROR saveTokenToStore: ', err);
    },
  );
}

function* postLoginAction(username, password) {
  try {
    console.log(
      `Login Saga - postLoginAction: username: ${username} - password: ${password}`,
    );
    let response = yield call(request.login, username, password); # Gọi API Login ở đây.
    yield call(saveTokenToStore, response); # Nếu API gọi thành công. Chúng ta save access_token và Store
    console.log('responseresponse ------------->', response);
    yield put({ type: 'LOGIN_SUCCESS', payload: response }); # Gọi action LOGIN_SUCCESS
  } catch (err) {
    console.log('err  ------------->', err);
    yield put({ type: 'LOGIN_FAILURE', err }); # Nếu lỗi gọi action LOGIN_FAILURE
  }
}

export default function*(action) {
  console.log('Login Saga - Action', action);
  yield call(postLoginAction, action.payload.username, action.payload.password);
}
```

> Trong `RootSaga` chúng ta sửa như sau:

```
import { fork, all, takeLatest } from 'redux-saga/effects';
import loginSaga from './loginSaga';

const sagas = function*() {
  yield all([takeLatest('HANDLE_LOGIN', loginSaga)]);
};
export default sagas;
```


### Login Screen
Trong `app/screens/Login.js`

```
import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
} from 'native-base';
import { connect } from 'react-redux';
import { actionLogin } from '../actions/loginAction';

# Ở đây chúng ta sử dung plugin-proposal-decorators để thực hiện connect đến store của redux.
@connect(
  state => ({
    login: state.loginReducer, # Ở đây là loginReducer mà chúng ta đã add vào RootReducer.
  }),
  { actionLogin }, # Các action mà bạn muốn gọi trong view. Ở đây là actionLogin.
)
export default class LoginScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  handleLoginAction(event) {
    console.log(`handleLoginAction: ${JSON.stringify(this.state)}`);
    
    # Chúng ta gọi action Login khi mà user click vào button login
    this.props.actionLogin({
      username: this.state.username,
      password: this.state.password,
    });
  }

  handleUsername(text, e) {
    console.log(`text: ${text}`);
    this.setState({
      username: text,
    });
  }

  handlePassword(text, e) {
    console.log(`text: ${text}`);
    this.setState({
      password: text,
    });
  }

  render() {
    return (      
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input
                placeholder="username"
                onChangeText={this.handleUsername.bind(this)}
                value={this.state.username}
              />
            </Item>

            <Item>
              <Input
                placeholder="password"
                onChangeText={this.handlePassword.bind(this)}
                value={this.state.password}
                secureTextEntry={true}
              />
            </Item>

            <Button onPress={this.handleLoginAction.bind(this)}>
              <Text>Send</Text>
            </Button>
          </Form>

          <Text>{`${this.props.login.isLoading}` || 'Loading'}</Text>
          <Text>{this.props.login.refreshToken || 'refreshToken'}</Text>
          <Text>{this.props.login.accessToken || 'accessToken'}</Text>
        </Content>
      </Container>
    );
  }
}
```

### Sửa lại App/index.js
```
# app/index.js
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import redux from './config/redux';
import { View } from 'react-native';
import LoginScreen from './screens/Login';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={redux.store}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <LoginScreen />
        </View>
      </Provider>
    );
}
}
```

### Finish Step 2:
> Đến đây cơ bản chúng ta đã hoàn thành Step 2. Bạn có gắng chạy thử và tìm hiểu flow chạy của nó. 

### Continue with Step 3. 

> Bài viết cũng đã khá dài nên mình dừng lại ở đây.

### Còn gì nữa:

> Chúng ta sẽ làm quen với Navigation điều hướng màn hình ở react-native.

> Sử dụng LoadingView khi gọi API.

> Tìm hiểu thêm về UI trong react-native.

> Hoàn thiện flow login.

Các bạn hãy tìm hiểu thêm để hoàn thành app nhé!

# Thanks for watching...