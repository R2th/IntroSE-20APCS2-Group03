# Cloud Functions for Firebase

Cloud Functions Firebase cho phép bạn chạy code backend tự động để  phản hồi tới các sự kiện được kích hoạt bởi tính năng của Firebase và HTTPS request. Code của bạn được lưu trữ trong mây của Google và chạy trong một môi trường được quản lý. Bạn không cần quản lý và mở rộng các máy chủ.

# Các khả năng chính 
### Các nền tảng firebase được tích hợp:

Các functions bạn viết có thể phản hồi các sự kiện do các features Firebase và Google Cloud khác tạo ra:
> Cloud Firestore Triggers
> 
> Realtime Database Triggers
> 
> Firebase Authentication Triggers
> 
> Google Analytics for Firebase Triggers
> 
> Crashlytics Triggers
> 
> Cloud Storage Triggers
> 
> Cloud Pub/Sub Triggers
> 
> HTTP Triggers
> 

### Không cần bảo trì
Deploy code JavaScript hoặc TypeScript cho các máy chủ của firbase bằng lệnh từ command line. Sau đó, Firebase tự động tăng quy mô tài nguyên máy tính để phù hợp với các patterns sử dụng với người dùng của bạn. Không cần phải lo lắng về thông tin đăng nhập, cấu hình máy chủ, cung cấp máy chủ mới...

### Giữ logic của bạn riêng tư và an toàn
Trong nhiều trường hợp, các developers muốn kiểm soát logic ứng dụng trên máy chủ để tránh giả mạo phía client. Ngoài ra, đôi khi không muốn cho phép mã đó được thiết kế ngược. Các Cloud Functions được cách ly hoàn toàn với client, vì vậy bạn có thể chắc chắn rằng nó là riêng tư và luôn thực hiện chính xác những gì bạn muốn.

# Nó làm việc như thế  nào?

Sau khi bạn viết và triển khai một function, các máy chủ của Google sẽ bắt đầu quản lý function ngay lập tức. Bạn có thể kích hoạt chức năng trực tiếp với HTTP request hoặc với  background functions, máy chủ của Google sẽ lắng nghe các sự kiện và chạy chức năng khi nó được kích hoạt.

Khi lượng load tăng hoặc giảm, Google sẽ nhanh chóng mở rộng số lượng các máy chủ ảo cần thiết để chạy function của bạn. Mỗi function chạy độc lập, trong môi trường riêng với cấu hình riêng của nó.
 
 
**Vòng đời của một background function**

> 1.developer viết code cho một function mới, chọn platform kích hoạt sự kiện (chẳng hạn như Realtime Database) và định nghĩa các điều kiện theo đó function sẽ thực thi.
> 
> 2.developer deploy function và Firebase kết nối nó với platform đã chọn.
> 
> 3.Khi platform kích hoạt event giống với các điều kiện của function, code sẽ được gọi.
> 
> 4.Nếu function bận xử lý nhiều event, Google sẽ tạo thêm nhiều phiên bản để xử lý công việc nhanh hơn. Nếu function "rãnh rỗi" các phiên bản sẽ được xóa.
> 
> 5.Khi developer update function bằng cách deploy code đã được cập nhật, tất cả các phiên bản cũ sẽ được xóa và được thay thế bằng các phiên bản mới.
> 
> 6.Khi developer xóa function, tất cả các phiên bản sẽ được xóa và kết nối giữa chức năng và platform event sẽ bị xóa.

Ngoài việc lắng nghe các sự kiện từ background function, bạn có thể gọi trực tiếp các function bằng HTTP request hoặc call từ app ( viết code ở app để call function)

# Bắt đầu: viết và deploy function đầu tiên

Để bắt đầu với Cloud Functions:

Setup nodejs and the firebase CLI:
Bạn cần node js môi trường để viết functions và firebase CLI (yêu cầu node js và npm) để deploy các function để chạy Cloud Functions.
Cloud Functions có thể chạy trên node version 6 or version 8. Nếu bạn có các function được xây dựng trên node v6, bạn có thể tiếp tục sử dụng phiên bản đó (v6 là mặc định).

Sau khi bạn cài đặt node và npm hãy cài đặt firebase CLI qua npm:

```
npm install -g firebase-tools
```

# Cài đặt Firebase SDK for Cloud Functions

chạy command sau để login thông qua trình duyệt và xác thực firebase tool:
```
firebase login
```


chạy command sau để cài đặt function firebase cho project của bạn:

```
firebase init functions
```


Cấu trúc thư mục sau khi cài đặt như sau
```
myproject
 +- .firebaserc    #hidden file giúp bạn chuyển đổi nhanh chóng giữa các project
 |                 
 |
 +- firebase.json  # Mô tả các thuộc tính cho porject 
 |
 +- functions/     # thư mục chứa function code
      |
      +- package.json  # npm package file khai báo các dependence dùng cho Cloud Functions
      |
      +- index.js      # file code chính của Cloud Functions
      |
      +- node_modules/ # thư mục chứa các source dependence đã đc cài đặt (khai báo trong package.json)
```

thử xây dựng endpoint helloWorld function (code ở file index.js):
```
exports.helloWorldTest = functions.https.onRequest((request, response) => {
 response.send("<p>Hello from Firebase!</p>");
});

```

onRequest(non-null express.Request, non-null express.Response) tham số 1 là request gửi lên, 2 là response trả về 
([Request](https://expressjs.com/en/api.html#req),[Response](https://expressjs.com/en/api.html#res))

event được chạy mỗi lần khi truy cập URL HTTP

**Để deploy function ta sử dụng**

```
firebase deploy --only functions
```

kết quả sau khi chạy nó sẽ như thế này
![](https://images.viblo.asia/1b8b36f3-70f3-4f02-a56f-cd2abbfb0c2b.png)

function url chính là endpoint để truy cập tới function ta vừa viết.. paste lên trình duyệt ta sẽ thấy kết quả như thế này
![](https://images.viblo.asia/b6069cc7-a4b4-44d4-8d61-266a0c38fa9e.png)

# Lời kết
Trên đây là những kiển thức cơ bản về Cloud Functions Firebase. Bài viết của mình còn nhiều thiếu sót. Mong các bạn góp ý thêm cho mình. Cảm ơn sự quan tâm, theo dõi của các bạn.

Tài liệu tham khảo: https://firebase.google.com/docs/functions/