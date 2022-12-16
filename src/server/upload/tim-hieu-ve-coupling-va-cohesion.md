Thế nào là thiết kế code tốt.
Thiết kế code tốt , là thiết kế có thể dễ dàng phát triển, code dễ đọc và dễ hiểu.
Thiết kế code tốt có thể dễ dàng trao đổi giữa các thành viê trong team, mọi người trong team đều có thể hiểu được cách thức tổ chức. Thiết kế code tốt giúp dễ dàng mở rộng nếu có tính năng mới và có thể sẵn sàng đối với những thay đối yêu cầu(dễ mở rộng và bảo trì).

Trong thiết kế lập trình, mục tiêu của chúng ta là đạt được 2 vấn đề chung cốt lõi đó là loose coupling và high cohesion. Những thứ mà có lẽ chúng ta đêu cảm thấy quen thuộc vì đã được dạy ở trường đại học.
Coupling nói một cách đơn giản nó là sự phụ thuộc lần nhau giữa các modules (có thể hiểu là class, thành phần của phần mềm), là tính liên kết giữa các modules. 
Thiết kế code tốt thì phải theo hướng loose coupling tức là sự liên kết giữa các class, các thành phần trong phần mềm càng ít chặt chẽ càng tốt. Bởi vì nếu các thành phần quá phụ thuộc lẫn nhau, khi chúng ta thay đổi 1 thành phần sẽ ảnh hưởng tới rất nhiều thành phần liên quan khác.

Cohesion cũng là chỉ mức độ về sự liên kết như coupling nhưng nó là sự liên kết ở mức chi tiết.
Sự liên kết giữa các thành phần bên trong 1 module càng chặt chẽ thì thiết kế đó càng tốt tức là high cohesion. Lý do cho high cohesion là tất cả các yếu tổ liên quan đến nhau được đặt trong 1 module để hướng tới 1 nhiệm vụ nhất định. Ví dụ như trong class Invoice chúng ta không lưu trường customer_name  trường này được lưu trong class Customer hay như  class Payment chúng ta không cần đặt vào đó function tính toán số tiền mà nhiệm vụ đó nằm ở class Invoice (tạo hoá đơn).

Mình từng được hoc kiến thức nay ở môn thiết kế và xây dựng phần mềm và lúc học thực sự cảm thấy khó hiểu và tài liệu đọc rất ít. Do vậy, hôm nay mình muốn viết những gì mình hiểu được sau khi đã học qua, mong rằng có thể giúp các bạn hiểu hơn về phần kiến thức này.

##  1. Coupling
![image.png](https://images.viblo.asia/179c1b6c-6685-4069-9142-a01201a68b1f.png)
Các bạn có thể thấy như trên hình, các mức độ vi phạm coupling và tính nghiêm trọng của nó tăng dần từ dưới lên với high coupling bao gồm content, common và control , loose coupling bao gồm stemp, data và uncoupled.

### 1.1 Content coupling
Đây là vi pham couling ở mức cao nhất được định nghĩa là khi mà một component có thể truy cập trực tiếp vào hoạt động bên trong của một component khác ví dụ như trực tiếp truy xuất data, thay đổi data của component. Hiểu đơn giản rằng chúng ta có 2 class A và B trong đó một đối tượng class A có một trường dữ liệu có giá trị là 1 đối tượng của class B. Khi đó nếu như bên trong object của class A có thể truy cập thông tin của object class B một cách trực tiếp thông qua B.field_name thì đó chính là vi phạm về content coupling. Để tránh điều này thì đối tượng lớp A không được trực tiếp truy cập vào nội dung của đối tượng lớp B mà phải thông qua method của đối tượng lớp B bằng cách set private cho field data và sử dụng các getter, setter method để truy xuất dữ liệu.
Ví dụ cho tính nghiêm trọng của content coupling đó là Balance cho tài khoản ngân hàng, chúng ta không get, set trực tiếp số tiền được mà phải thay đổi bằng cách gọi các hàm trừ tiền.

### 1.2 Common coupling 
![image.png](https://images.viblo.asia/d41094ff-c510-4bab-a13f-ebb972f602aa.png)
Common coupling xảy ra khi mà 2 hay nhiều module cùng đọc và thay đổi 1 dữ liệu dùng chung.
Đây cũng là một thiết kế tệ bởi vì nó gây ra sự không rõ ràng về vai trò của dữ liệu, code sẽ khó đọc, khó có thể xác định những thành phần code nào liên quan và ảnh hưởng đến dữ liệu dùng chung. Do đó giảm khả năng bảo trì hay tái sự dụng component.
Common coupling thường xảy ra ở các ngôn ngữ lập trình hướng cấu trúc như C bởi việc sử dụng data global là thường xuyên.


### 1.3  Control coupling 
Xảy ra khi mà tham số truyền vào cho module sẽ quyết định luồng xử lý của module theo những cách khác nhau. Điều này cũng rất thường gặp khi chúng ta truyền tham số vào hàm và tham số đó có thể chia thành nhiều nhóm dữ liệu. Do đó bên trong hàm chúng ta sẽ dùng nhiều if else để check tham số truyền vào. Và hãy hình dung xem, với mỗi loại tham số truyền vào thì function đó thực ra chỉ chạy 1 phần code trong 1 block if else thoã mãn điều kiện và đương nhiên rằng những phần code còn lại là không được chạy. 
Ví dụ như function updateCustomer(int type, Customer customer) với type có thể là các giá trị CREATE, EDIT, DELETE. nhưng customer chỉ sử dụng cho EDIT, với type là DELETE thì chỉ cần truyền id vào thay vì customer, đối với CREATE thì không cần sử dụng gì đến customer.

Còn rất nhiều tình huống thực tế khác có thể xảy ra có thể do chúng ta muốn xử lý nhanh vấn đề nhưng có thể dễ dàng thấy được code thiết kế như vậy sẽ khó đọc phụ thuộc vào số lượng kiểu của tham số truyền vào, nếu như nhiều thì code sẽ có if else rất nhiều level và giả sử xử lý logic là phức tạp, đó sẽ là cực hình khi mở rộng hay thay đổi tính năng. 

### 1.4 Stamp coupling
Đến đây thì vi phạm coupling đã không còn ở mức high nữa mà đã có thể chấp nhận được. 
Stamp coupling xảy ra khi tham số truyền vào cho module là thừa, việc xử lý có thể chỉ cần một vài trường dữ liệu của object nhưng chúng ta truyền nguyên object vào. Ví dụ như function printInvoice() và chúng ta truyền customer trong khi chỉ thông tin tên và địa chỉ khách hàng vậy thì những thông tin khác nằm trong customer là không cần thiết.

### 1.5 Data coupling
Là coupling ở mức thấp nhất khi mà các modules tương tác với nhau chỉ thông qua tham số truyền vào. Điều này là không thể tránh khỏi do vậy thiết kế này là được cho là mục tiêu hướng đến. Data coupling và stamp coupling đều được xác định bởi tham số truyền vào nhưng khác ở chỗ data coupling không dư thừa dữ liệu tham số truyền vào, tất cả tham số truyền vào đều được sử dụng để xử lý.

##  2. Cohesion
![image.png](https://images.viblo.asia/dfd03a7e-0380-4078-8250-4c857760d0ba.png)
Như các bạn có thể thấy các mức độ của cohesion đươc sắp xếp từ thấp đến cao. Cohesion thì ngược lại so với Coupling, mức độ cohesion càng thấp thì thiết kế đó càng bad và ngược lại thì cohesion càng cao thì thiết kế đó càng tốt. Và cũng như cohesion được trình bày ở trên, chúng ta tiếp tục nói từ bad đến good design nhé.

### 2.1 Coincidental
Nghĩa là tình cờ, ngụ ý nói đến những elements nằm trong component một cách lạc lõng và đơn độc, nó chỉ có điểm chung là nằm chung vị trí với các component khác chứ không liên quan đến mục tiêu thể hiện của component.
Theo như định nghĩa về cohesion thì những elements này không hề có tính liên kết gì với các elements khác trong component đó là lý do vì sao coincidental cohesion được xếp ở vị trí thấp nhất.
Những ví dụ về loại cohesion này cũng rất thường gặp và dễ phát hiện bởi chúng ta dễ dàng nhận ra sự lạc loài khi có sự xuất hiện một method hay thuộc tính nào đó mà nó chẳng phục vụ cho xử lý logic gì liên quan đến chức năng của module. Ví dụ như chúng ta thêm function create random number trong class Customer hoặc cho thuộc tính is_handsome vào class Customer, nó chẳng được sử dụng ở đâu cả.

### 2.2 Logical cohesion
Được định nghĩa là khi các components liên quan đến nhau một cách logic chứ không phải là liên quan với nhau theo chức năng. Ví dụ như các functions đọc dữ liệu đầu vào từ tape, disk hay network cùng ở chung 1 module nghe có vẻ hợp lý và vì chúng liên quan đến nhau đó là xử lý dữ liệu đầu vào nhưng rõ ràng chức năng của chúng là khác nhau hoàn toàn.
Cách giải quyết vấn đề này là chúng ta tạo 1 interface có method là readInput() để các sub-class implement đến override lại mothod readInput(). Sub-class Tape sẽ đọc từ tape, sub-class disk sẽ đọc từ disk, và tương tự với network mà với những chức năng đọc từ nguồn khác cũng được mở rộng tương tự.

### 2.3 Temporal cohesion
Những elements liên quan đến nhau theo thời gian chứ không theo chức năng và những elements này được thực thi gần như trong cùng một khoảng thời gian. 
Để có thể hình dung cohesion này, chúng ta xem xét lúc bắt đầu chạy chương trình, rất nhiều những hành động xảy ra để khởi tạo tất cả các thành phần của hệ thống trong cùng một khoảng thời gian.

### 2.4: Procedural cohesion 
Những elements liên quan đến nhau chỉ để đảm bảo một thứ tự thực thi cụ thể. Những component được thiết kế elements như vậy vẫn có cohesion ở mức yếu và khó để tái sử dụng. 
Ví dụ như trong class Student sẽ thực hiện chức năng tính điểm tích luỹ trung bình vào cuối học kỳ mà các method được thực hiện một cách tuần tự: Tính GPA trung bình của học kỳ, lưu thông tin GPA học kỳ vào database, tính toán điểm trung bình tích luỹ tất cả các học kỳ, lưu vào database.

### 2.5: Communicational cohesion
Là một nhóm các elements của module cùng hoạt động trên cùng một data là dữ liệu I/O của các methods. Ví dụ như update record vào database và print record
database.update(record), record.print().

### 2.6: Sequential Cohesion
Khi output của một element trở thành input của một element khác. Điều này thương xảy ra ở các ngôn ngữ lập trình hướng chức năng(Functional programming languages – scala, SML, Clojure, Erlang,..) . Đây đã được xem như là thiết kế tốt (high cohesion).

![image.png](https://images.viblo.asia/b9186ef4-df21-4827-a67e-8019ad99fa3c.png)

### 2.7 Functional cohesion
Đây là mức cao nhất của cohesion khi mà tất cả các elements trong component đều là cần thiết cho mục đích của component.

## Tổng kết
Như vậy chúng ta đã vừa liệt kê ra các loại coupling và cohesion thường gặp nhất. Hy vọng rằng qua bài viết này có thể giúp các bạn hiểu hơn về coupling hay cohesion. Vì đây là bài viết nặng về kỹ thuật và yêu cầu hiểu biết và kinh nghiệm do đó còn nhiều chỗ giải thích chưa được thấu đáo và ví dụ chưa được phong phú. Rất mong nhận được góp ý từ các bạn.
Tài liệu tham khảo
https://www.geeksforgeeks.org/software-engineering-coupling-and-cohesion/