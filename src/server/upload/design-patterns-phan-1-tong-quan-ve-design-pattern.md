![](https://images.viblo.asia/ebe8169a-f8c2-4507-8d24-6128fb4fcbe1.png)
**"Hỏi thế gian DS là chi, mà dân Dev thề nguyền sống chết"**. Design Patterns giống như những bí kíp võ công mà chỉ cần các cao thủ dev rèn luyện đến cảnh giới "Đăng phong tháo cực" thì có thể có một chỗ đứng vững chắc trên giang hồ. Chúng ta hãy cùng nhau tu luyện môn võ công DS này ngay thôi nào . Let's go...

## 1. Design Patterns được hiểu như thế nào?
- Trước tiên mình muốn nhấn mạnh một điều: **"Design Patterns không phải là ngôn ngữ cụ thể nào cả."** cho nên chúng ta có thể triển khai các design pattern theo nhiều ngôn ngữ lập trình khác nhau mà chúng ta biết.
- Có rất nhiều tài liệu nói về Design Patterns. Vậy theo 1 cách dễ hiểu thì design patterns là: Những giải pháp được đưa một cách tổng thể sau khi được tối ưu hóa và tái sử dụng. Việc này thường được áp dụng cho các phần mềm thiết kế mà ta thường gặp phải mỗi ngày. Nhiều người coi đó là các tập giải pháp sau khi được suy nghĩ, giải quyết trong một tình huống vô cùng cụ thể.
- Design Pattern trong OOP thường biểu thị mối quan hệ và tương tác giữa Class, Object với nhau (Class với Object, Class với Class, Object với Object, …) dựa trên 2 nguyên lý thiết kế đối tượng nổi tiếng:
    + **Program to an interface not implementation** ( Lập trình hướng đến các Interface và tính trừu tượng).
    + **Object Composition over inheritance** (Sử dụng Composition thay vì Inheritance – kế thừa).
 - Tóm lại, bạn chỉ cần nhớ:
     ```
     1. Design patterns là 1 đoạn mô tả, hoặc 1 khuôn mẫu để giải quyết 1 vấn đề nào đó. Nó không phải là thiết kế cuối cùng.
     2. Design Pattern được tạo ra để giải quyết vấn đề, chứ không phải để phức tạp hóa nó.
     3. Design Pattern giúp code được tối ưu hóa, dễ tái sử dụng, dễ hiểu, dễ nâng cấp sửa chữa.
     4. Design Pattern có liên quan chặt chẽ đến 2 nguyên lý thiết kế đối tượng: về interface và về composition ở trên.
     ``` 
## 2. Tác dụng của Design Patterns là gì?
- Nhờ có Design Patterns mà các dev có thể áp dụng để giải quyết nhiều cấn đề khác nhau một cách tương tự. Một số vấn đề mà các bạn gập phải, có thể nếu bạn đã có kinh nghiệm về lĩnh vực IT, bạn có thể nghĩ và đưa ra những giải pháp cho nó. Tuy nhiên đó chưa chắc đã là những phương án tối ưu nhất. Tốt hơn hết bạn nên áp dụng những Patterns để đem lại những phương án tối ưu và chất lượng.
- Design Patterns giúp bạn tái sử dụng code và dễ dàng mở rộng code.
- Design Patterns cung cấp giải pháp ở dạng tổng quát, giúp tăng tốc độ phát triển phần mềm bằng cách đưa ra các mô hình test, mô hình phát triển đã qua kiểm nghiệm.
- Khi bảo trì những dự án nếu được code theo các pattern thì chắc hẳn việc đọc code và fix bug sẽ dễ dàng hơn cho lập trình viên cả về mặt chất lượng công việc cũng như thời gian.

## 3. Lý do áp dụng Design Patterns
- Sau khi biết được design patterns là gì và công dụng của nó thì chắc hẳn bạn đã bị thuyết phục về tính hiệu quả có design patterns. Một số chia sẻ mà mình tìm hiểu được sau đây sẽ làm bạn càng củng cố niềm tin hơn khi sử dụng nó.
    + Nếu bạn gặp bất cứ khó khăn gì với vấn đề sau khi mình đã giải quyết, sử dụng các loại Patterm này sẽ là cách hữu hiệu giúp bạn giải quyết các khúc mắc thay vì phải tìm những giải pháp tốn kém, mất nhiều thời gian. 
    + Phần mềm giúp cho các lập trình viên có thể hiểu sâu thêm về các mã code của người khác một cách nhanh chóng hơn nhiều lần. Có thể nói cách khác là hiểu về những mối quan hệ giữa các Module với nhau. Các thành viên ở trong team sẽ trao đổi với nhau một cách dễ dàng và cùng nhau xây dựng các dự án mà không mất quá nhiều thời gian. 
    + Các giải pháp do Design Pattern mang đến đều đã được tối ưu hóa một cách tối đa, hơn nữa kiểm chứng rõ ràng vài giải quyết tốt trong software engineering. Với dạng tổng quát này, phần mềm có thể tăng tốc độ phát triển bằng cách đưa ra nhiều mô hình khác nhau, bao gồm mô hình phát triển, mô hình test khi đã qua kiểm nghiệm.
    + Nhờ có Design Pattern mà sản phẩm được linh hoạt hơn qua nhiều khâu, có thể dễ dàng mang đi bảo trì và thay đổi nếu có rủi ro xảy ra
    + Việc phát triển phần mềm luôn gắn liền với những yêu cầu thay đổi. Hệ thống khi phình to ra sẽ có những tính năng mới được thêm vào.
## 4. Design Patterns được phân loại ra sao ?
- Dưới đây là sơ đồ về mối quan hệ giữa các pattern. Chắc hẳn các bạn đã biết là sẽ có 23 Design pattern (GoF) như sau:
![](https://images.viblo.asia/ea7cc3e0-e420-49ae-8015-11912a92bca9.jpg)
-  23 Patterns trên được chia ra thành 3 nhóm như sau:
    -  **Nhóm khởi tạo (Creational): Tập trung vào bài toán khởi tạo object một cách trừu tượng**
        ![](https://images.viblo.asia/7df8988b-20c8-49aa-8e92-ef524c84e69a.png)
        - Nhóm khởi tạo bao gồm các patterns:
            1. **[Singleton](https://viblo.asia/p/design-patterns-phan-2-singleton-6J3ZgdARlmB):** Đảm bảo 1 class chỉ có 1 instance và cung cấp 1 điểm truy xuất toàn cục đến nó.
            2. **[Abstract Factory](https://viblo.asia/p/design-patterns-phan-3-tu-factory-method-den-abstract-factory-LzD5dMkzKjY):** Cung cấp một interface cho việc tạo lập các đối tượng (có liên hệ với nhau) mà không cần qui định lớp khi hay xác định lớp cụ thể (concrete) tạo mỗi đối tượng.
            3. **[Factory Method](https://viblo.asia/p/design-patterns-phan-3-tu-factory-method-den-abstract-factory-LzD5dMkzKjY):** Định nghĩa Interface để sinh ra đối tượng nhưng để cho lớp con quyết định lớp nào được dùng để sinh ra đối tượng Factory method cho phép một lớp chuyển quá trình khởi tạo đối tượng cho lớp con.
            4. **Builder:** Tách rời việc xây dựng (construction) một đối tượng phức tạp khỏi biểu diễn của nó sao cho cùng một tiến trình xây dựng có thể tạo được các biểu diễn khác nhau.
            5. **Prototype:** Qui định loại của các đối tượng cần tạo bằng cách dùng một đối tượng mẫu, tạo mới nhờ vào sao chép đối tượng mẫu này.
      - **Nhóm cấu trúc (Structural): Tập trung vào bài toán liên kết và quan hệ giữa các Class, Object**
      ![](https://images.viblo.asia/33362164-600e-4e82-a1a5-0245223afad6.png)
         + Nhóm cấu trúc bao gồm các patterns:
             1. **Adapter:** Do vấn đề tương thích, thay đổi interface của một lớp thành một interface khác phù hợp với yêu cầu người sử dụng lớp.
             2. **Bridge:** Tách rời ngữ nghĩa của một vấn đề khỏi việc cài đặt, mục đích để cả hai bộ phận (ngữ nghĩa và cài đặt) có thể thay đổi độc lập nhau.
             3. **Composite:** Tổ chức các đối tượng theo cấu trúc phân cấp dạng cây. Tất cả các đối tượng trong cấu trúc được thao tác theo một cách thuần nhất như nhau.
Tạo quan hệ thứ bậc bao gộp giữa các đối tượng. Client có thể xem đối tượng bao gộp và bị bao gộp như nhau -> khả năng tổng quát hoá trong code của client -> dễ phát triển, nâng cấp, bảo trì.
             4. **Decorator:** Gán thêm trách nhiệm cho đối tượng (mở rộng chức năng) vào lúc chạy (dynamically).
             5. **Facade:** Cung cấp một interface thuần nhất cho một tập hợp các interface trong một “hệ thống con” (subsystem). Nó định nghĩa 1 interface cao hơn các interface có sẵn để làm cho hệ thống con dễ sử dụng hơn.
             6. **Flyweight:** Sử dụng việc chia sẻ để thao tác hiệu quả trên một số lượng lớn đối tượng “cỡ nhỏ” (chẳng hạn paragraph, dòng, cột, ký tự…).
             7. **Proxy:** Cung cấp đối tượng đại diện cho một đối tượng khác để hỗ trợ hoặc kiểm soát quá trình truy xuất đối tượng đó. Đối tượng thay thế gọi là proxy.
    - **Nhóm hành vi/ tương tác (Behavioral): Tập trung vào giải quyết bài toán giao tiếp giữa các Object**
        ![](https://images.viblo.asia/bb3ff68a-f9cc-47be-9589-8983f165c453.png)
        + Nhóm hành vi/ tương tác bao gồm các patterns:
            1. **Chain of Responsibility:** Khắc phục việc ghép cặp giữa bộ gởi và bộ nhận thông điệp. Các đối tượng nhận thông điệp được kết nối thành một chuỗi và thông điệp được chuyển dọc theo chuỗi nầy đến khi gặp được đối tượng xử lý nó. Tránh việc gắn kết cứng giữa phần tử gởi request với phần tử nhận và xử lý request bằng cách cho phép hơn 1 đối tượng có có cơ hội xử lý request. Liên kết các đối tượng nhận request thành 1 dây chuyền rồi gửi request xuyên qua từng đối tượng xử lý đến khi gặp đối tượng xử lý cụ thể.
            2. **Command:** Mỗi yêu cầu (thực hiện một thao tác nào đó) được bao bọc thành một đối tượng. Các yêu cầu sẽ được lưu trữ và gởi đi như các đối tượng.Đóng gói request vào trong một Object, nhờ đó có thể nthông số hoá chương trình nhận request và thực hiện các thao tác trên request: sắp xếp, log, undo…
            3. **Interpreter:** Hỗ trợ việc định nghĩa biểu diễn văn phạm và bộ thông dịch cho một ngôn ngữ.
            4. **Iterator:** Truy xuất các phần tử của đối tượng dạng tập hợp tuần tự (list, array, …) mà không phụ thuộc vào biểu diễn bên trong của các phần tử.
            5. **Mediator:** Định nghĩa một đối tượng để bao bọc việc giao tiếp giữa một số đối tượng với nhau.
            6. **Memento:** Hiệu chỉnh và trả lại như cũ trạng thái bên trong của đối tượng mà vẫn không vi phạm việc bao bọc dữ liệu.
            7. **Observer:** Định nghĩa sự phụ thuộc một-nhiều giữa các đối tượng sao cho khi một đối tượng thay đổi trạng thái thì tất cả các đối tượng phụ thuộc nó cũng thay đổi theo.
            8. **State:** Cho phép một đối tượng thay đổi hành vi khi trạng thái bên trong của nó thay đổi, ta có cảm giác như class của đối tượng bị thay đổi.
            9. **Strategy:** Bao bọc một họ các thuật toán bằng các lớp đối tượng để thuật toán có thể thay đổi độc lập đối với chương trình sử dụng thuật toán.Cung cấp một họ giải thuật cho phép client chọn lựa linh động một giải thuật cụ thể khi sử dụng.
            10. **Template method:** Định nghĩa phần khung của một thuật toán, tức là một thuật toán tổng quát gọi đến một số phương thức chưa được cài đặt trong lớp cơ sở; việc cài đặt các phương thức được ủy nhiệm cho các lớp kế thừa.
            11. **Visitor:** Cho phép định nghĩa thêm phép toán mới tác động lên các phần tử của một cấu trúc đối tượng mà không cần thay đổi các lớp định nghĩa cấu trúc đó.
 
 - **Một số lưu ý:** MVC, MVVM, V.I.P.E.R, MVP, Redux,… là gì? Chúng thường được biết đến đại điện cho kiến trúc hệ thống, nhưng thật ra, chúng có thể coi là Architectural Pattern, và đúng vậy, cũng có thể coi chúng là design pattern ( thực tế có khá nhiều bài viết và tài liệu đề cập chúng như là design pattern). Tuy nhiên chúng không thuộc loại nào trong 3 loại trên, do đó, mong các bạn hiểu rõ về thực chất của sự phân loại này.
## 5. Thời điểm tốt để sử dụng Design Patterns
- Khi bạn muốn giữ cho chương trình của mình thực sự đơn giản. Việc sử dụng các design pattern sẽ giúp chúng ta giảm được thời gian và công sức suy nghĩ ra các cách giải quyết cho những vấn đề đã có lời giải.
## 6. Nghiên cứu Design Pattern cần những kiến thức gì ?
- **Kiến thức về lập trình hướng đối tượng (OOP)**:
    + Chúng ta đang bàn về Design Pattern trong OOP, hiển nhiên rằng kiến thức, tư duy về OOP là điều bắt buộc. Trước hết, bạn cần hiểu, nắm bắt, và vận dụng được những đặc trưng và tính chất của lập trình hướng đối tượng. Rất nhiều Design Pattern, thực chất chỉ là cách vận dụng các tính chất của OOP một cách mềm dẻo và linh hoạt. Tôi khuyến khích các bạn nên rà soát lại kiến thức của mình về OOP cẩn thận, cần hiểu rõ tính chất trừu tượng, đa hình, ...
    + Bỏ tư duy theo lối cấu trúc, nâng tư duy hoàn toàn OOP.
- **Ngoài ra bạn nên tìm hiểu về cách đọc sơ đồ Diagram**
    + Design Pattern trong OOP là template, concept phục vụ cho vấn đề thiết kế, chẳng có gì dễ hiểu và trực quan để nhìn nhận và nghiên cứu thiết kế bằng việc vẽ, thể hiện nó dưới dạng sơ đồ (Diagram) cả. Biểu đồ thường được dùng để minh họa cho Design Pattern có tên gọi Sơ đồ Lớp (Class Diagram).
    ![](https://images.viblo.asia/12e941bb-5d2e-4bff-8b86-6abdb819781c.png)

## 7. Liệu Design Patterns có nhược điểm ?
- Design Pattern chỉ là một cách để giải quyết vấn đề thiết kế, và nó không phải là cách duy nhất. Do đó, bạn cần thực sự tỉnh táo và linh hoạt, nếu bạn là team lead, nên xem xét và cân nhắc các giải pháp hoặc pattern khác nữa, dựa trên kinh nghiệm của team members và vấn đề thực tế.
- Design pattern có 1 số nhược điểm như : nó khiến thiết kế của bạn đôi khi phức tạp và khó debug hơn, hoặc bản thân Design Pattern đó cũng đã có nhược điểm, nhưng người ta vẫn sử dụng vì ưu điểm của nó vượt trội so hơn với mặt nhược. 
- Trường hợp hay gặp nhất là áp dụng bừa bãi Singleton Pattern vào source code dẫn đến khó kiểm soát được instance của đối tượng,...
    + ===> Như vậy ta thấy rằng design patterns cũng có nhược điểm của nó. Cái gì quá cũng không tốt. Vậy nên hãy cân nhắc trước khi sử dụng một loại pattern nào đó.
## Kết luận
- Bên trên mình giới thiệu tổng quan, phân loại nhóm cũng như ưu nhược điểm của Design Pattern. Trong những phần tiếp theo, chúng ta sẽ đi sâu hơn vào từng loại pattern hay gặp và quan trọng để cùng nhau tìm hiểu và học tập.
- Bài viết trên là cá nhân tìm hiểu nên có thể đúng, có thể sai, mong được mọi người góp ý để mình có thể hoàn thiện kiến thức hơn nữa.
- Cảm ơn mọi người đã đọc bài của mình
- Tài liệu tham khảo:
    + https://gpcoder.com/4164-gioi-thieu-design-patterns/#De_hoc_Design_Patterns_can_co_gi
    + https://teky.edu.vn/blog/design-pattern-la-gi/
    + https://www.swiftyvn.com/2018/09/tong-quan-ve-design-pattern/#ph%C3%A2n-lo%E1%BA%A1i-design-pattern