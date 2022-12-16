# 1. Giới thiệu
Vòng đời của VueJS hay còn gọi là cách thức, cơ chế hoạt động của VueJS. Khi tạo 1 đối tượng, cập nhật, hay hủy bỏ ... đều được đưa vào vòng đời của VueJS. Ở đây mình xin nhắc tới khái niệm Hooks. Hooks có thể được hiểu là các phương thức, các hàm được cung cấp sẵn, có thể can thiệp vào từng giai đoạn của vòng đời. Để hiểu rõ hơn, chúng ta cùng xem qua sơ đồ
![](https://images.viblo.asia/0c5829d4-1df7-4905-a2bc-3ec4b3cae8a3.png)
# 2. Các hooks trong vuejs
## 2.1 BeforeCreate
* Kiểu: Function
* Mô tả: Được gọi đồng bộ ngay sau khi instance được khởi tạo, trước khi quan sát dữ liệu và thiết lập event/watcher
## 2.2 Created
* Kiểu: Function
* Mô tả: Được gọi đồng bộ sau khi instance được tạo. Ở giai đoạn này, instance đã xử lý xong các tùy chọn có nghĩa là các thiết lập sau đã được thiết lập: quan sát dữ liệu, thuộc tính được tính toán (computed), phương thức (method), event/watcher callback. Tuy nhiên, giai đoạn mounting chưa được bắt đầu và thuộc tính $el sẽ không có sẵn.
## 2.3 BeforeMount
* Kiểu: Function
* Mô tả: Được gọi ngay trước khi quá trình mounting bắt đầu: function render được gọi lần đầu tiên và không được gọi trong quá trình render bên phía server
## 2.4 Mounted
* Kiểu: Function
* Mô tả: Được gọi sau khi instance đã được mounted, trong đó $el được thay thế bằng vm.$el mới được tạo. Nếu phiên bản gốc được gắn vào một phần tử trong tài liệu, vm.$el cũng sẽ ở trong tài liệu khi được gắn kết được gọi
* Lưu ý rằng mounted không đảm bảo rằng tất cả các thành phần con cũng đã được mounted. Nếu bạn muốn đợi cho đến khi toàn bộ view được hiển thị, bạn có thể sử dụng vm.$nextTick bên trong mounted :
    ```js
    mounted: function () {
      this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been rendered
      })
    }
    ```
* Nó không được gọi trong quá trình render bên phía server
## 2.5 BeforeUpdate
* Kiểu: Function
* Mô tả: Được gọi khi dữ liệu thay đổi, trước khi DOM được cập nhật. Đây là một nơi tốt để truy cập DOM cũ trước nó được cập nhật, ví dụ: để loại bỏ listeners được thêm thủ công
* Nó không được gọi trong quá trình render bên phía server
## 2.6 Updated
* Kiểu: Function
* Mô tả: Được gọi sau khi thay đổi dữ liệu khiến DOM ảo được render lại và update.
* Thành phần của DOM sẽ được cập nhật khi hook này được gọi, vì vậy bạn có thể thực hiện các hoạt động phụ thuộc DOM tại đây. Tuy nhiên, trong hầu hết các trường hợp, bạn nên tránh thay đổi trạng thái bên trong hooks này.
*  Để phản ứng với những thay đổi trạng thái, thay vào đó, sử dụng một tài sản hoặc người theo dõi được tính toán tốt hơn.
*  Lưu ý rằng updated không đảm bảo rằng tất cả các thành phần con cũng đã được re-render. Nếu bạn muốn đợi cho đến khi toàn bộ chế độ xem được re-render, bạn có thể sử dụng vm.$nextTick bên trong updated :
    ```js
    updated: function () {
      this.$nextTick(function () {
        // Code that will run only after the
        // entire view has been re-rendered
      })
    }
    ```
*   Nó không được gọi trong quá trình render bên phía server
## 2.7 Activated
* Kiểu: Function
* Mô tả: Được gọi khi một thành kept-alive được kích hoạt.
* Nó không được gọi trong quá trình render bên phía server
## 2.8 Deactivated
* Kiểu: Function
* Mô tả: Được gọi khi một thành kept-alive ngừng hoạt động.
* Nó không được gọi trong quá trình render bên phía serve
## 2.9 BeforeDestroy
* Kiểu: Function
* Mô tả: Được gọi ngay trước khi một instance Vue bị phá hủy. Ở giai đoạn này, instance vẫn đầy đủ chức năng.
* Nó không được gọi trong quá trình render bên phía serve
## 2.10 Destroyed
* Kiểu: Function
* Mô tả: Được gọi sau khi một instance Vue đã bị phá hủy. Khi hook này được gọi, tất cả các lệnh của instance Vue bị mất ràng buộc, tất cả các trình lắng nghe sự kiện đã bị xóa và tất cả các instance Vue con cũng đã bị hủy
* Nó không được gọi trong quá trình render bên phía serve
# 3. Tài liệu tham khảo
https://vuejs.org/v2/api/#Options-Lifecycle-Hooks
https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram