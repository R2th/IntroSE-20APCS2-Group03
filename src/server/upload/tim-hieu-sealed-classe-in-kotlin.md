## 1. Giới thiệu

Chúng ta thường sử dụng enum trong project để định nghĩa các kiểu dữ liệu.
Nó giúp chúng ta định nghĩa các kiểu khác nhau cho cùng một kiểu cha.
Ngoài ra trong Kotlin còn có thể sử dụng sealed class.

Vậy thì sealed class nó có lợi ích gì khác so với enum class.

Rốt cuộc thì sealed class là cái gì ? Chúng ta hãy cùng nhau đi tìm hiểu nào.

Cùng hiểu khái niệm của sealed classes bằng việc hiểu sự khác biệt giữa nó với enum classes với một trường hợp thường gặp. 
Cùng nhau xem ví dụ bên dưới: 
**Result** là một enum class có 2 kiểu đó là Success và Error.
```
enum class Result(val data: String) {
    SUCCESS("Success"),
    ERROR("Error")
}
```

Enum rất hữu dụng. Nhưng chúng lại có những giới hạn. Ví dụ như với mỗi kiểu con của enum chỉ có thể là một biến hằng và nó không có trạng thái.
Đó là, Kiểu ERROR đang bị hard-code với giá trị là Error string, khi chúng ta làm một ứng dụng thực tế thì nó có rất nhiều trường hợp lỗi xảy ra. 
Điều này thì chúng ta không thể làm được ở Enum. Ngoài ra thì chúng ta không thể có các kiểu lớp con khác. Cái mà sẽ được thấy trong sealed class
Bây giờ không dài dòng nữa, chúng ta cùng nhau đi vào chi tiết sự vượt trội của sealed class thông qua ví dụ. 

## 2. Tại sao sealed class vượt trội hơn so với enum

Sealed classes cung cấp cho chúng ta sự linh hoạt khi chứa nhiều kiểu khác nhau của lớp con và chứa cả trạng thái của chúng. 

Điểm quan trọng cần lưu ý ở đây là các lớp con đang mở rộng các lớp Sealed phải là các lớp lồng nhau của lớp Sealed hoặc phải được khai báo trong cùng một file với sealed class.

Kiểu của enum là constants và vì vậy nó rất khó để duy trì các trạng thái khác nhau của đối tượng.

Ví dụ về class Enum Result ở trên. Chúng ta đang chỉ lưu trữ giá trị string cho enum. Nhưng nếu trong trường hợp lỗi. chúng ta muốn hiển thị 1 Exception gây ra lỗi. Thì điều đó không thể với enum vì nó không thể giữ trạng thái của kiểu.

```
enum class Result(val data: String) {
    SUCCESS("Success"),
   ERROR(val exception: Exception) // not possible
}
```

Các lớp con kế thừa từ một sealed class bao gồm các lớp thông thường, các lớp dữ liệu hoặc các sealed classes và có thể dễ dàng chứa trạng thái của lớp con.

Cùng xem 1 ví dụ: 
Đầu tiên, khai báo 1 class sealed Employee, bằng cách thêm từ khoá sealed vào trước class.

`sealed class Employee`

Nhân viên một công ty IT thì sẽ bao gồm : Giám đốc, quản lý, nhà phát triển ... Cụ thể như :
Manager (Name, age, list of reporting employees)
SeniorDev(Name, age, projects)

Chúng ta tiến hành tạo:

```
sealed class Employee
data class Manager(val name: String, val age: Int, val team: List<String>): Employee()
class SeniorDev(val name: String, val age: Int, val projects: Int): Employee()
```

Điều này không thể nếu chúng ta sử dụng enum.

## 3. So sánh sealed class với abstract class 

Bản thân các sealed class là trừu tượng và không thể được khởi tạo trực tiếp. Tới đây chúng ta sẽ đặt 1 câu hỏi rằng : Nếu các sealed class là trừu tượng theo mặc định, tại sao chúng ta không thể sử dụng một lớp abstract thay vì một sealed class ngay từ đầu ? 

Lợi ích ở đây là một abstract class có thể có những lớp kế thừa của chúng ở bất kỳ đâu trong dự án, trong khi một sealed class phải chứa tất cả các lớp kế thừa nó trong cùng một tệp.

Để giải thích rõ hơn về vấn đề này, nếu chúng ta cố gắng định nghĩa lớp SeniorDev kế thừa từ Employee ở một file khác, chúng ta sẽ gặp compile-time error. Đó là vì sealed class hạn chế số lượng kế thừa. Thay vì hạn chế đó sealed class cho phép ta khai báo các lớp con có các kiểu khác nhau. Ở đây, các lớp con có thể là data classes, ordinary classes (lớp thông thường), objects (Singleton in Kotlin) hoặc chính các sealed class. Để dễ hình dung hơn chúng ta cùng xem ví dụ bên dưới.

```
sealed class Employee
data class Manager(val name: String, val age: Int, val team: List<String>): Employee()
class SeniorDev(val name: String, val age: Int, val projects: Int): Employee()
object JuniorDev: Employee()
```

Tính trừu tượng rất khó quản lý. Nhưng một khi sử dụng sealed class sẽ giúp ta quản lý điều đó một cách rất thuận tiện.

```
val employee: Employee = SeniorDev(“Name”, 20, 10)

val message = when (employee) {
	is Manager -> {“section manager"}
	is SeniorDev -> {“senior"}
	Junior -> {“junior"}
}
```

Thông thường khi sử dụng với when ta sẽ bắt những trường hợp còn lại với từ khoá else, nhưng nếu đối tượng đó là một biểu hiện của sealed class thì không cần thiết.

Giả sử chúng ta sử dụng abstract ở trường hợp này, IDE sẽ yêu cầu ta khai báo từ khoá else. Bởi vì abstract class cho phép định nghĩa các class con ở những file khác của project. Vì vậy IDE không thể kiểm soát được tất cả. Nó là một điểm giới hạn của abstract class so với sealed class.

Quay lại ví dụ về Result ban đầu thường được dùng tương tự trong các dự án. Giờ chúng ta viết lại chúng bằng sealed class như sau: 

```
sealed class Result {
	data class Success(val data: Data): Result()
	data class Error(val exceptiom: Exception) : Result()
}
```

Chúng ta có 2 data class: 
* Success kèm theo giá trị data.
* Error chứa những trạng thái của lỗi.

Sealed class giúp chúng ta viết code rõ ràng, ngắn gọn hơn và một số trường hợp sẽ giúp giảm bớt tính trừu tượng. 

### Tham khảo:
**Nguồn mindorks**: https://link.sun-asterisk.vn/3ddPoi

**Kotlin**: https://kotlinlang.org/docs/reference/sealed-classes.html