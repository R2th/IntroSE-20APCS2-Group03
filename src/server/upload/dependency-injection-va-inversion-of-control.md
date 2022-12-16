Nhắc lại kiến thức
Trước khi bắt đầu với Dependency Injection, các bạn có lẽ đều đã biết về hoặc chí ít là nghe nói đến SOLID principles, những nguyên lý thiết kế và viết code. Nguyên lý cuối cùng trong SOLI**D** chính là Dependency Inversion:

    1. Các module cấp cao không nên phụ thuộc vào các modules cấp thấp.
       Cả 2 nên phụ thuộc vào abstraction.

    2. Interface (abstraction) không nên phụ thuộc vào chi tiết, mà ngược lại. 
       ( Các class giao tiếp với nhau thông qua interface, không phải thông qua implementation.)
    
Với cách code thông thường, các module cấp cao sẽ gọi các module cấp thấp. Module cấp cao sẽ **phụ thuộc và module cấp thấp**, điều đó tạo ra các dependency. Khi module cấp thấp thay đổi, module cấp cao phải thay đổi theo. Một thay đổi sẽ kéo theo hàng loạt thay đổi, giảm khả năng bảo trì của code.

![](https://images.viblo.asia/2987a3fa-7f43-4a2e-b4fa-acf63ce635d9.jpg)

Nếu tuân theo Dependendy Inversion principle, các module cùng phụ thuộc vào 1 interface không đổi. Ta có thể dễ dàng thay thế, sửa đổi module cấp thấp mà không ảnh hưởng gì tới module cấp cao.

## **Định nghĩa và khái niệm DI**
Hiện nay, các lập trình viên hay lẫn lộn giữa các khái niệm Dependency Inversion, Inversion of Control (IoC), Dependency Injection (DI). Ba khái niệm này tương tự nhau nhưng không hoàn toàn giống nhau.

![](https://images.viblo.asia/b4b53ad8-ffad-4b06-953f-874cb3b4ae02.jpg)

Sự khác biệt giữa 3 khái niệm trên:

* **Dependency Inversion**: Đây là một nguyên lý để thiết kế và viết code.
* **Inversion of Contro**: Đây là một design pattern được tạo ra để code có thể tuân thủ nguyên lý Dependency Inversion. Có nhiều cách hiện thực pattern này: ServiceLocator, Event, Delegate, … Dependency Injection là một trong các cách đó.
* **Dependency Injection**: Đây là một cách để hiện thực Inversion of Control Pattern (Có thể coi nó là một design pattern riêng cũng được). Các module phụ thuộc (dependency) sẽ được inject vào module cấp cao.
**Khi nói tới DI, tức là nói tới Depedency Injection**. Hiện nay, một số DI container như Unity, StructureMap v…v, hỗ trợ chúng ta trong việc cài đặt và áp dụng Dependency Injection vào code (Sẽ nói ở bài sau), tuy nhiên vẫn có thể gọi chúng là IoC Container, ý nghĩa tương tự nhau.

Có thể hiểu Dependency Injection một cách đơn giản như sau:
    
       1. Các module không giao tiếp trực tiếp với nhau, mà thông qua interface. Module cấp thấp sẽ implement interface, module cấp cao sẽ gọi module cấp thấp thông qua interface.*
         Ví dụ: Để giao tiếp với database, ta có interface IDatabase, các module cấp thấp là XMLDatabase, SQLDatabase.  Module cấp cao là CustomerBusiness sẽ chỉ sử dụng interface IDatabase.
    
       2.Việc khởi tạo các module cấp thấp sẽ do DI Container thực hiện. 
         Ví dụ: Trong module CustomerBusiness, ta sẽ không khởi tạo IDatabase db = new XMLDatabase(), việc này sẽ do DI Container thực hiện. Module CustomerBusiness sẽ không biết gì về module XMLDatabase hay SQLDatabase.
         
      3.Việc Module nào gắn với interface nào sẽ được config trong code hoặc trong file XML.
    
      4.DI được dùng để làm giảm sự phụ thuộc giữa các module, dễ dàng hơn trong việc thay đổi module, bảo trì code và testing.*
## **Các dạng DI**
Có 3 dạng Dependency Injection:

* **Constructor Injection**: Các dependency sẽ được container truyền vào (inject vào) 1 class thông qua constructor của class đó. Đây là cách thông dụng nhất.

* **Setter Injection**: Các dependency sẽ được truyền vào 1 class thông qua các hàm Setter.

* **Interface Injection**: Class cần inject sẽ implement 1 interface. Interface này chứa 1 hàm tên Inject. Container sẽ injection dependency vào 1 class thông qua việc gọi hàm Inject của interface đó. Đây là cách rườm rà và ít được sử dụng nhất.

## **Ưu điểm và khuyết điểm của DI**

Dĩ nhiên, DI không phải vạn năng, nó cũng có những ưu điểm và khuyết điểm, do đó không phải project nào cũng nên áp dụng DI. Với những dự án lớn, code nhiều, DI là thứ rất cần thiết để đảm bảo code dễ bảo trì, dễ thay đổi. Vì vậy, bản thân các framework nổi tiếng như Spring, Struts2, ASP.NET MVC, … đều hỗ trợ hoặc tích hợp sẵn DI. ASP.NET MVC từ bản 5 trở xuống cho phép ta sử dụng DI container từ thư viện, từ bản 6 thì tích hợp sẵn DI luôn, không cần phải thêm thư viện gì.
![](https://images.viblo.asia/f3beb18f-b20d-48fd-a9cf-e65ddf760d22.png)

Trên đây chỉ là những hiểu biết cơ bản của mình về dependency injection và inversion of control. Rất mong nhận được những nhận xét từ các bạn