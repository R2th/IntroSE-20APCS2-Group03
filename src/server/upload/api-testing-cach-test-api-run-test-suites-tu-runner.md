### 1. Cách test API như thế nào?
Hôm nay sẽ là 1 bài viết về cách sắp xếp test và viết testcase cho API như thế nào cho hợp lý.
![](https://images.viblo.asia/cdcb3d31-0cb2-4eb1-b8a0-7e9cc3f3cc8b.png)
API chỉ là cầu nối nói chuyện giữa Client và Server. API không thực hiện 1 business logic nào cả, đơn thuần chỉ là người đi giao thư, chuyển thông tin thôi. Thế test API là test người đi giao thư hay là test cái gì? Thì câu trả lời là: dùng API để test business logic ở phía server. Hãy xem ví dụ dưới đây để hiểu rõ hơn.

Ví dụ:
Tôi muốn check API update_profile gồm 2 trường Name và Birthday. Trong đó trường Name là bắt buộc và phải lớn hơn 4 ký tự. Trường Birthday thì không bắt buộc nhập.

Cách xử lý của Server và Client :

1. User vào màn hình Profile, sửa lại 2 trường Name và Birthday.
2. User ấn vào nút Update Profile (Code ở client sẽ check điều kiện của trường Name, nếu đúng thì submit gửi API, gọi là request, nếu sai sẽ hiện thông báo tương ứng).
3. Thông tin mới gồm Name và Birthday theo phong bì thư của API cập bến Server.
Server đọc thư và check điều kiện lại 1 lần nữa.
4. Nếu các thông tin Name và Birthday đều Valid thì 2 thông tin đó được cập nhật vào Database.
5. Server trả lại thông tin, gọi là response, về lại cho client thông báo rằng nó đã cập nhật thành công.
6. User nhìn thấy Name và Birthday của mình đã được thay đổi ở màn hình Profile.

Khi thực hiện test API, chính là việc chúng ta test các bước 4, 5 và 6. Dó đó, với 1 API đơn lẻ, chúng ta sẽ check 2 phần chính tạm gọi là :

– Syntax Testing (Validate dữ liệu – bước 4 + bước 6)

– Funtional Testing (Test business logic – bước 5 và 6).

*Syntax Testing*

Loại này sẽ tập trung vào cái Method check điều kiện: Accept với data đúng và Reject với data sai hay không. Một vài ví dụ:
- Bỏ trống trường bắt buộc → Trong Response sẽ phải có thông báo lỗi, các thông tin khác không được cập nhật. Server không thực hiện 1 business logic nào cả.
- Bỏ trống trường không bắt buộc → Không có lỗi gì cả, Server vẫn thực hiện business logic.
- Điền các thông tin sai kiểu định dạng, ví dụ trường thời gian lại điền chữ → Trong Response sẽ phải có thông báo lỗi…

*Functional Testing*

Loại này check các Method xử lý dữ liệu và thực hiện 1 chức năng có đúng hay không. Ví dụ:

- Giá là X và số phần trăm discount là Y thì số tiền phải trả là X*(1-Y) hay không → Nó chính là việc test Method tính toán với các tham số X và Y mà thôi. Việc thực hiện business logic có thể không lưu kết quả vào DB.
- Việc Update trường Name ở ví dụ ban đầu có được lưu vào DB hay không? → Mở DB ra và check kết quả.
- Yêu cầu trả về thông tin của những user có tên là “Nam” → Vào DB thực hiện câu Query và so sánh với Response xem 2 kết quả có khớp nhau hay không…

Trên đây là 2 cái loại test trên phục vụ cho test các API đơn lẻ thôi. Còn nữa...

*Test scenarios*

Cuối cùng là ta ghép các API lại với nhau sẽ nó có bị lỗi ở đâu không? Chỗ này chính là những cái Test Suite, gộp nhiều Test Case lại. Ví dụ:
![](https://images.viblo.asia/1bcd4953-6372-48f4-bbad-85d421acdd78.png)
*Lưu ý của test API:*

- Khi sử dụng Postman, hãy để mỗi trường hợp là 1 API riêng biệt, không test đè lên nhau, sau khó kiểm soát và không tạo được test case cho automation.
- Để không phải căng mắt check từng response của các trường hợp đơn lẻ.

### 2. Run Test Suites từ Runner
Một dự án thì có quá nhiều API và quá nhiều task khác nhau, mỗi task là 1 tập hợp của 1 vài API thì phải giải quyết như thế nào. Cùng với đó là cách quản lý mà bạn nghĩ có áp dụng được cho Postman hay không? Và làm thế nào để run test đỡ tốn công sức nhất.

**2.1. Quản lý Test Suites**

Trong Postman quản lý các API theo dạng Collections và tùy vào dự án mình sẽ có cách quản lý khác nhau. Vì đặc thù dự án cứ 1 tuần lại release 1 lần nên đây là cách mình quản lý.
![](https://images.viblo.asia/76517008-c0d7-4de6-b0bd-5c27bbc38ee8.png)
Vấn đề là từng task nhỏ thì mình sẽ sắp xếp như thế nào?

Ở phần 1, mình đã hướng dẫn với 1 API đơn lẻ có 2 kiểu test tương ứng:
1. Syntax Testing (Validation)
2. Functional Testing

 Theo gợi ý từ các Bloggers Postman, thì bạn không nên chỉ dùng 1 request cho tất cả các loại test của mình, mà nên với mỗi trường hợp bạn sẽ tạo ra 1 request, chỉ khác nhau phần Description và Test thôi. Do đó đây là cách mình cấu trúc API cho từng task.
 ![](https://images.viblo.asia/7daaddfa-a5a1-4a7a-a4a1-2b8bc018032c.png)
Trên Postman, nó sẽ có hình thù như sau:

![](https://images.viblo.asia/01e9f250-e410-4df9-b3a9-8bac0ee3b67e.png)

Các API trong hình từ 1 đến 5 sẽ có phần Description và Test khác nhau.

API_1:

![](https://images.viblo.asia/fd5b8287-c68f-4371-a33b-5777af2ac9fc.png)
API_2:

![](https://images.viblo.asia/dfa6c0a4-c2d8-44c9-ace6-d45e6187e335.png)

Làm tương tự với những trường hợp khác

**2.2. Run Test Suites bằng chức năng Runner**

Từ đầu series đến giờ các bạn mới biết cách test API theo cách “thủ công”, ấn SEND check từng API. Postman cung cấp tính năng run List API theo Folder bằng tính năng Runner.
![](https://images.viblo.asia/0d148d03-b629-493e-8ef4-40c8da3e0ae3.png)

Màn hình của Runner sẽ hiện ra, ở đây bạn sẽ quan tâm đến những thành phần sau đây.
![](https://images.viblo.asia/2a13b1ae-2144-4717-8ea7-4d85f6e09cb2.png)

1. Folder sẽ run.
2. Environment theo dự án
3. Số lần lặp lại
4. Option cho bạn xem lại Log những request bạn muốn.

Sau khi run xong, bạn sẽ nhìn thấy report như sau:
![](https://images.viblo.asia/ba272386-63b8-4310-9845-ed69e736eaec.png)
Lưu ý: Số Pass or Fail được tính trên số Test bạn viết, chứ ko tính trên số Request bạn run.

Bạn có xem short version của report ở Summary và lưu Log ở Export Result.

Nếu bạn muốn xem chi tiết từng thông số của request bạn click vào tên của Request đó.

![](https://images.viblo.asia/647bfa11-ff1a-409d-9057-2eb1f3813c61.png)

Trên đây là một tính năng mà Postman hỗ trợ Automated Testing

----------------------------------------