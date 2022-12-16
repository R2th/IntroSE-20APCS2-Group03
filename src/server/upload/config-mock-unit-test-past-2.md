## 1. when and thenReturn
Mock có thể trả về những giá gía trị khác nhau tùy thuộc vào những tham số mà bạn truyển vào trong method. When and Then Return là chuỗi method đc sử dụng để chỉ định giá trị trả về cho một lời gọi method với các tham sỗ đã được xác định trc   
![](https://images.viblo.asia/41d7a74b-0f57-45df-b2e9-8f49c05f6e4c.png)

**Example** 
```javascript
      @Test
public void test1()  {
        //  create mock
        MyClass test = mock(MyClass.class);

        // define return value for method getUniqueId()
        when(test.getUniqueId()).thenReturn(43);

        // use mock in test....
        assertEquals(test.getUniqueId(), 43);
}


// demonstrates the return of multiple values
@Test
public void testMoreThanOneReturnValue()  {
        Iterator<String> i= mock(Iterator.class);
        when(i.next()).thenReturn("Mockito").thenReturn("rocks");
        String result= i.next()+" "+i.next();
        //assert
        assertEquals("Mockito rocks", result);
}

// this test demonstrates how to return values based on the input
@Test
public void testReturnValueDependentOnMethodParameter()  {
        Comparable<String> c= mock(Comparable.class);
        when(c.compareTo("Mockito")).thenReturn(1);
        when(c.compareTo("Eclipse")).thenReturn(2);
        //assert
        assertEquals(1, c.compareTo("Mockito"));
}

// this test demonstrates how to return values independent of the input value

@Test
public void testReturnValueInDependentOnMethodParameter()  {
        Comparable<Integer> c= mock(Comparable.class);
        when(c.compareTo(anyInt())).thenReturn(-1);
        //assert
        assertEquals(-1, c.compareTo(9));
}

// return a value based on the type of the provide parameter

@Test
public void testReturnValueInDependentOnMethodParameter2()  {
        Comparable<Todo> c= mock(Comparable.class);
        when(c.compareTo(isA(Todo.class))).thenReturn(0);
        //assert
        assertEquals(0, c.compareTo(new Todo(1)));
}


When and then Return có thể throw một exeption 

Properties properties = mock(Properties.class);

when(properties.get(”Anddroid”)).thenThrow(new IllegalArgumentException(...));

try {
    properties.get(”Anddroid”);
    fail(”Anddroid is misspelled”);
} catch (IllegalArgumentException ex) {
    // good!
}  
    
```
 Chuỗi method When and ThenReturn có thể trả về một exeption  
 **Example**
 ```javascript
Properties properties = mock(Properties.class);

when(properties.get(”Anddroid”)).thenThrow(new IllegalArgumentException(...));

try {
    properties.get(”Anddroid”);
    fail(”Anddroid is misspelled”);
} catch (IllegalArgumentException ex) {
    // good!
}
```
## 2. “doReturn When” and “doThrow When”
doReturn()..When() tương tự với when() .. thenReturn(). Nó rất hữu ích trong việc tạo ra các mock method để tạo ra ngoại lệ trong suốt quá trình test
**Example**
```javascript
Properties properties = new Properties();

Properties spyProperties = spy(properties);

doReturn(“42”).when(spyProperties).get(”shoeSize”);

String value = spyProperties.get(”shoeSize”);

assertEquals(”42”, value);
```
doThrow được sử dụng để trả về một exeption.   
**Example**
```javascript
Properties properties = new Properties();

Properties spyProperties = spy(properties);

doReturn(“42”).when(spyProperties).get(”shoeSize”);

String value = spyProperties.get(”shoeSize”);

assertEquals(”42”, value);
```

## 3. Gói một đối tượng Java với Spy
@Spy hoặc spy() method có thể đc sử dụng để gói một đối tượng thực (real object)   
**Example**
```javascript
var s = 'Syntax Highlighting';
```import static org.mockito.Mockito.*;

@Test
public void testLinkedListSpyWrong() {
    // Lets mock a LinkedList
    List<String> list = new LinkedList<>();
    List<String> spy = spy(list);

    // this does not work
    // real method is called so spy.get(0)
    // throws IndexOutOfBoundsException (list is still empty)
    when(spy.get(0)).thenReturn("foo");

    assertEquals("foo", spy.get(0));
}

@Test
public void testLinkedListSpyCorrect() {
    // Lets mock a LinkedList
    List<String> list = new LinkedList<>();
    List<String> spy = spy(list);

    // You have to use doReturn() for stubbing
    doReturn("foo").when(spy).get(0);

    assertEquals("foo", spy.get(0));
}
```
## 4. Veryfy the call on the mock object 
Mockito theo dõi tất cả các lời gọi method, các tham số của một đối tượng Mock. Sử dụng verify() trên các đối tượng Mock để xác mình rằng các điều kiện đc chỉ định trc đó đã được đáp ứng.   
example 
```javascript
import static org.mockito.Mockito.*;

@Test
public void testVerify()  {
    // create and configure mock
    MyClass test = Mockito.mock(MyClass.class);
    when(test.getUniqueId()).thenReturn(43);


    // call method testing on the mock with parameter 12
    test.testing(12);
    test.getUniqueId();
    test.getUniqueId();


    // now check if method testing was called with the parameter 12
    verify(test).testing(ArgumentMatchers.eq(12));

    // was the method called twice?
    verify(test, times(2)).getUniqueId();

    // other alternatives for verifiying the number of method calls for a method
    verify(test, never()).someMethod("never called");
    verify(test, atLeastOnce()).someMethod("called at least once");
    verify(test, atLeast(2)).someMethod("called at least twice");
    verify(test, times(5)).someMethod("called five times");
    verify(test, atMost(3)).someMethod("called at most 3 times");
    // This let's you check that no other methods where called on this object.
    // You call it after you have verified the expected method calls.
    verifyNoMoreInteractions(test);
}
```
## 5. Sử dụng @InjectMock để tạo sự phụ thuộc thông qua Mockito
Annotation @InjectMock thực thi các constructor, method, các field  phụ thuộc vào type của nó   
example
```javascript
public class ArticleManager {
    private User user;
    private ArticleDatabase database;

    public ArticleManager(User user, ArticleDatabase database) {
        super();
        this.user = user;
        this.database = database;
    }

    public void initialize() {
        database.addListener(new ArticleListener());
    }
}
```

class trên đc xây dựng thông qua Mockito và các phụ thuộc của nó đc thể hiện bằng các đối tượng Mock 
example
```javascript
@RunWith(MockitoJUnitRunner.class)
public class ArticleManagerTest  {

       @Mock ArticleCalculator calculator;
       @Mock ArticleDatabase database;
       @Mock User user;

       @Spy private UserProvider userProvider = new ConsumerUserProvider();

       @InjectMocks private ArticleManager manager; 

       @Test public void shouldDoSomething() {
           // calls addListener with an instance of ArticleListener
           manager.initialize();

           // validate that addListener was called
           verify(database).addListener(any(ArticleListener.class));
       }
}

```
Mockito có thể inject một đốii tượng bằng cách Inject constructor, setter hoặc các property.
## 6. Tài liệu tham khảo 
https://www.vogella.com/tutorials/Mockito/article.html