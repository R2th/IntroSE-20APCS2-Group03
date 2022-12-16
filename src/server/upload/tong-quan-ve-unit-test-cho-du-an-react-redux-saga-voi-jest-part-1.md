Như mọi người đã biết thì viết test rất quan trọng trong tất cả các dự án, nhưng hầu hết các dev-er đều bỏ qua khâu này. Mà chỉ coi trọng vào phần implement code logic cho từng feather của dự án. 

Mình cũng đã từng nghĩ như vậy cho đến 1 ngày đẹp trời, khách hàng yêu cầu apply test cho dự án. Và mình phải bắt đầu tìm hiểu mọi thứ liên quan đến làm sao để viết test được bây giờ. 

# Jest
Câu trả lời chắc ai cũng biết là hỏi anh google và hàng loạt các câu trả lời từ anh google, và và tên jest được xướng tên. Jest ngay khi vào trang chủ nó đã nói lên tất cả 
> Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
> 
Doc của cụ này khá là clear nên mọi người cần phần nào, thì vào doc xem [tại đây](https://jestjs.io/docs/en/api)

# Các thành phần cần test của 1 dự án dùng react redux saga

Trong dự án React redux saga, thì phần test được chia làm khá nhiều thành phần nhưng chủ yếu gồm 4 thành phần sau đây 

###  Unit test cho các compoment 
###  Unite test cho redux saga
### Unit test cho  reducer
### Unit test cho action

Mỗi thành phần lại có các cách viết khác nhau, mình sẽ đi qua 1 lượt từng cụ để các cụ từ dễ đến khó để các cụ có cái nhìn tổng thể nhất nhé

## Action

Cụ này là dễ viết unit test nhất trong tất cả các thành phần liệt kê ở trên. Action là 1 object có 2 thành phần là type và playload nên việc viết unit test khá là đơn giản  ví dụ đơn giản như sau 

```
test('has a type of DEFAULT_ACTION', () => {
  const expected = {
    type: DEFAULT_ACTION,
  };
  expect(defaultAction()).toEqual(expected);
});
```

## Reducer
Đối với reducer để test được trước hết chúng ta phải khỏi tạo giá trị default state sau đó mới test cho từng event của từng action cái mà làm thay đổi store 

Chúng ta hãy xem một ví dụ về login action sau đây 

```
import { LOGIN_ACTION } from './constants';
const initialState = fromJS({
  loginLoading: false,
});

const loginContainerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ACTION:
      return state.set('loginLoading', true)
   }   
```

Đoạn code trên thực hiện thay đổi **loginLoading** khi chúng ta bấm submit form, có 1 icon loading hiện lên thông báo thông tin đang được gửi đi. Để thực hiện được điều này đơn giản chúng ta thay đổi giá trị  **loginLoading** từ false chuyến sang true. Cứ khi nào **loginLoading**  equal true là hiển thị một icon loading.

Chúng ta xem ví dụ dưới đây thực hiện việc unit test cho **LOGIN_ACTION** 

```
mport { fromJS } from 'immutable';
import loginContainerReducer from '../reducer';
import { loginAction } from '../actions';

describe('loginContainerReducer', () => {})
test('reducer loginAction', () => {
    const initialState = fromJS({
      loginLoading: false,
    });
    const action = loginAction();
    expect(
      loginContainerReducer(initialState, action).get('loginLoading'),
    ).toEqual(true);
  });
```

Cũng đơn giản phải không nào, nhưng ví dụ trên là hết sức đơn giản. Những trường hợp phức tạp chúng ta cần **mockReturnValue**. Mock value, function như thế nào, các bạn lên [JestJS]  xem thêm thông tin nhé.

# Saga

Tiếp theo chúng ta sẽ xử đến cụ saga, saga làm nhiệm vụ kết nối đến server và **put** action update store value hoặc handle error nếu có exption hoặc lỗi trả về từ sever.

Thông thường có 2 loại saga function regular function và async function. Đối với từng loại thì lại có cách viết khác nhau

Chúng ta xem xét 2 ví dụ sau đây.

### 1. Async function
```
import {
  loginActionSuccess,
  loginActionFailure,
} from './actions';

// async function
export function* signin = async (username, password) => {
 const data = new FormData();
  data.append('username', username);
  data.append('password', password);

  const response = await fetch('http://localhost/login', {
    method: 'POST',
    body: data
  });
  return response;
};

export function* loginActionHandler(data) {
  const { username, password } = data;
  try {
    const user = yield call(signin, username, password);
    yield put(loginActionSuccess(user));
  } catch (err) {
    yield put(handleError(err));
  }
}
```

### 2. Regular function 
```
export function* handleError(error) {
  if (error.code === 403) {
    yield put(loginActionFailure(error));
  } else {
    yield put(setGlobalError(error)
  }
}
```

Qua ví dụ trên các bạn đã thấy sự khác nhau giữa Async function và Regular function rồi chứ.

Việc test cho async và regular cũng có những điểm khác biệt nhau.

Test cho regular function thì đơn giản hơn rất nhiều chúng ta không cần mock return value

Xem xét ví dụ sau

```
describe('should handleError', () => {
    test('should call handleError internal', () => {
      const error = { code: 403 };
      const generator = handleError(error);
      expect(generator.next().value).toEqual(put(loginActionFailure(error)));
    });
    test('should call handleError global error', () => {
      const error = { code: 500 };
      const generator = handleError(error);
      expect(generator.next().value).toEqual(put(setGlobalError(error));
    });
  });
```

Còn đối với async function và compoment , chúng ta sẽ có 1 bài khác nói riêng về vấn đề này

bật mí riếng đối với component chúng ta sử dụng thêm một thư viện **enzyme** kết hợp với Jest để test compoment. Hẹn gặp lại các bạn ở bài tiếp theo Part 2.