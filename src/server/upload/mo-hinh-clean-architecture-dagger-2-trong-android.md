Chắc anh em cũng không còn xa lạ gì về các mô hình phát triển ứng dụng như MVP , MVVM , hay đỉnh cao hơn là "God Activity" 😆 (1 activity cân tất mọi logic). Cá nhân mình cũng đã làm qua nhiều dự án và áp dụng từng mô hình khác nhau, chúng đều có những ưu nhược điểm riêng. Nhưng hôm nay mình sẽ giới thiệu về 1 mô hình "khó nhai" hơn 1 tí đó là "Clean Architecture". Let 's go !!!
# 1. Khái quát về mô hình Clean Architecture.
Nghe đến từ "Clean" là chúng ta ít nhiều đã hiểu đây là một mô hình rất "sạch sẽ" để triển khai dự án.
Nó được build dựa trên tư tưởng "độc lập" các layer kết hợp với các nguyên lí thiết kê hướng đối tượng và Coding Convention. Vậy nguyên lí chung của mô hình này được triển khai ra sao ? Chúng ta hãy xem qua mô hình dưới đây:

![image.png](https://images.viblo.asia/f05849d3-cc31-408d-9298-97a5fd0df6a0.png)

Ở đây các layer , component bên trong không nên biết bất kì điều gì về các layer bên ngoài. Có nghĩa là nếu layer bên trong có thay đổi về data thì không ảnh hưởng tới việc hiển thị của các layer ngoài hay định dạng data của các layer ngoài thay đổi thì data của các layer trong vẫn không ảnh hưởng gì . Dễ hỉu :))
* Trước khi đi qua chi tiết về mô hình này chúng ta hãy nhắc lại 1 chút về 5 nguyên lí **SOLID**.
- ***Single Responsibility*** : Mỗi một component nên chỉ có duy nhất 1 lí do để thay đổi - one responsibility.
- ***Open-closed*** : Bạn có thể dễ dàng mở rộng phạm vi , data của một đối tượng mà không cần phải thay đổi hay phá vỡ cấu trúc của nó.
- ***Liskov Substitution*** : Nếu bạn có một class Object nào đó và những class con của nó . Bạn có thể sử dụng base class để thay thế cách thể hiện cho những class con đó.
- ***Interface Segregation***: Break 1 interface lớn ra thành nhiều interface nhỏ để tránh khỏi việc 1 class phải implement quá nhiều method không cần thiết.
- ***Dependency Inversion***: Các component nên phụ thuộc vào abstract module thay vì các component cụ thể. Các module cấp cao không nên phụ thuộc vào các module cấp thấp.

# 2. Cấu trúc.

Có rất nhiều ý kiến khác nhau về việc chính xác có bao nhiêu layer được triển khai trong Clean Architecture. Nhưng mô hình này không được định rõ số layer một cách chính xác , mà ta sẽ adapt chúng theo yêu cầu của từng dự án.
Để mọi thứ đơn giản hơn , ở đây mình sẽ triển khai qua 3 layer chính:

**Data**

**Domain** 

**Presentation**

![image.png](https://images.viblo.asia/0f9580b8-a636-4d45-bcda-99db0f7a9912.png)

### 1. Domain layer

Domain layer là tầng trung tâm của mô hình (**Không** có bất kì sự phụ thuộc nào với các tầng khác ). Nó chứa Entities , Repositories , Usecases. Usecase tổng hợp data từ 1 hoặc nhiều repository.

Tuy nhiên chúng chỉ sử dụng để chứa các interface/abstraction , tất cả implementation cần thiết sẽ được triển khai ở data layer và presentation layer.

Cấu trúc package:

![image.png](https://images.viblo.asia/134d89d9-2eb9-4ed7-9e1b-5157e9edebc6.png)

Ngoài việc chứa entities , repositories , usecase thì domain layer còn chứa Interface "Mapper" , dùng để convert các entities từ **data layer** sang models hoặc ngược lại.

![image.png](https://images.viblo.asia/74b9b292-2054-4d46-9762-23da4c72b606.png)

Use cases giúp chúng ta tránh khỏi việc làm phình to Presenter hay ViewModel trong MVP hay MVVM. Đảm bảo nguyên lí **Single Responsibility Principle**. Nó cũng sẽ làm cải thiện các tác vụ RUDT (Read , Update , Debug, Test) của dự án.
Khai báo lớp GetListCoinUseCase
    
![image.png](https://images.viblo.asia/e60fc112-47f4-4a28-a6aa-01d5da1c150a.png)

### 2. Data layer

Ở tầng data ta sẽ chỉ sử dụng những dependency cần thiết cho business logic , chịu trách nhiệm lấy data , lưu data và phân bổ data cho app qua **domain** layer

![image.png](https://images.viblo.asia/ec01bf8b-d9b0-4024-9cb5-535ceb1a0113.png)

Chứa các **Entity** , logic để khởi tạo các lib cần thiết như retrofit , interceptor , room,... 
Ngoài ra là các implementation của repository , datasource từ domain layer.

Đây là cấu trúc package của tầng data

![image.png](https://images.viblo.asia/faf9c9fa-33ab-4ce4-a62c-a917379ed870.png)

![image.png](https://images.viblo.asia/726c681e-d114-4c39-9fa5-ea0ad9630fde.png)

![image.png](https://images.viblo.asia/15674d70-d21d-45e7-8893-6b81bf2ed7ad.png)

### 3. Presentation layer

**Presentation layer** cung cấp giao diện người dùng cho ứng dụng. Layer này không chứa bất kì một business logic nào. Ở tầng này có thể triển khai theo nhiều mô hình khác nhau : MVC , MVP , MVVM,...

Cấu trúc package

![image.png](https://images.viblo.asia/7f214801-b293-4ed1-95b1-21de3aa6977d.png)

ViewModel nhận trực tiếp data từ Usecase cung cấp. Lớp ListCoinViewModel:

![image.png](https://images.viblo.asia/9b42d39c-7168-40bb-bb37-5e2fc55ae0ba.png)

# 3. Dependency Injection

Trong Dagger 2 ,  các class sử dụng annotation @Module có trách nhiệm cung cấp các object có thể sử dụng để "tiêm" bất cứ lúc nào.

Sử dụng @Inject annotation để tiêm các dependency , nếu khai báo các constructor sử dụng @Inject , Dagger 2 sẽ định nghĩa ra những instance của object này để sử dụng.

Annotation @Component là 1 interface , được Dagger 2 sử dụng để generate code , cung cấp các module hoặc khai báo các method cung cấp dependency cần thiết để đáp ứng các request . Bạn có thể sử dụng @Singleton để thể hiện rằng chỉ có một instance được khai báo trong scope đã định sẵn.

Khai báo các module để cung cấp dependencies:

NetworkModule để cung cấp các dependency về các công cụ để request API:

![image.png](https://images.viblo.asia/d0f6d447-6ae5-480e-a584-09eab75aacb9.png)

CoinDatasourceModule để cung cấp các dependency về datasource , repository sử dụng cho usecase và viewmodel:

![image.png](https://images.viblo.asia/527ae612-ef09-443d-b657-4e647235b8c8.png)

Tiếp theo là MainComponent có nhiệm vụ inject những dependency được khai báo với annotation @Inject trong scope là MainActivity (Không trong subclass của nó )

![image.png](https://images.viblo.asia/4bdccbd3-5bcb-4c18-af33-0781d286ce0f.png)

Cuối cùng là gọi chúng ở MainActivity và sử dụng hoy 

![image.png](https://images.viblo.asia/b65c6baa-7807-4f33-b0a6-f92a6b3367a1.png)

Trên đây là toàn bộ về cách triển khai mô hình Clean Architecture kết hợp với Dependency Injection framework là Dagger 2 . Anh em đọc đê nhé xong cho xin cái upvote.

Project demo : https://github.com/VietKFC/CleanArchitectureDemo

# 4. Tài liệu tham khảo

https://www.geeksforgeeks.org/what-is-clean-architecture-in-android/

https://kipalog.com/posts/Android--Clean-Architecture

https://www.vogella.com/tutorials/Dagger/article.html

https://kipalog.com/posts/Android--Dagger-2---Phan-II--Into-the-Dagger-2