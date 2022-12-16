![](https://images.viblo.asia/c3698633-455c-49ae-b6c4-af3e2914fad6.jpeg)
Delegate property về cơ bản là một proprety thông thường. Cái mà có thể ủy nhiệm việc đọc, ghi tới một hàm khác. Bạn có thể nghĩ về nó như getter hoặc setter.
Về góc độ phát triển ứng dụng Android thì đây có thể là một tính năng mạnh mẽ giúp phát triển ứng dụng. Nhưng trong bài này mình sẽ trình bày một cách thật đơn giản và độc lập không liên quan đến Android.
# Lazy
Khi bạn sử dụng keyword này để khởi tạo property thì quá trình khởi tạo sẽ không được thực hiện ngay lập tức. Nó thì được gán giá trị khi được gọi lần đầu tiên. Và kết quả sẽ được lưu lại cho những lần gọi tiếp theo tới property này.
```
val lazyData: Double by lazy {
    println("Initializing lazyData")
    2.0
}

fun main(args: Array<String>) {
    println(lazyData)
    println(lazyData)
}
```
Khi chạy đoạn code trên thì console sẽ hiển thị như sau:
```
Initializing lazyData
2.0
2.0
```
# Observable
Keyword này thường được sử dụng khi bạn mong muốn thực hiện một đoạn logic nào đó mỗi khi giá trị của property thay đổi. Nó sẽ nhận giá trị khởi  tạo của property và thực hiện callback sau khi property được gán giá trị mới. 

Ví dụ bên dưới đây có một property kiểu String. Bất cứ khi nào một giá trị mới được gán tới nó thì giá trị cũ và giá trị mới của property sẽ in ra màn hình.
```
var observableData: String by Delegates.observable("Initial value") {
    property, oldValue, newValue ->
    println("${property.name}: $oldValue -> $newValue")
}

fun main(args: Array<String>) {
    observableData = "New value"
    observableData = "Another value"
}
```
Khi chạy đoạn code trên thì console sẽ hiển thị như sau:
```
observableData: Initial value -> New value
observableData: New value -> Another value
```
# Vetoable
Khi sử dụng keyword này thì sẽ khá giống với Observable bên trên.  Chỉ có điều là khi kết thúc callback chúng ta sẽ có đoạn check điều kiện. Nếu điều kiện thỏa mãn thì giá trị mới sẽ được gán tới property.
Nếu callback trả về true thì giá trị của property mới được gán tới giá trị mới. Nếu callback trả về false thì giá trị mới sẽ được loại bỏ. Propery vẫn giữ giá trị cũ của nó.
```
var vetoableData: Int by Delegates.vetoable(0) {
    property, oldValue, newValue ->
    println("${property.name}: $oldValue -> $newValue")
    newValue >= 0
}

fun main(args: Array<String>) {
    vetoableData = -1
    println("vetoableData = $vetoableData")
    vetoableData = 1
    println("vetoableData = $vetoableData")
}
```
Khi chạy đoạn code trên thì console sẽ hiển thị như sau:
```
vetoableData: 0 -> -1
vetoableData = 0
vetoableData: 0 -> 1
vetoableData = 1
```
Vừa rồi mình đã trình bày về cách sử dụng các keyword Delegate trong Kotlin. Hi vọng sẽ hữu ích cho các bạn phát triển ứng dụng.
Bài viết có tham khảo tại: https://proandroiddev.com/the-magic-in-kotlin-delegates-377d27a7b531

Happy coding!!! :heart_eyes: