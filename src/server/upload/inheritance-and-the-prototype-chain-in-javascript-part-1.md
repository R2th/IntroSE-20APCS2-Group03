Trong bài viết lần này, chúng ta sẽ cùng nhau thảo luận về **Inheritance** trong Javascript. 
# Mở bài
Hầu như tất cả chúng ta khi học về lập trình hướng đối tượng OOP - Object Oriented Programming đều có học qua về tính kế thừa, một trong 4 trụ cột của lập trình hướng đối tượng (bên cạnh tính đóng gói - Encapsulation, tính đa hình - Polymophism và tính trừu tượng - Abstraction). Nói tới kế thừa, trong đầu chúng ta lặp tức nghĩ tới khái niệm Class - Object.

Class thì như một bản vẽ kiến thúc còn Object thì như một căn nhà - được xây nên từ cái bản vẽ Class đó. Tổng quát hơn thì Class là **một bản vẽ, một định nghĩa**,..còn Object (hay Instance) là một **thực thể** được hiện thực hóa dựa vào Class đó và mang đầy đủ các đặc điểm tính chất được mô tả trong *Class*. (*Class* được dịch là *Lớp*, hoặc có thể hiểu nó là *Type* - *Loại*, ví dụ cái thực thể đó thuộc cái *Loại* đó thì ắt hẳn nó có trong mình các đặc điểm tính chất được mô tả bởi *Loại* đó)

Đối với chúng ta đa phần xuất phát điểm là học C++, Java hay C# chúng ta đã quen với cách mà Inheritance hoạt động, và việc kế thừa trong lập trình chỉ đơn thuần là dùng lại và mở rộng thêm cái **bản vẽ hay định nghĩa** đó, phục vụ cho những lần *Instantiate* tiếp theo.

**Nhưng**, khi bước vào thế giới của Javascript, mọi thứ về Kế thừa (Inheritance) sẽ rất khác...

# Thân bài

Đầu tiên, trong JS không có khái niệm class. Tuy là từ phiên bản ES2015 (hay ES6) thì ngôn ngữ Javascript đã có giới thiệu khái niệm class, nhưng về bản chất thì nó chỉ là một *syntatic-sugar* để các dev có background Java/C# dễ tiếp cận, còn thực tế bên trong nó vẫn là **prototype-chain**. (Javascript thỉnh thoảng được mô tả là prototype-base language, để đối lập với class-base language như Java, C#,...)

*What ??! prototype-chain!??* :scream::scream:

Đúng rồi, là **Prototype-Chain**. 

Bẻ cái từ này ra làm hai thì ta có **Prototype** và **Chain**. Vậy thì Prototype là gì và Chain là gì? Và chúng đóng vai trò như thế nào trong việc Implement tính năng Inheritance trong Javascript?? (mình vừa gọi Inheritance là một tính năng :sweat_smile:)

Đầu tiên, gần như tất cả mọi thứ trong Javascript là Object. Để implement cái tính năng kế thừa, thì mỗi một Object sẽ ngầm chứa trong nó một thuộc tính có giá trị là một "con trỏ" (hay "tham chiếu") tới một Object khác, cái Object khác đó được đặt cho một cái tên mỹ miều là **Prototype**. :yum: 

> Ví dụ, trong Object B có chứa một *liên kết* (hay *con trỏ*, hay *tham chiếu*,...đều như nhau cả) tới Object A. Ta sẽ gọi Object A là **Prototype** của Object B.

Trường hợp, ta có Object C có chứa một *link* (hay *pointer*, hay *reference*,...đều như nhau cả ##mình ghi tiếng anh để các bạn dễ đối chiếu với mấy tài liệu nước ngoài) tới Object B. Suy ra B là Prototype của C. Mà A lại là Prototype của B. Suy ra ta sẽ có:

> C -------> B -------> A

Việc các Object có chứa một liên tới tới một Object khác, rồi Object khác đó lại chứa liên kết tới Object khác nữa, sẽ tạo thành một xâu chuỗi, một sơi dây, một sợi xích,...một cái gì đó dài dài mà từng nút/từng mắt xích là các **Object**. (hay các Prototype cũng là nó đó).

![](https://images.viblo.asia/9e1ef262-f369-493a-b3d1-247c2794393a.PNG)

Đây là mấy hình hình gõ google từ **Chain** nó ra nè :rofl:

Nói tới đây thì mình tiết lộ một bí mật nhỏ xíu, là cái biến mà chứa cái tham chiếu tới prototype của nó có tên là **\_\_proto__**. Các bạn thử bật devtool trong trình duyệt Chrome xong tạo một object litteral kiểu `let a = {}` xong rồi nhấn `a.__proto__` xem nhận được gì...

*Vậy rồi cái chain này nó có tác dụng gì trong việc hiện thực hóa cái tính năng kế thừa?*

Cũng đơn giản thôi, mô tả của tính năng kế thừa là khi đứa con nó kế thừa từ cha nó, thì nó sẽ có các tính trạng hay gen hay đặc điểm tính cách của cha nó. Trong lập trình, một Object A kế thừa từ Object B nghĩa là A nó phải biết những thứ mà thằng Object B biết. Ví dụ ta có `b.sayHi() // hello world` thì khi **a** kế thừa từ **b**, ta gõ `a.sayHi()` cũng sẽ nhận được `hello world`, mặc dù phương thức này không được định nghĩa ở **a**. 

Cơ chế là khi ta truy cập một thuộc tính/phương thức của object, nếu bản thân object đó nó không có, nó sẽ lần lên thằng prototype của nó, để tìm xem có không, nếu có thì lấy dùng, còn không có thì tiếp tục lần theo cái chain đó là hỏi lần lượt từng thằng xem có không, tới thằng trùm cuối luôn là thằng [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object), nếu nó không có nữa thì xem như là không có. Trong JS ta có cái hàm [hasOwnProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) để kiểm tra xem một thuộc tính có phải là chính xác của một object không, hay là nó đi hỏi mấy thằng khác trong cái đường dây quan hệ, bà con xa của nó :innocent:

# Kết bài
Tới kết bài rồi, vẫn muốn giới thiệu với mng một hàm cũng vui và có liên quan đó là hàm [Object.getPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf). Cái hàm này có tác dụng là đi tìm cái thằng gần nhất mà nó liên kết tới trong cái prototype chain. Ví dụ tạo một object literal, xong gọi hàm này chắc chắn nhận được cái thằng trùm cuối Object.

Cảm ơn các bạn đã đọc bài viết, nếu các bạn thích thì hãy để lại một like, thấy hay thì share nhé :joy: trong bài viết sau sẽ có nhiều code hơn. Tuy nhìn đơn giản vậy, chứ mấy ngày đầu mới tiếp cận, nó cứ mông lung mơ hồ sao đó, cái **prototype-chain** này nè...để nói về nó một cách đơn giản và dễ hiểu nhất thì đúng là không đơn giản chút nào...