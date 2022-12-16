# 1. Singleton là gì 

Singleton Pattern được dùng để đảm bảo chỉ có duy nhất một instance trong một class, và class đó sẽ cung cấp phương thức toàn cục để truy cập đến thực thể đó. Như vậy, Singleton Pattern được dùng khi bạn tạo ra một class mà bạn chỉ muốn chỉ có duy nhất một thực thể là instance của class đó và bạn có thể truy cập đến nó ở bất kỳ nơi đâu khi bạn muốn.

![](https://images.viblo.asia/4c9f1e68-323e-4403-86c2-425ac48b9852.png)

# 2. Định nghĩa Singleton trong Kotlin
Nếu bạn đã từng code java và đã quen với kiểu khai báo `static methods` thì sẽ rất dễ dàng áp dụng **Design Pattern - Singleton** với cách viết quen thuộc sau.
```
public class SingletonDemo {
    private volatile static SingletonDemo INSTANCE;
    
    private SingletonDemo(){}
    
    public static SingletonDemo getInstance() {
        if (INSTANCE == null) {
            INSTANCE = new SingletonDemo();
        }
        return INSTANCE;
    }
}
```

Nhưng trong kotlin lại không có  `static methods`  nên chúng ta sẽ không thể định **Singleton** theo cách cũ được.

![](https://images.viblo.asia/70bee90f-9d80-485f-9633-be3678be0b06.png)

Trong tài liệu của `Kotlin` có đề nghị các bạn sử dụng `package-level functions` nếu bạn muốn sử dụng hàm theo kiểu `static`

```
package demo
fun singleton(){
    println("Singleton")
}
```
nếu viết như này thì ở mọi nơi trong project bạn có thể gọi trược tiếp đến hàm `singleton()` bằng cách `import demo` vào trong file và thực hiện các câu lệnh trong đó. Cái này với những bạn đã từng code Java thì nó là điều hoàn toàn mới mẻ. Nhưng như vậy chúng ta vẫn chưa thể áp dụng để đĩnh nghĩa `Singleton`. 

Có 1 cách khác là bạn có thể đặt `object` trước hàm `singleton()`.

```
package demo
object SingletonDemo{
    fun singleton(){
           println("Singleton")
    }
}
```

như này thì bạn đã có thể gọi
```
    SingletonDemo.singleton()
```

bất kỳ biến hay phương thức nào khai báo thêm `object` sẽ được hiểu và thực hiện như 1 biến hay phương thức  `static`. Nhưng như này vẫn chưa đủ vì khai báo như này nó vẫn chưa đảm bảo tính duy nhất của **Singleton**.

Đến đây các bạn đã có thể biết 1 2 kiểu khai báo giống như `static` để chúng ta có thể truy cập ở mọi nơi trong project rồi.  Và bây giờ là đến phần chính, mình sẽ hướng dẫ các bạn định nghĩa **Singleton** chuẩn trong Kotlin.

```
public class SingletonDemo private constructor() {
    init { 
    // define in constructor
    }    

    private object Holder { val INSTANCE = SingletonDemo() }

    companion object {
        @JvmStatic
        fun getInstance(): SingletonDemo{
          return Holder.INSTANCE
        }
    }
}
```
- **private constructor** được khai báo để định nghĩa bạn không thể khởi tạo được đối tượng này ở class khác.
- **init** sẽ được gọi khi bạn khỏi tạo đối tượng.
- **companion object** khai báo như này thì các hàm trong viết trong đối tượng sẽ được khỏi tạo đồng hành cùng class
- **Holder object** khai báo để chắc chắc chỉ có 1 `instance of Singleton` được khởi tạo.


Như vậy định nghĩa **Design Pattern - Singleton** trong Kotlin có khác đôi chút với 1 số ngôn ngữ hướng đối tượng khác. Qua bài viết hi vọng giúp các bạn hiểu thêm về `Kotlin` và 1 số sự khác biệt giữa `Kotlin` và `java`.