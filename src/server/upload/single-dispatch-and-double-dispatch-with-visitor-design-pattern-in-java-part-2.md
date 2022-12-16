Ở [bài trước](https://viblo.asia/p/single-dispatch-and-double-dispatch-with-visitor-design-pattern-in-java-part-1-gGJ59WEPZX2), mình đã giới thiệu về khái niệm single dispatch và double dispatch, chúng ta cũng đã biết rằng java chỉ hỗ trợ single dispatch, nên để có thể sử dụng được double dispatch trong java, chúng ta phải có cách tiếp cận khác, một trong số đó là sử dụng design parttern, mà cụ thể ở đây là Visitor parttern.

### Mở đầu
Trong thiết kế hướng đối tượng, Visitor là mẫu thiết kế (Design Patterns) cho phép định nghĩa các thao tác (operations) trên một tập hợp các đối tượng (objects) không đồng nhất (về kiểu) mà không làm thay đổi định nghĩa về lớp (classes) của các đối tượng đó. Để đạt được điều này, trong mẫu thiết kế visitor ta định nghĩa các thao tác trên các lớp tách biệt gọi các lớp visitors, các lớp này cho phép tách rời các thao tác với các đối tượng mà nó tác động đến. Với mỗi thao tác được thêm vào, một lớp visitor tương ứng được tạo ra.
#### Visitor Design Pattern Class Diagram
![](https://images.viblo.asia/f9d8d31e-b14e-453d-9f49-15d154acd90a.jpg)


Nhìn vào biểu đồ ULM trên, chúng ta có thể nhận thấy được sự phụ thuộc của các đối tượng trong mẫu thiết kế này, 
### How to implement 
Gỉa sử chúng ta có một bài toán như sau, bạn là một ladykiller, bạn muốn tỏ tình vs một cô gái nhưng không biết quốc tịch của cô gái ấy là gì, đơn là là chúng ta không thể nói anh yêu em với một cô gái người Nhật Bản được, vì cô ấy sẽ chẳng hiểu gì cả, thay vì vậy chúng ta sẽ nói "aishite imasu" :) 

```
public interface Lady {
}
public class AmericanLady implements Lady {
    public void sayILoveYou() {
        System.out.println("I love you");
    }
}
public class JapanLady implements Lady {
    public void sayAishiteImasu() {
        System.out.println("aishite imasu");
    }
}
```

trên đây mình khai báo 2 class có 2 phương thức khác nhau.
theo cách đơn giản nhất, chúng ta sẽ làm như sau

```
Lady lady = ...;
        if (lady instanceof AmericanLady) {
            ((AmericanLady) lady).sayILoveYou();
        } else if (lady instanceof JapanLady) {
            ((JapanLady) lady).sayAishiteImasu();
        }
```

thật không chấp nhận được, Đa Hình là 1 trong những tính chất trụ cột của OOP, làm lại thôi

```
public interface Lady {
    public void sayLove();
}
public class AmericanLady implements Lady {
    public void sayILoveYou() {
        System.out.println("I love you");
    }

    @Override
    public void sayLove() {
        sayILoveYou();
    }
}
public class JapanLady implements Lady {
    public void sayAishiteImasu() {
        System.out.println("aishite imasu");
    }

    @Override
    public void sayLove() {
        sayAishiteImasu();
    }
}

    public static void main(final String[] args) {
        Lady lady = ....;
        lady.sayLove();
    }
```

Vấn đề lại xuất hiện khi bạn muốn thay đổi, ví dụ khi chúng ta muốn thêm một phương thức say good bye nữa đi, lại phải thêm vào inferface rồi implement cho tất cả những nơi có phụ thuộc, sẽ thay đổi rất nhiều thứ mất thời gian cũng thêm rủi ro 
Giờ là lúc apply Visitor design partten

```
public interface Lady {
    void accept(Visitor visitor);
}
public class AmericanLady implements Lady {
    public void sayILoveYou() {
        System.out.println("I love you");
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}
public class JapanLady implements Lady {
    public void sayAishiteImasu() {
        System.out.println("aishite imasu");
    }

    @Override
    public void accept(Visitor visitor) {
        visitor.visit(this);
    }
}
public interface Visitor {
    void visit(AmericanLady lady);

    void visit(JapanLady lady);
}
public class SayLoveVisitor implements Visitor {
    @Override
    public void visit(AmericanLady lady) {
        lady.sayILoveYou();
    }

    @Override
    public void visit(JapanLady lady) {
        lady.sayAishiteImasu();
    }
}
```

    public static void main(final String[] args) {
        Lady lady = ....;
        lady.accept(new SayLoveVisitor());
    }

Bằng việc implement thêm đối tượng `SayLoveVisitor`, việc lấy được reference rất dễ dàng.
Như các bạn thấy, nếu thực hiện theo cách này, mỗi lần chúng ta muốn thêm một phương thức mới rất dễ dàng, không cần phải thay đổi code cả trong `Lady`, `AmericanLady`, `JapanLady`, việc của chúng ta là chỉ thêm class `Visitor` mới, ví dụ `SayGoodbyeVisitor`, đảm bảo được nguyên tắc mở rộng nhưng không sửa đổi :)

#### Pros
* Lợi ích của mẫu thiết kế này là nếu logic có sự thay đổi, thì chúng ta chỉ implement sự thay đổi đó bằng cách thay đổi các visitor, chứ không phải toàn bộ các class.
* Một lợi ích khác nữa là việc thêm mới một item khác rất dễ dàng, vì dụ chúng ta muốn có thêm `IndiaLady`, `LaosLady` ... , việc thay đổi chỉ nằm trong các visitor interface.

#### Cons
* Ngược lại, nếu dach sách lớp con của `Lady` rất hay bị thay đổi, ví dụ khi có thêm lớp `IndiaLady`, thì rõ ràng interface Visitor và tất cả các lớp hiện thực nó cũng sẽ bị thay đổi để có thể viếng thăm được thêm con `IndiaLady`. Nguyên nhân ở đây là do interface Visitor ôm đồm quá, nó visit được tất cả các loại con.

 ### Kết
Hy vọng qua bài viết này, các bạn có thể ứng dụng được Visitor Design Pattern - một trong những mẫu thiết kế tuyệt đẹp của Gang of Four. Have fun !