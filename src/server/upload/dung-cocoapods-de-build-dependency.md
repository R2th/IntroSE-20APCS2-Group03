# Giới thiệu
Trong phần trước, tôi đã giới thiệu cách dùng Carthage để build dependency. Trong bài viết này tôi sẽ hướng dẫn cách dùng CocoaPods.
![](https://images.viblo.asia/1efadc8d-b1d1-4f56-98d1-d2b42405dc8e.png)
- CocoaPods manages library dependencies for your Xcode projects.

- The dependencies for your projects are specified in a single text file called a Podfile. CocoaPods will resolve dependencies between libraries, fetch the resulting source code, then link it together in an Xcode workspace to build your project.



#  Cài đặt
-  Cài đặt Cocoapods bằng Ruby mặc định của MacOS.
1. Mở Terminal
2. gõ lệnh: $ sudo gem install cocoapods

![](https://images.viblo.asia/b199bc85-6296-4152-8550-9080645534d6.png)

# Khởi tạo
Sau khi cài đặt xong Cocoapod chúng ta tiến hành khởi tạo trong Project.
1. cd tới thư mục Project
2. run lệnh: pod init

Sau khi chạy lệnh này trong project sẽ tạo ra file pod dùng để khai báo các dependency muốn sử dụng trong project.
![](https://images.viblo.asia/ff6b5e93-0fa1-4d4d-b6b8-c608ab92b0f2.png)

3. Mở file podfile -> Add dependecy cần dùng

![](https://images.viblo.asia/288db0f8-cbde-4e12-8ccf-a9c10bf4f390.png)
 Trong đó "MyApp" là tên của Target của project
 "AFNetworking", "AFNetworking" là tên của các dependency
 '~> 3.0' là version cho các dependency tương ứng.
 
# Build
run lệnh: pod install

Cocoapod sẽ tiến hành build các dependency. Khác với Carthage, Cocoapod ko tạo ra các dynamic libray mà nó tạo ra một workspace mới và add các dependency vào đó.

Mở Project Repository 
![](https://images.viblo.asia/50aa4dc3-0f7b-4a86-89c4-e864b8748fde.png)

Mở Project .xcworkspace mà Cocoapod tạo ra. Bây giờ chúng ta sẽ sử dụng workspace này để làm việc với các dependency

# Kết luận 
Trong bài viết này tôi đã hướng dẫn cách dùng Cocoapods để quản lí dependency. Trong bài tới tôi sẽ so sánh ưu điểm của từng công cụ

Link tham khảo Carthage: https://viblo.asia/p/huong-dan-carthage-de-build-dependency-trong-ung-dung-ios-6J3ZgzzgKmB