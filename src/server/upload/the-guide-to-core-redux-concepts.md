Bài viết được dịch từ nguồn: https://hackernoon.com/the-guide-to-core-redux-concepts-ncu3tcw

Trong một ứng dụng React, dữ liệu được `fetch` trong `parent component` và sau đó được truyền cho `child component` thông qua `props`.

Mọi thứ trở nên phức tạp khi có nhiều lớp `component` và `props / state` (và các `function` thay đổi `state` này) được chuyển qua nhiều `component` để đi từ điểm xuất phát đến điểm đến. Đường dẫn này có thể khó nhớ và nó để lại nhiều chỗ sai sót.

```rust
With Redux, any component can be connected directly to state.
```

Điều này không có nghĩa là dữ liệu không còn được truyền từ các `parent component` sang các `child component` thông qua `props`. Thay vào đó, con đường này hiện có thể là trực tiếp, không có `props` truyền từ `parent component` đến `child of child component`.

## What is Redux?

Về cơ bản, nó là thư viện quản lý `state` của bạn, thường được ghép nối với React, nơi nó kiểm soát `state` và đưa nó vào một nơi tập trung được gọi là `store`.

![](https://images.viblo.asia/3f85a733-b208-431f-93b2-a6d76a80abd6.jpeg)

Lần này, khi một `component` bắt đầu thay đổi, thông tin đó sẽ đi thẳng từ nó (vòng tròn màu xanh lam) đến `store`. Từ đó, thay đổi sau đó sẽ trực tiếp đến tất cả các `component` cần cập nhật.

Trước khi tìm hiểu về `code`, bạn nên nghĩ về cách thức hoạt động của Redux về mặt khái niệm. Sơ đồ dưới đây minh họa một luồng Redux điển hình.

![](https://images.viblo.asia/365f987d-bc88-4894-bf20-2f1028f2f7d0.jpeg)

### Store

`Redux Store` giữ `state` App của bạn. Có 3 khái niệm quan trọng:
- `getState()`  cho phép bạn access đến `state` (store) của App
- `dispatch(action)` cho phép update state (store)
- `subscribe(listener)` dung để register listener, cho phép bạn triger mọi lúc

### Action

Trong Redux, `action` cung cấp thông tin cho `store`. Mặc dù Redux khác với MVC, nhưng `action` về cơ bản tương đương với một mô hình trong MVC. Nó có hai tham số:

```css
const ADD_TODO = {
 type: “ADD_TODO”,
 payload: “Do stuff”
}
```

Đầu tiên là `type`, luôn phải có. `payload` có thể là bất kỳ thứ gì mô tả dữ liệu được truyền. Với dữ liệu này trong `action`, `reducer` sẽ thực hiện công việc update `store`.

### Reducer

`Reducer` thực hiện một `action` và dựa trên `type`. Nó sẽ quyết định những gì cần phải được thực hiện với dữ liệu (tức là nó sẽ ảnh hưởng như thế nào đến `store`). `Reducer` là nơi `store` được cập nhật.

### State

Cuối cùng, `state` được chứa trong `store`. Đó là một khái niệm bạn nên làm quen với `React`. Nói tóm lại, nó là một đối tượng đại diện cho các phần động của ứng dụng: bất kỳ thứ gì có thể thay đổi ở phía `client-side`.

Hãy thử tạo 1 App đơn giản sử dụng redux

## Simple App use Redux

### Step 1

Tạo App

![](https://images.viblo.asia/044e1529-bcbd-4a9a-94d7-48fc3af15553.jpeg)

### Step 2

Install dependencies:

![](https://images.viblo.asia/e05d92c0-f701-472d-b3e5-631d777bc765.jpeg)

### Step 3

Tạo những file cần thiết theo cấu trúc thư mục sau:

![](https://images.viblo.asia/fc503712-4855-40b6-b77d-0b2dbdacbf85.jpeg)

### Step 4

Để setup UI cho app, tạo file `scr/component/posts.js`

![](https://images.viblo.asia/0c121b73-e078-4c44-a435-be850982d0ca.jpeg)

![](https://images.viblo.asia/b390dcb2-c60c-4f08-b078-f2b3bc74a79c.jpeg)

Thêm file `action.js`

Ta sẽ định nghĩa những action, có thể là object hoặc là string

![](https://images.viblo.asia/ab3cb434-077e-42e3-a79c-50ef6e0cd4a9.jpeg)

Giờ ta sẽ tạo file `reducer.js`

![](https://images.viblo.asia/06eef511-bb9a-46bc-9c83-d7cf482bf44d.jpeg)

Và file `store.js`

Khi đã tạo được hết `reducer`, ta cần dùng fucntion `createStore` và đưa `reducer` vừa được tạo vào

![](https://images.viblo.asia/f56e0495-a7da-473c-9880-b586bc342287.jpeg)

Cuối cùng là tạo file `App.js`

![](https://images.viblo.asia/fad09f9f-d8ea-4854-b422-c86348cf7a12.jpeg)

`ReduxProvider` là dạng `component` có thể pass `store` tới những child component thông qua function connect (được import từ `react-redux`)

![](https://images.viblo.asia/997e5927-5aa6-4569-98c8-2097c0503636.jpeg)

1 App đơn giản được tạo ra như vậy, qua đây cũng có thể hiểu được sơ bộ cách sử dụng Redux trong App React của bạn

Cảm ơn và hi vọng bài viết có ích cho công việc của ba