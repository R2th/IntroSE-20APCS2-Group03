Rất nhiều Java Framework ngày nay đòi hỏi việc truy cập vào các giá trị của đối tượng thông qua các thức chuẩn là các getter/setter. Nó không đòi hỏi việc public các fields thông qua đối tượng mà chúng ta có thể truy cập, nhưng htoong qua các phương thức mặc định này, do đó chúng ta phải kiểm soát cái dữ liệu có thể vào, ra khỏi đối tượng. Một ý tưởng tốt khác là thêm vào, đặc biệt các model class các phương thức toString(), hashCode() nhằm sử dụng để đối chiếu các thể hiện của đối tượng của cùng một lớp. Kết quả của những đề xuất này xuất hiện trong rất nhiều dòng code ngay cả đối với những lớp đơn giản. Cũng như khi chúng ta cần cập nhật những lớp đó, nó sẽ đòi hỏi phải viết lại các phương thức so sánh, cái tiêu tốn thời gian và khả năng sáng tạo của chúng ta. May mắn thay, chúng ta có Project Lombok.

## How it work?
Lombok là một dự án tương đối nhỏ cái sử dụng các annotations cụ thể được chèn vào các phần mã nguồn. So sánh với những giải pháp tương tự khác thì Lombok không sử dụng refection, nhưng tất cả những phương thức này được sinh ra một cách tự động trong suốt quá trình biên dịch.

Và đó là tất cả nguyên lý.

Okay. Các mẫu mã nguồn ở đây là gì? Một cách ngắn gọn nó là một phần của mã nguồn cái liên quan tới những gì được thêm vào(Ví dụ bởi các framework), nhưng như vậy thì mã nguồn sẽ thực sự dài, lặp lại và nhàm chán lúc maintain. Cũng như các getter/setter, equals, và các loại khác được nhồi nhét vào.

Đúng rồi, do đó hãy xem xét một số ví dụ.

### @Getter/@Setter
Cái đầu tiên này là khá rõ ràng. Bằng cách thêm vào @Getter và @Setter annotations chúng ta không cần lo lắng về các phương thức này, cái chắc chắn sẽ làm ngắn các lớp model của bạn.

```
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class User {
  
  private String username;
  private String email;
  private String firstName;
  private String lastName;
}
```

### @EqualAndHashCode
Một cái thú vị khác có thể thêm vào các model class đó là các phương thức equal() và hashCode() cái được sử dụng để xác định các thể hiện độc lập của một lớp. Mặc định tất cả các đối tượng kế thừa từ lớp Object, nhưng nó là một các thức tuyệt vời để ghi đè chúng.

```
import lombok.EqualsAndHashCode;

@EqualsAndHashCode
public class User {
  
  private String username;
  private String email;
  private String firstName;
  private String lastName;
}
```

### @ToString
Một annotation thú vị khác đó chính là @ToString cái nhằm ghi đè các phương thức nhằm trả về text mô tả về lớp. Thông thường nó sẽ có giá trị với tất cả các fields. Sử dụng Lombok chúng ta có thể sinh ra nó bằng cách sử dụng một annotation duy nhất và nó bạn cần loại bỏ một vài cái trong số chúng bạn cần cung cấp thêm tham số ***exclude***. Giống như các tham số của phương thức, chúng ta cần truyền vào tên của field.

```
import lombok.ToString;

@ToString(exclude="email")
public class User {
  
  private String username;
  private String email;
  private String firstName;
  private String lastName;
}
```

### @NoArgsConstructor
Annotation cuối cùng cái cần được đề cập nhằm sử dụng cho quá trình sinh tự động constructor không tham số của lớp. Mặc định Java compiler sẽ thêm nó vào cho bạn trừ khi bạn đã triển khai bất cứ một constructor nào khác. Ví dụ, nếu bạn định nghĩa constructor cái có một vài tham số điều đó có nghĩa là compiler sẽ không tự động thêm vào constructor không tham số cho bạn. Bạn cần thực hiện nó trong mã nguồn của mình. Và đó là lý do chúng ta có thể sử dụng annotation này.

```
import lombok.NoArgsConstructor;

@NoArgsConstructor
public class User {
  
  private String username;
  private String email;
  private String firstName;
  private String lastName;
}
```

### Other annotations
Các annotations bên trên cái cũng ta cần để sử dụng cho project của mình. Nhưng cũng có một vài cái tuyệt vời khác như:
* @NonNull: Annotation này loại bỏ sự cần thiết phải thêm vào các phương thức kiểm tra giá trị của field có null hay không.
* @Log: Có một vài biến thể khi sử dụng nó. Nói một cách đơn giản nó tạo ra một đối tượng Logger cho chúng ta(Có thể là một biến thể Log4J2).
* @Data: annotation này kết hợp @Getter, @Setter, @ToString, @EqualAndHashCode và @RequiredArgsConstructor vào làm một. Kết quả cuối cùng là chúng ta sẽ có một constructor với tất cả các tham số là final fields.

## Apply to the our project
### Step 1: Install Project Lombok plugin
Đối với các IDE xây dựng trên nền tảng của Intellij chúng ta có thể cài đặt plugin này một cách dễ dàng thông qua Marketplace. Hoặc bạn cũng có thể tìm thấy plugin này thông qua trang [web chính thức](https://projectlombok.org/setup/intellij).

### Step 2: Add dependencies
Thêm vào file build.gradle của bạn:

```
compileOnly 'org.projectlombok:lombok:1.16.20'
```

### Step 3: Annotate model class
Sau khi đã tạo một vài model classes cái được đánh dấu với các annotations cần thiết. Ví dụ bên dưới là User Class, cái được thiết lập với các thức chuẩn(gettters/setters, equals, no argument constructor, nhưng phương thức toString() không nên show ra password(Cái mặc dù đã được mã hóa, nhưng vẫn không phải là một ý tưởng tốt nếu chúng ta để lộ nó).

```
@Getter
@Setter
@EqualsAndHashCode
@ToString(exclude="password")
@NoArgsConstructor
public class User {

	private int id;
	
	private String username;
	
	private String password;
	
	private String email;
	
	private boolean enable;

	private String firstName;

	private String lastName;

	private String phone;

	private Date birthday;
	
	private String address;

	private String postalCode;
	
	private String city;
	
	private Timestamp recordCreated;

}
```

## Another use case
Chúng ta cũng có thể sử dụng một số annotation của Lombok nhằm bỏ qua việc tính toán coverage trong ứng dụng Android bằng jacoco.
Lý do là vì từ Jacoco 0.8.0, coverage tool này có thể bỏ qua mã nguồn được sinh ra từ Lombok. Điều này dẫn đến việc bạn có thể sử dụng @lombok.Generated annotaion để bỏ qua một số phương thức, hoặc class trong quá trình tính toán coverage của jacoco một cách nhanh chóng + tiện lợi.

Bạn có thể tham khảo thêm ở [đây](https://www.rainerhahnekamp.com/en/ignoring-lombok-code-in-jacoco/).

## Source
https://medium.com/@wkrzywiec/project-lombok-how-to-make-your-model-class-simple-ad71319c35d5

## Reference
[Ignoring Lombok Code in Jacoco](https://www.rainerhahnekamp.com/en/ignoring-lombok-code-in-jacoco/). <br />
[How to write less and better code, or Project Lombok](https://codeburst.io/how-to-write-less-and-better-code-or-project-lombok-d8d82eb3e80a).

## P/S
Những bài đăng trên viblo của mình nếu có phần ***Source*** thì đây là một bài dịch từ chính nguồn được dẫn link tới bài gốc ở phần này. Đây là những bài viết mình chọn lọc + tìm kiếm + tổng hợp từ Google trong quá trình xử lý issues khi làm dự án thực tế + có ích và thú vị đối với bản thân mình. => Dịch lại như một bài viết để lục lọi lại khi cần thiết.
Do đó khi đọc bài viết xin mọi người lưu ý:
#### 1. Các bạn có thể di chuyển đến phần source để đọc bài gốc(extremely recommend).
#### 2. Bài viết được dịch lại => Không thể tránh khỏi được việc hiểu sai, thiếu xót, nhầm lẫn do sự khác biệt về ngôn ngữ, ngữ cảnh cũng như sự hiểu biết của người dịch => Rất mong các bạn có thể để lại comments nhằm làm hoàn chỉnh vấn đề.
#### 3. Bài dịch chỉ mang tính chất tham khảo + mang đúng ý nghĩa của một translated article được request từ phía cty mình.
#### 4. Hy vọng bài viết có chút giúp ích cho các bạn(I hope so!). =)))))))