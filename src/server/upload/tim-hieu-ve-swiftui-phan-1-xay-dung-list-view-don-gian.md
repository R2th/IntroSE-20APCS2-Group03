# I. Giới thiệu
Trong wwdc 2019, trong tất cả những features mới Apple giới thiệu, thì SwiftUI chính là thứ hay ho và tuyệt vời nhất. Dành cho những bạn chưa biết, SwiftUI là một framework mới sử dụng cho tất cả nền tảng của Apple từ iOS, Mac OS, iPad OS, tvOS, … Framework này được sử dụng để xây dựng giao diện bằng code, thay thế cho UIKit và storyboard trên iOS. 

“Cái gì cơ? viết bằng code thay cho storyboard? đang dựng giao diện trực quan lại đi dựng view bằng code làm gì cho tù?” đó là những câu hỏi đầu tiên chúng ta sẽ đặt ra khi nghe nói về SwiftUI. Thực tế thì không, dùng SwiftUI không hề tù tí nào, mà còn rất nhiều lợi thế là đằng khác. Một vài lợi thế lớn nhất của SwiftUI có thể kể ra như sau:
* Vẫn dựng giao diện bằng cách kéo thả được. Từ giao diện kéo thả sẽ tạo thành file code. Tương tự như storyboard, nhưng có mấy ai vào đọc code của storyboard bao giờ =))
* Automitic preview: chúng ta có thể code, sau đó xem ngay được giao diện đó sẽ hiển thị lên như thế nào mà không cần phải build simulator để test. Giống như code web vậy.
* Code đơn giản trực quan: Trước đây, dựng giao diện bằng code với UIKit rất mất công, phải viết rất nhiều code. Vì vậy chúng ta cần file xib và storyboard để đỡ mất công. Code trên SwiftUI đơn giản hơn rất nhiều.
* Sử dụng các thư viện của Apple như Dynamic type, Dark mode, Localization,.. Nếu đã dùng Localization thì các bạn cũng biết rồi đấy, mình toàn phải viết Localization trong code, chứ dùng trong storyboard tù vãi.
* Support bởi Apple: SwiftUI cũng là framework như UIKit, tuy nhiên Apple giới thiệu SwiftUI là để dần dần thay thế cho UIKit. Trong tương lai, SwiftUI sẽ được nâng cấp thêm nhiều nữa, và UIKit rất có thể sẽ bị khai tử sau này.

Trong bài viết này, chúng ta sẽ tìm hiểu cách sử dụng UISwift để tạo một trong những view cơ bản nhất của iOS: UITableView. Table view là thứ quá đỗi quen thuộc với dev iOS, tuy nhiên trong tương lai, chúng ta không còn UITableView nữa, thứ chúng ta dùng trong SwiftUI là List view.

# II. Nội dung

## 1. Làm quen với SwiftUI

### a. Tạo Project

Các bạn cần sử dụng Xcode 11 và MacOS Catalina để có thể làm việc với SwiftUI. các máy có thể nâng cấp lên MacOS Catalina là các máy có chip intel ivy bridge trở lên, nếu máy của bạn không lên được Catalina thì xin chia buồn, bạn nên nâng cấp máy đi thôi.

Các bạn mở Xcode, tạo project với tên SwiftUITutorial, languague Swift, user interface là SwiftUI và tạo project (như ảnh dưới)

![](https://images.viblo.asia/9fa0a551-93dd-47f6-9f99-4f1f0d6bfaee.png)

### b. Tìm hiểu project structure

Nhìn vào Project navigator (hình dưới) chúng ta sẽ thấy một project khá lạ lẫm, chỉ có AppDelegate.swift là quen thuộc, còn ViewController.swift và Main.storyboard không còn nữa. Thay vào đó là 2 file SceneDelegate.swift và ContentView.swift.

![](https://images.viblo.asia/427f15c8-69a8-4d79-8b0b-ab29889088de.png)

Khi chạy, code sẽ lần lượt chạy qua AppDelegate, SceneDelegate và ContentView. ContentView chính là nơi chúng ta sẽ viết code để thêm giao diện. Để ý trong SceneDelegate có đoạn code sau:
```Swift
		let contentView = ContentView()

        // Use a UIHostingController as window root view controller.
        if let windowScene = scene as? UIWindowScene {
            let window = UIWindow(windowScene: windowScene)
            window.rootViewController = UIHostingController(rootView: contentView)
            self.window = window
            window.makeKeyAndVisible()
        }
```

Có thể thấy trong code trên, ContentView được gán là rootView của UIHostingController, và UIHostingController được gán vào rootViewController của UIWindow

### c. Thao tác với SwiftUI
Mở file ContentView.swift lên, các bạn sẽ thấy ngoài màn hình code ra, chúng ta còn một màn preview bên phải như hình sau:

![](https://images.viblo.asia/5df232f6-48ae-40fa-95c8-e8b8ea7d5e5d.png)

Mỗi khi chúng ta thêm code vào bên trái, kết quả của nó sẽ được hiển thị ngay trên preview bên phải. Nếu preview không tự động hiển thị, các bạn bấm vào nút resume để màn hình preview được tự động hiển thị.

Trong struct ContentView:
```Swift
struct ContentView: View {
    var body: some View {
        Text("Hello World")
    }
}
```
Bên trong property body là nơi chúng ta viết code để hiển thị view. Như trong hình trên, màn hình với chữ Hello World đặt chính giữa được xây dựng với chỉ 1 dòng code cực kỳ đơn giản.

Bây giờ, chúng ta sẽ thêm 1 text nữa cho body, các bạn có thể làm việc này bằng cách kéo thả text vào preview đơn giản như sau:
* Bấm vào icon dấu “+” phía trên bên phải để một cửa sổ danh sách các view hiện ra (hình bên dưới)
* Gõ vào ô search tìm kiếm text
* Kéo thả text vào màn hình preview bên dưới chữ “Hello world”

![](https://images.viblo.asia/a3631a52-e958-4001-bdf4-5e11cd0d4410.png)

Vậy là chúng ta đã có màn hình gồm 2 dòng text, rất đơn giản. Nhìn lại vào code của ContentView, code trong body đã thay đổi như sau:
```Swift
struct ContentView: View {
    var body: some View {
        VStack {
            Text("Hello World")
            Text("Placeholder")
        }
    }
}
```

VStack là một vertical stack giống UIStackView. Các bạn chú ý là trong body chỉ được viết 1 loại view, ở đây là VStack. Giả sử chúng ta thêm text vào như sau sẽ báo lỗi:
```Swift
struct ContentView: View {
    var body: some View {
        Text("Hello World")
        Text("Placeholder")
    }
}
```
Nguyên nhân gây ra lỗi là bên trong getter của body chỉ được trả về một View thôi, đoạn code với VStack viết đầy đủ sẽ phải là như sau:
```Swift
struct ContentView: View {
    var body: some View {
        return VStack {
            Text("Hello World")
            Text("Placeholder")
        }
    }
}
```

Nếu không muốn kéo thả, các bạn hoàn toàn có thể code đoạn code  trên, sau khi code xong thì bên preview cũng sẽ hiển thị tương tự như khi chúng ta kéo thả View. 

Hiện tại, 2 dòng text đang được căn giữa của stack, do 2 chữ trên dài gần bằng nhau nên không có khác biệt. Các bạn có thể đổi "Placeholder" bằng "Placeholder 222222"  để thấy sự khác biệt. Bây giờ, chúng ta sẽ thử căn trái VStack, các bạn lần lượt làm các bước:
* Nhấn nút command và click chuột trái để hiển thị danh sách các action
* Bấm vào dòng “Show SwiftUI Inspector…” để hiển thị bảng inspector của VStack
* Để ý phần alignment trong section Vertical Stack, có 3 lựa chọn căn trái, giữa, phải. Chọn căn trái (hình dưới)

![](https://images.viblo.asia/db14f223-4285-4117-854f-ec5f523a9062.png)

Sau khi chọn, cả code và preview sẽ được thay đổi như hình sau:

![](https://images.viblo.asia/b5903ccc-6031-4eb3-a264-cddb2cec22ac.png)

Để ý trong code VStack có thêm đoạn `alignment: .leading`. Một lần nữa, chúng ta hoàn toàn có thể thêm code này để căn trái cho VStack mà không cần phải qua các bước bên trên. Tuy nhiên khi mới sử dụng SwiftUI, chúng ta vẫn nên sử dụng tool vì đơn giản là chúng ta chưa biết syntax code :D

## 2. Implement List View

### a. Thêm data

Đầu tiên, chúng ta cần có data để hiển thị trong list. Các bạn tạo file Swift mới với tên Phone.swift và nội dung như sau:
```Swift
import Foundation

struct Phone: Identifiable {
    var id = UUID()
    var name: String
    var price: String
}

let phoneData = [
    Phone(name: "iPhone 11 Pro Max", price: "1099$"),
    Phone(name: "iPhone 11 Pro", price: "999$"),
    Phone(name: "iPhone 11", price: "699$"),
    Phone(name: "iPhone XR", price: "599$"),
    Phone(name: "iPhone 8", price: "449$")
]
```
Code bên trên rất đơn giản, tôi viết 1 struct Phone, và 1 array phoneData để dùng trong List View.

### b. Thêm List View Cell

Các bạn vào File -> New -> File… và chọn SwiftUI View (hình dưới), đặt tên là PhoneCell. Sau khi tạo, chúng ta sẽ được file PhoneCell.swift. 

![](https://images.viblo.asia/72ce036b-fe95-48d6-a2f8-273ac594b212.png)

Các bạn implement file này với code sau:
```Swift
import SwiftUI

struct PhoneCell: View {
	// 1
    var phone: Phone
    
    var body: some View {
        VStack(alignment: .leading) {
			// 2
            Text(phone.name)
            Text(phone.price)
        }
    }
}

struct PhoneCell_Previews: PreviewProvider {
    static var previews: some View {
		// 3
        PhoneCell(phone: phoneData[0])
    }
}
```
Trong đoạn code trên, chúng ta lần lượt làm các việc sau:

* 1. Khai báo biến phone để chứa data cho cell
* 2. Truyền name và price của phone data vào Text
* 3. Truyền dữ liệu test cho preview. Màn hình preview chúng ta nhìn thấy phía bên phải thực chất là do PreviewProvider tạo ra. 

### c. Implement List View

Tiếp theo, chúng ta sửa file ContentView.swift như sau:
```Swift
import SwiftUI

struct ContentView: View {
	// 1
    var phones = [Phone]()
    
    var body: some View {
		// 2
        List(phones) { phone in
            VStack(alignment: .leading) {
				// 3
            		Text(phone.name)
            		Text(phone.price)
        		}
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
		// 4
        ContentView(phones: phoneData)
    }
}
```
Bên trên, chúng ta lần lượt làm các việc:
* 1. Khai báo một array để chứa danh sách data cho list.
* 2. Thêm list. Bên trên tôi đã đề cập, để thêm list cho View chúng ta có 3 cách: 
     * command + chuột trái vào VStack, chọn Embed in List
     * bấm vào nút “+” bên phải, tìm kiếm list rồi kéo vào preview. cách này không khả thi lắm khi cần để View trong List
     * code, cứ code như bên trên là được :D.
* 3. Gán data cho các text trong VStack.
* 4. khởi tạo giá trị để phục vụ cho màn preview.

Trong code trên, đoạn số 2 chúng ta đã viết trong PhoneCell, vì thế chúng ta có thể viết lại ContentView như sau:
```Swift
struct ContentView: View {
    var phones = [Phone]()
    
    var body: some View {
        List(phones) { phone in
            PhoneCell(phone: phone)
        }
    }
}
```
Vậy là List view của chúng ta đã được viết xong, cả code và giao diện. Không cần phải dựng view, kéo IBOutlet, không phải viết các hàm datasource, chỉ đơn giản mấy dòng code bên trên là chúng ta có một list như tableview. 

# III. Tổng kết
Bên trên, tôi đã giới thiệu đến các bạn những bước cơ bản nhất để sử dụng SwiftUI. Khi mới bắt đầu, SwiftUI có cách viết hoàn toàn mới, chúng ta có cảm giác lạ lẫm như thể đang code một cái gì khác chứ không phải iOS. Thời điểm hiện tại, SwiftUI vẫn còn tương đối sơ khai, còn nhiều thứ Apple phải cải tiến, và cần thời gian để cộng đồng xây dựng các thư viện dựa trên nó. Tuy nhiên, tiềm năng của SwiftUI là rất lớn, nó sẽ giúp ích cho chúng ta rất nhiều trong tương lai trong việc cải thiện độ phức tạp code, thời gian viết code,…

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day :)