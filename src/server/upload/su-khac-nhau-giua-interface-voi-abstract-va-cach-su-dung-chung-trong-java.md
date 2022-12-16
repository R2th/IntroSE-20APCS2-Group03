### Tổng quan
Trong java, chúng ta có `class` `abstract` và một `Interface`, ai cũng biết một class có thể `impements` nhiều `Interface` và chỉ kế thừa được một `class` `abstract`. Nhưng bạn thực sự đã biết khi nào thì ta dùng `Interface`, khi nào dùng `Abstract`. Chưa kể bắt đầu từ Java 8 có sự thay đổi về `Interface` càng làm khó phân biệt giữa hai loại này.

Trong bài viết này chúng tôi sẽ đi so sánh một số tính chất của 2 loại này, sau đó là đưa ra ví dụ đơn giải để các bạn hình dung rõ nhất. Cuối cùng là hiểu khi nào thì dùng chúng.

### Sự khác nhau giữa Interface và Abstract
1. Methods: Class `abstract` có các phương thức abstract và non-abstract. Trong khi `Interface` chỉ có phương thức abstract, từ Java 8, thì Interface có thêm 2 loại phương thức là `default` và `static`.
2. Variables: Class `abstract` có thể có các biến final, non-final, static và non-static. Trong khi `Interface` chỉ có các biến static và final.
3. Implementation: Class `abstract` có thể implement các Interface. Trong khi `Interface` thì không thể implement class abstract.
4. Inheritance: Class `abstract` có thể kế thừa được một class khác. Trong khi `Interface` có thể kế thừa được nhiều Interface khác.
5. Accessibility: các thành viên trong `Interface` kiếu mặc định là `public`. Trong khi class `abstract` thì lại có thể là private, protected,..

### Abstract là gì?
Abstract(trừu tượng) nghĩa là một cái gì đó không hoàn toàn cụ thể, nó chỉ là một ý tưởng hoặc ý chính của một cái gì đó mà không có bản triển khai cụ thể. Vì vậy Class abstract chỉ là một cấu trúc hoặc hướng dẫn được tạo cho các class cụ thể khác.

Chúng ta có thể nói rằng một class abstract là linh hồn của một class cụ thể, và rõ ràng một cơ thể (class) không thể có hai linh hồn. Đây cũng là lý do Java không hỗ trợ nhiều kế thừa cho các class abstract.

Hãy nhìn vào class abstract sau:
_Xe.class_

```java
public abstract class Xe {
    private String dongCo;
     abstract void khoiDongDongCo();
     abstract void dungDongco();
}

```
Chúng tôi tạo một class abstract `Xe`có thuộc tính là `động cơ`, và các phương thức khởi động/ dừng động cơ. `Xe` là một cái gì đó không cụ thể, nó có thể là ô tô, xe máy, ... và rõ ràng không có `Xe` nào mà không tồn tại động cơ và cơ chế khởi động/dừng động cơ cả.

_Oto.class_

```java
public class Oto extends Xe {
    @Override
    void khoiDongDongCo() {
        System.out.println("Khởi động động cơ của ôtô");
    }

    @Override
    void dungDongco() {
        System.out.println("Dừng động cơ của ôtô");
    }
}
```

### Interface là gì?
Interface (Giao diện) là một hình thức, giống như một hợp đồng, nó không thể tự làm bất cứ điều gì. Nhưng khi có một class ký kết hợp đồng (implement Interface) này, thì class đó phải tuân theo hợp đồng này.

Trong Interface, chúng tôi định nghĩa các hành vi của một class sẽ thực hiện. Một class có thể có một số cách hành vi khác nhau, cũng giống như nó có thể ký kết được với nhiều hợp đồng khác nhau. Đó cũng là lý do tại sao Java cho phép implement nhiều Interface.

Tiếp nối ví dụ trên, `Xe` có thể di chuyển, vì vậy chúng tôi tạo một Interface Hành động di chuyển và class `Oto` implement nó.

_HanhDongDiChuyen.class_
```java
public interface HanhDongDiChuyen {
    void diChuyen();
}
```
Đây là những hành vi của `Oto`, chứ không thuộc tính sẵn có của nó: **Ôtô là xe hơi, ngay cả khi nó không thể di chuyển được!** 

_Oto.class_

```java
public class Oto extends Xe implements HanhDongDiChuyen{
    @Override
    void khoiDongDongCo() {
        System.out.println("Khởi động động cơ của ôtô");
    }

    @Override
    void dungDongco() {
        System.out.println("Dừng động cơ của ôtô");
    }

    @Override
    public void diChuyen() {
        System.out.println("Ôtô đang di chuyển");
    }
}
```

### Khi nào nên dùng?
1. Class abstract đại diện cho mối quan hệ "IS - A" (Ôtô là Xe)
2. Interface đại diện cho mối quan hệ "like - A" (Ô tô có thể chuyển động).
3. Tạo một class abstract khi bạn đang cung cấp các hướng dẫn cho một class cụ thể.
4. Tạo Interface khi chúng ta cung cấp các hành vi bổ sung cho class cụ thể và những hành vì này không bắt buộc đối với clas đó.
### Kết luận
Mục đích của bài viết này là để giúp bạn hiểu và nắm vững class abstract, Interface và kịch bản sử dụng.  Thông qua nổ lực toàn bộ bài viết của chúng tôi, chúng tôi tin chắc rằng bạn đã hiểu được điều gì đó :D. Cuối cùng, cảm ơn bạn đã đọc bài viết.