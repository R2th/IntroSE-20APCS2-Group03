Đã bao giờ bạn tự hỏi tại sao lúc bị chặn vào 1 trang web nào đó, bạn làm theo hướng dẫn trên mạng đổi DNS thì lại vào được? Sau đây mình xin trình bày cách hoạt động của DNS để mọi người hiểu rõ hơn về nó.

## 1. DNS là gì ?
DNS là viết tắt của Domain Name System tạm dịch là "Hệ thống phân giải tên miền". Về bản chất cách để máy tính truy cập được một trang web là nhờ địa chỉ IP. Ví dụ bạn muốn truy cập vào google.com thì tức là browser đang request tới IP máy chủ của google. Tuy nhiên có cả triệu website và bạn phải nhớ địa chỉ IP của từng trang web, điều đó là bất khả thi và chưa kể trường hợp địa chỉ IP của trang web đó có thể thay đổi liên tục. Đó cũng chính là nguyên nhân mà DNS được sinh ra. DNS sẽ đóng vai trò như một cuốn danh bạ, thay vì phải nhớ 1 dãy IP loằng ngoằng thì bạn sẽ nhớ đến tên miền của trang web đó, vd như google.com và tất nhiên như vậy sẽ thân thiện với người sử dụng hơn, và DNS sẽ có vai trò là phân giải tên miền thành địa chỉ IP tương ứng nhờ đó browser có thể gửi request tới server.
## 2. Các loại DNS Server
Để lấy được IP của 1 tên miền thì có thể có sự tham gia của 4 loại DNS server
- DNS Recursor: Bạn có thể hiểu DNS Recursor giống như một thủ thư, khi bạn truy cập 1 trang web, browser sẽ nhờ "thủ thư" tìm hộ địa chỉ IP, "thủ thư" sẽ đảm nhận việc đi tìm địa chỉ IP và trả về kết quả cho client. Để tìm địa chỉ IP thì thủ thư sẽ dùng các DNS server mình sẽ nhắc ở dưới đây. Ngoài ra thì DNS Recursor sẽ có cơ chế cache để tăng tốc độ phản hồi thay vì lúc nào cũng đi tìm IP.
- Root Name Server: Là nơi xử lý bước đầu tiên trong việc dịch (phân giải) các tên máy chủ thành địa chỉ IP. Nó có thể được coi giống như một mục lục trong thư viện trỏ đến các giá sách khác nhau - đóng vai trò như một tham chiếu đến các DNS Server khác. Vd: Ta request địa chỉ IP của google.com thì Root name server sẽ trả về IP máy chủ DNS của .com (TLD Nameserver)
- TLD Name Server (Top level domain name server):  Có thể được coi như một giá sách cụ thể trong thư viện. Máy chủ định danh này là bước tiếp theo trong quá trình tìm kiếm địa chỉ IP cụ thể và nó lưu trữ phần cuối cùng của tên máy chủ (Vd google.com, máy chủ TLD sẽ trả về IP của DNS chứa .google”).
- Authoritative Name Server: Có thể được coi như một cuốn từ điển trên giá sách. Là điểm dừng cuối cùng trong truy vấn địa và sẽ trả về địa chỉ IP của tên miền được yêu cầu cho DNS Recursor.
## 3. Các bước phân giải tên miền
Để hiểu rõ ta sẽ cùng đi tìm hiểu  từng bước thực hiện phân giải tên miền
1. Người dùng nhập "google.com" vào browser. Truy vấn sẽ được truyền vào Internet và được nhận bởi DNS Recursor
2. DNS Recursor sẽ gửi truy vấn tới Root Name Server (.)
3. Root Name Server sẽ trả về địa chỉ  IP của TLD Name Server ( ở đây sẽ là .com TLD)
4. DNS Recursor tiếp tục gửi truy vấn tới .com TLD
5. .com TLD sẽ phản hồi bằng địa chỉ IP của google.com Authoritative Name Server
6. DNS Recursor lại gửi truy vấn tới google.com Authoritative Name Server
7. google.com Authoritative Name Server sẽ trả về địa chỉ IP của google.com cho DNS Recursor
8. DNS Recursor phản hồi lại browser địa chỉ IP của tên miền được yêu cầu
Sau khi thực hiện 8 bước trên thì browser đã có thể thực hiện request rồi.
9. Browser thực hiện HTTP Request đến địa chỉ IP vừa truy vấn xong
10. Server response dữ liệu về cho browser
![image.png](https://images.viblo.asia/30f3bae7-4094-4be3-9cc0-19d619c513b4.png)
## 4. Local DNS
Việc truy vấn IP của 1 tên miền khá là dài dòng cho nên hầu hết các DNS Server đều thực hiện việc cache để giảm thiểu việc đi hết tất cả các step ở trên. Không ngoại lệ, ngay chính HĐH của chúng ta cũng cache lại các địa chỉ vừa được request để tăng tốc độ phản hồi thay vì đi nhờ DNS Recursor. Bên cạnh đó HĐH còn cung cấp 1 thứ đó là file hosts (trên linux nó nằm trong thư mục `/etc/hosts` còn với window là `"C:\Windows\System32\drivers\etc\hosts`), với file này ta có thể can thiệp vào việc truy vấn DNS. Giả sử ta biết địa chỉ IP của 1 trang web và nó không có tên miền, việc ghi nhớ địa chỉ IP này khá mệt mỏi thì ta có thể thêm địa chỉ IP cùng tên miền mong muốn vào file hosts. Ví dụ:
`192.168.1.10 example.com`
Sau đó, nếu mở trình duyệt và nhập http://example.com, nó sẽ tự động chuyển hướng đến 192.168.1.10. Dễ dàng hơn nhiều so với việc gõ địa chỉ IP mỗi lần. Ngoài ra bạn có thể dùng nó để block các  trang web, chẳng hạn bạn muốn con bạn không thể truy cập vào một trang web nào đó thì bạn có thể chèn tên miền cùng địa chỉ IP loopback vào file hosts. Ví dụ: 
`127.0.0.1 example.com`
* Lưu ý: Chrome đôi khi sẽ không quan tâm file config trong file hosts nên nó sẽ vẫn thực hiện DNS query
## 5. Public DNS
Nếu không config gì cả thì mặc định DNS Recursor của bạn sẽ là của nhà mạng. Do đó trong một vài trường hợp nhà mạng block một trang web nào đó, ta hoàn toàn có thể qua mặt bằng cách đổi "thủ thư" - DNS Recursor. 
![image.png](https://images.viblo.asia/28f78512-9d77-4ac3-8d54-787426361b14.png)
Ở hình minh hoạ trên mình đang dùng Public DNS của google.com. DNS của Google khá là nhanh nên bạn cũng có thể sử dụng nó thay cho DNS mặc định của nhà mạng.
## Kết
Đó là những gì mình tìm hiểu được về DNS. Có lẽ còn nhiều thiếu sót mong nhận được sự đóng góp ý kiến từ mọi người :D