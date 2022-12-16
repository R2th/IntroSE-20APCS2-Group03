Trong hầu hết các dự án hiện nay đều có sử dụng Dagger 2, vai trò của nó là rất lớn, tuy nhiên đối với người mới bắt đầu, để tìm hiểu thì thường không dễ dàng.

Vì vậy, ở bài viết này, mình sẽ chia sẻ tới các bạn các khái niệm cơ bản để các bạn làm quen với Dagger 2, ở cuối bài có kèm Demo chi tiết, hy vọng sẽ giúp các bạn hiểu và có thể sử dụng được 1 cách dễ dàng hơn.

Mình sẽ đi vào từng khái niệm một để các bạn có thể hình dung rõ nhất, cùng tìm hiểu nhé.
### 1. Dependency & Object Graph
- Đầu tiên chúng ta sẽ tìm hiểu khái niệm Dependency (phụ thuộc) và Object Graph (biểu đồ đối tượng)
![](https://images.viblo.asia/e997df7d-7890-46fd-b64b-591f03725b34.png)
- Như hình trên, ta thấy mối quan hệ giữa class A và class B: A có sử dụng 1 đối tượng hay một số methods của B thì ta có 1 Dependency, lúc này có thể hiểu là: A phụ thuộc vào B, A có 1 Dependency là B, B là 1 Dependency để A sử dụng
- Cũng trong ví dụ trên, nếu A có 1 object sử dụng object của class B thì lúc này Object Graph sẽ có 1 object của class A với 1 tham chiếu đến object của class B.
### 2. Dependency Inversion Principle 
- Đây là một nguyên lý để thiết kế và viết code:
- Các module cấp cao không nên phụ thuộc vào các modules cấp thấp. 
  Cả 2 nên phụ thuộc vào abstraction.
![](https://images.viblo.asia/de9d02c7-5601-4d2a-aeff-b2ef3c34e182.png)
- Với cách code thông thường, các module cấp cao sẽ gọi các module cấp thấp. Module cấp cao sẽ phụ thuộc và module cấp thấp, điều đó tạo ra các dependency. 
- Khi module cấp thấp thay đổi, module cấp cao phải thay đổi theo. Một thay đổi sẽ kéo theo hàng loạt thay đổi,  giảm khả năng bảo trì của code.
- Chính vì vậy nếu tuân theo Dependency Inversion principle, các module cùng phụ thuộc vào 1 interface không đổi. Ta có thể dễ dàng thay thế, sửa đổi module cấp thấp mà không ảnh hưởng gì tới module cấp cao.
### 3. Inversion of control
- Đây là một design pattern được tạo ra để code có thể tuân thủ nguyên lý Dependency Inversion. 
- Có nhiều cách hiện thực pattern này: ServiceLocator, Event, Delegate, … 
- Dependency Injection là một trong các cách đó.
![](https://images.viblo.asia/f609081a-f263-4417-aa3d-b80b8af74eb1.png)
### 4. Dependency Injection
- Đây là một cách để hiện thực Inversion of Control Pattern.
- Các module phụ thuộc (dependency) sẽ được inject vào module cấp cao. 
- Trong đó một class sẽ nhận các phụ thuộc (dependency) của nó từ bên ngoài. Có nghĩa là class nó sẽ không khởi tạo instance của class khác bên trong nó, thay vào đó nó sẽ nhận instance của class khác từ bên ngoài thông qua injector (constructor, method, interface) vv.
- Bạn có thể xem hình minh họa bên dưới để hiểu rõ các khái niệm trong Dependency Injection
![](https://images.viblo.asia/693cbdb0-0d26-4769-8d22-21eb9cb01a5a.png)
- Từ ví dụ trên, bạn có thể hiểu các khái niệm 1 cách đơn giản:
- Một dependency (Service) là một đối tượng có thể được sử dụng bởi Client. (chai thuốc)
- Một dependant (Client) là một đối tượng sử dụng các dependency khác. (android)
- Một injection có nghĩa là chúng ta đưa một Service đến Client. (mũi tiêm chứa thuốc)
- Tất cả những dụng cụ đều được đựng trong 1 hộp có biểu tượng con dao (Dagger)
### 5. Dagger 2
- Cuối cùng chúng ta cũng đi tới phần chính,  nếu đã đi qua các khái niệm trên thì bạn có thể dễ dàng hiểu Dagger là gì. Vậy Dagger 2 là gì ?
- Dagger 2 chính là một Dependency Injection framework (DI framework), nó có trách nhiệm tự động generate các phụ thuộc cho chúng ta bằng việc sử dụng annotation processor
![](https://images.viblo.asia/83f7ed94-3d09-4da7-acd6-56720087825d.png)
### 6. Annotation Processor
- Dùng để đọc các file đã được compiled trong khoảng thời gian build ứng dụng với mục đích là để generate các source code để chúng ta sử dụng trong project.
- @Module: Nơi tạo ra các module cung cấp các phụ thuộc (dependency), để inject đến nơi cần phụ thuộc đó(dependent).
- @Provider: Nằm bên trong module, annotation được chú thích với method để định nghĩa ra các dependency.
- @Inject:  Yêu cầu các dependency (service) cần thiết để đưa đến cho dependant (client).
- @Component: Là một interface kết nối mọi thứ lại với nhau,  cụ thể trong này chúng ta sẽ xác định module hoặc component nào cần để lấy các phụ thuộc, đồng thời cũng là nơi xác định các graph dependency nào có thể được inject. Có thể hiểu đây là cầu nối giữa  @Module và @Inject
- @Scope: được sử dụng dùng để tạo singleton và định nghĩa vòng đời tồn tại của Object graph.(cơ chế scope quan tâm về việc giữ lại các thể hiện duy nhất của class trong suốt phạm vi nó tồn tại)
- @Named: để đánh dấu Id cho các phương thức @Provides trong trường hợp trùng kiểu object trả về, và khi muốn Inject thì phải thêm @field:Named("Id") để xác định 
### 7. Why Use Dagger 2
- Câu hỏi đặt ra là, với sự rắc rối như vậy thì tại sao lại phải sử dụng Dagger 2 ?
- Câu trả lời đơn giản là để dễ dàng hơn trong việc khởi tạo, sửa đổi và quản lý code khi dự án được mở rộng, khi số lượng class tăng thêm, và còn thêm nhiều lợi ích nằm trong phần ưu điểm mà mình sẽ giới thiệu bên dưới.
### 8. How To Use
- Sau khi đã tìm hiểu các khái niệm về Dagger 2 thì các bước cần làm để sử dụng nó là gì ?
1. Xác định các đối tượng phụ thuộc và các phụ thuộc của nó.
2. Tạo một class với annotation @Module, sử dụng annotation @Provider cho mọi phương thức mà trả về một sự phụ thuộc.
3. Yêu cầu phụ thuộc vào các đối tượng phụ thuộc bằng cách sử dụng annotation @Inject.
4. Tạo một interface bằng cách sử dụng annotation @Component và thêm các class với annotation @Module được tạo ra trong bước 2.
5. Tạo một object của interface @Component để khởi tạo đối tượng phụ thuộc với các phụ thuộc của nó.
###  9. Advantages & Defects
- Một thư viện ra đời là để hỗ trợ và đáp ứng các công việc nào đó, tất nhiên sẽ mang lại những lợi ích lớn, tuy nhiên không có gì là hoàn hảo, Dagger 2 cũng vậy, mình xin đưa ra 1 số ưu và nhược điểm chính của nó :
- Ưu điểm:
    - Phân tích phụ thuộc được chuyển từ thời gian chạy sang thời gian biên dịch. Điều này có nghĩa là chúng ta được thông báo về các sự cố có thể xảy ra trong giai đoạn phát triển, không giống với các thư viện khác
    - Giảm sự kết dính giữa các class 
    - Dễ dàng thấy quan hệ giữa các class 
    - Dễ dàng test hơn (test đơn vị và chức năng), khả năng mở rộng tốt hơn
- Nhược điểm:
    - Làm tăng độ phức tạp của code
    - Nó cũng không thể inject các private fields
    - Dagger không tự động inject các fields
### 10. Conclusion 
- Như vậy, mình đã lần lượt chia sẻ các khái niệm cần thiết nhất để một người mới bắt đầu tìm hiểu Dagger 2 có thể hiểu được, từ đó dễ dàng hơn trong việc sử dụng.
- Các bạn có thể xem demo ở link bên dưới để có thể hình dung rõ hơn cách hoạt động của nó.
- Trong bài viết có thể còn sai sót, mong được mọi người góp ý.
- Cảm ơn vì đã đọc, xin hẹn gặp lại các bạn.
-----
- Link Demo: https://github.com/buivanhieu7112/Dagger-2