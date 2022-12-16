# Xin chào các bạn , mình là 1 moblie developer , lần đầu viết bài có gì sai sót mong các bạn thông cảm nhé !!! 

Trong quá trình code moblie, mình thấy các bạn mới phải viết đi viết lại 1 function dùng nhiều lần ví dụ đơn giản như ẩn hiện view bên Android, hay 1 cái Alert bên iOS 

Khi các bạn cần các bạn phải viết đi viết lại nhiều lần rất tốn time, nhìn code thì rối.

Nhưng với Extension các bạn chỉ cần viết 1 lần rồi gọi đi gọi lại ở class nào cũng được.

Ví dụ Extension Kotlin Function về ẩn hiện 1 view.

```kotlin 
fun View.gone() {
    visibility = View.GONE
}

fun View.visible() {
    visibility = View.VISIBLE
}

fun View.invisible() {
    visibility = View.INVISIBLE
}
```



Ví dụ Extension Swift về Alert ở iOS
```swift
extension UIAlertController {
    static func showAlert(
        title: String? = nil,
        message: String? = nil,
        cancelTitle: String? = nil,
        actionTitle: String? = nil,
        action: HandlerActionAlert? = nil,
        vc: UIViewController? = nil
    ) {
        let alert = UIAlertController(title: title, message: message, preferredStyle: .alert)

        let actionOk = UIAlertAction(title: actionTitle, style: .default, handler: action)
        alert.addAction(actionOk)

        if cancelTitle != nil {
            let cancel = UIAlertAction(title: cancelTitle, style: .default, handler: nil)
            alert.addAction(cancel)
        }

        let _vc = vc != nil ? vc : UIApplication.topViewController()
        _vc?.present(alert, animated: true, completion: nil)
    }
}
```


# **Quay lại chủ đề chính nhé. Tại sao nói là điểm chấm phá của Kotlin so với Java ????? .**

![image.png](https://images.viblo.asia/0c9773a5-6336-4faf-b7d8-aed9214e820f.png)
# Khả năng mở rộng 

Tại sao lại là khả năng mở rộng .

Chúng ta đều biết rằng một lớp được khai báo là final thì không thể nào extends được đúng không? Ví dụ chúng ta muốn thừa kế lớp Integer để có thêm hàm toBigInteger() chúng ta sẽ làm thế này:


```java 
class IntegerExension extends Integer {
    public BigInteger toBigInteger() {
        return BigInteger.valueOf(this);
    }
}
```

Rất tiếc : Là không thể, vì lớp Integer là một lớp final, với Java thì hiện tại là bó tay, nhưng với Kotlin, mọi việc dễ dàng hơn rất nhiều:

Tada 
Nào vào việc luông thoaii: 

# Cú pháp nhé : 

Để tạo được các hàm mở rộng chúng ta cần tạo ra một file .kt và viết hàm mở rộng vào file đó với cú pháp như sau:

Còn bên iOS thì extension rồi tên lớp extends là xong, cái này nếu được mình nói sau nhé.

```kotlin 
fun <tên class cần mở rộng>.<hàm cần mở rộng>(
    [các tham số]
): [kiểu dữ liệu trả về] =
    <Nội dung hàm>
```

Với cú pháp khó hơn chút sẽ như này:

```kotlin 
fun <tên class cần mở rộng>.<hàm cần mở rộng>(
    [các tham số]
): [kiểu dữ liệu trả về]  {
    <Nội dung hàm>
}
```

# Cách sử dụng :

```kotlin 
<đối tượng>.<tên hàm>([các tham số])
```

# Áp dụng:

Nào bây giờ chúng ta hãy quay trở lại với ví dụ thêm hàm toBigInteger trên nhé :

```kotlin
fun Integer.toBigInteger(): BigInteger =
    BigInteger.valueOf(this.toLong())
```

# Sử dụng :

```kotlin
val intValue = Integer.valueOf(1000)
val bigIntegerValue = value.toBigInteger()
```

# Kết luận :

Bạn còn nhớ nguyên tắc Open/Close (đóng với việc thay đổi, mở với việc mở rộng) chứ? Với sự xuất hiện của Kotlin đã giúp chúng ta giải được một bài toán vô cùng nan giải, đây là một điểm rất mạnh của Kotlin với các hàm extenstion. Nếu bạn đang dùng kotlin hãy tận dụng triệt để sức mạnh này nhé.

Link tham khảo : https://kotlinlang.org/docs/extensions.html
Mình sẽ làm thêm 1 series Rx và Coroutines mức độ đủ dùng nếu được 10 star bài này :(. Cảm ơn các bạn đã đọc <3.  Mình viết bài này nhờ động lực của ông anh cùng công ty. Thanks Bro !!!