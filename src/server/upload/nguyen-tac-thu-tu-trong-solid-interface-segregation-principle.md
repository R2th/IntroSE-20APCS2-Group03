Câu chuyện về cái tên *Interface Segregation Principle* (ISP) có thể kể bắt đầu từ cái đồ thị dưới đây:
![](https://images.viblo.asia/53a94784-e222-49bc-b591-fcd1bf08b3ff.png)

Trong tình huống được minh hoạ trong đồ thị trên, có một vài user sử dụng các thao tác của class `OPS` (đặt tên class là OPS vì nó viết tắt của operations ấy mà). Giả sử rằng người dùng `User1` chỉ sử dụng method `op1`, `User2` chỉ sử dụng `op2`, `User3` chỉ sử dụng `op3`.

Giờ nếu như mà `OPS` là một class được viết bằng Java. Rõ ràng mà nói, trong trường hợp đó, source code của `User1` sẽ vô tình phụ thuộc vào `op2` và `op3`, mặc dù thậm chí còn chẳng call đến. Tại sao lại phụ thuộc thì về cơ bản là khi có một thay đổi trong source code của `op2` trong `OPS` sẽ khiến `User1` phải compile và deploy lại, mặc dù nó chẳng phải quan tâm tí nào đến sự thay đổi đó.

Vấn đề này có thể được giải quyết bằng việc tách riêng các thao tác vào các interface khác nhau như hình dưới.

![](https://images.viblo.asia/63d54eb2-9fd3-41ee-9f52-e5a2e3284a40.png)

Vẫn tiếp tục đặt giả thiết là chúng ta đang code cái đống trên bằng Java. Giờ thì source code của `User1` sẽ phụ thuộc vào `U1Ops` và `op1`, nhưng không phụ thuộc vào `OPS`. Do đó nếu có một thay đổi trong `OPS` mà `User1` không quan tâm tới sẽ không khiến `User1` phải compile và deploy lại.

## ISP và ngôn ngữ

Nếu để ý thì mọi người sẽ thấy luôn có một giả thiết về ngôn ngữ khi nói về ví dụ bên trên. Các kiểu ngôn ngữ static (như Java) bắt buộc lập trình viên phải khai báo rằng user phải `import`, hoặc `use`, hoặc `include`. Nếu xuất hiện khai báo `include` trong source code, điều này sẽ thiết lập một sự phụ thuộc (dependency) và sẽ sinh ra việc bắt buộc compile và deploy lại.

Trong các ngôn ngữ dynamic như Ruby và Python, các khai báo này không xuất hiện trong source code. Thay vào đó, các phụ thuộc được suy ra lúc runtime. Do đó không hề có các phụ thuộc source code để mà bị compile với chả deploy lại. Đây là lý do chính giải thích cho phát biểu rằng ngôn ngữ dynamic tạo ra một hệ thống flexible và ít kết dính hơn các ngôn ngữ static.

Thực tế này có thể khiến bạn kết luận rằng ISP là một vấn đề liên quan đến ngôn ngữ, chứ không phải là vấn đề về kiến trúc.

## ISP và kiến trúc

Cùng lùi bước về sau để thấy vấn đề này rõ hơn. Hãy nhìn vào động cơ gốc rễ của ISP, bạn có thể thấy có một mối quan tâm sâu sắc hơn đang ẩn giấu đâu đó. 

Nói chung, việc phụ thuộc vào các module có chứa nhiều thứ hơn mức bạn cần sẽ có hại. Điều này hiển nhiên là đúng với trường hợp các source code dependencies khi mà nó gây ra các vấn đề recompile và redeploy không cần thiết, nhưng nó cũng đúng cả với mức cao hơn nhiều, đó là tầng kiến trúc.

Giả dụ rằng có một kiến trúc sư đang làm việc trên một hệ thống S. Anh ta muốn *include* một framework F vào trong hệ thống. Giờ giả sử rằng author của F đã liên kết nó với một database D. Vậy ta có S phụ thuộc vào F, F phụ thuộc vào D.

![](https://images.viblo.asia/2397f540-50de-4f1c-9e3d-4320551256a1.png)

Giờ giả sử rằng D có chứa các tính năng mà F không sử dụng, và dĩ nhiên là, S cũng chẳng quan tâm gì. Cơ mà những thay đổi trên các feature bên trong D có thể khiến F phải redeploy và do đó khiến S phải redeploy. Thậm chí tệ hơn, lỗi của một trong các tính năng trong D có thể gây lỗi trên F và S.

## Kết luận
Bài học ở đây đơn giản là việc phụ thuộc vào thứ gì đó mà đem theo nó là những hành lý mà ta không cần đến có thể gây ra những rắc rối mà ta không ngờ tới.

Điều này sẽ được đề cập một cách chi tiết hơn ở một bài khác khi ta nói về Common Reuse Principle trong các bài liên quan đến sự gắn kết các Component trong bộ các nguyên tắc về Component.

-----

*Dịch và tham khảo từ [Clean Architecture: A Craftsman's Guide to Software Structure and Design (Robert C. Martin Series)](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)*