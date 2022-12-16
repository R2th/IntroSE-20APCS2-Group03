Nguồn: https://medium.com/androiddevelopers/android-data-binding-express-yourself-c931d1f90dfe

Như đã tìm hiểu trong bài viết trước, Android Studio cho phép chúng ta gán các giá trị của biến trong tệp layout. Ví dụ, text firstName của user được đặt bằng biểu thức:
```
android:text="@{user.firstName}"
```
Class User class được khai báo dưới dạng một Plain Old Java Object (POJO):
```
public class User {
    public String firstName;
    public String lastName;
    public Bitmap image;
}
```
Thông thường, chúng ta tránh việc sử dụng các trường public, mà thay vào đó là sử dụng accessor. Tuy nhiên trong biểu thức mà dev cứ phải thêm một tá getFirstName() và getLastName() thì biểu thức sẽ bị khó đọc hơn. Để giải quyết vấn đề này, trình phân tích cú pháp biểu thức tự động sẽ tìm các accessor trong Java Bean với tên getXxx() hoặc isXxx() của các property. Nếu class có accessor thì vẫn sẽ chạy bình thường.
```
public class User {
    private String firstName;
    private String lastName;
    private Bitmap image;

    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public Bitmap getImage() { return image; }
}
```
Nếu trình phân tích không thể tìm thấy phương thức nào có tên getXxx(), nó cũng sẽ tìm một phương thức có tên xxx(), vì vậy bạn có thể sử dụng user.hasFriend để truy cập phương thức hasFriend().
Cú pháp biểu thức Android Data Binding cũng support truy cập array với ngoặc vuông như trong Java:
```
android:text="@{user.friends[0].firstName}"
```
Các bạn cũng có thể gọi nhanh phương thức get của list và map bằng cách sử dụng dấu ngoặc vuông.
Hầu hết các biểu thức trong java như method call, toán tử bậc ba và các phép toán đều được hỗ trợ, nhưng đừng vì thế mà các bạn làm quá đà như thế này:
```
android:text='@{user.adult ? ((user.male ? "Mr. " : "Ms. ") + user.lastName) : (user.firstName instanceof String ? user.firstName : "kid") }'
```
Không ai có thể đọc nổi cái đống đấy. Và chưa nói đến đám string hardcode, thì việc maintain nó đã là địa ngục rồi. Đừng tự mua dây buộc mình và hãy đưa các biểu thức phức tạp vào trong modal để sau này bạn không phải thốt lên "mình viết cái gì thế này".
Ngoài ra, có một toán tử kết hợp null ?? để rút gọn các biểu thức bậc ba đơn giản:
```
android:text=”@{user.firstName ?? user.userName}”
```
về bản chất giống như
```
android:text=”@{user.firstName != null ? user.firstName : user.userName}”
```
Một cái nữa rất hay mà bạn có thể làm với các binding expressions là việc sử dụng resources:
```
android:padding=”@{@dim/textPadding + @dim/headerPadding}
```
Tính năng này sẽ đỡ cho bạn việc khai báo một đống giá trị riêng biệt, và sẽ cực tiện nếu bạn hay phải cộng hoặc trừ dimension. Vấn đề duy nhất là nó không (chưa) hỗ trợ style.
Bạn cũng có thể sử dụng định dạng chuỗi, số lượng và phân số theo cú pháp từ các phương thức Tài nguyên getString, getQuantityString và getFraction. Bạn chỉ cần pass các param làm arg vào trong resource.
```
android:text=”@{@string/nameFormat(user.firstName, user.lastName)}”
```

### NullPointerException
Một điều rất tiện lợi là các biểu thức data binding luôn kiểm tra các giá trị null trong quá trình evaluation. Điều đó có nghĩa là nếu bạn có một biểu thức như:
```
android:text=”@{user.firstName ?? user.userName}”
```
Nếu người dùng là null, user.firstName và user.userName sẽ evaluate là null và text sẽ được đặt thành null. Không xảy ra NullPointerException.
Tuy nhiên thì điều này không có nghĩa là không bao giờ có NullPointerException. Ví dụ, nếu bạn có một biểu thức:
```
android:text=”@{com.example.StringUtils.capitalize(user.firstName)}”
```
Và StringUtils của bạn có:
```
public static String capitalize(String str) {
    return Character.toUpperCase(str.charAt(0)) + str.substring(1);
}
```
Bạn chắc chắn sẽ thấy NullPointerException khi giá trị null được chuyển sang viết hoa.

### Import
Trong ví dụ trên, biểu thức chuyển text sang viết hoa rất dài. Điều mà chúng ta thực sự muốn là có thể import kiểu để sử dụng như một biểu thức rút gọn. Chúng ta có thể làm điều này bằng cách import trong thẻ data.
```
<data>
    <variable
        name="user"
        type="com.example.myapp.model.User"/>
    <import
        type="com.example.StringUtils"/>
</data>
```
Giờ đây, biểu thức của chúng ta có thể được đơn giản hóa thành:
```
android:text=”@{StringUtils.capitalize(user.firstName)}”
```