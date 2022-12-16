© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Object-Oriented Design from real life to software](https://viblo.asia/s/object-oriented-design-from-real-life-to-software-z45bx89oZxY).

Các ngôn ngữ lập trình ngày nay đa số đều là lập trình hướng đối tượng, tất nhiên nó không phải cách duy nhất để lập trình. Để hiểu được lợi ích mà nó mang lại, cần so sánh với cách lập trình cổ điển Procedural programming (lập trình hướng thủ tục).

## 1) Procedural programming

Các ngôn ngữ đời đầu như Pascal, C đều là ngôn ngữ lập trình hướng thủ tục. Hiểu đơn giản, các dòng code được viết nối tiếp nhau, thực thi từ trên xuống dưới (series of instruction) theo trật tự nhất định. Nó cũng có thể được tổ chức dưới dạng các function dùng chung để đáp ứng nhu cầu về tính modular hoặc dễ dàng maintain.

Về cơ bản vẫn là thực hiện tuần tự từ A đến B để hoàn thành mục tiêu.

![](https://i.imgur.com/5IvGzkM.png)

Khá dễ hiểu, lần này mình muốn làm bánh Trung thu thay cho cho món [salad](https://hackmd.io/@datbv/rk-LaT7tO#1-Sequential-vs-Parallel-computing) :joy:. Đã có sẵn cuốn **300 công thức nấu ăn dành cho lập trình viên** trong tay, chỉ cần thực hiện y hệt theo những gì hướng dẫn là được. Trình các công đoạn cơ bản bao gồm:
> - Trộn bột
> - Đổ ra khuôn
> - Cho vào lò nướng

![](https://i.imgur.com/GrEZQT9.png)

Với procedural programming, việc viết code khá đơn giản, không mất nhiều công sức để hoàn thành một chương trình.

```java
// pseudo code

 class Application {

    void main() {
        mixIngredients(...);
        fillThePattern(...);
        bakeTheCake(...);
    }
    
    void mixIngredients(...);
    void fillThePan(...);
    void bakeTheCake(...);
}
```

## 2) Object-Oriented programming

OOP có gì khác biệt? Thay vì tiếp cận từng bước với **Procedural programming**, ta tiếp cận theo hướng đối tượng (object). Mô tả về các object và các behaviour (hành động) của chúng trong quá trình nướng một chiếc bánh :pancakes:. Các object trong bài toán này bao gồm mixer (máy trộn), pattern (khuôn làm bánh) và oven (lò nướng) với các behaviour là mix (trộn), fill (đổ vào khuôn) và bake (nướng).

Mỗi object đều có những data và logic riêng để miêu tả về cách thức chúng hoạt động và tương tác với object khác. Điểm mấu chốt và idea của OOP là đưa các object của thế giới thực vào lập trình nhiều nhất có thể.

```java
// pseudo code

class Mixer {
    void mix(...);
}

class Pattern {
    void fill(...);
}

class Oven {
    void bake(...);
}

class Application {
    
    void main() {
        Mixer().mix(...);
        Pattern().fill(...);
        Oven().bake(...);
    }
}
```

## 3) So sánh

Kết quả cuối cùng của **Procedural programming** và **Object-Oriented programming** đều như nhau (chắc chắn rồi :joy:). Sự khác biệt nằm ở cách tiếp cận vấn đề và tổ chức code giữa hai phương pháp.

Trong thực tế, không thể nói cách nào tốt hơn cách nào hoàn toàn. Mỗi cách đều có ưu điểm và nhược điểm tùy thuộc vào bài toán cụ thể.

Tuy nhiên, OOP ngày càng trở nên phổ biến vì ưu điểm của nó, vì vậy tập trung vào OOP thôi nhé :joy:. Lợi ích đầu tiên và lớn nhất của OOP đó là **code re-usability**.

Nghe hơi ảo, **Procedural programming** language cũng có khả năng code re-usability bằng cách thiết lập các function? Vấn đề nằm ở chỗ nếu bài toán đổi từ làm bánh nướng sang làm bánh quy thì sao?

Với **Procedural programming**, khả năng phải sửa đổi nhiều data, function và logic để làm được điều đó. Nhưng với **Object-Oriented programming**, đã có sẵn lò nướng, máy trộn nguyên liệu, chỉ cần đổi từ khuôn làm bánh Trung thu sang cookie là ổn rồi. Nghe cũng hợp lý, nhưng để implement chuẩn không đơn giản :joy:.

Cụ thể, **OOP** có các ưu điểm sau:
> - **Code re-usability**.
> - **Data Redundancy**.
> - **Code maintenance**.
> - **Security**.
> - **Design benefit**.
> - **Better productivity**.
> - **Easy troubleshooting**.
> - **Polymorphism flexibility**.
> - **Problems solving**.

Mình sẽ giải thích cụ thể rõ hơn từng ưu điểm trong các bài sau.

Bản chất, **OOP** là một mô hình lập trình, giúp chúng ta tiếp cận bài toán theo hướng đời thực nhất để tối đa các ưu điểm phía trên. Ngoài ra còn có các mô hình khác như Logic programming hay Functional programming tuy nhiên nó khá.. đặc thù với từng ngôn ngữ và các bài toán khác nhau.

Nhiệm vụ của chúng ta là tạo ra các web app, mobile app, desktop app, game... và nó rất phù hợp với OOP. Việc nắm rõ về OOP gần như là bắt buộc với các lập trình viên ngày nay.

Với bài toán đơn giản như ví dụ trên, việc áp dụng OOP có thể cồng kềnh hơn PP. Nhưng các dự án thực tế luôn phức tạp và requirement thay đổi chóng mặt, dẫn tới việc áp dụng OOP luôn là lựa chọn hàng đầu và tuyệt vời nhất (cho đến thời điểm hiện tại).

### Reference
Reference in series https://viblo.asia/s/object-oriented-design-from-real-life-to-software-z45bx89oZxY

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)