## **Tổng quan về kiểm thử phần mềm**
Kiểm thử phần mềm (software testing) là gì? Mục tiêu của kiểm thử phần mềm là gì? Tại sao phải kiểm thử phần mềm? Phân biệt các lỗi như thế nào? Làm thế nào để trở thành kiểm thử viên?
<br>
Bài viết này sẽ giúp các bạn có cái nhìn tổng quan về kiểm thử phần mềm, hỗ trợ quá trình phát triển nghề nghiệp của bản thân.
### I. Kiểm thử phần mềm là gì?
<br>- Trước tiên, bạn nghĩ gì về IPhone 7?<br>

![](https://images.viblo.asia/c2a0fc9a-9cf4-4d1d-9ef3-c0ea54a74fb6.jpg)
Tùy vào quan điểm và tiêu chí đánh giá sản phẩm:<br>
    + Có người bảo tốt<br>
    + Có người bảo xấu<br>
    + Có người bảo chấp nhận được<br>
Do đó, đánh giá sản phẩm phần mềm đạt chất lượng cũng phụ thuộc vào quan điểm và cách nhìn của từng người. <br>- Có 3 nhân tố tạo nên chất lượng sản phẩm:<br>
    + Con người<br>
    + Quy trình<br>
    + Công cụ<br>

![](https://images.viblo.asia/96e5f59a-c6c0-4960-940c-4941349e5c0a.jpg)<br>**Tổng quát:**  kiểm thử phần mềm là một quy trình bao gồm một vòng lặp cả tĩnh và động từ khi lập kế hoạch, chuẩn bị và đánh giá sản phẩm phần mềm để xác định xem sản phẩm có đảm bảo yêu cầu đặc tả không, để chứng mình sản phẩm phù hợp với yêu cầu sử dụng  và phát hiện lỗi trong quá trình phát triển phần mềm.
### II. Mục tiêu của kiểm thử phần mềm<br>
**1. Mục tiêu** <br>         - Xác định phần mềm phù hợp với yêu cầu đặc tả <br>- Xác định phần mềm phù hợp với nhu cầu người dùng<br>- Đủ tự tin để cung cấp một sản phẩm chất lượng<br>- Phát hiện các lỗi trong quá trình phát triển phần mềm<br>
**2. Các quan điểm về kiểm thử**
<br>
-Phân biệt giữa testing và debugging
| Testing  | Debugging | 
| -------- | -------- | 
| Hoạt động tìm lỗi| Hoạt động sửa lỗi     | 
| Được thực hiện bới kiểm thử viên| Được thực hiện bởi lập trình viên     | 
| Tìm được càng nhiều lỗi càng tốt| Loại bỏ những lỗi tìm được | 
<br>    
- Đối với mọi người, kiểm thử là công việc vô cùng đơn giản và dễ dàng nhưng thực tế lại không phải như vậy, sau đây là một số quan điểm về kiểm thử phần mềm.

| Quan điểm của người ngoài | Thực tế|
| -------- | -------- | 
|   Kiểm thử là công việc dễ dàng |Kiểm thử là công việc thách thức, đòi hỏi kỹ năng cao khi thực hiện ít nhất một số trường hợp kiểm tra nội dung    | 
| Ai cũng có thể trở thành kiểm thử viên |Kiểm thử là công việc đòi hỏi tính cẩn thận, tỉ mỉ trong từng nội dung, khả năng nghiên cứu và tìm kiếm dữ liệu cao  |
|Sau khi kiểm thử thì sản phẩm đạt chất lượng cao, 100% không có lỗi |Kiểm thử chỉ giúp cho sản phẩm đạt chất lượng tốt hơn, ngăn chặn các lỗi dễ dàng phát sinh |
| Kiểm thử tự động tốt hơn kiểm thử bằng tay|Kiểm thử tự động không thể kiểm tra 100% nội dung, một số trường hợp vẫn phải kiểm thử bằng tay  |

### III. Lý do cần kiểm thử phần mềm
**1. Mất tiền để xử lý** <br>
Khi phát hiện ra lỗi sớm từ những giai đoạn ban đầu như lấy yêu cầu, thiết kế chi phí để xử lý sẽ thấp hơn, nếu phát hiện ra lỗi càng về các giai đoạn sau thì chi phí sẽ rất lớn, có thể gấp rất nhiều lần so với ban đầu
![](https://images.viblo.asia/676c3399-3635-4c14-890b-afd462f8cb4b.jpg) <br>
Ví dụ: Pepsi đã từng có chương trình khuyến mãi vào tháng 5 năm 1992 đó là nắp chai Pepsi có số 349 thì sẽ được thưởng 40.000USD, tuy nhiên trên thực tế có tới 800.000 nắp chai có số 349 thay vì 1 nắp chai, sau sự cố này, Pepsi đã thiệt hại 32 tỷ USD để trả thưởng cho số nắp chai đã được tung ra thị trường.
<br>
**2. Mất thời gian để xử lý**<br>
Khi phát hiện ra lỗi càng ở các giai đoạn về sau thì thời gian phải bỏ ra càng nhiều, nếu lỗi phát hiện lỗi ở giai đoạn lấy yêu cầu thì có thể dễ dàng sửa chữa và tốn ít thời gian hơn, nhưng khi lỗi được phát hiện ở giai đoạn xây dựng, triển khai thì sẽ tốn rất nhiều thời gian và công sức để sửa chữa, nếu lỗi nghiêm trọng dự án còn có thể bị thất bại.<br>
**3. Gây thương tổn đến người dùng**<br>
Khi sản phẩm đã đưa vào triển khai mới phát hiện lỗi, có thể gây ra cảm giác khó chịu và chán nản từ người dùng.<br>
Ví dụ: Hệ thống chạy không ổn định, bị giật, tải dữ liệu chậm, sai chức năng so với đặc tả ban đầu... sẽ gây ức chế với người dùng, như vậy đã gây tổn hại đến tinh thần của người sử dụng.<br>
**4. Ảnh hưởng uy tín của công ty**<br>
    Khi phát hiện ra lỗi ở các giai đoạn muộn, đặc biệt là khi sản phẩm phần mềm đã được triển khai mới phát hiện ra lỗi, nhà phát triển không chỉ mất thời gian, tiền bạc để xử lý mà còn làm mất đi hình ảnh công ty, mất uy tín với người sử dụng và rất có thể người dùng sẽ không quay lại sử dụng sản phẩm của công ty nữa.
### IV. Phân biệt các lỗi trong sản phẩm phần mềm
**1. Lỗi trong sản phẩm, dự án phần mềm**
<br>- Error: Hành động của con người gây ra một kết quả không đúng
<br>- Fault: 
<br>+ Một bước sai, quy trình sai hay dữ liệu sai
<br>+ Là kết quả của Error
<br>- Failure
<br>+ Một lỗi được tìm thấy trong quá trình sử dụng thực tế
<br>+ Độ lệch giữa sản phẩm và mong muốn của người sử dụng<br>
**2. Mối liên hệ giữa Error, Fault và Failure**
<br>- Quá trình kiểm tra, quản lý và thực hiện xử lý lỗi trong hoạt động kiểm thử phần mềm gọi là Defect management.
<br>- Mối liên hệ giữa Error, Fault và Failure:
![](https://images.viblo.asia/810f7094-d331-4a96-a199-a20df9156de1.jpg)
### V. Làm thế nào để trở thành kiểm thử viên (Tester)
Rất nhiều người có suy nghĩ kiểm thử là nghề rất dễ và ai cũng có thể trở thành kiểm thử viên, đó là suy nghĩ hoàn toàn sai lầm, trên thực tế, để có thể trở thành kiểm thử viên cần rất nhiều yếu tố như: Kiến thức chuyên môn; Kỹ năng mềm; Thái độ nghề nghiệp; Tính cách cần có. <br>
**1. Kiến thức chuyên môn**<br>
Một số kiến thức cần thiết để trở thành kiểm thử viên:
<br>- Quy trình phát triển phần mềm
<br>- Kiến thức về lĩnh vực phần mềm đang thực hiện
<br>- Nắm được quy trình phát triển phần mềm
<br>- Sử dụng được các công cụ
<br>- Kiến thức về sơ sở dữ liệu
<br>- Kiến thức về ngôn ngữ lập trình<br>
**2. Kỹ năng mềm**<br>
Để trở thành kiểm thử viên, kỹ năng mềm cũng vô cùng cần thiết, sau đây là một số kỹ năng mềm mà một kiểm thử viên nên có:
<br>- Kỹ năng đọc tài liệu
<br>- Kỹ năng giao tiếp
<br>- Kỹ năng viết báo cáo
<br>- Kỹ năng lập kế hoạch
<br>- Kỹ năng làm việc nhóm
<br>- Kỹ năng đàm phán<br>
**3. Thái độ nghề nghiệp**<br>
Nếu bạn muốn trở thành kiểm thử viên thì thái độ đối với nghề nghiệp là vô cùng quan trọng, thái độ nghề nghiệp một kiểm thử viên cần có:
<br>- Luôn đặt câu hỏi
<br>- Tìm kiếm lỗi có ý nghĩa
<br>- Trung thực
<br>- Đừng mong mọi người hiểu về công việc của mình<br>
**4. Tính cách cần có**<br>
Mỗi người đều có tính cách khác nhau, song tính cách đối với một kiểm thử viên nên có là:
<br>- Tính kỷ luật
<br>- Tính kiên trì
<br>- Tính linh hoạt
<br>- Tính nhạy cảm cao
<br>- Tính cởi mở
<br>- Tính tỷ mỉ
<br>


### **Tài liệu tham khảo**
Giáo trình môn "Kiểm thử cơ bản" trường Cao đẳng FPT Polytechnic.