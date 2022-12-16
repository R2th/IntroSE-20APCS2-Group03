Xử lý bất đồng bộ là một vấn đề mà bất kỳ lập trình viên nào đều phải gặp phải. Hôm nay chúng ta hãy cùng nhau đi tìm hiểu một một framework xử lý bất đồng bộ vô cùng mạnh mẽ trong ngôn ngữ Kotlin. Đó là coroutines.

Để hiểu đơn giản, coroutines là một cách để viết code không đồng bộ một cách tuần tự. Thay vì tạo ra một mớ lộn xộn với callback, bạn có thể viết các code một lần sau tất cả. Một số trong số chúng sẽ có khả năng đình chỉ việc thực hiện và đợi cho đến khi kết quả sẵn sàng.
## 1. Coroutines là gì?
Coroutines được ghép giữa **Co** viết tắt của từ **Cooperation** nghĩa là **sự hợp tác** và **Routines** nghĩa là **chức năng**.
Có thể hiểu nó là khi các chức năng hợp tác với nhau, chúng ta gọi nó là **Coroutines**.

Chúng ta cùng hiểu nó qua ví dụ bên dưới:
![](https://images.viblo.asia/0ff00505-e0f9-4759-8de7-46e27e7e7f39.png)
Giả sử chúng ta có 2 hàm functionA và functionB
```
fun functionA(case: Int) {
    when (case) {
        1 -> {
            taskA1()
            functionB(1)
        }
        2 -> {
            taskA2()
            functionB(2)
        }
        3 -> {
            taskA3()
            functionB(3)
        }
        4 -> {
            taskA4()
            functionB(4)
        }
    }
}
```
```
fun functionB(case: Int) {
    when (case) {
        1 -> {
            taskB1()
            functionA(2)
        }
        2 -> {
            taskB2()
            functionA(3)
        }
        3 -> {
            taskB3()
            functionA(4)
        }
        4 -> {
            taskB4()
        }
    }
}
```
Mình sẽ giải thích một chút:
Khi chúng ta gọi `functionA(1)`
functionA sẽ làm taskA1 và gọi functionB(1), tiếp tục functionB sẽ làm taskB và gọi lại functionA(2)... cứ như thế cho đến taskB4. 

Ví dụ trên chính là một ví dụ về sự hợp tác lẫn nhau giữa các function với nhau. 
Trong Kotlin Coroutines, sự hợp tác như ví dụ trên có thể được thực hiện rất dễ dàng mà không cần sử dụng **when**.

Vậy là chúng ta đã có cái hình dung ban đầu về Coroutines rồi phải không. Đó là sự kết hợp giữa các chức năng. Và có những khả năng vô tận cái mà được mở ra với sự hợp tác tự nhiên giữa các functions.

Một vài khả năng như sau: 
* Nó có thể thực thi vài dòng của functionA và sau đó thực thi một vài dòng của functionB và quay lại thực thì một vài dòng của functionA... Điều này sẽ rất hữu ích khi mà một thread đang ở trạng thái không làm gì cả. Trong trường hợp này, nó có thể thực thi một vài dòng của function khác. Với cách này, nó có thể tận dụng tối đa những lợi thế của một thread.  Sự hợp tác này giúp cho quá trình đa nhiệm.
* Nó sẽ cho phép viết mã không đồng bộ theo cách đồng bộ.

Coroutine sẽ giúp việc đa tuyến trình trở nên dễ dàng hơn.

Coroutine và thread có điểm tương đồng là đều là **đa tuyến trình**. Nhưng có một điểm khác là thread được quản lý của hệ điều hành còn coroutine là bởi người dùng như là nó thực thi một vài dòng của chức năng bằng cách tận dụng sự hợp tác.

Coroutine là một framework tối ưu hóa được viết trên thread thực tế bằng cách tận dụng tính chất hợp tác của các chức năng để làm cho nó nhẹ hơn thread nhưng rất mạnh mẽ. Vì vậy chúng ta có thể nói Coroutine là một thread nhẹ. Gọi như vậy là vì nó không liên kết với luồng gốc, vì vậy nó không yêu cầu một context để chuyển đổi trong bộ xử lý, nên chúng sẽ nhanh hơn.

Vì sao lại nói Coroutines nó không liên kết với thread gốc?
Coroutines nó có ở rất nhiều ngôn ngữ lập trình. Về cơ bản, có 2 kiểu Coroutines:
* Stackless
* Stackfull
Ngôn ngữ Kotlin vận dụng **stackless coroutines**. Nó có nghĩa rằng coroutines không có ngăn xếp riêng, vì vậy nó không liên kết với thread gốc.

Chúng ta có thể tạo ra một nghìn coroutine, nhưng nó tốn rất ít hiệu năng của máy. Còn với một nghìn thread thì đó là một vấn để lớn đối với máy.

Có thể hiểu Coroutine nó không thay thế thread. Nó giúp như là một **framework** để quản lý thread.
## 2. Tại sao cần Kotlin Coroutines?
Chúng ta hãy xem qua ví dụ này: Chúng ta có một ứng dụng android có 2 chức năng sau đây:
*    Lấy dữ liệu từ server.
*    Hiển thị dữ liệu lên màn hình ứng dụng.
```
fun fetchUser(): User {
    // make network call
    // return user
}

fun showUser(user: User) {
    // show user
}

fun fetchAndShowUser() {
    val user = fetchUser()
    showUser(user)
}
```

Khi thực hiện đoạn lệch **fetchAndShowUser()** trên, nó sẽ bắn ra một ngoại lệ **NetworkOnMainThreadException** tại vì network là không được phép gọi ở main thread.

Để giải quyết việc đó chúng ta có một số cách xử lý như sau:
1. Sử dụng Callback: Chúng ta thực hiện đoạn code fetchUser() ở background thread và lấy dữ liệu trả về bằng callback.
 ```
 fun fetchAndShowUser() {
    fetchUser { user ->
        showUser(user)
    }
}
 ```
 2. Sử dụng RxJava: Đây là cách chúng ta có thể thoát ra khỏi các callback lồng nhau.
 ```
 fetchUser()
        .subscribeOn(Schedulers.io())
        .observerOn(AndroidSchedulers.mainThread())
        .subscribe { user ->
            showUser(user)
        }
 ```
 3. Sử dụng Coroutines:
 ```
 suspend fun fetchAndShowUser() {
     val user = fetchUser() // fetch on IO thread
     showUser(user) // back on UI thread
}
 ```
 Nhìn rất giống code đồng bộ nhưng thực chất nó là bất đồng bộ. Chúng ta hãy đi tìm hiểu xem làm sao nó làm như vậy được ở phần phía dưới.
 ## 3. Hướng dẫn từng bước triển khai Coroutines trong Android
 Trước tiên, chúng ta hãy tiến hành cài đặt Coroutines vào project:
 Thêm đoạn bên dưới vào file gradle :
 ```
 dependencies {
  implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:x.x.x"
  implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:x.x.x"
}
 ```
 
 Bây giờ hãy viết lại hàm fetchUser theo Coroutines:
 ```
 suspend fun fetchUser(): User {
    return GlobalScope.async(Dispatchers.IO) {
        // make network call
        // return user
    }.await()
}
 ```
 Đừng quá lo lắng, chúng ta sẽ tìm hiểu từng từ khó hiểu đó ở bên dưới nhé.
 
 Và ở hàm fetchAndShowUser() sẽ như thế này:
 ```
 suspend fun fetchAndShowUser() {
    val user = fetchUser() // fetch on IO thread
    showUser(user) // back on UI thread
}
```
Hàm showUser() chúng ta sẽ giữ nguyên nhé.

Giờ là thời điểm để giải thích những thắc mắc về từ khóa ở phía trên:
* Dispatchers: nó giúp Coroutines quyết định luồng làm việc nơi mà công việc phải được thực hiện. Có 3 loại chính đó mà: IO, Default và Main. IO dispatcher sử dụng dể làm việc với network và các công việc liên quan đến ổ đĩa. Default được sử dụng để xử lý những công việc chuyên sâu của CPU. Main thì không xa lạ gì nữa nó là UI thread của android. Để sử dụng chúng, chúng ta cần khai báo  dưới dạng async function. Async function sẽ trông giống như bên dưới:
```
suspend fun async()
```
* suspend: suspend function là một function có thể bắt đầu, dừng và tiếp diễn.
![](https://images.viblo.asia/3f793b96-d779-4aac-9dfd-d936a2d0bbe1.png)

Suspend functions chỉ cho phép được gọi từ một coroutine hoặc một suspend function khác. Bạn có thể thấy một async function bao gồm một từ khóa suspend. 

Vì vậy hàm fetchAndShowUser chỉ có thể được gọi từ một suspend function khác haowcj một coroutine Chúng ta không thể làm onCreate thành một function suspend, chúng ta cần phải họi nó từ một coroutines giống như bên dưới:
```
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    
    GlobalScope.launch(Dispatchers.Main) {
        fetchAndShowUser()
    }
    
}
```

Điều thực sự xảy ra, đó là:
```
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    GlobalScope.launch(Dispatchers.Main) {
        val user = fetchUser() // fetch on IO thread
        showUser(user) // back on UI thread
    }
    
}
```

Hàm fetchUser() sẽ được thực hiện ở background thread và showUser() sẽ chạy trên UI thread bởi vì chúng ta đã sử dụng Dispatchers.Main để khởi chạy nó.

Trong Kotlin có hai cách để khởi chạy một coroutines:
* launch{}
* async{}

Vậy điểm khác biệt giữa hai hàm này là gì?
Đó là launch{} sẽ không trả về bất cứ thứ gì và async{} trả về một thể hiện của Deferred<T>, nó có một await() function để trả về kết quả.
    
Chúng ta hãy tìm hiểu nó thông qua một ví dụ:
Có một function fetchUserAndSaveInDatabase giống như bên dưới: 
```
fun fetchUserAndSaveInDatabase() {
    // fetch user from network
    // save user in database
    // and do not return anything
}
 ```
    
Bây giờ chúng ta sẽ dùng launch như bên dưới:
```
GlobalScope.launch(Dispatchers.IO) {
    fetchUserAndSaveInDatabase() // do on IO thread
}
```
    
Với hàm fetchUserAndSaveInDatabase() sẽ không trả về gì cả, chún ta có thể sử dụng launch.

Nhưng khi chúng ta cần trả về kết quả, chúng ta cần sử dụng async.

Chúng ta có 2 function sẽ trả về dữ liệu là User như sau:
```
fun fetchFirstUser(): User {
    // make network call
    // return user
}

fun fetchSeconeUser(): User {
    // make network call
    // return user
}    
    
```
Chúng ta không cần thêm từ khóa suspend vì chúng ta không hề gọi một suspend function từ chúng.
    
Bây giờ, chúng ta có thể sứ dụng async giống như bên dưới:
    
```
GlobalScope.launch(Dispatchers.Main) {
    val userOne = async(Dispatchers.IO) { fetchFirstUser() }
    val userTwo = async(Dispatchers.IO) { fetchSeconeUser() }
    showUsers(userOne.await(), userTwo.await()) // back on UI thread
}    
```
    
Chúng ta thực hiện fetchData từ background và chờ đợi kết quả trả về ở UI thread.
    
Bây giờ chúng ta đã hiểu sự khác biệt giữa launch{} và async{}.

Có một cách khác để viết một async mà chúng ta không cần phải viết await() đó là withContext().
    
```
suspend fun fetchUser(): User {
    return withContext(Dispatchers.IO) {
        // make network call
        // return user
    }
}   
```
    
## 4. Scopes trong Kotlin Coroutines là gì?
 Scopes trong Kotlin coroutines là rất hữu dụng bởi vì chúng ta cần hủy các nhiệm vụ dưới background sớm nhất có thể khi một activity bị hủy. Bây giờ, chúng ta sẽ học cách để bắt được những loại tình huống.

Giả định rằng activity của chúng ta một scope, các công việc dưới background nên bị hủy sớm nhất có thể khi mà activity bị hủy.
    
Trong Activity, chúng ta cần thực thi một CoroutineScope:
```
class MainActivity : AppCompatActivity(), CoroutineScope {

    override val coroutineContext: CoroutineContext
        get() = Dispatchers.Main + job

    private lateinit var job: Job

}   
```
Ta sẽ khởi tạo Job trong onCreate():
```
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    job = Job() // create the Job
}
```
Và hủy nó ở hàm onDestroy():
```
override fun onDestroy() {
    job.cancel() // cancel the Job
    super.onDestroy()
}    
```
Bây giờ, ta có thể lấy dữ liệu như sau:
```
 launch {
    val userOne = async(Dispatchers.IO) { fetchFirstUser() }
    val userTwo = async(Dispatchers.IO) { fetchSeconeUser() }
    showUsers(userOne.await(), userTwo.await())
}
```
    
Vậy trước khi activity bị hủy, các công việc cũng sẽ bị hủy nếu nó đang chạy bởi vì chúng ta đã định nghĩa scope.

    
Khi chúng ta cần một global scope hay còn gọi là application scope, không phải là activity scope, chúng ta có thể sử dụng GlobalScope như bên dưới:
```
GlobalScope.launch(Dispatchers.Main) {
    val userOne = async(Dispatchers.IO) { fetchFirstUser() }
    val userTwo = async(Dispatchers.IO) { fetchSeconeUser() }
}
```
Ở đây, mặc dù nếu activity bị gọi destroyed, hàm fetchUser sẽ vẫn chạy bởi vì chúng ta đã sử dụng GlobalScope. 
    
Đây chính lý do mà Scopes trong Kotlin Coroutines rất hữu dụng.
## 5. Xử lý ngoại lệ trong Kotlin Coroutines
Xử lý gọi lệ mà một chủ đề quan trọng khác. Chúng ta cần phải học.

**Khi sử dụng launch**
Chúng ta cần tạo ra một xử lý ngoại lệ như bên dưới:
```
val handler = CoroutineExceptionHandler { _, exception ->
    Log.d(TAG, "$exception handled !")
}
```
Chúng ta sẽ kèm theo handler mỗi khi gọi launch(){}
```
GlobalScope.launch(Dispatchers.IO + handler) {
    fetchUserAndSaveInDatabase() // do on IO thread
}    
```

Mỗi khi có bất kỳ exception nào trong fetchUserAndSaveInDatabase, nó sẽ bắt bởi handler chúng ta đã thêm vào.

Khi sử dụng trong activity scope, chúng ta có thể kèm exception handler trong corountineContext như bên dưới:
```
class MainActivity : AppCompatActivity(), CoroutineScope {

    override val coroutineContext: CoroutineContext
        get() = Dispatchers.Main + job + handler

    private lateinit var job: Job

}
```
 Và sử dụng như sau:
```
 launch {
    fetchUserAndSaveInDatabase()
}
```
**Khi sử dụng async**

Khi sử dụng async, chúng ta cần use try-catch để bắt ngoại lệ:
```
val deferredUser = GlobalScope.async {
    fetchUser()
}
try {
    val user = deferredUser.await()
} catch (exception: Exception) {
    Log.d(TAG, "$exception handled !")
}    
```
Đây chính là cách xử lý ngoại có thể được hiện trong Kotlin Coroutines.

## Tổng Kết:
Coroutines sẽ là một giải pháp cực kỳ hiệu quả trong xử lý bất đồng bộ trong lập trình Android Kotlin. Vì tính đơn giản, gọn gàng và mạnh mẽ của nó. Mình tin chắc các bạn sẽ không khó để nắm bắt nó. Mong với bài viết này các bạn sẽ có cái nhìn từ tổng quan đến chi tiết về coroutine.
    
### Tham khảo: 
    - https://blog.mindorks.com/mastering-kotlin-coroutines-in-android-step-by-step-guide