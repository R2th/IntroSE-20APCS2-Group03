Xin chào tất cả, bài viết này mình xin chia sẻ một chút kiến thức hiểu biết được về `Redux`, mong mọi người theo dõi.
### 1) Redux là gì?

**Redux js** là một thư viện `Javascript` giúp tạo ra thành một lớp quản lý trạng thái của ứng dụng. Được dựa trên nền tảng tư tưởng của ngôn ngữ **Elm** kiến trúc **Flux** do Facebook giới thiệu, do vậy Redux thường là bộ đôi kết hợp hoàn hảo với React (`ReactJs` và `React Native`).

### 2) Tại sao lại nên sử dụng Redux

- Giả sử chúng ta có 1 ứng dụng các node như trong hình là tượng trưng cho một single page application
![](https://images.viblo.asia/17c30308-83b0-4426-b720-e778efc8ba94.png)

- Giả sử có một hành động nào đó được kích hoạt ở node d3 và ta muốn thay đổi trạng thái (state) ở d4 và c3 thì luồng dữ liệu sẽ được truyền từ node d3 trở về node a rồi từ node a mới truyền được đến các node d4 và c3

![](https://images.viblo.asia/ae11e19e-0b80-45de-9d2c-315c500bf6ba.png)

    
>   Cập nhật trạng thái (state) cho node d4: d3-c2-b1-a-b2-c4-d4
>   
>   Cập nhật trạng thái (state) cho node c3: d3-c2-b1-a-b2-c3

Với những bài toàn nhỏ thì chúng ta hoàn toàn có thể dùng `ReactJs` để cập nhật các trạng thái (`state`) một cách dễ dàng mà không cần dùng đến `Redux`. Nhưng nếu là một bài toàn lớn thì sao lúc này nếu chỉ sử  dụng `ReacJs` để cập nhật các trạng thái (`state`) thì thật sự là một khó khăn rất là lớn. Từ những nhược điểm trên thì Redux ra đời nhằm khắc phục nhược điểm đó.

![](https://images.viblo.asia/aa13761d-ff40-4d00-93b9-1545b6690b8f.png)

Từ hình vẽ ta thấy để giải quyết bài toán trên ta chỉ cần `dispatch` một action từ node d3 về store rồi d4 và c3 chỉ cần connect tới store cà cập nhật data thay đổi thế  là bài toán được giải quyết một cách dễ  dàng.

- Để cài đặt `Redux` cho ứng dụng của bạn thì bạn chạy lệnh sau:
```
npm install --save redux
```

### 3) Nguyên lý của Redux

`Redux` được xây dựng dựa trên 3 nguyên lý như sau:

- Trạng thái (`state`) của toàn bộ ứng dụng được lưu trong trong 1 store duy nhất là 1 Object mô hình tree
- Chỉ có 1 cách duy nhất để thay đổi trạng thái (`state`) đó là tạo ra một action (là 1 object mô tả những gì xảy ra)
- Để chỉ rõ trạng thái (`state`) tree được thay đổi bởi 1 action bạn phải viết pure reducers
![](https://images.viblo.asia/3ba0e90f-1834-45b1-a5ab-a6f58abf21a0.gif)
*Hình ảnh minh họa nguyên lý hoạt động của Redux.*

### 4) Cách sử dụng Redux cơ bản

Nếu muốn sử dụng `Redux`, chúng ta cần nhớ 4 thành phần chính của `Redux` : `Store`, `Views` , `Actions`, và `Reducers`. Chi tiết 4 thành phần được mô tả như sau:

- **Store**: Là nơi quản lý trạng thái (`state`), có thể truy cập để lấy trạng thái (`state`) ra, `update` `state` hiện có, và `listener` để nhận biết xem có thay đổi gì không, và cập nhật qua `views`.
```js
    import { createStore } from 'redux';
    ...
    const store = createStore(myReducer);
    console.log('Default:', store);
```

Khi bạn mở trình duyệt và bật F12 lên thì ta nhận được kết quả như sau:
![](https://images.viblo.asia/ef9d798a-7d4a-474b-95e6-dc85e452ee2e.png)
trong đó, có 3 phương thức quan trọn bạn cần chú ý đó là:
> **getState()**: Giúp lấy ra state hiện tại
> 
> **dispatch(action)**: Thực hiện gọi 1 `action`
> 
> **subscrible(listener)**: Luôn lắng nghe xem có thay đổi gì ko rồi ngay lập tức cập nhật ra `View`
-   **Actions** : nó là 1 pure object định nghĩa 2 thuộc tính lần lượt là type: kiểu của action, ví dụ như ‘TOGGLE_STATUS’, `payload`: giá trị tham số mà action creator truyền lên.

```js
var action = { 
    type : 'TOGGLE_STATUS',
    payload : // tham số
};
```
- **Reducers**: Khác với actions có chức năng là mô tả những thứ gì đã xảy ra, nó không chỉ rõ state nào của response thay đổi, mà việc này là do `reducers` đảm nhiệm, nó là nơi xác định state sẽ thay đổi như thế nào, sau đó trả ra một state mới.
```js
var myReducer = (state = initialState, action) => {
    if (action.type === 'TOGGLE_STATUS') {
        let newState = {...state}
        newState.status = !state.status;
        return newState; // muc dich cua reducer la tra ra cai state moi
    }
    return state;
}
```

- **View**: Hiển thị dữ liệu được cung cấp bởi Store

Để hiểu rõ hơn chúng ta cùng đi vào ví dụ sau:

```js
import { createStore } from 'redux';

//khoi tao state ban dau
var initialState = {
    status : false
}

var myReducer = (state = initialState, action) => {
    if (action.type === 'TOGGLE_STATUS') {
        let newState = {...state}
        newState.status = !state.status;
        return newState;// muc dich cua reducer la tra ra cai state moi
    }
    
    return state;
}

const store = createStore(myReducer); // Khởi tạo store

console.log('Default:', store.getState());

// Thuc hien cong viec thay doi status
var action = { type : 'TOGGLE_STATUS'};

store.dispatch(action); // luc nay action o tren myReDucer chinh la action nay

console.log('TOGGLE_STATUS', store.getState());
```

Chạy lên chúng ta nhận được kết quả như sau:
![](https://images.viblo.asia/2762ed06-128a-4c95-8d69-683ef3b1970f.png)

Phân tích ví dụ trên một chút ta có:

- Bước 1: Khởi tạo `store` cho project và tham số nhận vào là một reducer myReducer

```js
const store = createStore(myReducer);
```

- Bước 2: Sau đó ta muốn thay đổi trạng thái của status thì ta gọi một action với type là "TOGGLE_STATUS" dùng hàm `dispatch()` của store:
```js
store.dispatch(action);
```

- Bước 3: Lúc này là nhiệm vụ của `reducer`, sẽ phân tích action được gửi lên là gì và sau đó xử lý và cuối cùng trả ra một state mới

```js
var myReducer = (state = initialState, action) => {
    if (action.type === 'TOGGLE_STATUS') {
        let newState = {...state}
        newState.status = !state.status;
        return newState;// muc dich cua reducer la tra ra cai state moi
    }
    
    return state;
}
```

- Bước 4: Hàm `subcrible()` trong store sẽ làm nhiệm vụ cập nhật tình hình thay đổi ra View.

Trên đây là nguyên lý hoặt động cơ bản của Redux.

> *action -> reducer -> store -> view*
> 
### Kết luận

Trên đây là một chút kiến thức mà mình tìm hiểu được về Redux, rất mong được sự góp ý của mọi người.
Cảm ơn mọi người đã theo dõi bài viết của mình.

**Nguồn tham khảo**

- https://redux.js.org/
- https://viblo.asia/p/redux-cho-nguoi-moi-bat-dau-part-1-introduction-ZjleaBBZkqJ