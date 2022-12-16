### Let's start:
Mở Xcode và tạo một WorkSpace mới. Bạn không thể thực hiện việc này từ màn hình Chào mừng của Xcode, nhưng bạn có thể sử dụng phím tắt ⌃ ⌘ N (control + command + n). Tạo một thư mục trống mới và gọi nó là modules. Bạn có thể chọn một tên khác, nhưng đối với bài viết này, tôi sẽ sử dụng modules.

Thêm một dự án mới vào WorkSpace này bằng ⇧ ⌘ N (shift + command + n). Trong hộp thoại mở, chọn mẫu iOS App template và gọi nó là main.

![](https://images.viblo.asia/4271fa35-6e09-46eb-8f3f-986c5275aa8a.png)

Đảm bảo bạn tạo nó trong thư mục modules và cũng chọn thêm nó vào app WorkSpace và app group.
Add another new project, but now select the iOS Framework template and call it core. Create this in the modules folder too and also add it to the app workspace and app group.
Thêm một project mới khác, nhưng bây giờ hãy chọn iOS Framework template và gọi nó là core. Tạo điều này trong thư mục modules và cũng thêm nó vào app workspace và app group.

Cấu trúc thư mục của bạn bây giờ sẽ giống như sau:
![](https://images.viblo.asia/38177bc9-66e7-4802-992b-54d67b597558.png)

### Link it together
Đã đến lúc link core project/module với main project.
![](https://images.viblo.asia/cfbcd8b9-22c8-40a5-8d53-3f4dce2dd4d3.png)
Chọn main target của main project và kéo và thả core.framework vào section Frameworks, Libraries, và Embedded Content.

### A simple test
Để kiểm tra nó, hãy tạo một tệp Swift mới (⌘ N) trong core project bằng method đơn giản sau:
```
import Foundation

public func name() -> String {
    return "Ralph"
}
```
Trong main project, hãy thay đổi ContentView.swift. Thêm import core statement và call method name():
```
import SwiftUI
import core

struct ContentView: View {
    var body: some View {
        Text("Hello, \(name())!").padding()
    }
}
```
![](https://images.viblo.asia/3475972e-35bd-41fd-81e6-cfe8f0cdd8fc.png)
Xcode có thể hiển thị lỗi liên quan đến minimum deployment target. Để khắc phục điều này, hãy thay đổi nó thành 13.0 trong cả main và core projects.
![](https://images.viblo.asia/4824f85e-2df6-4f30-b2f3-c05c00b42fd6.png)

### Add dependencies

Hiện tại, tôi đang sử dụng CocoaPods để quản lý dependency vì tôi không quá quen thuộc với Swift Packages.
Trong thư mục modules, tạo tệp Podfile với content này và call pod install.
```
workspace 'app.xcworkspace'
platform :ios, '13.0'
use_frameworks!

def core_pods
  pod 'SwiftDate', '~> 6.3.1'
end

def main_pods
  # add pods for the main target here
end

target 'core' do
  project 'core/core.xcodeproj'
  
  core_pods
end

target 'main' do
  project 'main/main.xcodeproj'
  
  core_pods
  main_pods
end
```

Lệnh pod install khởi tạo CocoaPods cho workspace này (vì chúng ta chưa làm điều đó cho đến nay) và thêm SwiftDate pod như một dependency vào core project.

Bây giờ chúng ta có thể sử dụng SwiftDate (tôi chỉ sử dụng cái này để chỉ cách thêm một dependency). Thay đổi tệp ContentView.swift và Name.swift trong core project như sau:

**ContentView.Swift**
```
import SwiftUI
import core

struct ContentView: View {
    var body: some View {
        Text("Today in one year is: \(nextYear())").padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
```

**Name.Swift**
```
import Foundation
import SwiftDate

public func nextYear() -> String {
    let nextYear = (Date() + 1.years)
    return nextYear.weekdayName(.default)
}
```

![](https://images.viblo.asia/6a360aea-e02d-4ef9-9c91-fc988dd4c4f9.png)

### Done
Bạn có thể tìm thấy dự án hoàn thiện tại: https://github.com/the4thfloor/xcode-submodules

Nguồn tham khảo: [Sub-modules for Xcode](https://medium.com/karlmax-berlin/sub-modules-for-xcode-acb6b1e5f567)