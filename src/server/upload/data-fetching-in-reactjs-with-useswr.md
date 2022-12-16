`SWR` là một thư viện react hook dùng để fetch data.

Trước tiên nó sẽ trả cho ta một dữ liệu cũ đã được lưu trong cache, sau đó sẽ request để fetch data mới về và cuối cùng nó sẽ cập nhật lại data một cách chính xác.

Với `SWR`, các components sẽ nhận được một luồng cập nhật dữ liệu liên tục và tự động. Do đó, giao diện người dùng sẽ luôn nhanh và tương tác tốt hơn.
## 1. Quick Start
Để sử dụng được `SWR` trước tiên bạn cần phải install nó đã:

`yarn add swr` hoặc  `npm install swr`

Sau đó bạn chỉ cần sử dụng đơn giản như này là được:

```javascript
import React from "react";
import useSWR from "swr";
const todosEndpoint = "http://localhost:3001/todos";
const fetcher = async () => {
  const response = await fetch(todosEndpoint);
  return await response.json();
};
const TodoApp = () => {
  const { data: todos } = useSWR(todosEndpoint, fetcher);
  
return (
    <div>
      {todos && todos.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      )}
    </div>
  );
};
export default TodoApp;
```

Ở ví dụ trên, `useSWR` nhận 1 `key` và một hàm `fetcher`. `key` chính là một url của một api nào đó sau đó nó sẽ được chuyển đến `fetcher`. `fetcher` có thể là một `asynchronous function` và nó sẽ trả về data. Sau đó nó sẽ trả về 2 values: data và error, dựa trên status của request.

## 2. Other Features Of SWR
### Focus Revalidation:
Đây là một feature rất hữu dụng nó cho phép cập nhật lại dữ liệu một cách chính xác khi bạn focus vào một trang hoặc chuyển qua lại giữa các tab. Nó đặc biệt hữu ích khi máy tính bạn rơi vào tình trạng sleep và khi bật lên lại dữ liệu sẽ được tự động cập nhật. Mặc định feature này sẽ được enable nhưng bạn vẫn có thể tắt nó nếu không phù hợp với nhu cầu của mình với option `revalidateOnFocus`.
```javascript
const { data, error } = useSWR(key, fetcher, {
    revalidateOnFocus: false
})
```
![](https://images.viblo.asia/dffafd08-cd7d-45cf-9b33-0a2d83066ba3.gif)

### Refetch on Interval:
Feature này cho phép ta có thể fetch data lại sau một khoảng thời gian nhất định. Nó hữu ích trong việc nếu màn hình đó có dữ liệu được thay đổi thường xuyên do nhiều người dùng, nhiều thiết bị hoặc nhiều tab.

Bạn có thể enable nó bằng cách:
```js
useSWR('/api/todos', fetcher, { refreshInterval: 1000 })
```
![](https://images.viblo.asia/2405ee3a-3491-4fe2-8374-72b9d39c91a0.gif)

Điều này có nghĩa là sau mỗi 1s dữ liệu sẽ tự động được cập nhật lại để giúp cho việc tương tác với dữ liệu được hiệu quả hơn.

### Revalidate on Reconnect
Khi bạn đang dùng mạng nhưng bị mất kết nối mạng hoặc khi mở khóa máy tính nhưng internet chưa được kết nối ngay lúc đó thì `SWR` đã cung cấp cho chúng ta một giải pháp cho phép dữ liệu sẽ được cập nhật lại khi mạng được connect thành công.

Mặc định tính năng này sẽ luôn được enable bạn có thể tùy chỉnh nó ở option `revalidateOnReconnect`

### Dependent Fetching
`SWR` cho phép bạn tìm dữ liệu phụ thuộc vào một dữ liệu khác. Giống như là bạn get id của một user sau đó dựa vào userId ấy để tìm ra các project tương ứng của user.

```js
function MyProjects() {
  const { data: user } = useSWR('/api/user')
  const { data: projects } = useSWR(() => '/api/projects?uid=' + user.id)

  if (!projects) return 'loading...'
  return 'You have ' + projects.length + ' projects'
}
```

### Dedupe Requests
Feature này cho phép ta có thể loại bỏ những request trong một khoảng thời gian nhất định với cùng 1 api.

Ví dụ: như bạn có 2 select box khi A và B. Khi bạn selected vào option1 của select A thì dữ liệu ở select B sẽ được cập nhật lại ứng với dữ liệu của A đưa ra mà những dữ liệu ấy thì cần phải có request để trả về data tương ứng. Vậy khi bạn select vào option2 của A thì cũng sẽ request 1 lần như vậy vấn đề ở chỗ là nếu bạn select lại option1 thêm 1 lần nữa thì nó lại request điều này ảnh hưởng nhiều đến trải nghiệm người dùng, để khắc phục vấn đề này chúng ta chỉ cần request lại sau 1 khoảng thời gian nếu chúng ta chọn lại option đã chọn từ trước.

Vì vậy chúng ta có thêm option `dedupingInterval` để phục vụ cho việc đó:

```js
useSWR(`/api/selectB/${optionA}`, fetcher, { dedupingInterval: 5000 })
```

Điều này có nghĩa là những api đã được gọi trước đó 5s mới thì mới được gọi lại lần nữa. Còn không thì nó sẽ tự động lấy data cũ ở trong cache ra và dùng mà không cần gọi request lần nào cả.

## 3. Tổng kết
Trên đây là một số các ứng dụng của `SWR` mà mình đã tìm hiểu được. Còn rất nhiều các option hay ho khác nếu muốn các bạn có thể tự mình tìm hiểu thêm ở [đây](https://swr.vercel.app/docs/options).