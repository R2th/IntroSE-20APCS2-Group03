# Overview
Bài viết này chủ yếu dành cho các lập trình viên mới làm quen với Android, những người chưa thực sự tìm hiểu sâu về LeakCanary. Bản thân mình đã sử dụng nó lần đầu tiên gần đây sau khi nghiên cứu phát triển Android. Và mình rất ngạc nhiên về sức mạnh của công cụ này. Đây chắc chắn là một công cụ không thể bỏ qua trong mọi dự án. Đồng thời, mình rất ngạc nhiên về cách Android duy trì các tài liệu tham khảo cho RecyclerViews. Với kỳ vọng rằng bản thân RecyclerView nên tránh các tham chiếu vòng tròn, bạn có thể dễ dàng rơi vào bẫy rò rỉ bộ nhớ. (Và đó chính xác là lý do mà Square guys triển khai LeakCanary và mọi người nên sử dụng nó)

# How to use LeakCanary
Cách sử dụng LeakCanary khá đơn giản. Như đã hướng dẫn trong phần [README](https://github.com/square/leakcanary#getting-started), bạn chỉ cần **1. describe dependency in gradle** và **2. viết một vài dòng code** trong lớp con (sub class) trong Ứng dụng của bạn. Và sau đó LeakCanary sẽ cảnh báo bạn về sự cố rò rỉ bộ nhớ trong bản build debug của bạn.

Tuy nhiên, có một cạm bẫy mình đã mắc phải. Nếu bạn giống mình và muốn nhấn nút **Debug** thay vì nút **Run** trên Android Studio, thì LeakCanary sẽ không chạy trong khi bạn đang debug. Bạn phải dừng debug và **start the installed debug build from the launcher.** (Chạy chế độ debug)

## A case you can easily produce memory leak
Một trường hợp bạn có thể dễ dàng tạo ra rò rỉ bộ nhớ đó là: 
Hãy xem xét một trường hợp mà mình khá ngạc nhiên khi nó gây rò rỉ bộ nhớ. Cấu trúc cơ bản của code trông như thế này:

![](https://images.viblo.asia/cc824877-ef8d-47a1-9125-149a41d5dd95.png)
*Application Structure*

Fragment hiển thị RecyclerView và adapter của nó cung cấp các custome Viewholder. Một điều khác với cấu trúc đơn giản nhất là Fragment giữ tham chiếu đến adapter. Tham chiếu này có nghĩa là để sử dụng lại adapter sau khi Activity được làm mới do xoay màn hình, v.v. Chúng ta đang hiển thị RecyclerView ở trên cùng của Fragment, vì vậy mình nghĩ rằng đó là một tùy chọn hợp lý để khớp vòng đời của RecyclerView adapter với một trong các Fragment đối lập với Activity.

Ví dụ mã code sẽ như sau:
```java
class MainActivityFragment : Fragment() {
  // Fragment keeps the reference to the RecyclerView adapter
  private lateinit var adapter: MainRecyclerViewAdapter

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)

    adapter = MainRecyclerViewAdapter()
    retainInstance = true
  }

  override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
    return inflater.inflate(R.layout.fragment_activity_main, container, false)
  }

  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)

    recyclerView.layoutManager = LinearLayoutManager(activity!!)
        
    // Always set the cached adapter to the new RecyclerView.
    recyclerView.adapter = adapter
  }
}
```

Đoạn code trên trông có vẻ an toàn vì dường như không có bất kỳ tham chiếu vòng tròn nào. Tuy nhiên, suy đoán của mình là sai.
Object reference path, đường dẫn tham chiếu đối tượng do [LeakCanary](https://github.com/square/leakcanary) cung cấp trông giống như sau:

![](https://images.viblo.asia/eb12240d-412a-44d2-9b60-1fcf160bc6c9.png)

Qua sơ đồ này cho chúng ta biết rằng RecyclerView.mAdapter giữ một tham chiếu gián tiếp đến MainActivity thông qua RecyclerView.mContext. Đây không phải là 1 reference mà chúng ta tự tạo ra. Đây là một tham chiếu "ẩn", nếu chúng ta có thể gọi nó.
Vì vậy, cấu trúc thực tế với tham chiếu "ẩn" này (được biểu thị bằng các đường đứt nét) giống như sơ đồ tiếp theo dưới đây:

![](https://images.viblo.asia/a0754460-8b1d-488b-afc2-378313633b73.png)

Bạn có thể thấy có một tham chiếu vòng tròn đẹp mắt từ MainFragment => MainRecyclerViewAdapter => RecyclerView => MainActivity => MainFragment, v.v. Sự kiện xoay màn hình xảy ra và MainActivity được tạo lại, nhưng vì MainFragment vẫn tồn tại sau khi xoay màn hình và giữ tham chiều gián tiếp đến MainActivity cũ, MainActivity cũ sẽ không bao giờ được GC thu hồi và bị leak memory.

Một lưu ý nhỏ, RecyclerView luôn được tạo lại sau khi xoay và tham chiếu từ MainFragment đến RecyclerView cũ thông qua tiện ích mở rộng Android-Kotlin không bao giờ ở lại sau khi xoay (được biểu thị bằng dấu thập đỏ trong sơ đồ). Đó là cách hoạt động của Android.
## Solution 1
Một giải pháp đơn giản là rút ngắn lifetime của adapter để phù hợp với Activity. VÍ dụ code sẽ thay đổi như sau:

![](https://images.viblo.asia/1f464617-9821-4a63-9121-20803033fdb6.PNG)

Mỗi khi xoay màn hình xảy ra, bạn sẽ loại bỏ adapter cũ giữ một tham chiếu gián tiếp đến Activity cũ.

Nếu chúng ta xem xét cấu trúc, chúng ta không còn tham chiếu vòng tròn nữa vì chúng ta đã xóa liên kết từ Fragment tới adapter.

![](https://images.viblo.asia/5e8143eb-6d5e-4860-9f6e-f5bfed1b2edc.png)

Tuy nhiên, nhược điểm của cách tiếp cận này là bạn không thể lưu trạng thái tạm thời trong adapter, vì adapter được khởi tạo ở mọi lúc mỗi khi xoay màn hình. Chúng ta phải lưu trạng thái tạm thời ở một nơi khác và để adapter tìm nạp trạng thái sau mỗi lần khởi tạo.

## Solution 2
Một giải pháp đơn giản khác là gọi RecyclerView.adapter = null từ onDestroyView.

![](https://images.viblo.asia/9b7c8518-bbd1-4bf4-af5f-8017ab746299.PNG)

Thực sự, mình đã rất ngạc nhiên khi cách làm này hoạt động. Ngay cả khi bạn hủy tham chiếu từ RecyclerView đến adapter, miễn là adapter có tham chiếu đến RecyclerView, bạn vẫn có tham chiếu vòng. Cách duy nhất mà tôi có thể hiểu là Android thực sự vô hiệu hóa tham chiếu từ adapter đến RecyclerView cũng như khi bạn hủy tham chiếu ngược, do đó loại bỏ hoàn toàn tham chiếu vòng.

![](https://images.viblo.asia/ad624f86-dae8-4eaa-ab18-ac9d87c453e4.png)


# Summary
Trong mọi trường hợp, bạn muốn chuẩn bị  mental model của mình bao gồm các tham chiếu “ẩn”, để xử lý linh hoạt tình huống rò rỉ bộ nhớ như vậy. Và LeakCanary thực sự có thể giúp bạn định hình  mental model này. Nếu không, chúng ta không thể biết rằng có các tham chiếu ẩn như vậy xung quanh RecyclerView mà không đọc code.

Một điểm thú vị khác mà mình muốn lưu ý là kiểu rò rỉ bộ nhớ (leak memory) này không xảy ra với ViewPager. Fragment của bạn có thể giữ tham chiếu tới ViewPager.adapter và nó không gây rò rỉ bộ nhớ. Cách ViewPager đặt các tham chiếu "ẩn" sẽ khác một chút so với cách RecyclerView thực hiện.

- Code tham khảo về leak memory [tại đây](https://github.com/yfujiki/RecyclerViewMemoryLeak)
- Tài liệu tham khảo: https://medium.com/@yfujiki/tracing-simple-memory-leak-around-recyclerview-using-leakcanary-927460532d53