## Vòng đời phát triển của một trò chơi

![](https://images.viblo.asia/5f082d1d-395e-451e-afed-d24690db871c.png)

**Pre-Production (Tiền sản xuất)**: Trong giai đoạn này Ý tưởng trò chơi, Cốt truyện, Chức năng, Phân tích yêu cầu và tài liệu sẽ được thực hiện. Giai đoạn này bao gồm tài liệu thiết kế kỹ thuật và thông số kỹ thuật các tính năng, kiến trúc hạ tầng trò chơi, khung hình, hoạt cảnh. Các danh mục sau đây được xem xét:

* Âm thanh, Camera (Chế độ zoom in, zoom out, phát lại, cinema view - các cảnh game bằng video ngắn phim dựng sẵn), người chơi, các thuộc tính hành động riêng biệt.
* Luồng hoạt động, các nguyên tắc trong trò chơi, điều kiện để lên cấp trong game.
* Các đối tượng trong game, điều kiện để kích hoạt các sự kiện, điểm số, các chuyển động của người chơi, định vị vị trí trong game, thống kê số liệu của người chơi.
* Các vật thể, đối tượng không thể tương tác trong game, hiệu ứng đặc biệt của trò chơi, tiêu đề màn hình, sự hỗ trợ tương các khi thực hiện nhiều nút hiệu ứng, kĩ năng cùng lúc.
* Hỗ trợ những nền tảng nào (mobile, desktop, gamepad...), các đoạn phim trong game, hiệu ứng rung giật hỗ trợ trải nghiệm, những từ ngữ phải được chuẩn hóa (không vi phạm bất kỳ luật lệ nào của các nước có quy định chuẩn), sử dụng các nút bấm.

**Production (Sản xuất)**: Giai đoạn này là giai đoạn lập trình viên bắt tay vào viết mã, cho tới khi giai đoạn coding được hoàn chỉnh. Là sự kết hợp giữa coding, tích hợp các module đơn lẻ, khác nhau lại làm một khối.

**Testing and Deployment (Kiểm thử và Triển khai)**: Trong giai đoạn này: Kiểm thử chức năng, kiểm thử hồi quy, Alpha, Beta, Gold testing được thực hiện. Kiểm thử phạm vi bao phủ và luồng hoạt động của game, lưu lượng, tính toàn vẹn của dữ liệu, kiểm thử cụ thể các thuật toán, kiểm thử đường dẫn (có lưu đúng thư mục trong bộ nhớ local không?), [kiểm thử tăng tiến](https://viblo.asia/p/kiem-thu-tang-tien-incremental-testing-la-gi-oOVlYdbQZ8W) (sự kết hợp giữa kiểm thử đơn vị và kiểm thử kết hợp) cũng được thực hiện.

## Sự khác biệt giữa kiểm thử trò chơi và kiểm thử ứng dụng phần mềm.

![](https://images.viblo.asia/69c7159d-5f5f-4b2c-b2f4-ac3ef27b7885.jpg)

Kiểm thử trò chơi là một quá trình lặp đi lặp lại mỗi khi có bản build mới - có thể có lỗi và phải được kiểm tra kỹ lưỡng.

Mọi bản kiểm thử trò chơi đều theo một cấu trúc cơ bản, bất kể kích thước của trò chơi, thời gian cần thiết để sản xuất trò chơi.

Một QA chuyên nghiệp cần nắm được những nguyên tắc của trò chơi, tài liệu đặc tả. Hiểu được kết cấu, thành phần của trò chơi, kiến trúc định dạng của tệp file, luồng cấu trúc file và các thành phần liên quan đến trò chơi. Với mỗi trò chơi mới với bản mẫu (prototype), các tài liệu kiểm thử cần phải được xem xét và cập nhật thường xuyên khi các thay đổi về thông số kỹ thuật trong game là liên tục. Người kiểm thử cần phải đảm bảo rằng không có vấn đề mới nào được đưa ra.

Công việc của một người kiểm thử trò chơi (Game tester) bao gồm:
* Phân loại tài liệu nghiệp vụ dựa trên mục đích dự định và đối tượng mục tiêu sẽ hướng tới.
* Xác định yêu cầu của người dùng và hệ thống, và nên phân loại chúng thành các yêu cầu chức năng, phi chức năng.
* Xác định các mục có thể kiểm tra được, các mục không thể kiểm tra, mục tiêu và biện pháp cho các thành phần chức năng và phi chức năng.
* Kiểm tra các tài liệu chức năng, tài liệu miêu tả trò chơi có đầy đủ, nhất quán và dễ hiểu hay không.
* Xác định tính phụ thuộc lẫn nhau về các chức năng trong trò chơi (Phần nào liên kết với phần nào).
* Xác định độ ưu tiên của chức năng phụ thuộc vào tính phức tạp, độc đáo, quan trọng của chức năng.
* Xác định chủ ddeeff của trò chơi, nhân vật, hoạt cảnh, AI, phim ảnh, chế độ camera, lối chơi của game.

## Những loại kiểm thử trong trò chơi

### Functional testing.

QA sẽ tìm kiếm các vấn đề chung trong trò chơi hoặc giao diện và đồ họa của người dùng trong trò chơi. Ví dụ như về vấn đề cơ học, vật lý, sự ổn định, tính toàn vẹn về dữ liệu của người dùng, cách thức hoạt động của trò chơi có đúng mô tả hay không.

***Ví dụ***: Kiểm tra màu sắc, hình nền, cấu trúc của menu, độ phân giải màn hình, kích thước chữ, căn chỉnh các đối tượng, khả năng sử dụng, thời gian tải hệ thống khi điều hướng, thời gian chờ tối đa là bao nhiêu, hiển thị sắp xếp các thông báo của trò chơi, hoạt cảnh, hướng dẫn. Tương tác của người dùng: Giao diện người dùng, kiểm tra các giao dịch, hoạt động, kiểm tra độ chính xác của camera trò chơi, độ phân giải của màn hình, kiểm tra các đặc thù của ứng dụng di động, chất lượng âm thanh.

### Compatibility testing.

Kiểm tra xem trò chơi có tương thích trên những thiết bị với cấu hình phần cứng, phiên bản hệ điều hành khác nhau hay không.

![](https://images.viblo.asia/6d24cc13-50f3-416a-9c68-2e8a46d9a348.png)

***Ví dụ***: Cài đặt trò chơi trên mọi thiết bị Android có hỗ trợ từ phiên bản android 5.0.0 trở lên,  và chắc rằng trò chơi vẫn hoạt động ổn định và bình thường trên các thiết bị khác nhau này.

### Performance testing.

Hiệu năng tổng thể của trò chơi phải được kiểm tra kỹ lưỡng, điều chỉnh hiệu năng của trò chơi trực tiếp ảnh hưởng đến tốc độ hoạt động của trò chơi.

Các tham số quan trọng trong quá trình kiểm tra hiệu năng cho trò chơi:
* Thời gian hồi đáp các yêu cầu từ thiết bị và máy chủ, thời gian hoàn thành các giao dịch, hiệu suất tối đa của trò chơi, vùng phù sóng của kết nối, bộ nhớ thấp, pin yếu, thời gian cần thiết để tải ứng dụng, truy cập đồng thời vào trò chơi, tốc độ, thông số...
* Tiêu thụ pin và hiệu suất của đồ họa trò chơi: Đo mức tiêu thụ pin của trò chơi di động. Mức tiêu thụ pin phải tối ưu khi sử dụng trong nhiều giờ, phản hồi của trò chơi cũng được đáp ứng khi kéo dài thời gian tải của trò chơi trên các thiết bị khác nhau.
* Hạn chế của bộ xử lý và bộ nhớ: Mức độ tiêu CPU và bộ nhớ của trò chơi phải nằm trong ngưỡng cho phép, không được vượt quá mức quy định dẫn tới lạm dụng và khiến người dùng cảm giác nặng nề khi sử dụng các ứng dụng.
* Kết nối mạng: Đo thời gian phản hồi của trò chơi khi sử dụng các loại kết nối khác nhau (2G, 3G, 4G, Wifi), điều này cung cấp một cái nhìn tổng quát về mức độ hiệu quả của trò chơi trên các mạng không đáng tin cậy. Nó cũng kiểm tra được kết nối giữa các thiết bị di động và trung tâm dữ liệu hoặc đám mây lưu trữ. 
* Thử nghiệm hiệu năng của trò chơi đặc biệt quan trọng là thể loại MMO (Massively Multiplayer Online - Trò chơi trực tuyến nhiều người chơi).

### Comformance /Compliance Testing.

Tuân thủ các nguyên tắc của thị trường (ví dụ chính sách của Apple), tuân thủ các chính sách bản quyền, luật lệ, giới hạn độ tuổi của trò chơi. Trò chơi nhắm đánh giá làm mục tiêu, nhưng nếu có một nội dung phản cảm, không phù hợp thì chúng sẽ được xếp thành 1 bản báo cáo (report) dành cho trò chơi. Ngay cả một bản báo cáo cũng có thể khiến trò chơi không được phê duyệt giấy phép, điều này làm phát sinh chi phí và mang tới điều xấu cho trò chơi khi phát hành.

***Ví dụ***: Nếu trò chơi hỗ trợ mọi lứa tuổi, thì kiểm tra đầu vào nhập tuổi và lọc được những nội dung phù hợp hay không phù hợp ứng với mỗi lứa tuổi khác nhau.

### Localization testing.

Kiểm thử bản địa hóa trở nên cực kỳ quan trọng khi một trò chơi được nhắm mục tiêu cho thị trường toàn cầu. Tiêu đề trò chơi, nội dung và văn bản cần được dịch và thử nghiệm với các thiết bị bằng nhiều ngôn ngữ. Thường thì về mặt nội dung hay chính tả sẽ có một đội chuyên biệt phụ trách và quản lý, đội ngũ người kiểm thử sẽ chỉ kiểm tra về một số luật cơ bản (ví dụ như hiển thị ngày tháng của các quốc gia sẽ khác nhau, latin hay nonlatin...)

***Ví dụ***: Tính bản địa hóa ở: Hỗ trợ văn phải từ phải qua trái (Ả rập), ngày tháng năm hiển thị, địa chỉ, các loại tiền tệ, chữ nonlatin (Ả rập, Nhật bản, Trung quốc, Thái lan...).

![](https://images.viblo.asia/b2570983-7034-4345-87c1-b3ee0b3751b0.jpg)

### Soak testing.

Thử nghiệm này là việc để trò chơi chạy trong một thời gian dài trong các chế độ hoạt động khác nhau mà không . Ví dụ, không hoạt động và đứng tại một màn chơi trong thời gian dài. Chế độ nghỉ có thể xác định rò rỉ bộ nhớ khi sử dụng trò chơi.

***Ví dụ***: Game bị đơ, không thể điều khiển khi để chế độ nghỉ tại một màn chơi nào đó quá lâu, lỗi này có thể do việc trò chơi chiếm quá nhiều tài nguyên của máy khiến thiết bị ngừng cung cấp và hỗ trợ trò chơi, gây ra lỗi này.


-----

Phần sau chúng ta sẽ nghiên cứu những loại còn lại của kiểm thử trò chơi và một số điều đặc biệt cần nắm khi là một Game tester. 


Phần 2: https://viblo.asia/p/game-testing-kiem-thu-tro-choi-di-dong-co-kho-hay-khong-phan-2-4P856kxBKY3



Nguồn: https://www.guru99.com/game-testing-mobile-desktop-apps.html

https://viblo.asia/p/kiem-thu-tang-tien-incremental-testing-la-gi-oOVlYdbQZ8W