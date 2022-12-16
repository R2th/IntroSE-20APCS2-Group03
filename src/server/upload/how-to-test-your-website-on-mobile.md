Bạn có muốn biết làm thế nào để kiểm tra phiên bản di động trang web của bạn một cách hiệu quả? Và các công cụ tốt nhất để thử nghiệm trang web di động là gì? Nếu có, bài viết này là dành cho bạn.

# Tại sao bạn nên tối ưu hóa cẩn thận trang web di động của bạn

Vào cuối năm 2016, có hơn 3,2 tỷ người đã truy cập Internet và khoảng 2 tỷ trong số họ đã sử dụng thiết bị di động cho việc này. Theo dự báo phân tích, một số người, chỉ sử dụng thiết bị di động cho các hoạt động Internet, sẽ tăng 25% hàng năm trong 5 năm tới.
Do đó, điều cực kỳ quan trọng là phải xác minh xem trang web của bạn có thân thiện với thiết bị di động hay không.

Trước khi bắt đầu testing phiên bản di động trang web của bạn, chỉ cần cố gắng trả lời một số câu hỏi phổ biến:
|  |  |
| -------- | -------- | 
| - How fast does the site load? | Trang web load nhanh như thế nào? |
| - Is the content attractive?|Nội dung có hấp dẫn không? | 
| - Does the site attract attention to the main points of your business?| Trang web có thu hút sự chú ý đến những điểm chính trong nghiệp vụ của bạn không?| 
| - Does the site offer a good experience?| Trang web cung cấp một trải nghiệm tốt?| 
| - Is the site easy and understandable to navigate?| Trang web có dễ dàng và dễ hiểu để điều hướng?| 
| - Does the landing page arouse interest to other pages of your site?| Trang chủ có khơi dậy sự quan tâm đến các trang khác trong trang web của bạn không?| 

# Các yếu tố chính của việc tối ưu hóa hiệu suất mobile

Thậm chí, nếu câu trả lời là "Yes" đối với tất cả các câu hỏi trên, bạn nên chú ý đến các yếu tố tiếp theo của tối ưu hóa hiệu suất di động:

**Download speed :** Tốc độ download luôn được kết hợp với độ trễ mạng/network latency, memory, CPU và cache size. Tất cả chúng đều nhỏ hơn nhiều so với các PC, vì vậy cần nhiều thời gian hơn để load.

**Restrictive loading :** Hạn chế loading, bạn phải đảm bảo người dùng không download bất cứ thứ gì mà có thể sẽ ảnh hưởng đến tốc độ của trang web.

**Responsive Framework :** giúp tạo mẫu nhanh hơn cho các chức năng và bố cục mobile.

**Loading time** nhanh mang lại cho bạn một lợi thế cạnh tranh cực kỳ quan trọng. Các hành động sau đây ảnh hưởng đến loading time:
|  |  |
| -------- | -------- | 
| Reduce dependencies| Giảm sự phụ thuộc | 
| Reduce Client Side Processing| Giảm xử lý phía Client| 
| Reduce image dimension| Giảm kích thước hình ảnh| 
| Reduce the content|Giảm nội dung | 
| Avoid m-dot redirection|Tránh chuyển hướng m-dot | 
| Pick up the right hosting solution|Chọn giải pháp lưu trữ phù hợp | 
| Limit the HTTP requests|Giới hạn các yêu cầu HTTP | 
| Enable compression| Cho phép nén|

Hãy xem xét các bước khác bạn cần làm để xác minh chức năng của trang web mobile của bạn hoạt động bình thường.

# Testing sự liên kết giữa phiên bản desktop và phiên bản mobile của trang web

## 1. Redirects testing :

Mobile visitors should be redirected to the mobile version of the site
Desktop visitors should be redirected to the desktop version of the site
Redirects give visitors an access to the specific page they need, not the homepage
Mobile visitors should have an easy to find an option to view the desktop version of the site too.
Vary-HTTP header checking. If your sites are dynamically served, you should set up a Vary-HTTP header to tell Google and browsers that you vary the HTML by the user agent.

Chuyển hướng thử nghiệm:

- Khách truy cập bằng mobile nên được chuyển hướng đến phiên bản mobile của trang web
- Khách truy cập bằng desktop nên được chuyển hướng đến phiên bản desktop của trang web
- Chuyển hướng cung cấp cho khách quyền truy cập vào trang cụ thể mà họ cần chứ không phải trang chủ
- Khách truy cập bằng mobile nên dễ dàng tìm thấy  tùy chọn để xem phiên bản desktop của trang web.

**Vary-HTTP header checking** Nếu các trang web của bạn là dynamically served, bạn nên thiết lập tiêu đề Vary-HTTP để thông báo cho Google và các trình duyệt rằng bạn thay đổi HTML theo tác nhân người dùng.

**rel=alternate/canonical tags checking** Nếu các trang web của bạn có URL riêng, các trang trên desktop sẽ được thiết lập với **rel=”alternate” tag**  trỏ đến phiên bản mobile của trang đó. Các trang mobile phải được thiết lập với **rel=”canonical” tag** trỏ đến phiên bản desktop của trang đó.

## 2.Technical issues testing

#### Mobile XML sitemap

- Tất cả các trang mobile phải được gửi tới Google thông qua Google via an XML sitemap trong Google Webmaster Tools
- Các trang mobile nên được tách riêng khỏi các trang desktop
Tốc độ trang web cho thiết bị mobile 

Người dùng mobile, đặc biệt có thể có giới hạn thời gian dành cho ứng dụng của bạn, do đó, nó cần phải cung cấp nhanh chóng. Google page speed tool, WebPagetest là những công cụ hữu ích để đo tốc độ trang web.

#### Storage and data (Lưu trữ và dữ liệu):

- Xác minh rằng program code không dễ truy cập
- Người dùng không xóa xóa bộ nhớ cache, vì vậy  đảm bảo rằng không có gì bị hỏng.

## 3. User Experience (UX) testing

#### 3.1. Xem Website trên:

**Smartphones:** iPhone (iOS), Samsung Galaxy (Android), Nexus (another Android), và Windows Phone (Windows).

**Tablets:** iPad (iOS), Samsung Galaxy Tab với nhiều kích cỡ (Android), Kindle Fire (Amazon), và Asus Transformer Book (Windows).

Bạn nên sử dụng các công cụ như Google Analytics để xác định các thiết bị thường được người dùng sử dụng.

#### 3.2. Links size
Chênh lệch giữa các liên kết nên có ít nhất là 28 × 28 pixel. Vì vậy, tất cả chúng nên dễ dàng để click bằng ngón tay.

#### 3.3. Flash
Hầu hết các trình duyệt mobile đều không thể có thể kết xuất với nội dung Flash. Do đó, nếu bạn muốn trang web của mình thân thiện với thiết bị mobile thì đừng sử dụng Flash.

#### 3.4. Viewport
cho phép các trình duyệt mobile thay đổi kích thước các trang để chúng phù hợp tốt nhất với các thiết bị. Đó là lý do tại sao bạn cần phải thiết lập nó.

#### 3.5. Pop-ups
Có 2 lý do không nên sử dụng pop-up cho phiên bản mobile cho trang web của bạn :
- Pop-ups lên làm chậm loading time.
- Pop-ups quá dễ dàng để vô tình nhấp chuột. Vì vậy, chúng dễ dang đưa người dùng ra khỏi trang mà họ đang truy cập.

#### 3.6. Elements end up (Các yếu tố kết thúc)
Các yếu tố quan trọng nhất phải ở trên cùng. Vị trí của các yếu tố khác nên có một ý nghĩa.

#### 3.7. Navigation (Dẫn đường)
Đảm bảo tất cả các trang của trang web mobile đều có thể được truy cập bởi người dùng.

#### 3.8. Content
- Cần có một trang mobile tương đương cho mỗi trang desktop
- Số lượng trang mobile có thể nhiều hơn các trang desktop vì nó thường dễ điều hướng các trang mobile hơn.
- Đảm bảo không có lỗi từ vựng, ngữ pháp trong nội dung trang web của bạn.
- Nếu trang web của bạn không chỉ dành cho khách truy cập địa phương, bạn nên cung cấp thử nghiệm bản địa hóa, nói cách khác là để kiểm tra các khía cạnh ngôn ngữ và văn hóa phù hợp cho một địa phương cụ thể.
- Những hình ảnh không cần thiết nên được loại bỏ.

#### 3.9. Video
- Đảm bảo các video được load và run đúng
- Sử dụng trình phát video HTML5, bởi vì nó dễ dàng hiển thị và nhẹ cho mobile.
- Làm video của bạn có thể đáp ứng size của mobile.

#### 3.10. Trang kết quả của công cụ tìm kiếm, SERP:
- Đảm bảo URL mobile của bạn thân thiện với người dùng và giàu từ khóa
- Google cắt bỏ các mô tả meta trên thiết bị mobile ở khoảng 120 ký tự, do đó, bạn không nên vượt quá giới hạn này.
- Mặc dù Google cung cấp cho bạn khoảng 70 ký tự (512 pixel) trong tiêu đề trang của bạn, chiều rộng của màn hình buộc tiêu đề trang thành hai dòng. Đó là lý do tại sao bạn nên xác minh rằng mỗi tiêu đề trang tốt nhất trong vòng hai dòng.
- Quá nhiều plugin làm hỏng toàn bộ trải nghiệm của trang web mobile của bạn. Vì vậy, bạn nên xem lại các plugin bạn sử dụng và xóa những plugin thực sự không cần.

## 4. 10 tip để tối ưu hóa phiên bản mobile trang web của bạn

Đây là 10 lời khuyên để giúp bạn đảm bảo phiên bản mobile trang web của bạn có thể truy cập được bởi người dùng :
- Đảm bảo khả năng tương thích với smartphone và tablet
- Đảm bảo loading time bình thường
- Làm cho điều hướng trang web đơn giản nhất có thể
- Đảm bảo các button đủ lớn cho những người có ngón tay lớn
- Không có khối văn bản lớn. Sử dụng các gạch đầu dòng và câu ngắn.
- Không sử dụng Flash.
- Không sử dụng pop-up.
- Đảm bảo hình ảnh có kích thước tối ưu.
- Đảm bảo số điện thoại của bạn là một cú nhấp chuột để được quay số
- Đảm bảo trang web có thể truy cập vị trí của bạn thông qua GPS

Vì vậy, bây giờ, khi chúng ta biết chính xác những gì cần được kiểm tra, hãy xem xét một số công cụ và cách kiểm tra nó.

### 4.1. Testing trên các thiết bị thực
Trong một thế giới hoàn hảo, mọi trang web nên được kiểm tra trên mọi thiết bị mobile phổ biến mà nó có thể được xem trên đó. Tất nhiên, thử nghiệm trên các thiết bị thực có rất nhiều lợi thế:

- Testing được cung cấp trong một môi trường thực tế với các điều kiện rất thực tế
- Testing được cung cấp trên hệ điều hành thực, với các tinh chỉnh của nhà sản xuất
- Hiệu suất thiết bị thực dễ dàng hơn so với các tùy chọn ảo khác
- Kiểm tra khả năng tương tác dễ dàng hơn
- Dễ dàng phát hiện lỗi
- Độ phân giải và độ sáng màn hình có thể dễ dàng được kiểm tra trong một loạt các kịch bản khác nhau
- Các chức năng như push notification, định vị địa lý và định hướng, kết nối Wi-Fi được phép thử nghiệm
- Hoạt động trong các điều kiện bị ngắt xảy đến như SMS và các cuộc gọi có thể được kiểm tra
- Chức năng trong điều kiện hết pin có thể được kiểm tra

Thật không may, thế giới, chúng ta đang sống, không hoàn hảo. Dưới đây là một số điểm trừ của testing trên các thiết bị thực:

- Có rất nhiều thiết bị mobile
- Testing trên các thiết bị thực sự tốn kém và mất thời gian
- Ngay cả khi bạn có nhiều thiết bị di động trong công ty, nhân viên của bạn, ở các văn phòng khác hoặc làm việc từ xa, sẽ không có quyền truy cập vào tất cả các thiết bị
- Việc bảo trì thiết bị cũng tốn chi phí

### 4.2. Online Mobile Testing trên thiết bị thực
Vì vậy, chúng tôi cần tìm ra bất kỳ cách nào khác để kiểm tra trang web mobile. Có những công cụ đặc biệt, thực sự sử dụng kết nối từ xa đến các thiết bị thực. Một số công cụ như vậy được giới thiệu dưới đây.

#### 4.2.1. Keynote Mobile Testing (Trước đây là Keynote DeviceAnywhere)

![](https://images.viblo.asia/f5eac101-9576-4c16-95b8-5042627625b2.png)

Keynote Mobile Testing giải pháp dựa trên đám mây, có thư viện toàn diện về các thiết bị mobile thực sự.

Tất nhiên, nó không chỉ là một công cụ kiểm tra trang mobile. Nhưng nếu chúng ta xem Keynote Mobile Testing là một công cụ như vậy, thì những ưu điểm tiếp theo sẽ được đề cập:

- Mạng di động thực và Wi-Fi
- Ngày đầu tiên hỗ trợ cho các thiết bị mới khi chúng được phát hành
- Nó tạo ra một danh sách các thiết bị tự động dựa trên các tiêu chí bảo hiểm: memory, CPU, nhà sản xuất, phiên bản OS, nhà mạng, ...
- Cơ sở dữ liệu chi tiết các tính năng của thiết bị và hệ điều hành
- Easy-to-use Wizard để giúp bạn nhanh chóng xác định thiết bị nào cần ưu tiên để phát triển và testing 

Một số ưu điểm của Kiểm tra di động Keynote:
- Keynote Mobile Testing không kiểm tra sức sống thiết bị
- Không có hỗ trợ đặt phòng thiết bị

#### 4.2.2. BrowserStack

![](https://images.viblo.asia/f13c0ea6-9540-4fe0-9a2e-f5b5d4ab722f.png)

BrowserStack là một công cụ kiểm tra trình duyệt chéo, cho phép bạn truy cập vào các thiết bị di động thực sự khổng lồ.
Dưới đây là một số tính năng của BrowserStack:
- iOS và Android: Các phiên bản iOS ngay từ iOS 3 đến iOS 10, Android - từ Donut (1.6) đến Nougat (7.1)
- Kiểm tra nhanh với Screenshots (chụp ảnh màn hình)
- Phân tích cho trang web của bạn
- Debug lỗi các trang web mobile một cách dễ dàng với các công cụ dành cho nhà phát triển Chrome trên iOS và Android.
- Truy cập vào các thiết bị bổ sung theo thông số địa lý
- Cử chỉ và tương tác tự nhiên
- Tùy chọn kiểm tra bảo mật

Một số điểm yếu của BrowserStack:
- Hiệu suất máy chủ dường như suy giảm theo thời gian khi nhiều người dùng cùng testing.
- BrowserStack có xu hướng khá đắt và tùy chọn miễn phí rất hạn chế.
- Cách mô phỏng nhúm 2 ngón tay vào và ra trên phone và tablet.

#### 4.2.3. Perfecto Mobile Continuous Quality Lab

![](https://images.viblo.asia/ffbb670a-8ef3-4fc4-b752-154ef086331e.png)

Perfecto Mobile Continuous Quality Lab is another cloud-based platform, which has not only mobile page testing option. In the context of testing mobile version of your site, the following advantages should be determined:
Perfecto Mobile Continuous Quality Lab là một nền cloud-based platform khác, không chỉ có tùy chọn kiểm tra trang mobile. Trong bối cảnh testing phiên bản mobile trang web của bạn, cần xác định các ưu điểm sau:
- Thử nghiệm thời gian thực trên hơn 500 thiết bị khác nhau
- Không chỉ Android và iOS mà cả các nền tảng WinPhone, Symbian và Blackberry đều có sẵn để testing 
- Chia sẻ thiết bị
- Kiểm tra tự động đồng thời trên một số thiết bị
- Hỗ trợ Screenshot (chụp ảnh màn hình)

Một số nhược điểm của Perfecto Mobile Continuous Quality :
- Hình ảnh không rõ ràng (thường không thể đọc được)
- Thời gian đáp ứng lâu
- Phiên bản dùng thử miễn phí sử dụng được giới hạn trong 60 phút.

### 4.3. Testing với trình giả lập (emulator) mobile
Một cách khả thi khác để giải quyết vấn đề thiếu thiết bị thực là sử dụng các công cụ đặc biệt, mô phỏng hoặc mô phỏng chức năng của nó.

Sử dụng loại công cụ này cung cấp cho bạn khả năng xác định các vấn đề và sự cố với trang web và cho phép bạn thực hiện các biện pháp khắc phục để làm cho trang web hấp dẫn và hoạt động trực quan trên thiết bị di động.

Mọi người thường nhầm lẫn giữa trình giả lập (emulator) và mô phỏng giả lập (simulator). Mặc dù cả hai phát âm  gần giống nhau, nhưng vẫn có một sự khác biệt giữa chúng. .

Trình giả lập (emulator) hoạt động như một sự thay thế cho thiết bị gốc. Nó có thể chạy cùng một phần mềm và ứng dụng của thiết bị gốc mà không cần sửa đổi chúng và nó thậm chí có thể chỉ ra sự khác biệt trong hệ thống trùng lặp.

Mặt khác, một trình giả lập (emulator) có thể thiết lập môi trường tương tự như OS của thiết bị gốc nhưng không cần sao chép phần cứng của nó.

Vì vậy, các trình giả lập (emulator) thích hợp hơn cho thử nghiệm trang web trên thiết bị mobile, trong khi các mô phỏng giả lập (simulator) tốt hơn cho thử nghiệm ứng dụng mobile.

Hãy xem xét một số trình giả lập (emulator) thường được sử dụng
#### 4.3.1. MobileMoxie
![](https://images.viblo.asia/5b34e8be-38af-4e63-bd6b-b63117d09a4c.png)

Trình mô phỏng MobileMoxie là một phần không thể thiếu của MobileMoxie Marketing Toolset, giúp bạn cung cấp trải nghiệm di động tuyệt vời cho khách hàng của mình. Nó rất dễ dàng để sử dụng. Chỉ cần nhập URL trang web của bạn vào trường thích hợp.
![](https://images.viblo.asia/95cf31eb-db4b-4722-a0a5-e983532019cb.png)

#### 4.3.2. Windows Phone Emulator
![](https://images.viblo.asia/3ff48444-7191-4fef-bf5e-d20c81e7ab36.png)
Windows Phone Emulator là môi trường di động đặc biệt nơi bạn có thể kiểm tra, xem và debug các ứng dụng Windows Phone và sử dụng trình duyệt để kiểm tra các trang web.

Một số ưu điểm của Windows Phone Emulator:
- SDK Full-blown với trình giả lập thiết bị
- Độ phân giải nhiều màn hình
- Công cụ Screenshot
- Mô phỏng gia tốc

Hạn chế của Trình giả lập Windows Phone:
- Chỉ hoạt động trên Windows.
- Mức độ sáng của trình giả lập luôn luôn là "High"
- Máy ảnh và video được sử dụng với những hạn chế

#### 4.3.3. Android Studio emulator

![](https://images.viblo.asia/c358d425-5849-4c22-bf8f-1264d879fafe.png)

Android Studio emulator cho phép bạn tạo một thiết bị mobile ảo để chạy các ứng dụng Android và kiểm tra các trang web mobile. Trình giả lập được đặt bên trong gói Android SDK.

Ưu điểm của Android Studio emulator:
- Hoạt động trên Windows, Mac OS X, Linux
- Android Studio emulator có thể truyền thông tin nhanh hơn sử dụng thiết bị phần cứng được kết nối
- Môi trường hợp nhất nơi tất cả các thiết bị Android có thể được sử dụng

Một số nhược điểm của Android Studio emulator:
- Nếu bạn chỉ cần trình duyệt để kiểm tra các trang web mobile, bạn nên tải xuống nhiều thứ không cần thiết
- Một số hạn chế kỹ thuật: Nên sử dụng RAM 8 GB; Nên sử dụng 4 GB dung lượng trống.

#### 4.3.4. Opera Mobile Emulator 

![](https://images.viblo.asia/8be70d08-f002-4d2b-b255-1b21367a32ea.png)

Opera Mobile Emulator là bản demo trực tiếp của trình duyệt điện thoại mobile Opera, có chức năng như khi cài đặt trên thiết bị cầm tay. Một số công cụ debug bổ sung cũng có sẵn, chẳng hạn như phím tắt, profile selector và các command-line flag khác nhau.

Ưu điểm chính của Trình giả lập Opera Mobile:
- Đơn giản để cài đặt và dễ sử dụng. Bạn không cần cài đặt bất kỳ SDK phức tạp nào hoặc những thứ tương tự.
- Có ba chế độ đầu vào khả dụng: cảm ứng, bàn phím và máy tính bảng.
- Được cấu hình sẵn với một loạt các cấu hình thiết bị điện thoại và máy tính bảng
- Tất cả các chế độ có thể được kích hoạt và kiểm soát bởi các liên kết và điều khiển
- Debug từ xa với các thiết bị thực

Một số điểm yếu của Trình giả lập Opera Mobile:
- Bạn có thể xác minh cách trang tìm kiếm chỉ trong trình duyệt di động Opera.
- Ít hỗ trợ truyền thông

### 4.4. Mobile-friendly and validation tools (Các công cụ xác thực và thân thiện với thiết bị di động)

Người ta biết rằng Google lập chỉ mục các trang web thân thiện với thiết bị mobile (mobile-friendly) và không thân thiện với thiết bị mobile (non-mobile friendly). Đó là lý do tại sao bạn nên sử dụng các công cụ đặc biệt để xác minh xem trang web của bạn có đáp ứng các tiêu chí được chấp nhận chung hay không.

Theo quy định, tất cả các công cụ này đều dễ sử dụng. Tất cả những gì bạn nên làm chỉ là nhập URL trang của bạn vào mẫu thích hợp.

#### 4.4.1. Google’s Mobile-Friendly Test

![](https://images.viblo.asia/599f3387-a8ea-4d59-8f73-a8d06be8f759.png)

Kiểm tra thân thiện với thiết bị mobile của Google  là công cụ cho bạn biết liệu Google có xem trang của bạn thân thiện với thiết bị mobile hay không. Nếu trang web của bạn vượt qua bài kiểm tra, bạn sẽ thấy một thông báo màu xanh lá cây nói rằng “Awesome! This page is mobile-friendly”. Nếu nó không vượt qua, tin nhắn sẽ có màu đỏ và nói là “Not mobile-friendly”.

Trong trường hợp này, trang sẽ bị đẩy xuống trong kết quả tìm kiếm trên thiết bị di động có lợi cho các trang tương tự từ các trang web khác thân thiện với thiết bị mobile.

#### 4.4.2. mobiReady

![](https://images.viblo.asia/1796bf82-9b92-4ede-b7eb-abd0e61a2070.png)

MobiReady cho phép đánh giá mức độ mobile-readiness của trang web của bạn bằng cách sử dụng các tiêu chuẩn và thực tiễn tốt nhất trong ngành. Báo cáo miễn phí cung cấp cả điểm số (từ 1 đến 5) và phân tích sâu các trang để xác định trang web của bạn hoạt động tốt như thế nào trên thiết bị mobile.

Các ưu điểm chính của mobiReady là:
- Báo cáo lỗi chi tiết
- Trang web thử nghiệm rộng
- Một công cụ trực quan để xem trang web của bạn trông như thế nào trên màn hình điện thoại di động
- Kiểm tra WOKC mobileOK
- Đưa ra được nên cải thiện mobile-readiness của trang web của bạn

### 4.5. Test Website Speed Tools

Như đã đề cập ở trên, tốc độ download và hoạt động của trang web của bạn có tác động trực tiếp đến số lượng khách truy cập.

Có cả công cụ đơn giản và nâng cao để kiểm tra tốc độ trang, tối ưu hóa công cụ tìm kiếm và hiệu suất trình duyệt mobile. Bạn không chỉ đo tốc độ trang web mà còn cả đối thủ cạnh tranh của bạn. Thực hiện theo các khuyến nghị hành động để cải thiện kết quả của bạn.

Dưới đây là một số công cụ, có thể giúp bạn làm điều đó.

#### 4.5.1. Google's Page Speed Online

![](https://images.viblo.asia/0f265bc9-7913-444d-b9b5-948e779f2704.jpg)

Google's Page Speed Online là một công cụ toàn diện, nó không chỉ cho phép bạn kiểm tra hiệu suất mà còn cung cấp cho bạn nhiều thông tin. Cùng với đó, nó cũng đi kèm với một báo cáo liên quan đến các thực tiễn tốt nhất bạn có thể sử dụng cho các thiết bị di động, để tối ưu hóa hiệu suất của chúng.

#### 4.5.2. Pingdom

![](https://images.viblo.asia/f8ab1df6-2e71-4a73-8eff-e5ff3505ae1b.png)

Pingdom cho phép bạn xác định những gì nhanh, chậm, quá lớn và những thực tiễn tốt nhất mà bạn không tuân theo. Tất cả các thử nghiệm được thực hiện với các trình duyệt web thực, vì vậy kết quả phù hợp với trải nghiệm của người dùng cuối. Các bài kiểm tra được lưu để bạn có thể theo dõi hiệu suất của mình theo thời gian.

## Nguồn Tham khảo:
https://geteasyqa.com/qa/test-website-mobile/