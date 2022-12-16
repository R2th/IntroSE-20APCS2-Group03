Đối với những website thì tốc độ tải trang rất quan trọng. Người dùng chỉ hứng thú với những website load nhanh, còn khi một trang web đáp ứng chậm, khách sẽ mất kiên nhẫn và khả năng họ quay lại sẽ là rất thấp. 

Như vậy, những người tìm kiếm thông tin thường rất sốt ruột khi phải đợi những trang web được tải xuống. Nếu những trang Web của bạn không đủ nhanh, nhiều người tìm kiếm thông tin sẽ ra đi mà không thèm xem trong website có thứ gì.
Vì thế bài viết này mình sẽ đưa ra một số mẹo để giúp cải thiện tốc độ tải của trang web, các bạn cùng theo dõi nhé.

### 1. Bố cục HTML
**HTML**, hay ngôn ngữ đánh dấu siêu văn bản, là xương sống của hầu hết mọi trang web. 
HTML cho phép bạn định dạng các trang web với các tiêu đề, tiêu đề phụ, danh sách và các tính năng tổ chức văn bản hữu ích khác.

**HTML** có thể dễ dàng được đọc bởi trình thu thập dữ liệu web , vì vậy các công cụ tìm kiếm có thể cập nhật nội dung trang web của bạn một cách kịp thời. 
Khi xử lý HTML, bạn nên cố gắng viết theo cách ngắn gọn và hiệu quả . 
Ngoài ra, khi tham khảo các tài nguyên khác trong tài liệu HTML của bạn, có một số phương pháp hay nhất mà bạn nên làm theo.

#### Vị trí đặt CSS
CSS là các đoạn mã tạo ra giao diện cho trang web, vì vậy cần đặt CSS ngay ở trên đầu trang, để khi người dùng vào trang web không cần phải đợi lâu để có được giao diện bắt mắt.
```
<head>
    <link href='https://yourwebsite.com/css/style.css' rel='stylesheet' type='text/css'>
</head>
```
Việc đặt CSS ở đầu trang không làm cho trang web tải nhanh hơn nhưng giúp người dùng có trải nghiệm tốt hơn.

#### Vị trí đặt Javascript
Trước đây, khi sử dụng thẻ  **<script>** để tham chiếu tới tập tin bên ngoài thì hầu hết các trường hợp bạn được khuyên nên đặt thẻ **<script>** ở trước thẻ đóng **</body>**. Điều này như bạn đề cập trong câu hỏi sẽ giúp cho trình duyệt có thể tải về mã HTML một cách liên tục mà không bị dừng lại giữa chừng để chờ tải về các tập tin JavaScript được tham chiếu vào trang.
    
Tuy nhiên, mới đây hai thuộc tính async và defer được giới thiệu để sử dụng cho thẻ **<script>**. Sử dụng hai thuộc tính này sẽ giúp mã lệnh JavaScript có thể được tải bất đồng bộ cùng với mã HTML. Điều này giúp cho trình duyệt có thể đồng thời tải cả mã HTML và JavaScript cùng một lúc.

Khi đó bạn nếu bạn sử dụng thẻ **<script>** ở bên trong thẻ **<head>** như sau:
```
<head>
    <script src='https://yourwebsite.com/js/script.js' type='text/javascript' defer>
</head>
```
Thì tốc độ tải trang sẽ nhanh hơn khi để thẻ **<script>** ở cuối trang (trước thẻ **<body>**) vì lúc này chúng ta tận dụng được lợi thế trình duyệt tải về đồng thời HTML và JavaScript cùng một lúc.
    
### 2. Giảm yêu cầu HTTP bên ngoài
Tốc độ tải tài nguyên bên ngoài có thể thay đổi tùy thuộc vào cơ sở hạ tầng máy chủ của nhà cung cấp dịch vụ lưu trữ, vị trí, v.v. 
Mục tiêu đầu tiên của bạn khi giảm các yêu cầu HTTP bên ngoài là kiểm tra trang web của bạn với một cái nhìn tối giản. 
Nghiên cứu từng thành phần của các trang web của bạn và loại bỏ bất kỳ tính năng nào không cải thiện trải nghiệm của khách truy cập . 
Các tính năng này có thể là:
    
* Hình ảnh không cần thiết
* JavaScript/CSS không cần thiết
* Các plugin không cần thiết
   
    Sau khi bạn đã loại bỏ sự lộn xộn, hãy tìm cách cắt bớt phần nội dung còn lại của bạn. Công cụ nén, dịch vụ CDN và tìm nạp trước, như được giải thích bên dưới là các tùy chọn tốt nhất để quản lý các yêu cầu HTTP. Ngoài ra, hãy xem hướng dẫn của chúng tôi về cách giảm các tra cứu DNS đi đôi với việc giảm các yêu cầu HTTP bên ngoài.
 
###  3. Giảm kích thước HTML/JS/CSS
Có thể dùng công cụ để minify code HTML/JS/CSS nhằm làm giảm dung lượng trong các tệp HTML/JS/CSS mà không làm ảnh hưởng tới chức năng của bạn
   ![](https://images.viblo.asia/71c3f954-67f9-4bfa-98a1-9db4948a8c3d.jpg)
    
### 4. Sử dụng prefetching
Prefetch là các gợi ý tài nguyên có mức độ ưu tiên thấp cho phép trình duyệt tìm nạp các nguồn tài nguyên trong chế độ nền (background) vào thời gian rảnh rỗi (idle time), mà có thể người dùng sẽ sử dụng tiếp sau này. 
    
Tài nguyên được tìm nạp sẽ được lưu trong bộ nhớ cache của trình duyệt.  Khi một trang hoàn tất quá trình tải, nó bắt đầu tải các tài nguyên bổ sung và nếu người dùng click vào liên kết đã được tìm nạp (prefetched link), nó sẽ tải nội dung gần như ngay lập tức (instanly). Có ba kiểu tìm nạp, đó là link, DNS và prerendering, chúng ta sẽ đi vào chi tiết từng cái bên dưới.
![](https://images.viblo.asia/69bcc058-60e7-480c-8414-ee1699f61fa6.jpg)
    
### 5. Sử dụng CDN
    
Tốc độ tải trang của bạn còn bị ảnh hưởng bởi khoảng cách từ người dùng đến vị trí máy chủ lưu trữ của trang web của bạn. Họ ở càng xa với vị trí đặt máy chủ thì trang web của bạn sẽ càng chạy chậm hơn. Sử dụng CDN có thể giúp bạn giải quyết vấn đề này.

CDN phân phối các tệp của trang web của bạn trên một mạng lưới các máy chủ toàn cầu, theo cách đó người dùng có thể truy cập trang web của bạn qua máy chủ gần nhất với họ.
        ![](https://images.viblo.asia/874d8fce-3655-4b07-ab27-111eea1142af.jpg)
    
### 6. Bật nén GZIP
  Nén tệp sẽ làm cho nội dung trang web của bạn nhẹ và dễ quản lý. Một trong những phương pháp nén tập tin được sử dụng phổ biến nhất là Gzip . 
    
 Đây là một phương pháp tuyệt vời để thu nhỏ tài liệu, tệp âm thanh, hình ảnh PNG và các tệp cồng kềnh khác chưa được nén.
     ![](https://images.viblo.asia/ddbdce45-7a15-46f0-8d67-e17655e481d2.jpg)

### 7. Tối ưu hoá hình ảnh
    
   Sử dụng hình ảnh trên website không đơn giản là chèn hình vào bài viết. Bạn cần phải kiểm tra kích thước, dung lượng hình. Bởi hình ảnh là một trong những nguyên nhân khiến website tải chậm.
    
Việc giảm kích thước hình sẽ giúp bạn giảm dung lượng hình, đồng thời sẽ có một số cách giúp bạn giảm được dung lượng nhưng vẫn giữ nguyên kích thước như mong muốn.
        ![](https://images.viblo.asia/c9f5fc0b-95c4-460c-9619-909af23a2224.jpg)

###  Kết luận
Trên đây là một số cách giúp cho trang web cải thiện tốc độ, các bạn hãy thử áp dụng vào website của mình nhé. Xin cảm ơi :)
    
Nguồn tham khảo: [source](https://www.keycdn.com/blog/frontend-optimization)