Trong lập trình hướng đối tượng chúng ta có 4 tính chất đó là tính Đóng Gói ( Encapsulation) , tính Kế Thừa (Inheritance) , tính Đa Hình (Polymorphism) và tính Trừu Tượng (Abstraction) 

Bài này chúng ta sẽ nói về Tính Đóng Gói ( Encapsulation)
* Tức là trạng thái của đối tượng được bảo vệ không cho các truy cập từ code bên ngoài như thay đổi trạng thái  .Việc cho phép các môi trường  bên ngoài tác động lên các dữ liệu  của một đối tượng phụ thuộc hoàn toàn vào người viết mã . Đây là tính chất đảm bảo sự toàn vẹn , bảo mật của đối tượng.
* Để cài đặt tính đóng gói , chũng ta có 2 bước :
 1. Khai báo các thuộc tính của đối tượng trong lớp là private để các lớp khác không thể truy cập , sửa đổi trực tiếp được
 2. Cung cấp các phương thức getter/setter có phạm vi truy cập là public để truy cập và sửa đổi giá trị trong lớp . Phương thức setter là phương thức truy cập vào thuộc tính của đối tượng và gán giá trị cho các thuộc tính của đối tượng đó(chú ý trong phương thức setter nếu truyền vào tham số cũng tên với thuộc tính thì hãy dùng từ khóa "this." để phân biệt) , còn phương thức getter là phương thức truy cập vào thuộc tính của đối tượng và lấy ra (trả về) giá trị các thuộc tính của đối tượng đó .

### Ví Dụ về Tính Đóng Gói (Encapsulation)
```java
Class: person.java
    package vidu;
          public class person{
    // khai bao các thuộc tính của đối tượng ( đang để dưới dạng private)
             private String name;
             private String cmnd;
     // tạo các phương thức getter/setter 
     // từ khoa this là  một tham chiếu đặc biệt giúp ta phân biệt đâu thuộc tính biến toàn cục , đâu là tham số
     public String getcmnd{
            return cmnd;
     }
      public void setCmnd(String cmnd) {
            this.cmnd = cmnd; 
    }
     public String getname() {
            return name;
    }
     public void setname(String name) {
             this.name = name;
    }
    }
    Class : testperson.java
    package vidu;
       public class testperson{
           public static void main(String[] args){
                 person person = new person();
                 person.setname("Vo Hoai Nam");
                 person.setcmnd("22224444");
           System.out.println("Ten:" + person.getname() + ", CMND:" + person.getcmnd());
          }
    
   }
```