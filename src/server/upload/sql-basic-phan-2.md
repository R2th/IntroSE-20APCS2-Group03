Trong bài viblo lần trước . Mình đã đi sơ lượt khái niệm về chức năng, ưu điểm và các function của SQL . 

Hôm nay mình viết tiếp thêm bài viết này để có cụ thể hóa các fucntion của SQL trong 1 bài toán cụ thể . 

Bài viết hôm nay dựa trên 1 đề thi về SQL Basic của FPT vào năm 2018 . 

Và mình đã làm các bài tập dựa trên nền tảng MySQL . 

Link bài tập: https://nguyenvanhieu.vn/bai-tap-sql-giai-bai-test-sql-co-ban-fpt-fsoft-2018/

Bài tập có cơ sở dữ liệu được mô tả như sau : 
 
![](https://images.viblo.asia/312090ef-b383-48ca-9a23-752d8382196e.PNG)
 
 Về phần tạo cơ sở dữ liệu và input data mình sẽ không đăng lên nhé mọi người. Vì data mỗi ng đều có thể tự nhập. Chỉ hơi mất thời gia 1 chút. Mọi người chịu khó xí nhé. :)

Dưới đây mình sẽ liệt kê ra các câu hỏi và phần bài làm của mình để mọi ng xem nhé. 
Trong 1 số phần bài làm, mình sẽ có nói qua 1 chút về fuction mình đã làm ở trong phần đó. 

Mong rằng nó phần nào có giúp ích cho mọi người. :)

**Câu 1:** 

Liệt kê MaDatPhong, MaDV, SoLuong của tất cả các dịch vụ có số lượng lớn hơn 3 và nhỏ hơn 10.

  ![](https://images.viblo.asia/8fcc4ba5-3281-4295-bcee-d47bef9bbd43.PNG)
  
  **Câu 2 :** 
  
  Cập nhật dữ liệu trên trường GiaPhong thuộc bảng PHONG tăng lên 10,000 VNĐ so với giá phòng hiện tại, chỉ cập nhật giá phòng của những phòng có số khách tối đa lớn hơn 10. 
   ![](https://images.viblo.asia/fdb04fa9-542c-433d-a5ea-550ed3033602.PNG)

   **Câu 3:**  
   
   Xóa tất cả những đơn đặt phòng (từ bảng DAT_PHONG) có trạng thái đặt (TrangThaiDat) là “Da huy”.
   ![](https://images.viblo.asia/b8186c2c-c85c-4a4d-8097-a3dc7d68cefd.PNG)

   **Câu 4:** 
   
   Hiển thị TenKH của những khách hàng có tên bắt đầu là một trong các ký tự “H”, “N”, “M” và có độ dài tối đa là 12 ký tự.
   
   - Câu này mình làm theo 2 cách. 

   **Cách 1**
   
   ![](https://images.viblo.asia/b8222c15-2310-4420-a98b-da181897902f.PNG)
   
**Cách 2:**

   ![](https://images.viblo.asia/ac9ec6e6-cc2b-44bd-aee9-e4cefc7d4779.PNG)

   **Câu 5:** 
   
   Hiển thị TenKH của tất cả các khách hàng có trong hệ thống, TenKH nào trùng nhau thì chỉ hiển thị một lần.
  - Câu này mình cũng làm theo 2 cách luôn.:)
  
 **Cách 1**
 
 Cách này mình dùng hàm **Distinct** để có thể có thể lấy ra những giá trị không trùng lặp . Cách này có thể dùng để lấy khi giá trị của bạn mong muốn nó cùng tồn tại ở nhiều table nhé. 
 
   ![](https://images.viblo.asia/c91c8181-3e7f-4d5e-a307-fef2672cd8c6.PNG)
   
   **Cách 2**
   
   Còn cách này thì mình dùng mệnh đề **Group By**. 
   
   Mệnh đề này cho phép bạn sắp xếp các hàng của truy vấn theo nhóm. Các nhóm được xác định bởi các cột mà bạn chỉ định trong mệnh đề GROUP BY. 
   
    Ví dụ như trong câu này là mình dùng **Group By** để chỉ lấy ra tên khách hàng thôi đấy. 
   ![](https://images.viblo.asia/c9b9b098-b3bb-4721-8b2e-440837319d5b.PNG)

   
   **Câu 6:**
   
   Hiển thị MaDV, TenDV, DonViTinh, DonGia của những dịch vụ đi kèm có DonViTinh là “lon” và có DonGia lớn hơn 10,000 VNĐ hoặc những dịch vụ đi kèm có DonViTinh là “Cai” và có DonGia nhỏ hơn 5,000 VNĐ.

- Ở câu này, để trả về được kết quả mong muốn thì mình đã nhóm những vấn đề cần giải quyết bỏ vào dấu ngoặc đơn () , để khi truy vấn có thể thực hiện đúng thành phần mà không bị nhầm . 

Nếu bạn không bỏ ngoặc đơn vào thì có thể khi bạn truy vấn trong DB . Mặc dù câu query của bạn là đúng nhưng đôi lúc vẫn sẽ cho ra kết quả sai vì nó không thực hiện đúng thứ tự mà  theo các vấn đề mà yêu cầu đã đưa ra đâu. 

Kết quả mình đúc kết được sau khi mình đã bi sai mấy lần đấy các bạn ạ. :)

![](https://images.viblo.asia/42984b76-784a-4d58-8629-4a29a67b0141.PNG)




   
   **Câu 7:** 
   
   Hiển thị MaDatPhong, MaPhong, LoaiPhong, SoKhachToiDa, GiaPhong, MaKH, TenKH, SoDT, NgayDat, GioBatDau, GioKetThuc, MaDichVu, SoLuong, DonGia của những đơn đặt phòng có năm đặt phòng là “2016”, “2017” và đặt những phòng có giá phòng > 50,000 VNĐ/ 1 giờ.
   
   - Câu này mình query khá dài, vì phải join vào nhiều table để lấy data. 
   
   Và mình cũng dùng ngoặc đơn để có thể phân tách được các vấn đề cần phải giải quyết trong yêu cầu đấy. :)
   
   ![](https://images.viblo.asia/92e41ba7-20ac-410d-96b1-45337612b455.PNG)

   
   
   **Câu 8:** 
   
   Hiển thị MaDatPhong, MaPhong, LoaiPhong, GiaPhong, TenKH, NgayDat, TongTienHat, TongTienSuDungDichVu, TongTienThanhToan tương ứng với từng mã đặt phòng có trong bảng DAT_PHONG. Những đơn đặt phòng nào không sử dụng dịch vụ đi kèm thì cũng liệt kê thông tin của đơn đặt phòng đó ra.
   
TongTienHat = GiaPhong * (GioKetThuc – GioBatDau)

TongTienSuDungDichVu = SoLuong * DonGia

TongTienThanhToan = TongTienHat + sum (TongTienSuDungDichVu)

  - Câu này mình cũng phải join nhiều table để lấy data. Vì câu này có 2 phép tính mà đề đã đưa ra đấy . 
  Bên cạnh đó câu này ngoài lệnh join ra mình còn dùng left join nữa đấy . 
  
  Sẵn tiện mình nói 1 chút về **Join** và **Left Join** ra luôn đây nhé.

  -   **Join**  hay còn gọi là **Inner Join** dùng khi bạn muốn lấy ra những giá trị cùng tồn tại ở cả 2 table 
   -  **Left Join** dùng khi bạn muốn lấy ra tất cả các giá trị ở table bên trái, và chỉ trả về những giá trị đáp ứng điều kiện đặt ra ở các table bên phải thôi.


![](https://images.viblo.asia/6dfb754a-389f-48e9-b925-e9778e182a5c.PNG)


**Câu 9:**  

Hiển thị MaKH, TenKH, DiaChi, SoDT của những khách hàng đã từng đặt phòng karaoke có địa chỉ ở “Hoa xuan”.

- Câu này mình làm theo 2 cách  nữa nè. :)

**Cách 1:**

- Ở cách 1 thì mình lại dùng hàm **Distinct** để có thể lấy ra các giá trị theo yêu cầu đề bài đấy.

![](https://images.viblo.asia/1a9c2812-7b5a-40d9-95aa-42982214a8ce.PNG)

**Cách 2:**

- Còn cách 2 thì khác một chút. Mình dùng câu query con hay còn gọi là subquery để có thể lấy ra được giá trị mong muốn.  

Lý do mình dùng câu query con lồng trong 1 câu query mẹ là vì nó cho phép tìm các khách hàng từ bảng đặt phòng có trạng thái đã đặt. Sau đó truy vấn con được dùng để lọc kết quả từ truy vấn chính bằng điều kiện IN.

![](https://images.viblo.asia/ed84853d-f425-4a6b-a908-c50dcbb9e26f.PNG)

**Câu 10:** 

Hiển thị MaPhong, LoaiPhong, SoKhachToiDa, GiaPhong, SoLanDat của những phòng được khách hàng đặt có số lần đặt lớn hơn 1 lần và trạng thái đặt là “Da dat”. 

- Còn câu cuối cùng thì mình dùng cả **Group by** và **Having** luôn.

Bộ đôi này sẽ được đi chung khi  kết quả mong muốn trả về đã được giới hạn, chỉ khi điều kiện được được đáp ứng là TRUE thì mới đc trả về đấy.
   
![](https://images.viblo.asia/98e04708-59ff-49f8-bf16-b04f17b9f1e7.PNG)



Links references:

https://viblo.asia/p/tim-hieu-ve-sql-basic-vyDZO7DkZwj

https://nguyenvanhieu.vn/bai-tap-sql-giai-bai-test-sql-co-ban-fpt-fsoft-2018/

https://www.w3schools.com/sql/default.asp