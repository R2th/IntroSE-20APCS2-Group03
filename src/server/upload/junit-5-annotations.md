Trong bài viết này ta cùng tìm hiểu về tất cả các Annotations mà JUnit 5 hỗ trợ. Toàn bộ các Annotations lõi của JUnit 5 đều nằm trong package `org.junit.jupiter.api` thuộc module ` junit-jupiter-api`.

Giờ ta liệt kê toàn bộ danh sách các Annotations mà JUnit 5 hỗ trợ.
+ `@Test`
+ `@ParameterizedTest`
+ `@RepeatedTest`
+ `@TestFactory`
+ `@TestInstance`
+ `@TestTemplate`
+ `@DisplayName`
+ `@BeforeEach`
+ `@AfterEach`
+ `@BeforeAll`
+ `@AfterAll`
+ `@Nested`
+ `@Tag`
+ `@Disabled`
+ `@ExtendWith`
Ta đi tỉm hiểu ý nghĩa từng annotation thông qua ví dụ cụ thể.
## `@Test`
Annotation này biểu thị rằng method này là method test. Không giống với annotation `@Test` trong JUnit 4, anotaion này không chứa bất kì một attribute nào. Từ khi test mở rộng trong JUnit Jupiter hoạt động dựa trên các annotation của riêng nó. Các phương thức như vậy được kế thừa trừ khi nó bị ghi đè.
```
import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
class FirstJUnit5Tests {
    @Test
    void myFirstTest() {
        assertEquals(2, 1 + 1);
    }
}
```
## `@ParameterizedTest`
Annotation này cung cấp một khả năng lặp lại test một số lần xác định một cách đơn giản bằng cách trú thích một method băng annotation `@ParameterizedTest` và xác định tổng số lần lặp lại mong muốn. Mỗi lời gọi của phép lặp test hoạt động giống như việc thực hiện một method test `@Test` thông thường với sự hỗ trợ đầy đủ cho các callbacks và các phần mở rộng vòng đời giống nhau.

Ví dụ sau đây minh họa cách khai báo một method test có tên repeatTest() sẽ được lặp lại tự động 10 lần.
```
@RepeatedTest(10)
void repeatedTest() {
   // ...
}

@RepeatedTest(5)
void repeatedTestWithRepetitionInfo(RepetitionInfo repetitionInfo) {
    assertEquals(5, repetitionInfo.getTotalRepetitions());
}

@RepeatedTest(value = 1, name = "{displayName} {currentRepetition}/{totalRepetitions}")
@DisplayName("Repeat!")
void customDisplayName(TestInfo testInfo) {
    assertEquals(testInfo.getDisplayName(), "Repeat! 1/1");
}
```
## `@DisplayName`
Test class và test method có thể định nghĩa tên hiển thị một cách tùy biến với khoảng trắng, kí tự đặc biệt, và emojis. Tên này sẽ được hiển thị trong test runners và test report.

Tùy biến hiển thị tên class.
```
@DisplayName("MyTestClass")
public class DisplayNameTest {
}
```
Tùy biến hiển thị tên method.
```
@Test
@DisplayName("Example Test Method with No Business Logic")
void test() {
	assertTrue(3 > 0);
}
```
Hiển thị tên method với emojis.
```
@Test
@DisplayName("MyTestMethod ☺")
void test1(TestInfo testInfo) {
	assertEquals("MyTestMethod ☺", testInfo.getDisplayName());
}
```
Giờ tên tùy biến được hiển thị trong test report như sau.
![](https://images.viblo.asia/253b1038-7ca7-46a3-881b-099d0dcefb6d.png)

## `@BeforeEach`
Annotation này biểu thị rằng phương thức được chú thích phải được thực hiện trước mỗi phương thức `@Test`, `@RepeatedTest`, `@ParameterizedTest` hoặc `@TestFactory` trong lớp hiện tại. Tương tự với `@Before` của **JUnit 4**. Các phương thức như vậy được kế thừa trừ khi chúng bị ghi đè.
```
class StandardTests {
    @BeforeEach
    void init() {
    }
    @Test
    void succeedingTest() {
    }
    @AfterEach
    void tearDown() {
    }
}
```
## `@AfterEach`
Annotation này biểu thị rằng phương thức được chú thích nên được thực hiện sau mỗi phương thức `@Test`, `@RepeatedTest`, `@ParameterizedTest` hoặc `@TestFactory` trong lớp hiện tại. Tương tự như `@After` của **JUnit 4**. Các phương thức như vậy được kế thừa trừ khi chúng bị ghi đè.
```
class StandardTests {
    @BeforeEach
    void init() {
    }
    @Test
    void succeedingTest() {
    }
    @AfterEach
    void tearDown() {
    }
}
```
## `@BeforAll`
Annotation này biểu thị rằng phương thức được chú thích phải được thực hiện trước tất cả các phương thức `@Test`, `@RepeatedTest`, `@ParameterizedTest` hoặc `@TestFactory` trong lớp hiện tại. Tương tự như `@BeforeClass` của **JUnit 4**.
```
class StandardTests {
    @BeforeAll
    static void initAll() {
    }
    @Test
    void succeedingTest() {
    }
    @AfterAll
    static void tearDownAll() {
    }
}
```
## `@AfterAll`
Annotation này biểu thị rằng phương thức được chú thích phải được thực hiện sau tất cả các phương thức `@Test`, `@RepeatedTest`, `@ParameterizedTest` hoặc `@TestFactory` trong lớp hiện tại. Tương tự như `@AfterClass` của **JUnit 4**.
```
class StandardTests {
    @AfterAll
    static void freeAll() {
    }
    @Test
    void succeedingTest() {
    }
    @AfterAll
    static void tearDownAll() {
    }
}
```
## `@Nested`
Annotation này có nghĩa là THỬ NGHIỆM, nó biểu thị rằng phương thức được chú thích phải được thực hiện trước tất cả `@Test`, `@RepeatedTest`, `@Parameterize`. Annotaion này biểu thị rằng lớp được chú thích là lớp thử nghiệm không lồng nhau, không tĩnh (non-static). Các phương thức `@BeforeAll` và `@AfterAll` không thể được sử dụng trực tiếp trong lớp thử nghiệm `@Nested` trừ khi vòng đời cá thể kiểm tra "per-class" được sử dụng. Chú thích như vậy không được kế thừa.

Các thử nghiệm lồng nhau cho phép người viết thử nghiệm có thêm khả năng thể hiện mối quan hệ giữa một số nhóm thử nghiệm. Đây là một ví dụ phức tạp.

Bộ thử nghiệm lồng nhau để kiểm tra ngăn xếp: phương thức `@Test` và `@TestFactory` trong lớp hiện tại. Tương tự với `@BeforeClass` của **JUnit 4**.
```
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import java.util.EmptyStackException;
import java.util.Stack;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;

@DisplayName("A stack")
class TestingAStackDemo {
    Stack<Object> stack;
    
    @Test
    @DisplayName("is instantiated with new Stack()")
    void isInstantiatedWithNew() {
        new Stack<>();
    }
    
    @Nested
    @DisplayName("when new")
    class WhenNew {
    
        @BeforeEach
        void createNewStack() {
            stack = new Stack<>();
        }
        
        @Test
        @DisplayName("is empty")
        void isEmpty() {
            assertTrue(stack.isEmpty());
        }
        
        @Test
        @DisplayName("throws EmptyStackException when popped")
        void throwsExceptionWhenPopped() {
            assertThrows(EmptyStackException.class, () -> stack.pop());
        }
        
        @Test
        @DisplayName("throws EmptyStackException when peeked")
        void throwsExceptionWhenPeeked() {
            assertThrows(EmptyStackException.class, () -> stack.peek());
        }
        
        @Nested
        @DisplayName("after pushing an element")
        class AfterPushing {
        
            String anElement = "an element";
            
            @BeforeEach
            void pushAnElement() {
                stack.push(anElement);
            }
            
            @Test
            @DisplayName("it is no longer empty")
            void isNotEmpty() {
                assertFalse(stack.isEmpty());
            }
            
            @Test
            @DisplayName("returns the element when popped and is empty")
            void returnElementWhenPopped() {
                assertEquals(anElement, stack.pop());
                assertTrue(stack.isEmpty());
            }
            
            @Test
            @DisplayName("returns the element when peeked but remains not empty")
            void returnElementWhenPeeked() {
                assertEquals(anElement, stack.peek());
                assertFalse(stack.isEmpty());
            }
        }
    }
}
```
## `@Tag`
Annotation này được sử dụng để khai báo các thẻ cho việc kiểm tra lọc, ở cấp class hoặc method. Tương tự như test nhóm thử nghiệm trong TestNG hoặc Categories trong **JUnit 4**. Chú thích như vậy được kế thừa ở cấp class chứ không phải ở cấp method.
```
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

@Tag("fast")
@Tag("model")
class TaggingDemo {

    @Test
    @Tag("taxes")
    void testingTaxCalculation() {
    }
}
```
## `@Disabled`
Annotation này dùng để vô hiệu hóa một class hay method test, nó tương tự như `@Ignore` của **JUnit 4**. Annotation này không được phép kế thừa.

Vô hiệu hóa class test.
```
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
@Disabled
class DisabledClassDemo {
    @Test
    void testWillBeSkipped() {
    }
}
```
Vô hiệu hóa method test.
```
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
class DisabledTestsDemo {
    @Disabled
    @Test
    void testWillBeSkipped() {
    }
    
    @Test
    void testWillBeExecuted() {
    }
}
```
## `@ExtendWith`
Annotation này được dùng để đăng ký các mở rộng tùy biến. Ví dụ để đăng ký một tùy biến *RandomParametersExtension* cho một method cụ thể, chúng ta chú thích method test như sau.
```
@ExtendWith(RandomParametersExtension.class)
@Test
void test(@Random int i) {
    // ...
}
```
## `@TestFactory`
Test động được tạo ra khi chạy - runtime bởi method Factory được chú thích bằng `@TestFactory`. Lớp DynamicTestsDemo sau đây trình bày một số ví dụ về các test Factory và các test động.
```
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.DynamicContainer.dynamicContainer;
import static org.junit.jupiter.api.DynamicTest.dynamicTest;
import java.util.Arrays;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
import java.util.function.Function;
import java.util.stream.IntStream;
import java.util.stream.Stream;
import org.junit.jupiter.api.DynamicNode;
import org.junit.jupiter.api.DynamicTest;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.TestFactory;
import org.junit.jupiter.api.function.ThrowingConsumer;
class DynamicTestsDemo {
    // This will result in a JUnitException!
    @TestFactory
    List<String> dynamicTestsWithInvalidReturnType() {
        return Arrays.asList("Hello");
    }
    @TestFactory
    Collection<DynamicTest> dynamicTestsFromCollection() {
        return Arrays.asList(
            dynamicTest("1st dynamic test", () -> assertTrue(true)),
            dynamicTest("2nd dynamic test", () -> assertEquals(4, 2 * 2))
        );
    }
    @TestFactory
    Iterable<DynamicTest> dynamicTestsFromIterable() {
        return Arrays.asList(
            dynamicTest("3rd dynamic test", () -> assertTrue(true)),
            dynamicTest("4th dynamic test", () -> assertEquals(4, 2 * 2))
        );
    }
    @TestFactory
    Iterator<DynamicTest> dynamicTestsFromIterator() {
        return Arrays.asList(
            dynamicTest("5th dynamic test", () -> assertTrue(true)),
            dynamicTest("6th dynamic test", () -> assertEquals(4, 2 * 2))
        ).iterator();
    }
    @TestFactory
    Stream<DynamicTest> dynamicTestsFromStream() {
        return Stream.of("A", "B", "C")
            .map(str -> dynamicTest("test" + str, () -> { /* ... */ }));
    }
    @TestFactory
    Stream<DynamicTest> dynamicTestsFromIntStream() {
        // Generates tests for the first 10 even integers.
        return IntStream.iterate(0, n -> n + 2).limit(10)
            .mapToObj(n -> dynamicTest("test" + n, () -> assertTrue(n % 2 == 0)));
    }
    @TestFactory
    Stream<DynamicTest> generateRandomNumberOfTests() {
        // Generates random positive integers between 0 and 100 until
        // a number evenly divisible by 7 is encountered.
        Iterator<Integer> inputGenerator = new Iterator<Integer>() {
            Random random = new Random();
            int current;
            @Override
            public boolean hasNext() {
                current = random.nextInt(100);
                return current % 7 != 0;
            }
            @Override
            public Integer next() {
                return current;
            }
        };
        // Generates display names like: input:5, input:37, input:85, etc.
        Function<Integer, String> displayNameGenerator = (input) -> "input:" + input;
        // Executes tests based on the current input value.
        ThrowingConsumer<Integer> testExecutor = (input) -> assertTrue(input % 7 != 0);
        // Returns a stream of dynamic tests.
        return DynamicTest.stream(inputGenerator, displayNameGenerator, testExecutor);
    }
    @TestFactory
    Stream<DynamicNode> dynamicTestsWithContainers() {
        return Stream.of("A", "B", "C")
            .map(input -> dynamicContainer("Container " + input, Stream.of(
                dynamicTest("not null", () -> assertNotNull(input)),
                dynamicContainer("properties", Stream.of(
                    dynamicTest("length > 0", () -> assertTrue(input.length() > 0)),
                    dynamicTest("not empty", () -> assertFalse(input.isEmpty()))
                ))
            )));
    }
}
```
## `@TestInstance`
Annotation này dùng để cấu hình vòng đời cho một đối tượng test cụ thể. Ví dụ, nếu bạn muốn JUnit Jupiter thực hiện tất cả các phương thức test trên cùng một đối tượng test cụ thể, chỉ cần chú thích class test của bạn với `@TestInstance (Lifecycle.PER_CLASS)`.
## `@TestTemplate`
Một phương thức `@TestTemplate` không phải là trường hợp test thông thường mà là mẫu cho các trường hợp test. Như vậy, nó được thiết kế để được gọi nhiều lần tùy thuộc vào số lượng ngữ cảnh yêu cầu được trả về bởi các provider đã đăng ký. Do đó, nó phải được sử dụng kết hợp với phần mở rộng `TestTemplateInvocationContextProvider` đã đăng ký.
```
@TestTemplate
@ExtendWith(MyTestTemplateInvocationContextProvider.class)
void testTemplate(String parameter) {
    assertEquals(3, parameter.length());
}

public class MyTestTemplateInvocationContextProvider implements TestTemplateInvocationContextProvider {
    @Override
    public boolean supportsTestTemplate(ExtensionContext context) {
        return true;
    }
    @Override
    public Stream<TestTemplateInvocationContext> provideTestTemplateInvocationContexts(ExtensionContext context) {
        return Stream.of(invocationContext("foo"), invocationContext("bar"));
    }
    private TestTemplateInvocationContext invocationContext(String parameter) {
        return new TestTemplateInvocationContext() {
            @Override
            public String getDisplayName(int invocationIndex) {
                return parameter;
            }
            @Override
            public List<Extension> getAdditionalExtensions() {
                return Collections.singletonList(new ParameterResolver() {
                    @Override
                    public boolean supportsParameter(ParameterContext parameterContext,
                            ExtensionContext extensionContext) {
                        return parameterContext.getParameter().getType().equals(String.class);
                    }
                    @Override
                    public Object resolveParameter(ParameterContext parameterContext,
                            ExtensionContext extensionContext) {
                        return parameter;
                    }
                });
            }
        };
    }
}
```
Đến đây chúng ta đã hiểu được ý nghĩa của toàn bộ các annotation trong JUnit 5 thông qua những ví dụ cụ thể.

**Tài liệu tham khảo.**
+ [dzone-JUnit 5 annotation with example](https://dzone.com/articles/junit-5-annotations-with-examples-1)