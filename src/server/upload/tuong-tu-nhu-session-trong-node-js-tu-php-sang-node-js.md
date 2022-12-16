# Mở đầu
Nếu bạn đang theo ngôn ngữ PHP và muốn tìm hiểu thêm về NodeJS thì bạn có thể tham khảo bài viết này để sử dụng những thứ "na ná" nhau trong PHP và NodeJs đấy :D
# Tương tự như Session trong Node JS?
Nếu bạn đang tìm kiếm thứ gì đó giống như Session trong PHP thì hãy đọc về Node-persist nhé.

**Session** trong PHP dùng để lưu trữ dữ liệu tạm thời và từ đó hệ thống có thể đưa ra những quyết định về quyền hạn hoặc là những tùy chọn riêng tư. Session dùng để lưu trữ dữ liệu trên Server và đồng thời nó sẽ có một đoạn code dữ liệu được lưu trữ ở client (cookie).

**Node-persist** là một Module được xây dựng dành cho NodeJS, đây là Module có công dụng tương tự như LocalStorage trong HTML5 và Sesion trong PHP. **Node-persist** không sử dụng database để lưu trữ dữ liệu mà thay vào đó nó sẽ lưu vào một file trong hệ thống hoặc trong bộ nhớ với nội dung là chuỗi JSON hoặc file (có tên theo key).

Vì dữ liệu lưu trữ trong bộ nhớ RAM hoặc ổ đĩa (disk) nên tốc độ xử lý dữ liệu lưu trữ của **Node-persist** không kém phần lưu trữ trong database. **Node-persist** sử dụng phương thức `localStorage` trong HTML5 nên việc tiếp xúc nó rất dễ dàng.

Để sử dụng **Node-persist**, bạn cần cài đặt **Node-persist** đã. Mở Node JS Command prompt lên và `cd` tới thư mục project rồi nhập vào đoạn mã sau:
```javascript
npm install node-persist@0.0.8 --save
```
Để kiểm tra xem đã tải về được chưa, các bạn vào thư mục `node_modules` và xem trong file `package.json` xem đã thấy chưa nhé!

#   Sử dụng Node-persist
## 1.  Khai báo:
Trước khi sử dụng đương nhiên là phải sử dụng `require` để tạo đối tượng đó:
```javascript
var storage = require('node-persist');
```

## 2. Hàm khởi tạo:

Khi sử dụng **Session**, ta phải đăng ký `session_start()` phải không?

Bây giờ với **Node-persist**,  ta phải thiết lập hàm khởi tạo để nó load tất cả các key lưu trữ trong ổ cứng.
```javascript
storage.initSync();
// hoặc
storage.init().then(promise);
```
Hàm khởi tạo này sẽ có một tham số truyền vào ở dạng Object, trong đó có nhiều key và bạn cần chú ý đến 2 key như sau:
```javascript
storage.init({
    dir : "path/to/save",
    ttl : false
});
 
storage.initSync({
    dir : "path/to/save",
    ttl : false
});
```
Trong đó key `dir` là đường dẫn lưu trữ dữ liệu. Nếu bạn không thiết lập thì nó sẽ lưu vào đường dẫn như sau: `node-modules/node-persist/storage/persist`. Còn nếu bạn thiết lập thì nó sẽ lưu vào đường dẫn `node-modules/node-persist/storage/duong_dan`

Còn `ttl` (time to live) là thời gian sống của dữ liệu, nếu thiết lập `false` thì nó sẽ sống vĩnh viễn.

Đối với hàm `init()` thì tất cả những phần xử lý có sử dụng các hàm của **Node-persist** đều phải đặt trong `promise` nhé, nếu không sẽ bị lỗi ngay.
```javascript
storage.init().then(function(){
    // Gọi các hàm setItem, getItem
});
```


**Lưu ý**: 
* Hàm nào có chữ sync tức là đồng bộ, còn không có chữ sync là bất đồng bộ
* Khi bạn khởi tạo bằng hàm `init()` thì các hàm còn lại phải sử dụng không Sync, còn khi bạn sử dụng `initSync()` thì các hàm còn lại phải sử dụng có Sync. Điều này có nghĩa là khởi tạo hàm nào thì các hàm còn lại phải dùng ở chế độ tương tự.
* Nếu thiết lập dạng Sync thì dữ liệu sẽ lưu trên disk, vì vậy bạn có thể sử dụng ở các request tiếp theo.
* Nếu thiết lập dạng không Sync thì dữ liệu sống trong request đó thôi.
* 
## 3. Lưu trữ

Với **Session**, tất cả Session được lưu trữ trong biến toàn cục `$_SESSION`, và để lưu 1 giá trị mới vào Session, ta dùng cú pháp: 
```php
$_SESSION['session_name'] = $session_value
```

Còn với **Node-persist**, hàm `set` được sử dụng để thiết lập giá trị cho 1 key:
```javascript
storage.setItem('item_name', 'item_value');
// hoặc
storage.setItemSync('item_name', 'item_value');
```

## 4. Lấy giá trị

Trước khi lấy giá trị Session, ta phải kiểm tra session đó có tồn tại chưa rồi mới lấy ra:
```php
if (isset($_SESSION['name'])) {
    echo 'Name: ' + $_SESSION['name'];
}
```
Với **Node-persist**, ta sử dụng `get` để lấy giá trị của key nào đó:
```javascript
storage.getItem('name');
// hoặc
storage.getItemSync('name');
```

## 5. Xóa

Để xóa 1 Session đơn lẻ, sử dụng hàm
```php
unset($_SESSION['session_name'])
```
Trong đó hàm unset dùng để giải phóng một biến ra khỏi bộ nhớ, và truyền vào tên của Session muốn xóa đi.

Ngoài ra nếu muốn xóa tất cả các Session một lúc, có thể sử dụng `session_destroy();`

Trong **Node-persist**, `remove` là hàm dùng để xóa 1 key:
```javascript
storage.removeItem('domain');
// hoặc
storage.removeItemSync('domain');
```
Hoặc chúng ta cũng có thể xóa hết tất cả trong 1 lượt như xóa Session :)
```javascript
storage.clear();
// hoặc
storage.clearSync();
```
Hy vọng là bài viết này sẽ giúp bạn dễ dàng hơn khi chuyển từ PHP sang Node JS :D.
Mọi người có thể chờ bài viết tiếp theo trong series **[Từ PHP đến Node JS](https://viblo.asia/s/tu-php-sang-nodejs-bq5QL7EElD8)** của mình nhé :)

Ngoài ra nếu muốn tìm hiểu nhiều hàm hơn về Node-persist, hãy tham khảo tại đây nhé: https://github.com/simonlast/node-persist