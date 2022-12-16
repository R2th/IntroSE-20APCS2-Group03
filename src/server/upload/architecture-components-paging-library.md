Paging Library giúp ứng dụng của bạn dễ dàng tải dần thông tin khi cần từ nguồn dữ liệu, mà không làm quá tải thiết bị hoặc chờ quá lâu cho truy vấn cơ sở dữ liệu lớn.

## Tổng quan

Nhiều ứng dụng hoạt động với bộ dữ liệu lớn nhưng chỉ cần tải và hiển thị một phần nhỏ dữ liệu đó bất kỳ lúc nào. Một ứng dụng có thể có hàng nghìn mục mà nó có khả năng hiển thị, nhưng nó chỉ có thể cần truy cập vào vài chục trong số chúng cùng một lúc. Nếu ứng dụng không cẩn thận, nó có thể yêu cầu dữ liệu mà nó không thực sự cần, đặt gánh nặng hiệu suất trên thiết bị và mạng. Nếu dữ liệu được lưu trữ hoặc đồng bộ hóa với cơ sở dữ liệu từ xa, điều này cũng có thể làm chậm ứng dụng và lãng phí gói dữ liệu của người dùng.

Mặc dù các API Android hiện có được cho phép phân trang nội dung nhưng chúng có những hạn chế đáng kể:

* CursorAdapter giúp dễ dàng hơn trong việc ánh xạ các kết quả truy vấn cơ sở dữ liệu tới ListView , nhưng nó chạy các truy vấn cơ sở dữ liệu trên UI thread và nội dung trang không hiệu quả với một Cursor . Để biết thêm chi tiết về những hạn chế khi sử dụng CursorAdapter , hãy xem bài đăng trên blog [Truy vấn cơ sở dữ liệu lớn trên Android ](https://medium.com/google-developers/large-database-queries-on-android-cb043ae626e8).
* AsyncListUtil cho phép phân trang dữ liệu dựa trên vị trí tới RecyclerView , nhưng không cho phép phân trang không có vị trí, và nó buộc các giá trị null-as-placeholders trong một tập dữ liệu có thể đếm được.

Thư viện phân trang mới giải quyết các vấn đề này. Thư viện này chứa một số lớp để sắp xếp hợp lý quá trình yêu cầu dữ liệu khi bạn cần. Các lớp này cũng làm việc liền mạch với các component hiện có, như Room .


## Khả năng

Các lớp của Thư viện Paging cho phép bạn hoàn thành các tác vụ được hiển thị trong phần này.

### Xác định cách tìm nạp dữ liệu

Sử dụng lớp DataSource để xác định nguồn dữ liệu bạn cần để kéo dữ liệu được phân trang từ đó. Tùy thuộc vào cách bạn cần truy cập dữ liệu của mình, bạn sẽ mở rộng một trong các lớp con của nó:

* Sử dụng PageKeyedDataSource nếu các trang bạn tải nhúng các khóa tiếp theo/trước đó. Ví dụ: nếu bạn đang tìm nạp các bài đăng từ mạng xã hội, bạn có thể cần phải truyền nextPage vào data của lần tải hiện tại.
* Sử dụng ItemKeyedDataSource nếu bạn cần sử dụng dữ liệu từ mục N để tìm nạp mục N + 1 . Ví dụ: nếu bạn đang tìm nạp các nhận xét cho ứng dụng thảo luận, bạn có thể cần phải truyền ID của một nhận xét để nhận nội dung của nhận xét tiếp theo.
* Sử dụng PositionalDataSource nếu bạn cần tìm nạp các trang dữ liệu từ bất kỳ vị trí nào bạn chọn trong kho dữ liệu của mình. Lớp này hỗ trợ yêu cầu một tập hợp các mục dữ liệu bắt đầu từ bất kỳ vị trí nào bạn chọn, như "Trả về 20 mục dữ liệu bắt đầu bằng vị trí 1200".

Nếu bạn sử dụng thư viện Room để quản lý dữ liệu của bạn, nó có thể tạo ra một DataSource.Factory để tạo ra các thực thể của PositionalDataSource cho bạn một cách tự động. Ví dụ:

 ```
@Query("select * from users WHERE age > :age order by name DESC, id ASC")
DataSource.Factory<Integer, User> usersOlderThan(int age);
```

### Tải dữ liệu vào bộ nhớ

Lớp PagedList tải dữ liệu từ một DataSource . Bạn có thể định cấu hình số lượng dữ liệu được tải cùng một lúc và lượng dữ liệu cần được tìm nạp trước, giảm thiểu lượng thời gian người dùng của bạn phải chờ dữ liệu được tải. Lớp này có thể cung cấp các tín hiệu cập nhật cho các lớp khác, chẳng hạn như RecyclerView.Adapter , cho phép bạn cập nhật nội dung của RecyclerView khi dữ liệu được tải trong các trang.

Tùy thuộc vào kiến trúc của ứng dụng, bạn có một số tùy chọn để sử dụng lớp PagedList . Để tìm hiểu thêm, hãy xem [Chọn một kiến trúc tải dữ liệu ](https://developer.android.com/topic/libraries/architecture/paging#choose-data-loading-arch).

### Hiển thị dữ liệu trong giao diện người dùng của bạn

Lớp PagedListAdapter là một implement của RecyclerView.Adapter trình bày dữ liệu từ một PagedList . Ví dụ, khi một trang mới được nạp, PagedListAdapter báo hiệu RecyclerView rằng dữ liệu đã đến; điều này cho phép RecyclerView thay thế bất kỳ placeholder nào bằng dữ liệu thực tế, thực hiện animation phù hợp.

PagedListAdapter cũng sử dụng một background thread để tính toán các thay đổi từ một PagedList sang PagedList tiếp theo (ví dụ, khi một thay đổi cơ sở dữ liệu tạo ra một PagedList mới với dữ liệu cập nhật) và gọi các phương thức notifyItem…() khi cần cập nhật nội dung của danh sách. RecyclerView sau đó thực hiện các thay đổi cần thiết. Ví dụ: nếu một item thay đổi vị trí giữa các phiên bản PagedList , thì RecyclerView sẽ chuyển động các mục đó sang vị trí mới trong danh sách.

### Quan sát cập nhật dữ liệu

Thư viện Paging cung cấp các lớp sau để xây dựng các container cho PagedList có khả năng cập nhật theo thời gian thực:

* LivePagedListBuilder

Lớp này tạo ra một LiveData < PagedList > từ DataSource.Factory mà bạn cung cấp. Nếu bạn sử dụng thư viện persistence Room để quản lý cơ sở dữ liệu của bạn, DAO có thể tạo ra DataSource.Factory cho bạn, sử dụng PositionalDataSource , như trong ví dụ sau:

 ```
 LiveData<PagedList<Item>> pagedItems =
        LivePagedListBuilder(myDataSource, /* page size */ 50)
                .setFetchExecutor(myNetworkExecutor)
                .build();
 ```
 
* RxPagedListBuilder

Lớp này cung cấp chức năng dựa trên RxJava2 tương tự như LivePagedListBuilder . Lớp này được cung cấp bởi các artifact dựa trên RxJava2 của thư viện **android.arch.paging: rxjava2: 1.0.0-alpha1** . Sử dụng lớp này, bạn có thể xây dựng các đối tượng PagedList và Observable trong việc triển khai PagedList , như được hiển thị trong đoạn mã sau:

 ```
 Flowable<PagedList<Item>> pagedItems =
        RxPagedListBuilder(myDataSource, /* page size */ 50)
                .setFetchScheduler(myNetworkScheduler)
                .buildFlowable(BackpressureStrategy.LATEST);
 ```
 
### Tạo luồng dữ liệu

Cùng với nhau, các thành phần của Thư viện phân trang tổ chức luồng dữ liệu từ nguồn dữ liệu dưới background thread và hiển thị trên UI. Ví dụ, khi một mục mới được chèn vào trong cơ sở dữ liệu của bạn, DataSource bị vô hiệu, và LiveData < PagedList > hoặc PagedList < PagedList > tạo một PagedList mới trên một background thread.

![](https://images.viblo.asia/73091966-fccd-4c91-b52b-19ce588be7ac.gif)
Hình 1. Các thành phần của Thư viện Paging thực hiện hầu hết công việc của chúng trong một luồng nền, do đó chúng không gây gánh nặng cho luồng UI.

PagedList mới được tạo sẽ được gửi đến PagedListAdapter trên UI thread. PagedListAdapter sau đó sử dụng DiffUtil trên một background thread để tính toán sự khác biệt giữa danh sách hiện tại và danh sách mới. Khi so sánh kết thúc, PagedListAdapter sử dụng thông tin khác biệt danh sách để thực hiện cuộc gọi thích hợp tới RecyclerView.Adapter.notifyItemInserted() để báo hiệu rằng một item mới đã được chèn vào.

RecyclerView trên chuỗi giao diện người dùng sau đó biết rằng nó chỉ phải liên kết một item mới và tạo animation trên màn hình.

## Ví dụ cơ sở dữ liệu

Các đoạn mã sau đây cho thấy một số cách có thể có của tất cả các phần làm việc cùng nhau.

### *Quan sát dữ liệu được phân trang bằng cách sử dụng LiveData*

Đoạn mã sau đây cho thấy tất cả các phần hoạt động cùng nhau. Khi người dùng được thêm, xóa hoặc thay đổi trong cơ sở dữ liệu, nội dung của RecyclerView được cập nhật tự động và hiệu quả:

 ```
@Dao
interface UserDao {
    // The Integer type parameter tells Room to use a PositionalDataSource
    // object, with position-based loading under the hood.
    @Query("SELECT * FROM user ORDER BY lastName ASC")
    public abstract DataSource.Factory<Integer, User> usersByLastName();
}

class MyViewModel extends ViewModel {
    public final LiveData<PagedList<User>> usersList;
    public MyViewModel(UserDao userDao) {
        usersList = new LivePagedListBuilder<>(
                userDao.usersByLastName(), /* page size */ 20).build();
    }
}

class MyActivity extends AppCompatActivity {
    private UserAdapter<User> mAdapter;

    @Override
    public void onCreate(Bundle savedState) {
        super.onCreate(savedState);
        MyViewModel viewModel = ViewModelProviders.of(this).get(MyViewModel.class);
        RecyclerView recyclerView = findViewById(R.id.user_list);
        mAdapter = new UserAdapter();
        viewModel.usersList.observe(this, pagedList ->
                mAdapter.submitList(pagedList));
        recyclerView.setAdapter(mAdapter);
    }
}

class UserAdapter extends PagedListAdapter<User, UserViewHolder> {
    public UserAdapter() {
        super(DIFF_CALLBACK);
    }
    @Override
    public void onBindViewHolder(UserViewHolder holder, int position) {
        User user = getItem(position);
        if (user != null) {
            holder.bindTo(user);
        } else {
            // Null defines a placeholder item - PagedListAdapter will automatically invalidate
            // this row when the actual object is loaded from the database
            holder.clear();
        }
    }
    public static final DiffUtil.ItemCallback<User> DIFF_CALLBACK =
            new DiffUtil.ItemCallback<User>() {
        @Override
        public boolean areItemsTheSame(@NonNull User oldUser, @NonNull User newUser) {
            // User properties may have changed if reloaded from the DB, but ID is fixed
            return oldUser.getId() == newUser.getId();
        }
        @Override
        public boolean areContentsTheSame(@NonNull User oldUser, @NonNull User newUser) {
            // NOTE: if you use equals, your object must properly override Object#equals()
            // Incorrectly returning false here will result in too many animations.
            return oldUser.equals(newUser);
        }
    }
}
```

### *Quan sát dữ liệu phân trang bằng RxJava2*

Nếu bạn thích sử dụng RxJava2 thay vì LiveData , thay vào đó bạn có thể tạo một đối tượng Observable hoặc Flowable :

 ```
class MyViewModel extends ViewModel {

    public final Flowable<PagedList<User>> usersList;

    public MyViewModel(UserDao userDao) {
        usersList = new RxPagedListBuilder<>(userDao.usersByLastName(),
                /* page size */ 50).buildFlowable(BackpressureStrategy.LATEST);
    }
}
```
Sau đó, bạn có thể bắt đầu và ngừng quan sát dữ liệu bằng cách sử dụng mã trong đoạn mã sau:

 ```
class MyActivity extends AppCompatActivity {
    private UserAdapter<User> mAdapter;
    private final CompositeDisposable mDisposable = new CompositeDisposable();

    @Override
    public void onCreate(Bundle savedState) {
        super.onCreate(savedState);
        MyViewModel viewModel = ViewModelProviders.of(this).get(MyViewModel.class);
        RecyclerView recyclerView = findViewById(R.id.user_list);
        mAdapter = new UserAdapter();
        recyclerView.setAdapter(mAdapter);
    }

    @Override
    protected void onStart() {
        super.onStart();
        myDisposable.add(mViewModel.usersList.subscribe(flowableList ->
                mAdapter.submitList(flowableList)));
    }

    @Override
    protected void onStop() {
        super.onStop();
        mDisposable.clear();
    }
}
```
Mã cho UserDao và UserAdapter giống nhau đối với giải pháp dựa trên RxJava2 vì chúng dùng cho giải pháp dựa trên LiveData .


## Chọn kiến trúc tải dữ liệu

Có hai cách chính để phân trang dữ liệu với Thư viện phân trang:

### Mạng hoặc cơ sở dữ liệu

Trước tiên, bạn có thể phân trang từ một nguồn duy nhất - hoặc bộ nhớ cục bộ hoặc mạng. Trong trường hợp này, hãy sử dụng một LiveData < PagedList > để nạp dữ liệu đã nạp vào giao diện người dùng, chẳng hạn như trong ví dụ trên.

Để chỉ định nguồn dữ liệu của bạn, hãy chuyển một DataSource.Factory sang LivePagedListBuilder .

![](https://images.viblo.asia/3c322313-c2a8-4e7a-a368-24eec11068c6.png)
Hình 2. Nguồn đơn dữ liệu cung cấp DataSource.Factory để tải nội dung.

Khi quan sát một cơ sở dữ liệu, cơ sở dữ liệu sẽ 'đẩy' một PagedList mới khi thay đổi nội dung xảy ra. Trong trường hợp phân trang mạng (khi backend không gửi cập nhật), một tín hiệu như pull-to-refresh có thể 'kéo' một PagedList mới bằng cách vô hiệu hóa DataSource hiện tại. Điều này làm mới tất cả dữ liệu một cách không đồng bộ.

Việc triển khai memory + network Repository trong PagingWithNetworkSample cho thấy cách thực hiện một remote DataSource.Factory bằng cách sử dụng Retrofit trong khi xử lý các thao tác vuốt để làm mới, các lỗi mạng và thử lại.

### Mạng và cơ sở dữ liệu

Trong trường hợp thứ hai, bạn có thể phân trang từ lưu trữ cục bộ, mà nó tự bổ sung dữ liệu từ mạng. Điều này thường được thực hiện để giảm thiểu tải mạng và cung cấp trải nghiệm kết nối thấp hơn - cơ sở dữ liệu được sử dụng làm bộ nhớ cache dữ liệu được lưu trữ trong backend.
Trong trường hợp này, hãy sử dụng một LiveData < PagedList > đến nội dung trang từ cơ sở dữ liệu và chuyển một BoundaryCallback tới LivePagedListBuilder để quan sát các tín hiệu ngoài dữ liệu.

![](https://images.viblo.asia/43220a2f-cea8-4336-8894-f2975c3b2980.png)
Hình 3. Cơ sở dữ liệu là bộ nhớ cache của dữ liệu mạng - UI tải dữ liệu từ Cơ sở dữ liệu và gửi tín hiệu khi không có dữ liệu để tải từ mạng vào cơ sở dữ liệu.

Sau đó kết nối các callback này với các request mạng, sẽ lưu trữ dữ liệu trực tiếp trong cơ sở dữ liệu. Giao diện người dùng được đăng ký cập nhật cơ sở dữ liệu, do đó nội dung mới sẽ tự động chuyển đến bất kỳ giao diện người dùng đang quan sát nào.

Cơ sở dữ liệu + kho lưu trữ mạng trong PagingWithNetworkSample cho thấy cách triển khai một mạng BoundaryCallback bằng Retrofit , trong khi xử lý các thao tác vuốt để làm mới, các lỗi mạng và thử lại.

Nguồn https://developer.android.com/topic/libraries/architecture/paging