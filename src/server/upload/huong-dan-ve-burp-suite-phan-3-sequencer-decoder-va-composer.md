Trong hai phần trước của hướng về Burp Suite, chúng tôi đã giới thiệu một số công cụ có sẵn trong Burp Suite, bao gồm proxy Burp, kẻ xâm nhập Burp, nhện Burp và bộ lặp Burp. Chúng tôi cũng đã thấy cách kiểm tra một ứng dụng Web cho các lỗ hổng XSS và các lỗ hổng tiêm SQL. Trong phần cuối cùng này của hướng dẫn đào tạo Burp Suite, chúng ta sẽ bao gồm ba công cụ của Burp Suite: sequencer , giải mã và Comparer .

Burp sequencer
Công cụ tuần tự Burp được sử dụng để kiểm tra mức độ ngẫu nhiên trong các mã thông báo phiên được tạo bởi ứng dụng Web. Các cuộc tấn công vũ phu liệt kê mọi sự kết hợp có thể để có được xác thực từ ứng dụng Web. Do đó, điều quan trọng là phải có mức độ ngẫu nhiên cao trong ID mã thông báo phiên. Đối với hướng dẫn đào tạo Burp Suite này, chúng ta hãy bắt đầu bằng cách gửi yêu cầu có chứa mã thông báo phiên.

![](https://images.viblo.asia/01358f58-0f05-4323-a5bc-cc2933e6bdb5.PNG)


Hình 1. Yêu cầu mã thông báo bằng cách sử dụng trình phân tích cú pháp ( bấm vào để phóng to )

Hình 1 cho thấy một yêu cầu mã thông báo cho trang web google.com. Phía bên phải của ảnh chụp màn hình có các biểu thức bắt đầu và mã thông báo kết thúc mã thông báo. Bạn có thể chỉ định một biểu thức, chẳng hạn như Google Google Google hoặc thậm chí đặt phần bù từ nơi mã thông báo phải bắt đầu. Điều này cũng áp dụng cho bảng kết thúc mã thông báo, nơi bạn có thể đặt dấu phân cách hoặc chỉ định độ dài cố định để chụp bắt đầu. Sau khi sửa các tham số này, nhấp vào BẮT ĐẦU.



![](https://images.viblo.asia/7f38ee80-2691-4a6d-be97-920136bad5d8.PNG)
Hình 2. Bắt đầu bảng hành động chụp ( bấm để phóng to )

Bảng hành động bắt đầu được mô tả trong Hình 2. Nó gửi các yêu cầu đến mục tiêu và đưa ra phân tích chi tiết về tính ngẫu nhiên trong các mã thông báo cookie. Bạn có thể tạm dừng hoặc dừng phân tích tại bất kỳ điểm nào. Đối với hướng dẫn đào tạo Burp Suite này, dừng quét giữa chừng và kiểm tra kết quả. Ảnh chụp màn hình trong Hình 3 giải thích kết quả tốt hơn.



![](https://images.viblo.asia/795b7af4-aad9-49d0-9d4e-734ef3e70375.PNG)
Hình 3. Kết quả phân tích ngẫu nhiên mã thông báo ( bấm vào để phóng to )

Các thành phần quét như sau:

Kết quả chung
Hiệu quả Entropy 
độ tin cậy
Cỡ mẫu
Burp tự động phân tích các khía cạnh này và tạo báo cáo này trong công cụ Sequencer. Burp cũng cung cấp phân tích cấp độ ký tự, báo cáo về mức độ tin cậy về tính ngẫu nhiên của mẫu, thông qua màn hình đồ họa. Tương tự, phân tích cấp độ bit có thể được thực hiện ở cấp độ bit. Có một tùy chọn để đệm ký tự và cũng có thể giải mã trong base64 nếu cần.

Đối với hướng dẫn về Burp Suite này, chúng ta hãy xem các tùy chọn sau được cung cấp bởi Burp sequencer. Không tùy chọn nào là bắt buộc để phân tích và chúng có thể được chọn hoặc bỏ theo ý muốn.

    1. Phân tích số ký tự

Kiểm thử  này phân tích phân phối các ký tự được sử dụng trong mỗi token.

    2. Phân tích chuyển đổi ký tự

Thử nghiệm này phân tích sự chuyển đổi các ký tự giữa các token liên tiếp. Tùy thuộc vào tính ngẫu nhiên của các ký tự, các phân tích chuyển tiếp khác nhau.






Kiểm thử FIPS monobit 

Kiểm thử này thực hiện phân tích các vị trí 0 và 1 tại mỗi vị trí bit. Nếu sự tạo ra là ngẫu nhiên, thì phân phối có khả năng xấp xỉ bằng nhau.

    a. Kiểm thử  FiPS poker 

Điều này chia chuỗi bit thành các nhóm bốn liên tiếp và duy nhất. Phân phối được đánh giá bằng phương pháp tính chi bình phương.

    b. Kiểm thử FIPS run

Như tên cho thấy, chuỗi bit được chia thành các chuỗi liên tiếp có cùng giá trị.

    c. Kiểm thử FIPS long rún

Tương tự như  Kiểm thử FIPS run, kiểm tra này phân tích chuỗi bit dài nhất với các bit liên tiếp có cùng giá trị.

    d. Kiểm thử Spectral

Đây là một phương pháp tiên tiến với các phân tích thống kê phức tạp. Nó coi một chuỗi bit là một điểm trong không gian đa chiều và thực hiện các phân tích.

    e. Kiểm tra Correlation

Các kiểm thử được mô tả cho đến nay phân tích từng bit một cách cô lập. Thử nghiệm Correlation  tập hợp các kết quả biệt lập này và trình bày các phân tích bằng cách xem xét toàn bộ các bit.

    f. Kiểm thử Compression

Kiểm thử  này hoạt động theo nguyên tắc của kỹ thuật nén ZLIB tiêu chuẩn. Các chuỗi bit được nén và mức độ nén được tính toán. Một mức độ nén cao hơn có nghĩa là mức độ ngẫu nhiên thấp hơn.

Burp decoder
Công cụ Burp decoderp được sử dụng để gửi yêu cầu đến bộ giải mã. Trong bộ giải mã, có nhiều tùy chọn để mã hóa yêu cầu theo các định dạng khác nhau, chẳng hạn như base64, URL, v.v. Ngoài ra còn có các tùy chọn để chuyển đổi nó thành băm như MD5 hoặc SHA-1.

![](https://images.viblo.asia/8f3536a5-7561-4c8c-b47e-f7a7bf99b115.PNG)

Hình 4. Ảnh chụp màn hình bộ giải mã Burp ( bấm vào để phóng to )

Hình 4 mô tả một yêu cầu giải mã Burp. Đối với hướng dẫnvề Burp Suite của chúng tôi, hãy xem xét một yêu cầu được mã hóa như yêu cầu được hiển thị trong Hình 5. Phần trên hiển thị một yêu cầu được mã hóa ở định dạng base64 trong khi yêu cầu thấp hơn mô tả yêu cầu được giải mã thành văn bản thuần túy. Mặc dù toàn bộ yêu cầu đã được mã hóa ở đây, bạn cũng có thể chọn lọc một phần yêu cầu để giải mã / mã hóa.  


![](https://images.viblo.asia/79e1a589-6588-4204-9d72-c4777f9b5ba0.PNG)

Hình 5. Yêu cầu được mã hóa ( bấm vào để phóng to )

Công cụ này hữu ích khi có mã hóa tên người dùng và mật khẩu phía máy khách thành các bảng băm hoặc bộ mã hóa thường được sử dụng. Trường tên người dùng hoặc mật khẩu có thể được giải mã có chọn lọc và nội dung sau đó được xem trong plaintext.

Burp comparer
Burp comparer được sử dụng để so sánh giữa hai bộ dữ liệu. Chẳng hạn, hai bộ có thể hiển thị các câu trả lời cho hai yêu cầu khác nhau. Việc so sánh có thể được thực hiện theo thang điểm từ (từng chữ) hoặc từng bit một. Burp tự động hóa quá trình này cho người dùng và so sánh hai yêu cầu hoặc phản hồi tương ứng. Đối với hướng về tạo Burp Suite này, so sánh được hiển thị trong Hình 6 là hai yêu cầu khác nhau đối với một trang web.



![](https://images.viblo.asia/70cb197b-bd32-44aa-9c3a-eb0a41bfbcfa.PNG)
Hình 6. So sánh các yêu cầu với một trang web ( bấm vào để phóng to )

Đến đây  kết thúc loạt hướng về Burp Suite. Mức độ mà Burp Suite có thể được sử dụng chỉ bị giới hạn bởi trí tưởng tượng của người dùng.

Refer:https://www.computerweekly.com/tutorial/Burp-Suite-training-tutorial-Part-3-Sequencer-decoder-and-composer