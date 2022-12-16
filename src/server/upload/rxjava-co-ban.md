Đây là bài viết đầu tiên mình chia sẻ với mọi người về những gì mình học được trong cuốn sách Learning RxJava. Trong bài nay mình sẽ trình bày chương 2 của cuốn sách giới thiệu về các thành phần cơ bản của RxJava trong bài sau sẽ tới các Operator. Mong nhận được ý kiến đóng góp nhiệt tình của mn để mình hoàn thiện và bổ sung kiến thức nhanh hơn ;)
##  I. Observable:
Trước tiên chúng ta sẽ cùng định nghĩa Observable là gì! Trong cuốn sách có ghi: "Observable push-based, composable iterator"  theo mình dịch thì Observable là nơi phát ra các phần tử 1 cách tuần tự. Ví dụ với 1 Observable<T> nó sẽ phát ra các phần tử loại T qua chuối các phương thức cho đến khi các phần tử được chuyển tới Observer, nới sẽ sử dụng các phần tử. <br>
 Chũng ta có 3 phương thức cần quan tâm khi làm việc với Observable:<br>
*   onNext(): chuyển từng item xuống Observer
*   onComplete(): được goijkhi đã không còn item nào được phát ra nữa, tức là onNext() sẽ không được gọi.
*   onError(): được gọi khi có lỗi xảy ra khi các phần tử đang được chuyển tới Observer. Nếu không sử dụng hàm retry() thì chuỗi các phần tử được phát ra sẽ dừng lại. <br>
    Cả 3 phương thức trên đều là abstract method trong Observer.
## II.  Các Operator để tạo Observable:
### 1. Observable.create()
 Phương thức này cho phép chúng ta tạo ra Observable bằng cách cung cấp lambda nhận các phần tử được phát ra. Chúng ta có thể gọi onNext() để nhận từng item, onComplete() để báo hiệu không còn item nào sẽ được phát ra.
    ![](https://images.viblo.asia/3671afa4-2369-4c38-8bab-2476e58d668a.png)
    
   Kết quả: 
    ![](https://images.viblo.asia/65e883ca-d540-4850-8c0e-4f8e79c11a74.png)
    Ở đây chúng ta cần chú ý các phần tử được phát ra tuần tử theo thời gian. Nó không thể được phát ra cùng nhau song song trong cùng 1 thời gian. Điều đó sẽ làm cho quá trính lập trình sẽ đơn giản hơn. Tuy nhiên khi cần chúng ta vẫn có thể làm được điều đó, phần này chúng ta sẽ cùng tìm hiểu trong các phần sau.<br>
  Trong ví dụ trên chúng ta chưa sử dụng onComplete() và onError() giờ bạn có thể xem cách sử dụng hai hàm này trong đoạn code bên dưới để hiều hơn:![](https://images.viblo.asia/83721dc9-6726-46ea-bee3-18dc63e6c97a.png)
    Trong RxJava 2.0, Observable không còn hỗ trợ phát ra phần tử null. Trong trường hợp này bạn sẽ nhận được Exception 
###     2. Observable.just():
   Trong ví dụ trên chúng ta cũng có thể sử dụng just() với chức năng tương tự: 
    ![](https://images.viblo.asia/d53f2850-1618-4c7e-b63d-c2913155d9a3.png)
Kết quả:
    ![](https://images.viblo.asia/a12070ff-76a0-4b5f-8b97-6f5dc469424d.png)
    <br>Với just() chúng ta có thể pass 10 tham số đầu vào và nó hoạt động như create(). Với tường item hàm onNext() sẽ được gọi và sau khi done hàm onComplete() sẽ được gọi.<br>
    Đối với các phần tử là mảng các chúng ta có thể sử dụng hàm fromIterable(), cách nó hoạt động tương tự như just() nhưng với tham số là 1 mảng thay vì bị giới hạn với 10 phần tử.
###     3. Observable.interval()
Observable. interval sẽ phát ra các phần tử theo 1 theo 1 khoảng thời gian nào đó(bắt đầu từ 0). Trog ví dụ dưới đâu mình sẽ sử dụng Observable.interval để phát ra các phần tử từ 0 cách nhau trong vòng 1s:
   ```
 Observable.interval(1, TimeUnit.SECONDS)
                .subscribe(s->System.out.println(s));
        try {
            Thread.sleep(5000);
        }catch (InterruptedException e){
            e.printStackTrace();
        }
```
Observerble.interval sẽ phát ra các phần tử mãi mãi, tuy nhiên do nó vẫn hành theo 1 timer nên nó được tách ra 1 thread riêng gọi là computation Scheduler(Phần này mình sẽ tìm hiểu cụ thể và trình bày trong bài viết sau) . Bạn có thể thấy mình dùng Thread,sleep(5000) hàm này giúp chúng ta gữi cho hàm main dùng trong 5s trc khi nó dừng tạo cơ hội cho Observable.interval của chúng ta kịp phát ra 5 phần tử trước khi dừng. Các bạn có thể chạy và thấy đưuọc kết quả!
    
###  4. Observable.fromCallable()
Nếu bạn muốn thực hiện 1 phép tinhsh toán hoặc 1 hành động sau đó phát ra bạn đơn giản chỉ cần dùng Observable.just(). Nhưng trong trường hợp phép tính toán của bạn có thể gây ra Exception làm cho lỗi bị bắn ra làm chương trình dừng ngay lập tức và bạn muốn ngăn chặn điều đó bằng cách nhận lỗi được phát sinh tại hàm onError của Observer. Lúc này bạn có thể cân nhắc sử dụng Observable.fromCallable():<br>
    Ví dụ khi bạn sử dụng just() :
 ```
Observable.just(1/0)
            .subscribe(i->System.out.println("Nhan: " + i),
                        Throwable::printStackTrace);
```
   Kết quả bạn sẽ nhận được đoạn báo lỗi quen thuộc:
```
Exception in thread "main" java.lang.ArithmeticException: / by zero
	at com.example.admin.demorxjava.Sample.main(Sample.java:12)
    ...
```
 Khi bạn sử dụng feomCallable:
```
 Observable.fromCallable(() -> 1/0)
                .subscribe(i -> System.out.println("Nhan" + i),
                        e -> System.out.println("Loi: "+e));
```
   Kết quả:
   `Loi: java.lang.ArithmeticException: / by zero`
 Chúng ta có 5 loại Observable khác nhau: Completable, Maybe, Single, Flowable và Observable. Các bạn có thể tìm hiểu 5 loại này để lữa chọn sao cho phù hợp với mục đích sử dụng qua bài viết trước của mình:  https://viblo.asia/p/rxjava-rxandroid-co-ban-E375z0rjZGW
##  III. Interface Observer
   Các phương thức onNext(), onComplete(), onError() được định nghĩa trong Observer interface:<br>
 ```
  package io.reactivex;
    import io.reactivex.disposables.Disposable;
    public interface Observer<T> {
        void onSubcribe(Disposable d);
        void onNext(T value);
        void onError(Throwable e);
        void onComplete();
    }
```
Sau đây chúng ta sẽ cùng tìm hiểu cách implement and subcribe 1 Observer.<br>
    Khi chúng ta gọi subcribe() trên 1 Observerble thì sẽ có 1 đối tượng Observer được sử dụng để dùng các phần tử được phát ra thông qua 3 phương thức trên. Để làm được điều đó chúng ta sẽ tạo ra 1 đối tượng Observer và truyền vào hàm onSubcribe():
    ![](https://images.viblo.asia/b933a385-6e64-4b10-8f64-fd537e2cf21e.png)
 Chúng ta sẽ cùng tìm hiều đoạn code trên: <br>
    Đối tượng Observer mà chúng ta tạo ra sẽ nhận các phần tử được Observable chuyển đến cụ thể ở đây là các phần tử dạng Integer qua hàm onNext(). Nó đóng vai trò như điểm cuối của chuỗi thao tác và là nơi sử dụng dữ liệu. Tại đây bạn có thể hiển thị sữ liệu, thêm vào database ... trong ví dụ của chúng ta Observerble sẽ phát ra các item dạng String sau đó qua hàm map(String:length) các phần tử String sẽ được biến đổi sang kiểu int với kết quả của mỗi phần tử là kết quả của hàm length() trong class String. Kết quả này được chuyển xuống hàm filter() lọc theo điều kiện với các phần tử thỏa mãn >= 5. Các phần tử đi qua hai hàm sẽ lần lượt đi xuống hàm onNext()  của Observer. Khi có lỗi xảy ra hàm onError() sẽ được gọi và dừng việc phát ra phần tử. Nếu ko hàm onComplete() sẽ được gọi.<br>
    Hàm observer() chúng ta có thể sử dụng lambda để code ngắn ngọn và dễ hiều hơn. Trong observer có nhiều dạng overload khác nhau chấp nhận 3 event onNext(), onComplete() và onError() để tiện cho như cầu sử dụng![](https://images.viblo.asia/d83ebdf5-046a-4528-854c-c3b358e9e90f.PNG)
    Trong ví dụ dưới đây mình sẽ sử dụng đầy đủ cả 3 event và sử dụng lambda:
    ![](https://images.viblo.asia/6bc9a0f7-ed17-4d81-9983-b989be601ae5.PNG)
    Kết quả:

```
Nhan: 5
Nhan: 5
Nhan: 5
Nhan: 7
Done!
```
 Nếu bạn chưa quen thuộc với lambda hãy tìm hiểu thêm vì nó khá quan trong và được sử dụng nhiều trong lập trình hiện nay.<br>
## IV. Disposable
 Khi bạn subcribe() 1 Observable để nhận các phần tử được phát ra, 1 stream được tạo ra để dẫn các phần tử từ Observable tới Observer và chắc chắn luồng này sẽ tiêu thụ resource. Khi chúng ta đã không còn cần nhận phần tử nữa chúng ta cần hủy luồng này đi để tiết kiện tài nguyên. Trong hàm onComplete() luồng này đã được hủy mà chúng ta không cần phải làm gì nhug đó là với các Observable chạy trong 1 khoảng thời gian giới hạn còn với các Observable chạy vô hạn hay chạy trong 1 khoảng thời gian dài chúng ta vẫn phải tự hủy luồng liên kết giữa Observable với Observer. <br>
    Disposable là sự liên kết giữa Observable và Observer, bạn có thể gọi hàm dispose() để dừng phát ra phần tử từ các Observable cho Observer đó. Disposable là 1 interface gồm 2 hàm:
```
package io.reactivex.disposables;
    
    public interface Disposable {
            void dispose();
             boolean isDisposed();
    }
```
   Hàm isDisposed() để chỉ cho chúng ta liệu liên kết đã được cắt hay chưa. Sau đây là ví dụ chúng ta ngừng nhận các phần tử được phát ra trong Observable.interval():
```
public static void main(String[] args) {
        Observable source = Observable.interval(1, TimeUnit.SECONDS);
        Disposable disposable = source.subscribe(System.out::println);
        sleep(5000);
        disposable.dispose();
        sleep(5000);
    }

    public static void sleep(long time){
        try{
            Thread.sleep(time);
        }catch (InterruptedException e){
            e.printStackTrace();
        }
    }    
```
 Chúng ta chạy chương trình và thấy 0 -> 4 được in ra liên tiếp nhưng sau 5s sau chương trình không in ra gì cả và dừng lại. Điều này do chúng ta đã ngừng việc đăng ký nhận phần từ từ Observerble qua hàm dispose().
Kết quả:
```
0
1
2
3
4

Process finished with exit code 0
```
##     V. CompositeDisposable
Nếu bạn có vài sự đăng ký nhận các phần tử từ các Observerable và cần quản lý bạn có thể sử dụng CompositeDisposable. Đây là 1 class inplement từ Disposable nhưng bản chất bên trong nó chứa 1 tập hợp các disposable và bạn chỉ cần thêm vào hoặc hủy bỏ các disposable khi không cần thiết.
  ```
        CompositeDisposable compositeDisposable = new CompositeDisposable();
        Observable source = Observable.interval(1, TimeUnit.SECONDS);
        Disposable disposable1 = source.subscribe(i -> System.out.println("disposable1: " + i));
        Disposable disposable2 = source.subscribe(i -> System.out.println("disposable2: " + i));
        Disposable disposable3 = source.subscribe(i -> System.out.println("disposable3: " + i));
        compositeDisposable.addAll(disposable1, disposable2, disposable3);
        sleep(5000);
        compositeDisposable.dispose();
        //compositeDisposable.remove(disposable1);
        sleep(5000);
```
 Đó là toàn bộ những gì mình trình bày trong bài viết này :) Mọi ý kiến xin hãy comment bên dưới, cảm ơn mọi người đã đón đọc!