## **Giới thiệu chuẩn JPEG**
* JPEG là một tiêu chuẩn nén ảnh được áp dụng trong nhiều lĩnh vực: Lưu trữ ảnh, Fax màu, camera số,… 
* Công nghệ JPEG nén hiệu quả với tỷ lệ đạt mức vài chục lần (hệ số nén 80:1)
* Xử lý tốt mất mát thông tin trong quá trình nén khiến người nhìn không nhận ra sự khác biệt
* Ảnh đã nén sau khi giải mã trùng khớp với ảnh ban đầu
* Nguyên lý nén đơn giản, dựa vào sự thiếu nhạy cảm của mắt người với không gian màu U,V để ẩn giấu các thông tin dư thừa trong ảnh 

## **Quy trình nén JPEG**
Sơ đồ nén tổng quát
![](https://images.viblo.asia/a4f57aaa-919e-462a-b61d-3e6c478e6237.PNG)
                         
**1.Chuyển ảnh ban đầu thành các block 8x8**

Block là một ma trận điểm ảnh 8x8 pixel

Mục đích: tính toán DCT cho từng vùng dư thừa dữ liệu khác nhau

Tất cả các block có cùng kích thước và mỗi block là một ma trận điểm ảnh 8×8 pixel được lấy từ một ảnh màn hình theo chiều từ trái sang phải, từ trên xuống dưới. Kích thước block là 8×8 được chọn bởi hai lý do sau:

* Kích thước block lớn làm tăng độ phức tạp thuật toán 
* Khoảng cách giữa các pixel vượt quá 8 sẽ làm cho hàm tương quan suy giảm nhanh

**2.Biến đổi Cosin rời rạc DCT (Discrete Cosine Transform)**

DCT (Discrete Cosine Transform): biến đổi dữ liệu dưới dạng biên độ thành dữ liệu dưới dạng tần số.
Mục đích: loại bỏ sự dư thừa dữ liệu trong không gian
DCT chia thành 2 loại:
* DCT một chiều.
* DCT hai chiều.

Thuật toán DCT là phần quan trọng nhất trong nén ảnh JPEG, mình sẽ sử dụng DCT hai chiều cho code nên trong bài viết này mình xin giới thiệu qua về DCT-2d
![](https://images.viblo.asia/c7239dfa-e716-4fa9-8d5d-c003266c609d.PNG)

Chú thích:

*  Hình ảnh đầu vào là N by M;
*  f (i, j) là cường độ của pixel trong hàng i và cột j;
*  F (u, v) là hệ số DCT trong hàng k1 và cột k2 của ma trận DCT.
*  Đối với hầu hết các hình ảnh, phần lớn năng lượng tín hiệu nằm ở tần số thấp; chúng xuất hiện ở góc trên bên trái của DCT.
*  Nén được thực hiện do các giá trị bên phải thấp hơn biểu thị tần số cao hơn và thường nhỏ - đủ nhỏ để bị bỏ qua với ít biến dạng có thể nhìn thấy.
*  Đầu vào DCT là một mảng 8-8 số nguyên. Mảng này chứa mức độ thang màu xám của mỗi pixel;
*  Pixel 8 bit có các mức từ 0 đến 255.

**3.Lượng tử hóa**

Chức năng cơ bản: chia các hệ số F(u,v) cho các hệ số ở vị trí tương ứng trong bảng lượng tử Q(u,v) để biểu diễn số lần nhỏ hơn các giá trị cho phép của hệ số DCT: 
```
Fq(u,v)=[F(u,v)/Q(u,v)]
```

![](https://images.viblo.asia/49d3f82e-5ecc-4f80-8d31-8e06e5ea858a.png)

Trong phần lượng tử hóa, để biến đổi mảng hai chiều các hệ số Fq(u,v) thành một chuối số một chiều ta sử dụng qua thuật toán zigzag

![](https://images.viblo.asia/bb8bfa4a-1628-437d-9425-85efe1dc2137.png)

Thu được kết quả là một chuỗi các số của ma trận cũ được lấy theo hình zigzag từ ô thứ nhất đến ô cuối cùng.

**4.Mã hóa entropy**

![](https://images.viblo.asia/0a127c4c-7b30-4fbf-a0f1-16dba3b25863.png)

Mục đích: Làm giảm độ dư thừa thống kê trong các phần tử được mã hóa để truyền

Mã hóa entropy sử dụng mã hóa VLC và mã hóa RLC

* RLC (Run Length Code): mã hóa độ dài chạy thực hiện mã hóa một hệ số khác 0 sau giá trị DC bằng một từ mã
* VLC (Variable Length Code): Mã hóa độ dài biến đổi được thực thi bằng cách đặt các từ mã ngắn cho các mức có xác suất xuất hiện cao và các từ mã dài cho các mức có xác suất xuất hiện thấp.

# **Kết quả sau khi nén và nhận xét**
Mình sử dụng matlab để hỗ trợ code triển khai thuật toán này, dưới đây là hình ảnh demo

![](https://images.viblo.asia/d68d2ba6-4bed-4d1d-b1b3-4ce15f020695.png)

**Nhận xét**
*  Dung lượng ảnh ban đầu đã bị giảm đi
*  Chất lượng ảnh thấp, giảm dần sau mỗi lần nén.
*  Sau lần nén đầu tiên : Ảnh có mờ đi nhưng không đáng kể
*  Lấy ảnh mới nén tiếp tục đi nén thì độ mờ giảm tiếp do dung lượng tiếp tục được nén

**Cảm ơn các bạn đã dành thời gian cho bài viết này. Xin hẹn gặp lại ^^!**

Nguồn tham khảo:
http://www.svcl.ucsd.edu/courses/ece161c/handouts/DCT.pdf
https://www.scribd.com/doc/52683135/Ph%C6%B0%C6%A1ng-phap-nen-%E1%BA%A3nh-theo-chu%E1%BA%A9n-JPEG
https://users.cs.cf.ac.uk/Dave.Marshall/Multimedia/node231.html