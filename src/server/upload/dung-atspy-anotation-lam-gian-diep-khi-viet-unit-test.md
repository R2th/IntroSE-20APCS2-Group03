# 1. Khái niệm và vai trò của unit test
 - Cụm từ unit test không còn quá xa lại với những ai làm code. Nó là một mức kiểm thử nhỏ nhất trong kiểm thử phần mềm. Nó dùng để kiểm thử cho các hàm (function), lớp (class)
 - Unit test nhằm kiểm tra mã nguồn , được các coder thực hiện. Nó giúp cho mã nguồn được đảm bảo hơn, chạy đúng logic như đề ra .Nó nắm vai trò quan trọng , là bước đầu tiên để đảm bảo chất lượng sản phẩm phần mềm. Ngoài việc đảm bảo hơn cho việc mã nguồn chạy đúng logic, unit test cũng khiến cho source dễ dàng được mở rộng, giảm thiểu sai sót khi thực thi mở rộng, sửa đổi mã nguồn. Kèm theo đó là khi viết unit test, những coder một lần nữa nắm chắc hơn logic nghiệp vụ. Điều này rất quan trọng vì nếu code không theo logic nghiệp vụ thì nó không có ý hay giá trị. 
# 2. Phân biệt @Spy và @Mock 
Ở phần mình có khái quát lại về unit test. Ở phần này mình sẽ phần biệt @Spy và @Mock 
Thường thì bạn đã nghe các nhà phát triển làm thế nào để gián điệp và giả định trong Mockito trong thử nghiệm đơn vị nhưng sự khác biệt giữa gián điệp (spy)  và giả(mock ) trong API Mockito là gì? Cả hai có thể được sử dụng để mô phỏng các phương thức hoặc các trường. Sự khác biệt là trong giả, bạn đang tạo ra một đối tượng giả hoặc giả hoàn toàn trong khi làm gián điệp, có đối tượng thật và bạn chỉ làm gián điệp hoặc khai thác các phương thức cụ thể của nó.

Khi sử dụng các đối tượng giả (mock) , hành vi mặc định của phương thức khi không còn sơ khai là không làm gì cả . Phương tiện đơn giản, nếu là phương thức void, thì nó sẽ không làm gì khi bạn gọi phương thức hoặc nếu phương thức đó có trả về thì nó có thể trả về null, rỗng hoặc giá trị mặc định.

Trong khi trong các đối tượng gián điệp (spy) , hiển nhiên vì nó là một phương thức thực sự, khi bạn không khai thác phương thức đó, thì nó sẽ gọi hành vi của phương thức thực sự và thi hành nó. Nhưng điều đặc biệt ở đây khi bạn muốn thay đổi, bạn có thể giả tạo nó.
Hãy xem ví dụ dưới đây !
```
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.runners.MockitoJUnitRunner;
 
import java.util.ArrayList;
import java.util.List;
 
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
 
@RunWith(MockitoJUnitRunner.class)
public class MockSpy {
 
    @Mock
    private List<String> mockList;
 
    @Spy
    private List<String> spyList = new ArrayList();
 
    @Test
    public void testMockList() {
        //bởi mạc định gọi phướng thức mock sẽ không thực hiện gì cả
        mockList.add("test");
        assertNull(mockList.get(0));
    }
 
    @Test
    public void testSpyList() {
        //đối tưởng gián điệp (spy object)  sẽ gọi một phương thức thật theo logic của nó
        spyList.add("test");
        assertEquals("test", spyList.get(0));
    }
 
    @Test
    public void testMockWithStub() {
        // thay đổi kết quả của phương thức gián điệp, như ta làm với mock
        String expected = "Mock 100";
        when(mockList.get(100)).thenReturn(expected);
 
        assertEquals(expected, mockList.get(100));
    }
 
    @Test
    public void testSpyWithStub() {
        //stubbing a spy method will result the same as the mock object
        String expected = "Spy 100";
        //take note of using doReturn instead of when
        doReturn(expected).when(spyList).get(100);
 
        assertEquals(expected, spyList.get(100));
    }
}
```
 Vậy khi nào chúng ta dùng @Spy , điều này mình sẽ trình bày ở mục 3
# 3. Khi nào dùng @Spy
Khi viết code chúng ta sẽ cố gắng làm sao để có thể viết được unit test. Như cách chúng ta vẫn hay làm là chia nhỏ thành các tầng , các serivce nhỏ, sau đó là inject vào các service. 
Khi đó chúng ta thường sử dụng @Mock để khởi tạo cho các đối tượng phụ thuộc nhằm mục đính tách biệt logic giữa các tầng, tập trung vào các logic chính của tầng chúng ta đang viết. <br>Lúc này chúng ta dùng mock để tạo ra các đối tượng giả, như đã nói ở trên chỉ cần quan tâm đến đầu vào (input) và tự giả sử đầu gia (output) mà không cần quan tâm đến logic của các hàm bên trong. 
Nhưng đôi khi , chúng ta test phương thức của lớp này có sử dụng phương thức của lớp kia, chúng ta muốn test cả logic ở phương thức kia. Khi đó chúng ta có thể dùng @Spy để làm gián điệp để test các dịch vụ (logic ) cần đó, và loại bỏ những dịch vụ (logic) không cần thiết.
Một trường hợp nữa là, khi chúng ta sử dụng phương thức này để gọi chính một phướng thức của trong lớp đó. Chúng ta muốn loại bỏ logic của phương thức được gọi bên trong vì chúng ta có thể đã thực hiện bức test nào đó trước hay muốn tập trung vào logic khác trong phương thức đang được test thì chúng ta dùng @Spy. Ở đây chúng ta không dùng mock được vì nó sẽ bỏ qua tất cả, cả logic của ta cần test.

# 4. Kết luận
Như vậy qua bài này mình đã khái quát lại về unit test , vai trò của nó. GIúp các bạn phân biệt rõ hơn @Spy và @Mock cũng như khi nào chúng ta dùng @Spy. Khi vọng bài viết này sẽ giúp ích được các bạn trong khi viết unit test. 
Tài liệu tham khảo :  https://javapointers.com/java/unit-test/difference-between-spy-and-mock-in-mockito/#:~:text=The%20difference%20is%20that%20in,not%20stub%20is%20do%20nothing.