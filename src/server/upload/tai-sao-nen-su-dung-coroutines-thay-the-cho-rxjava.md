# RxJava
RxJava là một công nghệ tuyệt vời mang đến cho chúng ta trải nghiệm nhà phát triển hoàn toàn khác nhau trên các ứng dụng Android vài năm trước, cho phép loại bỏ AsyncTask, Loaders và các công cụ khác vô hạn thay thế bằng những đoạn code ngắn gọn

RxJava gồm hai components chính là Observable và Observer

Chúng ta sẽ có 5 loại **Observable** sau

* Observable
* Single
* Maybe
* Flowable
* Completable

Tuy nhiên chúng ta chỉ có 4 loại **Observer** mà thôi

* Observer
* SingleObserver
* MaybeObserver
* CompletableObserver

Bảng dưới đây sẽ mô tả sự tương ứng giữa **Observable** và **Observer** cũng như số **emissions** của từng loại



| Observable | Observer |  Nums of emissions |
| -------- | -------- | -------- |
| Observable     | Observer     | Multiple or None     |
| Single     | SingleObserver     | One     |
| Maybe     | MaybeObserver     | 	One or None     |
| Flowable     | Observer     | Multiple or None     |
| Completable     | CompletableObserver     | None     |

Ví dụ: một interface của làm việc với API GitHub được tạo bằng RxJava sẽ như thế này:

```java
interface ApiClientRx {

	fun login(auth: Authorization) : Single<GithubUser>
	fun getRepositories(reposUrl: String, auth: Authorization) : Single<List<GithubRepository>>
	fun searchRepositories(query: String) : Single<List<GithubRepository>>
  
}
```

Mặc dù RxJava là một thư viện mạnh mẽ, nó không có nghĩa là được sử dụng như một công cụ để quản lý công việc bất đồng bộ. **Đây là một thư viện xử lý sự kiện**.

Ví dụ trên sử dụng Single là kết quả trả về từ api, Có thể nhận một vài giá trị hoặc lỗi

Đoạn code trong activity/fragment mà load dữ liệu có sử dụng interface trên:

```java

private fun attemptLoginRx() {
  val login = email.text.toString()
  val pass = password.text.toString()

  val auth = BasicAuthorization(login, pass)
  val apiClient = ApiClientRx.ApiClientRxImpl()
  showProgressVisible(true)
  compositeDisposable.add(apiClient.login(auth)
	.flatMap {
		user -> apiClient.getRepositories(user.reposUrl, auth)
	}
	.map { list -> list.map { it.fullName } }
	.subscribeOn(Schedulers.io())
	.observeOn(AndroidSchedulers.mainThread())
	.doAfterTerminate { showProgressVisible(false) }
	.subscribe(
			{ list -> showRepositories(this@LoginActivity, list) },
			{ error -> Log.e("TAG", "Failed to show repos", error) }
	))
}
```

Nếu đã quen thuộc với RxJava thì đoạn này khá dễ hiểu, tuy nhiên code này có một số bẫy ngầm:

## Performance

Mỗi dòng ở đây tạo ra một internal object (hoặc một vài) để thực hiện công việc. Đối với trường hợp cụ thể này, nó có 19 đối tượng được tạo. Hãy tưởng tượng số này sẽ lớn như nào khi bạn có trường hợp phức tạp hơn.

![](https://images.viblo.asia/4ea3206f-4c80-45c9-b04c-47225bc1d7b8.png)

## Unreadable stacktrace

Hãy tưởng tượng bạn đã mắc một lỗi trong code hoặc chưa nghĩ đến một số trường hợp ngoại lệ. Trường hợp đó được phát hiện trong QA. Bây giờ, một stacktrace đến từ công cụ báo cáo sự cố của bạn:

```java
at com.epam.talks.github.model.ApiClientRx$ApiClientRxImpl$login$1.call(ApiClientRx.kt:16)
at io.reactivex.internal.operators.single.SingleFromCallable.subscribeActual(SingleFromCallable.java:44)
at io.reactivex.Single.subscribe(Single.java:3096)
at io.reactivex.internal.operators.single.SingleFlatMap.subscribeActual(SingleFlatMap.java:36)
at io.reactivex.Single.subscribe(Single.java:3096)
at io.reactivex.internal.operators.single.SingleMap.subscribeActual(SingleMap.java:34)
at io.reactivex.Single.subscribe(Single.java:3096)
at io.reactivex.internal.operators.single.SingleSubscribeOn$SubscribeOnObserver.run(SingleSubscribeOn.java:89)
at io.reactivex.Scheduler$DisposeTask.run(Scheduler.java:463)
at io.reactivex.internal.schedulers.ScheduledRunnable.run(ScheduledRunnable.java:66)
at io.reactivex.internal.schedulers.ScheduledRunnable.call(ScheduledRunnable.java:57)
at java.util.concurrent.FutureTask.run(FutureTask.java:266)
at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.run(ScheduledThreadPoolExecutor.java:301)
at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1162)
at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:636)
at java.lang.Thread.run(Thread.java:764)

```

Wow,  Các bạn thấy gì không, chỉ 1 dòng trong cả stacktrace này đến từ code của bạn!!

## Learning complexity

Đối với 1 người không quen với khái niệm Reactive Programming thì việc học RxJava quả thật là rất vất vả. Bạn có từng nhớ phải mất bao nhiêu thời gian để phân biệt được map vs flatmap. Hay việc hiểu cả ngàn operators. Tất cả đều rất khó khăn khi bắt đầu tiếp xúc với thế giới của Reactive programming.

## Readability

Những dòng code dễ đọc. Tuy nhiên chúng ta vẫn phải truyền callback thứ mà trong suy nghĩ chúng ta ước gì có thể bỏ nó đi (nếu suy nghĩ một cách tuần tự)

# Why Kotlin Coroutines better

Để đi với phần ví dụ trước ta cần đi qua một số thứ đặc trưng trong coroutines: 

## Suspend function

Suspend function: đó là function có thể dừng việc thực hiện khi chúng được gọi và làm cho nó tiếp tục khi nó đã chạy xong nhiệm vụ của riêng chúng.

![](https://images.viblo.asia/f62fbab6-8282-49ec-b399-ae66606f46a2.png)

Suspend function được đánh dấu bằng từ từ khóa suspend, và chỉ có thể được gọi bên trong các suspend function khác hoặc bên trong một coroutine.

Điều này có nghĩa là bạn không thể gọi suspend function ở mọi nơi. Cần có một surrounding function để built coroutine và cung cấp context cần thiết cho việc này

## Coroutines Builder
Có một số cách để tạo ra coroutines:

**launch** -Nó sẽ tạo ra một coroutine mới và trả về một tham chiếu đến nó như một đối tượng Job mà không có kết quả trả về. Nếu bạn có ý định chặn luồng hiện tại, thay vì khởi chạy, ta có thể sử dụng runBlocking thay thế.

**async** - Tạo ra một coroutine mới và trả về một tham chiếu đến nó như là một Deferred có thể có kết quả. Nó thường được sử dụng cùng với .await() chờ đợi cho một kết quả mà không gây block thread, vì vậy ta cũng có thể cancel nó bằng .cancel()

**runBlocking** : Block thread hiện tại cho đến khi coroutine thực hiện.

Trước tiên hãy thay thế Single bằng Deferred của Coroutines. Sẽ thu được đoạn code như sau: 

```java

public actual interface Deferred<out T> : Job {
   public suspend fun await(): T
}

interface Job : CoroutineContext.Element {
  public val isActive: Boolean
  public val isCompleted: Boolean
  public val isCancelled: Boolean
  public fun getCancellationException(): CancellationException
  public fun start(): Boolean
}
```

Sau đó, refactor lại ApiClient interface: 

```java
interface ApiClient {

	fun login(auth: Authorization) : Deferred<GithubUser>
	fun getRepositories(reposUrl: String, auth: Authorization) : Deferred<List<GithubRepository>>

}
```

Thay thế Single.fromCallable bằng coroutine builder.async: 

```kotlin

override fun login(auth: Authorization) : Deferred<GithubUser?> = async {
	val response = get("https://api.github.com/user", auth = auth)
	if (response.statusCode != 200) {
		throw RuntimeException("Incorrect login or password")
	}

	val jsonObject = response.jsonObject
	with (jsonObject) {
		return@async GithubUser(getString("login"), getInt("id"),
				getString("repos_url"), getString("name"))
	}
}
```

Trong RxJava thì cần chọn **Scheduler** cho công việc bất đồng bộ. Trong Coroutines có một thứ tương tự vậy đó là **Dispatcher**. Mặc định thì async và launch coroutine builder sử dụng CommonPool dispatcher, tuy nhiên bạn luôn luôn có thể thay đổi nó. Giờ hãy xem đoạn client code đã thay đổi như thế nào: 

```kotlin
job = launch(UI) {
	showProgressVisible(true)
	val auth = BasicAuthorization(login, pass)
	try {
		val userInfo = login(auth).await()
		val repoUrl = userInfo.reposUrl
		val repos = getRepositories(repoUrl, auth).await()
		val pullRequests = getPullRequests(repos[0], auth).await()
		showRepositories(this, repos.map { it -> it.fullName })
	} catch (e: RuntimeException) {
		Toast.makeText(this, e.message, LENGTH_LONG).show()
	} finally {
		showProgressVisible(false)
	}
}
```

Wow! Code giờ đây trông hết sức rõ ràng phải không. Nhìn cứ như chả có tí gì bất đồng bộ ở đây cả. Trong Rxjava ta thường thêm subscribtion vào compositeDisposable để dispose nó trong onStop(). Còn trong đoạn code trên với Coroutine ta đã lưu trong job và khi cần dispose thì đơn giản gọi job.cancel() trong onStop().  Hãy xem xem  Coroutine đã là được gì hơn RxJava

## Performance

Tổng số internal objects đã giảm xuống chỉ còn 11

![](https://images.viblo.asia/8cf42fd6-0915-4579-a5bf-a6f5a0fdc5c1.png)


## Unreadable stack trace

stacktrace giờ thu ngắn lại tương đối do số lượng internal object đã giảm xuống đáng kể. 

## Readability

Code giờ dễ đọc hơn rất nhiều vì nó viết những đoạn code bất đồng bộ nhưng trông nó hoàn toàn đồng bộ =))

# References

Medium: https://proandroiddev.com/forget-rxjava-kotlin-coroutines-are-all-you-need-part-1-2-4f62ecc4f99b