# I. Giới thiệu ngắn gọn về Reactive Programming
Thuật ngữ **reactive** hiện nay đã không còn xa lạ với chúng ta. Hiện nay nó đang là xu thế và gần như là rule trong lĩnh vực phát triển phần mềm. Mỗi ngày đều có rất nhiều các blogs, presentations, emerging frameworks and libraries đang nói về và phát triển xoay quanh **reactive programing** . <br>

Với những bạn programer mới có thể sẽ thắc mắc về **reactive programing**. Tại sao mọi người lại hứng thú với nó đến vậy? Reactive programing chính xác là cái gì? Lợi ích của việc áp dụng reactive programing là gì? Chúng ta có nên học nó không? Nếu có thì sau đó như nào?
Vậy chúng ta sẽ cùng nhau tìm hiểu xem nó là gì nhé :) <br>

Như các bạn đã biết, `Kotlin` được sinh ra giúp cải tiến và giải quyết nhiều vấn đề quan trọng của `Java`.  Với `Kotlin` chúng ta có thể tạo ra 1 application tuyệt vời, và nếu bạn kết hợp với **reactive programming style** với `Kotlin` thì lại càng dễ dàng hơn trong việc tạo ra 1 application tốt hơn thế nữa. Vậy **reactive programming** là cái gì mà nói lắm thế?<br>

##### **What is reactive programming?**

Reactive programming là một mô hình lập trình không đồng bộ xoay quanh các luồng dữ liệu và streams của sự thay đổi. Tức là sao, bạn hãy xem ví dụ bên dưới để hiểu rõ hơn nhé.

```kotlin
fun main(args: Array<String>) {
 var number = 4
 var isEven = isEven(number)
 println("The number is " + (if (isEven) "Even" else "Odd"))
 number = 9
 println("The number is " + (if (isEven) "Even" else "Odd"))
 }
 fun isEven(n:Int):Boolean = ((n % 2) == 0)
```

Bạn sẽ thấy rằng output của chương trình trên return true cho dù `number = 9`. Nếu thực hiện tracking `isEven = isEven(number)` ngay sau `number = 9` thì value sẽ return false. Reactive programing cũng hoạt động tương tự. Nó sẽ thực hiện tracking khi có 1 sự thay đổi nào đó.

Ở bài viết này, mình không thể chia sẻ hết về RxKotlin được, nhưng mình sẽ chia sẻ những gì cơ bản nhất và bạn sẽ dễ gặp phải nhất thôi nhé.
# II. RxKotlin
## 1. RxKotlin & Coroutines?
RxKotlin là một lightweight library, là extension functions cho RxJava. RxKotlin được sinh ra với mục đích là tối ưu hóa việc sử dụng và huẩn hóa các quy ước sử dụng RxJava với Kotlin.

**The most exciting feature trong Kotlin** là **coroutines**. Với việc sử dụng coroutines chúng ta có thể xử lý bất đồng bộ, non-blocking code giống như threads 1 cách đơn giản hơn thread. 
Coroutine còn được gọi là 1 lightweight thread.

Lưu ý rằng RxKotlin không sử dụng coroutines. Lý do khá đơn giản là cả coroutines và Schedulers trong RxKotlin đều hoạt động khá giống nhau. Trong khi coroutines mới được sinh ra, Schedulers đã có từ trước đó rất lâu cùng với RxJava, RxJs, RxSwift, ...

Coroutines phù hợp với việc phát triển áp dụng concurrency khi mà chúng ta không thể sử dụng RxKotlin Schedulers.

## 2. Observables, Observers
> **Observables** and **subscribers** are at the base of reactive programming

Chúng ta có thể nói rằng chúng là building blocks của reactive programming. 

3 thành phần trụ cột của reactive programming—Observables, Observers, and subjects:
- Chúng ta sẽ đi vào chi tiết của việc biến đổi các loại data sources thành observable instances
- Bạn sẽ tìm hiểu về các types của Observables
- Cách sử dụng Observer instances và subscriptions và cuối cùng

### 2.1. Observables
Trong reactive programming, Observable là một tính toán cơ bản mà produces các value sẽ được consumed bởi 1 comsumer (Observer).

Điều quan trọng và cần chú ý ở đây và **consumer (Observer) không pull values**, mà **Observable pushes the value** tới consumer.

Hoặc chúng ta có thể nói rằng Observable là 1 pushbased, emit các value thông qua các các operators và tới Observer:

- **Observer** subscribes với **Observable** 
- **Observable** bắt đầu emit các values nó đang chứa
- **Observer** phản hồi với bất kì item nào được **Observable** emit

**How Observable works?**

 **Observable** có 3 events/methods quan trọng nhất:
- **onNext**: Observable passes all items one by one tới onNext.
- **onComplete**: Khi tất cả items đã đi qua onNext method, Observable gọi the onComplete method.
- **onError**: Khi Observable gặp bất kì error nào, it gọi the onError method. 

Chú ý là cả onError and onComplete đều là terminal events, nếu onError được gọi, thì onComplete sẽ không bao giờ được gọi, và ngược lại.
![](https://images.viblo.asia/39316aab-a0d0-4692-ae7f-dfe38ae038c0.PNG)

```kotlin
fun main(args: Array<String>) {

    val observer: Observer<Any> = object : Observer<Any> {
        override fun onSubscribe(d: Disposable?) {
            println("Subscribed to $d")
        }

        override fun onNext(item: Any?) {
            println("Next $item")
        }

        override fun onError(e: Throwable?) {
            println("Error Occured $e")
        }

        override fun onComplete() {
            println("All Completed")
        }

    }

    val observable: Observable<Any> = listOf("One", 2, "Three", "Four", 4.5, "Five", 6.0f).toObservable() //Như các bạn thấy `.toObservable()` là 1 extension giúp chúng ta biến đổi 1 list -> observable 1 cách nhanh chóng :v

    observable.subscribe(observer)

    val observableOnList: Observable<List<Any>> =
        Observable.just(  //Converts three items into an Observable that emits those items.
            listOf("One", 2, "Three", "Four", 4.5, "Five", 6.0f),
            listOf("List with Single Item"),
            listOf(1,2,3,4,5,6))//8
    observableOnList.subscribe(observer)
}
```
Output:
```
Subscribed to io.reactivex.rxjava3.internal.operators.observable.ObservableFromIterable$FromIterableDisposable@4361bd48
Next One
Next 2
Next Three
Next Four
Next 4.5
Next Five
Next 6.0
All Completed
Subscribed to io.reactivex.rxjava3.internal.operators.observable.ObservableFromArray$FromArrayDisposable@7637f22
Next [One, 2, Three, Four, 4.5, Five, 6.0]
Next [List with Single Item]
Next [1, 2, 3, 4, 5, 6]
All Completed

Process finished with exit code 0
```

#### Understanding the Observable.create method
Bạn có thể tạo 1 Observable  với `Observable.create` method bất kì lúc nào.

Observable.create method khá là hữu dụng trong trường hợp bạn làm việc với custom data structure và muốn control over values được  emitted. Bạn có thể emit values tới Observer từ một thread khác.

```kotlin
val observable:Observable<String> = Observable.create<String> {//1
 it.onNext("Emit 1")
 it.onNext("Emit 2")
 it.onNext("Emit 3")
 it.onNext("Emit 4")
 it.onComplete()
 }
 observable.subscribe(observer)
 val observable2:Observable<String> = Observable.create<String> {//2
 it.onNext("Emit 1")
 it.onNext("Emit 2")
 it.onNext("Emit 3")
 it.onNext("Emit 4")
 it.onError(Exception("My Custom Exception"))
 }
 observable2.subscribe(observer)
 }
```
Output: 
```
Subscribed to CreateEmitter{null}
Next Emit 1
Next Emit 2
Next Emit 3
Next Emit 4
All Completed
Subscribed to CreateEmitter{null}
Next Emit 1
Next Emit 2
Next Emit 3
Next Emit 4
Error Occured java.lang.Exception: My Custom Exception
```
#### Understanding the Observable.from methods
`Observable.from` methods đơn giản hơn so với the `Observable.create` method. Bạn có thể create Observable instances từ hầu hết Kotlin structure bằng `from` methods.

Chú ý rằng ở RxKotlin 1, bạn sử dụng `Observale.from`; tuy nhiên, từ RxKotlin 2.0 (cũng như RxJava2.0), operator được đổi tên với 1 postfix, như là fromArray, fromIterable, fromFuture, ...

#### Understanding the Observable.just method
Observable.just cũng được sử dụng để create Observable. Tuy nhiên có hơi khác Observable.from 1 chút là:
ví dụ bạn pass 1 Iterable instance,  Observable.just sẽ coi đó là single parameter, nó sẽ emit tất cả item trong list như là 1 single item, trong khi đó Observable.from sẽ pass từng item trong list.

### 2.2. Subscribing and disposing
Subscribe operato được sử dụng để connect 1 Observable tới Observer. Chúng tá có thể pass 1 trong 3 methods (onNext, onComplete, onError) tới subscribe operator, hoặc pass 1 instance của Observer interface tới subscribe operator để Observable connect với Observer.

Khi bạn subscribe, nếu bạn pass methods thay vì Observer instance, subscribe operator sẽ trả về 1 instance của Disposable. Nếu bạn pass instance của Observer, bạn sẽ nhận được instance của Disposable ở trong onSubscribe method.

**Bạn có thể sử dụng instance của Disposable interface to để dừng các emissions bất ký lúc nào**
```kotlin
fun main(args: Array<String>) {
 runBlocking {
 val observale:Observable<Long> =
 Observable.interval(100,TimeUnit.MILLISECONDS) //1 we created an Observable with the Observable.interval factory method that will emit an integer after each 100 millisecond interval.
 val observer:Observer<Long> = object : Observer<Long> {
 lateinit var disposable:Disposable//2
 override fun onSubscribe(d: Disposable) {
 disposable = d//3
 }
 override fun onNext(item: Long) {
 println("Received $item")
 if(item>=10 && !disposable.isDisposed) {//4 stop emission
 disposable.dispose()//5
 println("Disposed")
 }
 }
 override fun onError(e: Throwable) {
 println("Error ${e.message}")
 }
 override fun onComplete() {
 println("Complete")
 }
 }
 observale.subscribe(observer)
 delay(1500)//6
 }
 }
```

Output: 
```
Received 0
Received 1
Received 2
Received 3
Received 4
Received 5
Received 6
Received 7
Received 8
Received 9
Received 10
Disposed
```

Trên kia là những gì cơ bản nhất khi mới tiếp cận RxJava hay RxKotlin. Đến đây chúng ta cần hiểu các khái niệm **Observables**, **Observers**,  **Subscribing** và **disposing** là gì đã.

## 3. Những operator hữu ích và hay gặp
Trước tiên, operator ở đây là gì? 

Khi bắt đầu học lập trình, chúng ta học về các operators là chuỗi các ký tự được viết ra để thực hiện 1 nhiệm vụ dựa trên toán hạng và trả về kết quả.

Đối với reactive, khái niệm về operator cũng tương tự, các toán hạng ở đây như là Observable/Flowable, chúng ta biến đổi chúng và trả về kết quả là Observable/Flowable.

Có 5 loại operators:
- Filtering/suppressing operators
- Transforming operators
- Reducing operators
- Error handling operators
- Utility operators

 Tuy nhiên để đi hết thì khá là dài nên mình chỉ liệt kê một số operator mà hay gặp thôi nhé. Có thể sau này có thời gian thì mình sẽ tách chi tiết ra sau.

 ### 3.1. Filtering/suppressing operators
- #### The debounce operator ()
Trì hoãn 1 khoảng thời gian sau mỗi emission, và loại bỏ emission trước đó nếu có 1 emission khác đc bắn ra trong khoảng thời gian trì hoãn và restart value trì hoãn
![](https://images.viblo.asia/074f03c0-2127-4e14-9a3e-43fd31513430.png)
``` kotlin
fun main(args: Array<String>) {
    createObservable() //(1) Tạo Observable
        .debounce(200, TimeUnit.MILLISECONDS)//(2) debounce 200 MILLISECONDS
        .subscribe {
            println(it)//(3)
        }
}

fun createObservable(): Observable<String> =
    Observable.create<String> {
        it.onNext("R")//(4)
        runBlocking { delay(100) }//(5) block thread current 100 MILLISECONDS
        it.onNext("Re")
        it.onNext("Reac")
        runBlocking { delay(130) }
        it.onNext("Reactiv")
        runBlocking { delay(140) }
        it.onNext("Reactive")
        runBlocking { delay(250) }//(6)
        it.onNext("Reactive P")
        runBlocking { delay(130) }
        it.onNext("Reactive Pro")
        runBlocking { delay(100) }
        it.onNext("Reactive Progra")
        runBlocking { delay(100) }
        it.onNext("Reactive Programming")
        runBlocking { delay(300) }
        it.onNext("Reactive Programming in")
        runBlocking { delay(100) }
        it.onNext("Reactive Programming in Ko")
        runBlocking { delay(150) }
        it.onNext("Reactive Programming in Kotlin")
        runBlocking { delay(250) }
        it.onComplete()
    }
```

Output

```
Reactive
Reactive Programming
Reactive Programming in Kotlin

Process finished with exit code 0
```
- #### The distinct operators 
Operator này khá đơn giản, nó giúp bạn lọc những emission bị duplicated từ upstream

![](https://images.viblo.asia/7e3476e0-3d6c-41c6-97af-0130e9acb831.png)

```kotlin
fun main(args: Array<String>) {
 listOf(1,2,2,3,4,5,5,5,6,7,8,9,3,10)//(1)
 .toObservable()//(2)
 .distinct()//(3)
 .subscribe { println("Received $it") }//(4)
 }
```
Output:
```
Received 1
Received 2
Received 3
Received 4
Received 5
Received 6
Received 7
Received 8
Received 9
Received 10

Process finished with exit code 0
```

- #### Filtering emissions - filter operator
Filter operator được cho là được sử dụng nhiều nhất trong nhóm filtering/suppressing operator. Nó cho phép bạn implement custom logic để lọc emissions.

```kotlin
fun main(args: Array<String>) {
    Observable.range(1,20)//(1)
        .filter{//(2) lọc chỉ cho output ra là số chẵn
            it%2==0
        }
        .subscribe {
            println("Received $it")
        }
}
```

Output: 
```
Received 2
Received 4
Received 6
Received 8
Received 10
Received 12
Received 14
Received 16
Received 18
Received 20

Process finished with exit code 0
```
Ngoài ra các operators trên bạn có thể tìm hiểu thêm `distinctUntilChanged`, `elementAt`, `first`, `last`, `ignoreElements` operator

### 3.2. Transforming operators
- #### The map operator
map operator thực hiện 1 task trên từng emitted items từ upstream và emits chúng tới downstream
map operator sẽ biến đổi  emitted item **type T ->  type R** bằng việc apply lambda function của nó. Dễ hiểu hơn thì nó dùng để chuyển đối 1 item thành 1 item khác.

![](https://images.viblo.asia/582b7492-6d1c-422f-8a2f-5c2ffe6e7ec4.png)

```kotlin
fun main(args: Array<String>) {
    val observable = listOf(10, 9, 8, 7, 6, 5, 4, 3, 2, 1).toObservable()
    observable.map {
            number ->
        "Transforming Int to String $number"
    }.subscribe { item ->
        println("Received $item")
    }
}
```
Output:
```
Received Transforming Int to String 10
Received Transforming Int to String 9
Received Transforming Int to String 8
Received Transforming Int to String 7
Received Transforming Int to String 6
Received Transforming Int to String 5
Received Transforming Int to String 4
Received Transforming Int to String 3
Received Transforming Int to String 2
Received Transforming Int to String 1

Process finished with exit code 0
```

- #### The flatMap operator
flatMap operator tạo mới 1 producer, apply function bạn pass đối với từng emission của source producer. FlatMap sẽ chuyển đổi các item phát ra bởi một Observable thành các Observable khác

```kotlin
fun main(args: Array<String>) {
    val observable = listOf(10,9,8,7,6,5,4,3,2,1).toObservable()

    observable.flatMap {
            number-> Observable.just("Transforming Int to String $number")
    }.subscribe {
            item-> println("Received $item")
    }
```
Nếu sử dụng như trên thì output giống với ví dụ của map operator.
```kotlin
fun main(args: Array<String>) {
    val observable = listOf(10,9,8,7,6,5,4,3,2,1).toObservable()

    observable.flatMap {
            number->
        Observable.create<String> {//(1)
            it.onNext("The Number $number")
            it.onNext("number/2: ${number/2}")
            it.onNext("number%2: ${number%2}")
            it.onComplete()//(2)
        }
    }.subscribeBy (
        onNext = {
                item-> println("Received $item")
        },
        onComplete = {
            println("Complete")
        }
    )
}
```

Output: 
```
Received The Number 10
Received number/2: 5
Received number%2: 0
Received The Number 9
Received number/2: 4
Received number%2: 1
Received The Number 8
Received number/2: 4
Received number%2: 0
Received The Number 7
Received number/2: 3
Received number%2: 1
Received The Number 6
Received number/2: 3
Received number%2: 0
Received The Number 5
Received number/2: 2
Received number%2: 1
Received The Number 4
Received number/2: 2
Received number%2: 0
Received The Number 3
Received number/2: 1
Received number%2: 1
Received The Number 2
Received number/2: 1
Received number%2: 0
Received The Number 1
Received number/2: 0
Received number%2: 1
Complete

Process finished with exit code 0
```

Nếu các bạn để ý thì sẽ thấy điểm khác biệt chính giữa `map` và `flatMap` là `FlatMap` bản thân nó sẽ trả về một `Observable`.


Ngoài map và flatMap ra thì các bạn có thể tìm hiểu thêm `cast`, `defaultIfEmpty`, `switchIfEmpty`, `startWith`, `sorted`, `scan` operator.

### 3.3. Reducing operators
- #### Counting emissions (count operator)
count operator subscribes với producer, đếm the emissions, và emits 1 `Single` chứa số lượng của emissions được emit bởi producer.

![](https://images.viblo.asia/5b06867e-4826-4ebc-b13c-d08c69e47d22.png)

```kotlin
fun main(args: Array<String>) {
    listOf("A", "B", "C", "D", "E").toObservable()
        .count()
        .subscribeBy { println("count $it") }
}
```
Output: 
```
count 5

Process finished with exit code 0
```

- #### Accumulating emissions – reduce operator

Reduce là một accumulating operator khá thú vị. Nó cộng dồn tất cả các emissions được emit từ producer.

![](https://images.viblo.asia/4be243ae-a509-4930-98c3-2f83b136b480.png)

```kotlin
fun main(args: Array<String>) {
     Observable.range(1,10)
     .reduce { previousAccumulation, newEmission ->
     previousAccumulation+newEmission }
     .subscribeBy { println("accumulation $it") }
     Observable.range(1,5)
     .reduce { previousAccumulation, newEmission ->
     previousAccumulation*10+newEmission }
     .subscribeBy { println("accumulation $it") }
 }
```
Output:
```
accumulation 55
accumulation 12345

Process finished with exit code 0
```

### 3.4. Error handling operators

Chúng ta đều biết về onError event ở Subscriber/Observer. Tuy nhiên, vấn đề là onError event chỉ emitted tới downstream consumer và subscription ngay lập tức vị chấm dứt. Vì vậy, trong trường hợp chúng ta muốn handle error khi value đang được emit ở upstream thì sao? Thật may mắn là chúng ta có các handling operators.

- #### onErrorReturn – return a default value on error
onErrorReturn sẽ return 1 default value tới downstream khi một error occurred in the upstream.

```kotlin
fun main(args: Array<String>) {
Observable.just(1, 2, 3, 4, 5)
        .map { it / (3 - it) }
        .onErrorReturn { -1 } //onErrorReturn – return a default value on error
        .subscribe {
            println("Received $it")
        }
}
```
Output:
```
Received 0
Received 2
Received -1

Process finished with exit code 0
```
- #### The onErrorResumeNext operator 
onErrorResumeNext operator giúp bạn subscribe với một producer khác khi có error xảy ra.
```kotlin
fun main(args: Array<String>) {
Observable.just(1, 2, 3, 4, 5)
        .map { it / (3 - it) }
        .onErrorResumeNext{Observable.range(10,5)}//(1) subscribe the another observable.
        .subscribe {
            println("Received $it")
        }
}
```
Output:
```
Received 0
Received 2
Received 10
Received 11
Received 12
Received 13
Received 14

Process finished with exit code 0
```
- #### Retrying on error
retry operator cũng là một error handling operator khác cho phép bạn retry/resubscribe tới producer khi 1 error xảy ra. Bạn chỉ cần cung cấp số lần retry và điều kiện retry.

```kotlin
fun main(args: Array<String>) {
    Observable.just(1, 2, 3, 4, 5)
        .map { it / (3 - it) }
        .retry(3)//(1)
        .subscribeBy(
            onNext = { println("Received $it") },
            onError = { println("Error") }
        )
        
        
    println("\n With Predicate \n")
    var retryCount = 0
    Observable.just(1, 2, 3, 4, 5)
        .map { it / (3 - it) }
        .retry {//(2)
                _, _ ->
            (++retryCount) < 3
        }
        .subscribeBy(
            onNext = { println("Received $it") },
            onError = { println("Error") }
        )
}
```
Output: 
```
Received 0
Received 2
Received 0
Received 2
Received 0
Received 2
Received 0
Received 2
Error

 With Predicate 

Received 0
Received 2
Received 0
Received 2
Received 0
Received 2
Error

Process finished with exit code 0
```

### 3.5. Utility operators

Dưới đây là list utility operators:
- doOnNext, doOnComplete, and doOnError
- doOnSubscribe, doOnDispose, and doOnSuccess
- serialize
- cache

Chúng sẽ giúp chúng ta thực hiện đa dạng các utility operations như là thực hiện action trên các emission (doOnNext), ghi nhớ timestamps, caching, ...
## 4. Schedulers
- **What is a scheduler?** 
Nói là RxKotlin giúp xử lý bất đồng bộ, từ nãy giờ chưa thấy bất đồng bộ ở đâu nhỉ. Scheduler chính là cái giúp chúng ta làm điều đó. 
Scheduler có thể được hiểu giống như thread pool. ReactiveX có thể pool 1 thread và execute task trên thread đó.

- **Types of scheduler**
    - Schedulers.io(): Khi dùng cái này thì sẽ không dùng đến CPU, nó thực hiện các công việc chuyên sâu như networks call, đọc đĩa/file, database, … Nó duy trì được pool của thread.
    - Schedulers.computation(): Có thể đòi hỏi đến đòi hỏi nhiều CPU như xử lý dữ liệu lớn, xử lý bitmap, … Số lượng các thread được tạo ra bằng cách sử dụng Scheduler này hoàn toàn phụ thuộc vào số lõi CPU.
    - Schedulers.newThread(): Sử dụng cái này thì mỗi thread sẽ được tạo ra mỗi lần nhiệm vụ được xếp lịch. Thường thì không khuyến cáo sử dụng cách này trừ khi công việc rất dài. Thread được tạo qua newThread() sẽ không được dùng lại.
    - Schedulers.single(): Scheduler này sẽ thực hiện tất cả các nhiệm vụ theo thứ tự tuần tự mà chúc được add vào. Việc này có thể cần thiết trong một số trường hợp cần tuần tự.
    - Schedulers.trampoline(): Nó thực hiện các nhiệm vụ theo Last In - First Out. Tất cả các nhiệm vụ được xếp lịch sẽ được thực hiện từng cái một bằng cách giới hạn số lượng các background thread thành một.
    - Schedulers.from(): Cách này cho phép tạo ra một Scheduler từ một Executor bởi giới hạn số lượng các thread được tạo ra. Khi thread pool bị full, các nhiệm vụ sẽ xếp hàng đợi.

```
fun main(args: Array<String>) {
    Observable.range(1, 10)
        .subscribeOn(Schedulers.computation())//(1) chúng ta sẽ lựa chọn Scheduler phù hợp khi subscribeOn
        .subscribe {
            runBlocking { delay(200) }
            println("${Thread.currentThread().name} - Observable1 Item Received $it")
        }
    Observable.range(21, 10)
        .subscribeOn(Schedulers.computation())//(2)
        .subscribe {
            runBlocking { delay(100) }
            println("${Thread.currentThread().name} - Observable2 Item Received $it")
        }
    runBlocking { delay(2100) }//(3)
}
```

Output:
```
RxComputationThreadPool-2 - Observable2 Item Received 21
RxComputationThreadPool-1 - Observable1 Item Received 1
RxComputationThreadPool-2 - Observable2 Item Received 22
RxComputationThreadPool-2 - Observable2 Item Received 23
RxComputationThreadPool-1 - Observable1 Item Received 2
RxComputationThreadPool-2 - Observable2 Item Received 24
RxComputationThreadPool-2 - Observable2 Item Received 25
RxComputationThreadPool-1 - Observable1 Item Received 3
RxComputationThreadPool-2 - Observable2 Item Received 26
RxComputationThreadPool-2 - Observable2 Item Received 27
RxComputationThreadPool-1 - Observable1 Item Received 4
RxComputationThreadPool-2 - Observable2 Item Received 28
RxComputationThreadPool-2 - Observable2 Item Received 29
RxComputationThreadPool-1 - Observable1 Item Received 5
RxComputationThreadPool-2 - Observable2 Item Received 30
RxComputationThreadPool-1 - Observable1 Item Received 6
RxComputationThreadPool-1 - Observable1 Item Received 7
RxComputationThreadPool-1 - Observable1 Item Received 8
RxComputationThreadPool-1 - Observable1 Item Received 9
RxComputationThreadPool-1 - Observable1 Item Received 10

Process finished with exit code 0
```

Nội dung bài viết cũng tương đối dài rồi nên mình xin dừng lại tại đây. Mình mong là qua bài này mọi người có cái nhìn tổng quan về RxKotlin. Cảm ơn các bạn đã đọc bài viết.