Hiện nay, thị trường phát triển web application ngày càng trở nên phổ biến do có những ngôn ngữ web phát triển rất mạnh mẽ như: javascript (nodejs), php (laravel, cakephp), ruby (ruby on rails),... Ở bài viết này tôi xin phép được đi sâu vào ngôn ngữ javascript. Chúng ta thường nghe đến những khái niệm như npm, yarn nhưng thực sự chúng ta đã hiểu rõ về nó ? Tôi xin phép trình bày với các bạn lần lượt từng khái niệm này 1 cách rõ ràng nhất để chúng ta có cái nhìn tổng quan nhất nhé!

# 1.NPM
## 1.1.NPM là gì?

![ảnh.png](https://images.viblo.asia/4aedffb6-903b-483a-9764-6afe9fe19ab0.png)

**NPM là gì?** – NPM là viết tắt của Node package manager là một công cụ tạo và quản lý các thư viện lập trình Javascript cho Node.js. Trong cộng đồng Javascript, các lập trình viên chia sẻ hàng trăm nghìn các thư viện với các đoạn code đã thực hiện sẵn một chức năng nào đó. Nó giúp cho các dự án mới tránh phải viết lại các thành phần cơ bản, các thư viện lập trình hay thậm chí cả các framework.

Nếu trong project của bạn cần cài đặt cả chục scripts từ các thư viện khác nhau. Điều đó tương đương với việc bạn phải tải về source của chục thư viện, include chúng vào trong source của bạn. Một công việc tốn khá nhiều thời gian khủng khiếp.

## 1.2.Công dụng:
Với *NPM* , công việc sẽ đơn giản đi rất nhiều, chúng giúp bạn thực hiện việc quản lý đơn giản hơn rất nhiều. Các thư viện đều có sẵn trên npm, bạn chạy một dòng lệnh để tải về và dễ dàng include chúng hơn.

Mỗi đoạn code này có thể phụ thuộc vào rất nhiều các mã nguồn mở khác, thật may mắn khi các công cụ quản lý thư viện ra đời, nếu không sẽ mất rất nhiều công sức trong việc quản lý các thư viện này.

Cộng đồng sử dụng npm rất lớn, hàng nghìn các thư viện được phát hành, hỗ trợ Javascript ES6, React, Express, Grunt, Duo… Hiện nay cũng đã xuất hiện thêm Yarn một công cụ tương tự npm, được Facebook phát triển với nhiều tính năng vượt trội có khả năng sẽ thay thế npm.
Nếu như bạn từng code PHP thì sẽ biết Composer là công cụ quản lý thư viện của nó, tương tự như NPM là công cụ quản lý thư viện Javascript.

## 1.3.Tổng hợp câu lệnh:

Dưới đây là tổng hợp một số câu lệnh cơ bản khi làm việc với NPM cũng như các dự án NodeJS:

* Kiểm tra phiên bản cài đặt NPM
![ảnh.png](https://images.viblo.asia/478abaf5-63c2-4306-8f59-bae86cd62cb5.png)

* Cập nhật NPM lên phiên bản mới nhất
![ảnh.png](https://images.viblo.asia/1bddd391-11b3-4324-aac3-3411ebe2a1e0.png)

* Khởi tạo một dự án NodeJS
![ảnh.png](https://images.viblo.asia/ac471273-f5d0-4413-9f27-b22072fcdb4a.png)

* Tìm kiếm các thư viện
![ảnh.png](https://images.viblo.asia/ddbbb172-41dd-40a1-8a77-8743ca591ea4.png)

* Gỡ bỏ mọi thư viện đã cài đặt
![ảnh.png](https://images.viblo.asia/79b5ac57-ecfb-41e5-bf4e-b510bef59982.png)

* Cài đặt gói thư viện bất kỳ có trên https://www.npmjs.com
    * Package sẽ được thêm vào dependencies trong file package.json
    ![ảnh.png](https://images.viblo.asia/dbdd2021-4cf6-414c-bf29-58d93332c171.png)
    * Package sẽ được thêm vào devDependencies trong file package.json
    ![ảnh.png](https://images.viblo.asia/56d623de-2636-4332-b152-6b8f6ee26cc0.png)
    * Package sẽ được thêm vào optionalDependencies trong file package.json
    ![ảnh.png](https://images.viblo.asia/1d5414ab-cea3-42d0-b8fe-add068833897.png)
* Cài đặt package từ Github mà không có trên https://www.npmjs.com
![ảnh.png](https://images.viblo.asia/e367ba1f-fe28-4bd9-a606-da18ae882584.png)
* Cài đặt package từ GitLab mà không có trên https://www.npmjs.com
![ảnh.png](https://images.viblo.asia/752c6fb6-ae99-4524-a386-ee7065da6bcc.png)
* Cài đặt từ Git
![ảnh.png](https://images.viblo.asia/76b7e2b5-20a4-4032-bde6-007d4504b61b.png)
* Cài đặt package theo kiểu global
![ảnh.png](https://images.viblo.asia/b98f2109-4252-478e-bfa8-2488866f3478.png)
* Cài đặt tất cả các packages được liệt kê trong file package.json
![ảnh.png](https://images.viblo.asia/841c3c52-e7b7-4713-bff2-b32363b10611.png)
* Cập nhật production packages
![ảnh.png](https://images.viblo.asia/a10a7e39-4341-4bfd-896a-18c2b48b9768.png)
* Cập nhật dev packages
![ảnh.png](https://images.viblo.asia/634b94f0-90f4-4ac4-86c4-3e11b5edbfab.png)
* Cập nhật global packages
![ảnh.png](https://images.viblo.asia/c0078ecd-9899-4dad-8361-e95557026237.png)
* Cập nhật riêng lẻ từng package theo tên
![ảnh.png](https://images.viblo.asia/cd0b807c-31b2-424a-a951-421a24313b7c.png)
* Liệt kê tất cả các packages
![ảnh.png](https://images.viblo.asia/2a768ce9-a28a-40db-80ad-1a7192baeeec.png)
* Kiểm tra outdated packages
![ảnh.png](https://images.viblo.asia/dbccaa18-a6a0-468b-8228-35d975b25bcf.png)
* Chạy các câu lệnh cài đặt trong package.json
![ảnh.png](https://images.viblo.asia/e7fa4554-922c-4b81-9eb6-2435498440bb.png)
* Một số câu lệnh có sẵn mà NPM tự hiểu
![ảnh.png](https://images.viblo.asia/0d284d2d-e6dd-4848-ad10-95991461e5df.png)
* Liệt kê tất cả các cấu hình cho NPM
![ảnh.png](https://images.viblo.asia/88604192-c528-4d3c-bd18-d2036e7777e6.png)

## 1.3.Rút ngắn câu lệnh
![ảnh.png](https://images.viblo.asia/6d1963af-a972-4049-b79b-73e45fc37d8a.png)

# 2.Yarn
## 2.1. Yarn là gì?
![ảnh.png](https://images.viblo.asia/8a8499ca-cff6-4c85-8b06-aef97203886e.png)

YARN là công cụ quản lý thư viện javascript mã nguồn mở tốc độ cao, tin cậy và bảo mật nhằm thay thế NPM (Node Package Management). Được hình thành bởi các kỹ sư Facebook, Google, Exponent và Tilde, và đã được sử dụng thực tế mức Production tại các công ty trên. 

Đây là dự án bắt đầu được viết từ tháng 1/2016, sau quãng thời gian thử nghiệm và hoàn thiện đã được mở ra thành mã nguồn mở, và thật không có gì ngạc nhiên khi với những tính năng nổi trội vượt bậc đã có 10.000 stars chỉ trong 1 ngày tại Github. Chứng tỏ sự thành công và là tín hiệu thay thế rõ ràng NPM.

## 2.2. Đặc trưng
**Tốc độ**: YARN sẽ tạo cache cho tất cả các gói đã được tải về, và tải đồng thời nhiều gói cùng lúc nên tốc độ download rất nhanh.

**Tin cậy**: sử dụng tập tin lock (tương tự composer) với format chi tiết nhưng ngắn gọn, đảm bảo tính nhất quán khi cài đặt các gói giữa các hệ thống (ví dụ máy dev và máy chủ)

**Bảo mật**: sử dụng checksum để đảm bảo tính nguyên vẹn của code trước khi nó được thực thi.

Sau khi thử nghiệm thì mình thấy quả thật tốc độ quá tốt, nhất là đối với những bạn sử dụng React Native mà bị lỗi 4968 (lỗi này thường phải xóa thư mục node_modules và cài lại) thì giống như địa ngục vậy, thường mất hơn 5 phút :(. Thật ra thì npm cũng có cache, nhưng kiến trúc, cách thức của 2 bên khác nhau và YARN nổi trội hơn.

## 2.3.Tính năng
**Offline mode**: khi đã tải về, YARN sẽ cache lại và khi có thể cài đặt lại không cần internet.

**Deterministic**: các gói thư viện sẽ được cài đặt nhất quán cho dù thứ tự cài đặt khác nhau cho tất cả các máy

**Network Performance**: sử dụng hiệu quả hàng đợi các request và tránh waterfall các request để tối ưu tốc độ mạng.

**Multiple Registries**: cài đặt các gói từ các registries như Bower hay NPM đều đảm bảo workflow giống nhau.

**Network Resilience**: nếu một request bị fail thì nó không làm cho tiến trình bị dừng lại, khác với npm là nếu npm bị lỗi thì bị dừng lại., không những vậy mà còn có khả năng cố gắng thử lại.

**Flat Mode**: giải quyết việc không đồng nhất phiên bản của các gói thành 1 gói để tránh tạo trùng lặp

## 2.4.Cài đặt
Có 2 cách để cài đặt Yarn:
* Cách thứ nhất, chúng ta có thể cài đặt Yarn thông qua npm (giống như việc sử dụng IE để cài Google Chrome hay Firefox vậy, lol).
![ảnh.png](https://images.viblo.asia/8c7d6ef4-b3d8-4781-be1f-576cf640b1bb.png)

Cách này sẽ cài đặt yarn globally, nó sẽ luôn sẵn có từ terminal của bạn.
* Các thứ hai đó là vào trang chủ của yarn, download bộ cài đặt về và cài đặt.

**Chú ý: Cả hai cách đều yêu cầu bạn phải cài đặt NodeJS trước đó rồi.**

## 2.5.Tổng hợp câu lệnh
* Tạo dự án mới

![ảnh.png](https://images.viblo.asia/7ee1df47-6c52-4228-b2d4-c663c858b6c2.png)
* Thêm các thư viện

![ảnh.png](https://images.viblo.asia/286732b3-931f-4848-8d7c-333d483f9c05.png)

Khi bạn sử dụng lệnh “yarn add”, yarn sẽ tự động thêm vào package.json
* Cập nhật

![ảnh.png](https://images.viblo.asia/e36fa769-1c75-4494-997e-b6946eff3c7c.png)
* Xóa

![ảnh.png](https://images.viblo.asia/bb2d1070-efc2-4a74-b535-5de9795b4252.png)
* Cài đặt tất cả các gói trong dự án
![ảnh.png](https://images.viblo.asia/fd1c428a-cf72-4a42-b644-9a9e816d3537.png)

Do YARN cũng sử dụng package.json nên nếu dự án đã có thì việc sử dụng YARN cũng không khác mấy, chỉ cần bạn xóa tất cả các thư mục trong node_modules, sau đó dùng yarn để cài lại.

Vậy là tôi đã tổng hợp xong các khái niệm mà mỗi dev chúng ta cần phải nắm rõ để thuận lợi hơn trong việc lập trình, cảm ơn các bạn đã theo dõi!