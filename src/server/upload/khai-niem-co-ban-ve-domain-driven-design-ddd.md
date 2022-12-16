# Lời nói đầu

Xin chào tất cả mọi người, hôm nay mình sẽ chuyển chủ đề một chút, thử sức mình với một số khái niệm cao cấp hơn và chủ đề hôm nay mình chọn là DDD - Domain Driven Design. Đây là chủ đề hay và còn khá mới với các lập trình viên Việt. Mình thì đã đọc và nghe rất nhiều chia sẽ về DDD nhưng chưa có cơ hội làm việc với DDD nên bài viết này chủ yếu dựa trên những gì mình tìm tòi. Do đó chắc chắn sẽ có những sai sót nhất định. Hi vọng sẽ nhận được nhiều sự đóng góp từ phía mọi người để mình có thêm một cái nhìn rõ ràng hơn về DDD, có thêm góc nhìn về các khía cạnh chưa được trải nghiệm.


# DDD - Domain Driven Design, nó là gì?

> Domain-driven design (DDD) is an approach to developing software for complex needs by deeply connecting the implementation to an evolving model of the core business concepts. 


DDD là một cách tiếp cận để phát triển những phần mềm phức tạp thông qua sự kết nối chặt chẽ giữa việc triển khai ứng dụng với sự phát triển của mô hình kinh doanh. Tiền đề tạo nên DDD là

-  Đặt trọng tâm dự án vào nghiệp vụ chính (core domain) và các logic của nghiệp vụ (domain logic).
-  Mô hình hóa là trọng tâm, là nền tảng cho các thiết kế phức tạp
-  Sự cộng tác đầy sáng tạo giữa nhóm developer và các domain expert (chuyên gia nghiệp vụ) tạo nên tiếng nói chung để xác định và giải quyết hiệu quả các vấn đề.

Định nghĩa trên mình sub lại từ wiki, có hơi khó hiểu nên mình cũng giải thích thêm một chút về khái niệm DDD theo suy nghĩ của mình. Đầu tiên DDD không phải là một design pattern (theo mình nghĩ là vậy). Nó chỉ là một tư tưởng, một hướng tiếp cận trong việc giải quyết các bài toán phức tạp. DDD tập trung vào khái niệm domain (nghiệp vụ) và bóc tách bài toán dựa trên các domain đó. Tại sao phải dựa trên domain? vì đây là cái khách hàng (domain expert) nắm rõ nhất. Chúng ta phát triển ứng dụng theo yêu cầu của khách hàng nên hiển nhiên không ai hiểu các yêu cầu của hệ thống bằng khách hàng. Và khi khách hàng giải thích hệ thống cho chúng ta hiểu, họ sẽ giải thích về các domain của nó. Chính vì thế các domain sẽ làm trọng tâm và công việc của chúng ta là xây dựng nó thành các mô hình để cho tất cả mọi người cùng nắm vấn đề. Nói nôm na, DDD là thiết kế sao cho không chỉ lập trình viên hiểu mà ngay cả khách hàng, những người không biết gì về mặt kỹ thuật cũng có thể nhìn vào nắm được trọng tâm của vấn đề.  Trong thực tế, đây là một quá trính đòi hỏi rất nhiều kĩ năng và quá trình tiếp cận xây dựng có hệ thống. Cái khó khăn trong việc triển khai DDD là những lập trình viên như chúng ta hoàn toàn chẳng có tí tẹo gì về cái gọi là domain và phải xây dựng hệ thống dựa trên khái niệm domain nên việc đặt mọi thứ vào đúng vị trí của nó không phải là một điều dễ dàng. 


# DDD - Các khái niệm cốt lõi

Phần này mình sẽ đê cập đến các khái niệm trong DDD, qua đó sẽ giải thích việc DDD được triển khai như thế nào. Đối với DDD, khái niệm domain (nghiệp vụ) rõ ràng là quan trọng nhất nhưng mình sẽ không đề cập đến khái niệm về domain. Phần này theo mình nên tìm hiểu dựa trên lĩnh vực mà dự án của bạn đang thực hiện là chuẩn nhất. Mình cũng không đưa ra được khái niệm nào là tốt nhất cho tất cả trường hợp nên là cho phép mình không đề cập đến.

## Ubiquitous Language - Ngôn ngữ chung


Ngôn ngữ chung giữa domain expert và developer hiển nhiên là vấn đề được đặt lên hàng đầu. Việc sử dụng chung ngôn ngữ giúp tránh mọi nhầm lẫn dẫn đến sai sót trong quá trình xây dựng và phát triển ứng dụng. Đa số các lỗi đều xuất phát từ khách hàng nói một đàng và developer hiểu một nẻo. Đối với nhiều domain, đa số đều có những thuật ngữ riêng và đôi khi nó hoàn toàn xa lạ với dev. Nó gây ra nhiều nhầm lẫn khi thảo luận về ứng dụng. Ngôn ngữ chung giúp giảm bớt những nhầm lẫn như vậy. Việc phản ánh những thuật ngữ, các khái niệm của các domain vào source code hoàn toàn có thể thực hiện được thông qua các đặt tên các package, class, method, properties... Và tất nhiên là ta phải phản ảnh vào mọi feature để đảm bảo khách hàng nhìn vào cũng có thể hiểu được chúng là cái gì.

Tóm lại UL là:

- ngôn ngữ được sử dụng trong cả kĩ thuật lẫn trong nghiệp vụ
- được phản ánh trong code
- được phản ánh trong tất cả tính năng của hệ thống


## Bounded Context - ngữ cảnh giới hạn


Với DDD, ý tưởng chính là chia hệ thống phức tạp dựa trên các domain của nó. Tuy nhiên, đôi khi một số domain lại chồng chéo lên nhau và đối với những đối tượng khác nhau thì domain tương ứng cũng khác nhau. Chẳng hạn đơn giản nhất là việc xuất hóa đơn, đối với từng đối tượng thì nghiệp vụ xuất hóa đơn lại có cách xử lý khác nhau. Việc này gây ra những xử lý phức tạp về mặc logic, cái mà chẳng dev nào mong muốn phải đối mặc. Nên dẫn đến để xử lý cho trường hợp này, cần phải bóc tách hệ thống thành những hệ thống con phục vụ cho những đối tượng nhất định và các hệ thống con này cũng có các domain tương ứng. Nói cách khác, việc chia hệ thống dựa trên những ngữ cảnh cụ thể, giới hạn từng đối tượng, từng domain (Bounded Context). Và với ý tưởng chia để trị như thế này, DDD trở nên rất phù hợp cho việc áp dụng mircoservice. Việc chia thành các ngữ cảnh cụ thể tương đương với việc tách các xử lý logic và tách biệt về cơ sở dữ liệu. Mức độ giới hạn của các ngữ cảnh hoàn toàn phụ thuộc vào nhu cầu thực tế. 

Một điều chú ý là các ngữ cảnh được chia nhỏ đều dựa trên một domain lớn, có nghĩa là chúng có liên quan đến nhau. Tuy nhiên, chúng cần phải được tách biệt và không phụ thuộc lẫn nhau. Xu hướng thiết kế hiện đại là đảo ngược sự phụ thuộc và tất nhiên DDD cũng thế. Thay vì phụ thuộc lẫn nhau, chúng ta sẽ tạo ra một layer trung gian, ở giữa hai ngữ cảnh và cho chúng phụ thuộc vào layer này. Điều này hoàn toàn hữu ích khi thay đổi hoặc tái cấu trúc các ngữ cảnh, ta chỉ cần sửa lại các layer này và các ngữ cảnh sẽ không bị ảnh hưởng. Các layer này được gọi là Anti-Corruption Layer (layer chống hủy hoại hệ thống).

Tóm lại thành mấy cái gạch đầu dòng, Bounded Context là:

- domain độc lập
- được kết nối với nhau thông qua Anti-Corruption Layer
- độc lập về database
- Phù hợp để áp dụng cho microservice


## Basic element - những thành phần cơ bản


### Entity


Trong DDD, việc quan trọng cần phải làm là mô hình hóa các domain để cả dev lẫn domain expert đều nắm được. Và để mô hình hóa thì thành phần không thể thiếu là các entity (đối tượng). Tất cả các domain đều phải có đối tượng cụ thể và khái niệm về entity chắc cũng quá gần gũi với chúng ta. Ai mà lại không biết về OOP chứ. Entity trong DDD có một chút khác biệt là nó phải được định danh (có ID) và định danh phải bất biến và duy nhất trong toàn bộ hệ thống. Việc phân biệt các thực thể là rất quan trọng. Việc chia hệ thống dựa theo các domain sẽ tạo ra việc đối tượng trong nhiều domain là thực chất là một đối tượng. Việc gắn ID sẽ giúp cho xác định đối tượng có là một hay không trở nên đơn giản hơn. Chúng ta không thể nào phân biệt dựa trên các thuộc tính của đối tượng đó mà cần phải có thuộc tính đặc thù nhất gắn liền với đối tượng.

Bên cạnh đó, vì cùng một đối tượng có thể nằm ở nhiều domain khác nhau và các domain này độc lập với nhau nên entity cần thiết phải chứa logic của riêng nó để có thể sử dụng trên nhiều domain và mỗi domain không cần phải quan tâm đến những logic đó. Điều này đảm bảo cho tính nhất quán của hệ thống và giảm bớt những xử lý dư thừa. Thêm một điều cần lưu ý, entity cũng cần phải có life cycle (creation and deletion) trong chính bản thân nó. Vì việc được sử dụng trên nhiều domain độc lập sẽ không đảm bảo việc tạo hoặc xóa bỏ đối tượng đó đúng cách. Chúng ta thường hay thiết kế theo anemic model nghĩa là đặt các logic này trong các Service, Util, Helper thay vì đặt ở trong entity... nhưng với DDD, chúng ta không làm như thế. 

Để dễ hình dung, hãy nhìn vào thẻ visa của bạn, nó là một entity. Nó có thể được dùng trong nhiều domain khác nhau như thanh toán online, chuyển tiền qua tài khoản khác... Và chắc chắn rằng thẻ visa của bạn phải có mã thẻ (hay số tài khoản) là duy nhất, nó không được phép trùng với bất kì cái nào khác và trên hết nó không thể thay đổi được. Trên thẻ, nó có những thông tin về ngày khả dụng, ngày hết hạn, tương ứng với life cycle của nó (creation và deletion). Những thông tin này thuộc về thẻ và logic xử lý hợp lệ hay hết hạn cũng sẽ dựa trên chính thẻ đó. Nếu không đề cập tới các service về quản lý cấp cao, thì không có bất cứ service nào có thể chứa logic về thay đổi kì hạn của thẻ. 

Chốt, entity trong DDD là một đối tượng:

- Có định danh bất biến và duy nhất
- Chứa life cycle: creation và deletion
- Nên chứa các logic của riêng nó thay vì thiết kế theo anemic model



### Value Type 


Không phải bất cứ đối tượng nào cũng bắt buộc phải có định danh. Mà không có định danh nghĩa là nó không phải là entity. Vậy nó là gì? Trong DDD, đối tượng không có định danh được gọi là value type (hay value object). Những đối tượng này thường là để lưu giá trị và không cần phải phân biệt với nhau. Chỉ đơn giản là lưu giá trị. Ví dụ như một voucher giảm giá, người ta chỉ quan tâm đến giá trị giảm giá được in trên trên voucher chứ chả ai cần biết mã voucher hay cái gì khác. Và những thông tin đó cũng chẳng cần thiết, voucher chỉ cần lưu số tiền giảm giả và thế là đủ. Value type cũng vậy, chỉ cần lưu giá trị là đủ. Value type đóng vai trò làm đối tượng giữ các giá trị của các setting, nó kết hợp với entity để giúp entity có thể phân biệt nhau trong từng domain. Lấy ví dụ voucher giảm giá 1 triệu, nó sẽ không có ý nghĩa nếu không kết hợp với một hóa đơn mua hàng (entity). Hay một địa chỉ nào đó, nếu đứng một mình thì chẳng mang lại nghĩa gì nhưng nếu gắn với một entity cụ thể như người (địa chỉ liên hệ) hay đơn hàng (địa chỉ giao/nhận hàng). Qua ví dụ này, ta có thể nhận ra một tính chất nữa của value type là tính bất biến. Một khi nó được tạo ra thì nó không thể thay đổi trong vòng đời của nó. Voucher 1 triệu thì nó mãi là voucher 1 triệu cho tới khi nó hết hạn áp dụng, không thể đổi thành 2 triệu hay 2 trăm được. 

Điều cần lưu ý khi sử dụng value type là chỉ đơn thuần là lưu giá trị và không có định danh. Tức là chúng sẽ như nhau khi có giá trị giống nhau, không có sự khác biệt. Chẳng hạn như 2 địa chỉ nhà giống nhau từng con phố ngõ hẽm thì là như nhau. Hay hai voucher giảm giá 1 triệu là như nhau. Vì vậy hãy chắc chắn rằng tất cả các value type đều bình đẳng với nhau vì không có sự khác biệt khi các thuộc tính đều có cùng giá trị. Đây cũng là điểm phân biệt giữa entity và value type và từ đó có thể đưa ra quyết định chính xác object là entity hay value type.


Tóm lại value type là object:

- Không có định danh
- Nếu các thuộc tính đều có cùng giá trị thì là các object như nhau.


### Aggregates

> Aggregate is a pattern in Domain-Driven Design. A DDD aggregate is a cluster of domain objects that can be treated as a single unit. An example may be an order and its line-items, these will be separate objects, but it's useful to treat the order (together with its line items) as a single aggregate. - Martin Fowler

Đây có lẽ là khái niệm hay nhất và rối rắm nhất trong DDD. "Một Aggregate là một nhóm các đối tượng, nhóm này có thể được xem như là một đơn vị thống nhất". Một nhóm mà lại xem như là một đơ vị, thật khó hiểu. Để nắm được khái niệm Aggregate một cách dễ dàng nhất hãy nghĩ về hình ảnh chùm nho. Một chùm nho thì có nhiều trái nho được nối với nhau trên một cuống nho và nối với thân cây nho thông qua gốc của cuống nho đó. Và trên cây nho thì có rất nhiều chùm nho. Tưởng tượng rất đơn giản, chúng ta bắt đầu với aggregate.

Một aggregate bao gồm các entity như chùm nho thì có nhiều trái nho. Các trái nho trong một chùm có thể kết nối lẫn nhau nhưng nếu muốn tạo liên kết đến trái nho ở chùm khác thì bắt buộc nó phải thông qua cái gốc của chùm nho, đi vào thân và đến gốc của chùm nho khác rồi mới tới được trái nho của chùm khác. Tương tự,  Các entity trong nội bộ aggregate có thể tự do tham chiếu đến nhau tuy nhiêu muốn tham chiếu đến đối tượng nằm ở aggregate khác thì thì nó phải thông qua gốc của aggregate (aggregate root). Điều này giúp giảm bớt sự phụ thuộc giữa các entity trong hệ thống. Thay vì chúng phải kết nối lẫn nhau thì bây giờ chúng chỉ cần liên kết thông qua các aggregate root. Giảm đi vô số liên kết tức là giảm đi vô số phụ thuộc. Điều này giúp tăng khả năng linh hoạt của hệ thống, thứ mà đang trở thành yêu cầu hàng đầu trong phát triển ứng dụng ngày nay. Một khi cắt gốc chùm nho, không còn cách nào để giữ trái nho lại trên cây cả. Tuy nhiên thì các chùm nho khác trên cây vẫn sống bình thường chỉ là không thể nào tham chiếu đến các trái nho trong chùm nho đã cắt được thôi. 

Bên cạnh đó, để các entity có thể tham chiếu đên nhau trong aggregate thì nhất thiết phải có logic xử lý nằm ở aggregate. Cái trái nho muốn nối với nhau thì phải thông qua cuống nho đó thôi. Nên phải chú ý rằng trong một aggregate, phải đảm bảo có đầy đủ các logic liên quan đến tất cả entity chứa trong nó. Từ đó các entity mới có thể giao tiếp với nhau. Và những aggregate khác muốn tác động đến các entity này chỉ cần sử dụng các logic đó mà thôi, không nhất thiết phải tạo thêm logic chỉ đích danh chính entity đó. Tức là chỉ cần giao tiếp với aggregate là có thể giao tiếp với tất cả các entity có trong aggerate đó.

đúc kết lại, aggerate là:

- Một tập hợp các thực thể
- Các xử lý đề thông qua root entity nên có thể xem aggerate là một đơn vị thống nhất.
Lưu ý: aggerate phải chứa các xử lý logic liên qua đến tất cả các entity


### Domain Services 

Thành phần cơ bản cuối cùng mình muốn nhắc đến là các service trong domain. Như ta đã biết thì entity và aggrerate đều có chứa các logic trong chính nó. Service trong DDD hoàn toàn khác biệt với service mà chúng ta thường làm việc trong anemic model. Với anemic modal, service được xây dựng trên dựa trên các entity, service là nơi xử lý các đối tượng đó. Vô hình chung điều này khiến service phụ thuộc vào entity và điều này là không tốt thì nó phụ thuộc vào entity là module cấp thấp. DDD làm điều ngược lại, DDD chú trọng vào domain và service là các chức năng trong domain đó, tức là trọng tâm là đối tượng thực hiện service là domain. Service sẽ cung cấp các chức năng cho domain. Việc này sẽ đưa service phụ thuộc vào module cấp cao hơn là domain. Đây là ý tưởng tốt và giúp cho việc xây dựng và phát triển ứng dụng tốt hơn nhiều.

Về vai trò cụ thể, service là nơi chứa các logic quá phức tạp trong mà trong phạm vi entity không thể làm được. Service cũng là nơi chứa các logic làm việc trên nhiều aggrerate. Điều này là hoàn toàn dễ hiểu khi những logic này không thể được gói gém trong entity hay aggrerate. Việc cố nhét tất cả vào một thức không phải là hay ho mà cần phải biết nhét cái gì vào cho hợp lý nhất.


Vậy, domain service là:

- Nơi chứa các chức năng của domain
- Chứa các logic phức tạp mà không thể chứa trong phạm vi entity hoặc những logic làm việc với nhiều aggregate.


# Lời kết

Microservice đang là một xu hướng lập trình chủ chốt cho mọi ứng dụng lớn và DDD chính là khởi đầu cho việc triển khai microservice. Mặc dù bài viết chưa thực sự tạo ra sức móc cũng như việc triển khai microservice bằng DDD tuy nhiên đó là một câu chuyện khác và nó cần một bài viết khác, và bài này không có liên quan. Đó có lẽ mà một mảng cao hơn mà mình sẽ hướng tới để viết tiêp. Tuy nhiên với bài viết này, hi vọng các bạn có cái nhìn sơ về DDD và các thành phần cốt lõi của nó. Vì chỉ là cốt lỗi nên chắc chắn còn nhiều thành phần khác chưa được đề cập tới. Một mặt cũng vì kiến thức của mình còn hạn chế, chưa có dịp làm việc trực tiếp với DDD nên qua đây cũng mong nhận được nhiều góp ý, trao đổi từ các bạn để có có thể nắm rõ hơn về DDD. 

Cảm ơn các bạn đã dành thời gian đọc bài viết này. Chúc một ngày tốt lành.


# Tham khảo

Domain-Driven Design - Tackling Complexity in the Heart of Software - Eric Evans 
http://dddcommunity.org/
https://viblo.asia/tags/domain-driven-design