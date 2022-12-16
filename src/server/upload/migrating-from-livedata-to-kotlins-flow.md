LiveData là thứ chúng ta cần phải có kể từ năm 2017. Observer pattern giúp chúng ta rất nhiều, nhưng một số lựa chọn như RxJava có vẻ khá phức tạp để bắt đầu. Architecture Components team đã tạo ra LiveData : một observable data holder, được thiết kế cho Android. Nó giúp cho việc bắt đầu làm quen đơn giản hơn và khi cần những trường hợp phức tạp, bạn có thể sử dụng tích hợp thêm RxJava để tận dụng lợi thế của cả hai.

LiveData vẫn là sự lựa chọn cho Java developers, những người mới bắt đầu, và những trường hợp đơn giản. Trong những trường hợp còn lại, bạn có một sự lựa chọn tốt khác là sử dụng Kotlin Flows. Flows là một phần của Kotlin, được hỗ trợ bởi Jetbrains, phù hợp với mô hình lập trình phản ứng.
Trong bài này, chúng ta sẽ tìm hiểu cách dùng Flows khi cung cấp data cho view, cách sử dụng và tinh chỉnh cho phù hợp với một số nhu cầu cụ thể khác.

### Flow: Những thứ đơn giản trở nên khó hơn và những thứ phức tạp trở lên đơn giản hơn
LiveData đã làm và làm rất tốt một thứ : nó thực hiện caching giá trị mới nhất, và cung cấp chính xác giá trị khi cần sử dụng theo Android's lifecycles. Sau này chúng ta biết rằng nó cũng có thể start các coroutines và tạo ra các biến đổi phức tạp.
Hãy xem một số trường hợp sử dụng LiveData pattern và cách sử dụng Flow tương ứng.

**#1: Cung cấp kết quả của một one-shot operation với Mutable data holder**

Đây là một case thông dụng, khi bạn muốn thay đổi trạng thái từ kết quả của một coroutine
![](https://miro.medium.com/max/4800/0*uEwETJ80kXERy4bJ)
```
<!-- Copyright 2020 Google LLC.	
   SPDX-License-Identifier: Apache-2.0 -->

class MyViewModel {
    private val _myUiState = MutableLiveData<Result<UiState>>(Result.Loading)
    val myUiState: LiveData<Result<UiState>> = _myUiState

    // Load data from a suspend fun and mutate state
    init {
        viewModelScope.launch { 
            val result = ...
            _myUiState.value = result
        }
    }
}
```

Để làm tương tự với Flow, chúng ta sẽ làm như sau, sử dụng (Mutable)StateFlow : 
![](https://miro.medium.com/max/4800/0*Hf3EmJ8gchpSy6nd)
```
class MyViewModel {
    private val _myUiState = MutableStateFlow<Result<UiState>>(Result.Loading)
    val myUiState: StateFlow<Result<UiState>> = _myUiState

    // Load data from a suspend fun and mutate state
    init {
        viewModelScope.launch { 
            val result = ...
            _myUiState.value = result
        }
    }
}
```
StateFlow là một dạng của SharedFlow (một dạng của Flow), khá giống với LiveData : 
- Luôn có giá trị 
- Chỉ có một giá trị ở một thời điểm 
- Hỗ trợ multiple observers
- 
Nó luôn giữ giá trị mới nhất, không phụ thuộc vào số lượng active observers. Khi bạn muốn cung cấp UI state cho một view, sử dụng StateFlow sẽ an toàn và hiệu quả.

**#2: Cung cấp kết quả của một one-shot operation**

Trường hợp này tương tự với trường hợp trên, nhưng sẽ hiển thị kết quả từ coroutine mà không dùng mutable data holder 

Với LiveData, chung ta sử dụng như sau : 
![](https://miro.medium.com/max/1400/0*HKl0HDnxMxlYbZb_)
```
class MyViewModel(...) : ViewModel() {
    val result: LiveData<Result<UiState>> = liveData {
        emit(Result.Loading)
        emit(repository.fetchItem())
    }
}
```
Vì state holder luôn có giá trị, nên một ý tưởng khá hay là chúng ta sẽ đưa UI state vào trong class Result, trong đó có thể định nghĩa sẵn các giá trị như Loading, Success hay Error.

Sử dụng Flow trong trường hợp này sẽ phức tạp hơn một chút, bạn cần thực hiện thêm một số configuration : 
![](https://miro.medium.com/max/1400/0*sFoX0pbnLijOPaiy)
```
class MyViewModel(...) : ViewModel() {
    val result: StateFlow<Result<UiState>> = flow {
        emit(repository.fetchItem())
    }.stateIn(
        scope = viewModelScope, 
        started = WhileSubscribed(5000), // Or Lazily because it's a one-shot
        initialValue = Result.Loading
    )
}
```
`stateIn` là một Flow operator giúp convert một Flow thành một StateFlow. Tạm thời bạn hãy tin tưởng những giá trị trong ví dụ này, nó sẽ được giải thích cụ thể ở phần sau.

**#3: One-shot data có parameters**

Giờ chúng ta muốn load data tuỳ thuộc theo user ID, và bạn cần lấy thông tin từ AuthManager được cung cấp bởi một Flow. Với LiveData chúng ta sẽ thực hiện như sau : 
![](https://miro.medium.com/max/1400/0*NkfiDL2ko9lkKPTh)

```
class MyViewModel(authManager..., repository...) : ViewModel() {
    private val userId: LiveData<String?> = 
        authManager.observeUser().map { user -> user.id }.asLiveData()

    val result: LiveData<Result<Item>> = userId.switchMap { newUserId ->
        liveData { emit(repository.fetchItem(newUserId)) }
    }
}
```
`switchMap` là một phép biến đổi sẽ được thực hiện khi userId có sự thay đổi.

Nếu không có lý do gì đặc biệt để dùng userId như một LiveData, thì giải pháp tốt hơn để thay thế là kết hợp các streams với Flow và cuối cùng sẽ convert kết quả thành LiveData 
```
class MyViewModel(authManager..., repository...) : ViewModel() {
    private val userId: Flow<UserId> = authManager.observeUser().map { user -> user.id }

    val result: LiveData<Result<Item>> = userId.mapLatest { newUserId ->
       repository.fetchItem(newUserId)
    }.asLiveData()
}
```

Thực hiện với Flows có vẻ khá tương tự LiveData : 
![](https://miro.medium.com/max/1400/0*IGFPV_i3vBpPQKsA)
```
class MyViewModel(authManager..., repository...) : ViewModel() {
    private val userId: Flow<UserId> = authManager.observeUser().map { user -> user.id }

    val result: StateFlow<Result<Item>> = userId.mapLatest { newUserId ->
        repository.fetchItem(newUserId)
    }.stateIn(
        scope = viewModelScope, 
        started = WhileSubscribed(5000), 
        initialValue = Result.Loading
    )
}
```
Để linh hoạt hơn bạn có thể sử dụng transformLatest và emit item một cách rõ ràng như sau : 
```
    val result = userId.transformLatest { newUserId ->
        emit(Result.LoadingData)
        emit(repository.fetchItem(newUserId))
    }.stateIn(
        scope = viewModelScope, 
        started = WhileSubscribed(5000), 
        initialValue = Result.LoadingUser // Note the different Loading states
    )
```

**#4: Observing stream data có parameters**

Đến với ví dụ tiếp theo *reactive* hơn. Data chưa được lấy về, nhưng được observed, vì vậy chúng ta cần thiết kế để sự thay đổi của data từ nguồn sẽ tự động được đưa tới UI

Tiếp dục với ví dụ ở #3, nhưng thay vì gọi fetchItem, chúng ta sẽ sử dụng observeItem operator để có thể trả về một Flow

Với LiveData bạn có thể convert Flow thành LiveData và dùng emitSource cho mỗi lần update :
![](https://miro.medium.com/max/1400/0*gieCVtPGDY0GLmSW)
```
class MyViewModel(authManager..., repository...) : ViewModel() {
    private val userId: LiveData<String?> = 
        authManager.observeUser().map { user -> user.id }.asLiveData()

    val result = userId.switchMap { newUserId ->
        repository.observeItem(newUserId).asLiveData()
    }
}
```
Hoặc một cách khác bạn có thể kết hợp các Flow bằng flatMapLatest và chỉ convert kết quả cuối cùng sang LiveData : 
```
class MyViewModel(authManager..., repository...) : ViewModel() {
    private val userId: Flow<String?> = 
        authManager.observeUser().map { user -> user?.id }

    val result: LiveData<Result<Item>> = userId.flatMapLatest { newUserId ->
        repository.observeItem(newUserId)
    }.asLiveData()
}
```

Sử dụng Flow cho trường hợp này cũng tương tự nhưng sẽ không cần sử dụng tới LiveData :
![](https://miro.medium.com/max/1400/0*T-S2IXEmR2RL308f)
```
class MyViewModel(authManager..., repository...) : ViewModel() {
    private val userId: Flow<String?> = 
        authManager.observeUser().map { user -> user?.id }

    val result: StateFlow<Result<Item>> = userId.flatMapLatest { newUserId ->
        repository.observeItem(newUserId)
    }.stateIn(
        scope = viewModelScope, 
        started = WhileSubscribed(5000), 
        initialValue = Result.LoadingUser
    )
}
```
StateFlow sẽ nhận được các update bất cứ khi nào user thay đổi hoặc user data trong repository thay đổi.

**#5 Kết hợp multiple sources: MediatorLiveData -> Flow.combine**

MediatorLiveData cho phép bạn observe một hoặc nhiều sources để thực hiện khi data ở source có sự thay đổi. Thông thường, MediatorLiveData được sử dụng như sau : 
```
val liveData1: LiveData<Int> = ...
val liveData2: LiveData<Int> = ...

val result = MediatorLiveData<Int>()

result.addSource(liveData1) { value ->
    result.setValue(liveData1.value ?: 0 + (liveData2.value ?: 0))
}
result.addSource(liveData2) { value ->
    result.setValue(liveData1.value ?: 0 + (liveData2.value ?: 0))
}
```

Thực hiện tương tự với Flow có vẻ rõ ràng hơn : 
```
val flow1: Flow<Int> = ...
val flow2: Flow<Int> = ...

val result = combine(flow1, flow2) { a, b -> a + b }
```
Bạn cũng có thể sử dụng các combineTransform function, hoặc zip ở đây.

Trong bài viết này mình đã giới thiệu về Flow, cách sử dụng và so sánh với LiveData đối với các trường hợp thông dụng, ở phần tiếp theo mình sẽ giải thích cụ thể về các configuration và tương tác với lifecycle của Android.

**Thanks for reading!!**

**Nguồn bài viết : https://medium.com/androiddevelopers/migrating-from-livedata-to-kotlins-flow-379292f419fb**