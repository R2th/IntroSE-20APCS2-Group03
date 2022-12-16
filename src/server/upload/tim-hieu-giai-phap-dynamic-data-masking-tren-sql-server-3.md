Ở bài viết lần này, tôi sẽ tiến hành các ví dụ demo dựa trên cơ sở lý thuyết từ các bài viết trước
# Demo

SQL Server 2016-2017 đã giới thiệu che giấu dữ liệu (DDM) như một cách để ngăn người dùng trái phép xem một số loại thông tin nhạy cảm nhất định. Công cụ cơ sở dữ liệu cho phép che dấu dữ liệu khi nó được lấy từ cơ sở dữ liệu, dựa trên các quy tắc che giấu được xác định trên lược đồ cột. Dữ liệu được lưu trữ trong cơ sở dữ liệu vẫn không thay đổi.

Để triển khai DDM, chúng ta xác định quy tắc che giấu trên các cột có chứa dữ liệu muốn bảo vệ. Đối với mỗi cột, ta thêm mệnh đề **MASKED WITH** vào định nghĩa cột, sử dụng cú pháp sau:

`MASKED WITH ( FUNCTION = '<em> <function> </em>(<em><arguments></em>)' )`

Ta bắt đầu bằng cách thay thế trình giữ chỗ **<function>** bằng một trong bốn chức năng: default ,email , random hoặc partial . Đối với các hàm random và partial, chúng ta phải cung cấp các giá trị tham số, như được chỉ định bởi trình giữ chỗ **<argument>**
    
 1. Áp dụng che giấu mặc định
    
    Tạo bảng  **sinhvien** và áp dụng che giấu mặc định cho 3 cột: studentname ,birthday , phonenumber.
   
    ![](https://images.viblo.asia/fec224e9-43fc-4b01-b466-578c9a9995e5.png)

    Nhập dữ liệu cho bảng **sinhvien**. Vì đang chạy truy vấn trong tài khoản đặc quyền, chúng ta có quyền truy cập đầy đủ vào dữ liệu, mặc dù đã thực hiện các quy tắc che giấu. Vì lý do này, câu lệnh **SELECT** sẽ trả về cùng kết quả (được hiển thị trong bảng sau) mà chúng ta sẽ nhận được nếu các quy tắc che giấu không được thêm vào các định nghĩa cột.
   
    ![](https://images.viblo.asia/c7070522-f267-4748-8c6f-554d4a229702.png)
    
    Để xem dữ liệu bị che giấu ta tạo thêm một tài khoản cục bộ trên cơ sở dữ liệu và cấp quyền **SELECT**.
   
    ![](https://images.viblo.asia/87406b56-bf9a-4ce4-b429-834aab30ab96.png)
    
    Chạy lại câu lệnh **SELECT **với người dùng là **Linhdemo2**.
    
    ![](https://images.viblo.asia/2a7c270f-432a-447c-98bb-89c08478142d.png)
    
    Trong một số trường hợp, ta có thể muốn cho phép người dùng xem dữ liệu không bị mask. Để làm như vậy, ta sẽ cấp quyền **UNMASK** cho tài khoản.

    ![](https://images.viblo.asia/65fcdce1-80b8-4102-98e7-ae5f8ea4c7ad.png)
    
    Sau đó nếu quyết định rằng tài khoản sẽ không thể truy cập dữ liệu chưa mask, ta có thể thu hồi quyền.

    ![](https://images.viblo.asia/dc7c694f-0ca6-4fcd-ad43-20e0f55c2d3b.png)
    
    
2. Áp dụng che giấu Email
    
    Hàm email đơn giản để thực hiện như hàm default , ngoại trừ việc hàm default che dấu toàn bộ giá trị, trong khi chức năng email che dấu tất cả trừ chữ cái đầu tiên và nó trả về tên miền .com cho tất cả các địa chỉ email.
    Áp dụng che giấu cho cột email.
    
    ![](https://images.viblo.asia/899202ba-1819-452f-9d36-307365ad63b2.png)
    
    Sử dụng câu lệnh SELECT với tài khoản đặc quyền.
    
    ![](https://images.viblo.asia/ecfdd4d9-92ce-46ce-b43d-19e510643c8c.png)

    Chạy lại câu lệnh **SELECT** với tài khoản là **Linhdemo2**.
    
    ![](https://images.viblo.asia/3b59a15d-4256-4d30-bfbb-ae20cef16897.png)