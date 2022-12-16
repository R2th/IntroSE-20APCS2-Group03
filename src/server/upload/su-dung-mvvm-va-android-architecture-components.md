# Tổng quát
MVC, MVP, MVVM là các Architecture pattern được sử dụng bởi developer. Tùy vào yêu cầu và size project mà developer chọn 1 architecture pattern mà mình cảm thấy phù hợp và thoải mái để áp dụng. Mới đây Google đã giới thiệu thêm 1 architecture mới [Android Architecture Components](https://developer.android.com/topic/libraries/architecture/) bao gồm 4 components chính LifeCycle, ViewModel, Livedata, Room

# Thêm dependencies 
mở module build.gradle và thêm dòng sau
```
//Architecture components
implementation "android.arch.lifecycle:extensions:1.0.0"
annotationProcessor "android.arch.lifecycle:compiler:1.0.0"
```

# Ta sẽ bắt đầu với LiveData
- LiveData là observable holder class. Đặc biệt LiveData còn biết được lifecycle state của các component của app, việc này đảm bảo LiveData chỉ update dữ liệu, thông báo cho các observer khi chúng trong trạng thái active, tránh memory leak. Tham khảo [link](https://developer.android.com/topic/libraries/architecture/livedata#work_livedata) sau để biết thêm chi tiết
```
// setting value
public LiveData<News> getNews(String source) {
    final MutableLiveData<News> data = new MutableLiveData<>();
    getNews(source).enqueue(new Callback<News>() {
        @Override
        public void onResponse(Call<News> call, Response<News> response) {
            data.setValue(response.body());
        }

        @Override
        public void onFailure(Call<News> call, Throwable t) {
            data.setValue(null);
        }
    });
    return data;
}
//listening for change in <Object>. // this would be in ui layer
getObservableProject().observe(this, new Observer<Object>() {
    @Override
    public void onChanged(@Nullable Object obj) {
       // handle changes
    }
});
```
- Trong ví dụ trên News object được lấy bởi Api call và được wrap trong LiveData. UI layer sẽ observe LiveData object khi có sự thay đổi.

# Tầng ViewModel
- Chuẩn bị dữ liệu cho tầng UI
- Đóng vai trò trung gian giữa UI và Repository
- Khi thiết bị xoay màn hình (Activity restart) ViewModel sẽ không thay đổi, không bị destroy. Sau khi activity destroy và tạo lại sẽ nhận lại ViewModel trước đó mà không tạo lại
- ViewModel có thể giao tiếp với tầng View mà không cần callback interface
```
// View model for News Object
public class NewsViewModel extends AndroidViewModel {
    private final LiveData<News> newsLiveData;

    public ObservableField<News> news = new ObservableField<>();

    public NewsViewModel(@NonNull Application application) {
        super(application);
        // a differnt source can be passed, here i am passing techcrunch
        newsLiveData = NewsRepository.getInstance().getNews("techcrunch");
    }

    public LiveData<News> getObservableProject() {
        return newsLiveData;
    }
}

// accessing NewsModel Object
final NewsViewModel viewModel = ViewModelProviders.of(this, factory)
        .get(NewsViewModel.class);
viewModel.getObservableProject().observe(this, new Observer<News>() {
    @Override
    public void onChanged(@Nullable News news) {
      // 
    }
});
```
- Trong ví dụ trên News object được wrap trong NewsViewModel. Lưu ý, ta không nên có reference đến view trong ViewModel để tránh memory leak bởi ViewModel không bị destroy khi activity destroy

# Tầng View
- Tại tầng view (Activity, Fragment) sẽ chỉ chứa code liên quan đến UI, business logic và webservice call sẽ được di chuyển sang tầng ViewModel và Repository
- Binding ViewModel to View được thực hiện thông qua layout XML bằng cách thêm tag layout như sau:
```
// ViewModel reference in XML
<data>

 <variable
  name="article"
  type="com.gauravgoyal.mvvm_with_testing.service.model.Article" />

</data>
//using Viewmodel to display data
<TextView
 android:id="@+id/title"
 android:layout_width="wrap_content"
 android:layout_height="wrap_content"
 android:contentDescription="@string/app_name"
 android:text="@{article.title}"
 android:textSize="@dimen/news_text"
 android:textStyle="bold" />
```
- trong ví dụ trên ta khai báo object Article và sử dụng biến đó để update title cho TextView. Việc thực hiện update title được viết trong cú pháp "@{}". Tuy nhiên, trong một số trường hợp ta muốn thực hiện 1 số việc phức tạp hơn, ta có thể custom sử dụng anotation BindingAdapter như sau:
```
//xml
<TextView
 android:id="@+id/publishedAt"
 android:layout_width="wrap_content"
 android:layout_height="wrap_content"
 app:dateText="@{article.publishedAt}"
 android:textSize="@dimen/news_text" />
//handling dateText property
@BindingAdapter("dateText")
public static void convertToDate(TextView view, String date) {
    view.setText(DateUtils.Companion.convertToDateString(date));
}
```
[nguồn](https://medium.com/@gauravgyal/android-architecture-pattern-components-mvvm-livedata-viewmodel-lifecycle-544e84e85177)