**[Chương trình tính tống số nguyên java](https://tienanhvn.blogspot.com/2019/06/viet-chuong-trinh-tinh-tong-so-nguyen.html)**  là một bài toàn thường được sử dụng nhiều nhất trong các môn học lập trình cũng như trong thực tế, vì thế bài toàn này đòi hỏi chúng ta phải hiểu rỏ yêu cầu
của bài toán đặt ra là bạn hãy tính tổng số nguyên dương nhập từ bàn phím :
Ví dụ 123456 = 1+2+3+4+5+6 = 21
Hôm nay thủ thuật lập trình java sẽ sử dụng ngôn ngữ lập trình java để viết chương trình, chỉ cần thuật toán để tính tổng số nguyên còn ngôn ngữ nào cũng thế cả chỉ thay một số cú pháp.
# Thuật toán tính tổng số nguyên.

   Ta gắn giá trị tổng (sum = 0)
   Dòng vòng lặp while(n>0) khi n<= 0  thì vòng lặp kết thúc
   Trong vòng lặp while chúng ta thực hiện chia lấy dư và chia lấy phần nguyên
   Trả về kết quả số nguyên
#    Thực hiện chương trình tính tống bằng java như sau:
**Viết một hàm tính tổng.**
```java 
int tinhtong(int n){
  int sum =0 ;
  while(n >0){
   System.out.println("n%2 = " +n%10);
   sum = sum + n%10;
    n= n/10;
    System.out.println("n/2 = " +n);
  }
  return sum;
 }
```
** Khai báo hàm main.**
```java
public static void main(String args[]){
  System.out.println("Viet chuong trinh tinh tong so nguyen");
  int n = 26021991;
  Tinhtongsonguyen ttsn = new Tinhtongsonguyen();
  System.out.println("Tong so nguyen n = " + n + " la = " +ttsn.tinhtong(n));
 }
```
Toàn bộ chương trình tính tổng.
```java
package baitap3;
public class Tinhtongsonguyen {
int tinhtonpackage baitap3;
public class Tinhtongsonguyen {
  int tinhtong(int n){
  int sum =0 ;
  while(n >0){
   System.out.println("n%2 = " +n%10);
   sum = sum + n%10;
    n= n/10;
    System.out.println("n/2 = " +n);
  }
  return sum;
 }
  public static void main(String args[]){
  System.out.println("Viet chuong trinh tinh tong so nguyen");
  int n = 26021991;
  Tinhtongsonguyen ttsn = new Tinhtongsonguyen();
  System.out.println("Tong so nguyen n = " + n + " la = " +ttsn.tinhtong(n));
 }
}g(int n){
   int sum =0 ;
   while(n >0){
    System.out.println("n%2 = " +n%10);
    sum = sum + n%10;
     n= n/10;
     System.out.println("n/2 = " +n);
   }
   return sum;
  }
   public static void main(String args[]){
   System.out.println("Viet chuong trinh tinh tong so nguyen");
   int n = 26021991;
   Tinhtongsonguyen ttsn = new Tinhtongsonguyen();
   System.out.println("Tong so nguyen n = " + n + " la = " +ttsn.tinhtong(n));
  }
}
```