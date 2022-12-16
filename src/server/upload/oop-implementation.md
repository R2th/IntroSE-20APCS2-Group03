# Disadvantages of previous paradigms
Các phương pháp lập trình trước kia (**procedural programming** & **structured programming**) đòi hỏi một sự quản lý cực kỳ chặt chẽ khi code. Tuy nhiên với bản chất của procedural programming là viết nhiều dòng lệnh chạy từ trên xuống thì thực sự có quản lý có tốt tới đâu thì chúng ta vẫn gặp trường hợp bad code khi chương trình trở trên to hơn (nhiều tính năng hơn). Một bước tiến quan trọng đó chính là định nghĩa **function**/**procedure**/**module** (nhiều functions liên quan tới nhau được đặt trong cùng 1 file) được tạo ra giúp cho việc code nên dễ dàng hơn (tái sử dụng code). Tuy nhiên từ một ví dụ thực tế (1 trận đấu pokemon chẳng hạn), nhiều hàm đều có quyền truy cập tới các giá trị global để thay đổi dữ liệu( ví dụ máu, mp, pp, ...). Từ một góc độ nào đó, việc này vẫn còn tồn đọng nhiều rủi ro chưa xuất hiện. Bằng việc thay đổi khái niệm của một chương trình **Algorithms + Data Structure = Programs** thành những một công thức tổng quảt quát hơn đã giúp sinh ra lập trình hướng đối tượng.

# Object Oriented Programming 
Dựa vào công thức: **Algorithms + Data Structure = Programs**, ta có hiểu đơn giản: **Data Structure** ở đây là dữ liệu (chính xác hơn thì là cấu trúc dữ liệu) và **Algorithms** là hàm (chính xác hơn là giải thuật). Các thành phần trên góp phần tạo nên chương trình, tuy nhiên lại khó để quản lý khi mà chương trình càng ngày càng lớn, càng khó để mô hình hoá, để quản lý hơn. Từ góc độ này, chúng ta có **Data** ở một nơi và **Function** ở một nơi,  thì nảy sinh ra ý tưởng: "Tại sao không gom data & function lại thành 1 nhỉ?" Ý tưởng cơ bản của OOP nằm ở việc gom nhiều **data** và **function** liên quan tới nhau (nghĩa là thực hiện việc thay đổi trên **data**) chung với nhau thành một đơn vị gọi là **object**. Và việc mô hình hoá cũng dễ dàng hơn khi chúng ta liên tưởng các **object** tới những thứ cụ thể ở cuộc sống thực tế.

**Object** gồm những thành phần sau:
- **Attribute**: nhằm thể hiện thông tin, dữ liệu của **object**
- **Behavior**: nhằm thể hiện các hành động mà **object** có thể thực hiện

Để dễ hình dung thì hãy tưởng tượng một con **mèo anh lông ngắn** là một thì **attribute** (còn được gọi là **characteristics**) sẽ là những thông tin liên quan tới bản chất của **object** (lông màu xám, lông ngắn, mắt xanh, đuôi cụt, 3 tuổi, nặng 10kg, ...). Về phần **behavior** là những hành động liên quan tới đối tượng (ăn: giúp cơ thể phát triển, cân nặng tăng,...)

# Class & Object
**Object** & **Class** là 2 khái niệm cơ bản, nền tảng, quan trọng nhất của OOP. 

**Object** gồm **attribute** & **behavior** (**inner function**,**method**,**member function**, ...). Các **object** sẽ tương tác với nhau thông qua các **method** (**inner function**), và cập nhật lại dữ liệu của **object** gián tiếp, không phải trực tiếp bằng cách gán giá trị mới cho các **attribute** mà thông qua con đường là sự dụng các hàm chức năng (**method**). Đây là đặc điểm cơ sở của tính chất đầu tiên của OOP : **Data encapsulation & information hidding**

**Class** là một khái niệm trừu tượng hơn, bao quát hơn **object**, là khuôn mẫu để định hình các **object** (các **object** có **attribute** nào và **behavior** nào) từ dưới góc độ thực tế. Hãy xem xét thử một vài game RPG có các **class** character như là **knight**, **warrior**, **magician**,... Tuỳ thuộc vào các **class** này, ta có thể biết được khả năng của nhân vật **knight** thì có máu nhiều và phòng thủ cao, **magician** thì có sát thương lớn và phòng thủ kém,... Từ góc độ lập trình, thì **object** được xem là thành phần của **class**. Lấy một ví dụ thực tế, ta có 1234 là số nguyên, thuộc về tập hợp số nguyên, và bởi vì nhiều ngôn ngữ đã được cài đặt sẵn số nguyên là gì, nên chúng ta có thể sử dụng ngay lập tức mà không cần phải khai báo thêm, tất nhiên là đi kèm các behavior khác như cộng trừ nhân chia các số khác. **Class** có xu hướng tổng quát, còn **object** thì có xu hướng cụ thể. Đơn giản hơn thì **Class** chính là khuôn mẫu của **object**, chúng ta từ một **class**, có thể tạo ra nhiều **object** thuộc **class** đó. Và những **object** thuộc cùng **class** với nhau, sẽ có các **behavior**, **attribute** như nhau (tất nhiên là khác giá trị) đã được định nghĩa chung ở **class**, **object** là **instance** của **class** (thể hiện của **class**).

Khi viết một chương trình theo dạng OOP, chúng ta dành đa phần thời gian vào việc khai báo **class** , sau đó tạo các **object** và để chúng tương tác với nhau (cộng phân số, nông trại vui vẻ,...)

# 4 fundamental principles of OOP
Lập trình hướng đối tượng là tư tưởng, là phong cách lập trình, chứ không phải là một kỹ thuật. Bản chất của hướng đối tượng có thể dựa trên các nguyên lý cơ bản sau:
- **Data encapsulation** : Các đối tượng chỉ có thể tương tác với nhau thông qua các **method** phù hợp, không được trực tiếp thay đổi **attribute** của nhau. **Attribute** là dữ liệu sẽ được bảo vệ, che giấu ở trong đối tượng đó.

- **Inheritance**: Các **class** có thể có nhiều **attribute** giống nhau, khi khai báo **class** thì ta không cần phải khai báo lại mà có thể tận dụng các **attribute** & **method** có sẵn để tận dụng thời gian và không gian thông qua việc kế thừa. Các **derived class** (class con) sẽ kế thừa sản nghiệp (attribute & method) của **base class** (class cha). Mục đích chính của kế thừa là để nhiều **object** có chung nhiều đặc điểm để dễ bề quản lý.

- **Polymerization**: Nhiều **derived class** có một cách thực hiện các **behavior** được kế thừa từ **base class** khác nhau. Ví dụ như hành động ăn thì con bò sẽ khác sư tử (vẫn là nạp năng lượng vào cơ thể - thay đổi các **attribute**), di chuyển thì con cá sẽ bơi bằng mang và ngựa thì chạy bằng chân. Tuỳ thuộc vào từng class cụ thể mà sẽ có nhiều cách thể hiện cùng một **behavior** đã được kế thừa từ **base class**. 

- **Abstraction** : **Abstraction** thông thường đi kèm với **Polymerization** để tạo nên một cặp bài trùng hoàn hảo. **Abstraction** mang tính khái quát hoát, cố gắng tìm điểm chung nhất để có thể tạo nên **class** chung nhất, rồi sau đó kết hợp với **polymerization** để tạo ra sự đa dạng trong cách thực hiện nhưng lại dẫn tới cùng kết quả. Nói ví dụ về điện thoại, ta có rất nhiều điện thoại ở trên đời, nhưng ta có cần phải quan tâm hết cơ chế chúng không (Ví dụ làm sao để gọi điện, nhắn tin, tính toán,..). Nếu với một người làm việc với kỹ năng cứng là chế tạo điện thoại thì cần, nhưng với end-user thì có cần thiết không? End-user không cần biết điện thoại được chế tạo như nào (gồm CPU gì, RAM bao nhiêu, Cache thế nào, làm sao màn hình cảm ứng lại xài được, ...) mà chỉ quan tâm tới việc xài như thế nào. Việc gửi tin nhắn hoặc gọi điện 1 Nokia cũng có thể gửi được tin nhắn cho 1 cái iPhone XXX Pro Max. **Abstraction** ở đây chính ta việc trừu tượng hoá các behavior chung nhất (gửi tin nhắn, gọi điện,...) và kết hợp với **polymerization** để tạo nên sự đa dạng nhưng vẫn dễ dàng quản lý.

**Ở trên chỉ là đôi chút kinh nghiệm nhỏ, tâm đắc được rút ra từ bản thân tác giả.**

# Implement language with OO supported

Có 2 cách (hoặc tác giả chưa biết thêm cách thứ 3 vì kiến thức hạn hẹp) để **implement** một ngôn ngữ hỗ trợ hướng đối tượng (OO supported). Đó là **class-base** & **prototype-base**.
**Class-base** là cách **implement** (cài đặt) ngôn ngữ lập trình hướng đối tượng chặt chẽ, thể hiện được khía cạnh mạnh mẽ của **O**bject **O**riented (hướng đối tượng), các ngôn ngữ bậc trung như **C++**, **Java**, **C#**,... được cài đặt theo cách này. Tuy nhiên điểm yếu là khi bắt đầu code với các ngôn ngữ này thì nền tảng về lập trình, cũng như hiểu biết về  hướng đối tượng, kỹ thuật lập trình là thứ không thể thiếu. Cài đặt dài dòng rườm ra mất thời gian của coder nhưng thứ tốt hơn được nhận lấy là code dễ quản lý, tìm lỗi, bảo trì. Nôm na là sẽ đánh đổi công sức của coder lấy về một source code tốt (hoặc ít nhất thì đó là mục tiêu lý tưởng). 

Cách ngược lại là **protoype-base** thì giúp coder viết code nhanh và mượt hơn, không strict nhiều tính chất chặt chẽ, dễ tiếp cận với người mới. Mặt khác thì nhận sự hạn chế trong việc tuỳ biến các đối tượng. Đồng thời phải sinh ra thêm khái niệm mới để đảm bảo tính chất của **OO** về mặt tư tưởng. **Javascript** & **Python** là 2 ngôn ngữ điển hình cài đặt OOP theo prototype

# Prototype overview
- **Prototype-bases** implementation là việc cài đặt OOP, đặc biệt là **Inheritance** các **behavior** (kế thừa các hành động) thông qua một **predefined object** (**object** đã được khởi tạo sẵn) gọi là **prototype** . Việc tạo ra 1 **object** trong các ngôn ngữ này được gọi là "clone" (chứ không phải **construct** - class-base implementation) dựa trên một **object** chuẩn nhất (**generalized object** - việc tạo ra **object** mới được gọi là clone hoặc extend)

- Nguyên lý này giúp coder tập trung vào việc xử lý các **behavior cụ thể** của **một object cụ thể** tại **một thời điểm cụ thể** hơn là việc phải **định nghĩa chúng nó** trước (class-base implementation luôn ưu tiên abstraction, điển hình là Java/Microsoft Java, tới mức cao nhất) bằng việc định nghĩa class. Sau khi có những **object** cụ thể rồi thì lúc đó coder mới phải quan tâm tới việc tạo ra **archetypal structure** (cấu trúc nguyên mẫu).

- Và khi coder thực hiện implementation các **program** theo style **prototype-base** thì các ngôn ngữ hỗ trợ thường có xu hướng thay đổi, tạo ra, thực thi, kiểm tra các **behavior** tại **run-time**hơn là ở c**ompile-time**. Điều này dẫn tới một nguy cơ tiềm ẩn: các behavior có khả năng gây ra **exception** cao(không phải là class-base không có khả năng gây ra **run-time exception**). Điển hình là các **callback function** ở **Javascript**. Các **interpreter** & **dynamic typed** language (Javascript, Python, ...) thường là một lựa chọn hoàn hảo dành cho **prototype-base OOP implementation**.

## Construction
- Khi nói tới OOP, tạo ra một object thì chắc hẳn phải nói tới **constructor**, và trước khi có thể sử dụng được **constructor** thì phải định nghĩa **class**, các **attribute** trước, đối ngược hoàn toàn với việc tạo **object** trước rồi mới định nghĩa các **attribute** & **behavior** **như prototype-base**.

- Từ một vài phiên bản mới thì **Javascript** đã khắc phục chuyện này bằng cách thêm từ khoá **new** cùng với **constructor** để khiến bản thân có thể trông giống như **class-base **implementation từ đó dễ tiếp cận đối với các coder từ **class-base** chuyển sang (Java/Microsoft Java/ C++)

- Một ưu điểm của **Javascript** là có thể khởi tạo object **literal** (theo nghĩa đen). Một điều thú vị ở đây là **Inheritance** được thực hiện thông qua việc **clone**, nghĩa là chúng ta sẽ tạo một **doppelganger** của object cụ thể, tất cả **attribute** & **behavior** của object mới vừa đươc **clone** đều giống chính xác như bản gốc và di chuyển vào nơi nó thuộc về, và coder sẽ thực hiện việc **manipulate** / **modify** phiên bản **doppelganger** này thành **object** mong muốn. 

## Delegation 
- Nếu trong **class-base** OOP, việc xác định một **behavior** của object sẽ dựa vào **Inheritance tree**, thì đại diện của **prototype-base** là **Javascript** sẽ sử dụng một cơ chế gọi là **delegation** nhằm xác định đúng **prototype** (**attribute** & **behavior** của **object**) tại thời điểm runtime ...

- **Javascript** implement **prototype** thông qua **Object.prototype**, và tất cả những object khác kế thừ từ object này cũng mang theo một màu như vậy, tuy nhiên lại không thể hiện rõ ra ở **obj.prototype** mà được ngầm hiểu nhờ cơ chế **delegation** và được ẩn giấu ở `[[Prototype]]` cũng tức là những thứ **đã được clone từ original version**. Để truy cập thì ta chỉ cần dấu `.` (**dot**) mà thôi . Javascript sẽ truy cập vào `[[Prototype]]` hiện tại của object để có thể lấy ra được thứ mình muốn. 

- Attribute & behavior của original khi được clone sẽ được hop-in (chuyển vào) `[[Prototype]]` tạo thành 1 cái cây. Nếu chẳng may phiên bản **doppelganger** có tồn tại một **behavior** trùng tên **original version** với cái cũ thì cũng không sao bởi vì cơ chế **delegation** duyệt **prototype** bottom-up. Nhìn hình thì các bạn có thể hiểu rõ hơn một xíu.

![Archetypal Structure](https://sonlhcsuit.github.io/p/oop-implementation/image-1.png)

## Concatenation
- Hiểu một cách đơn giản về việc **concatenation** là khi bạn thay đổi **behavior** của object lớn thì những **doppelganger verions** của **object** đó không hề bị ảnh hưởng. Nó có thể là một điểm mạnh, hoặc cũng có thể là một điểm yếu khi có những **behavior** không đồng bộ nhưng vậy. Tác giả vì còn kém nên chỉ thấy được bất lợi trước mắt là phải gán lại tất cả **behavior** cho các object đã được khai báo (nếu gặp trường hợp cần thay đổi **behavior** như thế này)

Sẽ ráng update một bài nói chi tiết về việc **Javascript/Python** implement theo `Prototype` này có điểm lợi và hại gì và những gotcha.

---
# References & more resources
- Object-Oriented Programming in C++, Fourth Edition p.10 - p.25
- https://en.wikipedia.org/wiki/Prototype-based_programming
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

### P/S:
Nếu có gì sai sót xin gửi email cho mình để cập nhật, xin cảm ơn!