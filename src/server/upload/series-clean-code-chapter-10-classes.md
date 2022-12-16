# 1. Class Organization (Tổ chức của Class)
Theo quy ước, Class nên bắt đầu với một danh sách các biến (variables). Hằng số tĩnh công khai (public static constants) nếu có nên để đầu tiên. Sau đó đến các biến tĩnh riêng tư (private static variables). Hiếm khi có một lý do tốt để đặt biến công khai (public variable).

Public functions nên được thực hiện theo danh sách các biến. Đặt các tiện ích riêng tư được gọi bởi một public function đặt ngay sau public function đó. Điều này tuân theo quy tắc Stepdown và giúp chương trình được đọc như một bài báo.
* **Encapsulation**

Chúng tôi muốn giữ các biến và các chức năng tiện ích ở chế độ private, những cũng không nên cuồng tin quá về nó. Đôi khi chúng tôi giữ một biến hoặc chức năng tiện ích ở chế độ protected, do đó nó có thể được truy cập bởi một test. Đối với chúng tôi, test là nguyên tắc. Nếu một test ở trong cùng một package cần gọi một hàm hoặc truy cập vào một biến, chúng tôi sẽ để nó dạng protected hoặc package scope. Tuy nhiên, điều đầu tiên chúng ta làm là tìm kiếm một cách để duy trì sự riêng tư. Nới lỏng tính bao gói luôn là một cách thức cuối cùng.

=> List of variables: public static constants - private static variable - (public variable)

# 2. Classes Should Be Small
*Nguyên tắc đầu tiên, các class nên được làm nhỏ.*

*Nguyên tắc thứ hai, các class nên được làm nhỏ hơn nữa.*

Không, chúng ta sẽ không lặp lại chính xác những gì ở trong Chương *Functions*. Nhưng, cũng như *Functions*, nhỏ hơn là nguyên tắc đầu tiên khi nói đến thiết kế *classes*. Như *Functions*, câu hỏi trực tiếp được đặt ra luôn là "Nhỏ như thế nào?"

Với *Functions*, chúng ta đo lường bằng các đếm số dòng. Với Classes, chúng ta đo bằng cách khác, chúng ta đếm trách nhiệm.

Ví dụ về một *class*, SuperDashboard, với khoảng 70 public methods. Hầu hết các developer đều cho rằng nó có một siêu kích thước. Một số khác cho rằng nó như một "God class".

Tiếp theo cũng là SuperDashboard, nhưng chỉ chứa các phương pháp:
```java
public class SuperDashboard extends JFrame implements MetaDataUser
   public Component getLastFocusedComponent()
   public void setLastFocused(Component lastFocused)
   public int getMajorVersionNumber()
   public int getMinorVersionNumber()
   public int getBuildNumber()
}
```
Năm methods không phải là nhiều đúng không? Trong trường hợp này có thể xem như là vậy, nhưng mặc dù số lượng method nhỏ, tuy nhiên SuperDashboard lại có nhiều trách nhiệm.

Tên class nên mô tả trách nhiệm những gì mà nó đáp ứng. Thực tế, việc đặt tên có lẽ là cách đầu tiên giúp xác định quy mô của một lớp. Nếu chúng ta không thể lấy được một cái tên ngắn gọn cho lớp, sau đó nó có khả năng là class quá lớn. Với một cái tên mơ hồ cho class, nhiều khả năng là nó đã chịu nhiều trách nhiệm.

Chúng ta có thể viết mô tả ngắn gọn cho class với khoảng 25 từ, mà không sử dụng những từ ngữ như "nếu", "và", "hoặc" hay "nhưng".

* **The Single Responsibility Principle**

Một *class* hoặc *module* *nên có một và chỉ một lý do để thay đổi*. Nguyên tắc này cho chúng ta một định nghĩa của trách nhiệm và cả chủ trương về quy mô của class. Class nên có một trách nhiệm - một lý do duy nhất để thay đổi.

Ví dụ ở trên thì class *SuperDashboard* có hai lý do để thay đổi. Đầu tiên, nó theo dõi thông tin các verson và dường như cần phải cập nhật mỗi khi phần mềm được vận chuyển. Thứ hai, nó quản lý thành phần Java Swing (một dẫn xuất của JFrame, Swing đại diện của một giao diện window ở cấp cao). Không nghi ngờ khi chúng ta sẽ cập nhật version number nếu chúng ta thay đổi bất cứ gì ở trong Swing code, nhưng theo chiều ngược lại thì không nhất thiết là đúng: chúng ta có thể thay đổi thông tin version dựa trên sự thay đổi code chỗ khác ở trên hệ thống.

Cố gắng đồng nhất trách nhiệm thường giúp chúng ta nhìn nhận được và tạo ra sự trừu tượng hóa tốt hơn trong code. Chúng ta dễ dàng  lấy ra 3 method trong SuperDashboard phân phối thông tin của version để tách ra một class tên là *Version*. Lớp này có tiềm năng để sử dụng lại ở trong các ứng dụng khác!

```java
public class Version {
   public int getMajorVersionNumber()
   public int getMinorVersionNumber()
   public int getBuildNumber()
}
```

SRP là một trong những khái niệm quan trọng trong việc thiết kế hướng đối tượng. Nó cũng là một khái niệm đơn giản để hiểu và tuân thủ. Tuy nhiên, khó đỡ là SRP lại là nguyên tắc thường bị sỉ nhục nhất :)) Chúng tôi thường gặp phải những class mà làm quá nhiều thứ. Tại sao?

Để phần mềm chạy được và làm cho phần mềm sạch sẽ là hai việc hoàn toàn khác nhau. Hầu hết chúng ta đều bị giới hạn trong đầu là ưu tiên việc làm cho code chúng ta chạy được hơn là tổ chức và làm cho nó sạch sẽ. Điều này hoàn toàn phù hợp. Việc duy trì tách rời các quan hệ chỉ quan trọng khi chương trình của chúng ta hoạt động.

Vấn đề ở đây là có quá nhiều người trong chúng ta nghĩ rằng chúng ta chỉ đang thực hiện để chương trình hoạt động xong sau một lần. Chúng ta thất bại trong việc tổ chức lại và dọn dẹp chúng. Chúng ta chuyển sang các vấn đề khác hơn là trở lại và phá vỡ các lớp để nhồi nhét theo nguyên tắc mỗi class nên chịu một trách nhiệm duy nhất.

Đồng thời, nhiều developer lo ngại rằng một lượng lớn các class nhỏ với mục đích duy nhất sẽ làm khó khăn trong việc hiểu bức tranh tổng quát lớn. Họ lo lắng cho việc phải đi từ lớp này đến lớp khác để hiểu làm thế nào một mảnh lớn của công việc được hoàn thành.

Tuy nhiên hệ thống với nhiều class nhỏ cũng không di chuyển nhiều hơn so với ít class lớn là bao. Nó cũng nhiều như khi đọc hiểu một hệ thống với ít class lớn. Vậy nên câu hỏi ở đây là: Bạn muốn công cụ của bạn với nhiều ngăn kéo nhỏ, mỗi ngăn từng thành phần với khái niệm và nhãn hiệu riêng? Hay bạn muốn một ngăn kéo và tống khứ tất cả mọi thứ vào đó

Mỗi hệ thống lớn sẽ chứa đựng một số lượng lớn logic và độ phức tạp. Mục tiêu chính trong việc quản lý độ phức tạp như vậy là để tổ chức nó sao cho developer biết nơi để tìm thấy mọi thứ và chỉ cần hiểu được độ phức tạp của vấn đề cần tìm hiểu một cách tức thì. Ngược lại, một hệ thống với các class lớn và chứa đựng nhiều mục đích luôn cản trở chúng ta bằng cách cố bắt chúng ta lội qua rất nhiều thứ mà không nhất thiết cần phải biết ngay bây giờ.

*=> Chúng tôi muốn hệ thống của chúng tôi hình thành bởi nhiều class nhỏ, không phải ít class nhưng to lớn. Mỗi class nhỏ tóm gọn bởi một trách nhiệm duy nhất, chỉ có một lý do duy nhất để thay đổi, tương tác với một vài đối tượng khác để đạt được trạng thái mà hệ thống muốn có.*
* **Cohesion**

Class nên có số lượng biến ít. Mỗi phương thức của một class nên thao tác với một hoặc nhiều biến đó. Mỗi biến ở trong class được sử dụng bởi mỗi phương thức nên có sự kết dính tối đa.

```java
public class Stack {
   private int topOfStack = 0;
   List<Integer> elements = new LinkedList<Integer>();

   public int size() {
      return topOfStack;
   }

   public void push(int element) {
      topOfStack++;
      elements.add(element);
   }

   public int pop() throws PoppedWhenEmpty {
      if (topOfStack == 0)
         throw new PoppedWhenEmpty();
      int element = elements.get(--topOfStack);
      elements.remove(topOfStack);
      return element;
   }
}
```

Sự kết dính tối đa ở đây là các phương thức và các biến của class cùng phụ thuộc và có sự gắn kết với nhau như một tổng thể hợp lý.

*Nói một cách đơn giản thì class nên hạn chế số lượng biến, và các method ở trong class đều sử dụng ít nhất một biến trong số này để gia tăng sự kết dính.*

**Maintaining Cohesion Results in Many Small Classes**

Nếu chia function lớn thành nhiều function nhỏ hơn thì điều này đồng thời cùng làm gia tăng kích thước class. Giả sử rằng, function lớn với nhiều biến được khai báo ở trong nó. Bạn muốn trích một hàm nhỏ hơn thì hàm đó ra. Tuy nhiên code của bạn muốn sử dụng 4 biến được khai báo ở trong hàm. Bạn có cần phải pass cả 4 biến đó vào hàm mới như một tham số không?

Not at all! Nếu chúng ta để 4 biến đó vào biến chung của class, sau đó chúng ta có thể trích xuất code mà không cần pass bất kỳ biến nào ở đó. Nó thật dễ dàng để chia function ra thành các mảnh nhỏ.

Không may thay, điều đó làm cho class không còn được kết dính chặt chẽ nữa, bởi vì chúng ta càng ngày càng chất đống biến vào class trong khi chỉ một vài chức năng cần chia sẻ chúng.

Vậy nên, nếu một vài function muốn chia sẻ một số biến nhất định, tại sao chúng ta không tạo một class cho riêng chúng? Điều đó là tất nhiên, *nếu class đã mất đi đoàn kết, hãy chia rẽ nó!*
# 3. Organizing for Change
Đối với mọi hệ thống, sự thay đổi là liên tục. Mỗi sự thay đổi đều dẫn đến rủi ro về phần còn lại của hệ thống không còn hoạt động như dự định. Trong một hệ thống sạch, chúng ta tổ chức các class để làm giảm nguy cơ của sự thay đổi.

Ví dụ: Class Sql - Vi phạm SRP

```java
public class Sql {
   public Sql(String table, Column[] columns)
   public String create()
   public String insert(Object[] fields)
   public String selectAll()
   public String findByKey(String keyColumn, String keyValue)
   public String select(Column column, String pattern)
   public String select(Criteria criteria)
   public String preparedInsert()
   private String columnList(Column[] columns)
   private String valuesList(Object[] fields, final Column[] columns)
   private String selectWithCriteria(String criteria)
   private String placeholderList(Column[] columns)
}
```

Sửa lại:

```java
abstract public class Sql {
   public Sql(String table, Column[] columns)
   abstract public String generate();
}

public class CreateSql extends Sql {
   public CreateSql(String table, Column[] columns)
   @Override public String generate()
}

public class SelectSql extends Sql {
   public SelectSql(String table, Column[] columns)
   @Override public String generate()
}

public class InsertSql extends Sql {
   public InsertSql(String table, Column[] columns, Object[] fields)
   @Override public String generate()
   private String valuesList(Object[] fields, final Column[] columns)
}

public class SelectWithCriteriaSql extends Sql {
   public SelectWithCriteriaSql(
      String table, Column[] columns, Criteria criteria)
   @Override public String generate()
}

public class SelectWithMatchSql extends Sql {
   public SelectWithMatchSql(
      String table, Column[] columns, Column column, String pattern)
   @Override public String generate()
}

public class FindByKeySql extends Sql
   public FindByKeySql(
      String table, Column[] columns, String keyColumn, String keyValue)
   @Override public String generate()
}

public class PreparedInsertSql extends Sql {
   public PreparedInsertSql(String table, Column[] columns)
   @Override public String generate() {
   private String placeholderList(Column[] columns)
}

public class Where {
   public Where(String criteria)
   public String generate()
}

public class ColumnList {
   public ColumnList(Column[] columns)
   public String generate()
}
```

*=> Chúng tôi cấu trúc hệ thống của chúng tôi rác rưởi càng ít càng tốt khi chúng tôi cập nhật chúng với tính năng mới hay thay đổi tính năng. Trong một hệ thống lý tưởng, chúng tôi kết hợp tính năng mới bằng cách mở rộng hệ thống chứ không phải thay đổi code của hiện tại.*
* **Isolating from Change (Loose Coupling - Dependency Invertion Principle)**

Nhu cầu sẽ thay đổi, vậy nên code sẽ luôn thay đổi. Trong một class cụ thể, chứa những chi tiết hiện thực (code), các class trừu tượng cùng với đó là đại diện cho khái niệm. Một client class phụ thuộc vào một chi tiết cụ thể là nguy cơ khi những chi tiết thay đổi. Chúng ta có thể thông qua các interface và abstract class để giúp cho việc cách lý việc va chạm với các chi tiết đó.

Phụ thuộc vào một chi tiết cụ thể tạo ra những thách thức cho việc kiểm thử hệ thống.

Ví dụ: C*húng ta xây dựng một class Portfolio và nó phụ thuộc vào TokyoStockExchange API ở bên ngoài để lấy được giá trị của danh mục đầu tư. Test case sẽ bị tác động bởi sự biến động của một tra cứu như vậy. Nó rất khó để viết test khi câu trả lời của chúng ta sẽ khác đi chỉ sau 5 phút.*

Thay vì thiết kế Portfolio để nó phụ thuộc trực tiếp vào TokyoStockExchange, chúng ta tạo một interface, StockExchange, và khai báo một method duy nhất:

```java
public interface StockExchange {
   Money currentPrice(String symbol);
}

public Portfolio {
   private StockExchange exchange;
   public Portfolio(StockExchange exchange) {
      this.exchange = exchange;
   }
   // ...
}
```

Bây giờ test của chúng ta có thể thực hiện trên StockExchange interface giả lập cho TokyoStockExchange.

Nếu một hệ thống được tách rời, nó sẽ linh hoạt hơn và thúc đẩy việc tái sử dụng. Hạn chế coupling nghĩa là các yếu tố trong hệ thống đang bị cô lập từ những yếu tố khác và từ những sự thay đổi. Sự cô lập làm cho mỗi thành phần trong hệ thống trở nên dễ hiểu hơn.

*Nguồn: alantrungnguyen, tapchilaptrinh*