## Chỉ định truy cập là gì?
Chỉ định truy cập (visibility modifier, access modifiers,...) là một khái niệm không gắn với bất kỳ ngôn ngữ lập trình cụ thể nào. Nó là một từ khoá đi theo với 1 khai báo để xác định phạm vi có thể được nhìn thấy (truy cập). Chỉ định truy cập biểu hiện cho tính chất đóng gói trong lập trình hướng đối tượng.

Có 4 chỉ định truy cập trong Kotlin: **private**, **protected**, **internal** và  **public**. Chỉ đinh truy cập mặc định trong Kotlin là **public**

### Private
Các khai báo được đánh dấu với chỉ định truy cập **private** có thể được truy cập ("nhìn thấy") bên trong file/class chứa khai báo
![](https://images.viblo.asia/00c58db6-ba6a-4b66-a77b-c0e9962a9317.png)

### Protected
Các khai báo được đánh dấu với chỉ định truy cập **protected** có thể được truy cập ("nhìn thấy") bên trong file chứa khai báo và các class con (subclasses). **protected** không được phép cho các khai báo top-level.

![](https://images.viblo.asia/712e4c3b-5405-40df-9555-c9372f885bfc.png)

### Internal
Các khai báo được đánh dấu với chỉ định truy cập **internal** có thể được truy cập ("nhìn thấy") mọi nơi trong cùng 1 module.
1 module là 1 tập các file Kotlin được biên dịch cùng với nhau
* IntelliJ IDEA module
* Maven project
* Gradle source set
* 1 tập các file được biên dịch với 1lệnh <kotlinc> Ant task

![](https://images.viblo.asia/7cf49570-afe0-4327-bb97-7e8dfc87c30a.png)

![](https://images.viblo.asia/c6ce88fe-b9dc-4b62-8284-9b4206778af6.png)

![](https://images.viblo.asia/0ca429f4-d465-45ee-ba9a-483e9a600704.png)

### Public
Các khai báo được đánh dấu với chỉ định truy cập **public** có thể được truy cập ("nhìn thấy") mọi nơi. **public** là chỉ định truy cập mặc định trong Kotlin (1 khai báo mà không có chỉ định truy cập thì mặc định là **public**)

![](https://images.viblo.asia/cd0e9e94-bd81-4a9f-9fde-5dbe5f260b2a.png)

![](https://images.viblo.asia/d679af07-1293-4a60-b718-c924d7570448.png)

### Chỉ định truy cập cho hàm khởi tạo (Constructor)
Hàm khởi tạo chính (primary constructor) của 1 class có chỉ định truy cập mặc định là **public**.  Hàm khởi tạo không bao giờ có chỉ định truy cập yếu hơn class của nó.
Ta có thể khai báo rõ ràng 1 chỉ định truy cập cho hàm khởi tạo chính

![](https://images.viblo.asia/eb968d16-045d-4865-ac72-f0cf2556293b.png)


### Ghi đè phương thức protected
Khi ghi đè 1 phương thức **protected**, chỉ định truy cập mặc định của phương thức bị ghi đè cũng là **protected**, không phải **public**

![](https://images.viblo.asia/25cbeb53-cbdb-4519-95ce-12e1b3f7f0e0.png)

```
// OverridenFromAnotherFile.kt

// Error: getAge() is not visible because is protected
val userAge = User().getAge()

// Error: getAge() is not visible because inherits the protected modifier
val moderatorAge = Moderator().getAge()

// getAge() is visible because the modifier is declared explicitly as public
val staffAge = Staff().getAge()
```


> **Access modifiers (or access specifiers) are keywords in object-oriented languages that set the accessibility of classes, methods, and other members. Access modifiers are a specific part of programming language syntax used to facilitate the encapsulation of components. — Wikipedia**

## Java vs Kotlin
Chỉ định truy cập trong Kotlin gần như tương tự với Java, tuy nhiên có 1 số điểm khác biệt:
* Trong Kotlin, chỉ định truy cập mặc định là **public**, có trong Java nếu không khai báo chỉ định truy cập, chỉ định truy cập **default** được sử dụng (có thể truy cập trong cùng lớp và các lớp thuộc cùng package)
* Chỉ định truy cập **private** cho package trong Java không có giá trị tương tương trong Kotlin, kiểu gần nhất với nó là **internal**
* Các class và interface có thể **private** trong Kotlin
* Outer class không thể truy cập các thành viên private của inner class trong Kotlin
* Trong Kotlin nếu bạn ghi đè thành viên **protected** và không chỉ định rõ ràng chỉ định truy cập, thành viên ghi đè cũng sẽ có chỉ định truy cập **protected**. Trong Java, chỉ định truy cập là trong trường hợp này là **public**.

## Ý nghĩa trong Android

![](https://images.viblo.asia/568ab1dc-d52e-4de4-9ba7-c3f5d8293af5.png)

1. **public** hiếm được sử dụng hơn: 
 -  Thực tế là internal là 1 phiên bản bị hạn chế của public đã làm giảm việc sử dụng của public. public chỉ được mong muốn sử dụng khi bạn muốn truy cập qua các module. Nếu trong trường hợp project ứng dụng của bạn chỉ chứa 1 app module, thì public là vô ích.
 -  Trong trường hợp bạn thực sự cần sử dụng public (bạn cần truy cập thông qua các module), bạn không cần phải xác định chỉ định truy cập public vì nó là mặc định (với ngoại lệ được đề cập ở trên khi muốn đặt chỉ định truy cập cho phương thức được ghi đè từ phương thức protected)
 -  public gần như là chỉ định truy cập ít phổ biến hơn trong code Kotlin, và việc gõ public trong code là rất hiếm.

2. Các package trở lên ít liên quan
- Các package là vấn đề lớn trong Java. Chỉ định truy cập mặc định của package là private, và 1 nửa chỉ định truy cập là liên quan đến package. Việc này có tác động lớn đên việc đóng gói và cấu trúc của các dự án Java.
- Các package trong Kotlin thậm chí không được xem xét khi xử lý với các chỉ định truy cập. Không chỉ định truy cập nào xem xét đến khái niêmj package.
- Ngoài ra do tính đồng nhất và cú pháp ngắn gọn của Kotlin, các khai báo top-level trong cùng 1 file trở nên phổ biến.

> open class User(val userId: Int, val userName: String)
> 
> class Editor(userId: Int, userName: String, val rank: Int) : User(userId, userName)
> 
> class Moderator(userId: Int, userName: String, val type: Int) : User(userId, userName)
> 
> class Staff(userId: Int, userName: String, val department: String) : User(userId, userName)
> 

- Để dễ đọc, đoạn code trên tốt hơn nên cùng trong 1 file chứ không phải 4 file khác nhau. Điều này không phải lúc nào cũng đúng trong java với bẩn chất dài dòng của ngôn ngữ.
- Các file giảm bớt ở 1 mức độ là sự càn thiết cảu các cây package (phổ biến trong Java) làm cho cấu trúc proẹct phẳng và ít lộn xộn hơn

3. **protected** trở nên phù hợp hơn
- protected trong Kotlin không liên quan đến package. Nó chỉ liên quan đến class/interface hiện tại và các class con. Điều này làm cho protected trở nên trực quan và được sử dụng nhiều hơn. 

4. **internal** mọi nơi
- Các package private không tồn tại trong Kotlin, public hiếm được sử dụng (như đề cập ở trên). Vì vậy, ta sử dụng gì khi **private** và **protected** là không đủ? **internal**
- Trong các dự án Android với 1 module duy nhất, thì **internal** sẽ cực kì phổ biến. Với 1 module duy nhất, chỉ định truy cấp thông qua module là không cần thiết, vì vậy public là vô ích. Do đó internal được sử dụng mọi nơi khi mà protected và private không được sử dụng.

- *Đợi 1 chút, vậy sự khác biệt giữa **public** và **internal** trong 1 project với chỉ 1 module app là gì?*

------> Câu trả lời là không khác gì cả.

- *Vậy **public** là kiểu mặc định là ta không phải gõ nó, tại sao ta không nên sử dụng **public** mà phải viết **internal** khắp nơi?*

-------> Đầu tiên, như 1 quy tắc để thực hiện đóng gói tốt, ta nên luôn luôn cố gắng sử dụng các chỉ định truy cập hạn chế hơn nếu có thể. Thứ 2, trong trường hợp ta bắt đầu thêm nhiều module vào project, public và internal sẽ là sự khác biệt lớn và là rắc rối khiến thực hiện đóng gói trở nên không tốt.

5. .**internal** có thể cực kỳ hữu ích
- Khi xử lý với các dự án nhiều module, internal là chỉ định truy cập rất thuận tiện. Nó làm cho mọi thứ hiển thị ở mọi nơi trong module hiện tại, nhưng không thể thấy ở các module khác. **public** và **internal** trong 1 module xác định biện giới giữa API của module và các chi tiết triển khai. Điều này đặc biệt quan trọng với các nhà phát triển thư viện, nơi mà biên giới cần xác định rất rõ ràng. 

## Tổng kết
- Kotlin không tạo ra chỉ định truy cấp mới hoàn toàn.  Chúng rất giống với bất kỳ ngôn ngữ sử dụng chỉ định truy cập nào khác và chỉ khác 1 chút so với Java.

- Chỉ định truy cập được sử dụng để tạo điều kiện cho việc đóng gói, và điều này nên luôn được ghi nhớ mợi lúc. Các khai báo mà sử dụng chỉ định truy cập lỏng hơn cần thiết thường được coi là sử dụng kém chỉ định truy cập. Các chỉ định truy cập nên sửu dụng chặt chẽ nhất có thể.

- Có 1 số ý kiến cho rằng nên cho **internal** là chỉ định truy cập mặc định trong Kotlin !?

## References
https://en.wikipedia.org/wiki/Access_modifiers

https://kotlinlang.org/docs/reference/visibility-modifiers.html

http://tutorials.jenkov.com/java/access-modifiers.html

https://discuss.kotlinlang.org/t/kotlins-default-visibility-should-be-internal/1400

https://discuss.kotlinlang.org/t/another-call-for-package-private-visibility/9577