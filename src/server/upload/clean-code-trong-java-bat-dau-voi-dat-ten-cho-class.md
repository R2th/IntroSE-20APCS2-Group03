# Lời mở đầu
Clean code có lẽ là vấn đề không còn mới mẻ. Mọi người đều nói về nó và hiện tại cũng có không ít bài viết về vấn đề này. Và nếu bạn đã từng đọc qua thì chắc chắn rằng, việc đặt tên biến, hàm, class luôn là vấn đề đầu tiên được nhắc đến. Nguyên nhân không quá khó đoán, cái tên nói lên tất cả, chỉ cần nhìn tên là ta có thể hình dung được nó có chức năng gì, làm những gì. Giống như tiêu đề của một bài viết, chỉ cần nhìn nó là ta có thể được nội dung chính của bài viết đó. Và chính thì thế mà nó trở thành một trong số những vấn đề khó khăn nhất đối với mọi lập trình viên, từ người mới bắt đầu cho đến những người giỏi nhất. Đối với biến, hàm và class cũng không có quá nhiều sự khác biệt trong cách đặt tên nên ở bài viết này mình muốn khái quát hóa đối với đặt tên Class. Vì Class là cái cần đặt tên trước biến (hay properties) và hàm (hay method) mà. Bài viết dựa trên những gì mình tìm tòi, trải nghiệm và đúc kết kinh nghiệm. Nếu có gì thiếu xót mong các bạn góp ý để mình hoàn thiện thêm.


# Quy tắc đặt tên class hợp lệ trong Java

Hẳn rồi, đây là thứ mà bạn phải quan tâm hàng đầu trong việc đặt tên class. Mọi thứ là vô nghĩa khi mà bạn đặt một cái tên không hợp lệ có đúng không nào. Vậy thế nào là tên class hợp lệ trong Java?

## Đầu tiên là kí tự hợp lệ

-	Tên Class chỉ cho phép chứa các kí tự a đến z, A đên Z, 0 đến 9, và _ (Underscore). Kí tự đặc biệt khác và space là không hợp lệ.
-	Tên Class phải bắt đầu bằng kí tự chữ và dấu _, không được bắt đầu bằng kí tự số

## Tiếp theo là độ dài hợp lệ

-	Java không có giới hạn nào cho độ dài của tên class.
-	Tuy nhiên chúng ta thường lấy tên class làm tên của class file và đối với filename thì nó có một giới hạn về độ dài. Hầu hết các hệ điều hành hiện tại đều set maxlength cho filename là 255. Chúng ta mất 5 trong số đó vì file extension (.java) nên giới hạn cho tên class sẽ là 250 kí tự.


# Các quy tắc chung cho việc đặt tên Class

Đây là những quy tắc đã được thống nhất bởi các lập trình viên trên thế giới. Vì nó dựa trên quan điểm chứ không phải theo bất cứ tiêu chí kĩ thuật nào nên đôi khi sẽ có người không thích chúng. Và đôi khi nó cũng cần thay đổi để phù hợp với những trường hợp đặc thù nhưng nhìn chung nó vẫn được sử dụng phổ biến bởi các lập trình viên. Và nếu bạn rơi vào trường hợp đặc thù nào đó, hãy chắc chắn rằng bạn đã thỏa thuận với mọi người trong dự án về cách đặt tên theo các tiêu chuẩn này nhé.

## Tên Class phải được đặt bằng tiếng Anh, đúng chính tả và phải là danh từ

Tiếng Anh là ngôn ngữ quốc tế và mọi người đương nhiên là thống nhất sử dụng nó trong việc đặt tên rồi. Còn chính tả thì miễn bàn. Điều này các lập trình viên mà tiếng mẹ đẻ không phải là tiếng Anh hay mắc phải. Mình đã gặp phải một trường hợp mất cả tiếng đồng hồ để define một class với hàng tá properties và method khi không tìm thấy nó trong source code hiện tại và để rồi ức chế khi phát hiện thằng viết đó đã thiếu một chữ cái trong tên Class khiến mình không thể tìm thấy nó khi search. Đáng ra là DomainEventsConsumer thế mà thằng-nào-đó lại viết là DomainEvenConsumer. Sai ngay cái từ event tưởng chừng là đơn giản nhất. Thật tồi tệ và không chấp nhận được. 

Bên cạnh đó nhắc tới Java không thể không nhắc đến OOP - lập trình hướng đối tượng và class trong Java được dùng để mô hình hóa các thực thể trong thực tế. Và các thực thể này đều có tên là 1 danh từ. Chính vì thế tên Class chắn chắn phải là một danh từ. Tuy nhiên khi sử dụng danh từ chắc hẳn bạn sẽ gặp vấn đề chính là dùng từ đơn hay từ ghép (cụm danh từ) hoặc sử dụng danh từ số ít hay danh từ số nhiều. Hãy thử một số ví dụ nhé. 

Giả sử bạn đang làm một dự án về giao thông và cần hai class là đèn và biển báo giao thông. Bạn quyết định sẽ tạo hai class này trong packege com.traffic.signal và bạn sẽ khai báo như sau:

```
Public class Light() { … }
Public class Signs() { … }
```

Hay

```
Public class TrafficLight() { … }
Public class TrafficSigns() { … }
```

Hoặc giả sử trong hệ thống của bạn chia ra 3 cấp bậc user là admin, staff và guest. Liệu bạn sẽ khai báo

```
Public class Administrator() { … }
Public class Staff() { … }
Public class Guess() { … }
```

Hay khai báo

```
Public class AdminUser() { … }
Public class StaffUser() { … }
Public class GuessUser() { … }
```

Rõ ràng ở ví dụ trên thì việc khai báo với cụm danh từ sẽ cho ta cái nhìn chi tiết hơn về thực thể là class đang mô tả. Tuy nhiên thì từ đơn cũng có công dụng của nó. Chẳng hạn như ở ví dụ thứ hai, việc cả 3 class đều có đặc điểm chung nên thông thường chúng ta sẽ cho nó kế thừa từ một class cha và hẳn không có từ nào dùng để đặt tên cho class cha thích hợp hơn User. Và mình đúc kết ra được một điều khá thú vị là độ chi tiết tên của một class sẽ phụ thuộc vào mức độ trừu tượng của nó.

Còn về danh từ số nhiều hay số ít, hãy nghĩ về các class có sẵn trong Java. Hầu hết chúng đề là danh từ số ít. Tại sao vậy? Bởi vì class mô tả cho một thực thể, và một thực thể ở đây chính là một cá thể chứ không phải là một tập các cá thể. Tuy nhiên đối với những Class dùng để thao tác với nhiều đối tượng như DAO, chúng ta sẽ khai báo CustomerDAO hay CustomersDAO. Mình cũng đã từng gặp khó khăn trong vấn đề này và thầy giáo dạy tiến Anh của mình đã chỉ ra cách giải quyết đơn giản cho trường hợp này. Chìa khóa chính là cây tuốc nơ vít. Một cái tuốc nơ vít có thể vặn nhiều loại ốc vít (screw) và tên tiếng anh của nó là screwdriver. Vâng từ screw trong đó là số ít và đó là tất cả những gì chúng ta cần nhớ.


## Tên class phải được viết theo kiểu PascalCase

Hiện nay chúng ta có 4 quy chuẩn đặt tên
* PascalCase là một quy chuẩn đặt tên với đặc điểm các từ được phân tách bởi việc ghi hoa kí tự đầu tiên của mỗi từ và kí tự đầu tiên phải được ghi hoa.
* camelCase: các từ được phân tách bởi việc ghi hoa kí tự đầu tiên của mỗi từ và kí tự đầu tiên là kí tự in thường.
* snake_case: bao gồm các kí tự in thường và phân cách nhau bằng dấu _
* ALL_CAPS: bao gồm các kí tự in hoa và phân cách nhau bằng dấu _

Tại sao tên class phải viết theo kiểu PascalCase mà không phải kiểu nào khác?

Nguyên nhân chính cho việc hình thành quy tắc này chính là vấn đề về khả năng ghi và đọc của con người. Bởi vì tên không được chứa kí tự space nên cần phải có quy chuẩn cho việc phân tách giữa các từ trong tên. Có hai cách để làm việc này là sự kết hợp giữa từ in thường với từ in hoa và sử dụng dấu _ (underscore). Người ta nhận thấy việc viết bằng cách sử dụng dấu _ sẽ dễ thao tác hơn so với việc kết hợp giữ chữ in thường và in hoa nên quyết định sẽ áp dụng cho các được sử dụng nhiều hơn đó là biến và hằng. Và tên class và tên hàm sẽ được phân tách bằng các kí tự in hoa ở đầu mỗi từ. Tiếp theo là cần có sự phân biệt giữa tên class và tên hàm. Nhờ vào cú pháp khai báo bắt buộc tên class phải được đặt ở đằng trước và theo thói quen chữ cái đầu tiên thường viết hoa nên các lập trình viên đều thống nhất tên class sẽ được viết theo kiểu PascalCase (hay UpperCamelCase) và tên hàm sẽ được viết theo kiểu camelCase.


## Tên class phải trùng với tên file và mỗi file chỉ chứa một class

Với một file Java chúng ta hoàn toàn có thể tạo ra nhiều class ở bên trong và sử dụng không vấn đề gì. Thế nhưng ở trường hợp này bạn nghĩ mình nên đặt tên gì cho file chứa nhiều class như thế. Liệu bạn có dám chắc khi nhìn vào tên file sẽ biết được hết các class ở trong đó khi làm như thế. Và đâu là class chứa hàm main… Nó thực sự không tốt khi có nhiều vấn đề như vậy. Bên cạnh đó nếu bạn định nghĩa nhiều class trong file java, thì khi biên dịch Java sẽ tạo ra nhiều file .class tương ứng. Tuy nhiên nó sẽ trông như sau:

* giả sử file TrafficRule.java có ba class là TrafficRule, TrafficLight và TrafficSigns 
* khi biên dịch java sẽ tạo ra hai file .class là TrafficSignal.class, TrafficSignal$1.class, TrafficSignal$2.class

Và khi thực thi chương trình, nếu gặp dòng lệnh nào sử dụng class TrafficLight thì việc tìm nó trong các file .class không hề dễ dàng. Bởi vì không tồn tại TrafficLight.class và nó phải quét toàn bộ các file .class để tìm ra vị trí chính xác của class TrafficLight. Bạn có nghĩ điều này là tốt. 


## Tên class không nên chứa các từ viết tắt, ngoại trừ các từ viết tắt mà ai cũng biết

Tên class ngắn gọn rất quan trọng và viết tắt có thể giúp giảm bớt độ dài của tên class đi đáng kể. Nhưng nó sẽ ảnh hưởng đến sự rõ ràng về tên. Hãy chỉ dùng những từ viết tắt mà ai cũng biết như HTML, Config chẳng hạn. Hãy chắc chắn rằng từ viết tắt mà bạn sử dụng sẽ không làm người khác tốn thời gian để tìm hiểu.

Việc sử dụng từ viết tắc trong tên cũng có quy định riêng của nó. Khi viết tắt một cụm danh từ, chúng ta sẽ lấy chữ cái đầu tiên của mỗi từ và ghép chúng lại với nhau. Vấn đè bây giờ chúng ta đối diện là có nên ghi hoa tất cả các kí tự của từ viết tắt hay không. Bởi vì chúng ta đang viết theo PascalCase nên khi viết tắt thì các kí tự của từ viết tắt đều ghi hoa. Tuy nhiên điều cần chú ý là khi đặt hai từ viết tắt ở gần nhau, với mọi kí tự đều khi hoa thì việc phân biệt các từ sẽ gặp vấn đề. Chẳng hạn HTTPURLGenarator, nó sẽ khó đọc hơn so với HttpUrlGenarator. Bởi vậy chúng ta nên xem từ viết tắt là một từ bình thường và chỉ cần ghi hoa chữ cái đầu tiên. Đó là cách tốt nhất khi sử dụng từ viết tắt.

# Một số quy tắc khác

Đây là các quy tắc mà mình rút ra được từ những gì mình tìm tòi và trải nghiệm, mình không dám chắc nó có phải là các quy tắc chung hay không nên mình không đưa vào phần ở trên.

## Tên class không nên dài quá năm từ

Thực sự rất khó để đưa ra một con số giới hạn thích hợp cho độ dài của tên class. Nhưng thông thường độ dài của tên class sẽ thõa mãn hai yêu cầu sau:

* -	Tên class phải đặc tả được đối tượng mà nó mô hình hóa.
* -	Nó phải là từ ngắn gọn và dễ đọc nhất. Trường hợp cần phải dài dòng là tồn tại tên class tương tự và bạn cần thêm một chút khác biệt

Để thỏa mãn các tiêu chí này thì tên class thông thường cần từ 3-5 từ. 

## Tên class nên đặt theo Single Responsibility Principle

SOLID là một priciple không thể không áp dụng đối với lập trình hướng đối tượng. Và Single Responsibility Principle, chữ S đầu tiên trong SOLID bảo rằng mỗi class chỉ nên mô tả một đối tượng cụ thể và tên class dùng để giải thích, trình bày đối tượng đó. Điều này có nghĩa là bạn phải tốn thêm công sức để định nghĩa thêm hàng trăm class nhỏ và chi tiết hơn. Nhưng hãy thử xem, lợi ích bạn nhận lại không hề ít so với công sức bạn bỏ ra đâu. 


## Tên class nên có tiền tố và hậu tố tương ứng

Điều này phù hợp với các class thể hiện công việc nào đó. Việc này giúp cho việc phân biệt class và vai trò của class đó trong dự án hiện tại. Như các interface nên có tiền tố I chằng hạn, chỉ cần nhìn vào là biết nhau nó là một interface. Hay AbstractHandlerExceptionResolver, CustomerRegisterController. Chỉ cần tiền tố và hậu tố, ta có thể phân biệt rõ ràng class đó là gì và nó có vai trò gì.
Việc này cũng cần phải có sự nhất quán trong dự án của bạn. Việc thêm tiền tố và hậu tố vào tên class phải được quy định đối với những loại đối tượng nào. Sẽ thật là một trải nghiệm tồi tệ khi gặp cùng một lúc hai style khác biệt khi thêm tiền tố và hậu tố như: IEventConsumer, CommandHandlerInterface 

## Tên class nên tránh các từ đồng nghĩa

Việc nhất quán về cách dùng từ trong toàn bộ dự án là điều nên làm. Với một ý nghĩa thì không nên có nhiều cách thể hiện của nó. Khi dùng từ đồng nghĩa nhưng không mang lại sự khác biệt thì nó dễ gây nhầm lẫn cho người khác vì họ sẽ nghĩ có lí do gì mà bạn phải dùng từ khác với mọi người. Hãy đảm bảo dự án của bạn luôn có sự thống nhất về cách dùng từ.


# Lời kết

Đặt tên chưa bao giờ là vấn đề dễ dàng nhưng đừng khiến nó làm trở ngại trong quá trình làm việc của bạn. Nếu bạn còn lo lắng mình đặt tên chưa đủ tốt, hãy đưa cho người bất kì xem và đánh giá. Nếu người khác dù không phải là lập trình viên đều có thể hiểu được tên class của bạn đại diện cho cái gì thì hãy tự tin mà sử dụng nó. Đây chỉ là bước khởi đầu của Clean code nhưng ai lại không muốn có một khởi đầu tốt và vững chắc có đúng không. 
Xin chào và hẹn gặp lại ở các bài viết sau.


# Tham khảo
https://www.javatpoint.com/java-naming-conventions
https://kipalog.com/posts/Clean-code---ma-sach-va-con-duong-tro-thanh-better-developer--p1