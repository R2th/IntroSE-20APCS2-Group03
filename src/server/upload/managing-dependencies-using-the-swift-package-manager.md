Khi Swift là open source vào cuối năm 2015, một trong những dự án mới đáng ngạc nhiên và thú vị nhất được giới thiệu cùng với nó, là Swift Package Manager. Mặc dù đây không phải là dependency manager đầu tiên cho các dự án Swift, nhưng đây là lần đầu tiên được Apple cung cấp và hỗ trợ chính thức, điều mà nhiều nhà phát triển coi là tin tức thực sự tốt.
Tuy nhiên, trong khi cộng đồng server-side Swift nhanh chóng chấp nhận Swift Package Manager làm công cụ quản lý dependencies khi xây dựng các server application, thì nó làm mất khá nhiều thời gian để được tích hợp hoàn toàn vào các Apple developer toolchains còn lại.
Nhưng bây giờ, bắt đầu với Xcode 11, Swift Package Manager cuối cùng đã trở thành một phần thực sự trong bộ công cụ dành cho nhà phát triển của Apple - vì vậy trong bài viết này, hãy xem cách nó có thể được sử dụng để quản lý các dependencies khác nhau của dự án - cả internal và external.
## The anatomy of a Swift package
Một Swift Package là một nhóm các source file Swift được compiled cùng nhau để tạo thành Module - sau đó có thể được chia sẻ và imported vào các dự án khác dưới dạng một unit. Các package có thể là các public library được chia sẻ bằng các dịch vụ như GitHub hoặc các công cụ và frameworks nội bộ chỉ được chia sẻ trong một số ít dự án.
Nội dung của package được khai báo bằng `Package.swift` manifest file, được đặt trong thư mục gốc của mỗi package. Thay vì sử dụng định dạng dữ liệu, như JSON hoặc XML, các Swift package manifest files được viết bằng mã Swift - với một package instance represent khai báo của package.
Ví dụ: giả sử chúng ta đang làm việc trên một todo list app và chúng ta muốn tạo gói TodoKit cho tất cả logic cốt lõi của chúng ta, được chia sẻ trên ứng dụng - bao gồm những thứ như lớp cơ sở dữ liệu, model code của chúng ta. Để bắt đầu, chúng ta sẽ tạo một thư mục mới và sau đó chúng ta sẽ run `swift package init` trong đó để tạo package của chúng ta:
```
$ mkdir TodoKit
$ cd TodoKit
$ swift package init
```
Bằng cách thực hiện ở trên, Swift Package Manager bây giờ sẽ tạo ra một cấu trúc ban đầu cho package mới của chúng ta - bao gồm `Package.swift` manifest file trông giống như thế này:
```
// swift-tools-version:5.1

import PackageDescription

let package = Package(
    name: "TodoKit",
    products: [
        // The external product of our package is an importable
        // library that has the same name as the package itself:
        .library(
            name: "TodoKit",
            targets: ["TodoKit"]
        )
    ],
    targets: [
        // Our package contains two targets, one for our library
        // code, and one for our tests:
        .target(name: "TodoKit"),
        .testTarget(
            name: "TodoKitTests",
            dependencies: ["TodoKit"]
        )
    ]
)
```
Theo mặc định, Swift Package Manager sẽ khớp tên của các targets được xác định trong manifest file của chúng ta, với các thư mục tương ứng trên disk để xác định Swift file nào thuộc về từng target. Hành vi đó, cùng với các mặc định khác - chẳng hạn như build settings, target platforms, v.v. - có thể được overridden bằng cách chuyển các tham số bổ sung cho các API được sử dụng ở trên.
## Adding remote dependencies
Bên cạnh việc tạo điều kiện cho việc tạo các package, một trong các trường hợp sử dụng chủ yếu của Swift Package Manager là cho phép các remote dependencies - chẳng hạn như third party libraries - được thêm vào dự án. Bất kỳ package nào có thể được fetch thông qua Git có thể được thêm vào chỉ bằng cách chỉ định URL của nó, cũng như các ràng buộc phiên bản mà chúng ta muốn áp dụng cho nó:
```
let package = Package(
    ...
    dependencies: [
        // Here we define our package's external dependencies
        // and from where they can be fetched:
        .package(
            url: "https://github.com/johnsundell/files.git", 
            from: "4.0.0"
        )
    ],
    targets: [
        .target(
            name: "TodoKit",
            // Here we add our new dependency to our main target,
            // which lets us import it within that target's code:
            dependencies: ["Files"]
        ),
        .testTarget(
            name: "TodoKitTests",
            dependencies: ["TodoKit"]
        )
    ]
)
```
Ở trên chúng ta nhập bất kỳ phiên bản nào của Files package trong khoảng 4.0.0 đến 5.0.0 - set version của package đó cho Swift Package Manager để giải quyết phiên bản phù hợp nhất thỏa mãn dependency tổng thể của chúng ta, nêú không mặc định sẽ là phiên bản mới nhất trong phạm vi đó .
Sử dụng một broad version constraint như vậy có thể thực sự mạnh mẽ, vì nếu chúng ta thêm một dependency khác yêu cầu một file version cụ thể,  package manager sẽ tự do chọn phiên bản đó (miễn là trong phạm vi phiên bản được phép của chúng ta)
Tuy nhiên, đôi khi chúng tôi có thể muốn sử dụng một version cụ thể của một trong những dependency của chúng ta - có lẽ để tránh hồi quy được giới thiệu trong version mới hơn hoặc có thể tiếp tục sử dụng API đã bị xóa sau đó. Để làm điều đó, chúng ta có thể thay thế tham số `from:` bằng  `.exact ` version yêu cầu- như thế này:
```
.package(
    url: "https://github.com/johnsundell/files.git",
    .exact("4.0.0")
)
```
Mặt khác, thay vào đó, chúng ta có thể muốn sử dụng một dependency revision mà mới hơn latest official release - ví dụ để bao gồm một bản sửa lỗi hoặc một API mới chưa được release. Để làm điều đó, chúng ta có hai lựa chọn.
Tùy chọn đầu tiên là chỉ ra sử dụng dependency của chúng ta vào một nhánh Git cụ thể (có thể khá rủi ro nếu nhánh đó thay đổi nhanh chóng) hoặc dùng một commit hash cụ thể (ít rủi ro hơn, nhưng cũng kém linh hoạt hơn, vì chúng ta sẽ phải tự thay đổi commit hash đó mỗi lần chúng tôi muốn cập nhật dependency đó):
```
// Depending on a branch (master in this case):
.package(
    url: "https://github.com/johnsundell/files.git",
    .branch("master")
)

// Depending on an exact commit:
.package(
    url: "https://github.com/johnsundell/files.git",
    .revision("0e0c6aca147add5d5750ecb7810837ef4fd10fc2")
)
```
Có thể chỉ định các dependency không chỉ theo version, mà cả Git revision, cũng có thể thực sự hữu ích để tạm thời fetch một dependency từ kforked repository, thay vì từ bản gốc.
Ví dụ, chúng ta đã phát hiện ra một lỗi trong một trong những external dependencies của chúng ta và rằng chúng ta đã thực hiện sửa lỗi trong phạm vi của dự án đó. Thay vì phải đợi bản sửa lỗi đó được merged và release - chúng ta có thể chỉ cần sử dụng dependency từ URL của fork project, sau đó chỉ định `master` làm targer branch, để có thể sử dụng trực tiếp bản sửa lỗi của chúng ta.
## Using local packages
Khi làm việc song song trên nhiều package khác nhau, ví dụ như khi chia một dự án thành nhiều thư viện nhỏ hơn, việc sử dụng các local dependency đôi khi có thể thực sự hữu ích - và cải thiện đáng kể thời gian lặp.
Thay vì được tải xuống từ một URL, các local package dependencies chỉ được thêm trực tiếp từ một thư mục trên đĩa - cả hai đều cho phép chúng tôi import các package của riêng mình mà không phải lo lắng về version, và cũng cho phép chúng ta chỉnh sửa trực tiếp các file nguồn của dependency trong dự án đó và sử dụng nó.
Ví dụ: ở đây, cách chúng ta có thể thêm local package `CalendarKit` làm dependency vào TodoKit - chỉ đơn giản bằng cách chỉ định đường dẫn thư mục của nó:
```
let package = Package(
    ...
    dependencies: [
        .package(
            url: "https://github.com/johnsundell/files.git",
            .exact("4.0.0")
        ),
        // Using 'path', we can depend on a local package that's
        // located at a given path relative to our package's folder:
        .package(path: "../CalendarKit")
    ],
    targets: [
        .target(
            name: "TodoKit",
            dependencies: ["Files", "CalendarKit"]
        ),
        .testTarget(
            name: "TodoKitTests",
            dependencies: ["TodoKit"]
        )
    ]
)
```
Bên cạnh việc có thể chỉnh sửa trực tiếp các dependencies, các local package references cũng thực sự hữu ích khi xây dựng các công cụ dành cho nhà phát triển. Ví dụ: chúng ta có thể sử dụng Swift Package Manager để xây dựng [build a command line tool](https://www.swiftbysundell.com/articles/building-a-command-line-tool-using-the-swift-package-manager/) trong app repository, sau đó sử dụng một local dependency để import một số code trong ứng dụng của chúng tôi vào công cụ đó - ví dụ như model hoặc networking code của chúng tôi.
## Platform and OS version constraints
Ngoài các internal packages và third party libraries mà chúng ta đã bổ sung vào dự án, code của chúng ta rất có thể sẽ phụ thuộc vào một loạt các nền tảng và phiên bản hệ điều hành cụ thể - để có quyền truy cập vào các API và system frameworks phù hợp.
Mặc dù tất cả các Swift package được coi là đa nền tảng theo mặc định, bằng cách thêm tham số `platform` khi khởi tạo `Package` trong manifest file, chúng ta có thể hạn chế code của mình để chỉ hỗ trợ một bộ phiên bản nền tảng và hệ điều hành nhất định - như thế này, nếu chúng ta muốn xây dựng package chứa code dành riêng cho iOS 13:
```
// swift-tools-version:5.1

import PackageDescription

let package = Package(
    name: "TodoSwiftUIComponents",
    platforms: [.iOS(.v13)],
    ...
)
```
Giống như khi chọn minimum deployment target cho một ứng dụng trong Xcode, sử dụng tham số `platforms` cho phép chúng ta sử dụng các API chỉ khả dụng trên một tập hợp con của các nền tảng hoặc phiên bản hệ điều hành - như SwiftUI hoặc Combine. Tất nhiên chúng ta cũng có thể chỉ định nhiều nền tảng và phiên bản - ví dụ: chúng ta có thể nối thêm `.macOS (.v10_15)` vào mảng trên để thêm hỗ trợ cho macOS Catalina.
## Adding packages to an Xcode project
Bắt đầu từ Xcode 11, giờ đây các Swift package có thể được thêm và import trực tiếp vào app project bằng cách sử dụng Swift `Packages option` mới của Xcode, nằm trong `File` menu. Sử dụng tích hợp mới này cho phép chúng ta dễ dàng import third party libraries dưới dạng các Swift package và nó cũng có thể cho phép chúng ta tận dụng sức mạnh của Swift Package Manager để cải thiện modularity của  code base.
Bằng cách tạo các packages riêng cho các phần khác nhau của code base - giống như các ví dụ TodoKit, CalendarKit và TodoSwiftUIComponents từ trước - chúng ta có thể cải thiện việc phân tách các mối quan tâm trong ứng dụng của mình và cũng cho phép code của chúng tôi dễ dàng được sử dụng lại trên các nền tảng khác nhau hoặc extension.
Ví dụ: bằng cách xác định các thành phần UI của chúng ta trong separate package từ model code của chúng ta, không có nguy cơ vô tình mix view code với model code - điều này có thể giúp chúng ta duy trì kiến trúc vững chắc hơn theo thời gian - và nó cũng cho phép chúng ta dễ dàng chia sẻ thành phần UI cốt lõi giữa nhiều target.
## Conclusion
Mặc dù Trình Swift Package Manager không thực sự là một công cụ hoàn toàn mới nữa, nhưng thực tế là giờ đây nó có thể được sử dụng cho các ứng dụng trên tất cả các nền tảng của Apple. Điều đó mang lại cho nó sự hấp dẫn rộng rãi hơn. Có thể sử dụng cùng một package manager để xây dựng mọi thứ từ các ứng dụng server-side , đến các command line tools và scripts, cho các ứng dụng iOS, cũng cực kỳ mạnh mẽ - và cho phép các phần của code của chúng ta được sử dụng lại trong nhiều ngữ cảnh hơn.

Reference: https://www.swiftbysundell.com/articles/managing-dependencies-using-the-swift-package-manager/#platform-and-os-version-constraints

Mong bài viết sẽ có ích với các bạn