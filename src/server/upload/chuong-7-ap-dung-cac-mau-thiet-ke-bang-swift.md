**Chương 7 Áp dụng mẫu thiết kế hướng đối tượng trong swift** (Chú ý Chương này rất dài)

Trong xuất bản lần đầu của Gang of Four’s Design Patterns: Elements of Reusable Object- Oriented Software  tháng 10 năm 1994. Tôi chỉ chú ý đến những mẫu thiết kế này từ 10 đến 12 năm về trước. Giống hầu hết những lập trình viên có kinh nghiệm, khi tôi lần đầu đọc về những mẫu thiết kế. Tôi nhận ra được nhiều mẫu bởi vì tôi đã thực sự dùng chúng mà không nhận ra chúng là gì. Trong khoảng 10 năm về trước hoặc hơn tôi đã không tin tôi đã viết nhiều loại ứng dụng khác nhau mà không dùng ít nhất một mẫu thiết kế của Gang of Four’s. Tôi sẽ nói với bạn, tôi  chắc chắn không phải là người đam mê thiết kế và nếu tôi tham gia một cuộc đối thoại về những mẫu thiết kế, thường có một số mẫu tôi có thể nhớ tên mà không phải nhìn vào chúng. Nhưng một thứ tôi nhớ đó là những khái niệm lý thuyết phía sau của những mẫu này và vấn đề được thiết kế để giải quyết. Đây là cách khi tôi gặp một trong những vấn đề. Tôi có thể tìm kiếm mẫu thích hơp và áp dụng nó. Vì vậy hãy nhớ, như bạn sẽ thấy thông qua suốt chương này, bỏ thời gian để hiểu những khái niệm bên dưới của những mẫu này hơn là cố gắng nhớ trong đầu về chúng.

Trong chương này chúng ta sẽ học theo những phần sau:
- Mẫu thiết kế là gì?
- Kiểu của những mẫu loại creational, structural và behavioral
- Cách để thực thi mẫu builder, factory và singleton trong swift
- Cách để thực thi mẫu bridge, facade và proxy trong swift
- Cách thực thi mẫu strategy, command và observer trong swift

**Những mẫu thiết kế là gì?**

Mọi lập trình viên có kinh nghiệm có một tập hợp những chiến lược đã hình thành cách họ thiết kế và viết ứng dụng. Có những chiến lược được mô hình hoá bởi những kinh nghiệm trong quá khứ của họ và những chướng ngại vật mà họ đã vượt qua trong những dự án trước đây của mình. Mặc dù những người lập trình viên này đã đảm bảo về những chiến lược của họ, nó không có nghĩa là những chiến lược của họ có đầy đủ sự hiệu chỉnh. Dùng những chiến lược đó có thể dẫn đến sự không nhất quán trong thực thi giữa những dự án khác nhau và những người lập trình khác nhau.

Trong khi những khái niệm về thiết kế mẫu quay trở lại vào giữ những năm 80. Chúng không được phổ biến cho tới khi Gang Of Four xuất bản cuốn sách Design Patterns: Elements of Reusable Object-Oriented Software  năm 1994. The book's authors, Erich Gamma, Richard Helm, Ralph Johnson, and John Vlissides (also known as the Gang of Four) thảo luận về những lỗ hỏng của lập trình hướng đối tượng và diễn tả 23 loại mẫu thiết kế. Có 23 mẫu được phân chia thành 3 loại: Creational, structural, behavioral

Một mẫu thiết kế định nghĩa một vấn đề phổ biến trong việc phát triển phần mềm và cung cấp một chiến lược để giải quyết nó. Những chiến lược này đã được chứng minh qua nhiều năm trở thành giải pháp hiệu quả cho những vấn đề mà những nhà lập trình dự định để giải quyết. Dùng những mẫu này có thể tăng tốc độ phát triển dự án bởi vì chúng cung cấp giải pháp đã được chứng minh để giải quyết một số vấn đề chúng trong quá trình lập trình.

Một ưu điểm chúng ta chúng ta nhận được khi chúng ta dùng mẫu thiết kế là sự nhất quán trong code để dễ dàng bảo trì bởi vì nhiều tháng, nhiều năm sau đó, khi chúng ta nhìn lại code của mình chúng ta sẽ nhận ra những mẫu này và hiểu được những gì code thực hiện. Nếu chúng ta có thể viết lại nội dung code của mình, và ghi chú lại mẫu thiết kế chúng ta sẽ thực hiện. Nó sẽ giúp những người lập trình khác hiểu những gì code đang thực hiện.

2 ý nghĩa triết học phía sau những mẫu thiết kế là code được tái sử dụng và có tính linh hoạt. Như một nhà  kiến trúc sư phần mềm, nó thật là hiệu quả khi chúng ta xây dựng code của mình có tính tái sử dụng và tính linh hoạt. Điều này cho phép chúng ta dễ dàng bảo trì trong tương lai và dễ dàng cho ứng dụng của chúng ta mở rộng những tính năng phù hợp với yêu cầu bởi vì chúng ta biết rằng cách nhanh nhất để thay đổi cho phù hợp với yêu cầu.

Mặc dù có nhiều lý do để thích những mẫu thiết kế, và chúng thực sự hữu ích cho những người lập trình và kiến trúc sư. Chúng không phải là giải pháp cho nạn đói của thế giới mà một số lập trình viên khiến nó trở thành. Ở một số thời điểm trong sự nghiệp lập trình viên của bạn, bạn sẽ có thể gặp một lập trình viên hoặc một kiến trúc sư người nghĩ rằng mẫu thiết kế là quy luật bất biến. Những lập trình viên thường cố gắng ép để dùng những mẫu thiết kế thậm chí khi chúng không thật sự cần thiết. Một quy luật đúng đắng ở đây là đảm bảo bạn có một vấn đề cần được sửa trước khi bạn cố sửa nó.

Mẫu thiết kế là điểm bắt đầu để tránh và giải quyết những vấn đề trong lập trình. Chúng ta có thể nghĩ về mỗi mẫu thiết kế như một công thức cho một đĩa thức ăn. Chỉ là một công thức tốt, chúng ta có thể sửa và điều chỉnh nó để phù hợp với mùi vị của mình. Nhưng chúng ta thường xuyên không muốn đi quá xa khỏi công thức truyền thống bởi vì chúng ta có thể làm nó rối tung lên.

Cũng có những lần chúng ta không có một công thức cho một đĩa thức ăn chúng ta muốn, giống như có những lần khi không có một mẫu thiết kế nào giải quyết được vấn đề bạn đang gặp phải.Trong trường hợp như vậy, chúng ta có thể dùng kiến thức của mình về thiết kế mẫu và những hiểu biết của mình về triết học để nghĩ ra giải pháp hiệu quả cho vấn đề của mình.

Thiết kế mẫu được chia ra làm 3 thể loại như sau:

* Creational Patterns: Mẫu sáng tạo hổ trợ trong việc tạo ra những đối tượng

* Structural Patterns: Mẫu cấu trúc liên quan đến kiểu và thành phần cấu tạo nên đối trượng

* Behavioral Patterns: Mẫu hành vi kết nối giữa những kiểu khác.

Với định nghĩa của Gang of four hơn 20 mẫu thiết kế chúng ta chỉ xem qua những ví dụ của một trong những mẫu phổ biến nhất trong chương này. Cùng bắt đầu xem mẫu sáng tạo
Ghi Chú: Những mẫu thiết kế có nguồn gốc từ định nghĩa cho lập trình hướng đối tượng. Trong chương này. chúng ta sẽ tập trung vào thực thi những mẫu có thể dùng cho hướng protocol. Do đó những ví dụ trong chương này có thể trong khác khác với những ví dụ trong những cuốn sách mẫu thiết kế khác nhưng lý thuyết bên dưới để giải quyết cùng vấn đề.

**Creational patterns (Mẫu sáng tạo)**

Mẫu sáng tạo được thiết kế để giải quyết cách một đối tượng được tạo ra. Có 2 ý tưởng cơ bản bên dưới mẫu này. Đầu tiên là đóng khói kiến thức của những kiểu dữ liệu rõ ràng nên được tạo và thứ hai là ẩn cách thực thể của những kiểu dữ liệu được tạo.
Có 5 mẫu thiết kế nổi tiếng nằm trong nhóm mẫu sáng tạo. chúng là:
- (Abstract factory patterns)Mẫu nhà máy trừu tượng: Mẫu này cung cấp một giao diện để tạo những đối tượng có liên quan mà không chỉ rõ kiểu của nó.
- Builder pattern (Mẫu người xây dựng). Mẫu này phân tách sự khởi tạo của một đối tượng phức tạp khỏi sự đại diện của nó, vì vậy để quy trình tương tự có thể dùng để tạo cùng kiểu dữ liệu.
- (Factory method pattern) mẫu phương thức nhà máy. Mẫu này tạo những đối tượng mà không phơi bày phần logic bên dưới và cách mà đối tượng được tạo
- Prototype pattern: Mẫu này tạo một đối tượng bằng cách sao chép một đối tương đang tồn tại
- Singleton pattern: Mẫu này cho phép một (và chỉ một) thực thể của một lớp tồn tại toàn bộ thời gian sống của một ứng dụng.
Trong chương này chúng ta sẽ trình bày ví dụ về cách để thực thi singleton, builder, và factory method trong swift

**Mẫu thiết kế Singleton.**
Tác dụng của mẫu này là một đề tài tranh cãi gay gắt trong cộng đồng những nhà phát triển. Một trong những nguyên nhân chính là nó có thể bị lạm dụng và lạm dụng quá mức. Một nguyên nhân khác mẫu này là tranh cãi rằng singleton tạo ra một biến toàn cục trong ứng dụng, nó cung cấp khả năng để thay đổi đối tượng ở bất cứ thời điểm nào trong ứng dụng. Mẫu singleton này có thể làm ẩn đi những phần phụ thuộc và tạo nên sự liên kết chặc chẽ trong code. Ý kiến cá nhân của tôi là nếu mẫu singleton được dùng đúng , không có gì sai khi dùng nó. Tuy nhiên chúng ta cần cẩn thận để không lạm dụng nó.

Mẫu singleton ngăn chặn việc khởi tạo một lớp để  tạo một thực thể duy nhất tồn tại trong toàn thời gian của sống của ứng dụng. Mẫu này rất hiệu quả khi chúng ta cần chính xác một thực thể tương ứng với những hành động trong ứng dụng của chúng ta. Một ví dụ về cách tốt nhất để dùng mẫu singleton là nếu ứng dụng của chúng ta kết nối với một thiết bị bên ngoài thông qua  bluetooth và chúng ta cũng muốn duy trình kết nối thông qua suốt thời gian tồn tại của ứng dụng. Một số người sẽ nói rằng chúng ta có thể truyền thực thể của sự kết nối từ một trang tới phấn tiếp theo, về cơ bản singleton là như vậy. Trong ý kiến cá nhân của mình mẫu singleton trong ngữ cảnh này là một giải pháp rõ ràng, bởi vì với mẫu thiết kế singleton, bất cứ trang nào cần kết nối có thể nhận được sự kết nối mà không phải ép buộc mỗi trang duy trình một thực thể. Điều này cũng cho phép chúng ta duy trì kết nối mà không phải kết nối lại mỗi lần chúng ta đi đến một trang khác

**Hiểu vấn đề:**
Vấn đề mẫu singleton được thiết kế để khi chúng ta cần một và chỉ một kiểu thực thể tồn tại toàn bộ thời gian của ứng dụng. Mẫu singleton thường được dùng khi chúng ta cần quản lý tập trung của một tài nguyên trong và ngoài và một điểm truy xuất duy nhất toàn cục. Một cách dùng khác của mẫu này là khi chúng ta muốn củng cố một tập hợp những hành động có liên kết với nhau, những nhu cầu xuyên suốt ứng dụng của chúng ta, cái mà không cần duy trì một trạng thái.

Trong chương 3, extentions chúng ta đã dùng mẫu singleton cho kiểu thẫm định văn bản của chúng ta bởi vì chúng ta muốn tạo một thực thể duy nhất để có thể dùng cho tất cả các bộ phận trong ứng dụng mà không cần chúng ta phải tại một thực thể mới. Những kiểu thẫm định không có một trạng thái nào cần được thay đổi. Chúng chỉ có phương thức để thực hiện thẫm định trên một văn bản và hằng số được định nghĩa cách để thẫm định văn bản. Trong khi đó có 1 số lý do không đồng tình với tôi . Tôi tin rằng những kiểu như vậy là ứng cử viên tuyệt vời cho mẫu singleton bởi vì không có lý do gì để tạo nhiều thực thể của nhưng kiểu đó

**Hiểu giải pháp.**
Có một số cách để thực thi mẫu singleton trong swift. Cách được thể hiện ở đây dùng hằng số lớp được giới thiệu từ swift 1.2. Với phương thức này một thực thể duy nhất của lớp được tạo lần đầu tiên chúng tra truy cập với lớp hằng số. Chúng ta sẽ dùng lớp này để đạt được truy xuất tới thực thể trong suốt thời gian sống của ứng dụng. Chúng ta sẽ tạo một hàm khởi tạo riêng tư và sẽ ngắn chặn code bên ngoài khởi việc tạo thêm thực thể từ lớp này.

Chú ý: Chúng ta dùng từ class trong diễn tả ở đây không phải là kiểu dữ liệu nào khác. Nguyên nhân cho việc này là mẫu singleton có thể chỉ được thực thi với kiểu tham chiếu.

**Thực thi mẫu singleton.**
Cùng xem cách chúng ta thực thi mẫu singleton bằng swift. theo đọan code dưới đây.
```class MySingleton {
    static let sharedInstance = MySingleton()
    var number = 0
    private init() {}
}
```

Trong lớp MySingleton chúng ta tạo một hằng số tĩnh tên là sharedInstance chứa đựng một thực thể của lớp MySingleton. Một hằng số tĩnh có thể được gọi mà không phải khởi tạo lớp. Bởi vì chúng ta đã định nghĩa sharedInstance hằng số tĩnh, chỉ một thực thể sẽ tồn tại suốt thời gian sống của ứng dụng. Bằng cách đó tạo được mẫu singleton. Chúng ta cũng tạo một hàm khởi tạo riêng tư sẽ ngăn chặn những code bên ngoài tạo thực thể của lớp MySigngleton.

Bây giờ cùng xem mẫu này làm việc thế nào. Mẫu này có thuộc tính khác là number, kiểu integer. Chúng ta sẽ quan sát cách thuộc tính này thay đổi cũng như cách dùng sharedInstance để tạo nhiều biến kiểu MySingleton
```
var singleA = MySingleton.sharedInstance
var singleB = MySingleton.sharedInstance
var singleC = MySingleton.sharedInstance

singleB.number = 2
print(singleA.number)
print(singleB.number)
print(singleC.number)
singleC.number = 3
print(singleA.number)
print(singleB.number)
print(singleC.number)
```

Trong ví dụ này thuộc tính shareInstance được dùng để tạo 3 biến kiểu MySingleton. Thuộc tính number đã được khởi tạo với giá trị 2 dùng thực thể số 2 là singleB. Khi giá trị của thuộc tính của thực thể singleA, SingleB, singleC được in ra, chúng ta thấy 3 giá trị này là 2. sau đó giá trị number được thay đổi bằng giá trị 3 , việc thay đổi này bằng biến singleC. Bây giờ khi giá trị number được in ra của 3 thực thể đều là 3. Trong ví dụ này cả 3 thực thể của kiểu MySingleton để chỉ đến cùng một thực thể bởi vì khi giá trị của thuộc tính trong bất cứ thực thể nào thay đổi, giá trị của tất cả các thực thể khác đều thay đổi.

Trong ví dụ này mẫu singleton được thực thi bằng kiểu tham chiếu bởi vì chúng ta muốn đảm bảo chỉ có một thực thể của kiểu này tồn tại trong suốt thời gian sống của ứng dụng. Nếu mẫu này được thực thi với kiểu tham trị như struct, chúng ta sẽ thực thi với rủi ro khi có nhiều thực thể của kiểu này. Nếu chúng nhớ lại, mỗi lần một thực thể của một kiểu tham trị được truyền đi, code thật sự truyền một bản sao của thực thể. Điều này có nghĩa nếu một mẫu singleton được thực thi với kiểu tham trị sau đó mỗi lần một thực thể của kiểu này được truyền tới phần khác của code, code sẽ nhận một bản sao của thực thể, do đó sẽ phá vỡ mẫu này.

Mẫu singleton này có rất nhiều lợi ích khi trạng thái của một đối tượng cần được duy trình suốt thời gian sống của ứng dụng. Tuy nhiên chúng ta nên cẩn thận không nên quá lạm dụng nó. Mẫu singleton này không nên được dùng nếu không có một yêu cầu đặc biệt cho một và chỉ một thực thể của class xuyên suốt thời gian sống của ứng dụng. Nếu mẫu singleton được dùng đơn giản bởi vì tiện dụng, sau đó nó có thể dẫn đến lạm dụng.

Hãy nhớ rằng khi Apple khuyến cáo chúng ta nên ưu tiên dùng kiểu tham trị hơn là kiểu tham chiếu, có nhiều ví dụ như mẫu singleton nơi một kiểu tham chiếu được cần. Khi chúng ta tiếp tục nói với chính mình ưu tiên dùng kiểu tham trị hơn kiểu tham chiếu nó có thể rất dễ dàng quên rằng có nhiều khi kiểu tham chiếu vẫn cần được sử dụng. Đừng quên dùng kiểu tham chiếu trong mẫu này.

**The builder design pattern (Mẫu thiết kế nhà thầu)**
Mẫu này giúp việc tạo những đối tượng phức tạp và thực thi luồn xử lý thể nào những đối tượng này được tạo. Mẫu này thường được dùng để tách rời phần logic của việc khởi tạo ra khởi kiểu dữ liệu phức tạp và đặt nó ở những kiểu khác. Việc này sẽ giống với quá trình xây dựng để tạo ra những thể hiện khác nhau của kiểu dữ liệu.

**Hiểu vấn đề**
Vấn đề mà mẫu này được thiết kế để giải quyết khi một thực thể của một kiểu dữ liệu đòi hỏi số lượng lớn các giá trị để thiết lập. Những lựa chọn thiết lập có thể được thiết lập khi một thực thể của kiểu được tạo ra, nhưng có thể gây ra vấn đề nếu những lựa chọn này không phải là tập hợp đúng hoặc tập hợp những lựa chọn thích hợp không được rõ ràng. Một vấn đề khác đó là một lượng lớn code có thể cần để thiết lập tất cả các lựa chọn mỗi lần thực thể được tạo ra.

**Hiểu giải pháp**
Mẫu xây dựng này giải quyết vấn đề bằng cách đưa ra một thứ trung gian được biết đến như là một kiểu nhà thầu. Nhà thầu này chứa hầu hết, nếu không phải tất cả thông tin cần thiết để tạo một thực thể từ kiểu gốc phức tạp.

Có hai phương thức có thể được dùng để thực thi mẫu nhà thầu. Cách đầu tiên là có nhiều kiểu builder nơi mỗi kiểu builder chứa đựng thông tin để thiết lập kiểu gốc phức tạp trong một cách đặt biệt. Phương thức thứ 2 thực thi mẫu nhà thầu với một kiểu builder duy nhất để thiết lập tất cả lựa chọn điều chỉnh tới một giá trị mặc định cái có thể thay đổi sau này nếu cần

trong phần này chúng ta sẽ nhìn cả 2 cách để dùng mẫu nhà thầu này bởi ví nó quan trọng để hiểu cách thực hiện của mỗi cái
```
struct BurgerOld {
    var name: String
    var patties: Int
    var bacon: Bool
    var cheese: Bool
    var pickles: Bool
    var ketchup: Bool
    var mustard: Bool
    var lettuce: Bool
    var tomato: Bool
    init(name: String, patties: Int, bacon: Bool, cheese: Bool,
         pickles: Bool , ketchup: Bool, mustard: Bool, lettuce: Bool, tomato: Bool) {
        self.name = name
        self.patties = patties
        self.bacon = bacon
        self.cheese = cheese
        self.pickles = pickles
        self.ketchup = ketchup
        self.mustard = mustard
        self.lettuce = lettuce
        self.tomato = tomato
    }
}
```

Trong struct BurgerOld có một số thuộc tính đã định nghĩa với những gia vị trên món burger và tên của burger. Những thuộc tính này có thể được biết khi một thực thể của BurgerOld được tạo do đó hàm khởi tạo đòi hỏi chúng ta phải định nghĩa mỗi thành phần. Điều này có thể dẫn tới một số phức tạp trong phần khởi tạo xuyên suốt ứng dụng nó không đề cập rằng nếu có nhiều hơn một kiểu burger chuẩn (bacon cheeseburger ,cheeseburger ,hamburger, and so on ) sau đó chúng ta sẽ cần đảm bảo rằng mỗi cái được định nghĩa đúng. Cùng xem cách để tạo những thực thể BurgerOld
```
// Create Hamburger
   var burgerOld = BurgerOld(name: "Hamburger", patties: 1, bacon: false,
                             cheese: false, pickles: false, ketchup: false,
                             mustard: false, lettuce: false, tomato: false)
   // Create Cheeseburger
   var cheeseburgerOld = BurgerOld(name: "Cheeseburger", patties: 1,
                                   bacon: false, cheese: false,
                                   pickles: false, ketchup: false,
                                   mustard: false, lettuce: false,
                                   tomato: false)
 ```
Việc tạo những thực thể của kiểu BurgerOld trong trường hợp này cần quá nhiều code. Bây giờ cùng xem cách chúng ta có thể cải tiến việc tạo của những kiểu này bằng cách dùng mẫu nhà thầu. Ví dụ này sẽ dùng nhiều kiểu nhà thầu mỗi kiểu nhà thầu sẽ định nghĩa những thành phần là một kiểu đặt trưng của mỗi loại burger. Cùng bắt đầu tạo một BurgerBuilder protocol. Nó sẽ như thế này
```
protocol BurgerBuilder {
    var name: String {get}
    var patties: Int {get}
    var bacon: Bool {get}
    var cheese: Bool {get}
    var pickles: Bool {get}
    var ketchup: Bool {get}
    var mustard: Bool {get}
    var lettuce: Bool {get}
    var tomato: Bool {get}
}
```
protocol này đơn giản định nghĩa 9 thuộc tính sẽ được yêu cầu cho bất cứ kiểu nào thực thi protocol này. Bây giờ cùng tạo 2 cấu trúc để thực thi protocol này, tên là HambergerBuilder và CheeseBurgerBuilder:
```
struct HamburgerBuilder: BurgerBuilder {
    var name: String = "Burger"
    
    var patties: Int = 1
    
    var bacon: Bool = false
    
    var cheese: Bool = false
    
    var pickles: Bool = true
    
    var ketchup: Bool = true
    
    var mustard: Bool = true
    
    var lettuce: Bool = false
    
    var tomato: Bool = false
    
}

struct CheeseBurgerBuilder: BurgerBuilder {
    var name: String = "CheeseBurger"
    
    var patties: Int = 1
    
    var bacon: Bool = false
    
    var cheese: Bool = true
    
    var pickles: Bool = true
    
    var ketchup: Bool = true
    
    var mustard: Bool = true
    
    var lettuce: Bool = false
    
    var tomato: Bool = false
    
}
```
struct HamburgerBuilder và cheeseBurgerBuilder định nghĩa khác đơn giản những giá trị cho mỗi thuộc tính. Trong những kiểu phức tạp hơn chúng ta có thể phải định nghĩa thêm tài nguyên.
Bây giờ cùng xem struct Burger cái sẽ dùng những thực thể của BurgerBuilder protocol để tạo những thực thể cho chính nó. Theo code sau đây
```
struct Burger {
    var name: String
    var patties: Int
    var bacon: Bool
    var cheese: Bool
    var pickles: Bool
    var ketchup: Bool
    var mustard: Bool
    var lettuce: Bool
    var tomato: Bool
    
    init(builder: BurgerBuilder) {
        self.name = builder.name
        self.patties = builder.patties
        self.bacon = builder.bacon
        self.cheese = builder.cheese
        self.pickles = builder.pickles
        self.ketchup = builder.ketchup
        self.mustard = builder.mustard
        self.lettuce = builder.lettuce
        self.tomato = builder.tomato
    }
    
    func showBurger() {
        print("Name:\(name)")
        print("Patties: \(patties)")
        print("Bacon:\(bacon)")
        print("Cheese:\(cheese)")
        print("Pickles: \(pickles)")
        print("Ketchup: \(ketchup)")
        print("Mustard: \(mustard)")
        print("Lettuce: \(lettuce)")
        print("Tomato:\(tomato)")
    }
}
```

Trong struct bên trên BurgerOld, hàm khởi tạo nhận 9 tham số đầu vào, mỗi cái chứa hằng số được định nghĩa trong struct. Trong một struct Burger mới, hàm khởi tạo nhận một biến số, cái định nghĩa một thực thể của một kiểu thoã mãn protocol BurgerBuilder. Hàm khởi tạo mới này cho phép chúng ta tạo những thực thể của lớp Burger
```
var myBurger = Burger(builder: HamburgerBuilder())
myBurger.showBurger()

var myCheeseBurgerBuilder = CheeseBurgerBuilder()
var myCheeseBurger = Burger(builder: myCheeseBurgerBuilder)

myCheeseBurger.tomato = false
myCheeseBurger.showBurger()
```
Nếu chúng ta so sánh cách những thực thể của struct Burger mới được tạo với struct BurgerOld, nó thật rõ ràng và dễ dàng hơn để tạo một thực thể của kiểu Burger. Chúng ta cũng biết rằng chúng ta thiết lập chính xác những giá trị thuộc tính cho mỗi kiểu burger bởi vì những gía trị này được thiết lập trực tiếp trong lớp builder.

Có một cách thứ 2 có thể được dùng để thực thi mẫu thầu khoán. Hơn là việc có nhiều loại kiểu builder. có thể có một kiểu builder duy nhất được thiết lập tất cả những giá trị mặc định . Những giá trị này có thể được thay đổi theo nhu cầu. Tôi dùng kiểu này rất nhiều khi tôi có dự định nâng cấp code cũ bởi vì nó sẽ dễ dàng để tương tác với những code đã tồn tại trước đó.
Từ việc thực thi này một struct duy nhất được tạo là Burger Builder được tạo. Struct này là BurgerBuilder nó sẽ được dùng để tạo những thực thể của BurgerOld struct và sẽ thiết lập giá trị mặt định tất cả các thành phần tới giá trị mặc định của chúng. Cũng có một số phương thức trong struct BurgerBuilder có thể dùng để thay đổi giá trị mặc định trước khi tạo một thực thể của struct BurgerOld. 
```
struct BurgerBuilder {
    var name = "Burger"
    var patties = 1
    var bacon = false
    var cheese = false
    var pickles = true
    var ketchup = true
    var mustard = true
    var lettuce = false
    var tomato = false
    mutating func setPatties(choice: Int) {self.patties == choice}
    mutating func setBacon(choice: Bool) {self.bacon == choice}
    mutating func setCheese(choice: Bool) {self.cheese == choice}
    mutating func setPickles(choice: Bool) {self.pickles == choice}
    mutating func setKetchup(choice: Bool) {self.ketchup == choice}
    mutating func setMustard(choice: Bool) {self.mustard == choice}
    mutating func setLettuce(choice: Bool) {self.lettuce == choice}
    mutating func setTomato(choice: Bool) {self.tomato == choice}
    
    func buildBurgerOld(name: String) -> BurgerOld {
        return BurgerOld(name: name, patties: self.patties, bacon: self.bacon, cheese: self.cheese, pickles: self.pickles, ketchup: self.ketchup, mustard: self.mustard, lettuce: self.lettuce, tomato: self.tomato)
    }
}
```
Trong struct BurgerBuilder, 9 thuộc tính được định nghĩa cho burger. Cũng có một số phương thức cập nhật cho mỗi thuộc tính ngoại trừ thuộc tính tên gọi. Chúng ta cũng tạo một phương thức tên là buildBurgerOld() cái sẽ tạo một thực thể kiểu struct BurgerOld dựa vào những thuộc tính của thực thể BurgerBuilder. struct BurgerBuilder có thể được dùng như sau:
```
var burgerBuilder = BurgerBuilder()
burgerBuilder.setCheese(choice: true)
burgerBuilder.setBacon(choice: true)
var jonBurger = burgerBuilder.buildBurgerOld(name: "Jon's Burger")
```
Trong ví dụ này, một thực thể của BurgerBuilder được tạo ra. phương thức setCheese() và setBacon() được dùng để thêm phô mát và thịt ba rọi cho burger. Cuối cùng, Phương thức buildBurgerOld() được gọi để tạo thực thể của Burger struct.

Cả 2 phương pháp được dùng để thực thi mẫu nhà thầu rất đơn giản cho việc tạo những kiểu phức tạp. Cả 2 phương pháp cũng đảm bảo rằng những thực thể được thiết lập chính xác với giá trị mặc định. Nếu bạn nhận thấy rằng việc tạo những thực thể với hàm khởi tạo phức tạp và dài dòng, tôi khuyến cáo bạn nên xem lại mẫu thầu khoán này để có thể dùng nó đơn giản hoá việc khởi tạo của mình.

Bây giờ cùng xem qua mẫu Factory

**The Factory method pattern**
Mẫu Phương pháp nhà máy dùng những phương thức để tạo những thực thể của đối tượng mà không cần chỉnh chính xác loại dữ liệu sẽ được tạo. Việc này cho phép code chọn kiểu phù hợp với lúc máy đang chạy.
Tôi thấy rằng mẫu nhà máy là một trong những mẫu tôi dùng nhiều. Nó cũng là một trong những mẫu mà những lập trình viên có xu hướng nhận ra nhưng khi chúng ta lần đầu tiên đọc về những mẫu thiết kế bởi vì họ đã dùng nó trong những dự án trước đây.

**Hiểu vấn đề:**
Vấn đề mà mẫu nhà máy được thiết kế để giải quyết đó là khi có nhiều loại dữ liệu thoã mãn với một protocol duy nhất và những kiểu phù hợp để khởi tạo sẽ được chọn lúc máy chạy.

**Hiểu giải pháp:**
Mẫu nhà máy đóng gói những logic được dùng để chọn kiểu khởi tạo trong một phương thức duy nhất. Phương thức này chỉ phơi bày protocol với nơi gọi nó và không tiết lộ phần chi tiết bên trong một kiểu được chọn.

**Thực thi mẫu nhà máy.**
Để chứng minh cách dùng mẫu nhà máy chúng ta sẽ dùng kiểu thẫm định văn bản ở chương ba. Trong ví dụ này một hàm sẽ được tạo để xác định loại thẫm định văn bản để dùng dựa vào những tham số được truyền vô mẫu nhà máy bằng code lúc nó được gọi. Như một người mới thì code sau đây sẽ chứng minh bằng protocol TextValidation.
```
protocol TextValidation {
    var regExFindMatchString: String {get}
    var validationMessage: String {get}
}

extension TextValidation {
    var regExMatchingString: String {
        get {
            return regExFindMatchString + "$"
        }
    }
    
    func validateString(str: String) -> Bool {
        if let _ = str.range(of: regExMatchingString, options: .regularExpression) {
            return true
        } else {
            return false
        }
    }
    
    func getMatchingString(str: String) -> String? {
        if let newMatch = str.range(of: regExFindMatchString, options: .regularExpression) {
            return String(str[newMatch])
        } else {
            return nil
        }
    }
}
```
 Trong protocol TextValidation, 2 thuộc tính được định nghĩa tên regExFindMatchString và validationMessage. Trong protocol extension, một thuộc tính tính toán được thực thi tên là regExMatchingString và 2 phương thức tên validateString() và getMatchingString() được thực thi.
Bây giờ 3 kiểu dữ liệu thoã mãn tới protocol TextValidation được tạo như code bên dưới.
```
class AlphaValidation: TextValidation {
    static let shareInstance = AlphaValidation()
    private init() {}
    let regExFindMatchString: String = "^[a-zA-Z]{0,10}"
    let validationMessage: String = "Can only contain Alpha characters"
}

class AlphaNumericValidation: TextValidation {
    static let sharedInstance = AlphaNumericValidation()
    private init(){}
    let regExFindMatchString = "^[a-zA-Z0-9]{0,10}"
    let validationMessage = "Can only contain Alpha Numeric characters"
}
class NumericValidation: TextValidation {
    static let sharedInstance = NumericValidation()
    private init(){}
    let regExFindMatchString = "^[0-9]{0,10}"
    let validationMessage = "Display Name can contain maximum of15 Alphanumeric Characters"
}
```
Lớp AlphaValidation có thể được dùng để xác nhận những chuỗi đảm bảo rằng chúng chứa một số lượng lớn nhất là 10 kí tự chữ cái. Lớp NumericValidation có thể được dùng để xác định những chuỗi để đảm bảo rằng chúng chứa tối đa 10 kí tự  số. Cuối cùng AlphaNumericValidation dùng để xác định chuỗi để đảm bảo chúng chứa tối đa 10 kí tự chữ và số.

Để dùng những lớp thẫm định này, cần có cách để xác định những lớp được dùng để xác định một giá trị chuỗi. Mẫu phương thức nhà máy có thể giúp việc xác định và có thể thực thi như sau:
```
func getValidator(alphaCharacters: Bool, numericCharacters: Bool) -> TextValidation? {
    if alphaCharacters && numericCharacters {
           return AlphaNumericValidation.sharedInstance
         } else if alphaCharacters && !numericCharacters {
           return AlphaValidation.sharedInstance
         } else if !alphaCharacters && numericCharacters {
           return NumericValidation.sharedInstance
         } else {
           return nil
    }
}
```
Phương thức getValidator chấp nhận 2 tham số kiểu Bool tên là alphaCharacters và numericCharaters. Những tham số này định nghĩa kiểu thẫm định cần thiết. Một kiểu optional mà giá trị thoã mãn tới protocol TextValidation được trả về dựa vào giá trị của tham số truyền vào.

Một trong những lợi ích lớn nhất của việc dùng mẫu này là tất cả logic của những kiểu thẫm định được chọn thì được đóng khối trong một hàm. Nó có nghĩa là nếu logic được dùng để thẫm định văn bản bị thay đổi thì chỉ cần sửa code ở 1 hàm duy nhất và chúng ta sẽ không cần refactor lại toàn bộ code. Như ví dụ này nếu chúng ta muốn thay thế lớp AlphaValidation với một lớp mới là AlphaSpacesValidation, code chỉ cần thay đổi bên trong hàm này.
Chúng ta sẽ dùng getValidator() như code sau đây:

Trong code này validator1 chứa đựng một thực thể của kiểu AlphaValidation. Khi gọi phương thức validateString() của thực thể này nó trả về false bởi vì  biết str chứa đựng giá trị số đếm. biến validator2 chứa đựng thực thể kiểu AlphaNumbericValidation. Khi gọi validateString() thì nó trả về true bởi vì lớp validation tìm kiếm cả chữ và số.

Một ý tưởng quan trọng bên dưới mẫu khởi tạo này là chúng ta đưa phần logic về cách và cái gì để tạo đối tượng ra bên ngoài code cơ bản và đặt nó vào một kiểu được chỉ định hoặc hàm. Sau đó khi chúng ta cần thay đổi code của chúng ta trong tương lại, logic được đóng khói trong một nơi duy nhất và có thể dễ dàng để thay đổi, hơn là có những logic nằm rời rạc nhiều nơi trong code.

Bây giờ cùng xem mẫu cấu trúc

**Structural design patterns**

Mẫu thiết kế cấu trúc diễn tả cách những kiểu dữ liệu có thể được tổng hợp để tạo cấu trúc lớn hơn. Những cấu trúc lớn hơn có thể dễ dàng để làm việc và che dấu đi những phần phức tạp của một số kiểu dữ liệu cá nhân. Những mẫu phổ biến trong mẫu cấu trúc này được phân loại liên quan việc kết nối giữa những đối tượng.

Có một số mẫu nỗi tiếng trong loại này như sau:
- Adapter: Đây là kiểu cho phép những kiểu dữ liệu không tương thích interface có thể làm việc với nhau
- Bridge: Mẫu này được dùng để phân tách phần tử trừ tượng của một kiểu khỏi phần thực thi của nó vì vậy cả hai có thể khác nhau.
- Composite: Mẫu này cho phép chúng ta xem một nhóm của những đối tượng  như một đối tượng đơn lẻ.
- Decorator: Mẫu này cho phép chúng ta thêm hoặc ghi đè hành vì một phương thức đang tồn tại của một đối tượng
- Facade: Mẫu này cung cấp một interface đơn giản cho một phần code nào đó lớn hơn và phức tạp hơn.
- Flyweight: Mẫu này cho phép chúng ta giảm những tài nguyên cần thiết để tạo và dùng một số lượng lớn những đối tượng giống nhau.
- Proxy: Mẫu này là một kiểu mà hành động của nó như một interface cho những lớp hoặc nhiều lớp khác

Trong Chương này, chúng ta sẽ đưa những ví dụ cách để dùng mẫu bridge, facede và proxy trong swift. Cùng bắt đầu với mẫu Bridge

**The Bridge pattern (Mẫu cầu nối)**
Mẫu này tách rời phần trừu tượng khỏi phần thực thi vì vậy 2 hai có thể độc lập với nhau. Mẫu Bridge cũng có thể được xem như là sự trừu tượng 2 lớp.

**Hiều vấn đề:**
Mẫu cầu nối này được thiết kế để giải quyết một số vấn đề nhưng một cái chúng ta sẽ tập trung ở đây có xu hướng phát triển theo thời gian như tính năng được yêu cầu mới đến từ những tính năng mới. Ở một số thời điểm, những yêu cầu mới và tính năng mới đến sẽ có nhiều sự thay đổi cách những tính năng này tương tác.Thông thường nếu không có mẫu này ,công việc thay đổi này đòi hỏi chúng ta phải refactor phần code cơ bản.

Trong lập trình hướng đối tượng, việc này được biết như mở rộng cấu trúc phân lớp, nhưng nó có thể cũng xảy ra với lập trình hướng protocol.

**Hiều cách giải pháp**
Mẫu cầu nối giải quyết vấn đề bằng cách sử dụng các đặc điểm về sự tương tác và sự phân chia chức năng cái mà mỗi đặc điểm cụ thể từ chức năng được chia sẽ giữa chúng. Một kiểu cầu nối có thể được tạo để đóng khối những chức năng được chia sẽ này, đem chúng đến với nhau

**Thực thi mẫu cầu nối.**
Để chứng minh cách dùng mẫu cầu nối chúng ta sẽ tạo 2 tính năng. Tính năng đầu tiên là tính năng tin nhắn sẽ lưu và chuẩn bị tin nhắn sẽ được gữi đi. Tính năng thứ 2 là tính năng gữi tin, nó sẽ gữi tin nhắn thông qua một kênh được chỉ định như email hoặc SMS

Cùng bắt đầu tạo 2 protocol Message và Sender. protocol Message sẽ định nghĩa những yêu cầu cho những kiểu mà chúng ta dùng để tạo tin nhắn. Protocol Sender sẽ được dùng để định nghĩa những yêu cầu được dùng để gữi tin nhắn thông qua những kênh cụ thể. Theo code sau đâu:
```
protocol Message {
    var messageString: String {get set}
    init(messageString: String)
    func prepareMessage()
}

protocol Sender {
    func sendMessage(message: Message)
}
```
Message protocol định nghĩa một thuộc tính lưu trữ messageString kiểu String. Thuộc tính này sẽ chứa đựng nội dung tin nhắn và không thể bị nil. Một phương thức khởi tạo và 1 Phương thức prepareMessage() cũng được định nghĩa. Hàm khởi tạo này được dùng để thiết lập giá trị cho messageString và những thứ khác được yêu cầu của kiểu tin nhắn. Phương thức prepareMessage() sẽ được dùng để chuẩn bị tin nhắn trước khi gữi nó đi. Đây là phương thức có thể dùng để mã hoá tin nhắn thêm định dạng, hoặc làm những thứ khác cho tin nhắn trước khi gữi nó đi.

Sender Protocol định nghĩa một phương thức tên là sendMessage(). Phương thức này sẽ gữi tin nhắn thông qua kênh được định nghĩa bỡi những kiểu phù hợp. Trong hàm này chúng ta sẽ cần đảm bảo rằng phương thức prepareMessage từ tin nhắn được gọi trước khi gữi tin nhắn đi.

Bây giờ xem cách để định nghĩa 2 kiểu dữ liệu thoã mãn Message protocol.
```
class PlainTextMessage: Message{
    var messageString: String
    required init(messageString: String) {
        self.messageString = messageString
    }
    
    func prepareMessage() {
        //
    }
}

class DESEncryptedMessage: Message {
    var messageString: String
    
    required init(messageString: String) {
        self.messageString = messageString
    }
    
    func prepareMessage() {
        self.messageString = "DES: " + self.messageString
    }
    
}
 ```

Mỗi kiểu dữ liệu chứa những tính năng được yêu cầu để thoã mãn Message Protocol. Chỉ có sự khác biệt thật sự ở phương thức prepareMessage(). Trong lớp PlainTextMessage , phương thức prepapreMessage() rỗng bởi vì không có gì để thực hiện trước khi gữi tin nhắn đi. Phương thức prepareMessage() của lớp DESEncryptionMessage chứa đựng logic mã hoá tin nhắn, nhưng trong ví dụ này nó chỉ thêm thẻ DES ở phía trước của tin nhắn, điều này cho phép chúng ta biết phương thức này đã được gọi.

Bây giờ tạo 2 kiểu thoã mãn với protocol Sender, Những kiểu này xử lý việc gữi tin nhắn thông qua kênh được chỉ định, tuy nhiên trong ví dụ này chúng ta sẽ đơn giản làm in ra tin nhắn
```
class EmailSender: Sender {
    func sendMessage(message: Message) {
        print("Sending through E-Mail:")
               print(" \(message.messageString)")
    }
}

class SMSSender: Sender {
    func sendMessage(message: Message) {
           print("Sending through SMS:")
           print(" \(message.messageString)")
         }
}
```
Cả EmailSender, SMSSender thoã mãn protocol Sender bằng cách thực thi tính năng sendMessage()
Có 2 thuộc tính có thể được dùng:
```
var myMessage = PlainTextMessage(messageString: "Plain text message")
myMessage.prepareMessage()
var sender = SMSSender()
sender.sendMessage(message: myMessage)
```

Công việc này thật tuyệt và code tương tự có thể được thêm bất cứ nơi đâu nó cần để tạo và gữi tin nhắn. Bây giờ một ngày đẹp trời nào đó một yêu cầu mới là thêm tính năng để xác thực tin nhắn trước khi gữi nó để đảm bảo nó phù hợp với những yêu cầu của kênh mà nó được chuyển đi. Để làm việc này chúng ta sẽ bắt đầu bằng việc thay đổi Sender protocol để thêm tính năng xác thực như sau:
```
protocol Sender {
    var message: Message? {get set}
    func sendMessage(message: Message)
    func verifyMessage()
}
```
Một phương thức tên verifyMessage() và một thuộc tính tên message được thêm vào Sender protocol. Việc định nghĩa phương thức sendMessage() cũng phải thay đổi. Protocol Sender gốc được thiết kế chỉ đơn giản để gữi tin nhắn. Protocol mới được thiết kế để xác thực tin nhắn trước khi gọi hàm sendMessage() do đó chúng ta không thể chỉ đơn giản truyền tin nhắn tới sender như chúng ta đã làm ở phần định nghĩa trước.

Những kiểu thoã protocol Sender bây giờ cần thay đổi để thoã mãn tới protocol mới.
```
class EmailSender: Sender {
    var message: Message?
    
    func verifyMessage() {
        print("Verifying E-Mail message")
    }
    
    func sendMessage() {
        print("Sending through E-Mail:")
               print(" \(message!.messageString)")
    }
}

class SMSSender: Sender {
    var message: Message?
    
    func verifyMessage() {
        print("Verifying SMS message")
    }
    
    func sendMessage() {
           print("Sending through SMS:")
           print(" \(message!.messageString)")
         }
}
```
Code dùng những kiểu này cũng cần phải đổi khi mà kiểu dữ liệu đã đổi. Theo ví dụ được trình bày cách để dùng những kiểu này:
```
var myMessage = PlainTextMessage(messageString: "Plain text message")
myMessage.prepareMessage()
var sender = SMSSender()
sender.message = myMessage
sender.verifyMessage()
sender.sendMessage()
```
Những sự thay đổi này không khó để làm tuy nhiên nếu không có mẫu cầu nối, chúng ta sẽ cần phải refactor toàn bộ code base và thực thiện việc thay đổi ở bất cứ nơi đâu mà tin nhắn được gữi đi. Mẫu cầu nối cho chúng ta biết rằng khi chúng ta có hai phân lớp có sự tương tác gần nhau như ví dụ này. Chúng ta nên đặt logic cho những tương tác này vào trong một kiểu cầu nối và đóng khối những logic này vào một nơi. Với cách này khi chúng ta nhận thêm những yêu cầu mới hoặc cải tiến, những sự thay đổi có thể nằm ở một nơi, do đó giới hạn lại những phần code cần tái cấu trúc. Chúng ta có thể tạo một kiểu cầu nối cho message và sender của chúng ta, được trình bày như sau:
```
struct MessagingBridge {
    static func sendMessage(message:Message, sender: Sender) {
        var sender = sender
        message.prepareMessage()
        sender.message = message
        sender.verifyMessage()
        sender.sendMessage()
    }
}
```
Bây giờ logic cách tương tác giữa việc gữi tin nhắn và sender được đóng gói trong struct MessagingBridge, do đó khi logic cần thay đổi, việc thay đổi có thể  chỉ là sự thay đổi của 1 kiểu duy nhất hơn là tái cấu trúc toàn bộ code

Mẫu bắt cầu là mẫu rất tốt cần phải nhớ và dùng. Có những lần tôi đã hối hận vì không dùng mẫu bắt cầu này trong code của mình bởi vì  như chúng ta đã biết những yêu cầu cứ thay đổi thường xuyên và việc thay đổi trong 1 nơi sẽ tốt hơn là thông qua toàn bộ code base có thể tiết kiệm thời gian của chúng ta trong tương lai.

**The Facade pattern**

Mẫu facade cung cấp một interface đơn giản tới một phần code lớn hơn và phức tạp hơn. Việc này cho phép chúng ta làm những thư viện đơn giản hơn để dùng và dễ hiểu bằng cách ẩn đi một số sự phức tạp. Nó cũng cho phép chúng ta kết hợp nhiều API vào một API duy nhất và đơn giản hơn. Cái chúng ta sẽ thấy trong ví dụ sau đây:

**Hiều vấn đề: **

Mẫu facade thường được dùng khi có một hệ thống phức tạp có một lượng lớn những api độc lập những api này được thiết kế để làm việc chung với nhau. Đôi khi nó rất khó để nói rằng nơi nào mẫu facade này được dùng  trong quá trình bắt đầu thiết kế ứng dụng. Nguyên nhân cho việc này là chúng ta thường cố gắng để đơn giản hoá phần thiết kế API ban đầu, Tuy nhiên qua thời gian và những yêu cầu bị thay đổi và những tính năng mới được thêm vào, API trở bên rất rất phức tạp. Ở thời điểm này nó trở  nên rất hiển nhiên nơi mà mẫu facade nên được dùng. Một quy luật tốt để dùng mẫu này là nếu bạn có một số API đang làm việc cùng nhau để thực thi một nhiệm vụ, mẫu facade nên được xem xét.

**Hiểu cách giải quyết.**
Ý tưởng chính của mẫu facade là ẩn đi những sự phức tạp của API phía sau một interface đơn giản. Việc này đưa ra một số lợi thế, cái hiển nhiên nhất là đơn giản hoá cách mà code bên ngoài tương tác với API. Nó cũng thúc đẩy việc giảm sự liên kết, cho phép những api thay đổi mà không cần tái cấu trúc lại những code đã dùng trước đó.

**Thực thi mẫu fadace**
Để chứng minh mẫu facade chúng ta sẽ tạo 3 API: HoteBooking, FlightBooking, RentalCarBooking. Những API này sẽ dùng để tìm kiếm và đặt khách sạn, chuyến bay và thuê xe hơi cho các buổi đi chơi. Trong khi đó sẽ rất dễ để gọi từng API một cách đơn lẻ, chúng ta sẽ tạo một TravelFacade struct sẽ hợp nhất tính năng của 3 loại API vào trong 1 lần gọi di nhất.
Cùng bắt đầu định nghĩa 3 API.
```
struct Hotel {
    //Information about hotel room
}

struct HotelBooking {
    static func getHotelNameForDates(to: Date, from: Date) -> [Hotel]? {
        let hotels = [Hotel]()
        return hotels
    }
    
    static func bookHotel(hotel: Hotel) {
        //logic to reserve hotel room
    }
}
```
Hotel API chứa đựng struct Hotel và HotelBooking. struct Hotel sẽ lưu trữ thông tin vào phòng khách sạn, HotelBooking sẽ dùng để tìm và đặt phòng. Tiếp theo là chuyến bay và thuê xe cũng tương tự như api khách sạn
```
struct Flight {
    //Information Flight
}

struct FlightBooking {
    static func getFlightNameForDates(to: Date, from: Date) -> [Flight]? {
        let flights = [Flight]()
        return flights
    }
    
    static func bookFlight(flight: Flight) {
        //logic reserve flight
    }
}

struct RentalCar {
    //Information about rental cars
}
struct RentalCarBooking {
    static func getRentalCarNameForDates(to: Date, from: Date) -> [RentalCar]? {
        
        let cars = [RentalCar]()
        //logic to get flights
        return cars
    }
    static func bookRentalCar(rentalCar: RentalCar) {
        // logic to reserve rental car
    }
}
```
Mỗi API có một struct dùng để lưu trữ thông tin và một struct để tìm và đặt dịch vụ. Trong thiết kế ban đầu nó sẽ rất dễ để gọi từng API trong ứng dụng của chúng ta, Tuy nhiên như chúng ta đã biết những yêu cầu có thể thay đổi dẫn đến API thay đổi qua thời gian. Bằng cách dùng mẫu facade chúng ta ẩn đi phần thực thi của những API này do đó nếu chúng ta cần thay đổi cách chúng làm việc  trong tương lai, chỉ code trong kiểu facade cần thay đổi hơn là phải tái cấu trúc lại toàn bộ code. Việc này làm cho code dễ dàng được bảo trì và cập nhật trong tương lai. Bây giờ cùng xem cách chúng ta sẽ thực thi mẫu facade bằng cách tạo struct TravelFacade
```
struct TravelFacade {
    var hotels: [Hotel]?
    var flights: [Flight]?
    var cars: [RentalCar]?
    
    init(to: Date, from: Date){
        hotels = HotelBooking.getHotelNameForDates(to: to, from: from)
        flights = FlightBooking.getFlightNameForDates(to: to, from: from)
        cars = RentalCarBooking.getRentalCarNameForDates(to: to, from: from)
    }
    
    func bookTrip(hotel: Hotel, flight: Flight, rentalCar: RentalCar) {
        HotelBooking.bookHotel(hotel: hotel)
        FlightBooking.bookFlight(flight: flight)
        RentalCarBooking.bookRentalCar(rentalCar: rentalCar)
    }
}
```
struct TravelFacade chứa chức năng tìm kiếm từ 3 API và cũng có thể đặt một khách sạn, chuyến bay, thuê xe. Kiểu này có thể được dùng để tìm kiếm những khách sạn, chuyến bay và thuê xe mà không phải trực tiếp truy cập tới từng api riêng lẻ. struct này có thể cũng được dùng để đặt khách sạn chuyến bay và thuê xe mà không phải truy xuất tới từng API.

Ở phần đầu chương này chúng ta đề cập rằng nó không phải luôn luôn rõ ràng nơi mà mẫu facade nên được dùng trong lúc bắt đầu thiết kế. Một luật tốt để theo đó là nếu chúng ta có một số API làm việc cùng với nhau để thực hiện một chức năng, facade là mẫu nên được xem xét.

**Bây giờ cùng xem mẫu proxy**
Với mẫu proxy, một kiểu sẽ hành động như một giao diện cho một kiểu khác hoặc API. Đây là kiểu bao bọc. Được gọi là proxy, có thể thêm tính năng tới đối tượng , ẩn đi phần thực thi của một API hoặc ngăn chặn truy xuất tới đối tượng.

**Hiểu vấn đề:**
Mẫu proxy có thể được dùng để giải quyết nhiều vấn đề nhưng tôi thấy rằng tôi thường dùng mẫu này để giải quyết một trong hai vấn đề.

Vấn đề thứ nhất tôi dùng mẫu này khi tôi muốn tạo một lớp trừu tượng giữa một API duy nhất và code  của tôi. API này có thể là cục bộ hoặc api bên ngoài. Nhưng tôi thường dùng mẫu này để đặt một lớp trừu tượng giữa code của mình và dịch vụ ở ngoài. Việc này cho phép sự thay đổi từ API bên ngoài không cần phải tái cấu trúc phần lớn code base.

Vấn đề thứ 2 là tôi dùng proxy để giải quyết khi tôi cần tạo những sự thay đổi tới một API, Nhưng tôi không có code đó hoặc có sự phụ thuộc vào API ở nơi khác trong ứng dụng.

**Hiểu giải pháp**
Để giải quyết những vấn đề này, mẫu proxy nói với chúng ta rằng chúng ta nên tạo một kiểu mà nó sẽ hành động như một giao diện cho sự tương tác với API khác. Trong ví dụ ở đây, chúng ta sẽ trình bày cách để dùng mẫu proxy để thêm một lớp trừu tượng giữa code của chúng ta và một API bên ngoài.

**Thực thi mẫu Proxy**
Trong phần này, chúng ta sẽ thấy cách chúng ta có thể dùng mẫu proxy để đặt một tầng trừu tượng giữa code và API. Việc này sẽ cho phép chúng ta ẩn đi phần thực thi chi tiết của API bên trong kiểu proxy. Ví dụ chúng ta sẽ tạo một kiểu Proxy sẽ nhận thông tin từ Apple iTunes API.

Chú ý: Để ví dụ này hoạt động, chúng ta sẽ cần thực thi việc kết nối code bên trong kiểu proxy để tương tác với API apple itunes. Trong khi chúng tôi trình bày code, chúng tôi sẽ không giới thiệu cách nó làm việc. Thay vào đó chúng tôi sẽ tập trung vào cách mẫu proxy được thực hiện.

Để thực thi mẫu này, chúng ta cần bắt đầu bằng việc tạo một kiểu sẽ hành động như proxy cho API Itunes. Bời vì phần mạng lưới của code sẽ là bất đồng bộ, chúng ta sẽ dùng closure để trả về kết quả khi itunes API trả về quả tới kiểu proxy.  typealias cho closure được định nghĩa như sau:
```
public typealias DataFromURLCompletionClourse = (Data?) -> Void
```
Tiếp theo tạo kiểu proxy ItunesProxy 
```
public struct ITunesProxy {
    public func sendGetRequest(searchTerm: String, _ handler: @escaping DataFromURLCompletionClourse) {
        let sessionConfiguration = URLSessionConfiguration.default
        var url = URLComponents()
        url.scheme = "https"
        url.host = "itunes.apple.com"
        url.path = "/search"
        
        url.queryItems = [
            URLQueryItem(name: "term", value: searchTerm)
        ]
        
        if let queryUrl = url.url {
            var request = URLRequest(url: queryUrl)
            request.httpMethod = "GET"
            let urlSession = URLSession(configuration: sessionConfiguration, delegate: nil, delegateQueue: nil)
            
            let sessionTask = urlSession.dataTask(with: request) { (data, response, error) in
                handler(data)
            }
            
            sessionTask.resume()
        }
    }
}
```
Một kiểu proxy được hoàn thành , nó có thể được dùng bất cứ đâu trong code để truy xuất tới API như sau:
```
let proxy = ITunesProxy()
proxy.sendGetRequest(searchTerm: "jimy+buffett", {
    if let data = $0, let sString = String(data: data, encoding: String.Encoding(rawValue: String.Encoding.utf8.rawValue)) {
        print(sString)
    } else {
        print("Data is nil")
    }
})
```
Mẫu này cung cấp cho chúng ta một tầng trừu tượng giữa code trong ứng dụng và code cần thiết để tương tác với API Itunes. Lợi ích lớn nhất của mẫu này là chúng ta nhận được với mẫu proxy này là việc thực thi code để tương tác với itunes được cô lập vào trong 1 kiểu dữ liệu. Có nghĩa là nếu Apple đổi URL từ “https:/ / www. apple. com/ itunes/ ” thành “http://itunesapi.apple.com/ ” hoặc thành bất cứ thứ gì. chúng ta chỉ cần thay đổi ở một nơi duy nhất.

Những lập trình viên có kinh nghiệm sẽ nhận ra rằng mẫu này hình như họ đã dùng trong quá khứ. Nó rất thông dụng để tạo một tầng trừu tượng giữa code của chúng ta và API bên ngoài.

Bây giờ cùng xem những **mẫu Behavioral**. (mẫu hành vi)

Mẫu hành vi giải thích cách những kiểu dữ liệu tương tác với những kiểu khác. Những mẫu này diễn tả cách những thực thể của những kiểu gữi tin nhắn tới những thực thể khác để thực hiện việc gì đó

Có 9 mẫu nổi tiếng của loại này
- Chain of responsibility: Mẫu này dùng để xử lý nhiều yêu cầu, mỗi cái có thể được uỷ quyền tới những phần xử lý khác nhau.
- Command. Mẫu này tạo những đối tượng có thể đóng gói những hành động hoặc những tham số vì vậy chúng có thể gọi sau này hoặc bởi những thành phần khác.
- Iterator: Mẫu này cho phép chúng ta truy xuất tới những phần tử của một đối tượng hàng đợi mà không phải tiết lộ cấu trúc cơ bản.
- Mediator: Mẫu này dùng để giảm sự liên kết giữa những kiểu dữ liệu.
- Memento: Mẫu này có thể lưu lại trạng thái hiện tại của một đối tượng và lưu trữ nó trong một nơi mà có thể được lưu trữ sau này
- Observer: Mẫu này cho phép một đối tượng công bố việc thay đổi trạng thái của nó, Những đối tượng khác có thể lắng nghe vì vậy chúng có thể biết được bất cứ sự thay đổi nào.
- State: Mẫu này dùng để thông báo hành vi của một đối tượng khi trạng thái bên trong nó thay đổi.
- Strategy: Mẫu này cho phép một chọn một giải thuật lúc máy đang chạy.
- Visitor: Mẫu này là một cách để phân chia một thuật toán ra khơi cấu trúc một đối tượng.

Trong phần này chúng ta sẽ xem những ví dụ cách để dùng mẫu  strategy, observer và command trong swift. Cùng xem mầu command trước nhé.

**The command design pattern **

Mẫu command cho phép chúng ta định nghĩa những hành động có thể được thực hiện sau đó. Mẫu này thường đóng khối tất cả thông tin cần thiết để gọi hoặc kích hoạt những hành động đó sau này.

**Hiểu vấn đề.**
Có nhiều lần khi cần phải phân tách phần thực thi của một câu lệnh ra khỏi nơi gọi nó. Thông thường việc này xảy ra khi có một kiểu dữ liệu cần thực thi một vài hành động, tuy nhiên, chọn hành động để dùng cần được thực hiện lúc máy chạy.

**Hiểu giải pháp**
Mẫu command nói rằng chúng ta nên đóng gói logic của nhiều hành động vào trong 1 kiểu riêng biệt cà thoã mãn protocol command. Chúng ta có thể cung cấp thực thể kiểu command đó để dùng bởi những chổ cần gọi nó. Chổ gọi sẽ dùng phần giao diện được cung cấp bởi protocol để  gọi những hành động nào cần thiết.

**Thực thi mẫn command**
Trong phần này chúng ta sẽ chứng minh cách dùng mẫu command bằng cách thực thi logic cho môt phép tính đơn giản. Để làm việc đó chúng ta sẽ bắt đầu với một protocol mà những kiểu nào thực thi chức năng toán học của phép tính sẽ phải thoã mãn. Protocol đó được đặt tên là MathCommand
```
protocol MathCommand {
    func execute(num1: Double, num2: Double) -> Double
}
```
Protocol MathCommand yêu cầu một chức năng phải được thực thi bởi bất cứ kiểu dữ liệu nào muốn thoã mãn protocol này. Hàm này có tên là execute() và nhận 2 tham số kiểu Double và trả về kiểu Double. Những kiểu thoã mãn protocol này sẽ thực thiện 1 số phép toán với 2 tham số truyền vô

Bây giờ chúng ta sẽ tạo 4 kiểu dữ liệu thoã mãn MathCommand protocol. Những kiểu này sẽ được đặt tên là AdditionCommand, SubtractionCommand, MultiplicationCommand và DivisionCommand
```
struct AdditionCommand: MathCommand {
    func execute(num1: Double, num2: Double) -> Double {
        return num1 + num2
    }
}

struct SubtractionCommand: MathCommand {
    func execute(num1: Double, num2: Double) -> Double {
        return num1 - num2
    }
}

struct MultiplicationCommand: MathCommand {
    func execute(num1: Double, num2: Double) -> Double {
        return num1 * num2
    }
}

struct DivisionCommand : MathCommand {
    func execute(num1: Double, num2: Double) -> Double {
        return num1 / num2
    }
}
```
Mỗi kiểu command thoã mãn MathCommand protocol bằng cách thực thi phương thức execute(). Trong phương thức này, chúng ta thực thi chức năng toán học tương ứng với tên của chúng.

Chúng ta cần tạo một nơi gọi chúng. Nơi gọi này sẽ biết được cách để thực thi bất cứ lệnh nào mà thoã mãn MathCommand protocol. Việc này sẽ có thể tính toán để thực hiện bất cứ tính năng nào có cùng kiểu dữ liệu thoã mãn MathCommand. Code sau đây trình bày nơi gọi đó
```
struct Calculator {
    func performCalculation(num1: Double, num2: Double, command: MathCommand) -> Double {
        return command.execute(num1: num1, num2: num2)
    }
}
```
Kiểu Calculator có một phương thức tên là performCalculation(). Phương thức này nhận 3 tham số, 2 tham số đầu kiều Double và một thực thể kiểu MathCommand. Trong phương thức này chúng ta trả về kết quả từ phương thức execute() của thực thể kiểu MathCommand khi truyền 2 giá trị double vào. Bây giờ cùng xem cách làm việc khi dùng calculator này để thực hiện phép toán (25-10)*5
```
var calc = Calculator()
var startValue = calc.performCalculation(num1: 25, num2: 10, command: SubtractionCommand())
var answer = calc.performCalculation(num1: startValue, num2: 5, command: MultiplicationCommand())
```

Chúng ta bắt đầu tạo thực thể kiểu Calculator(). Sau đó gọi phương thức performCalculation() để thực hiện phép trừ 25 -10 được kết quả 15. Chúng ta làm việc này bằng cách truyền 25 và 10 như là 2 tham số đầu cho phương thức performCalculation() và thực thể kiểu SubtractionCommand là tham số cuối.
Dòng tiếp theo chúng ta dùng kết quả từ phép tính đầu là 15 và nhân nó với 5 và kết quả đạt được là 75

Có một số lợi ích để dùng mẫu command này.Một trong những lợi ích chính đó là chúng ta có thể thiết lập những tập lệnh để được gọi lúc máy chạy. Cái này cũng cho phép chúng ta hoán đổi những câu lệnh với những phần thực thi khác nhau mà cũng thoã mãn command protocol trong toàn bộ thời gian sống của ứng dụng. Một lợi thế khác của mẫn command là chúng ta đóng gói phần chi tiết của phần thực thi mẫu command bên trong kiểu dữ liệu command hơn là để trong kiểu chứa đựng nó.

**Bây giờ cùng xem mẫu Strategy.**
Mẫu strategy cũng giống như mẫu command ở chổ cả 2 được thiết kế để phân tách phần thực thi chi tiết ra khỏi kiểu gọi. Cả 2 mẫu cũng cho phép phần thực thi có thể thay đổi lúc máy chạy. Sự khác nhau lớn nhất của 2 mẫu này là mẫu Strategy dự định đóng gói thuật toán, Khi một thuật toán bị đổi chổ, đối tượng này được mong chờ thực thi cùng chức năng, nhưng bằng một cách khác. Trong mẫu command khi command được thay đổi, nó được mong chờ là thay đổi hành vi của đối tượng.

**Hiểu Vấn đề**
Có nhiều lần trong ứng dụng chúng ta cần thay đổi thuật toán bên dưới để dùng thực thi một hành động. Thông thường khi chúng ta có một loại mà có nhiều thuật toán khác nhau có thể được dùng để thực thi công việc giống nhau. Tuy nhiên việc lựa chọn dự án sẽ được dùng ở lúc máy chạy.

**Hiểu giải pháp.**
Mẫu Strategy nói với chúng ta rằng chúng ta nên đóng gói thuật toán trong một kiểu thoã mãn protocol strategy. Chúng ta có thể cung cấp thực thể của kiểu strategy cho bên cần gọi. Bên gọi sẽ dùng giao diện được cung cấp bởi protocol để gọi thuật toán

**Thực thi mẫu strategy**
Trong phần này mẫu strategy sẽ được chứng minh bằng thuật toán nén dữ liệu có thể được thay đổi lúc máy chạy. Cùng bắt đầu ví dụ bằng cách tạo protocol CompressionStrategy
```
protocol CompressionStrategy {
    func compressFiles(filePaths: [String])
}
```
Protocol này định nghĩa một phương thức tên compressFiles() chấp nhận một tham số đầu vào là một mảng kiểu string chứa đựng đường dẫn file cần nén. Bây giờ cùng tạo 2 struct thoã mãn với CompressionStrategy tên ZipCompressionStrategy va RarCompressionStrategy
```
struct ZipCompressionStrategy: CompressionStrategy {
    func compressFiles(filePaths: [String]) {
        print("Using Zip Compression")
    }
}

struct RarCompressionStrategy: CompressionStrategy {
    func compressFiles(filePaths: [String]) {
        print("Using Zip Compression")
    }
}
```
Cả 2 struct này thực thi CompressionStrategy bằng cách thực thi phương thức compressFiles(). Trong phương thức này chúng ta đơn giản là in ra tên của thuật toán nén file được dùng. Bình thường chúng ta sẽ thực thi logic cho thuật toán trong phương thức đó.

Bây giờ cùng xem kiểu CompressContent, cái sẽ gọi để nén files
```
struct CompressContent {
    var strategy: CompressionStrategy
    func compressFiles(filePaths: [String]) {
        self.strategy.compressFiles(filePaths: filePaths)
    }
}
```
Kiểu này có một thuộc tính là strategy sẽ chứa đựng thực thể kiểu thoã mãn với protocol CompressStrategy. Nó cũng có một thuộc tính tên là compressFiles( chấp nhận một mảng kiểu string là đường dẫn files chúng ta muốn nén. Trong phương thức này chúng ta nén những files bằng cách gọi phương thức compressFiles của thực thể strategy.

Chúng ta sẽ dùng kiểu CompressContent như sau:
```
var filePaths = ["file1.txt", "file2.txt"]
var zip = ZipCompressionStrategy()
var rar = RarCompressionStrategy()

var compress = CompressContent(strategy: zip)
compress.compressFiles(filePaths: filePaths)

compress.strategy = rar
compress.compressFiles(filePaths: filePaths)
```
Một mảng được tạo để chứa files cần được nén. Những thực thể của cả 2 kiểu ZipCompressionStrategy và RarCompressionStrategy được tạo cũng như là thực thể của kiểu CompressContent. Khởi tạo chiến lược nén được thiết lập với kiểu ZipCompressionStrategy và phương thức compressFiles() được gọi, nó sẽ in ra kết quả “Using zip compression ”. Sau đó chiến lược nén được thay đổi sang kiểu RarCompressionStrategy và gọi lại hàm compressFiles() kết quả in ra là Using rar compression .

Mẫu strategy là cách tốt để thiết lập thuật toán để dùng lúc máy chạy. Việc này cũng cho phép chúng ta thay đổi thuật toán với phần thực thi khác theo nhu cầu của ứng dụng. Mẫu này cũng cho phép chúng ta đóng gói chi tiết của thuật toán trong kiểu strategy và không phải nằm trong phần thực thi của kiểu đó.

Bây giờ cùng xem mẫu cuối cùng là Observer.

**Mẫu Observer**
Mẫu này được dùng để thực thi việc phân phối việc xử lý sự kiện nơi mà một kiểu quan sát nhận được thông báo khi một sự kiện xảy ra trong một kiểu khác. Mẫu Observer cho phép những nhóm đối tượng hợp tác với một kiểu khác với một số phần phụ thuộc giữa chúng. Mẫu này thì được dùng rộng rãi vì vậy bạn có thể đã tiếp xúc với nó nhiều lần nếu như bạn phát triển ứng dụng sử dụng những thư viện giao diện như Cocoa hoặc Cocoa Touch.

**Hiều vấn đề**
Có nhiều lần nơi chúng ta cần thực thi hành động trong một hoặc nhiều phần của code của chúng ta khi một số hành động xảy ra ở những phần khác của code. Yêu cầu này thì rất phổ biến với những framework giao diện hiện đại, Chúng ta muốn nhận được thông báo khi người dùng có một số tương tác với giao diện của chúng ta.

**Hiểu vấn đề. **

Với mẫu Observer, Bên quan sát đăng kí để nhận thông báo khi một sự kiện xảy ra, Khi sự kiện được kích hoạt, bất cứ thực thể nào đã đăng kí để nhận sự kiện sẽ nhận một thông báo về sự kiện đã xảy ra. Trong swift có một số cách để thực hiện mẫu observer trong phần này chúng ta sẽ thấy 2 cách để thực thi nó. Chúng ta có nhiều phương pháp để xử lý mẫu này bởi vì mỗi phương pháp giúp chúng ta thực thi mẫu observer trong những ngữ cảnh khác nhau. Chúng ta sẽ nói về  khi nào dùng từng mẫu cũng như nói về giải pháp của chúng.

**Thực thi mẫu observer**

Giải pháp đầu tiên. Chúng ta sẽ dùng NotificationCenter. NotificationCenter cung cấp cho chúng ta một cơ chế để đăng kí sự kiện gữi và nhận thông báo. Tất cả ứng dụng Cocoa và Cocoa Touch có một notification center mặc định khi chúng đang chạy. không cần phải tạo thực thể cho lớp NotificationCenter.

Khi chúng ta dùng notification center chúng cần cung cấp tên cho mỗi thông báo. Một thứ chúng ta không bao giờ muốn đặt tên cứng nhắc cho việc gữi thông báo và việc nhận thông báo. Thay vì vậy chúng ta sẽ định nghĩa tên trong một hằng số toàn cục và dùng nó cho cả kiểu gữi và kiểu nhận thông báo. Do đó chúng ta sẽ bắt đầu ví dụ bằng cách định nghĩa tên của thông báo của chúng ta
```
let NCNAME = "Notification Name"
```
Bây giờ chúng ta sẽ tạo kiểu để gữi thông báo của mình. Trong ví dụ này kiểu của chúng ta chỉ đơn giản là gữi một thông báo tới default Notification center khi chúng ta gọi một phương thức tên post()
```
class PostType {
    let nc = NotificationCenter.default
    func post() {
        nc.post(name: Notification.Name(NCNAME), object: nil)
    }
}
```
Cuối cùng chúng ta sẽ tạo một kiểu sẽ nhận thông báo khi chúng được gữi tới notification center. Kiểu này sẽ đăng kí một bộ chọn với notification center và nó sẽ được gọi khi một thông báo mới được gữi tới notification center.
```
class ObserverType {
    let nc = NotificationCenter.default
    init() {
        nc.addObserver(self, selector: #selector(receiveNotification(notification:)), name: Notification.Name(NCNAME), object: nil)
    }
    
    @objc func receiveNotification(notification: Notification) {
        print("Notification Received")
    }
}
```
Khi chúng ta dùng NotificationCenter chúng ta phải nhớ thêm tiền tố phương thức sẽ được gọi với thuộc tính @objc. thuộc tính @objc làm cho API swift khả dụng tới objective-c lúc máy chạy. Việc này cho phép chúng ta dùng phương thức receiveNotifications() với NotificationCenter.

Chúng ta có thể dùng những kiểu này như sau:
```
var postType = PostType()
var observerType = ObserverType()
postType.post()
```
Nếu bạn chạy ví dụ trên chúng ta sẽ thấy tin nhắn “Notification Received ” được in ra khi chúng ta thực thi phương thức post() của thực thể kiểu PostType. Sử dụng notification center là một cách dễ và nhanh chóng để thêm mẫu observer tới code của chúng ta.

Nếu người thông báo của chúng ta hoặc kiểu người quan sát của chúng ta được viết bằng ngôn ngữ Objective-C, sau đó chúng ta nên dùng notification center như trong ví dụ trên. Nó cũng dễ dàng hơn để thông báo tới nhiều người nhận với notification center hơn là giải pháp tiếp theo sau đây bởi vì tính năng đó được xây dựng bằng notification center.

Phương pháp thứ 2 chứng minh cách những thông báo được xử lý trong framework Cocoa và Cocoa Touch nơi chúng ta đăng kí một thực thể của một kiểu, cái thoã mãn tới một protocol đặt biệt, để nhận những thông báo từ những thực thể của những kiểu khác. Trong ví dụ chúng ta muốn nhận thông báo khi một zombie đến hoặc tìm chúng ta. Cùng bắt đầu định nghĩa một protocol mà những kiểu dữ liệu muốn nhận thông báo cần phải thoã mãn nó. Protocol này có tên là  ZombieObserver:
```
protocol ZombieObserver {
    func turnLeft()
    func turnRight()
    func seesUs()
}
```
Protocol này sẽ đòi hỏi những kiểu thoã mãn nó phải thực thi 3 hàm được định nghĩa trong protocol. Những hàm này là phương thức được gọi để thông báo chúng ta biết khi zombie di chuyển hoặc tìm chúng ta.

Bây giờ cùng định nghĩa người quan sát sẽ nhận những thông báo từ kiểu Zombie. Chúng ta sẽ đặt tên là lớp là MyObserver và nó sẽ thoã mãn tới ZombieObserver protocol vì vậy nó có thể nhận thông báo khi zombie hành động.
```
class MyObserver: ZombieObserver {
    func turnLeft() {
        print("Zombie turned left, we move right")
    }
    
    func turnRight() {
        print("Zombie turned right, we move left")
    }
    
    func seesUs() {
        print("Zombie sees us, RUN!!!!")
    }
}
```
Cuối cùng chúng ta sẽ thực thi kiểu Zombie, Kiểu Zombie sẽ gữi thông báo tới những người quan sát khi nó thay đổi hướng đi hoặc tìm ai đó.
```
struct Zombie {
    var observer : ZombieObserver
    
    func turnZombieLeft() {
        observer.turnLeft()
    }
    
    func turnZombieRight() {
        observer.turnRight()
    }
    
    func spotHuman() {
        observer.seesUs()
    }
}
```
Trong kiểu Zombie chúng ta định nghĩa một thuộc tính là kiểu zombieObserver.  Đây là thực thể sẽ nhận thông báo khi zombie hành động gì đó. Cũng trong kiểu Zombie chúng ta tạo 3 phương thức được gọi khi zombie của chúng ta rẻ trái, phải hoặc nhìn thấy con người. Chú ý rằng mỗi phương thức chúng ta thông báo cho người quan sát về sự kiện xảy ra. Nhìn chung những thông báo sẽ xảy ra ở những luồng mới nhưng để đơn giản chúng ta cùng xem code ở đây.
```
var observer = MyObserver()
var zombie = Zombie(observer: observer)

zombie.turnZombieLeft()
zombie.spotHuman()
```
Khi code này thực hiện Zombie turn left, we move right and Zombie sees us, RUN!!!! sẽ được in ra bởi thực thể MyObserver. Khi phương thức  turnZombieLeft() và spotHuman() được gọi.

Phần thực thi mẫu Observer được trình bày trong ví dụ này là phương thức được dùng bởi hầu hết các phần tử giao diện trong framework Cocoa và Cocoa Touch. Nếu chúng ta cần một observer duy nhất, phương pháp này nên được dùng. Nếu bạn cần nhiều observer, chúng ta có thể làm một thuộc tính observer là một mảng của kiểu MyObserver, Nhưng sau đó mỗi lần chúng ta thông báo chúng ta cần duyệt qua hết mảng và thông báo cho từng observer trong mảng.

Nó dễ hơn để thông báo tới nhiều observer bằng NSNotificationCenter bởi vì logic để gọi nhiều observer thật sự đã được thực thi cho chúng ta.

**Tổng kết**
Những mẫu thiết kế là giải pháp cho vấn đề thiết kế ứng dụng, chúng ta có xu hướng nhìn thấy nhiều lần trong việc thiết kế dự án thực tế. Những mẫu này được thiết kế giúp chúng ta tạo những đoạn code có thể tái sử dụng và linh hoạt. Những mẫu thiết kế có thể làm cho code của chúng ta dễ dàng để đọc và dễ hiểu cho những người lập trình khác và cũng cho chính chúng ta khi đọc lại code sau này.

Nếu chúng ta xem những ví dụ trong chương này cẩn thận chúng ta sẽ thấy rằng một trong những phần nồng cốt của thiết kế mẫu là protocol. Hầu hết những mẫu thiết kế (ngoại trừ mẫu singleton) là dùng để giúp chúng ta tạo code linh hoạt và tái sử dụng.

Nếu đây là lần đầu bạn thấy những mẫu này, bạn có thể để ý rằng một số chiến lược khá giống với những gì bạn từng làm trong quá khứ. Đây là mong đợi khi những người lập trình có kinh nghiệm lần đầu được giới thiệu những mẫu thiết kế. Tôi cũng khuyến khích bạn đọc thêm về những mẫu thiết kế bởi vì chúng được định nghĩa để giúp chúng ta tạo những đoạn code linh hoạt và tái sử dụng được.