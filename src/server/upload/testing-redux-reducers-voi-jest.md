# Reducers
Chỉ cần tham khảo nhanh reducer là gì trước khi chúng ta bắt đầu testing và code.
[Redux documentation](http://redux.js.org/docs/basics/Reducers.html) vẫn là rất tuyệt vời, trong thực tế nó đã bao gồm [ unit tests ](https://redux.js.org/recipes/writing-tests#reducers) bạn thậm chí không bao giờ phải đọc bài này.
Tóm lại reducer là một pure function có state trước đó và một action, và trả về state tiếp theo.

Nếu bạn quan tâm học làm sao để test redux actions bất đồng bộ, Đọc tại đây [Testing async redux actions with Jest](https://medium.com/@netxm/test-async-redux-actions-jest-e703add2cf91).

# Pure functions
Bởi vì nó là một [pure function](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976) nên nó dễ dàng để test.
### Về pure function
* Nó là một function không tạo ra side effects
* Nó đưa vào cùng đầu vào sẽ luôn trả về cùng đầu ra
* Không dựa vào trạng thái bên ngoài
# Jest 
### Cài đặt
yarn add --dev jest hoặc npm install --save-dev jest
### chạy test
* ```  yarn test ``` hoặc ``` npm test ```  sẽ tìm toàn bộ file với đuôi .test và thi hành.
* ```  yarn test src/store/topics/reducer.js ``` hoặc ``` npm test src/store/topics/reducer.js```  sẽ chỉ test file reducer theo đường dẫn đã nhập.

# What to test
Thông thường reducer bao gồm initial state và switch statement để sử lý mọi action.
Tôi thích chia nhỏ store trong các sub-stores khác nhau và có các reducers tách rời cho mỗi sub-store.
Thỉnh thoảng một switch/case có thể sử lý một vài action, bởi vì logic nghiệp vụ là như nhau và kết quả là như nhau.
Một ví dụ  GET_POST and UPDATE_POST nên cập nhật cùng một store và tạo ra cùng một kết quả.

Nó là quan trọng để test reducers. Đó là nơi logic nghiệp vụ nên xảy ra và là nơi new application state đuợc hình thành dựa vào bên ngoài (API) hoặc dựa vào phản hồi bên trong application.

# Boilerplate
Như bất kì unit test nào, Nó bắt đầu với thiết lập boilerplate và viết những đơn vị test trống chỉ để phác thảo cái gì cần test. Tôi thích test initial state và sau đó mỗi switch/case trong reducer xem nếu action.payload sẽ tạo store mong muốn.
Nếu bạn dừng và nghĩ về nó -- Nó chỉ đơn giản là.
``` js
import reducer from './getPostsReducer';
import * as types from '../actions/posts/getPostsReduxAction';
import expect from 'expect';

describe('team reducer', () => {
  it('should return the initial state');
  it('should handle GET_POST_SUCCESS');
  it('should handle UPDATE_POST_SUCCESS');
  it('should handle GET_POST_FAIL');
  it('should handle GET_POST_START');
});
```
# Add tests and mock data
Từ đây, chúng ta chỉ cần bắt đầu điền những test ở trên từng cái một. Tôi cũng thích tạo mock files và lưu trữ các phản hồi từ API tại lúc testing.
Nên tôi có thể test lại dữ liệu thật. Chiến lược này đã phát hiện ra vài thay đổi API ngẫu nhiên trong đó phản hồi đã được thay đổi mà không có bất kỳ cảnh báo nào.
Thay vì trách cứ bất kì ai chúng ta chỉ cần tìm trong mock data và nhìn xem kì vọng cái gì trên front end.

``` js
import reducer from './getPostReducer';
import * as actions from '../actions/posts/getPost';
import { UPDATE_POST_SUCCESS } from '../actions/posts/updatePost';
import expect from 'expect';
import getPostMock from '../mocks/getPostMock';

describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle GET_POST_START', () => {
    const startAction = {
      type: actions.GET_POST_START
    };
    // it's empty on purpose because it's just starting to fetch posts
    expect(reducer({}, startAction)).toEqual({});
  });

  it('should handle GET_POST_SUCCESS', () => {
    const successAction = {
      type: actions.GET_POST_SUCCESS,
      post: getPostMock.data, // important to pass correct payload, that's what the tests are for ;)
    };
    expect(reducer({}, successAction)).toEqual(getPostMock.data);
  });

  it('should handle UPDATE_POST_SUCCESS', () => {
    const updateAction = {
      type: UPDATE_POST_SUCCESS,
      post: getPostMock.data,
    };
    expect(reducer({}, updateAction)).toEqual(getPostMock.data);
  });

  it('should handle GET_POST_FAIL', () => {
    const failAction = {
      type: actions.GET_POST_FAIL,
      error: { success: false },
    };
    expect(reducer({}, failAction)).toEqual({ error: { success: false } });
  });
});
```
Có unit test cho tất cả reducer sẽ ngăn ngừa bất kì vấn đề gì liên quan đến global application state. Nó đặc biết hữu dụng nếu có nhiều API khác nhau được gọi và mỗi lần gọi sẽ thay đổi một state.
Thật dễ dàng để phá vỡ toàn bộ application state với một tái cấu trúc nhỏ mà không nhận ra nó.

# ref
[Testing redux reducers with Jest](https://medium.com/@netxm/testing-redux-reducers-with-jest-6653abbfe3e1)