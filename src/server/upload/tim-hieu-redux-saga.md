**I. Khái Niệm**

1. Middleware:
     - Để hiểu redux-saga là gì thì đầu tiên ta cần biết về khái niệm middleware.
     - Vậy middleware là gì?
     - Ngay từ cái tên ta đã đoán được middleware là trung gian, mà ở đây chính là một lớp trung gian nằm giữa Dispatch Action và Reducers. Nó sẽ được gọi trước khi một action được dispatch.
     - Để hiểu rõ hơn ta có thể nhìn vào hình ảnh sau đây.
     
     ![](https://images.viblo.asia/9c480752-906b-4daf-bf18-fb2d7f8e3f28.png)
    - Tại đây middleware nằm giữa action và reducers, và nó thực hiện gọi đến API. Vậy ta có thể tưởng tượng rằng middleware giống như một gián điệp trung gian trà trộn vào một tổ chức, nhiệm vụ của người gián điệp này là ngồi đợi tên trùm giao nhiệm vụ (action) cho đàn em của hắn(reducers), thực hiện một phi vụ buôn mai thúy sang đông Lào. Lúc này người gián điệp đánh điện báo cho cấp trên ( gọi API) để tiến hành vây bắt. Thế là kết quả của phi vụ này bị thay đổi. Tên trùm bị ngồi tù, đàn em thì giải tán.
2. Side Effect:
    - Side Effect thì ta có thể hiểu đơn giản là một action nào đó thực hiên một công việc tốn thời gian mà ta không định lượng được hoặc ta không care được, thí dụ: Đọc dữ liệu từ ổ cứng, gọi API lấy dữ liệu,....
3. Generator function:
    - Để hiểu được sự hoạt động của redux saga bạn cần hiểu một số khái niệm cơ bản như generator function. Generator function là function có khả năng hoãn lại quá trình thực thi mà vẫn giữ nguyên được context.
    - Khác với function bình thường là thực thi và trả về kết quả, thì Generator function có thể thực thi, tạm dừng trả về kết quả và thực thi bằng tiếp. Từ khóa để làm được việc đấy là “YIELD”.
    - Nói một cách đơn giản thì generator function là 1 function có khả năng tạm ngưng trước khi hàm kết thúc (khác với pure function khi được gọi sẽ thực thi hết các câu lệnh trong hàm), và có thể tiếp tục chạy tại một thời điểm khác. Chính chức năng mới này giúp ta giải quyết được việc bất đồng bộ, hàm sẽ dừng và đợi async chạy xong rồi tiếp tục thực thi.
4. Redux-Saga:
    - Khái niệm: Từ những ý trên ta có thể tóm gọn Redux-Saga là một thư viện redux middleware, giúp quản lý những side effect trong ứng dụng redux trở nên đơn giản hơn. Bằng việc sử dụng tối đa tính năng Generators (function*) của ES6, nó cho phép ta viết async code nhìn giống như là synchronos.
   
**II. Redux-Saga hoạt động như thế nào?**

![](https://images.viblo.asia/5c795b02-6db4-4023-a94e-9c1d39451edd.gif)
- Đối với logic của saga, ta cung cấp một hàm cho saga, chính hàm này là hàm đứng ra xem xét các action trước khi vào store, nếu là action quan tâm thì nó sẽ thực thi hàm sẽ được thực thi.
- Một function trong saga là một generator function có dạng `function* simpleSagaFunction() { yield console.log('hello world'); }` ở đây mình tạm gọi đây là một saga function.
- Qua ví dụ ở trên bạn có thấy một đặc điểm thú vị của redux-saga mang lại. Đúng vậy chính là nó `yield`, đây là  một helper vô cùng hữu ích. Bởi vì khi ta cần một thao tác nào đó tốn thời gian thì việc đồng bộ luồng hoạt động là vô cùng cần thiết, `yield` giúp ta ta xử lý vấn đề đó. Thực chất ở đây, `yield` sẽ cho dừng không chạy đoạn lệnh tiếp theo cho đến khi `next() `được gọi.
- Một số helper trong redux saga:
    + takeEvery() : thực thi và trả lại kết quả của mọi actions được gọi.
    + takeLastest() : có nghĩa là nếu chúng ta thực hiện một loạt các actions, nó sẽ chỉ thực thi và trả lại kết quả của của actions cuối cùng.
    + take() : tạm dừng cho đến khi nhận được action.
    + put() : dispatch một action.
    + call(): gọi function. Nếu nó return về một promise, tạm dừng saga cho đến khi promise được giải quyết.
    + race() : chạy nhiều effect đồng thời, sau đó hủy tất cả nếu một trong số đó kết thúc.
    
    
**III. Hướng dẫn cài đặt và sử dụng Redux-Saga**

- Hữu ích như vậy nhưng làm thế nào để ta có thế áp dụng saga vào project của chúng ta?
1. Đầu tiên ta cần install redux-saga vào trong project:
    `$ npm install --save redux-saga`
    or
    `$ yarn add redux-saga`
2. Cấu hình lại store để thêm middleware vào giữa luồng đi của action và reducer 


        import { createStore, applyMiddleware } from 'redux'
        import createSagaMiddleware from 'redux-saga'

        import reducer from './reducers'
        import mySaga from './sagas'

        // create the saga middleware
        const sagaMiddleware = createSagaMiddleware()
        // mount it on the Store
        const store = createStore(
          reducer,
          applyMiddleware(sagaMiddleware)
        )

        // then run the saga
        sagaMiddleware.run(mySaga)

        // render the application
    
 3. Tạo file mySaga đã được import ở trên:
     
            import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
            import Api from '...'

            // worker Saga: will be fired on USER_FETCH_REQUESTED actions
            function* fetchUser(action) {
               try {
                  const user = yield call(Api.fetchUser, action.payload.userId);
                  yield put({type: "USER_FETCH_SUCCEEDED", user: user});
               } catch (e) {
                  yield put({type: "USER_FETCH_FAILED", message: e.message});
               }
            }

            /*
              Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
              Allows concurrent fetches of user.
            */
            function* mySaga() {
              yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
            }

            /*
              Alternatively you may use takeLatest.

              Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
              dispatched while a fetch is already pending, that pending fetch is cancelled
              and only the latest one will be run.
            */
            function* mySaga() {
              yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
            }

            export default mySaga;
      
            
**IV. Kết luận**
- Ở bài viết này mình tập trung giải thích một số khái niệm để các bạn hình dung được saga nó là cái gì. Nó hoạt động ra làm sao.
- Các bạn có thể tham khảo thêm tại https://redux-saga.js.org/.