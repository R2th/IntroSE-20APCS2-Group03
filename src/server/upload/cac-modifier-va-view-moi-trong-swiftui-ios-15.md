> Khám phá một số tính năng mới nhất trong SwiftUI

![](https://images.viblo.asia/09ddbe9a-a00c-49ce-a7c2-143bd6accde2.png)

Chào mọi người.\
Hôm nay tôi sẽ nói về các tính năng được công bố tại WWDC mà tôi thấy quan trọng trong SwiftUI. \
Và tôi muốn chỉ ra rằng tôi sẽ chỉ đề cập ngắn gọn đến các chủ đề. Nếu bạn muốn biết thêm thông tin về SwiftUI, hãy xem tài liệu của Apple.\
Trong ví dụ của chúng ta, tôi sẽ sử dụng mô hình này: 

```
struct User : Identifiable{
    var id = UUID()
    let name: String
    let age: Int
}
```

## .searchable
Có lẽ một trong những tính năng quan trọng nhất là searchable API. Vì khi muốn search List, chúng ta phải thực hiện rất nhiều thao tác với UIViewRepresentable. Nhờ API này, chúng ta có thể thoát khỏi tất cả những rắc rối này và thực hiện hàng chục thao tác code trong một dòng duy nhất. Ngoài ra, API này phải nằm trong NavigationView.

```
struct ContentView: View {
    @State var users: [User] = [
        User(name: "Eren", age: 20),
        User(name: "James", age: 22),
        User(name: "Mike", age: 30)
    ]
    @State var searchedText : String = ""
    var body: some View {
        NavigationView {
            List(users) { user in
                VStack{
                    Text(user.name)
                    Text("\(user.age)")
                }
            }
            .searchable("Search User", text: $searchedText,         suggestions: {
            ForEach(searchedData) { result in
                   Text("Are You Looking For \(result.name)")
            .searchCompletion(result.name)
            }
          })
           .navigationTitle("Search Bar")
       }
    }
    var searchedData: [User] {
        if searchedText.isEmpty{
            return []
       }else{
            return users.filter {
                   $0.name.contains(searchedText.lowercased())
             }
     }
   }
}
```
![](https://images.viblo.asia/4e56e681-0de4-4350-9b8c-bc5be52434bb.gif)

## .refreshable

Theo tài liệu, “Khi bạn áp dụng modifier này trên iOS và iPadOS cho chế độ xem có thể cuộn như Danh sách, chế độ xem cung cấp một cách tiêu chuẩn để người dùng làm mới nội dung. Sử dụng await expression bên trong action để làm mới dữ liệu của bạn. Refresh indicator vẫn hiển thị trong suốt thời gian hoạt động await ”

```
NavigationView {
    List(users) { user in
        VStack{
            Text(user.name)
            Text("\(user.age)")
    }
}
.navigationTitle("Refresh control")
.refreshable {
    users.append(User(name: "New Data", age: 100))
  }
}
```

![](https://images.viblo.asia/f85532e8-dcee-4e6d-b6ca-0110031201d7.gif)

## .listStyle

Một trong những tính năng được tìm kiếm nhiều nhất là tùy chỉnh separators. Nhờ API này, chúng tôi có thể ẩn separators và thay đổi màu của chúng.

```
NavigationView {
    List {
        ForEach(users) { user in
            VStack{
                Text(user.name)
                Text("\(user.age)")
            }
    }
    .listRowSeparatorTint(.blue)
    .listRowSeparator(.hidden)
   }
}
```

![](https://images.viblo.asia/80ccc5ae-8f4d-4312-8832-a97b3b35e9bb.png)

## AsyncImage

AsyncImage là một dạng xem tải và hiển thị một hình ảnh một cách không đồng bộ. Bạn cũng có thể thêm một placeholder. Đó là một đặc ân tuyệt vời để có thể làm điều này mà không cần bất kỳ packages nào. Tôi nghĩ những người sẽ bị ảnh hưởng bởi điều này là Kingfisher và SDWebImage.

```
@State var url : String = "https://images.unsplash.com/photo-1485217988980-11786ced9454?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
var body: some View {
    NavigationView {
        VStack {
            AsyncImage(url: URL(string: url)!, scale: 1.0) { data in
                if let image = data.image {
                    image
                        .resizable()
                        .cornerRadius(20)
                        .aspectRatio(contentMode: .fit)
                        .frame(width: 300, height: 300)
                }else {
                     Text("Error Image")
            }
        }
      }
      .navigationTitle("Async Image")
   }
}
```

![](https://images.viblo.asia/f34cab0f-a39c-4452-b0fd-376fb6834d4b.png)

## Material Effects

Material Effects tạo hiệu ứng mờ, còn gọi là UIViewVisualEffect.

`.overlay(.ultraThinMaterial, in: RoundedRectangle(cornerRadius: 12))`

![](https://images.viblo.asia/3c5b7541-61ad-4174-9723-48c059a13097.png)

## Badge

Điều này tạo ra một badge cho view từ một giá trị Int. Nhưng khi chúng ta viết một điều kiện if-else ngắn bên trong badge, nó không hoạt động. Tôi nghĩ rằng có một bug.

```
NavigationView {
    TabView{
        Color.red
           .tabItem({
                Image(systemName: "house.fill")
                Text("AKA")
           })
           .badge(3)
       Color.blue
           .tabItem({Image(systemName: "house.fill")
               Text("AKA")
           })
          .badge(2)
     }
}
```

![](https://images.viblo.asia/4bce1cc0-f369-41fd-865a-9fa19904a478.png)

## .onSubmit

.onSubmit thêm một hành động để thực hiện khi người dùng gửi một giá trị cho view này. Các view khác nhau có thể có các triggers khác nhau cho hành động được cung cấp. TextField hoặc SecureField sẽ trigger action này khi người dùng nhấn phím return. Modifier này cũng có thể bind action này với một phím tắt tác vụ mặc định. Bạn có thể đặt action này trên một view riêng lẻ hoặc toàn bộ view hierarchy.

```
VStack{
    TextField("Type Here " , text: .constant(""))
        .textFieldStyle(.roundedBorder)
        .padding()
}
.onSubmit {
    print("Submitted text")
}
```

## .safeAreaInstest

.safeAreaInstest hiển thị nội dung được chỉ định bên trên hoặc bên dưới modified view, giống như hover view.

```
VStack{
    Color.white
    .frame(width: UIScreen.main.bounds.width)
}
.safeAreaInset(edge: .bottom) {
    RoundedRectangle(cornerRadius: 20)
    .frame(height: 50)
    .foregroundColor(Color.red)
    .padding()
}
```

![](https://images.viblo.asia/6ec8763e-01fd-47cc-9e15-ed8537894e12.png)

## .interactiveDismissDisabled 

Dùng để thêm một điều kiện ngăn chặn việc loại bỏ tương tác khi view được chứa trong popover hoặc sheet.

## .swipeActions

Điều này thêm các custom swipe action vào một row trong list. Và chúng ta có thể thêm một button fully customizable hoặc bất kỳ view nào.

```
.swipeActions(edge: .trailing, allowsFullSwipe: true) {
    Button {
        print("Deleted Item")
    } label: {
         Image(systemName: "xmark")
    }
}
.tint(.red)
```

![](https://images.viblo.asia/f4029ba9-8837-405f-a685-b5b7b533a928.png)

## .submitLabel
Dùng để đặt submit label cho view. Có thể thay đổi nút submit trên bàn phím là một thay đổi nhỏ nhưng rất hay.

```
TextField(“text” , text: .constant(“”))
    .submitLabel(.done)
```

## @FocusState
Khi chúng ta nhìn vào @FocusState, nó giúp chúng ta dễ dàng tự động hướng dẫn người dùng trên TextField.

```
VStack{
    TextField("name" , text: .constant(""))
        .focused($focusState, equals: .name)
    TextField("surname" , text: .constant(""))
        .focused($focusState, equals: .surname)
    TextField("age" , text: .constant(""))
        .focused($focusState, equals: .age)
}
.onSubmit {
    switch focusState{
        case .name: focusState = .surname
        case .surname: focusState = .age
        case.age:
            print("Done")
        default:
            break
    }
```

Nguồn tham khảo: [New SwiftUI Modifiers and Views in iOS 15](https://eren-celik.medium.com/new-swiftui-views-and-modifiers-in-ios-15-7a2fc78f54c3)