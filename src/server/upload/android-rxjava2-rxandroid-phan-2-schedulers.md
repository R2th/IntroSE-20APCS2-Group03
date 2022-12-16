# Đôi lời
như bài trước mình đã giới thiệu với các bạn về Observable/Subsriber ([](https://viblo.asia/p/android-rxjava-rxandroid-phan-1-observeonsubscribeon-la-gi-1VgZvwp1lAw))

 nhiệm vụ của 2 operators là quyết định luồng của data chúng ta sử lí. Vậy cái gì trong Rxjava định nghĩa những thread này ?  và có bao nhiêu loại thread được đinh?
 
 những threads này khi nào được sử dụng
 
 đó chính là mục tiêu mà bài viết này mình đề cập tới 
 
 # Schedulers
### Định nghĩa
Schedulers là một trong những thành phần chính trong RxJava. Họ chịu trách nhiệm thực hiện các hoạt động của Observable  trên các threads khác nhau dựa trên các phương thức subscribeOn và observOn


## 1 Schedulers.trampoline() 
### Lí Thuyết 
Mọi công việc đăng kí Schedulers.trampoline()  sẽ được xếp vào hàng đợi và sẽ được thực hiện từng công việc một 

### vì dụ 

```java
  fun testRxJava() {
    var result = ""
    Observable.just(2, 4, 6, 8)
            .subscribeOn(Schedulers.trampoline())
            .subscribe { i ->
                result += "\n $i" + "\t" + Thread.currentThread().name
            }
    Observable.just(1, 3, 5, 7, 9)
            .subscribeOn(Schedulers.trampoline())
            .subscribe { i ->
                result += "\n $i" + "\t" + Thread.currentThread().name
            }
    Thread.sleep(500)
    Log.e("result", result)
}
                
        //result: 
        
        E/result:  2	main
           4	main
           6	main
           8	main
           1	main
           3	main
           5	main
           7	main
           9	main

```

Như kết quả ở result chúng ta thấy Schedulers.trampoline() giúp chúng ta in ra kết quả một cách tuần tự và trên cùng một thread

## 2 Schedulers.newThread()

### Lí thuyết 

Tạo ra một thread mới khi có yêu cầu từ subscribeOn() và observeOn()

### Vi Dụ

```java
 var result2=""
    var result1=""
    Observable.just("Hello")
            .observeOn(Schedulers.newThread())
            .doOnNext({ s -> result2 += Thread.currentThread().name }
            )
            .observeOn(Schedulers.newThread())
            .subscribe({ s -> result1 += Thread.currentThread().name }
            )
    Thread.sleep(500)
    Log.e("result2", ""+result2)
    Log.e("result1", ""+result1)
                
result 

result2: RxNewThreadScheduler-1
result1: RxNewThreadScheduler-2
    
```

Như kết quả của result1 và result1 chúng ta thấy được au mỗi yêu cầu mời từ subscribeOn, observeOn  Schedulers.newThread sẽ tạo ra một thread mới để xử lí yêu cầu 

## 3 Schedulers.io

### Lí thuyết 
**Đây là một trong những lựa chọn Schedulers mà chúng ta hay sử dụng nhiều nhất**
Schedulers.io giống với newThread nhưng điểm khác là nó được hỗ trợ bởi thread-pool 
Nó thường được sử dụng trong các task vụ mất nhiều thời gian, Chẳng hạn như yêu cầu mạng, xử lí dọc ghi file.
*chú ý* : Không sử dụng các task vụ tính toán trên scheduler này  

### vì dụ
nó hoàn toàn giống với Schedulers.newThread() nên mình cung không demo lại nữa

## 4 Schedulers.computation
Nó được sử dụng cho Nó được sử dụng cho  event-loops , xử lí callbacks và các công việc tính toàn
Được hỗ trợ bởi thread-pool giói hạn kích thước bằng với số lượng bộ vi xử lý có sẵn 

### Ví dụ

```java
   fun testRxJava() {
        var result1 = ""
        var result2 = ""
        var result3 = ""
        var result4 = ""
        var result5 = ""
        
        Observable.just(1, 2)
                .subscribeOn(Schedulers.computation())
                .subscribe { i ->
                    result1 += "\n $i" + "\t" + Thread.currentThread().name
                }
        Observable.just(3,4)
                .subscribeOn(Schedulers.computation())
                .subscribe { i ->
                    result2 += "\n $i" + "\t" + Thread.currentThread().name
                }
        Observable.just(5,6)
                .subscribeOn(Schedulers.computation())
                .subscribe { i ->
                    result3 += "\n $i" + "\t" + Thread.currentThread().name
                }
        Observable.just(7,8)
                .subscribeOn(Schedulers.computation())
                .subscribe { i ->
                    result4 += "\n $i" + "\t" + Thread.currentThread().name
                }
        Observable.just(9,10)
                .subscribeOn(Schedulers.computation())
                .subscribe { i ->
                    result5 += "\n $i" + "\t" + Thread.currentThread().name
                }
        
        Thread.sleep(500)
        Log.e("result1", result1)
        Log.e("result2", result2)
        Log.e("result3", result3)
        Log.e("result4", result4)
        Log.e("result5", result5)
    
    //result
     E/result1:  1	RxComputationThreadPool-1
            2	RxComputationThreadPool-1
     E/result2:  3	RxComputationThreadPool-2
            4	RxComputationThreadPool-2
     E/result3:  5	RxComputationThreadPool-3
            6	RxComputationThreadPool-3
     E/result4:  7	RxComputationThreadPool-4
            8	RxComputationThreadPool-4
     E/result5:  9	RxComputationThreadPool-1
            10	RxComputationThreadPool-1
            
  ```
           
 Như các bạn đã thấy ở kết quả cả fun testRxJava được thực hiện trên 4 thread  trong đó mình thực hiện 5 phương thức tại sao lại vậy
 bởi vì nó được hỗ trợ thread-pool giói hạn kích thước bằng với số lượng bộ vi xử lý(processors) có sẵn và trong trường hợp này máy mình hiện tại chỉ có 4 vi sử lí (processors) có sẵn
 
 ## Kết
 
  Ở bài viết này mính đã giới thiệu với các bạn về Schedulers và một số  định nghĩ thread hay được sử dụng của nó 
  Hi vọng sau khi đọc bài viết này sẽ giúp các bạn hiểu rõ hơn về Schedulers và cách sử dụng mà Schedulers cung cấp 
  ví dụ :
  khi nào sử dụng Schedulers.io ,khi nào không nên sử dung ? 
  Schedulers.computation và Schedulers.io khác nhau ở điểm nào ?
  
  ### Reference
-  https://android.jlelse.eu/rxjava-schedulers-what-when-and-how-to-use-it-6cfc27293add
-  http://www.baeldung.com/rxjava-schedulers
-  http://reactivex.io/RxJava/javadoc/rx/schedulers/Schedulers.html#io--