Hello xin chào mọi người lại là Chaoooo đây :).Trong bài viết này mình sẽ nói về design pattern, một chủ đề khá `hay` trong  lập trình. Oke gét gô =))

# Mẫu thiết kế - môn học 3 tín chỉ 
> Design Pattern (hay còn gọi là mẫu thiết kế), môn này 3 tín chỉ trong trường đại học.

Thật sự là đến giờ phút này mình cũng không biết sao ngày trước có thể qua được môn này, vì nó `Khó vãi ...`, cảm giác mơ hồ và không hiểu gì cả.
 
 Chỉ sau khi `ăn hành` qua nhiều dự án mình đã có 1 chút cơ bản về nó, hôm nay lên đây chém gió với mọi người.
 
>  Theo như sách giáo khoa trang xxx có viết : **Software design pattern** là một giải pháp có thể tái sử dụng, dùng để giải quyết một vấn đề chung thường xảy ra trong một hoàn cảnh nhất định trong software design. Design Pattern không phải là một thiết kế hoàn chỉnh để có thể chuyển đổi trực tiếp thành source code hay machine code. Mà nó là một mô tả hoặc template cho cách giải quyết vấn đề có thế được sử dụng trong nhiều tình huống khác nhau. Các design pattern được hình thức hoá tốt nhất để lập trình viên có thể sử dụng để giải quyết các vấn đề phổ biến khi thiết kế một ứng dụng hoặc hệ thống

Theo mình hiểu đơn giản nó là dư lày: `design pattern` là các template có sẵn (thằng nào đó viết rồi share) hoặc mình tự viết (đặt tên là `ABC design pattern`) và mình dùng lại nó để giải quyết một vấn đề (liên quan đến ABC). Áp dụng mẫu thiết kế này sẽ làm code dễ bảo trì, dễ mở rộng hơn. Và nó không dành riêng cho một ngôn ngữ lập trình cụ thể nào. Nó có thể được áp dụng trong hầu hết các ngôn ngữ lập trình OOP như: PHP, C#, Java, Python và nhiều ngôn ngữ khác

# Học Design Pattern? dư lào ?
> Câu trả  lời của mình là học và tìm hiểu từ trong framework mà bạn đang làm || học

Như mình đã chia sẻ ở trên, mục đích học `design pattern` khi còn trong trường đại học chỉ là để qua môn và không biết `vẹo` gì về design pattern , nên `khi bước chân ra xã hội làm ăn bươn chải, liều thì ăn nhiều, không liều thì ăn ít. Muốn thành công thì phải chấp nhận trải qua đắng cay ngọt bùi. Làm ăn muốn kiếm được tiền phải chấp nhận mạo hiểm nguy hiểm một tí nhưng trong tầm kiểm soát`, khi được tham gia vào dự án thực tế, mình có cơ hội làm quen với  [RubyonRails](https://rubyonrails.org/) 1 Framework của Ruby, và bắt đầu `Học cải thiện` design pattern từ đây.
> Bản thân RubyonRails sử dụng MVC Design Pattern  là viết tắt của Model - View - Controller. Đó là một mẫu kiến trúc, mô hình lập trình phổ biến được sử dụng để tạo cấu trúc cho nhiều trang web, ứng dụng tiên tiến [Tham khảo](https://www.google.com/search?q=MVC+design+pattern&oq=MVC+design+pattern&aqs=chrome..69i57.5430j0j7&sourceid=chrome&ie=UTF-8) 

# Vì sao nên sử dụng Design Pattern?
### Tăng tốc độ phát triển phần mềm
Chắc chắn rồi !
Hãy tưởng tượng Team của bạn đang gặp phải 1 vấn đề A nào đó khi khách hàng yêu cầu thêm tính năng mới và may mắn vấn đề đó  có thể giải quyết bằng 1 `Design Pattern` đã qua kiểm thử trước đó, việc của team dev chỉ là triển khai nó. Vậy là không cần tốn quá nhiều `effort` cho vấn đề này

### Hạn chế lỗi tiềm ẩn

Sử dụng giải pháp đã được chứng minh và công nhận thì hẳn là sẽ giảm bớt rủi ro hơn là tự mình thử nghiệm giải pháp mới đúng không nào? Vậy nên bạn sẽ không còn lo lắng về các lỗi tiềm ẩn nữa.
> Kiểu như sử dụng lại 1 món đồ được review rất tốt trước đó thì cũng yên tâm lắm.

###  Hỗ trợ tái sử dụng code
Các mẫu thiết kế có thể được sử dụng hàng triệu lần mà không nảy sinh bất cứ vấn đề nào. Developer cũng dễ dàng mở rộng, nâng cấp và bảo trì để đáp ứng được các yêu cầu thay đổi liên tục của dự án.

> Đọc đến đây thì các bạn đừng nghĩ rằng `Design Pattern` giống như khuôn mẫu chỉ cần  `Ctrl + C` `Ctrl + V` vào là code bạn sẽ chạy đâu nhé. Nó chỉ là 1 cái khung mẫu, nhắc lại chỉ là cái khung mẫu, bạn có thể tự do custom lại sao cho phù hợp với yêu chức năng của ứng dụng.

### Giúp code dễ đọc hơn

Việc sử dụng Design Pattern giúp cho code dễ đọc hơn, developer khi làm việc nhóm cũng giao tiếp thuận lợi hơn vì có được tiếng nói chung.

# Khi nào nên sử dụng Design Pattern?
> 
> Đó là khi bạn muốn giữ cho chương trình của mình thực sự đơn giản. Việc sử dụng các design pattern sẽ giúp chúng ta giảm được thời gian và công sức suy nghĩ ra các cách giải quyết cho những vấn đề đã có lời giải.

Bạn có thể đọc qua cuốn `Head First Design Patterns` để có cái nhìn tổng quát hơn về design pattern. 

Hệ thống các mẫu design pattern chuẩn hiện có 23 mẫu được định nghĩa trong cuốn `Design patterns Elements of Reusable Object Oriented Software` mà khởi đầu là cuốn Gang of Four (GoF). Các tác giả của cuốn sách là Erich Gamma, Richard Helm, Ralph Johnson và John Vlissides, hay còn được biết đến với các tên “Gang of Four” hay đơn giản là “GoF”. 

Hệ thống các mẫu này có thể nói là đủ và tối ưu cho việc giải quyết hết các vấn đề của bài toán phân tích thiết kế và xây dựng phần mềm trong thời điểm hiện tại. Hệ thống các mẫu design pattern được chia thành 3 nhóm: nhóm Creational (5 mẫu), nhóm Structural (7 mẫu) và nhóm Behavioral (11 mẫu).

(Các bạn tự search sách nhé mình lười quá =))

# Lưu ý về Design Pattern
> Thông thường các bí kíp võ công ở những trang cuối hay có những nội dụng như là: Tự cung trước khi luyện võ. Ở đây `Design Pattern` cũng vậy :)

### Có khi dùng rồi mà không biết
Có rất nhiều Framework đã implement design pattern vào trong chính nó nên đôi khi sử dụng framework bạn cũng đã dùng luôn design pattern đó rồi chỉ là không biết thôi

Cũng có thể do quá trình setup dự án, tự tay bạn chia folder, chia controller, chia model, chia view này nọ thì bản chất nó cũng đã là `Design Pattern` rồi đó

### Đừng trói buộc Design Pattern

Design Pattern là template, concept, nhưng thực hiện nó thế nào là ở bạn. Đừng tư duy bó hẹp nó vào một mô hình cụ thể, cái này mình đã từng gặp trong thời gian đầu tìm hiểu.

Design Pattern chỉ là một cách để giải quyết vấn đề thiết kế, và nó không phải là cách duy nhất. Do đó, bạn cần thực sự tỉnh táo và linh hoạt, nếu bạn là team lead, nên xem xét và cân nhắc các giải pháp hoặc pattern khác nữa, dựa trên kinh nghiệm của team members và vấn đề thực tế.

### Đừng ảo tưởng về Design Pattern
Vấn đề này thường gặp ở những người mới làm quen và thuần thục một vài Design Pattern. Bạn thường có xu hướng tưởng tượng rằng Design Pattern là tất cả, là GOD, nhưng thực sự không phải vậy. 

Design Pattern cũng có nhược điểm của nó, ví dụ như nó khiến thiết kế của bạn trở nên rối rắm và khó debug hơn ( cũng tương tự như S.O.L.I.D), hoặc bản thân Design Pattern đó cũng đã có nhược điểm, nhưng người ta vẫn sử dụng vì ưu điểm của nó vượt trội so hơn với mặt nhược. Trường hợp hay gặp nhất là áp dụng bừa bãi Singleton Pattern vào source code, điều này gây nên nhiều technical dept mà người sử dụng không hề hay biết

> Nên nhớ, có design pattern, thì cũng có Anti-pattern.

###  Đừng quá lạm dụng Design Pattern

> Nhiều người nghĩ rằng `Design Pattern` là phải giỏi, phải trình cao này kia mới dùng được nên nghĩ  là khi code càng dùng nhiều `Design Pattern` càng tốt :x: 

Design Pattern là để giải quyết ` Vấn đề`, nhưng đôi khi nó sẽ làm vấn đề phức tạp hơn chỉ vì áp dụng nhiều Design Pattern quá. Chẳng hạn như code của bạn chỉ cần 1 - 2 `class` thôi là có thể giải quyết được bài toán rồi, nhưng khi dùng Design Pattern thì bạn phải tách thành nhiều 5 - 6 class cho đúng  `Design Pattern`lúc đó code của bạn trông có vẻ ngầu đấy :yum:, nhưng phức tạp hơn rất nhiều có khi lại ảnh hưởng đến performance, nên là nó cũng không giải quyết được `Vấn đề`

# Kết luận
Trên đây là những chia sẻ của mình về Design Pattern, hi vọng giúp mọi người hiểu hơn về Design Pattern. 
Nếu bài viết có sai sót nào, rất mong nhận được những bình luận của mọi người. 

Thanks for reading ! :bowing_man: 

# Tài liệu tham khảo
1. https://sourcemaking.com/design_patterns
2. https://www.swiftyvn.com/2018/09/tong-quan-ve-design-pattern/
3. https://www.tutorialspoint.com/design_pattern/index.htm
4. https://toidicodedao.com/
5. https://www.youtube.com