Vậy paging là gì ? Chính là thư viện phân trang giúp bạn dễ dàng load more data trong ứng dụng của mình sử dụng RecyclerView.
Một số ưu điểm của Paging:
1. Giả sư chúng ta có 1000 item , nếu như load hết tất cả ra, thì sẽ mất 1 khoảng time delay khá nhiều, nhưng nế như ta chia nhỏ ra, load 10 item 1, như vậy thời gian rút ngắn hơn, tốn ít băng thông mạng hơn, và người dùng có thể trải nghiệm UX tốt hơn.
2. Sử dụng đơn giản, linh hoạt . Tối ưu được hiệu năng của device
Vậy, sử dụng thư viện này như thế nào ? Khá đơn giản
##  1.Adding Components vào project 
```
allprojects {
    repositories {
        jcenter()
        maven { url 'https://maven.google.com' }
    }
}
```

```
dependencies {
    implementation 'androidx.lifecycle:lifecycle-extensions:2.0.0-beta01'
    annotationProcessor "androidx.lifecycle:lifecycle-compiler:2.0.0-beta01"
    // Room
    implementation 'androidx.room:room-runtime:2.0.0-beta01'
    annotationProcessor "androidx.room:room-compiler:2.0.0-beta01"
    // Paging
    implementation 'androidx.paging:paging-runtime:2.0.0-beta01'
    implementation 'com.squareup.retrofit2:retrofit:2.4.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.4.0'
 
    implementation 'androidx.recyclerview:recyclerview:1.0.0-beta01'
    
    implementation 'androidx.appcompat:appcompat:1.0.0-beta01'
}
```
## 2.Setting up Retrofit cho Pagination
```
public interface GitHubService {
    @GET("/users")
    Call<List<User>> getUser(@Query("since") int since, @Query("per_page") int perPage);
}
```

Ta tạo ra 1 lớp RetrofitService static để config cho retrofit 
```
public class GitHubApi {
 
    public static GitHubService createGitHubService() {
        Retrofit.Builder builder = new Retrofit.Builder()
                .addConverterFactory(GsonConverterFactory.create())
                .baseUrl("https://api.github.com");
 
        return builder.build().create(GitHubService.class);
    }
}
```

## 3.Create ItemKeyedDataSource
Trình tải dữ liệu gia tăng để phân trang nội dung có khóa, trong đó nội dung được tải sử dụng các mục đã tải trước đó làm đầu vào cho các lần tải trong những lần tải tiếp theo.
Các bạn có thể tham khảo thêm về các loại DataSource : https://developer.android.com/reference/android/arch/paging/ItemKeyedDataSource

```
public class ItemKeyedUserDataSource extends ItemKeyedDataSource<Long, User> {
    public static final String TAG = "ItemKeyedUserDataSource";
    GitHubService gitHubService;
    LoadInitialParams<Long> initialParams;
    LoadParams<Long> afterParams;
    private MutableLiveData networkState;
    private MutableLiveData initialLoading;
    private Executor retryExecutor;

    public ItemKeyedUserDataSource(Executor retryExecutor) {
        gitHubService = GitHubApi.createGitHubService();
        networkState = new MutableLiveData();
        initialLoading = new MutableLiveData();
        this.retryExecutor = retryExecutor;
    }


    public MutableLiveData getNetworkState() {
        return networkState;
    }

    public MutableLiveData getInitialLoading() {
        return initialLoading;
    }

    @Override
    public void loadInitial(@NonNull LoadInitialParams<Long> params, @NonNull LoadInitialCallback<User> callback) {
        Log.i(TAG, "Loading Rang " + 1 + " Count " + params.requestedLoadSize);
        List<User> gitHubUser = new ArrayList();
        initialParams = params;
        initialLoading.postValue(NetworkState.LOADING);
        networkState.postValue(NetworkState.LOADING);
        gitHubService.getUser(1, params.requestedLoadSize).enqueue(new Callback<List<User>>() {
            @Override
            public void onResponse(Call<List<User>> call, Response<List<User>> response) {
                if (response.isSuccessful() && response.code() == 200) {
                    gitHubUser.addAll(response.body());
                    callback.onResult(gitHubUser);
                    initialLoading.postValue(NetworkState.LOADED);
                    networkState.postValue(NetworkState.LOADED);
                    initialParams = null;
                } else {
                    Log.e("API CALL", response.message());
                    initialLoading.postValue(new NetworkState(Status.FAILED, response.message()));
                    networkState.postValue(new NetworkState(Status.FAILED, response.message()));
                }
            }

            @Override
            public void onFailure(Call<List<User>> call, Throwable t) {
                String errorMessage;
                errorMessage = t.getMessage();
                if (t == null) {
                    errorMessage = "unknown error";
                }
                networkState.postValue(new NetworkState(Status.FAILED, errorMessage));
            }
        });

    }

    @Override
    public void loadAfter(@NonNull LoadParams<Long> params, @NonNull LoadCallback<User> callback) {
        Log.i(TAG, "Loading Rang " + params.key + " Count " + params.requestedLoadSize);
        List<User> gitHubUser = new ArrayList();
        afterParams = params;

        networkState.postValue(NetworkState.LOADING);
        gitHubService.getUser(params.key, params.requestedLoadSize).enqueue(new Callback<List<User>>() {
            @Override
            public void onResponse(Call<List<User>> call, Response<List<User>> response) {
                if (response.isSuccessful()) {
                    gitHubUser.addAll(response.body());
                    callback.onResult(gitHubUser);
                    networkState.postValue(NetworkState.LOADED);
                    afterParams = null;
                } else {
                    networkState.postValue(new NetworkState(Status.FAILED, response.message()));
                    Log.e("API CALL", response.message());
                }
            }

            @Override
            public void onFailure(Call<List<User>> call, Throwable t) {
                String errorMessage;
                errorMessage = t.getMessage();
                if (t == null) {
                    errorMessage = "unknown error";
                }
                networkState.postValue(new NetworkState(Status.FAILED, errorMessage));
            }
        });

    }

    @Override
    public void loadBefore(@NonNull LoadParams<Long> params, @NonNull LoadCallback<User> callback) {

    }

    @NonNull
    @Override
    public Long getKey(@NonNull User item) {
        return item.userId;
    }

}
```
 ta thực hiện load trong hàm loadInitial và loadAfter để load data 
##  4.DataSourceFactory
Tạo ra 1 lớp DataSourceFactory để xử lý vấn đề về config và data
```
public class UserViewModel extends ViewModel {
 
    public LiveData<PagedList<User>> userList;
    public LiveData<NetworkState> networkState;
    Executor executor;
    LiveData<ItemKeyedUserDataSource> tDataSource;
 
    public UserViewModel() {
        GitHubUserDataSourceFactory githubUserDataSourceFacteory = new GitHubUserDataSourceFactory(executor);
 
        tDataSource = githubUserDataSourceFacteory.getMutableLiveData();
 
        networkState = Transformations.switchMap(githubUserDataSourceFacteory.getMutableLiveData(), dataSource -> {
            return dataSource.getNetworkState();
        });
 
        PagedList.Config pagedListConfig =
                (new PagedList.Config.Builder()).setEnablePlaceholders(false)
                        .setInitialLoadSizeHint(10)
                        .setPageSize(20).build();
 
        userList = (new LivePagedListBuilder(githubUserDataSourceFacteory, pagedListConfig))
                .build();
    }
}
```
## 5. PagelistAdapter
Ta sẽ tạo ra 1 pagelistAdapter để tiến hành phân trang, dùng diffCallback để differnce 2 element 
```
public class UserAdapter extends PagedListAdapter<User, RecyclerView.ViewHolder> {
 
    private static final String TAG = "UserAdapter";
    private NetworkState networkState;
    private ListItemClickListener itemClickListener;
 
    public UserAdapter(ListItemClickListener itemClickListener) {
        super(DIFF_CALLBACK);
        this.itemClickListener = itemClickListener;
    }
 
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        View view;
 
        if (viewType == R.layout.item_user_list) {
            view = layoutInflater.inflate(R.layout.item_user_list, parent, false);
            return new UserItemViewHolder(view);
        } else if (viewType == R.layout.network_state_item) {
            view = layoutInflater.inflate(R.layout.network_state_item, parent, false);
            return new NetworkStateItemViewHolder(view, itemClickListener);
        } else {
            throw new IllegalArgumentException("unknown view type");
        }
 
    }
 
    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        switch (getItemViewType(position)) {
            case R.layout.item_user_list:
                ((UserItemViewHolder) holder).bindTo(getItem(position));
                break;
            case R.layout.network_state_item:
                ((NetworkStateItemViewHolder) holder).bindView(networkState);
                break;
        }
    }
 
    private boolean hasExtraRow() {
        if (networkState != null && networkState != NetworkState.LOADED) {
            return true;
        } else {
            return false;
        }
    }
 
    @Override
    public int getItemViewType(int position) {
        if (hasExtraRow() && position == getItemCount() - 1) {
            return R.layout.network_state_item;
        } else {
            return R.layout.item_user_list;
        }
    }
 
    public void setNetworkState(NetworkState newNetworkState) {
        ....
    }
    public static DiffUtil.ItemCallback<User> DIFF_CALLBACK = new DiffUtil.ItemCallback<User>() {
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
Sau đó chỉ cần gọi :
```
RecyclerView recyclerView = findViewById(R.id.userList);
LinearLayoutManager llm = new LinearLayoutManager(this);
llm.setOrientation(LinearLayoutManager.VERTICAL);
recyclerView.setLayoutManager(llm);
 
 UserViewModel viewModel = ViewModelProviders.of(this).get(UserViewModel.class);
 viewModel.init(userDao);
 final UserAdapter userUserAdapter = new UserAdapter();
 
 viewModel.userList.observe(this, pagedList -> {
        userUserAdapter.submitList(pagedList);
 });
 
viewModel.networkState.observe(this, networkState -> {
            userUserAdapter.setNetworkState(networkState);
            Log.d(TAG, "Network State Change");
        });
 
 recyclerView.setAdapter(userUserAdapter);

```
để init data cho adapter và receycler view 
các bạn có thể tham khảo code tai: https://github.com/Thumar/PagingWithRestAPI
bào viết được tham khảo tại: http://androidkt.com/rest-api-pagination-paging-library/