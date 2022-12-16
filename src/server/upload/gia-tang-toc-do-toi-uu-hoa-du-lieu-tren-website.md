> Một website có tốc độ load nhanh rất quan trọng đối với cả khách truy cập lẫn công cụ tìm kiếm. Nếu website của bạn mất quá nhiều thời gian để tải (load), bạn chắc chắn sẽ mất đi một số khách truy cập tiềm năng. Họ sẽ không bao giờ trở lại thêm một lần nào nữa. Tăng tốc độ load có thể làm giảm đáng kể bounce rate (tỷ lệ thoát website) cho website của bạn và làm tăng tỉ lệ chuyển đổi (conversion rate). Nó cũng là một yếu tố quan trọng trong 200 yếu tố để xếp hạng tìm kiếm của Google. Google luôn cố gắng để cung cấp kết quả tìm kiếm tốt nhất cho người dùng và các website có tốc độ load chậm thường không được xếp vào loại tốt nhất.

## 1. Kiểm tra tốc độ và hiệu suất website?

Trước khi tìm biện pháp tối ưu hóa tốc độ, chúng ta cần phải biết nguyên nhân gì gây ra vấn đề, từ đó ta mới biết được những vấn đề cần được tối ưu hóa. Trong phần này, mình sẽ giới thiệu tới các bạn công cụ để kiểm tra tốc độ cũng như các thông số khác của website nhé!

### 1.1. [web.dev/measure](https://web.dev/measure)
![](https://images.viblo.asia/94487e2f-6d86-4638-9f14-95633ecc12d2.png)

Như các bạn có thể nhìn thấy các thông số chính mà website có thể tính toán như Performance, SEO, hay Accessibility(Khả năng tiếp cận đến website của user)
![](https://images.viblo.asia/edafe7bd-8fff-4b43-aa39-5fd065129ffc.png)

Và đây là kết quả khi mình check trang youtube.com
![](https://images.viblo.asia/c018fed4-5624-4f40-a9e0-ccf42be640ea.png)

Ngay phần bên dưới cũng phân tích tất cả các yếu tố dẫn đến những số liệu của bạn chưa được màu xanh lá, mà vẫn đang màu cam hay đỏ.

### 1.2. [pingdom.com](https://pingdom.com)
![](https://images.viblo.asia/d881a828-8165-40db-b8bb-810f9fd6ebcd.png)
Đây là một công cụ tốt để kiểm tra tốc độ và hiệu suất website. Có một số tính năng bổ sung mà bạn sẽ không tìm thấy trong **Web.dev**.

Nhập URL blog/ website của bạn. Click vào nút Settings bên dưới để chọn các thiết lập bổ sung. Cuối cùng, click vào nút Test Now.
Sau khi hoàn tất, bạn sẽ nhận được kết quả, trông như hình bên dưới.
![](https://images.viblo.asia/f38ad1c6-0ac6-45bd-b3f7-ccb6db5d2448.png)

Nó hiển thị kích thước website và số lượng yêu cầu (request) gửi đến máy chủ.

Ngay bên dưới là phần nhận xét tổng thể. Blog này nhanh hơn 54% so với tất cả các blog/ website đã thử nghiệm. Bạn cũng sẽ thấy bốn tab – Waterfall, Performance Grade, Page Analysis và History.

Waterfall – hiển thị kích thước của các tập tin trên website và thời gian tải của chúng.
Performance Grade – liệt kê các yếu tố được phân tích có ảnh hưởng đến hiệu suất của website.
Page Analysis – cho thấy lỗi máy chủ, chuyển hướng hoặc lỗi kết nối dữ liệu.
History – nếu bạn đã kiểm tra tốc độ website bằng công cụ này trước đây, nó sẽ hiển thị lịch sử dưới dạng biểu đồ.
Lưu ý: Bạn sẽ không thể nhìn thấy tất cả các tùy chọn và thống kê nếu bạn thực hiện một private test.

## 2. Tối ưu hóa tốc độ trang web bằng AMP
### 2.1. AMP là gì?
> AMP, hay Accelerated Mobile Pages, là một framwork miễn phí, mã nguồn mở, hỗ trợ bạn tạo ra những trang web được render nội dung một cách nhanh chóng. Nó bao gồm HTML, CSS, JS và những thư viện đã được cache lại, nhờ các tiên ích mở rộng cụ thể  và các thuộc tính tập trung vào AMP, nó giúp tăng tốc độ tải cho các trang web trên di dộng, ngay cả khi mạng chậm. Thậm chí những trang giàu nội dung như thông tin đồ họa, file Video, Audio hay PDFs, thì khi người dùng click vào một trang AMP, tốc độ hiển thị kết quả được cảm nhận nhanh tới mức **"NGAY LẬP TỨC"**.

AMP là phần thiết yếu cho website của bạn trên mobiles. Nó hiển thị nội dung bằng cách loại bỏ tất cả các elements gây ảnh hưởng đến tốc độ và hiệu suất trang web. Và đây là sự khác biệt giữa một trang có AMP và không AMP là như thế nào:

![](https://images.viblo.asia/0f0f7307-c51c-4a2c-84dd-3042bdbc0f9a.png)

Trang không có AMP (bên trái) trông hấp dẫn trực quan nhờ thiết kế responsive. Tuy nhiên, có khá nhiều elements khi trang có sự hỗ trợ AMP(bên phải) sẽ bị thiếu(vì nó giúp tăng tốc độ và hiệu suất mà). Thanh menu của trang bên phải chi tiết hơn (với icon tìm kiếm, menu dạng breadcrums và nút menu thu gọn), các nút share mạng xã hội của phiên bản AMP có thể được truy cập cùng một lúc và dễ dàng nhấn hơn, giúp đơn giản hóa việc chia sẻ.

### 2.2. Vì sao AMP quan trọng?
 AMP rất quan trọng vì nó giúp các trang web tải nhanh hơn, cải thiện UX và thuyết phục khách truy cập ở lại lâu hơn trên trang web của bạn. 
 Logic rất đơn giản: thời gian tải nhanh hơn dẫn đến sự tham gia tốt hơn, giúp giảm tỷ lệ thoát và cải thiện thứ hạng di động.

Tuy nhiên, AMP không cải thiện website với sự tham gia của mình. Nó không làm cho nội dung của bạn hữu ích hơn hoặc giải trí hơn. Nếu thời gian tải của bạn là hoàn hảo (theo HubSpot, chưa đến 1,5 giây) nhưng nội dung của bạn rất nhàm chán, SERPs của bạn sẽ không tăng vì tỷ lệ thoát cao. Để AMP hoạt động cho trang web của bạn, bạn cần tập trung vào 2 yếu tố này tốt nhất: thời gian tải nhanh cộng với nội dung tuyệt vời.

AMP có tiềm năng làm cho khách truy cập của bạn hài lòng, điều đó có ý nghĩa rất lớn đối với Google. Và nếu bạn làm hài lòng Google, bạn sẽ có được thứ hạng cao hơn, mang lại nhiều lưu lượng truy cập hơn và tăng doanh thu. Nhưng đừng bị nhầm lẫn: cài đặt AMP không phải là giải pháp tăng SERP một cách kỳ diệu.

### 2.2. Liệu AMP có thật sự ý nghĩa khi implement vào website của bạn?
### 2.2.1. Ưu điểm AMP
**1. Nó tăng tốc thời gian tải trang web**

Điều này là rõ ràng. Không có yếu tố vô dụng để làm chậm chúng, AMP gọn gàng, mượt mà và nhanh chóng. Người dùng thích các website mà không làm cho họ có cảm giác phải chờ đợi, vì vậy về cơ bản AMP đảm bảo rằng trang web của bạn mang lại nhiều khách truy cập hơn.

**2. Nó tăng thứ hạng di động**

Mặc dù AMP không phải là một yếu tố xếp hạng, nhưng nó có ảnh hưởng tích cực đến xếp hạng di động do thời gian tải nhanh hơn. Có khả năng, nếu Google bắt đầu ưu tiên AMP, nó sẽ có nhiều tác dụng hơn đối với SERPs.

**3. Nó cải thiện hiệu suất máy chủ**

Nếu trang web của bạn tạo ra hàng tấn lưu lượng truy cập từ thiết bị di động, AMP sẽ giảm tải cho máy chủ của bạn và cải thiện hiệu suất của chúng. Nhưng điều này có một nhược điểm rất lớn (xem nhược điểm số 3).

**4. Hạn chế tình trạng user không thể truy cập vào server khi bị cá mập cắn cáp**

Bởi vì website của bạn sẽ được cache lại trên Google AMP và lưu ở server mà gần user truy cập nhất. 
Ví dụ website của bạn đang lưu trữ ở Singapore, và một ngày đẹp trời thì cá mập cắn cáp tại Singapore, nhưng may thay nếu website bạn có AMP thì một server của Google AMP ở Mỹ đã cache lại toàn bộ trang web của bạn và người dùng ở Mỹ có thể access thông qua server đó, giúp bạn không là mất khách hàng và duy trì khách hàng nhất có thể.

### 2.2.2. Nhược điểm AMP
**1. Doanh thu quảng cáo bị giảm**

Mặc dù Dự án AMP được tăng tốc hỗ trợ quảng cáo, tiềm năng mang lại doanh thu bị hạn chế nghiêm trọng. Và nó cũng không phải là một miếng bánh để thực hiện quảng cáo trên các trang chạy AMP.

**2. Analytics là một chút tước**

AMP hỗ trợ Google Analytics nhưng yêu cầu một tag khác, cần được triển khai trên tất cả các trang AMP. Rõ ràng, phải mất rất nhiều thời gian để đặt tag này để có thể thu thập và phân tích dữ liệu.

**3. Tốc độ tuyệt vời đạt được là nhờ bộ nhớ cache**

Google không cung cấp bất kỳ công nghệ cụ thể nào để làm cho các trang của bạn siêu nhanh. Những gì nó thực sự làm là lưu các phiên bản được lưu trong bộ nhớ cache của các trang được gắn thẻ AMP và, bất cứ khi nào khách truy cập truy cập chúng, chỉ cần phục vụ chúng từ bộ đệm. Bạn tìm ra phần còn lại.

AMP cho phép trang web của bạn tải nhanh hơn và đảm bảo UX tốt hơn, nhưng nhược điểm của nó đặt ra một số câu hỏi nghiêm trọng:

Bạn đã sẵn sàng hy sinh ít nhất một phần doanh thu quảng cáo của mình chưa?
Bạn có thể sống mà không có tất cả các biểu đồ và bảng trong Google Analytics không?
Và, quan trọng nhất: Bạn có chắc chắn rằng bạn muốn phụ thuộc vào Google thông qua bộ đệm không?
Đây không phải là những câu hỏi dễ, nhưng bạn chắc chắn nên xem xét câu trả lời chi tiết cho chúng. Nhưng trước khi bạn làm điều đó, hãy so sánh AMP và thiết kế responsive.

## 3. AMP vs. Responsive Design
Thiết kế responsive đơn giản là điều bắt buộc vì nó được Google khuyến nghị. Nhưng nó có ý nghĩa để đầu tư vào responsive khi chúng ta có AMP? Câu trả lời của tôi là: Có, chắc chắn rồi.

AMP có rất nhiều lợi thế như tốc độ tải nhanh hơn, UX tốt hơn và tỷ lệ thoát thấp hơn. Về lý thuyết, AMP cũng dễ cài đặt. Tất cả những gì bạn cần làm là thêm một dòng mã bên dưới tiêu đề chính trong header trang của bạn. Như thế này:

![](https://images.viblo.asia/9664f581-3285-4e1a-8b9d-5c7f366d5b8b.jpg)

Bên cạnh đó, AMP cho phép bạn sẵn sàng đưa trang web của mình lên mobile-first-index trên thiết bị di động mà không phải có quá nhiều khó khăn. Chỉ cần chọn các trang có mức độ ưu tiên cao, sau đó đặt một số tag bổ sung và một dòng mã. Bạn không quên kiểm tra các trang của mình bằng Google’s Structured Data Testing Tool(Công cụ kiểm tra dữ liệu có cấu trúc của Google).

Tuy nhiên, AMP liên kết trang web của bạn với Google. Nếu không có bộ nhớ cache được lưu trữ trên các máy chủ Google Google, bạn không có bất kỳ trang di động nào. Bạn, như Benjamin Franklin sẽ nói, giao dịch trang web của bạn Tự do cho một số lợi ích xếp hạng tạm thời (nhân tiện không được bảo đảm).

Nhưng nhược điểm quan trọng nhất là AMP không dễ cài đặt. Nếu bạn sử dụng trang web WordPress, bạn luôn có thể cài đặt Plugin AMP, nhưng nó không hoạt động trơn tru (ít nhất, nếu bạn sử dụng các plugin xung đột như Yoast hoặc Monarch). Bạn có một tùy chọn duy nhất: Đặt tất cả các tag và mã cần thiết theo cách thủ công - việc này sẽ mất thời gian.

Tóm lại, bạn nên tìm hiểu rõ về AMP và Mobile-first-index trên thiết bị di động. Đến lúc đó, bạn có thể áp dụng và tăng tốc trang web responsive nhiều nhất có thể.

## 4. Tóm lại

Google AMP là một tích hợp vô cùng hợp lý và awesome đối với website của bạn, vì khi tốc độ load trang nhanh, khách hàng ở lại lâu hơn, người truy cập đến nhiều hơn, tăng thứ hạng trên Google, dẫn đến doanh thu tăng. Tuy nhiên, nếu Google biến chỉ mục đầu tiên trên thiết bị di động thành tiêu chuẩn Web, chắc chắn sẽ gây tổn hại cho SERPs liên quan đến máy tính để bàn, bạn nên xem xét triển khai AMP trên một số trang quan trọng của trang web của mình: trang thông tin, bài đăng trên blog, liên hệ với chúng tôi, v.v. bạn 'di chuyển' liên kết từ máy tính để bàn sang thiết bị di động và hỗ trợ SERPs của bạn.

-----
Tham khảo thêm tại: https://medium.com/the-set-list/google-amp-a-70-drop-in-our-conversion-rate-35fe3cb69c59