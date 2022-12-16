Đối với lập trình viên iOS, việc làm việc cùng các thư viện ngoài trên CocoaPods không còn xa lạ, chúng ta đã quá quen thuộc với cài đặt thư viện và gọi các hàm từ chúng. Tuy nhiên, đã bao giờ bạn mong muốn tạo ra những thư viện cho riêng mình hoặc chia sẻ chúng với những đồng nghiệp khác cùng đóng góp và sử dụng chưa? Trong bài này chúng ta sẽ cùng nhau tạo 1 pod đơn giản và sử dụng Travis CI, Codecov để tăng độ tin cậy trên CocoaPods.

## Tổng Quan

Có nhiều cách khác nhau để tạo pod, cách phổ biến nhất là theo tài liệu chính thức của CocoaPods, về cơ bản, bạn có thể sử dụng lệnh sau để nhanh chóng khởi động Xcode workspace để phát triển pod:

`pod lib create [pod name]`

Trong workspace, một điều tôi không thích là code liên quan đến Unit Test được lồng bên trong example target, nó thực sự ko có ý nghĩa lắm. Sau một số thử nghiệm, tôi đã tìm ra một cách để tạo một pod từ đầu và tổ chức tốt các mã unit test và examples.

Dưới đây là tổng quan nhanh về tất cả các bước để tạo pod:

1. Thiết lập Xcode project và các target cần thiết
2. Liên kết với Github
3. Implement the pod
4. Viết unit tests
5. Cấu hình Travis CI và Codecov
6. Publish the pod

Nào, chúng ta cùng bắt đầu!

## Thiết lập Xcode project và các target cần thiết

Trước khi tạo project, một nhiệm vụ quan trọng cần phải làm đó là đặt tên cho pod của chúng ta (VD: SwiftyLib) và đảm bảo tên này chưa được sử dụng trên CocoaPods.

### Tạo một Cocoa Touch Framework Xcode project

Một CocoaPods library bản chất là một Cocoa Touch framework library. Mở Xcode và chọn File > New > Project để tạo một project mới, sau đó chọn Cocoa Touch Framework.

![](https://images.viblo.asia/261a3cb0-0e64-437e-9632-b3cea0eb7cdc.png)

Nhập tên SwiftyLib, chọn Include Unit Tests. Ở trang tiếp theo, chọn project location và không check "Create Git repository on my Mac" vì chúng ta sẽ tạo sau.

![](https://images.viblo.asia/9ad79ba2-6a7c-4951-a4da-dececf59a613.png)

Sau khi tạo xong, workspace của chúng ta sẽ trông như sau:

![](https://images.viblo.asia/259f28ef-2e38-4b89-8f7d-82045c9a8cba.png)

### Chuẩn bị targets

Như các bạn thấy, chúng ta giờ đã có một project là SwiftyLib và nó có 2 targets:

1. SwiftyLib: Tất cả implementation sẽ được đặt ở đây
2. SwiftyLibTests: Viết các phần test

Trong Xcode, mỗi target có 1 scheme để quản lý hành vi build hoặc test. Như bạn thấy ở SwiftyLib scheme, khi chúng ta thực hiện lệnh Test, nó sẽ kích hoạt các kịch bản test được viết trong SwiftyLibTests target.

![](https://images.viblo.asia/fe292802-ed45-49bd-bc4c-81a9ecba01be.png)

Trong nhiều CocoaPods projects, nhà phát triển thường để một vài demo hoặc example như là 1 phần của pod, chúng sẽ giúp người khác hiểu hơn cách sử dụng pod. Để làm như vậy, hãy thêm 1 target mới (SwiftyLibExamples): File > New > Target…, chọn Single View App và chọn Next.

![](https://images.viblo.asia/af8e2a14-1c01-4cbd-9688-a7e97742fafe.png)

Nhập tên SwiftyLibExamples và Finish.

![](https://images.viblo.asia/da3c2280-5a94-4cfa-8ce2-1cbb44f78e81.png)

Bây giờ thanh điều hướng sẽ trông như sau:

![](https://images.viblo.asia/f48f6a5a-f52e-48ba-aaa4-c0d2a18c5b4f.png)

SwiftyLibTests đã không bị lồng trong SwiftyLibExamples. Sau này chúng ta sẽ implement cho example để sử dụng pod, nhưng bây giờ chúng ta sẽ kết thúc bước đầu là khởi tạo và thiết lập.

## Liên kết với Github

Không cần phải nói, Github là giải pháp tốt nhất quản lý các dự án open-source. Quan trọng hơn, khi chúng ta publish CocoaPods library, CocoaPods sẽ yêu cầu địa chỉ mà source code có thể lấy và Github là sự lựa chọn hoàn hảo.

### Tạo repository mới

Truy cập vào tài khoản Github và tạo một project mới là SwiftyLib.

![](https://images.viblo.asia/5564a93b-6e68-4103-977a-f91b75412574.png)

Tiếp theo, chúng ta sẽ sử dụng thông tin sau để liên kết với Xcode project của chúng ta:

![](https://images.viblo.asia/538a5e89-0749-42be-9d12-914084c489ff.png)

### Liên kết với project

Mở Terminal, navigate đến SwiftyLib Xcode project folder và thực hiện các lệnh sau

```
git init
git remote add origin git@github.com:{USERNAME}/SwiftyLib.git
git add .
git commit -m "Initial project setup"
git push -u origin master
```

### README và MIT License

Chúng ta đã upload source codes lên Github, trước khi kết thúc phần này, chúng ta tạo file README.md và MIT license file từ trang Github. Để tạo README.md file hãy click vào nút "Add a README", để thêm MIT license file hãy click vào "Create new file", thực sự đơn giản phải không.

![](https://images.viblo.asia/2108807f-6a91-4ccb-abe8-ba526daa07ce.png)

Sau khi tạo xong file, hãy đồng bộ với local

```
git pull remote_name branch
...
2 files changed, 24 insertions(+)
create mode 100644 LICENSE
create mode 100644 README.md
```

## Implement the pod

Giờ là lúc chúng ta sẽ implement cho Pod. Tất cả gì pod của chúng ta có thể thực hiện sẽ được implement trong SwiftyLib.

![](https://images.viblo.asia/62d72e93-8f7d-44b1-bcfc-b3c6c384d45c.png)
![](https://images.viblo.asia/a7b80ff1-dda3-4385-b2bb-0d0ba63d9841.png)
![](https://images.viblo.asia/c3926374-9505-4c43-bec4-36bc5d38656b.png)

Chúng ta sẽ thêm 1 chức năng đơn giản cho pod bằng cách implement trong file SwiftyLib.swift:

```
//
//  SwiftyLib.swift
//
public final class SwiftyLib {

    let name = "SwiftyLib"
    
    public func add(a: Int, b: Int) -> Int {
        return a + b
    }
    
    public func sub(a: Int, b: Int) -> Int {
        return a - b
    }
    
}
```

Library rất đơn giản, nó chỉ có 2 functions tính toán. Xcode sẽ tự động lưu lại file khi chúng ta implement, hãy nhớ sau khi đã implement xong cho SwiftyLib target cần build lại để các target khác có thể sử dụng được.

![](https://images.viblo.asia/b75aa74a-347c-403e-aba0-860396b789b8.png)

## Viết unit test

Unit test là một phần quan trọng để chất lượng của library được đảm bảo, vì library của chúng ta rất đơn giản nên unit test cũng vậy :)

```
//
//  SwiftyLibTests.swift
//
import XCTest
@testable import SwiftyLib

class SwiftyLibTests: XCTestCase {
    
    var swiftyLib: SwiftyLib!

    override func setUp() {
        swiftyLib = SwiftyLib()
    }

    func testAdd() {
        XCTAssertEqual(swiftyLib.add(a: 1, b: 1), 2)
    }

}
```

Hiện tại chúng ta chỉ có add() test function. Chạy unit test bằng cách click Test task như dưới đây:

![](https://images.viblo.asia/6be5b062-919d-498e-ba3a-16d4a835a2fb.png)

Bài test đã vượt qua, chuyển tới phần report và kiểm tra:

![](https://images.viblo.asia/aaeec893-b78f-4557-b580-8f8e80561870.png)

Như các bạn thấy, unit test của chúng ta mới chỉ cover được 50%, bởi vì chúng ta chưa viết unit test cho sub() function, chúng ta sẽ implement luôn cho nó như sau:

```
//
//  SwiftyLibTests.swift
//
import XCTest
@testable import SwiftyLib

class SwiftyLibTests: XCTestCase {
    
    var swiftyLib: SwiftyLib!

    override func setUp() {
        swiftyLib = SwiftyLib()
    }

    func testAdd() {
        XCTAssertEqual(swiftyLib.add(a: 1, b: 1), 2)
    }
    
    func testSub() {
        XCTAssertEqual(swiftyLib.sub(a: 2, b: 1), 1)
    }

}
```

Bây giờ hãy thử chạy lại bài test 1 lần nữa và nó sẽ cover được 100%

![](https://images.viblo.asia/d19d5bcb-adc7-4d8f-8236-7d5b406a3175.png)

Lúc này chúng ta đã có được 1 pod với chất lượng code được đảm bảo :) Hãy lưu lại những thay đổi và push chúng tên Github thôi.

## Cấu hình Travis CI và Codecov

Bất cứ khi nào chúng ta push những thay đổi mới lên Github, chúng ta đều cần test pod và chắc chắn các test case đều vượt qua.

> Travis CI là một dịch vụ tích hợp liên tục được lưu trữ, phân tán sử dụng để xây dựng và test các dự án phần mềm được lưu trữ tại GitHub.

Chúng ta có thể tận dụng Travis để chạy các test case và gửi báo cáo cho Codecov.

> Codecov là một công cụ báo cáo nhằm xử lý bất kỳ định dạng coverage report nào thành định dạng theo tiêu chuẩn trên Codecov. Bạn có thể thay đổi cấu hình về cách Codecov xử lý báo cáo và thể hiện thông tin coverage.

Để Travis nhận bất kỳ thay đổi nào trong repo Github của chúng ta, hãy đồng bộ hóa tài khoản Github của bạn trên Travis và kích hoạt kho lưu trữ SwiftyLib.

![](https://images.viblo.asia/6cdf5a0f-1de3-4a19-b5de-34442fe07951.png)

Tạo 1 .travis.yml file trong project folder:

```
language: objective-c

osx_image: xcode10.1
env:
  matrix:
    - TEST_SDK=iphonesimulator12.1 OS=12.1 NAME='iPhone XR'
    - TEST_SDK=iphonesimulator12.1 OS=12.1 NAME='iPhone 7'

script:
  - set -o pipefail && xcodebuild test -enableCodeCoverage YES -project SwiftyLib.xcodeproj -scheme SwiftyLib -sdk $TEST_SDK -destination "platform=iOS Simulator,OS=$OS,name=$NAME" ONLY_ACTIVE_ARCH=YES
```

Về cơ bản, nó hướng dẫn Travis chạy unit test trên hai thiết bị khác nhau chạy các phiên bản iOS khác nhau. Bạn có thể yêu cầu Travis thử nghiệm trên nhiều thiết bị hơn, nhưng hãy đảm bảo phiên bản giả lập iPhone hỗ trợ các thiết bị đó. Lưu tệp .travis.yml và đẩy nó vào Github, kích hoạt build trên Travis, bạn sẽ thấy Travis chạy các test case cho commit bạn đã gửi.

![](https://images.viblo.asia/72501ad9-d685-41dc-b36a-d5ad8e670642.png)

Tiếp theo, hãy yêu cầu Travis gửi test report cho Codecov. Trước khi tiếp tục, hãy xem Travis đã làm gì cho đến nay. Travis thực thi đoạn script sau để chạy thử nghiệm:

```
xcodebuild test \
  -enableCodeCoverage YES \
  -project SwiftyLib.xcodeproj \
  -scheme SwiftyLib \
  -sdk $TEST_SDK \
  -destination "platform=iOS Simulator,OS=$OS,name=$NAME" \
  ONLY_ACTIVE_ARCH=YES
```

Chú ý rằng test report được tạo bởi lệnh xcodebuild test. Nếu theo hướng dẫn của Codecov, chúng ta đơn giản push coverage report tới Codecov với dòng lệnh:

`bash <(curl -s https://codecov.io/bash) -t {CODECOV_TOKEN}`

## Publish the pod

Cuối cùng, đã đến lúc publish pod của chúng ta! Đầu tiên, cần cài đặt CocoaPods

`gem install cocoapods`

Sau đó tạo một podspec file để define pod của chúng ta,... nơi có thể tìm thấy source

```
pod spec create SwiftyLib
...
Specification created at SwiftyLib.podspec
```

Chỉnh sửa SwiftyLib.podspec file:

```
Pod::Spec.new do |spec|

  spec.name         = "SwiftyLib"
  spec.version      = "0.0.1"
  spec.summary      = "A CocoaPods library written in Swift"

  spec.description  = <<-DESC
This CocoaPods library helps you perform calculation.
                   DESC

  spec.homepage     = "https://github.com/jeantimex/SwiftyLib"
  spec.license      = { :type => "MIT", :file => "LICENSE" }
  spec.author       = { "jeantimex" => "jean.timex@gmail.com" }

  spec.ios.deployment_target = "12.1"
  spec.swift_version = "4.2"

  spec.source        = { :git => "https://github.com/jeantimex/SwiftyLib.git", :tag => "#{spec.version}" }
  spec.source_files  = "SwiftyLib/**/*.{h,m,swift}"

end
```

Kiểm tra SwiftyLib.podspec xem đã đúng chưa, nếu chưa thì sẽ sửa lỗi cho nó.

```
pod lib lint
...
-> SwiftyLib (0.0.1)
SwiftyLib passed validation.
```

Sau khi đã validate, hãy lưu lại và push lên Github.

```
git add .
git commit -m "Added SwiftyLib.podspec"
git push
```

### Distribute our library

Thêm tag cho version

```
git tag 0.0.1
git push origin 0.0.1
```

Sau đó push tiến hành push

```
pod trunk push
...
Updating spec repo `master`
---------------------------
🎉  Congrats
🚀  SwiftyLib (0.0.1) successfully published
📅  February 24th, 15:49
🌎 https://cocoapods.org/pods/SwiftyLib
👍 Tell your friends!
---------------------------
```

Lưu ý rằng số phiên bản phải khớp với spec.version được xác định trong SwiftyLib.podspec.

Xin chúc mừng! Chúng ta vừa xuất bản thư viện CocoaPods cho cộng đồng mã nguồn mở!

Bài viết được dịch từ: https://medium.com/flawless-app-stories/create-your-own-cocoapods-library-da589d5cd270

Hy vọng bài viết sẽ hữu ích với bạn!