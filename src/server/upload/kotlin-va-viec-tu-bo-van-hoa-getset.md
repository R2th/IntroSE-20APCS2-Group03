## Lời dẫn

Từ trước đến nay, khi làm việc với các ngôn ngữ lập trình hướng đối tượng (OOP) kiểu cũ như Java, C++, C#..., các bạn hẳn đã quá quen với văn hoá Get/Set. Tức là các thành phần bên ngoài muốn truy xuất các thuộc tính của class là phải gọi đến các phương thức Get/Set để lấy hoặc thay đổi các thuộc tính của đối tượng đó. Về mặt logic mà nói, việc sử dụng Get/Set là hoàn toàn hợp lý. Nhưng nhìn từ góc độ trừu tượng khi một object là một đối tượng thực sự và khi mà các thuộc tính được xem là các giá trị của đối tượng còn các phương thức được xem là các hành động của chúng thì rõ ràng, việc bắt một đối tượng phải hành động gì đó trong khi ta chỉ cần lấy hay thay đổi tính chất của nó thì hơi khó hiểu.

## Ví dụ cụ thể

Vì bài viết này mục tiêu chính là quảng cáo cho Kotlin nên tôi sẽ lấy ví dụ bằng Java, ngôn ngữ mà Kotlin đang trên đường thay thế và cũng là một ngôn ngữ OOP rất "quốc dân".

Giả sử tôi có một class `Rectangle` với 2 thuộc tính là `width` và `height` như sau:

```Java
class Rectangle {
    private int width;
    private int height;
    
    public Rectangle(int newWidth, int newHeight) {
        width = newWidth;
        height = newHeight;
    }
    
    public int getWidth() {
        return width;
    }
    
    public int getHeight() {
        return height;
    }
    
    public void setWidth(int newWidth) {
        width = newWidth;
    }
    
    public void setHeight(int newHeight) {
        height = newHeight;
    }
}
```

Tất nhiên khi ta muốn lấy chiều cao của hình chữ nhật ta phải gọi `getHeight()`, đối tượng phải hành động "lấy chiều cao của mình" rồi "chìa ra cho các đối tượng khác xem". Thực sự nó đang phải hành động. Điều này là bất hợp lý vì rõ ràng ta chỉ cần lấy thuộc tính của nó chứ đâu cần nó phải hành động gì.

Hơn nữa, một hình chữ nhật trên thực tế sẽ có các thuộc tính gì ? Có phải chỉ có chiều dài và chiều rộng không ? Không phải, chúng còn có diện tích, có chu vi nữa, thậm chí là độ dài đường chéo, có phải hình vuông hay không...

Tất nhiên một hình chữ nhật chỉ cần có chiều dài và chiều rộng là có thể suy ra được hết các thuộc tính kia nên nếu phải lưu thêm các thuộc tính đó trong object thì thật là dư thừa.

Trong các ngôn ngữ kiểu cũ như Java, ta buộc phải viết các phương thức để tính các giá trị kia và thường đặt nó là `getXXX()` hoặc `isXXX()`. Trong đó `XXX` là giá trị cần lấy. Kiểu như thế này:
```Java
public int getArea() {
    return width * height;
}

public int getCircuit() {
    return width * 2 + height * 2;
}

public boolean isSquare() {
    return width == height;
}
```

Rõ ràng ta đang buộc phải đọc code từ góc độ máy móc rằng muốn lấy diện tích thì hình chữ nhật phải hành động việc "nhân chiều dài và chiều rộng với nhau", muốn xem có vuông không thì phải kiểm tra "chiều rộng có bằng chiều cao không" thay vì hiểu theo nghĩa thực tế rằng diện tích hay việc có vuông không nó là bản chất, là thuộc tính cố hữu của hình chữ nhật rồi.

## Văn hoá Get/Set có ảnh hưởng gì ?

Các nhà phát triển của các ngôn ngữ lập trình hiện đại như Kotlin hay Swift hiểu được điều đó. Như trong Kotlin, họ đã ẩn đi các phương thức get/set đối với các thuộc tính. Tức là bạn có thể gọi `object.property` để get và dùng dấu `=` khi cần set. Mặc dù bản chất khi dịch ngược về Java nó vẫn sẽ chỉ là một thuộc tính private với 2 phương thức get/set như thường, nhưng nhìn từ Kotlin, `property` thực sự là một thuộc tính đúng nghĩa. Object không cần phải "hành động" gì cả.

Ví dụ như trong Android Java, ta phải gọi `getText()` để lấy text từ TextView, gọi `setText("something")` để thay đổi text trong TextView. Nhưng trong Android Kotlin, việc ta cần chỉ là gọi ra `text` và dùng như một biến thông thường.

Nhưng có vẻ nhiều developer mới chuyển từ Java sang Kotlin chưa biết tận dụng điều này vì văn hoá get/set đã ăn sâu vào máu. Họ vẫn vô tình viết các hàm `getArea()` hay `isSquare()`. Điều này không chỉ đánh mất đi triết lý của những người tạo nên Kotlin, đặc biệt còn khiến code nhìn phức tạp hơn rất nhiều.

Giả sử:
```Kotlin
fun printIfRectangleIsALargeSquareOrNot(rectangle: Rectangle) {
    if(rectangle.isSquare() && rectangle.getArea() > 100) {
        println("Yes, it is a large square !")
    } else {
        println("No, it is not.")
    }
}
```

Ôi sao mà lắm ngoặc thế không biết. Nhìn thật rối mắt. Cảm giác code thật là phức tạp làm sao. Hình chữ nhật được truyền vào phải thực hiện kiểm tra rồi trả về đúng hay sai và lại kiểm tra, rồi lại phải thực hiện tính toán rồi lại phải trả về cái gì đó rồi phải kiểm tra tiếp.

Trong khi nếu áp dụng đúng, code sẽ nhìn như thế này:
```Kotlin
fun printIfRectangleIsALargeSquareOrNot(rectangle: Rectangle) {
    if(rectangle.isSquare && rectangle.area > 100) {
        println("Yes, it is a large square !")
    } else {
        println("No, it is not.")
    }
}
```

Lúc này khi đọc code người ta sẽ clear ngay: **À thì ra là nếu nó vuông và diện tích lớn hơn 100 thì in thế này, không thì thế kia.**

Triết lý của Kotlin (và các ngôn ngữ hiện đại khác) trong việc này đó là:
>  Method là hành động, đừng bắt đối tượng phải hành động khi ta cần lấy hoặc thay đổi một thuộc tính được cho phép.

## Thấm nhuần và thực hành triết lý cao cả này

Giả sử ta có một class là Person trong Kotlin với 2 thuộc tính cơ bản là `age` và `name` như sau:
```Kotlin
class Person(
    private val age: Int,
    private val name: String
) {
    // Thân của class viết vào đây
}
```

Class này sẽ có thêm thuộc tính `yearOfBirth` (vì biết tuổi tất nhiên phải biết được năm sinh) và `isChild` (vì nhìn tuổi là có thể biết luôn là trẻ con hay không).

Vì những thuộc tính này chỉ cần get chứ không thay đổi được, vì người thì phải có năm sinh cố định và không thể bị một phát biến thành người lớn được. Vậy nên class `Person` sẽ được viết như sau:
```Kotlin
class Person(
    private val age: Int,
    private val name: String
) {
    val yearOfBirth: Int
        get() {
            val currentYear = LocalDate.now().year
            return currentYear - age
        }
    val isChild: Boolean get() = age < 18
}
```

Cần lưu ý:
* Các thuộc tính dạng này (chỉ get) đều phải là val.
* Nếu ta không viết thêm get(), thuộc tính này trả về chính nó (cần gán giá trị trong constructor)
* Với các thuộc tính đơn giản có thể viết hàm get trên cùng một dòng như `isChild`
* Với các thuộc tính phải tính toán nhiều bước, nên dùng như `yearOfBirth` ở trên.


Về bản chất mỗi khi các thuộc tính này được gọi, nó sẽ gọi đến hàm get được định nghĩa như ở trên. Ta dùng nó như một thuộc tính, nhưng chỉ có thể lấy giá trị chứ không thể thay đổi được.

Bây giờ ta ta thử thêm một thuộc tính `job` dạng String (cho đơn giản), có thể cho phép bên ngoài xem hoặc thay đổi. Tuy nhiên nếu job này thấp kém quá thì sẽ bị từ chối set.
```Kotlin
var job: String = "Unemployee"
    set(value) {
        if(value != "Slut") field = value
    }
```
Như bạn thấy, bây giờ job sẽ được gán mặc định là "Unemployee", nhưng Person đã có thể được "xã hội" tạo công ăn việc làm. Nhưng nếu bị bắt phải làm "Slut" thì sẽ từ chối. Đơn giản chỉ có vậy. =))

Và tất nhiên xã hội có thể gọi trực tiếp vào job của Person để biết họ làm nghề gì.

Trên đây chỉ là những gợi ý cơ bản. Để tìm hiểu chi tiết hãy tham khảo tại trang chủ Kotlin: https://kotlinlang.org/docs/reference/properties.html#getters-and-setters

## Từ Java nhìn sang

Nếu bạn kết hợp Kotlin với Java trong cùng một dự án. Từ file java, bạn có thể gọi vào `yearOfBirth` bằng cách gọi phương thức `getYearOfBirth()`, và gọi vào `isChild` bằng cách gọi phương thức `isChild()`...

Về bản chất Kotlin chỉ đang "giả lập" các thuộc tính ảo này mà thôi chứ bản chất nó vẫn là các phương thức get/set trong Java. Nhưng lợi ích đối với người lập trình khi đọc và hiểu code là rất lớn.

## Tổng kết

Bản chất của các chương trình máy tính đều chỉ là sự mô phỏng lại thực tế, các nhà phát triển của các ngôn ngữ lập trình hướng đối tượng kiểu cũ đã rất cố gắng tạo ra những mô phỏng giống như một đối tượng thực tế nhưng chưa thật sự mô phỏng được hết. Các ngôn ngữ hướng đối tượng hiện đại đã giải quyết điều này bằng cách mô phỏng lại một lần nữa để đảm bảo sự mô phỏng đối tượng trở nên chân thực hơn. Hãy tận dụng điều này khi lập trình với Kotlin.

**Method là hành động, đừng bắt đối tượng phải hành động khi ta cần lấy hoặc thay đổi một thuộc tính được cho phép.**