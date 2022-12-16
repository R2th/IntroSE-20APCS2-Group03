Nếu bạn muốn cung cấp một ứng dụng web (hoặc chỉ là một trang web) như là một phần của ứng dụng khách, bạn có thể thực hiện bằng cách sử dụng WebView. Lớp WebView là một mở rộng của lớp View của Android cho phép bạn hiển thị các trang web như là một phần của bố cục hoạt động của bạn. Tính năng này không bao gồm bất kỳ tính năng nào của trình duyệt web được phát triển đầy đủ, chẳng hạn như điều khiển điều hướng hoặc thanh địa chỉ. Tất cả những gì mà WebView thực hiện, theo mặc định, là hiển thị một trang web.
- Một tình huống phổ biến sử dụng WebView hữu ích là khi bạn muốn cung cấp thông tin trong ứng dụng của mình mà bạn có thể cần phải cập nhật, chẳng hạn như thỏa thuận người dùng cuối hoặc hướng dẫn sử dụng. Trong ứng dụng Android của bạn, bạn có thể tạo một Hoạt động có chứa WebView, sau đó sử dụng nó để hiển thị tài liệu của bạn được lưu trữ trực tuyến.
- Một trường hợp khác mà WebView có thể giúp là nếu ứng dụng của bạn cung cấp dữ liệu cho người dùng luôn đòi hỏi kết nối Internet để truy xuất dữ liệu, chẳng hạn như email. Trong trường hợp này, bạn có thể thấy rằng dễ dàng hơn trong việc xây dựng WebView trong ứng dụng Android của mình để hiển thị trang web với tất cả dữ liệu người dùng chứ không phải thực hiện yêu cầu mạng, sau đó phân tích cú pháp dữ liệu và hiển thị nó trong bố cục Android. Thay vào đó, bạn có thể thiết kế một trang web được thiết kế riêng cho các thiết bị Android và sau đó triển khai WebView trong ứng dụng Android của bạn để tải trang web.

Bài viết này cho bạn thấy làm thế nào để bắt đầu với WebView và làm thế nào để thực hiện một số thứ bổ sung, chẳng hạn như xử lý điều hướng trang và ràng buộc JavaScript từ trang web của bạn đến mã phía khách hàng trong ứng dụng Android của bạn.

I. Thêm WebView vào Ứng dụng của bạn
Để thêm một WebView vào ứng dụng của bạn, chỉ cần bao gồm phần tử trong layout activity của bạn. 
Ví dụ: đây là một layout trong đó WebView làm đầy màn hình:
![](https://images.viblo.asia/7eef9ab0-3854-4887-a149-089cd239dda3.png)
Để tải một trang web trong WebView, sử dụng loadUrl (). 
Ví dụ:
![](https://images.viblo.asia/afe6ca7a-73e3-4622-a934-949aea76d22e.png)
Trước khi điều này có hiệu quả, ứng dụng của bạn phải có quyền truy cập vào Internet. Để truy cập Internet, yêu cầu sự cho phép INTERNET trong tệp kê khai của bạn.
Ví dụ:
![](https://images.viblo.asia/b7532d54-676b-470b-b5cc-f9d6edeb0fec.png)
Đó là tất cả những gì bạn cần cho một WebView cơ bản hiển thị một trang web

II. Sử dụng JavaScript trong WebView
Nếu trang web bạn dự định load trong WebView sử dụng JavaScript, bạn phải enable JavaScript cho WebView. Khi đã bật JavaScript, bạn cũng có thể tạo ra các interface giữa mã ứng dụng và mã JavaScript của bạn.

Enabling JavaScript
JavaScript mặc định được tắt trong WebView. Bạn có thể kích hoạt nó thông qua WebSettings đính kèm WebView của bạn. Bạn có thể lấy WebSettings với getSettings (), sau đó kích hoạt JavaScript với setJavaScriptEnabled (). 
Ví dụ:
![](https://images.viblo.asia/acc25eb8-f3ca-4a36-a4f7-1a7b4cbdf2d1.png)
WebSettings cung cấp quyền truy cập cho nhiều cài đặt khác mà bạn có thể thấy hữu ích. Ví dụ: nếu bạn đang phát triển một ứng dụng web được thiết kế riêng cho WebView trong ứng dụng Android của bạn thì bạn có thể định nghĩa chuỗi user agent tùy chỉnh bằng setUserAgentString (), sau đó truy vấn đại lý người dùng tùy chỉnh trong trang web của bạn để xác minh rằng khách hàng yêu cầu trang web của bạn thực sự là ứng dụng Android của bạn.

Bind mã JavaScript vào mã Android
Khi phát triển một ứng dụng web được thiết kế riêng cho WebView trong ứng dụng Android của bạn, bạn có thể tạo các Interface giữa mã JavaScript của bạn và mã Android phía máy khách. Ví dụ: mã JavaScript của bạn có thể gọi một phương pháp trong mã Android của bạn để hiển thị hộp thoại, thay vì sử dụng chức năng alert () của JavaScript.
Để bind interface giữa mã JavaScript và Android của bạn, hãy gọi addJavascriptInterface (), truyền nó cho một instance để liên kết với JavaScript của bạn và một tên interface mà JavaScript của bạn có thể gọi để truy cập vào class.
Ví dụ: bạn có thể bao gồm class sau trong ứng dụng Android của bạn:
![](https://images.viblo.asia/13f26d3b-d896-4056-bfb9-f6a83fb98adf.png)
Chú ý: Nếu bạn đã đặt targetSdkVersion của bạn lên 17 hoặc cao hơn, bạn phải thêm chú thích @JavascriptInterface vào bất kỳ phương pháp nào bạn muốn có sẵn cho JavaScript của bạn (phương pháp cũng phải là công khai). Nếu bạn không cung cấp chú thích, phương pháp này không thể truy cập được bởi trang web của bạn khi chạy trên Android 4.2 trở lên.
Trong ví dụ này, class WebAppInterface cho phép trang web tạo ra một thông điệp Toast, sử dụng phương thức showToast (). Bạn có thể kết hợp class này với JavaScript chạy trong WebView với addJavascriptInterface () và đặt tên cho giao diện Android. 
Ví dụ:
![](https://images.viblo.asia/eac3d546-9763-41c6-ba77-45055fc9958e.png)
Điều này tạo ra một interface được gọi là Android dành cho JavaScript chạy trong WebView. Tại thời điểm này, ứng dụng web của bạn có quyền truy cập vào lớp WebAppInterface. 
Ví dụ: dưới đây là một HTML và JavaScript tạo ra một thông báo sử dụng interface khi người dùng nhấp vào một nút:
![](https://images.viblo.asia/d0d94463-307b-438c-9062-ec4350b65427.png)
Không cần phải khởi tạo interface Android từ JavaScript. WebView tự động cung cấp cho trang web của bạn. Vì vậy, khi nhấp vào nút, chức năng showAndroidToast () sử dụng interface Android để gọi phương thức WebAppInterface.showToast ().
Lưu ý: Đối tượng liên quan đến JavaScript của bạn chạy trong một thread khác và không có trong thread mà nó được xây dựng.
Chú ý: Sử dụng addJavascriptInterface () cho phép JavaScript kiểm soát ứng dụng Android của bạn. Đây có thể là một tính năng rất hữu ích hoặc một vấn đề an ninh nguy hiểm. Khi HTML trong WebView không đáng tin cậy (ví dụ: một phần hoặc toàn bộ HTML được cung cấp bởi một người hoặc quá trình không xác định) thì kẻ tấn công có thể bao gồm HTML thực hiện mã phía máy khách và có thể là bất kỳ mã nào của kẻ tấn công đang chọn. Do đó, bạn không nên sử dụng addJavascriptInterface () trừ khi bạn đã viết tất cả HTML và JavaScript xuất hiện trong WebView của mình. Bạn cũng không nên cho phép người dùng điều hướng đến các trang web khác không phải của riêng bạn, trong WebView của bạn (thay vào đó, cho phép ứng dụng trình duyệt mặc định của người dùng mở các liên kết nước ngoài - theo mặc định, trình duyệt web của người dùng sẽ mở tất cả liên kết URL, do đó hãy cẩn thận chỉ khi bạn xử lý điều hướng trang như mô tả trong phần sau).

III. Xử lý Điều hướng Trang
Thông thường, trình duyệt web mặc định sẽ mở ra và tải URL đích. Tuy nhiên, bạn có thể ghi đè lên hành vi này cho WebView, do đó các liên kết mở trong WebView của bạn. Sau đó, bạn có thể cho phép người dùng điều hướng lùi và chuyển tiếp qua lịch sử trang web của họ được duy trì bởi WebView của bạn.Để mở các liên kết được nhấp bởi người dùng, chỉ cần cung cấp một WebViewClient cho WebView của bạn, sử dụng setWebViewClient (). 
Ví dụ:
![](https://images.viblo.asia/7699d6c0-29bf-429e-b5d1-7c72d6770f64.png)
Nếu bạn muốn kiểm soát nhiều hơn nơi tải liên kết được nhấp, hãy tạo WebViewClient của riêng bạn để ghi đè phương thức shouldOverrideUrlLoading (). 
Ví dụ:
![](https://images.viblo.asia/cf895a16-0441-4f94-a5aa-7d0b5b562f38.png)
Sau đó tạo một instance của WebViewClient mới này cho WebView:
![](https://images.viblo.asia/8ba0f35e-a4cd-4838-a253-114f5f38a212.png)
Bây giờ khi người dùng nhấp vào liên kết, hệ thống sẽ gọi hàm shouldOverrideUrlLoading (), kiểm tra xem máy chủ URL có khớp với một miền cụ thể hay không (như đã định nghĩa ở trên). Nếu so khớp, thì phương thức trả về false để không ghi đè lên việc tải URL (nó cho phép WebView tải URL như thường lệ). Nếu máy chủ URL không khớp, thì một Intent được tạo để khởi chạy Hoạt động mặc định để xử lý URL (có thể giải quyết cho trình duyệt web mặc định của người dùng).

IV. Điều hướng lịch sử trang web
Khi WebView ghi đè URL, nó sẽ tự động tích lũy một lịch sử các trang web đã truy cập. Bạn có thể điều hướng ngược và chuyển tiếp qua lịch sử với goBack () và goForward ().
![](https://images.viblo.asia/a81f3076-7d2c-477c-bf87-e2527900fff6.png)
Phương thức canGoBack () trả về true nếu có lịch sử trang web thực sự cho người dùng truy cập. Tương tự như vậy, bạn có thể sử dụng canGoForward () để kiểm tra xem có lịch sử chuyển tiếp hay không. Nếu bạn không thực hiện kiểm tra này, sau đó một khi người dùng đến cuối của lịch sử, goBack () hoặc goForward () không làm gì cả.