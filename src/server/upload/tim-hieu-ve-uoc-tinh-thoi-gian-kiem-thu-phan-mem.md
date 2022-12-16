Theo thống kê ước tính của QA, việc thử nghiệm một chức năng đơn lẻ chiếm khoảng 20% thời gian phát triển của nó. Thử nghiệm 2 chức năng chiếm 20-30% thời gian phát triển. Kiểm thử giao diện chiếm khoảng từ 30% chiếm 35%.  Nhưng mỗi dự án, thống kê đó không phải là cố định không bao gồm một số rủi ro.

Để giúp công việc ước tính thời gian thử nghiệm chính xác và thực tế hơn, bạn nên sử dụng phương pháp phân tách, tức là bạn nên chia quá trình thử nghiệm thành nhiều phần và ước tính thời gian cho từng phần.

![](https://images.viblo.asia/99ac8319-b1fe-4d32-9905-b7c6e9e1633f.jpg)


Theo quy định, quy trình thử nghiệm của một sản phẩm mới có thể được chia thành 6 giai đoạn chính:

- Xây dựng quy trình, tìm hiểu dự án
- Lập kế hoạch kiểm thử và các trường hợp kiểm thử
- Thiết lập môi trường kiểm thử
- Thực hiện các trường hợp thử nghiệm
- Chỉnh sửa tài liệu sau lần chạy đầu tiên hoặc sản phẩm có thay đổi yêu cầu.
- Kiểm tra hồi quy

### 1. Ước tính thời gian xây dựng quy trình, tìm hiểu dự án

Giai đoạn này bao gồm hai công việc chính là nghiên cứu dự án và đưa ra chiến lược kiểm thử.
Hoạt động nghiên cứu dự án bao gồm nhiều công việc như: đọc và phân tích tài liệu dự án, tổ chức họp, thảo luận chi tiết... Trung bình, nhữnng công việc này nên diễn ra từ 1 đến 2 ngày. Nhiệm vụ này không cần thiết mất cả ngày làm việc nhưng ước tính 1-2 ngày sẽ cho phép bạn có đủ thời gian trong trường hợp có thắc mắc và những câu hỏi.

Số liệu trên chỉ là số liệu trung bình, nếu dự án có quy mô lớn, nhiều tài liệu, công nghệ mới hay thành viên họp không đầy đủ thì thời gian sẽ phải cần thêm.

Xây dựng chiến lược kiểm thử giúp xác định số lượng các công việc  trong tương lai như:
*  Những loại kiểm thử sẽ được thực hiện
*  Cần bao nhiêu QA để xây dựng  các trường hợp kiểm thử và kiểm thử

Dựa vào từng loại dự án, yêu cầu chất lượng mà sẽ lựa chọn các phương pháp kiểm thử phù hợp.
Trong giai đoạn này, việc xác định các thành viên cho công việc trong dự án sẽ giúp ước tính thời gian chính xác hơn vì chúng ta có thể tính đến các kỹ năng, kinh nghiệm và thời gian nghỉ của họ.
 
### 2. Ước tính thời gian lập kế hoạch kiểm thử và các trường hợp kiểm thử

Việc xây dựng kế hoạch kiểm thử và các trường hợp kiểm thử là một quá trình khá tốn công sức và đòi hỏi thời gian đáng kể. Khi lập kế hoạch, bạn nên dựa trên chiến lược thử nghiệm được phát triển ở giai đoạn trước. Chiến lược thử nghiệm cho thấy những loại trường hợp thử nghiệm nào sẽ được tạo ra và độ ưu tiên của chúng.

Trong thực tế, chúng tôi dựa trên quy tắc rằng một yêu cầu đối với sản phẩm phải được kiểm tra bởi ít nhất năm trường hợp thử nghiệm. Với sự trợ giúp của quy tắc này, chúng tôi có thể tính toán số lượng các trường hợp thử nghiệm cần thiết và thời gian để tạo ra chúng.
 
 Một số đặc thù của kế hoạch trong giai đoạn này:
 - Nếu người chuẩn bị kế hoạch kiểm tra và các trường hợp thử nghiệm là người mới, bạn nên ước  tính nhiều thời gian hơn so với người có kinh nghiệm hơn.
-  Nếu dự án sử dụng các công nghệ mới, bạn nên tính đến thời gian nghiên cứu. 
 Tùy thuộc vào độ phức tạp của công nghệ và cũng tùy thuộc vào trình độ của nhân viên sẽ thực hiện nhiệm vụ này, thời gian bổ sung cho nghiên cứu có thể từ một ngày đến vài tuần
 - Tùy thuộc vào các loại thử nghiệm và dự án, bạn có thể cần thời gian để tạo dữ liệu thử nghiệm. Nó cũng nên được tính đến trong giai đoạn này.
 

Nếu công ty có kinh nghiệm trong việc thử nghiệm các dự án tương tự, thì việc sử dụng các kế hoạch thử nghiệm cũ và các trường hợp thử nghiệm sẽ cắt giảm chi phí thời gian .

### 3. Ước tính thời gian thiết lập môi trường kiểm thử

Thời gian cần thiết cho giai đoạn làm việc này phụ thuộc vào các yếu tố sau:

- Có cần thiết phải mua một số thiết bị hay không?  Nếu thiết bị được bán và công ty có thể mua ngay lập tức, thời gian sẽ được cắt giảm đáng kể so với trường hợp khi thiết bị cụ thể được giao bởi khách hàng nước ngoài hoặc khi công ty không thể mua được tại thời điểm đó.
- Thời gian để cài đặt và cấu hình môi trường thử nghiệm phụ thuộc vào trình độ chuyên môn và kinh nghiệm làm việc với các môi trường thử nghiệm tương tự. Nếu công ty có một bộ phận đặc biệt cho các nhiệm vụ như vậy, sẽ cần ít thời gian hơn so với trường hợp khi các QA thực hiện công việc này.

Thông thường, phải mất từ ​​một giờ đến một ngày để định cấu hình môi trường thử nghiệm cho dự án cỡ trung hoạt động với các hệ điều hành phổ biến và không yêu cầu các giải pháp hệ thống phức tạp. Trong trường hợp khác, cần ước tính thời gian bổ sung tùy thuộc vào đặc thù của nhiệm vụ.

### 4. Ước tính thời gian thực hiện các trường hợp thử nghiệm

Trong thực tế của chúng tôi, chúng tôi sử dụng quy tắc rằng việc thực hiện một trường hợp kiểm thử được thực hiện bởi QA sẽ mất khoảng 5 phút. Mỗi trường hợp kiểm thử có độ phức tạp khác nhau. Một số trường hợp kiểm thử có thể được thực hiện trong 1 phút, số khác phải thực hiện trong 10 phút. Kết quả là thời gian trung bình của trường hợp thử nghiệm là 5 phút.

Nên tăng thời gian cho một trường hợp kiểm thử nếu người thực hiện là một QA mới. Do đó, chúng ta cần phải tính đến các rủi ro nếu QA chưa có nhiều kinh nghiệm làm việc.

Một trong những khó khăn chính của việc lập kế hoạch là bạn không thể dự đoán chính xác số lượng lỗi sẽ được tìm thấy trong khi thử nghiệm và sự phức tạp trong quá trình tái hiện chúng. Trung bình, viết một báo cáo về một lỗi mất từ 10 đến 15 phút. Càng tìm thấy nhiều lỗi, càng tốn nhiều thời gian cho các báo cáo. Nếu lỗi quá phức tạp thì có thể mất đến vài giờ để tìm ra vị trí chính xác của nó. Có các phương pháp cho phép bạn ước tính số lượng lỗi có thể có trong mỗi phiên bản sản phẩm nhưng con số có thể không chính xác được.

Để thời gian thử nghiệm không vượt quá thời gian dự kiến, bạn nên ước định thêm thời gian cho các rủi ro có thể xảy ra. Theo các kỹ thuật ước tính thử nghiệm của chúng tôi, chúng tôi khuyên bạn nên thêm khoảng 20-25% thời gian cho rủi ro vào ước tính cuối cùng của bạn.

### 4. Ước tính thời gian chỉnh sửa tài liệu kiểm thử

Giai đoạn làm việc này mất khoảng 10-15% thời gian cần thiết cho việc tạo ra kế hoạch kiểm tra và các trường hợp thử nghiệm.
Sau lần chạy kiểm thử đầu tiên, sẽ có những trường hợp cần thêm vào và có những trường hợp không còn hợp lý. Việc chỉnh sửa tài liệu kiểm thử là cần thiết và nhanh chóng để có thể kiểm thử các lần tiếp theo.
Khi sản phẩm có sự thay đổi, tài liệu cũng cần được cập nhật những trường hợp kiểm thử mới.

### 5. Ước tính thời gian kiểm tra hồi quy

Khi thực hiện ước tính thời gian kiểm tra hồi quy cho các phiên bản sản phẩm mới, bạn nên tính đến các trường hợp sau:

- Những loại thử nghiệm được yêu cầu trong giai đoạn này? Có cần thiết phải thực hiện kiểm tra đầy đủ một lần nữa hay chỉ kiểm tra Smoke testing.
- Số lượng các trường hợp thử nghiệm được lựa chọn

Khi thử nghiệm được thực hiện bởi cùng 1 người thì thời gian cho các thử nghiệm đang chạy có thể giảm vì người thực hiện đã quen thuộc.

Nếu dự án hỗ trợ một số hệ điều hành, cần phải thử nghiệm trên tất cả các hệ điều hành theo yêu cầu kỹ thuật. Khi sản phẩm có kiến trúc máy khách - máy chủ, điều quan trọng là phải chạy thử nghiệm trên hệ thống khác nhau. Thường thì không thể kiểm tra tất cả các môi trường vì tài nguyên thời gian là có hạn.


### Phần kết luận

Thật khó để chỉ ra các kỹ thuật ước tính chính xác trong kiểm thử phần mềm vì quá trình phức tạp với rủi ro cao và luôn có một số sai lệch trong tất cả các ước tính.

Phương pháp mà chúng tôi đề xuất cho bạn sẽ giúp bạn đưa ra ước tính cơ bản cho việc thử nghiệm sản phẩm của bạn. Vì vậy, công thức chung cho ước tính thử nghiệm là như sau (mẫu ước tính của chúng tôi):

T = T (nghiên cứu thông số kỹ thuật + chiến lược thử nghiệm) + T (chuẩn bị tài liệu thử nghiệm) + T (chuẩn bị môi trường thử nghiệm) + T (lần chạy đầu tiên + cập nhật tài liệu thử nghiệm) + T (thử nghiệm hồi quy).

Tài liệu tham khảo: https://www.apriorit.com/qa-blog/197-testing-time-estimation