# I. Giới thiệu

Khi làm việc với SwiftUI, chúng ta sẽ phải thường xuyên làm việc với các loại property wrapper sau để chứa data:

- @State
- @StateObject
- @ObservedObject
- @EnvironmentObject

Mặc dù là các loại wrapper thường xuyên được sử dụng, tuy nhiên việc hiểu đúng cách dùng của chúng lại khá hại não chứ không hề đơn giản. Không chỉ người mới làm quen, mà ngay cả những người đã làm việc với SwiftUI một thời gian dài đôi khi cũng gặp nhiều khó khăn. Trong đó, 2 lỗi phổ biến thường xuyên sảy ra và gây ức chế là:
- Update data mà View không tự động update theo
- Đang yên tự nhiên mất data, mặc dù chả động chạm gì tới nó

Trong bài viết này, chúng ta sẽ cùng tìm hiểu về các loại property wrapper trên. Qua đó đưa ra các đánh giá khi nào thì nên dùng loại nào, nguyên nhân các lỗi trên từ đâu mà ra

# II. Nội dung

## 1. Tạo project

Để tìm hiểu tất nhiên là chúng ta phải có code thực tế, không thể ngồi nói xuông được. 

Các bạn mở Xcode, tạo iOS App project với tên SwiftUITutorial -> Interface SwiftUI -> Life Circle SwiftUI App -> Language Swift -> bấm nút create để tạo project

Sau khi tạo project xong, chúng ta có được 2 file:
- SwiftUITutorialApp.swift 
- ContentView.swift

Để đơn giản cho bài viết nên tôi sẽ chỉ sử dụng 2 file này, các sample View sẽ được viết hết vào contentView.swift cho các bạn tiện theo dõi.

## 2. @State

### a. Cơ bản
@State được giới thiệu từ iOS 13, nguyên văn định nghĩa @State từ Apple:
```
A property wrapper type that can read and write a value managed by SwiftUI.
```
Đó là định nghĩa, còn thực sự nó là gì? nó là property wrapper, được sử dụng để chứa các dữ liệu đơn giản cho View. Các bạn có thể khởi tạo một biến dạng Int với @State như sau:

```Swift
@State var number = 0
```
Bằng cách khởi tạo number dạng wrapper @State như trên, mỗi khi biến number có bất kỳ thay đổi gì, @State sẽ báo hiệu cho View biết để update lại View.
Ví dụ, các bạn thêm code vào struct ContentView như sau:

```Swift
struct ContentView: View {
    
    @State var number = 0
    
    var body: some View {
        Text("number: \(number)")
            .padding()
        
        Button("increment number") {
            number += 1
        }
    }
}
```
Chạy App, mỗi khi bấm button, number sẽ được cộng giá trị thêm 1, và được tự động update vào Text của ContentView

Vậy đã rõ, @State được sử dụng để tự động update View mỗi khi có thay đổi giá trị của property. Vậy trường hợp tôi không cần thay đổi View khi update number thì sao? giả sử khởi tạo biến number như sau:
```Swift
var number = 0
```

Rất tiếc là App sẽ không thể build được, lỗi sảy ra ở quá trình cộng giá trị number với nội dung lỗi như sau:
```
Left side of mutating operator isn't mutable: 'self' is immutable
```
Vậy tóm lại là trong View, chúng ta phải sử dụng @State (hoặc các property wrapper khác) để chứa data. Nếu không sử dụng, thì data sẽ không thể thay đổi được.

## b. Cách dùng

Cách dùng @State đã nói bên trên rồi, giờ cứ ốp vào dùng thôi mà? Đúng là @State được sử dụng như bên trên, nhưng các bạn đừng vội mừng. @State chỉ được sử dụng cho các trường hợp dữ liệu đơn giản, chủ yếu là các dạng dữ liệu mặc định của Swift: String, Bool, Int,… Các loại dữ liệu phức tạp như class thì không được sử dụng.

Ví dụ, trong ContentView.swift, các bạn thêm code sau:

```Swift
class StateClass {
    var number: Int = 0
}

struct StateView: View {
    @State var object = StateClass()
    
    var body: some View {
        VStack {
            Text("number: \(object.number)")
            Button("increment number") {
                object.number += 1
                print("number: \(object.number)")
            }
        }
    }
}
```

Bên trên, thay vì khởi tạo dữ liệu dạng Int, chúng ta khởi tạo dạng class StateClass. Logic thì cũng như bên trên, hiển thị giá trị của number, và khi bấm vào button thì tăng giá trị của number lên 1. Ngoài ra, chúng ta thêm code print() để theo dõi giá trị của object.number trên console log.

Tiếp theo, vào SwiftUITutorialApp.swift đổi View sang StateView như sau:

```Swift
@main
struct SwiftUITutorialApp: App {
    var body: some Scene {
        WindowGroup {
            //ContentView()
            StateView()
        }
    }
}
```
Build App, bấm vào button, chúng ta có kết quả:
- Giá trị object.number hiển thị trên Text View không hề thay đổi, vấn là giá trị 0
- Giá trị object.number được in ra console thì đã được tăng lên

Vậy là nếu sử dụng @State để khai báo biến với type là class, thì khi thay đổi giá trị trong property của class, View không hề được update. Điều này cũng dễ hiểu, vì @State chỉ theo dõi sự thay đổi của object, không quan tâm đến sự thay đổi của property thuộc object.

Nếu chúng ta sửa StateClass từ class về struct, thì code trên lại hoạt động bình thường. Vậy là @State có thể sử dụng được cho struct.

Kết luận: chỉ sử dụng @State cho các dạng data đơn giản của Swift, các struct, enum

## 2. @StateObject

### a. Cơ bản
@StateObject được giới thiệu từ iOS 14, nguyên văn định nghĩa @StateObject từ Apple:
```
A property wrapper type that instantiates an observable object.
```
Tương tự như @State, @StateObject cũng được sử dụng để chứa data của View. Chỉ khác ở chỗ @State thì sử dụng để chứa các loại data cơ bản, còn @StateObject được sử dụng để chứa data dạng reference, cụ thể là các class data.

Chúng ta lấy ví dụ sau:

 ```Swift
// ContentView.swift
// 1
class StateObjectClass: ObservableObject {
    @Published var number: Int = 0
}

struct StateObjectView: View {
	// 2
    @StateObject var object = StateObjectClass()
    
    var body: some View {
        VStack {
            Text("number: \(object.number)")
            Button("increment number") {
                object.number += 1
                print("number: \(object.number)")
            }
        }
    }
}

// SwiftUITutorialApp.swift
@main
struct SwiftUITutorialApp: App {
    var body: some Scene {
        WindowGroup {
            //ContentView()
            //StateView()
			// 3
            StateObjectView()
        }
    }
}
```
Bên trên, chúng ta lần lượt làm các việc sau:

* 1. Viết class StateObjectClass, cần lưu ý class này phải được conform từ protocol ObservableObject, và các property của nó phải được khai báo @Published property wrapper để có thể notify đến View mỗi khi có update data.
* 2. Khai báo @StateObject cho cho data dạng StateObjectClass. Code bên trong View thì vẫn giống như trước, gồm 1 Text View và 1 Button.
* 3. Đổi View hiển thị sang StateObjectView.

Build App, kết quả nhận được là nội dung của Text đã được update, không còn tình trạng không update View như khi sử dụng State nữa.

### b. Cách dùng

Cách dùng cơ bản của @StateObject đã được trình bày bên trên rồi, nó được sử dụng khi data có dạng class. Để phân biệt cách dùng @State và @StateObject thì như sau:
- @State sử dụng cho các dạng data cơ bản, struct, enum
- @StateObject sử dụng cho class

Nhưng, chuyện không dừng lại ở đây, bởi vì chúng ta còn có thêm loại property wrapper khác mà tôi sẽ trình bày dưới đây: @ObservedObject. Phân biệt khi nào dùng @StateObject, khi nào dùng @ObservedObject cũng khá hại não. Để việc phân biệt dễ dàng hơn, tôi sẽ trình bày trong phần giới thiệu về @ObservedObject


## 3. @ObservedObject

### a. Cơ bản

@ObservedObject được giới thiệu từ iOS 13, , nguyên văn định nghĩa @ ObservedObject từ Apple:
```
A property wrapper type that subscribes to an observable object and invalidates a view whenever the observable object changes
```
Giống hệt với @StateObject, @ObservedObject cũng được sử dụng để chứa class data, ngay cả nguyên tắc viết class cũng giống hệt với @StateObject.

Các bạn thêm các đoạn code vào từng file như sau:

```Swift
//  ContentView.swift
// 1
struct ObservedObjectView: View {
    @ObservedObject var object = StateObjectClass()
    
    var body: some View {
        VStack {
            Text("number: \(object.number)")
            Button("increment number") {
                object.number += 1
                print("number: \(object.number)")
            }
        }
    }
}

//  SwiftUITutorialApp.swift
@main
struct SwiftUITutorialApp: App {
    var body: some Scene {
        WindowGroup {
            //ContentView()
            //StateView()
            //StateObjectView()
			// 2
            ObservedObjectView()
        }
    }
}
```
Bên trên, chúng ta lần lượt làm:

* 1. Tạo struct ObservedObjectView. Nội dung bên trong giống hệt StateObjectView, chỉ khác thay vì khai báo wrapper cho property là @StateObject thì chúng ta khai báo là @ObservedObject
* 2. Sử dụng ObservedObjectView() là View khi chạy App

Kết quả chạy App không có gì thay đổi, App vẫn chạy đúng như những gì chúng ta dự tính. Vậy là cách viết của @ObservedObject và @StateObject là giống hệt nhau

### b. Cách dùng

Phân biệt với @State, thì @ObservedObject cũng tương tự như @StateObject
- @State sử dụng cho các data cơ bản, struct, enum
- @ObservedObject sử dụng cho các data dạng class

Bây giờ, chúng ta sẽ chuyển sang phần hại não hơn: Phân biệt cách sử dụng của @ObservedObject và @StateObject. Để làm được việc này, chúng ta cần phân biệt sự khác nhau giữa @StateObject và @ObservedObject:

@StateObject: Là 1 phần và được quản lý bởi View. Nó được thực thi trước khi body của View được khởi tạo, nó là dạng “source of truth”
 của View.

@ObservedObject: Không phải là 1 phần của View, vì thế tất nhiên là không được quản lý bởi View. Không có gì đảm bảo được rằng trong body, data của @ObservedObject đã được sẵn sàng. Có thể gây ra crash App nếu data chưa tồn tại

Vậy là, việc phân biệt cách dùng @StateObject và @ObservedObject theo một nghĩa nào đấy, cũng tương tự như cách dùng @State và @Binding. 
- @State được khởi tạo từ View cha, @Binding khai báo ở View con. Data được pass từ @State -> @Binding.
- @StateObject được tạo từ View cha, @ObservedObject được khai báo ở View con. Data được pass từ @StateObject -> @ObservedObject.

Bên trên, cách tôi dùng @ObservedObject không đúng. @ObservedObject không nên được khởi tạo ngay trong View, mà nên được gán từ một nơi khác đến, cụ thể là từ View cha đến. Khi Không có View cha thì chỉ nên khai báo với @StateObject wrapper. Ví dụ dưới đây là cách dùng @ObservedObject, pass data từ @StateObject sang:

```Swift
// ContentView.swift
struct ObservedObjectView: View {
	// 1
    @ObservedObject var object: StateObjectClass
    var body: some View {
        VStack {
            Text("number: \(object.number)")
            Button("increment number") {
                object.number += 1
                print("number: \(object.number)")
            }
        }
    }
}

struct StateObjectView: View {
    @StateObject var object = StateObjectClass()
    
    var body: some View {
        NavigationView {
            VStack {
                Text("number: \(object.number)")
                Button("increment number") {
                    object.number += 1
                    print("number: \(object.number)")
                }
                // 2
                NavigationLink(destination: ObservedObjectView(object: object)) {
                    Text("To ObservedObjectView")
                }
            }
        }
    }
}

// SwiftUITutorialApp.swift
@main
struct SwiftUITutorialApp: App {
    var body: some Scene {
        WindowGroup {
            //ContentView()
            //StateView()
            StateObjectView()
        }
    }
}
```

Bên trên, chúng ta lần lượt làm các việc:
* 1. Trong ObservedObjectView, chỉ khai báo biến của @ObservedObject chứ không khởi tạo.
* 2. Trong StateObjectView, thêm navigationView với destination là ObservedObjectView, data được pass từ @StateObject của StateObjectView sang @ObservedObject của ObservedObjectView
* 3. Sửa trong main để load StateObjectView khi chạy.

Trong code trên, khi giá trị của object.number ở 1 trong 2 View thay đổi, View còn lại cũng nhận được sự thay đổi và update View.

Ngoài ra, nếu App support từ iOS 13, thì mặc định sử dụng @ObservedObject rồi, chứ iOS 13 thì làm đếch gì đã có @StateObject mà dùng đâu.

### c. Lưu ý khi dùng @StateObject, @ObservedObject

Sử dụng @StateObject, @ObservedObject không đúng cách có thể gây ra hiện tượng mất dữ liệu theo một cách chúng ta không mong muốn. Vì vậy có 2 lưu ý chúng ta cần chú ý như sau:

#### Lưu ý 1:
Trong các case thông thường, luôn sử dụng @StateObject và @ObservedObject như trên tôi đã đề cập. Nếu dùng sai, cụ thể là khởi tạo giá trị cho @ObservedObject trong View, có thể dẫn đến mất data. Ví dụ, chúng ta  thay đổi StateObjectView và ObservedObjectView như sau:

```Swift
struct StateObjectView: View {
    @StateObject var object = StateObjectClass()
    
    var body: some View {
        VStack {
            Text("number: \(object.number)")
            Button("increment number") {
                object.number += 1
                print("number: \(object.number)")
            }
            
            ObservedObjectView()
        }
    }
}

struct ObservedObjectView: View {
    @ObservedObject var object = StateObjectClass()
    var body: some View {
        VStack {
            Text("number: \(object.number)")
            Button("increment number") {
                object.number += 1
                print("number: \(object.number)")
            }
        }
    }
}
```

Build App, dùng thử cả 2 button, để ý sẽ thấy mỗi khi bấm button của StateObjectView, giá trị của object.number trong ObservedObjectView ngay lập tức bị reset về giá trị khi khởi tạo ban đàu. Nguyên nhân là cũng tương tự như reference type, @ObservedObject không được “giữ” bởi View, cũng không được giữ ở bất kỳ đâu, nên khi ObservedObjectView bị load lại, giá trị sẽ được khởi tạo lại.

Để giải quyết vấn đề, hoặc là bạn khai báo object là @StateObject, hoặc là bạn làm theo cách đúng: pass data từ @StateObject sang. Khi pass data sang, @ObservedObject sẽ được giữ bởi StateObjectView, không bị mất đi khi refresh View.

#### Lưu ý 2:
@StateObject không bị reset data khi refresh View, nhưng do nó được giữ bởi View, nên nếu View bị khởi tạo lại thì đương nhiên là data cũng sẽ bị khởi tạo lại. Ví dụ, thay đổi StateObjectView và ObservedObjectView như code sau:

```Swift
struct StateObjectView: View {
    @StateObject var object = StateObjectClass()
    
    var body: some View {
		// 1
        NavigationView {
            VStack {
                Text("number: \(object.number)")
                Button("increment number") {
                    object.number += 1
                    print("number: \(object.number)")
                }

                NavigationLink(destination: ObservedObjectView()) {
                    Text("To ObservedObjectView")
                }
            }
        }
    }
}

struct ObservedObjectView: View {
	// 2
    @StateObject var object = StateObjectClass()
    var body: some View {
        VStack {
            Text("number: \(object.number)")
            Button("increment number") {
                object.number += 1
                print("number: \(object.number)")
            }
        }
    }
}
```
Bên trên, chúng ta lần lượt làm:
* 1. Thêm NavigationView để present ObservedObjectView từ StateObjectView
* 2. Trong ObservedObjectView, khai báo object với dạng @StateObject

Chạy App, các bạn sẽ thấy là data của object trong ObservedObjectView sẽ luôn được khởi tạo lại mỗi khi các bạn vào màn hình ObservedObjectView và back trở lại.
Điều này là bình thường, vì thông thường các bạn sẽ muốn data được reset mỗi khi vào. Tuy nhiên, nếu muốn data không bị reset, các bạn cần dùng @ObservedObject thay vì @StateObject.

## 4. @EnvironmentObject

### a. Cơ bản

@EnvironmentObject cũng được giới thiệu từ iOS 13, nguyên văn định nghĩa từ Apple như sau:
```
A property wrapper type for an observable object supplied by a parent or ancestor view.
```
Tương tự như @StateObject và @ObservedObject, @EnvironmentObject được sử dụng để quản lý data dạng class cho View. Tuy nhiên, cách viết và cách sử dụng của @EnvironmentObject không giống với 2 loại property wrapper trên.

Về cách sử dụng, @EnvironmentObject giống với @ObservedObject ở chỗ cũng là data được pass từ View khác tới , tuy nhiên nó khác với @ObservedObject ở chỗ @ObservedObject được sử dụng khi pass data từ View cha -> View con, còn @EnvironmentObject Khi data được pass từ View cha, bất kỳ View con nào trong hệ thống View đều có thể lấy ra sử dụng, không phải pass data qua nhiều cấp.

Chúng ta lấy ví dụ về cách viết @EnvironmentObject như sau:

```Swift
struct StateObjectView: View {
    @StateObject var object = StateObjectClass()
    
    var body: some View {
        NavigationView {
            VStack {
                Text("number: \(object.number)")
                Button("increment number") {
                    object.number += 1
                    print("number: \(object.number)")
                }
                // 1
                NavigationLink(destination: EnvironmentObjectView()) {
                    Text("To EnvironmentObjectView")
                }
            }
        }
        .environmentObject(object) // 2
    }
}

// 3
struct EnvironmentObjectView: View {
	// 4
    @EnvironmentObject var object: StateObjectClass

    var body: some View {
        Text("number: \(object.number)")
        Button("increment number") {
            object.number += 1
            print("number: \(object.number)")
        }
    }
}
```
Bên trên, chúng ta lần lượt làm các việc:
* 1. StateObjectView, thay vì present ObservedObjectView trong ví dụ trước thì ta present EnvironmentObjectView
* 2. Sử dụng hàm  environmentObject() để gán object vào View.
* 3. Viết struct EnvironmentObjectView
* 4. Khai báo property dạng @EnvironmentObject, sau đó trong body cứ thế mình sử dụng thôi

### b. Cách dùng

Phân biệt cách dùng của @EnvironmentObject so với @StateObject và @ObservedObject rất đơn giản, không phức tạp:
- @EnvironmentObject giống như @ObservedObject, được pass data từ View khác tới, bản thân View khai báo @EnvironmentObject không giữ refefence đến nó.
- @ObservedObject chỉ được pass data từ View cha đến View con, còn @EnvironmentObject được pass đến toàn bộ hệ thống View con.

Ví dụ dễ hiểu, Giả sử chúng ta có 3 View: ViewA, ViewB, ViewC với hệ thống:
- ViewA là cha của ViewB
- ViewB là cha của ViewC
Khi muốn pass data từ ViewA đến ViewC:
- Nếu sử dụng @ObservedObject, chúng ta cần pass từ ViewA->ViewB, rồi lại pass data từ ViewB->ViewC
- Nếu sử dụng @EnvironmentObject, chúng ta dùng hàm environmentObject() để pass data, từ ViewB và ViewC đều có thể lấy được data. Thậm chí nếu sau này tạo thêm ViewD, ViewE gì đấy thì vẫn lấy data ra được.

# III. Kết luận
Trên đây chúng ta đã cùng tìm hiểu về @State, @StateObject, @ObservedObject, @EnvironmentObject, cách dùng chúng, phân biệt sự khác nhau giữa chúng, những lưu ý khi sử dụng để không bị các lỗi không mong muốn. Hi vọng bài viết này mang lại cho các bạn thông tin hữu ích.

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day :)