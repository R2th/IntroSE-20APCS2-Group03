Đây là bài tiếp theo của [Nguyên tắc thứ nhất trong SOLID: Single Responsibility Principle](https://viblo.asia/p/nguyen-tac-thu-nhat-trong-solid-single-responsibility-principle-QpmleboM5rd)


-----


Open-Closed Principle (OCP) được đặt ra năm 1988 bởi Bertrand Meyer. Nguyên tắc này nói rằng:
> Một software artifact (class, module, function,...) nên mở cho việc mở rộng và đóng với sự thay đổi.

Nói cách khác, một software artifact nên có khả năng mở rộng mà không cần phải thay đổi nó.

Tất nhiên đây là lý do cơ bản nhất mà chúng ta đi nghiên cứu software architecture. Nếu một chút mở rộng đơn giản lại phải gây ra những thay đổi lớn thì đây đúng là một thất bại mà các architect của hệ thống đó đã thực hiện.

Hầu hết sinh viên thiết kế phần mềm nhận ra rằng OCP chính là nguyên tắc định hướng giúp họ thiết kế class và module. Thực tế nguyên tắc này có ảnh hưởng rất lớn khi chúng ta xem xét nó ở tầng của các architectural component.

Chúng ta sẽ đi phân tích một ví dụ để hiểu rõ hơn về OCP.

-----

Giả sử rằng hiện tại chúng ta có một hệ thống hiển thị các số liệu tóm tắt về tài chính trên một trang web. Dữ liệu trên trang có thể cuộn, các chỉ số bị âm sẽ được hiển thị màu đỏ.

Bây giờ một stakeholder muốn các thông tin trên có thể chuyển thành một báo cáo mà có thể in được trên một máy in đen trắng. Báo cáo này phải được phân trang đúng cách, với các page header, page footer và tiêu đề cột thích hợp. Các chỉ số âm phải được bao quanh bởi dấu ngoặc đơn.

Rõ ràng giờ sẽ phải viết một ít code mới rồi. Nhưng liệu có bao nhiêu code cũ phải sửa đây?

Một software architecture phải có khả năng giảm thiểu được số lượng thay đổi này xuống mức thấp nhất. Lý tưởng mà nói, là không có thay đổi.

Làm thế nào đây? Bằng việc phân chia đúng đắn những thứ mà thay đổi bởi những lý do khác nhau (hãy nhớ về Single Responsiblity Principle), và sau đó tổ chức các dependency giữa các thứ đó một cách đúng đắn (Dependency Inversion Principle).

Áp dụng SRP, chúng ta có một data-flow trông như dưới. Một vài analysis procedure sẽ inspect các dữ liệu tài chính và sinh ra các dữ liệu có thể tạo thành báo cáo được, sau đó được định dạng lại bởi hai reporter process.

![](https://images.viblo.asia/eca26df1-a88f-4135-a012-dd456d966d81.png)

Góc nhìn cần thiết ở đây là việc sinh ra báo cáo bao gồm hai phần riêng biệt: tính toán các dữ liệu được báo cáo và trình bày các dữ liệu đó thành một friendly-form cho máy in và web.

Bởi sự chia tách như vậy, chúng ta cần tổ chức các source code dependency để đảm bảo sự thay đổi của phần này không gây ra sự thay đổi đến phần kia. Đồng thời, việc tổ chức phải đảm bảo rằng các behaviour có thể được mở rộng mà không cần phải quay lại để sửa đổi.

Chúng ta thực hiện điều này bằng việc chia các quy trình vào các class và đặt các class này vào các component khác nhau (được thể hiện qua đường hai vạch ở hình dưới). Trong mô hình này, thành phần ở phía trên bên trái là *Controller*. Ở phía trên bên phải, chúng ta có *Interactor*. Phía dưới bên trái là Database. Và cuối cùng phía dưới bên trái là 4 component dành cho giao diện đó là các *Presenter* và *View*.

![](https://images.viblo.asia/46077d9e-ed6f-4102-ac46-bc91554dd04e.png)

Các class được đánh dấu với chữ <I> là các interface, chữ <DS> thì là data structure. Đầu mũi tên mở thể hiện mối quan hệ *using*. Đầu mũi tên đóng thể hiện mối quan hệ *implement* hoặc *inheritance*. 

Điều đầu tiên cần chú ý là tất cả các dependency đều là dạng source code dependencty. Một mũi tên trỏ từ class A sang class B nghĩa là source code của class A mention tới class B, nhưng class B thì không biết gì về class A. Do đó, ở hình trên, `FinancialDataMapper` biết về `FinancialDataGateway` thông qua mối quan hệ *implement*, nhưng `FinancialDataGateway` thì chẳng biết gì về `FinancialDataMapper`.
    
Điều cần chú ý tiếp theo đó là tất cả các đường hai vạch đều chỉ có mũi tên đi qua *theo một hướng*. Điều này có nghĩa là các mối quan hệ giữa các component là một chiều, như đã được tóm gọn lại ở hình dưới. Những mũi tên này trỏ hướng về các component mà chúng ta muốn bảo vệ khỏi sự thay đổi.
    
![](https://images.viblo.asia/6a6f2a2c-20c0-404d-a6eb-d446c06cfdc1.png)

Có thể bạn chưa biết: Nếu component A cần được bảo vệ khỏi những thay đổi từ component B, thì component B phải *depend on* component A.
    
Chúng ta muốn bảo vệ *Controller* khỏi những thay đổi từ *Presenter*. Chúng ta muốn bảo vệ *Presenter* khỏi những thay đổi từ *View*. Chúng ta muốn bảo vệ *Interactor* khỏi những thay đổi từ... tất cả mọi thứ.
    
*Interactor* đang ở vị trí mà có thể tuân theo OCP một cách tốt nhất. Những thay đổi từ *Database*, *Controller*, *Presenter*, *View* sẽ không có chút impact nào tới *Interactor*.
    
Tại sao *Interactor* lại có một vị trí đặc biệt như vậy? Bởi vì nó chứa các business rule. *Interactor* bao gồm các highest-level policy của app.
    
Nếu bạn biết về mối quan hệ peripheral-center thì ở đây tất cả các component khác phải giải quyết các mối quan tâm đến peripheral. Riêng *Interactor* chỉ giải quyết các mối quan tâm của một central.
    
Mặc dù *Controller* là peripheral đối với *Interactor*, nó lại là center đối với *Presenter* và *View*. Và trong khi *Presenter* là peripheral đối với *Controller*, nó cũng lại là center đối với *View*.
    
Hãy để ý đến cách mà điều này đã tạo ra một hệ thống phân cấp bảo vệ dựa trên khái niệm "level". *Interactor* là highest-level concept, vì thế nó được bảo vệ nhiều nhất. *View* nằm trong những lowest-level concept, do đó nó được bảo vệ ít nhất. *Presenter* là có cấp độ cao hơn *View*, nhưng thấp hơn *Controller* và *Interactor*.
    
Đây là cách mà OCP làm việc ở architectural level. Các architect phải phân tách chức năng dựa trên cách thức, lý do, và thời điểm nó thay đổi, và sau đó tổ chức các chức năng được phân tách đó thành một hệ thống phân cấp các component. Các component có cấp độ cao hơn trong hệ thống sẽ được bảo vệ khỏi những thay đổi từ các component có cấp độ thấp hơn.
    
## Kiểm soát hướng

Nếu bạn sợ hãi với quả class design vừa rồi thì hãy thử nhìn lại một lần nữa. Phần lớn sự phức tạp trong biểu đồ này là để hướng tới việc đảm bảo rằng các dependency giữa các component chỉ đúng hướng.

Ví dụ, interface `FinancialDataGateway` nằm giữa `FinancialReportGenerator` và `FinancialDataMapper` tồn tại là để đảo ngược dependency mà đáng ra phải trỏ từ *Interactor* sang *Database*. Tương tự với *Presenter* và *View*.
    
## Ẩn giấu thông tin
    
Interface `FinancialReportRequester` phục vụ một vài mục đích khác nhau. Nó đặt ở đó để bảo vệ `FinancialReportController` khỏi việc biết quá nhiều đến các thứ nội bộ bên trong *Interactor*. Nếu interface đó không có ở đấy, *Controller* sẽ phải có transitive dependency lên `FinancialEntities`.
    
Transitive dependency (phụ thuộc bắc cầu) vi phạm nguyên tắc chung rằng các software entity không được phụ thuộc vào những thứ mà chúng không trực tiếp sử dụng. Chúng ta sẽ bắt gặp nguyên tắc này một lần nữa ở bài nói về Inteface Segregation Principle và Common Reuse Principle.
    
Vì vậy, mặc dù ưu tiên hàng đầu của chúng ta là bảo vệ *Interactor* khỏi những thay đổi từ *Controller*, chúng ta cũng cần bảo vệ *Controller* khỏi những thay đổi từ *Interactor* bằng việc che giấu các thứ nội bộ của *Interactor*.
    
## Tóm lại
    
OCP là một trong những động lực thúc đẩy architecture của hệ thống. Mục tiêu là làm cho hệ thống dễ mở rộng mà không phải gánh chịu những impact lớn do thay đổi. Mục tiêu này đạt được nhờ việc phân chia hệ thống thành các component, và sắp xếp các component đó thành một hệ thống phân cấp dependency mà từ đó bảo vệ các higher-level component khỏi những thay đổi từ lower-level component.

---
    
*Dịch và tham khảo từ [Clean Architecture: A Craftsman's Guide to Software Structure and Design (Robert C. Martin Series)](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)*