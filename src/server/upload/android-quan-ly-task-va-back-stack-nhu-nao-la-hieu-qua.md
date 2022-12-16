# 1. Overview
**Task** hay còn gọi là "Tác vụ", là tập hợp những Activity mà người dùng tương tác khi thực hiện một công việc nhất định. Các Activity được sắp xếp trong một ngăn xếp (Stack),ngăn xếp sẽ xếp chồng các Activity, sắp xếp theo thứ tự mà mỗi Activity được mở. 

Ví dụ: một ứng dụng email có thể có một Activity để hiển thị danh sách các tin nhắn mới. Khi người dùng chọn một tin nhắn, một Activity mới sẽ mở ra để xem tin nhắn đó. Activity mới này được thêm vào ngăn xếp phía sau. Nếu người dùng nhấn nút back (quay lại), activity mới đó sẽ finish (kết thúc) và sẽ bị bật ra (poped off) khỏi ngăn xếp. 

Khi Activity hiện tại start 1 Activity khác, activity mới được đẩy lên trên cùng của ngăn xếp và lấy focus. Các activity trước đó vẫn còn trong ngăn xếp, nhưng bị dừng lại. Khi một activity dừng lại, hệ thống sẽ giữ trạng thái hiện tại của UI. Khi người dùng nhấn nút Quay lại, activity hiện tại được lấy ra từ đỉnh ngăn xếp (lúc này activity bị hủy) và activity trước đó sẽ được tiếp tục, quay trở lại trạng thái resume (trạng thái trước đó của UI được khôi phục). Các activity trong ngăn xếp không bao giờ được sắp xếp lại mà chỉ được push và pop từ ngăn xếp, push vào ngăn xếp khi started bởi activity hiện tại và pop khi người dùng rời khỏi nó bằng nút Quay lại. Như vậy, ngăn xếp hoạt động như một cấu trúc  "last in, first out". 
![](https://images.viblo.asia/62a3cec6-9da8-4a90-b209-eaaeb064028e.png)
Hình 1. Trình bày cách mà mỗi activity mới trong 1 task được thêm vào 1 item trong back stack. Khi người dùng nhấn nút back button, activity hiện tại sẽ bị hủy và activity trước đó sẽ trở về trạng thái resume.

Nếu người dùng tiếp tục nhấn Back, thì mỗi activity trong ngăn xếp được lấy ra (pop) để hiển thị activity trước đó, cho đến khi người dùng quay lại Màn hình chính (hoặc bất kỳ hoạt động nào đang chạy khi tác vụ bắt đầu). Khi tất cả các activity được xóa khỏi ngăn xếp, tác vụ không còn tồn tại.

**Task** có thể chuyển sang trạng thái "background" khi người dùng bắt đầu 1 task vụ mới hoặc di chuyển đến màn hình chính (Home Screen) thông qua nút Home. Khi ở chế độ "background", tất cả các activity trong Task đều bị dừng, nhưng ngăn xếp (back stack) cho Task vẫn còn nguyên vẹn, Task chỉ đơn giản là mất focus khi một Task khác diễn ra, như trong hình 2.

Một Task sau đó có thể quay trở lai trạng thái "Foreground" để user có thể chọn nơi chúng rời đi. 

Ví dụ, giả sử rằng tác vụ hiện tại (Task A) có 3 activity trong ngăn xếp, 2 current Activity. Người dùng nhấn nút Home, sau đó khởi động một ứng dụng mới từ trình khởi chạy ứng dụng. Khi màn hình chính xuất hiện, tác vụ A (Task A) sẽ đi vào trạng thái background. Khi ứng dụng mới khởi động, hệ thống sẽ bắt đầu một tác vụ cho ứng dụng đó (Task B) với ngăn xếp hoạt động của riêng nó. Sau khi tương tác với ứng dụng đó, người dùng trở lại Trang chủ một lần nữa và chọn ứng dụng ban đầu bắt đầu Nhiệm vụ A (Task A). Bây giờ, Nhiệm vụ A sẽ rơi vào trạng thái "Foreground", cả ba activity trong ngăn xếp của nó đều còn nguyên vẹn và activity ở đầu ngăn xếp lại tiếp tục. Tại thời điểm này, người dùng cũng có thể chuyển về Nhiệm vụ B bằng cách về Trang chủ và chọn biểu tượng ứng dụng đã bắt đầu tác vụ đó (hoặc bằng cách chọn tác vụ của ứng dụng từ Recents screen). Đây là một ví dụ về đa nhiệm trên Android. 
![](https://images.viblo.asia/4f03d615-224e-44bf-9c9b-0c793ab60d40.png)

# 2. Managing Tasks
Vậy quản lý task và back stack như thế nào là hợp lý?

Như mô tả ở trên, phương pháp tốt nhất sẽ là đặt tất cả các activity đã started liên tiếp trong cùng một Task vụ và trong ngăn xếp "last in, first out", đây là 1 cách hoạt động tuyệt vời cho hầy hết các ứng dụng và bạn không phải lo lắng về cách các activity của bạn được liên kết với các Task hoặc cách chúng tồn tại trong back stack. Tuy nhiên, bạn có thể quyết định rằng bạn muốn làm gián đoạn (interrupt) hành vi hay can thiệp vào quá trình đó.

Bạn muốn một activity trong ứng dụng của bạn bắt đầu một task mới khi nó được started (thay vì được đặt trong task hiện tại), hoặc khi bạn bắt đầu một activity, bạn muốn đưa ra một instance hiện có của nó (thay vì tạo 1 instance ở trên cùng của back stack), hoặc bạn muốn ngăn xếp của bạn xóa tất cả các activity ngoại trừ root activity khi user thoát khỏi task.

Bạn có thể thực hiện những việc này và hơn thế nữa, với các thuộc tính (attributes) trong thẻ <activity> trong file manifest và với các cờ (flag) khi mà bạn start 1 activity thông qua phương thức startActivity().
    
Các attributes chính mà bạn có thể sử dụng là: 
* taskAffinity
* launchMode
* allowTaskReparenting
* clearTaskOnLaunch
* alwaysRetainTaskState
* finishOnTaskLaunch
    
 Các intent flag mà bạn có thể sử dụng là:
* FLAG_ACTIVITY_NEW_TASK
* FLAG_ACTIVITY_CLEAR_TOP
* FLAG_ACTIVITY_SINGLE_TOP

    
Chi tiết sử dụng các attributes, flag này như thế nào, chúng ta cùng tìm hiểu tiếp theo đây nhé. :D
    
## 2.1 Defining launch modes
Launch modes cho phép bạn xác định cách mà một instance mới của một activity được liên kết với task hiện tại. Bjan có thể xác định các chế độ launch khác nhau theo 2 cách:
 - Cách 1 -  Sử dụng file manifest: Khi bạn khai báo một activity trong tệp manifest của mình, bạn có thể chỉ định cách activity sẽ liên kết với các tác vụ khi nó bắt đầu.
- Cách 2 - Sử dụng flag intent: Khi bạn gọi startActivity (), bạn có thể add một trong số các flag trên đi kèm theo Intent.
    
Như vậy, nếu Activity A bắt đầu Activity B, Activity B có thể định nghĩa trong file manifest của nó cách liên kết với Task hiện tại (nếu có) và Activity A cũng có thể yêu cầu Activity B nên liên kết với Task hiện tại như thế nào. Nếu cả hai Activity xác định cách Activity B nên liên kết với một Task, thì yêu cầu của Activity A (như được xác định trong mục đích) được thực hiện theo yêu cầu của Activity B (như được xác định trong file manifest của nó).
    

### 2.1.1 Using the manifest file
Khi khai báo một Activity trong tệp kê khai (Manifest) của bạn, bạn có thể chỉ định cách Activity sẽ liên kết với một tác vụ bằng cách sử dụng thuộc tính *launchMode* của thẻ <Activity>.

Thuộc tính *launchMode* chỉ dẫn về cách Activity sẽ được khởi chạy vào một tác vụ. Có bốn chế độ khởi chạy khác nhau mà bạn có thể gán cho thuộc tính *launchMode*:
- ***standard***  (default mode):
    Hệ thống tạo ra một instance mới của activity trong Task vụ mà nó được started thông qua intent. Activity có thể được khởi tạo nhiều lần, mỗi trường hợp có thể thuộc về các tác vụ khác nhau và một tác vụ có thể có nhiều trường hợp.
- ***singleTop***: Nếu một instance của activity đã tồn tại ở top của task hiện tại, hệ thống sẽ định hướng Intent đến cá thể đó thông qua một cuộc gọi đến phương thức onNewIntent () của nó, thay vì tạo một phiên bản mới của Activity. Activity có thể được khởi tạo nhiều lần, mỗi trường hợp có thể thuộc về các tác vụ khác nhau và một tác vụ có thể có nhiều trường hợp (nhưng chỉ khi Activity ở top ngăn xếp không phải là instance hiện có của Activity).
    
    Ví dụ: giả sử ngăn xếp của tác vụ bao gồm root Activity A với các activity B, C và D ở trên cùng (ngăn xếp là A-B-C-D; D ở trên cùng). Một Intent đến với activity D. Nếu D có launch modes là "standard", một instance mới của lớp được khởi chạy và ngăn xếp trở thành A-B-C-D-D. Tuy nhiên, nếu launch modes của D là "singleTop", thì instance của D nhận được Intent thông qua onNewIntent (), bởi vì nó ở trên cùng của ngăn xếp, ngăn xếp vẫn là A-B-C-D. Tuy nhiên, nếu một Intent đến activity  B, thì một instance B mới sẽ được thêm vào ngăn xếp, ngay cả khi launch modes của nó là "singleTop".
    
- ***singleTask***: Hệ thống tạo ra một Task vụ mới và khởi tạo activity ở root của task mới. Tuy nhiên, nếu một instance của activity đã tồn tại trong một tác vụ riêng biệt, thì hệ thống sẽ định hướng Intent đến instance hiện tại thông qua một cuộc gọi đến phương thức onNewIntent (), thay vì tạo một instance mới. Chỉ một instance của activity có thể tồn tại tại một thời điểm.
- ***singleInstance***: Tương tự như "singleTask", ngoại trừ việc hệ thống không khởi chạy bất kỳ activity nào khác vào tác vụ đang giữ instance. Activity luôn là thành viên duy nhất và duy nhất trong task của nó; bất kỳ activity nào được bắt đầu bởi cái mode này sẽ mở trong một Task riêng biệt.

### 2.1.2 Using Intent flags
Khi bắt đầu một Activity, bạn có thể sửa đổi liên kết mặc định của một activity thành task vụ của nó bằng cách including các flag trong Intent mà bạn cung cấp cho startActivity (). Các flag bạn có thể sử dụng để sửa đổi hành vi mặc định là:
- **FLAG_ACTIVITY_NEW_TASK**: Bắt đầu Activity trong một Task vụ mới. Nếu một tác vụ đang chạy cho Activity mà bạn hiện đang bắt đầu, thì tác vụ đó được đưa lên trước với trạng thái cuối cùng được khôi phục và activity nhận được Intent mới trong onNewIntent ().
Tương tự như giá trị launchMode "singleTask".
- **FLAG_ACTIVITY_SINGLE_TOP**: Nếu activity đang được bắt đầu là activity hiện tại (ở đầu ngăn xếp), thì instance hiện tại nhận được một cuộc gọi đến onNewIntent (), thay vì tạo một phiên bản mới của activity.
Tương tự như giá trị launchMode "singleTop".
- **FLAG_ACTIVITY_CLEAR_TOP**: Nếu Activity đang bắt đầu đã chạy trong tác vụ hiện tại, thì thay vì khởi chạy một instance mới của activity đó, tất cả các activity khác trên đầu (top) activity đó sẽ bị hủy và intent này được chuyển đến resume instance của activity thông qua onNewIntent ().

    FLAG_ACTIVITY_CLEAR_TOP thường được sử dụng cùng với FLAG_ACTIVITY_NEW_TASK. Khi được sử dụng cùng nhau, những flag này là một cách định vị một activity hiện tại trong một task vụ khác và đặt nó vào vị trí, nơi mà nó có thể respond đến Intent.
    
Bài viết của mình đến đây là kết thúc. Cám ơn mọi người đã đọc. Hẹn các bạn trong phần tiếp theo!