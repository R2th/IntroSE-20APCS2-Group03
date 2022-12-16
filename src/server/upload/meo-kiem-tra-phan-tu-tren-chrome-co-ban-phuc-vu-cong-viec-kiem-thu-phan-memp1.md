Chào bạn đọc lại là mình đây, lần này quay trở lại với 1 chủ đề mới nhưng không lạ :sweat_smile: . Hy vọng bạn sẽ ứng dụng nó tốt trong công việc kiểm thử của mình
### 1. Lời mở đầu
Bạn đã bao giờ tò mò rằng trang web bạn đang kiểm thử có cấu trúc như thế nào, có thể xem text, màu, kiểu chữ 1 cách nhanh chóng thay vì dùng thêm 1 phần mềm hoặc lạch cạnh đi hỏi mấy ông developer.

Bạn có muốn biết từng action mà bạn click, request gửi đi thất bại hay thành công

Hay bạn muốn biết 1 số lỗi do server và muốn hỗ trợ dev của bạn tìm lỗi.

Tôi đang biết 1 cách đơn giản là kiểm tra phần tử hay còn gọi là Inspect element 
### 1. Elements
Muốn xem cấu trúc trang web 1 cách nhanh nhất trên Chrome bạn làm như sau:
1. Click chuột phải
2. Chọn Inspect

Lúc này cấu trúc Inspect element sẽ hiển thị bao gồm các tab chính
- Elements
- Console
- Source
- Network
- Performance
- Memory
- Application
- Security
- Audits

Ngoài ra còn 1 số tab nhỏ khác và chọn kiểu hiển thị (mobile hay website)
Đầu tiên là tab Elements (hình như dưới)
![](https://images.viblo.asia/dfc3cc7e-77c1-4e7a-aa5a-8c9881270171.png)
Default focus vào dòng mà bạn click chuột phải. Khi hover chuột qua từng line trong cấu trúc html thì tương ứng giao diện sẽ mark xanh vào vùng tương ứng. Để ý sang phía bên phải sẽ có tab nhỏ style, tại đây ta có thể check kiểu chữ, size, màu sắc, căn chỉnh ...

Ví dụ:

Bạn muốn thay đổi text để test hiển thị thì cũng cứ mạnh dạn nhập thôi vì nếu code tốt thì những thứ bạn nghịch nó sẽ không lưu đâu, code mà lởm thì đó là bug rồi :slightly_smiling_face: 

Hay bạn muốn lấy mã màu chính xác của 1 vùng trên trang web ta thực hiện như sau 
1. Click vào vùng ô vuông chứa màu trong tab Style (vùng khoanh đỏ)
![](https://images.viblo.asia/4b1d2bb3-39a6-4096-81de-0a906f339bd3.png)

2. Hover chuột trên màn hình vào khu vực cần lấy màu và click chuột trái 
![](https://images.viblo.asia/940d8030-2478-4421-9ca5-1170054fc6f6.png)

Tại đây màu sắc và mã màu được hiển thị, việc của bạn chỉ việc so sánh thôi :smiley: cũng đơn giản phải không nào.
### 2. Console
Đây là nơi cấu trúc dữ liệu sẽ thực thi như nào 
kiểu như ![](https://images.viblo.asia/61943b3c-0996-405a-b694-c1c512b0d1b9.png)

Điều này sẽ có lợi cho bạn hơn khi bạn biết về kỹ thuật, bạn sẽ hiểu cấu trúc dữ liệu có đúng hay không đồng thời hỗ trợ dev làm việc hiệu quả hơn. 

Cũng là nơi lỗi sẽ hiển thị là nơi bản nhìn thấy. Khi có lỗi bạn không cần quan tâm nó là gì , cũng không cần hiểu nó sai ở đâu. Việc của bạn là copy cái đoạn lỗi đó và gửi cho dev thôi.

Ví dụ như: ![](https://images.viblo.asia/f5c7b7b8-0280-430f-ae21-55c1d09f4092.png) 
### 3. Sources
Khi bạn test 1 màn hình hay 1 function nào đó, để giúp dev log bug đó ở class nào cho nhanh gọn hơn thì bạn chọn tab Source. Tại đây bạn có thể biết được bug đang xảy ra tại class nào. Nhưng đây chỉ là kiểm tra thôi, chứ nguồn gốc bug phát sinh có phải do class đó hay class cha của nó hay không thì cứ để dev, chuyên môn của họ sâu hơn sẽ hiểu và biết nguyên nhân nhanh hơn
Phần này thường thì Tester cũng chỉ nhìn thôi chứ cũng không làm gì được :smile: 

### 4. Network
Tab này khá quan trọng, đây là nơi ta biết được request mình gửi đi có thực thi thành công hay thất bại, thời gian request là bao lâu, repone trả về là gì.

![](https://images.viblo.asia/25ba45cd-cb1e-40fa-aad4-4a0851df6ae0.png)

Như ảnh trên ta có thể nhìn thấy các request gửi đi sẽ có kết quả là 200 thành công 
Tương ứng với các respone:

* 1xx: Informational – Yêu cầu (request) đã được nhận, tiếp tục tiến trình xử lí
* 2xx: Success/Unsuccess – Thành công/ Không thành công
* 3xx: Redirection – Chuyển hướng
* 4xx: Client Error – Yêu cầu sai cú pháp hoặc không thỏa đáng
* 5xx: Server Error – Máy chủ gặp lỗi
Ta có thể đọc được từng request nào thì gặp lỗi gì, việc biết chi tiết đó là bug do đâu cũng dễ dàng giúp bạn log bug hợp lý hơn 

### 5. Kết luận 
Trên đây mình chỉ liệt kê 4 tab đầu , hết sức cơ bản của việc Inspect mà mình đã từng được trải nhiệm qua. Nó khá đơn giản mà ai làm nghiệp vụ test cũng đều nên biết. Nếu có thời gian tìm hiểu thì lần sau mình sẽ viết thêm về chủ đề này. 
Mong rằng những trải nhiệm vẫn còn non nớt của mình sẽ giúp bạn áp dụng được điều gì đó vào trong công việc của mình.