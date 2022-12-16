SwiftUI mang đến cách tiếp cận đơn giản trong việc xây dựng UI. Chúng ta có các thành phần List, Form Components và Bindings. Tất cả những điều này làm cho SwiftUI  trờ thành công cụ rất dễ sử dụng và rất hiệu quả. Nhưng hôm nay chúng ta sẽ nói về một tính năng khác của SwiftUI, và đó là Animations.

# Animation

Bạn có thể tạo ra các chuyển động mượt mà trong SwiftUI bằng cách gói nó vào trong block  *withAnimation*. Theo mặc định, SwiftUI sử dụng fade in và fade out để tạo hiệu ứng thay đổi. Hãy cùng xem một ví dụ nhỏ.

```
struct ContentView : View {
    @State private var isButtonVisible = true

    var body: some View {
        VStack {
            Button(action: {
                withAnimation {
                    self.isButtonVisible.toggle()
                }
            }) {
                Text("Press me")
            }

            if isButtonVisible {
                Button(action: {}) {
                    Text("Hidden Button")
                }
            }
        }
    }
}
```

Trong ví dụ trên, chúng ta kết hợp thay đổi State với block *withAnimation* và nó tạo ra hiệu ứng mờ dần của giao diện. Bạn có thể sửa đổi animation bằng cách chuyển các giá trị timing và spring.

```
struct ContentView : View {
    @State private var isButtonVisible = true

    var body: some View {
        VStack {
            Button(action: {
                self.isButtonVisible.toggle()
            }) {
                Text("Press me")
            }

            if isButtonVisible {
                Button(action: {}) {
                    Text("Hidden Button")
                }.animation(.basic())
            }
        }
    }
}
```

Trong đoạn code ở trên, chúng ta đạt được cùng một animation bằng cách thêm animation modifier. Chúng ta sử dụng animation cơ bản, nhưng bạn có thể truyền vào các thuộc tính khác.

Đôi khi chúng ta có một tình huống trong đó nhiều view phụ thuộc vào một số trạng thái và chúng ta muốn tạo hiệu ứng tuỳ thuộc vào sự thay đổi của views. Đối với trường hợp này, chúng ta có animatable bindings.

```
struct ContentView : View {
    @State private var isButtonVisible = true

    var body: some View {
        VStack {
            Toggle(isOn: $isButtonVisible.animation()) {
                Text("Show/Hide button")
            }

            if isButtonVisible {
                Button(action: {}) {
                    Text("Hidden Button")
                }
            }
        }
    }
}
```

Như bạn có thể thấy, chúng ta có thể dễ dàng chuyển đổi binding của mình thành animatable binding bằng cách gọi phương thức animation. Phương thức này wrap mọi thay đổi của binding value thành một animation block. Bạn có thể truyền các tham số cho phương thức này.

# Transitions

Như mình đã nói trước đây, SwiftUI sử dụng fade in và fade out làm mặc định trong transition, nhưng chúng ta có thể áp dụng bất kỳ transition nào khác mà chúng ta muốn. Hãy để thay thế fading với moving.

```
struct ContentView : View {
    @State private var isButtonVisible = true

    var body: some View {
        VStack {
            Toggle(isOn: $isButtonVisible.animation()) {
                Text("Show/Hide button")
            }

            if isButtonVisible {
                Button(action: {}) {
                    Text("Hidden Button")
                }.transition(.move(edge: .trailing))
            }
        }
    }
}
```

Trong ví dụ trên, chúng ta đính kèm transition modifier vào view. SwiftUI có một loạt các transition có sẵn để sử dụng như move, slide, scale, offset, opacity, v.v. Chúng ta có thể kết hợp chúng thành một transition duy nhất. Hãy cùng xem một ví dụ.

```
extension AnyTransition {
    static func moveAndScale(edge: Edge) -> AnyTransition {
        AnyTransition.move(edge: edge).combined(with: .scale())
    }
}

struct ContentView : View {
    @State private var isButtonVisible = true

    var body: some View {
        VStack {
            Toggle(isOn: $isButtonVisible.animation()) {
                Text("Show/Hide button")
            }

            if isButtonVisible {
                Button(action: {}) {
                    Text("Hidden Button")
                }.transition(.moveAndScale(edge: .trailing))
            }
        }
    }
}
```

Chúng ta đã tạo ra một transition moveAndScale, về cơ bản là sự kết hợp giữa move và scale transitions. SwiftUI áp dụng transitions tại đối xứng theo giá trị timing or spring mà bạn truyền vào phương thức animation.

SwiftUI cũng cung cấp cách xây dựng các transition không đối xứng. Giả sử bạn cần một move transition khi insert và một fade transition remove. Đối với  trường hợp đó, chúng ta có một phương thức asymmetric trên struct AnyTransition, chúng ta có thể sử dụng để xây dựng các transitions không đối xứng.

```
extension AnyTransition {
    static func moveOrFade(edge: Edge) -> AnyTransition {
        AnyTransition.asymmetric(
            insertion: .move(edge: edge),
            removal: .opacity
        )
    }
}

struct ContentView : View {
    @State private var isButtonVisible = true

    var body: some View {
        VStack {
            Toggle(isOn: $isButtonVisible.animation()) {
                Text("Show/Hide button")
            }

            if isButtonVisible {
                Button(action: {}) {
                    Text("Hidden Button")
                }.transition(.moveOrFade(edge: .trailing))
            }
        }
    }
}
```

Như bạn có thể thấy, chúng ta sử dụng phương thức asymmetric để truyền vào hai transitions, lần đầu tiên để thêm và một lần khác để xóa.

Tham khảo: https://mecid.github.io/2019/06/26/animations-in-swiftui/?utm_campaign=Swift%20Weekly&utm_medium=email&utm_source=Revue%20newsletter