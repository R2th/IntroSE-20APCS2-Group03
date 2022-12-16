### **1. Null Safety** <br>
Kể từ phiên bản `Dart 2.12` và `Flutter 2.0` trở đi các biến `Non-Nullable` như String, int, ... sẽ mặc định là không thể null để tránh trường hợp các lỗi xảy ra ở runtime, khi bạn sử dụng  **Null Safety** bạn có thể cho phép các biến ở trên trở thành biến `Nullable types`. Sau đây mình sẽ giới thiệu cho các bạn cơ bản các `Null-aware Operators`.<br>
### **2. Question Mark: ?**<br>
Toán tử `Question Mark: ?` giúp ta khai báo một biến `Nullable Type`, khi này giá trị của biến vẫn là null nhưng chương trình sẽ không báo lỗi vì cơ chế Null safety nữa. <br>

Với cú pháp `String?` ta đã có thể khai báo biến **testNull** mà không cần gán giá trị cho nó, Lúc này **testNull** chính là một biến `Nullable Type` và vì nó không có giá trị( null) nên ta không thể truy cập vào thuộc tính hay phương thức của biến. <br> 

Ví dụ: 

![](https://images.viblo.asia/f2fe4198-1445-41e6-aa11-b505e6c324cd.jpg)

Để có thể có thể truy cập vào thuốc tính hay phương thức của biến **testNull** đơn giản chúng ta chỉ cần thêm dấu **?** trước dấu **.** để tao thành `Conditional property access: ?.` giúp bạn truy cập vào thuộc tính hay phương thức của biến null.

 ![](https://images.viblo.asia/bf165858-ed03-4e61-8d39-c293c2a7055b.jpg) 
 
 Lúc này khi thực thi, code không còn bị lỗi mà trả về hai giá trị `null`.<br>
 ### **3. Double Questions Mark: ??**<br>
 Với `Double Questions Mark: ??` chúng ta có thể so sánh giá trị của biến Nullable với một biểu thức khác.<br> 
 
 Ví dụ:
 
 ![](https://images.viblo.asia/6a481bee-3f05-4c94-8ffd-875905679d26.jpg)
 
 Với điều kiện biến **testNull** là null thì hệ thống sẽ trả về giá trị được so sánh là `Other value`.
 
  ![](https://images.viblo.asia/77bcade1-e5de-422f-b223-5d5ded995cf5.jpg)

Còn với điều kiện biến **testNull** có giá trị, kết quả sẽ trả về giá trị của biến là `Value`.

 ### **4. Double Questions + Equal Mark: ??=**<br>
 Với `Double Questions + Equal Mark: ??=` chúng ta sẽ có được giá trị của biến `Nullable`  sau khi so sánh điều kiện biến có null hay không. <br> 
 
 Ví dụ: 
 
![](https://images.viblo.asia/97395a76-f449-4e0c-b91e-860a280624da.jpg)

Khi **testNull** không có giá trị, hệ thống sẽ gán giá trị của testNull là `Other value` sau đó in ra màn hình.
 
![](https://images.viblo.asia/1e028555-8c73-4dd0-b65c-fa82cad42a56.jpg)

 
Còn khi **testNull** đã có giá trị từ trước, hệ thống sẽ in ra giá trị của **testNull** là `Value`.

 ### **5. Null-aware Spread Operator: ...?**<br>
Với toán tử này chúng ta sẽ nhìn vào ví dụ để dễ hình dung cách thức nó hoạt động. <br>

Ví dụ:

![](https://images.viblo.asia/51f01f9a-a41b-432d-87e7-280672ae329e.jpg)


Khi insert một `Nullable List` như **testNull** vào một List khác thì ta sẽ bị lỗi như trên hình, vì vậy để fix lỗi này chúng ta chỉ cần thêm `?` vào sau `...` tạo thành `Null-aware Spread Operator: ...?` như hình bên dưới:

![](https://images.viblo.asia/a172c36b-b2c2-49f6-93c6-34ea304bcc0a.jpg)

Và nếu **testNull** có giá trị thì **finalList** vẫn sẽ nhận giá trị một cách bình thường:

![](https://images.viblo.asia/9dfeb071-b412-41ac-b65f-c0254e9561e2.jpg)

### **6. Exclamation Mark: !**<br>

`Exclamation Mark: !` hiểu đơn giản thì nó sẽ chuyển một thằng `Nullable thành Non-Nullable` hoặc dùng nó để check một biến nào đó sẽ không null khi runtime. <br>

Ví dụ

![](https://images.viblo.asia/0172b0ad-9d9e-4fb4-8b4d-31f44a17bedf.jpg)

Ta thấy rằng  `null + ! = crash` vì biến có giá trị null sẽ bị lỗi ở runtime vì vậy chỉ nên sử dụng `!` khi bạn biết chắc rằng giá trị của biến sẽ không bao giờ là null. 

![](https://images.viblo.asia/38be6751-9097-4c17-ad58-17135db50f36.jpg)


Nếu biến đã là `Non-Nullable` thì sẽ ra kết quả một cách bình thường thôi,  `!` không chuyển thằng `Non-Nullable` ngược lại thành `Nullable` đâu nhé!. 

### **7. Late Keyword: late**<br>

Nếu bạn muốn khai báo một biến  `phải mang giá trị có ý nghĩa` khi runtime chứ không phải là null như khi dùng `Question Mark: ?` và ta sẽ khởi tạo giá trị cho nó sau chứ không phải ngay lúc này thì ta có thể dùng keyword `late` trước khai báo biến. Với `late`, nếu bạn quên khởi tạo giá trị cho biến, nó sẽ có giá trị null dẫn đến crash chương trình của bạn khi runtime.

Ví dụ:

Tên của thứ gì đó thì nên có cái tên cụ thể vì vậy ta nên dùng `late` thay cho `?`.

![](https://images.viblo.asia/58adb1d5-6c0b-4492-af5f-50195a3f4399.jpg)

Chương trình ở trên sẽ crash vì biến `name` chưa được khởi tạo giá trị. Nếu chúng ta khởi tạo giá trị cho nó, chương trình sẽ chạy một cách bình thường( hình dưới).

![](https://images.viblo.asia/4d8b4e27-eeb6-4e2f-b3d7-bf13687b0dae.jpg)

###  **Tổng kết**<br>

Vậy là mình đã giới thiệu cho các bạn những kiến thức cơ bản về các `Null-aware Operators` trong Dart và Flutter. Mình cũng chỉ mới tìm hiểu về Dart và Flutter gần đây thôi và kiến thức ở trên là thứ mà mình cóp nhặt được trên mạng, nó có thể đúng có thể sai vì vậy có gì sai sót mong các bạn có thể comment ở phía dưới nhé!.

Tham khảo:<br>
Flutter Null Safety - Johannes Milke: https://youtu.be/5Ro-CZ8Msno <br>
Understanding null safety - Dart.dev: https://dart.dev/null-safety/understanding-null-safety