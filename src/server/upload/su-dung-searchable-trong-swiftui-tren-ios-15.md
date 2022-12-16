# I. Giới thiệu

Với các ứng dụng có sử dụng List, thì search là chức năng rất phổ biến để chúng ta lọc kết quả hiển thị trên list. Tuy nhiên trước đây SwiftUI không cung cấp sẵn search UI, các bạn phải tạo thanh search từ TextField và Button. Mặc dù tạo custom search view rất đơn giản với SwiftUI, nhưng dù sao thì vẫn phải tạo custom view. 

Trên iOS 15, SwiftUI đã được cung cấp một modifier với tên searchable. Với modifier này, các bạn có thể thêm Search View trên SwiftUI, không còn phải customize và cực kỳ dễ sử dụng. Trong bài viết này, chúng ta sẽ cùng tìm hiểu cách sử dụng searchable.

# II. Nội dung

## 1. Khởi tạo project

Tại thời điểm bài viết này được viết, iOS 15 vẫn chưa được ra mắt chính thức, vì thế các bạn cần download XCode 13 beta và sử dụng Simulator để code. Link download Xcode 13 beta [ở đây](https://developer.apple.com/xcode/resources/)

Sau khi tải Xcode 13, các bạn tạo project với tên SearchableTutorial và interface SwiftUI.

Tiếp theo, trong ContentView.swift, các bạn thêm code để tạo List như sau:

```Swift
import SwiftUI

let fruitList = [
    "Orange",
    "Apple",
    "Avocado",
    "Mango",
    "Peach",
    "Cherry",
    "Grape",
    "Banana",
    "Watermelon",
    "Strawberry",
    "Blueberry",
    "Guava",
    "Raspberry",
    "Kiwi",
    "Apricot",
    "Pear",
    "Fig",
    "Lemon",
    "Papaya",
    "Pomegranate",
    "Plum",
    "Passion fruit",
    "Coconut",
    "Lychee"
]

struct ContentView: View {
    @State var fruits = fruitList
    
    var body: some View {
        NavigationView {
            List {
                ForEach(fruits, id: \.self) { fruit in
                    Text(fruit)
                }
            }
            .listStyle(.plain)
            .navigationTitle("Fruits List")
        }
    }
}
```

Bên trên, chúng ta tạo 1 màn hình với 1 Navigation View với content là 1 List (Table) view, Build chạy App, chúng ta sẽ được như sau:

![](https://images.viblo.asia/aca4f71f-7eec-4d03-8805-f0c9a13a36bd.png)

## 2. Thêm Search Bar

Cũng như các View component khác của SwiftUI, Search bar cũng được thêm bằng vài dòng code cực kỳ đơn giản như sau:
```Swift
struct ContentView: View {
    @State var fruits = fruitList
    // 1
    @State var searchText = ""
    
    var body: some View {
        NavigationView {
            List {
                ForEach(fruits, id: \.self) { fruit in
                    Text(fruit)
                }
            }
            .listStyle(.plain)
            .navigationTitle("Fruits List")
        }
        // 2
        .searchable(text: $searchText)
    }
}
```

Bên trên, chúng ta chỉ thêm 2 dòng code:
* 1. Thêm State property searchText để sử dụng trong modifier searchable
* 2. Thêm modifier searchable cho NavigationView, với param truyền vào là Binding searchText.

Easy vậy thôi, chúng ta đã tạo được 1 search view giống hệt với UISearchViewController của UIKit, với các behavior cơ bản giống UISearchViewController:
* Khi mới Build App không hiển thị thanh search
* Scroll lên trên để hiển thị thanh search
* Scroll xuống dưới thanh search tự động được dấu đi

![](https://images.viblo.asia/b8c8378a-315f-4382-a765-bc6985049f98.png)

Để thay đổi placeholder text của Search Bar, các bạn sửa modifier searchable như sau:
```Swift
// .searchable(text: $searchText)
.searchable(text: $searchText, prompt: "Search Fruit...")
```
Chúng ta được Search Bar với placeholder text như sau:

![](https://images.viblo.asia/899c26a4-163b-40d3-a410-753c73109961.png)

Vậy nếu chúng ta cần Search Bar phải luôn luôn hiển thị, không ẩn/hiện khi scroll up/down thì sao? Các bạn cần sửa searchable modifier như sau:
```Swift
//.searchable(text: $searchText, prompt: "Search Fruit...")
.searchable(text: $searchText, placement: .navigationBarDrawer(displayMode: .always))
```

## 3. Thực hiện action search

Nhắc lại một chút khi sử dụng UIKit, để tạo list chúng ta cần sử dụng UITableView, để hiển thị kết quả search, chúng ta cần thêm logic trong UITableViewDatasource. Nếu đã quá quen với việc này, chúng ta sẽ thấy nó không đến mức phức tạp lắm, nhưng đọc xong đoạn code dưới đây trên SwiftUI, có thể các bạn sẽ suy nghĩ lại đấy.

Các bạn thêm code trong ContentView như sau:
```Swift
struct ContentView: View {
    @State var fruits = fruitList
    @State var searchText = ""
    
    var body: some View {
        NavigationView {
            List {
                ForEach(fruits, id: \.self) { fruit in
                    Text(fruit)
                }
            }
            .listStyle(.plain)
            .navigationTitle("Fruits List")
        }
        .searchable(text: $searchText, placement: .navigationBarDrawer(displayMode: .always))
        .onChange(of: searchText) { text in // perform search
            if text.isEmpty {
                fruits = fruitList
            } else {
                fruits = fruitList.filter {
                    $0.contains(text)
                }
            }
        }
    }
}
```

Tuyệt vời chưa? tất cả logic để kiểm tra, thực hiện action search chỉ được thực hiện trong doạn code bên trong modifer onChange.

Build chạy thử App, thực hiện thao tác search, chúng ta được kết quả như hình sau:

![](https://images.viblo.asia/883aacdb-b84a-4dc6-877c-87d22f6f9c86.png)

## 4. Thêm suggestion

Chúng ta có thể thêm suggestion cho Search bar bằng cách thêm parameter trong searchable modifier như đoạn code sau:
```Swift
	var body: some View {
        NavigationView {
            List {
                ForEach(fruits, id: \.self) { fruit in
                    Text(fruit)
                }
            }
            .listStyle(.plain)
            .navigationTitle("Fruits List")
        }
        .searchable(text: $searchText, placement: .navigationBarDrawer(displayMode: .always))
        {
            // add Search suggestion
            Text("Apple").searchCompletion("Apple")
            Text("Cherry").searchCompletion("Cherry")
        }
        .onChange(of: searchText) { text in
            if text.isEmpty {
                fruits = fruitList
            } else {
                fruits = fruitList.filter {
                    $0.contains(text)
                }
            }
        }
    }
```

Bên trên, chúng ta đã thêm 2 giá trị suggestion cho Search bar. Mỗi khi tap vào ô search, các suggestion sẽ được hiển thị. Tuy nhiên, để hiển thị kết quả tìm kiếm, các bạn cần bấm vào nút Tìm (Search) trên iPhone keyboard.

![](https://images.viblo.asia/98666bcf-c3de-493b-8827-3b319883329a.png)

# III. Kết luận

trên đây tôi đã giới thiệu đến các bạn về searchable modifier trên iOS 15. Về cơ bản thì cách hoạt động của nó giống hệt với UISearchController trên UIKit, với implement code đơn giản hơn rất nhiều. Hi vọng bài viết này giúp ích cho các bạn trong quá trình tìm hiểu về Search Bar và searchable modifier.

Điểm yếu của searchable modifier là nó chỉ có thể sử dụng trên iOS 15, iOS mà thậm chí còn chưa chính thức được sử dụng. Vì thế trong bài viết sau, tôi sẽ viêt về cách tạo custom Search bar từ TextField và Button, để sử dụng trên iOS 13, 14

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day :)