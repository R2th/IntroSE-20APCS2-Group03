Google Chrome là một trình duyệt mạnh mẽ và nổi tiếng nhất trên thế giới bởi giao diện đơn giản, light-weigth, và đi kèm theo đó là rất nhiều các tiện ích giúp nâng cao hiệu năng. Bài viết này chúng ta cùng nhau tìm hiểu một số tiện ích hỗ trợ cho việc kiểm thử giao diện và hiệu năng nhé
# 1 - Các tiện ích hỗ trợ cho việc nâng cáo hiệu suất
## 1.1 - Session Manager 

Là một tester, bạn sẽ thường xuyên truy cập vào một số trang web nhất định mỗi ngày. Vì vậy, Session Manager cho phép bạn tạo ra một nhóm các trang web mà bạn có thể mở chỉ bằng một cú click. Tất cả chỉ trong một lần, nghe thật tuyệt phải không? Với Session Manager, bạn có thể quản lý các tab – lưu, cập nhật, xóa và restore tập các tab. Sử dụng nó và bạn sẽ không bao giờ hối hận.

## 1.2 - iMacros 

iMacros là tiện ích của chrome giúp bạn dễ dàng hơn khi test các trang web. Nó cho phép bạn ghi lại và phát lại các hành động của bạn trên trang web. iMacros có thể được sử dụng để tự động hóa các công việc hàng ngày đơn giản của bạn như smoke test mỗi ngày. Bạn có thể sử dụng iMacros để mở một nhóm các trang web để tiết kiệm thời gian.

## 1.3 - MindMup

Mindup là add-on tuyệt vời cho phép bạn tạo sơ đồ tư duy miễn phí. Sơ đồ tư duy là cách hay để tổ chức lại sự hiểu biết của bạn về các luồng ứng dụng, viết ra các kịch bản khác nhau và thậm chí tìm ra sự phụ thuộc giữa các thành phần của hệ thống. MindMup cung cấp cho bạn khả năng thực hiện chính xác những việc đó mà không phải thoát khỏi trình duyệt. Bạn có thể tạo sơ đồ tư duy và cùng thực hiện với những người khác trong thời gian thực với giao diện đơn giản và gọn gàng. Nó được tích hợp với Google Drive và Dropbox. Bởi vì sơ đồ tư duy của bạn được lưu trên đám mây, bạn có thể truy cập bất cứ đâu – trình duyệt trên máy để bàn, máy tính bảng hoặc thiết bị di động.

## 1.4 - Proxy SwitchySharp

Proxy SwithchySharp giải cứu bạn trong trường hợp bạn cần phải chuyển proxy thường xuyên. Nó cho phép bạn quản lý và chuyển đổi giữa nhiều proxy nhanh chóng và dễ dàng. Tính năng mà tôi thích nhất là bạn có thể tự tạo các quy tắc cho proxy chuyển tự động, kích hoạt một proxy cụ thể cho một URL cụ thể. Sử dụng Proxy Swithcher, bạn có thể ẩn địa chỉ IP.

# 2 - Các tiện ích hỗ trợ Sercurity và Penetration Testing

## 2.1 - XSS Rays

XSS Rays là tiện ích của Chrome được sử dụng rộng rãi trong penetration Testing (test thâm nhập) để kiểm tra an ninh. Đây là một máy quét Javascript XSS thuần (Javascript không bị lai tạp bởi các thư viện khác), có tác dụng trong việc tìm ra các lỗ hổng XSS ở bất kỳ trang web nào. XSS Rays phân tích tất cả các liên kết và các form của trang mà nó đã load và kiểm tra XSS trên các phương thức GET và POST.

Các chức năng chính của XSS Rays là XSS scanner, XSS Reverser và object inspection.

## 2.2 - Request Maker

Request Maker là tiện ích cốt lõi của Chrome sử dụng cho Penetration Testing. Bạn có thể tạo ra các new requests, capture requests tạo ra bởi web pages, xáo trộn các URLs, sửa đổi headers và POST data. Tính năng tôi thích nhất trong Request Make là bạn có thể view tất cả các requests tới trang cần test chỉ bằng việc click một button, điều này giúp bạn tiết kiệm được rất nhiều thời gian.

Lưu ý: Request Maker icon chỉ hiển thị ở trên thanh bar của những trang mà nó được cho phép. Sau khi Add, cần refresh lại trang để icon được hiển thị.

## 2.3 - D3coder

D3coder là tiện ích khác của Chrome được dùng để Test thâm nhập. Bạn có thể mã hóa và giải mã văn bản được lựa chọn thông qua việc sử dụng context menu được add thêm trong chính trình duyệt Chrome, giúp bạn tiết kiệm rất nhiều thời gian. Tiện ích D3coder của chrome là một plugin tuyệt vời để test thâm nhập, nó cho phép các chuyển đổi giữa các loại mã hóa/giải mã khác nhau như base64, rot13, CRC32 hashing, UNIX timestamp.

## 2.4 - Site Spider

Site Spider là tiện ích theo sau trang web, có tác dụng báo cáo các liên kết bị hỏng trên trang web bất kỳ. Tiện ích này giúp bạn tiết kiệm rất nhiều thời gian khi kiểm tra phần mềm vì bạn không cần phải tự mình đi kiểm tra xem tất cả các liên kết có đang hoạt động hay không. Nó cũng cung cấp cho bạn khả năng để hạn chế Spider bằng cách thêm các restrictions và biểu thức thông thường. Site Spider là một tiện ích có mã nguồn mở, điều đó có nghĩa là bạn có thể thay đổi nó tùy ý theo nhu cầu của bạn.

# 3 - Các tiện ích hỗ trợ Accessibility Testing

Hiện nay có rất nhiều guidelines (như WCAG, ARIA, RGAA, Section 508) đã định nghĩa cách để làm cho nội dung Web và các ứng dụng Web truy cập nhiều hơn đến những người khuyết tật. Những tiện ích dưới đây có thể được sử dụng để test khả năng tiếp cận của Website, để đảm bảo các tiêu chuẩn này được đáp ứng.

## 3.1 - WAVE Evaluation Tool

WAVE Evaluation Tool là một công cụ đánh giá khả năng tiếp cận web tuyệt vời mà được sử dụng để kiểm tra bất kỳ trang Web nào chống lại WCAG guidelines. WAVE Evaluation Tool là một tiện ích tuyệt vời của trình duyệt Chrome, dùng để thử nghiệm khả năng tiếp cận vì nó thêm khả năng WAVE trong trình duyệt của bạn và cung cấp thông tin phản hồi trực quan về khả năng tiếp cận của một trang web bằng cách thêm các biểu tượng và các chỉ số vào trang web.

## 3.2 - Accessibility Developer Tools

Tiện ích mở rộng này của Chrome add thêm một tùy chọn "Accessibility" và Accessibility sidebar pane trong elements tab của Chrome developer tools và thực sự sẽ trở thành một phần của những công cụ chủ yếu của Chrome. Khi bạn chạy Accessibility audit, nó sẽ liệt kê các quy tắc mà trang cần kiểm tra đã vi phạm dựa theo WCAG 2.0 Guidelines, bao gồm cả việc thiếu các ARIA attributes.

## 3.3 - aXe

aXe là tiện ích khác của Chrome, nó có add thêm khả năng kiểm tra tiếp cận tự động (Automated accessibility testing capabilities) vào trình duyệt Chrome. Nó là một tiện ích khá nhẹ dựa trên aXe javascript library. aXe so sánh trang web cần kiểm tra với các chuẩn của WCAG 2.0 (W3C Web Content Accessibility Guidelines) và Section 508 (US Federal Procurement Standard), sau đó báo cáo lại những lỗi bị lệch so với chuẩn.

## 3.4 - ARIA Validator

ARIA Validator add thêm một button vào thanh bar của trình duyệt Chrome, nó validate việc thực hiện ARIA trên trang web bất kỳ. Đối với mỗi frame mà nó có thể đọc trên trang web, nó sẽ mở một thẻ mới hiển thị các lỗi và các cảnh báo.

Chú ý: Sau khi install xong thì cần phải reload trang để sử dụng tiện ích này.

# 4 - Các tiện ích hỗ trợ cho việc kiểm thử giao diện
## 4.1 - iMacros for Chrome

![](https://images.viblo.asia/0316f170-966b-4dae-a6bd-09d64d8dec09.jpg)

Với một web developer, công việc test có thể sẽ lặp đi lặp lại rất nhàm chán. Đây chính là cứu tinh của bạn, iMacros sẽ ghi lại và lưu thao tác của bạn. Những công việc lặp lại dài lê thê giờ đây chỉ cần được thực hiện một lần duy nhất. Chỉ với một cú click chuột, bạn có thể test page bao nhiêu lần cũng được. 

## 4.2 -  Window Resizer

![](https://images.viblo.asia/3eec1218-5bb7-484a-8c0e-195b789216a2.png)

Tiện ích làm việc đúng như tên, resize lại cửa sổ trình duyệt, từ đó giúp bạn theo dõi design của mình chuẩn xác hơn. Bạn có thể chọn từ một danh sách chuẩn màn hình phổ biến có sẵn, hoặc theo thiết lập tùy chỉnh. 

## 4.3 - Ripple Emulator

![](https://images.viblo.asia/6506b676-dfcd-4e90-9879-14c01e8146bf.jpg)

Ripple Emulator là một công cụ giả lập môi trường mobile đa nền tảng giúp test ứng dụng web trên một số thiết bị và màn hình hiển thị. Rippe có thể kết hợp với các công cụ lập trình hiện có để thực hiện debug, kiểm tra DOM và test tự động. 

## 4.4 - PerfectPixel

![](https://images.viblo.asia/d1b758e4-4a3d-4216-9afa-cb05c1a69706.jpg)

Design rất bực mình khi thấy sản phẩm sau code lại không đẹp “choáng váng” như thiết kế của mình. Perfect pixel thực sự là công cụ hỗ trợ hay cho các designer đang phát triển web đúng theo như thiết kế. Tiện ích sẽ đặt một hình ảnh mờ chồng lên web như hình, đồng thời so sánh giữa hai ảnh để đảm bảo độ chính xác đến từng pixel. 

## 4.5 -  Check My Links

![](https://images.viblo.asia/eee0b76c-5cb5-4240-8042-584e97c35d78.jpg)

Bạn đã build xong page? Vậy bạn đã kiểm tra lại đường dẫn chưa? Dù bạn có cẩn thận đến mức nào, bạn sẽ không cách nào đảm bảo được tất cả các link, và kiểm tra lại từng cái một là một công việc kinh khủng. Với Check My Links , bạn chỉ việc chạy tiện ích và ngồi chờ.

### Tham khảo:
https://www.facebook.com/notes/tech-talk/30-ti%E1%BB%87n-%C3%ADch-chrome-cho-designer-v%C3%A0-dev/1736470246573582/
https://vieclamit.careerbuilder.vn/advices/40-tien-ich-tren-chrome-huu-ich-cho-kiem-thu-phan-mem.35A4ED38.html
https://techblog.vn/gan-40-tien-ich-mo-rong-sieu-huu-ich-cho-testing-cua-chrome-phan-3