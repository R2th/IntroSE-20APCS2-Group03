Khi chuyển từ Java sang Kotlin, chúng ta phải làm quen với 3 keywords: **var**, **val** và **const val**. Nếu 1 đối tượng quy định bởi **var** thì nó có thể thay đổi giá trị, nhưng **val** và **const val** đều không cho phép đối tượng thay đổi giá trị, vậy sự khác nhau của chúng là gì? Tại sao những nhà thiết kế lên ngôn ngữ Kotlin lại nghĩ ra 2 keyword này? Để tìm hiểu lí do đằng sau quyết định đó, chúng ta sẽ bắt đầu bằng việc xem Kotlin thực sự đã sinh ra đoạn code thế nào khi compile 1 đoạn code chứ từ khóa **val** và **const val**.

# Bước 1: Đọc bytecode
Giả sử ta khai báo 2 đối tượng sau trong file *ConstVal.kt*
```
val FANCY_VAL = 1
const val FANCY_CONST_VAL = 2
```
và tạo 1 class Java để gọi đến 2 đối tượng đó:
```
public class ConstValFromJava {

    public static void main(String[] args) {
        System.out.println(ConstValKt.getFANCY_VAL());
        System.out.println(ConstValKt.FANCY_CONST_VAL);
    }

}
```
Khi đó ta sẽ có 1 file chứa class Java được sinh ra từ Kotlin code trong file *ConstVal.kt* (Trong Android Studio, ta chọn Tools -> Kotlin -> Show Kotlin Bytecode để xem được file này):
```
public final class ConstValKt {

   private static final int FANCY_VAL = 1;
   public static final int FANCY_CONST_VAL = 2;

   public static final int getFANCY_VAL() {
      return FANCY_VAL;
   }
   
}
```
Ta thấy cả 2 đối tượng đều được định nghĩa **static final**, điểm khác biệt đó là **const val** được định nghĩa **public** còn **val** là **private** (kèm với một hàm getter được sinh ra)

# Bước 2: Compile
Bây giờ ta sẽ compile và chạy tất cả đoạn code trên để xem điều gì xảy ra.
Để nhìn được rõ từng bước, ở đây ta sẽ không dùng IDE để build và run code như bình thường, mà ta sẽ lần lượt gọi compiler của Kotlin và Java.
Đầu tiên, ta cần chạy lệnh sau trong terminal để Kotlin compiler sinh ra 1 file **.jar** từ file Kotlin:
```
> kotlinc ConstVal.kt -d constval.jar
```
Tiếp theo, ta compile file **ConstValFromJava.java** cùng file **.jar** vừa xong ra class Java bằng Java compiler
```
> javac -cp constval.jar ConstValFromJava.java
```
Khi đó ta sẽ có 1 file **ConstValFromJava.class** được sinh ra. Chạy file này bằng java ta sẽ có kết quả sau:
```
> java -cp constval.jar; ConstValFromJava
1
2
```
Kết quả được in ra là 1 và 2 như mong đợi.
Bây giờ hãy xem điều gì xảy ra nếu ta thay đổi giá trị trong file Kotlin và rebuild lại file **.jar

# Bước 3: Thay đổi giá trị trong file Kotlin
Ta thay đổi file **ConstVal.kt** như sau:
```
val FANCY_VAL = 3
const val FANCY_CONST_VAL = 4
```
và compile lại bằng Kotlin compiler:
```
> kotlinc ConstVal.kt -d constval.jar
```
Sau đó ta chạy lại file **ConstValFromJava.class** mà không compile lại bằng Java compiler, điều gì sẽ xảy ra?
```
> java -cp constval.jar; ConstValFromJava
3
2
```
Kết quả in ra là 3 và 2 chứ không phải 3 và 4 như chúng ta mong đợi!

# Giải thích: Inlined value
Kết quả không hề sai. Hãy xem file **ConstValFromJava.class**, chúng ta sẽ biết lí do tại sao:
```
public class ConstValFromJava {
    public ConstValFromJava() {
    }

    public static void main(String[] var0) {
        System.out.println(ConstValKt.getFANCY_VAL());
        System.out.println(2);
    }
}
```
so sánh nó với file Java ban đầu:
```
public class ConstValFromJava {
    public static void main(String[] args) {
        System.out.println(ConstValKt.getFANCY_VAL());
        System.out.println(ConstValKt.FANCY_CONST_VAL);
    }
}
```
Có thể thấy, mặc dù trong file Java chúng ta gọi tới đối tượng FANCY_CONST_VAL, trình biên dịch Java đã sinh ra file **.class** với giá trị **2** đưa thẳng vào dòng code (gọi là inlined value). Và bởi vì chúng ta không chạy Java compiler để sinh lại file **.class** nên giá trị đó vẫn giữ nguyên trong code. Đó là lí do ta thấy in ra kết quả 3 và 2 chứ không phải 3 và 4.

Như vậy, sự khác biệt giữa **val** và **const val** đó là:
- **val**: Không cần phải là 1 giá trị cố định sẵn trong code (hard code), tức là có thể định nghĩa trong Runtime. Trình compiler sẽ không đưa giá trị của val vào inline code trong quá trình biên dịch.
- **const val**: Phải là giá trị cố định sẵn trong code. Trình compiler sẽ đưa giá trị này vào inline code trong quá trình biên dịch. Nếu không xác định được giá trị cố định này, compiler sẽ báo lỗi.

Đây là lí do **const val**  không thể sử dụng với kiểu dữ liệu Object, vì compiler không thể xác định giá trị của nó trong Compile time.

Nó cũng dẫn tới 1 lưu ý cho chúng ta khi viết **library**: Những giá trị đã đặt **const val** nên **không bao giờ** thay đổi sau khi đã publish library và trong các bản nâng cấp sau này.

*Nguồn:* https://medium.com/@patxi/to-val-or-to-const-val-that-is-the-question-43ba428332cb