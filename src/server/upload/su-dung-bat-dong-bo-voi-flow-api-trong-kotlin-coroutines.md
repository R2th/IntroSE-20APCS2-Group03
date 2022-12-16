# Giới thiệu
Trong khi xây dựng ứng dụng để xử lý các hoạt động bất đồng bộ chúng ta thường nghĩ ngay tới **AsynchTask**, **RxJava**. Đặc biệt **RxJava** là một trong những thư viện sử dụng cho việc bất đồng bộ khá hiệu quả mà mọi người thường thảo luận và nhắc tới.

Với việc sử dụng ngôn ngữ Kotlin chúng ta có khuynh hướng sử dụng **Coroutines** và từ bản **1.2.0 alpha** Jetbranins đã tạo ra **Flow API** để thực hiện các nhiệm vụ bất đồng bộ. Flow bây giờ có thể sử dụng để quản lý việc phát ra một luồng dữ liệu dạng tuần tự. Bài viết này xin giới thiệu với mọi người về phương pháp xử lý bất đồng bộ với Flow API, dưới đây là một số khái niệm thường gặp mà chúng ta sẽ cùng tìm hiểu:
* Thế nào gọi là cold trong Flow
* Các loại builder trong Flow
* Các toán tử trung gian trong Flow
    *  Toán tử Transform
    *   Toán tử giới hạn Size-limiting
* Toán tử Terminal trong Flow
* Kết hợp các Flows
    * Sử dụng Zip
    * Sử dụng Combine

# Thế nào gọi là cold trong Flow
**Flow** được gọi là **cold** có nghĩa là các dòng code trong **flow builder** sẽ không được thực thi đến khi nó được gọi **collect**. Ta có thể hình dung qua ví dụ bên dưới.
Đầu tiên xây dựng một flow để phát ra các chuỗi số nguyên như sau:
```kotlin
    fun simple(): Flow<Int> = flow {
        Log.d("MainActivity", "Flow started")
        for (i in 1..3) {
            delay(100)
            emit(i)
        }
    }
```

Tiếp đến trong hàm onCreated của ứng dụng ta tiến hành thử gọi hàm này như sau:

```kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main)
        val flowSample = simple()
        
        ...
    }
```

Thử chạy ứng dụng, ta thấy sẽ không có dòng log nào được in ra cả, điều này chứng minh **flow** thì **cold**. Để thực hiện việc chạy hàm này ta phải gọi phương phức **collect** và đặt nó trong một **CoroutineScope**. Ta tiến hành thêm một button vào layout của ứng dụng và cài đặt lệnh thực thi khi nhấn vào button này như sau:

```kotlin
    binding.btExcute.safeClick(View.OnClickListener {
        CoroutineScope(Dispatchers.Main).launch {
            flowSample.collect {
                Log.d("MainActivity", "Flow value emit ${it}")
            }
        }
    })
```

Khi thực hiện nhấn vào button này ta sẽ thấy các dòng log được in ra  và hàm **simple()** được thực thi lần lượt phát ra các giá trị 1, 2 và 3

```kotlin
com.example.flowcoroutines D/MainActivity: Flow started
com.example.flowcoroutines D/MainActivity: Flow value emit 1
com.example.flowcoroutines D/MainActivity: Flow value emit 2
com.example.flowcoroutines D/MainActivity: Flow value emit 3
```

# Các loại builder trong Flow
Đây là cách thức để tạo ra các **Flow**. Có 4 phương thức thường dùng:
1. **flowOf()**: được sử dụng để tạo ra Flow từ một tập các giá trị cùng loại. Ví dụ sau tạo ra **Flow** từ một tập số **Integer**, các giá trị được phát ra mỗi 200ms

```kotlin
    fun createWithFlowOf(): Flow<Int> = flowOf(11, 15, 12, 14, 17).onEach {
        delay(200)
    }.flowOn(Dispatchers.Default)
```
Thực hiện gọi trong **onCreated** của ứng dụng như sau
```kotlin
    val resultWithFlowOf = createWithFlowOf()

    binding.btExcute.safeClick(View.OnClickListener {
        CoroutineScope(Dispatchers.Main).launch {
            resultWithFlowOf.collect {
                Log.d("MainActivity", "Flow of value emit ${it}")
            }
        }
    })
```
Kết quả sẽ phát ra các số kiểu Int
```kotlin
D/MainActivity: Flow of value emit 11
D/MainActivity: Flow of value emit 15
D/MainActivity: Flow of value emit 12
D/MainActivity: Flow of value emit 14
D/MainActivity: Flow of value emit 17
```

> Ở đây ta thấy có function **flowOn()** nó hoạt động giống như **subscribeOn()** trong RxJava, chỉ định thread để Flow này hoạt động như Main, IO...

2. **asFlow()**: đây là 1 **extension** giúp chuyển đổi nhanh 1 tập các giá trị thành một Flow. Ví dụ bên dưới chúng ta tạo Flow từ một tập các số từ 5 đến 10 và phát ra mỗi 200ms
```kotlin
     fun createWithAsFlow(): Flow<Int> = (5..10).asFlow().onEach {
        delay(200)
    }.flowOn(Dispatchers.Default)
```
```kotlin
    val resultWithAsFlow = createWithAsFlow()
        
    binding.btExcute.safeClick(View.OnClickListener {
        CoroutineScope(Dispatchers.Main).launch {
            resultWithAsFlow.collect {
                Log.d("MainActivity", "Flow of value emit ${it}")
            }
        }
    })
```
Kết quả in ra 1 chuỗi các số từ 5 đến 10 mỗi 200ms
```kotlin
D/MainActivity: Flow of value emit 5
D/MainActivity: Flow of value emit 6
D/MainActivity: Flow of value emit 7
D/MainActivity: Flow of value emit 8
D/MainActivity: Flow of value emit 9
D/MainActivity: Flow of value emit 10
```
3. **flow**: đây là hàm thường dùng khi tạo Flow, dùng để xây dựng và tạo ra các cấu trúc tùy ý. Ta có thể xem ví dụ đã trình bày bên trên.
4. **channelFlow**: hoạt động giống như **flow**, nhưng thay vì dùng **emit** để phát dữ liệu thì hàm này sẽ dùng **send** để phát. Ta có thể xem ví dụ sau:
```kotlin
    fun createWithChannelFlow(): Flow<Int> = channelFlow {
        Log.d("MainActivity", "createWithChannelFlow")
        for (i in 1..5) {
            send(i)
        }
    }.flowOn(Dispatchers.Default)
```
```kotlin
    val resultWithChannelFlow = createWithChannelFlow()

    binding.btExcute.safeClick(View.OnClickListener {
        CoroutineScope(Dispatchers.Main).launch {
            resultWithChannelFlow.collect {
                Log.d("MainActivity", "Flow of value emit ${it}")
            }
        }
    })
```
Kết quả in ra 1 chuỗi các số từ 1 đến 5
```kotlin
D/MainActivity: Flow of value emit 1
D/MainActivity: Flow of value emit 2
D/MainActivity: Flow of value emit 3
D/MainActivity: Flow of value emit 4
D/MainActivity: Flow of value emit 5
```
# Các toán tử trung gian trong Flow
## Toán tử Transform
Toán tử **transform** được dùng để cập nhật, thay đổi các giá trị trước khi phát ra chúng. Nó hoạt động cũng như các toán tử cơ bản là **map** và **filter** nhưng việc sử dụng linh hoạt hơn, số lần phát ra giá trị đó là tùy ý. Cụ thể ở ví dụ sau ta tạo một Flow() phát ra các giá trị từ 1 đến 3 mỗi 1 giây, trước khi phát ra ta sử dụng transform để biến đổi các giá trị này thành một chuỗi khác như ví dụ bên dưới.
```kotlin
    fun testFlowTransform(): Flow<Int> = flow {
        Log.d("MainActivity", "Flow transform started")
        for (i in 100..103) {
            delay(100)
            emit(i)
        }
    }.flowOn(Dispatchers.Default)
```
```kotlin
    val flowTransform = testFlowTransform()

    binding.btExcute.safeClick(View.OnClickListener {
        CoroutineScope(Dispatchers.Main).launch {
            flowTransform
                .transform { request ->
                    emit("Include header for $request")
                    emit("Include footer for $request")
                }
                .collect {
                    Log.d("MainActivity", "Flow value emit ${it}")
                }
        }
    })
```

Kết quả ta có thể thấy thông tin được thay đổi trước khi phát ra.

```kotlin
D/MainActivity: Flow transform started
D/MainActivity: Flow value emit Include header for 100
D/MainActivity: Flow value emit Include footer for 100
D/MainActivity: Flow value emit Include header for 101
D/MainActivity: Flow value emit Include footer for 101
D/MainActivity: Flow value emit Include header for 102
D/MainActivity: Flow value emit Include footer for 102
D/MainActivity: Flow value emit Include header for 103
D/MainActivity: Flow value emit Include footer for 103
```

## Toán tử giới hạn Size-limiting
Việc giới hạn này sử dụng lệnh **take** để hủy bỏ việc thực thi của flow khi nó đạt được giới hạn của số lần phát ra. Việc hủy bỏ này trong coroutines thường ném ra exception, vì vậy các lần **emit** thường được đặt trong **try** {...} **finally** {...} để đảm bảo các chức năng được hoạt động bình thường.
Từ ví dụ bên trên ta giả sử chỉ cần lấy 2 lần **emit** đầu tiên, ta thực hiện như sau:
```kotlin
     flowTransform
        .transform { request ->
            emit("Include header for $request")
            emit("Include footer for $request")
        }
        .take(2)
        .collect {
            Log.d("MainActivity", "Flow value emit ${it}")
        }
```

Kết quả chỉ in ra như bên dưới

```kotlin
D/MainActivity: Flow transform started
D/MainActivity: Flow value emit Include header for 100
D/MainActivity: Flow value emit Include footer for 100
```
# Toán tử Terminal trong Flow
Các toán tử **terminal** là các **suspending functions** hoạt động tương tự như **collect** nhưng nó có thể làm các tác vụ cụ thể hơn như:
* Chuyển đổi các giá trị từ flow phát ra đến **List** hoặc **Set** thông qua hàm **toList** hoặc **toSet**
* Lấy giá trị đầu tiên của flow phát ra qua toán tử **first** hoặc **single**
* Chuyển đổi và tính toán để cuối cùng phát ra 1 giá trị duy nhất thông qua **reduce** và **fold**

Ví dụ như ta có 1 flow phát ra các giá trị từ 1 đến 3 và ta muốn thực hiện tính tổng các giá trị này lại, ta sẽ dùng toán tử **reduce** và thực hiện như sau:
```kotlin
    fun simple(): Flow<Int> = flow {
        Log.d("MainActivity", "Flow started")
        for (i in 1..3) {
            emit(i)
        }
    }

    val sumflow = simple()
        .reduce { a, b ->
            a + b
        }
    Log.d("MainActivity", "Flow of value emit ${sumflow}")
```

Kết quả sẽ in ra là 6 như bên dưới

```kotlin
D/MainActivity: Flow started
D/MainActivity: Flow of value emit 6
```

# Kết hợp các Flows
## Sử dụng Zip
**Zip** được sử dụng để kết hợp các giá trị của 2 flow lại với nhau trước khi được phát ra. Ta có thể xem qua ví dụ bên dưới.

Ta có flowA phát ra chuỗi các số Int và flowB phát ra chuỗi các String. Ta tiến hành sử dụng **zip** để ghép các giá trị phát ra này
```kotlin
    val flowA = flowOf(1, 2).flowOn(Dispatchers.Default)
    val flowB = flowOf("Singh", "Shekhar", "Ali").flowOn(Dispatchers.Default)

    binding.btExcute.safeClick(View.OnClickListener {
        CoroutineScope(Dispatchers.Main).launch {
            flowA.zip(flowB)
            { firstString, secondString ->
                "$firstString $secondString"
            }.collect {
                Log.d("MainActivity", it)
            }
        }
    })
```
Kết quả ta có thể thấy như bên dưới. Ta để ý thấy vì flowA chỉ phát ra 2 giá trị, còn flowB phát ra 3 giá trị nên việc chạy sẽ dừng khi flowA phát ra hết các giá trị.
```kotlin
D/MainActivity: 1 Singh
D/MainActivity: 2 Shekhar
```

## Sử dụng Combine
Với **zip** mỗi cặp giá trị phát ra đều phải chờ đợi giá trị từ flow liên kết hoàn thành để cùng phát ra mặc dù nó có thể hoàn thành sớm hơn. Ta có thể thấy qua ví dụ bên dưới các số thì phát ra mỗi 300ms, còn các chuỗi thì mỗi 400ms, để phát ra 1 cặp giá trị thì cả 2 flow đều phải chờ 400ms.
```kotlin
    val flowNums = (1..3).asFlow().onEach { delay(300) } // numbers 1..3 every 300 ms
    val flowStr = flowOf("one", "two", "three").onEach { delay(400) } // strings every 400 ms
    val startTime = System.currentTimeMillis() // remember the start time

    binding.btExcute.safeClick(View.OnClickListener {
        CoroutineScope(Dispatchers.Main).launch {
            flowNums.zip(flowStr) { a, b -> "$a -> $b" } // compose a single string with "zip"
                .collect { value -> // collect and print
                    Log.d(
                        "MainActivity",
                        "$value at ${System.currentTimeMillis() - startTime} ms from start"
                    )
                }
        }
    })
```
Kết quả là mỗi 400ms chúng ta sẽ nhận được một cặp giá trị như bên dưới
```kotlin
D/MainActivity: 1 -> one at 110254 ms from start
D/MainActivity: 2 -> two at 110655 ms from start
D/MainActivity: 3 -> three at 111056 ms from start
```
Còn đối với **combine** thì nó sẽ không có sự chờ đợi flow liên kết với nó mà khi nó có gía trị nó sẽ tìm giá trị gần nhất vừa phát ra của flow liên kết với nó để cùng phát ra cặp giá trị. Ta có thể thấy ví dụ bên dưới **flowNums** phát ra gía trị **1** sau khi delay **300ms**, nó sẽ chờ tiếp **100ms** để nhận giá trị của **flowStr** do flow này chưa từng phát ra giá trị nào. Sau đó chạy tiếp **300ms** thì **flowNums** phát ra giá trị **2**, lúc này **flowStr** chưa có giá trị mới phát ra nó sẽ lấy giá trị **one** để kết hợp và cùng phát ra kết quả. Việc kết hợp cứ như thế khi nó chạy hết các giá trị.
```kotlin
    CoroutineScope(Dispatchers.Main).launch {
        flowNums.combine(flowStr) { a, b -> "$a -> $b" } // compose a single string with "zip"
            .collect { value -> // collect and print
                Log.d(
                    "MainActivity",
                    "$value at ${System.currentTimeMillis() - startTime} ms from start"
                )
            }
    }
```
Kết quả 
```kotlin
D/MainActivity: 1 -> one at 6936 ms from start
D/MainActivity: 2 -> one at 7137 ms from start
D/MainActivity: 2 -> two at 7339 ms from start
D/MainActivity: 3 -> two at 7439 ms from start
D/MainActivity: 3 -> three at 7742 ms from start
```

Bài tìm hiểu về Flow API đến đây là hết, xin cảm ơn mọi người đã đọc.
# Tham khảo
1. https://kotlinlang.org/docs/reference/coroutines/flow.html#asynchronous-flow
2. https://blog.mindorks.com/what-is-flow-in-kotlin-and-how-to-use-it-in-android-project