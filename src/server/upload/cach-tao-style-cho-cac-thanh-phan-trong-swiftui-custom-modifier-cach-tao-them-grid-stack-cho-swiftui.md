## Tui muốn tạo style riêng cho Buttom hoặc Text hoặc tạo 1 BG có gắn Watermark của riêng tui thì làm ntn?
### Tạo Style đơn giản cho Text để sử dụng lại cho tiện ?

**Step 1**: Tạo Style Title sử dụng ViewModifier như sau:

```swift
struct Title: ViewModifier {
    func body(content: Content) -> some View {
        content
            .font(.largeTitle)
            .foregroundColor(.white)
            .padding()
            .background(Color.blue)
            .clipShape(RoundedRectangle(cornerRadius: 10))
    }
}
```

**Step2**: Trong body ở View cần hiển thị, add thêm modifier vào phần Text ("Hello world") như sau:

```swift
Text("Hello World")
    .modifier(Title())
```

Kết quả:
![](https://images.viblo.asia/18a64d48-05cc-4f04-bb8e-0ef3465d70f3.jpg)

### Tạo Style Pro giống như kiểu của SwiftUI tạo ra : `.padding()` hoặc `.background(Color.blue)` ntn?

Wrap `.modifier(Title())` phía trên thành style giống như của SwiftUI : `.titleStyle()` như đoạn code dưới:

```swift
extension View {
    func titleStyle() -> some View {
        self.modifier(Title())
    }
}
```

Và sử dụng :

```swift
Text("Hello World")
    .titleStyle()
```

### Tạo Watermark Style như nào ?

Tương tự như cách tạo style cho Text phía trên, các bước làm như sau:

**Step 1**: Tạo style ViewModifier & Wrap nó với extension mới của View:

```swift
struct Watermark: ViewModifier {
    var text: String

    func body(content: Content) -> some View {
        ZStack(alignment: .bottomTrailing) {
            content
            Text(text)
                .font(.caption)
                .foregroundColor(.white)
                .padding(5)
                .background(Color.black)
        }
    }
}

extension View {
    func watermarked(with text: String) -> some View {
        self.modifier(Watermark(text: text))
    }
}
```

**Step 2**: Sử dụng trong View:

```swift
Color.blue
    .frame(width: 300, height: 200)
    .watermarked(with: "quilv.com")
```

Kết quả:
![](https://images.viblo.asia/736b714d-fe75-43e6-b288-1c6a91ef6a16.png)


Source code demo: https://github.com/QuiLeVan/SwiftUICutomModifierAndStack.git

## Cách để thêm Grid Stack cho SwiftUI, mặc định chỉ có HStack & VStack thì làm ntn?

### Step 1
Tạo ra 1 type mới `GridStack` sẽ chứa rất nhiều view (View protocol)  dưới dạng lưới như sau:

```swift
struct GridStack<Content: View>: View {
    let rows: Int
    let columns: Int
    let content: (Int, Int) -> Content

    var body: some View {
        // more to come
    }
}
```

Dòng đầu tiên: `struct GridStack<Content: View>: View` sử dụng tính năng nâng cao hơn của Swift gọi là generics Type, truyền vào bất kỳ loại nào nhưng loại đó phải theo `View protocol`.

Hoàn thiện code trong body:

```swift
var body: some View {
    VStack {
        ForEach(0..<rows, id: \.self) { row in
            HStack {
                ForEach(0..<self.columns, id: \.self) { column in
                    self.content(row, column)
                }
            }
        }
    }
}
```

Chú ý ở đây: 
Khi duyệt range thì Swift chỉ có thể truy cập trực tiếp đến phạm vi của range nếu như biết chắc là range đó ko thay đổi.  Vd ở đây: sử dụng : ForEach voiws 0..rows và 0..columns, những giá trị này có thể thay đổi, vd ta muốn thêm dòng / cột cho nó.  Trong trường hợp này, để có thể sử dụng được thì phải add thêm param thứ 2 : `id: \.self` để báo cho SwiftUI biết làm thế nào để xác định từng view trong vòng lặp.

### Step2:

Sử dụng trong View:

```swift
struct ContentView: View {
    var body: some View {
        GridStack(rows: 4, columns: 4) { row, col in
            Text("R\(row) C\(col)")
        }
    }
}
```

Trong GridStack có thể chấp nhận bất kỳ loại content nào miễn sao phù hợp với View Protocol nên có thể kết hợp nhiều thành phần trong view như sau:

```swift
GridStack(rows: 4, columns: 4) { row, col in
    HStack {
        Image(systemName: "\(row * 4 + col).circle")
        Text("R\(row) C\(col)")
    }
}
```

Tham khảo từ: https://www.hackingwithswift.com/books/ios-swiftui/custom-containers