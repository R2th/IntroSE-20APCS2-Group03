Nếu bạn là một lập trình viên, hẳn bạn biết rất rõ sự cần thiết của việc debug code. Chúng ta thường sử dụng các thư viện bên ngoài để show log hoặc format chúng. Tuy nhiên có thể các bạn có thể không nhận ra rằng console của trình duyệt vốn dĩ cũng là một công cụ vô cũng mạnh mẽ cho việc này.
<br>

Khi nói về console, thứ đầu tiên mà bạn nghĩ tới chắc hẳn là `console.log` đúng không? Tuy nhiên ngoài nó ra thì còn rất nhiều method hữu dụng khác. Ở bài viết này, chúng ta hãy cùng nhau xem làm thể nào để có thể tận dụng được tối đa console.

# Console là gì?
JavaScript console là một tính năng được tích hợp sẵn trong các trình duyệt hiện nay đi kèm là các công cụ phát triển có thể sử dụng ngay với một giao diện giống như shell. Nó cho phép lập trình viên có thể:
- Xem log của các lỗi và cảnh báo của một trang web.
- Tương tác với trang web sử dụng các lệnh JavaScript.
- Debug ứng dụng và xem DOM trực tiếp ngay trên trình duyệt.
- Quan sát và phân tích các hoạt động của network.

<br>
Về cơ bản, nó cấp cho bạn quyền write, quản lý và giám sát JavaScript ngay trong trình duyệt.

# console.log, console.error, console.warn và console.info
Đây chắc hẳn là các method được sử dụng nhiều nhất. Bạn có thể truyền nhiều tham số vào các method này. Các tham số sẽ được đánh giá và nối lại với nhau thành một chuỗi phân cách bằng một khoảng trắng (nếu tham số là object hoặc mảng thì bạn có thể điều hướng giữa các thuộc tính của chúng).

![](https://images.viblo.asia/294c4752-e183-48b1-9e7a-8da8d78cff1e.png)

# console.group
Method này cho phép bạn nhóm các console.log (hoặc error, info... ) thành một nhóm. Cú pháp của nó rất đơn giản: đặt tất cả các dòng `console.log` mà bạn muốn nhóm dưới một dòng `console.group()` (hoặc `console.groupCollapsed()` nếu bạn muốn nhóm được mặc định là đóng vào). Sau đó đặt một dòng `console.groupEnd()` ở vị trí cuối các log mà bạn muốn nhóm.

![](https://images.viblo.asia/6cd8fc05-915f-4875-9953-ab05e0d3ca1f.png)

# console.table
Việc hiển thị JSON hoặc một mảng JSON lớn bằng `console.log` là một việc khá là "kinh khủng". Method `console.table` sẽ giúp chúng ta xử lý tốt việc này, nó cho phép chúng ta thể hiện cấu trúc JSON một cách đẹp đẽ dễ nhìn dưới dạng bảng.

![](https://images.viblo.asia/8aa9d12a-9b87-4016-84e2-5d6c44a3cf7e.JPG)

(Bạn có thể ấn vào tên cột để sort).

# console.count, console.time, console.timeEnd
Ba method này giống như một chiếc dao đa năng Thụy Sĩ dành cho lập trình viên. Method `console.count` sẽ đếm số lần mà `count` đã được gọi, nếu truyền thêm một tham số vào `count()` thì nó sẽ đếm số lần gọi ứng với mỗi tham số. Method `console.time` sẽ khởi chạy một bộ đếm với tên của bộ đếm được truyền vào làm tham số (chúng ta có thể chạy cùng lúc tới 10.000 bộ đếm trên cùng một trang). Sau khi chạy bộ đếm, chúng ta gọi method `console.timeEnd()` để dừng bộ đếm và in ra thời gian chạy của bộ đếm.

![](https://images.viblo.asia/f3165292-62a5-4a47-a9f3-5751c429bdcc.JPG)

# console.trace và console.assert
Các method này sẽ in ra các bước bị lỗi kể từ thời điểm nó được gọi. Giả sử như bạn đang xây dựng một thư viện JS và bạn muốn thông báo cho người dùng nơi mà lỗi xảy ra, các method này rất hữu dụng trong trường hợp đó. Method `console.assert` và `console.trace`giống nhau ngoại trừ việc `console.assert` sẽ chỉ in ra nếu điểu kiện truyền vào không được thỏa mãn.

![](https://images.viblo.asia/2d6b20d0-2419-4579-a584-20051ab2081e.JPG)

___

Hết