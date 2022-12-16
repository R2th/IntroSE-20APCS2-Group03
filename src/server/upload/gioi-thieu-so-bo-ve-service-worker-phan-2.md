*Tổng hợp từ bài viết [Service Worker、はじめの一歩:第1回 Service Workerとは](https://app.codegrid.net/entry/2016-service-worker-1) và [Service Workerの基本とそれを使ってできること](https://qiita.com/yfujieda/items/f9e765ac9d89ba241154)*

# 1．Tính bảo mật của Service Worker
Nhằm mục đích bảo mật, với Service Worker, việc mỗi câu lệnh có thể access đến trang nào đều được quy định.
## 1.1. Service Worker chỉ hoạt động trên HTTPS hoặc Localhost
 Tính năng của Service Worker vô cùng mạnh mẽ. Việc sử dụng Cache để xử lý chức năng offline là một trong những ứng dụng tuyệt vời của Service Worker, tuy nhiên, sẽ thế nào nếu có người sử dụng Service Worker với mục đích xấu là ăn cắp thông tin request của web page? Để tránh vấn đề ấy, Service Worker chỉ có thể đăng ký trên trang web chạy trên HTTPS hoặc localhost. Nhờ đặc trưng này, việc thông tin của Service Worker không thể bị khai gian được đảm bảo.
## 1.2. Service Worker tuân thủ same-origin policy
Service Worker chỉ có hiệu lực đối với các trang web có cùng origin. 

Ví dụ, Service Worker được đăng ký trên https://www.pxgrid.com/ thì không hoạt động với trên trang web có địa chỉ https://app.codegrid.net/.

Origin đồng nhất có nghĩa là, trang web và service worker không chỉ cần có chung host, mà cả URI scheme và port cũng phải giống nhau. Vì vậy, các trường hợp sau cũng coi là không cùng origin:

* 2 trang web có URI scheme khác nhau: http://app.codegrid.net/  và https://app.codegrid.net/
* Port không đồng nhất: https://app.codegrid.net:80/ và https://app.codegrid.net:81/
## 1.3. Scope
Về cơ bản, Service worker không thể hoạt động trên trang web có đường dẫn thuộc tầng trên (thư mục mẹ) của file script đăng ký nó.

Nếu file script của Service worker là /sw.js thì nó có thể kiểm soát mọi trang web thuộc cùng origin.

Trường hợp file script Service Worker có đường dẫn /scope/sw.js thì chỉ các trang web thuộc cùng scope, ví dụ /scope/index.html hay /scope/foo/bar.html mới thuộc phạm vi khống chế của Service Worker mà thôi.

# 2. Đăng ký Service Worker
Để có thể sử dụng Service Worker, trước tiên, cần gọi hàm register() để đăng ký.

Việc Service worker đã được đăng ký hay chưa Browser sẽ kiểm tra giúp chúng ta nên ta không cần quan tâm đến nhiều đến việc này. 

```
navigator.serviceWorker.register('/service-worker.js');
```
Thứ quan trọng mà chúng ta cần chú ý tới khi đăng ký Service Worker là Scope.

Như trình bày ở mục trên, Scope, nói cách khác là các trang đặt dưới sự kiểm soát của Service worker, được quy định là tất cả các trang thuộc cùng tầng với file script Service Worker. 

Ngoài ra, ta cũng có thể chỉ rõ scope của Service Worker như sau:

```
navigator.serviceWorker.register('/service-worker.js', {scope: '/example'});
```
Với trường hợp trên, tất cả các file đặt dưới đường dẫn /example đều khống chế bởi Service Worker.

Khi Service Worker được đăng ký bởi register() hay được update, event onupdatefound phát sinh.

# 3. Install
Khi Service worker được cài đặt mới hoặc được update, status sẽ chuyển thành installing, khi ấy, event oninstall phát sinh.

Khi muốn thêm xử lý gì đó khi install Service Worker, ta có thể sử dụng code sau:

```
service-worker.js
self.addEventListener('install', (event) => {
// Xử lý muốn thực hiện
});
```
# 4. Update
Khi có sự khác biệt giữa bản hiện thời của Service worker trên browser và phiên bản Service worker sắp được tải về dù chỉ là 1byte, Service worker được phán đoán là đã được update. 

Nếu trang web chưa có Service worker, trạng thái sẽ lập tức chuyển từ installing sang active. Trường hợp trang web đã có Service Worker từ trước đó, status sẽ chuyển thành waiting.
 
 ![](https://images.viblo.asia/9622fb7b-2817-4df6-8c28-e16a31e09d09.png)

Lý do Service Worker mới không lập tức chuyển sang trạng thái active là vì, nếu lập tực apply phiên bản mới với data mà phiên bản cũ đang control thì trang web có thể bị lỗi. 
Sau đó, khi trang web đã ở trạng thái an toàn để update (Ví dụ: khi tất cả tab của trang web đó đều đã đóng), trạng thái của Service Worker sẽ chuyển từ waiting sang active.

*Bài viết xin dừng lại tại đây, mong rằng bài viết này đã đem đến cho các bạn những thông tin cơ bản nhất về Service Worker*