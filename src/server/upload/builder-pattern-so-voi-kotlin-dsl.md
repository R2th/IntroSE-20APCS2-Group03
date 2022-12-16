Trong bài viết này, chúng ta sẽ tạo một đối tượng Student bằng cách sử dụng Builder pattern và sau đó chúng ta sẽ sử dụng các tính năng của Kotlin như chức năng mở rộng, lambdas, vv. Để chuyển đổi Builder pattern thành DSL và cuối cùng chúng ta sẽ xem cái nào tốt hơn cho việc tạo đối tượng và tại sao ?

### Builder Pattern
Builder Pattern là mẫu Thiết kế sáng tạo được sử dụng để tạo các đối tượng, khi đối tượng chứa nhiều thuộc tính.

###  DSL (Domain Specific Language)
DSL là ngôn ngữ máy tính chuyên dùng cho một miền ứng dụng cụ thể. Ví dụ. SQL cho các truy vấn cơ sở dữ liệu, CSS cho style, Html để đánh dấu, Xml để lưu trữ và truyền dữ liệu, v.v.

###  Builder pattern in kotlin

```
class Student(
    val name: String?,
    val standard: Int,
    val rollNumber: Int
) {

    private constructor(builder: Builder) : this(builder.name, builder.standard, builder.rollNumber)

    class Builder {
        var name: String? = null
            private set
        var standard: Int = 0
            private set
        var rollNumber: Int = 0
            private set

        fun name(name: String) = apply { this.name = name }

        fun standard(standard: Int) = apply { this.standard = standard }

        fun rollNumber(rollno: Int) = apply { this.rollNumber = rollNumber }

        fun build() = Student(this)
    }
}


//To create Student object now we can use
Student.Builder()
    .name("Alex")
    .standard(10)
    .rollNumber(720)
    .build()
```

Trong class Builder, chúng ta sẽ tạo setter cho các trường private để bất kỳ thuộc tính nào chỉ có thể được khởi tạo thông qua các phương thức có tên của chúng  ví dụ như **name(“Jon”)**  và không sử dụng khởi tạo trường, ví dụ như **name = “Alex”**.

**apply** là một hàm mở rộng mà có **this** làm tham chiếu đến đối tượng mà nó đã gọi và trả về tham chiếu **"this"** của cùng một đối tượng sau khi một số thao tác được thực hiện trên đối tượng đó có thể được nhìn thấy trong đoạn mã bên dưới.

```
inline fun <T> T.apply(block: T.() -> Unit): T
```

DSLifying the Builder

```
class Student(
    val name: String?,
    val standard: Int,
    val rollNumber: Int
) {

    private constructor(builder: Builder) : this(builder.name, builder.standard, builder.rollNumber)

    companion object {
        inline fun student(block: Student.Builder.() -> Unit) = Student.Builder().apply(block).build()
    }

    class Builder {
        var name: String? = null
        var standard: Int = 0
        var rollNumber: Int = 0
        fun build() = Student(this)
    }
}

//To create Student object now we can use
student {
        name = "Alex"
        standard = 10
        rollNumber = 720
 }
```

Chúng ta xóa tất cả các hàm trong lớp Builder ngoại trừ build()

Phương thức student này là nơi phép màu xảy ra, nó lấy function literal với receiver mà cho phép chúng ta viết DSL này.
```
block: Student.Builder.() -> Unit
```

**block** là một hàm lambda không có đầu vào và không có đầu ra nhưng được liên kết với receiver class là Student.Builder

Xem bài viết [**này**](https://blog.mindorks.com/function-literals-with-receiver-in-kotlin) để hiểu rõ hơn về chức năng nghĩa đen với người nhận.

### Default and Named arguments

Một điều cuối cùng, Kotlin có một tính năng là Đối số mặc định và Đối số được đặt tên.
Đối số mặc định cho phép bạn gọi các hàm với ít đối số hơn và do đó bạn có thể sử dụng nó để tạo các đối tượng giống như mẫu Builder chỉ với các thuộc tính bạn cần.

```
fun findCar(
    carId: Int = 0,
    model: String = "",
    make: String = ""
): String
//this can be called using either of
findCar(carId = 1)
findCar(carId = 1, model = "BMW")
....
```

### DSL vs Builder

* Nếu chúng ta kiểm tra việc tạo đối tượng của Builder vs DSL. DSL có vẻ dễ đọc hơn và không có toán tử chấm hoặc lệnh gọi hàm tạo Builder() như trong trường hợp DSL.
* Không cần thêm tất cả các phương thức builder để khởi tạo từng trường trong lớp Builder vì thế nó cũng gọn hơn Builder pattern.
* Chúng ta chỉ đơn giản là gọi hàm student với dấu ngoặc nhọn và các thuộc tính mà chúng ta cần.

Nguồn : https://medium.com/mindorks/builder-pattern-vs-kotlin-dsl-c3ebaca6bc3b