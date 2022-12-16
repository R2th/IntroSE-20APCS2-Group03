![](https://images.viblo.asia/5a325988-994f-45c9-aeef-af4b6ce35753.png)


# Sử dụng WorkManager trong xử lý đa tiến trình của ứng dụng
Hiện nay **WorkManager** đã ra đến phiên bản **2.5.0**  sử dụng dễ dàng hơn trong môi trường đa tiến trình và cung cấp một số cải tiến về tốc độ ổn định.

Vì vậy, nếu bạn có một ứng dụng quản lý nhiều quy trình và bạn cần một cách mạnh mẽ để quản lý công việc nền, thì **WorkManager** sẽ là một lựa chọn hoàn hảo cho bạn.

Có một số thay đổi bạn sẽ cần thực hiện với mã của mình nên hãy đọc để tìm hiểu thêm [tại đây](https://developer.android.com/jetpack/androidx/releases/work)


## Giới thiệu về work-multiprocess:

**Work-multiprocess** mới có thể thống nhất lập lịch công việc cho một quy trình duy nhất. Ta hãy import nó vào ứng dụng và triển khai thôi nào

```kotlin
  implementation "androidx.work:work-multiprocess:2.5.0"
```

Bây giờ bạn có thể [chọn quy trình](https://developer.android.com/topic/libraries/architecture/workmanager/advanced/custom-configuration) được chỉ định mà **WorkManager** sử dụng để xếp hàng  **WorkRequests**, và chạy lập lịch theo quy trình của nó.

Ta có thể config khi sử dụng **Configuration.Provider** như sau : 
```kotlin
class MyApplication() : Application(), Configuration.Provider {  
    override fun getWorkManagerConfiguration() =
        Configuration.Builder()
          .setDefaultProcessName("com.example:remote")
          .build()
}
```

Khi sử dụng **work-multiprocess**, bạn cũng muốn sử dụng **RemoteWorkManager** thay vì **WorkManager** để quản lý các yêu cầu công việc của mình. **RemoteWorkManager** sẽ luôn liên hệ với quy trình được chỉ định để sắp xếp công việc cho bạn. Điền này đảm bảo rằng bạn không vô tình khởi tạo mới **WorkManager** trong quá trình hoạt động. Bộ lập lịch trong quá trình cũng chạy trong cùng một quá trình được chỉ định sẵn. 

### Những lợi ích 

Với **WorkManager** được định cấu hình như vậy và sử dụng **RemoteWorkManager** để lên lịch công việc, bạn có thể tận hưởng công việc của mình được quản lý nhanh hơn, tối ưu hóa hơn đặc biệt là đáng tin cậy hơn trọng ứng dụng cần nhiều tiến trình. Điền này là [do sự tranh chấp tài nguyên](https://en.wikipedia.org/wiki/Resource_contention.) từ **SQLite** có thể sẽ được giảm đi đáng kể và việc điều chỉnh công việc giữa các quy trình sẽ không còn cần thiết nữa vì ứng dụng của bạn sẽ chỉ có một phiên bản **WorkManager** duy nhất chạy trong một quy trình mà bạn có thể chỉ định. 

## Thay đổi hành vi 🔀

### Điều chỉnh công việc 

Trước đây, khi **ActivityManager** không thể tạo ra  **JobService** bắt đầu một công việc, công việc đó sẽ âm thầm bị loại bỏ do một lỗi cơ bản trong nền tảng . **WorkManager** hiện tại đảm bảo rằng có một công việc lập lịch hỗ trợ cho mỗi đơn vị **WorkRequest** khi một **Application** được tạo bằng **WorkRequest** với công việc.

### Hạn chế tăng trưởng cơ sở dữ liệu nội bộ 

Ta có thể thấy rằng một trong những nguyên nhân gây ra lỗi ứng dụng là do thiết bị hết bộ nhớ. Điều này chủ yếu xảy ra trên các thiết bị có dung lượng lưu trữ thấp. Tuy nhiên, khi ứng dụng lên lịch nhiều việc, **WorkManager** phải chịu một phần trách nhiệm khiến thiết bị bị chiếm bộ nhớ.

> Các công việc đã hoàn thành và được ghi lại trong cơ sở dữ liệu **WorkManager** trong vòng 7 ngày theo mặc định . Thời gian này đã được giảm xuống 1 ngày , điều này làm giảm đáng kể kích thước cơ sở dữ liệu  .

Mặc dù ta đã rút ngắn thời gian lưu vào bộ nhớ đệm, nhưng có thể tối ưu hơn nữa là kiểm soát thời lượng công việc của mình sẽ được ghi nhớ bằng cách sử dụng **keepResultsForAtLeast()** API.

## New testing API ✨
Nếu bạn đang sử dụng [**ListenableFuture**](https://developer.android.com/topic/libraries/architecture/workmanager/advanced/listenableworker) với **WorkManager**, thì việc kiểm tra trở nên dễ dàng hơn - **TestListenableWorkerBuilder** tiện ích mở rộng **Kotlin** hiện có trong bất kỳ lớp nào mở rộng **ListenableWorker**, cung cấp cho bạn sự linh hoạt hơn trong quá trình kiểm tra.

## Sửa một số lỗi 🐛

Ngoài các tính năng mới, bản phát hành này cũng có một số bản sửa lỗi nhằm cải thiện độ ổn định, độ tin cậy và hiệu suất của **WorkManager**. Bạn có thể đọc tất cả các thay đổi cũng như các lỗi đã sửa [tại đây](https://developer.android.com/jetpack/androidx/releases/work#2.5.0) .

 ### Đóng góp WorkManager thông qua Github
**WorkManager**, cũng như một số thư viện **Jetpack** khác, có thể chấp nhận đóng góp qua GitHub.
Có thể tham khảo thêm[ tại đây ](https://medium.com/androiddevelopers/introducing-jetpack-on-github-c2c9f12e62a9)

<br/>


**Hy vọng bài viết này sẽ có chút ích cho bạn trong việc sử dụng work manager**

Nguồn : https://medium.com/androiddevelopers/workmanager-2-5-0-stable-released-701b668cd064