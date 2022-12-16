# A. Introduction

Trong khi chương trình hoạt động, có thể có nhiều lỗi phát sinh. Một số lỗi đơn giản, có thể dự đoán được như input không hợp lệ, chia cho 0, truy cập ngoài mảng,... thì chúng ta có thể nhanh chóng fix bằng cách thêm một vài câu lệnh if để validate và thông báo lại cho người dùng.

```App.java
// Validate chia cho 0
if (b == 0)
    System.out.println("Không thể chia cho 0");
else
    System.out.println(a / b);

// Validate tuổi nhập sai
if (age < 0)
    System.out.println("Tuổi phải lớn hơn 0");

// Validate truy cập ngoài mảng
if (pos >= a.length())
    System.out.println("Chỉ số bạn nhập vượt ra ngoài mảng");
```

Tuy nhiên, còn rất nhiều lỗi khác không thể lường trước, và số lượng lỗi khá nhiều nên không thể validate từng trường hợp được. Do đó, người ta đưa ra một cơ chế tốt hơn để xử lý chúng, gọi là exception handling - xử lý ngoại lệ.

Một lỗi phát sinh được gọi với tên là exception (ngoại lệ). Khi lỗi xảy ra, thì exception tương ứng được "ném ra", và exception có thể được "bắt lại" để xử lý. Cơ chế chung là vậy, chúng ta sẽ đi sâu vào trong các phần sau.

Ưu điểm của exception handling có thể kể tới như sau:

* Có khả năng bắt toàn bộ lỗi phát sinh
* Phân loại và có cách xử lý phù hợp với từng loại lỗi
* Kiến trúc code tốt hơn, ngắn gọn hơn
* Cung cấp các hành động nâng cao như chuyển tiếp lỗi tới exception handler khác.

Ngoài những exception mặc định, lập trình viên có thể tự định nghĩa exception riêng để sử dụng.

# B. Try catch finally

## 1. Overview

Java cung cấp cấu trúc `try catch finally` để "bắt" những exception được ném ra (bởi hệ thống hoặc do code tự ném ra).

```App.java
try {
    // Các lệnh có thể gây lỗi
} catch (ExceptionA e) {
    // Khi ExceptionA ném ra thì thực hiện...
} catch (ExceptionB e) {
    // Khi ExceptionB ném ra thì thực hiện...
} catch (Exception e) {
    // Các exception còn lại được ném ra, thì thực hiện...
} finally {
    // Thực hiện anh này cuối cùng
}
```

Nhìn vào code trên, có thể thấy rõ cấu trúc `try catch finally` gồm 3 phần:

* Phần `try` (bắt buộc có): những đoạn code có khả năng gây lỗi, đúng hơn là có thể ném ra exception thì đặt vào đây.
* Phần `catch` (có thể có nhiều hoặc không có `catch` nào): mỗi phần `catch` đi kèm với một loại exception. Khi exception ném ra khớp với loại được định nghĩa trong `catch` nào, thì code trong catch đó thực thi. Nếu không khớp thì `catch` cuối cùng của Exception class sẽ được gọi (nếu có).
* Phần `finally` (có thể bỏ qua): phần này nếu có sẽ luôn được gọi cuối cùng, ngay cả khi return method hoặc break (trừ khi chương trình bị dừng).

Chú ý, nếu viết dạng không có `catch` thì phải có `finally`.

```App.java
try {
    ...
} finally {
    ...
}
```

## 2. Flow

Sau đây là luồng đi của khối lệnh `try catch finally`:

1. Code trong `try` được thực thi
2. Nếu không có lỗi, thì nhảy vào `finally` (nếu có) và thực hiện, rồi xong.
3. Nếu có một câu lệnh trong `try` ném ra lỗi, thì `try` dừng ngay lập tức (không chạy nữa), và nhảy vào khối `catch` tương ứng (chỉ một khối)
4. Khối `catch` tương ứng với class exception ném ra sẽ được thực thi, sau đó nhảy vào `finally` (nếu có), cuối cùng xong.

Siêu đơn giản luôn, cứ nhớ `try` là thực hiện code, có lỗi thì nhảy vào `catch` tương ứng, nếu không thì đi tiếp. Khối `finally` (nếu có) luôn được chạy sau cùng, mặc kệ kết quả có lỗi hay không.

# C. Throw

## 1. Throw keyword

Method khi thực hiện mà phát sinh lỗi, thì nó có thể "ném" ra một exception, để thông báo rằng nó bị lỗi gì đó và kết quả không thành công.

Việc ném ra một exception được thực hiện bằng từ khóa throw (không có s). Và throw ném ra một exception object, nên thường dùng `throw new Exception` như sau.

```App.java
class TinhToan {
    public static double chia(double a, double b) {
        if (b == 0)
            // Ném ra lỗi với message
            throw new Exception("Không thể chia cho 0");
        else
            return a / b;
    }
}
```

## 2. Throws keyword

Method `chia()` có thể ném ra exception, hoặc nói bên trong nó có lệnh `throw`, vì thế nên chúng ta cần đánh dấu nó là một method Throwable. Code sửa lại phần khai báo một chút như sau.

```App.java
public static double chia(double a, double b)
    throws Exception {
    ...
}
```

Từ khóa `throws` (chú ý có `s`) phía sau danh sách params của method, kèm theo một danh sách các exception class, sẽ cho biết method này sẽ có thể ném ra một trong các exception được chỉ định. Ví dụ.

```App.java
public void doSomeThing()
    throws FileNotFoundException, NetworkErrorException {
    ...
}
```

Method `doSomeThing()` trên sẽ ném ra một trong 2 exception là `FileNotFoundException` hoặc `NetworkErrorException`.

Exception được ném ra có thể là exception class có sẵn, hoặc do người lập trình tự định nghĩa.

# D. Exception class

## 1. Exception & error

Exception đại diện cho một lỗi xảy ra khi chương trình hoạt động. Về bản chất, exception cũng chỉ là một object của class Exception hoặc kế thừa từ nó. 

Có 2 loại exception:

* Checked: những exception không phải RuntimeException và Error. Được kiểm tra tại thời điểm compile time.
* Unchecked: exception kế thừa từ RuntimeException. Không được kiểm tra ở compile time mà ở runtime.

Ngoài exception còn có error, khác biệt ở chỗ error thường nghiêm trọng hơn, và không nên bắt hoặc xử lý error. Chương trình nên dừng lại để đảm bảo an toàn.

Cả Exception và Error đều kế thừa từ class Throwable. Có thể xem thêm sơ đồ bên dưới để hiểu rõ hơn.

![](https://images.viblo.asia/5c9b3563-9e8e-458c-991e-19d5c495d617.png)

## 2. Exception members

Có hai method quan trọng thường dùng của exception object. Đầu tiên là `getMessage()` để lấy chuỗi message của exception.

```App.java
String getMessage();
void printStackTrace();
```

Method thứ 2 là `printStackTrace()`, dùng để in ra call stack, hiểu đơn giản là thứ tự các câu lệnh dẫn tới exception (thứ tự này đi ngược, từ lệnh bị lỗi trở về trước).

## 3. My exception

Từ những exception cơ sở trên, bạn có thể tự tạo thêm những exception tùy chỉnh bằng việc kế thừa các class Exception trên và ghi đè lại constructor như sau.

```java
class MyException extends Exception {
    ...
    public MyException(String message) {
        super(message);
        ...
    }
}
```

# E. Assertion

Một kĩ thuật khá hay trong debug là assertion. Về cơ bản, chúng ta gắn cho một biểu thức (biến, hằng,...) một điều kiện mà ta chắc chắn đúng. Khi chạy tới vị trí đó, nếu điều kiện cho kết quả sai, nghĩa là code bị sai. Một error với tên AssertionError được ném ra.

Ví dụ như code sau, kiểm tra hàm `sum()` có hoạt động đúng hay không. 

```java
public static int sum(int a, int b) {
    // Mình cố ý làm sai
    return a + b + 1;
}

public static void main(String[] args) {
    ...
    assert sum(2, 3) == 5 : "Hàm sum() có bug";
    // Điều kiện trên nếu code đúng sẽ luôn đúng, vì 2 + 3 = 5
    // nếu khi chạy điều kiện trên sai, thì chứng tỏ code sai
}
```

Khi chạy đoạn code trên, thì kết quả điều kiện assert là false, do đó suy ra code có vấn đề và kết quả cho ra một exception như sau.

```
Exception in thread "main"
java.lang.AssertionError: Hàm sum() có bug;
```

Chú ý assertion mặc định không được bật. Để bật nó, sử dụng thêm flag `-ea` (enable assertion) cho java command khi chạy.

```
java -ea Program
```

Hầu hết các IDE cho java đều hỗ trợ tham số này, dưới dạng flag kèm theo hoặc trực tiếp vào setting luôn. Có thể tìm hiểu thêm cách cấu hình từng IDE cụ thể trên google.