Gần đây, trong khi thực hiện thử nghiệm tại eBay, tôi nhận thấy rằng chúng ta cần một báo cáo chi tiết hơn về việc những gì mà một kiểm thử viên tìm kiếm khi thực hiện kiểm thử sản phẩm. Nó không đơn giản chỉ là tìm lỗi. Hãy xem xét danh sách dưới đây : 
### 1. Kiểm thử viên tìm ra lỗi phần mềm

Nói một cách khác, kiểm thử viên tìm kiếm bất  cứ điều gì đe dọa sản phẩm. Một số người cho rằng, kiểm thử viên chỉ đơn giản là tìm lỗi. Điều này về cơ bản là đúng, nhưng tôi tránh nói theo xu hướng như vậy. Việc kiểm thử viên ngoài tìm lỗi còn làm các công việc khác như đánh giá sản phẩm, xây dựng ý kiến có thể làm cho các lập trình viên cảm thấy không thoải mái, còn người kiểm thử thì cũng gặp đủ mọi rắc rối. 

### 2. Kiểm thử viên tìm ra rủi ro
### 
Kiểm thử viên có khả năng nhận ra các tình huống có thể tạo ra lỗi. Họ nhận thấy các hành vi của sản phẩm có vẻ sai lệch theo một góc nhìn nào đó mà họ cho rằng nó quan trọng, ngay cả khi họ chưa từng thấy điều đó xảy ra. Ví dụ: Một biểu mẫu web đang sử dụng thẻ HTML không dùng nữa, nó hoạt động tốt trong các trình duyệt hiện tại, nhưng có thể ngừng hoạt động trong các trình duyệt trong tương lai. Điều này cho thấy rằng họ nên thực hiện kiểm thử thật tỉ mỉ và cẩn thận. Có thể ngoài biểu mẫu HTML này, vẫn còn những thứ tương tự như vậy trên trang web.

### 3. Kiểm thử viên tìm thấy các vấn đề 

Nó là một loại vấn đề, nhưng nó có giá trị nổi bật. Kiểm thử viên nên chỉ ra các khía cạnh của sản phẩm khiến nó khó quan sát và khó kiểm soát. Có thể có những điều nhỏ mà các nhà phát triển có thể làm (ví dụ: thêm các giao diện và tệp lưu lại giá trị ) để cải thiện khả năng kiểm thử. Và nếu bạn không yêu cầu kiểm thử, thì đó là lỗi của bạn. Ví dụ: Bạn nhìn chằm chằm vào một số liệu cứ thay đổi năm lần một giây, tự hỏi làm thế nào để biết nó con số này có chính xác hay không. Để chắc chắn, bạn cần một tệp lưu lại các giá trị từ phía lập trình viên. 

### 4. Người kiểm thử cũng tìm thấy một sự tình cờ thú khá thú vị 

Cũng là một loại vấn đề, nhưng đáng để làm nổi bật. Đôi khi chúng ta thấy một vấn đề trên sản phẩm và nghĩ đó là lỗi, nhưng thật ra nó chỉ đơn giản chỉ là sự hiển thị trong quá trình kiểm thử, không phải là lỗi. 

Ví dụ: Đôi khi chúng ta nhận được lỗi Certificate Error trên trang web, nhưng đó thực ra là sự tương tác giữa trang web và Burp Proxy, một công cụ ghi âm của người kiểm thử.

### 5.  Kiểm thử viên tìm thấy sự tò mò

Người kiểm thử có thể nhận thấy những điều đáng ngạc nhiên và thú vị về các sản phẩm của họ, không những không thể đe dọa giá trị của sản phẩm mà còn có thể gợi ý các tính năng ẩn dưới phần mềm hoặc cách sử dụng sản phẩm hoàn toàn khác với dự định ban đầu. Một số trong số chúng có thể đại diện cho các tính năng mà các chính các lập trình viên cũng không ngờ tới. Họ cũng có thể đề xuất những cách thử nghiệm mới. Ví dụ: Tôi nhận thấy rằng rất nhiều nội dung phức tạp được lưu trữ trong Iframes trên eBay. Có thể tôi sẽ quét Iframes và khám phá một cách có hệ thống các tập lệnh quan trọng mà tôi cần kiểm thử, để mày mò một cách dùng khác của phần mềm này.
 
*Có thể có những thứ khác bạn nghĩ nên được thêm vào danh sách này. Vấn đề là kết quả kiểm tra có thể khá đa dạng. Hãy luôn giữ đôi mắt và một cái đầu mở khi thực hiện kiểm thử phần mềm. *

Nguồn : https://www.satisfice.com/blog/archives/572