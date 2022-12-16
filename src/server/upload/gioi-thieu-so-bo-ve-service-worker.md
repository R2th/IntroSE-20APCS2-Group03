*Dịch từ bài viết [「Service Worker、はじめの一歩：第1回 Service Workerとは」](https://app.codegrid.net/entry/2016-service-worker-1)- Giới thiệu sơ bộ về Service Worker.*

# 1. Lời mở đầu:
Đối tượng được giới thiệu trong bài viết lần này là Service Worker, là môi trường JavaScipt hoạt động độc lập. chạy ngầm trong trang Web. Khi sử dụng Service Workder, trang web có thể thực hiện các chức năng mà trước kia không thể làm được, mà ví dụ tiêu biểu và cơ bản nhất là chức năng offline.

Hiện nay, Service Workder được hỗ trợ cho nhiều trình duyệt, từ Chrome, Firefox cho đến Opera, Safari, Edge. 

Bên cạnh đó, chắc các bạn đã nghe đến khái niệm Progressive Web Apps (PWA). Nói một cách đơn giản, đây là ứng dụng web được tạo dựng dựa trên tiền đề "sản phẩm sẽ hoạt động giống như native app". PWA không phải nhằm chỉ một chức năng mới nào đó, mà chỉ đơn thuần nhằm chỉ tập hợp các chức năng của browser mà thôi.

Để tạo lập một PWA, Service Worker giữ một vị trí vô cùng quan trọng. Nó được chú ý như một kỹ thuật nhằm nâng cao trải nghiệm với trang web.
# 2. Service Worker là gì?
Như đã nêu trên, Service Worker là một môi trường JavaScript chạy ở background của trang web. Sau khi được install từ trang web, service worker sẽ hoạt động trong một life cycle độc lập với trang web. Ngay cả ở trạng thái offline hay tab hiển thị trang web đã đóng, Serice Workder vẫn sẽ hoạt động khi cần thiết.

Một số ví dụ về những chức năng có thể thực hiện được nhờ Service Worker có thể kể đến như sau:

* Khi trang web gửi request, service worker sẽ trả về dữ liệu cached, nhờ đó, trang web có thể hoạt động cả ở trạng thái offline.
* Ngay cả khi tab web không mở, service worker vẫn sẽ hoạt động ngầm, nhờ đó đảm bảo thông tin nhận về là thông tin mới nhất.
* Người dùng có thể nhận được thông báo do trang web gửi tới (push notification).

Tuy nhiên, những chức năng này không thể được thiết lập chỉ với Service Worker. Fetch API, Cache API, Push API được thêm lên phần "đất nền" Service Worker, nhờ đó, các chức năng trên được thực hiện. 

Xin nhấn mạnh lại một lần nữa, Service Worker chỉ là "một môi trường JavaScript" độc lập và chạy ở background của trang Web. Tuy nhiên, nếu không có Service Worker, nhiều chức năng không thể thực hiện được, nói cách khác, Service Worker giúp mở rộng danh sách các chức năng có thể được áp dụng để nâng cao trải nghiệm của trang Web.

# 3. "Vòng đời" của Service Worker
## 3.1. Vòng đời (life cycle) là gì?
Service worker hoạt động trong một vòng đời độc lập so với trang web. "Vòng đời" trong ngữ cảnh thông thường được định nghĩa là "quá trình kể từ khi sinh vật được sinh ra cho tới lúc chết" hay "quá trình kể từ khi một sản phẩm được phát hành cho đến khi có sự biến động trong doanh số". Trong lập trình, life cycle được hiều là "chu kỳ, những trạng thái phát sinh kể từ khi chương trình khởi động cho đến khi chương trình đó kết thúc". Đối với trang web, đó là quá trình kể từ khi trang web được mở cho đến khi người dùng đóng tab trình duyệt. Đối với một đoạn Code JavaScript, đó là chu kỳ kể từ lúc một instance được khởi tạo cho đến khi instance đó bị huỷ bỏ.

Trong vòng đời ấy, có nhiều event phát sinh, ví dụ như: người dùng mở trang web, người dùng di chuyển sang màn hình khác, người dùng đóng trang web. Thông thường, các developer sẽ viết code xử lý từng event như vậy để tạo nên chương trình.

Service Worker cũng có riêng cho mình một life cycle, trong vòng đời của life cycle cũng có các event khác nhau phát sinh. Không giống như trang Web hay các DOM thuộc trang Web ấy, Service Worker không dễ để có thể phán đoàn trạng thái dựa trên quan sát bằng mắt thường. Vì vậy, hãy cùng tìm hiểu vòng với và các event của Service Worker nhằm nắm được bức tranh toàn thể hơn về Service Worker.

## 3.2. Service Worker có 6 trạng thái
Trong phần tiếp theo này, tôi sẽ nói về vòng đời của Service Worker, với 6 trạng thái: parsed, installing, installed, activating, activated, redundant.
### parsed
Parsed là trạng thái sơ khời của serivice worker. Đây là trạng thái Service Worker vẫn chưa được cài đặt, chỉ có đoạn script gọi service worker được load về browser. Thông thường, gần như ngay lập tức service worker sẽ chuyển sang trạng thái tiếp theo. Vì vậy, người ta thường ít ý thức về trạng thái này.
### installing
installing, giống như tên gọi của nó, là trạng thái Service Worker ĐANG được cài đặt. Khi Service Worker được cài đặt mới hay được update, ta đều quan sát thấy status chuyển sang trạng thái này.

Khi này, event install phát sinh, ta cũng có thể handle event này bằng Javascript trong trường hợp cần thiết, mà một ví dụ là cấu trúc cache.

Khi Service Worker đã được cài đặt và không upate, trạng thái của service worker sẽ trực tiếp chuyển tới activated.
### installed
installed là trạng thái khi quá trình install ở trên kết thúc thuận lợi. Ở thời điểm này, Service Worker đã được cài đặt thành công nhưng vẫn chưa active.

Trường hợp Service Worker được cài đặt mới, trạng thái sẽ gần như ngay lập tức chuyển sang activating. 

Nếu Service Worker đã được cài đặt trước đó và đang update, Service Worker cũ vẫn đang chạy và kiểm soát hoạt động của trang Web và trạng thái của Service Worker cũ sẽ ngưng lại ở status này. Để active Service Worker mới, người dùng cần rời khỏi trang web hiện thời, chờ tới khi browser giải phóng Service Worker cũ một cách an toàn, access trang web một lần nữa để trạng thái của Service Worker đổi sang activating. 

Trạng thái này trong tài liệu online còn được gọi là trạng thái waiting.

### activating
Trạng thái kế tiếp của installed là activating. Như đã nhắc ở trên, nếu Service Worker được cài đặt mới, sau khi cài đặt thành công, trạng thái sẽ lập tức chuyển sang activating. Trong trường hợp service worker được upadte, đây là trạng thái khi phiên bản mới được active thay cho phiên bản cũ.

Giống như installing, ở trạng thái activating, event activate phát sinh. Ta có thể dùng JavaScript để handle event này nếu cần. (Ví dụ: xoá cache cũ)

### activated
Đây là trạng thái Service Worker đã active và control trang web thành công.

Ở trạng thái này, Service Worker có các event như event message - nhận tin nhắn từ trang web, event fetch đáp lại request từ trang web.

### redundant
Với một trong các lý do sau, Service Worker chuyển sang trạng thái vô hiệu hoá
* Có lỗi phát sinh trong quá tình cài đặt (install)
* Có lỗi phát sinh trong quá trình active
* Service Worker mới được thiết lập thay thế cho Service Worker cũ.

*(lược phần thuyết minh về tính bảo mật của Service Worker)*
# 4. Tổng kết
Service Worker là kỹ thuật giúp cho các chức năng trước kia không thể thực hiện được trở nên khả dụng. Spec của Service Worker được công bố lần đầu năm 2014 và ngày càng được hoàn thiện, tích hợp cho nhiều browser hơn và dế sử dụng hơn.

Trên đây là những giới thiệu cơ bản về Service Worker, bài viết lần sau sẽ là nhưng thông tin về tính bảo mật của Service Worker cũng như cách install tính năng này.