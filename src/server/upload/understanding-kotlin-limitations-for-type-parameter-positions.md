## Introduction
Kotlin variance modifiers áp đặt các giới hạn trên các loại tham số(Type Parameters) được sử dụng. Covariant type parameter(với **out** modifier) không thể được sử dụng ở những vị trí public, và contravariant type parameter(với **in** modifier) không thể được sử dụng ngoài những vị trí public. Nhưng tại sao lại giới thiệu những hạn chế như vậy?

Hãy tìm hiểu về nó.

<div align="center"><br /><img src="https://images.viblo.asia/5f353189-4a39-448e-b643-348293b42add.jpg" /></div><br />

## Variance modifiers
Chúng tôi đã xuất bản một bài báo nhằm giải thích sâu về variance modifiers. Nó có thể được tìm thấy tại [đây](https://blog.kotlin-academy.com/kotlin-generics-variance-modifiers-36b82c7caa39). Nó có thể được tổng kết ngắn gọn:

Khi một generic type là biến thể bất định, giống như **class Box&lt;T&gt;**, không có bất cứ mối quan hệ nào giữa **Box&lt;SomeType&gt;** và **Box&lt;AnotherType&gt;**. Do đó không có mối quan hệ giữa **Box&lt;Number&gt;** và **Box&lt;Int&gt;**

Khi một generic type là covariant, giống như **class Box&lt;out T&gt;**, khi **A** là một subtype của **B** thì **Box&lt;A&gt;** là một subtype của **Box&lt;B&gt;**. Do đó **Box&lt;Int&gt;** là một subtype của **Box&lt;Number&gt;**.

Khi một generic type là contravariant, giống như **Box&lt;int T&gt;**, khi **A** là một subtype của **B** thì **Box&lt;A&gt;** là một subtype của **Box&lt;A&gt;**. Do đó **Box&lt;Number&gt;** là một subtype của **Box&lt;Int&gt;**

Tổng kết ngắn:

<div align="center"><br /><img src="https://images.viblo.asia/adf90a06-9317-44d8-930b-19c224da4cc6.png" /></div><br />

## Review limitations
Ngay cả khi Kotlin giới thiệu một số giới hạn cho type parameters bằng việc sử dụng variance modifiers. Lớp bên dưới là chính xác hoàn toàn.

```
lass SomeClass<T> {
    var t: T? = null

    fun functionReturningT(): T? = t

    fun functionAcceptingT(t: T) {}

    private fun privateFunctionReturningT(): T? = t

    private fun privateFunctionAcceptingT(t: T) {}
}
```

Ngay cả khi nó sẽ không được biên dịch nếu chúng ta giới thiệu bất cứ variance modifier:

```
class SomeClass<out T> {
    var t: T? = null // Error
    
    private var pt: T? = null

    fun functionReturningT(): T? = t

    fun functionAcceptingT(t: T) {} // Error

    private fun privateFunctionReturningT(): T? = t

    private fun privateFunctionAcceptingT(t: T) {}
}

class SomeClass<in T> {
    var t: T? = null // Error

    private var pt: T? = null

    fun functionReturningT(): T? = t // Error

    fun functionAcceptingT(t: T) {} 

    private fun privateFunctionReturningT(): T? = t

    private fun privateFunctionAcceptingT(t: T) {}
}
```

Như bạn có thể thấy, covariant không được sử dụng cho các phương thức public như là một loại parameter, và nó không thể được sử dụng cho các thuộc tính public dạng read/write. Chỉ có read là ổn bởi vì chúng chỉ lộ ra vị trí:

```
class SomeClass<out T> {
    val t: T? = null

    private var pt: T? = null

    fun functionReturningT(): T? = t

    private fun privateFunctionReturningT(): T? = t

    private fun privateFunctionAcceptingT(t: T) {}
}
```

Contravariance không thể được sử dụng như là một kiểu trả về từ các phương thức và áp dụng trên tất cả các phương thức(Tính rõ ràng của getter là tương đương với tính rõ ràng của thuộc tính).

## Example problem
Để hiểu được vấn đề đằng sau các giới hạn này, hãy nghĩ đến Java arrays. Chúng là covariant và trong cùng thời gian, chúng cho phép thiết lập giá trị(theo vị trí). Như một kết quả, bạn có thể gọi dựa vào mã nguồn cái là hoàn toàn chính xác từ điểm biên dịch của view, nhưng sẽ luôn dẫn tới lỗi trong quá trình thực thi(runtime error):

```
// Java
Integer[] ints = { 1,2,3 };
Object[] objects = ints;
objects[2] = "AAA";
```

<div align="center"><br /><img src="https://images.viblo.asia/f7478477-a7c5-461d-942f-02b315ed6a46.png" /></div><br />

Điều gì đã xảy ra ở đây? Chúng ta ép kiểu ngược(up-casting - Ép kiểu thành đối tượng cha) mảng và rồi thiết lập loại ép kiểu xuôi(down-casting - Ép kiểu thành đối tượng con) và thế là boom! Chúng ta có một error. Nó liên quan tới vị trí như thế nào?

## Positions and typing
In-position và out-position(Vị trí đầu vào và vị trí đầu ra) có một vài quy định ép kiểu chuẩn. Xem kiến trúc loại ở bên dưới.

<div align="center"><br /><img src="https://images.viblo.asia/038cb9cc-6a03-488b-a9a6-8736af459735.png" /></div><br />

Khi chúng ta cần lấy **Dog** cho vị trí đầu vào(in-position) - parameter cho phương thức **takeDog(dog: Dog)**, mọi subtype cũng được chấp thuận.

```
fun takeDog(dog: Dog) {}takeDog(Dog())
takeDog(Puppy())
takeDog(Hund())
```

Khi chúng ta lấy **Dog** từ vị trí đầu ra, các giá trị được chấp nhận là **Dog** đồng thời cho tất cả các subtypes.

<div align="center"><br /><img src="https://images.viblo.asia/45bd7cdf-d3fb-4c9d-8e85-900e959ab0e5.png" /></div><br />

```
fun makeDog(): Dog = Dog()val any: Any = makeDog()
val animal: Animal = makeDog()
val wild: Wild = makeDog()
```

Chú ý rằng một khi yếu tố là in hay out position, các loại khác nhau của quá trình ép kiểu là mặc định, và nó không thể bị dừng.

Điều này xảy ra trong ví dụ về array của chúng ta. Covariance cho phép ép kiểu ngược(up-casting), và in-position cho phép ép kiểu xuôi(down-casting). Quá trình sử dụng hai kĩ thuật này đồng thời chúng ta có thể ép kiểu thành mọi thứ. Tương tự với Contravariance và out-position. Đồng thời cho phép người phát triển ép kiếu bất cứ loại nào thành bất cứ loại nào khác. Vấn đề chỉ là đó nếu một loại thực tế không thể bị ép theo cách thức này thì chúng ta có một runtime error.

Cách thức duy nhất để tránh điều này là cấm việc kết nối giữa các public in-position với contravariacne và public out-position với variance. Đây là lý do tại sao Kotlin có những giới hạn này. Kotlin cũng đã giải quyết vấn đề về array bằng cách tạo ra tất cả các arrays invariant. Nó là một ví dụ khác cái chứng tỏ Kotlin là một ngôn ngữ an toàn hơn Java(Xem thêm [bài thuyết trình này](https://blog.kotlin-academy.com/kotlin-next-level-of-android-development-95bce2f43a24)).

## Source
https://blog.kotlin-academy.com/understanding-kotlin-limitations-for-type-parameter-positions-15527b916034

## Reference
https://blog.kotlin-academy.com/kotlin-generics-variance-modifiers-36b82c7caa39
https://blog.kotlin-academy.com/kotlin-next-level-of-android-development-95bce2f43a24
https://blog.kotlin-academy.com/programmer-dictionary-parameter-vs-argument-type-parameter-vs-type-argument-b965d2cc6929

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))