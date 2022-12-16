Tìm ra các đối tượng tham chiếu ngầm và sự quan trọng của LeakCanary.

# Lời nói đầu

Bài viết này chủ yếu dành cho những người mới làm quen với lập trình Android ở mức trung bình, những người vẫn chưa tìm hiểu sâu về LeakCanary. Bản thân tôi mới sử dụng nó lần đầu gần đây sau khi đã tìm hiểu về lập trình Android được một năm. Và tôi thực sự ngạc nhiên với sức mạnh của công cụ này. Đây chắc chắn là một công cụ phải có trong mọi dự án. Đồng thời, tôi cũng rất ngạc nhiên khi Android lại duy trì các tham chiếu ngầm cho RecyclerView. Với suy nghĩ ngây thơ rằng bản thân RecyclerView vốn đã không chứa các tham chiếu vòng, bạn có thể dễ dàng rơi vào một cái bẫy Memory Leak. (Và đó chính xác là lý do mà Square thực hiện LeakCanary và mọi người đều nên sử dụng nó).

# Sử dụng LeakCanary như thế nào ?

Rất dễ dàng để sử dụng LeakCanary. Như đã đề cập ở trong phần README, bạn chỉ cần 1. diễn tả phụ thuộc trong gradle và 2. viết một vài dòng trong lớp Application của bạn. Và sau đó LeakCanary sẽ báo cho bạn lỗi memory leak trong bản build debug.

Tuy nhiên không đúng như tên gọi, cũng là một nhầm lẫn tôi mắc phải. Nếu bạn cũng giống như tôi, thích nhấn nút Debug thay vì nút Run trong Android Studio, LeakCanary sẽ không chạy trong lúc bạn debug. Bạn phải dừng debug lại và cài đặt bản build trên trình khởi chạy.

## Một trường hợp bạn dễ dàng tạo ra memory leak

Hãy xem một trường hợp nơi tôi khá ngạc nhiên khi bị memory leak. Cấu trúc cơ bản của code trong như thế này:
![Cấu trúc của ứng dụng](https://images.viblo.asia/d73f145a-fcce-4b36-8444-9aaad3435ee5.png)

Fragment hiển thị RecyclerView và adapter của nó cung cấp một ViewHolder tuỳ chỉnh. Quá là đơn giản đúng không. Một thứ bị lệch khỏi cấu trúc đơn giản này là Fragment giữ một tham chiếu đến Adapter. Tham chiếu này nghĩa là sẽ dùng lại adapter ngay cả sau khi Activity đã được refresh lại do việc xoay màn hình. Chúng ta đang hiển thị RecyclerView trên đỉnh của Fragment nên tôi nghĩ đây là một lựa chọn hợp lý để khớp vòng đời adapter của RecyclerView với một trong các Fragment thay vì Activity.

Phần code tương ứng được cho như dưới đây.

```kotlin
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

Cấu trúc này nhìn có vẻ không bị memory leak bởi vì chẳng có bất kỳ tham chiếu vòng nào cả. Tuy nhiên suy nghĩ ngây thơ của tôi là sai.

![Tham chiếu đối tượng bởi LeakCanary](https://images.viblo.asia/e2f2e799-93c8-4d20-b76b-f04ebf0a24e6.png)

Thật ngạc nhiên khi biểu đồ này chỉ ra rằng RecyclerView.mAdapter giữ một tham chiếu gián tiếp với MainActivity thông qua RecyclerView.mContext. Đây không phải là một tham chiếu được chính chúng ta tạo ra. Đó là một tham chiếu ẩn, nếu chúng ta có thể gọi.

Nên kiến trúc thực tế với tham chiếu ẩn này (chỉ ra bằng các đường nét đứt) là thứ gì đó giống như sơ đồ sau:

![Kiến trúc ứng dụng thực tế](https://images.viblo.asia/53bae66e-0cc7-4efa-aeed-cbd041f74486.png)

Bạn có thể thấy có một tham chiếu vòng rất đẹp từ MainFragment => MainRecyclerViewAdapter => RecyclerView => MainActivity => MainFragment và tiếp tục... Nếu việc xoay màn hình xảy ra, MainActivity được tạo lại nhưng vì MainFragment vẫn sống sau khi xoay và giữ tham chiếu đến MainActivity cũ, MainActivity cũ sẽ không bao giờ bị thu hồi bởi trình dọn rác và bị rò rỉ.

Một lưu ý thêm đó là RecyclerView luôn được tạo lại sau khi xoay và tham chiếu từ MainFragment đến RecyclerView cũ thông qua Android-Ktx sẽ không bao giờ tồn tại sau khi xoay (được biểu thị bằng dấu X đỏ trong sơ đồ). Đó là cách Android hoạt động.

## Giải pháp 1

Một giải pháp đơn giản là rút ngắn vòng đời của adapter để khớp với một trong các Activity. Sự khác nhau được chỉ ra trong mã mẫu bên dưới.

```kotlin
class MainActivityFragment : Fragment() {
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    return inflater.inflate(R.layout.fragment_activity_main, container, false)
  }
 
  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState)
    // Recreate adapter instance every time after rotation now
    recyclerView.adapter = MainRecyclerViewAdapter()
    recyclerView.layoutManager = LinearLayoutManager(activity!!)
  }
}
```

Mỗi lần xoay màn hình xảy ra, bạn sẽ vứt bỏ adapter cũ chứa tham chiếu tới Activity cũ.

Nếu chúng ta nhìn vào kiến trúc, chúng ta không còn tham chiếu vòng nào nữa. Bởi vì chúng ta đã loại bỏ liên kết từ Fragment tới Adapter.

![Kiến trúc không còn tham chiếu adapter](https://images.viblo.asia/99aac856-561b-47a6-a5ed-20393ad3623d.png)

Nhược điểm của kiến trúc này đó là bạn không thể lưu được trạng thái tạm thời trong adapter bởi vì adapter được khởi tạo lại mỗi lần xoay. Chúng ta phải lưu trữ trang thại táng thời ở đâu đó và để adapter lấy lại trạng thái sau mỗi lần khởi tạo.

## Giải pháp 2

Một giải pháp đơn giản khác là gọi recyclerView.adapter = null trong onDestroyView.

```kotlin
class MainActivityFragment : Fragment() {
  // Discard permanent reference to the adapter
  val adapter = MainRecyclerViewAdapter()
 
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    return inflater.inflate(R.layout.fragment_activity_main, container, false)
  }
 
  override fun onDestroyView() {
    super.onDestroyView()
    // Note that this recyclerView is an old one
    // and different instance from the one in onViewCreated.
    recyclerView.adapter = null
  }

  override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
    super.onViewCreated(view, savedInstanceState) 
    // Note that this recyclerView is a new one
    // and different instance from the one in onDestroyView.
    recyclerView.adapter = adapter 
  }
}
```

Thực sự tôi rất ngạc nhiên rằng kiến trúc này hoạt động. Ngay cả khi nếu bạn để null tham chiếu từ RecyclerView tới adapter, miễn là adpter có một tham chiếu tới RecyclerView bạn vẫn sẽ có một tham chiếu vòng. Cách duy nhất tôi có thể hình dung là Android thực sự gán null tham chiếu ngược lại, do đó loại bỏ hoàn toàn các tham chiếu vòng.


![Kiến trúc sau khi gán null cho adapter](https://images.viblo.asia/0d192abc-51bc-466e-bafe-f6e001be6111.png)

# Tổng kết

Mặc dù tôi nghĩ giải pháp 1 là cách tiếp cận "sách giáo khoa" nhưng có một thiếu sót là bạn không thể để adapter có thể giữ trạng thái tạm thời. Nếu bạn cần adapter duy trì trạng thái tạm thời, thì tốt hơn là sử dụng giải pháp thứ 2.

Trong bất kỳ trường hợp nào bạn muốn chuẩn biện một mô hình nào bao gồm các tham chiếu ẩn, để xử lý các tình huốn rò rỉ bộ nhớ kiểu như vậy. Thì LeakCanary thực sự có thể giúp bạn định hình mô hình này. Mặc khác, tôi cũng không thể biết rằng có những tham chiếu ẩn như vậy xung quanh RecyclerView mà không đọc các mã nội bộ của Android.

Nếu bạn quan tâm, tôi đã đặt mã mẫu trong Github. Bạn có thể theo dõi các thể git để có được những giải đoạn khác nhau của mã. (adapter-memory-leak tag hiển thị code mà gây ra memory leak, fix-adapter-memory-leak-1 hiển thị giải pháp 1 để chống memory leak, ...)

Một điểm thú vị khác tôi muốn lưu ý là loại rò rỉ  bộ nhớ này không xảy ra với ViewPager. Fragment của bạn có thể giữ tham chiếu đến ViewPager.adapter và nó không gây ra memory leak. Các các tham chiếu ẩn của ViewPager sẽ khác một chút so với cách RecyclerView thực hiện.

Thế là xong. Tạm biệt memory leak. LeakCanary muôn năm !

(Source: https://medium.com/@yfujiki/tracing-simple-memory-leak-around-recyclerview-using-leakcanary-927460532d53)