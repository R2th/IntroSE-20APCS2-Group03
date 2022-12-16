© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)

Bài viết nằm trong series [Object-Oriented Design from real life to software](https://viblo.asia/s/object-oriented-design-from-real-life-to-software-z45bx89oZxY).

OOP có 4 tính chất cơ bản cần nhớ trong suốt cuộc đời lập trình viên, đó là **một cái bánh - A PIE**, viết tắt của:
> - **A**bstraction.
> - **P**olymorphism.
> - **I**nheritance.
> - **E**ncapsulation.

Ngôn ngữ kĩ thuật khô khan, nên việc tiếp thu 4 tính chất này đối với mình khi còn học trên ghế nhà trường là.. rất khó khăn. Mỗi ngôn ngữ lập trình sẽ có syntax khác nhau. Mà concept của OOP là đem hiện thực đời sống thường ngày vào trong lập trình, do đó mình không lấy ví dụ coding mà chủ yếu tập trung vào ví dụ thực tế với mục tiêu hiểu sâu nắm rõ. Let's begin.

## 1) Abstraction

**A person** (con nhà người ta) - chúng ta đều hiểu nghĩa của từ này. Mặc dù không đề cập cụ thể các tính chất, nam nữ, béo gầy, cao thấp... nhưng ta đều hình dung được nó diễn tả một ai đấy: đứa ngồi cùng bàn, con bé hàng xóm hoặc thậm chí là đứa em chăm ngoan học giỏi của mình :joy:.

![](https://i.imgur.com/0nOJuLb.png)

Đó là ví dụ của **Abstraction**, không thể đơn giản hơn.

> Abstraction tập trung vào những đặc tính thiết yếu, dễ nhận biết nhất thay vì tập trung vào chi tiết của đối tượng.
>
> Mình vừa làm mất **điện thoại** ngày hôm qua.
> 
> vs
> 
> Mình vừa làm mất **con iPhone 12 Pro Max mạ vàng** ngày hôm qua.

Với **Abstraction**, ta loại bỏ đi những thứ không quan trọng hoặc không liên quan, chỉ tập trung vào ý nghĩa và hình dung ra được thứ đang được đề cập đến là gì.

Nhắc đến **a person**, ta biết nó có các **attributes** như chiều cao, cân nặng, độ tuổi... Nói đến **a phone**, có **attributes** là brand name, phiên bản, khối lượng, màu sắc...

> Với **Abstraction**, chỉ cần quan tâm đến khái niệm của sự vật mà không quan tâm đến các thể hiện cụ thể của sự vật đó. Quan trọng nên phải nhắc đi nhắc lại :joy:.
> 
>  Mình biết bạn mất điện thoại là được rồi. Còn điện thoại gì, loại nào, I don't care. Nếu cố tình đề cập đến, rất có thể chúng ta sẽ được... ăn :punch:.

**Abstraction** có quan trọng không? 

Nhìn ví dụ trên là biết rất quan trọng rồi, đùa thế chứ quan trọng thật. Nó được coi như **trái tim** và **linh hồn** của **OOP** (đọc xong series này mới biết OOP có rất nhiều trái tim :joy:).

Với coding, nếu muốn tạo ra 100 person, không có kĩ sư nào đi viết 100 class. Chỉ cần tạo 1 class và tập trung vào các thông số cần quan tâm như: giới tính, họ tên, độ tuổi, chiều cao... Sau đó với mỗi person, tạo ra từng object với các thông số cụ thể. Đó là trong trường hợp các person đều có thông tin như nhau.

Trường hợp các person bao gồm các thông tin khác nhau, hãy cố gắng tạo ra class bao gồm nhiều thông tin chung nhất có thể. Mình sẽ nói chi tiết hơn ở tính chất **Inheritance**.


Ngoài ra, **Abstraction** chỉ quan tâm rằng một **object** có thể làm được những gì thay vì tập trung vào việc nó làm như thế nào.

> Điện thoại nào cũng có chức năng nghe và gọi dù nó có là **Nokia 1280** hay **iPhone 12 Pro Max**. Tuy nhiên cách thực hoạt động có thể khác nhau với từng sản phẩm, **iPhone** có thêm chức năng lọc tạp âm, **Nokia** thì chỉ nghe gọi thông thường.
>
> Trong Java, sử dụng **interface** và **abstract class** để implement abstraction.

## 2) Encapsulation

Ý tưởng của **encapsulation** là đóng gói các thuộc tính của object lại với nhau. Nó không chỉ giúp các thuộc tính tập trung lại một chỗ mà còn bảo vệ khỏi các tác động gậy hại từ bên ngoài. Nghe như quảng cáo sơn tường.

![](https://i.imgur.com/32YStMl.jpg)

> Hãy nhìn những chiếc bánh quy thơm ngon này, nó được đựng trong chiếc lọ thủy tinh nắp chặt. Bảo vệ khỏi những vi khuẩn nấm mốc ngoài không khí và giữ bánh giòn lâu hơn.

**Encapsulation** gộp các **thuộc tính (attribute)** và **hành động (behavior/method)** tương tác với các **attribute** của **object** vào thành một nhóm, cụ thể hơn là **class**. 

**Lý do đầu tiên** cần làm việc này là hạn chế quyền truy cập vào thuộc tính của đối tượng. Giống như việc ai đó lấy chiếc bánh quy trong hộp của mình. Họ phải xin phép, ngoài ra mình cũng có quyền giới hạn số lượng bánh được lấy. 

Hơi ki bo :joy: nhưng với ngôn ngữ lập trình điều này vô cùng quan trọng. **CookieJar** class bao gồm một thuộc tính **cookieCount** thể hiện số lượng bánh có trong hộp. 

![](https://i.imgur.com/7TtbSUj.png)

Mình không muốn bất kì ai lấy đi những chiếc bánh thơm ngon của mình mà không được phép. Khi một CookieJar **instance** được tạo ra, mình không muốn bất kì thành phần nào khác trong application có thể trực tiếp truy cập vào **cookieCount**. Chỉ có thể truy cập gián tiếp qua các **public method** của **CookieJar**.

**Lý do thứ hai** liên quan đến việc **giới hạn/kiểm soát** thông tin có hợp lệ hay không. Với từng cá nhân, phụ thuộc vào sự yêu/ghét :joy: mà mình cho phép họ lấy mấy cái bánh. Với lập trình, nếu được quyền truy cập trực tiếp vào **cookieCount**, không có điều gì đảm bảo nó không bị thay đổi giá trị thành **-999**, một giá trị vô nghĩa có thể khiến crash application.

Vậy làm cách nào để cấp quyền truy cập **gián tiếp** tới **cookieCount**? Đơn giản là implement method **requestCookie** và chắc chắn rằng client có thể gọi đến nó (thông qua access modifier). Method này có thể làm một loạt các validation cần thiết, update thông tin **cookieCount** hoặc làm bất kì điều gì (miễn là không gây ra bug) trước khi trả cho client.

![](https://i.imgur.com/hvYs3qx.png)

Một nguyên tắc khác của **encapsulation** là chỉ public ra bên ngoài những gì cần thiết để application hoạt động bình thường. Kĩ thuật này được gọi là **data hiding** hay **black boxing**. 

> Lưu ý, **data hiding** là một nguyên tắc và kĩ thuật để thiết kế **encapsulation** trong ứng dụng OOP, không phải một tính chất của OOP.

Giống ví dụ trên với con **Nokia 1280** và **iPhone 12 Pro Max**, ta không quan tâm đến cách hoạt động của chúng, chỉ biết rằng đều có một button (vật lý hoặc cảm ứng) để thực hiện cuộc gọi. Nhìn thì tưởng giống **abstraction** nhưng lại không phải vậy, cần phân biệt rõ 2 tính chất này:
> - **Abstraction** nói đến việc một **object** có thể **làm được gì**.
> - **Encapsulation** nói về việc **làm thế nào** để một object làm được chức năng đó và sử dụng kĩ thuật **data hiding** nhằm che giấu **cách làm đó** đi.

Khi kết hợp **encapsulation** và **abstraction**, nó đem đến một lợi ích tuyệt vời. Chúng ta có thể thay đổi cách thức hoạt động của **object** một cách an toàn mà không làm ảnh hưởng đến các phần khác của application. Nếu cần thay đổi một vài logic hoặc validation liên quan đến **requestCookie**, chỉ update **method** đó là ok. Thậm chí **requestCookie** có thể tương tác với nhiều attribute khác nữa mà client không cần quan tâm và không phải sửa code.

Mỗi ngôn ngữ sẽ có những level data hiding khác nhau, với Java là các access modifier như private, package private, protected, public. Rule chung là **hide** data nhiều nhất có thể.

Không đi đâu mà vội, đón chờ phần sau sẽ tìm hiểu về 2 tính chất còn lại nhé:
> - Inheritance.
> - Polymorphism.

### Reference
Reference in series https://viblo.asia/s/object-oriented-design-from-real-life-to-software-z45bx89oZxY

© [Dat Bui](https://viblo.asia/u/datbv) | [Buy me a coffee & give your kindness to the world](https://viblo.asia/p/thong-ke-so-tien-donate-va-hoat-dong-thien-nguyen-aWj53xePK6m)