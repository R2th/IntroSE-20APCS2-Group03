Ở phần 1 chúng ra đã tìm hiểu về: Tổng quan, so sánh sự khác biệt về Mobile app & Desktop app, chiến lược kiểm thử. Tiếp tục series, phần 2 chúng ta sẽ đi sâu về **Chiến lược kiểm thử** trên thiết bị di động và đi vào phần mới là Tìm hiểu về các giai đoạn trong kiểm thử ứng dụng di động.


-----


#### 3. Kiểm thử phần mềm hướng đám mây

![](https://images.viblo.asia/15bab12e-0c77-4cbc-8036-ce09f6953a9b.jpg)

Riêng phần này, đã có 1 bài viết rất cụ thể về vấn đề này tại liên kết : https://viblo.asia/p/nhung-luu-y-khi-kiem-thu-mot-ung-dung-xay-dung-theo-kien-truc-cloud-computing-3KbvZ15OGmWB - mọi người có thể tìm hiểu kỹ hơn tại đây. 

Một số test tool cloud base tuyệt vời có thể giúp bạn rất nhiều trong việc kiểm thử di động: [Xamarin Test Cloud](https://appcenter.ms/),  [Perfecto Mobile Continuous Quality Lab](https://www.perfectomobile.com/continuous-quality-lab), [Keynote Mobile Testing](https://appexperience.sigos.com/). Tìm hiểu thêm về [test tool ứng dụng di động](https://geteasyqa.com/blog/best-mobile-testing-tools/).


#### 4. Kiểm thử di động thủ công và tự động

Ngày nay nhiều chuyên gia có kinh nghiệm tin rằng kiểm thử thủ công sẽ chết dần. Điều này hoàn toàn không thể xảy ra, máy móc công cụ không thể này thay thế được con người. Tất nhiên, chúng ta không thể thực hiện kiểm thử mà không có tự động hóa, nhưng có nhiều tình huống, kiểm thử thủ công thích hợp hơn nhiều.


**Kiểm thử thủ công:**

* Ưu điểm:
    * Tiết kiệm chi phí nếu sử dụng trong khoảng thời gian ngắn.
    * Kiểm thử thủ công linh hoạt hơn nhiều so với kiểm thử tự động - dễ dàng điều chỉnh nếu có thay đổi thông số kĩ thuật hoặc change spec.
    * Mô phỏng tốt hơn dựa vào các hành động kiểm thử như là một người dùng cuối.

* Nhược điểm:
    * Các testcase của kiểm thử thủ công khó để sử dụng lại, do 1 số case đặc thù của mobile.
    * Ít hiệu quả nếu thực hiện test lặp lại và liên tục(có nhiều rủi ro xảy ra như: dễ nhàm chán dẫn đến test không hiệu quả...)
    * Quá trình thực hiện kiểm thử với tốc độ tương đối(hoặc chậm).
    * Một số testcase của kiểm thử thủ công không thể chạy bằng tay đơn thuần(vd: load testing, stress test...)

**Kiểm thử tự động:**

* Ưu điểm:
    * Quá trình thực hiện kiểm thử với tốc độ nhanh.
    * Sử dụng hiệu quả với từng đó chi phí nếu dùng trong thời gian dài.
    * Testcase của kiểm thử tự động dễ dàng sử dụng lại.
    * Dùng cho một số loại kiểm thử nhất định(vd: Kiểm thử hiệu năng - Performance testing, Stress testing...)
    * Kết quả test dễ dàng chia sẻ bằng các file kết quả.

* Nhược điểm:
    * Các công cụ kiểm thử tự động trên mobile có một số giới hạn nhất định.
    * Quá trình tạo testcase, môi trường, tạo test suit tốn nhiều thời gian.
    * Kiểm thử tự động ít hiệu quả nếu dùng để xác định tính thân thiện, trải nghiệm của người dùng với úng dụng.

Như bạn có thể thấy ở trên, bạn nên đưa ra các quyết định khác nhau khi tạo ra chiến lược kiểm thử cho thử nghiệm di động. Tất nhiên, không có câu trả lời rõ ràng nào về chúng, mà tất cả dựa vào từng ứng dụng, môi trường, quy mô của ứng dụng, chức năng của nó... để xác định được nên dùng phương thức nào.


**Kết hợp giữa các phương pháp khác nhau dường như là cách tối ưu nhất . Ví dụ: bạn có thể sử dụng trình giả lập trong giai đoạn sớm nhất của quy trình kiểm thử của mình khi chưa cần độ chính xác và ổn định nhiều về ứng dụng. Nhưng tốt hơn là vẫn sử dụng các thiết bị thực trong giai đoạn cuối. Kiểm tra tự động là thích hợp hơn cho kiểm thử chịu tải và hồi quy. Nhưng kiểm thử thủ công tốt hơn nếu được sử dụng cho khả năng sử dụng và trải nghiệm của sản phẩm.**

## Các giai đoạn của kiểm thử di động 

Các giai đoạn chính này tương tự như kiểm thử web. Hầu hết, nhưng tất nhiên không hoàn toàn giống nhau. Như bạn đã biết ở [**phần 1**](https://viblo.asia/p/how-to-test-mobile-application-tong-quan-so-sanh-su-khac-biet-ve-mobile-app-desktop-app-chien-luoc-kiem-thu-phan-1-eW65GP66KDO) - có một số điểm khác nhau giữa ứng dụng desktop và ứng dụng di động. Vì vậy sau đây chúng ta sẽ đi thẳng vào các điểm đặc trưng của kiểm thử di động.

![](https://images.viblo.asia/8e2e0d7c-0732-43db-8ebf-9b29815ea344.png)

### I. Documentation Testing

**Documentation Testing** là giai đoạn chuẩn bị cần thiết của quy trình kiểm tra ứng dụng di động. 

Trên thực tế, kiểm thử bắt đầu trước cả quá trình phát triển phần mềm. Người kiểm thử có được biểu đồ điều hướng, bố trí màn hình, các yêu cầu khác trên thiết kế... Những yêu cầu này thường được phân tích đầy đủ nhưng không mang tính nhất quán. Mâu thuẫn trong các tài liệu đặc tả phải được giải quyết trước khi bắt đầu phát triển.

Các sản phẩm như **Tài liệu đặc tả**, **Test Plan**, **Testcases**, [**Requirement Traceability Matrix**](https://viblo.asia/p/requirement-traceability-matrix-rtm-la-gi-va-tao-rtm-de-dam-bao-test-coverage-nhu-the-nao-PdbknLZBGyA) được tạo và phân tích trong giai đoạn này.


### II. Functional testing - Kiểm thử chức năng

![](https://images.viblo.asia/b5066649-4ea9-4acc-ad61-002d61b1ea24.jpg)

#### 1. Thực hiện cài đặt và mở ứng dụng.

* Việc cài đặt ứng dụng diễn ra mà không có lỗi gì xảy ra, nếu thiết bị đang dùng đáp ứng các yêu cầu hệ thống (Cài đặt qua file apk, cài đặt qua cửa hàng ứng dụng, cài đặt qua cáp dây USB...)
* Chắc chắn rằng ứng dụng của bạn sau khi cài đặt, khởi động và chạy bình thường mà không gặp bất cứ vấn đề nào.
* Phần hướng dẫn tutorial của ứng dụng có sẵn và hoạt động được.
* Đảm bảo ứng dụng hoạt động khi khởi động / thoát - hoạt động ổn định, đáp ứng được các yêu cầu cơ bản.

#### 2. Kiểm thử các trường - Fields testing

* Kiểm tra các trường bắt buộc hoạt động ổn định.
* Hãy chắc chắn rằng các trường bắt buộc và các trường tùy chọn sẽ được hiển thị theo các cách khác nhau.

#### 3. Kiểm tra các yêu cầu kĩ thuật về mặt thương mại

![](https://images.viblo.asia/417b090c-f2d1-4eae-b021-6c15e343856f.jpg)

* Kiểm tra về mặt giá thành, thông tin các gói mua thêm được hiển thị đúng và khớp với nhau, người dùng có thể nắm rõ thông tin nhờ vào đó.
* Đảm bảo người dùng có thể thực hiện các thao tác về mặt mua bán theo từng bước rõ ràng như: Thêm hàng vào giỏ, Chọn phương thức thành toán, Mua hàng...
* Đảm bảo ứng dụng của mình hỗ trợ các phương thức thanh toán như: Visa, Master card, Paypal, Online bank (tùy chọn)...
* Kiểm tra sự hoàn trả của các gói đã mua có hỗ trợ hay không thông qua tài khoản dùng để thanh toán, phụ thuộc vào nhiều yếu tố khách quan để quyết định hoặc do hệ thống admin.

#### 4. Kiểm tra gián đoạn - Interruptions testing

Không giống như web app, trên ứng dụng mobile rất hay gặp các vấn đề ảnh hưởng tới ứng dụng khi bị gián đoạn từ 1 nguồn nào đó.
* Các cuộc gọi tới, cuộc gọi đi, tin nhắn SMS, MMS, tin nhắn từ ứng dụng như Facebook, Zalo...
* Các ảnh hưởng từ pin của thiết bị: Pin yếu, hết pin, Hỏng pin, gỡ pin đột ngột...
* Ngắt, kết nối wifi - Thường ảnh hưởng tới những ứng dụng cần kết nối để lưu thông tin, hoạt động - đặc biệt là các ứng dụng hoạt động 100% trực tuyến.
* Ngắt, gắn thẻ nhớ SD card.

#### 5. Kiểm tra các thành phần ảnh hưởng tới phản hồi tới người dùng

* Nội dung hiển thị của tin nhắn lúc tải thêm nội dung (tải DLC).
* Thanh tiến trình tại các màn hình chờ.
* Các phản hồi lúc ấn các button sẽ hiển thị như thế nào.
* Thông báo khi có lỗi kết nối.
* Các thông báo lúc xóa các nội dung quan trọng trong ứng dụng phải hiển thị với mức độ quan trọng khác nhau,
* Tính khả dụng và đồng bộ hóa của các tính năng như: Âm thanh, rung, thông báo, SFX...
* Sự hiển thị của màn hình kết quả (ở cuối quá trình của một chức năng gì đó (trò chơi)) có đầy đủ thông tin truyền tải cho người dùng hay không.

#### 6. Kiểm tra cập nhật ứng dụng.

![](https://images.viblo.asia/b0efd3fe-28bf-4396-813e-62706692ecb5.jpg)

* Tất cả dữ liệu của người dùng được lưu lại sau khi cập nhật.
* Chắc chắn quá trình cập nhật sẽ được hiển thị đầy đủ (các bước cập nhật, % tiến trình cập nhật...)
* Kiểm tra cập nhật ứng dụng trên các hệ điều hành cũ của thiết bị xem có hỗ trợ hay không (phụ thuộc vào ứng dụng).
* Kiểm tra cập nhật qua các cách khác nhau hoạt động bình thường: Wifi, Mobile data, apk install.

#### 7. Kiểm tra tài nguyên của thiết bị kiểm thử.

* Hết bộ nhớ để cài đặt, tải thêm tài nguyên cho ứng dụng.
* Kiểm tra hoạt động của bộ nhớ RAM - khi sử dụng trong thời gian dài, khi dùng tác vụ tốn nhiều tài nguyên, khi mở ứng dụng cùng lúc với nhiều ứng dụng khác hoạt động...
* Cài đè ứng dụng trên bộ nhớ SD card, chắc chắn rằng ứng dụng vẫn hoạt động ổn định và bình thường.
* Sự vắng mặt của một số chức năng - ứng dụng có hỗ trợ mà thiết bị không hỗ trợ (ví dụ: Hỗ trợ rung, âm thanh, cử chỉ, vân tay...)

#### 8. Một số xác minh khác.

* Đặc thù của ứng dụng trò chơi: Tính chính xác của thông tin tiến trình, sự ổn định của ứng dụng sau khi kết nối, ngắt kết nối mạng, kết nối với người khác qua mạng trực tuyến...
* Đảm bảo các thông báo lỗi đúng về thời gian và thích hợp cho người dùng.
* Xác mình kết nối với các công cụ phân tích như [Google Analytics](https://www.google.com/analytics/).
* Kiểm tra độ ăn pin của ứng dụng có trong ngưỡng cho phép hay không.
* Kiểm tra các hoạt động của ứng dụng thông qua mạng xã hội: Chia sẻ, kết bạn, mời sử dụng...

### III. Usability Testing - Kiểm thử tính hữu dụng

Kiểm tra tính hữu dụng nhằm mục đích đảm bảo sự thuận tiện khi sử dụng ứng dụng, tạo ra một giao diện trực quan phù hợp với đối tượng người dùng hướng tới. Nó được thực hiện để tạo ra các ứng dụng nhanh và dễ sử dụng. Dưới đây là 3 tiêu chí cơ bản chính để đánh giá ứng dụng:

* Satisfaction - Độ yêu thích của người dùng với ứng dụng.
* Efficiency - Độ hoàn thành công việc của ứng dụng trong khoảng thời gian nhất định.
* Effectiveness - Hiệu suất làm việc của ứng dụng.

![](https://images.viblo.asia/4b8ae968-0fe5-498e-a062-05f71f62cd8f.png)

Chúng ta cùng xem qua một danh sách đơn giản (mini checklist) để kiểm tra tính hữu dụng của một ứng dụng:

* Các button hiển thị đúng kích thước (không quá nhỏ hoặc không quá to) và hiển thị đầy đủ trong màn hình.
* Ứng dụng có hỗ trợ chạy cửa sổ đa nhiệm hay không, nếu có thì vẫn nên hoạt động ổn định và bình thường.
* Kiểm tra sự điều hướng, di chuyển của các chức năng quan trọng trong ứng dụng. 
* Xác định được kích thước font chữ tối ưu nhất để hiển thị trên các màn hình thiết bị với từng resolution khác nhau.
* Các icon, hình ảnh trông tự nhiên, không quá nổi bật, lòe loẹt khi hiển thị ở trong ứng dụng.
* Các button với cùng một chức năng, nên hiển thị cùng một màu sắc.
* Văn bản phải cô đọng, ngắn gọn, hiển thị đầy đủ, dễ dàng cho người dùng đọc.
* Chức năng phóng to, thu nhỏ hoạt động bình thường đối với một số ứng dụng có hỗ trợ.
* Nội dung của các thành phần trong menu không bị tràn.
* Ứng dụng có thể thoát được ở bất kỳ nơi nào, và có thể tiếp tục hoạt động bình thường khi tiếp tục mở nó lên.
* Các thành phần của ứng dụng được cập nhật đồng thời với các hành động của người dùng.
* Người dùng có thể quay lại hoặc hủy hành động khi lỡ ấn nhầm phím.
* Tốc độ phản hồi của các thành phần trong ứng dụng đủ nhanh để không bị ảnh hưởng tới trải nghiệm của người dùng.

Một số công cụ hữu ích về việc kiểm thử tính hữu dụng trên ứng dụng di động như: [User Zoom](https://www.userzoom.com/), [Reflector](https://reflector.en.softonic.com/), [Loop11](https://www.loop11.com/).

-----

Bài viết ở phần này khá dài đã được bổ sung các kiến thức chi tiết để có thể dễ hiểu hơn cho mọi người. Ở phần sau, chúng ta cùng tìm hiểu hết về các phần còn lại của giai đoạn trong kiểm thử ứng dụng di động. 

Tài liệu tham khảo: https://www.360logica.com/blog/mobile-apps-vs-desktop-apps-a-deeper-look/

https://viblo.asia/p/requirement-traceability-matrix-rtm-la-gi-va-tao-rtm-de-dam-bao-test-coverage-nhu-the-nao-PdbknLZBGyA

https://viblo.asia/p/nhung-luu-y-khi-kiem-thu-mot-ung-dung-xay-dung-theo-kien-truc-cloud-computing-3KbvZ15OGmWB