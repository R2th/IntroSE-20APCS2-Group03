Hi ! Tiếp tục cho 2 phần trước ([P1](https://viblo.asia/p/thanh-toan-tren-ios-su-dung-in-app-purchase-part-1-3P0lPeW85ox), [P2](https://viblo.asia/p/thanh-toan-tren-ios-su-dung-in-app-purchase-part-2-gGJ59xzxlX2)) , phần cuối này mình sẽ thảo luận về flow thanh toán trên IOS sử dụng In-App Purchase làm sao để đảm bảo tính đúng đắn và an toàn cho người dùng và hệ thống.


Chúng ta hãy quan sát sơ đồ dưới đây :

![](https://images.viblo.asia/2c812486-0606-4314-bd41-1e3578725c28.png)

Sở đồ trên có lẽ là flow cơ bản nhất cho việc thanh toán. Tuy nhiên chúng ta có thể thấy một số điểm có thể gây ra rủi ro :

1. Ở bước số 6 nếu thanh toán thành công, tuy nhiên vì một nguyên nhân nào đó mà phía application không thể gửi request thông báo cho phía developer server (ví dụ như network disconnect, app crash,...) thì người dùng sẽ bị trừ tiền nhưng thực tế product đã mua lại không được cập nhật trên hệ thống
2. Nguy cơ bị hacker gửi request mạo danh ở bước số 6 là khá cao, họ không thanh toán với apple chúng ta không nhận được tiền nhưng vẫn gửi request thông báo đã thanh toán.


Ok, giờ chúng ta sẽ đi vào giải quyết các trường hợp phía trên. 

### Trường hợp thứ nhất : 

Vấn đề ở đây là đã thanh toán thành công nhưng lại xảy ra lỗi đúng thời điểm nhaỵ cảm khiến phía developer server không có dữ liệu để cập nhật thanh toán. Để giải quyết vấn đề này may mắn là apple cũng đã cung cấp một phuơng thức để giúp phía application có thể lấy lại lịch sử thông qua method **SKPaymentQueue.default().restoreCompletedTransactions()**

Như vậy các bạn cần hiển thị thêm một button để người cùng có thể restore completed transactions và đây cũng là yêu cầu từ apple giúp người dùng đảm bảo được sử dụng các dịch vụ mà họ đã bỏ tiền ra để mua. 


### Trường hợp thứ hai : 

Do trong sơ đồ basic phía trên không có môt phương thức đảm bảo dữ liệu từ phía client được xác thực, vì thế apple cũng đã xây dựng một cơ chế xác thực và đề xuất trong sơ đồ nâng cấp dưới đây.

![](https://images.viblo.asia/b07de975-4aa0-4734-a00f-ffae8f1a244e.png)


Trong flow này, chúng ta có thêm một bước xác giúp xác thực thông tin thanh toán của người dùng. 

Sau khi thanh toán thành công, phía application sẽ lấy data và gửi lên cho phía developer server, data này sẽ được xác thực bởi apple nên nó không thể giả mạo và qui trình thanh toán của chúng ta sẽ trở nên an toàn hơn. Các bạn có thể tham khảo chi tiết cách triển khai [ở đây](https://developer.apple.com/library/archive/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html)


### Kết.

Như vậy mình đã đi hết 3 phần để nói về việc thanh toán sử dụng inappurchase, hi vọng bài viết hữu ích với các bạn.

Thanks for watching ~