### 1. Tìm kiếm sử dụng RegEx:
Các bước :<br>
+   Chọn File Navigator từ menu ở phía trái Xcode
+ Chuyển chế độ Text preference sang Regular Expression
 + Giờ chúng ta có thể tìm kiểu bằng RegEx
   ![](https://images.viblo.asia/8ffb58e2-eccd-42b0-90b3-e71767605f11.png)
### 2. Mở một project từ Terminal với Xcode
Chúng ta có thể mở những Xcode dự án từ Terminal. Nếu chạy lệnh xed. trong thư mục index của dự án, nó sẽ mở dự án trực tiếp.
![](https://images.viblo.asia/c51881d5-4da4-4a63-bfc5-5d8b63622a25.png)
### 3. Xem interface của các tệp class hoặc struct
Nếu bạn muốn xem nhanh những tham số, phương thức được sử dụng trong đối tượng thì mẹo này rất hữu ích.<br>
Các bước:<br>
+ Mở tệp Class hoặc Struct
+ Sử dụng phím tắt ⌘⌃↑ (Cmd+Ctrl+↑)
+ Xcode sẽ tự động tạo interface của đối tượng đó 
![](https://images.viblo.asia/1912c2ca-3764-46d4-98fa-748900223c2a.jpeg)
![](https://images.viblo.asia/cf593a04-f53b-468b-9f86-379a6fe270f3.jpeg)
### 4. Truy cập nhanh các phương thức và biến trong đối tượng
Bạn có thể truy cập bất kì phương thức hay tham số trong một đối tượng bằng sử dụng Jump Bar. <br>
Các bước:<br>
+ Sử dụng ⌃6 (Ctrl + 6) trong tệp class hoặc struct
+ Jump bar sẽ được mở lên cho danh sách phương thức và tham số trong đối tượng
+ Bạn có thể chọn phương thức hoặc biến bạn muốn truy cập trực tiếp hoặc bạn có thể lọc danh sách bằng việc nhập văn bản để truy cập nhanh hơn
![](https://images.viblo.asia/42299cac-90c7-474f-a4b7-2175e846ed13.jpeg)
![](https://images.viblo.asia/35416fbb-0d47-44ea-b01d-a14c533ed0d3.jpeg)
![](https://images.viblo.asia/0885bde5-0874-46a0-9b97-471e44df6fde.jpeg)
### 5. Quan sát các biến trong khi debug
Bạn xem trạng thái của ứng dụng trong khi debugging với breakpoint của Xcode rất ổn, tuy nhiên khi bạn muốn quan sát sự thay đổi trong biến bạn muốn xem sự thay đổi của một dòng lệnh thì cách sau sẽ hiệu quả. <br>
Các bước:<br>
+ Đặt breakpoint tại nơi biến bạn muốn quan sát được tạo đầu tiên
+ Chuột phải trên biến bạn muốn quan sát trong Debug Area tại phía dưới bên trái
+ Tiếp tục chạy chương trình sau khi chọn Watch "variable name"
+ Khi mà có bất kì sự thay đổi nào trong biến đó, Xcode sẽ chỉ ra cho bạn dòng gây ra sự thay đổi
![](https://images.viblo.asia/84fc7740-02eb-414b-9f4e-a1745abcc3a5.jpeg)
![](https://images.viblo.asia/b0b9f56b-f147-4ef2-9fad-0ad9eb743de4.jpeg)
![](https://images.viblo.asia/c6a97736-8078-4d5d-b55c-0cc022192d8f.jpeg)
Reference: https://medium.com/flawless-app-stories/7-useful-tips-and-tricks-for-xcode-52182ac1dfa1