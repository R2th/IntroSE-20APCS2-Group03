# Mở đầu
Activity có lẽ là một thành phần cơ bản nhất của một ứng dụng Android. Một lập trình viên Android cần phải nắm vũng được các khái niệm cũng như cách hoạt động của một activity để có thể xây dựng nên một ứng dụng tốt. Nói về activity, việc hiểu rõ về Task và Back Stack cũng là một phần hết sức quan trọng. Bài viết này sẽ trình bày về Task và Back Stack, cũng với đó là một số vấn đề liên quan tới chúng. Hi vọng những kiến thức bài viết cung cấp sẽ có ích với mọi người.
# Giới thiệu về Task và Back Stack trong Android
Một **task** là một tập hợp các activity mà người dùng tương tác khi thực hiện một công việc nhất định. Các activity này được sắp xếp trong một ngăn xếp (stack), được gọi là **back stack**. Trong back stack, activity được sắp xếp theo thứ tự mỗi activity được mở. Ví dụ, một ứng dụng email có thể có một activity để hiển thị danh sách cách email. Khi người dùng chọn một email, một activity được mở ra để hiển thị email đó. Activity này sẽ được thêm vào trong back stack. Nếu người dùng nhấn vào nút điều hướng Back, activity này sẽ được finish và pop ra khỏi stack.
Khi có nhiều ứng dụng chạy đồng thời trong một môi trường đa cửa sổ, được hỗ trợ từ Android 7.0 (API 24) trở lên, hệ thống sẽ quản lý các task riêng biệt cho mỗi cửa sổ; mỗi cửa sổ có thể có nhiều task.
Màn hình Home của thiết bị là điểm bắt đầu cho hầu hết các task. Khi người dùng chạm vào một icon của ứng dụng trong app launcher, task của ứng dụng đó sẽ đi vào foreground. Nếu không có task nào của ứng dụng đó đang tồn tại, một task mới sẽ được tạo và "main" activity của ứng dụng đó sẽ được mở và trở thành root activity trong stack.
Khi activity hiện tại bắt đầu một activity khác, activity mới sẽ được push vào top của stack và lấy focus từ activity trước đó. Activity trước đó vẫn tồn tại trong stack, nhưng nó sẽ bị dừng lại. Khi activity dừng lại, hệ thống lưu giữ lại trạng thái hiện tại của giao diện người dùng của nó. Khi người dùng nhấn nút Back, activity hiện tại sẽ bị pop ra khỏi vị trí top của stack (activity đó sẽ bị destroy) và activity trước đó sẽ quay trở lại (trạng thái trước đó của UI của activity được khôi phục). Activity trong stack sẽ không bao giờ được sắp xếp lại, chỉ có push vào stack khi một activity mới được bắt đầu và pop ra khỏi stack khi người dùng rời khỏi activity bằng cách nhấn nút Back. Như vậy, back stack hoạt động theo nguyên tắc "last in first out".
Hình dưới đây mô tả một ví dụ về hoạt động của back stack:
![](https://images.viblo.asia/c2237e44-0d4c-486a-a643-6056edf61c77.png)

Một task có thể đi vào background khi mà người dùng bắt đầu một task mới hoặc đi tới màn hình Home, thông qua nút Home. Khi ở trong background, tất cả activity trong stack đều bị dừng lại, nhưng back stack của task vẫn còn nguyên vẹn, task chỉ đơn giản là bị mất focus khi task khác đang chiếm vị trí. Một task có thể quay trở lại foreground và người dùng có thể quay trở lại thời điểm họ đã rời đi. Giả sử, ta có một task (Task A) với 3 activity trong stack, và task này đang nằm ở foreground. Khi người dùng nhấn nút Home, sau đó bắt đầu một app mới từ app launcher. Khi màn hình Home xuất hiện, Task A đi vào background. Khi ứng dụng được khởi chạy, hệ thống sẽ tạo một task cho ứng dụng đó (Task B) với stack cho các activity của tiêng nó. Sau khi sử dụng ứng dụng, người dùng quay trở về màn hình Home một lần nữa và chọn ứng dụng đã bắt đầu Task A ban đầu. Khi đó, Task A sẽ đi vào foreground, cả 3 activity trong stack của nó vẫn còn nguyên vẹn và activity ở top của stack sẽ tiếp tục. Tại thời điểm này, người dùng cũng có thể chuyển về Task B một lần nữa bằng cách quay về màn hình Home và chọn ứng dụng tương ứng hoặc sử dụng màn hình Recents để chọn ứng dụng. Đây là ví dụ của multitasking trong Android.

Bởi vì các activity trong stack sẽ không bao giờ được sắp xếp lại, nếu ứng dụng của chúng ta cho phép người dùng bắt đầu một activity cụ thể từ nhiều hơn một activity, một instance mới của activity đó sẽ được tạo và push vào stack (thay vì đem instance đã tồn tại của nó lên top của stack). Như vậy, một activity trong ứng dụng có thể được khởi tạo nhiều lần (kể cả từ những task khác nhau). Cùng với đó, nếu người dùng điều hướng bằng nút Back, mỗi instance của activity sẽ xuất hiện theo thứ tự chúng được mở với các trạng thái UI của riêng chúng. Tuy nhiên, chúng ta hoàn toàn có thể thay đổi điều này nếu không muốn activity được khởi tạo nhiều hơn một lần.
# Quản lý Task
Cách mà Android quản lý task và back stack - bằng cách đặt tất cả activity được bắt đầu vào cùng một task và trong một stack hoạt động theo kiểu "last in first out" - sẽ hoạt động tốt cho hầu hết các ứng dụng và ta không cần lo lắng về cách các activity được liên kết với task cũng như cách chúng tồn tại trong back stack. Tuy nhiên, ta có thể quyết định thay đổi cách hoạt động bình thường này. Giả sử ta muốn một activity trong ứng dụng bắt đầu một task mới khi nó khởi chạy (thay vì được đặt vào task hiện tại), hay là khi ta khởi chạy một activity, ta muốn đem instance (nếu) đang tồn tại của nó lên top của task (thay vì tạo một instance mới), hoặc là ta muốn back stack sẽ xóa tất cả activity ngoại trừ root activity khi người dùng rời khỏi task.
Ta có thể làm tất cả những việc này và nhiều hơn nữa với những thuộc tính của thẻ `<activity>` trong file manifest hay các flag của intent mà ta truyền vào khi gọi phương thức `startActivity()`.
Các thuộc tính của activity mà ta có thể sử dụng có thể kể tới:
* `taskAffinity`
* `launchMode`
* `allowTaskReparenting`
* `clearTaskOnLaunch`
* `alwayRetainTaskState`
* `finishOnTaskLaunch`

Cùng với đó, các giá trị flag của intent ta có thể sử dụng là:

* `FLAG_ACTIVITY_NEW_TASK`
* `FLAG_ACTIVITY_CLEAR_TOP`
* `FLAG_ACTIVITY_SINGLE_TOP`
Sau đây, ta sẽ đi vào ý nghĩa của từng thuộc tính và flag của intent, để có thể định nghĩa cách activity được liên kết với task và cách chúng được xử lý trong back stack.
## Định nghĩa launch mode
Launch mode cho phép ta định nghĩa cách mà một instance mới của một activity được liên kết với task hiện tại. Ta có thể định nghĩa launch mode theo hai cách:
* Sử dụng file manifest: Khi ta khai báo một activity trong file manifest, ta có thể chỉ định cách mà activity được liên kết với task khi nó bắt đầu
* Sử dụng flag của intent: Khi ta gọi tới phương thức `startActivity()` và truyền vào intent để khởi chạy một activity, ta có thể thêm một hay nhiều flag vào intent để chỉ định cách mà activity được liên kết với task hiện tại.
Khi sử dụng cả hai cách trên với một activity, thì cách sử dụng flag của intent sẽ có quyền ưu tiên cao hơn, tức là launch mode được chỉ định trong intent sẽ được áp dụng cho instance của activity đó.
### Sử dụng file manifest
Để khai báo launch mode của một activity trong file manifest, ta sẽ dùng thuộc tính `launchMode` của thẻ `<activity>`.
Có giá trị ta có thể gán cho thuộc tính `launchMode`, bao gồm:
* `standard`:
Là giá trị mặc định. Hệ thống sẽ tạo một instance của activity trong task mà nó được bắt đầu và đưa intent tới nó. Activity có thể được khởi tạo nhiều lần, mỗi instance của activity có thể thuộc về nhiều task khác nhau, và một task có thể có nhiều instance của một activity.
Ví dụ, ta có một task với 3 activity là A, B, C. Từ activity C start activity C, thì một instance mới của nó sẽ được tạo và đẩy vào trong back stack.
![](https://images.viblo.asia/86c906ca-28b5-482b-954b-fece809d1e87.png)

* `singleTop`:
Tương tự như giá trị `standard`, ngoại trừ việc nếu activity được yêu cầu khởi chạy đang có một instance nằm ở top của task hiện tại, hệ thống sẽ đưa intent tới instance qua lời gọi phương thức `onNewIntent()` thay vì tạo một instance mới.
Vẫn ví dụ trên, nếu activity C được khai báo là `singleTop`, khi activity C yêu cầu khởi chạy một activity C mới, thay vì tạo instance mới như `standard` thì instance của C sẽ nhận được intent qua lời gọi phương thức `onNewInstance`.
![](https://images.viblo.asia/21dfe0c8-8c63-4b80-94d3-9ca533b10ad4.png)

* `singleTask`:
Hệ thống sẽ tạo một task mới, khởi tạo instance của activity và đưa vào vị trí root trong task mới. Tuy nhiên, nếu một instance của activity đã tồn tại trong một task nào đó, hệ thống sẽ đưa intent tới instance đã tồn tại đó, thông qua lời gọi tới phương thức `onNewInstance`. Chỉ có một instance của activity được tồn tại tại một thời điểm.
Ví dụ, ta có activity A, B và C trong một task, khi activity C yêu cầu khởi chạy activity D - được khai báo launch mode là `singleTask`, hệ thống sẽ tạo task mới và đẩy instance của activity D vào task đó. Tuy nhiên, giả sử nếu activity C yêu cầu chạy activity A - activity cũng được khai báo là `singleTask`, thì activity B và C sẽ bị destroy, activity A sẽ được đưa lên foreground và được gọi tới phương thức `onNewIntent()`
![](https://images.viblo.asia/28130043-622e-41e7-9d9f-e3fd0b1f7b24.png)

![](https://images.viblo.asia/9d03be3a-85f1-4d73-847a-51586a6996ac.png)

* `singleInstance`:
Tương tự như `singleTask`, ngoại trừ việc hệ thống sẽ không đưa thêm bất kỳ activity nào vào task mới được tạo để giữ instance của activity đó.
Ta lại có ví dụ, giả sử activity A, B đang nằm trong một task, và start một activity C - được khai báo là `singleInstance`, activity C sẽ khởi tạo và đưa vào một task mới. Từ activity C ta khởi tạo một activity D, thì activity D sẽ không được đưa vào cùng task với activity C mà sẽ đưa vào một task khác.
![](https://images.viblo.asia/a0379bf5-94b5-46cb-a11d-51f6da1c80d1.png)
### Sử dụng intent flag
Ngoài cách sử dụng thuộc tính `launchMode` để định nghĩa launch mode cho một activity như trên, ta còn có thể sử dụng flag của intent được truyền vào phương thức `startActivity` để định nghĩa launch mode. Các giá trị instance có thể được sử dụng:
* `FLAG_ACTIVITY_NEW_TASK`: tương tự như giá trị `singleTask` phía trên.
* `FLAG_ACTIVITY_SINGLE_TOP`: tương tự giá trị `singleTop` phía trên.
* `FLAG_ACTIVITY_CLEAR_TOP`:
Nếu activity chuẩn bị được start đã đang chạy trong task hiện tại, thay vì tạo một instance mới của activity đó, tất cả các activity ở phía trên sẽ bị destroy và intent này sẽ được đưa tới instance đã tồn tại đó thông qua phương thức `onNewInstance()`.
`FLAG_ACTIVITY_CLEAR_TOP` thường được sử dụng kết hợp với `FLAG_ACTIVITY_NEW_TASK`. Khi sử dụng cùng với nhau, chúng sẽ cho phép xác định một activity có tồn tại ở một task khác không và đưa nó tới vị trí có thể phản hồi instance.
## Task Affinity
Affinity sẽ chỉ định task mà activity sẽ được đưa vào khi chạy. Theo mặc định, tất cả các activity của cùng một ứng dụng sẽ có cùng affinity. Như vậy, các activity của cùng một ứng dụng sẽ chạy vào cùng một task. Tuy nhiên, ta có thể thay đổi điều này. Activity từ những ứng dụng khác nhau có thể chia sẻ một affinity, hoặc activity của cùng một ứng dụng có thể có affinity khác nhau.
Để khai báo affinity của một activity, ta sử dụng thuộc tính `taskAffinity` của thẻ `<activity>` trong file manifest. Thuộc tính này nhận vào giá trị là một string, phải là duy nhất từ package name mặc định được khai báo trong thẻ `<manifest>`.
Task Affinity sẽ được sử dụng trong hai trường hợp:
* Khi intent được sử dụng để khởi chạy activity chứa flag `FLAG_ACTIVITY_NEW_TASK`. 
Một activity, theo mặc định sẽ được chạy vào trong cùng một task với activity gọi phương thức `startActivity()`. Nó sẽ được push vào cùng back stack với activity gọi nó bắt đầu. Tuy nhiên, nếu intent dùng để chạy activity chứa flag `FLAG_ACTIVITY_NEW_TASK`, hệ thống sẽ tìm kiếm một task khác để đưa activity mới vào. Thường thường, nó sẽ là một task mới. Tuy nhiên, nó không bắt buộc phải vậy. Nếu có một task đã tồn tại có cùng affinity với activity đang chuẩn bị được khởi chạy, activity sẽ được đưa vào task đó thay vì tạo một task mới. Trong trường hợp một task mới được bắt đầu, nếu người dùng nhấn nút Home để rời khỏi nó, thì chúng ta cần có một cách nào đó để người dùng có thể quay trở lại task đó. Một vài trường hợp (như là notification manager) luôn bắt đầu một activity trong một external task, vậy nên chúng luôn đưa flag `FLAG_ACTIVITY_NEW_TASK` vào trong intent được truyền vào hàm `onStartActivity`. Nếu ta có một activity có thể được gọi bởi một thực thể bên ngoài và sử dụng flag này, hãy quan tâm tới cách người dùng có thể quay trở lại task sau khi nó đã bắt đầu, như là một launcher icon chẳng hạn.
* Khi một activity có thuộc tính `allowTaskReparenting` được set là true.
Trong trường hợp này, activity có thể di chuyển từ task nó được bắt đầu sang task nó được gán giá trị affinity, khi task đó đi vào foreground. Ví dụ, giả sử ta có một activity thông báo thời tiết trong một thành phố được chọn được coi là một phần của một ứng dụng du lịch. Nó có cùng affinity với những activity khác ở trong ứng dụng, và nó có thuộc tính `allowTaskReparenting` được set là true. Khi một activity nào đó khởi động activity thông báo thời tiết, nó sẽ đi vào cùng task với activity gọi nó bắt đầu. Tuy nhiên, khi task của ứng dụng du lịch đi vào foreground, activity đó sẽ được gán lại cho task của nó và được hiển thị trong nó.
## Dọn dẹp Back Stack
Nếu người dùng rời khỏi task trong một thời gian dài, hệ thống sẽ dọn dẹp các activity trong task ngoại trừ root activity. Khi người dùng quay trở lại task, chỉ có root activity được khôi phục. Hệ thống hoạt động theo cách này bởi có thể sau một khoảng thời gian dài, người dùng quay trở lại ứng dụng để bắt đầu một công việc mới thay vì tiếp tục công việc cũ trước đó.
Có một số thuộc tính ta có thể sử dụng để thay đổi điều này:
* `alwaysRetainTaskState`:
Nếu thuộc thính này được set là true trong root activity của task, tất cả activity trong stack của task đó sẽ luôn được giữ lại.
* `clearTaskOnLaunch`:
Nếu thuộc tính này được set là true trong root activity của task, bất kỳ khi nào người dùng rời khỏi task và quay trở lại, chỉ còn root activity được giữ lại, kể cả khi người dùng chỉ rời đi trong một thời gian ngắn. Có thể nói, thuộc tính này hoàn toàn ngược lại với `alwaysRetainTaskState`
* `finishOnTaskLaunch`:
Thuộc tính này tương tự như `clearTaskOnLaunch`, nhưng nó chỉ xảy ra trên một activity đơn lẻ, không phải trên toàn bộ task. Nó cũng có thể khiến bất kỳ activity nào bị hủy bỏ, kể cả là root activity. Khi nó được set là true, khi người dùng rời khỏi task, activity được set thuộc tính này sẽ không còn tồn tại.
## Tạo một Task
Ta có thể thiết đặt cho một activity như là điểm bắt đầu của một task bằng cách sử dụng thẻ `<intent-filter>` với "android.intent.action.MAIN" như là hành động được chỉ định và "android.intent.category.LAUNCHER" như là category được chỉ định.
Một intent filter kiểu này sẽ tạo một icon và một label cho activity để hiển thị trong app launcher, cho phép người dùng khởi chạy activity cũng như quay trở lại task mà nó tạo ra sau khi rời khỏi task. khả năng cho phép người dùng quay trở lại task sau khi rời đi bằng activity launcher là rất quan trọng. Vì lý do này, hai launch mode làm cho activity luôn tạo task mới là `singleTask` và `singleInstance` chỉ nên được dùng khi activity có một `ACTION_MAIN` và `CATEGORY_LAUNCHER` filter.
# Tổng kết
Trên đây là bài viết về Task và Back Stack cũng như một số vấn đề xung quanh chúng. Hi vọng bài viết có ích cho mọi người.
Bài viết có sử dụng tài liệu từ trang https://developer.android.com/guide/components/activities/tasks-and-back-stack.