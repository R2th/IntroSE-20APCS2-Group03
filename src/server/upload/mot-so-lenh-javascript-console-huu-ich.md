`console.log()` là câu lệnh huyền thoại dành cho việc debug  `Javascript`. Nhưng còn có nhiều câu lệnh khác giúp bạn có thể debug tốt hơn hoặc trí ít cũng giúp bạn có một trải nghiệm mới mẻ hơn khi debug `javascript`

Trường hợp cơ bản nhất của việc show log trong javascript là hiển thị một chuỗi
```
console.log('Is this working?');
```

Tiếp theo đến việc hiển thị một object
```
const foo = { id: 1, verified: true, color: 'green' };
const bar = { id: 2, verified: false, color: 'red' };
```
Khi hiển thị trong console sẽ như sau

![](https://images.viblo.asia/e6d6cd5f-bf00-41c6-8b5a-43f64db57bb3.png)

Bạn có thể thấy, tuy đã hiển thị được 2 object, nhưng không có tên biến hiển thị cùng. Muốn biết được tên biến thì cần phải click vào nó. Điều này có thể được giải quyết bằng cách sử dụng log như sau
```
console.log({ foo, bar });
```

Khi đó ta sẽ nhìn được tên biến tương ứng với data của nó và làm giảm số lượng dòng console.log().

# console.table()
Ở ví dụ trên, chúng ta có cách còn tốt hơn để hiển thị biến một cách dễ đọc hơn. Khi bạn cần log những biến có cùng thuộc tính hoặc một mảng các đối tượng, thì việc dùng `console.table()` sẽ thật tuyệt vời
```
console.table({ foo, bar})
```

![](https://images.viblo.asia/cbfe3a86-b668-46cf-8abd-9f5b59364f9c.png)

# console.group()
Được sử dụng khi bạn muốn nhóm hoặc lồng các log có liên quan đến nhau để dễ đọc hơn.

Nó cũng có thể được sử dụng để thấy rõ phạm vi  của từng câu `log()`

Ví dụ bạn log thông tin một người dùng
```
console.group('User Details');
console.log('name: John Doe');
console.log('job: Software Developer');
// Nested Group
console.group('Address');
console.log('Street: 123 Townsend Street');
console.log('City: San Francisco');
console.log('State: CA');
console.groupEnd();
console.groupEnd();
```

![](https://images.viblo.asia/65e96d83-2436-4302-827c-98e2b8da9197.png)

Bạn cũng có thể sử dụng `console.groupCollapsed()`  thay thế cho `console.group()` nếu bạn muốn thu gọn các group. Khi muốn hiển thị đầy đủ chỉ cần click nút mô tả phía bên trái để mở rộng

# console.warn() & console.error()

Tùy thuộc vào tình huống, bạn có thể hiển thị log dễ đọc hơn bằng cách sử dụng `console.warn()` hoặc `console.error()`

![](https://images.viblo.asia/d8cf28f4-aa3d-46dc-b501-91cb660dc5c3.png)

Ngoài ra chúng ta cũng có thể tùy chỉnh, để có thể phân biệt nhiều hơn các loại mà bạn muốn log

```
console.log('%c Auth ', 
            'color: white; background-color: #2274A5', 
            'Login page rendered');
console.log('%c GraphQL ', 
            'color: white; background-color: #95B46A', 
            'Get user details');
console.log('%c Error ', 
            'color: white; background-color: #D33F49', 
            'Error getting user details');
```

Bạn có thể thay đổi `font-size , font-style` và nhiều  CSS khác

![](https://images.viblo.asia/abc3dffc-c3e4-4947-8752-84c479080c52.png)

# console.time()
Một điều quan trọng trong lập trình là code cần chạy nhanh. `console.time()` giúp bạn biết được thời gian chạy của code
```
let i = 0;
console.time("While loop");
while (i < 1000000) {
  i++;
}
console.timeEnd("While loop");
console.time("For loop");
for (i = 0; i < 1000000; i++) {
  // For Loop
}
console.timeEnd("For loop");
```

![](https://images.viblo.asia/e6290641-13c5-4fff-970c-52cc6c228e95.png)

Hi vọng bài viết sẽ giúp ích cho các bạn những cách khác nhau để sử dụng console tốt nhất. 

# Tham khảo
Được dịch từ bài viết của tác giả Yash Agrawal
https://medium.freecodecamp.org/how-to-use-the-javascript-console-going-beyond-console-log-5128af9d573b