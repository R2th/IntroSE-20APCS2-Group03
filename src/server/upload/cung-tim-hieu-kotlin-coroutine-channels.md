###  Tải dữ liệu không đồng bộ
Khi chúng ta gọi một hàm không đồng bộ như một cuộc gọi service, lấy dữ liệu từ cơ sở dữ liệu, đọc tệp hoặc bất cứ thứ gì, chúng ta cần một cuộc gọi lại để chúng ta biết rằng hoạt động đã kết thúc và chúng ta có thể tiếp tục công việc thực tế như trong điện thoại di động cập nhật giao diện người dùng sau khi nhận được dữ liệu từ máy chủ của bạn.  
Nhưng giả sử sau khi nhận dữ liệu từ máy chủ, nếu bạn cần lọc dữ liệu dựa trên một số số liệu bạn cần thực hiện một số thao tác cơ sở dữ liệu cục bộ và một lần nữa bạn cần một cuộc gọi lại khác, vì vậy danh sách sẽ tiếp tục cho các dự án phức tạp dẫn đến một vụ nổ của cuộc gọi lại.  
![](https://images.viblo.asia/7fc5a115-99a5-4754-bec6-5b86664e70ba.png)  
Đó là nơi sức mạnh thực sự của coroutines phát huy tác dụng, với coroutines bạn không còn cần phải viết lại các hàm cho các chức năng không đồng bộ nữa.  
Các bạn có thể tìm hiểu về Kotlin corotine ở đây:  [Koltin Coroutines](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-1-gioi-thieu-kotlin-coroutine-va-ky-thuat-lap-trinh-bat-dong-bo-gGJ59xajlX2)   
###  Channel là gì ?
Channel là các pipe, có cấu trúc và nơi bạn gửi dữ liệu ở một bên và nhận dữ liệu ở phía bên kia, như được hiển thị bên dưới.
    ![](https://images.viblo.asia/6fc152e9-9c7d-4790-a07d-3c94fce5d3dc.png)
Để sử dụng channels, bạn cần thay đổi một chút mã, thay vì sử dụng List<Response> để trả về giá trị, chúng ta sẽ sử dụng receiveChannel <Response> thay vì sử dụng buildlist chúng ta dùng produce thay vì sử dụng add chúng ta sẽ dùng send():
```
suspend fun foo() : ReceiveChannel<Response> = produce{
      send(execute("A"))
      send(xecute("B"))
      send(Execute("C"))
}
```
Và sau đó, trong khi sử dụng nó trong luồng, chúng ta sẽ nhận được các channels thay vì list các responses. Sau đó, bạn lặp lại và in, hãy xem:  
```
fun getData() {
    val chaannel = withContext(Dispatchers.IO) { foo() }
    for (x in channel) println(x)
}
```   
Có điều gì khác biệt khi sử sụng nó?
Khi bạn gọi hàm foo(), nó sẽ tạo channel và trả lại ngay lập tức nhưng đã bắt đầu execution. Bây giờ chúng ta có hai coroutines đang chạy. Một để phát ra dữ liệu và những người khác để quan sát nó.
Khi bạn gọi cahnnel trong khi lặp lại, việc thực thi bắt đầu và nó sẽ thực hiện lần đầu tiên và trả về phản hồi và sau đó lần thứ hai và các kênh khác tương tự, Hãy xem để có cái nhìn tốt hơn:    
![](https://images.viblo.asia/c5b2fdc2-47aa-4cad-9de9-b93a979b09f2.png)  
Vì vậy, bằng cách sử dụng Channels, bạn không còn phải chờ để hoàn thành tất cả các thực thi. Nhưng có một vấn đề ở đây:
Hãy nhớ rằng mình đã nói trước đó rằng hai coroutines đang chạy, một để quan sát và một để phát ra. Điều gì xảy ra nếu không có người quan sát, do nhầm lẫn hoặc bất kỳ ngoại lệ nào?
Bạn biết Channel dùng mở kết nối mạng hoặc đọc tệp sử dụng tài nguyên quý giá và nếu không có người quan sát, kết nối sẽ vẫn mở và tìm kiếm người quan sát.
Chúng ta có thể giải quyết chuyện này nhưng về lâu dài. Nó sẽ gây ra vấn đề nghiêm trọng trong việc gỡ lỗi và thử nghiệm trong thời gian dài.
Chúng ta có thể làm tốt hơn. Đúng, và đó là cách mà **Flow,** một khái niệm Kotlin được ra đời .
 Phần chia sẻ của mình đến đầy là hết ! Cảm ơn mọi người đã quan tâm ! :grinning:  
    Link tham khảo :   
    [viblo](https://viblo.asia/p/cung-hoc-kotlin-coroutine-phan-11-channels-part-1-of-2-bJzKmJpXZ9N)  
    [medium](https://medium.com/better-programming/asynchronous-data-loading-with-new-kotlin-flow-233f85ae1d8b)