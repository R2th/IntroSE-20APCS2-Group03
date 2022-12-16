# I. Giới thiệu

Trong các phần trước của series, chúng ta đã tìm hiểu về cách xây dựng list view, navigation view và cách navigate giữa các screen của SwiftUI. Ngoài ra, chúng ta cũng đã tìm hiểu về property wrapper, thứ thường xuyên được sử dụng trong SwiftUI. 

Trong bài viết này, chúng ta sẽ tiếp tục cùng nhau tìm hiểu cách xây dựng 1 form input để người dùng nhập dữ liệu. Form input là một thành phần rất thông dụng mà gần như mọi ứng dụng đều sử dụng, từ nhập form để đăng nhập, form điền thông tin,... hầu như mọi thứ người dùng nhập vào đều thông qua form. Thông thường,  để xây dựng form bằng UIKit, chúng ta sẽ nghĩ ngay đến việc sử dụng UITextField và UITextView. Trên SwiftUI, không còn UITextField và UITextView nữa, chúng ta sử dụng TextField.

Chú ý, SwiftUI vẫn còn chưa hoàn thiện, vì vậy còn nhiều View component trên UIKit vẫn chưa sử dụng được trên SwiftUI. UITextView là một ví dụ, trên SwiftUI chúng ta chưa có TextView. TextView sẽ được thêm trên Xcode 11.4, nhưng hiện tại Xcode 11.3 chúng ta chưa có TextView. Vì vậy bài viết này sẽ chỉ tìm hiểu về TextField mà thôi.

Sau khi hoàn thành bài viết, chúng ta sẽ xây dựng được một form đăng ký như hình sau:

![](https://images.viblo.asia/9159c437-1f66-4624-a8b6-f72b07fa1a96.png)

# II. Nội dung

## 1. Tạo project

Đầu tiên, chúng ta tạo 1 project: Xcode -> File -> New -> Project -> iOS -> Single View App, với Product Name là TextFieldTutorial, Language là Swift, User Interface là SwiftUI và create project

## 2. Tạo TextField

Chúng ta sẽ tạo 1 View riêng chứa TextField để có thể tái sử dụng sau này. Đầu tiên, các bạn tạo file mới chứa code View cho TextField: Xcode -> File -> New -> File -> iOS -> SwiftUI View -> và tạo file với tên là LabelTextField

Tiếp theo, chúng ta implement cho LabelTextField.swift với code như sau:

```Swift
struct LabelTextField: View {
    // 1
    var title = "TITLE"
    var text: Binding<String>
    
    var body: some View {
        VStack(alignment: .leading) {
            // 2
            Text(title)
                .font(.headline)
            // 3
            TextField(title, text: text)
                .padding(.all)
                .background(Color(red: 255.0/255.0, green: 244.0/255.0, blue: 233.0/255.0, opacity: 1.0))
                .cornerRadius(10.0)
        }
        .padding(.horizontal, 15)
    }
}

struct LabelTextField_Previews: PreviewProvider {
    // 4
    @State static var text = ""
    static var previews: some View {
        // 5
        LabelTextField(text: $text)
    }
}
```

Trong đoạn code trên:
* 1: khai báo 2 property của View. Trong đó, title để điền title cho Text và TextField, còn text là property dạng Binding<String>. Binding là một builtin Property wrapper Struct của SwiftUI, trong bài viết trước tôi đã giới thiệu về Property wrapper, các bạn có thể xem lại tại đây <LINK>. Hiện tại các bạn chưa cần hiểu sâu về Binding, chỉ cần hiểu nó là dạng dữ liệu cần thiết của TextField.
* 2: Tạo Text label cho textview, với text là title của LabelTextField.
* 3: Tạo TextField với các modifier padding, background, cornerRadius. Các bạn chú ý, khởi tạo TextField cần có data dạng Binding<String>.
* 4. Khai báo Built in Property Wrapper State của SwiftUI cho preview. State và Binding là 2 Property wrapper sẽ luôn luôn được dùng trong SwiftUI.
* 5. Biến text từ State thành Binding bằng cách sử dụng ký hiệu ’$’ đằng trước.

Sự khác biệt lớn nhất giữa State và Binding là ở chỗ State thì các bạn có thể khởi tạo được, còn Binding thì không thể; State khai báo ở view nào thì là của chính View đó, còn Binding thì được pass data từ view khác qua.

Sau khi hoàn thành LabelTextField.swift, chúng ta chuyển sang ContentView.swift và thêm code như sau:
```Swift
struct ContentView: View {
	// 1
    @State var name = ""
    var body: some View {
        VStack(alignment: .leading) {
			// 2
            LabelTextField(title: "Name", text: $name)
        }
    }
}  
```

Bên trên, chúng ta lần lượt làm:
* 1. Thêm State property name dạng String.
* 2. Tạo View TextField cho ContentView. Struct LabelTextField đã được chúng ta tạo bên trên, State name khi được thêm ký tự ‘$’ sẽ trở thành binding để gán vào LabelTextField.

Nhìn vào preview, chúng ta sẽ có được kết quả như hình sau:

![](https://images.viblo.asia/72210132-9719-43ea-938b-db4c09f51712.png)

## 3. Tạo secure TextField

Để tạo input cho password, nếu như trong UIKit chúng ta thêm thuộc tính “secure text entry“ cho UITextField, thì trong SwiftUI chúng ta sử dụng SecureField. SecureField là subclass của View và hơi bất ngờ là nó lại không kế thừa từ TextField

Giống như bước bên trên, chúng ta sẽ tạo một struct SecureTextField với nội dung code như sau:

```Swift
struct SecureTextField: View {
    var title = "TITLE"
    @State var text: Binding<String>
    var body: some View {
        VStack(alignment: .leading) {
            Text(title)
                .font(.headline)
			// 1
            SecureField(title, text: text)
                .padding(.all)
                .background(Color(red: 255.0/255.0, green: 244.0/255.0, blue: 233.0/255.0, opacity: 1.0))
                .cornerRadius(10.0)
        }
        .padding(.horizontal, 15)
    }
}

struct SecureTextField_Previews: PreviewProvider {
    @State static var text = ""
    static var previews: some View {
        SecureTextField(text: $text)
    }
}
```

Struct SecureTextField cũng tương tự với Struct LabelTextField bên trên, chỉ có điều thay vì tạo TextField, thì chúng ta tạo SecureField.

Tiếp theo, chúng ta implement ContentView như sau:
```Swift
struct ContentView: View {
    @State var name = ""
    @State var password = ""
    @State var confirmPassword = ""
    var body: some View {
        VStack(alignment: .leading) {
            LabelTextField(title: "Name", text: $name)
            SecureTextField(title: "Password", text: $password)
            SecureTextField(title: "Confirm password", text: $confirmPassword)
        }
    }
}
```
Bên trên, chúng ta thêm 2 SecureTextField View vào contentView

## 4. Tạo DatePicker

Tương ứng với UIDatePicker bên UIKit, SwiftUI cũng có DatePicker View. Tương tự như trên, chúng ta sẽ tạo struct LabelDatePicker chứa DatePicker View

Các bạn tạo file LabelDatePicker.swift và thêm code như sau:

```Swift
struct LabelDatePicker: View {
    var title = "TITLE"
    var date: Binding<Date>
    var body: some View {
        VStack(alignment: .leading) {
            Text(title)
                .font(.headline)
			// 1
            DatePicker("", selection: date, displayedComponents: [.date])
        }
        .padding(.horizontal, 15)
    }
}

struct LabelDatePicker_Previews: PreviewProvider {
    @State static var date = Date()
    static var previews: some View {
        LabelDatePicker(date: $date)
    }
}
```

Bên trên, chúng ta cần quan tâm đến đoạn code khởi tạo instance của DatePicker View. Hàm khởi tạo DatePicker nhận 3 param đầu vào là titleKey, selection và displayedComponents

Tiếp tục thêm DatePicker vào ContentView như sau:

```Swift
struct ContentView: View {
    @State var name = ""
    @State var password = ""
    @State var confirmPassword = ""
    @State var date = Date()		// 1
    var body: some View {
        List {		// 2
            VStack(alignment: .leading) {
                LabelTextField(title: "Name", text: $name)
                SecureTextField(title: "Password", text: $password)
                SecureTextField(title: "Confirm password", text: $confirmPassword)
				// 3
                LabelDatePicker(title: "Day of birth", date: $date)
            }
        }
    }
}
```
    
Code bên trên đã khá rõ ràng, có 3 điểm chúng ta cần quan tâm:
* 1. PropertyWrapper State là dạng generic, ngoài String chúng ta còn có thể sử dụng với nhiều loại dữ liệu khác của Swift, như ở đây chúng ta sử dụng dữ liệu dạng Date
* 2. Chúng ta nhúng toàn bộ View của ContentView trong List View. Mục đích nhúng trong tình huống này là để cho content có thể scroll được. Với trường hợp Form có nhiều TextField, sử dụng List sẽ đảm bảo cho chúng ta không bị vỡ layout, thiếu field input
* 3. tạo LabelDatePicker View, gán Binding là State date ở trên

## 5. Tạo Button Submit

Lại là để reuse về sau, chúng ta sẽ tạo 1 struct cho Button. các bạn tạo file RoundedButton.swift với nội dung như sau:
```Swift
struct RoundedButton: View {
	// 1
    var title = "TITLE"
    var action: () -> ()
    var body: some View {
		// 2
        Button(action: {
            self.action()
        }) {
			// 3
            Spacer(minLength: 15)
            HStack {
                Spacer()
                Text(title)
                Spacer()
            }
            Spacer(minLength: 15)
        }
		// 4
        .foregroundColor(Color.white)
        .background(Color.red)
        .cornerRadius(10)
        .padding(.vertical, 25)
        .padding(.horizontal, 15)
    }
}
```
    
Bên trên, có 3 chỗ chúng ta cần quan tâm:
* 1. Khai báo title để làm title cho button, và action handler để xử lý khi chúng ta bấm vào button
* 2. Tạo Button View, hàm tạo button với 2 param là handler action khi tap button và View xây dựng button
* 3. Xây dựng View cho button
* 4. Edit các modifier của button View 

Cuối cùng, thêm Button View trên vào ContentView như sau:
```Swift
struct ContentView: View {
    @State var name = ""
    @State var password = ""
    @State var confirmPassword = ""
    @State var date = Date()
    var body: some View {
        List {
            VStack(alignment: .leading) {
                LabelTextField(title: "Name", text: $name)
                SecureTextField(title: "Password", text: $password)
                SecureTextField(title: "Confirm password", text: $confirmPassword)
                LabelDatePicker(title: "Day of birth", date: $date)
                RoundedButton(title: "Submit") {
                    print(self.name)
                    print(self.password)
                    print(self.confirmPassword)
                    print(self.date)
                }
            }
        }
    }
}
```

Kết quả, chúng ta có được một form input như hình sau:
    
![](https://images.viblo.asia/9159c437-1f66-4624-a8b6-f72b07fa1a96.png)


# III. Tổng kết

Trên đây tôi đã giới thiệu về cách tạo form input sử dụng SwiftUI. Sử dụng SwiftUI rất đơn giản, dễ code, ngắn gọn dễ đọc. Mặc dù hiện tại SwiftUI vẫn còn một số hạn chế (chưa tích hợp UITextView chẳng hạn), nhưng trong tương lai chắc chắn SwiftUI sẽ được cải thiện để ngày càng hoàn thiện hơn, đáp ứng được nhu cầu sử dụng của anh em dev.
Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này.