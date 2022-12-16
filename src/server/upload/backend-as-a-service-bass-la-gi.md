Thời gian gần đây có nhiều thời gian rảnh để học hành tìm hiểu này nọ, nên mình tập tành cột (code) dạo phía frontend (client-side). Đương nhiên để hoàn chỉnh 1 ứng dụng web, mình cần cột thêm cả phần backend (server-side) nữa, rồi sau đó tìm kiếm 1 con Server hoặc chí ít là 1 Plattform để deploy code lên dùng, nôm na là *release* ra sản phẩm cho end-user dùng được.

Ban đầu, như mọi lần mình dự định sẽ viết API bẳng Rails, sau đó phía frontend gọi API để sài. Ổn áp dưới local thì sẽ đẩy lên Heroku dùng thử xem sao. Tuy nhiên, đang rảnh mà ... nên thế nào mình lại đọc được bài về Backend as a Service (BAAS) trên [Medium](https://medium.com/@Alibaba_Cloud/introduction-to-backend-as-a-service-baas-e342f861d13d). Đọc xong thấy khỏi cần viết API nữa. Có thật là như vậy không? thì chúng ta thử tìm hiểu trong bài viết này của mình nhé :)

## IaaS, PaaS, SaaS là gì?
Hầu hết chúng ta đều đã ít nhiều biết đến các khái niệm cơ bản được sử dụng rộng rãi trong "vũ trụ" Điện toán đám mây (Cloud Computing) như IaaS, PaaS và SaaS. Dễ thấy về mặt "từ vựng" thì cả 3 khái niệm trên đều có chữ "As a Service" ở đằng sau.
```
IaaS: Infrastructure as a Service
PaaS: Platform as a Service
SaaS: Software as a Service
```
Hiểu nôm na thì "As a Service" nghĩa là "cung cấp dịch vụ", chúng ta dùng dịch vụ nào thì sẽ trả tiền tương ứng với dịch vụ đó, đi kèm với vế đầu chúng ta sẽ có các dịch vụ cụ thể như sau:

- IaaS: cung cấp dịch vụ cơ sở hạ tầng (infrastucture) như thuê máy chủ (server). Khách hàng thay vì bỏ 1 số tiền lớn để mua thì chỉ cần thuê và đóng tiền sử dụng hàng tháng mà thôi. Sau đó bạn muốn cài cắm gì cũng được, đẩy code gì lên cũng được. Đại diện ở nhóm này có thể kể đến các "ông lớn" như: Amazon Web Service (AWS), Microsoft Azure, Google Compute Engine (GCE) ...
- PaaS: cung cấp các nền tảng (platform) để phát triển ứng dụng, bạn chỉ cần đẩy code lên là sài được. Ví dụ như: Heroku, AWS Elastic Beanstalk, Engine Yard ...
- SaaS: cung cấp các phần mềm dưới dạng dịch vụ, khách hàng chỉ việc dùng dịch vụ mà không cần lo cái đặt, sao lưu dữ liệu ... Các dịch vụ thuộc nhóm này thì hết sức gần gũi và quen thuộc với end-user nhất, ví dụ như: Google Drive, Dropbox, Chatwork ...

Đa phần khi phát triển ứng dụng Web chúng ta thường dùng IaaS hoặc PaaS để deploy code lên dùng.

## BaaS là gì?
BaaS hoặc mBaaS hoặc Backen as a Service là 1 nền tảng giúp tự động hóa việc phát triển phần mềm phía Server Side, bao gồm cả việc cung cấp cơ sở hạ tầng điện toán đám mây. Do đó, khi sử dụng BaaS chúng ta chỉ cần tập trung vào phát triển phần front-end (client-side) mà thôi. 

BaaS đã bao gồm các tính năng như quản lý cơ sở dữ liệu, cung cấp APIs,  lưu trữ file, tích hợp mạng xã hội, push notifications, chat ...

1 vài công ty cung cấp dịch vụ Backend as a Service mà các bạn có thể tham khảo như:
- Back4App
- Parse
- Firebase
- Cloudkit
- Kinvey
- Backendless
- Kii
- Kumulos
- ...

> Từ đầu bài viết mình hay nhắc đến front-end và back-end trong qua trình phát triển phần mềm. Để các bạn dễ hình dung hơn mình sẽ giải thích đơn giản sự khác nhau giữa front-end và back-end như sau: phần user nhìn thấy và sử dụng được gọi là front-end, phần user không được nhìn thấy gọi là back-end. 2 phần này giao tiếp với nhau qua APIs.

![](https://images.viblo.asia/809f2fed-4ac7-471c-aa6b-cee7f62f521d.png)


## So sánh IaaS, PaaS và BaaS
IaaS, PaaS và BaaS thực sữ có quan hệ với nhau. Mỗi khi bạn chuyển từ IaaS sang PaaS và từ PaaS sang BaaS thì thực chất chỉ là bạn đang thêm/bớt các dịch vụ (hoặc các tính năng) vào ứng dụng của mình

Để có 1 cái nhìn đơn giản các bạn có thể theo dõi "công thức" và hỉnh ảnh dưới đây:
```
IAAS = Data Center + Servers + Storage +Networking
PAAS = IAAS + Deploy + Manage + Scale
BAAS = PAAS + Features to Build Backend
```

![](https://images.viblo.asia/44e01898-6d17-45e5-ae4f-8f214a2ba4e7.png)

## Những tính năng BaaS cung cấp
1 BaaS có thể cung cấp cho bạn đẩy đủ các tính năng để có thể deply mọi loại ứng dụng. Dưới đây là 1 vài tính năng phổ biến mà BaaS có thể cung cấp (có thể thay đổi tùy vào loại BaaS mà bạn đăng ký sử dụng)
- Quản lý cơ sở dữ liệu
- Xác thực User, bảo mật 2 lớp
- Tích hợp các mạng xã hội
- Xác thực email
- Push thông báo
- Định vị địa lý
- Logs
- Lưu trữ Files
- CDN và caches
- Infrastructure (Bảo mât, auto-scaling, tối ưu DB, backup data)

## Kiến trúc cơ bản của BaaS

Nói chung, 1 BaaS được chia thành ba lớp khác nhau:
- Lớp đầu tiên là nền tảng và chứa các máy chủ cơ sở dữ liệu. Một cụm cơ sở dữ liệu sẽ gồm ít nhất 2 máy chủ để sao chép dữ liệu và giúp vào/ra dữ liệu.
- Lớp thứ hai là cụm ứng dụng , nơi chứa nhiều máy chủ để xủ lý các yêu cầu. Số lượng máy chủ dao động trong suốt quá trình làm việc và sẽ tự động tính toán để auto-scaling  khi cần thiết.
- Lớp thứ ba sẽ kết nối các máy chủ ứng dụng với Internet và nó bao gồm các bộ cân bằng tải và CDNs.

![](https://images.viblo.asia/dd821554-961c-45b3-9bff-352522f9c2a8.png)

## Ưu và nhược của BaaS

#### Ưu điểm của BaaS
- Tăng tốc độ phát triển phần mềm
- Giảm kinh phí phát triển phần mềm
- Không cần Server, do đó bạn không cần quản lý hay có kiến thức về Infra

#### Nhược điểm của BaaS
- Ít linh hoạt  so với việc tự phát triển Backend
- Có thể không phù hợp với 1 vài nền tảng nhất định

> Cũng như bất kỳ công nghệ nào khác, BaaS tất nhiên cũng có ưu và nhược điểm nhất định, việc lựa chọn giữa BaaS hay IaaS/PaaS sẽ phụ thuộc vào rất nhiều yếu tố như: nhu cầu của công ty, của Business, kinh phí & thời gian phát triển ... Hy vọng bài viết này sẽ cho các bạn cái nhìn cơ bản về BaaS để từ đó có lựa chọn phù hợp với dự án của mình :D

## Tài liệu tham khảo

https://blog.back4app.com/2019/10/18/baas-vs-paas/
https://blog.back4app.com/2019/07/24/backend-as-a-service-baas/