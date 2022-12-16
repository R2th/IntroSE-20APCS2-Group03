Khi lập trình bất cứ ngôn ngữ hay nền tảng nào, chắc chắn chúng ta sẽ sử dụng thêm các library hoặc các module bên thứ 3. Cách sử dụng, áp dụng chúng trong project thì đã được mô tả rõ ràng trong document của library, module đó. Trong bài viết lần này chúng ta sẽ thảo luận một số cách mà có thể customize lại library hoặc module đó sao cho phù hợp với project của mình.
Để đơn giản, chúng ta sẽ tạo một project nhỏ và một module nào đó nhé :D
Mình lấy một project có sẵn của mình là Notification, xong mình sẽ tạo một Java library (module) như hình nhé, mình đặt tên library là lib cho nhanh :D

![](https://images.viblo.asia/7411278e-7d89-461b-9fb9-4c1847d429cf.png)

App mình có package name là `simple.notification` và lib sẽ có package name là `simple.tuannt.lib`.

### Tạo source cho library
Chúng ta sẽ tạo một class có protected method và public class để sử dụng class đó trong library nhé

* protected method

```java
public class Action {
    protected void show(String name, int color) {
        // todo
    }
}
```

* public class

```java
public class PublicClass {
    public void show(String name) {
        Action action = new Action();
        action.show(name, 1);
    }
}
```

### Sử dụng lib
Sử dụng lib này thì quá đơn giản rồi

```java
PublicClass main = new PublicClass();
main.show("Thanh Tuan");
```

Tuy nhiên chúng ta sẽ thấy vấn đề ở đây là `luôn luôn mặc định color của hàm show() là 1`. Vậy chúng ta sẽ làm như nào khi muốn tùy biến `tham số color` này mà function show(String, int) lại có access modifier `protected`.

### Chỉnh sửa lib

#### Cách 1 - Vào source chỉnh sửa trực tiếp code của library
Cách này mình thấy khá nhiều người dùng, trường hợp ở trên là library mình tạo ra nên chúng ta có thể dễ dàng vào source để chỉnh sửa. Tuy nhiên thực tế có rất nhiều lib ko phải của chúng ta, chúng ta cần download về mới chỉnh sửa được.

Với ví dụ trên, chúng ta chỉ việc sửa lại function show của `PublicClass`

```java
public void show(String name, int color) {
        Action action = new Action();
        action.show(name, color);
}
    
    // sử dụng
    PublicClass main = new PublicClass();
    main.show("Thanh Tuan", 123);
```

or chúng ta sửa function show của `Action` class

```java
public class Action {
    public void show(String name, int color) {
        // todo
    }
}

// sử dụng
Action action = new Action();
action.show(name, color);
```

Như vậy với trường hợp 2 chúng ta sẽ ko cần đến `PublicClass` nữa :D

#### Cách 2 - Tạo package tương tự và một class mới để sử dụng
Trong lập trình thông thường chúng ta khá hạn chế truy cập trực tiếp vào source code của một thư viện nào đó để sửa chữa, vì nó có thể sẽ gây ra lỗi mà chúng ta ko kiểm soát được (vì lib đấy ko phải của chúng ta viết ra). Một trường hợp khác là có nhưng library ko để open source nên chúng ta hoàn toàn ko thể download về để chỉnh sửa. Do vậy mình cũng khuyến khích nên sử dụng cách thứ 2 này :D

Với ví dụ trên, ở ứng dụng của mình, chúng ta cũng tạo ra một package là `simple.tuannt.lib` như sau

![](https://images.viblo.asia/718f02c4-dcb0-4625-98da-82316ee0cc84.png)

Tiếp đến tạo một class mới, `ActionImpl` trong package vừa tạo

```java
public class ActionImpl {
    public void show(String name, int color) {
        Action action = new Action();
        action.show(name, color);
    }
}

// sử dụng
ActionImpl action = new ActionImpl();
action.show("Thanh Tuan", 2);
```

Vì Action và ActionImpl có cùng package `simple.tuannt.lib` nên ActionImpl hoàn toàn có thể sử dụng được function show() của Action class.

Như vậy chúng ta chỉ cần nhớ lại một chút về `Access modifier` là có thể tùy biến một cách dễ dàng hơn và ko cần chỉnh sửa trực tiếp source code của lib. 

Trên đây là một ví dụ nhỏ nhưng hy vọng phần nào các bạn hiểu được cách sử dụng một thư viện sao cho hiệu quả :D


#### Cảm ơn các bạn đã đọc bài viết. Happy coding!