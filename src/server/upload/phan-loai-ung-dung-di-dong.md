# Phân loại ứng dụng di động

![](https://images.viblo.asia/8608d1bb-5ba8-413b-b7ae-56cd916ac86c.jpg)

Cùng với sự phổ biến của các thiết bị di động, smartphone, thời gian người ta sử dụng các thiết bị di động thậm chí có thể vượt qua máy tính để bàn và laptop. Điều này khiến trình duyệt và ứng dụng cho di động trở thành loại ứng dụng có số lượt truy cập internet nhiều nhất.

Với số người dùng nhiều như vậy, các thiết bị di động cũng sở hữu kho ứng dụng đồ sộ không kém các thiết bị máy tính. Từ chơi game, xem phim, nghe nhạc, làm việc văn phòng, cập nhật tin tức,... đều có ứng dụng đáp ứng nhu cầu của chúng ta. 

Vậy trong quá trình sử dụng các ứng dụng di động, có bao giờ bạn tò mò về cách chúng được xây dựng? Chúng hoạt động như thế nào? Chúng có được phân loại rõ ràng, hay chỉ đơn giản là "ứng dụng di động" ? Làm sao nhận biết chúng thuộc loại gì ?

Chúng ta hãy cùng tìm câu trả lời cho những thắc mắc đó qua bài viết này nhé!

## Phân loại

Trước khi đi sâu vào tìm hiểu về từng loại ứng dụng, hãy cùng nhau điểm qua số lượng và tên loại ứng dụng nhé. Như trên ảnh mở đầu bài viết, ứng dụng di động được chia thành **4 loại** sau:
- Native app
- Web app
- Hybrid app
- Progressive Web App

### Native app

Các hệ điều hành di động như Android và iOS đều có một bộ công cụ phát triển phần mềm (SDK - Software Development Kit), để nhờ đó các lập trình viên có thể thiết kế và phát triển các ứng dụng dành riêng cho mỗi hệ điều hành. Các ứng dụng như vậy được gọi là Native app.

Các Native app có tốc độ xử lý nhanh nhất với độ tin cậy cao nhất. Chúng thường tuân thủ các nguyên tắc thiết kế riêng cho nền tảng, nhờ đó có được giao diện sử dụng phù hợp hơn so với các Web app và Hybrid app. Do tích hợp chặt chẽ với hệ điều hành, các Native app có thể truy cập trực tiếp vào hầu hết mọi thành phần của thiết bị (máy ảnh, cảm biến, kho lưu trữ khóa được hỗ trợ bởi phần cứng, v.v.).

Nhược điểm rõ nhất của các Native app là chúng chỉ dành cho các nền tảng cụ thể. Trong trường hợp muốn xây dựng một ứng dụng cho cả 2 hệ điều hành Android và iOS, thì bắt buộc phải có 2 phần code độc lập cho mỗi nền tảng, hoặc là có một công cụ cho phép chuyển phần code cơ sở sang code riêng cho mỗi nền tảng (VD: Xamarin).

![](https://images.viblo.asia/8c60f8e6-2349-46c0-bacb-5a3bca36de91.png)

#### Sự phân mảnh thiết bị

![](https://images.viblo.asia/b17a579c-6b24-4d72-a950-dd0be215a311.jpg)

Ngày nay, rất nhiều nhà sản xuất khác nhau nhảy vào thị trường smartphone Android, mỗi nhà lại muốn xây dựng những bản ROM của riêng mình. Điều này dẫn đến việc phát triển và cập nhật các Native app trên nền tảng Android trở nên rất khó khăn.

### Web app

Web app là những trang web được thiết kế giao diện trông như các Native app. Các ứng dụng này thường được viết bằng HTML, CSS, JS và chạy trên trình duyệt của thiết bị di động. Ví dụ với Facebook thì có Native app trên cả Android và iOS, ngoài ra nếu muốn sử dụng trình duyệt thì có thể truy cập m.facebook.com (đây chính là mobile web app).

![](https://images.viblo.asia/bd09f661-0a74-4c58-9126-5fb70b1acf8e.png)

Web app được thiết kế để chạy trên nhiều hệ điều hành di động, giúp giảm chi phí phát triển và bảo trì, nâng cấp,... Cũng vì thế mà Web app chạy chậm hơn các Native app.

### Hybrid app

![](https://images.viblo.asia/18788412-762c-416c-8704-626c3458817e.png)

Hybrid app là ứng dụng kết hợp cả ưu điểm và nhược điểm của Web app và Native app. Hybrid app có thể đưa lên kho ứng dụng để cài đặt và chạy như các Native app, nhưng phần lớn các tiến trình của ứng dụng hoạt động dựa vào công nghệ web. Một phần của ứng dụng chạy trên một trình duyệt được nhúng vào ứng dụng (còn gọi là **webview**), những tiến trình hoạt động dựa trên công nghệ web sẽ được chạy trên webview và hiển thị kết quả lên cửa sổ ứng dụng.

![](https://images.viblo.asia/02535746-234f-46e0-a4b5-619512082683.jpeg)

Hybrid app truy cập các chức năng của thiết bị qua một lớp trừu tượng ***web-to-native***. Tùy thuộc vào framework sử dụng mà Hybrid app có thể được phát triển cho từng nền tảng cụ thể, trong khi vẫn giữ được những đoạn code cơ bản tương tác được đa nền tảng.

![](https://images.viblo.asia/01925ec5-ed27-4833-8227-8af6b55e0750.png)

### Progressive Web App

Progressive Web Apps (PWA) hoạt động tương tự như một trang web, nhưng khác ở chỗ nó có thể sử dụng mà không cần kết nối mạng và có khả năng truy cập vào phần cứng của thiêt bị di động - 2 đặc điểm nổi bật của Native app. PWA kết hợp các tiêu chuẩn khác nhau của các trình duyệt hiện đại để nâng cao trải nghiệm người dùng, VD như: một file JSON gọi là Web App Manifest được sử dụng để xác định và điều chỉnh các hành vi của ứng dụng.

PWA có thể sử dụng trên cả 2 nền tảng Android và iOS, tuy nhiên không phải tất cả các chức năng đều được hỗ trợ, VD như trên hệ điều hành iOS thì từ phiên bản 11.3 mới hỗ trợ PWA.

## Cách nhận biết

Trong thực tế có 2 loại ứng dụng thường gặp là Native app và Hybrid app. Nếu dựa vào những đặc điểm bên trên để kiểm tra có thể khá là phức tạp trong 1 vài trường hợp. Vì thế mình sẽ giới thiệu 1 cách "mì ăn liền" để phân biệt Native app.

Đầu tiên, chúng ta cần bật developer mode lên. Vào phần cài đặt, tùy thiết bị mà thông tin phiên bản (Build Number) sẽ khác nhau một chút. Tìm và ấn liên tục vào Build number đến khi hệ thống thông báo deverloper mode đã được bật. Các bạn cũng có thể tìm hướng dẫn bật deverloper mode cho từng dòng máy trên google.

Sau khi đã bật deverloper mode rồi, chúng ta vào Cài đặt > Tùy chọn nhà phát triển (Deverlopder Option) > bật Hiển thị ranh giới bố cục (Show layout bounds).

![](https://images.viblo.asia/baf508a9-ab2f-454f-8911-e8eb958358e1.PNG)

Giờ thì bật ứng dụng lên và kiểm tra. Nếu giao diện app xuất hiện nhiêu ô vuông như hình dưới đây, vậy đó chính là Native app.

![](https://images.viblo.asia/f9610611-858c-431e-baf3-2008f2c69feb.PNG)

Trong trường hợp là Hybrid app thì màn hình sẽ thoáng như này:

![](https://images.viblo.asia/40e9a6bb-7741-45aa-8fdb-d0b96c22fea9.PNG)

Đối với 2 loại ứng dụng còn lại, Web app thì dễ phân biệt rồi, PWA thì có thể hoạt động như trong video này: https://www.youtube.com/watch?v=UVcPyiRLcgU

Theo mình tìm hiểu thì PWA:
- Load như các trang web và có sử dụng các công nghệ giống với web.

Nhưng:
- Có thể hoạt động offline.
- Có khả năng tương tác, sử dụng các tài nguyên phần cứng của thiết bị.

Trước đây thì PWA không cài đặt được qua google play store, nhưng từ năm 2019 thì google đã cho phép các lập trình viên upload PWA lên google play store. Điều này khiến việc phân biệt một ứng dụng thuộc loại nào trở nên khó hơn. 

> https://medium.com/@firt/google-play-store-now-open-for-progressive-web-apps-ec6f3c6ff3cc

-----

**Tham khảo**: tài liệu Mobile Security Testing Guide của Owasp