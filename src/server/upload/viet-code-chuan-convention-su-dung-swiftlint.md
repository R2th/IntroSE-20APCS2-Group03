Đã bao giờ bạn gặp phải trường hợp mà khi bạn đang rất thoải mái code theo phong cách của mình, nhưng đột nhiên, bạn phải làm việc với nhiều developer khác nữa?

Khi đó không phải ai cũng sẽ thoải mái với phong cách code của bạn, bởi vì mỗi chúng ta đều có cách tiếp cận riêng. Bạn có thể tưởng tượng một nhóm có mười developer lập trình mà codebase không theo bất kỳ một khuôn mẫu nào? Nó sẽ là một cơn ác mộng! Và đó cũng là lúc người hùng SwiftLint đến giải cứu bạn. Trong bài viết này, chúng ta sẽ cùng nhau tìm hiểu về SwiftLint và xem nó có sức mạnh ghê gớm như thế nào nhé.
# 1. Code Coventions
Coding conventions là tập hợp những nguyên tắc chung khi lập trình nhằm làm cho code dễ đọc, dễ hiểu, từ đó dễ quản lý, bảo trì project hơn.

**Một vài ví dụ về code convention trên swift:**

```swift
// Đúng
if user.isHappy {
    //Do something
} else {
    //Do something else
}

// Sai
if user.isHappy
{
    //Do something
}
else {
    //Do something else
}
```

```swift
// Đúng
var namesOfIntegers = [Int: String]()

// Sai
var namesOfIntegers: [Int: String] = [Int: String]()
```

```swift
// Đúng
class ArticleData {
    var createdAt: NSDate { return NSDate() }
}

// Sai
class ArticleData {
    var createdAt: NSDate { 
        get {
            return NSDate() 
        }
    }
}
```

# 2. SwiftLint là gì?
SwiftLint là một công cụ để bắt code tuân thủ theo swift style và conventions. Việc giữ một codebase nhất quán và có thể duy trì trong một dự án với một nhóm các nhà phát triển đôi khi sẽ rất khó khăn do các style và conventions khác nhau dẫn đến hầu hết các ứng dụng rất khó để debug và rất khó hiểu cho nhà phát triển mới gia nhập dự án.
# 3. Cài đặt
## 2.1. Cách 1: 
Bạn có thể cài đặt SwiftLint bằng cách tải xuống tệp **SwiftLint.pkg** từ trang [GitHub](https://github.com/realm/SwiftLint/release) và chạy nó. Trong quá trình cài đặt, bạn có thể thấy cảnh báo dưới đây:

![](https://images.viblo.asia/6701ca9c-1271-44e9-807f-864bb308272e.png)

Trong trường hợp này, bạn cần cấp quyền truy cập cho SwiftLint bằng cách nhấp vào nút "Open Anyway" trong Preferences - Security & Privacy.

![](https://images.viblo.asia/35968e0a-47e4-491a-8349-5266cbf2f9fa.png)

## 2.2. Cách 2:
Nếu máy bạn có cài đặt Homebrew - một trình quản lý ứng dụng phần mềm rất phổ biến trên hệ điều hành macOS thì bạn có thể cài đặt SwiftLint nhanh chóng thông qua câu lệnh:
```
brew install swiftlint
```

# 4. Tích hợp vào Xcode
Sau khi bạn đã hoàn thành việc cài đặt, tiếp đến chúng ta cần cấu hình cho project của mình chạy lệnh SwiftLint. Đầu tiên, chúng ta cần phải tạo một **Run Script Phase** trên project của mình.

![](https://images.viblo.asia/d738fe2b-a49f-4a3f-85b8-45e7afe7288f.png)

Và dán đoạn mã sau:

```swift
if which swiftlint >/dev/null; then
  swiftlint
else
  echo "warning: SwiftLint not installed, download from https://github.com/realm/SwiftLint"
fi
```

![](https://images.viblo.asia/4019c792-d7c9-498b-b98b-d98f572f5853.png)

Bây giờ bạn có thể build (⌘ + B) project của mình và sẽ thấy các lỗi và thông báo về conventions được hiển thị rõ ràng ngay trên Xcode. Nó sẽ được hiển thị giống ảnh dưới đây:

![](https://images.viblo.asia/54fd10cb-e126-4b22-8e69-15154471bade.png)

Bây giờ bạn có thể dễ dàng fix lỗi conventions rồi.
# 5. Cấu hình SwiftLint
Khi bạn tích hợp SwiftLint trong project đã cài đặt Pod thì chúng ta sẽ hiển thị rất nhiều lỗi và thông báo do swiftlint đã kiểm tra convention cả các thư viện từ pod nữa. Vậy thì chúng ta phải làm sao để loại bỏ chúng? Đừng lo lắng, swiftlint có hỗ trợ cấu hình các rule (quy tắc) để cài đặt chỗ nào kiểm tra hay chỗ nào không. 

Để cấu hình SwiftLint chúng ta cần thêm tệp **.swiftlint.yml** trong thư mục gốc project của bạn.
Ví dụ để loại bỏ các lỗi và thông báo từ các thư viện trong Pod thì chúng ta chỉ thêm nội dung sau vào file .swiftlint.yml: 
```
excluded:
  - Pods
```

Vậy là xong, giờ chúng ta có thể tạm biệt các thông báo từ Pod rồi :).

![](https://i.gifer.com/LFpx.gif)

SwiftLint hỗ trợ rất nhiều quy tắc, bạn có thể xem đầy đủ chúng [tại đây](https://github.com/realm/SwiftLint/blob/master/Rules.md). 
Bên dưới là file cấu hình swiftlint mà mình sử dụng để các bạn tham khảo:

```swift
disabled_rules: # các rule loại bỏ
  - trailing_whitespace
opt_in_rules: # các rule được thêm vào
  - control_statement
  - empty_count
  - trailing_newline
  - colon
  - comma
excluded: # đường dẫn bỏ qua việc kiểm tra
  - Pods

# hiển thị warning khi sử dụng force casting
force_cast: warning
force_try:
  severity: warning
  
# giới hạn
function_body_length:
  warning: 50
  error: 60
line_length: 120

reporter: "xcode"
```

Trên đây, mình đã chia sẻ với các bạn cách sử dụng SwiftLint để viết codebase chuẩn theo convention. Hi vọng bài viết này sẽ hữu ích đối với các bạn.
# 6. Tài liệu tham khảo
1. Medium. 2019. SwiftLint introduction tutorial – Cocoa Academy – Medium. [ONLINE] Available at: https://medium.com/cocoaacademymag/swiftlint-introduction-tutorial-cd692d41dda3. [Accessed 19 February 2019].

2. GitHub. 2019. Coding Standards · framgia/coding-standards · GitHub. [ONLINE] Available at: https://github.com/framgia/coding-standards/blob/master/eng/swift/coding_convention.md. [Accessed 19 February 2019].

3. GitHub. 2019. GitHub - realm/SwiftLint: A tool to enforce Swift style and conventions.. [ONLINE] Available at: https://github.com/realm/SwiftLint. [Accessed 19 February 2019].