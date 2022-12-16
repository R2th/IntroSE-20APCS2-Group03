Xin chào tất cả mọi người! Để tiếp tục loạt bài viết tìm hiểu về ReactJS thì hôm nay mình sẽ giới thiệu về một kiến trúc thiết kế không thể thiếu khi các bạn làm việc với React, đó chính là **Redux**.
<br/>

![](https://images.viblo.asia/069fa6b6-0e9b-4cdb-9c94-d84ca26db2b0.png)
## **Mở đầu** <br/>
Trong quá trình sử dụng ReactJS chắc hẳn đã có những lúc mà bạn phải cảm thấy mệt mỏi và đau đầu vì phải quản lý đám **State** trong project. Những **state** này bao gồm dữ liệu trả về từ server và dữ liệu được cache, ngoài ra các **state** dùng để quản lý User Interface cũng làm tăng độ phức tạp như lúc chúng ta cần quản lý Routes nào đang được active, element nào đang được hiển thị... Ví dụ khi change 1 **state** sẽ làm cho view được render lại, và vì được render lại nên có thể nó sẽ kéo theo sự thay đổi của 1 **state** khác. Cứ như vậy, hành động trên sẽ giống như 1 hiệu ứng domino, và khi project cần sự mở rộng thì việc kiểm soát update **state** sẽ trở nên rất khó khăn, hoặc nhất là là đối với những ai mới join vào project thì việc phải lần mò từng file để đọc hiểu code sẽ là 1 cực hình đối với họ.<br/>
<br/>
Vậy, để giải quyết được vấn đề trên thì **Redux** đã được ra đời. 
## **Khái niệm** <br/>
> **Redux** là 1 thư viện giúp chúng ta quản lý các **state** 1 cách tốt hơn. Thay vì phải truyền state qua từng Component thì **Redux** sẽ tạo ra **1 store duy nhất** dùng để thay đổi dữ liệu.
> 
<br/>
**Redux** được xây dựng dựa trên nền tảng của ngôn ngữ **Elm** và kiến trúc **Flux** do Facebook giới thiệu. Do vậy **Redux** thường là 1 thư viện không thể thiếu trong các dự án có sử dụng React. <br/>
<br/>
Để có thể có 1 cái nhìn tổng quát hơn về React thì mình khuyến khích các bạn nên tìm đọc về **Flux** và **Redux-thunk** trước khi tìm hiểu về Redux :D

## **Cấu trúc** <br/>
![](https://images.viblo.asia/4613631f-1190-4f0a-9fe2-02b477946b05.png)

Redux gồm có 4 thành phần chính là:  <br/>
- **Store**: Là 1 object lưu trữ state của toàn bộ ứng dụng, cho phép truy cập State qua getState(), update State qua dispatch(action).

```js
import {createStore} from 'redux';
import rootReducers from './reducers';

const store = createStore(rootReducers);
```

- **Action Creators**: Là nơi tạo ra các action dùng để mô tả event do người dùng tạo ra.

```js
export const selectPost = (post) => {
  return{
    type: "SELECT_POST",
    payload: post
  }
}
```

- **Reducer**: Là 1 fuction nhận đầu vào là state và các mô tả về event và dựa trên đó để trả về state tiếp theo nhưng ko thay đổi state cũ

```js
export default function activePostReducer (state = initialState, action) {
  switch (action.type){
    case "SELECT_POST":
      return action.payload;
    default:
      return state;
  }
}
```
- **View**: Hiển thị dữ liệu được cung cấp bởi Store.
## **Nguyên lý hoạt động của Redux** <br/>
- **Bước 1**: Khi có 1 sự kiện (event) như là GET, POST, UPDATE, DELETE... thì thằng action creators sẽ sinh ra 1 action mô tả những gì đang xảy ra.<br/>
- **Bước 2**: Action sẽ thực hiện điều phối Reducer xử lý event thông qua hàm `dispatch(action)`. <br/>
![](https://images.viblo.asia/7550b510-abfb-4555-8b29-7f62c9dde01f.png)
- **Bước 3**: Reducer dựa vào những mô tả của Action để biết cần thực hiện thay đổi gì trên State và thực hiện update. <br/>
- **Bước 4**: Khi State được update thì các trigger đang theo dõi state đó sẽ nhận được thông tin update và tiến hành render lại phần view để hiển thị ra cho người dùng <br/>
## **3 nguyên tắc trong Redux** <br/>
Redux được xây dựng dựa trên 3 nguyên lý:
- **Store** luôn là nguồn dữ liệu đúng và tin cậy duy nhất.
- **State** chỉ được phép đọc, cách duy nhất để thay đổi **State** là phát sinh một Action, và để Reducer thay đổi State.
- Các fuction Reducer phải là **Pure function** (với cùng 1 đầu vào chỉ cho ra 1 đầu ra duy nhất)
## **Kết luận** <br/>
Trong khuôn khổ của bài viết này mình đã trình bày những khái niệm cơ bản đầu tiên của Redux như nguyên lý, cấu trúc, và data flow để các bạn có thể nắm được cũng như hình dung nó sinh ra để làm việc gì. Để mọi người hiểu kĩ hơn về cách sử dụng và cách làm việc với Redux, mình sẽ lấy ví dụ thông qua 1 ứng dụng nho nhỏ trong bài viết sắp tới nhé.<br/>
<br/>
Xin chào và hẹn gặp lại!