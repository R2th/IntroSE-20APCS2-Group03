Gần đây mình có tìm hiểu về thư viện Paging - một phần của Android Jetpack. Mặc dù đã có một số resource về cách triển khai thư viện này trong một ứng dụng, nhưng mình đã phải đối mặt với rất nhiều vấn đề và phải tìm hiểu kỹ hơn về nó. Vì vậy mình nghĩ mình sẽ viết về 7 bước cơ bản để triển khai thư viện Paging trong ứng dụng Android.

Thư viện Paging giúp cho việc tải dữ liệu phân trang trong ứng dụng của bạn dễ dàng hơn. Thư viện Paging cũng hỗ trợ cả list dữ liệu có giới hạn lớn, list dữ liệu không bị ràng buộc (ví dụ như cập nhật liên tục các nguồn cấp dữ liệu). Thư viện phân trang dựa trên ý tưởng gửi list dữ liệu tới giao diện người dùng dưới dạng livedata của list đó và được quan sát bởi RecyclerView.Adapter.

Mình đã lựa chọn xây dựng một ứng dụng cung cấp tin tức để test thư viện Paging. Nào chúng ta quay lại với chủ đề chính thôi, 7 bước để cài đặt thư viện.

# I. Thêm thư viện Paging vào trong ứng dụng

```
apply plugin: 'com.android.application'

android {
    compileSdkVersion 27
    defaultConfig {
        applicationId "com.an.paginglibrary.sample"
        minSdkVersion 14
        targetSdkVersion 27
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }

  /* 
   * This is just to enable Java 8 in the app
   */
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
}


/* 
 * I prefer using data binding so we need to enable it first
 */
android {
    dataBinding {
        enabled = true
    }
}


dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'com.android.support:appcompat-v7:27.1.1'
    implementation 'com.android.support:recyclerview-v7:27.1.1'
    implementation 'com.android.support:support-v4:27.1.1'
    implementation 'com.android.support:cardview-v7:27.1.1'
    implementation 'com.android.support:design:27.1.1'

    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'com.android.support.test:runner:1.0.2'
    androidTestImplementation 'com.android.support.test.espresso:espresso-core:3.0.2'

    /* 
     * Step 1: Add the paging library
     */
    implementation 'android.arch.paging:runtime:1.0.0'
    
    /* 
     * Step 2: Adding ViewModel and Lifecycle  
     */
    implementation 'android.arch.lifecycle:extensions:1.1.1'


    /* 
     * Step 3: Adding rxJava to the app  
     */
    implementation 'io.reactivex.rxjava2:rxjava:2.1.9'
    implementation 'io.reactivex.rxjava2:rxandroid:2.0.2'

    /* 
     * Step 4: Adding retrofit to the app  
     */
    implementation 'com.squareup.retrofit2:retrofit:2.4.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.4.0'
    implementation 'com.squareup.retrofit2:adapter-rxjava2:2.4.0'
    implementation 'com.squareup.okhttp3:logging-interceptor:3.9.1'


    /* 
     * Step 5: We would be needing an image loading library.
     * So we are going to use Picasso
     */
    implementation 'com.squareup.picasso:picasso:2.71828'
}
```

# II. Cài đặt Retrofit để lấy dữ liệu từ api
Tạo 1 interface **RestApi.java ** :

```Java
public interface RestApi {


    /* 
     * We would be using the below url:
     * https://newsapi.org/v2/everything?q=movies&apiKey=079dac74a5f94ebdb990ecf61c8854b7&pageSize=20&page=2
     * The url has four query parameters.
     * We would be changing the pageSize and the page
     */
    @GET("/v2/everything")
    Call<Feed> fetchFeed(@Query("q") String q,
                         @Query("apiKey") String apiKey,
                         @Query("page") long page,
                         @Query("pageSize") int pageSize);
}
```

Sau đó tạo class **RestApiFactory.java** :

```Java
  private static String BASE_URL = "https://newsapi.org";

    public static RestApi create() {
        HttpLoggingInterceptor logging = new HttpLoggingInterceptor();
        logging.setLevel(HttpLoggingInterceptor.Level.BODY);

        OkHttpClient.Builder httpClient = new OkHttpClient.Builder();
        httpClient.addInterceptor(logging);

        Retrofit retrofit = new Retrofit.Builder().baseUrl(BASE_URL)
                .addConverterFactory(GsonConverterFactory.create())
                .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                .client(httpClient.build())
                .build();
        return retrofit.create(RestApi.class);
    }
```

# III. Cài đặt DataSource
**DataSource** - Đây là base class để tải dữ liệu, được sử dụng trong phân trang danh sách. DataSource có thể được triển khai bằng cách sử dụng bất kỳ lớp nào trong 3 lớp sau:

**PageKeyedDataSource**: Chúng ta có thể sử dụng lớp này nếu chúng ta cần tải dữ liệu dựa trên số lượng trang trong DataSource. Ví dụ chúng ta truyền số trang làm tham số truy vấn trong request, số trang sẽ tăng tuần tự cho đến khi tất cả các trang được lấy về và hiển thị.

**ItemKeyedDataSource**: Bước đầu tiên là định nghĩa khóa, mục đích là để load dữ liệu ở page kế tiếp dựa trên khóa đó. Ví dụ như data class User thì trường id thường sẽ có key là userId. Kích thức của list là không xác định và việc lấy dữ liệu tiếp theo thường phụ thuộc vào id được biết gần đây nhất. Vì vậy nếu chúng ta lấy dữ liệu các mục từ 1 đến 10 trong kết quả đầu tiên thì ItemKeyedDataSource sẽ tự động lấy dữ liệu tiếp theo từ 11-20.

**PositionalDataSource**: Lớp này sẽ hữu ích cho các nguồn cung cấp danh sách có kích thước cố định, có thể lấy về với vị trí và kích thước tùy ý.

Trong bài viết này, mình sẽ sử dụng PageKeyedDataSource. Hãy cùng xem đoạn code dưới đây:

```Java
public class FeedDataSource extends PageKeyedDataSource<Long, Article> {

    private static final String TAG = FeedDataSource.class.getSimpleName();
    
  /*  
   * Step 1: Initialize the restApiFactory.
   * The networkState and initialLoading variables 
   * are for updating the UI when data is being fetched
   * by displaying a progress bar
   */
    private RestApiFactory restApiFactory;

    private MutableLiveData networkState;
    private MutableLiveData initialLoading;

    public FeedDataSource() {
        this.restApiFactory = RestApiFactory.create();
      
        networkState = new MutableLiveData();
        initialLoading = new MutableLiveData();
    }


    public MutableLiveData getNetworkState() {
        return networkState;
    }

    public MutableLiveData getInitialLoading() {
        return initialLoading;
    }
  
  
  /*  
   * Step 2: This method is responsible to load the data initially 
   * when app screen is launched for the first time.
   * We are fetching the first page data from the api
   * and passing it via the callback method to the UI.
   */  
    @Override
    public void loadInitial(@NonNull LoadInitialParams<Long> params,
                            @NonNull LoadInitialCallback<Long, Article> callback) {

        initialLoading.postValue(NetworkState.LOADING);
        networkState.postValue(NetworkState.LOADING);

        appController.getRestApi().fetchFeed(QUERY, API_KEY, 1, params.requestedLoadSize)
                .enqueue(new Callback<Feed>() {
                    @Override
                    public void onResponse(Call<Feed> call, Response<Feed> response) {
                        if(response.isSuccessful()) {
                            callback.onResult(response.body().getArticles(), null, 2l);
                            initialLoading.postValue(NetworkState.LOADED);
                            networkState.postValue(NetworkState.LOADED);

                        } else {
                            initialLoading.postValue(new NetworkState(NetworkState.Status.FAILED, response.message()));
                            networkState.postValue(new NetworkState(NetworkState.Status.FAILED, response.message()));
                        }
                    }

                    @Override
                    public void onFailure(Call<Feed> call, Throwable t) {
                        String errorMessage = t == null ? "unknown error" : t.getMessage();
                        networkState.postValue(new NetworkState(NetworkState.Status.FAILED, errorMessage));
                    }
                });
    }
  
  

    @Override
    public void loadBefore(@NonNull LoadParams<Long> params,
                           @NonNull LoadCallback<Long, Article> callback) {

    }
  
  
  /*  
   * Step 3: This method it is responsible for the subsequent call to load the data page wise.
   * This method is executed in the background thread
   * We are fetching the next page data from the api
   * and passing it via the callback method to the UI.
   * The "params.key" variable will have the updated value.
   */
    @Override
    public void loadAfter(@NonNull LoadParams<Long> params,
                          @NonNull LoadCallback<Long, Article> callback) {

        Log.i(TAG, "Loading Rang " + params.key + " Count " + params.requestedLoadSize);
            
        networkState.postValue(NetworkState.LOADING);

        appController.getRestApi().fetchFeed(QUERY, API_KEY, params.key, params.requestedLoadSize).enqueue(new Callback<Feed>() {
            @Override
            public void onResponse(Call<Feed> call, Response<Feed> response) {
                /*  
                 * If the request is successful, then we will update the callback
                 * with the latest feed items and
                 * "params.key+1" -> set the next key for the next iteration.
                 */
                if(response.isSuccessful()) {
                    long nextKey = (params.key == response.body().getTotalResults()) ? null : params.key+1;
                    callback.onResult(response.body().getArticles(), nextKey);
                    networkState.postValue(NetworkState.LOADED);

                } else networkState.postValue(new NetworkState(NetworkState.Status.FAILED, response.message()));
            }

            @Override
            public void onFailure(Call<Feed> call, Throwable t) {
                String errorMessage = t == null ? "unknown error" : t.getMessage();
                networkState.postValue(new NetworkState(NetworkState.Status.FAILED, errorMessage));
            }
        });
    }
}
```

# IV. Cài đặt DataSourceFactory
**DataSourceFactory** chịu trách nhiệm truy xuất dữ liệu bằng cách sử dụng config của **DataSource** và **PagedList** mà mình sẽ tạo sau ở trong bài viết này trong class **ViewModel**.

```Java
public class FeedDataFactory extends DataSource.Factory {

    private MutableLiveData<FeedDataSource> mutableLiveData;
    private FeedDataSource feedDataSource;

    public FeedDataFactory() {
        this.mutableLiveData = new MutableLiveData<FeedDataSource>();
    }

    @Override
    public DataSource create() {
        feedDataSource = new FeedDataSource();
        mutableLiveData.postValue(feedDataSource);
        return feedDataSource;
    }
  
    public MutableLiveData<FeedDataSource> getMutableLiveData() {
        return mutableLiveData;
    }
}
```

# V. Cài đặt lớp ViewModel
ViewModel sẽ chịu trách nhiệm tạo PagedList cùng với các config của nó và gửi đến Activity để Activity có thể quan sát dữ liệu khi dữ liệu thay đổi và chuyển nó đến adapter. 

Chắc hẳn mọi người đang thắc mắc vậy **PagedList** là gì ? **PagedList** là một danh sách chứa các mục dữ liệu của bạn và gọi DataSource để tải các phần tử. Nó thường bao gồm một công việc thực hiện ở background (tải dữ liệu) và một công việc thực hiện ở foreground (cập nhật UI dựa trên dữ liệu tải về).

Ví dụ: giả sử có một số dữ liệu mà chúng ta thêm vào DataSource trong background thread. DataSource làm mất hiệu lực của **PagedList** và cập nhật giá trị. Sau đó trên main thread, **PagedList** sẽ thông báo cho những phần tử observe nó là nó đã có giá trị mới. Bây giờ **PagedListAdapter** đã biết về giá trị mới.

**PageList** có 4 tham số mà chúng ta cần chú ý: 

a. setEnablePlaceHolder (boolean enablePlaceholders) 
b. setInitialLoadSizeHint(int initialLoadSizeHint)
c. setPageSize(int pageSize)
d. setPageSize(int pageSize)
 
Dưới đây là class ViewModel của project:

```Java
public class FeedViewModel extends ViewModel {

    private Executor executor;
    private LiveData<NetworkState> networkState;
    private LiveData<PagedList<Article>> articleLiveData;

    public FeedViewModel() {
        init();
    }

    /* 
     * Step 1: We are initializing an Executor class
     * Step 2: We are getting an instance of the DataSourceFactory class
     * Step 3: We are initializing the network state liveData as well.
     *         This will update the UI on the network changes that take place
     *         For instance, when the data is getting fetched, we would need
     *         to display a loader and when data fetching is completed, we 
     *         should hide the loader.
     * Step 4: We need to configure the PagedList.Config. 
     * Step 5: We are initializing the pageList using the config we created
     *         in Step 4 and the DatasourceFactory we created from Step 2
     *         and the executor we initialized from Step 1.
     */
    private void init() {
        executor = Executors.newFixedThreadPool(5);

        FeedDataFactory feedDataFactory = new FeedDataFactory();
        networkState = Transformations.switchMap(feedDataFactory.getMutableLiveData(),
                dataSource -> dataSource.getNetworkState());

        PagedList.Config pagedListConfig =
                (new PagedList.Config.Builder())
                        .setEnablePlaceholders(false)
                        .setInitialLoadSizeHint(10)
                        .setPageSize(20).build();

        articleLiveData = (new LivePagedListBuilder(feedDataFactory, pagedListConfig))
                .setFetchExecutor(executor)
                .build();
    }

    /* 
     * Getter method for the network state
     */
    public LiveData<NetworkState> getNetworkState() {
        return networkState;
    }

    /* 
     * Getter method for the pageList
     */  
    public LiveData<PagedList<Article>> getArticleLiveData() {
        return articleLiveData;
    }
}
```

# VI. Cài đặt PagedListAdapter

**PagedListAdapter** là một triển khai của RecyclerView. Adapter lấy dữ liệu từ PagedList, nó sử dụng DiffUtil làm tham số để tính toán sự khác biệt dữ liệu và thực hiện tất các các cập nhật cho bạn. DiffUtil được định nghĩa trong Model Class trong trường hợp này:

```Java
public class Article implements Parcelable {

public static DiffUtil.ItemCallback<Article> DIFF_CALLBACK = new DiffUtil.ItemCallback<Article>() {
        @Override
        public boolean areItemsTheSame(@NonNull Article oldItem, @NonNull Article newItem) {
            return oldItem.id == newItem.id;
        }

        @Override
        public boolean areContentsTheSame(@NonNull Article oldItem, @NonNull Article newItem) {
            return oldItem.equals(newItem);
        }
    };

    @Override
    public boolean equals(Object obj) {
        if (obj == this)
            return true;

        Article article = (Article) obj;
        return article.id == this.id;
    }
```

Class **PagedListAdapter** :

```Java
public class FeedListAdapter extends PagedListAdapter<Article, RecyclerView.ViewHolder> {

    /* 
     * There are two layout types we define 
     * in this adapter:
     * 1. progrss view
     * 2. data view
     */
    private static final int TYPE_PROGRESS = 0;
    private static final int TYPE_ITEM = 1;

    private Context context;
    private NetworkState networkState;
  
    /* 
     * The DiffUtil is defined in the constructor
     */  
    public FeedListAdapter(Context context) {
        super(Article.DIFF_CALLBACK);
        this.context = context;
    }

  
    /* 
     * Default method of RecyclerView.Adapter
     */  
    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater layoutInflater = LayoutInflater.from(parent.getContext());
        if(viewType == TYPE_PROGRESS) {
            NetworkItemBinding headerBinding = NetworkItemBinding.inflate(layoutInflater, parent, false);
            NetworkStateItemViewHolder viewHolder = new NetworkStateItemViewHolder(headerBinding);
            return viewHolder;

        } else {
            FeedItemBinding itemBinding = FeedItemBinding.inflate(layoutInflater, parent, false);
            ArticleItemViewHolder viewHolder = new ArticleItemViewHolder(itemBinding);
            return viewHolder;
        }
    }

  
    /* 
     * Default method of RecyclerView.Adapter
     */  
    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        if(holder instanceof ArticleItemViewHolder) {
            ((ArticleItemViewHolder)holder).bindTo(getItem(position));
        } else {
            ((NetworkStateItemViewHolder) holder).bindView(networkState);
        }
    }


    /* 
     * Default method of RecyclerView.Adapter
     */   
    @Override
    public int getItemViewType(int position) {
        if (hasExtraRow() && position == getItemCount() - 1) {
            return TYPE_PROGRESS;
        } else {
            return TYPE_ITEM;
        }
    }
  
  
     private boolean hasExtraRow() {
        if (networkState != null && networkState != NetworkState.LOADED) {
            return true;
        } else {
            return false;
        }
    }

    public void setNetworkState(NetworkState newNetworkState) {
        NetworkState previousState = this.networkState;
        boolean previousExtraRow = hasExtraRow();
        this.networkState = newNetworkState;
        boolean newExtraRow = hasExtraRow();
        if (previousExtraRow != newExtraRow) {
            if (previousExtraRow) {
                notifyItemRemoved(getItemCount());
            } else {
                notifyItemInserted(getItemCount());
            }
        } else if (newExtraRow && previousState != newNetworkState) {
            notifyItemChanged(getItemCount() - 1);
        }
    }


    /* 
     * We define A custom ViewHolder for the list item
     */   
    public class ArticleItemViewHolder extends RecyclerView.ViewHolder {

        private FeedItemBinding binding;
        public ArticleItemViewHolder(FeedItemBinding binding) {
            super(binding.getRoot());
            this.binding = binding;
        }

        public void bindTo(Article article) {
            binding.itemImage.setVisibility(View.VISIBLE);
            binding.itemDesc.setVisibility(View.VISIBLE);

            String author = article.getAuthor() == null || article.getAuthor().isEmpty() ? context.getString(R.string.author_name) : article.getAuthor();
            String titleString = String.format(context.getString(R.string.item_title), author, article.getTitle());
            SpannableString spannableString = new SpannableString(titleString);
            spannableString.setSpan(new ForegroundColorSpan(ContextCompat.getColor(context.getApplicationContext(), R.color.secondary_text)),
                        titleString.lastIndexOf(author) + author.length() + 1, titleString.lastIndexOf(article.getTitle()) - 1, Spannable.SPAN_EXCLUSIVE_EXCLUSIVE);

            binding.itemTitle.setText(spannableString);
            binding.itemTime.setText(String.format(context.getString(R.string.item_date), AppUtils.getDate(article.getPublishedAt()), AppUtils.getTime(article.getPublishedAt())));             binding.itemDesc.setText(article.getDescription());
            Picasso.get().load(article.getUrlToImage()).resize(250, 200).into(binding.itemImage);
        }
    }


    /* 
     * We define A custom ViewHolder for the progressView
     */  
    public class NetworkStateItemViewHolder extends RecyclerView.ViewHolder {

        private NetworkItemBinding binding;
        public NetworkStateItemViewHolder(NetworkItemBinding binding) {
            super(binding.getRoot());
            this.binding = binding;
        }

        public void bindView(NetworkState networkState) {
            if (networkState != null && networkState.getStatus() == NetworkState.Status.RUNNING) {
                binding.progressBar.setVisibility(View.VISIBLE);
            } else {
                binding.progressBar.setVisibility(View.GONE);
            }

            if (networkState != null && networkState.getStatus() == NetworkState.Status.FAILED) {
                binding.errorMsg.setVisibility(View.VISIBLE);
                binding.errorMsg.setText(networkState.getMsg());
            } else {
                binding.errorMsg.setVisibility(View.GONE);
            }
        }
    }
}
```

# VII. Cài đặt Activity
Bước cuối cùng là cài đặt class Activity với **ViewModel**, **RecyclerView**, **PagedListAdapter**:

```Java
public class FeedActivity extends AppCompatActivity {

    private FeedListAdapter adapter;
    private FeedViewModel feedViewModel;
    private FeedActivityBinding binding;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        /*
         * Step 1: Using DataBinding, we setup the layout for the activity
         *
         * */
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main);

        /*
         * Step 2: Initialize the ViewModel
         *
         * */
        feedViewModel = ViewModelProviders.of(this).get(FeedViewModel.class);

        /*
         * Step 2: Setup the adapter class for the RecyclerView
         *
         * */
        binding.listFeed.setLayoutManager(new LinearLayoutManager(getApplicationContext()));
        adapter = new FeedListAdapter(getApplicationContext());

        
        /*
         * Step 4: When a new page is available, we call submitList() method
         * of the PagedListAdapter class
         * 
         * */
        feedViewModel.getArticleLiveData().observe(this, pagedList -> {
            adapter.submitList(pagedList);
        });
     
        feedViewModel.getNetworkState().observe(this, networkState -> {
            adapter.setNetworkState(networkState);
        });

        binding.listFeed.setAdapter(adapter);
    }
}
```

Với bài viết này mình mong mọi người có 1 trải nghiệm tốt và nó sẽ giúp ích cho mọi người. Happy coding ! Thanks for reading.

# Tài liệu tham khảo:
https://proandroiddev.com/8-steps-to-implement-paging-library-in-android-d02500f7fffe
https://github.com/anitaa1990/PagingLibrary-Sample