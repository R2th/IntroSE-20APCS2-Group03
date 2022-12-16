Tôi đã lập trình hướng đối tượng cả thập kỷ. Ngôn ngữ OOP đầu tiên tôi biết là C++, rồi Smalltalk và cuối cùng là .NET và Java.

Tôi hào hứng tận dụng những lợi ích của kế thừa, đóng gói và đa hình, 3 trụ cột của OOP.

Tôi không ngừng nghĩ đến việc ánh xạ những đối tượng trong thế giới thực thành các class và chờ mong mọi thứ gọn gàng trong tầm tay. Nhưng tôi đã nhầm.

### I. Inheritance

Thoạt nhìn, kế thừa có vẻ như là lợi ích lớn nhất của mô hình hướng đối tượng. Tất cả các ví dụ đơn giản về mô hình phân cấp được giới thiệu với những người mới trông có vẻ rất logic.

![](https://images.viblo.asia/8291996b-df33-4e63-b911-1da1222dc8d2.png)

Tái sử dụng chính là mọi thứ ở đây, được nhắc đến hàng ngày, thậm chí hàng năm...

Tôi nghiền ngẫm và lao vào như thể mới phát hiện ra một phương trời mới vậy.

#### Con khỉ, quả chuối và khu rừng
Với những vấn đề cần giải quyết, tôi bắt đầu xây dựng lớp phân cấp và viết code. Mọi thứ xảy ra đúng như dự tính.

Tôi chẳng thể quên cái ngày mà tôi đã sẵn sàng để tận dụng lợi ích của việc tái sử dụng bằng cách kế thừa một lớp hiện có. Đó là khoảnh khắc mà tôi đã chờ đợi.

Một project mới đến và tôi đã nghĩ đến class mà tôi đã viết ở project trước.

Không sao, tái sử dụng là liều thuốc cho mọi thứ. Việc tôi cần làm chỉ đơn giản là lấy class từ project khác và xài lại.

À mà thực ra thì không chỉ là class đó, tôi còn cần cả class cha nữa. Nhưng chỉ có thể thôi ư.

Không, chắc là lại cần thêm class cha của class cha nữa. Và rồi tôi sẽ cần tất cả các class cha. OK, tôi sẽ làm, không vấn đề gì.

Nhưng code vẫn không chạy. Tại sao? À ... object này lại chứa object khác. Nên tôi sẽ lại phải cần chúng.

Nhưng mà tôi không những cần object đó, tôi còn cần cả tập cha của nó nữa.

Cha đẻ của *Erlang* có nói:

>> Vấn đề của OOP chính là chúng chứa tất cả những môi trường không tường minh bên cạnh. Bạn muốn quả chuối những tất cả những gì bạn nhận được chỉ là chú khỉ đột đang canh giữ và toàn bộ khu rừng.
>> 

#### Giải pháp
Tôi có thể khắc phục vấn đề này bằng cách không tạo ra sự phân cấp quá sâu. Nhưng nếu kế thừa là chìa khóa cho việc tái sử dụng, thì mọi giới hạn mà tôi đặt ra cho cơ chế đó cũng sẽ hạn chế lợi ích của việc tái sử dụng. Đúng chứ?

Đúng. Vậy thì người nông dân biết phải làm sao?

Contain và Delegate.

#### Đa kế thừa
Sớm hay muộn thì những vấn đề dưới đây cũng sẽ bộc lộ sự xấu xí của nó, tùy thuộc vào ngôn ngữ.

![](https://images.viblo.asia/a0f67ead-0ea7-4b39-b385-eb837a66a4c4.png)

Hầu hết ngôn ngữ hướng đối tượng không hỗ trợ, mặc dù chúng trông có vẻ logic. Đâu là trở ngại khi hỗ trở điều này trong OOP?

Hãy tưởng tượng đoạn code dưới đây:

```
Class PoweredDevice {
}
Class Scanner inherits from PoweredDevice {
  function start() {
  }
}
Class Printer inherits from PoweredDevice {
  function start() {
  }
}
Class Copier inherits from Scanner, Printer {
}
```

Lưu ý rằng cả class *Scanner* và *Printer* đều cài đặt hàm ```start```

Vậy class *Copier* sẽ kế thừa hàm ```start``` nào? Của *Scanner* hay của *Printer*?

#### Giải pháp cho đa kế thừa
Giải pháp rất đơn giản, đừng sử dụng đa kế thừa.

Phải, hầu hết ngôn ngữ hướng đối tượng sẽ không cho phép bạn làm điều này.

Nhưng nếu tôi phải làm thì sao? Vậy thì bạn phải *Contain* và *Delegate*.

```
Class PoweredDevice {
}
Class Scanner inherits from PoweredDevice {
  function start() {
  }
}
Class Printer inherits from PoweredDevice {
  function start() {
  }
}
Class Copier {
  Scanner scanner
  Printer printer
  function start() {
    printer.start()
  }
}
```

Lưu ý rằng class *Copier* chứa một thể hiện của *Printer* và *Scanner*. Nó cấp quyền cho hàm ```start``` sử dụng cài đặt của class *Printer*.

Vấn đề này chính là một vết nứt khác trong kế thừa.

#### Vấn đề của base class
Tạm thời tôi sẽ giữ lớp phân cấp của mình thật gọn và tránh phức tạp, không sử dụng đa thừa kế, và mọi thứ trông có vẻ khá ổn.

Cho đến khi, ngày này thì code chạy ngon, hôm sau thì lại crash. Vấn đề là tôi không sửa code.

Đây có thể là bug, nhưng có điều gì đó đã thay đổi, nhưng không phải ở code của tôi, mà nó bắt nguồn từ class mà tôi kế thừa.

Tại sao một thay đổi ở Base class lại phá vỡ cấu trúc code của tôi.

Lý do là đây, hãy thử tưởng tượng Base class dưới đây:

```
import java.util.ArrayList;
 
public class Array
{
  private ArrayList<Object> a = new ArrayList<Object>();
 
  public void add(Object element)
  {
    a.add(element);
  }
 
  public void addAll(Object elements[])
  {
    for (int i = 0; i < elements.length; ++i)
      a.add(elements[i]); // this line is going to be changed
  }
}
```

Class này có 2 function, **add()** và **addAll()**. Hàm **add()** sẽ thêm một phần tử và hàm **addAll()** sẽ thêm nhiều phần tử bằng cách gọi hàm **add()**.

Đây là class dẫn xuất:

```
public class ArrayCount extends Array
{
  private int count = 0;
 
  @Override
  public void add(Object element)
  {
    super.add(element);
    ++count;
  }
 
  @Override
  public void addAll(Object elements[])
  {
    super.addAll(elements);
    count += elements.length;
  }
}
```

Class *ArrayCount* là class con của class *Array*, chỉ một hành vi khác là *ArrayCount* lưu giữ số lượng các phần tử *count*.

Hãy xem cả 2 class này.

*Array add()* thêm một phần tử vào *ArrayList*.
*Array addAll()* gọi *ArrayList* thêm mỗi phần tử.

*ArrayCount add()* gọi hàm *add()* của lớp cha và sau đó tăng biến *count*.
*ArrayCount addAll()* gọi hàm *addAll()* của lớp cha và tăng *count*.

Đây mới là lúc vấn đề xảy ra. Dòng code được comment ở Base class giờ bị sửa thành như này:

```
  public void addAll(Object elements[])
  {
    for (int i = 0; i < elements.length; ++i)
      add(elements[i]); // this line was changed
  }
  ```
  
  Theo như người viết ra Base class thì nó vẫn hoạt động bình thường, test vẫn pass.
  
  *ArrayCount addAll()* gọi hàm *add()* của lớp cha, hàm này lại gọi hàm *add()* đã được ghi đè bởi lớp dẫn xuất.
  
  Điều này khiến biến *count* được tăng khi hàm *add()* của lớp dẫn xuất được gọi, và tăng lần nữa khi hàm *addAll()* của lớp dẫn xuất được gọi.
  
  Nó được đếm 2 lần.
  
  #### Giải pháp cho base class
  Một lần nữa ta lại sử dụng *Contain* và *Delegate*.
  
  Nhưng ngôn ngữ lập trình hướng đối tượng không được tạo ra để hỗ trợ Contain và Delegate, nó được thiết kế để kế thừa.
  
  #### Vấn đề phân cấp
  Mỗi lần tôi bắt đầu ở công ty mới, tôi gặp vấn đề khi tạo một nơi để lưu trữ tài liệu công ty.
  
  Liệu tôi có nên tạo thư mục gọi là *Documents* và tạo thư mục con là *Company*.
  
  Hay tôi tạo một thư mục là *Company* và tạo một thư mục con của nó là *Documents*.
  
  Cả 2 đều được. Nhưng cách nào đúng? Cách nào tốt nhất?
  
  Ý tưởng về phân loại là nơi Base class sẽ tổng quát còn lớp dẫn xuất sẽ là phiên bản chi tiết của class đó.
  
  Nhưng nếu cha và con có thể đổi chỗ cho nhau thì mô hình này trở nên không hợp lý.
  
  #### Giải pháp phân cấp
  Vấn đề ở đây là cách phân cấp tường minh nó không hoạt động. Vậy lúc nào thì phân cấp sẽ tốt?
  
  Nếu bạn nhìn vào thế giới thực, bạn sẽ thấy độc quyền (hoặc sở hữu độc quyền) ở mọi nơi.
  
  Thứ mà bạn không tìm thấy là phân cấp theo kiểu phân minh. Mô hình hướng đối tượng được xác định dựa trên thế giới thực, với vô số các đối tượng. Nhưng sau đó nó lại sử dụng môt mô hình hỏng, đó là phân cấp tường minh. 
  
  Nhưng thế giới lại đầy rẫy phân cấp theo kiểu độc quyền. Một ví dụ chính là tất của bạn. Chúng nằm trong ngăn kéo đựng tất, ngăn này nằm trong tủ quần áo ở phòng ngủ của bạn.
  
  Thư mục trên ổ cứng là ví dụ khác của phân cấp độc quyền. Chúng chứa file.
  
  Vậy ta phân loại chúng như thế nào?
  
  Ở trên tôi có nói về *Company* và *Document*, nó không quan trọng đặt chúng ở đâu. Tôi có thể đặt trong thư mục *Document* hoặc thư mục gọi là *Stuff*.
  
  Cách tôi phân loại là sử dụng *tag*. Tôi gắn file với các thẻ sau:
  
  ```
  Document
Company
Handbook
```

*Tag* không có thứ tự hay cấp bậc, nên nó giải quyết được vấn đề về đa hình.

Nó tương tự như *interface* vì bạn có thể có nhiều loại được liên kết với tài liệu.

### II. Đóng gói
Mới nhìn thì đóng gói xuất hiện như lợi ích thứ 2 của lập trình hướng đối tượng.

Biến được bảo vệ khỏi truy xuất từ bên ngoài, ta sẽ không còn phải lo lắng về những biến toàn cục được truy xuất bởi bất kỳ ai.

Đóng gói là giải pháp an toàn cho biến, cho đến khi ...

#### Vấn đề về tham chiếu
Đối tượng được truyền vào function không phải bằng giá trị mà bằng tham chiếu, tức là function sẽ không truyền đối tượng, mà truyền tham chiếu đến đối tượng đó.

Nếu đối tượng được truyền bằng tham chiếu đến một constructor, constructor có thể gán tham chiếu đó cho một biến private.

Nhưng đối tượng được truyền đến thì không được đảm bảo an toàn.

Bởi vì đâu đó trong code có tham chiếu đến đối tượng này.

#### Giải pháp tham chiếu
Constructor phải *clone* đối tượng được truyền đến, và phải là *deep clone*.

Thậm chí không phải mọi đối tượng có thể *clone*.

Và mọi ngôn ngữ lập trình hướng đối tượng chính đều có vấn đề này.

### III. Đa hình
Đa hình thực ra chỉ xem như là đứa con rơi của mô hình hướng đối tượng.

Không phải nó không hay, mà thực ra bạn không cần ngôn ngữ hướng đối tượng mới làm được.

*Interface* có thể cho bạn điều đó, và với *interface* thì không giới hạn số lượng hành vi bạn có thể thêm vào đối tượng.


### IV. Lời kết
Thực ra, hướng đối tượng rất hứa hẹn ở những ngày đầu. Và những hứa hẹn này vẫn được truyền cho các thể hệ lập trình sau này.

Tôi phải mất hàng năm trời để nhận ra hướng đối tượng đã lừa dối tôi như thế nào.

Tạm biệt, lập trình hướng đối tượng.

Tham khảo: https://medium.com/@cscalfani/goodbye-object-oriented-programming-a59cda4c0e53