![image.png](https://images.viblo.asia/a511a226-6823-4ab8-9778-c7d9561abe3e.png)

Ở bài trước, chúng ta đã cùng tìm hiểu về các câu lệnh console hữu ích, và hay được dùng trong quá trình code cũng như debug. Trong bài này, mình sẽ giới thiệu cho các bạn một công cụ hỗ trợ đắc lực cho chúng ta trong quá trình code cũng như debug có tên gọi là devtool.

Bản thân công cụ này được tích hợp vào trong hầu hết các trình duyệt hiện nay với những tính năng mà nó mang lại đều khá giống nhau. Do đó, trong bài viết này chúng ta cùng nhau tìm hiểu nó ở trình duyệt chrome, một trình duyệt được sử dụng nhiều nhất nhé ?.

Bạn có thể xem thêm bài viết tại: https://200lab.io/blog/gioi-thieu-cong-cu-devtool-trong-cac-trinh-duyet/

## 1. Giới thiệu

![image.png](https://images.viblo.asia/d9837f9d-0661-45b5-86e5-47e67fbdf529.png)

Theo như trang chủ của [Chrome Developers](https://developer.chrome.com/) có giới thiệu về bộ công cụ [Chrome DevTool](https://developer.chrome.com/docs/devtools/) của mình thì nó là một bộ công cụ dành cho các nhà phát triển web, được tích hợp sẵn trên trình duyệt Google Chrome.

DevTool có thể giúp bạn tinh chỉnh trang web cũng như giúp phát hiện các lỗi một cách nhanh chóng. Nó giúp cho bạn xây dựng trang web được tốt hơn và nhanh hơn.

## 2. Cách sử dụng

### 2.1 Cách mở công cụ devtool

Có nhiều cách để mở công cụ này trên trình duyệt, trong đó có một cách thủ công nhất như hình bên dưới.

![image.png](https://images.viblo.asia/2a4cc7b7-b3eb-4b6e-a5ea-76badc32cc8f.png)

Khá là “thủ công” phải không ?, Ngoài cách trên các cách mở devtool còn lại khá là nhanh như:

* Click chuột phải và chọn `Inspect` như hình:

![image.png](https://images.viblo.asia/d9c0cce2-9232-40a1-a1a1-0ad15159846f.png)

* Bạn cũng có thể sử dụng phím tắt `ctrl + shift + I` hoặc một số tổ hợp phím mở nhanh các tab của devtool để mở cũng được như: `ctrl + shift + C` để mở tab `Elements`, `ctrl + shift + J` để mở nhanh tab `Console` (Windows, Linux, Chrome OS)

Nếu bạn đang dùng MacOS thì sử dụng phím `Command` thay cho `ctrl` nhé, ví dụ như: `Command + Option + C` hoặc `Command+Option+J` nhé ?

Ở Windows bạn cũng có thể mở devtool bằng phím `F12`. Mình thì sử dụng chuột để `Inspect`  hoặc phím `F12` cho nhanh ?.

### 2.2 Các tab của công cụ devtool

Khi mở công cụ devtool lên ta sẽ thấy nó chia thành nhiều tab với những công dụng khác nhau ở từng tab như hình

![image.png](https://images.viblo.asia/410cb32e-9bf2-471e-8a0f-4cc15a47d2e0.png)

Vậy mấy cái tab này có công dụng gì? Mình cùng nhau tìm hiểu nhé ?

**Elements**

Tab này cho ta biết được HTML để xây dựng nên trang web mà ta đang xem, cùng với bất kỳ các inline CSS.

![image.png](https://images.viblo.asia/37a9c4ed-9a86-407e-be5b-69945d5d5237.png)

Trong tab này bạn có thể làm nhiều  thứ như: xem và thay đổi DOM, xem và thay đổi CSS, kiểm tra và tinh chỉnh trang web, edit DOM hoặc Style, kiểm tra các animation, check xem CSS nào dư thừa hoặc không hoạt động.

**Console**

Ở tab này ta có thể xem các message mà khi code ta có thể log ra theo mục đích của mình hoặc cũng có thể xem các message warning hoặc error trong quá trình ta phát triển các website.

Ngoài ra ta cũng có thể viết và chạy code JavaScript ở tab này được nhé.

![image.png](https://images.viblo.asia/f0ca8957-ddbf-4e60-a49f-8bbd08fe9d22.png)

**Sources**

Tại tab này, bạn có thể xem tất cả các file được sử dụng để tạo ra trang web mà bạn đang xem, đồng thời cũng cho phép bạn thao tác với chúng.

Bạn có thể debug JavaScript, duy trì các code bạn đã thay đổi mà không bị reset khi ta reload lại trang. Bởi vì khi bạn thay đổi code JavaScript trên devtool, nó sẽ lưu tất cả các thay đổi vào trong ổ đĩa.

![image.png](https://images.viblo.asia/ed9059bd-8158-404d-9975-e4aeeab2e69c.png)

**Network**

Tại tab này, bạn có thể xem các file đang tải trong URL mà bạn đang xem.

![image.png](https://images.viblo.asia/4bdb34b5-0540-411d-890f-5b05040adc7f.png)

**Security**

Tại tab Security, nó cung cấp cho bạn thông tin bảo mật cơ bản, cho phép bạn xem các chứng chỉ HTTPS và trạng tái TLS của trang web.

![image.png](https://images.viblo.asia/cdb5c495-ccdf-4c3d-b86b-a33e4c656a49.png)

**Lighthouse**

Tab này có chức năng tự động tạo báo cáo về chức năng cũng như cấu trúc của trang web để giúp các nhà phát triển cải thiện hiệu suất cho trang web của mình.

![image.png](https://images.viblo.asia/64acf349-8e4c-41d2-882d-fa632986b90d.png)

Chọn loại thiết bị mà bạn muốn kiểm tra và báo cáo, sau đó nhấn button Generate report để bắt đầu, sau khi chạy xong ta được như hình (ở đây mình chọn device là Desktop)

![image.png](https://images.viblo.asia/a29e710c-27b7-4cbf-b9bd-be073769d50c.png)

**Lưu ý**: Bạn không thể thay đổi code của trang web bằng công cụ devtool được nhé, bạn sẽ edit được nhưng khi reload trang, xóa cache hay tắt đi mở lại trang thì nó sẽ trở về mặc định như cũ. Bạn cũng không can thiệp vào code của phần backend của trang, chỉ những code ở trình duyệt mà bạn sử dụng để hiển thị trang web mới có thể thay đổi.

Do đó bạn có thể vọc vạch bất cứ điều gì bạn muốn với công cụ này mà không sợ gặp rủi ro gì ?.

### 2.3 Cách sử dụng công cụ devtool phổ biến

Devtool rõ là một công cụ hữu ích đúng không nào ?, nhưng bạn có biết nó được sử dụng phổ biến ở những trường hợp nào hay không? Dưới đây là các cách sử dụng phổ biến nhất của nó.

**Kiểm tra các thẻ của trang**

Nếu bạn làm về SEO onpage thì bạn sẽ biết thẻ h1 và h2 khá quan trọng, bạn muốn kiểm tra chúng ở trang web của bạn, bạn có thể sử dụng một tool như Screaming Frog chẳng hạng. Tuy nhiên, đôi khi nó cũng không chính xác 100%. Để chắc chắn, bạn nên kiểm tra lần nữa bằng tay; đừng lo nó không quá khó đâu.

Bạn chỉ cần mở trang web mà bạn muốn check, mở devtool lên và nhấn tổ hợp phím `Command + F` nếu bạn dùng MacOS hoặc `Ctrl + F` nếu bạn dùng Windows, Linux hay Chrome OS, sau đó chỉ việc gõ `<h1>`.

![image.png](https://images.viblo.asia/4decfc33-45c0-473c-8bbc-92c0c698a27a.png)

Đơn giản phải không nào ?

**Edit CSS**

Nếu bạn là một web dev thì chắc chắn bạn đã sử dụng cách này rất là nhiều lần rồi ?. Devtool cho phép bạn chỉnh sửa cũng như thay đổi CSS của trang một cách thỏa mái trên chính trình duyệt.

Ví dụ tôi chỉnh sửa đoạn text “OVERVIEW” này, tôi in đậm nó và cho nó màu đỏ.

Trước khi chỉnh sửa:

![image.png](https://images.viblo.asia/fab017c2-0c3a-4ace-b19b-d96737d0d431.png)

![image.png](https://images.viblo.asia/4bd92642-e732-42e1-af14-db933e59bb41.png)

Kết quả:

![image.png](https://images.viblo.asia/c58ef503-0516-4f74-a9c2-77f6f1f789c5.png)

**Device mode**

Tiêu chí của việc phát triển web là có thể chạy trang web của mình trên mọi nền tảng thiết bị. Do đó devtool cũng tích hợp tính năng Device mode cho phép bạn xem trang web của mình ở mọi loại kích thước màn hình cũng như hỗ trợ cho bạn các tỉ lệ màn hình của các thiết bị di động hiện nay, giúp cho bạn phát triển cũng như tối ưu trang web của mình có thể chạy trên chúng.

Để mở device mode bạn chỉ cần click vào button như hình:

![image.png](https://images.viblo.asia/d658291c-81df-4957-b552-0c9d4e88faee.png)

Kết quả:

![image.png](https://images.viblo.asia/c7b35cbd-455c-4b77-8d6d-8cf075354e02.png)

Như trong hình kết quả mình có đánh số thứ tự từ 1 - 5 để các bạn chú ý:

1. Bạn có thể thay đổi kích thước màn hình theo các thiết bị mà trình duyệt hỗ trợ hoặc bạn cũng có thể điều chỉnh kích thước màn hình theo ý muốn bằng cách chọn vào mục Responsive ở phần đầu tiên của option

2. Cho phép bạn điền vào kích thước width và height của device mà bạn muốn. Lưu ý bạn chỉ có thể điền vào khi bạn chọn mục Responsive như đã giải thích ở số 1.

3. Đây là tỉ lệ hiển thị, bạn có thể thay đổi tỉ lệ theo phần trăm mà trình duyệt cung cấp.

4. Phần này cho phép bạn xem trang web của bạn load như thế nào ở từng cấp độ thiết bị di động như: Mid-tier mobile, Low-end mobile và cả lúc device offline, mặc định là No throttling thì nó sẽ sử dụng cấu hình của thiết bị mà bạn đang dùng để chạy.

5. Phần này cho phép bạn xem các kích thước màn hình theo phương ngang, giống như bạn sử dụng điện thoại bạn theo phương ngang đó ?.

## 3. Tổng kết

Qua bài viết này, hy vọng bạn sẽ nắm rõ công cụ devtool hơn cũng như biết cách sử dụng nó trong quá trình học và làm việc. Cảm ơn các bạn đã đọc ?.