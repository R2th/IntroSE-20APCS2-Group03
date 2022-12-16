Đối với lập trình viên iOS, khi nhắc đến ngôn ngữ Swift, đa phần đều nghĩ đến viết ứng dụng cho iPhone, iPad hay MacOS. Nhưng bao giờ bạn đã nghĩ rằng viết ứng dụng để xử lý dữ liệu qua terminal bằng Swift chưa? Với Swift, điều này hoàn toàn có thể hiện thực và bây giờ đã có một số thư viện giúp xây dựng và xử lý Command Line rất hữu ích. Hôm nay chúng ta sẽ thử viết một ứng dụng xử lý dòng lệnh đơn giản.

Trước khi bắt đầu, tôi muốn giới thiệu cho bạn biết danh sách [awesomeiOS trên GitHub](https://github.com/tranhanhuy/awesome-ios#command-line).

# Kiểm tra phiên bản

Kiểm tra phiên bản Swift đang sử dụng trên máy của bạn. Bạn có thể kiểm tra bằng lệnh `swift --version` như hình sau.

![](https://images.viblo.asia/333cb6df-6027-45df-9843-6acf6ba6a5d0.png)

# Xây dựng ứng dụng
## Khởi tạo

Bây giờ tôi sẽ tạo một gói Package bằng Command Line `swift package init --type executable`. Kết quả như sau:

![](https://images.viblo.asia/0bd58629-c9e9-414d-a592-e7c7605d8cd9.png)

Như các bạn thấy, trong hình sẽ có một file `Package.swift` được tạo ra. Tập tin này chứa ba thành phần quan trọng của gói.
* **Products:** các tập thực thi và thư viện là sản phẩm của package.
* **Dependecies:** Các bộ thư viện khác được sử dụng trong package.
* **Targets:** Đây là các khối cơ bản của package như testing, module...

Bây giờ, bạn hãy mở file `main.swift` trong thư mục source. Bạn chỉ thấy có 1 dòng lệnh

`print ("Hello, world!")`

Bây giờ chúng ta chạy thử để xem kết quả ra sao nhé. Trước khi thực thi thì chúng ta nên chạy lệnh `swift build` để đảm bảo trình biên dịch xử lý thành công và không xảy ra vấn đề gì.

![](https://images.viblo.asia/a87e857e-10ac-4bae-8b39-54f53ba25fc2.png)

Giờ thì chạy lệnh `swift run` để xem kết quả nhé.

![](https://images.viblo.asia/26f54d2f-3819-43f9-b59d-4dbeb049b4e9.png)

## Thêm gói phụ thuộc

Mở file `package.swift`, thêm package và sửa trong targets.  

Tôi sẽ lấy ví dụ [Swift Argument Parser ](https://github.com/apple/swift-argument-parser)để hiện thực. Để hiểu rõ về thư viện này, bạn hãy nghiên cứu thêm nhé.

Bạn có thể tham khảo thêm [Swift Package Management ](https://www.swiftbysundell.com/articles/managing-dependencies-using-the-swift-package-manager/)để biết cách chỉnh sửa file `package.swift` nhé.

```
import PackageDescription

let package = Package(
    name: "ExampleApp",
    dependencies: [
        // Dependencies declare other packages that this package depends on.
        // .package(url: /* package url */, from: "1.0.0"),
        .package(url: "https://github.com/apple/swift-argument-parser", from: "0.0.1")
    ],
    targets: [
        // Targets are the basic building blocks of a package. A target can define a module or a test suite.
        // Targets can depend on other targets in this package, and on products in packages which this package depends on.
        .target(
            name: "ExampleApp",
            dependencies: [.product(name: "ArgumentParser", package: "swift-argument-parser")]),
        .testTarget(
            name: "ExampleAppTests",
            dependencies: ["ExampleApp"]),
    ]
)
```


Sau khi hoàn thành bước này, bạn hãy thử chạy swift build để xem kết quả nhé.

## Xử lý

Tôi sẽ làm bài phép toán CỘNG, TRỪ, NHÂN, CHIA đơn giản. Tôi xử lý ở file `main.swift` như sau:

```
import ArgumentParser

struct ReadPreference: ParsableCommand {
  
    public static let configuration = CommandConfiguration(abstract: "Tinh toan +, -, *, /")

    @Argument(help: "So thu 1")
    private var so1: Double

    @Argument(help: "So thu 2")
    private var so2: Double

    @Argument(help: "Phep tinh")
    private var phepTinh: String

    func run() throws {
        switch phepTinh {
        case "+":
            print("Ket qua: \(self.phepCong())")
        case "-":
            print("Ket qua: \(self.phepTru())")
        case "*":
            print("Ket qua: \(self.phepNhan())")
        case "/":
            print("Ket qua: \(self.phepChia())")
        default:
            print("Chuong trinh chua ho tro")
        }
    }
    
    func phepCong() -> Double {
        return so1 + so2
    }
    
    func phepTru() -> Double {
        return so1 / so2
    }
    
    func phepNhan() -> Double {
        return so1 * so2
    }
    
    func phepChia() -> Double {
        return so1 / so2
    }
}

ReadPreference.main()
```

Bây giờ tôi sẽ chạy thử cho bạn xem.

Chạy `swift build` trước, sau đó chạy `swift run` để xem các tham số cần truyền vào trong app.

![](https://images.viblo.asia/dc387ae4-0cf7-4a89-b56f-2b5368582ac4.png)

Bây giờ, tôi sẽ chạy để thực hiện phép tính. `swift run ExampleApp 1 2 +`

* 1: tương đương với tham số: so1
* 2: tương đương với tham số: so2
* +: tương đương với tham số: phepTinh

Kết quả ra sao?
![](https://images.viblo.asia/abc682ac-ea0f-4cd6-8bc3-17b5a1b6c0e1.png)

## Release 
Sau khi làm xong App, rõ ràng bạn sẽ muốn cài đặt nó và dùng thực tế. Chúng ta sẽ tiến hành release. Thao tác tiếp theo sẽ tạo file thực thi bên trong `.build/release` thư mục. Để thực sự sử dụng, mình cần sao chép nó vào `/usr/local/bin` thư mục.

```
swift build --configuration release
cp -f .build/release/ExampleApp /usr/local/bin/ExampleApp
```

Giờ thì app chúng ta đã thành công cụ rồi.
![](https://images.viblo.asia/5798dda3-9225-4b0a-90bc-9e8dfd9dc473.png)


Bây giờ bạn có thể bắt đầu sử dụng công cụ dòng lệnh của mình từ trong bất kỳ thư mục nào từ terminal. Bạn không cần phải xây dựng hoặc chạy nó trước khi sử dụng nó. 

## Publishing 

Để publish ứng dụng của bạn, bạn chỉ cần tạo một Tag release trên Git của bạn.

**Nguồn tham khảo:**

https://medium.com/quick-code/lets-build-a-command-line-app-in-swift-328ce274f1cc
https://www.avanderlee.com/swift/command-line-tool-package-manager/