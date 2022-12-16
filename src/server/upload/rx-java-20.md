- ở bài này mình nới về rxjava cụ thể cho android, nên các khái niệm các thuật ngữ để dùng cho lập trình android nhé!
### 1. Các khái niệm
- reactive (phản ứng): trong lập trình 1 hành động xảy ra thì hàn động kia phải biết ta gọi là phản ứng
- observables (đài quan sát): nới quan sát lắng nghe sự thay đổi
- subscribers (thuê bao): nới nhận tín hiệu từ đài quan sát
### 2. Lập trình phản ứng với rxjava 2.0
- Phản ứng khi nào: khia ta hận được dữ liệu ta phải biết là dữ liệu đã nhận được chưa để xử lý, như vậy lập trình bất đồng bộ còn được gọi là lập trình phản ứng
- Lập trình phản ứng cho phép truyền dữ liệu từ đài quan sát dến thuê bao
- Rxjava là 1 công cụ để thực hiện việc quan sát và thông báo như mình nói bên trên
### 3. Ví dụ
```
public class RxJavaUnitTest {
    String result="";

    @Test
    public void returnAValue(){
        result = "";
        Observable<String> observer = Observable.just("Hello"); // provides datea
        observer.subscribe(s -> result=s); // Callable as subscriber
        assertTrue(result.equals("Hello"));
    }
}
```
### 4. Tạo Đài quan sát, đăng ký chúng và xử lý chúng
**Các loại đài quan sát:**
- Flowable<T>
- Observable<T>
- Single<T>
- Maybe<T>
- Completable
 
- VD:
```
Observable<Todo> todoObservable = Observable.create(emitter -> {
    try {
        List<Todo> todos = getTodos();
        for (Todo todo : todos) {
            emitter.onNext(todo);
        }
        emitter.onComplete();
    } catch (Exception e) {
        emitter.onError(e);
    }
});
```         
- VD Lambda:
```
Observable<Todo> todoObservable = Observable.create(emitter -> {
    try {
        List<Todo> todos = getTodos();
        for (Todo todo : todos) {
            emitter.onNext(todo);
        }
        emitter.onComplete();
    } catch (Exception e) {
        emitter.onError(e);
    }
});
```
- VD maybe:
```
Maybe<List<Todo>> todoMaybe = Maybe.create(emitter -> {
    try {
        List<Todo> todos = getTodos();
        if(todos != null && !todos.isEmpty()) {
            emitter.onSuccess(todos); 
        } else {
            emitter.onComplete(); 
        }
    } catch (Exception e) {
        emitter.onError(e); 
    }
});
```
### 5. Nhận tín hiệu từ đài quan sát
```
// đài quan sát
Observable<Todo> todoObservable = Observable.create(emitter -> { ... });

// nghe tại onNext
Disposable disposable = todoObservable.subscribe(t -> System.out.print(t));

// Bỏ đăng kí
disposable.dispose();

// nghe tại onNext và on error
Disposable subscribe = todoObservable.subscribe(t -> System.out.print(t), e -> e.printStackTrace());
```
```
DisposableObserver<Todo> disposableObserver = todoObservable.subscribeWith(new  DisposableObserver<Todo>() {

@Override
public void onNext(Todo t) {
}

@Override
public void onError(Throwable e) {
}

@Override
public void onComplete() {
}
});
```
- làm việc với nhiều thuê bao
```
CompositeDisposable compositeDisposable = new CompositeDisposable();

Single<List<Todo>> todosSingle = getTodos();

Single<Happiness> happiness = getHappiness();

compositeDisposable.add(todosSingle.subscribeWith(new DisposableSingleObserver<List<Todo>>() {

    @Override
    public void onSuccess(List<Todo> todos) {
        // work with the resulting todos
    }

    @Override
    public void onError(Throwable e) {
        // handle the error case
    }
}));

compositeDisposable.add(happiness.subscribeWith(new DisposableSingleObserver<Happiness>() {

    @Override
    public void onSuccess(Happiness happiness) {
        // celebrate the happiness :-D
    }

    @Override
    public void onError(Throwable e) {
        System.err.println("Don't worry, be happy! :-P");
    }
}));

compositeDisposable.dispose();
```
### 6. Lấy ra bộ nhớ đệm của các dữ liệu đã được đài quan sát lấy 
```
Single<List<Todo>> todosSingle = Single.create(emitter -> {
    Thread thread = new Thread(() -> {
        try {
            List<Todo> todosFromWeb = // query a webservice
            emitter.onSuccess(todosFromWeb);
        } catch (Exception e) {
            emitter.onError(e);
        }
    });
    thread.start();
});

Single<List<Todo>> cachedSingle = todosSingle.cache();

cachedSingle.subscribe(... " show cache " ...);

showTodosInATable(cachedSingle);

cachedSingle.subscribe(... "show cache " ...);

anotherMethodThatsSupposedToSubscribeTheSameSingle(cachedSingle);
```
### 7. RxAndroid
-VD:    
```
final Observable<Integer> serverDownloadObservable = Observable.create(emitter -> {
    SystemClock.sleep(1000); // simulate delay
    emitter.onNext(5);
    emitter.onComplete();
});
```
```
serverDownloadObservable.
                    observeOn(AndroidSchedulers.mainThread()).
                    subscribeOn(Schedulers.io()).  
                    subscribe(integer -> {
                        updateTheUserInterface(integer); // this methods updates the ui
                        view.setEnabled(true); // enables it again
                    });
        }
.subscribeOn(Schedulers.io()) // có thể quan sát ngoài luồng chính 
.observeOn(AndroidSchedulers.mainThread());  // đăng kí trên luồng chính
```
 - Hủy đăng kí giảm bộ nhớ
 ```
@Override
protected void onDestroy() {
    super.onDestroy();
    if (bookSubscription != null && !bookSubscription.isDisposed()) {
        bookSubscription.dispose();
    }
}
```