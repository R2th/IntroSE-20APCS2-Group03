# 1. Lời mở đầu
Chúng ta đã nhiều lần nghe tới khái niệm xử lý đồng bộ (synchronous) và xử lý bất đồng bộ (asynchronous). Vậy khái niệm và sự khác nhau giữa sync và asnyc là gì ?

Nói một cách nôm na thì khi xử lý đồng bộ code sẽ được chạy tuần tự theo trình tự viết sẵn,  khi xử lý bất đồng bộ là khi đoạn code dưới vẫn có thể chạy mặc dù đoạn code ở phía trên chưa được xử lý hết.

# 2. Một minh hoạ cho xử lí đồng bộ (Synchronous processing).

Chúng ta hãy cùng liên tưởng đến ví dụ sau đây:

* Mr. X là 1 người thông thái, có thể giải quyết và trả lời mọi việc.
* Bạn muốn nhờ Mr. X trả lời hoặc giải quyết điều gì, hãy gọi điện trực tiếp cho ông ấy (chú ý rằng đây là cách liên lạc duy nhất).
* Bất cứ khi nào nhận được yêu cầu, Mr. X sẽ giải đáp ngay lập tức.
* Như vậy, muốn giải quyết gì thì cứ nhấc máy gọi Mr. X và nghe giải đáp ngay tức khắc, thế là công việc được xử lí xong.

 Đây có lẽ là 1 hình dung rõ ràng nhất về việc xử lí đồng bộ (xử lí tuần tự) trong thực tế: Đầu tiên, bạn hỏi, Mr. X lắng nghe, sau khi nhận yêu cầu thì bạn lắng nghe câu trả lời từ Mr. X, xong!!! Nhưng nếu vậy thì vấn đề phát sinh ở chỗ nào???
![](https://images.viblo.asia/fc33fd10-8e6d-4b37-8a52-e9d084917195.png)

 ### 2.1 Khi xử lí đồng bộ gặp vấn đề
Mr.X có thể giải quyết được mọi việc nên số lượng người hỏi ngày càng nhiều vấn đề phát sinh khi: bạn gọi điện cho Mr.X thì nhận được thông báo máy bận và không biết khi nào Mr.X rảnh để có thể gọi lại để tránh tình trạng bạn phải gọi lại nhiều lần mới được gặp giáo sư thì Mr.X nghĩ ra một giải pháp thay vì gọi trực tiếp thì giáo sư sẽ nhận trả lời thông qua tin nhắn.

* Giáo sư thuê anh Xoáy (gọi là Mr. M) để quản lí việc nhận tin nhắn (message). Các tin nhắn gửi tới Mr. X sẽ được sắp xếp theo đúng thứ tự gửi.
* Mọi yêu cầu xử lí bây giờ sẽ được gửi tới anh Xoáy (Mr. M), nhiệm vụ của Mr. M là quản lí messages và lần lượt đưa từng message cho Mr. X để nhờ giải quyết, cứ thế lần lượt đưa thêm từng xử lí một cho Mr. X khi message cũ đã giải quyết xong.
* Như vậy, một khi Mr. X tiếp nhận tới yêu cầu của bạn gửi, thì tên của bạn sẽ được nhắc tới (được gọi tới) để bạn có thể lắng nghe câu trả lời.

### Như vậy kiểu xử lý này là đồng bộ hay bất đồng bộ ?

Câu trả lời là : **Cả hai**

Khi bạn gửi yêu cầu, yêu cầu của bạn chưa được xử lí ngay, bạn chưa nhận được kết quả nhưng bạn vẫn có thể tiếp tục gửi tin nhắn khác, **đó là bất đồng bộ ở chiều gửi yêu cầu.**

Tuy nhiên, khi Mr. X đang trả lời 1 message của bạn, và lúc đó bạn cũng đang lắng tai nghe, thì đó xử lí **đồng bộ trong việc giải đáp từng message**.

# 3. Javascript – Một ngôn ngữ của xử lí bất đồng bộ

Khi ai đó nói Javascript là một ngôn ngữ xử lý bất đồng bộ, thì rất có thể là họ đang nói đến cơ chế xử lý theo dạng gửi message. Thật vậy, trong javascript hàm (function) sẽ không bao giờ được gọi và xử lý trực tiếp nó sẽ được xử lý thông qua các message.

Bộ máy xử lý bên trong của javascript gồm các thành phần chính như sau: 
1. Một hàng đợi tin nhắn (message queue). Message queue tiếp nhận các xử lí được gọi tới, mỗi hàm được gọi sẽ tương ứng là 1 message trong hàng đợi.
2. Một vòng lặp (**Event-loop**). Event-loop làm nhiệm vụ điều phối việc lấy các message đang có trong queue: mỗi lần **sẽ lấy 1 message ra khỏi queue để đem đi xử lí**, **trong quá trình xử lí thì event-loop sẽ đứng chờ cho tới khi message cũ được xử lí xong, sau đó sẽ tiếp tục lấy message mới trong queue để xử lí, và cứ lặp lại như thế.**
3. Stack xử lí (call stack). Call-stack là 1 ngăn xếp quản lí việc thực thi hàm và gọi lồng hàm (nested function), tức là: Với mỗi hàm vừa lấy ra khỏi queue để đem ra xử lí, thì nó sẽ tương ứng với **1 frame ở trong call-stack, nếu bên trong hàm này có gọi tới nhiều hàm con nữa, thì những hàm con này sẽ được thêm tiếp vào call-stack dưới dạng 1 frame mới của stack**. Và Javascript sẽ lần lượt xử lí call-stack này theo dạng first-in last-out (xử lí dạng stack), cho đến khi stack rỗng thì coi như message đó đã được xử lí xong.

**Hình vẽ sau sẽ giúp bạn hình dung rõ hơn về điều này:**
![](https://images.viblo.asia/de20b480-f960-45e1-9420-44dc0881bc7b.png)

Có thể thấy rằng, với mỗi message đang đợi ở trong queue, nó sẽ phải đợi cho tới khi call-stack hoàn toàn rỗng thì Event-loop mới thực hiện việc lấy message khác trong queue ra xử lí, và message mới lấy ra sẽ tương ứng với 1 frame mới trong call-stack.

# Tài liệu tham khảo
https://nhungdongcodevui.com/2017/07/19/javascript-hieu-ro-co-che-xu-li-dong-bo-va-bat-dong-bo-sync-vs-async-trong-javascript-p1/