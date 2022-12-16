# Khi nào dùng
* Khi muốn tạo một đối tượng với những sự thay đổi nhỏ của lớp mà không phải khai báo tường minh lớp con của lớp đó.
# Object expression
* Tạo một đối tượng của một lớp ẩn danh kế thừa từ một hoặc nhiều kiểu khác. Đối tượng như thế được gọi là đối tượng ẩn danh (tên bên bển là anonymous object), cú pháp:
    ```
    window.addMouseListener(object : MouseAdapter() {
        override fun mouseClicked(e: MouseEvent) { /*...*/ }
        override fun mouseEntered(e: MouseEvent) { /*...*/ }
    })
    ```
    Nếu kiểu cha có một constructor, các tham số phù hợp phải được truyền vào constructor đó. Nếu có nhiều kiểu cha được kế thừa/triển khai, chúng được ngăn cách nhau bằng dấu `,`:
  ```
  open class A(x: Int) {
        public open val y: Int = x
    }

    interface B { /*...*/ }

    val ab: A = object : A(1), B {
        override val y = 15
    }
    ```
    Nếu chỉ cần đối tượng, không cần kiểu cha:
     ```
   fun foo() {
        val adHoc = object {
            var x: Int = 0
            var y: Int = 0
        }
        print(adHoc.x + adHoc.y)
    }
    ```
*  Đối tượng ẩn danh có thể được dùng như một kiểu chỉ khi trong cục bộ và các khai báo `private`. 
* Nếu dùng đối tượng ẩn danh như một kiểu trả về của phương thức `public` hoặc kiểu khai báo của các thuộc tính `public` thì kiểu thực sự của phương thức/ thuộc tính đó sẽ được chỉ định là kiểu của cha của đối tượng ẩn danh đó hoặc là `Any` nếu chưa có kiểu cha nào được khai báo trước đó. Và thành phần được thêm vào trong đối tượng ẩn danh sẽ không thể truy cập được:
    ```
   class C {
        // Private function, so the return type is the anonymous object type
        private fun foo() = object {
            val x: String = "x"
        }

        // Public function, so the return type is Any
        fun publicFoo() = object {
            val x: String = "x"
        }

        fun bar() {
            val x1 = foo().x        // Works
            val x2 = publicFoo().x  // ERROR: Unresolved reference 'x', because anonymous object is used as return type of publicFoo()
        }
    }
    ```
* Code trong **object expression** có thể truy cập các biến từ một phạm vi bao quanh **object expression**:
    ```
    fun countClicks(window: JComponent) {
        var clickCount = 0
        var enterCount = 0

        window.addMouseListener(object : MouseAdapter() {
            override fun mouseClicked(e: MouseEvent) {
                clickCount++
            }

            override fun mouseEntered(e: MouseEvent) {
                enterCount++
            }
        })
        // ...
    }
    ```
# Object declaration
* Singleton partern có thể hữu ích trong nhiều trường hợp, khai báo singleton trong Kotlin rất dễ dàng như sau:
    ```
    object DataProviderManager {
        fun registerDataProvider(provider: DataProvider) {
            // ...
        }

        val allDataProviders: Collection<DataProvider>
            get() = // ...
    }
    ```
    Khai báo `DataProviderManager` như trên chính là **object declaration**, và nó luôn có một tên được định nghĩa đi sau từ khóa `object`.
*  Giống khai báo một biến, một `object declaration` không phải là một biểu thức, và không thể dùng ở phía bên phải của một phép gán. 
*  Để tham chiếu đến đối tượng, dùng trực tiếp tên của nó:
    `DataProviderManager.registerDataProvider(...)`
*  Các đối tượng này có thể có kiểu cha
    ```
    object DefaultListener : MouseAdapter() {
        override fun mouseClicked(e: MouseEvent) { ... }

        override fun mouseEntered(e: MouseEvent) { ... }
    }
    ```
*  **Object daclaration** không thể là `local` (ví dụ như là ở trong một phương thức), nhưng nó có thể được khai báo trong **object daclaration** khác hoặc lớp  không phải là lớp inner. 
# Companion object
* **Object declaration** bên trong một lớp có thể được đánh dấu bằng từ khóa `companion`:
    ```
    class MyClass {
        companion object Factory {
            fun create(): MyClass = MyClass()
        }
    }
    ```
*  Các thành phần của **companion object** có thể được gọi băng cách tên của lớp:
    `val instance = MyClass.create()`
*  Có thẻ không cần khai báo tên của **companion object**, trong trường hợp này tên `Companion` sẽ được dùng:
    ```
    class MyClass {
        companion object { }
    }

    val x = MyClass.Companion
    ```
    
* Mặc dù các thành phần của **companion object** có vẻ giống như thành phần `static` trong các ngôn ngữ khác nhưng tại runtime chúng vẫn và instance của một object thực sự và có thể thực hiện một số việc, ví dụ như triển khai interface:
    ```
    interface Factory<T> {
        fun create(): T
    }

    class MyClass {
        companion object : Factory<MyClass> {
            override fun create(): MyClass = MyClass()
        }
    }

    val f: Factory<MyClass> = MyClass
    ```
* Tuy nhiên các thành phần của **companion object**  có thể được tạo ra là các phương thức `static` và các trường `static` nếu dùng @JvmStatic annotation. 
# Sự khác biệt
* Một số điểm khác biệt quan trọng giữa **object expression** và **object declaration**:
1. **Object expression** được thực hiện và khởi tạo ngay khi nó được dùng.
2. **Object declaration** được khởi tạo muộn khi mà đối tượng được truy cập lần đầu.
3. **Companion object** được khởi tạo khi lớp tương ứng được tải lên,