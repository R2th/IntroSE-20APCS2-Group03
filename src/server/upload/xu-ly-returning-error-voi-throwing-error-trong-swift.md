### Trong Swift có 2 cách xử lý lỗi:
+ Return Value - Hàm trả về giá trị như Boolean, Class, Enum và các kiểu khác.
+ do - catch statement - Hàm sẽ "ném" về các lỗi. Những lỗi này sau đó sẽ được xử lý bởi câu lệnh do-catch:

```
do {
    try functionThatThrowsError()
} catch ERROR_TYPE { 
     //Implementation 
}
```
### Vậy sự khác nhau là gì?<br>
Để trả lời câu hỏi này thì chúng ta bắt đầu với ví dụ sau:<br>
Chúng ta có một cái xe và chúng ta cần phải quyết định chiếc xe đó có đủ xăng hay ko hay động cơ có bị quá nóng. Và để xác định được các trường hợp trên thì ta có các hàm như sau: *driving()* và *temperatureChanged(:Double)*. 

### Trường hợp trả về giá trị (Return value):<br>
Đầu tiên, chúng ta tạo enum cho EngineTemperature:<br>
![](https://images.viblo.asia/e177e635-907b-44b1-8792-a63ba7e2f899.png)

Tiếp theo, ta sẽ tạo một struct gọi là Car:<br>
![](https://images.viblo.asia/f2f821d9-aee6-400b-ba0c-5c01462c7feb.png)

Trong Car có hai hàm:
+ driving() -> Bool sẽ trả ề False nếu gas không đủ
+ temperatureChange(:Double) → EngineTemperature sẽ trả về TooHigh khi nhiệt độ lớn hơn bằng 100, ABitHot khi nhiệt đồ lớn hơn bằng 60 và nhỏ hơn bằng 100 và Cool khi nhỏ hơn 60.
<br>
![](https://images.viblo.asia/d01116c2-f32e-4366-8464-1122c45e6916.png)

Như chúng ta thấy, việc trả về giá trị rất rõ ràng, thẳng thắn. Tuy nhiên, đôi khi có những lúc chúng ta có thể quên một số lỗi khi cài đặt nó. Và việc cài đặt quá nhiều câu lệnh điều kiện sẽ dẫn đến việc giảm khả năng đọc của code.

### Trường hợp sử dụng do-catch:
Đầu tiên, chúng ta cần xác định 2 enums gọi là EnginEror và EngineTemperatureError với Error Protocol:<br>
![](https://images.viblo.asia/ea2eec2d-ca53-44a2-9521-1a4525e3502b.png)<br>
EngineError có một lỗi gọi là InsufficientGas và EngineTemperatureError có 2 lỗi với các giá trị liên quan là EngineTooHot và EngineABitHot.<br>
Tiếp theo chúng ta cài đặt struct Car:<br>
![](https://images.viblo.asia/3ec8fc4a-0e6d-47bb-acec-f0d3b2ff2a40.png)
Vì chúng ta sẽ "ném" về lỗi nên sẽ không cần phải trả về bất kì giá trị nào từ driving() và temperatureChange(_: Double):<br>
![](https://images.viblo.asia/0fba1000-ad9d-4deb-b760-b6f9d84baf23.png)

Với cách này, chúng ta có thể chia code dành cài đặt thông thường và code dành cho xử lý lỗi. Code dễ đọc và rõ ràng hơn.

### Thuận lợi và bất lợi:
**Return Value:**
+ Thuận lợi: Dễ dàng cài đặt
+ Bất lợi: Không phù hợp khi chúng ta cần nhiều thông tin trả về hơn.

**Do-catch:**
+ Thuận lợi: Cho phép chúng ta có nhiều cấu trúc lỗi phức tạp hơn. Tăng khả năng rõ ràng của code.
+ Bất lợi: Phức tạp.

Trong ví dụ trên, nếu chúng ta chỉ muốn biết liệu có đủ xăng để tiếp tục lái không, thì trả về một Bool là đủ. Tuy nhiên, khi chúng ta muốn biết nhiệt độ của động cơ, và xem nếu nó có bị quá nóng hoặc nhiệt độ bình thường thì "ném" về một lỗi sẽ phù hợp hơn.<br>

### Tóm lại:<br>
Nếu chúng ta muốn lấy giá trị đơn giản từ một hàm thì sử dụng Return Value.
Còn nếu muốn gì đó hơn bình thường thì có lẽ dùng Do-catch sẽ phù hợp hơn.


**Reference**: https://medium.com/flawless-app-stories/returning-error-vs-throwing-error-in-swift-8d3657e1330d