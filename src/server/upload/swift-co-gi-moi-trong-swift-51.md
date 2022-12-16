Tin tốt: Swift 5.1 hiện đã có sẵn trong Xcode 11 beta! Bản phát hành này mang lại sự ổn định mô-đun và cải thiện ngôn ngữ với các tính năng quan trọng. 
Trong hướng dẫn này, bạn sẽ tìm hiểu về những gì mới trong Swift 5.1. Bạn sẽ cần Xcode 11 beta để hoạt động với Swift 5.1, vì vậy hãy tiếp tục và cài đặt nó trước khi bắt đầu nhé.

## Các loại Opaque Result
Bạn có thể sử dụng các protocol làm kiểu trả về cho các hàm trong Swift 5.

Khi Playground của bạn mở, hãy mở Project Navigator bằng cách điều hướng đến View ▸ Navigators ▸ Show Project Navigator. Nhấp chuột phải vào thư mục Sources, chọn New File và đặt tên tệp là BlogPost. Thay thế nội dung của tệp mới, định nghĩa protocol mới có tên BlogPost.
```
public protocol BlogPost {
  var title: String { get }
  var author: String { get }
}
```

Nhấp chuột phải vào trên cùng Playground và chọn New Playground Page. Đổi tên Playground mới là Opaque Tutorials và dán cái này vào đó:
```
// 1
struct Tutorial: BlogPost {
  let title: String
  let author: String
}

// 2
func createBlogPost(title: String, author: String) -> BlogPost {
  guard !title.isEmpty && !author.isEmpty else {
    fatalError("No title and/or author assigned!")
  }
  return Tutorial(title: title, author: author)
}

// 3
let swift4Tutorial = createBlogPost(title: "What's new in Swift 4.2?",
                                    author: "Cosmin Pupăză")
let swift5Tutorial = createBlogPost(title: "What's new in Swift 5?", 
                                    author: "Cosmin Pupăză")
```

Từng bước:

1. Khai báo `title` và `author` cho `Tutorial` kể từ khi `Tutorial` implement `BlogPost`.

2. Kiểm tra xem `title` và `author` có hợp lệ không và trả về `Tutorial` từ `createdBlogPost(title: author:)` nếu test success.

3. Sử dụng `createBlogPost(title:author:)` để tạo `swift4Tutorial` và `swift5Tutorial`.

Nhấp chuột phải vào trên cùng playground và chọn New Playground Page. Đổi tên playground mới là Opaque Screencasts và dán cái này vào đó:

```
struct Screencast: BlogPost {
  let title: String
  let author: String
}

func createBlogPost(title: String, author: String) -> BlogPost {
  guard !title.isEmpty && !author.isEmpty else {
    fatalError("No title and/or author assigned!")
  }
  return Screencast(title: title, author: author)
}

let swift4Screencast = createBlogPost(title: "What's new in Swift 4.2?", 
                                      author: "Josh Steele")           
let swift5Screencast = createBlogPost(title: "What's new in Swift 5?", 
                                      author: "Josh Steele")
```

Screencast thực hiện BlogPost, vì vậy bạn trả lại Screencast từ `createBlogPost(title:author:)` và sử dụng `createBlogPost(title:author:)` để tạo swift4Screencast và swift5Screencast.

Điều hướng đến BlogPost.swift trong thư mục Sources và làm cho BlogPost tuân thủ `Equatable`.

```
public protocol BlogPost: Equatable {
  var title: String { get }
  var author: String { get }
}
```

Tại thời điểm này, bạn sẽ nhận được một lỗi rằng BlogPost chỉ có thể được sử dụng như một ràng buộc chung. Điều này là do `Equatable` có một loại liên quan là `Self`. 

Trong trang Opaque Tutorials, thêm một số vào kiểu trả về của createdBlogPost, nó trả về một BlogPost.
```
func createBlogPost(title: String, author: String) -> some BlogPost {
```
Tương tự, trong trang Opaque Screencasts, sử dụng `some` để báo cho trình biên dịch `createdBlogPost` trả về một số loại BlogPost.
```
func createBlogPost(title: String, author: String) -> some BlogPost {
```

Bạn có thể trả về bất kỳ loại cụ thể nào implement `BlogPost` từ `createBlogPost: Tutorial` hoặc `Screencast` trong trường hợp này.

Bây giờ, bạn có thể kiểm tra xem các Tutorial và screencasts được tạo trước đó có giống nhau không. Ở dưới cùng của **Opaque Tutorials**, dán phần sau để kiểm tra xem `swift4Tutorial` và `swift5Tutorial` có giống nhau không.
```
let sameTutorial = swift4Tutorial == swift5Tutorial
```
Ở dưới cùng của **Opaque Screencasts**, dán phần sau để kiểm tra xem `swift4Screencast` và `swift5Screencast` có phải là giống nhau không
```
let sameScreencast = swift4Screencast == swift5Screencast
```

## Khởi tạo giá trị mặc định trong Struct
Mặc định, Swift 5 không đặt giá trị ban đầu cho các thuộc tính trong Struct, do đó bạn phải xác định các giá trị mặc định tùy chỉnh cho chúng trong init:
```
struct Author {
  let name: String
  var tutorialCount: Int

  init(name: String, tutorialCount: Int = 0) {
    self.name = name
    self.tutorialCount = tutorialCount
  }
}

let author = Author(name: "George")
```
Tại đây, bạn đặt `tutorialCount` thành 0 nếu `author` đã vượt qua thử thách và tham gia nhóm hướng dẫn trên trang web.

Swift 5.1 cho phép bạn trực tiếp đặt giá trị mặc định cho các thuộc tính trong Struct, do đó không cần phải khởi tạo tùy chỉnh nữa:
```
struct Author {
  let name: String
  var tutorialCount = 0
}
```
Mã này sạch hơn và đơn giản hơn.

## Self cho các Static Member
Bạn có thể sử dụng `Self` để tham chiếu các thành viên tĩnh của kiểu dữ liệu trong Swift 5, bạn phải sử dụng tên loại đó để sử dụng:
```
struct Editor {
  static func reviewGuidelines() {
    print("Review editing guidelines.")
  }

  func edit() {
    Editor.reviewGuidelines()
    print("Ready for editing!")
  }
}

let editor = Editor()
editor.edit()
```

Bạn có thể viết lại toàn bộ nội dung bằng Self trong Swift 5.1:
```
struct Editor {
  static func reviewGuidelines() {
    print("Review editing guidelines.")
  }

  func edit() {
    Self.reviewGuidelines()
    print("Ready for editing!")
  }
}
```
Bạn sử dụng `Self` để gọi `reviewGuiances()`.

## Tạo các mảng chưa được khởi tạo
Bạn có thể tạo các mảng chưa được khởi tạo trong Swift 5.1:
```
// 1
let randomSwitches = Array<String>(unsafeUninitializedCapacity: 5) {
  buffer, count in
  // 2
  for i in 0..<5 {
    buffer[i] = Bool.random() ? "on" : "off"
  }
  // 3
  count = 5
}
```

Từng bước:
1. Sử dụng `init(unsafeUninitializedCapacity:initializingWith:)`để tạo `randomSwitches` với công suất ban đầu nhất định.

2. Lặp lại `randomSwitches` và đặt từng trạng thái chuyển đổi cho `random()`.

3. Đặt số lượng phần tử khởi tạo cho `randomSwitches`.

## Keypath cho Tuple
Bạn có thể sử dụng các ketpath cho Tuple trong Swift 5.1:
```
// 1
struct Instrument {
  let brand: String
  let year: Int
  let details: (type: String, pitch: String)
}

// 2
let instrument = Instrument(brand: "Roland",
                            year: 2019,
                            details: (type: "acoustic", pitch: "C"))
let type = instrument[keyPath: \Instrument.details.type]
let pitch = instrument[keyPath: \Instrument.details.pitch]
```

Step:

1. Khai báo `brand`, `year` and `details` cho `Instrument`.

2. Sử dụng các keypath để có được `type` và `pitch` từ `details` trong `instrument`.

## Case không rõ ràng trong Enum

Swift 5.1 tạo cảnh báo cho các trường hợp liệt kê không rõ ràng:
```
// 1
enum TutorialStyle {
  case cookbook, stepByStep, none
}

// 2
let style: TutorialStyle? = .none
```

Đây là cách thức hoạt động của nó:

1. Xác định các kiểu khác nhau cho `TutorialStyle`.

2. Swift đưa ra một cảnh báo vì nó không rõ ràng với trình biên dịch .none có nghĩa là gì trong trường hợp này: `Optional.none` hoặc `TutorialStyle.none`.


Trên là một số thứ mới trong bản cập nhật Swift 5.1 lần này. Cảm ơn các bạn nhiều vì đã quan tâm và theo dõi!