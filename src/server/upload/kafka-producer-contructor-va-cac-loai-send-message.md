### Constructing a Kafka Producer
Đầu tiên muốn ghi một message xuống Kafka là bạn cần tạo một producer object with các thuộc tính mà bạn gửi đến producer. Trong Kafka producer có 3 thuộc tính là yêu cầu bắt buộc.

**Bootstrap server** 

Bao gồm một danh sách các host:port của broker producer sẽ sử dụng để tạo kết nối đến cluster. Danh sách này không cần phải bao gồm tất cả các broker, từ đó producer sẽ có nhiều thông tin hơn sau khi hết nối thành công. Nhưng nên khuyến khích là có ít nhất 2 broker để chánh trường hợp 1 broker bị down thì producer vẫn còn kết nối đến cluster. 

**Key.serializer**

Là tên của class mà chúng ta sử dụng để tuần tự hoá các message của nhiều record, cung cấp cho Kafka. Kafka broker mong muốn array dạng byte, key và value của message. Tuy nhiên, producer cũng cho sử dụng nhiều parameterized type, bất kể các java object. Để có thể code một cách dễ đọc nó cũng có thể convert những object này đến dạng byte.

**Value.serializer**

Tên của class mà chúng ta sử dụng để tuần tự hoá các giá trị(message) của nhiều record, để bàn giao Kafka. Cách này tương tự với * key.serializer * cũng là name of class chúng ta sẽ tổng hợp các message key object đến dạng byte-array, bạn đặt *value.serializer* đến class sẽ tuần tự các giá trị(message) đến đối tượng thông báo.

### Send Method
Một instance producer chúng luôn có thời gian bắt đầu gửi message, có 3 methods của việc gửi message:

**Fire-and-forget:**
Là khi gửi message đến server, chúng ta thực sự không cần quan tâm đến việc nhận response là thành công hoặc thất bại. Đa số là sẽ nhận thành công bởi vì có cơ chế retry gửi lại đến khi thành công. Tuy nhiên cũng có đôi lúc sẽ thất bại.

**Synchronous send:**
Là khi gửi message đến server chúng ta sẽ đợi để nhận kết quả là thành công hay thất bại.

**Asynchronous send:**
Chúng ta send message with callback function, sau đó nó sẽ triggered khi nhận được response từ kafka broker.