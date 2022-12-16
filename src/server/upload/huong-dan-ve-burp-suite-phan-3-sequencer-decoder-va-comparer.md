Trong hai phần trước của hướng dẫn đào tạo Burp Suite, chúng tôi đã giới thiệu một số công cụ có sẵn trong Burp Suite, bao gồm proxy Burp, Burp intruder, Burp spider và Burp repeater . Chúng tôi cũng đã đưa ra cách kiểm thử một ứng dụng Web cho các lỗ hổng XSS và các lỗ hổng  SQL injection. Trong phần cuối cùng này của hướng dẫn  Burp Suite, chúng ta sẽ tìm hiểu thêm về 3 công cụ  nữa Burp Suite: sequencer , Decoder và Comparer .

Burp sequencer
Burp sequencer  được sử dụng để kiểm tra mức độ ngẫu nhiên trong các session tokens được tạo bởi ứng dụng Web. Các cuộc tấn công Brute Force liệt kê mọi sự kết hợp có thể để có được xác thực từ ứng dụng Web. Do đó, điều quan trọng là phải có mức độ ngẫu nhiên cao trong session token IDs. Đối với hướng dẫn về Burp Suite này, chúng ta hãy bắt đầu bằng cách gửi yêu cầu có chứa session token


![](https://images.viblo.asia/5c7e7b63-0792-45bd-b25e-2e81d1aaa371.PNG)
Hình 1. token yêu cầu bằng cách sử dụng sequencer  ( bấm vào để phóng to )

Hình 1 cho thấy một token yêu cầu tới trang web google.com. Phía bên phải của ảnh chụp màn hình có biểu thức các token bắt đầu và token kết thúc . Bạn có thể chỉ định một biểu thức, chẳng hạn như" Google" hoặc thậm chí đặt  offset  từ nơi token phải bắt đầu. Điều này cũng áp dụng cho token cuối của panel, nơi bạn có thể đặt dấu phân cách hoặc chỉ định độ dài cố định để capture bắt đầu. Sau khi sửa các tham số này, nhấp vào BẮT ĐẦU.



![](https://images.viblo.asia/4d530d40-2f30-4dac-87be-08f9d7e86de7.PNG)
Hình 2. Bắt đầu bảng hành động capture ( bấm để phóng to )

Bảng hành động bắt đầu được mô tả trong Hình 2. Nó gửi các yêu cầu đến mục tiêu và đưa ra phân tích chi tiết về tính ngẫu nhiên trong các cookie tokens. Bạn có thể tạm dừng hoặc dừng phân tích tại bất kỳ điểm nào. Đối với hướng dẫn về Burp Suite này, dừng quét giữa chừng và kiểm tra kết quả. Ảnh chụp màn hình trong Hình 3 giải thích kết quả tốt hơn.


![](https://images.viblo.asia/811dbe41-4b6e-40e6-94a1-7d8a5a544ffa.PNG)

Hình 3. Kết quả phân tích ngẫu nhiên token ( bấm vào để phóng to )

Các thành phần quét như sau:

Kết quả chung
Entropy hiệu quả
độ tin cậy
Cỡ mẫu
Burp tự động phân tích các khía cạnh này và tạo báo cáo này trong công cụ tuần tự. Burp cũng cung cấp phân tích cấp độ ký tự, báo cáo về mức độ tin cậy về tính ngẫu nhiên của mẫu, thông qua màn hình đồ họa. Tương tự, phân tích cấp độ bit có thể được thực hiện ở cấp độ bit. Có một tùy chọn để đệm ký tự và cũng có thể giải mã trong base64 nếu cần.

Đối với hướng dẫn đào tạo Burp Suite này, chúng ta hãy xem các tùy chọn sau được cung cấp bởi Burp sequencer. Không ai trong số này là bắt buộc để phân tích và chúng có thể được chọn hoặc bỏ theo ý muốn.

    1. Phân tích số lượng nhân vật 

Thử nghiệm này phân tích phân phối các ký tự được sử dụng trong mỗi mã thông báo.

    2. Phân tích chuyển đổi nhân vật

Thử nghiệm này phân tích sự chuyển đổi các ký tự giữa các mã thông báo liên tiếp. Tùy thuộc vào tính ngẫu nhiên của các ký tự, các phân tích chuyển tiếp khác nhau.






Thử nghiệm monobit

Thử nghiệm này thực hiện phân tích các vị trí 0 và 1 tại mỗi vị trí bit. Nếu thế hệ là ngẫu nhiên, thì phân phối có khả năng xấp xỉ bằng nhau.

    a. Kiểm tra bài poker

Điều này chia chuỗi bit thành các nhóm bốn liên tiếp và duy nhất. Phân phối được đánh giá bằng phương pháp tính chi bình phương.

    b. Trin chạy thử nghiệm

Như tên cho thấy, chuỗi bit được chia thành các chuỗi liên tiếp có cùng giá trị.

    c. Thử nghiệm chạy dài

Tương tự như kiểm tra chạy Trin, kiểm tra này phân tích chuỗi bit dài nhất với các bit liên tiếp có cùng giá trị.

    d. Xét nghiệm quang phổ

Đây là một phương pháp tiên tiến với các phân tích thống kê phức tạp. Nó coi một chuỗi bit là một điểm trong không gian đa chiều và thực hiện các phân tích.

    e. Kiểm tra tương quan

Các thử nghiệm được mô tả cho đến nay phân tích từng bit một cách cô lập. Thử nghiệm tương quan tập hợp các kết quả biệt lập này và trình bày các phân tích bằng cách xem xét toàn bộ các bit.

    f. Thử nghiệm sức ép

Thử nghiệm này hoạt động theo nguyên tắc của kỹ thuật nén ZLIB tiêu chuẩn. Các chuỗi bit được nén và mức độ nén được tính toán. Một mức độ nén cao hơn có nghĩa là mức độ ngẫu nhiên thấp hơn.

Bộ giải mã Burp
Công cụ giải mã Burp được sử dụng để gửi yêu cầu đến bộ giải mã. Trong bộ giải mã, có nhiều tùy chọn để mã hóa yêu cầu theo các định dạng khác nhau, chẳng hạn như base64, URL, v.v. Ngoài ra còn có các tùy chọn để chuyển đổi nó thành băm như MD5 hoặc SHA-1.


![](https://images.viblo.asia/d144423b-947b-421f-9a6a-d67aa5cb6b96.PNG)
Hình 4. Ảnh chụp màn hình bộ giải mã Burp ( bấm vào để phóng to )

Hình 4 mô tả một yêu cầu giải mã Burp. Đối với hướng dẫn đào tạo Burp Suite của chúng tôi, hãy xem xét một yêu cầu được mã hóa như yêu cầu được hiển thị trong Hình 5. Phần trên hiển thị một yêu cầu được mã hóa ở định dạng base64 trong khi yêu cầu thấp hơn mô tả yêu cầu được giải mã thành văn bản thuần túy. Mặc dù toàn bộ yêu cầu đã được mã hóa ở đây, bạn cũng có thể chọn lọc một phần yêu cầu để giải mã / mã hóa.  



![](https://images.viblo.asia/ca4d945a-4a7c-4f99-9747-60d4edde85d8.PNG)
Hình 5. Yêu cầu được mã hóa ( bấm vào để phóng to )

Công cụ này hữu ích khi có mã hóa tên người dùng và mật khẩu phía máy khách thành các bảng băm hoặc bộ mã hóa thường được sử dụng. Trường tên người dùng hoặc mật khẩu có thể được giải mã có chọn lọc và nội dung sau đó được xem trong bản rõ.

Burp so sánh
So sánh Burp được sử dụng để so sánh giữa hai bộ dữ liệu. Chẳng hạn, hai bộ có thể hiển thị các câu trả lời cho hai yêu cầu khác nhau. Việc so sánh có thể được thực hiện theo thang điểm từ (từng chữ) hoặc từng bit một. Burp tự động hóa quá trình này cho người dùng và so sánh hai yêu cầu hoặc phản hồi tương ứng. Đối với hướng dẫn đào tạo Burp Suite này, so sánh được hiển thị trong Hình 6 là hai yêu cầu khác nhau đối với một trang web.


![](https://images.viblo.asia/91991d7b-2dd7-4286-91ab-7cc441d77472.PNG)

Hình 6. So sánh các yêu cầu với một trang web ( bấm vào để phóng to )

Điều này kết thúc loạt hướng dẫn đào tạo Burp Suite. Mức độ mà Burp Suite có thể được sử dụng chỉ bị giới hạn bởi trí tưởng tượng của người dùng.
Refer: https://www.computerweekly.com/tutorial/Burp-Suite-training-tutorial-Part-3-Sequencer-decoder-and-composer