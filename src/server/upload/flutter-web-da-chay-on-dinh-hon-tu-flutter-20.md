![image.png](https://images.viblo.asia/b10cd5ff-2a78-4b78-adfd-f334dcc3859a.png)

Nguồn bài viết gốc:[ Flutter web support hits the stable milestone](https://medium.com/flutter/flutter-web-support-hits-the-stable-milestone-d6b84e83b425)

Tầm nhìn của chúng tôi đối với Flutter là trở thành một framework UI di động để xây dựng trải nghiệm ứng dụng tuyệt vời trên bất kỳ nền tảng nào. Hôm nay, như một phần của Flutter 2, chúng tôi thông báo rằng Flutter đã hỗ trợ web đạt đến mức ổn định.

Bản phát hành Flutter đầu tiên chỉ hỗ trợ iOS và Android và đã mang hơn 150.000 ứng dụng đến các cửa hàng mobile app. Giờ đây, việc thêm hỗ trợ web có nghĩa là những ứng dụng tương tự đó có thể tiếp cận đối tượng khách hàng rộng hơn, cũng như mở ra những cách mới để xây dựng trải nghiệm tương tác trên web.

Trong phiên bản hỗ trợ web ổn định này, chúng tôi tập trung vào ba yếu tố sau:

* Progressive web apps (PWAs): kết hợp phạm vi tiếp cận của web với khả năng của ứng dụng dành cho desktop.
* Single page apps (SPAs) : tải trang một lần và truyền dữ liệu đến và đi từ các dịch vụ internet.
* Expanding existing Flutter mobile apps to the web: bạn có thể chuyển Flutter app hiện tại của bạn lên môi trường web.

Bài viết này mô tả những gì chúng tôi đã xây dựng cho đến nay và khám phá các ví dụ về cách bạn có thể tận dụng hỗ trợ web của Flutter trong các ứng dụng của mình.

![image.png](https://images.viblo.asia/9af45e31-bb86-4404-a613-c54104d628bf.png)

## 1. Hành trình của chúng tôi khi phát triển Flutter trên nền tảng web

Nền tảng web ngày nay phong phú hơn bao giờ hết, với việc đồ họa 2D và 3D được hỗ trợ trực tiếp trên web mà không cần sử dụng thêm plug-in, hỗ trợ ngoại tuyến (offline) cũng như quyền truy cập vào phần cứng và hệ điều hành cơ bản. Web đã cho phép một loạt các framework xây dựng trên nền tảng cơ bản này để giúp các lập trình viên tạo ứng dụng cho web một cách linh hoạt.

Vì Flutter được viết bằng Dart, một ngôn ngữ cung cấp khả năng biên dịch sang JavaScript, nên mục tiêu khám phá web như bước tiếp theo mà chúng tôi muốn đạt được. Điều này hướng đến tầm nhìn cho chúng tôi là cung cấp một framework di động để xây dựng UI đẹp ở bất cứ đâu bạn muốn vẽ pixel trên từng nền tảng bạn nhắm đến.

Cách tiếp cận của chúng tôi là xây dựng một toolkit hoạt động trên tất cả các nền tảng mà code của bạn vẫn chạy ổn không có sự cố nào.

![image.png](https://images.viblo.asia/4b6616b7-d878-45d4-a1b0-e56672375b48.png)

Ở cấp độ kiến trúc, Flutter là một hệ thống nhiều layer với:

* Một framework cung cấp các class trừu tượng cho các thành phần phổ biến như Widgets, Animation, và Gestures.
* Một engine render UI cho các thiết bị (điện thoại, máy tính bảng, website, v.v) bằng cách sử dụng các API hệ thống.

Bản thân framework này được viết bằng Dart và khoảng 700.000 dòng code framework Flutter cốt lõi giống nhau trên tất cả các nền tảng: di động, desktop và bây giờ là web. Điều này cũng đúng với code của bạn; chúng tôi sử dụng trình biên dịch phát triển Dart (dartdevc) hoặc trình biên dịch triển khai Dart (dart2js) để dịch code của bạn thành JavaScript, sau đó nó có thể được lưu trữ trên máy chủ(server).

Với khả năng của Dart để biên dịch framework Flutter (cũng như code trong ứng dụng của bạn) sang JavaScript, công việc của chúng tôi nhằm hỗ trợ web liên quan đến việc thay thế công cụ (engine) render C ++ cấp thấp được các ứng dụng di động sử dụng bằng code map tới các API nền tảng web.

Flutter không chuyển tải các Widget sang HTML tương ứng của nó. Thay vào đó, công cụ web của Flutter cung cấp lựa chọn hai kiểu renderer:

* HTML renderer được tối ưu hóa cho size và khả năng tương thích lớn.
* CanvasKit renderer sử dụng WebAssembly và WebGL để render lệnh vẽ Skia vào canvas trình duyệt.

Mục tiêu của chúng tôi đối với Flutter là cung cấp cách tiếp cận mới với nền tảng web, xây dựng dựa trên nền tảng hiện có và cung cấp insight mới để cải thiện web cho mọi người.

## 2. Flutter cung cấp một bản phát hành ổn định về chất lượng

Kể từ khi phát hành bản beta hỗ trợ web cách đây một năm, chúng tôi đã học được nhiều điều về cách những người đầu tiên sử dụng ứng dụng này và chúng tôi đã làm việc với một số khách hàng hiện đã chuyển ứng dụng web Flutter của họ sang phiên bản production.

Trong suốt khoảng thời gian này, chúng tôi đã thực hiện các cải tiến lớn về kiến trúc và bổ sung các tính năng mở rộng và tối ưu hóa Flutter cho web, tập trung vào bốn lĩnh vực: performance, các tính năng dành riêng cho web, các yếu tố liên quan đến desktop và plugin.

![image.png](https://images.viblo.asia/54b512b5-4876-4598-a4b1-5f8759994932.png)

### 2.1 Performance

Lĩnh vực cải tiến lớn nhất kể từ khi phát hành đầu tiên của chúng tôi là performance. Trong quá trình phát triển, chúng tôi đã hiểu rõ hơn về đặc điểm performance và độ chính xác của các công nghệ render khác nhau có sẵn trên web.

Ban đầu chúng tôi bắt đầu với mô hình dựa trên HTML, DOM. Trong mô hình này, công cụ web của Flutter sẽ dịch từng scene Flutter được tạo thành HTML, CSS hoặc Canvas và render frame trên trang dưới dạng một cây gồm các phần tử HTML. Mặc dù renderer HTML cung cấp khả năng tương thích tốt nhất với nhiều loại trình duyệt và có kích thước mã nhỏ hơn, hiệu suất repaint của renderer HTML kém phù hợp hơn với các ứng dụng đồ họa chuyên sâu hơn như Rive, một collaborative tool được xây dựng với Flutter để tạo đồ họa chuyển động.

![image.png](https://images.viblo.asia/4a56cd05-aaaa-4706-9693-4a7751f3f245.png)

Rive, một công cụ để tạo animation tùy chỉnh, đã xây dựng lại ứng dụng của họ bằng cách sử dụng Flutter trên web và hiện nó đã có phiên bản beta.

Để xử lý độ trung thực cần thiết để render đồ họa chuyên sâu một cách hiệu quả, chúng tôi đã bắt đầu thử nghiệm với CanvasKit, cho phép render các lệnh vẽ Skia trong trình duyệt bằng cách sử dụng WebAssembly và WebGL. Chúng tôi phát hiện ra rằng CanvasKit có thể mang lại hiệu suất, độ trung thực và độ chính xác cao, cho phép mức mã lực đồ họa cao và sắc nét, được thể hiện trong bản demo này bởi Felix Blaschke, một thành viên tài năng của cộng đồng Flutter.

![](https://images.viblo.asia/25988c02-46d3-4c2d-bdf1-f9b75439cdaf.png)

Mỗi renderer cung cấp lợi thế trong các tình huống khác nhau, vì vậy Flutter đang hỗ trợ cả hai chế độ render:

* HTML renderer : Sử dụng kết hợp các phần tử HTML, CSS, phần tử Canvas và các thành phần SVG. Renderer này có kích thước tải xuống nhỏ hơn.
* CanvasKit renderer: renderer này hoàn toàn phù hợp với Flutter dành cho thiết bị di động và desktop, có hiệu suất nhanh hơn với mật độ widget cao hơn, nhưng tăng thêm khoảng 2MB kích thước tải xuống.

Để tối ưu hóa ứng dụng web Flutter của bạn cho các đặc điểm của từng thiết bị, chế độ render được đặt theo mặc định thành tự động. Điều này có nghĩa là ứng dụng của bạn chạy với renderer HTML trên trình duyệt di động và với CanvasKit trên trình duyệt desktop.

Bạn cũng có thể sử dụng `--web-renderer html` hoặc `--web-renderer canvaskit` để chọn kiểu renderer cho ứng dụng của bạn. Để biết thêm thông tin, hãy xem tại [đây](https://flutter.dev/docs/development/tools/web-renderers).

### 2.2 Các tính năng dành riêng cho Flutter web

Một ứng dụng Flutter chạy trong trình duyệt sẽ giống như một ứng dụng web. Vì vậy, chúng tôi đã thêm các tính năng vào Flutter để giúp bạn sử dụng web tốt nhất.

Web có nhiều điểm mạnh, đặc biệt là khả năng tiếp cận toàn cầu. Một trong nhiều lý do để đưa ứng dụng Flutter của bạn lên web là tiếp cận người dùng bên ngoài các app store. Để làm được điều đó, chúng tôi đã cung cấp việc hỗ trợ cho việc tuỳ chỉnh các URL tùy chỉnh phục vụ cho mục đích riêng, để đảm bảo rằng người dùng có thể truy cập ứng dụng của bạn ở bất kỳ đâu chỉ bằng một cú nhấp chuột vào URL. Với tính năng này, bạn có quyền kiểm soát các URL hiển thị trên thanh địa chỉ cũng như việc điều phối router (đường dẫn) ứng dụng của bạn trên web.

![](https://images.viblo.asia/a0fb58cc-0706-41ba-8d36-49e1531df519.png)

Hyperlinks (các siêu liên kết) cũng rất quan trọng đối với cách người dùng điều hướng (navigate) trên web. Một Widget liên kết mới  [link widget](https://pub.dev/documentation/url_launcher/latest/link/Link-class.html) trong plugin `url_launcher` cho phép người dùng liên kết sâu tới các anchor (thẻ ahref) trong ứng dụng của bạn hoặc đến các trang web bên ngoài. Bạn có thể sử dụng liên kết trên các widget có liên quan, bao gồm các nút, văn bản inline (nội tuyến), hình ảnh và chỉ định xem liên kết sẽ mở trong cùng một tab hay trong một tab mới.

Một phần không thể thiếu khác của bất kỳ ứng dụng nào là render văn bản. Phát triển hệ thống layout cho văn bản là một trong những thách thức lớn nhất để hỗ trợ Flutter trên web. Vì web thiếu API layout văn bản trực tiếp, Flutter phải thực hiện các phép đo khác nhau trên paragraph (đoạn văn) bằng cách kích hoạt layout(). Các phép đo này có thể trở nên khá tốn kém, do đó, phép đo văn bản dựa trên canvas mới được bổ sung để hỗ trợ cho cả văn bản thuần túy và văn bản đa dạng (plain and rich text). Giờ đây, Flutter có thể thực hiện các phép đo chi tiết một cách hiệu quả trên web, cho phép thực hiện những việc như highlight boxes (tô background) một cách chính xác trên văn bản đã chọn.

Interacting with text (Tương tác với text) cũng quan trọng như việc có thể hiển thị văn bản một cách nhanh chóng và chính xác. Giờ đây, Text có thể được chọn, sao chép và dán bằng cách sử dụng các widget SelectableText và EditableText. Ngoài ra, các Form Textfield Widget hỗ trợ autofill bằng cách cho phép trình duyệt lưu trữ dữ liệu và xử lý các trường hợp autofill trong tương lai.

Flutter 2 đặc biệt thích hợp để triển khai Progressive Web App hoặc PWA. PWA rất phù hợp để thu hẹp khoảng cách giữa ứng dụng web và thiết bị di động một cách an toàn và đáng tin cậy nhờ vào Dự án Fugu của Chrome.

![](https://images.viblo.asia/866bc648-cd3e-41df-936f-0d1740fa1935.png)

Khi bạn tạo ứng dụng Flutter web, chúng tôi bao gồm PWA web manifest file, cũng như code để thiết lập các service workers. File manifest cung cấp các metadata về cách ứng dụng của bạn sẽ chạy như thế nào, bao gồm thông tin như icons (biểu tượng) và app title (tên ứng dụng). Service workers kích hoạt bộ nhớ đệm tài nguyên và chạy ứng dụng của bạn khi cả đang ngoại tuyến. Khi chạy ứng dụng Flutter trong trình duyệt dưới dạng PWA, bạn sẽ có cơ hội cài đặt ứng dụng đó vào thiết bị của mình, cho dù là ứng dụng dành cho thiết bị di động hay desktop.

### 2.3 Hỗ trợ cho Desktop

Chúng tôi muốn trải nghiệm web Flutter trở nên phù hợp, bất kể hình dạng và kích thước của cửa sổ trình duyệt của bạn. Trên trình duyệt di động, ứng dụng Flutter đã hỗ trợ tuyệt vời cho cử chỉ (gestures) và scrolling physics nhờ vào hỗ trợ ứng dụng dành cho thiết bị di động. Tuy nhiên, các trình duyệt trên desktop cung cấp các mức độ các chi phí tài nguyên để render UI khác nhau nên chúng tôi đã cập nhật Flutter cho phù hợp.

Ví dụ: có kỳ vọng rằng nội dung trên màn hình có thể hiển thị các scrollbar được điều khiển bằng chuột hoặc bàn phím. Vì vậy, các customizable interactive scrollbars(scrollbar tương tác) có thể tùy chỉnh với theme, track và khả năng scroll bằng cách kéo ngón tay cái. PrimaryScrollController đã được mở rộng để bạn có thể sử dụng phím tắt để scroll mà không cần phải kết nối các scroll view của riêng mình.

![](https://images.viblo.asia/b8a72a95-4080-4b4a-9ddd-34fb890e57ef.jpg)

Giải pháp quản lý tài sản của Zurich Insurance là một ví dụ tuyệt vời về các ứng dụng doanh nghiệp mà hỗ trợ web của Flutter có thể bật trên trình duyệt desktop.

Chúng tôi cũng tăng default content density(mật độ nội dung mặc định), vì con trỏ chuột hỗ trợ mật độ chặt chẽ hơn so với thiết bị cảm ứng. Và chúng tôi đã thêm system mouse cursors(một tập hợp con trỏ chuột hệ thống) vào framework để hỗ trợ tất cả các nền tảng.

Cuối cùng, để hỗ trợ tất cả người dùng, các tính năng semantic web của Flutter được mở rộng để hỗ trợ khả năng truy cập cho Windows, macOS và ChromeOS. Trên web, cây DOM thứ hai được gọi là cây `SemanticsNode` được tạo song song với cây DOM RenderObject. Cây SemanticsNode chuyển các flag, action, label và các thuộc tính semantic khác thành các thuộc tính ARIA. Giờ đây, bạn có thể sử dụng trình đọc màn hình Narrator, VoiceOver, TalkBack, hoặc ChromeVox để navigate ứng dụng web Flutter.

### 2.4 Plugin ecosystem

Cuối cùng, hỗ trợ web đã được thêm vào một số plugin được sử dụng nhiều nhất, giúp bạn có thể đưa các ứng dụng Flutter hiện có lên web. Các plugin Flutter cho phép code của bạn tương tác với các thư viện gốc cho nền tảng bạn đang chạy. Khi bạn chạy ứng dụng Flutter của mình trên web, bạn có thể truy cập các thư viện JavaScript hiện có thông qua các plugin.

Kể từ khi phát hành bản beta và với sự trợ giúp từ cộng đồng, hỗ trợ cho các plugin sau đã được thêm vào:

* image_picker
* google_maps
* firebase_analytics
* firebase_storage
* connectivity
* cloud_firestore
* cloud_functions
* cross_file

## 3. Hướng về tương lai

Cách đây vài năm, không thể phân phối Flutter trên web với chất lượng và hiệu suất ở mức chấp nhận được. Tuy nhiên, sự ra đời của các công nghệ web mới và những tiến bộ liên tục trong nền tảng cho phép chúng tôi khai thác nhiều hơn nữa tiềm năng của thiết bị cơ bản. Với sự hỗ trợ cho web, Flutter bao gồm mọi thiết bị trên internet với trải nghiệm nhất quán trên tất cả các trình duyệt và thiết bị hiện đại.

Phần lớn bản phát hành này được xác định bởi feedback của những người chấp nhận web ban đầu và bởi các vấn đề do cộng đồng báo cáo. Và vì điều đó, chúng tôi cảm ơn bạn! Trong tương lai, mục tiêu chính của chúng tôi là giải quyết phản hồi của bạn và giải quyết các vấn đề một cách nhanh chóng để bạn có thể tập trung vào việc cung cấp ứng dụng Flutter, chất lượng cao trên tất cả các nền tảng mục tiêu của mình.

![](https://images.viblo.asia/0c5f2cc5-bc0e-42a9-bb5d-0907a7d9b010.png)

Hiệu suất có thể sẽ luôn là một lĩnh vực cần đầu tư rất nhiều. Mục tiêu của chúng tôi là giảm kích thước code và tăng khung hình mỗi giây (fps). Ngày nay, mọi ứng dụng web Flutter đều tải xuống engine code mà nó cần. Chúng tôi đang xem xét các khả năng để lưu vào bộ nhớ cache một số logic này, giảm thời gian khởi động và kích thước tải xuống. Gần đây, chúng tôi đã làm việc trong ứng dụng demo Flutter Gallery để giảm kích thước mã bằng cách sử dụng các deferred libraries và có kế hoạch chia sẻ những gì chúng tôi đã học được sớm.

Chúng tôi cũng đang tiếp tục tinh chỉnh một số lĩnh vực trong những tháng tới:

* Mặc dù CanvasKit ổn định, nhưng có một số trường hợp phức tạp không được đề cập, chẳng hạn như font fallbacks cho các ký tự đặc biệt hoặc hỗ trợ đúng hình ảnh Origin Resource Sharing (CORS).
* PWA hiện lưu vào bộ nhớ cache một tập hợp con tài nguyên, do đó, hỗ trợ ngoại tuyến của chúng tôi vẫn yêu cầu các bước thủ công bổ sung để hoạt động cho CanvasKit.
* Chức năng và render văn bản, chẳng hạn như chọn văn bản có độ phức tạp cao, vẫn là một trong những tính năng phức tạp nhất mà chúng tôi sẽ tiếp tục phát triển.
* Hệ sinh thái plugin của chúng tôi là thứ mà chúng tôi cũng sẽ tiếp tục đầu tư để các package do Google xuất bản có tính ngang bằng cao hơn trên thiết bị di động và web.

![](https://images.viblo.asia/d4904939-6113-4576-b00a-84cfff426e5c.png)

## 4. Bắt đầu với Flutter trên web

Với tính di động của Dart, sức mạnh của nền tảng web và tính linh hoạt của framework Flutter, giờ đây bạn có thể tạo ứng dụng cho iOS, Android và trình duyệt web từ cùng một codebase.

Đối với những bạn đã có ứng dụng web Flutter hiện tại, giờ đây bạn có thể xây dựng ứng dụng của mình trên nhánh stable. Và khi bạn xây dựng ứng dụng web của mình, hãy nhớ gửi bất kỳ vấn đề nào lên GitHub nếu gặp phải.

Chúng tôi rất nóng lòng muốn xem những gì bạn xây dựng với hỗ trợ web mới của Flutter!

> Xem bài viết đầy đủ tại [200Lab Education](https://200lab.io/blog/tim-hieu-flutter-web-2-stable/)