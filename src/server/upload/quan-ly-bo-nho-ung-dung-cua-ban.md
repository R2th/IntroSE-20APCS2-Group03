RAM là một tài nguyên quan trọng trong bất kỳ môi trường phát triển phần mềm nào, nó thậm chí còn có giá trị hơn trên hệ điều hành di động, nơi bộ nhớ vật lý thường bị hạn chế. Mặc dù cả Android Runtime (ART) và máy ảo Dalvik đều thực hiện việc thu thập rác định kỳ, nhưng điều này không có nghĩa là bạn không quan tâm tới thời điểm và vị trí ứng dụng của bạn chiếm dụng và giải phóng bộ nhớ. Bạn vẫn cần tránh gây rò rỉ bộ nhớ, thường là do giữ các tham chiếu đối tượng trong các biến static và giải phóng bất kỳ đối tượng tham chiếu nào vào thời điểm thích hợp.

Phần dưới đây giải thích cách bạn có thể chủ động giảm mức sử dụng bộ nhớ trong ứng dụng của mình. Để biết thông tin về cách hệ điều hành Android quản lý bộ nhớ, hãy xem [Tổng quan về quản lý bộ nhớ Android](https://developer.android.com/topic/performance/memory-overview).

### 1. Theo dõi bộ nhớ khả dụng và sử dụng bộ nhớ

Trước khi có thể khắc phục sự cố sử dụng bộ nhớ trong ứng dụng của mình, bạn cần biết khi nào và ở đâu xảy ra lỗi. Tab [Memory profiler](https://developer.android.com/studio/profile/memory-profiler) trong Android Studio giúp bạn tìm và chẩn đoán các vấn đề về bộ nhớ theo những cách sau:

- Xem cách ứng dụng của bạn phân bổ bộ nhớ theo thời gian. Tab **Memory profiler** hiển thị biểu đồ thời gian thực về lượng bộ nhớ mà ứng dụng của bạn đang sử dụng, số lượng đối tượng Java được phân bổ và thời điểm thu gom rác xảy ra.
- Bắt đầu các sự kiện thu gom rác và chụp nhanh bộ nhớ heap trong khi ứng dụng của bạn chạy.
- Ghi lại phân bổ bộ nhớ của ứng dụng của bạn và sau đó kiểm tra tất cả các đối tượng được phân bổ, xem dấu vết ngăn xếp cho từng phân bổ và chuyển đến mã tương ứng trên các class.

#### 1.1 Giải phóng bộ nhớ khi xử lý các sự kiện

Như được mô tả trong [Tổng quan về quản lý bộ nhớ Android](https://developer.android.com/topic/performance/memory-overview), Android có thể lấy lại bộ nhớ từ ứng dụng của bạn theo một số cách hoặc hủy hoàn toàn ứng dụng của bạn nếu cần để giải phóng bộ nhớ cho các tác vụ quan trọng. Để giúp cân bằng bộ nhớ hệ thống hơn nữa và tránh việc hệ thống phải hủy quy trình ứng dụng của bạn, bạn có thể implement  interface **ComponentCallbacks2** trong các **Activity** của mình. Callback **onTrimMemory()** được cung cấp cho phép ứng dụng của bạn lắng nghe các sự kiện liên quan đến bộ nhớ khi ứng dụng của bạn ở forceground hoặc ở cả background sau đó giải phóng các đối tượng theo vòng đời ứng dụng hoặc các sự kiện hệ thống cho biết hệ thống cần khôi phục bộ nhớ.

Ví dụ: bạn có thể triển khai callback **onTrimMemory()** để phản hồi các sự kiện liên quan đến bộ nhớ khác nhau như được hiển thị ở đây:
```
import android.content.ComponentCallbacks2
// Other import statements ...

class MainActivity : AppCompatActivity(), ComponentCallbacks2 {

    // Other activity code ...

    /**
     * Release memory when the UI becomes hidden or when system resources become low.
     * @param level the memory-related event that was raised.
     */
    override fun onTrimMemory(level: Int) {

        // Determine which lifecycle or system event was raised.
        when (level) {

            ComponentCallbacks2.TRIM_MEMORY_UI_HIDDEN -> {
                /*
                   Release any UI objects that currently hold memory.

                   The user interface has moved to the background.
                */
            }

            ComponentCallbacks2.TRIM_MEMORY_RUNNING_MODERATE,
            ComponentCallbacks2.TRIM_MEMORY_RUNNING_LOW,
            ComponentCallbacks2.TRIM_MEMORY_RUNNING_CRITICAL -> {
                /*
                   Release any memory that your app doesn't need to run.

                   The device is running low on memory while the app is running.
                   The event raised indicates the severity of the memory-related event.
                   If the event is TRIM_MEMORY_RUNNING_CRITICAL, then the system will
                   begin killing background processes.
                */
            }

            ComponentCallbacks2.TRIM_MEMORY_BACKGROUND,
            ComponentCallbacks2.TRIM_MEMORY_MODERATE,
            ComponentCallbacks2.TRIM_MEMORY_COMPLETE -> {
                /*
                   Release as much memory as the process can.

                   The app is on the LRU list and the system is running low on memory.
                   The event raised indicates where the app sits within the LRU list.
                   If the event is TRIM_MEMORY_COMPLETE, the process will be one of
                   the first to be terminated.
                */
            }

            else -> {
                /*
                  Release any non-critical data structures.

                  The app received an unrecognized memory level value
                  from the system. Treat this as a generic low-memory message.
                */
            }
        }
    }
}
```

Function **onTrimMemory()** đã được thêm vào Android 4.0 (API cấp 14). Đối với các phiên bản cũ hơn, bạn có thể sử dụng **onLowMemory()**, gần tương đương với sự kiện **TRIM_MEMORY_COMPLETE**.

#### 1.2 Kiểm tra dung lượng bộ nhớ bạn nên sử dụng

Để cho phép nhiều tiến trình đang chạy, Android đặt ra giới hạn cố định về kích thước bộ nhớ heap được phân bổ cho từng ứng dụng. Giới hạn kích thước heap chính xác khác nhau giữa các thiết bị dựa trên tổng thể thiết bị có bao nhiêu RAM. Nếu ứng dụng của bạn đã đạt đến giới hạn dung lượng heap và cố gắng phân bổ thêm bộ nhớ, hệ thống sẽ phát ra lỗi **OutOfMemoryError**.

Để tránh hết bộ nhớ, bạn có thể truy vấn hệ thống để xác định bạn có bao nhiêu dung lượng heap trên thiết bị hiện tại. Bạn có thể truy vấn hệ thống cho hình này bằng cách gọi **getMemoryInfo()**. Thao tác này trả về đối tượng **ActivityManager.MemoryInfo** cung cấp thông tin về trạng thái bộ nhớ hiện tại của thiết bị, bao gồm bộ nhớ khả dụng, tổng bộ nhớ và ngưỡng bộ nhớ — mức bộ nhớ mà tại đó hệ thống bắt đầu hủy các quy trình. Đối tượng **ActivityManager.MemoryInfo** cũng hiển thị biến boolean **lowMemory** cho bạn biết liệu thiết bị có sắp hết bộ nhớ hay không.

Đoạn mã sau đây cho thấy một ví dụ về cách bạn có thể sử dụng phương thức **getMemoryInfo()** trong ứng dụng của mình.
```
fun doSomethingMemoryIntensive() {

    // Before doing something that requires a lot of memory,
    // check to see whether the device is in a low memory state.
    if (!getAvailableMemory().lowMemory) {
        // Do memory intensive work ...
    }
}

// Get a MemoryInfo object for the device's current memory status.
private fun getAvailableMemory(): ActivityManager.MemoryInfo {
    val activityManager = getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
    return ActivityManager.MemoryInfo().also { memoryInfo ->
        activityManager.getMemoryInfo(memoryInfo)
    }
}
```

### 2. Sử dụng các cấu trúc code giúp tiết kiệm bộ nhớ hơn

Một số tính năng Android, class Java và cấu trúc code có xu hướng sử dụng nhiều bộ nhớ hơn những tính năng khác. Bạn có thể giảm thiểu dung lượng bộ nhớ mà ứng dụng sử dụng bằng cách chọn các giải pháp thay thế hiệu quả hơn trong code của bạn.

#### 2.1 Sử dụng service một cách tiết kiệm

Để một service chạy khi không cần thiết là một trong những lỗi quản lý bộ nhớ tồi tệ nhất mà ứng dụng Android có thể mắc phải. Hãy nhớ dừng service của bạn khi nó đã hoàn thành nhiệm vụ. Nếu không, bạn có thể vô tình gây ra rò rỉ bộ nhớ.

Khi bạn bắt đầu một service, hệ thống ưu tiên luôn duy trì quá trình cho service đó hoạt động. Hành vi này làm cho service trở nên rất tốn kém vì RAM được sử dụng cho service sẽ không khả dụng cho các tiến trình khác. Điều này làm giảm số lượng các quy trình được lưu trong bộ nhớ cache mà hệ thống có thể giữ trong bộ nhớ cache LRU, khiến việc chuyển đổi ứng dụng kém hiệu quả hơn. Nó thậm chí có thể dẫn đến sự cố trong hệ thống khi bộ nhớ bị thắt chặt và hệ thống không thể duy trì đủ quy trình để lưu trữ tất cả các service hiện đang chạy.

Nói chung, bạn nên tránh sử dụng các service liên tục vì các yêu cầu liên tục mà chúng đặt ra trên bộ nhớ khả dụng. Thay vào đó, chúng ta có thể sử dụng một loại thay thế, đó là **JobScheduler**. Để biết thêm thông tin về cách sử dụng **JobScheduler** để lập lịch, hãy xem [Background optimization](https://developer.android.com/topic/performance/background-optimization).

Nếu bạn phải sử dụng một service, cách tốt nhất là sử dụng **IntentService**, **IntentService** sẽ tự finish ngay sau khi xử lý xong tác vụ của nó. Để biết thêm thông tin, hãy đọc [Running in a Background Service](https://developer.android.com/guide/components/services).

#### 2.2 Sử dụng các vùng chứa dữ liệu được tối ưu hóa

Một số class được cung cấp bởi ngôn ngữ lập trình không được tối ưu hóa để sử dụng trên thiết bị di động. Ví dụ, việc triển khai **HashMap** chung có thể khá kém hiệu quả về bộ nhớ vì nó cần một đối tượng riêng biệt cho mọi ánh xạ.

Android framework bao gồm một số vùng chứa dữ liệu được tối ưu hóa, bao gồm **SparseArray**, **SparseBooleanArray** và **LongSparseArray**. Nếu cần, bạn luôn có thể chuyển sang mảng thô để có cấu trúc dữ liệu thực sự tinh gọn.

#### 2.3 Hãy cẩn thận với các đoạn mã trừu tượng

Các developer thường sử dụng class abstraction như một phương pháp lập trình tốt, bởi vì trừu tượng có thể cải thiện tính linh hoạt và bảo trì của code. Tuy nhiên, sự trừu tượng đi kèm với một cái giá đáng kể: nói chung chúng yêu cầu một lượng lớn mã cần được thực thi hơn, đòi hỏi nhiều thời gian hơn và nhiều RAM hơn để mã đó được ánh xạ vào bộ nhớ. Vì vậy, nếu các class trừu tượng của bạn không mang lại lợi ích đáng kể, bạn nên tránh chúng.

#### 2.4 Sử dụng protobufs cho serialized data

Bộ đệm giao thức là một cơ chế trung lập về ngôn ngữ, trung lập về nền tảng, có thể mở rộng được Google thiết kế để tuần tự hóa dữ liệu có cấu trúc — tương tự như XML, nhưng nhỏ hơn, nhanh hơn và đơn giản hơn. Nếu bạn quyết định sử dụng **protobufs** cho dữ liệu của mình, bạn nên sử dụng luôn protobufs lite trong code phía client của mình. **Protobufs** thông thường tạo ra mã cực kỳ dài dòng, có thể gây ra nhiều loại vấn đề trong ứng dụng của bạn như tăng mức sử dụng RAM, tăng kích thước APK đáng kể và thực thi chậm hơn.

Để biết thêm thông tin, hãy xem phần "Lite version" trong [protobuf readme](https://android.googlesource.com/platform/external/protobuf/+/master/java/README.md#installation-lite-version-with-maven).

#### 2.5 Tránh xáo trộn bộ nhớ

Như đã đề cập trước đây, các sự kiện thu gom rác không ảnh hưởng đến hiệu suất ứng dụng của bạn. Tuy nhiên, nhiều sự kiện thu gom rác xảy ra trong một khoảng thời gian ngắn có thể nhanh chóng làm tiêu hao pin cũng như tăng nhẹ thời gian thiết lập khung hình do các tương tác cần thiết giữa trình thu gom rác và các thread của ứng dụng. Hệ thống dành càng nhiều thời gian cho việc thu gom rác, pin càng cạn kiệt nhanh hơn.

Thông thường, xáo trộn bộ nhớ có thể khiến một số lượng lớn các sự kiện thu gom rác xảy ra. Trong thực tế, xáo trộn bộ nhớ mô tả số lượng các đối tượng tạm thời được cấp phát xảy ra trong một khoảng thời gian nhất định.

Ví dụ: bạn có thể cấp phát nhiều đối tượng tạm thời trong vòng lặp for. Hoặc bạn có thể tạo các đối tượng Paint hoặc Bitmap mới bên trong hàm onDraw() của một view. Trong cả hai trường hợp, ứng dụng tạo ra nhiều đối tượng một cách nhanh chóng. Những thứ này có thể nhanh chóng tiêu thụ tất cả bộ nhớ có sẵn trong thế hệ, dẫn tới buộc phải xảy ra sự kiện thu gom rác.

Tất nhiên, bạn cần phải tìm những vị trí trong code của mình mà bộ nhớ bị xáo trộn cao trước khi có thể sửa chúng. Đối với điều đó, bạn nên sử dụng [Memory profiler](https://developer.android.com/studio/profile/memory-profiler) trong Android Studio.

Khi bạn xác định các khu vực có vấn đề trong code của mình, hãy cố gắng refactor một cách hợp láy để giảm thiểu số lượng các object được tạo ra trong cùng một thời điêm. Cân nhắc chuyển mọi thứ ra khỏi vòng lặp hoặc có thể chuyển chúng vào trong một cấu trúc [Factory](https://en.wikipedia.org/wiki/Factory_method_pattern).

Một khả năng khác là đánh giá xem các nhóm đối tượng có mang lại lợi ích cho trường hợp sử dụng hay không. Có một cách dễ dàng là tạo ra một function trả về object cần thiết và sử dụng function đó ở thời điểm thích hợp thay vì tạo một instance và cứ giữ nó mãi mà không mấy khi sử dụng. Tuy nhiên việc làm đó sẽ đánh đổi bằng việc tính toán trong mỗi lần gọi. Vì vậy đánh giá hiệu suất kỹ lưỡng trong những trường hợp này là điều rất cần thiết.

### 3. Xóa các tài nguyên và thư viện sử dụng nhiều bộ nhớ

Một số tài nguyên và thư viện trong code của bạn có thể chiếm bộ nhớ mà bạn không biết. Kích thước tổng thể của APK của bạn, bao gồm thư viện của bên thứ ba hoặc tài nguyên được nhúng, có thể ảnh hưởng đến lượng bộ nhớ mà ứng dụng của bạn sử dụng. Bạn có thể cải thiện mức tiêu thụ bộ nhớ của ứng dụng bằng cách xóa mọi thành phần, tài nguyên hoặc thư viện dư thừa, không cần thiết hoặc cồng kềnh khỏi mã của bạn.

#### 3.1 Giảm kích thước APK tổng thể

Bạn có thể giảm đáng kể mức sử dụng bộ nhớ của ứng dụng bằng cách giảm kích thước tổng thể của ứng dụng. Kích thước bitmap, resource, animation và library của bên thứ ba đều có thể góp phần vào kích thước APK của bạn. Android Studio và Android SDK cung cấp nhiều công cụ để giúp bạn giảm size resource và các yếu tố phụ thuộc bên ngoài. Những công cụ này hỗ trợ các phương pháp thu nhỏ code hiện đại, chẳng hạn như biên dịch R8. (Android Studio 3.3 trở xuống sử dụng ProGuard thay vì biên dịch R8.)

Để biết thêm thông tin về cách giảm kích thước APK tổng thể, hãy xem hướng dẫn về [Cách giảm kích thước ứng dụng của bạn](https://developer.android.com/topic/performance/reduce-apk-size).

#### 3.2 Sử dụng Dagger 2 cho injection

Sử dụng Dagger 2 hoặc Koin có thể đơn giản hóa code bạn viết và cung cấp một môi trường thích ứng hữu ích cho việc thử nghiệm và các thay đổi cấu hình khác.

Ở đây chúng tôi khuyên bạn hãy cân nhắc sử dụng Dagger 2. Dagger không sử dụng reflection để quét code ứng dụng của bạn. Do Dagger sinh code trong quá trính compile có nghĩa là nó có thể được sử dụng trong các ứng dụng Android mà không cần tốn thời gian chạy hoặc sử dụng bộ nhớ.

Với Koin, quá trình này có thể yêu cầu nhiều chu kỳ CPU và RAM hơn đáng kể và có thể gây ra độ trễ đáng kể khi ứng dụng khởi chạy.

#### 3.3 Hãy cẩn thận khi sử dụng các thư viện bên ngoài

Code thư viện bên ngoài thường không được viết cho môi trường di động và có thể không hiệu quả khi được sử dụng cho công việc trên di động. Khi bạn quyết định sử dụng thư viện bên ngoài, bạn có thể cần phải tối ưu hóa thư viện đó cho các thiết bị di động. Lập kế hoạch cho công việc đó từ trước và phân tích thư viện về kích thước mã và dung lượng RAM trước khi quyết định sử dụng nó.

Ngay cả một số thư viện được tối ưu hóa cho thiết bị di động cũng có thể gây ra sự cố do cách triển khai khác nhau. Ví dụ: một thư viện có thể sử dụng các protobuf nhẹ trong khi một thư viện khác sử dụng các protobuf vi mô, dẫn đến hai cách triển khai protobuf khác nhau trong ứng dụng của bạn. Điều này có thể xảy ra với các triển khai khác nhau của ghi log, analytics, image loading frameworks, cache và nhiều thứ khác mà bạn không mong đợi.

Mặc dù ProGuard có thể giúp loại bỏ các API và resource không sử dụng, nhưng nó không thể loại bỏ các phần phụ thuộc nội bộ lớn của thư viện. Các tính năng mà bạn muốn trong các thư viện này có thể yêu cầu các phụ thuộc cấp thấp hơn. Điều này trở nên đặc biệt có vấn đề khi bạn sử dụng Activity từ một thư viện (sẽ có xu hướng có nhiều phụ thuộc), khi các thư viện sử dụng reflection (điều này phổ biến và có nghĩa là bạn cần phải dành nhiều thời gian để tinh chỉnh ProGuard theo cách thủ công để làm cho nó làm việc).

Cũng tránh sử dụng thư viện được chia sẻ chỉ cho một hoặc hai tính năng trong số hàng chục tính năng. Bạn không muốn lấy một lượng lớn code và chi phí mà bạn thậm chí không sử dụng. Khi bạn cân nhắc có nên sử dụng thư viện hay không, hãy tìm cách triển khai phù hợp nhất với những gì bạn cần. Nếu không, bạn có thể quyết định tạo các implement của riêng mình.