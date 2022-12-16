# Giới thiệu
Dagger 2 - là một dependency injection framework. Nó được sử dụng để genaration code thông qua các base anotation, code được genartion ra rất dễ đọc và debug
![](https://images.viblo.asia/db8f3750-81ab-4bbd-9a81-6924edbc3828.jpeg)
## Chuẩn bị
Trước khi bắt đầu mình muốn các bạn tìm hiểu qua về [SOLID principles](https://toidicodedao.com/2015/03/24/solid-la-gi-ap-dung-cac-nguyen-ly-solid-de-tro-thanh-lap-trinh-vien-code-cung/) đó là những nguyên lý thiết kế và viết code. Sau đó ở đây mình sẽ chỉ nhấn mạnh nguyên lý cuối cùng SOLID  đó chính là Dependency Inversion:

   **Dependency inversion principle**
   ```
1. Các module cấp cao không nên phụ thuộc vào các modules cấp thấp. Cả 2 nên phụ thuộc vào abstraction.
```
   ```
2. Interface (abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại. 
( Các class giao tiếp với nhau thông qua interface, không phải thông qua implementation.)
```

*  Với cách code thông thường, các module cấp cao sẽ gọi các module cấp thấp. Module cấp cao sẽ phụ thuộc và module cấp thấp, điều đó tạo ra các dependency. Khi module cấp thấp thay đổi, module cấp cao phải thay đổi theo. Một thay đổi sẽ kéo theo hàng loạt thay đổi, giảm khả năng bảo trì của code.
* Chính vì vậy nêú tuân theo Dependendy Inversion principle, các module cùng phụ thuộc vào 1 interface không đổi. Ta có thể dễ dàng thay thế, sửa đổi module cấp thấp mà không ảnh hưởng gì tới module cấp cao.
     
       
 **Định nghĩa và khái niệm DI**
       
*   Hiện nay, các lập trình viên hay lẫn lộn giữa các khái niệm Dependency Inversion, Inversion of Control (IoC), Dependency Injection (DI). Ba khái niệm này tương tự nhau nhưng không hoàn toàn giống nhau.
 
 ![](https://images.viblo.asia/48125b70-39af-4127-8aaa-45815eb76358.jpg)
Sự khác biệt giữa 3 khái niệm trên:
    
   * **Dependency Inversion:**  *Đây là một nguyên lý để thiết kế và viết code.*
   * **Inversion of Control:** *Đây là một design pattern được tạo ra để code có thể tuân thủ nguyên lý Dependency Inversion. Có nhiều cách hiện thực pattern này: ServiceLocator, Event, Delegate, … Dependency Injection là một trong các cách đó*.
   * **Dependency Injection:** *Đây là một cách để hiện thực Inversion of Control Pattern (Có thể coi nó là một design pattern riêng cũng được). Các module phụ thuộc (dependency) sẽ được inject vào module cấp cao.*
   
   Có thể hiểu **Dependency Injection** một cách đơn giản như sau:

* Các module không giao tiếp trực tiếp với nhau, mà thông qua interface. Module cấp thấp sẽ implement interface, module cấp cao sẽ gọi module cấp thấp thông qua interface.
```
     Ví dụ: Để giao tiếp với database, ta có interface IDatabase, các module cấp thấp là
     XMLDatabase, SQLDatabase.Module cấp cao là CustomerBusiness sẽ chỉ sử dụng interface IDatabase.
```
* Việc khởi tạo các module cấp thấp sẽ do DI Container thực hiện. 
 ```   
      Ví dụ: Trong module CustomerBusiness, ta sẽ không khởi tạo IDatabase db = new XMLDatabase(), 
      việc này sẽ do DI Container thực hiện. Module CustomerBusiness sẽ không biết gì về 
      module XMLDatabase hay SQLDatabase.
   ```
* Việc Module nào gắn với interface nào sẽ được config trong code hoặc trong file XML.
* DI được dùng để làm giảm sự phụ thuộc giữa các module, dễ dàng hơn trong việc thay đổi module, bảo trì code và testing.  

-----

## Dependency Injection with Dagger 2
       
1. **Dagger 2 là gì ?**
      * Là một dependency injector, khác với các dependency injector dành cho việc triển khai ứng dụng Enterprise như Spring IoC hay JavaEE CDI. Dagger Được thiết kế cho các thiết bị low-end, nhỏ gọn nhưng vẫn đầy đủ tính năng.
      * Hầu hết các dependency injector sử dụng reflection để tạo ra và inject các module. Reflection nhanh và thích hợp cho các version Android cũ nhưng reflection gây ra khó khăn rất lớn trong việc debug hay tracking khi gặp lỗi.
   * Thay bằng việc sử dụng reflection Dagger sử dụng một trình biên dịch trước (pre-compiler), trình biên dịch này tạo ra tất cả các lớp, các module cần thiết để làm việc.
    * Dagger ít mạnh mẽ so với các dependency injector khác nhưng thay vào đó Dagger lại nhẹ nhàng và dễ dàng sử dụng cũng như gần như bỏ đi được điểm yếu của dependency injector là khả năng tracking bug
    * Dagger 2 sử dụng chủ yếu các anotation sau :
        * @Module & @Provides: Sử dụng để định nghĩa class và method cần cung cấp sự phụ thuộc.
        * @Inject : request 1 dependencies. Có thể sử dụng với 1 constructor , 1 field hoặc 1 method.
        * @Component:Nó là 1 interface dùng để làm cầu nối giữa module và injection .
        
 2. **Định nghĩa dependency providers (object providers)**
 ```
 Trong Dagger 2 class có anotation @Module có trách nhiệm cung cấp các object có thể được inject.
 Các class như vậy có thể định nghĩa các phương thức với anotated @Provides. Các đối tượng trả về từ các 
 phương thức này có sẵn dependency để inject.
 ```
 3. **Định nghĩa dependency** (object consumers)
  ```  
   Bạn có thể sử dụng @Inject để định nghĩa dependency.Nếu bạn đặt @Inject với constructor,Dagger 2 có thể 
   sử dụng 1 instance này để hoàn thành dependencies.Điều này được thực hiện để tránh việc define nhiều phương thức 
   @Provider cho các đối tượng này.
   ```
 4. **Kết nối giữa consumers và providers**
 ```
@Component được sử dụng trong 1 interface.Interface này được sử dụng bởi Dagger2 nhằm generate code, 
kết nối giữa module và đối tượng thể hiện sự phụ thuộc. Sau đây là bảng tổng quan cách sử dụng
anotate trong dagger :
```
**Table 1. Annotation summary of Dagger 2**

| Annotation    |  Usage| 
| -------- | -------- |
| @Module     | Used on classes which contains methods annotated with @Provides.     | 
| @Provides | Can be used on methods in classes annotated with @Module and is used for methods which provides objects for dependencies injection. |
| @Singleton | Single instance of this provided object is created and shared. |
| @Component | Used on an interface. This interface is used by Dagger 2 to generate code which uses the modules to fulfill the requested dependencies. |

**Note:** Dagger không tự động inject các fields. Nó cũng không thể inject các private fields, nếu bạn muốn sử dụng inject field, bạn sẽ define 1 method trong @Component interface trong đó lấy instance mà bạn muốn inject làm tham số.

## Kết luận
Qua bài viết này hy vọng tất cả các bạn có thể hình dung qua tư tưởng về Dependency injection,để từ đó có cái nhìn đến Dagger 2, sang bài tiếp theo mình sẽ triển khác các bước để inject dagger vào 1 project nhỏ android. Ở bài viết này mình đã cố gắng tham khảo từ nhiều nguồn nhưng lượng kiến thức có hạn mong  nhận được sự đóng góp của các bạn. 
Cảm ơn mọi người !

Nguồn :
* http://www.vogella.com/tutorials/Dagger/article.html#defining-dependencies-object-consumers
* https://proandroiddev.com/how-to-dagger-2-with-android-part-1-18b5b941453f