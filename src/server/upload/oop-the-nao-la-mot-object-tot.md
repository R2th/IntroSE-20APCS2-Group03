Martin Fowler nói rằng:
> Library là một tập các functions, nó thường được nhóm lại thành các class.

Các funtions được nhóm thành class? Đây là một quan điểm sai lầm, đáng nói là nó rất phổ biến khi mọi người hiểu sai về khái niệm class trong lập trình hướng đối tượng. Class không phải là một tập các functions, và Object không phải là một cấu trúc dữ liệu.

Vậy thế nào là một object tốt? Làm thế nào để viết một chương trình hướng đối tượng? Thật không may mắn đây không phải là một môn khoa học nên có rất nhiều ý kiến khác nhau. Dưới đây là các tiêu chí cho một Object tốt theo quan điểm của tôi:

**Class vs. Object**

Trước khi nói về Object, hãy định nghĩa thế nào là một class. Class là nơi mà các object được sinh ra. Vai trò chính của một class là khởi tạo các object mới khi cần sử dụng hay huỷ object khi nó không còn được sử dụng nữa. Một class sẽ định nghĩa các hành vi object của nó. Nghe có vẻ chung chung lý thuyết. Ok, chúng ta sẽ nói về Object.

1. **He Exists in Real Life**

Một object là một thực thể sống, tồn tại trong thế giới thực, nó cũng có hành vi giống như con người, con vật. Object không phải là một cấu trúc dữ liệu hay một tập các functions. Thay vào đó nó là một thực thể độc lập có chu kỳ sống (life cycle), hành vi (behavior) và các thói quen (habits).

Một nhân viên, một căn hộ, một http request, một table trong Mysql, một line trong một file hay một file đều là các object vì chúng tồn tại trong thế giới thực.

Một controller, parser, filter, validator, service locator, singleton for factory không phải là các object tốt vì chúng không tồn tại trong thế giới thực. Chúng chỉ được tạo ra với mục đích liên kết các objects khác, chúng là các object nhân tạo, không thể hiện cho bất cứ thực thể thực tế nào. Một XML parser - sẽ đại diện cho ai? không ai cả. 

Một vài trong số các object ở trên có thể trở thành các object tốt nếu đổi tên. Ví dụ đổi tên XML parser thành `parseable XML` nó biểu diễn cho một XML document.

Luôn luôn tự hỏi "Trong thế giới thực thì object có tồn tại hay không?" Nếu bạn không thể tìm ra câu trả lời thì hãy bắt đầu nghĩ về refactoring nó.

2. **He Works by Contracts**

Một object tốt sẽ luôn làm việc bởi `contract` hay `interface`. Do đó tất cả các object cài đặt các `contract` hay `interface` này thì đều có thể thay thế cho nhau được. Tưởng tưởng khi chúng ta giao việc cho ai đó làm, miễn là anh ta có thể làm những gì theo yêu cầu, không cần quay tâm đến nguồn gốc, giới tính hay tôn giáo.

Ví dụ: chúng ta muốn hiển thị một photo trên màn hình, photo này sẽ được đọc từ file PNG.
Có thể tạo một contract thông qua interface đọc nội dung của một file ảnh trả về các byte, mà không cần quan tâm nội dung của file đến từ đâu: trên Disk,  từ HTTP request hay có thể là một document trên Dropbox. Tất cả những gì chúng ta quan tâm là object có thể trả về một byte array.
Đây là interface:

```java
interface Binary {
  byte[] read();
}
```

Bây giờ thì bất cứ object nào implement interface `Binary` có thể sử dụng được, 

Nguyên tắc rất đơn giản: Mọi public method của một `good` object nên được implement từ một interface. Nếu Object có public method mà không được inherit từ bất kỳ interface nào thì object đó được thiết kế tồi.

Có 2 lý do cho lập luận ở trên:
* Object làm việc mà không tuân theo contract thì không thể mock trong một unit test
* Một `contract-less` object thì khó extend sử dụng `decoration`

3. **He Is Unique**

Một object tốt luôn có những đặc tính để nó trở thành duy nhất Nếu object không có gì để đóng gói, chúng sẽ có những bản clone giống y hệt, đây rõ ràng là một thiết kế tồi. Ví dụ về một object tồi:

```java
class HTTPStatus implements Status {
  private URL page = new URL("http://www.google.com");
  @Override
  public int read() throws IOException {
    return HttpURLConnection.class.cast(
      this.page.openConnection()
    ).getResponseCode();
  }
}
```

Có thể khởi tạo các object  giống hệt nhau từ class `HTTPStatus`:

```java
first = new HTTPStatus();
second = new HTTPStatus();
assert first.equals(second);
```

Đây rõ ràng giống với một utility class, là class chỉ có các static method, không thể tạo ra các object tốt. Nói chung là các utility class không có các yếu tố cần thiết trong bài viết này để có thể coi là các `class`. Tuy nhiên chúng được lạm dụng quá mức trong các ngôn ngữ lập trình hướng đối tượng hiện đại chỉ vì các tác giả cho phép sử dụng static method trong class.

4. **He Is Immutable**

Một object tốt sẽ không bao giờ thay đổi các state đã được đóng gói. Nói cách khác chúng là các `immutable object`. Nhớ rằng, một object đại diện cho một thực thế trong thế giói thực, thực thể này luôn không thay đổi trong suốt vòng đời sống của nó. Ở đây `immutability` không có nghĩa là tất cả các method luôn luôn trả về cùng giá trị ở các thời điểm khác nhau, thay vì đó một immutable object sẽ không bao giờ thay đổi các `internal state`. Ví dụ:

```java
@Immutable
final class HTTPStatus implements Status {
  private URL page;
  public HTTPStatus(URL url) {
    this.page = url;
  }
  @Override
  public int read() throws IOException {
    return HttpURLConnection.class.cast(
      this.page.openConnection()
    ).getResponseCode();
  }
}
```

Mặc dù method `read()` có thể về các giá trị khác nhau vì response code có thể thay đổi, tuy nhiên object này vẫn là một` immutable object` vì state của nó là thuộc tính `this.page` sẽ không bao giờ thay đổi, chỉ được khởi tạo một lần duy nhất ở constructor.

Vậy tại sao một object nên immutable? Đây là các lý do:

* Đơn giản để khởi tạo, test và sử dụng.
* Thread-safe vì state không thể bị thay đổi bởi các thread khác nhau
* No side-effects.
* Cache dễ dàng vì state không đổi nên không phải chăm chăm lo reload lại cache.

Rõ ràng là một object tốt sẽ không có các setter vì setter làm thay đổi state của object. Ở ví dụ trên nếu có `setURL()` method sẽ là một sai lầm khi thiết kế class  `HTTPStatus`.

5. **His Class Doesn't Have Anything Static**

Static method là các method của class chứ không phải của Object. Giả sử chúng ta có một class `File` và một instance method `size()`:

```java
final class File implements Measurable {
  @Override
  public int size() {
    // calculate the size of the file and return
  }
}
```
method `size()` implement contract `Measurable`, mọi object của class `File` đều có thể biết được size của file đó, đây là một thiết kết tốt tuân theo các tiêu chỉ đã đề cập phía trên. Một cách thiết kế tồi khá phổ biến cho vấn đề trên chính là dùng static method, hay được gọi là các utility class rất phổ biến trong các ngôn ngữ Java, Ruby ...

```java
// TERRIBLE DESIGN, DON'T USE!
class File {
  public static int size(String file) {
    // calculate the size of the file and return
  }
}
```

Cách thiết kế này đi ngược với tư tưởng lập trình hướng đối tượng. Vì sao? vì các static method biến `object-oriented programming` thành `class-oriented programming`. Method size() được access thông qua class, không phải các object. Bạn có thể đặt câu hỏi, tại sao lại không thể kết hợp cả static method và instance method?

Vấn đề nằm ở chỗ với `class-oriented programming` chúng ta không thể sử dụng decomposition do đó không thể chia nhỏ các vấn đề phức tạp vì chỉ có một class tồn tại trong suốt chương trình.
Điểm mạnh của OOP là nó cho phép chúng ta sử dụng các objects để chia vấn đề thành các scope nhỏ hơn. Khi khở tạo một object bên trong một method, object này sẽ là một biến local trong scope của method, tuy nhiên với class và các static method của nó thì nó luôn là biến global, nên khó kiểm soát sự thay đổi. Method static cũng có những điểm dở khác:

* Khó Mock khi viết unit test.
* Không thread-safe vì nó có thể được truy nhập từ tất cả các thread.

6. **His Name Is Not a Job Title**

Tên của một object nói cho chúng ta biết object đó là gì, chứ không phải object đó làm gì. Giống như trong cuộc sống thực:  book instead of page aggregator, cup instead of water holder, T-shirt instead of body dresser. Tất nhiên có một vài ngoại lệ như: printer, computer, tên của chúng được phát minh gần đây bởi tác giả chưa kịp đọc bài viết này (:joke).

An apple, a file, a series of HTTP requests, a socket, an XML document, a list of users, a regular expression, an integer, a PostgreSQL table là những object được đặt tên hợp lý, vì chỉ nghe đến cái tên chúng đa cũng mường tượng được object đó là gì, sẽ làm gì.

Đây là những object được đặt tên không tốt: a file reader, a text parser, a URL validator, an XML printer, a service locator, a singleton, a script runner, or a Java programmer. Vì những tên này mô tả các object làm gì chứ không phải là gì. Đặt tên object không tốt dẫn đến thiết kế tồi.
Nói chung là tránh đặt tên object cò suffix là `-er`, vì hầu hết đó là những tên không phù hợp.
 
Vậy với class `FileReader` thì nên đặt một cái tên nào đó tốt hơn? `FileWithData` hay đơn giản là  `DataFile` có thể là những lựa chọn cho bạn.

Kết luận: Luôn đặt tên object có nghĩa, tồn tại thực thay vì đặt job title cho object đó.

7.  **His Class Is Either Final or Abstract**

Một object nên được tạo ra từ Final class hoặc Abstract class. Một final class không thể được extend từ các class khác, một abstract class thì không thể khởi tạo các instance object.
Nói một cách đơn giản về class:

> "You can never break me; I'm a black box for you" or "I'm broken already; fix me first and then use."

Tức là một object được tạo từ một class mà nó không bao giờ bị extend hay inherit. Hãy xem xét đoạn code dưới đây:

```java
class OnlyValidStatus extends HTTPStatus {
  public OnlyValidStatus(URL url) {
    super(url);
  }
  @Override
  public int read() throws IOException {
    int code = super.read();
    if (code >= 400) {
      throw new RuntimeException("Unsuccessful HTTP code");
    }
    return code;
  }
}
```

OnlyValidStatus extends từ HTTPStatus với mục đích overwrite lại hàm `read()`  từ class cha.
Có điều gì đó không ổn ở đây? Với việc overwrite lại hàm read, vô tình nó sẽ làm hỏng toàn bộ logic của class cha, vì tất cả các method của lớp cha sẽ tham chiếu đến method `read()` mới này.

Trong trường hợp này có thể sử dụng decorator patterns coi class cha như một `black box`, để không phá vỡ logic của class cha:

```java
final class OnlyValidStatus implements Status {
  private final Status origin;
  public OnlyValidStatus(Status status) {
    this.origin = status;
  }
  @Override
  public int read() throws IOException {
    int code = this.origin.read();
    if (code >= 400) {
      throw new RuntimeException("Unsuccessful HTTP code");
    }
    return code;
  }
}
```
Nếu bạn không sử dụng từ khoá final, bất cứ ai(gồm cả bạn) sẽ có thể extend class. Vì vậy một class mà không có từ khoá final là một bad design.

Tương tự, với abstract class, là những class chưa được hoàn thiện, cần chúng ta phải viết thêm source code cho những phần mà abstract class đó cho phép, đó là các `abstract methods`

```java
abstract class ValidatedHTTPStatus implements Status {
  @Override
  public final int read() throws IOException {
    int code = this.origin.read();
    if (!this.isValid()) {
      throw new RuntimeException("Unsuccessful HTTP code");
    }
    return code;
  }
  protected abstract boolean isValid();
}
```

Tóm lại là một class hoặc là final hoặc là abstract, chỉ vậy thôi không có ngoại lệ khác.

Reference:
https://www.yegor256.com/2014/11/20/seven-virtues-of-good-object.html