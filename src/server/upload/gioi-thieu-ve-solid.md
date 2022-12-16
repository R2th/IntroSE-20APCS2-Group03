# 1) Giới thiệu
Trong bài viết này, chúng ta sẽ thảo luận về thiết kế SOLID trong lập trình hướng đối tượng.

Thiết kế SOLID lần đầu tiên được khái niệm hóa bởi Robert C. Martin trong Design Principles and Design Patterns. Khái niệm này sau đó được xây dựng bởi Michael Feathers, người đã giới thiệu cho chúng ta về 5 từ viết tắt SOLID. 5 nguyên tắc này đã cách mạng hóa thế giới lập trình hướng đối tượng, thay đổi cách chúng ta viết phần mềm.

Vậy SOLID là gì? Nói một cách giản đơn, nó khuyến khích chúng ta tạo ra phần mềm linh hoạt, dễ hiểu, dễ bảo trì hơn. Do đó, khi muốn mở rộng phần mềm, chúng ta có thể giảm độ phức tạp của chúng và tự giải quyết vấn đề của mình.

SOLID bao gồm 5 yếu tố:
Single Responsibility
Open/Closed
Liskov Substitution
Interface Segregation
Dependency Inversion

Tiếp theo, mình sẽ giới thiệu từng thành phần trong SOLID

# 2) Single Responsibility
 Nguyên tắc này nói rằng, mỗi lớp chỉ nên có 1 trách nghiệm và chỉ có 1 lý do để thay đổi.
 
 Nguyên tắc này giúp chúng ta xây dựng phần mềm tốt hơn như thế nào? Chúng ta hãy xem một vài lợi ích của nó:
 
 Testing - Một lớp có một trách nhiệm sẽ có ít trường hợp kiểm thử hơn
 
Lower coupling - Ít chức năng hơn trong một lớp sẽ có ít phụ thuộc hơn

Organization - Các lớp nhỏ hơn, được tổ chức tốt sẽ dễ dàng tìm kiếm hơn các lớp lớn

1 ví dụ nho nhỏ về phần này

```
public class Book {
 
    private String name;
    private String author;
    private String text;
 
    //constructor, getters and setters
}
```

Trong mã này, chúng ta lưu trữ name, author và text được liên kết với một phiên bản của Book.

Bây giờ chúng ta hãy thêm một vài phương thức để truy vấn văn bản:

```
public class Book {
 
    private String name;
    private String author;
    private String text;
 
    //constructor, getters and setters
 
    // methods that directly relate to the book properties
    public String replaceWordInText(String word){
        return text.replaceAll(word, text);
    }
 
    public boolean isWordInText(String word){
        return text.contains(word);
    }
}
```

Bây giờ,  lớp Book của chúng ta hoạt động tốt và chúng ta có thể lưu trữ bao nhiêu sách tùy thích trong ứng dụng của mình. Nhưng, có gì tốt khi lưu trữ thông tin nếu chúng ta không thể xuất text ra bảng điều khiển và đọc nó?

Hãy thử thêm 1 phương thức

```
public class Book {
    //...
 
    void printTextToConsole(){
        // our code for formatting and printing the text
    }
}
```

Tuy nhiên, đoạn code này vi phạm nguyên tắc mà chúng ta đã nêu trên. Để khắc phục tình trạng lộn xộn này, chúng ta nên triển khai một lớp riêng chỉ liên quan đến việc in các văn bản của chúng ta:

```
public class BookPrinter {
 
    // methods for outputting text
    void printTextToConsole(String text){
        //our code for formatting and printing the text
    }
 
    void printTextToAnotherMedium(String text){
        // code for writing to any other location..
    }
}
```

Như vậy là mỗi lớp đã xây dựng chỉ thực hiện 1 nhiệm vụ duy nhất trong đó Book đóng vai trò thay đổi text theo ý muốn và BookPrinter đóng vai trò in ra các vị trí cần thiết.

Cho dù đó là email, logging, hoặc bất cứ điều gì khác, chúng ta có một lớp riêng dành cho mối quan tâm này.

# 3) Open for Extension, Closed for Modification
Nguyên tắc này còn gọi là nguyên tắc đóng mở. Nói một cách đơn giản, các lớp nên được mở rộng nhưng đóng để sửa đổi. Khi làm vậy, chúng ta sẽ ngăn bản thân sửa đổi code hiện có và gây ra các lỗi mới tiềm ẩn. Tất nhiên, chúng ta có 1 ngoại lệ là cần phải fix bug trong code hiện có.

Hãy xem 1 ví dụ đơn giản sau nhé

Hãy tưởng tượng chúng tôi đã thực hiện một lớp Person.

```
public class Person {
 
    private String idCard;
    private String name;
    private int birthday;
    private boolean canPlayGuitar;
 
    //Constructors, getters & setters
}
```

Hiện giờ người ta chỉ có guitar để chơi. Tuy nhiên, sau một vài tháng, chúng ta thấy Guitar hơi nhàm chán và chúng ta muốn thêm mắm thêm muối để cho nó thêm "mặn". Ví dụ như bạn muốn thêm canPlayPiano. Lúc này bạn chỉ cần  thêm trường canPlayPiano vào lớp Person nhưng liệu có chúng ta có thể biết được có lỗi nào xảy ra khi chúng ta thêm như vậy không.

Thay vì thế hãy tuân thủ theo nguyên tắc đóng mở.

```
public class SuperCoolGuitarWithFlames extends Guitar {
 
    private String flameColor;
 
    //constructor, getters + setters
}
```

Bằng cách mở rộng lớp Person, chúng ta có thể chắc chắn rằng ứng dụng hiện tại của chúng tôi sẽ không bị ảnh hưởng.

# 4) Liskov Substitution

Tiếp theo trong danh sách của chúng tôi là Liskov substitution, được cho là phức tạp nhất trong số 5 nguyên tắc. Nói một cách đơn giản, nếu lớp A là một kiểu con của lớp B, thì chúng ta sẽ có thể thay thế B bằng A mà không làm gián đoạn hành vi của chương trình của chúng ta.

Ví dụ: Mình sẽ đưa ra 2 ví dụ thường gặp về việc vi phạm LSP:

Giả sử, ta muốn viết một chương trình để mô tả các loài chim bay. Đại bàng, chim sẻ, vịt bay được, nhưng chim cánh cụt không bay được. Do chim cánh cụt cũng là chim, ta cho nó kế thừa class Bird. Tuy nhiên, vì cánh cụt không biết bay, khi gọi hàm bay của chim cánh cụt, ta sẽ quăng NoFlyException.

```
public class Bird {
  public virtual void Fly() { Console.Write("Fly"); }
}
public class Eagle : Bird {
  public override void Fly() { Console.Write("Eagle Fly"); }
}
public class Duck : Bird {
  public override void Fly() { Console.Write("Duck Fly"); }
}
public class Penguin : Bird {
  public override void Fly() { throw new NoFlyException(); }
}

var birds = new List { new Bird(), new Eagle(), new Duck(), new Penguin() };
foreach(var bird in birds) bird.Fly();
// Tới pengiun thì lỗi vì cánh cụt quăng Exception
```

Ta tạo 1 mảng chứa các loài chim rồi duyệt các phần tử. Khi gọi hàm Fly của class Penguin, hàm này sẽ quăng lỗi. Class Penguin gây lỗi khi chạy, không thay thế được class cha của nó là Bird, do đó nó đã vi phạm LSP.

Ví dụ thứ 2, class con thay đổi hành vi class cha
Đây là ví dụ kinh điển về hình vuông và hình chữ nhật mà mọi người thường dùng để giải thích LSP, mình chỉ viết và giải thích lại đôi chút.

Đầu tiên, hãy cùng đọc đoạn code dưới đây. Ta có 2 class cho hình vuông và hình chữ nhật. Ai cũng biết hình vuông là hình chữ nhật có 2 cạnh bằng nhau, do đó ta có thể cho class Square kế thừa class Rectangle để tái sử dụng code.

```
public class Rectangle
{
    public int Height { get; set; }
    public int Width { get; set; }
    
    public virtual void SetHeight(int height)
    {
        this.Height = height;
    }
    public virtual void SetWidth(int width)
    {
        this.Width = width;
    }
    public virtual int CalculateArea()
    {
        return this.Height * this.Width;
    }
}

public class Square : Rectangle
{
    public override void SetHeight(int height)
    {
        this.Height = height;
        this.Width = height;
    }
    
    public override void SetWidth(int width)
    {
        this.Height = width;
        this.Width = width;
    }
}
```

Do hình vuông có 2 cạnh bằng nhau, mỗi khi set độ dài 1 cạnh thì ta set luôn độ dài của cạnh còn lại. Tuy nhiên, khi chạy thử, hành động này đã thay đổi hành vi của của class Rectangle, dẫn đến vi phạm LSP. Trong trường hợp này, để code không vi phạm LSP, ta phải tạo 1 class cha là class Shape, sau đó cho Square và Rectangle kế thừa class Shape này.

# 5) Interface Segregation
Nguyên tắc này nói rằng các interface lớn hơn nên được chia thành các interface nhỏ hơn. Bằng cách làm như vậy, chúng ta có thể đảm bảo rằng các class triển khai chỉ cần quan tâm đến các phương thức mà chúng quan tâm.

Ví dụ:

Hãy bắt đầu với một interface thể hiện vai trò của chúng ta với tư cách là người giữ gấu:

```
public interface BearKeeper {
    void washTheBear();
    void feedTheBear();
    void petTheBear();
}
```

Là những người chăm sóc vườn thú, chúng ta rất hạnh phúc khi được rửa và cho những con gấu yêu quý của chúng ta ăn. Tuy nhiên, tất cả chúng ta đều nhận thức được sự nguy hiểm của việc vuốt ve chúng. Thật không may, giao diện của chúng ta khá lớn và chúng ta không có lựa chọn nào khác ngoài việc triển khai cả 3 method.

Thay vì vậy hãy tách interface này ra nhỏ hơn

```
public interface BearCleaner {
    void washTheBear();
}
 
public interface BearFeeder {
    void feedTheBear();
}
 
public interface BearPetter {
    void petTheBear();
}
```

Giờ đây,  chúng ta có thể thoải mái thực hiện các phương thức quan trọng đối với chúng ta:

```
public class BearCarer implements BearCleaner, BearFeeder {
 
    public void washTheBear() {
    }
 
    public void feedTheBear() {
    }
}
```

```
public class CrazyPerson implements BearPetter {
 
    public void petTheBear() {
        //Good luck with that!
    }
}
```

# 6) Dependency Inversion
1. Các module cấp cao không nên phụ thuộc vào các module cấp thấp. Cả 2 nên phụ thuộc vào abstraction.
2. Interface (abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại. (Các class giao tiếp với nhau thông qua interface, không phải thông qua implementation.)

Ví dụ:
Code khi chưa áp dụng DIP:
```
public class Windows98Machine {
 
    private final StandardKeyboard keyboard;
    private final Monitor monitor;
 
    public Windows98Machine() {
        monitor = new Monitor();
        keyboard = new StandardKeyboard();
    }
 
}
```

Code này sẽ hoạt động và chúng ta sẽ có thể sử dụng StandardPal và Monitor một cách tự do trong lớp Windows98Computer của chúng ta. Vấn đề được giải quyết? Không hẳn. Bằng cách khai báo StandardPal và Monitor với từ khóa mới, chúng ta đã kết hợp chặt chẽ 3 lớp này với nhau. 

Điều này không chỉ khiến Windows98Computer của chúng ta khó kiểm tra, mà chúng ta còn mất khả năng chuyển đổi lớp StandardPal của chúng ta bằng một lớp khác nếu cần. Và chúngtatôi cũng bị mắc kẹt với lớp Monitor

Chúng ta hãy tách chúng khỏi StandardPal bằng cách thêm interface Keyboard tổng quát hơn và sử dụng interface này trong lớp của chúng ta:

```
public interface Keyboard { }

public class Windows98Machine{
 
    private final Keyboard keyboard;
    private final Monitor monitor;
 
    public Windows98Machine(Keyboard keyboard, Monitor monitor) {
        this.keyboard = keyboard;
        this.monitor = monitor;
    }
}
```

Chúng ta cũng làm tương tự cho Monitor

Như vậy húng ta đã tách riêng các phụ thuộc và được tự do kiểm tra Windows98Machine với bất kỳ testing framework nào chúng ta chọn.

# 7) Kết luận
Như vậy trên đây mình đã giới thiệu qua về SOLID - sự đúc kết kinh nghiệm của các bậc tiền bối đi trước. Mong rằng qua bài viết này bạn có thể code clear hơn và xịn xò hơn.

# Tài liệu tham khảo

https://www.baeldung.com/solid-principles