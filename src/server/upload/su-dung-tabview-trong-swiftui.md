# I. Giới thiệu

Tab Bar xuất hiện trong hầu hết các ứng dụng iOS, rất nhiều ứng dụng phổ biến đều sử dụng tab bar: Facebook, Twitter, Youtube, Instagram,… Nó là giao diện chuẩn mà Apple suggest sử dụng khi xây dựng App,  vì thế chẳng có lý do gì mà chúng ta lại không sử dụng nó trong ứng dụng khi cần thiết cả.

Trong UIKit, UITabBarController được sử dụng mỗi khi chúng ta xây dựng TabBar, controller này đã rất quen thuộc với chúng ta rồi. Tuy nhiên, đối với SwiftUI, tương tự như cách dùng của Navigation Bar, chúng ta sử dụng View chứ không dùng ViewController. Cụ thể, trên SwiftUI, chúng ta sử dụng TabView.

Trong bài viết này, thông qua demo project, chúng ta sẽ cùng nhau tìm hiểu các sử dụng TabView để xây dựng Tab Bar trong ứng dụng iOS được xây dựng bằng SwiftUI

# II. Nội dung

## 1. Tạo project

Các bạn mở Xcode, tạo project với tên TabViewTutorial

New -> Project ->  iOS App -> Interface: SwiftUI, Life cycle: SwiftUI App, Language: Swift -> Create project

Tiếp theo, thay nội dung body của ContentView như sau:
```Swift
	var body: some View {
        Text("Home")
            .font(.system(size: 40, weight: .bold, design: .default))
    }
```

Bên trên chúng ta đơn giản thay nội dung text là Home, và thay đổi font của Text

## 2. Thêm Tab Bar cho Home

Để thêm Tab Bar vào cho Text, chúng ta thay đổi nội dung của body như sau:
```Swift
	var body: some View {
        TabView {	// 1
            Text("Home")
                .font(.system(size: 40, weight: .bold, design: .default))
                .tabItem {	// 2
                    Image(systemName: "house.fill")
                    Text("Home")
                }
        }
    }
```

Bên trên, chúng ta lần lượt làm các việc:
* 1. Thêm TabView bao bên ngoài nội dung của body
* 2. Thêm TabItem cho Text View. Ở đây, chúng ta tạo TabItem với system image "house.fill" và nội dung Text "Home" 

Xem nội dung trong preview, chúng ta được như ảnh sau:

![](https://images.viblo.asia/07ffc319-1d39-418c-9ea7-ef9bc0c1e18c.png)

Tuy nhiên, trong thực tế chẳng ai tạo cả 1 tabbar cho 1 Text View cả, chúng ta sẽ tạo 1 struct HomeView để gán tabbar cho nó. Bây giờ, tạo file HomeView.swift với nội dung như sau:

```Swift
import SwiftUI

struct HomeView: View {
    var body: some View {
        Text("Home")	 // 1
            .font(.system(size: 40, weight: .bold, design: .default))
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
    }
}
```

Bên trên, chúng ta tạo HomeView với nội dung là Text từ body của ContentView

Tiếp theo, quay trở lại ContentView.swift và thay đổi nội dung body như sau:
```Swift
	var body: some View {
        TabView {
            HomeView()	// 1
                .tabItem {
                    Image(systemName: "house.fill")
                    Text("Home")
                }
        }
    } 
```

Ok, Nội dung thì vẫn vậy, nhưng mà bây giờ TabItem đã là của HomeView chứ không phải TextView nữa, chúng ta có thể vào file HomeView.swift để thêm nhiều content mà mình muốn.

## 3. Thêm các TabBar khác

Đương nhiên là trong ứng dụng phải có nhiều tabBar thì mới cần sử dụng đến TabView, chứ chỉ có 1 tab thì cần gì sử dụng TabView nữa. Để thêm nhiều Tab khác cho TabView, chúng ta vào body của ContentView và làm như sau:
```Swift
struct ContentView: View {
    var body: some View {
        TabView {
            HomeView()
                .tabItem {
                    Image(systemName: "house.fill")
                    Text("Home")
                }
            
            Text("Game")
                .font(.system(size: 40, weight: .bold, design: .default))
                .tabItem {
                    Image(systemName: "gamecontroller.fill")
                    Text("Game")
                }
            
            Text("Video")
                .font(.system(size: 40, weight: .bold, design: .default))
                .tabItem {
                    Image(systemName: "video.circle.fill")
                    Text("Video")
                }
            
            Text("Profile")
                .font(.system(size: 40, weight: .bold, design: .default))
                .tabItem {
                    Image(systemName: "person.crop.circle")
                    Text("Profile")
                }
        }
    }
}
```

Bên trên, chúng ta lần lượt thêm các TextView: Game, Video, Profile. các TextView này có các TabItem với Image và Text tương ứng

Tất nhiên, thông thường chúng ta sẽ tạo các file GameView.swift, VideoView.swift, ProfileView.swift và lôi nội dung text sang các file này, tương tự như chúng ta đã làm với HomeView.swift. Trong demo này, để giảm tải nội dung nên tôi sẽ không làm lại nữa.

Kết quả, trong màn hình preview, chúng ta được App với nội dung như ảnh sau:

![](https://images.viblo.asia/e19fcc4f-0872-4894-8f9f-60e1399918b8.png)

## 4. Customize Tab Bar color

Bên trên, chúng ta đã sử dụng Image View và Text View trong TabItem View. Tuy nhiên, nếu thử tìm cách customize Image và Text View, ví dụ như:
```Swift
			…
			HomeView()
                .tabItem {
                    Image(systemName: "house.fill")
                        .resizable()
                        .frame(width: 60, height: 60)		// thay đổi size image
                    Text("Home")
                        .foregroundColor(.red)  // đổi màu text
                        .font(.system(size: 20, weight: .medium, design: .default)) // thay font text
                }
			…
```
Kết quả là mọi thứ vẫn không có gì thay đổi, cả size Image và màu Text vẫn giữ nguyên như cũ.

Tại thời điểm hiện tại, TabView chỉ cho phép thay đổi tint color của TabBar. Để thay đổi tint color, các bạn thêm modifier .accentColor cho TabView như sau:
```Swift
	var body: some View {
        TabView {
            HomeView()
                .tabItem {
                    Image(systemName: "house.fill")
                    Text("Home")
                }
            
            …
        }
        .accentColor(.red)
    }
```

Bên trên, chúng ta đổi màu tintColor của TabBar từ mặc định sang màu đỏ. Kết quả trong preview như hình sau:

![](https://images.viblo.asia/33da2709-59a3-47f4-8a14-a6c39e349265.png)

## 5. Chuyển tab programmatically

Trong nhiều trường hợp, chúng ta cần di chuyển đến tab chỉ định mà không phụ thuộc vào action tap của user. Trong phần này chúng ta sẽ tìm hiểu cách chuyển sang tap chỉ định bằng code.

Để làm được việc này, chúng ta cần làm 2 việc:
* 1. gắn thẻ tag cho mỗi tabItem, để có thể phân biệt từng tab
* 2. dựa vào thẻ tag đã gán để di chuyển đến tab chỉ định

Cụ thể, chúng ta thêm code như sau:
```Swift
struct ContentView: View {
    // 1
    @State private var selection = 2
    
    var body: some View {
        TabView(selection: $selection) {    // 2
            HomeView()
                .tabItem {
                    Image(systemName: "house.fill")
                    Text("Home")
                }
                .tag(0) // 3
            
            Text("Game")
                .font(.system(size: 40, weight: .bold, design: .default))
                .tabItem {
                    Image(systemName: "gamecontroller.fill")
                    Text("Game")
                }
                .tag(1) // 3
            
            Text("Video")
                .font(.system(size: 40, weight: .bold, design: .default))
                .tabItem {
                    Image(systemName: "video.circle.fill")
                    Text("Video")
                }
                .tag(2) // 3
            
            Text("Profile")
                .font(.system(size: 40, weight: .bold, design: .default))
                .tabItem {
                    Image(systemName: "person.crop.circle")
                    Text("Profile")
                }
                .tag(3) // 3
        }
        .accentColor(.red)
    }
}
```

Bên trên chúng ta lần lượt làm các việc sau:

* 1. Thêm @State property selection, đây là property để xác định tab được chọn. Chúng ta thay đổi tab được chọn bằng cách thay đổi giá trị của property này theo giá trị các thẻ tag 
* 2. Tạo TabView với selection value. Bằng cách truyền param selection vào, chúng ta điều khiển tabItem được chọn trong TabView
* 3. Gắn thẻ tag cho mỗi TabItem

Bây giờ, nhìn lại preview, chúng ta được như ảnh sau:

![](https://images.viblo.asia/16ce1b15-63b7-4f47-a38d-78b5967e9568.png)

## 5. Sử dụng TabView cùng với NavigationView

Tuỳ vào trường hợp design App, chúng ta có thể sử dụng TabView là container của NavigationView và ngược lại

### a. Trường hợp NavigationView là container của TabView
Toàn bộ nội dung của TabView sẽ là View con của NavigationView. Các bạn tưởng tượng TabView lúc này, đối với NavigationView sẽ chỉ như bất kỳ View khác. Tức là, khi di chuyển sang View khác trong Navigation stack, các TabItem của TabView tất nhiên sẽ bị mất đi

```Swift
	var body: some View {
        NavigationView {	// thêm navigation View
            TabView(selection: $selection) {
                NavigationLink(	// thêm navigation Link
                    destination: Text("Destination"),
                    label: {
                        HomeView()
                    })
                    .tabItem {
                        Image(systemName: "house.fill")
                        Text("Home")
                    }
                    .tag(0)
                
                …
            }
            .navigationTitle("TabView Demo")	// thêm navigation title
            .accentColor(.red)
        }
    }
```

Bên trên Chúng ta tạo NavigationView là View cha của TabView. Vì vậy, khi chạy project trong preview, bấm vào “Home” chúng ta được kết quả như hình sau:

![](https://images.viblo.asia/57b25b49-903c-4238-b594-9cbaa7c6bc32.png)

Như hình trên, các Tab Item của TabView đều không tồn tại khi NavigationView thêm View vào stack

### b. Trường hợp là TabView container của NavigationView 

Toàn bộ nội dung của NavigationView sẽ là view con của TabView. Vì thế lúc này NavigationView chỉ tồn tại trong 1 Tab của TabView. Lúc này, khi di chuyển đến view khác trong stack của NavigationView, các TabItem vẫn còn tồn tại, và trong các tabItem khác, thì NavigationView không tồn tại
```Swift
	var body: some View {
        TabView(selection: $selection) {
            NavigationView {	// thêm navigationView
                NavigationLink(	// thêm navigationLink
                    destination: Text("Destination"),
                    label: {
                        HomeView()
                    })
                    .navigationTitle("TabView Demo") // thêm navigationTitle
            }
            
            .tabItem {
                Image(systemName: "house.fill")
                Text("Home")
            }
            .tag(0)
            …
        }
        .accentColor(.red)
    }
```
Bên trên Chúng ta tạo NavigationView là View con của TabView. Vì vậy, khi chạy project trong preview, bấm vào “Home” chúng ta được kết quả như hình sau:

![](https://images.viblo.asia/e1577528-7aee-4df3-849c-0c8ea90749f7.png)

Tóm lại, khi để NavigationView làm View con hoặc cha của TabView, sẽ mang lại những kết quả chạy khác nhau. Vì thế, chúng ta cần tuỳ vào trường hợp để sử dụng 1 trong 2 cách

# III. Kết luận

Trên đây, tôi đã giới thiệu cách tạo, customize TabView, và cách kết hợp TabView với NavigationView. Hi vọng bài viết này mang lại thông tin hữu ích cho các bạn trong quá trình sử dụng TabView trong ứng dụng iOS

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day :)