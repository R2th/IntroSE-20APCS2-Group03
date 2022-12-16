**OOP** sinh ra nhằm tổ chức mã nguồn tốt hơn, và làm cho việc lập trình giống như việc tổ chức quản lý các đối tượng trong thế giới thực. Trong **OOP**, người ta có đề 4 nguyên lý cơ bản: **trừu tượng**, **đóng gói**, **kế thừa** và **đa hình**. 

Hôm nay mình sẽ giải thích chi tiết theo ý hiểu của mình về 4 nguyên lý này cùng với code **Python** minh họa.

**Bài viết gốc trên blog cá nhân của mình:** https://phamduyhieu.com/4-nguyen-ly-co-ban-trong-oop-va-vi-du-de-hieu-bang-python

# 1. Abstraction – tính trừu tượng
 Thiết lập mức độ phức tạp mà 1 người tương tác với hệ thống, giấu đi các chi tiết phức tạp hơn.

Ở đây có ông nào dùng máy pha cà phê rồi thì biết, đứng ấn vài nút là có cốc cà phê ngon, nhưng bên trong nó làm rất nhiều công đoạn mà chúng ta không cần quan tâm nó như nào. Đấy là 1 ví dụ trừu tượng thực tế. Và khi có 1 update gì bên trong phần mềm của máy cũng hiếm khi ảnh hưởng tới cách sử dụng máy phía bên ngoài.

![image.png](https://images.viblo.asia/9585bb73-643d-44ea-8c30-928808e43ad0.png)

Việc pha cà phê cũng giống như việc sử dụng object **coffee_machine** để tạo 1 cốc cà phê - **a_cup_of_coffee**. Tất cả chỉ cần gọi hàm **make_coffee**, việc bên trong hàm hoạt động như thế nào người gọi không cần quan tâm. Và khi có thay đổi hoạt động bên trong hàm **make_coffee** thì cũng không ảnh hưởng tới việc bên khác gọi hàm này.



# 2.	Encapsulation – tính đóng gói
Nôm na là việc đóng gói data lại và kiểm soát việc truy cập và thay đổi data từ bên ngoài. Ví dụ trong Java có setter, getter để kiểm soát việc truy cập vào một biến. Một biến đã là private thì không thể truy cập hay chỉnh sửa trực tiếp từ phía ngoài class hay object.

Nếu không để ý thì dễ hay bị mơ hồ giữa 2 khái niệm đóng gói và trừu tượng. Đều là ẩn đấy nhưng đóng gói thì là **information hiding**, còn trừu tượng thì là **implementation hiding**.

Python không có keyword kiểu **private** hay **protected** như bên **Java** mà quy ước theo cách đặt tên biến:  1 dấu gạch dưới để set 1 biến thành internal use (vẫn có thể public access nhưng bị cảnh báo), và 2 dấu gạch dưới để set thành private (không thể public access)

![image.png](https://images.viblo.asia/75e5d4f9-7c44-4eb4-bebf-25df11f612c7.png)




# 3.	Inheritance – tính kế thừa

Việc thừa hưởng lại những gì người khác để lại =))

Trong lập trình, kế thừa là cách 1 lớp có thể thừa hưởng lại những thuộc tính, method từ 1 lớp khác, sử dụng hoặc **override** chúng. 

In other words, I can say that =))) kế thừa dùng để biểu diễn mối quan hệ **đặc biệt hóa – tổng quát hóa** giữa các lớp.

VD: có nhiều loại ô tô, nhưng đều có 1 số đặc điểm chung: 4 bánh, các phương thức khởi động, run, phanh, tăng tốc, … nên sẽ kế thừa chung 1 class cha là Car chứa các thuộc tính và phương thức chung thay vì phải viết đi viết lại ở nhiều class. Và khi cần sửa thì cũng đi từng class để sửa, rất mất công và thời gian, lại còn dễ lỗi.

=> Gia tăng việc **tái sử dụng code**, giúp ta dễ nâng cấp và **bảo trì**

![](https://images.viblo.asia/e9794856-5435-4e4d-ab3a-f02de83dc885.PNG)

Trong code trên, các class con khi kế thừa class **Person** sẽ không phải implement lại các method chung nữa mà có thể dùng ngay.


# 4.	Polymorphism – tính đa hình

Hai hay nhiều lớp sẽ có chung phương thức nhưng lại được implement theo các cách khác nhau – thực hiện 1 hành động theo nhiều cách khác nhau.
VD: cùng 1 method được kế thừa ở lớp cha, mỗi lớp con có thể override theo cách riêng, hoạt động khác nhau. Cùng là **con vật** có thể kêu nhưng **chó**, **mèo**, **chuột** sẽ kêu theo các cách khác nhau.

![image.png](https://images.viblo.asia/8412727e-c3cc-4368-ba29-3bc0feed074e.png)

Đa hình còn giúp cho việc sử dụng 1 class con và cha là như nhau. Nó giúp cho chương trình chúng ta viết trở nên linh hoạt hơn.

![image.png](https://images.viblo.asia/bb943609-3039-4f02-a046-8f0f18f5a472.png)

Method bên trên chỉ cần quan tâm **kiểu** **object** nó nhận vào là **Animal**, nên khi chúng ta truyền vào **Cat object** hay **Dog object** thì nó đều chạy bình thường. 


Trên đây là sơ qua về 4 nguyên lý cơ bản của **OOP**. Hẹn các ae trong các bài viết sau nha!! 

Tôi đi ngủ đây chứ 1h rồi :persevere::persevere::persevere: Nhớ up vote nếu thấy hữu ích nha :pout::pout::pout: