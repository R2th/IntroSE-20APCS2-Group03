## Giới thiệu về Chrome DevTools
**Chrome DevTools** là một bộ công cụ phát triển web được tích hợp trực tiếp vào trình duyệt Google Chrome.
DevTools có thể giúp bạn chẩn đoán vấn đề một cách nhanh chóng, điều này giúp bạn xây dựng trang web tốt hơn, nhanh hơn.
Với DevTools, bạn có thể xem và thay đổi bất kỳ trang nào, ngay cả trang chủ Google.

Dưới đây là các điểm khởi đầu được đề xuất mà DevTools có thể giúp bạn xây dựng trang web nhanh hơn:
* **Xem và thay đổi kiểu của trang** 

Mỗi developer đều có trải nghiệm như: code một vài CSS và sau đó xem trang của mình hiển thị ra sao, các kiểu đang không được phản ánh.
Hướng dẫn này cho bạn thấy cách sử dụng DevTools để xem cách trình duyệt thực sự có áp dụng css cho các phần tử HTML hay không. Nó cũng cho bạn thấy làm thế nào để thay đổi css từ DevTools, áp dụng các thay đổi ngay lập tức mà không cần phải tải lại trang.

* **Debug JavaScript** 

Cách thức đầu tiên mà hầu hết các developer học cách debug là  rắc lệnh *console.log ()*  trong suốt mã của họ, để suy ra nơi mã đang đi sai.
Hướng dẫn này cho bạn thấy cách thiết lập các điểm ngắt trong DevTools, cho phép bạn tạm dừng ở giữa việc thực thi một trang và từng bước qua code một dòng tại một thời điểm. Trong khi bạn bị tạm dừng, bạn có thể kiểm tra (và thậm chí thay đổi) các giá trị hiện tại của các biến tại thời điểm đó. Bạn có thể thấy rằng luồng công việc này giúp bạn debug các vấn đề nhanh hơn nhiều so với phương thức *console.log ()*.

* **Xem tin nhắn và chạy JavaScript trong Console** 

Bảng điều khiển cung cấp nhật ký theo thời gian của các tin nhắn cung cấp cho bạn thêm thông tin về việc liệu trang có đang chạy chính xác hay không.
Những thông điệp này đến từ các developer, người đã xây dựng trang, hoặc từ trình duyệt. Bạn cũng có thể chạy JavaScript từ Console để kiểm tra cách trang được tạo hoặc thử nghiệm thay đổi cách trang chạy.

* **Phân tích hiệu suất thời gian chạy** 

Nếu trang của bạn chậm, bạn có thể sử dụng DevTools để ghi lại mọi thứ xảy ra trên trang và sau đó phân tích kết quả để biết cách tối ưu hóa hiệu suất của trang.

Ở bài viết này mình xin đề cập đến việc phân tích hiệu suất thời gian chạy bằng Network Performance trong Chrome DevTools.
## Phân tích Network Performance trong Chrome  DevTools
Cùng học cách sử dụng bảng điều khiển Chrome DevTools Network để hiểu tại sao trang lại tải chậm theo hướng dẫn dưới đây: 

### Bước 1: Cài đặt DevTools
Giả sử bạn đang nhận báo cáo từ người dùng thiết bị di động rằng một trang trên site của bạn bị chậm. Và công việc của bạn là phải làm cho trang đó nhanh hơn.
1.	Click vào [Open Slow Page](https://googlechrome.github.io/devtools-samples/network/gs/v1.html) link. Trang sẽ được mở ra trên trình duyệt
2.	Nhấn *Command+Option+I (Mac)* or *Control+Shift+I (Windows, Linux)* để mở  DevTools 
3.	Tại DevTools tab, click vào tab **Network**

![](https://images.viblo.asia/a30f5c4d-6930-45c6-b114-d76cfd790dd5.png)

**Hình 1**. Bảng Chrome DevTools Network được mở bên cạnh trang Slow Page mà bạn sẽ tiến hành phân tích

Chú ý: Để thay đổi vị trí của DevTools,
-	Mở Main Menu.

-	Chọn  Undock into separate window ![](https://images.viblo.asia/8a976f3e-2358-4663-8022-7527023e8424.png) , Dock to left ![](https://images.viblo.asia/2ec59aab-2d46-4d01-889f-1a4ad7654dd1.png) , Dock to bottom  ![](https://images.viblo.asia/731b5cac-e517-4942-985e-5edf3916aeb0.png), or Dock to right  ![](https://images.viblo.asia/7ddce098-2d8c-4c34-89e4-0cb9f152bb61.png)

4.	Enable Capture Screenshots ![](https://images.viblo.asia/550f16b8-37bd-4a66-aa91-af5757c45461.png) , khi đó icon này sẽ chuyển sang màu xanh tức là đang được enabled. DevTools sẽ chụp màn hình trong suốt quá trình tải trang.

### Bước 2: Mô phỏng trải nghiệm của người dùng di động.
Việc kiểm thử hiệu suất mạng trên máy tính xách tay hoặc máy tính để bàn có thể đưa ra kết quả không giống nhau. Kết nối internet của bạn nhanh hơn nhiều so với kết nối của người dùng thiết bị di động và trình duyệt của bạn lưu trữ tài nguyên từ các lần truy cập trước đó.

1.	Tích vào checkbox **Disable Cache**. Khi checkbox này đang được enable, DevTools sẽ không đáp ứng được bất kỳ tài nguyên nào từ bộ nhớ cache. Điều này mô phỏng chính xác hơn những gì người dùng truy cập lần đầu tiên gặp phải khi họ xem trang của bạn.

2.	Từ dropdown menu đang ở trạng thái **No Throtting**, chọn **Slow 3G**. DevTools điều chỉnh kết nối mạng để mô phỏng môi trường 3G. Đây là cách người dùng thiết bị di động trải nghiệm trang web của bạn ở những nơi có kết nối kém.

![](https://images.viblo.asia/8f7115f6-6f25-43b7-ab48-9371969eba61.png)

**Hình 2**. Bảng điều khiển Chrome DevTools Network , cài đặt để minh họa trải nghiệm của người dùng.  Screenshots, cache disabling và throttling được bôi màu đỏ theo thứ tự từ trái qua phải.
Đây là cài đặt trong trường hợp xấu nhất. Nếu bạn có thể tải trang của mình nhanh chóng bằng cài đặt này thì nó cũng sẽ nhanh với tất cả người dùng khác của bạn!

### Bước 3: Phân tích các request

Tìm ra cái khiến cho trang bị chậm bằng cách  tải lại trang và phân tích các request đến

**Phần A**: Tìm render-blocking scripts
Khi trình duyệt gặp thẻ <script> , nó phải tạm dừng hiển thị và thực thi tập lệnh ngay lập tức.Tìm các tập lệnh không cần thiết cho việc tải trang và đánh dấu chúng là không đồng bộ hoặc hoãn thực thi để tăng tốc thời gian tải.
1.	Nhấn Command+R(Mac) hoặc Control+R(Windows, Linux) để tải lại trang. Trong môi trường kết nối tốt, sẽ cần hơn 10 giây để tải xong trang.

![](https://images.viblo.asia/d17812da-e234-485c-9e2e-7c26a4e4a809.png)

**Hình 3**: Bảng điều khiển Chrome DevTools Network sau khi tải lại trang.

2.	Lưu ý rằng giá trị cho **DOMContentLoaded** trong ô Summary, ở dưới cùng của bảng điều khiển Network. Bạn sẽ thấy giá trị sau ít nhất 8 giây. Khi bạn thấy sự kiện này kích hoạt muộn như thế này, hãy xem xét các tập lệnh đang trì hoãn tải và phân tích cú pháp của tài liệu chính.

3.	Nhấp vào **main.js** để điều tra thêm yêu cầu. DevTools hiển thị một tập hợp các tab mới cung cấp thêm thông tin về yêu cầu này.

4.	Nhấp vào tab **Preview** để xem mã nguồn của yêu cầu. Bạn có thể thấy kịch bản chỉ bị treo trong 4000ms.Bằng cách đánh dấu kịch bản này bằng thuộc tính async và di chuyển nó đến cuối <body> của tài liệu, trang có thể tải mà không cần chờ tập lệnh.

![](https://images.viblo.asia/b729e8eb-deae-46ee-856f-e82079004219.png)

**Hình 4**. Xem source code cho main.js trong ô Preview.

**Phần B**: Tìm kiếm các yêu cầu mở rộng

Khi trang được tải, bạn có để ý rằng việc tải logo DevTools chiếm khá nhiều thời gian không? Nó không chặn việc tải trang , nhưng nó lại làm cho trang xuất hiện chậm trong khi người dùng lại muốn các trang xuất hiện nhanh.

1.	Click Close  ![](https://images.viblo.asia/78d73cf1-b7b9-459a-b941-f8aa3bec792e.png)  để có thể nhìn thấy lại ô Request

2.	Double-click vào màn hình trên cùng bên trái.

3.	Nhấn phím mũi tên phải để quét qua bộ ảnh chụp màn hình.Thời gian bên dưới ảnh chụp màn hình cho biết thời điểm chụp màn hình.Ảnh chụp màn hình mất nhiều giây để tải. Điều đó có nghĩa là nó có thể quá lớn của một tập tin.

4.	Click vào bất kỳ đâu bên ngoài ảnh chụp màn hình để thu nhỏ nó.

5.	Di chuột qua Waterfall cho yêu cầu logo-1024px.png. Request dành phần lớn thời gian để tải hình ảnh. Điều này cho thấy hình ảnh quá lớn.

![](https://images.viblo.asia/c5833dbc-df90-402e-9181-30d231dc0697.png)

**Hình 5**. Waterfall cho logo-1024px.png

### Bước 4: Xác định các bản sửa lỗi trên trang được cập nhật

Giả sử bạn đã tạo 2 thay đổi sau đối với trang:

•	Chuyển kịch bản xuống dưới cùng của <body> và đánh dấu nó là *async* để tránh khỏi việc chặn tải trang.
    
•	Chuyển đổi logo sang dạng *SVG* để giảm kích cỡ của nó.

Giờ việc còn lại phải làm là kiểm tra trang được cập nhật để xác minh rằng các bản sửa lỗi của bạn có thực sự làm cho trang tải nhanh hơn không.

1.	Click vào [Open Fast Page](https://googlechrome.github.io/devtools-samples/network/gs/v2.html). Trang đã sửa sẽ mở được mở.

2.	Cài đặt DevTools giống như trước. Screenshots và cache disabling để trạng thái on và network throlling để là **Slow 3G**

3.	Tải lại trang. Trang lúc này sẽ tải nhanh hơn trước.

![](https://images.viblo.asia/877a7eaf-4727-4bf8-b588-36a5a44e378e.png)

**Hình 6**. Một ghi lại của tải trang sau khi áp dụng các sửa đổi. Một trang thường mất khoảng 12 giây để xuất hiện hoàn toàn thì giờ chỉ mất có 4 giây thôi.

**Lưu ý**: Mặc dù trang tải nhanh hơn nhưng nó vẫn không thể sử dụng trong vòng khoảng 8s. Đó là vì nó vẫn chạy script để treo thread chính của trang.

<br>
<br>
Link tham khảo:
https://developers.google.com/web/tools/chrome-devtools/#security
https://developers.google.com/web/tools/chrome-devtools/network-performance/