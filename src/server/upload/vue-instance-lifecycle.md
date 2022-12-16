Chào các bạn.

Hôm nay, mình sẽ trở lại với chủ đề **Vòng đời của Vue instance**.  Chủ đề này chắc không còn lạ lẫm gì nữa, vì mỗi khi học 1 framework mới thì mình phải quan tâm đến cái vòng đời của nó như thế nào, phải không? :)) Mình cũng xin chia sẻ ngắn gọn thôi nha.

## 1. Overview
Để có thể hiển thị được giao diện và dữ liệu lên màn hình, từ khi ứng dụng vừa được tạo hay khi ta thay đổi giá trị data, Vue đã trải qua rất nhiều bước. Trong vòng đời đó, Vue cung cấp cho chúng ta đủ các hooks để có thể thực thi code ở bất kỳ giai đoạn nào của ứng dụng. Điều này rất tốt, kiểu chiều lòng khách hàng, phải không? =))

Mình liệt kê ngắn gọn qua hình ảnh này. (Nguồn: https://www.udemy.com/)

![](https://images.viblo.asia/15c0f8ee-b94d-4410-a032-0f69ad0cd729.png)
Cùng xem chi tiết thế nào nhé.

## 2. Chi tiết
Sau khi ta gọi lệnh `createApp()`, Vue sẽ bắt đầu chạy vòng đời của mình, qua các giai đoạn mà chúng ta có thể tác động thông qua các hooks.
### 2.1. Create
Trong giai đoạn này, chúng ta có `beforeCreate()` và `created()`. Chúng được thực thi ngay trước và sau khi dữ liệu, events được thiết lập. Tại thời điểm này, chúng ta sẽ chưa thấy gì trên màn hình cả. Vue chỉ mới biết về các `data` và cấu hình chung của ứng dụng mà thôi. Vì vậy, bạn sẽ không thể thao tác gì với DOM ở giai đoạn này đâu. Tuy nhiên, bạn có thể request data từ server ở đây rồi.

**beforeCreate()**

Chạy ngay sau khi 1 instance được khởi tạo và trước khi dữ liệu, các events, watchers được thiết lập. Khi đó, ta chưa truy cập được vào `data` của ứng dụng.

**created()**

Tại đây, dữ liệu, events, computed properties, methods, watcher đã được thiết lập xong. Nhưng vì chưa mount nên vẫn chưa có DOM và chưa có dữ liệu trên màn hình.

### 2.2. Mount
Sau giai đoạn `create`, Vue sẽ compile các `template`, gắn data vào giao diện và chuyển sang giao đoạn `mount`. Ở đây, chúng ta có `beforeMount()` và `mounted()`. Chúng được chạy trước và sau khi hiển thị giao diện và dữ liệu trên màn hình, hay chính là khi khởi tạo component.

Ở đây, ta không sử dụng `server-side rendering`.

**beforeMount()**

Được gọi khi template đã được compile và chuẩn bị render lần đầu tiên. 

**mounted()**

Lúc này, Vue biết những gì hiển thị trên màn hình, nó tạo ra DOM trên trình duyệt. (Phần này có liên quan đến DOM ảo và DOM thật, các bạn đọc thêm nhé). Tại đây, ta đã có thể thao tác với DOM được rồi, có thể dùng js để làm các thứ rồi. :))

### 2.3. Update
Rồi ứng dụng nào cũng phải đến lúc thay đổi data mà thôi. Khi dữ liệu được thay đổi, chúng ta có `beforeUpdate()` và `updated()`. Chúng được chạy trước và sau khi data thay đổi, làm cho component phải re-render lại view. 

Ở đây, ta không sử dụng `server-side rendering`.
### 2.4. Unmount
Giai đoạn này là khi 1 component bị hủy, chuyển component khác hoặc hủy toàn bộ ứng dụng Vue. Ở ver khác 3., giai đoạn này được gọi là `destroy` ([xem thêm](https://v3.vuejs.org/guide/migration/introduction.html#other-minor-changes)). Ở đây, chúng ta có `beforeUnmount()` và `unmounted()`. Chúng ta nên làm gì trong 2 hàm này nhỉ?

**beforeUnmount()**

Chạy trước khi một component bị hủy. Khi đó, instance vẫn còn đầy đủ các chức năng. Ta có thể dùng nó để hủy các events, ngắt kết nối không cần thiết trước khi chuyển sang component mới.

**unmounted()**
Khi đó, tất cả các mọi thứ của instance bị hủy, như directives, event listener, watcher, computed,... Ở đây, mình có thể call để báo cho server biết instance bị hủy chẳng hạn. :)

## Tổng kết
Trên đây, mình đã ghi lại một cách đơn giản vòng đời của 1 instance trong Vue. Kiến thức khá đơn giản nên các bạn có thể đọc thêm trong phần tài liệu tham khảo nhé. 

Thank all!

## Tài liệu tham khảo
https://v3.vuejs.org/api/options-lifecycle-hooks.html
https://www.digitalocean.com/community/tutorials/vuejs-component-lifecycle
https://viblo.asia/p/bai-10-vong-doi-cua-mot-vue-instance-va-cach-ap-dung-vao-thuc-te-GrLZDwveKk0