**Tiêu đề bài viết có vẻ khá bình thường, nhiều bạn sẽ nghĩ "Xời, có gì đâu mà không biết, ba cái này tôi làm hoài!"... thì đúng là như thế thật! Tuy nhiên, ở đây sẽ có 1 số điều thú vị với `window.location`, ngoài những thứ mà các bạn đã biết (hy vọng vậy), còn ai đã biết hết rồi thì...thôi :sweat_smile:**

*Lưu ý: Bài viết chống chỉ định với Senior Developer* :slightly_smiling_face:

![](https://images.viblo.asia/4ed1c2bd-289a-43b5-ac93-9f3adc40da1a.jpg)

Khi code React, thường thì đa số mọi người sẽ dùng React-router-dom vì support sẵn nhiều tính năng nổi bật. Tuy nhiên, trong 1 số trường hợp mình vẫn thích dùng `window.location`, một phần vì tính tiện lợi khi không phải import module, phần nữa vì lười...

### 1. Các Properties
Thông thường, để get các thông tin của URL thì ta sẽ dùng cú pháp `window.location`, trình duyệt sẽ trả về 1 object chứa các thông tin của trang hiện đang truy cập hoặc các method để thao tác như redirect, refresh...

![](https://images.viblo.asia/346e31a9-643c-4f89-915d-6a64d514eff6.png)

Ngoài `window.location`, còn có 3 cách khác để truy cập vào Location:

```javascript
window.location          => Location
window.document.location => Location
document.location        => Location
location                 => Location
```

Trong cả 4 cách trên, đều return về **Location** chứa 1 object. Cú pháp `location` có vẻ đơn giản nhất nhưng lại không được khuyên dùng nhiều, bởi vì nó dễ gây nhầm lẫn và sinh ra lỗi nếu trong code của bạn cũng có biến cùng tên.

Ngoài ra, không chỉ có thể gọi các thuộc tính này để lấy thông tin URL, có thể sử dụng nó để set các giá trị mới và thay đổi URL. Ví dụ:

```javascript
window.location.port = '9999';
```

Tương tự với các thuộc tính còn lại đều có thể set giá trị mới cho nó, trừ thuộc tính `origin`, thuộc tính này chỉ được phép đọc (read only)

```javascript
window.location
 .protocol = 'https'
 .host     = 'localhost:8080'
 .hostname = 'localhost'
 .port     = '8080'
 .pathname = 'path'
 .search   = 'query string'
 .hash     = 'hash'
 .href     = 'url'
```

### 2. Các Method

`window.location` cung cấp cho chúng ta 4 phương thức là `assign`,  `replace`, `reload` và `toString`. 

```javascript
window.location.assign()   => Redirect đến URL được chỉ định
               .replace()  => Redirect đến URL được chỉ định và xóa lịch sử của trang hiện tại
               .reload()   => Tải lại trang hiện tại
               .toString() => Trả về địa chỉ URL hiện tại
```

#### 2.1. window.location.assign() và window.location.replace()

Cả hai phương pháp này sẽ giúp bạn chuyển hướng hoặc điều hướng đến một URL khác. Sự khác biệt là `.assign()` sẽ lưu trang hiện tại của bạn trong history trước khi chuyển đến URL được chỉ định. Vì vậy, khi user thao tác back trở lại trình duyệt sẽ trả về trang trước đó. Trong khi với `.replace()` thì không, khi user thao tác back trở lại, sẽ trả về blank page hoặc 1 trang trước đó nữa. Ví dụ: 
> Bước 1: Mở 1 tab mới
> 
> Bước 2: Truy cập www.w3schools.com
> 
> Bước 3: Truy cập www.developer.mozilla.org
>
> Bước 4: 
> 
> Nếu dùng `window.location.assign('www.google.com')` // Khi back trở lại sẽ về www.developer.mozilla.org
> 
> Nếu dùng `window.location.replace('www.google.com')` // Khi back trở lại sẽ về www.w3schools.com
> 
Vậy câu hỏi đặt ra là giữa `href` và `.assign()` có gì khác nhau, vì cả 2 đều có mục đích là chuyến đến 1 URL được chỉ định? Thoạt nhìn thì `assign` có vẻ như ngữ nghĩa hơn vì nó là một function nên có cảm giác như đang thực hiện một hành động nào đó. Ngoài ra, có một điểm cộng là việc viết test sẽ dễ dàng hơn, ví dụ:

```javascript
window.location.assign = jest.fn();

redirectFunc();

expect(window.location.assign).toBeCalledWith('https://www.google.com/');
```

Nhưng đối với `href` thì qua một số bài test performance chạy trên Chrome, nó nhanh hơn khoảng...15% so với `.assign()`. Vì vậy, quyết định chọn cái nào có lẽ còn phụ thuộc vào hoàn cảnh nữa... :grinning:
#### 2.2. window.location.toString

> Phương thức này trả về String của URL. Đây là phiên bản read-only của `window.location.href`

Nói cách khác, bạn có thể get giá trị href thông qua 2 cách:

```javascript
window.location.href
window.location.toString()
```

Trên đây là 1 số kiến thức, khái niệm cơ bản về `window.location` trong Javascript. Ngoài ra, còn nhiều khái niệm, chủ đề liên quan đến `window.location` các bạn có thể tham khảo thêm ở đây:

* [https://www.w3schools.com/js/js_window_location.asp](https://www.w3schools.com/js/js_window_location.asp)
* [https://guide.freecodecamp.org/javascript/window-location/](https://guide.freecodecamp.org/javascript/window-location/)
* [https://stackoverflow.com/questions/10302905/location-href-property-vs-location-assign-method](https://stackoverflow.com/questions/10302905/location-href-property-vs-location-assign-method)
* [https://stackoverflow.com/questions/1034621/get-the-current-url-with-javascript](https://stackoverflow.com/questions/1034621/get-the-current-url-with-javascript)
* [https://medium.com/@marikalam/how-do-you-redirect-to-another-page-in-javascript-6c7524c1f88a](https://medium.com/@marikalam/how-do-you-redirect-to-another-page-in-javascript-6c7524c1f88a)

Cảm ơn tất cả mọi người đã theo dõi bài viết. Xin chào và hẹn gặp lại! :heart_eyes: