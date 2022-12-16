# Giới thiệu
Trong [bài viết](https://viblo.asia/p/ios-adding-swift-package-dependencies-to-ios-app-Ljy5V17jlra) trước, tôi cùng với các bạn cùng nhau tìm hiểu **Swift Package Manager** là gì và cách để thêm nó vào trong iOS project rồi. Trong bài này chúng ta sẽ cùng nhau tìm hiểu làm thế nào để tạo ra 1 **Swift Package Manager**.

# Swift Package framework creation 
## Generating your own Swift Package
Có 2 cách mà bạn có thể tạo Swift Package: sử dụng Terminal hoặc sử dụng Xcode.
### Tạo Swift Package bằng Terminal
Để tạo một Package bằng Terminal bạn sử dụng câu lệnh sau đây:

```
$ mkdir SwiftLeePackage
$ cd SwiftleePackage
$ swift package init
```

Ở ví dụ này, chúng ta đã tạo một Package với tên là “SwiftLeePackage”. Sau khi chạy các câu lệnh trên thì chúng ta sẽ thấy một thư viện được in ra trong terminal với log như sau:

```
Creating library package: SwiftLeePackage
Creating Package.swift
Creating README.md
Creating .gitignore
Creating Sources/
Creating Sources/SwiftLeePackage/SwiftLeePackage.swift
Creating Tests/
Creating Tests/LinuxMain.swift
Creating Tests/SwiftLeePackageTests/
Creating Tests/SwiftLeePackageTests/SwiftLeePackageTests.swift
Creating Tests/SwiftLeePackageTests/XCTestManifests.swift
```

Bạn có thể thấy, nó tạo ra các file cơ bản mà chúng ta cần cho Package, bao gồm cả Test. Bạn có thể khám phá SwiftLeePackage của mình và chạy thử nghiệm bằng cách mở *Package.swift* sẽ mở package của bạn trong Xcode. Bạn có thể sử dụng 2 câu lệnh sau để test và build Package:

```
$ swift build
$ swift test
```

### Tạo Swift Package bằng Xcode
Với cách trên nếu bạn cảm thấy không trực quan hoặc khó khăn thì bây giờ Xcode 11 đã support để bạn có thế tạo Package cực kì đơn giản. Mở Xcode ➞   File ➞ New ➞ Swift Package... chọn tên của Package như trên là "SwiftLeePackage" => bạn đã tạo được một Swift Package rồi. Ở đây bạn cũng có thể edit, test, build package của mình trực tiếp bằng Xcode, đơn giản hơn rất nhiều phải không nào.

![](https://images.viblo.asia/1f244c72-95b1-4e5b-86d2-e597ca0f0a1d.png)

### Thêm các hỗ trợ platforms vào Swift Package
Theo mặc định, Swift Package Manager sẽ chỉ định phiên bản triển khai tối thiểu được xác định trước cho mỗi nền tảng được hỗ trợ. Nếu Package của bạn chỉ hỗ trợ các nền tảng cụ thể hoặc các phiên bản cụ thể của nền tảng, bạn có thể thêm cấu hình đó vào tệp gói của mình bằng thuộc tính ***platforms***.

Trong ví dụ sau, chúng tôi bổ sung hỗ trợ cho macOS, watchOS, tvOS và iOS:

```
// swift-tools-version:5.1
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "SwiftLeePackage",
    platforms: [
        // Add support for all platforms starting from a specific version.
        .macOS(.v10_15),
        .iOS(.v11),
        .watchOS(.v5),
        .tvOS(.v11)
    ],
    products: [
        .library(name: "SwiftLeePackage", targets: ["SwiftLeePackage"])
    ],
    targets: [
        .target(name: "SwiftLeePackage", dependencies: []),
        .testTarget(name: "SwiftLeePackageTests", dependencies: ["SwiftLeePackage"])
    ]
)
```

Nếu bạn muốn chỉ thêm hỗ trợ cho iOS 11 trở lên, bạn có thể thay đổi thuộc tính nền tảng như sau:
```
platforms: [
    // Only add support for iOS 11 and up.
    .iOS(.v11)
]
```
Điều này sẽ chỉ ra cho developer rằng *Package* sẽ không hỗ trợ tất cả các nền tảng khác.

### Thêm các dependencies khác vào Package

Swift Package cho phép bạn có thể thêm các dependencies khác vào trong Package của mình. Bạn có thể làm điều này bằng cách sử dụng thuộc tính *dependencies* và tham chiếu đến dependency đó mà bạn có quyền truy cập. 

Ví dụ: chúng tôi có thể thêm Mocker Framwork:

```
// swift-tools-version:5.1
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "SwiftLeePackage",
    platforms: [
        // Only add support for iOS 11 and up.
        .iOS(.v11)
    ],
    products: [
        .library(name: "SwiftLeePackage", targets: ["SwiftLeePackage"])
    ],
    dependencies: [
        /// Define the Mocker dependency:
        .package(url: "https://github.com/WeTransfer/Mocker.git", from: "2.0.0")
    ],
    targets: [
        .target(name: "SwiftLeePackage", dependencies: []),
        /// Add it to your test target in the dependencies array:
        .testTarget(name: "SwiftLeePackageTests", dependencies: ["SwiftLeePackage", "Mocker"])
    ]
)
```

Ở ví dụ này, chúng ta đã thêm *Mocker framework* và báo cho người quản lý Package rằng sẽ tự động fetch các version khác cao hơn *2.0.0*, có nghĩa là nếu có version mới ví dụ 2.0.1, 2.1.0 thì sẽ tự động kéo về, nhưng không phải là 3.0.0 vì đó là phiên bản chính tiếp theo mà có khả năng chứa các thay đổi đáng kể. 
Có rất nhiều tùy chọn ở đây để thêm các yêu cầu cụ thể về *dependency* của bạn, như sử dụng phạm vi hoặc phiên bản chính xác:

```
.package(url: "https://github.com/WeTransfer/Mocker.git", from: "2.0.0"),
.package(url: "https://github.com/WeTransfer/Mocker.git", "2.0.0"..<"2.5.0"),
.package(url: "https://github.com/WeTransfer/Mocker.git", .exact("2.0.0")),
.package(url: "https://github.com/WeTransfer/Mocker.git", .upToNextMajor(from: "2.0.0")),
.package(url: "https://github.com/WeTransfer/Mocker.git", .upToNextMinor(from: "2.0.0"))
```
Bạn cũng có thể sử dụng chính xác branch của *dependency* mà bạn muốn:
```
.package(url: "https://github.com/WeTransfer/Mocker.git", .branch("development")),
.package(url: "https://github.com/WeTransfer/Mocker.git", .revision("e74b07278b926c9ec6f9643455ea00d1ce04a021"))
```
hoặc sử dụng dưới local của device:
```
.package(path: "/your/local/package/path")
```

### Publishing your Swift Package
Sau khi tạo, sửa, thêm các file, setup các thuộc tính của Swift Package, bạn có thể sử dụng chúng dưới local hoặc có thể push lên git để chia sẻ chúng ... Như vậy là xong, bạn đã có một Swift Package Manager của riêng mình rồi đó, khá đơn giản phải không nào?

# Kết luận
Trên đây tôi cùng với các bạn đã cùng nhau tìm hiểu làm thế nào để tạo ra một **Swift Package Manager**, tôi nghĩ rằng **Swift Package Manager** sẽ dần thay thế Cocoapods/Carthage trong thời gian tới. Vậy hãy thử nghiệm **Swift Package Manager** cho quá trình developement đỡ nhàm chán nhé! :)

Nguồn: (https://www.avanderlee.com/swift/creating-swift-package-manager-framework/)