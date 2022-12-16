## Lời Mở Đầu

Nếu như bạn đã dành thời gian ra tìm hiểu về Architectute thì chắc chắn đã nghe qua "The Clean Architecture" rồi đúng không?

Việc định hình ra architecture cho một project chưa bao giờ là đơn giản, nó phụ thuộc vào rất nhiều yếu tố như yêu cầu của khách hàng, UI , kĩ năng của member, chức năng của app... Dựa vào các yếu tố đó mà Project Technical Lead hay TeamLead sẽ quyết định dùng architecture, mô hình nào vào project.

Trong bài viết này mình sẽ viết về The Clean Architecture - "Kiến trúc sạch"

## Getting Started

Để viết ra một sản phẩm tốt là điều rất khó, tốt ở đây là sao? Ý kiến cá nhân của mình tốt có nghĩa là
* easy to maintain
* easy to debug
* easy to develop
* easy to understand
* code clear


Sau một hồi tìm kiếm, mình đã tìm ra The Clean Architecture :D. 

Bộ nguyên tắc của Clean Architecture như sau:

* Độc lập ( tách biệt) với Framework.
* Dễ dàng cho việc test code.
* Tách biệt giữa bussiness và UI 
* Tách biệt với cơ sở dữ liệu
* Independent of any external agency

Nguyên tắc cuối mình để tiếng anh vì dịch ra tiếng việt nó tối nghĩa. khó hiểu. Nó được giải thích như sau: In fact your business rules simply don’t know anything at all about the outside world. Nghĩa là phần code logic của bạn nó là tách biệt, độc lập, nó không quan tâm đến cái cách mà nó được dùng như nào. Ví dụ như bạn làm ra hộp bánh, người mua đem hộp bánh đi biếu hay để ăn thì bạn cũng không quan tâm.

Tóm lại cái quan trọng nhất mình thấy ở architecture này chính là ĐỘC LẬP (TÁCH BIỆT). tách biệt mọi thứ, càng tách biệt rõ càng tốt, càng clear :D Mà vì lẽ đó nên nếu apply architecture này thì số lượng class của bạn sẽ rất lớn đó nhé :P


![](https://images.viblo.asia/b2bb84c1-933a-4f9e-bd2c-216375c283e5.PNG)

Cấu trúc của The Clean Architecture

Mình sẽ giải thích về 4 vòng tròn thông qua 1 ứng dụng Movie nhé. 

* **Entities**: Là các Object phục vụ cho Bussiness của bạn (là các model đó. Ví dụ MovieObject :P)
* **Use Cases**: Mình thấy khá giống với khái niệm Usecase bên UML, nó đại diện cho các nghiệp vụ trong ứng dụng. ( Ví dụ Usecase: Show list HotMovies, show list favorite movies...)
* **Interface Adapters**: hay còn gọi là tầng Presentation. Nó là cầu nối giữa tầng bussiness với tầng UI của bạn. Nếu bạn đã làm mô hình MVC hay MVP thì đây là nơi chứa Controller or Presenter.
* **Frameworks and Drivers**: là tầng chứa UI, tools, frameworks, etc (ví dụ trong android thì tầng này là chứa Activity/Fragment đấy :D)

## Android Architecture

Mục đích là tách ứng dụng thành các tầng tách biệt, không phụ thuộc vào nhau, như vậy mới dễ dàng cho việc test, cũng như maintain, phát triển.

Để đạt được điều này, chúng ta sẽ chia nhỏ dự án thành 3 lớp khác nhau, trong đó mỗi lớp có mục đích riêng và hoạt động riêng biệt với các mục đích khác nhau.

Mỗi lớp có thể thực hiện theo các mô hình, pattern khác nhau để đạt được mục đích của lớp đó.

![](https://images.viblo.asia/fee23908-86f6-4670-88ec-b28de8e0828a.PNG)

### Presentation Layer
Đây là cầu nối giữa  logic với UI (animation...) bạn có thể apply MVP hay MVC, MVVM tại đây, mình sẽ không đi chi tiết vào mô hình. Chú ý rằng tại tầng này chỉ có views (Fragment, Activity), sẽ không viết bất kì logic nào trừ logic liên quan đến UI.

Tầng Presenter sẽ sử dụng các interactors (uses case) để thực hiện logic dưới background thread (không thực hiện trên Mainthead(UI thread), sau đó trả về kết quả thông qua callback để view hiển thị.

![](https://images.viblo.asia/c288f2cf-de0d-42e1-8b9f-b8c12f348905.PNG)

### Domain Layer

Tầng này chỉ viết logic mà thôi. Tại đây chúng ta sẽ định nghĩa các interactors (usecase, UserRepository). 

chú ý rằng lớp này là 1 module thuần java (kotlin) không chứa bất kì phụ thuộc Android nào. Các thành phần bên ngoài khác muốn trỏ đến sẽ dùng interface.![](https://images.viblo.asia/ebd7402d-8c2b-4810-ae6d-fa2688e19a19.PNG)

### Data Layer

Tất cả data của ứng dụng sẽ xử lý tại đây (hãy hiểu như này cho đơn giản, tầng này là tầng implement lại các interface repository ở tầng Domain cũng như định nghĩa ra các data model) .Chúng ta sẽ sử dụng [Repository Pattern](https://martinfowler.com/eaaCatalog/repository.html) cho tầng này.
Ví dụ khi chúng ta muốn lấy ra 1 bộ phim theo ID, repository sẽ quyết định lấy ra từ local nếu đã lưu bộ phim đó vào cache từ lần load trước, nếu chưa có sẽ request API để lấy bộ phim từ Server.

![](https://images.viblo.asia/914eef4b-26f4-46fe-b185-e8afcd8bdbac.PNG)

## Lời kết

Như vậy là mình đã giới thiệu qua về The Clear Architecture. Các bạn có thể tham khảo project tại [github](https://github.com/android10/Android-CleanArchitecture) để hiểu rõ hơn nhé.

Bài viết này mình có tham khảo ở [đây](https://fernandocejas.com/2014/09/03/architecting-android-the-clean-way/)  cho các bạn muốn đọc link gốc :D
Bài viết mang yếu tố chủ quan, đánh giá cá nhân nên nếu sai xót nhờ anh em bổ sung giúp mình nhé :D