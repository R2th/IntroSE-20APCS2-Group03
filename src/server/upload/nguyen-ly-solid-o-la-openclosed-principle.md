Đây là bài thứ 2 của loạt bài viết về nguyên lý SOLID trong Android. Nếu bạn đã quên phần 1 hoặc không quen thuộc với nguyên lý SOLID, hãy xem lại [Phần 1](https://viblo.asia/p/nguyen-ly-solid-single-responsibility-principle-E375z8qWZGW), tôi đã giới thiệu về SOLID và thảo luận về Single Repository Principle

'O' trong SOLID là cách dễ nhớ về Open/Closed Principle. Open/Closed principle phát biểu như sau:

> software entities (classes, modules, functions, etc) should be open for extension, but closed for modification
> 

Trong khi phát biểu nghe khá là đơn giản, nhưng nó cũng là một trong những cụm từ nếu bạn ngẫm đi ngẫm lại ở trong đàu thì cuối cùng bạn sẽ bối rối. Tóm tắt cơ bản là bạn nên cố gắng viết code àm không phải thay đổi code sẵn có mỗi khi các yêu cầu thay đổi. Trong Android, chúng ta sử dụng Java, do đó nguyên lý này có thể được thực hiện với kế thừa và đa hình

# Một ví dụ của Open/Closed Principle
Ví dụ dưới đây là một ví dụ phổ biến thường được dùng để giới thiệu về Open/Closed principle và cách implement nó. Ví dụ dưới đây rất đươn giản và làm cho chúng ta có thể dễ dàng hình dung về Open/Closed principle.

Hãy tưởng tượng rằng bạn có một application mà có một yêu cầu tính toán diện tích cho bất kỳ hình dạng nhất định nào. Mặc dù khá đơn giản nhưng có một vấn đề ở đây, nói về hình dạng thì có rất nhiều hình, ví như hình tròn, hình tam giác, các đa giác và nhiều hình thù kì quái khác. 

Bởi vì chúng ta là một lập trìn viên OOP giỏi, chúng ta trừu tượng việc tính toán các hình trong một class được gọi là `AreaManager`. Class `AreaManager` là một class có một [Single Respository](https://viblo.asia/p/nguyen-ly-solid-single-responsibility-principle-E375z8qWZGW) - để tính toán tất cả diện của tất cả các hình.

Hãy tiếp tục tưởng tượng thằng chúng ta bây giờ chỉ đang làm việc với hình chữ nhật bởi vậy chúng ta có một class `Rectangcle` đại diện cho hình chữ nhât. Ở đây các class sẽ trông như thế này:

*Rectangle.java*
```Java
public class Rectangle {
    private double length;
    private double height; 
    // getters/setters ... 
}
```


*AreaManager.java*

```
public class AreaManager {
    public double calculateArea(ArrayList<Rectangle>... shapes) {
        double area = 0;
        for (Rectangle rect : shapes) {
            area += (rect.getLength() * rect.getHeight()); 
        }
        return area;
    }
}
```

Class `ArenaManager` làm việc tốt cho đến khi chúng ta có một loại hình mới xuất hiện - một hình tròn.

*Circle.java*

```Java
public class Circle {
    private double radius; 
    // getters/setters ...
}
```

Do có một hình mới xuất hiện chúng ta phải tính toán, chúng ta phải thay đổi `AreaManager`

```Java
public class AreaManager {
    public double calculateArea(ArrayList<Object>... shapes) {
        double area = 0;
        for (Object shape : shapes) {
            if (shape instanceof Rectangle) {
                Rectangle rect = (Rectangle)shape;
                area += (rect.getLength() * rect.getHeight());                
            } else if (shape instanceof Circle) {
                Circle circle = (Circle)shape;
                area += (circle.getRadius() * cirlce.getRadius() * Math.PI;
            } else {
                throw new RuntimeException("Shape not supported");
            }            
        }
        return area;
    }
```

Code bắt đầu đã có mùi gì đó.

Nếu chúng ta lại có thêm một hình tam giác, hoặc bất kỳ hình đa giác nào phải tính toán, chúng ta sẽ lại phải thay đổi class `AreaManager` và câu chuyện cứ thế tiếp diễn.

Vậy làm thế nào để `AreaManager` Open/Closed trở nên thân thiện?

# Thực hiện Open/Closed Principle với Kế thừa
Bởi vì `AreaManager` chịu trách nhiệm tính toán diện tích tất của tất cả các hình, và bởi vì cách tính toán hình là duy nhất đối với mỗi hình riêng biệt, dunwgf như chỉ hợp lý khi di chuyển tính toàn diện tích cho mỗi hình dạng vào lớp tương ứng của nó.

Hmm, nhưng điều này vẫn làm `AreaManager` phải bieetsg về tất cả các hình, đúng không? Bởi vì làm thế nào để nó biết rằng đối tượng mà nó lặp đi lặp lại có một phương thức tính diện tích? Chắc chắn, điều này có thể giải quyết bằng reflection hoặc chúng ta có thể có từng class kế từ một interface: `Shape` interface (Nó cũng có thể là một abstract class):

*Shape.java*

```Java
public interface Shape {
    double getArea(); 
}
```

Mỗi class sẽ implement interface này (hoặc kế thừa từ abstract class nếu bạn cần điều này với bất kì lí do nào).

*Rectangle.java*
```Java
public class Rectangle implements Shape {
    private double length;
    private double height; 
    // getters/setters ... 

    @Override
    public double getArea() {
        return (length * height);
    }
}
```

*Circle.java*
```Java
public class Circle implements Shape {
    private double radius; 
    // getters/setters ...

    @Override
    public double getArea() {
        return (radius * radius * Math.PI);
    }
}
```

Chúng ta bây giờ có thể làm `AreaManager` theo Open/Closed principle bằng cách phụ thuộc vào abstraction này:

```Java
public class AreaManager {
    public double calculateArea(ArrayList<Shape> shapes) {
        double area = 0;
        for (Shape shape : shapes) {
            area += shape.getArea();
        }
        return area;
    }
}
```

Chúng  ta đã thực hiện thay đổi `AreaManager` để cho phép nó trở nên closed cho sự thay đổi và open cho mở trộng. Nếu chúng ta cần thêm một hình mới, như một hình bát giác, `AreaManager` sẽ không cần thay đổi vì nó open để mở thông qua interface `Shape`

# Open/Closed Principle trong Android.

Shapes là một ví dụ tốt để học và hiểu về Open/Closed principle, như làm cách nào để nguyên lý này áp dụng trong android? Vâng, không chỉ được áp dụng trong Android mà còn bất kì ngôn ngữ nào khác cho các vấn đề. Android đã implement Open/Closed principle một cách tuyệt vời để giải thích. Hãy chem chúng

Một điều mà nhiều lập trình viên Android mới không biết là các buidt-in Android views như Button, Swtich và Checkbox là các TextView object. Hãy xem ảnh chụp màn hình và bạn xẽ thấy có nhiều view khác nhau mà kế thừa từ TextView.

![](https://images.viblo.asia/ce487d5b-bc5c-43ad-9152-2bbb5fdc944a.png)

Điều này có nghĩa rằng các view của hệ thống Android được close cho việc thay đổi nhưng open cho mở rộng. Nếu bạn muốn thay đổi cách mà text hiển thị bằng cách tạo CurrencyTextView, bạn đơn giản là kế thừa từ TextView và implement logic của bạn. Android view system không quan tâm rằng bạn sử dụng một CurrencyTextView mới, nó chỉ quan tâm rằng class của bạn tuân theo các đặc tính của TextView. Android sẽ dựa vào các methods để xác định và view của bạn sẽ được vẽ lên màn hình

Điều tương tự cũng có thể được nói với class ViewGroup như sau:

s![](https://images.viblo.asia/9b76fb4e-034f-4d33-9bb1-22831cde5cee.png)

Có nhiều ViewGroup khác nhau (RelativeLayout, LinearLayout, ConstrainLayout, v.v...) và Android biết cách để làm việc với chúng. Bạn có thể tạo một ViewGroup của riêng bạn khá dễ dàng bằng cách kế thừa `ViewGroup`. Cuối cung, bạn có thể viết code dựa vào `ViewGroup`, `TextView`, hoặc thậm chí class `View` để làm điều gì đó đặc biệt.

Dựa vào abstraction như `View`, `TextView`, `ViewGroup` và nhiều thứ khác cho phép bạn viết code mà close để thay đổi và open để mở rộng.

# Kết:

Open/Close principle không được giới hạn trong Android views system mà Andorid view system chỉ là cách đơn giản để thấy principle được áp dụng trong thực tế mà hàng ngàn lập trình viên đang sử dụng mỗi ngày. Bạn cũng có thể viết code mà tuân theo Open/Closed principle. Với một chút plainning và abstraction bạn có thể tạo ra code mà dễ dàng để maintain và mở rộng, và không cần thay đổi mỗi khi có một chức năng mới được thêm vào,

# Tham khảo
Bài viết có tham khảo từ: https://academy.realm.io/posts/donn-felker-solid-part-2/