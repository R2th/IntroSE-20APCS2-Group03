Hồi còn đi làm, mấy ông anh trong công ty cứ chê CLB lập trình web ở trường mình cùi bắp, gà. Lúc đó mình cay lắm, nhưng giờ khi về lại đi học, mình nhận ra, nó còn gà hơn mình tưởng, có một số thứ basic, mà các bạn trong CLB đôi khi hiểu sai và sử dụng không đúng cách, và thế là mình quyết định viết blog này, với mục đích chia sẻ những kiến thức của mình về HTTP status và cách mà mình handle exception trong 1 số con app cá nhân.
Bài viết này sẽ không đặt nặng quá nhiều về lập trình, mà nó nằm chung cho Web App sử dụng HTTP để request dữ liệu.

> Bài viết chỉ là ý kiến cá nhân, nếu thấy hợp lý, well, có thể làm theo mình, còn trong trường hợp bạn thấy nó vô lý, well, feedback ngay ở phần bình luận.
# Mã trạng thái phản hồi HTTP - HTTP Response Status codes?
Về HTTP, nó ra đời cũng khá lâu rồi, nên cũng có khá nhiều bài viết nói về nó, nên để tìm hiểu về HTTP, giao thức HTTP là gì bạn có thể tìm hiểu thêm trên mạng? Hoặc tham khảo 1 số chỗ này:
- https://topdev.vn/blog/http-la-gi/
- https://viblo.asia/p/tim-hieu-ve-http-hypertext-transfer-protocol-bJzKmgewl9N

Với các mã phản hồi của HTTP nó được phân ra làm 5 nhóm chính
- **1xx - Thông tin**: Server bảo rằng nó đã nhận được yêu cầu từ phía client.
- **2xx - Thành công**: Server bảo rằng request mà client gửi lên đã được thực hiện thành công.
- **3xx - Chuyển hướng**: Server bảo với client rằng cần phải gọi 1 request khác để có thể lấy được kết quả.
- **4xx - Lỗi client**: Server bảo rằng request không được (hoặc không thể) thực hiện bởi vì một lỗi nào đó của client.
- **5xx - Lỗi server**: Server bảo rằng request không thể thực hiện vì nó đang bị bệnh.

Trên đây, là list 5 nhóm lỗi mà 1 yêu cầu HTTP có thể trả về cho client. 

# Handle lỗi cho ứng dụng
Lúc mà mình đọc code của mấy bạn sinh viên ở CLB, thì mình nhận ra 1 số điều ngớ ngẩn, là các bạn đó sử dụng HTTP status 1 cách vô tội vạ.

VD: "Mình có 1 API để tìm 1 sinh viên trong danh sách sinh viên của thư viên bằng MSSV (Mã số sinh viên). Thì thay vì bạn trả về 200 lúc tìm thấy, bạn lại trả về mã `302 - Found`."

Trong 5 nhóm trạng thái kể trên, dễ thấy 1 điều là có 2 nhóm báo lỗi và 1 nhóm báo thành công. Đó là 2xx, 4xx và 5xx. Có 1 câu đùa vui của dev tụi mình lúc làm mấy cái API này là **400 là F\*CK YOU, 500 LÀ F\*CK ME**.
## Handle lỗi với HTTP status
### Với trường hợp thành công:
Mình chỉ sử dụng 200 cho BẤT KỲ TRƯỜNG HỢP NÀO request thực hiện xong.
### Với trường hợp lỗi do client (**F\*CK YOU**): 
- **400:** Client thực hiện request và request không thể thực hiện do thiếu field, thiếu data, không tìm thấy data trong database ứng với dữ liệu mà client cung cấp,.... Nói chung là mọi lỗi liên quan đến request thì đều trả về 400
- **401:** Lỗi này trả về lúc mà client đó đã xác thực trước đó, nhưng tại thời điểm thực hiện request, thì cái token access của client bị hết hạn (hoặc không thể sử dụng được.
- **403:** Lỗi này trả về lúc mà client chưa hề xác minh, nhưng lại đang thực hiện 1 request cần xác minh.
- **404:** Lỗi này không được define, vì đa phần các framework hiện tại (hoặc là server) lúc user thực hiện 1 request không tồn tại thì đã tự động báo 404 not found rồi.
- **409:** Lỗi này báo rằng dữ liệu mà client gửi lên đã bị xung đột với 1 dữ liệu khác trên DB, thông thường mình sẽ dùng mã 400 để thông báo cho lỗi này luôn (để phía frontend dễ handle error, thay vì phải đi check cả 400 và 409)

### Với trường hợp lỗi do server (**F\*CK ME**): 
- **500:** Lỗi này được trả về khi server méo biết lỗi đang bị là lỗi gì (nếu bị lỗi này thì thường do handle thiếu case).
- **502:** Lỗi này được trả về khi 1 ứng dụng nào đó mà server lúc chạy đã bị lỗi, có thể là do không thể kết nối database, queue, caching,... hoặc 1 ứng dụng thứ 3. (Tương tự như 409, mình gộp chung lỗi 502 và 504 vào lỗi chung 1 lỗi liên quan đến gateway của server).

Với nhóm lỗi 5xx, vì là nhóm lỗi do server, nên thông thường, mình sẽ integrate nó với 1 ứng dụng bên thứ 3 để notify cho mình biết là server đang bị lỗi đó, vì những lỗi này làm break flow của user, mà nếu 1 người bị, thì sẽ có khả năng những người khác cũng sẽ bị, nên cần phải fix càng sớm càng tốt.

Ngoài ra, có một điều lưu ý là **500 - Internal Server Error** có nghĩa là nó bảo rằng server nó bug rồi, không làm gì được nữa cả. Đồng nghĩa, lúc mà bạn báo lỗi này ra cho client, thì có nghĩa, là app bạn đã chết rồi, không sử dụng được nữa, đó cũng là lý do tại sao trong 1 số UI template, người ta lại define trang 500, mà không có 501, hay 503,... Vì vậy, lúc phát triển các API thì `try...catch`(cú pháp của JS) nếu có trả lỗi server thì chỉ nên trả lỗi 503 - Service Unavailable.

### Một số lỗi khác thì sao?
Một số trường hợp bên ngoài, ví dụ như ứng dụng đang bảo trì,... thì làm sao, không có mã lỗi nào liên quan đến maintenance cả. Đơn giản thui, đâu ai cấm mình define lỗi mới đâu. Chỉ là không đụng chạm với status hiện tại là được mà, vì lúc thông báo bảo trì, thì phía client cần chuyển hướng sang 1 trang bảo trì, vì vậy, mình sẽ sử dụng nhóm 3xx để thông báo lỗi này, VD: **314 - Under Maintenance**
## Handle lỗi với message
Đi cùng với việc trả về status để phía client biết được nó có bị lỗi hay không, thì thường thì mọi người sẽ trả cùng nó 1 cái message đi cùng với message default của status, VD: lúc client thực hiện gọi 1 API để thông tin sinh viên bằng MSSV, nếu server không tìm thấy sinh viên đó thì có thể thông báo `400 - Bad request - No students were found with your student's code`. Sẽ thật đơn giản nếu ở Frontend chỉ code bằng 1 ngôn ngữ thì ok, ở backend có thể tuy biến theo Frontend, nhưng lúc phát triển app, cách giải quyết tốt nhất vẫn là làm sao để Frontend không bị phụ thuộc vào backend quá nhiều. *VD, "Thay vì đợi backend code xong 1 API, thì ở Frontend có thể mock data để render ra trước."*. Vì vậy, cách tiếp cận ở đây của mình là mình sẽ học theo HTTP status, với từng module trong code, mình sẽ define từng nhóm lỗi cho nó.
VD: App thư viện của mình có các module `student`, `book`, `manager`, thì với từng module mình sẽ define từng nhóm lỗi sau:
- 1xx (100 - 199) - Student: Đây là nhóm lỗi dành cho `student`.
- 2xx (200 - 299) - Manager: Đây là nhóm lỗi dành cho `manager`.
- 3xx (300 - 399) - Book: Đây là nhóm lỗi dành cho `book`.

Ở các nhóm lỗi, điều cần nhớ là cần có sự consistency nhất định giữa chúng, VD `100 - Student with id not found` thì với mã lỗi `200` hoặc `300` cũng nên là `Manager with id not found` và `Book with id not found`.

Như vậy, đối với backend, mình sẽ có 1 cái mapping từ lỗi sang status, ở frontend thì ngươcj lại, sẽ mapping từ status sang lỗi.
Vì ở trên, mình đã định nghĩa danh sách lỗi consistency rồi, nên ở dưới này, việc chuyển từ status -> Message sẽ đơn giản hơn, thay vì define rõ ra 100, 101, 102, 103... thằng nào message gì, hay `BOOK_ID_NOT_FOUND` có status bao nhiêu, `STUDENT_ID_NOT_FOUND` có status bao nhiêu 1 cách rõ ràng, thì nó sẽ làm cho code bị duplicate khá nhiều (vi phạm nguyên tắc DRY - Don't Repeat Yourself).

## End
Tóm lại, thay vì trả về status cùng 1 cái message rõ nghĩa, chúng ta nên trả về 1 status, 1 mã lỗi đi kèm với những giá trị mô tả lỗi. Còn cách hiện thị lỗi như thế nào, việc đó hãy để cho Frontend quyết định, như vậy, lúc mà design thay đổi, thì chỉ cần vào frontend sửa code là xong, mà không cần phải sửa cả Frontend lẫn backend.

## Example
Sau đây, mình sẽ demo hàm get message ở Frontend và hàm get status ở backend (viết bằng JS)
```
  // frontend/src/utils/exceptions/errors.js
  const content_mapping = {
      '00': 'id.not_found',
      '01': 'email.not_found',
      '10': 'code.existed',
      'unknown': 'unknown',
  };
  const field_mapping = ['account', 'manager', 'book'];
  const getMsg = (status) => {
      if (status < 100 || status >= 400) {
        console.error('Unknown error to handler');
        return 'error.unknown';
      }
      const field = field_mapping[Number(`${status}`[0])];
      const content = content_mapping[`${status}`[1] + ${status}`[2]];
      return `${field}.${content}`;
  };
  // Use with
  // const msgId = getMsg(status);
  // intl.formatMessage({ id: msgId });
```
Với backend, ở `content_mapping` thay vì map từ status qua content thì mình map từ 1 content qua message.
```
  // backend/utils/exceptions/errror.js
  const content_mapping = {
    'ID_NOT_FOUND': '01',
    'EMAIL_NOT_FOUND': '02',
  };
  const field_mapping = {
    STUDENT: '1',
    MANAGER: '2',
    BOOK: '3',
  };
  const getStatus = (module, status) => {
    return field_mapping[module] + content_mapping[status];
  }
```

# Kết bài
Phần này thì mình cũng méo biết nói gì, ngoài việc hy vọng mn đọc xong bài này, sẽ hiểu rõ và sử dụng đúng cách các mã trạng thái của HTTP.