© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Object-Oriented Design from real life to software](https://viblo.asia/s/object-oriented-design-from-real-life-to-software-z45bx89oZxY).

Với phần trước, chúng ta đã tìm hiểu về **Abstraction** và **Encapsulation**. Bài viết hôm nay sẽ giới thiệu 2 tính chất còn lại của OOP là:
> - Inheritance.
> - Polymorphism.

## 1) Inheritance

> Kế thừa là thừa hưởng, gìn giữ và tiếp tục phát huy các giá trị tinh thần hoặc những di sản văn hóa của dân tộc - Theo từ điển tiếng Việt.

Nói một cách dễ hiểu, mình được thừa kế mảnh đất do tổ tiên để lại, mình có thể làm bất kì điều gì, trồng cây, xây nhà, thả cá... trên mảnh đất này. Chả tội gì đi làm quần quật ngày đêm làm gì cho khổ. Bốc phét thế chứ chưa có gì trong tay nên mình mới ngồi đây viết nhảm thế này :joy:.

Áp dụng vào lập trình, khi tạo một class mới, không nhất thiết phải build từ đầu. Trước hết cần đi tìm xem tổ tiên có để lại gì cho hậu thế không? Nếu chương trình đã tồn tại class giống y hệt, hoặc giống một phần thứ chúng ta cần, **inheritance** sẽ phát huy tác dụng trong trường hợp này.

Vài tính chất của **inheritance**:
> - Tạo một class mới dựa trên class có sẵn.
> - Class mới kế thừa các attributes và methods của class có sẵn.
> - Từ đó đem lại lợi ích to lớn là sử dụng lại code nhiều nhất có thể.

Ví dụ, mình muốn mở một tiệm bánh nhỏ và cần hệ thống quản lý. Sơ sơ đã mường tượng ra một vài object như Customer, Employee, Mooncake, Cupcake...

![](https://i.imgur.com/LD7iATk.png)

Mô hình hóa cho dễ hình dung. Nhìn thoáng qua thấy rằng **Customer** và **Employee** có một vài điểm chung.

Áp dụng **inheritance**, thay vì mỗi class đều có những **attributes** và **methods** giống nhau, ta sẽ tạo **base class** mới chứa các điểm chung. **Customer** và **Employee** sẽ kế thừa các điểm chung đó từ **base class**.

![](https://i.imgur.com/DErVS3R.png)

Như vậy, **Customer** sẽ kế thừa toàn bộ thông tin của **Person**, bao gồm **attributes** và **methods** mà không cần viết lại code. Sau đó sẽ thêm các **attributes** và **methods** của riêng **Customer**. 

> **Person** được gọi là **super class**/**parent class** hoặc **base class**.
> **Customer**/**Employee** là **sub class**/**child class** hoặc **derived class**.

Nếu kinh doanh tốt và muốn mở rộng thị trường, mình cần thuê thêm **shipper**. Lúc này chỉ cần tạo class mới là **Shipper** kế thừa từ **Person**, thêm một vài thông tin dành riêng cho shipper là ok. 

Ngoài ra, mình muốn quản lý thêm thông tin email của tất cả mọi người. Lúc này sẽ thêm **email** vào **Person**, sửa một chỗ nhưng apply được cho toàn bộ. 

Trên thực tế, nhiều người có thể cùng thừa kế một mảnh đất, hoặc một người thừa kế được nhiều mảnh đất.

Trong lập trình, một vài ngôn ngữ như Python, C++ cho phép đa kế thừa nhiều mảnh đất :joy:. Một **sub class** có thể kế thừa nhiều **super class**. Lúc này toàn bộ các **attributes** và **method** của tất cả **super class** đều thuộc về **sub class**. 

> Hôm nọ Euro hơi yêu UK một tí nên phải bán một mảnh đi lấy vốn làm ăn. Có 3 mảnh nhưng không biết bán mảnh nào. Sau một hồi phân vân thì.. chọn bừa một mảnh.

Câu chuyện không đơn giản như trên thực tế, với lập trình đó là cả một sự.. rối rắm. Class **A** và class **B** đều có chung method **inherit()**. Nếu class **C** kế thừa cả 2 class **A** và **B**, khi thực thi **inherit()** sẽ không biết nên thực thi method của class nào.

Do vậy các ngôn ngữ như Java, C#, Swift... sử dụng đơn kế thừa với class cho dễ quản lý.

![](https://i.imgur.com/EZH7ZcI.png)

Nhưng không thể phủ nhận lợi thế của multi-inheritance. Java không hoàn toàn bỏ đa kế thừa mà sẽ sử dụng với **interface** thay vì **class**.


## 2) Polymorphism

Tính chất cuối cùng là **polymorphism** - đa hình. Giống như Tôn Ngộ Không có 72 phép biến hóa, thích biến thành gì thì biến, không biến.. thái là được :joy:. Đùa chứ không liên quan gì đâu.

Đa hình cũng có đa hình this đa hình that là:
> - Dynamic/Run-time polymorphism.
> - Static/Compile-time polymorphism.

### 2.1) Dynamic polymorphism

Mình thích ăn khoai tây chiên nhưng lại sợ dầu mỡ, thôi nướng cho **healthy** :joy:. Mình có 2 loại là **nồi nướng truyền thống** và **lò chiên không dầu**. Cả 2 đều dùng chiên khoai tây được mà không cần dầu. Cùng input/output nhưng cơ chế hoạt động có sự khác biệt.

Quay lại ngôn ngữ lập trình, có một vài cách implement **dynamic polymorphism** sử dụng tính chất **inheritance** như sau:

Mình sẽ tạo **BasicOven** trước, sau đó là **AirFryer** kế thừa từ **BasicOven**, định nghĩa lại method **bake()** để thay thế default implementation của **BasicOven**. Kĩ thuật này được gọi là **overriding**. Như vậy cả 2 đều có cùng method **bake()** nhưng cách thực thi là độc lập, riêng biệt.

![](https://i.imgur.com/NeGnRLE.png)

Ngoài ra còn một cách khác, áp dụng thêm **abstraction**, cả **BasicOven** và **AirFryer** sẽ kế thừa chung một abstract class hoặc interface.

> Interface, abstract class, thậm chí class khi implement với **inheritance** đều có thể tạo ra **dynamic polymorphism**.

Vậy lợi ích của **dynamic polymorphism** là gì?

> Nó cho phép chúng ta có thể sử dụng bất kì loại lò nướng nào miễn là nó có khả năng tạo ra đĩa khoai tây chiên thơm ngon giòn rụm. Thậm chí có thể dùng lò nướng than tổ ong cũng có thể cho ra output tương tự.

![](https://i.imgur.com/OudGghp.png)

Khi kết hợp với **inheritance**, ta có thể tạo nên những đoạn code có khả năng thay đổi **behavior** trong quá trình runtime. Giống việc mình đang vận hành khu nấu bếp, khi thực khách yêu cầu món khoai tây chiên, mình có thể sử dụng bất kì loại lò nướng nào miễn làm ra món đúng yêu cầu là được. Do vậy nó được gọi là **dynamic polymorphism** hay **run-time polymorphism**.

### 2.2) Static polymorphism

Một hình thức **polymorphism** khác là **static polymorphism** hoặc **compile-time polymorphism**. Được implement với code dưới tên gọi là **method overloading** để phân biệt với **method overriding**.

Nếu mình nướng khoai, chắc chắn kết quả sẽ là đĩa khoai nướng. Nếu mình nướng rib-eye steak, kết quả là đĩa steak thơm ngon khó lòng cưỡng lại. Cùng một hành động nướng nhưng với mỗi input khác nhau sẽ cho output khác nhau. Và ta có thể xác định được chính xác output là gì mà chưa cần thực thi, do vậy nó được gọi là **static polymorphism**.

![](https://i.imgur.com/6HFkZaj.png)

Nhờ **method overloading**, sẽ có nhiều version của một method với các parameters khác nhau, có thể cho ra cùng hoặc khác output. Trong lập trình, nó nói đến việc một **class** có nhiều method cùng tên nhưng khác arguments hoặc khác dữ liệu trả về.

Trong thực tế khi implement, các **overload method** thường có chung functionality, chung kiểu dữ liệu trả về, chỉ khác arguments.

> Một vài ngôn ngữ không support **method overloading**, một vài ngôn ngữ có support trong đó bao gồm Java.

Với **static polymorphism**, khá dễ dàng để biết được method nào đang được gọi. Tuy nhiên với **dynamic polymorphism** nó là cả một sự nỗ lực.. để biết method của class nào sẽ được thực thi.
 
Với 4 tính chất này của OOP, nó giúp ta tối ưu việc quản lý source code, dễ dàng phát triển và đặc biệt là mở rộng ứng dụng sau này.

### Reference
Reference in series https://viblo.asia/s/object-oriented-design-from-real-life-to-software-z45bx89oZxY

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)