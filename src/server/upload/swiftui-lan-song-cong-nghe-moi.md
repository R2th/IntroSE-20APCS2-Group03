![](https://images.viblo.asia/6ed1bf7d-b55a-4e5e-8a91-42774a62e5b7.jpeg)
## Tổng Quan
WWDC 2019 diễn ra vào 0h sáng ngày 4/6 theo giờ Việt Nam, Apple đã tung một số cập nhật mới mà theo giới lập trình viên thế giới cho rằng đây là một làn sóng công nghệ trong thời gian tới.
Trong số nhưng cập nhật mới đó không thể không nhắc tới SwiftUI - bộ công cụ giao diện người dùng cho phép thiết kế ứng dụng theo cách declarative có nghĩa là việc của chúng ta chỉ là đưa ra cho SwiftUI hiểu  chúng ta muốn giao diện như thế nào và cách hoạt động ra sao còn việc của SwiftUI là chỉ ra cách làm cho điều đó thành đúng khi người dùng tương tác với nó.
Declarative UI được hiểu rõ hơn khi so sánh với imperative UI, đó là những gì các nhà phát triển iOS đã làm trước iOS 13. Trong imperative UI, chúng ta sử dụng các outlet , các liên kết  để xử lí.....

## Điểm mới trong SwiftUI

+ Một hệ thống UI khai báo được xây dựng trong Swift, hoàn toàn tương thích với code hiện có.

+ Hỗ trợ tự động cho khoảng cách và nội dung, dark mode, liên kết dữ liệu, animation, transitions, v.v.

+ Thay thế động: thay đổi biên dịch lại ngay lập tức và có thể được xem trước trên khung vẽ thiết kế.

+ Xây dựng nhiều bản xem trước của chế độ xem SwiftUI trong quá trình phát triển với các cấu hình khác nhau, chẳng hạn như phông chữ lớn, dark mode...

+ Cú pháp ngắn gọn, mã kết quả có thể sửa lỗi và khác biệt.

+ Có thể chạy trên tất cả các nền tảng của Apple.

+ Yêu cầu iOS 13, không được back-port.

Để hiểu phần nào về Swift UI chúng ta đi vào xem cách thực hiện 1 ví dụ:
## Ví dụ
Chúng ta sẽ tạo thử 1 form với SwiftUI
![](https://images.viblo.asia/057a80ff-8d74-49b4-b35e-624f81360f10.png)

Tối thiểu chúng ta cần XCode 11 sau đó khởi tạo project với `Single View Application Template`

![](https://images.viblo.asia/1b30e714-2fb0-4c79-92f1-3de80535a7c8.png)

Bắt đầu với việc thiết kế `textFeild`
Để khỏi tạo 1 label và 1 textFeild chúng ta sử dụng
```Swift
Text("NAME").font(.headline)
TextField(.constant(""), placeholder: Text("Fill in the restaurant name"))
```
đoạn code này sẽ khởi tạo 1 label có nội dung là "name" và 1 textFeild với place holder là "Fill in the restaurant name".

Để sắp xếp label lên bên trên textFeild chúng ta làm như sau:

```Swift
struct ContentView : View {
    var body: some View {
        VStack(alignment: .leading) {
            Text("NAME")
                .font(.headline)
            TextField(.constant(""), placeholder: Text("Fill in the restaurant name"))
        }
    }
}
```
Và kết quả nhận được như thế này:
![](https://images.viblo.asia/70ce9403-d845-4e2d-a9df-7fd39d18f324.png)

Để set Padding, leading, connerradius và color chúng ta làm như sau:
```Swift
struct ContentView : View {
    var body: some View {
        VStack(alignment: .leading) {
            Text("NAME")
                .font(.headline)
            TextField(.constant(""), placeholder: Text("Fill in the restaurant name"))
                .padding(.all)
                .background(Color(red: 239.0/255.0, green: 243.0/255.0, blue: 244.0/255.0, opacity: 1.0), cornerRadius: 5.0)
        }
        .padding(.horizontal, 15)
    }
}
```
và kết quả là:

![](https://images.viblo.asia/a9d1eaf5-e893-49eb-9b34-6b8948a82473.png)

Thật vi diệu đúng không nào?

Để có thể tái sử dụng phần code trên và tạo ra các  cụm label và textFeild khác chúng ta tiến hành khởi tạo object `LabelTextField`
```Swift
struct LabelTextField : View {
    var label: String
    var placeHolder: String
 
    var body: some View {
 
        VStack(alignment: .leading) {
            Text(label)
                .font(.headline)
            TextField(.constant(""), placeholder: Text(placeHolder))
                .padding(.all)
                .background(Color(red: 239.0/255.0, green: 243.0/255.0, blue: 244.0/255.0, opacity: 1.0), cornerRadius: 5.0)
            }
            .padding(.horizontal, 15)
    }
}
```
Sau đó trong `ContentView` khai báo như sau:
```
struct ContentView : View {
    var body: some View {
        List {
            VStack(alignment: .leading) {
                LabelTextField(label: "NAME", placeHolder: "Fill in the restaurant name")
                LabelTextField(label: "TYPE", placeHolder: "Fill in the restaurant type")
                LabelTextField(label: "ADDRESS", placeHolder: "Fill in the restaurant address")
                LabelTextField(label: "PHONE", placeHolder: "Fill in the restaurant phone")
                LabelTextField(label: "DESCRIPTION", placeHolder: "Fill in the restaurant description")
                }
 
        }
 
    }
}
```
Thế là chúng ta đã khởi tạo được phần form bên dưới như trong demo.
![](https://images.viblo.asia/efc3c9ef-4d0f-45d4-90d1-5cf6d7f1c0e7.png)

Để thêm ảnh lên bên trên phần form chúng ta làm như sau:
```Swift
Image("chicken")
    .resizable()
    .scaledToFill()
    .frame(height: 300)
    .clipped()
    .listRowInsets(EdgeInsets())
```
Đoạn code trên sẽ lại UIImage với tên "chicken" cao 300dp, cliptobounded và scaleToFill...
Tiếp theo chúng ta đi khởi tạo `Rounded Button`
```Swift
struct RoundedButton : View {
    var body: some View {
        Button(action: {}) {
            HStack {
                Spacer()
                Text("Save")
                    .font(.headline)
                    .color(Color.white)
                Spacer()
            }
        }
        .padding(.vertical, 10.0)
        .background(Color.red, cornerRadius: 4.0)
        .padding(.horizontal, 50)
    }
}
```

Để có thể preview chúng ta có thể add button vào trong ContentView.
Ngoài cách add button trong ContentView ra chúng ta có thể add thêm các preview khác để có thể theo dõi các component chúng ta đã add bằng cách khởi tạo như sau
```Swift
struct ContentView_Previews : PreviewProvider {
    static var previews: some View {
        Group {
            ContentView()
            RoundedButton().previewLayout(.sizeThatFits)
        }
    }
}
```
![](https://images.viblo.asia/62ed55a4-8004-44fa-b045-33a69a624865.png)


Để ember view trong navigationview chúng ta làm như sau:
```Swift
struct ContentView : View {
    var body: some View {
 
        NavigationView {
            List {
 
                Image("chicken")
                    .resizable()
                    .scaledToFill()
                    .frame(height: 300)
                    .clipped()
                    .listRowInsets(EdgeInsets())
 
                VStack(alignment: .leading) {
                    LabelTextField(label: "NAME", placeHolder: "Fill in the restaurant name")
                    LabelTextField(label: "TYPE", placeHolder: "Fill in the restaurant type")
                    LabelTextField(label: "ADDRESS", placeHolder: "Fill in the restaurant address")
                    LabelTextField(label: "PHONE", placeHolder: "Fill in the restaurant phone")
                    LabelTextField(label: "DESCRIPTION", placeHolder: "Fill in the restaurant description")
 
                    RoundedButton().padding(.top, 20)
                }
                .padding(.top, 20)
                .listRowInsets(EdgeInsets())
            }
 
            .navigationBarTitle(Text("New Restaurant"))
            .navigationBarItems(trailing:
                    Button(action: {
 
                    }, label: {
                        Text("Cancel")
                    })
            )
        }
 
    }
}
```
sau một số chỉnh sửa thì kết quả cuối cùng đó là:
![](https://images.viblo.asia/deb9dd84-4356-4195-aba8-0546b6b3521a.png)

Trên đây là cái nhìn tổng quan và ví dụ để chúng ta hiểu phần nào về SwiftUI làn sóng công nghệ mới có lẽ sẽ ảnh hưởng nhiều đến cách thức lập trình của các lập tình viên trong thời gian tới.

### Tài liệu tham khảo
https://www.appcoda.com/swiftui-form-ui/?fbclid=IwAR30J-oqV9SZwIhIbm27rOlO3qmVzLqpbuuePrGc1WzcWpWTqSF1vLFaCFo