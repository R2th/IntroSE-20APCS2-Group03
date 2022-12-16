**Giới thiệu**

Chào mọi người, ở bài viết này mình muốn trình bày về việc quản lý **Disposable** trong ứng dụng android. 

Bài viết này mình muốn hướng đến đối tượng những người mới học và làm việc với RxAndroid như mình. 

Trước hết để hiểu về **Disposable** thì các bạn cần hiểu Subscription là gì. Trong Rx1 mỗi khi có thực hiện 1 Observable sau đó chuyển qua 1 subcriber xử lý sẽ trả về 1 Subscription.
Việc quản lý Subscription là r quan trọng. Vì các bạn tưởng tượng bất cứ thứ gì mà quá tài nguyên có hạn trong khi việc sử dụng thì lại không giới hạn thì đều bất ổn phải không?

**Disposable** trong Rx2 tương ứng với Subscription Rx1 hay nói cách khác thì Disposable là một Subscription mới. 
Tương ứng như vậy thì trong Rx2 cũng cần phải quản lý **Disposable**. Vậy trong Rx2 thì Disposable được quản lý như thế nào. Cách sử dụng ra sao. 
Sau đây mình xin trình bày về việc sử dụng CompositeDisposable trong việc quản lý **Disposable** của ứng dụng android

# 1. Xử lý dispose() thông thường cho Disposable
Giả sử hiện tại bạn đang có 3 **Disposable** thực hiện gọi 3 api tại cùng 1 fragment hoặc activity.



```
var disposable = api.call1(arg1, arg2).subscribe(...)
var disposable2 = api.call2(arg1).subscribe(...)
var disposable3 = api.call3().subscribe()
```




Nếu bạn muốn nhanh chóng xử lý dispose() cho các disposable này thì bạn cần thực hiện


```
disposable.dispose()
disposable2.dispose()
disposable3.dispose()
```


Tưởng chừng như đơn giản nhưng bạn hãy tưởng tượng khi bạn có nhiều hơn số lượng disposable được phân tán nhiều nơi trong code của mình thì việc disposable các disposable của bạn sẽ rất phức tạp.

# 2. Xử lý dispose() bằng CompositeDisposable

**CompositeDisposable** được sinh ra để chứa tất cả các **Disposable** mà bạn mong muốn.


```
val composite = CompositeDisposable()
composite.add(api.call1(arg1, arg2).subscribe(...))
composite.add(api.call2(arg1).subscribe(...))
composite.add(api.call3().subscribe())
```


Và khi muốn dispose toàn bộ các **Disposable** của bạn thì bạn chỉ cần gọi 


`composite.dispose()`


Phần code dispose này các bạn có thể đặt nó trong hàm destroy của Fragment, Activity hay bất cứ khi nào mà bạn nghĩ tiến trình của mình không dùng đến nữa.

# 3. DisposableManager
Để thuận tiện cho việc sử dụng  thì ở đây mình có 1 class DisposableManager

```
public class DisposableManager {

    private static CompositeDisposable compositeDisposable;

    public static void add(Disposable disposable) {
        getCompositeDisposable().add(disposable);
    }

    public static void dispose() {
        getCompositeDisposable().dispose();
    }

    private static CompositeDisposable getCompositeDisposable() {
        if (compositeDisposable == null || compositeDisposable.isDisposed()) {
            compositeDisposable = new CompositeDisposable();
        }
        return compositeDisposable;
    }

    private DisposableManager() {}
}
```

Với cách viết này thì bạn hãy tạm quên đi việc sử dụng **Observer** thông thường và sử dụng qua đoạn code sau.

```
public class DisposingObserver<T> implements Observer<T> {
    @Override
    @CallSuper
    public void onSubscribe(Disposable d) {
        DisposableManager.add(d);
    }

    @Override
    public void onNext(T next) {}

    @Override
    public void onError(Throwable e) {}

    @Override
    public void onComplete() {}
}
```
Bạn hãy để ý ở đoạn code trên trong hàm onSubscribe(Disposable d) tương ứng với việc mỗi khi bạn khởi tạo new DisposingObserver() thay cho new Observer() thì **Disposable** của bạn đã được tự động thêm vào **CompositeDisposable** qua DisposableManager. Và như vậy thì việc dispose toàn bộ Disposable cũng rất đơn giản. Bạn chỉ cần gọi DisposableManager.dispose()  trong hàm destroy của Fragment, Activity hay bất cứ khi nào mà bạn nghĩ tiến trình của mình không dùng đến nữa.
 
 
Như vậy là mình đã trình bày xong bài viết về quản lý **Disposable** trong RxJava2. Hi vọng qua bài viết các bạn có thể hiểu về **CompositeDisposable**. Sử dụng **CompositeDisposable** trong việc quản lý **Disposable** một cách hiệu quả. 

Nguồn: https://blog.kaush.co/2017/06/21/rxjava-1-rxjava-2-disposing-subscriptions, https://medium.com/@CodyEngel/managing-disposables-in-rxjava-2-for-android-388722ae1e8a. Nếu có gì sai sót rất mong nhận được sự đóng góp từ phía các bạn.