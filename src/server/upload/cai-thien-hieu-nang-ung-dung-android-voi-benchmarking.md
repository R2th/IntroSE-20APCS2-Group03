![](https://images.viblo.asia/358d2e3c-2369-420a-ac75-f564ff66bb46.png)

Hãy bắt đầu chủ đề này với một số câu hỏi. Có bao nhiêu trong số các ứng dụng của bạn được xuất bản trên Play Store? Có bao nhiêu bạn đã xây dựng một số ứng dụng đang được hơn 100 người dùng sử dụng? Bạn đã lấy thông tin phản hồi của người dùng chưa? Có phải tất cả mọi người hài lòng với hiệu suất ứng dụng? Bằng hiệu suất ứng dụng, đó là sự mượt mà của ứng dụng, tức là hoạt động của ứng dụng mà không có bất kỳ độ trễ nào. Ồ, độ trễ của một ứng dụng còn phụ thuộc vào thiết bị mà người dùng đang sử dụng. Có phải vậy không? Đúng là như vậy, nhưng bạn hoàn toàn có thể cải thiện hiệu suất của ứng dụng bằng cách cải thiện mã của bạn (không phân biệt cấu hình thiết bị).

Trong bài viết này, chúng ta sẽ tìm hiểu cách để có thể cải thiện hiệu suất ứng dụng Android với **Benchmarking**. Benchmarking là gì? Chúng ta sẽ tìm hiểu từng bước một. 

1. Code measurement
2. Benchmarking là gì?
3. Jetpack Benchmark library
4. Tích hợp với Android Studio
5. Thiết lập Benchmark
6. Các yếu tố ảnh hưởng lên Benchmark
7. Không nên Benchmark mọi thứ
8. Tổng kết

### 1. Code Measurement
Ngoài phần cứng của thiết bị, hiệu suất của ứng dụng Android cũng phụ thuộc vào thuật toán mà bạn đã sử dụng trong ứng dụng của mình. Chọn đúng thuật toán và cấu trúc dữ liệu phải luôn là ưu tiên của bạn. Vì vậy, để đảm bảo ứng dụng của bạn hoạt động tốt trên nhiều loại thiết bị, vui lòng đảm bảo mã của bạn hoạt động hiệu quả ở mọi trường hợp và điều này sẽ tối ưu hóa hiệu suất của bạn.

Bạn không nên viết mã mà ứng dụng của bạn không cần. Ngoài ra, vui lòng không phân bổ bộ nhớ nếu bạn có thể tránh nó. Một số mẹo để viết mã hiệu quả có thể là:

1. Đối tượng không cần thiết: Tránh tạo các đối tượng không cần thiết vì khi bạn tạo nhiều đối tượng hơn trong ứng dụng của mình thì ứng dụng sẽ chiếm nhiều bộ nhớ hơn.
2. Thích tĩnh hơn ảo: Sử dụng phương thức tĩnh thay vì ảo có thể nhanh hơn từ 15 - 20%. 
3. Sử dụng vòng lặp for-Each: Thay vì sử dụng vòng lặp for thông thường hoặc các vòng lặp khác, hãy ưu tiên sử dụng vòng lặp for được tăng cường, ví dụ vòng lặp for cho Collections được triển khai thông qua Iterable.
4. Tránh sử dụng floating-point: Cố gắng tránh sử dụng floating-point vì chúng chậm hơn 2 lần so với số nguyên trên thiết bị Android.

Đây là một số mẹo có thể được sử dụng để cải thiện hiệu suất mã. Nhưng làm thế nào ta có thể đánh giá sự khác biệt giữa thời gian thực hiện với mã cũ và thời gian thực hiện với mã mới được cải thiện? Liệu có cách nào để đo hiệu suất mã? Có cách nào để đo thời gian cần thiết để chạy một đoạn mã không? Câu trả lời chính là Benchmarking. Nhưng trước khi chuyển sang Benchmarking, chúng ta hãy xem xét một số giải pháp "đơn giản" để tính thời gian thực hiện bởi một đoạn mã.

```java
@Test
fun codeMeasurement() {
    val worker = TestListenableWorkerBuilder<MyWorker>(context).build() //jetpack workmanager library
    val start = java.lang.System.nanoTime() //for starting time of work
    worker.doWork() //do some work i.e. code to be measured
    val elapsed = (java.lang.System.nanoTime() - start) //time taken to complete the work
    Log.d("Code Measurement", "Time taken was $elapsed ns")
}
```

Ở đây, trong ví dụ trên, chúng ta đang tính thời gian thực hiện công việc bằng cách trừ thời gian kết thúc với thời gian bắt đầu. Nhưng vấn đề ở đây là, chúng ta sẽ nhận được các kết quả khác nhau mỗi khi chúng ta chạy cùng một mã với các vấn đề phần cứng và phần mềm khác nhau. Vì vậy, thay vì lấy một giá trị, chúng ta có thể áp dụng một vòng lặp và tìm trung bình của cùng một giá trị để có được thời gian trôi qua.

```java
@Test
fun codeMeasurement() {
    val worker = TestListenableWorkerBuilder<MyWorker>(context).build() //jetpack workmanager library
    val COUNT = 5 //some iteration count
    val start = java.lang.System.nanoTime() //for starting time of work
    for (i in 0..COUNT) {
        worker.doWork() //do some work i.e. code to be measured
    }
    // include outliers
    val elapsed = (java.lang.System.nanoTime() - start) / COUNT //average time taken to complete the work
    Log.d("Code Measurement", "Time taken was $elapsed ns")
}
```

Ở đây, chúng ta có một số số COUNT bằng 5 và ta lấy trung bình 5 giá trị và sau đó tính thời gian thực hiện. Nhưng tại sao chỉ có 5? Tại sao có thể bất kỳ số nào khác? Ngoài ra, có thể có các ngoại lệ hoặc nhiều thứ khác đang chạy trong nền và điều này sẽ ảnh hưởng đến thời gian đo.

Vì vậy, từ hai ví dụ trên, chúng ta có thể kết luận rằng rất khó để đo hiệu suất mã bởi vì để tìm thời gian trung bình chúng ta cần tìm bao nhiêu lần chúng ta nên chạy vòng lặp, nghĩa là giá trị của biến COUNT đó là bao nhiêu? Nó rất là phức tạp. Các bước đo lường mã này được gọi là Benchmarking.

### 2. Benchmarking là gì?

Chúng tôi có thể nói rằng Benchmarking là một quá trình được sử dụng để đo tốc độ điện thoại của bạn có thể chạy một cái gì đó. Ý tưởng là đặt điện thoại của bạn ở một điều kiện đủ lý tưởng để bạn có thể tìm thấy hiệu suất tối đa của ứng dụng trên điện thoại của mình.

Vì vậy, trong phần trước, chúng ta đã thấy cách để có thể tìm hoặc đo thời gian trung bình được thực hiện bởi một đoạn mã để chạy trong thiết bị. Nhưng có một số vấn đề với nó:

1. Nó thường không chính xác bởi vì chúng ta đang đo sai thời điểm.
2. Điều đó rất không ổn định, tức là nếu chúng ta chạy cùng một mã nhiều lần thì có khả năng chúng ta sẽ nhận được các giá trị khác nhau cho mỗi lần chạy.
3. Nếu chúng ta lấy ra trung bình của tất cả các giá trị thì làm thế nào để quyết định số lần mã cụ thể đó sẽ được thực thi trước khi lấy kết quả. Bạn không thể quyết định điều này.

Vì vậy, thật khó để nói chúng ta tiết kiệm được bao nhiêu thời gian ở đây vì Benchmarking rất khó. Có tùy chọn nào để tìm thời gian thực mà một đoạn mã đang thực hiện trong khi thực thi không?

> If there is a Problem then there must be some solution

Và giải pháp cho vấn đề này là ** Jetpack Benchmark Library**.

### 3. The Jetpack Benchmark Library

Tại Google I/O 19, Android đã giới thiệu Jetpack Benchmark Library có thể được sử dụng để loại bỏ tất cả các lỗi hoặc khó khăn mà ta đang gặp phải trong khi thực hiện quy trình Benchmark.

Jetpack Benchmark Library là một công cụ để đo hiệu suất mã và được sử dụng để loại bỏ những lỗi phổ biến mà chúng ta đã làm trước đó trong khi sử dụng Điểm chuẩn. Thư viện này xử lý khởi động, đo hiệu suất mã của bạn và đưa ra kết quả trong bảng điều khiển của Android Studio.

Bây giờ, mã Benchmark mà ta đã đo sau 5 vòng lặp ở trên sẽ được chuyển đổi thành:
```java
@get:Rule
val benchmarkRule = BenchmarkRule()

@Test
fun codeMeasurement() {
    val worker = TestListenableWorkerBuilder<MyWorker>(context).build() //jetpack workmanager library
    benchmarkRule.measureRepeated {
        worker.doWork()
    }
}
```

Tất cả những gì bạn cần làm là áp dụng BenchmarkRule và sau đó, bạn chỉ cần gọi phương thức `measureRepeated()`.

Bây giờ, hãy nhìn vào một số ví dụ khác. Ở đây, chúng ta đang lấy ví dụ về việc Benchmark cơ sở dữ liệu. Vì vậy, trong cơ sở dữ liệu này, trước tiên, ta sẽ khởi tạo cơ sở dữ liệu và sau đó xóa tất cả các bảng và chèn một số dữ liệu thử nghiệm. Sau đó, tạo vòng lặp đo mã để đo hiệu suất mã mà ta quan tâm, tức là một số truy vấn cơ sở dữ liệu.

```java
@get:Rule
val benchmarkRule = BenchmarkRule()

@Test
fun databaseBenchmark() {
    val db = Room.databaseBuilder(...).build()
    db.clearAndInsertTestData()
    benchmarkRule.measureRepeated {
        db.complexQuery()
    }
}
```

Nhưng có một số vấn đề với mã này. Truy vấn của chúng ta có thể được lưu trong bộ đệm nếu ta không thay đổi các giá trị trong cơ sở dữ liệu thì truy vấn có thể được lưu vào bộ đệm và chúng tôi sẽ nhận được kết quả khác với kết quả mong muốn. Vì vậy, chúng ta có thể đặt db.clearAndInsertTestData () bên trong vòng lặp và bằng cách đó trong mỗi vòng lặp, chúng ta sẽ xóa bộ đệm và sau đó đo mã mà chúng ta quan tâm. Nhưng ở đây, chúng ta cũng đang đo nhiều hơn những gì được yêu cầu bởi vì chúng ta có thêm một statement trong vòng lặp. Vì vậy, để loại bỏ điều này, chúng ta có thể áp dụng cách tiếp cận trước đó, tức là đếm hoặc tìm thời gian thực hiện bởi db.clearAndInsertTestData () và sau đó trừ kết quả này với đầu ra cuối cùng.

```java
@get:Rule
val benchmarkRule = BenchmarkRule()

@Test
fun databaseBenchmark() {
    val db = Room.databaseBuilder(...).build()
    val pauseOffset = 0L
    benchmarkRule.measureRepeated {
        val start = java.lang.System.nanoTime()
        db.clearAndInsertTestData()
        pauseOffset += java.lang.System.nanoTime() - start
        db.complexQuery()
    }
    Log.d("Benchmark", "databaseBenchmark_offset: $pauseOffset")
}
```

Nếu bạn không có tâm trạng viết quá nhiều dòng mã, thì có một API có sẵn, đó là runWithTimeDisables, nó có chức năng tương tự nhưng theo một cách chính xác.

```java
@get:Rule
val benchmarkRule = BenchmarkRule()

@Test
fun databaseBenchmark() {
    val db = Room.databaseBuilder(...).build()
    benchmarkRule.measureRepeated {
        runWithTimeDisabled {
            db.clearAndInsertTestData()
        }
        db.complexQuery()
    }
}
```

Nó đơn giản hơn rất nhiều phải không? Chỉ cần sử dụng Jetpack Benchmark Library và bạn đã sẵn sàng với Benchmarking. Nhưng làm thế nào để tích hợp nó vào trong Android Studio. Chúng ta sẽ tiếp tục tìm hiểu trong phần tiếp theo nhé. Cảm ơn các bạn đã dành thời gian để đọc bài viết.