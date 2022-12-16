![](https://images.viblo.asia/4129c65c-dca7-42c5-8625-dd4f0e8c52f3.png)

Nếu bạn đã nghe nói về ***SHA*** dù hình thức này hay hình thức kia thì chúng ta hẳn cũng chữa hiểu hoàn toàn ý nghĩa của từ viết tắt kia.

Trước khi chúng ta đi vào tìm hiểu xem ***SHA***  là gì thì trước tiên chúng ta tìm hiểu về hàm băm là gì (Hash) và  chúng ta sẽ tìm hiểu cách thức hoạt động các chứng chỉ ***SSL*** sử dụng hàm băm để tạo chữ ký số. Đây là những khái niệm quan trọng trước khi chúng ta tìm hiểu xem chúng làm gì.

## What is a Hash?
 - A hashing algorithm là một hàm băm mật mã. Đây là một thuật toán toán học ánh xạ dữ liệu có kích thước tùy ý thành hàm băm có độ dài cố định. Nó được thiết kế để mã hóa một chiều và không thể mõa hóa ngược lại.
 
 - Hàm băm lý tưởng cần có những yếu tố sau:
     * Nó rất nhanh
     * Nó có thể trả về một phạm vì lớn các giá trị băm
     * Nó tạo ra một giá trị đâu ra duy nhất cho một giá trị đầu vào 
     * Nó tạo ra các giá trị băm không giống nhau cho các giá trị đầu vào tương tự
     * Các giá trị băm được tạo ra không có mẫu rõ ràng
 ## Digital Signatures
 ![](https://images.viblo.asia/fcb8aed3-380e-49ed-998e-befbd84ee55b.jpg)

 - Giao thức SSL / TLS được sử dụng để cho phép truyền dữ liệu an toàn từ thiết bị này sang thiết bị khác trên internet. Nói ngắn gọn,  SSL nó sẽ  mã hóa data và SSL cũng cung cấp xác thực. Tệp chứng chỉ SSL có nhiệm vụ cung cấp thông tin cần thiết để xác thực. Hoặc nói cách khác, chứng chỉ SSL liên kết một khóa công khai cụ thể với một danh tính. 
 - Giao thức SSL / TLS tạo điều kiện cho kết nối sử dụng mã hóa bất đối xứng. Điều này có nghĩa là có hai khóa mã hóa, mỗi khóa xử lý một nửa quy trình: khóa công khai để mã hóa và khóa riêng để giải mã. Mỗi chứng chỉ SSL chứa một khóa công khai mà khách hàng có thể sử dụng để mã hóa dữ liệu và chủ sở hữu chứng chỉ SSL nói trên lưu trữ an toàn một khóa riêng trên máy chủ của họ mà họ sử dụng để giải mã dữ liệu đó và làm cho nó có thể đọc được. 
 - Mục đích chính của mã hóa bất đối xứng này là trao đổi khóa an toàn. Nhờ có các khóa bất đối xứng về sức mạnh tính toán, nó thực tế hơn (và vẫn an toàn) để sử dụng các khóa đối xứng nhỏ hơn cho phần giao tiếp thực tế của kết nối. Đó là lý do tại sao xác thực cực kỳ quan trọng để đảm bảo SSL / TLS thực sự cung cấp bảo mật có ý nghĩa. Chữ ký số là một phần quan trọng trong cách chứng chỉ SSL cung cấp xác thực. Khi chứng chỉ được cấp, nó được ký điện tử bởi Cơ quan cấp chứng chỉ (CA) mà bạn đã chọn làm nhà cung cấp chứng chỉ của mình (ví dụ: Sectigo, DigiCert, v.v.). 
 - Chữ ký này cung cấp bằng chứng mật mã rằng CA đã ký chứng chỉ SSL và chứng chỉ chưa được sửa đổi hoặc sao chép. Quan trọng hơn, một chữ ký xác thực là bằng chứng mật mã rằng thông tin trong chứng chỉ đã được xác minh bởi bên thứ ba đáng tin cậy.
## SHA-1 and SHA-2
-  SHA là viết tắt của Thuật toán Hash an toàn. Phiên bản đầu tiên của thuật toán là SHA-1, và sau đó là SHA-2 . SHA1 tạo ra hàm băm 160 bit (20 byte). Trong định dạng thập lục phân, nó là một số nguyên dài 40 chữ số.  Nó được thiết kế cho các ứng dụng mật mã, nhưng cũng sớm bị phát hiện có lỗ hổng. 
-  Phiên bản thứ hai của SHA, được gọi là SHA-2, có nhiều biến thể. Có lẽ loại được sử dụng phổ biến nhất là SHA-256, mà Viện Tiêu chuẩn và Công nghệ Quốc gia (NIST) khuyến nghị sử dụng thay vì MD5 hoặc SHA-1. Thuật toán SHA-256 trả về giá trị băm là 256 bit hoặc 64 chữ số thập lục phân. Mặc dù không hoàn hảo, nhưng nghiên cứu hiện tại cho thấy nó an toàn hơn đáng kể so với MD5 hoặc SHA-1. Hiệu suất khôn ngoan, hàm băm SHA-256 chậm hơn khoảng 20-30% so với băm MD5 hoặc SHA-1.

## SSL đã chọn SHA làm thuật toán băm cho chữ ký số

- Từ năm 2011 đến 2015, SHA-1 là thuật toán chính. Một cơ quan nghiên cứu đang phát triển cho thấy những điểm yếu của SHA-1 đã thúc đẩy sự đánh giá lại. Trên thực tế, Google thậm chí đã đi xa đến mức tạo ra xung đột SHA-1 (khi hai phần dữ liệu khác nhau tạo ra cùng một giá trị băm) chỉ để cung cấp. Vì vậy, từ năm 2016 trở đi, SHA-2 là tiêu chuẩn mới. Nếu bạn đang nhận được chứng chỉ SSL / TLS ngày hôm nay thì tối thiểu phải sử dụng chữ ký đó. Đôi khi bạn sẽ thấy các chứng chỉ sử dụng SHA-2 384-bit. Bạn sẽ hiếm khi thấy loại 224 bit, không được phê duyệt để sử dụng với các chứng chỉ tin cậy công khai hoặc loại 512 bit ít được phần mềm hỗ trợ rộng rãi. SHA-2 có thể sẽ vẫn được sử dụng trong ít nhất năm năm. Tuy nhiên, một số cuộc tấn công bất ngờ chống lại thuật toán có thể được phát hiện sẽ thúc đẩy quá trình chuyển đổi trước đó. Dưới đây là hàm băm SHA-1 và SHA-2 trên trang web của chúng tôi Chứng chỉ SSL SSL trông như thế nào.

   ![](https://images.viblo.asia/c3721bcd-0d0d-44b4-9536-19b8574d0669.png)
      Image and hash calculation from MD5File.com

 Nó có thể trông không giống nhiều - nhưng chữ ký số là cực kỳ quan trọng để đảm bảo tính bảo mật của SSL / TLS. Băm bit lớn hơn có thể cung cấp bảo mật nhiều hơn vì có nhiều kết hợp có thể hơn. Hãy nhớ rằng một trong những chức năng quan trọng của thuật toán băm mật mã là tạo ra các giá trị băm duy nhất. Một lần nữa, nếu hai giá trị hoặc tệp khác nhau có thể tạo ra cùng một hàm băm, bạn tạo ra cái mà chúng ta gọi là xung đột. Bảo mật của chữ ký số chỉ có thể được đảm bảo miễn là không xảy ra va chạm. Va chạm là cực kỳ nguy hiểm vì chúng cho phép hai tệp tạo cùng một chữ ký, do đó, khi máy tính kiểm tra chữ ký, nó có vẻ hợp lệ ngay cả khi tệp đó chưa bao giờ được ký thực sự.
 
 ## How Many Hashes?
 
 Nếu một thuật toán băm được cho là tạo ra các giá trị băm duy nhất cho mỗi đầu vào có thể, thì có bao nhiêu giá trị băm có thể có? Một bit có hai giá trị có thể có: 0 và 1. Số băm duy nhất có thể có thể được biểu thị bằng số lượng giá trị có thể được nâng lên số bit. Đối với SHA-256 có 2256 kết hợp có thể. Vì vậy, 2256 kết hợp. Số lượng băm có thể càng lớn, cơ hội hai giá trị sẽ tạo ra cùng một hàm băm càng nhỏ. Có (về mặt kỹ thuật) một số lượng vô hạn các đầu vào có thể, nhưng một số lượng đầu ra hạn chế. Vì vậy, cuối cùng, mọi thuật toán băm, bao gồm một thuật toán an toàn, tạo ra một xung đột. SHA-1 được coi là không an toàn bởi vì, do cả kích thước và cấu trúc của nó, việc tạo ra một vụ va chạm là khả thi.
 
  ***Lưu ý rằng độ dài bit lớn không tự động có nghĩa là thuật toán băm tạo ra các giá trị băm an toàn hơn. Việc xây dựng thuật toán cũng cực kỳ quan trọng - đó là lý do tại sao ngành công nghiệp SSL sử dụng các thuật toán băm được thiết kế đặc biệt cho bảo mật mật mã.***
  
Nguồn tham khảo :

https://www.thesslstore.com/blog/difference-sha-1-sha-2-sha-256-hash-algorithms/

https://www.freecodecamp.org/news/md5-vs-sha-1-vs-sha-2-which-is-the-most-secure-encryption-hash-and-how-to-check-them/