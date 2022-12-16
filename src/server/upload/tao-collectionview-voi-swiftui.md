Trong SwiftUI không có CollectionViews, tuy nhiên ta hoàn toàn có thể tự tạo cho riêng mình một cách dễ dàng. 

Việc tạo ra các view có thể tái sử dụng khá đơn giản trong SwiftUI. SwiftUI view builder cho phép ta nhúng các view bên trong những view khác (như VStack, HStack,...). Trong bài viết này ta sẽ cùng tìm hiểu cách tạo một Collection view đơn giản, nó là một danh sách các card view.

### Demo
Trước tiên hãy tạo mới một project và đặt tên là CollectionViewCard. Sau đó, tạo mới một SwiftUI view với tên gọi Collection. Việc đầu tiên ta cần làm là thêm vào một số generic constraints:
- Content (View): nó sẽ hiển thị bất cứ view type nào mà ta lồng vào trong collection cell
- Data (Hasable): sẽ hiển thị data source cho collection

Hãy cùng xem qua nội dung của Collection như bên dưới đây:

```
struct Collection<Content: View, Data: Hashable>: View {

  var body: some View {
    Text("Hello Dude!")
  }
  
}
```

Sau đó, ta sẽ thêm một số thuộc tính và hàm khởi tạo cho collection. Trong đó:
- data (Binding<[Data]>): là dữ liệu mà ta sẽ cung cấp cho collection view. Ta sử dụng binding để đảm bảo các thay đổi sẽ được phản ánh ngay lên giao diện
- viewBuilder((Data) -> Content): trả về view mà ta nhúng vào bên trong các collection cell
- cols (Int): là số cột mà ta muốn hiển thị
- spacing (CGFloat): là khoảng cách giữa các cell (theo chiều ngang và chiều dọc)

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
        Text("Hello Dude!")
    }
}
```

Tiếp theo, để định nghĩa một data item, ta sử dụng function hỗ trợ để báo số lượng hàng và cột, và trả về một view sử dụng viewBuilder.

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

Đến đây, ta đã có đủ data để làm việc, việc tiếp theo là vẽ collection ra màn hình. Ta cần tạo một GeometryReader để lấy frame của view, từ đó ta có thể tính toán được giá trị width tối đa, và height tối thiểu của nội dung bên trong scrollView. Ta sử dụng function setupView(geometry:) để vẽ scrollView.

Đoạn code bên dưới đây sẽ tạo ra hai stack, duyệt qua các hàng và cột. 

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

Việc setup các thành phần của collection xem như đã xong, bây giờ ta sẽ đưa vào file ContentView.swift để hiển thị nó lên, ngoài ra ta có thể truyền thêm một mảng các color để tạo màu khác nhau cho từng card.

```
struct ContentView: View {

    @State var colors: [Color] = [.pink, .purple, .gray, .black, .red, .orange, .yellow, .green, .blue]

    var body: some View {
        Collection(data: $colors, cols: 2, spacing: 20) { color in
            // Cell content here
        }
        .padding()
        .background(Color.black.opacity(0.05).edgesIgnoringSafeArea(.all))
    }
  
}
```

Thêm vào một số nội cung cho các cell để hiển thị cho từng màu:

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

Build và chạy demo, ta sẽ có được kết quả một collectionView rất đẹp và đơn giản phải không các bạn :-P