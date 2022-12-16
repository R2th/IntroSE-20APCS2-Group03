Developer tools console là một công cụ mãnh mẽ có sẵn giúp bạn có thể `debugging` ứng dụng web của bạn trên front-end. Console cung cấp các phương thức API giúp chúng ta dễ gỡ lỗi hơn. Nó không khó để nhìn các dev sử dụng `console.log()` hay `console.dir`  để điều tra vấn đề.  Nhưng developer tools console còn có nhiều hơn những thứ mà chúng ta thường thấy :D. Chúng ta bắt đầu với nó nhé.

-----
### 1. Các sử dụng Developer Tools Console.
Nếu trước đây bạn chưa bao giờ dùng developer tools thì đừng có lo lắng. Ở trong phần này tôi sẽ cho bạn thấy làm thế nào để truy cập và sử dụng nó. Nếu bạn đã cảm thấy quen, cảm thấy đã ok rồi thì có thê bỏ qua phần này nhé. 

Sau đây là một số cách khác nhau để bạn có thể mở trình developer tools. Cách đơn giản nhất là bạn click chuột phải trên trang web của mình và chọn `Inspect Element`. Hoặc ngoài ra bạn có thể dùng phím tắt `Alt + Command + I` với MasOS hoặc `Ctrl + Shift + I` đối với Windowns. Ta sẽ được như sau: (chúng ta chỉ quan tâm tới tab Console thôi nha và ở đây tôi dùng chrome để dùng Developer Tools Console)

> ![](https://images.viblo.asia/cf9540f7-234c-4aa3-b2f2-c78869e11816.png)

Chúng ta thử thao tác vài đường cơ bản nha. Bạn thử nhập `console.log("Hello Console")` và nhấn Enter để nhận được kết quả.
> ![](https://images.viblo.asia/dd2e1232-58d8-4dee-a474-8ffa36f7f6e3.png)
    Thực ra chúng ta có thể làm được rất nhiều thứ trên đây ví dụ bạn có thể viết các câu lệnh trên Javascipt trên này và các thứ các thứ.
   Thật tuyệt với đúng không a. Nhưng chúng ta sẽ không lan man nhiều quá chúng ta sẽ chỉ tập chung vào từ khóa `console` trong bài viết này.
### 2.    Một số method (API) đi cùng với Console.
**2.1**  **console.log(object [, object, …])**

Để bắt đầu chúng ta sẽ đi vào ngay một method mà chúng ta sẽ hay sử dụng nhiều nhất đó là `console.log()`. Đây là một methid đơn giản để ta có thể in một đối tượng ra console.
```
console.log("Đây là log , log đây log đây!")
```
Nhìn thì có vẻ in được ra mỗi một 1 log nhỉ. Vậy để có thể in ra nhiều log hơn chúng ta hay thêm dấu `phẩy` sau mỗi log nha.

![](https://images.viblo.asia/860362c4-6054-4b5c-8c11-95d9e3d8cfc3.png)

Ngoài ra chúng ta có thể format cho chúng như sau:
```
var number = 11 * 9;
var color = 'red';

console.log('%d %s balloons', number, color);
```
Và sau đây là một số format ta có thể dùng trền dev tools console

| FORMAT SPECIFIER	 1 | DESCRIPTION  |
| -------- | -------- | -------- |
| %s     | String     |
| %d or %i	     | Integer     |
| %f     | Floating point value     |
| %o     | Expandable DOM element (as displayed in the ‘Elements’ tab of the dev tools)     |
| %0     | Expandable JavaScript object|
| %c     | Formats the output using the CSS style you provide|


![](https://images.viblo.asia/920752d8-9d38-4d7e-ab64-d62de75c21e2.png)

**2.2**  **console.assert(expression, object)**

Method `console.assert` nhận vào 2 tham số, một là biếu thức  Boolean hai là một object. Nếu kết quả của biểu thức là `false` object sẽ được in ra màn hình console.

Bạn sẽ thường sử dụng tham số thứ 2 (object)là string nhưng method sẽ hoạt động với bất ky object nào của JavaScript.
```
var count  = 5
console.assert(count > 10, 'số lượng không lớn hơn 10');
```
Và biểu thức sẽ kiểm tra nếu như `count` lớn hơn 10. Nếu như không sẽ hiện thị message `số lượng không lớn hơn 10` trên console.

![](https://images.viblo.asia/f9c3d5a0-6b87-4538-830e-112f8f2edf1a.png)
**2.3**  **console.clear()**

Method `console.clear()` sẽ xóa mọi output trên cửa sổ console.

**2.4**  **console.count(label)**

Method `console.count()` sẽ đếm số lần method count() được gọi. 
```
function clickHandler() {
    console.count('Click handler called');
    ...
}
```

và cùng test với vòng lặp `for` xem kết quả thế nào nhé.
```
for (var i = 0; i < 3; i++) {
    clickHandler();
}
```

![](https://images.viblo.asia/a27c96e9-8c92-483b-bb70-6b20b55b7ef4.png)

Có một chút ý là method này không hỗ trở bở trình mặc đinh của FireFox dev tool. Thay vào đó nó sẽ được sử dụng trên Firebug console.

### 3.    References
https://blog.teamtreehouse.com/mastering-developer-tools-console