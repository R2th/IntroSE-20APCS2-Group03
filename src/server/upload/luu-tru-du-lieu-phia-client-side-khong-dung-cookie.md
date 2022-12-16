# HTML5 Web Storage
Trước đây, mỗi khi muốn lưu trữ dữ liệu đơn giản ở phía client, chúng ta thường nghĩ đên cookie.

Nhưng cookie không phải là giải pháp tốt nhất, nó chỉ có thể lưu trữ khoảng 4kb, nó không được mã hóa với HTTP request và nó được include trong mọi HTTP request nên có thể làm chậm ứng dụng của bạn.

Rất may là trong phiên bản HTML 5 có giới thiệu hai kỹ thuật để lưu giữ dữ liệu được cấu trúc trên Client-Side là `session storage` và `local storage` gọi chung là web storage.

Web storage có thể được xem như là một cải tiến của cookie, giúp cung cấp dung lượng lưu trữ nhiều hơn (5MB trên ứng dụng có nguồn góc từ Google Chrome, Mozilla Firefox, and Opera, 10MB trên Internet Explorer) và dễ dàng sử dụng hơn.

Nhưng Web Storage có nhược điểm là không được hỗ trợ bởi các phiên bản từ IE7 trở xuống, vì vậy nó sẽ không thể hoạt động trên các trình duyệt IE cũ.

Sử dụng đoạn code dưới đây sẽ giúp ta kiểm tra trình duyệt có hỗ trợ localStorage hay là không.
```
if (typeof(Storage) !== "undefined") {
    // Có hỗ trợ local storage
} else {
    // Không hỗ trợ local storage
}
```
### Local Storage
LocalStorage lưu trữ dữ liệu vô thời hạn, dữ liệu sẽ không bị mất nếu bạn không sử dụng chức năng clear history của trình duyệt, hoặc bạn sử dụng localStorage API để xóa.

Local Storage có hai thao tác chính đó là gán dữ liệu và lấy dữ liệu. Để lưu dữ liệu thì ta dùng phương thức setItem(key, value) và để lấy dữ liệu thì ta dùng phương thức getItem(key).

VD:
```
if (typeof(Storage) !== "undefined") {
    localStorage.setItem('foo', 'bar');
    console.log(localStorage.getItem('foo'));
} else {
    document.write('Trình duyệt của bạn không hỗ trợ local storage');
}
```
Bạn mở console của trình duyệt sẽ thấy trên màn hình console in ra chuỗi "bar".

### Session Storage
SessionStorage cũng có công dụng tương tự như LocalStorage, chỉ có một điểm khác đó là dữ liệu của sessionStorage sẽ mất khi bạn đóng trình duyệt.

SessionStorage củng không tồn tại hai phương thức getItem và setItem.

VD:
```
if (typeof(Storage) !== "undefined") {
    // Gán dữ liệu
    sessionStorage.foo = 'Bar';
     
    // Lấy dữ liệu
    var domain = sessionStorage.foo;
} else {
    document.write('Trình duyệt của bạn không hỗ trợ local storage');
}
```


# Store.js
Store js là 1 thư viện giúp lưu trữ dữ liệu trên các trình duyệt mà không cần sử dụng cookie hoặc flash. 
Nó khăc phục được những nhược điểm của web storage là chỉ hỗ trợ trình duyệt phiên bản từ IE7 trở lên.
## Basic Usage
### API

Store.js cung cấp một API đơn giản để lưu trữ cục bộ trên nhiều trình duyệt khác nhau:

```
// Store current user
store.set('user', { name:'Marcus' })

// Get current user
store.get('user')

// Remove current user
store.remove('user')

// Clear all keys
store.clearAll()

// Loop over all stored values
store.each(function(value, key) {
	console.log(key, '==', value)
})
```
### Cài đặt

**Cài đặt qua npm**
```
npm i store
```
Cách sử dụng store.js với npm

```
var store = require('store')
store.set('user', { name:'Marcus' })
store.get('user').name == 'Marcus'
```
**Sử dụng qua thẻ script **

Tải thư viện store.js về rồi import vào hoặc sử dụng link cdn `<script src="https://cdn.jsdelivr.net/npm/store-js@2.0.4/dist/store.legacy.min.js"></script>`. 

VD.
```
<!-- Example store.js usage with script tag -->
<script src="path/to/my/store.legacy.min.js"></script>
<script>
    store.set('user', { name:'Marcus' })
    store.get('user').name == 'Marcus'
</script>
```

### Plugins
Các plugin cung cấp thêm 1 số chức năng phổ biến mà một số người dùng có thể cần đến:
* defaults: Dùng để khai báo các giá trị mặc định.
```
store.defaults({ foo: 'bar' })
```
* dump: Dùng để dump tất các các giá trị đang được lưu.
```
store.set('foo', 'bar');
store.set('cat', { mat:true });
store.set('hat', 'bat');			
console.log(store.dump());
store.clearAll();
console.log(store.dump());
```
![](https://images.viblo.asia/1b3313a5-0801-4565-a3dd-47298621ee47.png)

Và một số plugin khác như
* expire: Cài đặt thời gian lưu trữ cho dữ liệu.
* observe: Theo dõi sự thay đỗi của các dữ liệu.
* operations: Hỗ trợ các toán tử như push, shift và assign
* update: Cập nhật một đối tượng được lưu trữ nếu nó đã tồn tại hoặc tạo mới nó nếu chưa tồn tại.
Bạn có thể xem chi tiết tại [đây](https://github.com/marcuswestin/store.js/#plugins)


>Các bạn có thể tham khảo thêm tại :
>https://www.queness.com/post/16273/localstorage-made-easy-with-storejs
>https://github.com/marcuswestin/store.js