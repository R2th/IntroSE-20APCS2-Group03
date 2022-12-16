# 1. Asynchronous là gì ?

![36rydb9uai_2.png](https://images.viblo.asia/e783bfd0-1eed-4827-960e-4c24d7ade1be.png)

Asynchronous là xử lý bất đồng bộ , nghĩa là chương trình thực hiện các tác vụ không theo một thứ tự . Vì thế có thể xử lí nhiều tác vụ cùng lúc và tiết kiệm thời gian.

Tuy nhiên , nếu chương trình yêu cầu thực hiện lần lượt hay theo thứ tự thì Asynchronous là không phù hợp , khó kiểm soát. Ví dụ như sản xuất dây chuyền trong 1 nhà máy.

# 2. Observer pattern

![image.png](https://images.viblo.asia/2f98ebf7-504c-4bf3-8dd0-400603524f07.png)

Observer pattern là một "mẫu thiết kế phần mềm" giúp bạn đăng kí một cơ chế có thể nhận thông báo từ một hoặc nhiều đối tượng về tất cả các sự kiện xảy ra với đối tượng 
mà chúng đang quan sát (observing).

Giả sử ở đây có 2 thực thể là "Customer" và "Store" . Customer rất muốn biết khi nào cửa hàng có mẫu áo mới hay sự kiện giảm giá , voucher,...  Customer có thể đến cửa hàng
và kiểm tra mỗi ngày và cập nhật thông tin mới nhất, tuy nhiên việc này khá tốn thời gian vì có thể cửa hàng chỉ sale 1 năm 1 lần hay vài năm mới có mẫu áo mới. Thay vào đó Customer sẽ 
đăng kí như 1 subscriber , bất cứ khi nào cửa hàng có thông báo mới qua mail , hay social network , customer đều nhận được thông báo. Họ cũng có thể tùy ý hủy đăng kí khi thấy không
còn nhu cầu nữa.

# 3. RxJava & RxAndroid

* RxJava là một trong những Reactive Extension dành cho ngôn ngữ Java. Được triển khai theo Observer pattern . Bạn có thể tạo ra bất kì luồng dữ liệu không đồng bộ trên bất kỳ thread nào,
 chuyển đổi dữ liệu và dữ liệu này được sử dụng bởi Observer trên bất kỳ thread nào.
 
*  RxAndroid là một Extension của Rxjava sử dụng riêng cho Android platform. Cung cấp thêm AndroidScheduler (Dùng cho xử lý đa luồng trong Android)

# 4. Observable

Observables cung cấp dữ liệu một lần và và các subscribers bắt đầu lắng nghe. Khi muốn dừng lắng nghe , ta sử dụng dispose() để dừng quá trình lại

* Một số phương thức trong Observable:

1. Just() 

Lấy một list các phần tử và chuyển đổi sang các observable items. Không thể pass quá 10 phần tử

```Kotlin
Observable.just(1,2,3,4,5,6,7,8,9,10)
```

```Kotlin
onNext: 1
onNext: 2
...
onNext: 9
onNext: 10
```

2. From()

Khởi tạo một observable từ một danh sách các item sử dụng vòng lặp . Nó trả về từng phần tử một trong 1 lần 

```Kotlin
Integer[] numbers = {1,2,3,4,5,6,7,8,9,10}
Observable.fromArray(numbers)
```

3. Range()

Khởi tạo một observable từ một chuỗi các  generated items. Nó nhận tham số *start number* và *length*

```Kotlin
Observable.range(1,10)
```

4. Repeat() 

```Kotlin
Observable.range(1,4)
                       .repeat(3)
```

```Kotlin
onNext: 1
onNext: 2
onNext: 3
onNext: 4
onNext: 1
onNext: 2
onNext: 3
onNext: 4
onNext: 1
onNext: 2
onNext: 3
onNext: 4
```

5. Buffer()

Nhóm các item vào 1 "batch" và emit từng batch thay vì emit lần lượt từng item

```Kotlin
Observable<Integer> observable = Observable.just(1,2,3,4,5,6,7,8,9)
observable.subscribeOn(Schedulers.io())
                    .observeOn(AndroidScheduler.mainThread())
                    .buffer(3)
```


```Kotlin
onNext:
item: 1
item: 2
item: 3
onNext:
item: 4
item: 5
item: 6
onNext:
item: 7
item: 8
item: 9
```

# 5. Scheduler

Scheduler chịu trách nhiệm phân bổ tác vụ thực hiện trên các thread khác nhau dựa trên các phương thức subscriberOn() và observeOn()

* Một số loại Scheduler:

1. Schedulers.io() 

Đây là loại scheduler phổ biến nhất của rxJava , sử dụng cho network request , được lưu trữ bơi Thread-pool.

```Kotlin
observable.subscribeOn(Schedulers.io())
```

2. Schedulers.computation()

Loại scheduler này gần giống với Schedulers.io() , sử dụng cho bitmap ,... Số lượng thread tạo ra phụ thuộc vào số lõi của thiết bị . Vì thế nên nếu thiết bị có 2 lõi và chúng đều bận , tác vụ sẽ
được chờ tới khi chúng rảnh và được thự thi.

```Kotlin
observable.subscribeOn(Schedulers.computation())
```

3. Schedulers.single()

Scheduler này được back bởi duy nhất 1 thread , không quan trọng có bao nhiêu observable , nó được coi như sự thay thế của main thread

```Kotlin
observable.subscribeOn(Schedulers.single())
```

4. Schedulers.newThread()

Mỗi thread sẽ được tạo ra cho mỗi observable thực thi. Vì thế phải kiểm soát chặt chẽ số observable trong trường hợp có quá nhiều observable thực thi

```Kotlin
observable.subscribeOn(Schedulers.newThrea())
```

# 6. Observer
Tiếp theo về observer , chúng ta cùng điểm qua một vài loại Observer hay sử dụng hiện nay

1. Observer

Được dùng khi muốn emit nhiều hơn 1 giá trị, ví dụ như update tiến trình khi download một file.

```Java
Observer<Integer> observer = new Observer<Integer>() {
            @Override
            public void onSubscribe(Disposable d) {
                System.out.println("onSubscribe");
            }

            @Override
            public void onNext(Integer o) {
                System.out.println("onNext " + o);
            }

            @Override
            public void onError(Throwable e) {

            }

            @Override
            public void onComplete() {
                System.out.println("onComplete");
            }
        };
```

```Java
Output:
onSubscribe
onNext 10
onNext 20
onComplete
```

2. SingleObserver

Sử dụng khi muốn emit duy nhất 1 giá trị , ví dụ như network call trong Android

```Java
singleObservable.subscribe(new SingleObserver<User>() {
                    @Override
                    public void onSubscribe(Disposable d) {

                    }

                    @Override
                    public void onSuccess(User user) {
                        System.out.println(String.format("User with name %s successfully created: ", user.getName()));
                    }

                    @Override
                    public void onError(Throwable e) {

                    }
                });
```

```Java
User with name 'Anitaa' successfully created
```

3. MaybeObserver

Sử dụng trong trường hợp có thể tác vụ không trả về giá trị. Ví dụ method POST api.

```Kotlin
val maybeObservable = Maybe.create<Unit> { emitter -> 
postRequestApi()
emitter.onComplete()
}

maybeObservable.subscribeOn(Schedulers.io())
                                .observeOn(AndroidScheduler.mainThread())
                                .subscribe(maybeObserver)
```

4. CompletableObserver

CompletableObserver chỉ quan tâm tới kết quả trả về ở onComplete() hoặc lỗi ở onError() , không quan trọng data trả về là dạng nào

```Java
observable.subscribe(new CompletableObserver() {
                    @Override
                    public void onSubscribe(Disposable d) {

                    }

                    @Override
                    public void onComplete() {
                        System.out.println("onComplete is called");
                    }

                    @Override
                    public void onError(Throwable e) {
                        System.out.println("onError is called" + e.getMessage());
                    }
                });
```

```Java
onComplete is called
```

# 7. Disposable

Sử dụng disposable để handle observer tránh hiện tượng "Memory leak" , khi subscribers muốn dừng lắng nghe observables.

```Kotlin
var myObserver: Observer<Int> = object: Observer<Int> {
        private var disposable: Disposable? = null

        override fun onSubscribe(disposable: Disposable) {
            this.disposable = disposable
        }
        override fun onNext(value:Int) {
            //Has access to Disposable
        }
        
        override fun onError(e:Throwable) {
            //Has access to Disposable
        }
        
        override fun onComplete() {
            //Has access to Disposable
        }
    }
```

```Kotlin
override fun onStop() {
super.onStop()
disposable?.dispose()
}
```

# 8. Tổng kết

Trong bài viết này , chúng ta đã tìm hiểu khái niệm về Asynchronous , Observer pattern và Rxjava cùng các thành phần của nó

Để có thêm thông tin , hãy đọc thêm về các bài viết tham khảo sau:

https://refactoring.guru/design-patterns/observer

https://www.journaldev.com/22594/rxjava-observables-observers

https://blog.mindorks.com/rxjava-for-android-rxandroid