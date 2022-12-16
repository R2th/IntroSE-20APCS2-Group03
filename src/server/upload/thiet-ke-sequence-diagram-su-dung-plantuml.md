## Tổng quan
Sequence Diagram (biểu đồ tuần tự) mô tả luồng hoạt động một số chức năng quan trọng/phức tạp. Ví dụ chức năng thanh toán, chức năng booking. Với những chức năng phức tạp, với các workflow chồng chéo, việc xây dựng tài liệu Sequence Diagram là rất cần thiết và còn giúp các thành viên mượng tượng rõ ràng hơn về quy trình vận hành, workflow của các chức năng. 

Biểu đồ tuần tự là biểu đồ dùng để xác định các trình tự diễn ra sự kiện của một nhóm đối tượng nào đó. Nó miêu tả chi tiết các thông điệp được gửi và nhận giữa các đối tượng đồng thời cũng chú trọng đến việc trình tự về mặt thời gian gửi và nhận các thông điệp đó. 

## Hướng dẫn
### 1. Các thành phần trong Sequence Diagram
Để hiểu sơ đồ tuần tự (sequence diagram) là gì, trước tiên, chúng ta nên làm quen với các ký hiệu và thành phần của nó. Sơ đồ tuần tự được tạo thành từ các thành phần sau: 

  
| Tên | Kí hiệu (hình vẽ) | Code            |Mô tả | 
| ----- |:----------------------: | --------            |-------- |
| Đối tượng (Object, Class) | ![](https://images.viblo.asia/679edad5-693d-4d2d-8105-2040408b8230.png) | `@startuml`<br><br>`participant User`<br><br>`@enduml`| Đại diện cho một lớp (class) hoặc đối tượng (object). Kí hiệu đối tượng cho thấy một đối tượng sẽ hoạt động như thế nào trong bối cảnh của hệ thống.|
| Activation box | ![](https://images.viblo.asia/2e25f258-a1b8-4b3c-8730-c20aec012492.png) | `@startuml`<br><br>`participant User`<br>`participant "First Class" as A`<br>`User -> A: DoWork`<br>`activate A`<br><br>`A --> User: Done`<br>`deactivate A`<br><br>`@enduml` |Đại diện cho thời gian cần thiết cho một đối tượng để hoàn thành một tác vụ. Nhiệm vụ sẽ nhiều thời gian, activation box càng dài. 
| Actor | ![](https://images.viblo.asia/e7c1a57f-786f-409c-9feb-90b698f5a83b.png) | `@startuml`<br><br>`actor User`<br><br>`@enduml`  |Hiển thị các thực thể tương tác với hoặc bên ngoài hệ thống.  |
| Lifeline | ![](https://images.viblo.asia/679edad5-693d-4d2d-8105-2040408b8230.png)  <br><br>![](https://images.viblo.asia/e7c1a57f-786f-409c-9feb-90b698f5a83b.png) | `@startuml`<br><br>`participant User`<br><br>`@enduml`<br><br><br>`@startuml`<br><br>`actor User`<br><br>`@enduml`  |Đại diện cho thời gian trôi qua. Hiển thị các sự kiện tuần tự xảy ra với một đối tượng trong tất cả quá trình.  |
| Message | | | Thông điệp giao tiếp giữa các lớp và đối tượng  |
| Synchronous message  | ![](https://images.viblo.asia/625aef2c-0b70-4048-bb4b-7038f33d9ab3.png) | `@startuml`<br><br>`participant Client`<br>`participant Server`<br><br>`Client -> Server`<br><br>`@enduml ` | Được sử dụng khi người gửi phải chờ phản hồi thông điệp trước khi có những hành động tiếp theo. Sơ đồ phải hiển thị cả yêu cầu và trả lời. |
| Reply message  | ![](https://images.viblo.asia/bf90c728-0b4d-4653-a902-0265a3b9390a.png)  |  `@startuml`<br><br>`participant Client`<br>`participant Server`<br><br>`Client <-- Server`<br><br>`@enduml ` | Thông điệp trả lời cho những yêu cầu.  |
| Asynchronous message  | ![](https://images.viblo.asia/08111f8e-631c-465c-b4ad-9dec029834ac.png) |  `@startuml`<br><br>`participant Client`<br>`participant Server`<br><br>`Client ->> Server`<br><br>`@enduml ` | Không yêu cầu phản hồi trước khi người gửi tiếp tục. |
| Asynchronous return message  | ![](https://images.viblo.asia/39799165-6031-49b8-a982-7257f1af5e15.png) | `@startuml`<br><br>`participant Client`<br>`participant Server`<br><br>`Client <<-- Server`<br><br>`@enduml ` | Trả lời thông điệp kiểu không đồng bộ.  |
| Create message  | ![](https://images.viblo.asia/8e3a743b-0581-4dd9-9a51-6ca55945bc0f.png) | `@startuml`<br><br>`participant Client`<br>`participant Server`<br><br>`Client -> Server: <<createRequest>>`<br>`Server --> Client: Created`<br><br>`@enduml` | Thông điệp thông báo tạo một lớp hoặc đối tượng  |
| Delete message  | ![](https://images.viblo.asia/cf83546d-bae8-4456-a7d9-6ec4dd870e55.png) | `@startuml`<br><br>`participant Client`<br>`participant Server`<br><br>`Client -> Server: DoWork`<br>`activate Client`<br>`Server --> Client: WorkDone`<br>`destroy Server`<br>`deactivate Client`<br><br>`@enduml`  | Thông điệp thông báo hủy một lớp hoặc đối tượng  |
| Loop  | ![](https://images.viblo.asia/12d92513-ab1b-443c-a272-746da8d917c9.png) | `@startuml`<br><br>`participant Client`<br>`participant Server`<br><br>`Client ->> Server: report`<br>`loop until reporting Client ends`<br>`Client -->> Server: report`<br>`end loop`<br><br>`@enduml`  | Được sử dụng để mô hình hóa các kịch bản if/then tức là, một kịch bản sẽ chỉ xảy ra trong một số điều kiện nhất định. |
| Alternative  |![](https://images.viblo.asia/1373dfe6-a677-4d42-8e5b-5d40c21bc8cd.png) | `@startuml`<br><br>`participant Client`<br>`participant Server`<br><br>`Client -> Server: Authentication Request`<br>`alt successful case`<br>&emsp;`Server -> Client: Authentication Accepted`<br>`else some kind of failure`<br>&emsp;`Server -> Client: Authentication Failure`<br>`else Another type of failure`<br>&emsp;`Server -> Client: Please repeat`<br>`end`<br><br>`@enduml`  | Tượng trưng cho một sự lựa chọn giữa hai hoặc nhiều message.  |
| Group | ![](https://images.viblo.asia/e259d653-a89b-4e4d-b6f2-c988c3c8c42c.png)  | `@startuml`<br><br>`participant Client`<br>`participant Server`<br><br>`group Working`<br>&emsp;`Client -> Server: DoWork`<br>&emsp;`activate Client`<br>&emsp;`Server --> Client: WorkDone`<br>&emsp;`destroy Server`<br>&emsp;`deactivate Client`<br>`end`<br><br>`@enduml` | Gom nhóm các messages hoặc box  |

### 2. Cách thiết kế Sequence Diagram với PlantUML
Sau khi đã làm quen với các kí hiệu và cách thức sử dụng chúng, chúng ta sẽ đi vào xây dựng một Sequence Diagram với PlanUML bằng một ví dụ cụ thể là chức năng rút tiền ở cây ATM.

__Step 1:__ Xác định các chức năng cần thiết kế <br>
- Dựa vào Use Case Diagram / User Story hay Requirement mà lựa chọn chức năng để thiết kế.<br>
___Chú ý:___ mỗi chức năng là một Sequence Diagram riêng biệt. 

__Step 2:__ Xác định các bước để thực hiện 
- Người dùng nhập đưa thẻ vào cây ATM 
- Người dùng nhập mã pin và hệ thống kiểm tra mã pin 
- Nếu sai thì thông báo cho người dùng, ngược lại thì hiển thị danh sách chức năng (Kiểm tra số dư, rút tiền) 
- Với trường hợp kiểm tra số dư, hệ thống lấy thông tin số dư và trả về thông tin số dư cho người dùng 
- Với trường hợp rút tiền, sẽ có 2 trường hợp xảy ra: đủ số dư để rút và không đủ số dư để rút 
- In hoá đơn, trả thẻ, xác nhận người dùng nhận lại thẻ khi kết thúc quá trình giao dịch 

__Step 3:__ Xác định đối tượng tham gia 
- Actor thể hiện người dùng 
- Cây ATM là phương tiện giao tiếp giữ người dùng và server 
- Server là nơi lưu trữ và xử lý yêu cầu (có thể tách xử lý yêu cầu ra thành một cotrol riêng biệt) 

__Sơ đồ kết quả:__
![](https://images.viblo.asia/df3d448c-e18c-44c3-8b19-9de2e72aa30d.png)

__Source code:__
```plantuml
@startuml 
actor User as user 
boundary "Cây ATM" as atm_machine 
database "Server Ngân Hàng" as bank_server 
 
user -> atm_machine: Nhập thẻ 
activate user 
activate atm_machine 
atm_machine -->> user: Yêu cầu mã PIN 
user -> atm_machine: Nhập mã PIN 
atm_machine -> bank_server: Kiểm tra mã PIN 
activate bank_server 
bank_server -->> atm_machine: Xác nhận mã PIN 
deactivate bank_server 
atm_machine -->> user: Hiển thị danh sách lựa chọn 
user -> atm_machine: Nhập lựa chọn 
 
alt Lựa chọn Kiểm tra số dư 
  atm_machine ->  bank_server: Lấy số dư 
  activate bank_server 
  bank_server -->> atm_machine: Trả về số dư 
  deactivate bank_server 
  atm_machine -->> user: Hiển thị số dư 
else Lựa chọn rút tiền 
  atm_machine -->> user: Yêu cầu nhập số tiền 
  user -> atm_machine: Nhập số tiền 
  atm_machine -> bank_server: Kiểm tra số dư 
  activate bank_server 
  bank_server -->> atm_machine: Trả về số dư 
  deactivate bank_server 
  alt Số dư > Số tiền muốn rút 
    atm_machine -> bank_server: Cập nhật số dư 
    activate bank_server 
    bank_server -->> atm_machine: Số dư đã được cập nhật 
    deactivate bank_server 
    atm_machine -->> user: Thông báo "Hãy nhận tiền" 
    user ->  atm_machine: Nhận tiền 
  else Số dư < Số tiền muốn rút 
    atm_machine -->> user: Thông báo "Số dư không đủ để giao dịch" 
  end 
else Hủy 
  atm_machine -->> user: Thông báo "Giao dịch đã bị hủy" 
end 
 
atm_machine -->> user: In hóa đơn 
atm_machine -->> user: Trả thẻ 
user -> atm_machine: Nhận lại thẻ 
atm_machine -->> user: Hiển thị cảm ơn 
destroy atm_machine 
destroy user 
 
deactivate user 
deactivate atm_machine 
 
@enduml
```

## Tạm kết 
Sequence Diagram là bản vẽ để xác định các đối tượng cũng như tuần tự các bước để thực hiện một bài toán, một chương trình. Sequence Diagram được dùng để thiết kế phát triển và test các chức năng. 
## Tài liệu tham khảo
Tài liệu tham khảo về công cụ PlantUML: https://plantuml.com/ 

https://plantuml.com/sequence-diagram