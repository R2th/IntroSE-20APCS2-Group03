Interface là 1 thành phần không thể thiếu trong Java. Kể từ khi ra đời, inteface đã trải qua nhiều quá trình thay đổi.
# Từ Java 7 trở về trước
Từ Java 7 trở về trước, Java chỉ cho phép định nghĩa constant và abtract method trong inteface:
```
package com.company;

public interface Caculator {
    String CONSTANT_NAME = "CONSTANT_NAME";
    int add(int a, int b);
}
```
# Java 8
Một trong những thay đổi lớn ở Java 8 là việc cho phép định nghĩa thân hàm bằng việc sử dụng default hoặc static.
1. default
```
package com.company;

public interface Caculator {
    public default int add(int a, int b) {
        return a + b;
    }
}
```
Tại sao phải dùng default: Giả sử rằng chúng ta có một vài class được implement từ 1 interface nào đó, rồi sau đó, có sự thay đổi requirement từ interface đó. Khi đó, đòi hỏi phải implement các method ở tất cả các class implement từ interface kia, điều này rất là mất công, do đó, việc ra đời `default` là để giải quyết các bất tiện trên.

2. static

Static method trong interface tương tự như default method, nhưng chỉ khác biệt chỗ là static method không cho phép các implement class overrid lại các method đó.

```
package com.company;

public interface Caculator {
    public default int add(int a, int b) {
        return a + b;
    }

    public static int sub(int a, int b) {
        return a - b;
    }
}
```

Tóm lại, trong Java 8 chúng ta có thể khai báo:
- Hắng số
- Các method ảo
- Default method
- Static method

# Java 9
Một trong những thay đổi lớn trong Java 9, là việc cho phép định nghĩa private method trong interface.
```
package com.company;

public interface Caculator {
    public default int add(int a, int b) {
        showLog();
        return a + b;
    }

    public static int sub(int a, int b) {
        return a - b;
    }

    private void showLog() {
        System.out.print("Running");
    }
}
```
Những điểm quan trọng trong private method  trong interface:
- Không thể sử dụng đồng thời private và abstract
- Private method bắt buộc phải có thân hàm.
- Không duplicate code, private method có thể tái sử dụng.
- Không thể expose các intent method 
Những lợi ích của việc sử dụng private method trong interface: