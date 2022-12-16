# Giới thiệu về Factory method pattern.
Factory method là một pattern cho việc khởi tạo đối tượng(thuộc nhóm creational patterns).  Pattern này được sinh ra nhằm mục đích khởi tạo đối tượng mà bản thân muốn che giấu class nào được khởi tạo. Pattern này được sử dụng khá phổ biến đồng thời nó cũng không khó khăn để hiểu.
# Bản chất của Factory method pattern
Về cơ bản thì ta sẽ định nghĩa một `interface` hoặc `Abstract class` ,  các class con sẽ `implements` nó. Tiếp đến mình sẽ tạo một class được xem là **FactoryClass**, bên trong **FactoryClass** này mình sẽ có một phương thức giúp chúng ta khởi tạo các Object chúng ta cần.

# Code demo
Mình chọn điện thoại làm một cái ví dụ ha.

- Như mình viết trên thì mính sẽ tạo một `interface Phone`
    ```
    public interface Phone {

        public void showInfo();

    }
    ```
- Tiếp đến mình muốn có một điện thoại của một vài hãng như Samsung, Apple, Nokia,.. Nên mình sẽ khai báo các class SamsungPhone, ApplePhone, NokiaPhone
  ```
  public class SamsungPhone implements Phone {
  
      @Override
      public void showInfo() {
            System.out.printf("Đây là điện thoại Samsung");
      }
  
  }
  ```
  
    ```
  public class ApplePhone implements Phone {
  
      @Override
      public void showInfo() {
            System.out.printf("Đây là điện thoại Apple");
      }
  
  }
  ```
  
    ```
  public class NokiaPhone implements Phone {
  
      @Override
      public void showInfo() {
            System.out.printf("Đây là điện thoại Nokia");
      }
  
  }
  ```
  ```
  public enum PhoneType {
    SAMSUNG, NOKIA, APPLE 
  }
    ```
     Sau khi mình có được các class *Phone trên thì sẽ tạo `FactoryClass` có tên là `PhoneFactory` 
     ```
     public class PhoneFactory {
        public Phone getPhone(PhoneType phoneType) {
            Phone phoneCreated = null;
            switch (phoneType) {
            case SAMSUNG:
                phoneCreated = new SamsungPhone();
                break;
            case APPLE:
                phoneCreated = new ApplePhone();
                break;
            case NOKIA:
                phoneCreated = new NokiaPhone();
                break;
            }
            return phoneCreated;
        }
    }
     ```
     
     Bây giờ mình sẽ chạy demo
     ```
     public class RunDemo {

        public static void main(String[] args) {
            PhoneFactory phoneFactory = new PhoneFactory();
            Phone phone = phoneFactory.getPhone(PhoneType.SAMSUNG);
            phone.showInfo();
        }
   }
    ```
    Và kết quả có được là;
    
    ```
    Samsung phone
    ```
    
    **Như vậy khi muộn tạo object ta sẽ dùng class PhoneFactory  và chỉ loại object cần tạo để Factory method sẽ tạo object cần thiết cho bạn.**