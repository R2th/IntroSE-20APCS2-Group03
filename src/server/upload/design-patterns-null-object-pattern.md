Trong đối tượng Null Object, một đối tượng null thay thế kiểm tra đối tượng NULL. Thay vì đặt nếu kiểm tra giá trị null, Null Object phản ánh mối quan hệ không làm gì cả. Object  Null này cũng có thể được sử dụng để cung cấp hành vi mặc định trong trường hợp dữ liệu không có sẵn. Trong Null Object pattern, chúng ta tạo một lớp trừu tượng xác định các hoạt động khác nhau sẽ được thực hiện , các classes cụ thể mở rộng lớp này và một null object class không cung cấp việc triển khai thực hiện lớp này và sẽ được sử dụng dường như không cần kiểm tra giá trị null.
# Thực hiện
Chúng ta sẽ tạo ra một lớp trừu tượng AbstractCustomer định nghĩa các opearations. Ở đây tên của khách hàng và các lớp cụ thể mở rộng lớp AbstractCustomer.Một factory class CustomerFactory được tạo ra để trả về các đối tượng RealCustomer hoặc NullCustomer dựa trên tên của khách hàng được truyền cho nó.
NullPatternDemo, lớp demo của chúng tôi, sẽ sử dụng CustomerFactory để chứng minh việc sử dụng mẫu Null Object.
![](https://images.viblo.asia/780a9d4e-4fa3-4290-a771-5249892c587b.jpg)
## Step 1
Tạo 1 lớp trừu tượng.
### AbstractCustomer.java
```
public abstract class AbstractCustomer {
   protected String name;
   public abstract boolean isNil();
   public abstract String getName();
}
```
## Step 2
Tạo các lớp cụ thể mở rộng lớp trên.
### RealCustomer.java
```
public class RealCustomer extends AbstractCustomer {

   public RealCustomer(String name) {
      this.name = name;		
   }
   
   @Override
   public String getName() {
      return name;
   }
   
   @Override
   public boolean isNil() {
      return false;
   }
}
```
### NullCustomer.java
```
public class NullCustomer extends AbstractCustomer {

   @Override
   public String getName() {
      return "Not Available in Customer Database";
   }

   @Override
   public boolean isNil() {
      return true;
   }
}
```
## Step 3
Tạo lớp CustomerFactory.
### CustomerFactory.java
```
public class CustomerFactory {
	
   public static final String[] names = {"Rob", "Joe", "Julie"};

   public static AbstractCustomer getCustomer(String name){
   
      for (int i = 0; i < names.length; i++) {
         if (names[i].equalsIgnoreCase(name)){
            return new RealCustomer(name);
         }
      }
      return new NullCustomer();
   }
}
```
## Step 4
Sử dụng CustomerFactory để nhận các đối tượng RealCustomer hoặc NullCustomer dựa trên tên của khách hàng được truyền cho nó.
### NullPatternDemo.java
```
public class NullPatternDemo {
   public static void main(String[] args) {

      AbstractCustomer customer1 = CustomerFactory.getCustomer("Rob");
      AbstractCustomer customer2 = CustomerFactory.getCustomer("Bob");
      AbstractCustomer customer3 = CustomerFactory.getCustomer("Julie");
      AbstractCustomer customer4 = CustomerFactory.getCustomer("Laura");

      System.out.println("Customers");
      System.out.println(customer1.getName());
      System.out.println(customer2.getName());
      System.out.println(customer3.getName());
      System.out.println(customer4.getName());
   }
}
```
## Step 5
### Kết quả:
```
Customers
Rob
Not Available in Customer Database
Julie
Not Available in Customer Database
```
Link tham khảo: https://www.tutorialspoint.com/design_pattern/null_object_pattern.htm