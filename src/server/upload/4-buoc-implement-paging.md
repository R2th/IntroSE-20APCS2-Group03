>Thư viện Paging làm cho chúng ta dễ dàng hơn để tải dữ liệu dần trong ứng dụng của bạn bằng cách phân trang
> Thư viện Paging hỗ trợ cả danh sách và không giới hạn danh sách bị chặn lớn, chẳng hạn như newfeed liên tục cập nhật. Thư viện Paging được dựa trên ý tưởng về việc gửi danh sách để giao diện người dùng với các dữ liệu trực tiếp của một danh sách được quan sát bởi RecyclerView.Adapter.

![](https://images.viblo.asia/faa505ab-c43d-40e4-a8a6-996383d65581.png)
### Vì vậy, Bắt đầu thôi, Bước 1 : Thêm thư viện Paging vào trong app của bạn 
```
dependencies {
    //For Paging
    implementation 'android.arch.paging:runtime:1.0.0-alpha1'
    }
```
### Bước 2 : Tạo DataModel
```
@Entity
public class User {
    @PrimaryKey(autoGenerate = true)
    @ColumnInfo(name = "user_id")
    public long userId;
    @ColumnInfo(name = "first_name")
    public String firstName;
    public String address;
}
```
### Bước 3 : Data Access Object (DAO) :
> Để đơn giản trong connection giữa Database và RecyclerView, chúng ta sử dụng LivePagedListProvider.
```
@Dao
public interface UserDao {
 
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    public void insertAll(List<User> users);
 
    @Query("SELECT * FROM User")
    public abstract LivePagedListProvider<Integer,User> usersByFirstName();
 
}
```
> Tạo Database trong ví dụ này mình sử dung sqlite.
```
@Database(entities = {User.class}, version = 1)
abstract public class AppDatabase extends RoomDatabase {
    public static final String DATABASE_NAME = "UserDb";
 
    public abstract UserDao userDao();
}
```
### Bước 4 : Tạo các thành phần của Adapter :
> Create ViewModel ViewModel này sẽ extends từ ViewModel của Architecture Component và sử dụng chúng để tham chiếu tới LiveData của PagedList. Chúng ta sẽ lấy từ DAO bằng cách gọi getUsers(). 
```
public class UserViewModel extends ViewModel {
 
    public LiveData<PagedList<User>> userList;
 
    public UserViewModel() {
 
    }
 
    public void init(UserDao userDao) {
        userList = userDao.usersByFirstName().create(0,
                new PagedList.Config.Builder()
                        .setEnablePlaceholders(true)
                        .setPageSize(30)
                        .setPrefetchDistance(30)
                        .build());
    }
}
```
> Tạo một Adapter để thông báo cho PagedListAdapter biết sự khác nhau giữa hai phần tử implement lớp DiffCallback.
```
@Entity
public class User {
    public static DiffCallback<User> DIFF_CALLBACK = new DiffCallback<User>() {
        @Override
        public boolean areItemsTheSame(@NonNull User oldItem, @NonNull User newItem) {
            return oldItem.userId == newItem.userId;
        }
 
        @Override
        public boolean areContentsTheSame(@NonNull User oldItem, @NonNull User newItem) {
            return oldItem.equals(newItem);
        }
    };
 
    @Override
    public boolean equals(Object obj) {
        if (obj == this)
            return true;
 
        User user = (User) obj;
 
        return user.userId == this.userId && user.firstName == this.firstName;
    }
}
```
>Tạo một PageListAdapter
```
public class UserAdapter extends PagedListAdapter<User, UserAdapter.UserItemViewHolder> {
 
    protected UserAdapter() {
        super(User.DIFF_CALLBACK);
    }
 
    @Override
    public UserItemViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View view = layoutInflater.inflate(R.layout.item_user_list, parent, false);
        return new UserItemViewHolder(view);
    }
 
    @Override
    public void onBindViewHolder(UserItemViewHolder holder, int position) {
        User user= getItem(position);
        if(user!=null) {
            holder.bindTo(user);
        }
    }
 
}
```
Và trong main Activity chúng ta sẽ viết như thế này.
```
UserViewModel viewModel = ViewModelProviders.of(this).get(UserViewModel.class);
 viewModel.init(userDao);
 final UserAdapter userUserAdapter = new UserAdapter();
 
 viewModel.userList.observe(this, pagedList -> {
        userUserAdapter.setList(pagedList);
 });
 
 recyclerView.setAdapter(userUserAdapter);
```
### OK, như vậy là mình đã giới thiệu cho bạn cách demo thư viên Paging cơ bản . Mong nó sẽ giúp ích . Happy new year !!