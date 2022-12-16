Architecture Component ViewModel được Google cho ra mắt vào tháng 11/2017 cho tới nay nó vẫn còn khá mới mẻ trong cộng đồng Android Developer. Mục đích của sự công bố này nhằm giúp cho việc phát triển ứng dụng ngày càng trở lên thuận tiện, bảo trì và kiểm thử được dễ dàng hơn. Tuy nhiên ban đầu khi tiếp xúc sẽ có phần khó khăn để hiểu được kiến trúc này, do vậy trong bài viết mình sẽ kết hợp với ví dụ thực tế để mọi người cùng nắm bắt dễ hơn.

**Vấn đề thực tế:**

- Khi bạn khởi tạo 1 màn hình (Activity hoặc Fragment) > Việc load data & UI đã xong > Xoay màn hình thiết bị > Việc load data & UI bị thực hiện lại 1 lần nữa.
Và việc thực hiện xoay màn hình rất dễ xảy ra trong quá trình sử dụng, bởi người dùng muốn quan sát ở những trạng thái thuận tiện hơn.

***Kết quả:***

- Việc truyền data từ Activity và Fragment rất có thể bị mất dữ liệu và thực hiện gọi API rất nhiều lần
- Memory leaks

**Lợi ích của việc sử dụng Architecture Component ViewModel**

![](https://images.viblo.asia/f5d3c892-14a1-46cf-b629-75ed08ad1015.gif)

Như các bạn thấy trong hình  : UI Holder lúc này được thay thế bởi **ViewModel** điều đó có nghĩa rằng : nó sẽ lưu trữ toàn bộ data UI và quản lý vòng đời của những data đó.

1. Bạn sẽ không cần phải lo lắng về vòng đời của dữ liệu hiển thị
2. Data sẽ luôn được update, dữ liệu lúc trước và sau khi xoay màn hình hoàn toàn giống nhau. 
3. Bạn không phải truyền lại data (arguments : id, objects,..) sang Activity or Fragment và gọi lại API lần thứ 2
4. Data sẽ chờ đợi bạn, nếu bạn thực hiện việc call API sau đó xoay màn hình thì khi kết quả trả về sẽ được chuyển tới trước khi Activity được khởi tạo lại. Chúng đã được lưu ở ViewModel và bạn lấy ra hiển thị trực tiếp

### Cách dùng Architecture Component ViewModel

Những lợi ích khi sử dụng thì chúng ta đều đã rõ vậy thì đến bước triển khai sẽ ra sao? Dưới đây mình có nêu ra 1 trường hợp thực tế như sau:

**Android App:** Có màn hình hiển thị danh sách những developer có trong 1 công ty nhỏ

![](https://images.viblo.asia/d8286cac-355d-4403-8fcc-f52f86797bc5.png)

Thao tác thông thường sau khi call API để lấy được data mà chúng ta xoay màn hình thì việc call API lại tiếp tục được thực hiện, ở đây data mình initiation ở local.  Source code như sau:

`MainActivity.java`

```
public class MainActivity extends AppCompatActivity {

    private UserAdapter mAdapter;
    private ActivityMainBinding mBinding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mBinding = DataBindingUtil.setContentView(this, R.layout.activity_main);
        mAdapter = new UserAdapter();
        mBinding.mainList.setLayoutManager(new LinearLayoutManager(this));
        mBinding.mainList.addItemDecoration(
                new DividerItemDecoration(this, DividerItemDecoration.VERTICAL));
        mBinding.mainList.setAdapter(mAdapter);
        // Comment it when use Architecture Components ViewModel
        mAdapter.setUserList(loadUsers());
    }

    /**
     * You only use this method when
     * You want to check rotation screen
     */
    private List<User> loadUsers() {
        List<User> userList = new ArrayList<>();
        userList.add(new User("Khahoo Ajish", "Front-End Developer", R.drawable.khahoo));
        userList.add(new User("John Covey", "Back-End Developer", R.drawable.john));
        userList.add(new User("Loges Vamber", "iOS Developer", R.drawable.loges));
        userList.add(new User("Jung Kim Bap", "Android Developer", R.drawable.jung));
        userList.add(new User("Seeng Luse", "AI Developer", R.drawable.seeng));
        //Log for easily see
        Log.i("MainActivity", "loadUsers: ---------> size:" + userList.size());
        return userList;
    }
}

```

**1. Khai báo dependencies vào trong project**

 >> File path:   `app/build.gradle`
 >> 

```
// Architecture components
    implementation 'android.arch.lifecycle:extensions:1.1.1'
    implementation 'android.arch.lifecycle:runtime:1.1.1'
    annotationProcessor 'android.arch.lifecycle:compiler:1.1.1'
```

**2. Tạo 1 class `UserViewModel` được extends từ `AndroidViewModel`**

`UserViewModel.java`

```
public class UserViewModel extends AndroidViewModel {
    private List<User> userList;

    public UserViewModel(@NonNull Application application) {
        super(application);
        if (userList == null) {
            setupUserList();
        }
    }

    public List<User> getUserList() {
        return userList;
    }

    private void setupUserList() {
        userList = new ArrayList<>();
        userList.add(new User("Khahoo Ajish", "Front-End Developer", R.drawable.khahoo));
        userList.add(new User("John Covey", "Back-End Developer", R.drawable.john));
        userList.add(new User("Loges Vamber", "iOS Developer", R.drawable.loges));
        userList.add(new User("Jung Kim Bap", "Android Developer", R.drawable.jung));
        userList.add(new User("Seeng Luse", "AI Developer", R.drawable.seeng));
        Log.i("UserViewModel", "setupUserList: ---------> size: "+userList.size());
    }
}
```

Tiếp theo là tạo một Adapter cho việc custom view của thành viên (developer) trong công ty, mình gọi đó là `UserAdapter`

`UserAdapter.java`

```
public class UserAdapter extends RecyclerView.Adapter<UserAdapter.UserViewHolder> {
    private List<User> mUserList;

    public void setUserList(List<User> userList) {
        if (mUserList == null) {
            mUserList = new ArrayList<>();
        }
        mUserList.clear();
        mUserList.addAll(userList);
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public UserViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new UserViewHolder(
                ItemUserBinding.inflate(LayoutInflater.from(parent.getContext()), parent, false));
    }

    @Override
    public void onBindViewHolder(@NonNull UserViewHolder holder, int position) {
        if (getItemCount() > 0) holder.bindData(mUserList.get(position));
    }

    @Override
    public int getItemCount() {
        return mUserList != null ? mUserList.size() : 0;
    }

    class UserViewHolder extends RecyclerView.ViewHolder {

        private ItemUserBinding mBinding;

        public UserViewHolder(ItemUserBinding binding) {
            super(binding.getRoot());
            mBinding = binding;
        }

        public void bindData(User user) {
            if (mBinding.getUser() == null && user != null) {
                mBinding.setUser(user);
            }
        }
    }
}
```

**Bonus:** Với những bạn lo lắng trong việc "kiếm" những avatar ở đâu thì trong source code của mình đã có hết rồi. Mình đã đính kèm ở cuối bài viết này rồi nha :D

**3. Sử dụng ViewModel trong Activity hoặc Fragment**

Bây giờ chúng ta chính sửa lại MainActivity ban đầu một chút như sau:

`MainActivity.java`

```
public class MainActivity extends AppCompatActivity {

    private UserAdapter mAdapter;
    private ActivityMainBinding mBinding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mBinding = DataBindingUtil.setContentView(this, R.layout.activity_main);
        mAdapter = new UserAdapter();
        mBinding.mainList.setLayoutManager(new LinearLayoutManager(this));
        mBinding.mainList.addItemDecoration(
                new DividerItemDecoration(this, DividerItemDecoration.VERTICAL));
        mBinding.mainList.setAdapter(mAdapter);
        // Comment it when use Architecture Components ViewModel
        //        mAdapter.setUserList(loadUsers());
        final UserViewModel userViewModel = ViewModelProviders.of(this).get(UserViewModel.class);
        mAdapter.setUserList(userViewModel.getUserList());
    }
}
```

**Giải thích:** 
```
UserViewModel userViewModel = ViewModelProviders.of(this).get(UserViewModel.class);
```
Câu lệnh khởi tạo ViewModel rất đơn giản, sau đó data `userList` đã được lưu và quản lý bởi factory `ViewModelProviders` mà chúng ta không phải lo việc chạy lại method lấy data khi xoay màn hình nữa.
Các bạn sau khi chạy project lên có thể kiểm tra log xem việc gọi lại có diễn ra hay không nhé. ^^

### Kết quả demo

{@youtube: https://youtu.be/1-erA4xoC5A}

### Một chút thắc mắc về vai trò của `onSaveInstanceState`

Chắc hẳn một vài developer đã có kinh nghiệm trong việc sử dụng `onSaveInstanceState()` sẽ hỏi :

>  Ồ onSaveInstanceState vẫn thường được sử dụng để lưu lại trạng thái của UI dựa trên sự thay đổi cài đặt, đâu cần phải dùng ViewModel ?
>  

**Trả lời:**

***Điều đơn giản là ViewModel sinh ra không phải để thay thế cho onSaveInstanceState***

ViewModel chỉ lưu và quản lý UI data khi quá trình activity hoặc fragment bị khởi tạo lại. onSaveInstanceState() có thể sống lâu hơn mặc dù activity đã bị hủy bởi 1 hệ thống (ví dụ như lúc app đi vào trạng thái background và hệ thống giải phóng memory cho ứng dụng khác ưu tiên hơn)
Tất nhiên bạn có thể chỉ sử dụng onSaveInstanceState(), nhưng sẽ có một vài bất lợi như:

- onSaveInstanceState() chỉ lưu được số lượng data nhỏ gọn
- data phải được **Parcelable** vì thế mà nó không dễ dàng lưu và khôi phục lại được giá trị, rất có thể giá trị đó bạn set vào nhưng lúc lấy ra sử dụng chúng lại bị null

> Vậy chúng ta có thể sử dụng onSaveInstanceState khi nào?
> 

Đây là câu hỏi khá hay, từ kinh nghiệm thực tế của mình. Chúng ta chỉ nên sử dụng khi:

1. data thật sự cần thiết để call API lấy dữ liệu (ví dụ : id của user hoặc 1 key cần thiết truy cập api)
2. data nhỏ gọn không ảnh hưởng đến performance, còn việc lấy danh sách message hay list data chúng ta nên dùng ViewModel.

### Tổng kết

Chúng ta vừa cùng nhau làm rõ về **Architecture Component ViewModel** mình hy vọng với những thông tin ở trên sẽ thực sự mang lại lợi ích cho những Android Developer và rất mong nhận được sự đóng góp từ các bạn đã sử dụng qua để cùng nhau tiến bộ.
Mình gửi source code để các bạn dễ dàng bắt nhịp hơn trong việc xây dựng demo, nếu có khó khăn hãy comment phía dưới để mình hoặc mọi người giải đáp nha. :)

[GitHub Source Code Download](https://github.com/thanhviet-ucan/ArchitectureComponentViewModel)