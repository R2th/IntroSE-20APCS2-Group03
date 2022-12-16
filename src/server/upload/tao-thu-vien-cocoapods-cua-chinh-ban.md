Nguồn bài viết: https://medium.com/flawless-app-stories/create-your-own-cocoapods-library-da589d5cd270

![](https://images.viblo.asia/e330b88c-5e9f-4cce-a3d5-769bbd744a6e.png)

## Giới thiệu
Là 1 iOS developer, bạn đã từng sử dụng qua vài thư viện CocoaPods trong dự án của mình, và bạn có thể đã quen với việc cài đặt và sử dụng chúng. Tuy nhiên, bạn đã bao giờ nghĩ tới mình sẽ đóng góp mã nguồn mở iOS cho cộng đồng bằng việt phát triển 1 pod của mình( thư viện CocoaPods)? Tưởng tượng rằng rất nhiều ứng dụng iOS sử dụng thư viện tuyệt vời của bạn, hẳn là kì diệu phải không?

Trong bài hướng dẫn này, tôi sẽ chỉ cho bạn cách phát triển 1 pod đơn giản. Ngoài ra bạn cũng học thêm cách tận dụng Travis CI và Codecove để chắc rằng pod của bạn tin cậy và hữu ích

## Tổng quan
Có rất nhiều cách để tạo pod. 1 cách phổ biến là tìm hiểu document của CocoaPods bằng [Using Pod Lib Create], (https://guides.cocoapods.org/making/using-pod-lib-create), cơ bản thì bạn có thể sử dụng command dưới để bootstrap 1 Xcode workspace để phát triển 1 pod mới:

```
> pod lib create [pod name]
```

Trong vùng làm việc ban đầu, 1 điều mà tôi không thích là các mã code liên quan tới đơn vị test được nằm bên trong đối tượng mẫu, nó không có ý nghĩa đối với tôi. Sau vài thử nghiệm và sai xót, tôi nhận ra cách để tạo pod từ scratch và sắp xếp hợp lý mã nguồn cho đơn vị testing và ví dụ.

Đây là khái quát nhưng bước tạo 1 pod:
1. Tạo 1 project Xcode và target cần thiết
2. Kết nói tới github
3. Triển khai pod
4. Viết unit tests
5. Tinh chỉnh Travis CI và Codecov
6. Công bố pod

Và tại thời điểm viết bài này, tôi đang sử dụng các phần mềm:
* macOs Mojave 10.14.3
* Xcode 10.1
* Swift 4.2
* cocoapods 1.6.0

Nào, bắt đầu thôi

## Cài đặt dự án Xcode và các mục tiêu cần thiết
Thực tế, trước khi chúng ta tạo project, có 1 điều quan trọng cần làm, hãy đặt tên pod của mình bằng 1 cái tên mà chưa được đăng ký trên [CocoaPods](https://cocoapods.org/), ở đây tôi dùng tên **SwiftLib**, và chúng ta sẽ tới bước tiếp theo.

### Tạo 1 dự án Cocoa Touch Framework Xcode

Như tiêu đề, 1 thư viện Cocoapods là 1 thư viện Cocoa Touch framework. Chạy Xcode và tạo 1 project mới, lựa chọn `Cocoa Touch Framework`

![](https://images.viblo.asia/e640de86-b0f9-462f-b18c-17d38b2e70f6.png)

Đặt tên `SwiftLib`, lựa chọn `Include Unit Test`. Ở trang tiếp theo lựa chọn location dự án và đừng chọn `Create Git repository on my Mac` , nó sẽ được chúng ta tạo sau

![](https://images.viblo.asia/9908a720-91c4-40c1-a504-e031d548caa0.png)

Sau khi bạn chọn Create, project sẽ được tạo và vùng làm việc sẽ trông như thế này

![](https://images.viblo.asia/2deee72e-ddd3-4191-a56d-661e39c7dc16.png)

### Chuẩn bị cho các target
Như bạn có thể thấy, chúng ta hiện có 1 project `SwiftLib` và có 2 target:
1. SwiftyLib: Pod của chúng ta sẽ được triển khai tại đây
2. SwiftyLibTest: Đơn vị kiểm tra pod chúng ta và sẽ bao gồm các lỗi thu thập được

Trong Xcode, mỗi target có 1 scheme cho phép bạn điều hướng build và test. Như bạn có thể thấy ở scheme SwiftyLib, khi chúng ta thực hiện `Test` command, nó sẽ theo dõi test được viết trong `SwiftyLibTests` target.

![](https://images.viblo.asia/639e3171-84d7-481a-a702-011c5a1f23df.png)

Ở các dự án CocoaPods, các developer thích đặt 1 số ví dụ mẫu như 1 phần bên trong pod của họ, điều này giúp cho mọi người hiểu cách sử dụng pod hơn. Để làm điều đó, hãy thêm 1 target mới tên là `SwiftyLibExamples`. Lựa chọn `SwfityLib` từ điều hướng dự án và chọn File > New > Target..., chọn biểu mẫu `Single View App`  và click `Next`.

![](https://images.viblo.asia/b36a1b9c-2ffe-41be-8de6-d385aa61f3e2.png)

Đặt tên `SwiftyLibExamples` và lựa chọn `Finish`

![](https://images.viblo.asia/cfdc5b69-27d2-469b-9772-aba540092a82.png)

Và điều hướng dự án sẽ trông như thế này:

![](https://images.viblo.asia/2b578cda-d324-4c82-9474-262698d4bfe0.png)

`SwiftyLibTests` không được lồng vào bên trong`SwiftyLibExamples`. Sau đây, chúng ta sẽ triển khai ví dụ sử dụng pod của mình, và hiện tại chúng ta đã hoàn thành bước đầu tiên và thành công khung để tạo nên 1 pod!

## Kết nối Github
Hiển nhiên, Github là dịch vụ lưu trữ tốt nhất cho các dự án mã nguồn mở, và quan trọng hơn khi bạn xuất bản thư viện CocoadPods, Cocoapods sẽ yêu cầu bạn chỉ định vị trí từ nguồn sẽ được truy xuất, và Github là 1 lựa chọn hoàn hảo.

### Tạo 1 repository mới
Vào [Github](https://github.com/) và tạo 1 project tên là SwiftyLib, để nguyên các cài đặt mặc định và chọn Create repository, 1 repository Github rỗng đã được tạo ngay bây giờ

![](https://images.viblo.asia/4730ddba-7364-4218-aa9b-9c7bfe127b2e.png)

Ở màn hình tiếp theo, chúng ta sẽ làm theo các bước hướng dẫn để kết nói tới dự án Xcode có sẵn:

![](https://images.viblo.asia/bece8601-1b6b-451d-b586-3fa4cfce89fc.png)

### Kết nối tới dự án có sẵn

Mở terminal, chuỷen tới thư mục chứa dự án SwiftyLib, và theo dõi các command dưới:

```
> git init
> git remote add origin git@github.com:{USERNAME}/SwiftyLib.git
> git add .
> git commit -m "Initial project setup"
> git push -u origin master
```

### README và MIT License

Giờ, chúng ta sẽ uploaded mã nguồn của mình lên Github! Trước đó chúng ta sẽ hoàn thành phần này, hãy tạo 1 README.md và chọn Add a `README`, để thêm file `MIT License`, chọn `Create new file` và theo dõi hướng dẫn của [Github](https://docs.github.com/en/free-pro-team@latest/github/building-a-strong-community/adding-a-license-to-a-repository) tại đây, nó rất đơn giản.
![](https://images.viblo.asia/f3776655-7a0a-46ed-a8f3-2585e8d77015.png)


Sau khi bạn xong, viết những dùng command dưới đây để đăng ký với kho lưu trữ từ xa
```
> git pull
...
2 files changed, 24 insertions(+)
create mode 100644 LICENSE
create mode 100644 README.md
```

Làm tốt lắm, chúng ta đã hoàn thành 1 đống việc đó!

## Triển khai pod
Đây là thời gian để viết vài dòng code và triển khai SwiftyLib của chúng ta, như tôi đã đã nhắc từ sớm, tất cả việc triển khai diễn ra bên trong target SwiftyLib. Ở điều hướng project, chuột phải chọn target SwiftyLab và chọn `New File...`

![](https://images.viblo.asia/7c8b675b-4989-4216-9e88-44525fbf76ef.png)


Chọn mẫu `Swift File` , chọn `Next`...

![](https://images.viblo.asia/67dd3870-192d-45ef-ac17-a42ff41d99c3.png)

Đặt tên file là SwiftyLib, và chắc chắn file này thuộc về target SwiftyLib, lưuu nó trong thư mục SwiftyLib như chụp màn hình bên dưới 

![](https://images.viblo.asia/3fb27868-01ca-4ce7-97f5-f795d0c89b02.png)

Hãy cùng edit file `SwiftyLib.swift` mới tạo nào

``` swift
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

Thư viện của chúng ta khá đơn giản! Nó có 2 chức năng chính để tính toán. Lưu file lại. Nhớ rằng, bất cứ khi nào bạn thay đổi file bên trong `SwiftyLib` target, để cho phép sử dụng chúng thì không quên build target `SwiftyLib` ! Chọn nút `Build` hoặc sử dụng bàn phím ⇧⌘R `Shift-Command-R `
![](https://images.viblo.asia/99062529-5da6-4743-aa74-42830499e162.png)

chúng ta triển khai thành công thư viện SwiftyLib, hãy cùng viết 1 vài unit test cases.

## Viết unit tets
Unit testing rất quan trọng để đảm bảo thư viện của bạn chạy trơn tru, và thư viện của chúng ta rất đơn giản, viết unit test rất đơn giản :)

Chỉnh sửa file `SwiftyLibTests.swift`:
``` swift
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

Tại đây, chúng ta chỉ test chức năng `add()`. Chạy unit test bằng việc click task `Test`

![](https://images.viblo.asia/0334dcbd-6bcb-43d0-8ae5-a4a9e01b7ab2.png)

Test case nên thành công, chuyển sang `reports navigator` và kiểm tra tổng quan

![](https://images.viblo.asia/dbfb3c73-8a4c-4829-bf7f-52b625c17330.png)

Và như bạn có thể thấy, tổng qua chỉ 50% vì chúng ta đã không viết unit test cho chức năng `sub()`, hãy cùng làm điều đó

``` swift
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

Giờ hãy chạy test lần nữa, và tổng quan code chúng ta đã được tăng lên 100%!

![](https://images.viblo.asia/b0fb3325-3eb5-4b51-85e0-7ca3cc1211bb.png)

Vào thời điểm này, chúng ta đã có 1 pod khá trơn tru, hãy lưu những thay đổi của mình và đẩy nó lên Github

```
> git add .
> git commit -m "Added test cases"
> git push
```

## Cài đặt Travis CI và Codecow
Bất cứ khi nào chúng ta đẩy thay đổi mới lên Github, chúng ta nên kiểm tra lại thư viện của mình và chắc chắn rằng tất cả trường hợp kiểm tra không xảy ra lỗi

*Travis CI là một dịch vụ tích hợp liên tục được lưu trữ, phân phối được sử dụng để xây dựng và kiểm tra các dự án phần mềm được lưu trữ tại GitHub.*

Chúng ta có thể tận dụng Travis để giúp chúng tôi chạy các trường hợp thử nghiệm và gửi báo cáo về phạm vi mã cho Codecov.

*Codecov là một công cụ báo cáo nhằm xử lý bất kỳ định dạng báo cáo phù hợp nào thành một định dạng tiêu chuẩn trên Codecov. Bạn có thể thay đổi cấu hình về cách Codecov xử lý các báo cáo và thể hiện thông tin về phạm vi.*

Để cho phép Travis nhận bất kỳ thay đổi nào trong kho Github của chúng ta, hãy đồng bộ hóa tài khoản Github của bạn trên Travis và kích hoạt kho lưu trữ SwiftyLib của chúng ta.

![](https://images.viblo.asia/cb9f057e-113b-4561-b6fa-8ef90f66e974.png)

Tạo 1 file `.travis.yml` trong thư mục dự án của chúng ta:

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

Đơn giản, nó cấu trúc Travis chạy unit test trên 2 thiết bị khác nhau với 2 phiên bản iOS khác nhau.
Bạn có thể yêu cầu Travis để kiểm tra trên nhiều thiết bị hơn nữa, nhưng phải chắc chắn rằng phiên bảo của máy ảo iPhone hpopx trợ thiết bị đó, bạn có thể kiểm tra danh sách đầy đủ [tại đây](https://docs.travis-ci.com/user/reference/osx/#xcode-version)
Lưu file `.travis.yml` và đẩy lên Github, kích hoạt bản build trên Travis, bạn sẽ thấy Travis chạy các test case cho commit bạn vừa đăng ký

![](https://images.viblo.asia/ea9a80f9-2492-47ab-9a6f-9e5285a99aea.png)


Tiếp theo, hãy yêu cầu Travis gửi báo cáo tổng quan code cho Codecov. Trước khi chúng ta đi 1 bước lớn, hãy cùng nhìn và xem nhưng gì Travis đã thực hiện. Travis thực thi các dòng script để chạy kiểm tra:
```
> xcodebuild test \
  -enableCodeCoverage YES \
  -project SwiftyLib.xcodeproj \
  -scheme SwiftyLib \
  -sdk $TEST_SDK \
  -destination "platform=iOS Simulator,OS=$OS,name=$NAME" \
  ONLY_ACTIVE_ARCH=YES
```

Nhớ rằng báo cáo tổng quan code được tạo ra cùng với lệnh `xcodebuild test` . Nếu chúng ta tìm hiểu hướng dẫn củaCodecove, chúng ta có thể đơn giản đẩy báo cáo code tổng qua cho Codecov với câu lệnh bên dưới:
```
> bash <(curl -s https://codecov.io/bash) -t {CODECOV_TOKEN}
```

bạn sẽ thấy 1 số báo cáo lạ lẫm và không cần thiết, nhưng chúng ta chỉ cần những báo cáo phù hợp mà đã được xem trong Xcode trước đó

### Slather
Để sửa việc Travis gửi chính xác báo cáo cho Codecov, hãy sử dụng 1 công cụ [Slather](https://github.com/SlatherOrg/slather). Cùng với slather, chúng ta có thể thu thập chính xác và cụ thể những thông tin báo cáo tổng quan mà chúng ta muốn

![](https://images.viblo.asia/1edcc51a-df11-4bc3-b27a-703b5bfeaa98.jpeg)

Đầu tiên, hãy cùng chỉnh sửa file để định nghĩa những thông tin tổng quan, tạo 1 file tên là `.slather.yml` :
``` 
coverage_service: cobertura_xml
xcodeproj: SwiftyLib.xcodeproj
scheme: SwiftyLib
output_directory: reports
ignore:
  - SwiftyLibTests/*
```

Ở đây chúng ta đã yêu cầu slather thu thập thông tin về phạm vi mã từ lược đồ SwiftyLib và vui lòng bỏ qua các mã từ các bài kiểm tra đơn vị.

Giờ thay đổi `.travis.yml` và thêm phần `after_success` để tải lên báo cáo do slather thu thập được lên Codecov sau khi hoàn tất kiểm tra đơn vị.
```
language: objective-c

osx_image: xcode10.1
env:
  matrix:
    - TEST_SDK=iphonesimulator12.1 OS=12.1 NAME='iPhone XR'
    - TEST_SDK=iphonesimulator12.1 OS=12.1 NAME='iPhone 7'

script:
  - set -o pipefail && xcodebuild test -enableCodeCoverage YES -project SwiftyLib.xcodeproj -scheme SwiftyLib -sdk $TEST_SDK -destination "platform=iOS Simulator,OS=$OS,name=$NAME" ONLY_ACTIVE_ARCH=YES

after_success:
  - slather
  - bash <(curl -s https://codecov.io/bash) -f reports/cobertura.xml -X coveragepy -X gcov -X xcode
```

Hãy nhìn 1 log từ Travis, bạn sẽ thấy báo cáo được thu thập bởi slather và gửi lên Codecov
![](https://images.viblo.asia/858ef5d1-c24e-4a2b-911f-2d26f90d7b5d.png)

Bạn có thể kiểm tra chi tiết trong Codecov:
![](https://images.viblo.asia/8ed534fe-e8cb-406b-bcf7-3bf969cc0639.png)

Thật tuyệt, chúng ta làm rất nhiều thứ, pod của chúng ta đã trơn tru và được bảo vệ bởi Travis và Codecov.

## Công bố pod
Cuối cùng, đã đến thời gian huy hoàng! Đầu tiên, cài đặt `cocoapods`.
```
> gem install cocoapods
```

Sau đó tạo 1 file `podspec` để định danh pod của chúng ta, v...v... nơi để tìm thấy mã nguồn.

```
> pod spec create SwiftyLib
...
Specification created at SwiftyLib.podspec
```

Thay đổi file `SwiftyLib.podspec`
``` swift
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

Kiểm tra SwiftyLib.podspec nếu bị lỗi, sửa nó
```
> pod lib lint
...
-> SwiftyLib (0.0.1)
SwiftyLib passed validation.
```

Tốt! Hãy lưu những thay đổi của chúng ta lên Gihub!

```
> git add .
> git commit -m "Added SwiftyLib.podspec"
> git push
```

### Bắt đầu phân loại thư viện của mình nào
Gán tag version chính xác
```
> git tag 0.0.1
> git push origin 0.0.1
```

Và đẩy chúng lên!
```
> pod trunk push
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

Nhứo rằng số version nên trùng với `spec.version`định nghĩa trong `SwiftyLib.podspec`

**Chúc mừng bạn!** Bạn đã công khai 1 thư viện CocoaPod tới cộng đồng mã nguồn mở!
Source mã nguồn project bạn có thể tìm thấy tại [Github](https://github.com/jeantimex/SwiftyLib)