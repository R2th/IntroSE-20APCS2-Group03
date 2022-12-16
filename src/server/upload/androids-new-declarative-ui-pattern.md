Google gần đây đã nhận được rất nhiều ca thán về UI Kit của Android (TextView, Nút .. v.v.), Có lẽ bạn đã tạo một trong số đó.
UI Kit này đã được xây dựng từ tháng 9 năm 2008, chúng ta đang nói về 11 năm ở đây để tưởng tượng code này đã trở nên lỗi thời và phức tạp như thế nào.
Một code như vậy sẽ có rất nhiều điều bất cập, ví dụ, bạn đã bao giờ nghĩ về việc View.java có thể có bao nhiêu dòng code chưa? nó sẽ là nhiều hơn bạn nghĩ.
Cái đó chỉ là một điều đơn giản và tất nhiên là có nhiều điều hơn thế để họ phải đưa ra giải pháp và may mắn thay, họ đã làm được! 

Google’s I/O’19 đã có một bài thuyết trình tuyệt vời về the **declarative paradigm** cho lập trình UI được sử dụng bởi Jetpack Compose, một API đang phát triển cho lập trình UI Android. 

Bản thân the **declarative paradigm** không phải là một khái niệm mới. Nó đã được sử dụng trong nhiều năm và bởi các khung như Vue.js, React .. vv, thậm chí google đã áp dụng mô hình này trong Flutter.

Theo ý kiến của tôi, một trong những tính năng tốt nhất của thành phần này là Unbundled! 

bộ công cụ UI trước đây được gói cùng với thư viện hỗ trợ để có một vài sửa lỗi nhỏ, chúng ta phải đợi cho đến khi phát hành API tiếp theo.
Jetpack Compose sẽ có tạo tác riêng, do đó, bạn sẽ không phải chờ nhiều năm để có bản sửa lỗi đơn giản.

## Nó làm việc như thế nào?
Làm thế nào chúng ta có thể làm một Hello world app như dưới đây?
![](https://miro.medium.com/max/1080/1*Jr-wGUkAZvilIdowKOQrEQ.png)
để thực hiện một cái gì đó như thế , Activity của bạn nên như thế này
```
class MainActivity : Activity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent{
            Greeting("Abadyy!")
        }

    }

    @Composable
    fun Greeting(name : String){
        Text("Hello $name")
    }
}
```
Với nó, không có XML và những thứ liên quan, Text là lớp sẽ cung cấp tất cả các chức năng bạn cần từ TextView, bạn có thể thêm phần padding, margin...
## Vậy, Compose là gì?
Nó có một tiện ích Jetpack tương thích hoàn toàn mới được xây dựng hoàn toàn trên Kotlin, Chúng không có Views, Nó có một cái gì đó nhỏ hơn và nhiều mô-đun hơn và dễ làm việc hơn. 

Nó hiện đang trong giai đoạn pre-alpha. Các API surfaces của nó chưa được hoàn thiện và nó không nên được sử dụng cho bản production.

Với Compose, bạn sẽ loại bỏ vấn đề View có trạng thái riêng, giờ đây bạn có một nguồn tin tưởng và Chủ sở hữu là người duy nhất thay đổi nó.

Điều này đi kèm với rất nhiều khả năng như sẽ có một composer cho recycler view adapters, Hãy xem một ví dụ về điều này:
```

class MainActivity : Activity() {

    /**
     * T is your UIModel to be bound to each item
     *
     * the body is the Composable of each item with passing each item to be inflated with corresponding data
     * there's a lot of internal code handling the rest for process for us
     *
     */
    fun <T> ScrollingList(
        val data: List<T>,
        body: @Composable() (T) -> Unit
    ) {
        // ??
        body(item)
        // ??
    }

    // Example showing how to return List of greetings
    
    @Composable
    fun GreetingList(names: List<String>) {
        ScrollingList(names) { name ->
            greeting(name)
        }
    }

    // do you remember Greeting from the previous example?
    
    @Composable
    fun greeting(name: String) {
        Text("Hello $name")
    }
    
    // Then we can use it like the previous example 
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            GreetingList(listOf("Abady!" , "Android" , "Google"))
        }

    }
}
```
Không còn code cho Recyclerview Adapters, chỉ cần một dòng code và Recyclerview của bạn đã sẵn sàng!

Có nhiều thứ hơn thế nữa có sẵn [ở đây ](https://developer.android.com/jetpack/compose)

Hãy xem thử, dùng và thậm chí bạn có thể đóng góp cho nó. 

Hãy nhớ rằng nó vẫn đang được phát triển và tránh sử dụng nó trong production.

nguồn : https://medium.com/mindorks/androids-new-declarative-ui-pattern-8526632af5c4