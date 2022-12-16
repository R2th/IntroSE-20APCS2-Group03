![](https://images.viblo.asia/7ee46f2d-91f0-430d-bd1e-3192d46e12ad.png)
Trong bài viết này mình sẽ giới thiệu về các loại Subject trong RxAndroid:
* Publish Subject
* Replay Subject
* Behavior Subject
* Async Subject

Trước tiên chúng ta cùng xem định nghĩa Subject:
> A Subject is a sort of bridge or proxy that is available in some implementations of ReactiveX that acts both as an observer and as an Observable. Because it is an observer, it can subscribe to one or more Observables, and because it is an Observable, it can pass through the items it observes by re-emitting them, and it can also emit new items.

Ở định nghĩa trên khá dài nên chúng ta cùng vào ví dụ cụ thể để có thể hiểu rõ hơn.

Giả sử chúng ta có như sau:

**Observable**: là giảng viên và sẽ dạy về một số chủ đề của môn học.

**Oberver**:  là sinh viên sẽ lắng nghe giảng viên giảng về các chủ để của môn học.

Đồng thời mình cũng tạo 2 Observer và đăng kí tại các thời điểm khác nhau để chúng ta tiện theo dõi những item của các đối tượng này nhận được khác nhau như thế nào.

FirstObserver:
```
private Observer<Integer> getFirstObserver() {
        Observer<Integer> firstObserver = new Observer<Integer>() {
            @Override
            public void onSubscribe(Disposable d) {
            
            }
            
            @Override
            public void onNext(Integer integer) {
                Log.d(TAG, "First " + integer);
            }
            
            @Override
            public void onError(Throwable e) {
            
            }
            
            @Override
            public void onComplete() {
            
            }
        };
        return firstObserver;
    }
```
SecondObserver:
```
private Observer<Integer> getSecondObserver() {
        Observer<Integer> secondObserver = new Observer<Integer>() {
            @Override
            public void onSubscribe(Disposable d) {
            
            }
            
            @Override
            public void onNext(Integer integer) {
                Log.d(TAG, "Second " + integer);
            }
            
            @Override
            public void onError(Throwable e) {
            
            }
            
            @Override
            public void onComplete() {
            
            }
        };
        return secondObserver;
    }
```
[Xem thêm trên Github](https://github.com/morejump/rxandroidemo)
# Publish Subject
> It emits all the subsequent items of the source Observable at the time of subscription.
> 
Nghĩa là nếu chúng ta có một Observer thì nó sẽ nhận được tất cả các item mà Observable phát ra khi đăng kí tới Observable đó.

Giả sử sinh viên đến muộn để vào lớp. Và chỉ muốn lắng nghe những chủ đề mà giảng viên giảng vào thời điểm anh ấy vào lớp học. Chúng ta sẽ sử dụng Publish cho trường hợp này:

```
PublishSubject<Integer> publishSubject = PublishSubject.create();
        
        // First Observer sẽ nhận được giá trị 1,2,3,4
        
        publishSubject.subscribe(getFirstObserver());
    
        publishSubject.onNext(1);
        publishSubject.onNext(2);
        publishSubject.onNext(3);
        
        // Second Observer sẽ nhận được giá trị 4
        publishSubject.subscribe(getSecondObserver());
    
        publishSubject.onNext(4);
        publishSubject.onComplete();
```
[Xem thêm trên Github](https://github.com/morejump/rxandroidemo/tree/publish_subject)
# Replay Subject
> It emits all the items of the source Observable, regardless of when the subscriber subscribes.

Điều này có nghĩa dù thời điểm đăng kí Observer là bất cứ lúc nào thì Observer sẽ nhận được đầy đủ các item mà Observerable phát ra.
Hay trong ví dụ của chúng ta là khi sinh viên đến lớp muộn nhưng anh ấy vẫn muốn được nghe từ thời điểm mà giảng viên bắt đầu giảng bài. Chúng ta sẽ sử dụng Replay trong trường hợp này:
```
 ReplaySubject<Integer> replaySubject = ReplaySubject.create();
       // First Observer sẽ nhận được giá trị  1, 2, 3, 4
        replaySubject.subscribe(getFirstObserver());
        replaySubject.onNext(1);
        replaySubject.onNext(2);
        replaySubject.onNext(3);
        replaySubject.onNext(4);
        replaySubject.onComplete();
// Second Observer sẽ nhận được giá trị tương tự là 1, 2, 3, 4
        replaySubject.subscribe(getSecondObserver());
```
[Xem thêm trên Github](https://github.com/morejump/rxandroidemo/tree/replay_subject)
# Async Subject
> It only emits the last value of the source Observable(and only the last value) only after that source Observable completes.

Trong trường hợp này dù sinh viên vào lớp ở bất cứ thời điểm nào thì anh ấy cũng chỉ muốn nghe chủ đề cuối cùng của môn học mà giảng viên đã giảng.
```
AsyncSubject<Integer> asyncSubject = AsyncSubject.create();
        // First Observer sẽ chỉ nhận được giá trị cuối cùng là 4
        asyncSubject.subscribe(getFirstObserver());
        asyncSubject.onNext(1);
        asyncSubject.onNext(2);
        asyncSubject.onNext(3);
        // Second Observer sẽ cũng chỉ nhận được giá trị cuối cùng là 4
        asyncSubject.subscribe(getSecondObserver());
        asyncSubject.onNext(4);
        asyncSubject.onComplete();
```
[Xem thêm trên Github](https://github.com/morejump/rxandroidemo/tree/async_subject)
# Behavior Subject
> It emits the most recently emitted item and all the subsequent items of the source Observable when an observer subscribes to it.

Trong trường hợp này thì sinh viên vào lớp nhưng anh ấy muốn nghe chủ đề trước khi anh ấy vào và tất cả chủ đề còn lại đến khi buổi học kết thúc.
```
 BehaviorSubject<Integer> behaviorSubject = BehaviorSubject.create();
        // First Observer nhận được giá trị là 1, 2, 3, 4
        behaviorSubject.subscribe(getFirstObserver());
        behaviorSubject.onNext(1);
        behaviorSubject.onNext(2);
        behaviorSubject.onNext(3);
        // Second Observer sẽ nhận được giá trị là 3, 4
        behaviorSubject.subscribe(getSecondObserver());
        behaviorSubject.onNext(4);
        behaviorSubject.onComplete();
```
[Xem thêm trên Github](https://github.com/morejump/rxandroidemo/tree/behavior_subject)
# Kết luận
Vừa rồi là phần trình bày của mình về 4 loại Subject trong RxAndroid. Subject thực sự là một đối tượng được sử dụng rất nhiều. Với mỗi trường hợp cụ thể thì ta sẽ có những loại Subject phù hợp cho từng trường hợp đó.

Bài viết có tham khảo tại:

https://blog.mindorks.com/understanding-rxjava-subject-publish-replay-behavior-and-async-subject-224d663d452f