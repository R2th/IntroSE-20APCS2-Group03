Để dễ dàng cho các bạn theo dõi và tìm hiểu về cách viết Unit Test trong Java. Bài này mình sẽ tổng hợp lại toàn bộ các bài viết về cách viết Unit Test với JUnit + Mockito + PowerMockito.

## [Tìm hiểu về kiểm thử (Tesing) trong phát triển phần mềm](https://gpcoder.com/5194-tim-hieu-ve-kiem-thu-tesing-trong-phat-trien-phan-mem/)

Trong bài viết này sẽ giới thiệu cho các bạn biết về kiểm thử phần mềm (testing) trong phát triển phần mềm.

* Kiểm thử (testing) là gì?
* Ai sẽ là người test?
* Thời điểm bắt đầu test
* Khi nào thì dừng việc test
* Phân loại Tesing
* So sánh Manual Testing và Automation Testing

## [Unit Testing trong phát triển phần mềm hiện đại](https://gpcoder.com/5202-unit-testing-trong-phat-trien-phan-mem-hien-dai/)

Bài này sẽ giới thiệu chi tiết hơn về cách viết Unit Testing và mô hình phát triển phần mềm hiện đại TDD (Test-Driven Development). Ngoài ra, chúng ta cũng sẽ biết được cách xây dựng UT với mô hình đối tượng ảo (Mock Object).

## [Giới thiệu JUnit](https://gpcoder.com/5234-kiem-thu-voi-junit-trong-java/)

Sau khi đã nắm được các khái niệm về Unit test, TDD, chúng ta sẽ cùng tìm hiểu về cách viết Unit Test trong Java với JUnit Framework. Cách cài đặt và sử dụng JUnit test với Eclipse. Làm sao kiểm tra độ bao phủ của Unit Test với plugin EclEmma.

## Một số Annotation cơ bản của JUnit[](https://gpcoder.com/5263-mot-so-annotation-co-ban-cua-junit/)

Tìm hiểu cách sử dụng một số Annotation cơ bản của JUnit như @Before, @After, @BeforeClass, @AfterClass, @Test, @Test(expected=XxxException.class), @Ignore, @FixMethodOrder. Hiểu về lifecycle của một Test Class trong JUnit. Cách viết test một exception, timeout.

## [Một số API của JUnit – Assert, Assume, Test Runner](https://gpcoder.com/5268-mot-so-api-cua-junit-assert-assume-test-runner/)

Trong bài này, chúng ta sẽ cùng tìm hiểu một số API của JUnit như Assert, Test Runner (JUnitCore), Test Suite, Assume.

JUnit Assert Class : JUnit cung cấp các phương thức static để kiểm tra các điều kiện nhất định thông qua lớp Assert. Các phương thức này thường bắt đầu với assertXxx(). Nó cho phép chúng ta xác định thông báo lỗi (error message), kết quả mong đợi (expected) và kết quả thực tế (actual). Các phương thức Assert so sánh giá trị thực tế được trả về bởi một phương thức test với giá trị mong đợi, nó ném một AssertionException nếu so sánh thất bại.

JUnit Assume Class: Annotation @Ingore cho phép chúng ta sử dụng để đánh dấu phương thức này để được bỏ qua (ignore/ disable), không cần thực thi test. Một cách khác để làm việc này là sử dụng Assume.assumeXxx() để định nghĩa điều kiện Test.

* Assume.assumeFalse() : đánh dấu test là không hợp lệ, nếu điều kiện của nó đánh giá là đúng.
* Assume.assumeTrue() : đánh giá test là không hợp lệ nếu điều kiện của nó đánh giá là sai.

JUnit Test Runner : bình thường, các IDE như NetBeans, Eclipse đều có sẵn trình chạy (runner) cho JUnit để hiển thị kết quả các test case. Chúng ta có thể gọi một API được hỗ trợ từ JUnit để thực thi các class test một cách thủ công thông qua JUnitCore.

## [Làm thế nào để thực thi một nhóm các class test trong JUnit?](https://gpcoder.com/5293-lam-the-nao-de-thuc-thi-mot-nhom-cac-class-test-trong-junit/)

Thông thường một class test sẽ sử dụng để test cho một chức năng, một unit. Nếu chúng ta có một vài test class, và mong muốn có thể kết hợp chúng thành một nhóm/ bộ kiểm tra. Chúng ta có thể làm được điều này bằng cách sử dụng Test Suite hoặc Categories Test.

## [JUnit – Parameterized Test](https://gpcoder.com/5289-junit-parameterized-test/)

Trong bài viết này, chúng ta sẽ cùng tìm hiểu cách tạo và thực hiện các test case với tham số hóa trong Junit (parameterized test).

## [Đơn giản hóa Unit Test với JUnit Rule](https://gpcoder.com/5291-don-gian-hoa-unit-test-voi-junit-rule/)

Rule (quy tắc) trong JUnit 4 là một thành phần cho phép chúng ta viết code để thực hiện một số công việc trước và sau khi phương thức test thực thi. Trong bài này, chúng ta sẽ cùng tìm hiểu một số Rule có sẵn trong JUnit 4 (TemporaryFolder Rule, TemporaryFolder Rule, …) và cách tự viết một custom rule.

## [JUnit – Hamcrest Matchers](https://gpcoder.com/5292-junit-hamcrest-matchers/)

Trong bài này, chúng ta sẽ cùng tìm hiểu Matcher là gì, cách cài đặt và sử dụng thư viện Hamcrest Matchers để verify các Collections, Number, XML, bean, number, text, object, …

## [JUnit – Custom Hamcrest Matchers](https://gpcoder.com/5345-junit-custom-hamcrest-matchers/)

Tiếp tục với thư viện Hamcrest Matchers, trong bài này chúng ta sẽ cùng tìm hiểu cách tự viết một Matcher cho riêng mình.

## [Làm thế nào để chạy lại một failed Test trong JUnit?](https://gpcoder.com/5384-lam-the-nao-de-chay-lai-mot-failed-test-trong-junit/)

Đôi khi chúng ta gặp một số vấn đề ngoài ý muốn khi thực thi Unit test như lỗi kết nối internet, kết nối database, thiếu tài nguyên, … dẫn đến test case của chúng ta bị fail. Trong những trường hợp đó, chúng ta mong muốn có thể thực thi lại các test case một cách tự động. Nhưng bằng cách nào chúng ta có thể làm được điều này với JUnit? Chúng sẽ được giải đáp trong bài viết này.

## [Làm thế nào để lắng nghe các sự kiện mỗi khi một test được thực thi trong JUnit?](https://gpcoder.com/5374-lam-the-nao-de-lang-nghe-cac-su-kien-moi-khi-mot-test-duoc-thuc-thi-trong-junit/)

Trong bài này chúng ta sẽ cùng tìm hiểu về JUnit Listener và cách để lắng nghe các sự kiện mỗi khi một test được thực thi trong JUnit.

## [JUnit – HTML Report với Surefire maven plugin](https://gpcoder.com/5290-junit-html-report-voi-surefire-maven-plugin/)

Sau khi viết test và thực thi, chúng ta cũng cần xuất kết quả ra một file nào đó để dễ dàng theo dõi và báo cáo với xếp, với khách hàng. Chúng ta có thể thực hiện một cách tự động thông qua Surefire maven plugin, đây là một plugin của maven cho phép xuất báo cáo (report) kết quả test ra tập tin HTML.

## [Giới thiệu Mockito](https://gpcoder.com/5378-gioi-thieu-mockito/)

Trong nhiều trường hợp, phương thức cần test của chúng ta gọi đến nhiều phương thức, service khác mà các phương thức này chưa được cài đặt (implement) hoặc tốn nhiều chi phí để thực thi test nhiều lần. Để đảm bảo unit test không phụ thuộc vào nhau, mỗi unit test độc lập được thực thi đúng, chúng ta phải giả định rằng các phương thức được gọi đến đang xử lý đúng. Mockito giúp ta giả lập kết quả của các phương thức liên quan để tập trung viết test cho phương thức hiện tại.

Trong bài viết này, chúng ta sẽ nắm được:

* Mokito là gì?
* Phân loại Mock/ Test Double
* Cài đặt Mockito
* Sử dụng Mockito với JUnit Test

## [Mockito – Annotations](https://gpcoder.com/5392-mockito-annotations/)

Trong bài viết này chúng ta sẽ cùng tìm hiểu một số Annotation của Mockito như @Mock, @Spy, @Captor, @InjectMocks để viết test cho các behavior.

**@Mock** : Annotation @Mock được sử dụng để khởi tạo một mock object và inject giá trị này cho field này. Chúng ta không tạo ra các đối tượng thực sự, thay vào đó yêu cầu Mockito tạo ra một đối tượng giả cho class này, các phương thức của class này không được thực thi thực sự, do đó trạng thái của đối tượng không bị thay đổi.
**@Spy** : Annotation @Spy được sử dụng để wrap một object thật, có thể gọi xử lý thật sự ở object này, tuy nhiên chúng ta có thể spy một số phương thức trên đối tượng thật như với @Mock.
**@InjectMocks** :
* Trong một số trường hợp, chúng ta cần tạo một object test mà object này chứa các dependency khác. Vì vậy, chúng ta cần phải tạo các Mock/ Spy object cho các dependency và inject chúng vào đối tượng test. Để làm được điều này, chúng ta có thể sử dụng Annotation
* @InjectMocks. @InjectMocks được sử dụng ở mức field, để đánh dấu các field này cần inject các dependency. Mokito cố gắng inject các giá trị cho các field này thông qua constructor, setter hoặc property injection. Nó sẽ không throw bất kỳ lỗi nào nếu không tìm được injection phù hợp.

## [Mockito – Control mock’s behavior](https://gpcoder.com/5413-mockito-control-mocks-behavior/)

Toàn bộ ý tưởng của việc tạo một mock object là có thể kiểm soát behavior của nó. Nếu một phương thức của mock được gọi, nó sẽ xử lý theo cách mà chúng ta có thể điều khiển được. Trong bài viết này, chúng ta sẽ cùng tìm hiểu các cách để điều khiển behavior của một đối tượng giả (mock object).

Một số kiến thức các bạn sẽ nhận được trong bài viết này:

* Stubbing Methods sử dụng cấu trúc: when().thenXxx().
* Stubbing Methods sử dụng cấu trúc: doXxx().when().
* Argument matchers.

## [Mockito – Verifying Behavior](https://gpcoder.com/5431-mockito-verifying-behavior/)

Khi viết Unit Test, chúng ta cần thực hiện một số Assert để xác nhận expected result và actual result là như nhau. Đối với các mock object, chúng ta cũng cần verify một vài behavior đã được gọi hay chưa. Trong Mockito, chúng ta có thể thực hiện verify các mock object thông qua phương thức Mockito.verfify().

Sau bài viết này các bạn sẽ biết được cách:

* Verify số lần phương thức được gọi.
* Verify các tham số (argument) của phương thức.
* Verify thứ tự phương thức được gọi.
* Verify thời gian thực thi (timeout).

## [Giới thiệu Powermock](https://gpcoder.com/5447-gioi-thieu-powermock/)

PowerMock là một Java mock framework được sử dụng để giải quyết các vấn đề mà thường được coi là khó khăn hoặc thậm chí không thể viết Unit Test, chẳng hạn như static method, static class, final class, private method, contructor.

Trong bài viết này, chúng ta sẽ tìm hiểu về cách cài đặt và sử dụng PowerMockito để test một số trường hợp thường gây khó khăn trên.

## [PowerMockito – Suppressing Unwanted Behavior](https://gpcoder.com/5457-powermockito-suppressing-unwanted-behavior/)

Trong bài viết này chúng ta sẽ cùng tìm hiểu cách sử dụng PowerMockito để viết test cho một số trường hợp đặc biệt như các static initializer, constructor, method, … gọi đến các 3rd party hay nó chưa được implement.

* Suppress own constructor – Tạo instance một class mà không gọi constructor của chính nó
* Suppress super class constructor – Tạo instance của một class nhưng không gọi constructor của super class
* Suppress method – Ngăn thực thi một phương thức
* Suppress fields – Ngăn khởi tạo giá trị mặc định cho một field
* Suppress static initializer – Ngăn khởi tạo giá trị cho static method, static block

## [Làm sao test một Abstract Class trong Java?](https://gpcoder.com/5488-lam-sao-test-mot-abstract-class-trong-java/)

Trong Java, các abstract class được sử dụng để định nghĩa các behavior có thể có của một class, với một danh sách các phương thức trừu tượng (abstract method) sẽ được implement bởi sub-class. Về cơ bản, nó cũng có thể bao gồm một vài phương thức đã được implement logic, do đó nó cũng cần được cover bởi Unit Test. Tuy nhiên, một abstract class không thể được khởi tạo instance một cách trực tiếp thông qua từ khóa new. Do đó, nó cũng cần một số cách đặt biệt để viết test, chúng ta sẽ cùng tìm hiểu trong bài viết này.

Một số trường hợp thường gặp:

* Trường hợp test một abstract method độc lập.
* Trường hợp test một abstract method được gọi bởi một method khác.

Link bài viết gốc: https://gpcoder.com/5486-tong-hop-cac-bai-viet-ve-unit-test-trong-java/