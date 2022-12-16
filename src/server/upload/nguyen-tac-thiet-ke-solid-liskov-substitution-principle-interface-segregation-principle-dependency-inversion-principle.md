Nguyên tắc Open/Closed Principle là một trong năm nguyên tắc thiết kế để phát triển phần mềm hướng đối tượng được mô tả bởi Robert C. Martin,

* [Single Responsibility Principle](https://viblo.asia/p/nguyen-tac-thiet-ke-solid-single-responsibility-principle-bWrZnpAb5xw)
* [Open/Closed Principle](https://viblo.asia/p/nguyen-tac-thiet-ke-solid-openclosed-principle-eW65GezJZDO)
* Liskov Substitution Principle
* Interface Segregation Principle
* Dependency Inversion

# 1. Liskov Substitution Principle
Nội dung:

*The Liskov substitution principle (LSP) states that objects should be replacable with instances of their subtypes without alterting the correctness of that program*

Tạm dịch:

*Trong một chương trình, các object của class con có thể thay thế class cha mà không làm thay đổi tính đúng đắn của chương trình*

Nguyên tắc này nghe có vẻ phức tạp, nhưng thực chất có thể diễn ý đơn giản lại như sau: Nếu một class có sử dụng một implemtation của một interface, thì nó phải được thay thế dễ dàng bởi các implementation của interface đó mà không cần sửa gì thêm.

Chúng ta hãy xem ví dụ đơn giản sau đây:
```
public class Rectangle {
  private double height;
  private double width;

  public double area();

  public void setHeight(double height);
  public void setWidth(double width);
}
```
Chúng ta có  class Square kế thừa Rectangle
```
public class Square extends Rectangle {  
  public void setHeight(double height) {
    super.setHeight(height);
    super.setWidth(height);
  }

  public void setWidth(double width) {
    setHeight(width);
  }
}
```
# 2. Interface Segregation Principle
Nội dung:

*The interface-segregation principle (ISP) states that no client should be forced to depend on methods it does not use.*

Tạm dịch:

*Thay vì dùng 1 interface lớn, ta nên tách thành nhiều interface nhỏ, với nhiều mục đích cụ thể*

Nguyên tắc này phát biểu rằng implementation của một interface không nên bị phụ thuộc vào những methods mà nó không dùng. Điều này có nghĩa là các interface phải được sắp xếp và phân chia hợp lý. Thay vì có một FAT interface chứa tất cả các methods cần được thi công thì nó nên được chia nhỏ ra mà class nào implement nó cũng không có method thừa.

Interface Messenger sau đây có nhiều method phức tạp, tuy nhiên khi có  class nào đó implement, các method thừa sẽ trở nên vô dụng.
```
public interface Messenger {
  askForCard();
  tellInvalidCard();
  askForPin();
  tellInvalidPin();
  tellCardWasSiezed();
  askForAccount();
  tellNotEnoughMoneyInAccount();
  tellAmountDeposited();
  tellBalance();
}
```
Chúng ta thực hiện tách interface trên thafh 2 interface có những chức năng riêng biệt.
```
public interface LoginMessenger {
  askForCard();
  tellInvalidCard();
  askForPin();
  tellInvalidPin();	
}

public interface WithdrawalMessenger {
  tellNotEnoughMoneyInAccount();
  askForFeeConfirmation();
}
```
# 3. Dependency Inversion
Nội dung:

*The dependency inversion principle (DIP) states that high-level code should not depend on low-level code, and that abstractions should not depend upon details*

Tạm dịch:

*Các module cấp cao không nên phụ thuộc vào các modules cấp thấp. Cả 2 nên phụ thuộc vào abstraction.

Interface (abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại (Các class giao tiếp với nhau thông qua interface (abstraction), không phải thông qua implementation.)*

Nguyên tắc này khá là rắc rối nếu nói trên phương diện lý thuyết, nên ta có thể xem qua một ví dụ rất thực tế sau đây: Ta có một cái vòi nước và rất nhiều loại ống dẫn nước. Ta có thể đổi bất kỳ loại ống dẫn nước nào phục vụ cho nhu cầu của ta một cách dễ dàng, chỉ cần nối với vòi nước là xong.

Dưới đây là một ví dụ: Một chương trình phụ thuộc vào interface Reader và Writer là trừu tượng, Keyboard và Printer là các chi tiết phụ thuộc vào các trừu tượng đó bằng cách implement các interface đó. Ở đây CharCopier không biết gì về các chi tiết cấp thấp của việcimplement Reader và Writer và do đó bạn có thể chuyển vào bất kỳ Thiết bị nào thực hiện interface Reader và Writer và CharCopier vẫn hoạt động chính xác.
```
public interface Reader { char getchar(); }
public interface Writer { void putchar(char c)}

class CharCopier {

  void copy(Reader reader, Writer writer) {
    int c;
    while ((c = reader.getchar()) != EOF) {
      writer.putchar();
    }
  }
}

public Keyboard implements Reader {...}
public Printer implements Writer {…}
```