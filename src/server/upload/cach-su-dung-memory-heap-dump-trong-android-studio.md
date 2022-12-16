![](https://images.viblo.asia/83f7a3df-9596-445f-a92c-78e6352d3ca9.png)

Bất cứ khi nào chúng ta phát triển một số ứng dụng Android thì điều phổ biến nhất mà tất cả các nhà phát triển lo lắng là việc quản lý bộ nhớ của ứng dụng. Bởi vì nếu ứng dụng của bạn đang sử dụng một lượng lớn bộ nhớ thì bạn có thể bỏ sót rất người dùng vì phần lớn trong số họ chỉ sử dụng các thiết bị có bộ nhớ thấp. Chúng ta luôn phải cố gắng tìm ra từng lỗi rò rỉ bộ nhớ (memory leak) trong ứng dụng để tối ưu hóa ứng dụng của mình trở nên gọn gàng và nhanh hơn. Ngoài ra, nếu bạn biết được những đối tượng nào đang sử dụng bộ nhớ tại một thời điểm cụ thể thì việc loại bỏ rò rỉ bộ nhớ trong ứng dụng sẽ trở thành một nhiệm vụ dễ dàng hơn rất nhiều.

Trong bài viết này, chúng ta sẽ học cách sử dụng Memory Heap Dump để xác định rò rỉ bộ nhớ.

### Android Profiler

Trong Android Studio, chúng ta có một thứ gọi là **Profiler** cung cấp thông tin về CPU, bộ nhớ, mạng và sử dụng năng lượng cho ứng dụng của chúng tôi. Điều này cho thấy một biểu diễn đồ họa về việc sử dụng CPU, bộ nhớ, mạng và việc sử dụng năng lượng (pin) của ứng dụng. Với sự giúp đỡ của những dữ liệu này, chúng ta có thể tối ưu hóa code của mình. Nhưng thứ được sử dụng nhiều nhất trong số đó chính là **Memory Profiler**. Vì vậy, hãy cùng xem Memory Profiler là gì và lý do gây nên việc rò rỉ bộ nhớ và cách xác định điều đó với sự trợ giúp của Memory Profiler.

### The Problem

Memory Profiler giúp chúng ta tìm kiếm rò rỉ bộ nhớ, vậy rò rì bộ nhớ là gì?

> Một đối tượng bị rò rỉ bộ nhớ là một đối tượng không thể truy cập được vào bởi chương trình đang chạy nhưng vẫn chiếm bộ nhớ.
> 
<br>
Nhưng trong Java hoặc Kotlin, chúng ta có một thứ gọi là Garbage Collection (trình thu gom rác). Khi ứng dụng của bạn không còn sử dụng một số đối tượng, trình thu gom rác sẽ giải phóng bộ nhớ chưa sử dụng trở lại heap. Đối với quá trình thu gom rác, trước tiên JVM sẽ xác định Garbage Collection Root (GC Root), là một đối tượng có thể truy cập từ bên ngoài heap ví dụ như các thread đang chạy và các biến cục bộ. Sau đó, tất cả các đối tượng có thể truy cập từ Garbage Collection Root được xác định và các đối tượng này được giữ lại. Cuối cùng, phần còn lại của các đối tượng không thể truy cập được từ Garbage Collection Root được coi là rác và chúng được tái chế.

![](https://images.viblo.asia/36a16e38-32aa-482b-ad0e-1dff93ccffcd.png)

Vậy, khái niệm về Memory Leak đến từ đâu?

> Life was good till we were not introduced with memory leaks.
> 
<br>

Rò rỉ bộ nhớ là khi đối tượng của bạn chưa bị hủy nhưng đồng thời, bạn không thể sử dụng đối tượng đó. Vì vậy, đối tượng của bạn vẫn sẽ giữ bộ nhớ và bạn sẽ không thể sử dụng bộ nhớ đó.

Nói cách khác, chúng ta có thể nói rằng rò rỉ bộ nhớ xuất hiện do các đối tượng bị bỏ sót không bao giờ được sử dụng trong chương trình nhưng lại có thể truy cập được.

### The Solution

Để tìm rò rỉ bộ nhớ trong ứng dụng của chúng ta, chúng ta có thể sử dụng Memory Profiler. Để mở Memory Profiler của ứng dụng, hãy làm theo các bước dưới đây:

1. Nhấp vào **View > Tool Window > Profiler**
2. Chạy ứng dụng của bạn trên thiết bị đích.
3. Bạn sẽ thấy biểu đồ của CPU, bộ nhớ, mạng và lượng sử dụng năng lượng. Nhấp vào bất cứ nơi nào trên dòng thời gian bộ nhớ để mở Memory Profiler. Màn hình sau sẽ được mở:

![](https://images.viblo.asia/61cdc80b-7fdf-48e1-ba5e-c3213229bd99.jpg)

Từ đây, bạn có thể tránh rò rỉ bộ nhớ cho hai loại đối tượng (chủ yếu), là Activity và Fragment. Chúng ta thường lo ngại về những đối tượng này bởi vì chúng thường tiêu thụ rất nhiều bộ nhớ. Điều tốt nhất là bạn không cần phải phát hiện rò rỉ theo cách thủ công, từ Android Studio phiên bản 3.6 trở lên, rò rỉ bộ nhớ của các Activity và Fragment có thể được phát hiện bởi Memory Profiler. Nhưng làm thế nào một profiler có thể cho biết rằng các lớp này có một rò rỉ? Đối với trường hợp của Activity, nếu nó đã bị hủy nhưng vẫn được tham chiếu thì như vậy là có một rò rỉ. Đối với Fragment, nếu chúng ta không thấy FragmentManager được liên kết với nó và nó vẫn được tham chiếu, thì đó là trường hợp rò rỉ.

Vì vậy, để xác định rò rỉ do Activity và Fragment, điều đầu tiên chúng ta cần làm là nắm bắt được khái niệm heap dump.

### Memory Heap Dump

Một heap dump được sử dụng để tìm đối tượng nào trong ứng dụng của chúng ta đang sử dụng bộ nhớ tại thời điểm capture heap dump. Một heap dump có thể giúp chúng ta xác định rò rỉ bộ nhớ bằng cách hiển thị các đối tượng vẫn còn trong bộ nhớ và nhưng sẽ không được chương trình sử dụng. Bằng cách capture heap dump, bạn có thể có được các thông tin sau:

1. Bộ nhớ được sử dụng bởi mỗi đối tượng.
2. Tham chiếu của từng đối tượng đang được giữ trong code.
3. Loại đối tượng được phân bổ bởi ứng dụng.
4. Call stack chứa địa chỉ đối tượng được phân bổ.

Để capture một heap dump, bạn có một tùy chọn gọi là "Dump Java heap" trong Memory Profiler:

![](https://images.viblo.asia/3c414da6-5455-4bea-93f7-b7745b16541a.png)

Màn hình sau đây sẽ được hiển thị:

![](https://images.viblo.asia/2cdfa260-ea2c-452c-be43-f9111c9f542d.png)

Sẽ có rất nhiều dữ liệu được hiển thị. Có bốn lớp được cung cấp cho chúng ta, đó là:

1. **Allocations**: Nó cho biết số lượng phân bổ hoặc thể hiện trong heap.
2. **Native Size**: Là tổng dung lượng bộ nhớ riêng (tính bằng byte) được sử dụng bởi loại đối tượng này (chỉ hiển thị cho Android 7.0 trở lên).
3. **Shallow Size**: Là bộ nhớ (tính bằng byte) được tiêu thụ bởi chính đối tượng.
4. **Retained Size**: Là bộ nhớ (tính bằng byte) được sử dụng do tất cả các thể hiện của lớp này.

![](https://images.viblo.asia/1dce209e-1094-43c6-88f0-54411d97c412.png)

Vì vậy, bằng cách sử dụng những dữ liệu này, bạn có thể xác định các lớp đáng chú ý. Nếu bạn bấm vào bất kỳ tên lớp nào, thì Memory Profiler sẽ mở Chế độ Instance View để hiển thị danh sách thể hiện của lớp này.

![](https://images.viblo.asia/08cf791b-b861-465a-87eb-d8a3882d6474.jpg)

Tại đây, bạn sẽ tìm thấy một dữ liệu mới, đó là độ sâu. Độ sâu là số bước nhảy ngắn nhất từ bất kỳ Garbage Collection Root nào đến instance được chọn. Đối tượng càng gần Garbage Collection Root thì khả năng có nhiều đường dẫn từ GC Root đến đối tượng này càng cao và cơ hội được thu gom rác thấp hơn.

![](https://images.viblo.asia/9e872ae4-d86a-45e3-b8eb-9256c2db3077.png)

Trong ví dụ trên, đối với nút màu đỏ, nếu bất kỳ tham chiếu nào ở bên trái bị lỗi, nút đỏ sẽ không thể truy cập được và nó sẽ được thu gom bởi GC. Nhưng đối với nút màu xanh, nếu bạn muốn thu gom rác, thì bạn phải ngắt đường dẫn từ bên trái cũng như bên phải.

### Example

Trong khi sử dụng bất kì listener nào, chúng ta phải luôn hủy đăng ký listener đó đi khi không sử dụng vì nếu chúng ta không làm điều này thì listener sẽ ở đó trong GC Root và nó sẽ không bao giờ được thu gom. Vì vậy, bạn nên luôn luôn hủy đăng ký các listener trong phương thức onPause() hoặc onStop() hoặc onDestroy(). Sau đây là một ví dụ về LocationListener:

```java
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

Nếu bạn không hủy đăng ký trình nghe thì trong dump java heap, bạn sẽ thấy một trạng thái nói rằng chúng ta đang bị rò rỉ bộ nhớ do LocationListener.

Đó là cách bạn có thể sử dụng dữ liệu từ heap dump của Memory Profiler để tìm rò rỉ, sau đó tối ưu hóa và sửa code để có kết quả tốt hơn.