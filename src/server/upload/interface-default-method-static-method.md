Java 8 đã giới thiệu về default method & static method trong interface. Những tính năng này cho phép thêm những function vào trong interface mà không ảnh hưởng đến các lớp triển khai.
### Default method
Để khai báo default method, sử dụng từ khóa default trước method trong interface
```java
public interface ActionIF1 {
    void eat();
    default void printAction() {
        System.out.println("ActionIF1--printAction method");
    }
}
```
Khi triển khai:
```java
public class ConMeo implements ActionIF1 {
    @Override
    public void eat() {
        .......
    }
}
```
hoặc có thể override cả default method:
```java
public class ConMeo implements ActionIF1 {
    @Override
    public void eat() {
        eatCom();
    }

    @Override
    public void printAction() {
        System.out.println("ConMeo--printAction------------->>");
    }
}
```
Nếu 1 class implement 2 interface trở lên mà có default method giống nhau thì bắt buộc phải override lại default method đó:
```java
public interface ActionIF2{
    void sleep();
    default void printAction(){
        System.out.println("ActionIF2--printAction method");
    }
}
```
```java
public class ConMeo implements ActionIF1, ActionIF2 {
    @Override
    public void eat() {
        eatCom();
    }

    @Override
    public void sleep() {
        ngủnướng();
    }

    @Override
    public void printAction() {
        System.out.println("ConMeo--printAction");
    }
}
```
### Static method
Để khai báo static method, sử dụng từ khóa static trước method trong interface
```java
public interface ActionIF1 {
    void eat();
    default void printAction() {
        System.out.println("ActionIF1--printAction method");
    }
    static void staticMethod(){
        System.out.println("From static method with love");
    }
}
```
static method gắn liền với Interface đó, chỉ có thể truy cập bằng cách gọi ActionIF1.staticMethod() và không thể override.

**Note:** Có thể có nhiều default & static method trong một interface
### Thanks for reading