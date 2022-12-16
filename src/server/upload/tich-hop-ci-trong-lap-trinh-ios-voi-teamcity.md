## 1. Giới thiệu.
Với nhiều người, khái niệm Continuous Integration (CI) là một cái gì đó nghe rất cao siêu và hoành tráng.
Tuy nhiên hiểu một cách đơn giản nó là việc tích hợp code của mọi người và tự động build, nó giúp đảm bảo code có thể chạy hay không và đảm bảo chạy đc các unit test.

Mô hình của CI như sau:

![](https://images.viblo.asia/b39747c4-de7b-46ba-abd1-420fb923d14a.jpg)

## 2. Các định nghĩa cơ bản.
* Version Control System (VCS): hệ thống được sử dụng để theo dõi các thay đổi và kiểm soát phiên bản. Ví dụ như: Git, BitBucket.
* CI Server: Máy chủ giám sát VCS và thông báo cái gì và khi nào sẽ chạy.
* Build Agent: Máy để build và test theo lệnh của CI server
* Package manager: 
* Dependency resolution: là công nghệ cung cấp cách cài đặt, quản lý và cập nhật các thư viện của bên thứ ba theo chương trình
* GUID/UUID: là một số 128 bit được đảm bảo là duy nhất. 

## 3. Các điều bạn cần có?
* Một server chạy CI, có thể chạy trên nhiều hệ điều hành khác nhau hoặc có thể bạn chạy localhost.
* Một build agent, cần chạy MacOS. Nên có hiệu năng cao và cần set chế độ NoSleep cũng có thể là máy chủ CI
* Xcode cần phải được cài đặt trên build agent đó. 
* Trong bài viết này mình sẽ sử dụng TeamCity, bạn có thể xem nhiều công cụ hỗ trợ chạy CI khác.

## 4. Các bước cài đặt
### Cài đặt TeamCity:
* Trước hết bạn cần cài đặt[ JDK 1.8](https://www.oracle.com/java/technologies/javase/javase-jdk8-downloads.html)
* Tiếp đến hãy tải TeamCity từ [trang chủ](https://www.jetbrains.com/teamcity/download/#).
* Mở Terminal và cd tới thư mục bin trong thư mục TeamCity vừa tải về
* Để chạy TeamCity server chúng ta sử dụng lệnh `./runAll.sh start`  và để dừng server `./runAll.sh stop kill`
![](https://images.viblo.asia/f3530490-928b-49ca-8de5-26a4e4856b25.png)

* Bạn hãy run server ci và truy cập vào `localhost:8111` để tiếp tục việc cài đặt

![](https://images.viblo.asia/9e4f4262-a8ea-43fa-8733-7b11ca8dd88a.png)
* Hãy chờ giây lát để quá trình init hoàn thành. Sau đó chúng ta sẽ khởi tạo account
![](https://images.viblo.asia/2433374b-bc64-47ad-9247-6834bb0d35ae.png)

 Trên là các bước cơ bản ban đầu. Tiếp theo chúng ta cần khởi tạo 1 project có Unit Test và đẩy nó lên 1 repo Github ( bạn có thể sử dụng các loại lưu trữ source code khác).
 
 ### Khởi tạo Xcode project.
 * Tạo 1 repo trên Github để quản lý source code demo.
 ![](https://images.viblo.asia/dcccbcb8-0ede-4626-9242-c53dca0019b1.png)

 * Tạo 1 project demo có cách unit test và đẩy lên Github.

### Config các dependency
#### Gem
 * Trong project chúng ta cần cài đặt Gem. công cũ để hỗ trợ cài đặt các dependency cần thiết cho quá trình chạy. Để cài đặt Gem chúng ta sử dụng lệnh trên Terminal như sau: `Sudo gem install bundle`.
 * Tiến hành cài đặt GemFile để định nghĩa các dependency: `Bundle init` và chạy `bundle install` để install chúng
 * Config Gemfile:
![](https://images.viblo.asia/de3eb9ff-4bfd-434e-89f1-b39c64f4d0bb.png)

* Trong Gemfile chúng ta có định nghĩa Fastlane, nó hỗ trợ việc chạy các lệnh js để tiến hành build & test

### Fastlane
* Để khởi tạo fastlane chúng ta chạy lệnh `fastlane init` sẽ có 4 lựa chọn cách cài đặt. ở đây mình sẽ dùng cách manual
![](https://images.viblo.asia/a908b2dd-d7a3-4b8d-92a3-586e14dbd9d3.png)
* Sau khi chạy xong sẽ có 1 thư mục fastlane đc sinh ra trong project của bạn với 2 file như sau :
 ![](https://images.viblo.asia/06f85752-7b67-4815-9f93-268da3bd4ea6.png)
 * Config FastFile: trong đây bạn sẽ viết các câu lệnh js để thực hiện các bước mà chúng ta sẽ chạy
 ![](https://images.viblo.asia/1719c87a-9d14-4861-b27f-9417cf7e00a3.png)
* Trong file này chúng ta sẽ định nghĩa chạy các pod và có hàm để build và test. Bạn có thể tuỳ chỉnh theo mong muốn. 

Sau khi đã chuẩn bị đầy đủ về project và các dependency thì hãy đẩy tất cả lên github và tiếp tục config với TeamCity.

### Config TeamCity.
* Khởi tạo project, điền các thông tin tương ứng.
![](https://images.viblo.asia/f29f1086-3f5e-42ec-9367-373bb72bba2a.png)
* Sau khi khởi tạo xong project chúng ta sẽ tiếp tục config các bước build step. Lựa chọn build step dạng Command Line. Chúng ta sẽ có 2 bước cơ bản: Cài đặt các dependency và  build & test
![](https://images.viblo.asia/0043f63b-ea87-41cd-b400-2339c7c8f9e6.png)

![](https://images.viblo.asia/6ca939e4-0f65-4cd5-a659-1e4b7d974fae.png)

* Config VCS: Chọn mục Version Control Settings ở bên trái và chọn vào VSC mới khởi tạo.
![](https://images.viblo.asia/ad855562-8d10-4280-b5d7-9ff6aef5fe44.png)

* Hãy thêm đoạn mã `+:refs/pull/*/head` như trong hình để trigger khi bạn đẩy pull request nhé 
* Config thêm các feature: các công cụ hỗ trợ thêm, ở đây mình sử dụng 3 công cụ
![](https://images.viblo.asia/4120647b-c04c-4c13-9acf-ecbd6e76f96d.png)
    * Commit status publisher: hiển thị trạng thái của PR
    * XML report processing: Lưu log lại quá trình chạy
    * Build files clean: Xoá các file đã tạo chuẩn bị cho 1 lần chạy mới.
    
### Config Agents:
* Khi bạn chạy local thì teamcity mặc định sẽ coi máy bạn là 1 default agent. Bạn có thể trực tiếp chạy trên đó hoặc có thể add thêm các máy khác làm agent trong mục Agent push
![](https://images.viblo.asia/6577c137-e15d-4dcf-ab54-dbdf18461c8b.png)


## Run.
Khi đã chuẩn bị đủ các điều ở trên, giờ bạn hãy tạo pull và xem TeamCity làm được gì nhé!
![](https://images.viblo.asia/c340d8a8-3ff9-4509-91ab-4c87e0c9e51c.png)
![](https://images.viblo.asia/db866e32-629a-43ad-8ace-f300cb1ef195.png)

Bài viết hướng dẫn cơ bản để có thể tích hợp với TeamCity, còn rất nhiều tiện ích khác các bạn có thể tự tìm hiểu thêm.