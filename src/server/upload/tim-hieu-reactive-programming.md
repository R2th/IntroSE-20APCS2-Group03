## Mở đầu
Chào mọi người, hôm nay tôi sẽ giới thiệu một chủ đề mới, một phương pháp lập trình mới khá phổ biến gần đây mà bản thân tôi trong quá trình làm việc thấy nó cực kỳ hữu ích, hiện đại và clean - Reactive Programing. Trong bài viết này  chúng ta sẽ tìm hiểu các khái niệm cơ bản của **Reactive programming.** 
![](https://images.viblo.asia/2dc4c402-0e52-434e-8697-fe00c231a7f7.gif)
## Reactive programming là gì? Tại sao nên dùng nó?
   **Reactive programming là gì?**
   
Có rất nhiều giải thích định nghĩa rườm rà khó hiểu. [Wikipedia](https://en.wikipedia.org/wiki/Reactive_programming) quá chung và lý thuyết, . [Stackoverflow](https://stackoverflow.com/questions/1028250/what-is-functional-reactive-programming) có câu trả lời rõ ràng nhưng không phù hợp với người mới bắt đầu.v.v.. Vì vậy tôi cắt bớt lại như sau :
 
            Reactive programming is programming with asynchronous data streams
*  Ở khái niệm trên chúng ta cần chú ý đến 2 điểm quan trọng **Stream** & **Ansynchronous** 
    *  **Stream :** Khi thực hiện 1 task bất kỳ thường chúng ta chỉ quan tâm đến 3 yếu tố :
        *   Giá trị trả về từ task đó (Data)
        *   Thông báo lỗi (Erro nếu có)
        *   Thời điểm task finish (Completed)
     
         Khi lập trình đồng bộ (synchronous) việc xác định 3 yếu tố trên không khó khăn, nhưng khi lập trình bất đồng bộ (asynchronous) việc xác định 3 yếu tố này là không hề dễ dàng. Như vậy để giải quyết vấn đề này ta cần có 1 cơ chế giúp xác định được 3 yếu tố trên cả khi lập trình đồng bộ & bất đồng bộ. **Funtion Reactive Programming** giải quyết vấn đề này bằng cách sử dụng **stream** để truyền tải dữ liệu: nó có thể sẽ emit ra 3 thứ : 1 value, 1 error, 1 completed (tín hiệu kết thúc 1 task ) theo 1 trình tự thời gian từ nơi phát ra (Producer) tới nơi lắng nghe (Subscriber).![](https://images.viblo.asia/aae3efe8-9dc1-4ba6-9dda-235f073b369e.png) 
       
 **Tại sao nên dùng nó?**
       
*    Nếu chỉ dừng lại ở đó thì FRP cũng không có gì đặc biệt, điều tạo nên sức mạnh của FRP là việc áp dụng  functional programming cho phép filter (filter, take, scan, …), chuyển đổi từ stream này qua stream khác (map, flatMap, reduce), hoặc merge nhiều stream thành một stream mới (combine, merge, zip, …) khá dễ dàng mà không làm thay đổi trạng thái của stream ban đầu.
*    Việc sử dụng FRP sẽ cải thiện được trải nghiệm người dùng, khi chúng ta muốn ứng dụng phản hồi nhanh hơn.Lợi ích tiếp theo là giúp hạn chế lưu trữ, quản lý các state trung gian.  Trong ví dụ clickStream trên, nếu như sử dụng cách lập trình thông thường, thì phải khai báo rất nhiều biến (state) để lưu trữ các bước trung gian. Ví dụ: timer,  click count collection, … Trong FRP, các bước này là không cần thiết nhờ khả năng chuyển đổi stream (map, flatMap, reduce, ….).
*    Một điểm mạnh khác của RP là giúp cho việc xử lý lỗi trong lập trình bất đồng bộ nhẹ nhàng hơn rất nhiều. Nếu bạn nào từng handle error khi lập trình bất đồng bộ, multiple thread, thì sẽ thấy việc này không hề dễ dàng. RP giúp tách biệt việc xử lý lỗi với logic. Việc này giúp cho code trong sáng hơn rất nhiều.


-----


## Rx được tạo thành từ 3 điểm chính
        **RX = OBSERVABLE + OBSERVER + SCHEDULERS**
* **Observable :** Hiểu đơn giản nó là một nhà cung cấp,là nguồn chứa dữ liệu, thông thường nó sẽ xử lý và bắt đầu cung cấp dữ liệu cho các compent khác lắng nghe nó. Một Observable có thể phát ra bất kỳ số lượng item nào (including zero item), hoặc nó có thể chấm dứt với một message thành công hoặc lỗi.
* **Observers :** Observable là nhà cung cấp thì Observer là nơi tiêu thụ dữ liệu của nhà cung cấp Observable emitted. Việc đầu tiên để nhận được dữ liệu từ Observable nó sẽ đăng ký (subscibe)  bằng cách sử dụng phương thức subscibeOn(), khi đó bất cứ khi nào observable phát ra dữ liệu thì tất cả các Observers đăng kí sẽ nhận được dữ liệu trong onNext() callback, trong hàm này chúng ta có thể thực hiện các thao tác khác nhau ví dụ phân tích cú pháp JSON reponse, hoặc update UI. Nếu có 1 error được ném ra từ Observable thì Observer đăng kí sẽ nhận được lỗi trong onError().
* **Schedulers :**  Như ở trên ta đã biết được khái niệm Rx là lập trình bất đồng bộ (asynchronous) bởi vậy chúng ta cần phải quản lý được thread. Chính vì vậy Rx cung cấp Scheduler là thành phần để cho Observable & Observers biết được nên chạy trên thread nào. Bạn có thể dùng observeOn() để giao tiếp tới observers,ngoài ra có thể sử dụng scheduleOn() để giao tiếp với Observable, điều đó chỉ ra rằng nó sẽ nên chạy trên thread nào. Mặc định thread cung cấp trong RxJava như là Schedulers.newThread() sẽ tạo mới 1 thread chạy dưới dạng background, còn Schedulers.io() sẽ thực thi mã trên IO thread.

## Các bước đơn giản để sử dụng Rx trong ứng dụng:
![](https://images.viblo.asia/156fa226-ba59-4cb0-bc3b-e2d7eeeb3828.png)



* **Bước 1** : Tạo observable emit data
```
Observable<String> database = Observable      //Observable. This will emit the data
                .just(new String[]{"1", "2", "3", "4"});    //Operator
```
Ở đây database là 1 Observable để phát ra dữ liệu. Trong trường hợp này nó phát ra dữ liệu bằng cách sử dụng strings.just() là 1 **operator**

* **Bước 2** : Tạo observers để tiêu thụ dữ liệu
```
Observer<String> observer = new Observer<String>() {
           @Override
            public void onCompleted() {
                //...
            }

            @Override
            public void onError(Throwable e) {
                //...
            }

            @Override
            public void onNext(String s) {
                //...
            }
        };
```
Trong đoạn code trên observer nhận dữ liệu được phát ra bởi Observable trong hàm onNext() và sử dụng nó, nếu có lỗi ở Observable chúng ta có thể bắt được trong onError() của observer.

* **Bước 3** : Manage concurrency
```
database.subscribeOn(Schedulers.newThread())          //Observable runs on new background thread.
        .observeOn(AndroidSchedulers.mainThread())    //Observer will run on main UI thread.
        .subscribe(observer);                         //Subscribe the observer
```
Trong bước cuối cùng này, chúng ta sẽ xác định việc Observable và Observer chạy trên thread nào để quản lý.subscribeOn(Schedulers.newThread()) xác định database observable chạy trên một background thread mới được tự động tạo ra. Còn lại observeOn(AndroidSchedulers.mainThread()) yêu cầu observer chạy trên mainthread. Đây là những gì cơ bản nhât về Reactive programming.

## Kết luận
Qua bài viết này hy vọng tất cả các bạn có cái khái quát cơ bản về Reactive. Để nắm rõ hơn chúng ta cần bắt tay vào thực hành sử dụng nó, sang bài tiếp theo tôi sẽ giới thiệu với các bạn làm thể nào sử dụng RxJava và chi tiết operators thường gặp. Kiến thức có hạn mong  nhận được sự đóng góp của các bạn. 
Cảm ơn mọi người !

Nguồn :
* https://medium.com/exploring-code/what-is-reactive-programming-da37c1611382
* http://www.vogella.com/tutorials/RxJava/article.html
* https://gist.github.com/staltz/868e7e9bc2a7b8c1f754