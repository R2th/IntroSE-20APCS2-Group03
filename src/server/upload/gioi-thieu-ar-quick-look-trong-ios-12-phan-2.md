Ở phần trước chúng ta đã tạo ra một ứng dụng iOS chạy được, trong phần này, chúng ta sẽ xây dựng chức năng y như vậy nhưng trên nền tảng website bằng cách sử dụng HTML. Nếu bạn chưa từng làm việc với HTML trước đây, đừng có lo lắng, bài viết này sẽ hướng dẫn các bạn một cách đầy đủ để làm được việc đó.

Để bắt đầu, bạn hãy mở bất kì ứng dụng Text Editor nào, sau đó gõ như sau: 

![](https://images.viblo.asia/14b85766-aaf3-4df3-9d52-9df79d0169e0.png)

Đây là cách để bắt đầu mọi website HTML. Thẻ <!DOCTYPE html> là một chỉ dẫn cho browser rằng trang này được viết bằng HTML. Chúng ta sẽ sử dụng HTML5.

Mở ngoặc nhọn được hiểu là những "tag" hay gọi là thẻ. Giống như việc chúng ta khai báo code ở trong class ở Swift, tất cả code của HTML sẽ được viết ở trong thẻ <html> và </html>. Thẻ <html> đại diện cho việc bắt đầu và </html> có nghĩa rằng kết thúc.

![](https://images.viblo.asia/513a1dfb-ba99-45ac-a4e6-c1ccec337f5e.png)

Mỗi khi ta mở một website, ta sẽ thấy tiêu đề của website ở trên thanh tab.

![](https://images.viblo.asia/5f30b379-f6ff-4b17-b44a-6d67290b6a51.png)

Vậy làm sao để viết nó bằng HTML, ở giữa thẻ HTML, hãy thêm đoạn code sau.

![](https://images.viblo.asia/e035e1e4-b04f-4fd9-bf35-3e16fb04083f.png)

Thẻ <head> là nơi để tất cả các metadata của một website. Một vài ví dụ về metadata như là link built-in, favicons,... ở trường hợp của chúng ta đó là tiêu đề.

Vì chúng ta đang định nghĩa tiêu đề của website, chúng ta sẽ để nó ở trong thẻ <title> và </title>.

File text của chúng ta sẽ giống như sau:

![](https://images.viblo.asia/1bf28150-3893-48bd-a938-881b35e0c96b.png)

Bây giờ, chúng ta phải định nghĩa phần body của website. Có nghĩa là tất cả những text, button, và hình ảnh chúng ta sẽ thấy trong trang web. Giống như trước, chúng ta sẽ đặt chúng ở trong thẻ <body>. Ngay dưới thẻ </head>, chúng ta thêm đoạn code sau: 

![](https://images.viblo.asia/c38201ea-e903-435f-aa06-d2d561ccd824.png)

Trong thẻ <body>, bạn sẽ tháy thêm hai thẻ mới: <h1> và <p>. Thẻ <h1> đại diện cho phần Header1, nó là tiêu đề của mỗi section. Thẻ <p> đại diện cho paragraph, dùng thẻ này khi bạn muốn viết một đoạn text dài. Nhớ rằng bạn có thẻ thay đổi tên của tiêu đề và đoạn văn bất cứ khi nào bạn cần.

![](https://images.viblo.asia/93f6ae24-8fe3-4898-872a-8431f61c30f0.png)

Hãy lưu file này lại, đặt tên nó có đuôi ".html".

![](https://images.viblo.asia/19792bc7-3746-4c08-b56c-cf3c4e44b9b3.png)

Bấm vào file bạn đã lưu, nó sẽ được bật trên safari hoặc trình duyệt mặc định.

![](https://images.viblo.asia/97f19d8f-1c0b-4740-afa6-f021943dfc79.png)

Chúc mừng bạn đã tạo một website HTML thành công.

# Thêm nút AR

Bây giờ chúng ta đã có text trong trang web của mình, giờ hãy thêm nút cho người dùng để mở AR Quick Look trong trang web. Vì chúng ta đang tạo một nút, nó vẫn phải nằm trong thẻ <body>. Ngay dưới thẻ <p>, hãy viết như sau:

![](https://images.viblo.asia/4912887c-4715-4d7f-b7dc-327c99330b34.png)

Thẻ <a> đại diện cho hyperlink. Có một vài tuỳ chỉnh đặc biệt cho thẻ <a> như sau:
1. Thuộc tính đầu tiên là "href". Đơn giản chỉ là đường dẫn đến tài liệu mà chúng ta muốn đưa người dùng đến khi họ bấm vào nút. "Tài liệu" ở đây chính là 3D model của chúng ta, cho nên tôi sẽ để file ".usdz" ở đây.
2. Thuộc tính thứ hai là "rel". Nó đại diện cho mối quan hệ giữa trang chúng ta đang thực thi và trang chúng ta muốn hướng đến. Tội đặt nó là "ar" vì "egg.usdz" là một AR model.
3. Bây giờ chúng ta đã có nút được định nghĩa nhưng chưa cho nó có một hình thái như thế nào. Bằng cách sử dụng thẻ <img src>, chúng ta đã cho nút này một hình ảnh để nhận dạng. Bằng cách này, khi người dùng ấn vào hình ảnh, họ sẽ được đưa thẳng đến AR Quick Look. Chúng ta cũng đặt chiều rộng cho ảnh của mình để nó không quá lớn. Hình ảnh này chính là cái mà chúng ta đã sử dụng project XCode.

Bằng cách này bạn có thể tạo thêm được nhiều nút nữa.

![](https://images.viblo.asia/0fb448ef-95e8-41e6-adba-1936d2cf729e.png)

Mở file này trên trình duyệt, và nhìn vào kết quả bạn đã tạo ra với sự giúp đỡ của AR.

![](https://images.viblo.asia/44fda8e5-8047-4a2f-bf50-6f8c7a214675.png)

Tuy nhiên, khi bạn ấn vào ảnh, nó chỉ dẫn bạn đến folder thực có sẵn trong máy. Cộng với việc không thể mở được nó ở trên iPhone hoặc iPad. Giờ là lúc chúng ta sẽ sử dụng GitHub.

# Tải trang web lên GitHub

GitHub là nơi tuyệt vời để host các trang website tĩnh. Nhiều người sử dụng GitHub như là một cách để trình bày một CV hoặc trang About cho các dự án hoặc các tổ chức.

Một trong các lợi ích của trang GitHub đó là nó có thể sửa đổi từ trong repo của tài khoản của bạn. Qua nó, đây là nơi tuyệt vời để lưu trữ file và tham chiếu đến chúng. Nếu bạn chưa có tài khoản GitHub thì hãy tạo tại [đây](https://github.com/).

Khi bạn đã có tài khoản, hãy vào trang home và ấn vào dấu + trên cùng góc phải. Bấm vào New repository.

![](https://images.viblo.asia/10accf51-217b-45bf-82e9-7a75d03b92c4.png)

Cách mà GitHub hoạt động là bạn sẽ được cấp một domain : "username.github.io". Bất kì trang nào bạn tạo là subdomain ở bên dưới URL. Vì đó, đặt tên cho repository của bạn. Trong phần ảnh phía dưới, bạn có thể thấy tên của repository được đặt là aidev1065.github.io. Các phần còn lại bạn không cần phải chỉnh gì thêm và bấm vào "Create Repository".

![](https://images.viblo.asia/72143692-9607-4872-9b47-ec4e0305e1a1.png)

Khi bạn nhìn thấy trang của repository, di chuyển đến Setting tab và kéo xuống cho đến khi bạn thấy phần GitHub Pages.

![](https://images.viblo.asia/7cc58c1c-df54-4d44-868d-d4105f4c0beb.png)

Bấm vào "Choose a theme" ở bên dưới phần Theme Chooser. Nó sẽ tạo theme cho trang của chúng ta. Có rất nhiều loại theme. Bạn có thể chọn bất kì loại nào mà bạn muốn.

![](https://images.viblo.asia/80d1ea10-ec55-409f-9112-03b2ba43aea2.png)

Sau khi bạn ấn vào "Select theme", bạn sẽ thấy một file "Markdown". Nó được dùng để trình bày thông tin cho trang web của chúng ta. Nếu bạn vẫn chưa thuần thục cấu trúc của Markdown, đừng lo lắng. Hãy xoá hết mọi thứ trong file index.md và thêm đoạn sau:

![](https://images.viblo.asia/194812f8-2031-4790-a109-073c84b13b1d.png)

Điều quan trọng ở đây là trong đấu ngoặc đơn, hãy để tên của HTML bạn mới tạo lúc trước.

![](https://images.viblo.asia/1ba5279f-6e01-4997-a313-a5b06adbf217.png)

Kéo xuống bên dưới và bấm vào "Commit changes". Bây giờ bạn đã có một file Markdown! Nếu bạn vào bất cứ trình duyệt nào, hãy gõ "username.github.io", bạn sẽ được chỉ dẫn đến chính trang GitHub của bạn.

![](https://images.viblo.asia/f3b7b210-f6bb-4563-9dee-192b61ff4101.png)

Tuy nhiên, khi bạn bấm vào nút "here", bạn sẽ bị lỗi vì hiện tại chúng ta chưa tải lên trang HTML và các file USDZ.

Quay trở lại trang repository và bấm vào "Upload files".

![](https://images.viblo.asia/86ed7239-d158-4db8-a29f-51feddcd924b.png)

Giờ phần còn lại chỉ là tải lên các file HTML và USDZ model. Có tất cả 19 file ở đây.

![](https://images.viblo.asia/583c7644-5fc4-4a7a-8091-72d6e7ea6dc6.png)

Kéo xuống dưới và bấm vào "Commit changes". Nó sẽ tốn một vài phút. Khi tất cả mọi thứ đã xong, hãy quay lại trang “username.github.io” của bạn. Bây giờ, khi bạn bấm vào "here", bạn sẽ thấy trang HTML mà bạn đã tạo trước đây.

Tiếp đó, nếu bạn chạy trang web trên thiết bị iOS 12, bạn sẽ thấy logo của ARKit ở góc trên cùng tay phải. Có nghĩa rằng bạn có thể QuickLook model này.

![](https://images.viblo.asia/5e216988-516f-46a4-a811-a9c76fff645a.png)

Khi bạn bấm vào bất cứ ảnh nào, nó sẽ hiển thị giống với trên app iOS.

![](https://images.viblo.asia/9fb45647-0146-4525-a055-8dcfca871a28.png)

Kết thúc bài hướng dẫn ở đây, tôi mong rằng các bạn đã có được những kinh nghiệm quý giá trong bài hướng dẫn này, cảm ơn các bạn đã đón đọc.

REF : https://www.appcoda.com/arkit-quick-look/