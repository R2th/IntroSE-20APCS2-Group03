Hôm nay tôi sẽ thử khám phá thư viện Paging gần đây nó là một phần của Android Jetpack. 

Thư viện Paging tạo cho tôi dễ dàng để load dữ liệu một cách dần dần trong ứng dụng của bạn . Thư viện Paging hỗ trợ cho cả dữ liều bị chặn lớn và không bị chặn, như là liên tục cập nhập  nguồn dữ liệu. Thư viện Paging  dự trên ý tưởng gửi dữ liệu lên UI với Live Data mà được phát bởi RecycleView.Adapter

Vì thế đây là app demo để test Thư viện Pagin:

![](https://images.viblo.asia/dce6ffc9-da25-4003-95fd-d5afb4e4583a.gif)

Bây giờ chúng ta cũng thực hành thôi nào

**Bước 1: Thêm thư viện Paging tới ứng dụng của bạn.**

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

**Step 2: Thiết lập Retrofit để kéo dữ liệu về**

```
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

Và lớp : **RestApiFactory.java**

```
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

**Bước 3: Thiết lập Datasource**


**DataSource**: Đây là lớp cơ bản cho việc load dữ liệu, sử dụng danh sách trang. DataSource có thể thực thi bằng cách sử dụng 1 trong 3 lớp này:

* **PageKeyedDataSource** : Chúng ta có thể sử dụng lớp này, Nếu chúng ta cần load dữ liệu dựa vào số lượng trang của datasource. Cho ví dụ, Chúng ta truyền số lượng trang như là chúng ta chuyền tham số để yêu cầu. Số trang sẽ tăng dần cho tới khi tất cả các trang đã được load và xuất ra cho người sử dụng.

* **ItemKeyedDataSource**: Cách thức khác để tải dữ liệu mà không theo từng trang. Khi kế  thừa lớp này, Paging sẽ dựa vào item cụ thể để tải dữ liệu. Ví dụ lần trước dữ liệu đã được tải lên item 10. Lần sau nó tự động tải tiếp từ item thứ 11.
 
* **PositionalDataSource**: Lớp này sẽ hữu ích cho dữ liệu được cung cấp một số lượng cố định mà có thể được kéo về với tùy ý vị trí và kích thước. Việc cố định data như vậy cho phép Paging truy cấp đến từng phần tử một cách đúng nhất

Trong bài  này chúng ta sẽ sử dụng **PageKeyedDataSource**. Theo code dưới Chúng ta có thể tạo  **PageKeyedDataSource** cho **FeedDataSource** Class. 

```
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

**Bước 4: Thiết lập DataSourceFactory**

**DataSourceFactory** chịu trách nhiệm  lấy dữ liệu bằng cách sử dụng **DataSource** và **PageList**

```
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

**Bước 5: Thiết lập ViewModel**

ViewModel sẽ chịu trách nhiệm cho việc tạo PagedList với cấu hình của nó và gửi nó tới Activity vì thế nó có thể  phát dữ liệu thay đổi và chuyền nó tới Adapter

**Vậy PagedList là gì ?**

PagedList là nơi chứa dữ liệu của bạn(Trong trường hợp của chúng ta là list các bài báo mà chúng ta cần hiện ra cho người sử dụng ) và gọi Datasource để load các thành phần con. Bao gồm background executor (Lấy dữ liệu về) và  foreground executor( update UI  với dữ liệu đó)

Cho ví dụ, Chúng ta có một số dữ liệu mà chúng ta thêm vào DataSource trong background thread. Datasource vô hiệu hóa PagedList và update giá trị của nó. Sau đó trên main thread,PagedList thông báo có dữ liệu mới. Bây giờ thì PagedListAdapter biết rằng có dữ liệu mới.
PagedList có 4 tham số quan trọng

1. **setEnablePlaceholders(boolean enablePlaceholders)** : Có nghĩ là có 1 placeholder hiển thị cho người dùng đến khi dữ liệu được tải đầy đủ
2. **setInitialLoadSizeHint(int initialLoadSizeHint)** : Số lượng item load ban đầu
3. **setPageSize(int pageSize)** : Số lượng Item để load trong PagedList
. **setPrefetchDistance(int prefetchDistance)** : Tải trước số lượng. Ví dụ chúng ta đặt là 10  Nó sẽ kéo về 10 trang đầu tiên khi màn hình được load.
 
 ```
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


**Bước 6: Thiết lập PagedListAdapter**

**PagedListAdapter** thì thực thi **RecyclerView.Adapter** mà trình diễn dữ liệu từ **PagedList**. Sử dụng **DiffUtill** như là tham số để tính toán những dữ liệu khác nhau và làm tất cả update cho bạn
public class Article implements Parcelable {

```
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

**PagedListAdapter Class**

```
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

Note: Chú ý lớp này thừa kế từ **PageListAdapter** và không override **getItemCound()** như thường lệ vì nó được cung cấp bới **PageList** .Nếu chúng ta cần override phương thức đó. Chúng ta cần thêm **super.getItemCount()** .

**Bước 7: Thiết lập activity.**

Đây là bước cuối cùng của chúng ta, Với ViewModel, RecyclerView, PageListAdapter:

```
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



Tôi hy vọng bài này nó sẽ hữu ích cho bạn về thư viện Paging lib trong android. Nếu các bạn có thấy sai xót gì hy vọng các bạn comment bên dưới để mình cải thiện hơn bài viết ạ :) 


Tài liệu tham khảo : https://proandroiddev.com/8-steps-to-implement-paging-library-in-android-d02500f7fffe