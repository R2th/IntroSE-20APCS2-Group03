### 1. ViewModel là gì?
ViewModel là một Class trong Architecture Component, được thiết kế để lưu trữ và quản lý dữ liệu liên quan đến giao diện người dùng theo cách nhận biết được vòng đời của View như Activity, Fragment chẳng hạn. 
ViewModel cho phép dữ liệu tồn tại khi thay đổi cấu hình ứng dụng ví dụ như xoay màn hình chẳng hạn.
### 2. Tại sao phải sử dụng ViewModel?
Khi người dùng có một công việc đang thực hiện trên ứng dụng và cấu hình bị thay đổi như xoay màn hình chẳng hạn.
Như chúng ta đã biết khi cấu hình thay đổi thì Activity sẽ được khởi tạo lại. Và dữ liệu trước đó của Activity sẽ biến mất. Để giải quyết vấn đề này thì từ lâu Android đã cung cấp phương thức onSaveInstanceState() trong Activity để để lấy lại dữ liệu trước đó. Nhưng onSaveInstanceState() chỉ lưu được các giá trị nguyên thì và kiểu object đơn giản là String. Và những dữ liệu này phải có khả năng Serializable, nó không dễ dàng và khôi phục.
Vậy khi dữ liệu là một danh sách Users chẳng hạn thì onSaveInstanceState() lại không làm được.

Một vấn đề khác là các UI Controller của Activity hay Fragment luôn xử lý các cuộc gọi không đồng bộ và có thể mất một một thời gian để trả về. UI Controller phải quản lý các cuộc gọi này và đảm bảo dọn sạch chúng khi Activity destroy để tránh  memory leaks. Sự quản lý này đòi hỏi nhiều chi phí và thật lãng phí vì đối tượng có thể phải tiến hành lại các cuộc gọi trước đó khi xảy ra thay đổi cấu hình phải không nào.

Ngoài ra Activity và Fragment chủ yếu hiển thị giao diện, tương tác với hành động của người dùng hoặc xử lý các giao tiếp của hệ điều hành như request permission. Nhiều khi còn có thêm yêu cầu load dữ liệu từ database hoặc internet. Việc giao trách nhiệm quá mức cho các UI Controller dẫn đến một lớp cố gắng xử lý tất cả các công việc thay vì ủy thác cho những lớp khác. Việc này sẽ khiến cho việc testing trở nên khó khăn rất nhiều.
### 3. Sử dụng ViewModel như thế nào?
Mình sẽ làm một ví dụ để hiện một danh sách Users có tên và số điện thoại, khi xoay màn hình thì dữ liệu không  mất đi vì được lưu giữ ở ViewModel và được Activity mới dùng ngay lập tức.

- 1. Đầu tiên bạn phải import ViewModel và RecyclerView vào file gradle của module app:
```java
def lifecycle_version = "2.0.0"
    // ViewModel and LiveData
    implementation "androidx.lifecycle:lifecycle-extensions:$lifecycle_version"
    implementation 'com.android.support:recyclerview-v7:28.0.0'
```
Ở trên mình đã sử dụng [AndroidX](https://viblo.asia/p/androidx-ban-da-dung-no-chua-bJzKmXww59N), bạn có thể không cần dùng nó.

- 2. Tiếp theo Xml của MainActivity là một RecyclerView (activity_main)
```java
<?xml version="1.0" encoding="utf-8"?>
<androidx.recyclerview.widget.RecyclerView xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/recycler_users"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

</androidx.recyclerview.widget.RecyclerView>
```
để chứa các chứa các User Item (item_user):
```java
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:padding="16dp"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:gravity="center"
    android:orientation="vertical">

    <TextView
        android:id="@+id/text_name"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />

    <TextView
        android:id="@+id/text_phone"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content" />
</LinearLayout>
```
- 3. Tạo một Class User:
```java
public class User {
    private int mId;
    private String mName;
    private String mPhone;

    public User(int id, String name, String phone) {
        mId = id;
        mName = name;
        mPhone = phone;
    }

    public int getId() {
        return mId;
    }

    public void setId(int id) {
        mId = id;
    }

    public String getName() {
        return mName;
    }

    public void setName(String name) {
        mName = name;
    }

    public String getPhone() {
        return mPhone;
    }

    public void setPhone(String phone) {
        mPhone = phone;
    }
}
```

- 4. Tiếp theo là tạo Class UsersAdapter cho RecyclerView:
```java
public class UsersAdapter extends RecyclerView.Adapter<UsersAdapter.ViewHolder> {
    private List<User> mUsers;

    public UsersAdapter(List<User> users) {
        mUsers = users;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View view = layoutInflater.inflate(R.layout.item_user, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.bindUser(mUsers.get(position));
    }

    @Override
    public int getItemCount() {
        return mUsers == null ? 0 : mUsers.size();
    }

    public static class ViewHolder extends RecyclerView.ViewHolder {
        private TextView mTextName;
        private TextView mTextPhone;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            mTextName = itemView.findViewById(R.id.text_name);
            mTextPhone = itemView.findViewById(R.id.text_phone);
        }

        public void bindUser(User user) {
            mTextName.setText(user.getName());
            mTextPhone.setText(user.getPhone());
        }
    }
}
```
- 5. Quan trọng nhất là tạo một Class UsersViewModel extend ViewModel:
```java
public class UsersViewModel extends ViewModel {
    private List<User> mUsers;

    public List<User> getUsers() {
        if (mUsers == null) {
            mUsers = loadUsers();
        }
        return mUsers;
    }

    private List<User> loadUsers() {
        Log.d("TAG", "getUsers: only one time");
        List<User> users = new ArrayList<>();
        users.add(new User(1, "Nguyen Van A", "0912213960"));
        users.add(new User(2, "Nguyen Van B", "0912213961"));
        users.add(new User(3, "Nguyen Van C", "0912213962"));
        users.add(new User(4, "Nguyen Van D", "0912213963"));
        users.add(new User(5, "Nguyen Van E", "0912213964"));
        users.add(new User(6, "Nguyen Van F", "0912213965"));
        users.add(new User(7, "Nguyen Van G", "0912213966"));
        users.add(new User(8, "Nguyen Van H", "0912213967"));
        return users;
    }
}
```
Ở đây mình đã fake data một danh sách Users, xem bình thường dữ liệu này có thể lấy từ local hoặc internet.
- 6. Ở trong MainActivity:
```java
public class MainActivity extends AppCompatActivity {

    private UsersViewModel mUsersViewModel;
    private RecyclerView mRecyclerUsers;
    private UsersAdapter mUsersAdapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mUsersViewModel = ViewModelProviders.of(this).get(UsersViewModel.class);
        mRecyclerUsers = findViewById(R.id.recycler_users);
        mRecyclerUsers.setLayoutManager(new LinearLayoutManager(this, RecyclerView.VERTICAL, false));
        mUsersAdapter = new UsersAdapter(mUsersViewModel.getUsers());
        mRecyclerUsers.setAdapter(mUsersAdapter);
    }
}
```
Bạn lấy ra đối tượng ViewModel bằng câu lệnh:
```java
mUsersViewModel = ViewModelProviders.of(this).get(UsersViewModel.class);
```
Chạy chương trình. Và đây là kết quả mình nhận được:
![](https://images.viblo.asia/c98d8340-9a56-4c62-9198-7dc380554fc9.png)

Rồi sau đó ta xoay màn hình:
![](https://images.viblo.asia/aa12c309-fb94-4795-b9a5-f7215a6f2d39.png)
Như bạn đã thấy. Danh sách users không mất đi, nó luôn đc giữ bởi UsersViewModel khi cấu hình thay đổi. Phương thức getUsers trong ViewModel chỉ được gọi 1 lần duy nhất khi Activity được khởi tạo (dòng dưới chỉ log ra 1 lần duy nhất).
```java
D/TAG: getUsers: only one time
```
Bạn có thể tham khảo source code ở đây: https://github.com/NguyenMinhTuanB/AndroidViewModelExample

### 4. So sánh ViewModel và các phương pháp khác.
Khi Activity bị hủy do ràng buộc hệ thống (thay đổi cấu hình hoặc activity bị kill do hệ thống) thì bạn nên lưu trạng thái UI tạm thời của người dùng bằng cách sử dụng kết hợp ViewModel, onSaveInstanceState, và hoặc local storage.
![](https://images.viblo.asia/dc3400b8-b183-40c3-ab26-e28e25779589.png)
Như trên chúng ta thấy ViewModel chỉ tồn tài khi thay đổi cấu hình mà thôi. Còn trường hợp Activity bị kill cho hệ thống hoặc finish thì nó không tồn tại nữa. Đổi lại thì nó được truy xuất nhanh với khuyến khích sử dụng các dữ liệu phức tạp.
Một nhược điểm nữa của nó là có bộ nhớ giới hạn.
### 5. Vòng đời của ViewModel.
Các đối tượng ViewModel đều có vòng đời. Và chúng được thông qua ViewModelProvider để khi lấy ra. ViewModel vẫn còn trong bộ nhớ cho đến khi vòng đời của nó biến mất vĩnh viễn: Đối với Activity là khi nó finishes, còn đối với Fragment là khi no detached.
Hình dưới biểu diễn vòng đời của ViewModel với một Activity tương ứng.Vòng đời của nó với Fragment cũng tương tư.
![](https://images.viblo.asia/1e430e72-75c2-4c30-abe9-8e843fe6f77c.png)

### 6. Tổng kết.
Qua bài viết mình đã nói cho các bạn biết về đối tượng ViewModel, một thành phần trong [Architecture Components](https://viblo.asia/p/la-mot-android-developer-thi-ban-nhat-dinh-phai-biet-ve-architecture-components-1-3P0lPz0pKox). Ở bài viết tiếp theo mình có thể trình bày các trao đổi giữa các Fragment với nhau thông qua ViewModel. Cám ơn đã theo dõi bài viết.
### 7. Tài liệu tham khảo.
https://developer.android.com