Mình viết bài viết này với mục đích chia sẻ những kiến thức mà mình học được về Kotlin Coroutines theo góc nhìn đơn giản nhất cho những ai tò mò về nó. Nếu bạn hiểu phần nào đó Kotlin Coroutines là gì và sử dụng được nó, nhiệm vụ của mình thành công rồi :D. Chúng ta sẽ tìm hiểu theo những topics sau:
* Coroutines là gì ?
* Tại sao cần Kotlin Coroutines?
* Hướng dẫn từng bước implementation Kotlin Coroutines trong Android
* Scopes trong Kotlin Coroutines
* Quản lý exception trong Kotlin Coroutines

Ở phần 1 này mình sẽ nói về 3 topic đầu giúp mọi người có cái nhìn tổng quan về Coroutines. Nào chúng ta hãy cùng chuẩn bị một tách cafe, một sự tập trung và bước vào phần đầu tiên thôi
## I. Coroutines là gì ?
**Coroutines = Co + Routines**

Ở đây **Co** là viết tắt của từ **cooperation**, **Routines** có ý nghĩa là **functions**. Hay nói cách khác **Coroutines** chính là việc các functions kết hợp với nhau
(It means that when functions cooperate with each other, we call it as Coroutines). 
Vẫn chưa rõ ràng lắm nhỉ, hãy cùng xem ví dụ dưới đây. Giả sử chúng ta có 2 functions là **functionA** và **functionB**

functionA:
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
functionB:
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
Khi chúng ta gọi functionA như bên dưới
```
functionA(1)
```
Lúc này **functionA** sẽ thực thi **taskA1** và chuyển quyền điều khiển cho **functionB** để thực hiện **taskB1**

Tiếp theo **functionB** sẽ thực thi **taskB1** và chuyển quyền điều khiển lại cho **functionA** để thực hiện **taskA2** và tiếp tục như vậy.

Điều quan trọng rút ra sau ví dụ trên là gì ? Chính là cách mà **functionA** và **functionB** kết hợp với nhau để chạy các **task**. 
* Với Kotlin Coroutines thì sự kết hợp trong ví dụ trên có thể được giải quyết rất dễ dàng mà không cần sử dụng đến **when** hay **switch case**. Đoạn code trên chạy một vài dòng của **functionA** rồi lại chạy một vài dòng của **functionB**, sau đó quay lại chạy một vài dòng của **functionA** và cứ tiếp tục như thế. Với tư tưởng đó, thực sự rất hữu dụng khi một thread đang ở trạng thái idle (không thực hiện công việc gì), trong lúc đó trên cùng 1 thread có thể thực thi 1 function khác, khai thác tối đa những ưu điểm của thread. 
* Kotlin Coroutines sẽ cho phép viết mã không đồng bộ theo cách đồng bộ. Chúng ta sẽ nói về điều này sau trong bài viết này.
Tóm lại, Coroutines giúp cho việc xử lý multitasking trở nên đơn giản hơn rất nhiều. Có thể nói, **Coroutines** và **Threads** đều là multitasking. Nhưng sự khác biệt đó là **Threads** được quản lý bởi OS (hệ điều hành) còn **Coroutines** được quản lý bởi Users. **Coroutines** còn được gọi là "lightweight threads" vì nó không map tới native thread, không yêu cầu context khi chuyển đổi trên bộ vi xử lý nên nó nhanh hơn.

Vậy *"không map tới native thread"* có ý nghĩa là gì vậy ?

Coroutines tồn tại trong rất nhiều ngôn ngữ. Về cơ bản Coroutines được chia thành hai loại:

* Stackless
* Stackful

Kotlin implements stackless coroutines — điều đó có nghĩa là các coroutines không có stack riêng chứa nó, vì vậy nó không map đến native thread.

Giờ đây bạn có thể hiểu đoạn định nghĩa dưới đây được viết trên trang chủ kotlinlang.org : 
> One can think of a coroutine as a light-weight thread. Like threads, coroutines can run in parallel, wait for each other and communicate. The biggest difference is that coroutines are very cheap, almost free: we can create thousands of them, and pay very little in terms of performance. True threads, on the other hand, are expensive to start and keep around. A thousand threads can be a serious challenge for a modern machine.
> 

**Nhưng hãy nhớ Coroutines không thay thế được threads, nó giống như một framework để giúp quản lý threads**
## II. Tại sao cần Kotlin Coroutines?
Hãy lấy một ví dụ đơn giản thường gặp trong ứng dụng Android đó là:
* Lấy thông tin User từ server
* Hiển thị thông tin User

```
fun fetchUser(): User {
    // make network call
    // return user
}
```

```
fun showUser(user: User) {
    // show user
}
```

```
fun fetchAndShowUser() {
    val user = fetchUser()
    showUser(user)
}
```

Khi chúng ta gọi hàm **fetchAndShowUser** , ide sẽ throw ra **NetworkOnMainThreadException**, điều đó có nghĩa là việc gọi đến network không được chấp nhận trên main thread. Có rất nhiều cách để giải quyết vấn đề này, đơn giản như là

* Sử dụng **Callback**: Gọi hàm **fetchAndShowUser** trên background thread và trả kết quả cho main thread sử dụng callback 
```
fun fetchAndShowUser() {
    fetchUser { user ->
        showUser(user)
    }
}
```
* Sử dụng **RxJava**: Cách này giúp chúng ta có thể giải quyết được nested callback (nested callback có thể hiểu đơn giản là chờ response của một api để lấy response đó làm param cho request tiếp theo) .
```
fetchUser()
        .subscribeOn(Schedulers.io())
        .observerOn(AndroidSchedulers.mainThread())
        .subscribe { user ->
            showUser(user)
        }
```
* Sử dụng **Coroutines**:
```
suspend fun fetchAndShowUser() {
     val user = fetchUser() // fetch on IO thread
     showUser(user) // back on UI thread
}
```
Đoạn code bên trên trông có vẻ synchronous (đồng bộ, thực hiện tuần tự) nhưng thực ra nó asynchronous (bất đồng bộ). Thật bất ngờ phải không :D.

## III. Hướng dẫn từng bước implementation Kotlin Coroutines trong Android
Đầu tiên, cần thêm 2 dòng dưới đây vào trong file build.gradle: 
```
dependencies {
  implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:x.x.x"
  implementation "org.jetbrains.kotlinx:kotlinx-coroutines-android:x.x.x"
}
```

Function fetchUser() được nêu ở phần trên giờ sẽ có dạng như sau:

```
suspend fun fetchUser(): User {
    return GlobalScope.async(Dispatchers.IO) {
        // make network call
        // return user
    }.await()
}
```

Function fetchAndShowUser() :

```
suspend fun fetchAndShowUser() {
    val user = fetchUser() // fetch on IO thread
    showUser(user) // back on UI thread
}
```

Function showUser() :

```
fun showUser(user: User) {
    // show user
}
```

Qua những dòng code ở trên chúng ta lại có thêm hai khái niệm mới cần tìm hiểu, đó là **Dispatcher** và **Suspend**. 
* **Dispatcher** : Dispatcher giúp Coroutines trong việc quyết định sẽ hoàn thành công việc trên thread nào. Có thể chia Dispatcher thành ba loại  **IO, Default, và Main** . IO Dispatcher dùng để làm việc với network. Default dùng để thực hiện những công việc liên quan tới CPU. Main chính là UI thread trong Android. Để sử dụng Dispatcher, cần gọi chúng bên trong async function.

* **Suspend** : Suspend function là 1 function có các trạng thái started, paused và resume.

![](https://images.viblo.asia/476054b9-9602-4354-b1b6-eda4c7e86926.png)

**Suspend function chỉ được gọi từ một coroutine hoặc một Suspend function khác**. Chúng ta có thể thấy rằng async function bao gồm từ khóa **Suspend**.

Vì vậy, fetchAndShowUser() chỉ có thể được gọi từ một Suspend function hoặc coroutine. Chúng ta không thể khai báo hàm onCreate của một Activity là Suspend function, muốn sử dụng Suspend function bên trong hàm onCreate() cần gọi nó từ coroutine như dưới đây:

```
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    
    GlobalScope.launch(Dispatchers.Main) {
        fetchAndShowUser()
    }
    
}
```

showUser sẽ chạy trên UI thread vì mình đã khai báo Dispatchers.Main để chạy hàm này. Có hai function trong Kotlin để start coroutines đó là:
* `launch{}`
* `async{}`

Phần này sẽ dừng ở đây, cùng chờ đón phần tiếp theo nhé ;) Mình sẽ giới thiệu các khái niệm về launch, async, và hai topic còn lại trong phần tiếp theo

Tài liệu tham khảo:
https://blog.mindorks.com/mastering-kotlin-coroutines-in-android-step-by-step-guide