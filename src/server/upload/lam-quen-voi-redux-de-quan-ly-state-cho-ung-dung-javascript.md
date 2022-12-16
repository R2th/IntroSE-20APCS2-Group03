## 1. Giới thiệu
Redux là một thư viện giúp bạn quản lý trạng thái (state) cho các ứng dụng javascript (kể cả js thuần). Redux ra đời lấy cảm hứng từ tư tưởng của ngôn ngữ Elm và kiến trúc Flux của Facebook. Do vậy Redux thường dùng kết hợp với React và React Native.

## 2. Redux 
Nếu các bạn đã từng sử dụng React thì sẽ biết ứng dụng React quản lý các state trong mỗi components, để chia sẽ state thì phải truyền từ component cha xuống component con hoặc cần sử dụng đến context vì vậy nó chỉ phù hợp cho các ứng dụng nhỏ, có ít state. Nhưng khi ứng dụng lớn lên và có nhiều state thì việc sử dụng context sẽ khá vất vả, rất khó phát triển và bảo trì. Redux ra đời giúp chúng ta tạo ra một `STORE` để lưu toàn bộ data vào 1 nơi và cung cấp cho toàn bộ ứng dụng.

![](https://images.viblo.asia/6e5a5b92-d1b7-4193-9044-8a43491fee1f.png)

### 2.1. Thành phần của Redux
#### Redux bao gồm 3 phần chính:
**1. Store:**

`Store` là nơi lưu tất cả state của ứng dụng. Ở đây các bạn có thể get, update, delete thông qua Actions
```javascript:js
import {createStore} from 'redux';
import rootReducers from './reducers';

const store = createStore(rootReducers);
```
**2. Action:**

`Actions` đơn giản là các hành động, events mà chúng ta tạo ra để thay đổi state
```javascript:js
export const selectPost = (post) => {
  return{
    type: "SELECT_POST",
    payload: post
  }
}
```

**3. Reducer:**

 `Reducer` là 1 fuction nhận đầu vào là state và các mô tả về event và dựa trên đó để trả về state tiếp theo
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

 ### 2.2. Follow hoạt động của Redux
 ![](https://images.viblo.asia/5df13846-5362-4dea-8321-0a8639850710.png)

 **Bước 1:** Trên componnet sảy ra một sự kiện của người dùng như là click vào 1 element, tạo, update, xóa data.

**Bước 2:** `Action` bắt được sự kiện trên component của người dùng, thực hiện tạo một hành động trong đó có type và payload (dữ liệu)

 **Bước 3:** `Action` sẽ được gửi đến `Reducer` thông qua hàm `dispatch(action)`, `Reducer` sẽ dựa vào type của `Action` để biết và lấy data ở trong `State` rồi thực hiện update data đó.

 **Bước 4:** Sau khi state đã được thay đổi thì component chứa state đó cũng sẽ rerender lại.

##  3. Kết luận
Qua bài viết thì mình muốn giới thiệu cơ bản cho các bạn về ưu điểm và nguyên lý hoạt động của Redux, trong bài viết sau mình sẽ ứng dụng Redux vào ReactJs để thực hiện quản lý state. Cảm ơn các bạn đã theo dõi bài viết của mình.