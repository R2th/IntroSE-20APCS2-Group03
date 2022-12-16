# Import là gì, tại sao cần import?
Giống như nhiều ngôn ngữ lập trình khác, để sử dụng các class trong Java chúng ta phải nói ra cần tìm kiếm những class đó ở đâu. Vậy làm sao nói cho Java biết tìm ở đâu? Dùng import đúng không. Chuẩn không cần chỉnh.

Từ khóa import trong java tương tự như include trong C hay using trong C#, nó cho phép chúng ta gọi các class, hàm từ nơi khác vào file source cần sử dụng.

Cú pháp:` import <fully_qualified_classname>;`

# Import với wildcard.
Trong quá trình viết code thì chúng ta ắt hẳn sẽ gặp trường hợp chúng ta cần import nhiều lần nhiều class trong cùng một package.

```
import java.util.List;
import java.util.ArrayList;
import java.util.Set;
import java.util.HashSet;
import java.util.Map;
import java.util.HashMap;
```
Thay vì import từng class một như trên chúng ta có thể dùng wildcard để rút ngắn số dòng code một cách đáng kể.

`import java.util.*;`
# import static.
Với từ khóa ***import*** chúng ta có thể import nhiều class hoặc một class cụ thể nhưng trong trường hợp bạn chỉ cần một vài trường *static fields* hay *static methods*. Lúc này chúng ta sử dụng *import static* để import những thành phần tĩnh của một class khác.

Bằng cách này, chúng ta không cần nhập class name khi sử dụng.

```
import java.lang.Math;
public class PackageDemo {
  public static void main(String[] args) {
    System.out.println("Gia trị gần đúng cua so PI la: "+ Math.PI); 
  }
}
```
```
import static java.lang.Math.PI;
public class PackageDemo {
  public static void main(String[] args) {
    System.out.println("Gia trị gần đúng cua so PI la: "+ PI);  // Sự khác biệt
  }
}
```
# Khi nào không cần import.
Khi viết code java sẽ có 2 trường hợp sau bạn không cần dùng từ khóa import mà vẫn gọi được những class khác đó là:

* Những class thuộc package java.lang
* Những Class cùng package với class hiện tại.
```
package com.javabasic.packagedemo;
public class PackageDemo {
  public static void main(String[] args) {
    System.out.println("Gia trị gần đúng cua so PI la: "+ Math.PI); 
  }
}
```
Ở đoạn code mẫu trên vì Math thuộc lớp *java.lang* nên chúng ta có thể gọi trực tiếp không cần từ khóa import.

# Xung đột class name khi import.
Trong java có rất nhiều class dựng sẵn và class do người dùng tự tạo vậy nên việc trùng tên class là điều không tránh khỏi.

Trước hết ngôn ngữ java không cho phép chúng ta import hai class cùng tên cho dùng chúng khác package.

Ví dụ kinh điển là java.sql.Date và java.util.Date. Bạn sẽ nhận ngay lời nhắn dễ thương từ compiler khi cố gắng import 2 thằng trên như sau:

*‘The import java.util.Date collides with another import statement’*


Vậy làm gì khi bạn cần sử dụng 2 class khác nhau nhưng trùng tên? Bạn là sử dụng tên đầy đủ của class cho cả hai class cần dùng hoặc bạn import một class và class còn lại bạn sử dụng với tên đầy đủ(fully qualified class name).
```

import java.sql.Date;
public class PackageDemo {
  public static void main(String[] args) {
    java.util.Date utilDate = new java.util.Date();
    
    Date sqlDate = new Date(utilDate.getTime());
  }
}
```
Lưu ý về độ ưu tiên:

```
import java.sql.*;
import java.util.Date;
public class PackageDemo {
  public static void main(String[] args) {
    Date sqlDate = null;
  }
}
```
Với đoạn code trên, theo bạn Date sẽ thuộc kiểu gì?

A: java.sql.Date

B: java.util.Date.


Trong trường hợp bạn import sử dụng wildcard và import sử dụng tên class đầy đủ thì cách thứ 2 sẽ được ưu tiên. Cái nào càng rõ ràng thì đáng được ưu tiên hơn đúng không nào!.

# Tham khảo:
bài viết đầy đủ: http://programmingsharing.com/2020/04/08/tat-tan-tat-ve-import-trong-java/