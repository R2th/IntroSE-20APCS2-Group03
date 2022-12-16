**1. Rx là gì ?**: 

- Rx là một api cho lập trình không đồng bộ với các luồng có thể quan sát được
- Rx là sự kết hợp của những ý tưởng tốt nhất về Observer pattern , Iterator pattern và functional programming
- Rxjava là một thư viện để soạn các chương trình không đồng bộ được phát triển theo Observer Pattern
- Để sử dụng được Rxjava 3 chúng ta thêm vào Gradle :

     dependencies {
          implementation 'io.reactivex.rxjava3:rxjava:3.0.13'
    }

**2. Các thành phần chính của rxjava**

- RxJava gồm hai components chính là Observable và Observer. Thêm vào đó có những thành phần khác như Schedulers, Operators 
    and Subscribe.
- **Observable** : là một luồng dữ liệu (data stream) làm công việc nào đó và phát ra dữ liệu (data)
    Hoạt động của observerable
 ![](https://images.viblo.asia/e31bf959-34db-4aa0-a19a-d2602387b799.png)

- Ví dụ một số cách tạo một Observable :
```
+  private Observable<String> observable = Observable.just("Ha Noi", "Tp Ho Chi Minh");
   +  private Observable<String> observableTime = Observable.create(emitter -> {<br/>
            while (!emitter.isDisposed()) {
                long time = System.currentTimeMillis();
                emitter.onNext("" + time);
            if (time % 2 != 0) {
               emitter.onError(new IllegalStateException("Odd millisecond!"));<br/>
                break;
                         }
               }
            });
```
    
* **Observer** : Lắng nghe dữ liệu được phát ra từ Observable
  + Các phương thức cần quan tâm khi lắng nghe dữ liệu từ Observable
    
     . onNext() : phương thức này được gọi khi một item mới được phát ra bởi Observable.
    
     . onError() : phương pháp này được gọi khi có lỗi xảy ra và việc phát dữ liệu không thành công.
    
     . onComplete() : phương thức này được gọi khi Observable đã hoàn thành việc phát tất cả các mục thành công.
    
     - Ví dụ taọ một Observer
```
private Observer<String> observer = new Observer<String>() {
            @Override
            public void onSubscribe(@NonNull Disposable d) {

            }

            @Override
            public void onNext(@NonNull String s) {

            }

            @Override
            public void onError(@NonNull Throwable e) {

            }

            @Override
            public void onComplete() {

            }
        };
```

* **Schdulers** : Schedulers quyết định thread mà trên đó Observable sẽ phát ra dữ liệu và trên Observer sẽ nhận được dữ liệu
    + Schedulers.computation(): Thường được dùng cho công việc tính toán 
    + Schedulers.io(): Thực hiện cho các công việc liên quan đến network, database
    + Schedulers.single(): Scheduler này sẽ thực hiện tất cả các nhiệm vụ theo thứ tự tuần tự
    + Schedulers.trampoline(): Công việc được thực hiện một cách tuần tự và thường được sử dụng cho mục đích thử nghiệm.

* **Subscribe** : Cầu nối giữa Observable và Observe . Có thể có nhiều Observer đăng ký tới một Observable
    
**3. Một số operator thường dùng**
    
- **FlatMap** : biến đổi danh sách những items từ Observable vào Observables khác. 

```
Ex : Observable.just("Ha Noi").flatMap(str -> {
            return Observable.just(str + "+", str + "++", str + "+++");
           }).subscribe(System.out::println);
  KQ :   Ha Noi+
          Ha Noi++
          Ha Noi+++
```

 - **Map** : Map sẽ chuyển đổi các item được phát ra bởi 1 Observable bằng cách áp dụng mỗi hàm cho mỗi item,
    dễ hiểu hơn thì nó dùng để chuyển đối 1 item thành 1 item khác.

```
Ex :   Observable.just("Ha Noi").map(str -> str + "la thu do cua Viet Nam")
                                  .subscribe(System.out::println);
      KQ : Ha Noi la thu do cua Viet Nam
```

  - **Filter** : Filter trả ra những items thoả mãn với điều kiện kiểm tra.

      Ex : Observable.just("Ha Noi", "Da Nang", "Tp Ho Chi Minh")<br/>
                            .filter(item -> item.toLowerCase().contains("p"))<br>
                             .subscribe(System.out::println);<br/>
    
      KQ : Tp Ho Chi Minh

   - **Merge** :Hàm merge trong RxJava giúp chúng ta thực hiện đồng thời nhiều Observable và trả về riêng lẻ các kết quả của Observable sau khi thực hiện xong Observable đó.
 
     Ex : private Observable<String> observable 
                                    = Observable.just("a", "b", "c", "d", "e", "f");
            private Observable<String> observableNumber 
                                     = Observable.just("3","4","5","6");
         Observable.merge(observable,observableNumber).subscribe(System.out::println);
```
        KQ : 2021-06-04 16:04:35.053 6524-6524/com.example.rx I/System.out: a
             2021-06-04 16:04:35.053 6524-6524/com.example.rx I/System.out: b
             2021-06-04 16:04:35.053 6524-6524/com.example.rx I/System.out: c
             2021-06-04 16:04:35.053 6524-6524/com.example.rx I/System.out: d
             2021-06-04 16:04:35.053 6524-6524/com.example.rx I/System.out: e
             2021-06-04 16:04:35.053 6524-6524/com.example.rx I/System.out: f
             2021-06-04 16:04:35.053 6524-6524/com.example.rx I/System.out: 3
             2021-06-04 16:04:35.053 6524-6524/com.example.rx I/System.out: 4
             2021-06-04 16:04:35.053 6524-6524/com.example.rx I/System.out: 5
             2021-06-04 16:04:35.053 6524-6524/com.example.rx I/System.out: 6
```

- **Zip**: Zip trong RxJava giúp bạn thực hiện đồng thời nhiều Observable và gộp các kết quả của các Observable lại trong một kết quả trả về.
 Ex : private Observable<Integer> observableInter = Observable.just(3, 4, 5, 6);<br/>
            private Observable<String> observable 
                                        = Observable.just("a", "b", "c", "d", "e", "f");

>      Observable.zip(observable, observableInter, (s, integer) -> s +integer).subscribe(System.out::println);

```
KQ :  2021-06-04 16:04:35.054 6524-6524/com.example.rx I/System.out: a3<br/>
       2021-06-04 16:04:35.054 6524-6524/com.example.rx I/System.out: b4<br>
       2021-06-04 16:04:35.054 6524-6524/com.example.rx I/System.out: c5<br>
       2021-06-04 16:04:35.054 6524-6524/com.example.rx I/System.out: d6<br/>
```

4. Reference
    - http://reactivex.io/
    - https://github.com/ReactiveX/RxJava
    - https://medium.com/seesaavntech/rxjava-c%C3%A1c-operator-hay-s%E1%BB%AD-d%E1%BB%A5ng-ad2074a9333f
    
    Vì nội dung tìm hiểu khá nhiều nên mình sẽ chia làm 2 phần. Phần 1 mình xin tạm dừng tại đây. Mong nhận được sự đóng góp từ mọi người!!