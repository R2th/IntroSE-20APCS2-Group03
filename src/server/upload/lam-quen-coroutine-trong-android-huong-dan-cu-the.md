Mình viết bài này để chia sẻ tất tần tật hiểu biết của mình cũng như kiến thức mà mình tìm hiểu được về Coroutine.

Bài viết này được dùng từ một cách dân dã :laughing: dành cho các bạn muốn tìm hiểu về Coroutine nhưng chưa tìm được nguồn thông tin chính xác nhất thì có thể tham khảo ngay sau đây :grinning:

*Knowledge comes to those who crave for it.* Tạm dịch: Kiến thức chỉ đến với những ai khao khát có được nó :muscle::muscle::muscle:


Trong bài này chúng ta sẽ lần lượt đi qua các topic sau:

* **Coroutine là gì?**
* **Tại sao phải sử dụng Coroutine?**
* **Hướng dẫn chi tiết cách sử dụng Coroutine.**
* **Scope trong Coroutine nghĩa là gì?**
* **Xử lí Exception trong Kotlin Coroutine.**

Các framwork hiện tại cho phép chúng ta xử lí đa luồng nhưng không tránh khỏi những lúc rơi vào trường hợp không mong muốn như `callback hells` hoặc `blocking state` bởi vì chúng ta không có một cách nào đơn giản để đảm bảo thực thi một safe-thread.
Và Coroutine xuất hiện, một framework rất hữu ích và đầy đủ để quản lí concurrency một cách đơn giản.

Giờ hãy tìm hiểu xem Coroutine chính xác là cái giống gì :metal:


**Coroutine là gì?**

Coroutines = Co + Routines

Ở đây, Co nghĩa là cooperation - có thể hiểu là tương tác, Routine nghĩa là functions - từ này quá quen thuộc với dev tụi mình rồi :grinning:
Tức là việc các functions tương tác với nhau gọi là Coroutine.

![](https://images.viblo.asia/2272faec-4954-4d6a-8184-12684c0577e7.png)

Ví dụ: giả sử mình có hai functions gọi là `functionA` và `functionB` như dưới đây

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
Sau đó mình gọi functionA như sau: `functionA(1)`
Ở đây `functionA` sẽ thực thi task A1 và tiếp tục gọi tới `functionB` để thực thi task B1, sau đó gọi ngược lại `functionA` thực thi task A2 và cứ thế tiếp tục,...
Điều quan trọng ở đây là chúng ta thấy functionA và functionB đang tương tác với nhau. Với Kotlin Coroutine thì việc tương tác như trên sẽ được thực thi một cách dễ dàng hơn rất nhiều mà không cần dùng đến `switch case` or `when` như trong ví dụ ở trên.

Nhìn vào ví dụ trên chúng ta sẽ có các điểm cần chú ý như sau:
* **Đoạn code trên sẽ thực thi vài dòng ở `functionA` sau đó thực thi tiếp một số dòng ở `functionB`, xong lại quay về thực thi tiếp vài dòng ở `functionA` và cứ thế tiếp tục,... Điều này sẽ hữu ích trong việc ví dụ như chúng ta đang có một Thread và nó đang không làm gì trong vài giây, lúc này mình có thể tận dụng vài giây đó để thực thi vài dòng code ở một function khác sẽ giúp chúng ta tận dụng tối đa lợi ích của Thread.**
* **Một điều nữa là chúng ta có thể dùng Coroutine để viết code bất đồng bộ như cách một cách dễ dàng. Điều này sẽ được nói tới ở bên dưới bài viết.**

Và chúng ta có thể nói rằng Coroutine và Thread đều có điểm giống nhau là cả hai đều là ***multitasking***. Điểm khác nhau là ở chỗ ***Thread thì được quản lí bởi OS, Coroutine thì được quản lí bởi user*** như cái cách mà nó chỉ thực hiện vài dòng code trong một function tuỳ vào ý muốn của user.

Coroutine đã support được nhiều ngôn ngữ và nó có 2 loại: **Stackless**, **Stackful**
Kotlin implement Stackless Coroutine nên sẽ không có stack riêng và cũng không map tới native thread nên sẽ không tác động tới processor và vì thế nó sẽ nhẹ nhàng và nhanh hơn.
Có thể gọi Coroutine là Thread, nhưng là light-weight Thread(nhẹ hơn Thread bình thường). Nó có thể làm các việc của một Thread bình thường như chạy song song, chờ đợi và giao tiếp với nhau. Điểm khác biệt lớn nhất là Coroutine có chi phí rất thấp so với Thread, chúng ta có thể tạo ra hàng ngàn Coroutine một cách dễ dàng.

Nói nhiều rồi, giờ thì chúng ta đi vào tìm hiểu Coroutine hữu ích như thế nào :muscle::muscle::muscle::muscle::muscle:

**Tại sao cần Coroutine?**

Chúng ta đến với một use-case cơ bản nhất trong một chiếc app:
* **Fetch users từ server về**
* **Show users lên UI**

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
Khi chúng ta gọi hàm `fetchAndShowUser()` thì nó quăng ra cái exception NetworkOnMainThreadException tức là không được make network call ở main thread nha. Có nhiều cách để giải quyết vấn đề này:

**Dùng callback:** gọi `fetchUser()` trong background thread rồi trả về result thông qua callback
```
fun fetchAndShowUser() {
    fetchUser { user ->
        showUser(user)
    }
}
```
**Dùng RxJava:** cách tiếp cận thường dùng
```
fetchUser()
        .subscribeOn(Schedulers.io())
        .observerOn(AndroidSchedulers.mainThread())
        .subscribe { user ->
            showUser(user)
        }
```
**Dùng Coroutine:** Yup, chính là Coroutine
```
suspend fun fetchAndShowUser() {
     val user = fetchUser() // fetch on IO thread
     showUser(user) // back on UI thread
}
```
Chỗ này đây, đoạn code trên nhìn như bình thường (synchronous) nhưng thực chất đây chính là bất đồng bộ (asynchronous). Chúng ta sẽ tìm hiểu cách mà nó work ngay sau đây.

**Implement Kotlin Coroutine vào Android project**
Thêm Kotlin Coroutine dependencies vào project:
```
dependencies {
  implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:x.x.x"
  implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:x.x.x"
}
```
Bây giờ function `fetchUser()` sẽ được viết như sau:
```
suspend fun fetchUser(): User {
    return GlobalScope.async(Dispatchers.IO) {
        // make network call
        // return user
    }.await()
}
```
Đừng lo, chúng ta sẽ từ từ tìm hiểu những thứ này sau: **suspend, GlobalScope, async, await, and Dispatchers.IO**
Hàm `fetchAndShowUser` sẽ như thế này:
```
suspend fun fetchAndShowUser() {
    val user = fetchUser() // fetch on IO thread
    showUser(user) // back on UI thread
}
```
Và hàm showUser sẽ giữ nguyên như cũ:
```
fun showUser(user: User) {
    // show user
}
```

Chúng ta bắt đầu tìm hiểu hai thứ như sau:
**Dispatchers**: cái này nó giúp Coroutine xác định được cách mà nó sẽ work, ở đây có 3 loại Dispatchers: **IO, Default, and Main**. **IO** dùng để thực thi các task ở background như call network, access database,... **Default** dùng để làm các task liên quan đến CPU nhiều hơn. Còn **Main** chính là UI Thread trong Android. Để sử dụng được thì Dispatchers cần đặt trong async function như này:
`suspend fun async() // implementation removed for brevity`

**suspend**: một suspend function có thể start, pause, resume.

![](https://images.viblo.asia/2272faec-4954-4d6a-8184-12684c0577e7.png)

Suspend function chỉ được gọi trong một Coroutine hoặc một suspend function khác (cũng chứa key word suspend).
Như vậy hàm fetchAndShowUser cũng sẽ được gọi trong suspend function khác hoặc trong một Coroutine. Chúng ta không thể make cái hàm onCreate của Android thành suspend function nên sẽ có một cái Coroutine ở đây:
```
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    
    GlobalScope.launch(Dispatchers.Main) {
        // coroutine scope
        fetchAndShowUser()
    }
    
}
```
Tương tự ta có đoạn code bên dưới:
```
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    GlobalScope.launch(Dispatchers.Main) {
        val user = fetchUser() // fetch on IO thread
        showUser(user) // back on UI thread
    }
    
}
```
Hàm showUser sẽ chạy trên main thread bởi vì nó đang ở trong **Dispatchers.Main**
Có 2 cách để start một cái Coroutine:

* **launch{}**
* **async{}**

**Vậy thế nào là Launch và Async?**

Điểm khác nhau giữ 2 cái này là: `launch{}` thì không quan tâm kết quả trả về của cái Coroutine scope, còn `async{}` thì sẽ trả về instance của `Deferred<T>` thông qua hàm `await()`. Nói cách khác thì:

**launch{}:** chỉ chạy cái Coroutine scope.

**async{}:** chạy và trả về result.

Chúng ta đến với ví dụ để hình dung 2 cách này, mình có một function fetchUserAndSaveInDatabase như sau:
```
suspend fun fetchUserAndSaveInDatabase() {
    // fetch user from network
    // save user in database
    // and do not return anything
}
```
và mình sẽ sử dụng `launch` như bên dưới:
```
GlobalScope.launch(Dispatchers.Main) {
    fetchUserAndSaveInDatabase() // do on IO thread
}
```
Như vậy fetchUserAndSaveInDatabase sẽ không trả về bất kì cái gì và sau khi thực thi xong chúng ta có thể do something ở main thread.
Nhưng khi chúng ta cần một kết quả trả về thì `async` sẽ làm chuyện này, giả sử mình có 2 functions để return User như bên dưới:
```
suspend fun fetchFirstUser(): User {
    // make network call
    // return user
}

suspend fun fetchSecondUser(): User {
    // make network call
    // return user
}
```
Giờ thì hãy xem async thể hiện:
```
GlobalScope.launch(Dispatchers.Main) {
    val userOne = async(Dispatchers.IO) { fetchFirstUser() }
    val userTwo = async(Dispatchers.IO) { fetchSecondUser() }
    showUsers(userOne.await(), userTwo.await()) // back on UI thread
}
```
Ở đây 2 hàm `fetchFirstUser` và `fetchSecondUser` sẽ chạy song song, sau khi có result của cả 2 rồi đem gán cho 2 biến `userOne` và `userTwo` rồi chạy tiếp `showUsers`. Yeah và như vậy chúng ta đã hiểu thế nào là `launch` và `async` rồi, so easy :laughing:

Và tiếp theo, một cách khác để chúng ta có thể nhận về một result mà không cần dùng `async{}` rồi `await()` như bên trên. Đó chính là `withContext` , cùng xem mình chuyển đoạn code dùng `async` sang dùng `withContext` nha:
```
// async
suspend fun fetchUser(): User {
    return GlobalScope.async(Dispatchers.IO) {
        // make network call
        // return user
    }.await()
}
```

```
// withContext
suspend fun fetchUser(): User {
    return withContext(Dispatchers.IO) {
        // make network call
        // return user
    }
}
```
Yeah cả hai đều return một User nhưng có hai cách viết khác nhau. Nhưng có vài thứ mình cần take care ở đây về `async` và `withContext`, thử sử dụng `withContext` trong ví dụ `async` chạy hai hàm `fetchFirstUser` và `fetchSecondUser` song song ở trên:
```
GlobalScope.launch(Dispatchers.Main) {
    val userOne = withContext(Dispatchers.IO) { fetchFirstUser() }
    val userTwo = withContext(Dispatchers.IO) { fetchSecondUser() }
    showUsers(userOne, userTwo) // back on UI thread
}
```
Khi dùng withContext, đoạn code trên sẽ chạy tuần tự từ trên xuống thay vì song song như trước đó, đây cũng là điểm khác nhau của `async` và `withContext`.
Qua đó có vài điều được rút ra như sau:

* **Dùng `withContext` khi nào chúng ta không cần chạy song song.**
* **Dùng `async` chỉ khi nào chúng ta muốn chạy song song.**
* **Cả hai `async` và `withContext` đều dùng để return về một result.**
* **Dùng `withContext` khi cần chạy single task.**
* **Dùng `async` khi cần chạy multiple task và chúng sẽ chạy song song với nhau.**

Lúc nảy mình có nhắc tới Scope, vậy **Scope trong Coroutine là gì** ta?
Scope trong Coroutine rất hữu ích vì mình có thể chủ động cancel một background task khi activity chạy vào `onDestroy`,...
Giờ thì chúng ta sẽ tìm hiểu làm thế nào sử dụng Scope để handle một số tình huống :smile:

Giả sử có một activity implement một scope, một backgroud task nên được canceled càng sớm càng tốt khi activity vào `onDestroy`, chúng ta có đoạn code bên dưới:
```
class MainActivity : AppCompatActivity(), CoroutineScope {

    override val coroutineContext: CoroutineContext
        get() = Dispatchers.Main + job

    private lateinit var job: Job

}
```
Và đây là hàm onCreate(), onDestroy()
```
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    job = Job() // create the Job
}

override fun onDestroy() {
    job.cancel() // cancel the Job
    super.onDestroy()
}
```
Và bây giờ hãy xem cách launch như bên dưới:
```
launch {
    val userOne = async(Dispatchers.IO) { fetchFirstUser() }
    val userTwo = async(Dispatchers.IO) { fetchSecondUser() }
    showUsers(userOne.await(), userTwo.await())
}
```
Theo đó khi activity bị destroy thì nếu task này đang chạy cũng sẽ bị canceled.
Khi chúng ta cần một scope cho cả application, không giới hạn ở một activity thì sử dụng GlobalScope như thế này:
```
GlobalScope.launch(Dispatchers.Main) {
    val userOne = async(Dispatchers.IO) { fetchFirstUser() }
    val userTwo = async(Dispatchers.IO) { fetchSecondUser() }
}
```
Và trong trường hợp sử dụng `GlobalScope` thì khi activity bị destroy, các hàm fetch user `fetchFirstUser()`, `fetchSecondUser()` vẫn sẽ tiếp tục chạy. Vì thế nên cân nhắc việc sử dụng `GlobalScope` .

**Xử lí Exception trong Kotlin Coroutine**
Đây là một cách xử lí quan trọng, chúng ta cùng tìm hiểu ngay sau đây.

**1. Sử dụng launch:**
Có một cách là sử dụng try-catch:
```
GlobalScope.launch(Dispatchers.Main) {
    try {
        fetchUserAndSaveInDatabase() // do on IO thread and back to UI Thread
    } catch (exception: Exception) {
        Log.d(TAG, "$exception handled !")
    }
}
```
Một cách khác là sử dụng Handler, theo cách này chúng ta cần tạo một exception handler như thế này:
```
val handler = CoroutineExceptionHandler { _, exception ->
    Log.d(TAG, "$exception handled !")
}
```
Sau đó attach cái handler này vào một cái scope:
```
GlobalScope.launch(Dispatchers.Main + handler) {
    fetchUserAndSaveInDatabase() // do on IO thread and back to UI Thread
}
```
Nếu có xảy ra exception trong hàm fetchUserAndSaveInDatabase thì nó sẽ handle cái exception đó trong cái handler mà mình vừa attach.

Khi sử dụng activity scope, chúng ta  có thể attach handler vào trong `coroutineContext` như sau:
```
class MainActivity : AppCompatActivity(), CoroutineScope {

    override val coroutineContext: CoroutineContext
        get() = Dispatchers.Main + job + handler

    private lateinit var job: Job

}
```
Và sử dụng nó như sau:
```
launch {
    fetchUserAndSaveInDatabase()
}
```
**2. Sử dụng async:**
Khi sử dụng async, chúng ta cần dùng try-catch để handle exception như sau đây:
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

**Bây giờ hãy xem thêm vài cách xử lí exception trong một số use-cases:**
Giả sử chúng ta có 2 hàm call network như sau:
* **getUsers()**
* **getMoreUsers()**
Và được gọi tuần tự như thế này:
```
launch {
    try {
        val users = getUsers()
        val moreUsers = getMoreUsers()
    } catch (exception: Exception) {
        Log.d(TAG, "$exception handled !")
    }
}
```
Nếu 1 trong 2 hàm bị failed thì nó sẽ nhảy vào catch block. Nhưng giả sử mình cần return một list rỗng khi có exception xảy ra và tiếp tục thực thi thì mình sẽ add try-catch vào mỗi lần gọi hàm call network, đoạn code sẽ được sửa lại như sau:
```
launch {
    try {
        val users = try {
            getUsers()
        } catch (e: Exception) {
            emptyList<User>()
        }
        val moreUsers = try {
            getMoreUsers()
        } catch (e: Exception) {
            emptyList<User>()
        }
    } catch (exception: Exception) {
        Log.d(TAG, "$exception handled !")
    }
}
```
Như vậy với bất kì một lỗi nào xảy ra thì nó đều sẽ return ra một list rỗng và tiếp tục thực thi.

Bây giờ nếu như chúng ta muốn gọi 2 hàm trên bằng cách chạy song song thì có thể sử dụng `async`:
```
launch {
    try {
        val usersDeferred = async {  getUsers() }
        val moreUsersDeferred = async { getMoreUsers() }
        val users = usersDeferred.await()
        val moreUsers = moreUsersDeferred.await()
    } catch (exception: Exception) {
        Log.d(TAG, "$exception handled !")
    }
}
```
Với cách này, chúng ta sẽ đối mặt với một vấn đề đó là cho dù không có network error thì app của mình sẽ bị crash và đoạn code trên sẽ không nhảy vào catch block.
Để giải quyết vấn đề này, mình có thể dùng `coroutineScope` như bên dưới:
```
launch {
    try {
        coroutineScope {
            val usersDeferred = async {  getUsers() }
            val moreUsersDeferred = async { getMoreUsers() }
            val users = usersDeferred.await()
            val moreUsers = moreUsersDeferred.await()
        }
    } catch (exception: Exception) {
        Log.d(TAG, "$exception handled !")
    }
}
```
Giờ thì nếu có network error thì đoạn code trên sẽ nhảy vào catch-block.

Và mình lại giả sử, mình muốn return một empty list khi có network call error xảy ra và tiếp thực thi. Chúng ta sẽ sử dụng `supervisorScope` và add try-catch vào từ lời gọi hàm network như sau:
```
launch {
    try {
        supervisorScope {
            val usersDeferred = async { getUsers() }
            val moreUsersDeferred = async { getMoreUsers() }
            val users = try {
                usersDeferred.await()
            } catch (e: Exception) {
                emptyList<User>()
            }
            val moreUsers = try {
                moreUsersDeferred.await()
            } catch (e: Exception) {
                emptyList<User>()
            }
        }
    } catch (exception: Exception) {
        Log.d(TAG, "$exception handled !")
    }
}
```
Và đó là cách sử dụng của `supervisorScope`

**Kết luận:**
* Khi **không** sử dụng async, chúng ta có thể dùng `try-catch ` hoặc `CoroutineExceptionHandler` để xử lí trong mọi tình huống.
* Sử dụng async, add `try-catch` thì chúng ta có 2 lựa chọn: `coroutineScope` và `supervisorScope`.
* Sử dụng async cùng `supervisorScope` thì chúng ta sẽ add `try-catch` vào mỗi lời gọi hàm mà chúng ta muốn khi nó xảy ra exception sẽ nhảy vào catch block trong một `try-catch` top level.
* Sử dụng async cùng `coroutineScope` trong một top level `try-catch` khi chúng ta muốn nó sẽ nhảy vào catch block ngay khi xảy ra exception.

**Cần lưu ý là `coroutineScope` sẽ cancel bất cứ khi nào có exception, nếu chúng ta muốn tiếp tục thực thi taskB() khi taskA() bị failed thì có thể sử dụng `supervisorScope`.**

Đó là những cách có thể xử lí exception có thể được thực hiện bằng Kotlin Coroutine.

Với tất cả những thứ mình đã chia sẽ thì ít nhiều cũng giúp ích được cho cách bạn mới bắt đầu tìm hiểu về Coroutine. Mong là những điều này thực sự mang lại lợi ích :v 
Đây cũng là bài viết đầu tiên của mình, nếu có sai sót thì hãy góp ý dưới comment để mình hoàn thiện hơn trong các bài viết sau ^^ 

Tham khảo: 
https://blog.mindorks.com/mastering-kotlin-coroutines-in-android-step-by-step-guide

Thanks for reading and happy learning.