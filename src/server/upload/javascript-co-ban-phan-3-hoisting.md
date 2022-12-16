Chắc hẳn khi sử dụng JavaScript bạn đã từng nghe đến khái niệm **hoist**, hoisting thế này, hoisting thế kia. Trong bài viết này chúng ta sẽ cùng tìm hiểu khái niệm hoist trong JavaScript là thế nào. Trước tiên khi hiểu về hoist, chúng ta cần hiểu "Hoisting" chỉ là một quy ước tiếng anh được tạo ra để thảo luận về ý tưởng của Lexical scope mà không cần nghĩ đến Lexical scope.

Trong bài viết này chúng ta sẽ giải thích lý do tại sao nó không tồn tại và thậm chí không thể tồn tại trong một số trường hợp. Trước khi bắt đầu, bạn cần hiểu về một số thuật ngữ đáng sợ như Lexical Environment, Syntax Parsers, Execution Contexts trong các bài viết trước.

# Hoisting là gì

Chúng ta hãy xem xét một hiện tượng xảy ra trong JavaScript mà mọi người cảm thấy ngạc nhiên và có lẽ hơi khó hiểu. Mình có một biến đơn giản ở đây là `a` và một funtion `b()`.


![](https://images.viblo.asia/59031cd5-4a46-4339-907c-9c50da0d279d.png)


Vậy trong trường hợp này bạn sẽ expect kết quả thế nào? Thông thường chúng ta sẽ expect `function b called` và sau đó là `Namaste Human`.

![](https://images.viblo.asia/6ddd244f-ae4a-45b1-8821-a21f90d7ae03.png)


Output chính xác với những gì chúng ta mong đợi. Giờ hãy thử thay đổi một chút khác biệt mà chỉ có thể xảy ra trong JavaScript mà không bất kì ngôn ngữ nào khác có thể làm. Chúng ta sẽ thử chuyển dòng code gọi function `b()` và console.log giá trị của `a` lên đầu đoạn code.


![](https://images.viblo.asia/910d4591-e358-4cd7-a877-4a5803379831.png)

Trong hầu hết các ngôn ngữ lập trình khác, bạn sẽ gặp lỗi vì các ngôn ngữ lập trình thường thực thi code của chúng từng dòng một, từ trên xuống dưới. Vì chúng ta chưa định nghĩa function b() nên chúng ta không thể sử dụng được nó. Tuy nhiên JavaScript thì lại không như thế.

Khi chúng ta chạy đoạn code trên, thay vì bị thông báo lỗi, nó đã in ra giá trị. Nhưng đối với biến `a` nó không phải là `Namaste Human` như chúng ta định nghĩa mà là một thứ gọi là `undefined`. Và mặc dù function `b()` của chúng ta được định nghĩa bên dưới dòng code gọi function, nó vẫn chạy.

![](https://images.viblo.asia/94fe66da-bede-4119-86d7-fad7049f444f.png)


Hiện tượng trên được gọi là Hoisting

# Cách hoisting hoạt động

Tuy nhiên cách nó được giải thích có thể khiến bạn có ấn tượng sai về Hoisting. Nếu bạn tìm kiếm một số cách giải thích về Hoisting trên mạng, có thể bạn sẽ hiểu rằng biến và function trong JavaScript sẽ được di chuyển lên đầu thông qua JavaScript engine, như thể là chúng được thực sự di chuyển vật lí lên trên cùng để chúng nó thể hoạt động không quan trọng chúng được đặt ở đâu.

Nhưng thông qua ví dụ trên, chúng ta có thể nói rằng cách giải thích đó không hoàn toàn đúng vì biến `a` không hề được set thành `Namaste Human`. Vì thế các dòng code không thực sự được di chuyển vật lí, nó giống như thế này hơn.

![](https://images.viblo.asia/97487dd8-4012-469a-96bd-fede5f70d38b.png)

Đoạn code trên cũng đưa ra output biến `a` là `undefined`

![](https://images.viblo.asia/573cf665-8265-435f-8e07-2d5b5bdf1fe5.png)

Như thể chúng ta đã khai báo một biến rồi set giá trị sau đó. Tuy nhiên, đó không phải là những gì đã xảy ra, bởi vì như mình đã nói, những gì JavaScript đang thực hiện không phải là những gì bạn đã viết. Nó đã được dịch bởi JavaScript engine.

Để hiểu JavaScript đang làm gì. Chúng ta cần tìm hiểu sâu hơn một chút về **Execution context** và cách nó được tạo ra. Lý do JavaScript hoạt động theo cách mà các biến và hàm có sẵn ở một mức độ nào đó, ngay cả khi chúng được viết ơ sau cùng trong code, là vì **Execution context** được tạo theo hai giai đoạn.


Giai đoạn đầu tiên được gọi là **Creation phase**.

Trong giai đoạn này, chúng ta đã biết rằng chúng ta có **Global object** được thiết lập trong bộ nhớ. Sau đó, chúng ta có **this**, **this** cũng được thiết lập trong bộ nhớ.

![](https://images.viblo.asia/c883319d-fbe5-4955-9690-05c2417557e1.png)

Hãy nhớ rằng, **this** luôn được tạo bên trong một  **Execution context**. Ngoài ra còn có một **Outer enviroment** được tạo ra.

![](https://images.viblo.asia/7c043937-82b9-4842-9c77-f9323b2070ac.png)

Trong **Creation phase**, khi trình phân tích cú pháp chạy qua code của bạn và bắt đầu thiết lập những gì bạn đã viết để dịch, nó nhận ra nơi bạn đã tạo biến và nơi bạn đã tạo các hàm và thiết lập nó vào creation space, memory space cho những biến và hàm đó.

Và đó là quá trình được mô tả theo kiểu hơi khó hiểu của **Hoisting**.

> JavaScript không thực sự di chuyển code lên đầu. Thực sự là trước khi code của bạn bắt đầu được thực thi từng dòng một, JavaScript engine đã set memory space cho tất cả các biến và tất cả các hàm mà bạn đã tạo.

Vì các hàm đó và các biến đó đã tồn tại trong bộ nhớ. Khi code bắt đầu thực thi từng dòng, nó đã có thể truy cập chúng. Tuy nhiên, khi nói đến các biến, nó có một chút khác biệt. Toàn bộ hàm được đặt vào memory space. Tuy nhiên, giai đoạn tiếp theo, giai đoạn thực thi, nó thực hiện gộp từng dòng mã của bạn lại từng dòng một, đó là khi các loại phép gán mới được thiết lập, lúc đó biến `a` mới thực sự được gán giá trị, còn trước đó, nó vẫn là undefined.

Tóm lại là khi JavaScript engine thiết lập memory space cho biến `a`, nó không biết giá trị cuối cùng sẽ là bao nhiêu. Nó có thể là bất cứ loại nào: một Object, một Function, một Array, một String, hoặc chỉ là một kí tự.

Cho đến khi JavaScript engine bắt đầu thực thi đoạn code, các biến sẽ được gán cho một giá trị được gọi là undefined. Có nghĩa là, oh tôi chưa biết giá trị biến này là bao nhiêu. Undefined cũng là giá trị mặc định nếu chúng ta không set giá trị cho biến.

>Tất cả các biến trong JavaScript ban đầu được đặt thành undefined và các hàm sẽ được set trong memory space.

Điều thực sự đang xảy ra ở đây là ở một đoạn nào đó trong **Lexical Environment** đã xảy ra một cái gì đó giống như thế này:

![](https://images.viblo.asia/5cfdbae1-43fe-4568-9c79-e61577d7cb87.png)

Vì vậy bạn không nên tin cậy vào Hoisting, vì nó có thể xảy ra vấn đề khi bạn muốn lấy giá trị của biến nhưng thực ra giá trị của nó lại là undefined và không giống giá trị bạn mong muốn. Bạn nên gọi các biến và function sau khi nó đã được khai báo và khởi tạo đầy đủ.

Giờ chúng ta đã hiểu vấn đề khi chúng ta nói về Hoisting. Trong giai đoạn đầu tiên của việc tạo **Execution context**, JavaScript engine sẽ thiết lập memory space cho các hàm và các biến mà nó tìm thấy, và nó sẽ được sử dụng khi nó bắt đầu thực thi code. Chúng ta đã có quyền truy cập vào chúng một cách hạn chế trước khi chúng xuất hiện thực tế bên trong **Lexical Environment**.

Nghe có thể khá khó hiểu, nhưng đơn giản hơn khi bạn hiểu rằng JavaScript engine sẽ thiết lập memory space cho các biến và hàm. Vì vậy, khi code bắt đầu thực thi, các biến và hàm đã ở trong bộ nhớ máy tính vì JavaScript engine đã xem xét code của bạn và đã thiết lập trước mọi thứ để sẵn sàng cho code bắt đầu thực thi.

# Hoisting Var, Let và Const

Những thứ dưới đây xảy ra với cả `let` và `const`:

![](https://images.viblo.asia/4bd8b3d0-7d1e-4d2a-85be-a34df70e17ce.png)

Bạn nghĩ chuyện gì sẽ xảy ra?

![](https://images.viblo.asia/be5c06f4-aa05-4cc4-8f39-d8bc289c2811.png)

Ở đây chúng ta lại nhận được lỗi **Reference Error**.

Nó xảy ra là bởi vì **Temporal Dead Zone**. Đừng lo lắng về khái niệm này. Nó chỉ đơn giản là khoảng thời gian từ lúc tạo biến đến khi khởi tạo mà bạn không thể truy cập vào nó. Chúng ta sẽ nói đến khái niệm này trong bài viết tiếp theo.

Vậy câu hỏi là vậy thì `let` và `const` không được hoisting hay sao?

**Chúng có được hoisting**, tuy nhiên trong trường hợp `var`, khi được khai báo nó sẽ được gán cho giá trị `undefined`, còn trong trường hợp của `let` và `const`: Chúng không được khởi tạo giá trị `undefined`.

# Tổng kết

* Code chúng ta viết không phải thứ được thực thi trực tiếp, JavaScript engine sẽ đọc đoạn code và quyết định.
* Bạn có thể gọi các **function** trong JavaScript mặc dù nó được khai báo sau đó, tuy nhiên điều này không áp dụng với các **biến**.
* Các khai báo **function** được hoisting và khởi tạo với tham chiếu đến hàm của chúng, tức là các hàm nằm toàn bộ trong bộ nhớ.
* Các **biến** và **function** trong JavaScript được hoisting. Điều đó không có nghĩa là chúng được chuyển lên đầu bởi JavaScript engine.
* **Hoisting** chỉ là một quy ước tiếng anh được tạo ra để thảo luận về ý tưởng của Lexical scope mà không cần nghĩ đến Lexical scope.
* Các **biến** được khai báo bằng **var** được lưu trữ và khởi tạo với `undefined`.
* Các biến được khai báo bằng let và const cũng được nâng lên! Nhưng bạn không thể truy cập nó trước khi họ khai báo. Đó là do Vùng chết tạm thời.
* Các biến được khai báo bằng **let** và **const** cũng được hoisting! Nhưng bạn không thể truy cập nó trước khi nó được khai báo. Đó là do Temporal Dead Zone.