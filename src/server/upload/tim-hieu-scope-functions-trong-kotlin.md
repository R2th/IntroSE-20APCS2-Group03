Trong thư viện chuẩn của Kotlin có chứa một số hàm có mục đích duy nhất là thực thi các lệnh trong phạm vi context của một đối tượng . Khi ta gọi một hàm như vậy trên một đối tượng nó sẽ tạo ra cho ta 1 phạm vi tạm thời. Trong phạm vi này thì bạn sử dụng được nó mà không cần gọi tên của nó ra. Mình sẽ tìm hiểu qua 5 loại này : `let`, `run`, `with`, `apply` và `also`.

Cơ bản thì các hàm này nó giống nhau đều thực thi trong 1 block. Điều khác biệt lớn của nó ở đây là **đối tượng tham chiếu** và **giá trị trả về**.

Đây là ví dụ đơn giản về scope function : 
```
Person("Alice", 20, "Amsterdam").let {
    println(it)
    it.moveTo("London")
    it.incrementAge()
    println(it)
}
```

Nếu không dùng scope ở đây thì khi bạn muốn sử dụng nó bạn sẽ phải gọi lại tên của nó. Như ví dụ dưới :

```
val alice = Person("Alice", 20, "Amsterdam")
println(alice)
alice.moveTo("London")
alice.incrementAge()
println(alice)
```

Các scope function này nó không giới thiệu về kỹ thuật mới, nó chỉ giúp cho code của bạn gọn gàng, đẹp đẽ và dễ đọc hơn.

Như mình đã nói ở trên, do tính chất của nó khá giống nhau nên việc chọn hàm phù hợp cho từng trường hợp hơi phức tạp 1 tí. Nhưng nhìn vào tên của nó bạn cũng liên tưởng được nó dùng khi nào là hợp lý thôi :D. Dưới đây là bảng mô tả chi tiết về sự khác biệt giữa các hàm đó : 

![](https://images.viblo.asia/d0102312-f512-470b-a846-a723848ad750.png)

Theo như hình trên thì bạn sẽ thấy 

`let` và `also` có **Object reference** ( đối tượng tham chiếu) là "`it`" 
còn `run` , `with` và `apply` đối tượng tham chiều là "`this`"

**Return value** giá trị trả về của `let`, `run` và `with` đều là 1 kiểu lambda. Còn lambda là gì bạn google nhé bài này mình chỉ giới thiệu scope function thôi :V
còn về `apply` và `also` thì trả về chính bản thân nó.

Về phần extension thì có `let`, `run`, `apply`, `also` là có thể sử dụng dạng extension còn `with` thì không.
Riêng về `run` thì nó có của 2 dạng như ảnh trên.