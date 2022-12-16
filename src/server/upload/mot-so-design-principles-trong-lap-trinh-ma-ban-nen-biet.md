Software Development Design Principles (trong bài viết này mình sẽ gọi tắt là Design Princples), tạm dịch là các nguyên tắc thiết kế phần mềm, là một khái niệm quan trọng trong lĩnh vực công nghệ phần mềm. Design Principles có thể coi là những "lời khuyên" mang tính cơ bản, để giúp bạn thiết kế một sản phẩm dễ dàng để phát triển, dễ dàng để bảo trì, hay đơn giản là có thể vận hành tốt. Design Principles thỉnh thoảng có hay được so sánh với một khái niệm khác hay gây nhầm lẫn, là Design Patterns, và do thiên nhiều về mặt lý thuyết, nên không phải ai cũng chú trọng hay thích tìm hiểu về chúng. 

Cách đây hơn 4 năm, mình đã từng làm một seminar về nội dung Object Oriented Design Principles (các nguyên lý thiết kế hướng đối tượng) để giới thiệu qua về SOLID Principles, và có một bài viết bao gồm slide only tại [đây](https://viblo.asia/p/slide-only-object-oriented-design-principles-pVYRPJPmG4ng) . Hồi trước đơn giản là chỉ đưa slide lên trước để thỉnh thoảng nhắc nhở bản thân khi nhìn lại danh sách bài viết của mình mà nhớ ra rằng, một lúc nào đó cần phải có một bài viết đi sâu vào vấn đề này. Thấm thoắt đã 4 năm trôi qua (^^;)

Hồi đó số lượng bài viết trên Viblo cũng chưa nhiều, và cũng chẳng mấy ai đề cập hay viết về Design Principles cả. Seminar, hay Slide cũ của mình cũng là tập trung nói về SOLID Principles là chính. Tuy nhiên, hiện tại bây giờ cũng khác xưa nhiều. Search trên Viblo, các bạn sẽ tìm thấy phải đến vài chục bài viết về SOLID cũng nên :D Nếu các bạn muốn tìm hiểu sâu về SOLID, có thể tham khảo các bài trên Viblo với tag [solid](https://viblo.asia/tags/solid) tại https://viblo.asia/tags/solid , hoặc có thể tham khảo slide cũ của mình tại bài viết [này](https://viblo.asia/p/slide-only-object-oriented-design-principles-pVYRPJPmG4ng). Trước đây, mình cũng có tạo một repo code mẫu cho từng nguyên lý trong SOLID, nếu bạn có thể đọc hiểu PHP, thì bạn có thể tham khảo source code tại https://github.com/wataridori/solid-php-example

Cũng chính vì giờ người người viết về SOLID, nhà nhà bàn về SOLID như vậy, thế nên trong bài viết này, mình sẽ không tập trung vào nó nữa, mà thay vào đó sẽ giới thiệu đến mọi người một số Design Principles khác, có thể ít được biết đến hơn, nhưng cũng thú vị không kém. Hy vọng có thể giúp ích được cho mọi người.

![](https://images.viblo.asia/81dbb1e6-3948-4444-815c-06678680cc6b.jpeg)

Tuy nhiên, trước khi đi vào nội dung các Design Principles cụ thể, chúng ta hãy cùng tìm hiểu sâu hơn về khái niệm này trước nhé, để xem Design Principles và Design Patterns khác nhau như thế nào đã nhé :D

## Design Principles vs Design Patterns
Design Principles hiểu đơn giản là các nguyên tắc, nguyên lý thiết kế, trong khi Design Patterns là các khuôn mẫu thiết kế. Tức Design Principles đưa ra cho chúng ta những "gợi ý", "lời khuyên", "hướng dẫn", còn Design Patterns đưa ra cho chúng ta luôn một "lời giải mẫu" cho một bài toán cụ thể trong thực tế. Hay Design Principles là ở mức low-level, còn Design Patterns là ở mức high-level, và trên thực tế thì các Design Patterns tốt đều sẽ thỏa mãn các Design Principles tốt. 

Trên Viblo cũng có khác nhiều bài viết về chủ đề Design Patterns rồi, các bạn có thể tìm hiểu thêm ở [đây](https://viblo.asia/tags/design-pattern). Còn trong bài viết này, mình sẽ tập trung giới thiệu về một số Software Development Design Principles nổi tiếng là chủ yếu. Thông qua đó hy vọng các bạn cũng sẽ có được cái nhìn tổng quan xem như thế nào được gọi là Design Principles :D

## Một số Design Principles bạn nên biết

### DRY 
DRY là viết tắt của từ **Don't Repeat Yourself**, tức **đừng lặp lại chính bạn**. DRY mang hàm ý hãy cố gắng đừng lặp lại các đoạn code, hay những xử lý ở nhiều nơi khác nhau. DRY không chỉ ứng dụng trong việc code, mà còn cả trong việc viết documentation, hay thiết kế database schemas ...

Việc thực hiện tốt DRY sẽ giúp bạn maintain code tốt hơn, hay giải quyết vấn đề thay đổi logic code của một đoạn xử lý dễ dàng hơn sau này. 

![](https://images.viblo.asia/c1be894d-457e-4b37-ab5c-4f243878ce08.jpg)

Bên cạnh DRY, người ta còn hay nhắc đến một khái niệm đối lập, khá là vui là **WET** =)) WET có thể hiểu là "write every time" (viết mọi lúc), "write everything twice" (viết mỗi thứ 2 lần), "we enjoy typing" (chúng tôi thích việc đánh máy) or "waste everyone's time" (tốn thời gian của tất cả mọi người). Nhìn chung, khi bạn vi phạm DRY, thì bạn sẽ WET :joy: 

### KISS
KISS là viết tắt của từ **Keep It Simple, Stupid**, tức **để nó đơn giản thôi, đồ ngốc**. Nguyên lý KISS đề cập đến việc tính đơn giản (simple) nên được đặt là mục tiêu của việc thiết kế hệ thống, và hầu hết các hệ thống sẽ làm việc tốt nhất khi nó được giữ ở trạng thái đơn giản, thay vì bị phức tạp hóa vấn đề hơn. Những sự phức tạp hóa vấn đề một cách không cần thiết luôn cần được loại bỏ.

![](https://images.viblo.asia/4edb3201-1fbf-4001-8f1b-6ce7f4260bec.jpg)

Bạn có thể sẽ thấy nguyên lý KISS mang ý nghĩa rất giống với một số câu nói nổi tiếng khác như **"Simple is the best"**, **"Simplicity is the ultimate sophistication"**, **"Make Simple Tasks Simple"** ... chúng đều đề cao tính "đơn giản" trong việc giải quyết vấn đề.

Tuy nhiên nguyên lý này cần phải hiểu cho đúng cách. "Simple" ở đây là chỉ một "cách giải quyết được vấn đề", chứ không phải "đơn giản" đến mức không thể vận hành được hệ thống theo ý muốn, thì chỉ có toang =))

### YAGNI
YAGNI là viết tắt của từ **You aren't gonna need it**, tức **bạn có thể sẽ không cần đến nó đâu**. YAGNI là một principle được giới thiệu trong extreme programming. Nó miêu tả rằng bạn không nên đưa vào những chức năng cho đến khi chúng thực sự cần thiết, hay chỉ tiến hành implement những chức năng mà bạn cảm thấy là mình cần đến nó, chứ không phải là bạn *cảm thấy sau này có thể sẽ cần đến nó*. 

Nội dung thì đơn giản là như vậy, nhưng để hiểu rõ và thấm nhuần YAGNI lại không phải là một việc dễ dàng. Bạn có thể tìm hiểu thêm về YAGNI trên bài blog của [Martin Fowler](https://en.wikipedia.org/wiki/Martin_Fowler_(software_engineer)) tại [đây](https://martinfowler.com/bliki/Yagni.html).

Trong bài giới thiệu về YAGNI của mình, Martin Fowler có đề cập đến 4 vấn đề khi vi phạm YAGNI:

![yagni](https://images.viblo.asia/full/eb6feef4-a0b2-4525-9d58-05de989771b8.png)

- Cost of building: Khi bạn làm chức năng mà cuối cùng không cần đến nó. Nó khiến bạn tốn nhiều effort trong việc lên thiết kế, code, test ...
- Cost of repair: Khi chức năng mà bạn hướng đến là cần thiết, nhưng bạn lại implement theo một cách không hợp lý. Nó sẽ khiến bạn tốn effort để lên kế hoạch lại, code lại, và test lại chức năng đã làm, bởi nó không thực sự là những gì bạn cần
- Cost of delay: Dù trong bất kỳ trường hợp nào, bạn cũng sẽ gặp phải vấn đề này. Bạn đang mất thời gian vào một chức năng mà mình chưa cần đến ở thời điểm hiện tại, nó kéo theo việc những chức năng cần thiết ở thời điểm hiện tại không thể được hoàn thiện và release sớm 
- Cost of carry: Dù trong bất kỳ trường hợp nào, bạn cũng sẽ gặp phải vấn đề này. Bạn đang thêm một lượng code mới vào trong project của mình, khiến cho hệ thống phức tạp hơn và sẽ mất công để maintain, modify, debug hơn 

Thực tế cũng rất khó để định nghĩa ranh rới của YAGNI. Có rất nhiều tính năng, hay đoạn xử lý logic bạn sẽ phải đắn đo cân nhắc xem có phải YAGNI hay không. Do đó việc có được suy nghĩ thoáng về YAGNI là một điều cần thiết. Martin Fowler cũng có đưa ra một gợi ý rằng **"Yagni only applies to capabilities built into the software to support a presumptive feature, it does not apply to effort to make the software easier to modify"**, tức nguyên lý YAGNI chỉ nên sử dụng khi bạn định thêm vào phần mềm một Feature mà bạn "dự đoán" sẽ sử dụng trong tương lai, chứ không nên apply YAGNI vào việc nỗ lực để làm cho phần mềm trở nên dễ dàng chỉnh sửa, maintain hơn. 

### Boy Scout Rule 
**Boy Scout Rule** là một nguyên lý có nội dung dựa trên quy tắc có thật của hội hướng đạo sinh Mỹ (Boy Scouts of America). Quy tắc đó có nội dung là "Leave the campground cleaner than you found it", tức hãy giữ cho khu cắm trại sạch sẽ hơn lúc bạn đến.

Boy Scout Rule được áp dụng trong thiết kế phần mềm với nội dung dạng như **hãy giữ cho code được sạch đẹp hơn lúc bạn chưa chỉnh sửa nó** =)) Tức đừng có mà làm cho một đoạn code đã có sẵn trở nên tồi tệ hơn.

![Boy Scout Rule](https://images.viblo.asia/93cab7fc-950a-4ea9-88ed-e504b4d43a95.jpg)

Boy Scout Rule được phát biểu dưới nhiều dạng khác nhau như: **"always leave the code you're editing a little better than you found it"**, **"always leave the code cleaner/better than you found it"**, **"Always check a module in cleaner than when you checked it out"** ... 

### Separation of Concerns (SoC)
**Separation of Concerns** có nghĩa là phân tách phụ thuộc hay chia tách quan hệ.

Tư tưởng của Separation of Concerns là phân tách hệ thống ra thành các thành phần, chức năng nhỏ hơn, sao cho chúng càng ít điểm chung (về mặt chức năng), hay càng ít phụ thuộc vào nhau càng tốt. Khi các thành phần được ghép nối vào trong hệ thống, chúng sẽ tương tác với nhau thông qua thông tin về Interface, hay các open API, mà không cần phải biết các thành phần kia được xây dựng như thế nào, bên trong đó được lập trình (implement) ra sao.

Separation of Concerns là một nguyên lý rất quan trọng và được sử dụng rất nhiều trong thiết kế và phát triển phầm mềm hiện đại. Bạn có thể bắt gặp nó ở rất nhiều nơi, ở những tầng có quy mô lớn, hay ở những mức quy mô nhỏ. Trước đây cũng đã từng có một bạn đặt câu hỏi về Separation of Concerns trên Viblo tại [đây](https://viblo.asia/q/dinh-nghia-ve-separation-of-concerns-3m5W0vy7KO7) và mình cũng đã có một câu trả lời khá kỹ về nguyên lý này, các bạn muốn tìm hiểu thêm có thể xem qua tại [đây](https://viblo.asia/a/nB5poNDblPG)

### Low Coupling
**Low Coupling**, hay **Loose Coupling**, hay **Weak Coupling**, hay **Minimise Coupling**, là tên một nguyên lý thiết kế miêu tả về "độ phục thuộc" (coupling) giữa các modules, hay components (ví dụ như classes, interfaces, services) trong hệ thống. Khi đó độ phụ thuộc của các module là **càng thấp thì càng tốt**. Tức một component biết càng ít, và có càng ít quan hệ với một component khác thì càng tốt. 

Một hệ thống trái ngược với Low Coupling gọi là High Coupling, hay Tight Coupling.

![](https://images.viblo.asia/a45b09a5-84fa-4443-acc7-b210bb91041c.png)

Một hệ thống High Coupling là hệ thống mà ở đó một component biết quá nhiều về cách hoạt động bên trong của một component khác. Chính việc phụ thuộc chặt chẽ vào nhau như vậy kéo theo một sự thay đổi ở component này khiến cho nhiều components khác cũng phải thay đổi theo. Hay việc sử dụng lại một component sẽ trở nên khó khăn hơn, khi mà nó có hàng tá dependencies được kéo theo. Đồng thời các lập trình viên sẽ càng ngày càng trở nên e nghại việc maintain, update một component hơn, khi mà không thể nắm rõ được nó sẽ ảnh hưởng như thế nào với những component khác :joy: 

### High Cohesion
**High Cohesion**, hay **Strong Cohesion** hay **Maximize Cohesion** là tên một nguyên lý miêu tả về mức độ quan hệ giữa các method bên trong 1 class (hay giữa các classes bên trong 1 module). Một hệ thống có High Cohesion được thể hiện qua việc các chức năng bên trong Class có thể được access thông qua một số methods của nó, và các methods public đó thì sẽ thực hiện một số các hoạt động có liên quan.

![cohesion and coupling](https://images.viblo.asia/269135f1-750e-4abb-93b3-ba47b99e8912.png)

Khái niệm High Cohesion thường đi kèm với Low Coupling, tạo thành một "cặp đôi hoàn hảo" cho việc thiết kế quan hệ bên trong 1 component, cũng như giữa các component với nhau. Nhìn chung, một hệ thống tốt là một hệ thống High Cohesion, Low Coupling.

![](https://images.viblo.asia/5eb5183a-8d19-464e-a058-812746870480.png)

### Law of Demeter (LoD)
**Law of Demeter**, hay **principle of least knowledge** (nguyên lý "hiểu biết ít nhất"), là một principle thường được áp dụng trong lập trình hướng đối tượng, để giúp đảm bảo tính **Low Coupling** giữa các component.

Law of Demeter có thể được miêu tả bởi một trong những cách sau:

- Các unit chỉ nên có một số lượng hiểu biết có giới hạn về những units khác. Chúng chỉ nên biết về những units có mối quan hệ trực tiếp, gần gũi với chúng.
- Các unit chỉ nên "nói chuyện" với bạn bè của chúng, không "nói chuyện" với người lạ 
- Chỉ nói chuyện với bạn bè trực tiếp của bạn (không nên nói chuyện với bạn của bạn của bạn)

Theo đó thì một method `m` của một object `O` chỉ nên "nói chuyện" (thực hiện lời gọi hàm) với các hàm nằm trong các objects như sau:
- Bản thân `O`
- Các objects là tham số truyền vào bên trong `m`
- Các objects được khởi tạo bên trong `m`
- Các objects nằm trực tiếp bên trong `O`
- Các biến global mà có thể được access từ bên trong scope của `m`

Ví dụ như những trường hợp sau là vi phạm nguyên lý Law of Demeter:
```js
email = user.getProfile().getEmail(); // object user đã "biết quá nhiều" khi thực hiện lời gọi hàm getEmail() từ kết quả trả về của hàm getProfile()
familyName = user.getProfile().getName().getFamilyName(); // object user ở đây còn biết nhiều hơn cả trường hợp ở trên nữa =))
```

Để implement theo nguyên lý Law of Demeter, ta sẽ cần viết các hàm wrapper để giúp cho object sẽ có thể gọi thẳng đến hàm mà nó mong muốn. Ví dụ như viết hàm `getEmail()` bên trong User để ta có thể gọi trực tiếp `email = user.getEmail()`. Điều này sẽ giúp cho code trở nên dễ đọc, dễ hiểu và dễ maintain hơn. Về sau nếu có cần thay đổi logic lấy ra email thì ta sẽ chỉ cần update bên trong hàm `getEmail()` của class User là được, chứ không cần phải tìm đến tất cả những chỗ  có xử lý `user.getProfile().getEmail()` để update từng cái một nữa.

Tuy nhiên, việc tuân thủ máy móc theo Law of Demeter sẽ dẫn đến một vấn đề là trong code của bạn sẽ xuất hiện quá nhiều các hàm wrapper, ngược lại sẽ khiến cho khối lượng code trở nên cồng kềnh hơn, và cũng mất nhiều thời gian để viết những hàm wrapper như vậy hơn :joy: Chính vì thế việc áp dụng Law of Demeter ra sao và vào những thời điểm nào cũng nên được cân nhắc cho kỹ.

### Curly's Law
**Curly's Law** là một nguyên lý với nội dung đơn giản là **Do One Thing**, hay **chỉ làm một việc duy nhất**. Theo đó thì mỗi đơn vị trong source code (method, class, module) đều cần phải có một mục tiêu rõ ràng, và duy nhất. Các bản có thể tưởng tượng nguyên lý này gần tương tự với Single Responsibility Principle (nguyên tắc đơn trách nhiệm, hay nguyên tắc trách nhiệm duy nhất) trong SOLID.

### Principle of least astonishment (POLA)
**Principle of least astonishment** hay còn gọi là **principle of least surprise**, tức nguyên tắc **bất ngờ nhỏ nhất**. Đây là nguyên lý có nội dung liên quan đến việc thiết kế tính năng, giao diện, hay trải nghiệm người dùng. Nội dung của nó được miêu tả là **"If a necessary feature has a high astonishment factor, it may be necessary to redesign the feature"**, tức nếu một chức năng cần thiết mà có yếu tố gây bất ngờ cao, thì có thể chúng ta cần phải thiết kế lại chức năng đó :joy: Hay nói cách khác thì Principle of least astonishment nói rằng một thành phần của hệ thống nên hoạt động theo cách mà hầu hết người dùng mong đợi nó sẽ hoạt động,  hay cách thức hoạt động của một thành phần của hệ thống không nên gây ngạc nhiên cho người dùng. 

### Principle of least privilege (PoLP)
**Principle of least privilege**, hay còn gọi là **principle of minimal privilege** hay **principle of least authority**, tức **nguyên tắc quyền hạn tối thiểu**, là một nguyên tắc được vận dụng nhiều trong các ngành khoa học máy tính, thiết kế phần mềm, bảo mật máy tính. Nó miêu tả rằng từng module (như process, user, hay program ...) của hệ thống chỉ có thể **truy cập thông tin và tài nguyên cần thiết cho mục đích hợp pháp của nó**. Nó sẽ giúp hệ thống trở nên ổn định hơn, khi từng thành phần, từng chương trình đều có quyền đã được giới hạn của riêng nó, từ đó không thể gây ảnh hưởng không mong muốn đến những chương trình khác, hay gây ra crash hệ thống. Ngoài ra, nó sẽ giúp hệ thống trở nên bảo mật hơn, khi mà một lỗ hổng của chương trình này sẽ khó để có thể bị khai thác, hay gây ảnh hưởng đến toàn hệ thống hơn...

## Tổng kết
Trên đây là một số Software Development Design Principles mình cảm thấy khá hay và có tính ứng dụng cao, hy vọng nó cũng sẽ giúp ích cho mọi người. Ngoài ra, như đã đề cập ngay từ ban đầu, thì bài này mình không đề cập đến 5 Design Principles cực kỳ quan trọng trong Object Oriented Programming là SOLID, bởi vì trên Viblo cũng đã có quá nhiều bài viết về SOLID rồi. Nếu bạn nào chưa nắm rõ về SOLID thì thử tìm đọc các bài viết về SOLID tại [đây](https://viblo.asia/tags/solid) nhé, sẽ rất là hữu ích đấy :D

Xin hẹn gặp lại các bạn ở các bài viết sau :)

## References
- https://java-design-patterns.com/principles/
- http://wiki.c2.com/?CouplingAndCohesion
- https://blog.codinghorror.com/curlys-law-do-one-thing/
- https://nalexn.github.io/separation-of-concerns/
- https://en.wikipedia.org/wiki/Principle_of_least_privilege
- https://en.wikipedia.org/wiki/Don't_repeat_yourself
- https://en.wikipedia.org/wiki/KISS_principle
- https://en.wikipedia.org/wiki/You_aren%27t_gonna_need_it
- https://martinfowler.com/bliki/Yagni.html
- https://en.wikipedia.org/wiki/Separation_of_concerns
- https://en.wikipedia.org/wiki/Law_of_Demeter
- https://blog.codinghorror.com/curlys-law-do-one-thing/
- https://en.wikipedia.org/wiki/Principle_of_least_astonishment