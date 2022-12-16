Tiếp nối với bài viết phần trước, bây giờ chúng ta sẽ đi sâu hơn vào thư viện Benchmark và cách sử dụng của nó.

## Tích hợp với Android Studio
Để có thể sử dụng thư viện **Benchmark**, chúng ta cần tải xuống Android Studio phiên bản 3.5 trở lên vì thư viện này đang ở trong giai đoạn alpha. Tiếp theo, bạn cần cấp quyền cho mô-đun benchmark và bật template của Android Studio cho benchmark. Sau đây là các bước để cấp quyền cho mô-đun benchmark trong Android Studio:

1. Tải xuống phiên bản Android Studio 3.5 trở lên.
2. Trong Android Studio, nhấp vào **Help -> Edit Custom Properties**.
3. Thêm dòng code sau: **npw.benchmark.template.module = true**
4. Lưu và đóng tập tin.
5. Khởi động lại Android Studio.

Để tạo mô-đun Benchmark, hãy làm như sau:

1. Nhấp chuột phải vào dự án hoặc mô-đun của bạn và chọn **New -> Module**.
1. Chọn **Benchmark Module** và bấm vào **Next**.
1. Nhập tên và ngôn ngữ mô-đun của bạn (Java / Kotlin) và sau đó nhấp vào **Finish**.

![](https://images.viblo.asia/a9012fe5-ae57-4f7b-98d1-149a26836524.png)

Bằng cách làm theo các bước trên, một mô-đun sẽ được tạo (và được cấu hình sẵn) để đo điểm chuẩn (benchmarking), với một thư mục benchmark được thêm vào và `debuggable` được đặt về `false`. Ở đây, bằng cách `debuggable` là `false`, chúng ta ngăn chặn việc sử dụng trình gỡ lỗi với các bài thử nghiệm của mình.

Để chạy chương trình đo, trong mô-đun, điều hướng đến **benchmark/src/androidTest** và sau đó nhấn **ctrl + shift + F10** (hoặc **cmd + shift + R** trên mac). Đây là kết quả:

![](https://images.viblo.asia/e454b079-6a91-407e-8867-e01490f7f937.png)

## Thiết lập Benchmark

Vì chúng ta đang tạo một mô-đun cho Benchmark và với bất kỳ mô-đun nào, ta sẽ có một tệp build.gradle. Tệp build.gradle của benchmark bao gồm:

1. **Benchmark plugin**: giúp bạn lấy các báo cáo benchmark khi chạy **gradlew**.
2. **Customer runner**: hay **AndroidbenchmarkRunner** sẽ giúp ổn định quá trình benchmark của bạn.
3. **Proguard rules**: tối ưu hóa mã của bạn
4. Thư viện Benchmark.

Mã của tệp build.gradle:

```java
apply plugin: 'com.android.library'
apply plugin: 'androidx.benchmark'

android {
    defaultConfig {
        testInstrumentationRunner "androidx.benchmark.junit4.AndroidBenchmarkRunner"
    }

    buildTypes {
        debug {
            debuggable false
            minifyEnabled true
            proguardFiles getDefaultProguardFile(
                    'proguard-android-optimize.txt'),
                    'benchmark-proguard-rules.pro'
        }
    }
}

dependencies {
    ...
    androidTestImplementation "androidx.benchmark:benchmark-junit4:1.0.0-alpha05"

}
```

Đồng thời, bạn cần phải thiết lập giá trị `debuggable` về `false` ở trong AndroidManifest.xml:

```java
<!-- Important: disable debuggable for accurate performance results -->
<application
    android:debuggable="false"
    tools:replace="android:debuggable"/>
```

Bạn cần làm điều này để có thể ngăn trình gỡ lỗi sử dụng test của mình. Biểu đồ sau thể hiện sự khác biệt khi đặt về `true` và `false`:

![](https://images.viblo.asia/9345f93a-4056-4410-a294-53b178e30855.png)

Ngoài `debuggable`, bạn cũng có thể đặt `codeCoverageEnables` thành `false`.

Chúng ta đã xong với việc thiết lập benchmark trong dự án của mình. Nhưng có một câu hỏi, chúng ta có thể sử dụng thư viện Benchmark trong mọi tình huống và thư viện sẽ tạo ra kết quả giống nhau trong mọi trường hợp không? Câu trả lời là không. Nhưng đừng lo, thư viện sẽ thông báo cho bạn nếu có gì đó ảnh hưởng đến quá trình benchmark.

## Những yếu tố ảnh hưởng tới Benchmarking

Thực hiện task benchmark không hề dễ dàng. Có nhiều yếu tố khác nhau gây ảnh hưởng lên nó và đáng nói nhất đó chính là CPU clock. CPU clock có trách nhiệm cho sự ổn định. Nói chính xác hơn, vấn đề xung nhịp CPU được chia thành hai vấn đề nhỏ hơn, đó là:

1. Ramping
1. Throttling

### Ramping

Chúng ta đều biết rằng khi thiết bị ở trạng thái lý tưởng, tức là không có công việc nào được chỉ định thì đồng hồ sẽ ở mức thấp và khi một số tác vụ được giao cho nó thì nó sẽ bắt đầu chuyển sang chế độ hiệu suất cao.

Vì vậy, nếu chúng ta thực hiện phép đo trong hai tình huống này thì có khả năng chúng ta nhận được đầu ra sai vì những trường hợp này sẽ có CPU clock khác nhau.

Giải pháp cho vấn đề này rất đơn giản và nó có mặt trong định nghĩa về benchmarking. Thư viện Benchmark sẽ chạy một quá trình gọi là `warmup` để ổn định CPU clock, tức là vòng lặp benchmark sẽ chạy tối thiểu trong 250ms và sau đó, phép đo sẽ được thực hiện. Vì vậy, nếu đồng hồ ở trạng thái thấp thì trong 250ms đó, đồng hồ sẽ ở trạng thái ổn định và phép đo sẽ được thực hiện.

### Diving or Throttling

Khi thiết bị của bạn hoạt động quá nhiều thì nó sẽ nóng hơn và đồng hồ cũng sẽ mất ổn định. Nói chung, CPU làm giảm xung nhịp khi thiết bị nóng để tránh làm hỏng chip. Điều này cũng được gọi là tiết lưu nhiệt (thermal throttling). Vì vậy, điều này có thể ảnh hưởng lớn đến hiệu suất benchmark vì trong một trường hợp nhất định, đồng hồ rất cao và ở trường hợp tiếp theo thì đồng hồ rất thấp. Sau đây là một ví dụ về Thermal Throttling (đường màu đỏ):

![](https://images.viblo.asia/68542442-40a1-401d-b6eb-66ba984435ce.png)

Ở đây, trong một thời điểm, chúng ta có rất nhiều việc phải làm và xung nhịp CPU đang rất cao. Nhưng đồng thời khi thiết bị nóng lên, CPU làm giảm xung nhịp và sau một thời gian do công việc đang chờ xử lý, đồng hồ lại lên cao. Vì vậy, chúng ta có thể tin tưởng vào các phép đo được thực hiện giữa các chu kỳ đồng hồ này.

Có nhiều giải pháp cho vấn đề điều chỉnh nhiệt này. Đó là:

1. Clock Locking
2. Sustained Performance
3. Thread.sleep()

Một giải pháp có thể là khóa đồng hồ. Bạn có thể khóa đồng hồ và sau đó đo mã. Nhưng điều này không lý tưởng vì nó yêu cầu thiết bị phải ở dạng root. Ngoài ra, chúng ta có một số plugin gradle để khóa đồng hồ, đó là:

```java
./gradlew lockClocks
```

Nhưng điều này đòi hỏi thiết bị phải được root. Vì vậy, đây không phải là một giải pháp chung.

Một giải pháp khác là ưu tiên duy trì. Có một API có tên **Window.setSustainedPerformanceMode()** thường được tạo cho VR/games và nó có thể được sử dụng trong benchmark vì nó làm giảm các đồng hồ tối đa  giúp ngăn chặn throttling. Nhưng điều này cũng có một số nhược điểm:

1. Nó yêu cầu Activity đang chạy với một số cờ nhất định.
2. Nó có thể hoạt động ở chế độ đơn hoặc đa luồng.
3. Cuối cùng, nó chỉ hỗ trợ một số lượng thiết bị hạn chế.

Vì vậy, hãy tìm giải pháp cho ba vấn đề này.

Đối với phần cờ cho Activity, những gì chúng ta cần làm là inject một Activity bất cứ khi nào chúng ta đang test một cái gì đó và sau đó, chúng ta đặt cờ cho tất cả các Activity mà người dùng đã khởi chạy. Bằng cách làm như vậy, khó khăn thứ nhất sẽ được giải quyết.

Đối với vấn đề về đơn và đa luồng, chúng ta phải buộc thiết bị chạy ở chế độ đa luồng vì bạn có thể sử dụng một lõi ở xung nhịp tối đa hoặc nhiều lõi ở xung nhịp thấp hơn. Nhưng chế độ chuyển đổi có thể dẫn đến sự không nhất quán. Vì vậy, chúng ta nên buộc thiết bị ở chế độ đa luồng. Để làm điều tương tự, trong AndroidBenchmarkRunner của chúng ta, chế độ duy trì hiệu suất được sử. Đây là cách tốt nhất để buộc thiết bị vào chế độ đa luồng.

```java
//AndroidBenchmarkRunner.kt

override fun onCreate(arguments: Bundle) {
    super.onCreate(arguments)

    if(sustainedPerformanceModeInUse) {
        thread(name = "BenchSpinThread") {
            Process.setThreadPriority(Process.THREAD_PRIORITY_LOWEST)
            while(true) {}
        }
    }
}
```

Bây giờ, vấn đề thứ ba và cuối cùng là Window.setSustainedPerformanceMode() chỉ khả dụng cho một số lượng thiết bị giới hạn. Vì vậy, để kiểm tra xem thiết bị của bạn có hỗ trợ nó hay không, bạn có thể làm như vậy bằng cách:

```java
PowerManager.isSustainedPerformanceModeSupported()
```

Vì vậy, cho đến nay chúng ta đã có hai phương pháp là Clock Locking và Sustained Performance, nhưng cả hai phương pháp này đều không thể được sử dụng trong trường hợp thông thường vì không phải tất cả các thiết bị đều được root và tất cả các thiết bị đều hỗ trợ chế độ Sustained Performance. Chúng ta cần một số giải pháp cụ thể và sử dụng được trong mọi tình huống. Vì vậy, đây là giải pháp cuối cùng cho việc throttling và là giải pháp đơn giản nhất.

Trong phương thức Thread.sleep(), người ta phát hiện ra sự chậm lại bằng cách chạy một benchmark cực nhỏ ở giữa mọi benchmark để xem thiết bị có bắt đầu điều chỉnh nhiệt hay không. Nếu có sự điều chỉnh nhiệt thì chúng ta sẽ loại bỏ dữ liệu benchmark hiện tại và chúng ta cho luồng sleep để thiết bị nguội đi.

Dưới đây là so sánh đồng hồ trước và sau khi sử dụng Thread.sleep(). (Dòng màu xanh biểu thị tình huống sau khi sử dụng Thread.sleep())

![](https://images.viblo.asia/df0c1e34-6dfc-4f6a-832e-fc004cbc08aa.png)

Nhưng bởi vì chúng ta cho luồng ngủ bất cứ khi nào có hiện tượng thermal throttling (điều chỉnh nhiệt), thời gian chạy sẽ bị tăng bởi Thread.sleep():

![](https://images.viblo.asia/59f03a6d-bb4a-494e-a20f-7a3e56b89b86.png)

## Kết luận

Chúng ta đã thấy rằng Benchmark là một vấn đề rất phức tạp, rất khó để đo hiệu suất mã thông thường. Nó phụ thuộc vào sự ổn định của đồng hồ. Vì vậy, để giải quyết những vấn đề này, chúng ta có Jetpack Benchmark Library API để có thể đo hiệu suất mã cho bạn. Và hãy nhớ một điều rằng, đừng so sánh các thiết bị với JetPack Benchmark. Ở đây, chúng ta đang so sánh mã được viết cho cùng một thiết bị và cùng một phiên bản hệ điều hành. Cảm ơn các bạn đã đọc bài viết.