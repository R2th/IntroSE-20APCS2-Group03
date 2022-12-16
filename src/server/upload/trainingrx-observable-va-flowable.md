Khi nào thì sử dụng Observable, khi nào thì sử dụng Flowable (Rx 2.x.x)?

Đây cũng là một câu hỏi hay và được nhiều bạn quan tâm trên medium cũng như stackoverflow đối với những ai đã và đang dùng Rx (1, 2).
Hôm nay mình cũng xin chia sẻ với các bạn cách dùng 2 thằng này sao cho hợp lý nhé.

Bạn cần cân nhắc luồng xử lý dữ liệu trong hệ thông của mình để lựa chọn version Rx cho hợp lý nhé, điều này sẽ giúp bạn tránh được một số lỗi như MissingBackpressureException hay OutOfMemoryError (OOM) không đáng có.

### 1. Khi nào thì sử dụng Obserable

```
Observable.interval(1, TimeUnit.MILLISECONDS, Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe(new Consumer<Long>() {
                @Override
                public void accept(Long aLong) throws Exception {
                    // do smth
                }
            });
```

Bạn nên sử dụng trong những trường hợp sau:

- Có 1 luồng xử lý không quá 1000 phần tử, ví dụ: bạn có một vài phần tử cần xử thời gian xử lý nhiều hơn mà không gây ra OOM với hệ thống
- Bạn xử lý các event GUI như touch: những sự kiên như này thì hiếm khi gây treo ứng dụng và cũng ko thường xảy ra. Bạn có thể thực hiện 1 công việc với tần xuất 1000 Hz hoặc ít hơn với Observable nhưng cân nhắc chỉ sử dụng làm sample thôi nhé
- Luồng xử lý của bạn cần đồng bộ mà nền tảng ngôn nhữ ko support luồng xử lý Java nếu không bạn sẽ bị mất một số tính năng của nó. Nói chung việc sử dụng Observable thì ít đau đầu hơn Flowable. ( Bạn có thể cân nhắc dùng RxJava để cải thiện cho cho các luồng Iterable trên Java 6+)

### 2. Khi nào thì sử dụng Flowable

```
Flowable.interval(1, TimeUnit.MILLISECONDS, Schedulers.io())
            .observeOn(AndroidSchedulers.mainThread())
            .subscribe(new Consumer<Long>() {
                @Override
                public void accept(Long aLong) throws Exception {
                    // do smth
                }
            });
```

Cũng trong cùng đoạn code ở trên nhưng với Observable thì không vấn đề gì xảy ra nhưng với Flowable thì:

- Crash sau khi trả về 128 giá trị
- Nếu thêm phương thức "onBackpressureDrop" thì có thể tránh lỗi crash nhưng việc xử lý lại diễn ra lâu hơn.

Vậy bạn nên sử dụng Flowable khi:

- Thực thi 10k+ đối tượng khi mà chúng được generate ở nhiều nơi khác nhau mà cần liên kết để giảm số tài nguyên cần cung cấp
- Đọc file mà có dung lượng lớn cần hạn chế số line đọc để tránh việc treo bộ nhớ
- Đọc dữ liệu database thông qua kết nối JDBC, được điều khiển qua việc gọi phương thức ResultSet.next() cho mỗi yêu cầu xử lý
- Truyền tải dữ liệu network IO 
- Sử dụng nhiều khối dữ liệu hoặc dữ liệu kiểu pull-based để lấy các dữ liệu dạng non-block qua các API reactive trong tương lai.

### 3. Performance

Khi sử dụng Observable thì có thể gặp một số lỗi liên quan đến OOM và backpressured

![](https://images.viblo.asia/89af229e-4d21-43d0-b9aa-4999b8c3d72d.png)

còn khi sử dụng với Flowable thì có vẻ an toàn hơn

![](https://images.viblo.asia/acad06cb-5ba5-4f04-bca7-dd50b117927b.png)

### 4. Kết luận

Nhìn chung thì tùy từng bài toán của bạn mà bạn nên sử dụng chúng sao cho flexible nhé.