Nếu là một lập trình viên phát triển ứng dụng trên nền tảng Android thì có thể bạn đã nghe đâu đó về Launch Mode hoặc có thể đã từng sử dụng nó trong dự án của mình. Còn nếu bạn chưa biết đến hoặc chưa thực sự hiểu về cách sử dụng của Launch Mode thì trong bài viết này mình sẽ cùng các bạn tìm hiểu qua về nó nhé.

Let's go!

## I : Launch Mode là gì?
LaunchMode trong Android là một mô tả cho hệ điều hành Android  cách mà các Activity trong một ứng dụng Android  sẽ được khởi tạo trong một task của chương trình.

Đó là một định nghĩa khá là trừu tượng về Launch Mode, tuy nhiên để hiểu rõ hơn về vấn đề này trước hết chúng ta nên có 1 cái nhìn tổng quan về 2 phần liên quan trực tiếp đến Launch Mode đó là :

* **Task**
* **Back Stack**

### 1: **Tổng quan về Task.**

#### 1.1: **Task là gì ?**
      

Theo như thông tin trong https://developer.android.com/  định nghĩa thì:

*A task is a collection of activities that users interact with when performing a certain job. The activities are arranged in a stack—the back stack)—in the order in which each activity is opened*

Dịch nôm na ra có nghĩa là Task là 1 nơi lưu trữ tập hợp các Activity của một chương trình ứng dụng mà người dùng có thể tương tác được với các Acticity đó khi ứng dụng được mở.

Thực tế rằng trong 1 ứng dụng có thể có rất nhiều Activity hoặc chỉ có 1 Activity. Khi người dùng mở lên một ứng dụng từ màn hình home thì một task cũng sẽ được tạo ra chứa instance của Activity đầu tiên trong ứng dụng đó. Một Task có thể chứa nhiều instance của nhiều activity khác nhau và cũng có thể chứa nhiều instance của cùng 1 Activity tùy vào cách người dùng định nghĩa LaunchMode của Activity đó.

Một điều cần lưu ý đó là trong 1 ứng dụng không chỉ có 1 task duy nhất mà nó có thể có nhiều task khác nhau lưu trữ nhiều instance của Activity. Activity nằm đầu tiên trong task được gọi là root hay top của task đó.

#### 1.2: **Trạng thái của Task.**

Một Task có thể có 2 trạng thái: Background hoặc Foreground.

Một Task ở trạng thái Foreground xảy ra khi khi người dùng đang tương tác trực tiếp với các Activity của app đó. Trường hợp khi người dùng nhấn trở về màn hình home của ứng dụng hoặc chuyển qua 1 app khác thì khi đó các Activity sẽ chuyển sang trạng thái onStop() và task của ứng dụng hiện tại sẽ chuyển từ trạng thái Foreground sang trạng thái Background và nếu một ứng dụng mới được mở lên thì task của ứng dụng đó sẽ chuyển sang trạng thái Foreground.

Đó cũng chính là cách thức hoạt động của một task.

### 2: **Tổng quan về Back stack.**

Nếu là 1 lập trình viên thì chắc hẳn bạn sẽ không hề xa lạ gì với khái niệm stack( ngăn xếp ). Một stack sẽ hoạt động theo cơ chế LIFO( Last in First out) và thứ tự mở các Activity trong 1 chương trình Android cũng tuân thủ theo nguyên tắc này. Khi một Activity được tạo mới bằng phương thức startActivity(intent) thì một Avtivity mới sẽ được tạo ra và sẽ được push vào trong Back stack và giữ focus vào Activity này, Activity trước đó sẽ vẫn được lưu lại trong Back Stack. Khi người dùng nhấn nút back trên thiết bị thì Activity hiện tại sẽ được pop ra khỏi Back stack và ứng dụng lúc này sẽ trở về màn hình trước đó. Trong trường hợp không còn Activity nào trong Back stack thì sẽ trở về màn hình home screen của device
 ![](https://images.viblo.asia/e48a8e89-8d93-4ca7-b72f-b13bed982dd3.png)
 
Đó là một số cái nhìn tổng quan về Task và Back Stack trong Android, tiếp theo chúng ta hãy cùng đi đến chủ đề chính của bài viết này nào.
 
##  II: **Tìm hiểu về LaunchMode trong Android.**
  Có 4 loại launchMode trong Android đó là:
 
**1. Standard**

**2. singleTop**

**3. singleTask**

**4. singleInstance**

Với mỗi loại launchMode sẽ quyết định việc khởi tạo instance của một Actitvity trong một task của ứng dụng.

Để khai báo Launch mode của activity thì lập trình viên cần thêm thông tin như bên dưới với mỗi activity trong file AndroidManifest.xml của dự án:

![image.png](https://images.viblo.asia/d2408313-732f-4d65-886f-5559bedf7b3e.png)

### 2.1: **Standard launchMode**

Standard là chế độ mặc định của 1 Activity, nếu như khi khởi tạo activity trong file AndroidManifest.xml bạn không khai báo gì thì mặc định Activity sẽ ở chế độ này.

*Vậy ở chế độ Standard thì Activity sẽ hoạt động như thế nào?*

Một Activity ở Standard launchMode sẽ luôn luôn khởi tạo nên 1 instance mới trong Task khi nó được gọi đến bởi Intent dù là Activity ấy đã tồn tại trước đó trong Task

![](https://images.viblo.asia/34d09b7e-83be-4881-8d70-fcf5a9e36b94.png)

Thực chất của Standard launchMode là việc các Instance của Activity sẽ liên tiếp xếp chồng nên nhau trong 1 task mỗi khi nó được start với *intent*

### 2.2: **singleTop launchMode.**

singleTop launchMode cũng có cơ chế tương tự như Standard khi nó có thể tạo ra nhiều Instance của một Activity trong cùng 1 task.Tuy nhiên có một điều khác biệt căn bản đó là chỉ có duy nhất 1 instance của một Activity được phép tồn tại trên top(hay root) của một task. Khi start 1 activity nếu nó đã có instance ở top của task đó thì thay vì tạo instance mới và chồng nên Activity hiện tại thì hàm onNewIntent() sẽ được gọi ra để khởi chạy Activity đó. 

Chúng ta có thể hiểu rõ hơn về cơ chế hoạt động của singleTop qua minh họa bên dưới:
![](https://images.viblo.asia/9c8aa7d7-20a6-4c3a-90a4-0837b3d5d497.png)

Trường hợp nếu activity được gọi đến đang không nằm ở top của task hiện tại thì một instance của activity đó sẽ được tạo ra và nằm trên top của task hiện tại.


### 2.3: **singleTask launchMode**

Ở mode này Activity sẽ chỉ có duy nhất 1 instance trong 1 task. Trong trường hợp khởi tạo activity này nếu nó đang nằm trong top của Task thì hàm onNewIntent() sẽ được gọi. Ngược lại thì chương trình sẽ pop tất cả các Activity phía trên của Activity đó trong task sau đó gọi đến hàm onNewIntent().

![](https://images.viblo.asia/8a30334e-3e75-4950-b9a9-eec3a046b8dd.png)

![](https://images.viblo.asia/01fece89-83c9-4b33-a6fe-a7103fa8a0ce.png)

Trong trường hợp activity đó chưa có trong task thì 1 instance mới của nó sẽ được tạo ra.

### 2.4: **singleInstance lauchMode**
singleTask và singleInstance đều giống nhau ở điểm chỉ có duy nhất 1 instance của 1 Activity được phép tồn tại trong 1 Task. Điều khác biệt duy nhất đó là sử dụng singleInstance thì mỗi khi Activity khi được gọi đến thì chương trình sẽ tạo ra 1 Task riêng biệt để chứa nó. Tức là 1 task chỉ chứa duy nhất 1 activity. 

![](https://images.viblo.asia/3ed6f068-7fee-4a74-92be-8c4b288433e5.png)


## 3: **Kết Luận:**

Đó là một số chia sẻ mà mình tìm hiểu về launchMode của Android. Tùy trong từng trường hợp khác nhau mà lập trình viên có thể sử dụng các mode khác nhau cho Activity trong dự án của mình. Hy vọng bài viết của mình hữu ích với bạn đọc

Mình có tham kháo thông tin ở một số nguồn thông tin bên dưới. Nếu có góp ý về bài viết mọi người có thể  comment để giúp bài viết của mình hoàn thiện hơn.

https://developer.android.com

https://medium.com/android-news/android-activity-launch-mode-e0df1aa72242