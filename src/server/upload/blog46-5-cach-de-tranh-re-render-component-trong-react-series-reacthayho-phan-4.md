![image.png](https://images.viblo.asia/15d467ad-7d3f-4a3e-8a06-ce2d907fc573.png)

Mình là TUẤN hiện đang là một Full-stack Developer tại Tokyo 😊.
Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé 😉.

Cách tránh re-render không cần thiết trong React
---------------------------------------------------

Hiện tại thì React khá phố biến và có vô vàn tài liệu ngoài kia có thể giúp bạn chống re-render lại component nhiều lần. Tuy nhiên, nhiều Dev mới cũng có lúc cảm thấy khó khắn khi fix việc các component của mình cứ re-render khi không cần thiết. Thực ra có nhiều cách để tránh vấn đề re-render này.

Trong bài viết này, chúng ta sẽ thảo luận về 5 cách để tránh re-render không cần thiết trong các component React.

1\. Memoization bằng cách sử dụng useMemo() và UseCallback() Hooks
===================================================

**Memoization** chỉ cho phép code của bạn re-render các component nếu có thay đổi trong các `props`. Với kỹ thuật này, các bạn có thể tránh các **render** không cần thiết và giảm tải việc tính toán trong các ứng dụng.

React cung cấp hai Hook để thực hiện **Memoization**:

*   `useMemo()`
*   `UseCallback()`

Các Hooks này giảm **re-render** bằng cách lưu vào bộ đệm và trả về kết quả tương tự nếu các input giống nhau mà không cần bất kỳ tính toán nào. Khi input thay đổi, bộ đệm sẽ bị vô hiệu hóa và state component mới được **re-render**.

useMemo()
-------------

Để hiểu cách sử dụng `useMemo()` Hook, hãy xem xét một ví dụ về phép nhân 2 số.

```javascript
const multiply = (x,y) => {
  return x*y
}
```

Hàm trên sẽ tính toán kết quả và hiển thị lại component mỗi khi nó được gọi, bất kể input là gì. Tuy nhiên, nếu chúng ta sử dụng `useMemo()` Hook, chúng ta có thể tránh re-render component nếu input giống nhau và lưu kết quả vào bộ đệm.

```javascript
const cachedValue = useMemo(() => multiply(x, y), [x, y])
```

Bây giờ, kết quả tính toán được lưu trữ trong biến `cachedValue` và `useMemo()` Hook sẽ trả về kết quả đó trừ khi input bị thay đổi thì mới thực hiện tính toán lại.

UseCallback()
-----------------

`UseCallback``()` là một React Hook khác để thực hiện Memoization. Nhưng, không giống như `useMemo()`, nó không lưu trữ kết quả. Thay vào đó, nó lưu trữ callback function được cung cấp cho nó.

Ví dụ: hãy xem xét một component có danh sách mục có thể nhấp.

```javascript
import { useCallback } from 'react';
export function MyParent({ term }) {
  const onClick = useCallback(event => {
    console.log('Clicked Item : ', event.currentTarget);
  }, [item]);
  return (
    <Listitem={item} onClick={onClick}
    />
  );
}
```

Trong ví dụ trên, `useCallBack()` lưu callback của hàm được gọi khi trigger sự kiện `onClick`. Vì vậy, nó sẽ không hiển thị lại component nếu user nhấp nhiều lần vào cùng một mục.

2\. Tối ưu hóa việc gọi API với React Query
=================================================

Việc sử dụng `useEffect()` Hook cho các hoạt động tìm nạp dữ liệu asynchronous trong các ứng dụng React là rất phổ biến. Tuy nhiên, khi `useEffect()` tìm nạp dữ liệu trên mỗi render và trong hầu hết các trường hợp, nó tiếp tục load cùng một dữ liệu.

Chúng ta có một giải pháp để giải quyết việc này là có thể sử dụng thư viện [React Query](https://react-query.tanstack.com/) để lưu trữ dữ liệu `response`. Khi chúng ta thực hiện lệnh gọi API, trước tiên **React Query** sẽ trả về dữ liệu từ bộ đệm trước khi tiếp tục `request`. Sau đó, nó sẽ truy xuất dữ liệu từ **server** và nếu không có dữ liệu mới, nó sẽ ngăn component re-render.

```javascript
import React from 'react'
import {useQuery} from 'react-query'
import axios from 'axios'
async function fetchArticles(){
  const {data} = await axios.get(URL)    
  return data
}
function Articles(){
  const {data, error, isError, isLoading } = useQuery('articles', fetchArticles)
 
  if(isLoading){
    return <div>Loading...</div>
  }
  if(isError){
    return <div>Error! {error.message}</div>
  }
  return(
    <div>
      ...
    </div>
  )
}
export default Articles
```

Thư viện **React Query** có hơn ***1 triệu*** [lượt Download trên NPM](https://www.npmjs.com/package/react-query) hàng tuần và hơn 1,3 [nghìn sao trên GitHub](https://github.com/tannerlinsley/react-query).

3\. Reselect
====================================

[Reselect](https://www.npmjs.com/package/reselect) là thư viện React của bên thứ ba để tạo selectors Memoization. Nó thường được sử dụng với các **Redux stores** và có các tính năng tuyệt vời để giảm re-render không cần thiết.

*   Reselect có khả năng tính toán dữ liệu render.
*   Reselect không tính toán lại trừ khi đối số của chúng bị thay đổi.
*   Chúng có thể được sử dụng làm input cho các selectors khác.

Reselect cung cấp một API có tên `createSelector` và nó có thể tạo các hàm Memoization. Để hiểu rõ hơn, chúng ta hãy xem xét ví dụ dưới đây.

```javascript
import { createSelector } from 'reselect' 
...
const selectValue = createSelector(
  state => state.values.value1,
  state => state.values.value2,
  (value1, value2) => value1 + value2
)
...
```

Ở đây, `createSelector` lấy 2 selectors làm input và trả về phiên bản đã Memoization. Selectors sẽ không được tính toán lại với phiên bản được Memoization này cho đến khi các value được thay đổi.

Thư viện **Reselect** có hơn ***6 triệu*** [lượt Download trên NPM](https://www.npmjs.com/package/reselect) hàng tuần và hơn 18,4 nghìn [sao trên GitHub](https://github.com/reduxjs/reselect) quá phổ biến luôn pk mọi người.

4\. Thay thế useState() bằng useRef()
=====================================

`useState()` Hook được sử dụng rộng rãi trong các ứng dụng React để re-render các component khi thay đổi state. Tuy nhiên, có những trường hợp chúng ta cần theo dõi các thay đổi state mà không cần re-render các component.

Nếu chúng ta sử dụng `useRef()` Hook thì có thể theo dõi các thay đổi state mà không gây ra re-render component.

```javascript
function App() {
  const [toggle, setToggle] = React.useState(false)
  const counter = React.useRef(0)
  console.log(counter.current++)
  return (
    <button onClick={() => setToggle(toggle => !toggle)} > 
      Click 
    </button>
  )
}
ReactDOM.render(<React.StrictMode><App /></React.StrictMode>, document.getElementById('mydiv'))
```

Ví dụ trên có một `toggle` thay đổi state do đo app sẽ re-renders component mỗi khi value thay đổi. Nhưng `counter` value của nó vẫn tồn tại vì nó là một tham chiếu `mutable ref`. Khi chúng ta đang sử dụng cùng `useRef()`, nó sẽ chỉ render duy nhất. Tuy nhiên, nếu chúng ta sử dụng `useState()`, nó sẽ gây ra 2 lần hiển thị cho mỗi lần chuyển đổi (`toggle`).

5\. Sử dụng React Fragments
==========================

Nếu bạn đã từng làm việc với React trước đây khá lâu, bạn sẽ biết rằng React request gói các component bằng một component cha duy nhất. Mặc dù nó không liên quan trực tiếp đến việc re-render, nhưng bạn có biết rằng nó ảnh hưởng đến thời gian render component tổng thể.

Như một giải pháp thay thế, bạn cũng có thể sử dụng **React Fragments** để bọc các component và nó sẽ giảm tải cho DOM, dẫn đến thời gian render nhanh hơn và giảm mức sử dụng bộ nhớ.

```javascript
const App= () => {
  return (
    <React.Fragment><p>Hello<p/><p>World<p/></React.Fragment>
  );
};
```

Roundup
===========

Trong bài viết này, mình đã thảo luận về 5 cách khác nhau để ngăn việc re-render không cần thiết trong các component React. Hầu hết các giải pháp này đều tận dụng bộ nhớ đệm và bạn có thể sử dụng React Hook có sẵn hoặc thư viện hoặc dùng của bên thứ 3 để implement chúng.

Ngoài ra, các hàm này sẽ cải thiện hiệu suất ứng dụng và ngăn re-render không cần thiết đồng thời giảm tải cho bộ nhớ.

Như mọi khi, mình hy vọng bạn thích bài viết này và học thêm được điều gì đó mới.

Cảm ơn và hẹn gặp lại các bạn trong những bài viết tiếp theo! 😍

Nếu bạn thấy Blog này hay xin hãy cho mình một like và đăng ký để ủng hộ mình nhé. Thank you.😉

Ref
===========
* https://tuan200tokyo.blogspot.com/2022/11/blog46-5-cach-e-tranh-re-render.html