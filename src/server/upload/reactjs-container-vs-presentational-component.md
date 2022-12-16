*React chia các Components ra làm hai loại chính là Container và Presentational Component.
Vậy sự khác nhau, mục đích tách ra như vậy để làm gì?*

### I. Phân biệt
1. Container component  (Mọi thứ làm việc như thế nào?)
Tập trung xử lý logic, fetching dữ liệu từ API
Truyền dữ liệu, các hàm xử lý logic sang Presentational Component.
2. Presentational components  (Mọi thứ trông như thế nào?)
Nhận dữ liệu từ Container Component
Hiển thị dữ liệu luôn có các HTML DOM.

### II. Tại sao tách biệt Container vs Presentational Component
Ví dụ viết Component hiển thị List Product  trong một category của trang TMĐT. Chúng ta viết như thế này
![](https://images.viblo.asia/5d4f4bca-a35a-4dbc-87f2-cc6cc9703935.png)

Viết tất cả trong 1 component như này, tuy nhiên quá trình phát triển có thêm yêu cầu hiển thị 1 list product  best seller ra trang chủ và hiển thị list related product ở trang xem chi tiết product.
Lúc này ta nghĩ đến việc tận dụng lại cấu trúc của  list product trên để code của chúng ta được ngắn gọn và rỏ ràng hơn, tránh lặp lại code giống nhau nhiều lần. 
Do đó ta tách ra 1 component ProductList để hiển thị dữ liệu (presentational component) list product  và import vào component Products để dùng (container component), import ở trang chủ, trang chi tiết sản phẫm… nếu cần dùng.
Thậm chí ta có thể tách thêm một lần nữa từ component ProductList ra thêm 1 component ProductItem  nữa để tận dụng đến mức từng product item.
Giờ nó thành như này:
Products (Container component)

![](https://images.viblo.asia/0df89ef3-ba58-4ac8-9997-8594862b37ba.png)

ProductList (Presentational component)

![](https://images.viblo.asia/500aab9e-4f44-4bec-ad1f-8e89c5524bc6.png)

ProductItem(Presentational component)

![](https://images.viblo.asia/cb630ff3-a5e0-49f4-8495-449f0913ef97.png)

### III.  Kết luận
Container vs Presentational Component là hai khái niệm mà react developer nên hiểu rỏ, ứng dụng tốt nó thì sẽ đem lại nhiều lợi ích cho công việc.
Project của chúng ta trở nên rỏ ràng, dể dàng phát triển, chuyển giao và cập nhật với sự tách biệt giữa phần logic và phần view và khả năng tái sử dụng tốt hơn.
Liên quan đến phần phân chi component này thì cũng có một nội dung khá mắc nối chắc cũng nhiều bạn khúc mắc đó là Functional component và Class component (Stateless, Sateful) , phần sau mình sẽ nói tiếp về phần này.