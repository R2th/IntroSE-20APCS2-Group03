Design pattern là những giải pháp có sẵn để giải quyết những vấn đề thường xuyên xảy ra trong quá trình phát triển phần mềm. Hôm nay, chúng ta cùng mổ sẻ Builder pattern. Một pattern cực kì phổ biến.

Khi sử dụng design pattern chúng ta sẽ đẩy nhanh được quá trình phát triển phần mềm.
# Giới thiệu
Design pattern chia làm 3 loại chính:
1. Creational Design Patterns:  Cung cấp những giải pháp để tạo các classes và objects (Singleton, Factory, Builder....).
2. Structural Design Patterns: Liên quan đến việc sắp xếp các classes và objects (Composite, Facade, Adapter...).
3. Behavioral Design Patterns: Cung cấp cho chúng ta cách để giao tiếp giữa các objects và classes (Command, Observer, Strategy...).
# Builder pattern
Builder pattern nằm trong  Creational Design Patterns, nó rất rõ ràng và dễ hiểu. Builder pattern cực kì hữu ích trong trường hợp mà class chứa nhiều tham số. Những tham số đó có thể bắt buộc hoặc không, đồng thời người dùng cũng không phải chỉ rõ thứ tự của các tham số truyền vào. 

Một ví dụ phổ biến trong Android là khi chúng ta tạo AlertDialog:
```
new AlertDialog.Builder(this)
   .setTitle("Design Patterns")
   .setMessage("Builder is awesome")
   .create();
```
Đó là một ví dụ phổ biến mà ta thường thấy. Bây giờ chúng ta cùng tự tạo một Builder class cho chính chúng ta:

Giả sử, chúng ta có class User:

```
public class User {
   private String firstName;
   private String lastName;
   private int age;
}
```
Bây giờ thay vì tạo class với hàm khởi tạo, chúng ta sẽ tạo instance của class thông qua Builder pattern như sau:

```
new User.Builder()
   .setFirstName("Lưu Văn")
   .setLastName("Thảo")
   .setAge(25)
   .create();
```
Nhưng chúng ta đã tạo class trên như thế nào?  Đầu tiên chúng ta cần tạo static class Buider bên trong User class. Trong Builder class sẽ có các phương thức để tạo User object. Chìa khóa ở đây của chúng ta là các method của class này trả về chính Builder class. Cùng nhìn vào ví dụ:

```
static class Builder {
   private String firstName;
   private String lastName;
   private int age;
 
   public Builder setFirstName(final String firstName) {
      this.firstName = firstName;
      return this;
   }
 
   public Builder setLastName(final String lastName) {
      this.lastName = lastName;
      return this;
   }
 
   public Builder setAge(final int age) {
      this.age = age;
      return this;
   }
 
   public User create() {
      return new User(this);
   }
}
```
Cho tất cả các tham số. Chúng ta đều có phương thức setter cho chúng. Điều khác biệt ở đây là phương thức trả về kiểu Builder. Ở cuối của class, chúng ta có phương thức sử dụng để tạo User class và trả về kiểu User.

Có một điều quan trọng ở đây là hàm khởi tạo của User đang được thiết đặt là private. Điều đó có  nghĩa là chúng ta không thể tạo class từ hàm khởi tạo mà phải thông qua Builder để tạo instance cho User.

Vậy là bây giờ chúng ta có thể tạo được User thông qua User.Builder() class rồi.
# Builder – one pro-tip
Phần thưởng cho bạn nào đủ kiên nhẫn đọc hết toàn bộ bài post này. Thay vì tự tay viết Builder class, chúng ta có thể sử dụng Android Studio để hỗ trợ việc này một cách nhanh chóng như sau:

Tất cả việc chúng ta cần làm chỉ là đặt con trỏ chuột tới hàm khởi tạo của class. Chuột phải: **Refactor ==> Replace Constructor with Builder**. Vậy là xong. Builder class được tự động tạo với tất cả các phương thức. Bạn chỉ việc sử dụng mà thôi. 
#  Kết luận
Builder pattern là một các tiếp cận rất tốt cho việc khởi tạo class. Đặc biệt với những class có nhiều tham số truyền vào: 3 hoặc 4 tham số, thậm chí là hơn. Mặc dù bạn phải mất thêm chút thời gian để tạo Builder class. Nhưng mà quá trình maintain sau này sẽ đỡ cực hơn rất nhiều.

Bài viết có tham khảo tại: https://www.thedroidsonroids.com/blog/design-patterns-in-android-builder