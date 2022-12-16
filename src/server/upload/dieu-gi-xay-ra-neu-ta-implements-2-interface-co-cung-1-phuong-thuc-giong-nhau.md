*Xin chào mọi người, chắc hẳn chúng ta cũng không xa lạ gì với interface bởi vì nó được áp dụng quá nhiều trong lập trình. Nhưng đối với 1 số bạn sinh viên, intern hoặc thậm chí fresher thì có vẻ interface vẫn còn lạ lẫm (lạ lẫm về cách áp dụng nó vào thực tế). Ai cũng biết interface nó giống như 1 bản thiết kế, 1 cái khuôn cho những class kế thừa nó, nghĩa là nó chỉ cần khai báo các phương thức, sự kiện và các class implement nó sẽ phải định nghĩa lại toàn bộ các phương thức đó. Vậy có khi nào bạn đặt ra câu hỏi là nếu ta cùng implement 2 interface và trong 2 interface đó đều có 1 method trùng tên chưa? Bây giờ hãy cùng mình tìm hiểu nhé...*

##  Định nghĩa về interface
Trước khi bắt đầu thì ta cùng ôn lại tí kiến thức về **Interface** nhé.

**Interface** là một **abstract type** trong java, nó bao gồm các hành vi mà các lớp triển khai nó bắt buộc phải thực hiện. Nó được nhận biết bằng từ khóa **interface**. Các phương thức trong **interface** là public và abstract. Từ java 8 thì chúng ta có thể define và implement các **static method**.
```
public interface Vehicle {
    
    // regular / default interface methods
    
    static int getHorsePower(int rpm, int torque) { //Java 8
        return (rpm * torque) / 5252;
    }
}
```

Hãy nhớ rằng 1 **interface** không phải là 1 lớp. Khi chúng ta triển khai 1 **interface** thì bắt buộc phải thực hiện các method trong **interface** đó:
```
interface Animal(){
    void voice();
}
class Cat implements Animal{
    @Override
    public void voice(){
         System.out.println("meow");
    }
}
```
Ok giới thiệu qua như vậy, các bạn muốn biết chi tiết về **interface** hơn thì đọc [đây](https://docs.oracle.com/javase/tutorial/java/concepts/interface.html) nhé. Bây giờ vào vấn đề chính thôi.
## Nếu cùng implement 2 interface và trong 2 interface đó đều có 1 method trùng tên
Bây giờ mình có 2 Interface **Person** và **Cat**, cả 2 interface này đề có method là voice. Mình có 1 class là TranDucBo sẽ implement 2 interface đó như sau:

```
 interface Person  { 
     void voice();
 }
 
 interface Cat { 
     void voice();
 }
 
 class TranDucBo implements Person, Cat{
      @Override
      public void voice(){
          System.out.println("mèo méo meo mèo meo");
      }
 }
```
Bạn thử đoán xem nếu mình call hàm voice trong class TranDucBo thì điều gì sẽ xảy ra?
Kết quả:
```
public static void main(String[] args) {
    TranDucBo nhiMuBu = new TranDucBo();
    nhiMuBu.voice();         // mèo méo meo mèo meo
    Person person = new TranDucBo();
    person.voice();          // mèo méo meo mèo meo
    Cat cat = new TranDucBo();
    cat.voice();            // mèo méo meo mèo meo
}
```
Bạn chỉ cần @Override 1 phương thức voice() là đủ. Và nó không quan trọng bạn làm gì với TranDucBo, dù với tư cách là **Person** hay **Cat** thì nó vẫn chỉ có 1 phương thức để gọi. Nhưng bạn có để ý thấy điều gì đặc biệt ở đây không? Đó chính là cả 2 phương thức **voice()** trong **Person** và  **Cat** đều là **void**. Chúng ta gọi **Person.voice()** và **Cat.voice()** là @Override-equivalent. Vậy nếu chúng ta implements 2 phương thức không phải @Override-equivalent thì điều gì sẽ  xảy ra? 
```
interface Person  { 
     void voice();
 }
 
 interface Cat { 
     String voice();
 }
 
 class TranDucBo implements Person, Cat{ //// DOES NOT COMPILE!!!
  // "types InterfaceTest.Person and InterfaceTest.Cat are incompatible;
   //  both define voice(), but with unrelated return types"
      @Override
      public void voice(){
          System.out.println("mèo méo meo mèo meo");
      }
 }
```
Khi này trình biên dịch sẽ báo lỗi compile. Điều này nhắc cho chúng ta khi kế thừa interface thì phải tuân theo quy tắc khai báo.Ở đây chúng ta có **Person** và **Cat** định nghĩa voice() với các kiểu trả về không tương thích: **void** và **String**. Vì lý do này mà bạn không thể sử dụng void voice () và String voice () trong một kiểu, ví dụ này dẫn đến lỗi biên dịch.

## Tổng kết
Bạn có thể kế thừa các interface có cùng phương thức nhưng với điều kiện phải là @Override-equivalent. Vì chúng là @Override-equivalent nên chỉ có 1 method để triển khai và không có gì để phân biệt/lựa chọn. Trình biên dịch không phải xác định phương thức nào dành cho **Interface** nào, bởi vì một khi chúng được xác định là @Override-equivalent, chúng cùng một phương thức.
### Tham khảo thêm
[JLS 8.4.2 Method Signature](https://docs.oracle.com/javase/specs/#8.4.2)

[JLS 8.4.8 Inheritance, Overriding, and Hiding
](https://docs.oracle.com/javase/specs/#8.4.8)

[JLS 8.4.8.3 Requirements in Overriding and Hiding](https://docs.oracle.com/javase/specs/#8.4.8.3)

[JLS 8.4.8.4 Inheriting Methods with Override-Equivalent Signatures](https://docs.oracle.com/javase/specs/#8.4.8.4)