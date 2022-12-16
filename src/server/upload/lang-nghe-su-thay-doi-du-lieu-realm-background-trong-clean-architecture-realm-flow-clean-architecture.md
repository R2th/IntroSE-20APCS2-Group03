### Mở đầu 

Tôi thích dùng realm trong dự án vì tốc độ và tính linh hoạt khi lắng nghe sự thay đổi dữ liệu từ database,
Thế nhưng điều đó không còn khi tôi làm việc với một dự án xây dựng theo mô hình clean architecture bởi tính độc lập giữa các tầng trong dự án.

### Cách

Có cách nào không? có chứ và có nhiều :)) chúng ta cùng thử liệt kê nhé:

**Realm** + **Broadcast Receiver** ---> quá tốn tài nguyên, cần phải viết hàm đăng ký lắng nghe và hủy đăng ký của Broadcast Receiver

**Realm** + **Live Data** ---> hay, nhưng live data là của android mà tầng nghiệp vụ (Domain) thì không nên chứa android trong đó

**Realm** + **Rx** ---> hay, nhưng yêu cầu toàn bộ luồng xử lý sẽ phải xử lý trong luồng main thread (ảnh hưởng đến UI)

Vậy còn cách nào nữa không nhỉ, tôi đã rất tuyệt vọng cho đến khi **Flow** trong **Coroutines** xuất hiện tính linh hoạt trong đa luồng đã thu hút tôi tìm hiểm
thật tuyệt khi tôi đã tìm ra giải pháp cho nó =)), giờ thì cùng thử code nào

![](https://images.viblo.asia/84e5cb76-3523-4e14-9496-65b397b3f66a.png)

### Code

Code Base

```kotlin
     @OptIn(ExperimentalCoroutinesApi::class)
     fun <S : RealmObject, R> handlerAndReturnListFlow(block: () -> RealmQuery<S>): Flow<List<R>> = callbackFlow {

        val results = block().findAllAsync()!!
        val realm = results.realm!!

        val listener = RealmChangeListener<RealmResults<S>> { t ->
            offer(realm.copyFromRealm(t))
        }

        results.addChangeListener(listener)

        offer(realm.copyFromRealm(results))

        awaitClose {
            if (!realm.isClosed) {
                results.removeChangeListener(listener)
                realm.close()
            }
        }
    }.flowOn(Dispatchers.Main) // đẩy bộ lắng nghe thay đổi dữ liệu vào trong luồng main để tận dụng cơ chế looper của main
    /*.flowOn(android.os.Handler(HandlerThread("RealmDb").apply { start() }.looper).asCoroutineDispatcher("db"))*/ // đẩy bộ lắng nghe thay đổi dữ liệu vào trong luồng background, nhưng hãy chắc chắn rằng bạn quản lý tốt về thread
    .map {
        // chuyển đổi entity database S sang entity R
    }
```

Code in Database

```kotlin
    fun getAll() = handlerAndReturnListFlow {
        Realm.getDefaultInstance().where(TestObject::class.java)
    }
```

Code in Repository

```kotlin
    fun getAll() = testDb.getAll()
```

Code in UseCase

```kotlin
    fun execute() = testRepository.getAll()
```

Code in ViewModel 

```kotlin
    fun listTest = getAllTest.execute()
        .asLiveData(Dispatchers.IO) // yêu cầu xử lý trong luồng backgroud
```

Code in Activity 

```kotlin
    viewModel.listTest.observe(this){
         Log.d("HoangAnhTuan95Ptit", "onCreate: ${it.size}")
    }
```

### Tài liệu tham khảo
Tự nghĩ ra =))), có thể sắp tới mình sẽ viết một bài trên medium

### Kết
Tôi hi vọng sẽ giúp ích cho bạn trong quá trình làm việc với realm trong clean architecture, Nếu có bất kỳ thắc mắc nào thì đừng ngần ngại comment vào bài viết, tôi sẽ cố gắng trả lời. Cảm ơn