Hôm nay chúng ta cùng tìm hiểu làm thế nào để tạo ra một hệ thống plugin sử dụng dynamic libraries và sức mạnh của Swift, modular frameworks trên server-side.

### The magic of dynamic linking

handmade frameworks iOS thường được đi kèm với các ứng dụng riêng của mình, bạn có thể học khá nhiều về một frameworks nếu bạn biết một số công cụ dòng lệnh. Lần này chúng tôi chỉ sẽ tập trung vào static và dynamic linking. Theo mặc định Swift package dependencies  được liên kết tĩnh vào ứng dụng của bạn, nhưng bạn có thể thay đổi điều này nếu bạn xác định một sản phẩm thư viện năng động.

Đầu tiên chúng ta sẽ tạo ra một giao diện Plugin chia sẻ chứa các API plugin như một giao thức.

```
// swift-tools-version:5.2
import PackageDescription

let package = Package(
    name: "PluginInterface",
    products: [
        .library(name: "PluginInterface", type: .dynamic, targets: ["PluginInterface"]),
    ],
    targets: [
        .target(name: "PluginInterface", dependencies: []),
    ]
)
```

dynamic PluginInterface này có thể tạo ra một .dylib hoặc .so tập tin, chẳng bao lâu sẽ có một phiên bản .dll là tốt, dựa trên hệ điều hành. Tất cả các mã kèm vào thư viện năng động này có thể được chia sẻ giữa các ứng dụng khác. Chúng ta hãy làm một giao thức đơn giản.

```
public protocol PluginInterface {

    func foo() -> String
}

```

Kể từ khi chúng tôi đang đi để nạp plugin tự động chúng tôi sẽ cần một cái gì đó giống như một người xây dựng để xây dựng các đối tượng mong muốn. Chúng ta có thể sử dụng một lớp trừu tượng mới cho mục đích này.

```
open class PluginBuilder {
    
    public init() {}

    open func build() -> PluginInterface {
        fatalError("You have to override this method.")
    }
}
```

Đó là thư viện giao diện năng động Plugin của chúng tôi, cảm thấy tự do để đẩy này cho remote repository.

### Building a dynamic plugin

```
// swift-tools-version:5.2
import PackageDescription

let package = Package(
    name: "PluginA",
    products: [
        .library(name: "PluginA", type: .dynamic, targets: ["PluginA"]),
    ],
    dependencies: [
        .package(url: "path/to/the/PluginInterface/repository", from: "1.0.0"),
    ],
    targets: [
        .target(name: "PluginA", dependencies: [
            .product(name: "PluginInterface", package: "PluginInterface")
        ]),
    ]
)
```

Việc thực hiện plugin của trình sẽ thực hiện các giao thức PluginInterface. Bạn có thể mở rộng giao thức này dựa trên nhu cầu của bạn, bạn cũng có thể sử dụng các khuôn khổ khác như phụ thuộc.
```
import PluginInterface

struct PluginA: PluginInterface {

    func foo() -> String {
        return "A"
    }
}

```

Chúng ta phải phân lớp lớp PluginBuilder và trở về thực hiện cắm của chúng tôi. Chúng tôi sẽ sử dụng @_cdecl do tạo chức năng để truy cập builder Plugin của chúng tôi từ các ứng dụng cốt lõi. Thuộc tính Swift này cho trình biên dịch để cứu chức năng của chúng tôi theo "createPlugin" tên biểu tượng.
```
import PluginInterface

@_cdecl("createPlugin")
public func createPlugin() -> UnsafeMutableRawPointer {
    return Unmanaged.passRetained(PluginABuilder()).toOpaque()
}

final class PluginABuilder: PluginBuilder {

    override func build() -> PluginInterface {
        PluginA()
    }
}
```

Chúng tôi có thể xây dựng các plugin bằng cách sử dụng dòng lệnh, chỉ cần chạy nhanh chóng xây dựng trong thư mục dự án. Bây giờ bạn có thể tìm thấy các tập tin dylib theo đường dẫn nhị phân, cảm thấy tự do để chạy nhanh chóng xây dựng --show-bin-path, ý chí đầu ra này vào thư mục cần thiết. Chúng tôi sẽ cần cả hai file .dylib để sử dụng sau.
### Loading the plugin at runtime
Các ứng dụng cốt lõi cũng sẽ sử dụng giao diện cắm như một sự phụ thuộc.
```
// swift-tools-version:5.2
import PackageDescription

let package = Package(
    name: "CoreApp",
    dependencies: [
        .package(url: "path/to/the/PluginInterface/repository", from: "1.0.0"),
    ],
    targets: [
        .target(name: "CoreApp", dependencies: [
            .product(name: "PluginInterface", package: "PluginInterface")
        ]),
    ]
)
```

Đây là một mục tiêu thực thi, vì vậy chúng tôi có thể đặt logic nạp vào file main.swift.
```
import Foundation
import PluginInterface

typealias InitFunction = @convention(c) () -> UnsafeMutableRawPointer

func plugin(at path: String) -> PluginInterface {
    let openRes = dlopen(path, RTLD_NOW|RTLD_LOCAL)
    if openRes != nil {
        defer {
            dlclose(openRes)
        }

        let symbolName = "createPlugin"
        let sym = dlsym(openRes, symbolName)

        if sym != nil {
            let f: InitFunction = unsafeBitCast(sym, to: InitFunction.self)
            let pluginPointer = f()
            let builder = Unmanaged<PluginBuilder>.fromOpaque(pluginPointer).takeRetainedValue()
            return builder.build()
        }
        else {
            fatalError("error loading lib: symbol \(symbolName) not found, path: \(path)")
        }
    }
    else {
        if let err = dlerror() {
            fatalError("error opening lib: \(String(format: "%s", err)), path: \(path)")
        }
        else {
            fatalError("error opening lib: unknown error, path: \(path)")
        }
    }
}

let myPlugin = plugin(at: "path/to/my/plugin/libPluginA.dylib")
let a = myPlugin.foo()
print(a)
```

Chúng ta có thể sử dụng chức năng dlopen để mở các tập tin thư viện động, sau đó chúng tôi đang cố gắng để có được những biểu tượng createPlugin sử dụng phương pháp dlsym. Nếu chúng ta có một con trỏ chúng ta vẫn cần phải cast đó vào một đối tượng PluginBuilder hợp lệ, sau đó chúng ta có thể gọi việc xây dựng phương pháp và trở về giao diện plugin.

### Running the app

Bây giờ nếu bạn cố gắng để chạy ứng dụng này sử dụng Xcode bạn sẽ nhận được một cảnh báo như thế này:
>warning:
>
>  Class _TtC15PluginInterface13PluginBuilder is implemented in both...
One of the two will be used. Which one is undefined.

Điều này liên quan đến một lỗi cũ, nhưng may mắn thay đó đã được giải quyết. Lần này Xcode là kẻ xấu, vì nó đang cố gắng để liên kết tất cả mọi thứ như một sự phụ thuộc tĩnh. Bây giờ nếu bạn xây dựng các ứng dụng thông qua dòng lệnh (nhanh chóng xây dựng) và đặt các file sau trong cùng một thư mục:

* CoreApp
* libPluginA.dylib
* libPluginInterface.dylib

Bạn có thể chạy các ứng dụng ./CoreApp không xảy vấn đề nữa. Ứng dụng sẽ in ra A mà không thông báo cảnh báo, kể từ khi người quản lý gói Swift được thừa nhận rằng bạn muốn liên kết khuôn khổ libPluginInterface như một khung năng động, vì vậy nó sẽ không được nhúng vào nhị phân ứng dụng.

Cám ơn các bạn đã quan tâm tới bài viết, bài viết này được dịch theo [bài viết cùng tên của tác giả Tibor Bödecs](https://theswiftdev.com/building-and-loading-dynamic-libraries-at-runtime-in-swift/).