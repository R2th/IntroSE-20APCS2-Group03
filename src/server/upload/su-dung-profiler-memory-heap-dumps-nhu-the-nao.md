![](https://images.viblo.asia/cc900554-6391-4077-9a9e-fea73be0db89.png)
Bất cứ khi nào chúng ta phát triển một số ứng dụng Android thì điều phổ biến nhất mà tất cả các nhà phát triển lo lắng là việc sử dụng memory của ứng dụng. Điều này là do nếu ứng dụng của bạn đang sử dụng bộ nhớ lớn thì bạn có thể mất người dùng vì phần lớn user sử dụng các thiết bị bộ nhớ thấp. Các nhà phát triển cố gắng tìm ra từng rò rỉ bộ nhớ trong ứng dụng để họ có thể tối ưu hóa ứng dụng của mình trở nên gọn gàng và nhanh hơn. Ngoài ra, nếu bạn biết được các đối tượng đang sử dụng bộ nhớ tại một thời điểm cụ thể thì việc loại bỏ rò rỉ bộ nhớ trong ứng dụng của bạn trở thành một nhiệm vụ dễ dàng hơn.

Trong bài này, chúng ta sẽ học cách sử dụng dữ liệu đống bộ nhớ để xác định rò rỉ bộ nhớ. Vậy hãy bắt đầu.

Nguồn: https://blog.mindorks.com/how-to-use-memory-heap-dumps-data
# Giới thiệu về Profiler
Trong Android Studio, chúng ta có một thứ gọi là Profiler cung cấp thông tin về CPU, bộ nhớ, mạng và sử dụng năng lượng cho ứng dụng của chúng ta. Profiler show một biểu diễn đồ họa về việc sử dụng CPU, bộ nhớ, mạng và năng lượng của ứng dụng của chúng ta. Với sự giúp đỡ của dữ liệu này, chúng ta có thể tối ưu hóa source code của mình. Nhưng trong số bốn, tức là CPU, bộ nhớ, mạng và năng lượng, thứ được sử dụng chủ yếu bởi mọi nhà phát triển là Memory Profiler. Vì vậy, chúng ta hãy xem Memory Profiler là gì và trước đó, chúng ta sẽ tìm hiểu lý do rò rỉ bộ nhớ và sau đó cố gắng xác định điều đó với sự trợ giúp của Memory Profiler.
# Vấn đề
Memory Profiler giúp chúng ta tìm kiếm memory leaks and memory churn.
> A memory leak is an object which becomes inaccessible to the running program but still occupies memory.

Nhưng trong Java hoặc Kotlin, chúng ta có một thứ gọi là Garbage Collection. Khi ứng dụng của bạn không còn sử dụng một số đối tượng, garbage collectorsẽ giải phóng bộ nhớ không sử dụng trở lại heap. Đối với quá trình thu gom rác, trước tiên, JVM sẽ xác định Garbage Collection Root(GC Root) là một đối tượng có thể truy cập từ bên ngoài heap như chạy luồng và biến cục bộ. Sau đó, tất cả các đối tượng có thể truy cập từ Garbage Collection Root được xác định và các đối tượng này được giữ lại. Và cuối cùng, phần còn lại của các đối tượng không thể truy cập được từ Garbage Collection Root được coi là rác và chúng được tái chế.
![](https://images.viblo.asia/252eb241-c2d2-4ceb-8424-705c7f63e8fa.png)
Vậy, khái niệm về Memory Leak đến từ đâu?

>Life was good till we were not introduced with memory leaks.

Memory Leaks phát huy tác dụng khi đối tượng của bạn chưa bị phá hủy nhưng đồng thời, bạn không ở vị trí để sử dụng đối tượng đó. Vì vậy, đối tượng của bạn sẽ giữ bộ nhớ và bạn sẽ không thể sử dụng bộ nhớ đó.

Nói cách khác, chúng ta có thể nói rằng rò rỉ bộ nhớ xuất hiện do các đối tượng bị bỏ rơi không bao giờ có thể được sử dụng trong chương trình nhưng nó có thể truy cập được.

# Giải pháp
Để tìm rò rỉ bộ nhớ trong ứng dụng của chúng ta, chúng ta có thể sử dụng trình memory profiler. Để mở memory profiler trong ứng dụng của chúng ta, hãy làm theo các bước dưới đây:

1. Nhấp vào **View > Tool Window > Profiler**.
2. Chạy ứng dụng của bạn trên thiết bị đích.
3. Bạn sẽ thấy biểu đồ của CPU, bộ nhớ, mạng và sử dụng năng lượng. Nhấp vào bất cứ nơi nào trên dòng thời gian bộ nhớ để mở Memory Profiler. Màn hình sau sẽ được mở:
![](https://images.viblo.asia/6146988f-c7fa-4606-96ad-76df9252012a.jpg)

Từ đây, bạn có thể tránh rò rỉ bộ nhớ cho hai loại đối tượng (chủ yếu), tức là Activity và Fragment. Chúng ta lo ngại về điều này bởi vì chúng thường tiêu thụ rất nhiều bộ nhớ. Điều tốt nhất là bạn không cần phải phát hiện rò rỉ theo cách thủ công, từ Android Studio phiên bản 3.6 trở lên, memory leaks của các Activity và Fragment được phát hiện bởi Memory Profiler. Vì hai lớp này có một hành vi được xác định thực sự. Vì vậy, làm thế nào profiler có thể nói rằng các lớp này có rò rỉ? 

Đối với Activity, nếu nó đã bị hủy nhưng vẫn được tham chiếu thì có một rò rỉ. Đối với Fragment, nếu chúng ta không thấy FragmentManager được liên kết với nó và nó vẫn được tham chiếu, thì đó là trường hợp rò rỉ.

Vì vậy, để xác định rò rỉ, do một số Activity hoặc Fragment, điều đầu tiên chúng ta cần làm là nắm bắt được heap dump. Chúng ta hãy xem làm thế nào.
# Memory Heap Dump
Heap Dump được sử dụng để tìm đối tượng nào trong ứng dụng của chúng ta đang sử dụng bộ nhớ tại thời điểm chụp kết xuất heap. Heap Dump có thể giúp chúng ta xác định rò rỉ bộ nhớ bằng cách hiển thị các đối tượng vẫn còn trong bộ nhớ và điều đó sẽ không được chương trình sử dụng. Bằng cách chụp Heap Dump, bạn có thể nhận được thông tin sau:

1. Bộ nhớ được sử dụng bởi mỗi đối tượng.
2. Tham chiếu của từng đối tượng đang được giữ trong mã.
3. Loại đối tượng được phân bổ bởi ứng dụng của chúng tôi.
4. Ngăn xếp cuộc gọi cho nơi một đối tượng được phân bổ.

Để chụp một heap dump, bạn có một tùy chọn gọi là "Dump Java heap" trong Memory Profiler. Nhấn vào nó.
![](https://images.viblo.asia/98c8c890-e4ba-47b6-a7ea-c47964e61b3b.png)

Màn hình sau đây sẽ được hiển thị cho bạn:
![](https://images.viblo.asia/986395c6-5af6-47a5-aafc-55e2a9380c9b.png)
Chúng ta có rất nhiều dữ liệu. Có bốn lớp được cung cấp cho chúng ta:

1. **Allocations**: Nó cho thấy số lượng phân bổ hoặc trường hợp trong heap.
2. **Native Size**: Đó là tổng dung lượng bộ nhớ riêng (tính bằng byte) được sử dụng bởi loại đối tượng này (chỉ hiển thị cho Android 7.0 trở lên).
3. **Shallow Size**: Đó là bộ nhớ (tính bằng byte) được tiêu thụ bởi chính đối tượng.
4. **Retained Size**: Đó là bộ nhớ (tính bằng byte) được sử dụng do tất cả các phiên bản của lớp này.
![](https://images.viblo.asia/e1f71a3e-c83b-4d64-897f-4894689c7d62.png)

Vì vậy, bằng cách sử dụng dữ liệu này, bạn có thể xác định các lớp đáng chú ý. Nếu bạn bấm vào bất kỳ tên lớp nào, thì Trình cấu hình bộ nhớ sẽ mở Chế độ xem sơ thẩm hiển thị danh sách thể hiện của lớp này.
![](https://images.viblo.asia/9ed0f4e7-4a31-408c-8fae-59fac6225a4c.jpg)

Tại đây, bạn sẽ tìm thấy một dữ liệu mới, tức là độ sâu. Độ sâu là số bước nhảy ngắn nhất từ bất kỳ Root Bộ sưu tập rác nào đến trường hợp được chọn. Đối tượng càng ở gần Bộ sưu tập rác, khả năng có nhiều đường dẫn từ Root gốc đến đối tượng này càng cao và cơ hội được thu gom rác thấp hơn.
![](https://images.viblo.asia/61369a5b-b685-4d60-849b-0f33a16003a4.png)

Trong ví dụ trên, đối với nút đỏ, nếu bất kỳ tham chiếu nào ở bên trái bị hỏng, nút đỏ sẽ không thể truy cập được và nó sẽ được thu gom rác. Nhưng đối với nút màu xanh, nếu bạn muốn thu gom rác, thì bạn phải ngắt đường dẫn từ bên trái cũng như bên phải.
# Ví dụ
Trong khi sử dụng bất kỳ listener nào, chúng ta phải luôn hủy đăng ký listener khi không sử dụng vì nếu chúng ta không làm điều này thì trình nghe sẽ ở đó trong GC Root và nó sẽ không bao giờ được thu gom rác. Vì vậy, luôn cố gắng unregister listener trong phương thức **onPause ()** hoặc **onStop ()** hoặc **onDestroy ()**. Sau đây là một ví dụ về *LocationListener*:
```kotlin
public class LocationListenerActivity extends Activity implements LocationUpdate{

  @Override
  public void onLocationChange(Location location){
    
  }
  
  @Override
  public void onStart(){
   LocationListener.get().register(this);
  }
  
  @Override
  public void onStop(){
   LocationListener.get().unregister(this);
  }

}
```
Nếu bạn không unregister listener thì trong dump java heap, bạn sẽ thấy một trạng thái nói rằng chúng ta đang bị rò rỉ bộ nhớ do LocationListener.

Đó là cách bạn có thể sử dụng dữ liệu từ đống heap của Memory Profiler để tìm rò rỉ, sau đó tối ưu hóa và sửa mã để có kết quả tốt hơn.

Hy vọng bạn đã học được một cái gì đó mới ngày hôm nay.