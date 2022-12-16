© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Object-Oriented Design from real life to software](https://viblo.asia/s/object-oriented-design-from-real-life-to-software-z45bx89oZxY).

**Class** (lớp) và **Object** (đối tượng) là những thành phần cơ bản nhất trong OOP. Vậy nó là gì?

Về mặt ý tưởng, OOP nói đến việc áp dụng từ thế giới thực vào thế giới lập trình. Do đó, để hiểu class và object trong programming, ta cần hiểu về class và object trong thế giới thực trước. Let's begin.

## 1) Object
Rất dễ hiểu, object là những thứ xuất hiện xung quanh chúng ta trong thế giới thực.

![](https://i.imgur.com/CrG4WmR.png)

Bất kể thứ gì từ laptop, cốc coffee cho đến hộp bánh mà mình đang thưởng thức đều là các object. Lưu ý nhỏ, những chiếc bánh quy trông giống nhau nhưng không phải là một object. Chúng là những object khác nhau nhưng đều là.. bánh quy :joy:. 

Mỗi chiếc bánh là một vật thể riêng biệt, đều có các tính chất và sự tồn tại riêng. Ví dụ mình có hai chiếc, mình ăn một chiếc, thì... vẫn còn một chiếc.

> Các object có thể có những tính chất giống nhau, ví dụ 2 bình đều đang chứa nước. Tuy nhiên mỗi bình lại có những thông số về các tính chất khác nhau, khối lượng khác nhau, lượng nước khác nhau... Đổ đầy nước vào bình đầu tiên không có nghĩa bình thứ hai cũng đầy. 
Do đó, trạng thái hiện tại (current state) của mỗi object đều độc lập với nhau dù đều là bình nước.

![](https://i.imgur.com/W5Y6faN.png)

Ngoài lượng nước, nó còn bao gồm rất nhiều các thông số khác như khối lượng, màu sắc, kích cỡ, chất liệu, độ bền... Một vài thông số không thể thay đổi, một vài có thể bị thay đổi trong quá trình sử dụng bình nước (object lifecycle). 

Trong lập trình, các thông số đó gọi với nhiều cách khác nhau như **property**, **attribute**, **variable**, **state**, **field**... Với từng ngôn ngữ lập trình khác nhau hoặc tùy tình huống cụ thể, nó có khác nhau đôi chút nhưng túm cái váy lại thì tất cả đều diễn tả đặc trưng của đối tượng.

Bên cạnh đó, ta có thể thêm hoặc đổ bớt nước ra ngoài thông qua các hành động tương tác với bình nước. Có nhiều keywork để gọi nó như **behaviour**, **method**, **function**...

Với một bình nước, khá đơn giản để diễn tả các chức năng và thông số. Với những thứ phức tạp hơn như chiếc iPhone bao gồm hàng trăm những chi tiết bên trong thì sao?

Về cơ bản, nếu đối tượng có độ phức tạp cao thì có thể chia thành nhiều đối tượng nhỏ hơn và tập hợp chúng lại với nhau (composition). 
> - Một object có thể bao gồm một hoặc nhiều object khác.

![](https://i.imgur.com/K8ggmXl.png)

Với chiếc smartphone trên tay, nó có **attributes** như: màu sắc, kích thước, trọng lượng... và **behaviours** là chụp ảnh, nghe gọi, nhắn tin.

Mỗi object đều có đặc trưng, tính chất và cách sử dụng khác nhau. Một chiếc bình không thể nghe gọi, và một chiếc điện thoại không thể đựng nước, hiển nhiên quá rồi.

Tương tự với phần mềm, trong OOP, một object bao gồm 3 thông tin cơ bản:
> - **Identity**: iPhone.
> - **Attributes**: colour, size, version.
> - **Behaviours**: capture, call, text.

Các object thực tế như iPhone, laptop, bình nước, bánh quy... đều là những thứ ta có thể **chạm** hoặc tưởng tượng ra hình ảnh của nó.

Tuy nhiên, trong thế giới phần mềm, ngoài những object hữu hình, ta còn làm việc với những object vô hình :joy: hơi ma mị. Nói cách khác là những object không có hình thù cụ thể như datetime, connection, bank account...

![](https://i.imgur.com/3gDWwhu.png)

Một trong những.. thử thách khi thiết kế chương trình OOP là:
> - Làm thế nào để biết một thứ gì đó trong chương trình có nên biểu diễn dưới dạng object không?

Quay lại bài toán làm bánh nướng ở phần trước, các object là oven, pattern, mixer... Vậy lập trình một ứng dụng quản lý các sự kiện thì sao? Sự kiện có thể coi là một object không?

Gọi là thử thách cho nguy hiểm chứ thực ra chẳng có gì phức tạp. Những thứ nào là danh từ thì đều có thể biểu diễn dưới dạng object. Còn những động từ mô tả hành vi của object thì chính là **behaviour** của object đó. Nhưng thử thách sẽ xuất hiện khi bạn lỡ design sai và code đi được quá nửa chặng đường. Lúc này thì... trời cứu :joy:.

## 2) Class

Trong thực tế, để làm ra chiếc bánh nướng đẹp mắt, ta cần có khuôn, hoặc ít nhất phải hình dung ra hình dáng của nó để làm theo. Đấy là còn chưa kể đến các nguyên liệu, mùi vị, độ ngon của nó.

Tương tự với lập trình, các object không tự nhiên mà xuất hiện. Nó cũng được tạo ra từ khuôn mẫu có sẵn là **class**. 

**Clas** bao gồm các thông tin chi tiết về các tính năng, thông số của **object** bất kì mà chúng ta muốn định nghĩa. Khi định nghĩa ra một **class** cụ thể, có thể tạo ra hàng hằng hà sa số các **object** mà chúng ta muốn :joy:. 

![](https://i.imgur.com/IXWXr1A.png)

Tất nhiên, các **class** khác nhau sẽ tạo ra các **object** khác nhau. Có thể tượng tượng chiếc khuôn làm bánh là một class. Khuôn hình vuông cho ra bánh hình vuông, khuôn hình tròn cho ra bánh hình tròn. Tất cả chỗ bánh đó đều chịu kết cục chung, cho vào lò nướng và.. chén thôi.
> Lưu ý, **class** là thứ cần có để tạo ra **object**. Do đó nó luôn luôn xuất hiện trước object.

Đi vào chi tiết, trong OOP, một class bao gồm 3 components là:
> - **Name**: tên class Mooncake.
> - **Attributes**: các tính chất như weight, flavour, color.
> - **Behaviours**: các hành vi như decorate, consume.

![](https://i.imgur.com/2UnhQpD.png)

Ngoài ra, một vài thuật ngữ khác cũng diễn tả 3 components trên ta cần quan tâm trong quá trình design vì nó generic hơn là:
> - **Type** ~ **Name**.
> - **Data/Properties** ~ **Attributes**.
> - **Operations** ~ **Behaviours**.

Khi triển khai thực tế, **behaviour** được gọi là **method** (phương thức). **Method** về cơ bản chỉ là một đoạn code thực thi một tác vụ gì đó, có thể không trả về gì hoặc trả về một giá trị. Ngoài ra còn có khái niệm về **function** (hàm), nó cũng là một block of execution code. Vậy sự khác biệt giữa **method** và **function** là gì?

Về cơ bản, các **method** chính là các **function**, tuy nhiên nó được định nghĩa là một phần của **class** tương tác với các attributes của class.

Như vậy chúng có 3 **attributes** là weight, color, flavor và chưa bao gồm thông tin cụ thể, mới chỉ là định nghĩa cho **class** đó. Sau khi có **class**, ta có thể tạo **object** từ đây. Với Java là từ khóa **new**, gọi tới constructor. Quá trình này được gọi là **instantiation**. Mỗi **object** được tạo ra đều có đặc tính riêng, có thể giống hoặc không giống các object khác và không liên quan tới nhau. Thay đổi giá trị attribute của object này không ảnh hưởng tới các object khác.

### Reference
Reference in series https://viblo.asia/s/object-oriented-design-from-real-life-to-software-z45bx89oZxY

### After credit
Không quá khó để phân biệt **object** và **class**, bài tiếp theo mình sẽ bàn luận về các tính chất trong OOP qua ví dụ thực tế, bao gồm:
> - **A**bstraction.
> - **P**olymorphism.
> - **I**nheritance.
> - **E**ncapsulation.

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)