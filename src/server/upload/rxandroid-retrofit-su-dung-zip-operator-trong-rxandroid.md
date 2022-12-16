![](https://images.viblo.asia/e8317f97-c9c2-4d62-9780-49d9140a6d21.png)
Hôm nay, mình sẽ trình bày một phần cực kì hữu ích và đồng thời là một  case phổ biến thường gặp khi làm việc với API. Bài viết giả sử bạn đã làm quen và biết cách hoạt động của Retrofit cũng như hiểu được cơ chế hoạt động của RxJava/RxAndroid.

Giới thiệu thêm cho bạn nào chưa biết thì có một website rất hay cho việc test API thật là: [jsonplaceholder](https://jsonplaceholder.typicode.com) .Trong website sẽ cung cấp cho chúng ta link mà chúng ta có thể request đến thật. Và nó sẽ được dùng cho tutorial này.
* https://jsonplaceholder.typicode.com/posts
* https://jsonplaceholder.typicode.com/photos

Case phổ biến mà mình muốn nói tới ở đây là request song song các API nhưng lại muốn merge chung kết quả sau khi việc thực hiện các request đó thành công. Nếu chỉ dùng Retrofit đơn thuần thì việc đó dường như rất khó khăn. Đến giờ mình vẫn chưa nghĩ ra cách. :grin:
Lan man quá. Mình sẽ bắt đầu luôn.
# Add dependencies
Tất nhiên là chúng ta cần Retrofit và RxAndroid
```
    implementation 'io.reactivex.rxjava2:rxandroid:2.1.1'
    implementation 'io.reactivex.rxjava2:rxjava:2.1.11'
    implementation 'com.jakewharton.retrofit:retrofit2-rxjava2-adapter:1.0.0'
    implementation 'com.squareup.retrofit2:converter-gson:2.6.1'
```
# Tạo singleton cho Retrofit
Việc tạo Retrofit thì cũng giống như bình thường. Nhưng bạn chú ý là là CallAdapter của chúng ta phải được thêm vào:
```
.addCallAdapterFactory(RxJava2CallAdapterFactory.create())
```
Và cuối cùng Client của chúng ta sẽ như sau:
```
public class Client {

    private static Retrofit instance = null;

    private static Retrofit getRetrofit() {
        if (instance == null) {
            instance = new Retrofit
                    .Builder()
                    .baseUrl("https://jsonplaceholder.typicode.com")
                    .addCallAdapterFactory(RxJava2CallAdapterFactory.create())
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return instance;
    }

    public static ApiInterface getAPI() {
        return getRetrofit().create(ApiInterface.class);
    }
}
```
Tạo inteface tương ứng để giao tiếp với các API của chúng ta. Như mình giới thiệu ở phần đầu thì chúng ta sẽ lấy danh sách các posts và danh sách các photos.
```
 public interface ApiInterface {

    @GET("posts")
    public Single<List<Post>> getPosts();

    @GET("photos")
    public Single<List<Photo>> getPhotos();
}

```
Thông thường thì nếu chỉ dùng Retrofit thì kiểu trả về trong các method trong interface của chúng ta sẽ có dạng Call<List<Post>> và Call<List<Photo>> nhưng ở đây mình đã thay bầng 2 Obvervable tương ứng là Single<List<Post>>, Single<List<Photo>> . 
#     Tiến hành request và gộp kết quả của với operator zip
    
Định nghĩa của zip operator
>     Zip combine the emissions of multiple Observables together via a specified function and emit single items for each combination based on the results of this function
    
   Với toán tử Zip thì nó sẽ đợi cho đến khi data của tất cả Obsevable được phát ra. Sau đó cung cấp cho chúng ta một hàm để có thể làm việc với các data được phát ra từ những Observable đó.
    
   Trong trường hợp của chúng ta sẽ như sau:
   
```
 Single<List<Post>> getPosts = Client.getAPI().getPosts();
        Single<List<Photo>> getPhotos = Client.getAPI().getPhotos();

        Single.zip(getPosts, getPhotos, (posts, photos) -> {
            return posts.size() + photos.size();
        }).subscribeOn(Schedulers.io()).observeOn(AndroidSchedulers.mainThread()).subscribe(new SingleObserver<Integer>() {
            @Override
            public void onSubscribe(Disposable d) {

            }

            @Override
            public void onSuccess(Integer integer) {

            }

            @Override
            public void onError(Throwable e) {

            }
        });
```
    
   Mình sẽ Dubug để cùng xem kết quả:
    ![](https://images.viblo.asia/c98a21dc-2c08-49c9-a803-7ea9e0e9726e.png)
    ![](https://images.viblo.asia/78938ad6-cc0a-4f16-a0bb-c9ad480671fd.png)
    
   Nhìn vào 2 hình trên thì chúng ta đã thấy mình lấy thành công 100 bài posts và 5000 photos. Sau đó mình có cộng size của posts và photos vào thì được 5100.
    
  Như vậy khi sử dụng toán tử Zip của RxAndroid + 
Retrofit thì chúng ta có thể request song song nhiều request một lúc, đợi và gộp kết quả của những request đó rồi. Đó cũng chỉ là một case hữu ích mà mình sử dụng được với RxAndroid.
    
   Happy Coding :smile: