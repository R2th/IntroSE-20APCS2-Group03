Là một web developer, chắc hẳn bạn đã quá quen Chrome DevTools.

Đó là một công cụ tuyệt vời, cung cấp nhiều tính năng giúp bạn đẩy nhanh quá trình phát triển, đồng thời cũng là 
công cụ cần thiết cho frontend developer với mọi level.

Tuy nhiên,  chắc hẳn vẫn có một số tính năng hữu ích mà có thể bạn chưa biết.

Cùng tìm hiểu ở bài viết này nhé.


## 1 . Kiểm soát tốc độ mạng

Trang web của bạn sẽ được mọi người từ khắp nơi trên thế giới truy cập bằng các thiết bị có kích thước và nền tảng khác nhau.

Bạn có thể xây dựng các trang web reposive bằng cách sử dụng `media queries`, nhưng còn tốc độ mạng thì sao?

Không phải mọi khách truy cập của bạn sẽ có cùng tốc độ mạng, do đó bạn cần phải kiểm tra xem trang web của mình hoạt động như thế nào với các tốc độ mạng khác nhau.

May mắn thay, DevTools có tùy chọn chuyển đổi giữa 3 cài đặt:

1. 3G nhanh
2. 3G chậm
3. Ngoại tuyến
![](https://images.viblo.asia/eb312496-7e1f-457a-a561-27d758ba25b0.png)


Bạn cũng có thể thêm tùy chỉnh.
Bạn có thể tìm thấy tính năng này trong tab Network bằng cách chọn “No throttling” ở menu dropdown.

## 2. Multi Cursor

![](https://images.viblo.asia/601896bd-14e0-41b8-9563-0d624fe166c6.gif)

DevTools có sẵn một trình soạn thảo code tuyệt vời.

Nếu bạn là người chỉnh sửa CSS hoặc bất kỳ code nào bằng công cụ này, bạn sẽ hoàn toàn thích việc hỗ trợ nhiều con trỏ.

Nó cũng rất dễ thiết lập. Tất cả những gì bạn cần làm là nhấn và giữ Ctrl (Command trên Mac) và nhấp vào các dòng mà bạn muốn có nhiều con trỏ.

Bạn cũng có thể hoàn tác các lựa chọn của mình bằng cách nhấn và giữ Ctrl (Command trên Mac) + U.

Hơn nữa, bạn cũng có thể nhấn Alt và kéo để có nhiều con trỏ. Bạn có thể xem cách thực hiện tại [đây](https://twitter.com/umaar/status/798532756330450944).


## 3. Dark Mode

Với mình, dark mode tăng khả năng hiển thị và giúp giảm mỏi mắt. Có rất nhiều ưu điểm khi sử dụng dark mode, cũng như nhược điểm.
Bạn có thể đọc ở [đây](https://www.androidauthority.com/dark-mode-1046425/) 
![](https://images.viblo.asia/c9d69ca4-7211-4484-9b38-1ee8f0485366.png)

Để bật tính năng darkmode, mở phần Settings bằng cách click vào icon cạnh dấu 3 chấm dọc ở góc bên phải màn hình.
Sau đó vào
  **_Preferences_**  >  **_Appearance_**  >  **_Theme_**  và cuối cùng chọn  **_Dark_**.

## 4. Command Menu

![](https://images.viblo.asia/79b7722b-b674-4c11-a9d7-ad1af60a8798.jpeg)

Bạn có thể nhanh chóng mở Command Menu bằng cách nhấn `Ctrl (CMD trên Mac) + Shift + P` khi DevTools được mở.

Nó cung cấp một cách nhanh chóng để điều hướng DevTools và theo thời gian, bạn trở nên quen thuộc với nó.

Tính năng này rất hữu ích nếu bạn đã quen thuộc với VS Code’s Command Palette.

Bạn có thể xóa dấu `>` và thay thế bằng  `?` để xem tất cả các tính năng được cung cấp bởi menu này.

## 5. Phát hiện code không dùng
![](https://images.viblo.asia/8a01f6ae-d9d7-47c5-9358-6f1e56e95da8.jpeg)

Các ứng dụng JavaScript hiện đại ngày càng trở nên phức tạp và phụ thuộc vào rất nhiều thư viện của bên thứ ba.

Luôn có một số code không được sử dụng và được hiển thị dư thừa.

DevTools giúp bạn xác định vị trí code dư thừa có thể cản trở tốc độ trang web của bạn một cách không cần thiết.

Để làm như vậy, hãy nhấp vào ba dấu chấm dọc ở góc trên bên phải của DevTools. Sau đó nhấp vào More Tools và chọn Coverage.

Tất cả những gì bạn cần bây giờ là tải lại trang và bảng điều khiển mới bật lên sẽ hiển thị code JavaScript không được sử dụng.

Bạn có thể xem tổng số byte cũng như các byte chưa sử dụng cùng với thanh sử dụng trực quan.


## 6. Auto-Start

Nếu trình duyệt chính của bạn là một số trình duyệt khác không cung cấp các công cụ như vậy và bạn chỉ sử dụng Chrome cho Devtools, thì tính năng này có thể cực kỳ hữu ích đối với bạn.
![](https://images.viblo.asia/5e03201e-3d2c-4eeb-88a5-d74139af534b.jpeg)

Có một tùy chọn chung trong cài đặt DevTools để tự động mở DevTools cho các popup.

Tuy nhiên, cách tốt hơn để làm điều này là khởi động DevTools không chỉ trên popup mà  với chính trình duyệt Chrome.

Bạn có thể làm như vậy bằng cách thêm dòng sau làm thuộc tính trên Google Chrome.
```
    "C: \ Program Files (x86) \ Google \ Chrome \ Application \ chrome.exe"
    --auto-open-devtools-for-tabs
 ```

Và đối với người dùng Mac,
```
    --auto-open-devtools-for-tabs
```

Bạn có thể tham khảo câu trả lời tại [đây](https://stackoverflow.com/questions/12212504/automatically-open-chrome-developer-tools-when-new-tab-new-window-is-opened/36957422#36957422) để tìm hiểu thêm các tùy chọn để kích hoạt DevTools.

## 7. Color Picker
![](https://images.viblo.asia/2dcafcaa-2b13-42ba-b840-fda1cabec289.png)

Color Picker là một  tính năng tuyệt vời để chọn chính xác màu bạn cần và có thể dễ dàng thêm nó vào CSS của trang web của bạn.

Cách sử dụng nó cũng rất đơn giản.
Chuyển đến tab `Elements` và từ đó chọn `Styles` để xem CSS.

Chỉ cần nhấp vào ô vuông màu (không phải giá trị) và công cụ chọn màu sẽ hiển thị.

Bộ chọn màu có khả năng dễ dàng chuyển đổi giữa các chế độ màu, như từ HEX sang RGBA.

## 8. Mobile Emulator

![](https://miro.medium.com/max/2638/1*oF2boorEq72VobSfrYGhRA.gif)

[Hơn 60% tất cả các tìm kiếm trực tuyến được thực hiện bởi thiết bị di động](https://www.thesearchreview.com/60-percent-online-searches-mobile-devices-07212/), làm cho thiết kế web reponsive trở thành một phần quan trọng của việc phát triển web.

DevTools cung cấp trình giả lập di động, có chiều cao và chiều rộng được xác định trước phù hợp với một số thiết bị di động phổ biến như iPhone, Pixel, Surface và iPad.

Mở DevTools và nhấp vào icon có hình thiết bị như hình.

Bạn cũng có thể chọn giữa thiết bị di động cấp trung bình hoặc cấp thấp từ menu “No Throttling”.

Ngoài ra, việc kéo thả để thay đổi kích thước khung nhìn là một tùy chọn hữu ích khác để có được kích thước chính xác bạn cần.

## 9. Breakpoints

![](https://miro.medium.com/max/2638/1*aOmvOirv6r3VIkOicti-xg.gif)

Bạn có bao giờ tự hỏi có bao nhiêu media quries mà Youtube phục vụ? bạn có thể dễ dàng check nó bằng cách enable option để nhìn được tất cả các media queries.

Chỉ cần click vào dấu ... như hình dưới và chọn Show media queries

Bạn sẽ thấy một panel mới hiển thị các điểm media query breakpoints khác nhau mà bạn có thể nhấp vào để áp dụng.

Bên cạnh đó, bạn cũng có thể thiết lập các breakpoint trong code JavaScript của mình một cách khá dễ dàng.

Một cách để làm việc này là viết `debugger` trong code của bạn, nó sẽ tạm dừng quá trình thực thi khi chạy đến debugger.

```js
    console.log('a');  
    console.log('b');  
    debugger;  
    console.log('c');
```
Một cách khác là đi đến tab `Souces` và đi tới file code, tìm dòng mà bạn muốn tạm dừng thực thi. 

Sau đó bạn click vào số dòng ở bên trái mã của bạn, và biểu tượng màu xanh sẽ xuất hiện trên số dòng đó. 

DevTools sẽ tạm dừng trước khi dòng mã này được thực thi.


<br>

Bài viết đến đây là hết. Cảm ơn các bạn đã theo dõi.

Tham khảo: [Link](https://javascript.plainenglish.io/9-hidden-features-of-chrome-devtools-78856b2a96de)