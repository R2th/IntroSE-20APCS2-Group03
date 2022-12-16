<p><img src="https://images.viblo.asia/fed0af3d-0f44-4203-a605-0b19737d4f0d.png"></p>

Tiếp tục series các câu hỏi phỏng vấn mà một Android Developer nên chuẩn bị kỹ càng trước khi "xung trận", phần này sẽ tập trung vào các câu hỏi liên quan tới kiến thức về **Java** - một thành phần rất quan trọng khi phát triển ứng dụng Android. Các bạn có thể theo dõi phần trước tại [đây](https://viblo.asia/p/mot-so-cau-hoi-phong-van-android-ban-nen-luu-y-phan-1-3Q75wkLQ5Wb).
### 1. Tại sao nói Java độc lập về nền tảng?
Vì việc thực thi `code java` không phụ thuộc vào hệ điều hành (OS).
### 2. Khác biệt giữa 'throw' và 'throws' khi xử lý ngoại lệ trong Java?
Từ khóa `throw` được sử dụng để ném `Exception` cụ thể từ bất kỳ phương thức hoặc khối tĩnh nào trong khi `throws` được sử dụng để chỉ ra rằng `Exception` có thể được ném bởi phương thức này.
Ví dụ:
```java
throw new ArithmeticException("Arithmetic Exception");
```
Và:
```java
throws ArithmeticException;
```
### 3. Trong trường hợp nào thì chúng ta có thể bỏ qua khối finally trong một đoạn code try catch?
Bằng cách gọi `System.exit (0)` trong khối `try` hoặc `catch`, chúng ta có thể bỏ qua khối `finally`. 
<br>
Tuy nhiên, phương thức `System.exit (int)` có thể ném ra một `SecurityException`. Nếu `System.exit (0)` thoát JVM mà không ném ngoại lệ này thì khối `finally` sẽ không được thực thi. Ngược lại, nếu `System.exit (0)` ném ngoại lệ này thì khối `finally` vẫn sẽ được thực thi.
### 4. Garbage collector là gì? Nó hoạt động như thế nào?
Tất cả các đối tượng được phân bổ trên vùng `heap` do `JVM` quản lý. Miễn là một đối tượng đang được tham chiếu tới hay còn đang được sử dụng, JVM sẽ coi rằng nó còn 'sống'. Khi một đối tượng không còn được tham chiếu và do đó không thể truy cập được bằng code trong ứng dụng, trình thu gom rác - `Garbage collector` sẽ loại bỏ nó và lấy lại bộ nhớ không sử dụng.
### 5. Sự khác biệt giữa bộ nhớ stack và bộ nhớ heap?
`Stack` được sử dụng để phân bố bộ nhớ tĩnh và `Heap` cho phân bố bộ nhớ động, cả hai được lưu trữ trong `RAM` của máy tính.

Các biến được phân bổ trên `stack` được lưu trữ trực tiếp vào bộ nhớ và việc truy cập vào bộ nhớ này là rất nhanh; việc phân bổ của nó được xử lý khi chương trình được biên dịch. Khi một hàm hay một phương thức gọi một hàm khác và hàm này lại gọi một hàm khác nữa, ... việc thực thi các hàm này sẽ bị hoãn lại cho đến khi hàm cuối cùng trả về. `Stack` hoat động theo cơ chế `Last In First Out` (LIFO), khối gần hiện tại nhất sẽ luôn là khối tiếp theo được thực thi. Điều này làm cho việc theo dõi `stack` rất đơn giản, giải phóng một khối khỏi `stack` tương đương với việc điều chỉnh một con trỏ.

Bộ nhớ của các biến ở trong `heap` được phân bổ tại `run time` và việc truy cập các vùng nhớ này tương đối chậm so với trên `stack`, bù lại thì kích thước `heap` chỉ bị giới hạn bởi kích thước bộ nhớ ảo. Các thành phần của `heap` không hề phụ thuộc vào nhau và có thể truy cập một cách ngẫu nhiên tại bất kỳ thời điểm nào. Bạn có thể xác định một khối tại mọi thời điểm và giải phóng nó bất cứ khi nào bạn muốn. Điều này làm cho việc theo dõi phần nào của `heap` đang được phân bổ và để giải phóng chúng phức tạp hơn.

Bạn có thể sử dụng `stack` nếu bạn biết chính xác số lượng dữ liệu mà ban muốn cấp phát trước khi biên dịch và nó không quá lớn. Bạn có thể sử dụng `heap` nếu bạn không biết chính xác kích thước dữ liệu bạn sẽ cần tại thời điểm runtime hoặc bạn cần cấp phát mọt lượng lớn dữ liệu.

Trong trường hợp `multi-thread`, mỗi `thread` sẽ có `stack` độc lập của nó nhưng đều sử dụng chung bộ nhớ `heap`. `Stack` được xác định riêng cho từng `thread` còn `Heap` là cho ứng dụng. `Stack` rất quan trọng trong việc xử lý ngoại lệ và luồng thực thi.

Khi một `object` được khởi tạo, nó sẽ được lưu trữ ở trong không gian bộ nhớ của `heap` và bộ nhớ `stack` chứa tham chiếu tới nó. Bộ nhớ `stack` chỉ chứa các biến nguyên thủy cục bộ và tham chiếu tới các `object` lưu trữ trong `heap`. `Object` lưu trữ trong `heap` có thể được truy cập một cách toàn cục còn trong `stack` thì các luồng khác không thể truy cập được.

Bộ nhớ `stack` tồn tại ngắn hơn trong khi bộ nhớ `heap` tồn tại từ khi ứng dụng khởi động cho tới khi nó kết thúc thực thi. Khi bộ nhớ `stack` bị đầy, `Java runtime` sẽ ném ngoại lệ `java.lang.StackOverFlowError` và trong trường hợp của `heap` là `java.lang.OutOfMemoryError: Java Heap Space error`. Kích thước của `stack` nhỏ hơn nhiều so với `heap` nhưng có tốc độ truy cập nhanh hơn.
### 6. Java có hỗ trợ đa kế thừa không?
`Java` chỉ hỗ trợ đa kế thừa thông qua `interface` (vì các class có thể `implement` nhiều `interface` nhưng chỉ có thể `extend` từ một class).
### 7. Abstract class là gì?
* **Abstract class** là những lớp chứa một hoặc nhiều phương thức `abstract`. Một phương thức `abstract` là một phương thức chỉ được định nghĩa chứ không được triển khai (không có thân hàm).
* Kể cả nếu chỉ có một phương thức là `abstract` thì cả lớp đó phải được định nghĩa là `abstract`.
* Các `abstract class` không thể được khởi tạo.
* Bạn không thể định nghĩa một lớp vừa là `abstract` vừa là `final`.
* Các phương thức `non-abstract` có thể truy cập các phương thức `abstract`.
### 8. Interface là gì?
* **Interface** chỉ định nghĩa các phương thức mà một lớp kế thừa nó sẽ cần triển khai.
* `Interface` không thể là `final`, các biến trong `interface` phải là `static` hoặc `final`.
* `Interface` không thể được khởi tạo một cách trực tiếp.
* `Marker interface`: marker interface là các interface không định nghĩa bất cứ phương thức nào. Ví dụ điển hình đó chính là `java.io.Serializable`, và mục đích chính của nó cũng chỉ là để đánh dấu.
### 9. Tại sao không nên gọi abstract method trong hàm khởi tạo?
Vấn đề là khi một class chưa được khởi tạo một cách hoàn toàn thì khi phương thức `abstract` này được gọi trong một `subclass`, nó có thể dẫn đến những tình huống không mong muốn.
### 10. Sự khác nhau giữa == và phương thức equals() trong Java?
Ta có thể sử dụng toán tử `==` khi so sánh tham chiếu (so sánh địa chỉ ô nhớ) của đối tượng, còn phương thức `equals()` để so sánh nội dung của đối tượng đó.
Nói một cách đơn giản, `==` kiểm tra xem nếu hai đối tượng trỏ tới cùng một địa chỉ ô nhớ trong khi `equals()` so sánh dựa trên các giá trị của các đối tượng này.
### 11. String Pool trong Java
**String Pool** trong Java là một `pool` (bể chứa) của các chuỗi kí tự được lưu trữ ở trọng bộ nhớ `Heap`. Khi ta sử dụng `""` để tạo một đối tượng `String`, đầu tiên nó sẽ tìm `String` với giá trị tương tự ở trong `String pool`, nếu tìm thấy nó sẽ trả về tham chiếu tương ứng còn không sẽ tạo một `String` mới ở trong `pool` và trả về tham chiếu tới đối tượng mới này. 
Tuy nhiên, khi sử dụng toán tử `new`, ta bắt buộc lớp `String` tạo một đối tượng `String` mới ở trong `heap`. Ta có thể sử dụng phương thức `intern()` để đưa nó vào trong `pool` hoặc tham chiếu tới đối tượng `String` khác ở trong `pool` mà có giá trị tương tự.
### 12. String.intern() là gì? Khi nào thì nên sử dụng nó?
* Phương thức **String.intern()** có thể được sử dụng để giải quyết vấn đề lặp String trong Java. Bằng cách cẩn thận sử dụng `intern()`, bạn có thể tiết kiệm khá nhiều bộ nhớ bị tiêu thụ bởi việc lặp các `String instance`. Một `string` bị lặp khi nó chứa cùng nội dung so với `string` khác nhưng chiếm vị trí bộ nhớ khác nhau.
* Bằng cách gọi phương thức `intern()` cho một string (ví dụ "abc"), JVM sẽ đưa chuỗi này vào một `pool` và bất cứ khi nào một chuỗi "abc" khác được tạo ra, đối tượng ở trong `pool` sẽ được trả về thay vì tạo ra một đối tượng mới. Do vậy, bạn sẽ tiết kiệm được rất nhiều tài nguyên bộ nhớ, tùy thuộc vào việc các chuỗi của bạn có bị lặp nhiều hay không.
### 13. Final modifier?
**Final modifier**: một khi đã được định nghĩa thì không thể sửa đổi được.
* `Final class`:  không thể kế thừa từ final class được.
* `Final variable`: các biến `final` không thể bị thay đổi một khi nó đã được khởi tạo.
* `Final method`: các phương thức `final` không thể bị ghi đè.
### 14. Phương thức finalize() là gì?
**finalize()** là phương thức được sử dụng để thực hiện quá trình "clean up" trước khi một đối tượng được `garbage collector` thu thập lại. Nói đơn giản, nó được gọi trên đối tượng khi `GC` quyết định rằng đối tượng này không được tham chiếu tới nữa.
### 15. Từ khóa finally.
**Finally** là một đoạn code và được sử dụng để đặt những dòng code quan trọng mà bạn muốn nó được thực thi cho dù ngoại lệ có được xử lý hay không. (try - catch - finally).
### 16. Từ khóa synchronized.
Khi bạn có hai `thread` cùng đọc và ghi tới cùng một tài nguyên, ví dụ một biến `test`, bạn cần phải đảm bảo rằng các `thread` này truy cập biến trên một cách tuần tự. Nếu không sử dụng từ khóa **synchronized**, `thread 1` có thể không biết những thay đổi mà `thread 2` tạo ra đối với biến `test` và ngược lại.
**synchronized** sẽ block lời gọi tiếp theo của `thread` tới tài nguyên nếu tài nguyên đó chưa được sử dụng trong một `thread` khác. Nói cách khác, chỉ có duy nhất **một thread** được truy cập tới tài nguyên này tại một thời điểm.
### 17. Từ khóa volatile.
Giả sử hai `thread` đang cùng chạy trong một phương thức. Nếu hai `thread` này được chạy trên các `processor` khác nhau thì mỗi `thread` có thể có một bản ghi copy cục bộ riêng của biến. Nếu một `thread` chỉnh sửa giá trị của nó, `thread` còn lại có thể không biết được sự thay đổi của biến ban đầu (`the original variable`) một cách ngay lập tức. Điều này dẫn tới vấn đề không đồng nhất dữ liệu.
Về cơ bản, **volatile** được sử dụng để chỉ định rằng giá trị của một biến sẽ bị chỉnh sửa bởi những `thread` khác nhau. **volatile** nói cho trình biên dịch rằng giá trị của một biến không nên được `cache` vì giá trị của nó có thể thay đổi ngoài phạm vi của chương trình.
Giá trị của biến này sẽ không bao giờ được `cache` một cách cục bộ trên `thread`: tất cả quá trình đọc, ghi sẽ được thực hiện thẳng trong **main memory**.
### 18. Autoboxing và Unboxing là gì?
**Autoboxing** là quá trình tự động chuyển đổi mà trình biên dịch `Java` tạo ra giữa kiểu dữ liệu nguyên thủy và các lớp `wrapper` tương ứng của chúng (ví dụ: `int - Integer`, `long - Long`, `double` - `Double`...).
Quá trình chuyển đổi ngược lại chính là **unboxing**.
### 19. Externalization là gì?
Trong `serialization`, `JVM` chịu trách nhiệm cho qúa trình ghi và đọc các đối tượng. Việc này khá là hữu ích trong đa số các tình huống bởi lập trình viên không cần tốn thời gian hay công sức quan tâm tới chi tiết của các tầng hoạt động phía dưới của quá trình `serialization`.
Tuy nhiên, theo mặc định thì `serialization` không thể bảo vệ các thông tin nhạy cảm ví dụ như mật khẩu, thông tin nhân dạng, ...
Bởi vậy, **externalization** sinh ra cho phép lập trình viên quyền điều khiển hoàn toàn quá trình đọc, ghi các đối tượng trong quá trình `serialization`.
Việc bạn cần làm là `implement` **java.io.Externalizable**, sau đó triển khai code của riêng mình để ghi trạng thái của đối tượng trong phương thức `writeExternal()` và đọc trạng thái đối tượng trong phương thức `readExternal()`.
### 20. Sự khác nhau giữa ArrayList và Vector?
**Vector** là **thread safe** (`synchronized`) trong khi **ArrayList** thì không. Vì vậy hiệu năng của `ArrayList` sẽ tốt hơn so với `Vector`, nhưng `Vector` an toàn đối với những bài toán đa luồng mà bạn cần đồng bộ dữ liệu. Tuy nhiên nếu bạn sử dụng phương thức `Collections.synchronizedList()` thì nó cũng sẽ trả về cho bạn một `synchronized list`  tương tự như `Vector`.
Thực chất, cả hai đều chứa các phần tử của chúng ở trong một `Array` (mảng). Khi một phần tử mới được thêm vào một `ArrayList` hay `Vector`, chúng cần phải mở rộng mảng chứa phần tử của mình nếu kích thước của nó đã đạt giới hạn. Một `Vector` mặc định sẽ mở rộng ra gấp đôi kích thước mảng của nó, trong khi `ArrayList` thì chỉ gấp rưỡi.
### 21. Việc chèn và xóa phần tử trong ArrayList có chậm hơn so với LinkedList không?
**ArrayList** sử dụng một mảng để lưu trữ các phần tử, khi mảng đó được lấp đầy thì một mảng mới có kích thước khoảng 1,5 lần kích thước của mảng ban đầu được tạo ra và tất cả dữ liệu của mảng cũ sẽ được sao chép sang mảng mới. Đối với quá trình xóa,  tất cả phần tử trong mảng phải được lùi lại một `index` để lấp vào khoảng trống mà phần tử bị xóa để lại.
Trong **LinkedList**, dữ liệu được lưu trữ trong các `node` và các `node` này có thể tham chiếu tới phần tử trước hoặc sau nó; vì vậy việc thêm phần tử mới vào rất đơn giản và nhanh chóng. Đó là tạo ra `node` mới, cập nhật con trỏ `next` của `node` cuối cùng và con trỏ `previous` của `node` mới. Quá trình xóa phần tử trong `linked list` cũng nhanh hơn vì nó chỉ cần cập nhật con trỏ `next` của `node` ngay trước `node` bị xóa và con trỏ `previous` của `node` nằm ngay sau `node` bị xóa.
### 22. HashMap hoạt động như thế nào?
**HashMap** trong `Java` hoạt động dựa trên nguyên tắc băm. Đó là một cấu trúc dữ liệu cho phép chúng ta lưu trữ đối tượng và lấy nó với thời gian thực hiện là hằng số (độ khó `O(1)`) nếu ta biết trước `key`. Khi ta gọi phương thức `put()`, phương thức `hashCode()` của đối tượng đóng vai trò là `key` sẽ được gọi theo để hàm băm của `map` có thể tìm thấy vị trí để lưu trữ đối tượng `Map.Entry` (chính là đối tượng mà `HashMap` sử dụng để lưu trữ cả cặp `key` và `value`).
Về cơ bản, `HashMap` sử dụng một mảng để lưu trữ các đối tượng `Map.Entry` này, và vì mảng có kích thước cố định nên nếu bạn tiếp tục đẩy vào các phần tử mới, đến một lúc hàm băm sẽ trả về cùng một địa chỉ cho hai `key` khác nhau, việc này được gọi là `collision` (xung đột) trong `HashMap`. Trong trường hợp này, một `linked list` sẽ hình thành tại vị trí đó và một `entry` mới được lưu trữ lại dưới dạng `node` tiếp theo.
Nếu bạn cần lấy đối tượng từ `linked list` này, bạn sẽ cần phải thực hiện một quá trình kiểm tra thêm để tìm kiếm đúng giá trị mình mong muốn, điều này được thực hiện thông qua phương thức `equals()`. Vì mỗi `node` đều chứa một `entry`, `HashMap` sẽ liên tục so sánh `key` của các `entry` này với `key` được truyền vào sử dụng phương thức `equals()` và khi nó trả về `true`, `Map` sẽ trả về giá trị tương ứng cho bạn.
<br><br>
Cảm ơn các bạn đã đọc bài của mình. Nếu có đóng góp hay thắc mắc các bạn hãy để lại ở phần comment nhé, mình sẽ cố gắng trả lời một cách sớm nhất có thể.
Chúc các bạn thành công.

Nguồn tham khảo: https://android.jlelse.eu/android-interview-questions-cheat-sheet-part-ii-bea0633f0da7?fbclid=IwAR1SrotwUVAcCIaXr2DoGNN8pjjm5Xp10Horp45-1JAw3fk7CWcgjqvv1iY