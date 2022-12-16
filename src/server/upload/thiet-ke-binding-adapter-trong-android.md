Với sự ra đời của Data Binding việc đổ dữ liệu từ Activity, Adapter... đã trở nên đơn giản và dễ dàng hơn đối với các lập trình viên chúng ta. Trong bài viết này mình sẽ hướng dẫn các bạn thiết kế 1 binding adapter với 1 mục đích có thể sử dụng cho tất cả các RecyclerView đơn giản


### Thiết kế binding adapter


-----

```
public class BaseBindingAdapter<T> extends RecyclerView.Adapter<BaseBindingAdapter.ViewHolder> {
    private List<T> data;
    private LayoutInflater inflater;
    private @LayoutRes int resId;

    public BaseBindingAdapter(Context context, @LayoutRes int resId) {
        inflater = LayoutInflater.from(context);
        this.resId = resId;
    }

    public void setData(List<T> data) {
        this.data = data;
        notifyDataSetChanged();
    }

    public List<T> getData() {
        return data;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup viewGroup, int i) {
        return new ViewHolder(DataBindingUtil.inflate(inflater, resId, viewGroup, false));
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder viewHolder, int i) {
        T item = data.get(i);
        viewHolder.binding.setVariable(BR.item, item);
        viewHolder.binding.executePendingBindings();
    }

    @Override
    public int getItemCount() {
        return data == null ? 0 : data.size();
    }

    public class ViewHolder extends RecyclerView.ViewHolder {
        ViewDataBinding binding;

        public ViewHolder(@NonNull ViewDataBinding binding) {
            super(binding.getRoot());
            this.binding = binding;
        }
    }
}

```

Đây là code dành cho adapter mà mình sẽ thiết kế
```
public class BaseBindingAdapter<T>
```
`T` ở là kiểu truyền dữ liệu generic như thế adapter của bạn sẽ có thể nhận được tất cả các object data cho các list khác nhau
```
private @LayoutRes int resId;
```
là layout item sẽ hiển thị dữ liệu cho adapter
```
viewHolder.binding.setVariable(BR.item, item);
```
Khi này chúng ta sẽ thực hiện set 1 variable có tên là item xuống `resId`, item ở đây chính là dữ liệu để hiển thị lên item view. Đối với cách này có 1 hạn chế là các variable đc khai báo ở layout nhất thiết phải đặt giống tên ở trên adapter định nghĩa

### Thiết kế model


-----


```
public class User {
    private String name;
    private String phone;
    private String address;

    public User(String name, String phone, String address) {
        this.name = name;
        this.phone = phone;
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }
}

```
### Thiết kế layout cho item view


-----
```
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">

    <data>

        <variable
            name="item"
            type="com.n.myapplication.User" />
    </data>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        android:padding="10dp">

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="@{item.name}"
            android:textColor="@color/colorAccent"
            android:textStyle="bold" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="@{item.address}" />

        <TextView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="@{item.phone}" />
    </LinearLayout>
</layout>
```
các bạn chú ý ở chỗ khai báo variable
```
<variable
            name="item"
            type="com.n.myapplication.User" />
```
ở đây chúng ta phải khai báo variable là item nhận dữ liệu từ adapter đưa xuống

### Khai báo layout cho activity


-----
```
<?xml version="1.0" encoding="utf-8"?>
<layout>

    <android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">

        <android.support.v7.widget.RecyclerView
            android:id="@+id/lv_user"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            app:layoutManager="android.support.v7.widget.LinearLayoutManager"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

    </android.support.constraint.ConstraintLayout>
</layout>
```

### Xử lý trên activity


-----

```
public class MainActivity extends AppCompatActivity {
    private ActivityMainBinding binding;
    private List<User> data = new ArrayList<>();
    private BaseBindingAdapter<User> adapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main);
        initData();
        adapter = new BaseBindingAdapter<>(this, R.layout.item_user);
        adapter.setData(data);
        binding.lvUser.setAdapter(adapter);
    }

    private void initData() {
        data.add(new User("Nguyễn Văn A", "0123345687", "Hà nội"));
        data.add(new User("Nguyễn Văn B", "0985564222", "TP HCM"));
        data.add(new User("Nguyễn Văn C", "0988555422", "Huế"));
        data.add(new User("Nguyễn Văn D", "0985311441", "Đà Nẵng"));

    }
}

```
ở đây chúng ta có xử lý
```
private BaseBindingAdapter<User> adapter;
```
ở đây chúng ta sẽ khởi tạo adapter để hiển thị cho danh sách các user

```
adapter = new BaseBindingAdapter<>(this, R.layout.item_user);
```
tiếp đến là đưa layout mà chúng ta đã định nghĩa cho item view vào

### Kết luận


-----
Như thế chúng ta đã biết được cách định nghĩa 1 binding adapter để sử dụng cho các RecyclerView đơn giản. Việc tạo ra 1 adapter như này sẽ giúp chúng ta không phải tạo mỗi 1 RecyclerVuew 1 adapter nữa.