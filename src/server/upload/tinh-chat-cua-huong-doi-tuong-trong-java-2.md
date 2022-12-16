# I. Tính Kế Thừa (Inheritance)
## 1. Khái niệm tính kế thừa :
 là khả năng cho phép ta xây dựng một lớp mới dựa trên các định nghĩa của một lớp đã có . Lớp đã có gọi là lớp Cha , lớp mới phát sinh gọi là lớp Con kế thừa lại toàn bộ những gì lớp Cha có và có thể chia sẻ , mở rộng thêm các thuộc tính, câu mà mình luôn nhớ khi nói đến tính kế thừa là " những gì Cha có thì Con sẽ có , còn nhưng gì Con có thì chưa chắc Cha đã có".
## 2. Lợi ích của tính kế thừa
  * Lớp Con có thể tận dụng lại các thuộc tính và phương thức của lớp Cha(nghĩa là các thuộc tính và phương thức của lớp Cha có thể được tái sử dụng bởi lớp Con).
  * Lớp Con có thể định nghĩa thêm thuộc tính và phương thức mới của riêng nó và có thể định nghĩa lại (hay còn gọi là ghi đè phương thức, overriding) phương thức được kế thừa từ lớp Cha cho phù hợp với mục đích của nó.
 ## 3.Xây dựng lớp Con và Lớp Cha  trong tính Kế Thừa
 * Xây dựng lớp cha: những thông tin nào chung giữa các đối tượng (bao gồm thuộc tính và phương thức) thì chúng ta tập hợp lại tạo thành lớp cha.
* Xây dựng lớp con: những thông tin nào chỉ có trong từng đối tượng cụ thể thì chúng ta tập hợp lại tạo thành lớp con.
## Cú Pháp :
```
1. public class A { 
...
}


 2. public class B extends A {
    ...
}
```
## Ví Dụ :
```java
    package vidu;
    public class Calculation {
    protected int c;
    public void phepCong(int a, int b) {
        c = a + b;
        System.out.println("Tổng hai số = " + c);
    }
} 


     package vidu;
    public class MyCalculation extends Calculation{
    public void phepTru(int a, int b) {
        c = a - b;
        System.out.println("Hiệu hai số = " + c);
    }
    public static void main(String[] args) {
        int a = 5, b = 7;
        MyCalculation myCalculation = new MyCalculation();
        myCalculation.phepCong(a, b);
        myCalculation.phepTru(a, b);
}
```

**Sau khi class MyCalculation kế thừa từ class Calculation thì kết của trả về khi chạy  class MyCalculation sẽ có cả phepCong và phepTru**