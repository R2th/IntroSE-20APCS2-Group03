## Kiểm thử thành phần là gì?
Kiểm thử thành phần được định nghĩa là một loại kiểm thử phần mềm, trong đó kiểm thử được thực hiện trên từng thành phần riêng lẻ một cách riêng biệt mà không tích hợp với các thành phần khác. Nó còn được gọi là Kiểm thử mô-đun khi nó được nhìn từ góc độ kiến trúc. Kiểm thử thành phần còn được gọi là Kiểm thử đơn vị, Kiểm thử chương trình hoặc Kiểm thử mô-đun.

Theo sơ đồ dưới đây, sẽ có một chiến lược kiểm tra và kế hoạch kiểm tra cho kiểm thử thành phần. Nơi mỗi và mọi phần của phần mềm hoặc ứng dụng được xem xét riêng lẻ. Đối với mỗi thành phần này, một Kịch bản thử nghiệm sẽ được xác định, kịch bản này sẽ được đưa vào các High level test case -> các test case chi tiết ở mức độ thấp đi kèm với điều kiện tiên quyết.
![](https://images.viblo.asia/49fef3ec-642a-4d54-ac98-02ef15dcacd0.PNG)

Việc sử dụng thuật ngữ "Component Testing" khác nhau giữa các miền và tổ chức này sang tổ chức khác.

Lý do phổ biến nhất dẫn đến nhận thức khác nhau về Kiểm thử thành phần là:
- Loại mô hình vòng đời phát triển được chọn.
- Độ phức tạp của phần mềm hoặc ứng dụng đang thử nghiệm.
- Thử nghiệm có hoặc không riêng biệt với phần còn lại của thành phần khác trong phần mềm hoặc ứng dụng.
- Như chúng ta biết Kiến trúc vòng đời kiểm thử phần mềm có rất nhiều thử nghiệm-tạo tác (Các tài liệu được thực hiện, được sử dụng trong các hoạt động thử nghiệm). Trong số nhiều thử nghiệm - hiện vật, đó là Chính sách thử nghiệm & Chiến lược thử nghiệm xác định các loại thử nghiệm, độ sâu của thử nghiệm sẽ được thực hiện trong một dự án nhất định.

## Ai thực hiện kiểm thử thành phần?
Kiểm thử thành phần (component testing) được thực hiện bởi người kiểm thử (testers). Kiểm thử đơn vị (unit testing)  được thực hiện bởi các nhà phát triển (developers) nơi họ thực hiện kiểm tra chức năng hoặc quy trình riêng lẻ. Sau khi Kiểm thử đơn vị được thực hiện, kiểm thử tiếp theo là kiểm thử thành phần. Kiểm thử thành phần được thực hiện bởi những người kiểm thử.

## Khi nào thực hiện kiểm thử thành phần?
Kiểm thử thành phần được thực hiện ngay sau khi Kiểm thử đơn vị được thực hiện bởi các nhà phát triển và bản dựng được phát hành cho nhóm kiểm thử. Bản dựng này được gọi là bản dựng UT (Unit Testing Build). Chức năng chính của tất cả các thành phần được kiểm tra trong giai đoạn này

Tiêu chí đầu vào để kiểm tra thành phần:
- Số lượng tối thiểu của thành phần được đưa vào UT phải được phát triển và thử nghiệm đơn vị.
- Tiêu chí dừng cho kiểm thử thành phần.
- Chức năng của tất cả các thành phần sẽ hoạt động tốt.
- Không có bất kỳ defect nào ở mức độ nghiệm trọng hoặc cao hoặc trung bình.

## Kĩ thuật kiểm thử thành phần
Dựa trên độ sâu của các cấp độ kiểm tra, kiểm tra thành phần có thể được phân loại là

CTIS - Component Testing In Small/ Thử nghiệm thành phần trong quy mô nhỏ <br>
CTIL - Component Testing In Large/ Thử nghiệm thành phần ở quy mô lớn

**CTIS - Thử nghiệm thành phần trong quy mô nhỏ**

Kiểm thử thành phần có thể được thực hiện có hoặc không có sự cô lập phần còn lại của các thành phần khác trong phần mềm hoặc ứng dụng được kiểm tra. Nếu nó được thực hiện với sự cô lập của thành phần khác, thì nó được gọi là Kiểm tra thành phần trong quy mô nhỏ.

Ví dụ 1: Hãy xem xét một trang web có 5 trang web khác nhau, sau đó kiểm tra từng trang web riêng biệt & với sự cô lập của các thành phần khác được gọi là Kiểm tra thành phần trong quy mô nhỏ.

Ví dụ 2: Hãy xem xét trang chủ của trang web guru99.com có nhiều thành phần như: 

Home, Testing, SAP, Web, Must Learn!, Big Data, Live Projects, Blog và v.v...

Tương tự như vậy, bất kỳ phần mềm nào cũng được tạo ra từ nhiều thành phần và ngoài ra, mỗi thành phần sẽ có các thành phần con của riêng nó. Kiểm tra từng mô-đun được đề cập trong ví dụ 2 một cách riêng biệt mà không xem xét tích hợp với các thành phần khác được gọi là CTIS.
![](https://images.viblo.asia/376e04ba-2699-455a-8f3b-133a7ba89609.png)

Click vào dropdown 'Testing' và xem các thành phần con khác nhau của thành phần ''Testing'.  Vì vậy các thành phần con được hiển thị là: Agile Testing, BugZilla, Cucumber, Postman, QTP, v.v..
![](https://images.viblo.asia/a5623a8d-5d54-4bfe-9823-ed3b42d95249.png)

**CTIL -Thử nghiệm thành phần ở quy mô lớn**

Kiểm thử thành phần được thực hiện mà không cô lập các thành phần khác trong phần mềm hoặc ứng dụng đang được kiểm tra được gọi là Kiểm thử thành phần ở quy mô lớn.

Giả sử có một ứng dụng bao gồm ba thành phần: A, B, C. 

Nhà phát triển đã phát triển thành phần B và muốn nó được thử nghiệm. Nhưng để kiểm tra hoàn toàn thành phần B, một số chức năng của nó phụ thuộc vào thành phần A và một số ít vào thành phần C.
![](https://images.viblo.asia/9d0a20ce-2cf3-4340-9684-60deb43441f3.PNG)

Luồng chức năng: A -> B -> C có nghĩa là có sự phụ thuộc vào B từ cả A và C, theo sơ đồ stub là hàm được gọi, driver là hàm gọi.

Nhưng thành phần A và thành phần C vẫn chưa được phát triển. Trong trường hợp đó, để kiểm tra hoàn toàn thành phần B, chúng ta có thể thay thế thành phần A và thành phần C bằng stub và driver theo yêu cầu. Vì vậy, về cơ bản, thành phần A & C được thay thế bằng stub & driver hoạt động như một đối tượng giả cho đến khi chúng thực sự được phát triển.
- Stub: Một Stub được gọi từ thành phần phần mềm cần kiểm tra như thể hiện trong sơ đồ bên trên, Stub được gọi từ thành phần A.
- Driver: Một driver gọi thành phần cần kiểm tra như trong sơ đồ trên, thành phần C được gọi từ driver.

## Unit Testing và Component Testing

| Unit Testing | Component Testing | 
| -------- | -------- |
| Kiểm tra các chương trình, mô-đun riêng lẻ để chứng minh rằng chương trình thực thi theo thông số kỹ thuật được gọi là Kiểm thử đơn vị     | Kiểm thử từng đối tượng hoặc các phần của phần mềm một cách riêng biệt có hoặc không có sự cô lập của các đối tượng khác được gọi là Kiểm thử thành phần     | 
|Nó được xác nhận dựa trên các tài liệu thiết kế|Nó được xác nhận dựa trên các yêu cầu kiểm tra, các trường hợp sử dụng|
|Kiểm thử đơn vị được thực hiện bởi Nhà phát triển|Kiểm thử thành phần được thực hiện bởi Người kiểm tra|
|Kiểm tra đơn vị được thực hiện đầu tiên|Kiểm thử thành phần được thực hiện sau khi kiểm thử đơn vị hoàn tất từ các nhà phát triển kết thúc.|

### Tóm lược:

Trong Kỹ thuật phần mềm, kiểm thử Thành phần đóng một vai trò quan trọng trong việc tìm ra lỗi. Trước khi bắt đầu với Kiểm tra tích hợp, chúng tôi luôn khuyến nghị thực hiện kiểm tra thành phần để đảm bảo rằng mỗi thành phần của ứng dụng đang hoạt động hiệu quả.

Kiểm thử tích hợp được theo sau bởi kiểm thử thành phần. Kiểm thử thành phần cũng được gọi là kiểm thử mô-đun trong một số tài liệu tham khảo.

Tham khảo: https://www.guru99.com/component-testing.html