# **Generics  là gì**

Generics là một tính năng mà cho phép chúng ta có thể định nghĩa và truy cập các classes, menthods, properties bằng cách sử dụng các kiểu dữ liệu khác nhau mà vẫn sẽ hoạt động giống nhau.

**Ví dụ 1** :

Ví dụ về Generics mà chúng ta thường hay bắt gặp nhất đó là các collection mà ở đây mình đang sử dụng là Arraylist, ta có thể sử dụng nhiều kiểu dữ liệu khác nhau mà cách hoạt động của lớp Arraylist vẫn sẽ không bị thay đổi

![](https://images.viblo.asia/fac9bb11-044e-432c-8d63-53572eceacfd.png)

**Ví dụ 2** :

Khởi tạo 1 class Student kiểu Generics có menthod showData
```
class Student<T>(val data : T) {
    fun showData() {
        println(data)
    }
 }
```

Sử dụng :

```
Student("tri").showData()
Student(18).showData()
```

Kết quả khi chạy :

![](https://images.viblo.asia/c18992f6-d35f-4894-bafe-5290824426ff.png)

Như ta thấy khi khởi tạo 1 Instance của class Student ta truyền vào hàm khởi tạo 2 kiểu dữ liệu khác nhau đó là String và Int nhưng khi chạy menthod showData thì đều vẫn sẽ thực hiện 1 hành động giống nhau


# **Một số quy ước trong Generics**

Có rất nhiều cách để đặt tên cho kiểu tham số trong Generic nhưng chúng ta nên tuân theo nhưng kiểu đặt tên tiêu chuẩn để sau này nếu có làm việc nhóm thì team sẽ dễ đọc code hơn.
- T - Type (Kiểu dữ liệu bất kỳ thuộc Wrapper class: String, Integer, Long, Float, …)
- E – Element (phần tử – được sử dụng phổ biến trong Collection Framework)
- K – Key (khóa)
- V – Value (giá trị)
- N – Number (kiểu số: Integer, Double, Float, …)

# **Từ khóa out và in trong Generics**

Khi chúng ta muốn gán generic type cho bất kỳ super type của nó, thì chúng ta cần sử dụng từ khóa out và khi chúng ta muốn gán generic type cho bất kỳ sub-type của nó, thì chúng ta cần sử dụng từ khóa in.

**Sử dụng từ khóa out** :

Khởi tạo 2 class là Father và Son với class Son được kế thừa từ class Father
```
open class Father()

class Son() : Father()
```

Khởi tạo class Person sử dụng tính năng Generics có sử dụng từ khóa out
```
class Person<out T>(val value: T) {
    fun get(): T {
        return value
    }
}
```

Khởi tạo 2 đối tượng fatherObject và sonObject từ class Person, ta thấy fatherObject là 1 super type của sonObject và vì đã sử dụng từ khóa out ở class Person nên việc gán giá trị của sonObject cho fatherObject là có thể được
```
val sonObject = Person(Son())
val fatherObject: Person<Father>
fatherObject = sonObject
```

**Sử dụng từ khóa in** :

Khởi tạo 2 class là Father và Son với class Son được kế thừa từ class Father
```
open class Father()

class Son() : Father()
```

Khởi tạo class Person sử dụng tính năng Generics có sử dụng từ khóa in
```
class Person<in T>() {
    fun say(value : T){
        println("${value.hashCode()}")
    }
}
```

Khởi tạo 2 đối tượng fatherObject và sonObject từ class Person, ta thấy sonObject là 1 sub-type của fatherObject và vì đã sử dụng từ khóa in ở class Person nên việc gán giá trị của fatherObject cho sonObject là có thể được
```
val fatherObject : Person<Father> = Person()
val sonObject : Person<Son>
sonObject = fatherObject
```

# **Tổng kết**
Generics là một kiến thức rất quan trọng trong lập trình Android nó được sử dụng rất nhiều trong những Project thực tế mong là qua một số lý thuyết và ví dụ mình vừa nêu trên sẽ giúp các bạn nắm rõ hơn về nó<br>

Cảm ơn và hi vọng bài viết có ích trong công việc của bạn.