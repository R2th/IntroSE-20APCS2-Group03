Service Worker là một script chạy ở background của trình duyệt và độc lập với tương tác phía người dùng.

## Chúng ta có thể làm gì với Service Worker?
### Bạn có thể kiểm soát Network Traffic!
Bạn có thể quản lý tất cả network traffic của trang và can thiệp vào chúng. Ví dụ khi trang của bạn đang request file CSS, bạn có thể trả về plain text hoặc khi trang đang request file HTML bạn lại có thể trả về response là file png. :)

### Bạn có thể "Cache"!
Bạn có thể cache bất kỳ cặp request/response nào với Service Worker và Cache API. Sau đó bạn có thể access những nội dung offline (đã được cache) này bất cứ khi nào.


### Push Notifications!
Bạn có thể quản lý push notification với Service Worker và hiển thị message đến user.

### Bạn có thể tiếp tục!
Ngay cả khi kết nối Internet bị mất bạn vẫn có thể start bất kỳ process nào với Background Sync và Service Worker.

## Chúng ta không thể làm gì với Service Worker?
### Bạn không thể access object window!
Bạn không thể access window, do đó bạn cũng không thể quản lý DOM element. Tuy nhiên bạn vẫn có thể giao tiếp với window thông qua postMessage và quản lý process bạn muốn.

### Bạn không thể làm việc trên port 80!
Service Worker chỉ có thể làm việc trên giao thức HTTPS. Bạn cũng có thể làm việc trên localhost trong quá trình phát triển.

## Service Worker Debugging
Bạn có thể debug Service Worker bằng tool Service Worker trong Application tab của Chrome Developer Tools. Bạn có thể thấy các service worker đang trong trạng thái làm việc hay đang đợi ở đây.

Bạn có thể check box "Update on Reload" để update Service Worker mỗi khi refresh lại trang. Bạn có thể update với button "Update", delete với button "Unregister" hoặc stop với button "Stop".  Bạn cũng có thể sử dụng button "Push" để gửi Push Notification và button "Sync" để trigger sự kiện background sync.
![](https://images.viblo.asia/925b2a7f-5351-410c-92e9-22cf3ad1b8b3.png)

## Service Worker Lifecycle
Service Worker lifecycle có 3 giai đoạn: Registration, Installation và Activation.
![](https://images.viblo.asia/af88e9ce-ea0c-4e4c-b0c8-f290af0a36ca.png)

### Registration
Service worker là một property của object navigator của window. Bạn có thể dùng hàm "register" của serviceWorker để bắt đầu tiến trình registration.

Bạn có thể bắt đầu tiến trình registration với mỗi lần tải trang nếu cần. Vì tiến trình này không phải lúc nào cũng start ngay từ đầu. Nếu service worker mới tạo hay được update thì tiến trình installation sẽ bắt đầu.

Ví dụ về Service Worker Registration
![](https://images.viblo.asia/dbac43ba-2ff2-4ef9-9273-40de4c0512d4.png)

Hàm "register" được truyền vào một param là đường dẫn đến file service worker, như "sw.js" trong ví dụ. Hàm này cũng có thể truyền vào param thứ hai là một object để cấu hình.

### Installation
Ví dụ file "sw.js"
![](https://images.viblo.asia/40620893-51ce-4f68-803a-a07208f8798f.png)

Tiến trình installation chỉ được trigger khi file sw.js không tồn tại hoặc được update.
Đây là nơi lý tưởng để cache những nội dung tĩnh.

### Activation
Đây là sự kiện được trigger khi sự kiện "install" kết thúc. 
Đây là nơi lý tưởng để xóa những nội dung được cache nếu chúng có phiên bản mới hơn.
![](https://images.viblo.asia/09e737ba-87d9-4f34-bc0f-52c3bc0f6b01.png)

Một điều quan trọng cần nhớ rằng nếu bạn refresh trang khi mà sw.js được update bạn không thể access file được update đó. Bạn phải đóng tất cả các tab của trình duyệt và bắt đầu lại để update. Nếu bạn muốn quản lý tiến trình này từ code bạn có thể dùng hàm "self.skipWaiting()" trong file sw.js. Tiến trình "install" là nơi lý tưởng để thực hiện việc này.

### Fetch Event
Bạn có thể track và quản lý network traffic với event này. Bạn có thể kiểm tra cache có sẵn, quản lý "cache first" và "network first" requests và gửi về response bạn muốn.

Trong ví dụ dưới, nếu request location và current location giống nhau (nội dung tĩnh được request), ta gọi đó là "cacheFirst" còn nếu request external URL, ta gọi đó là "netwokFirst".

**CacheFirst**: Trong hàm này nếu request đã được cache trước đó thì cache response được gửi lại trang, nếu không thì là response từ network.

**NetworkFirst**: Trong hàm này trước tiên ta sẽ cố gắng để lấy và update response từ network. Nếu request thành công thì response sẽ được cache và gửi lại. Nhưng nếu request không thành công thì ta sẽ check nếu response đã được cache trước đó. Nếu đã cache thì gửi lại cache response nếu không thì nội dung trả về sẽ tùy thuộc vào bạn.

![](https://images.viblo.asia/632286c3-02ed-4621-8a40-8a34466ea5d4.png)

## Background Sync!
Background Sync là một Web API dùng để delay một tiến trình cho đến khi kết nối Internet ổn định. Chẳng hạn bạn có một email client. Bạn viết xong mail nhưng không để ý rằng kết nối mạng bị đứt và bạn click button gửi đi.

Hình bên dưới là quá trình gửi mail truyền thống. Nếu kết nối Internet bị đứt, chúng ta không thể gửi mail đến Mail Server.
[](https://images.viblo.asia/1844d5ca-865f-42c3-9917-06e7474662e8.png)

Chúng ta có thể cải thiện điều này
![](https://images.viblo.asia/1a3219d4-1af6-4efc-b6f9-2354ec808556.png)

1. Khi ta click button gửi đi, nội dung mail được lưu lại trong IndexedDB.
2. Background Sync registration
3. Nếu có kết nối Internet, tất cả nội dung email được đọc và gửi về Mail Server.
Nếu không có kết nối Internet, service worker chờ đến khi kết nối ổn định trở lại ngay cả khi đóng window sau đó gửi email đến Mail Server.

Code ví dụ cho quá trình trên.

Event Listener với Background Sync registration
![](https://images.viblo.asia/87c172d4-f753-4fcb-95e5-0c5938c2fe6f.png)

Event Listener trong sw.js
![](https://images.viblo.asia/0e584ab3-7f72-403d-ab58-c28cd6610079.png)

## Push Event
Đây là event xử lý push notification nhận được từ phía server. Bạn có thể apply bất kỳ method nào với data nhận được.
“Notification.requestPermission();” là hàm cần thiết để hiển thị notification đến user.
Nếu bạn không muốn hiện notification bạn không cần dòng này.

Trong ví dụ dưới đây, ta gửi về một object có thuộc tính "method" và "message". Nếu method là "pushMessage", ta hiện notification với thuộc tính "message".
![](https://images.viblo.asia/9f4f50dc-8811-43c3-8c7f-131d1d78e7ba.png)

Bạn có thể dụng Chrome Developer Tools để test push notification.
![](https://images.viblo.asia/a0f41637-f46c-43a8-b8f6-40f963264e3f.jpeg)

## Kết luận
Bạn có thể quản lý notification, background sync và cache với Service Worker API và api bên thứ ba như Cache API. Tuy vậy không phải tất cả trình duyệt phổ biến đã support nên bạn không thể support tất cả người dùng trình duyệt tính năng này. Hi vọng qua bài này, các bạn đã có được những kiến thức tổng quan liên quan đến Service Worker.

## Tham khảo
[What is a Service Worker?](https://medium.com/commencis/what-is-service-worker-4f8dc478f0b9)