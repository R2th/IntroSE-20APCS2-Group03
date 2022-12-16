## 1. Tổng quan
Trong bài viết này, chúng ta sẽ tìm hiểu cách sử dụng @JsonFormat trong Jackson. Nó là một Jackson annotation được sử dụng để chỉ định cách định dạng các trường hoặc thuộc tính cho đầu ra JSON.

Cụ thể, annotation này cho phép bạn chỉ định cách định dạng giá trị Date  và Calendar  theo định dạng SimpleDateFormat.

## 2. Maven Dependency
@JsonFormat được định nghĩa trong gói jackson-databind, vì vậy chúng ta cần Maven Dependency sau:
```
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.11.1</version>
</dependency>
```

## 3. Bắt đầu
### 3.1. Sử dụng Định dạng Mặc định
Để bắt đầu, chúng ta sẽ trình bày các khái niệm sử dụng chú thích @JsonFormat với một lớp đại diện cho người dùng.

Vì chúng ta đang cố gắng giải thích chi tiết của annotation, đối tượng User  sẽ được tạo theo yêu cầu (và không được lưu trữ hoặc tải từ cơ sở dữ liệu) và được tuần tự hóa thành JSON:
```
public class User {
    private String firstName;
    private String lastName;
    private Date createdDate = new Date();

    // standard constructor, setters and getters
}
```

Xây dựng và chạy ví dụ này trả về kết quả đầu ra sau:

```
{"firstName":"John","lastName":"Smith","createdDate":1482047026009}
```

Như bạn có thể thấy, trường createdDate được hiển thị dưới dạng số giây là định dạng mặc định được sử dụng cho các trường Date .

### 3.2. Sử dụng chú thích trên Getter
Bây giờ chúng ta hãy sử dụng @JsonFormat để chỉ định định dạng mà trường Date tạo sẽ được tuần tự hóa. Đây là lớp User được cập nhật cho thay đổi này. Trường Date tạo đã có annotation để định dạng ngày.

Định dạng dữ liệu được chỉ định bởi SimpleDateFormat:
```
@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
private Date createdDate;
```

Với sự thay đổi này, chúng ta sẽ chạy lại nó. Kết quả được hiển thị bên dưới:
```
{"firstName":"John","lastName":"Smith","createdDate":"2016-12-18"}
```

Như bạn có thể thấy, trường createdDate đã được định dạng bằng cách sử dụng SimpleDateFormat được chỉ định bằng cách sử dụng annotation @JsonFormat.

Ví dụ trên minh họa việc sử dụng chú thích trên một trường. Nó cũng có thể được sử dụng trong một phương thức getter (một thuộc tính) như sau.

Ví dụ, bạn có thể có một thuộc tính đang được tính toán trên lệnh gọi. Bạn có thể sử dụng chú thích trên phương thức getter trong trường hợp như vậy. Lưu ý rằng mẫu cũng đã được thay đổi để chỉ trả về phần ngày của thời điểm:
```
@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
public Date getCurrentDate() {
    return new Date();
}
```
Kết quả đầu ra như sau:
```
{ ... , "currentDate":"2021-12-18", ...}
```
### 3.3. Chỉ định Shape
Sử dụng @JsonFormat với hình dạng được đặt thành JsonFormat.Shape.NUMBER dẫn đến kết quả đầu ra mặc định cho các loại Date - dưới dạng số, pattern  không áp dụng cho trường hợp này và bị bỏ qua:
```
@JsonFormat(shape = JsonFormat.Shape.NUMBER)
public Date getDateNum() {
    return new Date();
}
```

Kết quả đầu ra như sau:

```
{ ..., "dateNum":1482054723876 }

```
### 3.4. TimeZone
Thuộc tính TimeZone của chú thích @JsonFormat chỉ định TimeZone, ví dụ: múi giờ IST, EST, PST, v.v. rất hữu ích trong việc tuần tự hóa
```
@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd, timezone="EST")
public Date getCurrentDate() {
    return new Date();
}
```

Kết quả đầu ra như sau:

```
{ ... , "currentDate":"2021-12-18 EST"}

```
## 4. Kết luận
Tóm lại, @JsonFormat được sử dụng để kiểm soát định dạng đầu ra của các loại Date và Calendar như đã trình bày ở trên.

Tài liệu tham khảo: https://www.baeldung.com/jackson-jsonformat#maven-dependency