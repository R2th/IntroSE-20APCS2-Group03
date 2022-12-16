# Event là gì
Một event trong bối cảnh của phát triển phần mềm là những gì xảy ra xung quanh chúng ta, những thứ mà được chúng ta chọn để đưa vào hệ thống, hay nói cách khác đó là những thứ quan trọng và đáng chú ý nhất. Kịch bản phổ biến nhất bao gồm:
- Lưu trữ event cho việc phân tích
- Hỗ trợ việc giao tiếp giữa các service bằng cách xuất bản các event ứng dụng
- Sử dụng **Event Sourcing** để cung cấp một nguồn duy nhất của trạng thái dữ liệu

Event là các buiding block mà có thể trở nên phổ biến cho nhiều trường hợp sử dụng. Nhiều sản phẩm phần mềm dựa trên thiết kế của event như một core buiding block. Giống như bất kỳ buiding block khác hoặc định nghĩa nó như một phần quan trọng để nhận ra rằng tất cả các event không phải là tương đương nhau. Đầu tiên hãy xem các thuộc tính của event phổ biến bất kể là trường hợp sử dụng nào hoặc sản phẩm liên quan.

### Events là không thể thay đổi
Khi điều gì đó đã xảy ra trong thế giới xung quanh chúng ta nó là thực tế. Chúng ta không thể thay đổi lịch sử và việc mang sự thừa nhận này đến thiết kế của phần mềm là điều rất quan trọng khi phát triển hệ thống. Bạn mô hình hóa thế giới bằng cách lắp ráp chúng lại với nhau để làm thế nào đó nhận thức thế giới xung quanh. Những điều xảy ra liên tục và không phải thứ gì chúng ta cũng có thể nắm bắt chúng. Hệ thống phần mềm có thể hỗ trợ chúng ta ghi lại và nhớ những điều quan trọng và điều này là lý do tại sao các event là một mô hình tuyệt vời.
### Event chỉ xảy ra một lần
Một event chỉ có thể xảy ra một lần. Nếu điều tương tự xảy ra một lần nữa thì nó vẫn được coi là một event khác bởi khi đó nó được định nghĩa là event xảy ra sau khi event đầu tiên. Khi bạn đến thăm ngôi nhà của bạn bè và bạn bấm chuông ba lần bởi vì họ mở cửa chậm chễ thì có 3 lần xảy ra event của tiếng chuông kêu.

Đôi khi, về mặt kỹ thuật có thể chọn tổng hợp nhiều event chi tiết thành một event lớn hơn vì lý do hiệu suất hoặc đơn giản vì nó có ý nghĩa hợp lý hơn trong ứng dụng mà chúng ta đang phát triển. Về mặt logic, đó là một khởi đầu tốt để tách các event và làm cho chúng càng rõ ràng càng tốt.

### Events là cái đã xảy ra
Một event luôn luôn miêu tả một cái gì đó đã xảy ra trong thực tế. Điều này hàm ý rằng khi chúng ta nhìn các event chúng ta thấy  nó đã xảy ra trong quá khứ và điều này là lý do tại sao chúng ta viết các event trong thì quá khứ (past tense). Nó là một thực hành tốt để giới hạn về naming convention vì event có thể dễ dàng nhầm lẫn với request đến hệ thống. Request có thể bị từ chối và chúng ta thường không lưu trữ lịch sử của request trừ khi cho mục đích phân tích.
# Kỹ thuật triển khai
Một event là một tập hợp của dữ liệu, đây là điều cốt lõi của nó. Event không nắm giữ bất kỳ hành động nào hoặc yêu cầu bất kỳ framework chỉ định nào. Để sử dụng các event bạn cần sắp xếp theo thứ tự/ không theo thứ tự dữ liệu từ một serializable format như vậy chúng có thể gửi đi hoặc lưu trữ trong kho lưu trữ bền vững. Một lựa chọn tốt ở điểm này là **JSON** khi đó nó sẽ dễ đàng đễ đọc, phần nào đó ngắn ngọn trong format và nói chung hỗ trợ tất cả các ngôn ngữ lập trình. 

Về mặt công nghệ, dữ liệu event nên bao gồm một timstamp để đánh dấu khi nào event xảy ra trong dữ liệu **JSON** của nó, cũng như một định danh (kiểu **UUID** là một lựa chọn tốt) để có thể phân định giữa các event với nhau. Triển khai của một event sử dụng **JSON** có thể giống như bên dưới:
```json
{
   "eventId" : "e4f57d96-994e-4172-a3a6-9820709c87cc",
   "eventType" : "Saved product",
   "timestamp" : "1593168851560",
   "data" : {
     "field1" : "Data here",
     "field2" : "More data"
   }
}
```
# Domain Events là gì?
**Domain Events** là một khái niệm quan trọng bên trong **Domain-Driven Design**. Tuy nhiên, khái niệm **Domain Events** chưa được đưa vào cuốn sách tuyệt vời của **Eric Evan** về **Domain-Driven Design** ở lần xuất bản đầu tiên nhưng nó đã được thêm ở các lần sau, điều này giải thích cách tập trung xung quanh các event khác với cách chúng ta sử dụng để thiết kế hệ thống như thế nào.

**Domain Events** là một phần của [Domain Model](https://serialized.io/ddd/domain-model/), như vậy để định nghĩa nó chính xác, chúng ta ta phải đưa về đúng bối cảnh. Trong **Domain-Driven Design** chúng ta tạo một model hợp lệ bên trong một **Bounded Context**. Bối cảnh là giải pháp cho một vấn đề cụ thể mà chúng ta cần giải quyết, như vậy nó có thể là một subsystem hoặc một microservice hoặc cả nguyên một ứng dụng. Nguyên tắc cốt lõi của **Domain Model** là giống như vậy - chỉ hợp lệ bên trong bối cảnh của nó. 

Câu hỏi trong khi định nghĩa **Domain Events**:
- Các bên liên quan/business có quan tâm đến nó không ?
- Nó là một quyết định bởi hệ thống của chúng ta hay hệ thống khác ?
- Nó có gói gọn lý do đằng sau sự thay đổi không ?

### Aggregates tạo Domain Events
Một **Domain Events** là một event, nó được sản sinh từ model và nó là kết quả của việc quyết định bên trong domain. Bên trong model, [Aggregates](https://serialized.io/ddd/aggregates/) có vai trò bảo trì những business rule và đây là nơi chúng ta triển khai những điểm quyết định trong model, như vậy **Aggregates** cũng có trách nhiệm cho việc tạo **Domain Events**.

![](https://images.viblo.asia/98f15d78-5607-45ad-8f13-46e5f3436400.png)

Ảnh ở trên sẽ giúp ta hình dung **Domain Events** là một phần của **Domain Model**. Chúng không được gửi từ hệ thống khác và cũng không phải là do user gửi đến hệ thống khi thực hiện các hành động. Trong thuật ngữ kỹ thuật, có thể gọi là những message commands.

### Kỹ thuật triển khai
**Domain Events** có thể có một số triển khai chung cho các kiểu event khác nhau. Vì vậy nó cần có một ```aggregateId```, ```aggregateType```, ```eventType``` trong dữ liệu để hỗ trợ nơi sử dụng xử lý được chúng. Dữ liệu này nên có thể serializable giống như bất kỳ kiểu event khác và bạn không nên định nghĩa object của Domain Event với references quá nhiều cấp.

```JSON
{
  "aggregateType" : "payment",
  "aggregateId" : "1d0d12cd-ac5e-470a-8479-b5a871472445",
  "eventType" : "payment-successfully-completed",
  "eventId" : "e4f57d96-994e-4172-a3a6-9820709c87cc",
  "timestamp" : "1593168851560",
  "data" : {
     "customerId" : "ec930ec6-063f-41e2-9ecb-581cf5e2ad06",
     "amountPaid" : 334
  }
}
```

# Khi nào không phải là Domain Event?
Để đủ điều kiện là một **Domain Events** thì event nên có một ý nghĩa sâu hơn và quan trọng đến business của hệ thống. Mọi thứ xảy ra xung quanh chúng ta có thể được miêu tả như những event nhưng không có nghĩa là chúng ta cần triển khai mọi thứ xảy ra trong hệ thống phần mềm.

Những ví dụ sau có thể không thích hợp để coi là những **Domain Events**:
- Một vài kỹ thuật (click button, throw exception,..) đã xảy ra và chúng ta muốn ghi lại hoặc xử lý nhưng nó không được miêu tả trong ubiquitous language của lĩnh vực đang xây dựng
- Một số điều đã xảy ra bên ngoài của bounded context. Có thể là một **Domain Event** của hệ thống khác hoặc một bounded context khác biệt.
- Request tới hệ thống, chúng ta nên định nghĩa như một **Commands** hơn là events bởi vì chúng có thể bị từ chối bởi hệ thống.

# Bắt đầu như thế nào?
Bắt đầu với **Domain Events** không phải là một thử thách lớn đối với kiến trúc hệ thống. Nếu bạn đã đang thiết kế ứng dụng sử dụng **Domain-Driven Design** (DDD), bạn có thể bắt đầu bởi việc lưu các events cùng nhau với trạng thái ứng dụng hiện tại như một phần trong đó.

Khi bạn bắt đầu thêm **Domain Events** tới ứng dụng bạn có thể quan tâm đến **Event Sourcing**, nơi mà **Domain Events** là trung tâm của thông tin. Lập trình với events như build clock cơ bản có thể mất thời gian để bắt đầu nhưng việc học thường có giá trị theo thời gian và bạn sẽ nhận thấy ít rắc rối khi phục vụ nhu cầu của những người kinh doanh với dữ liệu. Bạn không phải sử dụng **Event Sourcing** để bắt đầu sử dụng **Domain Events**. 

### Domain Events và Event Sourcing có liên quan?
**Event Sourcing** là một architectural pattern, nó được áp dụng bên trong một **Bounded Context** để cung cấp một nguồn dữ liệu ở thời điểm duy nhất. Có nhiều cách hiểu khác nhau về **Event Sourcing**, nhưng hiểu đơn giản: **Event Sourcing** là khi bạn sử dụng **Domain Events** để lưu trữ trạng thái của một **Aggregate** bên trong một **Bounded Context**.

# Sai lầm và cạm bẫy phổ biến
Bắt đầu với **Domain Events** có thể cảm thấy lúng túng, khó khăn và có một vài điều cần nhớ để luôn đi đúng hướng với mô hình hóa của bạn. như vậy **Domain Events** sẽ mang giá trị thực sự đến thiết kế phần mềm của bạn.

### Có gắng mô hình hóa mọi thứ
**Domain Model** nên là hữa ích với vấn đề mà bạn đang giải quyết. Model là ở đó để bắt buộc các business rule mà bạn có và tốt nhất là kiến trúc chỉ nên cung cấp hỗ trợ tích hợp đủ đơn giản cho bạn có thể kết nối ứng dụng với hệ thống khác, nghĩa là nó không cần những thứ không liên quan đến cái cốt lõi của business.

Một cạm bẫy phổ biến mà các lập trình viên hay mắc phải là cố gắng model mọi thứ liên quan đến vấn đề. Đây là nơi mà sự phân biệt giữa **Domain Event** và các events khác trở nên hữu ích vì nhiều khi các events khác xảy ra (kỹ thuật hoặc ngoại vi) có thể được coi là event ghi nhật ký mà chúng ta có thể lưu trữ chỉ cho mục đích phân tích.

### Không thoát khởi tư duy CRUD
Một trong các sai lầm phổ biến khi bắt đầu với **Domain Events** và **Domain-Driven Design** nói chung là không đi hết toàn bộ con đường và tìm ra những gì đang thực sự diễn ra trong domain. Mọi người thường dễ dàng rơi vào cạm bẫy của việc đặt tên tất cả events: **SomethingCreated**, **SomethingUpdated** và **SomethingDeleted**. Mặc dù bản thân việc này không phải là vấn đề nhưng nó không tận dụng được sức mạnh ý nghĩa của bối cảnh thực tế mà Domain Event mang lại. Bạn đánh mất ý định thực sự của event và việc đọc nhật ký event sau đó sẽ không mang lại nhiều giá trị.

# Summary
Bài viết này tôi mong muốn giới thiệu với bạn về khái niệm **Domain Event**, mối quan hệ của nó trong **Domain-Driven Design**, cũng như cách phân biệt đâu thực sự là **Domain Event** và đâu là event khác. Đồng thời định hình cho chúng ta cách làm sao để bắt đầu với chúng, những sai lầm cần tránh khi áp dụng. Bài viết không thự dễ hiểu nhưng hy vọng mang lại điều bổ ích cho các bạn. Cảm ơn các bạn đã theo dõi bài viết.

**Bài viết được lược dịch theo nguồn:**<br>

https://serialized.io/ddd/domain-event/