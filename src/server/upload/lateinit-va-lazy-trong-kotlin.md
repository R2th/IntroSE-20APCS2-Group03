![](https://images.viblo.asia/1659f2d8-906b-45ad-9f58-4200e6ccdd21.jpeg)
# **Mở bài**
- Khi mới bắt đầu học Kotlin thì bạn sẽ gặp đôi chút khó khăn trong việc lựa chọn giữa `lateinit` và `lazy`. Hy vọng bài này sẽ giúp đỡ các bạn trong việc đó.
- Các câu hỏi thường đặt ra khi phải chọn giữa `lateinit` và `lazy` là:
* Phải sử dụng trong trường hợp nào mới là hợp lý?
* Cái nào nhanh hơn?
* Cái nào an toàn hơn?
# **Lazy**
- Tạo biến theo kiểu lazy 
```
val someText: String by lazy { "Framgia" } // initialize 
fun doPrintSomeText() {
    println("Length is  " + someText.length) // 
}
```
- Thuộc tính "someText" sẽ không được khởi tạo trừ khi biến được sử dụng lần đầu tiên.
# **lateinit**
- Tạo biến theo kiểu lateinit 
```
lateinit var someText: String 
fun doPrintSomeText() {
    someText = "Framgia" // initialize 
    println("Length is  " + someText.length)
}
```
- Thuộc tính "someText" có thể được khởi tạo sau này trong hàm tạo hoặc trong bất kỳ phương thức nào trước khi truy cập nó.
- Nếu các bạn dùng biến trước khi nó được khởi tạo như trường hợp dưới đây thì sẽ ném ra lỗi
```
lateinit var someText: String 
fun doPrintSomeText() {
    println("Length is  " + someText.length)
}
```
- Như ví dụ ở trên, khi "someText" chưa được khởi tạo mà ta đã dùng thì sẽ xuất hiện lỗi 
```
“Caused by: kotlin.UninitializedPropertyAccessException : lateinit property someText has not been initialized”
```
# **Tổng kết**
* lateinit chỉ có thể được sử dụng với các thuộc tính var (mutable) trong khi lazy chỉ có thể được sử dụng cho các thuộc tính val (immutable).
* lateinit không hoạt động với kiểu nguyên thủy
* Trong khi sử dụng Singleton Pattern, chúng ta nên sử dụng lazy, vì nó sẽ được khởi tạo khi sử dụng lần đầu tiên.
* Với lateinit, các biến không có giá trị null
* Với lateinit chúng ta phải chú ý đến luồng code, sử dụng biến lateinit khi chưa được khởi tạo sẽ làm app bị crash, nhưng lazy thì an toàn hơn, sẽ ko quan tâm chuyện đó.
* Cảm ơn các bạn đã đọc bài của mình, nguồn : [đây](https://kotlinlang.org/docs/reference/delegated-properties.html) và [đây](https://medium.com/@waqarul/kotlin-lateinit-vs-lazy-properties-bc8ce42ea0a0)