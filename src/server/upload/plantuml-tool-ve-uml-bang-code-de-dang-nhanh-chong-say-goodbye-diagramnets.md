## 1. Mở đầu 
Gần đây tôi có tham gia một dự án làm web, app cho một công ty logistic lớn của Nhật Bản dưới vai trò Brse.  Do đây là một dự án lớn, dài hơi nên giai đoạn basic design và detail design khá là dài, thậm chí chiếm 60% thời gian dự án. Và đặc biệt khách hàng yêu cầu rất cao về tài liệu spec, và trong đó có yêu cầu tất cả các API, Trigger, Schedule đều phải vẽ flow để khách hàng review trước khi anh em dev bắt tay vào code. Ban đầu khi đưa yêu cầu này về cho anh em Backend bị mọi người phản đối với rất nhiều lý do, sao mà vẽ hết được !!! Tuy nhiên sau nhiều hồi nài nỉ thì cũng được đội nhà approve, và mọi người sau đó cũng giao task vẽ flow cho Brse luôn T.T .  
Với gần 300 màn web và 150 màn app thì số lượng flow tương ứng số lượng API, Trigger, Schedule nó cũng đến tầm 60 cái. Ban đầu mọi người thống nhất sử dụng tool free [diagram.net](https://www.diagrams.net/) , ngày ngày ngồi kéo thả trên giao diện như một anh nông dân, mỗi khi spec thay đổi hay khách hàng comment phải sửa là lại ngồi chỉnh chỉnh từng cái ô, từng cái mũi tên :sweat:.
Rồi con run xéo lắm cũng quằn, không thể chịu cảnh ngồi chỉnh chỉnh sửa sửa từng tí một trên giao diện nữa thì tôi quyết định tìm một cách vẽ mới để cải tiến, rút ngắn cái bước vẽ flow này. Và đó là lúc tồi tìm ra người bạn [PlantUML](https://plantuml.com/)    
![](https://images.viblo.asia/67aadf0b-b048-4dcc-94e9-2f4d6984e7f6.png)

## 2. PlantUML là gì 
Hiểu nôm na thì PlantUML là một tool cho phép convert từ code sang biểu đồ UML. Với syntax code đơn giản thì không chỉ developer mà cả những bạn non-tech cũng hoàn toàn có thể học và nhanh chóng sử dụng thành thạo.  
Sau một thời gian sử dụng thì tôi nhận ra một số ưu nhược điểm của tool này như sau  
#### Ưu điểm
* Free, dễ dàng cài đặt và sử dụng ngay trên những IDE quen thuộc, hoặc có thể làm online luôn. 
* Dễ dàng quản lý và chia sẻ, review chéo trong team, như dự án tôi đang làm thì đang quản lý bằng git luôn khá là tiện 
* Thời gian tạo và chỉnh sửa bằng code nhanh hơn 60% so với tool vẽ bằng giao diện
* Hỗ trợ có thể vẽ được hầu hết các kiểu sơ đồ UML  Sequence diagram, Usecase diagram, Class diagram, Object diagram, Activity diagram ...
* Với kiểu sơ đồ Sequence Diagram thì code PlantUML có thể coi như là mã giả, rất hữu ích cho anh em khi bắt tay vào code thật không bỏ sót case 
* Dễ dàng export ra ảnh cho khách hàng review, hoặc ngay khi đang code có thể xem ảnh phản ánh trực tiếp code 
####  Nhược điểm 
* Với anh em dev thì chắc không thấy nhược điểm gì nhưng vỡi những bạn non-tech thì ban đầu sẽ phải học và nhớ syntax
## 3. Cài đặt 
Đầu tiên bạn hoàn toàn không cần phải cài đặt mà làm trực tiếp online ở [đây](http://www.plantuml.com/plantuml/uml/SyfFKj2rKt3CoKnELR1Io4ZDoSa70000) cho nhanh tới công chuyện :rofl:  
Tuy nhiên tôi vẫn khuyên mọi người nên cài đặt ở máy và làm ở local để dễ dàng lưu giữ code, và có thể vẽ UML ngay cả khi không có internet. Cụ thể là mọi người sẽ cần cài một IDE bất kỳ như Visual Studio Code (VS), Eclipse, Sublime Text..., Vì hiện tôi đang dùng Visual Studio Code nên sẽ hướng dẫn mọi người viết code PlantUML với  Visual Studio Code.   
#### 3.1 Cài đặt Java 
Bạn có thể xem hướng dẫn cài Java ở [trang chủ Oracle ](https://www.oracle.com/java/technologies/javase-downloads.html)
#### 3.2 Cài đặt Visual Studio Code
Bạn có thể xem hướng dẫn cài Visual Studio Code tại [đây](https://code.visualstudio.com/download) 
#### 3.2 Cài extention PlantUML 
Sau khi cài extention PlantUML thì bạn có thể viết code UML với các file với đuôi *.wsd, *.pu, *.puml, *.plantuml, *.iuml   
![Install extention PlantUML in Visual Studio Code](https://images.viblo.asia/3ef03eed-2bdf-4ba5-816d-b78c5ac4da75.png)

Sau khi code xong thì nhấn tổ hợp phím `ALD + D` hoặc `Option + D` để preview image UML
![](https://images.viblo.asia/e42fcb77-d67d-4a85-9a67-32f651e6f7e1.png)

## 4. Code syntax 
Bạn có thể đọc đầy đủ document tại trang chủ https://plantuml.com/sequence-diagram
Do dự án hầu như phải vẽ Sequence Diagram nên sẽ xin phép dịch một phần document của Sequence Diagram.
#### 4.1 Ví dụ cơ bản 
Code UML sẽ luôn phải được đặt trong block @startuml, @enduml
![](https://images.viblo.asia/8c90c940-dbb2-4847-9fa0-57b8cf719c94.png)
Dấu mũi tên `->` để vẽ mũi tên kết nối 2  thành phần trong UML, các  phần có thể không cần khai báo trước. Để vẽ  mũi tên nét đứt thì dùng ký hiệu `--> `.  
#### 4.2  Khai báo thành phần 
Mặc dù các thành phần không cần khai báo trước code vẫn chay đúng, nhưng một biểu đồ UML sẽ có nhiều kiểu thành phần khác nhau nên với keywords khai báo khác nhau thì có thể vẽ thành phần với hình ảnh tượng trưng tương ứng dễ hiểu. Các keywords khai báo thành phần như sau 
* actor
* boundary
* control
* entity
* database
* collections
* queue
![](https://images.viblo.asia/c0ad5f85-14d9-493a-b76d-c352803b2cd3.png)
Bạn có thể dùng `as` để rename lại tên thành phần. Bạn cũng có thể đổi màu background cho thành phần 
![](https://images.viblo.asia/94e34bc0-ad51-4d65-b742-daa3b6bbba95.png)
#### 4.3  Căn chỉnh văn bản trên 
Căn chỉnh văn bản trên các mũi tên có thể được đặt sang trái, phải hoặc giữa bằng cách sử dụng `skinparam sequenceMessageAlign` , đặt nằm dưới  tên sử dụng `skinparam responseMessageBelowArrow true`
![](https://images.viblo.asia/29ee8860-ecd4-418f-9f71-b64c4562c998.png)
#### 4.4  Đổi style mũi tên  
![](https://images.viblo.asia/b6fdee03-b97e-4074-bbe1-abb716bf9128.png)
#### 4.5  Đặt page title, header, footer
Dùng các keyword title, header, footer để thêm title, header, footer cho diagram
![](https://images.viblo.asia/1ced815d-4cc6-44cd-a28d-0cb512eafe15.png)
#### 4.6  Nhóm message 
Có thể nhóm cácmessage lại với nhau bằng các từ khóa sau:
* alt/else
* opt
* loop
* par
* break
* critical
* group
Có thể thêm một văn bản sẽ được hiển thị vào tiêu đề. Từ khóa end được sử dụng để đóng nhóm. Lưu ý rằng có thể lồng các nhóm.
![](https://images.viblo.asia/bcad8191-1d2a-4826-ad03-1cb0b0a50d88.png)
#### 4.7  Tạo ghi chú 
Có thể ghi chú vào message bằng cách sử dụng từ khóa ghi chú `note left` hoặc `note righ`t bên phải ngay sau message. 
Bạn có thể có một ghi chú nhiều dòng bằng cách sử dụng các từ khóa `end note`.
![](https://images.viblo.asia/7b78bf02-dfb9-44db-8a52-ffe2f89b2bf3.png)
## 5. Kết luận 
PlanUML là một lựa chọn hoàn hảo nếu bạn muốn dễ dàng và nhanh chóng vẽ UML và cũng rất tiện khi chỉnh sửa, lưu trữ và chia sẻ.   
Cũng chia sẻ lại câu chuyện dự án khi ban đầu rất phản đối việc API nào cũng phải vẽ flow, nhưng sau khi áp dụng vào thực tế thì ai cũng thấy lợi ích to lớn của tài liệu flow. Khi code thì ae cứ dựa theo flow mà code đảm bảo không sợ lack case, thực tế có những API payment rất phức tạp dài ngoằng ngoẵng nhưng nhờ có flow nên team lead cũng mạnh dạn đưa task cho new member. Khi có lỗi thì các bên cứ đưa flow ra mà mổ sẻ, vì flow đã được khách hàng review rồi nên nếu code đúng flow mà bị sai thì cũng có thể ngẩng mặt đi nói chuyện với khách :nerd_face:.   
Vì vậy rất khuyến khích mọi người vẽ UML trước khi bắt tay vào code, sẽ giảm được tỷ lệ lỗi đáng kể đó :grin: