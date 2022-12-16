Xin chào các bạn trong quá trình phát triển app thì chúng ta thường xuyên sử dụng Gesture để nhận biết các hành động. Thì hôm nay mình sẽ giới thiệu cho các bạn các cách đơn giản để có thể nhận biết các cử chỉ hành động của người dùng trong SwiftUI. :sweat_smile: :sweat_smile: :sweat_smile:
# Tap Gesture 
Đây là gesture được sử dụng nhiều nhất và phổ biến nhất nó bắt cho ta sự kiện khi người dùng nhấn vào một element. Thì lúc này nó sẽ thực hiện event mà ta đã định nghĩa ở trong closure của hàm **onTapGesture()**
```swift
        VStack {
            Image("smile")
                .resizable()
                .scaledToFit()
                .padding()
                .onTapGesture {
                    showAlert.toggle()
                }
        }
        .alert(isPresented: $showAlert, content: {
            Alert(title: Text("Smile!!!"))
        })
```
Thì ở ví dụ nhỏ này thì khi mình tap vào hình ảnh trên thì nó sẽ cho ra chúng ta một thông báo nhỏ có tiêu đề là Smile. Đó là cách đơn giản để có thể bắt sự kiện tap gesture. Trên thực tế có những cách thú vị để kết hợp các cử chỉ với nhau rất đáng thử. Và khi run đoạn code trên ta sẽ được như sau.
![](https://images.viblo.asia/cd50876d-647b-4a0e-8cfc-23565eca9c4e.gif)

Đó là nếu ta chỉ muốn người dùng bấm một cái thì nó sẽ show cho ta cái thông báo như trên. Còn nếu ta muốn người dùng phải bấm 2 hoặc 3 lần vào tấm hình thì mới show thì ta sẽ thêm thuộc tính count vào chổ **onTapGesture** để thực hiện được việc đó.
```swift
        VStack {
            Image("smile")
                .resizable()
                .scaledToFit()
                .padding()
                .onTapGesture(count: 3) {
                    showAlert.toggle()
                }
        }
        .alert(isPresented: $showAlert, content: {
            Alert(title: Text("Smile!!!"))
        })
```
# LongPressGesture
Tiếp theo nếu ta muốn người dùng phải nhấn giữ vào một element để có thể thực hiện một công việc nào đó thì ta có thể sử dụng thằng **onLongPressGesture()**.
Chúng ta hãy xem qua ví dụ nhỏ sau đây của mình để hiểu rỏ về nó nhé. 
```swift
    @State var scale: CGFloat = 1.0
    var body: some View {
        VStack {
            Image("dollar")
                .resizable()
                .frame(width: 100, height: 100, alignment: .center)
                .scaledToFit()
                .padding()
                .scaleEffect(scale)
                .onLongPressGesture {
                    scale += 1
                }
        }
    }
```
 Ở ví dụ này thì khi mình nhắn giữ vào hình ảnh đồng coin trong một khoảng thời gian thì đồng coin của mình nó sẽ to ra. Bạn hãy xem qua ảnh GIF phía dưới để thấy dòng code của ta chạy sẽ như thế nào nhé.
 ![](https://images.viblo.asia/96e5394e-9214-4c7c-bd16-01c267ef0e1f.gif)
 
 Giống như cử chỉ chạm, cử chỉ nhấn và giữ cũng có thể tùy chỉnh. Ví dụ: bạn có thể chỉ định thời lượng tối thiểu cho hành động nhắn giữ đó của bạn, bạn phải nhấn giữ trong thời gian nhất định thì mới thực hiện hành động. Ví dụ: hành động này sẽ kích hoạt sau ba giây:
```swift 
     VStack {
            Image("dollar")
                .resizable()
                .frame(width: 100, height: 100, alignment: .center)
                .scaledToFit()
                .padding()
                .scaleEffect(scale)
                .onLongPressGesture(minimumDuration: 3) {
                    scale += 1
                }
        }
```
Còn nếu ta muốn bắt cả sự kiện khi người dùng bắt đầu nhắn giữ và sau khi người dùng nhấn giữ xong thì sao? Lúc này đơn giản thôi ta chỉ cần thêm vào cho nó một số tuỳ chỉnh là được.
```swift
        VStack {
            Image("dollar")
                .resizable()
                .frame(width: 100, height: 100, alignment: .center)
                .scaledToFit()
                .padding()
                .scaleEffect(scale)
                .onLongPressGesture(pressing: { _ in
                        scale += 1
                    }) {
                        scale = 1
                }
        }
```

# DragGesture
Tiếp theo trong thằng gesture này thì mình muốn giới thiệu một gesture cho phép ta có thể kéo thả các element của ta một cách thuận tiện đó chính là: **DragGesture()**
Thì để sử dụng những gesture này thì phía apple khuyến khích ta nên sử dụng nó ở trong **gesture()** để có thể sài được thêm các event đặc biệt của từng gesture như **onEnded()** và **onChanged()**
. Hai event khi ta bắt đầu hành động và sau khi hành động của ta kết thúc. Kết hợp nhuần nhuyển hai event này giúp ta có thể tạo ra được các cử chỉ tuyệt đẹp như ta mong muốn.
Hãy cùng đến với ví dụ ở sau để chúng ta cùng xem thằng gesture này có thể làm được những việc gì nhé.

```swift
    VStack {
            Image("balloon")
                .resizable()
                .frame(width: 100, height: 100, alignment: .center)
                .scaledToFit()
                .padding()
                .offset(offset)
                .gesture(
                    DragGesture()
                        .onChanged { gesture in
                            self.offset = gesture.translation
                        }

                        .onEnded { _ in
                            self.offset = .zero
                        }
                )
        }
```
Ví dụ trên cho phép ta kéo thả hình ảnh quả bóng bay theo vị trí ta đang kéo. Và sau khi ta thả ra thì quả bóng bay sẽ bay về lại vị trí ban đầu của nó. Bạn hãy xem qua ảnh GIF dưới đây để thấy kết qủa sau khi run dòng code trên nhé.
![](https://images.viblo.asia/115bb1ca-a46b-4312-a20d-c704105eea0f.gif)

Thì để nhắc lại thì dòng code trên mình đã sử dụng hai thằng là onChanged và onEnded.

**onChanged()**  thêm một hành động để thực hiện khi giá trị của cử chỉ thay đổi. Nó sẽ truyền một DragGesture.Value, chứa các thuộc tính của một cử chỉ kéo. Giá trị DragGesture.Value này sẽ được cập nhật một cách liên tục mỗi khi ta thay đổi vị trí.

**onEnded** để thêm một hành động để thực hiện khi cử chỉ kết thúc.

# RotationGesture
Đây là cử chỉ xoay ta nhận biết được hành động xoay của người dùng giống như hành động ta quay số ở các trang trúng thưởng, hay là quay số ở các loại điện thoại thời xưa.
Thì tương tự như các gesture trên thì ta cũng nên sử dụng thằng này trong **gesture()** để có thể theo dõi chuỗi sự kiện xoay thay đổi như thế nào.
Chúng ta cùng đi qua ví dụ sau của mình để hiểu rỏ hơn về cái gesture này nhé.
```swift
    VStack {
            Image("fan")
                .resizable()
                .scaledToFill()
                .frame(width: 200, height: 200)
                .rotationEffect(Angle.degrees(degree))
                .gesture(RotationGesture()
                    .onChanged({ angle in
                        self.degree = angle.degrees
                    })
            )
        }
```

Rồi kết thúc bài viết mình mong các bạn cũng đã hiểu hơn về gesture ở trong SwiftUI nó như thế nào rồi. Cảm ơn các bạn đã đọc bài viết của mình :heart_eyes::kissing_heart:

Bài viết mình tham khảo tại đây: https://developer.apple.com/documentation/swiftui/gestures
https://www.hackingwithswift.com/books/ios-swiftui/how-to-use-gestures-in-swiftui