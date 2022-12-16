Việc xây dựng một dự án lớn trên Xcode Phiên bản 12.0.1 (12A7300) với một simulator được chọn (iOS 14), gây ra nhiều lỗi khác nhau, cho dù cùng một dự án có hoạt động hoàn hảo với Xcode 11.x và các phiên bản thấp hơn hay không.

Lưu ý: Dự án đã thử nghiệm là một dự án lớn có nhiều thư viện cocoapods phổ biến của bên thứ ba [Swift + objC] AFNetworking, Firebase, RN Modules, Notification Extension target, v.v.

Một số lỗi như sau:

* No such modules (import installed pods)
* Cocoapods post-build step with the script they install issue -> Pods/Target Support Files/Pods-All-Apps-XXX/Pods-All-Apps-XXX-frameworks.sh: line 141: ARCHS[@]: unbound variable
* ‘ObjCheaderFile.h’ file not found. (ObjC Headers in bridging file)

![](https://images.viblo.asia/2db78eac-bcf6-45cc-bc3b-a9f6bc1f5683.png)
![](https://images.viblo.asia/02c36169-6883-4899-9f6e-04be3be7c688.png)
![](https://images.viblo.asia/727ce151-de56-47b2-9911-23165dd88e81.png)

### Đột nhiên những lỗi này Tại sao?

Bây giờ để hiểu điều này, tôi muốn bạn xem cập nhật quan trọng từ Ghi chú phát hành Xcode 12:

![](https://images.viblo.asia/a58c78a3-cf37-4b0c-9d95-6b9820331fba.png)

### Dưới đây là 2 lý do chính dẫn đến các lỗi phát sinh do thay đổi này:

1. Hỗ trợ kiến trúc arm64 & và Xcode 12 Phiên bản tương thích vẫn chưa được cung cấp bởi nhiều thư viện bên thứ ba phổ biến (Như Firebase, AFNetworking, v.v.).

```
Xcode 11 used to automatically translate building for arm64 for the simulator into building for x86_64, but now that arm64 is a valid simulator architecture (it’s the Apple Silicon architecture), that translation no longer occurs.
So now whenever you try to build this test project under selected iOS 14 simulator, it will return you with the mentioned errors as the link target type will be an unknown type ‘arm64-apple-ios11.0-simulator’ which cause the build failed.
```

2. Vì cài đặt Kiến trúc hợp lệ(Valid Architectures) bị xóa trong Xcode 12, vì vậy project trong Xcode 12 sẽ tự động tạo macro VALID_ARCHS trong User-Defines và macro này sẽ làm cho quá trình xây dựng không thành công.

### Các bước để sửa những lỗi này:

Bước 1: Bạn phải loại trừ arm64 cho kiến trúc giả lập cả khỏi Project của bạn và Pod.

* Để làm điều đó cho Project, hãy điều hướng đến Build Settings của dự án và thêm "Any iOS Simulator SDK" nào có giá trị arm64 bên trong "Excluded Architecture". (Lưu ý: Project, không phải Target. Thêm vào Project sẽ tự động thêm cài đặt vào tất cả Target của nó)

![](https://images.viblo.asia/ee68d8ed-7d3b-4078-a08e-c42b55dc900f.png)

* Bây giờ, bạn phải thực hiện tương tự đối với dự án Pod cho đến khi tất cả các nhà cung cấp cocoapods hoàn thành việc thêm phần sau vào Podspec của họ.

![](https://images.viblo.asia/f25d1ba2-ec95-4900-889a-8b5375cc2488.png)

```
Bạn có thể thêm thủ công Excluded Architechure trong Build Settings của dự án Pod của mình, nhưng nó sẽ bị ghi đè khi bạn sử dụng cài đặt pod.
Thay vào đó, bạn có thể thêm đoạn mã này vào Podfile của mình. Nó sẽ viết Build Settings cần thiết mỗi khi bạn chạy cài đặt pod
```

```
post_install do |installer|
  installer.pods_project.build_configurations.each do |config|
    config.build_settings["EXCLUDED_ARCHS[sdk=iphonesimulator*]"] = "arm64"
  end
end
```

Bước 2: Bạn nên làm là xóa hoàn toàn VALID_ARCHS khỏi dự án của mình (Main Project & Pod Project) và đảm bảo Kiến trúc (ARCHS) được đặt thành Standard Architectures (ARCHS_STANDARD) chứ không phải một thứ gì đó cụ thể (trừ khi bạn thực sự biết chính xác lý do tại sao bạn 'không sử dụng ARCHS_STANDARD).

[image 7]

Vui lòng đảm bảo rằng bạn đã làm theo cả hai bước, sau đó Clean project và rebuild lại nó, hy vọng các bước này hiệu quả cho tất cả.

Tuy nhiên, trong trường hợp lỗi không được khắc phục bằng cách thực hiện các Bước trên, thì bạn cần thực hiện thêm các bước sau:

* Bạn cần phải Nâng cấp tất cả các Pod của mình lên phiên bản mới nhất hiện có (Đoạn mã bên dưới dành cho sự trợ giúp của bạn) -> Clean Project -> Re-Build.

```
rm -rf ~/Library/Developer/Xcode/DerivedData/
pod deintegrate
pod update
```