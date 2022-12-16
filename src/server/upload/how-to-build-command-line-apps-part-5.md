**Chào mừng các bạn đã quay trở lại với series How to Build Command-Line Apps Part 5**

Hôm nay mình sẽ giới thiệu đến mọi người việc xây dựng command line để truy vấn trực tiếp với cơ sở dữ liệu.

Đầu tiên chúng ta sẽ lại khởi tạo file main như sau :
![](https://images.viblo.asia/9a4dcb0f-13ec-4bd9-9958-269c11a0ab2d.png)

Tiếp theo là chúng ta khởi tạo class ShowCommand
![](https://images.viblo.asia/e569131a-4224-4c82-be27-70c3fed1417e.png)

Sau đó chúng ta sẽ tạo hàm khởi tạo và sử dụng 1 class đặt tên là DatabaseAdapter để kết nối với cơ sở dữ liệu.

![](https://images.viblo.asia/56257de1-eaf5-46d0-b9d0-6b9f023ef524.png)

Tiếp đến tại hàm showTasks chúng ta sẽ áp dụng sử dụng table ở trong part4 nhé. Vì là example nên mình chỉ sử dụng đơn giản 2 trường là ID và Description thôi.
![](https://images.viblo.asia/0879410f-ba22-453a-af03-1ec2606795ab.png)

Okie, tiếp theo chúng ta sẽ tạo 1 class chính là class DatabaseAdapter mà chúng ta đã sử dụng ở hàm khởi tạo. Trong class DatabaseAdapter chúng ta sẽ sử dụng PDO để kết nối đến cơ sở dữ liệu và tạo ra các truy vấn đơn giản như sau. Hàm fetchAll thì nhìn thôi các bạn cũng đã đoán được là chức năng của hàm sẽ là chính là select dữ liệu từ các bảng tương ứng ra. Còn hàm query thì cũng khá quen thuộc khi chúng ta thường sử dụng query builder của Laravel hay Cake rồi đúng không.
![](https://images.viblo.asia/6ff009b9-c9a8-4764-944e-6c55a371774b.png)

Tiếp đến là chúng ta sẽ tạo ra bảng để truy xuất dữ liệu nhé. Mình sẽ tạo ra 1 bảng tên là tasks với 2 trường id và description như sau :
![](https://images.viblo.asia/33ed549a-c6de-4dc5-90ad-baa5e75230f1.png)

Quay trở lại với file main, chúng ta sẽ phải thêm class databaseAdapter vào câu lệnh $app->add(), cũng như việc lấy khởi tạo và lấy class databaseAdapter như sau:
![](https://images.viblo.asia/2f4ffe31-5e24-42d0-97a9-ef32319becfc.png)

Okie giờ chúng ta sẽ thử thực hiện việc chạy show ra dữ liệu nhé:
![](https://images.viblo.asia/8fe3e39b-11c6-4fd5-8650-e92e1e1f45ee.png)
Vậy là không có lỗi gì xảy ra, hiện tại do bảng chưa có dữ liệu nên kết quả sẽ hiển thị ra như trên.

Nhưng nếu hiển thị như trên thì nhìn không được đẹp cho lắm, vậy chúng ta sẽ thêm điều kiện if để check dữ liệu trước khi trả ra output.
![](https://images.viblo.asia/44001c76-030e-4fba-acc2-4b985c169c0b.png)

Giờ chúng ta sẽ chạy lại hàm show thì kết quả sẽ được trả ra như sau :
![](https://images.viblo.asia/69fb5144-ad42-41b1-be28-ebee2ea08231.png)

Vậy là phần show ra đã okie r, giờ chúng ta sẽ bắt tay vào việc tạo mới dữ liệu nhé. Tại file main chúng ta sẽ thêm 1 dòng sử dụng class AddCommand
![](https://images.viblo.asia/02c7dfee-52d2-41f1-b701-d183438a0836.png)

Sau đó thì chúng ta sẽ khởi tạo class AddCommand. Nhớ là trường description khi chúng ta tạo bảng đang là NOT NULL vậy chúng ta phải thêm việc required vào nhé
![](https://images.viblo.asia/28ec2e8e-3f2a-4eab-b2ec-aa423d3f09ad.png)

Tiếp theo chúng ta sẽ xử lý hàm execute trong class AddCommand như sau, Đầu tiên là chúng ta phải lấy ra biến description ở input. Sau đó sử dụng chính hàm query() đã có trong class databaseAdapter để tạo ra dữ liệu mới như sau.
![](https://images.viblo.asia/a8f52426-6388-47d9-8ce4-142a84d27824.png)

Nào giờ thì chúng ta sẽ tạo dữ liệu đầu tiên nhé
![](https://images.viblo.asia/8ef881b1-f1b7-4a91-8f04-82656b268f7c.png)

Tương tự với việc xóa dữ liệu chúng ta chỉ cần truyền vào ID và thay đổi câu truy vấn từ insert sang delete thôi nhé. Sau đó phần hàm khởi tạo thì đều giống nhau nên chúng ta có thể tách ra thêm 1 class parent cho AddCommand cũng như ShowCommand dùng chung, và việc mỗi lần add hoặc delete dữ liệu thì cũng nên hiển thị việc show ra dữ liệu trong bảng thì sẽ hay hơn nên hàm showTasks trong class ShowCommand chúng ta cũng nên viết vào class parent để dùng chung nhé. Phần này cũng coi như là 1 bài tập nhỏ để các bạn thực hiện những gì mình đã học đc nhé.Chúc các bạn thành công


**Hẹn gặp lại mọi người vào bài tiếp theo trong series nhé !!!~**