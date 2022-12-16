# I. giới thiệu
Trong [phần 1](https://viblo.asia/p/tim-hieu-ve-swiftui-phan-1-xay-dung-list-view-don-gian-maGK7OjOKj2) tôi đã giới thiệu một số thao tác cơ bản với SwiftUI và cách tạo 1 list view đơn giản bằng SwiftUI. Trong phần tiếp theo này, chúng ta sẽ tiếp tục làm thêm một vài thứ cho App được hoàn thiện hơn. Cụ thể những việc chúng ta sẽ làm:
* Chỉnh sửa giao diện Text view của các cell, bằng cách thêm các attribute mà SwiftUI gọi là modifier
* Thêm NavigationView, cũng giống như UINavigationController, để hiển thị title và xử lý di chuyển giữa các màn hình
* Thêm phần xử lý khi chúng ta chạm vào các cell, cụ thể khi select cell thì chúng ta chuyển sang màn detail, giống như function của UITableViewDelegate 
# II. Nội dung
Bài viết này sẽ tiếp tục source code của phần 1, các bạn có thể xem lại phần 1 [tại đây](https://viblo.asia/p/tim-hieu-ve-swiftui-phan-1-xay-dung-list-view-don-gian-maGK7OjOKj2)
## 1. Giao diện Text view
Ôn lại phần trước 1 tí, chúng ta có thể thêm modifier bằng vài cách sau:
 * Thêm code trực tiếp: nhanh, gọn, lẹ, nhưng chỉ phù hợp với người đã code quen, chưa quen thì chưa biết syntax tất nhiên không code được. Sau này chúng ta sẽ chỉ dùng cách này là chính.
* Kéo thả: tương tự kéo thả trong storyboard, các bạn bấm vào biểu tượng “+”, chọn tab “Show the Modifiers library”, chọn modifier và kéo vào thôi. Các bạn có thể kéo vào màn hình preview, hoặc kéo trực tiếp vào file code cũng được
* SwiftUI Inspector: dùng tổ hợp “command + click chuột”, chọn Show SwiftUI inspector, rồi chọn modifier muốn thêm

OK, bây giờ chúng ta sẽ thực hành. giả sử tôi muốn:
- Text name có Size lớn, text màu cam, và background màu xám
- Text price có text màu đỏ, có border màu xám, border width là 1
Design tương đối xấu, nhưng tôi là khách hàng, tôi thích thế đấy, làm cho tôi đi!

Để thực hiện những thay đổi này, đầu tiên các bạn mở file PhoneCell.swift ra.

Đầu tiên, chúng ta sử dụng “command + click chuột” vào Text name để mở SwiftUI inspector, các bạn lần lượt chọn như sau:
- Trong phần Font, chọn Font là large title, color là Orange
- Trong dropdown Add modifier, chọn Background, chọn màu gray cho background
Sau khi chọn, ô SwiftUI inspector sẽ được như hình dưới đây

![](https://images.viblo.asia/eb6efa6d-f717-442b-b5a5-72f35c3f0579.png)

Tiếp theo, chúng ta sử dụng kéo thả để thêm modifier cho Text price. Các bạn chọn biểu tượng “+”, chọn tab “Show the Modifiers library” và lần lượt:
- Tìm Border (hình dưới), kéo và thả vào trong Text price. Vào trong code và chuyển color thành Color.gray.
- Tìm Foreground Color, kéo và thả vào trong Text price. Vào trong code và chuyển color thành Color.red.

![](https://images.viblo.asia/2bff43ec-5eb5-4f4a-9ac6-ebf0659dadf9.png)

Sau khi làm các bước bên trên, code trong body của PhoneCell.Swift sẽ được như sau:
```Swift
	var body: some View {
        VStack(alignment: .leading) {
            Text(phone.name)
                .font(.largeTitle)
                .foregroundColor(Color.orange)
                .background(Color.gray)
            Text(phone.price)
                .border(Color.gray, width: 1)
                .foregroundColor(Color.red)
        }
    }
```
## 2. Thêm NavigationView

Các bạn mở file ContentView.swift lên, hiện tại body của View này đang code như sau:
```Swift
	var body: some View {
        List(phones) { phone in
            PhoneCell(phone: phone)
        }
    }
```
Để thêm NavigationView, chúng ta chỉ cần thêm code như sau:
```Swift
	var body: some View {
        NavigationView {
            List(phones) { phone in
                PhoneCell(phone: phone)
            }
        }
    }
```
Code quá đơn giản, chỉ cần wrapper NavigationView cho List là xong :v
Vậy việc thêm title cho View, như navigation bar title thì sao? đơn giản thêm code sau:
```Swift
	var body: some View {
        NavigationView {
            List(phones) { phone in
                PhoneCell(phone: phone)
            }
            .navigationBarTitle("List iPhone")
			
        }
        
    }
```
SwiftUI mới chỉ ở version đầu tiên, vẫn còn thiếu sót nhiều thứ cần cải thiện, ví dụ ở đây chúng ta không thể (chưa thể) dùng SwiftUI để customize cho Navigation Bar title Chắc chắn vấn đề này sẽ được giải quyết trong tương lai, tại thời điểm hiện tại chúng ta vẫn phải sử dụng UIKit để làm việc này. Việc customize Navigation Bar title hơi loằng ngoằng 1 tí, và không nằm trong nội dung bài viết này, nên tôi sẽ không đề cập trong bài viết, các bạn có thể Google code nếu muốn nhé.

## 3. Xử lý chuyển màn với action tap

Để chuyển màn (push view controller), chúng ta sử dụng NavigationLink. Cụ thể, để chuyển màn chúng ta làm như sau;
```Swift
	var body: some View {
        NavigationView {
            List(phones) { phone in
                NavigationLink(destination: Text(phone.name)) {
                    PhoneCell(phone: phone)
                }
            }
            .navigationBarTitle("List iPhone")
        }
    }
```
Đó, nhiêu đó code thôi là các bạn có được thao tác push view controller rồi. Ở đây chúng ta dùng hàm NavigationLink(destination: , label: ), trong đó 
* destination: là View sẽ hiển thị trong màn sau khi được push. Cũng như ContentView, destination View sẽ được gói trong 1 UIViewController, và UINavigationController sẽ push UIViewController đó vào stack.
* label: là closure return View mà khi click vào sẽ thực hiện action push, cụ thể ở đây là PhoneCell.

Bây giờ chúng ta sẽ thử test App bằng cách sử dụng preview. Preview của SwiftUI rất lợi hại, chúng ta không những có thể xem sự thay đổi của các View ngay khi sửa code, mà còn có thể thao tác trên preview như đang chạy trên simulator. Để thực hiện test, các bạn bấm vào nút “Live preview” với icon play như trong hình sau

![](https://images.viblo.asia/1dfad363-29da-4956-aaf8-4b857da82dc6.png)

Chờ 1 tí để preview load, và sau đó chúng ta có thể thao tác như trên simulator:
- click vào cell để chuyển sang màn detail
- click back để quay về màn list

## 4. Xây dựng màn phone detail

Trong phần trên, chúng ta đã thêm chức năng chọn phone cell để sang detail, tuy nhiên trong thực tế màn detail chẳng bao giờ chỉ có mỗi 1 Text View, vì thế chúng ta sẽ tạo một Detail View để chuyển sang màn đó.

Đầu tiên, các bạn tạo file mới: File -> New -> File… -> SwiftUI View, đặt tên là PhoneDetail rồi bấm create để tạo.

Tiếp theo, các bạn thêm code với nội dung như sau:
```Swift
import SwiftUI

struct PhoneDetail: View {
	// 0
    var phone: Phone
    
    var intro = "The iPhone is a line of smartphones designed and marketed by Apple Inc. All generations of the iPhone use Apple's iOS mobile operating system software. The first-generation iPhone was released on June 29, 2007, and multiple new hardware iterations with new iOS releases have been released since."
    
    var body: some View {
		// 1
        VStack(alignment: .center) {
            Text(phone.name)
                .font(.largeTitle)
            Divider()
            Text(phone.price)
                .font(.title)
            Divider()
            Text(intro)
                .font(.headline)
                .multilineTextAlignment(.center)
                .lineLimit(10)
        }
		// 2
        .padding()
		// 3
        .navigationBarTitle(phone.name)
    }
}

struct PhoneDetail_Previews: PreviewProvider {
    static var previews: some View {
		// 4
        PhoneDetail(phone: phoneData[0])
    }
}
```
Trong đoạn code trên, chúng ta lần lượt làm các việc:

* 0: thêm property cho PhoneDetail View, cụ thể là 2 property phone và info
* 1: Dựng các View cho màn PhoneDetail. Cách thêm các View thì tôi đã đề cập phía trên rồi, nên sẽ không nói lại nữa. Các bạn chú ý Divider là một View của SwiftUI, và đúng như cái tên của nó, nó dùng để tách các View bằng cách tạo đường thẳng giữa các view
* 2: padding VStack View để Text trong VStack không bị tràn ra mép màn hình điện thoại
* 3: tạo navigation title cho màn PhoneDetail

Quay trở lại file ContentView.swift, chúng ta thay đổi body của ContentView như sau:
```Swift
    var body: some View {
        NavigationView {
            List(phones) { phone in
                NavigationLink(destination: PhoneDetail(phone: phone)) {
                    PhoneCell(phone: phone)
                }
            }
            .navigationBarTitle("List iPhone")
        }
    }
```
Bên trên, trong desination param của NavigationLink, thay vì khởi tạo instance Text View thì chúng ta khởi tạo instance của PhoneDetail View, vậy là xong.

Sử dụng live preview để chạy thử, chúng ta được kết quả màn phone detail như hình sau:

![](https://images.viblo.asia/cf8f90c5-4f7c-4056-b4b4-d13eb9c87938.png)
# III. Tổng kết
Trong bài viết này, tôi đã tiếp tục giới thiệu đến các bạn thêm một số thứ hay ho nữa về SwiftUI. Trong các phần sau, tôi sẽ tiếp tục giới thiệu đến các bạn các phần khác nữa, để chúng ta có thể tạo App mà chỉ cần sử dụng SwiftUI.

Cuối cùng, xin cảm ơn các bạn đã theo dõi bài viết này, have a nice day :)