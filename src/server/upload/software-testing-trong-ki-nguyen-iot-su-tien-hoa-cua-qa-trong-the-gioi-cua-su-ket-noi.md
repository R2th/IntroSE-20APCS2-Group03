Kỉ nguyên Internet of Things (IoT), nơi mà kết nối giữa các thiết bị ở khắp mọi nơi, đã xuất hiện. Năm 2017, đã có 8.4 tỉ thiết bị được kết nối (lớn hơn dân số của cả thế giới), và con số này được kì vọng sẽ tăng lên tới 20.4 tỉ vào năm 2020.

Cùng với việc các thiết bị được kết nối đưa vào cuộc sống của mỗi chúng ta, điều này đem đến một tác động lớn với chúng ta - Cả tốt lẫn xấu.

## Vạch trần những lổ hổng bảo mật tiềm năng của các thiết bị IoT
Tác giả bài viết có một trải nghiệm với IoT khi mua một vài webcam và lắp đặt trong nhà, và thực sự đó là một trải nghiệm mở rộng tầm mắt.
Khi tiến hành nghiên cứu các lựa chọn của bản thân, có những comment với nội dung tương tự xuất hiện lặp đi lặp lại trong các review với tất cả camera. Mọi ra người chỉ ra rằng họ gặp vấn đề bảo mật đối với camera, một số nói rằng họ không đồng tình với điều khoản và sử dụng của các thiết bị này, những điều khoản cho phép nhà sản xuất truy nhập vào dữ liệu data người dùng được thu thập bởi các camera.

Hiện tại, nếu bạn cho là những điều khoản này không đáng lo ngaị, những nghiên cứu gần đây chỉ ra rằng có đến nửa triệu thiết bị ở Barelona (bao gồm cả webcam và các thiết bị màn hình nhỏ) rất dễ bị tấn công cyber attack. Không chỉ dễ bị tấn công, các phụ huynh còn báo cáo rằng các hacker chiếm quyền giám sát con họ.

## Đưa vấn đề bảo mật của các thiết bị IoT vào quan điểm
Câu chuyện về webcam phơi bày vấn đề bảo mật nghiêm trọng của các thiết bị IoT cần được giải quyết. Rất nhiều người trong số chúng ta hiện nay đều kết nối giữa nhà và nơi làm việc, những kết nối này khiến cuộc sống dễ dàng hơn, nhưng tồn tại rất nhiều vấn đề phức tạp phía sau mà chúng ta không hề nghĩ tới. Các thiết bị IoT thực hiện rất nhiều chức năng tính từ quan điểm kiến trúc thiết kế - kết nối với WiFi, lưu trữ dữ liệu trên AWS, charge thẻ tín dụng và danh sách cứ tiếp tục.

Tuy nhiên, những kết nối cứ tiếp tục sâu dần, và rủi ro về về bảo mật cũng vậy, càng có nhiều kết nối với mỗi thiết bị chúng ta có, càng có thêm kết nối chúng ta cung cấp cho các hacker truy cập vào data người dùng.

## Software Testing trong kỉ nguyên IoT: Sẵn sàng cho một trò chơi mạo hiểm mới
Cùng với số lượng thiết bị IoT tiếp tục tăng lên, tiềm năng về rủi ro bảo mật cũng sẽ tăng theo. Kết quả, các chúng ta test các kết nối phần mềm này cần thay đổi. Và sự thay đổi này không sớm thì muộn sẽ phải thay đổi.

Cụ thể, dưới đây là 3 cách quan trọng để bạn phát triến hướng tiếp cận test trong kỉ nguyên IoT

### 1. Giới thiệu về Continuous Security Testing
Một trong những lí do khiến IoT tự mở ra những lỗ hổng tấn công bảo mật chính là bởi có quá nhiều cổng kết nối và có rất nhiều sự kiện xảy ra cùng với những kết nối này, sẽ rất dễ dàng mất dấu những dấu gây ra những rủi do bảo mật này. Nhưng khi tìm hiểu sâu hơn về IoT, sẽ cần có sự thay đổi, vậy nên Continuous Security Testing sẽ là chìa khoá để khiến điều này trở nên khả thi.

Phần lớn thời gian hiện nay, testing team thực hiện security và load testing ở cuối tiến trình phát triển sau khi đã hoàn thành toàn bộ unit và functional test. Nhưng khi chúng ta test security cuối cùng, nó sẽ trở thành bước bổ sung chứ không phải một quá trình xuyên suốt. Để có được mô hình bảo mật tốt nhất, Testing team cần đưa security test vào tiến trình phát triển phần mềm từ sớm và thường xuyên hơn.

Loại Continuous Security Test chỉ trở nên quan trọng khi mà tỉ lệ phát triển của IoT với tốc độ cao như hiện tại. Một khảo sát gần đây của Fortune 500 CEOs cho thấy tốc độ thay đổi công nghệ và thông tin an ninh mạng là hai mối quan tâm này đóng vai trò dặc biệt trong kỉ nguyên IoT. Bởi team dev bắt đầu phát triển cực nhanh và các phần mềm có nhiều kết nối interconnect, sẽ khó hơn rất nhiều để thấy được toàn bộ giao thức tại chỗ và xác định được điểm yếu hệ thống. Do đó, Continuous Security Test sẽ ngày trở nên quan trọng để giúp vấn đề bảo mật theo kịp với tốc độ phát triển phần mềm.

### 2. Xác định những vấn đề bạn *không* cần test
Với tất cả hệ thống và kết nối khác nhau mà IoT giới thiệu, có rât nhiều điều mà bạn cần chú ý khi test. Kết quả, khi chúng ta kết hợp những nhu cầu test bảo mật continuous với yêu cầu tăng tốc độ bàn giao sản phẩm, điều quan trọng là cần tìm ra những phần cần test và những mục *không* cần test

Xác định những mục chúng ta không thể test cho mỗi bản release mà không hy sinh vấn đề bảo mật sẽ giúp giảm thiểu những quan ngại xung quanh việc duy trì phạm vi test phù hợp và giảm bớt áp lực về deadline.

Khi chúng ta cân nhắc về những lĩnh vực phần mềm mà chúng ta không cần test với mỗi bản release, hãy chú ý các giao thức đã trải qua security test và giữ nguyên cho một số bản release tiếp theo. Nếu có thể xác định khoanh vùng được khu vực này, sẽ dễ dàng hơn để ưu tiên chiến lược test của bản thân nhưng vẫn đáp ứng các mục tiêu bảo mật và đáp ứng cả timeline phần mềm.

### 3. Cải thiện chiến lược test tự động hoá với cả các service ảo
Một trong những yếu tố quan trọng nhất để thành công với test tự động là có một môi trường gần với môi trường production nhất có thể. Để đạt được mục tiêu này là khó khăn trong kỉ nguyên IoT bởi thường tất cả các hệ thống được kết nối với nhau mà các ứng dụng IoT dựa vào đều có sẵn để test. Không giống như một trang web đơn giản chỉ cần một vài giao thức để hoạt động, tính liên kết của IoT cần làm rất nhiều việc để có thể có được một môi trường test thích hợp.

Thách thức đưa ra, là một service ảo, hoặc môi trường ảo giống như môi trường thật là điều bắt buộc. Mặc dù môi trường ảo có thể không giống hệt môi trường production mà thực tế tồn tại, nhưng đó chính là môi trường gần nhất mà team phát triển phần mềm có thể tiếp cận được trước khi đưa lên môi trường production.

Một chiến lược service ảo mạnh là rất quan trọng trong kỉ nguyên IoT bởi không có nó, chúng ta sẽ phải đối mặt với sự tăc nghẽn thường xuyên tiềm ẩn, chờ đợi trên mọi giao thức cần test một thay đổi hoặc, nếu không chờ đợi, chúng ta sẽ thiếu đi sự tự tin về bảo mật mỗi  bản release.

### IoT đã xuất hiện và thực tiễn QA phải phát triển theo
Không có nghi ngờ gì về việc thời đại IoT đã chính thức đến. Và trong khi đó, có một triển vọng thú vị, nó cũng mang tới vô số rủi ro bảo mật. Để giảm thiểu những rủi ro này vá giúp người dùng tận hưởng hết các lợi ích IoT đem lại một cách an toàn, các team test cần phát triển kĩ năng QA của họ có thêm kiểm tra bảo mật liên tục, ưu tiên test cải tiến và dựa vào các service ảo đáng tin cậy.

Nguồn: https://www.qasymphony.com/blog/software-testing-iot-era/#