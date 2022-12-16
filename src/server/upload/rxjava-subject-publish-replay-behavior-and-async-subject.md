# RxJava Subject — Publish, Replay, Behavior and Async Subject
Sau đây, chúng ta sẽ tìm hiểu về các Subject có sẵn trong RxJava: 
* Publish Subject
* Replay Subject
* Behavior Subject
* Async Subject

Vậy Subject là gì? 

> A Subject is a sort of bridge or proxy that is available in some implementations of ReactiveX that acts both as an observer and as an Observable. Because it is an observer, it can subscribe to one or more Observables, and because it is an Observable, it can pass through the items it observes by re-emitting them, and it can also emit new items.

* Giả sử professor là một Observable.  Professor dạy về một vài topic.

* Giả sử student là một Observer. Student quan sát topic mà professor đang dạy.

## Publish Subject

Nó emits tất cả subsequent items của nguồn Observable tại thời điểm subscription.

Ở đây, nếu một student đã vào lớp muộn, nó chỉ muốn nghe từ thời điểm nó vào lớp, thì Publish sẽ là lựa chọn tốt nhất trong trường hợp này.

Ví dụ: 
```java
PublishSubject<Integer> source = PublishSubject.create();

// It will get 1, 2, 3, 4 and onComplete
source.subscribe(getFirstObserver()); 

source.onNext(1);
source.onNext(2);
source.onNext(3);

// It will get 4 and onComplete for second observer also.
source.subscribe(getSecondObserver());

source.onNext(4);
source.onComplete();
```

[*Xem ví dụ đầy đủ ở đây!*](https://github.com/amitshekhariitbhu/RxJava2-Android-Samples/blob/master/app/src/main/java/com/rxjava2/android/samples/ui/operators/PublishSubjectExampleActivity.java)

## Replay Subject
Nó emits tất cả subsequent items của nguồn Observable, mặt cho subscriber subscribe khi nào.

Ở đây, nếu student đã vào lớp muộn, nó muốn nghe lại tất cả từ khi bắt đầu thì chúng ta sẽ sử dụng Replay.

Ví dụ: 
```java
ReplaySubject<Integer> source = ReplaySubject.create();

// It will get 1, 2, 3, 4
source.subscribe(getFirstObserver());
source.onNext(1);
source.onNext(2);
source.onNext(3);
source.onNext(4);
source.onComplete();

// It will also get 1, 2, 3, 4 as we have used replay Subject
source.subscribe(getSecondObserver());
```

[*Xem ví dụ đầy đủ ở đây!*](https://github.com/amitshekhariitbhu/RxJava2-Android-Samples/blob/master/app/src/main/java/com/rxjava2/android/samples/ui/operators/ReplaySubjectExampleActivity.java)

## Behavior Subject
Nó emits item gần nhất được emited và tất cả subsequent items của nguồn Observable khi một observer subcribes đến nó. 

Ở đây, nếu student đã vào lớp muộn, nhưng muốn nghe những gì gần nhất (Không phải từ lúc bắt đầu) professor đang dạy, để student có thể nắm được idea của ngữ cảnh. Trong trường hợp này chúng ta sẽ sử dụng Behavior.

Ví dụ: 
```java
BehaviorSubject<Integer> source = BehaviorSubject.create();

// It will get 1, 2, 3, 4 and onComplete
source.subscribe(getFirstObserver());
source.onNext(1);
source.onNext(2);
source.onNext(3);

// It will get 3(last emitted)and 4(subsequent item) and onComplete
source.subscribe(getSecondObserver());

source.onNext(4);
source.onComplete();
```
[*Xem ví dụ đầy đủ ở đây!*](https://github.com/amitshekhariitbhu/RxJava2-Android-Samples/blob/master/app/src/main/java/com/rxjava2/android/samples/ui/operators/BehaviorSubjectExampleActivity.java)

## Async Subject
Nó chỉ emits giá trị cuối cùng của source Observable (chỉ giá trị cuối cùng).

Bây giờ, nếu student vào lớp bất kì lúc nào, và chỉ muốn nghe những thứ cuối cùng, sau khi lớp kết thúc thì Async sẽ là lựa chọn của chúng ta. 

Ví dụ: 
```java
AsyncSubject<Integer> source = AsyncSubject.create();

// It will get only 4 and onComplete
source.subscribe(getFirstObserver());
source.onNext(1);
source.onNext(2);
source.onNext(3);

// It will also get only get 4 and onComplete
source.subscribe(getSecondObserver());

source.onNext(4);
source.onComplete();
```
[*Xem ví dụ đầy đủ ở đây!*](https://github.com/amitshekhariitbhu/RxJava2-Android-Samples/blob/master/app/src/main/java/com/rxjava2/android/samples/ui/operators/AsyncSubjectExampleActivity.java)

# Kết luận
Trong tùy trường hợp, mà chúng ta sẽ có những lựa chọn phù hợp ứng với từng Subject, và có thể tận dụng được hết khả năng của RxJava. 

# Tham khảo
1. https://blog.mindorks.com/understanding-rxjava-subject-publish-replay-behavior-and-async-subject-224d663d452f
2. https://github.com/amitshekhariitbhu/RxJava2-Android-Samples