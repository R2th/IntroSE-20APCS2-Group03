*Cụm từ 'Mock Objects'  trở nên phổ biến khi mô tả những đối tượng đặc thù với mục đích bắt chước/mô phỏng những đối tượng thực trong quá trình kiểm thử. Hầu hết các ngôn ngữ hiện nay đều có những framework hỗ trợ và đơn giản hóa việc tạo mock objects. Tuy nhiên, có một điều thường không được nhận ra - đó là mock objects ngoài là một trong các dạng đối tượng kiểm thử đặc thù, nó còn cho phép việc kiểm thử được thực hiện theo một cách thức khác. Ở bài viết này, tôi sẽ giải thích cơ chế hoạt động của mock objects, làm thế nào để những đối tượng này có thể thúc đẩy quá trình kiểm thử dựa trên việc xác minh hành vi, và cái cách mà người ta sử dụng chúng để phát triển ra một kiểu kiểm thử khác biệt.*

Tôi lần đầu tiếp xúc với cụm từ "mock object" một vài năm về trước trong cộng đồng ExtremeProgramming (XP). Từ đó, tôi bắt gặp mock objects càng ngày càng nhiều hơn. Một phần bởi những lập trình viên đi đầu trong việc sử dụng mock objects chính là cộng sự của tôi ở ThoughtWorks trong nhiều khoảng thời gian. Một phần cũng bởi tôi gặp chúng thường xuyên hơn trong các bài viết về kiểm thử mà bị ảnh hưởng bởi nguyên tắc phát triển XP.

Tuy nhiên, đôi khi tôi thấy mock objects được mô tả khá nghèo nàn. Cụ thể hơn là chúng thường bị nhầm lẫn với stubs - một đối tượng phổ biến khác trong các môi trường kiểm thử. Tôi hiểu sự nhầm lẫn này - đôi khi tôi cũng thấy sự tương tự giữa chúng. Nhưng nhờ vào những cuộc thảo luận với các nhà phát triển ra mock, tôi đã hiểu sâu và rõ bản chất hơn về mock.
Sự khác biệt ở đây thực sự có thể chia thành hai hướng tách biết. Một bên là sự khác biệt về cách mà kết quả kiểm thử được xác minh: phân biệt giữa xác minh trạng thái và xác minh hành vi. Hướng còn lại liên quan đến sự khác nhau trong cách thức kết hợp giữa kiểm thử và thiết kế, điều mà tôi sẽ đề cập ở bài viết này về kiểu truyền thống và kiểu mockist (hướng mock) trong quy trình phát triển hướng kiểm thử.
## Kiểm thử thông thường ##
Tôi sẽ bắt đầu bằng việc mô tả hai kiểu kiểm thử với một ví dụ đơn giản. (Ví dụ được viết bằng ngôn ngữ Java nhưng về mặt nguyên lý thì vẫn đúng với bất cứ ngôn ngữ hướng đối tượng nào khác). Giả sử chúng ta có một đối tượng order và mong muốn lấp đầy order bằng các sản phẩm lấy từ một đối tượng warehouse. Order đơn giản chỉ gồm một loại sản phẩm và cho phép một số lượng nhất định. Warehouse bao gồm nhiều loại sản phẩm khác nhau. Khi chúng ta yêu cầu một order tự lấp đầy sản phẩm trong warehouse thì có hai khả năng xảy ra. Nếu có đủ sản phẩm trong warehouse để lấy, order được lấp đầy và lượng sản phẩm trong warehouse giảm với số lượng tương ứng. Nếu không đủ sản phẩm trong warehouse thì order không được lấp đầy và trạng thái của warehouse là không đổi.

Hai hành vi này ám chỉ một cặp test và có thể được triển khai trong JUnit tests thông thường sau: 
```java
public class OrderStateTester extends TestCase {
  private static String TALISKER = "Talisker";
  private static String HIGHLAND_PARK = "Highland Park";
  private Warehouse warehouse = new WarehouseImpl();

  protected void setUp() throws Exception {
    warehouse.add(TALISKER, 50);
    warehouse.add(HIGHLAND_PARK, 25);
  }
  public void testOrderIsFilledIfEnoughInWarehouse() {
    Order order = new Order(TALISKER, 50);
    order.fill(warehouse);
    assertTrue(order.isFilled());
    assertEquals(0, warehouse.getInventory(TALISKER));
  }
  public void testOrderDoesNotRemoveIfNotEnough() {
    Order order = new Order(TALISKER, 51);
    order.fill(warehouse);
    assertFalse(order.isFilled());
    assertEquals(50, warehouse.getInventory(TALISKER));
  }
```
xUnit tests bao gồm bốn giai đoạn điển hình: setup, exercise, verify, teardown. Trong trường hợp trên, giai đoạn setup được thực hiện một phần ở phương thức setUp (thiết lập warehouse) và một phần ở phương thức test (thiết lập order). Lời gọi hàm `order.fill` thuộc giai đoạn exersise. Đây là nơi mà đối tượng được thúc đẩy làm những thứ mà chúng ta muốn test. Các câu lệnh assert phía dưới thuộc về giai đoạn xác minh, kiểm tra phương thức được thực thi có thực hiện nhiệm vụ chính xác hay không. Trong trường hợp này, giai đoạn teardown không được khai báo tường minh, thay vào đó bộ thu thập dữ liệu rác đã làm việc đó một cách ngầm định.

Trong quá trình thiết lập, có hai loại đối tượng chúng ta đặt chung lại với nhau. Order là class mà chúng ta đang test, nhưng để phương thức `Order.fill` hoạt động thì cần khởi tạo một đối tượng Warehouse. Trong tình huống này, Order là đối tượng mà chúng ta đang tập trung vào test. Những người theo hướng kiểm thử thường sử dụng những cụm từ như đối tượng được test hay hệ thống được test để đặt tên cho những thứ như vậy. Cả hai cụm từ đều rườm rà khi nói, nhưng vì đó là cụm từ được chấp nhận rộng rãi nên tôi sẽ cố gắng sử dụng nó. Theo Meszaros  (Gerard Meszaros  - một trong những người tiên phong của TDD), tôi sẽ sử dụng cụm từ System Under Test, hoặc viết tắt lại là SUT.

Vì vậy đối với việc test này, SUT chính là `Order` và `warehouse` là đối tượng liên kết. Có hai mục đích cho sử dụng warehouse: một là lấy hành vi đã được test để hoàn tất việc thực thi (vì `Order.fill` gọi đến các phương thức của warehouse) và hai là để xác minh (vì một trong những kết quả của lời gọi `Order.fill` là khả năng thay đổi trạng thái của warehouse). Khi tìm hiểu sâu hơn về chủ đề này, sẽ có nhiều phân biệt giữa SUT và đối tượng liên kết.

Kiểu test này sử dụng việc **xác minh trạng thái**: nghĩa là chúng ta xác định phương thức được thực thi có hoạt động chính xác bằng việc kiểm tra trạng thái của SUT và những đối tượng liên kết sau khi phương thức được thực thi. Như chúng ta sẽ thấy, mock objects hỗ trợ một cách tiếp cận khác để xác minh việc này.
## Kiểm thử với Mock Objects ##
Giờ tôi sẽ lấy cùng một hành vi và sử dụng mock objects. Đối với đoạn code này, tôi sẽ sử dụng thư viện jMock để định nghĩa mocks. jMock là một thư việc java cho mock object. Có những thư viện mock object khác nhưng đây là thư viện mới nhất được viết bởi các tác giả của kỹ thuật này, nên sẽ phù hợp để bắt đầu làm quen.
```java
public class OrderInteractionTester extends MockObjectTestCase {
  private static String TALISKER = "Talisker";

  public void testFillingRemovesInventoryIfInStock() {
    //setup - data
    Order order = new Order(TALISKER, 50);
    Mock warehouseMock = new Mock(Warehouse.class);
    
    //setup - expectations
    warehouseMock.expects(once()).method("hasInventory")
      .with(eq(TALISKER),eq(50))
      .will(returnValue(true));
    warehouseMock.expects(once()).method("remove")
      .with(eq(TALISKER), eq(50))
      .after("hasInventory");

    //exercise
    order.fill((Warehouse) warehouseMock.proxy());
    
    //verify
    warehouseMock.verify();
    assertTrue(order.isFilled());
  }

  public void testFillingDoesNotRemoveIfNotEnoughInStock() {
    Order order = new Order(TALISKER, 51);    
    Mock warehouse = mock(Warehouse.class);
      
    warehouse.expects(once()).method("hasInventory")
      .withAnyArguments()
      .will(returnValue(false));

    order.fill((Warehouse) warehouse.proxy());

    assertFalse(order.isFilled());
  }
```
Tập trung trước vào phương thức `testFillingRemovesInventoryIfInStock `, vì ở phương thức test phía dưới đã sử dụng một số rút gọn.

Ngay từ thời điểm bắt đầu, giai đoạn setup đã có sự khác biệt. Giai đoạn này được chia thành hai phần: dữ liệu và các kỳ vọng. Phần dữ liệu thiết lập các đối tượng cần thiết, tương tự việc thiết lập truyền thống. Điểm khác biệt là bên trong những đối tượng được tạo. SUT thì không khác, vẫn là một order. Nhưng đối tượng liên kết lại không phải một đối tượng warehouse, thay vào đó là một mock warehouse - bản chất là một thực thể của class `Mock`.

Phần thứ hai của giai đoạn setup tạo ra các kỳ vọng trên đối tượng mock. Những kỳ vọng này chỉ định những hàm nào sẽ được gọi ở các đối tượng mock khi SUT được thực thi.

Khi tất cả các kỳ vọng được thiết lập, SUT được thực thi. Sau đó, ở giai đoạn xác minh, có hai phương diện xác minh. Xác minh SUT - giống với kiểm thử thông thường. Tuy nhiên, đối tượng mock cũng được xác minh bằng việc kiểm tra chúng có được gọi theo những kỳ vọng đã thiết lập hay không.

Sự khác biệt chính ở đây là cách mà chúng ta xác minh đối tượng order hoạt động chính xác khi tương tác với warehouse. Với việc xác minh trạng thái, chúng ta thực hiện điều này trên trạng thái của warehouse. Trong khi đó, mocks sử dụng **xác minh hành vi**, khi mà kiểm tra order có thực hiện các lời gọi đúng tới warehouse hay không. Chúng ta kiểm tra điều này bằng việc thiết lập các kỳ vọng của trong quá trình setup và nhờ các đối tượng mock thẩm định lại trong giai đoạn xác minh. Chỉ có order là được kiểm tra qua asserts và nếu phương thức không thay đổi trạng thái của order thì sẽ không có asserts nào cả.

Ở phương thức test thứ hai, có hai điểm khác biệt. Đầu tiên, đối tượng mock được khởi tạo theo một cách khác, sử dụng phương thức `mock` của MockObjectTestCase thay vì hàm khởi tạo. Đây là một phương thức rút gọn trong thư viện jMock, có nghĩa là không cần xác minh một cách tường minh, bất cứ mock nào được tạo thông qua phương thức rút gọn này sẽ được tự động xác minh ở cuối của quá trình test. Tôi cũng có thể sử dụng cách này cho test đầu tiên nhưng tôi muốn chỉ ra việc xác minh một cách tường minh hơn để thể hiện việc kiểm thử với các đối tượng mock hoạt động như thế nào.

Điểm khác biệt thứ hai là ở test case sau, tôi đã nới lỏng những ràng buộc trên phép kỳ vọng bằng việc sử dụng `withAnyArguments`. Lý do cho việc này là ở test đầu tiên, các con số đã được truyền vào đối tượng warehouse, vì vậy ở test thứ hai không cần lặp lại việc đó nữa. Nếu logic của order cần được thay đổi về sau, thì chỉ có một test sẽ lỗi, giảm công sức thay đổi tests. Thật ra, cũng có thể không cần gọi `withAnyArguments` vì đó là lời gọi mặc định.

### Sử dụng thư viện EasyMock ###
Có những thư viện mock object khác, EasyMock là một trong số đó. Thư viện này có các phiên bản ở cả Java và .NET. EasyMock cũng cho phép việc xác minh hành vi, nhưng có đôi điểm khác biệt so với jMock đáng để bàn luận. Dưới đây là các phương thức test tương tự sử dụng EasyMock:
```java
public class OrderEasyTester extends TestCase {
  private static String TALISKER = "Talisker";
  
  private MockControl warehouseControl;
  private Warehouse warehouseMock;
  
  public void setUp() {
    warehouseControl = MockControl.createControl(Warehouse.class);
    warehouseMock = (Warehouse) warehouseControl.getMock();    
  }

  public void testFillingRemovesInventoryIfInStock() {
    //setup - data
    Order order = new Order(TALISKER, 50);
    
    //setup - expectations
    warehouseMock.hasInventory(TALISKER, 50);
    warehouseControl.setReturnValue(true);
    warehouseMock.remove(TALISKER, 50);
    warehouseControl.replay();

    //exercise
    order.fill(warehouseMock);
    
    //verify
    warehouseControl.verify();
    assertTrue(order.isFilled());
  }

  public void testFillingDoesNotRemoveIfNotEnoughInStock() {
    Order order = new Order(TALISKER, 51);    

    warehouseMock.hasInventory(TALISKER, 51);
    warehouseControl.setReturnValue(false);
    warehouseControl.replay();

    order.fill((Warehouse) warehouseMock);

    assertFalse(order.isFilled());
    warehouseControl.verify();
  }
}
```
EasyMock sử dụng một metaphor ghi lại/thực hiện lại, cho việc thiết lập các kỳ vọng. Đối với mỗi đối tượng được mock, bạn cần tạo một đối tượng control và đối tượng mock. Đối tượng mock thỏa mãn interface của đối tượng thứ hai, đối tượng control cung cấp các tính năng bổ sung. Để xác định một kỳ vọng khi gọi phương thức, với những đối số mà bạn kỳ vọng trên đối tượng mock. Bạn thực hiện điều này tương tự khi gọi tới đối tượng control nếu muốn một giá trị trả về. Khi đã hoàn tất việc thiết lập kỳ vọng, bạn có thể thực hiện lại trên đối tượng control - tại thời điểm mà mock hoàn thành việc ghi lại và sẵn sàng phản hồi với đối tượng đầu tiên. Khi hoàn thành, bạn có thể thực hiện xác minh trên đối tượng control.

Thoạt đầu, khái niệm metaphor ghi lại/thực hiện lại, có thể khiến mọi người hơi sững sờ, nhưng về sau người ta sẽ quen với việc sử dụng nó. Nó có một điểm lợi so với với jMock là những ràng buộc đang được tạo trên những lời gọi phương thức thực sự trên đối tượng mock thay vì chỉ định tên phương thức ở dạng chuỗi. Điều đó có nghĩa bạn sẽ cần tính năng tự hoàn thiện code của IDE và cần cập nhật lại tests khi có bất cứ thay đổi nào về tên của phương thức. Điểm bất lợi là không thể có những ràng buộc nới lỏng hơn.

Những nhà phát triển của jMock đang trong quá trình tạo ra một phiên bản mới hơn, trong đó sử dụng những kỹ thuật khác cho phép bạn sử dụng các lời gọi phương thức thực sự.
## Sự khác nhau giữa Mocks và Stubs ##
Tại thời điểm chúng được ra đời, nhiều người dễ dàng nhẫm lẫn những đối tượng mock với khái niệm kiểm thử phổ biển sử dụng stubs. Kể từ đó, người ta cũng dần phân biệt tốt hơn giữa hai khái niệm. Tuy nhiên, để hiểu một cách toàn diện việc sử dụng mock, cần hiểu rõ mocks và những loại test double khác (khái niệm "double" sẽ được làm rõ ở phần sau của bài viết).

Khi thực hiện các phép kiểm thử giống như ví dụ ở trên, bạn sẽ tập trung vào một thành tố của phần mềm tại một thời điểm - do đó cụm từ phổ biến để mô tả là unit testing. Vấn đề là để một unit đơn lẻ hoạt động được, bạn sẽ cần những unit khác - như trong ví dụ là cần một warehouse nào đó.

Trong hai kiểu kiểm thử đã trình bày ở trên, trường hợp thứ nhất sử dụng đối tượng warehouse và trường hợp thứ hai sử dụng một mock warehouse, dĩ nhiên không phải là một đối tượng warehouse thực. Sử dụng mock là một cách để không sử dụng warehouse thực trong quá trình test. Tuy nhiên, cũng có những dạng đối tượng mô phỏng khác được sử dụng trong quá trình test có chức năng tương tự.

Các thuật ngữ được nói về những đối tượng này sẽ sớm trở nên lộn xộn - nhưng chung quy lại có thể sử dụng các từ sau: stub, mock, fake, dummy. Các từ này được sử dụng theo cuốn sách của Gerard Meszaros. Không phải ai cũng sử dụng những từ này, nhưng đó là những từ hợp lý và vì trước sau gì cũng phải chọn ra các từ để trình bày trong bài viết này.

Meszaros sử dụng cụm từ **Test Double** như một thuật ngữ chung để chỉ bất kể đối tượng mô phỏng nào được sử dụng để thay thế đối tượng thực với mục đích kiểm thử. Cái tên có nguồn gốc từ khái niệm về một Diễn viên đóng thế (Stunt Double) trong các bộ phim (Một trong những lý do khác của Meszaros là để tránh trùng với bất cứ tên gọi nào khác đã được sử dụng rộng rãi).  Meszaros sau đó định nghĩa năm loại double riêng biệt:

- **Dummy** objects được truyền vào nhưng không bao giờ được sử dụng. Thông thường chúng chỉ được sử dụng để lấp đầy danh sách tham số.
- **Fake** objects thực sự có những đoạn triển khai chạy được, nhưng thường chúng sẽ sử dụng các rút gọn, khiến các đối tượng này không phù hợp với môi trường production (sử dụng in-memory database là một ví dụ điển hình)
- **Stubs** cung cấp kết quả trả về của những lời gọi hàm/phương thức trong quá trình kiểm thử, thường không phản hồi với bất cứ thứ gì khác ngoài những gì đã được lập trình cho việc kiểm thử.
- **Spies** là những stub mà có ghi lại thông tin nào đó dựa trên việc chúng được gọi như thế nào. Một dạng của đối tượng này có thể là một dịch vụ email ghi lại bao nhiêu message đã được gửi đi.
- **Mocks** là những gì chúng ta đang bàn luận ở đây: những đối tượng được lập trình sẵn với các kỳ vọng, tạo nên một đặc tả về các lời gọi mà chúng mong muốn được nhận.

Trong số những kiểu double này, chỉ có mock yêu cầu việc xác minh hành vi. Những double khác có thể, và thường sử dụng việc xác minh trạng thái. Mocks thường thực hiện các hành vi giống như các double khác trong giai đoạn thực thi, vì chúng cần đảm bảo SUT tin rằng nó đang tương tác với một đối tượng liên kết thực - nhưng khác ở giai đoạn thiết lập và giai đoạn xác minh.

Để tìm hiểu test doubles sâu hơn nữa, chúng ta cần mở rộng ví dụ ban đầu. Nhiều người chỉ sử dụng test double nếu việc sử dụng đối tượng thực là khó. Một trường hợp đơn giản cho test double, ví dụ như chúng ta muốn gửi một email thông báo nếu xảy ra lỗi khi lấp đầy một order. Vấn đề là chúng ta không muốn gửi những email thực sự đến khách hàng trong quá trình kiểm thử. Vì vậy, chúng ta tạo ra một test double cho hệ thống email, thứ mà chúng ta có thể xử lý và kiểm soát.

Ở đây, chúng ta có thể bắt đầu thấy sự khác biệt giữa mocks và stubs. Để test cho hành vi gửi mail này, chúng ta có thể sử dụng một stub đơn giản như sau:
```java
public interface MailService {
  public void send (Message msg);
}
public class MailServiceStub implements MailService {
  private List<Message> messages = new ArrayList<Message>();
  public void send (Message msg) {
    messages.add(msg);
  }
  public int numberSent() {
    return messages.size();
  }
}
```
Sử dụng việc xác minh trạng thái trên stub như sau:
```java
class OrderStateTester...

  public void testOrderSendsMailIfUnfilled() {
    Order order = new Order(TALISKER, 51);
    MailServiceStub mailer = new MailServiceStub();
    order.setMailer(mailer);
    order.fill(warehouse);
    assertEquals(1, mailer.numberSent());
  }
```
Dĩ nhiên đây là một phép kiểm thử rất đơn giản - chỉ là một message được gửi đi. Chúng ta chưa kiểm tra được nó có gửi đúng người hay đúng nội dung hay chưa. Tuy nhiên nó sẽ mô tả ý chính ở đây là phân biệt giữa mocks và stubs.
Sử dụng mock, phép test này sẽ trong khá khác biệt.
```java
class OrderInteractionTester...

  public void testOrderSendsMailIfUnfilled() {
    Order order = new Order(TALISKER, 51);
    Mock warehouse = mock(Warehouse.class);
    Mock mailer = mock(MailService.class);
    order.setMailer((MailService) mailer.proxy());

    mailer.expects(once()).method("send");
    warehouse.expects(once()).method("hasInventory")
      .withAnyArguments()
      .will(returnValue(false));

    order.fill((Warehouse) warehouse.proxy());
  }
}
```
Trong cả hai trường hợp, tôi đều sử dụng một test double thay cho một mail service thực. Điểm khác biệt là stub xác minh trạng thái, trong khi mock xác minh hành vi.

Để sử dụng xác minh trạng thái trên stub, tôi cần tạo các phương thức bổ sung trên stub để hỗ trợ việc xác minh. Kết quả là stub triển khai `MailService` nhưng đồng thời cũng thêm vào các phương thức test bổ sung.

Mock objects luôn luôn sử dụng việc xác minh hành vi, một stub cũng có thể đi theo hướng đó. Meszaros định nghĩa stubs mà xác minh hành vi thì được gọi là Test Spy. Sự khác nhau nằm ở cách chính xác mà double chạy và xác minh. Tôi sẽ để độc giả tự khám phám điều này cho riêng mình.
## Kiểm thử truyền thống và kiểm thử hướng mock ##
Giờ là lúc để tìm hiểu về sự phân biệt thứ hai: sự khác nhau giữa TDD (quy trình phát triển hướng kiểm thử ) truyền thống và TDD hướng mock. Vấn đề chính là khi nào thì sử dụng mock (hoặc những double khác).

**TDD truyền thống** sử dụng đối tượng thực ngay khi có thể và sử dụng double nếu việc sử dụng đối tượng thực là khó. Vì vậy, một nhà phát triển TDD truyền thống sẽ sử dụng một warehouse thực và một double cho mail service. Kiểu double nào không thực sự quan trọng ở trường hợp này.

**TDD hướng mock**, ngược lại, luôn luôn sử dụng một đối tượng mock cho bất kể đối tượng nào với hành vi mong muốn. Trong trường hợp này là warehouse và mail service.

Mặc dù nhiều framework mock được thiết kế cho kiểm thử hướng mock về mặt tư tưởng, nhưng nhiều nhà phát triển truyền thống cũng sử dụng chúng để tạo ra các double.

Một nhánh quan trọng của phong cách hướng mock là quy trình phát triển hướng hành vi (BDD - Behavior Driven Development). BDD được phát triển chính thức bởi cộng sự của tôi Daniel Terhorst-North, một kỹ thuật để giúp người ta hiểu hơn về quy trình phát triển hướng kiểm thử bằng việc tập trung vào cách mà TDD hoạt động như một kỹ thuật thiết kế. Điều này dẫn đến việc đổi tên các test theo các hành vi để hiểu hơn về những gì mà một đối tượng cần làm. BDD sử dụng cách tiếp cận hướng mock, nhưng mở rộng hơn, bao gồm cả việc đặt tên và với mục tiêu tích hợp phân tích vào kỹ thuật của mình. Tôi sẽ không đi sâu hơn nữa về điều trên vì thứ liên quan duy nhất đến bài viết này là việc BDD được coi là một biến thể khác của TDD mà sử dụng phép kiểm thử hướng mock.

Đôi khi bạn cũng sẽ thấy từ "Detroit" được sử dụng để ám chỉ cho kiểu truyền thống và "London" cho hướng mock. Điều này có thể được lý giải bởi sự thật rằng XP được phát triển cùng với dự án C3 ở Detroit và hướng mock được phát triển bởi những người áp dụng XP ở London. Một điều cũng nên được đề cập đó là nhiều nhà phát triển TDD hướng mock không thích sử dụng các cụm từ đó, và bất kể thuật ngữ nào ám chỉ sự khác nhau giữa hai kiểu kiểm thử. Họ không coi việc phân biệt rạch ròi giữa hai kiểu kiểm thử là hữu ích.

## ** Lược dịch ** ##

**Martin Fowler**, *Mocks Aren't Stubs*, [https://martinfowler.com/articles/mocksArentStubs.html](https://martinfowler.com/articles/mocksArentStubs.html)