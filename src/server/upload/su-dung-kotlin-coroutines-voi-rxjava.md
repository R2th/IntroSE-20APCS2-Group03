# Introduce
- Trước tiên chúng ta sẽ nói lại một chút về Rx(Reactive Programing) : nó là một công cụ đắc lực trong việc xử lý các tác vụ bất đồng bộ được triển khai ở rất nhiều các nền tảng khác nhau. Trong android project thông thường ở thời điểm hiện tại, chúng ta giải quyết xử lý bất đồng bộ bằng RxJava và thực tế thì nó rất tuyệt vời.
- Coroutines được giới thiệu như là một tính năng thử nghiệm của Kotlin 1.1.và họ cung cấp cho các developers khả năng viết ngắn gọn hơn, mã không đồng bộ. Và tuyệt vời hơn khi chúng có sẵn trong Kotlin và trên Android.

 ![](https://images.viblo.asia/22b1119f-c047-4276-9bfe-524314abce2b.png)
 
- Trong bài viết này, mình sẽ giới thiệu cách kết hợp Kotlin coroutines vào RxJava. Với các component chúng ta thường xuyên sử dụng là Single, Maybe, Completable.

# The App 
- Với một app bất kỳ sử dụng RxJava đa số mọi người sẽ implement RxJava như source dưới đây : 
```
interface Call<in Param, Output> {
   fun data(param: Param): Flowable<Output>
   fun refresh(param: Param): Completable
}
```

Như bạn thấy, interface dưới đây dùng để implement 2 nhiệm vụ : 
 - *data()* method : expose một luồng dữ liệu liên quan đến cuộc gọi. Nó trả về một Flowable, mà chúng ta lại hay thường sử dụng Flowable để thực thi các nhiệm vụ liên đến Room DAO. Một ViewModel say đó sẽ subscribe đến method này và truyền dữ liệu đến để fill vào UI, …
-  *refresh()* method:  đúng như tên gọi nó dùng để làm mới dữ liệu, hâù hết các implement sẽ tìm nạp từ mạng, ánh xạ các thực thể và sau đó cập nhật dữ liệu đến ROOM  database để đồng bộ dữ liệu từ upstream và local. Method này trả về một Completable mà ViewModel sẽ đăng ký để bắt đầu một "action".

Vậy bây giờ chúng ta sẽ implement interface này với Kotlin coroutines như thế nào ? 
 - Mục đích của tôi là sẽ biến *refresh()* method thành một suspending function: 

```
interface Call<in Param, Output> {
   fun data(param: Param): Flowable<Output>
   suspend fun refresh(param: Param)
}
```

# Threading
- Với RxJava, chúng ta có sự khác nhau trong việc set các Schedulers cho mỗi tác vụ khác nhau. Việc này được thực hiện với một lớp data được chèn vào bất cứ nơi nào có sử dùng RxJava

```
data class AppRxSchedulers(
   val database: Scheduler,
   val disk: Scheduler,
   val network: Scheduler,
   val main: Scheduler
)
@Singleton
@Provides
fun provideRxSchedulers() = AppRxSchedulers(
       database = Schedulers.single(),
       disk = Schedulers.io(),
       network = Schedulers.io(),
       main = AndroidSchedulers.mainThread()
)
```

- Trong các thread được config ở trên tôi cho rằng quan trọng nhất là Scheduler của CSDL là database . Điều này là do tôi muốn buộc đọc các luồng đơn, đảm bảo tính toàn vẹn dữ liệu tránh việc khóa SQLite khi đang đọc. 

- Với Coroutines chúng ta sẽ làm tương tự và phải đảm bảo rằng cả RxJava và Coroutines đều sử dụng chung thread pools. Điều này hóa ra tương đối dễ dàng khi sử dụng thư viện mở rộng *Kotlinx-coroutines-rx2* . Nó bổ sung một phương thức mở rộng trên Scheduler với CoroutineDispatcher. Sử dụng điều đó, tôi chuyển đổi Schedulers thành một Scheduler Dispatcher và sau đó Inject chúng như sau : 

```
data class AppCoroutineDispatchers(
   val database: CoroutineDispatcher,
   val disk: CoroutineDispatcher,
   val network: CoroutineDispatcher,
   val main: CoroutineDispatcher
)
@Singleton
@Provides
fun provideDispatchers(schedulers: AppRxSchedulers) =
   AppCoroutineDispatchers(
       database = schedulers.database.asCoroutineDispatcher(),
       disk = schedulers.disk.asCoroutineDispatcher(),
       network = schedulers.network.asCoroutineDispatcher(),
       main = UI
   )
```
- Chúng ta có thể thấy. Source trên sử dụng RxJava Scheduler như một tài nguyên. Và từ đây chúng ta có thể swap để các Schedulers bắt nguồn từ các Dispatchers.

# Changing Threads
- Như vậy, chúng ta đã có các Scheduler và các Dispatchers chia sẻ chung các Threads, nhưng còn việc sử dụng chúng như thế nào trong các Operation ? 
- RxJava làm cho nó thật sự dễ dàng để xâu chuỗi các trình quan sát luồng khác nhau bằng các phương method subscribeOn() và observeOn(). Ở đây là một ví dụ về phương thức refresh() nơi tôi đã sử dụng bộ lập lịch Network Scheduler để tìm nạp các response từ Server về và map nó vào một thực thể, sau đó sử dụng Database Scheduler để lưu trữ kết quả dưới local.

```
override fun refresh(): Completable {
   return trakt.users().profile(UserSlug.ME).toRxSingle()
           .subscribeOn(schedulers.network)
           .map {
               TraktUser(username = it.username, name = it.name)
           }
           .observeOn(schedulers.database)
           .doOnSuccess {
               dao.insert(it)
           }
           .toCompletable()
}

override fun data(): Flowable<TraktUser> {
   return dao.getTraktUser()
           .subscribeOn(schedulers.database)
}
```

Đoạn code trên là một ví dụ khá chuẩn về RxJava code. Và bây giờ chúng ta sẽ cover nó sang Coroutines nhé.

## Bước 1: 
- Sau khi bạn đọc Kotlin coroutines guide, bạn có thể sẽ nghĩ tới 2 method này launch() và async(). Và ở đây chúng ta sử dụng 2 method này để xâu chuỗi mọi thứ lại với nhau: 

```
override suspend fun refresh(param: Unit) {
   // Fetch network response on network dispatcher
   val networkResponse = async(dispatchers.network) {
       trakt.users().profile(UserSlug.ME).execute().body()
   }.await() // await the result
   // Map to our entity
   val entity = TraktUser(
       username = networkResponse.username,
       name = networkResponse.name
   )

   // Save to the database on the database dispatcher
   async(dispatchers.database) {
       dao.insert(entity)
   }.await()  // Wait for the insert to finish
}
```
- Cách này sẽ hoạt động tốt, nhưng ở đây có một chút lãng phí vì phải gọi đến 3 coroutines: 1) network call, 2) database call, 3) gọi từ host coroutine (thường là từ ViewModel).
- Số lượng coroutines mà chúng ta tạo ra có thể sẽ tăng lên đáng kể khi không phải lúc nào cũng cần thiết, như trong ví dụ trên. Tất cả mọi thứ chúng ta làm ở đây là tuần tự, do đó không cần phải bắt đầu một coroutine mới. Những gì chúng ta cần là một cách để thay đổi Dispatcher, và may mắn thay, Kotlin Coroutines đã cung cấp cho chúng ta một method là : *withContext()*

## Bước 2: 

- Ở phần này chúng ta sẽ tập trung vào việc sử dụng *withContext()* để thay thế cho *subscribeOn()* , vì nó thực hiện chính xác những gì chúng ta muốn : 

  *Tôi giải thích một tí về hàm này cho ai quên đã nhé :D : **withContext()** ngay lập tức áp dụng bộ dispatcher từ context mới, chuyển việc thực thi trong block sang một luồng khác và sau khi hoàn hành sẽ trở lại luồng hiện tại.*
 
 

```
override suspend fun refresh(param: Unit) {
   // Fetch network response on network dispatcher
   val networkResponse = withContext(dispatchers.network) {
       trakt.users().profile(UserSlug.ME).execute().body()
   }
   // Map to our entity
   val entity = TraktUser(
       username = networkResponse.username,
       name = networkResponse.name
   )

   // Save to the database on the database dispatcher
   withContext(dispatchers.database) {
       dao.insert(entity)
   }
}
```

- Bây giờ chúng ta có thể thấy là đã không còn gọi method *async()* nữa, đồng nghĩa sẽ không có bất kỳ coroutine nào được tạo ra. Và chúng ta chỉ move action từ coroutine hiện tại sang một dispatcher mà chúng ta chỉ định (dispatcher ở đây có thể là một *thread*) .
- Và bây giờ thì mọi người sẽ có một câu hỏi là :
### - Tại sao chúng ta không nên chỉ dùng *async()/launch()* trong khi Kotlin coroutines được cho là khá nhẹ ?

- Coroutines thì rất nhẹ, nhưng việc tạo ra chúng vẫn tốn tài nguyên. Và cần nhớ rằng ở Android, chúng ta chạy trên một hệ thống với tài nguyên giới hạn. Vì thế, chúng ta cần làm mọi thứ có thể để giảm đi sự tiêu tốn tài nguyên hệ thống. Và việc sử dụng *withComplex()* đáp ứng yêu cầu đó của chúng ta, với một lệnh gọi hàm duy nhất và phân bố đối tượng tối thiểu so với việc tạo ra nhiều các coroutines mới.
 - Ngoài ra, còn có một thực tế rằng *async()* và *launch()* áp dụng cho các tác vụ bất đồng bộ. Phần lớn thời gian chúng ta làm việc với một nhiệm vụ chính là không đồng bộ, nhưng trong đó chúng cũng sẽ gọi các nhiệm vụ phụ đồng bộ. Bằng cách sử dụng *async* và *launch* , chúng ta phải gọi thêm hàm *await()* hoặc *join()* -> điều này tạo ra sự khó hiểu khi đọc.

# Conclution
- Với bài viết này, hy vọng rằng bạn có thể thấy rằng nó tương đối dễ dàng trong việc chuyển từ RxJava sang Kotlin coroutines.

  Have a good day :D !
  
##   Reference 
- https://kotlinlang.org/docs/reference/coroutines-overview.html
- https://medium.com/androiddevelopers/rxjava-to-kotlin-coroutines-1204c896a700 
- https://viblo.asia/p/cung-tim-hieu-ve-kotlin-coroutines-bWrZnp7Q5xw