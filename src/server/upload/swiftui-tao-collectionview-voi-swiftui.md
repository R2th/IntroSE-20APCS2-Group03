CollectionViews bị thiếu trong SwiftUI, nhưng ở đây, chúng ta có thể dễ dàng xây dựng nó.

![](https://images.viblo.asia/9aeb85af-3221-4a8d-8ac8-c016ed973a80.png)
<br>

Để bắt đầu, tạo SwiftUI view mới có tên Collection. Đầu tiên, chúng ta cần thêm một số constraint:

* **Content** (View) sẽ đại diện cho bất kỳ loại view nào lồng bên trong collection cell.

* **Data** (Hashable) sẽ đại diện cho datasource của collection

```
struct Collection<Content: View, Data: Hashable>: View {

  var body: some View {
    Text("Hello World!")
  }
  
}
```

Tiếp theo, chúng tôi sẽ thêm một số thuộc tính và trình khởi tạo.

* **Data** `(Binding <[Data]>)` sẽ là dữ liệu cung cấp cho CollectionView. Chúng tôi sử dụng binding ở đây để đảm bảo mọi thay đổi được ánh xạ trong CollectionView.
* **viewBuilder** `((Data) -> Content)` sẽ trả về view đang nhúng trong các Collection Cell
* **cols** `(Int)` là số cột chúng tôi muốn hiển thị
* **spacing** `(CGFloat)` là khoảng cách giữa các ô (dọc và ngang)

```
struct Collection<Content: View, Data: Hashable>: View {

    @Binding var data: [Data]
    let viewBuilder: (Data) -> Content
    let cols: Int
    let spacing: CGFloat

    init(data: Binding<[Data]>, cols: Int = 3, spacing: CGFloat = 5,_ viewBuilder: @escaping (Data) -> Content) {
        _data = data
        self.cols = cols
        self.spacing = spacing
        self.viewBuilder = viewBuilder
    }

    var body: some View {
        Text("Hello World!")
    }
}
```

Bây giờ, thêm một hàm trợ giúp để xác định data item, cung cấp một hàng và cột cụ thể, và trả về dưới dạng `View` bằng cách sử dụng `viewBuilder`.

```
private func cell(colIndex: Int, rowIndex: Int) -> some View {
    let cellIndex = (rowIndex * cols) + colIndex
    return ZStack {
        if cellIndex < data.count {
            self.viewBuilder(data[cellIndex])
        }
    }
}
```

Tiếp theo, vẽ Collection

Điều đầu tiên cần là `GeometryReader` để cung cấp cho chúng ta khung View để có thể tính chiều rộng cell tối đa và chiều cao tối thiểu cho nội dung trong ScrollView. Nội dung ScrollView được vẽ bằng chức năng của trình trợ giúp, `setupView(geometry:)`.

```
var body: some View {
    GeometryReader { geometry in
        ScrollView {
            self.setupView(geometry: geometry).frame(minHeight: geometry.frame(in: .global).height)
        }
    }
}

private func setupView(geometry: GeometryProxy) -> some View {
    let rowRemainder = Double(data.count).remainder(dividingBy: Double(cols))
    let rowCount = data.count / cols + (rowRemainder == 0 ? 0 : 1)
    let frame = geometry.frame(in: .global)
    let totalSpacing = Int(spacing) * (cols - 1)
    let cellWidth = (frame.width - CGFloat(totalSpacing))/CGFloat(cols)

    return VStack(alignment: .leading, spacing: spacing) {
        ForEach(0...rowCount-1, id: \.self) { row in
            HStack(spacing: self.spacing) {
                ForEach(0...self.cols-1, id: \.self) { col in
                    self.cell(colIndex: col, rowIndex: row)
                    .frame(maxWidth: cellWidth)
                }
            }
        }
        Spacer()
    }
}
```

Điều này hoàn thành các thành phần của `Collection`. Bây giờ, hãy để thêm nó vào ContentView.swift để xem nó hoạt động.

```
struct ContentView: View {

    @State var colors: [Color] = [.pink, .red, .orange, .yellow, .green, .blue, .purple, .gray, .black]


    var body: some View {
        Collection(data: $colors, cols: 2, spacing: 20) { color in
            // add cell content here
        }
        .padding()
        .background(Color.black.opacity(0.05).edgesIgnoringSafeArea(.all))
    }
  
}
```

Bây giờ, hãy để thêm một số nội dung của cell để hiển thị trong CollectionView.

```
Collection(data: $colors, cols: 2, spacing: 20) { color in
    VStack {
        Spacer()
        Text(color.description)
            .padding(10)
            .frame(minWidth: 0, maxWidth: .infinity)
            .background(Color.white)
    }
    .frame(height: 120)
    .background(color)
    .cornerRadius(10)
    .overlay(RoundedRectangle(cornerRadius: 10).stroke(Color.black.opacity(0.2), lineWidth: 1))
}
```

Và chúng ta đã hoàn thành nó!

Nguồn: https://medium.com/better-programming/reusable-collection-view-with-swiftui-118f8c72730