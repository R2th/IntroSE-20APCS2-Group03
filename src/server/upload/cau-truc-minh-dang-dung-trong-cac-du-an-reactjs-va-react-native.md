Xin chào các bạn, cũng khá là lâu rồi kể từ ngày mình cho ra bài viết gần nhất. Nhân dịp được nghỉ tết mình nhân tiện có ghé thăm lại Viblo và thấy cộng đồng IT Blogger đã càng được quan tâm hơn, nhân tiện đây mình có một bài viết được đúc kết sau một thời gian dài quay lại trong bài viết.

Chúc mọi người enjoy cái moment này!

# Mở đầu
Bản thân mình là 1 dev FullStack Mobile nên xin phép các bạn là được nói về React Native trước, nhưng các bạn cũng không nên bỏ qua bởi vì bạn biết đấy, React Native và ReactJS có cùng một dạng `CORE`. Hoặc các bạn có thể chuyển trực tiếp qua phần ReactJS thông qua phần links của Viblo.

## React Native

Dưới đây là cấu trúc một dự án mới nhất của mình bao gồm: `Typescript, Redux, Reactotron, Apolo Graphql, Sentry, App center, Formik, Onesignal, Svg, Svg charts, Reanimated,...`

![](https://images.viblo.asia/cc55b3d5-e90d-41ca-a9aa-c57240980cb8.png)

### 1. Typescript

Không thể bỏ qua nếu bạn đang gặp vấn đề với các trường hợp `undefined` trong khi code, hay khó để refactor một feature đã có, code style giữa các member không có sự chặt chẽ.

Mình sẽ sớm ra bài viết về tips sử dụng Typescipt trong dự án, chi tiết về Typescript mấy bạn có thể vào trang chủ của [Typescript](https://www.typescriptlang.org/) để xem chi tiết hơn

### 2. Redux

Các bạn nên nghĩ tới khi muốn quản lí state app một cách global và sử dụng chúng thường xuyên trong suốt khi app hoạt động.

Tuỳ thuộc vào độ phức tạp của dự án các bạn có 3 lựa chọn: `Redux thunk, React saga, Redux toolkit`. Theo bản thân mình thì thấy các bạn nên lựa chọn lib phù hợp theo tiêu chí dưới đây

- **Redux thunk**: dễ học, dễ áp dụng, phù hợp khi bạn vừa tìm hiểu về redux, dự án không lớn.
-  **Redux saga**: Nếu bạn có quy trình làm việc không đồng bộ thực sự phức tạp liên quan đến những thứ như hủy, gỡ lỗi, chạy logic sau khi một hành động nhất định được gửi đi hoặc hành vi kiểu "`background-thread`", thì hãy xem xét thêm vào.
-  **Redux-toolkit**: Khuyên bạn nên dùng và học vì một số lý do sau:

    - Config ít hơn rất nhiều so với Redux.
    - Có các hooks như `useSelector` và `useDispatch` làm cho mọi thứ trở nên ngắn gọn và dễ sử dụng.
    - đi kèm với `createAsyncThunk` cho phép bạn thực hiện các hoạt động không đồng bộ theo cách rất đơn giản như `thunk`.
    - [getState](https://redux-toolkit.js.org/rtk-query/api/createApi#basequery-function-arguments)
    - [Mutability](https://redux-toolkit.js.org/api/immutabilityMiddleware)
    - [current](https://redux-toolkit.js.org/api/other-exports#current)
   
### 3. Reactotron

Một công cụ debbug mà mình thấy tốt hơn nhiều so với cách debug 
- `In-App Developer Menu` qua chrome tương tự như trên web, nhưng tiếc là cách này chúng ta không thấy được `Network`.
- `Chrome Developer Tools`
- `React Developer Tools`
- `Inspector`

Chi tiết tại sao mình lại khen nó như vậy thì mấy bạn có thể xem [ở đây ](https://github.com/infinitered/reactotron#:~:text=Beyond%20with%20Reactotron!-,Use%20it%20to%3A,-view%20your%20application)

### 4. Apolo Graphql

GraphQL thì các bạn biết rồi đó nó là một ngôn ngữ truy vấn dành cho API, nó cho phép client có thể yêu cầu chính xác những dữ liệu mà client mong muốn nhận được từ server. Trong khi REST API thường gửi request tới rất nhiều endpoint thì GraphQL cho phép bạn gửi request tới một endpoint duy nhất để thao tác với dữ liệu.

Phù hợp cho các app cần bảo mật cao, hiện tại mình đang dùng cho một app Finance

https://www.apollographql.com/

### 5. Sentry

Không còn lạ lẫm gì với thư viện giúp debug và log lỗi này nữa

Mình sẽ copy lại phần mô tả của [Sentry](https://sentry.io/welcome/?utm_source=google&utm_medium=cpc&utm_campaign=9575834316&utm_content=g&utm_term=sentry&device=c&gclid=Cj0KCQiAgP6PBhDmARIsAPWMq6msksZMwSopaSVFEfVWMG6TtzBeiM6ToyHRY10KYBYHcKUAIh5zzfcaAtjBEALw_wcB&gclid=Cj0KCQiAgP6PBhDmARIsAPWMq6msksZMwSopaSVFEfVWMG6TtzBeiM6ToyHRY10KYBYHcKUAIh5zzfcaAtjBEALw_wcB)

> From error tracking to performance monitoring, developers can see what actually matters, solve quicker, and learn continuously about their applications - from the frontend to the backend.

### 6. App center

Hay còn gọi với tên `Codepush` giúp các bạn có thể auto deploy mobile app, update app đã được release mà không cần rebuild và upload lại lên store.

Chi tiết các bạn có thể xem [ở đây](https://appcenter.ms/)

### 7. Formik

Là một libs thay thế cho việc sử dụng Form default và tự viết các Validation, handle message cho từng lỗi.

[Formik](https://formik.org/) là một thư viện nhỏ giúp bạn 3 phần khó chịu nhất: 
- Getting values in and out of form state
- Validation and error messages
- Handling form submission

### 8. Onesignal

https://onesignal.com

 Mình hay dùng thư viện này để quản lý việc
 Send Notification. Hoặc bạn có thể tham khảo về [Firebase](https://firebase.google.com/), hai thư viện mình thấy đều đáng để tìm hiểu.
 
 ### 9. Reanimated
 
 [Reanimated](https://docs.swmansion.com/react-native-reanimated/docs) là một thư viện React Native cho phép tạo các hoạt ảnh và tương tác mượt mà chạy trên chuỗi giao diện người dùng.
 
 
## ReactJS

Thực chất code style giữa ReactJS và React Native không có gì khác nhau, các bạn chỉ cần luôn nhớ khái niệm `Component` và áp dụng chúng trước khi bắt đầu vào code là được rồi. Nếu bạn đã có kiến thức về ReactJS thì cũng không khó để bắt tay tìm hiểu về React Native.