References: [https://stackjava.com/sdkman/sdkman-la-gi-gioi-thieu-sdkman-trong-lap-trinh-java.html](https://stackjava.com/sdkman/sdkman-la-gi-gioi-thieu-sdkman-trong-lap-trinh-java.html)
# 1. SDKMan là gì?
SDKMan (Software Development Kit Manager) là một công cụ dùng để quản lý song song các phiên bản của các bộ phát triển phần.

Ví dụ bạn có thể cài nhiều phiên bản Java trên máy. Khi muốn dùng version nào thì bạn chuyển sang version đó. Hay muốn cài Java thì chỉ cần chạy lệnh của SDKMan là nó tự động cài phiên bản Java stable mới nhất hoặc theo phiên bản bạn chỉ định.

SKDMan cung cấp chuẩn giao tiếp dòng lệnh (Command Line Interface – CLI) và các api để cài đặt, xóa, chuyển đổi hiển thị danh sách SDK.

# 2. Những tính năng và ưu điểm của SDKMan
* Giúp cho việc cài đặt dễ hơn: bạn không cần phải download, giải nén tạo các biến môi trường
* Hỗ trợ đầy đủ các gói phát triển Java: SDKMan có thể cài được các SDK cho JVM như Java, Groovy, Scala, Kotlin … Các trình quản lý thư viện Java như Ant, Gradle, Maven… (Xem các SDK mà SDKMan hỗ trợ quản lý tại đây)
* SKDMan rất nhẹ: SDK được viết cho giao diện dòng lệnh (bash), chỉ yêu cầu chạy được lệnh curl, zip/unzip
* SDKMan có thể chạy trên tất cả platforms UNIX: Mac OSX, Linux, Cygwin, Solaris and FreeBSD
# 3. Một số lệnh cơ bản của SDKMan
### 3.1 Liệt kê các sdk mà SDKMan hỗ trợ

`sdk list`
![](https://stackjava.com/wp-content/uploads/2019/04/sdkman-overview-2.png)

### 3.2 Cài đặt bộ phát triển phần mềm (sdk)

Cài đặt bản stable nhất sdk install sdk_name:

Ví dụ mình muốn cài bản Java stable mới nhất thì sẽ dùng lệnh:

`sdk install java`
Hoặc muốn chỉ rõ một version nào đó thì bạn sử dụng sdk install sdk_name sdk_version

Ví dụ

`sdk install scala 2.12.1`
### 3.3 Hiển thị danh sách các version của sdk

Hiển thị danh sách các version của một bản sdk: sdk list sdk_name

Ví dụ mình muốn xem các version của gradle đang hỗ trợ:

`sdk list gradle`
![](https://stackjava.com/wp-content/uploads/2019/04/sdkman-overview-1.png)

### 3.4 Xóa SDK

sdk uninstall sdk_name sdk_version
Ví dụ mình muốn xóa bản scala version 2.11.6

`sdk uninstall scala 2.11.6`
### 3.5 chuyển đổi giữa các version SDK

sdk default sdk_name sdk_version
Ví dụ trên máy mình có nhiều bản scala, mình muốn chuyển sang bản scala 2.11.6 làm bản mặc định

`sdk default scala 2.11.6`


(Xem thêm: [Cài đặt Java bằng SDKMan](https://stackjava.com/sdkman/huong-dan-cai-dat-java-bang-sdkman.html) )

(Xem thêm: [Cài đặt Gradle bằng SDKMan](https://stackjava.com/gradle/huong-dan-cai-dat-gradle-bang-sdkman.html))

(Xem thêm: [Cài đặt Maven bằng SDKMan](https://stackjava.com/sdkman/huong-dan-cai-dat-maven-bang-sdkman.html))