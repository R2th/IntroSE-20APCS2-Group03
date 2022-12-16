![](https://images.viblo.asia/d6388f1c-909c-4310-a857-93741dd0c0b4.jpeg)
## #Mở đầu
Tại sự kiện WWDC 2019, Apple đã giới thiệu một thay đổi lớn đối với các lập trình viên iOS đó là **SwiftUI** - bộ toolkit cho phép các nhà phát triển thiết kế các ứng dụng declarative UI (thay vì imperative UI như trước đây -  dùng oultet, storyboard.. ) trên cả iOS, MacOS, TvOS .
## #SwiftUI
Trước khi tìm hiểu **SwiftUI** mình xin lưu ý vớ các bạn về **Imperative** và **Declarative** programming:
* **Imperative programming**:  telling the “machine” how to do something, and as a result what you want to happen will happen.
* **Declarative programming**:  telling the “machine” what you would like to happen, and let the computer figure out how to do it.

Sự khác nhau ở đây là "**how**" và "**what**" , với imperative programming chúng ta sẽ chỉ ra các bước, cách thức thực hiện để cho ra input như mong muốn, còn declarative chúng ta chỉ cần nói input mong muốn còn lại mọi việc machine sẽ xử lý. Liên tưởng đến việc nhờ đứa em lấy giúp quyển sách:
 * **Imperative programming**: bước xuống giường, xuống cầu thang, quẹo phải, mở tủ sách, lấy sách tên...
 * **Declarative programming**: lấy giúp tao quyển sách đê =)) 
 
 
**SwiftUI** là một frameworks giúp tạo ra các declarative UI, tức là deveoloper chỉ cần định nghĩa ra  giao diện mong muốn, mọi việc resize, scale, self-sizing... SwiftUI sẽ xử lý :v:

Một số ưu điểm của **SwiftUI**:
* Sử dụng declarative syntax rất "hiện đại", quen thuộc với các bạn đã từng làm Flutter hoặc React.
* Support Self-sizing.
* Code ngắn gọn dễ hiểu.
* Có thể tổ chức view kiểu component nên dễ dàng reuse.
* Tự động update UI khi data state thay đổi.
* Hỗ trợ dynamic type và dark mode.

## #Basic View
Trong bài viết này mình sẽ giới thiệu với các bạn một số đối tượng View cơ bản trong SwiftUI:

### Text

```swift
Text("SwiftUI")
    .color(.orange)
    .bold()
    .font(.system(.largeTitle))
    .fontWeight(.medium)
    .italic()
    .shadow(color: .black, radius: 1, x: 0, y: 2)
```


Example:
![](https://images.viblo.asia/e0ac4a64-5b86-4b2f-b1d1-85c296ecb5d4.png)

### TextField - SecureField

```swift

TextField(self.$name, placeholder: self.nameText, 
onEditingChanged: { changed in
    print("onEditing: \(changed)")
}) {
    print("userName: \(self.name)")
    self.endEditing(true)
}}
.padding(10)
.frame(height: 50)
.textFieldStyle(.roundedBorder)
.padding(EdgeInsets(top: 0, leading: 20, bottom: 0, trailing: 20))

```

Example:
![](https://images.viblo.asia/c3f896b3-cb81-431e-ad6a-68bfe601dd2a.png)

### WebImage

```swift
var body: some View {
        Image(uiImage: self.uiImage ?? placeholderImage)
            .resizable()
            .onAppear(perform: downloadWebImage)
            .frame(width: Length(80),
                   height: Length(80),
                   alignment: .center)
            .tapAction {
                print("Tap ")
        }
    }
```

Example:
![](https://images.viblo.asia/13d27286-78ea-4ba1-a56a-69614eebf6dc.png)

### Button

```swift
Button(action: {
    print("Tap")
}) {
   Text("I'm a Button")
}
```

Example:
![](https://images.viblo.asia/0f3246c6-36c7-4642-9eda-c137ddc188a9.png)

### Picker
```swift
Picker(selection: $leftIndex, label: Text("Picker")) {
    ForEach(0..<leftSource.count) {
        Text(self.leftSource[$0]).tag($0)
    }
 }.frame(width: UIScreen.main.bounds.width/2)
```     

Example:
![](https://images.viblo.asia/91bdfafe-bfe0-49f3-914c-a87bdbf5310f.png)

### DatePicker
```swift
DatePicker(
    $server.date,
    minimumDate: Calendar.current.date(byAdding: .year,
                                       value: -1,
                                       to: server.date),
    maximumDate: Calendar.current.date(byAdding: .year,
                                       value: 1,
                                       to: server.date),
    displayedComponents: .date
)
```   

Example:
![](https://images.viblo.asia/5e07df79-8abe-4bc4-a6fc-618acb6b90f6.png)

### Slider
```swift
    Slider(value: $data.rating)
```   

Example:
![](https://images.viblo.asia/8e14db35-5f69-4ceb-996b-1500968ad801.png)

### Stepper
```swift
Stepper(value: $value, step: 2, onEditingChanged: { c in
    print(c)
}) {
    Text("Stepper Value: \(self.value)")
}.padding(50)
```   

Example:
![](https://images.viblo.asia/e8c277d6-9629-4fd7-9681-453cb2fc87b0.png)

### SegmentedControl
```swift
SegmentedControl(selection: $currentIndex) {
    ForEach(0..<items.count) { index in
        Text(self.items[index]).tag(index)
    }
    }.tapAction {
        print("currentIndex: \(self.currentIndex)")
}
```   

Example:
![](https://images.viblo.asia/07bc176b-2464-4e2c-8994-2289d167a4de.png)

### WebView
```swift
struct WebViewPage : UIViewRepresentable {
    func makeUIView(context: Context) -> WKWebView  {
        return WKWebView()
    }
    
    func updateUIView(_ uiView: WKWebView, context: Context) {
        let req = URLRequest(url: URL(string: "https://www.apple.com")!)
        uiView.load(req)
    }
}
```   
Example:
![](https://images.viblo.asia/375cf634-1359-4001-a401-5530fb5dcc3b.png)

### List
```swift
List(0..<5) { item in
    Text("Hello World !")
}.navigationBarTitle(Text("List"), displayMode: .large)
```   
Example:
![](https://images.viblo.asia/853cba0b-338e-4597-a438-d218341fa479.png)

### NavigationView
```swift
NavigationView {
    Text("🧚‍♂️🧚‍♀️🧜‍♂️🧜‍♀️🧞‍♂️🧞‍♀️").blur(radius: 5)
    Text("Swifter Swifter").bold().color(.orange).font(.largeTitle)
}.navigationBarTitle(Text("NavigationView"))
```   

Example:
![](https://images.viblo.asia/d592bb40-0b1d-46b1-8ae2-5ef6e855092b.png)

### TabBar
```swift
TabbedView(selection: $index) {
    ForEach(0 ..< imgs.count) { item in
        TabItemPage(index: item)
            .tabItemLabel(Image(self.imgs[item]))
            .tag(item)
    }
}
```  

Example:
![](https://images.viblo.asia/bee5a34d-5f73-4b5d-b90a-c8c783aac5ba.png)

### Alert
```swift
presentation($showsAlert,
        alert: {
                Alert(title: Text("Hello"))
       })
```  

Example:
![](https://images.viblo.asia/4d87f020-b02e-4c7f-b851-189335ae1c2e.png)

### ActionSheet
```swift
ActionSheet(title: Text("Title"),
            message: Text("Message"),
            buttons:
    [.default(Text("Default"), onTrigger: {
        print("Default")
        self.showSheet = false
    }),.destructive(Text("destructive"), onTrigger: {
        print("destructive")
        self.showSheet = false
    }),.cancel({
        print("Cancel")
        self.showSheet = false
    })])
```  

Example:
![](https://images.viblo.asia/50dd0ea5-3419-4d30-9ca5-15c23b62cd71.png)

## #Kết
Trên đây là bài giới thiệu cơ bản về **SwiftUI**, dễ dàng nhận thấy **SwiftUI** sẽ mang đến cho chúng ta một phong cách thiết kế ứng dụng khác với trước đây, việc xây dựng giao diện sẽ nhanh chóng và ngắn gọn hơn, việc binding dữ liệu cũng trở nên nhẹ nhàng hơn trước. Tuy nhiên vì chỉ hoạt động trên iOS 13 trở về sau nên việc áp dụng **SwiftUI** trong các project sẽ còn phải đợi 1 - 2 năm nửa, nhưng chúng ta nên đầu tư từ bây giờ để sau này khỏi phải bỡ ngỡ, chắc chắn  **SwiftUI** sẽ là một cái gì đó rất là này nọ để giúp cho việc phát triển các ứng dụng iOS trở nên "trong sáng" và dễ dàng hơn.

Ở phần sau mình sẽ giới thiệu với các bạn về cách layout với **SwiftUI**, hẹn gặp lại .

Link tham khảo: https://github.com/Jinxiansen/SwiftUI