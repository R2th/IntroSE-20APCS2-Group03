# I. Giới thiệu

Trong SwiftUI, chúng ta sử dụng các Modifier xây dựng User Interface cho ứng dụng. Tất cả các hàm để xây dựng thêm thuộc tính cho View, từ background, color, font, padding,… đều là các Modifier.

SwiftUI đã cung cấp tương đối nhiều Modifier, đủ để cho chúng ta sử dụng. Tuy nhiên, trong nhiều trường hợp, chúng ta cần sử dụng 1 chuỗi nhiều modifier để xây dựng giao diện cho nhiều View tương tự nhau, hoặc đơn giản là quá nhiều modifier sẽ làm code trở nên dài, rối và khó quản lý. Lúc này, các bạn có thể nghĩ tới xây dựng custom modifier để làm cho code trở nên ngắn gọn hơn, dễ quản lý hơn

Trong bài viết này, thông qua project demo, tôi sẽ giới thiệu cách xây dựng custom modifier để sử dụng thực tế trong project

# II. Nội dung

## 1. Tạo project

Đầu tiên, các bạn tạo SwiftUI project với tên CustomModifier như sau:

Xcode -> File -> New -> Project -> iOS App -> đặt tên project CustomModifier, interface là SwiftUI -> create project

Tiếp đó, chúng ta thêm 1 form login đơn giản, gồm 2 TextField và 1 button  như sau:
```Swift
struct ContentView: View {
    
    @State var username = ""
    @State var password = ""
    
    var body: some View {
        VStack {
            TextField("Username", text: $username)
            
            SecureField("Password", text: $password)
            
            Button(action: {
                print("submit form")
            }, label: {
                Text("Submit")
            })
        }
    }
}
```
Sau đây chúng ta sẽ xây dựng giao diện cho các View bên trên.

## 2. Thêm modifier

Giả sử chúng ta cần xây dựng giao diện cho 3 View trên gồm chữ trắng, nền đen và bo cong góc với radius là 5. Thông thường chúng ta sẽ làm như sau:

```Swift
struct ContentView: View {
    
    @State var username = ""
    @State var password = ""
    
    var body: some View {
        VStack {
            TextField("Username", text: $username)
                .padding(EdgeInsets(top: 5, leading: 10, bottom: 5, trailing: 10))
                .foregroundColor(.white)
                .background(Color.gray)
                .cornerRadius(5)
                .overlay(
                    RoundedRectangle(cornerRadius: 5)
                        .stroke(Color.gray, lineWidth: 1)
                )
            
            SecureField("Password", text: $password)
                .padding(EdgeInsets(top: 5, leading: 10, bottom: 5, trailing: 10))
                .foregroundColor(.white)
                .background(Color.gray)
                .cornerRadius(5)
                .overlay(
                    RoundedRectangle(cornerRadius: 5)
                        .stroke(Color.gray, lineWidth: 1)
                ) 
            
            Button(action: {
                print("submit form")
            }, label: {
                Text("Submit")
                    .padding(EdgeInsets(top: 5, leading: 10, bottom: 5, trailing: 10))
                    .foregroundColor(.white)
                    .background(Color.gray)
                    .cornerRadius(5)
                    .overlay(
                        RoundedRectangle(cornerRadius: 5)
                            .stroke(Color.gray, lineWidth: 1)
                    )
            })
        }
    }
}
```
Cả 3 field bên trên đều có chung đoạn code thêm các modifier:

```Swift
				View
                .padding(EdgeInsets(top: 5, leading: 10, bottom: 5, trailing: 10))
                .foregroundColor(.white)
                .background(Color.gray)
                .cornerRadius(5)
                .overlay(
                    RoundedRectangle(cornerRadius: 5)
                        .stroke(Color.gray, lineWidth: 1)
                )
```
Vì phải viết lại ở nhiều nơi, nên chúng ta có thể custom đoạn code trên thành 1 modifier để tái sử dụng, tương tự với việc viết function vậy

## 3. Custom modifier

Bước 1, chúng ta tạo file CustomModifier.swift, và thêm code như sau:
```Swift
import SwiftUI
// 1
struct CustomModifier: ViewModifier {
    // 2
    func body(content: Content) -> some View {
        content
            .padding(EdgeInsets(top: 5, leading: 10, bottom: 5, trailing: 10))
            .foregroundColor(.white)
            .background(Color.gray)
            .cornerRadius(5)
            .overlay(
                RoundedRectangle(cornerRadius: 5)
                    .stroke(Color.gray, lineWidth: 1))
    }
}
```

Bên trên, chúng ta lần lượt làm các bước:

* 1. Tạo struct CustomModifier conform protocol ViewModifier. ViewModifier là protocol của SwiftUI
* 2. Implement func func body(content:), đây là func của protocol, với return type là View sau khi được biến đổi qua chuỗi Modifier

Tiếp theo, để sử dụng CustomModifier vừa tạo, các bạn vào ContentView.swift sửa lại code như sau:
```Swift
struct ContentView: View {
    
    @State var username = ""
    @State var password = ""
    
    var body: some View {
        VStack {
            TextField("Username", text: $username).modifier(CustomModifier()) // add custom modifier
            
            SecureField("Password", text: $password).modifier(CustomModifier()) // add custom modifier
            
            Button(action: {
                print("submit form")
            }, label: {
                Text("Submit").modifier(CustomModifier()) // add custom modifier
            })
        }
    }
}
```

Như đã thấy, đoạn code trong file ContentView.swift đã ngắn gọn đi rất nhiều. Tuy nhiên, kiểu thêm modifier này không giống syntax thông thường của modifier, chúng ta có thể làm thêm 1 bước nữa để làm cho CustomModifier hoàn thiện hơn. Các bạn thêm code sau vào cuối file CustomModifier.swift:

```Swift
extension View {
    func customModifier() -> some View {
        ModifiedContent(content: self, modifier: CustomModifier())
    }
}
```

Tiếp theo, sửa nội dung của ContentView như sau:
```Swift
struct ContentView: View {
    
    @State var username = ""
    @State var password = ""
    
    var body: some View {
        VStack {
            TextField("Username", text: $username)
                .customModifier()
            
            SecureField("Password", text: $password)
                .customModifier()
            
            Button(action: {
                print("submit form")
            }, label: {
                Text("Submit")
                    .customModifier()
            })
        }
    }
}
```
Bây giờ thì syntax của CustomModifier đã ổn hơn rất nhiều, giống hệt với các Modifier mặc định của SwiftUI.

# 4. Chia nhỏ Modifier

Tuy rằng Modifier bên trên rất ổn, các bạn vẫn hoàn toàn có thể chia nhỏ thành các modifier khác nhau, để phục vụ cho quá trình viết code của mình. Chẳng hạn, bên trên tôi muốn chia riêng thành 1 Modifier cho việc bo góc View, vì bo góc thì nhiều View có thể cần, còn padding với background, foregroundColor thì không phải View nào cũng cần. tách riêng Modifier có thể sẽ sử dụng được nhiều chỗ hơn.

Đầu tiên, tôi tạo file CornerRadiusModifier.swift và implement code với nội dung như sau:
```Swift
struct CornerRadiusModifier: ViewModifier {
    
    func body(content: Content) -> some View {
        content
            .cornerRadius(5)
            .overlay(
                RoundedRectangle(cornerRadius: 5)
                    .stroke(Color.gray, lineWidth: 1))
    }
}


extension View {
    func cornerRadiusModifier() -> some View {
        ModifiedContent(content: self, modifier: CornerRadiusModifier())
    }
}
```

Tiếp đó, trong CustomModifier.swift, chúng ta sửa như sau:
```Swift
struct CustomModifier: ViewModifier {
    
    func body(content: Content) -> some View {
        content
            .padding(EdgeInsets(top: 5, leading: 10, bottom: 5, trailing: 10))
            .foregroundColor(.white)
            .background(Color.gray)
            .cornerRadiusModifier() // custom modifier
    }
}


extension View {
    func customModifier() -> some View {
        ModifiedContent(content: self, modifier: CustomModifier())
    }
}
```
Bên trên, tôi đã sử dụng 1 custom Modifier để xây dựng 1 custom Modifier khác. Các bạn có thể thấy, custom Modifier được sử dụng rất linh hoạt, rất có ích cho việc sắp xếp và reuse code của chúng ta.

# III. Tổng kết

Trên đây tôi đã giới thiệu cách tạo custom Modifier. Qua bài này, chúng ta đã thấy việc custom Modifier mang lại rất nhiều lợi ích, giúp chúng ta sắp xếp code ngắn gọn hơn, đơn giản, dễ đọc hơn, và quan trọng nhất là khả năng reuse code trong project. 

Nội dung bài viết đến đây là hết, hi vọng bài viết này giúp ích cho các bạn trong quá trình tìm hiểu và làm việc với SwiftUI. Xin cảm ơn các bạn đã theo dõi, have a nice day ^_^!