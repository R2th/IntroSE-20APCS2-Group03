Sau mấy bài viết về Nginx, Proxy server thì chúng ta vẫn còn rất nhiều việc cần làm để bước đầu đi tìm hiểu về server hơn nữa. Hôm nay mình lại viết một bài để bổ sung thông tin về Reverse proxy server. Chúng ta hãy cùng nhau tìm hiểu về nó nữa nhé :running_woman: 

## Reverse proxy server là gì?

> Reverse proxy là một loại proxy server trung gian giữa một máy chủ và các client gửi tới các yêu cầu. Nó kiểm soát yêu cầu của các client, nếu hợp lệ, sẽ luân chuyển đến các server thích ứng. Trái ngược với một forward proxy, là một trung gian cho phép các client liên hệ với nó liên lạc với bất kỳ máy chủ ảo nào, reverse proxy là một trung gian cho các máy chủ liên hệ với nó được liên lạc bởi bất kỳ client nào. Ưu điểm lớn nhất của việc sử dụng reverse proxy là khả năng quản lý tập trung. Nó giúp kiếm soát mọi request do clieny gửi lên các server được bảo vệ.

Nguồn: https://vi.wikipedia.org/wiki/Reverse_proxy

Proxy server là một máy chủ trung gian hoặc trung gian chuyển tiếp các yêu cầu nội dung từ nhiều máy khách đến các máy chủ khác nhau trên Internet. Reverse proxy server là một proxy server thường nằm sau tưởng lửa trong một mạng riêng và điều hướng các yêu cầu của client đến máy chủ thích hợp. Các reverse proxy thường được triển khai để giúp tăng cường bảo mật, hiện suất và độ tin cậy. 

![](https://images.viblo.asia/ef40197e-ab26-4da5-81d2-759a4508d7e3.PNG)

## Reverse proxy server được dùng để làm gì?
Reverse proxy ở giữa client và network service, như là website. Một số tính năng mà nó mang lại sẽ được liệt kê ở dưới đây.

**Bảo mật**: Bằng cách chặn các yêu cầu được gửi đến máy chủ phụ trợ của bạn, reverse proxy server sẽ bảo vệ danh tính của chúng ta và hoạt động như một biện pháp bảo vệ để chống lại các cuộc tấn công bảo mật. Với reverse proxy server thì một trang web hoặc một dịch vụ sẽ không bao giờ tiết lộ địa chỉ IP của các server gốc. Điều này làm cho những cuộc tấn công có thể khó thực hiện. 

**Cân bằng tải**: Đối với một trang web phổ biến thì hàng ngày sẽ có hàng triệu người dùng truy cập và nó có thể không thể xử lý tất cả lưu lượng truy cập đến bằng một máy chủ duy nhất. Vì vậy, trang web nên được phân phối giữa một nhóm các máy chủ khác nhau và tất cả chúng đều xử lý các yêu cầu cho cùng một trang web. Trong trường hợp này, reverse proxy có thể cung cấp giải pháp cân bằng tải sẽ phân phối đồng đều lưu lượng đến giữa các máy chủ khác nhau để ngăn việc một số máy chủ có thể bị quá tải do chịu nhiều yêu cầu cùng lúc. Còn trong trường hợp một máy chủ bị lỗi hoàn toàn thì các máy chủ khác cũng có thể xử lý lưu lượng. Reverse proxy server ở trước các máy chủ phụ trợ của bạn và phân phối các yêu cầu của client trên một nhóm máy chủ theo cách tối đa hóa tốc độ và sử dụng dung lượng trong khi đảm bảo không có máy chủ nào bị quá tải. 

**Tăng tốc độ trang web**: Reverse proxy server có thể nén dữ liệu gửi đến và gửi đi, cũng như lưu vào bộ nhớ cache các nội dung thường xuyên được yêu cầu, cả hai sẽ làm tăng tốc luồng lưu lượng giữa client và server. Ngoài ra nó cũng có thể thực hiện một số tác vụ bổ sung như mã hóa SSL để giảm tải các máy chủ web của bạn, do đó mà hiệu suất cũng được tăng lên. 

## Reverse proxy và forward proxy
Khác với reverse proxy thì forward proxy dùng để điều chỉnh lưu lượng của client ra ngoài mạng Internet. Nó cũng dùng để che giấu địa chỉ IP của các client và chặn các truy cập rủi ro hoặc là các truy cập không được phép do tổ chức quy định. Forward proxy thường được sử dụng cho các cơ quan, tổ chức lớn nhằm phục vụ mục đích hạn chế truy cập của client.
 * Ngăn chặn truy cập một số trang web nhất định
 * Giám sát hoạt động
 * Chặn các truy cập không được phép đến máy chủ gốc
 * Tăng trải nghiệm người dùng bằng cách lưu nội dung trang thường xuyên được yêu cầu vào bộ nhớ đệm.

![](https://images.viblo.asia/5e329850-cfb4-461f-bacb-0da158c5dbe8.PNG)

## Nguy cơ với reverse proxy
Với việc ngăn chặn không cho bất kỳ ai truy cập trực tiếp vào mạng thì reverse proxy server đã làm cho tin tặc có ít khả năng tấn công vào dữ liệu khách hàng hoặc xâm phạm đến hạ tầng IT. Nó có ít nguy cơ bị tấn công bởi vì:
* Máy chủ được bảo vệ tốt hơn khỏi các tác nhân xấu.
* Một khi trang web của bạn an toàn hơn thì tin tặc có thể sẽ lựa chọn bỏ qua không thực hiện tấn công.

Tuy vậy không phải là nó hoàn toàn không có những nguy cơ về bảo mật. Điều đấy là một điều không thể nói một cách chắc chắn. Một HTTP/S reverse proxy có thể đọc và sửa đổi tất cả các lưu lượng và IP của người dùng đi qua nó. Để lọc/cache/nén hoặc sửa đổi lưu lượng thì nó phải có khả năng giải mã và mã hóa lại lưu lượng HTTPS và do đó có private key tương ứng của chứng chỉ TLS. Vì vậy, rõ ràng nó có thể ghi lại tất cả các mật khẩu đi qua nó hoặc đưa phần mềm độc hại vào các trang web trong trường hợp bị xâm hại hoặc được chạy bởi một bên độc hại. Nếu một reverse proxy đang sử dụng nhiều tên miền khác nhau thì việc ngừng hoạt động của nó có thể làm thiệt hại các tên miền được hỗ trợ.

Một số tổ chức có thể tự cấu hình reverse proxy cho tổ chức của họ nhưng việc này yêu cầu nguồn lực về kỹ thuật phần cứng và phần mềm một cách chuyên sâu và đầu tư lớn vào cơ sở hạ tầng IT. Điều này làm giảm nguy cơ cho các trường hợp được quản lý bởi bên thứ ba và bị tấn công làm nguy hại đến hệ thống của tổ chức. Nếu không đủ khả năng tự làm chủ thì ta có thể hoàn toàn sử dụng dịch vục của bên thứ ba. Ví dụ như Cloudflare CDN cung cấp tất cả các tính năng hiệu suất và bảo mật và thêm nhiều tính năng khác.

## Kết luận
Việc sử dụng reverse proxy mang đến cho ta rất nhiều lợi ích không chỉ về mặt bảo mật mà còn là hiệu suất, tốc độ. Bài viết của mình đến đây xin kết thúc và mong nhận được sự đóng góp của mọi người nếu cho có vấn đề gì còn sai sót :bowing_woman: .

**Tham khảo**

https://en.wikipedia.org/wiki/Reverse_proxy

https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/