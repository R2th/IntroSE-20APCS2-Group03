Apple vừa phát hành dòng Macbook mới nhất sử dụng chip M1 của chính Apple. Điều này mang lại tốc độ tốt hơn, cả về hiệu suất và tuổi thọ pin.

Trong trường hợp này, các nhà phát triển quan tâm đến việc thay thế macbook cũ của họ bằng macbook với chip M1. Tuy nhiên, bên cạnh những ưu điểm mà MacBook Pro M1 mang lại cũng có những khuyết điểm về mặt phát triển ứng dụng. Có một số ứng dụng chưa tương thích với chip Apple M1 này.

# 1. Cách thiết lập, giải pháp chạy ứng dụng React Native trên chip Macbook Pro M1
React Native là một framework JavaScript cho phép native rendering các ứng dụng iOS và Android. Điều này giúp chúng ta tạo hai ứng dụng trên các nền tảng khác nhau với một mã nguồn dễ dàng hơn. Một trong những khó khăn gặp phải khi phát triển ứng dụng React Native thông qua MacBook Pro / Macbook Air với chip M1 này là khi chúng ta muốn build / run ứng dụng.

Nhiều nhà phát triển đã gặp thất bại trong việc xây dựng các ứng dụng gốc phản ứng của họ thông qua chiếc macbook M1 này.
Tuy nhiên, đừng lo lắng, vì tôi sẽ chia sẻ các mẹo để bạn xử lý các lỗi khi xây dựng ứng dụng iOS trên MacBook Pro hoặc MacBook Air M1 chip Apple Silicon.

![](https://images.viblo.asia/50e9249e-329d-4264-a49f-df2bec835add.png)

## a. React Native Build không thành công trên Macbook Pro M1

có thể bạn không thể chạy chạy react-native run-ios trên Macbook M1. Đầu ra lỗi mà bạn sẽ gặp phải khi build react native iOS như sau:

```
The following build commands failed:
CompileC /Users/[username]/Library/Developer/Xcode/DerivedData/reactNativeBoilerplate-atkaxzsfrfdlfocjvyvemwywinew/Build/Intermediates.noindex/Pods.build/Debug-iphonesimulator/Flipper-Folly.build/Object. Users/[username]/[folder-path]/ios/Pods/Flipper-Folly/folly/synchronization/DistributedMutex.cpp normal x86_64 c++ com.apple.compilers.llvm.clang.1_0.compiler
(1 failure)
```

## b. Giải pháp để chạy và xây dựng React Native trên Macbook Pro M1

Giải pháp để giải quyết lỗi xây dựng React Native không thành công trên Macbook M1 là sử dụng Rosetta. Rosetta là gì ?.

> [Rosetta](https://en.wikipedia.org/wiki/Rosetta_(software)) là một trình dịch nhị phân động được Apple Inc. phát triển cho macOS, một lớp tương thích ứng dụng giữa các kiến trúc tập lệnh khác nhau. Nó cung cấp cho các nhà phát triển và người tiêu dùng một giai đoạn chuyển tiếp để cập nhật phần mềm ứng dụng của họ để chạy trên phần cứng mới hơn, bằng cách "dịch" nó để chạy trên kiến trúc khác.
> 

Nếu bạn đang sử dụng MacBook Pro / Air với chip silicon M1 / Apple, bạn có thể được yêu cầu cài đặt Rosetta để mở một ứng dụng.

![](https://images.viblo.asia/5cdc091b-2e7a-43e2-bedd-a2b881db2332.png)

Một cách khác để cài đặt Rosetta 2 trên Mac là sử dụng công cụ dòng lệnh cập nhật phần mềm quen thuộc.

```
softwareupdate --install-rosetta
```

Thao tác này sẽ khởi chạy trình cài đặt rosetta và bạn sẽ phải đồng ý với thỏa thuận cấp phép, tôi chắc chắn rằng bạn sẽ đọc đầy đủ và kỹ lưỡng như tất cả chúng ta đều làm mỗi khi cài đặt bất kỳ thứ gì trên mọi thiết bị.

# 2. Thay đổi cấu trúc dự án và xây dựng ứng dụng

## a . Đặt Terminal App sử dụng Rosetta
Chọn ứng dụng trong Finder. **Applications/Utilities/Terminal (App terminals)**.

Từ menu Tệp trong thanh menu, chọn Nhận thông tin. tạo danh sách kiểm tra trên: ( Open Using Rosetta ) . Xem hình ảnh bên dưới.

![](https://images.viblo.asia/9627f795-e984-49fb-828f-f55a072f8e81.png)

## b . Đặt Xcode sử dụng Rosetta
Chọn ứng dụng trong Finder. **Applications/Xcode (Xcode App)**.

Từ menu Tệp trong thanh menu, chọn Nhận thông tin. tạo danh sách kiểm tra trên: ( Open Using Rosetta ) . Xem hình ảnh bên dưới.

![](https://images.viblo.asia/ec55acf7-fc9f-4a03-bdbb-316207bef05b.png)

## c .  Cài đặt dự án.
Tiếp theo, xóa các thư mục cần thiết để quá trình build thành công và suôn sẻ.

*  xoá Pods/ folder in your-project-dir/ios/Pods 
* xoá podfile.lock in -> your-project-dir/ios/Podfile.lock

Nếu bạn sử dụng mã cũ của react native hoặc nếu bạn gặp lỗi như những gì tôi đã nói ở trên lần đầu tiên, thì bạn có thể làm theo các bước tiếp theo bên dưới. Tuy nhiên, nếu bạn vừa xây dựng react native trên macbook M1 của mình, thì đó không phải là vấn đề và bạn sẽ có thể xây dựng ứng react native trên macbook của mình một cách suôn sẻ.

Bước tiếp theo bạn phải làm: Sửa đổi Podfile trong thư mục iOS. **your-project-dir/ios/Podfile**. điều hướng đến dự án  react native của bạn và mở nó trong trình chỉnh sửa.

Tìm mã bên dưới **( your-project-dir/ios/Podfile )**
```
use_flipper!()
```

 Và thay đôi .
 
 ```
 use_flipper!({ 'Flipper-Folly' => '2.5.3', 'Flipper' => '0.75.1', 'Flipper-RSocket' => '1.3.1' })
 ```
 
 Bước tiếp theo, cài đặt React native project như bình thường. Điều hướng đến thư mục dự án gốc và chạy:
 
 ```
 npx pod-install
 ```
 
 Tiếp theo, chạy npx react-native run-ios từ terminal của bạn.
 
 ```
 npx react-native run-ios
 ```
 
 ![](https://images.viblo.asia/ee1463a4-2291-4858-a28b-f68b31011d68.png)

 Phương pháp trên sẽ trơn tru và chạy tốt trên iOS Emulator. Chúc may mắn!.
 
 
 original article: handi.dev