Sau một thời gian làm việc với Java, mình đã tích góp được kha khá kinh nghiệm khi gặp NullPointerException, đây là một lỗi vô cùng khó nhận thấy (dòng họ RuntimeException - chỉ xảy ra khi chương trình đang chạy) và không phải lúc nào nó cũng xảy ra. Vì vậy bài viết này mình sẽ chia sẻ về NullPointerException và một số bí quyết dùng để phòng tránh lỗi này trước khi chương trình bị crash 😀

## 1. NullPointerException là gì?

Bằng lời đơn giản, NullPointerException là một Ngoại lệ xảy ra khi bạn gọi các hành động trên một biến tham chiếu mà đang không trỏ đến đối tượng nào. Vấn đề này cực kì hay gặp trong Java vì ngoại trừ biến nguyên thủy (primaritive variable) thì tất cả các đối tượng khác đều là biến tham chiếu (reference variable) Và như ở trên mình có viết là không phải lúc nào nó cũng xảy ra, cùng xem đoạn code sau:

```java
List<String> studentNames = studentService.getAllStudentNames();
System.out.println("We got " + studentNames.size() + " student names");
``` 
Nếu may mắn (và là do code của bạn quyết định), `studentNames` sẽ trả về list không rỗng và đoạn code trên hoàn toàn tốt 😙 But... What if studentNames has null value? Chương trình của bạn crash ngay lập tức, lý do chúng ta gọi phương thức `size` trong khi list đang `null`.

> Note: một số IDE có cơ chế nhắc nhở khá hay như IntelliJ sẽ đặt ngay cái 💡 to đùng để soi sáng cho bạn nhìn ra Exception trước khi quá muộn. Nhưng như mình nêu, không phải lúc nào nó cũng xảy ra và bóng đèn cũng xuất hiện.

Okay, mình để ví dụ có vẻ dễ phát hiện lỗi nhưng nếu bạn đang là Java dev chắc chắn cũng đã nếm trải những biến thể mạnh gấp 1000 lần như này rồi. Tiếp theo chúng ta sẽ đi qua 1 số "Vaccine" mà mình dùng để phòng ngừa Exception này.

## 2. Vaccine #1: Try Catch (TC)

Không chỉ riêng NullPointerException, TC là liều vaccine hiệu quả cho mọi RuntimeException trong Java, TC giúp bạn đặt 1 cái "bẫy" đơn giản để bắt tụi Exception và đảm bảo cái bẫy này luôn thành công, mình sẽ tiêm TC cho đoạn code ví dụ như sau

```java
try {
   List<String> studentNames = studentService.getAllStudentNames();
   System.out.println("We got " + studentNames.size() + " student names");
} catch(NullPointerException ex) {
   System.out.println("Caught a NullPointerException by TC vaccine!");
}
```

Đánh đổi sự đơn giản sẽ là code của bạn cồng kềnh hơn và làm phức tạp hóa vấn đề trong trường hợp việc xảy ra Exception này không quá quan trọng, chẳng hạn khi `studentNames` là `null` thì chỉ cần bỏ qua dòng code gọi `size`. Mặc dù vậy, TC vẫn rất hay được dùng để hỗ trợ logging, trace bug dễ dàng hơn.

## 3. Vaccine #2: If Else (IE)

Vaccine này mình nghĩ là được ưa chuộng nhất trong các pet project, bởi vì nó đơn giản hơn TC rất nhiều nhưng vô cùng hiệu quả với những case không quan trọng hóa Exception

```java
List<String> studentNames = studentService.getAllStudentNames();
if(studentNames != null) {
   System.out.println("We got " + studentNames.size() + " student names");
}
```

Is anything wrong? IE xứng đáng là vaccine của mọi dev 🎉

## 4. Vaccine #3: Optional

Loại này được thêm vào trong Java 8, mình tình cờ gặp khi làm việc với Spring Framework, cụ thể với các method của JPA để lấy ra 1 đối tượng (findBy...) thì đều được hứng trong Optional.

```java
String userName = studentService.getUserNameById(anyLong()); // will return null

// If style
if(userName == null) {
   throw UserNameNotFound();
}
...
// Optional style
Optional.ofNullable(userName).orElseThrow(UserNameNotFound::new);
```

Với Optional, chúng ta có cú pháp ngắn hơn và... và code gọn 😆 Thật ra khi tìm hiểu Optional bạn sẽ thấy còn có nhiều phương thức hay ho khác để tập trung xử lí cho tụi Maybe type (cái kiểu mà phải if else tới 💀 ấy) 

Tại sao mình không lấy tiếp ví dụ ở 2 loại vaccine trước? căn bản là Optional không được design để cồng kềnh như vậy 🤣. Mình có thể lấy được `size` an toàn **không** dính `null` mà không dùng 2 vaccine trước bằng cách:

```java
// apache.commons.collections4
int size = CollectionUtils.size(userNames);
```

Những package Util cực kì có ích như StringUtils, CollectionUtils, ListUtils sẽ giúp chúng ta làm bớt việc nên bạn hãy tận dụng nó nhé (đa số đều có cơ chế xử lí null perfect !!!).

## 5. Tổng kết

Vậy là mình đã điểm qua một số loại vaccine (hoàn toàn FREE) để giúp các dev ngăn ngừa con bug NullPointerException đầy khó chịu này, nếu bạn đã chế tác/ tìm ra loại vaccine hay "kháng thể" nào khác thì chia sẻ cho mọi người nhé.

Happy coding!

My original post: https://phatng.com/vaccine-ngua-nullpointerexception-trong-java

## 6. References
1. Almost refer to my experience. My blog:  [phatng.com](https://phatng.com/) 
2. Guide To Java 8 Optional -  [https://www.baeldung.com/java-optional](https://www.baeldung.com/java-optional)