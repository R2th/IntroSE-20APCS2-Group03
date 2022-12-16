## Liskov Subtitution Principle (LSP) là gì ?

**Liskov Subtitution Principle** được hiểu là **nguyên tắc Thay Thế Liskov**. Nguyên tắc này được Barbara Liskov đưa ra vào năm 1987 và mở rộng Open-Closed Principle bằng cách tập trung vào hành vi của một lớp cha và các lớp con của nó. Nguyên tắc này tập trung vào việc yêu cầu các lớp con cần phải **thay thế được cho lớp cha** về mặt **hành vi**. Một số blog lập trình tiếng Việt phát biểu nguyên tắc này như sau:
> ### Trong một chương trình, các object của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình
> (Let Φ(x) be a property provable about objects x of type T. Then Φ(y) should be true for objects y of type S where S is a subtype of T.)

![](https://images.viblo.asia/12b469cb-0c68-4661-837a-d7b9d81e77df.jpeg)


> Uống nước thì phải nhớ nguồn:
> Barbara Liskov tên thật là **Barbara Jane Huberman** (sinh ngày 7/11/1939) là một nhà khoa học máy tính người Mỹ, hiện đang là giáo sư tại Viện Công nghệ Massachusetts. Bà là một trong những phụ nữ đầu tiên được cấp bằng tiến sĩ về khoa học máy tính ở Mỹ. Việc có công lao phát triển nguyên tắc Thay Thế Liskov này đã giúp bà giành được giải thưởng Turing vô cùng danh giá.

## Giải thích nguyên tắc này

Một ví dụ kinh điển được đưa ra cho nguyên tắc này đó là về loài chim cánh cụt. Ta luôn biết chim cánh cụt là một loại chim. Hầu hết mọi người sẽ mô tả chim là những sinh vật:
- đi đứng bằng hai chân
- có mỏ
- đẻ trứng
- có cánh
- có lông vũ
- biết bay

Ai cũng nghĩ là chim thì biết bay lượn, nhưng với loài chim cánh cụt, do đặc điểm tiến hoá nên đôi cánh của chúng không có khả năng bay. Vì vậy hành động bay của chúng là không có. Như vậy việc kết luận chim là loài biết bay là sai. Và nếu như vậy, chim cánh cụt không được coi là một loài chim nữa.

![](https://images.viblo.asia/7a3accde-fe07-4c29-8165-add6b2264cdd.jpg)

Trong lập trình hướng đối tượng việc đảm bảo các lớp con kế thừa lại các đặc điểm của lớp cha là việc bắt buộc. Con có thể làm được những gì cha làm hoặc làm thêm nhiều việc hơn. Không được phép làm khác hoặc không làm gì cả.

## Áp dụng nguyên tắc này cho các class

Giả sử ta có class `Bird` với các đặc tính cơ bản của họ hàng nhà chim, ta nghĩ nó có thể bay và khi bay chắc chắn sẽ vỗ cánh nên có thể tự tin viết như sau:
```kotlin
abstract class Bird {
    open fun fly() {
       voCanh()
    }
    // other methods
}
```
Vậy thì class `Penguin` dành cho loài chim cánh cụt sẽ làm thế nào ?
* Không override và chạy như cha ?
```kotlin
open class Penguin : Bird() {
    // other methods
}
```
Trong trường hợp này, Penguin vỗ cánh nhưng không bay được. => Vi phạm nguyên tắc.

* Override phương thức fly cho thành không làm gì cả ?
```kotlin
open class Penguin : Bird() {
    override fun fly() {
    }
    // other methods
}
```
Trong trường hợp này, Penguin không vỗ cánh. => Vi phạm nguyên tắc. Mặc dù chương trình sẽ hoạt động đúng nhưng khai báo một hàm không cần thiết gây tốn tài nguyên.

Sai lầm không nằm ở việc ta định nghĩa phương thức fly() của Penguin ra sao mà nằm ở chỗ phương thức fly() của Bird là không nên có. Không phải loài chim nào cũng biết bay và việc tồn tại một phương thức như vậy ở một class cha là một sự vi phạm nguyên tắc LSP. Cách giải quyết chỉ có thể là loại bỏ phương thức fly() trong Penguin mà thôi.

Khi lập trình, nếu không chắc chắn các class con đều sẽ dùng chung một hành vi nào đó thì tốt nhất không nên viết thêm vào base class. Bạn có thể nghĩ rằng sẽ tiết kiệm được rất nhiều dòng code nhưng thực chất việc này làm cho code trở nên lộn xộn khi phải xử lý exception trong các class con. Việc chạy chương trình đôi khi còn xảy ra những lỗi khó có thể lường trước.

## Tránh vi phạm nguyên tắc này bằng cách nào ?

Khi xem xét một mô hình thiết kế, bạn không thể biết được requirement trong tương lai có thể thay đổi ra sao. Vì vậy nên cố gắng hạn chế nhất có thể việc tăng mức chi tiết cho các abstract, base class. Bạn có thể muốn tạo ra một mô hình hoàn hảo với một base class chi tiết nhất để giúp cho code trong các class cụ thể là ngắn nhất. Nhưng đó là một cái bẫy của "Sự phức tạp không cần thiết - Needless Complexity". Việc giữ cho phần base được đủ sự trừu tượng là rất quan trọng vì mỗi dòng code bạn thêm vào tức là bạn đang tự bó hẹp khả năng của các class con. Có trời mới biết trong tương lai khách hàng, hoặc chính bản thân bạn muốn sửa đổi chương trình như thế nào. Mỗi lần như vậy, bạn sẽ phải sửa base class hay sẽ chấp nhận vi phạm LSP để ít phải sửa hơn ?

Với ví dụ đã nói ở trên, ta có thể tạo ra một class FlyableBird cho những loài chim biết bay chẳng hạn. Như vậy sẽ không có sự vi phạm nguyên tắc LSP nào đối với class Penguin nữa. Dưới đây là một ví dụ:

```kotlin

abstract class Bird() {
    // other methods
}

interface Flyable {
    fun fly()
}

abstract class FlyableBird : Bird(), Flyable {
    override fun fly() {
        voCanh()
    }
    // other methods
}
```

KISS - "Keep It Simple, Stupid" là một nguyên tắc được nhắc đi nhắc lại trong lĩnh vực programming. Hãy cố gắng áp dụng và tuân thủ LSP một cách chặt chẽ để không bao giờ phải đau đầu với những lần sửa base class và gây ra một vùng ảnh hưởng to như một vụ nổ bom hạt nhân nhé.

![](https://images.viblo.asia/d61b94d8-1e89-4616-9e37-81b5556ab660.gif)

## Tổng kết
Các cụ ta đã có câu:
* Đời cha ăn mặn đời con khát nước

để nói rằng thế hệ cha nên làm gương cho con cái noi theo kẻo không thì đến đời con sẽ rất khổ. Ta không nên nhồi nhét những thứ vào class cha mà chưa chắc tất cả những lớp kết thừa lại nó sẽ cũng có cùng hành vi như vậy. Hãy hiểu rõ ý nghĩa của chữ L trong SOLID và áp dụng nó khi xây dựng phần mềm.