Threading luôn là một topic khó trong lập trình. Nhưng nó lại rất quan trọng trong Android. Ví dụ như việc chúng ta muốn đặt tất cả các tiến trình chập chạp (vú dụ như lấy dữ liệu network, đọc dữ liệu trên ổ đĩa, ....) trong tiến trình nền (background progress) để tránh làm quá tải trên UI thread.

Thế nên chúng ta không thể tránh khỏi ngoài việc phải học nó. Nhưng hãy lạc quan lên khi RxJava 2 làm cho điều đó trở nên dễ dàng hơn.

### Sơ đồ chuỗi của Rx

Trong [blog trước](https://medium.com/@elye.project/learning-rxjava-in-android-made-simple-in-kotlin-observable-range-filter-ec605bb273a1) Tôi nhắc đến code của RxJava có thể chia nhỏ thành 3 phần như sau: Producer, Operators và Consumer. Có thể `Operators` có rất nhiều như hình mô tả dưới đây:

![Operators](https://cdn-images-1.medium.com/max/1600/1*ystImfQS7wkeWuY3HmFclw.png)

Và sau đó, chúng tôi nghĩ, có một vài các operations là chậm, và muốn nó được chạy trên một vài background thread  như dưới đây... và Consumer hoàn thành luồn trên main UI thread.

![Consumer](https://cdn-images-1.medium.com/max/1600/1*RsRmerTl2mhwm1R8ZQhtnQ.png)

Nếu chúng ta nghĩ đến việc sử dụng threading code theo phong cách cũ thì điều này thực sự phức tạp. Thậm chí có thể đó là một điều điên rồ khi nghĩ đến việc làm cách nào để chúng hoạt động. Nhưng với RxJava 2 thì ....

### Chỉ cần sử dụng observeOn(… thread…)

Chúng ta có thể chỉ đơn giản thêm chuỗi functions `observeOn(...)` giữa các blocks của chuỗi như dưới đây. Và đó là tất cả

![observeOn](https://cdn-images-1.medium.com/max/1600/1*ZlzL7BOXR4hVuMjNsaVE3w.png)

Và code giả mã sẽ trông như dưới đây

```code
producer().observedOn(Schedulers.computational())
          .operation1()
          .operation2()
          .observedOn(Schedulers.io())
          .moreOperations()
          .observedOn(AndroidScheduler.mainThread())
          .subscribe(...) // Consumer
```

Nó thật đơn giản và dễ dàng. Nhưng...

### Bạn sẽ có một câu hỏi...

Cái gì là thành phần Producer?

Nếu các operation thực sự rất chậm (giống như dưới đây), và chúng ta muốn đặt nó trong background. Vậy làm thế nào để chúng ta làm được việc đó

```code
Observable.fromCallable { superSlowProcess() }.subscribe{ ... }
```

### Chỉ cần sử dụng subscribeOn(… thread …)

Tương tự như việc sử dụng `observeOn(...)` thì chúng ta sử dụng `subscribeOn(...)` để thay thế. Khác với việc sử dụng `observeOn`, ở đây bạn có thể sử dụng `subscribeOn` ở bất kỳ đâu trong chuỗi (chỉ cần sau Producer và trước Consumer). Ở bất ký đâu mà bạn đặt nó thì đều không gặp vấn đề gì cả. Miễn là nó được đặt ở đâu đó trong chuỗi. Tnos đủ để làm cho Producer làm việc trên Thread đó.

Sơ đồ dưới đây sẽ chỉ ra tất cả. Chỉ cần đặt chúng (các mũi tên màu đỏ)

> Chú ý: Nếu như bạn đặt nhiều hơn một điểm, thực tế nó sẽ không khác khi so sánh với việc chỉ đặt tại một điểm (với một ngoại lệ nhỏ, bạn có thể không cần phải quan tâm đến điều đó)

![subscribeOn](https://cdn-images-1.medium.com/max/1600/1*bfXuF2uAWdCkbLNkiahAvQ.png)

Code của chúng ta sẽ trông tương tự như dưới đây

```code
Observable.fromCallable { superSlowProcess() }
          .subscribeOn(Schedulers.io())
          .subscribe{ ... }
```

Chỉ cần một lần gọi bạn đã thực hiện được điều đó. Tất cả các luồng xử lý con (các operators) của chuỗi sẽ đều được lắng nghe, cho tới khi nhìn thấy nơi đầu tiên khai báo `observeOn(...)`. Trong một cách diễn đạt khác, nếu như bạn không có `observeOn`, thì các định nghĩa trong chuỗi RxJava sẽ được thự thi trên các thread được định nghĩa bởi `subscribeOn`. 

Tuy nhiên, trong một vào trường hợp, nó có thể giống một vài điều như dưới đây, nơi đặt thành phần cuối cùng consuming của code định nghĩa sẽ trở lại UI main thread.

![uimain](https://cdn-images-1.medium.com/max/1600/1*XovUlf4LeAoIFySbub35lg.png)

Và đoạn code của chúng ta trông sẽ tương tự như dưới đây

```code
Observable.fromCallable { superSlowProcess() }
          .subscribeOn(Schedulers.io())   
          .operators // or operators...
          .observeOn(AndroidScheduler.mainThread())
          .subscribe{ ... }
```

Chúng tương tự như đoạn code dưới đây, trong khi bản chất của chúng là tương tự với code ở trên. Nhưng với mong muốn là chúng dễ nhìn nơi `subscribeOn` và nơi nào đặt `observeOn`

```code
Observable.fromCallable { superSlowProcess() }
          .operators // or operators...
          .subscribeOn(Schedulers.io())          
          .observeOn(AndroidScheduler.mainThread())
          .subscribe{ ... }
```

Đơn giản? Nhưng có một cảnh báo trước về `subscribeOn`j là vị trí của nó được đặt là khongo quan trọng.

### Nó không hoạt động với Hot Observable

Thật không may mắn, subscribeOn chỉ làm việc trên COLD Observable nhưng không làm hoạt động trên HOT. Lý do cho điều này rất đơn giản. RxJava framwork không có sự tương đồng khi điều khiển Hot Observable và COLD Observable.

Dưới đây là topic tổng hợp sự khác nhau của Hot Observable và COLD Observable. 

[RxJava 2 : Understanding Hot vs. Cold with just vs. fromCallable](https://medium.com/@elye.project/rxjava-2-understanding-hot-vs-cold-with-just-vs-fromcallable-3c463f9f68c9)

Hi vọng bài viết này hữu ích đối với bạn.

Nguồn dịch [RxJava 2: Making threading easy in Android (in Kotlin)](https://medium.com/@elye.project/rxjava-2-making-threading-easy-in-android-in-kotlin-603d8342d6c)