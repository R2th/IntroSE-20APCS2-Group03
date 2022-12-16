Như chúng ta đã biết thì một `Observable` sẽ phát ra một sự kiện hoặc dữ liệu nào đó, còn một `Observer` sẽ tiếp nhận sự kiện/dữ liệu đó bằng cách đăng ký lắng nghe `Observable`. Trong `RxJava` có rất nhiều loại `Observable` và cũng có nhiều cách để tạo ra một `Observable`. Ở bài viết lần này chúng ta sẽ cùng nhau tìm hiểu về các `Observable` để nắm rõ được cách tạo và cách sử dụng của chúng cho từng trường hợp khác nhau.

Chúng ta sẽ có `5` loại `Observable` sau
* Observable
* Single
* Maybe
* Flowable
* Completable

Tuy nhiên chúng ta chỉ có `4` loại `Observer` mà thôi 
* Observer
* SingleObserver
* MaybeObserver
* CompletableObserver

Bảng dưới đây sẽ mô tả sự tương ứng giữa `Observable` và `Observer` cũng như số `emissions` của từng loại


| Observable | Observer | Nums of emissions |
| -------- | -------- | -------- |
| Observable     | Observer     | Multiple or None     |
| Single     | SingleObserver     | One     |
| Maybe     | MaybeObserver     | One or None     |
| Flowable     | Observer     | Multiple or None     |
| Completable     | CompletableObserver     | None     |

Để đơn giản và dễ hiểu, với mỗi loại `Observable`, mình sẽ làm một ví dụ nho nhỏ :D

### Observable & Observer
Observable là một loại được sử dụng nhiều. Nó có thể phát ra một hoặc nhiều items. Ở ví dụ này, chúng ta sẽ có một danh sách, mội item của danh sách sẽ có kiểu String. Trước hết, chúng ta tạo một danh sách String như sau:
```java
        List<String> list = new ArrayList<>();
        list.add("Ahuhu");
        list.add("Ahihi");
        list.add("Ahoho");
```

Tiếp đến chúng ta sẽ tạo một `Observable` như sau

```java
        Observable<String> observable = Observable.create(emitter -> {
            // emit each item
            for (String s : list) {
                emitter.onNext(s);
            }

            // all items are emitted
            emitter.onComplete();
        });
```

Chúng ta sử dụng hàm `onNext()` để phát ra mỗi item, để biết khi nào hoàn thành quá trình emission, chúng ta sẽ dùng hàm `onComplete()`. Như vậy bước tiếp theo chúng ta định nghĩa `Observer` để handle các item được phát ra.

```java
        Observer<String> observer = new Observer<String>() {
            @Override
            public void onSubscribe(Disposable d) {
                System.out.println("onSubscribe");
            }

            @Override
            public void onNext(String s) {
                System.out.println("onNext: " + s);
            }

            @Override
            public void onError(Throwable e) {
                System.out.println("onError: " + e.getMessage());
            }

            @Override
            public void onComplete() {
                System.out.println("onComplete");
            }
        };
```

Cuối cùng chúng ta cần đăng ký Observer với Observable là xong

```java
observable.subscribe(observer);
```

Chúng ta sẽ thu được kết quả như sau:
```console
onSubscribe
onNext: Ahuhu
onNext: Ahihi
onNext: Ahoho
onComplete
```

### Single & SingleObserver
`Single` luôn luôn emit một item duy nhất hoặc ném ra một ngoại lệ nào đó. Chúng ta sẽ sử dụng dữ liệu ở phần trên để làm ví dụ. Ở đây, `SingleObserver` sẽ không có hàm `onNext()`, mà thay vào đó là hàm `onSuccess()`, đương nhiên khi đã có `onSuccess` và `onError` thì hàm `onComplete()` sẽ được giản lược :D

Khởi tạo `SingleObservable`
```java
        String s = "Hello";
        Single<String> single = Single.create(emitter -> {
            emitter.onSuccess(s);
        });
```

Định nghĩa Observer
```java
        SingleObserver<String> singleObserver = new SingleObserver<String>() {
            @Override
            public void onSubscribe(Disposable d) {
                System.out.println("onSubscribe");
            }

            @Override
            public void onSuccess(String s) {
                System.out.println("onSuccess: " + s);
            }

            @Override
            public void onError(Throwable e) {
                System.out.println("onError: " + e.getMessage());
            }
        };
```

Đăng ký observer với observable

```java
single.subscribe(singleObserver);
```

Kết quả
```java
onSubscribe
onSuccess: Hello
```

### Maybe & MaybeObserver
`Maybe` là loại Observable mà có thể phát 1 item  hoặc ko phát item nào cả (có 1 hoặc ko có gì). Loại này chúng ta sẽ sử dụng cho trường hợp giá trị muốn nhận là tùy biến có thể có hoặc ko. 

Khởi tạo Observable
```java
        Maybe<String> maybe = Maybe.create(emitter -> {
            emitter.onSuccess("Hello");
            // or emitter.onComplete();
        });
```

Nếu muốn phát ra item, chúng ta sẽ sử dụng `onSuccess`, còn nếu ko muốn phát ra item thì chúng ta sẽ sử dụng `onComplete`. Đây chính là điểm khác nhau với `Single` observable.

Định nghĩa Observer

```java
        MaybeObserver<String> maybeObserver = new MaybeObserver<String>() {
            @Override
            public void onSubscribe(Disposable d) {
                System.out.println("onSubscribe");
            }

            @Override
            public void onSuccess(String s) {
                System.out.println("onSuccess: " + s);
            }

            @Override
            public void onError(Throwable e) {
                System.out.println("onError: " + e.getMessage());
            }

            @Override
            public void onComplete() {
                System.out.println("onComplete");
            }
        };
```

Đăng ký observer với observable
```java
maybe.subscribe(maybeObserver);
```

Kết quả
```java
onSubscribe
onSuccess: Hello
```

### Completable & CompletableObserver
Completable là loại Observable sẽ ko phát bất kỳ item nào mà nó chỉ thực thi một nhiệm vụ nào đó và thông báo nhiệm vụ hoàn thành xong chưa mà thôi. 

Khởi tạo Observable

```java
        Completable completable = Completable.create(emitter -> {
            // do something
            emitter.onComplete();
        });
```

Định nghĩa Observer
```java
        CompletableObserver completableObserver = new CompletableObserver() {
            @Override
            public void onSubscribe(Disposable d) {
                System.out.println("onSubscribe");
            }

            @Override
            public void onError(Throwable e) {
                System.out.println("onError: " + e.getMessage());
            }

            @Override
            public void onComplete() {
                System.out.println("onComplete");
            }
        };
```

Đăng ký Observer với Observable
```java
completable.subscribe(completableObserver);
```

### Flowable & Observer
Flowable cũng sử dụng Observer như Observable. Tuy nhiên trên document của RxJava thì Flowable được sử dụng khi số lượng item là 10k+ items mà Observer ko thể handle được hết. Ở ví dụ này, chúng ta sẽ tính tổng từ 1 đến 100, và kết quả sẽ được thông báo cho một SingleObserver.

Khởi tạo Observable
```java
        Flowable<Integer> flowable = Flowable.range(1, 100);
```

Định nghĩa Observer
```java
        SingleObserver<Integer> singleObserver = new SingleObserver<Integer>() {
            @Override
            public void onSubscribe(Disposable d) {
                System.out.println("onSubscribe");
            }

            @Override
            public void onSuccess(Integer integer) {
                System.out.println("onSuccess: " + integer);
            }

            @Override
            public void onError(Throwable e) {
                System.out.println("onError: " + e.getMessage());
            }
        };
```

Đăng ký Observer với Observable

```java
flowable.reduce(0, (sum, item) -> sum += item).subscribe(singleObserver);
```

Kết quả
```java
onSubscribe
onSuccess: 5050
```

* Chú ý: hàm `reduce()` sẽ xử lý từng item mà flowable phát ra và trả về một giá trị là tổng của tất cả items. Nó tương tự khi ta sử dụng vòng lặp để tính tổng vậy :D

### Tổng kết
Như vậy chúng ta đã duyệt qua được hết 5 loại Observable. Mình hy vọng bài viết phần nào giúp mọi người hiểu và nắm được cách sử dụng cơ bản nhất về Observable trogn RxJava. 
* Khởi tạo Observable
* Định nghĩa Observer
* Đăng ký Observer với Observable


#### Cảm ơn các bạn đã đọc bài viết. Happy coding!