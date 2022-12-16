Tiếp tục phần clean code cho hàm, mình xin đưa ra một số tip giúp bạn clean hàm tốt hơn.
# 1. Khối Switch
Thật khó để tạo ra một khối switch nhỏ. Thậm chí một khối switch chỉ có 2 cases cũng đã lớn hơn một khối block hoặc một hàm. Rất khó để tạo ra một khối switch chỉ làm 1 việc. Bản thân mặc định khối switch đã làm N việc :D. Ta cùng xem xét đoạn code tính lương theo thể loại nhân viên sau:
```java
public Money calculatePay(Employee e)
throws InvalidEmployeeType {
    switch (e.type) {
        case COMMISSIONED:
            return calculateCommissionedPay(e);
        case HOURLY:
            return calculateHourlyPay(e);
        case SALARIED:
            return calculateSalariedPay(e);
        default:
            throw new InvalidEmployeeType(e.type);
    }
}
```
Có một vài vấn đề với hàm này. Đầu tiên, nó quá lớn và khi có một thể loại nhân viên mới được thêm, nó sẽ rất lớn. Vấn đề thứ 2 rất rõ ràng là nó làm nhiều hơn 1 việc. Thứ 3 là nó vi phạm Single Responsibility Principle (SRP) bởi vì có nhiều hơn 1 lý do cho sự thay đổi hàm này. Thứ 4 là nó vi phạm nguyên tắc Open Closed Principle (OCP) bởi vì một khi thêm 1 loại nhân viên thì phải thay đổi. Nhưng vấn đề tồi tệ nhất ở đây là chúng ta sẽ có hàng tỉ hàm dạng như này nữa, kiểu như
`isPayday(Employee e, Date date)`
hoặc
`deliverPay(Employee e, Money pay)`.

Giải pháp cho các khối switch-case này là tạo một "tầng hầm" [ABSTRACT FACTORY](https://viblo.asia/p/laravel-design-patterns-series-factory-pattern-part-2-WkwGnWJqv75g) và không để ai nhìn thấy nó. "Nhà máy" sẽ tạo ra các thể loại Employee cho chúng ta, các phương thức calculatePay , isPayday , và deliverPay sẽ được định nghĩa thông qua các interface:
```java
public abstract class Employee {
    public abstract boolean isPayday();
    public abstract Money calculatePay();
    public abstract void deliverPay(Money pay);
}
-----------------
public interface EmployeeFactory {
    public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType;
}
-----------------
public class EmployeeFactoryImpl implements EmployeeFactory {
    public Employee makeEmployee(EmployeeRecord r) throws InvalidEmployeeType {
        switch (r.type) {
        case COMMISSIONED:
        return new CommissionedEmployee(r) ;
        case HOURLY:
        return new HourlyEmployee(r);
        case SALARIED:
        return new SalariedEmploye(r);
        default:
        throw new InvalidEmployeeType(r.type);
        }
    }
}
```
# 2. Đối số của 1 hàm
Số lượng đối số của 1 hàm lý tưởng nhất là 0 (`niladic`). Sau đó là 1 đối số (`monadic`), gần ngon hơn nữa thì là 2 (`dyadic`). Các hàm 3 đối số (`triadic`) được khuyên là nên tránh nếu thực sự không cần thiết. Các hàm hơn 3 đối số thì hạn chế sử dụng, trừ khi có lý do đặc biệt
## 2.1. Mẫu hàm chung có 1 đối số
Có  2 lý do chung để bạn truyền 1 tham số vào hàm. 
* Lý do đầu tiên là để trả lời câu hỏi về đối số đó, ví dụ như `boolean fileExists(“MyFile”)` (trả lời câu hỏi file này tồn tại hay không). 
* Lý do thứ 2 là bạn truyền đối số này, xào nấu biến đổi nó để trả về một cái gì đó từ nó. 

Hai cách sử dụng này là những gì người đọc mong đợi khi họ thấy một hàm thực sự. Tuy nhiên, bạn hãy chú ý đến các đặt tên hàm để người đọc có thể phân biệt được ý nghĩa của hàm loại này đang được sử dụng với ly do nào.

Một trường hợp khác cũng dùng kiểu hàm 1 tham số này là các sự kiện. Những mẫu event có 1 đối số đầu vào và không có đối số đầu ra. Tổng thể chương trình có nghĩa là diễn giải lời gọi hàm như một sự kiện và sử dụng đối số để thay đổi trạng thái của hệ thống, ví dụ, `void passwordAttemptFailedNtimes(int attempts)`. Sử dụng sự kiện kiểu này cần chú ý. Cần phải rất rõ ràng cho người đọc rằng đây là một sự kiện. Chọn tên và bối cảnh cẩn thận

## 2.2. Flag Arguments
Với nhiều người các đối số cờ thật tuyệt, nó giúp giảm thiểu được các công việc trùng lặp và kiểm tra các thứ .... Tuy nhiên dưới góc nhìn clean code và test, nó không thực sự hoàn hảo như vậy. Cùng xem ý kiến của tác giả nhé :D

Các tham số cờ thật là xấu xí và khó chịu. Truyền một giá trị boolean vào 1 hàm thực sự rất khủng khiếp. Nó ngay lập tức làm phức tạp chữ ký của phương thức, lớn tiếng tuyên bố rằng chức năng này làm nhiều hơn một điều. Nó làm một việc nếu cờ là đúng và một việc khác nếu cờ sai!

Thay vì sử dụng một phương thức `render(boolean isSuite)` tác giả khuyên nên tách thành 2 phương thức `renderForSuite() `và `renderForSingleTest()` @@

## 2.3. Dyadic Function (hàm 2 đối số)
Hàm 2 tham số thì khó hiểu hơn là hàm 1 tham số. Ví dụ `writeField(name)` thì dễ hiểu hơn là `writeField(output-Stream, name)`. Mặc dù tên của 2 phương thức đều rõ ràng.

Một vài trường hợp tất nhiên, hàm 2 tham số là cực kì thích hợp, ví dụ như `Point p = new Point(0,0)`. Chúng ta sẽ rất ngạc nhiên nếu nhìn thấy `new Point(0)`. Tuy nhiên 2 đối số trong trường hợp này thực ra là cách sắp xếp các phần tử của 1 giá trị đơn, khác với output-Stream và name ở trên

Hãy xem xét đến việc cắt giảm đối số để chuyển nó về dạng 1 đối số. Ví dụ `writeField(outputStream, name)`. Hãy xem xét lớp chứa phương thức này có thể tạo một đối tượng outputStream dùng chung trong hàm tạo, hoặc có thể xem xét tạo một lớp mới (OutputStream) chứa phương thức write(name) với chức năng tương tự nó
## 2.4. Triads
Hàm với 3 đối số khó đọc hơn đáng kể so với hàm 2 đối số. Tôi khuyên bạn nên suy nghĩ cẩn thận trước khi tạo ra hàm này

Các hàm các nhiều đối số khi dùng khả năng xảy ra lỗi, sắp xếp tham số gây khó hiểu hơi rất nhiều so với các hàm 1,2 đối số. Đặc biệt khi test các hàm này cũng gặp rất nhiều các vấn đề đáng phải quan tâm. Do vậy hãy suy nghĩ trước khi tạo các hàm như vậy.
## 2.5. Đối số là đối tượng
Khi một hàm dường như cần nhiều hơn 2 hoặc 3 đối số, ta có thể xem xét bao bọc chúng trong các lớp. Cân nhắc sự khác biệt của 2 cách khai báo
```java
Circle makeCircle(double x, double y, double radius);
Circle makeCircle(Point center, double radius);
```

Cắt giảm đối số truyền bằng cách tạo đối tượng dường như đang gian lận, nhưng không phải vậy. Một thì nhóm các biến và truyền chúng cùng nhau, như cách nhóm x, y ví dụ trên
## 2.6. Đối số là List thì sao nhể?
Thỉnh thoảng chúng ta muốn truyền 1 số lượng biến vào 1 hàm. Xem xét ví dụ hàm String.format
```java
String.format("%s worked %.2f hours.", name, hours);
```
Nếu như tất cả các đối số được xử lý giống nhau như ví dụ trên, chúng tương đương với một đối số duy nhất của loại List. Với lý do này, hàm String.format thực chất chỉ là dyadic
```java
public String format(String format, Object... args)
```
Vì vậy, tất cả các quy tắc tương tự có thể áp dụng. Các hàm có đối số có thể là 1 đối số, 2 đối số hoặc 3 đối số
```java
void monad(Integer... args);
void dyad(String name, Integer... args);
void triad(String name, int count, Integer... args);
```
## 2.7. Verbs and Keywords
Chọn 1 cái tên tốt cho hàm có thể giải thích nội dung hàm và thứ tự, ý nghĩa của các đối số. Đối với trường hợp hàm 1 đối số, tên hàm vài đối số nên là 1 cụm `verb/noun` thì đẹp nhất :v: . Ví dụ `write(name)` sẽ đủ gợi lên thông tin. Tuy nhiên câu hỏi đặt ra là "name" là cái gì? nó được viết bởi written? Một cái tên tốt hơn là `writeField(name)`, cái mà sẽ nói với chúng ta "name" là một "field"

Cuối cùng là một ví dụ về keyword trong tên hàm. Sử dụng mẫu này chúng ta sẽ mã hóa được tên đối số trong tên hàm. Ví dụ hàm `assertEquals` có thể được viết tốt hơn dưới dạng `assertExpectedEqualsActual(expected, actual)`. Điều này mạnh mẽ giảm thiểu vấn đề phải nhớ thứ tự của các đối số.

# 3. Không có các chức năng phụ
Các chức năng phụ là sự lừa dối. Hàm của bạn phải hứa là làm 1 thứ nhưng nó cũng làm những thứ ẩn khác. Đôi khi nó làm những thứ thay đổi không cần thiết cho các biến của lớp của nó, các biến global. Xem xét ví dụ check login:
```java
public class UserValidator {
	private Cryptographer cryptographer;
	public boolean checkPassword(String userName, String password) {
		User user = UserGateway.findByName(userName);
		if (user != User.NULL) {
			String codedPhrase = user.getPhraseEncodedByPassword();
			String phrase = cryptographer.decrypt(codedPhrase, password);
		if ("Valid Password".equals(phrase)) {
			Session.initialize();
				return true;
			}
		}
		return false;
  }
}
```
Chức năng phụ ở đây là `Session.initialize()`. Tên hàm của nó chỉ mô tả kiểm tra mật khẩu, không nói đến việc khởi tạo Session. Vì vậy người gọi tin vào tên của nó, gọi hàm và rất có thể sẽ xóa bỏ toàn bộ thông tin đã tồn tại trong session. Lúc này có thể tên hàm sẽ là `checkPasswordAndInitializeSession`, nhưng nó không thỏa mãn tiêu chí Do one thing.

## Đối số đầu ra: 
Các đối số mặc định được hiểu là các đối số đầu vào của 1 hàm. Tuy nhiên hãy xem xét ví dụ
```java
appendFooter(s);
```
Hàm này thêm `s` vào `footer` hay thêm 1 vài `footer` vào `s`? s là input hay output. Nó không mất nhiều thời gian để xem chữ ký hàm và nhìn thấy:
```java
public void appendFooter(StringBuffer report)
```
Như vậy đã làm rõ được vấn đề nhưng chi phí bỏ ra là phải check khai báo hàm (thì ra là thêm `footer` cho một cái `report` nào đó, haizz). Mỗi thứ làm bạn phải check chữ ký của hàm tương đương với `double-take`. Điều đó cần tránh trong lập trình.

Trong những ngày trước khi lập trình hướng đối tượng, đôi khi cần phải có đối số đầu ra. Tuy nhiên phần lớn nhu cầu đối số đầu ra biến mất trong các ngôn ngữ OOP, nó có thể được sử dụng thông qua `this` và tránh được các tham số đầu ra
```java
report.appendFooter();
```

# 4. Command Query Separation: Phân tách các lệnh truy vấn

Các hàm nên làm một cái gì đó hoặc trả lời một cái gì đó, nhưng không phải cả hai. Hoặc hàm sẽ thay đổi trạng thái của một đối tượng hoặc nó sẽ trả về một số thông tin về đối tượng đó. Làm cả hai thường dẫn đến nhầm lẫn. Hãy xem xét, ví dụ, sau đây chức năng:
```java
public boolean set(String attribute, String value);
```
hàm này sẽ set giá trị cho 1 thuộc tính và trả về true nếu nó thành công và false nếu không có thuộc tính tồn tại.
```java
if (set("username", "unclebob"))...
```
Tưởng tượng từ góc nhìn của người đọc. Điều đó có ý nghĩa gì? Nó kiểm tra "username" đã được set "unclebob" từ trước hay kiêm tra set "username" là "unclebob" thành công hay không? Nó khó có thể 	suy ra ý nghĩa từ cuộc gọi này vì nó không rõ ràng về việc từ "set" là một động từ hay tính từ.

Người viết hàm dự định `set` là 1 động từ nhưng khi đặt nó trong bối cảnh với `if`, nó dường như lại là một tính từ. Do đó mới xảy ra sự hiểu nhầm như trên. Chúng ta nên cố giải quyết vấn đề bằng cách đặt tên lại cho hàm là `setAndCheckIfExists` nhưng nó lại không có ích cho việc có thể đọc được trong khối `if`. Giải pháp thực sự là tách lệnh từ truy vấn để sự mơ hồ không thể xảy ra.
```java
if (attributeExists("username")) {
    setAttribute("username", "unclebob");
	...
}
```

# 5. Bạn nên viết hàm như thế nào?
Viết phần mềm cũng như viết các thứ khác. Khi bạn viết báo hoặc tạp chí. Bạn viết các ý tưởng của bạn đầu tiên, sau đó bạn chỉnh sửa nó cho tới khi đọc có vẻ ổn. Bản thảo đầu tiên có thể là vụng về và vô tổ chức, vì vậy bạn cơ cấu lại nó và tinh chỉnh nó cho đến khi nó có thể đọc theo cách bạn muốn nó đọc.

Khi bạn viết 1 hàm, chúng quá dài và phức tạp. Có rất nhiều indenting và các vòng lặp lồng nhau. Nó có quá nhiều đối số. Các tên tùy ý, có các mã lặp lại. Và cũng có các đoạn mã unit tests để test chỗ code lôm côm này.

Vì vậy, sau đó bạn xem lại và tinh chỉnh đoạn mã đó, tách các hàm nhỏ hơn, thay đổi tên, loại bỏ trùng lặp. Bạn cần thu nhỏ các phương thức và sắp xếp lại chúng, đôi khi bạn cần phá vỡ toàn bộ các lớp đã xây dựng từ trước đó.

Cuối cùng, bạn kết thúc với các chức năng tuân theo các quy tắc mà tác giả đã đặt ra trong chương này.

# Tổng kết:
* Khi sử dụng switch-case, cân nhắc sử dụng ABSTRACT FACTORY.
* Cân nhắc và tìm cách giảm đối số truyền vào của 1 hàm, xuống 1 đến 2 là tốt để có thể test và dễ hiểu.
* Tên hàm cũng cực kì quan trọng, tránh để double-take. Tên đẹp nhất là cum `verb/noun `(cho loại hàm 1 đối số).
* Nguyên tắc mang tính chất tham khảo, tùy mục đích mà bạn có thể áp dụng cho không. Nếu các project không có các đoạn unit tests hoặc không coi trọng clean, bạn có thể tạo ra các hàm với nhiều đối số, cờ để thuận tiện nhất cho project :D.

# Tài liệu tham khảo
* Chapter 3: [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882).
* [ABSTRAC FACTORY](https://viblo.asia/p/laravel-design-patterns-series-factory-pattern-part-2-WkwGnWJqv75g)