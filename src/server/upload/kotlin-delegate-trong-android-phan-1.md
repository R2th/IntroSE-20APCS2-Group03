Tận dụng sức mạnh của Delegate trong sự phát triển của Android

![](https://images.viblo.asia/cace5527-5265-44c9-8eac-64f9a772728b.png)

Kotlin là một ngôn ngữ hiện đại với hiều tính năng tuyệt vời tạo cho việc phát triển ứng dụng trở lên hấp dẫn và nhiều trải nghiệm hứng thú hơn.  Một trong những tính năng đó là Delegated Properties. Trong bài này, Chúng ta sẽ nhìn thấy làm sao và thế nào Delegate có thể tạo cho cuộc sống của chúng ta dễ dàng hơn trong sự phát triển của Android.

Những phần mình đi qua là :

1 - **Cơ bản**

2 - **Ví dụ**

  - Fragment arguments

 - SharedPreferences delegates

  - View delegates

3 - **Tổng kết.**


**1 - Cơ bản.**

Điều đầu tiên, Delegate là gì và Nó hoạt động như thế nào nhỉ? . Tốt trong nó có về có một loại phép thuật nào tiềm ẩn nhỉ  Nhưng thực sự nó thì  không phức tạp lắm đâu.

Delegate thực chất là một class cấp giá trị cho thuộc tính và xử lý sự thay đổi của nó. Điều này cho phép chúng ta di chuyển, ủy thác , getter – setter logic từ thuộc tính của nó sang 1 class riêng biệt và tái sử dụng lại logic này.

Chúng ta muốn 1 tham số kiểu String luôn được cắt xén (trim()) tức là với khoảng trắng đầu và cuối được loại bỏ. Chúng ta có thể làm điều này với thuộc tính setter như sau:

```
class Example {

    var param: String = ""
        set(value) {
            field = value.trim()
        }
}
```

Nếu ban có thắc mặc gì về cú pháp trên. Bạn có thể xem lại tại đường dẫn sau https://kotlinlang.org/docs/reference/properties.html

Bây giờ, Nếu chúng ta muốn tái sử dụng tính năng này trong một số class khác thế nào nhi ? Đây là nơi delegates xử lý :

```
class TrimDelegate : ReadWriteProperty<Any?, String> {

    private var trimmedValue: String = ""

    override fun getValue(
        thisRef: Any?,
        property: KProperty<*>
    ): String {
        return trimmedValue
    }

    override fun setValue(
        thisRef: Any?,
        property: KProperty<*>, value: String
    ) {
        trimmedValue = value.trim()
    }
}
```

Vì thế 1 delegates là class với 2 phương thức: getting và setting cho thuộc tính. Để cung cấp thêm cho nó một số thông tin để tạo 1 Delegate mới

```
class Example {
    var param: String by TrimDelegate()
}
```

Nó thì tương đương với :

```
class Example {

    private val delegate = TrimDelegate()
    var param: String
        get() = delegate.getValue(this, ::param)
        set(value) {
            delegate.setValue(this, ::param, value)
        }
}
```

`::param` là toán tử trả về một instance của KProperty class cho thuôc tính.

Như những gì các bạn thấy phía trên, không có gì là huyền bí về Delegates cả. Dù đơn giản , nhưng có thể rất hữu ích cho các bạn trong khi phát triển Android. Phần này mình giải thích cho các bạn về việc Delegate chạy như thế nào ở bên trong. Phần sau mình sẽ làm những ví dụ về  Fragment arguments - SharedPreferences delegates - View delegates . Hẹn gặp các bạn ở phần sau nhé :) :) 

Tham khảo : https://proandroiddev.com/kotlin-delegates-in-android-1ab0a715762d