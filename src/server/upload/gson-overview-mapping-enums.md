Bài  viết được dịch từ series Gson Overview trên [futurestudio.io](https://futurestud.io/tutorials/gson-advanced-mapping-of-enums)

## 
## Serialization Java Enums

Java enums là một data type hữu dụng. Chúng giúp giới hạn được các giá trị biến ở một khoảng nhất định. Vậy điều gì sẽ xảy ra khi serialize một Model có chứa enums sang JSON ?

Đầu tiên ta có ví dụ về Java enums như sau
```
public enum Day {  
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
}
```
Giả sử ta có một model có sử dụng enum này
```
public class UserDayEnum {  
    private String _name;
    private String email;
    private boolean isDeveloper;
    private int age;

    private Day day = Day.FRIDAY;
}  
```
Nếu chúng ta thực hiện serialize thì kết quả sẽ như thế nào ? Điều này có thể dễ dàng thử nghiệm nhưng nếu bạn cần một câu xác nhận thì câu trả lời đó là :
> Không cần config thêm gì cả, chỉ cần gọi toJson() thì Gson sẽ sử dụng giá trị của enums làm giá trị của JSON. Gson tự động làm mọi thứ trên cho bạn :)
```
UserDayEnum userObject = new UserDayEnum("Norman", "norman@fs.io", true, 26, Day.SUNDAY);
String userWithEnumJson = new Gson().toJson(userObject);
```
Kết quả
```
{
  "_name": "Norman",
  "age": 26,
  "day": "SUNDAY",
  "email": "norman@fs.io",
  "isDeveloper": true
}
```

## 
## Deserialization Java Enums

Quá trình deserialization thực hiện cũng tương tự, chỉ cần đơn giản gọi fromJson(). Gson sẽ tạo ra Java Object matching hoàn toàn với JSON sau 
```
{
  "email": "norman@futurestud.io",
  "age": 26,
  "day": "FRIDAY"
}
```
Có thể bạn đã biết, enums có chỉ định số thứ tự cho các enum value. Ví dụ nhưng trong enum DAY
thì MONDAY sẽ là 0, TUESDAY sẽ là 1 và tiếp tục tăng ứng với các giá trị sau. Gson chấp nhận các số thứ tự này và trong quá trình deserialization, nó sẽ match với enum value
```
{
  "email": "norman@futurestud.io",
  "age": 26,
  "day": 4
}
```
Dễ hiểu hơn thì trường hợp Json trên, Java Object được tạo ra sẽ có giá trị enum Day là FRIDAY

## 
## Customizing Enum (De)Serialization

Các giá trị enum không hẳn lúc nào cũng được đặt tên thích hợp. Ta sử dụng thêm @SerializedName để có thêm lựa chọn thay đổi tên của một trong các giá trị enums đó.
```
public enum Day {  
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    @SerializedName("LazyDay1") SATURDAY,
    @SerializedName("LazyDay2") SUNDAY
}
```
Ở trường hợp trên, nếu ta gọi 
```
 UserDayEnum userObject = new UserDayEnum("Norman", "norman@fs.io", true, 26, Day.SATURDAY);
 String userWithEnumJson = new Gson().toJson(userObject);
```
Kết quả sẽ là
```
{  
   "name":"Norman",
   "email":"norman@fs.io",
   "isDeveloper":true,
   "age":26,
   "day":"LazyDay1"
}
```