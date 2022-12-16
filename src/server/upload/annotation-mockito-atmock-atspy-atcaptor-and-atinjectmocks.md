# 1. Overview
Nếu bạn từng dùng Mockito để unit testing trong Android nhưng còn chưa hiểu rõ về các annotation của nó thì bài viết này dành cho bạn rồi.
Trong bài viết này mình sẽ trình bày về những annotations của thư viện Mockito : *&#64;Mock, &#64;Spy, &#64;Captor, và &#64;InjectMocks.*
# 2. Enable Mockito Annotations
Trước tiên - hãy xem cách cho phép sử dụng annotation với Mockito tests.
Để cho phép sử dụng những Annotation này, chúng ta cần chú thích test JUnit với một Runner - MockitoJUnitRunner như trong ví dụ sau:
```java
@RunWith(MockitoJUnitRunner.class)
public class MockitoAnnotationTest {
    ...
}
```
Ngoài ra, chúng ta cũng có thể kích hoạt các chú thích này theo cách khác, bằng cách gọi MockitoAnnotations.initMocks () như trong ví dụ sau:
```java
@Before
public void init() {
    MockitoAnnotations.initMocks(this);
}
```
# 3. &#64;Mock Annotation
Chú thích được sử dụng rộng rãi nhất trong Mockito là &#64;Mock. Chúng ta có thể sử dụng &#64;Mock để tạo và inject (tiêm) các trường hợp giả mà không cần phải gọi Mockito.mock theo cách thủ công.

Trong ví dụ sau - chúng ta sẽ tạo một ArrayList giả định theo cách thủ công mà không cần sử dụng chú thích @Mock.
```java
@Test
public void whenNotUseMockAnnotation_thenCorrect() {
    List mockList = Mockito.mock(ArrayList.class);
     
    mockList.add("one");
    Mockito.verify(mockList).add("one");
    assertEquals(0, mockList.size());
 
    Mockito.when(mockList.size()).thenReturn(100);
    assertEquals(100, mockList.size());
}
```
Và bây giờ chúng ta sẽ làm tương tự nhưng chúng ta sẽ inject các giả định bằng cách sử dụng chú thích @Mock:
```java
@Mock
List<String> mockedList;
 
@Test
public void whenUseMockAnnotation_thenMockIsInjected() {
    mockedList.add("one");
    Mockito.verify(mockedList).add("one");
    assertEquals(0, mockedList.size());
 
    Mockito.when(mockedList.size()).thenReturn(100);
    assertEquals(100, mockedList.size());
}
```
Trong hai ví dụ trên chúng ta đều đang tương tác với các giả định (mock) và xác minh bằng Mockito.verify chỉ để chắc chắn rằng nó hoạt động chính xác.
> Mock object (MO) là một đối tượng ảo mô phỏng các tính chất và hành vi giống hệt như đối tượng thực được truyền vào bên trong khối mã đang vận hành nhằm kiểm tra tính đúng đắn của các hoạt động bên trong.
> 
# 4. &#64;Spy Annotation
Bây giờ - hãy xem cách sử dụng chú thích @Spy để theo dõi một trường hợp hiện có.
Trong ví dụ sau - chúng ta tạo một spy của List theo cách cũ mà không sử dụng chú thích @Spy:
```java
@Test
public void whenNotUseSpyAnnotation_thenCorrect() {
    List<String> spyList = Mockito.spy(new ArrayList<String>());
     
    spyList.add("one");
    spyList.add("two");
 
    Mockito.verify(spyList).add("one");
    Mockito.verify(spyList).add("two");
 
    assertEquals(2, spyList.size());
 
    Mockito.doReturn(100).when(spyList).size();
    assertEquals(100, spyList.size());
}
```
Bây giờ chúng ta hãy làm tương tự - spy trong List - nhưng làm như vậy bằng cách sử dụng chú thích @Spy:
```java
@Spy
List<String> spiedList = new ArrayList<String>();
 
@Test
public void whenUseSpyAnnotation_thenSpyIsInjected() {
    spiedList.add("one");
    spiedList.add("two");
 
    Mockito.verify(spiedList).add("one");
    Mockito.verify(spiedList).add("two");
 
    assertEquals(2, spiedList.size());
 
    Mockito.doReturn(100).when(spiedList).size();
    assertEquals(100, spiedList.size());
}
```
Lưu ý , như trước đây - chúng ta đang tương tác với spy ở đây để đảm bảo rằng nó hoạt động chính xác. Trong ví dụ này, chúng ta:
* Đã sử dụng **real method** spiedList.add () để thêm các phần tử vào spiedList. 
* Stubbed phương thức spiedList.size () để trả về 100 thay vì 2 bằng Mockito.doReturn (ức

> Đối tượng spy là đối tượng bán ảo, hay nói cách khác nó vừa là đối tượng thực, vừa là đối tượng ảo. Vừa là đối tượng thực vì nó hoàn toàn có thể thực hiện các method của một đối tượng thực một cách chính xác, không cần stub trước giá trị để trả về như đối tượng mock. Vừa là đối tượng ảo vì nó có thể thực hiện các câu lệnh của một đối tượng mock.

# 5. &#64;Captor Annotation
Tiếp theo - hãy xem cách sử dụng chú thích @Captor để tạo một instance ArgumentCaptor.

Trong ví dụ sau - chúng ta tạo một ArgumentCaptor theo cách cũ mà không sử dụng chú thích @Captor:
```java 
@Test
public void whenNotUseCaptorAnnotation_thenCorrect() {
    List mockList = Mockito.mock(List.class);
    ArgumentCaptor<String> arg = ArgumentCaptor.forClass(String.class);
 
    mockList.add("one");
    Mockito.verify(mockList).add(arg.capture());
 
    assertEquals("one", arg.getValue());
}
```
Bây giờ chúng ta hãy sử dụng @Captor cho cùng một mục đích - để tạo một instance ArgumentCaptor:
```java
@Mock
List mockedList;
 
@Captor
ArgumentCaptor argCaptor;
 
@Test
public void whenUseCaptorAnnotation_thenTheSam() {
    mockedList.add("one");
    Mockito.verify(mockedList).add(argCaptor.capture());
 
    assertEquals("one", argCaptor.getValue());
```
# 6. &#64;InjectMocks Annotation
Bây giờ - hãy thảo luận về cách sử dụng chú thích @InjectMocks - để tự động đưa các trường giả vào đối tượng được kiểm tra.

Trong ví dụ sau - chúng ta sử dụng @InjectMocks để đưa  wordMap vào MyDipedia dic :
```java
@Mock
Map<String, String> wordMap;
 
@InjectMocks
MyDictionary dic = new MyDictionary();
 
@Test
public void whenUseInjectMocksAnnotation_thenCorrect() {
    Mockito.when(wordMap.get("aWord")).thenReturn("aMeaning");
 
    assertEquals("aMeaning", dic.getMeaning("aWord"));
}
```
Và đây là lớp MyDictionary:
```java 
public class MyDictionary {
    Map<String, String> wordMap;
 
    public MyDictionary() {
        wordMap = new HashMap<String, String>();
    }
    public void add(final String word, final String meaning) {
        wordMap.put(word, meaning);
    }
    public String getMeaning(final String word) {
        return wordMap.get(word);
    }
}
```
# 7. Injecting a Mock into a Spy
Tương tự như thử nghiệm trên, chúng ta có thể muốn inject mock vào một spy:
```java 
@Mock
Map<String, String> wordMap;
 
@Spy
MyDictionary spyDic = new MyDictionary();
```
Tuy nhiên, Mockito không hỗ trợ inject mock vào một spy và các test sau ném ra một exeption:
```java 
@Test
public void whenUseSpyWhichNeedsTheMock_thenCorrect() { 
    Mockito.when(wordMap.get("aWord")).thenReturn("aMeaning"); 
 
    assertEquals("aMeaning", spyDic.getMeaning("aWord")); 
}
```
Nếu chúng ta muốn sử dụng một mock với một spy, chúng ta có thể inject mock thông qua một constructor :
```java
MyDictionary(Map<String, String> wordMap) {
    this.wordMap = wordMap;
}
```
Thay vì sử dụng chú thích, giờ đây chúng ta có thể tạo spy theo cách thủ công: 
```java
@Mock
Map<String, String> wordMap; 
 
MyDictionary spyDic;
 
@Before
public void init() {
    MockitoAnnotations.initMocks(this);
    spyDic = Mockito.spy(new MyDictionary(wordMap));
}
```
Test trên giờ đã pass.
# 8. Running into NPE while using annotation
Thông thường, chúng ta có thể run into NullPointerException khi chúng ta cố gắng thực sự sử dụng instance được chú thích bằng &#64;Mock hoặc &#64;Spy, như trong ví dụ: 
```java
public class NPETest {
 
    @Mock
    List mockedList;
 
    @Test
    public void test() {
        Mockito.when(mockedList.size()).thenReturn(1);
    }
}
```
Hầu hết điều này xảy ra là do chúng ta quên bật các chú thích Mockito đúng cách ha

Vì vậy, chúng ta phải ghi nhớ rằng mỗi lần chúng ta muốn sử dụng các chú thích Mockito, chúng ta phải thực hiện thêm một bước và khởi tạo chúng như phần 2 của bài viết :grinning:.
# 9. Summary
Mong rằng bài viết trên đã giúp bạn hiểu rõ hơn về các annotation trong mockito. :triumph:

Tài liệu tham khảo :
https://www.baeldung.com/mockito-annotations